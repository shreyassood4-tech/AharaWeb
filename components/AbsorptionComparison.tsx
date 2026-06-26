"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Absorption Comparison — Science page.
 * Two panels side by side: a standard dosage-first supplement (nutrients blocked
 * at the gut wall, most lost) vs. the Ahara formula (co-factors open the pathway,
 * nutrients reach the bloodstream).
 * Pure SVG + CSS keyframes. Triggers on scroll; respects prefers-reduced-motion.
 */
export default function AbsorptionComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const particleX = [70, 130, 190, 250];

  return (
    <div ref={ref} className="w-full" data-animate={inView}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ───────── STANDARD SUPPLEMENT ───────── */}
        <div className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
             style={{ background: "rgba(17,28,18,0.45)", border: "1px solid rgba(242,237,227,0.10)" }}>
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(242,237,227,0.45)" }}>
              STANDARD SUPPLEMENT
            </p>
            <p className="font-inter text-sm mt-1" style={{ color: "rgba(242,237,227,0.50)" }}>
              Dosage-first · no absorption support
            </p>
          </div>

          <svg viewBox="0 0 320 300" className="w-full h-auto" role="img"
               aria-label="Standard supplement: most nutrients are blocked at the gut wall and never reach the bloodstream."
               xmlns="http://www.w3.org/2000/svg">
            <text x="12" y="22" className="cmp-label-dim">INTAKE</text>
            <text x="12" y="290" className="cmp-label-dim">BLOODSTREAM</text>

            {/* Impermeable gut wall — tight brick barrier */}
            <line x1="0" y1="186" x2="320" y2="186" stroke="rgba(242,237,227,0.30)" strokeWidth="2" />
            {Array.from({ length: 16 }).map((_, i) => (
              <rect key={i} x={i * 20} y="178" width="16" height="16"
                    fill="none" stroke="rgba(242,237,227,0.16)" strokeWidth="1" />
            ))}

            {/* Bloodstream — nearly empty */}
            <rect x="0" y="246" width="320" height="40" fill="rgba(242,237,227,0.03)" />
            <line x1="0" y1="246" x2="320" y2="246" stroke="rgba(242,237,227,0.18)" strokeWidth="1" />

            {/* Blocked nutrients — fall, hit the wall, wobble, fade back */}
            {particleX.map((x, i) => (
              <circle key={`b-${i}`} className="cmp-blocked" cx={x} cy="40" r="6"
                      fill="rgba(242,237,227,0.55)"
                      style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
            {/* A single nutrient that does leak through */}
            <circle className="cmp-leak" cx="160" cy="40" r="5"
                    fill="rgba(242,237,227,0.55)" style={{ animationDelay: "1.2s" }} />
          </svg>

          <div className="flex flex-col gap-2">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(242,237,227,0.10)" }}>
              <div className="cmp-bar-low h-full rounded-full" style={{ background: "rgba(242,237,227,0.40)" }} />
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(242,237,227,0.45)" }}>
              Most nutrients never absorbed
            </p>
          </div>
        </div>

        {/* ───────── AHARA FORMULA ───────── */}
        <div className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
             style={{ background: "rgba(45,74,47,0.18)", border: "1px solid rgba(196,151,58,0.40)", boxShadow: "0 0 40px rgba(196,151,58,0.08)" }}>
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold">
              AHARA FORMULA
            </p>
            <p className="font-inter text-sm mt-1" style={{ color: "rgba(242,237,227,0.70)" }}>
              Absorption-first · co-factor optimized
            </p>
          </div>

          <svg viewBox="0 0 320 300" className="w-full h-auto" role="img"
               aria-label="Ahara formula: co-factors open the gut wall so nutrients flow through into the bloodstream."
               xmlns="http://www.w3.org/2000/svg">
            <text x="12" y="22" className="cmp-label">INTAKE</text>
            <text x="12" y="290" className="cmp-label">BLOODSTREAM</text>

            {/* Permeable gut wall — open gates / channels */}
            <line x1="0" y1="186" x2="320" y2="186" stroke="rgba(196,151,58,0.35)" strokeWidth="1.5" strokeDasharray="2 18" />
            {[70, 130, 190, 250].map((x, i) => (
              <path key={i} d={`M${x - 14},186 Q${x},166 ${x + 14},186`}
                    fill="none" stroke="rgba(196,151,58,0.45)" strokeWidth="1.5" />
            ))}

            {/* Bloodstream — receiving nutrients */}
            <rect x="0" y="246" width="320" height="40" fill="rgba(196,151,58,0.08)" />
            <line x1="0" y1="246" x2="320" y2="246" stroke="rgba(196,151,58,0.35)" strokeWidth="1.5" />
            {[40, 120, 200, 280].map((x, i) => (
              <circle key={`flowcell-${i}`} className="cmp-bloodcell" cx={x} cy={262 + (i % 2) * 10} r="5"
                      fill="rgba(196,151,58,0.20)" style={{ animationDelay: `${i * 0.8}s` }} />
            ))}

            {/* Co-factor helpers — green, guiding nutrients through */}
            {particleX.map((x, i) => (
              <circle key={`co-${i}`} className="cmp-flow" cx={x + 10} cy="40" r="3.5"
                      fill="rgba(120,170,110,0.75)" style={{ animationDelay: `${i * 0.5 + 0.15}s` }} />
            ))}
            {/* Nutrients — flow all the way through to the bloodstream */}
            {particleX.map((x, i) => (
              <circle key={`f-${i}`} className="cmp-flow" cx={x} cy="40" r="6"
                      fill="#E8B84B" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
          </svg>

          <div className="flex flex-col gap-2">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(196,151,58,0.15)" }}>
              <div className="cmp-bar-high h-full rounded-full" style={{ background: "linear-gradient(to right, #2D4A2F, #C4973A)" }} />
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/80">
              Engineered for nutrient uptake
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cmp-label {
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          fill: rgba(196, 151, 58, 0.60);
          text-transform: uppercase;
        }
        .cmp-label-dim {
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          fill: rgba(242, 237, 227, 0.35);
          text-transform: uppercase;
        }

        :global([data-animate="true"]) .cmp-blocked {
          will-change: transform, opacity;
          animation: cmp-block 3.2s ease-in-out infinite;
        }
        :global([data-animate="true"]) .cmp-leak {
          will-change: transform, opacity;
          animation: cmp-leak 6.4s ease-in infinite;
        }
        :global([data-animate="true"]) .cmp-flow {
          will-change: transform, opacity;
          animation: cmp-flow 3.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        :global([data-animate="true"]) .cmp-bloodcell {
          will-change: transform;
          animation: cmp-drift 5s linear infinite;
        }
        :global([data-animate="false"]) .cmp-blocked,
        :global([data-animate="false"]) .cmp-leak,
        :global([data-animate="false"]) .cmp-flow {
          opacity: 0;
        }

        /* Nutrient blocked at the wall: falls, presses, then is pushed back and fades */
        @keyframes cmp-block {
          0%   { transform: translateY(0);     opacity: 0; }
          15%  { opacity: 1; }
          42%  { transform: translateY(140px); opacity: 1; }
          54%  { transform: translateY(132px); opacity: 1; }
          64%  { transform: translateY(140px); opacity: 0.7; }
          100% { transform: translateY(96px);  opacity: 0; }
        }
        /* Rare nutrient that slips through */
        @keyframes cmp-leak {
          0%   { transform: translateY(0);     opacity: 0; }
          10%  { opacity: 1; }
          45%  { transform: translateY(150px); opacity: 1; }
          100% { transform: translateY(232px); opacity: 0; }
        }
        /* Ahara: nutrient flows straight through into the bloodstream */
        @keyframes cmp-flow {
          0%   { transform: translateY(0);     opacity: 0; }
          14%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(228px); opacity: 0; }
        }
        @keyframes cmp-drift {
          0%   { transform: translateX(-30px); }
          100% { transform: translateX(340px); }
        }

        :global([data-animate="true"]) .cmp-bar-low {
          animation: cmp-fill-low 1.4s ease-out forwards;
        }
        :global([data-animate="true"]) .cmp-bar-high {
          animation: cmp-fill-high 1.6s ease-out forwards;
        }
        :global([data-animate="false"]) .cmp-bar-low,
        :global([data-animate="false"]) .cmp-bar-high {
          width: 0;
        }
        @keyframes cmp-fill-low  { from { width: 0; } to { width: 22%; } }
        @keyframes cmp-fill-high { from { width: 0; } to { width: 95%; } }

        @media (prefers-reduced-motion: reduce) {
          :global([data-animate="true"]) .cmp-blocked,
          :global([data-animate="true"]) .cmp-leak,
          :global([data-animate="true"]) .cmp-flow,
          :global([data-animate="true"]) .cmp-bloodcell {
            animation: none;
          }
          :global([data-animate]) .cmp-blocked,
          :global([data-animate]) .cmp-flow { opacity: 0.85; }
          :global([data-animate="true"]) .cmp-bar-low  { width: 22%; animation: none; }
          :global([data-animate="true"]) .cmp-bar-high { width: 95%; animation: none; }
        }
      `}</style>
    </div>
  );
}
