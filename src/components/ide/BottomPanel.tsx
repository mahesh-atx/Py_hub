"use client";

import {
  BarChart3,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  Copy,
  Download,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import { Terminal } from "@/components/terminal/Terminal";
import DiffView from "@/components/ide/DiffView";
import { PanelEmptyState } from "@/components/ide/PanelEmptyState";

export type BottomPanelTab = "terminal" | "plots" | "tests";
export interface PracticeResult {
  passed: boolean;
  actual: string;
  expected: string;
  crashError?: string;
}

const toolbarButton =
  "flex min-h-9 min-w-9 items-center justify-center rounded text-[var(--vscode-text)] outline-none hover:bg-[var(--vscode-hover)] focus-visible:ring-2 focus-visible:ring-[var(--vscode-accent)]";

function PanelTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex min-h-9 items-center border-b px-1 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--vscode-accent)] ${
        active
          ? "border-sky-500 text-[var(--vscode-text)]"
          : "border-transparent text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
      }`}
    >
      {label}
    </button>
  );
}

export function BottomPanel({
  visible,
  isDesktop,
  height,
  tab,
  practiceActive,
  waitingInput,
  plots,
  results,
  onTab,
  onResizeStart,
  onRestart,
  onCopy,
  onDownload,
  onClear,
  onClose,
  onInput,
  onInterrupt,
}: {
  visible: boolean;
  isDesktop: boolean;
  height: number;
  tab: BottomPanelTab;
  practiceActive: boolean;
  waitingInput: boolean;
  plots: string[];
  results: PracticeResult[] | null;
  onTab: (tab: BottomPanelTab) => void;
  onResizeStart: () => void;
  onRestart: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
  onClose: () => void;
  onInput: (value: string, eof?: boolean) => void;
  onInterrupt: () => void;
}) {
  if (!visible) return null;

  return (
    <>
      {isDesktop && (
        <div
          role="separator"
          aria-label="Resize bottom panel"
          aria-orientation="horizontal"
          onMouseDown={onResizeStart}
          className="h-1 shrink-0 cursor-row-resize bg-[var(--vscode-border)] transition-colors hover:bg-[var(--vscode-accent)]"
        />
      )}
      <section
        aria-label="Output panel"
        className="flex min-h-0 flex-1 flex-col bg-[#050505] lg:flex-none"
        style={{ height: isDesktop ? height : undefined }}
      >
        <div className="flex min-h-10 items-center gap-5 px-3 text-[11px] font-medium uppercase tracking-wider text-[var(--vscode-text)]">
          <PanelTab label="TERMINAL" active={tab === "terminal"} onClick={() => onTab("terminal")} />
          <PanelTab label="PLOTS" active={tab === "plots"} onClick={() => onTab("plots")} />
          {practiceActive && (
            <PanelTab label="TESTS" active={tab === "tests"} onClick={() => onTab("tests")} />
          )}
          {waitingInput && (
            <span role="status" className="animate-pulse rounded bg-amber-500/20 px-2 py-1 normal-case tracking-normal text-amber-300">
              Waiting for input — Ctrl+C interrupts
            </span>
          )}

          <div className="ml-auto flex items-center gap-1">
            <button type="button" onClick={onRestart} className={toolbarButton} title="Restart Python Runtime" aria-label="Restart Python Runtime">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
            {tab === "terminal" && (
              <>
                <button type="button" onClick={onCopy} className={toolbarButton} title="Copy Output" aria-label="Copy Output">
                  <Copy className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={onDownload} className={toolbarButton} title="Download Output" aria-label="Download Output">
                  <Download className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={onClear} className={toolbarButton} title="Clear Terminal" aria-label="Clear Terminal">
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </>
            )}
            <button type="button" onClick={onClose} className={toolbarButton} title="Close Panel" aria-label="Close Panel">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          {tab === "terminal" ? (
            <Terminal onInput={onInput} onClear={onClear} onInterrupt={onInterrupt} />
          ) : tab === "plots" ? (
            <div className="flex h-full items-center gap-4 overflow-x-auto bg-[#050505] p-4">
              {plots.length ? (
                plots.map((src, index) => (
                  // Runtime plots are ephemeral data URLs and cannot use Next image optimization.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index}
                    src={src}
                    alt={`Plot ${index + 1}`}
                    className="h-full w-auto rounded border border-[var(--vscode-border)] bg-white object-contain"
                  />
                ))
              ) : (
                <PanelEmptyState
                  icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />}
                  title="No plots yet"
                  description="Run Python code that creates a Matplotlib figure. New figures will appear here automatically."
                />
              )}
            </div>
          ) : (
            <div className="h-full space-y-4 overflow-y-auto p-4">
              {results ? (
                results.map((result, index) => (
                  <div key={index} className="rounded border border-[var(--vscode-border)] bg-[var(--vscode-hover)] p-3 text-xs">
                    <div className="mb-2 flex items-center gap-2 border-b border-[var(--vscode-border)] pb-2">
                      {result.passed ? (
                        <CircleCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                      ) : (
                        <CircleX className="h-4 w-4 text-rose-400" aria-hidden="true" />
                      )}
                      <span className="text-sm font-medium text-[var(--vscode-text)]">
                        Test Case {index + 1} {result.passed ? "(Passed)" : "(Failed)"}
                      </span>
                    </div>
                    {!result.passed && <DiffView expected={result.expected} actual={result.actual || "(no output)"} />}
                    {result.crashError && (
                      <div className="mt-2 rounded bg-rose-950/30 border border-rose-900/50 p-2 overflow-x-auto text-[11px] font-mono text-rose-400">
                        <div className="font-semibold mb-1 text-rose-500 uppercase tracking-wider text-[10px]">Runtime Error</div>
                        <div className="whitespace-pre-wrap">{result.crashError}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <PanelEmptyState
                  icon={<ClipboardCheck className="h-5 w-5" aria-hidden="true" />}
                  title="No test results yet"
                  description="Open a practice challenge and choose Submit to run its automated checks."
                />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
