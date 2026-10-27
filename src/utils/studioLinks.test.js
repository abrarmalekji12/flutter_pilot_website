import {
  PLAY_STORE_URL,
  campaignForPath,
  openStudioUrl,
  playStoreUrl,
  studioTemplateUrl,
  studioUrl,
} from "./studioLinks";

const withUserAgent = (userAgent, run) => {
  const spy = jest.spyOn(window.navigator, "userAgent", "get").mockReturnValue(userAgent);
  try {
    run();
  } finally {
    spy.mockRestore();
  }
};

test("studioUrl tags the Studio root with the page and placement", () => {
  const url = new URL(studioUrl({ campaign: "home", content: "header" }));
  expect(url.origin + url.pathname).toBe("https://studio.flutterpilot.com/");
  expect(Object.fromEntries(url.searchParams)).toEqual({
    utm_source: "flutterpilot.com",
    utm_medium: "website",
    utm_campaign: "home",
    utm_content: "header",
  });
});

test("studioUrl hands a prompt over intact", () => {
  const url = new URL(studioUrl({ campaign: "home", content: "hero-generate", prompt: "A b&c ✓" }));
  expect(url.searchParams.get("prompt")).toBe("A b&c ✓");
  expect(url.searchParams.get("utm_content")).toBe("hero-generate");
});

test("template deep links carry no query string", () => {
  expect(studioTemplateUrl("ignite")).toBe("https://studio.flutterpilot.com/template/ignite");
  expect(studioTemplateUrl("a b")).toBe("https://studio.flutterpilot.com/template/a%20b");
});

test("playStoreUrl passes UTM tags as the install referrer", () => {
  const url = new URL(playStoreUrl({ campaign: "docs", content: "header" }));
  expect(url.searchParams.get("id")).toBe("com.builder.flutterpilot");
  const referrer = new URLSearchParams(url.searchParams.get("referrer"));
  expect(referrer.get("utm_source")).toBe("flutterpilot.com");
  expect(referrer.get("utm_campaign")).toBe("docs");
  expect(referrer.get("utm_content")).toBe("header");
});

test("openStudioUrl sends Android visitors to the Play Store and others to the web Studio", () => {
  withUserAgent("Mozilla/5.0 (Linux; Android 14)", () => {
    expect(openStudioUrl({ campaign: "home", content: "header" }).startsWith(PLAY_STORE_URL)).toBe(true);
  });
  withUserAgent("Mozilla/5.0 (Macintosh)", () => {
    expect(openStudioUrl({ campaign: "home", content: "header" }).startsWith("https://studio.flutterpilot.com/?")).toBe(true);
  });
});

test("campaignForPath names pages by their route", () => {
  const known = ["/", "/flutter-ui-builder/", "/docs/changelogs/"];
  expect(campaignForPath("/", known)).toBe("home");
  expect(campaignForPath("/flutter-ui-builder", known)).toBe("flutter-ui-builder");
  expect(campaignForPath("/docs/changelogs/", known)).toBe("docs-changelogs");
  expect(campaignForPath("/nope/", known)).toBe("not-found");
});
