import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  newsletterSection: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  newsletterTitle: {
    marginBottom: theme.spacing(2),
  },
  inputField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const NewsletterSubscription = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here
  };

  return (<div></div>);
  return (
    <div className={classes.newsletterSection}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <h2 className={classes.newsletterTitle}>
            Subscribe to Our Newsletter
          </h2>
          <form onSubmit={handleSubmit}>
            <TextField
              type="email"
              label="Enter your email"
              variant="outlined"
              className={classes.inputField}
              // Add necessary props and state handling for the input field
            />
            <Button type="submit" variant="contained" color="primary">
              Subscribe
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsletterSubscription;
