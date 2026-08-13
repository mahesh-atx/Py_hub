"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { setWorkspaceId } from "@/lib/storage/idb";

const IDE = dynamic(
  () => import("@/components/ide/IDE").then((m) => m.IDE),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-[#0d1117] text-slate-300">
        <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
        <p className="text-sm">Starting browser Python IDE…</p>
      </div>
    ),
  },
);

interface Workspace {
  id: string;
  name: string;
}

function readWorkspaces(): Workspace[] {
  if (typeof window === "undefined") return [];
  const w = localStorage.getItem("python-ide-workspaces");
  if (w) {
    try {
      return JSON.parse(w);
    } catch {
      return [];
    }
  }
  const defaultW: Workspace[] = [{ id: "default", name: "Default Workspace" }];
  localStorage.setItem("python-ide-workspaces", JSON.stringify(defaultW));
  return defaultW;
}

function readActiveWorkspace(): string {
  if (typeof window === "undefined") return "default";
  return localStorage.getItem("python-ide-active-workspace") || "default";
}

function WorkspaceWrapper() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(readWorkspaces);
  const [currentId, setCurrentId] = useState<string>(() => {
    const id = readActiveWorkspace();
    // Select storage before the child IDE mounts and starts reading IndexedDB.
    setWorkspaceId(id);
    return id;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [renderedId, setRenderedId] = useState<string>(currentId);

  useEffect(() => {
    setWorkspaceId(currentId);
  }, [currentId]);

  const switchWorkspace = (id: string) => {
    if (id === currentId) return;
    setIsTransitioning(true);
    // Smooth transition: Wait for fade out, then switch
    setTimeout(() => {
      localStorage.setItem("python-ide-active-workspace", id);
      setWorkspaceId(id);
      setCurrentId(id);
      setRenderedId(id);
      setTimeout(() => setIsTransitioning(false), 50); // slight delay to allow render before fade in
    }, 300);
  };

  const createWorkspace = (name: string) => {
    const newId = "ws_" + Date.now();
    const newW = [...workspaces, { id: newId, name }];
    setWorkspaces(newW);
    localStorage.setItem("python-ide-workspaces", JSON.stringify(newW));
    switchWorkspace(newId);
  };

  const deleteWorkspace = async (id: string) => {
    if (workspaces.length <= 1) return; // Cannot delete last workspace
    const newW = workspaces.filter(w => w.id !== id);
    setWorkspaces(newW);
    localStorage.setItem("python-ide-workspaces", JSON.stringify(newW));
    
    if (currentId === id) {
      switchWorkspace(newW[0].id);
    }
    
    // Drop IndexedDB asynchronously
    const { deleteWorkspaceDB } = await import("@/lib/storage/idb");
    await deleteWorkspaceDB(id);
  };

  const renameWorkspace = (id: string, newName: string) => {
    const newW = workspaces.map(w => w.id === id ? { ...w, name: newName } : w);
    setWorkspaces(newW);
    localStorage.setItem("python-ide-workspaces", JSON.stringify(newW));
  };

  return (
    <div className="h-full w-full bg-[var(--vscode-bg)] relative">
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <IDE
          key={renderedId}
          workspaces={workspaces}
          currentWorkspaceId={currentId}
          onSwitchWorkspace={switchWorkspace}
          onCreateWorkspace={createWorkspace}
          onDeleteWorkspace={deleteWorkspace}
          onRenameWorkspace={renameWorkspace}
        />
      </div>
      {isTransitioning && (
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-3 bg-[var(--vscode-bg)] text-slate-300 z-50">
          <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
          <p className="text-sm">Switching workspace…</p>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <WorkspaceWrapper />;
}