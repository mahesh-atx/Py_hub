// Strongly typed message protocol between the React UI and the Pyodide worker.
// The worker is the ONLY place Python code executes. No backend is involved.

export type RuntimeStatus =
  | "loading"
  | "ready"
  | "running"
  | "waiting-input"
  | "installing"
  | "error"
  | "stopped";

export interface FsFilePayload {
  path: string;
  content: string;
}

/** Messages sent FROM the UI TO the worker. */
export type WorkerMessage =
  | {
      type: "INIT";
      stdin: SharedArrayBuffer;
      interrupt: SharedArrayBuffer;
    }
  | {
      type: "RUN";
      code: string;
      filename: string;
      files?: FsFilePayload[];
      timeoutMs?: number;
    }
  | { type: "STDIN"; value: string; eof?: boolean }
  | { type: "STOP" }
  | { type: "RESTART" }
  | { type: "INSTALL"; packages: string[] }
  | { type: "TEST_RUN"; code: string; stdin?: string };

/** Messages sent FROM the worker TO the UI. */
export type WorkerResponse =
  | { type: "LOADING"; message: string; progress?: number }
  | { type: "READY"; pythonVersion: string; pyodideVersion: string }
  | { type: "STDOUT"; data: string }
  | { type: "STDERR"; data: string }
  | { type: "STDIN_REQUEST"; prompt?: string }
  | { type: "STARTED" }
  | {
      type: "FINISHED";
      durationMs: number;
      hadError: boolean;
      newFiles?: FsFilePayload[];
    }
  | { type: "ERROR"; error: string; traceback?: string }
  | { type: "STOPPED"; reason: string; durationMs: number }
  | { type: "PLOT"; data: string }
  | { type: "INSTALL_PROGRESS"; message: string }
  | {
      type: "INSTALLED";
      packages: string[];
      failed: string[];
      message: string;
    }
  | {
      type: "TEST_RESULT";
      stdout: string;
      stderr: string;
      traceback?: string;
      status: number;
      plots?: string[];
    }
  | { type: "FATAL"; error: string };
