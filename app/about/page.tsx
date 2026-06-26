import type { Metadata } from "next";
import Link from "next/link";
import MolecularCanvas from "@/components/MolecularCanvas";
import ScrollReveal, { RevealItem } from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import WaitlistForm from "@/components/WaitlistForm";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "About Ahara — Where Science Meets Strategy",
  description: "Translating nutritional science into products people can actually use.",
};

export default function AboutPage() {
  return (
    <>
      {/* SECTION 4.1: HERO */}
      <section className="relative pt-[72px]" style={{ minHeight: "85vh", background: "#1C1410" }}>
        <MolecularCanvas />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-32 flex flex-col gap-8">
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase">ABOUT AHARA</p>
          <h1
            className="font-cormorant font-light text-white leading-tight max-w-[800px]"
            style={{ fontSize: "clamp(36px, 6vw, 84px)" }}
          >
            The gap between nutritional science and accessible nutrition products is a problem worth solving.
          </h1>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="font-mono text-gold text-[10px] tracking-[0.25em] uppercase">Scroll</p>
          <ChevronDown className="text-gold animate-bounce" size={16} />
        </div>
      </section>

      {/* SECTION 4.2: FOUNDERS */}
      <section className="bg-abyss py-16 md:py-[120px]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
          <ScrollReveal>
            <p className="font-mono text-forest text-xs tracking-[0.2em] uppercase mb-4">THE TEAM</p>
            <h2 className="font-cormorant font-semibold text-charcoal" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
              Science meets strategy.
            </h2>
            <p className="font-inter mt-4 max-w-[580px]" style={{ color: "rgba(26,26,26,0.72)", fontSize: "18px", lineHeight: 1.75 }}>
              Ahara was started by two people who believe that the science of nutrition is too important to stay
              locked in academic papers — and too serious to be left to marketing.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealItem>
              <div className="glass-card p-8 flex flex-col gap-6">
                <div className="w-[72px] h-[72px] rounded-full bg-gold flex items-center justify-center">
                  <span className="font-cormorant text-charcoal text-2xl font-semibold">SS</span>
                </div>
                <div>
                  <h3 className="font-cormorant text-charcoal text-2xl font-semibold">Shreyas Sood</h3>
                  <p className="font-mono text-gold text-[11px] tracking-[0.2em] mt-1">CO-FOUNDER &amp; CEO</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["STRATEGY", "BRAND", "CUSTOMER DISCOVERY", "GROWTH", "PARTNERSHIPS"].map((tag) => (
                    <span key={tag} className="font-mono text-gold text-[10px] tracking-wider px-3 py-1 rounded-full border border-gold/40">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.74)" }}>
                  Leads business strategy, customer discovery, brand development, and market research. Focused on
                  building Ahara from the ground up — with commercial rigour and a long-term vision for what
                  evidence-based nutrition can look like.
                </p>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="glass-card p-8 flex flex-col gap-6">
                <div className="w-[72px] h-[72px] rounded-full bg-forest flex items-center justify-center">
                  <span className="font-cormorant text-gold text-2xl font-semibold">MG</span>
                </div>
                <div>
                  <h3 className="font-cormorant text-charcoal text-2xl font-semibold">Meagan Ghai</h3>
                  <p className="font-mono text-gold text-[11px] tracking-[0.2em] mt-1">CO-FOUNDER &amp; CHIEF SCIENCE OFFICER</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["RESEARCH", "FORMULATION", "VALIDATION", "LITERATURE REVIEW"].map((tag) => (
                    <span key={tag} className="font-mono text-gold text-[10px] tracking-wider px-3 py-1 rounded-full border border-gold/40">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.74)" }}>
                  Leads all scientific research, product formulation, and literature review. Developed Ahara&apos;s formula through an independent research project mentored by the Department of Biotechnology, University of Delhi.
                </p>
                <div className="flex flex-col gap-2 pt-2 border-t border-gold/20">
                  <p className="font-mono text-gold text-[10px] tracking-[0.15em]">GOLD CREST AWARD — British Science Association</p>
                  <p className="font-mono text-charcoal/50 text-[10px] tracking-[0.1em]">Published · International Journal of High School Research</p>
                  <p className="font-mono text-charcoal/50 text-[10px] tracking-[0.1em]">Mentored · University of Delhi, Dept. of Biotechnology</p>
                </div>
              </div>
            </RevealItem>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4.3: MISSION */}
      <section className="bg-cream py-16 md:py-[120px]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
          <ScrollReveal>
            <h2 className="font-cormorant font-light text-forest leading-tight max-w-[700px]" style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
              Translating nutritional science into products people can actually use.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-inter text-charcoal max-w-[560px] leading-relaxed" style={{ fontSize: "19px" }}>
              Ahara exists to bridge the gap between academic research and everyday health decisions. We believe
              evidence-based nutrition shouldn&apos;t be expensive, complicated, or exclusive. We&apos;re building a portfolio
              of products that are validated, accessible, and rooted in real science.
            </p>
          </ScrollReveal>
        </div>
        <SectionDivider />
      </section>

      {/* SECTION 4.4: WHAT'S COMING */}
      <section className="bg-abyss py-16 md:py-[120px]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-10 text-center">
          <ScrollReveal>
            <p className="font-mono text-forest text-xs tracking-[0.2em] uppercase mb-4">WHAT&apos;S NEXT</p>
            <h2 className="font-cormorant font-light text-charcoal leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              B12 + D3 is just the beginning.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-inter max-w-[560px] leading-relaxed" style={{ color: "rgba(26,26,26,0.72)", fontSize: "18px" }}>
              Ahara&apos;s vision is a portfolio of products addressing the most common nutrient gaps in Indian
              vegetarian diets — each one built to the same standard as our first.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger delay={0.15} className="flex flex-wrap justify-center gap-3">
            {["IRON SUPPORT", "WOMEN'S HEALTH", "CHILDREN'S NUTRITION", "DAILY WELLNESS", "FUNCTIONAL NUTRITION"].map((pill) => (
              <RevealItem key={pill}>
                <span
                  className="font-mono text-gold text-xs tracking-[0.15em] px-5 py-3 rounded-full border border-gold/50 hover:border-gold hover:shadow-[0_0_16px_rgba(196,151,58,0.3)] transition-all duration-200 cursor-default"
                >
                  {pill}
                </span>
              </RevealItem>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-inter text-center" style={{ color: "rgba(26,26,26,0.65)", fontSize: "16px" }}>
              Every future product will follow the same approach: research before formulation,
              absorption before dosage, validation before launch.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4.5: FINAL CTA */}
      <section
        className="relative py-16 md:py-[120px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(196,151,58,0.10) 0%, transparent 60%), #1C1410" }}
      >
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
          <ScrollReveal>
            <h2 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Come build this with us.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-inter" style={{ color: "rgba(242,237,227,0.70)", fontSize: "18px" }}>
              Join the waitlist or reach out directly.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#waitlist" className="btn-gold-filled">Join the Waitlist</Link>
              <a href="mailto:hello@ahara.co" className="btn-gold-outline">Get in Touch</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <a href="mailto:hello@ahara.co" className="font-mono text-gold text-xs tracking-widest hover:text-gold-bright transition-colors">
              hello@ahara.co
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.35} className="w-full">
            <WaitlistForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
