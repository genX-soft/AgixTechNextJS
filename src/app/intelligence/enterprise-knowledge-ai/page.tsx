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
  ChevronDown, ChevronRight, ArrowDown, Bot, Globe, Quote, User,
  RefreshCcw, Target, Layers, BarChart3, Database, BookOpen,
  FileText, Activity, Zap, Eye, Building2, HeartPulse, Landmark,
  GraduationCap, Scale, LineChart,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function HeroSection() {
  return (
    <section className="pt-24 lg:pt-28 pb-20 min-h-[85vh] flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto text-center space-y-6">
          <nav aria-label="Breadcrumb" className="flex justify-center">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li><span className="text-muted-foreground">Intelligence</span></li>
              <ChevronRight className="w-3 h-3" />
              <li><span className="text-amber-400">Enterprise Knowledge Intelligence</span></li>
            </ol>
          </nav>
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 px-4 py-1.5" data-testid="badge-hero-category">
            <BookOpen className="w-4 h-4 mr-2" />Intelligence Framework
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
            Enterprise Knowledge Intelligence:{" "}
            <span className="text-amber-400">When Your Organization&apos;s Knowledge Becomes an Active Asset</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subheadline">
            <span className="text-amber-400">Knowledge Intelligence</span> is not document management. It is not a search engine. It is not a RAG deployment.{" "}
            It is the <span className="text-teal-400">organizational capability to store, govern, retrieve, and reason over collective knowledge</span>{" "}
            using AI — with <span className="text-green-400">accuracy, traceability, and access control</span>.
          </p>
          <p className="text-sm text-muted-foreground/70 italic">
            By <Link href="/author/santosh/" className="text-amber-400/80 hover:text-amber-400 transition-colors">Santosh Singh</Link>, Founder &amp; CEO, AGIX Technologies · April 2026
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25" onClick={() => scrollToSection("ki-maturity")} data-testid="button-hero-primary">
              Explore the 5-Stage Model <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("ki-foundation")} data-testid="button-hero-secondary">
              Knowledge as Foundation <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button onClick={() => scrollToSection("definition")} aria-label="Scroll down" data-testid="button-scroll-down">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-muted-foreground hover:text-amber-400 transition-colors">
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
          Knowledge management market: <span className="text-amber-400">$584.98B in 2024</span> → <span className="text-green-400">$2.35T by 2033</span> at 16.7% CAGR · <span className="text-red-400">80% of employees can't find information they need</span> · Most organizations are at Stage 1–2 of 5 on the Knowledge Intelligence Maturity Model
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
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-definition">
            <Eye className="w-3 h-3 mr-1" />Definition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-definition">What Is Enterprise Knowledge Intelligence?</h2>
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-xl p-6 md:p-8 mb-6" itemScope itemType="https://schema.org/Question">
            <meta itemProp="name" content="What is Enterprise Knowledge Intelligence?" />
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-lg md:text-xl leading-relaxed" itemProp="text" data-testid="text-definition-primary">
                <strong>Enterprise Knowledge Intelligence</strong> is the ability of an organization to{" "}
                <span className="text-amber-400">store</span>,{" "}
                <span className="text-blue-400">govern</span>,{" "}
                <span className="text-purple-400">retrieve</span>, and{" "}
                <span className="text-green-400">reason over</span>{" "}
                its collective knowledge using AI — with accuracy, traceability, and access control. It ensures AI answers are grounded in what your organization actually knows — not what a model guesses. When properly built, organizational knowledge becomes an active asset that improves every other AI capability: conversations become more accurate, decisions become better-informed, agents become more capable, and operations become context-aware.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <Card className="border-amber-500/20 bg-amber-500/5 text-center">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Knowledge Management</p>
                <p className="text-xs text-muted-foreground">Organizes and stores documents</p>
                <p className="text-xs text-amber-300/60 mt-1 italic">KM is about files</p>
              </CardContent>
            </Card>
            <Card className="border-blue-500/20 bg-blue-500/5 text-center">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">RAG Technology</p>
                <p className="text-xs text-muted-foreground">Retrieves text and generates answers</p>
                <p className="text-xs text-blue-300/60 mt-1 italic">RAG is infrastructure</p>
              </CardContent>
            </Card>
            <Card className="border-green-500/20 bg-green-500/5 text-center">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Knowledge Intelligence</p>
                <p className="text-xs text-muted-foreground">Governed, active, AI-accessible knowledge</p>
                <p className="text-xs text-green-300/60 mt-1 italic">KI is institutional intelligence</p>
              </CardContent>
            </Card>
          </div>
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                <p className="text-base italic" data-testid="text-original-quote">
                  Knowledge Intelligence is the foundation every other AI capability rests on. You can build a chatbot without it. But the chatbot will hallucinate. You can build decision systems without it. But they'll make decisions without context. Knowledge Intelligence is what makes AI trustworthy.
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
  const problems = [
    { n: "01", title: "Knowledge is everywhere and accessible nowhere.", body: "The average employee wastes 2.5 hours per day searching for information (IDC). Institutional knowledge lives in people's heads, disconnected tools, and incompatible formats. This is not a storage problem. It is an intelligence problem.", color: "text-red-400", border: "border-red-500/20" },
    { n: "02", title: "AI without governed knowledge hallucinates.", body: "LLMs generate confident-sounding answers. When they don't have accurate knowledge, they fabricate it. The only solution is grounding AI responses in your actual organizational knowledge — with source citation and access control.", color: "text-amber-400", border: "border-amber-500/20" },
    { n: "03", title: "Institutional knowledge walks out the door.", body: "Every time an expert employee leaves, organizational knowledge disappears — unless it was captured, structured, and made AI-accessible. In high-turnover industries, this is a compounding crisis.", color: "text-orange-400", border: "border-orange-500/20" },
  ];
  const stats = [
    { value: "2.5h", label: "per day wasted searching for information", sub: "per employee — at scale, this is billions in productivity", source: "IDC", color: "text-red-400" },
    { value: "80%", label: "of employees can't find what they need", sub: "knowledge exists but is not findable or trustworthy", source: "Various surveys", color: "text-amber-400" },
    { value: "16.7%", label: "knowledge management market CAGR", sub: "$584.98B in 2024 → $2.35T by 2033", source: "Market Research Future", color: "text-blue-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-red-500/30 text-red-400 mb-4" data-testid="badge-why-now">
            <AlertTriangle className="w-3 h-3 mr-1" />Why It Matters Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-now">Three Problems Knowledge Intelligence Solves</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`h-full border ${p.border} bg-slate-900/40`} data-testid={`card-problem-${i}`}>
                <CardContent className="p-6 space-y-3">
                  <div className={`text-4xl font-black opacity-30 ${p.color}`}>{p.n}</div>
                  <h3 className={`font-bold text-sm ${p.color}`}>{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
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
    { dim: "Core capability", search: "Keyword matching", rag: "Retrieve text → generate answer", ki: "Governed retrieval + reasoning + source citation + access control" },
    { dim: "Answer accuracy", search: "Links to pages", rag: "Generated — may hallucinate", ki: "Source-verified, confidence-scored" },
    { dim: "Governance", search: "URL permissions", rag: "Rarely addressed", ki: "Role-based access, classification, audit trail" },
    { dim: "Freshness", search: "Indexed periodically", rag: "As fresh as the index", ki: "Monitored — alerts on stale content, flags conflicts" },
    { dim: "Source citation", search: "URL link only", rag: "Inconsistent", ki: "Always cited — document, section, version, owner" },
    { dim: "Tacit knowledge", search: "Not captured", rag: "Not captured", ki: "Structured capture pathways — expert knowledge documented" },
    { dim: "Cross-system", search: "Single search index", rag: "Multiple sources, basic", ki: "Unified across all systems — one knowledge layer" },
    { dim: "Active maintenance", search: "None", rag: "Manual re-indexing", ki: "Automated freshness monitoring, conflict detection, gap alerts" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-comparison">
            <BarChart3 className="w-3 h-3 mr-1" />Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-comparison">Enterprise Search vs RAG vs Knowledge Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Three distinct capabilities. Only one produces AI-trustworthy organizational knowledge.</p>
        </motion.div>
        <Card className="overflow-hidden border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/70">
                  <th className="text-left p-4 text-muted-foreground font-medium w-32">Dimension</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Enterprise Search</th>
                  <th className="text-center p-4 text-blue-400 font-medium">RAG</th>
                  <th className="text-center p-4 text-amber-400 font-semibold">Knowledge Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/70 hover:bg-slate-900/20 transition-colors" data-testid={`row-comparison-${i}`}>
                    <td className="p-4 font-medium text-slate-300 text-xs">{row.dim}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.search}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.rag}</td>
                    <td className="p-4 text-center text-amber-300 text-xs font-medium leading-relaxed">{row.ki}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="border-amber-500/20 bg-amber-500/5 mt-6">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <p className="text-sm italic" data-testid="text-comparison-quote">RAG is a technology. Knowledge Intelligence is the enterprise capability that makes RAG trustworthy, governed, and continuously improving. RAG is infrastructure. Knowledge Intelligence is what makes it safe to deploy in production.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ThreeTypesOfKnowledge() {
  const types = [
    {
      type: "Structured", icon: Database, color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5",
      where: "Databases, CRM, ERP, spreadsheets, data warehouses",
      examples: ["Customer records and transaction history", "Product catalog and pricing", "Financial data, contracts, SLAs", "Regulatory compliance databases"],
      challenge: "Well-organized but often siloed. AI can query it — if it has the right access and schema context.",
      ki: "Schema-aware retrieval with access control and freshness validation.",
    },
    {
      type: "Unstructured", icon: FileText, color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5",
      where: "PDFs, Word docs, emails, Slack, SharePoint, Confluence, Notion, Google Docs",
      examples: ["Policies, SOPs, and process documentation", "Email threads with critical decisions", "Meeting notes and project retrospectives", "Research reports and market analyses"],
      challenge: "The largest repository — and the hardest to access. Scattered across tools, inconsistently formatted, often outdated.",
      ki: "Chunking, embedding, semantic retrieval with source citation, and automated freshness monitoring.",
    },
    {
      type: "Tacit / Institutional", icon: Brain, color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5",
      where: "People's heads, team conventions, tribal knowledge, undocumented decisions",
      examples: ["'How we handle these situations' — never written down", "Expert judgment on edge cases", "Institutional memory of past decisions and their rationale", "Cultural knowledge about how decisions actually get made"],
      challenge: "The most valuable. The most vulnerable. Lost every time an expert leaves. Cannot be retrieved by AI unless it is captured first.",
      ki: "Knowledge capture programs, expert interview frameworks, decision documentation workflows, institutional memory preservation.",
    },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-types">
            <Layers className="w-3 h-3 mr-1" />Three Knowledge Types
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-types">The Three Types of Organizational Knowledge</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">True Knowledge Intelligence unifies all three. Most organizations only address the first two — losing the most valuable type entirely.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {types.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <Card className={`h-full border ${t.border} ${t.bg}`} data-testid={`card-type-${i}`}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${t.color}`} />
                      <h3 className={`font-bold ${t.color}`}>{t.type}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground/70"><span className="text-slate-300 font-medium">Where it lives: </span>{t.where}</p>
                    <div className="space-y-1.5">
                      {t.examples.map((ex, j) => (
                        <div key={j} className="flex items-start gap-1.5" data-testid={`text-type-example-${i}-${j}`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${t.color} shrink-0 mt-0.5`} />
                          <span className="text-xs text-muted-foreground">{ex}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-slate-700/50 space-y-2">
                      <p className="text-xs text-muted-foreground/70"><span className="text-red-400 font-medium">Challenge: </span>{t.challenge}</p>
                      <p className="text-xs text-muted-foreground/70"><span className={`font-medium ${t.color}`}>KI approach: </span>{t.ki}</p>
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

function KnowledgeMaturityModel() {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    {
      code: "Stage 1", title: "Scattered", subtitle: "Knowledge lives in people's heads",
      icon: Brain, color: "from-red-600 to-red-700", textColor: "text-red-400", bgActive: "bg-red-500/10 border-red-500",
      desc: "The majority of organizational knowledge is undocumented, inconsistently stored, or trapped in individual expertise. Finding information requires knowing the right person to ask.",
      characteristics: ["Answers depend on who you ask", "Information is in personal drives, emails, Slack messages", "No single source of truth exists", "New employees can't find what they need without extensive onboarding"],
      impact: "AI can't help you at Stage 1. There's no structured knowledge to retrieve, verify, or trust. The only outcome is hallucination.",
      estimate: "Most organizations are here.",
    },
    {
      code: "Stage 2", title: "Documented", subtitle: "Wikis and SOPs exist but are static",
      icon: FileText, color: "from-orange-500 to-orange-600", textColor: "text-orange-400", bgActive: "bg-orange-500/10 border-orange-500",
      desc: "The organization has invested in documentation — wikis, SOPs, process guides. Knowledge exists in structured formats but is not AI-accessible, not fresh, and not searchable semantically.",
      characteristics: ["Confluence or Notion with some documentation", "SOPs exist but may be outdated", "Search finds keywords but not meaning", "No governance on freshness or accuracy"],
      impact: "Traditional search works here — poorly. AI deployment creates inconsistent results because the knowledge base is not indexed, chunked, or governed for AI retrieval.",
      estimate: "Many organizations plateau here.",
    },
    {
      code: "Stage 3", title: "Searchable", subtitle: "Semantic AI search across knowledge",
      icon: Activity, color: "from-amber-500 to-amber-600", textColor: "text-amber-400", bgActive: "bg-amber-500/10 border-amber-500",
      desc: "Knowledge is indexed and made AI-accessible through semantic search and basic RAG. Employees and AI systems can find relevant information using natural language.",
      characteristics: ["Vector database with semantic search", "Basic RAG — retrieve and generate answers", "Multi-source search across connected systems", "Source links provided with answers"],
      impact: "Chatbots become noticeably more accurate. Employee productivity improves. AI-assisted decisions are better-grounded. But without governance, freshness decays and confidence in answers erodes.",
      estimate: "Where leading organizations are deploying now.",
    },
    {
      code: "Stage 4", title: "Intelligent", subtitle: "Governed RAG with citations and access control",
      icon: Shield, color: "from-blue-500 to-blue-600", textColor: "text-blue-400", bgActive: "bg-blue-500/10 border-blue-500",
      desc: "Knowledge retrieval is governed. Every AI answer is source-cited with document, section, owner, and version. Access control ensures the right people see the right knowledge. Freshness is monitored.",
      characteristics: ["Source citation on every AI answer (document, section, date, owner)", "Role-based access control — financial data stays financial, clinical stays clinical", "Freshness monitoring with staleness alerts", "Conflict detection — flags contradictory information", "Audit trail on knowledge queries"],
      impact: "AI systems are now trustworthy in regulated environments. Compliance teams can audit AI answers. Clinical, legal, and financial AI deployments become viable.",
      estimate: "The target for most enterprise deployments by end of 2026.",
    },
    {
      code: "Stage 5", title: "Active", subtitle: "Self-maintaining knowledge that feeds all AI",
      icon: Zap, color: "from-green-500 to-green-600", textColor: "text-green-400", bgActive: "bg-green-500/10 border-green-500",
      desc: "Knowledge is not static — it actively maintains itself. AI agents monitor for staleness, detect knowledge gaps, flag contradictions, and trigger updates. The knowledge base actively feeds all other AI systems.",
      characteristics: ["Knowledge agents proactively monitor and maintain the knowledge base", "Gap detection — identifies missing knowledge before it causes problems", "Active feeding to conversational AI, decision systems, operational agents", "Continuous improvement from interaction patterns and feedback", "Self-documenting — captures new institutional knowledge from AI interactions"],
      impact: "Every other AI capability reaches its full potential. Conversational systems stop hallucinating. Agents act on verified knowledge. Decisions are always context-informed. Knowledge is a live competitive advantage.",
      estimate: "The horizon — achievable with sustained investment in Stage 3 and 4.",
    },
  ];
  const active = stages[activeStage];
  const ActiveIcon = active.icon;
  return (
    <section id="ki-maturity" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-maturity">
            <Layers className="w-3 h-3 mr-1" />The AGIX Original Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-maturity">The AGIX Knowledge Intelligence Maturity Model</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Five stages of knowledge maturity — each representing a fundamentally different capability for your organization and your AI systems. Most organizations are at Stage 1 or 2.</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-2">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeStage === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <button onClick={() => setActiveStage(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${isActive ? `${s.bgActive} shadow-lg` : "border-slate-700 hover:border-slate-600 bg-slate-900/30"}`} data-testid={`button-stage-${i}`} aria-pressed={isActive}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium mb-0.5 ${isActive ? s.textColor : "text-muted-foreground"}`}>{s.code}</p>
                        <p className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-300"}`}>{s.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{s.subtitle}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
            <Card className="border-amber-500/20 bg-amber-500/5 mt-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs italic text-muted-foreground leading-relaxed">The jump from Stage 2 to Stage 3 is the difference between a document repository and a knowledge system. The jump from Stage 4 to Stage 5 is the difference between managed knowledge and living intelligence.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div key={activeStage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <Card className="border-slate-700" data-testid="card-stage-details">
                  <CardContent className="p-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center shadow-lg`}>
                        <ActiveIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${active.textColor}`}>{active.code}</p>
                        <h3 className="text-xl font-bold" data-testid="text-stage-title">{active.title}</h3>
                        <p className="text-sm text-muted-foreground">{active.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{active.desc}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key characteristics</p>
                      {active.characteristics.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm" data-testid={`text-stage-char-${j}`}>
                          <CheckCircle2 className={`w-4 h-4 ${active.textColor} shrink-0 mt-0.5`} />
                          <span className="text-slate-300 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 space-y-2 border border-slate-700">
                      <div>
                        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Impact on AI capability</p>
                        <p className="text-sm text-muted-foreground">{active.impact}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">Where organizations stand</p>
                        <p className="text-sm text-muted-foreground">{active.estimate}</p>
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

function KnowledgeAsFoundation() {
  const impacts = [
    { framework: "Conversational Intelligence", dependsOn: "Knowledge grounding eliminates hallucinations — chatbots and voice agents answer from your actual data", level: "Level 3+ requires Knowledge Intelligence", icon: Brain, color: "text-blue-400", border: "border-blue-500/20" },
    { framework: "Decision Intelligence", dependsOn: "Recommendations are only as good as the knowledge they're grounded in — without context, AI decisions miss nuance", level: "L2+ benefits directly from Knowledge Intelligence", icon: LineChart, color: "text-purple-400", border: "border-purple-500/20" },
    { framework: "Autonomous Agentic Systems", dependsOn: "Agents that act without accurate knowledge take wrong actions — Knowledge Intelligence is the agent's ground truth", level: "L2+ requires governed knowledge access", icon: Bot, color: "text-green-400", border: "border-green-500/20" },
    { framework: "Operational Intelligence", dependsOn: "Real-time operations need real-time context — process knowledge, policy rules, and historical patterns", level: "All levels benefit from Knowledge Intelligence", icon: Activity, color: "text-amber-400", border: "border-amber-500/20" },
  ];
  return (
    <section id="ki-foundation" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-foundation">
            <Target className="w-3 h-3 mr-1" />The AGIX Original Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-foundation">Knowledge Intelligence Is the Foundation of All AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Every other AI capability depends on knowledge being accurate, accessible, and trusted. Knowledge Intelligence is what determines whether AI makes your organization smarter — or amplifies its gaps.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {impacts.map((imp, i) => {
            const Icon = imp.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className={`h-full border ${imp.border} hover-elevate`} data-testid={`card-foundation-${i}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${imp.color}`} />
                      <h3 className={`font-bold text-sm ${imp.color}`}>{imp.framework}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{imp.dependsOn}</p>
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-muted-foreground/70"><span className={`font-medium ${imp.color}`}>Integration point: </span>{imp.level}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-foundation-quote">
                You can build AI without Knowledge Intelligence. But your chatbots will hallucinate. Your agents will take wrong actions. Your decisions will miss context. And your investment in AI will underperform expectations. Knowledge Intelligence is not a separate workstream — it is the prerequisite.
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
    { icon: HeartPulse, name: "Healthcare & Life Sciences", app: "Clinical accuracy is life-critical. Wrong knowledge → wrong treatment recommendation.", ki: "Governed clinical knowledge base with regulatory validation, source citation, and access control by role.", color: "text-red-400", border: "border-red-500/20" },
    { icon: Landmark, name: "Financial Services", app: "Regulatory audit trails require verified knowledge sources on every AI answer.", ki: "Source-cited, versioned knowledge with compliance classification and full audit trail.", color: "text-blue-400", border: "border-blue-500/20" },
    { icon: Scale, name: "Legal & Professional Services", app: "Citation is mandatory. AI answers without sources are useless — and risky.", ki: "Case law, precedent, and regulatory knowledge with mandatory source citation on every answer.", color: "text-purple-400", border: "border-purple-500/20" },
    { icon: Building2, name: "SaaS & Technology", app: "Product documentation changes constantly. Knowledge quickly becomes outdated.", ki: "Real-time documentation indexing with freshness monitoring and version-aware retrieval.", color: "text-amber-400", border: "border-amber-500/20" },
    { icon: GraduationCap, name: "Education", app: "Course content, institutional policy, and student data all require separate access control.", ki: "Role-based knowledge access: student-facing vs faculty vs administrative knowledge layers.", color: "text-teal-400", border: "border-teal-500/20" },
    { icon: Globe, name: "High-Turnover Industries", app: "Every expert departure erodes institutional knowledge permanently.", ki: "Knowledge capture programs that document expert judgment, decision rationale, and institutional memory before it walks out the door.", color: "text-green-400", border: "border-green-500/20" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 mb-4" data-testid="badge-industries">
            <Globe className="w-3 h-3 mr-1" />Industry Applications
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">Where Knowledge Intelligence Matters Most</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Every industry has knowledge — but some pay a higher price for getting it wrong.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className={`h-full border ${ind.border} hover-elevate`} data-testid={`card-industry-${i}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${ind.color}`} />
                      <h3 className={`font-bold text-sm ${ind.color}`}>{ind.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed"><span className="text-slate-300 font-medium">Challenge: </span>{ind.app}</p>
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-muted-foreground/70"><span className={`font-medium ${ind.color}`}>KI approach: </span>{ind.ki}</p>
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
    { stage: "Stage 1–2 → Stage 3", service: "RAG & Knowledge AI", href: "/services/rag-knowledge-ai/", builds: "Vector database setup, document indexing, semantic search, basic RAG deployment", color: "text-orange-400" },
    { stage: "Stage 3 → Stage 4", service: "RAG & Knowledge AI + Conversational AI", href: "/services/conversational-ai-chatbots/", builds: "Governance layer, access control, source citation, freshness monitoring, conflict detection", color: "text-blue-400" },
    { stage: "Stage 4 → Stage 5", service: "Agentic AI Systems", href: "/services/agentic-ai-systems/", builds: "Knowledge agents that maintain the knowledge base, detect gaps, and feed all AI systems", color: "text-green-400" },
    { stage: "All Stages", service: "AI Strategy & Transformation", href: "/services/ai-strategy-and-transformation/", builds: "Knowledge maturity assessment, roadmap, governance framework, and implementation plan", color: "text-amber-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-bridge">
            <ArrowRight className="w-3 h-3 mr-1" />Framework → Implementation
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-bridge">How the Maturity Model Connects to Implementation</h2>
        </motion.div>
        <div className="space-y-3">
          {bridges.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-bridge-${i}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`text-sm font-semibold ${b.color} sm:w-44 shrink-0`}>{b.stage}</div>
                    <div className="hidden sm:block text-muted-foreground/50">→</div>
                    <div className="flex-1 min-w-0">
                      <Link href={b.href} className="font-bold text-sm text-white hover:text-amber-400 transition-colors hover:underline underline-offset-2" data-testid={`link-service-${i}`}>{b.service}</Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.builds}</p>
                    </div>
                    <Link href={b.href} data-testid={`link-bridge-arrow-${i}`}><ChevronRight className="w-5 h-5 text-muted-foreground hover:text-amber-400 transition-colors" /></Link>
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

function FutureTrajectory() {
  const points = [
    { n: "01", title: "Knowledge Intelligence becomes a prerequisite for every AI deployment.", body: "By 2027, no enterprise AI initiative will be approved without a knowledge governance layer. The hallucination crisis has made it non-negotiable — and Gartner, Deloitte, and McKinsey are all saying so.", color: "text-amber-400" },
    { n: "02", title: "Active knowledge replaces passive documentation.", body: "Stage 5 active knowledge systems — that monitor themselves, detect gaps, and feed AI systems — will replace static wikis and document repositories as the primary knowledge infrastructure.", color: "text-blue-400" },
    { n: "03", title: "Knowledge becomes a boardroom-level asset.", body: "CKOs (Chief Knowledge Officers) will become common by 2028. Organizations will quantify the value of their knowledge assets in the same way they quantify data assets — and invest accordingly.", color: "text-purple-400" },
    { n: "04", title: "Institutional knowledge preservation becomes urgent.", body: "As Baby Boomers continue retiring and knowledge workers change roles faster, capturing tacit knowledge before it's lost becomes a strategic imperative — not just an HR concern.", color: "text-orange-400" },
    { n: "05", title: "Knowledge Intelligence unifies the AI stack.", body: "By 2028, Knowledge Intelligence will be recognized as the connective layer between all AI capabilities — the single investment that multiplies the ROI of every other AI system.", color: "text-green-400" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-future">
            <RefreshCcw className="w-3 h-3 mr-1" />2028 Trajectory
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-future">Where Knowledge Intelligence Is Heading</h2>
        </motion.div>
        <div className="space-y-4">
          {points.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-future-${i}`}>
                <CardContent className="p-5 flex gap-5">
                  <div className={`text-2xl font-black opacity-40 ${p.color} shrink-0 w-8`}>{p.n}</div>
                  <div>
                    <h3 className={`font-bold ${p.color} mb-1`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-future-quote">
                By 2028, the question won't be "which AI tools do we use?" — it will be "how mature is our knowledge foundation?" The organizations at Stage 4 and 5 will have AI that genuinely reflects their expertise, culture, and institutional intelligence. Everyone else will have AI that reflects a generic model's best guess.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-700">
          <CardContent className="p-6 flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-amber-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Santosh Singh</h3>
                <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400">Author</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Founder &amp; CEO, AGIX Technologies</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Santosh developed the Knowledge Intelligence Maturity Model and the Three Types of Organizational Knowledge framework as practitioner tools for helping organizations assess their knowledge readiness before AI deployment. AGIX builds the knowledge infrastructure — RAG systems, governance frameworks, knowledge capture programs, and active knowledge agents — that move organizations from Stage 1 to Stage 5.</p>
              <Link href="/author/santosh/" className="text-xs text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 mt-1" data-testid="link-author-bio">
                Read full bio <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function EnterpriseKnowledgeIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <DefinitionBlock />
        <WhyNowSection />
        <ComparisonTable />
        <ThreeTypesOfKnowledge />
        <KnowledgeMaturityModel />
        <KnowledgeAsFoundation />
        <IndustryApplications />
        <ImplementationBridge />
        <FutureTrajectory />
        <FAQSection faqs={documentFAQs['enterprise-knowledge-ai']} title="Enterprise Knowledge Intelligence: Questions Answered" />
        <section id="cta-form" className="py-10 lg:py-14 bg-gradient-to-br from-primary/10 via-background to-amber-500/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CtaForm headline="Ready to Build Your Knowledge Foundation?" subheadline="Tell us where you are on the Knowledge Intelligence Maturity Model. We'll assess your knowledge infrastructure and design the path to Stage 3 and beyond." />
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}
