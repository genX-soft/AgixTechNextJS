'use client'
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Brain, CheckCircle2, Shield, TrendingUp, AlertTriangle,
  ChevronDown, ChevronRight, ArrowDown, CheckCheck, Bot, Globe, Quote,
  User, RefreshCcw, Target, Layers, BarChart3, LineChart, Zap,
  XCircle, Activity, Landmark, ShoppingBag, Truck, Factory, Umbrella,
  HeartPulse, Building2, Eye,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function HeroSection() {
  return (
    <section className="pt-24 lg:pt-28 pb-20 min-h-[85vh] flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto text-center space-y-6">
          <nav aria-label="Breadcrumb" className="flex justify-center">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li><span className="text-muted-foreground">Intelligence</span></li>
              <ChevronRight className="w-3 h-3" />
              <li><span className="text-green-400">Autonomous Agentic Systems</span></li>
            </ol>
          </nav>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/30 px-4 py-1.5" data-testid="badge-hero-category">
            <Bot className="w-4 h-4 mr-2" />Intelligence Framework
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
            Autonomous Agentic Systems:{" "}
            <span className="text-green-400">AI That Plans, Decides, Executes &amp; Adapts — Independently</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subheadline">
            Autonomous agentic systems are AI architectures designed to pursue goals, make decisions, take actions across tools and systems, and adapt over time — with{" "}
            <span className="text-green-400">minimal human intervention</span> and{" "}
            <span className="text-amber-400">strong governance controls</span>.
          </p>
          <p className="text-sm text-muted-foreground/70 italic">
            By <Link href="/author/santosh/" className="text-green-400/80 hover:text-green-400 transition-colors">Santosh Singh</Link>, Founder &amp; CEO, AGIX Technologies · April 2026
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25" onClick={() => scrollToSection("autonomy-model")} data-testid="button-hero-primary">
              Explore the L1→L4 Model <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("safety-framework")} data-testid="button-hero-secondary">
              Safety Framework <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button onClick={() => scrollToSection("definition")} aria-label="Scroll down" data-testid="button-scroll-down">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-muted-foreground hover:text-green-400 transition-colors">
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
          Gartner: <span className="text-green-400">40% of enterprise apps embed agents by 2026</span> (up from &lt;5% in 2025) · Market: <span className="text-blue-400">$5.25B → $199B by 2034</span> at 43.84% CAGR · Only <span className="text-red-400">21% of companies have mature governance</span> for autonomous agents (Deloitte)
        </p>
      </div>
    </section>
  );
}

