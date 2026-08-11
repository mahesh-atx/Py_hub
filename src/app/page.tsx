"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

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

import { useState, useEffect } from "react";
import { setWorkspaceId } from "@/lib/storage/idb";

function WorkspaceWrapper() {
  const [workspaces, setWorkspaces] = useState<{id: string, name: string}[]>([]);
  const [currentId, setCurrentId] = useState<string>("default");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const w = localStorage.getItem("python-ide-workspaces");
    const active = localStorage.getItem("python-ide-active-workspace") || "default";
    if (w) {
      try { setWorkspaces(JSON.parse(w)); } catch (e) {}
    } else {
      const defaultW = [{ id: "default", name: "Default Workspace" }];
      setWorkspaces(defaultW);
      localStorage.setItem("python-ide-workspaces", JSON.stringify(defaultW));
    }
    setCurrentId(active);
    setWorkspaceId(active);
    setLoaded(true);
  }, []);

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

  if (!loaded) return null;

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
