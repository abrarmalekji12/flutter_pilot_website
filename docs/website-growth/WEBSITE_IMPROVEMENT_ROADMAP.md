# FlutterPilot.com improvement roadmap

_Prepared 2026-10-27 · Based on [PLATFORM_CAPABILITY_AUDIT.md](./PLATFORM_CAPABILITY_AUDIT.md), [WEBSITE_GROWTH_AUDIT.md](./WEBSITE_GROWTH_AUDIT.md) and [COMPETITOR_AND_KEYWORD_RESEARCH.md](./COMPETITOR_AND_KEYWORD_RESEARCH.md)_

## Implementation status (2026-10-27, PR #16)

| Item | Status | Notes |
|---|---|---|
| R1.1 cost and delivery section | ✅ Done | Facts in `src/content/pricing.js`. 🔒 The owner should confirm F2 (pack price) and F3 (AI cost per screen) from the milestone doc; F7 (free allowances) is deliberately left out. |
| R1.2 measured, crawlable Studio links | ✅ Done | `src/utils/studioLinks.js`; `check-build.js` guards UTM tags and untagged template links. Links use `rel="noopener noreferrer"` (CRA lint requires it), so attribution relies on UTM tags. |
| R1.3 copy accuracy and naming | ✅ Done | |
| R2.5 FlutterFlow page | 🟡 Partly done | Pricing-model row, export cost, "moving from FlutterFlow" and pricing FAQs. FlutterFlow facts were not re-checked (network-blocked); `checkedOn` stays October 19. |
| R1.7 About and Contact | ✅ Done | The owner can add founding year and team facts; none were invented. |
| R2.6 structured data | ✅ Done | Offer price 0 with "no subscription; credits optional"; App Store in `sameAs`. |
| R0.2 production check in CI | ✅ Done (non-blocking) | Remove `continue-on-error` after the first green production run. |
| R2.1 docs batch 1 | 🟡 3 of 4 pages | `/docs/rest-api/`, `/docs/publish-web-app/`, `/docs/android-apk/`. `/docs/export-flutter-code/` waits for a real export to describe. |
| R2.2 Google Sheets tutorial | ✅ Done | `/docs/google-sheets/` (Beta). |
| R0.1, R0.3, R0.4 | ⏳ Owner | Search Console, Cloudflare dashboard and download-link checks. |
| R1.4, R1.5, R1.6, R1.8, R2.3, R2.4, R2.7, R2.8, R2.9, R3.x | ⏳ Not started | Need measurement data, owner facts or assets, other repositories, or field CWV data (see each item). |

**Ground rules for every item:**

- Preserve the visual identity: colors, typography, hero, screenshots and existing animations. New sections reuse existing styles (`src/styles/commonStyles.js`, `ProductGuidePage.jsx` classes). No redesign, no framework migration, no new design system.
- Every product claim must map to a PLATFORM_CAPABILITY_AUDIT ID. Items marked **🔒 owner facts** need the owner to confirm numbers or policy before merge.
- Never change the homepage title or H1 (86% of clicks) without a measured reason.
- Each PR runs `npm test -- --watchAll=false`, `npm run build`, `npm run test:seo` and `npm run test:seo:pages`. CI deploys previews and checks them (`.github/workflows/seo-checks.yml`).
- New public pages: add a React route in `src/pages/AppNav.jsx` **and** an entry in `src/seo/routes.json`, with a real `lastmod`. Prerendering, sitemap and checks pick them up automatically (`docs/seo/README.md`).

## 1. Prioritization matrix

Impact is a relative judgment (H/M/L) from the evidence cited, **not a forecast**. Effort: S ≈ under a day, M ≈ 1–3 days, L ≈ a week or more of engineering and content work.

