import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleContent } from "@/lib/research";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getArticleContent(slug);
  if (!data) return {};
  return {
    title: `${data.meta.title} — Ahara Research`,
    description: data.meta.summary,
  };
}

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

/** Very simple markdown → HTML converter for our content (headings, paragraphs, lists) */
function renderMarkdown(md: string): string {
  return md
    .trim()
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="font-cormorant font-semibold text-white leading-tight mt-10 mb-4" style="font-size:28px">$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="font-cormorant font-semibold text-white leading-tight mt-8 mb-3" style="font-size:22px">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Ordered list items (must run before paragraph)
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal">$1</li>')
    // Wrap consecutive <li> in <ol>
    .replace(/(<li[\s\S]*?<\/li>\n?)+/g, (m) => `<ol class="flex flex-col gap-2 my-4 font-inter" style="color:rgba(242,237,227,0.80);font-size:17px;line-height:1.8">${m}</ol>`)
    // Blank lines between blocks
    .replace(/\n{2,}/g, '\n\n')
    // Paragraphs: lines not starting with < and not blank
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return trimmed;
      return `<p class="font-inter" style="color:rgba(242,237,227,0.80);font-size:17px;line-height:1.8">${trimmed}</p>`;
    })
    .join('\n');
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = getArticleContent(slug);
  if (!data) notFound();

  const { meta, content } = data;
  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen pt-[72px]" style={{ background: "#060D07" }}>
      <div className="max-w-[680px] mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/research"
          className="font-mono text-gold text-xs tracking-widest hover:text-gold-bright transition-colors"
        >
          ← BACK TO RESEARCH
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-6 mt-10 mb-8">
          <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(196,151,58,0.70)" }}>
            {meta.readTime}
          </span>
          <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(242,237,227,0.35)" }}>
            {formatDate(meta.date)}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-cormorant font-light text-white leading-tight mb-8"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          {meta.title}
        </h1>

        {/* Summary */}
        <p
          className="font-inter mb-12 pb-12"
          style={{
            color: "rgba(242,237,227,0.65)",
            fontSize: "20px",
            lineHeight: 1.7,
            borderBottom: "1px solid rgba(196,151,58,0.12)",
          }}
        >
          {meta.summary}
        </p>

        {/* Body */}
        <div
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          className="flex flex-col gap-1"
        />

        {/* Back bottom */}
        <div
          className="mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(196,151,58,0.12)" }}
        >
          <Link
            href="/research"
            className="font-mono text-gold text-xs tracking-widest hover:text-gold-bright transition-colors"
          >
            ← BACK TO RESEARCH
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-6">
              RELATED ARTICLES
            </p>
            <div className="flex flex-col gap-4">
              {related.map((a) => (
                <Link key={a.slug} href={`/research/${a.slug}`}>
                  <div className="glass-card p-6 group">
                    <p className="font-mono text-[11px] tracking-widest mb-2" style={{ color: "rgba(196,151,58,0.70)" }}>
                      {a.readTime}
                    </p>
                    <h3 className="font-cormorant text-white text-xl font-semibold group-hover:text-gold transition-colors">
                      {a.title}
                    </h3>
                    <p className="font-inter text-sm mt-2" style={{ color: "rgba(242,237,227,0.60)" }}>
                      {a.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
