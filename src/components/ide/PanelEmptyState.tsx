import type { ReactNode } from "react";

export function PanelEmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 text-center">
      <div className="max-w-sm text-[var(--vscode-text-muted)]">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--vscode-border)] bg-[var(--vscode-hover)]">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-[var(--vscode-text)]">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
