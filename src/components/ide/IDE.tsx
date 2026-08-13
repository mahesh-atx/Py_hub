"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  LayoutPanelLeft,
  PanelBottom,
  Play,
  Settings,
  Square,
} from "lucide-react";
import { useProject, usePythonRuntime } from "@/hooks/usePythonProject";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { pathOf, resolveRelativePath } from "@/lib/filesystem/tree";
import { terminalSnapshotText, terminalStore } from "@/lib/terminal/store";
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
import { BottomPanel, type BottomPanelTab } from "@/components/ide/BottomPanel";
import { WorkspaceManager } from "@/components/ide/WorkspaceManager";
import { SettingsEditor } from "@/components/ide/SettingsEditor";
import { ToastContainer, toast } from "@/components/ide/ToastContainer";
import { ActivityBar } from "@/components/ide/ActivityBar";
import {
  MobileNavigation,
  type MobileIdeView,
} from "@/components/ide/MobileNavigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export type PanelKind = "settings" | "runtime" | "help" | "quickopen" | "history" | "practice";

interface IDEProps {
  workspaces?: { id: string; name: string }[];
  currentWorkspaceId?: string;
  onSwitchWorkspace?: (id: string) => void;
  onCreateWorkspace?: (name: string) => void;
  onDeleteWorkspace?: (id: string) => void;
  onRenameWorkspace?: (id: string, name: string) => void;
}

