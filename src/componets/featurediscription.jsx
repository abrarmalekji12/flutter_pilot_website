// src/components/featurediscription.js
import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
    },
  },
  featureGifContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    background: "#f9fafb",
  },
  featureGif: {
    maxWidth: "100%",
    maxHeight: "320px",
    objectFit: "contain",
    borderRadius: "12px",
    transition: "transform 0.4s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  featureDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(6),
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      padding: theme.spacing(4),
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    "& li": {
      listStyleType: "none",
    marginBottom: "1rem",
    fontSize: "1.05rem",
    fontWeight: 500,
    color: "#444",
    lineHeight: 1.6,
    position: "relative",
    paddingLeft: "1.8rem",
    transition: "all 0.3s ease",
    "&:before": {
      content: '"✔"',
      position: "absolute",
      left: 0,
      top: 0,
      color: "#4A154B",
      fontSize: "1.2rem",
      fontWeight: "bold",
      transition: "transform 0.3s ease",
    },
     "& strong": {
      color: "#111",
      fontWeight: 700,
    },
    "& code": {
      background: "#f4f4f4",
      padding: "2px 6px",
      borderRadius: "6px",
      fontFamily: "monospace",
      fontSize: "0.95rem",
      color: "#d63384",
    },
    "&:hover": {
      color: "#111",
      transform: "translateX(4px)",
    },
    "&:hover:before": {
      transform: "scale(1.2) rotate(10deg)",
    },
  },
  },
  title: {
    fontWeight: 800,
    fontSize: "2.2rem",
    lineHeight: 1.2,
    letterSpacing: "-0.5px",
    marginBottom: theme.spacing(2),
    background: "linear-gradient(45deg, #4A154B 30%, #1B486D 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    position: "relative",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px) scale(1.03)",
      textShadow: "0px 4px 15px rgba(79,172,254,0.6)",
    },
  },
  subtitle: {
    fontSize: "1.1rem",
    fontWeight: 500,
    color: "#444",
    lineHeight: 1.7,
    letterSpacing: "0.3px",
    maxWidth: "95%",
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
    "&:after": {
      content: '""',
      position: "absolute",
      width: "0%",
      height: "2px",
      bottom: 0,
      left: 0,
      background: "linear-gradient(45deg, #4A154B 30%, #1B486D 90%)",
      transition: "width 0.4s ease",
    },
    "&:hover:after": {
      width: "100%",
    },
  },
}));

const FeatureShowcase = (props) => {
  const classes = useStyles();
  const MotionPaper = motion(Paper);

  return (
    <div className={classes.root}>
      <MotionPaper
        className={classes.card}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Grid container>
          {props.alignleft ? (
            <>
              <Grid item xs={12} md={6} className={classes.featureGifContainer}>
                <motion.img
                  src={props.url}
                  alt="Feature GIF"
                  className={classes.featureGif}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
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
                    <ul className={classes.featureList}>
                     {props.discription}
                    </ul>
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
                  <Typography className={classes.subtitle}>
                    {props.discription}
                  </Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} className={classes.featureGifContainer}>
                <motion.img
                  src={props.url}
                  alt="Feature GIF"
                  className={classes.featureGif}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </MotionPaper>
    </div>
  );
};

export default FeatureShowcase;