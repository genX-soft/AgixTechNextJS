'use client'
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "@/lib/motion";
import { CaseStudyTemplate } from "@/components/shared/case-study-template";
import { CtaForm } from "@/components/forms/cta-form";
import FAQSection from "@/components/shared/FAQSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle, ChevronRight,
  Quote, Brain, Layers, Zap, Settings, Link2, TrendingUp, Clock,
  Building2, Users, Globe, Shield, Star, HelpCircle,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────── */
export interface CaseStudyStat { value: string; label: string; color?: string; }
export interface CaseStudyMetric { value: string; label: string; description: string; color: string; }
export interface CaseStudyPainPoint { title: string; stat: string; description: string; color?: string; }
export interface CaseStudyArchLayer { name: string; components: string[]; color: string; }
export interface CaseStudyStep { title: string; description: string; detail: string; }
export interface CaseStudyFactor { title: string; description: string; }
export interface CaseStudyLimit { title: string; description: string; }
export interface CaseStudyConnection { name: string; slug: string; relevance: string; type: 'service' | 'industry' | 'intelligence'; }
export interface FAQItem { question: string; answer: string; }

export interface CaseStudyV2Data {
  slug: string;
  company: string;
  industry: string;
  subIndustry: string;
  accentColor: string;
  gradientClasses: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroStats: CaseStudyStat[];
  directAnswerQuestion: string;
  directAnswer: string;
  clientDescription: string;
  clientFounded?: string;
  clientSize?: string;
  clientLocation?: string;
  problemTitle: string;
  problemDescription: string;
  painPoints: CaseStudyPainPoint[];
  solutionTitle: string;
  solutionDescription: string;
  solutionComponents: Array<{ title: string; description: string }>;
  architectureTitle: string;
  architectureLayers: CaseStudyArchLayer[];
  resultsTitle: string;
  resultsMetrics: CaseStudyMetric[];
  resultsQuote?: { text: string; author: string; role: string };
  howItWorksTitle: string;
  steps: CaseStudyStep[];
  whyItWorkedTitle: string;
  whyFactors: CaseStudyFactor[];
  limitations: CaseStudyLimit[];
  whenToUseGoodFit: string[];
  whenToUseNotGoodFit: string[];
  connections: CaseStudyConnection[];
  keyTakeaways: string[];
  faqs: FAQItem[];
  prevCase?: { name: string; url: string };
  nextCase?: { name: string; url: string };
}

