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
  textBlock: {
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      marginBottom: 0,
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
            Last updated: July 3, 2026. This page explains what data we collect, why we collect it, and how we protect it,
            including data accessed through Google services when you use FlutterPilot's Sheets Integration.
          </p>
        </Container>

        <main className={localClasses.sectionGap}>
          <div className={localClasses.policyCard}>
            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>1. Introduction</h2>
              <p className={classes.contentText}>
                Welcome to FlutterPilot, a low-code app-building platform with AI-assisted design and a Sheets Integration
                feature that lets you connect a Google Sheet as a live data source for your app (similar to AppSheet). We are
                committed to protecting your personal information and your right to privacy. This Privacy Policy describes how
                your information — including any Google user data you authorize us to access — is collected, used, stored, and
                shared when you use our web app.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>2. Information We Collect</h2>
              <p className={`${classes.contentText} ${localClasses.textBlock}`}>
                We collect minimal personal data necessary for operation, such as your email address, account details, usage
                logs, and cookies to enhance user experience.
              </p>
              <p className={`${classes.contentText} ${localClasses.textBlock}`}>
                <strong>Google user data.</strong> If you choose to connect Google Sheets, we request your permission through
                Google Sign-In / OAuth to access:
              </p>
              <ul className={classes.contentList}>
                <li className={classes.contentListItem}>Your basic Google account profile (name, email address, profile photo) to identify your account.</li>
                <li className={classes.contentListItem}>
                  Google Sheets data (spreadsheet contents, sheet names, and cell values) via the Google Sheets API, so your
                  app's screens can read and write rows in the spreadsheet you select.
                </li>
                <li className={classes.contentListItem}>
                  Limited Google Drive access via the Drive file picker (the <code>drive.file</code> scope), which only lets us
                  see and open the specific spreadsheet you pick — we cannot browse or access any other files in your Google
                  Drive.
                </li>
              </ul>
              <p className={`${classes.contentText} ${localClasses.textBlock}`}>
                We only request the scopes needed to power the Sheets Integration feature, and you can decline or revoke this
                access at any time (see Section 8, "Your Rights").
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>3. How We Use Google User Data and Sheets Integration Data</h2>
              <p className={`${classes.contentText} ${localClasses.textBlock}`}>
                Google user data obtained through the Sheets Integration is used solely to provide, maintain, and improve that
                feature for you — for example, rendering your spreadsheet as live data inside your app, and reading/writing
                rows when your app performs an action.
              </p>
              <p className={`${classes.contentText} ${localClasses.textBlock}`}>
                In the normal course of use, spreadsheet data is accessed live from Google's servers and is not stored by
                FlutterPilot. A small number of sample records may be temporarily cached on our servers only to power
                mock/preview data while you design your app (for example, so the app builder can show sample rows without
                repeatedly calling the Google API); this cached sample data is retained only as long as needed for that
                purpose and is deleted when you disconnect the sheet or delete the associated app.
              </p>
              <p className={classes.contentText}>
                We do not use Google user data for advertising, and we do not use it to train generalized AI/ML models. Where
                our AI features (such as generating suggested app screens or sample data) process spreadsheet content you
                provide, that data is sent only to the AI model provider powering the feature you selected — Google (Gemini),
                OpenAI (ChatGPT), Anthropic (Claude), Mistral AI, or xAI (Grok) — and is used only to generate output for you
                within your session, consistent with the Limited Use requirements described in Section 5.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>4. How We Use Other Information</h2>
              <p className={classes.contentText}>
                We use other collected data (account details, usage logs, cookies) to improve our service, provide support,
                send updates, and ensure platform security.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>5. With Whom We Share, Transfer, or Disclose Data (Including Google User Data)</h2>
              <p className={`${classes.contentText} ${localClasses.textBlock}`}>
                We do not sell Google user data, and we do not share it with third parties for their own advertising or
                marketing purposes. We disclose Google user data and other personal data only in the following limited
                circumstances:
              </p>
              <ul className={classes.contentList}>
                <li className={classes.contentListItem}>
                  <strong>Cloud hosting providers</strong> that store and process app data on our behalf (for example, our
                  database and server infrastructure), under contractual confidentiality and security obligations, and solely
                  to operate FlutterPilot.
                </li>
                <li className={classes.contentListItem}>
                  <strong>AI model providers</strong> we use to power AI-assisted features (such as suggesting app screens or
                  sample data), namely Google (Gemini), OpenAI (ChatGPT), Anthropic (Claude), Mistral AI, and xAI (Grok). Only
                  the minimum spreadsheet content needed to generate the requested output is sent to whichever provider powers
                  the feature you use, and it is used to service your request, not to train the provider's general-purpose
                  models.
                </li>
                <li className={classes.contentListItem}>
                  <strong>Legal and safety reasons</strong>, such as complying with a valid legal request, or protecting the
                  rights, property, or safety of FlutterPilot, our users, or the public.
                </li>
                <li className={classes.contentListItem}>
                  <strong>Business transfers</strong>, such as a merger or acquisition, in which case we will notify you before
                  your data becomes subject to a different privacy policy.
                </li>
                <li className={classes.contentListItem}>With your explicit consent, for any other purpose you approve.</li>
              </ul>
              <p className={classes.contentText}>
                We do not otherwise transfer or disclose Google user data to any other third party. FlutterPilot's use and
                transfer of information received from Google APIs adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.contentLink}
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>6. Third-Party Services</h2>
              <p className={classes.contentText}>
                Some trusted tools may be used for analytics, performance monitoring, or support. These providers only receive
                the data necessary to perform their function and are not permitted to use it for their own purposes.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>7. Data Security and Protection of Sensitive Data</h2>
              <p className={`${classes.contentText} ${localClasses.textBlock}`}>
                We treat the following as sensitive data: Google OAuth credentials and tokens, your account login details, and
                any spreadsheet content accessed through Sheets Integration (which may include personal or business
                information you choose to store in your sheet). We apply the following safeguards to protect this data:
              </p>
              <ul className={classes.contentList}>
                <li className={classes.contentListItem}>
                  <strong>Encryption in transit.</strong> All traffic between your browser, our servers, and the Google APIs is
                  encrypted using TLS/HTTPS — data is never sent in plain text.
                </li>
                <li className={classes.contentListItem}>
                  <strong>Encryption at rest.</strong> OAuth access and refresh tokens, account credentials, and any cached
                  spreadsheet data are encrypted at rest in our database.
                </li>
                <li className={classes.contentListItem}>
                  <strong>Access controls.</strong> Access to production systems and sensitive data is restricted to authorized
                  personnel on a least-privilege, need-to-know basis, and is authenticated and logged.
                </li>
                <li className={classes.contentListItem}>
                  <strong>Secure token handling.</strong> OAuth tokens are stored server-side only, are never exposed to the
                  browser or third parties beyond what's needed to call the Google APIs on your behalf, and can be revoked at
                  any time (see Section 8).
                </li>
                <li className={classes.contentListItem}>
                  <strong>Data minimization and retention limits.</strong> We collect and cache only the minimum data needed to
                  provide the Sheets Integration feature, and delete cached spreadsheet data and tokens once you disconnect the
                  sheet, delete the associated app, or delete your account.
                </li>
                <li className={classes.contentListItem}>
                  <strong>Monitoring and incident response.</strong> We monitor our systems for unauthorized access, and in the
                  event of a data breach affecting your personal or Google user data, we will notify affected users and
                  relevant authorities as required by applicable law.
                </li>
              </ul>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>8. Your Rights</h2>
              <p className={classes.contentText}>
                You can request access, update, or deletion of your personal data, including any Google user data we hold, at
                any time. You may disconnect Google Sheets and revoke FlutterPilot's access to your Google account whenever
                you like from your app settings, or directly from your{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.contentLink}
                >
                  Google Account permissions page
                </a>
                . To request deletion of data we hold, contact our support at{" "}
                <a href="mailto:fromamsoftwares@gmail.com" className={classes.contentLink}>fromamsoftwares@gmail.com</a>.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>9. Changes to This Policy</h2>
              <p className={classes.contentText}>
                We may revise this Privacy Policy from time to time. We will notify you of significant changes via email or
                platform notice.
              </p>
            </section>

            <section className={classes.contentSection}>
              <h2 className={classes.contentHeading}>10. Contact Us</h2>
              <p className={classes.contentText}>
                If you have questions about this Privacy Policy or how we handle your data, contact us at{" "}
                <a href="mailto:fromamsoftwares@gmail.com" className={classes.contentLink}>fromamsoftwares@gmail.com</a>.
              </p>
            </section>
          </div>
        </main>
      </div>
    </CustomAppBar>
  );
}
