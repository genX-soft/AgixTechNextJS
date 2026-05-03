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
  ArrowRight, MessageSquare, CheckCircle2, Brain, Zap, Shield,
  TrendingUp, AlertTriangle, ChevronDown, ChevronRight, ArrowDown,
  Sparkles, CheckCheck, Bot, Globe, Quote, User, Phone, Headphones,
  Network, Mic, RefreshCcw, Target, Layers, BarChart3, Eye,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ConversationVisual() {
  const messages = [
    { from: "user", text: "What's causing our support ticket backlog?", delay: 0 },
    { from: "ai", text: "Analyzing 12,847 tickets... Top driver: billing questions (34%). Recommending automated resolution flow.", delay: 1.2 },
    { from: "user", text: "Can AI handle those automatically?", delay: 2.6 },
    { from: "ai", text: "Yes — Level 4 routing can resolve 78% without human touch. Estimated 60% cost reduction.", delay: 3.8 },
  ];
  return (
    <div className="w-full max-w-[420px] mx-auto space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-2xl rounded-b-none px-4 py-3 mb-0">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">AGIX Conversational AI</div>
          <div className="flex items-center gap-1">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-[10px] text-green-400">Understanding intent · Level 4</span>
          </div>
        </div>
        <div className="ml-auto flex gap-1">
          {["bg-red-500", "bg-yellow-500", "bg-green-500"].map(c => <div key={c} className={`w-2.5 h-2.5 rounded-full ${c} opacity-60`} />)}
        </div>
      </div>

      {/* Chat messages */}
      <div className="bg-slate-900/80 border-x border-slate-700/50 px-4 py-3 space-y-3 min-h-[220px]">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: m.delay, duration: 0.4 }}
          >
            {m.from === "ai" && (
              <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <MessageSquare className="w-3 h-3 text-blue-400" />
              </div>
            )}
            <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
              m.from === "user"
                ? "bg-blue-600/30 border border-blue-500/30 text-blue-100 rounded-tr-sm"
                : "bg-slate-800/80 border border-slate-600/50 text-slate-200 rounded-tl-sm"
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {/* Typing indicator */}
        <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.8 }}>
          <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-2 flex-shrink-0">
            <MessageSquare className="w-3 h-3 text-blue-400" />
          </div>
          <div className="bg-slate-800/80 border border-slate-600/50 px-3 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
            {[0, 0.2, 0.4].map(d => (
              <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: d }} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer strip */}
      <div className="bg-slate-800/40 border border-t-0 border-slate-700/50 rounded-2xl rounded-t-none px-4 py-2.5 flex items-center gap-3">
        <div className="flex-1 bg-slate-700/50 rounded-full h-7 flex items-center px-3">
          <span className="text-[10px] text-muted-foreground">Intent understood · Context preserved · Action triggered</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
          <ArrowRight className="w-3 h-3 text-blue-400" />
        </div>
      </div>

      {/* Capability chips */}
      <div className="flex flex-wrap gap-2 pt-2">
        {[["Intent", "text-blue-400 bg-blue-500/10 border-blue-500/20"], ["Context", "text-purple-400 bg-purple-500/10 border-purple-500/20"], ["Reasoning", "text-amber-400 bg-amber-500/10 border-amber-500/20"], ["Action", "text-green-400 bg-green-500/10 border-green-500/20"]].map(([l, c]) => (
          <span key={l} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${c}`}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-24 lg:pt-32 pb-16 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/15 via-transparent to-transparent" />
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

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
                <li><span className="text-muted-foreground">Intelligence</span></li>
                <ChevronRight className="w-3 h-3" />
                <li><span className="text-blue-400">Conversational Intelligence</span></li>
              </ol>
            </nav>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-4 py-1.5" data-testid="badge-hero-category">
              <MessageSquare className="w-4 h-4 mr-2" />Intelligence Framework
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight" data-testid="text-hero-headline">
              Conversational Intelligence:{" "}
              <span className="text-blue-400">When AI Understands, Not Just Responds</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl" data-testid="text-hero-subheadline">
              AI that{" "}
              <span className="text-blue-400 font-semibold">understands intent</span>,{" "}
              <span className="text-purple-400 font-semibold">maintains context</span>,{" "}
              <span className="text-amber-400 font-semibold">reasons through complexity</span>, and{" "}
              <span className="text-green-400 font-semibold">triggers action</span>{" "}
              — not just generates a response.
            </p>
            <p suppressHydrationWarning className="text-sm text-muted-foreground/60 italic">
              By <Link href="/author/santosh/" className="text-blue-400/80 hover:text-blue-400 transition-colors">Santosh Singh</Link>, Founder &amp; CEO, AGIX Technologies · {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
            </p>
            <div className="flex flex-wrap gap-3">
              {[["Level 1–5", "intelligence spectrum"], ["78%", "tickets resolved without human touch"], ["60%", "cost reduction potential"]].map(([v, l]) => (
                <div key={v} className="flex items-center gap-2 rounded-full bg-slate-800/60 border border-slate-700/50 px-3 py-1.5">
                  <span className="text-sm font-bold text-blue-400">{v}</span>
                  <span className="text-xs text-muted-foreground">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 h-12 px-7" onClick={() => scrollToSection("conv-spectrum")} data-testid="button-hero-primary">
                Explore the 5-Level Spectrum <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-7" onClick={() => scrollToSection("maturity-assessment")} data-testid="button-hero-secondary">
                Assess Your Level <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* RIGHT: Conversation Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <ConversationVisual />
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
          The conversational AI market: <span className="text-blue-400">$14.79B in 2025</span> → <span className="text-purple-400">$82.46B by 2034</span> at <span className="text-green-400">21% CAGR</span> · 75% of organizations will use LLMs for customer service by 2026 (Gartner)
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
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-definition">
            <Eye className="w-3 h-3 mr-1" />Definition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-definition">What Is Conversational Intelligence?</h2>
          <div className="bg-slate-900/60 border border-blue-500/20 rounded-xl p-6 md:p-8 mb-6" itemScope itemType="https://schema.org/Question">
            <meta itemProp="name" content="What is conversational intelligence?" />
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-lg md:text-xl leading-relaxed" itemProp="text" data-testid="text-definition-primary">
                <strong>Conversational Intelligence</strong> is the ability of an AI system to{" "}
                <span className="text-blue-400">understand human intent</span>,{" "}
                <span className="text-purple-400">maintain context across interactions</span>,{" "}
                <span className="text-amber-400">reason through complexity</span>, and{" "}
                <span className="text-green-400">trigger the correct response or action</span>{" "}
                — not just generate text or speech. It transforms conversations from simple question-answer exchanges into meaningful business decisions, actions, and outcomes. Where a chatbot replies, Conversational Intelligence understands WHY someone is speaking, what they need, and what should happen next.
              </p>
            </div>
          </div>
          <Card className="border-blue-500/20 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                <p className="text-base italic" data-testid="text-original-quote">
                  Conversational Intelligence turns conversations into decisions. It is not a channel. It is an intelligence layer that works across all channels — text, voice, email, messaging — and connects conversation to action.
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
    { number: "01", title: "Conversation is becoming the universal interface for AI.", body: "Every interaction between a human and a business — customer support, sales, onboarding, internal operations — is fundamentally a conversation. The organizations that make these conversations intelligent gain an advantage that scales across every function.", color: "text-blue-400", border: "border-blue-500/20" },
    { number: "02", title: "The gap between chatbots and real understanding is where trust breaks.", body: "Most organizations already use chatbots or voice systems. The problem isn't replying — it's understanding intent, context, and urgency, then acting correctly. When AI misunderstands and takes the wrong action, customers leave and employees lose trust.", color: "text-amber-400", border: "border-amber-500/20" },
    { number: "03", title: "LLMs have changed what's possible — but not what's reliable.", body: "Large language models can now generate fluent conversation. But fluency without understanding, context, and governed action is just sophisticated noise. The challenge has shifted from 'can AI talk?' to 'can AI understand and act correctly?'", color: "text-red-400", border: "border-red-500/20" },
  ];
  const stats = [
    { value: "$14.79B", label: "Conversational AI market 2025", sub: "→ $82.46B by 2034 at 21% CAGR", source: "Fortune Business Insights", color: "text-blue-400" },
    { value: "75%", label: "of orgs using LLMs for customer service by 2026", sub: "up from 10% in 2023 — steepest adoption curve in CX history", source: "Gartner", color: "text-purple-400" },
    { value: "340%", label: "Voice agent implementation growth YoY", sub: "production voice agents already at scale", source: "Nextlevel.ai", color: "text-green-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-why-now">
            <AlertTriangle className="w-3 h-3 mr-1" />Why It Matters Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-now">Three Forces Making It a Strategic Priority</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {forces.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`h-full border ${f.border} bg-slate-900/40`} data-testid={`card-force-${i}`}>
                <CardContent className="p-6 space-y-3">
                  <div className={`text-4xl font-black opacity-30 ${f.color}`}>{f.number}</div>
                  <h3 className={`font-bold text-sm ${f.color}`}>{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
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
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { dim: "Approach", bot: "Scripted decision trees", ai: "NLU + intent classification + LLM", intel: "Understands intent, context, urgency, and determines action" },
    { dim: "Context", bot: "None — each message independent", ai: "Session-level context only", intel: "Persistent context across conversations, channels, and time" },
    { dim: "Reasoning", bot: "If-then rules", ai: "Pattern matching + prompt engineering", intel: "Multi-step reasoning — weighs options, handles ambiguity" },
    { dim: "Action", bot: "Displays info or routes to human", ai: "Generates responses, sometimes triggers workflows", intel: "Connects to business systems, triggers actions, updates records" },
    { dim: "Failure mode", bot: '"I didn\'t understand" → human handoff', ai: "Hallucination — confident wrong answers", intel: 'Confidence scoring → says "I\'m not sure" or escalates' },
    { dim: "Learning", bot: "None without reprogramming", ai: "Limited prompt tuning", intel: "Learns from outcomes, corrections, and patterns" },
    { dim: "Channel", bot: "Text only (usually web)", ai: "Text and sometimes voice", intel: "All channels: text, voice, messaging, email, internal tools" },
    { dim: "Business value", bot: "FAQ deflection", ai: "Conversation automation", intel: "Decisions, actions, and outcomes through conversation" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-comparison">
            <BarChart3 className="w-3 h-3 mr-1" />Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-comparison">Chatbots vs Conversational AI vs Conversational Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Three distinct capabilities. Only one resolves situations instead of answering questions.</p>
        </motion.div>
        <Card className="overflow-hidden border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/70">
                  <th className="text-left p-4 text-muted-foreground font-medium w-28">Dimension</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Chatbot</th>
                  <th className="text-center p-4 text-purple-400 font-medium">Conversational AI</th>
                  <th className="text-center p-4 text-blue-400 font-semibold">Conversational Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/70 hover:bg-slate-900/20 transition-colors" data-testid={`row-comparison-${i}`}>
                    <td className="p-4 font-medium text-slate-300 text-xs">{row.dim}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.bot}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.ai}</td>
                    <td className="p-4 text-center text-blue-300 text-xs font-medium leading-relaxed">{row.intel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="border-blue-500/20 bg-blue-500/5 mt-6">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Quote className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
              <p className="text-sm italic" data-testid="text-comparison-quote">Chatbots respond. Conversational AI generates. Conversational Intelligence understands, decides, and acts — across every channel, with context that persists.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ConversationalIntelligenceSpectrum() {
  const [activeLevel, setActiveLevel] = useState(0);
  const levels = [
    {
      level: "Level 1", title: "Scripted", subtitle: "Rule-based FAQ bots",
      icon: MessageSquare, color: "from-slate-500 to-slate-600", textColor: "text-slate-400", borderColor: "border-slate-500", bgActive: "bg-slate-500/10 border-slate-500",
      what: "Rule-based FAQ bots with decision trees. Predetermined responses for anticipated questions.",
      canDo: ["Answer pre-mapped questions", "Route users to the right department", "Provide static information"],
      limitation: "Breaks on any input not in the script. Cannot handle ambiguity, multi-turn context, or unexpected phrasing.",
      note: "Where most organizations start.",
    },
    {
      level: "Level 2", title: "Intent-Aware", subtitle: "NLU classification",
      icon: Brain, color: "from-blue-600 to-blue-700", textColor: "text-blue-400", borderColor: "border-blue-500", bgActive: "bg-blue-500/10 border-blue-500",
      what: "NLU (Natural Language Understanding) layer that classifies user intent and extracts entities. Handles varied phrasing for the same request.",
      canDo: ['Understand "I want to cancel my order" and "please cancel order #4582" as the same intent', "Extract relevant entities (order number, name, date)", "Handle common variations in phrasing"],
      limitation: 'Each intent must be trained. Falls apart on complex multi-intent messages. No reasoning — just classification.',
    },
    {
      level: "Level 3", title: "Context-Aware", subtitle: "Multi-turn memory + RAG",
      icon: Network, color: "from-purple-500 to-purple-600", textColor: "text-purple-400", borderColor: "border-purple-500", bgActive: "bg-purple-500/10 border-purple-500",
      what: "Multi-turn memory with knowledge grounding. Remembers what was said earlier and retrieves relevant information from business knowledge (RAG).",
      canDo: ["Maintain coherent conversation across 10+ turns", 'Reference previous messages ("As you mentioned earlier...")', "Ground responses in verified business data — source-cited answers"],
      limitation: "Still reactive — responds to what the user asks. Cannot proactively guide. Cannot reason through complex situations.",
      note: "Where leading organizations are today.",
    },
    {
      level: "Level 4", title: "Reasoning", subtitle: "LLM-powered dynamic logic",
      icon: Zap, color: "from-amber-500 to-amber-600", textColor: "text-amber-400", borderColor: "border-amber-500", bgActive: "bg-amber-500/10 border-amber-500",
      what: "LLM-powered dynamic conversation with multi-step reasoning and tool use. The system doesn't just understand — it thinks.",
      canDo: ["Handle complex, multi-part requests in a single conversation", "Reason through conditional logic and trade-offs", "Use tools during conversation — query databases, update records, trigger workflows", "Adapt tone based on sentiment and urgency"],
      limitation: "Still initiated by the user. Operates within a single conversation session. Does not proactively manage long-running processes.",
    },
    {
      level: "Level 5", title: "Autonomous", subtitle: "Proactive conversation manager",
      icon: Bot, color: "from-green-500 to-green-600", textColor: "text-green-400", borderColor: "border-green-500", bgActive: "bg-green-500/10 border-green-500",
      what: "AI that initiates, manages, and completes conversations independently — pursuing objectives over time, not just responding to messages.",
      canDo: ["Proactively reach out to customers (follow-ups, reminders, retention interventions)", "Manage multi-day conversational workflows (onboarding, care coordination, deal nurturing)", "Coordinate across channels — start on chat, continue on email, follow up via voice", "Hand off to humans only when genuinely necessary, with full context"],
      note: "Where this is heading by 2028.",
    },
  ];
  const active = levels[activeLevel];
  const ActiveIcon = active.icon;
  return (
    <section id="conv-spectrum" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-spectrum">
            <Layers className="w-3 h-3 mr-1" />The AGIX Original Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-spectrum">The AGIX Conversational Intelligence Spectrum</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Five maturity levels. Each represents a fundamentally different capability — not just a better chatbot. Most organizations operate at Level 1 or 2.</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-2">
            {levels.map((lv, i) => {
              const Icon = lv.icon;
              const isActive = activeLevel === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <button onClick={() => setActiveLevel(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${isActive ? `${lv.bgActive} shadow-lg` : "border-slate-700 hover:border-slate-600 bg-slate-900/30"}`} data-testid={`button-spectrum-${i}`} aria-pressed={isActive}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lv.color} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium mb-0.5 ${isActive ? lv.textColor : "text-muted-foreground"}`}>{lv.level}</p>
                        <p className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-300"}`}>{lv.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{lv.subtitle}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
            <Card className="border-blue-500/20 bg-blue-500/5 mt-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs italic text-muted-foreground leading-relaxed">The jump from Level 2 to Level 3 is the difference between a FAQ bot and a knowledge assistant. The jump from Level 4 to Level 5 is the difference between a helpful tool and an autonomous team member.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div key={activeLevel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <Card className="border-slate-700" data-testid="card-spectrum-details">
                  <CardContent className="p-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center shadow-lg`}>
                        <ActiveIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${active.textColor}`}>{active.level}</p>
                        <h3 className="text-xl font-bold" data-testid="text-spectrum-title">{active.title}</h3>
                        <p className="text-sm text-muted-foreground">{active.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{active.what}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">What this can do</p>
                      {active.canDo.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm" data-testid={`text-spectrum-cando-${j}`}>
                          <CheckCircle2 className={`w-4 h-4 ${active.textColor} shrink-0 mt-0.5`} />
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 space-y-2 border border-slate-700">
                      {active.limitation && (
                        <div>
                          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Limitation at this level</p>
                          <p className="text-sm text-muted-foreground">{active.limitation}</p>
                        </div>
                      )}
                      {active.note && (
                        <div>
                          <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Context</p>
                          <p className="text-sm text-muted-foreground">{active.note}</p>
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
    { level: "Level 1: Scripted", signal: '"Our chatbot only handles 5 question types"', missing: "Intent understanding, flexibility", color: "text-slate-400", border: "border-slate-500/30" },
    { level: "Level 2: Intent-Aware", signal: '"It handles simple questions but breaks on complex ones"', missing: "Context, knowledge grounding, multi-turn memory", color: "text-blue-400", border: "border-blue-500/30" },
    { level: "Level 3: Context-Aware", signal: '"It remembers context and uses our docs but can\'t handle tricky situations"', missing: "Reasoning, tool use, dynamic decision-making", color: "text-purple-400", border: "border-purple-500/30" },
    { level: "Level 4: Reasoning", signal: '"It handles complex requests but we still initiate every interaction"', missing: "Proactive engagement, long-running conversation management", color: "text-amber-400", border: "border-amber-500/30" },
    { level: "Level 5: Autonomous", signal: '"Our AI manages entire customer journeys across channels"', missing: "You've arrived — optimize and govern", color: "text-green-400", border: "border-green-500/30" },
  ];
  return (
    <section id="maturity-assessment" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-maturity">
            <Target className="w-3 h-3 mr-1" />Self-Assessment
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-maturity">Where Is Your Organization on the Spectrum?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The gap between your current level and where you need to be defines your Conversational Intelligence investment.</p>
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

function DomainApplications() {
  const domains = [
    { icon: Headphones, name: "Customer Support", app: "Understanding intent, retrieving answers from knowledge base, resolving issues, escalating intelligently", impact: "60–92% cost reduction, 24/7 resolution, consistent quality", color: "text-blue-400", border: "border-blue-500/20" },
    { icon: TrendingUp, name: "Sales & Revenue", app: "Lead qualification conversations, deal nurturing, objection handling, appointment booking", impact: "Instant response, higher conversion, longer engagement", color: "text-green-400", border: "border-green-500/20" },
    { icon: Network, name: "Employee Operations", app: "HR policy queries, IT helpdesk, onboarding guidance, internal knowledge access", impact: "50–60% inquiry reduction, faster onboarding", color: "text-purple-400", border: "border-purple-500/20" },
    { icon: Zap, name: "Healthcare", app: "Patient intake, appointment management, clinical follow-ups, symptom triage", impact: "Reduced admin burden, improved patient flow", color: "text-red-400", border: "border-red-500/20" },
    { icon: Shield, name: "Financial Services", app: "Account inquiries, transaction support, fraud alerts, compliance Q&A", impact: "24/7 availability, audit-compliant interactions", color: "text-amber-400", border: "border-amber-500/20" },
    { icon: Globe, name: "E-Commerce", app: "Product recommendations, order tracking, return processing, cart recovery", impact: "12.3% conversion rate for AI-engaged shoppers (4x baseline)", color: "text-teal-400", border: "border-teal-500/20" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 mb-4" data-testid="badge-domains">
            <Globe className="w-3 h-3 mr-1" />Applications
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-domains">Where Conversational Intelligence Applies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Customer support accounts for 42.4% of the chatbot market (Mordor Intelligence). AI customer service can reduce support costs by up to 92% (FastBots).</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {domains.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className={`h-full border ${d.border} hover-elevate`} data-testid={`card-domain-${i}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${d.color}`} />
                      <h3 className={`font-bold text-sm ${d.color}`}>{d.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.app}</p>
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-muted-foreground/70"><span className="text-green-400 font-medium">Impact: </span>{d.impact}</p>
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
    { level: "Level 1–2: Scripted / Intent-Aware", service: "Conversational AI Chatbots", href: "/services/conversational-ai-chatbots/", builds: "Rule-based and intent-driven chatbots across channels", color: "text-slate-400" },
    { level: "Level 3: Context-Aware", service: "RAG & Knowledge AI + Chatbots", href: "/services/rag-knowledge-ai/", builds: "Knowledge-grounded conversational assistants with source-cited answers", color: "text-purple-400" },
    { level: "Level 3–4: Voice + Reasoning", service: "AI Voice Agents", href: "/services/ai-voice-agents/", builds: "Voice-first conversational AI with reasoning and tool use", color: "text-amber-400" },
    { level: "Level 4–5: Reasoning + Autonomous", service: "Agentic AI Systems", href: "/services/agentic-ai-systems/", builds: "Autonomous conversational agents that manage processes", color: "text-green-400" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-bridge">
            <ArrowRight className="w-3 h-3 mr-1" />Spectrum → Implementation
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-bridge">How Conversational Intelligence Connects to Implementation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The Spectrum tells you WHAT level of intelligence you need. The AGIX service portfolio is HOW you build it.</p>
        </motion.div>
        <div className="space-y-3">
          {bridges.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-bridge-${i}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`text-sm font-semibold ${b.color} sm:w-52 shrink-0`}>{b.level}</div>
                    <div className="hidden sm:block text-muted-foreground/50">→</div>
                    <div className="flex-1 min-w-0">
                      <Link href={b.href} className="font-bold text-sm text-white hover:text-blue-400 transition-colors hover:underline underline-offset-2" data-testid={`link-service-${i}`}>{b.service}</Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.builds}</p>
                    </div>
                    <Link href={b.href} data-testid={`link-bridge-arrow-${i}`}><ChevronRight className="w-5 h-5 text-muted-foreground hover:text-blue-400 transition-colors" /></Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-bridge-quote">The Conversational Intelligence Spectrum tells you WHAT level of intelligence you need. The AGIX service portfolio is HOW you build it.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function FutureTrajectory() {
  const points = [
    { n: "01", title: "Conversation becomes the universal interface.", body: "By 2028, every customer interaction, employee query, and business transaction will flow through conversational interfaces. Text, voice, or agent-to-agent — the interface is conversation.", color: "text-blue-400" },
    { n: "02", title: "Voice overtakes text as the primary conversational channel.", body: "Voice agent deployments grew 340% YoY (Nextlevel.ai). By 2028, voice will be the default for customer-facing AI — faster, more natural, and accessible to populations that don't type.", color: "text-purple-400" },
    { n: "03", title: "Conversations become multi-modal.", body: "AI won't just hear or read — it will see. Customers will share images, screenshots, and documents WITHIN a conversation. The AI will reason across text, voice, and visual input simultaneously.", color: "text-amber-400" },
    { n: "04", title: "Autonomous conversation managers replace Tier-1 support teams.", body: "Level 5 systems will manage entire customer journeys — from first inquiry through onboarding, support, and retention — proactively, across channels, over weeks and months.", color: "text-orange-400" },
    { n: "05", title: "Emotional intelligence becomes a standard capability.", body: "AI will detect frustration, urgency, confusion, and satisfaction in real time and adapt its approach accordingly. Empathetic AI will be table stakes, not a differentiator.", color: "text-green-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-future">
            <RefreshCcw className="w-3 h-3 mr-1" />2028 Trajectory
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-future">Where Conversational Intelligence Is Heading</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Five irreversible shifts over the next 24 months.</p>
        </motion.div>
        <div className="space-y-4">
          {points.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-future-${i}`}>
                <CardContent className="p-5 flex gap-5">
                  <div className={`text-2xl font-black opacity-40 ${p.color} shrink-0 w-8`}>{p.n}</div>
                  <div className="space-y-1">
                    <h3 className={`font-bold ${p.color}`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-future-quote">By 2028, the question won't be "should we use conversational AI?" — it will be "at what Spectrum level are we operating, and is it enough?" The organizations at Level 4 and 5 will define the next era of customer experience. Everyone else will be playing catch-up.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-700">
          <CardContent className="p-6 flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Santosh Singh</h3>
                <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">Author</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Founder &amp; CEO, AGIX Technologies</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Santosh developed the Conversational Intelligence Spectrum as a maturity framework for helping organizations understand the gap between where their conversational AI sits today and where it needs to be. AGIX builds the systems that move businesses from Level 1 to Level 5 — across text, voice, and agent-driven conversations.</p>
              <Link href="/author/santosh/" className="text-xs text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 mt-1" data-testid="link-author-bio">
                Read full bio <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function ConversationalIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <DefinitionBlock />
        <WhyNowSection />
        <ComparisonTable />
        <ConversationalIntelligenceSpectrum />
        <MaturityAssessment />
        <DomainApplications />
        <ImplementationBridge />
        <FutureTrajectory />
        <FAQSection faqs={documentFAQs['conversational-ai']} title="Conversational Intelligence: Questions Answered" />
        <section id="cta-form" className="py-10 lg:py-14 bg-gradient-to-br from-primary/10 via-background to-blue-500/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CtaForm headline="Ready to Move Beyond Chatbots?" subheadline="Tell us where you are on the Conversational Intelligence Spectrum. We'll show you the fastest path to Level 3 and beyond." />
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}
