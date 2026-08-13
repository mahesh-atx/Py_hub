import { describe, expect, it } from "vitest";
import {
  inferPlotExpectation,
  inferQualityTest,
  parsePracticeContent,
  practiceKindForFile,
} from "@/lib/practice/parser";

describe("practice content parser", () => {
  it.each([
    ["questions.md", "Q"],
    ["projects.md", "P"],
    ["assignments.md", "A"],
    ["other.md", "Q"],
  ] as const)("maps %s to %s challenges", (file, expected) => {
    expect(practiceKindForFile(file)).toBe(expected);
  });

  it("infers structural requirements from untested questions", () => {
    const test = inferQualityTest(
      "Summarizer",
      "Define a function called `summarize` using a for loop and NumPy.",
    );
    expect(test).toMatchObject({
      type: "quality",
      minStatements: 1,
      requiredNodeTypes: expect.arrayContaining(["FunctionDef", "For"]),
      requiredImports: ["numpy"],
      requiredDefinitions: ["summarize"],
    });
  });

  it("does not confuse class statistics with a Python class", () => {
    const test = inferQualityTest(
      "Student system",
      "Print class statistics including the class average and topper.",
    );
    expect(test.requiredNodeTypes).not.toContain("ClassDef");
  });

  it("infers detailed chart expectations", () => {
    expect(
      inferPlotExpectation(
        "Create 5 bars. **Expected:** title `Revenue` · xlabel `Category` · ylabel `Amount`. Include a legend.",
      ),
    ).toMatchObject({
      minAxes: 1,
      minBars: 5,
      title: "Revenue",
      xlabel: "Category",
      ylabel: "Amount",
      legend: true,
    });
  });

  it("distinguishes figure and panel titles in subplot expectations", () => {
    expect(
      inferPlotExpectation(
        "Create a two by two grid. **Expected:** suptitle `Four views`; panel titles `Trend`, `Categories`, `Distribution`, `Relationship`.",
      ),
    ).toMatchObject({
      minAxes: 4,
      figureTitle: "Four views",
      titles: ["Trend", "Categories", "Distribution", "Relationship"],
    });
  });

  it("parses questions, metadata, output tests, and numbered solutions", () => {
    const parsed = parsePracticeContent({
      fileId: "questions.md",
      markdown: `# Questions

## Q1. Greeting
**Difficulty:** Easy
**Learning Objective:** Print a value
**Hint:** Use print.
**Explanation:** stdout is captured.

Write a greeting.

## Q2. Sum
Add two numbers.
`,
      tests: {
        questions: [
          {
            question_id: 1,
            tests: [{ input: "", expected_output: "hello" }],
          },
          {
            question_id: 2,
            tests: [{ input: "2\n3", expected_output: "5" }],
          },
        ],
      },
      solutionsMarkdown: `# Solutions
## Q1. Greeting
\`\`\`python
print("hello")
\`\`\`
## Q2. Sum
\`\`\`python
print(sum(map(int, input().split())))
\`\`\`
`,
    });

    expect(parsed.kind).toBe("Q");
    expect(parsed.challenges.map((challenge) => challenge.id)).toEqual([
      "Q1",
      "Q2",
    ]);
    expect(parsed.challenges[0]).toMatchObject({
      title: "Q1. Greeting",
      difficulty: "Easy",
      objective: "Print a value",
      hintText: "Use print.",
      explanation: "stdout is captured.",
      solution: 'print("hello")',
    });
    expect(parsed.challenges[0].markdown).toBe("Write a greeting.");
    expect(parsed.challenges[1].tests[0]).toMatchObject({ input: "2\n3" });
  });

  it("does not include trailing level-two sections in an assignment", () => {
    const parsed = parsePracticeContent({
      fileId: "assignments.md",
      markdown: `# Charts

## 📋 Assignment 1 — Scatter plot
Create a scatter plot.

**Expected:** title \`Relationship\`.

## Common Mistakes
Create 8 bars and include a legend.
`,
      tests: {
        questions: [
          {
            question_id: 1,
            tests: [{ expected_output: "Should generate chart" }],
          },
        ],
      },
      solutionsMarkdown: [
        "# Solutions",
        "## A1. Scatter plot",
        "```python",
        "plt.scatter([1], [2])",
        "```",
      ].join("\r\n"),
    });

    expect(parsed.challenges).toHaveLength(1);
    expect(parsed.challenges[0].markdown).not.toContain("Common Mistakes");
    expect(parsed.challenges[0].solution).toBe("import matplotlib.pyplot as plt\n\nplt.scatter([1], [2])");
    expect(parsed.challenges[0].tests[0]).toMatchObject({
      plot: {
        minAxes: 1,
        minCollections: 1,
        title: "Relationship",
      },
    });
    expect(parsed.challenges[0].tests[0]).not.toMatchObject({
      plot: { minBars: 8, legend: true },
    });
  });

  it("supports the Phase 6 id/AST test schema", () => {
    const parsed = parsePracticeContent({
      fileId: "questions.md",
      markdown: "# Data\n\n## Q1. Inspect\nCreate an analysis.",
      tests: {
        questions: [
          { id: 1, tests: [{ type: "ast", pattern: ".*", hint: "Inspect it" }] },
        ],
      },
    });

    expect(parsed.challenges[0].id).toBe("Q1");
    expect(parsed.challenges[0].tests[0]).toMatchObject({
      type: "quality",
      minStatements: 1,
    });
  });

  it("matches sparse assignment tests by ID rather than by array index", () => {
    const parsed = parsePracticeContent({
      fileId: "assignments.md",
      markdown: `# Assignments
## 📋 Assignment 1 — First
Do first.
## 📋 Assignment 2 — Second
Do second.
## 📋 Assignment 5 — Fifth
Do fifth.
## Grading yourself
Ignore this section.
`,
      tests: {
        questions: [
          { question_id: 1, tests: [{ expected_output: "first" }] },
          { question_id: 5, tests: [{ expected_output: "fifth" }] },
        ],
      },
      solutionsMarkdown: `
## A1. First
\`\`\`python
print("first")
\`\`\`
## A5. Fifth
\`\`\`python
print("fifth")
\`\`\`
`,
    });

    expect(parsed.challenges.map((challenge) => challenge.id)).toEqual([
      "A1",
      "A2",
      "A5",
    ]);
    expect(parsed.challenges[0].tests).toHaveLength(1);
    expect(parsed.challenges[1].tests).toEqual([]);
    expect(parsed.challenges[2].tests[0]).toMatchObject({
      expected_output: "fifth",
    });
    expect(parsed.challenges[2].solution).toBe('print("fifth")');
  });

  it("parses an unnumbered assignment capstone and its solution", () => {
    const parsed = parsePracticeContent({
      fileId: "assignments.md",
      markdown: `# Assignments
## 📋 Assignment 19 — Library
Build it.
## 📋 Capstone — Design Your Own System
Design it.
`,
      tests: {
        questions: [
          { question_id: 19, tests: [{ expected_output: "library" }] },
          { question_id: 20, tests: [{ expected_output: "capstone" }] },
        ],
      },
      solutionsMarkdown: `
## A19. Library
\`\`\`python
print("library")
\`\`\`
## Capstone - Design Your Own System
Write design.md and system.py.
`,
    });

    expect(parsed.challenges[1]).toMatchObject({
      id: "ACap",
      title: "Capstone: Design Your Own System",
      solution: "Write design.md and system.py.",
    });
    expect(parsed.challenges[1].tests[0]).toMatchObject({
      expected_output: "capstone",
    });
  });

  it("makes scientific reference snippets runnable by adding omitted conventional imports", () => {
    const parsed = parsePracticeContent({
      fileId: "assignments.md",
      markdown: "# Assignments\n\n## 📋 Assignment 1 — Chart\nCreate a chart.",
      solutionsMarkdown: `## A1. Chart
\`\`\`python
x = np.arange(3)
frame = pd.DataFrame({"x": x})
sns.lineplot(data=frame, x="x", y="x")
plt.title("Ready")
\`\`\``,
    });

    expect(parsed.challenges[0].solution).toMatch(
      /^import numpy as np\nimport pandas as pd\nimport matplotlib\.pyplot as plt\nimport seaborn as sns\n\n/,
    );
  });

  it("parses project IDs and solutions without test data", () => {
    const parsed = parsePracticeContent({
      fileId: "projects.md",
      markdown: "# Projects\n\n## P1. Calculator\nBuild a calculator.",
      solutionsMarkdown:
        "# Solutions\n\n## P1. Calculator\n```python\nprint(2 + 2)\n```",
    });

    expect(parsed).toMatchObject({
      kind: "P",
      challenges: [
        {
          id: "P1",
          title: "P1. Calculator",
          solution: "print(2 + 2)",
          tests: [],
        },
      ],
    });
  });
});
