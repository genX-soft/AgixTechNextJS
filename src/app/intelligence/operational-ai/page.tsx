'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "@/lib/motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  XCircle,
  Workflow,
  Eye,
  Lightbulb,
  Zap,
  Settings,
  RefreshCcw,
  Shield,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Target,
  Layers,
  MessageSquare,
  BarChart3,
  ChevronRight,
  ChevronDown,
  Building2,
  Headphones,
  ArrowDown,
  Sparkles,
  Network,
  CircleDot,
  CheckCheck,
  RotateCcw,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

const StickyCTA = dynamic(() => import("./sticky-cta"), { ssr: false, loading: () => null });
const InteractiveToolsSection = dynamic(() => import("./interactive-tools-section"), { ssr: false, loading: () => null });


function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function HeroSection() {
  return (
    <section className="pt-24 lg:pt-28 pb-20 min-h-[80vh] flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 px-4 py-1.5" data-testid="badge-intelligence-category">
            <Workflow className="w-4 h-4 mr-2" />
            Intelligence
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
            Operational Intelligence That Keeps Your Business{" "}
            <span className="text-orange-400">Running Smoothly</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-subheadline">
            AI systems that understand daily operations, detect issues early, and guide smarter decisions — in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-gray-900 shadow-lg shadow-orange-500/25 focus:ring-2 focus:ring-orange-500/50" 
              onClick={() => scrollToSection("interactive-tools")}
              data-testid="button-hero-cta-primary"
            >
              Find the Right Solution
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection("what-is-operational-intelligence")}
              data-testid="button-hero-cta-secondary"
            >
              Explore How It Works
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection("what-is-operational-intelligence")}
            className="cursor-pointer hover:text-orange-400 transition-colors"
            aria-label="Scroll down"
            data-testid="button-scroll-down"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted-foreground hover:text-orange-400"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="py-6 border-y border-slate-800/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-sm text-muted-foreground" data-testid="text-trust-strip">
          Trusted by startups and enterprises building AI-driven operations across{" "}
          <span className="text-blue-400">healthcare</span>,{" "}
          <span className="text-purple-400">finance</span>,{" "}
          <span className="text-green-400">logistics</span>,{" "}
          <span className="text-orange-400">retail</span>, and{" "}
          <span className="text-teal-400">professional services</span>.
        </p>
      </div>
    </section>
  );
}

