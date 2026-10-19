# FlutterPilot SEO baseline audit

_Audit date: 2026-10-19 · Repository state audited: `main` @ `6d7b809` · Tracking issue: [#12](https://github.com/abrarmalekji12/flutter_pilot_website/issues/12)_

This audit separates **confirmed findings** (reproduced from the repository, a build, or a Cloudflare Pages emulation) from **hypotheses** (plausible, but they need Search Console or live-site evidence that was not available). Nothing here claims a cause for the traffic decline; the evidence only narrows the candidates.

## 1. What evidence was and wasn't available

| Source | Available? | Notes |
|---|---|---|
| Repository history and source | Yes | Full git history back to 2024-03. |
| Production build (`npm run build`) | Yes | Built and inspected locally. |
| Cloudflare Pages behavior | **Emulated, then verified** | Baseline: `wrangler pages dev` (Cloudflare's own asset server: `_redirects`, `_headers`, `404.html`, trailing slashes). The new behavior was also verified on a deployed Cloudflare Pages preview by CI (145/145 checks, PR #13). |
| Live site / deployed preview | **No** | `flutterpilot.com` and `*.pages.dev` were blocked by this environment's network policy. The new CI workflow checks a real preview on the PR. |
| Search Console performance summary | Partial | Totals, 28-day windows, 7 priority queries and 7 pages, as provided in the task. |
| Search Console query × page × date data | **No** | No GSC access in this environment. |
| Coverage URL examples | **No** | The coverage export has aggregate counts only. |
| Field Core Web Vitals (CrUX) | **No** | Only local Lighthouse lab runs (see §6). |

## 2. Search performance baseline (as provided)

| Window | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| Jul 18 – Aug 14, 2026 (first 28 days) | 538 | 8,490 | 6.34% |
| Sep 20 – Oct 17, 2026 (last 28 days) | 355 | 5,161 | 6.88% |
| Change | −34.0% | −39.2% | +0.54 pt |
| Full period Jul 18 – Oct 17 | 1,494 | 21,977 | 6.80% (avg. position ≈ 8.66) |

Derived from the page table:

- The homepage has 86.0% of clicks (1,285 / 1,494) and 78.0% of property impressions (17,139 / 21,977). **Any homepage change dominates the totals.**
- The four product guides together had 197 clicks (13.2%). Their page-level impressions (7,795) can't be compared with the property total: GSC counts page-level impressions per URL, so a query that shows two FlutterPilot URLs counts twice. The page rows add up to 25,834, more than the 21,977 property total.
- The three FlutterFlow-alternative queries total 658 impressions and 0 clicks at average positions 10.6–14.2, which is page two. That points to a **ranking** problem, not a snippet problem; title rewrites alone are unlikely to fix it.
- `flutter ai` (3,998 impressions, position 6.86, 1.90% CTR) and `flutter app builder` (1,354, position 6.31, 1.99%) are broad queries ranking around position 6 with low CTR. `flutter ai app builder` (position 2.89, 12.0% CTR) and `flutter ui builder` (position 4.41, 15.1% CTR) are performing and should be protected.
- The query export covers 230 queries and 874 clicks, which is 58% of all clicks. **No query-to-page mapping can be derived from it**, and none is assumed here.

Because aggregate CTR rose while impressions fell, the decline is consistent with **fewer impressions** (lost visibility, lower demand, or fewer pages shown) rather than worse snippets. Which of these applies cannot be established without page × query × date data.

## 3. Timeline: what changed, and when

The comparison windows straddle a single large deployment.

| Date | Commit | Change |
|---|---|---|
| ≤ 2026-08-16 | — | Hosted on **GitHub Pages** (`gh-pages`, manual workflow). Four product guides were **static HTML articles of ~735–833 words** each (`public/<page>/index.html`). Homepage, docs, about, contact, privacy and template were rendered client-side. |
| **2026-08-16** | `4a3a84b`, `177c9d6` | **Moved to Cloudflare Pages.** Deleted the four static articles and replaced them with React pages, so the initial HTML became an empty `<div id="root">` with route-specific `<head>` tags only. Changed titles, descriptions and H1s on those pages. Redesigned the homepage hero (H1 "Generate a Flutter app from a prompt" became the rotating "Build a real Flutter … app from a prompt"). Added `_redirects`, `_headers`, a `NotFound` route, and docs/about/contact/privacy to the sitemap. |
| 2026-10-02 | `9cf646b` | Partner spotlight on homepage. |
| 2026-10-05 | `35611fd` | Static `/docs/changelogs/` page published (not added to the sitemap). |
| 2026-10-17 | `71669f2` | FlutterPilot Family section on homepage. |

The first comparison window (Jul 18 – Aug 14) is entirely before 2026-08-16; the last (Sep 20 – Oct 17) is entirely after. **Hosting, rendering, URL handling, metadata and homepage content all changed at once**, so the data cannot attribute the decline to any one of them.

### Pre-migration URL behavior (from the repository)

On GitHub Pages, `_redirects` is ignored and only files in `build/` exist. From the pre-migration tree:

| URL | HTTP behavior on GitHub Pages (inferred from files) |
|---|---|
| `/`, the 4 product guides, `/template/` | 200 (static files) |
| `/flutter-templates/`, `/free-flutter-templates/` | 200 + `<meta refresh>` + canonical to `/template/` |
| `/docs/`, `/aboutUs`, `/contactUs`, `/privacyPolicy`, `/download` | **404 with a noindex `404.html`**. React routes existed but were only reachable by in-app navigation. |
| Unknown URLs | 404 `404.html`. The React catch-all redirected to `/` client-side, but the server never served the app there. |

These inferences are untested against the old host, which no longer serves the site. They are a plausible source for the historical **404** and **page with redirect** buckets.

## 4. Confirmed findings

Each item was reproduced on the pre-change build (`6d7b809`) unless stated otherwise.

| # | Finding | Evidence | Severity | Status in this PR |
|---|---|---|---|---|
| C1 | **No page content in initial HTML.** Every route served `<div id="root"></div>` and a `<noscript>` saying JavaScript is required. Crawlers that don't render, and Google's first-wave HTML parse, saw no H1, body copy or internal links. | Built HTML inspected; `check-build.js` on the old build reports 0 H1s and 0 `<main>` words on every route. | High | Fixed: build-time prerendering. |
| C2 | **The four product guides lost ~800-word static articles on 2026-08-16.** | `git show 4a3a84b^:public/<page>/index.html` (735–833 words each, keyword H1s). | High (timing matches the decline; causality unproven) | Fixed: the pages are prerendered with 1,000–1,260 words each. |
| C3 | **Metadata defined in three places, and already drifting.** `public/index.html`, `RouteSeo.jsx` and `create-route-entrypoints.js`. Example: `/flutterflow-alternative/` served "Explore an AI-first FlutterFlow alternative…" in the HTML but "Explore FlutterPilot as a flexible FlutterFlow alternative…" after JS. | Diffing the files at `6d7b809`. | Medium | Fixed: one registry, `src/seo/routes.json`. |
| C4 | **`/template/` renders like a soft 404 when Firestore is unavailable.** Header, "0 templates available", "No templates available right now". No other content. | Reproduced in this sandbox, where Firebase hosts are blocked (screenshot in PR). | Medium–High | Fixed: static editorial content, timeout, error and retry states; Firebase loads only in browsers. |
| C5 | **Sitemap stale and incomplete.** All 10 URLs had `lastmod` 2026-08-16; `/docs/changelogs/` (indexable, self-canonical) was missing. | `public/sitemap.xml`. | Low–Medium | Fixed: generated from the registry, real per-page `lastmod`. |
| C6 | **`/download` returns 404**, although the app treats it as a route (to the homepage download section). | Emulated: `GET /download` → 404. | Low | Fixed: 301 to `/#download`. |
| C7 | **The `/* /index.html 200` rule is dead configuration.** Cloudflare rejects it ("Infinite loop detected in this rule and has been ignored"), so unknown URLs already returned a real **404**. Issue #12's soft-404 concern about this rule doesn't apply on Cloudflare, but the rule invites someone to "fix" it into a real catch-all. | `wrangler pages dev` startup log; emulated 404 for unknown paths. | Low (risk, not a defect) | Removed, with an explanatory comment and a test forbidding it. |
| C8 | **Homepage H1 text was "Build a real Flutter MobileDesktopWebMobile app…"** because the rotating words were in the DOM text (the `aria-label` only fixes it for screen readers). | Text content of the H1 in the rendered DOM. | Low | Fixed: visible words come from CSS `attr()`; the text reads "mobile, desktop, or web". |
| C9 | **Some internal links weren't crawlable.** "See the workflow", "Explore product guide", "Learn more" and template "Get Started" were `onClick` buttons with no `href`. | Source. | Low | Fixed: real `<a href>` links. |
| C10 | **The FlutterFlow comparison's earlier content was inaccurate.** The pre-August table claimed FlutterFlow had no AI UI generation and "limited" export with lock-in. FlutterFlow's docs describe AI page generation, Figma import, custom code and paid-plan code download. | FlutterFlow documentation (cited on the page). | Medium (trust and quality) | Not restored; the new comparison cites FlutterFlow's docs. |
| C11 | **Firebase downloaded on every page.** `Template` imported Firebase at module level, and the app preloads the Template chunk at idle on every page. | Lighthouse network log: the homepage fetched the 113 KB Firebase chunk in 5 of 5 runs. | Low (performance) | Fixed: Firebase loads only when the gallery mounts. |

Working as intended, so these were left alone: canonical URLs with trailing slashes; single-hop 308 redirects from slashless URLs (Cloudflare default); single-hop 301s for legacy aliases; `X-Robots-Tag: noindex` on `*.pages.dev`; robots.txt sitemap discovery; `404.html` noindex.

## 5. Hypotheses (not verified)

| # | Hypothesis | Why it's plausible | How to verify |
|---|---|---|---|
| H1 | The product guides lost impressions after their static content was removed and titles/H1s changed on 2026-08-16. | Timing; the pages became CSR shells. Google does render JavaScript, so the effect may be partial or delayed rather than total. | GSC Performance → Pages: compare Jul 18–Aug 14 vs Sep 20–Oct 17 per product URL. Use URL Inspection's "View crawled page" to check rendered HTML. |
| H2 | Most of the decline is the homepage, because it has 78% of impressions. The hero H1 changed from "Generate a Flutter app from a prompt" to a rotating headline whose text read "…Flutter MobileDesktopWebMobile app…". | Share of impressions; simultaneous content change. | GSC: filter page = `/`, compare windows by query; check whether `flutter ai` and `flutter app builder` impressions moved. |
| H3 | Part of the drop is demand or SERP change for broad queries (`flutter ai`), unrelated to the site. | `flutter ai` is broad and volatile. AI answers and SERP features can absorb impressions. | GSC query rows, week by week; Google Trends for the query group; compare position against impressions (stable position plus falling impressions points to demand). |
| H4 | One of the two **soft 404s** is `/template/`, rendered with an empty Firestore result or error in Google's renderer. | Confirmed failure mode (C4); anonymous Firebase auth and Firestore streaming in a headless renderer are fragile. | GSC Pages → Soft 404 → examples; URL Inspection → screenshot of `/template/`. |
| H5 | The **404** is `/download` or a pre-migration URL that GitHub Pages served as 404 (`/docs`, `/aboutUs`…). | C6 and §3. | GSC Pages → Not found (404) → URL and referring page. |
| H6 | The **9 redirects** are intentional variants: http/www, slashless URLs, `/aboutUs`-style aliases, `/flutter-templates`. The **4 canonical alternatives** are parameter or duplicate variants (for example `?prompt=` links, `/index.html`, `*.pages.dev`). | Matches the redirect rules and Cloudflare's slash handling. | GSC example URLs for each bucket. |
| H7 | **Crawled, not indexed** is `/docs/changelogs/` (new on Oct 5, not in the sitemap) or a thin page. | Timing. | GSC example URL. |

## 6. Performance baseline (lab, local emulation)

Lighthouse 12, simulated mobile throttling, local `wrangler pages dev`, Chromium 141. Numbers are **medians of 5 runs**. They are lab data on a local server with no CDN, so they're useful for before/after comparison only, not as field values. See [MEASUREMENT.md](./MEASUREMENT.md#lab-performance) for the post-change medians.

Observations that drove changes:

- Before: no content until JavaScript ran, so LCP waited for the JS bundle, the route chunk and the React render.
- The homepage typing animation and canvas background added main-thread work; these are kept for users and skipped only during prerendering.
- The Firebase chunk (365 KB minified, ~113 KB transferred) was downloaded on the homepage in all 5 baseline runs through idle preloading (C11), and in none of the post-change runs.

## 7. Route and intent map

Based on each page's existing content and the provided query data. Queries are listed only where the page's content actually answers them; no GSC query-to-page mapping was available.

| Route | Primary intent | Query themes it should serve | Distinct from |
|---|---|---|---|
| `/` | Brand + "AI Flutter app builder" | flutterpilot, flutter ai app builder, flutter ai | Hub; links to every guide |
| `/flutter-ui-builder/` | Building Flutter UI visually with real widgets | flutter ui builder, flutter visual editor | AI generator (prompt first), app builder (whole app) |
| `/ai-flutter-ui-generator/` | Generating Flutter UI from a prompt | ai flutter ui generator, flutter ui from prompt | UI builder (manual), app builder (end to end) |
| `/flutter-app-builder/` | Building a complete Flutter app (screens, logic, data, export) | flutter app builder, build flutter app with ai | UI builder and AI generator (single screens) |
| `/flutterflow-alternative/` | Evaluating FlutterFlow alternatives | flutterflow alternative(s), alternatives to flutterflow | Only comparison page |
| `/template/` | Flutter app templates | flutter templates, flutter app templates | — |
| `/docs/` | Product documentation | flutterpilot docs | Guides are task-oriented; docs are a feature reference |
| `/docs/changelogs/` | Release notes | flutterpilot 2.0 | — |
| `/about-us/`, `/contact/`, `/privacy-policy/` | Company, support, legal | brand navigational | — |

## 8. Prioritized fixes

| Priority | Fix | Addresses | Done here |
|---|---|---|---|
| P0 | Prerender all public routes into initial HTML | C1, C2, C8, H1, H2 | ✅ |
| P0 | Single metadata registry for head tags, prerender, sitemap and tests | C3 | ✅ |
| P0 | Template page resilient to Firebase failure | C4, H4 | ✅ |
| P0 | Remove the dead SPA rewrite; 301 `/download`; verify 404/redirect behavior | C6, C7, H5 | ✅ (emulated; preview check in CI) |
| P0 | Generated sitemap with real `lastmod`, including the changelog | C5, H7 | ✅ |
| P1 | Rework the four product guides with distinct intent, real workflow and screenshots; accurate FlutterFlow comparison | C2, C10, query table | ✅ |
| P1 | Internal links: homepage hub, docs ↔ guides, changelog | C9 | ✅ |
| P1 | SEO regression tests in CI and against previews | — | ✅ |
| P1 | Pull GSC URL examples for every exclusion bucket and record a disposition for each | H4–H7 | ❌ Needs GSC access (see MEASUREMENT.md) |
| P2 | New content assets (see IMPLEMENTATION_PLAN.md §P2) | Non-branded growth | Evaluated; not published |
