import type {
  Challenge,
  OutputTestCase,
  PlotExpectation,
  PracticeTestCase,
  PracticeTestRecord,
  PracticeTestsDocument,
  QualityTestCase,
} from "./types";

export type PracticeKind = "Q" | "P" | "A";

export interface ParsePracticeOptions {
  markdown: string;
  fileId: string;
  tests?: PracticeTestsDocument | null;
  solutionsMarkdown?: string | null;
}

export interface ParsedPracticeContent {
  kind: PracticeKind;
  challenges: Challenge[];
}

export function practiceKindForFile(fileId: string): PracticeKind {
  if (fileId === "projects.md") return "P";
  if (fileId === "assignments.md") return "A";
  return "Q";
}

export function inferQualityTest(
  title: string,
  markdown: string,
): QualityTestCase {
  const text = `${title}\n${markdown}`;
  const lower = text.toLowerCase();
  const requiredNodeTypes: string[] = [];
  const requiredImports: string[] = [];
  const requiredCalls: string[] = [];
  const requiredDefinitions: string[] = [];

  const requireNode = (pattern: RegExp, node: string) => {
    if (pattern.test(lower)) requiredNodeTypes.push(node);
  };
  requireNode(
    /(?:define|write|create|implement)\s+(?:a\s+)?function\b|function\s+(?:named|called)\b/,
    "FunctionDef",
  );
  requireNode(/\blambda\b/, "Lambda");
  const classText = lower
    .replace(/class statistics/g, "")
    .replace(/class average/g, "");
  if (/\bclass\b|\bobject-oriented\b/.test(classText)) {
    requiredNodeTypes.push("ClassDef");
  }
  requireNode(/\bfor loop\b|\biterate\b|\biteration\b/, "For");
  requireNode(/\bwhile loop\b/, "While");
  requireNode(/\btry\b[\s\S]{0,20}\bexcept\b|exception handling/, "Try");
  requireNode(/list comprehension/, "ListComp");
  requireNode(/dictionary comprehension/, "DictComp");
  requireNode(/\bwith statement\b|context manager/, "With");

  for (const library of ["numpy", "pandas", "matplotlib", "seaborn"] as const) {
    if (lower.includes(library)) requiredImports.push(library);
  }
  if (/\bopen\s*\(|read (?:a )?file|write (?:to )?(?:a )?file/.test(lower)) {
    requiredCalls.push("open");
  }
  const knownCalls = [
    "array",
    "arange",
    "linspace",
    "reshape",
    "read_csv",
    "DataFrame",
    "groupby",
    "merge",
    "pivot_table",
    "fillna",
    "dropna",
    "drop_duplicates",
    "duplicated",
    "sort_values",
    "value_counts",
    "describe",
    "mean",
    "median",
    "corr",
    "plot",
    "bar",
    "hist",
    "scatter",
  ];
  for (const call of knownCalls) {
    if (new RegExp(`(?:\\.|\\b)${call.toLowerCase()}\\s*\\(`, "i").test(lower)) {
      requiredCalls.push(call);
    }
  }

  for (const match of text.matchAll(
    /(?:function|class|method)\s+(?:named|called)?\s*`([A-Za-z_]\w*)`/gi,
  )) {
    requiredDefinitions.push(match[1]);
  }

  return {
    type: "quality",
    minStatements: 1,
    requiredNodeTypes: [...new Set(requiredNodeTypes)],
    requiredImports: [...new Set(requiredImports)],
    requiredCalls: [...new Set(requiredCalls)],
    requiredDefinitions: [...new Set(requiredDefinitions)],
    hint: "Submit syntactically valid, substantive code using the constructs requested by the question.",
  };
}

export function inferPlotExpectation(markdown: string): PlotExpectation {
  const lower = markdown.toLowerCase();
  const expectation: PlotExpectation = { minAxes: 1 };
  const expectedLine = markdown.match(/^\*\*Expected:\*\*\s*(.+)$/im)?.[1] ?? markdown;
  expectation.figureTitle = expectedLine.match(/suptitle\s+`([^`]+)`/i)?.[1];
  const withoutFigureTitle = expectedLine.replace(/suptitle\s+`[^`]+`/i, "");
  expectation.title = withoutFigureTitle.match(/(?<!sup)title\s+`([^`]+)`/i)?.[1];
  const panelTitles = expectedLine.match(/panel titles?\s+(.+)$/i)?.[1];
  if (panelTitles) {
    expectation.titles = [...panelTitles.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  }
  expectation.xlabel = expectedLine.match(/xlabel\s+`([^`]+)`/i)?.[1];
  expectation.ylabel = expectedLine.match(/ylabel\s+`([^`]+)`/i)?.[1];

  const explicitBars = lower.match(/\b(\d+)\s+bars?/)?.[1];
  if (explicitBars) expectation.minBars = Number(explicitBars);
  else if (/\bbar chart\b|\bbar plot\b|\bhistogram\b|\bdonut\b|\bpie chart\b/.test(lower)) {
    expectation.minBars = 1;
  }
  if (/\bline chart\b|\bline plot\b|\btime series\b|\brolling mean\b/.test(lower)) {
    expectation.minLines = /rolling mean/.test(lower) ? 2 : 1;
  }
  if (/\bscatter\b|\bviolin\b|\bbox plot\b/.test(lower)) {
    expectation.minCollections = 1;
  }
  if (/\bheatmap\b/.test(lower)) {
    expectation.minCollections = 1;
  }
  if (/two by two|2\s*[x×]\s*2/.test(lower)) expectation.minAxes = 4;
  else if (/\btwo subplots?\b|1\s*[x×]\s*2/.test(lower)) expectation.minAxes = 2;
  if (/\blegend\b/.test(lower)) expectation.legend = true;
  return expectation;
}

function strengthenTests(
  tests: PracticeTestCase[],
  title: string,
  markdown: string,
  kind: PracticeKind,
): PracticeTestCase[] {
  if (tests.length === 0 && kind !== "Q") return [];
  const onlyPlaceholderSource =
    tests.length > 0 &&
    tests.every((test) => test.type === "ast" && test.pattern.trim() === ".*");
  if (tests.length === 0 || onlyPlaceholderSource) {
    return [inferQualityTest(title, markdown)];
  }
  return tests.map((test) => {
    if (
      test.type !== "ast" &&
      test.type !== "quality" &&
      test.expected_output?.trim().toLowerCase() === "should generate chart"
    ) {
      return {
        ...test,
        plot: test.plot ?? inferPlotExpectation(markdown),
      } satisfies OutputTestCase;
    }
    return test;
  });
}

function recordId(record: PracticeTestRecord): number | undefined {
  return record.question_id ?? record.id;
}

function solutionSections(
  markdown: string | null | undefined,
  kind: PracticeKind,
): Map<string, string> {
  const sections = new Map<string, string>();
  if (!markdown) return sections;

  const heading =
    kind === "A"
      ? /^##\s+(A\d+)\.[^\n]*(?:\n|$)|^##\s+(Capstone)\b[^\n]*(?:\n|$)/gim
      : new RegExp(`^#{2,3}\\s+(${kind}\\d+)\\.[^\\n]*(?:\\n|$)`, "gim");
  const matches = [...markdown.matchAll(heading)];

  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    const rawId = match[1] ?? match[2];
    const id = /^capstone$/i.test(rawId) ? "ACap" : rawId.toUpperCase();
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    sections.set(id, markdown.slice(start, end).trim());
  }
  return sections;
}

