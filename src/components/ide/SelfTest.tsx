"use client";

import { useState } from "react";
import { Play, Loader2, CircleCheck, CircleX } from "lucide-react";

interface TestCase {
  id: string;
  name: string;
  code: string;
  stdin?: string;
  expect?: string;
  expectError?: boolean;
  expectInterrupt?: boolean;
  timeoutMs?: number;
}

const SUITE: TestCase[] = [
  {
    id: "basic",
    name: 'print("Hello World")',
    code: 'print("Hello World")',
    expect: "Hello World\n",
  },
  {
    id: "vars",
    name: "Variables",
    code: "x = 10\nprint(x)",
    expect: "10\n",
  },
  {
    id: "cond",
    name: "Conditions",
    code: 'if 10 > 5:\n    print("yes")',
    expect: "yes\n",
  },
  {
    id: "loops",
    name: "Loops",
    code: "for i in range(5):\n    print(i)",
    expect: "0\n1\n2\n3\n4\n",
  },
  {
    id: "func",
    name: "Functions",
    code: "def add(a, b):\n    return a + b\n\nprint(add(2, 3))",
    expect: "5\n",
  },
  {
    id: "input",
    name: "input()",
    code: 'name = input("Name: ")\nprint(name)',
    stdin: "Mahesh",
    expect: "Name: Mahesh\n",
  },
  {
    id: "multi",
    name: "Multiple input()",
    code: "a = int(input())\nb = int(input())\nprint(a + b)",
    stdin: "2\n3",
    expect: "5\n",
  },
  {
    id: "conv",
    name: "int(input()) conversion",
    code: "nums = list(map(int, input().split()))\nprint(sum(nums))",
    stdin: "10 20 30 40",
    expect: "100\n",
  },
  {
    id: "error",
    name: "NameError",
    code: "print(x)",
    expectError: true,
  },
  {
    id: "files",
    name: "File read/write",
    code: 'with open("t.txt", "w") as f:\n    f.write("Hi")\nwith open("t.txt") as f:\n    print(f.read())',
    expect: "Hi\n",
  },
  {
    id: "loop",
    name: "Infinite loop (stop)",
    code: "while True:\n    pass",
    expectInterrupt: true,
    timeoutMs: 2000,
  },
  {
    id: "numpy",
    name: "numpy import (needs package)",
    code: "import numpy as np\nprint(np.array([1, 2, 3]))",
    expect: "[1 2 3]\n",
  },
];

interface RunResult {
  passed: boolean;
  detail: string;
}

function normalize(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

export function SelfTest({
  runTest,
}: {
  runTest: (
    code: string,
    stdin?: string,
    timeoutMs?: number,
  ) => Promise<{ stdout: string; stderr: string; traceback?: string; status: number }>;
}) {
  const [results, setResults] = useState<Record<string, RunResult>>({});
  const [runningId, setRunningId] = useState<string | null>(null);
  const [ran, setRan] = useState(false);

  const runOne = async (c: TestCase) => {
    setRunningId(c.id);
    const res = await runTest(c.code, c.stdin ?? "", c.timeoutMs);
    let passed = false;
    let detail = "";
    if (c.expectInterrupt) {
      passed = res.status === 2;
      detail = passed ? "Stopped safely (interrupted)." : "Did not interrupt.";
    } else if (c.expectError) {
      passed = res.status !== 0;
      detail = res.stderr || res.traceback || "Raised an error.";
    } else {
      passed =
        res.status === 0 &&
        normalize(res.stdout) === normalize(c.expect ?? "");
      detail =
        res.stdout + (res.stderr ? `\n${res.stderr}` : "") +
        (res.traceback ? `\n${res.traceback}` : "");
    }
    setResults((prev) => ({ ...prev, [c.id]: { passed, detail } }));
    setRunningId(null);
  };

  const runAll = async () => {
    setRan(true);
    setResults({});
    for (const c of SUITE) {
      await runOne(c);
    }
  };

  const passedCount = Object.values(results).filter((r) => r.passed).length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] text-slate-500">
          {ran
            ? `${passedCount}/${SUITE.length} passed`
            : "Runs each case locally through Pyodide."}
        </p>
        <button
          onClick={runAll}
          disabled={runningId !== null}
          className="flex items-center gap-1.5 rounded bg-sky-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-sky-500 disabled:opacity-50"
        >
          {runningId !== null ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Play className="h-3 w-3" />
          )}
          Run all
        </button>
      </div>
      <div className="space-y-1">
        {SUITE.map((c) => {
          const r = results[c.id];
          return (
            <div key={c.id} className="rounded bg-white/5 px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                {r ? (
                  r.passed ? (
                    <CircleCheck className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <CircleX className="h-3.5 w-3.5 text-rose-400" />
                  )
                ) : runningId === c.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />
                ) : (
                  <span className="h-3.5 w-3.5 rounded-full border border-white/20" />
                )}
                <span className="text-xs text-slate-300">{c.name}</span>
                <button
                  onClick={() => runOne(c)}
                  className="ml-auto text-[10px] text-slate-500 hover:text-slate-300"
                >
                  run
                </button>
              </div>
              {r && !r.passed && (
                <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap rounded bg-black/40 p-1.5 text-[10px] text-rose-300">
                  {r.detail}
                </pre>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
