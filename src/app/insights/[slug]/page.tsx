import { Metadata } from 'next';
import { cache } from 'react';
import BlogDetailClient from './blog-detail-client';
import { WPPost } from '@/lib/insights/wordpress';
import { extractFAQsFromContent, FAQData } from '@/lib/insights/faq-utils';
import { getRelatedServices, ServiceLink } from '@/lib/insights/service-mapping';
import { injectInlineServiceLinks } from '@/lib/insights/inject-links';
import { extractQuickAnswer } from '@/components/blog-quick-answer';
import Schema from '@/components/Schema';

const WP_API_BASE = 'https://cms.agixtech.com/wp-json/wp/v2';
const SITE_URL = 'https://agixtech.com';

// Removed time-based revalidation, using on-demand ISR with cache tags instead

const getFullPost = cache(async (slug: string): Promise<WPPost | null> => {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=true`,
      { next: { tags: ['wordpress-posts'] } }
    );
    if (!response.ok) return null;
    const posts = await response.json();
    return posts[0] || null;
  } catch {
    return null;
  }
});

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs: string[] = [];
    let page = 1;

    while (true) {
      const response = await fetch(
        `${WP_API_BASE}/posts?per_page=100&page=${page}&status=publish&_fields=slug,type`,
        { next: { tags: ['wordpress-posts'] } }
      );
      if (!response.ok) break;

      const posts: Array<{ slug: string; type: string }> = await response.json();
      if (!posts.length) break;

      const insightPosts = posts.filter((p) => p.type === 'insight');
      const batch = insightPosts.length > 0 ? insightPosts : posts;
      slugs.push(...batch.map((p) => p.slug));

      const totalPages = parseInt(
        response.headers.get('X-WP-TotalPages') || '1',
        10
      );
      if (page >= totalPages) break;
      page++;
    }

    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

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
      alternates: { canonical: `${SITE_URL}/${slug}/` },
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

  const hasAgix = /agix\s*technologies/i.test(title);
  const finalTitle = hasAgix ? title : `${title} | AGIX Technologies`;

  return {
    title: { absolute: finalTitle },
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

export default async function BlogDetailPage({
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

  const relatedServices: ServiceLink[] = post
    ? getRelatedServices(
        stripHtml(post.title.rendered),
        post.content?.rendered || '',
        (post._embedded?.['wp:term']?.[0] || []).map((t: { name: string }) => t.name)
      )
    : [];

  const baseContent = faqData.cleanedContent || post?.content?.rendered || '';
  const enhancedContent = relatedServices.length
    ? injectInlineServiceLinks(baseContent, relatedServices)
    : baseContent;

  const quickAnswer = post
    ? extractQuickAnswer(
        stripHtml(post.title.rendered),
        post.excerpt?.rendered || '',
        baseContent
      )
    : '';

  return (
    <>
      {post && (
        <>
          <Schema
            type="blog"
            data={{
              title: stripHtml(post.title.rendered),
              excerpt: stripHtml(post.excerpt.rendered).slice(0, 200),
              featured_image:
                post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
              date: post.date,
              modified: post.modified,
              slug: post.slug,
              content: post.content?.rendered,
            }}
          />
          <Schema
            type="breadcrumb"
            data={{
              items: [
                { name: 'Home', url: `${SITE_URL}/` },
                { name: 'Insights', url: `${SITE_URL}/insights/` },
                { name: stripHtml(post.title.rendered), url: `${SITE_URL}/insights/${post.slug}/` },
              ],
            }}
          />
        </>
      )}
      <BlogDetailClient initialPost={post} initialFaqData={faqData} relatedServices={relatedServices} enhancedContent={enhancedContent} quickAnswer={quickAnswer} />
    </>
  );
}
