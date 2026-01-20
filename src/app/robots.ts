import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/tools/',
          '/_next/',
          '/404/',
        ],
      },
    ],
    sitemap: 'https://agixtech.com/sitemap.xml',
    host: 'https://agixtech.com',
  };
}
