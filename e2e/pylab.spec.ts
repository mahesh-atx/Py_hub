import fs from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { parsePracticeContent } from "../src/lib/practice/parser";
import type { PracticeTestsDocument } from "../src/lib/practice/types";

const CHART_ROOT = path.join(
  process.cwd(),
  "public",
  "practice-data",
  "phase-6-data-science",
);
const CHART_CHALLENGES = parsePracticeContent({
  fileId: "assignments.md",
  markdown: fs.readFileSync(path.join(CHART_ROOT, "assignments.md"), "utf8"),
  tests: JSON.parse(
    fs.readFileSync(path.join(CHART_ROOT, "assignment-tests.json"), "utf8"),
  ) as PracticeTestsDocument,
  solutionsMarkdown: fs.readFileSync(
    path.join(CHART_ROOT, "assignment-solutions.md"),
    "utf8",
  ),
}).challenges;

async function replaceMonaco(page: Page, index: number, code: string) {
  const editor = page.locator(".monaco-editor").nth(index);
  await expect(editor).toBeVisible();
  await editor.click({ position: { x: 250, y: 80 } });
  await page.keyboard.press("Control+A");
  await page.keyboard.insertText(code);
}

async function waitForTerminal(page: Page, text: string) {
  await expect(page.locator(".xterm-rows")).toContainText(text, {
    timeout: 60_000,
  });
}

async function writePracticeState(page: Page, value: unknown) {
  await page.evaluate(async (state) => {
    await new Promise<void>((resolve, reject) => {
      const open = indexedDB.open("python-ide-default", 1);
      open.onupgradeneeded = () => {
        if (!open.result.objectStoreNames.contains("files")) {
          open.result.createObjectStore("files", { keyPath: "id" });
        }
        if (!open.result.objectStoreNames.contains("kv")) {
          open.result.createObjectStore("kv");
        }
      };
      open.onerror = () => reject(open.error);
      open.onsuccess = () => {
        const transaction = open.result.transaction("kv", "readwrite");
        transaction.objectStore("kv").put(state, "practiceState");
        transaction.onerror = () => reject(transaction.error);
        transaction.oncomplete = () => {
          open.result.close();
          resolve();
        };
      };
    });
  }, value);
}

async function readPracticeSolved(page: Page): Promise<string[]> {
  return page.evaluate(async () => {
    const names = (await indexedDB.databases())
      .map((database) => database.name)
      .filter((name): name is string => Boolean(name?.startsWith("python-ide-")));
    for (const name of names) {
      const value = await new Promise<{ solved?: string[] } | undefined>((resolve) => {
        const open = indexedDB.open(name);
        open.onerror = () => resolve(undefined);
        open.onsuccess = () => {
          const db = open.result;
          const request = db.transaction("kv", "readonly").objectStore("kv").get("practiceState");
          request.onerror = () => resolve(undefined);
          request.onsuccess = () => {
            db.close();
            resolve(request.result);
          };
        };
      });
      if (value?.solved) return value.solved;
    }
    return [];
  });
}

