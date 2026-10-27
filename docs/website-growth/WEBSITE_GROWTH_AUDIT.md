# FlutterPilot.com website growth audit

_Investigation date: 2026-10-27 · Repository state: `main` @ `ac96e1b` (includes PR #13 SEO recovery, PR #15 Core Web Vitals, PR #14 production sitemap guard) · Documentation only; no site code changed_

Companion documents: [PLATFORM_CAPABILITY_AUDIT.md](./PLATFORM_CAPABILITY_AUDIT.md) (product facts), [COMPETITOR_AND_KEYWORD_RESEARCH.md](./COMPETITOR_AND_KEYWORD_RESEARCH.md), [WEBSITE_IMPROVEMENT_ROADMAP.md](./WEBSITE_IMPROVEMENT_ROADMAP.md), [FIRST_IMPLEMENTATION_MILESTONE.md](./FIRST_IMPLEMENTATION_MILESTONE.md). Earlier SEO work: [`docs/seo/`](../seo/README.md).

## 1. Verdict

The **technical SEO foundation is now sound**. Every intended page ships prerendered HTML with one registry-driven title, description, canonical and H1. The sitemap is valid on production. Redirects and 404s behave correctly, and CI guards all of this. The October work fixed the crawlability problems that most plausibly explain the August–October decline. Field Core Web Vitals and indexing data still need to catch up.

The **biggest remaining weaknesses are not technical**:

1. **Visitors can't find out what FlutterPilot costs, what is free, or exactly what they can ship.** The site has no pricing information at all, and the strongest verifiable difference from FlutterFlow goes unused: source export without a subscription.
2. **The site describes capabilities but rarely proves them.** It shows no real generated app with the prompt that produced it, no live hosted example, and no exported code sample. Several sections reuse the same generic feature grids.
3. **The page inventory is too small for non-branded growth.** There are 11 indexable URLs, and the homepage takes 86% of clicks. Public docs are a one-page summary, while the real step-by-step guide lives inside the Studio.
4. **Nothing is measured.** Clicks from the website into Studio, and whether those visitors create projects, are unknown. Most primary CTAs are JavaScript buttons rather than links.
5. **Brand signals are split.** `studio.flutterpilot.com` serves its own indexable marketing metadata with stronger, partly unsupported claims ("no coding needed", "real-time collaboration", "best FlutterFlow alternative").

No confirmed P0 defect remains in the website's code. P0 work is **verification** (GSC URL-level data, production redirect hops, Cloudflare bot settings), any part of which could still reveal a defect.

## 2. Evidence: what was and wasn't available

| Source | Available? | Notes |
|---|---|---|
| Website source, git history, PRs #1–#15, Issue #12 | Yes | Read in full for SEO-relevant code |
| Product repos (`flutterpilot-pro`, `flutterpilot-cloudflare`, `flutterpilot_builder`) | Yes | See PLATFORM_CAPABILITY_AUDIT §1 |
| Local production build | Yes | `npm run build`: 11 routes prerendered; `npm run test:seo` **716/716 passed**; `npm run test:seo:pages` (wrangler Pages emulation) **138/138 passed**; unit tests **30/30 passed** |
| Live production site | **Indirect only** | `flutterpilot.com` and `studio.flutterpilot.com` are blocked by this environment's network policy (proxy 403; WebFetch DNS failure). Production evidence comes from **GitHub Actions logs**: deploy run [40556720736](https://github.com/abrarmalekji12/flutter_pilot_website/actions/runs/40556720736) on 2026-10-27 18:07 UTC: `pages.dev` deployment 138/138 checks passed; `https://flutterpilot.com --sitemap-only` 8/8 passed. |
| **GSC coverage export `flutterpilot.com-Coverage-2026-10-27.zip`** | **No** | Not present in the container, the repository, or any issue or PR. **The latest coverage data available is the 2026-10-19 aggregate export summarized in Issue #12 (chart point 2026-10-12).** No URL-level examples exist in any export seen so far. |
| GSC performance data | Partial | Aggregates for Jul 18 – Oct 17 in `docs/seo/MEASUREMENT.md`: 7 pages, 7 priority queries, 28-day windows. No page × query × date. |
| GSC Core Web Vitals | Partial | Summary quoted in PR #15 (export through 2026-10-21): mobile 9 URLs LCP "needs improvement", mobile 9 URLs INP "needs improvement", desktop 9 URLs LCP "needs improvement". |
| Analytics (website or Studio) | No access | The website has **no analytics**. Studio has GA4 events (see §8). |
| Competitor sites | Indirect | WebFetch was blocked. Competitor facts come from web search results, mostly third-party (see COMPETITOR_AND_KEYWORD_RESEARCH §1). |

**Conclusions that cannot be established with this evidence:**

- Which URLs make up each GSC "not indexed" bucket (9 redirect, 4 alternate canonical, 2 soft 404, 1 not found, 1 crawled-not-indexed). This also leaves open whether the GSC property is a Domain property that includes `studio.` and `*-app.` subdomains.
- Whether all 11 intended URLs are indexed today. The aggregate showed 11 indexed, but which 11 is unknown, and `/docs/changelogs/` was not in the sitemap until 2026-10-19.
- Per-page or per-query effects of the 2026-10-19 release. The first fair 28-day comparison is possible from about 2026-11-16.
- Field CWV after PR #15. The 28-day window completes around 2026-11-22.
- Website-to-Studio conversion rates.

## 3. Existing improvements to preserve

These are correct today. Future PRs must not regress them, and `npm run test:seo`, `test:seo:pages` and the deploy workflow already enforce most of them.

| Area | Behavior to keep | Where |
|---|---|---|
| Prerendering | Every React route prerendered with jsdom into `build/<route>/index.html`. Content, H1, links and JSON-LD are present without JavaScript. | `scripts/prerender.js`, `src/index.js` |
| Single metadata registry | Title, description, H1, canonical, lastmod and schema come from `src/seo/routes.json`. Tests fail on drift. | `src/seo/routes.json`, `src/seo/seo.js`, `src/routes.test.js` |
| Canonical format | `https://flutterpilot.com/<path>/` with trailing slash; one 308 hop from slashless URLs | Cloudflare default + `_redirects` |
| Legacy redirects | Single-hop 301 for `/aboutUs`, `/contactUs`, `/privacyPolicy`, `/flutter-templates`, `/free-flutter-templates`, `/download` | `public/_redirects` |
| Real 404 | Unknown paths → HTTP 404 with a noindex `404.html`. **No SPA fallback rule**, and a test forbids one. | `public/_redirects`, `scripts/seo/check-deployment.js` |
| Preview noindex | `X-Robots-Tag: noindex, nofollow` on `*.pages.dev` | `public/_headers` |
| Sitemap | Generated from the registry, with hand-maintained `lastmod`; valid on production (CI 2026-10-27) | `scripts/generate-sitemap.js`; deploy workflow step "Verify public-domain sitemap" |
| `/template/` resilience | Static editorial content plus a Firestore gallery with timeout, error and retry; Firebase loads only on that page and is deferred to idle | `src/pages/Template/Template.jsx` |
| Honest comparison | The FlutterFlow table cites FlutterFlow docs, states trade-offs, and doesn't claim superiority | `src/componets/productGuideContent.js` |
| Homepage title and H1 | "FlutterPilot – AI Flutter App Builder". The homepage holds 86% of clicks and 78% of impressions. **Do not change the title or H1 without a measured reason.** | `routes.json` |
| PR #15 performance work | Canvas disabled on mobile and delayed on desktop; no per-character typing loop; Template Firebase deferred; 96px PNG logo | `BackgroundNetAnimation.jsx`, `promptgeneratorhero.jsx`, `appbar.jsx` |

## 4. Technical SEO and indexing

### 4.1 The 11 intended indexable pages

All checks below come from the local build and Pages emulation (2026-10-27). Production served-HTML checks run against the `pages.dev` deployment, which is the same artifact.

| URL | 200 + self-canonical | Prerendered words in `<main>` | In sitemap | Assessment |
|---|---|---:|---|---|
| `/` | ✅ | 675 | ✅ lastmod 2026-10-19 | Healthy |
| `/flutter-ui-builder/` | ✅ | 901 | ✅ | Healthy |
| `/ai-flutter-ui-generator/` | ✅ | 1,083 | ✅ | Healthy |
| `/flutter-app-builder/` | ✅ | 1,015 | ✅ | Healthy |
| `/flutterflow-alternative/` | ✅ | 1,149 | ✅ | Healthy; ranking (page 2) is a content and authority question |
| `/template/` | ✅ | 395 | ✅ | Healthy; gallery is client-side only |
| `/docs/` | ✅ | 747 | ✅ | Healthy technically; thin as documentation (summary cards only) |
| `/docs/changelogs/` | ✅ (static HTML) | 345 | ✅ lastmod 2026-10-05 | No JSON-LD; one release only; stale since 2.0.0 |
| `/about-us/` | ✅ | 157 | ✅ lastmod 2026-03-20 | **Thin**; H1 "About Us"; no company facts beyond a postal address |
| `/contact/` | ✅ | **8** | ✅ | **Thin**; a form with no visible support email or expectations |
| `/privacy-policy/` | ✅ | 1,195 | ✅ | Healthy |

**Conclusion:** all 11 intended pages are technically available to Google: 200 status, self-canonical, indexable robots, content in the initial HTML, and listed in a valid sitemap. Whether each is *indexed* needs URL Inspection (R0.1). `/about-us/` and `/contact/` are candidates for "crawled – currently not indexed" on quality grounds. That is a hypothesis.

### 4.2 GSC exclusion buckets: disposition

Based on the 2026-10-19 aggregate export (the 2026-10-27 export was not available).

| Bucket (count) | Most likely explanation | Classification | What would confirm it |
|---|---|---|---|
| Page with redirect (9) | Expected variants: `http://`, `www.`, slashless URLs (308), legacy aliases (301), `/download` | **Intentional exclusion** (expected) | URL list from GSC |
| Alternate page with proper canonical (4) | Parameter or duplicate variants, e.g. `/?prompt=…`, `/index.html`, `*.pages.dev`, `studio.` variants | **Intentional exclusion** (expected) | URL list |
| Soft 404 (2) | **Historical:** `/template/` rendered "0 templates available" when Firestore failed (repaired 2026-10-19, AUDIT C4). **Possible ongoing:** if the property is a Domain property, Studio (`studio.flutterpilot.com`, Firebase `** → /index.html`, Flutter `RouteNotFound` with HTTP 200) and hosted apps (`*-app.flutterpilot.com`, SPA fallback 200 for any path, `flutterpilot-cloudflare/hosting.js`) produce soft-404 candidates. | Historical issue repaired (website) + **unverified hypothesis** (subdomains) | URL list + property type |
| Not found (404) (1) | A pre-migration URL or a mistyped link. `/download` now 301s. | Historical / intentional 404 | URL + referring page |
| Crawled – currently not indexed (1) | `/docs/changelogs/` (new on Oct 5, sitemap from Oct 19) or a thin page | Google processing delay or content quality | URL list |
| Sitemap "is HTML" error (PR #14) | Production served an HTML fallback for `/sitemap.xml` at the time Google read it | **Historical issue repaired.** CI verified production XML on 2026-10-27 18:07 UTC (8/8). | GSC Sitemaps → resubmit → "Success" with 11 discovered URLs |

### 4.3 Findings

| ID | Finding | Classification | Severity | Evidence | Action (roadmap ID) |
|---|---|---|---|---|---|
| T1 | GSC reported "Sitemap is HTML" | Historical, repaired | — | PR #14 body; deploy run 40556720736 log | Resubmit the sitemap in GSC (R0.1) |
| T2 | `http→https` and `www→apex` hops on production have **never been verified in CI**. The workflow checks only `pages.dev` plus the production sitemap; `--production` is a manual step. | **Unverified** | Medium | `.github/workflows/deploy-cloudflare.yml` comments; `check-deployment.js:137` | Run `npm run test:seo:deployed -- https://flutterpilot.com --production` and add it to the deploy workflow (R0.2) |
| T3 | `studio.flutterpilot.com` is indexable and competes with the apex domain: self-canonical root, marketing title "FlutterPilot – AI App Builder \| No-Code Flutter App Creator \| FlutterFlow Alternative", `SoftwareApplication` + `FAQPage` JSON-LD with unsupported claims, sitemap of `/`, `/login`, `/register`, `/reset-password`, and every unknown path → HTTP 200 | **Confirmed configuration issue (cross-repo)**; ranking impact unverified | Medium | `flutterpilot-pro/web/index.html`, `web/sitemap.xml`, `firebase.json`; `docs/manage/2026-10-19-web-seo-sitemap-growth.md` (same conclusion, owner approval pending) | Studio indexing hygiene (R1.5) |
| T4 | Hosted user apps at `https://<slug>-app.flutterpilot.com` answer any path with 200 and send no robots policy | **Hypothesis** (only matters if the GSC property covers subdomains, or for brand quality) | Low–Medium | `flutterpilot-cloudflare/hosting.js` (`isSpaRoute` → index); `wrangler.hosting.toml` | Owner policy decision (R2.8) |
| T5 | Homepage `SoftwareApplication` has no `offers`, so it isn't eligible for software-app rich results. `Organization.sameAs` lacks the App Store listing. `/docs/changelogs/` has no JSON-LD. | Confirmed (low impact) | Low | `src/seo/seo.js` `buildStructuredData`; `routes.json` `organization.sameAs` | R2.6 |
| T6 | Primary navigation CTAs and every download/app-store link are `<button onClick>`, not `<a href>`: header "Open Studio", "Open Web Studio", Play Store, App Store, macOS, Windows, and the homepage final CTA. Crawlers can't follow them; users can't middle-click or copy the link; no referrer. On Android, the header button sends visitors to the Play Store instead of the web Studio. | Confirmed | Medium (conversion and measurement) | Build analysis: homepage has 9 `<button>`s and 1 Studio `<a>` (footer); `appbar.jsx:130-141`, `productshowcase.jsx:57-69`, `Landing.jsx` final CTA | First milestone (R1.2) |
| T7 | Thin pages: `/contact/` (8 words), `/about-us/` (157 words, generic H1) | Confirmed content quality | Low–Medium (trust, E-E-A-T) | Build analysis | R1.7 |
| T8 | All four guides repeat a near-identical six-card "Tools for the work between a prompt and a shipped app" grid (the same icons and similar text), duplicating homepage grids and reducing per-page uniqueness | Confirmed content quality | Low–Medium | `ProductGuidePage.jsx:356`; `productGuideContent.js` `features` arrays | R1.8 |
| T9 | Homepage initial HTML has **no content images**: product screenshots appear only as video posters | Confirmed | Low | Build analysis (2 `<img>`, both the favicon logo) | Covered by R2.3 (real output gallery) |
| T10 | The changelog covers only 2.0.0 (2026-10-05) and isn't updated for later released features | Confirmed freshness gap | Low–Medium | `public/docs/changelogs/index.html` | R1.6 |
| T11 | FlutterFlow-alternative queries rank 10.6–14.2 with 0 clicks (Jul–Oct). Content was rewritten 2026-10-19. | Content and authority; processing delay | Medium | MEASUREMENT.md | Re-evaluate at 4 weeks; R2.5 enhancements |
| T12 | Public docs are a single summary hub. The real step-by-step guide (12 sections, troubleshooting) lives only inside the Studio. | Confirmed content gap | **High** (non-branded growth) | `src/pages/Docs/Docs.jsx`; `flutterpilot-pro/lib/ai/rag_context.dart` | R2.1 |

### 4.4 Titles, descriptions and search intent

The October rewrite gave each page a distinct intent (see `docs/seo/PAGE_OPTIMIZATION.md`). Remaining observations:

- **Homepage** "FlutterPilot – AI Flutter App Builder" (37 chars) matches its best queries (`flutter ai app builder` at position 2.89 with 12% CTR). `flutter ai` (3,998 impressions, position 6.86, 1.9% CTR) is broad and probably mixed-intent. A title rewrite isn't warranted without query × page data.
- **`/docs/`** "FlutterPilot Documentation and Product Guide" fits branded navigation but has no non-branded potential as a single page. Growth needs leaf pages (T12).
- **`/about-us/`** "About FlutterPilot" is fine, but the H1 "About Us" and the body don't state what FlutterPilot is, who builds it, or since when.
- **No page targets pricing intent** ("FlutterPilot pricing", "free Flutter app builder"). Some branded visitors are likely looking for this. That is an inference, since no query data is available.

### 4.5 Internal linking and crawl depth

Every page links to the four guides, templates, docs, changelog, about, contact and privacy through the header and footer. Crawl depth is 1 for all 11 URLs, and `check-build.js` enforces that every route is linked from another page's initial HTML. **No action needed.** When docs leaf pages are added, link them contextually from the guides (for example the REST section of `/flutter-app-builder/` → the REST doc) rather than only from navigation.

## 5. Positioning and messaging

### 5.1 What a first-time visitor learns in the first viewport

Homepage first viewport (desktop and mobile): badge "FlutterPilot Studio · AI + visual development", the H1, a subtitle, four signal chips ("Multi-screen project generation", "25+ built-in actions", "REST + data", "One-click web deployment"), a prompt box with **Generate**, and example prompt chips.

| Question a visitor has | Answered in the first viewport? |
|---|---|
| What is it? | ✅ An AI and visual Flutter app builder |
| Is it for me if I don't know Flutter? | ⚠️ Implicit. "Flutter" is assumed knowledge, and nothing says "no Flutter experience needed" or the opposite. |
| What do I get at the end? | ⚠️ "export the Flutter source or deploy to the web" in the subtitle; no picture of a finished app |
| What does it cost / is there a free start? | ❌ Nowhere on the site |
| Can I trust it? | ❌ No proof points near the top. The partner and family sections come later. |
| What happens when I click Generate? | ⚠️ Opens Studio with the prompt, but the visitor isn't told they'll need to sign in |

### 5.2 "AI Flutter UI generator" vs "AI-assisted Flutter app development platform"

The current site already leans to the broader platform story: "Build a real Flutter … app from a prompt—then make every detail yours". The question is how far to push it.

| Option | Credibility | Risk |
|---|---|---|
| **A. "AI Flutter UI generator"** (narrow) | Very high | Undersells verified depth (41 actions, REST, collections, auth actions, APK and web delivery) and gives no reason to stay past the first screen |
| **B. "AI-assisted Flutter app builder: generate, edit visually, add logic and data, export"** (current direction) | High, **if** the site says plainly that AI generates *starter* apps and that logic and data are added in the editor | Overpromising if copy implies AI builds complete functional apps (A2 is admin-only) |
| **C. "Build complete production apps without code"** (Studio `web/index.html` today) | Low | Contradicted by the product's own assessment, open feedback volume and Beta labels; damages trust and AI-answer accuracy |

**Recommendation: keep B and make the division of labor explicit.** *AI drafts the app; you shape it visually; you own the Flutter code.* Name the AI output honestly ("starter app with list, details, add, edit and delete flows"), and keep functional depth as editor capabilities rather than AI promises. This is also the positioning the product team's own assessment recommends (`flutterpilot-pro/docs/manage/2026-09-21-product-assessment.md`: "Build a real Flutter app visually and with AI, keep structured control … then export maintainable Flutter without locking the user into FlutterPilot").

### 5.3 Messaging gaps

1. **The "why FlutterPilot" argument is missing:** pay as you go, free code export, real Flutter widgets, editable AI output. The pieces exist in feature cards but are never put together as a reason to choose.
2. **Delivery limits are missing**, and honest limits build trust. The site never says that Play Store and App Store publishing are done by the user from exported source.
3. **The AI is named three ways:** "AI Copilot" (site), "AI Agent" (Studio, labelled BETA), "AI Project Creator" (site and docs). Use the Studio's names.
4. **Homepage focus is diluted near the conversion point.** The healthcare partner spotlight and the FlutterPilot Family sit between the feature grids and the final Studio CTA. They are owner-requested, and `App.test.js` asserts their order. Moving them below the CTA is an owner decision (P3).

## 6. Page-by-page review

| Page | Strengths | Problems | Top recommendation |
|---|---|---|---|
| `/` | Strong H1 and prompt-first hero; prompt handoff to Studio works (`startup_route.dart`); accurate feature grids | No pricing or delivery facts; no proof; JS-only CTAs; two feature grids plus a video section are abstract; partner and family sections before the CTA | "What it costs and what you can ship" section; crawlable, measured CTAs (milestone 1) |
| `/flutter-ui-builder/` | Best-performing guide (15% CTR on "flutter ui builder"); editor walkthrough mapped to a real screenshot | "Import custom widgets" claim (unverified); generic feature grid; no code sample | Fix the claim; show a widget tree next to its exported Dart |
| `/ai-flutter-ui-generator/` | Real prompts with checks and follow-ups; honest Beta/scope FAQ | No real output shown for the example prompts; "labelled Beta" wording is stale | Add the actual generated screens for 2–3 example prompts (R2.3) |
| `/flutter-app-builder/` | Six-step workflow; endpoint panel; worked example | The example is described, not shown end to end; delivery FAQ doesn't spell out limits (APK ≠ Play-ready) | Add the delivery-limits block; link to the REST doc leaf |
| `/flutterflow-alternative/` | Sourced, honest, with trade-offs | "Pricing isn't compared here", which skips the most-asked question; "imported custom widgets" claim; page-2 ranking | Add a dated, sourced pricing-model and code-export row; migration checklist (R2.5) |
| `/template/` | Resilient static content; real deep links (`studio…/template/<id>`) | Gallery is client-only (no indexable template content); no detail pages | Curated template detail pages later (R2.4) |
| `/docs/` | Clean map of features; links to guides | Summary only, with no task instructions; 0.72% CTR | Docs leaf pages (R2.1) |
| `/docs/changelogs/` | Clear 2.0.0 notes with honest scope | Stale; no per-release structure; logo `alt=""` is fine (decorative) | Release cadence (R1.6) |
| `/about-us/` | Mission statement | 157 words; no people, history or verifiable company facts; understated product description ("Generate basic screens") | Factual rewrite with owner-supplied facts (R1.7) |
| `/contact/` | Working Formspree form | 8 words; no support email or response expectation | Add support email, links to docs and changelog (R1.7) |
| Header | Clear nav (Home, Templates, Docs, Blogs, Contact, About) | No Pricing; "Blogs" leaves the site for Medium; "Open Studio" is a button | Add Pricing once it exists; make the CTA a link |
| Footer | Full internal links | n/a | Add Pricing and docs leaf links later |

## 7. Conversion and trust

| Factor | State | Recommendation |
|---|---|---|
| Primary vs secondary CTA | Primary is Studio (web), with the prompt hero as the strongest entry. Secondary is docs and guides. Labels vary: "Generate", "Open Studio", "Open Web Studio", "Open FlutterPilot Studio". | Keep the prompt hero as primary (owner direction: AI-first entry). Standardize the label to "Open FlutterPilot Studio" everywhere else. |
| Speed of understanding | Good for Flutter-aware visitors; weaker for non-developers | One line under the hero: "AI drafts the app, you refine it visually, and you can export the Flutter project at any time." |
| Proof of real output | None beyond screenshots of the editor and one demo video | Real-output gallery with prompt → result → live hosted URL → exported code (R2.3) |
| Source export and publishing clarity | Mentioned; limits missing | Delivery block with ✅/❌ (milestone 1) |
| Free vs paid | **Missing** | Milestone 1 section, then `/pricing/` (R1.4) |
| Docs and tutorials discoverability | Docs in the nav; guides from the homepage | Docs leaf pages (R2.1) |
| Fair comparison | Good FlutterFlow page | Add the pricing-model row (R2.5) |
| Testimonials and proof points | None (correctly, since nothing should be fabricated) | Use verifiable proof only: changelog, live demos, a public export repo. Store rating only if displayed live and current. |
| Measurability | **None** on the website; Studio GA4 exists but receives no source tagging from the site | UTM-tag Studio root links (milestone 1). Optionally Cloudflare Web Analytics (R2.9). |

## 8. Measurement baseline

- **Website:** no analytics script. `src/index.js` calls `reportWebVitals()` with no handler.
- **Studio:** GA4 via Firebase Analytics on web, Android and iOS (`flutterpilot-pro/lib/services/analytics_service.dart`), with events `project_created`, `project_export`, `project_export_result`, `apk_export`, `ai_assistant_session`. GA4 web streams attribute UTM parameters from the landing URL, **provided the URL still carries them when Firebase Analytics initializes**. Studio's startup routing consumes the `prompt`/`token`/`platform` parameters before navigation (`lib/routing/startup_route.dart`). Whether UTM survives until GA4 initializes must be checked in GA4 DebugView (milestone 1 validation).
- **Safety constraint found in this investigation:** Studio matches the template deep-link regex `^/template/([A-Za-z0-9]+)$` against the **full link including the query string** (`flutterpilot-pro/lib/route.dart:69`). Adding UTM parameters to `/template/<id>` links would make them fail to match and fall through to code that casts `settings.arguments` as a `List`. **Do not tag template deep links** until Studio matches on the path.

## 9. Performance and accessibility

### 9.1 Status after PR #15

| Item | State |
|---|---|
| Lab (Lighthouse, simulated mobile, local, 2026-10-19 medians) | `/` LCP ≈ 2.60 s, TBT ≈ 217 ms (`docs/seo/MEASUREMENT.md`) |
| Field (GSC, through 2026-10-21) | 9 URLs "needs improvement" for mobile LCP, mobile INP and desktop LCP. The window is mostly pre-prerender, so this is **largely a processing delay**. Re-check around 2026-11-22. |
| First-load JS (gzip) | `main` 81.5 KB + route chunk; the next-largest shared chunks are 55.7 KB and 46.3 KB (MUI components, emotion, JSS and framer-motion); Firebase (108.6 KB) loads only on `/template/` |
| HTML weight | Homepage 156 KB raw / 26 KB gzip (inlined prerender CSS) |

### 9.2 Remaining opportunities

No framework migration is warranted (see `docs/seo/IMPLEMENTATION_PLAN.md`).

| ID | Observation | Evidence | Suggested action | Priority |
|---|---|---|---|---|
| P-1 | React renders a fresh tree over the prerendered DOM (`createRoot`, not hydrate) in one synchronous render, which is a long task on slow phones and the likely main INP/TBT contributor | `src/index.js` | Experiment: wrap the initial `root.render` in `React.startTransition` to time-slice rendering; measure TBT/INP in the lab before adopting. Keep the current approach if there's no gain. | P2 (after field data) |
| P-2 | Two styling runtimes ship together: deprecated `@mui/styles` (JSS, 17 files) and emotion | `package.json`; build chunks | Maintainability debt. **Don't migrate now.** Write new components with `sx`/emotion only. | P3 |
| P-3 | `framer-motion` is used only for simple entrance animations in 4 files and sits in the main bundle | `Landing.jsx`, `featurediscription.jsx`, `productshowcase.jsx`, `Docs.jsx` | Replace with CSS/IntersectionObserver; measure bundle delta | P2 |
| P-4 | Two homepage videos (2.5 MB + 4.4 MB) autoplay when scrolled into view on **all devices**, including mobile data | `productshowcase.jsx`, `featurediscription.jsx` (IntersectionObserver → `play()`) | On mobile or `navigator.connection.saveData`, show the poster with tap-to-play | P2 |
| P-5 | `public/favicon.svg` is a 2.0 MB SVG wrapping a PNG; `flutterpilot_logo_round.svg` (408 KB) is referenced by `manifest.json` | file sizes; `manifest.json:35,53,60` | Remove the unreferenced `favicon.svg`; point manifest icons at existing PNGs | P3 |
| P-6 | Download links point to a bucket named `flutter-visual-builder-staging` | `productshowcase.jsx:57-60` | Verify they resolve and are the intended production artifacts (R0.4) | P0 (verify) |

### 9.3 Accessibility

Positives: skip link, `lang="en"`, the H1 rotating word handled with `sr-only` text plus `aria-hidden`, image alts present, `prefers-reduced-motion` respected in the hero.

Issues: navigation implemented as `<button>` (T6) breaks expected link semantics, so screen readers announce "button" for page navigation. The contact page form has labels but no visible support alternative. Color contrast was not measured in this investigation; add an axe check to CI (R2.7).

## 10. Summary of defects and hypotheses

**Confirmed (website repo):** T5, T6, T7, T8, T9, T10, T12, plus the accuracy issues in PLATFORM_CAPABILITY_AUDIT §4 (the "import custom widgets" claims, stale Beta wording, missing Beta labels on Sheets/Firebase/Supabase/Figma).

**Confirmed (cross-repo):** T3 (Studio indexing and metadata), P-6 to verify.

**Historical, repaired:** sitemap served as HTML (T1); `/template/` soft-404 risk; empty initial HTML; stale sitemap; `/download` 404.

**Unverified hypotheses:** T2 (production protocol and `www` hops); T4 (hosted-app subdomains in GSC); GSC property type; which 11 URLs are indexed; Cloudflare AI-crawler blocking (see COMPETITOR_AND_KEYWORD_RESEARCH §6); UTM survival into Studio GA4; whether full client re-render drives field INP (P-1).
