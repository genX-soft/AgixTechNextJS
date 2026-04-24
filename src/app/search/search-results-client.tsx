'use client'

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Calendar, BookOpen, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import {
  getPosts,
  WPPost,
  getFeaturedImageUrl,
  getExcerpt,
  formatDate,
  estimateReadTime,
} from "@/lib/insights/wordpress";

function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

function PostCard({ post }: { post: WPPost }) {
  const featuredImage = getFeaturedImageUrl(post);
  const excerpt = getExcerpt(post, 120);
  const readTime = estimateReadTime(post.content?.rendered || "");
  const categories = post._embedded?.["wp:term"]?.[0] || [];

  return (
    <Link href={`/insights/${post.slug}/`} data-testid={`card-post-${post.id}`}>
      <Card className="overflow-hidden group hover-elevate cursor-pointer h-full flex flex-col border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="relative h-48 overflow-hidden bg-muted">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={post.title.rendered}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary/40" />
            </div>
          )}
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {(categories as Array<{ id: number; name: string }>)
                .slice(0, 2)
                .map((cat) => (
                  <Badge key={cat.id} variant="secondary" className="text-xs bg-slate-800 text-slate-300 border-slate-700">
                    {cat.name}
                  </Badge>
                ))}
            </div>
          )}
          <h3
            className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors text-white"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-1">{excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500 mt-auto">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min read
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface SearchResultsClientProps {
  initialQuery: string;
  initialPosts: WPPost[];
  initialTotalPages: number;
  initialTotal: number;
}

export default function SearchResultsClient({
  initialQuery,
  initialPosts,
  initialTotalPages,
  initialTotal,
}: SearchResultsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));

  const performSearch = useCallback(async (searchQuery: string, searchPage: number) => {
    if (!searchQuery) {
      setPosts([]);
      setTotalPages(0);
      setTotal(0);
      return;
    }

    setLoading(true);
    try {
      const result = await getPosts({
        search: searchQuery,
        page: searchPage,
        perPage: 9,
      });
      setPosts(result.posts);
      setTotalPages(result.totalPages);
      setTotal(result.total);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setPage(1);
      performSearch(query.trim(), 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
    performSearch(query, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setQuery("");
    setPosts([]);
    setTotalPages(0);
    setTotal(0);
    router.push("/search");
  };

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            type="text"
            placeholder="Search for AI insights, services, or industries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 py-6 text-lg bg-slate-900/50 border-slate-700 focus:border-primary focus:ring-primary rounded-full"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>
      </div>

      <div className="pt-4">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : query ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium text-white">
                {total > 0 
                  ? `Found ${total} result${total === 1 ? '' : 's'} for "${query}"`
                  : `No results found for "${query}"`}
              </h2>
            </div>
            
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
                <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Try adjusting your keywords or browse our{" "}
                  <Link href="/insights/" className="text-primary hover:underline">
                    latest insights
                  </Link>{" "}
                  to find what you're looking for.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="border-slate-700 hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-slate-400">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="border-slate-700 hover:bg-slate-800"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Enter a search term to get started</h2>
            <p className="text-slate-400">
              Discover how AI is transforming enterprises across industries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
