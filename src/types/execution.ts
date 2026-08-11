// Execution bookkeeping types.

export type RunOutcome = "success" | "error" | "stopped";

export interface HistoryEntry {
  id: string;
  filename: string;
  outcome: RunOutcome;
  durationMs: number;
  timestamp: number;
}

export interface TestCase {
  id: string;
  name: string;
  stdin: string;
  expected: string;
}

export interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}
