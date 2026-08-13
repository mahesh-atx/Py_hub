"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Loader2,
  Package,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import { searchPackages, KNOWN_PACKAGES } from "@/lib/packages";

interface PackageManagerProps {
  installed: string[];
  bundled?: string[];
  installing: string | null;
  failures?: Record<string, string>;
  onInstall: (packages: string[]) => void;
}

export function PackageManager({
  installed,
  bundled = [],
  installing,
  failures = {},
  onInstall,
}: PackageManagerProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPackages(query), [query]);
  const curriculumPackages = useMemo(
    () => KNOWN_PACKAGES.filter((pkg) => pkg.curriculum).map((pkg) => pkg.name),
    [],
  );

  const isInstalled = (name: string) =>
    installed.some((entry) => entry.toLowerCase() === name.toLowerCase());

  return (
    <div className="flex h-full flex-col text-[var(--vscode-text)]">
      <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--vscode-text-muted)]">
        Python packages
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vscode-text-muted)]" />
          <input
            aria-label="Search Python packages"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search packages…"
            className="min-h-9 w-full rounded border border-[var(--vscode-border)] bg-[var(--vscode-editor-bg)] py-1.5 pl-7 pr-2 text-xs text-[var(--vscode-text)] outline-none focus-visible:border-[var(--vscode-accent)] focus-visible:ring-1 focus-visible:ring-[var(--vscode-accent)]"
          />
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-[var(--vscode-text-muted)]">
          Compatible packages execute entirely in your browser. Installation may download static wheel files.
        </p>
        <button
          type="button"
          disabled={Boolean(installing) || curriculumPackages.every(isInstalled)}
          onClick={() => onInstall(curriculumPackages.filter((name) => !isInstalled(name)))}
          className="mt-2 min-h-9 w-full rounded border border-[var(--vscode-border)] bg-[var(--vscode-hover)] px-3 text-[11px] font-semibold text-[var(--vscode-text)] outline-none hover:border-[var(--vscode-accent)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {curriculumPackages.every(isInstalled)
            ? "Curriculum stack installed"
            : "Install curriculum packages"}
        </button>
      </div>

      <div className="flex-1 overflow-auto px-2 pb-3">
        {results.map((pkg) => {
          const done = isInstalled(pkg.name);
          const local = bundled.includes(pkg.name);
          const failure = failures[pkg.name];
          const active = Boolean(installing?.toLowerCase().includes(pkg.name));
          return (
            <div
              key={pkg.name}
              data-testid={`package-${pkg.name}`}
              className="mb-1 rounded border border-transparent px-2 py-2 hover:border-[var(--vscode-border)] hover:bg-[var(--vscode-hover)]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 shrink-0 text-[var(--vscode-text-muted)]" />
                    <span className="truncate text-xs font-medium">{pkg.name}</span>
                    {pkg.pyodideCompatible && (
                      <span className="rounded bg-sky-500/15 px-1 py-0.5 text-[9px] font-semibold uppercase text-sky-300">
                        Pyodide compatible
                      </span>
                    )}
                    {pkg.curriculum && (
                      <span className="rounded bg-amber-500/15 px-1 py-0.5 text-[9px] font-semibold uppercase text-amber-300">
                        Curriculum
                      </span>
                    )}
                    <span className={`rounded px-1 py-0.5 text-[9px] font-semibold uppercase ${
                      local ? "bg-emerald-500/15 text-emerald-300" : "bg-violet-500/15 text-violet-300"
                    }`}>
                      {local ? "Bundled" : "Internet required"}
                    </span>
                  </div>
                  <p className="mt-0.5 pl-5 text-[10px] leading-snug text-[var(--vscode-text-muted)]">
                    {pkg.description}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={Boolean(installing) || done}
                  onClick={() => onInstall([pkg.name])}
                  aria-label={failure ? `Retry installing ${pkg.name}` : `Install ${pkg.name}`}
                  className={`flex min-h-9 shrink-0 items-center gap-1 rounded px-2.5 text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)] disabled:cursor-not-allowed ${
                    done
                      ? "bg-emerald-600/20 text-emerald-300"
                      : failure
                        ? "bg-rose-600/20 text-rose-200 hover:bg-rose-600/30"
                        : "bg-[var(--vscode-hover)] text-[var(--vscode-text)] hover:bg-white/10"
                  }`}
                >
                  {active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : done ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : failure ? (
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {active ? "Installing" : done ? "Installed" : failure ? "Retry" : "Install"}
                </button>
              </div>
              {failure && (
                <div role="alert" className="mt-2 flex gap-1.5 rounded bg-rose-950/40 p-2 text-[10px] leading-relaxed text-rose-200">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                  <span>{failure}</span>
                </div>
              )}
            </div>
          );
        })}
        {results.length === 0 && (
          <div className="px-2 py-6 text-center text-xs text-[var(--vscode-text-muted)]">
            <Package className="mx-auto mb-2 h-6 w-6 opacity-60" aria-hidden="true" />
            No compatible package matches “{query}”.
          </div>
        )}
      </div>

      <div aria-live="polite" className="border-t border-[var(--vscode-border)] px-3 py-2">
        {installing && (
          <p className="mb-2 flex items-center gap-1.5 text-[10px] text-sky-300">
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> {installing}
          </p>
        )}
        <p className="mb-1 text-[10px] uppercase tracking-wide text-[var(--vscode-text-muted)]">
          Installed ({installed.length})
        </p>
        {installed.length ? (
          <div className="flex flex-wrap gap-1">
            {installed.map((name) => (
              <span key={name} className="rounded bg-emerald-600/15 px-1.5 py-0.5 text-[10px] text-emerald-300">
                {name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-[var(--vscode-text-muted)]">No optional packages installed yet.</p>
        )}
      </div>
    </div>
  );
}

export { KNOWN_PACKAGES };
