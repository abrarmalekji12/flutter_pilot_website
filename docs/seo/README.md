# SEO documentation

| Document | Contents |
|---|---|
| [AUDIT.md](./AUDIT.md) | Baseline audit: confirmed findings vs hypotheses, change timeline, route/intent map, prioritized fixes |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Architecture, what was done, deviations from Issue #12, P2 content evaluation, next steps |
| [PAGE_OPTIMIZATION.md](./PAGE_OPTIMIZATION.md) | Before/after title, description, H1, intent and content for each page |
| [MEASUREMENT.md](./MEASUREMENT.md) | Baseline numbers, post-release checklist, weekly monitoring |

## Everyday maintenance

- **Change a page's title, description, H1 or `lastmod`:** edit `src/seo/routes.json`. Set `lastmod` only when the page's content changes meaningfully; it feeds `sitemap.xml`. The registry H1 must match what the page renders; tests fail otherwise.
- **Add a public page:** add a React route in `src/pages/AppNav.jsx` and a registry entry. Prerendering, the sitemap and the checks pick it up automatically.
- **Add a documentation article:** add its content to `src/content/docArticles.js` and a registry entry with `"parent": "/docs/"`. The route, Home › Docs › page breadcrumb, prerendering and sitemap follow from the registry, and `npm run test:seo` requires 500 words and a link back to `/docs/`. Link the article from the docs hub or a guide so it isn't orphaned.
- **Link to FlutterPilot Studio:** build the URL with `src/utils/studioLinks.js` (`studioUrl({ campaign, content })`) so it carries UTM tags. Template deep links (`studioTemplateUrl`) must stay untagged. `npm run test:seo` checks both.
- **Change a cost or delivery fact:** edit `src/content/pricing.js` only, and update its `PRICING_AS_OF` date.
- **Add a redirect:** add a line to `public/_redirects` pointing at a canonical route, with `301`. Never add a `/* /index.html 200` fallback.
- **Before pushing:**

  ```sh
  npm test -- --watchAll=false
  npm run build             # builds, prerenders every route, writes the sitemap
  npm run test:seo          # checks build/ offline
  npm run test:seo:pages    # HTTP checks against Cloudflare's local Pages server
  ```

- **After deploying:** `npm run test:seo:deployed -- https://flutterpilot.com --production`.
