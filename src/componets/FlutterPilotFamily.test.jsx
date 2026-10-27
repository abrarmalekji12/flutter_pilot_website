import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeProvider as LegacyThemeProvider } from "@mui/styles";
import FlutterPilotFamily, { SCREENSHOT_STUDIO_URL } from "./FlutterPilotFamily";
import Footer from "./Footer";

const theme = createTheme();

const renderWithTheme = (ui) =>
  render(
    <ThemeProvider theme={theme}>
      <LegacyThemeProvider theme={theme}>
        <MemoryRouter>{ui}</MemoryRouter>
      </LegacyThemeProvider>
    </ThemeProvider>
  );

describe("FlutterPilotFamily", () => {
  test("uses the exact Screenshot Studio URL", () => {
    expect(SCREENSHOT_STUDIO_URL).toBe("https://screenshot-studio.web.app");
  });

  test("renders a labelled FlutterPilot Family section with the Screenshot Studio card", () => {
    renderWithTheme(<FlutterPilotFamily />);

    const section = screen.getByRole("region", { name: /companion tools beyond the studio/i });
    expect(within(section).getByText("FlutterPilot Family")).toBeInTheDocument();

    const card = within(section).getByRole("article", { name: "Screenshot Studio" });
    expect(within(card).getByRole("heading", { level: 3, name: "Screenshot Studio" })).toBeInTheDocument();
    expect(within(card).getByText(/create polished screenshots and visuals/i)).toBeInTheDocument();
    // Clearly positioned as separate from FlutterPilot Studio.
    expect(section).toHaveTextContent(/separate from FlutterPilot Studio/i);
  });

  test("CTA is a keyboard-focusable link opening Screenshot Studio in a new tab safely", () => {
    renderWithTheme(<FlutterPilotFamily />);

    const cta = screen.getByRole("link", { name: /open screenshot studio \(opens in a new tab\)/i });
    expect(cta).toHaveAttribute("href", "https://screenshot-studio.web.app");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    expect(cta).toHaveTextContent("Open Screenshot Studio");

    cta.focus();
    expect(cta).toHaveFocus();
  });

  test("decorative visuals are hidden from assistive technology", () => {
    const { container } = renderWithTheme(<FlutterPilotFamily />);
    container.querySelectorAll("svg").forEach((icon) => {
      expect(icon.closest('[aria-hidden="true"]')).not.toBeNull();
    });
  });
});

describe("Footer", () => {
  test("links to Screenshot Studio in a new tab and keeps existing product links", () => {
    renderWithTheme(<Footer />);

    const link = screen.getByRole("link", { name: "Screenshot Studio" });
    expect(link).toHaveAttribute("href", "https://screenshot-studio.web.app");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByRole("link", { name: "Web App" }).getAttribute("href")).toMatch(
      /^https:\/\/studio\.flutterpilot\.com\/\?utm_source=flutterpilot\.com&utm_medium=website&utm_campaign=[a-z-]+&utm_content=footer$/
    );
    expect(screen.getByRole("link", { name: "Templates" })).toHaveAttribute("href", "/template/");
  });
});
