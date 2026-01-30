'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { FloatingChatCta } from "@/components/shared/floating-chat-cta";
import {
  Shield,
  Target,
  Brain,
  Layers,
  Users,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Lock,
  Settings,
  TrendingUp,
  Eye,
  Scale,
  Zap,
  MessageSquare,
  BarChart3,
  Cpu,
  Bot,
  Database,
  Building2,
  Rocket,
  AlertTriangle,
  Wrench,
  HeartHandshake,
  Sparkles,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 }
  },
  viewport: { once: true }
};

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-28 min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/30 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/40 bg-primary/10">
            <Building2 className="w-4 h-4 mr-2" />
            About AGIX Technologies
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Engineering Intelligence Systems </span>
            <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Businesses Can Actually Trust
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            We didn't start AGIX to build AI tools.
            <span className="block mt-2 text-foreground font-medium">
              We built it to fix how AI is applied in the real world.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg px-8"
              onClick={() => scrollToSection("cta-form")}
              data-testid="button-hero-start-conversation"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8"
              onClick={() => scrollToSection("our-story")}
              data-testid="button-hero-learn-more"
            >
              Learn Our Story
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-3 bg-primary/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CoreTruthSection() {
  const painPoints = [
    { icon: Target, text: "Clear intent" },
    { icon: Settings, text: "Operational grounding" },
    { icon: Scale, text: "Decision accountability" },
    { icon: Lock, text: "Knowledge trust" },
    { icon: Shield, text: "Execution governance" }
  ];

  return (
    <section id="our-story" className="py-24 bg-slate-900/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-amber-500/40 bg-amber-500/10 text-amber-400">
            <Lightbulb className="w-4 h-4 mr-2" />
            The Uncomfortable Truth
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Most AI Failures Are Not Technology Failures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            They are design, governance, and systems failures.
          </p>
        </motion.div>

        <motion.div {...fadeInUp} className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-center">
                Businesses don't struggle because AI models aren't powerful enough.
                <span className="block mt-2 text-foreground font-semibold">
                  They struggle because AI is deployed without:
                </span>
              </p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={point.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                      <point.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{point.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  AGIX exists to solve that gap.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function BeliefSection() {
  const notAI = [
    "A chatbot",
    "A model",
    "A plug-and-play tool",
    "A one-time deployment"
  ];

  const impacts = [
    "How we design solutions",
    "How we talk to clients",
    "How we structure our services",
    "How we define success"
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-blue-500/40 bg-blue-500/10 text-blue-400">
            <Brain className="w-4 h-4 mr-2" />
            Our Core Belief
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            AI Is Not a Feature — It's a System
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInUp}>
            <Card className="h-full bg-red-950/20 border-red-500/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-400">AGIX Rejected the Idea That AI Is:</h3>
                </div>
                <ul className="space-y-3">
                  {notAI.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Card className="h-full bg-emerald-950/20 border-emerald-500/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-400">This Belief Shaped Everything:</h3>
                </div>
                <ul className="space-y-3">
                  {impacts.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardContent className="py-8 px-12">
              <p className="text-xl md:text-2xl font-medium">
                AI only creates value when it is engineered as an{" "}
                <span className="text-primary font-bold">intelligence system</span>
                {" "}— not a standalone capability.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function WhyWeBuiltSection() {
  const failures = [
    { icon: MessageSquare, text: "Conversational AI failed due to hallucinations", color: "purple" },
    { icon: Settings, text: "Automation broke under real-world complexity", color: "orange" },
    { icon: BarChart3, text: "Decisions remained biased and inconsistent", color: "emerald" },
    { icon: Database, text: "Knowledge systems couldn't be trusted", color: "indigo" },
    { icon: Bot, text: '"AI agents" acted without accountability', color: "cyan" }
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400" }
  };

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10">
            <Rocket className="w-4 h-4 mr-2" />
            Why We Built AGIX
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            An Intelligence-First Company
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            As AI adoption accelerated, we noticed a pattern across industries:
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {failures.map((failure, index) => {
            const colors = colorClasses[failure.color];
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-5 rounded-lg ${colors.bg} border ${colors.border}`}
              >
                <div className="flex items-start gap-3">
                  <failure.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.text}`} />
                  <span className="text-sm">{failure.text}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div {...fadeInUp}>
            <Card className="h-full bg-red-950/20 border-red-500/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-red-400 uppercase tracking-wide">The Industry Response</span>
                </div>
                <p className="text-xl font-semibold text-foreground mb-2">
                  Most vendors responded by
                </p>
                <p className="text-2xl font-bold text-red-400">
                  adding more tools.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Card className="h-full bg-primary/10 border-primary/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">The AGIX Response</span>
                </div>
                <p className="text-xl font-semibold text-foreground mb-2">
                  We responded by
                </p>
                <p className="text-2xl font-bold text-primary">
                  designing better systems.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mb-12">
          <div className="text-center p-8 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-muted-foreground mb-3">AGIX was built to answer one core question:</p>
            <p className="text-xl md:text-2xl font-bold text-primary">
              "How do we make AI reliable, explainable, and safe enough to run real businesses?"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IntelligenceFrameworkSection() {
  const pillars = [
    {
      icon: MessageSquare,
      name: "Conversational Intelligence",
      description: "How intent enters the system — safely and contextually.",
      color: "purple",
      href: "/intelligence/conversational-ai/"
    },
    {
      icon: BarChart3,
      name: "Decision Intelligence",
      description: "How choices are evaluated, explained, and improved over time.",
      color: "emerald",
      href: "/intelligence/decision-ai/"
    },
    {
      icon: Settings,
      name: "Operational Intelligence",
      description: "How work runs, adapts, and improves in real time.",
      color: "orange",
      href: "/intelligence/operational-ai/"
    },
    {
      icon: Bot,
      name: "Autonomous Agentic Systems",
      description: "How execution scales — without chaos or blind autonomy.",
      color: "cyan",
      href: "/intelligence/autonomous-agentic-ai/"
    },
    {
      icon: Database,
      name: "Enterprise Knowledge Intelligence",
      description: "How trust, truth, and compliance are enforced.",
      color: "indigo",
      href: "/intelligence/enterprise-knowledge-ai/"
    }
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string; hoverBorder: string }> = {
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", hoverBorder: "hover:border-purple-500/60" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", hoverBorder: "hover:border-orange-500/60" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", hoverBorder: "hover:border-emerald-500/60" },
    indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", hoverBorder: "hover:border-indigo-500/60" },
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", hoverBorder: "hover:border-cyan-500/60" }
  };

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10">
            <Layers className="w-4 h-4 mr-2" />
            The AGIX Intelligence Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A Systematic Way to Apply AI Without Losing Control
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Instead of selling isolated services, AGIX engineers interconnected intelligence layers:
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {pillars.map((pillar, index) => {
            const colors = colorClasses[pillar.color];
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={pillar.href}>
                  <Card 
                    className={`h-full ${colors.bg} ${colors.border} ${colors.hoverBorder} transition-all duration-300 cursor-pointer group`}
                    data-testid={`link-pillar-${pillar.color}`}
                  >
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center mb-4`}>
                        <pillar.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>{pillar.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{pillar.description}</p>
                      <div className={`flex items-center text-sm ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div {...fadeInUp} className="text-center">
          <p className="text-lg text-muted-foreground">
            This framework is not marketing language.
            <span className="block mt-1 text-foreground font-semibold">
              It is how we architect every solution we build.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SpecializationSection() {
  const capabilities = [
    { icon: Target, text: "Operates within real constraints" },
    { icon: Layers, text: "Integrates with existing businesses" },
    { icon: Eye, text: "Explains its reasoning" },
    { icon: Shield, text: "Respects governance and compliance" },
    { icon: TrendingUp, text: "Improves over time without increasing risk" }
  ];

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10">
              <Wrench className="w-4 h-4 mr-2" />
              Our Specialization
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              AI Systems Engineering
            </h2>
            <p className="text-xl text-muted-foreground mb-2">
              Not Models. Not Bots. Not Experiments.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              AGIX specializes in AI systems engineering — the discipline of designing AI that works in the real world.
            </p>

            <div className="space-y-4">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <cap.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{cap.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Our Philosophy</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                    <p className="text-muted-foreground text-center">
                      We don't chase novelty.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-center font-semibold text-primary">
                      We engineer durability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DifferenceSection() {
  const differences = [
    { text: "We start with problem framing, not tools", icon: Target },
    { text: "We design governance before autonomy", icon: Shield },
    { text: "We prefer assistive intelligence before full automation", icon: Users },
    { text: "We build feedback loops, not static deployments", icon: TrendingUp }
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10">
            <Zap className="w-4 h-4 mr-2" />
            What Makes Us Different
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            In Practice, Not Just in Theory
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInUp}>
            <Card className="h-full bg-slate-800/30 border-slate-700/50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground mb-2">Most AI companies focus on:</p>
                  <p className="text-2xl font-bold text-slate-400">"What the AI can do"</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Card className="h-full bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <p className="text-muted-foreground mb-2">AGIX focuses on:</p>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-primary">"What the AI should do"</p>
                    <p className="text-xl font-bold text-primary">"What it must not do"</p>
                    <p className="text-xl font-bold text-primary">"Who remains accountable"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div {...fadeInUp}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">That difference shows up in how we work:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {differences.map((diff, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <diff.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span>{diff.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function JourneySection() {
  const [activePhase, setActivePhase] = useState(2);
  
  const phases = [
    {
      number: 1,
      title: "Tools & Experiments",
      description: "Like many teams, we explored models, chatbots, and automation early.",
      icon: Lightbulb
    },
    {
      number: 2,
      title: "Real-World Friction",
      description: "As systems met reality, we saw where AI broke:",
      bullets: ["Edge cases", "Compliance gaps", "Trust failures", "Operational fragility"],
      icon: AlertTriangle
    },
    {
      number: 3,
      title: "Systems Thinking",
      description: "We shifted focus from what AI can do to how AI should behave.",
      highlight: "That shift became AGIX.",
      icon: Brain
    }
  ];

  const clients = [
    { icon: Building2, text: "Enterprises" },
    { icon: Rocket, text: "High-growth companies" },
    { icon: Shield, text: "Regulated industries" },
    { icon: TrendingUp, text: "Teams that care about long-term AI reliability" }
  ];

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            Our Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Experiments to Enterprise-Grade Intelligence
          </h2>
          <p className="text-lg text-muted-foreground">
            AGIX's journey mirrors the evolution of AI itself.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 ${
                  activePhase === phase.number 
                    ? 'bg-primary/10 border-primary/40' 
                    : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
                }`}
                onClick={() => setActivePhase(phase.number)}
                data-testid={`card-phase-${phase.number}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activePhase === phase.number ? 'bg-primary text-primary-foreground' : 'bg-slate-700 text-muted-foreground'
                    }`}>
                      <phase.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Phase {phase.number}</span>
                      <h3 className="font-semibold">{phase.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">{phase.description}</p>
                  
                  {phase.bullets && (
                    <ul className="space-y-1 mb-3">
                      {phase.bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {phase.highlight && (
                    <p className="text-sm font-semibold text-primary">{phase.highlight}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeInUp}>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Today, we work with:</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {clients.map((client, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-slate-900/50">
                    <client.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{client.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const questions = [
    "Where does trust break today?",
    "Where do decisions stall?",
    "Where does execution fail?",
    "Where is knowledge unreliable?",
    "What autonomy is actually safe?"
  ];

  const outcomes = [
    "Fit the organization",
    "Respect constraints",
    "Scale responsibly"
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10">
            <HeartHandshake className="w-4 h-4 mr-2" />
            How We Work With Clients
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We Don't Arrive With a Prebuilt Solution
          </h2>
          <p className="text-xl text-muted-foreground">
            We arrive with questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInUp}>
            <Card className="h-full bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Our First Questions
                </h3>
                <div className="space-y-3">
                  {questions.map((q, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50">
                      <span className="text-primary font-mono text-sm">{index + 1}.</span>
                      <span className="text-muted-foreground">{q}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Card className="h-full bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Only Then We Design Systems That:
                </h3>
                <div className="space-y-4 mb-8">
                  {outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{outcome}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 rounded-lg bg-slate-900/50 border border-primary/20">
                  <p className="text-center text-muted-foreground">
                    Our role is not just to build —
                  </p>
                  <p className="text-center font-semibold text-primary mt-1">
                    it's to protect our clients from AI misuse.
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

function ResponsibilitySection() {
  const beliefs = [
    { icon: Users, text: "Humans must remain accountable" },
    { icon: Eye, text: "AI must be explainable" },
    { icon: Lock, text: "Autonomy must be bounded" },
    { icon: Shield, text: "Knowledge must be trusted" }
  ];

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-amber-500/40 bg-amber-500/10 text-amber-400">
            <Scale className="w-4 h-4 mr-2" />
            Our View on AI Responsibility
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We're Not Anti-Automation
          </h2>
          <p className="text-xl text-amber-400 font-semibold">
            We are anti-uncontrolled automation.
          </p>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">We believe:</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {beliefs.map((belief, index) => (
                  <div key={index} className="text-center p-6 rounded-lg bg-slate-900/50 border border-slate-700/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                      <belief.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{belief.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp} className="text-center">
          <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 inline-block">
            <CardContent className="py-6 px-12">
              <p className="text-lg">
                Responsibility is not a checkbox.
                <span className="block mt-1 font-bold text-amber-400">
                  It's an architectural decision.
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function WhoWeWorkWithSection() {
  const bestFit = [
    "Want AI to last, not just launch",
    "Care about compliance and trust",
    "Understand that speed without control creates risk",
    "Are building for scale, not demos"
  ];

  const notFit = [
    "A quick chatbot",
    "A flashy AI demo",
    "Unrestricted autonomy"
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/40 bg-primary/10">
            <Users className="w-4 h-4 mr-2" />
            Who We Work Best With
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Finding the Right Fit
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div {...fadeInUp}>
            <Card className="h-full bg-emerald-950/20 border-emerald-500/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-400">AGIX works best with organizations that:</h3>
                </div>
                <ul className="space-y-3">
                  {bestFit.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Card className="h-full bg-slate-800/30 border-slate-700/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-400">If you're looking for:</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  {notFit.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground text-sm border-t border-slate-700/50 pt-4">
                  We may not be the right fit — and that's intentional.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center">
          <Badge variant="outline" className="mb-6 border-primary/40 bg-primary/10">
            <Target className="w-4 h-4 mr-2" />
            Our Mission
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            To engineer intelligence systems that businesses can rely on —
            <span className="block mt-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              today and five years from now.
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              "Not experimental AI.",
              "Not black boxes.",
              "Not fragile automation."
            ].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <p className="text-muted-foreground">{text}</p>
              </motion.div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardContent className="py-8 px-12">
              <p className="text-2xl font-bold">
                Real intelligence. Real accountability.{" "}
                <span className="text-primary">Real impact.</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const questions = [
    "Can we trust it?",
    "Can it scale safely?",
    "Will this still work next year?"
  ];

  return (
    <section id="cta-form" className="py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeInUp}>
          <Card className="bg-slate-900/80 border-primary/20 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <CtaForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <HeroSection />
      <CoreTruthSection />
      <BeliefSection />
      <WhyWeBuiltSection />
      <IntelligenceFrameworkSection />
      <SpecializationSection />
      <DifferenceSection />
      <JourneySection />
      <HowWeWorkSection />
      <ResponsibilitySection />
      <WhoWeWorkWithSection />
      <MissionSection />
      <FinalCTASection />
      <MainFooter />
      <FloatingChatCta />
    </div>
  );
}
