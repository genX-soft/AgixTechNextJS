import { Metadata } from 'next';
import { getURLMetadata, getKeywordsArray } from './url-metadata';

const SITE_URL = 'https://agixtech.com';
const SITE_NAME = 'AGIX Technologies';

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image = '/og-image.png',
  noIndex = false,
  keywords = [],
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const canonicalUrl = url.endsWith('/') ? url : `${url}/`;
  
  return {
    title,
    description,
    keywords: [
      'AI automation', 'enterprise AI', 'agentic AI', 'AI systems engineering',
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: image.startsWith('http') ? image : `${SITE_URL}${image}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle || title,
      description: twitterDescription || description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function generateMetadataFromURL(path: string, fallback?: Partial<PageMetadataOptions>): Metadata {
  const urlMeta = getURLMetadata(path);
  
  if (urlMeta) {
    return generatePageMetadata({
      title: urlMeta.metaTitle,
      description: urlMeta.metaDescription,
      path,
      keywords: getKeywordsArray(urlMeta.keywords),
      ogTitle: urlMeta.ogTitle,
      ogDescription: urlMeta.ogDescription,
      twitterTitle: urlMeta.twitterTitle,
      twitterDescription: urlMeta.twitterDescription,
      image: urlMeta.featuredImage || fallback?.image,
      noIndex: fallback?.noIndex,
    });
  }
  
  if (fallback) {
    return generatePageMetadata({
      title: fallback.title || 'AGIX Technologies',
      description: fallback.description || 'Enterprise AI solutions',
      path,
      ...fallback,
    });
  }
  
  return generatePageMetadata({
    title: 'AGIX Technologies',
    description: 'Enterprise AI systems engineering and agentic intelligence solutions.',
    path,
  });
}

export function generateServiceMetadata(serviceName: string, description: string, path: string): Metadata {
  return generatePageMetadata({
    title: `${serviceName} - Enterprise AI Solutions`,
    description,
    path,
    keywords: [serviceName.toLowerCase(), 'AI services', 'enterprise solutions'],
  });
}

export function generateIndustryMetadata(industryName: string, description: string, path: string): Metadata {
  return generatePageMetadata({
    title: `AI Solutions for ${industryName} Industry`,
    description,
    path,
    keywords: [industryName.toLowerCase(), 'industry AI', 'sector solutions'],
  });
}

export function generateCaseStudyMetadata(companyName: string, description: string, path: string): Metadata {
  return generatePageMetadata({
    title: `${companyName} Case Study - AI Implementation Success`,
    description,
    path,
    keywords: [companyName.toLowerCase(), 'case study', 'AI implementation'],
  });
}

export function generateBlogPostMetadata(
  title: string,
  description: string,
  slug: string,
  image?: string,
  publishedTime?: string,
  author?: string
): Metadata {
  const canonicalUrl = `${SITE_URL}/${slug}/`;
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime,
      authors: author ? [author] : ['AGIX Team'],
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
