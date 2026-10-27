#!/usr/bin/env node
// Offline SEO regression checks for build/. Run after `npm run build`:
//   npm run test:seo
// Every check reads the files Cloudflare Pages will serve, i.e. what a crawler
// receives before any JavaScript runs.
const fs = require("fs");
const path = require("path");
const { routes, indexableRoutes, buildDirectory, routeFile, absoluteUrl, siteUrl, registry } = require("./registry");
const { parsePage } = require("./html");
const { readRedirects } = require("./redirects");

// Pages whose job is to answer a search query need real body copy; legal and
// contact pages can be short.
const MIN_MAIN_WORDS = {
  "/": 300,
  "/flutter-ui-builder/": 700,
  "/ai-flutter-ui-generator/": 700,
  "/flutter-app-builder/": 700,
  "/flutterflow-alternative/": 700,
  "/template/": 300,
  "/docs/": 400,
  "/about-us/": 250,
  // The contact form plus the other ways to get help.
  "/contact/": 80,
};
const DEFAULT_MIN_MAIN_WORDS = 60;

const failures = [];
let checks = 0;
const check = (condition, message) => {
  checks += 1;
  if (!condition) failures.push(message);
};

const read = (file) => fs.readFileSync(file, "utf8");
const today = new Date().toISOString().slice(0, 10);

// Resolve an internal href to the build file Cloudflare would serve for it.
function resolveInternal(href) {
  const url = new URL(href, `${siteUrl}/`);
  if (url.origin !== siteUrl) return { external: true };
  const pathname = decodeURIComponent(url.pathname);
  const route = routes.find((candidate) => candidate.path === pathname);
  if (route) return { route, hash: url.hash.slice(1) };
  const file = path.join(buildDirectory, pathname);
  if (path.extname(pathname) && fs.existsSync(file)) return { file };
  return { missing: pathname };
}

function checkSitemap() {
  const file = path.join(buildDirectory, "sitemap.xml");
  check(fs.existsSync(file), "build/sitemap.xml is missing");
  if (!fs.existsSync(file)) return;
  const xml = read(file);

  check(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), "sitemap.xml must start with an XML declaration");
  check(/<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/.test(xml), "sitemap.xml must use the sitemaps.org namespace");
  check((xml.match(/<url>/g) || []).length === (xml.match(/<\/url>/g) || []).length, "sitemap.xml has unbalanced <url> tags");

  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?\s*<\/url>/g)];
  const locs = entries.map((entry) => entry[1]);
  const expected = indexableRoutes.map((route) => absoluteUrl(route.path));

  check(new Set(locs).size === locs.length, "sitemap.xml contains duplicate URLs");
  check(
    JSON.stringify([...locs].sort()) === JSON.stringify([...expected].sort()),
    `sitemap.xml URLs ${JSON.stringify(locs)} differ from indexable routes ${JSON.stringify(expected)}`
  );
  entries.forEach(([, loc, lastmod]) => {
    check(loc.startsWith(`${siteUrl}/`) && loc.endsWith("/"), `sitemap URL ${loc} is not a canonical trailing-slash URL`);
    if (lastmod) {
      check(/^\d{4}-\d{2}-\d{2}$/.test(lastmod), `sitemap lastmod ${lastmod} for ${loc} is not YYYY-MM-DD`);
      check(lastmod <= today, `sitemap lastmod ${lastmod} for ${loc} is in the future`);
    }
  });
}

function checkRobots() {
  const robots = read(path.join(buildDirectory, "robots.txt"));
  check(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), "robots.txt must reference the sitemap");
  check(!/^Disallow:\s*\/\s*$/m.test(robots), "robots.txt must not disallow the whole site");
}

