// Single source of truth for route metadata. The same registry drives runtime
// head tags (RouteSeo), the prerendered HTML written at build time, the
// sitemap, and the SEO regression tests in scripts/seo/.
import registry from "./routes.json";

export const SITE_URL = registry.siteUrl;
export const ROBOTS_INDEX =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
export const ROBOTS_NOINDEX = "noindex, follow";

export const routes = registry.routes;

export const absoluteUrl = (path) => `${SITE_URL}${path}`;

export function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return `${pathname.replace(/\/+$/, "")}/`;
}

export function getRoute(pathname) {
  const normalized = normalizePath(pathname);
  return routes.find((route) => route.path === normalized) || null;
}

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: registry.siteName,
  url: `${SITE_URL}/`,
  logo: absoluteUrl(registry.organization.logo),
  sameAs: registry.organization.sameAs,
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: registry.siteName,
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const webPageTypes = {
  collection: "CollectionPage",
  about: "AboutPage",
  contact: "ContactPage",
};

function breadcrumbs(route, canonical) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: route.breadcrumb, item: canonical },
    ],
  };
}

export function buildStructuredData(route) {
  const canonical = absoluteUrl(route.path);

  if (route.schema === "home") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        organization,
        website,
        {
          "@type": "SoftwareApplication",
          name: registry.siteName,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web, Android, iOS, macOS, Windows",
          url: `${SITE_URL}/`,
          description:
            "An AI-assisted visual development environment for building and exporting Flutter applications.",
          screenshot: absoluteUrl(registry.defaultImage.url),
          author: { "@id": `${SITE_URL}/#organization` },
        },
      ],
    };
  }

  const graph = [
    organization,
    website,
    {
      "@type": webPageTypes[route.schema] || "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      ...(route.breadcrumb ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } } : {}),
      ...(route.lastmod ? { dateModified: route.lastmod } : {}),
    },
  ];
  if (route.breadcrumb) graph.push(breadcrumbs(route, canonical));

  return { "@context": "https://schema.org", "@graph": graph };
}

// Everything RouteSeo writes into <head>. Unknown routes get noindex and no
// canonical, so a 404 never points search engines at a URL that doesn't exist.
export function buildHead(pathname) {
  const route = getRoute(pathname);
  const image = (route && route.image) || registry.defaultImage;

  if (!route) {
    return {
      title: registry.notFound.title,
      description: registry.notFound.description,
      robots: ROBOTS_NOINDEX,
      canonical: null,
      image,
      ogType: "website",
      structuredData: null,
    };
  }

  return {
    title: route.title,
    description: route.description,
    robots: route.indexable ? ROBOTS_INDEX : ROBOTS_NOINDEX,
    canonical: absoluteUrl(route.path),
    image,
    ogType: "website",
    structuredData: buildStructuredData(route),
  };
}
