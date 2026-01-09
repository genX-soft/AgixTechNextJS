'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import "../wordpress-content.css";
import { 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Share2,
  Linkedin,
  Twitter
} from "lucide-react";
import { 
  getPostBySlug, 
  getPosts,
  WPPost, 
  getFeaturedImageUrl, 
  getAuthorName, 
  formatDate,
  estimateReadTime,
  getExcerpt
} from "@/lib/insights/wordpress";

function ArticleSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Skeleton className="h-8 w-32 mb-6" />
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-12 w-3/4 mb-6" />
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-80 w-full mb-8 rounded-lg" />
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

function RelatedPostCard({ post }: { post: WPPost }) {
  const featuredImage = getFeaturedImageUrl(post);
  const excerpt = getExcerpt(post, 80);

  return (
    <Link href={`/insights/${post.slug}`} data-testid={`card-related-${post.id}`}>
      <Card className="overflow-hidden group hover-elevate cursor-pointer h-full">
        <div className="relative h-32 overflow-hidden bg-muted">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={post.title.rendered}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
        </div>
        <CardContent className="p-4">
          <h4 
            className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function InsightArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [post, setPost] = useState<WPPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const [fetchedPost, recentPosts] = await Promise.all([
          getPostBySlug(slug),
          getPosts({ perPage: 4 })
        ]);
        
        if (!fetchedPost) {
          setError("Article not found");
          return;
        }
        
        setPost(fetchedPost);
        setRelatedPosts(recentPosts.posts.filter(p => p.slug !== slug).slice(0, 3));
      } catch (err) {
        setError("Unable to load article. Please try again later.");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const shareOnTwitter = () => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title.rendered);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareOnLinkedin = () => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader />
        <ArticleSkeleton />
        <MainFooter />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "Article not found"}</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/insights" data-testid="button-back-to-insights">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Link>
          </Button>
        </div>
        <MainFooter />
      </div>
    );
  }

  const featuredImage = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const readTime = estimateReadTime(post.content?.rendered || "");
  const categories = post._embedded?.["wp:term"]?.[0] || [];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <article className="pt-24 lg:pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/insights" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              data-testid="link-back-to-insights"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Link>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <Badge key={cat.id} variant="secondary">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            )}

            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readTime} min read
              </span>
            </div>

            {featuredImage && (
              <div className="relative rounded-lg overflow-hidden mb-10">
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="wp-content max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          <div className="border-t border-border pt-8 mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share this article:</span>
                <Button variant="outline" size="icon" onClick={shareOnTwitter} data-testid="button-share-twitter">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={shareOnLinkedin} data-testid="button-share-linkedin">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="bg-muted/30 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="py-10 px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Implement These Strategies?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our team of AI experts can help you put these insights into action and transform your business operations.
                </p>
                <Button size="lg" asChild>
                  <Link href="/corporate/contact" data-testid="button-article-cta">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </article>

      <MainFooter />
    </div>
  );
}
