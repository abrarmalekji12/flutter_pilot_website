// Task-level documentation pages under /docs/. Each statement is checked
// against FlutterPilot Studio's source (flutterpilot-pro); the file noted on
// each article is where to re-check it when the Studio changes. The title,
// H1, description and breadcrumb live in src/seo/routes.json.

const restApi = {
  path: "/docs/rest-api/",
  // Re-check: lib/ui/endpoint_connector/*, lib/ui/home/top_menu_bar.dart,
  // lib/ui/export/code_exporter.dart (apis.dart, dio_client.dart).
  eyebrow: "Docs · Connect data",
  intro:
    "Endpoint Connectors let you describe each request to your API once—its method, URL, headers, arguments, and body—and then use it from any screen or action in your FlutterPilot project. Type endpoints in by hand or import a whole Postman collection, and give each one a mock response so you can design screens without calling the real API.",
  facts: [
    ["Open it", "Integration menu → Endpoint Connectors"],
    ["Methods", "GET, POST, PUT, PATCH, DELETE"],
    ["Import", "Postman collection (JSON)"],
    ["In previews", "Mock responses only"],
  ],
  figure: {
    src: "/endpoint_preview.webp",
    width: 1181,
    height: 880,
    alt: "FlutterPilot Endpoint Connectors panel with Postman upload, arguments, request method, URL, headers, body, and mock response",
    caption: "An endpoint in Endpoint Connectors: method and URL, headers, arguments, body, and a mock response for previews.",
  },
  sections: [
    {
      id: "add-endpoint",
      heading: "Add an endpoint",
      blocks: [
        { p: "Open the Integration menu, choose Endpoint Connectors, and select Add Endpoint. Each endpoint has:" },
        {
          list: [
            "A name. You call the endpoint by this name from widgets, actions, and custom code.",
            "The HTTP method: GET, POST, PUT, PATCH, or DELETE.",
            "The URL.",
            "Headers, such as Content-Type or an Authorization header.",
            "Arguments: typed values the caller passes in each time, such as a user ID or a search term, for the request to use.",
            "A body for requests that send data: raw JSON or form data (multipart, with text fields and files), edited as a simple list of fields or as code.",
          ],
        },
        {
          p: "Values that every endpoint shares, such as a base URL or an API token, belong in Global Variables at the top of the panel, so you change them in one place.",
        },
        {
          note: "Prefer to describe it? Ask the AI Agent (Beta) to create or update an endpoint, then review the result in Endpoint Connectors.",
        },
      ],
    },
    {
      id: "postman",
      heading: "Import a Postman collection",
      blocks: [
        {
          p: "If your API is already in Postman, export the collection as JSON and choose Upload from Postman in Endpoint Connectors. FlutterPilot creates an endpoint for each request in the collection.",
        },
        {
          p: "Check the imported names, headers, and arguments afterwards, and move values that repeat across requests, like the base URL, into Global Variables.",
        },
      ],
    },
    {
      id: "response",
      heading: "Test the request and type the response",
      blocks: [
        {
          p: "Select the send button in the endpoint editor to call the API and see the status, body, headers, or error it really returns. When the endpoint has an output schema, View/Edit Output Schema lets you adjust its typed fields. Those fields are what you pick from when you bind a list or a text widget to the response.",
        },
      ],
    },
    {
      id: "mock",
      heading: "Design with mock responses",
      blocks: [
        {
          p: "Add/Edit Mock Response stores an example response: a status code, a body, and optional headers. During preview, FlutterPilot uses only this mock data and doesn't call the actual API.",
        },
        {
          p: "That means you can design every state of a screen, including errors, before the backend is ready, and previews never use up your API's rate limits.",
        },
      ],
    },
    {
      id: "show-data",
      heading: "Show the response on a screen",
      blocks: [
        { p: "The DataLoaderWidget calls an endpoint and gives you three slots to design:" },
        {
          list: [
            "onLoad, shown when the data arrives. Widgets inside it can read the response through the data variable.",
            "onLoading, shown while the request is in flight, usually with a progress indicator.",
            "onError, shown if the request fails, with the failure available as error.",
          ],
        },
        {
          p: "To show a list, put a ListView.builder inside onLoad, choose the response's list as the items to repeat, and bind the widgets in the item layout to each record's fields.",
        },
      ],
    },
    {
      id: "actions",
      heading: "Call an endpoint from an action",
      blocks: [
        {
          p: "To send data, such as submitting a form, saving a record, or deleting an item, add the Call Endpoint action to a button's action flow. It calls the endpoint and keeps the complete response for later actions in the same flow, so you can show a snackbar, update state, or open another screen depending on the result.",
        },
        { p: "In custom Dart code, endpoints are available on App.apis, with the endpoint's arguments passed as named arguments:" },
        { code: "App.apis.getUser.fetch(id: appState.userId)" },
      ],
    },
    {
      id: "export",
      heading: "When you export or publish",
      blocks: [
        {
          p: "Endpoints are part of the project. The exported Flutter source includes them as Dart code (an apis.dart file and an HTTP client), and Android and web builds use them too. Before you share an app:",
        },
        {
          list: [
            "Keep secrets out of the app. Anything inside a client app, including headers and global variables, can be read by its users. Put secret keys in a backend you control and call that instead.",
            "For a web app, the API must accept cross-origin (CORS) requests from your app's address, because the visitor's browser makes the calls.",
            "Android builds from FlutterPilot include the internet permission automatically.",
          ],
        },
      ],
    },
  ],
  related: [
    ["/flutter-app-builder/", "Flutter app builder guide", "The six-step path from app idea to an exported Flutter project."],
    ["/docs/publish-web-app/", "Publish a web app", "Put your app online at a shareable flutterpilot.com address."],
    ["/docs/#api-endpoints", "API endpoints overview", "Where endpoints fit among actions, state, and data."],
  ],
};

