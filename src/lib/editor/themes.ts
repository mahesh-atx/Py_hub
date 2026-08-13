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


if (typeof self !== "undefined") {
  (self as typeof self & { MonacoEnvironment?: unknown }).MonacoEnvironment = {
    getWorker: () =>
      new Worker(new URL("../../workers/monaco.worker.ts", import.meta.url), {
        type: "module",
      }),
  };
}

loader.config({ monaco: bundledMonaco });

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
}
