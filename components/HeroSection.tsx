"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import YogurtBowlScene from "@/components/YogurtBowlScene";
import CharacterReveal from "@/components/CharacterReveal";
import MagneticButton from "@/components/MagneticButton";

const QUOTES = [
  { text: "The only product that actually worked for me.", author: "Priya M., Delhi" },
  { text: "My B12 was always low — nothing made a dent until this.", author: "Ravi K., Bangalore" },
  { text: "Finally something that fits into my morning without a fuss.", author: "Anika S., Mumbai" },
  { text: "You can feel the difference. It's a proper formula.", author: "Deepa R., Hyderabad" },
  { text: "I've tried so many supplements. This is the first one I trust.", author: "Suresh T., Chennai" },
];

function HeroTestimonial() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % QUOTES.length);
        setShow(true);
      }, 300);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const q = QUOTES[idx];
  return (
    <div className="flex flex-col gap-2 pt-1">
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#C4973A" aria-hidden="true">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
      <div
        style={{
          transition: "opacity 0.3s ease",
          opacity: show ? 1 : 0,
        }}
      >
        <p className="font-inter italic" style={{ fontSize: "13px", color: "rgba(242,237,227,0.65)", lineHeight: 1.5 }}>
          &ldquo;{q.text}&rdquo;
        </p>
        <p className="font-mono" style={{ fontSize: "10px", color: "rgba(196,151,58,0.70)", letterSpacing: "0.12em", marginTop: "4px" }}>
          — {q.author}
        </p>
      </div>
    </div>
  );
}

function CornerMarks() {
  return (
    <>
      <div className="absolute top-8 left-8 pointer-events-none" aria-hidden="true">
        <div className="w-7 h-px bg-gold" style={{ opacity: 0.15 }} />
        <div className="w-px h-7 bg-gold mt-0" style={{ opacity: 0.15 }} />
      </div>
      <div className="absolute top-8 right-8 pointer-events-none" aria-hidden="true">
        <div className="w-7 h-px bg-gold ml-auto" style={{ opacity: 0.15 }} />
        <div className="w-px h-7 bg-gold ml-auto" style={{ opacity: 0.15 }} />
      </div>
      <div className="absolute bottom-8 left-8 pointer-events-none" aria-hidden="true">
        <div className="w-px h-7 bg-gold" style={{ opacity: 0.15 }} />
        <div className="w-7 h-px bg-gold" style={{ opacity: 0.15 }} />
      </div>
      <div className="absolute bottom-8 right-8 pointer-events-none" aria-hidden="true">
        <div className="w-px h-7 bg-gold ml-auto" style={{ opacity: 0.15 }} />
        <div className="w-7 h-px bg-gold ml-auto" style={{ opacity: 0.15 }} />
      </div>
    </>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero headline: counter-scroll (moves up)
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-[72px]" style={{ overflow: "hidden", background: "#1C1410" }}>
      <CornerMarks />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
        <motion.div className="flex flex-col gap-8" style={{ y: headlineY }}>
          <p className="font-mono text-gold text-xs tracking-[0.12em] md:tracking-[0.2em] uppercase">
            <span className="hidden sm:inline">EST. 2026 · NUTRACEUTICAL RESEARCH · INDIA</span>
            <span className="sm:hidden">EST. 2026 · INDIA</span>
          </p>

          <div style={{ fontSize: "clamp(28px, 7.5vw, 60px)", lineHeight: 1.1 }}>
            <CharacterReveal
              className="font-cormorant font-light text-white leading-tight"
              style={{ fontSize: "clamp(28px, 7.5vw, 60px)" }}
            >
              Nutrients that actually reach you.
            </CharacterReveal>
          </div>

          <p className="font-inter text-lg leading-relaxed max-w-[520px]" style={{ color: "rgba(242,237,227,0.75)", fontSize: "19px" }}>
            Most supplements measure success by what goes in.
            We measure it by what gets absorbed.
          </p>

          <div className="flex flex-col gap-5 max-w-[480px]">
            <MagneticButton>
              <Link href="#waitlist" className="btn-gold-filled inline-block">
                Join the Waitlist
              </Link>
            </MagneticButton>
            <HeroTestimonial />
          </div>
        </motion.div>

        <div className="hidden md:flex items-center justify-center relative" style={{ height: "520px" }}>
          <YogurtBowlScene />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="font-mono text-gold text-[10px] tracking-[0.25em] uppercase">Scroll</p>
        <ChevronDown className="text-gold animate-bounce" size={16} />
      </div>
    </section>
  );
}
