const fs = require("node:fs");
const path = require("node:path");

const source = path.join(__dirname, "..", "node_modules", "pyodide");
const destination = path.join(
  __dirname,
  "..",
  "public",
  "vendor",
  "pyodide",
);
const files = [
  "pyodide.asm.js",
  "pyodide.asm.wasm",
  "pyodide-lock.json",
  "pyodide.mjs",
  "python_stdlib.zip",
];

fs.mkdirSync(destination, { recursive: true });
for (const file of files) {
  fs.copyFileSync(path.join(source, file), path.join(destination, file));
}
const version = require(path.join(source, "package.json")).version;
const manifestPath = path.join(destination, "bundled-packages.json");
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch {
  manifest = null;
}
if (manifest?.pyodideVersion !== version) {
  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify({ pyodideVersion: version, roots: [], packages: [] }, null, 2)}\n`,
  );
}
console.log(`Prepared local Pyodide ${version}.`);
