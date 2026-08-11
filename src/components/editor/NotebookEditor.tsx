"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Code, Type, Trash2 } from "lucide-react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { registerMonacoThemes } from "@/lib/editor/themes";

interface NotebookEditorProps {
  content: string;
  theme: string;
  onChange: (newContent: string) => void;
  onRunCell: (code: string, index: number) => Promise<{ stdout: string; stderr: string; plots?: string[] } | void>;
}

interface NotebookCell {
  cell_type: "code" | "markdown";
  source: string[];
}

interface Notebook {
  cells: NotebookCell[];
}

export function NotebookEditor({ content, theme, onChange, onRunCell }: NotebookEditorProps) {
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [cellOutputs, setCellOutputs] = useState<Record<number, { stdout: string; stderr: string; plots?: string[] }>>({});
  const [runningCell, setRunningCell] = useState<number | null>(null);
  const [editingMarkdown, setEditingMarkdown] = useState<number | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.cells)) {
        setNotebook(parsed);
      } else {
        setNotebook({ cells: [] });
      }
    } catch (e) {
      setNotebook({ cells: [{ cell_type: "markdown", source: ["# Invalid Notebook Format\n", "The file content could not be parsed as a valid Jupyter Notebook."] }] });
    }
  }, [content]);

  const updateNotebook = useCallback((newNb: Notebook) => {
    setNotebook(newNb);
    onChange(JSON.stringify(newNb, null, 2));
  }, [onChange]);

  const updateCell = (index: number, newSource: string) => {
    if (!notebook) return;
    const newCells = [...notebook.cells];
    newCells[index] = { ...newCells[index], source: newSource.split('\n').map((l, i, arr) => i === arr.length - 1 ? l : l + '\n') };
    updateNotebook({ ...notebook, cells: newCells });
  };

  const addCell = (index: number, type: "code" | "markdown") => {
    if (!notebook) return;
    const newCells = [...notebook.cells];
    newCells.splice(index + 1, 0, { cell_type: type, source: [""] });
    updateNotebook({ ...notebook, cells: newCells });
  };

  const deleteCell = (index: number) => {
    if (!notebook) return;
    const newCells = notebook.cells.filter((_, i) => i !== index);
    updateNotebook({ ...notebook, cells: newCells });
    setCellOutputs((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const handleRun = async (code: string, index: number) => {
    setRunningCell(index);
    setCellOutputs((prev) => ({ ...prev, [index]: { stdout: "", stderr: "" } }));
    const result = await onRunCell(code, index);
    if (result) {
      setCellOutputs((prev) => ({ ...prev, [index]: result }));
    }
    setRunningCell(null);
  };

  if (!notebook) return <div className="p-4 text-white">Loading Notebook...</div>;

  return (
    <div className="absolute inset-0 overflow-y-auto bg-[var(--vscode-bg)] p-4 font-sans text-sm">
      <div className="max-w-4xl mx-auto space-y-4">
        {notebook.cells.length === 0 && (
          <div className="flex justify-center gap-2">
            <button onClick={() => addCell(-1, "code")} className="px-3 py-1.5 bg-[var(--vscode-accent)] text-white rounded hover:bg-[#005999] flex items-center gap-2 text-xs">
              <Code className="w-3.5 h-3.5" /> Add Code
            </button>
            <button onClick={() => addCell(-1, "markdown")} className="px-3 py-1.5 bg-[var(--vscode-hover)] text-white rounded hover:bg-[#444444] flex items-center gap-2 text-xs">
              <Type className="w-3.5 h-3.5" /> Add Markdown
            </button>
          </div>
        )}
        
        {notebook.cells.map((cell, index) => {
          const sourceText = Array.isArray(cell.source) ? cell.source.join("") : cell.source;
          const isEditing = editingMarkdown === index;
          
          return (
            <div key={index} className="group relative border border-transparent hover:border-[var(--vscode-input)] focus-within:border-[var(--vscode-accent)] rounded-sm transition-colors py-1">
              
              <div className="flex gap-4">
                {/* Cell Execution Count / Label */}
                <div className="w-16 shrink-0 text-right pt-2 text-xs font-mono text-[var(--vscode-text-muted)]">
                  {cell.cell_type === "code" ? (
                    runningCell === index ? (
                      <span className="text-[#4CAF50] animate-pulse">[*]</span>
                    ) : (
                      `[${index + 1}]`
                    )
                  ) : null}
                </div>
                
                {/* Cell Content Area */}
                <div className="flex-1 min-w-0 bg-transparent border border-[var(--vscode-input)] rounded relative">
                  
                  {/* Floating Action Bar */}
                  <div className="absolute -top-3 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-input)] rounded shadow-lg p-1 z-10">
                    {cell.cell_type === "code" && (
                      <button disabled={runningCell === index} onClick={() => handleRun(sourceText, index)} className="p-1 hover:bg-[var(--vscode-hover)] text-[var(--vscode-text-muted)] hover:text-[#4CAF50] rounded disabled:opacity-50" title="Run Cell">
                        <Play className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {cell.cell_type === "markdown" && !isEditing && (
                      <button onClick={() => setEditingMarkdown(index)} className="p-1 hover:bg-[var(--vscode-hover)] text-[var(--vscode-text-muted)] hover:text-white rounded" title="Edit Markdown">
                        <Type className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button onClick={() => deleteCell(index)} className="p-1 hover:bg-[var(--vscode-hover)] text-[var(--vscode-text-muted)] hover:text-[#f44336] rounded" title="Delete Cell">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  {/* Editor / Rendered Content */}
                  <div className="p-1">
                    {cell.cell_type === "code" ? (
                      <div className="h-[120px] rounded overflow-hidden">
                        <Editor
                          language="python"
                          theme={theme}
                          value={sourceText}
                          beforeMount={(m) => registerMonacoThemes(m)}
                          onChange={(v) => updateCell(index, v || "")}
                          options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            lineNumbers: "off",
                            overviewRulerBorder: false,
                            scrollbar: { vertical: "hidden", horizontal: "hidden" },
                            padding: { top: 8, bottom: 8 },
                          }}
                        />
                      </div>
                    ) : (
                      isEditing ? (
                        <textarea
                          autoFocus
                          value={sourceText}
                          onChange={(e) => updateCell(index, e.target.value)}
                          onBlur={() => setEditingMarkdown(null)}
                          className="w-full bg-[var(--vscode-bg)] text-[var(--vscode-text)] p-3 rounded focus:outline-none resize-y min-h-[100px] font-mono text-sm border border-[var(--vscode-accent)]"
                          placeholder="Type markdown here..."
                        />
                      ) : (
                        <div 
                          className="prose prose-invert max-w-none p-3 cursor-pointer min-h-[40px] hover:bg-[#2a2d2e] rounded"
                          onDoubleClick={() => setEditingMarkdown(index)}
                          title="Double-click to edit"
                        >
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {sourceText || "*Double-click to edit markdown*"}
                          </ReactMarkdown>
                        </div>
                      )
                    )}
                  </div>
                  
                  {/* Output area */}
                  {cell.cell_type === "code" && cellOutputs[index] && (
                    <div className="border-t border-[var(--vscode-input)] bg-[var(--vscode-bg)] p-2 overflow-x-auto text-xs font-mono rounded-b">
                      {cellOutputs[index].stdout && (
                        <pre className="text-[var(--vscode-text)] whitespace-pre-wrap m-0">{cellOutputs[index].stdout}</pre>
                      )}
                      {cellOutputs[index].stderr && (
                        <pre className="text-red-400 whitespace-pre-wrap m-0">{cellOutputs[index].stderr}</pre>
                      )}
                      {cellOutputs[index].plots && cellOutputs[index].plots!.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2">
                          {cellOutputs[index].plots!.map((src, i) => (
                            <img key={i} src={`data:image/png;base64,${src}`} className="bg-white rounded border border-[var(--vscode-border)] max-w-full h-auto self-start" alt={`Plot ${i+1}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                </div>
              </div>
              
              {/* Add Cell Below Actions (visible on hover or focus) */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-20 bg-[var(--vscode-sidebar-bg)] p-1 rounded-full border border-[var(--vscode-input)] shadow-md">
                <button onClick={() => addCell(index, "code")} className="p-1.5 hover:bg-[var(--vscode-hover)] rounded-full text-[var(--vscode-text)]" title="Add Code Below">
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => addCell(index, "markdown")} className="p-1.5 hover:bg-[var(--vscode-hover)] rounded-full text-[var(--vscode-text)]" title="Add Markdown Below">
                  <Type className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
