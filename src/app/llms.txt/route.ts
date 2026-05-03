import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/insights/wordpress';
import { llmsTemplate } from '@/data/llmsTemplate';

import fs from 'fs';
import path from 'path';

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

  const blogLinks = allPosts.map(post => `${SITE_URL}/insights/${post.slug}/`).join('\n');

  // Helper to fetch slugs from directory
  const getSlugs = (dirName: string) => {
    try {
      const dirPath = path.join(process.cwd(), 'src/app', dirName);
      if (!fs.existsSync(dirPath)) return [];
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory() && !entry.name.startsWith('[') && !entry.name.startsWith('('))
        .map(entry => entry.name);
    } catch (error) {
      console.error(`Failed to fetch ${dirName} for llms.txt:`, error);
      return [];
    }
  };

  const caseStudyLinks = getSlugs('case-studies').map(slug => `${SITE_URL}/case-studies/${slug}/`).join('\n');
  const intelligenceLinks = getSlugs('intelligence').map(slug => `${SITE_URL}/intelligence/${slug}/`).join('\n');
  const serviceLinks = getSlugs('services').map(slug => `${SITE_URL}/services/${slug}/`).join('\n');
  const industryLinks = getSlugs('industries').map(slug => `${SITE_URL}/industries/${slug}/`).join('\n');

  let content = llmsTemplate;

  // Insert dynamic blog links
  const injectBlogString = `## Insights / Blog\nhttps://agixtech.com/insights/\n${blogLinks}`;
  content = content.replace(/## Insights \/ Blog[\s\S]*?(?=\n## |\n# ============================================================)/, injectBlogString);
  
  // Insert dynamic case study links
  const injectCaseStudyString = `## Case Studies\nhttps://agixtech.com/case-studies/\n${caseStudyLinks}\n`;
  content = content.replace(/## Case Studies[\s\S]*?(?=\n## |\n# ============================================================)/, injectCaseStudyString);

  // Insert dynamic intelligence links
  const injectIntelligenceString = `## Intelligence Pages\n${intelligenceLinks}\n`;
  content = content.replace(/## Intelligence Pages[\s\S]*?(?=\n## |\n# ============================================================)/, injectIntelligenceString);

  // Insert dynamic service links
  const injectServiceString = `## Service Pages\n${serviceLinks}\n`;
  content = content.replace(/## Service Pages[\s\S]*?(?=\n## |\n# ============================================================)/, injectServiceString);

  // Insert dynamic industry links
  const injectIndustryString = `## Industry Pages\n${industryLinks}\n`;
  content = content.replace(/## Industry Pages[\s\S]*?(?=\n## |\n# ============================================================)/, injectIndustryString);

  // Dynamically update Last updated date
  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  content = content.replace(/May 2026/g, currentMonthYear);

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}
