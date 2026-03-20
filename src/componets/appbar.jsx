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
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/commonStyles";
import Footer from "./Footer";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.builder.flutterpilot";
const WEB_APP_URL = "https://studio.flutterpilot.com";

function getBuildNowUrl() {
  return /Android/i.test(navigator.userAgent) ? PLAY_STORE_URL : WEB_APP_URL;
}

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
    {
      label: "Blogs",
      action: () =>
        window.open("https://flutterpilot.medium.com", "_blank", "noopener,noreferrer"),
      type: "blogs",
    },
    { label: "Contact", action: () => navigate("/contactUs"), type: "contactUs" },
    { label: "About", action: () => navigate("/aboutUs"), type: "aboutUs" },
  ];

  return (
    <div className={classes.mainContainer}>
      <div className={classes.taglineBanner}>
        AI-powered low-code Flutter builder for rapid product teams
        <span 
          onClick={() => window.location.href = "/flutter-ui-builder"} 
          style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '8px', opacity: 0.8 }}
        >
          Flutter UI builder
        </span>
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
                src="flutterpilot_logo_round.svg"
                className={classes.logo}
                alt="FlutterPilot"
              />
            </span>

            <Typography component="div" className={classes.appBarTitle}>
              <span className={classes.brandPrimary}>Flutter</span>
              <span className={classes.brandAccent}>Pilot</span>
            </Typography>
          </div>

          <div className={classes.appBarActions}>
            <nav className={classes.hideOnSmall} style={{ display: "flex", alignItems: "center" }}>
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
              onClick={() => {
                const url = getBuildNowUrl();
                if (/Android/i.test(navigator.userAgent)) {
                  window.location.href = url;
                } else {
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
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

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 290,
            background: "linear-gradient(160deg, #ffffff 0%, #f0f6ff 100%)",
            borderLeft: "1px solid rgba(37, 99, 235, 0.1)",
            boxShadow: "-8px 0 34px rgba(15, 23, 42, 0.14)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            pt: 2.5,
            pb: 2,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
            onClick={() => { navigate("/"); setDrawerOpen(false); }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                border: "1px solid rgba(99, 102, 241, 0.22)",
                background: "#ffffff",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.13)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="flutterpilot_logo_round.svg"
                alt="FlutterPilot"
                style={{ width: 22, height: 22, objectFit: "contain" }}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.15rem",
                letterSpacing: "-0.2px",
              }}
            >
              <span style={{ color: "#0f172a" }}>Flutter</span>
              <span style={{ color: "#2563eb" }}>Pilot</span>
            </Typography>
          </Box>

          <IconButton
            onClick={handleDrawerToggle}
            size="small"
            sx={{
              color: "#64748b",
              background: "rgba(15, 23, 42, 0.06)",
              borderRadius: "10px",
              "&:hover": { background: "rgba(15, 23, 42, 0.1)" },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ mx: 2.5, borderColor: "rgba(148, 163, 184, 0.22)" }} />

        {/* Nav Links */}
        <List sx={{ px: 1.5, pt: 1.5, flex: 1 }}>
          {menuItems.map((item) => {
            const isActive = type === item.type;
            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    item.action();
                    setDrawerOpen(false);
                  }}
                  sx={{
                    borderRadius: "14px",
                    px: 2,
                    py: 1.3,
                    background: isActive
                      ? "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(59,130,246,0.07) 100%)"
                      : "transparent",
                    color: isActive ? "#2563eb" : "#334155",
                    fontWeight: isActive ? 700 : 500,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: "rgba(37, 99, 235, 0.07)",
                      color: "#2563eb",
                      transform: "translateX(3px)",
                    },
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 600,
                      fontSize: "0.97rem",
                      letterSpacing: "-0.1px",
                    }}
                  />
                  {isActive && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#2563eb",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Build Now CTA at bottom */}
        <Box sx={{ px: 2.5, pb: 3.5, pt: 1.5 }}>
          <Divider sx={{ mb: 2.5, borderColor: "rgba(148, 163, 184, 0.22)" }} />
          <Button
            fullWidth
            variant="contained"
            endIcon={<RocketLaunchRoundedIcon />}
            onClick={() => {
              const url = getBuildNowUrl();
              setDrawerOpen(false);
              if (/Android/i.test(navigator.userAgent)) {
                window.location.href = url;
              } else {
                window.open(url, "_blank", "noopener,noreferrer");
              }
            }}
            sx={{
              borderRadius: "16px",
              fontWeight: 700,
              fontSize: "0.95rem",
              textTransform: "none",
              py: 1.5,
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              boxShadow: "0 12px 28px rgba(37, 99, 235, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 16px 32px rgba(37, 99, 235, 0.35)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Build Now
          </Button>
        </Box>
      </Drawer>

      {children}
      <Footer />
    </div>
  );
}

export default CustomAppBar;
