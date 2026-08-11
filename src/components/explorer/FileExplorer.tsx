"use client";

import { useState, useEffect, useCallback, type DragEvent } from "react";
import {
  ChevronRight,
  ChevronDown,
  FileCode2,
  Folder,
  FolderOpen,
  FilePlus2,
  FolderPlus,
  Pencil,
  Trash2,
  Copy,
  Download,
  Upload,
  RotateCcw,
  HardDriveDownload,
  FileJson,
  FileText,
  FileImage,
  FileSpreadsheet,
  Book,
} from "lucide-react";
import type { PyNode, TreeNode } from "@/types/filesystem";
import { getExtension, pathOf } from "@/lib/filesystem/tree";

interface FileExplorerProps {
  tree: TreeNode[];
  nodes: PyNode[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onCreate: (kind: "file" | "folder", name: string, parentId: string | null) => void;
  onRename: (id: string, name: string) => { error?: string } | void;
  onDelete: (ids: string[]) => void;
  onDuplicate: (ids: string[]) => void;
  onDownload: (node: PyNode) => void;
  onDownloadProject: () => void;
  onUpload: (files: FileList) => void;
  onDropItems?: (items: DataTransferItemList) => void;
  onReset: () => void;
  onMove?: (ids: string[], newParentId: string | null) => { error?: string } | void;
}

interface EditState {
  mode: "create" | "rename";
  kind?: "file" | "folder";
  parentId: string | null;
  id?: string;
  initial?: string;
}

const ICON_BY_EXT: Record<string, string> = {
  py: "", // Python uses its own colors in the SVG
  ipynb: "text-[#E36C09]",
  txt: "text-slate-400",
  csv: "text-emerald-400",
  md: "text-[#699df8]",
  json: "text-[#cbcb41]",
};

function getFileIcon(ext: string, className: string) {
  if (ext === "py") {
    return (
      <svg viewBox="0 0 128 128" className={className}>
        <path fill="#3776AB" d="M64.6 0c-35 0-30.5 15.2-30.5 15.2l-.1 15.7h30.6v4.8H31.5s-31.5-2.5-31.5 28 27.5 28.3 27.5 28.3h6.6v-16s-1.3-21.5 20-21.5h31s19.6-1 19.6-21.2-21.3-23.3-21.3-23.3H64.6zM51.7 9.3c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2z"/>
        <path fill="#FFD43B" d="M64.4 128c35 0 30.5-15.2 30.5-15.2l.1-15.7H64.4v-4.8h33.1s31.5 2.5 31.5-28-27.5-28.3-27.5-28.3h-6.6v16s1.3 21.5-20 21.5h-31s-19.6 1-19.6 21.2 21.3 23.3 21.3 23.3H64.4zM77.3 118.7c-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2 3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2z"/>
      </svg>
    );
  }
  if (ext === "json") return <FileJson className={className} />;
  if (ext === "csv") return <FileSpreadsheet className={className} />;
  if (ext === "md" || ext === "txt") return <FileText className={className} />;
  if (ext === "ipynb") return <Book className={className} />;
  if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext)) return <FileImage className={className} />;
  return <FileCode2 className={className} />;
}

