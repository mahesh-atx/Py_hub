import {
  openDB,
  type DBSchema,
  type IDBPDatabase,
} from "idb";
import type { PyNode } from "@/types/filesystem";

export const WORKSPACE_DB_VERSION = 1;
export const FILES_STORE = "files";
export const KV_STORE = "kv";

interface WorkspaceDB extends DBSchema {
  files: {
    key: string;
    value: PyNode;
  };
  kv: {
    key: string;
    value: unknown;
  };
}

let currentWorkspaceId = "default";
const dbPromises = new Map<string, Promise<IDBPDatabase<WorkspaceDB>>>();

export function workspaceDatabaseName(id: string): string {
  return `python-ide-${id}`;
}

export function getWorkspaceId(): string {
  return currentWorkspaceId;
}

/** Select the database used by operations that start after this call. */
export function setWorkspaceId(id: string): void {
  currentWorkspaceId = id;
}

/** The complete version-1 schema migration, kept exported for migration tests. */
export function upgradeWorkspaceDatabase(
  db: IDBPDatabase<WorkspaceDB>,
): void {
  if (!db.objectStoreNames.contains(FILES_STORE)) {
    db.createObjectStore(FILES_STORE, { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains(KV_STORE)) {
    db.createObjectStore(KV_STORE);
  }
}

function getDB(workspaceId = currentWorkspaceId) {
  let promise = dbPromises.get(workspaceId);
  if (!promise) {
    promise = openDB<WorkspaceDB>(
      workspaceDatabaseName(workspaceId),
      WORKSPACE_DB_VERSION,
      {
        upgrade(db) {
          upgradeWorkspaceDatabase(db);
        },
        blocking() {
          void closeWorkspaceDatabase(workspaceId);
        },
        terminated() {
          dbPromises.delete(workspaceId);
        },
      },
    );
    dbPromises.set(workspaceId, promise);
  }
  return promise;
}

export async function closeWorkspaceDatabase(id: string): Promise<void> {
  const promise = dbPromises.get(id);
  dbPromises.delete(id);
  if (promise) {
    const db = await promise.catch(() => null);
    db?.close();
  }
}

export async function closeAllWorkspaceDatabases(): Promise<void> {
  await Promise.all([...dbPromises.keys()].map(closeWorkspaceDatabase));
}

export async function deleteWorkspaceDB(id: string): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  await closeWorkspaceDatabase(id);
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(workspaceDatabaseName(id));
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () =>
      reject(new Error(`Workspace database "${id}" is still open in another tab.`));
  });
}

export async function loadFiles(): Promise<PyNode[]> {
  try {
    const db = await getDB();
    const all = await db.getAll(FILES_STORE);
    return all.sort((a, b) => a.createdAt - b.createdAt);
  } catch {
    return [];
  }
}

export async function persistFile(node: PyNode): Promise<void> {
  try {
    const db = await getDB();
    await db.put(FILES_STORE, node);
  } catch {
    /* Persistence is best-effort while the IDE remains usable in memory. */
  }
}

export async function deleteFilePersisted(id: string): Promise<void> {
  try {
    const db = await getDB();
    await db.delete(FILES_STORE, id);
  } catch {
    /* Persistence is best-effort. */
  }
}

export async function clearFiles(): Promise<void> {
  try {
    const db = await getDB();
    await db.clear(FILES_STORE);
  } catch {
    /* Persistence is best-effort. */
  }
}

export async function bulkPutFiles(nodes: PyNode[]): Promise<void> {
  try {
    const db = await getDB();
    const transaction = db.transaction(FILES_STORE, "readwrite");
    await Promise.all(nodes.map((node) => transaction.store.put(node)));
    await transaction.done;
  } catch {
    /* Persistence is best-effort. */
  }
}

export async function getKV<T>(key: string): Promise<T | undefined> {
  try {
    const db = await getDB();
    return (await db.get(KV_STORE, key)) as T | undefined;
  } catch {
    return undefined;
  }
}

export async function setKV<T>(key: string, value: T): Promise<void> {
  try {
    const db = await getDB();
    await db.put(KV_STORE, value, key);
  } catch {
    /* Persistence is best-effort. */
  }
}