function checkRoutes() {
  const titles = new Map();
  const descriptions = new Map();

  routes.forEach((route) => {
    const file = routeFile(route.path);
    check(fs.existsSync(file), `${route.path}: ${path.relative(buildDirectory, file)} is missing`);
    if (!fs.existsSync(file)) return;

    const html = read(file);
    const page = parsePage(html);
    const canonical = absoluteUrl(route.path);

    check(page.title === route.title, `${route.path}: title "${page.title}" should be "${route.title}"`);
    check(page.description === route.description, `${route.path}: meta description does not match the registry`);
    check(page.canonicals.length === 1 && page.canonicals[0] === canonical, `${route.path}: expected one canonical ${canonical}, got ${JSON.stringify(page.canonicals)}`);
    if (route.indexable) {
      check(page.robots && !/noindex/i.test(page.robots), `${route.path}: indexable page has robots "${page.robots}"`);
    } else {
      check(page.robots && /noindex/i.test(page.robots), `${route.path}: non-indexable page is missing noindex`);
    }
    check(page.h1s.length === 1, `${route.path}: expected exactly one H1, found ${page.h1s.length}`);
    check(page.h1s[0] === route.h1, `${route.path}: H1 "${page.h1s[0]}" should be "${route.h1}"`);
    check(!html.includes("data-route-loading"), `${route.path}: prerendered HTML contains the route loading fallback`);
    check(!html.includes("prerender.local"), `${route.path}: HTML references the prerender origin`);
    check(!/You need to enable JavaScript/i.test(html), `${route.path}: HTML still tells crawlers JavaScript is required`);

    titles.set(route.title, [...(titles.get(route.title) || []), route.path]);
    descriptions.set(route.description, [...(descriptions.get(route.description) || []), route.path]);

    if (route.render === "react") {
      const words = page.mainText.split(/\s+/).filter(Boolean).length;
      const minimum = MIN_MAIN_WORDS[route.path] || DEFAULT_MIN_MAIN_WORDS;
      check(words >= minimum, `${route.path}: <main> has ${words} words in initial HTML, expected at least ${minimum}`);
      check(html.includes('id="root" data-prerendered'), `${route.path}: #root is not marked as prerendered`);
      check(page.ogUrl === canonical, `${route.path}: og:url "${page.ogUrl}" should equal the canonical URL`);
      check(page.ogTitle === route.title, `${route.path}: og:title does not match the title`);
      checkStructuredData(route, page);
    }
  });

  titles.forEach((paths, title) => check(paths.length === 1, `Duplicate title "${title}" on ${paths.join(", ")}`));
  descriptions.forEach((paths) => check(paths.length === 1, `Duplicate meta description on ${paths.join(", ")}`));
}

function checkStructuredData(route, page) {
  check(page.jsonLd.length === 1, `${route.path}: expected one JSON-LD block, found ${page.jsonLd.length}`);
  if (page.jsonLd.length !== 1) return;

  let data;
  try {
    data = JSON.parse(page.jsonLd[0]);
  } catch (error) {
    check(false, `${route.path}: JSON-LD is not valid JSON (${error.message})`);
    return;
  }
  check(data["@context"] === "https://schema.org", `${route.path}: JSON-LD @context must be https://schema.org`);
  const graph = data["@graph"] || [];
  const types = graph.map((node) => node["@type"]);
  check(types.includes("Organization") && types.includes("WebSite"), `${route.path}: JSON-LD needs Organization and WebSite nodes`);
  graph.forEach((node) => check(typeof node["@type"] === "string", `${route.path}: JSON-LD node without @type`));

  if (route.path === "/") {
    const app = graph.find((node) => node["@type"] === "SoftwareApplication");
    check(Boolean(app), "/: JSON-LD should describe the SoftwareApplication");
    if (app && app.offers) {
      check(/^\d+(\.\d+)?$/.test(app.offers.price), "/: SoftwareApplication offers.price must be a number string");
      check(/^[A-Z]{3}$/.test(app.offers.priceCurrency), "/: SoftwareApplication offers.priceCurrency must be an ISO 4217 code");
    }
    return;
  }
  const webPage = graph.find((node) => node.url === absoluteUrl(route.path));
  check(Boolean(webPage), `${route.path}: JSON-LD has no WebPage node for the canonical URL`);
  if (webPage) check(webPage.name === route.title, `${route.path}: JSON-LD page name does not match the title`);
  if (route.breadcrumb) {
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const items = breadcrumb ? breadcrumb.itemListElement : [];
    check(
      items.length === 2 && items[1].item === absoluteUrl(route.path) && items[1].position === 2,
      `${route.path}: BreadcrumbList should end at the canonical URL`
    );
  }
}

function checkInternalLinks() {
  const pages = [...routes.map((route) => routeFile(route.path)), path.join(buildDirectory, "404.html")].filter((file) =>
    fs.existsSync(file)
  );
  const parsed = new Map(pages.map((file) => [file, parsePage(read(file))]));
  const linkedRoutes = new Set();

  parsed.forEach((page, file) => {
    const from = path.relative(buildDirectory, file);
    page.links
      .filter((href) => href.startsWith("/") || href.startsWith(siteUrl))
      .forEach((href) => {
        const target = resolveInternal(href);
        if (target.external) return;
        check(!target.missing, `${from}: link ${href} points to a non-canonical or missing URL`);
        if (target.route) {
          linkedRoutes.add(target.route.path);
          if (target.hash) {
            const targetPage = parsed.get(routeFile(target.route.path));
            check(targetPage && targetPage.ids.has(target.hash), `${from}: link ${href} points to a missing #${target.hash}`);
          }
        }
      });
  });

  indexableRoutes.forEach((route) =>
    check(linkedRoutes.has(route.path), `${route.path} is not linked from any other page's initial HTML`)
  );

  const home = parsed.get(routeFile("/"));
  ["/flutter-ui-builder/", "/ai-flutter-ui-generator/", "/flutter-app-builder/", "/flutterflow-alternative/", "/template/", "/docs/"].forEach(
    (target) => check(home && home.links.includes(target), `Homepage initial HTML should link to ${target}`)
  );
}

