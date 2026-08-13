import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { EXAMPLE_FILES, DEFAULT_FILE, exampleNodes } from "@/lib/examples";
import { KNOWN_PACKAGES, searchPackages } from "@/lib/packages";

describe("IDE defaults and catalogs", () => {
  it("provides safe, usable editor defaults", () => {
    expect(DEFAULT_SETTINGS).toEqual({
      theme: "pylab-accessible-dark",
      fontSize: 14,
      tabSize: 4,
      minimap: true,
      wordWrap: false,
      clearOnRun: false,
      timeoutMs: 10_000,
    });
    expect(DEFAULT_SETTINGS.timeoutMs).toBeGreaterThan(0);
  });

  it("searches packages by name and description", () => {
    expect(searchPackages("")).toEqual(KNOWN_PACKAGES);
    expect(searchPackages("PANDAS").map((item) => item.name)).toEqual(["pandas"]);
    expect(searchPackages("statistical").map((item) => item.name)).toContain(
      "seaborn",
    );
    expect(searchPackages("not-a-package")).toEqual([]);
  });

  it("keeps package names unique and browser-compatible metadata complete", () => {
    expect(new Set(KNOWN_PACKAGES.map((item) => item.name)).size).toBe(
      KNOWN_PACKAGES.length,
    );
    for (const item of KNOWN_PACKAGES) {
      expect(item.name).not.toBe("");
      expect(item.description).not.toBe("");
      expect(item.pyodideCompatible).toBe(true);
      expect(typeof item.curriculum).toBe("boolean");
      expect(["science", "data", "web", "utils", "other"]).toContain(
        item.category,
      );
    }
  });

  it("creates unique persistent nodes for every example", () => {
    const nodes = exampleNodes("examples");
    expect(nodes).toHaveLength(EXAMPLE_FILES.length);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(nodes.every((item) => item.parentId === "examples")).toBe(true);
    expect(nodes.every((item) => item.kind === "file")).toBe(true);
    expect(nodes.map((item) => item.createdAt)).toEqual(
      [...nodes.map((item) => item.createdAt)].sort((a, b) => a - b),
    );
  });

  it("ships parseable notebook examples", () => {
    const notebooks = EXAMPLE_FILES.filter((item) => item.name.endsWith(".ipynb"));
    expect(notebooks.length).toBeGreaterThan(0);
    for (const notebook of notebooks) {
      const parsed = JSON.parse(notebook.code) as {
        cells: { cell_type: string; source: string[] }[];
      };
      expect(Array.isArray(parsed.cells)).toBe(true);
      expect(parsed.cells.length).toBeGreaterThan(0);
      expect(
        parsed.cells.every(
          (cell) =>
            ["code", "markdown"].includes(cell.cell_type) &&
            Array.isArray(cell.source),
        ),
      ).toBe(true);
    }
  });

  it("uses the first example as the default file", () => {
    expect(DEFAULT_FILE).toBe(EXAMPLE_FILES[0]);
    expect(DEFAULT_FILE.name).toBe("hello.py");
  });
});
