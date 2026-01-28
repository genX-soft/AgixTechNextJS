'use client'
import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Clock,
  BookOpen,
  Quote,
  Award,
  Zap,
  BarChart3,
  LineChart,
  AlertTriangle,
  FileX,
  Timer,
} from "lucide-react";
import Link from "next/link";

export default function RiiidLabsCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-violet-500/10 via-background to-purple-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-violet-500/30 text-violet-400">
                    <Brain className="w-3 h-3 mr-1" />
                    EdTech
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    Test Prep AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Riiid Labs
                </h1>

                <p className="text-xl text-muted-foreground">
                  Adaptive AI engine for personalized test mastery. Delivering +176% 
                  score improvement with 58% faster preparation time.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-violet-400">+176%</p>
                    <p className="text-sm text-muted-foreground">Score Improvement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">58%</p>
                    <p className="text-sm text-muted-foreground">Faster Prep</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">+40%</p>
                    <p className="text-sm text-muted-foreground">Pass Rate</p>
                  </div>
                </div>
              </div>

              {/* Score Journey Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <LineChart className="w-6 h-6 text-violet-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Score Progression</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { week: "Week 2", score: 520, delta: "+20" },
                      { week: "Week 4", score: 580, delta: "+60" },
                      { week: "Week 6", score: 650, delta: "+70" },
                      { week: "Week 8", score: 720, delta: "+70" },
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50">
                        <span className="text-sm w-16 text-slate-400">{point.week}</span>
                        <Progress value={(point.score - 500) / 3} className="flex-1 h-2" />
                        <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                          {point.score}
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

            <h2 className="text-3xl font-bold">Generic Study Plans Were Wasting Precious Prep Time</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Students spent countless hours studying content they'd already mastered while neglecting 
              weak areas. Generic test prep forced everyone through the same material regardless of 
              individual knowledge gaps. Score plateaus were common, motivation dropped, and pass rates 
              remained frustratingly low despite massive time investments.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <FileX className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">34%</p>
                  <p className="text-sm text-muted-foreground">Content relevance rate</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Timer className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">100+ hrs</p>
                  <p className="text-sm text-muted-foreground">Avg study time required</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">+70 pts</p>
                  <p className="text-sm text-muted-foreground">Typical score improvement</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Score Improvement Journey</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real student progression data showing how AI-powered adaptive learning 
            accelerates mastery compared to traditional study methods.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-violet-400" />
                  Traditional Study Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { week: "Week 2", score: 520, delta: "+20" },
                    { week: "Week 4", score: 545, delta: "+25" },
                    { week: "Week 6", score: 560, delta: "+15" },
                    { week: "Week 8", score: 565, delta: "+5" },
                    { week: "Week 10", score: 570, delta: "+5" },
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-sm w-20 text-muted-foreground">{point.week}</span>
                      <Progress value={(point.score - 500) / 3} className="flex-1 h-3" />
                      <span className="font-medium w-12">{point.score}</span>
                      <Badge variant="outline" className="w-16 justify-center">{point.delta}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">+70 pts</p>
                  <p className="text-sm text-muted-foreground">Total Improvement in 10 weeks</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-violet-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-violet-400" />
                  Riiid AI-Powered Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { week: "Week 2", score: 560, delta: "+60" },
                    { week: "Week 4", score: 610, delta: "+50" },
                    { week: "Week 6", score: 655, delta: "+45" },
                    { week: "Week 8", score: 690, delta: "+35" },
                    { week: "Week 10", score: 724, delta: "+34" },
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-sm w-20 text-muted-foreground">{point.week}</span>
                      <Progress value={(point.score - 500) / 3} className="flex-1 h-3" />
                      <span className="font-medium w-12 text-violet-400">{point.score}</span>
                      <Badge className="w-16 justify-center bg-violet-500/20 text-violet-400 border-violet-500/30">{point.delta}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-violet-500/10 text-center">
                  <p className="text-2xl font-bold text-violet-400">+224 pts</p>
                  <p className="text-sm text-muted-foreground">Total Improvement in 10 weeks</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-violet-500/5 via-background to-purple-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Badge className="mb-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Santa AI Engine
              </Badge>
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <p className="text-muted-foreground">
                Santa analyzes 100+ signals per question to understand not just 
                what you got wrong, but why—then creates a personalized remediation 
                path that addresses root causes, not symptoms.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { stage: "Diagnostic", desc: "Maps knowledge gaps across 400+ concept nodes", icon: BarChart3 },
                  { stage: "Prediction", desc: "Forecasts score outcomes for any question set", icon: LineChart },
                  { stage: "Optimization", desc: "Selects highest-ROI questions for time spent", icon: Target },
                  { stage: "Reinforcement", desc: "Schedules review at optimal forgetting points", icon: Brain },
                ].map((step, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <step.icon className="w-6 h-6 text-violet-400 mb-3" />
                      <h4 className="font-semibold mb-1">{step.stage}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl font-bold mb-6 text-center">Study Efficiency Metrics</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { metric: "Questions Needed", traditional: "3,200", riiid: "1,100", improvement: "-66%" },
              { metric: "Study Hours", traditional: "100 hrs", riiid: "42 hrs", improvement: "-58%" },
              { metric: "Content Relevance", traditional: "34%", riiid: "91%", improvement: "+168%" },
              { metric: "Retention @ 30d", traditional: "41%", riiid: "78%", improvement: "+90%" },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">{item.metric}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm line-through opacity-50">{item.traditional}</span>
                    <span className="font-bold text-violet-400">{item.riiid}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {item.improvement}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-violet-500/20 bg-slate-800/50">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-violet-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-white">
                "Traditional test prep is like using a map without knowing where 
                you are. Santa AI gives every student GPS-level precision—it knows 
                exactly which concepts need work and the fastest route to mastery. 
                That's why our students gain 3x more points in half the time."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  DK
                </div>
                <div>
                  <p className="font-semibold text-white">Dr. Daniel Kim</p>
                  <p className="text-sm text-slate-400">VP of Test Innovation, Riiid Labs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Building AI for Test Preparation?</h2>
          <p className="text-muted-foreground mb-8">Let's create adaptive systems that maximize learning efficiency.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/knewton/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Knewton
            </Button>
          </Link>
          <Link href="/case-studies/housecanary/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              HouseCanary
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
