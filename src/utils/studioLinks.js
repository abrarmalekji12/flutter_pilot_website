// Every outbound link to FlutterPilot Studio and the app downloads is built
// here, so links stay crawlable <a href>s and Studio's GA4 can attribute
// visits to the website page (utm_campaign) and placement (utm_content).

export const STUDIO_ORIGIN = "https://studio.flutterpilot.com";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.builder.flutterpilot";
export const APP_STORE_URL = "https://apps.apple.com/in/app/ai-app-builder-flutterpilot/id6759552936";
export const MAC_DOWNLOAD_URL =
  "https://storage.googleapis.com/flutter-visual-builder-staging.appspot.com/releases/macos/latest/flutterpilot-macos-latest.dmg";
export const WINDOWS_DOWNLOAD_URL =
  "https://storage.googleapis.com/flutter-visual-builder-staging.appspot.com/releases/windows/latest/flutterpilot-windows-latest.exe";

export const UTM_SOURCE = "flutterpilot.com";
export const UTM_MEDIUM = "website";

export function utmParams({ campaign, content }) {
  return {
    utm_source: UTM_SOURCE,
    utm_medium: UTM_MEDIUM,
    utm_campaign: campaign,
    utm_content: content,
  };
}

// Studio accepts a project-generation `prompt` on its root route
// (flutterpilot-pro lib/routing/startup_route.dart), so the hero can hand the
// visitor's idea over.
export function studioUrl({ campaign, content, prompt }) {
  const params = new URLSearchParams(utmParams({ campaign, content }));
  if (prompt) params.set("prompt", prompt);
  return `${STUDIO_ORIGIN}/?${params.toString()}`;
}

// Template deep links must stay free of query strings: Studio matches
// ^/template/([A-Za-z0-9]+)$ against the whole link, query included
// (flutterpilot-pro lib/route.dart), so a tagged link would not open.
export function studioTemplateUrl(templateId) {
  return `${STUDIO_ORIGIN}/template/${encodeURIComponent(templateId)}`;
}

// Google Play passes `referrer` to the installed app, where Firebase
// Analytics reads it as the install campaign.
export function playStoreUrl({ campaign, content }) {
  const referrer = new URLSearchParams(utmParams({ campaign, content })).toString();
  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;
}

export const isAndroidBrowser = () =>
  typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

// The site's own "Open Studio" button sends Android visitors to the Play
// Store app and everyone else to the web Studio.
export function openStudioUrl({ campaign, content }) {
  return isAndroidBrowser() ? playStoreUrl({ campaign, content }) : studioUrl({ campaign, content });
}

// "/" -> "home", "/flutter-ui-builder/" -> "flutter-ui-builder",
// "/docs/changelogs/" -> "docs-changelogs". Paths that aren't pages of this
// site are reported as "not-found".
export function campaignForPath(pathname, knownPaths) {
  const normalized = !pathname || pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;
  if (knownPaths && !knownPaths.includes(normalized)) return "not-found";
  if (normalized === "/") return "home";
  return normalized.replace(/^\/|\/$/g, "").replace(/\//g, "-");
}
