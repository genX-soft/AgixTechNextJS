'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Target,
  TrendingUp,
  Clock,
  FileText,
  Quote,
  BarChart3,
  Briefcase,
  Globe,
  Zap,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Filter,
  FileSearch,
  Activity,
  Eye,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";

export default function AlphaSenseCaseStudyPage() {
  const [selectedSource, setSelectedSource] = useState("earnings");
  const [activeSignal, setActiveSignal] = useState<number | null>(null);

  const sources = [
    { id: "earnings", name: "Earnings Calls", count: "50K+", icon: Briefcase, insights: 847 },
    { id: "filings", name: "SEC Filings", count: "2M+", icon: FileText, insights: 1234 },
    { id: "research", name: "Research Reports", count: "300K+", icon: BarChart3, insights: 562 },
    { id: "news", name: "News & Media", count: "10M+", icon: Globe, insights: 2891 },
  ];

  const signals = [
    { company: "NVIDIA", type: "positive", signal: "AI infrastructure demand exceeding supply", confidence: 94, sentiment: "+12.4%", source: "Q3 Earnings Call" },
    { company: "Microsoft", type: "positive", signal: "Azure AI revenue growing 3x YoY", confidence: 91, sentiment: "+8.7%", source: "10-K Filing" },
    { company: "Tesla", type: "negative", signal: "Margin compression concerns from pricing actions", confidence: 87, sentiment: "-5.2%", source: "Analyst Report" },
    { company: "Apple", type: "neutral", signal: "iPhone demand stable but Vision Pro timeline uncertain", confidence: 82, sentiment: "+1.1%", source: "Supply Chain Intel" },
    { company: "Amazon", type: "positive", signal: "AWS cost optimization driving customer wins", confidence: 89, sentiment: "+6.8%", source: "Q4 Earnings Call" },
  ];

  const searchDemo = [
    { query: "AI infrastructure spending trends", results: "847 insights across 234 companies" },
    { query: "supply chain disruption risks", results: "1,234 mentions with sentiment analysis" },
    { query: "margin pressure semiconductor", results: "562 relevant documents flagged" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-emerald-500/5 to-green-500/10 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Link href="/case-studies">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-cases">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    <Search className="w-3 h-3 mr-1" />
                    Market Intelligence
                  </Badge>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    NLP Analytics
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  AlphaSense
                </h1>

                <p className="text-xl text-muted-foreground">
                  AI that transforms millions of documents into actionable investment insights—
                  97% faster research with +500% analyst productivity.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">97%</p>
                    <p className="text-sm text-muted-foreground">Faster Research</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">10K+</p>
                    <p className="text-sm text-muted-foreground">Data Sources</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">+500%</p>
                    <p className="text-sm text-muted-foreground">Analyst Productivity</p>
                  </div>
                </div>
              </div>

              {/* Signal Detection Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-emerald-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Live Signals</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { company: "NVIDIA", signal: "AI demand exceeding supply", type: "+12.4%" },
                      { company: "Microsoft", signal: "Azure AI growing 3x YoY", type: "+8.7%" },
                      { company: "Amazon", signal: "AWS optimization driving wins", type: "+6.8%" },
                    ].map((sig, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{sig.company}</p>
                          <p className="text-xs text-slate-400">{sig.signal}</p>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {sig.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16">
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

            <h2 className="text-3xl font-bold">Analysts Drowning in Information Overload</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Investment analysts were spending 80% of their time hunting for information buried in 
              earnings transcripts, SEC filings, and research reports—leaving only 20% for actual analysis. 
              Critical signals were being missed because no human could read 10,000+ documents fast enough. 
              Competitor moves, management sentiment shifts, and market-moving insights were hiding in plain sight.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <FileSearch className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">80%</p>
                  <p className="text-sm text-muted-foreground">Time spent finding info</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">10K+</p>
                  <p className="text-sm text-muted-foreground">Documents to review daily</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">47%</p>
                  <p className="text-sm text-muted-foreground">Critical signals missed</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Brain className="w-3 h-3 mr-1" />
              Analyst Cockpit
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Market Intelligence Command Center</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              Real-time signal detection across 10,000+ sources with AI-powered sentiment scoring
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Data Sources</p>
              {sources.map((source) => (
                <motion.div key={source.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`cursor-pointer transition-all ${selectedSource === source.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                    onClick={() => setSelectedSource(source.id)}
                    data-testid={`source-${source.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedSource === source.id ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}>
                          <source.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{source.name}</p>
                          <p className="text-xs text-slate-400">{source.count} documents</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {source.insights} signals
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Card className="border-slate-700 bg-slate-800/50 h-full">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-400" />
                      Live Signal Feed
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                      Real-time
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {signals.map((signal, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onHoverStart={() => setActiveSignal(i)}
                      onHoverEnd={() => setActiveSignal(null)}
                      className={`p-4 rounded-lg transition-all ${
                        activeSignal === i ? 'bg-slate-700' : 'bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            signal.type === 'positive' ? 'bg-green-500/20' :
                            signal.type === 'negative' ? 'bg-red-500/20' :
                            'bg-slate-600'
                          }`}>
                            {signal.type === 'positive' ? (
                              <ArrowUpRight className="w-5 h-5 text-green-400" />
                            ) : signal.type === 'negative' ? (
                              <ArrowDownRight className="w-5 h-5 text-red-400" />
                            ) : (
                              <TrendingUp className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-white">{signal.company}</span>
                              <Badge variant="outline" className="text-xs border-slate-600">{signal.source}</Badge>
                            </div>
                            <p className="text-sm text-slate-300">{signal.signal}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={signal.confidence} className="h-1 w-16" />
                              <span className="text-xs text-slate-400">{signal.confidence}% confidence</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${
                          signal.type === 'positive' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          signal.type === 'negative' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          'bg-slate-600 text-slate-300 border-slate-500'
                        }`}>
                          {signal.sentiment}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              <Filter className="w-3 h-3 mr-1" />
              Smart Search
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Semantic Search Intelligence</h2>
            <p className="text-muted-foreground mt-2">Natural language queries across millions of documents in milliseconds</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {searchDemo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="hover:border-emerald-500/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Search className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="flex-1">
                        <p className="font-mono text-sm text-emerald-400">"{item.query}"</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.results}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-emerald-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-green-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-emerald-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Before AlphaSense, our analysts spent 80% of their time finding information and 20% analyzing it. Now those ratios are flipped. The AI surfaces signals from earnings calls, filings, and research that would take humans weeks to discover—and it does it in seconds with context and sentiment scoring."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold">
                  SR
                </div>
                <div>
                  <p className="font-semibold">Sarah Richardson</p>
                  <p className="text-sm text-muted-foreground">Director of Research Intelligence, AlphaSense</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Market Intelligence AI?</h2>
          <p className="text-slate-400 mb-8">
            Let's create research systems that give analysts superpowers.
          </p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/hungryroot">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Hungryroot
            </Button>
          </Link>
          <Link href="/case-studies/mindtrip">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Mindtrip
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
