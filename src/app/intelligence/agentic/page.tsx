'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaForm } from "@/components/forms/cta-form";
import {
  Target,
  Brain,
  Zap,
  Shield,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Cpu,
  Settings,
  Eye,
  TrendingUp,
  Users,
  Building2,
  ShoppingCart,
  Stethoscope,
  Landmark,
  Layers,
  GitBranch,
  Activity,
  Lock,
  RotateCcw,
  Play,
  ChevronRight,
  Workflow,
  Bot,
  MessageSquare,
  Cog,
  ClipboardCheck,
  Scale,
  DollarSign,
  Clock,
  BarChart3,
  Factory,
  HeartPulse,
  CreditCard,
  Package,
  Server,
} from "lucide-react";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-28 min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-6 border-cyan-500/50 text-cyan-400">
            Autonomous Agentic Systems
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Autonomous Agentic Systems That Act With{" "}
            <span className="text-cyan-400">Purpose</span> — Not Chaos
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI systems that plan, decide, execute, and learn — independently, but within clear governance. Agix Technologies builds Autonomous Agentic Systems that take ownership of goals, execute across systems, and adapt over time — without losing human control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
              onClick={() => scrollToSection("cta-form")}
              data-testid="button-hero-primary"
            >
              Find the Right Agentic System for Your Business
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700"
              onClick={() => scrollToSection("how-it-works")}
              data-testid="button-hero-secondary"
            >
              Explore How Agentic Systems Work
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="py-6 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted to engineer autonomous AI systems for operations, decision execution, and complex workflows across regulated and high-impact environments.
        </p>
      </div>
    </section>
  );
}

