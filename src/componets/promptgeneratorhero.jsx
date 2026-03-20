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
import { makeStyles } from "@mui/styles";

const MAX_PROMPT_LENGTH = 290;

const examplePrompts = [
  "A clean, minimalist sneaker store app featuring high-contrast product cards, a seamless 'swipe-to-buy' interaction, and a monochrome color palette with neon accents.",
  "An immersive travel booking app for Kyoto, utilizing full-screen photography, elegant serif typography, and an interactive map overlay for hidden local gems",
  "A high-energy workout companion using bold typography and bright distinct colors, featuring a streak-based progress ring and social leaderboard integration.",
  "A soft-UI smart home controller with rounded buttons, a neumorphic design style, and intuitive sliders for adjusting lighting warmth and temperature.",
  "A calming meditation timer featuring organic shapes, a pastel gradient background that shifts over time, and a soothing, clutter-free audio player interface.",
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
    background: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
    border: "1px solid rgba(255, 255, 255, 0.65)",
    boxShadow: "0 26px 64px rgba(15, 23, 42, 0.1)",
    padding: theme.spacing(6, 5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(5, 3),
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "22px",
      padding: theme.spacing(4, 2),
    },
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1),
    borderRadius: "999px",
    border: "1px solid rgba(37, 99, 235, 0.22)",
    background: "rgba(37, 99, 235, 0.08)",
    color: "#1d4ed8",
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.2px",
    padding: theme.spacing(0.7, 1.4),
    marginBottom: theme.spacing(1.6),
  },
  sectionTitle: {
    color: "#0f172a",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    fontSize: "2.7rem",
    lineHeight: 1.08,
    margin: 0,
    marginBottom: theme.spacing(1.5),
    maxWidth: "860px",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75rem",
    },
  },
  sectionSubtitle: {
    color: "rgba(15, 23, 42, 0.72)",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: 0,
    marginBottom: theme.spacing(3),
    maxWidth: "560px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.93rem",
      marginBottom: theme.spacing(2.5),
    },
  },
  promptPanel: {
    borderRadius: "24px",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
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
    borderRadius: "999px",
    background: "rgba(16, 185, 129, 0.12)",
    border: "1px solid rgba(16, 185, 129, 0.25)",
    color: "#065f46",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.1px",
    padding: theme.spacing(0.35, 1),
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
    color: "#475569",
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
    border: "1px solid rgba(148, 163, 184, 0.38)",
    background: "rgba(248, 250, 252, 0.95)",
    color: "#1f2937",
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
      background: "rgba(219, 234, 254, 0.9)",
      borderColor: "rgba(59, 130, 246, 0.45)",
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
          AI App Generator
        </span>

        <Typography component="h1" className={classes.sectionTitle}>
          Generate a Flutter app from a prompt
        </Typography>
        <Typography component="p" className={classes.sectionSubtitle}>
          Describe your idea, click generate, and start editing.
        </Typography>

        <Paper elevation={0} className={classes.promptPanel}>
          <Box className={classes.panelHeader}>
            <p className={classes.panelLabel}>Prompt</p>
            <span className={classes.statusPill}>AI Ready</span>
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
