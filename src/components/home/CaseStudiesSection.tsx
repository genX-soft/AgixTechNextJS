"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "@/lib/motion";
import { ArrowRight, HeartPulse, Landmark, ShoppingCart, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    number: "01",
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
    accentColor: "from-rose-500/20 via-rose-500/5 to-transparent",
    borderHover: "hover:border-rose-500/40",
    numberColor: "text-rose-500/10",
    tagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  },
  {
    number: "02",
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
    accentColor: "from-blue-500/20 via-blue-500/5 to-transparent",
    borderHover: "hover:border-blue-500/40",
    numberColor: "text-blue-500/10",
    tagColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  {
    number: "03",
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
    accentColor: "from-amber-500/20 via-amber-500/5 to-transparent",
    borderHover: "hover:border-amber-500/40",
    numberColor: "text-amber-500/10",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
];

export default function CaseStudiesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 border-t border-slate-800 overflow-hidden" ref={ref}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="outline" className="border-primary/30 text-primary">
            Case Studies
          </Badge>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
            data-testid="heading-case-studies"
          >
            Real Results, Real Impact
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            See how businesses across industries have transformed their operations with AGIX Technologies.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="h-full"
            >
              <Link
                href={study.link}
                className={`group relative flex flex-col h-full rounded-2xl border border-white/8 bg-slate-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${study.borderHover}`}
                data-testid={`card-case-study-${index}`}
              >
                {/* Industry gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${study.accentColor.replace("via-", "to-").replace("/20", "/60").replace("/5 to-transparent", "")}`} />

                {/* Background gradient */}
                <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${study.accentColor} pointer-events-none`} />

                {/* Ghost number */}
                <span className={`absolute top-3 right-4 text-[7rem] font-black leading-none select-none pointer-events-none ${study.numberColor} transition-opacity duration-300 group-hover:opacity-60`}>
                  {study.number}
                </span>

                <div className="relative flex flex-col flex-1 p-7 gap-6">

                  {/* Top: icon + industry tag */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <study.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${study.tagColor}`}>
                      {study.industry}
                    </span>
                  </div>

                  {/* Title + client */}
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-primary transition-colors duration-200">
                      {study.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{study.client}</p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-800" />

                  {/* Results — hero of the card */}
                  <div className="grid grid-cols-3 gap-2">
                    {study.results.map((r) => (
                      <div key={r.label} className="text-center">
                        <div className="text-xl font-bold text-primary leading-none">{r.metric}</div>
                        <div className="text-[10px] text-slate-500 mt-1 leading-snug">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-800" />

                  {/* Challenge → Solution pill row */}
                  <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                    <p><span className="text-slate-500 font-medium">Challenge: </span>{study.challenge}</p>
                    <p><span className="text-slate-500 font-medium">Solution: </span>{study.solution}</p>
                  </div>

                  {/* Quote */}
                  <div className="flex gap-3 mt-auto pt-2">
                    <Quote className="w-4 h-4 text-primary/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-slate-400 italic leading-relaxed">{study.quote}</p>
                      <p className="text-[10px] text-slate-600 mt-1">{study.quoteAuthor}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all duration-200 pt-1">
                    Read Case Study
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            asChild
            data-testid="button-case-studies-all"
          >
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
