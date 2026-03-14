import React, { useEffect, useRef } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";
import WindowRoundedIcon from "@mui/icons-material/WindowRounded";
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
            video.play().catch(() => {});
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
    window.open("https://flutterpilot-studio.web.app", "_blank", "noopener,noreferrer");
  };
  const openDownloadPage = () => {
    window.open(
      "https://drive.google.com/file/d/1Z1o9wK4KneaYO33c_iS8BDAqJUs2aPj0/view?usp=drivesdk",
      "_blank",
      "noopener,noreferrer"
    );
  };
  const openPlayStore = () => {
    window.open("https://play.google.com/store/apps/details?id=com.builder.flutterpilot", "_blank", "noopener,noreferrer");
  };

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
            Prompt, Visualize & Ship Flutter Apps
          </Typography>

          <Typography variant="body1" className={classes.heroSubtitle}>
            Prompt-edit, visualize live, export clean code freely — no lock-in, APK-ready.
          </Typography>

          <div className={classes.buttonsContainer}>
            <Button
              onClick={openOnlineEditor}
              className={`${classes.button} ${classes.glowBtn}`}
              startIcon={<LanguageRoundedIcon fontSize="small" />}
              aria-label="Open FlutterPilot web app"
            >
              Web App
            </Button>

            <Button
              onClick={openPlayStore}
              className={`${classes.button} ${classes.playStoreBtn}`}
              startIcon={<AndroidRoundedIcon fontSize="small" />}
              aria-label="Download FlutterPilot on Android"
            >
              Android
            </Button>

            <Button
              onClick={openDownloadPage}
              className={`${classes.button} ${classes.windowsBtn} ${classes.downloadBtn}`}
              startIcon={<WindowRoundedIcon fontSize="small" />}
              aria-label="Download FlutterPilot for Windows"
            >
              Windows
            </Button>
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
