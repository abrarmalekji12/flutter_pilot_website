import React, { useEffect, useRef } from "react";

// Soft, theme-aligned dot colors
const COLORS = [
  "#7c8cf8", "#a78bfa", "#818cf8", "#60a5fa",
  "#38bdf8", "#34d399", "#4ade80", "#facc15",
  "#fb923c", "#f472b6", "#e879f9", "#c084fc",
];

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const COLS = isMobile ? 5 : 9;    // significantly lower for mobile
const ROWS = isMobile ? 4 : 6;    // lower density
const JITTER = 0.38; 

const SPEED_MAX = isMobile ? 0.35 : 0.55; // slower on mobile to feel smoother
const HOVER_RADIUS = isMobile ? 0 : 120;   // disable hover influence on mobile (touch vs mouse)
const CONNECTION_DISTANCE = isMobile ? 120 : 180;
const DRAW_CONNECTIONS = !isMobile; // Completely disable O(N^2) loop on mobile CPU

const BackgroundNetAnimation = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const pointsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // ── Logical size (CSS px) of the canvas ───────────────────────────────
    let logW = 0;
    let logH = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      logW = window.innerWidth;
      logH = window.innerHeight;
      canvas.width = logW * dpr;
      canvas.height = logH * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${logW}px`;
      canvas.style.height = `${logH}px`;
      initPoints();
    };

    // ── Jittered-grid point placement ─────────────────────────────────────
    const initPoints = () => {
      const points = [];
      const cellW = logW / COLS;
      const cellH = logH / ROWS;
      let colorIdx = 0;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          // Cell centre
          const cx = cellW * (col + 0.5);
          const cy = cellH * (row + 0.5);

          // Add jitter so it looks natural, not grid-like
          const jx = (Math.random() - 0.5) * cellW * JITTER;
          const jy = (Math.random() - 0.5) * cellH * JITTER;

          const angle = Math.random() * Math.PI * 2;
          const speed = (Math.random() * 0.5 + 0.1) * SPEED_MAX;

          points.push({
            x: cx + jx,
            y: cy + jy,
            ox: cx + jx,   // "home" position (used for soft bounds)
            oy: cy + jy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: COLORS[colorIdx % COLORS.length],
          });
          colorIdx++;
        }
      }

      // Add a few random extra dots to fill corners / gaps
      const extras = Math.floor(COLS * ROWS * 0.15);
      for (let i = 0; i < extras; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.5 + 0.1) * SPEED_MAX;
        const x = Math.random() * logW;
        const y = Math.random() * logH;
        points.push({
          x, y, ox: x, oy: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[colorIdx % COLORS.length],
        });
        colorIdx++;
      }

      pointsRef.current = points;
    };

    // ── Main draw loop ────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, logW, logH);

      const points = pointsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions
      for (const p of points) {
        // Tiny random walk (organic feel)
        if (Math.random() < 0.015) {
          p.vx += (Math.random() - 0.5) * 0.15;
          p.vy += (Math.random() - 0.5) * 0.15;
          const spd = Math.hypot(p.vx, p.vy);
          if (spd > SPEED_MAX) {
            p.vx = (p.vx / spd) * SPEED_MAX;
            p.vy = (p.vy / spd) * SPEED_MAX;
          }
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Soft elastic wall — pull back gently instead of hard bounce
        const margin = 30;
        if (p.x < margin)        p.vx += 0.05;
        if (p.x > logW - margin) p.vx -= 0.05;
        if (p.y < margin)        p.vy += 0.05;
        if (p.y > logH - margin) p.vy -= 0.05;

        // Hard clamp so points never truly escape
        p.x = Math.max(0, Math.min(logW, p.x));
        p.y = Math.max(0, Math.min(logH, p.y));
      }

      // ── Draw connections ──────────────────────────────────────────────
      if (DRAW_CONNECTIONS) {
        const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
        ctx.lineWidth = 0.7;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dSq = dx * dx + dy * dy;
            if (dSq < connDistSq) {
              const alpha = (1 - Math.sqrt(dSq) / CONNECTION_DISTANCE) * 0.18;
              ctx.strokeStyle = `rgba(148, 163, 235, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw dots ────────────────────────────────────────────────────
      for (const p of points) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distToMouse = Math.hypot(dx, dy);
        const hovered = distToMouse < HOVER_RADIUS;
        const proximity = hovered
          ? 1 - distToMouse / HOVER_RADIUS
          : 0;

        const r = 3 + proximity * 3.5;
        const alpha = 0.6 + proximity * 0.35;
        const glow = 8 + proximity * 18;

        ctx.save();
        ctx.globalAlpha = alpha;
        if (!isMobile) {
          ctx.shadowBlur = glow;
          ctx.shadowColor = p.color;
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // ── Event listeners ───────────────────────────────────────────────────
    window.addEventListener("resize", resize);
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
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
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    />
  );
};

export default BackgroundNetAnimation;
