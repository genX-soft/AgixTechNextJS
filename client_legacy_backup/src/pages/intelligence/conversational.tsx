import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Phone,
  Headphones,
  Users,
  Globe,
  Brain,
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  Target,
  Layers,
  BarChart3,
  ChevronRight,
  ChevronDown,
  Building2,
  ArrowDown,
  Sparkles,
  Network,
  Cpu,
  CircleDot,
  CheckCheck,
  RotateCcw,
  HelpCircle,
  Minus,
  Plus,
  X,
  MessageCircle,
  Bot,
  Mic,
  Clock,
  DollarSign,
  Activity,
  Heart,
  Briefcase,
  ShoppingCart,
  Settings,
  Lightbulb,
  RefreshCcw,
} from "lucide-react";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50"
        data-testid="sticky-cta-container"
      >
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="w-80 shadow-xl border-orange-500/20" data-testid="card-sticky-cta">
              <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">Ready to Get Started?</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Build conversations that understand</p>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="shrink-0" 
                  onClick={() => setIsExpanded(false)}
                  data-testid="button-sticky-cta-close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                  onClick={() => scrollToSection("cta-form")}
                  data-testid="button-sticky-cta-contact"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => { scrollToSection("interactive-tools"); setIsExpanded(false); }}
                  data-testid="button-sticky-cta-tools"
                >
                  Try Our Assessment Tools
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
              onClick={() => setIsExpanded(true)}
              data-testid="button-sticky-cta-toggle"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function HeroSection() {
  return (
    <section className="pt-24 pb-20 min-h-[80vh] flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 px-4 py-1.5" data-testid="badge-intelligence-category">
            <MessageSquare className="w-4 h-4 mr-2" />
            Intelligence
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
            Conversational Intelligence That{" "}
            <span className="text-purple-400">Understands, Not Just Responds</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-subheadline">
            Most businesses already use chatbots or voice systems. The real challenge is not replying to customers — it's understanding intent, context, and urgency, then acting correctly. Agix Technologies builds Conversational Intelligence systems that turn everyday conversations into meaningful decisions and outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 focus:ring-2 focus:ring-orange-500/50"
              onClick={() => scrollToSection("interactive-tools")}
              data-testid="button-hero-primary-cta"
            >
              Find the Right Conversational Intelligence
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection("what-is-ci")}
              data-testid="button-hero-secondary-cta"
            >
              Explore How Conversational Intelligence Works
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function TrustStrip() {
  const industries = [
    "Healthcare",
    "Finance",
    "E-commerce",
    "SaaS",
    "Enterprise Operations"
  ];

  return (
    <section className="py-6 border-y border-border/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="font-medium">Trusted for building conversational AI systems across:</span>
          {industries.map((industry, i) => (
            <Badge key={i} variant="outline" className="border-slate-700" data-testid={`badge-industry-${i}`}>
              {industry}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIsConversationalIntelligence() {
  const capabilities = [
    { icon: Brain, text: "Understands why someone is speaking, not just what they say" },
    { icon: Layers, text: "Maintains context across messages or calls" },
    { icon: Network, text: "Connects conversations to business systems and workflows" },
    { icon: TrendingUp, text: "Improves over time through learning and feedback" },
  ];

  return (
    <section id="what-is-ci" className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-what-is">
              <HelpCircle className="w-3 h-3 mr-1" />
              Definition
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-what-is">
              What Is Conversational Intelligence?
            </h2>
            <p className="text-lg text-muted-foreground">
              The ability of an AI system to understand human conversations, interpret intent and context, and trigger the correct response or action — not just generate text or speech.
            </p>
          </div>

          <Card className="mb-8 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20" data-testid="card-definition">
            <CardContent className="p-6">
              <p className="text-xl font-semibold text-center">
                Conversational Intelligence turns conversations into decisions, actions, and outcomes.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full" data-testid={`card-capability-${i}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                      <cap.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-sm">{cap.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="border-slate-700/50" data-testid="card-search-intent">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                This is why searches such as these are rapidly increasing:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">Conversational AI vs chatbot</Badge>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">AI voice agents for business</Badge>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">Enterprise conversational AI solutions</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function ConversationCategories() {
  const categories = [
    {
      title: "Customer Conversations",
      icon: Headphones,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      items: [
        "Customer support chats",
        "Voice calls and IVR interactions",
        "WhatsApp and messaging apps",
        "Order, booking, and inquiry conversations"
      ]
    },
    {
      title: "Sales & Growth Conversations",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      items: [
        "Lead qualification chats",
        "Product inquiries",
        "Follow-up and reminder conversations",
        "Upsell and cross-sell interactions"
      ]
    },
    {
      title: "Internal Conversations",
      icon: Users,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      items: [
        "Employee support queries",
        "IT and HR helpdesk conversations",
        "Task creation and updates",
        "Internal knowledge requests"
      ]
    },
    {
      title: "Multichannel & Multilingual",
      icon: Globe,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      items: [
        "Chat, voice, and messaging combined",
        "Language switching",
        "Context carried across channels"
      ]
    }
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-categories">
            <MessageSquare className="w-3 h-3 mr-1" />
            Conversation Types
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-categories">
            What Counts as a "Conversation" in Business?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In real businesses, conversations are not limited to website chats. Conversational Intelligence applies across all communication channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full" data-testid={`card-category-${i}`}>
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 rounded-lg ${cat.bgColor} flex items-center justify-center mb-3`}>
                    <cat.icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <CardTitle className="text-lg">{cat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className={`w-4 h-4 ${cat.color} shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground">
            Most businesses handle these conversations manually or with disconnected tools.{" "}
            <span className="text-purple-400 font-medium">Conversational Intelligence unifies them into one intelligent conversation layer.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function WhyChatbotsFail() {
  const problems = [
    { text: "Conversations feel robotic", icon: Bot },
    { text: "Context is lost across turns", icon: RotateCcw },
    { text: "Edge cases break the flow", icon: AlertTriangle },
    { text: "Wrong actions are taken", icon: XCircle },
    { text: "Human agents must step in constantly", icon: Users },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="border-red-500/30 text-red-400 mb-4" data-testid="badge-problems">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Problem
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-chatbots-fail">
              Why Traditional Chatbots and Voice Systems Fall Short
            </h2>
            <p className="text-muted-foreground mb-6">
              Many organizations already use rule-based chatbots, IVR systems, and LLM-powered responders. Yet common complaints persist.
            </p>
            <Card className="bg-slate-900/50 border-red-500/20 mb-6" data-testid="card-reason">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">The reason is simple:</span> Most systems respond to messages. They do not understand intent or context.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-sm font-medium text-muted-foreground mb-4">Without Conversational Intelligence:</p>
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-red-500/10" data-testid={`card-problem-${i}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <problem.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-sm">{problem.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const comparisons = [
    {
      feature: "Approach",
      chatbots: "Follow scripts or basic prompts",
      voiceBots: "Route calls based on menus",
      ci: "Understands intent, tone, and urgency"
    },
    {
      feature: "Context",
      chatbots: "Answer predefined questions",
      voiceBots: "Limited understanding",
      ci: "Maintains context across conversation turns"
    },
    {
      feature: "Actions",
      chatbots: "Display information",
      voiceBots: "Transfer calls",
      ci: "Connects to real business actions"
    },
    {
      feature: "Escalation",
      chatbots: "Manual handoff",
      voiceBots: "Menu-based routing",
      ci: "Escalates intelligently when needed"
    }
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-comparison">
            <BarChart3 className="w-3 h-3 mr-1" />
            Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-comparison">
            Conversational Intelligence vs Chatbots vs Voice Bots
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conversational Intelligence is not a channel. It is an intelligence layer that works across channels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden" data-testid="card-comparison-table">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-medium text-muted-foreground">Feature</th>
                    <th className="p-4 text-left font-medium">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-slate-400" />
                        Chatbots
                      </div>
                    </th>
                    <th className="p-4 text-left font-medium">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-slate-400" />
                        Voice Bots / IVR
                      </div>
                    </th>
                    <th className="p-4 text-left font-medium">
                      <div className="flex items-center gap-2 text-purple-400">
                        <Brain className="w-4 h-4" />
                        Conversational Intelligence
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-sm text-muted-foreground">{row.chatbots}</td>
                      <td className="p-4 text-sm text-muted-foreground">{row.voiceBots}</td>
                      <td className="p-4 text-sm text-purple-400 font-medium">{row.ci}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function WhyBusinessesNeedIt() {
  const challenges = [
    "High volume of repetitive conversations",
    "Human agents answering the same questions",
    "Delays in response and resolution",
    "Inconsistent customer experience",
    "Lost opportunities hidden in conversations"
  ];

  const benefits = [
    "Reduce manual workload",
    "Improve response accuracy",
    "Maintain consistency across channels",
    "Act faster on customer intent",
    "Scale conversations without sacrificing quality"
  ];

  return (
    <section id="why-need" className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-why-need">
            <Target className="w-3 h-3 mr-1" />
            Business Value
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-need">
            Why Businesses Are Adopting Conversational Intelligence
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-red-500/20" data-testid="card-challenges">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <CardTitle>Common Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {challenges.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-green-500/20" data-testid="card-benefits">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle>With Conversational Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground">
            This is why AI-driven Conversational Intelligence is now a{" "}
            <span className="text-purple-400 font-medium">strategic capability — not just a support tool.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const layers = [
    {
      number: "01",
      title: "Conversation Input Layer",
      subtitle: "Listening Across Channels",
      description: "Captures conversations from all channels including website chat, mobile apps, WhatsApp, voice calls, IVR, and internal chat tools. Preserves conversation context from the first message.",
      icon: Headphones,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      number: "02",
      title: "Understanding & Context Layer",
      subtitle: "Knowing What the User Means",
      description: "Detects user intent (not just keywords), tracks context across turns, identifies urgency and sentiment, resolves ambiguity, and maintains short-term and long-term memory.",
      icon: Brain,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      number: "03",
      title: "Reasoning & Decision Layer",
      subtitle: "Deciding What Should Happen",
      description: "Combines AI reasoning with business logic, risk thresholds, and compliance rules to determine safe and appropriate actions. Prevents hallucinated answers and overconfident automation.",
      icon: Lightbulb,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    {
      number: "04",
      title: "Action & Orchestration Layer",
      subtitle: "Taking the Right Action",
      description: "Connects conversations to real outcomes: accurate responses, triggered workflows, system updates, scheduled appointments, intelligent escalation. All actions are logged and traceable.",
      icon: Zap,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      number: "05",
      title: "Learning & Feedback Layer",
      subtitle: "Improving Over Time",
      description: "Learns from successful resolutions, incorporates human corrections, improves intent detection, refines decision thresholds, and adapts to new conversation patterns.",
      icon: RefreshCcw,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-architecture">
            <Layers className="w-3 h-3 mr-1" />
            System Architecture
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-architecture">
            How Conversational Intelligence Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every Conversational Intelligence solution follows a five-layer architecture ensuring accuracy, safety, scalability, and trust.
          </p>
        </motion.div>

        <div className="space-y-4">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-visible" data-testid={`card-layer-${i}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex items-center gap-4">
                      <span className={`text-3xl font-bold ${layer.color} opacity-50`}>{layer.number}</span>
                      <div className={`w-14 h-14 rounded-xl ${layer.bgColor} flex items-center justify-center shrink-0`}>
                        <layer.icon className={`w-7 h-7 ${layer.color}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{layer.title}</h3>
                      <p className={`text-sm ${layer.color} mb-2`}>{layer.subtitle}</p>
                      <p className="text-muted-foreground text-sm">{layer.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgixMethodology() {
  const steps = [
    {
      step: "1",
      title: "Conversation Mapping",
      description: "Understand real conversation flows — not ideal scripts."
    },
    {
      step: "2",
      title: "Intent & Risk Identification",
      description: "Identify what users ask, and what can go wrong."
    },
    {
      step: "3",
      title: "Intelligence Design",
      description: "Define understanding, reasoning, and action layers."
    },
    {
      step: "4",
      title: "Controlled Rollout",
      description: "Start with assistive responses before autonomy."
    },
    {
      step: "5",
      title: "Continuous Optimization",
      description: "Improve accuracy using real feedback and outcomes."
    }
  ];

  const governance = [
    "Human-in-the-loop controls",
    "Confidence thresholds",
    "Restricted action scopes",
    "Explainable decisions",
    "Audit trails and logs"
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-4" data-testid="badge-methodology">
            <Settings className="w-3 h-3 mr-1" />
            Our Approach
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-methodology">
            How Agix Builds Conversational Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a structured approach that ensures trust, adoption, and measurable impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full" data-testid="card-methodology-steps">
              <CardHeader>
                <CardTitle>Implementation Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-orange-400">{step.step}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-purple-500/20" data-testid="card-governance">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle>Built-In Governance</CardTitle>
                <p className="text-sm text-muted-foreground">
                  A top concern: "How do you prevent AI hallucinations in chatbots?"
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {governance.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <p className="text-sm text-purple-300 font-medium">
                    We prioritize safe intelligence over flashy demos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InteractiveToolsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [solutionFinder, setSolutionFinder] = useState({ step: 1, industry: "", useCase: "", channel: "", volume: "", complexity: "", systemActions: "", escalation: "", compliance: "", tolerance: "", humanFallback: "", brandSensitivity: "" });
  const [riskAssessment, setRiskAssessment] = useState({ step: 1, wrongAnswerImpact: "", multiTurn: "", dataSensitivity: "", humanJudgment: "" });
  const [costEstimator, setCostEstimator] = useState({ monthlyVolume: "", avgHandlingTime: "", repetitivePercent: "", humanRate: "", costPerInteraction: "" });
  const [maturityStage, setMaturityStage] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const resetSolutionFinder = () => setSolutionFinder({ step: 1, industry: "", useCase: "", channel: "", volume: "", complexity: "", systemActions: "", escalation: "", compliance: "", tolerance: "", humanFallback: "", brandSensitivity: "" });
  const resetRiskAssessment = () => setRiskAssessment({ step: 1, wrongAnswerImpact: "", multiTurn: "", dataSensitivity: "", humanJudgment: "" });
  const resetCostEstimator = () => setCostEstimator({ monthlyVolume: "", avgHandlingTime: "", repetitivePercent: "", humanRate: "", costPerInteraction: "" });

  const tools = [
    { id: 0, title: "Solution Finder", icon: Target },
    { id: 1, title: "Risk Assessment", icon: Shield },
    { id: 2, title: "Cost Estimator", icon: DollarSign },
    { id: 3, title: "Maturity Map", icon: Layers },
    { id: 4, title: "Industry Models", icon: Building2 }
  ];

  const canProceedStep1 = solutionFinder.industry && solutionFinder.useCase && solutionFinder.channel && solutionFinder.volume;
  const canProceedStep2 = solutionFinder.complexity && solutionFinder.systemActions && solutionFinder.escalation && solutionFinder.compliance;
  const canShowResults = solutionFinder.tolerance && solutionFinder.humanFallback && solutionFinder.brandSensitivity;

  const canShowRiskResults = riskAssessment.wrongAnswerImpact && riskAssessment.multiTurn && riskAssessment.dataSensitivity && riskAssessment.humanJudgment;
  const canShowCostResults = costEstimator.monthlyVolume && costEstimator.avgHandlingTime && costEstimator.repetitivePercent && costEstimator.humanRate && costEstimator.costPerInteraction;

  const maturityStages = [
    { stage: 1, title: "Scripted Bots", traits: ["Menu-based, rigid", "Low accuracy", "High human fallback"], risks: "High customer frustration, limited scalability" },
    { stage: 2, title: "LLM Responders", traits: ["Better language", "High risk without controls"], risks: "Hallucination risk, inconsistent quality" },
    { stage: 3, title: "Context-Aware Assistants", traits: ["Intent understanding", "Safer automation"], risks: "Requires careful training and monitoring" },
    { stage: 4, title: "Decision-Driven Systems", traits: ["Reasoning + actions", "Governed, auditable, scalable"], risks: "Higher initial investment, needs organizational alignment" }
  ];

  const industryModels = [
    { id: "healthcare", title: "Healthcare", icon: Heart, useCases: ["Patient intake and triage", "Appointment scheduling", "Follow-ups and reminders"], whyMatters: ["High accuracy required", "Sensitive data", "Clear escalation to humans"], outcome: "Reduced front-desk load, better patient experience, safer AI deployment" },
    { id: "finance", title: "Finance & Insurance", icon: Briefcase, useCases: ["Customer support", "Policy and account queries", "Verification and documentation"], whyMatters: ["Compliance sensitivity", "High cost of wrong answers", "Audit requirements"], outcome: "Faster resolution, controlled automation, reduced compliance risk" },
    { id: "ecommerce", title: "E-commerce & Retail", icon: ShoppingCart, useCases: ["Order tracking", "Returns and refunds", "Product questions", "Upsell and cross-sell"], whyMatters: ["High volume", "Seasonal spikes", "Experience consistency"], outcome: "Lower support cost, higher conversion, scalable customer experience" },
    { id: "saas", title: "SaaS & Technology", icon: Cpu, useCases: ["Product support", "Onboarding guidance", "Usage questions", "Renewal and retention"], whyMatters: ["Complex products", "Context-heavy conversations"], outcome: "Faster onboarding, reduced churn, better customer satisfaction" },
    { id: "enterprise", title: "Enterprise Operations", icon: Building2, useCases: ["IT helpdesk", "HR queries", "Policy and knowledge access", "Internal task creation"], whyMatters: ["Internal efficiency", "Reduced ticket load"], outcome: "Faster employee support, lower operational overhead" }
  ];

  return (
    <section id="interactive-tools" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-tools">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive Tools
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-tools">
            Find the Right Conversational Intelligence Solution
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use these tools to discover, assess, and plan your conversational AI implementation with confidence.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTab === tool.id ? "default" : "outline"}
              onClick={() => { setActiveTab(tool.id); resetSolutionFinder(); resetRiskAssessment(); resetCostEstimator(); setMaturityStage(null); setSelectedIndustry(null); }}
              className={activeTab === tool.id ? "bg-purple-500 hover:bg-purple-600" : ""}
              data-testid={`button-tool-tab-${tool.id}`}
            >
              <tool.icon className="w-4 h-4 mr-2" />
              {tool.title}
            </Button>
          ))}
        </div>

        <Card className="min-h-[500px]" data-testid="card-tool-content">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div key="solution" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xl font-bold mb-6">Conversational Intelligence Solution Finder</h3>
                  
                  {solutionFinder.step === 1 && (
                    <div className="space-y-6">
                      <p className="text-muted-foreground">Step 1: Conversation Context</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Industry</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.industry} onChange={(e) => setSolutionFinder({ ...solutionFinder, industry: e.target.value })} data-testid="select-industry">
                            <option value="">Select industry</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance & Insurance</option>
                            <option value="ecommerce">E-commerce & Retail</option>
                            <option value="saas">SaaS & Technology</option>
                            <option value="enterprise">Enterprise</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Primary Use Case</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.useCase} onChange={(e) => setSolutionFinder({ ...solutionFinder, useCase: e.target.value })} data-testid="select-usecase">
                            <option value="">Select use case</option>
                            <option value="support">Customer Support</option>
                            <option value="sales">Sales & Lead Qualification</option>
                            <option value="internal">Internal Operations</option>
                            <option value="mixed">Mixed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Channel Preference</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.channel} onChange={(e) => setSolutionFinder({ ...solutionFinder, channel: e.target.value })} data-testid="select-channel">
                            <option value="">Select channel</option>
                            <option value="chat">Chat Only</option>
                            <option value="voice">Voice Only</option>
                            <option value="whatsapp">WhatsApp / Messaging</option>
                            <option value="hybrid">Hybrid / Multi-channel</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Monthly Conversation Volume</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.volume} onChange={(e) => setSolutionFinder({ ...solutionFinder, volume: e.target.value })} data-testid="select-volume">
                            <option value="">Select volume</option>
                            <option value="low">Under 1,000</option>
                            <option value="medium">1,000 - 10,000</option>
                            <option value="high">10,000 - 50,000</option>
                            <option value="enterprise">50,000+</option>
                          </select>
                        </div>
                      </div>
                      <Button onClick={() => setSolutionFinder({ ...solutionFinder, step: 2 })} disabled={!canProceedStep1} className="bg-purple-500 hover:bg-purple-600" data-testid="button-step1-next">
                        Continue to Complexity <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}

                  {solutionFinder.step === 2 && (
                    <div className="space-y-6">
                      <p className="text-muted-foreground">Step 2: Conversation Complexity</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Are conversations repetitive or open-ended?</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.complexity} onChange={(e) => setSolutionFinder({ ...solutionFinder, complexity: e.target.value })} data-testid="select-complexity">
                            <option value="">Select</option>
                            <option value="repetitive">Mostly repetitive</option>
                            <option value="mixed">Mix of both</option>
                            <option value="openended">Mostly open-ended</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Do conversations require system actions?</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.systemActions} onChange={(e) => setSolutionFinder({ ...solutionFinder, systemActions: e.target.value })} data-testid="select-actions">
                            <option value="">Select</option>
                            <option value="no">No, just information</option>
                            <option value="sometimes">Sometimes</option>
                            <option value="frequently">Frequently</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">How often do conversations escalate to humans?</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.escalation} onChange={(e) => setSolutionFinder({ ...solutionFinder, escalation: e.target.value })} data-testid="select-escalation">
                            <option value="">Select</option>
                            <option value="rarely">Rarely (under 10%)</option>
                            <option value="sometimes">Sometimes (10-30%)</option>
                            <option value="often">Often (30%+)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Is compliance or accuracy critical?</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.compliance} onChange={(e) => setSolutionFinder({ ...solutionFinder, compliance: e.target.value })} data-testid="select-compliance">
                            <option value="">Select</option>
                            <option value="low">Not particularly</option>
                            <option value="medium">Somewhat important</option>
                            <option value="high">Very critical</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setSolutionFinder({ ...solutionFinder, step: 1 })} data-testid="button-step2-back">Back</Button>
                        <Button onClick={() => setSolutionFinder({ ...solutionFinder, step: 3 })} disabled={!canProceedStep2} className="bg-purple-500 hover:bg-purple-600" data-testid="button-step2-next">
                          Continue to Risk <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {solutionFinder.step === 3 && !canShowResults && (
                    <div className="space-y-6">
                      <p className="text-muted-foreground">Step 3: Risk & Control Signals</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Tolerance for wrong answers</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.tolerance} onChange={(e) => setSolutionFinder({ ...solutionFinder, tolerance: e.target.value })} data-testid="select-tolerance">
                            <option value="">Select</option>
                            <option value="low">Low tolerance</option>
                            <option value="medium">Medium tolerance</option>
                            <option value="high">High tolerance</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Need for human fallback</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.humanFallback} onChange={(e) => setSolutionFinder({ ...solutionFinder, humanFallback: e.target.value })} data-testid="select-fallback">
                            <option value="">Select</option>
                            <option value="always">Always available</option>
                            <option value="sometimes">Sometimes needed</option>
                            <option value="rarely">Rarely needed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Brand sensitivity</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={solutionFinder.brandSensitivity} onChange={(e) => setSolutionFinder({ ...solutionFinder, brandSensitivity: e.target.value })} data-testid="select-brand">
                            <option value="">Select</option>
                            <option value="high">High - premium brand</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low - functional focus</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setSolutionFinder({ ...solutionFinder, step: 2 })} data-testid="button-step3-back">Back</Button>
                      </div>
                    </div>
                  )}

                  {canShowResults && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                        <h4 className="text-lg font-bold mb-4 text-purple-400">Your Recommended Solution</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div><span className="text-muted-foreground">Type:</span> <span className="font-medium ml-2">{solutionFinder.systemActions === "frequently" ? "Transactional" : solutionFinder.complexity === "openended" ? "Decision-Driven" : "Informational"}</span></div>
                          <div><span className="text-muted-foreground">Channel:</span> <span className="font-medium ml-2">{solutionFinder.channel === "hybrid" ? "Multimodal" : solutionFinder.channel}</span></div>
                          <div><span className="text-muted-foreground">Intelligence Depth:</span> <span className="font-medium ml-2">{solutionFinder.tolerance === "low" ? "Assistive (AI supports humans)" : solutionFinder.tolerance === "medium" ? "Controlled Autonomy" : "Autonomous within guardrails"}</span></div>
                          <div><span className="text-muted-foreground">Timeline:</span> <span className="font-medium ml-2">{solutionFinder.volume === "enterprise" ? "12-16 weeks" : solutionFinder.volume === "high" ? "8-12 weeks" : "4-8 weeks"}</span></div>
                        </div>
                      </div>
                      <Button onClick={resetSolutionFinder} variant="outline" data-testid="button-reset-solution">Start Over</Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div key="risk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xl font-bold mb-6">Conversation Risk & Readiness Assessment</h3>
                  {!canShowRiskResults ? (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Impact of wrong answers</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={riskAssessment.wrongAnswerImpact} onChange={(e) => setRiskAssessment({ ...riskAssessment, wrongAnswerImpact: e.target.value })} data-testid="select-risk-impact">
                            <option value="">Select</option>
                            <option value="low">Low - minor inconvenience</option>
                            <option value="medium">Medium - customer frustration</option>
                            <option value="high">High - legal/financial risk</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Multi-turn conversation complexity</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={riskAssessment.multiTurn} onChange={(e) => setRiskAssessment({ ...riskAssessment, multiTurn: e.target.value })} data-testid="select-risk-multiturn">
                            <option value="">Select</option>
                            <option value="simple">Simple - 1-3 turns</option>
                            <option value="moderate">Moderate - 3-7 turns</option>
                            <option value="complex">Complex - 7+ turns</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Data sensitivity level</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={riskAssessment.dataSensitivity} onChange={(e) => setRiskAssessment({ ...riskAssessment, dataSensitivity: e.target.value })} data-testid="select-risk-data">
                            <option value="">Select</option>
                            <option value="public">Public information only</option>
                            <option value="internal">Internal business data</option>
                            <option value="sensitive">Personal/financial data</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Human judgment requirement</label>
                          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={riskAssessment.humanJudgment} onChange={(e) => setRiskAssessment({ ...riskAssessment, humanJudgment: e.target.value })} data-testid="select-risk-human">
                            <option value="">Select</option>
                            <option value="rarely">Rarely needed</option>
                            <option value="sometimes">Sometimes needed</option>
                            <option value="often">Often required</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                        <h4 className="text-lg font-bold mb-4">Risk Assessment Results</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">Risk Score:</span>
                            <Badge className={riskAssessment.wrongAnswerImpact === "high" ? "bg-red-500" : riskAssessment.wrongAnswerImpact === "medium" ? "bg-amber-500" : "bg-green-500"}>
                              {riskAssessment.wrongAnswerImpact === "high" ? "High Risk" : riskAssessment.wrongAnswerImpact === "medium" ? "Medium Risk" : "Low Risk"}
                            </Badge>
                          </div>
                          <div><span className="text-muted-foreground">Recommended Control Level:</span> <span className="font-medium ml-2">{riskAssessment.wrongAnswerImpact === "high" ? "Human-Led with AI Assist" : riskAssessment.wrongAnswerImpact === "medium" ? "AI-Assisted with Human Oversight" : "Controlled AI with Monitoring"}</span></div>
                          <div className="p-4 rounded-lg bg-slate-800/50">
                            <p className="text-sm font-medium mb-2">Governance Recommendations:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• {riskAssessment.wrongAnswerImpact === "high" ? "Mandatory human review for all actions" : "Confidence threshold gates"}</li>
                              <li>• {riskAssessment.dataSensitivity === "sensitive" ? "Data masking and access controls required" : "Standard audit logging"}</li>
                              <li>• {riskAssessment.humanJudgment === "often" ? "Quick escalation paths essential" : "Smart escalation triggers"}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <Button onClick={resetRiskAssessment} variant="outline" data-testid="button-reset-risk">Start Over</Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div key="cost" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xl font-bold mb-6">Conversation Volume & Cost Impact Estimator</h3>
                  {!canShowCostResults ? (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Monthly conversation volume</label>
                          <input type="number" placeholder="e.g., 5000" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={costEstimator.monthlyVolume} onChange={(e) => setCostEstimator({ ...costEstimator, monthlyVolume: e.target.value })} data-testid="input-cost-volume" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Avg handling time (minutes)</label>
                          <input type="number" placeholder="e.g., 8" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={costEstimator.avgHandlingTime} onChange={(e) => setCostEstimator({ ...costEstimator, avgHandlingTime: e.target.value })} data-testid="input-cost-time" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">% repetitive questions</label>
                          <input type="number" placeholder="e.g., 60" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={costEstimator.repetitivePercent} onChange={(e) => setCostEstimator({ ...costEstimator, repetitivePercent: e.target.value })} data-testid="input-cost-repetitive" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Human involvement rate (%)</label>
                          <input type="number" placeholder="e.g., 80" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={costEstimator.humanRate} onChange={(e) => setCostEstimator({ ...costEstimator, humanRate: e.target.value })} data-testid="input-cost-human" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Avg cost per interaction ($)</label>
                          <input type="number" placeholder="e.g., 12" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700" value={costEstimator.costPerInteraction} onChange={(e) => setCostEstimator({ ...costEstimator, costPerInteraction: e.target.value })} data-testid="input-cost-per" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="border-purple-500/20">
                          <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground text-sm mb-2">Annual Handling Cost</p>
                            <p className="text-3xl font-bold text-purple-400">${(Number(costEstimator.monthlyVolume) * 12 * Number(costEstimator.costPerInteraction)).toLocaleString()}</p>
                          </CardContent>
                        </Card>
                        <Card className="border-green-500/20">
                          <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground text-sm mb-2">Potential Savings (40%)</p>
                            <p className="text-3xl font-bold text-green-400">${(Number(costEstimator.monthlyVolume) * 12 * Number(costEstimator.costPerInteraction) * 0.4).toLocaleString()}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground text-sm mb-2">Hours Saved / Year</p>
                            <p className="text-3xl font-bold">{Math.round(Number(costEstimator.monthlyVolume) * 12 * (Number(costEstimator.repetitivePercent) / 100) * (Number(costEstimator.avgHandlingTime) / 60) * 0.7).toLocaleString()}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground text-sm mb-2">ROI Timeline</p>
                            <p className="text-3xl font-bold">3-6 months</p>
                          </CardContent>
                        </Card>
                      </div>
                      <Button onClick={resetCostEstimator} variant="outline" data-testid="button-reset-cost">Recalculate</Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 3 && (
                <motion.div key="maturity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xl font-bold mb-6">Conversational Intelligence Maturity Map</h3>
                  <p className="text-muted-foreground mb-6">Select your current stage to see capabilities, risks, and when to move forward.</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {maturityStages.map((stage) => (
                      <Card key={stage.stage} className={`cursor-pointer transition-all ${maturityStage === stage.stage ? "ring-2 ring-purple-500 border-purple-500" : ""}`} onClick={() => setMaturityStage(stage.stage)} data-testid={`card-maturity-${stage.stage}`}>
                        <CardContent className="p-4">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                            <span className="font-bold text-purple-400">{stage.stage}</span>
                          </div>
                          <h4 className="font-semibold mb-2">{stage.title}</h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {stage.traits.map((trait, i) => <li key={i}>• {trait}</li>)}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {maturityStage && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Card className="border-purple-500/20">
                        <CardContent className="p-6">
                          <h4 className="font-bold mb-2">Stage {maturityStage}: {maturityStages[maturityStage - 1].title}</h4>
                          <p className="text-sm text-muted-foreground mb-4"><strong>Key Risks:</strong> {maturityStages[maturityStage - 1].risks}</p>
                          <p className="text-sm"><strong>Next Step:</strong> {maturityStage < 4 ? `Move to Stage ${maturityStage + 1} - ${maturityStages[maturityStage].title}` : "Optimize and scale your decision-driven system"}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 4 && (
                <motion.div key="industry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-xl font-bold mb-6">Industry-Specific Conversational Intelligence Models</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {industryModels.map((ind) => (
                      <Button key={ind.id} variant={selectedIndustry === ind.id ? "default" : "outline"} onClick={() => setSelectedIndustry(ind.id)} className={selectedIndustry === ind.id ? "bg-purple-500 hover:bg-purple-600" : ""} data-testid={`button-industry-${ind.id}`}>
                        <ind.icon className="w-4 h-4 mr-2" />
                        {ind.title}
                      </Button>
                    ))}
                  </div>
                  {selectedIndustry && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      {industryModels.filter(i => i.id === selectedIndustry).map(ind => (
                        <Card key={ind.id} className="border-purple-500/20" data-testid={`card-industry-detail-${ind.id}`}>
                          <CardContent className="p-6">
                            <div className="grid md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="font-bold mb-3 text-purple-400">Use Cases</h4>
                                <ul className="space-y-2 text-sm">
                                  {ind.useCases.map((uc, i) => <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />{uc}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-bold mb-3 text-amber-400">Why Intelligence Matters</h4>
                                <ul className="space-y-2 text-sm">
                                  {ind.whyMatters.map((wm, i) => <li key={i} className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />{wm}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-bold mb-3 text-green-400">Expected Outcome</h4>
                                <p className="text-sm">{ind.outcome}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ResultsMetrics() {
  const metrics = [
    { value: "45%", label: "Reduction in Response Time", icon: Clock },
    { value: "60%", label: "Decrease in Escalations", icon: Users },
    { value: "35%", label: "Lower Support Costs", icon: DollarSign },
    { value: "50%", label: "Higher Customer Satisfaction", icon: TrendingUp },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-results">
            <TrendingUp className="w-3 h-3 mr-1" />
            Proven Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-results">
            What Businesses Achieve with Conversational Intelligence
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center border-green-500/10" data-testid={`card-metric-${i}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-4xl font-bold text-green-400 mb-2">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "What is Conversational Intelligence in simple terms?", answer: "Conversational Intelligence allows AI to understand intent and context in conversations and take the right action, not just reply with text or voice." },
    { question: "Is Conversational Intelligence the same as chatbots?", answer: "No. Chatbots respond to questions. Conversational Intelligence understands conversations, reasons safely, and connects to real business actions." },
    { question: "How is Conversational Intelligence different from Conversational AI?", answer: "Conversational AI often focuses on language generation. Conversational Intelligence focuses on understanding, decision-making, and outcomes, with governance and control." },
    { question: "Are AI chatbots and voice agents safe for real customers?", answer: "They are safe only when designed with controls. Agix systems include human-in-the-loop, confidence thresholds, and auditability." },
    { question: "How do you prevent AI hallucinations in conversations?", answer: "By combining restricted knowledge sources, confidence scoring, decision rules, and human fallback mechanisms." },
    { question: "Can Conversational Intelligence work across chat, voice, and WhatsApp?", answer: "Yes. Conversational Intelligence is channel-agnostic and can operate across chat, voice, and messaging platforms." },
    { question: "Do I need a large dataset to start?", answer: "No. Conversational Intelligence systems can start with existing conversations and improve over time." },
    { question: "Will Conversational Intelligence replace human agents?", answer: "No. It reduces repetitive work and supports humans, allowing agents to focus on complex cases." },
    { question: "How long does it take to implement Conversational Intelligence?", answer: "Early value can be seen in 4-6 weeks, with more advanced capabilities rolling out gradually." },
    { question: "Is Conversational Intelligence expensive?", answer: "Cost depends on complexity, but starting with assistive intelligence is affordable compared to large automation projects." },
    { question: "Can Conversational Intelligence integrate with CRM and internal systems?", answer: "Yes. Agix builds systems that integrate with CRM, ticketing, scheduling, and backend platforms." },
    { question: "How does Conversational Intelligence handle sensitive data?", answer: "Through access controls, data masking, role-based permissions, and compliance-aware design." },
    { question: "What is the biggest mistake companies make with conversational AI?", answer: "Deploying LLMs without governance, intent control, or escalation logic." },
    { question: "Can Conversational Intelligence handle multilingual users?", answer: "Yes. It can understand and respond in multiple languages while maintaining context." },
    { question: "How does Conversational Intelligence improve over time?", answer: "It learns from successful resolutions, human corrections, feedback loops, and new conversation patterns." },
    { question: "Is Conversational Intelligence suitable for internal operations?", answer: "Absolutely. Many companies use it for IT, HR, and internal support to reduce ticket volume." },
    { question: "What types of conversations should not be automated?", answer: "High-risk, highly subjective, or legally sensitive conversations should always involve human oversight." },
    { question: "How do we decide where to start with Conversational Intelligence?", answer: "That's why Agix provides Solution Finder and Risk Assessment tools — to guide safe starting points." },
    { question: "Can Conversational Intelligence help increase sales?", answer: "Yes, by qualifying leads, answering product questions, reducing response time, and guiding users to the right next step." },
    { question: "Is Conversational Intelligence a one-time setup?", answer: "No. It's a living system that evolves as conversations, products, and customers change." },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-faq">
            <HelpCircle className="w-3 h-3 mr-1" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-faq">
            Real Questions About Conversational Intelligence
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="overflow-visible" data-testid={`card-faq-${i}`}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4"
                  aria-expanded={openIndex === i}
                  data-testid={`button-faq-toggle-${i}`}
                >
                  <span className="font-medium" data-testid={`text-faq-question-${i}`}>{faq.question}</span>
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-purple-500 text-white' : 'bg-slate-700'}`}>
                    {openIndex === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 text-muted-foreground text-sm" data-testid={`text-faq-answer-${i}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ConversationalIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <HeroSection />
      <TrustStrip />
      <WhatIsConversationalIntelligence />
      <ConversationCategories />
      <WhyChatbotsFail />
      <ComparisonTable />
      <WhyBusinessesNeedIt />
      <ArchitectureSection />
      <AgixMethodology />
      <InteractiveToolsSection />
      <ResultsMetrics />
      <FAQSection />
      <section id="cta-form" className="py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <CtaForm 
            headline="Build Conversations That Actually Understand"
            subheadline="Your conversations don't need more scripts. They need intelligence. Let's discuss how Conversational Intelligence can transform your customer interactions."
          />
        </div>
      </section>
      <StickyCTA />
    </div>
  );
}
