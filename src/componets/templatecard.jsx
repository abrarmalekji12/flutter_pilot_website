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

  return (
    <Card className={templateClasses.root}>
      <CardContent className={templateClasses.content}>
        <Typography component="h3" className={templateClasses.title}>{name}</Typography>
        <TemplateCardStack imageUrls={imageURLs} />
        <Typography className={templateClasses.description}>{summary}</Typography>
        <Button
          component="a"
          href={`https://studio.flutterpilot.com/template/${encodeURIComponent(templateId)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get started with the ${name} template`}
          className={templateClasses.ctaButton}
          endIcon={<ArrowForwardRoundedIcon />}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
