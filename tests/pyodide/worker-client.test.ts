import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PyodideClient } from "@/lib/pyodide/worker-client";
import type { WorkerMessage, WorkerResponse } from "@/types/python";

class MockWorker {
  static instances: MockWorker[] = [];

  onmessage: ((event: MessageEvent<WorkerResponse>) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  messages: WorkerMessage[] = [];
  terminated = false;

  constructor() {
    MockWorker.instances.push(this);
  }

  postMessage(message: WorkerMessage) {
    this.messages.push(message);
  }

  emit(message: WorkerResponse) {
    this.onmessage?.({ data: message } as MessageEvent<WorkerResponse>);
  }

  terminate() {
    this.terminated = true;
  }
}

function currentWorker(): MockWorker {
  return MockWorker.instances.at(-1)!;
}

function ready(worker: MockWorker) {
  worker.emit({
    type: "READY",
    pythonVersion: "3.12.1",
    pyodideVersion: "0.26.3",
  });
}

beforeEach(() => {
  MockWorker.instances = [];
  vi.stubGlobal("Worker", MockWorker);
  Object.defineProperty(globalThis.self, "crossOriginIsolated", {
    configurable: true,
    value: true,
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Pyodide worker client", () => {
  it("initializes shared input and interrupt buffers", () => {
    const onReady = vi.fn();
    const client = new PyodideClient({ onReady });
    client.start();
    const worker = currentWorker();

    expect(worker.messages[0]).toMatchObject({ type: "INIT" });
    const init = worker.messages[0] as Extract<WorkerMessage, { type: "INIT" }>;
    expect(init.stdin).toBeInstanceOf(SharedArrayBuffer);
    expect(init.interrupt).toBeInstanceOf(SharedArrayBuffer);

    ready(worker);
    expect(client.isReady()).toBe(true);
    expect(onReady).toHaveBeenCalledWith({
      pythonVersion: "3.12.1",
      pyodideVersion: "0.26.3",
    });
    client.dispose();
  });

  it("reports a clear fatal error without cross-origin isolation", () => {
    Object.defineProperty(globalThis.self, "crossOriginIsolated", {
      configurable: true,
      value: false,
    });
    const onFatal = vi.fn();
    const client = new PyodideClient({ onFatal });

    client.start();

    expect(onFatal).toHaveBeenCalledWith(expect.stringContaining("cross-origin isolated"));
    expect(MockWorker.instances).toHaveLength(0);
  });

  it("queues test runs and sends only one to the worker at a time", async () => {
    const client = new PyodideClient({});
    client.start();
    const worker = currentWorker();
    ready(worker);

    const first = client.runTest("print('first')", "one", 10_000);
    const second = client.runTest("print('second')", "two", 10_000);
    expect(worker.messages.filter((message) => message.type === "TEST_RUN")).toHaveLength(
      1,
    );

    worker.emit({
      type: "TEST_RESULT",
      stdout: "first\n",
      stderr: "",
      status: 0,
    });
    await expect(first).resolves.toMatchObject({ stdout: "first\n", status: 0 });

    const testMessages = worker.messages.filter(
      (message): message is Extract<WorkerMessage, { type: "TEST_RUN" }> =>
        message.type === "TEST_RUN",
    );
    expect(testMessages).toHaveLength(2);
    expect(testMessages[1]).toMatchObject({
      code: "print('second')",
      stdin: "two",
      isolated: true,
    });

    worker.emit({
      type: "TEST_RESULT",
      stdout: "second\n",
      stderr: "",
      status: 0,
    });
    await expect(second).resolves.toMatchObject({ stdout: "second\n", status: 0 });
    client.dispose();
  });

  it("serializes package installations with test execution", async () => {
    const onInstalled = vi.fn();
    const client = new PyodideClient({ onInstalled });
    client.start();
    const worker = currentWorker();
    ready(worker);

    const test = client.runTest("print('test')");
    client.install(["numpy", "numpy"]);
    client.install(["pandas"]);
    expect(worker.messages.some((message) => message.type === "INSTALL")).toBe(false);

    worker.emit({ type: "TEST_RESULT", stdout: "test\n", stderr: "", status: 0 });
    await test;
    expect(worker.messages.at(-1)).toMatchObject({
      type: "INSTALL",
      packages: ["numpy"],
    });

    worker.emit({
      type: "INSTALLED",
      packages: ["numpy"],
      failed: [],
      message: "installed numpy",
    });
    expect(worker.messages.at(-1)).toMatchObject({
      type: "INSTALL",
      packages: ["pandas"],
    });
    worker.emit({
      type: "INSTALLED",
      packages: ["pandas"],
      failed: [],
      message: "installed pandas",
    });
    expect(onInstalled).toHaveBeenCalledTimes(2);
    worker.emit({
      type: "INSTALLED",
      packages: [],
      failed: ["scipy"],
      message: "failed scipy",
    });
    expect(onInstalled).toHaveBeenLastCalledWith({
      packages: [],
      failed: ["scipy"],
      failures: [
        {
          name: "scipy",
          reason: "The package could not be downloaded or loaded.",
        },
      ],
      message: "failed scipy",
    });
    client.dispose();
  });

  it("holds tests until the runtime is ready", async () => {
    const client = new PyodideClient({});
    client.start();
    const worker = currentWorker();
    const result = client.runTest("print(1)");

    expect(worker.messages.some((message) => message.type === "TEST_RUN")).toBe(false);
    ready(worker);
    expect(worker.messages.some((message) => message.type === "TEST_RUN")).toBe(true);

    worker.emit({ type: "TEST_RESULT", stdout: "1\n", stderr: "", status: 0 });
    await expect(result).resolves.toMatchObject({ status: 0 });
    client.dispose();
  });

  it("preserves the explicit shared-namespace option for notebook cells", async () => {
    const client = new PyodideClient({});
    client.start();
    const worker = currentWorker();
    ready(worker);

    const result = client.runTest("x = 1", "", 5000, false);
    expect(worker.messages.at(-1)).toMatchObject({
      type: "TEST_RUN",
      isolated: false,
    });
    worker.emit({ type: "TEST_RESULT", stdout: "", stderr: "", status: 0 });
    await result;
    client.dispose();
  });

  it("runs a pending interactive execution after the active test", async () => {
    const onStatus = vi.fn();
    const client = new PyodideClient({ onStatus });
    client.start();
    const worker = currentWorker();
    ready(worker);

    const test = client.runTest("print('test')");
    client.run("print('interactive')", "main.py");
    expect(worker.messages.some((message) => message.type === "RUN")).toBe(false);

    worker.emit({ type: "TEST_RESULT", stdout: "test\n", stderr: "", status: 0 });
    await test;
    expect(worker.messages.at(-1)).toMatchObject({
      type: "RUN",
      filename: "main.py",
    });
    expect(client.isRunning()).toBe(true);

    worker.emit({ type: "FINISHED", durationMs: 5, hadError: false });
    expect(client.isRunning()).toBe(false);
    expect(onStatus).toHaveBeenLastCalledWith("ready");
    client.dispose();
  });

  it("sends full project snapshots and forwards bidirectional filesystem changes", () => {
    const onFinished = vi.fn();
    const client = new PyodideClient({ onFinished });
    client.start();
    const worker = currentWorker();
    ready(worker);

    client.run(
      "print('sync')",
      "src/main.py",
      [{ path: "src/main.py", content: "print('sync')" }],
      ["src", "empty"],
    );
    expect(worker.messages.at(-1)).toMatchObject({
      type: "RUN",
      directories: ["src", "empty"],
      files: [{ path: "src/main.py" }],
    });

    const fsChanges = {
      upserted: [{ path: "src/output.txt", content: "done" }],
      directories: ["reports"],
      deleted: ["empty"],
    };
    worker.emit({
      type: "FINISHED",
      durationMs: 4,
      hadError: false,
      fsChanges,
    });
    expect(onFinished).toHaveBeenCalledWith({
      durationMs: 4,
      hadError: false,
      fsChanges,
    });
    client.dispose();
  });

  it("writes stdin and stop signals into the shared buffers", () => {
    const client = new PyodideClient({});
    client.start();
    const worker = currentWorker();
    const init = worker.messages[0] as Extract<WorkerMessage, { type: "INIT" }>;
    ready(worker);
    client.run("input()", "main.py");

    client.sendStdin("Solapur");
    expect(new Int32Array(init.stdin, 0, 1)[0]).toBe(1);
    const length = new Int32Array(init.stdin, 4, 1)[0];
    expect(new TextDecoder().decode(new Uint8Array(init.stdin, 8, length))).toBe(
      "Solapur",
    );

    client.stop();
    expect(new Int32Array(init.interrupt)[0]).toBe(2);
    client.dispose();
  });

  it("settles active and queued tests when disposed", async () => {
    const client = new PyodideClient({});
    client.start();
    const worker = currentWorker();
    ready(worker);

    const first = client.runTest("while True: pass");
    const second = client.runTest("print('queued')");
    client.dispose();

    await expect(first).resolves.toMatchObject({ status: 1 });
    await expect(second).resolves.toMatchObject({ status: 1 });
    expect(worker.terminated).toBe(true);
  });
});
