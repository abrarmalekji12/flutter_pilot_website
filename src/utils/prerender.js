// The build-time prerenderer (scripts/prerender.js) sets this flag before the
// app boots. Components use it to skip work that must not end up in static
// HTML: network calls (Firebase), randomised or typing animations, canvases.
export const isPrerendering = () =>
  typeof window !== "undefined" && window.__FLUTTERPILOT_PRERENDER__ === true;
