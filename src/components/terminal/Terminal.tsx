"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { terminalStore } from "@/lib/terminal/store";
import type { SegmentKind } from "@/lib/terminal/types";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { SearchAddon } from "@xterm/addon-search";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import "@xterm/xterm/css/xterm.css";

interface TerminalProps {
  onInput: (value: string, eof?: boolean) => void;
  onClear: () => void;
  onInterrupt?: () => void;
}

const ANSI_KIND: Record<SegmentKind, string> = {
  stdout: "\x1b[0m",
  stderr: "\x1b[31m", // Red -> Rose 500
  input: "\x1b[32m", // Green -> Emerald 500
  system: "\x1b[3;90m", // Italic Bright Black -> Gray
  prompt: "\x1b[33m", // Yellow -> Amber 500
  result: "\x1b[36m", // Cyan -> Sky 500
};

export function Terminal({ onInput, onClear, onInterrupt }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const searchAddonRef = useRef<SearchAddon | null>(null);
  const callbacksRef = useRef({ onInput, onClear, onInterrupt });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    callbacksRef.current = { onInput, onClear, onInterrupt };
  }, [onInput, onClear, onInterrupt]);
  
  const snap = useSyncExternalStore(
    terminalStore.subscribe,
    terminalStore.getSnapshot,
  );

  const inputBufferRef = useRef("");

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize xterm
    const xterm = new XTerm({
      fontFamily: "Consolas, 'Courier New', monospace",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: 0,
      theme: {
        background: "transparent",
        foreground: "#cccccc", // classic terminal foreground
        cursor: "#cccccc",     // classic block cursor
        cursorAccent: "#000000",
        selectionBackground: "rgba(255, 255, 255, 0.3)",
        black: "#000000",
        red: "#cd3131",
        green: "#0dbc79",
        yellow: "#e5e510",
        blue: "#2472c8",
        magenta: "#bc3fbc",
        cyan: "#11a8cd",
        white: "#e5e5e5",
        brightBlack: "#a6a6a6",
        brightRed: "#ff7b72",
        brightGreen: "#56d4a0",
        brightYellow: "#f2e96b",
        brightBlue: "#79b8ff",
        brightMagenta: "#d98bd9",
        brightCyan: "#70d7eb",
        brightWhite: "#ffffff",
      },
      cursorBlink: true,
      cursorStyle: "block",
      convertEol: true,
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    const searchAddon = new SearchAddon();
    xterm.loadAddon(fitAddon);
    xterm.loadAddon(searchAddon);
    xterm.loadAddon(new WebLinksAddon());

    xterm.open(containerRef.current);
    fitAddon.fit();

    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;
    searchAddonRef.current = searchAddon;

    // Copy selected text, interrupt otherwise, and expose terminal search.
    xterm.attachCustomKeyEventHandler((event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
        event.preventDefault();
        setSearchOpen(true);
        return false;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
        callbacksRef.current.onClear();
        return false;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
        if (xterm.hasSelection()) {
          void navigator.clipboard.writeText(xterm.getSelection());
        } else {
          callbacksRef.current.onInterrupt?.();
        }
        return false;
      }
      return true;
    });

    // Dump history
    const historyData = snap.lines.map(line => {
      return line.segments.map(seg => `${ANSI_KIND[seg.kind] || "\x1b[0m"}${seg.text}`).join("");
    }).join("\r\n");
    if (historyData) xterm.write(historyData + "\r\n\x1b[0m");

    // Handle input stream
    xterm.onData((data) => {
      const isEnter = data === "\r";
      const isBackspace = data === "\x7f";
      const isCtrlC = data === "\x03";
      const isCtrlD = data === "\x04";

      // Allow typing if waiting for input
      if (terminalStore.getSnapshot().awaitingInput) {
        if (isEnter) {
          xterm.write("\r\n");
          const val = inputBufferRef.current;
          inputBufferRef.current = "";
          callbacksRef.current.onInput(val, false);
        } else if (isBackspace) {
          if (inputBufferRef.current.length > 0) {
            xterm.write("\b \b");
            inputBufferRef.current = inputBufferRef.current.slice(0, -1);
          }
        } else if (isCtrlC) {
          inputBufferRef.current = "";
          callbacksRef.current.onInterrupt?.();
        } else if (isCtrlD) {
          inputBufferRef.current = "";
          callbacksRef.current.onInput("", true);
        } else {
          // Normal printable chars
          if (data >= String.fromCharCode(0x20) && data <= String.fromCharCode(0x7E)) {
            inputBufferRef.current += data;
            xterm.write(data);
          }
        }
      }
    });

    const observer = new ResizeObserver(() => {
      fitAddon.fit();
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      xterm.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Mount only once

  // Sync new lines from terminalStore
  // We use a ref to track what we've already written
  const lastLineCount = useRef(snap.lines.length);
  const pendingWritten = useRef(false);

  useEffect(() => {
    if (!xtermRef.current) return;
    const xterm = xtermRef.current;

    // If terminalStore cleared, clear xterm
    if (snap.lines.length === 0 && lastLineCount.current > 0) {
      xterm.clear();
      lastLineCount.current = 0;
      pendingWritten.current = false;
      return;
    }

    // A previously rendered partial line is about to become a full line. Clear
    // its local rendering first so streamed chunks are never duplicated.
    if (snap.lines.length > lastLineCount.current && pendingWritten.current) {
      xterm.write("\x1b[2K\r");
      pendingWritten.current = false;
    }

    // Write new full lines
    for (let i = lastLineCount.current; i < snap.lines.length; i++) {
      const line = snap.lines[i];
      
      // If the last segment is an input segment, we skip writing it because 
      // our local echo already printed it to the screen.
      // But if we are mounting (lastLineCount was 0 and we're catching up), we DO write it.
      if (lastLineCount.current > 0 && line.segments.length > 0 && line.segments[line.segments.length - 1].kind === "input") {
        // Skip writing the input echo to xterm to avoid duplicate
        continue;
      }

      const str = line.segments.map(seg => `${ANSI_KIND[seg.kind] || "\x1b[0m"}${seg.text}`).join("");
      xterm.write(str + "\r\n\x1b[0m");
    }
    lastLineCount.current = snap.lines.length;

    // In a real streaming terminal, we'd write chunks immediately. 
    // Since terminalStore gives us lines and "pending" segments, we must carefully
    // handle partial lines without duplicating.
    // If there are pending segments, and we haven't written them (or if they changed),
    // wait... this is tricky because pending accumulates.
    // A better approach is to let terminalStore push to a raw stream and bypass its line logic for xterm.
    // But since we are mapping terminalStore -> xterm, we can just rewrite the current line by using carriage return
    // if there are pending segments.
    if (snap.pending.length > 0) {
      // Clear current line and rewrite pending
      // (This assumes pending is a single line, which it is, as terminalStore splits by \n)
      xterm.write('\x1b[2K\r'); // clear line
      const str = snap.pending.map(seg => `${ANSI_KIND[seg.kind] || "\x1b[0m"}${seg.text}`).join("");
      xterm.write(str + "\x1b[0m");
      pendingWritten.current = true;
    } else if (pendingWritten.current) {
      // The pending line was just completed and pushed to snap.lines, so the loop above wrote it with \r\n.
      pendingWritten.current = false;
    }

  }, [snap.lines, snap.pending]);

  // Auto-focus terminal when input is requested
  useEffect(() => {
    if (snap.awaitingInput && xtermRef.current) {
      // Slight delay ensures the UI pane has fully rendered/switched before focusing
      setTimeout(() => {
        xtermRef.current?.focus();
      }, 50);
    }
  }, [snap.awaitingInput]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent pl-4 pr-2 py-3">
      {searchOpen && (
        <div className="absolute right-3 top-2 z-20 flex items-center gap-1 rounded border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)] p-1 shadow-xl">
          <Search className="ml-1 h-3.5 w-3.5 text-[var(--vscode-text-muted)]" />
          <input
            autoFocus
            value={searchQuery}
            onChange={(event) => {
              const value = event.target.value;
              setSearchQuery(value);
              if (value) searchAddonRef.current?.findNext(value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && searchQuery) {
                event.shiftKey
                  ? searchAddonRef.current?.findPrevious(searchQuery)
                  : searchAddonRef.current?.findNext(searchQuery);
              } else if (event.key === "Escape") {
                setSearchOpen(false);
                xtermRef.current?.focus();
              }
            }}
            placeholder="Find in terminal"
            aria-label="Find in terminal"
            className="w-44 bg-[var(--vscode-input)] px-2 py-1 text-xs text-[var(--vscode-text)] outline-none"
          />
          <button
            onClick={() => searchQuery && searchAddonRef.current?.findPrevious(searchQuery)}
            aria-label="Previous terminal match"
            className="p-1 hover:bg-[var(--vscode-hover)]"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => searchQuery && searchAddonRef.current?.findNext(searchQuery)}
            aria-label="Next terminal match"
            className="p-1 hover:bg-[var(--vscode-hover)]"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
              xtermRef.current?.focus();
            }}
            aria-label="Close terminal search"
            className="p-1 hover:bg-[var(--vscode-hover)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
