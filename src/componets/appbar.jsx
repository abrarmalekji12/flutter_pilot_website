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
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
    { label: "Home", to: "/", type: "home", icon: <HomeRoundedIcon /> },
    { label: "Templates", to: "/template/", type: "template", icon: <ViewQuiltRoundedIcon /> },
    { label: "Docs", to: "/docs/", type: "docs", icon: <MenuBookRoundedIcon /> },
    {
      label: "Blogs",
      href: "https://flutterpilot.medium.com",
      type: "blogs",
      icon: <ArticleRoundedIcon />,
    },
    { label: "Contact", to: "/contact/", type: "contactUs", icon: <ContactSupportRoundedIcon /> },
    { label: "About", to: "/about-us/", type: "aboutUs", icon: <InfoRoundedIcon /> },
  ];

  return (
    <div className={classes.mainContainer}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className={classes.taglineBanner}>
        <span className={classes.taglineMessage}>
          <span className={classes.taglineDot} aria-hidden="true" />
          <span className={classes.taglineDesktopText}>
            Explore FlutterPilot here. Build your app in FlutterPilot Studio.
          </span>
          <span className={classes.taglineMobileText}>
            Build faster with FlutterPilot AI.
          </span>
        </span>
        <button
          type="button"
          className={classes.taglineCta}
          onClick={() => navigate("/flutter-ui-builder")}
        >
          <span className={classes.taglineDesktopText}>See the workflow</span>
          <span className={classes.taglineMobileText}>See how</span>
          <span aria-hidden="true"> →</span>
        </button>
      </div>

      <AppBar
        position="sticky"
        className={classes.appBar}
        sx={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.82) 100%) !important",
          backdropFilter: "blur(18px) saturate(145%) brightness(1.08)",
          WebkitBackdropFilter: "blur(18px) saturate(145%) brightness(1.08)",
          boxShadow:
            "0 12px 34px rgba(15,23,42,0.1), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      >
        <Toolbar>
          <RouterLink className={classes.brandLockup} to="/" aria-label="FlutterPilot home">
            <span className={classes.logoFrame}>
              <img
                src="/flutterpilot_logo_round.svg"
                className={classes.logo}
                alt="FlutterPilot"
                width="32"
                height="32"
              />
            </span>

            <Typography component="div" className={classes.appBarTitle}>
              <span className={classes.brandPrimary}>Flutter</span>
              <span className={classes.brandAccent}>Pilot</span>
            </Typography>
          </RouterLink>

          <div className={classes.appBarActions}>
            <nav className={classes.hideOnSmall} style={{ display: "flex", alignItems: "center" }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={item.href ? "a" : RouterLink}
                  href={item.href}
                  to={item.to}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noopener noreferrer" : undefined}
                  startIcon={React.cloneElement(item.icon, { fontSize: "small", "aria-hidden": true })}
                  className={`${classes.appBarButton} ${type === item.type ? "active" : ""}`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            <Button
              variant="contained"
              startIcon={<RocketLaunchRoundedIcon fontSize="small" />}
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
              Open Studio
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
            width: "min(290px, 88vw)",
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
            component={RouterLink}
            to="/"
            aria-label="FlutterPilot home"
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
            onClick={() => setDrawerOpen(false)}
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
                src="/flutterpilot_logo_round.svg"
                alt="FlutterPilot"
                width="22"
                height="22"
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
            aria-label="Close navigation menu"
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
                  component={item.href ? "a" : RouterLink}
                  href={item.href}
                  to={item.to}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noopener noreferrer" : undefined}
                  onClick={() => {
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
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: "inherit",
                      "& svg": { fontSize: "1.2rem" },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
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

        {/* Studio CTA at bottom */}
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
            Open Studio
          </Button>
        </Box>
      </Drawer>

      <div id="main-content">{children}</div>
      <Footer />
    </div>
  );
}

export default CustomAppBar;
