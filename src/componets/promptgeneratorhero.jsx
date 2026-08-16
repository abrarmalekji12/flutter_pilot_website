import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { makeStyles } from "@mui/styles";

const MAX_PROMPT_LENGTH = 2000;
const platformTargets = [
  { label: "Mobile", icon: <SmartphoneRoundedIcon /> },
  { label: "Desktop", icon: <DesktopWindowsRoundedIcon /> },
  { label: "Web", icon: <LanguageRoundedIcon /> },
];

const examplePrompts = [
  "A clean, minimalist sneaker store app featuring high-contrast product cards, a seamless 'swipe-to-buy' interaction, and a monochrome color palette with neon accents.",
  "An immersive travel booking app for Kyoto, utilizing full-screen photography, elegant serif typography, and an interactive map overlay for hidden local gems",
  "A high-energy workout companion using bold typography and bright distinct colors, featuring a streak-based progress ring and social leaderboard integration.",
  "A soft-UI smart home controller with rounded buttons, a neumorphic design style, and intuitive sliders for adjusting lighting warmth and temperature.",
  "A calming meditation timer featuring organic shapes, a pastel gradient background that shifts over time, and a soothing, clutter-free audio player interface.",
];

const productSignals = [
  { value: "Multi-screen", label: "Project generation", icon: <DashboardCustomizeRoundedIcon /> },
  { value: "25+", label: "Built-in actions", icon: <BoltRoundedIcon /> },
  { value: "REST + data", label: "Connected apps", icon: <HubRoundedIcon /> },
  { value: "One-click", label: "Web deployment", icon: <CloudUploadRoundedIcon /> },
];

const clampPrompt = (value) => value.slice(0, MAX_PROMPT_LENGTH);
const toChipPreview = (value) => {
  const words = value.trim().split(/\s+/);
  if (words.length <= 6) {
    return value;
  }
  return `${words.slice(0, 6).join(" ")}...`;
};