function WhatAreAgenticSystems() {
  const searchQueries = [
    "Autonomous AI agents",
    "Agentic AI systems",
    "AI agents for business automation",
  ];

  const capabilities = [
    { icon: Target, text: "Understand goals, not just tasks" },
    { icon: Brain, text: "Decide what to do next based on context" },
    { icon: Zap, text: "Execute actions across multiple systems" },
    { icon: Activity, text: "Monitor results and adjust behavior" },
    { icon: Users, text: "Escalate to humans when needed" },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Are Autonomous Agentic Systems?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Simple & Precise</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-cyan-500/20 bg-slate-900/50">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed">
                  Autonomous Agentic Systems are AI systems designed to{" "}
                  <span className="text-cyan-400 font-medium">pursue goals</span>,{" "}
                  <span className="text-cyan-400 font-medium">make decisions</span>,{" "}
                  <span className="text-cyan-400 font-medium">take actions</span>, and{" "}
                  <span className="text-cyan-400 font-medium">adapt over time</span> — with minimal human intervention and strong governance controls.
                </p>
              </CardContent>
            </Card>

            <div className="p-6 rounded-lg bg-slate-900/30 border border-slate-800">
              <p className="text-sm text-muted-foreground mb-3">In simple terms:</p>
              <p className="text-lg font-medium">
                Agentic systems don't just respond.<br />
                <span className="text-cyan-400">They plan, act, and learn in pursuit of outcomes.</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Searches growing rapidly:</span>
              {searchQueries.map((query, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  "{query}"
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Unlike traditional automation or chatbots, agentic systems:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <cap.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-sm">{cap.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyAutomationNotEnough() {
  const automationLimits = [
    "Rule-based",
    "Linear",
    "Fragile when conditions change",
  ];

  const modernChallenges = [
    "Dynamic inputs",
    "Unstructured data",
    "Exceptions and edge cases",
    "Cross-system dependencies",
  ];

  const agenticCapabilities = [
    "Handle variability",
    "Recover from failures",
    "Decide between multiple possible actions",
    "Coordinate across tools and teams",
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why "Automation" Is No Longer Enough
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  Traditional Automation
                </CardTitle>
                <CardDescription>Works only when workflows are predictable</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {automationLimits.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Modern Business Reality
                </CardTitle>
                <CardDescription>Where automation breaks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {modernChallenges.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-cyan-500/20 bg-cyan-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  Agentic Systems Can
                </CardTitle>
                <CardDescription>Where agentic systems become necessary</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {agenticCapabilities.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const comparisons = [
    {
      type: "Traditional Automation",
      icon: Cog,
      color: "red",
      traits: ["Executes predefined steps", "Fails when conditions change"],
    },
    {
      type: "Chatbots / AI Assistants",
      icon: MessageSquare,
      color: "amber",
      traits: ["Respond to inputs", "Do not own outcomes"],
    },
    {
      type: "Autonomous Agentic Systems",
      icon: Bot,
      color: "cyan",
      traits: [
        "Operate with goals",
        "Make decisions",
        "Execute actions",
        "Learn from outcomes",
        "Remain governed and auditable",
      ],
    },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">A Highly Searched Comparison</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Autonomous Agentic Systems vs Automation vs Chatbots
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {comparisons.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`h-full ${comp.color === "cyan" ? "border-cyan-500/30 bg-cyan-500/5" : "border-slate-800"}`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg mb-3 flex items-center justify-center ${
                    comp.color === "red" ? "bg-red-500/10" :
                    comp.color === "amber" ? "bg-amber-500/10" : "bg-cyan-500/10"
                  }`}>
                    <comp.icon className={`w-6 h-6 ${
                      comp.color === "red" ? "text-red-400" :
                      comp.color === "amber" ? "text-amber-400" : "text-cyan-400"
                    }`} />
                  </div>
                  <CardTitle className="text-lg">{comp.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {comp.traits.map((trait, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        {comp.color === "cyan" ? (
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        ) : (
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                            comp.color === "red" ? "bg-red-400" : "bg-amber-400"
                          }`} />
                        )}
                        <span className={comp.color === "cyan" ? "text-foreground" : "text-muted-foreground"}>
                          {trait}
                        </span>
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
          className="text-center"
        >
          <p className="text-lg font-medium text-cyan-400">
            Agentic systems are execution intelligence, not conversation tools.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function WhatMakesAgentic() {
  const pillars = [
    {
      title: "Goal Awareness",
      icon: Target,
      points: ["Knows what it is trying to achieve", "Can prioritize tasks toward that goal"],
    },
    {
      title: "Decision Capability",
      icon: Brain,
      points: ["Chooses actions based on context", "Evaluates trade-offs and constraints"],
    },
    {
      title: "Execution Authority",
      icon: Zap,
      points: ["Acts across systems (APIs, tools, workflows)", "Handles retries and failures"],
    },
    {
      title: "Memory & Learning",
      icon: RefreshCw,
      points: ["Remembers past actions and outcomes", "Improves behavior over time"],
    },
    {
      title: "Governance & Control",
      icon: Shield,
      points: ["Operates within defined boundaries", "Escalates when confidence is low", "Maintains audit trails"],
    },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Makes an AI System Truly "Agentic"?
          </h2>
          <p className="text-muted-foreground">For an AI system to be considered agentic, it must have:</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-slate-800 hover:border-cyan-500/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3">
                    <pillar.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pillar.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-6 rounded-lg bg-slate-950 border border-cyan-500/20"
        >
          <p className="text-lg mb-2">
            Without governance, autonomy becomes risk.
          </p>
          <p className="text-cyan-400 font-medium">
            AGIX treats control as a first-class feature, not an afterthought.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function WhyBusinessesExploring() {
  const reasons = [
    "Manual coordination doesn't scale",
    "Decision delays slow execution",
    "Complex workflows overwhelm teams",
    "Human error increases under load",
    "Automation alone cannot adapt",
  ];

  const benefits = [
    "Execute faster without adding headcount",
    "Reduce operational friction",
    "Handle complexity intelligently",
    "Maintain consistency across systems",
    "Free teams from repetitive coordination",
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Businesses Are Exploring Autonomous Agentic Systems Now
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Organizations are searching because:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {reasons.map((reason, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                        <span className="text-xs text-amber-400">{i + 1}</span>
                      </div>
                      {reason}
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
            <Card className="h-full border-cyan-500/20 bg-cyan-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  Agentic Systems help businesses:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      {benefit}
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
          className="text-center mt-8"
        >
          <p className="text-lg text-muted-foreground">
            This is why Agentic AI is becoming{" "}
            <span className="text-cyan-400 font-medium">the next execution layer after automation</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function AgixApproach() {
  const doNot = [
    "Uncontrolled autonomous bots",
    '"Let the AI figure it out" systems',
    "Black-box agents",
  ];

  const doBuild = [
    "Clear goal definition",
    "Bounded autonomy",
    "Human-in-the-loop controls",
    "Explains for every action",
    "Safe rollout from assistive to autonomous",
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Agix Technologies Approaches Agentic Systems Differently
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  Agix does not build:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {doNot.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      {item}
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
            <Card className="h-full border-cyan-500/20 bg-cyan-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  We build: Governed Autonomous Agentic Systems
                </CardTitle>
                <CardDescription>Designed to act independently, but never irresponsibly</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {doBuild.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExecutionBottleneck() {
  const struggles = [
    "Too many handoffs",
    "Too many systems",
    "Too many decisions happening in parallel",
    "Too much manual coordination",
  ];

  const searchQueries = [
    "Why automation fails at scale",
    "How to reduce operational coordination",
    "AI agents for workflow execution",
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400">Part 2</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            When Execution Becomes the Real Bottleneck
          </h2>
          <p className="text-xl text-muted-foreground">
            Most Businesses Don't Struggle With Strategy — They Struggle With Execution
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-muted-foreground">
              At leadership level, most organizations already know what needs to be done, which priorities matter, and where opportunities exist. Yet execution still breaks down.
            </p>
            <Card className="border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Teams face:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {struggles.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      {item}
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
            className="space-y-6"
          >
            <p className="text-muted-foreground">This is why people search for:</p>
            <div className="flex flex-wrap gap-2">
              {searchQueries.map((query, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  "{query}"
                </Badge>
              ))}
            </div>
            <Card className="border-cyan-500/20 bg-cyan-500/5">
              <CardContent className="pt-6">
                <p className="text-lg">
                  The problem is not intent.<br />
                  <span className="text-cyan-400 font-medium">The problem is execution complexity.</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HiddenCostOfCoordination() {
  const costs = [
    "Slack messages chasing updates",
    "Emails clarifying responsibility",
    "Meetings to unblock simple tasks",
    "Rework due to missed steps",
    "Escalations after delays",
  ];

  const benefits = [
    "Taking ownership of execution",
    "Coordinating across tools",
    "Managing retries and fallbacks",
    "Escalating only when needed",
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Hidden Cost of Manual Coordination
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manual coordination does not show up clearly in reports.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg">It appears as:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {costs.map((cost, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      {cost}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 p-4 rounded-lg bg-slate-950/50 text-sm italic">
                  "We're spending too much time just coordinating work."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-cyan-500/20 bg-cyan-500/5">
              <CardHeader>
                <CardTitle className="text-lg">Agentic Systems reduce this invisible tax by:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function RiskOfUngoverned() {
  const risks = [
    "Agents take unsafe actions",
    "Systems behave unpredictably",
    "Trust erodes quickly",
  ];

  const safeguards = [
    "Autonomy is bounded",
    "Actions are explainable",
    "Humans stay accountable",
    "Fail-safes are built in",
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Risk of Ungoverned Autonomous Agents
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge variant="secondary">"Are AI agents dangerous?"</Badge>
            <Badge variant="secondary">"Can autonomous AI go wrong?"</Badge>
          </div>
          <p className="text-muted-foreground">These searches exist for a reason.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Without governance:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {risks.map((risk, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      {risk}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-lg font-medium text-red-400">
                  Autonomy without control is not intelligence — it's risk.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-cyan-500/20 bg-cyan-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  AGIX builds agentic systems where:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {safeguards.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const layers = [
    {
      number: "1",
      title: "Goal & Intent Layer",
      subtitle: "Defining What the System Is Responsible For",
      icon: Target,
      description: "Agentic systems do not act randomly. They operate against explicit, bounded goals.",
      points: [
        "What outcome the system owns",
        "Success and failure criteria",
        "Constraints (budget, time, compliance)",
        "When autonomy applies — and when it stops",
      ],
      examples: [
        "Resolve customer issues within SLA",
        "Execute onboarding tasks end-to-end",
        "Maintain inventory availability within thresholds",
      ],
    },
    {
      number: "2",
      title: "Planning & Reasoning Layer",
      subtitle: "Deciding How to Act",
      icon: Brain,
      description: "Once a goal is defined, the system must decide how to achieve it.",
      points: [
        "Breaks goals into executable steps",
        "Evaluates multiple possible action paths",
        "Considers dependencies and constraints",
        "Adapts plans when conditions change",
      ],
    },
    {
      number: "3",
      title: "Execution & Tooling Layer",
      subtitle: "Acting Across Systems",
      icon: Zap,
      description: "This layer gives agents the ability to act, not just think.",
      points: [
        "Executing actions",
        "Handling retries and failures",
        "Verifying outcomes",
        "Logging every step",
      ],
      connects: ["APIs and business systems", "Databases and services", "Workflow engines", "Internal tools"],
    },
    {
      number: "4",
      title: "Oversight & Governance Layer",
      subtitle: "Keeping Humans in Control",
      icon: Shield,
      description: "This is the most important layer — and the most neglected in the market.",
      points: [
        "Actions stay within allowed boundaries",
        "Confidence thresholds are respected",
        "Sensitive actions require human approval",
        "Every decision is traceable",
      ],
      includes: ["Human-in-the-loop checkpoints", "Policy enforcement", "Role-based permissions", "Kill-switches and fallback logic"],
    },
    {
      number: "5",
      title: "Feedback & Learning Layer",
      subtitle: "Improving Execution Over Time",
      icon: RefreshCw,
      description: "Agentic systems must improve — safely.",
      points: [
        "Monitors outcomes",
        "Captures human overrides",
        "Learns from successes and failures",
        "Refines planning and execution",
      ],
      note: "Learning does not expand autonomy automatically. Improvements are reviewed and governed.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400">Part 3</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The AGIX Autonomous Agentic System Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every agentic system we design follows a five-layer architecture that ensures autonomy without chaos.
          </p>
        </motion.div>

        <div className="space-y-6">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-slate-800 hover:border-cyan-500/30 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <layer.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2 border-cyan-500/30 text-cyan-400">
                        Layer {layer.number}
                      </Badge>
                      <CardTitle className="text-xl">{layer.title}</CardTitle>
                      <CardDescription>{layer.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-20">
                  <p className="text-muted-foreground mb-4">{layer.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">This layer:</p>
                      <ul className="space-y-1">
                        {layer.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {layer.examples && (
                      <div>
                        <p className="text-sm font-medium mb-2">Example goals:</p>
                        <ul className="space-y-1">
                          {layer.examples.map((ex, j) => (
                            <li key={j} className="text-sm text-muted-foreground italic">
                              "{ex}"
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {layer.connects && (
                      <div>
                        <p className="text-sm font-medium mb-2">Connects to:</p>
                        <ul className="space-y-1">
                          {layer.connects.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {layer.includes && (
                      <div>
                        <p className="text-sm font-medium mb-2">Includes:</p>
                        <ul className="space-y-1">
                          {layer.includes.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Lock className="w-3 h-3 text-cyan-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {layer.note && (
                    <p className="mt-4 text-sm text-amber-400 italic">
                      {layer.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center p-6 rounded-lg bg-slate-950 border border-cyan-500/20"
        >
          <p className="text-lg font-medium text-cyan-400">
            AGIX builds autonomy that is bounded by design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function AgixMethodology() {
  const steps = [
    { title: "Execution Mapping", description: "Identify where workflows break or stall" },
    { title: "Goal Boundary Definition", description: "Define safe, measurable ownership" },
    { title: "Agent Role Design", description: "Separate planning, execution, monitoring, and escalation" },
    { title: "Governance First", description: "Embed controls before autonomy" },
    { title: "Progressive Autonomy", description: "Assist → supervise → controlled autonomy" },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How AGIX Engineers Agentic Systems
          </h2>
          <p className="text-muted-foreground">
            AGIX does not deploy agents blindly. We follow a disciplined approach:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <Card className="h-full border-slate-800 hover:border-cyan-500/30 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-cyan-400 font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-cyan-400/50 -translate-y-1/2 z-10" />
              )}
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
            This ensures <span className="text-cyan-400">trust, reliability, and adoption</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function InteractiveToolsSection() {
  const [activeTool, setActiveTool] = useState<number>(0);

  const tools = [
    { id: 0, title: "Readiness Finder", icon: ClipboardCheck },
    { id: 1, title: "Risk Assessment", icon: Shield },
    { id: 2, title: "ROI Estimator", icon: DollarSign },
    { id: 3, title: "Maturity Map", icon: BarChart3 },
    { id: 4, title: "Industry Blueprints", icon: Building2 },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400">Part 4</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive Autonomous Agentic Systems Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Helping You Adopt Autonomy Safely, Intentionally, and With Confidence
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "outline"}
              className={activeTool === tool.id ? "bg-cyan-500 hover:bg-cyan-600" : ""}
              onClick={() => setActiveTool(tool.id)}
              data-testid={`button-tool-${tool.id}`}
            >
              <tool.icon className="w-4 h-4 mr-2" />
              {tool.title}
            </Button>
          ))}
        </div>

        <div className="min-h-[500px]">
          {activeTool === 0 && <ReadinessFinderTool />}
          {activeTool === 1 && <RiskAssessmentTool />}
          {activeTool === 2 && <ROIEstimatorTool />}
          {activeTool === 3 && <MaturityMapTool />}
          {activeTool === 4 && <IndustryBlueprintsTool />}
        </div>
      </div>
    </section>
  );
}

function ReadinessFinderTool() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const [workflowType, setWorkflowType] = useState("");
  const [systemCount, setSystemCount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [conditionsChange, setConditionsChange] = useState<boolean | null>(null);
  const [exceptionsCommon, setExceptionsCommon] = useState<boolean | null>(null);
  const [manualCoordHigh, setManualCoordHigh] = useState<boolean | null>(null);
  const [outcomesMeasurable, setOutcomesMeasurable] = useState<boolean | null>(null);
  const [wrongExecutionCost, setWrongExecutionCost] = useState("");
  const [complianceSensitivity, setComplianceSensitivity] = useState("");
  const [showResults, setShowResults] = useState(false);

  const calculateScore = () => {
    let score = 50;
    if (conditionsChange) score += 10;
    if (exceptionsCommon) score += 10;
    if (manualCoordHigh) score += 15;
    if (outcomesMeasurable) score += 10;
    if (systemCount === "3+") score += 10;
    if (frequency === "daily" || frequency === "hourly") score += 5;
    if (wrongExecutionCost === "high") score -= 10;
    if (complianceSensitivity === "high") score -= 10;
    return Math.min(100, Math.max(0, score));
  };

  const getAutonomyLevel = (score: number) => {
    if (score >= 80) return { level: "Controlled Autonomous", color: "text-cyan-400" };
    if (score >= 60) return { level: "Supervised", color: "text-amber-400" };
    return { level: "Assistive", color: "text-blue-400" };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const reset = () => {
    setStep(1);
    setIndustry("");
    setWorkflowType("");
    setSystemCount("");
    setFrequency("");
    setConditionsChange(null);
    setExceptionsCommon(null);
    setManualCoordHigh(null);
    setOutcomesMeasurable(null);
    setWrongExecutionCost("");
    setComplianceSensitivity("");
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const autonomy = getAutonomyLevel(score);
    return (
      <Card className="border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            Your Agentic Readiness Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 rounded-lg bg-slate-950">
            <p className="text-sm text-muted-foreground mb-2">Agentic Suitability Score</p>
            <p className="text-5xl font-bold text-cyan-400 mb-2">{score}%</p>
            <Progress value={score} className="h-3 mb-4" />
            <p className="text-lg">
              Recommended Autonomy Level: <span className={`font-bold ${autonomy.color}`}>{autonomy.level}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Workflow Types Best Suited
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Multi-system coordination</li>
                <li>Exception handling workflows</li>
                <li>Repetitive decision-action loops</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Safe Starting Scope
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Begin with assistive mode</li>
                <li>Clear escalation paths</li>
                <li>Human approval for sensitive actions</li>
              </ul>
            </div>
          </div>

          <Button onClick={reset} variant="outline" className="w-full" data-testid="button-reset-readiness">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cyan-500/20">
      <CardHeader>
        <CardTitle>Agentic Readiness & Suitability Finder</CardTitle>
        <CardDescription>
          Determine whether agentic systems are right for your workflows
        </CardDescription>
        <Progress value={(step / 3) * 100} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-medium">Step 1: Workflow Context</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Industry</label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger data-testid="select-industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance & Insurance</SelectItem>
                    <SelectItem value="ecommerce">E-commerce & Retail</SelectItem>
                    <SelectItem value="saas">SaaS & Technology</SelectItem>
                    <SelectItem value="enterprise">Enterprise Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Workflow Type</label>
                <Select value={workflowType} onValueChange={setWorkflowType}>
                  <SelectTrigger data-testid="select-workflow-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ops">Operations</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Systems Involved</label>
                <Select value={systemCount} onValueChange={setSystemCount}>
                  <SelectTrigger data-testid="select-system-count">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 system</SelectItem>
                    <SelectItem value="2">2 systems</SelectItem>
                    <SelectItem value="3+">3+ systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Execution Frequency</label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger data-testid="select-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!industry || !workflowType || !systemCount || !frequency}
              className="w-full bg-cyan-500 hover:bg-cyan-600"
              data-testid="button-next-step-1"
            >
              Continue to Complexity Signals
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium">Step 2: Complexity Signals</h3>
            <div className="space-y-4">
              {[
                { q: "Do conditions change mid-process?", state: conditionsChange, setState: setConditionsChange },
                { q: "Are exceptions common?", state: exceptionsCommon, setState: setExceptionsCommon },
                { q: "Is manual coordination high?", state: manualCoordHigh, setState: setManualCoordHigh },
                { q: "Are outcomes clearly measurable?", state: outcomesMeasurable, setState: setOutcomesMeasurable },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-sm">{item.q}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={item.state === true ? "default" : "outline"}
                      className={item.state === true ? "bg-cyan-500" : ""}
                      onClick={() => item.setState(true)}
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={item.state === false ? "default" : "outline"}
                      onClick={() => item.setState(false)}
                    >
                      No
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={conditionsChange === null || exceptionsCommon === null || manualCoordHigh === null || outcomesMeasurable === null}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600"
                data-testid="button-next-step-2"
              >
                Continue to Risk Signals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium">Step 3: Risk Signals</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Cost of Wrong Execution</label>
                <Select value={wrongExecutionCost} onValueChange={setWrongExecutionCost}>
                  <SelectTrigger data-testid="select-wrong-execution-cost">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Compliance Sensitivity</label>
                <Select value={complianceSensitivity} onValueChange={setComplianceSensitivity}>
                  <SelectTrigger data-testid="select-compliance-sensitivity">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!wrongExecutionCost || !complianceSensitivity}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600"
                data-testid="button-get-results"
              >
                Get My Assessment
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RiskAssessmentTool() {
  const [executionRisk, setExecutionRisk] = useState([50]);
  const [decisionSensitivity, setDecisionSensitivity] = useState([50]);
  const [systemExposure, setSystemExposure] = useState([50]);
  const [oversightReadiness, setOversightReadiness] = useState([50]);
  const [showResults, setShowResults] = useState(false);

  const calculateRiskLevel = () => {
    const avg = (executionRisk[0] + decisionSensitivity[0] + systemExposure[0] + (100 - oversightReadiness[0])) / 4;
    if (avg >= 70) return { level: "High", color: "text-red-400", controls: "Extensive" };
    if (avg >= 40) return { level: "Medium", color: "text-amber-400", controls: "Moderate" };
    return { level: "Low", color: "text-cyan-400", controls: "Standard" };
  };

  const reset = () => {
    setExecutionRisk([50]);
    setDecisionSensitivity([50]);
    setSystemExposure([50]);
    setOversightReadiness([50]);
    setShowResults(false);
  };

  if (showResults) {
    const risk = calculateRiskLevel();
    return (
      <Card className="border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Autonomy Risk Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 rounded-lg bg-slate-950">
            <p className="text-sm text-muted-foreground mb-2">Autonomy Risk Level</p>
            <p className={`text-4xl font-bold ${risk.color} mb-2`}>{risk.level}</p>
            <p className="text-lg text-muted-foreground">
              Required Governance Controls: <span className="text-foreground font-medium">{risk.controls}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                Human-in-the-Loop Placement
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {executionRisk[0] > 60 && <li>Pre-execution approval required</li>}
                {decisionSensitivity[0] > 60 && <li>Decision review checkpoints</li>}
                {systemExposure[0] > 60 && <li>Multi-system action monitoring</li>}
                <li>Outcome verification gates</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Actions Requiring Manual Approval
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Financial transactions above threshold</li>
                <li>Customer-facing communications</li>
                <li>Data deletion or modification</li>
                <li>External system integrations</li>
              </ul>
            </div>
          </div>

          <Button onClick={reset} variant="outline" className="w-full" data-testid="button-reset-risk">
            <RotateCcw className="w-4 h-4 mr-2" />
            Assess Another Workflow
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cyan-500/20">
      <CardHeader>
        <CardTitle>Agent Autonomy Risk & Governance Assessment</CardTitle>
        <CardDescription>
          Identify where autonomy could create risk — before it happens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Execution Risk</label>
              <span className="text-sm text-muted-foreground">{executionRisk[0]}%</span>
            </div>
            <Slider
              value={executionRisk}
              onValueChange={setExecutionRisk}
              max={100}
              step={10}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">Financial impact of wrong action, irreversibility</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Decision Sensitivity</label>
              <span className="text-sm text-muted-foreground">{decisionSensitivity[0]}%</span>
            </div>
            <Slider
              value={decisionSensitivity}
              onValueChange={setDecisionSensitivity}
              max={100}
              step={10}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">Subjective judgment, ethical/legal implications</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">System Exposure</label>
              <span className="text-sm text-muted-foreground">{systemExposure[0]}%</span>
            </div>
            <Slider
              value={systemExposure}
              onValueChange={setSystemExposure}
              max={100}
              step={10}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">Number of connected systems, access privileges</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Oversight Readiness</label>
              <span className="text-sm text-muted-foreground">{oversightReadiness[0]}%</span>
            </div>
            <Slider
              value={oversightReadiness}
              onValueChange={setOversightReadiness}
              max={100}
              step={10}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">Human monitoring capacity, approval latency</p>
          </div>
        </div>

        <Button
          onClick={() => setShowResults(true)}
          className="w-full bg-cyan-500 hover:bg-cyan-600"
          data-testid="button-assess-risk"
        >
          Assess Risk Level
          <Shield className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function ROIEstimatorTool() {
  const [weeklyVolume, setWeeklyVolume] = useState("");
  const [coordHours, setCoordHours] = useState("");
  const [errorRecoveryHours, setErrorRecoveryHours] = useState("");
  const [slaBreachCost, setSlaBreachCost] = useState("");
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const vol = parseInt(weeklyVolume) || 0;
    const coord = parseInt(coordHours) || 0;
    const error = parseInt(errorRecoveryHours) || 0;
    const sla = parseInt(slaBreachCost) || 0;

    const timeRecovered = Math.round(coord * 0.7 + error * 0.8);
    const coordReduction = Math.round(coord * 0.65);
    const efficiencyGain = Math.min(85, Math.round(20 + vol * 0.05 + coord * 2));
    const monthlyROI = Math.round((coord * 50 + error * 75 + sla * 0.5) * 4);

    return { timeRecovered, coordReduction, efficiencyGain, monthlyROI };
  };

  const reset = () => {
    setWeeklyVolume("");
    setCoordHours("");
    setErrorRecoveryHours("");
    setSlaBreachCost("");
    setShowResults(false);
  };

  if (showResults) {
    const roi = calculateROI();
    return (
      <Card className="border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            Execution Load & ROI Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg bg-slate-950 text-center">
              <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-cyan-400">{roi.timeRecovered}h</p>
              <p className="text-sm text-muted-foreground">Execution Time Recovered / Week</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-950 text-center">
              <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-cyan-400">{roi.coordReduction}h</p>
              <p className="text-sm text-muted-foreground">Coordination Overhead Reduced / Week</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-950 text-center">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-cyan-400">{roi.efficiencyGain}%</p>
              <p className="text-sm text-muted-foreground">Operational Efficiency Gain</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-950 text-center">
              <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-cyan-400">${roi.monthlyROI.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Indicative Monthly ROI</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center italic">
            This reframes agentic systems as execution relief, not workforce replacement.
          </p>

          <Button onClick={reset} variant="outline" className="w-full" data-testid="button-reset-roi">
            <RotateCcw className="w-4 h-4 mr-2" />
            Calculate Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cyan-500/20">
      <CardHeader>
        <CardTitle>Execution Load & ROI Estimator</CardTitle>
        <CardDescription>
          Quantify the execution burden agentic systems can absorb
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Weekly Execution Volume</label>
            <input
              type="number"
              value={weeklyVolume}
              onChange={(e) => setWeeklyVolume(e.target.value)}
              placeholder="e.g., 500 tasks"
              className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-800 text-foreground"
              data-testid="input-weekly-volume"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Manual Coordination Hours / Week</label>
            <input
              type="number"
              value={coordHours}
              onChange={(e) => setCoordHours(e.target.value)}
              placeholder="e.g., 20 hours"
              className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-800 text-foreground"
              data-testid="input-coord-hours"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Error Recovery Hours / Week</label>
            <input
              type="number"
              value={errorRecoveryHours}
              onChange={(e) => setErrorRecoveryHours(e.target.value)}
              placeholder="e.g., 10 hours"
              className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-800 text-foreground"
              data-testid="input-error-hours"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">SLA Breach Cost / Month ($)</label>
            <input
              type="number"
              value={slaBreachCost}
              onChange={(e) => setSlaBreachCost(e.target.value)}
              placeholder="e.g., 5000"
              className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-800 text-foreground"
              data-testid="input-sla-cost"
            />
          </div>
        </div>

        <Button
          onClick={() => setShowResults(true)}
          disabled={!weeklyVolume || !coordHours}
          className="w-full bg-cyan-500 hover:bg-cyan-600"
          data-testid="button-calculate-roi"
        >
          Calculate ROI
          <BarChart3 className="w-4 h-4 ml-2" />
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
      title: "Manual Execution",
      description: "Human-driven coordination, high variability",
      benefits: ["Full human control", "Flexibility in handling exceptions"],
      risks: ["High labor cost", "Inconsistent outcomes", "Doesn't scale"],
      readiness: ["Basic process documentation", "Clear ownership"],
      next: "Document workflows and identify repetitive patterns",
    },
    {
      level: 2,
      title: "Automated Execution",
      description: "Rule-based workflows, fragile to change",
      benefits: ["Reduced manual effort", "Consistent execution for standard cases"],
      risks: ["Breaks on exceptions", "Requires maintenance", "Limited adaptability"],
      readiness: ["Stable, predictable workflows", "IT support for integrations"],
      next: "Identify exceptions and decision points for AI assistance",
    },
    {
      level: 3,
      title: "Assisted Agents",
      description: "AI suggests actions, humans execute",
      benefits: ["AI-powered recommendations", "Human judgment preserved", "Lower risk"],
      risks: ["Still requires human action", "Adoption challenges"],
      readiness: ["Trust in AI suggestions", "Clear escalation paths"],
      next: "Build confidence through consistent AI accuracy",
    },
    {
      level: 4,
      title: "Supervised Agents",
      description: "Agents act with approvals",
      benefits: ["Faster execution", "Human oversight maintained", "Reduced coordination"],
      risks: ["Approval bottlenecks", "Requires monitoring infrastructure"],
      readiness: ["Approval workflows in place", "Real-time monitoring"],
      next: "Identify low-risk actions that can proceed without approval",
    },
    {
      level: 5,
      title: "Governed Autonomous Agents",
      description: "Agents execute within strict boundaries, humans oversee outcomes",
      benefits: ["Maximum efficiency", "24/7 execution", "Scalable operations"],
      risks: ["Requires robust governance", "Higher initial investment"],
      readiness: ["Mature governance framework", "Clear success metrics", "Kill-switch capabilities"],
      next: "Continuous improvement and expansion to new workflows",
    },
  ];

  return (
    <Card className="border-cyan-500/20">
      <CardHeader>
        <CardTitle>Agentic Maturity Map</CardTitle>
        <CardDescription>
          See where your organization stands on the autonomy spectrum
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {stages.map((stage) => (
            <Button
              key={stage.level}
              variant={selectedStage === stage.level ? "default" : "outline"}
              className={selectedStage === stage.level ? "bg-cyan-500 hover:bg-cyan-600" : ""}
              onClick={() => setSelectedStage(stage.level)}
              data-testid={`button-stage-${stage.level}`}
            >
              Stage {stage.level}
            </Button>
          ))}
        </div>

        {selectedStage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {stages.filter(s => s.level === selectedStage).map(stage => (
              <div key={stage.level} className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-950 border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-cyan-500">Stage {stage.level}</Badge>
                    <h3 className="font-semibold text-lg">{stage.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{stage.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      Benefits
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {stage.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Risks
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {stage.risks.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      Readiness Indicators
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {stage.readiness.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                  <p className="text-sm">
                    <span className="font-medium text-cyan-400">When to move forward:</span>{" "}
                    <span className="text-muted-foreground">{stage.next}</span>
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {!selectedStage && (
          <div className="text-center p-8 text-muted-foreground">
            Select a stage above to see details, benefits, risks, and readiness indicators
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IndustryBlueprintsTool() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const industries = [
    {
      id: "healthcare",
      name: "Healthcare & Life Sciences",
      icon: HeartPulse,
      agentRoles: ["Intake Coordinator Agent", "Scheduling Agent", "Follow-up Agent", "Operations Agent"],
      boundaries: ["No clinical decisions", "Patient consent required", "HIPAA compliance gates"],
      governance: ["Human approval for patient communications", "Audit trails for all actions", "Role-based access"],
      workflows: ["Patient intake coordination", "Appointment scheduling & follow-ups", "Internal task orchestration"],
    },
    {
      id: "finance",
      name: "Finance, Lending & Insurance",
      icon: Landmark,
      agentRoles: ["Document Processing Agent", "Verification Agent", "Exception Handler", "Status Agent"],
      boundaries: ["Financial thresholds", "Compliance checkpoints", "Fraud detection gates"],
      governance: ["Multi-level approvals", "Full auditability", "Regulatory reporting"],
      workflows: ["Document processing orchestration", "Verification workflows", "Exception handling"],
    },
    {
      id: "ecommerce",
      name: "E-commerce, Retail & D2C",
      icon: ShoppingCart,
      agentRoles: ["Order Agent", "Inventory Agent", "Returns Agent", "Customer Resolution Agent"],
      boundaries: ["Refund limits", "Brand voice guidelines", "Escalation triggers"],
      governance: ["Real-time monitoring", "Customer satisfaction gates", "Volume-based throttling"],
      workflows: ["Order handling and routing", "Inventory checks", "Returns and refunds coordination"],
    },
    {
      id: "saas",
      name: "SaaS & Technology",
      icon: Server,
      agentRoles: ["Onboarding Agent", "Support Orchestrator", "Account Agent", "Renewal Agent"],
      boundaries: ["Data access controls", "Customer tier permissions", "Feature boundaries"],
      governance: ["Usage monitoring", "Security checkpoints", "Customer data protection"],
      workflows: ["Onboarding workflows", "Support ticket orchestration", "Renewal follow-ups"],
    },
    {
      id: "enterprise",
      name: "Enterprise & Internal Operations",
      icon: Building2,
      agentRoles: ["IT Task Agent", "HR Workflow Agent", "Approval Agent", "Coordination Agent"],
      boundaries: ["Department permissions", "Budget thresholds", "Policy compliance"],
      governance: ["Internal audit trails", "Manager approvals", "Compliance verification"],
      workflows: ["IT and HR task execution", "Approval workflows", "Cross-team coordination"],
    },
  ];

  const selected = industries.find(i => i.id === selectedIndustry);

  return (
    <Card className="border-cyan-500/20">
      <CardHeader>
        <CardTitle>Industry-Specific Agentic Blueprint Selector</CardTitle>
        <CardDescription>
          See how agentic systems operate safely in your industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {industries.map((industry) => (
            <Button
              key={industry.id}
              variant={selectedIndustry === industry.id ? "default" : "outline"}
              className={`flex-col h-auto py-3 ${selectedIndustry === industry.id ? "bg-cyan-500 hover:bg-cyan-600" : ""}`}
              onClick={() => setSelectedIndustry(industry.id)}
              data-testid={`button-industry-${industry.id}`}
            >
              <industry.icon className="w-5 h-5 mb-1" />
              <span className="text-xs text-center">{industry.name.split(" ")[0]}</span>
            </Button>
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-lg bg-slate-950 border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-2">
                <selected.icon className="w-6 h-6 text-cyan-400" />
                <h3 className="font-semibold text-lg">{selected.name}</h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  Typical Agent Roles
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {selected.agentRoles.map((role, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Execution Boundaries
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {selected.boundaries.map((boundary, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-amber-400" />
                      {boundary}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  Governance Layers
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {selected.governance.map((gov, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      {gov}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  Sample Agent Workflows
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {selected.workflows.map((wf, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <GitBranch className="w-3 h-3 text-purple-400" />
                      {wf}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {!selectedIndustry && (
          <div className="text-center p-8 text-muted-foreground">
            Select your industry above to see tailored agentic blueprints
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IndustryUseCases() {
  const industries = [
    {
      name: "Healthcare & Life Sciences",
      icon: HeartPulse,
      useCases: ["Patient intake coordination", "Appointment scheduling & follow-ups", "Internal task orchestration", "Operational workflow execution"],
      governance: ["Patient safety", "Regulatory compliance", "Human override requirements"],
      outcome: ["Reduced coordination load", "Faster operations", "Safe, supervised autonomy"],
    },
    {
      name: "Finance, Lending & Insurance",
      icon: CreditCard,
      useCases: ["Document processing orchestration", "Verification workflows", "Exception handling", "Status tracking and follow-ups"],
      governance: ["Financial risk", "Auditability", "Bias and compliance"],
      outcome: ["Faster execution", "Controlled autonomy", "Full traceability"],
    },
    {
      name: "E-commerce, Retail & D2C",
      icon: Package,
      useCases: ["Order handling and routing", "Inventory checks", "Returns and refunds coordination", "Customer issue resolution"],
      governance: ["Brand trust", "High volume", "Seasonal spikes"],
      outcome: ["Fewer manual handoffs", "Faster resolution", "Scalable execution"],
    },
    {
      name: "SaaS & Technology",
      icon: Server,
      useCases: ["Onboarding workflows", "Support ticket orchestration", "Account management tasks", "Renewal follow-ups"],
      governance: ["Customer experience", "Data access controls"],
      outcome: ["Reduced operational friction", "Consistent execution", "Better customer retention"],
    },
    {
      name: "Enterprise & Internal Operations",
      icon: Factory,
      useCases: ["IT and HR task execution", "Approval workflows", "Policy enforcement", "Cross-team coordination"],
      governance: ["Accountability", "Internal risk"],
      outcome: ["Faster internal execution", "Lower coordination overhead", "Improved operational clarity"],
    },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-400">Part 5</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Autonomous Agentic Systems by Industry
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One Execution Model. Designed for Very Different Risk Profiles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-slate-800 hover:border-cyan-500/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3">
                    <industry.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-lg">{industry.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Agentic Use Cases</p>
                    <ul className="space-y-1">
                      {industry.useCases.map((uc, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-1" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Why Governance Matters</p>
                    <ul className="space-y-1">
                      {industry.governance.map((g, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Shield className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                    <p className="text-xs font-medium text-cyan-400 mb-1">Outcome</p>
                    <ul className="space-y-1">
                      {industry.outcome.map((o, j) => (
                        <li key={j} className="text-xs text-muted-foreground">{o}</li>
                      ))}
                    </ul>
                  </div>
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
            AGIX designs <span className="text-cyan-400 font-medium">industry-aligned agentic architectures</span>, not generic agents.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "What are Autonomous Agentic Systems in simple terms?",
      answer: "They are AI systems that own execution of defined goals, can plan actions, act across systems, and adapt — all within clear boundaries and human control.",
    },
    {
      question: "Are Autonomous Agentic Systems the same as AI agents?",
      answer: "Not exactly. An agentic system is a governed execution architecture — often involving multiple agents — not just a single AI agent.",
    },
    {
      question: "Is this the same as automation?",
      answer: "No. Automation follows predefined steps. Agentic Systems decide which steps to take based on context and goals.",
    },
    {
      question: "Can Autonomous AI agents go out of control?",
      answer: "They can — if governance is missing. AGIX systems are built with boundaries, approvals, audit logs, and kill-switches.",
    },
    {
      question: "Do Autonomous Agentic Systems replace human employees?",
      answer: "No. They reduce coordination and execution burden, allowing humans to focus on judgment and strategy.",
    },
    {
      question: "What types of tasks should never be agent-driven?",
      answer: "Tasks involving high subjectivity, ethical judgment, legal interpretation, or unbounded risk. These should always involve humans.",
    },
    {
      question: "How do you control what an agent is allowed to do?",
      answer: "Through role-based permissions, action boundaries, approval thresholds, and confidence scoring. Autonomy is explicitly constrained.",
    },
    {
      question: "How do agentic systems handle errors?",
      answer: "They detect failures, retry or choose alternatives, escalate to humans when needed, and log every action.",
    },
    {
      question: "Are Autonomous Agentic Systems safe for regulated industries?",
      answer: "Yes — when designed with governance, auditability, and human-in-the-loop controls, which AGIX prioritizes.",
    },
    {
      question: "How long does it take to deploy an agentic system?",
      answer: "Initial assistive or supervised systems can show value in 4–8 weeks, with autonomy increasing gradually.",
    },
    {
      question: "Are agentic systems expensive to build?",
      answer: "Costs depend on scope, but starting with bounded, supervised autonomy is often more cost-effective than expanding human teams.",
    },
    {
      question: "Can agentic systems integrate with existing tools?",
      answer: "Yes. AGIX builds agentic systems that operate across existing APIs, platforms, and workflows.",
    },
    {
      question: "What's the difference between single-agent and multi-agent systems?",
      answer: "Single agents handle simple tasks. Multi-agent systems coordinate planning, execution, monitoring, and escalation — essential for real businesses.",
    },
    {
      question: "How do you prevent agents from taking irreversible actions?",
      answer: "By implementing approval gates, action simulation, human checkpoints, and restricted permissions.",
    },
    {
      question: "Can agentic systems learn and improve?",
      answer: "Yes — but learning does not automatically expand autonomy. Improvements are reviewed and governed.",
    },
    {
      question: "Is this technology mature enough for real businesses?",
      answer: "Yes — when applied thoughtfully. Problems arise when autonomy is deployed without controls.",
    },
    {
      question: "What's the biggest mistake companies make with AI agents?",
      answer: "Deploying agents without clear goals, boundaries, or accountability.",
    },
    {
      question: "Can small or mid-sized businesses use agentic systems?",
      answer: "Absolutely. SMBs often benefit the most from execution relief, when deployed carefully.",
    },
    {
      question: "How do humans stay accountable when agents execute tasks?",
      answer: "Humans define goals, boundaries, and approval rules. Agents execute. Humans remain accountable.",
    },
    {
      question: "How do we start safely with Autonomous Agentic Systems?",
      answer: "Start with assistive agents, supervised execution, and clear governance. Then expand autonomy gradually.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Questions About Autonomous Agentic Systems
          </h2>
          <p className="text-muted-foreground">
            Based on Google search behavior + LLM queries
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

function ClosingValueSection() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Autonomy Without Losing Control
          </h2>
          <p className="text-xl text-muted-foreground">
            Execution Should Scale.<br />
            <span className="text-cyan-400 font-medium">Accountability Should Not Break.</span>
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Agix Technologies designs Autonomous Agentic Systems that execute reliably, adapt intelligently, and remain fully governed.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-sm text-center">Find the right agentic approach for your business</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-sm text-center">Assess agentic readiness and risk</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-sm text-center">Design autonomous systems you can actually trust</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground italic pt-4">
            Agix Technologies builds AI systems that don't just act — they act responsibly.
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
          <Card className="border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Schedule an Agentic Systems Consultation</CardTitle>
              <CardDescription className="text-base">
                Learn how governed autonomous agents can transform your execution workflows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CtaForm 
                headline="Ready to Explore Agentic Systems?"
                subheadline="Talk to our Agentic Systems architects about your specific challenges."
                badgeText="Autonomous Agentic Systems"
                submitLabel="Schedule Consultation"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default function AgenticSystemsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <HeroSection />
      <TrustStrip />
      <WhatAreAgenticSystems />
      <WhyAutomationNotEnough />
      <ComparisonSection />
      <WhatMakesAgentic />
      <WhyBusinessesExploring />
      <AgixApproach />
      <ExecutionBottleneck />
      <HiddenCostOfCoordination />
      <RiskOfUngoverned />
      <ArchitectureSection />
      <AgixMethodology />
      <InteractiveToolsSection />
      <IndustryUseCases />
      <FAQSection />
      <ClosingValueSection />
      <FinalCTASection />
      <MainFooter />
    </div>
  );
}
