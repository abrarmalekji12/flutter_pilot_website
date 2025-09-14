import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, makeStyles, Box } from "@material-ui/core";
import { commonStyles, templateCardStyles } from "../styles/commonStyles";
import { productShowCaseBoxShadow, templateTitleColor } from "../styles/colors";
import { Stack } from "@mui/material";
import TemplateCardStack from "./TemplateCardStack";



export default function TemplateCard(props) {

  console.log("props==>",props)
    const classes = commonStyles();
    const templateClasses = templateCardStyles();
    const title = props.name;
    const description =props.description;
    const device = props.device;
    const imageUrls = props.imageURLs;
    const templateId = props.templateId;

    const handleTemplate = ()=>{
      window.open(`https://flutterpilot.web.app/template/${templateId}`);
    }

    try{
      return (
    <Card className={templateClasses.root}>
      
      {/* <CardMedia className={classes.media} image={image} title={title} /> */}
      <CardContent className={templateClasses.content}>
        <Typography className={templateClasses.title}>{title}</Typography>
        {/* <Typography className={templateClasses.description}>{description}</Typography> */}
         {/* <Box style={{ position: "relative", height: 200,height:"430px",width:"80%",overflowX:"scroll"}}>
         {[...imageUrls].reverse().map((img, i) => (
           <Box
          component="img"
          src={img}
          alt="stack"
           style={{
            display:"flex",
            flexDirection:"row",
            borderRadius: 2,
            position: "absolute",
            // top: "50%",
            left: (i* 500)/imageUrls.length,
            // transform: "translate(-70%, -50%)", // shift left
            boxShadow: 3,
            zIndex: 2,
            // boxShadow: "0px 4px 15px rgba(XX, YY, ZZ, 0.15)"
           boxShadow:"0px 4px 15px rgba(3, 13, 14, 0.82)"
          }}
        />
          ))}
      </Box> */}
 {/* <Box
  style={{
    position: "relative",
    height: "430px",
    width: "100%",
    display: "flex",
    justifyContent: "center", // centers the whole stack
    alignItems: "center",
    marginBottom:"13px",
    overflowX:"scroll"
  }}
>
  <Box
    style={{
      position: "relative",
      width: `${200 + (imageUrls.length - 1) * 90}px`, // total width = imageWidth + overlap*(n-1)
      height: "430px",
    }}
  >
    {imageUrls.map((img, i) => (
      <Box
        key={i}
        component="img"
        src={img}
        alt="stack"
        style={{
          position: "absolute",
          top: "50%",
          right: `${i * 90}px`, // shift each image to the right
          transform: "translateY(-50%)", // vertical centering
          borderRadius: 8,
          width: "200px",
          objectFit:"contain",
          height: "100%",
          boxShadow: "0px 4px 15px rgba(3, 13, 14, 0.82)",
          zIndex: imageUrls.length - i,
        }}
      />
    ))}
  </Box>
</Box> */}
            <TemplateCardStack
              imageUrls={imageUrls}
            />

        <Button className={classes.glowBtn} onClick={handleTemplate}>
          View Template
        </Button>
      </CardContent>
    </Card>
  );
    }catch(e){
      console.log("e==>",e)
    }
  
}
