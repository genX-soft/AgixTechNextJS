import { useState } from "react";
import { motion } from "framer-motion";
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
  Database,
  Brain,
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Search,
  FileText,
  Lock,
  Eye,
  RefreshCw,
  Users,
  Building2,
  Layers,
  Target,
  Zap,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  HeartPulse,
  Landmark,
  Briefcase,
  Code,
  Settings,
  MessageSquare,
  Bot,
  Scale,
  BookOpen,
  Network,
  ClipboardCheck,
  FileSearch,
  ShieldCheck,
  CircleDot,
  Workflow,
} from "lucide-react";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function HeroSection() {
  return (
    <section className="relative pt-24 min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-6 border-indigo-500/50 text-indigo-400">
            <Database className="w-4 h-4 mr-2" />
            Enterprise Knowledge Intelligence
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Enterprise Knowledge Intelligence You Can{" "}
            <span className="text-indigo-400">Trust</span> — Not Just Retrieve
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI systems that understand, govern, and reason over your organization's knowledge — safely and accurately. Agix Technologies transforms documents, data, and institutional knowledge into a trusted, explainable intelligence layer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={() => scrollToSection("cta-form")}
              data-testid="button-hero-primary"
            >
              Find the Right Knowledge Intelligence
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700"
              onClick={() => scrollToSection("what-is-ki")}
              data-testid="button-hero-secondary"
            >
              Explore How Knowledge Intelligence Works
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
          Designed for enterprises that need accurate answers, compliance-ready knowledge, and AI systems they can trust.
        </p>
      </div>
    </section>
  );
}

function WhatIsKnowledgeIntelligence() {
  const searchQueries = [
    "Enterprise knowledge AI",
    "RAG vs knowledge intelligence",
    "How to prevent AI hallucinations",
    "AI knowledge management systems"
  ];

  const capabilities = [
    { text: "Understands knowledge context, not just keywords", icon: Brain },
    { text: "Validates sources before answering", icon: CheckCircle2 },
    { text: "Tracks versions and ownership", icon: RefreshCw },
    { text: "Applies access control and compliance rules", icon: Lock },
    { text: "Explains where answers come from", icon: Eye },
  ];

  return (
    <section id="what-is-ki" className="py-20 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            Definition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Is Enterprise Knowledge Intelligence?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The ability of an organization to store, govern, retrieve, and reason over its knowledge using AI — with accuracy, traceability, and control.
          </p>
        </motion.div>

        <Card className="border-indigo-500/20 mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-indigo-400">
                Knowledge Intelligence ensures AI answers are based on what your organization actually knows — not what a model guesses.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                  <cap.icon className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm">{cap.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            This is why searches like these are rapidly increasing:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {searchQueries.map((query, i) => (
              <Badge key={i} variant="outline" className="border-slate-700">
                <Search className="w-3 h-3 mr-1" />
                {query}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyTraditionalFails() {
  const systems = [
    "Document repositories",
    "Wikis and intranets",
    "Databases and dashboards"
  ];

  const problems = [
    "Information is duplicated",
    "Documents go out of date",
    "No single source of truth exists",
    "AI answers become unreliable",
    "Hallucinations increase"
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
          <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            The Problem
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Traditional Knowledge Systems Fail in the AI Era
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg">Most Organizations Rely On</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systems.map((system, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span>{system}</span>
                </div>
              ))}
              <p className="text-sm text-muted-foreground pt-2">
                But these systems were built for humans to search, not for AI to reason safely.
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-red-400">As a Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {problems.map((problem, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-sm">{problem}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-indigo-500/20 bg-indigo-500/5">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium mb-2">
              "We want to use AI — but we don't trust it with our knowledge."
            </p>
            <p className="text-sm text-muted-foreground">
              Enterprise Knowledge Intelligence exists to solve this trust gap.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function WhyRAGNotEnough() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30">
            Common Misconception
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why RAG Alone Is Not Enough
          </h2>
          <p className="text-muted-foreground">
            A very common search: "Is RAG enough to prevent hallucinations?"
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-slate-700">
            <CardHeader className="pb-2">
              <Badge variant="outline" className="w-fit mb-2">RAG</Badge>
              <CardTitle className="text-lg">Retrieval-Augmented Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                RAG is a component, not a solution. It retrieves content.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  Fast, but unsafe
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  Accurate sometimes, unreliable often
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-500/20">
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2 bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                Knowledge Intelligence
              </Badge>
              <CardTitle className="text-lg">Ensures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "The right content is retrieved",
                "The content is trusted",
                "The content is up to date",
                "The content is permitted for the user",
                "The reasoning is explainable"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-medium text-indigo-400">
            AGIX treats RAG as infrastructure, not intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}