const publishWebApp = {
  path: "/docs/publish-web-app/",
  // Re-check: lib/ui/export/export_build_widget.dart, lib/models/export/export_target.dart,
  // flutterpilot-cloudflare wrangler.hosting.toml, flutterpilot_builder web_export.yml.
  eyebrow: "Docs · Ship",
  intro:
    "FlutterPilot can build your project as a Flutter web app and host it for you at a stable flutterpilot.com address you can share. You can publish updates to the same address, and take the site offline again without deleting your project.",
  facts: [
    ["Open it", "Export & Publish → Export & Deploy → Web"],
    ["Cost", "5 credits per deployment"],
    ["Build time", "Usually 3–4 minutes"],
    ["Address", "your-app-name-app.flutterpilot.com"],
  ],
  sections: [
    {
      id: "before",
      heading: "Before you start",
      blocks: [
        {
          list: [
            "The project needs at least one screen and a main screen, which is the screen the app opens on. The Studio asks you to fix either before it builds.",
            "You need 5 available credits.",
            "Only the project's owner or an admin can publish it.",
          ],
        },
      ],
    },
    {
      id: "steps",
      heading: "Publish the web app",
      blocks: [
        {
          steps: [
            ["Open Export & Publish", "Select the rocket icon in the Studio toolbar."],
            ["Choose Export & Deploy", "Then pick the Web target."],
            ["Check the details", "Confirm the app name, the app version (such as 1.0.0), and the build number. The site address is shown under the app name: a stable address derived from your app name, confirmed after the first deploy."],
            ["Build & Deploy Web App", "The build runs in the cloud and usually takes 3–4 minutes. The panel shows its progress."],
            ["Open or share the link", "When the deployment finishes, the live address appears at the top of the dialog. Copy it or open it from there."],
          ],
        },
        {
          note: "Before a build starts, the Studio checks the project. If something must be fixed first, such as a collection binding that no longer matches its data, it lists what to fix. No deployment starts and no credits are used.",
        },
      ],
    },
    {
      id: "update",
      heading: "Update a live site",
      blocks: [
        {
          p: "Deploy again whenever you change the project. The new build replaces the old one at the same address, and the build history lists each deployment version. Raise the app version or build number so you can tell deployments apart.",
        },
        {
          p: "A project can run one deployment at a time, and an account can run two builds at once across all projects.",
        },
      ],
    },
    {
      id: "unpublish",
      heading: "Take a site offline",
      blocks: [
        {
          p: "Choose Unpublish in Export & Deploy to take the public site offline. Your FlutterPilot project and its build history are kept, and you can publish the site again at any time. You can't unpublish while a deployment is still running.",
        },
      ],
    },
    {
      id: "costs",
      heading: "Costs",
      blocks: [
        {
          list: [
            "Each deployment costs 5 credits.",
            "Cancelling a running deployment costs 1 credit.",
            "If the Studio stops a build before it starts because something needs fixing, no credits are used.",
          ],
        },
      ],
    },
    {
      id: "good-to-know",
      heading: "Good to know",
      blocks: [
        {
          list: [
            "Local collections keep their data on each visitor's own device, so visitors don't see each other's data. For shared data, use Firebase, Supabase, Google Sheets, or your own API.",
            "Your app calls APIs from the visitor's browser, so those APIs must accept cross-origin (CORS) requests from your site's address.",
            "Flutter web apps are made for app-like experiences. For text-heavy pages that need to rank in search engines, a regular website works better.",
          ],
        },
      ],
    },
  ],
  related: [
    ["/docs/android-apk/", "Build an Android APK", "Make an installable Android app from the same project."],
    ["/docs/rest-api/", "Connect a REST API", "Load and send data with Endpoint Connectors."],
    ["/#pricing-and-delivery", "What it costs", "Credits, delivery options, and what isn't built in yet."],
  ],
};

