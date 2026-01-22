import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/insights/wordpress';

const SITE_URL = 'https://agixtech.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/insights/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/case-studies/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/newsroom/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/corporate/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/corporate/contact/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/corporate/careers/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy-policy/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    // Services (new URLs)
    { url: `${SITE_URL}/services/agentic-ai-systems/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/conversational-ai-chatbots/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/ai-voice-agents/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/ai-automation/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/ai-predictive-analytics/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/rag-knowledge-ai/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/ai-computer-vision/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/custom-ai-product-development/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Intelligence (new URLs)
    { url: `${SITE_URL}/intelligence/autonomous-agentic-ai/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/intelligence/conversational-ai/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/intelligence/decision-ai/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/intelligence/enterprise-knowledge-ai/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/intelligence/operational-ai/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Industries (new URLs)
    { url: `${SITE_URL}/industries/fintech-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/industries/healthcare-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/industries/retail-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/industries/edtech-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/industries/real-estate-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/industries/hospitality-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/industries/logistics-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/industries/insurance-ai-solutions/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
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
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getPosts({ perPage: 100 });
    blogPosts = posts.map(post => ({
      url: `${SITE_URL}/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.6
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }

  return [...staticPages, ...caseStudies, ...blogPosts];
}