function DefinitionBlock() {
  return (
    <section id="definition" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-definition">
            <Eye className="w-3 h-3 mr-1" />Definition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-definition">What Are Autonomous Agentic Systems?</h2>
          <div className="bg-slate-900/60 border border-green-500/20 rounded-xl p-6 md:p-8 mb-6" itemScope itemType="https://schema.org/Question">
            <meta itemProp="name" content="What are autonomous agentic systems?" />
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-lg md:text-xl leading-relaxed" itemProp="text" data-testid="text-definition-primary">
                <strong>Autonomous agentic systems</strong> are AI architectures designed to{" "}
                <span className="text-blue-400">pursue goals</span>,{" "}
                <span className="text-purple-400">make decisions</span>,{" "}
                <span className="text-amber-400">take actions across tools and systems</span>, and{" "}
                <span className="text-green-400">adapt over time</span>{" "}
                — with minimal human intervention and strong governance controls. Unlike traditional automation that follows predefined rules, or chatbots that respond to prompts, agentic systems understand goals (not just tasks), decide what to do next based on context, execute actions across multiple systems, and monitor their own results.
              </p>
            </div>
          </div>
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <p className="text-base italic" data-testid="text-original-quote">
                  Agentic AI is the transition from AI that answers questions to AI that owns outcomes. This is the most consequential shift in enterprise technology since cloud computing — and the organizations that get the architecture right will define the next decade.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function MarketContextSection() {
  const adoptionStats = [
    { value: "40%", label: "of enterprise apps embed agents by 2026", sub: "up from <5% in 2025 — 8x jump in one year", source: "Gartner", color: "text-green-400" },
    { value: "40%+", label: "of agentic AI projects will be canceled by 2027", sub: "costs, unclear value, inadequate risk controls", source: "Gartner", color: "text-red-400" },
    { value: "21%", label: "of companies have mature governance", sub: "for autonomous AI agents — the governance gap", source: "Deloitte", color: "text-amber-400" },
    { value: "$199B", label: "agentic AI market by 2034", sub: "from $5.25B in 2024 — 43.84% CAGR", source: "Market.us/Landbase", color: "text-blue-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-market">
            <TrendingUp className="w-3 h-3 mr-1" />Market Context
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-market">Why Autonomous Agentic AI Is the Defining Technology of 2026–2030</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">This is not a prediction. This is what the data shows — and why the gap between ambition and execution is where most organizations fail.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {adoptionStats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="text-center border-slate-700 bg-slate-900/50" data-testid={`card-stat-${i}`}>
                <CardContent className="p-6 space-y-1">
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <p className="font-semibold text-xs">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                  <p className="text-xs text-muted-foreground/50 italic mt-2">Source: {s.source}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-market-quote">
                The gap between agentic AI ambition and agentic AI execution is where most organizations will fail. Architecture — not enthusiasm — determines whether you're in the 25% that succeeds or the 40% that gets canceled.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { dim: "Operates on", auto: "Rules and triggers", assist: "User prompts and requests", agent: "Goals and objectives" },
    { dim: "Decision-making", auto: "None — follows instructions", assist: "Suggests — human acts", agent: "Decides and acts — human oversees" },
    { dim: "Adaptability", auto: "Breaks on exceptions", assist: "Limited to conversation context", agent: "Adapts strategy based on outcomes" },
    { dim: "Duration", auto: "Single execution per trigger", assist: "Single session", agent: "Long-running — hours, days, weeks" },
    { dim: "Tool usage", auto: "Hardcoded integrations", assist: "Limited function-calling", agent: "Dynamic multi-tool orchestration" },
    { dim: "Failure handling", auto: "Stops and escalates", assist: '"I don\'t know"', agent: "Self-recovery, replanning, or intelligent escalation" },
    { dim: "Memory", auto: "None", assist: "Session-level", agent: "Persistent across interactions" },
    { dim: "Multi-agent", auto: "None", assist: "None", agent: "Multiple specialist agents collaborating" },
    { dim: "Governance", auto: "Low — deterministic behavior", assist: "Medium — output review", agent: "High — bounded autonomy, audit trails, kill switches" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-comparison">
            <BarChart3 className="w-3 h-3 mr-1" />Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-comparison">Agentic AI vs Automation vs AI Assistants</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Three distinct capabilities. Only one owns outcomes.</p>
        </motion.div>
        <Card className="overflow-hidden border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/70">
                  <th className="text-left p-4 text-muted-foreground font-medium w-32">Dimension</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Automation</th>
                  <th className="text-center p-4 text-blue-400 font-medium">AI Assistants</th>
                  <th className="text-center p-4 text-green-400 font-semibold">Autonomous Agentic</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/70 hover:bg-slate-900/20 transition-colors" data-testid={`row-comparison-${i}`}>
                    <td className="p-4 font-medium text-slate-300 text-xs">{row.dim}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.auto}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.assist}</td>
                    <td className="p-4 text-center text-green-300 text-xs font-medium leading-relaxed">{row.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="border-green-500/20 bg-green-500/5 mt-6">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Quote className="w-4 h-4 text-green-400 shrink-0 mt-1" />
              <p className="text-sm italic" data-testid="text-comparison-quote">Automation executes instructions. Assistants help humans. Agentic systems own outcomes.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function AutonomyMaturityModel() {
  const [activeLevel, setActiveLevel] = useState(0);
  const levels = [
    {
      code: "L1", title: "Assistive Autonomy", subtitle: "AI assists. Human decides and acts.",
      icon: Eye, color: "from-blue-600 to-blue-700", textColor: "text-blue-400", bgActive: "bg-blue-500/10 border-blue-500",
      desc: "The AI monitors, surfaces information, generates suggestions, and handles data processing — but every decision and action is taken by a human. The AI is a tool in the human's hands.",
      looks: ["AI-powered dashboards that surface anomalies and trends", "Recommendation systems that suggest but don't execute", "Copilots that draft content for human review", "Search assistants that retrieve relevant information"],
      humanRole: "Decides, acts, and is accountable for outcomes.",
      governance: "Low. AI output is advisory only. Humans own every action.",
      when: "New AI deployments. Unfamiliar domains. High-stakes decisions where human judgment is irreplaceable. Organizations beginning their autonomy journey.",
    },
    {
      code: "L2", title: "Semi-Autonomous", subtitle: "AI decides within limits. Human approves exceptions.",
      icon: Zap, color: "from-purple-500 to-purple-600", textColor: "text-purple-400", bgActive: "bg-purple-500/10 border-purple-500",
      desc: "The AI handles routine decisions and executes actions within pre-approved parameters. When it encounters situations outside its boundaries or above its confidence threshold, it escalates to a human.",
      looks: ["Customer support agent resolves Tier-1 issues autonomously, escalates Tier-2+", "Fraud detection blocks obvious fraud automatically, routes borderline cases to review", "Scheduling agent books appointments independently, asks human for conflicts", "Content generation within brand guidelines, human approves publication"],
      humanRole: "Approves exceptions. Monitors performance. Sets boundaries.",
      governance: "Medium. Clear boundary definitions. Escalation rules. Audit trails on every autonomous action. Confidence thresholds.",
      when: "Well-understood processes with clear rules. Moderate-stakes operations where speed matters. Organizations with some AI governance experience.",
      quote: "L2 is where most enterprise agentic deployments should start in 2026. It delivers 80% of the value with 20% of the risk.",
    },
    {
      code: "L3", title: "Autonomous", subtitle: "AI owns the process. Human monitors.",
      icon: Bot, color: "from-amber-500 to-amber-600", textColor: "text-amber-400", bgActive: "bg-amber-500/10 border-amber-500",
      desc: "The AI operates its domain end-to-end. It plans, executes, monitors results, and self-corrects — all without human approval on individual actions.",
      looks: ["Multi-agent revenue ops system that qualifies leads, books meetings, triggers onboarding — end to end", "Supply chain optimization adjusting procurement, allocation, and distribution continuously", "IT operations detecting incidents, diagnosing, executing remediation, and verifying resolution", "Content moderation at millions of items with human review on edge cases only"],
      humanRole: "Sets objectives. Defines governance. Reviews performance. Handles genuine exceptions.",
      governance: "High. Bounded autonomy. Kill switches. Progressive trust. Complete audit trails. Rollback capability. Regular reviews.",
      when: "High-volume, cross-system processes. Operations requiring 24/7 execution. Domains where human coordination cost exceeds occasional AI error. Organizations with mature AI governance.",
    },
    {
      code: "L4", title: "Self-Directing", subtitle: "AI sets sub-goals. Human sets objectives only.",
      icon: Brain, color: "from-green-500 to-green-600", textColor: "text-green-400", bgActive: "bg-green-500/10 border-green-500",
      desc: "The AI doesn't just execute within its domain — it identifies new sub-goals, adjusts its own strategy based on changing conditions, and coordinates across multiple domains.",
      looks: ["Business ops system managing customer acquisition, retention, and expansion simultaneously", "Supply chain intelligence coordinating procurement, manufacturing, logistics, and demand as one integrated optimization", "R&D system formulating hypotheses, designing experiments, analyzing results, and refining approach iteratively"],
      humanRole: "Sets objectives and constraints. Monitors at the strategic level. Intervenes on ethical, legal, or existential questions only.",
      governance: "Very high. Comprehensive explainability. Multi-layer safety controls. Continuous monitoring. Ethics review for novel situations. The governance cost at L4 is a feature — it's what makes the autonomy safe.",
      when: "2028–2030. For organizations that have proven L3 reliability over sustained periods.",
      quote: "L4 is the horizon, not the starting point. True L4 requires years of L2→L3 trust-building.",
    },
  ];
  const active = levels[activeLevel];
  const ActiveIcon = active.icon;
  return (
    <section id="autonomy-model" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-model">
            <Layers className="w-3 h-3 mr-1" />The AGIX Original Framework — The 2028 Crown Jewel
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-model">The AGIX Autonomy Maturity Model: L1 → L4</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Four levels of AI autonomy — designed to become the industry-standard framework for evaluating AI autonomy. Think of it as the equivalent of SAE J3016 autonomous driving levels (L1→L5) but for business AI.</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-2">
            {levels.map((lv, i) => {
              const Icon = lv.icon;
              const isActive = activeLevel === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <button onClick={() => setActiveLevel(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${isActive ? `${lv.bgActive} shadow-lg` : "border-slate-700 hover:border-slate-600 bg-slate-900/30"}`} data-testid={`button-model-${i}`} aria-pressed={isActive}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lv.color} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium mb-0.5 ${isActive ? lv.textColor : "text-muted-foreground"}`}>{lv.code}</p>
                        <p className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-300"}`}>{lv.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{lv.subtitle}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
            <Card className="border-green-500/20 bg-green-500/5 mt-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-xs italic text-muted-foreground leading-relaxed">Most organizations are at L1 or L2. Those at L3–L4 don't just operate more efficiently — they operate in fundamentally different ways than their competitors.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div key={activeLevel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <Card className="border-slate-700" data-testid="card-model-details">
                  <CardContent className="p-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center shadow-lg`}>
                        <ActiveIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${active.textColor}`}>{active.code}</p>
                        <h3 className="text-xl font-bold" data-testid="text-model-title">{active.title}</h3>
                        <p className="text-sm text-muted-foreground">{active.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{active.desc}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What this looks like</p>
                      {active.looks.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm" data-testid={`text-model-item-${j}`}>
                          <CheckCircle2 className={`w-4 h-4 ${active.textColor} shrink-0 mt-0.5`} />
                          <span className="text-slate-300 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 space-y-2 border border-slate-700">
                      <div>
                        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Human role</p>
                        <p className="text-sm text-muted-foreground">{active.humanRole}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Governance requirement</p>
                        <p className="text-sm text-muted-foreground">{active.governance}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">When this is right</p>
                        <p className="text-sm text-muted-foreground">{active.when}</p>
                      </div>
                      {active.quote && (
                        <div className="pt-2 border-t border-slate-700/50">
                          <p className={`text-xs italic ${active.textColor}`}>"{active.quote}"</p>
                        </div>
                      )}
                    </div>
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

function MaturityAssessment() {
  const [open, setOpen] = useState<number | null>(null);
  const rows = [
    { level: "Pre-L1", signal: '"We\'re thinking about using AI agents"', missing: "Everything — start with an assessment", color: "text-slate-400", border: "border-slate-500/30" },
    { level: "L1: Assistive", signal: '"AI helps our team but doesn\'t act on its own"', missing: "Decision delegation, autonomous execution", color: "text-blue-400", border: "border-blue-500/30" },
    { level: "L2: Semi-Autonomous", signal: '"AI handles routine tasks but escalates anything complex"', missing: "End-to-end ownership, cross-system coordination", color: "text-purple-400", border: "border-purple-500/30" },
    { level: "L3: Autonomous", signal: '"AI runs this process end-to-end — we monitor and intervene on exceptions"', missing: "Cross-domain optimization, self-directed strategy", color: "text-amber-400", border: "border-amber-500/30" },
    { level: "L4: Self-Directing", signal: '"AI manages entire operational domains — we set objectives and review strategy"', missing: "You've arrived — now optimize and govern", color: "text-green-400", border: "border-green-500/30" },
  ];
  return (
    <section className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-maturity">
            <Target className="w-3 h-3 mr-1" />Autonomy Maturity Assessment
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-maturity">Where Is Your Organization Today?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The distance between your current level and where you need to be defines your agentic AI investment — and your governance requirement.</p>
        </motion.div>
        <div className="space-y-3">
          {rows.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <button onClick={() => setOpen(open === i ? null : i)} className={`w-full text-left rounded-xl border transition-all ${open === i ? `${r.border} bg-slate-900/40` : "border-slate-700 bg-slate-900/30 hover:border-slate-600"}`} data-testid={`button-maturity-${i}`} aria-expanded={open === i}>
                <div className="p-5 flex items-center justify-between gap-4">
                  <span className={`font-bold text-sm ${r.color}`}>{r.level}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <div className={`px-5 pb-5 space-y-3 rounded-b-xl border-x border-b ${r.border} bg-slate-900/30`}>
                      <div className="pt-2 border-t border-slate-700/50">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Typical signal</p>
                        <p className={`text-sm italic ${r.color}`}>{r.signal}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">What&apos;s missing</p>
                        <p className="text-sm text-muted-foreground">{r.missing}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetyFramework() {
  const principles = [
    { number: "1", title: "Bounded Autonomy", desc: "Every agent operates within explicitly defined action boundaries. The agent cannot take actions outside its scope — even if it 'reasons' that it should. Boundaries are set by humans, not learned by the agent.", color: "text-blue-400", border: "border-blue-500/20" },
    { number: "2", title: "Progressive Trust", desc: "Agents don't start autonomous — they earn autonomy through demonstrated reliability. Deployment follows a progression: assistive → supervised → monitored → autonomous. Each stage requires proven performance before advancing.", color: "text-purple-400", border: "border-purple-500/20" },
    { number: "3", title: "Confidence-Gated Escalation", desc: "When an agent's confidence drops below a defined threshold, it does not guess — it escalates to a human or to a higher-authority agent. The threshold is set per action type and adjusted based on outcome data.", color: "text-amber-400", border: "border-amber-500/20" },
    { number: "4", title: "Full Audit Traceability", desc: "Every decision, every action, every escalation is logged with the reasoning, the data inputs, the confidence score, and the outcome. This is non-negotiable at every autonomy level.", color: "text-orange-400", border: "border-orange-500/20" },
    { number: "5", title: "Kill Switch Architecture", desc: "Every agent can be immediately stopped, rolled back, or overridden — at any time, by any authorized human. There is no level of autonomy where the kill switch is removed.", color: "text-red-400", border: "border-red-500/20" },
  ];
  return (
    <section id="safety-framework" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-red-500/30 text-red-400 mb-4" data-testid="badge-safety">
            <Shield className="w-3 h-3 mr-1" />The AGIX Original Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-safety">The AGIX Autonomy Safety Framework</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Five safety principles that apply at every autonomy level, with increasing rigor as autonomy increases. These are non-negotiable.</p>
        </motion.div>
        <div className="space-y-4">
          {principles.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`border ${p.border} hover-elevate`} data-testid={`card-safety-${i}`}>
                <CardContent className="p-5 flex gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 ${p.border} flex items-center justify-center shrink-0 font-bold text-sm ${p.color}`}>{p.number}</div>
                  <div>
                    <h3 className={`font-bold ${p.color} mb-1`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-safety-quote">
                The organizations that succeed with agentic AI won't be the ones with the most autonomous agents. They'll be the ones with the most trustworthy, governed, and auditable autonomous agents. Governance is not the cost of autonomy. Governance is what makes autonomy possible.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function WhyProjectsFail() {
  const causes = [
    { n: "1", title: "Escalating costs without clear ROI.", body: "Agents consume LLM tokens, API calls, and compute continuously. Without cost controls, a well-intentioned agent system becomes an uncontrolled expense.", color: "text-red-400" },
    { n: "2", title: "Unclear business value.", body: '"We\'ll deploy an AI agent" is not a business case. Without defined outcomes and measurable success criteria, projects lose executive support.', color: "text-orange-400" },
    { n: "3", title: "Inadequate risk controls.", body: "Agents making unintended decisions, accessing systems they shouldn't, or optimizing for the wrong outcomes. Only 21% of companies have a mature governance model (Deloitte).", color: "text-amber-400" },
    { n: "4", title: "Architecture debt.", body: "Starting with demos and prototypes that can't scale. Fragile single-agent systems that break under real-world complexity. No orchestration, no state management, no error recovery.", color: "text-yellow-400" },
    { n: "5", title: 'The "agent-washing" problem.', body: 'Only ~130 of thousands of agentic AI vendors are "real" (Gartner). Many vendors relabel existing chatbots or workflow tools as "agents." The result: buyer disappointment and lost credibility.', color: "text-purple-400" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-red-500/30 text-red-400 mb-4" data-testid="badge-fail">
            <AlertTriangle className="w-3 h-3 mr-1" />Project Risk
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-fail">Why 40% of Agentic AI Projects Fail</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Gartner predicts 40%+ of agentic AI projects will be canceled by 2027. The primary causes — and why architecture prevents them.</p>
        </motion.div>
        <div className="space-y-3">
          {causes.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-fail-${i}`}>
                <CardContent className="p-5 flex gap-4">
                  <div className={`text-xl font-black opacity-50 ${c.color} shrink-0 w-6`}>{c.n}.</div>
                  <div>
                    <h3 className={`font-bold text-sm ${c.color} mb-1`}>{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Quote className="w-4 h-4 text-green-400 shrink-0 mt-1" />
              <p className="text-sm italic" data-testid="text-fail-quote">The 40% failure rate is not a technology problem. It is an architecture, governance, and business alignment problem. The organizations that succeed start with clear goals, build governance first, deploy at L2 before attempting L3, and measure outcomes — not agent count.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function IndustryApplications() {
  const industries = [
    { icon: HeartPulse, name: "Healthcare", app: "Patient flow coordination, scheduling, documentation", level: "L1–L2", why: "Patient safety requires human oversight; governance is non-negotiable", color: "text-red-400", border: "border-red-500/20" },
    { icon: Landmark, name: "Financial Services", app: "Fraud detection, compliance, lending decisions", level: "L2–L3", why: "High-frequency decisions with clear rules; regulatory audit required", color: "text-blue-400", border: "border-blue-500/20" },
    { icon: ShoppingBag, name: "Retail / E-Commerce", app: "Order management, inventory, customer service", level: "L2–L3", why: "High volume, reversible actions, clear success metrics", color: "text-purple-400", border: "border-purple-500/20" },
    { icon: Brain, name: "SaaS", app: "Onboarding, support, retention, renewal", level: "L2–L3", why: "Customer lifecycle is well-defined and measurable", color: "text-amber-400", border: "border-amber-500/20" },
    { icon: Truck, name: "Supply Chain", app: "Procurement, allocation, routing, demand response", level: "L3 (→ L4 by 2028)", why: "Cross-system coordination is the bottleneck; real-time execution required", color: "text-green-400", border: "border-green-500/20" },
    { icon: Building2, name: "Enterprise Operations", app: "IT ops, HR, finance workflows", level: "L2", why: "Internal processes with clear governance structures", color: "text-teal-400", border: "border-teal-500/20" },
    { icon: Globe, name: "Government", app: "Eligibility processing, resource allocation, citizen services", level: "L2", why: "Public trust and transparency are paramount", color: "text-orange-400", border: "border-orange-500/20" },
    { icon: Umbrella, name: "Insurance", app: "Claims processing, underwriting, fraud detection", level: "L2–L3", why: "High volume with clear decision boundaries; audit trail required", color: "text-cyan-400", border: "border-cyan-500/20" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 mb-4" data-testid="badge-industries">
            <Globe className="w-3 h-3 mr-1" />Industry Applications
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">How Autonomy Applies Across Industries</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">80% of governments will deploy AI agents for routine decision-making by 2028 (Gartner). 60% of brands will use agentic AI for one-to-one interactions by 2028 (Gartner).</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Card className={`h-full border ${ind.border} hover-elevate`} data-testid={`card-industry-${i}`}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${ind.color}`} />
                      <h3 className={`font-bold text-xs ${ind.color}`}>{ind.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ind.app}</p>
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-xs"><span className={`font-semibold ${ind.color}`}>Start at: </span><span className="text-slate-300">{ind.level}</span></p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">{ind.why}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImplementationBridge() {
  const bridges = [
    { level: "L1: Assistive", service: "AI Automation + AI Predictive Analytics", href: "/services/ai-automation/", builds: "Dashboards, recommendations, copilots", color: "text-blue-400" },
    { level: "L2: Semi-Autonomous", service: "Agentic AI Systems + Conversational AI", href: "/services/agentic-ai-systems/", builds: "Agents with boundary rules, escalation logic, human approval gates", color: "text-purple-400" },
    { level: "L3: Autonomous", service: "Agentic AI Systems", href: "/services/agentic-ai-systems/", builds: "Multi-agent systems, end-to-end process ownership, self-recovery", color: "text-amber-400" },
    { level: "L4: Self-Directing", service: "Agentic AI + Custom AI Product Development", href: "/services/custom-ai-product-development/", builds: "Cross-domain AI platforms with strategic optimization", color: "text-green-400" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-bridge">
            <ArrowRight className="w-3 h-3 mr-1" />Framework → Implementation
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-bridge">How the Autonomy Model Connects to Implementation</h2>
        </motion.div>
        <div className="space-y-3">
          {bridges.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-bridge-${i}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`text-sm font-semibold ${b.color} sm:w-40 shrink-0`}>{b.level}</div>
                    <div className="hidden sm:block text-muted-foreground/50">→</div>
                    <div className="flex-1 min-w-0">
                      <Link href={b.href} className="font-bold text-sm text-white hover:text-green-400 transition-colors hover:underline underline-offset-2" data-testid={`link-service-${i}`}>{b.service}</Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.builds}</p>
                    </div>
                    <Link href={b.href} data-testid={`link-bridge-arrow-${i}`}><ChevronRight className="w-5 h-5 text-muted-foreground hover:text-green-400 transition-colors" /></Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-bridge-quote">The Autonomy Maturity Model tells you WHERE on the autonomy spectrum your operations should be. AGIX builds the systems that take you there — safely, governably, and measurably.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function FutureTrajectory() {
  const points = [
    { year: "2026", title: "The Year of L2 (Semi-Autonomous) at Scale.", body: "40% of enterprise apps embed agents by end of 2026 (Gartner). Most will be L2: agents handling routine decisions with human oversight. This is the year the enterprise learns to trust bounded autonomy.", color: "text-blue-400" },
    { year: "2027", title: "Governance becomes a market category.", body: "Gartner's 2026 Hype Cycle for Agentic AI places governance, security, and FinOps alongside core agentic technologies. By 2027, 'agentic AI governance' will be its own procurement category.", color: "text-purple-400" },
    { year: "2028", title: "L3 becomes mainstream for operational processes.", body: "33% of enterprise software includes agentic AI by 2028, with 15% of work decisions made autonomously (Gartner). Supply chain, customer operations, and IT ops will be the first L3 standard domains.", color: "text-amber-400" },
    { year: "2029–30", title: "L4 emerges for cross-domain operations.", body: "By 2029, 50% of knowledge workers will have skills to work with and govern AI agents. L4 becomes achievable — for organizations that built the L2→L3 foundation.", color: "text-orange-400" },
    { year: "2035", title: "Agentic AI becomes the default enterprise architecture.", body: "Gartner's best-case scenario: agentic AI drives ~30% of enterprise application software revenue by 2035, surpassing $450 billion. Not a niche. The operating system of the enterprise.", color: "text-green-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-future">
            <RefreshCcw className="w-3 h-3 mr-1" />2026–2035 Trajectory
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-future">Where Autonomous Agentic Systems Are Heading</h2>
        </motion.div>
        <div className="space-y-4">
          {points.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-future-${i}`}>
                <CardContent className="p-5 flex gap-5">
                  <div className={`text-xs font-black ${p.color} shrink-0 w-14 pt-0.5 text-right`}>{p.year}</div>
                  <div>
                    <h3 className={`font-bold ${p.color} mb-1`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-future-quote">The autonomy timeline is not "deploy L4 tomorrow." It is a deliberate progression: L1 to build understanding. L2 to build trust. L3 to build capacity. L4 to build advantage. The organizations that skip levels are the 40% that fail. The organizations that earn each level are the ones that define the next era.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-700">
          <CardContent className="p-6 flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-green-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Santosh Singh</h3>
                <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">Author</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Founder &amp; CEO, AGIX Technologies</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Santosh developed the Autonomy Maturity Model (L1→L4) and the Autonomy Safety Framework as practitioner frameworks for helping organizations navigate the transition from AI-assisted operations to autonomous business systems. AGIX engineers the agentic architectures — multi-agent systems, orchestration layers, safety controls, and progressive autonomy deployments — that move businesses from L1 to L3 today and toward L4 by 2028.</p>
              <Link href="/author/santosh/" className="text-xs text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1 mt-1" data-testid="link-author-bio">
                Read full bio <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function AutonomousAgenticAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <DefinitionBlock />
        <MarketContextSection />
        <ComparisonTable />
        <AutonomyMaturityModel />
        <MaturityAssessment />
        <SafetyFramework />
        <WhyProjectsFail />
        <IndustryApplications />
        <ImplementationBridge />
        <FutureTrajectory />
        <FAQSection faqs={documentFAQs['autonomous-agentic-ai']} title="Autonomous Agentic Systems: Questions Answered" />
        <section id="cta-form" className="py-10 lg:py-14 bg-gradient-to-br from-primary/10 via-background to-green-500/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CtaForm headline="Ready to Build Your Autonomy Foundation?" subheadline="Tell us where you are on the Autonomy Maturity Model. We'll design the architecture that gets you to L2 safely — and builds the foundation for L3 by 2027." />
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}
