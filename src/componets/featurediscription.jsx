import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },

  featureGifContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    maxWidth: "100%",
    maxHeight: "400px",
    borderRadius: "10px 10px 0 0",
    [theme.breakpoints.down("xs")]: {
      order: 2,
    },
  },
  featureGif: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  featureDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      order: 1,
      textAlign: "center",
    },
  },
}));

const FeatureShowcase = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.container}>
        {props.alignleft ? (
          <>
            <Grid item xs={12} sm={6} className={classes.featureGifContainer}>
              <img
                src={props.url}
                alt="Feature GIF"
                className={classes.featureGif}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.featureDescription}>
              <Typography variant="h5" gutterBottom style={{
                fontWeight:'bold'
              }}>
                {props.title}
              </Typography>
              <Typography variant="body1" style={{
                fontSize:'16px',
                fontWeight: '500'
              }}>{props.discription}</Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6} className={classes.featureDescription}>
              <Typography variant="h5" gutterBottom  style={{
                fontWeight:'bold'
              }}>
                {props.title}
              </Typography>
              <Typography variant="body1"  style={{
                fontSize:'16px',
                fontWeight: '500'
              }}>{props.discription}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.featureGifContainer}>
              <img
                src={props.url}
                alt="Feature GIF"
                className={classes.featureGif}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default FeatureShowcase;
