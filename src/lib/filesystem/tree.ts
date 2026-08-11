import type { PyNode, TreeNode } from "@/types/filesystem";

export function genId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Build a nested tree from a flat node list, ordered folders-first then name. */
export function buildTree(nodes: PyNode[]): TreeNode[] {
  const byParent = new Map<string | null, PyNode[]>();
  for (const n of nodes) {
    const arr = byParent.get(n.parentId) ?? [];
    arr.push(n);
    byParent.set(n.parentId, arr);
  }
  const make = (parentId: string | null): TreeNode[] => {
    const list = byParent.get(parentId) ?? [];
    list.sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });
    return list.map((n) => ({ ...n, children: make(n.id) }));
  };
  return make(null);
}

/** Compute the dotted/slash path for a node, e.g. "practice/question1.py". */
export function pathOf(nodes: PyNode[], id: string): string {
  const map = new Map(nodes.map((n) => [n.id, n]));
  const parts: string[] = [];
  let cur = map.get(id);
  while (cur) {
    parts.unshift(cur.name);
    cur = cur.parentId ? map.get(cur.parentId) : undefined;
  }
  return parts.join("/");
}

export function getExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i + 1).toLowerCase();
}

export function isPythonFile(name: string): boolean {
  return getExtension(name) === "py";
}

/** Validate a file/folder name. Returns an error string or null when valid. */
export function validateName(name: string, siblings: PyNode[]): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name cannot be empty";
  if (trimmed.length > 100) return "Name is too long";
  if (/[\\/]/.test(trimmed)) return "Name cannot contain slashes";
  if (trimmed === "." || trimmed === "..") return "Invalid name";
  if (siblings.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
    return "A file with this name already exists";
  }
  return null;
}

/** Collect all descendant node ids of a given node (excluding itself). */
export function descendantIds(nodes: PyNode[], id: string): string[] {
  const result: string[] = [];
  const stack = [id];
  while (stack.length) {
    const cur = stack.pop()!;
    const kids = nodes.filter((n) => n.parentId === cur);
    for (const k of kids) {
      result.push(k.id);
      stack.push(k.id);
    }
  }
  return result;
}
