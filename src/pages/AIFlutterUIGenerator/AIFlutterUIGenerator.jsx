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

export default function AIFlutterUIGenerator() {
  const classes = useStyles();
  const common = commonStyles();

  return (
    <CustomAppBar type="ai-flutter-ui-generator">
      <main className={common.responsiveContainer}>
        <Box className={classes.content}>
          <Typography variant="h1" className={classes.heading1}>
            AI Flutter UI Generator – FlutterPilot
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            Flutter UI development is fast — until it isn't. Repetitive layouts, widget nesting, and spacing decisions slow you down. FlutterPilot uses AI to generate Flutter UI from simple text prompts, so you can spend less time on boilerplate and more time building.
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            👉 <a href="https://flutterpilot.com" className={classes.link}>Try FlutterPilot → flutterpilot.com</a>
          </Typography>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            What Is an AI Flutter UI Generator?
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            An AI Flutter UI generator lets you describe a screen or component in plain language and instantly get structured, usable Flutter code. No manual scaffolding. No guessing at widget trees.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot is built specifically for Flutter developers — combining AI generation with a visual editor and real Dart output.
          </Typography>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            How FlutterPilot Works
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot keeps you in control while removing the tedious parts:
          </Typography>
          <ul className={classes.list}>
            <li><strong>Generate UI from prompts</strong> — describe screens, dialogs, or layouts in plain text</li>
            <li><strong>Edit visually</strong> — drag-and-drop builder for layout adjustments</li>
            <li><strong>Customize with Dart</strong> — use real Dart expressions throughout</li>
            <li><strong>Export clean Flutter code</strong> — production-ready, not just mockups</li>
          </ul>
          <Typography variant="body1" className={classes.paragraph}>
            Hot reload and restart run in under 300ms, so your feedback loop stays tight.
          </Typography>

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
                  <TableCell className={classes.tableCell}>Prompt-to-Flutter in seconds</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Visual builder</TableCell>
                  <TableCell className={classes.tableCell}>Drag-and-drop layout editing</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Full code export</TableCell>
                  <TableCell className={classes.tableCell}>Clean, exportable Flutter/Dart code</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Realtime preview</TableCell>
                  <TableCell className={classes.tableCell}>Live rendering as you build</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Fast hot-reload</TableCell>
                  <TableCell className={classes.tableCell}>Under 300ms</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>API integration</TableCell>
                  <TableCell className={classes.tableCell}>Minimal setup required</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Why Use an AI Flutter UI Generator?
          </Typography>
          <ul className={classes.list}>
            <li>Cut time spent on repetitive UI scaffolding</li>
            <li>Prototype and iterate on layouts in minutes</li>
            <li>Reduce context-switching between design and code</li>
            <li>Speed up MVPs without sacrificing code quality</li>
          </ul>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Who Is FlutterPilot For?
          </Typography>
          <ul className={classes.list}>
            <li>Flutter developers building production apps</li>
            <li>Teams moving fast on MVPs and prototypes</li>
            <li>Developers exploring AI-assisted workflows</li>
          </ul>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Try FlutterPilot
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            If you're building Flutter UIs and want to move faster, FlutterPilot is worth trying.
          </Typography>
          <Box sx={{ mt: 3, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                <a href="https://flutterpilot.com" className={classes.link}>👉 flutterpilot.com</a>
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.paragraph}>
            Actively developed and improved based on real usage. Feedback welcome.
          </Typography>
        </Box>
      </main>
    </CustomAppBar>
  );
}
