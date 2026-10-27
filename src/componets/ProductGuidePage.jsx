import React from "react";
import { Button } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CustomAppBar from "./appbar";
import pages, { docsLinks, CHANGELOG_PATH } from "./productGuideContent";
import { studioUrl } from "../utils/studioLinks";

const iconMap = {
  ai: AutoAwesomeRoundedIcon,
  design: BrushRoundedIcon,
  code: CodeRoundedIcon,
  data: DataObjectRoundedIcon,
  device: DevicesRoundedIcon,
  flow: HubRoundedIcon,
  layers: LayersRoundedIcon,
  tune: TuneRoundedIcon,
};

const relatedPages = [
  ["flutter-ui-builder", "Flutter UI builder", "Design and refine Flutter interfaces visually."],
  ["ai-flutter-ui-generator", "AI Flutter UI generator", "Generate editable Flutter screens from prompts."],
  ["flutter-app-builder", "Flutter app builder", "Build screens, behavior, and data together."],
  ["flutterflow-alternative", "FlutterFlow alternative", "Compare FlutterPilot with FlutterFlow."],
];

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(1280px, 92%)",
    margin: "0 auto",
    padding: theme.spacing(5, 0, 4),
    color: "#0f172a",
    [theme.breakpoints.down("sm")]: { width: "94%", paddingTop: theme.spacing(3) },
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.02fr) minmax(400px, .98fr)",
    gap: theme.spacing(6),
    alignItems: "center",
    minHeight: 570,
    padding: theme.spacing(8, 7),
    borderRadius: 32,
    color: "#fff",
    background: "radial-gradient(circle at 82% 16%, rgba(56,189,248,.25), transparent 32%), radial-gradient(circle at 12% 88%, rgba(99,102,241,.28), transparent 36%), linear-gradient(145deg, #07111f 0%, #0b1b38 55%, #172554 100%)",
    boxShadow: "0 32px 90px rgba(15,23,42,.2)",
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr", minHeight: 0, padding: theme.spacing(6, 4) },
    [theme.breakpoints.down("sm")]: { gap: theme.spacing(4), padding: theme.spacing(4, 2.5), borderRadius: 24 },
  },
  heroCopy: { position: "relative", zIndex: 2 },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 8, marginBottom: theme.spacing(2.5),
    color: "#bfdbfe", fontSize: ".76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.6px",
    "&:before": { content: '""', width: 24, height: 2, borderRadius: 4, background: "#60a5fa" },
  },
  title: {
    margin: 0, maxWidth: 700, fontSize: "clamp(2.55rem, 5.2vw, 4.8rem)", lineHeight: 1.02,
    letterSpacing: "-.055em", fontWeight: 850,
  },
  intro: { margin: theme.spacing(3, 0, 0), maxWidth: 640, color: "#cbd5e1", fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", lineHeight: 1.72 },
  heroActions: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: theme.spacing(4) },
  primaryButton: {
    borderRadius: 13, padding: "13px 22px", background: "#fff", color: "#0f172a", fontWeight: 800, textTransform: "none",
    "&:hover": { background: "#dbeafe", transform: "translateY(-2px)" },
  },
  secondaryButton: {
    borderRadius: 13, padding: "12px 20px", border: "1px solid rgba(255,255,255,.28)", color: "#fff", fontWeight: 750, textTransform: "none",
    "&:hover": { borderColor: "rgba(255,255,255,.55)", background: "rgba(255,255,255,.08)" },
  },
  heroNote: { margin: theme.spacing(2, 0, 0), color: "#94a3b8", fontSize: ".88rem" },
  productVisual: { position: "relative", zIndex: 1, [theme.breakpoints.down("md")]: { maxWidth: 780, width: "100%", margin: "0 auto" } },
  browser: { overflow: "hidden", borderRadius: 18, border: "1px solid rgba(255,255,255,.18)", background: "#e2e8f0", boxShadow: "0 28px 70px rgba(0,0,0,.38)", transform: "rotate(1deg)" },
  browserBar: { height: 34, display: "flex", gap: 6, alignItems: "center", padding: "0 13px", background: "#f8fafc" },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1", "&:first-child": { background: "#fb7185" }, "&:nth-child(2)": { background: "#fbbf24" }, "&:nth-child(3)": { background: "#4ade80" } },
  screenshot: { width: "100%", height: "auto", display: "block" },
  visualCard: { position: "absolute", right: -12, bottom: -34, width: "min(300px, 72%)", padding: theme.spacing(2), borderRadius: 16, color: "#0f172a", background: "rgba(255,255,255,.94)", border: "1px solid rgba(255,255,255,.8)", boxShadow: "0 18px 40px rgba(0,0,0,.25)", backdropFilter: "blur(12px)", [theme.breakpoints.down("sm")]: { right: 8, bottom: -24 } },
  visualLabel: { display: "block", marginBottom: 5, color: "#2563eb", fontSize: ".76rem", fontWeight: 850, textTransform: "uppercase", letterSpacing: ".9px" },
  visualCaption: { margin: 0, fontSize: ".9rem", lineHeight: 1.5, fontWeight: 650 },
  anchorBar: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", margin: theme.spacing(6, 0, 2), padding: theme.spacing(1.2), borderRadius: 16, background: "rgba(255,255,255,.64)", border: "1px solid rgba(148,163,184,.22)", backdropFilter: "blur(12px)" },
  anchor: { padding: "8px 13px", borderRadius: 10, color: "#475569", fontSize: ".88rem", fontWeight: 700, textDecoration: "none", "&:hover": { color: "#1d4ed8", background: "#eff6ff" } },
  section: { padding: theme.spacing(10, 0), [theme.breakpoints.down("sm")]: { padding: theme.spacing(7, 0) } },
  split: { display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: theme.spacing(8), alignItems: "start", [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr", gap: theme.spacing(4) } },
  kicker: { display: "block", marginBottom: theme.spacing(1.5), color: "#2563eb", fontSize: ".76rem", fontWeight: 850, textTransform: "uppercase", letterSpacing: "1.35px" },
  sectionTitle: { margin: 0, fontSize: "clamp(2rem, 3.6vw, 3.2rem)", lineHeight: 1.08, letterSpacing: "-.04em", fontWeight: 850 },
  sectionText: { margin: theme.spacing(2, 0, 0), color: "#475569", fontSize: "1.08rem", lineHeight: 1.75, maxWidth: 680 },
  outcomeList: { display: "grid", gap: 12, margin: 0, padding: 0, listStyle: "none" },
  outcome: { display: "flex", gap: 13, alignItems: "flex-start", padding: theme.spacing(2), borderRadius: 15, background: "rgba(255,255,255,.72)", border: "1px solid rgba(148,163,184,.2)", color: "#334155", fontWeight: 650, lineHeight: 1.55 },
  check: { flex: "0 0 auto", width: 27, height: 27, display: "grid", placeItems: "center", borderRadius: 9, color: "#1d4ed8", background: "#dbeafe", "& svg": { fontSize: 18 } },
  tintedSection: { marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", padding: theme.spacing(10, "max(4%, calc((100vw - 1280px) / 2))"), background: "rgba(255,255,255,.52)", borderTop: "1px solid rgba(148,163,184,.16)", borderBottom: "1px solid rgba(148,163,184,.16)", [theme.breakpoints.down("sm")]: { paddingTop: theme.spacing(7), paddingBottom: theme.spacing(7) } },
  sectionHead: { maxWidth: 760, marginBottom: theme.spacing(5) },
  workflowGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" } },
  workflowCard: { position: "relative", overflow: "hidden", minHeight: 245, padding: theme.spacing(3.5), borderRadius: 22, color: "#e2e8f0", background: "linear-gradient(150deg,#0f172a,#172554)", boxShadow: "0 18px 50px rgba(15,23,42,.13)" },
  stepNumber: { display: "block", marginBottom: theme.spacing(5), color: "#60a5fa", fontSize: ".8rem", fontWeight: 850, letterSpacing: "1.4px" },
  cardTitle: { margin: 0, color: "inherit", fontSize: "1.25rem", lineHeight: 1.3, fontWeight: 800 },
  cardText: { margin: theme.spacing(1.2, 0, 0), color: "#aebbd0", fontSize: ".98rem", lineHeight: 1.65 },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, 1fr)" }, [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" } },
  featureCard: { padding: theme.spacing(3), borderRadius: 20, background: "rgba(255,255,255,.72)", border: "1px solid rgba(148,163,184,.22)", boxShadow: "0 12px 32px rgba(15,23,42,.05)" },
  icon: { width: 42, height: 42, display: "grid", placeItems: "center", marginBottom: theme.spacing(2), borderRadius: 13, color: "#1d4ed8", background: "linear-gradient(135deg,#dbeafe,#eff6ff)", border: "1px solid #bfdbfe", "& svg": { fontSize: 22 } },
  featureText: { margin: theme.spacing(1, 0, 0), color: "#64748b", lineHeight: 1.62 },
  fitPanel: { display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: theme.spacing(6), alignItems: "center", padding: theme.spacing(6), borderRadius: 28, background: "linear-gradient(135deg,#e0f2fe 0%,#eef2ff 55%,#fff 100%)", border: "1px solid rgba(99,102,241,.16)", [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr", padding: theme.spacing(4) }, [theme.breakpoints.down("sm")]: { padding: theme.spacing(3), borderRadius: 22 } },
  fitGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" } },
  fitItem: { padding: theme.spacing(1.6), borderRadius: 13, background: "rgba(255,255,255,.76)", border: "1px solid rgba(99,102,241,.14)", fontWeight: 750, color: "#334155" },
  faqGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" } },
  faqCard: { padding: theme.spacing(3), borderTop: "3px solid #3b82f6", borderRadius: "4px 4px 18px 18px", background: "rgba(255,255,255,.7)", boxShadow: "0 10px 28px rgba(15,23,42,.05)" },
  faqQuestion: { margin: 0, fontSize: "1.08rem", lineHeight: 1.42, fontWeight: 800 },
  faqAnswer: { margin: theme.spacing(1.2, 0, 0), color: "#64748b", lineHeight: 1.65 },
  related: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" } },
  relatedCard: { display: "block", padding: theme.spacing(2.4), borderRadius: 17, color: "#0f172a", textDecoration: "none", background: "rgba(255,255,255,.66)", border: "1px solid rgba(148,163,184,.22)", transition: "transform .2s ease,border-color .2s ease", "&:hover": { transform: "translateY(-3px)", borderColor: "#93c5fd" } },
  relatedTitle: { display: "block", marginBottom: 6, color: "#1d4ed8", fontWeight: 800 },
  relatedText: { color: "#64748b", lineHeight: 1.55 },
  workflowGridWide: { gridTemplateColumns: "repeat(3, 1fr)", [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, 1fr)" }, [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" } },
  showcaseGrid: { display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: theme.spacing(6), alignItems: "start", [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr", gap: theme.spacing(4) } },
  pointList: { display: "grid", gap: 12, margin: theme.spacing(3, 0, 0), padding: 0, listStyle: "none" },
  point: { padding: theme.spacing(1.8, 2), borderRadius: 14, background: "rgba(255,255,255,.72)", border: "1px solid rgba(148,163,184,.2)", color: "#475569", lineHeight: 1.6, "& strong": { display: "block", color: "#0f172a", marginBottom: 2 } },
  figure: { margin: 0, "& img": { width: "100%", height: "auto", display: "block", borderRadius: 18, border: "1px solid rgba(148,163,184,.3)", boxShadow: "0 18px 44px rgba(15,23,42,.1)" } },
  figcaption: { marginTop: theme.spacing(1.2), color: "#64748b", fontSize: ".92rem", lineHeight: 1.55 },
  promptGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" } },
  promptCard: { display: "flex", flexDirection: "column", gap: theme.spacing(1.5), padding: theme.spacing(3), borderRadius: 20, background: "rgba(255,255,255,.78)", border: "1px solid rgba(148,163,184,.22)", boxShadow: "0 12px 32px rgba(15,23,42,.05)" },
  promptScope: { color: "#2563eb", fontSize: ".76rem", fontWeight: 850, textTransform: "uppercase", letterSpacing: "1.2px" },
  promptText: { margin: 0, padding: theme.spacing(1.6, 1.8), borderRadius: 14, color: "#e2e8f0", background: "linear-gradient(150deg,#0f172a,#172554)", fontSize: ".98rem", lineHeight: 1.6, fontWeight: 600 },
  promptLabel: { margin: 0, color: "#0f172a", fontSize: ".9rem", fontWeight: 800 },
  smallList: { margin: 0, paddingLeft: theme.spacing(2.4), color: "#475569", lineHeight: 1.6, "& li": { marginBottom: 4 } },
  tableWrap: { overflowX: "auto", borderRadius: 20, border: "1px solid rgba(148,163,184,.25)", background: "rgba(255,255,255,.8)" },
  table: { width: "100%", minWidth: 680, borderCollapse: "collapse", textAlign: "left", "& th, & td": { padding: theme.spacing(2, 2.2), verticalAlign: "top", borderBottom: "1px solid rgba(148,163,184,.2)", lineHeight: 1.6 }, "& thead th": { color: "#0f172a", background: "rgba(219,234,254,.55)", fontSize: ".9rem", fontWeight: 850 }, "& tbody th": { color: "#0f172a", fontWeight: 800, width: "18%" }, "& td": { color: "#475569" }, "& tbody tr:last-child th, & tbody tr:last-child td": { borderBottom: 0 } },
  sources: { margin: theme.spacing(2, 0, 0), color: "#64748b", fontSize: ".9rem", lineHeight: 1.7, "& a": { color: "#1d4ed8", fontWeight: 650 } },
  tradeoffs: { marginTop: theme.spacing(5), padding: theme.spacing(4), borderRadius: 24, background: "rgba(255,247,237,.8)", border: "1px solid rgba(251,146,60,.25)", [theme.breakpoints.down("sm")]: { padding: theme.spacing(3) } },
  tradeoffTitle: { margin: 0, fontSize: "1.35rem", fontWeight: 850 },
  docsGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: theme.spacing(5), [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" } },
  inlineLink: { color: "#1d4ed8", fontWeight: 700 },
  cta: { display: "grid", gridTemplateColumns: "1fr auto", gap: theme.spacing(4), alignItems: "center", padding: theme.spacing(6), borderRadius: 28, color: "#fff", background: "linear-gradient(135deg,#1d4ed8,#3730a3)", boxShadow: "0 24px 60px rgba(37,99,235,.2)", [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr", padding: theme.spacing(4, 3) } },
  ctaTitle: { margin: 0, fontSize: "clamp(1.75rem,3vw,2.5rem)", lineHeight: 1.15, letterSpacing: "-.03em", fontWeight: 850 },
  ctaText: { margin: theme.spacing(1.2, 0, 0), color: "#dbeafe", lineHeight: 1.65 },
}));

const sectionLinks = [
  ["overview", "Overview", () => true],
  ["comparison", "Comparison", (page) => page.comparison],
  ["workflow", "Workflow", () => true],
  ["prompts", "Prompt examples", (page) => page.promptExamples],
  ["features", "Capabilities", () => true],
  ["questions", "Questions", () => true],
];

function Figure({ figure, classes }) {
  return (
    <figure className={classes.figure}>
      <img src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} loading="lazy" decoding="async" />
      <figcaption className={classes.figcaption}>{figure.caption}</figcaption>
    </figure>
  );
}

export default function ProductGuidePage({ pageKey }) {
  const classes = useStyles();
  const page = pages[pageKey];

  if (!page) return null;

  return (
    <CustomAppBar type={pageKey}>
      <main className={classes.page}>
        <section className={classes.hero} aria-labelledby="product-page-title">
          <div className={classes.heroCopy}>
            <span className={classes.eyebrow}>{page.eyebrow}</span>
            <h1 id="product-page-title" className={classes.title}>{page.title}</h1>
            <p className={classes.intro}>{page.intro}</p>
            <div className={classes.heroActions}>
              <Button component="a" href={studioUrl({ campaign: pageKey, content: "guide-hero" })} target="_blank" rel="noopener noreferrer" className={classes.primaryButton} endIcon={<ArrowForwardRoundedIcon />}>
                Open FlutterPilot Studio
              </Button>
              <Button component={RouterLink} to="/docs/" className={classes.secondaryButton}>Explore the product guide</Button>
            </div>
            <p className={classes.heroNote}>{page.heroNote}</p>
          </div>
          <div className={classes.productVisual}>
            <div className={classes.browser}>
              <div className={classes.browserBar}><span className={classes.dot} /><span className={classes.dot} /><span className={classes.dot} /></div>
              <img className={classes.screenshot} src={page.media.src} alt={page.media.alt} width={page.media.width} height={page.media.height} />
            </div>
            <div className={classes.visualCard}>
              <span className={classes.visualLabel}>{page.mediaLabel}</span>
              <p className={classes.visualCaption}>{page.mediaCaption}</p>
            </div>
          </div>
        </section>

        <nav className={classes.anchorBar} aria-label="On this page">
          {sectionLinks.filter(([, , isShown]) => isShown(page)).map(([id, label]) => (
            <a className={classes.anchor} href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>

        <section id="overview" className={`${classes.section} ${classes.split}`}>
          <div>
            <span className={classes.kicker}>Why it matters</span>
            <h2 className={classes.sectionTitle}>{page.problemTitle}</h2>
            <p className={classes.sectionText}>{page.problemText}</p>
          </div>
          <ul className={classes.outcomeList}>
            {page.outcomes.map((outcome) => (
              <li className={classes.outcome} key={outcome}>
                <span className={classes.check} aria-hidden="true"><CheckRoundedIcon /></span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {page.comparison && (
          <section id="comparison" className={classes.section} aria-labelledby="comparison-title">
            <div className={classes.sectionHead}>
              <span className={classes.kicker}>Side-by-side</span>
              <h2 id="comparison-title" className={classes.sectionTitle}>{page.comparison.title}</h2>
              <p className={classes.sectionText}>{page.comparison.text}</p>
            </div>
            <div className={classes.tableWrap}>
              <table className={classes.table}>
                <caption className="sr-only">FlutterPilot compared with FlutterFlow</caption>
                <thead>
                  <tr>
                    <th scope="col">What to compare</th>
                    <th scope="col">FlutterPilot</th>
                    <th scope="col">FlutterFlow (per its documentation)</th>
                  </tr>
                </thead>
                <tbody>
                  {page.comparison.rows.map(([topic, flutterPilot, flutterFlow]) => (
                    <tr key={topic}>
                      <th scope="row">{topic}</th>
                      <td>{flutterPilot}</td>
                      <td>{flutterFlow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={classes.sources}>
              FlutterFlow sources, checked {page.comparison.checkedOn}:{" "}
              {page.comparison.sources.map(([label, href], index) => (
                <React.Fragment key={href}>
                  {index > 0 && " · "}
                  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                </React.Fragment>
              ))}
              . FlutterFlow is a trademark of its owner; this page is not affiliated with or endorsed by FlutterFlow.
            </p>
            <div className={classes.tradeoffs}>
              <h3 className={classes.tradeoffTitle}>{page.comparison.tradeoffsTitle}</h3>
              <ul className={classes.smallList} style={{ marginTop: 12 }}>
                {page.comparison.tradeoffs.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
        )}

        <section id="workflow" className={classes.tintedSection}>
          <div className={classes.sectionHead}>
            <span className={classes.kicker}>A practical workflow</span>
            <h2 className={classes.sectionTitle}>{page.workflowTitle}</h2>
            <p className={classes.sectionText}>{page.workflowIntro}</p>
          </div>
          <ol className={`${classes.workflowGrid} ${classes.workflowGridWide}`} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {page.workflow.map(([title, description], index) => (
              <li className={classes.workflowCard} key={title}>
                <span className={classes.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={classes.cardTitle}>{title}</h3>
                <p className={classes.cardText}>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        {page.showcase && (
          <section className={`${classes.section} ${classes.showcaseGrid}`} aria-labelledby="showcase-title">
            <div>
              <span className={classes.kicker}>Inside the Studio</span>
              <h2 id="showcase-title" className={classes.sectionTitle}>{page.showcase.title}</h2>
              <p className={classes.sectionText}>{page.showcase.text}</p>
              <ul className={classes.pointList}>
                {page.showcase.points.map(([label, text]) => (
                  <li className={classes.point} key={label}><strong>{label}</strong>{text}</li>
                ))}
              </ul>
            </div>
            <Figure figure={page.showcase.figure} classes={classes} />
          </section>
        )}

        {page.example && (
          <section className={classes.section} aria-labelledby="example-title" style={{ paddingTop: 0 }}>
            <div className={classes.sectionHead}>
              <span className={classes.kicker}>Worked example</span>
              <h2 id="example-title" className={classes.sectionTitle}>{page.example.title}</h2>
              <p className={classes.sectionText}>{page.example.text}</p>
            </div>
            <ul className={classes.pointList}>
              {page.example.steps.map(([label, text]) => (
                <li className={classes.point} key={label}><strong>{label}</strong>{text}</li>
              ))}
            </ul>
          </section>
        )}

        {page.promptExamples && (
          <section id="prompts" className={classes.section} aria-labelledby="prompts-title">
            <div className={classes.sectionHead}>
              <span className={classes.kicker}>Prompt examples</span>
              <h2 id="prompts-title" className={classes.sectionTitle}>{page.promptExamples.title}</h2>
              <p className={classes.sectionText}>{page.promptExamples.text}</p>
            </div>
            <div className={classes.promptGrid}>
              {page.promptExamples.items.map((item) => (
                <article className={classes.promptCard} key={item.prompt}>
                  <span className={classes.promptScope}>{item.scope}</span>
                  <h3 className="sr-only">{item.scope} prompt</h3>
                  <p className={classes.promptText}>“{item.prompt}”</p>
                  <p className={classes.featureText} style={{ margin: 0 }}>{item.where}</p>
                  <p className={classes.promptLabel}>Check the result</p>
                  <ul className={classes.smallList}>{item.checks.map((check) => <li key={check}>{check}</li>)}</ul>
                  <p className={classes.promptLabel}>Follow-up prompts</p>
                  <ul className={classes.smallList}>{item.followUps.map((followUp) => <li key={followUp}>{followUp}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className={classes.split} style={{ marginTop: 48 }}>
              <div>
                <h3 className={classes.tradeoffTitle}>{page.promptExamples.structureTitle}</h3>
                <p className={classes.sectionText}>{page.promptExamples.structureText}</p>
              </div>
              <div>
                <h3 className={classes.tradeoffTitle}>{page.promptExamples.tipsTitle}</h3>
                <ul className={classes.smallList} style={{ marginTop: 16 }}>
                  {page.promptExamples.tips.map((tip) => <li key={tip}>{tip}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section id="features" className={classes.section}>
          <div className={classes.sectionHead}>
            <span className={classes.kicker}>Core capabilities</span>
            <h2 className={classes.sectionTitle}>Tools for the work between a prompt and a shipped app.</h2>
          </div>
          <div className={classes.featureGrid}>
            {page.features.map(([icon, title, description]) => {
              const Icon = iconMap[icon];
              return (
                <article className={classes.featureCard} key={title}>
                  <span className={classes.icon} aria-hidden="true"><Icon /></span>
                  <h3 className={classes.cardTitle}>{title}</h3>
                  <p className={classes.featureText}>{description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={classes.fitPanel}>
          <div>
            <span className={classes.kicker}>Where it fits</span>
            <h2 className={classes.sectionTitle}>{page.fitTitle}</h2>
            <p className={classes.sectionText}>{page.fitText}</p>
          </div>
          <div className={classes.fitGrid}>
            {page.fitItems.map((item) => <div className={classes.fitItem} key={item}>{item}</div>)}
          </div>
        </section>

        <section id="questions" className={classes.section}>
          <div className={classes.sectionHead}>
            <span className={classes.kicker}>Common questions</span>
            <h2 className={classes.sectionTitle}>What to know before you start.</h2>
          </div>
          <div className={classes.faqGrid}>
            {page.faq.map(([question, answer]) => (
              <article className={classes.faqCard} key={question}>
                <h3 className={classes.faqQuestion}>{question}</h3>
                <p className={classes.faqAnswer}>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={classes.section} aria-labelledby="related-pages-title" style={{ paddingTop: 0 }}>
          <div className={classes.sectionHead}>
            <span className={classes.kicker}>Go deeper</span>
            <h2 id="related-pages-title" className={classes.sectionTitle}>Related guides and documentation</h2>
          </div>
          <div className={classes.docsGrid}>
            {page.docs.map((key) => {
              const [to, title, text] = docsLinks[key];
              return (
                <RouterLink className={classes.relatedCard} to={to} key={key}>
                  <span className={classes.relatedTitle}>{title} docs →</span>
                  <span className={classes.relatedText}>{text}</span>
                </RouterLink>
              );
            })}
            {page.changelog && (
              <a className={classes.relatedCard} href={CHANGELOG_PATH}>
                <span className={classes.relatedTitle}>FlutterPilot 2.0.0 changelog →</span>
                <span className={classes.relatedText}>What changed in AI generation, actions, data, and export.</span>
              </a>
            )}
          </div>
          <div className={classes.related}>
            {relatedPages.filter(([key]) => key !== pageKey).map(([key, title, text]) => (
              <RouterLink className={classes.relatedCard} to={`/${key}/`} key={key}>
                <span className={classes.relatedTitle}>{title} →</span>
                <span className={classes.relatedText}>{text}</span>
              </RouterLink>
            ))}
          </div>
        </section>

        <section className={classes.cta}>
          <div>
            <h2 className={classes.ctaTitle}>Build the first version in FlutterPilot Studio.</h2>
            <p className={classes.ctaText}>
              Start in the browser, refine the project visually, and export Flutter source when it is ready for your
              workflow. Prefer a head start? <RouterLink to="/template/" style={{ color: "#fff", fontWeight: 800 }}>Browse Flutter app templates</RouterLink>.
            </p>
          </div>
          <Button component="a" href={studioUrl({ campaign: pageKey, content: "guide-footer" })} target="_blank" rel="noopener noreferrer" className={classes.primaryButton} endIcon={<RocketLaunchRoundedIcon />}>
            Open Studio
          </Button>
        </section>
      </main>
    </CustomAppBar>
  );
}
