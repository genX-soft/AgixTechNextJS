'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Calendar, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/${post.slug}/`} data-testid={`card-post-${post.id}`}>
        <Card className="overflow-hidden group hover-elevate cursor-pointer h-full flex flex-col">
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
                    <Badge key={cat.id} variant="secondary" className="text-xs">
                      {cat.name}
                    </Badge>
                  ))}
              </div>
            )}
            <h3
              className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
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
    </motion.div>
  );
}

interface Props {
  initialPosts: WPPost[];
  initialTotalPages: number;
}

export default function InsightsListClient({ initialPosts, initialTotalPages }: Props) {
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (page === 1) return;
    setLoading(true);
    setError(null);
    getPosts({ page, perPage: 9 })
      .then((result) => {
        setPosts(result.posts);
        setTotalPages(result.totalPages);
      })
      .catch(() => setError("Unable to load posts. Please try again."))
      .finally(() => setLoading(false));
  }, [page]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => setPage(1)} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No posts available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            data-testid="button-next-page"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </>
  );
}
