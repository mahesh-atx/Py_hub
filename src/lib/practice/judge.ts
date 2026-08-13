import type {
  CapturedRun,
  OutputTestCase,
  PlotExpectation,
  PracticeTestCase,
  QualityTestCase,
  SourceTestCase,
} from "./types";

export function normalizeOutput(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

/** Compare stdout using exact, contains, or order-insensitive collection matching. */
export function compareOutputs(
  actual: string | null | undefined,
  expected: string | null | undefined,
  test?: OutputTestCase,
): boolean {
  const actualNormalized = normalizeOutput(actual);
  const expectedNormalized = normalizeOutput(expected);

  if (test?.contains?.length) {
    const lowerActual = actualNormalized.toLowerCase();
    return test.contains.every(
      (part) => part.length > 0 && lowerActual.includes(part.toLowerCase()),
    );
  }

  if (test?.match === "contains" && expectedNormalized) {
    return actualNormalized.includes(expectedNormalized);
  }

  if (actualNormalized === expectedNormalized) return true;

  const looksLikeCollection =
    (expectedNormalized.startsWith("{") && expectedNormalized.endsWith("}")) ||
    (expectedNormalized.startsWith("[") && expectedNormalized.endsWith("]"));

  if (!looksLikeCollection) return false;

  const collectionParts = (value: string) =>
    value
      .replace(/[{}[\]]/g, "")
      .split(",")
      .map((part) => part.trim())
      .sort();

  return (
    JSON.stringify(collectionParts(actualNormalized)) ===
    JSON.stringify(collectionParts(expectedNormalized))
  );
}

export function isSourceTest(test: PracticeTestCase): test is SourceTestCase {
  return test.type === "ast";
}

/**
 * Source checks are intentionally lightweight because Python is executed in
 * Pyodide rather than parsed in the browser. Invalid patterns fail closed.
 */
export function matchesSourceTest(code: string, test: SourceTestCase): boolean {
  try {
    return new RegExp(test.pattern, "s").test(code);
  } catch {
    return false;
  }
}

export function matchesQualityTest(
  run: CapturedRun,
  test: QualityTestCase,
): boolean {
  const analysis = run.sourceAnalysis;
  if (!analysis?.syntaxValid || analysis.statementCount < test.minStatements) {
    return false;
  }
  const hasNode = (name: string) => (analysis.nodeCounts[name] ?? 0) > 0;
  const hasImport = (name: string) =>
    analysis.imports.some((entry) => entry === name || entry.startsWith(`${name}.`));
  const hasCall = (name: string) =>
    analysis.calls.some((entry) => entry === name || entry.endsWith(`.${name}`));

  return (
    (test.requiredNodeTypes?.every(hasNode) ?? true) &&
    (test.requiredImports?.every(hasImport) ?? true) &&
    (test.requiredCalls?.every(hasCall) ?? true) &&
    (test.requiredDefinitions?.every((name) =>
      analysis.definitions.includes(name),
    ) ?? true)
  );
}

export function matchesPlotExpectation(
  run: CapturedRun,
  expectation: PlotExpectation,
): boolean {
  const plots = run.plotMetadata ?? [];
  if (plots.length === 0) return false;
  const axes = plots.flatMap((plot) => plot.axes);
  if (axes.length < (expectation.minAxes ?? 1)) return false;
  const total = (key: "lines" | "bars" | "collections" | "images") =>
    axes.reduce((sum, axis) => sum + axis[key], 0);
  if (total("lines") < (expectation.minLines ?? 0)) return false;
  if (total("bars") < (expectation.minBars ?? 0)) return false;
  if (total("collections") < (expectation.minCollections ?? 0)) return false;
  if (total("images") < (expectation.minImages ?? 0)) return false;

  const textMatches = (
    key: "title" | "xlabel" | "ylabel",
    expected?: string,
  ) =>
    !expected ||
    axes.some(
      (axis) =>
        normalizeOutput(axis[key]).toLowerCase() ===
        normalizeOutput(expected).toLowerCase(),
    );
  if (!textMatches("title", expectation.title)) return false;
  if (!textMatches("xlabel", expectation.xlabel)) return false;
  if (!textMatches("ylabel", expectation.ylabel)) return false;
  if (expectation.legend && !axes.some((axis) => axis.hasLegend)) return false;
  return true;
}

/** Evaluate one supported practice assertion against a captured Pyodide run. */
export function evaluatePracticeTest(
  code: string,
  run: CapturedRun,
  test: PracticeTestCase,
): boolean {
  if (test.type === "quality") return matchesQualityTest(run, test);
  if (isSourceTest(test)) {
    return (run.sourceAnalysis?.syntaxValid ?? true) && matchesSourceTest(code, test);
  }
  if (run.status !== 0) return false;

  // Chart exercises describe their expected result as a generated chart. A
  // captured Matplotlib figure is the assertion; stdout is irrelevant.
  if (
    normalizeOutput(test.expected_output).toLowerCase() ===
    "should generate chart"
  ) {
    return test.plot
      ? matchesPlotExpectation(run, test.plot)
      : (run.plots?.length ?? 0) > 0;
  }

  return compareOutputs(run.stdout, test.expected_output, test);
}

interface ConstraintRule {
  pattern: RegExp;
  allow?: RegExp;
  reason: string;
}

const PHASE_CONSTRAINTS: Record<string, ConstraintRule[]> = {
  "phase-1": [
    {
      pattern: /\[/,
      reason: "Phase 1 rule: lists are not allowed yet (no [ ] brackets).",
    },
    {
      pattern: /\bdef\s+[A-Za-z_]/,
      reason: "Phase 1 rule: user-defined functions are not allowed yet (no def).",
    },
    {
      pattern: /\bimport\b/,
      reason: "Phase 1 rule: imports are not allowed yet.",
    },
  ],
  "phase-2": [
    {
      pattern: /\bdef\s+[A-Za-z_]/,
      reason: "Phase 2 rule: user-defined functions are not allowed yet (no def).",
    },
    {
      pattern: /\bimport\b/,
      reason: "Phase 2 rule: imports are not allowed yet.",
    },
  ],
  "phase-3": [
    {
      pattern: /\bclass\s+[A-Za-z_]\w*/,
      allow:
        /class\s+[A-Za-z_]\w*\s*\(\s*(?:[A-Za-z_]\w*Error|Exception|BaseException)\b/,
      reason:
        "Phase 3 rule: classes are not allowed yet (custom Exception subclasses are the one exception).",
    },
  ],
};

export function stripCommentsAndStrings(code: string): string {
  return code
    .replace(/"""[\s\S]*?"""|'''[\s\S]*?'''/g, "")
    .replace(/#[^\n]*/g, "")
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
}

export function getConstraintViolation(
  code: string,
  batchId: string,
): string | null {
  const phase = batchId.match(/phase-(\d+)/)?.[1];
  const rules = phase ? PHASE_CONSTRAINTS[`phase-${phase}`] : undefined;
  if (!rules) return null;

  const cleaned = stripCommentsAndStrings(code);
  for (const rule of rules) {
    if (rule.pattern.test(cleaned) && !(rule.allow && rule.allow.test(cleaned))) {
      return rule.reason;
    }
  }
  return null;
}
