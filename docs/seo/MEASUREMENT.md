# Measurement plan

Search Console is an observation tool. Nothing in this PR guarantees ranking, click or indexing changes; this document defines what to record and how to compare it so that any change, or the absence of one, can be read honestly.

## Baseline (record before deploying)

### Search performance (provided, Jul 18 – Oct 17, 2026)

| Metric | Jul 18 – Aug 14 | Sep 20 – Oct 17 |
|---|---:|---:|
| Clicks | 538 | 355 |
| Impressions | 8,490 | 5,161 |
| CTR | 6.34% | 6.88% |

| Page (full period) | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| `/` | 1,285 | 17,139 | 7.50% |
| `/flutter-ui-builder/` | 123 | 2,922 | 4.21% |
| `/ai-flutter-ui-generator/` | 37 | 1,141 | 3.24% |
| `/flutter-app-builder/` | 21 | 1,728 | 1.22% |
| `/flutterflow-alternative/` | 16 | 2,004 | 0.80% |
| `/template/` | 5 | 343 | 1.46% |
| `/docs/` | 4 | 557 | 0.72% |

| Priority query (full period) | Impressions | Clicks | CTR | Position |
|---|---:|---:|---:|---:|
| flutter ai | 3,998 | 76 | 1.90% | 6.86 |
| flutter app builder | 1,354 | 27 | 1.99% | 6.31 |
| flutter ai app builder | 1,091 | 131 | 12.01% | 2.89 |
| alternatives to flutterflow | 355 | 0 | 0% | 10.58 |
| flutterflow alternative | 181 | 0 | 0% | 11.10 |
| flutterflow alternatives | 122 | 0 | 0% | 14.20 |
| flutter ui builder | 146 | 22 | 15.07% | 4.41 |

### Indexing (latest coverage export)

11 indexed; 17 not indexed: 9 page with redirect, 4 alternative with proper canonical, 2 soft 404, 1 not found (404), 1 crawled – currently not indexed.

**Before deploying, also export from Search Console** (this environment had no access):

1. Pages → each "Not indexed" reason → the example URLs (CSV). Record each URL, its intended disposition (redirect / canonical alternative / 404 / should be indexed) and its last crawl date.
2. Performance → Search results → compare the two 28-day windows above with the **Pages** tab, then the **Queries** tab filtered to each product URL. This is the page × query × date data the audit could not see.
3. The same comparison split by **Device** and **Country** (top 5).
4. URL Inspection on `/template/` and the four product guides: save the "View crawled page" HTML and screenshot.

### Lab performance

Lighthouse 12, simulated mobile, local `wrangler pages dev`, **median of 5 runs**. These are lab numbers on a local server with no CDN, so use them for before/after comparison only; field data (CrUX, or the Core Web Vitals report in Search Console) is what matters for search.

| Page | Version | Perf | FCP | LCP | TBT | CLS | Transfer |
|---|---|---:|---:|---:|---:|---:|---:|
| `/` | before | 79 | 0.81 s | 4.09 s | 341 ms | 0 | 568 KB |
| `/` | after | 85 | 0.98 s | 2.67 s | 376 ms | 0 | 491 KB |
| `/flutterflow-alternative/` | before | 81 | 0.82 s | 4.01 s | 255 ms | 0 | 565 KB |
| `/flutterflow-alternative/` | after | 90 | 0.95 s | 2.63 s | 240 ms | 0 | 486 KB |
| `/flutter-app-builder/` | before | 83 | 0.82 s | 3.98 s | 247 ms | 0 | 565 KB |
| `/flutter-app-builder/` | after | 89 | 0.95 s | 2.60 s | 337 ms | 0 | 478 KB |
| `/template/` | before | 75 | 0.82 s | 3.90 s | 435 ms | 0 | 1,290 KB |
| `/template/` | after | 83 | 0.96 s | 1.88 s | 632 ms | 0 | 1,344 KB |

Reading the table:

