#!/usr/bin/env node
// Serves build/ with Cloudflare's own Pages asset server (`wrangler pages dev`,
// which applies _redirects, _headers, trailing-slash and 404.html rules the
// same way as production) and runs check-deployment.js against it.
//
// This is the closest offline stand-in for a deployed preview; the CI workflow
// also runs check-deployment.js against the real preview URL when Cloudflare
// credentials are available.
const { spawn } = require("child_process");
const path = require("path");
const { buildDirectory } = require("./registry");

const WRANGLER = "wrangler@3.114.17";
const PORT = process.env.SEO_PAGES_PORT || "8799";
const base = `http://127.0.0.1:${PORT}`;

// Generous: on a fresh CI runner this includes npx downloading wrangler.
async function waitForServer(timeoutMs = 180000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      await fetch(`${base}/robots.txt`);
      return;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`wrangler pages dev did not start on ${base}`);
}

(async () => {
  const server = spawn(
    "npx",
    ["--yes", WRANGLER, "pages", "dev", buildDirectory, "--port", PORT, "--ip", "127.0.0.1", "--compatibility-date", "2026-10-01"],
    // Own process group, so stopping it also stops wrangler's workerd child.
    { stdio: ["ignore", "pipe", "pipe"], detached: true, env: { ...process.env, WRANGLER_SEND_METRICS: "false" } }
  );
  let log = "";
  server.stdout.on("data", (chunk) => { log += chunk; });
  server.stderr.on("data", (chunk) => { log += chunk; });

  let exitCode = 1;
  try {
    await waitForServer();
    if (/invalid redirect rule/i.test(log)) {
      console.error(`Cloudflare rejected part of _redirects:\n${log}`);
    } else {
      const checker = spawn(process.execPath, [path.join(__dirname, "check-deployment.js"), base], { stdio: "inherit" });
      exitCode = await new Promise((resolve) => checker.on("close", resolve));
    }
  } catch (error) {
    console.error(error.message, `\n${log}`);
  } finally {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch (error) {
      server.kill();
    }
  }
  process.exit(exitCode);
})();
