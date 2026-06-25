import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MolecularCanvas3D from "@/components/MolecularCanvas3D";
import ScrollReveal, { RevealItem } from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import StatCounter from "@/components/StatCounter";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "The Science Behind the Formula — Ahara",
  description: "Every ingredient in our first product was chosen because peer-reviewed research backs its role in nutrient absorption.",
};

export default function SciencePage() {
  return (
    <>
      {/* SECTION 2.1: HERO */}
      <section className="relative bg-void pt-[72px]" style={{ minHeight: "85vh" }}>
        <MolecularCanvas3D />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-32 flex flex-col gap-8">
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase">THE AHARA SCIENCE</p>
          <h1 className="font-cormorant font-light text-white leading-tight max-w-[700px]" style={{ fontSize: "clamp(40px, 7vw, 90px)" }}>
            We don&apos;t formulate<br />by intuition.<br />We formulate by evidence.
          </h1>
          <p className="font-inter leading-relaxed max-w-[540px]" style={{ color: "rgba(242,237,227,0.72)", fontSize: "19px" }}>
            Every ingredient in our first product was chosen because peer-reviewed research backs its role in
            nutrient absorption. Here&apos;s the thinking behind the formula.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="font-mono text-gold text-[10px] tracking-[0.25em] uppercase">Scroll</p>
          <ChevronDown className="text-gold animate-bounce" size={16} />
        </div>
      </section>

      {/* SECTION 2.2: THE CORE INSIGHT */}
      <section className="bg-abyss py-16 md:py-[120px]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
          <ScrollReveal>
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-4">THE REAL PROBLEM</p>
            <h2 className="font-cormorant font-semibold text-white leading-tight max-w-[680px]" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              Getting a vitamin into a powder is easy. Getting it into your body is where most supplements fail.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-inter leading-relaxed max-w-[640px]" style={{ color: "rgba(242,237,227,0.85)", fontSize: "18px" }}>
              The supplement industry has a habit of measuring success by what goes in — not what gets absorbed.
              A supplement can list 500µg of B12 on the label and still deliver almost none of it, because
              absorption doesn&apos;t happen without the right conditions in your gut.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="font-inter leading-relaxed max-w-[640px]" style={{ color: "rgba(242,237,227,0.85)", fontSize: "18px" }}>
              Ahara starts with a different question: what does the body need around this vitamin for it to move
              from the gut into circulation? Then we build the entire formula around those answers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2.3: THE FOUR PHASES */}
      <section className="bg-void py-16 md:py-[120px]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-12">
          <ScrollReveal className="text-center">
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-4">HOW WE FORMULATE</p>
            <h2 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              A formula built in layers.<br />Each layer earns its place.
            </h2>
            <p className="font-inter mt-4 max-w-[540px] mx-auto" style={{ color: "rgba(242,237,227,0.68)", fontSize: "17px", lineHeight: 1.7 }}>
              Our powder isn&apos;t a blend. It&apos;s a structured formulation with four distinct ingredient phases —
              each doing a specific job.
            </p>
          </ScrollReveal>

          {[
            {
              phase: "PHASE 01 — THE BASE",
              title: "A carrier your body already trusts.",
              body: "Roasted chana (sattu), oat flour, and jaggery form the foundation. High-protein, high-fibre, familiar Indian whole foods that make the powder easy to digest and flexible to use every day.",
              pills: ["SATTU", "OAT FLOUR", "JAGGERY"],
            },
            {
              phase: "PHASE 02 — D3 ABSORPTION",
              title: "Vitamin D3 is fat-soluble. So we give it fat.",
              body: "Your gut can't absorb D3 without dietary fat present. Cold-pressed groundnut oil, sesame seeds, crushed almonds, and sunflower lecithin create the lipid environment D3 needs to pass from the gut into your bloodstream. Most supplements skip this step entirely.",
              pills: ["SESAME", "ALMONDS", "GROUNDNUT OIL", "LECITHIN"],
            },
            {
              phase: "PHASE 03 — B12 SUPPORT",
              title: "Your gut bacteria are the real B12 delivery system.",
              body: "B12 absorption depends on a healthy gut environment. Inulin (a prebiotic fibre from chicory root) feeds the gut bacteria responsible for B12 uptake. Plant compounds from blueberry, cranberry, apple peel, green tea, and curry leaves support that environment further.",
              pills: ["INULIN", "BLUEBERRY", "APPLE PEEL", "GREEN TEA", "CURRY LEAVES", "CRANBERRY"],
            },
            {
              phase: "PHASE 04 — ABSORPTION BOOSTERS",
              title: "Turmeric. Black pepper. Ginger. Not for flavour — for function.",
              body: "Piperine, the active compound in black pepper, is well-documented to significantly increase absorption of multiple nutrients including curcumin from turmeric. Dry ginger supports digestion across the whole formula. These three have been used in Indian medicine for centuries. Now the research backs up why.",
              pills: ["TURMERIC", "BLACK PEPPER", "GINGER"],
            },
          ].map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="w-full">
              <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="flex-1 flex flex-col gap-4">
                  <p className="font-mono text-gold text-[11px] tracking-[0.2em]">{card.phase}</p>
                  <h3 className="font-cormorant font-semibold text-white text-2xl">{card.title}</h3>
                  <p className="font-inter leading-relaxed" style={{ color: "rgba(242,237,227,0.80)", fontSize: "16px" }}>
                    {card.body}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:max-w-[200px] content-start">
                  {card.pills.map((pill) => (
                    <span
                      key={pill}
                      className="font-mono text-[11px] tracking-widest px-3 py-1.5 rounded-full border border-gold/40 text-gold"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SECTION 2.4: THE ACTIVE VITAMINS */}
      <section className="bg-abyss py-16 md:py-[120px]">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-12">THE ACTIVES</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* B12 */}
            <ScrollReveal className="flex flex-col gap-6 pr-0 md:pr-12 py-8">
              <StatCounter target="250" suffix="µg" label="Vitamin B12 per serving" fontSize="clamp(52px, 14vw, 90px)" />
              <p className="font-mono text-gold text-[11px] tracking-[0.2em] text-center">FORM: CYANOCOBALAMIN</p>
              <p className="font-inter text-center leading-relaxed" style={{ color: "rgba(242,237,227,0.80)", fontSize: "16px" }}>
                A stable, well-studied form of B12. At 250µg, we dose well above the daily reference intake —
                because vegetarian diets typically show reduced absorption efficiency, and we&apos;d rather over-deliver
                than under-serve.
              </p>
            </ScrollReveal>

            {/* D3 */}
            <ScrollReveal delay={0.15} className="flex flex-col gap-6 pl-0 md:pl-12 py-8 border-t md:border-t-0 md:border-l border-gold/20">
              <StatCounter target="1" suffix=",000 IU" label="Vitamin D3 per serving" fontSize="clamp(52px, 14vw, 90px)" />
              <p className="font-mono text-gold text-[11px] tracking-[0.2em] text-center">SOURCE: LICHEN · PLANT-DERIVED</p>
              <p className="font-inter text-center leading-relaxed" style={{ color: "rgba(242,237,227,0.80)", fontSize: "16px" }}>
                Most Vitamin D3 supplements are derived from lanolin — a byproduct of sheep&apos;s wool — making them
                unsuitable for strict vegetarians and vegans. Ours comes from lichen, one of the few plant-based
                sources of true D3. 1,000 IU aligns with research-supported daily maintenance doses.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: THE PROCESS */}
      <section className="bg-cream py-16 md:py-[120px]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-12">
          <ScrollReveal className="text-center">
            <p className="font-mono text-forest text-xs tracking-[0.2em] uppercase mb-4">OUR PROCESS</p>
            <h2 className="font-cormorant font-semibold text-forest leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              Led by science.<br />Not by trend.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                step: "STEP 01 — LITERATURE REVIEW",
                title: "We start in the research, not the lab.",
                body: "Our Chief Science Officer reviews peer-reviewed nutritional literature to identify which nutrient forms, doses, and co-factors produce the best absorption outcomes. The research comes first — always.",
              },
              {
                step: "STEP 02 — FORMULATION",
                title: "Every ingredient earns its place.",
                body: "Nothing enters the formula without a clear scientific rationale. We map each ingredient to a specific absorption mechanism, then build the formula around those relationships.",
              },
              {
                step: "STEP 03 — VALIDATION",
                title: "We validate before we commercialise.",
                body: "Internal scientific validation happens before any manufacturing or sales steps. Getting the science right matters more than getting to market fast.",
              },
            ].map((card, i) => (
              <RevealItem key={i}>
                <div className="p-8 rounded-2xl flex flex-col gap-4" style={{ background: "#2D4A2F", border: "1px solid rgba(196,151,58,0.30)" }}>
                  <p className="font-mono text-gold text-[11px] tracking-[0.15em]">{card.step}</p>
                  <h3 className="font-cormorant text-cream text-xl">{card.title}</h3>
                  <p className="font-inter text-cream/75 text-sm leading-relaxed">{card.body}</p>
                </div>
              </RevealItem>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Image src="/AharaSubmark.png" alt="Ahara seal" width={100} height={100} className="rounded-full" />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Link href="/product" className="btn-gold-outline">See the product →</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
