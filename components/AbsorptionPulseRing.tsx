"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sonar-style concentric pulse rings radiating from the hero centre — represents
 * nutrients reaching the body. Pure SVG + CSS keyframes, no libraries.
 * Reduced-motion: only the static inner ring + centre dot.
 */
export default function AbsorptionPulseRing() {
  const ref = useRef<HTMLDivElement>(null);
  const [{ w, h, mobile }, setSize] = useState({ w: 0, h: 0, mobile: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setSize({ w: el.clientWidth, h: el.clientHeight, mobile: window.innerWidth < 768 });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cx = w / 2;
  const cy = h / 2;
  const maxR = (w || 800) * (mobile ? 0.35 : 0.45);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}
    >
      {w > 0 && (
        <svg width={w} height={h} style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
          {/* static inner "source" ring */}
          <circle cx={cx} cy={cy} r={40} fill="none" stroke="#C4973A" strokeWidth={1} opacity={0.15} />

          {/* expanding sonar rings */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              className="apr-ring"
              cx={cx}
              cy={cy}
              r={60}
              fill="none"
              stroke="#C4973A"
              style={{ ["--apr-max" as string]: `${maxR}px`, animationDelay: `${i}s` }}
            />
          ))}

          {/* centre nutrient source */}
          <circle
            className="apr-dot"
            cx={cx}
            cy={cy}
            r={6}
            fill="#C4973A"
            opacity={0.8}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />

          <style>{`
            .apr-ring {
              stroke-width: 1px;
              opacity: 0;
              will-change: r, opacity;
              animation: apr-expand 4s ease-out infinite;
            }
            @keyframes apr-expand {
              0%   { r: 60px; opacity: 0.6; stroke-width: 1px; }
              100% { r: var(--apr-max); opacity: 0; stroke-width: 0.5px; }
            }
            .apr-dot {
              will-change: transform;
              animation: apr-pulse 3s ease-in-out infinite;
            }
            @keyframes apr-pulse {
              0%, 100% { transform: scale(1); }
              50%      { transform: scale(1.3); }
            }
            @media (prefers-reduced-motion: reduce) {
              .apr-ring { animation: none; opacity: 0; }
              .apr-dot { animation: none; }
            }
          `}</style>
        </svg>
      )}
    </div>
  );
}
