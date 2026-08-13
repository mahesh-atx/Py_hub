import { describe, expect, it } from "vitest";
import {
  hasMeaningfulDeliverable,
  requiresManualReview,
  reviewManualSubmission,
} from "@/lib/practice/manual";

describe("manual project and assignment review", () => {
  it("requires confirmation only for untested projects and assignments", () => {
    expect(requiresManualReview("P", 0)).toBe(true);
    expect(requiresManualReview("A", 0)).toBe(true);
    expect(requiresManualReview("Q", 0)).toBe(false);
    expect(requiresManualReview("P", 1)).toBe(false);
  });

  it("rejects generated Python comment stubs", () => {
    expect(
      hasMeaningfulDeliverable(
        "P1-Calculator.py",
        "# P1. Calculator\n# Write your solution below:\n",
      ),
    ).toBe(false);
    expect(hasMeaningfulDeliverable("P1-Calculator.py", "result = 2 + 2")).toBe(
      true,
    );
  });

  it("rejects generated Markdown and empty JSON placeholders", () => {
    expect(
      hasMeaningfulDeliverable(
        "design.md",
        "# Design\nDesign notes, reflections, and written answers live here.\n",
      ),
    ).toBe(false);
    expect(hasMeaningfulDeliverable("audit.md", "The pipeline removes duplicate rows and records each change.")).toBe(
      true,
    );
    expect(hasMeaningfulDeliverable("result.json", "{}")).toBe(false);
    expect(hasMeaningfulDeliverable("result.json", '{"status":"complete"}')).toBe(
      true,
    );
  });

  it("allows an intentionally empty package initializer", () => {
    expect(hasMeaningfulDeliverable("library/__init__.py", "")).toBe(true);
  });

  it("reviews a single-file challenge", () => {
    expect(
      reviewManualSubmission({
        activePath: ".practice/P1.py",
        activeContent: "# TODO",
        workspaceFiles: [],
      }),
    ).toMatchObject({ ready: false, incomplete: [".practice/P1.py"] });
    expect(
      reviewManualSubmission({
        activePath: ".practice/P1.py",
        activeContent: "print('complete')",
        workspaceFiles: [],
      }).ready,
    ).toBe(true);
  });

  it("requires every declared multi-file deliverable in the challenge scope", () => {
    const scopePath = ".practice/OOP/Assignments/A19-Library";
    const review = reviewManualSubmission({
      activePath: `${scopePath}/library/library.py`,
      activeContent: "class Library: pass",
      scopePath,
      requiredFiles: [
        "library/library.py",
        "library/__init__.py",
        "library.json",
      ],
      workspaceFiles: [
        {
          path: `${scopePath}/library/library.py`,
          content: "class Library: pass",
        },
        { path: `${scopePath}/library/__init__.py`, content: "" },
        { path: `${scopePath}/library.json`, content: "{}" },
      ],
    });

    expect(review.ready).toBe(false);
    expect(review.missing).toEqual([]);
    expect(review.incomplete).toEqual(["library.json"]);
  });

  it("accepts completed multi-file deliverables", () => {
    const scopePath = ".practice/Data Science/Projects/P2-Pipeline";
    const requiredFiles = ["pipeline.py", "cleaning_log.py", "audit.md"];
    const workspaceFiles = [
      { path: `${scopePath}/pipeline.py`, content: "def clean(df):\n    return df" },
      { path: `${scopePath}/cleaning_log.py`, content: "changes = ['duplicates removed']" },
      {
        path: `${scopePath}/audit.md`,
        content: "The cleaning pipeline validates nulls, duplicate rows, and date ranges.",
      },
    ];

    expect(
      reviewManualSubmission({
        activePath: workspaceFiles[0].path,
        activeContent: workspaceFiles[0].content,
        scopePath,
        requiredFiles,
        workspaceFiles,
      }),
    ).toMatchObject({ ready: true, missing: [], incomplete: [] });
  });
});
