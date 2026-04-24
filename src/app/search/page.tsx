import { Metadata } from 'next';
import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import SearchResultsClient from './search-results-client';
import { getPosts, WPPost } from '@/lib/insights/wordpress';

export const metadata: Metadata = {
  title: 'Search | AGIX Technologies',
  description: 'Search for AI insights, services, and solutions at AGIX Technologies.',
  robots: { index: false, follow: true },
};

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string; page?: string }> 
}) {
  const params = await searchParams;
  const query = params.q || '';
  const page = parseInt(params.page || '1', 10);
  
  let initialData: { posts: WPPost[]; totalPages: number; total: number } = {
    posts: [],
    totalPages: 0,
    total: 0,
  };

  if (query) {
    try {
      initialData = await getPosts({
        search: query,
        page: page,
        perPage: 9,
      });
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchResultsClient 
            initialQuery={query}
            initialPosts={initialData.posts}
            initialTotalPages={initialData.totalPages}
            initialTotal={initialData.total}
          />
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
