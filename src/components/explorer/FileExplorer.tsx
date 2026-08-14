"use client";

import { useState, useCallback, useEffect, type DragEvent } from "react";
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
  FileJson,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileCog,
  FileArchive,
  Book,
  ListCollapse,
  type LucideIcon,
} from "lucide-react";
import type { PyNode, TreeNode } from "@/types/filesystem";
import { getExtension, pathOf } from "@/lib/filesystem/tree";
import { toast } from "@/components/ide/ToastContainer";

interface FileExplorerProps {
  tree: TreeNode[];
  nodes: PyNode[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onCreate: (kind: "file" | "folder", name: string, parentId: string | null) => { error?: string } | void;
  onRename: (id: string, name: string) => { error?: string } | void;
  onDelete: (ids: string[]) => void;
  onDuplicate: (ids: string[]) => void;
  onDownload: (node: PyNode) => void;
  onDownloadProject: () => void;
  onUpload: (files: FileList) => void;
  onDropItems?: (items: DataTransferItemList) => void;
  onReset: () => void;
  onMove?: (ids: string[], newParentId: string | null) => { error?: string } | void;
  iconStyle: string;
}

interface EditState {
  mode: "create" | "rename";
  kind?: "file" | "folder";
  parentId: string | null;
  id?: string;
  initial?: string;
}

type FileKind =
  | "python"
  | "json"
  | "markdown"
  | "notebook"
  | "text"
  | "csv"
  | "image"
  | "config"
  | "archive"
  | "code"
  | "generic";

const EXT_KIND: Record<string, FileKind> = {
  py: "python",
  pyw: "python",
  pyi: "python",
  json: "json",
  md: "markdown",
  mdx: "markdown",
  markdown: "markdown",
  rst: "markdown",
  ipynb: "notebook",
  txt: "text",
  log: "text",
  text: "text",
  csv: "csv",
  tsv: "csv",
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  svg: "image",
  webp: "image",
  bmp: "image",
  ico: "image",
  avif: "image",
  yaml: "config",
  yml: "config",
  toml: "config",
  ini: "config",
  cfg: "config",
  conf: "config",
  env: "config",
  properties: "config",
  zip: "archive",
  tar: "archive",
  gz: "archive",
  tgz: "archive",
  bz2: "archive",
  xz: "archive",
  "7z": "archive",
  rar: "archive",
  html: "code",
  htm: "code",
  xml: "code",
  css: "code",
  scss: "code",
  less: "code",
  js: "code",
  mjs: "code",
  cjs: "code",
  jsx: "code",
  ts: "code",
  mts: "code",
  cts: "code",
  tsx: "code",
  c: "code",
  h: "code",
  cpp: "code",
  hpp: "code",
  cc: "code",
  java: "code",
  go: "code",
  rs: "code",
  rb: "code",
  php: "code",
  swift: "code",
  kt: "code",
  cs: "code",
  sh: "code",
  bash: "code",
  zsh: "code",
  ps1: "code",
  bat: "code",
  cmd: "code",
  lua: "code",
  pl: "code",
  r: "code",
  sql: "code",
};

// One shared color per file kind, used by the colored styles ("lucide" and "vscode").
const KIND_COLOR: Record<FileKind, string> = {
  python: "text-[#3776AB]",
  json: "text-[#cbcb41]",
  markdown: "text-[#699df8]",
  notebook: "text-[#E36C09]",
  text: "text-slate-400",
  csv: "text-emerald-400",
  image: "text-[#c084fc]",
  config: "text-[#e5a03b]",
  archive: "text-slate-400",
  code: "text-slate-400",
  generic: "text-slate-400",
};

// Vivid palette used by the "flat" theme.
const VIVID_COLOR: Record<FileKind, string> = {
  python: "text-[#3776AB]",
  json: "text-[#FBC02D]",
  markdown: "text-[#42A5F5]",
  notebook: "text-[#FF6D00]",
  text: "text-[#90A4AE]",
  csv: "text-[#43A047]",
  image: "text-[#AB47BC]",
  config: "text-[#FFB300]",
  archive: "text-[#8D6E63]",
  code: "text-[#26C6DA]",
  generic: "text-[#78909C]",
};

// Soft palette used by the "pastel" theme.
const PASTEL_COLOR: Record<FileKind, string> = {
  python: "text-[#8FB8D8]",
  json: "text-[#F6C453]",
  markdown: "text-[#9FC3E8]",
  notebook: "text-[#F5A86A]",
  text: "text-[#B8C0C9]",
  csv: "text-[#9CCF8E]",
  image: "text-[#D0B0E0]",
  config: "text-[#EAC27E]",
  archive: "text-[#C2ACA3]",
  code: "text-[#A6D8DE]",
  generic: "text-[#C0C7CD]",
};

// Maps a theme name to its per-kind color palette. Monochrome themes have none.
const THEME_COLOR: Record<string, Record<FileKind, string>> = {
  lucide: KIND_COLOR,
  vscode: KIND_COLOR,
  flat: VIVID_COLOR,
  pastel: PASTEL_COLOR,
};

// Stroke-based outline icons, used by the "lucide" style.
const LUCIDE_ICON: Record<FileKind, LucideIcon> = {
  python: FileCode2,
  json: FileJson,
  markdown: FileText,
  notebook: Book,
  text: FileText,
  csv: FileSpreadsheet,
  image: FileImage,
  config: FileCog,
  archive: FileArchive,
  code: FileCode2,
  generic: FileCode2,
};

// Filled glyphs shared by the "vscode" and "minimal" styles. "minimal" renders
// them monochrome (inherits text color), "vscode" tints them via KIND_COLOR.
const DOC_PATH =
  "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6";
const DOC_LINES_PATH =
  DOC_PATH + "M8.5 12.5h7v1.6h-7zM8.5 16h7v1.6h-7z";
const DOC_GRID_PATH =
  DOC_PATH +
  "M8.8 5.8h1.6v12.4H8.8zM13.6 5.8h1.6v12.4h-1.6zM6 10.4h12v1.6H6zM6 14.6h12v1.6H6z";
const DOC_IMAGE_PATH =
  "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" +
  "M15.5 6.9a1.8 1.8 0 1 0 0.01 0zM6 17.8l4.5-6.8l3.6 4.4l2.3-2.6l1.6 5z";

const PYTHON_MONO_PATH =
  "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z";

const JSON_BRACES_PATH =
  "M12.043 23.968c.479-.004.953-.029 1.426-.094a11.805 11.805 0 003.146-.863 12.404 12.404 0 003.793-2.542 11.977 11.977 0 002.44-3.427 11.794 11.794 0 001.02-3.476c.149-1.16.135-2.346-.045-3.499a11.96 11.96 0 00-.793-2.788 11.197 11.197 0 00-.854-1.617c-1.168-1.837-2.861-3.314-4.81-4.3a12.835 12.835 0 00-2.172-.87h-.005c.119.063.24.132.345.201.12.074.239.146.351.225a8.93 8.93 0 011.559 1.33c1.063 1.145 1.797 2.548 2.218 4.041.284.982.434 1.998.495 3.017.044.743.044 1.491-.047 2.229-.149 1.27-.554 2.51-1.228 3.596a7.475 7.475 0 01-1.903 2.084c-1.244.928-2.877 1.482-4.436 1.114a3.916 3.916 0 01-.748-.258 4.692 4.692 0 01-.779-.45 6.08 6.08 0 01-1.244-1.105 6.507 6.507 0 01-1.049-1.747 7.366 7.366 0 01-.494-2.54c-.03-1.273.225-2.553.854-3.67a6.43 6.43 0 011.663-1.918c.225-.178.464-.333.704-.479l.016-.007a5.121 5.121 0 00-1.441-.12 4.963 4.963 0 00-1.228.24c-.359.12-.704.27-1.019.45a6.146 6.146 0 00-.733.494c-.211.18-.42.36-.615.555-1.123 1.153-1.768 2.682-2.022 4.256-.15.973-.15 1.96-.091 2.95.105 1.395.391 2.787.945 4.062a8.518 8.518 0 001.348 2.173 8.14 8.14 0 003.132 2.23 7.934 7.934 0 002.113.54c.074.015.149.015.209.015zm-2.934-.398a4.102 4.102 0 01-.45-.228 8.5 8.5 0 01-2.038-1.534c-1.094-1.137-1.827-2.566-2.247-4.08a15.184 15.184 0 01-.495-3.172 12.14 12.14 0 01.046-2.082c.135-1.257.495-2.501 1.124-3.58a6.889 6.889 0 011.783-2.053 6.23 6.23 0 011.633-.9 5.363 5.363 0 013.522-.045c.029 0 .029 0 .045.03.015.015.045.015.06.03.045.016.104.045.165.074.239.12.479.271.704.42a6.294 6.294 0 012.097 2.502c.42.914.615 1.934.631 2.938.014 1.079-.18 2.157-.645 3.146a6.42 6.42 0 01-2.638 2.832c.09.03.18.045.271.075.225.044.449.074.688.074 1.468.045 2.892-.66 3.94-1.647.195-.18.375-.375.54-.585.225-.27.435-.54.614-.823.239-.375.435-.75.614-1.154a8.112 8.112 0 00.509-1.664c.196-1.004.211-2.022.149-3.026-.135-2.022-.673-4.045-1.842-5.724a9.054 9.054 0 00-.555-.719 9.868 9.868 0 00-1.063-1.034 8.477 8.477 0 00-1.363-.915 9.927 9.927 0 00-1.692-.598l-.3-.06c-.209-.03-.42-.044-.634-.06a8.453 8.453 0 00-1.015.016c-.704.045-1.412.16-2.112.337C5.799 1.227 2.863 3.566 1.3 6.67A11.834 11.834 0 00.238 9.801a11.81 11.81 0 00-.104 3.775c.12 1.02.374 2.023.778 2.977.227.57.511 1.124.825 1.648 1.094 1.783 2.683 3.236 4.51 4.24.688.39 1.408.69 2.157.944.226.074.45.15.689.21z";

const MARKDOWN_PATH =
  "M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z";

const JUPYTER_PATH =
  "M7.157 22.201A1.784 1.799 0 0 1 5.374 24a1.784 1.799 0 0 1-1.784-1.799 1.784 1.799 0 0 1 1.784-1.799 1.784 1.799 0 0 1 1.783 1.799zM20.582 1.427a1.415 1.427 0 0 1-1.415 1.428 1.415 1.427 0 0 1-1.416-1.428A1.415 1.427 0 0 1 19.167 0a1.415 1.427 0 0 1 1.415 1.427zM4.992 3.336A1.047 1.056 0 0 1 3.946 4.39a1.047 1.056 0 0 1-1.047-1.055A1.047 1.056 0 0 1 3.946 2.28a1.047 1.056 0 0 1 1.046 1.056zm7.336 1.517c3.769 0 7.06 1.38 8.768 3.424a9.363 9.363 0 0 0-3.393-4.547 9.238 9.238 0 0 0-5.377-1.728A9.238 9.238 0 0 0 6.95 3.73a9.363 9.363 0 0 0-3.394 4.547c1.713-2.04 5.004-3.424 8.772-3.424zm.001 13.295c-3.768 0-7.06-1.381-8.768-3.425a9.363 9.363 0 0 0 3.394 4.547A9.238 9.238 0 0 0 12.33 21a9.238 9.238 0 0 0 5.377-1.729 9.363 9.363 0 0 0 3.393-4.547c-1.712 2.044-5.003 3.425-8.772 3.425Z";

const GLYPH_PATHS: Record<FileKind, { d: string; evenodd?: boolean }> = {
  python: { d: PYTHON_MONO_PATH },
  json: { d: JSON_BRACES_PATH },
  markdown: { d: MARKDOWN_PATH },
  notebook: { d: JUPYTER_PATH },
  text: { d: DOC_LINES_PATH, evenodd: true },
  csv: { d: DOC_GRID_PATH, evenodd: true },
  image: { d: DOC_IMAGE_PATH, evenodd: true },
  config: { d: DOC_PATH },
  archive: { d: DOC_PATH },
  code: { d: DOC_PATH },
  generic: { d: DOC_PATH },
};

function FilledGlyph({ kind, className }: { kind: FileKind; className: string }) {
  const { d, evenodd } = GLYPH_PATHS[kind] ?? GLYPH_PATHS.generic;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={d} fillRule={evenodd ? "evenodd" : undefined} />
    </svg>
  );
}

