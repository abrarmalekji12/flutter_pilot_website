import React from "react";
import { Card, CardContent, Box, Skeleton } from "@mui/material";
import { templateCardStyles } from "../styles/commonStyles";

const TemplateCardSkeleton = () => {
    const templateClasses = templateCardStyles();
  return (
    <Card
        className={templateClasses.root}
      sx={{
        // width:"50%",
        // width: 300,
        // borderRadius: "16px",
        // background: "linear-gradient(135deg, #1b1f3a 0%, #2a2d55 100%)",
        // color: "#fff",
        // boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}
    >
      <CardContent className={templateClasses.content}>
        {/* Title */}
        <Skeleton
          variant="text"
          width="70%"
          height={30}
          sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }}
        />

        {/* Image placeholder */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Skeleton
            variant="rectangular"
            width={220}
            height={140}
            sx={{ borderRadius: "12px", bgcolor: "rgba(255,255,255,0.15)" }}
          />
        </Box>

        {/* Button */}
        <Skeleton
          variant="rectangular"
          width={140}
          height={40}
          sx={{
            mx: "auto",
            borderRadius: "8px",
            bgcolor: "rgba(255,255,255,0.25)",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TemplateCardSkeleton;