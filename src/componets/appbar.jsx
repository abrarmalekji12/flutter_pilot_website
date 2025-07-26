import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles((theme) => ({
  root:{

  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    color: "#243064",
    marginLeft: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "white",
    boxShadow: "none",
  },
  button: {
    marginLeft: theme.spacing(2),
    fontSize: '14px', 
    color: "#243064",
    fontWeight: '600',
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    transition: "transform 0.2s", // Add a transition effect to the transform property
    "&.active":{
      backgroundColor: "#243064",
      color:"white"
    },
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "#243064",
    color:'white',},
  },
  drawer: {
    width: 240,
  },
  logo: {
    height: "45px",
    objectFit: "contain",
  },
  menuButton: {
    marginRight: theme.spacing(2),

    color: "#4A154B",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function CustomAppBar(props) {

  const {children,type} =props
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const onBlogsTap = ()=>{
    window.open('https://flutterpilot.medium.com');
  }

  const onPrivacyPolicytap = ()=>{
   navigate("/privacyPolicy");
  }
  const onContactUstap=()=>{
   navigate("/contactUs");
  }
  const onHomeTap=()=>{
    navigate("/");
  }
  const onAboutUstap=()=>{
    navigate("/aboutUs");

  }

  return (
    <React.Fragment>
      {console.log("type==>",type)}
    <AppBar position="sticky" color="primary" className={classes.appBar}>
      <Toolbar>
        <img src="flutter_pilot_logo.png" className={classes.logo} />
        <Typography variant="h5" className={classes.title}>
          FlutterPilot
        </Typography>
        <div>
          <Button color="inherit" className={`${classes.button} ${type=="home"?"active":""}` } onClick={onHomeTap}>
            Home
          </Button>
          
          {/* <Button color="inherit" className={classes.button}>
            Templates
          </Button> */}
          <Button color="inherit" className={`${classes.button} ${type=="blogs"?"active":""}`}  onClick={onBlogsTap}>
            Blogs
          </Button>
             <Button color="inherit" className={`${classes.button} ${type=="privacyPolicy"?"active":""}`}  onClick={onPrivacyPolicytap}>
            Privacy Policy
          </Button>
          <Button color="inherit" className={`${classes.button} ${type=="contactUs"?"active":""}`} onClick={onContactUstap}>
            Contact Us
          </Button>
          <Button color="inherit" className={`${classes.button} ${type=="aboutUs"?"active":""}`} onClick={onAboutUstap}>
            About Us
          </Button>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            className={classes.drawer}
          >
            <div onClick={handleDrawerToggle}>
              <List>
                <ListItem button>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={onBlogsTap}>
                  <ListItemText primary="Blogs" />
                </ListItem>
                {/* <ListItem button>
                  <ListItemText primary="Product" />
                </ListItem> */}
              </List>
            </div>
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
    {children}
    </React.Fragment>
  );
}

export default CustomAppBar;
