import type { Metadata } from 'next';
import Link from 'next/link';
import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import FAQSection from '@/components/shared/FAQSection';
import TestimonialFilter from '@/components/TestimonialFilter';
import TestimonialCard from '@/components/TestimonialCard';
import {
  testimonials,
  platformRatings,
  faqItems,
  trustPillars,
} from '@/lib/data/testimonials';
import {
  ArrowRight,
  Star,
  ExternalLink,
  MessageSquare,
  Clock,
  Cpu,
  BarChart3,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'AGIX Technologies Reviews & Customer Testimonials' },
  description:
    'Read verified client reviews and testimonials for AGIX Technologies, a leading AI systems engineering and automation company. Rated 5.0 on Clutch, Sortlist, and TechBehemoths.',
  alternates: { canonical: 'https://agixtech.com/corporate/testimonials/' },
  openGraph: {
    title: 'AGIX Technologies Reviews & Customer Testimonials',
    description:
      'Verified reviews from enterprise clients across fintech, healthcare, insurance, retail, and more. See why businesses trust AGIX for production AI systems.',
    url: 'https://agixtech.com/corporate/testimonials/',
    siteName: 'AGIX Technologies',
    type: 'website',
  },
};

const SITE_URL = 'https://agixtech.com';

const PILLAR_ICONS: Record<string, React.ElementType> = {
  MessageSquare,
  Clock,
  Cpu,
  BarChart3,
  Zap,
};

const totalReviews = platformRatings.reduce((sum, p) => sum + p.totalReviews, 0);
const avgRating = (
  platformRatings.reduce((sum, p) => sum + p.rating * p.totalReviews, 0) / totalReviews
).toFixed(1);

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/corporate/testimonials/#webpage`,
      url: `${SITE_URL}/corporate/testimonials/`,
      name: 'AGIX Technologies Reviews & Customer Testimonials',
      description:
        'Read verified client reviews and testimonials for AGIX Technologies, a leading AI systems engineering and automation company.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Customer Testimonials', item: `${SITE_URL}/corporate/testimonials/` },
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#organization`,
      name: 'AGIX Technologies',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: String(totalReviews),
        reviewCount: String(totalReviews),
      },
    },
    ...testimonials.filter((t) => t.featured).map((t) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
      },
      author: { '@type': 'Person', name: t.reviewerName },
      reviewBody: t.excerpt,
      datePublished: t.date,
      itemReviewed: { '@id': `${SITE_URL}/#organization` },
    })),
  ],
};

const featuredTestimonials = testimonials.filter((t) => t.featured);

export default function CustomerTestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="min-h-screen bg-background">
        <MainHeader />

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F1D] via-[#1E2A4F] to-background pt-24 lg:pt-32 pb-20">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,106,0,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,188,212,0.12),transparent_50%)]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
              Verified Client Reviews
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Customer Testimonials &amp;{' '}
              <span className="text-primary">Client Reviews</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Real results from enterprise clients across fintech, healthcare, logistics, and
              more — verified on Clutch, Sortlist, and TechBehemoths.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild data-testid="button-hero-case-studies">
                <Link href="/case-studies/">
                  View Case Studies <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild data-testid="button-hero-contact">
                <Link href="/corporate/contact/">Talk to Our Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── PLATFORM TRUST BAR ─────────────────────────────────────── */}
        <section className="py-12 border-b border-border/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest font-medium">
              Verified ratings across leading B2B review platforms
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platformRatings.map((p) => (
                <Card
                  key={p.platform}
                  className="border-border/50 text-center hover:border-primary/30 transition-colors"
                  data-testid={`card-platform-${p.platform.toLowerCase()}`}
                >
                  <CardContent className="p-6 space-y-3">
                    <p className="font-bold text-lg text-foreground">{p.platform}</p>
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(p.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </div>
                    <p className="text-3xl font-bold text-primary">{p.rating.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">{p.totalReviews} verified reviews</p>
                    <p className="text-xs text-muted-foreground/70">{p.note}</p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      data-testid={`link-platform-${p.platform.toLowerCase()}`}
                    >
                      View Profile <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED TESTIMONIALS ──────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                Featured Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enterprise leaders share their experience working with AGIX on production AI systems.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {featuredTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ALL TESTIMONIALS WITH FILTER ───────────────────────────── */}
        <section className="py-16 bg-muted/20 border-y border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">All Client Reviews</h2>
              <p className="text-muted-foreground">Filter by service area to find reviews most relevant to your needs.</p>
            </div>
            <TestimonialFilter testimonials={testimonials} />
          </div>
        </section>

        {/* ── TRUST PILLARS ──────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Clients Trust AGIX</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Five qualities clients mention consistently across every independent review.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {trustPillars.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.icon];
                return (
                  <div
                    key={pillar.title}
                    className="text-center p-6 rounded-xl border border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/60 transition-all duration-300"
                    data-testid={`card-pillar-${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{pillar.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PLATFORM HIGHLIGHTS ────────────────────────────────────── */}
        <section className="py-16 bg-muted/20 border-y border-border/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">What the Reviews Tell Us</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Across {totalReviews} verified reviews, clients highlight the same themes: delivery that matches what was promised,
              clear communication throughout the engagement, AI systems that actually work in production, and a measurable
              return on investment. AGIX clients don&apos;t just describe satisfaction — they describe outcomes.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[
                { value: avgRating, label: 'Average Rating', suffix: '/ 5.0' },
                { value: String(totalReviews) + '+', label: 'Verified Reviews', suffix: '' },
                { value: '12+', label: 'Industries Served', suffix: '' },
                { value: '95%', label: 'On-Time Delivery', suffix: '' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                    {stat.suffix && <span className="text-base font-normal text-muted-foreground ml-1">{stat.suffix}</span>}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPACT REVIEW WALL ────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">More Client Voices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {testimonials.filter((t) => !t.featured).map((t) => (
                <TestimonialCard key={t.id} testimonial={t} compact />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <FAQSection
          faqs={faqItems}
          title="Frequently Asked Questions About AGIX Reviews"
          subtitle="Answers to the most common questions about our client reviews and engagement process."
        />

        {/* ── FINAL CTA ──────────────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-b from-background to-[#0A0F1D]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See why businesses choose AGIX for practical AI systems
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join 40+ enterprises that have deployed production AI with AGIX Technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-cta-case-studies">
                <Link href="/case-studies/">
                  Explore Case Studies <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild data-testid="button-cta-contact">
                <Link href="/corporate/contact/">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        <MainFooter />
      </div>
    </>
  );
}
