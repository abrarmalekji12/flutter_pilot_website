import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button, Box, Hidden } from "@material-ui/core";
import { cardBackgroudColor, titleColor, titleHoverShadow } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import { video } from "framer-motion/client";
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

const PlayStoreIcon = () => (
  
  <svg fill="#000000" width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5_logos</title>
  <path d="M48,59.49v393a4.33,4.33,0,0,0,7.37,3.07L260,256,55.37,56.42A4.33,4.33,0,0,0,48,59.49Z" /><path d="M345.8,174,89.22,32.64l-.16-.09c-4.42-2.4-8.62,3.58-5,7.06L285.19,231.93Z" />
  <path d="M84.08,472.39c-3.64,3.48.56,9.46,5,7.06l.16-.09L345.8,338l-60.61-57.95Z" /><path d="M449.38,231l-71.65-39.46L310.36,256l67.37,64.43L449.38,281C468.87,270.23,468.87,241.77,449.38,231Z" /></svg>
);

const ProductShowcase = () => {
  const classes = commonStyles();

  useEffect(() => {
    playVideo()
  }, [])


  const playVideo = () => {
    document.getElementById("productvideo").playbackRate = 1.5;
    document.getElementById("productvideo").play = true;

  }
  // Helper function for app icon
  const appIcon = (size, src) => (
    <img
      width={size}
      src={src}
      alt=""
      className={classes.icon}
    />
  );

  // Links and handlers
  const openOnlineEditor = () => {
    window.open("https://flutterpilot-studio.web.app");
  };
  const openDownloadPage = () => {
    window.open("https://drive.google.com/file/d/1Z1o9wK4KneaYO33c_iS8BDAqJUs2aPj0/view?usp=drivesdk");
  }
  const openPlayStore = () => {
    window.open("https://play.google.com/store/apps/details?id=com.builder.flutterpilot");
  }

  return (
    <Container className={classes.productShowCaseContainer} maxWidth="xl">
      {/* Background Elements */}
      <div className={classes.bgGlow}></div>
      <div className={`${classes.floatingShape} ${classes.shapePhone}`}></div>
      <div className={`${classes.floatingShape} ${classes.shapeTablet}`}></div>
      <div className={`${classes.floatingShape} ${classes.shapeLaptop}`}></div>

      <Box className={classes.contentWrapper}>
        {/* Central Product Image */}


        {/* Text Content (Left Side) */}
        <div className={classes.textContainer}>
          <Typography
            variant="h2"
            className={`${classes.title}`}
          >
            Build your ideas Faster
          </Typography>

          <Typography variant="body1" className={classes.subtitle}>
            FlutterPilot is a low-code platform powered by Flutter.
            With simple drag-and-drop, you can create beautiful, reactive apps for any platform in minutes.
          </Typography>

          <div className={classes.buttonsContainer}>
            <Button
              // component="a"
              // href="https://drive.google.com/file/d/1Z1o9wK4KneaYO33c_iS8BDAqJUs2aPj0/view?usp=drivesdk"
              // download="flutter_builder.exe"
              // target="_blank"
              // rel="noreferrer"
              onClick={openDownloadPage}
              className={`${classes.button} ${classes.windowsBtn}`}
              startIcon={appIcon(24, "download-image.png")}
            >
              FOR WINDOWS
            </Button>

            <Button
              onClick={openPlayStore}
              className={`${classes.button} ${classes.playStoreBtn}`}
              startIcon={<PlayStoreIcon />}
            >
              PLAY STORE
            </Button>

            <Button
              onClick={openOnlineEditor}
              className={`${classes.button} ${classes.glowBtn}`}
              startIcon={appIcon(24, "browser.png")}
            >
              ONLINE EDITOR
            </Button>
          </div>
        </div>
        <Box className={classes.centerImage}>
          <div className={classes.imageBackground} style={{ position: 'relative' }}>
            <video id={"productvideo"} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} loop autoPlay muted playsinline >
              <source
                src="productShowCase2.mov"
                alt="FlutterPilot App Interface"
              />
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