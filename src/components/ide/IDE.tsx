"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { 
  Boxes, FolderTree, ImageIcon, Play, Square, Settings, 
  HelpCircle, History, GraduationCap, X, ChevronRight, 
  Search, GitBranch, PlaySquare, LayoutPanelLeft,
  Settings2, PanelBottom, Trash2, RotateCcw,
  Library, Files, SearchCode, Package, UserCircle, Copy,
  CircleCheck, CircleX, BookOpen, ArrowRight
} from "lucide-react";
import { useProject, usePythonRuntime } from "@/hooks/usePythonProject";
import { pathOf } from "@/lib/filesystem/tree";
import { terminalStore } from "@/lib/terminal/store";
import {
  downloadProject,
  downloadText,
  readFileAsText,
} from "@/lib/download";
import {
  DEFAULT_SETTINGS,
  type IdeSettings,
} from "@/lib/settings";
import { getKV, setKV } from "@/lib/storage/idb";
import type { PyNode } from "@/types/filesystem";

import { CodeEditor, type CursorPosition } from "@/components/editor/CodeEditor";
import { NotebookEditor } from "@/components/editor/NotebookEditor";
import { EditorTabs } from "@/components/tabs/EditorTabs";
import { FileExplorer } from "@/components/explorer/FileExplorer";
import { Terminal } from "@/components/terminal/Terminal";
import { StatusBar } from "@/components/status-bar/StatusBar";
import { PackageManager } from "@/components/package-manager/PackageManager";
import {
  FatalModal,
  HistoryModal,
  HelpModal,
  LoadingCard,
  QuickOpenModal,
  RuntimeModal,
} from "@/components/ide/Overlays";
import { PracticeSidebar } from "@/components/ide/PracticePanel";
import { WorkspaceManager } from "@/components/ide/WorkspaceManager";
import { SettingsEditor } from "@/components/ide/SettingsEditor";
import { ToastContainer, toast } from "@/components/ide/ToastContainer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export type PanelKind = "settings" | "runtime" | "help" | "quickopen" | "history" | "practice";

interface IDEProps {
  workspaces?: { id: string; name: string }[];
  currentWorkspaceId?: string;
  onSwitchWorkspace?: (id: string) => void;
  onCreateWorkspace?: (name: string) => void;
}

