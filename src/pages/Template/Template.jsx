import React, { useEffect, useState } from "react";
import { Chip, Grid, useTheme, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import CustomAppBar from "../../componets/appbar";
import TemplateCard from "../../componets/templatecard";
import TemplateCardSkeleton from "../../componets/templatecardskeleton";
import { commonStyles } from "../../styles/commonStyles";
import { isPrerendering } from "../../utils/prerender";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import { studioUrl } from "../../utils/studioLinks";

const useStyles = makeStyles((theme) => ({
  page: {
    // Standardized via commonStyles.responsiveContainer
  },
  headerCard: {
    borderRadius: "24px",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
    padding: theme.spacing(4, 3.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2.5),
      textAlign: "center",
      borderRadius: "20px",
    },
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.7),
    margin: 0,
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontSize: "0.76rem",
    fontWeight: 700,
    color: "#1d4ed8",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  title: {
    margin: 0,
    marginBottom: theme.spacing(1),
    color: "#0f172a",
    fontSize: "2.05rem",
    lineHeight: 1.16,
    letterSpacing: "-0.38px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.45rem",
      marginBottom: theme.spacing(0.5),
    },
  },
  subtitle: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.75,
    maxWidth: "780px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.94rem",
      margin: "0 auto",
    },
  },
  metaRow: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginTop: theme.spacing(2.5),
    },
  },
  chip: {
    fontWeight: 600,
    borderColor: "rgba(30, 64, 175, 0.22)",
    color: "#1e40af",
    background: "rgba(30, 64, 175, 0.06)",
    "& .MuiChip-icon": {
      color: "#2563eb",
      fontSize: "1rem",
      marginLeft: theme.spacing(1),
    },
  },
  gridWrap: {
    alignItems: "stretch",
  },
  cardItem: {
    display: "flex",
  },
  section: {
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(4) },
  },
  sectionTitle: {
    margin: 0,
    marginBottom: theme.spacing(1),
    color: "#0f172a",
    fontSize: "1.55rem",
    lineHeight: 1.25,
    letterSpacing: "-0.3px",
  },
  sectionText: {
    margin: 0,
    marginBottom: theme.spacing(2.5),
    color: "#475569",
    lineHeight: 1.75,
    maxWidth: "780px",
  },
  stepGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: theme.spacing(2),
    margin: 0,
    padding: 0,
    listStyle: "none",
    counterReset: "step",
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
    [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
  },
  stepCard: {
    padding: theme.spacing(2.5),
    borderRadius: "18px",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "rgba(255, 255, 255, 0.86)",
    "& h3": { margin: "0 0 6px", fontSize: "1.05rem", color: "#0f172a" },
    "& p": { margin: 0, color: "#64748b", lineHeight: 1.6 },
  },
  stepNumber: {
    display: "block",
    marginBottom: theme.spacing(1),
    color: "#2563eb",
    fontSize: "0.78rem",
    fontWeight: 800,
    letterSpacing: "1px",
  },
  split: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: theme.spacing(4),
    alignItems: "center",
    [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" },
  },
  figure: {
    margin: 0,
    "& img": {
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: "16px",
      border: "1px solid rgba(148, 163, 184, 0.3)",
      boxShadow: "0 18px 40px rgba(15, 23, 42, 0.1)",
    },
    "& figcaption": { marginTop: theme.spacing(1), color: "#64748b", fontSize: "0.9rem", lineHeight: 1.55 },
  },
  checkList: {
    margin: 0,
    paddingLeft: theme.spacing(2.5),
    color: "#334155",
    lineHeight: 1.7,
    "& li": { marginBottom: theme.spacing(0.8) },
  },
  linkRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1.5),
    "& a": { color: "#1d4ed8", fontWeight: 700 },
  },
  inlineAction: {
    marginTop: theme.spacing(1.5),
    display: "inline-flex",
    gap: theme.spacing(1.5),
    flexWrap: "wrap",
    justifyContent: "center",
    "& a, & button": { color: "#1d4ed8", fontWeight: 700 },
    "& button": { background: "none", border: 0, cursor: "pointer", font: "inherit", textDecoration: "underline" },
  },
  statusCard: {
    borderRadius: "14px",
    border: "1px dashed rgba(148, 163, 184, 0.45)",
    background: "rgba(255, 255, 255, 0.86)",
    color: "#64748b",
    textAlign: "center",
    padding: theme.spacing(3, 2),
  },
}));

