import { openDB, type IDBPDatabase } from "idb";
import type { PyNode } from "@/types/filesystem";

const DB_NAME = "python-ide";
const DB_VERSION = 1;
const FILES_STORE = "files";
const KV_STORE = "kv";

let dbPromise: Promise<IDBPDatabase> | null = null;
let currentWorkspaceId = "default";

export function getWorkspaceId() {
  return currentWorkspaceId;
}

export function setWorkspaceId(id: string) {
  if (currentWorkspaceId !== id) {
    if (dbPromise) {
      const p = dbPromise;
      // Delay closing slightly to allow any pending transactions to complete
      setTimeout(() => {
        p.then(db => db.close()).catch(() => {});
      }, 500);
    }
    currentWorkspaceId = id;
    dbPromise = null;
  }
}

export async function deleteWorkspaceDB(id: string): Promise<void> {
  if (typeof indexedDB !== "undefined") {
    return new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase(`python-ide-${id}`);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

function getDB() {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB is not available"));
  }
  if (!dbPromise) {
    dbPromise = openDB(`python-ide-${currentWorkspaceId}`, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(FILES_STORE)) {
          db.createObjectStore(FILES_STORE, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(KV_STORE)) {
          db.createObjectStore(KV_STORE);
        }
      },
    });
  }
  return dbPromise;
}

export async function loadFiles(): Promise<PyNode[]> {
  try {
    const db = await getDB();
    const all = await db.getAll(FILES_STORE);
    return (all as PyNode[]).sort((a, b) => a.createdAt - b.createdAt);
  } catch {
    return [];
  }
}

export async function persistFile(node: PyNode): Promise<void> {
  try {
    const db = await getDB();
    await db.put(FILES_STORE, node);
  } catch {
    /* ignore persistence errors */
  }
}

export async function deleteFilePersisted(id: string): Promise<void> {
  try {
    const db = await getDB();
    await db.delete(FILES_STORE, id);
  } catch {
    /* ignore */
  }
}

export async function clearFiles(): Promise<void> {
  try {
    const db = await getDB();
    await db.clear(FILES_STORE);
  } catch {
    /* ignore */
  }
}

export async function bulkPutFiles(nodes: PyNode[]): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction(FILES_STORE, "readwrite");
    await Promise.all(nodes.map((n) => tx.store.put(n)));
    await tx.done;
  } catch {
    /* ignore */
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
    /* ignore */
  }
}
