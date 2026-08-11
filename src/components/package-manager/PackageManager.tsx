"use client";

import { useMemo, useState } from "react";
import { Package, Search, Plus, Check, Loader2 } from "lucide-react";
import { searchPackages, KNOWN_PACKAGES } from "@/lib/packages";

interface PackageManagerProps {
  installed: string[];
  installing: string | null;
  onInstall: (packages: string[]) => void;
}

export function PackageManager({
  installed,
  installing,
  onInstall,
}: PackageManagerProps) {
  const [query, setQuery] = useState("");
  const [custom, setCustom] = useState("");

  const results = useMemo(() => searchPackages(query), [query]);

  const isInstalled = (name: string) =>
    installed.some((n) => n.toLowerCase() === name.toLowerCase());

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Python Packages
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages…"
            className="w-full rounded border border-white/10 bg-[#0d1117] py-1.5 pl-7 pr-2 text-xs text-slate-200 outline-none focus:border-sky-500/60"
          />
        </div>
      </div>



      <div className="flex-1 overflow-auto px-2 pb-3">
        {results.map((pkg) => {
          const done = isInstalled(pkg.name);
          return (
            <div
              key={pkg.name}
              className="flex items-center justify-between rounded px-1.5 py-1.5 hover:bg-white/5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                  <span className="truncate text-xs font-medium text-slate-200">
                    {pkg.name}
                  </span>
                  {pkg.builtin && (
                    <span className="rounded bg-emerald-500/15 px-1 text-[9px] font-semibold uppercase text-emerald-400">
                      built-in
                    </span>
                  )}
                </div>
                <p className="truncate pl-5 text-[10px] text-slate-500">
                  {pkg.description}
                </p>
              </div>
              <button
                disabled={!!installing}
                onClick={() => onInstall([pkg.name])}
                className={`flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[11px] font-medium ${
                  done
                    ? "bg-emerald-600/20 text-emerald-300"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {installing && installing.includes(pkg.name) ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : done ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Plus className="h-3 w-3" />
                )}
                {done ? "Installed" : "Install"}
              </button>
            </div>
          );
        })}
        {results.length === 0 && (
          <p className="px-2 py-3 text-xs text-slate-600">
            No matching packages in the catalog.
          </p>
        )}
      </div>

      {installed.length > 0 && (
        <div className="border-t border-white/10 px-3 py-2">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-slate-500">
            Installed ({installed.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {installed.map((name) => (
              <span
                key={name}
                className="rounded bg-emerald-600/15 px-1.5 py-0.5 text-[10px] text-emerald-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { KNOWN_PACKAGES };
