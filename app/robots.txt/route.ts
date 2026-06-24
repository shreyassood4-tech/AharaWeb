import { NextResponse } from 'next/server';

export function GET() {
  return new NextResponse(
    `User-agent: *\nAllow: /\n\nSitemap: https://ahara.co/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