export function IDE({
  workspaces = [],
  currentWorkspaceId = "default",
  onSwitchWorkspace = () => {},
  onCreateWorkspace = () => {}
}: IDEProps) {
  const isDesktop = useIsDesktop();
  const [settings, setSettings] = useState<IdeSettings>(DEFAULT_SETTINGS);
  const [cursor, setCursor] = useState<CursorPosition>({
    lineNumber: 1,
    column: 1,
  });
  const [panel, setPanel] = useState<PanelKind | null>(null);
  
  // VS Code Layout state
  const [activeActivity, setActiveActivity] = useState<string>("explorer");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activityBarVisible, setActivityBarVisible] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);
  const [panelTab, setPanelTab] = useState<"problems" | "output" | "debug" | "terminal" | "plots" | "tests">("terminal");
  
  const [termHeight, setTermHeight] = useState(260);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [splitRatio, setSplitRatio] = useState(50);
  const [mdPreview, setMdPreview] = useState<Record<string, boolean>>({});
  const [fatalDismissed, setFatalDismissed] = useState(false);

  // Settings tab overrides
  const [settingsTabOpen, setSettingsTabOpen] = useState(false);
  const [activeTabOverride, setActiveTabOverride] = useState<string | null>(null);

  // Split view state
  const [isSplit, setIsSplit] = useState(false);
  const [splitActiveId, setSplitActiveId] = useState<string | null>(null);
  const [splitOpenTabs, setSplitOpenTabs] = useState<string[]>([]);

  // Practice state
  const practiceSubmitRef = useRef<((code: string) => Promise<void>) | null>(null);
  const practiceJudgeRef = useRef<((stdout: string) => void) | null>(null);
  const practiceSkipRef = useRef<(() => void) | null>(null);
  const [practiceActive, setPracticeActive] = useState(false);
  const [practiceHasTests, setPracticeHasTests] = useState(false);
  const [practiceCanSkip, setPracticeCanSkip] = useState(false);
  const [practiceResults, setPracticeResults] = useState<{ passed: boolean; actual: string; expected: string }[] | null>(null);

  const project = useProject();
  const splitActiveFile = project.nodes.find(n => n.id === splitActiveId);
  const runtime = usePythonRuntime({
    onNewFiles: project.ingestRuntimeFiles,
    onRunSuccess: (stdout) => {
      // Interactive auto-judge feature
      if (activeActivity === "practice" && practiceActive && practiceJudgeRef.current) {
        practiceJudgeRef.current(stdout);
      }
    },
    clearOnRun: settings.clearOnRun,
    timeoutMs: settings.timeoutMs,
  });

  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [termHeightLoaded, setTermHeightLoaded] = useState(false);
  const [activeActivityLoaded, setActiveActivityLoaded] = useState(false);
  const [splitLoaded, setSplitLoaded] = useState(false);
  const [sidebarWidthLoaded, setSidebarWidthLoaded] = useState(false);

  // load / persist settings and state
  useEffect(() => {
    getKV<IdeSettings>("settings").then((s) => {
      if (s) setSettings({ ...DEFAULT_SETTINGS, ...s });
      setSettingsLoaded(true);
    });
    getKV<number>("termHeight").then((h) => {
      if (h) setTermHeight(h);
      setTermHeightLoaded(true);
    });
    getKV<number>("sidebarWidth").then((w) => {
      if (w) setSidebarWidth(w);
      setSidebarWidthLoaded(true);
    });
    getKV<string>("activeActivity").then((a) => {
      if (a) setActiveActivity(a);
      setActiveActivityLoaded(true);
    });
    Promise.all([
      getKV<number>("splitRatio"),
      getKV<boolean>("isSplit"),
      getKV<string>("splitActiveId"),
      getKV<string[]>("splitOpenTabs"),
      getKV<Record<string, boolean>>("mdPreview")
    ]).then(([ratio, split, activeId, tabs, md]) => {
      if (ratio) setSplitRatio(ratio);
      if (split !== undefined) setIsSplit(split);
      if (activeId) setSplitActiveId(activeId);
      if (tabs) setSplitOpenTabs(tabs);
      if (md) setMdPreview(md);
      setSplitLoaded(true);
    });
  }, []);
  
  useEffect(() => {
    if (settingsLoaded) setKV("settings", settings);
  }, [settings, settingsLoaded]);
  
  useEffect(() => {
    if (termHeightLoaded) setKV("termHeight", termHeight);
  }, [termHeight, termHeightLoaded]);

  useEffect(() => {
    if (activeActivityLoaded) setKV("activeActivity", activeActivity);
  }, [activeActivity, activeActivityLoaded]);

  useEffect(() => {
    if (!splitLoaded) return;
    setKV("splitRatio", splitRatio);
    setKV("isSplit", isSplit);
    setKV("splitActiveId", splitActiveId);
    setKV("splitOpenTabs", splitOpenTabs);
    setKV("mdPreview", mdPreview);
  }, [splitRatio, isSplit, splitActiveId, splitOpenTabs, mdPreview, splitLoaded]);

  useEffect(() => {
    if (sidebarWidthLoaded) setKV("sidebarWidth", sidebarWidth);
  }, [sidebarWidth, sidebarWidthLoaded]);

  const updateSettings = useCallback((partial: Partial<IdeSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const buildFiles = useCallback(
    () =>
      project.nodes
        .filter((n) => n.kind === "file")
        .map((n) => ({
          path: pathOf(project.nodes, n.id),
          content: n.content ?? "",
        })),
    [project.nodes],
  );

  const handleRun = useCallback(() => {
    const f = project.activeFile;
    if (!f) return;
    if (f.name.endsWith(".ipynb")) {
      terminalStore.system("Use the play buttons on individual cells to run notebook code.");
      setPanelOpen(true);
      setPanelTab("terminal");
      return;
    }
    project.saveActive();
    setPanelOpen(true);
    setPanelTab("terminal");
    runtime.run(f.content ?? "", pathOf(project.nodes, f.id), buildFiles());
  }, [project, runtime, buildFiles]);

  // Auto-switch to plots tab if new plots arrive
  useEffect(() => {
    if (runtime.plots.length > 0) {
      setPanelOpen(true);
      setPanelTab("plots");
    }
  }, [runtime.plots]);

  const handleSelectTab = useCallback((id: string) => {
    if (id === "settings") {
      setActiveTabOverride("settings");
    } else {
      setActiveTabOverride(null);
      project.openFile(id);
      // If we're split and clicked a tab, maybe update split? 
      // For a simple UX, left pane uses activeId, right uses splitActiveId.
    }
  }, [project]);

  const handleCloseTab = useCallback((id: string) => {
    if (id === "settings") {
      setSettingsTabOpen(false);
      if (activeTabOverride === "settings") setActiveTabOverride(null);
    } else {
      project.closeTab(id);
    }
  }, [project, activeTabOverride]);

  const handleSave = useCallback(() => {
    project.saveActive();
    toast.info("File saved successfully");
  }, [project]);
  
  const handleClear = useCallback(() => {
    terminalStore.clear();
    toast.info("Terminal cleared");
  }, []);
  const handleCopyTerminal = useCallback(() => {
    const text = terminalStore.getSnapshot().lines.map(line => line.segments.map(seg => seg.text).join("")).join("\n");
    navigator.clipboard.writeText(text);
    toast.info("Terminal output copied to clipboard");
  }, []);
  const handleDownloadFile = useCallback((node: PyNode) => {
    downloadText(node.name, node.content ?? "");
  }, []);
  const handleDownloadProject = useCallback(() => {
    downloadProject(buildFiles());
  }, [buildFiles]);
  const handleUpload = useCallback(
    async (files: FileList) => {
      for (const file of Array.from(files)) {
        const text = await readFileAsText(file);
        project.createByPath(file.name, text);
      }
    },
    [project],
  );

  const handleDropItems = useCallback(async (items: DataTransferItemList) => {
    const processEntry = (entry: any, pathPrefix = "") => {
      if (entry.isFile) {
        entry.file(async (file: File) => {
          const text = await file.text();
          project.createByPath(pathPrefix + file.name, text);
        });
      } else if (entry.isDirectory) {
        const dirReader = entry.createReader();
        dirReader.readEntries((entries: any[]) => {
          entries.forEach((e) => processEntry(e, pathPrefix + entry.name + "/"));
        });
      }
    };
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
        const entry = item.webkitGetAsEntry();
        if (entry) processEntry(entry);
      }
    }
  }, [project]);

  // terminal resize drag (desktop)
  const dragging = useRef(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const main = document.getElementById("ide-main");
      if (!main) return;
      const rect = main.getBoundingClientRect();
      const fromBottom = rect.bottom - e.clientY;
      setTermHeight(Math.max(100, Math.min(rect.height - 50, fromBottom)));
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // split pane resize drag
  const splitDragging = useRef(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!splitDragging.current) return;
      const main = document.getElementById("ide-main");
      if (!main) return;
      const rect = main.getBoundingClientRect();
      const newRatio = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.max(10, Math.min(90, newRatio)));
    };
    const onUp = () => {
      splitDragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // sidebar resize drag
  const sidebarDragging = useRef(false);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sidebarDragging.current) return;
      const offset = activityBarVisible ? 48 : 0; // w-12 is 48px
      setSidebarWidth(Math.max(150, Math.min(800, e.clientX - offset)));
    };
    const onUp = () => {
      sidebarDragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [activityBarVisible]);

  return (
    <div data-theme={settings.theme} className="flex h-full flex-col overflow-hidden bg-[var(--vscode-bg)] text-[var(--vscode-text)] font-sans">
      <div className="flex min-h-0 flex-1">
        
        {/* Activity Bar (VS Code left-most bar) */}
        {activityBarVisible && (
          <div className="w-12 shrink-0 bg-[var(--vscode-hover)] flex flex-col items-center py-2 z-10 border-r border-[var(--vscode-border)]">
            <div className="flex flex-col gap-1 w-full">
              <ActivityIcon 
                icon={<Boxes className="h-6 w-6" strokeWidth={1.25} />} 
                active={activeActivity === "workspaces" && sidebarOpen}
                onClick={() => {
                  if (activeActivity === "workspaces") setSidebarOpen(!sidebarOpen);
                  else { setActiveActivity("workspaces"); setSidebarOpen(true); }
                }}
                title="Workspaces"
              />
              <ActivityIcon 
              icon={<Files className="h-6 w-6" strokeWidth={1.25} />} 
              active={activeActivity === "explorer" && sidebarOpen}
              onClick={() => {
                if (activeActivity === "explorer") setSidebarOpen(!sidebarOpen);
                else { setActiveActivity("explorer"); setSidebarOpen(true); }
              }}
              title="Explorer (Ctrl+Shift+E)"
            />
            <ActivityIcon 
              icon={<Search className="h-6 w-6" strokeWidth={1.25} />} 
              active={activeActivity === "search" && sidebarOpen}
              onClick={() => {
                // Future search implementation
              }}
              title="Search (Ctrl+Shift+F)"
            />

            <ActivityIcon 
              icon={<Package className="h-6 w-6" strokeWidth={1.25} />} 
              active={activeActivity === "extensions" && sidebarOpen}
              onClick={() => {
                if (activeActivity === "extensions") setSidebarOpen(!sidebarOpen);
                else { setActiveActivity("extensions"); setSidebarOpen(true); }
              }}
              title="Packages"
            />
            <ActivityIcon 
              icon={<GraduationCap className="h-6 w-6" strokeWidth={1.25} />} 
              active={activeActivity === "practice" && sidebarOpen}
              onClick={() => {
                if (activeActivity === "practice") setSidebarOpen(!sidebarOpen);
                else { setActiveActivity("practice"); setSidebarOpen(true); }
              }}
              title="Practice & Learn"
            />
          </div>
          
          <div className="mt-auto flex flex-col gap-1 mb-2 w-full">
            <ActivityIcon 
              icon={<UserCircle className="h-[24px] w-[24px]" strokeWidth={1.25} />} 
              onClick={() => {}}
              title="Accounts"
            />
            <ActivityIcon 
              icon={<Settings className="h-[24px] w-[24px]" strokeWidth={1.25} />} 
              onClick={() => {
                setSettingsTabOpen(true);
                setActiveTabOverride("settings");
              }}
              title="Manage Settings"
            />
          </div>
        </div>
        )}

        {/* Side Bar */}
        {sidebarOpen && (
          <aside 
            className="shrink-0 flex flex-col border-r border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)] relative"
            style={{ width: sidebarWidth }}
          >
            {/* Resizer Handle */}
            <div
              onMouseDown={() => {
                sidebarDragging.current = true;
                document.body.style.cursor = "col-resize";
              }}
              className="absolute right-[-2px] top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-[var(--vscode-accent)] z-20 transition-colors"
            />
            
            {activeActivity !== "practice" && (
              <div className="h-[35px] flex items-center px-5 text-[11px] uppercase tracking-wider text-[var(--vscode-text)] font-medium shrink-0">
                {activeActivity === "extensions" ? "Packages" : activeActivity === "workspaces" ? "Workspaces" : activeActivity}
              </div>
            )}
            <div className="flex-1 min-h-0">
              {activeActivity === "explorer" && (
                <FileExplorer
                  tree={project.tree}
                  nodes={project.nodes}
                  activeId={project.activeId}
                  onOpen={project.openFile}
                  onCreate={project.createNode}
                  onRename={project.renameNode}
                  onDelete={project.deleteNodes}
                  onDuplicate={project.duplicateNodes}
                  onMove={project.moveNodes}
                  onDownload={handleDownloadFile}
                  onDownloadProject={handleDownloadProject}
                  onUpload={handleUpload}
                  onDropItems={handleDropItems}
                  onReset={project.resetToExamples}
                />
              )}
              {activeActivity === "extensions" && (
                <PackageManager
                  installed={runtime.installed}
                  installing={runtime.status === "installing" ? runtime.installMsg : null}
                  onInstall={runtime.install}
                />
              )}
              {activeActivity === "workspaces" && (
                <WorkspaceManager
                  workspaces={workspaces}
                  currentWorkspaceId={currentWorkspaceId}
                  onSwitchWorkspace={onSwitchWorkspace}
                  onCreateWorkspace={onCreateWorkspace}
                />
              )}
              {activeActivity === "practice" && (
                <PracticeSidebar
                  runTest={runtime.runTest}
                  activeFileContent={project.activeFile?.content || ""}
                  onPracticeStateChange={(state) => {
                    practiceSubmitRef.current = state.submitFn;
                    practiceJudgeRef.current = state.judgeStdoutFn;
                    practiceSkipRef.current = state.skipFn;
                    setPracticeActive(state.isActive);
                    setPracticeHasTests(state.hasTests);
                    setPracticeCanSkip(state.canSkip);
                  }}
                  onTestResults={(results) => {
                    setPracticeResults(results);
                  }}
                  onCreateFile={(name, content) => {
                    const path = `.practice/${name}`;
                    project.createByPath(path, content);
                    
                    // We need to wait for project state to update, or manually open it if we can
                    // Since createByPath generates the node, we can just let the user see it in Explorer
                    // But opening it right away is better.
                    setTimeout(() => {
                      // Small hack to open the newly created file
                      const newNode = project.tree.find(c => c.name === ".practice")?.children?.find(c => c.name === name);
                      if (newNode) project.openFile(newNode.id);
                    }, 50);
                  }}
                />
              )}
              {activeActivity !== "explorer" && activeActivity !== "extensions" && activeActivity !== "workspaces" && activeActivity !== "practice" && (
                <div className="p-5 text-xs text-[var(--vscode-text-muted)]">
                  Not implemented in this view.
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main column */}
        <main id="ide-main" className="min-w-0 flex-1 flex-col flex bg-[var(--vscode-bg)]">
          
          {/* Editor Group */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            <div className="flex-1 min-h-0 relative flex">
              
              {/* LEFT PANE */}
              <div className={`min-w-0 relative flex flex-col ${isSplit ? "border-r border-[var(--vscode-border)]" : ""}`} style={{ flex: isSplit ? "none" : 1, width: isSplit ? `${splitRatio}%` : "100%" }}>
                <div className="flex items-center bg-[var(--vscode-sidebar-bg)] shrink-0 pr-3">
                  <EditorTabs
                    tabs={[
                      ...project.openTabFiles,
                      ...(settingsTabOpen ? [{ id: "settings", name: "Settings", kind: "file", parentId: null, createdAt: 0, updatedAt: 0 } as any] : [])
                    ]}
                    activeId={activeTabOverride || project.activeId}
                    dirty={project.dirty}
                    onSelect={handleSelectTab}
                    onClose={handleCloseTab}
                    onReorder={project.reorderTab}
                    onDropFile={(id) => project.openFile(id)}
                  />
                  {!isSplit && (
                    <div className="ml-auto flex items-center gap-2">
                      {project.activeFile?.name.endsWith('.md') && (
                        <button
                          onClick={() => {
                            setIsSplit(true);
                            if (project.activeId && !splitOpenTabs.includes(project.activeId)) {
                              setSplitOpenTabs(prev => [...prev, project.activeId!]);
                            }
                            setSplitActiveId(project.activeId);
                            setMdPreview(prev => ({ ...prev, [project.activeId!]: true }));
                          }}
                          className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]"
                          title="Open Preview to the Side"
                        >
                          <BookOpen className="h-4 w-4" />
                        </button>
                      )}
                      {project.activeFile?.name.endsWith('.md') && (
                        <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      )}
                      <button
                        onClick={() => {
                          setIsSplit(true);
                          if (project.activeId) {
                            if (!splitOpenTabs.includes(project.activeId)) {

                              setSplitOpenTabs(prev => [...prev, project.activeId!]);
                            }
                            setSplitActiveId(project.activeId);
                          }
                        }}
                        className={`p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]`}
                        title="Split Editor Right"
                      >
                        <LayoutPanelLeft className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      <button onClick={() => setPanelOpen(!panelOpen)} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]" title="Toggle Panel">
                        <PanelBottom className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      {activeActivity === "practice" && practiceActive && (
                        <>
                          <button 
                            onClick={() => {
                              if (!practiceHasTests) return;
                              if (practiceSubmitRef.current) practiceSubmitRef.current(project.activeFile?.content || "");
                              if (!panelOpen) setPanelOpen(true);
                              setPanelTab("tests");
                            }} 
                            disabled={!practiceHasTests}
                            className={`p-1 rounded font-semibold text-xs flex items-center gap-1 ${practiceHasTests ? 'hover:bg-[var(--vscode-hover)] text-emerald-400' : 'opacity-40 text-[var(--vscode-text-muted)] cursor-not-allowed'}`} 
                            title={practiceHasTests ? "Submit Practice Code" : "No Tests Available"}
                          >
                            <CircleCheck className="h-4 w-4" /> {practiceHasTests ? "Submit" : "No Tests"}
                          </button>
                          <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                        </>
                      )}
                      {runtime.running ? (
                        <button onClick={runtime.stop} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-rose-400" title="Stop Execution">
                          <Square className="h-4 w-4 fill-current" />
                        </button>
                      ) : (
                        <button onClick={handleRun} disabled={!runtime.ready} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed" title="Run Python File">
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-h-0 relative">
                  {activeTabOverride === "settings" ? (
                    <SettingsEditor settings={settings} onChange={updateSettings} />
                  ) : project.activeFile ? (
                    project.activeFile.name.endsWith(".ipynb") ? (
                      <NotebookEditor
                        content={project.activeFile.content ?? ""}
                        theme={settings.theme}
                        onChange={(content) => project.updateContent(project.activeFile!.id, content)}
                        onRunCell={async (code, index) => {
                          terminalStore.system(`▶ Running cell ${index + 1}...`);
                          return await runtime.runTest(code, "", 15000);
                        }}
                      />
                    ) : project.activeFile.name.endsWith(".md") && mdPreview[project.activeId!] && !isSplit ? (
                      <div className="h-full overflow-y-auto bg-[var(--vscode-bg)] p-8">
                        <div className="prose prose-invert prose-sm max-w-none text-[var(--vscode-text)]">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.activeFile.content ?? ""}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <CodeEditor
                        file={project.activeFile}
                        onChange={project.updateContent}
                        onRun={handleRun}
                        onSave={handleSave}
                        onQuickOpen={() => setPanel("quickopen")}
                        onCursorChange={setCursor}
                        theme={settings.theme}
                        fontSize={settings.fontSize}
                        tabSize={settings.tabSize}
                        minimap={settings.minimap}
                        wordWrap={settings.wordWrap}
                        paneId="left"
                      />
                    )
                  ) : null}
                </div>
              </div>

              {/* Split Pane Resizer */}
              {isSplit && (
                <div
                  onMouseDown={() => {
                    splitDragging.current = true;
                    document.body.style.cursor = "col-resize";
                  }}
                  className="w-1 cursor-col-resize hover:bg-[var(--vscode-accent)] z-10 transition-colors"
                />
              )}

              {/* RIGHT PANE */}
              {isSplit && (
                <div className="flex-1 min-w-0 relative flex flex-col bg-[var(--vscode-bg)]">
                  <div className="flex items-center bg-[var(--vscode-sidebar-bg)] shrink-0 pr-3">
                    <EditorTabs
                      tabs={project.nodes.filter(n => splitOpenTabs.includes(n.id))}
                      activeId={splitActiveId}
                      dirty={project.dirty}
                      onSelect={(id) => setSplitActiveId(id)}
                      onClose={(id) => {
                        const newTabs = splitOpenTabs.filter(t => t !== id);
                        setSplitOpenTabs(newTabs);
                        if (newTabs.length === 0) {
                          setIsSplit(false);
                          setSplitActiveId(null);
                        } else if (id === splitActiveId) {
                          setSplitActiveId(newTabs[newTabs.length - 1]);
                        }
                      }}
                      onReorder={(id, insertBeforeId) => {
                        const newTabs = [...splitOpenTabs];
                        const idx = newTabs.indexOf(id);
                        if (idx !== -1) newTabs.splice(idx, 1);
                        if (insertBeforeId) {
                          const insertIdx = newTabs.indexOf(insertBeforeId);
                          newTabs.splice(insertIdx, 0, id);
                        } else {
                          newTabs.push(id);
                        }
                        setSplitOpenTabs(newTabs);
                      }}
                      onDropFile={(id) => {
                        if (!splitOpenTabs.includes(id)) setSplitOpenTabs([...splitOpenTabs, id]);
                        setSplitActiveId(id);
                      }}
                    />
                    <div className="ml-auto flex items-center gap-2">
                      {splitActiveFile?.name.endsWith('.md') && (
                        <button
                          onClick={() => setMdPreview(prev => ({ ...prev, [splitActiveFile.id]: !prev[splitActiveFile.id] }))}
                          className={`p-1 hover:bg-[var(--vscode-hover)] rounded ${mdPreview[splitActiveFile.id] ? 'text-[var(--vscode-accent)]' : 'text-[var(--vscode-text)]'}`}
                          title="Toggle Preview"
                        >
                          <BookOpen className="h-4 w-4" />
                        </button>
                      )}
                      {splitActiveFile?.name.endsWith('.md') && (
                        <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      )}
                      <button
                        onClick={() => setIsSplit(false)}
                        className={`p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-accent)]`}
                        title="Close Split Editor"
                      >
                        <LayoutPanelLeft className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      <button onClick={() => setPanelOpen(!panelOpen)} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]" title="Toggle Panel">
                        <PanelBottom className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      {activeActivity === "practice" && practiceActive && (
                        <>
                          {practiceCanSkip && (
                            <button
                              onClick={() => {
                                if (practiceSkipRef.current) practiceSkipRef.current();
                              }}
                              className="p-1 rounded font-semibold text-xs flex items-center gap-1 hover:bg-[var(--vscode-hover)] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
                              title="Skip Question"
                            >
                              <ArrowRight className="h-4 w-4" /> Skip
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              if (!practiceHasTests) return;
                              if (practiceSubmitRef.current) practiceSubmitRef.current(splitActiveFile?.content || "");
                              if (!panelOpen) setPanelOpen(true);
                              setPanelTab("tests");
                            }} 
                            disabled={!practiceHasTests}
                            className={`p-1 rounded font-semibold text-xs flex items-center gap-1 ${practiceHasTests ? 'hover:bg-[var(--vscode-hover)] text-emerald-400' : 'opacity-40 text-[var(--vscode-text-muted)] cursor-not-allowed'}`} 
                            title={practiceHasTests ? "Submit Practice Code" : "No Tests Available"}
                          >
                            <CircleCheck className="h-4 w-4" /> {practiceHasTests ? "Submit" : "No Tests"}
                          </button>
                          <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                        </>
                      )}
                      {runtime.running ? (
                        <button onClick={runtime.stop} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-rose-400" title="Stop Execution">
                          <Square className="h-4 w-4 fill-current" />
                        </button>
                      ) : (
                        <button onClick={handleRun} disabled={!runtime.ready} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed" title="Run Python File">
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-h-0 relative">
                    {(() => {
                      const sf = project.nodes.find(n => n.id === splitActiveId);
                      if (!sf) return <div className="p-4 text-[var(--vscode-text-muted)] text-sm">Select a file to display.</div>;
                      if (sf.name.endsWith(".ipynb")) {
                        return (
                          <NotebookEditor
                            content={sf.content ?? ""}
                            theme={settings.theme}
                            onChange={(content) => project.updateContent(sf.id, content)}
                            onRunCell={async (code, index) => {
                              terminalStore.system(`▶ Running cell ${index + 1}...`);
                              return await runtime.runTest(code, "", 15000);
                            }}
                          />
                        );
                      }
                      if (sf.name.endsWith(".md")) {
                        return (
                          <div className="h-full overflow-y-auto bg-[var(--vscode-bg)] p-8">
                            <div className="prose prose-invert prose-sm max-w-none text-[var(--vscode-text)]">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{sf.content ?? ""}</ReactMarkdown>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <CodeEditor
                          file={sf}
                          onChange={project.updateContent}
                          onRun={() => {}}
                          onSave={handleSave}
                          onQuickOpen={() => setPanel("quickopen")}
                          onCursorChange={() => {}}
                          theme={settings.theme}
                          fontSize={settings.fontSize}
                          tabSize={settings.tabSize}
                          minimap={settings.minimap}
                          wordWrap={settings.wordWrap}
                          paneId="right"
                        />
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resizer */}
          {panelOpen && (
            <div
              onMouseDown={() => {
                dragging.current = true;
                document.body.style.cursor = "row-resize";
              }}
              className="h-1 shrink-0 cursor-row-resize bg-[var(--vscode-border)] hover:bg-[var(--vscode-accent)] transition-colors"
            />
          )}

          {/* Terminal / Panel */}
          {panelOpen && (
            <div
              className="flex min-h-0 flex-col bg-[#050505]"
              style={{ height: termHeight }}
            >
              {/* Panel Tabs */}
              <div className="flex items-center h-[35px] px-4 gap-6 text-[11px] uppercase tracking-wider text-[var(--vscode-text)] font-medium">
                <PanelTab label="TERMINAL" active={panelTab === "terminal"} onClick={() => setPanelTab("terminal")} />
                <PanelTab label="PLOTS" active={panelTab === "plots"} onClick={() => setPanelTab("plots")} />
                {activeActivity === "practice" && (
                  <PanelTab label="TESTS" active={panelTab === "tests"} onClick={() => setPanelTab("tests")} />
                )}
                
                <div className="ml-auto flex items-center gap-2">
                  <button onClick={runtime.restart} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]" title="Restart Python Runtime">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  {panelTab === "terminal" && (
                    <button onClick={handleCopyTerminal} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]" title="Copy Output">
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                  <button onClick={handleClear} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]" title="Clear Terminal">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => setPanelOpen(false)} className="p-1 hover:bg-[var(--vscode-hover)] rounded text-[var(--vscode-text)]" title="Close Panel">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 min-h-0">
                {panelTab === "terminal" ? (
                  <Terminal onInput={runtime.sendInput} onClear={handleClear} />
                ) : panelTab === "plots" ? (
                  <div className="flex h-full items-center gap-4 overflow-x-auto p-4 bg-[#050505]">
                    {runtime.plots.length > 0 ? (
                      runtime.plots.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Plot ${i + 1}`}
                          className="h-full w-auto rounded border border-[var(--vscode-border)] bg-white object-contain"
                        />
                      ))
                    ) : (
                      <div className="w-full text-center text-[var(--vscode-text-muted)] text-xs">No plots available.</div>
                    )}
                  </div>
                ) : panelTab === "tests" ? (
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {practiceResults ? (
                      practiceResults.map((r, i) => (
                        <div key={i} className="rounded border border-[var(--vscode-border)] bg-[var(--vscode-hover)] p-3 text-xs">
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[var(--vscode-border)]">
                            {r.passed ? <CircleCheck className="h-4 w-4 text-emerald-400" /> : <CircleX className="h-4 w-4 text-rose-400" />}
                            <span className="font-medium text-[var(--vscode-text)] text-sm">Test Case {i + 1} {r.passed ? "(Passed)" : "(Failed)"}</span>
                          </div>
                          {!r.passed && (
                            <div className="flex flex-col md:flex-row gap-4 mt-2">
                              <div className="flex-1">
                                <div className="text-[10px] font-semibold text-[var(--vscode-text-muted)] uppercase tracking-wider mb-1">Expected Output:</div>
                                <pre className="p-2 rounded bg-black/30 border border-emerald-900/30 text-emerald-200/90 whitespace-pre-wrap font-mono text-[11px]">{r.expected}</pre>
                              </div>
                              <div className="flex-1">
                                <div className="text-[10px] font-semibold text-[var(--vscode-text-muted)] uppercase tracking-wider mb-1">Your Output:</div>
                                <pre className="p-2 rounded bg-black/30 border border-rose-900/30 text-rose-200/90 whitespace-pre-wrap font-mono text-[11px]">{r.actual || "(no output)"}</pre>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-xs text-[var(--vscode-text-muted)] text-center mt-10">Run 'Submit' in the editor to see test results here.</div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-xs text-[var(--vscode-text-muted)]">No {panelTab.toLowerCase()} to display.</div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <StatusBar
        status={runtime.status}
        runtime={runtime.runtime}
        lastDuration={runtime.lastDuration}
        cursor={cursor}
        tabSize={settings.tabSize}
        activityBarVisible={activityBarVisible}
        onToggleActivityBar={() => setActivityBarVisible((prev) => !prev)}
      />

      {/* Overlays */}
      {runtime.status === "loading" && (
        <LoadingCard
          message={runtime.loadingMsg}
          progress={runtime.loadingProgress}
        />
      )}
      {runtime.fatalError && !fatalDismissed && (
        <FatalModal
          error={runtime.fatalError}
          onRetry={() => {
            setFatalDismissed(true);
            runtime.restart();
          }}
          onClose={() => setFatalDismissed(true)}
        />
      )}



      {panel === "runtime" && (
        <RuntimeModal
          runtime={runtime.runtime}
          status={runtime.status}
          onRestart={() => {
            runtime.restart();
            setPanel(null);
          }}
          runTest={runtime.runTest}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === "help" && <HelpModal onClose={() => setPanel(null)} />}
      {panel === "quickopen" && (
        <QuickOpenModal
          files={project.nodes}
          onOpen={project.openFile}
          onClose={() => setPanel(null)}
        />
      )}
      {panel === "history" && (
        <HistoryModal history={runtime.history} onClose={() => setPanel(null)} />
      )}
      <ToastContainer />
    </div>
  );
}

function ActivityIcon({ icon, active, onClick, title }: any) {
  return (
    <button 
      title={title} 
      onClick={onClick} 
      className={`relative flex items-center justify-center h-12 w-full ${active ? 'text-[var(--vscode-text)]' : 'text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]'}`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--vscode-accent)]" />}
      {icon}
    </button>
  );
}

function PanelTab({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`h-full flex items-center border-b-[1px] px-1 ${active ? 'border-sky-500 text-[#e7e7e7]' : 'border-transparent text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]'}`}
    >
      {label}
    </button>
  );
}
