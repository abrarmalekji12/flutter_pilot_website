# FlutterPilot platform capability audit

_Investigation date: 2026-10-27 · Author: website growth investigation (documentation only; no product code changed)_

This document is the factual base for every claim on flutterpilot.com. It records what FlutterPilot can do **today**, how mature each capability is, where the evidence lives, and how well the website covers it.

## 1. Sources and method

| Repository | Revision inspected | What it contains |
|---|---|---|
| `abrarmalekji12/flutterpilot-pro` | `683876a` (master, 2026-10-27 23:35 +0530) | Flutter Studio app (web, Android, iOS, macOS, Windows), AI generation, editor, data, export UI, management records in `docs/manage/` |
| `abrarmalekji12/flutterpilot-cloudflare` | `e8659a7` (main, 2026-10-27 00:28 +0530) | Cloudflare Worker: AI proxy and billing, credits and Razorpay, build dispatch, hosted web apps |
| `abrarmalekji12/flutterpilot_builder` | `1a59dfa` (master, 2026-10-21) | GitHub Actions workflows that compile exported projects (APK, web, dark Play AAB) |
| `abrarmalekji12/flutter_pilot_website` | `ac96e1b` (main, 2026-10-27) | This website |

Method:

- **Code first.** Each capability was traced to the UI entry point a user can reach, then to its backend or build step. Feature names, README text and marketing copy were not taken as evidence on their own.
- **Management records.** `flutterpilot-pro/docs/manage/README.md` (the living priority log, updated 2026-10-27) was used to tell "merged in source" apart from "released to users".
- **Not verified:** live Studio behavior, installed app builds, and production backend configuration. The environment's network policy blocked `flutterpilot.com` and `studio.flutterpilot.com`. Statements marked "source-verified" mean the code exists on the default branch, not that every installed client has it.

### Maturity scale

| Label | Meaning |
|---|---|
| **Production-ready** | Implemented, reachable by every user, used in normal workflows, and not labelled Beta in the UI. Known bugs may exist. |
| **Beta** | Implemented and user-reachable, but labelled Beta in the UI or under active reliability work documented in `docs/manage/`. |
| **Partial** | Infrastructure exists, but the user workflow is incomplete, admin-only, or not released. |
| **Planned** | Declared in code or plans, not available. |
| **Unverified** | Claimed somewhere, but the investigation found no supporting evidence. |

## 2. Capability inventory

### 2.1 AI-assisted development

