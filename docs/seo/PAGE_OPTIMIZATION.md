# Page optimization summary

"Before" is production at `6d7b809` (the initial HTML from `scripts/create-route-entrypoints.js`, and the H1 rendered after JavaScript). "After" is this PR. All "after" values come from `src/seo/routes.json` and are enforced by `npm run test:seo`.

**Words in initial HTML** counts words inside `<main>` in the HTML the server sends, before any JavaScript. Before this PR it was 0 on every React route.

Google may rewrite titles and snippets. None of these changes guarantees a ranking or CTR change; see [MEASUREMENT.md](./MEASUREMENT.md) for how to evaluate them.

## How the titles were chosen

- **Keep the leading phrase of titles that already perform.** `Flutter UI Builder with AI…` (query position 4.4, 15% CTR) and the homepage title are unchanged at the front.
- **Make each H1 state the page topic in plain language.** Several H1s were slogans that didn't say what the page is about ("Design Flutter interfaces without losing the code.").
- **Descriptions summarize what is visible on the page.** No claims that aren't on the page or in the docs.
- **No length targets.** Titles are 37–67 characters, descriptions 87–166, as a by-product rather than a goal.

## `/` (homepage)

| | Before | After |
|---|---|---|
| Intent | Brand + AI Flutter app building | unchanged |
| Title | FlutterPilot – AI Flutter App Builder | **unchanged** |
| Description | Build Flutter apps with AI generation, a visual editor, connected data, real-time preview, and exportable Flutter source code. | **unchanged** |
| H1 (text content) | Build a real Flutter MobileDesktopWebMobile app from a prompt—then make every detail yours | Build a real Flutter mobile, desktop, or web app from a prompt—then make every detail yours (same visual design) |
| Words in initial HTML | 0 | 664 |

Substantive changes: added a "Choose where to start" hub with descriptive links to all four guides, templates and docs. "Explore product guide" and "Read the product guide" are now real links. Nothing else was rewritten, because this page has 86% of clicks.

## `/flutter-ui-builder/`

| | Before | After |
|---|---|---|
| Intent | Visual Flutter UI construction | unchanged, made explicit |
| Title | Flutter UI Builder with AI \| FlutterPilot | Flutter UI Builder with AI – Visual Widget Editor \| FlutterPilot |
| Description | Design Flutter interfaces visually, generate layouts with AI, refine widgets, preview changes, and export editable Flutter source code. | Build Flutter screens on a visual canvas with real widgets, edit layout and styles in a property panel, refine with AI, preview on devices, and export Flutter source. |
| H1 | Design Flutter interfaces without losing the code. | A visual Flutter UI builder that works with real widgets |
| Words in initial HTML | 0 (≈809 in the static page before 2026-08-16) | 882 |

Substantive changes: an "What you work with in the editor" section that maps the real Studio screenshot (widget tree, palette, canvas, property panel, toolbar) to each step; a six-step screen-building workflow; a multi-screen canvas screenshot; FAQ on supported widgets and how this page differs from the AI generator; links to the component reference, AI generation and export docs.

## `/ai-flutter-ui-generator/`

| | Before | After |
|---|---|---|
| Intent | Prompt-to-Flutter-UI generation | unchanged |
| Title | AI Flutter UI Generator from Prompts \| FlutterPilot | AI Flutter UI Generator – Prompt to Editable Screens \| FlutterPilot |
| Description | Generate editable Flutter screens from plain-language prompts, refine them visually, connect app behavior, and export Flutter source code. | Generate Flutter screens from a text prompt. See example prompts, what the generated widget structure looks like, and how to refine, connect data, and export it. |
| H1 | Turn a plain-English brief into a working Flutter screen. | AI Flutter UI generator: from a prompt to editable Flutter screens |
| Words in initial HTML | 0 (≈735 before 2026-08-16) | 1,066 |

Substantive changes: three prompt examples (single screen, multi-screen app, data-heavy app) taken from FlutterPilot's own prompt suggestions, each with where to run it, what to check, and follow-up prompts; prompt tips; what generated output is made of; a six-step path from prompt to export; the New Project dialog screenshot; an honest FAQ on whole-app generation (Beta; 2.0 scope) linking the changelog.

## `/flutter-app-builder/`

