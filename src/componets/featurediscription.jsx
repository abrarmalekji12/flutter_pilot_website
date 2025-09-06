// src/components/featurediscription.js
import React, { useEffect } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { cardBackgroudColor, titleColor, titleHoverShadow } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(2),     // ✅ reduce white gap at top
//     marginBottom: theme.spacing(8),
//     fontFamily: "'Inter', sans-serif",
//     position: "relative",
//     padding: 0,
//     background: "transparent",       // ✅ no solid white above
//   },
//   card: {
//     position: "relative",
//     borderRadius: "20px",
//     overflow: "hidden",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//     background: cardBackgroudColor,
//     color: "#fff",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     "&:hover": {
//       transform: "translateY(-6px)",
//       boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
//     },

//     // Glowing radial background
//     "&::before": {
//       content: '""',
//       position: "absolute",
//       top: "-20%",
//       left: "-20%",
//       width: "160%",
//       height: "160%",
//       background:
//         "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
//       animation: "$pulse 8s ease-in-out infinite",
//       zIndex: 0,
//     },
//   },

//   // Floating device shapes
//   floatingShape: {
//     position: "absolute",
//     border: "2px solid rgba(255,255,255,0.1)",
//     borderRadius: "16px",
//     backdropFilter: "blur(4px)",
//     animation: "$float 10s infinite ease-in-out alternate",
//     zIndex: 0,
//   },
//   shapePhone: {
//     width: "80px",
//     height: "140px",
//     top: "15%",
//     left: "5%",
//   },
//   shapeTablet: {
//     width: "140px",
//     height: "200px",
//     bottom: "10%",
//     right: "6%",
//     animationDelay: "2s",
//   },
//   shapeLaptop: {
//     width: "200px",
//     height: "130px",
//     bottom: "5%",
//     left: "40%",
//     borderRadius: "8px",
//     animationDelay: "4s",
//   },

//   // Animations
//   "@keyframes float": {
//     "0%": { transform: "translateY(0px) rotate(0deg)" },
//     "100%": { transform: "translateY(-15px) rotate(3deg)" },
//   },
//   "@keyframes pulse": {
//     "0%": { opacity: 0.4 },
//     "50%": { opacity: 0.8 },
//     "100%": { opacity: 0.4 },
//   },

//   featureGifContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: theme.spacing(3),
//     zIndex: 2,
//   },
//   featureGif: {
//     maxWidth: "100%",
//     maxHeight: "320px",
//     objectFit: "contain",
//     borderRadius: "12px",
//     transition: "transform 0.4s ease",
//     "&:hover": {
//       transform: "scale(1.05)",
//     },
//   },
//   featureDescription: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     padding: theme.spacing(5),   // ✅ reduced so title not cut
//     margin: 0,
//     zIndex: 2,
//     [theme.breakpoints.down("xs")]: {
//       textAlign: "center",
//       padding: theme.spacing(3),
//     },
//     "& li": {
//       listStyleType: "none",
//       marginBottom: "1rem",
//       fontSize: "1.05rem",
//       fontWeight: 500,
//       color: "#ddd",
//       lineHeight: 1.6,
//       position: "relative",
//       paddingLeft: "1.8rem",
//       transition: "all 0.3s ease",
//       "&:before": {
//         content: '"✔"',
//         position: "absolute",
//         left: 0,
//         top: 0,
//         color: "#4A90E2",
//         fontSize: "1.2rem",
//         fontWeight: "bold",
//         transition: "transform 0.3s ease",
//       },
//       "& strong": {
//         color: "#fff",
//         fontWeight: 700,
//       },
//       "& code": {
//         background: "rgba(255,255,255,0.08)",
//         padding: "2px 6px",
//         borderRadius: "6px",
//         fontFamily: "monospace",
//         fontSize: "0.95rem",
//         color: "#ff80ab",
//       },
//       "&:hover": {
//         color: "#fff",
//         transform: "translateX(4px)",
//       },
//       "&:hover:before": {
//         transform: "scale(1.2) rotate(10deg)",
//       },
//     },
//   },
//   title: {
//   fontWeight: 800,
//   fontSize: "2.6rem",   // 🔥 Bigger headline
//   lineHeight: 1.2,
//   letterSpacing: "-0.5px",
//   marginBottom: theme.spacing(2),
//   background: titleColor, // brighter
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   display: "inline-block",
//   position: "relative",
//   zIndex: 3,
//   textShadow: "0 2px 20px rgba(0,0,0,0.6)", // 🔥 glow for readability
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-4px) scale(1.05)",
//     textShadow: titleHoverShadow
//     // "0 0 10px rgba(54, 209, 220, 0.8)"
//               //  titleHoverShadow, 
//               //  0 0 30px rgba(91, 134, 229, 0.6)", // animated glow
//   },
// },
//   subtitle: {
//   fontSize: "1.15rem",
//   fontWeight: 400,
//   color: "rgba(255,255,255,0.85)", // 🔥 brighter than #ddd
//   lineHeight: 1.8,
//   letterSpacing: "0.3px",
//   maxWidth: "95%",
//   position: "relative",
//   display: "inline-block",
//   zIndex: 2,
//   "&:after": {
//     content: '""',
//     position: "absolute",
//     width: "0%",
//     height: "2px",
//     bottom: 0,
//     left: 0,
//     background: titleColor,
//     transition: "width 0.4s ease",
//   },
//   "&:hover:after": {
//     width: "100%",
//   },
// },
// }));

const FeatureShowcase = (props) => {
  const classes = commonStyles();
  const MotionPaper = motion(Paper);

  useEffect(()=>{
    if(props.isVideo) {playVideo()}
    },[])
    
  
    const playVideo= ()=>{
      document.getElementById("video"+props.index).playbackRate = 1.5;
      document.getElementById("video"+props.index).play = true;
  
    }

  const imageShow = (props) => {
    console.log("props",props)
    if (props.isVideo) {
    return(  <motion.video
        id={"video" + props.index}
        className={classes.featureGif}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        loop autoPlay muted playsinline
      >
        <source
          src={props.url}
          alt="Feature GIF"
        />
      </motion.video>)
    } else {
      return(
      <motion.img
        src={props.url}
        alt="Feature GIF"
        className={classes.featureGif}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />)
    }
    
    }

  return (
    <div className={classes.root}>
      <MotionPaper
        className={classes.card}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Floating Background Shapes */}
        <div className={`${classes.floatingShape} ${classes.shapePhone}`} />
        <div className={`${classes.floatingShape} ${classes.shapeTablet}`} />
        <div className={`${classes.floatingShape} ${classes.shapeLaptop}`} />

        <Grid container>
          {props.alignleft ? (
            <>
              <Grid item xs={12} md={6} className={classes.featureGifContainer}>
                {imageShow(props)}
              </Grid>
              <Grid item xs={12} md={6} className={classes.featureDescription}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Typography className={classes.title}>
                    {props.title}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Typography className={classes.subtitle} component="div">
                    <ul>{props.discription}</ul>
                  </Typography>
                </motion.div>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={6} className={classes.featureDescription}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Typography className={classes.title}>
                    {props.title}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Typography className={classes.subtitle} component="div">
                    <ul>{props.discription}</ul>
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.featureGifContainer}>
                {imageShow(props)}
              </Grid>
            </>
          )}
        </Grid>
      </MotionPaper>
    </div>
  );
};

export default FeatureShowcase;