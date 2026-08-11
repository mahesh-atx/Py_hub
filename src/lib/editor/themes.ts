import { loader } from "@monaco-editor/react";
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



let themesRegistered = false;

export function registerMonacoThemes(monaco: any) {
  if (themesRegistered) return;
  themesRegistered = true;
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
