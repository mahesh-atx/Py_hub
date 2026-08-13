import { defineConfig, devices, type Project } from "@playwright/test";

const chromium: Project = {
  name: "chromium",
  use: {
    ...devices["Desktop Chrome"],
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : undefined,
  },
};

const crossBrowserProjects: Project[] = process.env.PLAYWRIGHT_ALL_BROWSERS
  ? [
      { name: "firefox", use: { ...devices["Desktop Firefox"] } },
      { name: "webkit", use: { ...devices["Desktop Safari"] } },
    ]
  : [];

export default defineConfig({
  testDir: "./e2e",
  timeout: 180_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["line"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [chromium, ...crossBrowserProjects],
  webServer: {
    command:
      "npm run build && node scripts/serve-static.js --dir out --host 0.0.0.0 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: process.env.PLAYWRIGHT_REUSE_STATIC === "1",
    timeout: 180_000,
  },
});
