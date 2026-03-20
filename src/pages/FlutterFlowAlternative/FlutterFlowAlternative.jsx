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
  section: {
    marginBottom: theme.spacing(6),
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
    fontSize: "2.2rem",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    color: "#1e293b",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },
  heading3: {
    fontWeight: 700,
    fontSize: "1.5rem",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    color: "#334155",
  },
  paragraph: {
    fontSize: "1.2rem",
    lineHeight: 1.8,
    color: "#334155",
    marginBottom: theme.spacing(3),
  },
  list: {
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(3),
    "& li": {
      fontSize: "1.2rem",
      lineHeight: 1.8,
      color: "#334155",
      marginBottom: theme.spacing(1.5),
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
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    "& .MuiTableCell-head": {
      fontWeight: 800,
      color: "#0f172a",
      fontSize: "1.1rem",
      padding: theme.spacing(2.5),
    },
  },
  tableCell: {
    fontSize: "1.1rem",
    padding: theme.spacing(2.5),
    color: "#475569",
  },
  check: {
    color: "#10b981",
    fontWeight: 800,
    fontSize: "1.2rem",
  },
  cross: {
    color: "#ef4444",
    fontWeight: 800,
    fontSize: "1.2rem",
  }
}));

export default function FlutterFlowAlternative() {
  const classes = useStyles();
  const common = commonStyles();

  return (
    <CustomAppBar type="flutterflow-alternative">
      <main className={common.responsiveContainer}>
        <Box className={classes.content}>
          <Typography variant="h1" className={classes.heading1}>
            FlutterFlow Alternative – Build Flutter Apps Faster with AI
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            If you're looking for a <strong>FlutterFlow alternative</strong>, you're probably trying to build Flutter apps faster without getting stuck in limitations.
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot is a different approach — combining AI, visual building, and full code control.
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            👉 <a href="https://flutterpilot.com" className={classes.link}>https://flutterpilot.com</a>
          </Typography>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            Why look for a FlutterFlow alternative?
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Tools like FlutterFlow are useful, but developers often run into issues like:
          </Typography>
          <ul className={classes.list}>
            <li>limited control over generated code</li>
            <li>difficulty customizing complex logic</li>
            <li>dependency on the platform</li>
          </ul>
          <Typography variant="body1" className={classes.paragraph}>
            If you want more flexibility and control, you’ll eventually look for alternatives.
          </Typography>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            What is FlutterPilot?
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot is a <strong>Flutter UI builder with AI and low-code tools</strong> designed for developers who want speed without losing control.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            You can:
          </Typography>
          <ul className={classes.list}>
            <li>generate UI using prompts</li>
            <li>build screens visually</li>
            <li>export full Flutter code</li>
            <li>customize everything using Dart</li>
          </ul>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            Key differences from FlutterFlow
          </Typography>
          
          <TableContainer component={Paper} className={classes.tableContainer} elevation={0}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell className={classes.tableCell}>Feature</TableCell>
                  <TableCell align="center" className={classes.tableCell}>FlutterPilot</TableCell>
                  <TableCell align="center" className={classes.tableCell}>FlutterFlow</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>AI UI generation</TableCell>
                  <TableCell align="center" className={classes.tableCell}><span className={classes.check}>✅</span></TableCell>
                  <TableCell align="center" className={classes.tableCell}><span className={classes.cross}>❌</span></TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Code export</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Full</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Limited</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Lock-in</TableCell>
                  <TableCell align="center" className={classes.tableCell}>No</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Yes</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Customization</TableCell>
                  <TableCell align="center" className={classes.tableCell}>High</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Moderate</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Developer control</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Full</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Partial</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot focuses on giving you speed while keeping everything flexible.
          </Typography>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            What you can do with FlutterPilot
          </Typography>
          <ul className={classes.list}>
            <li>Create projects using AI prompts, templates, or Figma</li>
            <li>Generate screens, dialogs, and navigation automatically</li>
            <li>Build UI using drag and drop</li>
            <li>Add custom components or build from scratch</li>
            <li>Integrate APIs using Postman JSON</li>
            <li>Run apps instantly with realtime preview</li>
            <li>Export full Flutter code with working navigation and APIs</li>
          </ul>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            Why FlutterPilot stands out
          </Typography>
          <ul className={classes.list}>
            <li><strong>No lock-in</strong> — export full code anytime</li>
            <li><strong>No subscription required for code export</strong></li>
            <li><strong>Unlimited projects</strong> — build freely</li>
            <li><strong>Deep customization</strong> — full Dart-level control</li>
            <li><strong>Fast hot-reload & restart</strong> — under 300 ms</li>
          </ul>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            Who should use FlutterPilot?
          </Typography>
          <ul className={classes.list}>
            <li>Developers who feel limited by FlutterFlow</li>
            <li>Teams building MVPs quickly</li>
            <li>Developers who want AI-assisted UI building</li>
            <li>Anyone looking for a more flexible FlutterFlow alternative</li>
          </ul>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            Final thoughts
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterFlow works well for certain use cases, but if you want more control and flexibility, it can feel restrictive over time.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot is built for developers who want:
          </Typography>
          <ul className={classes.list}>
            <li>speed</li>
            <li>flexibility</li>
            <li>full ownership of code</li>
          </ul>

          <Divider sx={{ my: 7, opacity: 0.5 }} />

          <Typography variant="h2" className={classes.heading2}>
            Try FlutterPilot
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            If you're exploring a <strong>FlutterFlow alternative</strong>, you can try it here:
          </Typography>
          <Box sx={{ mt: 3, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                <a href="https://flutterpilot.com" className={classes.link}>👉 Go to FlutterPilot.com</a>
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.paragraph}>
            Still improving this based on real feedback — feel free to try and share your thoughts.
          </Typography>
        </Box>
      </main>
    </CustomAppBar>
  );
}
