"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Homepage "what goes in vs. what reaches you" comparison.
 * Strict vertical zone stack per panel (label row → particle zone → gut-wall band →
 * bloodstream zone) so labels and particles never overlap.
 * Pure SVG + CSS keyframes; IntersectionObserver trigger; reduced-motion fallback.
 */

const VILLI =
  "M0,22 Q10,12 20,22 T40,22 T60,22 T80,22 T100,22 T120,22 T140,22 T160,22 T180,22 T200,22 T220,22 T240,22 T260,22 T280,22 T300,22";

function Panel({ variant, count }: { variant: "standard" | "ahara"; count: number }) {
  const isAhara = variant === "ahara";
  const color = isAhara ? "#C4973A" : "#9E9E9E";
  const xs = Array.from({ length: count }, (_, i) =>
    Math.round(30 + i * (240 / Math.max(count - 1, 1)))
  );
  // standard: only the middle particle passes. ahara: most pass (every 4th, offset 1, blocked).
  const passes = (i: number) => (isAhara ? i % 4 !== 1 : i === Math.floor(count / 2));
  const bloodCells = isAhara ? [30, 90, 150, 210, 270] : [150];

  return (
    <div className="flex flex-col gap-3">
      <p
        className="font-mono text-[11px] tracking-[0.2em] uppercase text-center"
        style={{ color: isAhara ? "#C4973A" : "rgba(26,26,26,0.50)" }}
      >
        {isAhara ? "AHARA" : "STANDARD SUPPLEMENT"}
      </p>

      {/* Card with strict vertical zones */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{
          minHeight: 320,
          background: isAhara ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.52)",
          border: isAhara ? "1px solid rgba(196,151,58,0.40)" : "1px solid rgba(26,26,26,0.10)",
          boxShadow: isAhara ? "0 8px 36px rgba(196,151,58,0.12)" : "none",
        }}
      >
        {/* GUT LUMEN label row */}
        <div
          className="font-mono uppercase"
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "rgba(26,26,26,0.5)",
            padding: "10px 14px",
            background: "rgba(0,0,0,0.04)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          Gut Lumen
        </div>

        {/* Particle zone */}
        <div style={{ flex: 1, minHeight: 120, position: "relative", overflow: "hidden" }}>
          <svg viewBox="0 0 300 130" preserveAspectRatio="xMidYMid meet"
               className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {xs.map((x, i) => (
              <circle
                key={i}
                className={passes(i) ? "aca-through" : "aca-blocked"}
                cx={x}
                cy="12"
                r="5.5"
                fill={color}
                style={{ animationDelay: `${(i % count) * 0.35}s` }}
              />
            ))}
          </svg>
        </div>

        {/* Gut wall band */}
        <div style={{ height: 32, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 300 32" preserveAspectRatio="none"
               className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d={VILLI} fill="none"
                  stroke={isAhara ? "rgba(196,151,58,0.55)" : "rgba(26,26,26,0.28)"} strokeWidth="1.5" />
            {isAhara && (
              <line x1="0" y1="22" x2="300" y2="22" stroke="rgba(196,151,58,0.30)" strokeWidth="1" strokeDasharray="2 10" />
            )}
          </svg>
          <span
            className="relative font-mono uppercase"
            style={{
              zIndex: 10,
              fontSize: 10,
              letterSpacing: "0.14em",
              padding: "2px 8px",
              borderRadius: 6,
              background: "rgba(250,247,242,0.85)",
              color: isAhara ? "rgba(61,107,79,0.95)" : "rgba(158,158,158,0.95)",
            }}
          >
            {isAhara ? "Co-Factors Active" : "No Co-Factors"}
          </span>
        </div>

        {/* Bloodstream zone */}
        <div style={{ height: 80, position: "relative", overflow: "hidden", background: isAhara ? "rgba(196,151,58,0.08)" : "rgba(0,0,0,0.02)" }}>
          <svg viewBox="0 0 300 80" preserveAspectRatio="none"
               className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0" y1="2" x2="300" y2="2" stroke={isAhara ? "rgba(196,151,58,0.35)" : "rgba(26,26,26,0.12)"} strokeWidth="1.5" />
            {bloodCells.map((x, i) => (
              <circle key={i} className="aca-drift" cx={x} cy={34 + (i % 2) * 16} r="4.5"
                      fill={isAhara ? "rgba(196,151,58,0.32)" : "rgba(158,158,158,0.25)"}
                      style={{ animationDelay: `${i * 0.7}s` }} />
            ))}
          </svg>
          <span
            className="absolute font-mono uppercase"
            style={{ bottom: 8, left: 12, fontSize: 10, letterSpacing: "0.12em", color: "rgba(26,26,26,0.45)" }}
          >
            Bloodstream
          </span>
        </div>
      </div>

      <p
        className="font-mono text-[11px] tracking-[0.15em] uppercase text-center"
        style={{ marginTop: 12, color: isAhara ? "#C4973A" : "rgba(158,158,158,0.9)" }}
      >
        {isAhara ? "Built to reach you" : "Most passes through"}
      </p>
    </div>
  );
}

export default function AbsorptionComparisonAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(8);

  useEffect(() => {
    setCount(window.innerWidth < 768 ? 5 : 8);
  }, []);

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

  return (
    <div ref={ref} data-animate={inView}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel variant="standard" count={count} />
        <Panel variant="ahara" count={count} />
      </div>

      <style jsx>{`
        :global([data-animate="true"]) .aca-blocked {
          will-change: transform, opacity;
          animation: aca-blocked 4s ease-in-out infinite;
        }
        :global([data-animate="true"]) .aca-through {
          will-change: transform, opacity;
          animation: aca-through 4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        :global([data-animate="true"]) .aca-drift {
          will-change: transform;
          animation: aca-drift 5s linear infinite;
        }
        :global([data-animate="false"]) .aca-blocked,
        :global([data-animate="false"]) .aca-through {
          opacity: 0;
        }

        /* particles fall within the particle zone only (viewBox height 130) */
        @keyframes aca-blocked {
          0%   { transform: translateY(-10px); opacity: 0; }
          16%  { opacity: 1; }
          50%  { transform: translateY(70px); opacity: 1; }
          66%  { transform: translateY(80px); opacity: 0; }
          100% { transform: translateY(80px); opacity: 0; }
        }
        @keyframes aca-through {
          0%   { transform: translateY(-10px); opacity: 0; }
          16%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translateY(116px); opacity: 0; }
        }
        @keyframes aca-drift {
          0%   { transform: translateX(-24px); }
          100% { transform: translateX(320px); }
        }

        @media (prefers-reduced-motion: reduce) {
          :global([data-animate="true"]) .aca-blocked,
          :global([data-animate="true"]) .aca-through,
          :global([data-animate="true"]) .aca-drift {
            animation: none;
          }
          :global([data-animate]) .aca-through { opacity: 1; transform: translateY(60px); }
          :global([data-animate]) .aca-blocked { opacity: 0.7; transform: translateY(60px); }
        }
      `}</style>
    </div>
  );
}
