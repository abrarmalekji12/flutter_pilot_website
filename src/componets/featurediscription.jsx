import React, { useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { commonStyles } from "../styles/commonStyles";


const FeatureShowcase = (props) => {
  const classes = commonStyles();
  const videoRef = useRef(null);

  useEffect(() => {
    if (props.isVideo && videoRef.current) {
      videoRef.current.playbackRate = 1.25;
    }
  }, [props.isVideo]);

  const MediaContent = () => {
    const media = props.isVideo ? (
      <video
        ref={videoRef}
        style={{ width: "100%", display: "block", borderRadius: "0 0 12px 12px" }}
        loop
        autoPlay
        muted
        playsInline
      >
        <source src={props.url} />
      </video>
    ) : (
      <img
        src={props.url}
        alt={props.title}
        loading="lazy"
        style={{ width: "100%", display: "block", borderRadius: "0 0 12px 12px" }}
      />
    );

    return (
      <motion.div 
        className={classes.browserFrame}
        whileHover={{ y: -5, boxShadow: "0 32px 64px rgba(15, 23, 42, 0.16)" }}
        transition={{ duration: 0.4 }}
      >
        <div className={classes.browserToolbar}>
          <div className={classes.browserDot} />
          <div className={classes.browserDot} />
          <div className={classes.browserDot} />
        </div>
        {media}
      </motion.div>
    );
  };

  return (
    <article className={classes.root} style={{ marginBottom: 0 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className={classes.featureGlassCard}>
          <Grid container spacing={6} alignItems="center">
            {props.noMedia ? (
              <Grid item xs={12} className={classes.featureDescription} style={{ alignItems: "center" }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <span className={classes.featureBadge}>Capabilities</span>
                  <Typography variant="h2" className={classes.title}>
                    {props.title}
                  </Typography>
                  <Typography className={classes.subtitle} component="div" style={{ color: "#334155" }}>
                    <ul>{props.discription}</ul>
                  </Typography>
                </motion.div>
              </Grid>
            ) : props.alignleft ? (
              <>
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                  <MediaContent />
                </Grid>
                <Grid item xs={12} md={6} className={classes.featureDescription} order={{ xs: 1, md: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className={classes.featureBadge}>Capabilities</span>
                    <Typography variant="h2" className={classes.title}>
                      {props.title}
                    </Typography>
                    <Typography className={classes.subtitle} component="div" style={{ color: "#334155" }}>
                      <ul>{props.discription}</ul>
                    </Typography>
                  </motion.div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={6} className={classes.featureDescription}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className={classes.featureBadge}>Innovation</span>
                    <Typography variant="h2" className={classes.title}>
                      {props.title}
                    </Typography>
                    <Typography className={classes.subtitle} component="div" style={{ color: "#334155" }}>
                      <ul>{props.discription}</ul>
                    </Typography>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MediaContent />
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </motion.div>
    </article>
  );
};

export default FeatureShowcase;
