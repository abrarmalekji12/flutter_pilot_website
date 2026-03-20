import { makeStyles } from "@mui/styles";
import {
  bodyTextBolderColor,
  bodyTextColor,
  bulletPointColor,
  cardBackgroudColor,
  codeBackgroundColor,
  codeTextColor,
  productShowCaseBoxShadow,
} from "./colors";


// Shared padding for all feature glass cards — change once, applies everywhere.
const FEATURE_CARD_PADDING = { base: [5, 5], md: [4, 3], sm: [3, 2.5] };

export const commonStyles = makeStyles((theme) => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    position: "relative",
    padding: 0,
    background: "transparent",
  },
  mainContainer: {
    background: "transparent",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    paddingTop: "40px",
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      paddingTop: "32px",
      paddingBottom: theme.spacing(4),
    },
  },
  responsiveContainer: {
    width: "90%",
    maxWidth: "1500px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      width: "94%",
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      width: "96%",
      marginTop: theme.spacing(3),
    },
  },
  productShowCaseContainer: {
    position: "relative",
    overflow: "hidden",
    // Balanced top/bottom — bottom reduced from 7→5 so it doesn't dwarf the video.
    padding: theme.spacing(3.5, 5, 5, 5),
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.08)",
    color: "#0f172a",
    borderRadius: "28px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3, 3, 4.5, 3),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5, 2.25, 3.5, 2.25),
      borderRadius: "20px",
      backdropFilter: "blur(8px) saturate(140%)", // Lighter blur for mobile GPUs
      WebkitBackdropFilter: "blur(8px) saturate(140%)",
    },
  },

  // Glowing radial background
  bgGlow: {
    content: '""',
    position: "absolute",
    top: "-18%",
    left: "-18%",
    width: "150%",
    height: "150%",
    background: "radial-gradient(circle at center, rgba(91, 134, 229, 0.14) 0%, transparent 68%)",
    animation: "$pulse 8s ease-in-out infinite",
    zIndex: 0,
  },


  // Content wrapper
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    // No minHeight — let content determine height naturally.
  },
  // Text container
  textContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    margin: "28px 0 36px",
    maxWidth: "720px",
    width: "100%",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
  heroTextContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    // Tighter bottom gap — less dead air between text block and video.
    margin: "10px 0 16px",
    maxWidth: "820px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      margin: "8px 0 14px",
      maxWidth: "100%",
    },
  },
  heroTitle: {
    fontWeight: 800,
    fontSize: "2.15rem",
    lineHeight: 1.12,
    letterSpacing: "-0.35px",
    marginBottom: theme.spacing(1),
    background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 14px rgba(37, 99, 235, 0.15)",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.85rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  heroSubtitle: {
    fontSize: "1.05rem",
    fontWeight: 400,
    color: "#334155",
    lineHeight: 1.65,
    letterSpacing: "0.1px",
    marginBottom: theme.spacing(2.2),
    maxWidth: "480px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(2),
    },
  },

  // Image as central background

  centerImage: {
    display: "flex",
    justifyContent: "center",
  },
  imageBackground: {
    // Wider frame so the video breathes across the card.
    width: "96%",
    maxWidth: "1200px",
    zIndex: 1,
    borderRadius: "16px",
    boxShadow: "0 18px 44px rgba(15, 23, 42, 0.4)",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    transition: "all 0.7s ease",
    "&:hover": {
      transform: "translateY(-1.5%) scale(1.012)",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      width: "100%",
      right: "auto",
      top: "auto",
      transform: "none",
      margin: "0 auto",
      marginBottom: theme.spacing(3),
      "&:hover": {
        transform: "scale(1.015)",
      },
    },
  },

  // Image overlay with dots
  imageOverlay: {
    position: "absolute",
    top: "15px",
    left: "15px",
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  dot1: {
    backgroundColor: "#ff5f57",
  },
  dot2: {
    backgroundColor: "#febc2e",
  },
  dot3: {
    backgroundColor: "#28c840",
  },


  signUpButton: {
    marginRight: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "18px",
    zIndex: 2,
    position: "relative",
  },
  appBar: {
    background: "rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(6px) saturate(180%)",
    WebkitBackdropFilter: "blur(6px) saturate(180%)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "1500px",
    margin: "24px auto 0",
    left: 0,
    right: 0,
    top: "40px",
    zIndex: 1100,
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      margin: "16px auto 0",
      top: "32px",
      borderRadius: "16px",
      backdropFilter: "blur(4px) saturate(150%)", // Reduced for vertical scroll perf
      WebkitBackdropFilter: "blur(4px) saturate(150%)",
    },
  },
  appBarSpacer: {
    height: "0px",
    [theme.breakpoints.down("sm")]: {
      height: "0px",
    },
  },
  brandLockup: {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.85),
    padding: theme.spacing(0.15, 0),
    cursor: "pointer",
    marginRight: "auto",
    transition: "all 0.22s ease",
    "&:hover": {
      opacity: 0.95,
    },
  },
  logoFrame: {
    width: "42px",
    height: "42px",
    borderRadius: "11px",
    border: "1px solid rgba(99, 102, 241, 0.24)",
    background: "#ffffff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 5px 14px rgba(37, 99, 235, 0.14)",
  },
  appBarTitle: {
    display: "inline-flex",
    alignItems: "baseline",
    fontWeight: 800,
    fontSize: "1.42rem",
    margin: 0,
    letterSpacing: "-0.24px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  brandPrimary: {
    color: "#0f172a",
    fontWeight: 800,
  },
  brandAccent: {
    color: "#2563eb",
    fontWeight: 800,
    marginLeft: "1px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  logo: {
    height: "32px",
    width: "32px",
    objectFit: "contain",
    borderRadius: "6px",
    transition: "transform 0.3s ease",
  },
  appBarButton: {
    marginLeft: theme.spacing(1),
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#334155",
    padding: theme.spacing(1, 1.8),
    borderRadius: "12px",
    position: "relative",
    zIndex: 1,
    transition: "all 0.2s ease",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    "&.active": {
      color: "#2563eb",
      background: "rgba(37, 99, 235, 0.06)",
    },
    "&.active:hover": {
      background: "rgba(37, 99, 235, 0.12)",
    },
    "&:not(.active):hover": {
      background: "rgba(241, 245, 249, 0.8)",
      color: "#0f172a",
      transform: "translateY(-1px)",
    },
  },
  navActionBtn: {
    marginLeft: theme.spacing(2),
    padding: "10px 24px",
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "0.88rem",
    textTransform: "none",
    color: "#fff",
    background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 15px 25px rgba(37, 99, 235, 0.25)",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  appBarActions: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#1e3a8a",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    transition: "transform 0.25s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  // Button container
  buttonsContainer: {
    display: "flex",
    gap: theme.spacing(1.1),
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
  },

  // Button styles
  button: {
    padding: theme.spacing(1.2, 1.7),
    borderRadius: "13px",
    fontWeight: 700,
    fontSize: "0.84rem",
    letterSpacing: "0.2px",
    transition: "all 0.25s ease",
    boxShadow: "0 10px 22px rgba(2, 6, 23, 0.22)",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid transparent",
    minWidth: "140px",
    "& .MuiButton-startIcon": {
      marginRight: "6px",
      marginLeft: 0,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "auto",
    },
  },
  windowsBtn: {
    background: "linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)",
    color: "#1e40af",
    borderColor: "rgba(59, 130, 246, 0.35)",
    "&:hover": {
      background: "linear-gradient(180deg, #ffffff 0%, #dbeafe 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 24px rgba(30, 64, 175, 0.22)",
    },
  },
  downloadBtn: {
    minWidth: "135px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "auto",
      width: "100%",
    },
  },
  glowBtn: {
    background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
    color: theme.palette.common.white,
    borderColor: "rgba(191, 219, 254, 0.3)",
    "&:hover": {
      background: "linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 24px rgba(37, 99, 235, 0.34)",
    },
  },
  playStoreBtn: {
    background: "linear-gradient(135deg, #0f766e 0%, #0ea5a2 100%)",
    color: theme.palette.common.white,
    borderColor: "rgba(153, 246, 228, 0.28)",
    "&:hover": {
      background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 24px rgba(13, 148, 136, 0.32)",
    },
  },
  appleBtn: {
    background: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
    color: "#ffffff",
    borderColor: "rgba(255, 255, 255, 0.15)",
    "&:hover": {
      background: "linear-gradient(135deg, #1e293b 0%, #020617 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 12px 24px rgba(15, 23, 42, 0.3)",
    },
  },

  // ── Hierarchical CTA Styles ──
  primaryCtaWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2.5),
    width: "100%",
  },
  primaryCtaBtn: {
    padding: theme.spacing(1.8, 5),
    borderRadius: "18px",
    fontSize: "1.1rem",
    fontWeight: 800,
    letterSpacing: "0.5px",
    background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    color: "#fff",
    boxShadow: "0 15px 35px rgba(37, 99, 235, 0.35)",
    textTransform: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-3px) scale(1.02)",
      background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
      boxShadow: "0 20px 45px rgba(37, 99, 235, 0.45)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: theme.spacing(1.6, 3),
      fontSize: "1.05rem",
    },
  },
  ctaSubtext: {
    fontSize: "0.9rem",
    color: "rgba(15, 23, 42, 0.65)",
    marginTop: theme.spacing(1.2),
    fontWeight: 500,
  },
  
  secondaryCtaWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(3.5),
    width: "100%",
  },
  recommendLabel: {
    fontSize: "0.78rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#2563eb",
    background: "rgba(37, 99, 235, 0.08)",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: theme.spacing(1.2),
  },
  secondaryCtaBtn: {
    padding: theme.spacing(1.4, 3.5),
    borderRadius: "14px",
    fontSize: "0.95rem",
    fontWeight: 700,
    border: "2px solid #2563eb",
    color: "#2563eb",
    background: "transparent",
    textTransform: "none",
    transition: "all 0.25s ease",
    "&:hover": {
      background: "rgba(37, 99, 235, 0.04)",
      transform: "translateY(-2px)",
    },
    [theme.breakpoints.down("sm")]: {
       width: "100%",
    },
  },

  otherPlatformsSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // borderTop: "1px solid rgba(148, 163, 184, 0.2)",
    paddingTop: theme.spacing(1),
  },
  otherPlatformsLabel: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#64748b",
    marginBottom: theme.spacing(2.5),
  },
  otherPlatformsGrid: {
    display: "flex",
    gap: theme.spacing(1.5),
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
       width: "100%",
    },
  },
  ghostBtn: {
    padding: theme.spacing(0.85, 2),
    borderRadius: "10px",
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "#64748b",
    background: "rgba(241, 245, 249, 0.35)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    textTransform: "none",
    transition: "all 0.2s ease",
    "& .MuiSvgIcon-root": {
      fontSize: "0.95rem",
      marginRight: "4px",
    },
    "&:hover": {
      background: "rgba(241, 245, 249, 0.7)",
      borderColor: "rgba(37, 99, 235, 0.25)",
      color: "#2563eb",
    },
    [theme.breakpoints.down("sm")]: {
       width: "100%",
    },
  },

  // Icon styles
  icon: {
    marginRight: theme.spacing(1),
  },
  drawer: {
    width: 260,
    background: cardBackgroudColor,
    color: bodyTextBolderColor,
    borderLeft: "1px solid rgba(30, 64, 175, 0.08)",
  },
  drawerList: {
    padding: theme.spacing(2),
    "& .MuiListItemButton-root": {
      borderRadius: "12px",
      marginBottom: "10px",
      transition: "all 0.25s ease",
      "&.active": {
        background: cardBackgroudColor,
        color: bodyTextBolderColor,
        boxShadow: "0 8px 18px rgba(30, 64, 175, 0.18)",
      },
      "&:hover": {
        background: cardBackgroudColor,
        color: bodyTextBolderColor,
        transform: "translateY(-1px)",
        boxShadow: "0 8px 18px rgba(30, 64, 175, 0.14)",
      }
    },
  },
  card: {
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: productShowCaseBoxShadow,
    background: cardBackgroudColor,
    color: "#fff",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 16px 28px rgba(30, 64, 175, 0.14)",
    },

    // Glowing radial background
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-20%",
      left: "-20%",
      width: "160%",
      height: "160%",
      background:
        "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
      animation: "$pulse 8s ease-in-out infinite",
      zIndex: 0,
    },
  },

  //   Floating shapes
  floatingShape: {
    position: "absolute",
    border: "2px solid rgba(91, 134, 229, 0.1)",
    borderRadius: "16px",
    backdropFilter: "blur(4px)",
    background: "rgba(91, 134, 229, 0.03)",
    animation: "$float 10s infinite ease-in-out alternate",
    zIndex: 0,
  },
  shapePhone: {
    width: "80px",
    height: "140px",
    top: "15%",
    left: "5%",
  },
  shapeTablet: {
    width: "140px",
    height: "200px",
    bottom: "10%",
    right: "6%",
    animationDelay: "2s",
  },
  shapeLaptop: {
    width: "200px",
    height: "130px",
    bottom: "5%",
    left: "40%",
    borderRadius: "8px",
    animationDelay: "4s",
  },

  // Animations
  "@keyframes float": {
    "0%": { transform: "translateY(0px) rotate(0deg)" },
    "100%": { transform: "translateY(-15px) rotate(3deg)" },
  },
  "@keyframes pulse": {
    "0%": { opacity: 0.4 },
    "50%": { opacity: 0.8 },
    "100%": { opacity: 0.4 },
  },

  featureGifContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3.25),
    zIndex: 2,
  },
  featureGif: {
    maxWidth: "100%",
    maxHeight: "340px",
    objectFit: "contain",
    borderRadius: "16px",
    transition: "transform 0.4s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  featureDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // No extra padding here — spacing is owned by featureGlassCard via FEATURE_CARD_PADDING.
    padding: 0,
    margin: 0,
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    "& ul": {
      padding: 0,
      margin: 0,
      textAlign: "left",
      display: "inline-block",
      alignSelf: "center", // This centers the list block while keeping title/badge left
      [theme.breakpoints.down("sm")]: {
        alignSelf: "stretch", // Revert to full width on mobile
      },
    },
    "& li": {
      listStyleType: "none",
      marginBottom: "1.2rem",
      fontSize: "1.05rem",
      fontWeight: 500,
      color: bodyTextColor,
      lineHeight: 1.6,
      position: "relative",
      paddingLeft: "2.4rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:before": {
        content: '"✔"', 
        position: "absolute",
        left: 0,
        top: "-1px",
        fontSize: "1.2rem",
        color: "#2563eb",
        fontWeight: "bold",
        filter: "drop-shadow(0 2px 4px rgba(37, 99, 235, 0.2))",
      },
      "& strong": {
        color: "#1e293b",
        fontWeight: 700,
        display: "block",
        marginBottom: "2px",
      },
      "& code": {
        background: "rgba(37, 99, 235, 0.08)",
        padding: "2px 6px",
        borderRadius: "6px",
        fontFamily: "monospace",
        fontSize: "0.9rem",
        color: "#2563eb",
      },
      "&:hover": {
        transform: "translateX(6px)",
      },
    },
  },
  featureBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 14px",
    borderRadius: "99px",
    background: "rgba(37, 99, 235, 0.08)",
    border: "1px solid rgba(37, 99, 235, 0.15)",
    color: "#1d4ed8",
    fontSize: "0.85rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: theme.spacing(2),
  },
  // ── Tooling grid card (used inside featureGrid layout) ──
  toolingCard: {
    display: "flex",
    flexDirection: "row",      // horizontal: icon | content
    alignItems: "flex-start",
    gap: theme.spacing(2),
    // Perfectly even padding on all four sides.
    padding: theme.spacing(2.8),
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.85)",
    boxShadow: "0 2px 12px rgba(15, 23, 42, 0.05)",
    height: "100%",
    boxSizing: "border-box",
    transition: "transform 0.22s ease, box-shadow 0.22s ease", // Optimized transition
    [theme.breakpoints.down("sm")]: {
      backdropFilter: "none", // Disable on small grid items for scroll speed
      WebkitBackdropFilter: "none",
      background: "rgba(255, 255, 255, 0.9)", 
    },
    "&:hover": {
      background: "rgba(255, 255, 255, 0.9)",
      transform: "translateY(-4px)",
      boxShadow: "0 12px 32px rgba(37, 99, 235, 0.13)",
      borderColor: "rgba(37, 99, 235, 0.22)",
    },
  },
  toolingCardIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "13px",
    background: "linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "#2563eb",
    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.14)",
  },
  toolingCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.6),
    flex: 1,
    minWidth: 0,
  },
  featureGlassCard: {
    position: "relative",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.08)",
    borderRadius: "30px",
    padding: theme.spacing(...FEATURE_CARD_PADDING.base),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(...FEATURE_CARD_PADDING.md),
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "22px",
      padding: theme.spacing(...FEATURE_CARD_PADDING.sm),
      backdropFilter: "blur(10px) saturate(150%)", // Performance-friendly blur
      WebkitBackdropFilter: "blur(10px) saturate(150%)",
    },
  },
  browserFrame: {
    width: "100%",
    borderRadius: "16px",
    background: "transparent",
    border: "1px solid rgba(148, 163, 184, 0.25)",
    boxShadow: "0 28px 60px rgba(15, 23, 42, 0.12)",
    overflow: "hidden",
    position: "relative",
  },
  browserToolbar: {
    height: "36px",
    background: "#f1f5f9",
    borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
    gap: "6px",
  },
  browserDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#cbd5e1",
  },
  code: {
    background: codeBackgroundColor,
    padding: "2px 6px",
    borderRadius: "6px",
    fontFamily: "monospace",
    fontSize: "0.95rem",
    color: codeTextColor,
  },
  title: {
    fontWeight: 800,
    fontSize: "2.15rem",
    lineHeight: 1.12,
    letterSpacing: "-0.35px",
    marginBottom: theme.spacing(3),
    background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    position: "relative",
    zIndex: 3,
    textShadow: "0 2px 14px rgba(37, 99, 235, 0.15)",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.85rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    }
  },
  titleHover: {
    transform: "translateY(-1px)",
    textShadow: "0 2px 14px rgba(91, 134, 229, 0.38)",
  },

  // Subtitle
  subtitle: {
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "rgba(248, 250, 252, 0.9)",
    lineHeight: 1.75,
    letterSpacing: "0.12px",
    marginBottom: theme.spacing(4),
    maxWidth: "880px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      maxWidth: "100%",
      marginBottom: theme.spacing(4),
    },
  },
  pageBodyContainer: {
    maxWidth: "920px",
    margin: theme.spacing(3, "auto", 0),
    padding: theme.spacing(0, 2, 2),
    position: "relative",
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 1, 1),
    },
  },
  contentCard: {
    background: "rgba(255, 255, 255, 0.96)",
    borderRadius: "20px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
    padding: theme.spacing(4),
    color: bodyTextColor,
    border: "1px solid rgba(148, 163, 184, 0.22)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5),
      borderRadius: "16px",
    },
  },
  contentSection: {
    marginBottom: theme.spacing(4),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  contentHeading: {
    margin: 0,
    marginBottom: theme.spacing(1.5),
    fontSize: "1.55rem",
    lineHeight: 1.3,
    color: "#1e40af",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },
  contentText: {
    margin: 0,
    color: bodyTextColor,
    lineHeight: 1.75,
    fontSize: "1rem",
  },
  contentList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  contentListItem: {
    marginBottom: theme.spacing(1.25),
    paddingLeft: "1.35rem",
    position: "relative",
    lineHeight: 1.65,
    color: bodyTextColor,
    "&::before": {
      content: '"✔"',
      position: "absolute",
      left: 0,
      color: bulletPointColor,
      fontWeight: 700,
    },
  },
  contentInfoBox: {
    borderRadius: "12px",
    background: "rgba(30, 64, 175, 0.07)",
    border: "1px solid rgba(30, 64, 175, 0.15)",
    padding: theme.spacing(2),
  },
  contentLink: {
    color: "#1e40af",
    textDecorationColor: "rgba(30, 64, 175, 0.45)",
    textUnderlineOffset: "3px",
    "&:hover": {
      color: "#1d4ed8",
    },
  },
  hideOnSmall: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  taglineBanner: {
    background: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    color: "rgba(255, 255, 255, 0.95)",
    textAlign: "center",
    padding: "10px 16px",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.2px",
    zIndex: 1300,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
      height: "32px",
    }
  },

  availableOnLabel: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "#64748b",
    marginBottom: theme.spacing(1.5),
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },

  platformCircleBtn: {
    minWidth: "44px !important",
    width: "44px",
    height: "44px",
    borderRadius: "50% !important",
    padding: "0 !important",
    background: "rgba(241, 245, 249, 0.4)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    color: "#64748b",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiButton-startIcon": {
      margin: 0,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.25rem",
    },
    "&:hover": {
      background: "rgba(37, 99, 235, 0.08)",
      borderColor: "rgba(37, 99, 235, 0.3)",
      color: "#2563eb",
      transform: "translateY(-2px)",
    },
  },
}));

