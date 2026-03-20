import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Box, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    color: "#0f172a",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  heading1: {
    fontWeight: 800,
    fontSize: "2.8rem",
    lineHeight: 1.2,
    marginBottom: theme.spacing(3),
    background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  heading2: {
    fontWeight: 700,
    fontSize: "2rem",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2.5),
    color: "#1e293b",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  heading3: {
    fontWeight: 700,
    fontSize: "1.4rem",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    color: "#334155",
  },
  paragraph: {
    fontSize: "1.15rem",
    lineHeight: 1.8,
    color: "#334155",
    marginBottom: theme.spacing(2.5),
  },
  list: {
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    "& li": {
      fontSize: "1.15rem",
      lineHeight: 1.8,
      color: "#334155",
      marginBottom: theme.spacing(1.2),
      listStyleType: "disc",
    },
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 700,
    transition: "color 0.2s ease",
    "&:hover": {
      color: "#1d4ed8",
      textDecoration: "underline",
    },
  },
  tableContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    "& .MuiTableCell-head": {
      fontWeight: 700,
      color: "#0f172a",
      fontSize: "1.05rem",
      padding: theme.spacing(2),
    },
  },
  tableCell: {
    fontSize: "1.05rem",
    padding: theme.spacing(2),
    color: "#475569",
  },
}));

export default function FlutterAppBuilder() {
  const classes = useStyles();
  const common = commonStyles();

  return (
    <CustomAppBar type="flutter-app-builder">
      <main className={common.responsiveContainer}>
        <Box className={classes.content}>
          <Typography variant="h1" className={classes.heading1}>
            Flutter App Builder – FlutterPilot
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            Starting a Flutter app from scratch means wiring up UI, navigation, state, and APIs before you've written a single line of business logic. FlutterPilot is a Flutter app builder that handles the scaffolding — so you ship faster without giving up code ownership.
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            👉 <a href="https://flutterpilot.com" className={classes.link}>Try FlutterPilot → flutterpilot.com</a>
          </Typography>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            What Is a Flutter App Builder?
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            A Flutter app builder is a tool that helps developers create full applications without writing everything by hand. Instead of setting up boilerplate from scratch, you get visual tools, AI generation, and pre-wired structure — while still owning the output code.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot is built specifically for Flutter, with real Dart output at every step.
          </Typography>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            How FlutterPilot Works
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot covers the full app-building workflow:
          </Typography>
          <ul className={classes.list}>
            <li><strong>Start from a prompt or template</strong> — generate a project structure using AI or pick a starting point</li>
            <li><strong>Build screens visually</strong> — drag-and-drop UI editor with realtime preview</li>
            <li><strong>Handle navigation automatically</strong> — screens and routing generated together</li>
            <li><strong>Integrate APIs easily</strong> — import Postman JSON, test endpoints, and use them directly in your UI</li>
          </ul>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Key Features
          </Typography>
          
          <TableContainer component={Paper} className={classes.tableContainer} elevation={0}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell className={classes.tableCell}>Feature</TableCell>
                  <TableCell className={classes.tableCell}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>AI UI generation</TableCell>
                  <TableCell className={classes.tableCell}>Prompt-to-screen in seconds</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Visual UI builder</TableCell>
                  <TableCell className={classes.tableCell}>Drag-and-drop with live preview</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Full code export</TableCell>
                  <TableCell className={classes.tableCell}>Clean Flutter/Dart, export anytime</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>API integration</TableCell>
                  <TableCell className={classes.tableCell}>Import Postman JSON, test and connect</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Prebuilt components</TableCell>
                  <TableCell className={classes.tableCell}>Ready-to-use widgets and methods</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Fast hot-reload</TableCell>
                  <TableCell className={classes.tableCell}>Under 300ms feedback loop</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            What Makes FlutterPilot Different
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Most low-code tools lock you in. FlutterPilot doesn't:
          </Typography>
          <ul className={classes.list}>
            <li><strong>No lock-in</strong> — export full Flutter code at any point</li>
            <li><strong>Unlimited projects</strong> — no artificial project caps</li>
            <li><strong>Full Dart customization</strong> — override or extend anything with real code</li>
            <li><strong>Developer-first</strong> — built for developers, not designers replacing them</li>
          </ul>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Who Is FlutterPilot For?
          </Typography>
          <ul className={classes.list}>
            <li>Flutter developers who want to eliminate repetitive setup</li>
            <li>Startups building and iterating on MVPs quickly</li>
            <li>Teams looking for a low-code layer that doesn't sacrifice code quality</li>
            <li>Developers experimenting with AI-assisted workflows</li>
          </ul>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Try FlutterPilot
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            If you're looking for a Flutter app builder that combines AI, visual tools, and full code control — give it a try.
          </Typography>
          <Box sx={{ mt: 3, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                <a href="https://flutterpilot.com" className={classes.link}>👉 flutterpilot.com</a>
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.paragraph}>
            Actively developed. Feedback always welcome.
          </Typography>
        </Box>
      </main>
    </CustomAppBar>
  );
}
