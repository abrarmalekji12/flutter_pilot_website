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

const STUDIO_URL = "https://studio.flutterpilot.com";

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

const pages = {
  "flutter-ui-builder": {
    eyebrow: "Visual Flutter development",
    title: "Design Flutter interfaces without losing the code.",
    intro:
      "FlutterPilot gives you a visual canvas for composing real Flutter widgets, an AI copilot for faster first drafts, and an editable project you can take with you.",
    heroNote: "Start in the browser. Export Flutter source when you are ready.",
    mediaLabel: "Visual editor",
    mediaCaption: "Select, style, arrange, and preview widgets in one workspace.",
    problemTitle: "A UI builder should shorten the loop—not hide Flutter.",
    problemText:
      "Hand-writing every container, row, breakpoint, and style is precise but repetitive. Closed visual tools can be fast at first, then become difficult when a screen needs custom behavior. FlutterPilot keeps the visual workflow close to the Flutter project underneath it.",
    outcomes: [
      "Move from an empty canvas to a structured screen faster",
      "Refine spacing, hierarchy, and widget properties visually",
      "Preview layouts across mobile, tablet, and desktop sizes",
      "Continue in FlutterPilot Studio or export the source project",
    ],
    workflow: [
      ["01", "Create the first draft", "Describe the screen, begin from a template, or assemble it visually from Flutter widgets."],
      ["02", "Refine on the canvas", "Adjust layout, styling, content, and responsive behavior while the preview stays in view."],
      ["03", "Connect and continue", "Add actions and data, test the experience, then deploy or export the Flutter project."],
    ],
    features: [
      ["design", "Visual widget editing", "Work directly with the structure, properties, spacing, and styling of your Flutter interface."],
      ["ai", "AI-assisted iteration", "Ask for a screen, component, or focused change without rebuilding the entire layout by hand."],
      ["device", "Responsive preview", "Check the same screen at mobile, tablet, and desktop dimensions as you refine it."],
      ["layers", "Reusable building blocks", "Turn repeated UI patterns into components that stay easier to update and maintain."],
      ["flow", "Actions and navigation", "Connect taps, conditions, state updates, dialogs, and screen transitions visually."],
      ["code", "Exportable Flutter source", "Keep a path back to a standard Flutter project for custom code and your existing workflow."],
    ],
    fitTitle: "Built for the point where design meets development",
    fitText:
      "Use FlutterPilot when you want the speed of a visual builder but still care about widget structure, custom behavior, and source ownership.",
    fitItems: ["Production Flutter teams", "Fast-moving MVPs", "Design-to-development handoff", "Developers exploring visual workflows"],
    faq: [
      ["Does FlutterPilot generate real Flutter code?", "Yes. FlutterPilot works with Flutter projects and supports exporting the source so you can continue in your own development environment."],
      ["Can I use it without AI?", "Yes. AI is one way to create and edit. You can also work visually, start from a template, and make focused changes yourself."],
      ["Can I connect data and actions?", "Yes. The Studio includes actions, state, REST and Postman workflows, and connected data options for building beyond static screens."],
    ],
  },
  "ai-flutter-ui-generator": {
    eyebrow: "Prompt-to-Flutter workflow",
    title: "Turn a plain-English brief into a working Flutter screen.",
    intro:
      "Describe the interface you need. FlutterPilot creates a structured first draft that you can preview, edit visually, connect to data, and export as Flutter source.",
    heroNote: "Generate the starting point, then stay in control of every detail.",
    mediaLabel: "AI generation + visual editing",
    mediaCaption: "Move from a prompt to an editable project—not a disposable mockup.",
    problemTitle: "The useful output is not a screenshot. It is a project you can keep shaping.",
    problemText:
      "Generic code generation can leave you cleaning up disconnected snippets. FlutterPilot brings generation into the same workspace where you edit widgets, preview layouts, define behavior, and manage the rest of the app.",
    outcomes: [
      "Generate screens and components from a concise brief",
      "Iterate with follow-up instructions instead of restarting",
      "Inspect and refine the result on a visual canvas",
      "Add navigation, actions, and connected data in context",
    ],
    workflow: [
      ["01", "Describe the result", "Include the screen purpose, visual direction, key content, and important interactions in your prompt."],
      ["02", "Review the generated UI", "Open the result in the visual Studio, check the hierarchy, and make targeted edits."],
      ["03", "Build past the mockup", "Connect data and actions, test responsive views, and export or deploy the working project."],
    ],
    features: [
      ["ai", "Project-aware copilot", "Create screens, components, variables, and endpoints with the surrounding project in view."],
      ["layers", "Structured output", "Generate editable interface structure that can be refined instead of a flattened image."],
      ["tune", "Targeted revisions", "Ask for focused changes to layout, content, styling, or behavior as the product evolves."],
      ["design", "Visual refinement", "Use direct controls for the details that are faster to tune by eye than describe in a prompt."],
      ["device", "Live responsive checks", "See how generated interfaces adapt across common viewport sizes before you move on."],
      ["code", "Source-code handoff", "Export the Flutter project when you want to continue with local tooling and custom code."],
    ],
    fitTitle: "A faster first draft for people who still care about the final implementation",
    fitText:
      "FlutterPilot is most useful when prompt speed, visual control, and a real Flutter handoff all matter in the same workflow.",
    fitItems: ["New screen exploration", "MVP interface generation", "Rapid product iteration", "AI-assisted Flutter development"],
    faq: [
      ["What should I include in a Flutter UI prompt?", "Describe the screen goal, key sections, content, interaction states, and visual tone. Concrete constraints usually produce a more useful first draft."],
      ["Can I edit the generated result?", "Yes. Generated screens remain editable in the visual Studio, so you can adjust widget properties, layout, actions, and data."],
      ["Is the result limited to a prototype?", "No. You can continue into navigation, state, integrations, deployment, and Flutter source export from the same project."],
    ],
  },
  "flutter-app-builder": {
    eyebrow: "From idea to working Flutter app",
    title: "Build the screens, logic, and data flow in one Flutter workspace.",
    intro:
      "FlutterPilot brings AI generation, visual editing, actions, connected data, previews, deployment, and source export into a single app-building workflow.",
    heroNote: "Useful for a quick MVP—and designed to keep working as the app grows.",
    mediaLabel: "Full app workflow",
    mediaCaption: "Design the interface, wire behavior, connect data, and test the result.",
    problemTitle: "An app builder needs to handle what happens after the first screen.",
    problemText:
      "A convincing interface is only the beginning. Real products need navigation, state, API calls, reusable components, responsive layouts, and a clean path to delivery. FlutterPilot keeps those parts in the same project instead of turning them into separate handoffs.",
    outcomes: [
      "Create multi-screen project structure with AI or templates",
      "Build and edit interfaces on a visual Flutter canvas",
      "Define actions, state changes, and navigation flows",
      "Connect REST APIs, Postman collections, and data sources",
    ],
    workflow: [
      ["01", "Shape the project", "Start with a prompt, template, or blank project and establish the screens and navigation."],
      ["02", "Add real behavior", "Connect UI events to actions, state, conditions, dialogs, endpoints, and project data."],
      ["03", "Test and deliver", "Preview across form factors, share a web deployment, create a build, or export the source."],
    ],
    features: [
      ["ai", "AI project creation", "Bootstrap screens, navigation, components, variables, and supporting project structure."],
      ["design", "Visual Flutter builder", "Compose and refine the app with Flutter-aware controls and a live visual hierarchy."],
      ["flow", "Actions and state", "Model navigation, conditions, updates, dialogs, and device behavior with visual flows."],
      ["data", "Connected data", "Use REST APIs, Postman collections, Firebase, Supabase, Google Sheets, or local data."],
      ["device", "Cross-platform preview", "Review mobile, tablet, and desktop layouts without splitting the work into separate projects."],
      ["code", "Deployment and export", "Share a hosted web build, request supported app builds, or export the Flutter source."],
    ],
    fitTitle: "One workspace for prototyping and product work",
    fitText:
      "Choose FlutterPilot when the team needs to move quickly through UI, behavior, data, and handoff without giving up the underlying Flutter project.",
    fitItems: ["Startup MVPs", "Internal tools", "Client app prototypes", "Production Flutter projects"],
    faq: [
      ["Can FlutterPilot build more than a single screen?", "Yes. It supports multi-screen projects, navigation, actions, state, data connections, and reusable components."],
      ["Which data sources can I use?", "FlutterPilot supports REST and Postman workflows alongside connected data options such as Firebase, Supabase, Google Sheets, and local collections."],
      ["How can I deliver the finished app?", "Depending on your workflow, you can deploy Flutter web, request supported platform builds, or export the complete Flutter source project."],
    ],
  },
  "flutterflow-alternative": {
    eyebrow: "A developer-controlled alternative",
    title: "A FlutterFlow alternative built around AI and source ownership.",
    intro:
      "FlutterPilot is for teams that want visual speed while staying close to Flutter: generate with AI, refine on a canvas, connect app behavior, and export the project.",
    heroNote: "Compare workflows based on what your team needs to own and extend.",
    mediaLabel: "FlutterPilot Studio",
    mediaCaption: "A visual workflow with a direct path to the Flutter project underneath.",
    problemTitle: "The right builder is the one that fits how your team will ship and maintain the app.",
    problemText:
      "Visual editors can look similar in a feature checklist. The more important questions are how quickly you can reach a useful first draft, how deeply you can customize it, how data and behavior fit together, and what happens when you need the source outside the platform.",
    outcomes: [
      "Use AI as a project-aware creation and editing partner",
      "Combine visual controls with Flutter and Dart flexibility",
      "Connect app data, actions, state, and navigation",
      "Export the Flutter source and continue in your own workflow",
    ],
    workflow: [
      ["01", "Test the core workflow", "Rebuild one representative screen, including its responsive states and a real interaction."],
      ["02", "Test the hard parts", "Try custom behavior, data binding, API calls, reusable components, and the team handoff."],
      ["03", "Inspect the exit path", "Export the project and confirm that it fits the way your developers build, review, and maintain Flutter code."],
    ],
    features: [
      ["ai", "AI-first creation", "Generate and revise project elements through a copilot that works with the surrounding app context."],
      ["design", "Visual editing", "Adjust Flutter widget structure and properties while keeping a live preview close at hand."],
      ["code", "Source ownership", "Export the project when you want local control, custom implementation, or your established toolchain."],
      ["data", "Integrated data work", "Create and test endpoints, import Postman collections, and bind results into the interface."],
      ["flow", "Behavior in context", "Keep navigation, state changes, conditions, and dialogs alongside the screens they support."],
      ["device", "Multiple delivery paths", "Preview form factors, deploy a Flutter web build, or continue from exported source."],
    ],
    fitTitle: "A good fit when ownership matters as much as speed",
    fitText:
      "FlutterPilot is worth evaluating if your team wants an AI-assisted visual workflow, expects custom Flutter work, or wants a clear source-code handoff.",
    fitItems: ["Flutter-focused teams", "Code-owning startups", "Custom product workflows", "Teams evaluating visual builders"],
    faq: [
      ["Is FlutterPilot a direct copy of FlutterFlow?", "No. FlutterPilot takes its own approach, centered on project-aware AI, visual Flutter editing, connected workflows, and source export."],
      ["What should I compare before switching tools?", "Test a real screen, a real interaction, one data flow, responsive behavior, reusable components, collaboration needs, and the exported project—not only the demo experience."],
      ["Can I keep working outside FlutterPilot?", "Yes. Source export gives you a path to continue the Flutter project in your own development environment."],
    ],
  },
};

