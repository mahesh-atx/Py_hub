"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PyNode, TreeNode } from "@/types/filesystem";
import type {
  FsFilePayload,
  FsSyncChanges,
  RuntimeStatus,
} from "@/types/python";
import type { HistoryEntry, RunOutcome } from "@/types/execution";
import type { CapturedRun } from "@/lib/practice/types";
import { PyodideClient, type RuntimeInfo } from "@/lib/pyodide/worker-client";
import { terminalStore } from "@/lib/terminal/store";
import {
  buildTree,
  descendantIds,
  genId,
  pathOf,
  validateName,
} from "@/lib/filesystem/tree";
import { applyFilesystemChanges } from "@/lib/filesystem/sync";
import {
  bulkPutFiles,
  clearFiles,
  deleteFilePersisted,
  getKV,
  loadFiles,
  persistFile,
  setKV,
} from "@/lib/storage/idb";
import { exampleNodes } from "@/lib/examples";
import { toast } from "@/components/ide/ToastContainer";

interface RuntimeOptions {
  onFilesystemChanges?: (changes: FsSyncChanges) => void;
  onRunSuccess?: (stdout: string) => void;
  clearOnRun?: boolean;
  timeoutMs?: number;
}

export function usePythonRuntime(opts: RuntimeOptions = {}) {
  const optsRef = useRef(opts);
  useEffect(() => {
    optsRef.current = opts;
  });
  const filenameRef = useRef("main.py");
  const clientRef = useRef<PyodideClient | null>(null);
  const interactiveStdoutRef = useRef("");

  const [status, setStatus] = useState<RuntimeStatus>("loading");
  const [runtime, setRuntime] = useState<RuntimeInfo | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("Preparing Python\u2026");
  const [loadingProgress, setLoadingProgress] = useState<number | undefined>(
    undefined,
  );
  const [lastDuration, setLastDuration] = useState<number | null>(null);
  const [activity, setActivity] = useState<string | null>(null);
  const [plots, setPlots] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [installMsg, setInstallMsg] = useState<string | null>(null);
  const [installed, setInstalled] = useState<string[]>([]);
  const [bundledPackages, setBundledPackages] = useState<string[]>([]);
  const [packageFailures, setPackageFailures] = useState<Record<string, string>>({});

  const addHistory = useCallback((outcome: RunOutcome, durationMs: number) => {
    setHistory((h) =>
      [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          filename: filenameRef.current,
          outcome,
          durationMs,
          timestamp: Date.now(),
        },
        ...h,
      ].slice(0, 50),
    );
  }, []);

  useEffect(() => {
    fetch("/vendor/pyodide/bundled-packages.json")
      .then((response) => response.json())
      .then((manifest: { roots?: string[] }) => setBundledPackages(manifest.roots ?? []))
      .catch(() => setBundledPackages([]));
  }, []);

  useEffect(() => {
    const instance = new PyodideClient({
      onLoading: (message, progress) => {
        setLoadingMsg(message);
        setLoadingProgress(progress);
      },
      onReady: (info) => {
        setRuntime(info);
        setActivity(null);
        // Auto-reinstall packages from previous session
        getKV<string[]>("installedPackages").then((savedPackages) => {
          if (savedPackages && savedPackages.length > 0) {
            toast.info(`Restoring ${savedPackages.length} packages from previous session...`);
            setInstallMsg("Restoring packages...");
            instance.install(savedPackages);
          }
        });
      },
      onStatus: (s) => setStatus(s),
      onStdout: (d) => {
        interactiveStdoutRef.current += d;
        terminalStore.stdout(d);
      },
      onStderr: (d) => terminalStore.stderr(d),
      onStdinRequest: () => terminalStore.requestInput(),
      onFinished: ({ durationMs, hadError, fsChanges }) => {
        setLastDuration(durationMs);
        setActivity(null);
        if (fsChanges) optsRef.current.onFilesystemChanges?.(fsChanges);
        if (!hadError) {
          if (optsRef.current.onRunSuccess) {
            optsRef.current.onRunSuccess(interactiveStdoutRef.current);
          }
        }
        addHistory(hadError ? "error" : "success", durationMs);
      },
      onError: ({ traceback }) => {
        if (traceback) {
          const t = traceback.endsWith("\n") ? traceback : `${traceback}\n`;
          terminalStore.stderr(t);
        }
      },
      onStopped: ({ reason, durationMs, fsChanges }) => {
        setLastDuration(durationMs);
        if (fsChanges) optsRef.current.onFilesystemChanges?.(fsChanges);
        terminalStore.cancelInput();
        setActivity(reason);
        setTimeout(() => setActivity(null), 6000);
        addHistory("stopped", durationMs);
      },
      onPlot: (data) =>
        setPlots((p) => [...p, `data:image/png;base64,${data}`]),
      onInstallProgress: (m) => setInstallMsg(m),
      onInstalled: ({ packages, failures, message }) => {
        setInstallMsg(message);
        setPackageFailures((current) => {
          const next = { ...current };
          packages.forEach((name) => delete next[name]);
          failures.forEach(({ name, reason }) => {
            next[name] = reason;
          });
          return next;
        });
        setInstalled((prev) => {
          const next = Array.from(new Set([...prev, ...packages]));
          setKV("installedPackages", next);
          return next;
        });
        if (failures.length) toast.warn(message);
        else toast.info(message);
      },
      onFatal: (err) => {
        setFatalError(err);
        terminalStore.cancelInput();
        terminalStore.system(err);
      },
    });
    clientRef.current = instance;
    instance.start();
    return () => {
      clientRef.current?.dispose();
    };
  }, [addHistory]);

  const run = useCallback(
    (
      code: string,
      filename = "main.py",
      files?: FsFilePayload[],
      directories?: string[],
    ) => {
      if (status === "loading" || !clientRef.current?.isReady()) return;
      filenameRef.current = filename;
      interactiveStdoutRef.current = "";
      setPlots([]);
      setLastDuration(null);
      if (optsRef.current.clearOnRun !== false) {
        terminalStore.clear();
      }
      // Shell-style prompt that prefixes the first line of this run's output.
      terminalStore.markRunStart();
      setActivity(`Running ${filename}\u2026`);
      clientRef.current?.run(
        code,
        filename,
        files,
        directories,
        optsRef.current.timeoutMs,
      );
    },
    [status],
  );

  const stop = useCallback(() => clientRef.current?.stop(), []);
  const restart = useCallback(() => {
    setPlots([]);
    setLastDuration(null);
    terminalStore.cancelInput();
    setActivity("Restarting Python runtime\u2026");
    clientRef.current?.restart();
  }, []);
  const install = useCallback((packages: string[]) => {
    setPackageFailures((current) => {
      const next = { ...current };
      packages.forEach((name) => delete next[name]);
      return next;
    });
    setInstallMsg("Starting installation\u2026");
    clientRef.current?.install(packages);
  }, []);
  const sendInput = useCallback((value: string, eof = false) => {
    terminalStore.echoInput(value);
    clientRef.current?.sendStdin(value, eof);
  }, []);

  const runTest = useCallback(
    (
      code: string,
      stdin = "",
      timeoutMs?: number,
      isolated = true,
    ): Promise<CapturedRun> =>
      clientRef.current?.runTest(code, stdin, timeoutMs, isolated) ??
      Promise.resolve({
        stdout: "",
        stderr: "",
        status: 1,
        traceback: "Python runtime is not ready yet.",
      }),
    [],
  );

  return {
    runTest,
    status,
    runtime,
    loadingMsg,
    loadingProgress,
    lastDuration,
    activity,
    plots,
    history,
    fatalError,
    installMsg,
    installed,
    bundledPackages,
    packageFailures,
    ready: status === "ready" || status === "waiting-input",
    running: status === "running",
    waitingInput: status === "waiting-input",
    run,
    stop,
    restart,
    install,
    sendInput,
  };
}

