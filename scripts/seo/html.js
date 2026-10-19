// Small helpers for reading the HTML the build writes. The prerenderer
// serializes Chromium's DOM, so attributes are always double-quoted.
const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return match ? decode(match[1]) : null;
};

const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];

const stripTags = (html) =>
  decode(
    html
      .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, " ")
      // Inline elements don't separate words; block elements and <br> do.
      .replace(/<\/?(span|a|strong|em|b|i|code|abbr|small)\b[^>]*>/gi, "")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

function metaContent(html, key) {
  const tag = tags(html, "meta").find(
    (candidate) => attribute(candidate, "name") === key || attribute(candidate, "property") === key
  );
  return tag ? attribute(tag, "content") : null;
}

function parsePage(html) {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const canonicalTags = tags(html, "link").filter((tag) => attribute(tag, "rel") === "canonical");
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]));
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (match) => match[1]
  );
  const links = tags(html, "a").map((tag) => attribute(tag, "href")).filter(Boolean);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));

  return {
    title: titleMatch ? decode(titleMatch[1].trim()) : null,
    description: metaContent(html, "description"),
    robots: metaContent(html, "robots"),
    ogUrl: metaContent(html, "og:url"),
    ogTitle: metaContent(html, "og:title"),
    canonicals: canonicalTags.map((tag) => attribute(tag, "href")),
    h1s,
    mainText: mainMatch ? stripTags(mainMatch[1]) : "",
    jsonLd,
    links,
    ids,
  };
}

module.exports = { parsePage, stripTags, attribute, tags, decode };
