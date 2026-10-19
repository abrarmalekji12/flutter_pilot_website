import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as LegacyThemeProvider } from "@mui/styles";
import App from "./App";
import { routes } from "./seo/seo";

global.IntersectionObserver = class IntersectionObserver {
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

jest.mock("./componets/BackgroundNetAnimation", () => () => null);
jest.mock("./utils/loadTemplates", () => jest.fn(() => Promise.resolve([])));

const theme = createTheme();

const renderAt = (path) => {
  window.history.pushState({}, "", path);
  return render(
    <ThemeProvider theme={theme}>
      <LegacyThemeProvider theme={theme}>
        <App />
      </LegacyThemeProvider>
    </ThemeProvider>
  );
};

// Every React route in the SEO registry must render the H1 and head tags the
// prerendered HTML is checked against.
describe.each(routes.filter((route) => route.render === "react"))("$path", (route) => {
  test("renders its registered H1, title, and canonical", async () => {
    renderAt(route.path);
    const heading = await screen.findByRole("heading", { level: 1 }, { timeout: 5000 });
    expect(heading.textContent.replace(/\s+/g, " ").trim()).toBe(route.h1);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(document.title).toBe(route.title);
    expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(`https://flutterpilot.com${route.path}`);
  });
});

test("unknown URLs render the not-found page with noindex and no canonical", async () => {
  renderAt("/definitely-not-a-page/");
  expect(await screen.findByRole("heading", { level: 1, name: /page not found/i }, { timeout: 5000 })).toBeInTheDocument();
  expect(document.querySelector('meta[name="robots"]').getAttribute("content")).toMatch(/noindex/);
  expect(document.querySelector('link[rel="canonical"]')).toBeNull();
});
