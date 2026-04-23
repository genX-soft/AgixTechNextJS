import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/insights/wordpress';

export async function GET(request: Request) {
  const host = request.headers.get('host') || 'agixtech.com';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const SITE_URL = `${protocol}://${host}`;

  try {
    // 1. Fetch first batch to get total count
    const initialFetch = await getPosts({ perPage: 100, page: 1 });
    let allPosts = [...initialFetch.posts];

    // 2. Fetch remaining pages if any
    if (initialFetch.totalPages > 1) {
      for (let i = 2; i <= initialFetch.totalPages; i++) {
        const nextBatch = await getPosts({ perPage: 100, page: i });
        allPosts.push(...nextBatch.posts);
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPosts.map(post => `
  <url>
    <loc>${SITE_URL}/insights/${post.slug}/</loc>
    <lastmod>${new Date(post.modified).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${/* Pagination URLs */ ''}
  ${Array.from({ length: Math.ceil(initialFetch.total / 9) - 1 }, (_, i) => i + 2).map(pageNumber => `
  <url>
    <loc>${SITE_URL}/insights/page/${pageNumber}/</loc>
    <lastmod>${new Date(allPosts[0]?.modified || new Date()).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Failed to generate sitemap-insights:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
