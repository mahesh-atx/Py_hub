import { describe, expect, it } from "vitest";
import {
  buildTree,
  descendantIds,
  genId,
  getExtension,
  isPythonFile,
  pathOf,
  resolveRelativePath,
  validateName,
} from "@/lib/filesystem/tree";
import type { PyNode } from "@/types/filesystem";

function node(
  id: string,
  name: string,
  kind: "file" | "folder",
  parentId: string | null = null,
): PyNode {
  return {
    id,
    name,
    kind,
    parentId,
    content: kind === "file" ? "" : undefined,
    createdAt: 1,
    updatedAt: 1,
  };
}

describe("filesystem tree utilities", () => {
  const nodes = [
    node("file-10", "lesson10.py", "file", "course"),
    node("nested", "nested", "folder", "course"),
    node("root-file", "README.md", "file"),
    node("course", "course", "folder"),
    node("file-2", "lesson2.py", "file", "course"),
    node("deep", "answer.py", "file", "nested"),
  ];

  it("builds a nested folders-first, naturally sorted tree", () => {
    const tree = buildTree(nodes);

    expect(tree.map((item) => item.name)).toEqual(["course", "README.md"]);
    expect(tree[0].children.map((item) => item.name)).toEqual([
      "nested",
      "lesson2.py",
      "lesson10.py",
    ]);
    expect(tree[0].children[0].children[0].name).toBe("answer.py");
  });

  it("does not mutate the input node order", () => {
    const before = nodes.map((item) => item.id);
    buildTree(nodes);
    expect(nodes.map((item) => item.id)).toEqual(before);
  });

  it("builds slash-separated paths", () => {
    expect(pathOf(nodes, "deep")).toBe("course/nested/answer.py");
    expect(pathOf(nodes, "missing")).toBe("");
  });

  it("resolves course links relative to their source file", () => {
    expect(
      resolveRelativePath(
        ".course/phase-2-core-python/README.md",
        "module-05-strings.md",
      ),
    ).toBe(".course/phase-2-core-python/module-05-strings.md");
    expect(
      resolveRelativePath(
        ".course/phase-2-core-python/README.md",
        "../phase-3-advanced-python/README.md#functions",
      ),
    ).toBe(".course/phase-3-advanced-python/README.md");
    expect(resolveRelativePath("README.md", "../../outside.md")).toBeNull();
  });

  it("collects every descendant without including the parent", () => {
    expect(new Set(descendantIds(nodes, "course"))).toEqual(
      new Set(["nested", "deep", "file-2", "file-10"]),
    );
    expect(descendantIds(nodes, "deep")).toEqual([]);
  });

  it.each([
    ["main.py", "py"],
    ["ARCHIVE.TAR.GZ", "gz"],
    ["README", ""],
    [".gitignore", "gitignore"],
  ])("extracts the extension from %s", (name, expected) => {
    expect(getExtension(name)).toBe(expected);
  });

  it("recognizes Python files case-insensitively", () => {
    expect(isPythonFile("main.PY")).toBe(true);
    expect(isPythonFile("main.ipynb")).toBe(false);
  });

  it.each([
    ["", "Name cannot be empty"],
    ["   ", "Name cannot be empty"],
    ["a/b.py", "Name cannot contain slashes"],
    ["a\\b.py", "Name cannot contain slashes"],
    [".", "Invalid name"],
    ["..", "Invalid name"],
    ["x".repeat(101), "Name is too long"],
  ])("rejects invalid name %#", (name, expected) => {
    expect(validateName(name, [])).toBe(expected);
  });

  it("rejects case-insensitive sibling collisions", () => {
    expect(validateName("MAIN.py", [node("1", "main.py", "file")])).toBe(
      "A file with this name already exists",
    );
    expect(validateName("other.py", [node("1", "main.py", "file")])).toBeNull();
  });

  it("generates non-empty unique IDs", () => {
    const ids = new Set(Array.from({ length: 20 }, () => genId()));
    expect(ids.size).toBe(20);
    expect([...ids].every(Boolean)).toBe(true);
  });
});
