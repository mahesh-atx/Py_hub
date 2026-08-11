import type { NextConfig } from "next";

/**
 * Cross-origin isolation is REQUIRED so that `SharedArrayBuffer` + `Atomics`
 * are available. Real blocking `input()` support in a Pyodide Web Worker
 * depends on a synchronous, interruptible wait which is only possible with
 * SharedArrayBuffer. `credentialless` keeps loading CDN resources (Pyodide,
 * Monaco) working without per-resource CORP requirements.
 */
const securityHeaders = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
