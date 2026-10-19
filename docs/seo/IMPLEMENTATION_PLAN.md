# SEO implementation plan

Updates the plan in [Issue #12](https://github.com/abrarmalekji12/flutter_pilot_website/issues/12) with the audit findings ([AUDIT.md](./AUDIT.md)). ✅ = done in this PR, ⏳ = needs Search Console or the deployed site, 🔜 = later.

## Architecture

```
src/seo/routes.json          single source of truth: path, title, description, H1,
                             indexability, image, schema type, lastmod
src/seo/seo.js               head tags + JSON-LD built from the registry
src/componets/RouteSeo.jsx   applies them at runtime (client navigation)
scripts/prerender.js         renders each React route in headless Chromium and writes
                             build/<route>/index.html and build/404.html
scripts/generate-sitemap.js  sitemap.xml from indexable registry routes
scripts/seo/*                regression checks (build, Pages emulation, live preview)
```

**Prerendering and hydration.** The prerenderer captures the DOM after React renders, including the `<head>` tags RouteSeo writes, so the static HTML and the runtime tags come from the same code. In the browser, `src/index.js` lets the prerendered HTML paint, preloads the current route's chunk, and then renders React over it in one commit. It deliberately does **not** call `hydrateRoot`: MUI's JSS class names are counter-based, and React 18 does not patch attribute mismatches in production, so hydration could leave pages mis-styled. Rendering over the markup avoids that whole class of bugs. The cost is one client render, which already happened before this change.

**Why not a framework migration?** Incremental prerendering covers every requirement (content, H1, links, metadata in initial HTML; the client app unchanged) without touching routing, styling or deployment. A migration to Next.js or Remix would rewrite the app for no SEO benefit beyond what prerendering already provides for a static marketing site.

**Prerender determinism.** `window.__FLUTTERPILOT_PRERENDER__` makes the app skip Firebase, the random typing animation and the canvas background. The prerenderer blocks every request outside its local server and fails the build on runtime errors or title mismatches.

## P0: technical SEO

| Task | Status | Notes / deviation from #12 |
|---|---|---|
| Correct HTTP statuses and redirects | ✅ emulated; ⏳ preview | #12 assumed `/* /index.html 200` caused soft 404s. Cloudflare already ignores that rule as an infinite loop, and unknown URLs return 404 with `404.html`. The rule was removed so it can't be "fixed" into a real catch-all. Added 301 `/download` → `/#download`. |
| Verify on a deployed preview | ⏳ | Not reachable from this environment. `.github/workflows/seo-checks.yml` deploys a preview and runs `check-deployment.js` against it on this PR, if the Cloudflare secrets are available to the workflow. |
| Content in initial HTML | ✅ | All 10 React routes plus `404.html`. |
| Centralized metadata | ✅ | `public/index.html` keeps homepage defaults for the app shell only. |
| Sitemap from the registry | ✅ | 11 URLs including `/docs/changelogs/`; `lastmod` is maintained by hand per route. |
| Resilient `/template/` | ✅ | Build-time snapshots of public templates were considered and rejected for now: they would need Firestore credentials in CI and add a data-freshness problem. The static editorial content solves the soft-404 risk without them. |
| Protocol and `www` normalization | ⏳ | Zone-level Cloudflare setting. Check with `npm run test:seo:deployed -- https://flutterpilot.com --production` after deploy. |

## P1: landing pages and internal links

| Task | Status |
|---|---|
| Homepage: additive "Choose where to start" hub; title, description and design unchanged | ✅ |
| `/flutterflow-alternative/`: sourced comparison, trade-offs, evaluation workflow, FAQ | ✅ |
| `/flutter-app-builder/`: six-step workflow, endpoint panel, worked example | ✅ |
| `/flutter-ui-builder/`: editor walkthrough, screen workflow | ✅ |
| `/ai-flutter-ui-generator/`: prompt examples, checks, follow-ups, tips | ✅ |
| Docs ↔ guides ↔ changelog links; crawlable buttons | ✅ |
| Real product screenshots per page | ✅ Existing assets; the workflow GIF and video could be added later |

## P2: new content (evaluated, not published)

The task says to add new pages only after the existing ones are stable, and only where real search demand and real product evidence exist. With no query × page data available and four pages just rewritten, publishing more pages now would make it harder to read the effect of this release. Recommended order once 4–6 weeks of post-release data are in:

| Candidate | Unique intent? | Evidence available | Recommendation |
|---|---|---|---|
| Connecting a REST API to a Flutter app | Yes: how-to, not a product page | Endpoint Connectors screenshot; Postman import, mock responses and DataLoaderWidget are documented | **1st**: highest utility, clearly distinct from the app-builder page |
| Exporting and customizing AI-generated Flutter code | Yes | Export & Publish docs; needs a real exported project to show its structure | **2nd**, once a real export can be shown (don't invent its structure) |
| Realistic Flutter UI template examples | Partly overlaps `/template/` | Needs public template data | Only as template detail pages, with unique content per template |
| How to build a Flutter app with AI | Overlaps `/flutter-app-builder/` and `/ai-flutter-ui-generator/` | — | **Skip**: would cannibalize the rewritten pages |
| How to generate Flutter UI from a prompt | Overlaps `/ai-flutter-ui-generator/` | — | **Skip** |
| Building screens with a visual editor | Overlaps `/flutter-ui-builder/` | — | **Skip** |
| FlutterPilot vs FlutterFlow workflow comparison | Overlaps `/flutterflow-alternative/` | — | **Skip**: extend that page instead |

## Performance

Measured, not assumed; see [MEASUREMENT.md](./MEASUREMENT.md#lab-performance). Changes made because of the measurements:

- Firebase no longer downloads on non-template pages.
- The client paints prerendered HTML before its first render. Without this, the homepage's mobile FCP got *worse* (observed 2.2s) because React's render ran before the first paint.

Not changed: the typing animation and canvas background (users see the same experience); the video `preload="none"` setup is already efficient.

## Next steps

1. ⏳ Review the preview deployment checks on this PR.
2. ⏳ After merge: run `npm run test:seo:deployed -- https://flutterpilot.com --production`.
3. ⏳ Search Console: resubmit the sitemap; inspect the four guides, `/template/` and `/docs/changelogs/`; collect example URLs for every exclusion bucket and record a disposition for each in #12.
4. 🔜 Weekly monitoring per [MEASUREMENT.md](./MEASUREMENT.md).
5. 🔜 Revisit P2 after 4–6 weeks of data.
