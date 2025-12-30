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
  Mic,
  Phone,
  Clock,
  TrendingUp,
  Quote,
  Globe,
  Users,
  Gauge,
  CheckCircle2,
  XCircle,
  BarChart3,
  Headphones,
  Languages,
  Play,
  Pause,
  Volume2,
  MessageSquare,
  Zap,
  Brain,
  AlertTriangle,
  DollarSign,
  UserX,
} from "lucide-react";
import Link from "next/link";

export default function PolyAICaseStudyPage() {
  const [activeCallState, setActiveCallState] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const callFlowStates = [
    { state: "Greeting", time: "2s", icon: Phone, description: "Language detection + personalized welcome", transcript: "Thank you for calling TechCorp support. How can I help you today?" },
    { state: "Intent Classification", time: "1.5s", icon: Brain, description: "NLU classifies caller intent from natural speech", transcript: "I understand you're having trouble with your account login. Let me help with that." },
    { state: "Context Gathering", time: "15s", icon: MessageSquare, description: "Conversational follow-up questions", transcript: "Can you confirm the email address associated with your account?" },
    { state: "Action Execution", time: "3s", icon: Zap, description: "API calls to backend systems", transcript: "I've sent a password reset link to j***@email.com. It should arrive in the next few minutes." },
    { state: "Confirmation", time: "5s", icon: CheckCircle2, description: "Verify resolution with caller", transcript: "Is there anything else I can help you with today?" },
  ];

  const languages = [
    { id: "english", name: "English", variants: ["US", "UK", "AU"], coverage: "100%" },
    { id: "spanish", name: "Spanish", variants: ["ES", "MX", "LATAM"], coverage: "98%" },
    { id: "french", name: "French", variants: ["FR", "CA"], coverage: "97%" },
    { id: "german", name: "German", variants: ["DE", "AT", "CH"], coverage: "96%" },
    { id: "japanese", name: "Japanese", variants: ["JP"], coverage: "94%" },
    { id: "mandarin", name: "Mandarin", variants: ["CN", "TW"], coverage: "95%" },
  ];

  const performanceMetrics = [
    { metric: "Resolution Rate", before: "62%", after: "89%", improvement: "+44%" },
    { metric: "Avg Handle Time", before: "8.2 min", after: "3.1 min", improvement: "-62%" },
    { metric: "First Call Resolution", before: "54%", after: "81%", improvement: "+50%" },
    { metric: "Cost per Call", before: "$12.40", after: "$3.20", improvement: "-74%" },
  ];

  const simulateCall = () => {
    setIsSimulating(true);
    setActiveCallState(0);
    const interval = setInterval(() => {
      setActiveCallState(prev => {
        if (prev >= callFlowStates.length - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Link href="/case-studies">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-300" data-testid="button-back-to-cases">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-violet-500/30 text-violet-400">
                    <Mic className="w-3 h-3 mr-1" />
                    Voice AI
                  </Badge>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                    Call Center Automation
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  PolyAI
                </h1>

                <p className="text-xl text-slate-300">
                  Enterprise voice AI that resolves, not just routes. Handling millions 
                  of calls with human-level understanding across 8+ languages.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-violet-400">89%</p>
                    <p className="text-sm text-slate-400">Resolution Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">-74%</p>
                    <p className="text-sm text-slate-400">Cost per Call</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">8+</p>
                    <p className="text-sm text-slate-400">Languages</p>
                  </div>
                </div>
              </div>

              {/* Performance Dashboard Visual */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Gauge className="w-6 h-6 text-violet-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Performance</p>
                  </div>
                  <div className="space-y-4">
                    {performanceMetrics.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                        <div>
                          <p className="text-sm font-medium text-white">{item.metric}</p>
                          <p className="text-xs text-slate-400">{item.before} before</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">{item.after}</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            {item.improvement}
                          </Badge>
                        </div>
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

            <h2 className="text-3xl font-bold">Traditional Call Centers Couldn't Scale</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Enterprise contact centers faced a perfect storm: customers waited in endless queues, 
              human agents cost $12+ per call, and CSAT scores tanked as hold times grew. The old 
              IVR systems—press 1 for this, press 2 for that—frustrated callers and created more 
              escalations than they resolved. Companies needed voice AI that could actually resolve 
              issues, not just route calls to the next queue.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">8.2 min</p>
                  <p className="text-sm text-muted-foreground">Avg handle time per call</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">$12.40</p>
                  <p className="text-sm text-muted-foreground">Cost per human-handled call</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <UserX className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">62%</p>
                  <p className="text-sm text-muted-foreground">Resolution rate before AI</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Call Flow Simulator - Unique Structure */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
              <Phone className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Call Flow Decision Theater</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Watch how PolyAI handles a real customer call from start to resolution
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Call Simulation Panel */}
            <div className="lg:col-span-2">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-violet-400" />
                      Live Call Simulation
                    </CardTitle>
                    <Button
                      onClick={simulateCall}
                      disabled={isSimulating}
                      className="gap-2 bg-violet-500 hover:bg-violet-600"
                      data-testid="button-simulate-call"
                    >
                      {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isSimulating ? "In Progress..." : "Simulate Call"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Call State Progress */}
                  <div className="space-y-4 mb-6">
                    {callFlowStates.map((state, i) => {
                      const isActive = i === activeCallState && isSimulating;
                      const isComplete = i < activeCallState || (!isSimulating && activeCallState === callFlowStates.length - 1 && i <= activeCallState);

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: isActive || isComplete ? 1 : 0.5 }}
                          className={`p-4 rounded-lg border transition-all ${
                            isActive ? 'border-violet-500 bg-violet-500/10' :
                            isComplete ? 'border-green-500/30 bg-green-500/5' :
                            'border-slate-700 bg-slate-800/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isActive ? 'bg-violet-500 animate-pulse' :
                              isComplete ? 'bg-green-500' :
                              'bg-slate-700'
                            }`}>
                              {isComplete && !isActive ? (
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              ) : (
                                <state.icon className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-white">{state.state}</p>
                                <Badge variant="outline" className="text-xs border-slate-600">
                                  {state.time}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-400">{state.description}</p>
                            </div>
                          </div>

                          <AnimatePresence>
                            {(isActive || isComplete) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 p-3 rounded bg-slate-900"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <Volume2 className="w-3 h-3 text-violet-400" />
                                  <span className="text-xs text-violet-400">AI Response</span>
                                </div>
                                <p className="text-sm text-slate-300 italic">"{state.transcript}"</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Language Support Panel */}
            <div>
              <Card className="border-slate-700 bg-slate-800/50 h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Languages className="w-5 h-5 text-cyan-400" />
                    Multi-Language Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedLanguage === lang.id
                          ? 'bg-cyan-500/10 border border-cyan-500/30'
                          : 'bg-slate-700/50 hover:bg-slate-700'
                      }`}
                      onClick={() => setSelectedLanguage(lang.id)}
                      data-testid={`language-${lang.id}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{lang.name}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {lang.coverage}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {lang.variants.map((v, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {v}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="py-16 bg-gradient-to-b from-background to-violet-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              <BarChart3 className="w-3 h-3 mr-1" />
              Impact Metrics
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Performance Transformation</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-4">{metric.metric}</p>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-xs text-red-400 mb-1">Before</p>
                        <p className="font-semibold">{metric.before}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-xs text-green-400 mb-1">After</p>
                        <p className="font-semibold text-green-400">{metric.after}</p>
                      </div>
                    </div>
                    <Badge className="mt-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
                      {metric.improvement}
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
          <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-cyan-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-violet-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Customers tell us they didn't realize they were talking to AI until we mentioned it. The latency is so low and the responses so natural that it feels like a real conversation. That's the bar for enterprise voice AI."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  AK
                </div>
                <div>
                  <p className="font-semibold">Alex Kim</p>
                  <p className="text-sm text-muted-foreground">Head of Voice Platform Operations, PolyAI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Enterprise Voice AI?</h2>
          <p className="text-slate-400 mb-8">
            We help companies build voice systems that actually resolve customer issues.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/naratix">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Naratix
            </Button>
          </Link>
          <Link href="/case-studies/brainfish">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Brainfish
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