| # | Capability | Maturity | What users get | Evidence | Limitations |
|---|---|---|---|---|---|
| A1 | **AI project generation: "Starter App" mode** | Beta | Public default. Generates a multi-screen project with polished UI plus a "bounded Collection experience": listings, field bindings, add/edit/delete, details and local navigation. | `lib/ai/project_generation_mode.dart` (doc comment and `ProjectGenerationModeAccess`); `lib/ui/generation/project_generation_mode_selector.dart:129`; website changelog 2.0.0 | Generated data is local Collections, not auth or API logic. Generation-failure and truncation incidents are open (`docs/manage/2026-10-12-incomplete-ai-screen-generation.md`). The 27 Oct feedback review counts 287 open reports. |
| A2 | **AI project generation: "Functional App" mode** (auth, APIs, state, advanced logic) | **Partial: admin-only** | Not available to customers. The selector hides it unless `isAdmin`, and `resolve()` falls back to Starter App. | `project_generation_mode.dart` (`canStart` returns `isAdmin` for functional); `project_generation_mode_selector.dart:133` | Workflow-first redesign is still a proposal (`docs/manage/2026-10-22-functional-generation-investigation.md`). **The website must not imply that AI generates auth, API or business logic.** |
| A3 | **Single screen / component generation from a prompt** | Production-ready | The "AI Powered" tab in Create Screen and Create Project dialogs; custom component generation. | `lib/ui/create_screen_dialog.dart:255`; `lib/ai/component_generator.dart`; in-app guide `.planning/rag_docs/fp_ai_assistant.md` | Provider truncation and failures still occur. |
| A4 | **AI Agent** (project-aware chat) | **Beta** (labelled `BETA` in the UI) | Creates screens and components, adds Page/App State, creates and updates REST endpoints, applies AI edits, and starts code export or an APK build. Uses task plans, keeps working in the background, and saves conversation history. | `docs/ai-assistant.md`; `lib/ui/chat/ai_assistant_page_base.dart:1756` (`aiAssistantBetaLabel`); `lib/ai/assistant_task_plan.dart` | Cross-screen navigation and Android crash incidents are open (`docs/manage/2026-10-24-ai-agent-home-navigation-prerequisites.md`, `2026-10-20-ai-agent-edit-crash-after-minimize.md`). The website calls this the "AI Copilot", but the Studio calls it the **AI Agent**. |
| A5 | **Edit with AI** (targeted revisions of an existing screen) | Beta | Natural-language patch of the selected screen or component, applied as a reviewable change. | `lib/ui/generation/edit_with_ai.dart`; `docs/manage/2026-10-07-ai-assistant-edit-ai-reliability.md` | Reliability work is ongoing. |
| A6 | **AI binding and action generation** ("Bind with AI", action AI) | Beta | AI proposes data bindings and action flows for a selected widget. | `lib/ai/binding_generator.dart`, `lib/ai/action_generator.dart`; `docs/manage/2026-10-11-ai-binding-action-harness-static-engine-alignment.md` | Canonical binding-path refactor is still proposed. |
| A7 | **Choice of AI models from several providers** | Production-ready (catalog is operator-controlled) | Users pick a model or tier: Free / Lite / Smart / Max, or a specific model. The Worker prices models from Google (Gemini, Gemma), OpenAI, Anthropic (Claude), Mistral, DeepSeek and xAI. | `flutterpilot-cloudflare/config/ai-pricing.json`; `docs/manage/2026-10-11-gemma-assistant-quota-rate-limit.md` | The enabled model list changes through the operator dashboard. **Do not hard-code model names on the website.** |
| A8 | **Free daily model allowance** | Beta (server config merged; release verification open) | 30 requests per user per day on designated free models (currently Gemma) cost 0 credits. | `config/ai-free-tier.json` (`daily_free_requests: 30`); `docs/manage/2026-10-11-free-model-allowance-release-verification.md` | The in-app dialog separately says "AI Chat Support: 3 free / day · then 0.5 credits / msg" (`lib/ui/credits/credits_usage_dialog.dart:119`). **The owner must reconcile the two before any public claim.** |
| A9 | **Image (screenshot) attachments in AI prompts** | Partial | Gemini-first image input, enabled per model by the operator. | `lib/ai/ai_image_attachment.dart`; `docs/manage/2026-10-14-multimodal-ai-input-capabilities.md` | Accounting and canary gates are open. The Create Screen attachment fix was on a review branch as of 15 Oct. Not release-confirmed. |
| A10 | **Voice dictation in the AI prompt box** | Beta | Microphone input transcribed to editable text. OpenAI and Gemini transcription confirmed live by the owner on 16 Oct. | `lib/ai/ai_transcription_client.dart`; `config/ai-transcription.json` | One desktop lifecycle gap remains open. |
| A11 | **Prompt handoff from the website** | Production-ready (source-verified) | `studio.flutterpilot.com/?prompt=…` on `/`, `/login` or `/register` pre-fills project generation. | `lib/routing/startup_route.dart:73-75`; website `src/componets/promptgeneratorhero.jsx` (`openStudio`) | Must be verified on live Studio after any website link change. |

### 2.2 Visual Flutter development

