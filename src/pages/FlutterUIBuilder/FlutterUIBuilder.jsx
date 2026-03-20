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
    fontSize: "2rem",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2.5),
    color: "#1e293b",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
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
  check: {
    color: "#10b981",
    fontWeight: 700,
  },
  cross: {
    color: "#ef4444",
    fontWeight: 700,
  }
}));

export default function FlutterUIBuilder() {
  const classes = useStyles();
  const common = commonStyles();

  return (
    <CustomAppBar type="flutter-ui-builder">
      <main className={common.responsiveContainer}>
        <Box className={classes.content}>
          <Typography variant="h1" className={classes.heading1}>
            Flutter UI Builder with AI – Build Flutter Apps Faster
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            Building UI in Flutter is powerful, but it can get repetitive — layouts, spacing, and restructuring widgets again and again.
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            A <strong>Flutter UI builder</strong> helps speed this up by letting you create UI visually or generate it automatically.
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot is an attempt to make this faster using AI while still keeping full control over your Flutter code.
          </Typography>
          
          <Typography variant="body1" className={classes.paragraph}>
            👉 <a href="https://flutterpilot.com" className={classes.link}>https://flutterpilot.com</a>
          </Typography>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            What is a Flutter UI Builder?
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            A Flutter UI builder is a tool that helps developers create user interfaces without writing everything manually.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Instead of building layouts line by line, you can:
          </Typography>
          <ul className={classes.list}>
            <li>design UI visually</li>
            <li>generate layouts faster</li>
            <li>reduce repetitive work</li>
          </ul>
          <Typography variant="body1" className={classes.paragraph}>
            This is especially useful for:
          </Typography>
          <ul className={classes.list}>
            <li>rapid prototyping</li>
            <li>MVPs</li>
            <li>speeding up development</li>
          </ul>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Why FlutterPilot
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot focuses on making UI development faster without hiding how Flutter works.
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            With FlutterPilot, you can:
          </Typography>
          <ul className={classes.list}>
            <li>generate UI using simple prompts</li>
            <li>build layouts visually</li>
            <li>get structured Flutter widget output</li>
          </ul>
          <Typography variant="body1" className={classes.paragraph}>
            The goal is not to replace coding, but to <strong>reduce the time spent on repetitive UI work</strong>.
          </Typography>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            FlutterPilot vs FlutterFlow
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            Tools like FlutterFlow already exist, but they take a different approach.
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
                  <TableCell className={classes.tableCell}>Code control</TableCell>
                  <TableCell align="center" className={classes.tableCell}>High</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Limited</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Developer-focused</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Yes</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Partial</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell className={classes.tableCell}>Flexibility</TableCell>
                  <TableCell align="center" className={classes.tableCell}>High</TableCell>
                  <TableCell align="center" className={classes.tableCell}>Moderate</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot is designed to stay closer to real Flutter development while improving speed.
          </Typography>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Who is this for?
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            FlutterPilot can be useful if you:
          </Typography>
          <ul className={classes.list}>
            <li>build apps using Flutter regularly</li>
            <li>want to speed up UI development</li>
            <li>are exploring low-code or AI-assisted tools</li>
          </ul>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <Typography variant="h2" className={classes.heading2}>
            Try FlutterPilot
          </Typography>
          <Typography variant="body1" className={classes.paragraph}>
            If you’re looking for a <strong>Flutter UI builder</strong> that combines AI and visual tools:
          </Typography>
          <Box sx={{ mt: 3, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                <a href="https://flutterpilot.com" className={classes.link}>👉 Go to FlutterPilot.com</a>
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.paragraph}>
            Feedback is always welcome — still improving this based on real use.
          </Typography>
        </Box>
      </main>
    </CustomAppBar>
  );
}
