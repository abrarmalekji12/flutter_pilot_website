# First implementation milestone: cost, delivery and a measurable next step

_Prepared 2026-10-27 · Roadmap items R1.1 + R1.2 ([WEBSITE_IMPROVEMENT_ROADMAP.md](./WEBSITE_IMPROVEMENT_ROADMAP.md)) · **Implemented in PR #16** (commit "Show costs and delivery limits; make Studio links measurable"). F1, F4, F5 and F6 are source-verified; F2 and F3 are shipped from the product's config and in-app copy and still need the owner's confirmation; F7 is omitted._

## 1. What this milestone does

1. **Adds one homepage section, "What it costs and what you can ship"**, built with the existing `FeatureShowcase` feature-grid component, so it looks like the sections around it. It states, factually: free source export, pay-as-you-go credits with no subscription, AI generation cost, APK and web publishing costs, and what is **not** built in yet.
2. **Makes every Studio and download entry point a real, measurable link**: `<a href>` instead of JavaScript-only buttons, with consistent UTM parameters so Studio's existing GA4 can attribute sessions and `project_created` events to the website and to each placement. The hero prompt becomes a GET form that also works without JavaScript.

## 2. Why this goes first

| Reason | Evidence |
|---|---|
| The most basic visitor question (what does it cost, what can I ship?) has no answer anywhere on the site | WEBSITE_GROWTH_AUDIT §5.1, §7 |
| It surfaces the strongest verifiable differentiator: Flutter source export doesn't need a subscription or credits. FlutterFlow documents code download as a paid-plan feature. | PLATFORM_CAPABILITY_AUDIT B1, S5; COMPETITOR_AND_KEYWORD_RESEARCH §3 |
| It affects the page with 86% of clicks and 78% of impressions, without touching its title, H1 or hero | `docs/seo/MEASUREMENT.md` |
| No other improvement can be evaluated until website → Studio traffic is measured. Studio already logs `project_created` in GA4, so tagging the links is enough. | `flutterpilot-pro/lib/services/analytics_service.dart`; WEBSITE_GROWTH_AUDIT §8 |
| Small, additive and reversible: about a day of engineering plus owner fact review, with no new dependency, service or recurring cost | §4 below |

## 3. Owner facts to confirm before merge 🔒

The section must not ship with unconfirmed numbers. Record the confirmation in the PR description.

| # | Fact proposed for the page | Source in code | Status |
|---|---|---|---|
| F1 | Exporting the Flutter project (ZIP) doesn't use credits | `flutterpilot-pro/lib/ui/export/project_source_code_export_widget.dart`; `docs/manage/2026-10-11-android-export-customer-pricing-faq.md` | Source-verified; confirm policy |
| F2 | Credit packs, no subscription; packs from about **US$2.59** (50 credits); checkout shows local currency | `flutterpilot-cloudflare/config/razorpay_pricing.json` (`basePriceUsd: 259`) | Confirm. Android Google Play prices differ by storefront. |
| F3 | AI screen generation from **1 credit per screen**; cost varies by model | `lib/ui/credits/credits_usage_dialog.dart:98`; `config/ai-pricing.json` | Confirm wording |
| F4 | Android APK cloud build: **3 credits**, about 5–7 minutes | `lib/models/export/export_target.dart`; `credit_use_model.dart` | Source-verified |
| F5 | Hosted web app: **5 credits**, about 3–4 minutes, URL on `flutterpilot.com` | `export_target.dart` (`kCreditWebExport = 5`) | Source-verified. (The in-app dialog wrongly shows 3; report to the product team.) |
| F6 | Not built in yet: Google Play / App Store publishing, iOS builds | `DeploymentTarget.androidPlay` (`dispatchable: false`); `ExportTarget.ios` (`available: false`) | Source-verified |
| F7 | *(Optional, include only if confirmed)* any free allowance for new or active users (e.g. "10 free credits every month", "free daily AI requests") | `credits_usage_dialog.dart:217`; `config/ai-free-tier.json` | **Unverified or inconsistent.** Omit unless the owner confirms. |