export const templateCardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    height: "100%",
    width: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    background: "#ffffff",
    border: "none",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    color: bodyTextBolderColor,
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 20px 48px rgba(15, 23, 42, 0.14)",
    },
  },
  mediaContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "12px",
    overflowY: "scroll",
  },
  media: {
    height: 280,
    width: 160,
    padding: 10,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      height: 150,
      width: 100,
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    height: "100%",
    padding: theme.spacing(2.8),
    gap: theme.spacing(2.2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.8),
      gap: theme.spacing(1.5),
    },
  },
  title: {
    fontWeight: 700,
    fontSize: "1.1rem",
    lineHeight: 1.35,
    color: "#0f172a",
    marginBottom: 0,
    textAlign: "left",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  description: {
    fontSize: "0.88rem",
    color: bodyTextColor,
    textAlign: "left",
    lineHeight: 1.6,
    marginBottom: 0,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.82rem",
      lineHeight: 1.5,
    },
  },
  ctaButton: {
    marginTop: "auto",
    alignSelf: "flex-start",
    minWidth: "150px",
    padding: "9px 20px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "0.84rem",
    letterSpacing: "0.2px",
    textTransform: "none",
    color: "#fff",
    border: "none",
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    boxShadow: "0 8px 18px rgba(37, 99, 235, 0.2)",
    transition: "all 0.2s ease",
    "& .MuiButton-endIcon": {
      marginLeft: "6px",
      transition: "transform 0.2s ease",
    },
    "&:hover": {
      background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
      boxShadow: "0 12px 24px rgba(30, 64, 175, 0.3)",
      transform: "translateY(-1px)",
      "& .MuiButton-endIcon": {
        transform: "translateX(2px)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
      alignSelf: "stretch",
    },
  },
  button: {
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "8px 16px",
    "&:hover": {
      background: "linear-gradient(90deg, #764ba2 0%, #667eea 100%)",
    },
  },
}));

