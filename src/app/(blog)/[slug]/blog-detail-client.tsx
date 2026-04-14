'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Linkedin,
  Twitter,
  HelpCircle,
  Cpu,
} from "lucide-react";
import type { ServiceLink } from "@/lib/insights/service-mapping";
import {
  getPosts,
  WPPost,
  getFeaturedImageUrl,
  getAuthorName,
  getAuthorSlug,
  formatDate,
  estimateReadTime,
  getExcerpt,
} from "@/lib/insights/wordpress";
import Image from "next/image";
import { FAQData, FAQItem } from "@/lib/insights/faq-utils";

interface Props {
  initialPost: WPPost | null;
  initialFaqData: FAQData;
  relatedServices?: ServiceLink[];
  enhancedContent?: string;
}

function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="my-12">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-primary" />
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            data-testid={`accordion-faq-${index}`}
          >
            <AccordionTrigger className="text-left hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="wp-content"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function RelatedPostCard({ post }: { post: WPPost }) {
  const featuredImage = getFeaturedImageUrl(post);
  const excerpt = getExcerpt(post, 80);

  return (
    <Link href={`/${post.slug}/`} data-testid={`card-related-${post.id}`}>
      <Card className="overflow-hidden group hover-elevate cursor-pointer h-full">
        <div className="relative h-32 overflow-hidden bg-muted">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              quality={75}
              priority={false}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
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

function RelatedServicesSection({ services }: { services: ServiceLink[] }) {
  if (!services || services.length === 0) return null;
  return (
    <section className="bg-muted/20 border border-border rounded-xl p-6 mb-12">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
        <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />
        Related AGIX Technologies Services
      </h2>
      <ul className="space-y-3">
        {services.map((service) => (
          <li key={service.href} className="flex flex-col sm:flex-row sm:items-start gap-1">
            <Link
              href={service.href}
              className="font-medium text-primary hover:underline text-sm shrink-0"
              data-testid={`link-related-service-${service.href.replace(/\//g, "-")}`}
            >
              {service.title}
            </Link>
            <span className="hidden sm:inline text-muted-foreground text-sm">—</span>
            <span className="text-sm text-muted-foreground">{service.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function BlogArticlePage({ initialPost, initialFaqData, relatedServices = [], enhancedContent }: Props) {
  const params = useParams();
  const slug = params?.slug as string;

  const post = initialPost;
  const faqData = initialFaqData;
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);

  useEffect(() => {
    if (!slug) return;
    getPosts({ perPage: 4 })
      .then((result) => {
        setRelatedPosts(result.posts.filter((p) => p.slug !== slug).slice(0, 3));
      })
      .catch(() => {});
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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <MainHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-6">
            The article you&apos;re looking for doesn&apos;t exist or has been moved.
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
  const authorSlug = getAuthorSlug(post);
  const readTime = estimateReadTime(post.content?.rendered || "");
  const categories = post._embedded?.["wp:term"]?.[0] || [];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      <article className="pt-24 lg:pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div>
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
              <Link
                href={`/author/${authorSlug}/`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
                data-testid="link-blog-author"
              >
                <User className="w-4 h-4" />
                <span className="font-medium text-foreground/80 hover:text-primary transition-colors">
                  {author}
                </span>
              </Link>
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
          </div>

          <div
            className="wp-content max-w-none mb-12"
            dangerouslySetInnerHTML={{
              __html: enhancedContent || faqData.cleanedContent || post.content?.rendered || "",
            }}
          />

          {faqData.faqs.length > 0 && (
            <FAQAccordion faqs={faqData.faqs} />
          )}

          <RelatedServicesSection services={relatedServices} />

          <div className="border-t border-border pt-8 mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share this article:</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={shareOnTwitter}
                  data-testid="button-share-twitter"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={shareOnLinkedin}
                  data-testid="button-share-linkedin"
                >
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
                  Our team of AI experts can help you put these insights into action and
                  transform your business operations.
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
