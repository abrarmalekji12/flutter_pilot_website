const fs = require("fs");
const path = require("path");

const siteUrl = "https://flutterpilot.com";
const buildDirectory = path.resolve(__dirname, "..", "build");
const rootEntry = path.join(buildDirectory, "index.html");

const routes = {
  "flutter-ui-builder": {
    title: "Flutter UI Builder with AI | FlutterPilot",
    description:
      "Design Flutter interfaces visually, generate layouts with AI, refine widgets, preview changes, and export editable Flutter source code.",
  },
  "ai-flutter-ui-generator": {
    title: "AI Flutter UI Generator from Prompts | FlutterPilot",
    description:
      "Generate editable Flutter screens from plain-language prompts, refine them visually, connect app behavior, and export Flutter source code.",
  },
  "flutter-app-builder": {
    title: "AI Flutter App Builder with Visual Editing | FlutterPilot",
    description:
      "Build multi-screen Flutter apps with AI, visual editing, actions, connected data, responsive previews, deployment tools, and source export.",
  },
  "flutterflow-alternative": {
    title: "FlutterFlow Alternative with AI and Code Export | FlutterPilot",
    description:
      "Explore an AI-first FlutterFlow alternative with visual editing, connected app workflows, and an exportable Flutter source project.",
  },
  template: {
    title: "Flutter App Templates and UI Starters | FlutterPilot",
    description:
      "Browse ready-to-edit Flutter app templates, open a starter in FlutterPilot Studio, and customize its screens, logic, data, and styling.",
  },
  docs: {
    title: "FlutterPilot Documentation and Product Guide",
    description:
      "Learn FlutterPilot's AI generation, visual UI, actions, state, connected data, deployment, source export, and component workflows.",
  },
  "about-us": {
    title: "About FlutterPilot",
    description:
      "Learn how FlutterPilot combines AI-assisted generation, visual editing, connected data, and Flutter source export for modern app teams.",
  },
  contact: {
    title: "Contact FlutterPilot Support",
    description:
      "Contact the FlutterPilot team for product questions, feedback, support, or suggestions.",
  },
  "privacy-policy": {
    title: "Privacy Policy | FlutterPilot",
    description:
      "Read how FlutterPilot collects, uses, stores, and protects account data and authorized Google user data.",
  },
};

function replaceMeta(html, attribute, key, content) {
  const expression = new RegExp(
    `<meta([^>]*?${attribute}=["']${key}["'][^>]*?)content=["'][^"']*["']([^>]*?)>`,
    "i"
  );
  return html.replace(expression, `<meta$1content="${content}"$2>`);
}

function createEntry(route, seo, rootHtml) {
  const canonical = `${siteUrl}/${route}/`;
  let html = rootHtml.replace(/<title>[^<]*<\/title>/i, `<title>${seo.title}</title>`);

  html = replaceMeta(html, "name", "title", seo.title);
  html = replaceMeta(html, "name", "description", seo.description);
  html = replaceMeta(html, "property", "og:url", canonical);
  html = replaceMeta(html, "property", "og:title", seo.title);
  html = replaceMeta(html, "property", "og:description", seo.description);
  html = replaceMeta(html, "name", "twitter:title", seo.title);
  html = replaceMeta(html, "name", "twitter:description", seo.description);
  html = html.replace(
    /<link([^>]*?)rel=["']canonical["']([^>]*?)href=["'][^"']*["']([^>]*?)>/i,
    `<link$1rel="canonical"$2href="${canonical}"$3>`
  );

  const routeDirectory = path.join(buildDirectory, route);
  fs.mkdirSync(routeDirectory, { recursive: true });
  fs.writeFileSync(path.join(routeDirectory, "index.html"), html);
}

if (!fs.existsSync(rootEntry)) {
  throw new Error(`Missing production entrypoint: ${rootEntry}`);
}

const rootHtml = fs.readFileSync(rootEntry, "utf8");
Object.entries(routes).forEach(([route, seo]) => createEntry(route, seo, rootHtml));

console.log(`Created ${Object.keys(routes).length} route entrypoints.`);