export const contactUsStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
  },
  textContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    margin: "10px 0",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
}));

export const footerStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  shell: {
    width: "90%",
    maxWidth: "1500px",
    margin: "0 auto",
    borderRadius: "28px",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    background:
      "radial-gradient(circle at 10% 0%, rgba(37, 99, 235, 0.18) 0%, rgba(15, 23, 42, 0) 40%), linear-gradient(160deg, #0f172a 0%, #0b1220 100%)",
    boxShadow: "0 28px 64px rgba(15, 23, 42, 0.28)",
    color: "#cbd5e1",
    padding: theme.spacing(6, 6, 4),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(4, 2.5, 3),
      width: "94%",
      borderRadius: "20px",
    },
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    marginBottom: theme.spacing(4),
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.25),
  },
  logo: {
    height: "40px",
    width: "40px",
    objectFit: "contain",
    cursor: "pointer",
  },
  brandText: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    margin: 0,
    fontSize: "1.4rem",
    letterSpacing: "-0.2px",
    fontWeight: 800,
  },
  brandPrimary: {
    color: "#f8fafc",
  },
  brandAccent: {
    color: "#3b82f6",
    marginLeft: "1px",
  },
  subtitle: {
    margin: theme.spacing(1.5, 0, 0),
    color: "#cbd5e1", // Improved contrast from Slate 400 to 300
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
  gridContainer: {
    rowGap: theme.spacing(3),
  },
  sectionTitle: {
    color: "#f1f5f9",
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    marginBottom: theme.spacing(2),
  },
  footerLink: {
    display: "block",
    marginBottom: theme.spacing(1.2),
    color: "#cbd5e1", // Improved contrast from Slate 400 to 300
    fontSize: "0.93rem",
    textDecoration: "none",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#3b82f6", // Blue on hover for better interaction feedback
      transform: "translateX(4px)",
    },
  },
  description: {
    color: "#cbd5e1", // Improved contrast from Slate 400 to 300
    lineHeight: 1.75,
    fontSize: "0.93rem",
  },
  divider: {
    margin: theme.spacing(4, 0, 2.5),
    borderColor: "rgba(148, 163, 184, 0.15)",
  },
  copyright: {
    textAlign: "center",
    color: "#94a3b8", // Improved contrast from Slate 500 to 400
    fontSize: "0.88rem",
    margin: 0,
  },
}));
