// Runs after `react-scripts build`: prerender public routes, then write the
// sitemap. Set SKIP_PRERENDER=1 only for local builds without Chromium; the
// SEO checks (npm run test:seo) fail on such a build by design.
const prerender = require("./prerender");
const generateSitemap = require("./generate-sitemap");

async function postbuild() {
  if (process.env.SKIP_PRERENDER === "1") {
    console.warn("SKIP_PRERENDER=1: routes will be served as the client-side shell only.");
  } else {
    await prerender();
  }
  generateSitemap();
}

postbuild().catch((error) => {
  console.error(error);
  process.exit(1);
});
