"use client";

import { useState, useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "The only product that actually worked for me.",
    author: "Priya M.",
    location: "Delhi",
  },
  {
    quote: "Finally something that fits into my morning without a fuss. My levels improved in 8 weeks.",
    author: "Ravi K.",
    location: "Bangalore",
  },
  {
    quote: "I've tried so many supplements. This is the first one I trust — the science makes sense.",
    author: "Anika S.",
    location: "Mumbai",
  },
  {
    quote: "My B12 was always low no matter what I took. Nothing made a dent until Ahara.",
    author: "Deepa R.",
    location: "Hyderabad",
  },
  {
    quote: "You can feel the difference. It's not just a supplement, it's a proper formula.",
    author: "Suresh T.",
    location: "Chennai",
  },
];

const INTERVAL = 4800;

function StarRow() {
  return (
    <div className="flex items-center gap-1" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#C4973A" aria-hidden="true">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(next);
      setVisible(true);
    }, 350);
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      advance((current + 1) % TESTIMONIALS.length);
    }, INTERVAL);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [current]);

  const goTo = (i: number) => {
    if (i === current) return;
    if (timer.current) clearInterval(timer.current);
    advance(i);
  };

  const t = TESTIMONIALS[current];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-6">
      <StarRow />

      <div
        style={{
          transition: "opacity 0.35s ease, transform 0.35s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          textAlign: "center",
        }}
      >
        <blockquote
          className="font-cormorant font-light text-white leading-snug"
          style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <cite className="not-italic font-mono text-gold text-xs tracking-[0.18em]">
          — {t.author}, {t.location}
        </cite>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "24px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "#C4973A" : "rgba(196,151,58,0.30)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.35s ease, background 0.35s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