| | Before | After |
|---|---|---|
| Intent | Building a complete Flutter app | unchanged; now distinct from UI-only pages |
| Title | AI Flutter App Builder with Visual Editing \| FlutterPilot | Flutter App Builder with AI: Screens, Logic, Data \| FlutterPilot |
| Description | Build multi-screen Flutter apps with AI, visual editing, actions, connected data, responsive previews, deployment tools, and source export. | A six-step workflow for building a Flutter app in FlutterPilot: describe the idea, generate screens, add navigation and actions, connect APIs, preview, and export. |
| H1 | Build the screens, logic, and data flow in one Flutter workspace. | Flutter app builder: from app idea to an exported Flutter project |
| Words in initial HTML | 0 (≈767 before 2026-08-16) | 988 |

Substantive changes: the requested six-step workflow (idea, screens, navigation/actions, data/APIs, preview, export), each tied to a documented feature; an Endpoint Connectors section with its real screenshot (Postman import, arguments, headers, mock responses); a worked example mapping the steps onto the attendance app shown in the hero; FAQ on data sources, delivery platforms and continuing outside FlutterPilot; links to the actions, state, API, export and deploy docs.

## `/flutterflow-alternative/`

| | Before | After |
|---|---|---|
| Intent | Evaluating FlutterFlow alternatives | unchanged; comparison is now the core of the page |
| Title | FlutterFlow Alternative with AI and Code Export \| FlutterPilot | FlutterFlow Alternative – FlutterPilot vs FlutterFlow Compared |
| Description | Explore an AI-first FlutterFlow alternative with visual editing, connected app workflows, and an exportable Flutter source project. (A different description was set after JS; see AUDIT C3.) | Compare FlutterPilot and FlutterFlow on AI generation, visual editing, code export, data and API integrations, learning curve, and trade-offs before you switch. |
| H1 | A FlutterFlow alternative built around AI and source ownership. | Looking for a FlutterFlow alternative? See how FlutterPilot compares |
| Words in initial HTML | 0 (≈833 before 2026-08-16) | 1,131 |

Substantive changes:

- **Comparison table**: AI generation, visual editing, custom code, data and APIs, code export, maturity and ecosystem. Every FlutterFlow cell is sourced from FlutterFlow's official docs (seven links shown on the page, checked 2026-10-19), with a non-affiliation note.
- **Trade-offs**: FlutterPilot is newer and smaller; AI project generation is Beta; there is no documented FlutterFlow importer; pricing isn't compared.
- **Practical comparison workflow**: build one representative screen in both tools, through to code export.
- **FAQ**: code export and migration questions.

The pre-August table, which said FlutterFlow had no AI generation, was not reintroduced because it was wrong. **FlutterFlow facts must be re-checked against its docs before each edit.**

The three FlutterFlow-alternative queries rank at positions 10.6–14.2. Better content is the lever there, but ranking movement is not guaranteed.

## `/template/`

| | Before | After |
|---|---|---|
| Title | Flutter App Templates and UI Starters \| FlutterPilot | Flutter App Templates – Editable Starters \| FlutterPilot |
| Description | Browse ready-to-edit Flutter app templates, open a starter in FlutterPilot Studio, and customize its screens, logic, data, and styling. | Start a Flutter app from an editable template in FlutterPilot Studio, then customize screens, styles, actions, and data visually or with AI, and export the source. |
| H1 | Template Library | Flutter app templates you can open and edit in FlutterPilot Studio |
| Words in initial HTML | 0. With Firestore failing, the rendered page showed only "No templates available right now." | 393, regardless of Firestore |

Substantive changes: a four-step explanation of how templates work, what you can edit, the New Project dialog screenshot (showing the real Ignite Fitness and Kyoto Wander templates), and when to choose a template, a prompt or a blank canvas, with contextual links. The live gallery still loads from Firestore in the browser, with a 12-second timeout, an error state with retry, and an empty state. Template "Get Started" buttons are now `<a href>` links.

## `/docs/`

| | Before | After |
|---|---|---|
| Title / description | unchanged | unchanged |
| H1 | Everything in FlutterPilot, mapped clearly. | FlutterPilot documentation, mapped clearly. |
| Words in initial HTML | 0 | 747 |

Added a "Workflow guides and release notes" section linking to the four guides, templates and the changelog. The product guides now link to specific docs anchors (`#ai-generation`, `#api-endpoints`, `#export`…).

## `/docs/changelogs/` (static page)

Added to the sitemap (it was indexable but missing). Added links to templates, the app builder guide, the AI generator guide and the export docs. It is now linked from the footer, the docs page and two guides.

## About, contact, privacy

Metadata unchanged. They now ship prerendered HTML: 157, 8 (the contact page is a form) and 1,189 words.