| ID | Improvement | Evidence | Traffic impact | Conversion impact | Effort | Risk | Priority |
|---|---|---|---|---|---|---|---|
| R0.1 | Pull GSC URL-level coverage; resubmit sitemap; record dispositions | Growth audit §2, §4.2 | M (unblocks diagnosis) | — | S (manual) | None | **P0** |
| R0.2 | Verify production `http`/`www` hops in CI | Growth audit T2 | M if broken | — | S | Low | **P0** |
| R0.3 | Audit Cloudflare bot and AI-crawler settings | Research §6.1 | M (AI answers) if blocked | — | S (dashboard) | Low | **P0** |
| R0.4 | Verify download and store links (staging bucket) | Growth audit P-6 | — | M if broken | S (manual) | None | **P0** |
| R1.1 | "What it costs and what you can ship" homepage section 🔒 | Capability S5, B1–B5; audit §5.1 | L–M | **H** | S–M | Low (facts must be right) | **P1 — milestone 1** |
| R1.2 | Crawlable, UTM-measured Studio and download links; hero prompt as GET form | Audit T6, §8 | L | **H** (measurability) | S | Low (template-link caveat) | **P1 — milestone 1** |
| R1.3 | Copy accuracy and naming fixes | Capability §4 | L | M (trust) | S | None | **P1** |
| R1.4 | `/pricing/` page 🔒 | Research §5.2, audit §4.4 | M (branded + "free" intent) | **H** | M | Low | **P1** |
| R1.5 | Studio subdomain indexing hygiene (cross-repo) | Audit T3; `flutterpilot-pro/docs/manage/2026-10-19-web-seo-sitemap-growth.md` | M | M | M | Medium (OAuth and deep links) | **P1** |
| R1.6 | Changelog cadence and structure 🔒 | Audit T10 | L–M | M (trust) | S per release | None | **P1** |
| R1.7 | About and Contact trust content 🔒 | Audit T7 | L | M | S | None | **P1** |
| R1.8 | Replace repeated guide feature grids with page-specific proof | Audit T8 | M | M | M | Low | **P1** |
| R2.1 | Public docs leaf pages, batch 1 (4 pages) | Audit T12; research §5.2 | **H** (non-branded long tail) | M (activation) | L | Low | **P2** |
| R2.2 | Google Sheets → Flutter app tutorial (Beta) | Capability D4 | M | M | M | Low | **P2** |
| R2.3 | Real-output proof: generated-app gallery, live demo, public export repo 🔒 | Audit §7; research §6.2 | M | **H** | M–L (needs assets) | Low | **P2** |
| R2.4 | Curated template detail pages | Studio SEO doc; research §5.2 | M | M | L | Medium (thin pages if rushed) | **P2** |
| R2.5 | FlutterFlow page: dated pricing and export row, migration checklist | Audit T11; research §3 | M | M | S–M | Medium (competitor facts) | **P2** |
| R2.6 | Structured data completeness | Audit T5 | L | — | S | Low | **P2** |
| R2.7 | Performance and accessibility follow-ups | Audit §9 | L–M (CWV) | L–M | M | Low | **P2** |
| R2.8 | Hosted-app (`*-app.flutterpilot.com`) indexing policy (cross-repo) | Audit T4 | L | — | S–M | Medium (customer expectation) | **P2** |
| R2.9 | Cookieless website analytics (Cloudflare Web Analytics) | Audit §8 | — | M (measurement) | S | Low (privacy text) | **P2** |
| R3.1 | Earned independent mentions (launches, community, video) | Research §6.2 | M (long-term) | M | Ongoing | Low | **P3/strategic** |
| R3.2 | Case study from the Reference Commerce journey | Capability D11 / mgmt docs | M | M | L | Medium (acceptance pending) | P3 |
| R3.3 | Firebase/Supabase auth tutorials | Capability D9 | M | M | M | Medium (Beta) | P3 |
| R3.4 | Optional `llms.txt` | Research §6.1 | Unknown (speculative) | — | S | None | P3 |
| R3.5 | Move partner and family sections below the final CTA | Audit §5.3 | — | L–M | S | Owner preference | P3 |
| R3.6 | Styling-runtime consolidation (JSS → emotion) when touching components | Audit P-2 | — | — | Ongoing | Low | P3 |

**Quick wins** (S effort, P0–P1): R0.1–R0.4, R1.2, R1.3, R1.6, R1.7, R2.6.
**Projects** (M–L effort): R1.4, R1.5, R1.8, R2.1, R2.3, R2.4, R2.7.

## 2. Immediate technical fixes and verification (P0)

### R0.1 — Search Console evidence pull (owner, manual)

