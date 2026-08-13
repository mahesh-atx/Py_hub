const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
  "worker-src 'self' blob:",
  "connect-src 'self' https://cdn.jsdelivr.net https://pypi.org https://files.pythonhosted.org",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const SECURITY_HEADERS = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".webp": "image/webp",
  ".whl": "application/octet-stream",
  ".zip": "application/zip",
};

function option(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const root = path.resolve(option("--dir", "out"));
const port = Number(option("--port", process.env.PORT || "3000"));
const host = option("--host", process.env.HOST || "0.0.0.0");

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error(`Static export not found in ${root}. Run \"npm run build\" first.`);
  process.exit(1);
}

function resolveRequest(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url || "/", "http://static.local").pathname);
  } catch {
    return null;
  }
  const relative = pathname.replace(/^\/+/, "");
  const candidates = pathname.endsWith("/")
    ? [path.join(relative, "index.html")]
    : [relative, path.join(relative, "index.html")];

  for (const candidate of candidates) {
    const absolute = path.resolve(root, candidate);
    if (!absolute.startsWith(`${root}${path.sep}`) && absolute !== root) continue;
    try {
      if (fs.statSync(absolute).isFile()) return absolute;
    } catch {
      // Try the next static-export path.
    }
  }
  return path.join(root, "404.html");
}

const server = http.createServer((request, response) => {
  const file = resolveRequest(request.url);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.setHeader(key, value);
  }
  if (!file || !fs.existsSync(file)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = path.extname(file).toLowerCase();
  response.writeHead(file.endsWith("404.html") ? 404 : 200, {
    "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
    "Cache-Control": file.includes(`${path.sep}_next${path.sep}static${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : file.includes(`${path.sep}vendor${path.sep}pyodide${path.sep}`)
        ? "public, max-age=86400"
        : "no-cache",
  });
  if (request.method === "HEAD") response.end();
  else fs.createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Static PyLab available at http://${host}:${port} from ${root}`);
});
