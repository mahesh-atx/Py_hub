import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      reportsDirectory: "coverage",
      include: [
        "src/lib/filesystem/**/*.ts",
        "src/lib/practice/**/*.ts",
        "src/lib/pyodide/worker-client.ts",
        "src/lib/storage/**/*.ts",
        "src/lib/terminal/**/*.ts",
        "src/lib/packages.ts",
        "src/lib/settings.ts",
        "src/lib/examples.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
