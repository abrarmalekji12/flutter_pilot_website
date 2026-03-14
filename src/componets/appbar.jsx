import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/commonStyles";
import Footer from "./Footer";

function CustomAppBar({ children, type }) {
  const classes = commonStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen((value) => !value);
  };

  const menuItems = [
    { label: "Home", action: () => navigate("/"), type: "home" },
    { label: "Templates", action: () => navigate("/template"), type: "template" },
    { label: "Docs", action: () => navigate("/docs"), type: "docs" },
    { label: "Blogs", action: () => window.open("https://flutterpilot.medium.com", "_blank", "noopener,noreferrer"), type: "blogs" },
    { label: "Contact", action: () => navigate("/contactUs"), type: "contactUs" },
    { label: "About", action: () => navigate("/aboutUs"), type: "aboutUs" },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.taglineBanner}>
        AI-powered low-code Flutter builder for rapid product teams
      </div>

      <AppBar
        position="sticky"
        className={classes.appBar}
        sx={{
          background: "rgba(255, 255, 255, 0.15) !important",
          backdropFilter: "blur(6px) saturate(180%)",
          WebkitBackdropFilter: "blur(6px) saturate(180%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <Toolbar>
          <div className={classes.brandLockup} onClick={() => navigate("/")}>
            <span className={classes.logoFrame}>
              <img
                src="flutterpilot_logo.png"
                className={classes.logo}
                alt="FlutterPilot"
              />
            </span>

            <Typography
              component="div"
              className={classes.appBarTitle}
            >
              <span className={classes.brandPrimary}>Flutter</span>
              <span className={classes.brandAccent}>Pilot</span>
            </Typography>
          </div>

          <div className={classes.appBarActions}>
            <nav className={classes.hideOnSmall} style={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  className={`${classes.appBarButton} ${type === item.type ? "active" : ""}`}
                  onClick={item.action}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            <Button
              variant="contained"
              className={classes.navActionBtn}
              onClick={() => window.open("https://flutterpilot-studio.web.app", "_blank")}
            >
              Build Now
            </Button>

            <IconButton
              edge="end"
              aria-label="Open navigation menu"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        classes={{ paper: classes.drawer }}
      >
        <List className={classes.drawerList}>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  item.action();
                  setDrawerOpen(false);
                }}
                className={type === item.type ? "active" : ""}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {children}
      <Footer />
    </div>
  );
}

export default CustomAppBar;
