import { Metadata } from 'next';
import { cache } from 'react';
import BlogDetailClient from './blog-detail-client';
import { WPPost } from '@/lib/insights/wordpress';
import { extractFAQsFromContent, FAQData } from '@/lib/insights/faq-utils';
import {
  generateBlogPostingSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFullSchema,
} from '@/lib/seo/structured-data';

const WP_API_BASE = 'https://cms.agixtech.com/wp-json/wp/v2';
const SITE_URL = 'https://agixtech.com';

export const revalidate = 86400;

const getFullPost = cache(async (slug: string): Promise<WPPost | null> => {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=true`,
      { next: { revalidate: 86400 } }
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
        { next: { revalidate: 86400 } }
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

function buildBlogSchema(post: WPPost, slug: string): string {
  const yoast = post.yoast_head_json;
  const title = yoast?.title || stripHtml(post.title.rendered);
  const description =
    yoast?.description || stripHtml(post.excerpt.rendered).slice(0, 160);
  const canonicalUrl = `${SITE_URL}/${slug}/`;
  const image =
    yoast?.og_image?.[0]?.url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.author?.[0]?.name || 'AGIX Team';

  const schema = generateFullSchema([
    generateOrganizationSchema(),
    generateBlogPostingSchema({
      title: stripHtml(title),
      description,
      url: canonicalUrl,
      datePublished: post.date,
      dateModified: post.modified || post.date,
      author,
      image,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Insights', url: `${SITE_URL}/insights/` },
      { name: stripHtml(post.title.rendered), url: canonicalUrl },
    ]),
  ]);

  return JSON.stringify(schema);
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
  const canonicalUrl = `${SITE_URL}/${slug}/`;
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

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildBlogSchema(post, slug) }}
        />
      )}
      <BlogDetailClient initialPost={post} initialFaqData={faqData} />
    </>
  );
}
