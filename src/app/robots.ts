import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/internal/', '/private/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Perplexity-User',
          'Claude-SearchBot',
          'Claude-User',
        ],
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended'],
        disallow: '/',
      },
    ],
    sitemap: 'https://agixtech.com/sitemap.xml',
  };
}
