import React from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";

const useStyles = makeStyles((theme) => ({
  pageWrap: {
    width: "90%",
    maxWidth: "1500px",
    margin: "0 auto",
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      paddingTop: theme.spacing(3),
    },
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
      <div className={localClasses.pageWrap}>
        <Container className={localClasses.headerCard} maxWidth={false} disableGutters>
          <p className={localClasses.eyebrow}>Company</p>
          <h1 className={localClasses.title}>About Us</h1>
          <p className={localClasses.subtitle}>
            FlutterPilot helps teams move from idea to Flutter app faster with AI generation and visual editing.
          </p>
        </Container>

        <main className={localClasses.sectionGap}>
          <div className={localClasses.aboutCard}>
            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>Our Mission</h2>
              <p className={classes.contentText}>
                FlutterPilot is on a mission to simplify app development by combining Generative AI with a powerful visual editor.
                We empower developers to bridge the gap between idea and code, enabling rapid UI scaffolding and screen generation for Flutter apps.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>What We Offer</h2>
              <ul className={classes.contentList}>
                <li className={classes.contentListItem}><strong>AI UI Generation:</strong> Generate basic screens, layouts, and structures with text prompts.</li>
                <li className={classes.contentListItem}><strong>Visual Designer:</strong> Refine and customize your generated UI with a drag-and-drop editor.</li>
                <li className={classes.contentListItem}><strong>Figma Integration:</strong> Convert Figma designs into functional Flutter UI code.</li>
                <li className={classes.contentListItem}><strong>API Tools:</strong> Import Postman collections and test endpoints directly.</li>
                <li className={classes.contentListItem}><strong>Real-time Editing:</strong> Collaborate with your team and track changes with built-in commits.</li>
                <li className={classes.contentListItem}><strong>Code Export:</strong> Export clean Flutter code and integrate it into your project.</li>
              </ul>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>Why Choose FlutterPilot?</h2>
              <p className={classes.contentText}>
                We believe developers should spend more time on creativity and logic, and less on repetitive UI boilerplate.
                Our platform gives you speed, flexibility, and control in one visually intuitive interface.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>Contact Details</h2>
              <div className={classes.contentInfoBox}>
                <p className={classes.contentText}><strong>Address:</strong> AM Softwares, Kolikhad Farm, Modasa, Gujarat, India, 383315</p>
                <p className={classes.contentText}><strong>Email:</strong> <a href="mailto:fromamsoftwares@gmail.com" className={classes.contentLink}>fromamsoftwares@gmail.com</a></p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </CustomAppBar>
  );
}