function KnowledgeTypesSection() {
  const types = [
    {
      title: "Structured Knowledge",
      icon: Database,
      items: ["Databases", "Policies", "Product specs", "Configuration data"]
    },
    {
      title: "Unstructured Knowledge",
      icon: FileText,
      items: ["PDFs and documents", "Emails and conversations", "Support tickets", "Training material"]
    },
    {
      title: "Tacit & Institutional Knowledge",
      icon: Brain,
      items: ["Process know-how", "Decision rationale", "Historical context", "Exceptions and edge cases"]
    }
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
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            Knowledge Types
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What "Knowledge" Actually Means in an Enterprise
          </h2>
          <p className="text-muted-foreground">
            Enterprise knowledge is not just documents.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {types.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-slate-700 hover:border-indigo-500/30 transition-colors">
                <CardHeader>
                  <type.icon className="w-8 h-8 text-indigo-400 mb-2" />
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {type.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CircleDot className="w-3 h-3 text-indigo-400" />
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-medium text-indigo-400">
            Enterprise Knowledge Intelligence unifies all three — safely.
          </p>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const comparisons = [
    {
      category: "Search",
      items: ["Finds documents", "No reasoning", "No trust validation"],
      status: "basic"
    },
    {
      category: "RAG",
      items: ["Retrieves content for LLMs", "Limited governance"],
      status: "partial"
    },
    {
      category: "Knowledge Intelligence",
      items: [
        "Governs knowledge sources",
        "Controls access and versions",
        "Enables reasoning with citations",
        "Prevents hallucinations",
        "Supports enterprise compliance"
      ],
      status: "complete"
    }
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
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Search vs RAG vs Knowledge Intelligence
          </h2>
          <p className="text-muted-foreground">
            A highly searched comparison — and the key to understanding enterprise AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {comparisons.map((comp, i) => (
            <Card 
              key={i} 
              className={`${
                comp.status === "complete" 
                  ? "border-indigo-500/30 bg-indigo-500/5" 
                  : comp.status === "partial"
                  ? "border-amber-500/20"
                  : "border-slate-700"
              }`}
            >
              <CardHeader>
                <CardTitle className={`text-xl ${comp.status === "complete" ? "text-indigo-400" : ""}`}>
                  {comp.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {comp.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm">
                    {comp.status === "complete" ? (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                    ) : comp.status === "partial" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    )}
                    <span className={comp.status === "basic" ? "text-muted-foreground" : ""}>
                      {item}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Knowledge Intelligence is the trust layer for AI.
          </Badge>
        </div>
      </div>
    </section>
  );
}

function WhyKICritical() {
  const withoutKI = [
    "Conversational AI gives inconsistent answers",
    "Decision Intelligence relies on incomplete context",
    "Agentic Systems take unsafe actions"
  ];

  const withKI = [
    "Answers are grounded",
    "Decisions are explainable",
    "Agents act responsibly",
    "Compliance is maintained"
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
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            Foundation Layer
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Knowledge Intelligence Is Critical for AI Systems
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-red-400">Without Knowledge Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {withoutKI.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-400">With Knowledge Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {withKI.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-indigo-500/5">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-medium text-indigo-400">
            This layer is what makes AI enterprise-ready.
          </p>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const layers = [
    {
      number: "1",
      title: "Knowledge Source Layer",
      subtitle: "Defining What Counts as Truth",
      description: "Identifies and classifies authoritative knowledge sources.",
      items: ["Policies and compliance documents", "Product documentation", "Contracts and legal texts", "SOPs and internal manuals"],
      tags: ["Ownership", "Version", "Validity period", "Approval status"]
    },
    {
      number: "2",
      title: "Knowledge Structuring & Indexing Layer",
      subtitle: "Preparing Knowledge for Reasoning",
      description: "Raw documents are not AI-ready. This layer prepares them.",
      items: ["Breaks content into semantically meaningful units", "Preserves context and hierarchy", "Links related knowledge across sources", "Applies metadata (domain, risk, sensitivity)"]
    },
    {
      number: "3",
      title: "Governance & Access Control Layer",
      subtitle: "Enforcing Enterprise Rules",
      description: "Where most RAG systems fail — and where AGIX leads.",
      items: ["Role-based access (who can see what)", "Data sensitivity rules", "Regulatory constraints", "Audit and logging requirements"]
    },
    {
      number: "4",
      title: "Retrieval, Reasoning & Validation Layer",
      subtitle: "Producing Trusted Answers",
      description: "Controls how AI answers questions, not just what it retrieves.",
      items: ["Only authorized, relevant knowledge is retrieved", "Multiple sources are cross-validated", "Conflicts are flagged, not hidden", "Answers include citations and reasoning context"]
    },
    {
      number: "5",
      title: "Knowledge Feedback & Validation Layer",
      subtitle: "Keeping Knowledge Accurate",
      description: "Enterprise knowledge is never static.",
      items: ["Tracks usage patterns", "Detects outdated or conflicting content", "Flags content needing review", "Maintains version history"]
    }
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
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            Architecture
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The AGIX Enterprise Knowledge Intelligence Architecture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A five-layer architecture ensuring accuracy, traceability, and compliance.
          </p>
        </motion.div>

        <div className="space-y-6">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-slate-700 hover:border-indigo-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                      {layer.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{layer.title}</h3>
                      <p className="text-sm text-indigo-400 mb-2">{layer.subtitle}</p>
                      <p className="text-sm text-muted-foreground mb-4">{layer.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {layer.items.map((item, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                      {layer.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {layer.tags.map((tag, j) => (
                            <Badge key={j} variant="outline" className="border-indigo-500/30 text-indigo-400 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
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
    { title: "Knowledge Audit", description: "Identify authoritative vs informal knowledge." },
    { title: "Trust Mapping", description: "Define ownership, approval, and validity." },
    { title: "Governance Design", description: "Apply access, compliance, and audit rules." },
    { title: "Reasoning Layer Engineering", description: "Ensure explainable, citation-backed answers." },
    { title: "Continuous Validation", description: "Keep knowledge fresh and reliable." }
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
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            AGIX Method
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How AGIX Engineers Knowledge Intelligence
          </h2>
          <p className="text-muted-foreground">
            We don't start with embeddings or vector stores. We follow a disciplined approach.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-slate-700 text-center">
                <CardContent className="p-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold mx-auto mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-lg font-medium text-indigo-400">
            This ensures enterprise-grade trust from day one.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReadinessAssessmentTool() {
  const [step, setStep] = useState(1);
  const [knowledgeTypes, setKnowledgeTypes] = useState<string[]>([]);
  const [hasOwners, setHasOwners] = useState<boolean | null>(null);
  const [versioningEnforced, setVersioningEnforced] = useState<boolean | null>(null);
  const [hasConfidentialData, setHasConfidentialData] = useState<boolean | null>(null);
  const [complianceRequired, setComplianceRequired] = useState<boolean | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateScore = () => {
    let score = 40;
    if (knowledgeTypes.length >= 3) score += 10;
    if (hasOwners) score += 15;
    if (versioningEnforced) score += 15;
    if (hasConfidentialData) score += 10;
    if (complianceRequired) score += 10;
    return Math.min(100, score);
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { level: "High Readiness", color: "text-green-400", recommendation: "Ready for Knowledge Intelligence deployment" };
    if (score >= 60) return { level: "Moderate Readiness", color: "text-amber-400", recommendation: "Address governance gaps before AI deployment" };
    return { level: "Low Readiness", color: "text-red-400", recommendation: "Foundational governance work needed first" };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const reset = () => {
    setStep(1);
    setKnowledgeTypes([]);
    setHasOwners(null);
    setVersioningEnforced(null);
    setHasConfidentialData(null);
    setComplianceRequired(null);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const readiness = getReadinessLevel(score);
    return (
      <Card className="border-indigo-500/20">
        <CardHeader>
          <CardTitle className="text-lg">Your Knowledge Readiness Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-400 mb-2">{score}%</div>
            <div className={`text-lg font-semibold ${readiness.color}`}>{readiness.level}</div>
          </div>
          <Progress value={score} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">{readiness.recommendation}</p>
          <Button onClick={reset} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-500/20">
      <CardHeader>
        <CardTitle className="text-lg">Knowledge Readiness Assessment</CardTitle>
        <CardDescription>Step {step} of 3</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 1 && (
          <>
            <p className="text-sm text-muted-foreground">What types of knowledge does your organization have?</p>
            <div className="grid grid-cols-2 gap-2">
              {["Policies/SOPs", "Product docs", "Contracts", "Support content", "Training", "Databases"].map((type) => (
                <Button
                  key={type}
                  variant={knowledgeTypes.includes(type) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setKnowledgeTypes(prev => 
                    prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
            <Button onClick={() => setStep(2)} disabled={knowledgeTypes.length === 0} className="w-full">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-muted-foreground">Trust & Ownership</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-2">Do documents have clear owners?</p>
                <div className="flex gap-2">
                  <Button size="sm" variant={hasOwners === true ? "default" : "outline"} onClick={() => setHasOwners(true)}>Yes</Button>
                  <Button size="sm" variant={hasOwners === false ? "default" : "outline"} onClick={() => setHasOwners(false)}>No</Button>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Is versioning enforced?</p>
                <div className="flex gap-2">
                  <Button size="sm" variant={versioningEnforced === true ? "default" : "outline"} onClick={() => setVersioningEnforced(true)}>Yes</Button>
                  <Button size="sm" variant={versioningEnforced === false ? "default" : "outline"} onClick={() => setVersioningEnforced(false)}>No</Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={() => setStep(3)} disabled={hasOwners === null || versioningEnforced === null} className="flex-1">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-sm text-muted-foreground">Access & Compliance</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-2">Presence of confidential or regulated data?</p>
                <div className="flex gap-2">
                  <Button size="sm" variant={hasConfidentialData === true ? "default" : "outline"} onClick={() => setHasConfidentialData(true)}>Yes</Button>
                  <Button size="sm" variant={hasConfidentialData === false ? "default" : "outline"} onClick={() => setHasConfidentialData(false)}>No</Button>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Audit or compliance requirements?</p>
                <div className="flex gap-2">
                  <Button size="sm" variant={complianceRequired === true ? "default" : "outline"} onClick={() => setComplianceRequired(true)}>Yes</Button>
                  <Button size="sm" variant={complianceRequired === false ? "default" : "outline"} onClick={() => setComplianceRequired(false)}>No</Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
              <Button onClick={handleSubmit} disabled={hasConfidentialData === null || complianceRequired === null} className="flex-1 bg-indigo-500 hover:bg-indigo-600">
                Get Results
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function HallucinationRiskTool() {
  const [sourceReliability, setSourceReliability] = useState([50]);
  const [contentFreshness, setContentFreshness] = useState([50]);
  const [semanticClarity, setSemanticClarity] = useState([50]);
  const [showResults, setShowResults] = useState(false);

  const calculateRisk = () => {
    const avgScore = (sourceReliability[0] + contentFreshness[0] + semanticClarity[0]) / 3;
    return Math.round(100 - avgScore);
  };

  const getRiskLevel = (risk: number) => {
    if (risk >= 70) return { level: "High Risk", color: "text-red-400" };
    if (risk >= 40) return { level: "Moderate Risk", color: "text-amber-400" };
    return { level: "Low Risk", color: "text-green-400" };
  };

  if (showResults) {
    const risk = calculateRisk();
    const riskLevel = getRiskLevel(risk);
    return (
      <Card className="border-indigo-500/20">
        <CardHeader>
          <CardTitle className="text-lg">Hallucination Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${riskLevel.color} mb-2`}>{risk}%</div>
            <div className={`text-lg font-semibold ${riskLevel.color}`}>{riskLevel.level}</div>
          </div>
          <Progress value={risk} className="h-2" />
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">Recommendations:</p>
            {risk >= 40 && <p>- Implement source validation controls</p>}
            {contentFreshness[0] < 50 && <p>- Update stale documentation</p>}
            {semanticClarity[0] < 50 && <p>- Clarify terminology inconsistencies</p>}
          </div>
          <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Analyze Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-500/20">
      <CardHeader>
        <CardTitle className="text-lg">Hallucination Risk Analyzer</CardTitle>
        <CardDescription>Assess where AI could generate incorrect answers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm mb-2 block">Source Reliability</label>
          <Slider value={sourceReliability} onValueChange={setSourceReliability} max={100} step={10} />
          <p className="text-xs text-muted-foreground mt-1">{sourceReliability[0]}% - Approved vs informal content</p>
        </div>
        <div>
          <label className="text-sm mb-2 block">Content Freshness</label>
          <Slider value={contentFreshness} onValueChange={setContentFreshness} max={100} step={10} />
          <p className="text-xs text-muted-foreground mt-1">{contentFreshness[0]}% - How current is your documentation</p>
        </div>
        <div>
          <label className="text-sm mb-2 block">Semantic Clarity</label>
          <Slider value={semanticClarity} onValueChange={setSemanticClarity} max={100} step={10} />
          <p className="text-xs text-muted-foreground mt-1">{semanticClarity[0]}% - Consistency of terminology</p>
        </div>
        <Button onClick={() => setShowResults(true)} className="w-full bg-indigo-500 hover:bg-indigo-600">
          Analyze Risk
        </Button>
      </CardContent>
    </Card>
  );
}

function AccessControlTool() {
  const [roles, setRoles] = useState<string[]>([]);
  const [sensitivity, setSensitivity] = useState("");
  const [regulations, setRegulations] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (showResults) {
    return (
      <Card className="border-indigo-500/20">
        <CardHeader>
          <CardTitle className="text-lg">Access Control Blueprint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-indigo-500/10">
              <div className="flex items-center gap-2 text-indigo-400 font-medium mb-1">
                <Lock className="w-4 h-4" />
                Role-Based Access
              </div>
              <p className="text-sm text-muted-foreground">{roles.length} role types identified</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10">
              <div className="flex items-center gap-2 text-amber-400 font-medium mb-1">
                <Shield className="w-4 h-4" />
                Compliance Requirements
              </div>
              <p className="text-sm text-muted-foreground">{regulations.length > 0 ? regulations.join(", ") : "Standard controls"}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50">
              <div className="flex items-center gap-2 font-medium mb-1">
                <Eye className="w-4 h-4" />
                Audit Trail
              </div>
              <p className="text-sm text-muted-foreground">Full logging recommended for {sensitivity} sensitivity</p>
            </div>
          </div>
          <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-500/20">
      <CardHeader>
        <CardTitle className="text-lg">Access Control Mapper</CardTitle>
        <CardDescription>Design who can see what</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm mb-2 block">User Roles</label>
          <div className="flex flex-wrap gap-2">
            {["Employee", "Manager", "Legal", "Support", "Customer"].map((role) => (
              <Button
                key={role}
                size="sm"
                variant={roles.includes(role) ? "default" : "outline"}
                onClick={() => setRoles(prev => 
                  prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
                )}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm mb-2 block">Knowledge Sensitivity</label>
          <Select value={sensitivity} onValueChange={setSensitivity}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Public information</SelectItem>
              <SelectItem value="medium">Medium - Internal only</SelectItem>
              <SelectItem value="high">High - Confidential</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm mb-2 block">Regulatory Exposure</label>
          <div className="flex flex-wrap gap-2">
            {["GDPR", "HIPAA", "SOC 2", "PCI"].map((reg) => (
              <Button
                key={reg}
                size="sm"
                variant={regulations.includes(reg) ? "default" : "outline"}
                onClick={() => setRegulations(prev => 
                  prev.includes(reg) ? prev.filter(r => r !== reg) : [...prev, reg]
                )}
              >
                {reg}
              </Button>
            ))}
          </div>
        </div>
        <Button 
          onClick={() => setShowResults(true)} 
          disabled={roles.length === 0 || !sensitivity}
          className="w-full bg-indigo-500 hover:bg-indigo-600"
        >
          Generate Blueprint
        </Button>
      </CardContent>
    </Card>
  );
}

function MaturityMapTool() {
  const [currentStage, setCurrentStage] = useState<number | null>(null);

  const stages = [
    { level: 1, title: "Document Repositories", desc: "Scattered files, manual search", risk: "High duplication, no AI readiness" },
    { level: 2, title: "Search & Wikis", desc: "Keyword-based retrieval, no reasoning", risk: "Limited discoverability" },
    { level: 3, title: "RAG-Enabled Search", desc: "Faster answers, limited governance", risk: "Hallucination risk, no access control" },
    { level: 4, title: "Governed Knowledge Intelligence", desc: "Trusted sources, explainable answers, compliance-ready", risk: "Enterprise AI ready" }
  ];

  return (
    <Card className="border-indigo-500/20">
      <CardHeader>
        <CardTitle className="text-lg">Knowledge Maturity Map</CardTitle>
        <CardDescription>Where does your organization stand?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage, i) => (
          <div 
            key={i}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              currentStage === stage.level 
                ? "bg-indigo-500/20 border border-indigo-500/30" 
                : "bg-slate-800/50 hover:bg-slate-800"
            }`}
            onClick={() => setCurrentStage(stage.level)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStage === stage.level ? "bg-indigo-500 text-white" : "bg-slate-700"
              }`}>
                {stage.level}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{stage.title}</h4>
                <p className="text-xs text-muted-foreground">{stage.desc}</p>
              </div>
            </div>
            {currentStage === stage.level && (
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-xs"><span className="text-indigo-400">Status:</span> {stage.risk}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ROIEstimatorTool() {
  const [searchHours, setSearchHours] = useState([5]);
  const [errorFrequency, setErrorFrequency] = useState([10]);
  const [teamSize, setTeamSize] = useState([20]);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const timeSaved = searchHours[0] * teamSize[0] * 4 * 12;
    const errorReduction = errorFrequency[0] * 500 * 12;
    const totalSavings = timeSaved * 50 + errorReduction;
    return { timeSaved, errorReduction: errorFrequency[0] * 60, totalSavings };
  };

  if (showResults) {
    const roi = calculateROI();
    return (
      <Card className="border-indigo-500/20">
        <CardHeader>
          <CardTitle className="text-lg">Knowledge Intelligence ROI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-indigo-500/10">
              <Clock className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-indigo-400">{roi.timeSaved}h</div>
              <p className="text-xs text-muted-foreground">Hours saved/year</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-500/10">
              <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <div className="text-xl font-bold text-green-400">{roi.errorReduction}%</div>
              <p className="text-xs text-muted-foreground">Error reduction</p>
            </div>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-800/50">
            <DollarSign className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-indigo-400">${roi.totalSavings.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Estimated annual savings</p>
          </div>
          <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Recalculate
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-500/20">
      <CardHeader>
        <CardTitle className="text-lg">ROI & Risk Reduction Estimator</CardTitle>
        <CardDescription>Quantify the value of trusted knowledge</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm mb-2 block">Hours spent searching for info (per person/week)</label>
          <Slider value={searchHours} onValueChange={setSearchHours} max={20} step={1} />
          <p className="text-xs text-muted-foreground mt-1">{searchHours[0]} hours/week</p>
        </div>
        <div>
          <label className="text-sm mb-2 block">Frequency of incorrect answers (%)</label>
          <Slider value={errorFrequency} onValueChange={setErrorFrequency} max={50} step={5} />
          <p className="text-xs text-muted-foreground mt-1">{errorFrequency[0]}% error rate</p>
        </div>
        <div>
          <label className="text-sm mb-2 block">Team size</label>
          <Slider value={teamSize} onValueChange={setTeamSize} max={200} step={10} />
          <p className="text-xs text-muted-foreground mt-1">{teamSize[0]} people</p>
        </div>
        <Button onClick={() => setShowResults(true)} className="w-full bg-indigo-500 hover:bg-indigo-600">
          Calculate ROI
        </Button>
      </CardContent>
    </Card>
  );
}

function InteractiveToolsSection() {
  const [activeTool, setActiveTool] = useState(0);

  const tools = [
    { title: "Readiness Assessment", icon: ClipboardCheck, component: ReadinessAssessmentTool },
    { title: "Hallucination Risk", icon: AlertTriangle, component: HallucinationRiskTool },
    { title: "Access Control", icon: Lock, component: AccessControlTool },
    { title: "Maturity Map", icon: Layers, component: MaturityMapTool },
    { title: "ROI Estimator", icon: BarChart3, component: ROIEstimatorTool },
  ];

  const ActiveComponent = tools[activeTool].component;

  return (
    <section id="interactive-tools" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            Interactive Tools
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enterprise Knowledge Intelligence Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Helping enterprises build Knowledge AI that is accurate, governed, and trusted.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tools.map((tool, i) => (
            <Button
              key={i}
              variant={activeTool === i ? "default" : "outline"}
              className={activeTool === i ? "bg-indigo-500 hover:bg-indigo-600" : ""}
              onClick={() => setActiveTool(i)}
            >
              <tool.icon className="w-4 h-4 mr-2" />
              {tool.title}
            </Button>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
}

function IndustryUseCases() {
  const industries = [
    {
      name: "Healthcare & Life Sciences",
      icon: HeartPulse,
      useCases: ["Clinical protocols and SOPs", "Patient communication guidelines", "Compliance documentation", "Internal training and reference"],
      why: "High risk of misinformation, regulatory scrutiny, strict access control",
      outcome: "Accurate, explainable answers. Reduced staff dependency. Safer AI adoption."
    },
    {
      name: "Finance, Lending & Insurance",
      icon: Landmark,
      useCases: ["Policy interpretation", "Product and eligibility rules", "Compliance and audit references", "Internal advisory support"],
      why: "Financial and legal exposure, bias concerns, audit requirements",
      outcome: "Consistent interpretations. Reduced compliance risk. Full traceability."
    },
    {
      name: "Enterprise, Legal & Compliance",
      icon: Scale,
      useCases: ["Contracts and legal guidance", "Internal policies", "Regulatory frameworks", "Decision justification"],
      why: "Zero tolerance for hallucinations, high accountability",
      outcome: "Trusted AI assistance. Explainable responses. Compliance-ready AI systems."
    },
    {
      name: "SaaS & Technology",
      icon: Code,
      useCases: ["Product documentation", "Support knowledge bases", "Engineering references", "Customer-facing AI assistants"],
      why: "Fast-changing information, risk of outdated answers",
      outcome: "Accurate customer responses. Faster onboarding. Reduced support load."
    },
    {
      name: "Enterprise Operations",
      icon: Building2,
      useCases: ["HR and IT policies", "Internal workflows", "Training material", "Process documentation"],
      why: "Operational consistency, reduced dependency on individuals",
      outcome: "Faster internal support. Consistent answers. Scalable internal AI."
    }
  ];

  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            Industry Applications
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Knowledge Intelligence by Industry
          </h2>
          <p className="text-muted-foreground">
            One trust architecture. Applied to very different risk environments.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {industries.map((ind, i) => (
            <Button
              key={i}
              variant={activeIndustry === i ? "default" : "outline"}
              className={activeIndustry === i ? "bg-indigo-500 hover:bg-indigo-600" : ""}
              onClick={() => setActiveIndustry(i)}
            >
              <ind.icon className="w-4 h-4 mr-2" />
              {ind.name.split(" ")[0]}
            </Button>
          ))}
        </div>

        <Card className="border-indigo-500/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = industries[activeIndustry].icon;
                return <Icon className="w-8 h-8 text-indigo-400" />;
              })()}
              <CardTitle>{industries[activeIndustry].name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Knowledge Use Cases</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {industries[activeIndustry].useCases.map((uc, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    {uc}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-amber-500/10">
                <h4 className="font-medium text-amber-400 mb-2">Why Knowledge Intelligence Matters</h4>
                <p className="text-sm text-muted-foreground">{industries[activeIndustry].why}</p>
              </div>
              <div className="p-4 rounded-lg bg-indigo-500/10">
                <h4 className="font-medium text-indigo-400 mb-2">Outcome</h4>
                <p className="text-sm text-muted-foreground">{industries[activeIndustry].outcome}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "What is Enterprise Knowledge Intelligence in simple terms?", a: "It ensures AI answers are accurate, explainable, and based only on trusted enterprise knowledge, not guesses." },
    { q: "Is Enterprise Knowledge Intelligence just RAG?", a: "No. RAG is a retrieval method. Knowledge Intelligence adds governance, validation, access control, and trust." },
    { q: "Why do AI systems hallucinate even with RAG?", a: "Because the underlying knowledge is unverified, outdated, or conflicting. Hallucinations are often knowledge problems, not model problems." },
    { q: "How does Knowledge Intelligence prevent hallucinations?", a: "By enforcing source validation, version control, role-based access, multi-source verification, and explainable answers." },
    { q: "Can Knowledge Intelligence work with our existing documents?", a: "Yes. AGIX builds intelligence layers on top of your existing knowledge sources, not replacements." },
    { q: "Do we need to clean all our data before using Knowledge Intelligence?", a: "No. The system helps identify what is trustworthy and what needs cleanup, instead of blocking adoption." },
    { q: "How does it handle sensitive or confidential data?", a: "Through role-based access, data segmentation, audit logging, and compliance-aware retrieval. AI only sees what it is allowed to see." },
    { q: "Is it safe for regulated industries?", a: "Yes — when designed with governance, auditability, and explainability, which AGIX prioritizes." },
    { q: "How is this different from enterprise search?", a: "Search finds documents. Knowledge Intelligence answers questions with verified, governed knowledge." },
    { q: "Can it support conversational AI and agents?", a: "Yes. It is the foundation layer that makes conversational AI and agentic systems safe and reliable." },
    { q: "How long does it take to implement?", a: "Initial value can be achieved in 4–6 weeks, with expansion over time." },
    { q: "Is Knowledge Intelligence expensive?", a: "It is often less costly than the risk of wrong AI answers, compliance errors, or stalled AI adoption." },
    { q: "Who owns and approves knowledge in these systems?", a: "Ownership, approval, and validity are explicitly defined as part of the system design." },
    { q: "Can we see where an AI answer came from?", a: "Yes. Answers include citations, sources, and reasoning context." },
    { q: "What happens when knowledge is outdated or conflicting?", a: "The system flags uncertainty, escalates for review, or provides qualified responses — instead of guessing." },
    { q: "Does Knowledge Intelligence replace human expertise?", a: "No. It preserves and scales institutional knowledge, reducing dependency on individuals." },
    { q: "Is this suitable for internal AI assistants?", a: "Absolutely. Internal AI is often where Knowledge Intelligence delivers the fastest ROI." },
    { q: "What is the biggest mistake companies make with RAG?", a: "Deploying RAG without governance, ownership, or validation." },
    { q: "Can small or mid-sized enterprises use this?", a: "Yes. Growing organizations benefit greatly from structured, trusted knowledge early." },
    { q: "How do we start safely?", a: "Start with a knowledge audit, trust and access mapping, and controlled scope. Then expand gradually." }
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/30">
            FAQs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Enterprise Knowledge Intelligence Questions
          </h2>
          <p className="text-muted-foreground">
            Based on Google searches, LLM queries, and enterprise buying concerns.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-700 rounded-lg px-4">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-sm font-medium">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.a}
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
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trust Is the Real Intelligence
          </h2>
          <p className="text-xl text-indigo-400 font-medium mb-4">
            AI Is Only As Smart As the Knowledge It Can Trust.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Agix Technologies helps enterprises build Knowledge Intelligence systems that make AI accurate, explainable, and safe to scale.
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
          <Card className="border-indigo-500/20 shadow-2xl shadow-indigo-500/5">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Schedule a Knowledge Intelligence Consultation</CardTitle>
              <CardDescription className="text-base">
                Learn how trusted knowledge can power accurate, explainable AI in your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CtaForm 
                headline="Ready to Build Trusted Knowledge AI?"
                subheadline="Talk to our Knowledge Intelligence architects about your specific challenges."
                badgeText="Enterprise Knowledge Intelligence"
                submitLabel="Schedule Consultation"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default function EnterpriseKnowledgePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <HeroSection />
      <TrustStrip />
      <WhatIsKnowledgeIntelligence />
      <WhyTraditionalFails />
      <WhyRAGNotEnough />
      <KnowledgeTypesSection />
      <ComparisonSection />
      <WhyKICritical />
      <ArchitectureSection />
      <AgixMethodology />
      <InteractiveToolsSection />
      <IndustryUseCases />
      <FAQSection />
      <ClosingValueSection />
      <FinalCTASection />
    </div>
  );
}
