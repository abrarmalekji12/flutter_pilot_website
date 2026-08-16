import React, { useMemo, useState } from "react";
import { Button, Chip, Container, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";

const STUDIO_URL = "https://studio.flutterpilot.com";

const docGroups = [
  {
    key: "start",
    navLabel: "Start here",
    eyebrow: "Foundation",
    title: "Know the Studio",
    description: "Start with the workspace, then use the built-in guide or AI when you need contextual help.",
    accent: "#6366f1",
    sections: [
      {
        id: "overview",
        title: "Welcome to FlutterPilot",
        icon: DashboardCustomizeRoundedIcon,
        summary:
          "A rapid visual builder that bridges design and Flutter development with editable UI, live logic, and exportable source code.",
        features: ["AI generation", "Drag-and-drop editor", "Real-time preview", "Flutter source export"],
        code: "Prompt → design → logic → preview → export",
      },
      {
        id: "guide",
        title: "User Guide",
        icon: MenuBookRoundedIcon,
        summary:
          "The Studio includes a searchable, task-based guide with deep links, contextual highlighting, and an Ask AI handoff.",
        features: ["Search across topics", "Deep-linked sections", "Contextual actions", "Ask AI from docs"],
        code: "Search once. Jump directly to the right tool.",
      },
    ],
  },
  {
    key: "build",
    navLabel: "Build",
    eyebrow: "Create",
    title: "Generate interfaces and behavior",
    description: "Move from a project idea to editable screens, working actions, and predictable application state.",
    accent: "#2563eb",
    sections: [
      {
        id: "ai-generation",
        title: "AI Generation",
        icon: AutoAwesomeRoundedIcon,
        summary:
          "Generate full projects, screens, and component trees, then refine them through revision-aware AI editing.",
        features: ["AI Project Creator", "UI & component generation", "Revision-based refinement", "Project-aware AI Copilot"],
        code: '“Profile page with avatar, stats, and recent activity”',
      },
      {
        id: "actions",
        title: "Actions & Logic",
        icon: AccountTreeRoundedIcon,
        summary:
          "Chain navigation, overlays, state changes, data operations, conditions, device features, and custom Dart code.",
        features: ["Navigation & stack", "Dialogs and bottom sheets", "Conditions and loops", "Device and custom actions"],
        code: "onTap → check state → call API → open screen",
      },
      {
        id: "state-management",
        title: "State Management",
        icon: DataObjectRoundedIcon,
        summary:
          "Use app-wide or page-scoped variables, optional persistence, and explicit rebuild modes without wiring boilerplate.",
        features: ["App State", "Page State", "Persistent values", "Current / all / no rebuild"],
        code: "appState.cartCount · pageState.isLoading",
      },
    ],
  },
  {
    key: "connect",
    navLabel: "Connect",
    eyebrow: "Data",
    title: "Connect real data",
    description: "Model, preview, and load data from local collections, spreadsheets, APIs, and cloud backends.",
    accent: "#059669",
    sections: [
      {
        id: "data-panel",
        title: "Data Panel",
        icon: StorageRoundedIcon,
        summary:
          "One workspace for collection schemas, live rows, design-time samples, templates, and AI-assisted data modeling.",
        features: ["Schema Studio", "Live Rows Explorer", "Canvas samples", "AI and ready-made templates"],
        code: "Schema · Rows · Samples",
      },
      {
        id: "sheet-integration",
        title: "Sheet Integration",
        icon: TableChartRoundedIcon,
        summary:
          "Connect Google Sheets, infer a typed schema, insert mapped UI templates, and bind forms or lists to live rows.",
        features: ["Google sign-in and picker", "Schema inference", "Mapped UI templates", "Add / edit / save / delete"],
        code: "bindWith: products · bind: products.title",
      },
      {
        id: "local-data",
        title: "Local Data",
        icon: BoltRoundedIcon,
        summary:
          "Build offline-first experiences with on-device collections, safe schema changes, real rows, and generated samples.",
        features: ["Hive-backed storage", "Automatic migrations", "Live row management", "Offline-first workflows"],
        code: "products.add · products.save · products.refresh",
      },
      {
        id: "api-endpoints",
        title: "API Endpoints",
        icon: ApiRoundedIcon,
        summary:
          "Configure and test REST endpoints manually or from Postman, then design success, loading, and error states visually.",
        features: ["Postman import", "Global variables and headers", "Live request testing", "DataLoaderWidget states"],
        code: "App.apis.getUser.fetch(id: appState.userId)",
      },
    ],
  },
  {
    key: "ship",
    navLabel: "Ship",
    eyebrow: "Release",
    title: "Export, deploy, and monetize",
    description: "Take the project beyond preview with source exports, platform builds, hosted web releases, and mobile ads.",
    accent: "#ea580c",
    sections: [
      {
        id: "export",
        title: "Export & Publish",
        icon: CloudUploadRoundedIcon,
        summary:
          "Open one release workspace for complete Flutter source exports, Android APK generation, and deployment history.",
        features: ["Flutter project ZIP", "Android APK", "Build history", "Export validation"],
        code: "Open Export & Publish → choose target → build",
      },
      {
        id: "deploy",
        title: "Deploy & Host",
        icon: RocketLaunchRoundedIcon,
        summary:
          "Follow platform-specific guidance for hosted web apps, Android builds, iOS/TestFlight, and desktop releases.",
        features: ["Web hosting", "Android cloud builds", "iOS and TestFlight guide", "Desktop release guide"],
        code: "Web · Android · iOS · Desktop",
      },
      {
        id: "monetization",
        title: "Mobile Ads (AdMob)",
        icon: MonetizationOnRoundedIcon,
        summary:
          "Add mobile banner ads with validated AdMob identifiers and export-time configuration handled by FlutterPilot.",
        features: ["Ad component", "Test ID workflow", "Multiple banner sizes", "Android and iOS builds"],
        code: "App ID: ~ · Ad unit ID: /",
      },
    ],
  },
];

const referenceSections = [
  ["Layout", "Structure screens with Column, Row, Container, Stack, ListView, GridView, Wrap, and SafeArea."],
  ["UI Elements", "Text, images, cards, chips, charts, web views, ads, progress indicators, and more."],
  ["Inputs", "Buttons, fields, switches, checkboxes, dropdowns, sliders, pickers, and forms."],
  ["Navigation", "App bars, tabs, drawers, page views, data loaders, conditions, and loops."],
  ["Core Classes", "String, number, boolean, DateTime, dynamic values, and expressions."],
  ["Dart Collections", "List, Map, Set, Iterable, and their supported methods."],
  ["API & Storage", "ApiResponse, SharedPreferences, Firestore, and storage-facing helpers."],
  ["Utilities", "App helpers, Timer, Future, TextEditingController, and common expressions."],
];

const workflow = [
  ["01", "Generate", "Start with a whole project, a screen, or a single component."],
  ["02", "Design", "Arrange widgets visually and refine them with AI or direct controls."],
  ["03", "Connect", "Add state, actions, collections, Sheets, or REST endpoints."],
  ["04", "Ship", "Preview, export source, build Android, or deploy to the web."],
];

const useStyles = makeStyles((theme) => ({
  page: {
    paddingBottom: theme.spacing(3),
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.08fr) minmax(330px, 0.92fr)",
    gap: theme.spacing(5),
    alignItems: "center",
    minHeight: 510,
    padding: theme.spacing(6, 6.5),
    borderRadius: 30,
    color: "#f8fafc",
    background:
      "radial-gradient(circle at 88% 8%, rgba(56,189,248,.23), transparent 34%), radial-gradient(circle at 8% 96%, rgba(99,102,241,.22), transparent 36%), linear-gradient(145deg, #07111f 0%, #0f1f46 54%, #172554 100%)",
    border: "1px solid rgba(147,197,253,.2)",
    boxShadow: "0 32px 82px rgba(15,23,42,.28)",
    isolation: "isolate",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: -1,
      opacity: 0.55,
      backgroundImage:
        "linear-gradient(rgba(148,163,184,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.07) 1px, transparent 1px)",
      backgroundSize: "42px 42px",
      maskImage: "linear-gradient(to bottom, black, transparent 82%)",
      WebkitMaskImage: "linear-gradient(to bottom, black, transparent 82%)",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      minHeight: 0,
      padding: theme.spacing(5, 4),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2.3),
      borderRadius: 22,
      gap: theme.spacing(3.5),
    },
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginBottom: theme.spacing(1.6),
    color: "#7dd3fc",
    fontSize: ".78rem",
    fontWeight: 800,
    letterSpacing: "1.1px",
    textTransform: "uppercase",
  },
  heroTitle: {
    maxWidth: 760,
    margin: 0,
    fontSize: "clamp(2.5rem, 5vw, 4.65rem)",
    lineHeight: 0.98,
    letterSpacing: "-2.8px",
    fontWeight: 850,
    [theme.breakpoints.down("sm")]: {
      letterSpacing: "-1.5px",
    },
  },
  heroAccent: {
    color: "#93c5fd",
  },
  heroLead: {
    maxWidth: 690,
    margin: theme.spacing(2.2, 0, 0),
    color: "#cbd5e1",
    fontSize: "1.05rem",
    lineHeight: 1.75,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1.2),
    marginTop: theme.spacing(2.8),
  },
  primaryButton: {
    borderRadius: "13px !important",
    padding: "11px 19px !important",
    color: "#0f172a !important",
    background: "#f8fafc !important",
    fontWeight: "800 !important",
    textTransform: "none !important",
    boxShadow: "0 12px 26px rgba(2,6,23,.24)",
    "&:hover": {
      background: "#dbeafe !important",
      transform: "translateY(-2px)",
    },
  },
  secondaryButton: {
    borderRadius: "13px !important",
    padding: "10px 18px !important",
    color: "#dbeafe !important",
    border: "1px solid rgba(191,219,254,.28) !important",
    fontWeight: "750 !important",
    textTransform: "none !important",
    "&:hover": {
      background: "rgba(59,130,246,.14) !important",
    },
  },
  search: {
    width: "100%",
    maxWidth: 660,
    marginTop: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      color: "#0f172a",
      borderRadius: 15,
      background: "rgba(255,255,255,.94)",
      boxShadow: "0 12px 34px rgba(2,6,23,.18)",
      "& fieldset": { borderColor: "rgba(191,219,254,.3)" },
      "&:hover fieldset": { borderColor: "rgba(125,211,252,.75)" },
      "&.Mui-focused fieldset": { borderColor: "#60a5fa", borderWidth: 1 },
    },
    "& input": { paddingTop: 14, paddingBottom: 14, fontSize: ".94rem" },
  },
  heroVisual: {
    position: "relative",
    padding: theme.spacing(1.1),
    borderRadius: 22,
    background: "rgba(255,255,255,.1)",
    border: "1px solid rgba(191,219,254,.2)",
    boxShadow: "0 26px 58px rgba(2,6,23,.3)",
    transform: "rotate(1.2deg)",
    [theme.breakpoints.down("md")]: {
      maxWidth: 720,
      transform: "none",
    },
  },
  window: {
    overflow: "hidden",
    borderRadius: 15,
    background: "#f8fafc",
  },
  windowBar: {
    height: 34,
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "0 13px",
    background: "#e2e8f0",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#94a3b8",
  },
  heroImage: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    objectPosition: "center top",
  },
  visualBadge: {
    position: "absolute",
    padding: "8px 11px",
    borderRadius: 10,
    color: "#0f172a",
    background: "rgba(255,255,255,.93)",
    border: "1px solid rgba(255,255,255,.86)",
    boxShadow: "0 12px 28px rgba(2,6,23,.2)",
    fontSize: ".76rem",
    fontWeight: 800,
    backdropFilter: "blur(12px)",
  },
  badgeOne: { top: -14, right: 26 },
  badgeTwo: { bottom: 22, left: -22 },
  badgeThree: { bottom: -16, right: 34 },
  workflow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 1,
    overflow: "hidden",
    marginTop: theme.spacing(2.5),
    borderRadius: 20,
    background: "rgba(148,163,184,.22)",
    border: "1px solid rgba(148,163,184,.2)",
    boxShadow: "0 16px 40px rgba(15,23,42,.08)",
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, 1fr)" },
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  workflowCard: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: theme.spacing(1.4),
    padding: theme.spacing(2.3),
    background: "rgba(255,255,255,.88)",
    backdropFilter: "blur(12px)",
  },
  workflowNumber: {
    color: "#2563eb",
    fontSize: ".75rem",
    fontWeight: 850,
    letterSpacing: ".6px",
  },
  workflowTitle: { margin: 0, color: "#0f172a", fontSize: ".95rem", fontWeight: 800 },
  workflowText: { margin: "4px 0 0", color: "#64748b", fontSize: ".78rem", lineHeight: 1.55 },
  docsLayout: {
    display: "grid",
    gridTemplateColumns: "230px minmax(0, 1fr)",
    gap: theme.spacing(3.2),
    alignItems: "start",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" },
  },
  sidebar: {
    position: "sticky",
    top: 112,
    overflow: "hidden",
    padding: theme.spacing(1.4),
    borderRadius: 18,
    color: "#cbd5e1",
    background: "linear-gradient(155deg, #0f172a, #172554)",
    border: "1px solid rgba(148,163,184,.18)",
    boxShadow: "0 18px 38px rgba(15,23,42,.16)",
    [theme.breakpoints.down("md")]: {
      position: "static",
      display: "flex",
      alignItems: "center",
      gap: 8,
      overflowX: "auto",
      padding: theme.spacing(1),
    },
  },
  sidebarHeader: {
    padding: theme.spacing(1.1, 1.1, 1.5),
    [theme.breakpoints.down("md")]: { display: "none" },
  },
  sidebarKicker: { margin: 0, color: "#60a5fa", fontSize: ".7rem", fontWeight: 850, letterSpacing: "1px", textTransform: "uppercase" },
  sidebarTitle: { margin: "5px 0 0", color: "#f8fafc", fontSize: "1rem", fontWeight: 800 },
  sidebarLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 3,
    padding: "10px 11px",
    borderRadius: 10,
    color: "#cbd5e1",
    fontSize: ".84rem",
    fontWeight: 700,
    textDecoration: "none",
    transition: "all .2s ease",
    "& span": { color: "#64748b", fontSize: ".68rem" },
    "&:hover": { color: "#fff", background: "rgba(59,130,246,.16)", transform: "translateX(2px)" },
    [theme.breakpoints.down("md")]: {
      flexShrink: 0,
      marginTop: 0,
      "& span": { display: "none" },
    },
  },
  sidebarCta: {
    width: "100%",
    marginTop: "12px !important",
    borderRadius: "11px !important",
    color: "#0f172a !important",
    background: "#f8fafc !important",
    fontWeight: "800 !important",
    fontSize: ".8rem !important",
    textTransform: "none !important",
    [theme.breakpoints.down("md")]: { display: "none !important" },
  },
  resultsNote: {
    margin: theme.spacing(0, 0, 2.2),
    padding: theme.spacing(1.4, 1.7),
    borderRadius: 13,
    color: "#1e3a8a",
    background: "rgba(219,234,254,.7)",
    border: "1px solid rgba(37,99,235,.16)",
    fontSize: ".88rem",
    fontWeight: 700,
  },
  group: { marginBottom: theme.spacing(5), scrollMarginTop: 118 },
  groupHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(2),
    alignItems: "flex-end",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: { alignItems: "flex-start", flexDirection: "column" },
  },
  groupEyebrow: { margin: 0, fontSize: ".72rem", fontWeight: 850, letterSpacing: "1.1px", textTransform: "uppercase" },
  groupTitle: { margin: "5px 0 0", color: "#0f172a", fontSize: "clamp(1.55rem, 3vw, 2.15rem)", letterSpacing: "-.6px" },
  groupDescription: { maxWidth: 570, margin: 0, color: "#64748b", fontSize: ".9rem", lineHeight: 1.65 },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: theme.spacing(1.7),
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" },
  },
  card: {
    position: "relative",
    overflow: "hidden",
    minHeight: 320,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2.5),
    borderRadius: 18,
    background: "linear-gradient(180deg, rgba(255,255,255,.94), rgba(248,250,252,.9))",
    border: "1px solid rgba(148,163,184,.22)",
    boxShadow: "0 14px 32px rgba(15,23,42,.07)",
    transition: "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 150,
      height: 150,
      top: -90,
      right: -65,
      borderRadius: "50%",
      background: "var(--card-accent-soft)",
      pointerEvents: "none",
    },
    "&:hover": {
      transform: "translateY(-3px)",
      borderColor: "var(--card-accent-border)",
      boxShadow: "0 22px 45px rgba(15,23,42,.11)",
    },
  },
  cardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
  cardIcon: {
    width: 42,
    height: 42,
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    borderRadius: 12,
    color: "var(--card-accent)",
    background: "var(--card-accent-soft)",
    border: "1px solid var(--card-accent-border)",
  },
  cardChip: {
    height: "25px !important",
    color: "#64748b !important",
    background: "rgba(241,245,249,.85) !important",
    border: "1px solid rgba(148,163,184,.2) !important",
    fontSize: ".68rem !important",
    fontWeight: "800 !important",
  },
  cardTitle: { margin: theme.spacing(1.6, 0, .8), color: "#0f172a", fontSize: "1.14rem", lineHeight: 1.25, fontWeight: 800 },
  cardSummary: { margin: 0, color: "#64748b", fontSize: ".86rem", lineHeight: 1.65 },
  featureList: { display: "grid", gap: 8, margin: theme.spacing(1.7, 0) },
  feature: { display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: ".78rem", fontWeight: 650 },
  featureIcon: { color: "var(--card-accent)", fontSize: "15px !important" },
  code: {
    overflowX: "auto",
    marginTop: "auto",
    padding: "10px 11px",
    borderRadius: 10,
    color: "#334155",
    background: "#f1f5f9",
    border: "1px solid rgba(148,163,184,.2)",
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
    fontSize: ".72rem",
    lineHeight: 1.5,
    whiteSpace: "nowrap",
  },
  reference: { marginBottom: theme.spacing(1), scrollMarginTop: 118 },
  referenceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: theme.spacing(1.3),
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  referenceCard: {
    minHeight: 145,
    padding: theme.spacing(1.8),
    borderRadius: 15,
    background: "rgba(255,255,255,.88)",
    border: "1px solid rgba(148,163,184,.2)",
    boxShadow: "0 10px 26px rgba(15,23,42,.055)",
    transition: "all .2s ease",
    "&:hover": { transform: "translateY(-2px)", borderColor: "rgba(99,102,241,.3)" },
  },
  referenceIcon: { color: "#6366f1", fontSize: "19px !important" },
  referenceTitle: { margin: "12px 0 6px", color: "#0f172a", fontSize: ".88rem", fontWeight: 800 },
  referenceText: { margin: 0, color: "#64748b", fontSize: ".73rem", lineHeight: 1.55 },
  empty: {
    padding: theme.spacing(6, 3),
    borderRadius: 18,
    textAlign: "center",
    color: "#64748b",
    background: "rgba(255,255,255,.8)",
    border: "1px dashed rgba(148,163,184,.45)",
  },
  bottomCta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(3),
    marginTop: theme.spacing(5),
    padding: theme.spacing(3.5, 4),
    borderRadius: 22,
    color: "#f8fafc",
    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    boxShadow: "0 22px 48px rgba(30,64,175,.22)",
    [theme.breakpoints.down("md")]: { alignItems: "flex-start", flexDirection: "column", padding: theme.spacing(3, 2.4) },
  },
  bottomTitle: { margin: 0, fontSize: "1.45rem", letterSpacing: "-.3px" },
  bottomText: { maxWidth: 620, margin: "8px 0 0", color: "#dbeafe", fontSize: ".88rem", lineHeight: 1.65 },
}));

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DocCard({ section, accent, classes }) {
  const Icon = section.icon;
  const style = {
    "--card-accent": accent,
    "--card-accent-soft": `${accent}14`,
    "--card-accent-border": `${accent}36`,
  };

  return (
    <motion.article
      id={section.id}
      className={classes.card}
      style={style}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -70px 0px" }}
    >
      <div className={classes.cardTop}>
        <div className={classes.cardIcon}><Icon fontSize="small" /></div>
        <Chip label="In Studio" size="small" className={classes.cardChip} />
      </div>
      <h3 className={classes.cardTitle}>{section.title}</h3>
      <p className={classes.cardSummary}>{section.summary}</p>
      <div className={classes.featureList}>
        {section.features.map((feature) => (
          <span className={classes.feature} key={feature}>
            <CheckCircleRoundedIcon className={classes.featureIcon} />
            {feature}
          </span>
        ))}
      </div>
      <div className={classes.code}>{section.code}</div>
    </motion.article>
  );
}