const LOAD_TIMEOUT_MS = 12000;

const steps = [
  ["Pick a starting point", "Choose a template from this gallery, or from the New Project dialog in FlutterPilot Studio, where templates sit next to a blank project and the AI prompt."],
  ["Open it in the Studio", "Get Started opens the template in FlutterPilot Studio in your browser, ready to edit."],
  ["Make it yours", "Change widgets, text, images, colors, and layout in the property panel, or describe the change to the AI Agent."],
  ["Connect and ship", "Add actions, state, and data, preview on different device sizes, then deploy to the web or export the Flutter source."],
];

const editableAreas = [
  "Widget structure and layout: rows, columns, stacks, lists, padding, and alignment",
  "Content and styling: text, images, fonts, colors, and spacing",
  "Screens and navigation between them",
  "Actions and state: taps, conditions, dialogs, and app or page variables",
  "Data: local collections and REST endpoints, plus Google Sheets, Firebase, or Supabase (Beta)",
];

export default function Template() {
  const classes = useStyles();
  const common = commonStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const prerendering = isPrerendering();
  const [templates, setTemplates] = useState([]);
  const [status, setStatus] = useState("static");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Keep Firebase and the gallery chunk off the critical rendering path.
    // The prerendered editorial content stays useful immediately; the live
    // gallery starts after the page has had time to paint and settle.
    if (prerendering) return undefined;

    let active = true;
    let startDelayId;
    let idleId;
    let loadTimeoutId;

    const loadGallery = () => {
      if (!active) return;
      setStatus("loading");
      loadTimeoutId = window.setTimeout(() => {
        if (active) setStatus((current) => (current === "loading" ? "error" : current));
      }, LOAD_TIMEOUT_MS);

      import("../../utils/loadTemplates")
        .then(({ default: loadTemplates }) => loadTemplates())
        .then((data) => {
          if (!active) return;
          setTemplates(data);
          setStatus(data.length ? "ready" : "empty");
        })
        .catch((error) => {
          console.error("Error fetching templates:", error);
          if (active) setStatus("error");
        })
        .finally(() => {
          if (loadTimeoutId) window.clearTimeout(loadTimeoutId);
        });
    };

    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadGallery, { timeout: 1500 });
      } else {
        loadGallery();
      }
    };

    // Retries are user initiated, so run them promptly. The first automatic
    // load waits long enough to stay clear of the initial LCP window.
    const initialDelay = process.env.NODE_ENV === "test" || attempt > 0 ? 0 : 3000;
    startDelayId = window.setTimeout(scheduleLoad, initialDelay);

    return () => {
      active = false;
      if (startDelayId) window.clearTimeout(startDelayId);
      if (loadTimeoutId) window.clearTimeout(loadTimeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [prerendering, attempt]);

  const statusMessage = {
    static: "The live template gallery loads in your browser. You can also open templates from the New Project dialog in FlutterPilot Studio.",
    empty: "No templates are published right now. You can still start from a template or a prompt in FlutterPilot Studio.",
    error: "The template gallery couldn't load right now. You can still browse templates in FlutterPilot Studio.",
  }[status];

  return (
    <CustomAppBar type="template">
      <main className={classes.page}>
        <header className={`${classes.headerCard} ${common.responsiveContainer}`}>
          <p className={classes.eyebrow}><ViewQuiltRoundedIcon fontSize="small" aria-hidden="true" /> Templates</p>
          <h1 className={classes.title}>Flutter app templates you can open and edit in FlutterPilot Studio</h1>
          <p className={classes.subtitle}>
            Start faster with ready-to-edit Flutter app templates. Pick a structure,
            open it in the builder, and customize screens to match your product workflow.
          </p>
          <div className={classes.metaRow}>
            <Chip
              icon={<ViewQuiltRoundedIcon />}
              label={status === "ready" ? `${templates.length} templates available` : status === "loading" ? "Loading templates..." : "Template gallery"}
              variant="outlined"
              className={classes.chip}
            />
            <Chip icon={<SmartphoneRoundedIcon />} label="Mobile-first UI" variant="outlined" className={classes.chip} />
            <Chip icon={<AccountTreeRoundedIcon />} label="Editable screens, logic, and data" variant="outlined" className={classes.chip} />
          </div>
        </header>

        <section className={`${common.responsiveContainer} ${classes.section}`} aria-labelledby="template-gallery-title">
          <h2 id="template-gallery-title" className={classes.sectionTitle}>Browse the template gallery</h2>
          <p className={classes.sectionText}>
            Each card shows the template's screens. Choose Get Started to open it in FlutterPilot Studio.
          </p>
          <Grid container spacing={isSmall ? 1.5 : 2.4} className={classes.gridWrap}>
            {status === "loading" &&
              [0, 1, 2, 3].map((i) => (
                <Grid key={i} item xs={12} md={6} className={classes.cardItem}>
                  <TemplateCardSkeleton />
                </Grid>
              ))}

            {status === "ready" &&
              templates.map((template) => (
                <Grid key={template.id} item xs={12} md={6} className={classes.cardItem}>
                  <TemplateCard
                    templateId={template.id}
                    name={template.name}
                    description={template.description}
                    imageURLs={template.imageURLs}
                  />
                </Grid>
              ))}

            {statusMessage && (
              <Grid item xs={12}>
                <div className={classes.statusCard} role={status === "error" ? "status" : undefined}>
                  {statusMessage}
                  <div className={classes.inlineAction}>
                    <a href={studioUrl({ campaign: "template", content: "template-gallery" })} target="_blank" rel="noopener noreferrer">Open FlutterPilot Studio</a>
                    {status === "error" && (
                      <button type="button" onClick={() => setAttempt((value) => value + 1)}>Try again</button>
                    )}
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </section>

        <section className={`${common.responsiveContainer} ${classes.section}`} aria-labelledby="template-steps-title">
          <h2 id="template-steps-title" className={classes.sectionTitle}>How Flutter templates work in FlutterPilot</h2>
          <p className={classes.sectionText}>
            A template is a starting project, not a static mockup: the screens open in the same visual editor
            you use for the rest of the app.
          </p>
          <ol className={classes.stepGrid}>
            {steps.map(([title, text], index) => (
              <li className={classes.stepCard} key={title}>
                <span className={classes.stepNumber}>STEP {String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${common.responsiveContainer} ${classes.section} ${classes.split}`} aria-labelledby="template-edit-title">
          <div>
            <h2 id="template-edit-title" className={classes.sectionTitle}>What you can change after opening a template</h2>
            <p className={classes.sectionText}>
              Everything in a template stays editable. Typical first edits are branding and content, followed by
              behavior and data.
            </p>
            <ul className={classes.checkList}>
              {editableAreas.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <figure className={classes.figure}>
            <img
              src="/ai_generation_feature.webp"
              alt="FlutterPilot New Project dialog showing a blank project, the Ignite Fitness and Kyoto Wander templates, and an AI project prompt"
              width="1024"
              height="698"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              The New Project dialog in FlutterPilot Studio: start blank, pick a template such as Ignite Fitness
              or Kyoto Wander, or describe the app to the AI project creator.
            </figcaption>
          </figure>
        </section>

        <section className={`${common.responsiveContainer} ${classes.section}`} aria-labelledby="template-choice-title">
          <h2 id="template-choice-title" className={classes.sectionTitle}>Template, prompt, or blank canvas?</h2>
          <p className={classes.sectionText}>
            Use a template when one is close to the app you want and you would rather edit than describe. Use a prompt
            when your idea is specific and no template fits; the{" "}
            <Link to="/ai-flutter-ui-generator/">AI Flutter UI generator guide</Link> has example prompts. Start blank
            when you want to compose every screen yourself in the{" "}
            <Link to="/flutter-ui-builder/">visual Flutter UI builder</Link>.
          </p>
          <div className={classes.linkRow}>
            <Link to="/flutter-app-builder/">How to build a complete Flutter app</Link>
            <Link to="/docs/">Read the product guide</Link>
          </div>
        </section>
      </main>
    </CustomAppBar>
  );
}
