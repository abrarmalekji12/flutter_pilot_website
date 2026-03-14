import React from "react";
import { Skeleton, Box } from "@mui/material";

const TemplateCardSkeleton = () => {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        background: "#fff",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "18px", // match theme.spacing(2.2) roughly
        height: "100%",
        width: "100%", // ensure it fills the grid
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <Skeleton variant="text" width="55%" height={26} sx={{ borderRadius: "8px" }} />

      {/* Image stack placeholder */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={260}
        sx={{ borderRadius: "12px" }}
      />

      {/* Description lines */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Skeleton variant="text" width="100%" height={16} sx={{ borderRadius: "6px" }} />
        <Skeleton variant="text" width="85%" height={16} sx={{ borderRadius: "6px" }} />
        <Skeleton variant="text" width="70%" height={16} sx={{ borderRadius: "6px" }} />
      </Box>

      {/* Button */}
      <Skeleton variant="rectangular" width={140} height={38} sx={{ borderRadius: "999px", mt: "auto" }} />
    </Box>
  );
};

export default TemplateCardSkeleton;