| # | Capability | Maturity | Evidence | Notes for the website |
|---|---|---|---|---|
| V1 | **Visual editor:** widget tree, palette, device canvas, property panel, undo/redo, cloud auto-save | Production-ready | `.planning/rag_docs/fp_editor_guide.md`; `public/flutterpilot_ss.webp` | Already well covered by `/flutter-ui-builder/`. |
| V2 | **Widget catalog: 134 catalogued Flutter widgets** (41 layout, 34 UI, 33 input, 26 navigation/flow), including `Chart`, `WebView`, `Ad`, `Shimmer`, `DataLoaderWidget`, `IfCondition`, `ForLoop` | Production-ready | `lib/ai/doc_sections.dart` `componentCatalog` (counted: 134) | The site names examples but never states the breadth. "130+ Flutter widgets" is a verifiable claim. |
| V3 | **Dart expressions in any property** (`fx`) | Production-ready | `lib/ai/rag_context.dart` §11 | Not mentioned on the site. |
| V4 | **Responsive preview and Run mode** (device frames; mobile, tablet and desktop viewports; interpreted run with console) | Production-ready | `rag_context.dart`; `public/flutterpilot_ss.webp` (Run/Preview toolbar) | Covered. |
| V5 | **Custom components** (stateless or stateful, typed arguments) | Production-ready | `docs/custom-component-model.md` | Covered as "reusable building blocks". |
| V6 | **Navigation and routing actions** (push, replace, back, tabs, bottom sheets, dialogs) | Production-ready | `lib/models/actions/*` | Covered. |
| V7 | **State management:** App State, Page State, persistence, rebuild modes | Production-ready | `rag_context.dart` §6; website `/docs/#state-management` | Covered. |
| V8 | **Action flows: 41 action types.** Examples: conditional, loop, for-each, parallel, attempt, endpoint call, record mutation, load collection, login/register/logout/reset password, biometric verification, haptic feedback, send email/SMS, call number, deep link, dark mode, snackbar, dialogs, invoice dialog, custom code | Production-ready (core); newer types Beta | `grep "class .*Action extends" lib/models` (41 unique classes) | The homepage chip says "25+ built-in actions", which is true but understated. The breadth (device actions, auth actions) is a differentiator nobody sees. |
| V9 | **Custom Dart code** (FVB interpreter, a Dart-like subset) | Production-ready, with limits | `lib/ai/doc_sections.dart` `dartClassCatalog`; `docs/manage/2026-10-19-fvb-code-try-catch.md` | `try/catch` is not supported yet. Don't describe it as full Dart. |
| V10 | **Templates:** built-in screen templates (Login, Sign Up, Forgot Password, Profile, Settings, Dashboard, Onboarding), community/project templates from Firestore (e.g. Ignite Fitness, Kyoto Wander), and Collection UI templates (list, detail card, form) | Production-ready | `lib/ui/page_template/builtin_templates.dart`; `lib/ui/page_template/explore_template_section.dart`; `lib/ui/data_panel/collection_template_dialog.dart`; Studio route `/template/<id>` (`lib/route.dart:30`) | Owner direction: AI-first stays the primary entry, and templates must not replace it (`docs/manage/2026-10-08-beginner-first-success-experience.md`). |
| V11 | **Figma import** | Beta | `lib/mode_converters/figma`; Create Project/Screen "Figma" tab; l10n string "(Beta)" | Covered on the homepage. Should carry a Beta label. |
| V12 | **Version control** (commit, restore) | Production-ready | `lib/ui/version_control/*`; toolbar entry `lib/ui/home/toolbar_buttons.dart:536` | Covered as "Versioned Team Workflow". |
| V13 | **Project collaborators** (add by email in project settings) | Partial / Unverified depth | `lib/ui/settings/bloc/settings_bloc.dart` (`_addCollaborator`) | No evidence of real-time co-editing. "Project sharing" is fine. "Real-time collaboration" (claimed in Studio's `web/index.html`) is **not supported by evidence**. |
| V14 | **Data models from JSON** (paste JSON → typed model) | Production-ready | `lib/ui/models_view.dart:608` | This is the only "import" feature found near widgets/models. |
| V15 | **Import of arbitrary custom Dart widgets** | **Unverified** | No code path found | The website claims "import custom widgets" in two places (see §4). Reword unless the owner can point to the feature. |

### 2.3 Data and application functionality

| # | Capability | Maturity | Evidence | Limitations |
|---|---|---|---|---|
| D1 | **Local Collections** (Hive, offline, schema studio, live rows, mock samples) | Production-ready | `lib/data/datasource/data_collection.dart` (`DataSourceType.local`); `rag_context.dart` §8 | Device-local only, so no multi-user data. |
| D2 | **CRUD through bindings** (`bindWith`, `bind`, verbs add/edit/save/delete/search/refresh; Record Mutation action) | Production-ready (2.0 focus) | `lib/data/datasource/*`; `lib/models/actions/record_mutation_action.dart`; changelog 2.0.0 | Exported Delete-refresh parity was fixed in review (`docs/manage/2026-10-11-exported-delete-record-refresh-parity.md`). |
| D3 | **Structured queries** (nested all/any, null checks, IN filters, multi-sort, pagination, exact count) | Production-ready | `lib/data/datasource/collection_query.dart`; changelog 2.0.0 | n/a |
| D4 | **Google Sheets as a data source** (Google sign-in and Picker, schema inference, mapped templates, CRUD) | Beta (l10n "(Beta)") | `DataSourceType.sheets`; `lib/data/datasource/sheets/`; Studio `web/index.html` Picker; website privacy policy (Google user data disclosures) | Sheet header row required. |
| D5 | **Cloud Firestore collections** | Beta | `DataSourceType.firestore`; `lib/data/datasource/firestore/` | "Move to Cloud" only goes Local → Firestore/Supabase (`docs/manage/2026-10-11-collection-source-switching.md`). |
| D6 | **Supabase collections** | Beta | `DataSourceType.supabase`; `lib/data/datasource/supabase/` | RLS-backed authorization is a later gate. |
| D7 | **Relationships** (belongs-to, one-to-many) | Beta | `lib/data/datasource/relationship/`; `docs/manage/2026-10-06-relationship-engine-v2.md` | Installed-app acceptance still pending. |
| D8 | **REST endpoints:** GET/POST/PUT/PATCH/DELETE, headers, body, typed arguments, global variables, mock responses, Postman collection import, `DataLoaderWidget` loading/success/error slots | Production-ready | `lib/ui/endpoint_connector/endpoint_connector_view.dart`; `rag_context.dart` §9; `public/endpoint_preview.webp` | n/a |
| D9 | **End-user authentication in generated apps** (Firebase or Supabase; Login/Register/Logout/Reset Password actions; page access) | Beta | `lib/ui/settings/models/project_setting_model.dart:10` (`AppAuthenticationProvider { firebase, supabase }`); `lib/code_generators/auth_export_generator.dart` | Export grey-screen fixes landed in October. A "Local (Testing)" auth provider is planned. AI generation does not create auth for public users (A2). |
| D10 | **Google AdMob banner ads** | Production-ready | `doc_sections.dart` `_admobGuide`; website `/docs/#monetization` | Real ads only in Android/iOS builds. |
| D11 | **Workflow-first functional apps** (cart, favourites and attendance as workflows, not CRUD screens) | Planned | `docs/manage/2026-10-22-functional-generation-investigation.md` | Proposal, not owner-approved. |

### 2.4 Building, publishing and ownership

| # | Capability | Maturity | What users get | Evidence | Limitations |
|---|---|---|---|---|---|
| B1 | **Flutter source export** (ZIP) | Production-ready; free | Full project download on web and desktop. Native phones and tablets can view the code and are sent to web/desktop for the download. No credit debit was found in this flow. | `lib/ui/export/project_source_code_export_widget.dart`; `lib/common/download_utils.dart`; `docs/manage/2026-10-11-android-export-customer-pricing-faq.md` | Not guaranteed to be instantly Play-publishable (signing, dependencies, platform config). The 24 Oct review found that the analyzer export gate is skipped on mobile and web clients. |
| B2 | **Android APK cloud build** | Production-ready | "Generate Android APK": 3 credits, 5–7 minutes, compiled with `flutter build apk --release` on GitHub Actions, downloadable and shareable | `lib/models/export/export_target.dart` (`ExportTarget.android`); `lib/cubit/credit/credit_use_model.dart` (`kCreditApkExport = 3`); `flutterpilot_builder/.github/workflows/build_apk.yaml:323-336` | **Test/distribution APK, not a Play-ready signed AAB.** |
| B3 | **Hosted web app publishing** | Production-ready | "Build & Deploy Web App": 5 credits, 3–4 minutes, live at `https://<slug>-app.flutterpilot.com`, can be unpublished | `export_target.dart` (`ExportTarget.web`, `kCreditWebExport = 5`); `flutterpilot-cloudflare/wrangler.hosting.toml`; `controllers/apk.js:340`; `flutterpilot_builder/.github/workflows/web_export.yml` | A PWA install prompt is only proposed (`docs/manage/2026-10-14-web-export-home-screen-install.md`). |
| B4 | **Google Play signed AAB / Play publishing** | **Partial: implemented in source, NO-GO for release** | Not available | `DeploymentTarget.androidPlay` (`dispatchable: false`); `docs/manage/README.md` (24–27 Oct entries) | Security, signing custody and pilot gates are open. Google's Publishing API terms bar SaaS publishing on a customer's behalf, so the plan is a manual Play Console handoff. **Never market as available.** |
| B5 | **iOS build (unsigned IPA)** | Planned | "Coming soon" in the export dialog | `ExportTarget.ios` (`available: false`) | Users can build iOS themselves from exported source (needs a Mac and Xcode). |
| B6 | **Desktop app binaries** (Windows/macOS/Linux) | Partial: indirect | No build service. Desktop viewports exist in preview, and the exported Flutter project can be built for desktop with the user's own toolchain. | No desktop target in `export_target.dart`; `lib/ui/export/export_dev_tools_dialog.dart` (desktop-only dev tools) | Whether the exported ZIP includes desktop runner folders was not verified. |
| B7 | **Jaspr web export** | Planned | n/a | `docs/manage/2026-10-06-jaspr-web-export-target.md` | n/a |
| B8 | **Code ownership and branding** | Production-ready (behavior); policy unconfirmed | No FlutterPilot splash, watermark or logo found in export options or the generator | `docs/manage/2026-10-11-android-export-customer-pricing-faq.md` | Formal licensing language isn't written. Say "no FlutterPilot watermark is added to exported code" only after the owner confirms. |

### 2.5 Studio availability, accounts and pricing

| # | Item | Status | Evidence |
|---|---|---|---|
| S1 | **Studio on web** (`studio.flutterpilot.com`) | Production | `flutterpilot-pro/web/`, `firebase.json` |
| S2 | **Studio Android app** (`com.builder.flutterpilot`) | Production. Last recorded Android release 12 Oct; production build 283 per the 24 Oct review | `src/componets/appbar.jsx:30`; `docs/manage/README.md` |
| S3 | **Studio iOS app** (App Store `id6759552936`) | Production. Apple builds use "design" copy rather than APK copy (`onboardingPage1TitleApple`) | `src/componets/productshowcase.jsx:69`; `lib/l10n/app_localizations_en.dart:1111` |
| S4 | **Studio desktop apps** (macOS DMG, Windows EXE) | Production. Downloads are served from a bucket named `flutter-visual-builder-staging` | `src/componets/productshowcase.jsx:57-60`. Linux is commented out. |
| S5 | **Credits, pay as you go, no subscription** | Production | Packs on web via Razorpay: 50 credits ≈ US$2.59, 150 ≈ US$6.30, 500 ≈ US$14.60 (base USD; INR/EUR/GBP/AED localized server-side). Android uses Google Play in-app prices. Sources: `flutterpilot-cloudflare/config/razorpay_pricing.json`, `lib/ui/credits/credit_purchase_dialog.dart`. |
| S6 | **What costs credits** (in-app copy) | Production, with one inconsistency | AI generation "from 1 credit / screen"; APK 3 credits; web publish 5 credits (code). The usage dialog shows "3 credits / build or publish" for both (`credits_usage_dialog.dart:112`), so it **understates the web cost** (product bug, outside website scope). |
| S7 | **"10 free credits every month"** | **Unverified server-side** | Shown in-app (`credits_usage_dialog.dart:217`, `credit_indicator.dart:65`, notification "Monthly credit refresh"). The grant mechanism isn't in the inspected repos (possibly `flutterpilot_firebase_functions`, not inspected). |
| S8 | **Analytics in Studio** | Production | GA4 through Firebase Analytics on web/Android/iOS: `project_created`, `project_export`, `apk_export`, `ai_assistant_session` (`lib/services/analytics_service.dart`). None on desktop. |

## 3. What the website can safely say today

**Safe, verifiable claims** (each backed by §2):

1. Describe an app and FlutterPilot generates an editable multi-screen Flutter project. Starter apps include list, details, add, edit and delete flows on local collections. (A1)
2. Every generated screen is made of real Flutter widgets you can edit visually. The catalog has 130+ widgets. (V1, V2)
3. Add behavior visually: 40+ action types covering navigation, conditions, loops, API calls, data writes, sign-in actions, device actions and custom Dart. (V8)
4. Connect REST APIs (including Postman import and mock responses), local offline collections, and Google Sheets, Firebase and Supabase (Beta). (D1–D8)
5. Export the full Flutter project as a ZIP at no credit cost from web or desktop. (B1)
6. Build an installable Android APK in the cloud (3 credits) and publish a hosted web app to a shareable URL (5 credits). (B2, B3)
7. Pay as you go with credits, with no subscription. Credit packs start at about US$2.59, and checkout shows the local currency. (S5; quote prices only with an "as of" date)
8. Use the Studio in the browser, on Windows and macOS, and on Android and iOS. (S1–S4)
9. Choose between AI models from several providers. (A7)

**Claims to avoid or qualify:**

| Claim | Why |
|---|---|
| "AI builds complete/functional apps with auth, APIs and logic" | Functional App mode is admin-only (A2). |
| "Publish to Google Play / App Store from FlutterPilot" | Play AAB is not released (B4). iOS export is planned (B5). |
| "Production-ready code" / "no coding needed" (Studio `web/index.html`) | Export can fail the analyzer, and the product assessment says users still meet engineering concepts (`docs/manage/2026-09-21-product-assessment.md`). |
| "Real-time collaboration" (Studio `web/index.html`) | No evidence (V13). |
| "Import custom widgets" (website) | No evidence (V15). |
| "10 free credits every month", "30 free AI requests per day" | Unverified or inconsistent (A8, S7). Publish only after the owner confirms. |
| Specific AI model names | The catalog changes through the dashboard (A7). |
| "Build desktop apps" without a qualifier | Only through exported source and the user's own toolchain (B6). |

## 4. Website coverage gaps

How each important capability is represented on flutterpilot.com (main @ `ac96e1b`).

| Current capability | Website coverage | Problem | Opportunity | Priority |
|---|---|---|---|---|
| Pay-as-you-go credits, free source export, no subscription (S5, B1) | **None.** No pricing page, nav item or FAQ. The FlutterFlow page says "Pricing isn't compared here." | Visitors can't tell what's free, paid or limited. The strongest verifiable difference from FlutterFlow (code download needs a paid plan per its docs) goes unused. | "What it costs and what you can ship" section, then a `/pricing/` page; pricing-model row on the FlutterFlow page | **P1** |
| Delivery options (B1–B5) | Listed as features ("One-Click Web Deploy", "Cloud-Built Android APK", "Own the Flutter Source") | No statement of what is *not* available (Play/App Store publishing, iOS build), and "APK" could be read as store-ready | A "What you can deliver today" block with honest limits | **P1** |
| Breadth of real app behavior (V8: 41 actions; D9 auth actions; device actions) | "25+ built-in actions" chip; generic "Actions & State" cards | Understated and abstract. Visitors don't see that apps can sign users in, call APIs, vibrate or send SMS. | Concrete action list on `/flutter-app-builder/` and docs | P2 |
| Studio on phones and tablets (S2, S3) | Download buttons only | Building or editing apps from a phone isn't presented as a use case | One "Build on any device" line in the CTA area; avoid uniqueness claims (competitor parity unverified) | P2 |
| Google Sheets as a backend (D4) | One-liners on homepage, guides and docs | No page answers "build a Flutter app from Google Sheets" | Tutorial/doc leaf page (with Beta label) | P2 |
| REST + Postman + mock responses (D8) | Good section on `/flutter-app-builder/` | Lives inside a broader page. The prior plan rated a dedicated how-to as the top new page. | Docs leaf page "Connect a REST API to a Flutter app" | P2 |
| Hosted web publishing (B3) | Feature card only | No live example or URL format | Live demo link to a FlutterPilot-hosted sample app | P2 |
| Version control and sharing (V12, V13) | Homepage card "Versioned Team Workflow" | Fine. Avoid "real-time". | Keep | — |
| Multi-provider model choice (A7) and free model allowance (A8) | None | Unknown to visitors | One line in the pricing section once A8 is confirmed | P2 |
| AdMob monetization (D10) | Docs card | Low search value | Keep in docs | P3 |
| Voice and image prompts (A9, A10) | None | Not fully released | Wait for release confirmation | P3 |
| AI Agent naming (A4) | Called "Project-Aware AI Copilot" / "copilot" | Studio calls it "AI Agent" (Beta). Inconsistent entity names confuse users and AI summaries. | Rename on the site and add the Beta label | P1 (copy) |
| Functional App generation (A2) | Guides honestly say "broader functional app generation is still limited" | Good. The homepage card "AI Project Creator… AI handles screens, navigation, and structure" is accurate for Starter. | Keep the honesty. Add "Starter App" naming. | — |

### Accuracy issues in current website copy

| Location | Current text | Issue | Suggested fix |
|---|---|---|---|
| `src/componets/productGuideContent.js` (flutter-ui-builder `features` and `faq`) | "Turn repeated UI patterns into components, **or import custom widgets**." / "You can also import custom widgets." | Unverified (V15) | "…into reusable custom components." |
| `productGuideContent.js` (flutterflow-alternative comparison, "Custom code" row) | "Custom Dart code inside action flows, **and imported custom widgets**." | Unverified (V15), on a page whose credibility rests on accuracy | "Custom Dart code in action flows and reusable custom components; Dart expressions in any property." |
| `productGuideContent.js` (ai generator FAQ; FlutterFlow table and trade-offs) | "The AI project creator (**labelled Beta in the Studio**)" | The Studio strings `projectAiCreate` "(Beta)" are no longer used. The **AI Agent** is the component labelled `BETA`. | "AI project generation (Starter App mode) and the AI Agent (labelled Beta)…" |
| `src/componets/promptgeneratorhero.jsx` (H1) | "Build a real Flutter mobile, desktop, or web app…" | Desktop delivery is indirect (B6) | Keep the H1 (it is the top-performing page, 86% of clicks). Qualify in the subtitle or a platform FAQ: "desktop via the exported Flutter project". |
| `src/pages/Landing.jsx` ("Connected Data") | "Google Sheets, REST APIs, Firebase, Supabase, or local collections" | Sheets, Firebase and Supabase are Beta | Add "(Beta)" or a footnote |
| `src/pages/Landing.jsx` ("Figma Import") | No Beta label | Beta (V11) | Add "(Beta)" |
| Studio `flutterpilot-pro/web/index.html` (cross-repo) | "no coding needed", "production-ready Flutter code", "Real-time collaboration", "one-click code export", "The best FlutterFlow alternative", FAQPage JSON-LD | Overclaims, and they compete with the apex site for brand signals | See WEBSITE_IMPROVEMENT_ROADMAP R1.5 |

## 5. The 5–10 capabilities that most deserve better exposure

Ranked by (visitor value × verifiability × differentiation).

1. **Free Flutter source export with pay-as-you-go credits and no subscription** (B1, S5). Verifiable, rare among competitors, and directly addresses the main FlutterFlow objection.
2. **Three concrete delivery paths:** source ZIP, Android APK, hosted web URL (B1–B3), with honest limits (B4, B5).
3. **AI output that stays editable as real Flutter widgets in a visual editor** (A1, A3, V1, V2). Differentiates from code-only AI builders (Bolt, Lovable) and React Native builders (Rork).
4. **Real behavior without code:** 41 action types including sign-in, API calls, data writes and device actions (V8, D9).
5. **REST APIs with Postman import and mock responses** (D8). High-intent developer workflow, Production-ready.
6. **Google Sheets → Flutter app** (D4). Niche long-tail. Spreadsheet app builders (Glide, AppSheet) don't advertise Flutter code export (search evidence; unverified on their sites).
7. **The Studio runs everywhere:** browser, desktop, Android and iOS (S1–S4).
8. **Model choice across providers** (A7), stated generically.
9. **Version history and project sharing** (V12, V13). Already covered; keep it accurate.

## 6. Open questions for the owner

1. Confirm the free-usage facts: monthly free credits (S7), the daily free-model allowance (A8), and the "3 free chats/day" copy. Which apply to new accounts today?
2. Confirm the export ownership/licensing statement (B8): may the site say "no watermark, you own the exported code"?
3. Which claim in the website's "import custom widgets" copy (V15) maps to a real feature, if any?
4. Is the `flutter-visual-builder-staging` bucket the intended production download origin (S4)?
5. Can a FlutterPilot-owned sample app be published (hosted web URL plus a public repo of its unmodified export) as proof of output?