export function FileExplorer(props: FileExplorerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [edit, setEdit] = useState<EditState | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(props.activeId ? [props.activeId] : [])
  );
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(props.activeId);

  useEffect(() => {
    if (props.activeId) {
      setSelectedIds(new Set([props.activeId]));
      setLastSelectedId(props.activeId);
    }
  }, [props.activeId]);

  const getActiveFolder = (): string | null => {
    if (selectedIds.size === 0) return null;
    const firstId = Array.from(selectedIds)[0];
    const node = props.nodes.find((n) => n.id === firstId);
    if (!node) return null;
    return node.kind === "folder" ? node.id : node.parentId;
  };

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleDropRoot = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && e.dataTransfer.items[0].kind === 'file' && props.onDropItems) {
      props.onDropItems(e.dataTransfer.items);
    } else if (e.dataTransfer.files?.length) {
      props.onUpload(e.dataTransfer.files);
    } else {
      const data = e.dataTransfer.getData("application/vnd.ide.nodes");
      if (data && props.onMove) {
        try {
          const draggedIds = JSON.parse(data) as string[];
          props.onMove(draggedIds, null);
        } catch (err) {}
      }
    }
  };

  const startCreate = (kind: "file" | "folder", parentId: string | null) => {
    if (parentId) setExpanded((prev) => new Set(prev).add(parentId));
    setEdit({ mode: "create", kind, parentId, initial: "" });
  };

  const commitEdit = (name: string) => {
    if (!edit) return;
    const trimmed = name.trim();
    if (trimmed) {
      if (edit.mode === "create") {
        props.onCreate(edit.kind ?? "file", trimmed, edit.parentId);
      } else if (edit.id) {
        props.onRename(edit.id, trimmed);
      }
    }
    setEdit(null);
  };

  const getVisibleNodes = useCallback(() => {
    const list: string[] = [];
    const traverse = (nodesList: TreeNode[]) => {
      for (const n of nodesList) {
        list.push(n.id);
        if (n.kind === "folder" && expanded.has(n.id)) {
          traverse(n.children);
        }
      }
    };
    traverse(props.tree);
    return list;
  }, [props.tree, expanded]);

  const handleSelect = useCallback((id: string, ctrlKey: boolean, shiftKey: boolean) => {
    if (ctrlKey) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
      setLastSelectedId(id);
    } else if (shiftKey && lastSelectedId) {
      const visible = getVisibleNodes();
      const idx1 = visible.indexOf(lastSelectedId);
      const idx2 = visible.indexOf(id);
      if (idx1 !== -1 && idx2 !== -1) {
        const min = Math.min(idx1, idx2);
        const max = Math.max(idx1, idx2);
        const next = new Set<string>();
        for (let i = min; i <= max; i++) next.add(visible[i]);
        setSelectedIds(next);
      }
    } else {
      setSelectedIds(new Set([id]));
      setLastSelectedId(id);
    }
  }, [lastSelectedId, getVisibleNodes]);

  return (
    <div
      className="flex h-full flex-col bg-[var(--vscode-sidebar-bg)] select-none group/explorer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropRoot}
      onClick={() => setSelectedIds(new Set())}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--vscode-text)] flex-1">
          Pylab
        </span>
        <div className="flex items-center gap-1">
          <IconBtn title="New file" onClick={() => startCreate("file", getActiveFolder())}>
            <FilePlus2 className="h-4 w-4" />
          </IconBtn>
          <IconBtn title="New folder" onClick={() => startCreate("folder", getActiveFolder())}>
            <FolderPlus className="h-4 w-4" />
          </IconBtn>
          <IconBtn title="Upload files" onClick={() => document.getElementById("ide-upload")?.click()}>
            <Upload className="h-4 w-4" />
          </IconBtn>
          <IconBtn title="Reset to examples" onClick={props.onReset}>
            <RotateCcw className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-4 text-[13px] outline-none" tabIndex={0}>
        {props.tree.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            depth={0}
            nodes={props.nodes}
            activeId={props.activeId}
            selectedIds={selectedIds}
            expanded={expanded}
            edit={edit}
            onSelect={handleSelect}
            onToggle={toggle}
            onOpen={props.onOpen}
            onStartCreate={startCreate}
            onStartRename={(id, name) =>
              setEdit({ mode: "rename", id, parentId: null, initial: name })
            }
            onDelete={props.onDelete}
            onDuplicate={props.onDuplicate}
            onDownload={props.onDownload}
            onMove={props.onMove}
            onCommitEdit={commitEdit}
            onCancelEdit={() => setEdit(null)}
          />
        ))}
        {props.tree.length === 0 && (
          <p className="px-5 py-2 text-[13px] text-[var(--vscode-text-muted)]">No files yet.</p>
        )}
        {edit?.mode === "create" && edit.parentId === null && (
          <EditRow
            kind={edit.kind ?? "file"}
            initial=""
            depth={0}
            onCommit={commitEdit}
            onCancel={() => setEdit(null)}
          />
        )}
      </div>

      <input
        id="ide-upload"
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) props.onUpload(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

interface TreeItemProps {
  node: TreeNode;
  depth: number;
  nodes: PyNode[];
  activeId: string | null;
  selectedIds: Set<string>;
  expanded: Set<string>;
  edit: EditState | null;
  onSelect: (id: string, ctrlKey: boolean, shiftKey: boolean) => void;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
  onStartCreate: (kind: "file" | "folder", parentId: string) => void;
  onStartRename: (id: string, name: string) => void;
  onDelete: (ids: string[]) => void;
  onDuplicate: (ids: string[]) => void;
  onDownload: (node: PyNode) => void;
  onMove?: (ids: string[], newParentId: string | null) => { error?: string } | void;
  onCommitEdit: (name: string) => void;
  onCancelEdit: () => void;
}

function TreeItem(props: TreeItemProps) {
  const { node, depth } = props;
  const paddingLeft = depth * 12 + 12; // Base padding + depth indent
  const isOpen = props.expanded.has(node.id);
  const isActive = props.selectedIds.has(node.id);
  const isEditing = props.edit?.mode === "rename" && props.edit.id === node.id;

  if (node.kind === "folder") {
    return (
      <div>
        <div
          draggable
          onDragStart={(e) => {
            e.stopPropagation();
            const idsToMove = props.selectedIds.has(node.id) 
              ? Array.from(props.selectedIds) 
              : [node.id];
            e.dataTransfer.setData("application/vnd.ide.nodes", JSON.stringify(idsToMove));
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const data = e.dataTransfer.getData("application/vnd.ide.nodes");
            if (data && props.onMove) {
              try {
                const draggedIds = JSON.parse(data) as string[];
                props.onMove(draggedIds, node.id);
              } catch (err) {}
            }
          }}
          className={`group flex items-center h-[22px] cursor-pointer text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)] ${isActive ? 'bg-[var(--vscode-hover)]' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            props.onSelect(node.id, e.ctrlKey || e.metaKey, e.shiftKey);
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              props.onToggle(node.id);
            }
          }}
        >
          <div className="flex items-center w-full h-full pr-2" style={{ paddingLeft: `${paddingLeft}px` }}>
            <span className="mr-1 text-[var(--vscode-text)]">
              {isOpen ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
            </span>
            <span className="mr-1.5">
              {isOpen ? (
                <FolderOpen className="h-4 w-4 text-[#dcb67a]" />
              ) : (
                <Folder className="h-4 w-4 text-[#dcb67a]" />
              )}
            </span>
            {isEditing ? (
              <InlineInput
                initial={props.edit?.initial ?? node.name}
                onCommit={props.onCommitEdit}
                onCancel={props.onCancelEdit}
              />
            ) : (
              <span className="flex-1 truncate">{node.name}</span>
            )}
            {!isEditing && (
              <RowActions>
                <IconBtn
                  title="New file"
                  onClick={(e) => { e.stopPropagation(); props.onStartCreate("file", node.id); }}
                >
                  <FilePlus2 className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn
                  title="New folder"
                  onClick={(e) => { e.stopPropagation(); props.onStartCreate("folder", node.id); }}
                >
                  <FolderPlus className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn
                  title="Rename"
                  onClick={(e) => { e.stopPropagation(); props.onStartRename(node.id, node.name); }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn 
                  title="Delete" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    props.onDelete(props.selectedIds.has(node.id) ? Array.from(props.selectedIds) : [node.id]); 
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconBtn>
              </RowActions>
            )}
          </div>
        </div>
        {isOpen && (
          <div>
            {node.children.map((child) => (
              <TreeItem {...props} key={child.id} node={child} depth={depth + 1} />
            ))}
            {props.edit?.mode === "create" &&
              props.edit.parentId === node.id && (
                <EditRow
                  kind={props.edit.kind ?? "file"}
                  initial=""
                  depth={depth + 1}
                  onCommit={props.onCommitEdit}
                  onCancel={props.onCancelEdit}
                />
              )}
          </div>
        )}
      </div>
    );
  }

  const ext = getExtension(node.name);
  const iconClass = ICON_BY_EXT[ext] ?? "text-slate-400";

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        const idsToMove = props.selectedIds.has(node.id) 
          ? Array.from(props.selectedIds) 
          : [node.id];
        e.dataTransfer.setData("application/vnd.ide.nodes", JSON.stringify(idsToMove));
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = e.dataTransfer.getData("application/vnd.ide.nodes");
        if (data && props.onMove) {
          try {
            const draggedIds = JSON.parse(data) as string[];
            props.onMove(draggedIds, node.parentId);
          } catch (err) {}
        }
      }}
      className={`group flex items-center h-[22px] cursor-pointer ${
        isActive ? "bg-[var(--vscode-hover)] text-[var(--vscode-text)]" : "text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        props.onSelect(node.id, e.ctrlKey || e.metaKey, e.shiftKey);
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
          props.onOpen(node.id);
        }
      }}
    >
      <div className="flex items-center w-full h-full pr-2" style={{ paddingLeft: `${paddingLeft}px` }}>
        {/* Invisible spacer for file alignment with folder chevrons */}
        <span className="w-4 mr-1 shrink-0" />
        {getFileIcon(ext, `h-4 w-4 shrink-0 mr-1.5 ${iconClass}`)}
        {isEditing ? (
          <InlineInput
            initial={props.edit?.initial ?? node.name}
            onCommit={props.onCommitEdit}
            onCancel={props.onCancelEdit}
          />
        ) : (
          <span
            className="flex-1 truncate"
            title={pathOf(props.nodes, node.id)}
          >
            {node.name}
          </span>
        )}
        {!isEditing && (
          <RowActions>
            <IconBtn title="Rename" onClick={(e) => { e.stopPropagation(); props.onStartRename(node.id, node.name); }}>
              <Pencil className="h-3.5 w-3.5" />
            </IconBtn>
            <IconBtn title="Duplicate" onClick={(e) => { 
              e.stopPropagation(); 
              props.onDuplicate(props.selectedIds.has(node.id) ? Array.from(props.selectedIds) : [node.id]); 
            }}>
              <Copy className="h-3.5 w-3.5" />
            </IconBtn>
            <IconBtn title="Download" onClick={(e) => { e.stopPropagation(); props.onDownload(node); }}>
              <Download className="h-3.5 w-3.5" />
            </IconBtn>
            <IconBtn title="Delete" onClick={(e) => { 
              e.stopPropagation(); 
              props.onDelete(props.selectedIds.has(node.id) ? Array.from(props.selectedIds) : [node.id]); 
            }}>
              <Trash2 className="h-3.5 w-3.5" />
            </IconBtn>
          </RowActions>
        )}
      </div>
    </div>
  );
}

function EditRow({
  kind,
  initial,
  depth,
  onCommit,
  onCancel,
}: {
  kind: "file" | "folder";
  initial: string;
  depth: number;
  onCommit: (name: string) => void;
  onCancel: () => void;
}) {
  const paddingLeft = depth * 12 + 12;
  return (
    <div className="flex items-center h-[22px] bg-[var(--vscode-hover)]">
      <div className="flex items-center w-full h-full pr-2" style={{ paddingLeft: `${paddingLeft}px` }}>
        <span className="w-4 mr-1 shrink-0" />
        {kind === "folder" ? (
          <Folder className="h-4 w-4 shrink-0 mr-1.5 text-[#dcb67a]" />
        ) : (
          getFileIcon(getExtension(initial), "h-4 w-4 shrink-0 mr-1.5 text-slate-400")
        )}
        <InlineInput initial={initial} onCommit={onCommit} onCancel={onCancel} />
      </div>
    </div>
  );
}

function InlineInput({
  initial,
  onCommit,
  onCancel,
}: {
  initial: string;
  onCommit: (name: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onCommit(value);
        } else if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      }}
      onBlur={() => onCommit(value)}
      onClick={(e) => e.stopPropagation()}
      className="min-w-0 flex-1 h-[20px] rounded-[2px] border border-[var(--vscode-accent)] bg-[var(--vscode-input)] px-1 text-[13px] text-[var(--vscode-text)] outline-none shadow-[0_0_0_1px_rgba(0,122,204,0.5)]"
    />
  );
}

function RowActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 bg-inherit pl-1">
      {children}
    </div>
  );
}

function IconBtn({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      title={title}
      aria-label={title}
      onClick={onClick}
      className="rounded p-0.5 text-[var(--vscode-text)] hover:bg-[var(--vscode-border)444] transition-colors flex items-center justify-center"
    >
      {children}
    </button>
  );
}