function WhatIsOperationalIntelligence() {
  return (
    <section id="what-is-operational-intelligence" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-understanding">
            <Eye className="w-3 h-3 mr-1" />
            Understanding
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-what-is">
            What Is Operational Intelligence?
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Operational Intelligence is the ability of an organization to monitor operations in real time, 
            understand what is happening, and take the right action before problems escalate.
          </p>

          <Card className="bg-slate-900/50 border-slate-700 mb-8">
            <CardContent className="p-6">
              <p className="text-lg text-center">
                In simple words: Operational Intelligence turns everyday business operations into an{" "}
                <span className="text-blue-400">intelligent system</span> that can{" "}
                <span className="text-purple-400">observe</span>,{" "}
                <span className="text-green-400">think</span>, and{" "}
                <span className="text-orange-400">respond</span> continuously.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" />
                  Traditional Operations Rely On
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {["Static dashboards", "Manual follow-ups", "Delayed reports", "Human memory"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-traditional-${i}`}>
                    <XCircle className="w-3 h-3 text-red-400/50" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  AI-Powered Intelligence Uses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {["Real-time monitoring", "Automated insights", "Predictive alerts", "Continuous learning"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-ai-powered-${i}`}>
                    <CheckCircle2 className="w-3 h-3 text-green-400/50" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OperationsCategories() {
  const categories = [
    {
      title: "Core Business",
      icon: Building2,
      color: "text-blue-400",
      items: ["Order processing", "Supply chain coordination", "Service delivery", "Field operations"],
    },
    {
      title: "Internal & Management",
      icon: Settings,
      color: "text-purple-400",
      items: ["Task execution", "Approvals & escalations", "Compliance workflows", "Documentation"],
    },
    {
      title: "Customer & Support",
      icon: Headphones,
      color: "text-green-400",
      items: ["Customer service", "Appointment scheduling", "Ticket handling", "Onboarding"],
    },
    {
      title: "Revenue & Growth",
      icon: TrendingUp,
      color: "text-orange-400",
      items: ["Lead qualification", "Sales follow-ups", "Pricing approvals", "Churn prevention"],
    },
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
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-scope">
            <Layers className="w-3 h-3 mr-1" />
            Scope
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-operations">
            Where Operations Live in Real Businesses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Operations include every recurring activity that keeps your business running.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`card-category-${i}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                    <span className={cat.color}>{cat.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-muted-foreground">
                        <CircleDot className={`w-2 h-2 ${cat.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { aspect: "Primary Function", automation: "Executes predefined steps", analytics: "Explains what happened", intelligence: "Understands what's happening now" },
    { aspect: "Adaptability", automation: "Works in predictable scenarios", analytics: "Requires human interpretation", intelligence: "Interprets context and risk" },
    { aspect: "Decision Making", automation: "Follows fixed rules", analytics: "Provides historical insights", intelligence: "Recommends or triggers actions" },
    { aspect: "Learning", automation: "Static unless reprogrammed", analytics: "Limited pattern recognition", intelligence: "Improves continuously" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-comparison">
            <BarChart3 className="w-3 h-3 mr-1" />
            Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-comparison">
            Intelligence vs Automation vs Analytics
          </h2>
        </motion.div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="text-left p-4 text-muted-foreground font-medium">Aspect</th>
                  <th className="text-center p-4 text-slate-400">Automation</th>
                  <th className="text-center p-4 text-purple-400">Analytics</th>
                  <th className="text-center p-4 text-orange-400 font-semibold">Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800" data-testid={`row-comparison-${i}`}>
                    <td className="p-4 font-medium">{row.aspect}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.automation}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.analytics}</td>
                    <td className="p-4 text-center text-orange-400">{row.intelligence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="text-center text-muted-foreground mt-6" data-testid="text-comparison-conclusion">
          Operational Intelligence <span className="text-orange-400 font-medium">decides first</span> — then automates where appropriate.
        </p>
      </div>
    </section>
  );
}

function WhyBusinessesNeedIt() {
  const hiddenCosts = [
    { icon: Clock, label: "Missed SLAs", color: "text-red-400" },
    { icon: RotateCcw, label: "Rework Loops", color: "text-amber-400" },
    { icon: Users, label: "Burned-out Teams", color: "text-orange-400" },
    { icon: TrendingUp, label: "Revenue Leakage", color: "text-red-400" },
    { icon: Shield, label: "Compliance Risks", color: "text-amber-400" },
    { icon: MessageSquare, label: "Customer Friction", color: "text-orange-400" },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-why">
            <Target className="w-3 h-3 mr-1" />
            Part 2
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why">
            Why Businesses Need Operational Intelligence
          </h2>
          <p className="text-xl text-muted-foreground">
            The Real Problem Is Not Speed — It's Decision Blindness
          </p>
        </motion.div>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold" data-testid="heading-drift">Operations Don't Usually Fail. They Drift.</h3>
            <p className="text-muted-foreground">
              Most businesses don't experience sudden operational collapse. Instead, they experience:
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {[
                "Slight delays becoming routine",
                "Teams constantly firefighting",
                "Decisions taken late",
                "Escalations after customer impact",
                "Growth creating confusion",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2" data-testid={`text-drift-${i}`}>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-xl font-semibold mb-6" data-testid="heading-hidden-costs">The Hidden Costs</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hiddenCosts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="text-center hover-elevate" data-testid={`card-cost-${i}`}>
                  <CardContent className="p-4">
                    <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-3 text-amber-400" data-testid="heading-automation-not-enough">
              Why Automation Alone Is Not Enough
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
              {["Automating inefficient processes", "Scaling the wrong decisions", "Increasing exception handling", "Losing human control"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-automation-issue-${i}`}>
                  <XCircle className="w-3 h-3 text-red-400" />
                  {item}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-700 text-center">
              <p className="text-sm" data-testid="text-automation-conclusion">
                <span className="text-red-400">Automation executes.</span>{" "}
                <span className="text-green-400">Operational Intelligence decides.</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    { title: "Signal & Data Layer", subtitle: "Seeing What's Happening", icon: Eye, color: "from-blue-500 to-blue-600", description: "Continuously observes operations by collecting signals from business systems, workflow events, communications, documents, and human actions.", capabilities: ["Business systems and tools", "Workflow events and logs", "Communications", "Documents and records"] },
    { title: "Context & Understanding", subtitle: "Knowing What It Means", icon: Brain, color: "from-purple-500 to-purple-600", description: "Uses AI to interpret unstructured information, understand intent and urgency, detect anomalies, and identify patterns.", capabilities: ["Interpret unstructured data", "Understand intent and priority", "Detect anomalies", "Identify patterns"] },
    { title: "Decision & Reasoning", subtitle: "Deciding What to Do", icon: Lightbulb, color: "from-amber-500 to-amber-600", description: "Combines AI reasoning, business rules, and compliance logic to determine the best action.", capabilities: ["AI reasoning models", "Business rules integration", "Risk and compliance logic", "Human approval workflows"] },
    { title: "Execution & Orchestration", subtitle: "Acting Across Systems", icon: Zap, color: "from-green-500 to-green-600", description: "Triggers workflows, routes tasks, sends alerts, and updates systems. Every action is traceable.", capabilities: ["Trigger workflows", "Route tasks", "Send alerts", "Update systems"] },
    { title: "Learning & Feedback", subtitle: "Getting Smarter", icon: RefreshCcw, color: "from-teal-500 to-teal-600", description: "Tracks outcomes, learns from overrides, refines prioritization, and improves accuracy continuously.", capabilities: ["Track outcomes", "Learn from overrides", "Refine recommendations", "Adapt continuously"] },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-architecture">
            <Network className="w-3 h-3 mr-1" />
            Part 3: Architecture
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-architecture">
            How AI Delivers Operational Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Five-Layer Architecture — designed for reliability, safety, and scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-2">
            {layers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => setActiveLayer(i)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      activeLayer === i 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/30'
                    }`}
                    data-testid={`button-layer-${i}`}
                    aria-pressed={activeLayer === i}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">Layer {i + 1}</div>
                        <div className="font-medium truncate">{layer.title}</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${activeLayer === i ? 'rotate-90 text-orange-400' : 'text-muted-foreground'}`} />
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-slate-700" data-testid="card-layer-details">
                  <CardContent className="p-6">
                    {(() => {
                      const layer = layers[activeLayer];
                      const Icon = layer.icon;
                      return (
                        <>
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-4`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold mb-1" data-testid="text-layer-title">{layer.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{layer.subtitle}</p>
                          <p className="text-muted-foreground mb-6" data-testid="text-layer-description">{layer.description}</p>
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Key Capabilities</p>
                            {layer.capabilities.map((cap, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm" data-testid={`text-capability-${j}`}>
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>{cap}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgixMethodology() {
  const steps = [
    { step: "1", title: "Operational Mapping", desc: "Understand how work actually flows" },
    { step: "2", title: "Decision Points", desc: "Find where delays and risks exist" },
    { step: "3", title: "Intelligence Design", desc: "Define observe, decide, execute" },
    { step: "4", title: "Controlled Deployment", desc: "Start assistive before autonomy" },
    { step: "5", title: "Continuous Optimization", desc: "Improve using real feedback" },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-4" data-testid="badge-methodology">
            <Sparkles className="w-3 h-3 mr-1" />
            The AGIX Technologies Way
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-methodology">
            How AGIX Technologies Approaches Operational Intelligence
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full text-center hover-elevate" data-testid={`card-step-${i}`}>
                <CardContent className="p-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-400 shrink-0" />
                <div>
                  <h3 className="font-bold mb-2" data-testid="heading-governance">Governance Built In</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    {["Human-in-the-loop controls", "Decision traceability", "Audit logs & explainability", "Fail-safe mechanisms"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-governance-${i}`}>
                        <CheckCheck className="w-3 h-3 text-green-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}



function ResultsMetrics() {
  const metrics = [
    { value: "40%", label: "Reduction in Operational Delays", color: "text-green-400" },
    { value: "60%", label: "Faster Decision Making", color: "text-blue-400" },
    { value: "35%", label: "Decrease in Manual Escalations", color: "text-purple-400" },
    { value: "25%", label: "Cost Savings on Operations", color: "text-orange-400" },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
            What Our Clients Achieve
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-results-description">
            Real outcomes from businesses that implemented Operational Intelligence with AGIX Technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center hover-elevate" data-testid={`card-metric-${i}`}>
                <CardContent className="p-6">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color}`} data-testid={`text-metric-value-${i}`}>
                    {metric.value}
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid={`text-metric-label-${i}`}>{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function OperationalIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <WhatIsOperationalIntelligence />
        <OperationsCategories />
        <ComparisonTable />
        <WhyBusinessesNeedIt />
        <ArchitectureSection />
        <AgixMethodology />
        <InteractiveToolsSection />
        <ResultsMetrics />
        <FAQSection
          faqs={documentFAQs['operational-ai']}
          title="Operational Intelligence Questions Answered"
        />
        <section id="cta-form" className="py-10 lg:py-14 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CtaForm 
              headline="Ready to Transform Your Operations?"
              subheadline="Let's discuss how Operational Intelligence can bring clarity, control, and confidence to your business."
            />
          </div>
        </section>
      </main>
      <MainFooter />
      <StickyCTA />
    </div>
  );
}
