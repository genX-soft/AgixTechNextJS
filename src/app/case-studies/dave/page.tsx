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
  DollarSign,
  Brain,
  CheckCircle2,
  Quote,
  ArrowRight,
  MessageSquare,
  Users,
  Sparkles,
  Smartphone,
  HeartHandshake,
  Clock,
  TrendingUp,
  AlertCircle,
  ThumbsUp,
  Send,
  Bot,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function DaveCaseStudyPage() {
  const [activeConversation, setActiveConversation] = useState(0);
  const [showingResponse, setShowingResponse] = useState(false);

  const conversations = [
    {
      scenario: "Overdraft Concern",
      userMessage: "Why is my balance so low? I thought I had more money.",
      aiResponse: "I can see you had 3 recurring charges hit yesterday - Netflix ($15.99), Spotify ($9.99), and your gym membership ($29.99). Your balance is $42.31. Would you like me to show you a breakdown of this week's spending?",
      sentiment: "Concerned",
      resolution: "Provided clarity with spending breakdown",
      emotion: "empathetic",
    },
    {
      scenario: "ExtraCash Request",
      userMessage: "I need some extra cash until payday. Can you help?",
      aiResponse: "Based on your income pattern, you're eligible for up to $250 in ExtraCash right now. Your next paycheck of $1,847 is expected Friday. Would you like me to advance you some funds? It takes about 8 minutes to arrive.",
      sentiment: "Stressed",
      resolution: "Instant advance approval",
      emotion: "supportive",
    },
    {
      scenario: "Budget Help",
      userMessage: "I keep running out of money before payday. What am I doing wrong?",
      aiResponse: "I noticed your subscriptions total $127/month, and food delivery averages $340/month. Here's what I suggest: Your dining out is 40% higher than members with similar incomes. Would you like me to create a personalized 30-day budget plan?",
      sentiment: "Frustrated",
      resolution: "Personalized budget created",
      emotion: "constructive",
    },
  ];

  const memberOutcomes = [
    { stage: "Week 1", savings: 0, confidence: 45, actions: "Started tracking spending" },
    { stage: "Week 2", savings: 48, confidence: 58, actions: "Cancelled 2 unused subscriptions" },
    { stage: "Week 4", savings: 127, confidence: 72, actions: "Set up auto-savings" },
    { stage: "Week 8", savings: 312, confidence: 85, actions: "Built $200 emergency fund" },
    { stage: "Week 12", savings: 523, confidence: 94, actions: "Reduced ExtraCash usage 80%" },
  ];

  const supportMetrics = [
    { label: "Conversations Handled", before: "Human Only", after: "94% AI", change: "New capability" },
    { label: "First Response Time", before: "6.5 min", after: "< 3 sec", change: "99% faster" },
    { label: "Member Satisfaction", before: "78/100", after: "93/100", change: "+19%" },
    { label: "Issue Resolution", before: "4.4 min", after: "55 sec", change: "79% faster" },
  ];

  const current = conversations[activeConversation];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-green-500/5 to-emerald-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    <Smartphone className="w-3 h-3 mr-1" />
                    Neobanking
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    Conversational AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Dave
                </h1>

                <p className="text-xl text-muted-foreground">
                  Building an AI that understands financial stress—and responds with genuine 
                  empathy. Dave's AI doesn't just answer questions; it helps members build 
                  lasting financial health.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-57%</p>
                    <p className="text-sm text-muted-foreground">Support Volume</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">93</p>
                    <p className="text-sm text-muted-foreground">CSAT Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">10M+</p>
                    <p className="text-sm text-muted-foreground">Members Served</p>
                  </div>
                </div>
              </div>

              {/* Chat Demo Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-green-600/80 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Dave</p>
                      <p className="text-xs text-white/70">Your money ally</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 text-sm">
                    <div className="flex items-start gap-3 justify-end">
                      <div className="p-3 rounded-2xl rounded-tr-none bg-green-500/30 max-w-[80%]">
                        I need some extra cash until payday. Can you help?
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="p-3 rounded-2xl rounded-tl-none bg-slate-700/50 max-w-[80%]">
                        Based on your income pattern, you're eligible for up to $250 in ExtraCash right now. It takes about 8 minutes to arrive.
                      </div>
                    </div>
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
              <AlertCircle className="w-3 h-3 mr-1" />
              The Challenge
            </Badge>

            <h2 className="text-3xl font-bold">10 Million Members, Not Enough Humans</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dave's mission is helping everyday people avoid overdrafts and build financial health. 
              But as membership exploded to 10 million, their support team couldn't scale fast enough. 
              Members asking about overdrafts were waiting 6+ minutes for a response. Financial stress 
              doesn't wait—and neither should their members. They needed AI that could understand 
              financial anxiety and respond with genuine empathy.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">6.5 min</p>
                  <p className="text-sm text-muted-foreground">Average response time</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">10M+</p>
                  <p className="text-sm text-muted-foreground">Members needing support</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">78/100</p>
                  <p className="text-sm text-muted-foreground">Member satisfaction score</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Conversation Theater - Unique Structure */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              <MessageSquare className="w-3 h-3 mr-1" />
              Live Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Conversation Theater</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              Experience how Dave's AI handles real member scenarios with empathy and precision
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Scenario Selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Select Scenario</p>
              {conversations.map((conv, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`cursor-pointer transition-all ${activeConversation === i ? 'border-green-500 bg-green-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                    onClick={() => { setActiveConversation(i); setShowingResponse(false); }}
                    data-testid={`scenario-${i}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          conv.emotion === "empathetic" ? "bg-blue-500/20" :
                          conv.emotion === "supportive" ? "bg-green-500/20" : "bg-purple-500/20"
                        }`}>
                          <HeartHandshake className={`w-5 h-5 ${
                            conv.emotion === "empathetic" ? "text-blue-400" :
                            conv.emotion === "supportive" ? "text-green-400" : "text-purple-400"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{conv.scenario}</p>
                          <p className="text-sm text-slate-400">Sentiment: {conv.sentiment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Conversation Display */}
            <div className="lg:col-span-2">
              <Card className="border-slate-700 bg-slate-800/50 h-full">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Bot className="w-5 h-5 text-green-400" />
                      Dave AI Assistant
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Phone Frame */}
                  <div className="mx-auto max-w-sm">
                    <div className="bg-slate-900 rounded-3xl p-4 border-4 border-slate-700">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                        <span>9:41</span>
                        <div className="w-20 h-5 bg-slate-800 rounded-full" />
                        <span>100%</span>
                      </div>

                      {/* Chat Area */}
                      <div className="space-y-4 min-h-[300px]">
                        {/* User Message */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-end"
                        >
                          <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                            <p className="text-sm">{current.userMessage}</p>
                          </div>
                        </motion.div>

                        {/* AI Response */}
                        <AnimatePresence>
                          {showingResponse ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <div className="bg-slate-700 text-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                                <p className="text-sm">{current.aiResponse}</p>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex justify-start"
                            >
                              <div className="bg-slate-700 rounded-2xl px-4 py-3">
                                <div className="flex gap-1">
                                  <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                    className="w-2 h-2 bg-slate-500 rounded-full"
                                  />
                                  <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                    className="w-2 h-2 bg-slate-500 rounded-full"
                                  />
                                  <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                    className="w-2 h-2 bg-slate-500 rounded-full"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Input Area */}
                      <div className="mt-4 flex gap-2">
                        <div className="flex-1 bg-slate-800 rounded-full px-4 py-2 text-sm text-slate-500">
                          Type a message...
                        </div>
                        <Button
                          size="icon"
                          className="rounded-full bg-green-500 hover:bg-green-600"
                          onClick={() => setShowingResponse(true)}
                          data-testid="button-send-message"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Resolution Summary */}
                  {showingResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <p className="font-medium text-green-400">Resolution</p>
                      </div>
                      <p className="text-sm text-slate-300">{current.resolution}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Member Financial Health Journey */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Member Journey
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Financial Health Transformation</h2>
            <p className="text-muted-foreground mt-2">How AI coaching builds lasting financial wellness</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hidden md:block" />

            <div className="grid md:grid-cols-5 gap-4">
              {memberOutcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        i === 0 ? 'bg-red-500/20 text-red-400' :
                        i < 3 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        <Target className="w-6 h-6" />
                      </div>
                      <p className="font-semibold mb-2">{outcome.stage}</p>
                      <div className="space-y-2">
                        <div className="p-2 rounded bg-muted/50">
                          <p className="text-xs text-muted-foreground">Saved</p>
                          <p className="font-bold text-green-400">${outcome.savings}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                          <Progress value={outcome.confidence} className="h-2" />
                        </div>
                        <p className="text-xs text-muted-foreground">{outcome.actions}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Metrics Comparison */}
      <section className="py-16 bg-gradient-to-b from-background to-green-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <BarChart3 className="w-3 h-3 mr-1" />
              Impact Metrics
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Support Transformation</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-4">{metric.label}</p>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-xs text-red-400 mb-1">Before</p>
                        <p className="font-semibold">{metric.before}</p>
                      </div>
                      <div className="flex justify-center">
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-xs text-green-400 mb-1">After</p>
                        <p className="font-semibold text-green-400">{metric.after}</p>
                      </div>
                    </div>
                    <Badge className="mt-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      {metric.change}
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
          <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-green-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Our members don't just need answers—they need empathy. AGIX built an AI that understands financial stress and responds with genuine care. Support tickets are down, but more importantly, our members feel heard."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  SR
                </div>
                <div>
                  <p className="font-semibold">Sarah Rodriguez</p>
                  <p className="text-sm text-muted-foreground">VP of Member Experience, Dave</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Empathetic Fintech AI?</h2>
          <p className="text-slate-400 mb-8">
            We help neobanks build AI that understands financial anxiety and knows how to help.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/enova/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Enova
            </Button>
          </Link>
          <Link href="/case-studies/suno/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Suno
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
