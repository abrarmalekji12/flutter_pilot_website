import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import RouteSeo from '../componets/RouteSeo';

const Landing = lazy(() => import('./Landing'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy/PrivacyPolicy'));
const ContactUs = lazy(() => import('./ContactUs/ContactUs'));
const AboutUs = lazy(() => import('./AboutUs/AboutUs'));
const loadTemplate = () => import('./Template/Template');
const loadDocs = () => import('./Docs/Docs');
const Template = lazy(loadTemplate);
const Docs = lazy(loadDocs);
const FlutterUIBuilder = lazy(() => import('./FlutterUIBuilder/FlutterUIBuilder'));
const FlutterFlowAlternative = lazy(() => import('./FlutterFlowAlternative/FlutterFlowAlternative'));
const AIFlutterUIGenerator = lazy(() => import('./AIFlutterUIGenerator/AIFlutterUIGenerator'));
const FlutterAppBuilder = lazy(() => import('./FlutterAppBuilder/FlutterAppBuilder'));
const NotFound = lazy(() => import('./NotFound/NotFound'));

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
  <div style={{ 
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
    const preloadPrimaryRoutes = () => {
      loadTemplate();
      loadDocs();
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
          <Route path="/" element={<Landing />} />
          <Route path="/flutter-ui-builder" element={<FlutterUIBuilder />} />
          <Route path="/flutterflow-alternative" element={<FlutterFlowAlternative />} />
          <Route path="/ai-flutter-ui-generator" element={<AIFlutterUIGenerator />} />
          <Route path="/flutter-app-builder" element={<FlutterAppBuilder />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/template" element={<Template/>}/>
          <Route path="/docs" element={<Docs/>}/>
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
