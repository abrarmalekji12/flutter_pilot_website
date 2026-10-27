import React from "react";
import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CustomAppBar from "../../componets/appbar";
import { getDocArticle } from "../../content/docArticles";
import { getRoute, normalizePath } from "../../seo/seo";
import { studioUrl } from "../../utils/studioLinks";
import useStudioCampaign from "../../utils/useStudioCampaign";
import NotFound from "../NotFound/NotFound";

// Same visual language as the product guides (ProductGuidePage), sized for a
// reading page: a compact hero, then one column of sections.
const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(1120px, 92%)",
    margin: "0 auto",
    padding: theme.spacing(5, 0, 4),
    color: "#0f172a",
    [theme.breakpoints.down("sm")]: { width: "94%", paddingTop: theme.spacing(3) },
  },
  hero: {
    padding: theme.spacing(6, 6, 5),
    borderRadius: 32,
    color: "#fff",
    background: "radial-gradient(circle at 82% 16%, rgba(56,189,248,.25), transparent 32%), radial-gradient(circle at 12% 88%, rgba(99,102,241,.28), transparent 36%), linear-gradient(145deg, #07111f 0%, #0b1b38 55%, #172554 100%)",
    boxShadow: "0 32px 90px rgba(15,23,42,.2)",
    [theme.breakpoints.down("md")]: { padding: theme.spacing(5, 4, 4) },
    [theme.breakpoints.down("sm")]: { padding: theme.spacing(4, 2.5, 3), borderRadius: 24 },
  },
  breadcrumb: {
    display: "flex", flexWrap: "wrap", gap: 8, margin: 0, marginBottom: theme.spacing(2.5), padding: 0, listStyle: "none",
    color: "#94a3b8", fontSize: ".85rem", fontWeight: 650,
    "& li + li:before": { content: '"/"', marginRight: 8, color: "#475569" },
    "& a": { color: "#bfdbfe", textDecoration: "none", "&:hover": { textDecoration: "underline" } },
  },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 8, marginBottom: theme.spacing(2),
    color: "#bfdbfe", fontSize: ".76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px",
    "&:before": { content: '""', width: 24, height: 2, borderRadius: 4, background: "#60a5fa" },
  },
  title: {
    margin: 0, maxWidth: 820, fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)", lineHeight: 1.05,
    letterSpacing: "-.045em", fontWeight: 850,
  },
  intro: { margin: theme.spacing(2.5, 0, 0), maxWidth: 760, color: "#cbd5e1", fontSize: "clamp(1.02rem, 1.6vw, 1.18rem)", lineHeight: 1.72 },
  heroActions: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: theme.spacing(3.5) },
  primaryButton: {
    borderRadius: 13, padding: "12px 20px", background: "#fff", color: "#0f172a", fontWeight: 800, textTransform: "none",
    "&:hover": { background: "#dbeafe", transform: "translateY(-2px)" },
  },
  secondaryButton: {
    borderRadius: 13, padding: "11px 18px", border: "1px solid rgba(255,255,255,.28)", color: "#fff", fontWeight: 750, textTransform: "none",
    "&:hover": { borderColor: "rgba(255,255,255,.55)", background: "rgba(255,255,255,.08)" },
  },
  facts: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, margin: theme.spacing(4, 0, 0), padding: 0,
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, 1fr)" },
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  fact: {
    margin: 0, padding: theme.spacing(1.6, 1.8), borderRadius: 14, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)",
    "& dt": { color: "#93c5fd", fontSize: ".74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" },
    "& dd": { margin: "4px 0 0", color: "#f8fafc", fontWeight: 700, lineHeight: 1.45 },
  },
  updated: { margin: theme.spacing(2.5, 0, 0), color: "#94a3b8", fontSize: ".85rem" },
  figure: {
    margin: theme.spacing(5, 0, 0),
    "& img": { width: "100%", height: "auto", display: "block", borderRadius: 18, border: "1px solid rgba(148,163,184,.3)", boxShadow: "0 18px 44px rgba(15,23,42,.1)" },
  },
  figcaption: { marginTop: theme.spacing(1.2), color: "#64748b", fontSize: ".92rem", lineHeight: 1.55 },
  anchorBar: {
    display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", margin: theme.spacing(5, 0, 1), padding: theme.spacing(1.2),
    borderRadius: 16, background: "rgba(255,255,255,.64)", border: "1px solid rgba(148,163,184,.22)",
  },
  anchor: { padding: "7px 12px", borderRadius: 10, color: "#475569", fontSize: ".86rem", fontWeight: 700, textDecoration: "none", "&:hover": { color: "#1d4ed8", background: "#eff6ff" } },
  section: {
    scrollMarginTop: 96,
    margin: theme.spacing(3, 0, 0), padding: theme.spacing(4), borderRadius: 22,
    background: "rgba(255,255,255,.78)", border: "1px solid rgba(148,163,184,.22)", boxShadow: "0 12px 32px rgba(15,23,42,.05)",
    [theme.breakpoints.down("sm")]: { padding: theme.spacing(3, 2.2) },
  },
  sectionTitle: { margin: 0, fontSize: "clamp(1.45rem, 2.4vw, 1.9rem)", lineHeight: 1.2, letterSpacing: "-.02em", fontWeight: 850 },
  text: { margin: theme.spacing(1.6, 0, 0), color: "#475569", fontSize: "1.03rem", lineHeight: 1.75, maxWidth: 820 },
  list: {
    margin: theme.spacing(1.6, 0, 0), paddingLeft: theme.spacing(2.6), color: "#475569", fontSize: "1.02rem", lineHeight: 1.7, maxWidth: 820,
    "& li": { marginBottom: 6 },
  },
  steps: {
    counterReset: "step", display: "grid", gap: 12, margin: theme.spacing(2, 0, 0), padding: 0, listStyle: "none",
    "& li": {
      counterIncrement: "step", position: "relative", padding: theme.spacing(1.8, 2, 1.8, 6.5), borderRadius: 14,
      background: "#f8fafc", border: "1px solid rgba(148,163,184,.22)", color: "#475569", lineHeight: 1.6,
      "&:before": {
        content: "counter(step)", position: "absolute", left: 16, top: 16, width: 30, height: 30, display: "grid", placeItems: "center",
        borderRadius: 9, color: "#1d4ed8", background: "#dbeafe", fontWeight: 850, fontSize: ".9rem",
      },
      "& strong": { display: "block", color: "#0f172a", marginBottom: 2 },
    },
  },
  note: {
    margin: theme.spacing(2, 0, 0), padding: theme.spacing(1.8, 2.2), borderRadius: 14, color: "#1e3a8a", lineHeight: 1.65,
    background: "linear-gradient(135deg,#e0f2fe 0%,#eef2ff 100%)", border: "1px solid rgba(99,102,241,.18)",
  },
  code: {
    margin: theme.spacing(1.6, 0, 0), padding: theme.spacing(1.6, 1.8), overflowX: "auto", borderRadius: 14, color: "#e2e8f0",
    background: "linear-gradient(150deg,#0f172a,#172554)", fontSize: ".95rem", lineHeight: 1.6,
  },
  relatedSection: { margin: theme.spacing(6, 0, 0) },
  related: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: theme.spacing(2.5), [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" } },
  relatedCard: {
    display: "block", padding: theme.spacing(2.4), borderRadius: 17, color: "#0f172a", textDecoration: "none",
    background: "rgba(255,255,255,.66)", border: "1px solid rgba(148,163,184,.22)", transition: "transform .2s ease,border-color .2s ease",
    "&:hover": { transform: "translateY(-3px)", borderColor: "#93c5fd" },
  },
  relatedTitle: { display: "block", marginBottom: 6, color: "#1d4ed8", fontWeight: 800 },
  relatedText: { color: "#64748b", lineHeight: 1.55 },
  cta: {
    display: "grid", gridTemplateColumns: "1fr auto", gap: theme.spacing(4), alignItems: "center", margin: theme.spacing(6, 0, 0),
    padding: theme.spacing(5), borderRadius: 28, color: "#fff", background: "linear-gradient(135deg,#1d4ed8,#3730a3)",
    boxShadow: "0 24px 60px rgba(37,99,235,.2)",
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr", padding: theme.spacing(4, 3) },
  },
  ctaTitle: { margin: 0, fontSize: "clamp(1.5rem,2.6vw,2.1rem)", lineHeight: 1.15, letterSpacing: "-.03em", fontWeight: 850 },
  ctaText: { margin: theme.spacing(1, 0, 0), color: "#dbeafe", lineHeight: 1.65 },
}));

