import React from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";

const useStyles = makeStyles((theme) => ({
  pageWrap: {
    // Standardized via commonStyles.responsiveContainer
  },
  sectionGap: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  headerCard: {
    borderRadius: "18px",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
    padding: theme.spacing(3, 3.2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.3, 2),
    },
  },
  eyebrow: {
    margin: 0,
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontSize: "0.76rem",
    fontWeight: 700,
    color: "#1d4ed8",
  },
  title: {
    margin: 0,
    marginBottom: theme.spacing(1),
    color: "#0f172a",
    fontSize: "2.05rem",
    lineHeight: 1.16,
    letterSpacing: "-0.38px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.62rem",
    },
  },
  subtitle: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.75,
    maxWidth: "780px",
  },
  policyCard: {
    background: "rgba(255, 255, 255, 0.96)",
    borderRadius: "20px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
    padding: theme.spacing(4),
    border: "1px solid rgba(148, 163, 184, 0.22)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5),
      borderRadius: "16px",
    },
  },
}));

export default function PrivacyPolicy() {
  const classes = commonStyles();
  const localClasses = useStyles();

  return (
    <CustomAppBar type="privacyPolicy">
      <div className={classes.responsiveContainer}>
        <Container className={localClasses.headerCard} maxWidth={false} disableGutters>
          <p className={localClasses.eyebrow}>Legal</p>
          <h1 className={localClasses.title}>Privacy Policy</h1>
          <p className={localClasses.subtitle}>
            Last updated: July 26, 2025. This page explains what data we collect, why we collect it, and how we protect it.
          </p>
        </Container>

        <main className={localClasses.sectionGap}>
          <div className={localClasses.policyCard}>
            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>1. Introduction</h2>
              <p className={classes.contentText}>
                Welcome to FlutterPilot. We are committed to protecting your personal information and your right to privacy.
                This Privacy Policy describes how your information is collected, used, and shared when you use our web app.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>2. Information We Collect</h2>
              <p className={classes.contentText}>
                We collect minimal personal data necessary for operation, such as email, usage logs, and cookies to enhance user experience.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>3. How We Use Information</h2>
              <p className={classes.contentText}>
                We use the collected data to improve our service, provide support, send updates, and ensure platform security.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>4. Third-Party Services</h2>
              <p className={classes.contentText}>
                We do not sell your data. Some trusted tools may be used for analytics, performance monitoring, or support.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>5. Your Rights</h2>
              <p className={classes.contentText}>
                You can request access, update, or delete your personal data. Contact our support at{" "}
                <a href="mailto:fromamsoftwares@gmail.com" className={classes.contentLink}>fromamsoftwares@gmail.com</a>.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>6. Changes to This Policy</h2>
              <p className={classes.contentText}>
                We may revise this Privacy Policy from time to time. We will notify you of significant changes via email or platform notice.
              </p>
            </section>
          </div>
        </main>
      </div>
    </CustomAppBar>
  );
}
