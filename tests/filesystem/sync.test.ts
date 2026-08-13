import { describe, expect, it } from "vitest";
import {
  applyFilesystemChanges,
  normalizeFilesystemPath,
} from "@/lib/filesystem/sync";
import { pathOf } from "@/lib/filesystem/tree";
import type { PyNode } from "@/types/filesystem";

function node(
  id: string,
  name: string,
  kind: "file" | "folder",
  parentId: string | null = null,
  content = "",
): PyNode {
  return {
    id,
    name,
    kind,
    parentId,
    content: kind === "file" ? content : undefined,
    createdAt: 1,
    updatedAt: 1,
  };
}

function ids() {
  let value = 0;
  return () => `new-${++value}`;
}

describe("filesystem synchronization reconciliation", () => {
  it.each([
    ["folder\\file.py", "folder/file.py"],
    ["/folder//file.py", "folder/file.py"],
    ["../secret", null],
    ["folder/./file", null],
    ["", null],
  ])("normalizes %s", (value, expected) => {
    expect(normalizeFilesystemPath(value)).toBe(expected);
  });

  it("creates nested directories and files from Python", () => {
    const result = applyFilesystemChanges(
      [],
      {
        directories: ["reports/empty"],
        upserted: [{ path: "reports/summary.txt", content: "ready" }],
        deleted: [],
      },
      { createId: ids(), now: () => 10 },
    );

    expect(result.created).toHaveLength(3);
    expect(
      result.nodes.map((item) => [pathOf(result.nodes, item.id), item.kind]),
    ).toEqual(
      expect.arrayContaining([
        ["reports", "folder"],
        ["reports/empty", "folder"],
        ["reports/summary.txt", "file"],
      ]),
    );
  });

  it("updates existing files without replacing their IDs", () => {
    const initial = [node("main", "main.py", "file", null, "old")];
    const result = applyFilesystemChanges(initial, {
      directories: [],
      upserted: [{ path: "main.py", content: "new" }],
      deleted: [],
    });

    expect(result.created).toEqual([]);
    expect(result.updated).toMatchObject([{ id: "main", content: "new" }]);
    expect(result.nodes[0]).toMatchObject({ id: "main", content: "new" });
  });

  it("removes Python-deleted files and descendant folders", () => {
    const initial = [
      node("folder", "output", "folder"),
      node("nested", "nested", "folder", "folder"),
      node("file", "result.txt", "file", "nested", "done"),
    ];
    const result = applyFilesystemChanges(initial, {
      directories: [],
      upserted: [],
      deleted: ["output"],
    });

    expect(result.nodes).toEqual([]);
    expect(new Set(result.deletedIds)).toEqual(
      new Set(["folder", "nested", "file"]),
    );
  });

  it("reconciles a file replaced by a directory", () => {
    const result = applyFilesystemChanges(
      [node("old", "data", "file", null, "old")],
      {
        directories: ["data"],
        upserted: [{ path: "data/value.txt", content: "42" }],
        deleted: [],
      },
      { createId: ids() },
    );

    expect(result.deletedIds).toContain("old");
    expect(result.nodes.find((item) => pathOf(result.nodes, item.id) === "data"))
      .toMatchObject({ kind: "folder" });
    expect(
      result.nodes.find(
        (item) => pathOf(result.nodes, item.id) === "data/value.txt",
      ),
    ).toMatchObject({ kind: "file", content: "42" });
  });

  it("reconciles a directory replaced by a file", () => {
    const initial = [
      node("folder", "data", "folder"),
      node("child", "old.txt", "file", "folder", "old"),
    ];
    const result = applyFilesystemChanges(
      initial,
      {
        directories: [],
        upserted: [{ path: "data", content: "replacement" }],
        deleted: [],
      },
      { createId: ids() },
    );

    expect(new Set(result.deletedIds)).toEqual(new Set(["folder", "child"]));
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0]).toMatchObject({
      name: "data",
      kind: "file",
      content: "replacement",
    });
  });

  it("ignores unsafe worker paths", () => {
    const result = applyFilesystemChanges([], {
      directories: ["../outside"],
      upserted: [{ path: "../../secret.txt", content: "no" }],
      deleted: [],
    });
    expect(result.nodes).toEqual([]);
  });
});
