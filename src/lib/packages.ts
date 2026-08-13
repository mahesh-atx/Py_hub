export interface KnownPackage {
  name: string;
  description: string;
  category: "science" | "data" | "web" | "utils" | "other";
  /** Package has an official browser-compatible build in Pyodide. */
  pyodideCompatible: boolean;
  /** Package is used directly by the included curriculum. */
  curriculum: boolean;
}

/**
 * Curated packages with official Pyodide builds. Installation still downloads
 * static wheel assets; "compatible" intentionally does not imply preinstalled.
 */
export const KNOWN_PACKAGES: KnownPackage[] = [
  { name: "numpy", description: "Handles multi-dimensional arrays.", category: "science", pyodideCompatible: true, curriculum: true },
  { name: "pandas", description: "Analyzes and cleans tabular data.", category: "data", pyodideCompatible: true, curriculum: true },
  { name: "scipy", description: "Solves scientific and mathematical equations.", category: "science", pyodideCompatible: true, curriculum: true },
  { name: "matplotlib", description: "Generates basic static plots.", category: "science", pyodideCompatible: true, curriculum: true },
  { name: "seaborn", description: "Creates advanced statistical graphs.", category: "data", pyodideCompatible: true, curriculum: true },
  { name: "pillow", description: "Reads and transforms image data.", category: "data", pyodideCompatible: true, curriculum: true },
  { name: "scikit-learn", description: "Runs traditional predictive models.", category: "science", pyodideCompatible: true, curriculum: true },
  { name: "plotly", description: "Builds interactive web dashboards.", category: "web", pyodideCompatible: true, curriculum: false },
];

export function searchPackages(query: string): KnownPackage[] {
  const q = query.trim().toLowerCase();
  if (!q) return KNOWN_PACKAGES;
  return KNOWN_PACKAGES.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(q) ||
      pkg.description.toLowerCase().includes(q) ||
      pkg.category.includes(q),
  );
}
