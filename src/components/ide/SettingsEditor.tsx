import { IdeSettings } from "@/lib/settings";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface SettingsEditorProps {
  settings: IdeSettings;
  onChange: (s: Partial<IdeSettings>) => void;
}

type SettingDef = {
  id: keyof IdeSettings;
  group: string;
  label: string;
  description: string;
  categories: string[];
  type: "select" | "number" | "boolean";
  options?: { value: string | number; label: string }[];
  transformOut?: (val: any) => any;
  transformIn?: (val: any) => any;
};

const SETTINGS_DEF: SettingDef[] = [
  {
    id: "theme",
    group: "Workbench",
    label: "Color Theme",
    description: "Specifies the color theme used in the workbench.",
    categories: ["Commonly Used", "Workbench"],
    type: "select",
    options: [
      { value: "pylab-accessible-dark", label: "PyLab Accessible Dark" },
      { value: "vs-dark", label: "Dark (VS Code)" },
      { value: "light", label: "Light (VS Code)" },
      { value: "dracula", label: "Dracula" },
      { value: "github-dark", label: "GitHub Dark" },
      { value: "monokai", label: "Monokai" },
      { value: "night-owl", label: "Night Owl" },
      { value: "nord", label: "Nord" },
      { value: "oceanic-next", label: "Oceanic Next (Premium)" },
      { value: "cobalt2", label: "Cobalt2" },
      { value: "solarized-dark", label: "Solarized Dark" },
      { value: "tomorrow-night", label: "Tomorrow Night" },
      { value: "tomorrow-night-eighties", label: "Tomorrow Night Eighties (Premium)" },
      { value: "tomorrow-night-blue", label: "Tomorrow Night Blue (Premium)" },
      { value: "sunburst", label: "Sunburst (Premium)" },
      { value: "idle-fingers", label: "Idle Fingers (Premium)" },
      { value: "vibrant-ink", label: "Vibrant Ink (Premium)" },
      { value: "brilliance-black", label: "Brilliance Black (Premium)" },
      { value: "ayu-dark", label: "Ayu Dark (Premium)" },
      { value: "one-dark-pro", label: "One Dark Pro (Premium)" },
      { value: "tokyo-night", label: "Tokyo Night (Premium)" },
      { value: "twilight", label: "Twilight" },
      { value: "kuroir", label: "Kuroir" },
    ]
  },
  {
    id: "iconStyle",
    group: "Application",
    label: "File Icon Theme",
    description: "Specifies the icon style used for files and folders in the explorer.",
    categories: ["Commonly Used", "Appearance"],
    type: "select",
    options: [
      { value: "lucide", label: "Lucide (Default)" },
      { value: "vscode", label: "VS Code Icons" },
      { value: "minimal", label: "Minimalist / Monochrome" },
    ]
  },
  {
    id: "uiFont",
    group: "Application",
    label: "UI Font",
    description: "Specifies the font family used for the user interface.",
    categories: ["Commonly Used", "Application"],
    type: "select",
    options: [
      { value: "system", label: "System Default" },
      { value: "plus-jakarta", label: "Plus Jakarta Sans (Premium)" },
      { value: "outfit", label: "Outfit (Premium)" },
      { value: "inter", label: "Inter (Premium)" },
      { value: "space-grotesk", label: "Space Grotesk (Premium)" },
    ]
  },
  {
    id: "editorFont",
    group: "Editor",
    label: "Font Family",
    description: "Specifies the font family used in the code editor and terminal.",
    categories: ["Commonly Used", "Text Editor"],
    type: "select",
    options: [
      { value: "system", label: "System Default" },
      { value: "fira-code", label: "Fira Code (Premium, with ligatures)" },
      { value: "jetbrains-mono", label: "JetBrains Mono (Premium)" },
      { value: "source-code-pro", label: "Source Code Pro (Premium)" },
    ]
  },
  {
    id: "fontSize",
    group: "Editor",
    label: "Font Size",
    description: "Controls the font size in pixels.",
    categories: ["Commonly Used", "Text Editor"],
    type: "number"
  },
  {
    id: "tabSize",
    group: "Editor",
    label: "Tab Size",
    description: "The number of spaces a tab is equal to.",
    categories: ["Commonly Used", "Text Editor"],
    type: "number"
  },
  {
    id: "wordWrap",
    group: "Editor",
    label: "Word Wrap",
    description: "Controls how lines should wrap.",
    categories: ["Commonly Used", "Text Editor"],
    type: "boolean"
  },
  {
    id: "minimap",
    group: "Editor › Minimap",
    label: "Enabled",
    description: "Controls whether the minimap is shown.",
    categories: ["Text Editor"],
    type: "boolean"
  },
  {
    id: "timeoutMs",
    group: "Terminal",
    label: "Timeout",
    description: "The maximum time in seconds the Python runtime is allowed to run before being terminated.",
    categories: ["Features", "Commonly Used"],
    type: "number",
    transformIn: (val: number) => val / 1000,
    transformOut: (val: number) => Math.max(1, val) * 1000
  },
  {
    id: "clearOnRun",
    group: "Terminal",
    label: "Clear On Run",
    description: "Whether to clear the terminal output before each execution.",
    categories: ["Features", "Commonly Used"],
    type: "boolean"
  }
];