/* ─── Color Maps ─────────────────────────────────────────── */
const accentMap: Record<string, { badge: string; stat: string; border: string; bg: string; dot: string; step: string }> = {
  emerald: { badge: "border-emerald-500/30 text-emerald-400", stat: "text-emerald-400", border: "border-emerald-500", bg: "bg-emerald-500/10", dot: "bg-emerald-500", step: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" },
  blue: { badge: "border-blue-500/30 text-blue-400", stat: "text-blue-400", border: "border-blue-500", bg: "bg-blue-500/10", dot: "bg-blue-500", step: "bg-blue-500/20 border-blue-500/40 text-blue-400" },
  violet: { badge: "border-violet-500/30 text-violet-400", stat: "text-violet-400", border: "border-violet-500", bg: "bg-violet-500/10", dot: "bg-violet-500", step: "bg-violet-500/20 border-violet-500/40 text-violet-400" },
  rose: { badge: "border-rose-500/30 text-rose-400", stat: "text-rose-400", border: "border-rose-500", bg: "bg-rose-500/10", dot: "bg-rose-500", step: "bg-rose-500/20 border-rose-500/40 text-rose-400" },
  amber: { badge: "border-amber-500/30 text-amber-400", stat: "text-amber-400", border: "border-amber-500", bg: "bg-amber-500/10", dot: "bg-amber-500", step: "bg-amber-500/20 border-amber-500/40 text-amber-400" },
  teal: { badge: "border-teal-500/30 text-teal-400", stat: "text-teal-400", border: "border-teal-500", bg: "bg-teal-500/10", dot: "bg-teal-500", step: "bg-teal-500/20 border-teal-500/40 text-teal-400" },
  indigo: { badge: "border-indigo-500/30 text-indigo-400", stat: "text-indigo-400", border: "border-indigo-500", bg: "bg-indigo-500/10", dot: "bg-indigo-500", step: "bg-indigo-500/20 border-indigo-500/40 text-indigo-400" },
  cyan: { badge: "border-cyan-500/30 text-cyan-400", stat: "text-cyan-400", border: "border-cyan-500", bg: "bg-cyan-500/10", dot: "bg-cyan-500", step: "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" },
  pink: { badge: "border-pink-500/30 text-pink-400", stat: "text-pink-400", border: "border-pink-500", bg: "bg-pink-500/10", dot: "bg-pink-500", step: "bg-pink-500/20 border-pink-500/40 text-pink-400" },
  lime: { badge: "border-lime-500/30 text-lime-400", stat: "text-lime-400", border: "border-lime-500", bg: "bg-lime-500/10", dot: "bg-lime-500", step: "bg-lime-500/20 border-lime-500/40 text-lime-400" },
  sky: { badge: "border-sky-500/30 text-sky-400", stat: "text-sky-400", border: "border-sky-500", bg: "bg-sky-500/10", dot: "bg-sky-500", step: "bg-sky-500/20 border-sky-500/40 text-sky-400" },
  purple: { badge: "border-purple-500/30 text-purple-400", stat: "text-purple-400", border: "border-purple-500", bg: "bg-purple-500/10", dot: "bg-purple-500", step: "bg-purple-500/20 border-purple-500/40 text-purple-400" },
  orange: { badge: "border-orange-500/30 text-orange-400", stat: "text-orange-400", border: "border-orange-500", bg: "bg-orange-500/10", dot: "bg-orange-500", step: "bg-orange-500/20 border-orange-500/40 text-orange-400" },
};

const layerColorMap: Record<string, string> = {
  emerald: "from-emerald-900/50 border-emerald-500/30",
  blue: "from-blue-900/50 border-blue-500/30",
  violet: "from-violet-900/50 border-violet-500/30",
  purple: "from-purple-900/50 border-purple-500/30",
  cyan: "from-cyan-900/50 border-cyan-500/30",
  teal: "from-teal-900/50 border-teal-500/30",
  indigo: "from-indigo-900/50 border-indigo-500/30",
  amber: "from-amber-900/50 border-amber-500/30",
  rose: "from-rose-900/50 border-rose-500/30",
  pink: "from-pink-900/50 border-pink-500/30",
  slate: "from-slate-800/80 border-slate-600/40",
  green: "from-green-900/50 border-green-500/30",
  orange: "from-orange-900/50 border-orange-500/30",
  sky: "from-sky-900/50 border-sky-500/30",
  lime: "from-lime-900/50 border-lime-500/30",
};

const connectionTypeMap = {
  service: {
    cardBorder: "border-emerald-500/30 hover:border-emerald-500/70 hover:bg-emerald-500/5",
    tagBg: "bg-emerald-500/20", tagBorder: "border-emerald-500/50", tagText: "text-emerald-400",
    nameText: "text-emerald-400 group-hover:text-emerald-300",
    prefix: "/services/",
  },
  industry: {
    cardBorder: "border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-500/5",
    tagBg: "bg-blue-500/20", tagBorder: "border-blue-500/50", tagText: "text-blue-400",
    nameText: "text-blue-400 group-hover:text-blue-300",
    prefix: "/industries/",
  },
  intelligence: {
    cardBorder: "border-purple-500/30 hover:border-purple-500/70 hover:bg-purple-500/5",
    tagBg: "bg-purple-500/20", tagBorder: "border-purple-500/50", tagText: "text-purple-400",
    nameText: "text-purple-400 group-hover:text-purple-300",
    prefix: "/intelligence/",
  },
};

/* ─── Animated Counter ───────────────────────────────────── */
function AnimatedStat({ value, color }: { value: string; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`text-4xl font-bold ${color ?? "text-primary"}`}
    >
      {value}
    </motion.span>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export function CaseStudyV2({ data, children }: { data: CaseStudyV2Data; children?: React.ReactNode }) {
  const [activeStep, setActiveStep] = useState(0);
  const accent = accentMap[data.accentColor] ?? accentMap.emerald;

  return (
    <CaseStudyTemplate prevCase={data.prevCase} nextCase={data.nextCase}>

      {/* ── S1: Hero ─────────────────────────────────────── */}
      <section className={`pt-24 lg:pt-28 pb-16 ${data.gradientClasses} min-h-[85vh] flex items-center`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
            <nav className="flex items-center gap-2 text-sm text-white/50 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/25">/</span>
              <Link href="/case-studies/" className="hover:text-white/80 transition-colors">Case Studies</Link>
              <span className="text-white/25">/</span>
              <span className="text-white/80 font-semibold">{data.company}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={accent.badge}>
                    <Building2 className="w-3 h-3 mr-1" />
                    {data.industry}
                  </Badge>
                  <Badge variant="outline" className="border-slate-500/30 text-slate-400">
                    {data.subIndustry}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-hero-headline">
                  {data.heroHeadline}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-hero-subheadline">
                  {data.heroSubheadline}
                </p>

                <div className="flex flex-wrap gap-8 pt-2">
                  {data.heroStats.map((s, i) => (
                    <div key={i} className="text-center" data-testid={`stat-hero-${i}`}>
                      <AnimatedStat value={s.value} color={s.color ?? accent.stat} />
                      <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/contact/">
                    <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                      Build Similar System
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/case-studies/">
                    <Button size="lg" variant="outline" className="gap-2" data-testid="button-hero-cases">
                      More Case Studies
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right panel: custom children or default key-takeaways card */}
              <div>
                {children ? children : (
                  <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Star className={`w-5 h-5 ${accent.stat}`} />
                        <p className="text-xs uppercase tracking-widest text-slate-400">Key Outcomes</p>
                      </div>
                      <div className="space-y-4">
                        {data.keyTakeaways.map((t, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.12 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-300">{t}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S1b: Direct Answer (AEO) ─────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge className={`mb-4 ${accent.bg} ${accent.badge} border`}>
              <Brain className="w-3 h-3 mr-1" />
              Direct Answer
            </Badge>
            <h2 className="text-lg font-semibold text-slate-300 mb-3 italic">"{data.directAnswerQuestion}"</h2>
            <p className="text-base text-white leading-relaxed border-l-4 border-primary pl-4" data-testid="text-direct-answer">
              {data.directAnswer}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── S2: Client Context ───────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
              <Badge variant="outline" className={accent.badge}>
                <Globe className="w-3 h-3 mr-1" />
                About {data.company}
              </Badge>
              <h2 className="text-2xl font-bold">Client Context</h2>
              <p className="text-muted-foreground leading-relaxed">{data.clientDescription}</p>
            </div>
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-4">
                {data.clientFounded && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Founded</span>
                    <span className="font-medium">{data.clientFounded}</span>
                  </div>
                )}
                {data.clientSize && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Scale</span>
                    <span className="font-medium">{data.clientSize}</span>
                  </div>
                )}
                {data.clientLocation && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">HQ</span>
                    <span className="font-medium">{data.clientLocation}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="font-medium">{data.industry}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <Badge variant="outline" className={accent.badge}>{data.subIndustry}</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── S3: The Problem ──────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4">
                <AlertTriangle className="w-3 h-3 mr-1" />
                The Problem
              </Badge>
              <h2 className="text-3xl font-bold mb-4">{data.problemTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{data.problemDescription}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {data.painPoints.map((pp, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className={`border-${pp.color ?? "amber"}-500/20 h-full`} data-testid={`card-pain-point-${i}`}>
                    <CardContent className="p-6 text-center space-y-3">
                      <p className={`text-3xl font-bold text-${pp.color ?? "amber"}-400`}>{pp.stat}</p>
                      <p className="font-semibold">{pp.title}</p>
                      <p className="text-sm text-muted-foreground">{pp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S4: Solution Overview ─────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="max-w-3xl">
              <Badge variant="outline" className={`${accent.badge} mb-4`}>
                <Zap className="w-3 h-3 mr-1" />
                The Solution
              </Badge>
              <h2 className="text-3xl font-bold mb-4">{data.solutionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">{data.solutionDescription}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.solutionComponents.map((comp, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className={`border-border/50 hover:${accent.border} transition-colors h-full`} data-testid={`card-solution-${i}`}>
                    <CardContent className="p-5 space-y-2">
                      <div className={`w-8 h-8 rounded-lg ${accent.bg} flex items-center justify-center mb-3`}>
                        <span className={`text-sm font-bold ${accent.stat}`}>{i + 1}</span>
                      </div>
                      <p className="font-semibold text-sm">{comp.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{comp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S5: Architecture ─────────────────────────────── */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="text-center">
              <Badge className={`mb-4 ${accent.bg} ${accent.badge} border`}>
                <Layers className="w-3 h-3 mr-1" />
                System Architecture
              </Badge>
              <h2 className="text-3xl font-bold text-white">{data.architectureTitle}</h2>
            </div>

            <div className="space-y-3">
              {data.architectureLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`bg-gradient-to-r ${layerColorMap[layer.color] ?? layerColorMap.slate} border rounded-xl p-5`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-2 h-2 rounded-full bg-${layer.color}-400`} />
                      <span className={`text-xs font-semibold uppercase tracking-widest text-${layer.color}-400`}>{layer.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {layer.components.map((c, j) => (
                        <Badge key={j} variant="outline" className="border-slate-600 text-slate-300 bg-slate-800/50 text-xs">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S6: Results ──────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
            <div className="text-center">
              <Badge variant="outline" className={`${accent.badge} mb-4`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                Results
              </Badge>
              <h2 className="text-3xl font-bold">{data.resultsTitle}</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.resultsMetrics.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className={`text-center border-${m.color}-500/20 h-full`} data-testid={`card-result-${i}`}>
                    <CardContent className="p-6 space-y-2">
                      <AnimatedStat value={m.value} color={`text-${m.color}-400`} />
                      <p className="font-semibold text-sm">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {data.resultsQuote && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card className={`${accent.bg} border ${accent.border}/30 max-w-3xl mx-auto`}>
                  <CardContent className="p-8">
                    <Quote className={`w-8 h-8 ${accent.stat} mb-4`} />
                    <p className="text-lg italic text-foreground leading-relaxed mb-4">"{data.resultsQuote.text}"</p>
                    <div>
                      <p className="font-semibold">{data.resultsQuote.author}</p>
                      <p className="text-sm text-muted-foreground">{data.resultsQuote.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── S7: How It Works ─────────────────────────────── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="text-center">
              <Badge variant="outline" className={`${accent.badge} mb-4`}>
                <Settings className="w-3 h-3 mr-1" />
                How It Works
              </Badge>
              <h2 className="text-3xl font-bold">{data.howItWorksTitle}</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Step Selector */}
              <div className="space-y-2">
                {data.steps.map((step, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveStep(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${activeStep === i ? `${accent.step} border` : "border-border/50 hover:border-border bg-card"}`}
                    data-testid={`button-step-${i}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${activeStep === i ? `${accent.bg} ${accent.stat} border ${accent.border}/50` : "bg-muted text-muted-foreground"}`}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Step Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`${accent.bg} border ${accent.border}/30`}>
                    <CardContent className="p-8 space-y-4">
                      <div className={`w-12 h-12 rounded-xl ${accent.bg} flex items-center justify-center text-xl font-bold ${accent.stat} border ${accent.border}/30`}>
                        {activeStep + 1}
                      </div>
                      <h3 className="text-xl font-bold">{data.steps[activeStep].title}</h3>
                      <p className="text-sm text-muted-foreground">{data.steps[activeStep].description}</p>
                      <div className="border-t border-border/30 pt-4">
                        <p className="text-sm leading-relaxed">{data.steps[activeStep].detail}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S8: Why It Worked ────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
            <div className="text-center">
              <Badge variant="outline" className={`${accent.badge} mb-4`}>
                <Star className="w-3 h-3 mr-1" />
                Why It Worked
              </Badge>
              <h2 className="text-3xl font-bold">{data.whyItWorkedTitle}</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.whyFactors.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-border/50 h-full hover:shadow-lg transition-shadow" data-testid={`card-why-${i}`}>
                    <CardContent className="p-6 space-y-3">
                      <div className={`w-8 h-8 rounded-full ${accent.bg} flex items-center justify-center`}>
                        <CheckCircle2 className={`w-4 h-4 ${accent.stat}`} />
                      </div>
                      <p className="font-semibold">{f.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S9: Limitations ──────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Honest Limitations
              </Badge>
              <h2 className="text-3xl font-bold mb-2">What This System Doesn't Do Well</h2>
              <p className="text-muted-foreground">Every AI system has constraints. Here's what to know before building something similar.</p>
            </div>

            <div className="space-y-4">
              {data.limitations.map((lim, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="border-amber-500/10" data-testid={`card-limit-${i}`}>
                    <CardContent className="p-5 flex items-start gap-4">
                      <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">{lim.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{lim.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S10: When To Use ─────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="text-center">
              <Badge variant="outline" className={`${accent.badge} mb-4`}>
                <Users className="w-3 h-3 mr-1" />
                When To Use This Approach
              </Badge>
              <h2 className="text-3xl font-bold">Is This Right For Your Business?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-5 h-5" />
                    Good Fit If You...
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.whenToUseGoodFit.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2 text-lg">
                    <XCircle className="w-5 h-5" />
                    Not A Good Fit If You...
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.whenToUseNotGoodFit.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S11: System Connections ───────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <Badge variant="outline" className={`${accent.badge} mb-4`}>
                <Link2 className="w-3 h-3 mr-1" />
                Related AI Systems
              </Badge>
              <h2 className="text-3xl font-bold mb-2">Connected Capabilities</h2>
              <p className="text-muted-foreground">Explore the services, industry solutions, and intelligence types that power this system.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.connections.map((conn, i) => {
                const cm = connectionTypeMap[conn.type];
                const href = `${cm.prefix}${conn.slug}/`;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <Link href={href}>
                      <Card className={`border-2 transition-all duration-200 cursor-pointer group ${cm.cardBorder}`} data-testid={`card-connection-${i}`}>
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${cm.tagBg} ${cm.tagBorder} ${cm.tagText}`}>
                              {conn.type}
                            </span>
                            <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 ${cm.tagText}`} />
                          </div>
                          <p className={`font-bold text-sm transition-colors ${cm.nameText}`}>{conn.name}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{conn.relevance}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S12a: CTA ────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <CtaForm
            headline={`Build a Similar ${data.subIndustry} System`}
            subheadline={`Our AI architects have built systems like the one deployed at ${data.company}. Let's explore what's possible for your organization.`}
            badgeText="Free Architecture Review"
            submitLabel={`Start My ${data.subIndustry} Project`}
            contextNote={`Referencing the ${data.company} case study`}
          />
        </div>
      </section>

      {/* ── S12b: FAQ ────────────────────────────────────── */}
      <FAQSection
        faqs={data.faqs}
        title={`${data.company} AI Case Study — FAQ`}
        subtitle={`Common questions about building ${data.subIndustry.toLowerCase()} systems like the one deployed at ${data.company}.`}
      />
    </CaseStudyTemplate>
  );
}