function checkNotFoundPage() {
  const file = path.join(buildDirectory, "404.html");
  check(fs.existsSync(file), "build/404.html is missing; Cloudflare would fall back to SPA mode (HTTP 200 for every URL)");
  if (!fs.existsSync(file)) return;
  const page = parsePage(read(file));
  check(page.robots && /noindex/i.test(page.robots), "404.html must be noindex");
  check(page.canonicals.length === 0, "404.html must not declare a canonical URL");
  check(page.title === registry.notFound.title, `404.html title should be "${registry.notFound.title}"`);
  check(page.h1s.length === 1, "404.html should have one H1");
  check(!read(file).includes("__prerender-not-found__"), "404.html leaks the prerender probe path");
}

function checkTemplateFallback() {
  const html = read(routeFile("/template/"));
  check(html.includes("The live template gallery loads in your browser"), "/template/: static gallery note is missing");
  check(!/Loading templates|No templates available right now/.test(html), "/template/: static HTML shows a loading or empty state");
  check(/How Flutter templates work in FlutterPilot/.test(html), "/template/: editorial section is missing");
  check(!/firestore\.googleapis|AIza[0-9A-Za-z_-]{20,}/.test(html), "/template/: static HTML contains Firebase data or keys");
}

// Studio links must be measurable (UTM tags let Studio's GA4 attribute the
// visit) except template deep links, which Studio only opens without a query
// string. The homepage prompt must still reach Studio without JavaScript.
const STUDIO_ORIGIN = "https://studio.flutterpilot.com";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

function checkStudioLinks() {
  const pages = [...routes.map((route) => routeFile(route.path)), path.join(buildDirectory, "404.html")].filter((file) =>
    fs.existsSync(file)
  );
  pages.forEach((file) => {
    const from = path.relative(buildDirectory, file);
    parsePage(read(file))
      .links.filter((href) => href.startsWith(STUDIO_ORIGIN))
      .forEach((href) => {
        const url = new URL(href);
        if (url.pathname.startsWith("/template/")) {
          check(!url.search, `${from}: Studio template link ${href} must not have a query string`);
          return;
        }
        check(url.searchParams.get("utm_source") === "flutterpilot.com", `${from}: Studio link ${href} needs utm_source=flutterpilot.com`);
        check(url.searchParams.get("utm_medium") === "website", `${from}: Studio link ${href} needs utm_medium=website`);
        UTM_KEYS.slice(2).forEach((key) => check(Boolean(url.searchParams.get(key)), `${from}: Studio link ${href} needs ${key}`));
      });
  });

  const home = read(routeFile("/"));
  const form = (home.match(/<form\b[^>]*>/i) || [""])[0];
  check(/\saction="https:\/\/studio\.flutterpilot\.com\/"/.test(form) && /\smethod="get"/i.test(form), "/: hero prompt form should GET https://studio.flutterpilot.com/");
  check(/<textarea\b[^>]*\sname="prompt"/.test(home), "/: hero prompt textarea should be named \"prompt\"");
  UTM_KEYS.forEach((key) => check(new RegExp(`<input[^>]*type="hidden"[^>]*name="${key}"`).test(home), `/: hero form is missing the ${key} field`));
}

function checkRedirects() {
  const rules = readRedirects(path.join(buildDirectory, "_redirects"));
  check(rules.length > 0, "_redirects has no rules");
  rules.forEach((rule) => {
    check(!rule.from.includes("*") || rule.status !== 200, `_redirects: wildcard rewrite ${rule.from} → ${rule.to} 200 is not allowed`);
    check([301, 308].includes(rule.status), `_redirects: ${rule.from} should be a permanent redirect, got ${rule.status}`);
    const destination = new URL(rule.to, `${siteUrl}/`);
    check(
      routes.some((route) => route.path === destination.pathname),
      `_redirects: ${rule.from} → ${rule.to} does not land on a canonical route`
    );
    check(!routes.some((route) => route.path === rule.from), `_redirects: ${rule.from} redirects away from a canonical route`);
  });
}

checkSitemap();
checkRobots();
checkRoutes();
checkInternalLinks();
checkNotFoundPage();
checkTemplateFallback();
checkStudioLinks();
checkRedirects();

if (failures.length) {
  console.error(`SEO build checks: ${failures.length} of ${checks} failed\n`);
  failures.forEach((failure) => console.error(`  ✗ ${failure}`));
  process.exit(1);
}
console.log(`SEO build checks: all ${checks} passed for ${routes.length} routes.`);
