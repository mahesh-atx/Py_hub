"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  Loader2,
  RotateCcw,
  Search,
  FileCode2,
  CircleCheck,
  CircleX,
  Clock,
} from "lucide-react";
import type { HistoryEntry } from "@/types/execution";
import type { PyNode } from "@/types/filesystem";
import type { RuntimeStatus } from "@/types/python";
import type { RuntimeInfo } from "@/lib/pyodide/worker-client";
import type { IdeSettings } from "@/lib/settings";
import { SelfTest } from "@/components/ide/SelfTest";

export function Modal({
  title,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[85vh] w-full ${
          wide ? "max-w-2xl" : "max-w-md"
        } flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d1117] shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-slate-200"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export function LoadingCard({
  message,
  progress,
}: {
  message: string;
  progress?: number;
}) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 w-72 rounded-lg border border-white/10 bg-[#0d1117]/95 p-3 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 text-xs text-slate-200">
        <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
        <span className="font-medium">Loading Python runtime</span>
      </div>
      <p className="mt-1.5 text-[11px] text-slate-400">{message}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-sky-500 transition-all duration-300"
          style={{
            width: progress != null ? `${Math.min(100, progress)}%` : "100%",
            ...(progress == null ? { animation: "pulse 1.5s infinite" } : {}),
          }}
        />
      </div>
      <p className="mt-1.5 text-[10px] text-slate-600">
        Runs entirely in your browser. No server.
      </p>
    </div>
  );
}

export function FatalModal({
  error,
  onRetry,
  onClose,
}: {
  error: string;
  onRetry: () => void;
  onClose: () => void;
}) {
  return (
    <Modal title="Python runtime error" onClose={onClose}>
      <div className="p-4">
        <p className="text-sm text-slate-300">
          The Python runtime could not start or crashed.
        </p>
        <pre className="mt-3 max-h-48 overflow-auto rounded bg-black/40 p-3 text-[11px] text-rose-300">
          {error}
        </pre>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
          >
            Dismiss
          </button>
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 rounded bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restart runtime
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function RuntimeModal({
  runtime,
  status,
  onRestart,
  runTest,
  onClose,
}: {
  runtime: RuntimeInfo | null;
  status: RuntimeStatus;
  onRestart: () => void;
  runTest: (code: string, stdin?: string) => Promise<{
    stdout: string;
    stderr: string;
    traceback?: string;
    status: number;
  }>;
  onClose: () => void;
}) {
  return (
    <Modal title="Python Runtime" onClose={onClose} wide>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <Info label="Engine" value="Pyodide (WebAssembly)" />
          <Info
            label="Pyodide version"
            value={runtime?.pyodideVersion ?? "—"}
          />
          <Info
            label="Python version"
            value={runtime?.pythonVersion ?? "loading…"}
          />
          <Info label="Execution" value="Web Worker (off main thread)" />
          <Info label="Status" value={status} />
          <Info label="Persistence" value="IndexedDB" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Restart the Python runtime? This clears all Python variables.",
                )
              )
                onRestart();
            }}
            className="flex items-center gap-1.5 rounded bg-rose-600/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-500"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restart runtime
          </button>
        </div>

        <div className="mt-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Runtime self-test
          </h3>
          <SelfTest runTest={runTest} />
        </div>
      </div>
    </Modal>
  );
}

export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Help & Limitations" onClose={onClose} wide>
      <div className="space-y-4 p-4 text-xs text-slate-300">
        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-slate-100">
            Keyboard shortcuts
          </h3>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <Shortcut keys="Ctrl/Cmd + Enter" action="Run code" />
            <Shortcut keys="Ctrl/Cmd + S" action="Save file" />
            <Shortcut keys="Ctrl/Cmd + P" action="Quick open file" />
            <Shortcut keys="Alt + Click" action="Add multiple cursors" />
            <Shortcut keys="Alt + Up/Down" action="Move line up/down" />
            <Shortcut keys="Shift+Alt+Up/Dn" action="Copy line up/down" />
            <Shortcut keys="Ctrl/Cmd + D" action="Select next occurrence" />
            <Shortcut keys="Ctrl/Cmd + F" action="Find" />
            <Shortcut keys="Ctrl/Cmd + H" action="Replace" />
            <Shortcut keys="Ctrl/Cmd + /" action="Toggle comment" />
            <Shortcut keys="Enter" action="Submit terminal input" />
          </ul>
        </section>
        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-slate-100">
            Browser Python limitations
          </h3>
          <p className="text-slate-400">
            Python runs in the browser via Pyodide/WebAssembly. It is great for
            learning but differs from desktop Python:
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4 text-slate-400">
            <li>No OS-level commands (<code>os.system</code>, subprocesses).</li>
            <li>Limited filesystem (a sandboxed virtual project folder).</li>
            <li>No arbitrary network sockets; HTTP needs browser APIs.</li>
            <li>No desktop GUI libraries (tkinter, PyQt).</li>
            <li>
              No true multiprocessing; threading is limited by the GIL/WASM.
            </li>
            <li>
              Only packages shipped by Pyodide or installable as pure-Python
              wheels work.
            </li>
          </ul>
        </section>
        <section className="rounded bg-white/5 p-2.5 text-slate-400">
          All execution happens locally in your browser through a Web Worker.
          Your code is never sent to a server.
        </section>
      </div>
    </Modal>
  );
}

export function QuickOpenModal({
  files,
  onOpen,
  onClose,
}: {
  files: PyNode[];
  onOpen: (id: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return files.filter((f) => f.kind === "file" && f.name.toLowerCase().includes(q));
  }, [files, query]);

  return (
    <Modal title="Quick Open" onClose={onClose}>
      <div className="p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files by name…"
            className="w-full rounded border border-white/10 bg-[#0b0e14] py-2 pl-8 pr-2 text-sm text-slate-200 outline-none focus:border-sky-500/60"
          />
        </div>
        <div className="mt-2 max-h-72 overflow-auto">
          {filtered.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                onOpen(f.id);
                onClose();
              }}
              className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-slate-300 hover:bg-white/5"
            >
              <FileCode2 className="h-4 w-4 text-sky-400" />
              {f.name}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-2 py-3 text-xs text-slate-600">No files found.</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export function HistoryModal({
  history,
  onClose,
}: {
  history: HistoryEntry[];
  onClose: () => void;
}) {
  return (
    <Modal title="Run History" onClose={onClose}>
      <div className="p-3">
        {history.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-slate-600">
            No runs yet.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
            {history.map((h) => (
              <div
                key={h.id}
                className="flex items-center gap-3 px-2 py-2 text-xs"
              >
                {h.outcome === "success" ? (
                  <CircleCheck className="h-4 w-4 text-emerald-400" />
                ) : h.outcome === "error" ? (
                  <CircleX className="h-4 w-4 text-rose-400" />
                ) : (
                  <Clock className="h-4 w-4 text-amber-400" />
                )}
                <span className="text-slate-500">
                  {new Date(h.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="flex-1 truncate text-slate-200">
                  {h.filename}
                </span>
                <span className="capitalize text-slate-400">{h.outcome}</span>
                <span className="text-slate-500">
                  {(h.durationMs / 1000).toFixed(2)}s
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between text-xs text-slate-300">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          checked ? "bg-sky-500" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "left-4" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 text-slate-200">{value}</div>
    </div>
  );
}

function Shortcut({ keys, action }: { keys: string; action: string }) {
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="text-slate-400">{action}</span>
      <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
        {keys}
      </kbd>
    </li>
  );
}
