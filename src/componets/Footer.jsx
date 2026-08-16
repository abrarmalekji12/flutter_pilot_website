import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

import { footerStyles } from "../styles/commonStyles";

const Footer = () => {
  const footerClasses = footerStyles();

  return (
    <Box component="footer" className={footerClasses.container}>
      <div className={footerClasses.shell}>
        <div className={footerClasses.topRow}>
          <div>
            <RouterLink className={footerClasses.brandWrap} to="/" aria-label="FlutterPilot home">
              <img
                src="/flutterpilot_logo_round.svg"
                className={footerClasses.logo}
                alt="FlutterPilot"
                loading="lazy"
                width="40"
                height="40"
              />
              <Typography
                component="div"
                className={footerClasses.brandText}
              >
                <span className={footerClasses.brandPrimary}>Flutter</span>
                <span className={footerClasses.brandAccent}>Pilot</span>
              </Typography>
            </RouterLink>
            <p className={footerClasses.subtitle}>AI-first Flutter builder for modern teams.</p>
          </div>
        </div>

        <Grid container spacing={3} className={footerClasses.gridContainer}>
          <Grid item xs={12} sm={4} md={3}>
            <Typography component="div" className={footerClasses.sectionTitle}>
              <WidgetsRoundedIcon aria-hidden="true" /> Product
            </Typography>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/template/" underline="none">
              Templates
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/docs/" underline="none">
              Docs
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/flutter-ui-builder/" underline="none">
              Flutter UI builder
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/flutterflow-alternative/" underline="none">
              FlutterFlow alternative
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/ai-flutter-ui-generator/" underline="none">
              AI Flutter UI generator
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/flutter-app-builder/" underline="none">
              Flutter app builder
            </Link>
            <Link className={footerClasses.footerLink} href="https://studio.flutterpilot.com" underline="none" target="_blank" rel="noopener noreferrer">
              Web App
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography component="div" className={footerClasses.sectionTitle}>
              <AutoStoriesRoundedIcon aria-hidden="true" /> Resources
            </Typography>
            <Link className={footerClasses.footerLink} href="https://flutterpilot.medium.com" underline="none" target="_blank" rel="noopener noreferrer">
              Tutorials
            </Link>
            <Link className={footerClasses.footerLink} href="https://flutterpilot.medium.com" underline="none" target="_blank" rel="noopener noreferrer">
              Blog
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/contact/" underline="none">
              Support
            </Link>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography component="div" className={footerClasses.sectionTitle}>
              <BusinessRoundedIcon aria-hidden="true" /> Company
            </Typography>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/about-us/" underline="none">
              About
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/contact/" underline="none">
              Contact
            </Link>
            <Link component={RouterLink} className={footerClasses.footerLink} to="/privacy-policy/" underline="none">
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography component="div" className={footerClasses.sectionTitle}>
              <TipsAndUpdatesRoundedIcon aria-hidden="true" /> What We Do
            </Typography>
            <Typography className={footerClasses.description}>
              Build Flutter apps with prompt-based generation, a{" "}
              <Link component={RouterLink} to="/flutter-ui-builder/" color="inherit">
                Flutter UI builder
              </Link>
              , visual editing, and export-ready code in one workflow. Explore our{" "}
              <Link component={RouterLink} to="/flutterflow-alternative/" color="inherit">
                FlutterFlow alternative
              </Link>
              ,{" "}
              <Link component={RouterLink} to="/ai-flutter-ui-generator/" color="inherit">
                AI Flutter UI generator
              </Link>
              , and{" "}
              <Link component={RouterLink} to="/flutter-app-builder/" color="inherit">
                Flutter app builder
              </Link>.
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
