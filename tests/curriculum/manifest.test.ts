import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parsePracticeContent } from "@/lib/practice/parser";
import type {
  PracticeManifest,
  PracticeTestCase,
  PracticeTestsDocument,
} from "@/lib/practice/types";

const ROOT = process.cwd();
const DATA_ROOT = path.join(ROOT, "public", "practice-data");
const manifest = JSON.parse(
  fs.readFileSync(path.join(DATA_ROOT, "manifest.json"), "utf8"),
) as PracticeManifest;

function read(relativePath: string): string {
  return fs.readFileSync(path.join(DATA_ROOT, relativePath), "utf8");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(read(relativePath)) as T;
}

function testFileFor(fileId: string): string | null {
  if (fileId === "questions.md") return "hidden-tests.json";
  if (fileId === "assignments.md") return "assignment-tests.json";
  return null;
}

function solutionFileFor(fileId: string): string | null {
  if (fileId === "questions.md") return "solutions.md";
  if (fileId === "assignments.md") return "assignment-solutions.md";
  if (fileId === "projects.md") return "project-solutions.md";
  return null;
}

function isSupportedTest(test: PracticeTestCase): boolean {
  if (test.type === "ast") {
    return typeof test.pattern === "string" && test.pattern.length > 0;
  }
  return (
    (test.type == null || test.type === "output") &&
    (test.input == null || typeof test.input === "string") &&
    (test.expected_output == null || typeof test.expected_output === "string") &&
    (test.contains == null ||
      (Array.isArray(test.contains) &&
        test.contains.every((part) => typeof part === "string")))
  );
}

