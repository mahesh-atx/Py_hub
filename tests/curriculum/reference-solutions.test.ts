import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { loadPyodide, type PyodideInterface } from "pyodide";
import { compareOutputs } from "@/lib/practice/judge";
import { parsePracticeContent } from "@/lib/practice/parser";
import type { PracticeTestsDocument } from "@/lib/practice/types";

const DATA = path.join(process.cwd(), "public", "practice-data");
let pyodide: PyodideInterface;

beforeAll(async () => {
  pyodide = await loadPyodide({
    indexURL: `${path.join(process.cwd(), "node_modules", "pyodide")}${path.sep}`,
  });
  pyodide.runPython(`
import builtins, contextlib, io, json, traceback

def __pylab_reference_run(code, stdin):
    values = stdin.replace("\\r\\n", "\\n").split("\\n") if stdin else []
    if stdin.endswith("\\n"):
        values.pop()
    iterator = iter(values)
    output = io.StringIO()
    old_input = builtins.input
    def captured_input(prompt=""):
        print(prompt, end="")
        value = next(iterator)
        print(value)
        return value
    builtins.input = captured_input
    status = 0
    error = ""
    try:
        with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
            exec(compile(code, "<reference-solution>", "exec"), {"__name__": "__main__"})
    except SystemExit:
        pass
    except BaseException:
        status = 1
        error = traceback.format_exc()
    finally:
        builtins.input = old_input
    return json.dumps({"stdout": output.getvalue(), "status": status, "error": error})
`);
}, 30_000);

afterAll(() => {
  pyodide?.globals.destroy();
});

function read(relative: string) {
  return fs.readFileSync(path.join(DATA, relative), "utf8");
}

function assignments(batch: string) {
  return parsePracticeContent({
    markdown: read(`${batch}/assignments.md`),
    fileId: "assignments.md",
    tests: JSON.parse(read(`${batch}/assignment-tests.json`)) as PracticeTestsDocument,
    solutionsMarkdown: read(`${batch}/assignment-solutions.md`),
  }).challenges;
}

function execute(code: string, stdin: string) {
  pyodide.globals.set("__reference_code", code);
  pyodide.globals.set("__reference_stdin", stdin);
  return JSON.parse(
    pyodide.runPython("__pylab_reference_run(__reference_code, __reference_stdin)"),
  ) as { stdout: string; status: number; error: string };
}

describe("reference solution validation", () => {
  it("compiles every assignment reference with browser Python", () => {
    const batches = fs
      .readdirSync(DATA)
      .filter((entry) => entry.startsWith("phase-") && fs.existsSync(path.join(DATA, entry, "assignments.md")));
    let compiled = 0;
    for (const batch of batches) {
      for (const challenge of assignments(batch)) {
        expect(challenge.solution, `${batch}/${challenge.id}`).toBeTruthy();
        pyodide.globals.set("__reference_code", challenge.solution ?? "");
        expect(() => pyodide.runPython('compile(__reference_code, "<reference>", "exec")')).not.toThrow();
        compiled += 1;
      }
    }
    expect(compiled).toBeGreaterThan(40);
  });

  it("passes every non-scientific assignment output assertion", () => {
    const batches = [
      "phase-1-foundation",
      "phase-2-core-python",
      "phase-3-advanced-python",
      "phase-4-oop",
    ];
    let assertions = 0;
    for (const batch of batches) {
      for (const challenge of assignments(batch)) {
        const code = challenge.solution ?? "";
        for (const test of challenge.tests) {
          if (test.type === "ast" || test.type === "quality") continue;
          const result = execute(code, test.input ?? "");
          expect(result.status, `${batch}/${challenge.id}\n${result.error}`).toBe(0);
          expect(
            compareOutputs(result.stdout, test.expected_output, test),
            `${batch}/${challenge.id}\nExpected:\n${test.expected_output}\nActual:\n${result.stdout}`,
          ).toBe(true);
          assertions += 1;
        }
      }
    }
    expect(assertions).toBe(17);
  });
});
