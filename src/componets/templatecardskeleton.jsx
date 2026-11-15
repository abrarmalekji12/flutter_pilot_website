import { Skeleton, Box } from "@mui/material";

const TemplateCardSkeleton = () => (
  <Box
    sx={{
      borderRadius: "16px",
      background: "#fff",
      border: "1px solid rgba(148, 163, 184, 0.35)",
      overflow: "hidden",
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: { xs: "16 / 11", md: "2 / 1" }, height: "auto" }} />
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: "14px 16px" }}>
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="45%" height={24} />
        <Skeleton variant="text" width="85%" height={18} />
      </Box>
      <Skeleton variant="rounded" width={38} height={38} />
    </Box>
  </Box>
);

export default TemplateCardSkeleton;
