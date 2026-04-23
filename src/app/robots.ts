import { MetadataRoute } from 'next';
import { headers } from 'next/headers';


export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || 'agixtech.com';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const SITE_URL = `${protocol}://${host}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/wp-admin/',
          '/wp-login.php/',
          '/internal/',
          '/private/',
        ],
      },
      {
        userAgent: ['CCBot', 'Bytespider'],
        disallow: '/',
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'GPTBot',
          'ClaudeBot',
          'Google-Extended',
          'PerplexityBot',
          'Perplexity-User',
          'Claude-SearchBot',
          'Claude-User',
          'anthropic-ai',
          'meta-externalagent',
          'cohere-ai',
          'YouBot',
          'DuckAssistBot',
          'YouBot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
