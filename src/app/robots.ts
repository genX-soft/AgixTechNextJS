import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/leads/',
          '/wp-admin/',
          '/wp-login.php/',
          '/internal/',
          '/private/',
        ],
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
          'CCBot',
          'DuckAssistBot',
          'Bytespider',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://agixtech.com/sitemap.xml',
  };
}
