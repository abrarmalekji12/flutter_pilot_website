import React, { useEffect, useRef } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import AndroidRoundedIcon from "@mui/icons-material/AndroidRounded";
import WindowRoundedIcon from "@mui/icons-material/WindowRounded";
import { commonStyles } from "../styles/commonStyles";

const ProductShowcase = () => {
  const classes = commonStyles();
  const videoRef = useRef(null);
  const videoSrc = `${process.env.PUBLIC_URL}/productShowCase2.mov`;
  const videoPoster = `${process.env.PUBLIC_URL}/flutterpilot_ss.png`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.35;
      const playPromise = videoRef.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }
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
            Build Flutter Apps Faster with AI
          </Typography>

          <Typography variant="body1" className={classes.heroSubtitle}>
            Prompt, edit, and ship from one workspace.
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
          <div className={classes.imageBackground} style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              poster={videoPoster}
              preload="metadata"
              loop
              autoPlay
              muted
              playsInline
              aria-label="FlutterPilot AI Flutter app builder demo — create screens from prompts, drag-and-drop editor, real-time preview"
              title="FlutterPilot Platform Demo"
            >
              <source src={videoSrc} />
              Your browser does not support this video. Visit FlutterPilot to see the AI Flutter app builder in action.
            </video>
            <div className={classes.imageOverlay}>
              <div className={`${classes.dot} ${classes.dot1}`}></div>
              <div className={`${classes.dot} ${classes.dot2}`}></div>
              <div className={`${classes.dot} ${classes.dot3}`}></div>
            </div>
          </div>
        </Box>

        {/* Background Image (Medium and above screens) */}
        {/* <Hidden smDown>
        <Box  className={classes.imageBackground}>
          <img 
            src="flutterpilot_ss.png" 
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
