import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  newsletterSection: {
    background: "linear-gradient(135deg, #1a1f36 0%, #121528 100%)",
    color: "#fff",
    padding: theme.spacing(8, 4),
    textAlign: "center",
    borderRadius: "24px",
    margin: theme.spacing(4, 0),
    boxShadow: "0 20px 80px rgba(0, 0, 0, 0.3)",
    position: "relative",
    overflow: "hidden"
  },
  newsletterTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: theme.spacing(2),
    background: "linear-gradient(135deg, #5B86E5 0%, #36D1DC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  newsletterSubtitle: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.7)",
    marginBottom: theme.spacing(4),
  },
  inputField: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.2)",
        borderRadius: "12px",
      },
      "&:hover fieldset": {
        borderColor: "#36D1DC",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5B86E5",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.5)",
    },
  },
  subscribeBtn: {
    padding: theme.spacing(1.5, 4),
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "1rem",
    background: "linear-gradient(135deg, #5B86E5 0%, #36D1DC 100%)",
    color: "#fff",
    textTransform: "none",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.3)",
    },
  }
}));

const NewsletterSubscription = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
  };

  return (
    <div className={classes.newsletterSection}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <h2 className={classes.newsletterTitle}>
            Join the Future of App Development
          </h2>
          <p className={classes.newsletterSubtitle}>
            Get the latest updates on AI features, new templates, and pro-tips for building Flutter apps faster.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <TextField
              type="email"
              label="Enter your email"
              variant="outlined"
              className={classes.inputField}
            />
            <Button type="submit" variant="contained" className={classes.subscribeBtn}>
              STAY UPDATED
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsletterSubscription;
