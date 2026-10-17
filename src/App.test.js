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
  const logoElements = await screen.findAllByAltText(
    /FlutterPilot/i,
    {},
    { timeout: 5000 }
  );
  expect(logoElements.length).toBeGreaterThan(0);
});

test('homepage shows FlutterPilot Family before the partner spotlight and keeps the Studio CTA', async () => {
  render(
    <ThemeProvider theme={theme}>
      <LegacyThemeProvider theme={theme}>
        <App />
      </LegacyThemeProvider>
    </ThemeProvider>
  );
  const familyCta = await screen.findByRole(
    'link',
    { name: /open screenshot studio/i },
    { timeout: 5000 }
  );
  expect(familyCta).toHaveAttribute('href', 'https://screenshot-studio.web.app');

  const partnerCta = screen.getByRole('link', { name: /explore healthsysadmin/i });
  expect(partnerCta).toHaveAttribute('href', 'https://healthsysadmin.com');
  // eslint-disable-next-line no-bitwise
  expect(familyCta.compareDocumentPosition(partnerCta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  expect(screen.getByRole('button', { name: /open flutterpilot studio/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Screenshot Studio' })).toHaveAttribute('href', 'https://screenshot-studio.web.app');
});
