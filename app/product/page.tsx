import type { Metadata } from "next";
import Link from "next/link";
import MolecularCanvas from "@/components/MolecularCanvas";
import ScrollReveal, { RevealItem } from "@/components/ScrollReveal";
import SectionDivider from "@/components/SectionDivider";
import WaitlistForm from "@/components/WaitlistForm";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "B12 + D3 Nutritional Powder — Ahara",
  description: "A daily powder for vegetarian diets, built around how your body actually absorbs nutrients.",
};

export default function ProductPage() {
  return (
    <>
      {/* SECTION 3.1: HERO */}
      <section className="relative bg-void pt-[72px]" style={{ minHeight: "85vh" }}>
        <MolecularCanvas opacity={0.5} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 flex flex-col gap-8">
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase">AHARA · FORMULA 01</p>
          <h1 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: "clamp(40px, 7vw, 84px)" }}>
            Vitamin B12 + D3<br />Nutritional Powder.
          </h1>
          <p className="font-inter leading-relaxed max-w-[520px]" style={{ color: "rgba(242,237,227,0.72)", fontSize: "19px" }}>
            A daily powder for vegetarian diets, built around how your body actually absorbs nutrients —
            not just what fits on the label.
          </p>

          <div className="flex flex-wrap gap-3">
            {["250µg B12", "1,000 IU D3", "20 SERVINGS", "PLANT-DERIVED D3"].map((chip) => (
              <span
                key={chip}
                className="font-mono text-gold text-xs tracking-widest px-4 py-2 rounded-full border border-gold/50"
              >
                {chip}
              </span>
            ))}
          </div>

          <Link href="#waitlist" className="btn-gold-filled inline-block max-w-max">
            Join the Waitlist for Early Access
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="font-mono text-gold text-[10px] tracking-[0.25em] uppercase">Scroll</p>
          <ChevronDown className="text-gold animate-bounce" size={16} />
        </div>
      </section>

      {/* SECTION 3.2: INGREDIENT BREAKDOWN */}
      <section className="bg-abyss py-[120px]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
          <ScrollReveal>
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-4">FULL INGREDIENT BREAKDOWN</p>
            <h2 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              Every ingredient.<br />Every reason.
            </h2>
            <p className="font-inter mt-4" style={{ color: "rgba(242,237,227,0.70)", fontSize: "17px" }}>
              Nothing in Ahara&apos;s formula is accidental. Six ingredient groups, each with a specific role.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                tag: "THE BASE",
                ingredients: "Sattu · Oat Flour · Jaggery",
                body: "Traditional Indian whole foods that form a high-protein, high-fibre carrier base. Your body already knows how to digest these — which makes them the perfect delivery vehicle.",
              },
              {
                tag: "D3 ABSORPTION PHASE",
                ingredients: "Sesame · Almonds · Groundnut Oil · Sunflower Lecithin",
                body: "Vitamin D3 is fat-soluble — it can't be absorbed without dietary fat. These ingredients create exactly the lipid environment D3 needs to cross from your gut into your bloodstream.",
              },
              {
                tag: "B12 SUPPORT PHASE",
                ingredients: "Inulin · Chicory Root Fibre",
                body: "A natural prebiotic that feeds the specific gut bacteria responsible for B12 uptake. Better gut health = more B12 absorbed.",
              },
              {
                tag: "PLANT COMPOUNDS",
                ingredients: "Blueberry · Cranberry · Apple Peel · Green Tea · Curry Leaves",
                body: "Rich in natural polyphenols that support gut health and the microbiome environment that makes nutrient absorption possible.",
              },
              {
                tag: "ABSORPTION BOOSTERS",
                ingredients: "Turmeric · Black Pepper · Dry Ginger",
                body: "Piperine in black pepper actively increases absorption of multiple nutrients. Turmeric and ginger support digestion across the whole formula. Functional — not decorative.",
              },
              {
                tag: "ACTIVE VITAMINS",
                ingredients: "Vitamin B12 (250µg) · Vitamin D3 (1,000 IU)",
                body: "Precisely dosed actives in forms selected for stability and efficacy. The D3 is lichen-derived — plant-based and suitable for vegetarians and vegans.",
              },
            ].map((card, i) => (
              <RevealItem key={i}>
                <div className="glass-card p-7 flex flex-col gap-4 h-full">
                  <p className="font-mono text-gold text-[11px] tracking-[0.2em]">{card.tag}</p>
                  <p className="font-cormorant text-white text-xl">{card.ingredients}</p>
                  <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.75)" }}>
                    {card.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3.3: HOW TO USE */}
      <section className="bg-cream py-[120px]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
          <ScrollReveal>
            <p className="font-mono text-forest text-xs tracking-[0.2em] uppercase mb-4">DAILY USE</p>
            <h2 className="font-cormorant font-semibold text-forest leading-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
              One serving.<br />Three ways to take it.
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                method: "METHOD 01",
                title: "With Curd or Yogurt",
                body: "Stir one serving into your morning curd. A familiar breakfast, now working harder for you. Blends in completely — no chalky texture.",
              },
              {
                method: "METHOD 02",
                title: "On Warm Khakhra",
                body: "Sprinkle over a warm khakhra. A nutritious midday snack with zero extra effort.",
              },
              {
                method: "METHOD 03",
                title: "With Warm Water",
                body: "Mix with warm water for a quick, clean serving any time of day. Takes 30 seconds.",
              },
            ].map((card, i) => (
              <RevealItem key={i}>
                <div className="p-8 rounded-2xl flex flex-col gap-4" style={{ background: "#2D4A2F", border: "1px solid rgba(196,151,58,0.30)" }}>
                  <span className="font-mono text-gold text-xs tracking-[0.2em]">{card.method}</span>
                  <h3 className="font-cormorant text-cream text-2xl font-light">{card.title}</h3>
                  <p className="font-inter text-cream/75 text-sm leading-relaxed">{card.body}</p>
                </div>
              </RevealItem>
            ))}
          </ScrollReveal>

          {/* Spec box */}
          <ScrollReveal delay={0.2}>
            <div
              className="max-w-md mx-auto p-8 rounded-xl font-mono text-forest text-sm space-y-3"
              style={{ border: "1px solid #2D4A2F", borderRadius: "12px" }}
            >
              {[
                ["SERVING SIZE", "1 serving per day"],
                ["SERVINGS PER BATCH", "20"],
                ["B12 PER SERVING", "250µg"],
                ["D3 PER SERVING", "1,000 IU"],
                ["D3 SOURCE", "Lichen (Plant-Derived)"],
                ["STORAGE", "Airtight container · Away from direct light"],
              ].map(([key, val]) => (
                <div key={key} className="flex justify-between gap-4 border-b border-forest/20 pb-2 last:border-0">
                  <span className="text-forest text-[11px] tracking-wider opacity-70">{key}</span>
                  <span className="text-charcoal text-[12px] text-right">{val}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <SectionDivider />
      </section>

      {/* SECTION 3.4: PRE-LAUNCH CTA */}
      <section
        id="waitlist"
        className="relative py-[120px]"
        style={{ background: "radial-gradient(ellipse at center, rgba(196,151,58,0.07) 0%, transparent 60%), #060D07" }}
      >
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
          <ScrollReveal>
            <h2 className="font-cormorant font-light text-white leading-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Not on shelves yet.<br />But it will be.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-inter text-lg" style={{ color: "rgba(242,237,227,0.70)" }}>
              Join the waitlist to be first.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="w-full">
            <WaitlistForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
