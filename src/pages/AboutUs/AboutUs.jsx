import React from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { CHANGELOG_PATH } from "../../seo/seo";
import { studioUrl } from "../../utils/studioLinks";

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
  aboutCard: {
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

export default function AboutUs() {
  const classes = commonStyles();
  const localClasses = useStyles();

  return (
    <CustomAppBar type="aboutUs">
      <div className={classes.responsiveContainer}>
        <Container className={localClasses.headerCard} maxWidth={false} disableGutters>
          <p className={localClasses.eyebrow}><GroupsRoundedIcon fontSize="small" aria-hidden="true" /> Company</p>
          <h1 className={localClasses.title}>About FlutterPilot</h1>
          <p className={localClasses.subtitle}>
            FlutterPilot is an AI-assisted visual builder for Flutter apps. Describe an app to generate an editable
            starter project, refine it with real Flutter widgets, actions, and data connections, then export the Flutter
            source, build an Android APK, or publish a web app.
          </p>
        </Container>

        <main className={localClasses.sectionGap}>
          <div className={localClasses.aboutCard}>
            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>Our approach</h2>
              <p className={classes.contentText}>
                AI should give you a fast first draft, not a black box. FlutterPilot generates real Flutter widget trees that
                you keep editing visually, so every screen stays understandable and changeable. When you are ready, the
                Flutter project is yours to export and continue in your own tools.
              </p>
              <p className={classes.contentText}>
                We label features that are still in Beta and publish what changed in each release in the{" "}
                <a href={CHANGELOG_PATH} className={classes.contentLink}>changelog</a>.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>What FlutterPilot does</h2>
              <ul className={classes.contentList}>
                <li className={classes.contentListItem}><strong>AI generation:</strong> Generate a multi-screen Starter App from a prompt, then ask the AI Agent (Beta) to create or edit screens, components, state, and API endpoints.</li>
                <li className={classes.contentListItem}><strong>Visual Flutter editor:</strong> Build with more than 130 Flutter widgets using a widget tree, device canvas, and property panel, with Dart expressions in any property.</li>
                <li className={classes.contentListItem}><strong>Behavior and data:</strong> Add navigation, conditions, sign-in, API calls, and data writes with 40+ action types; connect REST APIs (including Postman import), local collections, and Google Sheets, Firebase, or Supabase (Beta).</li>
                <li className={classes.contentListItem}><strong>Figma import (Beta):</strong> Bring a Figma design into the Studio as editable Flutter widgets.</li>
                <li className={classes.contentListItem}><strong>Version history and sharing:</strong> Save commits, restore earlier versions, and add collaborators to a project.</li>
                <li className={classes.contentListItem}><strong>Delivery:</strong> Export the complete Flutter project as a ZIP, build an installable Android APK in the cloud, or publish a hosted web app.</li>
              </ul>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>Where you can use it</h2>
              <p className={classes.contentText}>
                FlutterPilot Studio runs in the browser at{" "}
                <a href={studioUrl({ campaign: "about-us", content: "about-text" })} target="_blank" rel="noopener noreferrer" className={classes.contentLink}>studio.flutterpilot.com</a>,
                and as apps for Windows, macOS, Android, and iOS. Your projects are saved to your account, so you can switch
                between devices.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>How it is priced</h2>
              <p className={classes.contentText}>
                FlutterPilot has no subscription. AI generation and cloud builds use pay-as-you-go credits, and exporting your
                Flutter project doesn't use credits. See{" "}
                <a href="/#pricing-and-delivery" className={classes.contentLink}>what it costs and what you can ship</a>.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>Contact Details</h2>
              <div className={classes.contentInfoBox}>
                <p className={classes.contentText}><strong>Address:</strong> AM Softwares, Kolikhad Farm, Modasa, Gujarat, India, 383315</p>
                <p className={classes.contentText}><strong>Email:</strong> <a href="mailto:support@flutterpilot.com" className={classes.contentLink}>support@flutterpilot.com</a></p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </CustomAppBar>
  );
}
