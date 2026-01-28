'use client'
import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Brain,
  Clock,
  AlertTriangle,
  TrendingUp,
  Quote,
  ArrowRight,
  Target,
  Eye,
  Layers,
  BarChart3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default function OcrolusCaseStudyPage() {
  const documentTypes = [
    { type: "Bank Statements", accuracy: "99.2%", volume: "2.4M/month", challenge: "10,000+ unique formats" },
    { type: "Pay Stubs", accuracy: "98.7%", volume: "1.8M/month", challenge: "Payroll provider variations" },
    { type: "Tax Returns", accuracy: "99.4%", volume: "890K/month", challenge: "Year-to-year changes" },
    { type: "Business Financials", accuracy: "98.1%", volume: "620K/month", challenge: "Custom accounting formats" },
  ];

  const pipelineStages = [
    { stage: "Ingestion", time: "0.2s", description: "Multi-format upload (PDF, image, fax)" },
    { stage: "Classification", time: "0.8s", description: "AI identifies document type" },
    { stage: "Extraction", time: "2.1s", description: "OCR + ML extracts fields" },
    { stage: "Validation", time: "1.2s", description: "Cross-reference checks" },
    { stage: "Delivery", time: "0.4s", description: "Structured JSON output" },
  ];

  const accuracyComparison = [
    { metric: "Overall Accuracy", traditional: "87%", ocrolus: "99.2%", improvement: "+12.2%" },
    { metric: "Handwriting Recognition", traditional: "62%", ocrolus: "94%", improvement: "+32%" },
    { metric: "Low-Quality Scans", traditional: "71%", ocrolus: "96%", improvement: "+25%" },
    { metric: "New Format Handling", traditional: "0%", ocrolus: "91%", improvement: "New capability" },
    { metric: "Fraud Detection", traditional: "45%", ocrolus: "89%", improvement: "+44%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero - Document Focus */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-blue-500/5 to-purple-500/10 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Link href="/case-studies/">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-cases">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    <FileText className="w-3 h-3 mr-1" />
                    Document AI
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    Fintech Infrastructure
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Ocrolus
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Processing 6+ million financial documents monthly with 99%+ accuracy—turning 
                  unstructured bank statements, pay stubs, and tax returns into verified data lenders can trust.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">99.2%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">6M+</p>
                    <p className="text-sm text-muted-foreground">Docs/Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">&lt;5s</p>
                    <p className="text-sm text-muted-foreground">Processing Time</p>
                  </div>
                </div>
              </div>

              {/* Document Pipeline Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">Document Pipeline</p>
                  <div className="space-y-3">
                    {pipelineStages.map((stage, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{stage.stage}</p>
                          <p className="text-xs text-slate-400">{stage.description}</p>
                        </div>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                          {stage.time}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Challenge
            </Badge>

            <h2 className="text-3xl font-bold">When Every Document Is Different</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Financial documents come in thousands of formats. Each bank has its own statement layout. 
              Pay stubs vary by payroll provider. Tax forms change yearly. Traditional OCR breaks down 
              when it can't anticipate the structure—and in lending, one wrong number can change a credit decision.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 space-y-4">
                  <Eye className="w-8 h-8 text-red-400" />
                  <h4 className="font-semibold">The OCR Problem</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard OCR reads text but doesn't understand context. "$1,234.56" could be 
                    a deposit, withdrawal, balance, or fee. Without understanding document structure, 
                    extraction fails in unpredictable ways.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-500/20">
                <CardContent className="p-6 space-y-4">
                  <Layers className="w-8 h-8 text-amber-400" />
                  <h4 className="font-semibold">The Scale Problem</h4>
                  <p className="text-sm text-muted-foreground">
                    Lenders need results in seconds, not hours. Manual review doesn't scale. 
                    Ocrolus was spending 2,000+ hours monthly on manual QA review—and still 
                    missing edge cases.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 rounded-lg bg-muted/50 border border-border">
              <p className="text-muted-foreground italic">
                "We had a QA team manually reviewing extractions, and they were drowning. Every 
                new bank format meant more edge cases. We needed AI that could learn from 
                corrections automatically—not just follow rules."
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                — Rachel Martinez, Director of Data Operations
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Document Type Accuracy - Unique Visual */}
      <section className="py-24 bg-gradient-to-br from-blue-500/5 via-background to-purple-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                <Target className="w-3 h-3 mr-1" />
                Accuracy by Document Type
              </Badge>
              <h2 className="text-3xl font-bold">Precision Across Document Categories</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {documentTypes.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-blue-400" />
                          <h4 className="font-semibold">{doc.type}</h4>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-lg font-bold">
                          {doc.accuracy}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Monthly Volume</span>
                          <span className="font-medium text-foreground">{doc.volume}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Key Challenge</span>
                          <span className="font-medium text-amber-400">{doc.challenge}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accuracy Comparison Table */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                <Brain className="w-3 h-3 mr-1" />
                Performance Comparison
              </Badge>
              <h2 className="text-3xl font-bold">Traditional OCR vs. Ocrolus AI</h2>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-4 bg-muted/50 p-4 font-semibold text-sm border-b border-border">
                  <div>Metric</div>
                  <div className="text-center text-red-400">Traditional OCR</div>
                  <div className="text-center text-green-400">Ocrolus AI</div>
                  <div className="text-center">Improvement</div>
                </div>
                {accuracyComparison.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-4 p-4 text-sm border-b border-border last:border-b-0"
                  >
                    <div className="font-medium">{row.metric}</div>
                    <div className="text-center text-muted-foreground flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      {row.traditional}
                    </div>
                    <div className="text-center font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      {row.ocrolus}
                    </div>
                    <div className="text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {row.improvement}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <BarChart3 className="w-3 h-3 mr-1" />
                Business Impact
              </Badge>
              <h2 className="text-3xl font-bold text-white">Transformation Metrics</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-white">-78%</p>
                  <p className="text-sm text-slate-400 mt-2">Manual Review</p>
                  <p className="text-xs text-slate-500 mt-1">1,560 hours saved/month</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-white">&lt;5s</p>
                  <p className="text-sm text-slate-400 mt-2">Processing Time</p>
                  <p className="text-xs text-slate-500 mt-1">Down from 3+ minutes</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-white">$1.8M</p>
                  <p className="text-sm text-slate-400 mt-2">Annual Savings</p>
                  <p className="text-xs text-slate-500 mt-1">Labor cost reduction</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-white">89%</p>
                  <p className="text-sm text-slate-400 mt-2">Fraud Detection</p>
                  <p className="text-xs text-slate-500 mt-1">Altered document catch rate</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial - Director Level */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-blue-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-blue-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "The breakthrough was the continuous learning system. Every time our QA team 
                  corrects an extraction, the model learns from it. We've gone from needing 
                  rules for every edge case to having AI that adapts to new formats automatically. 
                  Last month we handled a new bank format with zero manual template work."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    RM
                  </div>
                  <div>
                    <p className="font-semibold">Rachel Martinez</p>
                    <p className="text-sm text-muted-foreground">Director of Data Operations, Ocrolus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Need Document AI That Actually Works?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We build document processing systems that learn from corrections and 
              handle new formats automatically.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/dave/">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Dave
              </Button>
            </Link>
            <Link href="/case-studies/babylon-health/">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Babylon Health
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
