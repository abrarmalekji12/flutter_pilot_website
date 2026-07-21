import React from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const useStyles = makeStyles((theme) => ({
  intro: {
    borderRadius: "18px",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.07)",
    padding: theme.spacing(3, 3.2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.2, 2),
      marginBottom: theme.spacing(3),
    },
  },
  eyebrow: {
    margin: 0,
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
    fontSize: "0.76rem",
    letterSpacing: "0.5px",
    fontWeight: 700,
    color: "#1d4ed8",
  },
  heading: {
    margin: 0,
    marginBottom: theme.spacing(1),
    fontSize: "2.1rem",
    lineHeight: 1.15,
    letterSpacing: "-0.4px",
    color: "#0f172a",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
    },
  },
  lead: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.7,
    maxWidth: "820px",
  },
  quickLinks: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  quickLink: {
    display: "inline-block",
    borderRadius: "999px",
    border: "1px solid rgba(30, 64, 175, 0.24)",
    background: "rgba(30, 64, 175, 0.06)",
    color: "#1e40af",
    padding: theme.spacing(0.45, 1.1),
    fontSize: "0.82rem",
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(30, 64, 175, 0.12)",
      transform: "translateY(-1px)",
    },
  },
  sidebar: {
    position: "sticky",
    top: "102px",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.26)",
    background: "#fff",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
    padding: theme.spacing(1.4),
    maxHeight: "calc(100vh - 130px)",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      position: "static",
      top: "auto",
      maxHeight: "none",
    },
  },
  sidebarTitle: {
    margin: theme.spacing(0.4, 0.6, 0.8),
    fontSize: "0.84rem",
    fontWeight: 700,
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    color: "#64748b",
  },
  sidebarCategoryLabel: {
    display: "block",
    margin: theme.spacing(1.4, 0.6, 0.4),
    fontSize: "0.66rem",
    fontWeight: 800,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#94a3b8",
  },
  sidebarLink: {
    display: "block",
    borderRadius: "10px",
    color: "#1e293b",
    fontSize: "0.86rem",
    fontWeight: 600,
    padding: theme.spacing(0.65, 1),
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(30, 64, 175, 0.08)",
      color: "#1e40af",
    },
  },
  categoryDivider: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    margin: theme.spacing(3, 0, 2),
    "&:first-child": {
      marginTop: 0,
    },
  },
  categoryLabel: {
    fontSize: "0.72rem",
    fontWeight: 800,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    color: "#2563eb",
    background: "rgba(37, 99, 235, 0.06)",
    padding: "4px 14px",
    borderRadius: "99px",
    whiteSpace: "nowrap",
  },
  categoryLine: {
    flex: 1,
    height: "1px",
    background: "rgba(148, 163, 184, 0.2)",
  },
  section: {
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.24)",
    background: "#fff",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",
    overflow: "hidden",
    marginBottom: theme.spacing(2.2),
    scrollMarginTop: "120px",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  fullSection: {
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.24)",
    background: "linear-gradient(180deg, #fafbff 0%, #ffffff 100%)",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",
    overflow: "hidden",
    marginBottom: theme.spacing(2.2),
    padding: theme.spacing(2.5, 2.8),
    scrollMarginTop: "120px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 1.8),
    },
  },
  sectionImageWrap: {
    height: "100%",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "220px",
    },
  },
  sectionImage: {
    width: "100%",
    height: "100%",
    minHeight: "220px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      minHeight: "180px",
    },
  },
  sectionBody: {
    padding: theme.spacing(2.1, 2.2),
  },
  sectionTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: theme.spacing(0.9),
    "& h2": {
      marginBottom: 0,
    },
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(145deg, #eff6ff, #dbeafe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2563eb",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.12)",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.24rem",
    lineHeight: 1.3,
    color: "#0f172a",
    fontWeight: 700,
  },
  sectionSummary: {
    margin: 0,
    marginBottom: theme.spacing(1.2),
    color: "#475569",
    lineHeight: 1.7,
    fontSize: "0.92rem",
  },
  featureSubGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(1.2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  featureSubGridWide: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  },
  featureSubCard: {
    padding: theme.spacing(1.3, 1.5),
    borderRadius: "10px",
    background: "rgba(241, 245, 249, 0.6)",
    border: "1px solid rgba(148, 163, 184, 0.15)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(37, 99, 235, 0.04)",
      borderColor: "rgba(37, 99, 235, 0.18)",
      transform: "translateY(-1px)",
    },
  },
  featureSubTitle: {
    margin: 0,
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "2px",
  },
  featureSubDesc: {
    margin: 0,
    fontSize: "0.76rem",
    color: "#64748b",
    lineHeight: 1.5,
  },
}));

