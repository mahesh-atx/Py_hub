"use client";

import {
  Boxes,
  Code2,
  Files,
  GraduationCap,
  TerminalSquare,
} from "lucide-react";

export type MobileIdeView = "sidebar" | "editor" | "terminal";

export function MobileNavigation({
  view,
  activity,
  onView,
  onActivity,
}: {
  view: MobileIdeView;
  activity: string;
  onView: (view: MobileIdeView) => void;
  onActivity: (activity: "explorer" | "practice" | "extensions") => void;
}) {
  const button = (active: boolean) =>
    `flex min-h-11 min-w-0 flex-1 items-center justify-center gap-1 px-2 py-2 text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--vscode-accent)] ${
      active
        ? "bg-[var(--vscode-accent)] text-white"
        : "text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]"
    }`;

  return (
    <nav
      className="flex shrink-0 border-b border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)] lg:hidden"
      aria-label="Mobile IDE views"
      data-testid="mobile-navigation"
    >
      <button
        type="button"
        className={button(view === "sidebar" && activity === "explorer")}
        onClick={() => {
          onActivity("explorer");
          onView("sidebar");
        }}
      >
        <Files className="h-4 w-4" /> Files
      </button>
      <button
        type="button"
        className={button(view === "sidebar" && activity === "practice")}
        onClick={() => {
          onActivity("practice");
          onView("sidebar");
        }}
      >
        <GraduationCap className="h-4 w-4" /> Learn
      </button>
      <button
        type="button"
        className={button(view === "editor")}
        onClick={() => onView("editor")}
      >
        <Code2 className="h-4 w-4" /> Editor
      </button>
      <button
        type="button"
        className={button(view === "terminal")}
        onClick={() => onView("terminal")}
      >
        <TerminalSquare className="h-4 w-4" /> Terminal
      </button>
      <button
        type="button"
        className={button(view === "sidebar" && activity === "extensions")}
        onClick={() => {
          onActivity("extensions");
          onView("sidebar");
        }}
      >
        <Boxes className="h-4 w-4" /> Packages
      </button>
    </nav>
  );
}
