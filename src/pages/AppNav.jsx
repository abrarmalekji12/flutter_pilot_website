import React, { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

const Landing = lazy(() => import('./Landing'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy/PrivacyPolicy'));
const ContactUs = lazy(() => import('./ContactUs/ContactUs'));
const AboutUs = lazy(() => import('./AboutUs/AboutUs'));
const Template = lazy(() => import('./Template/Template'));
const Docs = lazy(() => import('./Docs/Docs'));
const FlutterUIBuilder = lazy(() => import('./FlutterUIBuilder/FlutterUIBuilder'));
const FlutterFlowAlternative = lazy(() => import('./FlutterFlowAlternative/FlutterFlowAlternative'));
const AIFlutterUIGenerator = lazy(() => import('./AIFlutterUIGenerator/AIFlutterUIGenerator'));
const FlutterAppBuilder = lazy(() => import('./FlutterAppBuilder/FlutterAppBuilder'));

const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background: '#f8fafc',
    color: '#1d4ed8',
    fontWeight: 600,
    fontSize: '1.2rem'
  }}>
    Loading...
  </div>
);

export default function AppNav() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/flutter-ui-builder" element={<FlutterUIBuilder />} />
          <Route path="/flutterflow-alternative" element={<FlutterFlowAlternative />} />
          <Route path="/ai-flutter-ui-generator" element={<AIFlutterUIGenerator />} />
          <Route path="/flutter-app-builder" element={<FlutterAppBuilder />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/template" element={<Template/>}/>
          <Route path="/docs" element={<Docs/>}/>
          <Route path="/download" element={<Navigate to="/" replace state={{ scrollTo: "download" }} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
