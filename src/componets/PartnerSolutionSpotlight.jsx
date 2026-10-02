import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

// External landing page for the independent partner product.
export const PARTNER_SOLUTION_URL = "https://healthsysadmin.com";

// Restrained healthcare teal — distinct from FlutterPilot blue without competing with it.
const TEAL = "#0f766e";
const TEAL_SOFT = "rgba(13, 148, 136, 0.08)";
const TEAL_LINE = "rgba(13, 148, 136, 0.2)";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    alignItems: "center",
    gap: theme.spacing(4),
    padding: theme.spacing(4, 5),
    borderRadius: "28px",
    background: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.85)",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.05)",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "auto minmax(0, 1fr)",
      gap: theme.spacing(3),
      padding: theme.spacing(3.5, 3.5),
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: theme.spacing(2.5),
      borderRadius: "22px",
      padding: theme.spacing(3, 2.25),
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      background: "rgba(255, 255, 255, 0.9)",
    },
  },
  visual: {
    position: "relative",
    width: "112px",
    height: "112px",
    borderRadius: "26px",
    background: "linear-gradient(145deg, #f0fdfa 0%, #ccfbf1 100%)",
    border: `1px solid ${TEAL_LINE}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: TEAL,
    flexShrink: 0,
    "& > svg": {
      fontSize: "46px",
    },
    [theme.breakpoints.down("md")]: {
      alignSelf: "flex-start",
      width: "88px",
      height: "88px",
      borderRadius: "22px",
      "& > svg": { fontSize: "38px" },
    },
    // On phones the mark tucks into the top-right corner beside the eyebrow
    // instead of taking a full row of its own.
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(2.75),
      width: "52px",
      height: "52px",
      borderRadius: "16px",
      "& > svg": { fontSize: "26px" },
    },
  },
  visualChip: {
    position: "absolute",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#ffffff",
    border: `1px solid ${TEAL_LINE}`,
    boxShadow: "0 4px 12px rgba(15, 118, 110, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: TEAL,
    "& svg": { fontSize: "18px" },
    [theme.breakpoints.down("md")]: {
      width: "28px",
      height: "28px",
      "& svg": { fontSize: "15px" },
    },
    [theme.breakpoints.down("sm")]: {
      width: "22px",
      height: "22px",
      "& svg": { fontSize: "12px" },
    },
  },
  chipTop: {
    top: "-8px",
    right: "-8px",
  },
  chipBottom: {
    bottom: "-8px",
    left: "-8px",
  },
  copy: {
    minWidth: 0,
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.75),
    padding: "5px 12px",
    borderRadius: "99px",
    background: TEAL_SOFT,
    border: `1px solid ${TEAL_LINE}`,
    color: TEAL,
    fontSize: "0.75rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.9px",
    marginBottom: theme.spacing(1.5),
    "& svg": { fontSize: "0.95rem" },
  },
  title: {
    margin: 0,
    color: "#0f172a",
    fontSize: "clamp(1.4rem, 2.2vw, 1.95rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.5px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "64px",
    },
  },
  text: {
    maxWidth: "640px",
    margin: theme.spacing(1.25, 0, 0),
    color: "#475569",
    fontSize: "1rem",
    lineHeight: 1.7,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
  },
  meta: {
    margin: theme.spacing(1.75, 0, 0),
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1, 2),
    color: "#334155",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  metaItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.6),
    "& svg": {
      fontSize: "1rem",
      color: TEAL,
    },
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "end",
    gap: theme.spacing(0.9),
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / -1",
      justifySelf: "stretch",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: theme.spacing(1, 1.75),
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  cta: {
    color: `${TEAL} !important`,
    background: "rgba(255, 255, 255, 0.8) !important",
    border: "1px solid rgba(15, 118, 110, 0.32) !important",
    borderRadius: "13px !important",
    padding: "11px 20px !important",
    fontWeight: "700 !important",
    textTransform: "none !important",
    whiteSpace: "nowrap",
    transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease !important",
    "& .MuiButton-endIcon": {
      transition: "transform 0.2s ease",
    },
    "&:hover": {
      background: "#f0fdfa !important",
      borderColor: "rgba(15, 118, 110, 0.55) !important",
      "& .MuiButton-endIcon": {
        transform: "translateX(3px)",
      },
    },
    "&:focus-visible": {
      outline: `2px solid ${TEAL}`,
      outlineOffset: "2px",
    },
  },
  ctaNote: {
    color: "#64748b",
    fontSize: "0.78rem",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

/**
 * Partner Solution spotlight for the independent Hospital & Pharmacy Management
 * system. It is not built with FlutterPilot — the copy says "independent partner"
 * explicitly and never implies otherwise. Visually it is a light glass card so the
 * dark "Ready when you are" Studio CTA that follows stays the dominant action.
 */
export default function PartnerSolutionSpotlight() {
  const classes = useStyles();

  return (
    <aside className={classes.card} aria-labelledby="partner-solution-title">
      <div className={classes.visual} aria-hidden="true">
        <LocalHospitalRoundedIcon />
        <span className={`${classes.visualChip} ${classes.chipTop}`}>
          <MedicationRoundedIcon />
        </span>
        <span className={`${classes.visualChip} ${classes.chipBottom}`}>
          <MonitorHeartRoundedIcon />
        </span>
      </div>

      <div className={classes.copy}>
        <span className={classes.eyebrow}>
          <HandshakeRoundedIcon aria-hidden="true" /> Partner Solution
        </span>
        <h2 id="partner-solution-title" className={classes.title}>
          Hospital &amp; Pharmacy Management
        </h2>
        <p className={classes.text}>
          For teams that need a complete, ready-made healthcare management system rather than building one from
          scratch, explore this independent partner solution for hospital and pharmacy operations.
        </p>
        <ul className={classes.meta}>
          <li className={classes.metaItem}>
            <LocalHospitalRoundedIcon aria-hidden="true" /> Hospital operations
          </li>
          <li className={classes.metaItem}>
            <MedicationRoundedIcon aria-hidden="true" /> Pharmacy operations
          </li>
          <li className={classes.metaItem}>
            <VerifiedUserRoundedIcon aria-hidden="true" /> Independent partner product
          </li>
        </ul>
      </div>

      <div className={classes.actions}>
        <Button
          className={classes.cta}
          component="a"
          href={PARTNER_SOLUTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<ArrowForwardRoundedIcon />}
          aria-label="Explore HealthSysAdmin (opens healthsysadmin.com in a new tab)"
        >
          Explore HealthSysAdmin
        </Button>
        <span className={classes.ctaNote}>healthsysadmin.com</span>
      </div>
    </aside>
  );
}