function PythonBranded({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        fill="#3776AB"
        d="M64.6 0c-35 0-30.5 15.2-30.5 15.2l-.1 15.7h30.6v4.8H31.5s-31.5-2.5-31.5 28 27.5 28.3 27.5 28.3h6.6v-16s-1.3-21.5 20-21.5h31s19.6-1 19.6-21.2-21.3-23.3-21.3-23.3H64.6zM51.7 9.3c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2z"
      />
      <path
        fill="#FFD43B"
        d="M64.4 128c35 0 30.5-15.2 30.5-15.2l.1-15.7H64.4v-4.8h33.1s31.5 2.5 31.5-28-27.5-28.3-27.5-28.3h-6.6v16s1.3 21.5-20 21.5h-31s-19.6 1-19.6 21.2 21.3 23.3 21.3 23.3H64.4zM77.3 118.7c-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2 3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2z"
      />
    </svg>
  );
}

export function getFileIcon(ext: string, className: string, style: string) {
  const kind = EXT_KIND[ext] ?? "generic";
  const color = THEME_COLOR[style]?.[kind] ?? "";

  // Monochrome outline ("mono") — lucide strokes, no color.
  if (style === "mono") {
    const Icon = LUCIDE_ICON[kind];
    return <Icon className={className} />;
  }

  // Monochrome filled ("minimal") — filled glyphs, no color.
  if (style === "minimal") {
    return <FilledGlyph kind={kind} className={className} />;
  }

  // Branded python logo in the VS Code theme.
  if (style === "vscode" && kind === "python") {
    return <PythonBranded className={className} />;
  }

  // Filled glyph themes: "vscode", "flat", "pastel".
  const isFilled = style === "vscode" || style === "flat" || style === "pastel";
  if (isFilled) {
    return <FilledGlyph kind={kind} className={`${className} ${color}`} />;
  }

  // Outline lucide themes: "lucide" (and unknown fallbacks).
  const Icon = LUCIDE_ICON[kind];
  return <Icon className={`${className} ${color}`} />;
}