- **LCP improved by roughly 1.4–2.0 s** (simulated), because the hero text now arrives in the HTML instead of after the JS bundle, route chunk and React render.
- **FCP is ~0.15 s later** in simulation. The HTML is larger, since prerendered markup carries inlined CSS (11–26 KB gzipped per page, against 1.2 KB for the old empty shell).
- **Transfer dropped ~80 KB** on non-template pages because Firebase is no longer preloaded.
- **TBT is similar on most pages** (React still renders the page once on the client), but **`/template/` got worse (435 → 632 ms)**: the page now has more content to re-render, and Firebase still initializes there for the live gallery. This is a follow-up candidate, for example deferring the gallery load until the section is near the viewport.
- `/template/` transfer is unchanged at ~1.3 MB because the gallery still needs Firebase on that page.

Reproduce: `npm run build && npm run test:seo:pages` serves the build; or run `npx wrangler pages dev build` and point Lighthouse at it.

## After deployment

### Day 0 (release day)

- [ ] `npm run test:seo:deployed -- https://flutterpilot.com --production`. All checks must pass, including the http → https and www → apex hops.
- [ ] Search Console → Sitemaps → resubmit `https://flutterpilot.com/sitemap.xml`; expect 11 discovered URLs.
- [ ] URL Inspection → **Test live URL** for `/`, the four guides, `/template/`, `/docs/changelogs/`. Confirm the H1 and body appear in the tested HTML. Request indexing for the changed pages.
- [ ] Note the release date in the GSC annotation log (or the team calendar).

### Weekly (same weekday each week)

Record in a sheet. Compare **rolling 28-day windows** with the previous 28 days and with the pre-release baseline. Use 7-day views only to spot breakage, never to judge impact.

| Metric | Where | Notes |
|---|---|---|
| Intended indexed / intended indexable (11) | GSC Pages | Target: the registry's 11 indexable URLs indexed. Redirect and canonical-alternative buckets are expected and are not failures. |
| Unexpected soft 404 / 404 count | GSC Pages | Each example URL should have a recorded disposition. |
| Organic clicks, impressions, CTR | GSC Performance | Whole property and per page. |
| Branded vs non-branded | GSC Performance, query filter | Branded = query contains `flutterpilot` or `flutter pilot` (regex `flutter\s?pilot`). Track both groups separately; non-branded growth is the goal. |
| Query groups: position, impressions, CTR | GSC Performance, query regex | *AI app building*: `flutter ai\|ai app builder`. *App builder*: `flutter app builder`. *UI builder*: `ui builder\|visual editor`. *UI generator*: `ui generator\|prompt`. *FlutterFlow*: `flutterflow`. |
| CTR for priority pages and queries | GSC Performance | Interpret CTR together with position; a CTR change at a new position isn't a snippet effect. |
| Device and country split | GSC Performance | Compare the top 5 countries and mobile vs desktop between windows. |
| Organic visits that click through to Studio | Analytics | Not instrumented today; see "Gaps". |
| Core Web Vitals (field) | GSC Core Web Vitals / CrUX | Expect too little traffic for URL-level CrUX data; origin-level only. |

### Decision points

- **2 weeks:** the guides and template should show as indexed with the new titles in URL Inspection. If not, inspect the rendered HTML before changing anything.
- **4 weeks:** first fair 28-day comparison. Look at per-page impressions for the guides and the FlutterFlow query group's position.
- **8 weeks:** decide on P2 content (see the IMPLEMENTATION_PLAN), based on which query groups moved.

Don't attribute changes to this release if the same movement shows in branded queries or across all pages at once. That pattern points to demand or algorithm changes.

## Gaps

- **No conversion tracking on this site.** Studio links don't record clicks, so "organic visits that reach Studio" can't be measured yet. Options: add privacy-preserving outbound-click analytics (needs a privacy policy update), or tag Studio links with `?ref=site-<page>` and count them in Studio's own analytics. Out of scope for this PR; it needs the owner's decision on analytics.
- **No GSC API access in CI.** All GSC steps above are manual.