- **Problem:** Every coverage conclusion is aggregate-only. The 2026-10-27 coverage export referenced in the task brief was not available to this investigation.
- **Change:** In GSC: (1) confirm whether the property is a **Domain** property (it would then include `studio.` and `*-app.` hosts) or URL-prefix; (2) Sitemaps → resubmit `https://flutterpilot.com/sitemap.xml` and confirm "Success" with 11 discovered URLs; (3) Pages → for each "Not indexed" reason, export the example URLs; (4) URL Inspection → Test live URL for the 11 registry URLs. Record each URL's disposition (intentional redirect / canonical alternative / real 404 / should be indexed / content quality) in Issue #12.
- **Success:** each excluded URL has a recorded disposition; the 11 registry URLs are "URL is on Google" or have a known reason.
- **Risk:** none.

### R0.2 — Verify production protocol and `www` redirects in CI

- **Files:** `.github/workflows/deploy-cloudflare.yml`.
- **Problem:** `check-deployment.js --production` (checks `http://flutterpilot.com/`, `https://www.…`, `http://www.…` end in one hop at the canonical) has only ever been documented as a manual step. CI logs show only `pages.dev` and `--sitemap-only` runs.
- **Change:** Run it once by hand: `npm run test:seo:deployed -- https://flutterpilot.com --production`. Then add a step after "Verify public-domain sitemap" running the same command with the existing 6-attempt retry loop. If the manual run fails, fix the zone-level setting (Cloudflare "Always Use HTTPS" plus a `www` redirect rule) **before** making the step blocking.
- **Success:** the step passes on every production deploy.
- **Risk:** a red deploy if the zone is misconfigured. That's intended, because it reveals a real defect.

### R0.3 — Cloudflare bot and AI-crawler settings audit (owner, dashboard)

- **Problem:** Cloudflare announced default AI-bot blocking on 2025-07-01. Whether flutterpilot.com blocks or challenges OAI-SearchBot, PerplexityBot or other retrieval bots is unknown. `robots.txt` allows everything, but edge rules can override it.
- **Change:** In Cloudflare → Security → Bots / AI Crawl Control: record the current setting. Allow search and retrieval crawlers if AI-answer visibility is wanted. Decide on training crawlers separately. Confirm Googlebot and Bingbot are never challenged. Document the decision in `docs/website-growth/` or Issue #12.
- **Success:** a recorded policy; crawler logs in AI Crawl Control show allowed retrieval bots.

### R0.4 — Download and store link verification (owner, manual)

- **Problem:** macOS/Windows downloads point at `storage.googleapis.com/flutter-visual-builder-staging.appspot.com/releases/...` (`src/componets/productshowcase.jsx:57-60`).
- **Change:** confirm each URL returns the current signed release, and that the Play Store (`com.builder.flutterpilot`) and App Store (`id6759552936`) links resolve. If the production artifacts live elsewhere, update the URLs in the R1.2 link helper.

## 3. High-impact content and messaging (P1)

### R1.1 — "What it costs and what you can ship" (milestone 1)

Specified fully in [FIRST_IMPLEMENTATION_MILESTONE.md](./FIRST_IMPLEMENTATION_MILESTONE.md).

### R1.3 — Copy accuracy and naming fixes

