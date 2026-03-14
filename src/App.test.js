import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as LegacyThemeProvider } from '@mui/styles';
import App from './App';

// Mock IntersectionObserver which is not supported by JSDOM
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Mock heavy canvas component to avoid JSDOM limitations
jest.mock('./componets/BackgroundNetAnimation', () => () => <div data-testid="background-animation" />);

const theme = createTheme();

test('renders FlutterPilot branding', async () => {
  render(
    <ThemeProvider theme={theme}>
      <LegacyThemeProvider theme={theme}>
        <App />
      </LegacyThemeProvider>
    </ThemeProvider>
  );
  const logoElements = await screen.findAllByAltText(/FlutterPilot/i);
  expect(logoElements.length).toBeGreaterThan(0);
});
