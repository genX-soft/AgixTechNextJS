import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// SITE_URL will be determined dynamically in GET


interface StaticPage {
  url: string;
  filePath: string;
  priority: number;
  changeFrequency: string;
}

const staticPages: StaticPage[] = [
  { url: '/', filePath: 'src/app/page.tsx', priority: 1.0, changeFrequency: 'weekly' },
  { url: '/insights/', filePath: 'src/app/insights/page.tsx', priority: 0.9, changeFrequency: 'daily' },
  { url: '/case-studies/', filePath: 'src/app/case-studies/page.tsx', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/corporate/about/', filePath: 'src/app/corporate/about/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/corporate/contact/', filePath: 'src/app/corporate/contact/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/corporate/careers/', filePath: 'src/app/corporate/careers/page.tsx', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/pricing/', filePath: 'src/app/pricing/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/privacy-policy/', filePath: 'src/app/privacy-policy/page.tsx', priority: 0.3, changeFrequency: 'weekly' },
  { url: '/terms-of-service/', filePath: 'src/app/terms-of-service/page.tsx', priority: 0.3, changeFrequency: 'weekly' },
  // Services
  { url: '/services/agentic-ai-systems/', filePath: 'src/app/services/agentic-ai-systems/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/conversational-ai-chatbots/', filePath: 'src/app/services/conversational-ai-chatbots/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/ai-voice-agents/', filePath: 'src/app/services/ai-voice-agents/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/ai-automation/', filePath: 'src/app/services/ai-automation/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/ai-predictive-analytics/', filePath: 'src/app/services/ai-predictive-analytics/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/rag-knowledge-ai/', filePath: 'src/app/services/rag-knowledge-ai/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/ai-computer-vision/', filePath: 'src/app/services/ai-computer-vision/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/services/custom-ai-product-development/', filePath: 'src/app/services/custom-ai-product-development/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  // Intelligence
  { url: '/intelligence/autonomous-agentic-ai/', filePath: 'src/app/intelligence/autonomous-agentic-ai/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/intelligence/conversational-ai/', filePath: 'src/app/intelligence/conversational-ai/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/intelligence/decision-ai/', filePath: 'src/app/intelligence/decision-ai/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/intelligence/enterprise-knowledge-ai/', filePath: 'src/app/intelligence/enterprise-knowledge-ai/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/intelligence/operational-ai/', filePath: 'src/app/intelligence/operational-ai/page.tsx', priority: 0.9, changeFrequency: 'weekly' },
  // Industries
  { url: '/industries/fintech-ai-solutions/', filePath: 'src/app/industries/fintech-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industries/healthcare-ai-solutions/', filePath: 'src/app/industries/healthcare-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industries/retail-ai-solutions/', filePath: 'src/app/industries/retail-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industries/edtech-ai-solutions/', filePath: 'src/app/industries/edtech-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industries/real-estate-ai-solutions/', filePath: 'src/app/industries/real-estate-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industries/hospitality-ai-solutions/', filePath: 'src/app/industries/hospitality-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industries/logistics-ai-solutions/', filePath: 'src/app/industries/logistics-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/industries/insurance-ai-solutions/', filePath: 'src/app/industries/insurance-ai-solutions/page.tsx', priority: 0.8, changeFrequency: 'weekly' },
];

function getFileLastMod(filePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const stats = fs.statSync(fullPath);
    return stats.mtime.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

export async function GET(request: Request) {
  const host = request.headers.get('host') || 'agixtech.com';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const SITE_URL = `${protocol}://${host}`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${getFileLastMod(page.filePath)}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