const categories = [
  { key: "build", label: "Build" },
  { key: "connect", label: "Connect" },
  { key: "ship", label: "Ship" },
];

const docsSections = [
  {
    id: "ai-generation",
    category: "build",
    title: "AI-Powered Generation",
    icon: <AutoAwesomeRoundedIcon fontSize="small" />,
    image: "ai_generation_feature.webp",
    imageAlt: "AI generation interface for building Flutter screens",
    summary:
      "FlutterPilot integrates AI at every stage of development — design, build, refine, and connect databases with natural language prompts.",
    features: [
      { title: "AI Project Creator", desc: "Bootstrap a fully functional multi-screen app from a single sentence." },
      { title: "AI UI Generator", desc: "Create custom widgets and layouts by describing what you need." },
      { title: "AI Editing & Refinement", desc: "Iterate on generated screens — view, compare, branch, and swap between design revisions." },
      { title: "AI Copilot Chat", desc: "Persistent sidebar assistant for writing Dart logic, binding APIs, and auto-fixing errors." },
    ],
  },
  {
    id: "visual-editor",
    category: "build",
    title: "Visual Editor & Figma Import",
    icon: <DashboardCustomizeRoundedIcon fontSize="small" />,
    image: "use-figma-logo.svg",
    imageAlt: "Figma to FlutterPilot visual design conversion",
    summary:
      "Drag-and-drop UI builder with Figma import support. Assemble, style, and modify your interface visually with real-time feedback.",
    features: [
      { title: "Drag & Drop", desc: "Place and nest components on the canvas with intuitive controls." },
      { title: "Properties Panel", desc: "Edit component-specific attributes and styling in real time." },
      { title: "Component Tree", desc: "Hierarchical layer list for quick navigation and reordering." },
      { title: "Figma Workflow", desc: "Import Figma design structure for quicker setup and cleaner handoff." },
    ],
  },
  {
    id: "actions-logic",
    category: "build",
    title: "Actions & Logic",
    icon: <TouchAppRoundedIcon fontSize="small" />,
    summary:
      "Actions define what happens when a user interacts with your app — tapping a button, submitting a form, or triggering a workflow. Build complex logic visually.",
    features: [
      { title: "Navigation", desc: "Open screens, go back, or replace the current view with built-in transitions." },
      { title: "Overlays", desc: "Show dialogs, bottom sheets, and snackbar messages with a single action." },
      { title: "Logic & Flow", desc: "Add conditionals, loops, and custom Dart code for complex behavior." },
      { title: "System & Device", desc: "Launch URLs, trigger haptics, copy to clipboard, and biometric verification." },
    ],
  },
  {
    id: "api-endpoints",
    category: "connect",
    title: "API Endpoints",
    icon: <ApiRoundedIcon fontSize="small" />,
    image: "endpoint_preview.webp",
    imageAlt: "API Endpoint connectors interface preview",
    summary:
      "Connect your app to external APIs and manage global variables. Add endpoints manually or import directly from Postman collections.",
    features: [
      { title: "Postman Import", desc: "Upload a collection JSON to auto-generate all endpoint connectors instantly." },
      { title: "Live Testing", desc: "Test API calls directly in context before binding responses to your UI." },
      { title: "Global Variables", desc: "Store base URLs, auth tokens, and config centrally for all endpoints." },
      { title: "Easy Binding", desc: "Access APIs via App.apis.<NAME>.fetch() with named parameters." },
    ],
  },
  {
    id: "sheet-integration",
    category: "connect",
    title: "Google Sheet Integration",
    icon: <TableChartRoundedIcon fontSize="small" />,
    summary:
      "Connect a Google Sheet and turn your data into a live Flutter UI in minutes — no coding required. Pick a sheet, insert a template, and customize.",
    features: [
      { title: "One-Click Connect", desc: "Sign in with Google and pick any sheet to connect to your project." },
      { title: "Pre-Made Templates", desc: "Insert List, Card, or Form templates with automatic column mapping." },
      { title: "Live Data Preview", desc: "Preview and interact with real sheet data directly inside the builder." },
      { title: "Data Actions", desc: "Add, edit, save, delete, search, and refresh with simple bind syntax." },
    ],
  },
  {
    id: "local-data",
    category: "connect",
    title: "Local Data & Offline-First",
    icon: <StorageRoundedIcon fontSize="small" />,
    summary:
      "Manage on-device collections to store data directly in your app. Build fully interactive offline-first apps like todo lists, note takers, and expense trackers.",
    features: [
      { title: "AI Schema Design", desc: "Let AI generate column schemas from a natural language description." },
      { title: "Column Types", desc: "Text, Number, Boolean, and Enums with automatic schema migrations." },
      { title: "Canvas Samples", desc: "Generate synthetic mock data to preview layouts during design." },
      { title: "Hive Storage", desc: "Fast, lightweight on-device persistence that works fully offline." },
    ],
  },
  {
    id: "real-time-preview",
    category: "ship",
    title: "Real-Time Preview",
    icon: <VisibilityRoundedIcon fontSize="small" />,
    image: "realtime_preview.webp",
    imageAlt: "Real-time preview and multi-viewport testing interface",
    summary:
      "Validate UI changes instantly while editing. Spacing, behavior, and content flow stay consistent across every viewport size.",
    features: [
      { title: "Instant Feedback", desc: "See every change render immediately as you design and build." },
      { title: "Multi-Viewport", desc: "Test on mobile, tablet, and desktop form factors side by side." },
      { title: "State Preview", desc: "Check screen transitions, loading states, and error states quickly." },
      { title: "Live Interactions", desc: "Test taps, scrolling, and navigation flows right in the builder." },
    ],
  },
  {
    id: "code-expressions",
    category: "ship",
    title: "Code & Expressions",
    icon: <CodeRoundedIcon fontSize="small" />,
    image: "example_image.webp",
    imageAlt: "Code and expression editing with Dart support",
    summary:
      "Every property supports live Dart expressions. Use the built-in executor with intelligent error highlighting for dynamic, data-driven UIs.",
    features: [
      { title: "Dynamic Properties", desc: "Expression-driven UI for conditional styling and data binding." },
      { title: "Built-in Executor", desc: "Runs Dart code locally with real-time error highlighting." },
      { title: "State Management", desc: "Use refresh() and setState() for reactive UI updates." },
      { title: "Clean Output", desc: "Structured, maintainable code output ready for production teams." },
    ],
  },
  {
    id: "export-publish",
    category: "ship",
    title: "Export & Publish",
    icon: <CloudUploadRoundedIcon fontSize="small" />,
    summary:
      "Ready to share your app? Preview it, download its complete Flutter source code, or generate an installable Android APK — all from your workspace.",
    features: [
      { title: "Source Code Export", desc: "Download a complete, production-ready Flutter project with all assets." },
      { title: "Android APK", desc: "Generate an installable APK directly from the builder — no CLI required." },
      { title: "Web App Sharing", desc: "Instantly share a live web-app link with real-time updates." },
      { title: "Backup & Versioning", desc: "Export source code as backup before any release build." },
    ],
  },
  {
    id: "collaboration",
    category: "ship",
    title: "Team Collaboration",
    icon: <GroupsRoundedIcon fontSize="small" />,
    image: "GIF_1.gif",
    imageAlt: "Team collaboration and version control workflow",
    summary:
      "Coordinate work across team members with commit-based version control, shared editing, and automatic cloud backup for multi-user teams.",
    features: [
      { title: "Shared Editing", desc: "Multiple team members can work on the same project simultaneously." },
      { title: "Version History", desc: "Commit-style change tracking with full undo/redo and revert support." },
      { title: "Cloud Auto-Save", desc: "Automatic background saving to cloud — never lose your work." },
      { title: "Reusable Components", desc: "Create custom components and share them across projects." },
    ],
  },
];

