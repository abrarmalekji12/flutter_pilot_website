import React, { useEffect, useRef } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import WindowRoundedIcon from "@mui/icons-material/WindowRounded";
import DesktopMacRoundedIcon from "@mui/icons-material/DesktopMacRounded";
import { commonStyles } from "../styles/commonStyles";

const ProductShowcase = () => {
  const classes = commonStyles();
  const videoRef = useRef(null);
  const videoSrc = `${process.env.PUBLIC_URL}/productShowCase2.mp4`;
  const videoPoster = `${process.env.PUBLIC_URL}/flutterpilot_ss.webp`;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.35;

    // Use Intersection Observer to only play when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Links and handlers
  const openOnlineEditor = () => {
    window.open("https://studio.flutterpilot.com", "_blank", "noopener,noreferrer");
  };
  const openMacDownload = () => {
    window.location.href = "https://storage.googleapis.com/flutter-visual-builder-staging.appspot.com/releases/macos/latest/flutterpilot-macos-latest.dmg";
  };
  const openWindowsDownload = () => {
    window.location.href = "https://storage.googleapis.com/flutter-visual-builder-staging.appspot.com/releases/windows/latest/flutterpilot-windows-latest.exe";
  };
  const openPlayStore = () => {
    window.open("https://play.google.com/store/apps/details?id=com.builder.flutterpilot", "_blank", "noopener,noreferrer");
  };
  const openAppStore = () => {
    window.open("https://apps.apple.com/in/app/ai-app-builder-flutterpilot/id6759552936", "_blank", "noopener,noreferrer");
  };

  // Platform Detection
  const getPlatform = () => {
    const userAgent = window.navigator.userAgent;
    if (/Android/i.test(userAgent)) return "Android";
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
    if (/Mac/i.test(userAgent)) return "macOS";
    if (/Win/i.test(userAgent)) return "Windows";
    return null;
  };

  const currentPlatform = getPlatform();

  const platforms = [
    { name: "Android", icon: <AndroidRoundedIcon />, action: openPlayStore },
    { name: "iOS", icon: <PhoneIphoneRoundedIcon />, action: openAppStore },
    { name: "macOS", icon: <DesktopMacRoundedIcon />, action: openMacDownload },
    { name: "Windows", icon: <WindowRoundedIcon />, action: openWindowsDownload },
  ];

  const detectedPlatformData = platforms.find(p => p.name === currentPlatform);
  const otherPlatforms = platforms.filter(p => p.name !== currentPlatform);

  return (
    <Container className={classes.productShowCaseContainer} maxWidth={false} disableGutters style={{ marginTop: 0 }}>
      {/* Background Elements */}
      <div className={classes.bgGlow}></div>
      <div className={`${classes.floatingShape} ${classes.shapePhone}`}></div>
      <div className={`${classes.floatingShape} ${classes.shapeTablet}`}></div>
      <div className={`${classes.floatingShape} ${classes.shapeLaptop}`}></div>

      <Box className={classes.contentWrapper}>
        {/* Central Product Image */}

        {/* Text Content (Left Side) */}
        <div className={classes.heroTextContainer}>
          <Typography
            variant="h2"
            component="h2"
            className={classes.heroTitle}
          >
            Build Mobile Apps with Prompts
          </Typography>

          <Typography variant="body1" className={classes.heroSubtitle}>
            Prompt, edit, and preview in real time. Export clean code freely — no lock-in.
          </Typography>

          {/* Primary CTA */}
          <div className={classes.primaryCtaWrapper}>
            <Button
              onClick={openOnlineEditor}
              className={classes.primaryCtaBtn}
              startIcon={<LanguageRoundedIcon />}
            >
              Start Building Free
            </Button>
            <Typography className={classes.ctaSubtext}>
              Try in Browser • No install required
            </Typography>
          </div>

          {/* Secondary CTA (Detected Platform) */}
          {detectedPlatformData && (
            <div className={classes.secondaryCtaWrapper}>
              <Button
                onClick={detectedPlatformData.action}
                className={classes.secondaryCtaBtn}
                startIcon={detectedPlatformData.icon}
              >
                Download for {detectedPlatformData.name}
              </Button>
            </div>
          )}

          {/* Other Platforms */}
          <div className={classes.otherPlatformsSection}>
            {isMobile && <Typography className={classes.availableOnLabel}>Available on</Typography>}
            <div className={classes.otherPlatformsGrid} style={isMobile ? { flexDirection: "row", gap: "12px" } : {}}>
              {otherPlatforms.map((p) => (
                <Button
                  key={p.name}
                  onClick={p.action}
                  className={isMobile ? classes.platformCircleBtn : classes.ghostBtn}
                  startIcon={p.icon}
                  aria-label={`Available on ${p.name}`}
                >
                  {!isMobile && p.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Box className={classes.centerImage}>
          <motion.div
            className={classes.browserFrame}
            whileHover={{ y: -5, boxShadow: "0 32px 64px rgba(15, 23, 42, 0.16)" }}
            transition={{ duration: 0.4 }}
            style={{ width: "96%", maxWidth: "1200px" }}
          >
            <div className={classes.browserToolbar}>
              <div className={classes.browserDot} />
              <div className={classes.browserDot} />
              <div className={classes.browserDot} />
            </div>
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "0 0 12px 12px",
                transform: "translateZ(0)", // Force GPU acceleration for sharper rendering
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              poster={videoPoster}
              preload={isMobile ? "none" : "metadata"}
              loop
              muted
              playsInline
              fetchpriority={isMobile ? "low" : "auto"}
              crossOrigin="anonymous"
              aria-label="FlutterPilot AI Flutter app builder demo — create screens from prompts, drag-and-drop editor, real-time preview"
              title="FlutterPilot Platform Demo"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support this video.
            </video>
          </motion.div>
        </Box>


        {/* Background Image (Medium and above screens) */}
        {/* <Hidden smDown>
        <Box  className={classes.imageBackground}>
          <img 
            src="flutterpilot_ss.webp" 
            alt="FlutterPilot App Interface"
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
          <div className={classes.imageOverlay}>
            <div className={`${classes.dot} ${classes.dot1}`}></div>
            <div className={`${classes.dot} ${classes.dot2}`}></div>
            <div className={`${classes.dot} ${classes.dot3}`}></div>
          </div>
        </Box>
        </Hidden> */}
      </Box>
    </Container>
  );
};
export default ProductShowcase;
