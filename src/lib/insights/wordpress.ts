const WP_SERVER_BASE = "https://cms.agixtech.com/wp-json/wp/v2";
const WP_CLIENT_BASE = "/api/wp";

function getBase(path: 'posts' | 'categories' | 'pages'): string {
  if (typeof window === 'undefined') {
    return `${WP_SERVER_BASE}/${path}`;
  }
  return `${WP_CLIENT_BASE}/${path}`;
}

export interface WPYoastSEO {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_type?: string;
  og_locale?: string;
  og_site_name?: string;
  og_image?: Array<{
    url: string;
    width?: number;
    height?: number;
    type?: string;
  }>;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  robots?: {
    index?: string;
    follow?: string;
    "max-snippet"?: string;
    "max-image-preview"?: string;
    "max-video-preview"?: string;
  };
  schema?: Record<string, unknown>;
  article_published_time?: string;
  article_modified_time?: string;
  author?: string;
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  yoast_head?: string;
  yoast_head_json?: WPYoastSEO;
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      avatar_urls?: Record<string, string>;
    }>;
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPCategory {
  id: number;
  count: number;
  name: string;
  slug: string;
}

export async function getPosts(params?: {
  page?: number;
  perPage?: number;
  categories?: number[];
  search?: string;
}): Promise<{ posts: WPPost[]; totalPages: number; total: number }> {
  const searchParams = new URLSearchParams();
  searchParams.set("_embed", "true");
  searchParams.set("per_page", String(params?.perPage || 10));
  searchParams.set("page", String(params?.page || 1));
  
  if (params?.categories?.length) {
    searchParams.set("categories", params.categories.join(","));
  }
  if (params?.search) {
    searchParams.set("search", params.search);
  }

  const response = await fetch(`${getBase('posts')}?${searchParams.toString()}`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }

  const posts: WPPost[] = await response.json();
  const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1", 10);
  const total = parseInt(response.headers.get("X-WP-Total") || "0", 10);

  return { posts, totalPages, total };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const searchParams = new URLSearchParams();
  searchParams.set("_embed", "true");
  searchParams.set("slug", slug);

  const response = await fetch(`${getBase('posts')}?${searchParams.toString()}`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  const posts: WPPost[] = await response.json();
  return posts.length > 0 ? posts[0] : null;
}

export async function getCategories(): Promise<WPCategory[]> {
  const response = await fetch(`${getBase('categories')}?per_page=100`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  return response.json();
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

export function getExcerpt(post: WPPost, maxLength = 160): string {
  const text = stripHtmlTags(post.excerpt?.rendered || post.content?.rendered || "");
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function getFeaturedImageUrl(post: WPPost): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  return media.media_details?.sizes?.full?.source_url || 
         media.source_url || 
         media.media_details?.sizes?.large?.source_url || 
         null;
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || "AGIX Team";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(content: string): number {
  const text = stripHtmlTags(content);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// End of file
