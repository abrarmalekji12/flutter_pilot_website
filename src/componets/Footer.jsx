import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
  Instagram,
  WhatsApp,
} from "@mui/icons-material";
import { makeStyles } from '@mui/styles';
import { productShowCaseBackground } from "../styles/colors";
import { commonStyles } from "../styles/commonStyles";
import { useNavigate } from "react-router-dom";

const footerStyles = makeStyles((theme)=>({
  container:{
    minHeight: "250px",
    height: "auto",
    background: productShowCaseBackground,
    color: "#ccc",
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    }
  },
  gridContainer:{
    justifyContent:"center"
  },
  gridTypography:{
    mb: 2, color: "#fff", fontWeight: "bold" 
  },
  privacyPolicyTypography:{
    color: "#999"
  },
  divider:{
    my: 3, borderColor: "rgba(255,255,255,0.2)"
  },
  logo:{
     height: "30px",
    objectFit: "contain",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1) rotate(-3deg)",
    },
    marginRight:"10px"
  },
  appBarTitle:{
    color:"#ccc"
  },
  titleContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"13px"
  }
}))

const Footer = () => {

  const navigate = useNavigate();
  const footerClasses = footerStyles();
  const commonClasses = commonStyles();

  return (
    <Box
      component="footer"
      className={`${footerClasses.container}`}
    >
      {/* Top Section */}
      <div className={footerClasses.titleContainer}>
         <img
            src="flutterpilot_logo.png"
            className={footerClasses.logo}
            alt="FlutterPilot"
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            className={`${footerClasses.appBarTitle}`}
            onClick={() => navigate("/")}
          >
            FlutterPilot
          </Typography>
      </div>
      <Grid container spacing={4} className={footerClasses.gridContainer}>
        {/* Column 1 */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            className={footerClasses.gridTypography}
            variant="h6"
          >
            Community
          </Typography>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Tutorials
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Documentation
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Forum
          </Link>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="h6"
            className={footerClasses.gridTypography}
          >
            Services
          </Typography>
          {/* <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Hosting
          </Link> */}
          <Link href="#/template" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Templates
          </Link>
          <Link href="#/contactUs" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Support
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Upgrade
          </Link>
          <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Education
          </Link>
        </Grid>

        {/* Column 3 */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="h6"
            className={footerClasses.gridTypography}
          >
            About Us
          </Typography>
          <Link href="#/aboutUs" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Company
          </Link>
          <Link href="#/contactUs" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Contact
          </Link>
          {/* <Link href="#" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Jobs
          </Link> */}
          <Link underline="none" color="inherit" display="block" sx={{ mb: 1 }} onClick={()=>{window.open("https://flutterpilot.medium.com")}}>
            Blog
          </Link>
           <Link href="#/privacyPolicy" underline="none" color="inherit" display="block" sx={{ mb: 1 }}>
            Privacy Policy
          </Link>
        </Grid>

        {/* Column 4 - Description */}
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            FlutterPilot is the ultimate AI low-code platform for Flutter developers. 
            Generate full projects from prompts, import Figma designs, and build high-performance apps with zero boilerplate.
          </Typography>

          {/* Social Icons */}
          <Box>
            <IconButton color="inherit" size="large" href="#">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" size="large" href="#">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" size="large" href="#">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" size="large" href="#">
              <GitHub />
            </IconButton>
            <IconButton color="inherit" size="large" href="#">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" size="large" href="#">
              <WhatsApp />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider className={footerClasses.divider}/>

      {/* Bottom Bar */}
      <Box textAlign="center">
        <Typography variant="body2" className={footerClasses.privacyPolicyTypography}>
          © {new Date().getFullYear()} FlutterPilot. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;