"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Nutrient Absorption Animation — Science page.
 * Cross-section of the gut wall: lumen → villi/epithelium → bloodstream.
 * Pure SVG + CSS keyframes (no animation libraries).
 * Triggers on scroll into view; respects prefers-reduced-motion.
 */
export default function AbsorptionAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Villi humps across the top boundary of the tissue.
  const villi = [120, 280, 440, 600, 760];

  return (
    <div ref={ref} className="w-full max-w-[860px] mx-auto" data-animate={inView}>
      <svg
        viewBox="0 0 860 440"
        className="w-full h-auto absorption-svg"
        role="img"
        aria-label="Diagram showing nutrients absorbing from the gut lumen through the intestinal wall into the bloodstream."
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Zone labels ── */}
        <text x="24" y="34" className="abs-label">GUT LUMEN</text>
        <text x="24" y="246" className="abs-label">EPITHELIAL LAYER</text>
        <text x="24" y="406" className="abs-label">BLOODSTREAM</text>

        {/* ── Tissue body with villi (finger-like projections into the lumen) ── */}
        <path
          d="M0,120
             Q40,60 80,120 Q120,60 160,120
             Q200,60 240,120 Q280,60 320,120
             Q360,60 400,120 Q440,60 480,120
             Q520,60 560,120 Q600,60 640,120
             Q680,60 720,120 Q760,60 800,120
             Q840,60 860,120
             L860,300 L0,300 Z"
          fill="rgba(45,74,47,0.22)"
          stroke="rgba(196,151,58,0.30)"
          strokeWidth="1.5"
        />

        {/* Epithelial cell divisions along each villus surface */}
        {villi.map((x, i) => (
          <g key={i} opacity="0.45">
            <circle cx={x} cy="96" r="7" fill="none" stroke="rgba(196,151,58,0.40)" strokeWidth="1" />
            <circle cx={x - 26} cy="112" r="6" fill="none" stroke="rgba(196,151,58,0.30)" strokeWidth="1" />
            <circle cx={x + 26} cy="112" r="6" fill="none" stroke="rgba(196,151,58,0.30)" strokeWidth="1" />
          </g>
        ))}

        {/* Epithelial boundary line */}
        <line x1="0" y1="258" x2="860" y2="258" stroke="rgba(196,151,58,0.25)" strokeWidth="1" strokeDasharray="4 6" />

        {/* ── Capillary / bloodstream vessel ── */}
        <rect x="0" y="330" width="860" height="56" fill="rgba(196,151,58,0.07)" />
        <line x1="0" y1="330" x2="860" y2="330" stroke="rgba(196,151,58,0.35)" strokeWidth="1.5" />
        <line x1="0" y1="386" x2="860" y2="386" stroke="rgba(196,151,58,0.35)" strokeWidth="1.5" />

        {/* Blood cells drifting along the vessel */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`bc-${i}`}
            className="abs-bloodcell"
            cx="0"
            cy={350 + (i % 3) * 12}
            r="6"
            fill="rgba(196,151,58,0.22)"
            style={{ animationDelay: `${i * 0.9}s` }}
          />
        ))}

        {/* ── Nutrient particles: lumen → through villus → into bloodstream ── */}
        {villi.map((x, i) => (
          <g key={`drop-${i}`}>
            <circle
              className="abs-nutrient"
              cx={x}
              r="6"
              fill="#E8B84B"
              style={{ animationDelay: `${i * 0.55}s` }}
            />
            <circle
              className="abs-nutrient"
              cx={x - 14}
              r="4.5"
              fill="#C4973A"
              style={{ animationDelay: `${i * 0.55 + 1.4}s` }}
            />
          </g>
        ))}
      </svg>

      <p className="text-center font-mono text-gold/70 text-[11px] tracking-[0.18em] uppercase mt-5">
        From gut to bloodstream — the Ahara absorption pathway
      </p>

      <style jsx>{`
        .abs-label {
          font-family: "DM Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          fill: rgba(196, 151, 58, 0.55);
          text-transform: uppercase;
        }
        :global([data-animate="true"]) .abs-nutrient {
          will-change: transform, opacity;
          animation: abs-fall 3.6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        :global([data-animate="false"]) .abs-nutrient {
          opacity: 0;
        }
        :global([data-animate="true"]) .abs-bloodcell {
          will-change: transform;
          animation: abs-flow 5.4s linear infinite;
        }
        /* Nutrient travels from above the lumen, through the villus, into the vessel */
        @keyframes abs-fall {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          55% {
            transform: translateY(180px);
            opacity: 1;
          }
          78% {
            transform: translateY(255px);
            opacity: 0.85;
          }
          100% {
            transform: translateY(345px);
            opacity: 0;
          }
        }
        @keyframes abs-flow {
          0% {
            transform: translateX(-40px);
          }
          100% {
            transform: translateX(900px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global([data-animate="true"]) .abs-nutrient,
          :global([data-animate="true"]) .abs-bloodcell {
            animation: none;
          }
          :global([data-animate]) .abs-nutrient {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