function extractSolution(section: string | undefined): string | null {
  if (!section) return null;
  const codeMatch = section.match(/```(?:python)?\r?\n([\s\S]*?)\r?\n```/i);
  const code = (codeMatch?.[1] ?? section).trim();
  if (!code) return null;

  // Some chart references intentionally focus on plotting calls and omit their
  // conventional imports. Practice files must still be runnable when opened.
  const imports: string[] = [];
  if (/\bnp\./.test(code) && !/^\s*(?:import numpy|from numpy)/m.test(code)) {
    imports.push("import numpy as np");
  }
  if (/\bpd\./.test(code) && !/^\s*(?:import pandas|from pandas)/m.test(code)) {
    imports.push("import pandas as pd");
  }
  if (/\bplt\./.test(code) && !/^\s*(?:import matplotlib\.pyplot|from matplotlib)/m.test(code)) {
    imports.push("import matplotlib.pyplot as plt");
  }
  if (/\bsns\./.test(code) && !/^\s*(?:import seaborn|from seaborn)/m.test(code)) {
    imports.push("import seaborn as sns");
  }
  if (/\bPath\s*\(/.test(code) && !/^\s*from pathlib import Path/m.test(code)) {
    imports.push("from pathlib import Path");
  }
  return imports.length ? `${imports.join("\n")}\n\n${code}` : code;
}

function assignmentIdentity(rawTitle: string, index: number) {
  const numbered = rawTitle.match(/Assignment\s*(\d+)\s*[—–-]\s*(.*)/i);
  if (numbered) {
    const number = Number(numbered[1]);
    return {
      id: `A${number}`,
      number,
      title: `A${number}. ${numbered[2].trim()}`,
    };
  }

  if (/^Capstone\b/i.test(rawTitle)) {
    const title = rawTitle.replace(/^[^—–-]*[—–-]\s*/, "").trim();
    return { id: "ACap", number: undefined, title: `Capstone: ${title}` };
  }

  return { id: `A${index + 1}`, number: undefined, title: rawTitle };
}

/** Parse a curriculum practice Markdown file into deterministic challenges. */
export function parsePracticeContent({
  markdown,
  fileId,
  tests,
  solutionsMarkdown,
}: ParsePracticeOptions): ParsedPracticeContent {
  const kind = practiceKindForFile(fileId);
  const records = tests?.questions ?? [];
  const recordsById = new Map(
    records
      .map((record) => [recordId(record), record] as const)
      .filter((entry): entry is [number, PracticeTestRecord] => entry[0] != null),
  );
  const solutions = solutionSections(solutionsMarkdown, kind);

  const parts =
    kind === "A"
      ? markdown.split(/^##\s*📋\s*/m)
      : markdown.split(new RegExp(`^#{2,3}\\s*(?:${kind}\\d+\\.|(?:Question|Project)\\s+\\d+:)\\s*`, "im"));
  parts.shift();

  const challenges = parts
    .map((part, index): Challenge | null => {
      const challengePart =
        kind === "A" ? part.split(/^##\s+/m, 1)[0] : part;
      const lines = challengePart.split("\n");
      const rawTitle = lines[0]?.trim() ?? "";
      if (!rawTitle || (kind === "A" && /^Grading\s+yourself/i.test(rawTitle))) {
        return null;
      }

      const assignment =
        kind === "A" ? assignmentIdentity(rawTitle, index) : undefined;
      const fallbackNumber = index + 1;
      const numberedRecord = records[index];
      const number =
        assignment?.number ?? recordId(numberedRecord ?? {}) ?? fallbackNumber;
      const id = assignment?.id ?? `${kind}${number}`;
      const title = assignment?.title ?? `${kind}${number}. ${rawTitle}`;

      const rawMarkdown = challengePart
        .replace(lines[0], "")
        .trim()
        .replace(/\n(\*\*[A-Za-z]+:\*\*)/g, "\n\n$1");

      const difficulty =
        rawMarkdown.match(/\*\*Difficulty:\*\*\s*(.+)/i)?.[1]?.trim() ??
        "Medium";
      const objective = rawMarkdown
        .match(/\*\*Learning Objective:\*\*\s*(.+)/i)?.[1]
        ?.trim();
      const hintText = rawMarkdown
        .match(/^\*\*Hint:\*\*\s*(.+)$/im)?.[1]
        ?.trim();
      const logicMatch = rawMarkdown.match(/^\*\*(?:Explanation|Logic):\*\*\s*(.+)$/im);
      const explanation = logicMatch?.[1]?.trim();

      const solutionMatch = rawMarkdown.match(/\*\*Solution:\*\*\s*\n*```(?:python)?\r?\n([\s\S]*?)\r?\n```/im);
      const inlineSolution = solutionMatch ? extractSolution(solutionMatch[0]) : null;

      const body = rawMarkdown
        .replace(/\*\*Difficulty:\*\*\s*(.+)\n?/i, "")
        .replace(/\*\*Learning Objective:\*\*\s*(.+)\n?/i, "")
        .replace(/^\*\*(?:Hint|Explanation|Logic):\*\*\s*.+$/gim, "")
        .replace(/\*\*Solution:\*\*\s*\n*```(?:python)?\r?\n([\s\S]*?)\r?\n```/im, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      // Numbered assignments must match by their declared ID. Index fallback is
      // reserved for legacy records with no ID and for the unnumbered capstone.
      const testRecord =
        (assignment?.number != null ? recordsById.get(assignment.number) : undefined) ??
        (assignment?.id === "ACap" ? records[index] : undefined) ??
        (kind !== "A" ? numberedRecord : undefined);

      return {
        id,
        title,
        markdown: body,
        solution: extractSolution(solutions.get(id)) ?? inlineSolution,
        tests: strengthenTests(testRecord?.tests ?? [], title, body, kind),
        difficulty,
        objective,
        hintText,
        explanation,
      };
    })
    .filter((challenge): challenge is Challenge => challenge != null);

  return { kind, challenges };
}
