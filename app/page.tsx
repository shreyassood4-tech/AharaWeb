import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal, { RevealItem } from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import StatCounter from "@/components/StatCounter";
import WaitlistForm from "@/components/WaitlistForm";
import FAQAccordion from "@/components/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/constants";
import { Atom, ArrowUpFromLine, ShieldCheck } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import TypewriterList from "@/components/TypewriterList";

export const metadata: Metadata = {
  title: "Ahara — Science-Backed Nutrition for Vegetarian Diets",
  description: "Most supplements count on dosage. Ahara is built around absorption.",
};

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

const INGREDIENT_LINES = [
  { role: "CARRIER BASE", ingredients: "Sattu · Oat Flour · Jaggery" },
  { role: "D3 ABSORPTION", ingredients: "Sesame · Almonds · Groundnut Oil" },
  { role: "B12 SUPPORT", ingredients: "Inulin · Chicory Root Fibre" },
  { role: "PLANT COMPOUNDS", ingredients: "Blueberry · Apple Peel · Green Tea" },
  { role: "ABSORPTION BOOST", ingredients: "Turmeric · Black Pepper · Ginger" },
  { role: "ACTIVE VITAMINS", ingredients: "B12 (250µg) · D3 (1,000 IU)" },
];

export default function HomePage() {
  return (
    <>
      {/* SECTION 1: HERO — CharacterReveal H1 + Parallax */}
      <HeroSection />

      {/* SECTION 2: THE WAKE-UP CALL */}
      <section className="bg-abyss py-16 md:py-[120px]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-12">THE REALITY</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <ScrollReveal delay={0}>
              <div className="flex flex-col items-center text-center px-8 py-8 border-r border-gold/20 last:border-0">
                <StatCounter target="92" suffix="%" label="of vegans have insufficient Vitamin B12" fontSize="clamp(64px, 8vw, 108px)" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col items-center text-center px-8 py-8 border-r border-gold/20 last:border-0">
                <StatCounter target="1" suffix="B+" label="people worldwide don't get enough Vitamin D" fontSize="clamp(64px, 8vw, 108px)" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col items-center text-center px-8 py-8">
                <span className="font-cormorant font-light text-gold gold-stat leading-none" style={{ fontSize: "clamp(52px, 6vw, 78px)" }}>
                  Most
                </span>
                <p className="font-inter text-cream text-center text-base leading-relaxed max-w-[220px] mt-4" style={{ opacity: 0.85 }}>
                  supplements skip the science of how your body actually absorbs nutrients
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="text-center mt-16 flex flex-col items-center gap-4">
              <p className="font-inter text-center" style={{ color: "rgba(242,237,227,0.70)", fontSize: "17px" }}>
                If you eat plant-based, these numbers describe you — not someone else.
              </p>
              <Link href="/science" className="font-mono text-gold text-sm hover:text-gold-bright transition-colors">
                Read the science →
              </Link>
            </div>
          </ScrollReveal>
        </div>
        <SectionDivider />
      </section>

      {/* SECTION 3: THE PRODUCT GLIMPSE */}
      <section className="grid md:grid-cols-2 min-h-[600px]">
        <div className="bg-void px-8 md:px-16 py-20 flex flex-col justify-center gap-8">
          <ScrollReveal>
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase">FORMULA 01</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-cormorant font-semibold text-white leading-tight" style={{ fontSize: "clamp(28px, 5.5vw, 52px)" }}>
              Real food.<br />Proven science.<br />One daily powder.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2} stagger>
            <div className="flex flex-col sm:flex-row gap-4">
              <RevealItem>
                <TiltCard className="glass-card p-6 flex flex-col gap-1">
                  <span className="font-cormorant text-gold text-4xl font-light">250 µg</span>
                  <span className="font-mono text-cream text-xs tracking-widest">Vitamin B12 per serving</span>
                </TiltCard>
              </RevealItem>
              <RevealItem>
                <TiltCard className="glass-card p-6 flex flex-col gap-1">
                  <span className="font-cormorant text-gold text-4xl font-light">1,000 IU</span>
                  <span className="font-mono text-cream text-xs tracking-widest">Plant-derived D3 per serving</span>
                </TiltCard>
              </RevealItem>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <MagneticButton>
              <Link href="/product" className="btn-gold-outline inline-block">
                Explore the product →
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>

        {/* Ingredient list — Typewriter effect (7E) */}
        <div className="bg-forest px-8 md:px-16 py-20 flex flex-col justify-center gap-6">
          <ScrollReveal>
            <p className="font-mono text-gold text-[11px] tracking-[0.2em] uppercase mb-4">WHAT&apos;S INSIDE</p>
          </ScrollReveal>
          <TypewriterList lines={INGREDIENT_LINES} />
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 4: WHY AHARA IS DIFFERENT */}
      <section className="bg-void py-16 md:py-[120px]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-12">
          <ScrollReveal className="text-center">
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-4">THE APPROACH</p>
            <h2 className="font-cormorant font-light text-white leading-tight max-w-[700px]" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
              We asked a different question.<br />Not &apos;what&apos;s the dose?&apos;<br />But &apos;will the body actually use it?&apos;
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="text-center max-w-[580px]">
            <p className="font-inter text-lg leading-relaxed" style={{ color: "rgba(242,237,227,0.70)", fontSize: "18px" }}>
              Every ingredient in our formula was chosen because it plays a specific role
              in getting these vitamins from the powder into your bloodstream.
              Nothing is there for marketing.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
            <RevealItem>
              <TiltCard className="glass-card p-8 flex flex-col gap-4">
                <Atom className="text-gold" size={32} />
                <h3 className="font-cormorant font-semibold text-white text-xl">Built on research</h3>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.75)" }}>
                  Every formula decision comes from peer-reviewed nutritional science. Our Chief Science Officer
                  reviews the literature before a single ingredient is chosen.
                </p>
              </TiltCard>
            </RevealItem>
            <RevealItem>
              <TiltCard className="glass-card p-8 flex flex-col gap-4">
                <ArrowUpFromLine className="text-gold" size={32} />
                <h3 className="font-cormorant font-semibold text-white text-xl">Designed for absorption</h3>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.75)" }}>
                  We pair vitamins with the co-factors your body needs to actually take them up — the healthy fats
                  and prebiotic fibers that make absorption possible.
                </p>
              </TiltCard>
            </RevealItem>
            <RevealItem>
              <TiltCard className="glass-card p-8 flex flex-col gap-4">
                <ShieldCheck className="text-gold" size={32} />
                <h3 className="font-cormorant font-semibold text-white text-xl">Validated before launch</h3>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.75)" }}>
                  We don&apos;t go to market before going through rigorous internal scientific validation.
                  Speed is never worth getting it wrong.
                </p>
              </TiltCard>
            </RevealItem>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <MagneticButton>
              <Link href="/science" className="btn-gold-outline">See how we do it →</Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
        <SectionDivider />
      </section>

      {/* SECTION: BACKED BY SCIENCE */}
      <section className="bg-void py-16 md:py-[120px]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-12">
          <ScrollReveal className="text-center">
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-4">CREDENTIALS</p>
            <h2 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              Research you can verify.
            </h2>
            <p className="font-inter mt-4 max-w-[580px] mx-auto" style={{ color: "rgba(242,237,227,0.65)", fontSize: "17px", lineHeight: 1.75 }}>
              Ahara&apos;s formula was built through independent scientific research — not guesswork. Here&apos;s the paper trail.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <RevealItem>
              <TiltCard className="glass-card p-8 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-xl font-light leading-none mt-0.5">01</span>
                  <div>
                    <p className="font-mono text-gold text-[11px] tracking-[0.2em] mb-2">PUBLISHED RESEARCH</p>
                    <h3 className="font-cormorant text-white text-xl leading-snug">International Journal of<br />High School Research</h3>
                  </div>
                </div>
                <p className="font-inter text-sm leading-relaxed italic" style={{ color: "rgba(242,237,227,0.72)" }}>
                  &ldquo;A Bioinformatics Study to Develop a Functional Food to Address Vitamin B12 and D3 Deficiency in Vegetarian Diets&rdquo;
                </p>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.55)" }}>
                  Authored and published by Meagan Ghai, Chief Science Officer.
                </p>
              </TiltCard>
            </RevealItem>

            <RevealItem>
              <TiltCard className="glass-card p-8 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-xl font-light leading-none mt-0.5">02</span>
                  <div>
                    <p className="font-mono text-gold text-[11px] tracking-[0.2em] mb-2">GOLD CREST AWARD</p>
                    <h3 className="font-cormorant text-white text-xl leading-snug">British Science Association</h3>
                  </div>
                </div>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
                  A nationally recognised award for independent STEM research requiring 70+ hours of work. Meagan met 13 out of 15 assessment criteria.
                </p>
              </TiltCard>
            </RevealItem>

            <RevealItem>
              <TiltCard className="glass-card p-8 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-xl font-light leading-none mt-0.5">03</span>
                  <div>
                    <p className="font-mono text-gold text-[11px] tracking-[0.2em] mb-2">UNIVERSITY MENTORSHIP</p>
                    <h3 className="font-cormorant text-white text-xl leading-snug">University of Delhi</h3>
                  </div>
                </div>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
                  Research conducted under Nirupma Singh, Department of Biotechnology, Faculty of Technology, University of Delhi.
                </p>
              </TiltCard>
            </RevealItem>

            <RevealItem>
              <TiltCard className="glass-card p-8 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-xl font-light leading-none mt-0.5">04</span>
                  <div>
                    <p className="font-mono text-gold text-[11px] tracking-[0.2em] mb-2">COMPUTATIONAL FORMULATION</p>
                    <h3 className="font-cormorant text-white text-xl leading-snug">Molecular Docking Research</h3>
                  </div>
                </div>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.72)" }}>
                  Formula developed using AutoDock Vina and STRING network analysis to map bioactive compound interactions with B12 and D3 transport proteins.
                </p>
              </TiltCard>
            </RevealItem>
          </ScrollReveal>
        </div>
        <SectionDivider />
      </section>

      {/* SECTION 5: HOW YOU USE IT */}
      <section className="bg-cream py-16 md:py-[120px]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-forest text-xs tracking-[0.2em] uppercase mb-4">SIMPLE BY DESIGN</p>
            <h2 className="font-cormorant font-semibold text-forest leading-tight mb-6" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
              Fits into your morning.<br />No new habits needed.
            </h2>
            <p className="font-inter text-charcoal text-lg max-w-[520px] leading-relaxed" style={{ fontSize: "18px" }}>
              Ahara is designed to work with the food you already eat.
              One serving a day. Three easy ways.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                method: "METHOD 01",
                title: "With Curd or Yogurt",
                body: "Stir into your morning curd. It blends in, boosts your nutrition, and you won't taste the difference.",
              },
              {
                method: "METHOD 02",
                title: "On Warm Khakhra",
                body: "Sprinkle over a khakhra for a midday snack that actually does something for your body.",
              },
              {
                method: "METHOD 03",
                title: "With Warm Water",
                body: "Mix into warm water for the fastest, cleanest way to get your daily serving — anytime.",
              },
            ].map((card, i) => (
              <RevealItem key={i}>
                <TiltCard
                  className="p-8 rounded-2xl flex flex-col gap-4"
                  style={{ background: "#2D4A2F", border: "1px solid rgba(196,151,58,0.30)" }}
                >
                  <span className="font-mono text-gold text-xs tracking-[0.2em]">{card.method}</span>
                  <h3 className="font-cormorant text-cream text-2xl font-light">{card.title}</h3>
                  <p className="font-inter text-cream/75 text-sm leading-relaxed">{card.body}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="mt-10 text-center">
            <p className="font-mono text-forest text-[11px] tracking-[0.2em] uppercase">
              ONE SERVING DAILY · 20 SERVINGS PER BATCH · AIRTIGHT STORAGE
            </p>
          </ScrollReveal>
        </div>
        <SectionDivider />
      </section>

      {/* SECTION 6: WAITLIST CTA */}
      <section
        id="waitlist"
        className="relative py-20 md:py-[160px] bg-void"
        style={{ background: "radial-gradient(ellipse at center, rgba(196,151,58,0.07) 0%, transparent 60%), #060D07" }}
      >
        <CornerMarks />
        <div className="relative z-10 max-w-2xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
          <ScrollReveal>
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase">GET EARLY ACCESS</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: "clamp(28px, 6vw, 72px)" }}>
              Be the first to<br />know when we launch.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-inter text-lg leading-relaxed max-w-[480px]" style={{ color: "rgba(242,237,227,0.70)", fontSize: "19px" }}>
              Join our waitlist for early access, launch updates, and free educational content on nutrition science.
              We&apos;ll only email you things worth reading.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="w-full">
            <WaitlistForm />
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="font-mono text-[11px] tracking-[0.2em]" style={{ color: "rgba(242,237,227,0.30)" }}>
              NO SPAM · UNSUBSCRIBE ANYTIME · WE ONLY SEND THINGS WORTH READING
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="bg-abyss py-16 md:py-[120px]">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-4">QUESTIONS</p>
            <h2 className="font-cormorant font-light text-white mb-12" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              Common questions.
            </h2>
          </ScrollReveal>
          <FAQAccordion items={FAQ_ITEMS as unknown as { question: string; answer: string }[]} />
        </div>
      </section>
    </>
  );
}