const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// Hash links within the site stay plain anchors; other site paths use the router.
function SiteLink({ to, className, children }) {
  if (to.includes("#")) return <a className={className} href={to}>{children}</a>;
  return <RouterLink className={className} to={to}>{children}</RouterLink>;
}

function Block({ block, classes }) {
  if (block.p) return <p className={classes.text}>{block.p}</p>;
  if (block.list) return <ul className={classes.list}>{block.list.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.steps) {
    return (
      <ol className={classes.steps}>
        {block.steps.map(([title, text]) => <li key={title}><strong>{title}</strong>{text}</li>)}
      </ol>
    );
  }
  if (block.note) return <p className={classes.note}>{block.note}</p>;
  if (block.code) return <pre className={classes.code}><code>{block.code}</code></pre>;
  return null;
}

export default function DocArticle() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const campaign = useStudioCampaign();
  const path = normalizePath(pathname);
  const article = getDocArticle(path);
  const route = getRoute(path);

  if (!article || !route) return <NotFound />;

  const parent = getRoute(route.parent || "/docs/");

  return (
    <CustomAppBar type="docs">
      <main className={classes.page}>
        <section className={classes.hero} aria-labelledby="doc-title">
          <nav aria-label="Breadcrumb">
            <ol className={classes.breadcrumb}>
              <li><RouterLink to="/">Home</RouterLink></li>
              <li><RouterLink to={parent.path}>{parent.breadcrumb}</RouterLink></li>
              <li aria-current="page">{route.breadcrumb}</li>
            </ol>
          </nav>
          <span className={classes.eyebrow}>{article.eyebrow}</span>
          <h1 id="doc-title" className={classes.title}>{route.h1}</h1>
          <p className={classes.intro}>{article.intro}</p>
          <dl className={classes.facts}>
            {article.facts.map(([label, value]) => (
              <div className={classes.fact} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className={classes.heroActions}>
            <Button
              component="a"
              href={studioUrl({ campaign, content: "doc-hero" })}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.primaryButton}
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Open FlutterPilot Studio
            </Button>
            <Button component={RouterLink} to="/docs/" className={classes.secondaryButton}>
              All documentation
            </Button>
          </div>
          <p className={classes.updated}>Last updated {formatDate(route.lastmod)}</p>
        </section>

        {article.figure && (
          <figure className={classes.figure}>
            <img
              src={article.figure.src}
              alt={article.figure.alt}
              width={article.figure.width}
              height={article.figure.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption className={classes.figcaption}>{article.figure.caption}</figcaption>
          </figure>
        )}

        <nav className={classes.anchorBar} aria-label="On this page">
          {article.sections.map(({ id, heading }) => (
            <a className={classes.anchor} href={`#${id}`} key={id}>{heading}</a>
          ))}
        </nav>

        {article.sections.map(({ id, heading, blocks }) => (
          <section className={classes.section} id={id} key={id} aria-labelledby={`${id}-title`}>
            <h2 id={`${id}-title`} className={classes.sectionTitle}>{heading}</h2>
            {blocks.map((block, index) => <Block block={block} classes={classes} key={index} />)}
          </section>
        ))}

        <section className={classes.relatedSection} aria-labelledby="doc-related-title">
          <h2 id="doc-related-title" className={classes.sectionTitle}>Related guides</h2>
          <div className={classes.related}>
            {article.related.map(([to, title, text]) => (
              <SiteLink className={classes.relatedCard} to={to} key={to}>
                <span className={classes.relatedTitle}>{title}</span>
                <span className={classes.relatedText}>{text}</span>
              </SiteLink>
            ))}
          </div>
        </section>

        <section className={classes.cta}>
          <div>
            <h2 className={classes.ctaTitle}>Try it in FlutterPilot Studio.</h2>
            <p className={classes.ctaText}>
              Open your project, or start a new one from a prompt, and follow these steps in the Studio.
            </p>
          </div>
          <Button
            component="a"
            href={studioUrl({ campaign, content: "doc-footer" })}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.primaryButton}
            endIcon={<RocketLaunchRoundedIcon />}
          >
            Open Studio
          </Button>
        </section>
      </main>
    </CustomAppBar>
  );
}
