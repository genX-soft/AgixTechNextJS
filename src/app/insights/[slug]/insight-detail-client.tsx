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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "../wordpress-content.css";
import { 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Share2,
  Linkedin,
  Twitter,
  HelpCircle
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

interface FAQItem {
  question: string;
  answer: string;
}

function extractFAQsFromContent(htmlContent: string): { faqs: FAQItem[]; cleanedContent: string } {
  const faqs: FAQItem[] = [];
  let cleanedContent = htmlContent;
  
  // Pattern 1: Yoast FAQ Block structure with schema-faq classes
  if (htmlContent.includes('schema-faq')) {
    // Match individual schema-faq-section divs for extraction
    const sectionPattern = /<div[^>]*class="[^"]*schema-faq-section[^"]*"[^>]*>[\s\S]*?<strong[^>]*class="[^"]*schema-faq-question[^"]*"[^>]*>([\s\S]*?)<\/strong>\s*<p[^>]*class="[^"]*schema-faq-answer[^"]*"[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi;
    let sectionMatch;
    
    while ((sectionMatch = sectionPattern.exec(htmlContent)) !== null) {
      const question = sectionMatch[1].replace(/<[^>]*>/g, '').trim();
      const answer = sectionMatch[2].trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
    
    if (faqs.length > 0) {
      // Remove the entire schema-faq wrapper block (greedy match to closing div)
      cleanedContent = cleanedContent.replace(/<div[^>]*class="[^"]*schema-faq[^"]*wp-block-yoast-faq-block[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
      cleanedContent = cleanedContent.replace(/<div[^>]*class="[^"]*wp-block-yoast-faq-block[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
      // Remove individual schema-faq-section divs if still present
      cleanedContent = cleanedContent.replace(/<div[^>]*class="[^"]*schema-faq-section[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
      // Remove any remaining schema-faq wrappers
      cleanedContent = cleanedContent.replace(/<div[^>]*class="[^"]*schema-faq[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
      // Remove the FAQ heading
      cleanedContent = cleanedContent.replace(/<h[23][^>]*>\s*Frequently Asked Questions\s*<\/h[23]>/gi, '');
    }
  }
  
  // Pattern 2: "Frequently Asked Questions" section with H3/H4 questions and "Ans." answers
  if (faqs.length === 0) {
    // Match FAQ section heading (H2 or H3)
    const faqHeadingMatch = htmlContent.match(/<h[23][^>]*>\s*Frequently Asked Questions\s*<\/h[23]>/i);
    
    if (faqHeadingMatch) {
      const faqHeadingIndex = htmlContent.indexOf(faqHeadingMatch[0]);
      const contentAfterHeading = htmlContent.slice(faqHeadingIndex + faqHeadingMatch[0].length);
      
      // Find the next H2 heading to limit scope
      const nextH2Match = contentAfterHeading.match(/<h2[^>]*>/i);
      const faqSectionBody = nextH2Match 
        ? contentAfterHeading.slice(0, contentAfterHeading.indexOf(nextH2Match[0]))
        : contentAfterHeading;
      
      // Look for H3/H4 question followed by paragraph with optional "Ans." prefix
      // Flexible matching: <strong> is optional, "Ans." is optional, allows various whitespace
      const ansPattern = /<h[34][^>]*>([^<]+\??)<\/h[34]>\s*<p[^>]*>(?:\s*<strong>\s*)?(?:Ans\.?\s*)?(?:<\/strong>\s*)?([\s\S]*?)<\/p>/gi;
      let ansMatch;
      const matchedBlocks: string[] = [];
      
      while ((ansMatch = ansPattern.exec(faqSectionBody)) !== null) {
        const question = ansMatch[1].replace(/&[^;]+;/g, ' ').trim();
        const answer = ansMatch[2].trim();
        if (question && answer && question.length > 10 && answer.length > 20) {
          faqs.push({ question, answer });
          matchedBlocks.push(ansMatch[0]);
        }
      }
      
      if (faqs.length > 0) {
        // Remove only the FAQ heading and matched Q&A blocks
        cleanedContent = cleanedContent.replace(faqHeadingMatch[0], '');
        for (const block of matchedBlocks) {
          cleanedContent = cleanedContent.replace(block, '');
        }
      }
    }
  }

  // Clean up empty paragraphs and extra whitespace
  if (faqs.length > 0) {
    cleanedContent = cleanedContent.replace(/<p[^>]*>\s*<\/p>/g, '');
    cleanedContent = cleanedContent.replace(/\n{3,}/g, '\n\n');
  }

  return { faqs, cleanedContent };
}

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="my-12 border rounded-lg bg-card">
      <div className="px-6 py-4 border-b bg-muted/50 rounded-t-lg">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Frequently Asked Questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="px-6">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`} data-testid={`accordion-faq-${index}`}>
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <div 
                className="wp-content text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

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
    <Link href={`/insights/${post.slug}/`} data-testid={`card-related-${post.id}`}>
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
  const [faqData, setFaqData] = useState<{ faqs: Array<{question: string; answer: string}>; cleanedContent: string }>({ faqs: [], cleanedContent: "" });

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
        // Extract FAQs from post content
        if (fetchedPost.content?.rendered) {
          setFaqData(extractFAQsFromContent(fetchedPost.content.rendered));
        }
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
            <Link href="/insights/" data-testid="button-back-to-insights">
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
              href="/insights/" 
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
              <div className="relative rounded-lg overflow-hidden mb-10 w-full">
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  className="w-full h-auto object-contain max-h-[400px] sm:max-h-[500px] md:max-h-[600px]"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="wp-content max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: faqData.cleanedContent || post.content?.rendered || "" }}
          />

          {faqData.faqs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FAQAccordion faqs={faqData.faqs} />
            </motion.div>
          )}

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
                  <Link href="/corporate/contact/" data-testid="button-article-cta">
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
