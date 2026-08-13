// Strongly typed message protocol between the React UI and the Pyodide worker.
// The worker is the ONLY place Python code executes. No backend is involved.
import type { PlotMetadata, SourceAnalysis } from "@/lib/practice/types";

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

export interface FsSyncChanges {
  /** New files and changed existing text files. */
  upserted: FsFilePayload[];
  /** New empty or non-empty directories created by Python. */
  directories: string[];
  /** File or directory paths removed by Python, deepest paths first. */
  deleted: string[];
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
      directories?: string[];
      timeoutMs?: number;
    }
  | { type: "STDIN"; value: string; eof?: boolean }
  | { type: "STOP" }
  | { type: "RESTART" }
  | { type: "INSTALL"; packages: string[] }
  | { type: "TEST_RUN"; code: string; stdin?: string; isolated?: boolean };

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
      fsChanges?: FsSyncChanges;
    }
  | { type: "ERROR"; error: string; traceback?: string }
  | {
      type: "STOPPED";
      reason: string;
      durationMs: number;
      fsChanges?: FsSyncChanges;
    }
  | { type: "PLOT"; data: string }
  | { type: "INSTALL_PROGRESS"; message: string }
  | {
      type: "INSTALLED";
      packages: string[];
      failed: string[];
      failures?: { name: string; reason: string }[];
      message: string;
    }
  | {
      type: "TEST_RESULT";
      stdout: string;
      stderr: string;
      traceback?: string;
      status: number;
      plots?: string[];
      sourceAnalysis?: SourceAnalysis;
      plotMetadata?: PlotMetadata[];
    }
  | { type: "FATAL"; error: string };