function getFolderIcon(isOpen: boolean, className: string, style: string) {
  const isMonochrome = style === "minimal" || style === "mono";
  const color = isMonochrome
    ? ""
    : isOpen
      ? " text-[#e5a03b]"
      : " text-[#dcb67a]";
  return isOpen
    ? <FolderOpen className={`${className}${color}`} />
    : <Folder className={`${className}${color}`} />;
}

export function FileExplorer(props: FileExplorerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [edit, setEdit] = useState<EditState | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(props.activeId ? [props.activeId] : [])
  );
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(props.activeId);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [deleteConfirmIds, setDeleteConfirmIds] = useState<string[] | null>(null);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean, x: number, y: number, nodeId: string | null }>({ visible: false, x: 0, y: 0, nodeId: null });

  // Keep the explorer selection in sync with the active file (React docs:
  // "adjusting state during render" pattern — guarded so it runs once per change).
  if (props.activeId && !selectedIds.has(props.activeId)) {
    setSelectedIds(new Set([props.activeId]));
  }
  if (props.activeId && lastSelectedId !== props.activeId) {
    setLastSelectedId(props.activeId);
  }

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

  const collapseAll = () => setExpanded(new Set());

  const handleDropRoot = (e: DragEvent) => {
    e.preventDefault();
    setDragOverId(null);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && e.dataTransfer.items[0].kind === 'file' && props.onDropItems) {
      props.onDropItems(e.dataTransfer.items);
    } else if (e.dataTransfer.files?.length) {
      props.onUpload(e.dataTransfer.files);
    } else {
      const data = e.dataTransfer.getData("application/vnd.ide.nodes");
      if (data && props.onMove) {
        try {
          const draggedIds = JSON.parse(data) as string[];
          const res = props.onMove(draggedIds, null);
          if (res && res.error) toast.error(res.error);
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
        const res = props.onCreate(edit.kind ?? "file", trimmed, edit.parentId);
        if (res && res.error) {
          toast.error(res.error);
          return;
        }
      } else if (edit.id) {
        const res = props.onRename(edit.id, trimmed);
        if (res && res.error) {
          toast.error(res.error);
          return;
        }
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

  const handleContextMenu = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedIds.has(id)) {
      setSelectedIds(new Set([id]));
      setLastSelectedId(id);
    }
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, nodeId: id });
  }, [selectedIds]);

  const closeContextMenu = useCallback(() => {
    if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
  }, [contextMenu]);

  useEffect(() => {
    const handleGlobalClick = () => closeContextMenu();
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [closeContextMenu]);

  return (
    <div
      className="flex h-full flex-col bg-[var(--vscode-sidebar-bg)] select-none group/explorer relative"
      onDragOver={(e) => { e.preventDefault(); setDragOverId(null); }}
      onDrop={handleDropRoot}
      onClick={() => { setSelectedIds(new Set()); closeContextMenu(); }}
      onContextMenu={(e) => { e.preventDefault(); closeContextMenu(); }}
    >
      <div 
        className="group/root flex min-h-6 items-center justify-between px-2 hover:bg-[var(--vscode-hover)] relative hover:-translate-y-[1px] hover:shadow-md hover:z-20 transition-all z-10"
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverId("root"); }}
        onDrop={(e) => { e.stopPropagation(); handleDropRoot(e); }}
        style={{ backgroundColor: dragOverId === "root" ? "var(--vscode-list-dropBackground)" : undefined }}
      >
        <span className="flex-1 truncate text-[11px] font-semibold uppercase text-[var(--vscode-text)]">
          Pylab
        </span>
        <div className="flex items-center opacity-60 transition-opacity group-hover/root:opacity-100 focus-within:opacity-100">
          <IconBtn title="New file" onClick={() => startCreate("file", getActiveFolder())}>
            <FilePlus2 className="h-4 w-4" />
          </IconBtn>
          <IconBtn title="New folder" onClick={() => startCreate("folder", getActiveFolder())}>
            <FolderPlus className="h-4 w-4" />
          </IconBtn>
          <IconBtn title="Upload files" onClick={() => document.getElementById("ide-upload")?.click()}>
            <Upload className="h-4 w-4" />
          </IconBtn>
          <IconBtn title="Collapse All" onClick={collapseAll}>
            <ListCollapse className="h-4 w-4" />
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
            onDelete={(ids) => setDeleteConfirmIds(ids)}
            onDuplicate={props.onDuplicate}
            onDownload={props.onDownload}
            onMove={props.onMove}
            onCommitEdit={commitEdit}
            onCancelEdit={() => setEdit(null)}
            dragOverId={dragOverId}
            onSetDragOverId={setDragOverId}
            onContextMenu={handleContextMenu}
            iconStyle={props.iconStyle}
          />
        ))}
        {props.tree.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center opacity-60 mt-10">
            <FolderOpen className="w-10 h-10 mb-3 text-[var(--vscode-text-muted)]" />
            <p className="text-[var(--vscode-text-muted)] mb-2 font-medium">Workspace is empty</p>
            <p className="text-[11px] text-[var(--vscode-text-muted)] leading-relaxed">
              Use the toolbar icons above or drag and drop to create files.
            </p>
          </div>
        )}
        {edit?.mode === "create" && edit.parentId === null && (
          <EditRow
            kind={edit.kind ?? "file"}
            initial=""
            depth={0}
            onCommit={commitEdit}
            onCancel={() => setEdit(null)}
            iconStyle={props.iconStyle}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmIds && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[var(--vscode-bg)] border border-[var(--vscode-border)] rounded shadow-xl w-full max-w-sm flex flex-col p-4 gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="text-[13px] text-[var(--vscode-text)]">
              <span className="font-semibold block mb-2">Are you sure you want to delete {deleteConfirmIds.length > 1 ? `these ${deleteConfirmIds.length} items` : 'this item'}?</span>
              <span className="text-[var(--vscode-text-muted)] text-xs">This action cannot be undone.</span>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={(e) => { e.stopPropagation(); setDeleteConfirmIds(null); }}
                className="px-3 py-1.5 rounded text-xs text-[var(--vscode-text)] bg-[var(--vscode-hover)] hover:bg-[var(--vscode-border)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  props.onDelete(deleteConfirmIds);
                  setDeleteConfirmIds(null);
                  setSelectedIds(new Set());
                }}
                className="px-3 py-1.5 rounded text-xs text-white bg-rose-600 hover:bg-rose-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu.visible && contextMenu.nodeId && (
        <div 
          className="fixed z-50 py-1 bg-[var(--vscode-bg)] border border-[var(--vscode-border)] shadow-xl rounded-md text-[13px] text-[var(--vscode-text)] min-w-[160px]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {(() => {
            const node = props.nodes.find(n => n.id === contextMenu.nodeId);
            const isFolder = node?.kind === 'folder';
            return (
              <>
                {isFolder && (
                  <>
                    <ContextMenuItem onClick={() => { startCreate("file", node.id); closeContextMenu(); }} icon={<FilePlus2 className="h-4 w-4" />}>New File</ContextMenuItem>
                    <ContextMenuItem onClick={() => { startCreate("folder", node.id); closeContextMenu(); }} icon={<FolderPlus className="h-4 w-4" />}>New Folder</ContextMenuItem>
                    <ContextMenuDivider />
                  </>
                )}
                <ContextMenuItem onClick={() => { 
                  if (node) {
                    setEdit({ mode: "rename", id: node.id, parentId: null, initial: node.name });
                  }
                  closeContextMenu(); 
                }} icon={<Pencil className="h-4 w-4" />}>Rename</ContextMenuItem>
                <ContextMenuItem onClick={() => { 
                  props.onDuplicate(Array.from(selectedIds)); 
                  closeContextMenu(); 
                }} icon={<Copy className="h-4 w-4" />}>Duplicate</ContextMenuItem>
                {!isFolder && (
                  <ContextMenuItem onClick={() => { 
                    if (node) props.onDownload(node); 
                    closeContextMenu(); 
                  }} icon={<Download className="h-4 w-4" />}>Download</ContextMenuItem>
                )}
                <ContextMenuItem onClick={() => { 
                  if (node) {
                    navigator.clipboard.writeText(pathOf(props.nodes, node.id));
                  }
                  closeContextMenu();
                }} icon={<Copy className="h-4 w-4" />}>Copy Path</ContextMenuItem>
                <ContextMenuDivider />
                <ContextMenuItem 
                  onClick={() => { setDeleteConfirmIds(Array.from(selectedIds)); closeContextMenu(); }} 
                  icon={<Trash2 className="h-4 w-4 text-rose-400" />}
                  className="text-rose-400 hover:text-rose-300"
                >
                  Delete
                </ContextMenuItem>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function ContextMenuItem({ onClick, icon, children, className = "" }: { onClick: () => void, icon?: React.ReactNode, children: React.ReactNode, className?: string }) {
  return (
    <button 
      className={`w-full text-left px-3 py-1.5 hover:bg-[var(--vscode-accent)] hover:text-white flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </button>
  );
}

function ContextMenuDivider() {
  return <div className="h-[1px] bg-[var(--vscode-border)] my-1 mx-2" />;
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
  dragOverId: string | null;
  onSetDragOverId: (id: string | null) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
  iconStyle: string;
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
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onSetDragOverId(node.id);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onSetDragOverId(null);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onSetDragOverId(null);
            const data = e.dataTransfer.getData("application/vnd.ide.nodes");
            if (data && props.onMove) {
              try {
                const draggedIds = JSON.parse(data) as string[];
                const res = props.onMove(draggedIds, node.id);
                if (res && res.error) toast.error(res.error);
              } catch (err) {}
            }
          }}
          className={`group flex items-center h-[22px] cursor-pointer ${
            props.dragOverId === node.id 
              ? 'bg-[var(--vscode-hover)] ring-1 ring-[var(--vscode-accent)] text-[var(--vscode-text)]' 
              : isActive ? 'bg-[var(--vscode-hover)] text-[var(--vscode-text)]' : 'text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            props.onSelect(node.id, e.ctrlKey || e.metaKey, e.shiftKey);
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              props.onToggle(node.id);
            }
          }}
          onContextMenu={(e) => props.onContextMenu(e, node.id)}
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
                getFolderIcon(true, "h-4 w-4 shrink-0", props.iconStyle)
              ) : (
                getFolderIcon(false, "h-4 w-4 shrink-0", props.iconStyle)
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
                  iconStyle={props.iconStyle}
                />
              )}
          </div>
        )}
      </div>
    );
  }

  const ext = getExtension(node.name);

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
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (node.parentId !== props.dragOverId) {
          props.onSetDragOverId(node.parentId); // visual hint goes to parent folder
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onSetDragOverId(null);
        const data = e.dataTransfer.getData("application/vnd.ide.nodes");
        if (data && props.onMove) {
          try {
            const draggedIds = JSON.parse(data) as string[];
            const res = props.onMove(draggedIds, node.parentId);
            if (res && res.error) toast.error(res.error);
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
      onContextMenu={(e) => props.onContextMenu(e, node.id)}
    >
      <div className="flex items-center w-full h-full pr-2" style={{ paddingLeft: `${paddingLeft}px` }}>
        {/* Invisible spacer for file alignment with folder chevrons */}
        <span className="w-4 mr-1 shrink-0" />
        {getFileIcon(ext, "h-4 w-4 shrink-0 mr-1.5", props.iconStyle)}
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
  iconStyle,
}: {
  kind: "file" | "folder";
  initial: string;
  depth: number;
  onCommit: (name: string) => void;
  onCancel: () => void;
  iconStyle: string;
}) {
  const paddingLeft = depth * 12 + 12;
  return (
    <div className="flex items-center h-[22px] bg-[var(--vscode-hover)]">
      <div className="flex items-center w-full h-full pr-2" style={{ paddingLeft: `${paddingLeft}px` }}>
        <span className="w-4 mr-1 shrink-0" />
        {kind === "folder" ? (
          getFolderIcon(false, "h-4 w-4 shrink-0 mr-1.5", iconStyle)
        ) : (
          getFileIcon(getExtension(initial), "h-4 w-4 shrink-0 mr-1.5", iconStyle)
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
      className="rounded p-0.5 text-[var(--vscode-text)] hover:bg-[var(--vscode-toolbar-hoverBackground)] transition-colors flex items-center justify-center cursor-pointer"
    >
      {children}
    </button>
  );
}
