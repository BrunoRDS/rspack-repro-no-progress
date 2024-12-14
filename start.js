const path = require("path");
const spawn = require("cross-spawn");

const RSPACK_BIN = "./node_modules/@rspack/cli/bin/rspack";

(async () => {
    const passThroughArgs = process.argv
    .slice(2)
    .filter(arg => arg !== experienceName);

    const proc = spawn("node", [RSPACK_BIN, "serve", ...passThroughArgs], {
        cwd: process.cwd(),
        stdio: ["inherit", "inherit", "pipe"],
    });

    const stderrBuffer = [];

    // ensure errors are displayed in console
    proc.stderr.setEncoding("utf-8");
    proc.stderr.pipe(process.stderr);

    proc.stderr.on("data", data => {
      stderrBuffer.push(data);
    });

    proc.on("exit", code => {
        const eventMessage = stderrBuffer.reverse().join("").slice(0, 5000);
        console.log(`TELEMETRY TO SEND: ${eventMessage}`);
    });
})();