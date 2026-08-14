import { describe, expect, it, vi } from "vitest";
import { TerminalStore, terminalSnapshotText } from "@/lib/terminal/store";

describe("terminal store", () => {
  it("splits complete lines while preserving a partial line", () => {
    const store = new TerminalStore();
    store.stdout("one\ntwo\npartial");
    store.flush();

    expect(store.getSnapshot().lines).toMatchObject([
      { segments: [{ kind: "stdout", text: "one" }] },
      { segments: [{ kind: "stdout", text: "two" }] },
    ]);
    expect(store.getSnapshot().pending).toEqual([
      { kind: "stdout", text: "partial" },
    ]);
  });

  it("publishes immutable snapshots when pending output changes", () => {
    const store = new TerminalStore();
    store.stdout("Name: ");
    store.flush();
    const first = store.getSnapshot();
    store.write("prompt", "> ");
    store.flush();
    const second = store.getSnapshot();

    expect(first.pending).toEqual([{ kind: "stdout", text: "Name: " }]);
    expect(second.pending).toEqual([
      { kind: "stdout", text: "Name: " },
      { kind: "prompt", text: "> " },
    ]);
    expect(second.pending).not.toBe(first.pending);
  });

  it("coalesces adjacent segments of the same kind", () => {
    const store = new TerminalStore();
    store.stdout("hel");
    store.stdout("lo");
    store.stderr(" error");
    store.flush();

    expect(store.getSnapshot().pending).toEqual([
      { kind: "stdout", text: "hello" },
      { kind: "stderr", text: " error" },
    ]);
  });

  it("finalizes unterminated output before adding a system message", () => {
    const store = new TerminalStore();
    store.stdout("no newline");
    store.system("Finished");

    expect(store.getSnapshot().lines).toMatchObject([
      { segments: [{ kind: "stdout", text: "no newline" }] },
      { segments: [{ kind: "system", text: "Finished" }] },
    ]);
    expect(store.getSnapshot().pending).toEqual([]);
  });

  it("tracks the input request and echo lifecycle", () => {
    const store = new TerminalStore();
    store.stdout("Name: ");
    store.requestInput();
    expect(store.getSnapshot().awaitingInput).toBe(true);
    expect(store.getSnapshot().pending).toEqual([
      { kind: "stdout", text: "Name: " },
    ]);

    store.echoInput("Mahesh");
    expect(store.getSnapshot().awaitingInput).toBe(false);
    expect(store.getSnapshot().lines[0].segments.at(-1)).toEqual({
      kind: "input",
      text: "Mahesh",
    });
  });

  it("cancels input without discarding terminal content", () => {
    const store = new TerminalStore();
    store.stdout("Name: ");
    store.requestInput();
    store.cancelInput();
    expect(store.getSnapshot().awaitingInput).toBe(false);
    expect(store.getSnapshot().pending).toEqual([
      { kind: "stdout", text: "Name: " },
    ]);
  });

  it("notifies subscribers on committed updates", () => {
    vi.useFakeTimers();
    const store = new TerminalStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.stdout("hello\n");
    expect(listener).not.toHaveBeenCalled();
    vi.advanceTimersByTime(16);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.system("done");
    expect(listener).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("exports complete lines and pending output as plain text", () => {
    const store = new TerminalStore();
    store.stdout("one\ntwo");
    store.stderr(" error");
    store.flush();
    expect(terminalSnapshotText(store.getSnapshot())).toBe("one\ntwo error");
  });

  it("clears all output and state", () => {
    const store = new TerminalStore();
    store.stdout("value\npartial");
    store.requestInput();
    store.clear();

    expect(store.getSnapshot()).toEqual({
      lines: [],
      pending: [],
      awaitingInput: false,
      truncated: false,
    });
  });

  it("limits excessive output", () => {
    const store = new TerminalStore();
    store.stdout("x".repeat(500_000));
    store.stdout("hidden");

    expect(store.getSnapshot().truncated).toBe(true);
    expect(store.getSnapshot().lines.at(-1)?.segments[0].text).toMatch(
      /Output limit reached/,
    );
  });
});
