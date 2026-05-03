'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
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
  Shield,
  Clock,
  TrendingUp,
  AlertTriangle,
  Target,
  Layers,
  BarChart3,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  Sparkles,
  CircleDot,
  CheckCheck,
  Activity,
  Bot,
  LineChart,
  RefreshCcw,
  Building2,
  Truck,
  ShoppingBag,
  HeartPulse,
  Landmark,
  Factory,
  Umbrella,
  Globe,
  Quote,
  User,
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

function OperationalDashboardVisual() {
  const metrics = [
    { label: "System Uptime", value: "99.97%", delta: "+0.02%", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30", bar: 99.97, barColor: "bg-green-500" },
    { label: "Anomalies Blocked", value: "1,284", delta: "last 24h", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30", bar: 74, barColor: "bg-orange-500" },
    { label: "Decisions / Minute", value: "3,421", delta: "↑ 18% vs yesterday", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", bar: 85, barColor: "bg-blue-500" },
    { label: "Avg Response Time", value: "48ms", delta: "↓ 12ms from baseline", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", bar: 92, barColor: "bg-purple-500" },
  ];

  return (
    <div className="w-full max-w-[420px] mx-auto space-y-2">
      {/* Dashboard header */}
      <div className="flex items-center justify-between bg-slate-800/60 border border-slate-700/50 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-white">Operational Intelligence Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span className="text-[10px] text-green-400 font-semibold">LIVE</span>
        </div>
      </div>

      {/* Metric cards */}
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          className={`rounded-xl border px-4 py-3 ${m.bg}`}
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{m.label}</span>
            <span className={`text-xl font-black ${m.color}`}>{m.value}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${m.barColor} rounded-full`}
                animate={{ width: [`${m.bar - 8}%`, `${m.bar}%`, `${m.bar - 4}%`] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{m.delta}</span>
          </div>
        </motion.div>
      ))}

      {/* Alert row */}
      <motion.div
        className="flex items-center gap-2 bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-2.5"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div className="w-2 h-2 rounded-full bg-orange-400" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <span className="text-[10px] text-muted-foreground">AI predicted demand surge in Warehouse 4 — <span className="text-orange-400 font-semibold">pre-staging initiated</span></span>
      </motion.div>

      {/* 4-layer tag strip */}
      <div className="flex items-center gap-2 flex-wrap">
        {[["Observe", "text-blue-400 bg-blue-500/10 border-blue-500/20"], ["Understand", "text-purple-400 bg-purple-500/10 border-purple-500/20"], ["Predict", "text-amber-400 bg-amber-500/10 border-amber-500/20"], ["Act", "text-green-400 bg-green-500/10 border-green-500/20"]].map(([l, c]) => (
          <span key={l} className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${c}`}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-24 lg:pt-32 pb-16 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">

          {/* LEFT: Text */}
          <div className="space-y-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-xs text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/" className="hover:text-white transition-colors" itemProp="item"><span itemProp="name">Home</span></Link>
                  <meta itemProp="position" content="1" />
                </li>
                <ChevronRight className="w-3 h-3" />
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className="text-muted-foreground" itemProp="name">Intelligence</span>
                  <meta itemProp="position" content="2" />
                </li>
                <ChevronRight className="w-3 h-3" />
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className="text-orange-400" itemProp="name">Operational Intelligence</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 px-4 py-1.5" data-testid="badge-intelligence-category">
              <Workflow className="w-4 h-4 mr-2" />
              Intelligence Framework
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight" data-testid="text-hero-headline">
              Operational Intelligence:{" "}
              <span className="text-orange-400">When Your Business Operations Learn to Think</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl" data-testid="text-hero-subheadline">
              The ability to continuously{" "}
              <span className="text-blue-400 font-semibold">observe</span>,{" "}
              <span className="text-purple-400 font-semibold">understand</span>,{" "}
              <span className="text-amber-400 font-semibold">predict</span>, and{" "}
              <span className="text-green-400 font-semibold">act</span>{" "}
              on operational data in real time — before problems escalate.
            </p>
            <p suppressHydrationWarning className="text-sm text-muted-foreground/60 italic">
              By <Link href="/author/santosh/" className="text-orange-400/80 hover:text-orange-400 transition-colors">Santosh Singh</Link>, Founder &amp; CEO, AGIX Technologies · {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
            </p>
            <div className="flex flex-wrap gap-3">
              {[["4 Layers", "observe → understand → predict → act"], ["3,400+", "decisions per minute"], ["48ms", "real-time response latency"]].map(([v, l]) => (
                <div key={v} className="flex items-center gap-2 rounded-full bg-slate-800/60 border border-slate-700/50 px-3 py-1.5">
                  <span className="text-sm font-bold text-orange-400">{v}</span>
                  <span className="text-xs text-muted-foreground">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 h-12 px-7" onClick={() => scrollToSection("agix-intelligence-stack")} data-testid="button-hero-cta-primary">
                Explore the 4-Layer Stack <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-7" onClick={() => scrollToSection("maturity-assessment")} data-testid="button-hero-cta-secondary">
                Assess Your Maturity <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* RIGHT: Live Dashboard Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <OperationalDashboardVisual />
          </div>

        </div>
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
          <span className="text-teal-400">SaaS</span>.
        </p>
      </div>
    </section>
  );
}

function DefinitionBlock() {
  return (
    <section id="definition" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-definition">
            <Eye className="w-3 h-3 mr-1" />
            Definition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-definition">
            What Is Operational Intelligence?
          </h2>

          <div
            className="bg-slate-900/60 border border-blue-500/20 rounded-xl p-6 md:p-8 mb-8"
            itemScope
            itemType="https://schema.org/Question"
          >
            <meta itemProp="name" content="What is operational intelligence?" />
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-lg md:text-xl leading-relaxed" itemProp="text" data-testid="text-definition-primary">
                <strong>Operational Intelligence</strong> is the ability of an organization to continuously{" "}
                <span className="text-blue-400">observe</span>,{" "}
                <span className="text-purple-400">understand</span>,{" "}
                <span className="text-amber-400">predict</span>, and{" "}
                <span className="text-green-400">act</span>{" "}
                on operational data in real time — enabling businesses to detect issues before they escalate,
                anticipate demand before it shifts, and coordinate responses before humans even recognize a problem exists.
                It is the evolution of business operations from reactive (responding to what happened) to autonomous
                (systems that manage themselves).
              </p>
            </div>
          </div>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
                <p className="text-base italic" data-testid="text-original-quote-1">
                  Operational Intelligence is not a tool you install. It is a capability your business develops —
                  layer by layer, from visibility to autonomy.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function WhyNowSection() {
  const forces = [
    {
      number: "01",
      title: "Operations don't fail — they drift.",
      body: "Slight delays become routine. Teams constantly firefight. Decisions happen late. Escalations arrive after customer impact. Growth creates confusion. By the time a dashboard shows the problem, the cost is already incurred.",
      color: "text-red-400",
      borderColor: "border-red-500/20",
    },
    {
      number: "02",
      title: "The data flood exceeds human processing capacity.",
      body: "Modern businesses generate more operational signals — from CRMs, ERPs, ticketing systems, communications, logs, and IoT devices — than any team can monitor, interpret, and act on in time.",
      color: "text-amber-400",
      borderColor: "border-amber-500/20",
    },
    {
      number: "03",
      title: "Automation alone does not solve the problem.",
      body: "Automating inefficient processes scales the wrong decisions. Automation executes. Operational Intelligence decides WHAT to execute, WHEN, and WHY.",
      color: "text-orange-400",
      borderColor: "border-orange-500/20",
    },
  ];

  const stats = [
    {
      value: "$18.21B",
      label: "AIOps market in 2025",
      sub: "→ $49.49B by 2032, 15.34% CAGR",
      source: "360iResearch",
      color: "text-blue-400",
    },
    {
      value: "90%",
      label: "of CIOs will deploy AIOps by 2026",
      sub: "for automated remediation & workload placement",
      source: "IDC",
      color: "text-purple-400",
    },
    {
      value: "$2M",
      label: "cost per hour of downtime",
      sub: "in lost transactions and compliance penalties",
      source: "Mordor Intelligence",
      color: "text-red-400",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-why-now">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Why Operational Intelligence Matters Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-now">
            Three Forces Making It Necessary
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These converging pressures make Operational Intelligence not just valuable — but necessary.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {forces.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <Card className={`h-full border ${f.borderColor} bg-slate-900/40`} data-testid={`card-force-${i}`}>
                <CardContent className="p-6 space-y-3">
                  <div className={`text-4xl font-black opacity-30 ${f.color}`}>{f.number}</div>
                  <h3 className={`font-bold text-base ${f.color}`}>{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center border-slate-700 bg-slate-900/50" data-testid={`card-stat-${i}`}>
                <CardContent className="p-6 space-y-1">
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <p className="font-semibold text-sm">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                  <p className="text-xs text-muted-foreground/50 italic mt-2">Source: {s.source}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-gap-quote">
                The gap between generating data and acting on it intelligently is where operational value is lost — or captured.
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
    {
      aspect: "Core question",
      automation: '"What should be repeated?"',
      analytics: '"What happened?"',
      intelligence: '"What is happening NOW and what should we do?"',
    },
    {
      aspect: "Input",
      automation: "Rules and triggers",
      analytics: "Historical data",
      intelligence: "Real-time signals + context + history",
    },
    {
      aspect: "Output",
      automation: "Executed tasks",
      analytics: "Reports and dashboards",
      intelligence: "Decisions, predictions, and coordinated actions",
    },
    {
      aspect: "Adaptability",
      automation: "Breaks on exceptions",
      analytics: "Requires human interpretation",
      intelligence: "Interprets context, adapts to change",
    },
    {
      aspect: "Learning",
      automation: "Static unless reprogrammed",
      analytics: "Pattern recognition on past data",
      intelligence: "Continuous learning from outcomes",
    },
    {
      aspect: "Decision-making",
      automation: "Follows fixed rules",
      analytics: "Provides data for humans to decide",
      intelligence: "Recommends, triggers, or autonomously acts",
    },
    {
      aspect: "Failure mode",
      automation: "Stops or escalates",
      analytics: "Delayed insight",
      intelligence: "Degrades gracefully, escalates to humans",
    },
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three distinct capabilities. Only one drives real-time operational decisions.
          </p>
        </motion.div>

        <Card className="overflow-hidden border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/70">
                  <th className="text-left p-4 text-muted-foreground font-medium w-32">Dimension</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Automation</th>
                  <th className="text-center p-4 text-purple-400 font-medium">Analytics / BI</th>
                  <th className="text-center p-4 text-orange-400 font-semibold">Operational Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/70 hover:bg-slate-900/20 transition-colors" data-testid={`row-comparison-${i}`}>
                    <td className="p-4 font-medium text-slate-300">{row.aspect}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.automation}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.analytics}</td>
                    <td className="p-4 text-center text-orange-300 text-xs font-medium leading-relaxed">{row.intelligence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { label: "Automation answers", value: '"HOW do we execute?"', color: "text-slate-400" },
            { label: "Analytics answers", value: '"WHAT happened?"', color: "text-purple-400" },
            { label: "Operational Intelligence answers", value: '"WHAT IS happening, WHY, and WHAT SHOULD WE DO — right now?"', color: "text-orange-400" },
          ].map((item, i) => (
            <Card key={i} className="border-slate-700 text-center">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AGIXIntelligenceStack() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      number: "01",
      label: "Layer 1",
      title: "Visibility",
      subtitle: "Know What Is Happening",
      icon: Eye,
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500",
      bgActive: "bg-blue-500/10 border-blue-500",
      textColor: "text-blue-400",
      description:
        "The foundation. Your organization can see operational activity in real time — not in yesterday's report. Unified view across all your business systems.",
      whatItLooks: [
        "Real-time dashboards showing current operational state",
        "Unified view across CRM, ERP, ticketing, and communications",
        "Alert configuration for threshold breaches",
        "Basic monitoring of KPIs and SLAs",
      ],
      solves: "Eliminates blind spots. Reduces 'I didn't know that was happening' to zero.",
      limitation: "Visibility without understanding is just surveillance. You see the data but still need humans to interpret it.",
    },
    {
      number: "02",
      label: "Layer 2",
      title: "Understanding",
      subtitle: "Know Why It Is Happening",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-500",
      bgActive: "bg-purple-500/10 border-purple-500",
      textColor: "text-purple-400",
      description:
        "The context layer. Your systems don't just show you data — they explain patterns, correlate signals, and surface root causes before humans need to investigate.",
      whatItLooks: [
        "Anomaly detection that distinguishes signal from noise",
        "Root-cause analysis connecting events to upstream causes",
        "Cross-system correlation: support spike traced to failed deployment",
        "Context-aware alerts that explain WHY a threshold was breached",
      ],
      solves: "Eliminates the interpretation gap. Humans no longer spend hours asking 'why did this happen?'",
      limitation: "Understanding the past and present without predicting the future still leaves you reactive — just faster at reacting.",
      stat: "ML baselines shorten mean time to resolution by up to 60% (Mordor Intelligence). 87% of organizations report AIOps tools delivered value (OpsRamp).",
    },
    {
      number: "03",
      label: "Layer 3",
      title: "Prediction",
      subtitle: "Know What Will Happen",
      icon: LineChart,
      color: "from-amber-500 to-amber-600",
      borderColor: "border-amber-500",
      bgActive: "bg-amber-500/10 border-amber-500",
      textColor: "text-amber-400",
      description:
        "The foresight layer. Your systems anticipate problems, demand shifts, and capacity needs before they materialize — giving you days or weeks, not minutes.",
      whatItLooks: [
        "Predictive models forecasting demand, load, and failure probability",
        "Early-warning systems flagging risks days before impact",
        "Capacity planning that adjusts based on predicted demand",
        "Churn prediction, SLA breach prediction, bottleneck forecasting",
      ],
      solves: "Transforms operations from reactive to proactive. Issues are prevented, not managed.",
      limitation: "Predictions without action are unused forecasts. The system knows what will happen but cannot act on it.",
      stat: "AI-powered predictive maintenance: 50% downtime reduction, 25% cost savings (Persistence Market Research). AI-powered monitoring adoption rose from 42% to 54% in one year (Mordor Intelligence).",
    },
    {
      number: "04",
      label: "Layer 4",
      title: "Autonomy",
      subtitle: "The System Acts on What It Knows",
      icon: Bot,
      color: "from-green-500 to-green-600",
      borderColor: "border-green-500",
      bgActive: "bg-green-500/10 border-green-500",
      textColor: "text-green-400",
      description:
        "The self-operating layer. Your systems don't just predict problems — they prevent them, resolve them, and optimize operations continuously with governed autonomy.",
      whatItLooks: [
        "Auto-scaling resources in anticipation of demand spikes",
        "Auto-routing issues to the right team based on predicted complexity",
        "Auto-triggering remediation when anomalies are detected",
        "Self-healing systems: detect, diagnose, resolve — without humans",
      ],
      solves: "Eliminates the coordination overhead that scales linearly with business growth. Operations run themselves.",
      limitation: "Governance is non-negotiable at this layer: human-in-the-loop oversight, kill switches, audit trails, confidence thresholds, and progressive autonomy.",
    },
  ];

  const active = layers[activeLayer];
  const ActiveIcon = active.icon;

  return (
    <section id="agix-intelligence-stack" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-4" data-testid="badge-stack">
            <Layers className="w-3 h-3 mr-1" />
            The AGIX Original Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-stack">
            The AGIX Operational Intelligence Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A four-layer capability framework. Each layer builds on the one below it.
            Most organizations operate at Layer 1 or 2. Competitive advantage lives at Layer 3 and 4.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-2">
            {layers.map((layer, i) => {
              const Icon = layer.icon;
              const isActive = activeLayer === i;
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
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isActive
                        ? `${layer.bgActive} shadow-lg`
                        : "border-slate-700 hover:border-slate-600 bg-slate-900/30"
                    }`}
                    data-testid={`button-stack-layer-${i}`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium mb-0.5 ${isActive ? layer.textColor : "text-muted-foreground"}`}>
                          {layer.label}
                        </p>
                        <p className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-300"}`}>
                          {layer.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{layer.subtitle}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isActive ? "border-orange-400" : "border-slate-600"}`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-orange-400" />}
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}

            <Card className="border-orange-500/20 bg-orange-500/5 mt-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <p className="text-xs italic text-muted-foreground leading-relaxed">
                    Most organizations are at Layer 1 or 2. Those at Layer 3–4 don't just operate more efficiently — they operate in fundamentally different ways than their competitors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-slate-700" data-testid="card-stack-details">
                  <CardContent className="p-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center shadow-lg`}>
                        <ActiveIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${active.textColor}`}>{active.label}</p>
                        <h3 className="text-xl font-bold" data-testid="text-stack-title">{active.title}</h3>
                        <p className="text-sm text-muted-foreground">{active.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm" data-testid="text-stack-description">
                      {active.description}
                    </p>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What this looks like</p>
                      {active.whatItLooks.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm" data-testid={`text-stack-item-${j}`}>
                          <CheckCircle2 className={`w-4 h-4 ${active.textColor} shrink-0 mt-0.5`} />
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 space-y-3 border border-slate-700">
                      <div>
                        <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">What it solves</p>
                        <p className="text-sm text-muted-foreground">{active.solves}</p>
                      </div>
                      {active.stat && (
                        <div>
                          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Market evidence</p>
                          <p className="text-xs text-muted-foreground italic">{active.stat}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Limitation at this layer</p>
                        <p className="text-sm text-muted-foreground">{active.limitation}</p>
                      </div>
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
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const levels = [
    {
      level: 0,
      label: "Level 0",
      title: "Blind",
      desc: "No real-time operational visibility. Decisions based on anecdote and experience.",
      signal: '"We didn\'t know until the customer complained."',
      missing: "Everything",
      color: "text-red-400",
      borderColor: "border-red-500/30",
      bgColor: "bg-red-500/5",
    },
    {
      level: 1,
      label: "Level 1",
      title: "Visible",
      desc: "Dashboards exist but require human monitoring and interpretation.",
      signal: '"We have dashboards but nobody watches them consistently."',
      missing: "Understanding + prediction",
      color: "text-orange-400",
      borderColor: "border-orange-500/30",
      bgColor: "bg-orange-500/5",
    },
    {
      level: 2,
      label: "Level 2",
      title: "Understood",
      desc: "AI correlates signals and surfaces root causes. Alerts are contextual.",
      signal: '"We know WHY things break but still scramble to fix them."',
      missing: "Prediction + autonomous action",
      color: "text-amber-400",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-500/5",
    },
    {
      level: 3,
      label: "Level 3",
      title: "Predictive",
      desc: "AI forecasts operational risks and opportunities. Early warnings exist.",
      signal: '"We know what\'s GOING to break but still fix it manually."',
      missing: "Autonomous action",
      color: "text-blue-400",
      borderColor: "border-blue-500/30",
      bgColor: "bg-blue-500/5",
    },
    {
      level: 4,
      label: "Level 4",
      title: "Autonomous",
      desc: "Systems detect, predict, and resolve. Humans oversee, not operate.",
      signal: '"Our operations largely run themselves. We focus on strategy."',
      missing: "You've arrived — now optimize",
      color: "text-green-400",
      borderColor: "border-green-500/30",
      bgColor: "bg-green-500/5",
    },
  ];

  return (
    <section id="maturity-assessment" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-maturity">
            <Target className="w-3 h-3 mr-1" />
            Self-Assessment
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-maturity">
            Operational Intelligence Maturity Assessment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Where is your organization today? Tap each level to self-diagnose.
            The gap between where you are and where you need to be is your Operational Intelligence opportunity.
          </p>
        </motion.div>

        <div className="space-y-3">
          {levels.map((l, i) => {
            const isOpen = openLevel === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => setOpenLevel(isOpen ? null : i)}
                  className={`w-full text-left rounded-xl border transition-all ${isOpen ? `${l.borderColor} ${l.bgColor}` : "border-slate-700 bg-slate-900/30 hover:border-slate-600"}`}
                  data-testid={`button-maturity-${i}`}
                  aria-expanded={isOpen}
                >
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl border-2 ${l.borderColor} flex flex-col items-center justify-center shrink-0`}>
                        <span className={`text-xs font-bold ${l.color}`}>{l.label}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${l.color}`}>{l.title}</span>
                          {l.level === 4 && <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Target</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{l.desc}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 space-y-3 rounded-b-xl border-x border-b ${l.borderColor} ${l.bgColor}`}>
                        <div className="pt-2 border-t border-slate-700/50">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Typical signal</p>
                          <p className={`text-sm italic ${l.color}`}>{l.signal}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">What's missing</p>
                          <p className="text-sm text-muted-foreground">{l.missing}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-maturity-quote">
                Where is your organization today? The gap between where you are and where you need to be is your Operational Intelligence opportunity.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function IndustryApplications() {
  const industries = [
    {
      icon: HeartPulse,
      name: "Healthcare",
      application: "Patient flow prediction, resource allocation, clinical workflow optimization, equipment maintenance forecasting",
      impact: "Reduced wait times, improved patient outcomes, lower operational cost",
      color: "text-red-400",
      borderColor: "border-red-500/20",
    },
    {
      icon: Landmark,
      name: "Financial Services",
      application: "Transaction monitoring, fraud detection, regulatory compliance, risk prediction",
      impact: "Real-time risk visibility, automated compliance, reduced losses",
      color: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    {
      icon: ShoppingBag,
      name: "Retail & E-Commerce",
      application: "Demand forecasting, inventory optimization, supply chain visibility, customer experience monitoring",
      impact: "Reduced stockouts, improved margins, faster fulfillment",
      color: "text-purple-400",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Truck,
      name: "Logistics & Supply Chain",
      application: "Route optimization, shipment tracking, warehouse operations, predictive maintenance",
      impact: "Reduced delivery times, lower fleet costs, fewer disruptions",
      color: "text-green-400",
      borderColor: "border-green-500/20",
    },
    {
      icon: Activity,
      name: "SaaS & Technology",
      application: "Infrastructure monitoring, deployment health, customer usage analytics, incident management",
      impact: "Higher uptime, faster incident resolution, reduced churn",
      color: "text-orange-400",
      borderColor: "border-orange-500/20",
    },
    {
      icon: Factory,
      name: "Manufacturing",
      application: "Production line monitoring, quality prediction, equipment health, yield optimization",
      impact: "Higher throughput, lower defect rates, reduced downtime",
      color: "text-amber-400",
      borderColor: "border-amber-500/20",
    },
    {
      icon: Umbrella,
      name: "Insurance",
      application: "Claims pattern detection, fraud identification, underwriting risk monitoring",
      impact: "Faster claims, reduced fraud losses, better pricing",
      color: "text-teal-400",
      borderColor: "border-teal-500/20",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 mb-4" data-testid="badge-industries">
            <Globe className="w-3 h-3 mr-1" />
            Industry Applications
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">
            How Operational Intelligence Applies Across Industries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conceptual applications at the intelligence level — not case studies, but strategic patterns.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {industries.slice(0, 6).map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`h-full border ${ind.borderColor} hover-elevate`} data-testid={`card-industry-${i}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${ind.color}`} />
                      <h3 className={`font-bold ${ind.color}`}>{ind.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ind.application}</p>
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-muted-foreground/70"><span className="text-green-400 font-medium">Impact: </span>{ind.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className={`border ${industries[6].borderColor} hover-elevate`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Umbrella className={`w-6 h-6 ${industries[6].color}`} />
                </div>
                <div className="space-y-1">
                  <h3 className={`font-bold ${industries[6].color}`}>{industries[6].name}</h3>
                  <p className="text-sm text-muted-foreground">{industries[6].application}</p>
                  <p className="text-xs text-muted-foreground/70"><span className="text-green-400 font-medium">Impact: </span>{industries[6].impact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { stat: "$18.4B", desc: "Industrial OI solutions market in 2026 → $32.4B by 2033", source: "Persistence Market Research" },
            { stat: "75%", desc: "of tech decision-makers face moderate-to-high technical debt by 2026 — OI manages that complexity", source: "Forrester" },
          ].map((item, i) => (
            <Card key={i} className="border-slate-700 text-center">
              <CardContent className="p-5">
                <div className="text-2xl font-black text-blue-400 mb-1">{item.stat}</div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <p className="text-xs text-muted-foreground/50 italic mt-2">Source: {item.source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImplementationBridge() {
  const bridges = [
    {
      layer: "Layer 1: Visibility",
      service: "AI Automation Services",
      href: "/services/ai-automation/",
      builds: "Real-time monitoring, data pipelines, unified dashboards",
      layerColor: "text-blue-400",
      icon: Eye,
    },
    {
      layer: "Layer 2: Understanding",
      service: "RAG & Knowledge AI",
      href: "/services/rag-knowledge-ai/",
      builds: "Contextual search, root-cause analysis, knowledge retrieval",
      layerColor: "text-purple-400",
      icon: Brain,
    },
    {
      layer: "Layer 3: Prediction",
      service: "AI Predictive Analytics",
      href: "/services/ai-predictive-analytics/",
      builds: "Forecasting models, risk scoring, demand prediction",
      layerColor: "text-amber-400",
      icon: LineChart,
    },
    {
      layer: "Layer 4: Autonomy",
      service: "Agentic AI Systems",
      href: "/services/agentic-ai-systems/",
      builds: "Autonomous agents, self-healing workflows, multi-agent coordination",
      layerColor: "text-green-400",
      icon: Bot,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-4" data-testid="badge-bridge">
            <ArrowRight className="w-3 h-3 mr-1" />
            Framework → Implementation
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-bridge">
            How Operational Intelligence Connects to Implementation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Operational Intelligence is the framework. Implementation requires specific AI capabilities built by AGIX.
          </p>
        </motion.div>

        <div className="space-y-3">
          {bridges.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-slate-700 hover-elevate" data-testid={`card-bridge-${i}`}>
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-3 sm:w-44 shrink-0">
                        <Icon className={`w-5 h-5 ${b.layerColor} shrink-0`} />
                        <span className={`text-sm font-semibold ${b.layerColor}`}>{b.layer}</span>
                      </div>
                      <div className="hidden sm:block text-muted-foreground/50">→</div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={b.href}
                          className="font-bold text-sm text-white hover:text-orange-400 transition-colors underline-offset-2 hover:underline"
                          data-testid={`link-service-${i}`}
                        >
                          {b.service}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.builds}</p>
                      </div>
                      <Link href={b.href} className="shrink-0" data-testid={`link-bridge-arrow-${i}`}>
                        <ChevronRight className="w-5 h-5 text-muted-foreground hover:text-orange-400 transition-colors" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-bridge-quote">
                The Operational Intelligence Stack tells you WHERE you need to go. The AGIX service portfolio is HOW you get there.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function AgixMethodology() {
  const steps = [
    { step: "1", title: "Operational Mapping", desc: "Understand how work actually flows — where signals are generated, where decisions are made, where delays emerge." },
    { step: "2", title: "Maturity Assessment", desc: "Identify which of the 4 layers you currently occupy and define the gap to your target state." },
    { step: "3", title: "Intelligence Design", desc: "Define what Visibility, Understanding, Prediction, and Autonomy look like for your specific operations." },
    { step: "4", title: "Controlled Deployment", desc: "Start assistive and supervised before granting autonomy — building trust through proven reliability." },
    { step: "5", title: "Continuous Optimization", desc: "Track outcomes, learn from overrides, refine models, and progressively expand autonomous capabilities." },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-4" data-testid="badge-methodology">
            <Sparkles className="w-3 h-3 mr-1" />
            The AGIX Technologies Way
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-methodology">
            How AGIX Moves You from Layer 1 to Layer 4
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A disciplined five-step engagement methodology — no shortcuts, no reckless autonomy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
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
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-400 shrink-0" />
                <div>
                  <h3 className="font-bold mb-1" data-testid="heading-governance">Governance Built In — At Every Layer</h3>
                  <p className="text-sm text-muted-foreground mb-3">Autonomy without governance is recklessness. AGIX builds both together.</p>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    {["Human-in-the-loop controls", "Decision traceability & audit logs", "Kill switches & fail-safes", "Confidence thresholds & progressive trust"].map((item, i) => (
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
    { value: "60%", label: "Shorter mean time to resolution", sub: "via ML-baseline alerting", color: "text-green-400" },
    { value: "50%", label: "Downtime reduction", sub: "with AI predictive maintenance", color: "text-blue-400" },
    { value: "87%", label: "Of organizations report AIOps value", sub: "after deployment", color: "text-purple-400" },
    { value: "25%", label: "Maintenance cost savings", sub: "from predictive systems", color: "text-orange-400" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-results">
            <TrendingUp className="w-3 h-3 mr-1" />
            Documented Outcomes
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-results">
            What Operational Intelligence Delivers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-results-description">
            Research-backed outcomes from organizations that have deployed each layer of the stack.
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
                <CardContent className="p-6 space-y-1">
                  <div className={`text-4xl md:text-5xl font-bold ${metric.color}`} data-testid={`text-metric-value-${i}`}>
                    {metric.value}
                  </div>
                  <p className="text-sm font-medium" data-testid={`text-metric-label-${i}`}>{metric.label}</p>
                  <p className="text-xs text-muted-foreground">{metric.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureTrajectory() {
  const points = [
    {
      number: "01",
      title: "Operations become self-operating.",
      body: "By 2028, leading organizations won't 'manage' operations — operations will manage themselves, with humans setting objectives and handling exceptions. This is the shift from Layer 3 to Layer 4 at scale.",
      color: "text-blue-400",
    },
    {
      number: "02",
      title: "AI agents replace operational coordination roles.",
      body: "The human work of routing, escalating, monitoring, and coordinating will be handled by AI agents. Human operators become strategists and exception-handlers.",
      color: "text-purple-400",
    },
    {
      number: "03",
      title: "Cross-domain intelligence becomes standard.",
      body: "Today, operational intelligence is siloed: IT ops, customer ops, supply chain ops run separate systems. By 2028, a single intelligence layer will correlate across all operational domains simultaneously.",
      color: "text-amber-400",
    },
    {
      number: "04",
      title: "Real-time becomes the only acceptable latency.",
      body: "Batch analytics and overnight reports will be obsolete for operational decisions. If you can't act on a signal in minutes, you can't compete.",
      color: "text-orange-400",
    },
    {
      number: "05",
      title: "Governance becomes the differentiator.",
      body: "Every organization will have AI in operations. The organizations that win will be the ones with the most trustworthy, auditable, and controllable autonomous systems.",
      color: "text-green-400",
    },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-future">
            <RefreshCcw className="w-3 h-3 mr-1" />
            2028 Trajectory
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-future">
            Where Operational Intelligence Is Heading
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five irreversible shifts in how businesses will operate within 24 months.
          </p>
        </motion.div>

        <div className="space-y-4">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-slate-700 hover-elevate" data-testid={`card-future-${i}`}>
                <CardContent className="p-5 flex gap-5">
                  <div className={`text-2xl font-black opacity-40 ${p.color} shrink-0 w-8`}>{p.number}</div>
                  <div className="space-y-1">
                    <h3 className={`font-bold ${p.color}`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-orange-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-future-quote">
                By 2028, "operational intelligence" won't be a capability you ADD to your business. It will BE how your business operates.
                The question is whether you build it deliberately — or scramble to retrofit it when competitors force your hand.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-700">
          <CardContent className="p-6 flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-orange-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Santosh Singh</h3>
                <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-400">Author</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Founder &amp; CEO, AGIX Technologies</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Santosh developed the Operational Intelligence Stack as a framework for helping organizations understand
                where they sit on the journey from reactive operations to autonomous business systems. AGIX Technologies
                designs the AI infrastructure — automation, predictive analytics, knowledge systems, and agentic architectures
                — that moves businesses from Layer 1 to Layer 4.
              </p>
              <Link
                href="/author/santosh/"
                className="text-xs text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1 mt-1"
                data-testid="link-author-bio"
              >
                Read full bio <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
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
        <DefinitionBlock />
        <WhyNowSection />
        <ComparisonTable />
        <AGIXIntelligenceStack />
        <MaturityAssessment />
        <IndustryApplications />
        <ImplementationBridge />
        <AgixMethodology />
        <InteractiveToolsSection />
        <ResultsMetrics />
        <FutureTrajectory />
        <FAQSection
          faqs={documentFAQs['operational-ai']}
          title="Operational Intelligence: Questions Answered"
        />
        <section id="cta-form" className="py-10 lg:py-14 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CtaForm
              headline="Ready to Move from Visibility to Autonomy?"
              subheadline="Tell us where you are in the Operational Intelligence maturity stack. We'll show you the fastest path to Layer 3 and 4."
            />
          </div>
        </section>
      </main>
      <MainFooter />
      <StickyCTA />
    </div>
  );
}