**Fallback:** if F2–F3 can't be confirmed in time, ship only §5.2 (measured links) plus the section with F1, F4, F5 and F6, which are source-verified. Add the pack price later.

## 4. Files likely to change

| File | Change |
|---|---|
| `src/utils/studioLinks.js` **(new)** | Single source for outbound product URLs and UTM tagging |
| `src/utils/studioLinks.test.js` **(new)** | Unit tests for the helper |
| `src/content/pricing.js` **(new)** | Cost and delivery facts plus an `asOf` date, reused later by `/pricing/` (R1.4) |
| `src/pages/Landing.jsx` | Insert the new `featurelist` entry; the final CTA becomes a link |
| `src/componets/featurediscription.jsx` | Optional `cta` prop for the feature-grid footer button (default unchanged) and an optional section `id` |
| `src/componets/promptgeneratorhero.jsx` | Wrap the prompt panel in a GET `<form>`; keep current JS behavior |
| `src/componets/appbar.jsx` | Header and drawer "Open Studio" become `<a href>`; keep the Android → Play Store behavior |
| `src/componets/productshowcase.jsx` | "Open Web Studio" and platform buttons become `<a href>`; add "See costs" anchor link |
| `src/componets/ProductGuidePage.jsx` | Use the helper for the two existing Studio links (per-guide campaign) |
| `src/pages/Template/Template.jsx` | Use the helper for the root Studio link. **Template card links unchanged.** |
| `src/componets/Footer.jsx` | Use the helper for the Studio link |
| `src/pages/Docs/Docs.jsx` | Use the helper for its Studio link |
| `src/pages/PrivacyPolicy/PrivacyPolicy.jsx` | Use the helper for the Studio link in the policy text (`campaign: "privacy-policy"`, `content: "policy-text"`). This keeps the §5.3 guard simple; the visible link text stays `studio.flutterpilot.com`. |
| `public/docs/changelogs/index.html` | Add UTM parameters to its two Studio links by hand (`utm_campaign=changelog`) |
| `src/App.test.js` | The final CTA assertion changes from `role: 'button'` to `role: 'link'` |
| `scripts/seo/check-build.js` | New guard: Studio root links carry `utm_source`; `/template/` deep links carry **no** query string |
| `src/seo/routes.json` | Homepage `lastmod` → release date. **Title, description and H1 unchanged.** |

## 5. Proposed modifications

### 5.1 Cost and delivery section (R1.1)

**Placement:** in `src/pages/Landing.jsx`, append a fourth entry to `featurelist`. It renders after "From Prototype to Real App" and before `ExploreGuides` ("Choose where to start"). Section order is otherwise unchanged. The FlutterPilot Family and Partner sections stay where they are, because `App.test.js` asserts their order.

**Component reuse:** `FeatureShowcase` with `featureGrid: true` (the same card grid, badge and typography as "Comprehensive Tooling"). Two small additive props in `featurediscription.jsx`:

- `id` → set on the `<article>` so the section is linkable as `#pricing-and-delivery`.
- `cta` → `{ label, href, external }` replaces the hard-coded "Read the product guide" button for this section only. When `cta` is absent, render exactly the current button, which links to `/docs/`.

**Draft content** (edit after owner confirmation; keep the tone of the surrounding sections):

```js
// src/content/pricing.js — single source for cost/delivery facts (reused by /pricing/ later)
export const PRICING_AS_OF = "2026-11-XX"; // set at release
export const costAndDelivery = {
  title: "What it costs and what you can ship",
  subtitle: "Pay as you go with credits—no subscription. Export your Flutter project whenever you want.",
  items: [
    ["Flutter source export", "Download the complete Flutter project as a ZIP from the web or desktop Studio. Exporting doesn't use credits."],          // F1
    ["Pay-as-you-go credits", "Buy a credit pack only when you need one—packs start at about US$2.59, and checkout shows your local currency."],      // F2 🔒
    ["AI generation", "Generating screens starts at 1 credit per screen; the cost depends on the AI model you choose."],                               // F3 🔒
    ["Android APK", "Build an installable APK in the cloud for 3 credits (about 5–7 minutes)—for testing and sharing, not a signed Play Store release."], // F4
    ["Live web app", "Publish a hosted Flutter web app to a shareable flutterpilot.com address for 5 credits (about 3–4 minutes)."],                    // F5
    ["Not built in yet", "One-click Google Play and App Store publishing, and iOS builds. For store releases, build the exported Flutter project with your own Flutter tools."], // F6
  ],
};
```