const scrollToSection = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Docs() {
  const localClasses = useStyles();
  const classes = commonStyles();

  return (
    <CustomAppBar type="docs">
      <Container maxWidth={false} disableGutters className={classes.responsiveContainer}>
        <header className={localClasses.intro}>
          <p className={localClasses.eyebrow}>Documentation</p>
          <h1 className={localClasses.heading}>FlutterPilot Docs</h1>
          <p className={localClasses.lead}>
            Everything you need to build, connect, and ship Flutter apps — from AI-powered
            generation to real-time preview, API integration, and one-click export.
          </p>
          <div className={localClasses.quickLinks}>
            {docsSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={localClasses.quickLink}
                onClick={(e) => scrollToSection(e, section.id)}
              >
                {section.title}
              </a>
            ))}
          </div>
        </header>

        <Grid container spacing={2.4}>
          <Grid item xs={12} md={3}>
            <nav className={localClasses.sidebar} aria-label="Docs sections">
              <p className={localClasses.sidebarTitle}>On This Page</p>
              {categories.map((cat, catIdx) => {
                const catSections = docsSections.filter((s) => s.category === cat.key);
                return (
                  <React.Fragment key={cat.key}>
                    <span
                      className={localClasses.sidebarCategoryLabel}
                      style={catIdx === 0 ? { marginTop: 4 } : undefined}
                    >
                      {cat.label}
                    </span>
                    {catSections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={localClasses.sidebarLink}
                        onClick={(e) => scrollToSection(e, section.id)}
                      >
                        {section.title}
                      </a>
                    ))}
                  </React.Fragment>
                );
              })}
            </nav>
          </Grid>

          <Grid item xs={12} md={9}>
            {categories.map((cat, catIdx) => {
              const catSections = docsSections.filter((s) => s.category === cat.key);
              return (
                <React.Fragment key={cat.key}>
                  <div
                    className={localClasses.categoryDivider}
                    style={catIdx === 0 ? { marginTop: 0 } : undefined}
                  >
                    <span className={localClasses.categoryLabel}>{cat.label}</span>
                    <div className={localClasses.categoryLine} />
                  </div>

                  {catSections.map((section) =>
                    section.image ? (
                      <motion.article
                        key={section.id}
                        id={section.id}
                        className={localClasses.section}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                      >
                        <Grid container>
                          <Grid item xs={12} md={5}>
                            <div className={localClasses.sectionImageWrap}>
                              <img
                                src={section.image}
                                alt={section.imageAlt}
                                className={localClasses.sectionImage}
                                loading="lazy"
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} md={7}>
                            <div className={localClasses.sectionBody}>
                              <div className={localClasses.sectionTitleRow}>
                                <div className={localClasses.sectionIcon}>{section.icon}</div>
                                <h2 className={localClasses.sectionTitle}>{section.title}</h2>
                              </div>
                              <p className={localClasses.sectionSummary}>{section.summary}</p>
                              <div className={localClasses.featureSubGrid}>
                                {section.features.map((f) => (
                                  <div key={f.title} className={localClasses.featureSubCard}>
                                    <p className={localClasses.featureSubTitle}>{f.title}</p>
                                    <p className={localClasses.featureSubDesc}>{f.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </motion.article>
                    ) : (
                      <motion.article
                        key={section.id}
                        id={section.id}
                        className={localClasses.fullSection}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                      >
                        <div className={localClasses.sectionTitleRow}>
                          <div className={localClasses.sectionIcon}>{section.icon}</div>
                          <h2 className={localClasses.sectionTitle}>{section.title}</h2>
                        </div>
                        <p className={localClasses.sectionSummary}>{section.summary}</p>
                        <div className={localClasses.featureSubGridWide}>
                          {section.features.map((f) => (
                            <div key={f.title} className={localClasses.featureSubCard}>
                              <p className={localClasses.featureSubTitle}>{f.title}</p>
                              <p className={localClasses.featureSubDesc}>{f.desc}</p>
                            </div>
                          ))}
                        </div>
                      </motion.article>
                    )
                  )}
                </React.Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </CustomAppBar>
  );
}
