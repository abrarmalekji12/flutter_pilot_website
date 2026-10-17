import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

export const SCREENSHOT_STUDIO_URL = "https://screenshot-studio.web.app";

// Standalone products in the FlutterPilot family. Each one is its own app with
// its own URL — none of these are features inside FlutterPilot Studio.
export const FAMILY_PRODUCTS = [
  {
    id: "screenshot-studio",
    name: "Screenshot Studio",
    icon: <PhotoCameraRoundedIcon />,
    tagline: "Polished screenshots and visuals for your apps",
    description:
      "Create polished screenshots and visuals to showcase your apps and projects — for store listings, launch posts, and portfolios.",
    highlights: [
      { icon: <PhoneIphoneRoundedIcon />, label: "App screenshots" },
      { icon: <WallpaperRoundedIcon />, label: "Showcase visuals" },
      { icon: <OpenInNewRoundedIcon />, label: "Separate web app" },
    ],
    url: SCREENSHOT_STUDIO_URL,
    ctaLabel: "Open Screenshot Studio",
  },
];

const ACCENT = "#5b21b6";
const ACCENT_SOFT = "rgba(109, 40, 217, 0.08)";
const ACCENT_LINE = "rgba(109, 40, 217, 0.2)";

const useStyles = makeStyles((theme) => ({
  header: {
    maxWidth: "720px",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2.25),
    },
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.75),
    padding: "5px 12px",
    borderRadius: "99px",
    background: "rgba(30, 64, 175, 0.08)",
    border: "1px solid rgba(30, 64, 175, 0.18)",
    color: "#1e40af",
    fontSize: "0.75rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.9px",
    marginBottom: theme.spacing(1.5),
    "& svg": { fontSize: "0.95rem" },
  },
  heading: {
    margin: 0,
    color: "#0f172a",
    fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)",
    fontWeight: 800,
    lineHeight: 1.12,
    letterSpacing: "-0.6px",
  },
  intro: {
    margin: theme.spacing(1.25, 0, 0),
    color: "#475569",
    fontSize: "1rem",
    lineHeight: 1.7,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 560px), 1fr))",
    gap: theme.spacing(3),
  },
  card: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
    alignItems: "center",
    gap: theme.spacing(4),
    padding: theme.spacing(4.5, 5),
    borderRadius: "28px",
    background: "rgba(255, 255, 255, 0.78)",
    border: "1px solid rgba(255, 255, 255, 0.9)",
    boxShadow: "0 18px 48px rgba(30, 64, 175, 0.08)",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: theme.spacing(3),
      padding: theme.spacing(3.5),
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "22px",
      padding: theme.spacing(3, 2.25),
      gap: theme.spacing(2.5),
    },
  },
  copy: {
    minWidth: 0,
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
  },
  mark: {
    width: "48px",
    height: "48px",
    flexShrink: 0,
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    background: "linear-gradient(135deg, #1e40af 0%, #6d28d9 100%)",
    boxShadow: "0 8px 20px rgba(91, 33, 182, 0.25)",
    "& svg": { fontSize: "24px" },
  },
  name: {
    margin: 0,
    color: "#0f172a",
    fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.4px",
  },
  tagline: {
    display: "block",
    marginTop: "2px",
    color: ACCENT,
    fontSize: "0.88rem",
    fontWeight: 700,
  },
  description: {
    maxWidth: "560px",
    margin: theme.spacing(2, 0, 0),
    color: "#475569",
    fontSize: "1rem",
    lineHeight: 1.7,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
  },
  highlights: {
    margin: theme.spacing(2, 0, 0),
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  highlight: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.6),
    padding: "6px 12px",
    borderRadius: "99px",
    background: ACCENT_SOFT,
    border: `1px solid ${ACCENT_LINE}`,
    color: "#334155",
    fontSize: "0.82rem",
    fontWeight: 600,
    "& svg": { fontSize: "1rem", color: ACCENT },
  },
  actions: {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing(1, 1.75),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  cta: {
    color: "#ffffff !important",
    background: "linear-gradient(135deg, #1e40af 0%, #5b21b6 100%) !important",
    borderRadius: "13px !important",
    padding: "11px 20px !important",
    fontWeight: "700 !important",
    textTransform: "none !important",
    whiteSpace: "nowrap",
    boxShadow: "0 10px 24px rgba(91, 33, 182, 0.22)",
    transition: "box-shadow 0.2s ease, transform 0.2s ease !important",
    "& .MuiButton-endIcon": { transition: "transform 0.2s ease" },
    "&:hover": {
      boxShadow: "0 14px 30px rgba(91, 33, 182, 0.3)",
      transform: "translateY(-1px)",
      "& .MuiButton-endIcon": { transform: "translate(2px, -2px)" },
    },
    "&:focus-visible": {
      outline: `2px solid ${ACCENT}`,
      outlineOffset: "3px",
    },
  },
  ctaNote: {
    color: "#64748b",
    fontSize: "0.8rem",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  // Decorative composition of framed screens — pure CSS, no image download.
  visual: {
    position: "relative",
    height: "100%",
    minHeight: "240px",
    borderRadius: "22px",
    overflow: "hidden",
    background:
      "radial-gradient(circle at 20% 15%, rgba(167, 139, 250, 0.45), transparent 45%), radial-gradient(circle at 85% 90%, rgba(56, 189, 248, 0.35), transparent 45%), linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
    border: `1px solid ${ACCENT_LINE}`,
    [theme.breakpoints.down("md")]: {
      minHeight: "200px",
      order: -1,
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "160px",
      borderRadius: "18px",
    },
  },
  frame: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "74%",
    aspectRatio: "9 / 19",
    borderRadius: "18px",
    padding: "6px",
    background: "#0f172a",
    boxShadow: "0 18px 36px rgba(15, 23, 42, 0.25)",
    "& > span": {
      display: "block",
      width: "100%",
      height: "100%",
      borderRadius: "13px",
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "12px",
      padding: "4px",
      "& > span": { borderRadius: "9px" },
    },
  },
  frameLeft: {
    transform: "translate(-145%, -46%) rotate(-8deg)",
    "& > span": { background: "linear-gradient(180deg, #60a5fa 0%, #1e40af 100%)" },
  },
  frameCenter: {
    zIndex: 1,
    transform: "translate(-50%, -50%)",
    "& > span": { background: "linear-gradient(180deg, #c4b5fd 0%, #6d28d9 100%)" },
  },
  frameRight: {
    transform: "translate(45%, -46%) rotate(8deg)",
    "& > span": { background: "linear-gradient(180deg, #67e8f9 0%, #0e7490 100%)" },
  },
}));