/** Manage the virtual project: files, folders, tabs, and persistence. */
export function useProject() {
  const [nodes, setNodes] = useState<PyNode[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  // Mirror of `nodes` kept synchronous for callbacks that create several
  // paths in one batch (e.g. seeding practice data). React state is async,
  // so existence checks inside a synchronous loop must read this ref.
  const nodesRef = useRef<PyNode[]>([]);
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await loadFiles();
      let list = stored;
      if (!stored.length) {
        const { getWorkspaceId } = await import("@/lib/storage/idb");
        if (getWorkspaceId() === "default") {
          list = seedExamples();
          await bulkPutFiles(list);
        }
      }
      if (cancelled) return;
      if (list.length > 0 && !list.some((n) => n.name.endsWith(".ipynb"))) {
        const { getWorkspaceId } = await import("@/lib/storage/idb");
        if (getWorkspaceId() === "default") {
          const notebookExamples = seedExamples().filter(n => n.name.endsWith(".ipynb"));
          list = [...list, ...notebookExamples];
          await bulkPutFiles(notebookExamples);
        }
      }
      setNodes(list);
      const active = (await getKV<string>("activeFileId")) ?? null;
      const tabs = (await getKV<string[]>("openTabs")) ?? [];
      const validTabs = tabs.filter((id) => list.some((n) => n.id === id));
      const validActive =
        active && list.some((n) => n.id === active) ? active : null;
      // On a fresh start with nothing open, show the first file.
      if (validTabs.length === 0) {
        const firstFile = list.find((n) => n.kind === "file");
        if (firstFile) {
          validTabs.push(firstFile.id);
          if (!validActive) setActiveId(firstFile.id);
        }
      }
      setOpenTabs(validTabs);
      if (validActive) setActiveId(validActive);
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      bulkPutFiles(nodes);
      setKV("activeFileId", activeId);
      setKV("openTabs", openTabs);
    }, 600);
    return () => clearTimeout(t);
  }, [nodes, activeId, openTabs, loaded]);

  useEffect(() => {
    const handler = () => bulkPutFiles(nodes);
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [nodes]);

  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const activeFile = activeId ? (nodeMap.get(activeId) ?? null) : null;

  const updateContent = useCallback((id: string, content: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, content, updatedAt: Date.now() } : n,
      ),
    );
    setDirty((prev) => new Set(prev).add(id));
  }, []);

  const save = useCallback((id: string) => {
    setNodes((prev) => {
      const node = prev.find((n) => n.id === id);
      if (node) persistFile(node);
      return prev;
    });
    setDirty((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const saveActive = useCallback(() => {
    if (activeId) save(activeId);
  }, [activeId, save]);

  const openFile = useCallback(
    (id: string) => {
      const node = nodeMap.get(id);
      if (!node || node.kind !== "file") return;
      setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setActiveId(id);
    },
    [nodeMap],
  );

  const closeTab = useCallback(
    (id: string) => {
      const node = nodeMap.get(id);
      if (node && dirty.has(id)) {
        toast.warn(`Save changes to ${node.name} before closing?`, {
          label: "Save",
          onClick: () => save(id)
        });
      }
      const idx = openTabs.indexOf(id);
      const next = openTabs.filter((t) => t !== id);
      setOpenTabs(next);
      if (activeId === id) {
        setActiveId(next[idx] ?? next[idx - 1] ?? next.at(-1) ?? null);
      }
      setDirty((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
    },
    [nodeMap, dirty, activeId, openTabs, save],
  );

  const reorderTab = useCallback((id: string, insertBeforeId: string | null) => {
    setOpenTabs((prev) => {
      const filtered = prev.filter((t) => t !== id);
      if (insertBeforeId === null) return [...filtered, id];
      const idx = filtered.indexOf(insertBeforeId);
      if (idx === -1) return [...filtered, id];
      const next = [...filtered];
      next.splice(idx, 0, id);
      return next;
    });
  }, []);

  const createNode = useCallback(
    (kind: "file" | "folder", name: string, parentId: string | null) => {
      const siblings = nodes.filter((n) => n.parentId === parentId);
      const err = validateName(name, siblings);
      if (err) return { error: err };
      const node: PyNode = {
        id: genId(),
        name: name.trim(),
        parentId,
        kind,
        content: kind === "file" ? "" : undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setNodes((prev) => [...prev, node]);
      persistFile(node);
      if (kind === "file") {
        setOpenTabs((prev) => (prev.includes(node.id) ? prev : [...prev, node.id]));
        setActiveId(node.id);
      }
      return { node };
    },
    [nodes],
  );

  const renameNode = useCallback(
    (id: string, name: string) => {
      const node = nodeMap.get(id);
      if (!node) return { error: "Not found" };
      const siblings = nodes.filter(
        (n) => n.parentId === node.parentId && n.id !== id,
      );
      const err = validateName(name, siblings);
      if (err) return { error: err };
      const updated: PyNode = {
        ...node,
        name: name.trim(),
        updatedAt: Date.now(),
      };
      setNodes((prev) => prev.map((n) => (n.id === id ? updated : n)));
      persistFile(updated);
      return { node: updated };
    },
    [nodes, nodeMap],
  );

  const deleteNodes = useCallback(
    (ids: string[]) => {
      const allIds = new Set<string>();
      ids.forEach((id) => {
        allIds.add(id);
        descendantIds(nodes, id).forEach((d) => allIds.add(d));
      });
      setNodes((prev) => prev.filter((n) => !allIds.has(n.id)));
      
      const nextOpen = openTabs.filter((t) => !allIds.has(t));
      setOpenTabs(nextOpen);

      if (activeId && allIds.has(activeId)) {
        const idx = openTabs.indexOf(activeId);
        setActiveId(nextOpen[idx] ?? nextOpen[idx - 1] ?? nextOpen.at(-1) ?? null);
      }
      
      setDirty((prev) => {
        const n = new Set(prev);
        allIds.forEach((i) => n.delete(i));
        return n;
      });
      allIds.forEach((i) => deleteFilePersisted(i));
    },
    [nodes, openTabs, activeId],
  );

  const duplicateNodes = useCallback(
    (ids: string[]) => {
      const newNodes: PyNode[] = [];
      const newTabs: string[] = [];
      
      ids.forEach((id) => {
        const node = nodeMap.get(id);
        if (!node || node.kind !== "file") return;
        const dot = node.name.lastIndexOf(".");
        const base = dot === -1 ? node.name : node.name.slice(0, dot);
        const ext = dot === -1 ? "" : node.name.slice(dot);
        const siblings = [...nodes, ...newNodes].filter((n) => n.parentId === node.parentId);
        let name = `${base}_copy${ext}`;
        let counter = 2;
        while (siblings.some((s) => s.name === name)) {
          name = `${base}_copy${counter}${ext}`;
          counter++;
        }
        const copy: PyNode = {
          id: genId(),
          name,
          parentId: node.parentId,
          kind: "file",
          content: node.content ?? "",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        newNodes.push(copy);
        newTabs.push(copy.id);
        persistFile(copy);
      });

      if (newNodes.length) {
        setNodes((prev) => [...prev, ...newNodes]);
        setOpenTabs((prev) => [...prev, ...newTabs]);
        setActiveId(newTabs[newTabs.length - 1]);
      }
    },
    [nodes, nodeMap],
  );

  const moveNodes = useCallback(
    (ids: string[], newParentId: string | null) => {
      if (newParentId) {
        const parentNode = nodeMap.get(newParentId);
        if (!parentNode || parentNode.kind === "file") return { error: "Invalid parent" };
      }

      const updatedNodes: PyNode[] = [];
      const errorIds: string[] = [];

      ids.forEach((id) => {
        const node = nodeMap.get(id);
        if (!node) return;
        if (id === newParentId) return;

        const descendants = descendantIds(nodes, id);
        if (newParentId && descendants.includes(newParentId)) {
          errorIds.push(id);
          return;
        }

        const siblings = [...nodes, ...updatedNodes].filter(
          (n) => n.parentId === newParentId && n.id !== id,
        );
        const err = validateName(node.name, siblings);
        if (err) {
          errorIds.push(id);
          return;
        }

        const updated: PyNode = {
          ...node,
          parentId: newParentId,
          updatedAt: Date.now(),
        };
        updatedNodes.push(updated);
        persistFile(updated);
      });

      if (updatedNodes.length) {
        setNodes((prev) =>
          prev.map((n) => {
            const upd = updatedNodes.find((u) => u.id === n.id);
            return upd ? upd : n;
          }),
        );
      }

      if (errorIds.length) return { error: `Could not move ${errorIds.length} items` };
      return { success: true };
    },
    [nodes, nodeMap],
  );

  const deleteNode = useCallback((id: string) => deleteNodes([id]), [deleteNodes]);
  const duplicateNode = useCallback((id: string) => duplicateNodes([id]), [duplicateNodes]);
  const moveNode = useCallback(
    (id: string, newParentId: string | null) => moveNodes([id], newParentId),
    [moveNodes]
  );

  /** Create a file/folder from a slash path, building folders as needed. */
  const createByPath = useCallback(
    (path: string, content: string, open = true) => {
      const parts = path.split("/").filter(Boolean);
      if (!parts.length) return;
      const created: PyNode[] = [];
      let parentId: string | null = null;
      let targetId: string | null = null;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;
        const existing = nodesRef.current.find(
          (n) => n.parentId === parentId && n.name === part,
        );
        if (existing) {
          if (isLast && existing.kind === "file") {
            targetId = existing.id;
            const upd = { ...existing, content, updatedAt: Date.now() };
            nodesRef.current = nodesRef.current.map((n) =>
              n.id === existing.id ? upd : n,
            );
            persistFile(upd);
            setNodes((prev) => prev.map((n) => (n.id === existing.id ? upd : n)));
          } else if (!isLast) {
            parentId = existing.id;
          }
          continue;
        }
        const node: PyNode = {
          id: genId(),
          name: part,
          parentId,
          kind: isLast ? "file" : "folder",
          content: isLast ? content : undefined,
          createdAt: Date.now() + i,
          updatedAt: Date.now() + i,
        };
        created.push(node);
        persistFile(node);
        if (isLast) targetId = node.id;
        else parentId = node.id;
      }
      if (created.length) {
        nodesRef.current = [...nodesRef.current, ...created];
        setNodes((prev) => [...prev, ...created]);
      }
      if (targetId && open) {
        setOpenTabs((prev) => (prev.includes(targetId!) ? prev : [...prev, targetId!]));
        setActiveId(targetId);
      }
    },
    [],
  );

  const applyRuntimeFilesystemChanges = useCallback(
    (changes: FsSyncChanges) => {
      if (
        changes.upserted.length === 0 &&
        changes.directories.length === 0 &&
        changes.deleted.length === 0
      ) {
        return;
      }

      const result = applyFilesystemChanges(nodesRef.current, changes);
      nodesRef.current = result.nodes;
      setNodes(result.nodes);
      void bulkPutFiles([...result.created, ...result.updated]);
      result.deletedIds.forEach((id) => void deleteFilePersisted(id));

      const deletedIds = new Set(result.deletedIds);
      setOpenTabs((tabs) => tabs.filter((id) => !deletedIds.has(id)));
      setActiveId((id) => (id && deletedIds.has(id) ? null : id));
      setDirty((current) => {
        const next = new Set(current);
        result.deletedIds.forEach((id) => next.delete(id));
        result.updated.forEach((node) => next.delete(node.id));
        return next;
      });

      const summary: string[] = [];
      if (result.created.length) summary.push(`${result.created.length} created`);
      if (result.updated.length) summary.push(`${result.updated.length} updated`);
      if (result.deletedIds.length) summary.push(`${result.deletedIds.length} deleted`);
      if (summary.length) {
        terminalStore.system(`Filesystem synchronized: ${summary.join(", ")}.`);
      }
    },
    [],
  );

  const resetToExamples = useCallback(() => {
    toast.warn(
      "Reset the project to the example files? Your current files will be removed.",
      {
        label: "Reset",
        onClick: async () => {
          const fresh = seedExamples();
          await clearFiles();
          await bulkPutFiles(fresh);
          setNodes(fresh);
          const first = fresh[0];
          setOpenTabs(first ? [first.id] : []);
          setActiveId(first?.id ?? null);
          setDirty(new Set());
        }
      }
    );
  }, []);

  return {
    nodes,
    tree,
    nodeMap,
    activeId,
    activeFile,
    openTabs,
    openTabFiles: openTabs
      .map((id) => nodeMap.get(id))
      .filter((n): n is PyNode => !!n && n.kind === "file"),
    dirty,
    loaded,
    setActiveId: openFile,
    openFile,
    closeTab,
    reorderTab,
    updateContent,
    save,
    saveActive,
    createNode,
    renameNode,
    deleteNode,
    duplicateNode,
    moveNode,
    deleteNodes,
    duplicateNodes,
    moveNodes,
    createByPath,
    applyRuntimeFilesystemChanges,
    resetToExamples,
  };
}

function seedExamples(): PyNode[] {
  return exampleNodes(null);
}

export type ProjectApi = ReturnType<typeof useProject>;
export type RuntimeApi = ReturnType<typeof usePythonRuntime>;
export type { TreeNode };
