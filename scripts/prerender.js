// Renders every public React route at build time and writes the resulting
// HTML (head tags from RouteSeo + full page body) to build/<route>/index.html,
// plus build/404.html for unknown URLs.
//
// The built app runs in jsdom, not a real browser, so the build has no native
// dependencies and works in Cloudflare Pages' own build image as well as CI.
// The app detects window.__FLUTTERPILOT_PRERENDER__ and skips network calls,
// random/typing animations and canvases, so the output is deterministic.
// Only files from build/ can be loaded; every other request is blocked.
const fs = require("fs");
const path = require("path");
const { JSDOM, ResourceLoader, VirtualConsole } = require("jsdom");
const { routes, buildDirectory, routeFile, absoluteUrl, registry } = require("./seo/registry");

const ORIGIN = "http://prerender.local";
const NOT_FOUND_PROBE = "/__prerender-not-found__/";
const RENDER_TIMEOUT_MS = 20000;
// Entrance animations (framer-motion) run on jsdom's 60 fps timer; let them finish.
const SETTLE_MS = 1500;

class BuildResourceLoader extends ResourceLoader {
  fetch(url, options) {
    const { origin, pathname } = new URL(url);
    if (origin !== ORIGIN) return null;
    const file = path.join(buildDirectory, decodeURIComponent(pathname));
    if (!file.startsWith(buildDirectory) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      return Promise.reject(new Error(`Not in build/: ${pathname}`));
    }
    return super.fetch(`file://${file}`, options);
  }
}

// Browser APIs jsdom doesn't implement. Observers report everything as visible
// so whileInView animations play to their final state.
function installBrowserShims(window) {
  window.__FLUTTERPILOT_PRERENDER__ = true;
  window.matchMedia = (media) => ({
    matches: false,
    media,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });
  window.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe(target) {
      setTimeout(() => this.callback([{ isIntersecting: true, intersectionRatio: 1, target }], this), 0);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
  window.HTMLMediaElement.prototype.play = () => Promise.resolve();
  window.HTMLMediaElement.prototype.pause = () => {};
  window.scrollTo = () => {};
  window.Element.prototype.scrollIntoView = () => {};
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Turns the live DOM into static HTML a browser can paint without JavaScript.
function serialize(document) {
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

  // MUI's autosizing textarea measures its content, which jsdom can't do, so it
  // writes height: 0. Without it the browser sizes the field from `rows`.
  document.querySelectorAll("textarea:not([aria-hidden])").forEach((textarea) => {
    if (textarea.style.height === "0px") {
      textarea.style.removeProperty("height");
      textarea.style.removeProperty("overflow");
    }
  });

  document.getElementById("root").setAttribute("data-prerendered", "");
  return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
}

async function renderRoute(shellHtml, target) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => errors.push(error.message));
  virtualConsole.on("error", (...args) => errors.push(args.map(String).join(" ")));

  const dom = new JSDOM(shellHtml, {
    url: `${ORIGIN}${target.path}`,
    runScripts: "dangerously",
    resources: new BuildResourceLoader(),
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse: installBrowserShims,
  });
  const { document } = dom.window;

  try {
    const started = Date.now();
    while (!document.querySelector("#root h1") || document.querySelector("[data-route-loading]")) {
      if (errors.length) break;
      if (Date.now() - started > RENDER_TIMEOUT_MS) {
        throw new Error(`Timed out waiting for ${target.path} to render an H1`);
      }
      await delay(50);
    }
    await delay(SETTLE_MS);

    if (errors.length) {
      throw new Error(`Runtime errors while prerendering ${target.path}:\n${errors.join("\n")}`);
    }
    if (document.title !== target.title) {
      throw new Error(`Prerendered title for ${target.path} was "${document.title}", expected "${target.title}"`);
    }
    return serialize(document);
  } finally {
    dom.window.close();
  }
}

async function prerender() {
  const shellPath = path.join(buildDirectory, "index.html");
  if (!fs.existsSync(shellPath)) {
    throw new Error(`Missing production entrypoint: ${shellPath}`);
  }
  const shellHtml = fs.readFileSync(shellPath, "utf8");
  if (shellHtml.includes("data-prerendered")) {
    throw new Error("build/index.html is already prerendered; run `npm run build` for a fresh app shell");
  }

  const targets = routes
    .filter((route) => route.render === "react")
    .map((route) => ({ path: route.path, out: routeFile(route.path), title: route.title }));
  targets.push({ path: NOT_FOUND_PROBE, out: path.join(buildDirectory, "404.html"), title: registry.notFound.title });

  for (const target of targets) {
    const html = await renderRoute(shellHtml, target);
    if (html.includes(ORIGIN) || html.includes(NOT_FOUND_PROBE)) {
      throw new Error(`Prerendered HTML for ${target.path} references the prerender origin or probe path`);
    }
    fs.mkdirSync(path.dirname(target.out), { recursive: true });
    fs.writeFileSync(target.out, html);
    console.log(`Prerendered ${target.path === NOT_FOUND_PROBE ? "404.html" : absoluteUrl(target.path)}`);
  }
}

module.exports = prerender;

if (require.main === module) {
  prerender().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
