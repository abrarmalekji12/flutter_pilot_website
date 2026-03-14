import React, { useEffect, useRef } from "react";

const COLORS = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
  "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
  "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800",
  "#ff5722", "#795548", "#607d8b"
];

const POINTS_COUNT = 65;
const CONNECTION_DISTANCE = 160;
const HOVER_DISTANCE_SQ = 1200;

const BackgroundNetAnimation = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const pointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initPoints();
    };

    const initPoints = () => {
      const width = canvas.width;
      const height = canvas.height;
      const points = [];
      for (let i = 0; i < POINTS_COUNT; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          color: COLORS[i % COLORS.length]
        });
      }
      pointsRef.current = points;
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const points = pointsRef.current;

      // Update positions
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (Math.random() < 0.02) {
          p.vx += (Math.random() - 0.5) * 0.2;
          p.vy += (Math.random() - 0.5) * 0.2;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0.8) {
            p.vx = (p.vx / speed) * 0.8;
            p.vy = (p.vy / speed) * 0.8;
          }
        }
      }

      // Draw Connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - (dist / CONNECTION_DISTANCE)) * 0.2;
            ctx.strokeStyle = `rgba(208, 213, 239, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Points
      for (const p of points) {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distSq = dx * dx + dy * dy;
        const isHovered = distSq < HOVER_DISTANCE_SQ;

        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovered ? 5.5 : 3.5, 0, Math.PI * 2);
        
        ctx.save();
        ctx.globalAlpha = isHovered ? 0.95 : 0.75;
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = isHovered ? 12 : 20;
        ctx.shadowColor = p.color;
        
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Force transparency for background to show through
    document.body.style.backgroundColor = "transparent";
    document.documentElement.style.backgroundColor = "transparent";

    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
      }}
    />
  );
};

export default BackgroundNetAnimation;
