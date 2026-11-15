import { useEffect, useRef, useState } from "react";

// Port of the Studio's TemplatePresentationView: a gradient backdrop with the
// template's screens in device frames, arranged by a curated preset.

const BACKDROPS = {
  aurora: ["#6366F1", "#A855F7", "#EC4899"],
  ocean: ["#0EA5E9", "#2563EB", "#1E3A8A"],
  sunset: ["#F97316", "#F43F5E", "#9333EA"],
  forest: ["#10B981", "#059669", "#064E3B"],
  graphite: ["#334155", "#1E293B", "#0F172A"],
  paper: ["#F8FAFC", "#E2E8F0", "#CBD5E1"],
};

const isWide = (shot) => shot.aspect > 1.05;

// Frame size for a screenshot, keeping its aspect ratio within maxW x maxH.
function fit(shot, maxW, maxH) {
  const aspect = isWide(shot) ? shot.aspect / 1.06 : shot.aspect;
  let width = maxW;
  let height = width / aspect;
  if (height > maxH) {
    height = maxH;
    width = height * aspect;
  }
  return { width, height };
}

// Frame positions back to front, as { shot, cx, cy, width, height, angle }.
export function layoutShots(preset, shots, w, h) {
  if (!shots.length || w <= 0 || h <= 0) return [];
  const put = (shot, cx, cy, size, angle = 0) => ({ shot, cx, cy, ...size, angle });
  switch (preset) {
    case "hero":
      return [put(shots[0], w / 2, h * 0.53, fit(shots[0], w * 0.84, h * 0.84))];
    case "trio": {
      const mid = shots[1 % shots.length];
      const center = fit(mid, w * 0.42, h * 0.86);
      const side = { width: center.width * 0.84, height: center.height * 0.84 };
      const spread = Math.min(center.width * 0.84, w * 0.3);
      return [
        put(shots[0], w / 2 - spread, h * 0.56, fit(shots[0], side.width, side.height)),
        ...(shots.length > 2 ? [put(shots[2], w / 2 + spread, h * 0.56, fit(shots[2], side.width, side.height))] : []),
        put(mid, w / 2, h * 0.52, center),
      ];
    }
    case "fan": {
      const count = shots.length;
      const frame = fit(shots[0], w * 0.36, h * 0.74);
      const step = count === 1 ? 0 : Math.min(frame.width * 0.8, (w * 0.88 - frame.width) / (count - 1));
      const start = w / 2 - (step * (count - 1)) / 2;
      const middle = (count - 1) / 2;
      const order = shots.map((_, i) => i).sort((a, b) => Math.abs(b - middle) - Math.abs(a - middle));
      return order.map((i) =>
        put(shots[i], start + step * i, h * 0.54 + Math.abs(i - middle) * h * 0.035, fit(shots[i], frame.width, frame.height), (i - middle) * 0.11)
      );
    }
    case "collage": {
      const main = fit(shots[0], w * 0.46, h * 0.88);
      const sw = main.width * 0.7;
      const sh = main.height * 0.7;
      return [
        ...(shots.length > 2 ? [put(shots[2], w * 0.77, h * 0.6, fit(shots[2], sw, sh))] : []),
        ...(shots.length > 1 ? [put(shots[1], w * 0.62, h * 0.44, fit(shots[1], sw, sh))] : []),
        put(shots[0], w * 0.36, h * 0.53, main),
      ];
    }
    case "responsive": {
      const wide = shots.find(isWide) || shots[0];
      const tall = shots.find((s) => s !== wide) || wide;
      const desktop = fit(wide, w * 0.72, h * 0.74);
      const phone = fit(tall, w * 0.24, h * 0.7);
      return [
        put(wide, w * 0.06 + desktop.width / 2, h * 0.47, desktop),
        ...(tall !== wide ? [put(tall, w * 0.06 + desktop.width * 0.98, h * 0.6, phone)] : []),
      ];
    }
    default:
      return [];
  }
}

function ShotFrame({ shot, width }) {
  const shadow = "0 8px 22px rgba(0,0,0,0.32)";
  if (isWide(shot)) {
    const bar = Math.max(4, width * 0.035);
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#151821", borderRadius: Math.max(4, width * 0.018), boxShadow: shadow, overflow: "hidden" }}>
        <div style={{ height: bar, display: "flex", alignItems: "center", paddingLeft: bar * 0.6, gap: bar * 0.22, flexShrink: 0 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: bar * 0.38, height: bar * 0.38, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <img src={shot.url} alt="" style={{ flex: 1, minHeight: 0, width: "100%", objectFit: "cover", objectPosition: "top center" }} />
      </div>
    );
  }
  const bezel = Math.max(1.5, width * 0.03);
  const radius = width * 0.13;
  return (
    <div style={{ width: "100%", height: "100%", boxSizing: "border-box", padding: bezel, background: "#0B0D12", borderRadius: radius, boxShadow: shadow }}>
      <img src={shot.url} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", borderRadius: radius - bezel }} />
    </div>
  );
}

export default function TemplatePreview({ presentation, name, className }) {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (presentation?.kind === "cover") {
    return (
      <div className={className} ref={ref}>
        <img src={presentation.url} alt={`${name} preview`} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  if (presentation?.kind === "showcase") {
    const colors = BACKDROPS[presentation.backdrop] || BACKDROPS.aurora;
    const light = presentation.backdrop === "paper";
    const placed = layoutShots(presentation.preset, presentation.shots, size.w, size.h);
    return (
      <div
        className={className}
        ref={ref}
        role="img"
        aria-label={`${name} app screens`}
        style={{ background: `linear-gradient(135deg, ${colors.join(", ")})`, position: "relative" }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 15% 10%, rgba(255,255,255,${light ? 0.7 : 0.22}), transparent 60%)` }} />
        {placed.map((item, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: item.cx - item.width / 2,
              top: item.cy - item.height / 2,
              width: item.width,
              height: item.height,
              transform: `rotate(${item.angle}rad)`,
            }}
          >
            <ShotFrame shot={item.shot} width={item.width} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
