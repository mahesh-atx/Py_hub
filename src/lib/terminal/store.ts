import type { SegmentKind } from "./types";

export interface Segment {
  kind: SegmentKind;
  text: string;
}

export interface TLine {
  id: number;
  segments: Segment[];
}

export interface TerminalSnapshot {
  lines: readonly TLine[];
  pending: readonly Segment[];
  awaitingInput: boolean;
  truncated: boolean;
}

const MAX_CHARS = 500_000;
const MAX_LINES = 4000;

/**
 * Lightweight terminal model. Output is accumulated synchronously and the
 * React snapshot is rebuilt on a short debounce so a flood of `print()` calls
 * (e.g. 100k iterations) never causes per-character re-renders. Subscribers use
 * `useSyncExternalStore`, so editor/output components update independently.
 */
export class TerminalStore {
  private lines: TLine[] = [];
  private cur: Segment[] = [];
  private nextId = 1;
  private awaitingInput = false;
  private truncated = false;
  private charCount = 0;
  private listeners = new Set<() => void>();
  private snap: TerminalSnapshot = {
    lines: [],
    pending: [],
    awaitingInput: false,
    truncated: false,
  };
  private flushScheduled = false;
  private arrowPending = false;

  subscribe = (cb: () => void): (() => void) => {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  };

  getSnapshot = (): TerminalSnapshot => this.snap;

  private commit(): void {
    this.snap = {
      // New array identities are required by both useSyncExternalStore and the
      // xterm synchronization effects; the mutable internal buffers stay private.
      lines: [...this.lines],
      pending: this.cur.map((segment) => ({ ...segment })),
      awaitingInput: this.awaitingInput,
      truncated: this.truncated,
    };
    this.listeners.forEach((l) => l());
  }

  private schedule(): void {
    if (this.flushScheduled) return;
    this.flushScheduled = true;
    setTimeout(() => {
      this.flushScheduled = false;
      this.commit();
    }, 16);
  }

  private enforceLimit(): void {
    if (this.lines.length > MAX_LINES) {
      this.lines = this.lines.slice(-Math.floor(MAX_LINES * 0.8));
    }
  }

  /** Append streamed output, honouring exact newlines (preserves prompts). */
  write(kind: SegmentKind, text: string): void {
    if (!text) return;
    if (this.arrowPending && (kind === "stdout" || kind === "stderr") && this.cur.length === 0) {
      this.cur.push({ kind: "prompt", text: "> " });
      this.arrowPending = false;
    }
    if (this.charCount >= MAX_CHARS) {
      if (!this.truncated) {
        this.truncated = true;
        this.cur = [];
        this.lines.push({
          id: this.nextId++,
          segments: [
            {
              kind: "system",
              text: "Output limit reached. Additional output was hidden to keep the browser responsive.",
            },
          ],
        });
        this.commit();
      }
      return;
    }
    let i = 0;
    while (i < text.length) {
      const nl = text.indexOf("\n", i);
      const chunk = nl === -1 ? text.slice(i) : text.slice(i, nl);
      if (chunk) {
        this.charCount += chunk.length;
        const last = this.cur[this.cur.length - 1];
        if (last && last.kind === kind) last.text += chunk;
        else this.cur.push({ kind, text: chunk });
      }
      if (nl === -1) break;
      this.lines.push({ id: this.nextId++, segments: this.cur });
      this.cur = [];
      i = nl + 1;
    }
    this.enforceLimit();
    this.schedule();
  }

  stdout(data: string): void {
    this.write("stdout", data);
  }

  stderr(data: string): void {
    this.write("stderr", data);
  }

  system(message: string): void {
    if (this.cur.length > 0) {
      this.lines.push({ id: this.nextId++, segments: this.cur });
      this.cur = [];
    }
    this.lines.push({
      id: this.nextId++,
      segments: [{ kind: "system", text: message }],
    });
    this.commit();
  }

  requestInput(): void {
    this.awaitingInput = true;
    this.commit();
  }

  /** Queue a shell-style prompt that prefixes the first line of the next run's output. */
  markRunStart(): void {
    this.arrowPending = true;
  }

  /** Echo a submitted input line onto the open prompt line, then finalize it. */
  echoInput(value: string): void {
    this.cur.push({ kind: "input", text: value });
    this.lines.push({ id: this.nextId++, segments: this.cur });
    this.cur = [];
    this.awaitingInput = false;
    this.commit();
  }

  cancelInput(): void {
    this.awaitingInput = false;
    this.commit();
  }

  clear(): void {
    this.lines = [];
    this.cur = [];
    this.charCount = 0;
    this.truncated = false;
    this.awaitingInput = false;
    this.arrowPending = false;
    this.commit();
  }

  flush(): void {
    this.commit();
  }
}

export function terminalSnapshotText(snapshot: TerminalSnapshot): string {
  const lines = snapshot.lines.map((line) =>
    line.segments.map((segment) => segment.text).join(""),
  );
  const pending = snapshot.pending.map((segment) => segment.text).join("");
  if (pending) lines.push(pending);
  return lines.join("\n");
}

export const terminalStore = new TerminalStore();
