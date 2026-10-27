// Copy for the four product guide pages. Every FlutterPilot capability named
// here is documented on /docs/, in the 2.0.0 changelog, or visible in the
// product screenshots in public/. FlutterFlow statements cite its official
// docs (see `comparison.sources`) and must be re-checked before editing.

const screenshots = {
  editor: {
    src: "/flutterpilot_ss.webp",
    width: 1927,
    height: 953,
    alt: "FlutterPilot Studio editor with a widget tree, widget palette, phone canvas, and property panel",
  },
  screens: {
    src: "/realtime_preview.webp",
    width: 1149,
    height: 748,
    alt: "Login, dashboard, attendance recording, and student list screens of a Flutter app on the FlutterPilot canvas",
  },
  newProject: {
    src: "/ai_generation_feature.webp",
    width: 1024,
    height: 698,
    alt: "FlutterPilot New Project dialog with platform targets, templates, and an AI project prompt",
  },
  endpoints: {
    src: "/endpoint_preview.webp",
    width: 1181,
    height: 880,
    alt: "FlutterPilot Endpoint Connectors panel with Postman upload, arguments, request method, URL, headers, body, and mock response",
  },
};

export const docsLinks = {
  reference: ["/docs/#reference", "Component reference", "Layout, UI, input, and navigation widgets plus supported Dart APIs."],
  ai: ["/docs/#ai-generation", "AI generation", "AI Project Creator, screen and component generation, and revisions."],
  actions: ["/docs/#actions", "Actions & logic", "Navigation, dialogs, conditions, device actions, and custom Dart code."],
  state: ["/docs/#state-management", "State management", "App and page state, persistence, and rebuild modes."],
  data: ["/docs/#data-panel", "Data Panel", "Collection schemas, live rows, and design-time samples."],
  apis: ["/docs/#api-endpoints", "API endpoints", "REST endpoints, Postman import, and loading or error states."],
  export: ["/docs/#export", "Export & Publish", "Flutter project ZIP, Android APK, and build history."],
  deploy: ["/docs/#deploy", "Deploy & host", "Web hosting, Android builds, and iOS and desktop release guides."],
  restApi: ["/docs/rest-api/", "Connect a REST API", "Endpoints, Postman import, mock responses, and DataLoaderWidget states, step by step."],
  sheets: ["/docs/google-sheets/", "Use Google Sheets as a database", "Connect a sheet, insert bound screens, and choose how exports reach it (Beta)."],
  publishWeb: ["/docs/publish-web-app/", "Publish a web app", "Put your app online at a shareable flutterpilot.com address."],
  androidApk: ["/docs/android-apk/", "Build an Android APK", "Build an installable APK in the cloud and share it with testers."],
};

export { CHANGELOG_PATH } from "../seo/seo";