export default function Docs() {
  const local = useStyles();
  const common = commonStyles();
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return docGroups;
    return docGroups
      .map((group) => ({
        ...group,
        sections: group.sections.filter((section) =>
          [section.title, section.summary, section.code, ...section.features]
            .join(" ")
            .toLowerCase()
            .includes(normalized)
        ),
      }))
      .filter((group) => group.sections.length > 0);
  }, [query]);

  const resultCount = filteredGroups.reduce((total, group) => total + group.sections.length, 0);

  return (
    <CustomAppBar type="docs">
      <Container maxWidth={false} disableGutters className={`${common.responsiveContainer} ${local.page}`}>
        <header className={local.hero}>
          <div>
            <span className={local.eyebrow}>
              <MenuBookRoundedIcon style={{ fontSize: 16 }} /> Product documentation
            </span>
            <h1 className={local.heroTitle}>
              Everything in FlutterPilot, <span className={local.heroAccent}>mapped clearly.</span>
            </h1>
            <p className={local.heroLead}>
              Explore the same product areas documented inside FlutterPilot Studio—from AI generation and visual
              logic to connected data, deployment, and the complete component reference.
            </p>
            <div className={local.heroActions}>
              <Button
                className={local.primaryButton}
                endIcon={<ArrowOutwardRoundedIcon />}
                onClick={() => window.open(STUDIO_URL, "_blank", "noopener,noreferrer")}
              >
                Open FlutterPilot Studio
              </Button>
              <Button className={local.secondaryButton} onClick={() => scrollToId("build")}>
                Browse the guide
              </Button>
            </div>
            <TextField
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search AI generation, state, Sheets, deployment..."
              aria-label="Search product documentation"
              className={local.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon style={{ color: "#64748b" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <motion.div
            className={local.heroVisual}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className={local.window}>
              <div className={local.windowBar}>
                <span className={local.dot} style={{ background: "#fb7185" }} />
                <span className={local.dot} style={{ background: "#fbbf24" }} />
                <span className={local.dot} style={{ background: "#34d399" }} />
              </div>
              <img
                src="/ai_generation_feature.webp"
                alt="FlutterPilot Studio AI generation"
                className={local.heroImage}
                width="1024"
                height="698"
              />
            </div>
            <span className={`${local.visualBadge} ${local.badgeOne}`}>20 Studio sections</span>
            <span className={`${local.visualBadge} ${local.badgeTwo}`}>Search + deep links</span>
            <span className={`${local.visualBadge} ${local.badgeThree}`}>Ask AI built in</span>
          </motion.div>
        </header>

        <section className={local.workflow} aria-label="FlutterPilot workflow">
          {workflow.map(([number, title, description]) => (
            <div className={local.workflowCard} key={number}>
              <span className={local.workflowNumber}>{number}</span>
              <div>
                <h2 className={local.workflowTitle}>{title}</h2>
                <p className={local.workflowText}>{description}</p>
              </div>
            </div>
          ))}
        </section>

        <div className={local.docsLayout}>
          <nav className={local.sidebar} aria-label="Documentation categories">
            <div className={local.sidebarHeader}>
              <p className={local.sidebarKicker}>On this page</p>
              <p className={local.sidebarTitle}>Studio guide</p>
            </div>
            {docGroups.map((group) => (
              <a className={local.sidebarLink} href={`#${group.key}`} key={group.key}>
                {group.navLabel}<span>{String(group.sections.length).padStart(2, "0")}</span>
              </a>
            ))}
            <a className={local.sidebarLink} href="#reference">Reference<span>08</span></a>
            <Button
              className={local.sidebarCta}
              endIcon={<ArrowOutwardRoundedIcon fontSize="small" />}
              onClick={() => window.open(STUDIO_URL, "_blank", "noopener,noreferrer")}
            >
              Open Studio
            </Button>
          </nav>

          <main>
            {query.trim() && (
              <div className={local.resultsNote}>
                {resultCount === 0
                  ? `No product sections match “${query.trim()}”.`
                  : `${resultCount} product section${resultCount === 1 ? "" : "s"} match “${query.trim()}”.`}
              </div>
            )}

            {filteredGroups.map((group) => (
              <section className={local.group} id={group.key} key={group.key}>
                <div className={local.groupHeader}>
                  <div>
                    <p className={local.groupEyebrow} style={{ color: group.accent }}>{group.eyebrow}</p>
                    <h2 className={local.groupTitle}>{group.title}</h2>
                  </div>
                  <p className={local.groupDescription}>{group.description}</p>
                </div>
                <div className={local.cardGrid}>
                  {group.sections.map((section) => (
                    <DocCard section={section} accent={group.accent} classes={local} key={section.id} />
                  ))}
                </div>
              </section>
            ))}

            {!query.trim() && (
              <section className={local.reference} id="reference">
                <div className={local.groupHeader}>
                  <div>
                    <p className={local.groupEyebrow} style={{ color: "#6366f1" }}>Reference</p>
                    <h2 className={local.groupTitle}>Components and Dart APIs</h2>
                  </div>
                  <p className={local.groupDescription}>
                    The in-Studio reference stays synchronized with the component catalog and supported Dart runtime.
                  </p>
                </div>
                <div className={local.referenceGrid}>
                  {referenceSections.map(([title, description], index) => (
                    <motion.article
                      className={local.referenceCard}
                      key={title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.025 }}
                      viewport={{ once: true }}
                    >
                      {index < 4 ? <DevicesRoundedIcon className={local.referenceIcon} /> : <CodeRoundedIcon className={local.referenceIcon} />}
                      <h3 className={local.referenceTitle}>{title}</h3>
                      <p className={local.referenceText}>{description}</p>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}

            {query.trim() && resultCount === 0 && (
              <div className={local.empty}>
                Try a broader term such as <strong>AI</strong>, <strong>data</strong>, <strong>state</strong>, or <strong>deploy</strong>.
              </div>
            )}

            <section className={local.bottomCta}>
              <div>
                <h2 className={local.bottomTitle}>Need the step-by-step version?</h2>
                <p className={local.bottomText}>
                  Open Documentation inside FlutterPilot Studio for searchable guides, contextual deep links,
                  component references, and Ask AI—all connected to the project you are building.
                </p>
              </div>
              <Button
                className={local.primaryButton}
                endIcon={<ArrowOutwardRoundedIcon />}
                onClick={() => window.open(STUDIO_URL, "_blank", "noopener,noreferrer")}
              >
                Continue in Studio
              </Button>
            </section>
          </main>
        </div>
      </Container>
    </CustomAppBar>
  );
}
