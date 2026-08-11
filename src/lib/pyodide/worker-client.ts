import type {
  WorkerMessage,
  WorkerResponse,
  FsFilePayload,
  RuntimeStatus,
} from "@/types/python";

export interface RuntimeInfo {
  pythonVersion: string;
  pyodideVersion: string;
}

export interface PyodideHandlers {
  onLoading?: (message: string, progress?: number) => void;
  onReady?: (info: RuntimeInfo) => void;
  onStatus?: (status: RuntimeStatus) => void;
  onStdout?: (data: string) => void;
  onStderr?: (data: string) => void;
  onStdinRequest?: () => void;
  onStarted?: () => void;
  onFinished?: (info: {
    durationMs: number;
    hadError: boolean;
    newFiles?: FsFilePayload[];
  }) => void;
  onError?: (info: { error: string; traceback?: string }) => void;
  onStopped?: (info: { reason: string; durationMs: number }) => void;
  onPlot?: (data: string) => void;
  onInstallProgress?: (message: string) => void;
  onInstalled?: (info: {
    packages: string[];
    failed: string[];
    message: string;
  }) => void;
  onFatal?: (error: string) => void;
}

const STDIN_CAPACITY = 65536;

/**
 * Typed wrapper around the Pyodide Web Worker. Owns the SharedArrayBuffers used
 * for blocking input() and interrupts, and implements the execution timeout,
 * the Stop watchdog, and pause-during-input so input() never consumes the
 * time budget.
 */
export class PyodideClient {
  private worker: Worker | null = null;
  private handlers: PyodideHandlers;

  private stdinSAB!: SharedArrayBuffer;
  private interruptSAB!: SharedArrayBuffer;
  private interruptView!: Int32Array;

  private ready = false;
  private running = false;
  private status: RuntimeStatus = "loading";

  // timeout bookkeeping
  private timeoutMs = 10000;
  private runStart = 0;
  private elapsedPause = 0;
  private inputPauseStart: number | null = null;
  private tickTimer: ReturnType<typeof setInterval> | null = null;
  private lastInterruptAction: "stop" | "timeout" | null = null;
  private stopWatchdog: ReturnType<typeof setTimeout> | null = null;
  private pendingRun: {
    code: string;
    filename: string;
    files?: FsFilePayload[];
    timeoutMs?: number;
  } | null = null;

  private testResolver:
    | ((r: {
        stdout: string;
        stderr: string;
        traceback?: string;
        status: number;
        plots?: string[];
      }) => void)
    | null = null;

  constructor(handlers: PyodideHandlers) {
    this.handlers = handlers;
  }

  start(): void {
    if (typeof SharedArrayBuffer === "undefined" || !self.crossOriginIsolated) {
      this.handlers.onFatal?.(
        "This browser tab is not cross-origin isolated. Real input() requires SharedArrayBuffer, which needs COOP/COEP headers. Please reload; if the error persists the runtime headers could not be applied.",
      );
      return;
    }
    this.setStatus("loading");
    this.stdinSAB = new SharedArrayBuffer(8 + STDIN_CAPACITY);
    this.interruptSAB = new SharedArrayBuffer(4);
    this.interruptView = new Int32Array(this.interruptSAB);
    this.worker = new Worker(
      new URL("../../workers/python.worker.ts", import.meta.url),
      { type: "module" },
    );
    this.worker.onmessage = (e: MessageEvent<WorkerResponse>) =>
      this.handleResponse(e.data);
    this.worker.onerror = (e: ErrorEvent) => {
      this.handlers.onFatal?.(`Worker crashed: ${e.message}`);
    };
    const init: WorkerMessage = {
      type: "INIT",
      stdin: this.stdinSAB,
      interrupt: this.interruptSAB,
    };
    this.worker.postMessage(init);
  }

  isReady(): boolean {
    return this.ready;
  }
  isRunning(): boolean {
    return this.running;
  }

  run(
    code: string,
    filename: string,
    files?: FsFilePayload[],
    timeoutMs?: number,
  ): void {
    if (this.running) return;
    if (!this.ready) {
      this.pendingRun = { code, filename, files, timeoutMs };
      return;
    }
    this.lastInterruptAction = null;
    this.elapsedPause = 0;
    this.inputPauseStart = null;
    this.runStart = performance.now();
    this.timeoutMs = timeoutMs ?? 10000;
    this.running = true;
    this.setStatus("running");
    this.startTimeoutTick();
    const msg: WorkerMessage = { type: "RUN", code, filename, files };
    this.worker?.postMessage(msg);
  }

  sendStdin(value: string, eof = false): void {
    if (this.inputPauseStart !== null) {
      this.elapsedPause += performance.now() - this.inputPauseStart;
      this.inputPauseStart = null;
    }
    if (this.running) this.setStatus("running");
    
    const stdinFlag = new Int32Array(this.stdinSAB, 0, 1);
    const stdinLen = new Int32Array(this.stdinSAB, 4, 1);
    const stdinBytes = new Uint8Array(this.stdinSAB, 8);
    
    if (eof) {
      stdinFlag[0] = 2;
    } else {
      const enc = new TextEncoder().encode(value);
      const max = stdinBytes.length;
      const slice = enc.length > max ? enc.subarray(0, max) : enc;
      stdinLen[0] = slice.length;
      stdinBytes.set(slice, 0);
      stdinFlag[0] = 1;
    }
    Atomics.notify(stdinFlag, 0);
  }