- Icons from `@mui/icons-material` (already a dependency): `CodeRounded`, `AccountBalanceWalletRounded`, `AutoAwesomeRounded`, `AndroidRounded`, `LanguageRounded`, `InfoOutlined`.
- Badge "Pricing & delivery". Default (light) tone. `cta = { label: "Open FlutterPilot Studio", href: studioUrl({ campaign: "home", content: "cost-delivery" }), external: true }`.
- Below the grid, one small line rendered from `PRICING_AS_OF`: "Credit costs as of {date}. Current prices are shown in the Studio before you buy." Add a link to `/docs/#export` (an existing anchor; `check-build.js` validates anchors). The guide FAQ anchor is `#questions`, if a FAQ link is preferred.
- **No new styling system and no new colors.** Expected main word count increase is about 150 words.

### 5.2 Measured, crawlable Studio and download links (R1.2)

**`src/utils/studioLinks.js`** (sketch):

```js
export const STUDIO_ORIGIN = "https://studio.flutterpilot.com";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.builder.flutterpilot";
export const APP_STORE_URL = "https://apps.apple.com/in/app/ai-app-builder-flutterpilot/id6759552936";
export const MAC_DOWNLOAD_URL = "…/releases/macos/latest/flutterpilot-macos-latest.dmg";   // moved from productshowcase.jsx
export const WINDOWS_DOWNLOAD_URL = "…/releases/windows/latest/flutterpilot-windows-latest.exe";

const utm = (campaign, content) => ({
  utm_source: "flutterpilot.com",
  utm_medium: "website",
  utm_campaign: campaign,   // route slug: home, flutter-ui-builder, ai-flutter-ui-generator, flutter-app-builder,
                            // flutterflow-alternative, template, docs, changelog, about-us, contact, privacy-policy, not-found
  utm_content: content,     // placement: hero-generate, header, drawer, studio-showcase, cost-delivery, final-cta,
                            // guide-hero, guide-footer, footer, template-gallery
});

// Studio root (+ optional prompt handoff, which Studio accepts on "/").
export function studioUrl({ campaign, content, prompt }) { /* URLSearchParams(utm + prompt) → `${STUDIO_ORIGIN}/?…` */ }

// Template deep links must NOT carry a query string: Studio matches ^/template/([A-Za-z0-9]+)$ against the
// full link including the query (flutterpilot-pro/lib/route.dart:30,69), so tagged links would break.
export const studioTemplateUrl = (id) => `${STUDIO_ORIGIN}/template/${encodeURIComponent(id)}`;

// Play Store install attribution via the referrer parameter (Firebase Analytics reads the install referrer).
export function playStoreUrl({ campaign, content }) { /* `${PLAY_STORE_URL}&referrer=${encodeURIComponent(qs(utm(...)))}` */ }

export const campaignForPath = (pathname) => /* "/" → "home", "/flutter-ui-builder/" → "flutter-ui-builder", unknown → "not-found" */;
```

**Conversions** (keep labels, styles and visual design unchanged; only the element and target change):

