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
  Home,
  Target,
  TrendingUp,
  DollarSign,
  Quote,
  BarChart3,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Layers,
  Building2,
  Map,
} from "lucide-react";
import Link from "next/link";

export default function HouseCanaryCaseStudyPage() {
  const [selectedMetric, setSelectedMetric] = useState("valuation");
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);

  const metrics = [
    { id: "valuation", name: "AVM Accuracy", value: "97.2%", benchmark: "Industry: 89%", improvement: "+9.2%" },
    { id: "forecast", name: "Price Forecast", value: "6.4% MAPE", benchmark: "Industry: 12.8%", improvement: "+50% better" },
    { id: "risk", name: "Risk Detection", value: "94.7%", benchmark: "Industry: 78%", improvement: "+21%" },
    { id: "speed", name: "Valuation Speed", value: "< 1 sec", benchmark: "Industry: 3-5 days", improvement: "Instant" },
  ];

  const propertySignals = [
    { signal: "Renovations Detected", confidence: 94, impact: "+$45,000", type: "positive" },
    { signal: "Solar Panels Added", confidence: 89, impact: "+$18,000", type: "positive" },
    { signal: "Flood Zone Adjacent", confidence: 98, impact: "-$32,000", type: "negative" },
    { signal: "School Rating Up", confidence: 76, impact: "+$22,000", type: "positive" },
    { signal: "New Commercial Dev", confidence: 82, impact: "+$15,000", type: "positive" },
  ];

  const portfolioProperties = [
    { id: 1, address: "142 Oak Lane, Austin TX", avm: "$485,000", change: "+3.2%", risk: "low" },
    { id: 2, address: "891 River Dr, Denver CO", avm: "$612,000", change: "+1.8%", risk: "low" },
    { id: 3, address: "2234 Pine St, Phoenix AZ", avm: "$378,000", change: "-0.4%", risk: "medium" },
    { id: 4, address: "567 Beach Ave, Miami FL", avm: "$892,000", change: "+5.1%", risk: "high" },
    { id: 5, address: "445 Mountain Rd, Seattle WA", avm: "$724,000", change: "+2.4%", risk: "low" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-emerald-500/5 to-teal-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    <Home className="w-3 h-3 mr-1" />
                    PropTech AI
                  </Badge>
                  <Badge variant="outline" className="border-teal-500/30 text-teal-400">
                    AVM Engine
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  HouseCanary
                </h1>

                <p className="text-xl text-muted-foreground">
                  Industry-leading automated valuation models that process 400+ property 
                  signals to deliver 97.2% accurate valuations in under 1 second.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">97.2%</p>
                    <p className="text-sm text-muted-foreground">AVM Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-teal-400">400+</p>
                    <p className="text-sm text-muted-foreground">Property Signals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">&lt;1s</p>
                    <p className="text-sm text-muted-foreground">Valuation Time</p>
                  </div>
                </div>
              </div>

              {/* Property Valuation Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Map className="w-6 h-6 text-emerald-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Portfolio Analysis</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { address: "142 Oak Lane, Austin TX", avm: "$485,000", change: "+3.2%" },
                      { address: "891 River Dr, Denver CO", avm: "$612,000", change: "+1.8%" },
                      { address: "567 Beach Ave, Miami FL", avm: "$892,000", change: "+5.1%" },
                    ].map((prop, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{prop.avm}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[180px]">{prop.address}</p>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {prop.change}
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

            <h2 className="text-3xl font-bold">Manual Appraisals Couldn't Scale</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Traditional property valuations required human appraisers to physically visit each property, 
              taking 3-5 days per assessment and costing hundreds of dollars. Lenders and investors making 
              portfolio-scale decisions were stuck waiting weeks for valuations, and inconsistencies between 
              appraisers created risk blind spots. The industry needed institutional-grade accuracy at digital speed.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">3-5 days</p>
                  <p className="text-sm text-muted-foreground">Per manual appraisal</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">±15%</p>
                  <p className="text-sm text-muted-foreground">Valuation variance</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">$400+</p>
                  <p className="text-sm text-muted-foreground">Cost per appraisal</p>
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
              <BarChart3 className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Valuation Command Center</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              See how AI analyzes hundreds of signals to deliver institutional-grade property valuations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Performance Metrics</p>
              {metrics.map((metric) => (
                <motion.div key={metric.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`cursor-pointer transition-all ${selectedMetric === metric.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                    onClick={() => setSelectedMetric(metric.id)}
                    data-testid={`metric-${metric.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{metric.name}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {metric.improvement}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-emerald-400">{metric.value}</p>
                      <p className="text-xs text-slate-500">{metric.benchmark}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Card className="border-slate-700 bg-slate-800/50 h-full">
                <CardHeader className="border-b border-slate-700">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    Live Property Signal Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    {propertySignals.map((signal, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-lg bg-slate-700/50"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          signal.type === 'positive' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {signal.type === 'positive' ? (
                            <TrendingUp className="w-5 h-5 text-green-400" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{signal.signal}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={signal.confidence} className="h-1 w-20" />
                            <span className="text-xs text-slate-400">{signal.confidence}% confidence</span>
                          </div>
                        </div>
                        <Badge className={`${
                          signal.type === 'positive' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {signal.impact}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-emerald-400">Final AVM Estimate</span>
                      <Badge className="bg-emerald-500 text-white">97.2% confidence</Badge>
                    </div>
                    <p className="text-3xl font-bold text-white">$553,000</p>
                    <p className="text-xs text-slate-400 mt-1">Based on 412 property signals analyzed in 0.8s</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-teal-500/20 text-teal-400 border-teal-500/30">
              <Map className="w-3 h-3 mr-1" />
              Portfolio Intelligence
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Real-Time Portfolio Monitor</h2>
            <p className="text-muted-foreground mt-2">Hover over properties to see AI-powered insights</p>
          </div>

          <div className="space-y-3">
            {portfolioProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onHoverStart={() => setHoveredProperty(i)}
                onHoverEnd={() => setHoveredProperty(null)}
              >
                <Card className={`transition-all ${hoveredProperty === i ? 'border-emerald-500 scale-[1.02]' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          property.risk === 'low' ? 'bg-green-500/20' :
                          property.risk === 'medium' ? 'bg-amber-500/20' :
                          'bg-red-500/20'
                        }`}>
                          <Building2 className={`w-6 h-6 ${
                            property.risk === 'low' ? 'text-green-400' :
                            property.risk === 'medium' ? 'text-amber-400' :
                            'text-red-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {property.address}
                          </p>
                          <Badge variant="outline" className={`text-xs mt-1 ${
                            property.risk === 'low' ? 'border-green-500/30 text-green-400' :
                            property.risk === 'medium' ? 'border-amber-500/30 text-amber-400' :
                            'border-red-500/30 text-red-400'
                          }`}>
                            {property.risk} risk
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{property.avm}</p>
                        <Badge className={`${
                          property.change.startsWith('+') 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {property.change} 30d
                        </Badge>
                      </div>
                    </div>

                    <AnimatePresence>
                      {hoveredProperty === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-border grid grid-cols-4 gap-4 text-center"
                        >
                          <div>
                            <p className="text-xs text-muted-foreground">Days on Market</p>
                            <p className="font-semibold">14</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Price/SqFt</p>
                            <p className="font-semibold">$287</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Forecast (12mo)</p>
                            <p className="font-semibold text-green-400">+4.2%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                            <p className="font-semibold">94%</p>
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

      <section className="py-16 bg-gradient-to-b from-background to-emerald-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-emerald-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Traditional appraisals take days and cost hundreds of dollars each. Our AI delivers institutional-grade valuations in under a second, analyzing signals that human appraisers simply can't see—satellite imagery changes, permit filings, neighborhood trends. That's why the largest lenders and investors trust HouseCanary for portfolio-scale decisions."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  MW
                </div>
                <div>
                  <p className="font-semibold">Michael Wong</p>
                  <p className="text-sm text-muted-foreground">VP of Valuation Science, HouseCanary</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Real Estate AI?</h2>
          <p className="text-slate-400 mb-8">
            Let's create valuation systems that scale with institutional precision.
          </p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/riiid-labs/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Riiid Labs
            </Button>
          </Link>
          <Link href="/case-studies/properti-ai/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Properti AI
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
