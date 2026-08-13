const { spawn } = require("node:child_process");

const command = process.platform === "win32" ? "npm.cmd" : "npm";
const child = spawn(command, ["run", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    PYLAB_PACKAGE_BUNDLE_REQUIRED: "1",
  },
});

child.on("exit", (code) => process.exit(code ?? 1));
child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
