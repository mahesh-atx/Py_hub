"use client";

import { X, FileCode2, Settings, FileJson, FileText, FileImage, FileSpreadsheet, Book } from "lucide-react";
import type { PyNode } from "@/types/filesystem";
import { getExtension } from "@/lib/filesystem/tree";

interface EditorTabsProps {
  tabs: PyNode[];
  activeId: string | null;
  dirty: Set<string>;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onReorder?: (id: string, insertBeforeId: string | null) => void;
  onDropFile?: (id: string) => void;
  onDropPracticeFile?: (batchId: string, fileId: string, isPractice: boolean) => void;
}

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

export function EditorTabs({
  tabs,
  activeId,
  dirty,
  onSelect,
  onClose,
  onReorder,
  onDropFile,
  onDropPracticeFile,
}: EditorTabsProps) {
  if (!tabs.length) {
    return (
      <div 
        className="flex h-[35px] items-center bg-[var(--vscode-sidebar-bg)] px-3 text-[13px] text-[var(--vscode-text-muted)] flex-1"
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => {
          e.preventDefault();
          const practiceData = e.dataTransfer.getData("application/x-practice-file");
          if (practiceData && onDropPracticeFile) {
            try {
              const { batchId, fileId, isPractice } = JSON.parse(practiceData);
              onDropPracticeFile(batchId, fileId, isPractice);
              return;
            } catch {}
          }
          const nodeIds = e.dataTransfer.getData("application/vnd.ide.nodes");
          if (nodeIds && onDropFile) {
            try {
              const ids = JSON.parse(nodeIds);
              if (ids.length > 0) onDropFile(ids[0]);
            } catch {}
          }
        }}
      >
        {/* Empty space in tab bar */}
      </div>
    );
  }
  return (
    <div 
      className="flex h-[35px] items-stretch overflow-x-auto bg-[var(--vscode-sidebar-bg)] flex-1 scrollbar-hide relative shadow-[0_4px_15px_rgba(0,0,0,0.2)] z-10"
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => {
        e.preventDefault();
        const draggedTabId = e.dataTransfer.getData("application/vnd.ide.tab");
        if (draggedTabId && onReorder) {
          onReorder(draggedTabId, null);
          return;
        }
        const nodeIds = e.dataTransfer.getData("application/vnd.ide.nodes");
        if (nodeIds && onDropFile) {
          try {
            const ids = JSON.parse(nodeIds);
            if (ids.length > 0) onDropFile(ids[0]);
          } catch {}
        }
      }}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        const isDirty = dirty.has(tab.id);
        const ext = getExtension(tab.name);
        return (
          <div
            key={tab.id}
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              e.dataTransfer.setData("application/vnd.ide.tab", tab.id);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const draggedTabId = e.dataTransfer.getData("application/vnd.ide.tab");
              if (draggedTabId && draggedTabId !== tab.id && onReorder) {
                onReorder(draggedTabId, tab.id);
                return;
              }
              const practiceData = e.dataTransfer.getData("application/x-practice-file");
          if (practiceData && onDropPracticeFile) {
            try {
              const { batchId, fileId, isPractice } = JSON.parse(practiceData);
              onDropPracticeFile(batchId, fileId, isPractice);
              return;
            } catch {}
          }
          const nodeIds = e.dataTransfer.getData("application/vnd.ide.nodes");
              if (nodeIds && onDropFile) {
                try {
                  const ids = JSON.parse(nodeIds);
                  if (ids.length > 0) onDropFile(ids[0]);
                } catch {}
              }
            }}
            onClick={() => onSelect(tab.id)}
            className={`group flex cursor-pointer items-center gap-1.5 px-3 border-r border-[var(--vscode-border)] text-[13px] relative ${
              active
                ? "bg-[var(--vscode-bg)] text-[var(--vscode-text)]"
                : "bg-transparent text-[var(--vscode-text-muted)] hover:bg-[var(--vscode-border)]"
            }`}
            title={tab.name}
          >
            {active && <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--vscode-accent)]" />}
            {tab.id === "settings" ? (
              <Settings className="h-4 w-4 text-[var(--vscode-text-muted)]" />
            ) : (
              getFileIcon(ext, "h-4 w-4")
            )}
            <span className="whitespace-nowrap px-1">{tab.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.id);
              }}
              className={`rounded p-[2px] hover:bg-[var(--vscode-hover)] ${isDirty ? "" : "text-transparent group-hover:text-[var(--vscode-text)]"} ${active ? "text-[var(--vscode-text)]" : ""}`}
              aria-label={`Close ${tab.name}`}
            >
              {isDirty ? (
                <span className="block h-2 w-2 rounded-full bg-[var(--vscode-text)] group-hover:hidden m-[3px]" />
              ) : null}
              <X
                className={`h-3.5 w-3.5 ${isDirty ? "hidden group-hover:block" : "block"}`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
