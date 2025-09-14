import { useTheme, useMediaQuery, Box } from "@material-ui/core";
import { useEffect, useRef } from "react";

export default function TemplateCardStack({ imageUrls }) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const scrollRef = useRef(null);
  const imageWidth = 180;
  const overlap = 90;
  const totalWidth = imageWidth + (imageUrls.length - 1) * overlap;

   useEffect(() => {
    if (scrollRef.current) {
      // move scroll to right-most side
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [isSmall]);

  return (
    <Box
    ref={scrollRef}
      style={{
        position: "relative",
        height: "400px",
        width: "100%",
        display: "flex",
        justifyContent: isSmall ? "flex-start" : "center", // center on desktop, left on mobile
        alignItems: "center",
        overflowX: isSmall ? "auto" : "hidden", // scroll on mobile
        marginBottom:"13px",
      }}
    >
      <Box
        style={{
          position: "relative",
          width: isSmall ? `${totalWidth}px` : `${totalWidth}px`,
          height: "100%",
          flexShrink: 0, // prevent shrinking when scrollable
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
              right: `${i * overlap}px`,
              transform: "translateY(-50%)",
              borderRadius: 8,
              width: `${imageWidth}px`,
            //   objectFit:"contain",
              height: "100%",
             boxShadow:"0px 4px 15px rgba(3, 13, 14, 0.82)",
              zIndex: imageUrls.length - i,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}