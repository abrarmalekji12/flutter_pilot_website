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

  const onWinTap = ()=>{
 }
  const appIcon = (a,e)=>(
      <img width={a} src={e} />
  );

  return (
    <Container className={classes.container}>
      <Grid container spacing={8} alignItems="center">
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
            <a download="flutter_builder.exe" target="_blank" href="https://s3.ap-south-1.amazonaws.com/flutterpilot.com/windows_build/flutter_builder.exe">

            <Button
                variant="contained"
                color="#2c44ab"
                style={{
                  backgroundColor: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  width:"100%"
                }}
                className={classes.signUpButton}
                onClick={onWinTap}
                startIcon={appIcon(32,'download-image.png')}
              >
               For Windows
              </Button>
            </a>
  
            
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="#2c44ab"
                style={{
                  backgroundColor: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  width:"100%"
                }}
                className={classes.signUpButton}
                onClick={onTap}
                startIcon={appIcon(24,'browser.png')}
              >
                Online Editor
              </Button>
            </Grid>
            
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductShowcase;
