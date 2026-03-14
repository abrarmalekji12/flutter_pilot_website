import { useTheme, useMediaQuery, Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

export default function TemplateCardStack({ imageUrls }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
  const baseImageWidth = isSmall ? 100 : 125;
  const baseOverlap = isSmall ? 40 : 48;

  // Fixed uniform height across all templates
  const stackHeight = isSmall ? 230 : 300;

  const { imageWidth, overlap, gap, totalWidth, isSpreadMode } = useMemo(() => {
    const imageCount = safeImageUrls.length;
    if (imageCount === 0) {
      return { imageWidth: baseImageWidth, overlap: baseOverlap, gap: 0, totalWidth: 0, isSpreadMode: false };
    }

    if (isSmall || containerWidth === 0) {
      const availableWidth = containerWidth > 0 ? containerWidth - 20 : 300;
      const imageCount = safeImageUrls.length;
      
      // If we have many images, reduce overlap to fit most or all of them
      // Minimum overlap to keep things readable
      const minOverlap = 24; 
      let dynamicOverlap = baseOverlap;
      
      if (imageCount > 1) {
        const requiredOverlap = (availableWidth - baseImageWidth) / (imageCount - 1);
        dynamicOverlap = Math.max(minOverlap, Math.min(baseOverlap, requiredOverlap));
      }

      return {
        imageWidth: baseImageWidth,
        overlap: Math.round(dynamicOverlap),
        gap: 0,
        totalWidth: baseImageWidth + (imageCount - 1) * dynamicOverlap,
        isSpreadMode: false,
      };
    }

    const availableWidth = Math.max(containerWidth - 24, baseImageWidth);
    const spacingCount = imageCount - 1;
    const minOverlap = 4;
    const maxOverlap = baseOverlap;
    const minImageWidth = 54;

    if (imageCount <= 3) {
      const maxGap = 42;
      const minGap = 16;
      const computedGap = spacingCount > 0 ? (availableWidth - imageCount * baseImageWidth) / spacingCount : 0;
      const dynamicGap = spacingCount > 0 ? Math.max(minGap, Math.min(maxGap, computedGap)) : 0;
      const spreadTotalWidth = imageCount * baseImageWidth + spacingCount * dynamicGap;

      return {
        imageWidth: baseImageWidth,
        overlap: 0,
        gap: Math.round(dynamicGap),
        totalWidth: Math.round(spreadTotalWidth),
        isSpreadMode: true,
      };
    }

    if (spacingCount <= 0) {
      return { imageWidth: baseImageWidth, overlap: 0, gap: 0, totalWidth: baseImageWidth, isSpreadMode: false };
    }

    const maxImageWidthForMinOverlap = availableWidth - spacingCount * minOverlap;
    const dynamicImageWidth = Math.max(minImageWidth, Math.min(baseImageWidth, maxImageWidthForMinOverlap));
    const dynamicOverlap = Math.max(minOverlap, Math.min(maxOverlap, (availableWidth - dynamicImageWidth) / spacingCount));
    const computedTotalWidth = dynamicImageWidth + spacingCount * dynamicOverlap;

    return {
      imageWidth: Math.round(dynamicImageWidth),
      overlap: Math.round(dynamicOverlap),
      gap: 0,
      totalWidth: Math.round(computedTotalWidth),
      isSpreadMode: false,
    };
  }, [baseImageWidth, baseOverlap, containerWidth, isSmall, safeImageUrls.length]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const updateWidth = () => {
      if (scrollRef.current) setContainerWidth(scrollRef.current.clientWidth);
    };

    updateWidth();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateWidth);
      observer.observe(scrollRef.current);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (scrollRef.current && isSmall) scrollRef.current.scrollLeft = 0;
  }, [isSmall, safeImageUrls.length]);

  return (
    <Box
      ref={scrollRef}
      style={{
        position: "relative",
        height: `${stackHeight}px`,
        width: "100%",
        display: "flex",
        justifyContent: isSpreadMode ? "center" : "flex-start",
        alignItems: "flex-start", // align stack to top
        overflowX: isSpreadMode ? "hidden" : "auto",
        overflowY: "hidden",
        borderRadius: 14,
        background: "rgba(241, 245, 249, 0.6)",
        padding: isSmall ? "10px 8px" : "16px 12px",
        marginBottom: 0, // removed to let parent gap handle spacing
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Chrome/Safari
        transition: "height 0.3s ease",
      }}
    >
      <Box
        style={{
          position: "relative",
          width: `${totalWidth}px`,
          height: "100%",
          flexShrink: 0,
        }}
      >
        {safeImageUrls.map((img, i) => (
          <Box
            key={i}
            style={{
              position: "absolute",
              top: 0, // align to top
              left: isSpreadMode ? `${i * (imageWidth + gap)}px` : `${i * overlap}px`,
              borderRadius: "8px",
              width: `${imageWidth}px`,
              height: "94%", 
              border: "1px solid rgba(15, 23, 42, 0.06)",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.07), 0 6px 18px rgba(15, 23, 42, 0.09)",
              overflow: "hidden",
              zIndex: i + 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease",
            }}
          >
            <Box
              component="img"
              src={img}
              alt="screen"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center", // align image content top center
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

