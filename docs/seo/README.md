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
- **Add a redirect:** add a line to `public/_redirects` pointing at a canonical route, with `301`. Never add a `/* /index.html 200` fallback.
- **Before pushing:**

  ```sh
  npm test -- --watchAll=false
  npm run build             # prerenders every route (needs Chromium: npx playwright install chromium)
  npm run test:seo          # checks build/ offline
  npm run test:seo:pages    # HTTP checks against Cloudflare's local Pages server
  ```

- **After deploying:** `npm run test:seo:deployed -- https://flutterpilot.com --production`.