export function IDE({
  workspaces = [],
  currentWorkspaceId = "default",
  onSwitchWorkspace = () => {},
  onCreateWorkspace = () => {},
  onDeleteWorkspace = () => {},
  onRenameWorkspace = () => {}
}: IDEProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const [settings, setSettings] = useState<IdeSettings>(DEFAULT_SETTINGS);
  const [leftCursor, setLeftCursor] = useState<CursorPosition>({
    lineNumber: 1,
    column: 1,
  });
  const [rightCursor, setRightCursor] = useState<CursorPosition>({
    lineNumber: 1,
    column: 1,
  });
  const [focusedPane, setFocusedPane] = useState<"left" | "right">("left");
  const [panel, setPanel] = useState<PanelKind | null>(null);

  // VS Code Layout state
  const [activeActivity, setActiveActivity] = useState<string>("explorer");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activityBarVisible, setActivityBarVisible] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);
  const [mobileView, setMobileView] = useState<MobileIdeView>("editor");
  const [panelTab, setPanelTab] = useState<BottomPanelTab>("terminal");
  const [seenPlotCount, setSeenPlotCount] = useState(0);

  const [termHeight, setTermHeight] = useState(260);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [splitRatio, setSplitRatio] = useState(50);
  const [mdPreviewLeft, setMdPreviewLeft] = useState<Record<string, boolean>>({});
  const [mdPreviewRight, setMdPreviewRight] = useState<Record<string, boolean>>({});
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
  const runtime = usePythonRuntime({
    onFilesystemChanges: project.applyRuntimeFilesystemChanges,
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
      getKV<Record<string, boolean>>("mdPreviewLeft"),
      getKV<Record<string, boolean>>("mdPreviewRight")
    ]).then(([ratio, split, activeId, tabs, mdL, mdR]) => {
      if (ratio !== undefined) setSplitRatio(ratio);
      if (split !== undefined) setIsSplit(split);
      if (activeId !== undefined) setSplitActiveId(activeId);
      if (tabs !== undefined) setSplitOpenTabs(tabs);
      if (mdL) setMdPreviewLeft(mdL);
      if (mdR) setMdPreviewRight(mdR);
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
    setKV("mdPreviewLeft", mdPreviewLeft);
    setKV("mdPreviewRight", mdPreviewRight);
  }, [splitRatio, isSplit, splitActiveId, splitOpenTabs, mdPreviewLeft, mdPreviewRight, splitLoaded]);

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

  const buildDirectories = useCallback(
    () =>
      project.nodes
        .filter((node) => node.kind === "folder")
        .map((node) => pathOf(project.nodes, node.id)),
    [project.nodes],
  );

  const isPracticeNode = useCallback((id: string) => {
    return pathOf(project.nodes, id).startsWith(".practice/");
  }, [project.nodes]);
  const isLearningNode = useCallback((id: string) => {
    const path = pathOf(project.nodes, id);
    return path.startsWith(".practice/") || path.startsWith(".course/");
  }, [project.nodes]);

  const visibleTabs = project.openTabFiles;

  const allVisibleTabs = [
    ...visibleTabs,
    ...(settingsTabOpen ? [{ id: "settings", name: "Settings", kind: "file", parentId: null, createdAt: 0, updatedAt: 0 } as any] : [])
  ];

  const effectiveActiveFile = activeTabOverride === "settings"
      ? null
      : (visibleTabs.find(t => t.id === project.activeId) || visibleTabs[visibleTabs.length - 1] || null);

  const effectiveActiveId = activeTabOverride || effectiveActiveFile?.id || null;

  const visibleSplitTabs = project.nodes
    .filter((node) => splitOpenTabs.includes(node.id));

  const effectiveSplitActiveFile = visibleSplitTabs.find(t => t.id === splitActiveId) || visibleSplitTabs[visibleSplitTabs.length - 1] || null;
  const effectiveSplitActiveId = effectiveSplitActiveFile?.id || null;

  const runFile = useCallback((file: PyNode | null | undefined) => {
    if (!file) return;
    if (!isDesktop) setMobileView("terminal");
    if (file.name.endsWith(".ipynb")) {
      terminalStore.system("Use the play buttons on individual cells to run notebook code.");
      setPanelOpen(true);
      setPanelTab("terminal");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".py")) {
      terminalStore.system(`Only Python files can run directly (${file.name}).`);
      setPanelOpen(true);
      setPanelTab("terminal");
      return;
    }
    project.save(file.id);
    setPanelOpen(true);
    setPanelTab("terminal");
    runtime.run(
      file.content ?? "",
      pathOf(project.nodes, file.id),
      buildFiles(),
      buildDirectories(),
    );
  }, [project, runtime, buildFiles, buildDirectories, isDesktop]);

  // Auto-switch once when a new plot arrives. Tracking the observed count is
  // essential: switching whenever plots exist would trap users on this tab and
  // make Terminal/Tests impossible to reopen until the next execution.
  if (runtime.plots.length !== seenPlotCount) {
    const hasNewPlot = runtime.plots.length > seenPlotCount;
    setSeenPlotCount(runtime.plots.length);
    if (hasNewPlot) {
      if (!panelOpen) setPanelOpen(true);
      if (panelTab !== "plots") setPanelTab("plots");
    }
  }

  // Auto-open practice sandbox when entering practice mode with no open practice tabs
  useEffect(() => {
    if (activeActivity === "practice" && visibleTabs.length === 0) {
      const practicePyId = project.nodes.find(n => pathOf(project.nodes, n.id) === ".practice/practice.py")?.id;
      if (practicePyId) {
        project.openFile(practicePyId);
      }
    }
  }, [activeActivity, visibleTabs.length, project]);

  const handleSelectTab = useCallback((id: string) => {
    setFocusedPane("left");
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

  const handleSaveFile = useCallback((fileId?: string | null) => {
    if (!fileId) return;
    project.save(fileId);
    toast.info("File saved successfully");
  }, [project]);

  const handleClear = useCallback(() => {
    terminalStore.clear();
    toast.info("Terminal cleared");
  }, []);
  const handleCopyTerminal = useCallback(() => {
    void navigator.clipboard.writeText(
      terminalSnapshotText(terminalStore.getSnapshot()),
    );
    toast.info("Terminal output copied to clipboard");
  }, []);
  const handleDownloadTerminal = useCallback(() => {
    downloadText(
      `pylab-terminal-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`,
      terminalSnapshotText(terminalStore.getSnapshot()),
    );
    toast.info("Terminal output downloaded");
  }, []);
  const handleDownloadFile = useCallback((node: PyNode) => {
    downloadText(node.name, node.content ?? "");
  }, []);
  const handleDownloadProject = useCallback(() => {
    downloadProject(buildFiles());
  }, [buildFiles]);

  const markdownDirectory = useCallback((file: PyNode): string => {
    const virtualPath = pathOf(project.nodes, file.id);
    if (virtualPath === ".course/README.md") return "/practice-data";
    const match = virtualPath.match(/^\.course\/([^/]+)\/(.+)$/);
    if (!match) return "";
    const relativeDirectory = match[2].split("/").slice(0, -1).join("/");
    return `/practice-data/${match[1]}${relativeDirectory ? `/${relativeDirectory}` : ""}`;
  }, [project.nodes]);

  const openMarkdownLink = useCallback(async (source: PyNode, href: string) => {
    const resolved = resolveRelativePath(pathOf(project.nodes, source.id), href);
    if (!resolved?.startsWith(".course/") || !resolved.endsWith(".md")) return;

    const relativeCoursePath = resolved.slice(".course/".length);
    const parts = relativeCoursePath.split("/");
    const batchId = parts.length > 1 ? parts.shift()! : "";
    const relativeFile = parts.join("/") || relativeCoursePath;
    const publicUrl = batchId
      ? `/practice-data/${batchId}/${relativeFile}`
      : `/practice-data/${relativeFile}`;
    try {
      const response = await fetch(publicUrl);
      if (!response.ok) {
        toast.warn(`Course page not found: ${relativeFile}`);
        return;
      }
      project.createByPath(resolved!, await response.text());
      const anchor = href.split("#")[1];
      if (anchor) {
        setTimeout(() => document.getElementById(decodeURIComponent(anchor))?.scrollIntoView(), 100);
      }
    } catch {
      toast.error(`Could not open course page: ${relativeFile}`);
    }
  }, [project]);
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

  const showBottomPanel = isDesktop ? panelOpen : mobileView === "terminal";
  const splitVisible = isSplit && isDesktop;

  return (
    <div data-theme={settings.theme} className="flex h-full flex-col overflow-hidden bg-[var(--vscode-bg)] text-[var(--vscode-text)] font-sans">
      {!isDesktop && (
        <MobileNavigation
          view={mobileView}
          activity={activeActivity}
          onView={setMobileView}
          onActivity={(activity) => {
            setActiveActivity(activity);
            setSidebarOpen(true);
          }}
        />
      )}
      <div className="flex min-h-0 flex-1">

        {/* Activity Bar (VS Code left-most bar) */}
        {activityBarVisible && isDesktop && (
          <ActivityBar
            activity={activeActivity}
            sidebarOpen={sidebarOpen}
            onToggleCurrent={() => setSidebarOpen((open) => !open)}
            onSelect={(activity) => {
              setActiveActivity(activity);
              setSidebarOpen(true);
            }}
            onOpenSettings={() => {
              setSettingsTabOpen(true);
              setActiveTabOverride("settings");
            }}
          />
        )}

        {/* Side Bar */}
        {sidebarOpen && (isDesktop || mobileView === "sidebar") && (
          <aside
            className="shrink-0 flex flex-col border-r border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)] relative"
            style={{ width: isDesktop ? sidebarWidth : "100%" }}
          >
            {/* Resizer Handle */}
            {isDesktop && <div
              onMouseDown={() => {
                sidebarDragging.current = true;
                document.body.style.cursor = "col-resize";
              }}
              className="absolute right-[-2px] top-0 bottom-0 w-[4px] cursor-col-resize hover:bg-[var(--vscode-accent)] z-20 transition-colors"
            />}

            {activeActivity !== "practice" && (
              <div className="flex h-[35px] shrink-0 items-center px-4 text-[11px] font-medium uppercase tracking-wider text-[var(--vscode-text)]">
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
                  bundled={runtime.bundledPackages}
                  installing={runtime.status === "installing" ? runtime.installMsg : null}
                  failures={runtime.packageFailures}
                  onInstall={runtime.install}
                />
              )}
              {activeActivity === "workspaces" && (
                <WorkspaceManager
                  workspaces={workspaces}
                  currentWorkspaceId={currentWorkspaceId}
                  onSwitchWorkspace={onSwitchWorkspace}
                  onCreateWorkspace={onCreateWorkspace}
                  onDeleteWorkspace={onDeleteWorkspace}
                  onRenameWorkspace={onRenameWorkspace}
                />
              )}
              {activeActivity === "practice" && (
                <PracticeSidebar
                  runTest={runtime.runTest}
                  activeFilePath={project.activeFile ? pathOf(project.nodes, project.activeFile.id) : ""}
                  workspaceFiles={buildFiles()}
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
                  onOpenOrCreateFile={(path, content) => {
                    const existingNode = project.nodes.find(n => pathOf(project.nodes, n.id) === path);
                    if (existingNode && existingNode.kind === 'file') {
                      project.openFile(existingNode.id);
                    } else {
                      project.createByPath(path, content);
                    }
                  }}
                  onSeedFiles={async (relativePaths: string[], batchId: string, batchTitle: string) => {
                    const existingPaths = new Set(project.nodes.map(n => pathOf(project.nodes, n.id)));
                    const created: string[] = [];
                    for (const rel of relativePaths) {
                      const target = `.practice/${batchTitle}/${rel}`;
                      if (existingPaths.has(target)) continue;
                      try {
                        const res = await fetch(`/practice-data/${batchId}/${rel}`);
                        if (!res.ok) continue;
                        const text = await res.text();
                        project.createByPath(target, text, false);
                        created.push(rel);
                      } catch {}
                    }
                    return created;
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
        {(isDesktop || mobileView !== "sidebar") && <main id="ide-main" className="min-w-0 flex-1 flex-col flex bg-[var(--vscode-bg)]">

          {/* Editor Group */}
          <div className={`flex-1 flex-col min-h-0 relative ${!isDesktop && mobileView === "terminal" ? "hidden" : "flex"}`}>
            <div className="flex-1 min-h-0 relative flex">

              {/* LEFT PANE */}
              <div className={`min-w-0 relative flex flex-col ${splitVisible ? "border-r border-[var(--vscode-border)]" : ""}`} style={{ flex: splitVisible ? "none" : 1, width: splitVisible ? `${splitRatio}%` : "100%" }}>
                <div className="flex items-center bg-[var(--vscode-sidebar-bg)] shrink-0 pr-3">
                  <EditorTabs
                    tabs={allVisibleTabs}
                    activeId={effectiveActiveId}
                    dirty={project.dirty}
                    onSelect={handleSelectTab}
                    onClose={handleCloseTab}
                    onReorder={project.reorderTab}
                    onDropFile={(id) => project.openFile(id)}
                    onDropPracticeFile={async (batchId, fileId, isPractice) => {
                        const url = `/practice-data/${batchId}/${fileId}`;
                        try {
                          const res = await fetch(url);
                          if (res.ok) {
                            const text = await res.text();
                            project.createByPath(`.course/${batchId}/${fileId}`, text);
                          }
                        } catch {}
                    }}
                  />
                  {!splitVisible && (
                    <div className="ml-auto flex items-center gap-2">
                      {project.activeFile?.name.endsWith('.md') && (
                        <>
                          <button
                            onClick={() => setMdPreviewLeft(prev => ({ ...prev, [project.activeId!]: prev[project.activeId!] === false ? true : false }))}
                            className={`flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] ${mdPreviewLeft[project.activeId!] !== false ? 'text-[var(--vscode-accent)]' : 'text-[var(--vscode-text)]'}`}
                            title="Toggle Preview"
                          >
                            <BookOpen className="h-4 w-4" />
                          </button>
                          <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                        </>
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
                        className={`flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-[var(--vscode-text)]`}
                        title="Split Editor Right"
                      >
                        <LayoutPanelLeft className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      <button onClick={() => setPanelOpen(!panelOpen)} className="flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-[var(--vscode-text)]" title="Toggle Panel">
                        <PanelBottom className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      {activeActivity === "practice" && practiceActive && (
                        <>
                          <button
                            onClick={() => {
                              if (!practiceHasTests) return;
                              if (practiceSubmitRef.current) practiceSubmitRef.current(effectiveActiveFile?.content || "");
                              if (!panelOpen) setPanelOpen(true);
                              setPanelTab("tests");
                            }}
                            disabled={!practiceHasTests}
                            className={`min-h-9 rounded px-2 py-1 font-semibold text-xs flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] ${practiceHasTests ? 'hover:bg-[var(--vscode-hover)] text-emerald-400' : 'opacity-40 text-[var(--vscode-text-muted)] cursor-not-allowed'}`}
                            title={practiceHasTests ? "Submit Practice Code" : "No Tests Available"}
                          >
                            <CircleCheck className="h-4 w-4" /> {practiceHasTests ? "Submit" : "No Tests"}
                          </button>
                          <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                        </>
                      )}
                      {runtime.running ? (
                        <button onClick={runtime.stop} className="flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-rose-400" title="Stop Execution">
                          <Square className="h-4 w-4 fill-current" />
                        </button>
                      ) : (
                        <button onClick={() => { setFocusedPane("left"); runFile(effectiveActiveFile); }} disabled={!runtime.ready} className="flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed" title="Run left editor file">
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-h-0 relative">
                  {activeTabOverride === "settings" ? (
                    <SettingsEditor settings={settings} onChange={updateSettings} />
                  ) : effectiveActiveFile ? (
                    effectiveActiveFile.name.endsWith(".ipynb") ? (
                      <NotebookEditor
                        content={effectiveActiveFile.content ?? ""}
                        theme={settings.theme}
                        onChange={(content) => project.updateContent(effectiveActiveFile.id, content)}
                        onRunCell={async (code, index) => {
                          terminalStore.system(`▶ Running cell ${index + 1}...`);
                          return await runtime.runTest(code, "", 15000, false);
                        }}
                      />
                    ) : effectiveActiveFile.name.endsWith(".md") && mdPreviewLeft[effectiveActiveFile.id] !== false ? (
                      <div className="h-full overflow-y-auto bg-[var(--vscode-bg)] p-8">
                        <div className="text-[var(--vscode-text)]">
                          <MarkdownRenderer
                            content={effectiveActiveFile.content ?? ""}
                            fileId={effectiveActiveFile.id}
                            dirPath={markdownDirectory(effectiveActiveFile)}
                            onNavigateLink={(href) => void openMarkdownLink(effectiveActiveFile, href)}
                          />
                        </div>
                      </div>
                    ) : (
                      <CodeEditor
                        file={effectiveActiveFile}
                        onChange={project.updateContent}
                        onRun={() => { setFocusedPane("left"); runFile(effectiveActiveFile); }}
                        onSave={() => handleSaveFile(effectiveActiveFile.id)}
                        onQuickOpen={() => setPanel("quickopen")}
                        onCursorChange={(position) => {
                          setFocusedPane("left");
                          setLeftCursor(position);
                        }}
                        theme={settings.theme}
                        fontSize={settings.fontSize}
                        tabSize={settings.tabSize}
                        minimap={settings.minimap}
                        wordWrap={settings.wordWrap}
                        paneId="left"
                        readOnly={pathOf(project.nodes, effectiveActiveFile.id).startsWith('.course/')}
                      />
                    )
                  ) : null}
                </div>
              </div>

              {/* Split Pane Resizer */}
              {splitVisible && (
                <div
                  onMouseDown={() => {
                    splitDragging.current = true;
                    document.body.style.cursor = "col-resize";
                  }}
                  className="w-1 cursor-col-resize hover:bg-[var(--vscode-accent)] z-10 transition-colors"
                />
              )}

              {/* RIGHT PANE */}
              {splitVisible && (
                <div className="flex-1 min-w-0 relative flex flex-col bg-[var(--vscode-bg)]">
                  <div className="flex items-center bg-[var(--vscode-sidebar-bg)] shrink-0 pr-3">
                    <EditorTabs
                      tabs={visibleSplitTabs}
                      activeId={effectiveSplitActiveId}
                      dirty={project.dirty}
                      onSelect={(id) => {
                        setFocusedPane("right");
                        setSplitActiveId(id);
                      }}
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
                      onDropPracticeFile={async (batchId, fileId, isPractice) => {
                        const url = `/practice-data/${batchId}/${fileId}`;
                        try {
                          const res = await fetch(url);
                          if (res.ok) {
                            const text = await res.text();
                            // for split view, we need the node id to add it to tabs
                            // createPath returns the created node ID if we await it?
                            // Wait, createPath is async? Let's check.
                            // Actually just project.createByPath works, and then we might need to find its ID.
                            // The easiest way is to just let it open in the main pane if they drag it to the split pane,
                            // or create it and then set it.
                            project.createByPath(`.course/${batchId}/${fileId}`, text);
                          }
                        } catch {}
                      }}
                    />
                    <div className="ml-auto flex items-center gap-2">
                      {effectiveSplitActiveFile?.name.endsWith('.md') && (
                        <button
                          onClick={() => setMdPreviewRight(prev => ({ ...prev, [effectiveSplitActiveFile.id]: prev[effectiveSplitActiveFile.id] === false ? true : false }))}
                          className={`flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] ${mdPreviewRight[effectiveSplitActiveFile.id] !== false ? 'text-[var(--vscode-accent)]' : 'text-[var(--vscode-text)]'}`}
                          title="Toggle Preview"
                        >
                          <BookOpen className="h-4 w-4" />
                        </button>
                      )}
                      {effectiveSplitActiveFile?.name.endsWith('.md') && (
                        <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      )}
                      <button
                        onClick={() => setIsSplit(false)}
                        className={`flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-[var(--vscode-accent)]`}
                        title="Close Split Editor"
                      >
                        <LayoutPanelLeft className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                      <button onClick={() => setPanelOpen(!panelOpen)} className="flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-[var(--vscode-text)]" title="Toggle Panel">
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
                              className="min-h-9 rounded px-2 py-1 font-semibold text-xs flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] hover:bg-[var(--vscode-hover)] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
                              title="Skip Question"
                            >
                              <ArrowRight className="h-4 w-4" /> Skip
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (!practiceHasTests) return;
                              if (practiceSubmitRef.current) practiceSubmitRef.current(effectiveSplitActiveFile?.content || "");
                              if (!panelOpen) setPanelOpen(true);
                              setPanelTab("tests");
                            }}
                            disabled={!practiceHasTests}
                            className={`min-h-9 rounded px-2 py-1 font-semibold text-xs flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] ${practiceHasTests ? 'hover:bg-[var(--vscode-hover)] text-emerald-400' : 'opacity-40 text-[var(--vscode-text-muted)] cursor-not-allowed'}`}
                            title={practiceHasTests ? "Submit Practice Code" : "No Tests Available"}
                          >
                            <CircleCheck className="h-4 w-4" /> {practiceHasTests ? "Submit" : "No Tests"}
                          </button>
                          <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
                        </>
                      )}
                      {runtime.running ? (
                        <button onClick={runtime.stop} className="flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-rose-400" title="Stop Execution">
                          <Square className="h-4 w-4 fill-current" />
                        </button>
                      ) : (
                        <button onClick={() => { setFocusedPane("right"); runFile(effectiveSplitActiveFile); }} disabled={!runtime.ready} className="flex min-h-9 min-w-9 items-center justify-center rounded p-2 outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed" title="Run right editor file">
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 relative">
                    {(() => {
                      const sf = effectiveSplitActiveFile;
                      if (!sf) return <div className="p-4 text-[var(--vscode-text-muted)] text-sm">Select a file to display.</div>;
                      if (sf.name.endsWith(".ipynb")) {
                        return (
                          <NotebookEditor
                            content={sf.content ?? ""}
                            theme={settings.theme}
                            onChange={(content) => project.updateContent(sf.id, content)}
                            onRunCell={async (code, index) => {
                              terminalStore.system(`▶ Running cell ${index + 1}...`);
                              return await runtime.runTest(code, "", 15000, false);
                            }}
                          />
                        );
                      }
                      if (sf.name.endsWith(".md") && mdPreviewRight[sf.id] !== false) {
                        return (
                          <div className="h-full overflow-y-auto bg-[var(--vscode-bg)] p-8">
                            <div className="text-[var(--vscode-text)]">
                              <MarkdownRenderer
                                content={sf.content ?? ""}
                                fileId={sf.id}
                                dirPath={markdownDirectory(sf)}
                                onNavigateLink={(href) => void openMarkdownLink(sf, href)}
                              />
                            </div>
                          </div>
                        );
                      }
                      return (
                        <CodeEditor
                          file={sf}
                          onChange={project.updateContent}
                          onRun={() => { setFocusedPane("right"); runFile(sf); }}
                          onSave={() => handleSaveFile(sf.id)}
                          onQuickOpen={() => setPanel("quickopen")}
                          onCursorChange={(position) => {
                            setFocusedPane("right");
                            setRightCursor(position);
                          }}
                          theme={settings.theme}
                          fontSize={settings.fontSize}
                          tabSize={settings.tabSize}
                          minimap={settings.minimap}
                          wordWrap={settings.wordWrap}
                          paneId="right"
                          readOnly={pathOf(project.nodes, sf.id).startsWith('.course/')}
                        />
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <BottomPanel
            visible={showBottomPanel}
            isDesktop={isDesktop}
            height={termHeight}
            tab={panelTab}
            practiceActive={activeActivity === "practice"}
            waitingInput={runtime.waitingInput}
            plots={runtime.plots}
            results={practiceResults}
            onTab={setPanelTab}
            onResizeStart={() => {
              dragging.current = true;
              document.body.style.cursor = "row-resize";
            }}
            onRestart={runtime.restart}
            onCopy={handleCopyTerminal}
            onDownload={handleDownloadTerminal}
            onClear={handleClear}
            onClose={() => (isDesktop ? setPanelOpen(false) : setMobileView("editor"))}
            onInput={runtime.sendInput}
            onInterrupt={runtime.stop}
          />
        </main>}
      </div>

      <StatusBar
        status={runtime.status}
        runtime={runtime.runtime}
        lastDuration={runtime.lastDuration}
        cursor={focusedPane === "right" ? rightCursor : leftCursor}
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