describe("curriculum manifest consistency", () => {
  it("has unique phase and file IDs with canonical paths", () => {
    const batchIds = manifest.batches.map((batch) => batch.id);
    expect(new Set(batchIds).size).toBe(batchIds.length);

    for (const batch of manifest.batches) {
      expect(batch.path).toBe(`/practice-data/${batch.id}`);
      const fileIds = batch.files.map((file) => file.id);
      expect(new Set(fileIds).size).toBe(fileIds.length);
    }
  });

  it("points only to files that exist", () => {
    for (const batch of manifest.batches) {
      for (const file of batch.files) {
        expect(
          fs.existsSync(path.join(DATA_ROOT, batch.id, file.id)),
          `${batch.id}/${file.id}`,
        ).toBe(true);
      }
    }
  });

  it("parses every declared practice item and matches declared totals", () => {
    let total = 0;
    for (const batch of manifest.batches) {
      for (const file of batch.files.filter((entry) => entry.type === "practice")) {
        const testFile = testFileFor(file.id);
        const solutionFile = solutionFileFor(file.id);
        const tests =
          testFile && fs.existsSync(path.join(DATA_ROOT, batch.id, testFile))
            ? readJson<PracticeTestsDocument>(`${batch.id}/${testFile}`)
            : undefined;
        const solutionsPath = solutionFile
          ? path.join(DATA_ROOT, batch.id, solutionFile)
          : "";
        const parsed = parsePracticeContent({
          markdown: read(`${batch.id}/${file.id}`),
          fileId: file.id,
          tests,
          solutionsMarkdown:
            solutionFile && fs.existsSync(solutionsPath)
              ? fs.readFileSync(solutionsPath, "utf8")
              : undefined,
        });

        expect(
          parsed.challenges.length,
          `${batch.id}/${file.id}`,
        ).toBe(file.total);
        expect(new Set(parsed.challenges.map((item) => item.id)).size).toBe(
          parsed.challenges.length,
        );
        if (file.id === "assignments.md") {
          for (const challenge of parsed.challenges) {
            if (challenge.tests.length === 0) {
              // Empty automated tests intentionally route through the manual
              // review flow; multi-file work may additionally declare files.
              expect(challenge.solution, `${batch.id}/${challenge.id}`).toBeTruthy();
            }
            for (const test of challenge.tests) {
              if (test.type === "ast" || test.type === "quality" || test.plot) continue;
              const generic = /^should\s+(?:exit|run|print|handle|use|demonstrate)/i.test(
                test.expected_output ?? "",
              );
              expect(
                generic && !(test.contains?.length),
                `${batch.id}/${challenge.id} must not use a generic output placeholder`,
              ).toBe(false);
            }
          }
        }
        if (file.id === "questions.md") {
          expect(
            parsed.challenges.every((challenge) => challenge.tests.length > 0),
            `${batch.id} must not contain untested questions`,
          ).toBe(true);
          expect(
            parsed.challenges.every((challenge) =>
              challenge.tests.every(
                (test) => test.type !== "ast" || test.pattern.trim() !== ".*",
              ),
            ),
            `${batch.id} must not use wildcard-only source tests`,
          ).toBe(true);
        }
        total += parsed.challenges.length;
      }
    }
    expect(total).toBe(396);
  });

  it("provides substantive runnable references for every assignment and project", () => {
    let references = 0;
    for (const batch of manifest.batches) {
      for (const file of batch.files.filter((entry) =>
        ["assignments.md", "projects.md"].includes(entry.id),
      )) {
        const solutionFile = solutionFileFor(file.id)!;
        const solutionPath = path.join(DATA_ROOT, batch.id, solutionFile);
        expect(fs.existsSync(solutionPath), `${batch.id}/${solutionFile}`).toBe(true);
        const parsed = parsePracticeContent({
          markdown: read(`${batch.id}/${file.id}`),
          fileId: file.id,
          tests:
            testFileFor(file.id) &&
            fs.existsSync(path.join(DATA_ROOT, batch.id, testFileFor(file.id)!))
              ? readJson<PracticeTestsDocument>(`${batch.id}/${testFileFor(file.id)!}`)
              : undefined,
          solutionsMarkdown: fs.readFileSync(solutionPath, "utf8"),
        });
        for (const challenge of parsed.challenges) {
          expect(challenge.solution, `${batch.id}/${file.id}/${challenge.id}`).toBeTruthy();
          expect(challenge.solution, `${batch.id}/${file.id}/${challenge.id}`).not.toMatch(
            /TODO|your code here/im,
          );
          const solution = challenge.solution ?? "";
          if (/\bnp\./.test(solution)) expect(solution).toMatch(/import numpy/);
          if (/\bpd\./.test(solution)) expect(solution).toMatch(/import pandas/);
          if (/\bplt\./.test(solution)) expect(solution).toMatch(/import matplotlib\.pyplot/);
          if (/\bsns\./.test(solution)) expect(solution).toMatch(/import seaborn/);
          references += 1;
        }
      }
    }
    expect(references).toBeGreaterThan(80);
  });

  it("uses supported, uniquely identified test records", () => {
    for (const batch of manifest.batches) {
      for (const filename of ["hidden-tests.json", "assignment-tests.json"]) {
        const relativePath = `${batch.id}/${filename}`;
        if (!fs.existsSync(path.join(DATA_ROOT, relativePath))) continue;
        const document = readJson<PracticeTestsDocument>(relativePath);
        expect(Array.isArray(document.questions), relativePath).toBe(true);

        const ids = (document.questions ?? []).map(
          (record) => record.question_id ?? record.id,
        );
        expect(ids.every((id) => Number.isInteger(id)), relativePath).toBe(true);
        expect(new Set(ids).size, relativePath).toBe(ids.length);

        for (const record of document.questions ?? []) {
          expect(Array.isArray(record.tests), relativePath).toBe(true);
          expect(
            (record.tests ?? []).every(isSupportedTest),
            `${relativePath} record ${record.question_id ?? record.id}`,
          ).toBe(true);
        }
      }
    }
  });

  it("has no broken relative Markdown links or images", () => {
    const markdownFiles = fs
      .readdirSync(DATA_ROOT, { recursive: true })
      .filter((entry): entry is string =>
        typeof entry === "string" && entry.endsWith(".md"),
      );

    for (const relativePath of markdownFiles) {
      const markdown = read(relativePath);
      const links = [...markdown.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)];
      for (const match of links) {
        const rawTarget = match[1].trim().split(/\s+/)[0].replace(/^<|>$/g, "");
        if (
          !rawTarget ||
          rawTarget.startsWith("#") ||
          /^(?:https?:|mailto:|data:)/i.test(rawTarget)
        ) {
          continue;
        }
        const decoded = decodeURIComponent(rawTarget.split("#")[0]);
        const target = path.resolve(
          path.dirname(path.join(DATA_ROOT, relativePath)),
          decoded,
        );
        expect(fs.existsSync(target), `${relativePath} -> ${rawTarget}`).toBe(true);
      }
    }
  });

  it("ships every dataset preloaded by the browser runtime", () => {
    const dataRoot = path.join(
      DATA_ROOT,
      "phase-6-data-science",
      "starter-project",
      "data",
    );
    for (const file of [
      "sales_raw.csv",
      "customers_raw.csv",
      "sales_clean.csv",
      "customers_clean.csv",
      "merged_clean.csv",
      "titanic.csv",
      "iris.csv",
      "weather_sample.csv",
      "stock_sample.csv",
    ]) {
      const filePath = path.join(dataRoot, file);
      expect(fs.existsSync(filePath), file).toBe(true);
      expect(fs.statSync(filePath).size, file).toBeGreaterThan(0);
    }
  });

  it("keeps every Markdown code fence balanced", () => {
    const markdownFiles = fs
      .readdirSync(DATA_ROOT, { recursive: true })
      .filter((entry): entry is string =>
        typeof entry === "string" && entry.endsWith(".md"),
      );

    for (const relativePath of markdownFiles) {
      const fences = read(relativePath).match(/```/g)?.length ?? 0;
      expect(fences % 2, relativePath).toBe(0);
    }
  });

  it("keeps deliverable paths relative and attached to known phases", () => {
    const deliverables = readJson<
      Record<string, Record<string, string[]>>
    >("deliverables.json");
    const knownBatches = new Set(manifest.batches.map((batch) => batch.id));

    for (const [batchId, challenges] of Object.entries(deliverables)) {
      expect(knownBatches.has(batchId), batchId).toBe(true);
      const challengeIds = new Set<string>();
      for (const fileId of ["assignments.md", "projects.md"]) {
        const curriculumPath = path.join(DATA_ROOT, batchId, fileId);
        if (!fs.existsSync(curriculumPath)) continue;
        const parsed = parsePracticeContent({
          markdown: fs.readFileSync(curriculumPath, "utf8"),
          fileId,
        });
        parsed.challenges.forEach((challenge) => challengeIds.add(challenge.id));
      }
      for (const [challengeId, files] of Object.entries(challenges)) {
        expect(challengeIds.has(challengeId), `${batchId}/${challengeId}`).toBe(true);
        expect(files.length).toBeGreaterThan(0);
        for (const file of files) {
          expect(path.isAbsolute(file), file).toBe(false);
          expect(file.split(/[\\/]/)).not.toContain("..");
        }
      }
    }
  });
});
