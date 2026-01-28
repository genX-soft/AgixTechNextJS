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
  MessageSquare,
  Target,
  Clock,
  TrendingDown,
  Quote,
  Zap,
  Users,
  Bot,
  ArrowDown,
  CheckCircle2,
  Languages,
  ShieldCheck,
  Brain,
  ThumbsUp,
  Send,
  HelpCircle,
  FileQuestion,
  CreditCard,
  Package,
  RotateCcw,
  AlertTriangle,
  FileX,
  Inbox,
} from "lucide-react";
import Link from "next/link";

export default function BrainfishCaseStudyPage() {
  const [selectedIntent, setSelectedIntent] = useState("billing");
  const [showResponse, setShowResponse] = useState(false);
  const [chatMessages, setChatMessages] = useState<{type: string; text: string}[]>([]);

  const intents = [
    { 
      id: "billing", 
      name: "Account & Billing", 
      icon: CreditCard,
      volume: "28%", 
      resolution: "91%",
      sample: { 
        query: "Why was I charged twice this month?", 
        response: "I see there were two charges on your account. Looking at the transaction history, the first was your regular monthly subscription on the 1st, and the second appears to be an annual add-on you signed up for on the 15th. Would you like me to show you the breakdown or help you cancel the add-on?"
      }
    },
    { 
      id: "howto", 
      name: "Product How-To", 
      icon: HelpCircle,
      volume: "24%", 
      resolution: "94%",
      sample: { 
        query: "How do I export my data to Excel?", 
        response: "To export to Excel: 1) Go to Reports in the left menu, 2) Click the three dots on any report, 3) Select 'Export as .xlsx'. You can also set up automatic weekly exports in Settings > Integrations. Would you like me to walk you through either option?"
      }
    },
    { 
      id: "technical", 
      name: "Technical Issues", 
      icon: FileQuestion,
      volume: "22%", 
      resolution: "78%",
      sample: { 
        query: "The page keeps loading forever", 
        response: "I understand you're experiencing slow loading. This is often caused by browser cache issues. Let's try: 1) Clear your browser cache, 2) Disable browser extensions temporarily, 3) Try incognito mode. If the issue persists, I'll escalate to our technical team with your session details."
      }
    },
    { 
      id: "orders", 
      name: "Order Status", 
      icon: Package,
      volume: "15%", 
      resolution: "99%",
      sample: { 
        query: "Where's my order?", 
        response: "Your order #12847 shipped yesterday via FedEx. Tracking number: 7891234567890. Current status: In transit, expected delivery Thursday by 6pm. I've also sent the tracking link to your email. Would you like me to set up SMS delivery notifications?"
      }
    },
    { 
      id: "returns", 
      name: "Returns & Refunds", 
      icon: RotateCcw,
      volume: "11%", 
      resolution: "72%",
      sample: { 
        query: "I want to return this item", 
        response: "I can help with that return. Your order from March 15th is within our 30-day return window. I've generated a prepaid return label sent to your email. Once we receive the item, your refund of $49.99 will process in 3-5 business days. Anything else I can help with?"
      }
    },
  ];

  const deflectionFunnel = [
    { stage: "Incoming Queries", count: "100,000", percentage: 100, color: "bg-slate-500" },
    { stage: "AI Understands Intent", count: "97,000", percentage: 97, color: "bg-orange-500/60" },
    { stage: "Instant Resolution", count: "83,000", percentage: 83, color: "bg-orange-500" },
    { stage: "Agent Handoff", count: "17,000", percentage: 17, color: "bg-amber-500" },
  ];

  const currentIntent = intents.find(i => i.id === selectedIntent) || intents[0];

  const simulateChat = () => {
    setChatMessages([{ type: "user", text: currentIntent.sample.query }]);
    setShowResponse(false);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: "bot", text: currentIntent.sample.response }]);
      setShowResponse(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-orange-500/5 to-amber-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    <Bot className="w-3 h-3 mr-1" />
                    Support AI
                  </Badge>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                    Ticket Deflection
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Brainfish
                </h1>

                <p className="text-xl text-muted-foreground">
                  83% of support tickets resolved without human intervention. Brainfish's AI 
                  doesn't just answer questions—it resolves issues, escalates intelligently, 
                  and makes agents more productive.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-400">83%</p>
                    <p className="text-sm text-muted-foreground">Ticket Deflection</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">95%</p>
                    <p className="text-sm text-muted-foreground">Faster Response</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">4.8/5</p>
                    <p className="text-sm text-muted-foreground">CSAT Score</p>
                  </div>
                </div>
              </div>

              {/* Deflection Funnel Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-orange-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Deflection Funnel</p>
                  </div>
                  <div className="space-y-3">
                    {deflectionFunnel.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">{item.stage}</p>
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                            {item.count}
                          </Badge>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
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

            <h2 className="text-3xl font-bold">Support Teams Drowning in Repetitive Tickets</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Knowledge bases became content graveyards—outdated articles that customers couldn't find, 
              and when they did find them, the information was often wrong. Support teams answered the 
              same questions thousands of times per month while ticket queues grew faster than headcount. 
              Customers waited days for responses to simple questions, tanking NPS scores and driving churn.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <FileX className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">47%</p>
                  <p className="text-sm text-muted-foreground">Documentation outdated</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Inbox className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">100K+</p>
                  <p className="text-sm text-muted-foreground">Monthly support tickets</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">4.2 hrs</p>
                  <p className="text-sm text-muted-foreground">Avg first response time</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Knowledge Lab - Unique Structure */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
              <MessageSquare className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Knowledge Distillation Lab</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              See how Brainfish AI handles real customer intents with instant, accurate responses
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Intent Selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Select Intent</p>
              {intents.map((intent) => (
                <motion.div key={intent.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`cursor-pointer transition-all ${selectedIntent === intent.id ? 'border-orange-500 bg-orange-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                    onClick={() => { setSelectedIntent(intent.id); setChatMessages([]); setShowResponse(false); }}
                    data-testid={`intent-${intent.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedIntent === intent.id ? 'bg-orange-500' : 'bg-slate-700'
                        }`}>
                          <intent.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{intent.name}</p>
                          <p className="text-xs text-slate-400">{intent.volume} of queries</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {intent.resolution}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Chat Simulation */}
            <div className="lg:col-span-2">
              <Card className="border-slate-700 bg-slate-800/50 h-full">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Bot className="w-5 h-5 text-orange-400" />
                      Brainfish AI
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                      Online
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Chat Window */}
                  <div className="min-h-[300px] bg-slate-900 rounded-lg p-4 mb-4 space-y-4">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-slate-500 py-12">
                        <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Click "Simulate Query" to see AI in action</p>
                      </div>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-3 rounded-lg ${
                            msg.type === 'user' 
                              ? 'bg-orange-500 text-white rounded-tr-none' 
                              : 'bg-slate-700 text-slate-100 rounded-tl-none'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </motion.div>
                      ))
                    )}
                    {chatMessages.length === 1 && !showResponse && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-700 rounded-lg p-3">
                          <div className="flex gap-1">
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-slate-500 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-slate-500 rounded-full" />
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-slate-500 rounded-full" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 p-3 rounded-lg bg-slate-700 text-sm text-slate-400">
                      {currentIntent.sample.query}
                    </div>
                    <Button
                      onClick={simulateChat}
                      className="gap-2 bg-orange-500 hover:bg-orange-600"
                      data-testid="button-simulate"
                    >
                      <Send className="w-4 h-4" />
                      Simulate
                    </Button>
                  </div>

                  {showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-green-400">Issue Resolved</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Response Time:</span>
                          <span className="text-white ml-2">1.2s</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Confidence:</span>
                          <span className="text-white ml-2">96%</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Escalation:</span>
                          <span className="text-green-400 ml-2">Not needed</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Deflection Funnel Visualization */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
              <TrendingDown className="w-3 h-3 mr-1" />
              Impact Analysis
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Support Deflection Funnel</h2>
          </div>

          <div className="space-y-4">
            {deflectionFunnel.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{level.stage}</span>
                  <span className="text-muted-foreground">{level.count}/mo</span>
                </div>
                <div className="h-10 rounded-md bg-muted overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level.percentage}%` }}
                    viewport={{ once: true }}
                    className={`h-full ${level.color} flex items-center justify-end pr-4`}
                  >
                    <span className="text-sm font-bold text-white">{level.percentage}%</span>
                  </motion.div>
                </div>
                {i < deflectionFunnel.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <Card className="mt-8 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Monthly Savings from Automation</p>
              <p className="text-4xl font-bold text-orange-400">$847,000</p>
              <p className="text-xs text-muted-foreground mt-1">Based on $10.20 avg cost per human-handled ticket</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gradient-to-b from-background to-orange-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-orange-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "We went from drowning in tickets to actually getting ahead. The AI handles the repetitive stuff instantly, and when it hands off to our team, agents already have full context. Our CSAT went up while our team size stayed flat—that's the dream scenario for any support leader."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                  TC
                </div>
                <div>
                  <p className="font-semibold">Thomas Chen</p>
                  <p className="text-sm text-muted-foreground">Head of Customer Care Automation, Brainfish</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building AI-Powered Support?</h2>
          <p className="text-slate-400 mb-8">
            Let's create systems that scale support without scaling headcount.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/polyai/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              PolyAI
            </Button>
          </Link>
          <Link href="/case-studies/knewton/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Knewton
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
