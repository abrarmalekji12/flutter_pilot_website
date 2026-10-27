import React, { useEffect, useRef } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import WindowRoundedIcon from "@mui/icons-material/WindowRounded";
import DesktopMacRoundedIcon from "@mui/icons-material/DesktopMacRounded";
import { commonStyles } from "../styles/commonStyles";
import {
  APP_STORE_URL,
  MAC_DOWNLOAD_URL,
  WINDOWS_DOWNLOAD_URL,
  playStoreUrl,
  studioUrl,
} from "../utils/studioLinks";

const PLACEMENT = { campaign: "home", content: "studio-showcase" };

const ProductShowcase = () => {
  const classes = commonStyles();
  const videoRef = useRef(null);
  const videoSrc = `${process.env.PUBLIC_URL}/visual_edit_preview.mp4`;
  const videoPoster = `${process.env.PUBLIC_URL}/flutterpilot_ss.webp`;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    video.playbackRate = 1;

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

  // Real links: crawlable, and they open the way the visitor expects.
  // Downloads start in place; stores open in a new tab.
  const download = (href) => ({ component: "a", href });
  const newTab = (href) => ({ component: "a", href, target: "_blank", rel: "noopener noreferrer" });
  // Linux: https://storage.googleapis.com/flutter-visual-builder-staging.appspot.com/releases/linux/latest/flutterpilot-linux-latest.tar

  // Platform Detection
  const getPlatform = () => {
    const userAgent = window.navigator.userAgent;
    if (/Android/i.test(userAgent)) return "Android";
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
    if (/Mac/i.test(userAgent)) return "macOS";
    if (/Win/i.test(userAgent)) return "Windows";
    // if (/Linux/i.test(userAgent)) return "Linux";
    return null;
  };

  const currentPlatform = getPlatform();

  const platforms = [
    { name: "Android", icon: <AndroidRoundedIcon />, link: newTab(playStoreUrl(PLACEMENT)) },
    { name: "iOS", icon: <PhoneIphoneRoundedIcon />, link: newTab(APP_STORE_URL) },
    { name: "macOS", icon: <DesktopMacRoundedIcon />, link: download(MAC_DOWNLOAD_URL) },
    { name: "Windows", icon: <WindowRoundedIcon />, link: download(WINDOWS_DOWNLOAD_URL) },
    // { name: "Linux", icon: <ComputerRoundedIcon /> },
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
            Meet the FlutterPilot Studio
          </Typography>

          <Typography variant="body1" className={classes.heroSubtitle}>
            The visual workspace behind every demo: generate, edit, connect data, test interactions, and export.
          </Typography>

          {/* Primary CTA */}
          <div className={classes.primaryCtaWrapper}>
            <Button
              {...newTab(studioUrl(PLACEMENT))}
              className={classes.primaryCtaBtn}
              startIcon={<LanguageRoundedIcon />}
            >
              Open Web Studio
            </Button>
            <Typography className={classes.ctaSubtext}>
              Build in your browser • No install required •{" "}
              <a href="/#pricing-and-delivery">See costs</a>
            </Typography>
          </div>

          {/* Secondary CTA (Detected Platform) */}
          {detectedPlatformData && (
            <div className={classes.secondaryCtaWrapper}>
              <Button
                {...detectedPlatformData.link}
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
                  {...p.link}
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
                aspectRatio: "1920 / 1176",
                objectFit: "cover",
                transform: "translateZ(0)", // Force GPU acceleration for sharper rendering
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              poster={videoPoster}
              preload="none"
              loop
              muted
              playsInline
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
