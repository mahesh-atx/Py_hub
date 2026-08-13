/// <reference lib="webworker" />
/**
 * Pyodide runtime worker. This is the ONLY place Python code executes.
 *
 * Communication with the UI uses the strongly typed `WorkerMessage` /
 * `WorkerResponse` protocol. stdout/stderr use the raw byte `write` handlers
 * (so newlines/prompts are preserved exactly) and stdin uses a blocking
 * `stdin()` handler backed by a SharedArrayBuffer + Atomics so real, pausable
 * `input()` works. Cross-origin isolation (COOP/COEP) is required for
 * SharedArrayBuffer and is configured by the static host headers.
 */
import type { PlotMetadata, SourceAnalysis } from "@/lib/practice/types";
import type {
  WorkerMessage,
  WorkerResponse,
  FsFilePayload,
  FsSyncChanges,
} from "@/types/python";

const PYODIDE_VERSION = "0.26.3";
const BASE = "/vendor/pyodide";
const PACKAGE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`;
const HOME = "/home/pyodide";

// Lazily typed Pyodide instance.
let pyodide: any = null;
let ready = false;
let bundledPackageRoots = new Set<string>();
let bundledPackageWheels = new Map<string, string>();
let bundledPackageDependencies = new Map<string, string[]>();

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

// Paths owned by the browser workspace after the previous synchronization.
let previousProjectPaths = new Set<string>();
// Datasets preloaded only to support isolated tests must not appear as user files.
const runtimeSeedFiles = new Set<string>();
const runtimeSeedDirectories = new Set<string>();

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
import ast
import json
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

def __ide_analyze_source(code):
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return json.dumps({
            "syntaxValid": False,
            "statementCount": 0,
            "nodeCounts": {},
            "imports": [],
            "calls": [],
            "definitions": [],
        })

    nodes = list(ast.walk(tree))
    counts = {}
    imports = set()
    calls = set()
    definitions = set()

    def dotted_name(node):
        if isinstance(node, ast.Name):
            return node.id
        if isinstance(node, ast.Attribute):
            parent = dotted_name(node.value)
            return f"{parent}.{node.attr}" if parent else node.attr
        return ""

    for node in nodes:
        name = type(node).__name__
        counts[name] = counts.get(name, 0) + 1
        if isinstance(node, ast.Import):
            imports.update(alias.name for alias in node.names)
        elif isinstance(node, ast.ImportFrom):
            if node.module:
                imports.add(node.module)
        elif isinstance(node, ast.Call):
            call = dotted_name(node.func)
            if call:
                calls.add(call)
        elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            definitions.add(node.name)

    return json.dumps({
        "syntaxValid": True,
        "statementCount": sum(isinstance(node, ast.stmt) for node in nodes),
        "nodeCounts": counts,
        "imports": sorted(imports),
        "calls": sorted(calls),
        "definitions": sorted(definitions),
    })

def __ide_collect_plot_bundle():
    try:
        import matplotlib.pyplot as plt
    except Exception:
        return "[]"
    import io, base64
    out = []
    for num in plt.get_fignums():
        fig = plt.figure(num)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=100)
        axes = []
        for ax in fig.axes:
            axes.append({
                "title": ax.get_title(),
                "xlabel": ax.get_xlabel(),
                "ylabel": ax.get_ylabel(),
                "lines": len(ax.lines),
                "bars": len(ax.patches),
                "collections": len(ax.collections),
                "images": len(ax.images),
                "hasLegend": ax.get_legend() is not None,
            })
        suptitle = getattr(fig, "_suptitle", None)
        out.append({
            "image": base64.b64encode(buf.getvalue()).decode(),
            "metadata": {
                "axes": axes,
                "figureTitle": suptitle.get_text() if suptitle is not None else "",
            },
        })
    plt.close("all")
    return json.dumps(out)
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
    pyodide = await loadPyodide({ indexURL: `${BASE}/` });
    try {
      const response = await fetch(`${BASE}/bundled-packages.json`);
      const manifest = await response.json();
      if (manifest.pyodideVersion === PYODIDE_VERSION && Array.isArray(manifest.roots)) {
        bundledPackageRoots = new Set(manifest.roots);
        bundledPackageWheels = new Map(Object.entries(manifest.wheels ?? {}));
        bundledPackageDependencies = new Map(Object.entries(manifest.dependencies ?? {}));
      }
    } catch {
      bundledPackageRoots = new Set();
      bundledPackageWheels = new Map();
      bundledPackageDependencies = new Map();
    }
    // Core assets are always same-origin. Package installs select either the
    // verified static curriculum bundle or the official client-side CDN.
    if (pyodide?._api) {
      pyodide._api.config.indexURL = `${PACKAGE_BASE}/`;
      pyodide._api.setCdnUrl?.(`${PACKAGE_BASE}/`);
    }

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
    // so the offline practice/course data always works — including isolated
    // TEST_RUN executions, which receive no file payload from the UI.
    setTimeout(async () => {
      try {
        const FS = pyodide.FS;
        const csvs = [
          "sales_raw.csv",
          "customers_raw.csv",
          "merged_clean.csv",
          "sales_clean.csv",
          "customers_clean.csv",
          "titanic.csv",
          "iris.csv",
          "weather_sample.csv",
          "stock_sample.csv",
        ];
        // Mirror into both "data/" (cwd-relative, legacy questions) and
        // "starter-project/data/" (as the guides write it).
        for (const root of ["data", "starter-project/data"]) {
          FS.mkdirTree(root);
          const rootParts = root.split("/");
          for (let i = 1; i <= rootParts.length; i++) {
            runtimeSeedDirectories.add(rootParts.slice(0, i).join("/"));
          }
          for (const f of csvs) {
            try {
              if (!FS.analyzePath(`${root}/${f}`).exists) {
                const res = await fetch(`/practice-data/phase-6-data-science/starter-project/data/${f}`);
                if (res.ok) {
                  const buffer = await res.arrayBuffer();
                  FS.writeFile(`${root}/${f}`, new Uint8Array(buffer));
                  runtimeSeedFiles.add(`${root}/${f}`);
                }
              }
            } catch (e) {}
          }
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
      // Captured practice runs should match what learners see in the terminal:
      // input() writes its prompt and the terminal driver echoes the entered line.
      capOut += `${line}\n`;
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
interface ProjectSnapshot {
  files: Map<string, string>;
  directories: Set<string>;
}

const MAX_SYNC_FILE_BYTES = 5 * 1024 * 1024;
const RUNTIME_IGNORED_ROOTS = new Set([".cache", ".matplotlib", ".micropip"]);

function normalizeProjectPath(path: string): string | null {
  const parts = path.replace(/\\/g, "/").split("/").filter(Boolean);
  if (!parts.length || parts.some((part) => part === "." || part === "..")) {
    return null;
  }
  return parts.join("/");
}

function parentDirectories(path: string): string[] {
  const parts = path.split("/");
  const directories: string[] = [];
  for (let index = 1; index < parts.length; index++) {
    directories.push(parts.slice(0, index).join("/"));
  }
  return directories;
}

function removeRuntimePath(path: string): void {
  const FS = pyodide.FS;
  const full = `${HOME}/${path}`;
  try {
    const stat = FS.stat(full);
    if (FS.isDir(stat.mode)) FS.rmdir(full);
    else FS.unlink(full);
  } catch {
    // A non-empty directory is removed after its descendants, or retained if
    // it contains a runtime-owned file that is intentionally not synchronized.
  }
}

function syncProjectSnapshot(
  files: FsFilePayload[],
  directories: string[],
): ProjectSnapshot {
  const FS = pyodide.FS;
  const normalizedFiles = new Map<string, string>();
  const incomingDirectories = new Set<string>();

  for (const directory of directories) {
    const normalized = normalizeProjectPath(directory);
    if (normalized) incomingDirectories.add(normalized);
  }
  for (const file of files) {
    const normalized = normalizeProjectPath(file.path);
    if (!normalized) continue;
    normalizedFiles.set(normalized, file.content ?? "");
    for (const parent of parentDirectories(normalized)) {
      incomingDirectories.add(parent);
    }
  }

  const incomingPaths = new Set([
    ...incomingDirectories,
    ...normalizedFiles.keys(),
  ]);
  [...previousProjectPaths]
    .filter((path) => !incomingPaths.has(path))
    .sort((a, b) => b.split("/").length - a.split("/").length)
    .forEach(removeRuntimePath);

  [...incomingDirectories]
    .sort((a, b) => a.split("/").length - b.split("/").length)
    .forEach((directory) => {
      const full = `${HOME}/${directory}`;
      try {
        if (FS.analyzePath(full).exists && !FS.isDir(FS.stat(full).mode)) {
          FS.unlink(full);
        }
        FS.mkdirTree(full);
      } catch {
        // One invalid entry must not prevent the remaining project from syncing.
      }
    });

  for (const [path, content] of normalizedFiles) {
    try {
      const full = `${HOME}/${path}`;
      if (FS.analyzePath(full).exists && FS.isDir(FS.stat(full).mode)) {
        FS.rmdir(full);
      }
      FS.mkdirTree(`${HOME}/${parentDirectories(path).at(-1) ?? ""}`);
      FS.writeFile(full, content);
    } catch {
      // One invalid entry must not prevent the remaining project from syncing.
    }
  }

  return collectProjectSnapshot(incomingPaths);
}

function collectProjectSnapshot(trackedPaths = previousProjectPaths): ProjectSnapshot {
  const FS = pyodide.FS;
  const files = new Map<string, string>();
  const directories = new Set<string>();
  const decoder = new TextDecoder("utf-8", { fatal: true });

  const walk = (directory: string, relative: string): boolean => {
    let entries: string[];
    try {
      entries = FS.readdir(directory);
    } catch {
      return false;
    }

    let hasIncludedChild = false;
    for (const name of entries) {
      if (name === "." || name === "..") continue;
      const path = relative ? `${relative}/${name}` : name;
      const root = path.split("/")[0];
      if (RUNTIME_IGNORED_ROOTS.has(root) || name === "__pycache__") continue;

      const full = `${directory}/${name}`;
      let stat: { mode: number; size?: number };
      try {
        stat = FS.stat(full);
      } catch {
        continue;
      }

      if (FS.isDir(stat.mode)) {
        const childIncluded = walk(full, path);
        const includeDirectory =
          childIncluded ||
          trackedPaths.has(path) ||
          previousProjectPaths.has(path) ||
          !runtimeSeedDirectories.has(path);
        if (includeDirectory) {
          directories.add(path);
          hasIncludedChild = true;
        }
        continue;
      }

      if (
        runtimeSeedFiles.has(path) &&
        !trackedPaths.has(path) &&
        !previousProjectPaths.has(path)
      ) {
        continue;
      }
      if ((stat.size ?? 0) > MAX_SYNC_FILE_BYTES) continue;

      try {
        files.set(path, decoder.decode(FS.readFile(full)));
        hasIncludedChild = true;
      } catch {
        // Binary and oversized files remain in Pyodide but are not corrupted
        // into the text-only browser workspace.
      }
    }
    return hasIncludedChild;
  };

  walk(HOME, "");
  return { files, directories };
}

function diffProjectSnapshots(
  before: ProjectSnapshot,
  after: ProjectSnapshot,
): FsSyncChanges {
  const upserted: FsFilePayload[] = [];
  for (const [path, content] of after.files) {
    if (before.files.get(path) !== content || before.directories.has(path)) {
      upserted.push({ path, content });
    }
  }

  const directories = [...after.directories].filter(
    (path) => !before.directories.has(path) || before.files.has(path),
  );
  const beforePaths = new Set([...before.files.keys(), ...before.directories]);
  const afterPaths = new Set([...after.files.keys(), ...after.directories]);
  const deleted = [...beforePaths]
    .filter((path) => !afterPaths.has(path))
    .sort((a, b) => b.split("/").length - a.split("/").length);

  previousProjectPaths = afterPaths;
  return { upserted, directories, deleted };
}

function analyzeSource(code: string): SourceAnalysis | undefined {
  try {
    const json = pyodide.globals.get("__ide_analyze_source")(code) as string;
    return JSON.parse(json) as SourceAnalysis;
  } catch {
    return undefined;
  }
}

function collectPlotBundle(): {
  plots: string[];
  plotMetadata: PlotMetadata[];
} {
  try {
    const json = pyodide.globals.get("__ide_collect_plot_bundle")() as string;
    const bundle = JSON.parse(json) as {
      image: string;
      metadata: PlotMetadata;
    }[];
    return {
      plots: bundle.map((entry) => entry.image),
      plotMetadata: bundle.map((entry) => entry.metadata),
    };
  } catch {
    return { plots: [], plotMetadata: [] };
  }
}

// ---- execution ----------------------------------------------------------
async function handleRun(msg: {
  code: string;
  filename: string;
  files?: FsFilePayload[];
  directories?: string[];
}): Promise<void> {
  if (!ready || !pyodide) {
    post({ type: "ERROR", error: "Python runtime is not ready yet." });
    return;
  }
  post({ type: "STARTED" });
  interruptReason = null;
  if (interruptBuffer) interruptBuffer[0] = 0;

  let before: ProjectSnapshot;
  try {
    before = syncProjectSnapshot(msg.files ?? [], msg.directories ?? []);
  } catch {
    before = collectProjectSnapshot();
  }
  const trackedPaths = new Set([
    ...before.files.keys(),
    ...before.directories,
  ]);
  const collectChanges = (): FsSyncChanges => {
    try {
      return diffProjectSnapshots(
        before,
        collectProjectSnapshot(trackedPaths),
      );
    } catch {
      return { upserted: [], directories: [], deleted: [] };
    }
  };

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
    post({
      type: "FINISHED",
      durationMs: performance.now() - t0,
      hadError: true,
      fsChanges: collectChanges(),
    });
    return;
  }

  flushStreams();

  // Status: 0 ok, 1 python error, 2 interrupted (stop or timeout)
  if (status === 2) {
    const reason = interruptReason ?? "stop";
    post({
      type: "STOPPED",
      reason,
      durationMs: performance.now() - t0,
      fsChanges: collectChanges(),
    });
    return;
  }

  if (status === 1) {
    post({ type: "ERROR", error: "Python error", traceback });
    post({
      type: "FINISHED",
      durationMs: performance.now() - t0,
      hadError: true,
      fsChanges: collectChanges(),
    });
    return;
  }

  const plotBundle = collectPlotBundle();
  for (const plot of plotBundle.plots) post({ type: "PLOT", data: plot });

  post({
    type: "FINISHED",
    durationMs: performance.now() - t0,
    hadError: false,
    fsChanges: collectChanges(),
  });
}

// ---- package installation ----------------------------------------------
async function handleInstall(packages: string[]): Promise<void> {
  if (!ready || !pyodide) {
    post({
      type: "INSTALLED",
      packages: [],
      failed: packages,
      failures: packages.map((name) => ({
        name,
        reason: "The Python runtime is not ready yet.",
      })),
      message: "Python runtime is not ready.",
    });
    return;
  }
  const ok: string[] = [];
  const fail: string[] = [];
  const failures: { name: string; reason: string }[] = [];
  for (const pkg of packages) {
    const usesStaticBundle = bundledPackageRoots.has(pkg);
    const packageBase = usesStaticBundle ? `${BASE}/` : `${PACKAGE_BASE}/`;
    if (pyodide?._api) pyodide._api.config.indexURL = packageBase;
    post({
      type: "INSTALL_PROGRESS",
      message: `Installing ${pkg}${usesStaticBundle ? " from the local curriculum bundle" : ""}…`,
    });
    let installed = false;
    let failureReason =
      "Package files could not be downloaded or loaded. Check your connection and retry.";
    try {
      const frozenWheel = bundledPackageWheels.get(pkg);
      if (frozenWheel) {
        const dependencies = bundledPackageDependencies.get(pkg) ?? [];
        if (dependencies.length) await pyodide.loadPackage(dependencies);
        await pyodide.loadPackage(
          new URL(`${BASE}/${frozenWheel}`, self.location.origin).href,
        );
        const imported = pyodide.pyimport(pkg);
        imported?.destroy?.();
        installed = true;
      } else {
        await pyodide.loadPackage(pkg);
        // Pyodide reports individual fetch failures through its message callback
        // without always rejecting the aggregate promise. Do not claim success
        // unless the package registry confirms that installation completed.
        installed = Boolean(pyodide.loadedPackages?.[pkg]);
      }
    } catch (error) {
      failureReason = `Pyodide package installation failed: ${String(error)}`;
    }
    if (!installed) {
      try {
        // micropip and arbitrary pure-Python wheels are external fallbacks;
        // keep them client-side but restore the official package repository.
        if (pyodide?._api) pyodide._api.config.indexURL = `${PACKAGE_BASE}/`;
        await pyodide.loadPackage("micropip");
        const micropip = pyodide.pyimport("micropip");
        await micropip.install(pkg);
        installed = true;
      } catch (error) {
        const detail = String(error);
        failureReason = /fetch|network|connection|load/i.test(detail)
          ? "The package download failed. Check your network connection and retry."
          : `No browser-compatible wheel could be installed: ${detail}`;
      }
    }
    if (installed) {
      ok.push(pkg);
      post({ type: "INSTALL_PROGRESS", message: `${pkg} installed.` });
    } else {
      fail.push(pkg);
      failures.push({ name: pkg, reason: failureReason });
      post({
        type: "INSTALL_PROGRESS",
        message: `${pkg} could not be installed.`,
      });
    }
  }
  post({
    type: "INSTALLED",
    packages: ok,
    failed: fail,
    failures,
    message:
      ok.length && fail.length
        ? `Installed ${ok.join(", ")}. Failed: ${fail.join(", ")}.`
        : ok.length
          ? `Successfully installed ${ok.join(", ")}.`
          : `Could not install ${fail.join(", ")}.`,
  });
}

// ---- test-run (captured, non-interactive) ------------------------------
async function handleTestRun(
  code: string,
  stdin: string,
  isolated = true,
): Promise<void> {
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
  const sourceAnalysis = analyzeSource(code);
  if (isolated) {
    try {
      pyodide.globals.get("__ide_reset")();
    } catch {
      // A failed reset is surfaced by the execution result below.
    }
  }
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

  const plotBundle = collectPlotBundle();

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
    plots: plotBundle.plots,
    sourceAnalysis,
    plotMetadata: plotBundle.plotMetadata,
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
        await handleTestRun(msg.code, msg.stdin ?? "", msg.isolated ?? true);
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
