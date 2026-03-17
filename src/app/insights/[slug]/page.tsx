import { Metadata } from 'next';
import { cache } from 'react';
import InsightDetailClient from './insight-detail-client';
import { WPPost } from '@/lib/insights/wordpress';
import { extractFAQsFromContent, FAQData } from '@/lib/insights/faq-utils';

const WP_API_BASE = 'https://cms.agixtech.com/wp-json/wp/v2';
const SITE_URL = 'https://agixtech.com';

const getFullPost = cache(async (slug: string): Promise<WPPost | null> => {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=true`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    const posts = await response.json();
    return posts[0] || null;
  } catch {
    return null;
  }
});

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getFullPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      alternates: { canonical: `${SITE_URL}/insights/${slug}/` },
    };
  }

  const yoast = post.yoast_head_json;
  const title = yoast?.title || stripHtml(post.title.rendered);
  const description =
    yoast?.description || stripHtml(post.excerpt.rendered).slice(0, 160);
  const canonicalUrl = `${SITE_URL}/insights/${slug}/`;
  const ogImage =
    yoast?.og_image?.[0]?.url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    `${SITE_URL}/og-image.png`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: yoast?.og_title || title,
      description: yoast?.og_description || description,
      url: canonicalUrl,
      siteName: 'AGIX Technologies',
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: yoast?.twitter_title || title,
      description: yoast?.twitter_description || description,
      images: [yoast?.twitter_image || ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getFullPost(slug);

  const faqData: FAQData =
    post?.content?.rendered
      ? extractFAQsFromContent(post.content.rendered)
      : { faqs: [], cleanedContent: '' };

  return <InsightDetailClient initialPost={post} initialFaqData={faqData} />;
}
