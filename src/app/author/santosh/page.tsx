import type { Metadata } from 'next';
import Link from 'next/link';
import { MainHeader } from '@/components/main-header';
import { MainFooter } from '@/components/main-footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, ArrowRight, BookOpen, Cpu, Zap, Network, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Santosh S. — Founder & CEO | AGIX Technologies' },
  description:
    'Santosh S. is the Founder & CEO of AGIX Technologies, a leading AI systems engineering company. He writes on agentic AI, enterprise automation, and responsible AI deployment.',
  alternates: { canonical: 'https://agixtech.com/author/santosh/' },
  openGraph: {
    title: 'Santosh S. — Founder & CEO | AGIX Technologies',
    description: 'Author of AGIX Technologies Insights. AI systems engineer and enterprise automation strategist.',
    url: 'https://agixtech.com/author/santosh/',
    type: 'profile',
  },
};

const SITE_URL = 'https://agixtech.com';

const authorSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/author/santosh/#person`,
      name: 'Santosh S.',
      jobTitle: 'Founder & CEO',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      url: `${SITE_URL}/author/santosh/`,
      sameAs: ['https://www.linkedin.com/in/santosh-agixtech/'],
      knowsAbout: [
        'Agentic AI Systems',
        'Enterprise AI Automation',
        'Retrieval-Augmented Generation',
        'AI Governance',
        'Voice AI',
        'Predictive Analytics',
        'AI Product Development',
      ],
      description:
        'Santosh S. is the Founder & CEO of AGIX Technologies. He leads AI systems architecture and strategy for enterprise clients across fintech, healthcare, logistics, and retail. He writes on practical AI implementation, agentic systems, and responsible enterprise AI.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Author', item: `${SITE_URL}/author/` },
        { '@type': 'ListItem', position: 3, name: 'Santosh S.', item: `${SITE_URL}/author/santosh/` },
      ],
    },
  ],
};

const expertiseAreas = [
  { icon: Network, label: 'Agentic AI Systems', description: 'Multi-agent orchestration, autonomous workflows, and self-correcting AI pipelines for enterprise.' },
  { icon: Zap, label: 'Enterprise Automation', description: 'End-to-end workflow automation spanning document processing, RPA augmentation, and decision intelligence.' },
  { icon: BookOpen, label: 'RAG & Knowledge AI', description: 'Retrieval-augmented generation architectures that scale to millions of documents with production-grade accuracy.' },
  { icon: Cpu, label: 'AI Product Development', description: 'Custom AI product strategy, architecture, and build for SaaS platforms and enterprise systems.' },
  { icon: BarChart3, label: 'AI Strategy & Governance', description: 'AI readiness assessment, ROI modeling, and responsible AI frameworks for regulated industries.' },
];

export default function AuthorSantoshPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      <div className="min-h-screen bg-background">
        <MainHeader />

        {/* ── AUTHOR HERO ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F1D] via-[#1E2A4F] to-background pt-24 lg:pt-32 pb-20">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,106,0,0.12),transparent_50%)]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-primary">S</span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <Badge variant="outline" className="mb-3 bg-white/10 text-white border-white/20">
                  AGIX Technologies
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  Santosh S.
                </h1>
                <p className="text-xl text-primary font-semibold mb-4">Founder &amp; CEO</p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                  AI systems engineer and enterprise automation strategist. Santosh leads architecture and delivery at AGIX Technologies,
                  helping enterprises across fintech, healthcare, logistics, and retail deploy production-grade AI that generates
                  measurable ROI. He writes on practical AI implementation, agentic systems, and responsible AI governance.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href="https://www.linkedin.com/in/santosh-agixtech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-author-linkedin"
                  >
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile
                    </Button>
                  </a>
                  <Button size="sm" asChild data-testid="button-author-insights">
                    <Link href="/insights/">
                      Read Articles <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERTISE ──────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Areas of Expertise</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Santosh writes and advises across five core areas of enterprise AI.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <Card
                    key={area.label}
                    className="border-border/50 hover:border-primary/30 transition-colors"
                    data-testid={`card-expertise-${area.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <CardContent className="p-6 space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{area.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <section className="py-16 bg-muted/20 border-t border-border/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Read the Latest AI Insights
            </h2>
            <p className="text-muted-foreground mb-6">
              Practical perspectives on enterprise AI implementation, agentic systems, and business automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild data-testid="button-author-cta-insights">
                <Link href="/insights/">
                  Browse All Articles <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-author-cta-contact">
                <Link href="/corporate/contact/">Work with AGIX</Link>
              </Button>
            </div>
          </div>
        </section>

        <MainFooter />
      </div>
    </>
  );
}
