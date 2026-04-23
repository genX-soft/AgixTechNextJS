import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// SITE_URL will be determined dynamically in GET


export async function GET(request: Request) {
  const host = request.headers.get('host') || 'agixtech.com';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const SITE_URL = `${protocol}://${host}`;
  const caseStudiesDir = path.join(process.cwd(), 'src/app/case-studies');
  const entries = fs.readdirSync(caseStudiesDir, { withFileTypes: true });
  
  const slugs = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${slugs.map(slug => {
    const filePath = path.join(caseStudiesDir, slug, 'page.tsx');
    let lastmod = new Date().toISOString();
    try {
      if (fs.existsSync(filePath)) {
        lastmod = fs.statSync(filePath).mtime.toISOString();
      }
    } catch (e) {
      // Fallback to current date
    }

    return `
  <url>
    <loc>${SITE_URL}/case-studies/${slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