export function SettingsEditor({ settings, onChange }: SettingsEditorProps) {
  const [activeCategory, setActiveCategory] = useState("Commonly Used");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    "Commonly Used",
    "Text Editor",
    "Workbench",
    "Window",
    "Features",
    "Application",
    "Extensions"
  ];

  const filteredSettings = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return SETTINGS_DEF.filter(s => 
        s.label.toLowerCase().includes(q) || 
        s.group.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      );
    }
    return SETTINGS_DEF.filter(s => s.categories.includes(activeCategory));
  }, [activeCategory, searchQuery]);

  return (
    <div className="absolute inset-0 bg-[var(--vscode-bg)] text-[var(--vscode-text)] flex flex-col font-sans">
      {/* Header Search */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-[var(--vscode-border)] bg-[var(--vscode-bg)]">
        <div className="relative max-w-2xl group">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[var(--vscode-text-muted)] group-focus-within:text-[var(--vscode-accent)] transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--vscode-input)] border border-[var(--vscode-border)] focus:border-[var(--vscode-accent)] text-[var(--vscode-text)] text-[13px] rounded py-1.5 pl-9 pr-2 outline-none transition-all shadow-sm focus:shadow-[0_0_0_1px_var(--vscode-accent)]"
            placeholder="Search settings"
          />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-[220px] flex-shrink-0 overflow-y-auto py-3 pr-2 border-r border-[var(--vscode-border)]">
          {categories.map((cat) => {
            const isMatch = !searchQuery.trim() && activeCategory === cat;
            return (
              <div
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                className={`px-4 py-1.5 text-[13px] cursor-pointer border-l-2 transition-colors ${
                  isMatch
                    ? "bg-[var(--vscode-hover)] text-[var(--vscode-text)] border-[var(--vscode-accent)] font-medium"
                    : "text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] border-transparent hover:bg-[var(--vscode-hover)]/50"
                }`}
              >
                {cat}
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 px-8 bg-[var(--vscode-bg)]">
          <div className="max-w-3xl">
            <h2 className="text-[22px] text-[var(--vscode-text)] font-light mb-8 pb-4 border-b border-[var(--vscode-border)]">
              {searchQuery.trim() ? "Search Results" : activeCategory}
            </h2>

            <div className="space-y-10">
              {filteredSettings.length === 0 ? (
                <div className="text-[var(--vscode-text-muted)] text-[13px] py-4">No settings found.</div>
              ) : (
                filteredSettings.map(setting => {
                  const val = setting.transformIn ? setting.transformIn(settings[setting.id]) : settings[setting.id];
                  
                  return (
                    <div key={setting.id} className="group">
                      <div className="text-[14px] text-[var(--vscode-text)] mb-1">
                        <span className="text-[var(--vscode-text-muted)]">{setting.group}: </span>
                        <span className="font-medium">{setting.label}</span>
                      </div>
                      <div className="text-[13px] text-[var(--vscode-text-muted)] mb-3 leading-relaxed max-w-2xl">
                        {setting.description}
                      </div>
                      
                      {setting.type === "select" && (
                        <select
                          value={val as string}
                          onChange={(e) => {
                            const out = setting.transformOut ? setting.transformOut(e.target.value) : e.target.value;
                            onChange({ [setting.id]: out });
                          }}
                          className="w-[300px] bg-[var(--vscode-input)] border border-[var(--vscode-border)] rounded px-2.5 py-1.5 text-[13px] outline-none focus:border-[var(--vscode-accent)] shadow-sm hover:border-[var(--vscode-accent)]/50 transition-colors cursor-pointer"
                        >
                          {setting.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}

                      {setting.type === "number" && (
                        <input
                          type="number"
                          value={val as number}
                          onChange={(e) => {
                            const out = setting.transformOut ? setting.transformOut(Number(e.target.value)) : Number(e.target.value);
                            onChange({ [setting.id]: out });
                          }}
                          className="w-32 bg-[var(--vscode-input)] border border-[var(--vscode-border)] focus:border-[var(--vscode-accent)] px-2.5 py-1.5 outline-none text-[13px] rounded shadow-sm hover:border-[var(--vscode-accent)]/50 transition-colors"
                        />
                      )}

                      {setting.type === "boolean" && (
                        <label className="flex items-center gap-3 cursor-pointer group/toggle w-fit">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={val as boolean}
                              onChange={(e) => {
                                const out = setting.transformOut ? setting.transformOut(e.target.checked) : e.target.checked;
                                onChange({ [setting.id]: out });
                              }}
                              className="peer sr-only"
                            />
                            <div className="h-5 w-9 rounded-full bg-[var(--vscode-input)] border border-[var(--vscode-border)] transition-all peer-checked:bg-[var(--vscode-accent)] peer-checked:border-[var(--vscode-accent)]"></div>
                            <div className="absolute left-[2px] top-[2px] h-4 w-4 rounded-full bg-[var(--vscode-text-muted)] transition-all peer-checked:translate-x-4 peer-checked:bg-[#ffffff] shadow-sm"></div>
                          </div>
                          <span className="text-[13px] text-[var(--vscode-text)] group-hover/toggle:text-[var(--vscode-accent)] transition-colors">
                            {val ? "Enabled" : "Disabled"}
                          </span>
                        </label>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
