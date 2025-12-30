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
  Globe,
  Target,
  Clock,
  TrendingUp,
  Quote,
  Languages,
  FileText,
  CheckCircle2,
  BarChart3,
  Sparkles,
  ShoppingCart,
  Wand2,
  Eye,
  Copy,
  RefreshCw,
  AlertTriangle,
  XCircle,
  Search,
} from "lucide-react";
import Link from "next/link";

export default function NaratixCaseStudyPage() {
  const [selectedMarket, setSelectedMarket] = useState("germany");
  const [showTranslation, setShowTranslation] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const markets = [
    { id: "germany", name: "Germany", flag: "DE", conversion: { before: "2.1%", after: "4.8%", lift: "+129%" }, sample: "Premium kabellose Ohrh\u00f6rer mit aktiver Ger\u00e4uschunterdr\u00fcckung f\u00fcr kristallklaren Sound bei Telefonaten und Musik." },
    { id: "france", name: "France", flag: "FR", conversion: { before: "1.9%", after: "4.2%", lift: "+121%" }, sample: "\u00c9couteurs sans fil premium avec r\u00e9duction de bruit active. Un son cristallin pour vos appels et votre musique." },
    { id: "japan", name: "Japan", flag: "JP", conversion: { before: "1.4%", after: "3.6%", lift: "+157%" }, sample: "\u30d7\u30ec\u30df\u30a2\u30e0\u30ef\u30a4\u30e4\u30ec\u30b9\u30a4\u30e4\u30db\u30f3\u3002\u30a2\u30af\u30c6\u30a3\u30d6\u30ce\u30a4\u30ba\u30ad\u30e3\u30f3\u30bb\u30ea\u30f3\u30b0\u642d\u8f09\u3002" },
    { id: "brazil", name: "Brazil", flag: "BR", conversion: { before: "1.8%", after: "4.4%", lift: "+144%" }, sample: "Fones de ouvido sem fio premium com cancelamento de ru\u00eddo ativo. Som cristalino para chamadas e m\u00fasica." },
    { id: "spain", name: "Spain", flag: "ES", conversion: { before: "2.3%", after: "5.1%", lift: "+122%" }, sample: "Auriculares inal\u00e1mbricos premium con cancelaci\u00f3n activa de ruido. Sonido cristalino para llamadas y m\u00fasica." },
  ];

  const pipelineSteps = [
    { name: "Ingest", desc: "Product data imported", icon: FileText, status: "complete" },
    { name: "Generate", desc: "AI creates optimized copy", icon: Sparkles, status: "complete" },
    { name: "Localize", desc: "Adapt for 28 markets", icon: Languages, status: "active" },
    { name: "Publish", desc: "Deploy to all channels", icon: Globe, status: "pending" },
  ];

  const qualityMetrics = [
    { metric: "Semantic Accuracy", score: 98, target: 95 },
    { metric: "Cultural Adaptation", score: 96, target: 90 },
    { metric: "Brand Voice Consistency", score: 97, target: 95 },
    { metric: "SEO Optimization", score: 94, target: 90 },
    { metric: "Legal Compliance", score: 100, target: 100 },
  ];

  const currentMarket = markets.find(m => m.id === selectedMarket) || markets[0];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-fuchsia-500/5 to-purple-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400">
                    <Languages className="w-3 h-3 mr-1" />
                    Content AI
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    Localization
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Naratix
                </h1>

                <p className="text-xl text-muted-foreground">
                  From weeks of translation work to minutes. Naratix uses AI to generate 
                  culturally-adapted product content for 28 markets—driving +129% conversion uplift.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-fuchsia-400">96%</p>
                    <p className="text-sm text-muted-foreground">Faster Creation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">28</p>
                    <p className="text-sm text-muted-foreground">Markets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">+129%</p>
                    <p className="text-sm text-muted-foreground">Conversion Lift</p>
                  </div>
                </div>
              </div>

              {/* Market Quality Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-6 h-6 text-fuchsia-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Quality Scores</p>
                  </div>
                  <div className="space-y-3">
                    {qualityMetrics.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">{item.metric}</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {item.score}%
                          </Badge>
                        </div>
                        <Progress value={item.score} className="h-1" />
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

            <h2 className="text-3xl font-bold">Global E-Commerce with Localization Bottlenecks</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expanding to new markets meant weeks of translation work, cultural adaptation, and legal 
              review for every product. Cart abandonment spiked when shoppers couldn't find products 
              in their language, and poorly-translated descriptions killed trust and conversions. 
              The choice was brutal: move fast with bad content, or move slow and lose the market window.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">68%</p>
                  <p className="text-sm text-muted-foreground">Cart abandonment rate</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Search className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">3.2 min</p>
                  <p className="text-sm text-muted-foreground">Avg product discovery time</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">6 weeks</p>
                  <p className="text-sm text-muted-foreground">Content localization time</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Generation Studio - Unique Structure */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30">
              <Wand2 className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Content Automation Studio</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              See how AI transforms a single product description into 28 market-ready versions
            </p>
          </div>

          {/* Pipeline Visualization */}
          <div className="mb-10">
            <div className="grid grid-cols-4 gap-4">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveStep(i)}
                  className="cursor-pointer"
                >
                  <Card className={`text-center transition-all ${
                    activeStep === i ? 'border-fuchsia-500 bg-fuchsia-500/10' :
                    step.status === 'complete' ? 'border-green-500/30' :
                    'border-slate-700'
                  }`}>
                    <CardContent className="p-4">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                        step.status === 'complete' ? 'bg-green-500' :
                        step.status === 'active' ? 'bg-fuchsia-500 animate-pulse' :
                        'bg-slate-700'
                      }`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-semibold text-white">{step.name}</p>
                      <p className="text-xs text-slate-400">{step.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Source Content */}
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-fuchsia-400" />
                  Source Content (English)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
                  <p className="text-slate-300">
                    Premium wireless earbuds with active noise cancellation. Crystal-clear audio for work calls and immersive music. 24-hour battery life with charging case. IPX4 water resistant.
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => setShowTranslation(!showTranslation)}
                    data-testid="button-generate"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Localizations
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Localized Output */}
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    Localized Output
                  </CardTitle>
                  <div className="flex gap-1">
                    {markets.map((market) => (
                      <Button
                        key={market.id}
                        variant={selectedMarket === market.id ? "default" : "ghost"}
                        size="sm"
                        className={selectedMarket === market.id ? "bg-fuchsia-500" : "text-slate-400"}
                        onClick={() => setSelectedMarket(market.id)}
                        data-testid={`market-${market.id}`}
                      >
                        {market.flag}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMarket}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg bg-slate-900 border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30">
                        {currentMarket.name}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        98% quality score
                      </Badge>
                    </div>
                    <p className="text-slate-300">{currentMarket.sample}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-400 font-medium">Conversion Impact</p>
                      <p className="text-xs text-slate-400">{currentMarket.conversion.before} → {currentMarket.conversion.after}</p>
                    </div>
                    <Badge className="bg-green-500 text-white text-lg">
                      {currentMarket.conversion.lift}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Assurance Dashboard */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Quality Assurance
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Localization Quality Inspector</h2>
            <p className="text-muted-foreground mt-2">AI-powered quality scoring ensures brand consistency across all markets</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-fuchsia-400" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {qualityMetrics.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.metric}</span>
                      <span className={item.score >= item.target ? "text-green-400" : "text-amber-400"}>
                        {item.score}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500"
                      />
                      <div
                        className="absolute top-0 h-full w-0.5 bg-muted-foreground"
                        style={{ left: `${item.target}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Target: {item.target}%</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Market Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Market Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {markets.map((market, i) => (
                  <motion.div
                    key={market.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">{market.flag}</Badge>
                      <span className="font-medium">{market.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{market.conversion.before}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="font-semibold text-green-400">{market.conversion.after}</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {market.conversion.lift}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gradient-to-b from-background to-fuchsia-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/5 to-purple-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-fuchsia-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Going global used to mean hiring armies of copywriters and translators, then waiting weeks for content. Our AI generates localized product content for 28 markets in minutes—and it actually converts better because it understands each market's buying psychology, not just their language."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  LT
                </div>
                <div>
                  <p className="font-semibold">Lucas Torres</p>
                  <p className="text-sm text-muted-foreground">Director of Global Content Operations, Naratix</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building AI for Global Content?</h2>
          <p className="text-slate-400 mb-8">
            Let's create localization systems that drive conversions in every market.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/ulta-beauty">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Ulta Beauty
            </Button>
          </Link>
          <Link href="/case-studies/polyai">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              PolyAI
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
