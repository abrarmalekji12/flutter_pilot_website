import React, { useEffect, useRef } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { commonStyles } from "../styles/commonStyles";

const FeatureShowcase = (props) => {
  const classes = commonStyles();
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const video = videoRef.current;
    if (!props.isVideo || !video) return;

    video.playbackRate = 1.25;

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
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [props.isVideo]);

  const MediaContent = ({ borderRadius }) => {
    const radius = borderRadius ?? "0 0 12px 12px";
    const media = props.isVideo ? (
      <video
        ref={videoRef}
        style={{ 
          width: "100%", 
          height: "auto", 
          display: "block", 
          borderRadius: radius,
          transform: "translateZ(0)", // Hardware acceleration
          WebkitBackfaceVisibility: "hidden",
        }}
        loop
        muted
        playsInline
        preload={isMobile ? "none" : "metadata"}
        fetchpriority={isMobile ? "low" : "auto"}
        crossOrigin="anonymous"
      >
        <source src={props.url} type="video/mp4" />
      </video>
    ) : (
      <img
        src={props.url}
        alt={props.title}
        loading="lazy"
        style={{ width: "100%", display: "block", borderRadius: radius }}
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

  // ── Hero-media layout: compact header on top, full-width video below ──
  if (props.heroMedia) {
    return (
      <article className={classes.root} style={{ marginBottom: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className={classes.featureGlassCard}>
            {/* Compact header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: "28px",
              }}
            >
              <span className={classes.featureBadge}>Design</span>
              <Typography variant="h2" className={classes.title} style={{ marginBottom: "10px" }}>
                {props.title}
              </Typography>
              {props.subtitle && (
                <Typography
                  component="p"
                  style={{
                    fontSize: "1.05rem",
                    color: "#475569",
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: "680px",
                    fontWeight: 400,
                  }}
                >
                  {props.subtitle}
                </Typography>
              )}
            </motion.div>

            {/* Full-width video */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <MediaContent borderRadius="12px" />
            </motion.div>
          </div>
        </motion.div>
      </article>
    );
  }

  // ── Feature-grid layout: header + icon cards grid + "Learn more" CTA ──
  if (props.featureGrid) {
    return (
      <article className={classes.root} style={{ marginBottom: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className={classes.featureGlassCard}>
            {/* Header row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              viewport={{ once: true }}
              style={{ marginBottom: "32px" }}
            >
              <span className={classes.featureBadge}>Capabilities</span>
              <Typography variant="h2" className={classes.title} style={{ marginBottom: "10px" }}>
                {props.title}
              </Typography>
              {props.subtitle && (
                <Typography
                  component="p"
                  style={{
                    fontSize: "1.05rem",
                    color: "#475569",
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: "620px",
                    fontWeight: 400,
                  }}
                >
                  {props.subtitle}
                </Typography>
              )}
            </motion.div>

            {/* Feature cards grid */}
            <Grid container spacing={2.5}>
              {(props.items || []).map((item, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <motion.div
                    className={classes.toolingCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                    viewport={{ once: true }}
                  >
                    {/* Icon — fixed width left column */}
                    <Box className={classes.toolingCardIcon}>
                      {item.icon}
                    </Box>

                    {/* Text — right column, fills remaining space */}
                    <Box className={classes.toolingCardContent}>
                      <Typography
                        component="h3"
                        style={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "#0f172a",
                          lineHeight: 1.3,
                          margin: 0,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        component="p"
                        style={{
                          fontSize: "0.85rem",
                          color: "#64748b",
                          lineHeight: 1.6,
                          margin: 0,
                          fontWeight: 400,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Learn more CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: true }}
              style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px" }}
            >
              <Button
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
                onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/docs"); }}
                sx={{
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  px: 3,
                  py: 1.3,
                  background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                  boxShadow: "0 10px 24px rgba(37, 99, 235, 0.25)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 14px 28px rgba(37, 99, 235, 0.32)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                Learn more
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </article>
    );
  }

  // ── Default two-column or no-media layout ──
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
              <Grid item xs={12} className={classes.featureDescription}>
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
