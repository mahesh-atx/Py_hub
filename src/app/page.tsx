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
  const [currentId, setCurrentId] = useState<string>(readActiveWorkspace);

  useEffect(() => {
    setWorkspaceId(currentId);
  }, [currentId]);

  const switchWorkspace = (id: string) => {
    localStorage.setItem("python-ide-active-workspace", id);
    setWorkspaceId(id);
    setCurrentId(id);
  };

  const createWorkspace = (name: string) => {
    const newId = "ws_" + Date.now();
    const newW = [...workspaces, { id: newId, name }];
    setWorkspaces(newW);
    localStorage.setItem("python-ide-workspaces", JSON.stringify(newW));
    switchWorkspace(newId);
  };

  return (
    <IDE
      key={currentId}
      workspaces={workspaces}
      currentWorkspaceId={currentId}
      onSwitchWorkspace={switchWorkspace}
      onCreateWorkspace={createWorkspace}
    />
  );
}

export default function Page() {
  return <WorkspaceWrapper />;
}