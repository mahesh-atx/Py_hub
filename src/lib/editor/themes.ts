import { loader } from "@monaco-editor/react";
import * as bundledMonaco from "monaco-editor";
import dracula from "./themes/Dracula.json";
import monokai from "./themes/Monokai.json";
import githubDark from "./themes/GitHub Dark.json";
import nightOwl from "./themes/Night Owl.json";
import nord from "./themes/Nord.json";
import cobalt2 from "./themes/Cobalt2.json";
import solarizedDark from "./themes/Solarized-dark.json";
import tomorrowNight from "./themes/Tomorrow-Night.json";
import twilight from "./themes/Twilight.json";
import kuroir from "./themes/Kuroir Theme.json";
import oceanicNext from "./themes/Oceanic Next.json";
import tomorrowNightEighties from "./themes/Tomorrow-Night-Eighties.json";
import tomorrowNightBlue from "./themes/Tomorrow-Night-Blue.json";
import sunburst from "./themes/Sunburst.json";
import idleFingers from "./themes/idleFingers.json";
import vibrantInk from "./themes/Vibrant Ink.json";
import brillianceBlack from "./themes/Brilliance Black.json";
import vsCodeDark from "./themes/Dark (Visual Studio).json";
import visualStudioDark from "./themes/Visual Studio Dark.json";
import darkModern from "./themes/Dark Modern.json";
import darkPlus from "./themes/Dark+.json";
import kimbieDark from "./themes/Kimbie Dark.json";
import monochrome from "./themes/Monochrome.json";
import monochromeGithubEdition from "./themes/Monochrome (GitHub Edition).json";
import monochromeDark from "./themes/Monochrome Dark.json";
import monochromeDarkAmplified from "./themes/Monochrome Dark Amplified.json";
import monochromeDarkCoolGray from "./themes/Monochrome Dark Cool Gray.json";


if (typeof self !== "undefined") {
  (self as typeof self & { MonacoEnvironment?: unknown }).MonacoEnvironment = {
    getWorker: () =>
      new Worker(new URL("../../workers/monaco.worker.ts", import.meta.url), {
        type: "module",
      }),
  };
}

loader.config({ monaco: bundledMonaco });

const THEME_UI_COLORS: Record<string, Record<string, string>> = {
  "dark-vs": (vsCodeDark as any).colors,
  "visual-studio-dark": (visualStudioDark as any).colors,
  "dark-modern": (darkModern as any).colors,
  "dark-plus": (darkPlus as any).colors,
  "kimbie-dark": (kimbieDark as any).colors,
  monochrome: (monochrome as any).colors,
  "monochrome-github-edition": (monochromeGithubEdition as any).colors,
  "monochrome-dark": (monochromeDark as any).colors,
  "monochrome-dark-amplified": (monochromeDarkAmplified as any).colors,
  "monochrome-dark-cool-gray": (monochromeDarkCoolGray as any).colors,
};

const PICK_KEYS: Record<string, string[]> = {
  "--vscode-bg": ["editor.background"],
  "--vscode-sidebar-bg": ["sideBar.background"],
  "--vscode-border": [
    "sideBar.border",
    "panel.border",
    "editorGroup.border",
    "activityBar.border",
    "widget.border",
    "tab.border",
    "dropdown.border",
  ],
  "--vscode-hover": [
    "list.activeSelectionBackground",
    "list.hoverBackground",
    "editor.lineHighlightBackground",
  ],
  "--vscode-input": [
    "input.background",
    "dropdown.background",
    "checkbox.background",
    "editorWidget.background",
    "quickInput.background",
  ],
  "--vscode-accent": [
    "focusBorder",
    "textLink.foreground",
    "activityBarBadge.background",
    "progressBar.background",
    "button.background",
  ],
  "--vscode-text": ["editor.foreground"],
  "--vscode-text-muted": [
    "descriptionForeground",
    "input.placeholderForeground",
    "editorLineNumber.foreground",
    "tab.inactiveForeground",
    "sideBarSectionHeader.foreground",
  ],
};

function hexToRgba(hex: string): [number, number, number, number] | null {
  const m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(hex);
  if (!m) return null;
  return [
    parseInt(m[1].slice(0, 2), 16),
    parseInt(m[1].slice(2, 4), 16),
    parseInt(m[1].slice(4, 6), 16),
    m[2] ? parseInt(m[2], 16) : 255,
  ];
}

function visible(hex: string): boolean {
  const rgba = hexToRgba(hex);
  return !!rgba && rgba[3] >= 51;
}

function luminance(hex: string): number {
  const rgba = hexToRgba(hex);
  if (!rgba) return 0;
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(rgba[0]) + 0.7152 * lin(rgba[1]) + 0.0722 * lin(rgba[2]);
}

function mix(hex: string, target: string, amount: number): string {
  const a = hexToRgba(hex);
  const b = hexToRgba(target);
  if (!a || !b) return hex;
  return (
    "#" +
    a
      .slice(0, 3)
      .map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, "0"))
      .join("")
  );
}

function isGoodBorder(value: string, bgLum: number): boolean {
  const rgba = hexToRgba(value);
  if (!rgba || rgba[3] < 51) return false;
  if (rgba[3] < 204) {
    return Math.abs(luminance(value) - bgLum) >= 0.02;
  }
  return true;
}

