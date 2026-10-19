import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as LegacyThemeProvider } from "@mui/styles";
import Template from "./Template";
import loadTemplates from "../../utils/loadTemplates";

jest.mock("../../utils/loadTemplates", () => jest.fn());

const theme = createTheme();

const renderTemplate = () =>
  render(
    <ThemeProvider theme={theme}>
      <LegacyThemeProvider theme={theme}>
        <MemoryRouter>
          <Template />
        </MemoryRouter>
      </LegacyThemeProvider>
    </ThemeProvider>
  );

afterEach(() => {
  delete window.__FLUTTERPILOT_PRERENDER__;
  loadTemplates.mockReset();
});

const expectEditorialContent = () => {
  expect(screen.getByRole("heading", { level: 2, name: /how flutter templates work/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /visual flutter ui builder/i })).toHaveAttribute("href", "/flutter-ui-builder/");
};

test("keeps useful content and offers a retry when the gallery fails to load", async () => {
  loadTemplates.mockRejectedValue(new Error("permission-denied"));
  jest.spyOn(console, "error").mockImplementation(() => {});
  renderTemplate();

  expect(await screen.findByText(/couldn't load right now/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  expectEditorialContent();
  console.error.mockRestore();
});

test("explains an empty gallery instead of showing a bare empty state", async () => {
  loadTemplates.mockResolvedValue([]);
  renderTemplate();

  expect(await screen.findByText(/no templates are published right now/i)).toBeInTheDocument();
  expectEditorialContent();
});

test("renders template cards with crawlable Studio links", async () => {
  loadTemplates.mockResolvedValue([{ id: "ignite", name: "Ignite Fitness", description: "Workout companion", imageURLs: [] }]);
  renderTemplate();

  const cta = await screen.findByRole("link", { name: /get started with the ignite fitness template/i });
  expect(cta).toHaveAttribute("href", "https://studio.flutterpilot.com/template/ignite");
  expect(screen.getByText("1 templates available")).toBeInTheDocument();
});

test("never loads Firebase while prerendering", () => {
  window.__FLUTTERPILOT_PRERENDER__ = true;
  renderTemplate();

  expect(loadTemplates).not.toHaveBeenCalled();
  expect(screen.getByText(/live template gallery loads in your browser/i)).toBeInTheDocument();
  expectEditorialContent();
});
