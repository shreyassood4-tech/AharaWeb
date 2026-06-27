/**
 * Hero illustration: a hand spooning brown powder into a bowl of yogurt,
 * with berries, oats and a mint sprig. Warm Ahara palette, sits on the dark hero.
 * Pure SVG with subtle CSS motion (drifting powder + steam); reduced-motion safe.
 */
export default function YogurtBowlScene() {
  const grains = [
    [196, 296], [212, 302], [230, 299], [248, 303], [264, 298],
    [206, 290], [240, 292], [258, 306], [222, 306], [276, 302],
  ];

  return (
    <div className="w-full max-w-[460px] mx-auto" aria-hidden="true">
      <svg viewBox="0 0 460 480" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg"
           role="img" aria-label="A hand spooning brown nutritional powder into a bowl of yogurt, garnished with berries and oats.">
        <defs>
          <radialGradient id="ybsGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4973A" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#C4973A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ybsCeramic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7F2E8" />
            <stop offset="100%" stopColor="#DCD0BC" />
          </linearGradient>
          <linearGradient id="ybsYogurt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0E9DA" />
          </linearGradient>
          <linearGradient id="ybsWood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#AE7A44" />
            <stop offset="100%" stopColor="#7C5128" />
          </linearGradient>
          <linearGradient id="ybsHand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6C29B" />
            <stop offset="100%" stopColor="#C99A6E" />
          </linearGradient>
        </defs>

        {/* warm glow */}
        <ellipse cx="230" cy="300" rx="215" ry="175" fill="url(#ybsGlow)" />

        {/* shadow under bowl */}
        <ellipse cx="230" cy="416" rx="132" ry="18" fill="#0E0A07" opacity="0.45" />

        {/* steam */}
        <g fill="none" stroke="#F2EDE3" strokeWidth="3" strokeLinecap="round">
          <path className="ybs-steam" d="M198,272 q-10,-16 2,-30 q10,-12 2,-26" opacity="0.16" />
          <path className="ybs-steam" d="M252,270 q10,-16 -2,-30 q-10,-12 0,-26" opacity="0.13" style={{ animationDelay: "1.6s" }} />
        </g>

        {/* bowl body */}
        <path d="M84,298 C90,356 156,408 230,410 C304,408 370,356 376,298 Z"
              fill="url(#ybsCeramic)" stroke="rgba(120,90,40,0.12)" strokeWidth="1" />
        {/* rim */}
        <ellipse cx="230" cy="298" rx="146" ry="33" fill="#F4EEE2" stroke="rgba(196,151,58,0.20)" strokeWidth="1" />
        {/* inner shadow */}
        <ellipse cx="230" cy="300" rx="128" ry="25" fill="#E8DFCD" />
        {/* yogurt surface */}
        <ellipse cx="230" cy="296" rx="124" ry="23" fill="url(#ybsYogurt)" />
        <path d="M150,294 Q230,278 312,294" fill="none" stroke="#EFE7D5" strokeWidth="2" opacity="0.7" />
        <path d="M168,304 Q230,316 296,303" fill="none" stroke="#EFE7D5" strokeWidth="1.5" opacity="0.5" />

        {/* powder already on the yogurt */}
        <ellipse cx="240" cy="300" rx="34" ry="10" fill="#B5591A" opacity="0.40" />
        {grains.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.7}
                  fill={i % 2 === 0 ? "#B5591A" : "#C4973A"} opacity="0.8" />
        ))}

        {/* mint sprig */}
        <g>
          <path d="M180,288 q-6,-20 4,-30" fill="none" stroke="#3D6B4F" strokeWidth="1.6" />
          <path d="M184,272 q-16,-6 -14,-22 q16,4 14,22 Z" fill="#3D6B4F" />
          <path d="M184,268 q14,-8 26,-2 q-12,12 -26,2 Z" fill="#4A7C5C" />
        </g>

        {/* berries */}
        <circle cx="178" cy="302" r="8" fill="#46517A" />
        <circle cx="175" cy="299" r="2.2" fill="#7E88B0" />
        <circle cx="194" cy="307" r="6.5" fill="#7C2D3A" />
        <circle cx="192" cy="305" r="1.8" fill="#B05766" />

        {/* oat flakes */}
        <ellipse cx="268" cy="306" rx="5.5" ry="3" fill="#E7D9B8" transform="rotate(20 268 306)" stroke="rgba(150,120,60,0.3)" strokeWidth="0.5" />
        <ellipse cx="282" cy="300" rx="5" ry="2.8" fill="#EADDBE" transform="rotate(-15 282 300)" stroke="rgba(150,120,60,0.3)" strokeWidth="0.5" />

        {/* falling powder from the spoon */}
        <g fill="#B5591A">
          <circle className="ybs-fall" cx="284" cy="262" r="2.6" />
          <circle className="ybs-fall" cx="278" cy="266" r="2" fill="#C4973A" style={{ animationDelay: "0.5s" }} />
          <circle className="ybs-fall" cx="290" cy="264" r="2.2" style={{ animationDelay: "0.9s" }} />
          <circle className="ybs-fall" cx="282" cy="270" r="1.8" fill="#C4973A" style={{ animationDelay: "1.4s" }} />
        </g>

        {/* spoon handle */}
        <line x1="304" y1="246" x2="404" y2="138" stroke="url(#ybsWood)" strokeWidth="12" strokeLinecap="round" />
        {/* spoon bowl */}
        <g transform="rotate(-30 292 250)">
          <ellipse cx="292" cy="250" rx="31" ry="18" fill="url(#ybsWood)" />
          <ellipse cx="292" cy="248" rx="25" ry="13" fill="#6F4A26" />
          <ellipse cx="289" cy="246" rx="19" ry="8.5" fill="#B5591A" />
          <circle cx="284" cy="245" r="1.6" fill="#C4973A" />
          <circle cx="295" cy="247" r="1.4" fill="#E8B84B" />
        </g>

        {/* hand gripping the handle */}
        <g>
          {/* forearm off the top-right */}
          <path d="M402,132 L470,64 L470,158 L436,178 Z" fill="url(#ybsHand)" />
          {/* back of hand */}
          <ellipse cx="408" cy="142" rx="30" ry="24" fill="url(#ybsHand)" transform="rotate(-46 408 142)" />
          {/* thumb */}
          <ellipse cx="386" cy="128" rx="8" ry="13" fill="#DDB084" transform="rotate(-8 386 128)" />
          {/* fingers curling over the handle */}
          {[[372, 162], [383, 151], [394, 140], [404, 130]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="7" ry="12" fill="#E0B791"
                     stroke="rgba(150,110,70,0.25)" strokeWidth="0.6"
                     transform={`rotate(-48 ${x} ${y})`} />
          ))}
        </g>

        <style>{`
          .ybs-fall {
            will-change: transform, opacity;
            animation: ybsFall 2.8s ease-in infinite;
          }
          @keyframes ybsFall {
            0%   { transform: translateY(0); opacity: 0; }
            20%  { opacity: 1; }
            100% { transform: translateY(30px); opacity: 0; }
          }
          .ybs-steam {
            will-change: transform, opacity;
            animation: ybsSteam 5s ease-in-out infinite;
          }
          @keyframes ybsSteam {
            0%   { transform: translateY(6px); opacity: 0; }
            40%  { opacity: 0.16; }
            100% { transform: translateY(-14px); opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .ybs-fall, .ybs-steam { animation: none; }
            .ybs-steam { opacity: 0.12; }
          }
        `}</style>
      </svg>
    </div>
  );
}
