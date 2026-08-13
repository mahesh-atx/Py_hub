"use client";

import { useEffect, useRef } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import type { PyNode } from "@/types/filesystem";
import { registerMonacoThemes } from "@/lib/editor/themes";

export interface CursorPosition {
  lineNumber: number;
  column: number;
}

interface CodeEditorProps {
  file: PyNode | null;
  onChange: (id: string, value: string) => void;
  onRun: () => void;
  onSave: () => void;
  onQuickOpen: () => void;
  onCursorChange: (pos: CursorPosition) => void;
  theme: string;
  fontSize: number;
  tabSize: number;
  minimap: boolean;
  wordWrap: boolean;
  paneId?: string;
  readOnly?: boolean;
  editorFont?: string;
}

export function CodeEditor(props: CodeEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const handlers = useRef(props);

  useEffect(() => {
    handlers.current = props;
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ 
        fontSize: props.fontSize,
      });
    }
  }, [props.fontSize]);

  const handleMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    // Ctrl/Cmd + Enter -> run
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
      () => handlers.current.onRun(),
    );
    // Ctrl/Cmd + S -> save (and prevent the browser dialog)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS,
      () => handlers.current.onSave(),
    );
    // Ctrl/Cmd + P -> quick file open (override Monaco quick open)
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyP,
      () => handlers.current.onQuickOpen(),
    );

    editor.onDidChangeCursorPosition((e) => {
      handlers.current.onCursorChange({
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      });
    });
  };

  const handleBeforeMount = (monacoInstance: any) => {
    registerMonacoThemes(monacoInstance);
  };

  if (!props.file) {
    return (
      <div className="flex h-full items-center justify-center bg-[#0d1117] text-sm text-slate-600">
        <div className="text-center">
          <p className="mb-1 text-slate-400">No file open</p>
          <p className="text-xs">
            Create a new file or open one from the explorer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Editor
      key={props.file.id}
      theme={props.theme}
      language="python"
      path={props.paneId ? `${props.paneId}-${props.file.name}` : props.file.name}
      value={props.file.content ?? ""}
      onChange={(value) =>
        props.onChange(props.file!.id, value ?? "")
      }
      beforeMount={handleBeforeMount}
      onMount={handleMount}
      loading={
        <div className="flex h-full items-center justify-center text-xs text-slate-500">
          Loading editor…
        </div>
      }
      options={{
        fontSize: props.fontSize,
        tabSize: props.tabSize,
        minimap: { enabled: props.minimap },
        wordWrap: props.wordWrap ? "on" : "off",
        readOnly: props.readOnly,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "smooth",
        renderWhitespace: "selection",
        bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true, indentation: true },
        suggestOnTriggerCharacters: true,
        quickSuggestions: { other: true, comments: false, strings: true },
        padding: { top: 12, bottom: 12 },
        fontFamily: "var(--font-mono)",
        fontLigatures: true,
        stickyScroll: { enabled: true },
        scrollbar: {
          vertical: "hidden",
          horizontal: "hidden",
          handleMouseWheel: true,
        },
      }}
    />
  );
}