  stop(): void {
    if (!this.running) return;
    this.lastInterruptAction = "stop";
    this.interruptView[0] = 2; // signal KeyboardInterrupt
    // watchdog: if the worker cannot be interrupted safely, recreate it
    if (this.stopWatchdog) clearTimeout(this.stopWatchdog);
    this.stopWatchdog = setTimeout(() => {
      if (this.running) {
        this.handlers.onStopped?.({
          reason: "Execution terminated (could not be interrupted safely).",
          durationMs: performance.now() - this.runStart,
        });
        this.restart();
      }
    }, 2500);
  }

  restart(): void {
    this.running = false;
    this.ready = false;
    this.pendingRun = null;
    this.clearTimers();
    this.worker?.terminate();
    this.start();
  }

  install(packages: string[]): void {
    if (!this.ready) {
      this.handlers.onInstalled?.({
        packages: [],
        failed: packages,
        message: "Python runtime is not ready yet.",
      });
      return;
    }
    this.setStatus("installing");
    const msg: WorkerMessage = { type: "INSTALL", packages };
    this.worker?.postMessage(msg);
  }

  /** Run code non-interactively with predefined stdin, capturing output. */
  runTest(
    code: string,
    stdin = "",
    timeoutMs = 5000,
  ): Promise<{
    stdout: string;
    stderr: string;
    traceback?: string;
    status: number;
    plots?: string[];
  }> {
    return new Promise((resolve) => {
      this.interruptView[0] = 0;
      const timer = setTimeout(() => {
        this.interruptView[0] = 2; // interrupt runaway loops in tests too
      }, timeoutMs);
      this.testResolver = (r) => {
        clearTimeout(timer);
        resolve(r);
      };
      const msg: WorkerMessage = { type: "TEST_RUN", code, stdin };
      this.worker?.postMessage(msg);
    });
  }

  dispose(): void {
    this.clearTimers();
    this.worker?.terminate();
    this.worker = null;
  }

  // ---- internals --------------------------------------------------------
  private startTimeoutTick(): void {
    if (this.tickTimer) clearInterval(this.tickTimer);
    this.tickTimer = setInterval(() => this.checkTimeout(), 250);
  }

  private checkTimeout(): void {
    if (!this.running || this.inputPauseStart !== null) return;
    const elapsed = performance.now() - this.runStart - this.elapsedPause;
    if (elapsed >= this.timeoutMs) {
      this.lastInterruptAction = "timeout";
      this.interruptView[0] = 2;
    }
  }

  private clearTimers(): void {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
      this.tickTimer = null;
    }
    if (this.stopWatchdog) {
      clearTimeout(this.stopWatchdog);
      this.stopWatchdog = null;
    }
  }

  private setStatus(status: RuntimeStatus): void {
    this.status = status;
    this.handlers.onStatus?.(status);
  }

  private endRun(): void {
    this.running = false;
    this.clearTimers();
    if (this.status !== "error") this.setStatus("ready");
  }

  private handleResponse(msg: WorkerResponse): void {
    switch (msg.type) {
      case "LOADING":
        this.handlers.onLoading?.(msg.message, msg.progress);
        break;
      case "READY":
        this.ready = true;
        this.setStatus("ready");
        this.handlers.onReady?.({
          pythonVersion: msg.pythonVersion,
          pyodideVersion: msg.pyodideVersion,
        });
        if (this.pendingRun) {
          const p = this.pendingRun;
          this.pendingRun = null;
          this.run(p.code, p.filename, p.files, p.timeoutMs);
        }
        break;
      case "STDOUT":
        this.handlers.onStdout?.(msg.data);
        break;
      case "STDERR":
        this.handlers.onStderr?.(msg.data);
        break;
      case "STDIN_REQUEST":
        this.inputPauseStart = performance.now();
        if (this.running) this.setStatus("waiting-input");
        this.handlers.onStdinRequest?.();
        break;
      case "STARTED":
        this.handlers.onStarted?.();
        break;
      case "PLOT":
        this.handlers.onPlot?.(msg.data);
        break;
      case "ERROR":
        this.handlers.onError?.({ error: msg.error, traceback: msg.traceback });
        break;
      case "FINISHED":
        this.handlers.onFinished?.({
          durationMs: msg.durationMs,
          hadError: msg.hadError,
          newFiles: msg.newFiles,
        });
        this.endRun();
        break;
      case "STOPPED": {
        const reason =
          this.lastInterruptAction === "timeout"
            ? "Execution stopped: time limit exceeded."
            : msg.reason === "stop"
              ? "Execution stopped."
              : msg.reason;
        this.handlers.onStopped?.({
          reason,
          durationMs: msg.durationMs,
        });
        this.endRun();
        break;
      }
      case "INSTALL_PROGRESS":
        this.handlers.onInstallProgress?.(msg.message);
        break;
      case "INSTALLED":
        this.setStatus("ready");
        this.handlers.onInstalled?.({
          packages: msg.packages,
          failed: msg.failed,
          message: msg.message,
        });
        break;
      case "TEST_RESULT":
        if (this.testResolver) {
          this.testResolver({
            stdout: msg.stdout,
            stderr: msg.stderr,
            traceback: msg.traceback,
            status: msg.status,
            plots: msg.plots,
          });
          this.testResolver = null;
        }
        break;
      case "FATAL":
        this.ready = false;
        this.running = false;
        this.setStatus("error");
        this.handlers.onFatal?.(msg.error);
        break;
    }
  }
}
