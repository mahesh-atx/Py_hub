/// <reference lib="webworker" />
/**
 * Pyodide runtime worker. This is the ONLY place Python code executes.
 *
 * Communication with the UI uses the strongly typed `WorkerMessage` /
 * `WorkerResponse` protocol. stdout/stderr use the raw byte `write` handlers
 * (so newlines/prompts are preserved exactly) and stdin uses a blocking
 * `stdin()` handler backed by a SharedArrayBuffer + Atomics so real, pausable
 * `input()` works. Cross-origin isolation (COOP/COEP) is required for
 * SharedArrayBuffer and is configured in next.config.ts.
 */
import type {
  WorkerMessage,
  WorkerResponse,
  FsFilePayload,
} from "@/types/python";

const PYODIDE_VERSION = "0.26.3";
const BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`;
const HOME = "/home/pyodide";

// Lazily typed Pyodide instance.
let pyodide: any = null;
let ready = false;

// ---- stdin SharedArrayBuffer layout -------------------------------------
// bytes 0..3   : Int32 flag (0 = need data, 1 = data ready, 2 = EOF)
// bytes 4..7   : Int32 length of data
// bytes 8..end : raw utf-8 bytes
let stdinFlag: Int32Array | null = null;
let stdinLen: Int32Array | null = null;
let stdinBytes: Uint8Array | null = null;
let interruptBuffer: Int32Array | null = null;

// ---- test-run capture mode ---------------------------------------------
let captureMode = false;
let capOut = "";
let capErr = "";
let testStdinLines: string[] = [];
let testStdinIdx = 0;

// ---- stdout / stderr batching -------------------------------------------
const stdoutDecoder = new TextDecoder("utf-8");
const stderrDecoder = new TextDecoder("utf-8");
let outBuf = "";
let errBuf = "";
let flushTimer: ReturnType<typeof setTimeout> | null = null;

// Reason captured when the main thread requests an interrupt (stop / timeout).
let interruptReason: "stop" | "timeout" | null = null;

function post(msg: WorkerResponse): void {
  (self as unknown as Worker).postMessage(msg);
}

function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushStreams();
  }, 20);
}

function flushStreams(): void {
  if (outBuf) {
    post({ type: "STDOUT", data: outBuf });
    outBuf = "";
  }
  if (errBuf) {
    post({ type: "STDERR", data: errBuf });
    errBuf = "";
  }
}

// ---- Python environment -------------------------------------------------
const PYTHON_INIT = `
import sys
import os
from io import StringIO
import traceback
import builtins
import js

class CustomStdin:
    def readline(self, size=-1):
        res = js.get_stdin_line()
        if res is None:
            return ""
        return res
    def read(self, size=-1):
        return self.readline()
    def isatty(self):
        return True
    def flush(self):
        pass

sys.stdin = CustomStdin()

os.environ["MPLBACKEND"] = "AGG"
try:
    os.chdir("${HOME}")
except Exception:
    pass

__user_ns = {"__name__": "__main__", "__builtins__": builtins}

def __ide_run(code, filename):
    try:
        exec(compile(code, filename, "exec"), __user_ns)
        return (0, "")
    except SystemExit:
        return (0, "")
    except KeyboardInterrupt:
        return (2, "")
    except BaseException:
        return (1, traceback.format_exc())

import warnings
warnings.filterwarnings("ignore", message="Matplotlib is currently using agg")

def __ide_reset():
    global __user_ns
    __user_ns = {"__name__": "__main__", "__builtins__": builtins}

def __ide_collect_plots():
    try:
        import matplotlib
    except Exception:
        return []
    import io, base64
    try:
        import matplotlib.pyplot as plt
    except Exception:
        return []
    out = []
    for num in plt.get_fignums():
        fig = plt.figure(num)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=100)
        out.append(base64.b64encode(buf.getvalue()).decode())
    plt.close("all")
    return out
