"use client";

import { useEffect, useRef, useState } from "react";

interface PhaseUnlockAnimationProps {
  phase: 1 | 2 | 3 | 4;
}

/**
 * Co-factor "unlock" animations for the Science page four-phase breakdown.
 * One reusable component, a different SVG + CSS animation per phase.
 * Self-observes via IntersectionObserver (threshold 0.5); respects reduced-motion.
 * Colours: gold #C4973A (active/Ahara), grey #9E9E9E (inactive), sage #3D6B4F (environment).
 */
export default function PhaseUnlockAnimation({ phase }: PhaseUnlockAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setActive(e.isIntersecting)),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-active={active}
      className="w-full h-[180px] md:h-[240px] rounded-xl overflow-hidden flex items-center justify-center"
      style={{ background: "rgba(61,107,79,0.06)", border: "1px solid rgba(196,151,58,0.15)" }}
    >
      <svg viewBox="0 0 240 170" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {phase === 1 && <Phase1 />}
        {phase === 2 && <Phase2 />}
        {phase === 3 && <Phase3 />}
        {phase === 4 && <Phase4 />}
      </svg>

      <style jsx>{`
        text {
          font-family: "DM Mono", monospace;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        /* ─── PHASE 1 — disperses easily ─── */
        :global([data-active="true"]) .p1-grain {
          will-change: transform, opacity;
          animation: p1-fall 3s ease-in infinite;
        }
        :global([data-active="false"]) .p1-grain { opacity: 0; }
        @keyframes p1-fall {
          0%   { transform: translateY(-46px); opacity: 0; }
          20%  { opacity: 1; }
          55%  { transform: translateY(46px);  opacity: 1; }
          80%  { transform: translateY(56px);  opacity: 0; }
          100% { transform: translateY(56px);  opacity: 0; }
        }

        /* ─── PHASE 2 — D3 alone vs D3 + fat ─── */
        :global([data-active="true"]) .p2-hex {
          will-change: transform;
          animation: p2-hex 3s ease-in-out infinite;
        }
        :global([data-active="true"]) .p2-fat { animation: p2-fat 3s ease-in-out infinite; }
        :global([data-active="true"]) .p2-bar-red { animation: p2-red 3s steps(1) infinite; }
        :global([data-active="true"]) .p2-bar-green { animation: p2-green 3s steps(1) infinite; }
        :global([data-active="true"]) .p2-lbl-blocked { animation: p2-red 3s steps(1) infinite; }
        :global([data-active="true"]) .p2-lbl-absorbed { animation: p2-green 3s steps(1) infinite; }
        :global([data-active="false"]) .p2-fat,
        :global([data-active="false"]) .p2-bar-green,
        :global([data-active="false"]) .p2-lbl-absorbed { opacity: 0; }
        @keyframes p2-hex {
          0%   { transform: translateX(-46px); }
          32%  { transform: translateX(0); }
          44%  { transform: translateX(-10px); }
          56%  { transform: translateX(-10px); }
          100% { transform: translateX(64px); }
        }
        @keyframes p2-fat {
          0%, 46% { opacity: 0; transform: translateX(-30px); }
          58%     { opacity: 1; }
          100%    { opacity: 1; transform: translateX(52px); }
        }
        @keyframes p2-red   { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes p2-green { 0%, 49% { opacity: 0; } 50%, 100% { opacity: 1; } }

        /* ─── PHASE 3 — gut environment primed ─── */
        :global([data-active="true"]) .p3-grey { animation: p3-grey 4s ease-in-out infinite; }
        :global([data-active="true"]) .p3-sage {
          will-change: transform, opacity;
          animation: p3-sage 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        :global([data-active="true"]) .p3-b12 {
          will-change: transform, opacity;
          animation: p3-b12 4s ease-in infinite;
        }
        :global([data-active="false"]) .p3-sage,
        :global([data-active="false"]) .p3-b12 { opacity: 0; }
        @keyframes p3-grey { 0%, 40% { opacity: 1; } 60%, 100% { opacity: 0; } }
        @keyframes p3-sage {
          0%, 38% { opacity: 0; transform: scale(0.7); }
          60%     { opacity: 1; transform: scale(1.05); }
          70%     { transform: scale(1); }
          85%     { transform: scale(1.05); }
          100%    { opacity: 1; transform: scale(1); }
        }
        @keyframes p3-b12 {
          0%, 50% { transform: translateY(-4px); opacity: 0; }
          62%     { opacity: 1; }
          100%    { transform: translateY(48px); opacity: 0; }
        }

        /* ─── PHASE 4 — piperine expands absorption ─── */
        :global([data-active="true"]) .p4-ring {
          will-change: transform, opacity;
          animation: p4-ring 3s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        :global([data-active="true"]) .p4-pepper { animation: p4-pepper 3s ease-in-out infinite; }
        :global([data-active="false"]) .p4-ring,
        :global([data-active="false"]) .p4-pepper { opacity: 0; }
        @keyframes p4-ring {
          0%   { transform: scale(0.3); opacity: 0; }
          20%  { opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes p4-pepper {
          0%, 25% { opacity: 0; }
          50%     { opacity: 1; }
          100%    { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          :global([data-active="true"]) .p1-grain,
          :global([data-active="true"]) .p2-hex,
          :global([data-active="true"]) .p2-fat,
          :global([data-active="true"]) .p2-bar-red,
          :global([data-active="true"]) .p2-bar-green,
          :global([data-active="true"]) .p2-lbl-blocked,
          :global([data-active="true"]) .p2-lbl-absorbed,
          :global([data-active="true"]) .p3-grey,
          :global([data-active="true"]) .p3-sage,
          :global([data-active="true"]) .p3-b12,
          :global([data-active="true"]) .p4-ring,
          :global([data-active="true"]) .p4-pepper {
            animation: none;
          }
          :global([data-active]) .p1-grain { opacity: 0.8; }
          :global([data-active]) .p2-fat,
          :global([data-active]) .p2-bar-green,
          :global([data-active]) .p2-lbl-absorbed,
          :global([data-active]) .p3-sage { opacity: 1; }
          :global([data-active]) .p3-grey,
          :global([data-active]) .p2-bar-red,
          :global([data-active]) .p2-lbl-blocked { opacity: 0; }
          :global([data-active]) .p4-ring { opacity: 0.4; }
          :global([data-active]) .p4-pepper { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* PHASE 1 — powder disperses easily into a bowl */
function Phase1() {
  const grains = [60, 90, 120, 150, 180];
  return (
    <>
      {grains.map((x, i) => (
        <circle key={i} className="p1-grain" cx={x} cy="62" r="4" fill="#F0EBE3"
                stroke="rgba(196,151,58,0.5)" strokeWidth="0.6"
                style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      {/* bowl */}
      <path d="M64,108 Q120,150 176,108" fill="none" stroke="rgba(61,107,79,0.6)" strokeWidth="2" />
      <line x1="60" y1="108" x2="64" y2="108" stroke="rgba(61,107,79,0.6)" strokeWidth="2" />
      <line x1="176" y1="108" x2="180" y2="108" stroke="rgba(61,107,79,0.6)" strokeWidth="2" />
      <ellipse cx="120" cy="110" rx="56" ry="7" fill="rgba(196,151,58,0.10)" />
      <text x="120" y="150" textAnchor="middle" fontSize="9" fill="rgba(61,107,79,0.95)">Disperses Easily</text>
    </>
  );
}

/* PHASE 2 — D3 alone blocked, D3 + fat absorbed */
function Phase2() {
  return (
    <>
      {/* gut wall */}
      <line x1="150" y1="28" x2="150" y2="120" stroke="rgba(26,26,26,0.18)" strokeWidth="1.5" strokeDasharray="3 5" />
      {/* barrier states */}
      <line className="p2-bar-red" x1="150" y1="40" x2="150" y2="108" stroke="rgba(181,89,26,0.8)" strokeWidth="3" />
      <line className="p2-bar-green" x1="150" y1="40" x2="150" y2="108" stroke="rgba(61,107,79,0.85)" strokeWidth="3" />

      {/* fat droplets */}
      <g className="p2-fat">
        <circle cx="86" cy="62" r="5" fill="#E8B84B" />
        <circle cx="78" cy="78" r="3.5" fill="#E8B84B" />
        <circle cx="92" cy="84" r="3" fill="#E8B84B" />
      </g>

      {/* D3 hexagon */}
      <g className="p2-hex">
        <path d="M96,58 l10,-6 l10,6 l0,12 l-10,6 l-10,-6 z" fill="none" stroke="#C4973A" strokeWidth="2" />
        <text x="106" y="68" textAnchor="middle" fontSize="7" fill="#C4973A" style={{ letterSpacing: 0 }}>D3</text>
      </g>

      <text className="p2-lbl-blocked" x="120" y="150" textAnchor="middle" fontSize="8.5" fill="rgba(181,89,26,0.9)">D3 Alone — Blocked</text>
      <text className="p2-lbl-absorbed" x="120" y="150" textAnchor="middle" fontSize="8.5" fill="rgba(61,107,79,0.95)">D3 + Fat — Absorbed</text>
    </>
  );
}

/* PHASE 3 — gut bacteria activate when fed */
function Phase3() {
  const bact = [70, 110, 150, 190];
  return (
    <>
      {/* gut lining */}
      <line x1="40" y1="104" x2="200" y2="104" stroke="rgba(196,151,58,0.4)" strokeWidth="1.5" />

      {/* inactive (grey) bacteria */}
      {bact.map((x, i) => (
        <ellipse key={`g-${i}`} className="p3-grey" cx={x} cy="96" rx="7" ry="4" fill="rgba(158,158,158,0.5)" />
      ))}
      {/* active (sage) bacteria */}
      {bact.map((x, i) => (
        <ellipse key={`s-${i}`} className="p3-sage" cx={x} cy="94" rx="9" ry="5" fill="rgba(61,107,79,0.85)"
                 style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
      {/* B12 particles moving through once primed */}
      {bact.map((x, i) => (
        <circle key={`b-${i}`} className="p3-b12" cx={x} cy="60" r="3.5" fill="#C4973A"
                style={{ animationDelay: `${i * 0.25}s` }} />
      ))}

      <text x="120" y="150" textAnchor="middle" fontSize="9" fill="rgba(61,107,79,0.95)">Gut Environment Primed</text>
    </>
  );
}

/* PHASE 4 — piperine expands absorption radius */
function Phase4() {
  return (
    <>
      {/* gut wall */}
      <line x1="40" y1="118" x2="200" y2="118" stroke="rgba(196,151,58,0.4)" strokeWidth="1.5" />
      {/* expanding absorption rings */}
      <circle className="p4-ring" cx="120" cy="74" r="26" fill="none" stroke="#C4973A" strokeWidth="2" />
      <circle className="p4-ring" cx="120" cy="74" r="26" fill="none" stroke="#C4973A" strokeWidth="2"
              style={{ animationDelay: "1.5s" }} />
      {/* nutrient particle */}
      <circle cx="120" cy="74" r="6" fill="#C4973A" />
      {/* black pepper silhouette */}
      <g className="p4-pepper">
        <ellipse cx="170" cy="58" rx="8" ry="10" fill="rgba(26,26,26,0.55)" />
        <path d="M170,48 q3,-5 7,-3" fill="none" stroke="rgba(26,26,26,0.55)" strokeWidth="1.5" />
      </g>
      <text x="120" y="150" textAnchor="middle" fontSize="8.5" fill="#C4973A">Piperine Expands Absorption</text>
    </>
  );
}