- **Files:** `src/componets/productGuideContent.js`, `src/pages/Landing.jsx`, `src/componets/promptgeneratorhero.jsx` (subtitle only), `src/pages/Docs/Docs.jsx`, `src/pages/AboutUs/AboutUs.jsx` (one line).
- **Changes** (each maps to PLATFORM_CAPABILITY_AUDIT §4):
  1. Remove "import custom widgets" (UI builder `features` and `faq`) and "imported custom widgets" (FlutterFlow comparison row). Replace with "reusable custom components" and "Dart expressions in any property".
  2. Replace "AI project creator (labelled Beta in the Studio)" in 3 places with accurate wording: "AI project generation creates Starter Apps; the AI Agent is labelled Beta."
  3. Rename "Project-Aware AI Copilot" / "copilot" to **"AI Agent"** (the Studio's name) across the homepage, guides and docs. Keep the Beta label visible.
  4. Add "(Beta)" to Figma Import and to Google Sheets, Firebase and Supabase where listed as data sources.
  5. Hero subtitle: append the desktop qualifier, for example "…export the Flutter source (build for desktop with your own Flutter tools) or deploy to the web in one click." **The H1 does not change.**
  6. About: replace "Generate basic screens, layouts, and structures" with an accurate one-line product definition (see research §6.2).
- **Tests:** `routes.test.js` (H1s unchanged); `test:seo` (descriptions are unchanged unless deliberately edited in `routes.json`).
- **Success:** no unverified claims remain (spot-check against the capability audit).
- **Risk:** none. Copy is shorter or more precise.

### R1.4 — `/pricing/` page 🔒 owner facts

- **Files:** new `src/pages/Pricing/Pricing.jsx`; `src/pages/AppNav.jsx` (route); `src/seo/routes.json` (entry: title "FlutterPilot Pricing – Pay-as-You-Go Credits, Free Code Export", H1 "FlutterPilot pricing", `lastmod`, breadcrumb "Pricing"); header `menuItems` in `src/componets/appbar.jsx`; footer link in `src/componets/Footer.jsx`.
- **Content (factual, dated):** how credits work; credit packs with "about" USD prices and "local currency shown at checkout" (Razorpay on web, Google Play on Android); what costs credits (AI generation from 1 credit per screen, varying by model; APK 3; web publish 5); what's free (source export; any confirmed free allowance); what's not available yet (Play/App Store publishing, iOS build); visible FAQ (**no FAQPage markup**, see research §6.1); "Prices as of <date>".
- **Depends on:** the owner reconciling the free-usage facts (capability A8, S7) and the in-app "3 credits / build or publish" display bug (S6).
- **Measurement:** GSC impressions for `flutterpilot pricing|credits|free`; Studio sessions with `utm_campaign=pricing`.
- **Risk:** stale prices. Keep numbers in one constant (`src/content/pricing.js`) shared with the R1.1 section, and review them at every pricing config change (`flutterpilot-cloudflare/config/razorpay_pricing.json` version bump).

### R1.5 — Studio subdomain indexing hygiene (cross-repo: `flutterpilot-pro`)

- **Aligns with** `flutterpilot-pro/docs/manage/2026-10-19-web-seo-sitemap-growth.md` (investigated, owner approval pending). Don't duplicate it; approve and implement that plan.
- **Files (Studio repo):** `web/index.html`, `web/robots.txt`, `web/sitemap.xml`, `lib/common/web/html_lib_web.dart`, `lib/route.dart`.
- **Changes:** remove the `FAQPage` JSON-LD and `meta keywords`; replace the overclaiming title, description and `SoftwareApplication` text ("no coding needed", "production-ready", "real-time collaboration", "best FlutterFlow alternative") with the shared factual definition, or simply "FlutterPilot Studio – sign in"; add `noindex` for `/login`, `/register`, `/reset-password` and utility routes; route-level `noindex` on `RouteNotFound`; drop auth URLs from the Studio sitemap (or remove the sitemap).
- **Keep working:** `?prompt=` handoff on `/`, `/login`, `/register` (`lib/routing/startup_route.dart`); OAuth callbacks; `/template/<id>` deep links.
- **Success:** brand queries show `flutterpilot.com` as the primary result; no Studio auth URLs indexed (GSC, if the property covers the subdomain).
- **Risk:** medium. Test OAuth and deep links on a Firebase preview channel before release.

### R1.6 — Changelog cadence and structure 🔒

- **Files:** `public/docs/changelogs/index.html`; `src/seo/routes.json` (title, description, H1 and `lastmod` for `/docs/changelogs/`).
- **Change:** keep 2.0.0 and add newer entries **only for features released to users** (the owner supplies the list; management records distinguish "merged" from "released"). Give each release an `id` anchor (`#v2-1-0`) and a date. Retitle to "FlutterPilot Changelog and Release Notes" with H1 "FlutterPilot release notes". Optionally add a small JSON-LD `WebPage` with `dateModified` for consistency with React routes.
- **Success:** `lastmod` updated at least monthly; GSC shows the page indexed.

### R1.7 — About and Contact trust content 🔒

- **Files:** `src/pages/AboutUs/AboutUs.jsx`, `src/pages/ContactUs/ContactUs.jsx`, `src/seo/routes.json` (H1 and `lastmod`).
- **About:** H1 "About FlutterPilot". Add the factual product definition; who builds it (company name AM Softwares and location are already on the page; add the founding year and maker names **only if the owner provides them**); platforms; links to the changelog, pricing and privacy policy. **No invented team, customer or usage numbers.**
- **Contact:** show the support email (`support@flutterpilot.com`, already used in the privacy policy and app), the expected response time if the owner commits to one, and links to docs, the changelog and in-app feedback.
- **Success:** both pages over 250 meaningful words; `/about-us/` and `/contact/` indexed.

### R1.8 — Page-specific proof instead of repeated feature grids

- **Files:** `src/componets/ProductGuidePage.jsx` (the "Tools for the work between a prompt and a shipped app" section at line ~356), `src/componets/productGuideContent.js` (`features` arrays).
- **Change:** replace each guide's generic six-card grid with one page-specific block:
  - **UI builder:** a selected widget tree beside its exported Dart snippet (from a real export).
  - **AI generator:** the actual output screenshots for its three example prompts.
  - **App builder:** the concrete action list (navigation, conditions, loops, API call, record mutation, sign-in, device actions).
  - **FlutterFlow:** the migration checklist (R2.5).

  Keep the grid component for the homepage only.
- **Success:** guide pages share less boilerplate; time on page and Studio click-through per guide (UTM) rise relative to baseline.
- **Risk:** low. Keep word counts at or above the current minimums in `check-build.js`.

## 4. Conversion optimizations

| ID | Change | Files | Notes |
|---|---|---|---|
| R1.2 | Crawlable, measured CTAs (milestone 1) | see the milestone doc | **Don't add UTM to `/template/<id>` links** (Studio regex limitation, growth audit §8) |
| R1.1 | Cost and delivery facts (milestone 1) | see the milestone doc | — |
| R2.9 | Cookieless website analytics | Cloudflare dashboard (Web Analytics) or one beacon `<script>` in `public/index.html` (inherited by prerendered pages); `src/pages/PrivacyPolicy/PrivacyPolicy.jsx` text | Owner decision. Gives website-side page views to pair with Studio GA4. No cookies; no consent banner needed under most regimes (owner to confirm for their jurisdiction). |
| R2.10 | One expectation line under the hero Generate button: "Opens FlutterPilot Studio. Sign in to generate." (Add "free to start" only once verified.) | `src/componets/promptgeneratorhero.jsx` | Reduces surprise at the sign-in wall |
| R3.5 | Move the FlutterPilot Family and Partner sections below the final Studio CTA | `src/pages/Landing.jsx`; update `src/App.test.js` order assertion | Owner preference; owner-requested placement today |

## 5. Product-led landing pages and tutorials (P2)

### R2.1 — Public docs leaf pages, batch 1

- **Why:** the largest non-branded content gap, and the content already exists inside the Studio (`flutterpilot-pro/lib/ai/rag_context.dart` §1–12; `.planning/rag_docs/*`). Each page answers one task completely.
- **Infrastructure (first PR):** a `DocArticle` page component reusing `ProductGuidePage` styles; a `docs` content module (`src/content/docs/*.js`); registry entries with `breadcrumb`; extend `buildStructuredData` breadcrumbs to three levels (Home › Docs › Page) for routes with a `parent` field; add the docs leaf links to `/docs/` cards and to the relevant guide sections.
- **Batch 1 pages** (capability-backed, Production-ready):
  1. `/docs/rest-api/`: "Connect a REST API to a Flutter app". Endpoints, headers, arguments, global variables, mock responses, Postman import, DataLoaderWidget states (D8). Screenshot: `public/endpoint_preview.webp`, plus one new capture.
  2. `/docs/export-flutter-code/`: "Export your project as Flutter code". What's in the ZIP, running it locally, adding desktop/iOS platforms with `flutter create .`, limits (signing, dependencies) (B1, B6). **Needs one real export to describe the structure accurately.**
  3. `/docs/publish-web-app/`: "Publish a Flutter web app to a live URL". Cost, time, URL format, updating, unpublishing (B3).
  4. `/docs/android-apk/`: "Build an Android APK in the cloud". Cost, time, install and share, why it isn't a Play release, how to get to Play from exported source (B2, B4).
- **Per-page requirements:** unique title, description and H1; at least 600 words of task content; at least one real screenshot; "Last updated" date; links to the related guide and to Studio (UTM `utm_campaign=docs-<slug>`).
- **Success:** each page indexed within 4 weeks; non-branded impressions on docs URLs; Studio sessions from `docs-*` campaigns.
- **Risk:** docs drift from the product. Add owner review at each Studio release.

### R2.2 — Google Sheets → Flutter app tutorial (Beta)

- `/docs/google-sheets/`: connect a sheet, header-row rule, enable it per project, insert a mapped list/detail/form template, bind and edit rows, preview with live rows; limits (Beta, Google sign-in scope `drive.file`) (D4). Links to the privacy policy's Google user-data section.

### R2.3 — Real-output proof 🔒 owner assets

- **Assets the owner produces in Studio:** for 3 prompts (reuse the AI generator page's example prompts), the unedited generated screens plus a lightly edited version; one published hosted web app (`<slug>-app.flutterpilot.com`) of a FlutterPilot-owned sample; one public GitHub repository containing that sample's **unmodified** exported Flutter project with a README noting the FlutterPilot version and date.
- **Placement:** an "Examples generated with FlutterPilot" section on `/ai-flutter-ui-generator/` (replacing the generic grid per R1.8); a "Try a live example" link in the homepage cost and delivery section; the repo linked from `/docs/export-flutter-code/` and `/flutterflow-alternative/`.
- **Success:** click-through to the live demo and repo; GitHub stars and referrals as an earned-mention proxy.
- **Risk:** low, provided outputs are presented as they really came out (label any manual edits).

### R2.4 — Curated template detail pages

- **Data:** a committed JSON file (`src/content/templates.json`) holding curated public template metadata (id, slug, name, description, screens, features demonstrated, screenshots copied into `public/templates/`). This deliberately avoids Firestore credentials in CI (`docs/seo/IMPLEMENTATION_PLAN.md`).
- **Pages:** `/template/<slug>/` with unique write-ups and the "Open in Studio" deep link `https://studio.flutterpilot.com/template/<id>` (**no query string**). Publish only templates with enough unique content. Retired templates return 404 or redirect.
- **Effort:** L. Do this after R2.1.

### R2.5 — FlutterFlow page enhancements

- **Files:** `productGuideContent.js` (`flutterflow-alternative`), `routes.json` (`lastmod`).
- **Add:** a "Pricing model and code export" comparison row with **dated, sourced** FlutterFlow facts (re-checked on `docs.flutterflow.io` on the day of the edit) and FlutterPilot facts from the capability audit; a "Moving from FlutterFlow" checklist (no importer; rebuild with Figma import or AI; data source mapping; custom code); "When FlutterFlow is the better choice" (store publishing, ecosystem, team features) for credibility.
- **Don't:** create a second comparison page, or add Dreamflow, Rork or Bolt comparisons before GSC shows demand.

### R2.6 — Structured data completeness

- **Files:** `src/seo/routes.json` (`organization.sameAs`), `src/seo/seo.js`.
- **Changes:** add the App Store URL to `sameAs`. Add `offers` to `SoftwareApplication` only with accurate content: price `0` with a description such as "Free to start; pay-as-you-go credits" (🔒 owner confirms free start). Do **not** add `aggregateRating` unless real ratings are shown on the page and kept current. Add `"applicationSubCategory": "Flutter app builder"`. Mirror the factual product definition in the `description`.
- **Tests:** extend `check-build.js` to validate `offers.price` and `priceCurrency` when present.

### R2.7 — Performance and accessibility follow-ups

Do these after the 2026-11-22 field CWV check, so the effect of PR #15 is measured first.

| Sub-item | Files | Change | Measure |
|---|---|---|---|
| P-1 | `src/index.js` | Experiment: `React.startTransition(() => root.render(...))` for the initial render | Lighthouse TBT (5-run median); field INP |
| P-3 | `Landing.jsx`, `featurediscription.jsx`, `productshowcase.jsx`, `Docs.jsx` | Replace framer-motion entrance animations with CSS transitions plus IntersectionObserver; remove the dependency if unused | Bundle delta in build output |
| P-4 | `productshowcase.jsx`, `featurediscription.jsx` | On mobile UA or `navigator.connection?.saveData`, show the poster with a play button instead of autoplay | Transfer bytes on mobile Lighthouse |
| P-5 | `public/favicon.svg`, `public/manifest.json` | Delete the unreferenced 2 MB SVG; point manifest icons at `logo192.png` and `logo512.png` | Asset size |
| a11y | `.github/workflows/seo-checks.yml` | Add an axe-core check of prerendered HTML (dev dependency only) | 0 serious violations |

### R2.8 — Hosted-app indexing policy (cross-repo: `flutterpilot-cloudflare`)

- **Problem:** `hosting.js` serves `index.html` with 200 for any SPA-looking path on `<slug>-app.flutterpilot.com` and sends no robots policy (growth audit T4).
- **Options (owner decision):** (a) default `X-Robots-Tag: noindex` with a per-app "allow search engines" toggle; (b) leave indexable, but return a real 404 for paths the app doesn't define (hard, because Flutter routes are client-side); (c) status quo. Option (a) is the low-risk default for brand-domain hygiene.

### R2.9 — see §4.

## 6. Longer-term discoverability and authority (P3 / strategic)

| ID | Item | Notes |
|---|---|---|
| R3.1 | Earned mentions | Product Hunt launch tied to a meaningful release; Flutter community show-and-tell with the public export repo (R2.3); short YouTube walkthroughs embedded on docs pages (lazy-loaded facade, no autoplay); complete Play and App Store listings that link back to flutterpilot.com. No paid links or review schemes. |
| R3.2 | Case study | One end-to-end story (e.g. Reference Commerce) **after** internal acceptance passes (`flutterpilot-pro/docs/manage/2026-10-21-pending-work-status.md`). |
| R3.3 | Auth tutorials | Firebase/Supabase sign-in in generated apps, after D9 leaves Beta. |
| R3.4 | `llms.txt` | Optional, speculative; list pricing, docs and changelog URLs. |
| R3.6 | Styling consolidation | Write new components with `sx`/emotion; migrate JSS opportunistically. |
| — | Localization | Only when GSC shows a material non-English market. |

## 7. Suggested PR sequence

Each PR is independently reviewable and revertible.

| # | PR | Items | Depends on |
|---|---|---|---|
| 1 | **Milestone 1:** cost and delivery facts + measured, crawlable Studio links | R1.1, R1.2 | 🔒 owner facts for the numbers |
| 2 | Copy accuracy and naming | R1.3 | — (can run in parallel with PR 1) |
| 3 | CI production redirect check | R0.2 | Manual run passes first |
| 4 | About and Contact | R1.7 | 🔒 owner facts |
| 5 | Changelog release notes | R1.6 | 🔒 release list |
| 6 | `/pricing/` page | R1.4 | PR 1 measured for 2–4 weeks; 🔒 |
| 7 | Docs leaf infrastructure + `/docs/rest-api/` + `/docs/publish-web-app/` | R2.1 | — |
| 8 | `/docs/export-flutter-code/` + `/docs/android-apk/` | R2.1 | One real export captured |
| 9 | FlutterFlow page enhancements | R2.5 | Fresh fact check |
| 10 | Guide-specific proof blocks + examples gallery | R1.8, R2.3 | 🔒 assets |
| 11 | Structured data completeness | R2.6 | 🔒 free-start fact |
| 12 | Performance follow-ups | R2.7 | Field CWV ≈ 2026-11-22 |
| X1 | Studio indexing hygiene (`flutterpilot-pro`) | R1.5 | Owner approval of the 2026-10-19 Studio SEO plan |
| X2 | Hosted-app robots policy (`flutterpilot-cloudflare`) | R2.8 | Owner decision |

## 8. Measurement plan for the roadmap

Extends `docs/seo/MEASUREMENT.md`; keep its weekly routine.

| Metric | Source | Baseline | Read at |
|---|---|---|---|
| Website → Studio sessions, by `utm_campaign`/`utm_content` | Studio GA4 (traffic acquisition) | 0 (not tagged today) | 2 and 4 weeks after PR 1 |
| `project_created` attributed to `utm_source=flutterpilot.com` | Studio GA4 | none | 4 weeks after PR 1 |
| Homepage clicks, impressions, CTR; `flutter ai app builder` position | GSC | MEASUREMENT.md table | Every 28 days; **must not regress** |
| Non-branded impressions on docs and pricing URLs | GSC (query regex excludes `flutter\s?pilot`) | 0 (pages don't exist) | 4 and 8 weeks after each docs PR |
| Indexed / intended-indexable URLs | GSC Pages | 11 / 11 intended (unverified) | Weekly |
| FlutterFlow query group position | GSC | 10.6–14.2 | 2026-11-16, then monthly |
| Field LCP, INP, CLS (origin) | GSC CWV / CrUX | PR #15 summary | 2026-11-22 |

**Interpretation rules** (from MEASUREMENT.md): judge on 28-day windows; when movement also shows in branded queries or across all pages, attribute it to demand or algorithm changes; never present estimates as guaranteed outcomes.

## 9. Final recommendation

### 1. What are the biggest weaknesses of FlutterPilot.com today?

1. **No pricing or cost information anywhere.** Visitors can't tell what's free, what costs credits, or that there is no subscription. The site's most defensible difference from FlutterFlow, code export without a paid plan, is never stated.
2. **Claims without proof.** There is no real generated app, live demo or exported-code sample. The guides reuse generic feature grids.
3. **Too little indexable, task-level content.** 11 URLs, with docs as a single summary page while the substantive guide lives inside the Studio. So the homepage carries 86% of clicks, and non-branded growth has nowhere to land.
4. **No measurement.** Most Studio CTAs and every download link are JavaScript buttons, untagged and uncrawlable, so website-driven activation can't be measured.
5. **Inconsistent brand signals.** Studio's indexable metadata overclaims ("no coding needed", "real-time collaboration"), the AI is called three different names, and a few website claims are unverified ("import custom widgets", stale Beta wording).

### 2. Which existing capabilities are underrepresented?

Free Flutter source export with pay-as-you-go credits (B1, S5); the three concrete delivery paths and their limits (B1–B5); 41 action types including sign-in, API calls and device actions (V8, D9); REST with Postman import and mock responses (D8); the 130+ widget catalog (V2); Google Sheets as a backend (D4, Beta); a Studio that runs in the browser, on desktop and on mobile (S1–S4); multi-provider AI model choice (A7).

### 3. What would most improve qualified organic discovery?

**Publishing the in-app guide as public, task-level docs pages** (R2.1, then R2.2): REST APIs, code export, web publishing, APK builds, Google Sheets. These answer real "how do I" searches with workflows FlutterPilot actually supports, they don't cannibalize the existing guides, and the content already exists. Add a pricing page (R1.4) for branded and "free" intent, and fix Studio's competing metadata (R1.5) so brand signals consolidate on flutterpilot.com. For AI answer engines, first verify that Cloudflare isn't blocking retrieval crawlers (R0.3).

### 4. What would most improve confidence and conversion into active Studio users?

Stating plainly **what it costs and what you can ship today**, including what isn't available yet (R1.1, R1.4); showing **real output** (R2.3); and making every Studio entry point a **real, measured link** (R1.2), so the effect of each change on `project_created` can be seen instead of guessed.

### 5. Which exact changes should be implemented first, preserving the current design?

**Milestone 1** ([FIRST_IMPLEMENTATION_MILESTONE.md](./FIRST_IMPLEMENTATION_MILESTONE.md)): one PR that (a) adds a compact "What it costs and what you can ship" section to the homepage using existing styles, and (b) converts Studio and download CTAs to UTM-tagged `<a href>` links, including a no-JavaScript GET form for the hero prompt. Run the copy-accuracy PR (R1.3) and the P0 verifications (R0.1–R0.4) in parallel. The homepage title, H1, hero design, screenshots and animations stay unchanged.

### Top five improvements by expected impact, and why they outrank the alternatives

| Rank | Improvement | Why it outranks the alternatives |
|---|---|---|
| 1 | **Cost and delivery clarity** (R1.1 → R1.4) | It closes the most basic unanswered visitor question and puts the strongest verifiable differentiator in front of every visitor. Small effort, no design change, and it affects the page that receives 86% of traffic. |
| 2 | **Measured, crawlable Studio links** (R1.2) | Without it, no other change can be evaluated. Almost free: it reuses Studio's existing GA4 events with no new infrastructure. |
| 3 | **Public task-level docs** (R2.1, R2.2) | The only lever that adds substantial non-branded entry points without doorway pages or cannibalization. The content already exists in the Studio. Larger effort, so it follows the quick wins. |
| 4 | **Accuracy and entity consistency** (R1.3 website + R1.5 Studio) | Trust and AI-answer accuracy depend on consistent, true statements across both domains. Cheap on the website side. Ranked below 1–3 only because the direct traffic effect is smaller. |
| 5 | **Real-output proof** (R2.3, R1.8) | The strongest conversion argument for an AI builder, and better than any adjective. Ranked fifth only because it depends on owner-produced assets. |

**Why not other options first:** template detail pages need a curated data pipeline and risk thin content. More comparison pages rely on volatile third-party facts and would cannibalize the existing one. Further performance work should wait until field data shows PR #15's effect (around 2026-11-22). A redesign or framework migration has no supporting evidence: the current architecture already delivers prerendered, indexable pages, and the gaps are content, clarity and measurement.
