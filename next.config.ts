import type { NextConfig } from "next";

/**
 * PyLab is a static, client-only application. Python, tests, package installs,
 * files, and persistence all run in the browser; no Next.js runtime server is
 * required after `next build` creates the `out/` directory.
 *
 * Production headers live in `public/_headers` and `vercel.json`. The optional
 * development-only callback keeps `next dev` cross-origin isolated without
 * adding a production server requirement.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
  "worker-src 'self' blob:",
  "connect-src 'self' ws: wss: https://cdn.jsdelivr.net https://pypi.org https://files.pythonhosted.org",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const developmentHeaders = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  ...(!isDevelopment ? { output: "export" as const } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  ...(isDevelopment
    ? {
        headers: async () => [
          { source: "/(.*)", headers: developmentHeaders },
        ],
      }
    : {}),
};

export default nextConfig;
