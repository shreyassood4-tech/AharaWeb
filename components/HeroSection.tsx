"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import YogurtBowlScene from "@/components/YogurtBowlScene";
import WaitlistForm from "@/components/WaitlistForm";
import CharacterReveal from "@/components/CharacterReveal";
import MagneticButton from "@/components/MagneticButton";

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

          <div className="flex flex-col gap-3 max-w-[520px]">
            <WaitlistForm variant="hero" />
            <p className="font-mono text-[11px] tracking-widest" style={{ color: "rgba(242,237,227,0.40)" }}>
              Currently in development · Be the first to know
            </p>
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
