"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "@/lib/motion";
import { ArrowRight, HeartPulse, Landmark, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const caseStudies = [
  {
    title: "Healthcare Document Automation",
    client: "Regional Hospital Network",
    industry: "Healthcare",
    challenge: "Manual patient intake and insurance verification taking 3+ days",
    solution: "AI-powered document processing with automated data extraction",
    results: [
      { metric: "85%", label: "Faster Processing" },
      { metric: "95%", label: "Accuracy Rate" },
      { metric: "$2.4M", label: "Annual Savings" },
    ],
    quote: "The transformation was remarkable. What took days now takes hours.",
    quoteAuthor: "Chief Operations Officer",
    link: "/case-studies/babylon-health/",
    icon: HeartPulse,
    color: "from-rose-500/10 to-rose-600/10",
  },
  {
    title: "Loan Processing Automation",
    client: "Mid-Size Credit Union",
    industry: "Finance",
    challenge: "Slow loan approval process losing customers to faster competitors",
    solution: "End-to-end loan processing with AI-powered credit analysis",
    results: [
      { metric: "60%", label: "Cost Reduction" },
      { metric: "4x", label: "Faster Approval" },
      { metric: "35%", label: "More Applications" },
    ],
    quote: "We went from losing deals to winning them because of speed.",
    quoteAuthor: "VP of Lending",
    link: "/case-studies/enova/",
    icon: Landmark,
    color: "from-blue-500/10 to-blue-600/10",
  },
  {
    title: "Retail Inventory Intelligence",
    client: "E-commerce Platform",
    industry: "Retail",
    challenge: "Stockouts and overstock costing millions in lost revenue",
    solution: "AI demand forecasting with automated inventory optimization",
    results: [
      { metric: "3x", label: "Faster Decisions" },
      { metric: "40%", label: "Less Stockouts" },
      { metric: "$1.8M", label: "Inventory Savings" },
    ],
    quote: "Finally, we can predict demand instead of reacting to it.",
    quoteAuthor: "Director of Operations",
    link: "/case-studies/albertsons/",
    icon: ShoppingCart,
    color: "from-amber-500/10 to-amber-600/10",
  },
];

export default function CaseStudiesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-slate-950/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Case Studies
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-case-studies">
            Real Results, Real Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how businesses across industries have transformed their operations with AGIX.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={study.link}>
                <Card className="hover-elevate border-border/50 group overflow-hidden" data-testid={`card-case-study-${index}`}>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className={`p-6 sm:p-8 bg-gradient-to-br ${study.color}`}>
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-3 sm:block">
                            <study.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary sm:mb-3" aria-hidden="true" />
                            <Badge variant="secondary">{study.industry}</Badge>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold">{study.title}</h3>
                          <p className="text-sm text-muted-foreground">{study.client}</p>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Challenge</h4>
                          <p className="text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Solution</h4>
                          <p className="text-sm">{study.solution}</p>
                        </div>
                        <div className="pt-2 hidden sm:block">
                          <p className="text-sm italic text-muted-foreground">&quot;{study.quote}&quot;</p>
                          <p className="text-xs text-muted-foreground mt-1">{study.quoteAuthor}</p>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 bg-muted/30 flex flex-col justify-center">
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3 sm:mb-4">Results</h4>
                        <div className="flex flex-wrap gap-4 sm:gap-0 sm:flex-col sm:space-y-4">
                          {study.results.map((result) => (
                            <div key={result.label} className="flex items-center gap-2 sm:gap-3">
                              <div className="text-xl sm:text-2xl font-bold text-primary">{result.metric}</div>
                              <div className="text-xs sm:text-sm text-muted-foreground">{result.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-primary mt-4 sm:mt-6 group-hover:gap-2 transition-all">
                          Read Full Case Study
                          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button variant="outline" asChild data-testid="button-case-studies-all">
            <Link href="/case-studies/">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
