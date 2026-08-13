import JSZip from "jszip";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  downloadProject,
  downloadText,
  readFileAsText,
} from "@/lib/download";

let capturedBlob: Blob | null;

beforeEach(() => {
  capturedBlob = null;
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: vi.fn((blob: Blob) => {
      capturedBlob = blob;
      return "blob:test";
    }),
    revokeObjectURL: vi.fn(),
  });
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("browser downloads", () => {
  it("downloads text with the requested filename and MIME type", async () => {
    downloadText("answer.py", "print('ok')", "text/x-python");

    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(capturedBlob?.type).toBe("text/x-python");
    expect(await capturedBlob?.text()).toBe("print('ok')");
    expect(document.querySelector("a[download]")).toBeNull();
  });

  it("builds a ZIP that preserves project paths and content", async () => {
    await downloadProject([
      { path: "main.py", content: "print('hello')" },
      { path: "data/input.txt", content: "42" },
    ]);

    expect(capturedBlob).not.toBeNull();
    const archive = await JSZip.loadAsync(await capturedBlob!.arrayBuffer());
    await expect(archive.file("main.py")?.async("text")).resolves.toBe(
      "print('hello')",
    );
    await expect(archive.file("data/input.txt")?.async("text")).resolves.toBe(
      "42",
    );
  });

  it("reads uploaded files as text", async () => {
    const file = new File(["name = 'PyLab'"], "main.py", {
      type: "text/x-python",
    });
    await expect(readFileAsText(file)).resolves.toBe("name = 'PyLab'");
  });
});
