import React, { lazy, Suspense } from "react";
import AppNav from "./pages/AppNav";

const BackgroundNetAnimation = lazy(() => import("./componets/BackgroundNetAnimation"));

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <BackgroundNetAnimation />
      </Suspense>
      <AppNav />
    </>
  );
}

export default App;