const useStyles = makeStyles((theme) => ({
  sectionWrap: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "30px",
    background: "linear-gradient(145deg, #07111f 0%, #0d1b3d 52%, #172554 100%)",
    border: "1px solid rgba(96, 165, 250, 0.24)",
    boxShadow: "0 34px 90px rgba(15, 23, 42, 0.3)",
    padding: theme.spacing(6, 5),
    isolation: "isolate",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "520px",
      height: "520px",
      top: "-300px",
      right: "-120px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.08) 44%, transparent 72%)",
      zIndex: -1,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage:
        "linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px)",
      backgroundSize: "42px 42px",
      maskImage: "linear-gradient(to bottom, black, transparent 78%)",
      WebkitMaskImage: "linear-gradient(to bottom, black, transparent 78%)",
      zIndex: -1,
      pointerEvents: "none",
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(5, 3),
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "22px",
      padding: theme.spacing(4, 2),
    },
    "@media (prefers-reduced-motion: reduce)": {
      "& $rotatingTargetTrack": {
        animation: "none",
        transform: "none",
      },
    },
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1),
    borderRadius: "999px",
    border: "1px solid rgba(147, 197, 253, 0.28)",
    background: "rgba(59, 130, 246, 0.14)",
    color: "#bfdbfe",
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.2px",
    padding: theme.spacing(0.7, 1.4),
    marginBottom: theme.spacing(1.6),
  },
  sectionTitle: {
    color: "#f8fafc",
    fontWeight: 850,
    letterSpacing: "-1.4px",
    fontSize: "3.25rem",
    lineHeight: 1.03,
    margin: 0,
    marginBottom: theme.spacing(1.5),
    maxWidth: "900px",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.2rem",
      letterSpacing: "-0.8px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75rem",
    },
  },
  sectionSubtitle: {
    color: "#cbd5e1",
    fontSize: "1.05rem",
    lineHeight: 1.7,
    margin: 0,
    marginBottom: theme.spacing(3),
    maxWidth: "720px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.93rem",
      marginBottom: theme.spacing(2.5),
    },
  },
  titleAccent: {
    background: "linear-gradient(100deg, #7dd3fc 0%, #93c5fd 45%, #c4b5fd 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  rotatingTarget: {
    display: "inline-grid",
    gridTemplateAreas: '"target"',
    height: "1.08em",
    overflow: "hidden",
    whiteSpace: "nowrap",
    verticalAlign: "-0.08em",
    minWidth: "4.75em",
    "&::after": {
      content: '"Desktop"',
      gridArea: "target",
      visibility: "hidden",
      pointerEvents: "none",
    },
  },
  rotatingTargetTrack: {
    gridArea: "target",
    display: "flex",
    flexDirection: "column",
    alignSelf: "start",
    animation: "$rotateTarget 12s cubic-bezier(0.65, 0, 0.35, 1) infinite",
    willChange: "transform",
  },
  rotatingTargetWord: {
    display: "flex",
    flex: "0 0 1.08em",
    height: "1.08em",
    minHeight: "1.08em",
    alignItems: "center",
    justifyContent: "flex-start",
    lineHeight: 1.03,
    color: "#7dd3fc",
    background: "linear-gradient(100deg, #38bdf8 0%, #93c5fd 50%, #c4b5fd 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  rotatingTargetIcon: {
    width: "1.1em",
    height: "1.1em",
    marginRight: "0.1em",
    flexShrink: 0,
    fontSize: "inherit !important",
    color: "#7dd3fc",
    WebkitTextFillColor: "initial",
  },
  "@keyframes rotateTarget": {
    "0%, 20%": {
      transform: "translateY(0)",
    },
    "25%, 45%": {
      transform: "translateY(-1.08em)",
    },
    "50%, 70%": {
      transform: "translateY(-2.16em)",
    },
    "75%, 100%": {
      transform: "translateY(-3.24em)",
    },
  },
  signalGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: theme.spacing(1.2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2.5),
    },
    "@media (max-width: 359px)": {
      gridTemplateColumns: "1fr",
    },
  },
  signalCard: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    minWidth: 0,
    padding: theme.spacing(1.15, 1.35),
    borderRadius: "14px",
    background: "rgba(15, 23, 42, 0.48)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
  },
  signalIcon: {
    width: "34px",
    height: "34px",
    flex: "0 0 34px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    color: "#7dd3fc",
    background: "rgba(56, 189, 248, 0.1)",
    border: "1px solid rgba(125, 211, 252, 0.16)",
    "& svg": {
      fontSize: "1.05rem",
    },
  },
  signalCopy: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    gap: "2px",
  },
  signalValue: {
    color: "#7dd3fc",
    fontSize: "1rem",
    fontWeight: 850,
    letterSpacing: "-0.2px",
    whiteSpace: "nowrap",
  },
  signalLabel: {
    color: "#cbd5e1",
    fontSize: "0.77rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  promptPanel: {
    borderRadius: "24px",
    border: "1px solid rgba(191, 219, 254, 0.34)",
    boxShadow: "0 24px 60px rgba(2, 6, 23, 0.34), inset 0 1px 0 rgba(255,255,255,0.88)",
    background: "rgba(248, 250, 252, 0.97)",
    padding: theme.spacing(2.4),
    marginBottom: theme.spacing(2.3),
    [theme.breakpoints.down("sm")]: {
      borderRadius: "18px",
      padding: theme.spacing(1.6),
    },
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1.2),
    gap: theme.spacing(1),
  },
  panelLabel: {
    margin: 0,
    fontWeight: 800,
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#334155",
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.55),
    borderRadius: "999px",
    background: "rgba(16, 185, 129, 0.12)",
    border: "1px solid rgba(16, 185, 129, 0.25)",
    color: "#065f46",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.1px",
    padding: theme.spacing(0.35, 1),
    "& svg": {
      fontSize: "0.9rem",
    },
  },
  promptInputShell: {
    borderRadius: "18px",
    padding: theme.spacing(1),
    background: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(239,246,255,0.85) 100%)",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
    transition: "all 0.2s ease",
    "&:focus-within": {
      borderColor: "rgba(37, 99, 235, 0.55)",
      boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.12)",
    },
  },
  promptInput: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      alignItems: "flex-start",
      background: "#ffffff",
      padding: theme.spacing(1.5, 1),
      "& textarea": {
        fontSize: "1.1rem",
        fontWeight: 500,
        color: "#0f172a",
        lineHeight: 1.65,
        letterSpacing: "-0.01em",
        padding: theme.spacing(0.5, 1),
        [theme.breakpoints.down("sm")]: {
          fontSize: "1rem",
          lineHeight: 1.6,
        },
      },
      "& fieldset": {
        borderWidth: "1.5px",
        borderColor: "rgba(148, 163, 184, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(37, 99, 235, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#2563eb",
        boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.1)",
      },
    },
  },
  promptFooter: {
    marginTop: theme.spacing(1.35),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: theme.spacing(1.5),
  },
  actionsWrap: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "space-between",
    },
  },
  charCount: {
    fontSize: "0.8rem",
    color: "#64748b",
    background: "rgba(241, 245, 249, 0.7)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: "10px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    padding: theme.spacing(0.6, 1.2),
    minWidth: "85px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.02em",
    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.03)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(241, 245, 249, 0.9)",
      borderColor: "rgba(37, 99, 235, 0.2)",
    },
  },
  generateBtn: {
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "0.95rem",
    textTransform: "none",
    padding: theme.spacing(1.25, 2.7),
    color: "#ffffff",
    background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
    boxShadow: "0 12px 30px rgba(37, 99, 235, 0.33)",
    "&:hover": {
      background: "linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)",
      boxShadow: "0 14px 32px rgba(37, 99, 235, 0.36)",
      transform: "translateY(-1px)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },
  exampleWrap: {
    marginBottom: 0,
  },
  exampleLabel: {
    color: "#94a3b8",
    fontSize: "0.9rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: theme.spacing(1.2),
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  exampleChip: {
    borderRadius: "999px",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    background: "rgba(15, 23, 42, 0.46)",
    color: "#dbeafe",
    fontWeight: 500,
    maxWidth: "100%",
    "& .MuiChip-label": {
      whiteSpace: "normal",
      display: "block",
      lineHeight: 1.45,
      fontSize: "0.9rem",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    "&:hover": {
      background: "rgba(37, 99, 235, 0.24)",
      borderColor: "rgba(125, 211, 252, 0.42)",
    },
  },
}));

export default function PromptGeneratorHero() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [prompt, setPrompt] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [targetPrompt, setTargetPrompt] = React.useState("");

  React.useEffect(() => {
    if (hasInteracted) return;

    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setTargetPrompt(randomPrompt);
    let index = 0;
    let timeoutId;
    setIsTyping(true);

    const type = () => {
      if (index <= randomPrompt.length) {
        const currentText = randomPrompt.slice(0, index);
        setPrompt(currentText);
        
        const lastChar = randomPrompt[index - 1];
        let delay = Math.random() * 15 + 15; // Natural pace (15-30ms)

        if (lastChar === ".") delay = 450; 
        if (lastChar === ",") delay = 200; 

        index++;
        timeoutId = setTimeout(type, delay);
      } else {
        setIsTyping(false);
      }
    };

    const startDelayId = setTimeout(type, 700);

    return () => {
      clearTimeout(startDelayId);
      clearTimeout(timeoutId);
    };
  }, [hasInteracted]);

  const openStudio = () => {
    const finalPrompt = (!hasInteracted && targetPrompt) ? targetPrompt : prompt;
    const encodedPrompt = encodeURIComponent(finalPrompt.trim());
    window.location.href = `https://studio.flutterpilot.com?prompt=${encodedPrompt}`;
  };

  const handleInputChange = (event) => {
    setHasInteracted(true);
    setPrompt(clampPrompt(event.target.value));
  };

  const handleExampleSelection = (samplePrompt) => {
    setHasInteracted(true);
    setPrompt(clampPrompt(samplePrompt));
  };

  return (
    <Container maxWidth={false} disableGutters>
      <section className={classes.sectionWrap}>
        <span className={classes.badge}>
          <AutoAwesomeRoundedIcon style={{ fontSize: "1rem" }} />
          FlutterPilot Studio · AI + visual development
        </span>

        <Typography
          component="h1"
          className={classes.sectionTitle}
          aria-label="Build a real Flutter mobile, desktop, or web app from a prompt—then make every detail yours"
        >
          Build a real Flutter{" "}
          <span className={classes.rotatingTarget} aria-hidden="true">
            <span className={classes.rotatingTargetTrack}>
              {[...platformTargets, platformTargets[0]].map((target, index) => (
                <span className={classes.rotatingTargetWord} key={`${target.label}-${index}`}>
                  {React.cloneElement(target.icon, {
                    className: classes.rotatingTargetIcon,
                    "aria-hidden": true,
                  })}
                  {target.label}
                </span>
              ))}
            </span>
          </span>
          <br />
          app from a prompt—<span className={classes.titleAccent}>then make every detail yours</span>
        </Typography>
        <Typography component="p" className={classes.sectionSubtitle}>
          Generate a multi-screen project, refine every widget visually, add real logic and data,
          preview across devices, then export the Flutter source or deploy to the web in one click.
        </Typography>

        <Box className={classes.signalGrid} aria-label="FlutterPilot platform capabilities">
          {productSignals.map((signal) => (
            <Box className={classes.signalCard} key={signal.label}>
              <span className={classes.signalIcon} aria-hidden="true">{signal.icon}</span>
              <span className={classes.signalCopy}>
                <span className={classes.signalValue}>{signal.value}</span>
                <span className={classes.signalLabel}>{signal.label}</span>
              </span>
            </Box>
          ))}
        </Box>

        <Paper elevation={0} className={classes.promptPanel}>
          <Box className={classes.panelHeader}>
            <p className={classes.panelLabel}>Prompt</p>
            <span className={classes.statusPill}>
              <CheckCircleRoundedIcon aria-hidden="true" />
              AI Ready
            </span>
          </Box>
          <Box className={classes.promptInputShell}>
            <TextField
              multiline
              minRows={5}
              maxRows={7}
              fullWidth
              variant="outlined"
              placeholder="Create a finance app with dashboard, transactions list, spending charts, and onboarding flow..."
              value={isTyping ? `${prompt}|` : prompt}
              onChange={handleInputChange}
              spellCheck={false}
              className={classes.promptInput}
              aria-label="App generation prompt"
            />
          </Box>

          <Box className={classes.promptFooter}>
            <Box className={classes.actionsWrap}>
              <span className={classes.charCount}>
                {prompt.length}/{MAX_PROMPT_LENGTH}
              </span>
              <Button
                className={classes.generateBtn}
                onClick={openStudio}
                endIcon={<RocketLaunchRoundedIcon />}
              >
                Generate
              </Button>
            </Box>
          </Box>
        </Paper>

        <Box className={classes.exampleWrap}>
          <Typography component="p" className={classes.exampleLabel}>
            Try these
          </Typography>
          <Box className={classes.chipRow}>
            {(isMobile ? examplePrompts.slice(0, 2) : examplePrompts).map((samplePrompt) => (
              <Chip
                key={samplePrompt}
                label={toChipPreview(samplePrompt)}
                clickable
                onClick={() => handleExampleSelection(samplePrompt)}
                className={classes.exampleChip}
              />
            ))}
          </Box>
        </Box>

      </section>
    </Container>
  );
}