export function FamilyProductCard({ product, classes }) {
  const titleId = `${product.id}-title`;

  return (
    <article className={classes.card} aria-labelledby={titleId}>
      <div className={classes.copy}>
        <div className={classes.nameRow}>
          <span className={classes.mark} aria-hidden="true">
            {product.icon}
          </span>
          <div>
            <h3 id={titleId} className={classes.name}>
              {product.name}
            </h3>
            <span className={classes.tagline}>{product.tagline}</span>
          </div>
        </div>
        <p className={classes.description}>{product.description}</p>
        <ul className={classes.highlights} aria-label={`${product.name} highlights`}>
          {product.highlights.map((item) => (
            <li key={item.label} className={classes.highlight}>
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
        <div className={classes.actions}>
          <Button
            className={classes.cta}
            component="a"
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<ArrowOutwardRoundedIcon />}
            aria-label={`${product.ctaLabel} (opens in a new tab)`}
          >
            {product.ctaLabel}
          </Button>
          <span className={classes.ctaNote}>{new URL(product.url).host}</span>
        </div>
      </div>

      <div className={classes.visual} aria-hidden="true">
        <span className={`${classes.frame} ${classes.frameLeft}`}>
          <span />
        </span>
        <span className={`${classes.frame} ${classes.frameCenter}`}>
          <span />
        </span>
        <span className={`${classes.frame} ${classes.frameRight}`}>
          <span />
        </span>
      </div>
    </article>
  );
}

/**
 * "FlutterPilot Family" — standalone companion products. Kept as its own section
 * (not in the Studio feature grids) so it is never read as a Studio capability.
 */
export default function FlutterPilotFamily({ products = FAMILY_PRODUCTS }) {
  const classes = useStyles();

  return (
    <section aria-labelledby="flutterpilot-family-title">
      <div className={classes.header}>
        <span className={classes.eyebrow}>
          <AppsRoundedIcon aria-hidden="true" /> FlutterPilot Family
        </span>
        <h2 id="flutterpilot-family-title" className={classes.heading}>
          Companion tools beyond the Studio
        </h2>
        <p className={classes.intro}>
          Standalone apps from the FlutterPilot family. Each one runs on its own site and is separate from
          FlutterPilot Studio.
        </p>
      </div>
      <ul className={classes.list}>
        {products.map((product) => (
          <li key={product.id}>
            <FamilyProductCard product={product} classes={classes} />
          </li>
        ))}
      </ul>
    </section>
  );
}
