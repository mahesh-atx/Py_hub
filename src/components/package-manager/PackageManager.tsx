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
import { LineChart, BarChart3 } from "lucide-react";

const LOGO_OVERRIDES: Record<string, string> = {
  "scikit-learn": "scikitlearn",
  pillow: "python",
};

const PackageLogo = ({ name }: { name: string }) => {
  const [error, setError] = useState(false);
  const slug = LOGO_OVERRIDES[name] ?? name.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  if (name === "matplotlib") {
    return (
      <div
        role="img"
        aria-label={`${name} logo`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[var(--vscode-hover)]"
      >
        <LineChart className="h-5 w-5 text-white opacity-90" />
      </div>
    );
  }
  
  if (name === "seaborn") {
    return (
      <div
        role="img"
        aria-label={`${name} logo`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[var(--vscode-hover)]"
      >
        <BarChart3 className="h-5 w-5 text-white opacity-90" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="img"
        aria-label={`${name} logo`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[var(--vscode-hover)]"
      >
        <Package className="h-5 w-5 text-white opacity-90" />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[var(--vscode-hover)]">
      <img
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt={`${name} logo`}
        className="h-5 w-5 opacity-90"
        onError={() => setError(true)}
      />
    </div>
  );
};

interface PackageManagerProps {
  installed: string[];
  bundled?: string[];
  installing: string | null;
  failures?: Record<string, string>;
  onInstall: (packages: string[]) => void;
}

export function PackageManager({
  installed,
  installing,
  failures = {},
  onInstall,
}: PackageManagerProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPackages(query), [query]);

  const isInstalled = (name: string) =>
    installed.some((entry) => entry.toLowerCase() === name.toLowerCase());

  return (
    <div className="flex h-full flex-col text-[var(--vscode-text)]">
      {/* Search input — VS Code style */}
      <div className="px-2 pt-2 pb-1">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vscode-text-muted)]" />
          <input
            aria-label="Search Python packages"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages…"
            className="h-[28px] w-full rounded-[3px] border border-[var(--vscode-border)] bg-[var(--vscode-input)] pl-8 pr-2 text-[13px] text-[var(--vscode-text)] placeholder-[var(--vscode-text-muted)] outline-none focus:border-[var(--vscode-accent)]"
          />
        </div>
      </div>

      {/* Package list */}
      <div className="flex-1 overflow-auto px-1 pb-2">
        {results.map((pkg) => {
          const done = isInstalled(pkg.name);
          const failure = failures[pkg.name];
          const active = Boolean(installing?.toLowerCase().includes(pkg.name));
          return (
            <div
              key={pkg.name}
              data-testid={`package-${pkg.name}`}
              className="group flex gap-2.5 rounded-[3px] px-2 py-2 cursor-default hover:bg-[var(--vscode-hover)] transition-colors"
            >
              {/* Icon */}
              <PackageLogo name={pkg.name} />

              {/* Info + action */}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-medium leading-tight">{pkg.name}</span>
                  <button
                    type="button"
                    disabled={Boolean(installing) || done}
                    onClick={() => onInstall([pkg.name])}
                    aria-label={failure ? `Retry installing ${pkg.name}` : `Install ${pkg.name}`}
                    className={`flex shrink-0 items-center gap-1 rounded-[3px] px-2 py-[3px] text-[11px] font-medium outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[var(--vscode-accent)] disabled:cursor-not-allowed ${
                      done
                        ? "bg-transparent text-[var(--vscode-text-muted)]"
                        : failure
                          ? "bg-[var(--vscode-hover)] text-rose-400 hover:bg-rose-600/20"
                          : "bg-[var(--vscode-accent)] text-white hover:opacity-90"
                    }`}
                  >
                    {active ? (
                      <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                    ) : done ? (
                      <Check className="h-3 w-3" aria-hidden="true" />
                    ) : failure ? (
                      <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <Plus className="h-3 w-3" aria-hidden="true" />
                    )}
                    {active ? "Installing…" : done ? "Installed" : failure ? "Retry" : "Install"}
                  </button>
                </div>
                <p className="truncate text-[11px] leading-snug text-[var(--vscode-text-muted)]">
                  {pkg.description}
                </p>
              </div>

              {/* Error */}
              {failure && (
                <div role="alert" className="mt-1 flex items-start gap-1.5 rounded bg-rose-950/40 p-1.5 text-[10px] leading-relaxed text-rose-200">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                  <span className="line-clamp-2">{failure}</span>
                </div>
              )}
            </div>
          );
        })}
        {results.length === 0 && (
          <div className="px-2 py-8 text-center text-[12px] text-[var(--vscode-text-muted)]">
            <Package className="mx-auto mb-2 h-5 w-5 opacity-50" aria-hidden="true" />
            No packages match &ldquo;{query}&rdquo;
          </div>
        )}
      </div>

      {/* Installed footer */}
      <div aria-live="polite" className="border-t border-[var(--vscode-border)] px-3 py-2">
        {installing && (
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] text-[var(--vscode-accent)]">
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> {installing}
          </p>
        )}
        <p className="mb-1 text-[11px] font-medium text-[var(--vscode-text-muted)]">
          Installed ({installed.length})
        </p>
        {installed.length ? (
          <div className="flex flex-wrap gap-1">
            {installed.map((name) => (
              <span key={name} className="rounded-[3px] bg-[var(--vscode-hover)] px-1.5 py-0.5 text-[11px] text-[var(--vscode-text)]">
                {name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-[var(--vscode-text-muted)]">No packages installed yet.</p>
        )}
      </div>
    </div>
  );
}

export { KNOWN_PACKAGES };
