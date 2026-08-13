import { descendantIds, genId, pathOf } from "./tree";
import type { PyNode } from "@/types/filesystem";
import type { FsSyncChanges } from "@/types/python";

export interface AppliedFilesystemChanges {
  nodes: PyNode[];
  created: PyNode[];
  updated: PyNode[];
  deletedIds: string[];
}

export function normalizeFilesystemPath(path: string): string | null {
  const parts = path.replace(/\\/g, "/").split("/").filter(Boolean);
  if (!parts.length || parts.some((part) => part === "." || part === "..")) {
    return null;
  }
  return parts.join("/");
}

/** Reconcile worker-originated file, directory, and deletion changes. */
export function applyFilesystemChanges(
  currentNodes: PyNode[],
  changes: FsSyncChanges,
  options: {
    createId?: () => string;
    now?: () => number;
  } = {},
): AppliedFilesystemChanges {
  const createId = options.createId ?? genId;
  const now = options.now ?? Date.now;
  let nodes = [...currentNodes];
  const created: PyNode[] = [];
  const updated: PyNode[] = [];
  const deletedIds = new Set<string>();

  const removeNode = (node: PyNode) => {
    const ids = new Set([node.id, ...descendantIds(nodes, node.id)]);
    for (const id of ids) deletedIds.add(id);
    nodes = nodes.filter((candidate) => !ids.has(candidate.id));
  };

  const findAt = (parentId: string | null, name: string) =>
    nodes.find(
      (node) => node.parentId === parentId && node.name === name,
    );

  const ensureDirectory = (path: string): PyNode | null => {
    const normalized = normalizeFilesystemPath(path);
    if (!normalized) return null;
    let parentId: string | null = null;
    let current: PyNode | null = null;

    for (const part of normalized.split("/")) {
      const existing = findAt(parentId, part);
      if (existing?.kind === "folder") {
        current = existing;
        parentId = existing.id;
        continue;
      }
      if (existing) removeNode(existing);

      const timestamp = now();
      current = {
        id: createId(),
        name: part,
        parentId,
        kind: "folder",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      nodes.push(current);
      created.push(current);
      parentId = current.id;
    }
    return current;
  };

  [...changes.deleted]
    .map(normalizeFilesystemPath)
    .filter((path): path is string => path != null)
    .sort((a, b) => b.split("/").length - a.split("/").length)
    .forEach((path) => {
      const node = nodes.find((candidate) => pathOf(nodes, candidate.id) === path);
      if (node) removeNode(node);
    });

  [...changes.directories]
    .map(normalizeFilesystemPath)
    .filter((path): path is string => path != null)
    .sort((a, b) => a.split("/").length - b.split("/").length)
    .forEach(ensureDirectory);

  for (const file of changes.upserted) {
    const normalized = normalizeFilesystemPath(file.path);
    if (!normalized) continue;
    const parts = normalized.split("/");
    const name = parts.pop()!;
    const parentPath = parts.join("/");
    const parent = parentPath ? ensureDirectory(parentPath) : null;
    const parentId = parent?.id ?? null;
    const existing = findAt(parentId, name);

    if (existing?.kind === "file") {
      if (existing.content !== file.content) {
        const changed: PyNode = {
          ...existing,
          content: file.content,
          updatedAt: now(),
        };
        nodes = nodes.map((node) => (node.id === existing.id ? changed : node));
        updated.push(changed);
      }
      continue;
    }
    if (existing) removeNode(existing);

    const timestamp = now();
    const createdFile: PyNode = {
      id: createId(),
      name,
      parentId,
      kind: "file",
      content: file.content,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    nodes.push(createdFile);
    created.push(createdFile);
  }

  return {
    nodes,
    created,
    updated,
    deletedIds: [...deletedIds],
  };
}
