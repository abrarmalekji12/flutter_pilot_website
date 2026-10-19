import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, buildHead } from "../seo/seo";

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = buildHead(pathname);
    const imageUrl = `${SITE_URL}${head.image.url}`;

    document.title = head.title;
    upsertMeta("name", "title", head.title);
    upsertMeta("name", "description", head.description);
    upsertMeta("name", "robots", head.robots);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (head.canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", head.canonical);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    upsertMeta("property", "og:type", head.ogType);
    upsertMeta("property", "og:site_name", "FlutterPilot");
    if (head.canonical) {
      upsertMeta("property", "og:url", head.canonical);
    } else {
      document.head.querySelector('meta[property="og:url"]')?.remove();
    }
    upsertMeta("property", "og:title", head.title);
    upsertMeta("property", "og:description", head.description);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:width", String(head.image.width));
    upsertMeta("property", "og:image:height", String(head.image.height));
    upsertMeta("property", "og:image:alt", head.image.alt);
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", head.title);
    upsertMeta("name", "twitter:description", head.description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:image:alt", head.image.alt);

    let schemaScript = document.getElementById("route-structured-data");
    if (head.structuredData) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "route-structured-data";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(head.structuredData);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [pathname]);

  return null;
}
