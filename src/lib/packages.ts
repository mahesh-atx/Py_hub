export interface KnownPackage {
  name: string;
  description: string;
  category: "science" | "data" | "web" | "utils" | "other";
  /** Whether it ships prebuilt in the Pyodide distribution. */
  builtin: boolean;
}

/**
 * A curated, searchable list of popular packages known to work in Pyodide.
 * This is only a convenience catalog; `micropip` will still attempt pure-Python
 * wheels from PyPI for anything not prebuilt, and the worker reports clear
 * errors for anything that cannot run in the browser.
 */
export const KNOWN_PACKAGES: KnownPackage[] = [
  { name: "numpy", description: "Handles multi-dimensional arrays.", category: "science", builtin: true },
  { name: "pandas", description: "Analyzes and cleans tabular data.", category: "data", builtin: true },
  { name: "scipy", description: "Solves scientific and mathematical equations.", category: "science", builtin: true },
  { name: "matplotlib", description: "Generates basic static plots.", category: "science", builtin: true },
  { name: "seaborn", description: "Creates advanced statistical graphs.", category: "data", builtin: true },
  { name: "plotly", description: "Builds interactive web dashboards.", category: "web", builtin: true },
  { name: "scikit-learn", description: "Runs traditional predictive models.", category: "science", builtin: true },
];

export function searchPackages(query: string): KnownPackage[] {
  const q = query.trim().toLowerCase();
  if (!q) return KNOWN_PACKAGES;
  return KNOWN_PACKAGES.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  );
}
