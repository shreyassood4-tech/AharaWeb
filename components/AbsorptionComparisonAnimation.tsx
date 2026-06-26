"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Homepage "What goes in vs. what reaches you" comparison.
 * Left: standard supplement — grey particles blocked at the gut wall, one trickles through.
 * Right: Ahara — gold particles, co-factor-primed wall, most pass into an active bloodstream.
 * Pure SVG + CSS keyframes. Triggers/pauses via IntersectionObserver; respects reduced-motion.
 */

const VILLI_PATH =
  "M0,168 Q12,150 24,168 T48,168 T72,168 T96,168 T120,168 T144,168 T168,168 T192,168 T216,168 T240,168 T264,168 T288,168 T312,168";

function Panel({ variant, count }: { variant: "standard" | "ahara"; count: number }) {
  const isAhara = variant === "ahara";
  const particleColor = isAhara ? "#C4973A" : "#9E9E9E";
  const xs = Array.from({ length: count }, (_, i) =>
    Math.round(40 + i * (220 / Math.max(count - 1, 1)))
  );

  // standard: only the middle particle passes. ahara: most pass (every 4th, offset 1, is blocked).
  const passes = (i: number) =>
    isAhara ? i % 4 !== 1 : i === Math.floor(count / 2);

  return (
    <div className="flex flex-col gap-4">
      <p
        className="font-mono text-[11px] tracking-[0.2em] uppercase text-center"
        style={{ color: isAhara ? "#C4973A" : "rgba(26,26,26,0.50)" }}
      >
        {isAhara ? "AHARA" : "STANDARD SUPPLEMENT"}
      </p>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: isAhara ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.50)",
          border: isAhara ? "1px solid rgba(196,151,58,0.40)" : "1px solid rgba(26,26,26,0.10)",
          boxShadow: isAhara ? "0 8px 36px rgba(196,151,58,0.12)" : "none",
        }}
      >
        <svg viewBox="0 0 300 320" className="w-full h-auto" role="img"
             aria-label={isAhara
               ? "Ahara: nutrients pass through the primed gut wall into an active bloodstream."
               : "Standard supplement: most nutrients are blocked at the gut wall."}
             xmlns="http://www.w3.org/2000/svg">
          <text x="14" y="24" className="aca-zone">GUT LUMEN</text>

          {/* Gut wall glow (ahara only) */}
          {isAhara && (
            <rect className="aca-wallglow" x="0" y="150" width="300" height="36"
                  fill="#3D6B4F" />
          )}

          {/* Gut wall + villi texture */}
          <path d={VILLI_PATH} fill="none"
                stroke={isAhara ? "rgba(196,151,58,0.55)" : "rgba(26,26,26,0.28)"} strokeWidth="1.5" />
          <line x1="0" y1="186" x2="300" y2="186"
                stroke={isAhara ? "rgba(196,151,58,0.30)" : "rgba(26,26,26,0.16)"} strokeWidth="1"
                strokeDasharray={isAhara ? "2 10" : "0"} />
          <text x="150" y="204" textAnchor="middle"
                className="aca-walllabel"
                style={{ fill: isAhara ? "rgba(61,107,79,0.95)" : "rgba(158,158,158,0.85)" }}>
            {isAhara ? "CO-FACTORS ACTIVE" : "NO CO-FACTORS"}
          </text>

          {/* Bloodstream */}
          <rect x="0" y="250" width="300" height="50"
                fill={isAhara ? "rgba(196,151,58,0.10)" : "rgba(26,26,26,0.03)"} />
          <line x1="0" y1="250" x2="300" y2="250"
                stroke={isAhara ? "rgba(196,151,58,0.35)" : "rgba(26,26,26,0.15)"} strokeWidth="1.2" />
          <text x="14" y="312" className="aca-zone">BLOODSTREAM</text>

          {/* Bloodstream cells */}
          {(isAhara ? [30, 90, 150, 210, 270] : [150]).map((x, i) => (
            <circle key={`bs-${i}`} className="aca-drift" cx={x} cy={272 + (i % 2) * 12} r="4.5"
                    fill={isAhara ? "rgba(196,151,58,0.30)" : "rgba(158,158,158,0.25)"}
                    style={{ animationDelay: `${i * 0.7}s` }} />
          ))}

          {/* Falling nutrient particles */}
          {xs.map((x, i) => (
            <circle
              key={`p-${i}`}
              className={passes(i) ? "aca-through" : "aca-blocked"}
              cx={x}
              cy="22"
              r="5.5"
              fill={particleColor}
              style={{ animationDelay: `${(i % count) * 0.35}s` }}
            />
          ))}
        </svg>
      </div>

      <p
        className="font-mono text-[11px] tracking-[0.15em] uppercase text-center"
        style={{ color: isAhara ? "#C4973A" : "rgba(158,158,158,0.85)" }}
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
        .aca-zone {
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          fill: rgba(26, 26, 26, 0.40);
          text-transform: uppercase;
        }
        .aca-walllabel {
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

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
        :global([data-animate="true"]) .aca-wallglow {
          will-change: opacity;
          animation: aca-wallpulse 4s ease-in-out infinite;
        }
        :global([data-animate="false"]) .aca-blocked,
        :global([data-animate="false"]) .aca-through {
          opacity: 0;
        }
        :global([data-animate="false"]) .aca-wallglow {
          opacity: 0.12;
        }

        @keyframes aca-blocked {
          0%   { transform: translateY(-12px); opacity: 0; }
          16%  { opacity: 1; }
          45%  { transform: translateY(150px); opacity: 1; }
          60%  { transform: translateY(158px); opacity: 0; }
          100% { transform: translateY(158px); opacity: 0; }
        }
        @keyframes aca-through {
          0%   { transform: translateY(-12px); opacity: 0; }
          16%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(258px); opacity: 0; }
        }
        @keyframes aca-drift {
          0%   { transform: translateX(-24px); }
          100% { transform: translateX(320px); }
        }
        @keyframes aca-wallpulse {
          0%, 100% { opacity: 0.12; }
          50%      { opacity: 0.40; }
        }

        @media (prefers-reduced-motion: reduce) {
          :global([data-animate="true"]) .aca-blocked,
          :global([data-animate="true"]) .aca-through,
          :global([data-animate="true"]) .aca-drift,
          :global([data-animate="true"]) .aca-wallglow {
            animation: none;
          }
          :global([data-animate]) .aca-through { opacity: 1; transform: translateY(120px); }
          :global([data-animate]) .aca-blocked { opacity: 0.7; transform: translateY(120px); }
          :global([data-animate]) .aca-wallglow { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}
