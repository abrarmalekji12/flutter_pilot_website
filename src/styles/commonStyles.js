import { makeStyles } from "@material-ui/core/styles";
import { activeButtonBoxShadow, activeButtonColor, bodyTextBolderColor, bodyTextColor, bulletPointColor, buttonColor, cardBackgroudColor, codeBackgroundColor, codeTextColor, floatingShapeBackgroundColor, pageBackgroudColor, productShowCaseBackground, productShowCaseBoxShadow, templateTitleColor, textShadowColor, titleColor, titleHoverShadow } from "./colors";


export const commonStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),     // ✅ reduce white gap at top
    marginBottom: theme.spacing(8),
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    padding: 0,
    background: "transparent",      // ✅ no solid white above
   "&:hover": {
      transform: "translateY(-2%) scale(1.01)",
    }
  },
  mainContainer:{
      background:pageBackgroudColor
    },
productShowCaseContainer: {
    position: "relative",
    overflow: "hidden",
    // borderRadius: "24px",
    padding: theme.spacing(2,4,8,4),
    background: productShowCaseBackground,
    boxShadow: "0 20px 80px rgba(0, 0, 0, 0.3)",
    color: theme.palette.common.white,
    // margin: theme.spacing(4, 0),
  },
  
  // Glowing radial background
  bgGlow: {
    content: '""',
    position: "absolute",
    top: "-20%",
    left: "-20%",
    width: "160%",
    height: "160%",
    background: "radial-gradient(circle at center, rgba(91, 134, 229, 0.08) 0%, transparent 70%)",
    animation: "$pulse 8s ease-in-out infinite",
    zIndex: 0,
  },

  
 // Content wrapper
  contentWrapper: {
    // position: "relative",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    zIndex: 2,
    minHeight: "400px", // Ensure enough height for the background image
    // display:"flex",
    // flexDirection:"column",
    // alignItems:"flex-end"
  },
   // Text container
  textContainer: {
    display:"flex",
    position: "relative",
    flexDirection:"column",
    alignItems:"center",
    textAlign: "center",
    margin:"40px 0px",
    maxWidth:"55%",
    fontFamily: "'Inter', sans-serif",/* clean, modern font */
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
  
  // Image as central background

  centerImage:{
    display:"flex",
    justifyContent:"center"
    // [theme.breakpoints.down("sm")]: {
    //     opacity:1
    // },
    // opacity:0.1,
    // maxHeight:"500px"
    //  [theme.breakpoints.down("md")]: {
    //   opacity:0.6
    // }
  }
  ,
  imageBackground: {
    // position: "absolute",
    // right: "0%", // Position slightly to the right
    // top: "35%",
    // transform: "translateY(-50%)",
    width: "80%", // Make image large enough
    height: "50%",
    // maxHeight: "50%",
    zIndex: 1,
    borderRadius: "12px",
    boxShadow: "0 20px 80px rgba(0, 0, 0, 0.3)",
    transition: "all 0.7s ease",
    "&:hover": {
      transform: "translateY(-2%) scale(1.02)",
    },
    // [theme.breakpoints.down("md")]: {
    //   width: "70%",
    //   right: "-5%",
    // },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      width: "90%",
      right: "auto",
      top: "auto",
      transform: "none",
      margin: "0 auto",
      marginBottom: theme.spacing(4),
      "&:hover": {
        transform: "scale(1.02)",
      },
    },
  },
  
  // Image overlay with dots
  imageOverlay: {
    position: "absolute",
    top: "15px",
    left: "15px",
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  dot1: {
    backgroundColor: "#ff5f57",
  },
  dot2: {
    backgroundColor: "#febc2e",
  },
  dot3: {
    backgroundColor: "#28c840",
  },
  
 
  signUpButton: {
    marginRight: theme.spacing(2),
    fontWeight: "bold",
    fontSize: "18px",
    zIndex: 2,
    position: "relative",
  },
  appBar: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)", // ✅ Glassmorphism effect
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    transition: "all 0.3s ease-in-out",
  },
  appBarTitle: {
    background:titleColor,
    flexGrow: 1,
    fontWeight: 800,
    marginLeft: theme.spacing(2),
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px) scale(1.05)",
      textShadow: "0px 4px 12px rgba(74,21,75,0.4)",
    },
  },
  logo: {
    height: "45px",
    objectFit: "contain",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1) rotate(-3deg)",
    },
  },
  appBarButton: {
    marginLeft: theme.spacing(2),
    fontSize: "14px",
    fontWeight: 600,
    color: buttonColor,
    padding: theme.spacing(1.2, 2.2),
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    transition: "all 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    "&.active": {
      background: cardBackgroudColor,
      color: activeButtonColor,
      boxShadow: activeButtonBoxShadow,
    },
    "&:hover": {
      background: cardBackgroudColor,
      color: activeButtonColor,
      transform: "translateY(-2px)",
      boxShadow: activeButtonBoxShadow,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#4A154B",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "rotate(90deg) scale(1.2)",
    },
  },
  // Button container
  buttonsContainer: {
    display: "flex",
    gap: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  
  // Button styles
  button: {
    padding: theme.spacing(1.75, 3),
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "0.95rem",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  windowsBtn: {
    backgroundColor: theme.palette.common.white,
    color: "#2c44ab",
    "&:hover": {
      backgroundColor: "#f2f2f2",
      transform: "translateY(-4px)",
      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.25)",
    },
  },
  glowBtn: {
    background: "linear-gradient(135deg, #5B86E5 0%, #36D1DC 100%)",
    color: theme.palette.common.white,
    "&:hover": {
      background: "linear-gradient(135deg, #4a75d4 0%, #25c0cb 100%)",
      transform: "translateY(-4px)",
      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.25)",
    },
  },
  
  // Icon styles
  icon: {
    marginRight: theme.spacing(1),
  },
  drawer: {
    width: 240,
    background: cardBackgroudColor,
    color: buttonColor,
  },
  drawerList: {
    padding: theme.spacing(2),
    "& .MuiListItem-root": {
      borderRadius: "12px",
      marginBottom: "10px",
      transition: "all 0.3s ease",
     "&.active": {
      background: cardBackgroudColor,
      color: activeButtonColor,
      boxShadow: activeButtonBoxShadow,
    },
    "&:hover": {
      background: cardBackgroudColor,
      color: activeButtonColor,
      transform: "translateY(-2px)",
      boxShadow: activeButtonBoxShadow,
    }
    },
  },
  card: {
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: productShowCaseBoxShadow,
    background: cardBackgroudColor,
    color: "#fff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: productShowCaseBoxShadow,
    },

    // Glowing radial background
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-20%",
      left: "-20%",
      width: "160%",
      height: "160%",
      background:
        "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
      animation: "$pulse 8s ease-in-out infinite",
      zIndex: 0,
    },
  },

