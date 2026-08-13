import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read(file: string) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

describe("client-only deployment contract", () => {
  it("uses a strict Next.js static export and a static start command", () => {
    const config = read("next.config.ts");
    const packageJson = JSON.parse(read("package.json"));
    expect(config).toContain('output: "export"');
    expect(config).not.toContain("async headers()");
    expect(packageJson.scripts.start).toContain("serve-static.js");
    expect(packageJson.scripts.start).not.toContain("next start");
    expect(packageJson.scripts["build:strict"]).toContain("run-strict-build.js");
    expect(read("scripts/run-strict-build.js")).toContain(
      'PYLAB_PACKAGE_BUNDLE_REQUIRED: "1"',
    );
    expect(read("vercel.json")).toContain("npm run build:strict");
    expect(read("netlify.toml")).toContain("npm run build:strict");
  });

  it("ships portable isolation and security headers", () => {
    const headers = read("public/_headers");
    const vercel = read("vercel.json");
    for (const value of [
      "Cross-Origin-Opener-Policy",
      "Cross-Origin-Embedder-Policy",
      "Content-Security-Policy",
      "X-Content-Type-Options",
      "Permissions-Policy",
    ]) {
      expect(headers).toContain(value);
      expect(vercel).toContain(value);
    }
    expect(headers).toContain("same-origin");
    expect(headers).toContain("credentialless");
  });

  it("contains no API routes, middleware, or server actions", () => {
    const src = path.join(ROOT, "src");
    const files = fs
      .readdirSync(src, { recursive: true })
      .filter((entry): entry is string => typeof entry === "string" && /\.[jt]sx?$/.test(entry));
    expect(files.filter((file) => /(?:^|\/)(?:route|middleware)\.[cm]?[jt]sx?$/.test(file))).toEqual([]);
    expect(
      files.filter((file) => /^\s*["']use server["'];/m.test(read(path.join("src", file)))),
    ).toEqual([]);
  });
});
