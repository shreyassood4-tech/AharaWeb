import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research & Insights — Ahara",
  description: "The science behind Ahara's approach to nutrition for vegetarian diets.",
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function ResearchPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen pt-[72px]" style={{ background: "#060D07" }}>
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-6">
          RESEARCH & INSIGHTS
        </p>
        <h1
          className="font-cormorant font-light text-white leading-tight"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          The science behind<br />the nutrition.
        </h1>
        <p
          className="font-inter mt-6 max-w-[540px] leading-relaxed"
          style={{ color: "rgba(242,237,227,0.65)", fontSize: "18px" }}
        >
          We write plainly about what we know, what the research says, and why
          it shaped every decision in our formula.
        </p>
      </div>

      {/* Credentials */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="border-t border-gold/15 pt-16">
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-10">BACKED BY</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                n: "01",
                tag: "PUBLISHED RESEARCH",
                title: "International Journal of High School Research",
                body: "\"A Bioinformatics Study to Develop a Functional Food to Address Vitamin B12 and D3 Deficiency in Vegetarian Diets\" — authored and published by Meagan Ghai, Chief Science Officer.",
              },
              {
                n: "02",
                tag: "GOLD CREST AWARD",
                title: "British Science Association",
                body: "A nationally recognised award for independent STEM research requiring 70+ hours of work. Meagan met 13 out of 15 assessment criteria.",
              },
              {
                n: "03",
                tag: "UNIVERSITY MENTORSHIP",
                title: "University of Delhi",
                body: "Research conducted under Nirupma Singh, Department of Biotechnology, Faculty of Technology, University of Delhi.",
              },
              {
                n: "04",
                tag: "COMPUTATIONAL FORMULATION",
                title: "Molecular Docking Research",
                body: "Formula developed using AutoDock Vina and STRING network analysis to map bioactive compound interactions with B12 and D3 transport proteins.",
              },
            ].map((c) => (
              <div key={c.n} className="glass-card p-7 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-lg font-light leading-none mt-0.5 opacity-60">{c.n}</span>
                  <div>
                    <p className="font-mono text-gold text-[10px] tracking-[0.2em] mb-1.5">{c.tag}</p>
                    <h3 className="font-cormorant text-white text-lg leading-snug">{c.title}</h3>
                  </div>
                </div>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.65)" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article grid */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-8">ARTICLES</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/research/${article.slug}`}>
              <div
                className="group glass-card p-8 flex flex-col gap-4 h-full cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="font-mono text-[11px] tracking-widest"
                    style={{ color: "rgba(196,151,58,0.70)" }}
                  >
                    {article.readTime}
                  </span>
                  <span
                    className="font-mono text-[11px] tracking-widest"
                    style={{ color: "rgba(242,237,227,0.30)" }}
                  >
                    {formatDate(article.date)}
                  </span>
                </div>

                <h2 className="font-cormorant font-semibold text-white text-2xl leading-tight group-hover:text-gold transition-colors duration-200">
                  {article.title}
                </h2>

                <p
                  className="font-inter text-sm leading-relaxed flex-1"
                  style={{ color: "rgba(242,237,227,0.65)" }}
                >
                  {article.summary}
                </p>

                <span className="font-mono text-gold text-xs tracking-widest group-hover:text-gold-bright transition-colors duration-200">
                  READ →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