//   Floating shapes
  floatingShape: {
    position: "absolute",
    border: "2px solid rgba(91, 134, 229, 0.1)",
    borderRadius: "16px",
    backdropFilter: "blur(4px)",
    background: "rgba(91, 134, 229, 0.03)",
    animation: "$float 10s infinite ease-in-out alternate",
    zIndex: 0,
  },
  shapePhone: {
    width: "80px",
    height: "140px",
    top: "15%",
    left: "5%",
  },
  shapeTablet: {
    width: "140px",
    height: "200px",
    bottom: "10%",
    right: "6%",
    animationDelay: "2s",
  },
  shapeLaptop: {
    width: "200px",
    height: "130px",
    bottom: "5%",
    left: "40%",
    borderRadius: "8px",
    animationDelay: "4s",
  },
  
  // Animations
  "@keyframes float": {
    "0%": { transform: "translateY(0px) rotate(0deg)" },
    "100%": { transform: "translateY(-15px) rotate(3deg)" },
  },
  "@keyframes pulse": {
    "0%": { opacity: 0.4 },
    "50%": { opacity: 0.8 },
    "100%": { opacity: 0.4 },
  },

  featureGifContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    zIndex: 2,
  },
  featureGif: {
    maxWidth: "100%",
    maxHeight: "320px",
    objectFit: "contain",
    borderRadius: "12px",
    transition: "transform 0.4s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  featureDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(5),   // ✅ reduced so title not cut
    margin: 0,
    zIndex: 2,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      padding: theme.spacing(3),
    },
    "& li": {
      listStyleType: "none",
      marginBottom: "1rem",
      fontSize: "1.05rem",
      fontWeight: 500,
      color: bodyTextColor,
      lineHeight: 1.6,
      position: "relative",
      paddingLeft: "1.8rem",
      transition: "all 0.3s ease",
      "&:before": {
        content: '"✔"',
        position: "absolute",
        left: 0,
        top: 0,
        color: bulletPointColor,
        fontSize: "1.2rem",
        fontWeight: "bold",
        transition: "transform 0.3s ease",
      },
      "& strong": {
        color: bodyTextBolderColor,
        fontWeight: 700,
      },
      "& code": {
        background: codeBackgroundColor,
        padding: "2px 6px",
        borderRadius: "6px",
        fontFamily: "monospace",
        fontSize: "0.95rem",
        color: codeTextColor,
      },
      "&:hover": {
        color: bodyTextBolderColor,
        transform: "translateX(4px)",
      },
      "&:hover:before": {
        transform: "scale(1.2) rotate(10deg)",
      },
    },
  },
  code: {
        background: codeBackgroundColor,
        padding: "2px 6px",
        borderRadius: "6px",
        fontFamily: "monospace",
        fontSize: "0.95rem",
        color: codeTextColor,
      },
  title: {
    fontWeight: 800,
    fontSize: "3.2rem",
    lineHeight: 1.1,
    letterSpacing: "-0.5px",
    marginBottom: theme.spacing(2),
    background: "linear-gradient(135deg, #5B86E5 0%, #36D1DC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    position: "relative",
    zIndex: 3,
    textShadow: "0 2px 15px rgba(54, 209, 220, 0.3)",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
    "&:hover": {
       transform: "translateY(-4px) scale(1.05)",
    textShadow: "0 0 10px rgba(54, 209, 220, 0.8), 0 0 30px rgba(91, 134, 229, 0.6)",
    }
  },
  titleHover: {
    transform: "translateY(-4px) scale(1.05)",
    textShadow: "0 0 10px rgba(54, 209, 220, 0.8), 0 0 30px rgba(91, 134, 229, 0.6)",
  },
  
  // Subtitle
  subtitle: {
    fontSize: "1.2rem",
    fontWeight: 400,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 1.8,
    letterSpacing: "0.3px",
    marginBottom: theme.spacing(5),
    position: "relative",
    maxWidth: "90%",
    "&:after": {
      content: '""',
      position: "absolute",
      width: 0,
      height: "2px",
      bottom: "-10px",
      left: 0,
      background: "linear-gradient(90deg, #36D1DC 0%, #5B86E5 100%)",
      transition: "width 0.6s ease",
    },
    "$textContainer:hover &:after": {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      maxWidth:"100%",
      // margin: "0 auto",
      marginBottom: theme.spacing(5),
      "&:after": {
        // left: "100%",
        // transform: "translateX(-50%)",
      },
      "$textContainer:hover &:after": {
      width: "100%",
    }
    },
  },
  hideOnSmall: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }
}));