const androidApk = {
  path: "/docs/android-apk/",
  // Re-check: lib/models/export/export_target.dart, lib/ui/export/export_build_widget.dart,
  // flutterpilot_builder build_apk.yaml.
  eyebrow: "Docs · Ship",
  intro:
    "FlutterPilot compiles your project into an installable Android APK on cloud build servers, so you don't need Android Studio or a local Flutter setup. Use it to test your app on a real phone and to share it with testers.",
  facts: [
    ["Open it", "Export & Publish → Export & Deploy → Android"],
    ["Cost", "3 credits per build"],
    ["Build time", "Usually 5–7 minutes"],
    ["Output", "Release-mode APK for testing and sharing"],
  ],
  sections: [
    {
      id: "before",
      heading: "Before you start",
      blocks: [
        {
          list: [
            "The project needs at least one screen and a main screen. The Studio asks you to fix either before it builds.",
            "You need 3 available credits.",
            "The package name, shown under the app name, comes from your project settings.",
          ],
        },
      ],
    },
    {
      id: "steps",
      heading: "Build the APK",
      blocks: [
        {
          steps: [
            ["Open Export & Publish", "Select the rocket icon in the Studio toolbar."],
            ["Choose Export & Deploy", "Then pick the Android target."],
            ["Check the details", "Confirm the app name, the app version (such as 1.0.0), and the version code."],
            ["Generate Android APK", "The build runs on secure cloud infrastructure and usually takes 5–7 minutes. You can close the dialog and come back later."],
            ["Download it", "When the build is done, download the APK from the build list. On an Android device, the Studio opens it for installation."],
          ],
        },
      ],
    },
    {
      id: "install",
      heading: "Install and share it",
      blocks: [
        {
          list: [
            "Open the APK on an Android phone. If Android asks, allow installs from the app you opened it with, such as your browser or file manager.",
            "To share the app, send the APK file to testers. Each person installs it the same way.",
            "Use a higher version code for every build you share, so testers can tell builds apart.",
            "Builds aren't kept for download forever. If an older build is no longer available, export again.",
          ],
        },
        { p: "The build adds Android's internet permission automatically, so API calls work in the installed app." },
      ],
    },
    {
      id: "costs",
      heading: "Costs",
      blocks: [
        {
          list: [
            "Each build costs 3 credits.",
            "Cancelling a running build costs 1.5 credits.",
            "If the Studio stops a build before it starts because something needs fixing, no credits are used.",
          ],
        },
      ],
    },
    {
      id: "google-play",
      heading: "Getting to Google Play",
      blocks: [
        {
          p: "The APK is for testing and sharing. It isn't a Google Play release: Play needs an Android App Bundle (AAB) signed with your own upload key, and FlutterPilot doesn't produce that yet. To publish on Google Play:",
        },
        {
          steps: [
            ["Export the source", "Download the Flutter project from Export & Publish in the web or desktop Studio."],
            ["Build a signed bundle", "Use your own Flutter toolchain and signing key to build an app bundle (flutter build appbundle)."],
            ["Upload it", "Create the app in Google Play Console and upload the bundle there."],
          ],
        },
        {
          note: "For iOS, the Studio's Publish to TestFlight (iOS) guide walks through building the exported project with Xcode on a Mac.",
        },
      ],
    },
  ],
  related: [
    ["/docs/publish-web-app/", "Publish a web app", "Share a live web version of the same project."],
    ["/docs/rest-api/", "Connect a REST API", "Load and send data with Endpoint Connectors."],
    ["/#pricing-and-delivery", "What it costs", "Credits, delivery options, and what isn't built in yet."],
  ],
};

