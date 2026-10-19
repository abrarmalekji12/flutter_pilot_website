// Renders every public React route in headless Chromium at build time and
// writes the resulting HTML (head tags from RouteSeo + full page body) to
// build/<route>/index.html, plus build/404.html for unknown URLs.
//
// The app detects window.__FLUTTERPILOT_PRERENDER__ and skips network calls,
// random/typing animations and canvases, so the output is deterministic.
// All requests outside the local server are blocked.
const fs = require("fs");
const http = require("http");
const path = require("path");
const { routes, buildDirectory, routeFile, absoluteUrl, registry } = require("./seo/registry");

const NOT_FOUND_PROBE = "/__prerender-not-found__/";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

// Serves build/ assets; any extensionless path gets the untouched app shell,
// so routes render client-side exactly as they did before prerendering.
function startServer(shellHtml) {
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const extension = path.extname(pathname);
    const filePath = path.join(buildDirectory, pathname);

    if (extension && filePath.startsWith(buildDirectory) && fs.existsSync(filePath)) {
      response.writeHead(200, { "Content-Type": contentTypes[extension] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(response);
      return;
    }
    if (extension) {
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200, { "Content-Type": contentTypes[".html"] });
    response.end(shellHtml);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function snapshot(page, url, expected) {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.querySelector("#root h1") && !document.querySelector("[data-route-loading]"),
    null,
    { timeout: 20000 }
  );

  // Trigger every whileInView animation so nothing is captured mid-transition.
  await page.evaluate(async () => {
    const step = Math.max(200, window.innerHeight / 2);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await page.waitForLoadState("networkidle");

  if (errors.length) {
    throw new Error(`Runtime errors while prerendering ${url}:\n${errors.join("\n")}`);
  }

  const title = await page.title();
  if (expected.title && title !== expected.title) {
    throw new Error(`Prerendered title for ${url} was "${title}", expected "${expected.title}"`);
  }

  return page.evaluate(() => {
    // CSS-in-JS libraries insert rules through the CSSOM in production, which
    // leaves <style> tags empty in serialized HTML. Write the rules out as text
    // and detach the tags from Emotion/JSS so the client never reuses them.
    document.querySelectorAll("style").forEach((style) => {
      let css = "";
      try {
        css = Array.from(style.sheet ? style.sheet.cssRules : [])
          .map((rule) => rule.cssText)
          .join("\n");
      } catch (error) {
        css = style.textContent;
      }
      if (!css.trim()) {
        style.remove();
        return;
      }
      Array.from(style.attributes).forEach((attribute) => style.removeAttribute(attribute.name));
      style.setAttribute("data-prerendered-style", "");
      style.textContent = css;
    });

    // Lazy-route chunks injected by the webpack runtime become preload hints:
    // a serialized <script src> in <head> would block parsing.
    document.querySelectorAll("head script[data-webpack]").forEach((script) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "script";
      link.href = script.getAttribute("src");
      script.replaceWith(link);
    });

    // Any element still holding an entrance animation's initial state should be
    // visible in the static HTML.
    document.querySelectorAll("#root [style]").forEach((element) => {
      if (element.style.opacity === "0") {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      }
    });

    document.getElementById("root").setAttribute("data-prerendered", "");
    return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
  });
}

async function prerender() {
  const shellPath = path.join(buildDirectory, "index.html");
  if (!fs.existsSync(shellPath)) {
    throw new Error(`Missing production entrypoint: ${shellPath}`);
  }
  const shellHtml = fs.readFileSync(shellPath, "utf8");

  const targets = routes
    .filter((route) => route.render === "react")
    .map((route) => ({ path: route.path, out: routeFile(route.path), title: route.title }));
  targets.push({ path: NOT_FOUND_PROBE, out: path.join(buildDirectory, "404.html"), title: registry.notFound.title });

  const { chromium } = require("playwright");
  const server = await startServer(shellHtml);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "no-preference" });
    await context.addInitScript(() => {
      window.__FLUTTERPILOT_PRERENDER__ = true;
    });
    await context.route("**/*", (route) =>
      route.request().url().startsWith(origin) ? route.continue() : route.abort()
    );

    for (const target of targets) {
      const page = await context.newPage();
      const html = await snapshot(page, `${origin}${target.path}`, target);
      await page.close();

      // Local origins must never leak into published HTML.
      const output = html.split(origin).join(target.path === NOT_FOUND_PROBE ? "" : registry.siteUrl);
      if (output.includes("127.0.0.1")) {
        throw new Error(`Prerendered HTML for ${target.path} still references the local server`);
      }

      fs.mkdirSync(path.dirname(target.out), { recursive: true });
      fs.writeFileSync(target.out, output);
      console.log(`Prerendered ${target.path === NOT_FOUND_PROBE ? "404.html" : absoluteUrl(target.path)}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

module.exports = prerender;

if (require.main === module) {
  prerender().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
