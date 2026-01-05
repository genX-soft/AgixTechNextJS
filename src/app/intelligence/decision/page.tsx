'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronDown,
  Check,
  X,
  Brain,
  Layers,
  Network,
  TrendingUp,
  Target,
  Shield,
  Clock,
  Users,
  Building2,
  Zap,
  AlertTriangle,
  BarChart3,
  Scale,
  Lightbulb,
  ArrowUpRight,
  HelpCircle,
  Play,
  Calculator,
  Map,
  FileText,
  Briefcase,
  Heart,
  DollarSign,
  ShoppingCart,
  Server,
  Building,
  RefreshCw,
  Eye,
  Settings,
  CircleDot,
  Gauge,
  Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaForm } from "@/components/forms/cta-form";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function HeroSection() {
  return (
    <section className="pt-24 lg:pt-28 pb-20 min-h-[80vh] flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-4 py-1.5" data-testid="badge-intelligence-category">
            <Scale className="w-4 h-4 mr-2" />
            Intelligence
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
            Decision Intelligence That Helps You{" "}
            <span className="text-emerald-400">Choose Right — Every Time</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-subheadline">
            Most businesses don't struggle because they lack data. They struggle because decisions are delayed, inconsistent, or made with incomplete context. Agix Technologies builds Decision Intelligence systems that help organizations evaluate trade-offs, understand risk, and make better decisions — faster and with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 focus:ring-2 focus:ring-orange-500/50"
              onClick={() => scrollToSection("interactive-tools")}
              data-testid="button-hero-primary-cta"
            >
              Find the Right Decision Intelligence
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection("what-is-di")}
              data-testid="button-hero-secondary-cta"
            >
              Explore How Decision Intelligence Works
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
    "Finance",
    "Healthcare",
    "Retail",
    "SaaS",
    "Complex Operations"
  ];

  return (
    <section className="py-6 border-y border-border/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="font-medium">Trusted by startups and enterprises to design AI-driven decision systems across:</span>
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

function WhatIsDecisionIntelligence() {
  const capabilities = [
    { icon: Target, text: "Evaluates multiple options" },
    { icon: Shield, text: "Considers risk, constraints, and trade-offs" },
    { icon: Lightbulb, text: "Recommends actions with confidence levels" },
    { icon: RefreshCw, text: "Learns from outcomes over time" },
  ];

  return (
    <section id="what-is-di" className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4" data-testid="badge-what-is">
              <HelpCircle className="w-3 h-3 mr-1" />
              Definition
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-what-is">
              What Is Decision Intelligence?
            </h2>
            <p className="text-lg text-muted-foreground">
              Decision Intelligence is the capability of a business to use AI to support, guide, and improve decision-making — consistently and at scale.
            </p>
          </div>

          <Card className="mb-8 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20" data-testid="card-definition">
            <CardContent className="p-6">
              <p className="text-xl font-semibold text-center">
                Decision Intelligence helps businesses decide what to do next, not just see what happened.
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
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <cap.icon className="w-5 h-5 text-emerald-400" />
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
                This is why searches like these are increasing rapidly:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Decision intelligence vs analytics</Badge>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">AI for business decision making</Badge>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Decision intelligence systems</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function WhyMoreDataDoesntHelp() {
  const leaderQuestions = [
    "Why are decisions so slow?",
    "Why do different teams decide differently?",
    "Why do data-driven decisions still fail?"
  ];

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Real Problem
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why "More Data" Has Not Solved Decision Problems
            </h2>
            <p className="text-muted-foreground">
              Most organizations already have dashboards, reports, KPIs, and predictive models.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {leaderQuestions.map((question, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-amber-500/20 bg-amber-500/5">
                  <CardContent className="p-6 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <p className="text-sm font-medium">"{question}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                The problem is not data availability.
              </p>
              <p className="text-lg font-semibold text-foreground mb-4">
                The problem is decision complexity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <span className="text-muted-foreground">Data explains the past.</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 hidden sm:block" />
                <span className="text-emerald-400 font-medium">Decision Intelligence helps choose the future.</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function DecisionTypesSection() {
  const decisionTypes = [
    {
      title: "Operational Decisions",
      icon: Settings,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      items: [
        "Prioritization of work",
        "Resource allocation",
        "Escalations and approvals",
        "Exception handling"
      ]
    },
    {
      title: "Financial Decisions",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      items: [
        "Pricing and discounting",
        "Budget allocation",
        "Cost vs growth trade-offs",
        "Investment timing"
      ]
    },
    {
      title: "Risk & Compliance Decisions",
      icon: Shield,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      items: [
        "Credit and eligibility",
        "Policy enforcement",
        "Fraud detection",
        "Regulatory thresholds"
      ]
    },
    {
      title: "Strategic & Growth Decisions",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      items: [
        "Market entry",
        "Product roadmap",
        "Customer segmentation",
        "Retention vs acquisition focus"
      ]
    }
  ];

  const challenges = [
    "Made under uncertainty",
    "Influenced by bias",
    "Delayed due to lack of confidence",
    "Inconsistent across teams"
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
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">
            <Briefcase className="w-3 h-3 mr-1" />
            Decision Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Types of Decisions Do Businesses Struggle With?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Decision Intelligence applies wherever choices have consequences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {decisionTypes.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full" data-testid={`card-decision-type-${i}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${type.bgColor} flex items-center justify-center`}>
                      <type.icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CircleDot className="w-3 h-3 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              These decisions are often:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {challenges.map((challenge, i) => (
                <Badge key={i} variant="outline" className="border-amber-500/30 text-amber-400">
                  {challenge}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-center mt-4 font-medium text-emerald-400">
              Decision Intelligence exists to stabilize and improve this process.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const comparisons = [
    {
      title: "Analytics",
      description: "Explains what happened",
      focus: "Past performance",
      color: "border-slate-500/30",
      textColor: "text-slate-400"
    },
    {
      title: "Predictive AI",
      description: "Estimates what might happen",
      focus: "Often stops at prediction",
      color: "border-blue-500/30",
      textColor: "text-blue-400"
    },
    {
      title: "Decision Intelligence",
      description: "Evaluates options, considers constraints and risk",
      focus: "Recommends the best action & tracks outcomes",
      color: "border-emerald-500/30",
      textColor: "text-emerald-400",
      highlighted: true
    }
  ];

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">
            <Scale className="w-3 h-3 mr-1" />
            Common Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Decision Intelligence vs Analytics vs Predictive AI
          </h2>
          <p className="text-muted-foreground">
            A very common search comparison explained clearly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`h-full ${item.color} ${item.highlighted ? 'bg-emerald-500/5 ring-1 ring-emerald-500/20' : ''}`}>
                <CardHeader>
                  <CardTitle className={`text-xl ${item.textColor}`}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.focus}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-emerald-500/10 to-transparent border-emerald-500/20">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium">
              Decision Intelligence does not replace humans.
            </p>
            <p className="text-muted-foreground">
              It supports humans with structured, unbiased reasoning.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function WhyBusinessesNeedIt() {
  const challenges = [
    { icon: Clock, text: "Decisions take too long" },
    { icon: Users, text: "Different teams reach different conclusions" },
    { icon: Brain, text: "Bias influences outcomes" },
    { icon: AlertTriangle, text: "Risk is poorly quantified" },
    { icon: RefreshCw, text: "No feedback loop exists to improve decisions" }
  ];

  const consequences = [
    "Missed opportunities",
    "Avoidable losses",
    "Inconsistent execution",
    "Reduced confidence at leadership levels"
  ];

  const benefits = [
    "Make faster, more consistent decisions",
    "Reduce human bias",
    "Quantify risk and uncertainty",
    "Learn from past outcomes",
    "Scale decision quality as the business grows"
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
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">
            <TrendingUp className="w-3 h-3 mr-1" />
            Business Impact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Businesses Are Actively Adopting Decision Intelligence
          </h2>
          <p className="text-muted-foreground">
            Across industries, leaders face the same hidden challenges
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-amber-400">Hidden Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {challenges.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-amber-400" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-400">This leads to:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {consequences.map((item, i) => (
                    <Badge key={i} variant="outline" className="border-red-500/30 text-red-400">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-400">Decision Intelligence helps organizations:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState(0);
  
  const layers = [
    {
      title: "Input & Signal Layer",
      subtitle: "Understanding the Situation",
      icon: Activity,
      color: "from-blue-500 to-blue-600",
      items: [
        "Operational data",
        "Financial metrics",
        "Market signals",
        "Customer behavior",
        "Historical outcomes",
        "Constraints (budget, policy, risk limits)"
      ],
      note: "This is not just raw data — it's decision-relevant signals."
    },
    {
      title: "Situation Awareness Layer",
      subtitle: "Framing the Decision Correctly",
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      items: [
        "What decision is actually being made?",
        "What constraints apply?",
        "What trade-offs exist?",
        "What uncertainties are present?"
      ],
      note: "Bad decisions often happen because the problem is framed incorrectly."
    },
    {
      title: "Reasoning & Evaluation Layer",
      subtitle: "Comparing Options Intelligently",
      icon: Brain,
      color: "from-amber-500 to-amber-600",
      items: [
        "Evaluates multiple options",
        "Simulates possible outcomes",
        "Weighs trade-offs",
        "Quantifies risk and uncertainty",
        "Detects bias or overconfidence"
      ],
      note: "This is the core of Decision Intelligence."
    },
    {
      title: "Recommendation & Confidence Layer",
      subtitle: "Supporting Human Choice",
      icon: Lightbulb,
      color: "from-emerald-500 to-emerald-600",
      items: [
        "Recommended option",
        "Confidence level",
        "Key assumptions",
        "Risk indicators",
        "\"What could go wrong\" scenarios"
      ],
      note: "Human judgment remains central."
    },
    {
      title: "Outcome Tracking & Learning Layer",
      subtitle: "Improving Decisions Over Time",
      icon: RefreshCw,
      color: "from-cyan-500 to-cyan-600",
      items: [
        "Tracks actual outcomes",
        "Compares expected vs real results",
        "Identifies decision patterns",
        "Detects systematic bias",
        "Refines future recommendations"
      ],
      note: "Decision Intelligence improves with use."
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-slate-900/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">
            <Layers className="w-3 h-3 mr-1" />
            System Architecture
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Decision Intelligence Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every Decision Intelligence system we design follows a five-layer architecture. Each layer plays a specific role in turning uncertainty into confidence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-2 mb-8">
          {layers.map((layer, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveLayer(i)}
              className={`p-4 rounded-lg text-left transition-all ${
                activeLayer === i 
                  ? 'bg-gradient-to-br ' + layer.color + ' text-white shadow-lg' 
                  : 'bg-slate-800/50 hover:bg-slate-800'
              }`}
              data-testid={`button-layer-${i}`}
            >
              <layer.icon className={`w-6 h-6 mb-2 ${activeLayer === i ? 'text-white' : 'text-emerald-400'}`} />
              <p className="font-medium text-sm">{layer.title}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${layers[activeLayer].color} flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = layers[activeLayer].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <CardTitle>{layers[activeLayer].title}</CardTitle>
                    <CardDescription>{layers[activeLayer].subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3 mb-4">
                  {layers[activeLayer].items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-emerald-400 font-medium italic">
                  {layers[activeLayer].note}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function AgixMethodology() {
  const steps = [
    { title: "Decision Mapping", description: "Identify which decisions matter most and how they're made today." },
    { title: "Constraint & Risk Identification", description: "Understand what limits decisions and where mistakes are costly." },
    { title: "Reasoning Design", description: "Define how options are evaluated and compared." },
    { title: "Human-in-the-Loop Design", description: "Ensure transparency, explainability, and control." },
    { title: "Learning Integration", description: "Build feedback loops that improve decisions over time." }
  ];

  const governance = [
    "Explainable recommendations",
    "Confidence scoring",
    "Audit trails",
    "Human override capability",
    "Clear accountability"
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
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Our Approach
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How AGIX Builds Decision Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AGIX does not start with models. We follow a disciplined approach.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-slate-700">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium mb-1">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardHeader>
              <CardTitle className="text-lg">Governance Is Built In — Not Added Later</CardTitle>
              <CardDescription>
                A top concern: "Can AI be trusted for business decisions?"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                AGIX Decision Intelligence systems include:
              </p>
              <ul className="space-y-3">
                {governance.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-emerald-500/20">
                Decision Intelligence without governance creates risk.<br />
                <span className="text-emerald-400 font-medium">AGIX designs responsible decision systems.</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function InteractiveToolsSection() {
  const [activeTool, setActiveTool] = useState(0);
  
  const tools = [
    { id: "solution-finder", title: "Solution Finder", icon: Target },
    { id: "risk-assessment", title: "Risk & Bias Assessment", icon: Shield },
    { id: "cost-estimator", title: "Delay Cost Estimator", icon: Calculator },
    { id: "maturity-map", title: "Maturity Map", icon: Map },
    { id: "industry-models", title: "Industry Models", icon: Building2 }
  ];

  return (
    <section id="interactive-tools" className="py-20 bg-slate-900/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">
            <Play className="w-3 h-3 mr-1" />
            Interactive Tools
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Decision Intelligence Thinking
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Helping leaders make better decisions — before AI is deployed.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tools.map((tool, i) => (
            <Button
              key={tool.id}
              variant={activeTool === i ? "default" : "outline"}
              className={activeTool === i ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              onClick={() => setActiveTool(i)}
              data-testid={`button-tool-${tool.id}`}
            >
              <tool.icon className="w-4 h-4 mr-2" />
              {tool.title}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTool === 0 && <SolutionFinderTool />}
            {activeTool === 1 && <RiskAssessmentTool />}
            {activeTool === 2 && <DelayCostEstimator />}
            {activeTool === 3 && <MaturityMapTool />}
            {activeTool === 4 && <IndustryModelsTool />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SolutionFinderTool() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    industry: "",
    businessSize: "",
    decisionDomain: "",
    frequency: "",
    timeSensitive: "",
    costOfWrong: "",
    repeated: "",
    multipleTeams: "",
    currentlyDataDriven: "",
    regulatoryExposure: "",
    stakeholderImpact: "",
    toleranceForUncertainty: "",
    needForAuditability: ""
  });
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 1) return answers.industry && answers.businessSize && answers.decisionDomain && answers.frequency;
    if (step === 2) return answers.timeSensitive && answers.costOfWrong && answers.repeated && answers.multipleTeams && answers.currentlyDataDriven;
    if (step === 3) return answers.regulatoryExposure && answers.stakeholderImpact && answers.toleranceForUncertainty && answers.needForAuditability;
    return false;
  };

  const resetTool = () => {
    setStep(1);
    setShowResults(false);
    setAnswers({
      industry: "",
      businessSize: "",
      decisionDomain: "",
      frequency: "",
      timeSensitive: "",
      costOfWrong: "",
      repeated: "",
      multipleTeams: "",
      currentlyDataDriven: "",
      regulatoryExposure: "",
      stakeholderImpact: "",
      toleranceForUncertainty: "",
      needForAuditability: ""
    });
  };

  if (showResults) {
    return (
      <Card className="border-emerald-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-400" />
            Your Decision Intelligence Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-emerald-500/10 border-emerald-500/20">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Decision Category</p>
                <p className="font-semibold text-emerald-400">{answers.decisionDomain}</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Recommended Intelligence Role</p>
                <p className="font-semibold text-blue-400">Risk-weighted recommendation</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Human vs AI Balance</p>
                <p className="font-semibold text-purple-400">Guided with human control</p>
              </CardContent>
            </Card>
            <Card className="bg-amber-500/10 border-amber-500/20">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Implementation Timeline</p>
                <p className="font-semibold text-amber-400">4-8 weeks for initial deployment</p>
              </CardContent>
            </Card>
          </div>
          <Button onClick={resetTool} variant="outline" className="w-full">
            Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-500/20">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle>Decision Intelligence Solution Finder</CardTitle>
          <Badge variant="outline" className="border-emerald-500/30">Step {step} of 3</Badge>
        </div>
        <Progress value={step * 33.33} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Step 1 — Decision Context</p>
            
            <div>
              <p className="text-sm font-medium mb-2">Industry</p>
              <div className="flex flex-wrap gap-2">
                {["Healthcare", "Finance", "Retail", "SaaS", "Enterprise"].map(opt => (
                  <Button
                    key={opt}
                    variant={answers.industry === opt ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSelect("industry", opt)}
                    className={answers.industry === opt ? "bg-emerald-600" : ""}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Business Size</p>
              <div className="flex flex-wrap gap-2">
                {["Startup", "SMB", "Mid-Market", "Enterprise"].map(opt => (
                  <Button
                    key={opt}
                    variant={answers.businessSize === opt ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSelect("businessSize", opt)}
                    className={answers.businessSize === opt ? "bg-emerald-600" : ""}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Primary Decision Domain</p>
              <div className="flex flex-wrap gap-2">
                {["Operational", "Financial", "Risk", "Strategic"].map(opt => (
                  <Button
                    key={opt}
                    variant={answers.decisionDomain === opt ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSelect("decisionDomain", opt)}
                    className={answers.decisionDomain === opt ? "bg-emerald-600" : ""}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Frequency of Decisions</p>
              <div className="flex flex-wrap gap-2">
                {["Daily", "Weekly", "Monthly", "Quarterly"].map(opt => (
                  <Button
                    key={opt}
                    variant={answers.frequency === opt ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSelect("frequency", opt)}
                    className={answers.frequency === opt ? "bg-emerald-600" : ""}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Step 2 — Decision Characteristics</p>
            
            {[
              { field: "timeSensitive", label: "Are decisions time-sensitive?" },
              { field: "costOfWrong", label: "Is the cost of a wrong decision high?" },
              { field: "repeated", label: "Are decisions repeated frequently?" },
              { field: "multipleTeams", label: "Do multiple teams influence the outcome?" },
              { field: "currentlyDataDriven", label: "Is the decision currently data-driven or intuition-driven?" }
            ].map(q => (
              <div key={q.field}>
                <p className="text-sm font-medium mb-2">{q.label}</p>
                <div className="flex flex-wrap gap-2">
                  {q.field === "currentlyDataDriven" ? (
                    ["Data-driven", "Intuition-driven", "Mixed"].map(opt => (
                      <Button
                        key={opt}
                        variant={answers[q.field as keyof typeof answers] === opt ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSelect(q.field, opt)}
                        className={answers[q.field as keyof typeof answers] === opt ? "bg-emerald-600" : ""}
                      >
                        {opt}
                      </Button>
                    ))
                  ) : (
                    ["Yes", "No", "Sometimes"].map(opt => (
                      <Button
                        key={opt}
                        variant={answers[q.field as keyof typeof answers] === opt ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSelect(q.field, opt)}
                        className={answers[q.field as keyof typeof answers] === opt ? "bg-emerald-600" : ""}
                      >
                        {opt}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Step 3 — Risk & Accountability Signals</p>
            
            {[
              { field: "regulatoryExposure", label: "Regulatory Exposure", options: ["High", "Medium", "Low"] },
              { field: "stakeholderImpact", label: "Stakeholder Impact", options: ["High", "Medium", "Low"] },
              { field: "toleranceForUncertainty", label: "Tolerance for Uncertainty", options: ["High", "Medium", "Low"] },
              { field: "needForAuditability", label: "Need for Auditability", options: ["Critical", "Important", "Nice to have"] }
            ].map(q => (
              <div key={q.field}>
                <p className="text-sm font-medium mb-2">{q.label}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map(opt => (
                    <Button
                      key={opt}
                      variant={answers[q.field as keyof typeof answers] === opt ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelect(q.field, opt)}
                      className={answers[q.field as keyof typeof answers] === opt ? "bg-emerald-600" : ""}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between gap-4 pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(s => s - 1)}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button 
              onClick={() => setStep(s => s + 1)} 
              disabled={!canProceed()}
              className="ml-auto bg-emerald-600 hover:bg-emerald-700"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={() => setShowResults(true)} 
              disabled={!canProceed()}
              className="ml-auto bg-emerald-600 hover:bg-emerald-700"
            >
              Get Results
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function RiskAssessmentTool() {
  const [answers, setAnswers] = useState({
    financialExposure: 0,
    customerImpact: 0,
    strategicImportance: 0,
    humanVariability: 0,
    emotionalInfluence: 0,
    historicalInconsistency: 0,
    dataCompleteness: 0,
    dataReliability: 0,
    signalVolatility: 0
  });
  const [showResults, setShowResults] = useState(false);

  const handleSlider = (field: string, value: number) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const calculateScore = () => {
    const values = Object.values(answers);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="border-emerald-500/20">
        <CardHeader>
          <CardTitle>Decision Risk & Bias Assessment Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className={`${score > 60 ? 'bg-red-500/10 border-red-500/20' : score > 40 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Decision Risk Score</p>
                <p className={`text-4xl font-bold ${score > 60 ? 'text-red-400' : score > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {score}%
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Bias Exposure</p>
                <p className="text-lg font-semibold text-purple-400">
                  {answers.humanVariability + answers.emotionalInfluence > 120 ? "High" : answers.humanVariability + answers.emotionalInfluence > 80 ? "Medium" : "Low"}
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Recommended AI Involvement</p>
              <p className="font-semibold text-blue-400">
                {score > 60 ? "Full Decision Intelligence with governance" : score > 40 ? "Guided recommendations with human oversight" : "Assistive analytics with optional AI"}
              </p>
            </CardContent>
          </Card>
          <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
            Reassess
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-500/20">
      <CardHeader>
        <CardTitle>Decision Risk & Bias Assessment</CardTitle>
        <CardDescription>Evaluate where your decisions are vulnerable</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-medium text-emerald-400">Decision Impact</p>
          {[
            { field: "financialExposure", label: "Financial Exposure" },
            { field: "customerImpact", label: "Customer/Employee Impact" },
            { field: "strategicImportance", label: "Strategic Importance" }
          ].map(item => (
            <div key={item.field}>
              <div className="flex justify-between text-sm mb-2">
                <span>{item.label}</span>
                <span className="text-muted-foreground">{answers[item.field as keyof typeof answers]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={answers[item.field as keyof typeof answers]}
                onChange={(e) => handleSlider(item.field, parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-amber-400">Bias Exposure</p>
          {[
            { field: "humanVariability", label: "Human Judgment Variability" },
            { field: "emotionalInfluence", label: "Political/Emotional Influence" },
            { field: "historicalInconsistency", label: "Historical Inconsistencies" }
          ].map(item => (
            <div key={item.field}>
              <div className="flex justify-between text-sm mb-2">
                <span>{item.label}</span>
                <span className="text-muted-foreground">{answers[item.field as keyof typeof answers]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={answers[item.field as keyof typeof answers]}
                onChange={(e) => handleSlider(item.field, parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-blue-400">Data Uncertainty</p>
          {[
            { field: "dataCompleteness", label: "Data Completeness Issues" },
            { field: "dataReliability", label: "Data Reliability Issues" },
            { field: "signalVolatility", label: "Signal Volatility" }
          ].map(item => (
            <div key={item.field}>
              <div className="flex justify-between text-sm mb-2">
                <span>{item.label}</span>
                <span className="text-muted-foreground">{answers[item.field as keyof typeof answers]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={answers[item.field as keyof typeof answers]}
                onChange={(e) => handleSlider(item.field, parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          ))}
        </div>

        <Button onClick={() => setShowResults(true)} className="w-full bg-emerald-600 hover:bg-emerald-700">
          Calculate Risk Score
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function DelayCostEstimator() {
  const [inputs, setInputs] = useState({
    avgDecisionTime: 5,
    delayedDecisions: 10,
    revenueImpact: 50000,
    opportunityCost: 25000
  });
  const [showResults, setShowResults] = useState(false);

  const calculateResults = () => {
    const annualCost = (inputs.delayedDecisions * 12) * (inputs.revenueImpact + inputs.opportunityCost);
    const timeSaved = Math.round(inputs.avgDecisionTime * 0.6);
    const recoveredOpportunity = Math.round(annualCost * 0.4);
    return { annualCost, timeSaved, recoveredOpportunity };
  };

  if (showResults) {
    const results = calculateResults();
    return (
      <Card className="border-emerald-500/20">
        <CardHeader>
          <CardTitle>Decision Delay Cost Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Annual Cost of Decision Delays</p>
                <p className="text-3xl font-bold text-red-400">
                  ${results.annualCost.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-500/10 border-emerald-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Time Saved with Decision Intelligence</p>
                <p className="text-3xl font-bold text-emerald-400">
                  {results.timeSaved} days
                </p>
                <p className="text-sm text-muted-foreground">per decision</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Opportunity Recovery Estimate</p>
                <p className="text-3xl font-bold text-blue-400">
                  ${results.recoveredOpportunity.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">High-Impact Bottlenecks</p>
                <p className="text-lg font-semibold text-purple-400">
                  {inputs.delayedDecisions * 12} decisions/year
                </p>
              </CardContent>
            </Card>
          </div>
          <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
            Recalculate
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-500/20">
      <CardHeader>
        <CardTitle>Decision Delay Cost Estimator</CardTitle>
        <CardDescription>Quantify the real cost of slow or deferred decisions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Average Time to Make Key Decisions (days)
            </label>
            <input
              type="number"
              value={inputs.avgDecisionTime}
              onChange={(e) => setInputs(prev => ({ ...prev, avgDecisionTime: parseInt(e.target.value) || 0 }))}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Delayed Decisions per Month
            </label>
            <input
              type="number"
              value={inputs.delayedDecisions}
              onChange={(e) => setInputs(prev => ({ ...prev, delayedDecisions: parseInt(e.target.value) || 0 }))}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Revenue/Cost Impact per Delay ($)
            </label>
            <input
              type="number"
              value={inputs.revenueImpact}
              onChange={(e) => setInputs(prev => ({ ...prev, revenueImpact: parseInt(e.target.value) || 0 }))}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Opportunity Loss per Delay ($)
            </label>
            <input
              type="number"
              value={inputs.opportunityCost}
              onChange={(e) => setInputs(prev => ({ ...prev, opportunityCost: parseInt(e.target.value) || 0 }))}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>
        <Button onClick={() => setShowResults(true)} className="w-full bg-emerald-600 hover:bg-emerald-700">
          Calculate Delay Cost
          <Calculator className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function MaturityMapTool() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const stages = [
    {
      level: 1,
      title: "Gut-Driven Decisions",
      color: "from-red-500 to-red-600",
      characteristics: ["Intuition-based", "High variability", "Low transparency"],
      strengths: ["Fast in simple situations", "Works for small teams"],
      limitations: ["Inconsistent outcomes", "Not scalable", "No learning loop"],
      whenToEvolve: "When decisions start affecting multiple teams or customers"
    },
    {
      level: 2,
      title: "Data-Informed Decisions",
      color: "from-amber-500 to-amber-600",
      characteristics: ["Dashboards and reports", "Still slow and subjective"],
      strengths: ["Better visibility", "Some evidence basis"],
      limitations: ["Analysis paralysis", "Insight without action"],
      whenToEvolve: "When data exists but decisions still vary by person"
    },
    {
      level: 3,
      title: "AI-Assisted Decisions",
      color: "from-blue-500 to-blue-600",
      characteristics: ["Scenario evaluation", "Risk-aware recommendations"],
      strengths: ["Faster evaluation", "Reduced bias", "Better consistency"],
      limitations: ["Requires governance", "Needs human oversight"],
      whenToEvolve: "When scaling decision quality across the organization"
    },
    {
      level: 4,
      title: "Governed Decision Systems",
      color: "from-emerald-500 to-emerald-600",
      characteristics: ["Explainable reasoning", "Consistent outcomes", "Continuous learning"],
      strengths: ["Full transparency", "Audit-ready", "Self-improving"],
      limitations: ["Requires investment", "Needs organizational change"],
      whenToEvolve: "This is the target state for most enterprises"
    }
  ];

  return (
    <Card className="border-emerald-500/20">
      <CardHeader>
        <CardTitle>Decision Intelligence Maturity Map</CardTitle>
        <CardDescription>See how your organization makes decisions today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-2">
          {stages.map((stage, i) => (
            <button
              key={i}
              onClick={() => setSelectedStage(selectedStage === i ? null : i)}
              className={`p-4 rounded-lg text-center transition-all ${
                selectedStage === i 
                  ? `bg-gradient-to-br ${stage.color} text-white shadow-lg` 
                  : 'bg-slate-800/50 hover:bg-slate-800'
              }`}
            >
              <p className="text-2xl font-bold mb-1">{stage.level}</p>
              <p className="text-xs">{stage.title}</p>
            </button>
          ))}
        </div>

        {selectedStage !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg">{stages[selectedStage].title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Characteristics</p>
                  <div className="flex flex-wrap gap-2">
                    {stages[selectedStage].characteristics.map((c, i) => (
                      <Badge key={i} variant="outline">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-emerald-400 mb-2">Strengths</p>
                    <ul className="space-y-1">
                      {stages[selectedStage].strengths.map((s, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <Check className="w-3 h-3 text-emerald-400" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-400 mb-2">Limitations</p>
                    <ul className="space-y-1">
                      {stages[selectedStage].limitations.map((l, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-sm">
                    <span className="text-muted-foreground">When to evolve: </span>
                    <span className="text-emerald-400">{stages[selectedStage].whenToEvolve}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function IndustryModelsTool() {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      name: "Healthcare & Life Sciences",
      icon: Heart,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      decisionTypes: ["Capacity planning", "Patient prioritization", "Resource allocation", "Risk and compliance decisions"],
      whyMatters: ["High cost of wrong decisions", "Regulatory oversight", "Need for explainability"],
      outcome: ["Safer decisions", "Reduced operational stress", "Human-led, AI-supported judgment"]
    },
    {
      name: "Finance, Lending & Insurance",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      decisionTypes: ["Credit eligibility", "Risk assessment", "Pricing and underwriting", "Fraud and exception handling"],
      whyMatters: ["Bias and fairness concerns", "Regulatory requirements", "High financial exposure"],
      outcome: ["Consistent decisions", "Lower risk", "Audit-ready reasoning"]
    },
    {
      name: "Retail, E-commerce & D2C",
      icon: ShoppingCart,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      decisionTypes: ["Pricing and discounting", "Inventory allocation", "Demand response", "Promotion effectiveness"],
      whyMatters: ["Fast-changing conditions", "Thin margins", "High opportunity cost of delay"],
      outcome: ["Faster, smarter decisions", "Reduced overstock and loss", "Improved profitability"]
    },
    {
      name: "SaaS & Technology",
      icon: Server,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      decisionTypes: ["Product prioritization", "Customer segmentation", "Churn intervention", "Growth investment choices"],
      whyMatters: ["Complex trade-offs", "Long-term impact of short-term decisions"],
      outcome: ["Better roadmap clarity", "Reduced churn", "More confident growth bets"]
    },
    {
      name: "Enterprise & Strategy-Led",
      icon: Building,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      decisionTypes: ["Capital allocation", "Market expansion", "Policy enforcement", "Compliance and governance"],
      whyMatters: ["Cross-functional impact", "High accountability", "Long-term consequences"],
      outcome: ["Structured decision-making", "Reduced internal friction", "Stronger executive alignment"]
    }
  ];

  return (
    <Card className="border-emerald-500/20">
      <CardHeader>
        <CardTitle>Industry-Specific Decision Intelligence Models</CardTitle>
        <CardDescription>See how Decision Intelligence works in your industry</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {industries.map((ind, i) => (
            <Button
              key={i}
              variant={selectedIndustry === i ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry(i)}
              className={selectedIndustry === i ? "bg-emerald-600" : ""}
            >
              <ind.icon className="w-4 h-4 mr-2" />
              {ind.name.split(" ")[0]}
            </Button>
          ))}
        </div>

        <motion.div
          key={selectedIndustry}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Decision Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industries[selectedIndustry].decisionTypes.map((d, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <CircleDot className="w-3 h-3 text-emerald-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Why Decision Intelligence Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industries[selectedIndustry].whyMatters.map((w, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      {w}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-emerald-400">Outcome</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {industries[selectedIndustry].outcome.map((o, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-400" />
                      {o}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "What is Decision Intelligence in simple terms?",
      answer: "Decision Intelligence uses AI to support better business decisions by evaluating options, risks, and outcomes — not just showing data."
    },
    {
      question: "How is Decision Intelligence different from analytics or BI?",
      answer: "Analytics explains what happened. Decision Intelligence helps decide what to do next."
    },
    {
      question: "Can AI make business decisions on its own?",
      answer: "AI can support decisions, but final judgment should remain with humans. Agix builds systems that recommend, not dictate."
    },
    {
      question: "Is Decision Intelligence safe for regulated industries?",
      answer: "Yes — when designed with governance, explainability, and auditability built in."
    },
    {
      question: "How does Decision Intelligence reduce bias?",
      answer: "By using structured reasoning, consistent evaluation criteria, and tracking outcomes over time."
    },
    {
      question: "Will Decision Intelligence replace managers or executives?",
      answer: "No. It augments human judgment, reduces overload, and improves consistency."
    },
    {
      question: "What's the difference between predictive AI and Decision Intelligence?",
      answer: "Predictive AI forecasts outcomes. Decision Intelligence recommends actions based on those forecasts and constraints."
    },
    {
      question: "How do you validate AI-supported decisions?",
      answer: "By tracking outcomes, comparing expected vs actual results, and continuously refining the decision logic."
    },
    {
      question: "What happens when humans disagree with AI recommendations?",
      answer: "Human judgment always wins. Disagreements are captured and used to improve future recommendations."
    },
    {
      question: "Can Decision Intelligence help speed up decision-making?",
      answer: "Yes. It reduces analysis paralysis by structuring options and clarifying trade-offs quickly."
    },
    {
      question: "Is Decision Intelligence useful for small or mid-sized businesses?",
      answer: "Absolutely. Growing businesses often face decision complexity faster than scale, making Decision Intelligence highly valuable."
    },
    {
      question: "How does Decision Intelligence improve over time?",
      answer: "Through outcome tracking, feedback loops, bias detection, and continuous learning."
    },
    {
      question: "What's the biggest mistake companies make with AI and decisions?",
      answer: "Using AI to replace judgment instead of supporting it, or deploying black-box systems without governance."
    },
    {
      question: "How do we get started with Decision Intelligence safely?",
      answer: "Start with decision clarity, risk assessment, and assistive recommendations. Then scale gradually with governance."
    },
    {
      question: "Is Decision Intelligence expensive to implement?",
      answer: "Costs depend on scope, but starting with assistive decision intelligence is far more affordable than large automation programs."
    },
    {
      question: "Can Decision Intelligence integrate with existing systems?",
      answer: "Yes. Agix builds decision layers that integrate with CRM, ERP, analytics, and operational platforms."
    },
    {
      question: "Do humans stay in control with Decision Intelligence?",
      answer: "Always. Agix designs systems where humans remain the final decision makers with full override capability."
    },
    {
      question: "What types of decisions benefit most from AI support?",
      answer: "High-frequency, high-stakes decisions with complexity, uncertainty, or potential for bias benefit most."
    },
    {
      question: "How do you ensure AI decisions are explainable?",
      answer: "By designing systems that show reasoning, assumptions, confidence levels, and alternatives — not just answers."
    },
    {
      question: "What industries use Decision Intelligence the most?",
      answer: "Finance, healthcare, retail, SaaS, and enterprise organizations with complex operational or strategic decisions."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            FAQs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Decision Intelligence Questions
          </h2>
          <p className="text-muted-foreground">
            Based on Google searches and LLM queries
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-800 rounded-lg px-4 bg-slate-900/30">
              <AccordionTrigger className="text-left hover:no-underline" data-testid={`accordion-faq-${i}`}>
                <span className="text-sm font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function MakeBetterDecisionsSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Make Better Decisions, Consistently
          </h2>
          <p className="text-xl text-muted-foreground">
            Your Data Doesn't Make Decisions.<br />
            <span className="text-emerald-400 font-medium">Your Systems Do.</span>
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Agix Technologies helps organizations design Decision Intelligence systems that support clarity, confidence, and accountability.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-sm text-center">Find the right Decision Intelligence approach for your business</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-sm text-center">Assess decision readiness, risk, and bias</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-sm text-center">Build decision systems that improve over time</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground italic pt-4">
            Agix Technologies builds AI systems that don't replace judgment — they strengthen it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section id="cta-form" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-emerald-500/20 shadow-2xl shadow-emerald-500/5">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Schedule a Decision Intelligence Consultation</CardTitle>
              <CardDescription className="text-base">
                Learn how AI can support smarter, faster, more consistent decisions in your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CtaForm 
                headline="Ready to Make Better Decisions?"
                subheadline="Talk to our Decision Intelligence architects about your specific challenges."
                badgeText="Decision Intelligence"
                submitLabel="Schedule Consultation"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default function DecisionIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <HeroSection />
      <TrustStrip />
      <WhatIsDecisionIntelligence />
      <WhyMoreDataDoesntHelp />
      <DecisionTypesSection />
      <ComparisonSection />
      <WhyBusinessesNeedIt />
      <ArchitectureSection />
      <AgixMethodology />
      <InteractiveToolsSection />
      <FAQSection />
      <MakeBetterDecisionsSection />
      <FinalCTASection />
      <MainFooter />
    </div>
  );
}
