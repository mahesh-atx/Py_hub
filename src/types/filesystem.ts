// Virtual filesystem types shared between the explorer, the editor, the
// persistence layer and the Pyodide runtime.

export type NodeKind = "file" | "folder";

export interface PyNode {
  id: string;
  name: string;
  parentId: string | null;
  kind: NodeKind;
  /** Present for files. */
  content?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ProjectState {
  files: PyNode[];
  activeFileId: string | null;
}

export interface TreeNode extends PyNode {
  children: TreeNode[];
}

export interface Workspace {
  id: string;
  name: string;
}
