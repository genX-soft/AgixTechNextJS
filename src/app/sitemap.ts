import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/insights/wordpress';

const SITE_URL = 'https://agixtech.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/insights/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/case-studies/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/corporate/about/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/corporate/contact/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/corporate/careers/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.3 },
    // Services
    { url: `${SITE_URL}/services/agentic-ai-systems/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services/conversational-ai-chatbots/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services/ai-voice-agents/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services/ai-automation/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services/ai-predictive-analytics/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services/rag-knowledge-ai/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services/ai-computer-vision/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services/custom-ai-product-development/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    // Intelligence
    { url: `${SITE_URL}/intelligence/autonomous-agentic-ai/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/intelligence/conversational-ai/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/intelligence/decision-ai/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/intelligence/enterprise-knowledge-ai/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/intelligence/operational-ai/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    // Industries
    { url: `${SITE_URL}/industries/fintech-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industries/healthcare-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industries/retail-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industries/edtech-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industries/real-estate-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industries/hospitality-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industries/logistics-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/industries/insurance-ai-solutions/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const caseStudies: MetadataRoute.Sitemap = [
    'enova', 'dave', 'ocrolus', 'babylon-health', 'kite-therapy', 'hello-driven',
    'albertsons', 'kroger', 'stitch-fix', 'ulta-beauty', 'quizlet', 'knewton',
    'riiid-labs', 'hilton-hotels', 'housecanary', 'mindtrip', 'polyai', 'brainfish',
    'properti-ai', 'dartmouth-college', 'suno', 'innit', 'hungryroot', 'navan',
    'geovea', 'luxury-escapes', 'naratix', 'alphasense'
  ].map(slug => ({
    url: `${SITE_URL}/case-studies/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  let blogPosts: MetadataRoute.Sitemap = [];
  let insightsPagination: MetadataRoute.Sitemap = [];

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

    blogPosts = allPosts.map(post => ({
      url: `${SITE_URL}/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'daily' as const,
      priority: 0.8
    }));

    // 3. Generate pagination for insights (9 posts per page as per insights/page.tsx)
    const totalInsightsPages = Math.ceil(initialFetch.total / 9);
    for (let i = 2; i <= totalInsightsPages; i++) {
        insightsPagination.push({
            url: `${SITE_URL}/insights/page/${i}/`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.6
        });
    }

  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }

  return [...staticPages, ...caseStudies, ...blogPosts, ...insightsPagination];
}
