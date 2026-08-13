const { spawn } = require("node:child_process");
const path = require("node:path");

async function main() {
  const environment = { ...process.env };
  if (
    process.platform === "linux" &&
    !environment.CI &&
    !environment.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  ) {
    const chromiumModule = await import("@sparticuz/chromium");
    const chromium = chromiumModule.default;
    const libraryRoot = await chromiumModule.inflate(
      path.join(
        __dirname,
        "..",
        "node_modules",
        "@sparticuz",
        "chromium",
        "bin",
        "al2023.tar.br",
      ),
    );
    chromiumModule.setupLambdaEnvironment(path.join(libraryRoot, "lib"));
    environment.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH;
    environment.FONTCONFIG_PATH = process.env.FONTCONFIG_PATH;
    environment.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH =
      await chromium.executablePath();
  }

  const child = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["playwright", "test", ...process.argv.slice(2)],
    { stdio: "inherit", env: environment },
  );
  child.on("exit", (code) => process.exit(code ?? 1));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
