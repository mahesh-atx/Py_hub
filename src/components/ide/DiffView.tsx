"use client";

import { useMemo } from "react";

type DiffLine = { kind: "same" | "del" | "add"; text: string };

function lineDiff(a: string[], b: string[]): DiffLine[] {
  const n = a.length;
  const m = b.length;
  const dp: Int32Array[] = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push({ kind: "same", text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ kind: "del", text: a[i] });
      i++;
    } else {
      out.push({ kind: "add", text: b[j] });
      j++;
    }
  }
  while (i < n) out.push({ kind: "del", text: a[i++] });
  while (j < m) out.push({ kind: "add", text: b[j++] });
  return out;
}

function DiffRow({ line, index }: { line: DiffLine; index: number }) {
  if (line.kind === "same") {
    return (
      <div key={index} className="flex px-2 text-slate-400/70">
        <span className="w-8 shrink-0 select-none text-right pr-2 text-slate-600">{index}</span>
        <span className="whitespace-pre-wrap break-all">{line.text}</span>
      </div>
    );
  }
  if (line.kind === "del") {
    return (
      <div key={index} className="flex bg-rose-950/50 border-l-2 border-rose-500 px-2 text-rose-300">
        <span className="w-8 shrink-0 select-none text-right pr-2 text-rose-500/70">−</span>
        <span className="whitespace-pre-wrap break-all">{line.text}</span>
      </div>
    );
  }
  return (
    <div key={index} className="flex bg-emerald-950/50 border-l-2 border-emerald-500 px-2 text-emerald-300">
      <span className="w-8 shrink-0 select-none text-right pr-2 text-emerald-500/70">+</span>
      <span className="whitespace-pre-wrap break-all">{line.text}</span>
    </div>
  );
}

export default function DiffView({ expected, actual }: { expected: string; actual: string }) {
  const lines = useMemo(() => {
    const cap = 800;
    const e = expected.split("\n").slice(0, cap);
    const a = actual.split("\n").slice(0, cap);
    if (e.length === 0 && a.length === 0) return [] as DiffLine[];
    if (e.every(l => l === "") && a.every(l => l === "")) return [] as DiffLine[];
    return lineDiff(e, a);
  }, [expected, actual]);

  const added = lines.filter(l => l.kind === "add").length;
  const removed = lines.filter(l => l.kind === "del").length;

  return (
    <div className="rounded bg-black/30 border border-[var(--vscode-border)] overflow-hidden">
      <div className="flex items-center gap-3 px-2 py-1.5 bg-black/20 border-b border-[var(--vscode-border)] text-[10px] font-semibold uppercase tracking-wider text-[var(--vscode-text-muted)]">
        <span className="text-rose-400">− Expected: {removed} line{removed === 1 ? "" : "s"}</span>
        <span className="text-emerald-400">+ Your output: {added} line{added === 1 ? "" : "s"}</span>
      </div>
      <div className="max-h-64 overflow-y-auto py-1 font-mono text-[11px] leading-5">
        {lines.length === 0 ? (
          <div className="px-2 py-1 text-[var(--vscode-text-muted)]">No output. Your program printed nothing.</div>
        ) : (
          lines.map((l, i) => <DiffRow key={i} line={l} index={i + 1} />)
        )}
      </div>
    </div>
  );
}