| Placement | Today | After |
|---|---|---|
| Hero **Generate** (`promptgeneratorhero.jsx`) | `<Button onClick>` → `window.location.href = studio?prompt=` | `<form method="get" action="https://studio.flutterpilot.com/">` containing the TextField (`name="prompt"`), hidden `utm_*` inputs (`campaign=home`, `content=hero-generate`) and a `type="submit"` button. JS `onSubmit` keeps today's behavior: when empty, use `examplePrompts[0]`, and navigate in the same tab. Without JS, the native GET submit works. An empty prompt is ignored by Studio (`_nonEmpty` in `startup_route.dart`). |
| Header + drawer **Open Studio** (`appbar.jsx`) | `<Button onClick>`; Android → Play Store | `<Button component="a" href>`. Prerendered href = `studioUrl({campaign, content: "header"/"drawer"})`. On the client, when the UA is Android, href = `playStoreUrl(...)` (same behavior as today). Keep `target="_blank"` on desktop, as today. |
| **Open Web Studio** (`productshowcase.jsx`) | `<Button onClick>` | `<a href={studioUrl({campaign:"home", content:"studio-showcase"})}>` |
| Platform buttons (Play, App Store, macOS, Windows) | `<Button onClick>` | `<a href>`: Play via `playStoreUrl`, App Store URL, DMG/EXE direct links with the `download` attribute. Keep `aria-label`s. |
| Homepage final CTA (`Landing.jsx`) | `<Button onClick={window.open}>` | `<Button component="a" href={studioUrl({campaign:"home", content:"final-cta"})} target="_blank" rel="noopener">` |
| Guide hero and footer CTAs (`ProductGuidePage.jsx`) | `<a href=STUDIO_URL>` | `studioUrl({campaign: <slug>, content: "guide-hero" / "guide-footer"})` |
| Template page root link (`Template.jsx`) | `<a href=STUDIO_URL>` | `studioUrl({campaign:"template", content:"template-gallery"})` |
| Template cards (`templatecard.jsx`) | `/template/<id>` | **Unchanged** (no query string) |
| Footer, Docs, changelog | `<a href=studio>` | helper (or a hand-edited URL in the static changelog) |
| "See costs" (new, `productshowcase.jsx` CTA subtext) | n/a | `<a href="#pricing-and-delivery">See costs</a>` appended to "Build in your browser • No install required" |

**`rel` attribute:** the original plan was `rel="noopener"` so GA4 would also see the referrer. Create React App's lint rule (`react/jsx-no-target-blank`) fails the CI build without `noreferrer`, so the implementation keeps `rel="noopener noreferrer"`. Attribution comes from the UTM tags instead.

### 5.3 Regression guard (`scripts/seo/check-build.js`)

Add two checks over every prerendered page:

1. Every `<a href>` that starts with `https://studio.flutterpilot.com/` **and isn't** a `/template/` link must contain `utm_source=flutterpilot.com`, `utm_medium=website`, and non-empty `utm_campaign` and `utm_content`.
2. Every `https://studio.flutterpilot.com/template/…` link must have **no** `?`. This guards the Studio regex limitation.

## 6. What must remain unchanged

- Homepage `title`, `description` and **H1 text**; the hero layout, gradient, rotating platform word, signal chips, prompt box and example chips.
- Brand colors, typography, screenshots, videos, the canvas animation and the existing framer-motion entrance animations.
- Section order except the single insertion, including the FlutterPilot Family → Partner order asserted in `App.test.js`.
- Navigation items and footer structure.
- All canonical, redirect, 404, sitemap and robots behavior. No changes to `public/_redirects`, `public/_headers` or `public/robots.txt`.
- Template card deep links (`/template/<id>`, no query string).
- Prompt handoff semantics: an empty prompt still uses the first example prompt when JS is available.
- Android visitors tapping the header CTA still reach the Play Store.

## 7. Validation steps

1. `npm test -- --watchAll=false`: all existing tests, plus new `studioLinks.test.js` cases:
   - `studioUrl({campaign:"home", content:"hero-generate", prompt:"A b&c"})` yields a URL with all four UTM keys and `prompt=A+b%26c` or `A%20b%26c`.
   - `studioTemplateUrl("abc123")` has no `?`.
   - `campaignForPath("/flutter-ui-builder/") === "flutter-ui-builder"`; unknown paths → `"not-found"`.
   - `playStoreUrl(...)` includes `&referrer=` with encoded UTM.
