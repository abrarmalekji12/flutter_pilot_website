import React, { lazy, Suspense, useEffect, useState } from "react";
import AppNav from "./pages/AppNav";
import { isPrerendering } from "./utils/prerender";

const BackgroundNetAnimation = lazy(() => import("./componets/BackgroundNetAnimation"));

function App() {
  const [showBackgroundAnimation, setShowBackgroundAnimation] = useState(false);

  useEffect(() => {
    if (isPrerendering() || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const constrainedDevice = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    if (reduceMotion.matches || constrainedDevice.matches) {
      return undefined;
    }

    let delayId;
    let idleId;
    let cancelled = false;

    const revealBackground = () => {
      if (!cancelled) setShowBackgroundAnimation(true);
    };

    const scheduleBackground = () => {
      delayId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(revealBackground, { timeout: 1500 });
        } else {
          revealBackground();
        }
      }, 3000);
    };

    if (document.readyState === "complete") {
      scheduleBackground();
    } else {
      window.addEventListener("load", scheduleBackground, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleBackground);
      if (delayId) window.clearTimeout(delayId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
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