`;

async function loadPyodideLoader(): Promise<
  (opts?: { indexURL?: string }) => Promise<any>
> {
  // Use a runtime dynamic import so the bundler never tries to resolve the
  // CDN URL at build time. Works in both module and classic workers.
  const importer = new Function(
    "u",
    "return import(u);",
  ) as (u: string) => Promise<{
    loadPyodide: (opts?: { indexURL?: string }) => Promise<any>;
  }>;
  const mod = await importer(`${BASE}/pyodide.mjs`);
  return mod.loadPyodide;
}

async function initPyodide(): Promise<void> {
  try {
    post({ type: "LOADING", message: "Downloading Python runtime…", progress: 15 });
    const loadPyodide = await loadPyodideLoader();
    post({ type: "LOADING", message: "Initializing Python environment…", progress: 55 });
    pyodide = await loadPyodide({ indexURL: BASE });

    pyodide.setStdout({
      write: (b: Uint8Array) => {
        if (captureMode) {
          capOut += stdoutDecoder.decode(b, { stream: true });
        } else {
          outBuf += stdoutDecoder.decode(b, { stream: true });
          scheduleFlush();
        }
        return b.length;
      },
      isatty: true,
    });
    pyodide.setStderr({
      write: (b: Uint8Array) => {
        if (captureMode) {
          capErr += stderrDecoder.decode(b, { stream: true });
        } else {
          errBuf += stderrDecoder.decode(b, { stream: true });
          scheduleFlush();
        }
        return b.length;
      },
      isatty: true,
    });
    
    // Expose pyStdin globally so CustomStdin can call it directly
    (globalThis as any).get_stdin_line = pyStdin;
    
    if (interruptBuffer) pyodide.setInterruptBuffer(interruptBuffer);

    pyodide.runPython(PYTHON_INIT);

    const pythonVersion: string = pyodide.runPython(
      "import sys; '.'.join(str(v) for v in sys.version_info[:3])",
    );
    ready = true;
    post({ type: "LOADING", message: "Python ready", progress: 100 });
    post({
      type: "READY",
      pythonVersion,
      pyodideVersion: PYODIDE_VERSION,
    });

    // Background: preload phase 6 datasets into Pyodide virtual filesystem
    setTimeout(async () => {
      try {
        const FS = pyodide.FS;
        try { FS.mkdir("data"); } catch (e) {}
        const files = ["sales_raw.csv", "customers_raw.csv", "merged_clean.csv", "sales_clean.csv", "customers_clean.csv"];
        for (const f of files) {
          try {
            if (!FS.analyzePath(`data/${f}`).exists) {
              const res = await fetch(`/practice-data/phase-6-data-science/starter-project/data/${f}`);
              if (res.ok) {
                const buffer = await res.arrayBuffer();
                FS.writeFile(`data/${f}`, new Uint8Array(buffer));
              }
            }
          } catch (e) {}
        }
      } catch (e) {}
    }, 50);

  } catch (err) {
    post({
      type: "FATAL",
      error: `Failed to load the Python runtime: ${String(err)}`,
    });
  }
}

/**
 * Blocking stdin handler. Returns a full line of input or `undefined` (EOF).
 * Waits on a SharedArrayBuffer with periodic interrupt checks so the UI Stop
 * button and the execution timeout can interrupt a pending input().
 */
function pyStdin(): string | undefined {
  if (captureMode) {
    if (testStdinIdx < testStdinLines.length) {
      const line = testStdinLines[testStdinIdx++];
      return line + "\n";
    }
    return undefined;
  }

  if (!stdinFlag || !stdinLen || !stdinBytes) return undefined;
  flushStreams();
  stdinFlag[0] = 0; // request input
  post({ type: "STDIN_REQUEST" });
  while (stdinFlag[0] === 0) {
    Atomics.wait(stdinFlag, 0, 0, 100);
    if (stdinFlag[0] !== 0) break;
    if (pyodide) pyodide.checkInterrupt(); // allow stop / timeout during wait
  }
  const flag = stdinFlag[0];
  const len = stdinLen[0];
  stdinFlag[0] = 0;
  if (flag === 2) return undefined; // EOF
  const bytes = new Uint8Array(len);
  bytes.set(stdinBytes.subarray(0, len));
  const text = new TextDecoder().decode(bytes);
  return text.endsWith("\n") ? text : text + "\n";
}



// ---- filesystem sync ----------------------------------------------------
function syncFiles(files: FsFilePayload[]): void {
  const FS = pyodide.FS;
  for (const f of files) {
    const full = `${HOME}/${f.path}`;
    const slash = full.lastIndexOf("/");
    const dir = full.slice(0, slash);
    try {
      FS.mkdirTree(dir);
    } catch {
      /* directory may already exist */
    }
    try {
      FS.writeFile(full, f.content ?? "");
    } catch {
      /* ignore write errors */
    }
  }
}

function detectNewFiles(knownPaths: string[]): FsFilePayload[] {
  const FS = pyodide.FS;
  const found: FsFilePayload[] = [];
  const known = new Set(knownPaths.map((p) => `${HOME}/${p}`));

  const walk = (dir: string, rel: string) => {
    let entries: string[];
    try {
      entries = FS.readdir(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      if (name === "." || name === "..") continue;
      const full = `${dir}/${name}`;
      const relPath = rel ? `${rel}/${name}` : name;
      let st: { mode: number };
      try {
        st = FS.stat(full);
      } catch {
        continue;
      }
      if (FS.isDir(st.mode)) {
        walk(full, relPath);
      } else if (!known.has(full)) {
        try {
          const content = new TextDecoder().decode(FS.readFile(full));
          found.push({ path: relPath, content });
        } catch {
          /* ignore binary / unreadable */
        }
      }
    }
  };
  walk(HOME, "");
  return found;
}

// ---- execution ----------------------------------------------------------
async function handleRun(msg: {
  code: string;
  filename: string;
  files?: FsFilePayload[];
}): Promise<void> {
  if (!ready || !pyodide) {
    post({ type: "ERROR", error: "Python runtime is not ready yet." });
    return;
  }
  post({ type: "STARTED" });
  interruptReason = null;
  if (interruptBuffer) interruptBuffer[0] = 0;

  const filePayloads = msg.files ?? [];
  try {
    syncFiles(filePayloads);
  } catch {
    /* non-fatal */
  }
  const knownPaths = filePayloads.map((f) => f.path);

  const t0 = performance.now();
  let status = 0;
  let traceback = "";
  try {
    const fn = pyodide.globals.get("__ide_run");
    const res = fn(msg.code, msg.filename).toJs();
    status = res[0] as number;
    traceback = res[1] as string;
  } catch (err) {
    flushStreams();
    post({
      type: "ERROR",
      error: String(err),
      traceback: err && typeof err === "object" && "stack" in err
        ? String((err as Error).stack)
        : String(err),
    });
    post({ type: "FINISHED", durationMs: performance.now() - t0, hadError: true });
    return;
  }

  flushStreams();

  // Status: 0 ok, 1 python error, 2 interrupted (stop or timeout)
  if (status === 2) {
    const reason = interruptReason ?? "stop";
    post({ type: "STOPPED", reason, durationMs: performance.now() - t0 });
    return;
  }

  if (status === 1) {
    post({ type: "ERROR", error: "Python error", traceback });
    post({
      type: "FINISHED",
      durationMs: performance.now() - t0,
      hadError: true,
    });
    return;
  }

  // success: collect matplotlib figures (if any) and newly created files
  let newFiles: FsFilePayload[] = [];
  try {
    const plots = pyodide.globals.get("__ide_collect_plots")().toJs() as string[];
    for (const p of plots) post({ type: "PLOT", data: p });
  } catch {
    /* ignore */
  }
  try {
    newFiles = detectNewFiles(knownPaths);
  } catch {
    /* ignore */
  }

  post({
    type: "FINISHED",
    durationMs: performance.now() - t0,
    hadError: false,
    newFiles,
  });
}

// ---- package installation ----------------------------------------------
async function handleInstall(packages: string[]): Promise<void> {
  if (!ready || !pyodide) {
    post({
      type: "INSTALLED",
      packages: [],
      failed: packages,
      message: "Python runtime is not ready.",
    });
    return;
  }
  const ok: string[] = [];
  const fail: string[] = [];
  for (const pkg of packages) {
    post({ type: "INSTALL_PROGRESS", message: `Installing ${pkg}…` });
    let installed = false;
    try {
      await pyodide.loadPackage(pkg);
      installed = true;
    } catch {
      try {
        await pyodide.loadPackage("micropip");
        const micropip = pyodide.pyimport("micropip");
        await micropip.install(pkg);
        installed = true;
      } catch {
        installed = false;
      }
    }
    if (installed) {
      ok.push(pkg);
      post({ type: "INSTALL_PROGRESS", message: `${pkg} installed.` });
    } else {
      fail.push(pkg);
      post({
        type: "INSTALL_PROGRESS",
        message: `${pkg} is not compatible with the browser Python runtime.`,
      });
    }
  }
  post({
    type: "INSTALLED",
    packages: ok,
    failed: fail,
      message:
        ok.length && fail.length
          ? `Installed ${ok.join(", ")}. Failed: ${fail.join(", ")}.`
          : ok.length
            ? `Successfully installed ${ok.join(", ")}.`
            : `Could not install ${fail.join(", ")}.`,
  });
}

// ---- test-run (captured, non-interactive) ------------------------------
async function handleTestRun(code: string, stdin: string): Promise<void> {
  if (!ready || !pyodide) {
    post({
      type: "TEST_RESULT",
      stdout: "",
      stderr: "",
      traceback: "Python runtime is not ready.",
      status: 1,
    });
    return;
  }
  if (interruptBuffer) interruptBuffer[0] = 0;
  captureMode = true;
  capOut = "";
  capErr = "";
  testStdinLines = stdin ? stdin.replace(/\r\n/g, "\n").split("\n") : [];
  // a trailing newline from split produces an empty element; keep it so a
  // final blank input() yields "" rather than EOF unless the user intended EOF
  if (stdin && stdin.endsWith("\n")) testStdinLines.pop();
  testStdinIdx = 0;

  let status = 0;
  let traceback = "";
  try {
    const res = pyodide.globals.get("__ide_run")(code, "<test>").toJs();
    status = res[0] as number;
    traceback = res[1] as string;
  } catch (err) {
    status = 1;
    traceback = String(err);
  }

  let plots: string[] = [];
  try {
    plots = pyodide.globals.get("__ide_collect_plots")().toJs();
  } catch {
    // ignore plot errors
  }

  const stdout = capOut;
  const stderr = capErr;
  captureMode = false;
  capOut = "";
  capErr = "";
  testStdinLines = [];
  testStdinIdx = 0;

  post({
    type: "TEST_RESULT",
    stdout,
    stderr: stderr + (status === 1 && traceback ? traceback : ""),
    traceback: status === 1 ? traceback : undefined,
    status,
    plots,
  });
}

// ---- message router -----------------------------------------------------
self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const msg = e.data;
  try {
    switch (msg.type) {
      case "INIT": {
        stdinFlag = new Int32Array(msg.stdin, 0, 1);
        stdinLen = new Int32Array(msg.stdin, 4, 1);
        stdinBytes = new Uint8Array(msg.stdin, 8);
        interruptBuffer = new Int32Array(msg.interrupt);
        if (pyodide) pyodide.setInterruptBuffer(interruptBuffer);
        if (!ready) await initPyodide();
        else post({ type: "READY", pythonVersion: "", pyodideVersion: PYODIDE_VERSION });
        break;
      }
      case "RUN":
        await handleRun(msg);
        break;

      case "STOP":
        // The UI writes the interrupt SharedArrayBuffer directly. Nothing to do.
        break;
      case "INSTALL":
        await handleInstall(msg.packages);
        break;
      case "TEST_RUN":
        await handleTestRun(msg.code, msg.stdin ?? "");
        break;
      case "RESTART":
        // The UI recreates the worker by terminating this one.
        self.close();
        break;
    }
  } catch (err) {
    post({ type: "FATAL", error: String(err) });
  }
};

export {};
