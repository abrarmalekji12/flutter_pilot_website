import { routes, getRoute, buildHead, normalizePath, ROBOTS_NOINDEX } from "./seo";
import registry from "./routes.json";

describe("route registry", () => {
  test("paths are unique canonical trailing-slash paths", () => {
    const paths = routes.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    paths.forEach((path) => expect(path).toMatch(/^\/([a-z0-9-]+\/)*$/));
  });

  test("every route has distinct, non-empty metadata", () => {
    ["title", "description", "h1"].forEach((field) => {
      const values = routes.map((route) => route[field]);
      values.forEach((value) => expect(value && value.trim()).toBeTruthy());
      expect(new Set(values).size).toBe(values.length);
    });
  });

  test("lastmod values are real dates", () => {
    routes.forEach((route) => {
      expect(route.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(route.lastmod))).toBe(false);
    });
  });

  test("render mode is either prerendered React or a static file", () => {
    routes.forEach((route) => expect(["react", "static"]).toContain(route.render));
  });
});

describe("buildHead", () => {
  test("normalizes paths with or without trailing slashes", () => {
    expect(normalizePath("/docs")).toBe("/docs/");
    expect(normalizePath("/docs///")).toBe("/docs/");
    expect(normalizePath("/")).toBe("/");
    expect(getRoute("/flutter-ui-builder").path).toBe("/flutter-ui-builder/");
  });

  test("known routes get a self-referencing canonical and structured data", () => {
    const head = buildHead("/flutterflow-alternative");
    expect(head.canonical).toBe("https://flutterpilot.com/flutterflow-alternative/");
    expect(head.robots).not.toMatch(/noindex/);
    const types = head.structuredData["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "WebPage", "BreadcrumbList"]));
  });

  test("the homepage keeps its SoftwareApplication markup", () => {
    const types = buildHead("/").structuredData["@graph"].map((node) => node["@type"]);
    expect(types).toContain("SoftwareApplication");
  });

  test("unknown routes are noindex with no canonical or structured data", () => {
    const head = buildHead("/no-such-page/");
    expect(head.robots).toBe(ROBOTS_NOINDEX);
    expect(head.canonical).toBeNull();
    expect(head.structuredData).toBeNull();
    expect(head.title).toBe(registry.notFound.title);
  });
});
