const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const output = path.join(root, "out");
const requiredFiles = [
  "index.html",
  "404.html",
  "_headers",
  "vendor/pyodide/pyodide.mjs",
  "vendor/pyodide/pyodide.asm.wasm",
  "vendor/pyodide/python_stdlib.zip",
  "vendor/pyodide/bundled-packages.json",
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(output, file)));
if (missing.length) {
  throw new Error(`Static export is incomplete. Missing: ${missing.join(", ")}`);
}

const applicationRoot = path.join(root, "src", "app");
const serverOnlyFiles = fs
  .readdirSync(applicationRoot, { recursive: true })
  .filter((entry) => typeof entry === "string")
  .filter((entry) => /(?:^|\/)(?:route|middleware)\.[cm]?[jt]sx?$/.test(entry));
if (serverOnlyFiles.length) {
  throw new Error(`Server-only application files are not allowed: ${serverOnlyFiles.join(", ")}`);
}

const sourceFiles = fs
  .readdirSync(path.join(root, "src"), { recursive: true })
  .filter((entry) => typeof entry === "string" && /\.[jt]sx?$/.test(entry));
const serverActions = sourceFiles.filter((entry) => {
  const content = fs.readFileSync(path.join(root, "src", entry), "utf8");
  return /^\s*["']use server["'];/m.test(content);
});
if (serverActions.length) {
  throw new Error(`Server actions are not allowed: ${serverActions.join(", ")}`);
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(output, "vendor/pyodide/bundled-packages.json"), "utf8"),
);
if (process.env.PYLAB_PACKAGE_BUNDLE_REQUIRED === "1" && manifest.roots.length === 0) {
  throw new Error("The required static scientific package bundle is empty.");
}

console.log(
  `Verified client-only static export (${manifest.roots.length} bundled package roots).`,
);
