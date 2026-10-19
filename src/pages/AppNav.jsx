import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, matchPath } from 'react-router-dom';
import RouteSeo from '../componets/RouteSeo';
import lazyWithPreload from '../utils/lazyWithPreload';
import { isPrerendering } from '../utils/prerender';

const Landing = lazyWithPreload(() => import('./Landing'));
const PrivacyPolicy = lazyWithPreload(() => import('./PrivacyPolicy/PrivacyPolicy'));
const ContactUs = lazyWithPreload(() => import('./ContactUs/ContactUs'));
const AboutUs = lazyWithPreload(() => import('./AboutUs/AboutUs'));
const Template = lazyWithPreload(() => import('./Template/Template'));
const Docs = lazyWithPreload(() => import('./Docs/Docs'));
const FlutterUIBuilder = lazyWithPreload(() => import('./FlutterUIBuilder/FlutterUIBuilder'));
const FlutterFlowAlternative = lazyWithPreload(() => import('./FlutterFlowAlternative/FlutterFlowAlternative'));
const AIFlutterUIGenerator = lazyWithPreload(() => import('./AIFlutterUIGenerator/AIFlutterUIGenerator'));
const FlutterAppBuilder = lazyWithPreload(() => import('./FlutterAppBuilder/FlutterAppBuilder'));
const NotFound = lazyWithPreload(() => import('./NotFound/NotFound'));

const pageRoutes = [
  { path: '/', Component: Landing },
  { path: '/flutter-ui-builder', Component: FlutterUIBuilder },
  { path: '/flutterflow-alternative', Component: FlutterFlowAlternative },
  { path: '/ai-flutter-ui-generator', Component: AIFlutterUIGenerator },
  { path: '/flutter-app-builder', Component: FlutterAppBuilder },
  { path: '/privacy-policy', Component: PrivacyPolicy },
  { path: '/contact', Component: ContactUs },
  { path: '/about-us', Component: AboutUs },
  { path: '/template', Component: Template },
  { path: '/docs', Component: Docs },
];

// Load the page component for the current URL before the first render, so
// React can replace the prerendered HTML in one commit without a loading flash.
export function preloadRoute(pathname) {
  const match = pageRoutes.find(({ path }) => matchPath({ path, end: true }, pathname));
  return (match ? match.Component : NotFound).preload();
}

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.hash && !navigator.userAgent.includes('jsdom')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return <RouteSeo />;
}

const LoadingFallback = () => (
  <div data-route-loading style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '40vh',
    background: 'transparent',
    color: '#1d4ed8',
    fontWeight: 600,
    fontSize: '0.95rem'
  }}>
    Loading page…
  </div>
);

export default function AppNav() {
  useEffect(() => {
    if (isPrerendering()) return undefined;

    const preloadPrimaryRoutes = () => {
      Template.preload();
      Docs.preload();
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadPrimaryRoutes, { timeout: 2000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(preloadPrimaryRoutes, 300);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <RouteEffects />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {pageRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="/privacyPolicy" element={<Navigate to="/privacy-policy/" replace />} />
          <Route path="/contactUs" element={<Navigate to="/contact/" replace />} />
          <Route path="/aboutUs" element={<Navigate to="/about-us/" replace />} />
          <Route path="/download" element={<Navigate to="/" replace state={{ scrollTo: "download" }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
