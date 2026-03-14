import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";

const useStyles = makeStyles((theme) => ({
  newsletterSection: {
    background:
      "radial-gradient(circle at 10% 0%, rgba(37, 99, 235, 0.12) 0%, rgba(15, 23, 42, 0) 42%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
    color: "#0f172a",
    padding: theme.spacing(6, 4),
    textAlign: "center",
    borderRadius: "28px",
    margin: 0,
    border: "1px solid rgba(148, 163, 184, 0.3)",
    boxShadow: "0 18px 46px rgba(15, 23, 42, 0.1)",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4.5, 2),
      borderRadius: "20px",
    },
  },
  newsletterTitle: {
    fontSize: "2.15rem",
    fontWeight: 800,
    marginBottom: theme.spacing(1.1),
    color: "#0f172a",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
    },
  },
  newsletterSubtitle: {
    fontSize: "1rem",
    color: "#475569",
    marginBottom: theme.spacing(2.3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.94rem",
    },
  },
  inputField: {
    width: "100%",
    borderRadius: "14px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "#ffffff",
      "& fieldset": {
        borderColor: "rgba(148, 163, 184, 0.38)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(37, 99, 235, 0.55)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px 14px",
      color: "#0f172a",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(51, 65, 85, 0.72)",
    },
  },
  form: {
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    alignItems: "stretch",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  subscribeBtn: {
    padding: theme.spacing(1.35, 2.35),
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "0.88rem",
    minWidth: "162px",
    background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
    color: "#fff",
    textTransform: "none",
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.3)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 14px 30px rgba(37, 99, 235, 0.34)",
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
          <Typography component="h2" className={classes.newsletterTitle}>
            Join our News Letter
          </Typography>
          <Typography component="p" className={classes.newsletterSubtitle}>
            Get product updates and new feature drops.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} className={classes.form}>
            <TextField
              type="email"
              label="Work email"
              variant="outlined"
              className={classes.inputField}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.subscribeBtn}
              endIcon={<NorthEastRoundedIcon />}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsletterSubscription;
