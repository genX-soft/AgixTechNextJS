import { useState } from "react";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Quote,
  CheckCircle2,
  Zap,
  BarChart3,
  GraduationCap,
  AlertTriangle,
  UserX,
  Clock,
} from "lucide-react";
import { Link } from "wouter";

export default function KnewtonCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-500/10 via-background to-indigo-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    <Brain className="w-3 h-3 mr-1" />
                    EdTech
                  </Badge>
                  <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">
                    Adaptive Learning
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Knewton
                </h1>

                <p className="text-xl text-muted-foreground">
                  Real-time adaptive learning with AI feedback loops. Achieving +683% 
                  personalization improvement and +109% course completion rates.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">+683%</p>
                    <p className="text-sm text-muted-foreground">Personalization</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-400">+109%</p>
                    <p className="text-sm text-muted-foreground">Completion</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">50%</p>
                    <p className="text-sm text-muted-foreground">Faster Mastery</p>
                  </div>
                </div>
              </div>

              {/* Learning Progress Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Learning Graph</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { concept: "Prerequisite Detection", accuracy: 94 },
                      { concept: "Gap Identification", accuracy: 91 },
                      { concept: "Strength Mapping", accuracy: 89 },
                      { concept: "Path Optimization", accuracy: 96 },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">{item.concept}</p>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {item.accuracy}%
                          </Badge>
                        </div>
                        <Progress value={item.accuracy} className="h-1" />
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

            <h2 className="text-3xl font-bold">One-Size-Fits-All Education Was Leaving Students Behind</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Traditional learning platforms treated every student identically—same content, same pace, same path. 
              Students who struggled got lost while advanced learners grew bored. Course completion rates 
              stagnated, and instructors had no visibility into individual learning gaps. Without real-time 
              adaptation, education remained a guessing game.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <UserX className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">52%</p>
                  <p className="text-sm text-muted-foreground">Course completion rate</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">6.2 weeks</p>
                  <p className="text-sm text-muted-foreground">Average time to mastery</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">0%</p>
                  <p className="text-sm text-muted-foreground">Personalization accuracy</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Adaptive Learning Architecture</h2>
          
          <Tabs defaultValue="assessment" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="adaptation">Adaptation</TabsTrigger>
              <TabsTrigger value="intervention">Intervention</TabsTrigger>
              <TabsTrigger value="mastery">Mastery</TabsTrigger>
            </TabsList>

            <TabsContent value="assessment">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Knowledge Graph Mapping</h3>
                      <p className="text-muted-foreground mb-4">
                        Every learner begins with diagnostic assessment that maps their 
                        current knowledge state against 2.3 million concept relationships.
                      </p>
                      <div className="space-y-3">
                        {[
                          { concept: "Prerequisite Detection", accuracy: 94 },
                          { concept: "Gap Identification", accuracy: 91 },
                          { concept: "Strength Mapping", accuracy: 89 },
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.concept}</span>
                              <span className="text-blue-400">{item.accuracy}%</span>
                            </div>
                            <Progress value={item.accuracy} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center p-8 rounded-xl bg-blue-500/10">
                        <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-3xl font-bold">2.3M</p>
                        <p className="text-sm text-muted-foreground">Concept Relationships</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adaptation">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: "Content Selection", desc: "AI selects optimal next content from 500K+ learning objects", metric: "Real-time" },
                      { title: "Difficulty Calibration", desc: "Automatically adjusts challenge level to maintain flow state", metric: "Every 30 sec" },
                      { title: "Modality Switching", desc: "Shifts between video, text, interactive based on engagement", metric: "Pattern-based" },
                    ].map((feature, i) => (
                      <Card key={i} className="bg-muted/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{feature.desc}</p>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {feature.metric}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="intervention">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Intelligent Intervention System</h3>
                  <div className="space-y-4">
                    {[
                      { trigger: "Struggling Detection", action: "Prerequisite review pathway activated", timing: "< 2 min response" },
                      { trigger: "Engagement Drop", action: "Gamification elements introduced", timing: "Immediate" },
                      { trigger: "Mastery Plateau", action: "Advanced challenge unlocked", timing: "Real-time" },
                      { trigger: "Confidence Gap", action: "Reinforcement exercises scheduled", timing: "Spaced repetition" },
                    ].map((intervention, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                        <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium">{intervention.trigger}</p>
                          <p className="text-sm text-muted-foreground">{intervention.action}</p>
                        </div>
                        <Badge variant="outline">{intervention.timing}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mastery">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Mastery Verification</h3>
                      <div className="space-y-4">
                        {[
                          { label: "Concept Mastery Threshold", value: "85%+" },
                          { label: "Retention After 30 Days", value: "78%" },
                          { label: "Transfer to New Problems", value: "72%" },
                          { label: "Long-term Recall (6 mo)", value: "64%" },
                        ].map((metric, i) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span className="text-sm">{metric.label}</span>
                            <span className="font-bold text-blue-400">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                        <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-4xl font-bold">3.1 weeks</p>
                        <p className="text-sm text-muted-foreground">Avg Time to Mastery</p>
                        <p className="text-xs text-muted-foreground mt-1">(down from 6.2 weeks)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-blue-500/20 bg-slate-800/50">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-blue-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-white">
                "Static curricula assume every learner is the same. Our AI sees 
                each student as a unique knowledge graph that evolves in real-time. 
                When you can adapt faster than confusion sets in, learning becomes 
                inevitable instead of a struggle."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  RP
                </div>
                <div>
                  <p className="font-semibold text-white">Dr. Rachel Park</p>
                  <p className="text-sm text-slate-400">VP of Curriculum Intelligence, Knewton</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Building Adaptive Learning Systems?</h2>
          <p className="text-muted-foreground mb-8">Let's create AI that meets every learner where they are.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/ulta-beauty">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Ulta Beauty
            </Button>
          </Link>
          <Link href="/case-studies/riiid-labs">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Riiid Labs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
