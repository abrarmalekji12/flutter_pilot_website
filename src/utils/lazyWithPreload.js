import { lazy } from "react";

// React.lazy() always suspends on first render, even when the chunk is already
// downloaded. That would flash the Suspense fallback over prerendered HTML, so
// once a module has been preloaded we render it directly instead.
export default function lazyWithPreload(factory) {
  let LoadedComponent = null;
  let promise = null;

  const preload = () => {
    if (!promise) {
      promise = factory().then((module) => {
        LoadedComponent = module.default;
        return module;
      });
    }
    return promise;
  };

  const LazyComponent = lazy(preload);

  function PreloadableComponent(props) {
    return LoadedComponent ? <LoadedComponent {...props} /> : <LazyComponent {...props} />;
  }

  PreloadableComponent.preload = preload;
  return PreloadableComponent;
}
