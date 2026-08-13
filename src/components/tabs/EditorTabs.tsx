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
  iconStyle: string;
}

function getFileIcon(ext: string, className: string, style: string) {
  if (style === "minimal") {
    if (ext === "py") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
        </svg>
      );
    }
    if (ext === "json") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12.043 23.968c.479-.004.953-.029 1.426-.094a11.805 11.805 0 003.146-.863 12.404 12.404 0 003.793-2.542 11.977 11.977 0 002.44-3.427 11.794 11.794 0 001.02-3.476c.149-1.16.135-2.346-.045-3.499a11.96 11.96 0 00-.793-2.788 11.197 11.197 0 00-.854-1.617c-1.168-1.837-2.861-3.314-4.81-4.3a12.835 12.835 0 00-2.172-.87h-.005c.119.063.24.132.345.201.12.074.239.146.351.225a8.93 8.93 0 011.559 1.33c1.063 1.145 1.797 2.548 2.218 4.041.284.982.434 1.998.495 3.017.044.743.044 1.491-.047 2.229-.149 1.27-.554 2.51-1.228 3.596a7.475 7.475 0 01-1.903 2.084c-1.244.928-2.877 1.482-4.436 1.114a3.916 3.916 0 01-.748-.258 4.692 4.692 0 01-.779-.45 6.08 6.08 0 01-1.244-1.105 6.507 6.507 0 01-1.049-1.747 7.366 7.366 0 01-.494-2.54c-.03-1.273.225-2.553.854-3.67a6.43 6.43 0 011.663-1.918c.225-.178.464-.333.704-.479l.016-.007a5.121 5.121 0 00-1.441-.12 4.963 4.963 0 00-1.228.24c-.359.12-.704.27-1.019.45a6.146 6.146 0 00-.733.494c-.211.18-.42.36-.615.555-1.123 1.153-1.768 2.682-2.022 4.256-.15.973-.15 1.96-.091 2.95.105 1.395.391 2.787.945 4.062a8.518 8.518 0 001.348 2.173 8.14 8.14 0 003.132 2.23 7.934 7.934 0 002.113.54c.074.015.149.015.209.015zm-2.934-.398a4.102 4.102 0 01-.45-.228 8.5 8.5 0 01-2.038-1.534c-1.094-1.137-1.827-2.566-2.247-4.08a15.184 15.184 0 01-.495-3.172 12.14 12.14 0 01.046-2.082c.135-1.257.495-2.501 1.124-3.58a6.889 6.889 0 011.783-2.053 6.23 6.23 0 011.633-.9 5.363 5.363 0 013.522-.045c.029 0 .029 0 .045.03.015.015.045.015.06.03.045.016.104.045.165.074.239.12.479.271.704.42a6.294 6.294 0 012.097 2.502c.42.914.615 1.934.631 2.938.014 1.079-.18 2.157-.645 3.146a6.42 6.42 0 01-2.638 2.832c.09.03.18.045.271.075.225.044.449.074.688.074 1.468.045 2.892-.66 3.94-1.647.195-.18.375-.375.54-.585.225-.27.435-.54.614-.823.239-.375.435-.75.614-1.154a8.112 8.112 0 00.509-1.664c.196-1.004.211-2.022.149-3.026-.135-2.022-.673-4.045-1.842-5.724a9.054 9.054 0 00-.555-.719 9.868 9.868 0 00-1.063-1.034 8.477 8.477 0 00-1.363-.915 9.927 9.927 0 00-1.692-.598l-.3-.06c-.209-.03-.42-.044-.634-.06a8.453 8.453 0 00-1.015.016c-.704.045-1.412.16-2.112.337C5.799 1.227 2.863 3.566 1.3 6.67A11.834 11.834 0 00.238 9.801a11.81 11.81 0 00-.104 3.775c.12 1.02.374 2.023.778 2.977.227.57.511 1.124.825 1.648 1.094 1.783 2.683 3.236 4.51 4.24.688.39 1.408.69 2.157.944.226.074.45.15.689.21z"/>
        </svg>
      );
    }
    if (ext === "md" || ext === "txt") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z"/>
        </svg>
      );
    }
    if (ext === "ipynb") {
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M7.157 22.201A1.784 1.799 0 0 1 5.374 24a1.784 1.799 0 0 1-1.784-1.799 1.784 1.799 0 0 1 1.784-1.799 1.784 1.799 0 0 1 1.783 1.799zM20.582 1.427a1.415 1.427 0 0 1-1.415 1.428 1.415 1.427 0 0 1-1.416-1.428A1.415 1.427 0 0 1 19.167 0a1.415 1.427 0 0 1 1.415 1.427zM4.992 3.336A1.047 1.056 0 0 1 3.946 4.39a1.047 1.056 0 0 1-1.047-1.055A1.047 1.056 0 0 1 3.946 2.28a1.047 1.056 0 0 1 1.046 1.056zm7.336 1.517c3.769 0 7.06 1.38 8.768 3.424a9.363 9.363 0 0 0-3.393-4.547 9.238 9.238 0 0 0-5.377-1.728A9.238 9.238 0 0 0 6.95 3.73a9.363 9.363 0 0 0-3.394 4.547c1.713-2.04 5.004-3.424 8.772-3.424zm.001 13.295c-3.768 0-7.06-1.381-8.768-3.425a9.363 9.363 0 0 0 3.394 4.547A9.238 9.238 0 0 0 12.33 21a9.238 9.238 0 0 0 5.377-1.729 9.363 9.363 0 0 0 3.393-4.547c-1.712 2.044-5.003 3.425-8.772 3.425Z"/>
        </svg>
      );
    }
    return <FileCode2 className={className} />;
  }

  // Use VS Code specific logic here if style === "vscode", or fallback to lucide icons
  if (style === "vscode") {
    if (ext === "py") {
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <path fill="#3776AB" d="M64.6 0c-35 0-30.5 15.2-30.5 15.2l-.1 15.7h30.6v4.8H31.5s-31.5-2.5-31.5 28 27.5 28.3 27.5 28.3h6.6v-16s-1.3-21.5 20-21.5h31s19.6-1 19.6-21.2-21.3-23.3-21.3-23.3H64.6zM51.7 9.3c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2z"/>
          <path fill="#FFD43B" d="M64.4 128c35 0 30.5-15.2 30.5-15.2l.1-15.7H64.4v-4.8h33.1s31.5 2.5 31.5-28-27.5-28.3-27.5-28.3h-6.6v16s1.3 21.5-20 21.5h-31s-19.6 1-19.6 21.2 21.3 23.3 21.3 23.3H64.4zM77.3 118.7c-3.4 0-6.2-2.8-6.2-6.2 0-3.4 2.8-6.2 6.2-6.2 3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2z"/>
        </svg>
      );
    }
  }

  // Default lucide icons
  if (ext === "json") return <FileJson className={className} />;
  if (ext === "csv") return <FileSpreadsheet className={className} />;
  if (ext === "md" || ext === "txt") return <FileText className={className} />;
  if (ext === "ipynb") return <Book className={className} />;
  if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext)) return <FileImage className={className} />;
  
  if (ext === "py") {
    return <FileCode2 className={`${className} text-[#3776AB]`} />;
  }

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
  iconStyle,
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
              getFileIcon(ext, "h-4 w-4 shrink-0", iconStyle)
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
