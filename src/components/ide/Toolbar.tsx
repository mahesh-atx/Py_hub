"use client";

import {
  Play,
  Square,
  Save,
  Eraser,
  RotateCcw,
  Settings,
  HelpCircle,
  History,
  GraduationCap,
  Sun,
  Moon,
  PanelLeft,
  Boxes,
  Code2,
  TerminalSquare,
  FolderTree,
} from "lucide-react";
import type { RuntimeStatus } from "@/types/python";
import type { RuntimeInfo } from "@/lib/pyodide/worker-client";

export type PanelKind =
  | "settings"
  | "runtime"
  | "help"
  | "quickopen"
  | "history"
  | "practice";

interface ToolbarProps {
  status: RuntimeStatus;
  runtime: RuntimeInfo | null;
  ready: boolean;
  running: boolean;
  waitingInput: boolean;
  theme: "vs-dark" | "light";
  onRun: () => void;
  onStop: () => void;
  onSave: () => void;
  onClear: () => void;
  onRestart: () => void;
  onToggleTheme: () => void;
  onOpenPanel: (p: PanelKind) => void;
  onToggleSidebar: () => void;
  mobileView: "code" | "terminal" | "files";
  onMobileView: (v: "code" | "terminal" | "files") => void;
}

function pillColor(status: RuntimeStatus): string {
  switch (status) {
    case "running":
    case "waiting-input":
      return "bg-amber-400";
    case "error":
      return "bg-rose-400";
    case "loading":
      return "bg-sky-400 animate-pulse";
    default:
      return "bg-emerald-400";
  }
}

function pillLabel(status: RuntimeStatus): string {
  switch (status) {
    case "loading":
      return "Loading Python…";
    case "running":
      return "Running…";
    case "waiting-input":
      return "Waiting for input";
    case "error":
      return "Python Error";
    default:
      return "Python Ready";
  }
}

export function Toolbar(props: ToolbarProps) {
  return (
    <header className="flex h-11 shrink-0 items-center gap-2 border-b border-white/10 bg-[#0d1117] px-2 sm:px-3">
      <button
        onClick={props.onToggleSidebar}
        title="Toggle sidebar"
        className="hidden rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-slate-200 lg:block"
      >
        <PanelLeft className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-1.5 pr-1">
        <span className="text-sm font-semibold text-slate-100">PyLab</span>
        <span className="hidden rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-medium text-sky-300 sm:inline">
          browser IDE
        </span>
      </div>

      <div className="mx-1 h-5 w-px bg-white/10" />

      {props.running ? (
        <button
          onClick={props.onStop}
          className="flex items-center gap-1.5 rounded bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500"
        >
          <Square className="h-3.5 w-3.5 fill-current" /> Stop
        </button>
      ) : (
        <button
          onClick={props.onRun}
          disabled={!props.ready}
          className="flex items-center gap-1.5 rounded bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          title="Run (Ctrl/Cmd + Enter)"
        >
          <Play className="h-3.5 w-3.5 fill-current" /> Run
        </button>
      )}

      <ToolButton title="Save (Ctrl/Cmd + S)" onClick={props.onSave}>
        <Save className="h-4 w-4" />
      </ToolButton>
      <ToolButton title="Clear terminal" onClick={props.onClear}>
        <Eraser className="h-4 w-4" />
      </ToolButton>
      <ToolButton title="Restart Python runtime" onClick={props.onRestart}>
        <RotateCcw className="h-4 w-4" />
      </ToolButton>

      <button
        onClick={() => props.onOpenPanel("runtime")}
        className="ml-1 flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-white/10"
        title="Python runtime status"
      >
        <span className={`h-2 w-2 rounded-full ${pillColor(props.status)}`} />
        <span className="hidden sm:inline">{pillLabel(props.status)}</span>
        {props.runtime && (
          <span className="hidden text-slate-500 md:inline">
            {props.runtime.pythonVersion}
          </span>
        )}
      </button>

      <div className="ml-auto flex items-center gap-0.5">
        <ToolButton title="Packages" onClick={props.onToggleSidebar}>
          <Boxes className="h-4 w-4" />
        </ToolButton>
        <ToolButton title="Learn & Tests" onClick={() => props.onOpenPanel("practice")}>
          <GraduationCap className="h-4 w-4" />
        </ToolButton>
        <ToolButton title="Run history" onClick={() => props.onOpenPanel("history")}>
          <History className="h-4 w-4" />
        </ToolButton>
        <ToolButton title="Help & limitations" onClick={() => props.onOpenPanel("help")}>
          <HelpCircle className="h-4 w-4" />
        </ToolButton>
        <ToolButton title="Settings" onClick={() => props.onOpenPanel("settings")}>
          <Settings className="h-4 w-4" />
        </ToolButton>
        <ToolButton title="Toggle theme" onClick={props.onToggleTheme}>
          {props.theme === "vs-dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </ToolButton>
      </div>

      {/* mobile view switcher */}
      <div className="ml-1 flex items-center gap-0.5 lg:hidden">
        <MobileTab
          active={props.mobileView === "code"}
          onClick={() => props.onMobileView("code")}
        >
          <Code2 className="h-4 w-4" />
        </MobileTab>
        <MobileTab
          active={props.mobileView === "terminal"}
          onClick={() => props.onMobileView("terminal")}
        >
          <TerminalSquare className="h-4 w-4" />
        </MobileTab>
        <MobileTab
          active={props.mobileView === "files"}
          onClick={() => props.onMobileView("files")}
        >
          <FolderTree className="h-4 w-4" />
        </MobileTab>
      </div>
    </header>
  );
}

function ToolButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      title={title}
      aria-label={title}
      onClick={onClick}
      className="rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
    >
      {children}
    </button>
  );
}

function MobileTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded p-1.5 ${
        active ? "bg-sky-600 text-white" : "text-slate-400 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}
