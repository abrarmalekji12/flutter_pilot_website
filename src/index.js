import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { preloadRoute } from './pages/AppNav';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider as LegacyThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

// Public pages ship prerendered HTML (see scripts/prerender.js). React renders
// a fresh tree over it instead of hydrating: the same markup appears in a
// single commit, and the prerendered stylesheet snapshot is removed before the
// browser paints, so there is no hydration mismatch to manage.
function RemovePrerenderedStyles() {
  useLayoutEffect(() => {
    document.querySelectorAll('style[data-prerendered-style]').forEach((node) => node.remove());
    document.getElementById('root')?.removeAttribute('data-prerendered');
  }, []);
  return null;
}

function renderApp() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <LegacyThemeProvider theme={theme}>
            <CssBaseline />
            <RemovePrerenderedStyles />
            <App />
          </LegacyThemeProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}

// Render even if the route chunk fails to preload; Suspense then handles it.
preloadRoute(window.location.pathname).then(renderApp, renderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
