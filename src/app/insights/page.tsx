import { Metadata } from 'next';
import Link from 'next/link';
import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import InsightsListClient from './insights-list-client';
import { WPPost } from '@/lib/insights/wordpress';

const SITE_URL = 'https://agixtech.com';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

function buildInsightsSchema(posts: WPPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/insights/${post.slug}/`,
      name: stripHtml(post.title.rendered),
    })),
  };
}

const WP_API_BASE = 'https://cms.agixtech.com/wp-json/wp/v2';

export const metadata: Metadata = {
  title: { absolute: 'Agentic AI & Automation Insights | AGIX Technologies' },
  description:
    'Expert perspectives on AI automation, enterprise AI implementation, and digital transformation strategies from the AGIX Technologies team.',
  alternates: { canonical: 'https://agixtech.com/insights/' },
};

async function getInitialPosts(): Promise<{
  posts: WPPost[];
  totalPages: number;
}> {
  try {
    const response = await fetch(
      `${WP_API_BASE}/posts?per_page=9&page=1&_embed=true`,
      { next: { tags: ['wordpress-posts'] } }
    );
    if (!response.ok) return { posts: [], totalPages: 1 };
    const posts: WPPost[] = await response.json();
    const totalPages = parseInt(
      response.headers.get('X-WP-TotalPages') || '1',
      10
    );
    return { posts, totalPages };
  } catch {
    return { posts: [], totalPages: 1 };
  }
}

export default async function InsightsPage() {
  const { posts, totalPages } = await getInitialPosts();
  const insightsSchema = buildInsightsSchema(posts);

  return (
    <div className="min-h-screen bg-background">
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(insightsSchema) }}
        />
      )}
      <MainHeader />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F1D] via-[#1E2A4F] to-background pt-24 lg:pt-28 pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,106,0,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,188,212,0.15),transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
            AGIX Technologies Insights
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI &amp; Automation{' '}
            <span className="text-primary">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Expert perspectives on AI automation, enterprise AI implementation, and digital
            transformation strategies.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <InsightsListClient initialPosts={posts} initialTotalPages={totalPages} />
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our team of AI experts can help you implement the strategies discussed in our
            insights.
          </p>
          <Button size="lg" asChild>
            <Link href="/corporate/contact/" data-testid="button-insights-cta">
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
