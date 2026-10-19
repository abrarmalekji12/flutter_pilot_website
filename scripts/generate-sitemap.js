// Writes build/sitemap.xml from the route registry: only canonical, indexable
// pages, each with the date its content last changed meaningfully (set by hand
// in src/seo/routes.json, never the build date).
const fs = require("fs");
const path = require("path");
const { indexableRoutes, buildDirectory, absoluteUrl } = require("./seo/registry");

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function generateSitemap() {
  const urls = indexableRoutes
    .map((route) => {
      const lastmod = route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(absoluteUrl(route.path))}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(buildDirectory, "sitemap.xml"), xml);
  console.log(`Wrote sitemap.xml with ${indexableRoutes.length} URLs.`);
}

module.exports = generateSitemap;

if (require.main === module) generateSitemap();
