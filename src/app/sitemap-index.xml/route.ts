import { NextResponse } from 'next/server';

// SITE_URL will be determined dynamically in GET


export async function GET(request: Request) {
  const host = request.headers.get('host') || 'agixtech.com';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const SITE_URL = `${protocol}://${host}`;
  const now = new Date().toISOString();
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-insights.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-case-studies.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