const pages = {
  "flutter-ui-builder": {
    eyebrow: "Visual Flutter UI builder",
    title: "A visual Flutter UI builder that works with real widgets",
    intro:
      "Compose screens from Flutter widgets such as Column, Row, Stack, and ListView.builder, tune every property in a side panel, ask AI to draft or revise a layout, and export the Flutter source when you are ready.",
    heroNote: "Runs in the browser, with desktop and mobile apps also available.",
    media: screenshots.editor,
    mediaLabel: "Visual editor",
    mediaCaption: "Widget tree, widget palette, device canvas, and property panel in one view.",
    problemTitle: "A UI builder should shorten the loop—not hide Flutter.",
    problemText:
      "Hand-writing every container, row, breakpoint, and style is precise but repetitive. Closed visual tools can be fast at first, then become difficult when a screen needs custom behavior. FlutterPilot keeps the visual workflow close to the Flutter project underneath it.",
    outcomes: [
      "Move from an empty canvas to a structured screen faster",
      "Refine spacing, hierarchy, and widget properties visually",
      "Preview layouts across mobile, tablet, and desktop sizes",
      "Continue in FlutterPilot Studio or export the source project",
    ],
    showcase: {
      title: "What you work with in the editor",
      text: "The screenshot above is the FlutterPilot Studio editor. Each area maps to a part of building a Flutter UI:",
      points: [
        ["Widget tree", "The screen's structure—Scaffold, body, Stack, Align, Image, Positioned—so you can select, nest, and reorder widgets."],
        ["Widget palette", "Text, Container, Stack, ListView.builder, Image, Wrap, AppBar, Drawer, Row, Column, Padding, ClipRRect, SingleChildScrollView, and more."],
        ["Device canvas", "A device frame such as iPhone X that shows the selected widget and its size as you edit."],
        ["Property panel", "Width and height, padding, alignment, visibility, animations, text, font, size, weight, and color."],
        ["Toolbar and console", "Code, Run, Preview, and main.dart, plus a console for runtime output."],
      ],
      figure: {
        ...screenshots.screens,
        caption: "Several screens of one app side by side on the canvas, with layout labels such as Vertical Layout and Text Label.",
      },
    },
    workflowTitle: "How to build a Flutter screen visually",
    workflowIntro: "The same steps apply whether you start from a template, an AI draft, or an empty Scaffold.",
    workflow: [
      ["Start the screen", "Add a screen, then begin from a template, an AI prompt, or an empty Scaffold."],
      ["Compose the layout", "Drag Rows, Columns, Stacks, and lists from the palette, nest them in the widget tree, and set spacing and alignment."],
      ["Style the details", "Set text styles, fonts, colors, padding, and visibility in the property panel while the canvas updates."],
      ["Refine with AI", "Ask the AI Agent for a focused change, such as adding a search field above a list, instead of rebuilding by hand."],
      ["Check responsive sizes", "Switch between mobile, tablet, and desktop viewports to see how the layout adapts."],
      ["Export or keep building", "Add actions and data in the same project, or export the Flutter project as a ZIP for your own tooling."],
    ],
    features: [
      ["design", "Visual widget editing", "Work directly with the structure, properties, spacing, and styling of your Flutter interface."],
      ["ai", "AI-assisted iteration", "Ask for a screen, component, or focused change without rebuilding the entire layout by hand."],
      ["device", "Responsive preview", "Check the same screen at mobile, tablet, and desktop dimensions as you refine it."],
      ["layers", "Reusable building blocks", "Turn repeated UI patterns into reusable custom components with their own parameters."],
      ["flow", "Actions and navigation", "Connect taps, conditions, state updates, dialogs, and screen transitions visually."],
      ["code", "Exportable Flutter source", "Keep a path back to a standard Flutter project for custom code and your existing workflow."],
    ],
    fitTitle: "Built for the point where design meets development",
    fitText:
      "Use FlutterPilot when you want the speed of a visual builder but still care about widget structure, custom behavior, and source ownership.",
    fitItems: ["Production Flutter teams", "Fast-moving MVPs", "Design-to-development handoff", "Developers exploring visual workflows"],
    faq: [
      ["Does FlutterPilot generate real Flutter code?", "Yes. Screens are built from Flutter widgets, and Export & Publish produces the complete Flutter project as a ZIP so you can continue in your own development environment."],
      ["Which Flutter widgets can I use?", "The component reference covers layout widgets (Column, Row, Container, Stack, ListView, GridView, Wrap, SafeArea), UI elements, inputs, and navigation widgets such as app bars, tabs, and drawers—more than 130 Flutter widgets in all. You can also save your own reusable custom components."],
      ["Can I use it without AI?", "Yes. AI is one way to create and edit. You can also work visually, start from a template, and make focused changes yourself."],
      ["How is this different from the AI UI generator?", "This page covers building and editing screens by hand on the canvas. The AI Flutter UI generator guide covers producing the first draft from a prompt; both end up in the same editor."],
      ["Can I connect data and actions?", "Yes. The Studio includes actions, state, REST and Postman workflows, and connected data options for building beyond static screens."],
    ],
    docs: ["reference", "ai", "export"],
  },

  "ai-flutter-ui-generator": {
    eyebrow: "Prompt-to-Flutter workflow",
    title: "AI Flutter UI generator: from a prompt to editable Flutter screens",
    intro:
      "Describe a screen or a whole app in plain language. FlutterPilot generates Flutter widget structure you can open in the visual editor, revise with follow-up prompts, connect to data, and export as Flutter source.",
    heroNote: "Generate the starting point, then stay in control of every detail.",
    media: screenshots.newProject,
    mediaLabel: "AI project creator",
    mediaCaption: "Start from a template, or describe the app and choose Mobile, Tablet, Desktop, or Web.",
    problemTitle: "The useful output is not a screenshot. It is a project you can keep shaping.",
    problemText:
      "Generic code generation can leave you cleaning up disconnected snippets. FlutterPilot brings generation into the same workspace where you edit widgets, preview layouts, define behavior, and manage the rest of the app.",
    outcomes: [
      "Generate screens and components from a concise brief",
      "Iterate with follow-up instructions instead of restarting",
      "Inspect and refine the result on a visual canvas",
      "Add navigation, actions, and connected data in context",
    ],
    promptExamples: {
      title: "Example prompts and what to check afterwards",
      text: "Useful prompts name the screen's purpose, its sections, the data it shows, and the visual tone. These prompts come from FlutterPilot's own suggestions.",
      items: [
        {
          scope: "Single screen",
          prompt: "Profile page with avatar, stats, and recent activity",
          where: "Ask the AI Agent inside an open project.",
          checks: [
            "Is the header, the stats row, and the activity list each a separate widget you can select?",
            "Is the activity list built from one repeatable item you can later bind to data?",
          ],
          followUps: ["Add an empty state for when there is no recent activity", "Make the stats row scroll horizontally on small phones"],
        },
        {
          scope: "Multi-screen app",
          prompt:
            "A high-energy workout companion using bold typography and bright distinct colors, featuring a streak-based progress ring and social leaderboard integration.",
          where: "Use the AI project creator in the New Project dialog.",
          checks: [
            "Which screens were created, and does navigation between them match your flow?",
            "Are colors and text styles consistent enough to turn into reusable components?",
          ],
          followUps: ["Add a settings screen reachable from the profile", "Use one shared card component for workouts and leaderboard entries"],
        },
        {
          scope: "Data-heavy app",
          prompt: "Create a finance app with dashboard, transactions list, spending charts, and onboarding flow",
          where: "Use the AI project creator, then connect data in the Data Panel.",
          checks: [
            "Does the transactions list use fields you can map to real data (amount, date, category)?",
            "Is onboarding a separate flow that runs before the dashboard?",
          ],
          followUps: ["Bind the transactions list to a collection", "Show a loading state while transactions are fetched"],
        },
      ],
      tipsTitle: "Prompt tips",
      tips: [
        "Name the screen type and its goal before describing the look.",
        "List the sections in the order they should appear.",
        "Describe the data, not just the style: “transactions with amount, date, and category”.",
        "Mention empty, loading, and error states if they matter.",
        "Keep each follow-up prompt to one change, so revisions stay easy to review.",
      ],
      structureTitle: "What generated output looks like",
      structureText:
        "Generated screens are made of the same Flutter widgets you would place by hand—Scaffold, Column, Row, Stack, ListView, Container, Text, Image—so they appear in the widget tree and property panel like any other screen. That is what makes them editable rather than a flat image.",
    },
    workflowTitle: "From generated screen to exported project",
    workflowIntro: "Generation is the first step. The rest of the workflow happens in the same project.",
    workflow: [
      ["Write the prompt", "Include the purpose, sections, content, interactions, and visual tone."],
      ["Generate", "Use the AI Agent for a screen or component, or the AI project creator for a multi-screen project."],
      ["Inspect the widget tree", "Open the result in the visual editor and check the hierarchy before changing details."],
      ["Refine", "Send focused follow-up prompts, or adjust properties directly where that is faster."],
      ["Connect logic and data", "Add actions, app or page state, collections, Google Sheets, or REST endpoints."],
      ["Export or deploy", "Download the Flutter project as a ZIP, build an Android APK, or publish to the web."],
    ],
    features: [
      ["ai", "Project-aware AI Agent", "Create screens, components, variables, and endpoints with the surrounding project in view. The AI Agent is labelled Beta."],
      ["layers", "Structured output", "Generate editable interface structure that can be refined instead of a flattened image."],
      ["tune", "Targeted revisions", "Ask for focused changes to layout, content, styling, or behavior as the product evolves."],
      ["design", "Visual refinement", "Use direct controls for the details that are faster to tune by eye than describe in a prompt."],
      ["device", "Live responsive checks", "See how generated interfaces adapt across common viewport sizes before you move on."],
      ["code", "Source-code handoff", "Export the Flutter project when you want to continue with local tooling and custom code."],
    ],
    fitTitle: "A faster first draft for people who still care about the final implementation",
    fitText:
      "FlutterPilot is most useful when prompt speed, visual control, and a real Flutter handoff all matter in the same workflow.",
    fitItems: ["New screen exploration", "MVP interface generation", "Rapid product iteration", "AI-assisted Flutter development"],
    faq: [
      ["What should I include in a Flutter UI prompt?", "Describe the screen goal, key sections, content, interaction states, and visual tone. Concrete constraints usually produce a more useful first draft."],
      ["Can I edit the generated result?", "Yes. Generated screens remain editable in the visual Studio, so you can adjust widget properties, layout, actions, and data."],
      ["Can it generate a whole app?", "It generates a starting point. The AI project creator builds multi-screen Starter Apps with list, details, add, edit, and delete flows on local collections. Sign-in, API calls, and custom logic aren't generated for you yet; you add them in the editor, where the AI Agent (labelled Beta) can help. The 2.0.0 changelog explains the current scope."],
      ["Is the result limited to a prototype?", "No. You can continue into navigation, state, integrations, deployment, and Flutter source export from the same project."],
    ],
    docs: ["ai", "actions", "data"],
    changelog: true,
  },

  "flutter-app-builder": {
    eyebrow: "From idea to working Flutter app",
    title: "Flutter app builder: from app idea to an exported Flutter project",
    intro:
      "FlutterPilot covers the whole path of building a Flutter app—screens, navigation, actions, state, data, preview, and delivery—in one project instead of a chain of separate handoffs.",
    heroNote: "Useful for a quick MVP—and designed to keep working as the app grows.",
    media: screenshots.screens,
    mediaLabel: "Multi-screen project",
    mediaCaption: "Login, dashboard, attendance, and student list screens of one app on the canvas.",
    problemTitle: "An app builder needs to handle what happens after the first screen.",
    problemText:
      "A convincing interface is only the beginning. Real products need navigation, state, API calls, reusable components, responsive layouts, and a clean path to delivery. FlutterPilot keeps those parts in the same project instead of turning them into separate handoffs.",
    outcomes: [
      "Create multi-screen project structure with AI or templates",
      "Build and edit interfaces on a visual Flutter canvas",
      "Define actions, state changes, and navigation flows",
      "Connect REST APIs, Postman collections, and data sources",
    ],
    workflowTitle: "Build a Flutter app in six steps",
    workflowIntro: "This is the end-to-end path in FlutterPilot Studio, from a one-line idea to a Flutter project you can open locally.",
    workflow: [
      ["Describe the app idea", "Write a sentence or two about who the app is for and what it does. Use the AI project creator, start from a template, or open a blank project and choose Mobile, Tablet, Desktop, or Web."],
      ["Generate or assemble the first screens", "Let AI create the initial screens and navigation, or build them on the canvas from Flutter widgets. Either way, edit the result in the widget tree and property panel."],
      ["Add navigation and actions", "Attach actions to taps and other events: navigate between screens, open dialogs and bottom sheets, check conditions, update app or page state, or run custom Dart code."],
      ["Connect data and APIs", "Define collections in the Data Panel, connect Google Sheets, Firebase, or Supabase (Beta), or add REST endpoints manually or from a Postman collection. Bind results to lists and forms."],
      ["Preview behavior", "Run the app in the Studio and switch device sizes. Endpoints can return mock responses, so previews don't call your real API."],
      ["Export the Flutter project", "Download the complete Flutter project as a ZIP, request an Android APK, or publish a hosted web app. Type-aware export validation reduces invalid generated Dart."],
    ],
    showcase: {
      title: "Connecting an API without leaving the project",
      text: "The Endpoint Connectors panel is where step four happens for REST data:",
      points: [
        ["Add or import", "Create an endpoint by hand or upload a Postman collection."],
        ["Describe the request", "Set the method, URL, headers, body, and typed arguments, plus global variables shared across endpoints."],
        ["Mock for previews", "Add a mock response; during preview only mock data is used and the actual API is not called."],
        ["Design every state", "Use the response in DataLoaderWidget to design loading, success, and error states visually."],
      ],
      figure: {
        ...screenshots.endpoints,
        caption: "Endpoint Connectors in FlutterPilot Studio, with Postman upload and a mock response for previews.",
      },
    },
    example: {
      title: "Example walkthrough: a student attendance app",
      text: "The screens pictured at the top of this page are a good size for a first project. Here is how the six steps apply to them:",
      steps: [
        ["Screens", "Login, a dashboard of classes, an attendance recording screen, and a searchable student list."],
        ["Actions", "Wire Take Attendance on each class card to open the recording screen, and Save Attendance to store the result and return to the dashboard."],
        ["State", "Use page state to hold each student's Present, Absent, or Late selection until it is saved."],
        ["Data", "Keep students and attendance records in collections, or load them from your REST API through an endpoint."],
        ["Delivery", "Preview the flow on a phone frame, then export the Flutter project or publish it to the web."],
      ],
    },
    features: [
      ["ai", "AI project creation", "Bootstrap screens, navigation, components, variables, and supporting project structure."],
      ["design", "Visual Flutter builder", "Compose and refine the app with Flutter-aware controls and a live visual hierarchy."],
      ["flow", "Actions and state", "Model navigation, conditions, updates, dialogs, and device behavior with visual flows."],
      ["data", "Connected data", "Use REST APIs, Postman collections, or local data, plus Google Sheets, Firebase, and Supabase (Beta)."],
      ["device", "Cross-platform preview", "Review mobile, tablet, and desktop layouts without splitting the work into separate projects."],
      ["code", "Deployment and export", "Share a hosted web build, request an Android APK, or export the Flutter source."],
    ],
    fitTitle: "One workspace for prototyping and product work",
    fitText:
      "Choose FlutterPilot when the team needs to move quickly through UI, behavior, data, and handoff without giving up the underlying Flutter project.",
    fitItems: ["Startup MVPs", "Internal tools", "Client app prototypes", "Production Flutter projects"],
    faq: [
      ["Can FlutterPilot build more than a single screen?", "Yes. It supports multi-screen projects, navigation, actions, state, data connections, and reusable components."],
      ["Which data sources can I use?", "REST endpoints (manual or imported from Postman) and local collections stored on the device, plus Google Sheets, Firebase, and Supabase, which are in Beta."],
      ["Which platforms can I deliver to?", "From the Studio you can publish a hosted web app (5 credits) and build an installable Android APK for testing (3 credits). Google Play and App Store publishing aren't built in yet: export the Flutter project and build store releases with your own Flutter toolchain. The in-app deploy guide covers iOS/TestFlight and desktop releases."],
      ["How do I continue outside FlutterPilot?", "Export the complete Flutter project as a ZIP and open it in your usual editor and Flutter toolchain."],
    ],
    docs: ["restApi", "sheets", "publishWeb", "androidApk", "actions", "export"],
  },

  "flutterflow-alternative": {
    eyebrow: "Comparing Flutter app builders",
    title: "Looking for a FlutterFlow alternative? See how FlutterPilot compares",
    intro:
      "FlutterFlow is an established visual builder for Flutter. FlutterPilot takes a different route: AI generation, a visual editor, and app logic in one Studio, with Flutter source export. Here is how the two compare, and how to test both on a real screen before you switch.",
    heroNote: "FlutterFlow details below come from its official documentation. Check current plans on flutterflow.io.",
    media: screenshots.editor,
    mediaLabel: "FlutterPilot Studio",
    mediaCaption: "A visual workflow with a direct path to the Flutter project underneath.",
    problemTitle: "The right builder is the one that fits how your team will ship and maintain the app.",
    problemText:
      "Visual editors can look similar in a feature checklist. The more important questions are how quickly you can reach a useful first draft, how deeply you can customize it, how data and behavior fit together, and what happens when you need the source outside the platform.",
    outcomes: [
      "Use AI as a project-aware creation and editing partner",
      "Combine visual controls with Flutter and Dart flexibility",
      "Connect app data, actions, state, and navigation",
      "Export the Flutter source and continue in your own workflow",
    ],
    comparison: {
      title: "FlutterPilot and FlutterFlow, side by side",
      text: "Both tools build Flutter apps visually and both use AI. The differences are in approach and maturity, not in a checklist of yes/no features.",
      checkedOn: "October 19, 2026",
      rows: [
        [
          "AI generation",
          "AI project creator for multi-screen Starter Apps, plus a project-aware AI Agent (labelled Beta) that creates and revises screens, components, variables, and endpoints.",
          "Generates pages and components from natural-language prompts and can import a Figma frame; AI coding agents are available from its desktop app.",
        ],
        [
          "Visual editing",
          "Widget tree, widget palette, device canvas, and property panel for Flutter widgets.",
          "Visual editor for composing Flutter widgets with a widget tree and properties panel.",
        ],
        [
          "Custom code",
          "Custom Dart code in action flows, Dart expressions in any property, and reusable custom components.",
          "Custom functions, custom actions, and custom widgets in Dart, with pub.dev package dependencies.",
        ],
        [
          "Data and APIs",
          "REST endpoints (manual or Postman import) with mock responses and local collections, plus Google Sheets with schema inference, Firebase, and Supabase (Beta).",
          "Firebase and Supabase integrations, including built-in Supabase database and authentication actions.",
        ],
        [
          "Code export",
          "Complete Flutter project ZIP from Export & Publish, with export validation. Exporting doesn't use credits.",
          "Code download through the FlutterFlow CLI or the Developer Menu; its documentation lists code download as a paid-plan feature.",
        ],
        [
          "Pricing model",
          "Pay-as-you-go credits with no subscription: AI generation from 1 credit per screen, Android APK builds 3 credits, web publishing 5 credits.",
          "Subscription plans; see its plans and pricing page for current tiers and what each includes.",
        ],
        [
          "Maturity and ecosystem",
          "A younger product: guides on this site and inside the Studio, plus release notes.",
          "An established product with extensive documentation and a community forum.",
        ],
      ],
      sources: [
        ["FlutterFlow: pages and AI generation", "https://docs.flutterflow.io/resources/ui/pages/"],
        ["FlutterFlow: toolbar and AI agent", "https://docs.flutterflow.io/flutterflow-ui/toolbar/"],
        ["FlutterFlow: widgets", "https://docs.flutterflow.io/resources/ui/widgets/"],
        ["FlutterFlow: writing custom code", "https://docs.flutterflow.io/concepts/custom-code/"],
        ["FlutterFlow: Supabase database actions", "https://docs.flutterflow.io/integrations/database/supabase/database-actions/"],
        ["FlutterFlow: exporting code with the CLI", "https://docs.flutterflow.io/flutterflow-cli/exporting/"],
        ["FlutterFlow: plans and pricing", "https://docs.flutterflow.io/accounts-billing/plan-pricing/"],
      ],
      tradeoffsTitle: "Trade-offs to weigh",
      tradeoffs: [
        "FlutterPilot is the newer, smaller product. Expect fewer community answers, tutorials, and third-party examples than FlutterFlow has.",
        "FlutterPilot's AI is still maturing. The AI Agent is labelled Beta, and project generation produces Starter Apps (list, details, add, edit, and delete flows); broader functional app generation is still limited.",
        "This site doesn't document a way to import FlutterFlow projects, so plan to rebuild screens. Figma import or AI generation can speed that up.",
        "Neither tool removes the need to understand Flutter once you customize beyond the editor; both produce Flutter code you will maintain.",
        "FlutterPilot doesn't publish to Google Play or the App Store for you yet. Android builds are installable test APKs, and store releases are built from the exported project with your own Flutter tools. If built-in store publishing is a must, compare that directly.",
      ],
    },
    workflowTitle: "A practical way to compare both tools",
    workflowIntro: "Build the same small slice of your app in each tool. An afternoon of this tells you more than any feature list.",
    workflow: [
      ["Pick one representative screen", "Choose something real, such as a searchable list that opens a details page."],
      ["Build it in both", "Start from the same prompt or Figma frame, then finish the details visually."],
      ["Add one real interaction", "Navigate to the details page with an argument and update some state on the way."],
      ["Connect one data source", "Use your actual REST endpoint or database rather than sample data."],
      ["Check responsive sizes", "Compare the phone, tablet, and desktop layouts each tool produces."],
      ["Export and inspect the code", "Open each exported project locally, run it with your Flutter toolchain, and review the structure with your team."],
    ],
    features: [
      ["ai", "AI-first creation", "Generate and revise project elements with an AI Agent that works with the surrounding app context."],
      ["design", "Visual editing", "Adjust Flutter widget structure and properties while keeping a live preview close at hand."],
      ["code", "Source ownership", "Export the project when you want local control, custom implementation, or your established toolchain."],
      ["data", "Integrated data work", "Create and test endpoints, import Postman collections, and bind results into the interface."],
      ["flow", "Behavior in context", "Keep navigation, state changes, conditions, and dialogs alongside the screens they support."],
      ["device", "Multiple delivery paths", "Preview form factors, deploy a Flutter web build, or continue from exported source."],
    ],
    fitTitle: "A good fit when ownership matters as much as speed",
    fitText:
      "FlutterPilot is worth evaluating if your team wants an AI-assisted visual workflow, expects custom Flutter work, or wants a clear source-code handoff.",
    fitItems: ["Flutter-focused teams", "Code-owning startups", "Custom product workflows", "Teams evaluating visual builders"],
    faq: [
      ["Is FlutterPilot a copy of FlutterFlow?", "No. FlutterPilot takes its own approach, centered on project-aware AI, visual Flutter editing, connected workflows, and source export."],
      ["Can I export my code from FlutterPilot?", "Yes. Export & Publish produces the complete Flutter project as a ZIP that you can open and run with your own Flutter toolchain."],
      ["Can I move a FlutterFlow project into FlutterPilot?", "There is no importer for FlutterFlow projects. Rebuild the screens you need, using Figma import (Beta) or AI generation to speed up the first draft."],
      ["What does moving from FlutterFlow involve?", "Plan it screen by screen: recreate each screen from a prompt, a Figma frame, or a template; reconnect data through REST endpoints, local collections, or Firebase and Supabase (Beta); rebuild actions and navigation in action flows; move custom code into custom Dart actions; then export the project and compare it with your FlutterFlow export before switching."],
      ["How do the pricing models differ?", "FlutterPilot has no subscription: you buy credits for AI generation and cloud builds, and exporting the Flutter project doesn't use credits. FlutterFlow sells subscription plans, and its documentation lists code download as a paid-plan feature. Check both products' current prices before you decide."],
      ["What should I compare before switching tools?", "Test a real screen, a real interaction, one data flow, responsive behavior, reusable components, collaboration needs, and the exported project—not only the demo experience."],
    ],
    docs: ["ai", "restApi", "export"],
    changelog: true,
  },
};

export default pages;
