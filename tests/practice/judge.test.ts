import { describe, expect, it } from "vitest";
import {
  compareOutputs,
  evaluatePracticeTest,
  getConstraintViolation,
  matchesPlotExpectation,
  matchesQualityTest,
  matchesSourceTest,
  normalizeOutput,
  stripCommentsAndStrings,
} from "@/lib/practice/judge";

describe("practice output judging", () => {
  it("normalizes CRLF, trailing spaces, and final newlines", () => {
    expect(normalizeOutput("one  \r\ntwo\r\n\r\n")).toBe("one\ntwo");
    expect(normalizeOutput(undefined)).toBe("");
  });

  it("compares normalized output exactly", () => {
    expect(compareOutputs("hello  \n", "hello")).toBe(true);
    expect(compareOutputs("hello", "Hello")).toBe(false);
  });

  it("supports case-insensitive required fragments", () => {
    expect(
      compareOutputs("Tax: 100\nVerdict: EXCELLENT", "", {
        contains: ["tax:", "excellent"],
      }),
    ).toBe(true);
    expect(
      compareOutputs("Tax: 100", "", { contains: ["tax", "excellent"] }),
    ).toBe(false);
  });

  it("supports a case-sensitive contains matcher", () => {
    expect(compareOutputs("prefix VALUE suffix", "VALUE", { match: "contains" })).toBe(
      true,
    );
    expect(compareOutputs("prefix value suffix", "VALUE", { match: "contains" })).toBe(
      false,
    );
  });

  it("accepts order-independent list and set displays", () => {
    expect(compareOutputs("[3, 1, 2]", "[1, 2, 3]")).toBe(true);
    expect(compareOutputs("{blue, red}", "{red, blue}")).toBe(true);
    expect(compareOutputs("[1, 2]", "[1, 2, 3]")).toBe(false);
  });

  it("evaluates source-pattern tests without assuming output fields", () => {
    const test = { type: "ast" as const, pattern: "import\\s+pandas" };
    expect(matchesSourceTest("import pandas as pd", test)).toBe(true);
    expect(
      evaluatePracticeTest(
        "import pandas as pd",
        { status: 0, stdout: "", stderr: "" },
        test,
      ),
    ).toBe(true);
    expect(matchesSourceTest("print('x')", { type: "ast", pattern: "[" })).toBe(
      false,
    );
  });

  it("judges inferred AST quality requirements", () => {
    const run = {
      status: 1,
      stdout: "",
      stderr: "runtime import unavailable",
      sourceAnalysis: {
        syntaxValid: true,
        statementCount: 4,
        nodeCounts: { FunctionDef: 1, For: 1 },
        imports: ["numpy"],
        calls: ["np.array", "print"],
        definitions: ["summarize"],
      },
    };
    const test = {
      type: "quality" as const,
      minStatements: 2,
      requiredNodeTypes: ["FunctionDef", "For"],
      requiredImports: ["numpy"],
      requiredCalls: ["array"],
      requiredDefinitions: ["summarize"],
    };
    expect(matchesQualityTest(run, test)).toBe(true);
    expect(evaluatePracticeTest("def summarize(): pass", run, test)).toBe(true);
    expect(matchesQualityTest(run, { ...test, requiredNodeTypes: ["ClassDef"] })).toBe(false);
  });

  it("checks detailed plot metadata", () => {
    const run = {
      status: 0,
      stdout: "",
      stderr: "",
      plotMetadata: [
        {
          axes: [
            {
              title: "Revenue by category",
              xlabel: "Category",
              ylabel: "Revenue (lakh)",
              lines: 0,
              bars: 5,
              collections: 0,
              images: 0,
              hasLegend: false,
            },
          ],
        },
      ],
    };
    expect(
      matchesPlotExpectation(run, {
        minAxes: 1,
        minBars: 5,
        title: "Revenue by category",
        ylabel: "Revenue (lakh)",
      }),
    ).toBe(true);
    expect(matchesPlotExpectation(run, { minBars: 6 })).toBe(false);
  });

  it("judges chart tests by captured figures", () => {
    const test = { expected_output: "Should generate chart", contains: [] };
    expect(
      evaluatePracticeTest(
        "plot()",
        { status: 0, stdout: "", stderr: "", plots: ["base64"] },
        test,
      ),
    ).toBe(true);
    expect(
      evaluatePracticeTest(
        "pass",
        { status: 0, stdout: "", stderr: "", plots: [] },
        test,
      ),
    ).toBe(false);
  });

  it("fails every assertion when execution fails", () => {
    expect(
      evaluatePracticeTest(
        "raise RuntimeError()",
        { status: 1, stdout: "expected", stderr: "error" },
        { expected_output: "expected" },
      ),
    ).toBe(false);
  });
});

describe("phase constraints", () => {
  it("strips comments and string literals before checking constraints", () => {
    const source = '# import os\nmessage = "def fake(): [1]"\nprint(message)';
    expect(stripCommentsAndStrings(source)).not.toContain("import os");
    expect(getConstraintViolation(source, "phase-1-foundation")).toBeNull();
  });

  it("enforces phase 1 and phase 2 restrictions", () => {
    expect(getConstraintViolation("values = [1, 2]", "phase-1-foundation")).toMatch(
      /lists are not allowed/,
    );
    expect(getConstraintViolation("def solve(): pass", "phase-2-core-python")).toMatch(
      /functions are not allowed/,
    );
    expect(getConstraintViolation("import math", "phase-2-core-python")).toMatch(
      /imports are not allowed/,
    );
  });

  it("allows custom exception classes in phase 3", () => {
    expect(
      getConstraintViolation(
        "class ValidationError(Exception):\n    pass",
        "phase-3-advanced-python",
      ),
    ).toBeNull();
    expect(
      getConstraintViolation("class User:\n    pass", "phase-3-advanced-python"),
    ).toMatch(/classes are not allowed/);
  });

  it("does not apply constraints to later phases", () => {
    expect(
      getConstraintViolation("import pandas\nclass Report: pass", "phase-6-data-science"),
    ).toBeNull();
  });
});
