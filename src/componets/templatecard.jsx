import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { templateCardStyles } from "../styles/commonStyles";
import TemplateCardStack from "./TemplateCardStack";

export default function TemplateCard({ name, description, imageURLs, templateId }) {
  const templateClasses = templateCardStyles();
  const summary =
    typeof description === "string" && description.trim().length > 0
      ? description.trim()
      : "Ready-to-use template designed for rapid customization in FlutterPilot.";

  const handleTemplate = () => {
    window.open(`https://studio.flutterpilot.com/template/${templateId}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className={templateClasses.root}>
      <CardContent className={templateClasses.content}>
        <Typography className={templateClasses.title}>{name}</Typography>
        <TemplateCardStack imageUrls={imageURLs} />
        <Typography className={templateClasses.description}>{summary}</Typography>
        <Button
          className={templateClasses.ctaButton}
          onClick={handleTemplate}
          endIcon={<ArrowForwardRoundedIcon />}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
