import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import CustomAppBar from "../../componets/appbar";
import { commonStyles } from "../../styles/commonStyles";

export default function NotFound() {
  const classes = commonStyles();

  return (
    <CustomAppBar>
      <main className={classes.responsiveContainer} style={{ textAlign: "center", paddingBlock: "clamp(72px, 12vw, 150px)" }}>
        <p style={{ color: "#2563eb", fontWeight: 800, marginBottom: 8 }}>404</p>
        <h1 style={{ color: "#0f172a", fontSize: "clamp(2rem, 5vw, 3.5rem)", margin: "0 0 16px" }}>
          Page not found
        </h1>
        <p style={{ color: "#475569", fontSize: "1.08rem", margin: "0 auto 28px", maxWidth: 560 }}>
          The page may have moved, or the address may be incorrect.
        </p>
        <Button component={Link} to="/" variant="contained" sx={{ textTransform: "none", borderRadius: 3, px: 3, py: 1.2 }}>
          Return to FlutterPilot
        </Button>
      </main>
    </CustomAppBar>
  );
}
