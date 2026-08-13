import { afterEach, describe, expect, it } from "vitest";
import { openDB } from "idb";
import {
  FILES_STORE,
  KV_STORE,
  WORKSPACE_DB_VERSION,
  bulkPutFiles,
  clearFiles,
  closeAllWorkspaceDatabases,
  deleteFilePersisted,
  deleteWorkspaceDB,
  getKV,
  loadFiles,
  persistFile,
  setKV,
  setWorkspaceId,
  workspaceDatabaseName,
} from "@/lib/storage/idb";
import type { PyNode } from "@/types/filesystem";

const usedWorkspaces = new Set<string>();

function workspace(label: string): string {
  const id = `test-${label}-${crypto.randomUUID()}`;
  usedWorkspaces.add(id);
  return id;
}

function file(id: string, createdAt = 1): PyNode {
  return {
    id,
    name: `${id}.py`,
    parentId: null,
    kind: "file",
    content: `print(${JSON.stringify(id)})`,
    createdAt,
    updatedAt: createdAt,
  };
}

afterEach(async () => {
  await closeAllWorkspaceDatabases();
  await Promise.all([...usedWorkspaces].map(deleteWorkspaceDB));
  usedWorkspaces.clear();
  setWorkspaceId("default");
});

describe("workspace IndexedDB persistence", () => {
  it("runs the current schema migration on a new workspace", async () => {
    const id = workspace("schema");
    setWorkspaceId(id);
    await persistFile(file("main"));
    await closeAllWorkspaceDatabases();

    const db = await openDB(workspaceDatabaseName(id));
    expect(db.version).toBe(WORKSPACE_DB_VERSION);
    expect([...db.objectStoreNames].sort()).toEqual(
      [FILES_STORE, KV_STORE].sort(),
    );
    db.close();
  });

  it("keeps files and key/value settings isolated by workspace", async () => {
    const first = workspace("first");
    const second = workspace("second");

    setWorkspaceId(first);
    await persistFile(file("first-file"));
    await setKV("theme", "dracula");

    setWorkspaceId(second);
    expect(await loadFiles()).toEqual([]);
    expect(await getKV("theme")).toBeUndefined();
    await persistFile(file("second-file"));
    await setKV("theme", "light");

    setWorkspaceId(first);
    expect((await loadFiles()).map((item) => item.id)).toEqual(["first-file"]);
    expect(await getKV("theme")).toBe("dracula");

    setWorkspaceId(second);
    expect((await loadFiles()).map((item) => item.id)).toEqual(["second-file"]);
    expect(await getKV("theme")).toBe("light");
  });

  it("captures the workspace at the start of concurrent operations", async () => {
    const first = workspace("concurrent-a");
    const second = workspace("concurrent-b");

    setWorkspaceId(first);
    const firstWrite = persistFile(file("a"));
    setWorkspaceId(second);
    const secondWrite = persistFile(file("b"));
    await Promise.all([firstWrite, secondWrite]);

    setWorkspaceId(first);
    expect((await loadFiles()).map((item) => item.id)).toEqual(["a"]);
    setWorkspaceId(second);
    expect((await loadFiles()).map((item) => item.id)).toEqual(["b"]);
  });

  it("bulk writes files and restores them in creation order", async () => {
    const id = workspace("bulk");
    setWorkspaceId(id);
    await bulkPutFiles([file("late", 20), file("early", 10)]);
    await closeAllWorkspaceDatabases();

    expect((await loadFiles()).map((item) => item.id)).toEqual([
      "early",
      "late",
    ]);
  });

  it("updates, deletes, and clears persisted files", async () => {
    const id = workspace("mutations");
    setWorkspaceId(id);
    await bulkPutFiles([file("one"), file("two", 2)]);

    await persistFile({ ...file("one"), content: "updated" });
    expect((await loadFiles()).find((item) => item.id === "one")?.content).toBe(
      "updated",
    );

    await deleteFilePersisted("one");
    expect((await loadFiles()).map((item) => item.id)).toEqual(["two"]);

    await clearFiles();
    expect(await loadFiles()).toEqual([]);
  });

  it("deletes a workspace database after closing its connection", async () => {
    const id = workspace("delete");
    setWorkspaceId(id);
    await persistFile(file("temporary"));
    await deleteWorkspaceDB(id);
    usedWorkspaces.delete(id);

    setWorkspaceId(id);
    expect(await loadFiles()).toEqual([]);
  });
});
