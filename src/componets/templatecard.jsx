import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, makeStyles } from "@material-ui/core";
import { commonStyles, templateCardStyles } from "../styles/commonStyles";
import { templateTitleColor } from "../styles/colors";



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
        <div className={templateClasses.mediaContainer}>
        {
        imageUrls.map((v)=><CardMedia className={templateClasses.media} component="img" src={v} height="140" title={"demo"} />)
      }
      </div>
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
