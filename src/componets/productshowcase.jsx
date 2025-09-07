import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button ,Box,Hidden} from "@material-ui/core";
import { cardBackgroudColor, titleColor, titleHoverShadow } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import { video } from "framer-motion/client";

const ProductShowcase = () => {
  const classes = commonStyles();

  useEffect(()=>{
    playVideo()
  },[])
  

  const playVideo= ()=>{
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
    window.open("https://flutterpilot.web.app");
  };
  
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
              component="a"
              href="https://s3.ap-south-1.amazonaws.com/flutterpilot.com/windows_build/flutter_builder.exe"
              download="flutter_builder.exe"
              target="_blank"
              rel="noreferrer"
              className={`${classes.button} ${classes.windowsBtn}`}
              startIcon={appIcon(24, "download-image.png")}
            >
              FOR WINDOWS
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
            <video id ={"productvideo"} style={{ width: '100%', height: 'auto', borderRadius: '12px'}} loop autoPlay muted playsinline >
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