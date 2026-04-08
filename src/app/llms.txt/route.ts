import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/insights/wordpress';
import { llmsTemplate } from '@/data/llmsTemplate';

export const revalidate = 86400; // Cache for 24 hours (86400 seconds)

export async function GET() {
  const SITE_URL = 'https://agixtech.com';
  
  // Fetch posts
  let allPosts: Array<{ slug: string }> = [];
  try {
    const initialFetch = await getPosts({ perPage: 100, page: 1 });
    allPosts = [...initialFetch.posts];
    if (initialFetch.totalPages > 1) {
      for (let i = 2; i <= initialFetch.totalPages; i++) {
        const nextBatch = await getPosts({ perPage: 100, page: i });
        allPosts.push(...nextBatch.posts);
      }
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for llms.txt:', error);
  }

  const blogLinks = allPosts.map(post => `${SITE_URL}/${post.slug}/`).join('\n');

  // Insert dynamic blog links under "## Insights / Blog"
  // The template has:
  // ## Insights / Blog
  // https://agixtech.com/insights/
  
  let content = llmsTemplate;
  const injectString = `## Insights / Blog\nhttps://agixtech.com/insights/\n${blogLinks}`;
  
  // Handle both \r\n and \n just in case
  content = content.replace('## Insights / Blog\r\nhttps://agixtech.com/insights/', injectString);
  content = content.replace('## Insights / Blog\nhttps://agixtech.com/insights/', injectString);

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}
