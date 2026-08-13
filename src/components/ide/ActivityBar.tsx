"use client";

import {
  Boxes,
  Files,
  GraduationCap,
  Package,
  Settings,
} from "lucide-react";
import type { ReactNode } from "react";

function ActivityButton({
  icon,
  active = false,
  onClick,
  title,
}: {
  icon: ReactNode;
  active?: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      onClick={onClick}
      className={`relative flex h-12 w-full items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--vscode-accent)] ${
        active
          ? "text-[var(--vscode-text)]"
          : "text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
      }`}
    >
      {active && (
        <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-[var(--vscode-accent)]" />
      )}
      {icon}
    </button>
  );
}

export function ActivityBar({
  activity,
  sidebarOpen,
  onSelect,
  onToggleCurrent,
  onOpenSettings,
}: {
  activity: string;
  sidebarOpen: boolean;
  onSelect: (activity: "workspaces" | "explorer" | "extensions" | "practice") => void;
  onToggleCurrent: () => void;
  onOpenSettings: () => void;
}) {
  const choose = (
    next: "workspaces" | "explorer" | "extensions" | "practice",
  ) => {
    if (activity === next) onToggleCurrent();
    else onSelect(next);
  };

  return (
    <nav aria-label="Primary IDE activities" className="z-10 flex w-12 shrink-0 flex-col items-center border-r border-[var(--vscode-border)] bg-[var(--vscode-bg)]">
      <div className="flex w-full flex-col">
        <ActivityButton
          icon={<Boxes className="h-6 w-6" strokeWidth={1.25} />}
          active={activity === "workspaces" && sidebarOpen}
          onClick={() => choose("workspaces")}
          title="Workspaces"
        />
        <ActivityButton
          icon={<Files className="h-6 w-6" strokeWidth={1.25} />}
          active={activity === "explorer" && sidebarOpen}
          onClick={() => choose("explorer")}
          title="Explorer (Ctrl+Shift+E)"
        />
        <ActivityButton
          icon={<Package className="h-6 w-6" strokeWidth={1.25} />}
          active={activity === "extensions" && sidebarOpen}
          onClick={() => choose("extensions")}
          title="Packages"
        />
        <ActivityButton
          icon={<GraduationCap className="h-6 w-6" strokeWidth={1.25} />}
          active={activity === "practice" && sidebarOpen}
          onClick={() => choose("practice")}
          title="Practice & Learn"
        />
      </div>
      <div className="mb-1 mt-auto flex w-full flex-col">
        <ActivityButton
          icon={<Settings className="h-6 w-6" strokeWidth={1.25} />}
          onClick={onOpenSettings}
          title="Manage Settings"
        />
      </div>
    </nav>
  );
}
