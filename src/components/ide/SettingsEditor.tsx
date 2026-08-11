import { IdeSettings } from "@/lib/settings";
import { useState } from "react";
import { Search } from "lucide-react";

interface SettingsEditorProps {
  settings: IdeSettings;
  onChange: (s: Partial<IdeSettings>) => void;
}

export function SettingsEditor({ settings, onChange }: SettingsEditorProps) {
  const [activeCategory, setActiveCategory] = useState("Commonly Used");
  
  const categories = [
    "Commonly Used",
    "Text Editor",
    "Workbench",
    "Window",
    "Features",
    "Application",
    "Extensions"
  ];

  return (
    <div className="absolute inset-0 bg-[var(--vscode-bg)] text-[var(--vscode-text)] flex flex-col font-sans">
      {/* Header Search */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-[var(--vscode-border)] bg-[var(--vscode-bg)]">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[var(--vscode-text-muted)]" />
          </div>
          <input
            type="text"
            className="w-full bg-[var(--vscode-input)] border border-transparent focus:border-[var(--vscode-accent)] text-[var(--vscode-text)] text-[13px] rounded-sm py-1.5 pl-8 pr-2 outline-none transition-colors"
            placeholder="Search settings"
          />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-[200px] flex-shrink-0 overflow-y-auto py-2">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 text-[13px] cursor-pointer ${
                activeCategory === cat
                  ? "bg-[var(--vscode-hover)] text-[var(--vscode-text)]"
                  : "text-[var(--vscode-text)] hover:bg-[var(--vscode-hover)]"
              }`}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 px-8">
          <div className="max-w-3xl">
            <h2 className="text-xl text-[var(--vscode-text)] font-normal mb-8">{activeCategory}</h2>

            <div className="space-y-8">
              {/* Theme */}
              {(activeCategory === "Commonly Used" || activeCategory === "Workbench") && (
                <div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-1">
                    Workbench: <span className="text-[var(--vscode-text)] font-medium">Color Theme</span>
                  </div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-2 leading-relaxed">
                    Specifies the color theme used in the workbench.
                  </div>
                  <select
                    value={settings.theme}
                    onChange={(e) => onChange({ theme: e.target.value as IdeSettings["theme"] })}
                    className="w-64 bg-[var(--vscode-input)] border border-[var(--vscode-input)] rounded-sm px-2 py-1 text-[13px] outline-none focus:border-[var(--vscode-accent)]"
                  >
                    <option value="vs-dark">Dark (VS Code)</option>
                    <option value="light">Light (VS Code)</option>
                    <option value="dracula">Dracula</option>
                    <option value="github-dark">GitHub Dark</option>
                    <option value="monokai">Monokai</option>
                    <option value="night-owl">Night Owl</option>
                    <option value="nord">Nord</option>
                    <option value="oceanic-next">Oceanic Next (Premium)</option>
                    <option value="cobalt2">Cobalt2</option>
                    <option value="solarized-dark">Solarized Dark</option>
                    <option value="tomorrow-night">Tomorrow Night</option>
                    <option value="tomorrow-night-eighties">Tomorrow Night Eighties (Premium)</option>
                    <option value="tomorrow-night-blue">Tomorrow Night Blue (Premium)</option>
                    <option value="sunburst">Sunburst (Premium)</option>
                    <option value="idle-fingers">Idle Fingers (Premium)</option>
                    <option value="vibrant-ink">Vibrant Ink (Premium)</option>
                    <option value="brilliance-black">Brilliance Black (Premium)</option>
                    <option value="twilight">Twilight</option>
                    <option value="kuroir">Kuroir</option>
                  </select>
                </div>
              )}

              {/* Font Size */}
              {(activeCategory === "Commonly Used" || activeCategory === "Text Editor") && (
                <div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-1">
                    Editor: <span className="text-[var(--vscode-text)] font-medium">Font Size</span>
                  </div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-2 leading-relaxed">
                    Controls the font size in pixels.
                  </div>
                  <input
                    type="number"
                    value={settings.fontSize}
                    onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
                    className="w-32 bg-[var(--vscode-input)] border border-transparent focus:border-[var(--vscode-accent)] px-2 py-1 outline-none text-[13px] rounded-sm"
                  />
                </div>
              )}

              {/* Tab Size */}
              {(activeCategory === "Commonly Used" || activeCategory === "Text Editor") && (
                <div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-1">
                    Editor: <span className="text-[var(--vscode-text)] font-medium">Tab Size</span>
                  </div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-2 leading-relaxed">
                    The number of spaces a tab is equal to.
                  </div>
                  <input
                    type="number"
                    value={settings.tabSize}
                    onChange={(e) => onChange({ tabSize: Number(e.target.value) })}
                    className="w-32 bg-[var(--vscode-input)] border border-transparent focus:border-[var(--vscode-accent)] px-2 py-1 outline-none text-[13px] rounded-sm"
                  />
                </div>
              )}

              {/* Word Wrap */}
              {(activeCategory === "Commonly Used" || activeCategory === "Text Editor") && (
                <div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-1">
                    Editor: <span className="text-[var(--vscode-text)] font-medium">Word Wrap</span>
                  </div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-2 leading-relaxed">
                    Controls how lines should wrap.
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="wordWrap"
                      checked={settings.wordWrap}
                      onChange={(e) => onChange({ wordWrap: e.target.checked })}
                      className="h-4 w-4 accent-[var(--vscode-accent)]"
                    />
                    <label htmlFor="wordWrap" className="text-[13px] cursor-pointer">
                      on
                    </label>
                  </div>
                </div>
              )}

              {/* Minimap */}
              {(activeCategory === "Text Editor") && (
                <div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-1">
                    Editor › Minimap: <span className="text-[var(--vscode-text)] font-medium">Enabled</span>
                  </div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-2 leading-relaxed">
                    Controls whether the minimap is shown.
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="minimap"
                      checked={settings.minimap}
                      onChange={(e) => onChange({ minimap: e.target.checked })}
                      className="h-4 w-4 accent-[var(--vscode-accent)]"
                    />
                  </div>
                </div>
              )}

              {/* Terminal Timeout */}
              {(activeCategory === "Features" || activeCategory === "Commonly Used") && (
                <div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-1">
                    Terminal: <span className="text-[var(--vscode-text)] font-medium">Timeout</span>
                  </div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-2 leading-relaxed">
                    The maximum time in seconds the Python runtime is allowed to run before being terminated.
                  </div>
                  <input
                    type="number"
                    value={settings.timeoutMs / 1000}
                    onChange={(e) => onChange({ timeoutMs: Math.max(1, Number(e.target.value)) * 1000 })}
                    className="w-32 bg-[var(--vscode-input)] border border-transparent focus:border-[var(--vscode-accent)] px-2 py-1 outline-none text-[13px] rounded-sm"
                  />
                </div>
              )}

              {/* Clear Terminal */}
              {(activeCategory === "Features" || activeCategory === "Commonly Used") && (
                <div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-1">
                    Terminal: <span className="text-[var(--vscode-text)] font-medium">Clear On Run</span>
                  </div>
                  <div className="text-[13px] text-[var(--vscode-text)] mb-2 leading-relaxed">
                    Whether to clear the terminal output before each execution.
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="clearOnRun"
                      checked={settings.clearOnRun}
                      onChange={(e) => onChange({ clearOnRun: e.target.checked })}
                      className="h-4 w-4 accent-[var(--vscode-accent)]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
