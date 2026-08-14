"use client";

import { Circle, Loader2, Check, AlertTriangle, Bell, Info } from "lucide-react";
import type { RuntimeStatus } from "@/types/python";
import type { CursorPosition } from "@/components/editor/CodeEditor";
import type { RuntimeInfo } from "@/lib/pyodide/worker-client";

interface StatusBarProps {
  status: RuntimeStatus;
  runtime: RuntimeInfo | null;
  lastDuration: number | null;
  cursor: CursorPosition;
  tabSize: number;
  activityBarVisible: boolean;
  onToggleActivityBar: () => void;
}

export function StatusBar({
  status,
  runtime,
  lastDuration,
  cursor,
  tabSize,
  activityBarVisible,
  onToggleActivityBar,
}: StatusBarProps) {
  return (
    <div className="flex h-[22px] items-center justify-between bg-[var(--vscode-statusbar-bg,var(--vscode-accent))] px-2 text-[12px] text-[var(--vscode-statusbar-fg,#ffffff)] select-none relative z-50">
      <div className="flex items-center h-full">
        {/* Remote Window Icon */}
        <div className="flex items-center justify-center bg-[#16825d] px-2 h-full hover:bg-[#16825d]/80 cursor-pointer">
          <span className="text-[10px] font-bold">&gt;&lt;</span>
        </div>
        
        {/* Activity Bar Toggle */}
        <div 
          onClick={onToggleActivityBar}
          className="flex items-center justify-center h-full px-2 hover:bg-white/20 cursor-pointer ml-1 mr-1"
          title={activityBarVisible ? "Hide Activity Bar" : "Show Activity Bar"}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M14 3h-1v10h1V3zM2 3h1v10H2V3zm3 0h6v10H5V3zm5 9H6V4h4v8z" />
          </svg>
        </div>

        {/* Python Version */}
        <StatusBarItem>
          {status === "running" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
          ) : status === "error" ? (
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
          ) : (
            <span className="mr-1">{}</span>
          )}
          {runtime
            ? `Python ${runtime.pythonVersion}`
            : status === "loading"
              ? "Python (loading...)"
              : "Python"}
        </StatusBarItem>
        
        {/* Status */}
        <StatusBarItem>
          {status === "running" 
            ? "Running..." 
            : status === "waiting-input"
            ? "Waiting for input..."
            : lastDuration != null
            ? `Finished in ${(lastDuration / 1000).toFixed(2)}s`
            : "Ready"}
        </StatusBarItem>
      </div>

      <div className="flex items-center h-full">
        <StatusBarItem>
          Ln {cursor.lineNumber}, Col {cursor.column}
        </StatusBarItem>
        <StatusBarItem>
          Spaces: {tabSize}
        </StatusBarItem>
      </div>
    </div>
  );
}

function StatusBarItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center h-full px-2 hover:bg-white/20 cursor-pointer transition-colors">
      {children}
    </div>
  );
}