const googleSheets = {
  path: "/docs/google-sheets/",
  // Re-check: lib/ai/doc_sections.dart (_sheetIntegration), lib/ui/home/top_menu_bar.dart,
  // sheet* and sheetsExport* strings in lib/l10n/app_localizations_en.dart, web/index.html (Picker, drive.file).
  eyebrow: "Docs · Connect data (Beta)",
  intro:
    "The Google Sheets integration (Beta) turns a spreadsheet into a data source for your FlutterPilot project. Rows become records your Flutter UI can list, show, add, edit, and delete, and the preview reads real rows from the sheet while you design.",
  facts: [
    ["Open it", "Integration menu → Sheet Integrations"],
    ["Access", "Only the spreadsheets you pick"],
    ["Templates", "List, detail card, and form"],
    ["Status", "Beta"],
  ],
  sections: [
    {
      id: "before",
      heading: "Before you start",
      blocks: [
        {
          list: [
            "Put column names in the first row of the sheet. FlutterPilot reads them as field names, and data that has no header row won't appear.",
            "Use a Google account that can open the spreadsheet.",
          ],
        },
      ],
    },
    {
      id: "connect",
      heading: "Connect a sheet",
      blocks: [
        {
          steps: [
            ["Open Sheet Integrations", "Choose Sheet Integrations from the Integration menu."],
            ["Connect your Google account", "Select Connect Google and finish signing in. FlutterPilot uses Google's file picker, so it can only open the spreadsheets you choose."],
            ["Connect New Sheet", "Pick the spreadsheet and the tab, then review the schema FlutterPilot generates from your columns: each column's name and type."],
            ["Enable it for the project", "Connected sheets are saved to your account, so other projects can reuse them. Turn a sheet on in each project that should use it."],
          ],
        },
      ],
    },
    {
      id: "templates",
      heading: "Insert ready-made screens",
      blocks: [
        {
          p: "Choose Template offers list, detail-card, and form layouts that are already bound to the sheet's columns. Review how the columns map to the template, insert it on the canvas, and then style it like any other screen.",
        },
        {
          p: "While you design, the preview loads real rows from the sheet, so you see your actual data instead of placeholders.",
        },
      ],
    },
    {
      id: "bind",
      heading: "Bind your own widgets",
      blocks: [
        { p: "Templates are optional. You can wire any widget to the sheet with three binding properties:" },
        {
          list: [
            "bindWith on a ListView.builder, Column, or Form names the collection, such as students. A list repeats its item for each row; a form edits one row.",
            "bind on a Text, TextField, or Switch names a field, such as students.name, to show the value or edit it in a form.",
            "action on a button runs a data operation, such as students.save. The available operations are add, edit, save, delete, search, and refresh.",
          ],
        },
        { code: "bindWith: students    bind: students.name    action: students.save" },
      ],
    },
    {
      id: "export",
      heading: "Choose how the exported app reaches the sheet",
      blocks: [
        { p: "When you export a project that uses Google Sheets, you choose how the app talks to the sheet:" },
        {
          list: [
            "FlutterPilot Cloud: recommended. It works straight away with no extra setup.",
            "Standalone (Direct API): the app talks to Google directly, which requires your own Google Cloud project.",
            "No Sheets: leaves the Google Sheets code out of the export.",
          ],
        },
      ],
    },
    {
      id: "manage",
      heading: "Disable, remove, or disconnect",
      blocks: [
        {
          list: [
            "Disable for this project hides the sheet in one project and keeps it connected elsewhere. You can enable it again at any time.",
            "Delete permanently removes the saved sheet connection.",
            "Disconnect Account revokes FlutterPilot's access to your Google Sheets until you reconnect. Your saved sheet integrations and project bindings are kept.",
          ],
        },
        {
          note: "Google Sheets support is in Beta. Sheets suit small datasets and simple apps; for larger or private multi-user data, consider Firebase or Supabase. The privacy policy explains how FlutterPilot handles Google user data.",
        },
      ],
    },
  ],
  related: [
    ["/docs/#sheet-integration", "Sheet integration overview", "Where Google Sheets fits among FlutterPilot's data sources."],
    ["/docs/rest-api/", "Connect a REST API", "Load and send data from your own API with Endpoint Connectors."],
    ["/privacy-policy/", "Privacy policy", "How FlutterPilot handles authorized Google user data."],
  ],
};

const docArticles = [restApi, googleSheets, publishWebApp, androidApk];

export const getDocArticle = (path) => docArticles.find((article) => article.path === path) || null;

export default docArticles;
