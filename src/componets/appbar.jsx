import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import { cardBackgroudColor, pageBackgroudColor } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import { label } from "framer-motion/client";

// const useStyles = makeStyles((theme) => ({

//   mainContainer:{
//     background:pageBackgroudColor
//   },
//   appBar: {
//     background: "rgba(255, 255, 255, 0.7)",
//     backdropFilter: "blur(12px)", // ✅ Glassmorphism effect
//     boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//     borderBottom: "1px solid rgba(255,255,255,0.3)",
//     transition: "all 0.3s ease-in-out",
//   },
//   appBartitle: {
//     flexGrow: 1,
//     fontWeight: 800,
//     marginLeft: theme.spacing(2),
//     background: pageBackgroudColor,
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     letterSpacing: "-0.5px",
//     cursor: "pointer",
//     transition: "transform 0.3s ease",
//     "&:hover": {
//       transform: "translateY(-2px) scale(1.05)",
//       textShadow: "0px 4px 12px rgba(74,21,75,0.4)",
//     },
//   },
//   logo: {
//     height: "45px",
//     objectFit: "contain",
//     cursor: "pointer",
//     transition: "transform 0.3s ease",
//     "&:hover": {
//       transform: "scale(1.1) rotate(-3deg)",
//     },
//   },
//   button: {
//     marginLeft: theme.spacing(2),
//     fontSize: "14px",
//     fontWeight: 600,
//     color: "#243064",
//     padding: theme.spacing(1.2, 2.2),
//     borderRadius: "12px",
//     position: "relative",
//     overflow: "hidden",
//     zIndex: 1,
//     transition: "all 0.3s ease",
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//     "&.active": {
//       background: cardBackgroudColor,
//       color: "white",
//       boxShadow: "0 4px 15px rgba(74,21,75,0.4)",
//     },
//     "&:hover": {
//       background: cardBackgroudColor,
//       color: "white",
//       transform: "translateY(-2px)",
//       boxShadow: "0 6px 18px rgba(74,21,75,0.3)",
//     },
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     color: "#4A154B",
//     [theme.breakpoints.up("md")]: {
//       display: "none",
//     },
//     transition: "transform 0.3s ease",
//     "&:hover": {
//       transform: "rotate(90deg) scale(1.2)",
//     },
//   },
//   drawer: {
//     width: 240,
//     background: cardBackgroudColor,
//     color: "white",
//   },
//   drawerList: {
//     padding: theme.spacing(2),
//     "& .MuiListItem-root": {
//       borderRadius: "12px",
//       marginBottom: "10px",
//       transition: "all 0.3s ease",
//       "&:hover": {
//         background: "rgba(255,255,255,0.1)",
//         transform: "translateX(4px)",
//       },
//       "&.active": {
//         background: "linear-gradient(90deg, #4A154B, #1B486D)",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//       },
//     },
//   },
// }));

function CustomAppBar({ children, type }) {
  const classes = commonStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: "Home", action: () => navigate("/"), type: "home" },
    {label: "Template", action: ()=> navigate("/template"), type:"template"},
    { label: "Blogs", action: () => window.open("https://flutterpilot.medium.com"), type: "blogs" },
    { label: "Privacy Policy", action: () => navigate("/privacyPolicy"), type: "privacyPolicy" },
    { label: "Contact Us", action: () => navigate("/contactUs"), type: "contactUs" },
    { label: "About Us", action: () => navigate("/aboutUs"), type: "aboutUs" },
  ];

  return (
    <div className={classes.mainContainer}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <img
            src="flutter_pilot_logo.png"
            className={classes.logo}
            alt="FlutterPilot"
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            className={classes.appBarTitle}
            onClick={() => navigate("/")}
          >
            FlutterPilot
          </Typography>
          <div>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                className={`${classes.appBarButton} ${type === item.type ? "active" : ""}`}
                onClick={item.action}
              >
                {item.label}
              </Button>
            ))}
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        classes={{ paper: classes.drawer }}
      >
        <div onClick={handleDrawerToggle}>
          <List className={classes.drawerList}>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={item.action}
                className={type === item.type ? "active" : ""}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      {children}
    </div>
  );
}

export default CustomAppBar;