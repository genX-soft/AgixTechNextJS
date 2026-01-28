'use client'
import { MainFooter } from "@/components/main-footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Heart,
  Gift,
  Quote,
  CheckCircle2,
  Star,
  ShoppingBag,
  Mail,
  Crown,
  Palette,
  Eye,
  ChevronRight,
  AlertTriangle,
  Frown,
  Layers,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";

export default function UltaBeautyCaseStudyPage() {
  const [selectedSegment, setSelectedSegment] = useState("enthusiasts");
  const [hoveredJourney, setHoveredJourney] = useState<number | null>(null);

  const segments = [
    { 
      id: "enthusiasts", 
      name: "Beauty Enthusiasts", 
      size: "8.2M members",
      avgSpend: "$127",
      engagement: "+234%",
      topCategories: ["Prestige Makeup", "Fragrance", "Hair Tools"],
      aiAction: "High-touch personalization with new product launches"
    },
    { 
      id: "skincare", 
      name: "Skincare Focus", 
      size: "6.1M members",
      avgSpend: "$94",
      engagement: "+189%",
      topCategories: ["Clinical Skincare", "Clean Beauty", "SPF"],
      aiAction: "Routine building recommendations with ingredient matching"
    },
    { 
      id: "fragrance", 
      name: "Fragrance Collectors", 
      size: "4.8M members",
      avgSpend: "$156",
      engagement: "+156%",
      topCategories: ["Designer Fragrance", "Niche Brands", "Discovery Sets"],
      aiAction: "Seasonal collection alerts with personalized scent profiles"
    },
    { 
      id: "value", 
      name: "Value Seekers", 
      size: "11.4M members",
      avgSpend: "$52",
      engagement: "+112%",
      topCategories: ["Drugstore", "BOGO Offers", "Travel Size"],
      aiAction: "Points multiplier events timed to purchase cycles"
    },
  ];

  const journeyStages = [
    { 
      stage: "Awareness",
      before: { tactic: "Generic ads", conversion: "1.2%" },
      after: { tactic: "Personalized discovery", conversion: "3.8%" },
      aiCapability: "Look-alike modeling from purchase history"
    },
    { 
      stage: "Engagement", 
      before: { tactic: "Mass emails", openRate: "12%" },
      after: { tactic: "Behavior-triggered content", openRate: "41%" },
      aiCapability: "Send-time optimization per member"
    },
    { 
      stage: "Conversion", 
      before: { tactic: "Static offers", rate: "3.2%" },
      after: { tactic: "Dynamic personalization", rate: "8.7%" },
      aiCapability: "Next-best-action recommendations"
    },
    { 
      stage: "Retention", 
      before: { tactic: "Win-back campaigns", churn: "28%" },
      after: { tactic: "Preemptive engagement", churn: "12%" },
      aiCapability: "Churn risk scoring with intervention triggers"
    },
  ];

  const currentSegment = segments.find(s => s.id === selectedSegment) || segments[0];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-pink-500/5 to-purple-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                    <Palette className="w-3 h-3 mr-1" />
                    Retail AI
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    Loyalty Optimization
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Ulta Beauty
                </h1>

                <p className="text-xl text-muted-foreground">
                  Transforming Ultamate Rewards from a points program into a personalization 
                  engine that drives +172% campaign conversion and -57% customer churn.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-pink-400">+172%</p>
                    <p className="text-sm text-muted-foreground">Campaign Conversion</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">37M</p>
                    <p className="text-sm text-muted-foreground">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-57%</p>
                    <p className="text-sm text-muted-foreground">Customer Churn</p>
                  </div>
                </div>
              </div>

              {/* Segment Intelligence Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Crown className="w-6 h-6 text-pink-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Top Segments</p>
                  </div>
                  <div className="space-y-3">
                    {segments.slice(0, 4).map((segment, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{segment.name}</p>
                          <p className="text-xs text-slate-400">{segment.size}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {segment.engagement}
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

            <h2 className="text-3xl font-bold">37 Million Members, Zero Personalization</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ulta Beauty had built one of the largest beauty loyalty programs in America—but 
              treated every member the same. Skincare enthusiasts received fragrance promotions. 
              Value seekers got prestige brand emails. The result? Overwhelming product catalogs, 
              impersonal recommendations, and conversion rates that left billions on the table.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Frown className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">12%</p>
                  <p className="text-sm text-muted-foreground">Email open rate</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Layers className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">25K+</p>
                  <p className="text-sm text-muted-foreground">Products with no guidance</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <TrendingDown className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">3.2%</p>
                  <p className="text-sm text-muted-foreground">Campaign conversion rate</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Segment Intelligence - Unique Structure */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-pink-500/20 text-pink-400 border-pink-500/30">
              <Crown className="w-3 h-3 mr-1" />
              Segment Intelligence
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">AI Customer Segmentation</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              Click to explore how AI tailors engagement for each member segment
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Segment Selector */}
            <div className="space-y-3">
              {segments.map((segment) => (
                <motion.div key={segment.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`cursor-pointer transition-all ${selectedSegment === segment.id ? 'border-pink-500 bg-pink-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                    onClick={() => setSelectedSegment(segment.id)}
                    data-testid={`segment-${segment.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{segment.name}</p>
                          <p className="text-sm text-slate-400">{segment.size}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {segment.engagement}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Segment Details */}
            <div className="lg:col-span-2">
              <Card className="border-slate-700 bg-slate-800/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Star className="w-5 h-5 text-pink-400" />
                    {currentSegment.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-700/50">
                      <p className="text-xs text-slate-400">Avg. Spend</p>
                      <p className="text-2xl font-bold text-white">{currentSegment.avgSpend}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-700/50">
                      <p className="text-xs text-slate-400">Segment Size</p>
                      <p className="text-2xl font-bold text-white">{currentSegment.size}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400 mb-3">Top Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {currentSegment.topCategories.map((cat, i) => (
                        <Badge key={i} variant="outline" className="border-pink-500/30 text-pink-400">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-pink-400 mb-1">AI Strategy</p>
                        <p className="text-sm text-slate-300">{currentSegment.aiAction}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400 mb-3">Sample Personalized Offer</p>
                    <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-pink-400" />
                          <span className="text-sm font-medium text-pink-400">Email Preview</span>
                        </div>
                        <p className="text-sm italic text-slate-300">
                          {currentSegment.id === "enthusiasts" && "\"Sarah, Charlotte Tilbury just dropped their Holiday Collection. Based on your love of their Pillow Talk line, here's exclusive early access + 2X points today only.\""}
                          {currentSegment.id === "skincare" && "\"Emma, we noticed you're running low on your Sunday Riley Good Genes. Reorder now and we'll add a free travel-size Drunk Elephant moisturizer that pairs perfectly.\""}
                          {currentSegment.id === "fragrance" && "\"Michael, the new Tom Ford Oud Wood collection is here. As a fragrance enthusiast, get first access to the discovery set before it sells out.\""}
                          {currentSegment.id === "value" && "\"Lisa, your favorite NYX products are part of our Buy 2 Get 1 Free event. Plus, you're 150 points from Diamond status - this purchase would get you there!\""}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Journey Transformation */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Journey Transformation
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Before vs After AI</h2>
            <p className="text-muted-foreground mt-2">Hover to see the AI capabilities driving each improvement</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {journeyStages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onHoverStart={() => setHoveredJourney(i)}
                onHoverEnd={() => setHoveredJourney(null)}
              >
                <Card className={`h-full transition-all ${hoveredJourney === i ? 'border-pink-500 scale-105' : ''}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
                        {i + 1}
                      </div>
                      {stage.stage}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-xs text-red-400 mb-1">Before</p>
                      <p className="text-sm font-medium">{stage.before.tactic}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stage.before.conversion || stage.before.openRate || `${stage.before.churn} churn`}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-xs text-green-400 mb-1">After</p>
                      <p className="text-sm font-medium text-green-400">{stage.after.tactic}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stage.after.conversion || stage.after.openRate || `${stage.after.churn} churn`}
                      </p>
                    </div>

                    <AnimatePresence>
                      {hoveredJourney === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30"
                        >
                          <div className="flex items-start gap-2">
                            <Eye className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-purple-300">{stage.aiCapability}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program Impact */}
      <section className="py-16 bg-gradient-to-b from-background to-pink-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
              <Gift className="w-3 h-3 mr-1" />
              Loyalty Intelligence
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Ultamate Rewards Optimization</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { feature: "Predictive Tier Nudges", description: "AI identifies members closest to next tier and sends targeted incentives", impact: "+23% upgrades" },
              { feature: "Dynamic Point Multipliers", description: "Personalized bonus events based on individual purchase patterns", impact: "+67% participation" },
              { feature: "Churn Prevention", description: "Risk scoring triggers preemptive retention offers 30 days before lapse", impact: "-57% churn" },
              { feature: "Cross-Category Discovery", description: "AI recommends new categories based on affinity modeling", impact: "+34% basket expansion" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <CheckCircle2 className="w-6 h-6 text-pink-400 mb-3" />
                    <h4 className="font-semibold mb-2">{item.feature}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {item.impact}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-purple-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-pink-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "We went from batch-and-blast campaigns to truly individualized experiences for 37 million members. The AI doesn't just predict what products they'll buy—it knows when they're ready to discover something new. That's the difference between selling and delighting."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  JM
                </div>
                <div>
                  <p className="font-semibold">Jessica Martinez</p>
                  <p className="text-sm text-muted-foreground">Director of Loyalty Analytics, Ulta Beauty</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Loyalty Program?</h2>
          <p className="text-slate-400 mb-8">
            Let's build predictive marketing that delights your customers.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/hilton-hotels/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Hilton Hotels
            </Button>
          </Link>
          <Link href="/case-studies/naratix/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Naratix
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
