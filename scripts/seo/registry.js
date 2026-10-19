// Node-side access to the route registry shared with the React app.
const path = require("path");
const registry = require("../../src/seo/routes.json");

const buildDirectory = path.resolve(process.env.SEO_BUILD_DIR || path.join(__dirname, "..", "..", "build"));

const routeFile = (routePath) => path.join(buildDirectory, routePath, "index.html");

module.exports = {
  registry,
  siteUrl: registry.siteUrl,
  routes: registry.routes,
  indexableRoutes: registry.routes.filter((route) => route.indexable),
  buildDirectory,
  routeFile,
  absoluteUrl: (routePath) => `${registry.siteUrl}${routePath}`,
};
