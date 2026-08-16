import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://flutterpilot.com";
const SOCIAL_IMAGE = `${SITE_URL}/flutterpilot_ss.webp`;
const DEFAULT_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "FlutterPilot",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    "https://flutterpilot.medium.com",
    "https://play.google.com/store/apps/details?id=com.builder.flutterpilot",
  ],
};

const routeSeo = {
  "/": {
    title: "FlutterPilot – AI Flutter App Builder",
    description:
      "Build Flutter apps with AI generation, a visual editor, connected data, real-time preview, and exportable Flutter source code.",
    type: "website",
    schema: [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "FlutterPilot",
        url: `${SITE_URL}/`,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        name: "FlutterPilot",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web, Android, iOS, macOS, Windows",
        url: `${SITE_URL}/`,
        description:
          "An AI-assisted visual development environment for building and exporting Flutter applications.",
        screenshot: SOCIAL_IMAGE,
        author: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  },
  "/flutter-ui-builder/": {
    title: "Flutter UI Builder with AI | FlutterPilot",
    description:
      "Design Flutter interfaces visually, generate layouts with AI, refine widgets, preview changes, and export editable Flutter code.",
  },
  "/flutterflow-alternative/": {
    title: "FlutterFlow Alternative with AI and Code Export | FlutterPilot",
    description:
      "Explore FlutterPilot as a flexible FlutterFlow alternative with AI generation, visual editing, connected data, and exportable Flutter source.",
  },
  "/ai-flutter-ui-generator/": {
    title: "AI Flutter UI Generator from Prompts | FlutterPilot",
    description:
      "Generate Flutter screens and layouts from plain-language prompts, edit them visually, add logic and data, and export Flutter source code.",
  },
  "/flutter-app-builder/": {
    title: "AI Flutter App Builder with Visual Editing | FlutterPilot",
    description:
      "Build multi-screen Flutter apps with AI, visual editing, API integrations, real-time previews, deployment tools, and source-code export.",
  },
  "/template/": {
    title: "Flutter App Templates and UI Starters | FlutterPilot",
    description:
      "Browse ready-to-edit Flutter app templates, open a starter in FlutterPilot Studio, and customize its screens, logic, data, and styling.",
    schemaType: "CollectionPage",
  },
  "/docs/": {
    title: "FlutterPilot Documentation and Product Guide",
    description:
      "Learn FlutterPilot's AI generation, visual UI, actions, state, connected data, deployment, source export, and component workflows.",
  },
  "/about-us/": {
    title: "About FlutterPilot",
    description:
      "Learn how FlutterPilot combines AI-assisted generation, visual editing, connected data, and Flutter source export for modern app teams.",
    schemaType: "AboutPage",
  },
  "/contact/": {
    title: "Contact FlutterPilot Support",
    description:
      "Contact the FlutterPilot team for product questions, feedback, support, or suggestions.",
    schemaType: "ContactPage",
  },
  "/privacy-policy/": {
    title: "Privacy Policy | FlutterPilot",
    description:
      "Read how FlutterPilot collects, uses, stores, and protects account data and authorized Google user data.",
  },
};

const normalizePath = (pathname) => {
  if (pathname === "/") return "/";
  return `${pathname.replace(/\/+$/, "")}/`;
};

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const buildSchema = (seo, canonical) => ({
  "@context": "https://schema.org",
  "@graph": [
    organization,
    ...(seo.schema || [
      {
        "@type": seo.schemaType || "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ]),
  ],
});

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = normalizePath(pathname);
    const seo = routeSeo[normalizedPath];
    const isKnownRoute = Boolean(seo);
    const currentSeo = seo || {
      title: "Page not found | FlutterPilot",
      description: "The requested FlutterPilot page could not be found.",
    };
    const canonical = `${SITE_URL}${normalizedPath}`;

    document.title = currentSeo.title;
    upsertMeta("name", "title", currentSeo.title);
    upsertMeta("name", "description", currentSeo.description);
    upsertMeta("name", "robots", isKnownRoute ? DEFAULT_ROBOTS : "noindex, nofollow");

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);

    upsertMeta("property", "og:type", currentSeo.type || "website");
    upsertMeta("property", "og:site_name", "FlutterPilot");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:title", currentSeo.title);
    upsertMeta("property", "og:description", currentSeo.description);
    upsertMeta("property", "og:image", SOCIAL_IMAGE);
    upsertMeta("property", "og:image:width", "1927");
    upsertMeta("property", "og:image:height", "953");
    upsertMeta("property", "og:image:alt", "FlutterPilot visual Flutter app builder workspace");
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", currentSeo.title);
    upsertMeta("name", "twitter:description", currentSeo.description);
    upsertMeta("name", "twitter:image", SOCIAL_IMAGE);
    upsertMeta("name", "twitter:image:alt", "FlutterPilot visual Flutter app builder workspace");

    let schemaScript = document.getElementById("route-structured-data");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "route-structured-data";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = isKnownRoute
      ? JSON.stringify(buildSchema(currentSeo, canonical))
      : "";
  }, [pathname]);

  return null;
}