export function getThemeCssVariables(
  themeId: string,
): Record<string, string> | undefined {
  const colors = THEME_UI_COLORS[themeId];
  if (!colors) return undefined;
  const vars: Record<string, string> = {};
  const bg = colors["editor.background"];
  if (!bg) return undefined;
  const bgLum = luminance(bg);
  vars["--vscode-bg"] = bg;
  const sidebar = colors["sideBar.background"];
  if (sidebar && visible(sidebar)) vars["--vscode-sidebar-bg"] = sidebar;
  for (const [cssVar, keys] of Object.entries(PICK_KEYS)) {
    if (cssVar === "--vscode-bg") continue;
    for (const key of keys) {
      const value = colors[key];
      if (
        value &&
        visible(value) &&
        value.toLowerCase() !== bg.toLowerCase() &&
        (cssVar !== "--vscode-border" || isGoodBorder(value, bgLum))
      ) {
        vars[cssVar] = value;
        break;
      }
    }
  }
  if (vars["--vscode-hover"]) {
    if (Math.abs(luminance(vars["--vscode-hover"]) - bgLum) < 0.05) {
      vars["--vscode-hover"] = mix(bg, bgLum < 0.5 ? "#ffffff" : "#000000", 0.12);
    }
  }
  if (vars["--vscode-accent"]) {
    if (Math.abs(luminance(vars["--vscode-accent"]) - bgLum) < 0.05) {
      vars["--vscode-accent"] = mix(bg, bgLum < 0.5 ? "#ffffff" : "#000000", 0.35);
    }
  }
  if (vars["--vscode-text-muted"]) {
    if (Math.abs(luminance(vars["--vscode-text-muted"]) - bgLum) < 0.05) {
      vars["--vscode-text-muted"] = mix(bg, bgLum < 0.5 ? "#ffffff" : "#000000", 0.22);
    }
  }
  const statusBg = colors["statusBar.background"];
  const derivedStatusBg = mix(bg, bgLum < 0.5 ? "#ffffff" : "#000000", 0.08);
  vars["--vscode-statusbar-bg"] =
    statusBg && visible(statusBg) && luminance(statusBg) < 0.45 && statusBg.toLowerCase() !== bg.toLowerCase()
      ? statusBg
      : derivedStatusBg;
  const statusFg = colors["statusBar.foreground"];
  if (statusFg && visible(statusFg)) {
    vars["--vscode-statusbar-fg"] = statusFg;
  }
  return vars;
}

let themesRegistered = false;

export function registerMonacoThemes(monaco: any) {
  if (themesRegistered) return;
  themesRegistered = true;
  monaco.editor.defineTheme("pylab-accessible-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "AAB4C3", fontStyle: "italic" },
      { token: "keyword", foreground: "8CC8FF" },
      { token: "number", foreground: "B8E6B1" },
      { token: "string", foreground: "F0C6A6" },
      { token: "type", foreground: "8EDDD1" },
      { token: "identifier", foreground: "E6E6E6" },
    ],
    colors: {
      "editor.background": "#1E1E1E",
      "editor.foreground": "#E6E6E6",
      "editorLineNumber.foreground": "#9A9A9A",
      "editorCursor.foreground": "#FFFFFF",
    },
  });
  monaco.editor.defineTheme("dracula", dracula as any);
  monaco.editor.defineTheme("monokai", monokai as any);
  monaco.editor.defineTheme("github-dark", githubDark as any);
  monaco.editor.defineTheme("night-owl", nightOwl as any);
  monaco.editor.defineTheme("nord", nord as any);
  monaco.editor.defineTheme("cobalt2", cobalt2 as any);
  monaco.editor.defineTheme("solarized-dark", solarizedDark as any);
  monaco.editor.defineTheme("tomorrow-night", tomorrowNight as any);
  monaco.editor.defineTheme("twilight", twilight as any);
  monaco.editor.defineTheme("kuroir", kuroir as any);
  monaco.editor.defineTheme("oceanic-next", oceanicNext as any);
  monaco.editor.defineTheme("tomorrow-night-eighties", tomorrowNightEighties as any);
  monaco.editor.defineTheme("tomorrow-night-blue", tomorrowNightBlue as any);
  monaco.editor.defineTheme("sunburst", sunburst as any);
  monaco.editor.defineTheme("idle-fingers", idleFingers as any);
  monaco.editor.defineTheme("vibrant-ink", vibrantInk as any);
  monaco.editor.defineTheme("brilliance-black", brillianceBlack as any);
  monaco.editor.defineTheme("dark-vs", vsCodeDark as any);
  monaco.editor.defineTheme("visual-studio-dark", visualStudioDark as any);
  monaco.editor.defineTheme("dark-modern", darkModern as any);
  monaco.editor.defineTheme("dark-plus", darkPlus as any);
  monaco.editor.defineTheme("kimbie-dark", kimbieDark as any);
  monaco.editor.defineTheme("monochrome", monochrome as any);
  monaco.editor.defineTheme("monochrome-github-edition", monochromeGithubEdition as any);
  monaco.editor.defineTheme("monochrome-dark", monochromeDark as any);
  monaco.editor.defineTheme("monochrome-dark-amplified", monochromeDarkAmplified as any);
  monaco.editor.defineTheme("monochrome-dark-cool-gray", monochromeDarkCoolGray as any);
}
