import React from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";

const useStyles = makeStyles((theme) => ({
  page: {
    // Standardized via commonStyles.responsiveContainer
  },
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
    [theme.breakpoints.down("sm")]: {
      position: "static",
      top: "auto",
    },
  },
  sidebarTitle: {
    margin: theme.spacing(0.4, 0.6, 1),
    fontSize: "0.84rem",
    fontWeight: 700,
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    color: "#64748b",
  },
  sidebarLink: {
    display: "block",
    borderRadius: "10px",
    color: "#1e293b",
    fontSize: "0.92rem",
    fontWeight: 600,
    padding: theme.spacing(0.9, 1),
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(30, 64, 175, 0.08)",
      color: "#1e40af",
    },
  },
  section: {
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.24)",
    background: "#fff",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",
    overflow: "hidden",
    marginBottom: theme.spacing(2.2),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  sectionImageWrap: {
    height: "100%",
    background: "#e2e8f0",
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
  sectionTitle: {
    margin: 0,
    marginBottom: theme.spacing(0.9),
    fontSize: "1.24rem",
    lineHeight: 1.3,
    color: "#0f172a",
  },
  sectionSummary: {
    margin: 0,
    marginBottom: theme.spacing(1.2),
    color: "#475569",
    lineHeight: 1.7,
  },
  points: {
    margin: 0,
    paddingLeft: theme.spacing(2.2),
    color: "#334155",
    lineHeight: 1.7,
    "& li": {
      marginBottom: theme.spacing(0.6),
    },
  },
}));

const docsSections = [
  {
    id: "ai-ui-scaffolding",
    title: "AI UI Scaffolding",
    image: "ai_generation_feature.webp",
    imageAlt: "AI UI scaffolding interface preview",
    summary:
      "Generate starter screens and widget structure from simple prompts, then refine everything visually.",
    points: [
      "Prompt-based layout generation for fast project kickoff.",
      "Auto-created screen structure and basic navigation.",
      "Figma-to-editable UI workflow for faster handoff.",
    ],
  },
  {
    id: "figma-to-ui-conversion",
    title: "Figma to UI Conversion",
    image: "use-figma-logo.svg",
    imageAlt: "use-figma open-source logo for Figma to UI conversion",
    summary:
      "Convert Figma designs into editable UI blocks faster using the use-figma open-source workflow.",
    points: [
      "Import design structure from Figma for quicker setup.",
      "Map layers into reusable UI components with less manual work.",
      "Speed up designer-to-developer handoff with cleaner output.",
    ],
  },
  {
    id: "api-data-integration",
    title: "API & Data Integration",
    image: "endpoint_preview.webp",
    imageAlt: "API Endpoint Connectors interface preview",
    summary:
      "Connect backend data without heavy boilerplate and validate endpoints directly in the workflow.",
    points: [
      "Import Postman collections into your app setup.",
      "Test API calls in context before binding to UI.",
      "Map responses to widgets with minimal wiring.",
    ],
  },
  {
    id: "real-time-preview",
    title: "Real-time Preview",
    image: "realtime_preview.webp",
    imageAlt: "Real-time preview and editing interface",
    summary:
      "Validate UI changes instantly while editing so spacing, behavior, and flow stay consistent.",
    points: [
      "Immediate visual feedback during design iteration.",
      "Check screen transitions and content states quickly.",
      "Reduce back-and-forth between builder and runtime.",
    ],
  },
  {
    id: "code-expressions",
    title: "Code & Expressions",
    image: "example_image.webp",
    imageAlt: "Code and expression editing preview",
    summary:
      "Use Dart expressions for dynamic properties and export maintainable Flutter code ready for teams.",
    points: [
      "Expression-driven UI properties for dynamic behavior.",
      "Structured code output for developer customization.",
      "Cleaner handoff from visual builder to codebase.",
    ],
  },
  {
    id: "collaboration-tools",
    title: "Collaboration & Tools",
    image: "GIF_1.gif",
    imageAlt: "Collaboration and tools workflow preview",
    summary:
      "Coordinate work across team members with shared editing and built-in change tracking.",
    points: [
      "Collaborative project workflow for teams.",
      "Version-aware updates with commit-style history.",
      "Less repetitive setup through reusable tooling.",
    ],
  },
];

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
            Read concise, implementation-focused guidance for FlutterPilot features and workflows.
          </p>
          <div className={localClasses.quickLinks}>
            {docsSections.map((section) => (
              <span key={section.id} className={localClasses.quickLink}>
                {section.title}
              </span>
            ))}
          </div>
        </header>

        <Grid container spacing={2.4}>
          <Grid item xs={12} md={3}>
            <nav className={localClasses.sidebar} aria-label="Docs sections">
              <p className={localClasses.sidebarTitle}>On This Page</p>
              {docsSections.map((section) => (
                <span key={section.id} className={localClasses.sidebarLink}>
                  {section.title}
                </span>
              ))}
            </nav>
          </Grid>

          <Grid item xs={12} md={9}>
            {docsSections.map((section) => (
              <article key={section.id} id={section.id} className={localClasses.section}>
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
                      <h2 className={localClasses.sectionTitle}>{section.title}</h2>
                      <p className={localClasses.sectionSummary}>{section.summary}</p>
                      <ul className={localClasses.points}>
                        {section.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </article>
            ))}
          </Grid>
        </Grid>
      </Container>
    </CustomAppBar>
  );
}
