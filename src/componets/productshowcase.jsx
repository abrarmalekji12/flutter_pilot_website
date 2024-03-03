import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(8),
    background: "linear-gradient(45deg, #4A154B 30%, #1B486D 90%)", // Customize the background color or image here
    maxWidth: "100%",
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: theme.palette.common.white,
  },
  image: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  description: {
    fontSize: "20px",
    marginBottom: theme.spacing(4),
  },
  signUpButton: {
    marginRight: theme.spacing(2),
  },
}));

const ProductShowcase = () => {
  const classes = useStyles();
  const onTap = ()=>{
    window.open('https://flutterpilot.web.app');
  }
  const appIcon = (
      <img width={30} src="flutterpilot_logo_dark.png" />
  );

  return (
    <Container className={classes.container}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <img
            src="flutterpilot_ss.png"
          
            style={{
          display: 'block',
          width: "100%"
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" className={classes.title}>
            Build your ideas Faster
          </Typography>
          <Typography variant="body1" className={classes.description}>
            FlutterPilot is Low Code platform built on top of Flutter, by just
            drag & drop you can create beautiful reactive app for all
            platform
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="#2c44ab"
              
                style={{
                  backgroundColor: 'white',
            fontSize: '16px',
            fontWeight: 'bold'
                }}
                className={classes.signUpButton}
                onClick={onTap}
                startIcon={appIcon}
              >
                Get Started!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductShowcase;
