import { Metadata } from 'next';
import BlogDetailClient from './blog-detail-client';

const WP_API_BASE = "https://r7t.66a.myftpupload.com/wp-json/wp/v2";
const SITE_URL = 'https://agixtech.com';

interface WPPostMeta {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{ url: string; width?: number; height?: number }>;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
    canonical?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

async function getPostMetadata(slug: string): Promise<WPPostMeta | null> {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts?slug=${slug}&_embed=true`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return null;
    const posts = await response.json();
    return posts[0] || null;
  } catch {
    return null;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostMetadata(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      alternates: {
        canonical: `${SITE_URL}/${resolvedParams.slug}/`,
      },
    };
  }

  const yoast = post.yoast_head_json;
  const title = yoast?.title || stripHtml(post.title.rendered);
  const description = yoast?.description || stripHtml(post.excerpt.rendered).slice(0, 160);
  const canonicalUrl = `${SITE_URL}/${resolvedParams.slug}/`;
  const ogImage = yoast?.og_image?.[0]?.url || 
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    `${SITE_URL}/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