export const templateCardStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    // transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    // background: "linear-gradient(135deg, #2A2D55 0%, #1B1F3A 100%)",
    background: "linear-gradient(135deg, rgba(36, 59, 85, 0.9) 0%, rgba(20, 30, 48, 0.9) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.05)",
    color: "#fff",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0 12px 40px rgba(0, 198, 255, 0.2)"
    }
    // "&:hover": {
    //   transform: "translateY(-10px)",
    //   boxShadow: "0px 15px 40px rgba(0,0,0,0.4)",
    // },
  },
  mediaContainer:{
    display:"flex",
    flexDirection:"row",
    marginBottom:"12px",
    overflowY:"scroll",
  },
  media: {
    height: 280,
    width:160,
    padding:10,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
     height: 150,
     width:100,
    }
  },
  content: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    padding: theme.spacing(3),

  },
  title: {
    fontWeight: 700,
    fontSize: "1.3rem",
    background: templateTitleColor,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: theme.spacing(1.5),
  },
  description: {
    fontSize: "0.95rem",
    opacity: 0.9,
    marginBottom: theme.spacing(2),
  },
  button: {
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "8px 16px",
    "&:hover": {
      background: "linear-gradient(90deg, #764ba2 0%, #667eea 100%)",
    },
  },
}));

export const contactUsStyles = makeStyles((theme)=>({
      contentWrapper: {
    // position: "relative",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    zIndex: 2,
    // minHeight: "400px", // Ensure enough height for the background image
  },
   // Text container
  textContainer: {
    display:"flex",
    position: "relative",
    flexDirection:"column",
    alignItems:"center",
    textAlign: "center",
    margin:"10px 0px",
    // maxWidth:"55%",
    fontFamily: "'Inter', sans-serif",/* clean, modern font */
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      textAlign: "center",
    },
  },
  
  }));