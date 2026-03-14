import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { footerStyles } from "../styles/commonStyles";

const Footer = () => {
  const navigate = useNavigate();
  const footerClasses = footerStyles();

  const navigateTo = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <Box component="footer" className={footerClasses.container}>
      <div className={footerClasses.shell}>
        <div className={footerClasses.topRow}>
          <div>
            <div className={footerClasses.brandWrap} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <img
                src="flutterpilot_logo_round.svg"
                className={footerClasses.logo}
                alt="FlutterPilot"
                loading="lazy"
              />
              <Typography
                component="div"
                className={footerClasses.brandText}
              >
                <span className={footerClasses.brandPrimary}>Flutter</span>
                <span className={footerClasses.brandAccent}>Pilot</span>
              </Typography>
            </div>
            <p className={footerClasses.subtitle}>AI-first Flutter builder for modern teams.</p>
          </div>
        </div>

        <Grid container spacing={3} className={footerClasses.gridContainer}>
          <Grid item xs={12} sm={4} md={3}>
            <Typography className={footerClasses.sectionTitle}>Product</Typography>
            <Link className={footerClasses.footerLink} href="#/template" underline="none" onClick={(event) => navigateTo(event, "/template")}>
              Templates
            </Link>
            <Link className={footerClasses.footerLink} href="#/docs" underline="none" onClick={(event) => navigateTo(event, "/docs")}>
              Docs
            </Link>
            <Link className={footerClasses.footerLink} href="https://flutterpilot-studio.web.app" underline="none" target="_blank" rel="noopener noreferrer">
              Web App
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography className={footerClasses.sectionTitle}>Resources</Typography>
            <Link className={footerClasses.footerLink} href="https://flutterpilot.medium.com" underline="none" target="_blank" rel="noopener noreferrer">
              Tutorials
            </Link>
            <Link className={footerClasses.footerLink} href="https://flutterpilot.medium.com" underline="none" target="_blank" rel="noopener noreferrer">
              Blog
            </Link>
            <Link className={footerClasses.footerLink} href="#/contactUs" underline="none" onClick={(event) => navigateTo(event, "/contactUs")}>
              Support
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography className={footerClasses.sectionTitle}>Company</Typography>
            <Link className={footerClasses.footerLink} href="#/aboutUs" underline="none" onClick={(event) => navigateTo(event, "/aboutUs")}>
              About
            </Link>
            <Link className={footerClasses.footerLink} href="#/contactUs" underline="none" onClick={(event) => navigateTo(event, "/contactUs")}>
              Contact
            </Link>
            <Link className={footerClasses.footerLink} href="#/privacyPolicy" underline="none" onClick={(event) => navigateTo(event, "/privacyPolicy")}>
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography className={footerClasses.sectionTitle}>What We Do</Typography>
            <Typography className={footerClasses.description}>
              Build Flutter apps with prompt-based generation, visual editing, and export-ready code in one workflow.
            </Typography>
          </Grid>
        </Grid>

        <Divider className={footerClasses.divider} />
        <p className={footerClasses.copyright}>© {new Date().getFullYear()} FlutterPilot. All rights reserved.</p>
      </div>
    </Box>
  );
};

export default Footer;
