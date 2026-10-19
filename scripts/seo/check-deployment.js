#!/usr/bin/env node
// HTTP-level SEO checks against a served copy of the site: a Cloudflare Pages
// preview, production, or `wrangler pages dev` (see check-local-pages.js).
//
//   node scripts/seo/check-deployment.js https://<hash>.<project>.pages.dev
//   node scripts/seo/check-deployment.js https://flutterpilot.com --production
//
// Checks status codes and redirect hops as the server sends them, not what
// React Router displays after JavaScript runs.
const path = require("path");
const { routes, absoluteUrl, registry } = require("./registry");
const { parsePage } = require("./html");
const { readRedirects } = require("./redirects");

const [baseArg, ...flags] = process.argv.slice(2);
if (!baseArg) {
  console.error("Usage: check-deployment.js <base-url> [--production]");
  process.exit(2);
}
const base = baseArg.replace(/\/+$/, "");
const isProduction = flags.includes("--production");
const isPagesPreview = /\.pages\.dev$/.test(new URL(base).hostname);

const failures = [];
let checks = 0;
const check = (condition, message) => {
  checks += 1;
  if (!condition) failures.push(message);
};

const request = (url, method = "GET") =>
  fetch(url, { method, redirect: "manual", headers: { "User-Agent": "FlutterPilot-SEO-check" } });

// Follows redirects by hand so every hop can be inspected.
async function follow(url, maxHops = 5) {
  const hops = [];
  let current = url;
  for (let i = 0; i <= maxHops; i += 1) {
    const response = await request(current);
    hops.push({ url: current, status: response.status, location: response.headers.get("location") });
    if (response.status < 300 || response.status >= 400) return { hops, response };
    current = new URL(response.headers.get("location"), current).toString();
  }
  return { hops, response: null };
}

const pathOf = (url) => {
  const parsed = new URL(url, base);
  return `${parsed.pathname}${parsed.hash}`;
};

async function checkRoutes() {
  for (const route of routes) {
    const url = `${base}${route.path}`;
    const response = await request(url);
    check(response.status === 200, `${route.path}: expected 200, got ${response.status}`);
    if (response.status !== 200) continue;

    check(/text\/html/.test(response.headers.get("content-type") || ""), `${route.path}: content-type is not HTML`);
    const page = parsePage(await response.text());
    check(page.title === route.title, `${route.path}: served title "${page.title}" should be "${route.title}"`);
    check(page.canonicals[0] === absoluteUrl(route.path), `${route.path}: served canonical ${page.canonicals[0]} should be ${absoluteUrl(route.path)}`);
    check(page.h1s.length === 1 && page.h1s[0] === route.h1, `${route.path}: served H1 ${JSON.stringify(page.h1s)} should be "${route.h1}"`);

    const robotsHeader = response.headers.get("x-robots-tag") || "";
    if (isPagesPreview) {
      check(/noindex/i.test(robotsHeader), `${route.path}: preview hostname should send X-Robots-Tag: noindex`);
    } else {
      check(!/noindex/i.test(robotsHeader), `${route.path}: X-Robots-Tag "${robotsHeader}" blocks indexing`);
    }

    // The slashless variant must reach the canonical URL in one hop.
    if (route.path !== "/") {
      const bare = route.path.replace(/\/$/, "");
      const { hops, response: final } = await follow(`${base}${bare}`);
      check(
        hops.length === 2 && [301, 308].includes(hops[0].status) && pathOf(hops[0].location) === route.path,
        `${bare}: expected one permanent redirect to ${route.path}, got ${JSON.stringify(hops)}`
      );
      check(final && final.status === 200, `${bare}: redirect chain did not end in 200`);
    }
  }
}

async function checkRedirects() {
  const rules = readRedirects(path.join(__dirname, "..", "..", "public", "_redirects"));
  for (const rule of rules) {
    const { hops, response } = await follow(`${base}${rule.from}`);
    const [first] = hops;
    check(first.status === rule.status, `${rule.from}: expected ${rule.status}, got ${first.status}`);
    check(first.location && pathOf(first.location) === rule.to, `${rule.from}: Location ${first.location} should be ${rule.to}`);
    check(hops.length === 2 && response && response.status === 200, `${rule.from}: should reach a 200 page in one hop, got ${JSON.stringify(hops)}`);
  }
}

async function checkNotFound() {
  const probes = [
    `/seo-check-missing-${Date.now()}/`,
    "/flutter-ui-builder/does-not-exist/",
    "/static/js/does-not-exist.js",
    "/AboutUs",
  ];
  for (const probe of probes) {
    const response = await request(`${base}${probe}`);
    check(response.status === 404, `${probe}: unknown URL should return 404, got ${response.status} ${response.headers.get("location") || ""}`);
    if (probe.endsWith("/")) {
      const page = parsePage(await response.text());
      check(page.robots && /noindex/i.test(page.robots), `${probe}: 404 page should be noindex`);
      check(page.title === registry.notFound.title, `${probe}: 404 page title is "${page.title}"`);
    }
  }
}

async function checkSiteFiles() {
  const sitemap = await request(`${base}/sitemap.xml`);
  check(sitemap.status === 200, `/sitemap.xml: expected 200, got ${sitemap.status}`);
  check(/xml/.test(sitemap.headers.get("content-type") || ""), "/sitemap.xml: content-type is not XML");
  const xml = await sitemap.text();
  routes
    .filter((route) => route.indexable)
    .forEach((route) => check(xml.includes(`<loc>${absoluteUrl(route.path)}</loc>`), `/sitemap.xml: missing ${route.path}`));

  const robots = await request(`${base}/robots.txt`);
  check(robots.status === 200, `/robots.txt: expected 200, got ${robots.status}`);
  check((await robots.text()).includes("Sitemap: https://flutterpilot.com/sitemap.xml"), "/robots.txt: missing Sitemap line");
}

// Protocol and hostname normalization are configured on the Cloudflare zone,
// so they only exist in production.
async function checkHostVariants() {
  const variants = ["http://flutterpilot.com/", "https://www.flutterpilot.com/", "http://www.flutterpilot.com/"];
  for (const variant of variants) {
    try {
      const { hops, response } = await follow(variant);
      check(
        hops.length === 2 && [301, 308].includes(hops[0].status) && hops[0].location.startsWith("https://flutterpilot.com/"),
        `${variant}: expected one permanent redirect to https://flutterpilot.com/, got ${JSON.stringify(hops)}`
      );
      check(response && response.status === 200, `${variant}: did not end in 200`);
    } catch (error) {
      check(false, `${variant}: request failed (${error.message})`);
    }
  }
}

(async () => {
  await checkRoutes();
  await checkRedirects();
  await checkNotFound();
  await checkSiteFiles();
  if (isProduction) await checkHostVariants();

  if (failures.length) {
    console.error(`Deployment SEO checks for ${base}: ${failures.length} of ${checks} failed\n`);
    failures.forEach((failure) => console.error(`  ✗ ${failure}`));
    process.exit(1);
  }
  console.log(`Deployment SEO checks for ${base}: all ${checks} passed.`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
