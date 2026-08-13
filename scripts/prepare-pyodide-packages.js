const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const repositoryRoot = path.join(__dirname, "..");
const pyodideRoot = path.join(repositoryRoot, "node_modules", "pyodide");
const destination = path.join(repositoryRoot, "public", "vendor", "pyodide");
const packageJson = require(path.join(pyodideRoot, "package.json"));
const lock = require(path.join(pyodideRoot, "pyodide-lock.json"));
const roots = (process.env.PYLAB_CURRICULUM_PACKAGES ||
  "numpy,pandas,scipy,matplotlib,seaborn,pillow,scikit-learn")
  .split(",")
  .map((name) => name.trim())
  .filter(Boolean);
const strict = process.env.PYLAB_PACKAGE_BUNDLE_REQUIRED === "1";
const baseUrl =
  process.env.PYLAB_PACKAGE_BASE_URL ||
  `https://cdn.jsdelivr.net/pyodide/v${packageJson.version}/full`;

// Pure-Python packages absent from pyodide-lock.json can still be frozen into
// the static export. Their compiled dependencies are provided by the lockfile.
const purePythonPackages = {
  seaborn: {
    version: "0.13.2",
    fileName: "seaborn-0.13.2-py3-none-any.whl",
    depends: ["numpy", "pandas", "matplotlib"],
  },
};

function packageClosure(root) {
  const seen = new Set();
  const visit = (name) => {
    if (seen.has(name)) return;
    const record = lock.packages[name] || purePythonPackages[name];
    if (!record) throw new Error(`Unknown browser package "${name}".`);
    seen.add(name);
    for (const dependency of record.depends || []) visit(dependency);
  };
  visit(root);
  return seen;
}

function validExistingFile(record) {
  const fileName = record.file_name || record.fileName;
  if (!fileName) return true;
  const file = path.join(destination, fileName);
  if (!fs.existsSync(file)) return false;
  if (!record.sha256) return true;
  const digest = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  if (digest === record.sha256) return true;
  fs.rmSync(file, { force: true });
  return false;
}

async function downloadBytes(url, target, expectedSha256) {
  const temporary = `${target}.download`;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (expectedSha256) {
        const digest = crypto.createHash("sha256").update(bytes).digest("hex");
        if (digest !== expectedSha256) throw new Error("SHA-256 integrity mismatch");
      }
      fs.writeFileSync(temporary, bytes);
      fs.renameSync(temporary, target);
      return;
    } catch (error) {
      lastError = error;
      fs.rmSync(temporary, { force: true });
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
  throw new Error(`${path.basename(target)}: ${String(lastError)}`);
}

async function downloadLockedPackage(record) {
  if (!record.file_name || validExistingFile(record)) return;
  await downloadBytes(
    `${baseUrl}/${record.file_name}`,
    path.join(destination, record.file_name),
    record.sha256,
  );
}

async function downloadPurePythonPackage(name, record) {
  if (validExistingFile(record)) return;
  const metadataResponse = await fetch(
    `https://pypi.org/pypi/${name}/${record.version}/json`,
    { signal: AbortSignal.timeout(30_000) },
  );
  if (!metadataResponse.ok) throw new Error(`${name} metadata: HTTP ${metadataResponse.status}`);
  const metadata = await metadataResponse.json();
  const wheel = metadata.urls.find(
    (file) => file.filename === record.fileName && file.packagetype === "bdist_wheel",
  );
  if (!wheel) throw new Error(`${record.fileName}: compatible PyPI wheel not found`);
  await downloadBytes(
    wheel.url,
    path.join(destination, record.fileName),
    wheel.digests?.sha256,
  );
}

async function runPool(items, concurrency, operation) {
  let cursor = 0;
  const failures = [];
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (cursor < items.length) {
        const item = items[cursor];
        cursor += 1;
        try {
          await operation(item);
        } catch (error) {
          failures.push(String(error));
        }
      }
    }),
  );
  return failures;
}

async function main() {
  fs.mkdirSync(destination, { recursive: true });
  const closures = new Map(roots.map((root) => [root, packageClosure(root)]));
  const packageNames = [...new Set([...closures.values()].flatMap((set) => [...set]))];
  const lockedRecords = packageNames
    .filter((name) => lock.packages[name])
    .map((name) => lock.packages[name]);
  const failures = await runPool(lockedRecords, 4, downloadLockedPackage);
  for (const name of packageNames.filter((entry) => purePythonPackages[entry])) {
    try {
      await downloadPurePythonPackage(name, purePythonPackages[name]);
    } catch (error) {
      failures.push(String(error));
    }
  }

  const isAvailable = (name) =>
    validExistingFile(lock.packages[name] || purePythonPackages[name]);
  const bundledRoots = roots.filter((root) =>
    [...closures.get(root)].every(isAvailable),
  );
  const bundledPackages = [
    ...new Set(bundledRoots.flatMap((root) => [...closures.get(root)])),
  ].sort();
  const manifest = {
    pyodideVersion: packageJson.version,
    roots: bundledRoots,
    packages: bundledPackages,
    wheels: Object.fromEntries(
      Object.entries(purePythonPackages)
        .filter(([name]) => bundledPackages.includes(name))
        .map(([name, record]) => [name, record.fileName]),
    ),
    dependencies: Object.fromEntries(
      Object.entries(purePythonPackages).map(([name, record]) => [name, record.depends]),
    ),
    generatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(destination, "bundled-packages.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  if (bundledRoots.length) {
    console.log(
      `Prepared ${bundledPackages.length} local Pyodide packages for: ${bundledRoots.join(", ")}.`,
    );
  }
  if (failures.length) {
    const message =
      `Could not bundle ${failures.length} Pyodide asset(s). ` +
      "The browser will use the official package CDN as a client-side fallback.";
    if (strict) throw new Error(`${message}\n${failures.join("\n")}`);
    console.warn(message);
  }
  if (strict && bundledRoots.length !== roots.length) {
    throw new Error(
      `Static package bundle is incomplete. Missing roots: ${roots
        .filter((root) => !bundledRoots.includes(root))
        .join(", ")}.`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