test.describe.serial("PyLab browser integration", () => {
  test("serves the static export with cross-origin isolation", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.headers()["cross-origin-opener-policy"]).toBe("same-origin");
    expect(response?.headers()["cross-origin-embedder-policy"]).toBe("credentialless");
    expect(response?.headers()["content-security-policy"]).toContain("default-src 'self'");
    expect(response?.headers()["x-powered-by"]).toBeUndefined();
    expect(await page.evaluate(() => crossOriginIsolated)).toBe(true);
    const runtimeAsset = await page.request.get("/vendor/pyodide/bundled-packages.json");
    expect(runtimeAsset.headers()["cache-control"]).toContain("max-age=86400");
  });

  test("runs real Pyodide, handles input, and synchronizes files both ways", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText(/Python 3\./).last()).toBeVisible({
      timeout: 120_000,
    });

    await replaceMonaco(
      page,
      0,
      [
        "from pathlib import Path",
        'Path("sync-e2e.txt").write_text("version one")',
        'name = input("Name: ")',
        'print("E2E_CREATED", name)',
      ].join("\n"),
    );
    await page.getByTitle("Run left editor file").click();
    await expect(page.getByText(/Waiting for input/).first()).toBeVisible({
      timeout: 60_000,
    });
    await waitForTerminal(page, "Name:");
    await page.locator(".xterm").click();
    await page.keyboard.insertText("Arena");
    await page.keyboard.press("Enter");
    await waitForTerminal(page, "E2E_CREATED Arena");
    await expect(page.getByText("sync-e2e.txt", { exact: true })).toBeVisible();

    await replaceMonaco(
      page,
      0,
      [
        "from pathlib import Path",
        'path = Path("sync-e2e.txt")',
        "print(path.read_text())",
        "path.unlink()",
        'print("E2E_DELETED")',
      ].join("\n"),
    );
    await page.getByTitle("Run left editor file").click();
    await waitForTerminal(page, "E2E_DELETED");
    await expect(page.getByText("sync-e2e.txt", { exact: true })).toHaveCount(0);

    await replaceMonaco(page, 0, "while True:\n    pass");
    await page.getByTitle("Run left editor file").click();
    await expect(page.getByText(/Running/).first()).toBeVisible();
    await page.locator(".xterm").click();
    await page.keyboard.press("Control+C");
    await waitForTerminal(page, "Execution stopped");

    await page.locator(".xterm").click();
    await page.keyboard.press("Control+F");
    await expect(page.getByLabel("Find in terminal")).toBeVisible();
    await page.getByLabel("Find in terminal").fill("Execution stopped");
    await page.getByLabel("Close terminal search").click();

    const downloadPromise = page.waitForEvent("download");
    await page.getByTitle("Download Output").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^pylab-terminal-.*\.txt$/);
  });

  test("runs and saves the focused right split editor", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Python 3\./).last()).toBeVisible({
      timeout: 120_000,
    });
    await page.getByTitle("Split Editor Right").click();
    await expect(page.locator(".monaco-editor")).toHaveCount(2);

    await replaceMonaco(page, 1, 'print("RIGHT_PANE_EXECUTED")');
    await page.locator(".monaco-editor").nth(1).click();
    await page.keyboard.press("Control+Enter");
    await waitForTerminal(page, "RIGHT_PANE_EXECUTED");
  });

  test("renders plots returned by the Python runtime", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Python 3\./).last()).toBeVisible({
      timeout: 120_000,
    });

    // Supply a tiny in-memory pyplot-compatible figure. This exercises the
    // worker's real Python plot collector and browser plot panel without making
    // the browser test depend on an external wheel CDN.
    const plotHarness = [
      "import base64, sys, types",
      "class Axis:",
      '    lines, patches, collections, images = [1], [], [], []',
      '    get_title = lambda self: "Browser E2E"',
      '    get_xlabel = lambda self: "x"',
      '    get_ylabel = lambda self: "y"',
      "    get_legend = lambda self: None",
      "class Figure:",
      "    axes = [Axis()]",
      "    def savefig(self, buffer, **kwargs):",
      '        buffer.write(base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="))',
      "figure = Figure()",
      'matplotlib = types.ModuleType("matplotlib")',
      'matplotlib.__path__ = []',
      'pyplot = types.ModuleType("matplotlib.pyplot")',
      "pyplot.get_fignums = lambda: [1]",
      "pyplot.figure = lambda number: figure",
      "pyplot.close = lambda target: None",
      "matplotlib.pyplot = pyplot",
      'sys.modules["matplotlib"] = matplotlib',
      'sys.modules["matplotlib.pyplot"] = pyplot',
      'print("PLOT_READY")',
    ].join("\n");
    await replaceMonaco(page, 0, `exec(${JSON.stringify(plotHarness)})`);
    await page.getByTitle("Run left editor file").click();
    await expect(page.getByRole("img", { name: "Plot 1" })).toBeVisible({
      timeout: 60_000,
    });
    await page.getByRole("button", { name: "TERMINAL", exact: true }).click();
    await waitForTerminal(page, "PLOT_READY");
  });

  test("loads the bundled scientific curriculum stack", async ({
    page,
    request,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "The full package smoke test runs once; core flows run in every configured browser.");
    test.setTimeout(900_000);
    const manifestResponse = await request.get("/vendor/pyodide/bundled-packages.json");
    const manifest = (await manifestResponse.json()) as { roots?: string[] };
    const required = [
      "numpy",
      "pandas",
      "scipy",
      "matplotlib",
      "seaborn",
      "pillow",
      "scikit-learn",
    ];
    test.skip(
      !required.every((name) => manifest.roots?.includes(name)),
      "The local environment could not download the optional static wheel bundle; CI requires it.",
    );

    await page.goto("/");
    await expect(page.getByText(/Python 3\./).last()).toBeVisible({ timeout: 120_000 });
    await page.getByTitle("Packages").click();
    await page.getByRole("button", { name: "Install curriculum packages" }).click();
    await expect(
      page.getByTestId("package-matplotlib").getByRole("button", { name: "Install matplotlib" }),
    ).toBeDisabled();
    await expect(page.getByRole("button", { name: "Curriculum stack installed" })).toBeVisible({
      timeout: 240_000,
    });

    await replaceMonaco(
      page,
      0,
      [
        "import numpy as np",
        "import pandas as pd",
        "import scipy",
        "import sklearn",
        "import seaborn as sns",
        "from PIL import Image",
        "import matplotlib.pyplot as plt",
        'print("STACK_OK", int(pd.Series(np.array([1, 2, 3])).sum()))',
        "plt.plot([1, 2, 3], [3, 1, 4])",
        'plt.title("Bundled scientific stack")',
      ].join("\n"),
    );
    await page.getByTitle("Run left editor file").click();
    await expect(page.getByRole("img", { name: "Plot 1" })).toBeVisible({ timeout: 120_000 });
    await page.getByRole("button", { name: "TERMINAL", exact: true }).click();
    await waitForTerminal(page, "STACK_OK 6");

    expect(CHART_CHALLENGES).toHaveLength(30);
    await page.getByTitle("Practice & Learn").click();
    await page.getByText("Data Science", { exact: true }).click();
    await page.getByText("30 Chart Practice", { exact: true }).click();
    for (let index = 0; index < CHART_CHALLENGES.length; index += 1) {
      const challenge = CHART_CHALLENGES[index];
      expect(challenge.solution, challenge.id).toBeTruthy();
      await expect(page.getByText(challenge.title, { exact: true })).toBeVisible({
        timeout: 120_000,
      });
      await replaceMonaco(
        page,
        0,
        `exec(${JSON.stringify(challenge.solution)})`,
      );
      await page.getByTitle("Submit Practice Code").click();
      const advanced =
        index < CHART_CHALLENGES.length - 1
          ? page.getByText(CHART_CHALLENGES[index + 1].title, { exact: true })
          : page.getByText("Module Complete! 🎉", { exact: true });
      const failed = page.getByText(/Test Case \d+ \(Failed\)/).first();
      await expect
        .poll(
          async () => {
            if (await failed.isVisible()) return "failed";
            if (await advanced.isVisible()) return "advanced";
            return "pending";
          },
          { timeout: 120_000, message: `${challenge.id} did not finish judging` },
        )
        .not.toBe("pending");
      if (await failed.isVisible()) {
        const panel = await page
          .locator('section[aria-label="Output panel"]')
          .innerText();
        throw new Error(`${challenge.id} reference failed:\n${panel}`);
      }
    }
  });

  test("opens curriculum links and persists practice completion", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Python 3\./).last()).toBeVisible({
      timeout: 120_000,
    });
    await page.getByTitle("Practice & Learn").click();
    await page.getByText("Foundation", { exact: true }).click();
    const courseModule = page.getByText(/Module 01 Getting Started With Python/i);
    await expect(courseModule).toBeVisible();
    await courseModule.click();
    await expect(page.getByRole("heading", { name: /Phase 1|Getting Started/i }).first()).toBeVisible();

    await page.getByText("Practice Questions", { exact: true }).click();
    await expect(page.getByText("Q1. Hello, You", { exact: true })).toBeVisible();
    await replaceMonaco(
      page,
      0,
      [
        'print("Hello, World!")',
        'print("Priya Sharma")',
        'print("Learning Python")',
      ].join("\n"),
    );
    await page.getByTitle("Submit Practice Code").click();
    await expect(page.getByText("Q2. Variable Swap Display", { exact: true })).toBeVisible({
      timeout: 120_000,
    });

    await page.reload();
    expect(await readPracticeSolved(page)).toContain("phase-1-foundation__Q1");
  });

  test("completes and persists the final challenge in a module", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Python 3\./).last()).toBeVisible({ timeout: 120_000 });
    const solved = Array.from(
      { length: 59 },
      (_, index) => `phase-1-foundation__Q${index + 1}`,
    );
    await writePracticeState(page, { solved });
    await page.reload();

    await page.getByTitle("Practice & Learn").click();
    await page.getByText("Foundation", { exact: true }).click();
    await page.getByText("Practice Questions", { exact: true }).click();
    await expect(page.getByText("Q60. Multiplication Table Grid", { exact: true })).toBeVisible();

    const solution = [
      'n = int(input("Enter n: "))',
      "print()",
      'print("     |" + "".join(f"{value:>5}" for value in range(1, n + 1)))',
      'print("-----+" + "-" * (5 * n))',
      "for row in range(1, n + 1):",
      '    print(f"{row:>4} |" + "".join(f"{row * column:>5}" for column in range(1, n + 1)))',
    ].join("\n");
    await replaceMonaco(page, 0, `exec(${JSON.stringify(solution)})`);
    await page.getByTitle("Submit Practice Code").click();
    await expect(page.getByText("Module Complete! 🎉", { exact: true })).toBeVisible({
      timeout: 120_000,
    });
    await expect
      .poll(async () => readPracticeSolved(page), { timeout: 20_000 })
      .toContain("phase-1-foundation__Q60");
  });

  test("has no serious accessibility violations in desktop or mobile layouts", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText(/Python 3\./).last()).toBeVisible({ timeout: 120_000 });
    const desktop = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      desktop.violations
        .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
        .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) })),
    ).toEqual([]);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobile = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      mobile.violations
        .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
        .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) })),
    ).toEqual([]);
  });

  test("provides touch-friendly mobile navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const navigation = page.getByTestId("mobile-navigation");
    await expect(navigation).toBeVisible();

    await navigation.getByRole("button", { name: /files/i }).click();
    await expect(page.getByText("Pylab", { exact: true })).toBeVisible();
    await navigation.getByRole("button", { name: /editor/i }).click();
    await expect(page.locator(".monaco-editor").first()).toBeVisible();
    await navigation.getByRole("button", { name: /terminal/i }).click();
    await expect(page.locator(".xterm")).toBeVisible();
  });
});