2. `npm run build`; `npm run test:seo` (expect the existing 716 checks plus the new guards to pass); `npm run test:seo:pages` (138/138).
3. Inspect `build/index.html`: the new section's H2 and items appear in the prerendered `<main>`; `#pricing-and-delivery` exists; header, hero and final CTAs are `<a>` or `<form>` elements with tagged URLs.
4. **No-JavaScript check:** open the prerendered homepage with JS disabled, type a prompt, and press Generate. The browser navigates to `https://studio.flutterpilot.com/?prompt=…&utm_source=…`.
5. **On the CI preview deployment** (`seo-checks.yml` posts the URL): click every changed CTA on desktop and in Android emulation (DevTools device mode). Confirm the destinations: web Studio with UTM, or the Play Store with `referrer`.
6. **Studio-side checks** (live Studio, owner):
   - `https://studio.flutterpilot.com/?prompt=Todo%20app&utm_source=flutterpilot.com&utm_medium=website&utm_campaign=home&utm_content=hero-generate` → after sign-in, the project-generation prompt is pre-filled. UTM keys don't break routing (`lib/route.dart` strips the query for path matching).
   - In GA4 DebugView (Google Analytics Debugger extension), the session shows source/medium `flutterpilot.com / website` and campaign `home`. **If UTM is lost** because startup routing rewrites the URL before Firebase Analytics initializes, open a Studio follow-up to log a `website_referral` event from `StartupRouteIntent`. The website change is still correct and harmless.
7. Lighthouse (simulated mobile, 5-run median, same setup as `docs/seo/MEASUREMENT.md`) on `/`: LCP and TBT within run-to-run noise of the pre-change build; CLS stays 0.
8. Keyboard and screen reader spot-check: the converted CTAs are announced as links with the same names, and focus order is unchanged.

## 8. SEO regression checks

| Check | How | Pass condition |
|---|---|---|
| Registry integrity | `npm run test:seo` | Title, description, H1, canonical, JSON-LD and sitemap unchanged except homepage `lastmod` |
| Internal links and anchors | `check-build.js` link and hash validation | All internal links resolve; `#pricing-and-delivery` exists |
| HTTP behavior | `npm run test:seo:pages`; CI preview `check-deployment.js` | 138/138 |
| Production sitemap | Existing deploy step "Verify public-domain sitemap" | 8/8 |
| Live HTML | GSC URL Inspection → Test live URL for `/` | New section present in the tested HTML; indexable |
| Search performance | GSC, homepage, 28 days after release vs the prior 28 days, split branded/non-branded | No material drop in homepage clicks or CTR, or in `flutter ai app builder` position, beyond movement also seen in branded queries |

Tagged outbound links to the Studio subdomain have no indexing effect on flutterpilot.com, and the website's canonical URLs don't change.

## 9. Rollback

- **One-PR revert** restores the previous state completely. There is no data migration, storage change or third-party dependency.
- If a single fact becomes wrong, edit `src/content/pricing.js`, or remove the one `featurelist` entry, and redeploy (one file, one line).
- If Studio mishandles a tagged link, revert only `studioLinks.js` to return untagged URLs. Every call site keeps working.
- Both production pipelines (Cloudflare Git integration and the GitHub Actions deploy) build from `main`, so a revert commit redeploys through the normal path (`docs/seo/IMPLEMENTATION_PLAN.md`, "Deployment setup").

## 10. Measurable success criteria

| # | Criterion | Measured in | When |
|---|---|---|---|
| S1 | All tests and SEO checks pass; owner sign-off on F1–F7 recorded in the PR | CI, PR | Merge |
| S2 | Tagged sessions appear in Studio GA4 for at least the `hero-generate`, `header`, `studio-showcase`, `cost-delivery` and `final-cta` placements (instrumentation works) | GA4 → Traffic acquisition, filter `session source = flutterpilot.com` | 7 days after deploy |
| S3 | A documented baseline: website → Studio sessions per week, by placement and campaign, and the share of those sessions with `project_created` | GA4 exploration | 28 days after deploy |
| S4 | No search regression on the homepage (§8, last row) | GSC | 28 days after deploy |
| S5 | No lab performance regression (LCP and TBT within noise; CLS 0) | Lighthouse 5-run median | Before merge |
| S6 | The `cost-delivery` placement produces Studio sessions (non-zero share of tagged homepage sessions), showing visitors act on the section | GA4 | 28 days after deploy |

S3 becomes the baseline for later decisions: `/pricing/` (R1.4), the examples gallery (R2.3) and section order (R3.5). **No numeric uplift target is set**, because no baseline exists today.
