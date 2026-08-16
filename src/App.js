import React, { lazy, Suspense, useEffect, useState } from "react";
import AppNav from "./pages/AppNav";

const BackgroundNetAnimation = lazy(() => import("./componets/BackgroundNetAnimation"));

function App() {
  const [showBackgroundAnimation, setShowBackgroundAnimation] = useState(false);

  useEffect(() => {
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const revealBackground = () => setShowBackgroundAnimation(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(revealBackground, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(revealBackground, 500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {showBackgroundAnimation && (
        <Suspense fallback={null}>
          <BackgroundNetAnimation />
        </Suspense>
      )}
      <AppNav />
    </>
  );
}

export default App;
