import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// Homepage hub linking each search intent to the page that answers it.
const guides = [
  {
    to: "/ai-flutter-ui-generator/",
    icon: AutoAwesomeRoundedIcon,
    title: "Generate Flutter UI from a prompt",
    text: "Example prompts, what generated screens look like, and how to refine them.",
  },
  {
    to: "/flutter-ui-builder/",
    icon: BrushRoundedIcon,
    title: "Design screens in the visual Flutter UI builder",
    text: "Widget tree, palette, property panel, and responsive preview.",
  },
  {
    to: "/flutter-app-builder/",
    icon: AppsRoundedIcon,
    title: "Build a complete Flutter app",
    text: "Six steps from app idea to navigation, data, preview, and export.",
  },
  {
    to: "/flutterflow-alternative/",
    icon: CompareArrowsRoundedIcon,
    title: "Compare FlutterPilot with FlutterFlow",
    text: "A side-by-side comparison, trade-offs, and how to test both.",
  },
  {
    to: "/template/",
    icon: ViewQuiltRoundedIcon,
    title: "Start from a Flutter app template",
    text: "Open an editable starter project in FlutterPilot Studio.",
  },
  {
    to: "/docs/",
    icon: MenuBookRoundedIcon,
    title: "Read the product guide",
    text: "Actions, state, data, API endpoints, export, and deployment.",
  },
];

const useStyles = makeStyles((theme) => ({
  wrap: {
    padding: theme.spacing(6, 0, 2),
  },
  kicker: {
    display: "block",
    marginBottom: theme.spacing(1.2),
    color: "#2563eb",
    fontSize: ".76rem",
    fontWeight: 850,
    textTransform: "uppercase",
    letterSpacing: "1.35px",
  },
  title: {
    margin: 0,
    color: "#0f172a",
    fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
    lineHeight: 1.1,
    letterSpacing: "-.035em",
    fontWeight: 850,
  },
  text: {
    margin: theme.spacing(1.5, 0, 4),
    maxWidth: 680,
    color: "#475569",
    fontSize: "1.05rem",
    lineHeight: 1.7,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
    margin: 0,
    padding: 0,
    listStyle: "none",
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  card: {
    display: "flex",
    gap: theme.spacing(1.6),
    height: "100%",
    boxSizing: "border-box",
    padding: theme.spacing(2.4),
    borderRadius: 18,
    color: "#0f172a",
    textDecoration: "none",
    background: "rgba(255,255,255,.72)",
    border: "1px solid rgba(148,163,184,.24)",
    transition: "transform .2s ease, border-color .2s ease",
    "&:hover": { transform: "translateY(-3px)", borderColor: "#93c5fd" },
  },
  icon: {
    flex: "0 0 auto",
    width: 40,
    height: 40,
    display: "grid",
    placeItems: "center",
    borderRadius: 12,
    color: "#1d4ed8",
    background: "linear-gradient(135deg,#dbeafe,#eff6ff)",
    border: "1px solid #bfdbfe",
  },
  cardTitle: {
    display: "block",
    marginBottom: 4,
    color: "#1d4ed8",
    fontWeight: 800,
    lineHeight: 1.35,
  },
  cardText: {
    color: "#64748b",
    lineHeight: 1.55,
    fontSize: ".95rem",
  },
}));

export default function ExploreGuides() {
  const classes = useStyles();

  return (
    <section className={classes.wrap} aria-labelledby="explore-guides-title">
      <span className={classes.kicker}>Explore by goal</span>
      <h2 id="explore-guides-title" className={classes.title}>Choose where to start</h2>
      <p className={classes.text}>
        FlutterPilot covers the whole path from an idea to a Flutter project. Pick the guide that matches what you
        want to do first.
      </p>
      <ul className={classes.grid}>
        {guides.map(({ to, icon: Icon, title, text }) => (
          <li key={to}>
            <RouterLink className={classes.card} to={to}>
              <span className={classes.icon} aria-hidden="true"><Icon fontSize="small" /></span>
              <span>
                <span className={classes.cardTitle}>{title}</span>
                <span className={classes.cardText}>{text}</span>
              </span>
            </RouterLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
