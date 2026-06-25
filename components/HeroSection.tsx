"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import MolecularCanvas from "@/components/MolecularCanvas";
import MolecularGlobe3D from "@/components/MolecularGlobe3D";
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

  // MolecularCanvas: slower than page (moves down less)
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Hero headline: counter-scroll (moves up)
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center bg-void pt-[72px]" style={{ overflow: "hidden" }}>
      <motion.div style={{ y: canvasY }} className="absolute inset-0">
        <MolecularCanvas />
      </motion.div>
      <CornerMarks />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">
        <motion.div className="flex flex-col gap-8" style={{ y: headlineY }}>
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase">
            EST. 2025 · NUTRACEUTICAL RESEARCH · INDIA
          </p>

          <div style={{ fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1.1 }}>
            <CharacterReveal
              className="font-cormorant font-light text-white leading-tight"
              style={{ fontSize: "clamp(44px, 7vw, 88px)" }}
            >
              Your body deserves more than a guess.
            </CharacterReveal>
          </div>

          <p className="font-inter text-lg leading-relaxed max-w-[520px]" style={{ color: "rgba(242,237,227,0.75)", fontSize: "19px" }}>
            Most supplements count on dosage.<br />
            Ahara is built around absorption —<br />
            the science of actually getting nutrients<br />
            from the powder into your bloodstream.
          </p>

          <div className="flex flex-col gap-3 max-w-[520px]">
            <WaitlistForm variant="hero" />
            <p className="font-mono text-[11px] tracking-widest" style={{ color: "rgba(242,237,227,0.40)" }}>
              Currently in development · Be the first to know
            </p>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center justify-center relative" style={{ height: "520px" }}>
          <MolecularGlobe3D />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="font-mono text-gold text-[10px] tracking-[0.25em] uppercase">Scroll</p>
        <ChevronDown className="text-gold animate-bounce" size={16} />
      </div>
    </section>
  );
}
