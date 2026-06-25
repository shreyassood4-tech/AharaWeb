import fs from "fs";
import path from "path";

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/research");

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^"(.*)"$/, "$1");
    result[key] = value;
  }
  return result;
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const fm = parseFrontmatter(raw);
    return {
      slug,
      title: fm.title ?? slug,
      summary: fm.summary ?? "",
      date: fm.date ?? "",
      readTime: fm.readTime ?? "",
    };
  });
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getArticleContent(slug: string): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const fm = parseFrontmatter(raw);
  const content = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
  return {
    meta: {
      slug,
      title: fm.title ?? slug,
      summary: fm.summary ?? "",
      date: fm.date ?? "",
      readTime: fm.readTime ?? "",
    },
    content,
  };
}