const relatedPages = [
  ["flutter-ui-builder", "Flutter UI Builder", "Design and refine interfaces visually."],
  ["ai-flutter-ui-generator", "AI UI Generator", "Generate editable Flutter screens from prompts."],
  ["flutter-app-builder", "Flutter App Builder", "Build screens, behavior, and data together."],
  ["flutterflow-alternative", "FlutterFlow Alternative", "Explore a code-owning visual workflow."],
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
  screenshot: { width: "100%", aspectRatio: "1927 / 953", objectFit: "cover" },
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
  cta: { display: "grid", gridTemplateColumns: "1fr auto", gap: theme.spacing(4), alignItems: "center", padding: theme.spacing(6), borderRadius: 28, color: "#fff", background: "linear-gradient(135deg,#1d4ed8,#3730a3)", boxShadow: "0 24px 60px rgba(37,99,235,.2)", [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr", padding: theme.spacing(4, 3) } },
  ctaTitle: { margin: 0, fontSize: "clamp(1.75rem,3vw,2.5rem)", lineHeight: 1.15, letterSpacing: "-.03em", fontWeight: 850 },
  ctaText: { margin: theme.spacing(1.2, 0, 0), color: "#dbeafe", lineHeight: 1.65 },
}));

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
              <Button component="a" href={STUDIO_URL} target="_blank" rel="noopener noreferrer" className={classes.primaryButton} endIcon={<ArrowForwardRoundedIcon />}>
                Open FlutterPilot Studio
              </Button>
              <Button component={RouterLink} to="/docs/" className={classes.secondaryButton}>Explore the product guide</Button>
            </div>
            <p className={classes.heroNote}>{page.heroNote}</p>
          </div>
          <div className={classes.productVisual}>
            <div className={classes.browser}>
              <div className={classes.browserBar}><span className={classes.dot} /><span className={classes.dot} /><span className={classes.dot} /></div>
              <img className={classes.screenshot} src="/flutterpilot_ss.webp" alt="FlutterPilot Studio visual Flutter app builder" width="1927" height="953" />
            </div>
            <div className={classes.visualCard}>
              <span className={classes.visualLabel}>{page.mediaLabel}</span>
              <p className={classes.visualCaption}>{page.mediaCaption}</p>
            </div>
          </div>
        </section>

        <nav className={classes.anchorBar} aria-label="On this page">
          <a className={classes.anchor} href="#overview">Overview</a>
          <a className={classes.anchor} href="#workflow">Workflow</a>
          <a className={classes.anchor} href="#features">Capabilities</a>
          <a className={classes.anchor} href="#questions">Questions</a>
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

        <section id="workflow" className={classes.tintedSection}>
          <div className={classes.sectionHead}>
            <span className={classes.kicker}>A practical workflow</span>
            <h2 className={classes.sectionTitle}>From first idea to a Flutter project you can keep.</h2>
            <p className={classes.sectionText}>FlutterPilot keeps generation, visual refinement, app behavior, and handoff in one continuous path.</p>
          </div>
          <div className={classes.workflowGrid}>
            {page.workflow.map(([number, title, description]) => (
              <article className={classes.workflowCard} key={number}>
                <span className={classes.stepNumber}>{number}</span>
                <h3 className={classes.cardTitle}>{title}</h3>
                <p className={classes.cardText}>{description}</p>
              </article>
            ))}
          </div>
        </section>

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

        <section className={classes.section} aria-labelledby="related-pages-title">
          <div className={classes.sectionHead}>
            <span className={classes.kicker}>Explore FlutterPilot</span>
            <h2 id="related-pages-title" className={classes.sectionTitle}>Choose the view that matches your goal.</h2>
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
            <p className={classes.ctaText}>Start in the browser, refine the project visually, and export Flutter source when it is ready for your workflow.</p>
          </div>
          <Button component="a" href={STUDIO_URL} target="_blank" rel="noopener noreferrer" className={classes.primaryButton} endIcon={<RocketLaunchRoundedIcon />}>
            Open Studio
          </Button>
        </section>
      </main>
    </CustomAppBar>
  );
}
