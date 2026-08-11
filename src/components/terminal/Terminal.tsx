"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { terminalStore } from "@/lib/terminal/store";
import type { SegmentKind } from "@/lib/terminal/types";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";

interface TerminalProps {
  onInput: (value: string, eof?: boolean) => void;
  onClear: () => void;
}

const ANSI_KIND: Record<SegmentKind, string> = {
  stdout: "\x1b[0m",
  stderr: "\x1b[38;5;203m", // Red
  input: "\x1b[38;5;114m", // Green
  system: "\x1b[3;38;5;244m", // Italic Gray
  prompt: "\x1b[38;5;179m", // Yellow
  result: "\x1b[38;5;117m", // Light Blue
};

export function Terminal({ onInput, onClear }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  
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
      fontSize: 13,
      theme: {
        background: "transparent",
        foreground: "#cccccc",
        cursor: "#cccccc",
        black: "#000000",
        red: "#cd3131",
        green: "#0dbc79",
        yellow: "#e5e510",
        blue: "#2472c8",
        magenta: "#bc3fbc",
        cyan: "#11a8cd",
        white: "#e5e5e5",
      },
      cursorBlink: true,
      convertEol: true,
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    xterm.loadAddon(new WebLinksAddon());

    xterm.open(containerRef.current);
    fitAddon.fit();

    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;

    // Handle Copy (Ctrl+C / Cmd+C)
    xterm.attachCustomKeyEventHandler((e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && xterm.hasSelection()) {
        navigator.clipboard.writeText(xterm.getSelection());
        return false; // Prevent default xterm behavior
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
          onInput(val, false);
        } else if (isBackspace) {
          if (inputBufferRef.current.length > 0) {
            xterm.write("\b \b");
            inputBufferRef.current = inputBufferRef.current.slice(0, -1);
          }
        } else if (isCtrlC || isCtrlD) {
          inputBufferRef.current = "";
          onInput("", true);
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

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-[var(--vscode-bg)] p-2 overflow-hidden"
    />
  );
}
