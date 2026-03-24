'use client'
import { useState } from "react";
import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Workflow,
  Layers,
  FileText,
  Mail,
  RefreshCw,
  ChevronRight,
  XCircle,
  Target,
  CheckCircle2,
  Cog,
  Clock,
  DollarSign,
} from "lucide-react";

const coreCapabilities = [
  {
    id: "workflow",
    icon: Workflow,
    title: "AI Workflow Automation",
    subtitle: "Intelligent, Cross-System Workflow Automation Using AI",
    definition: "AI Workflow Automation uses artificial intelligence to design, orchestrate, and optimize workflows across multiple business systems — enabling actions, decisions, and routing without manual intervention.",
    problems: [
      "Manual data movement between tools",
      "Delayed approvals and follow-ups",
      "Broken workflows when conditions change",
      "Overdependence on human coordination"
    ],
    useCases: [
      "Lead routing across CRM, email, and sales tools",
      "Customer onboarding automation",
      "Order-to-delivery workflow automation",
      "Internal approval and escalation flows",
      "Cross-department task orchestration"
    ],
    howWeAutomate: [
      "AI-based decision routing (not static rules)",
      "Context-aware triggers",
      "Exception handling using LLMs",
      "Real-time system synchronization"
    ],
    timeline: "4–8 weeks",
    investment: "$15K – $30K+"
  },
  {
    id: "bpa",
    icon: Layers,
    title: "AI Business Process Automation (BPA)",
    subtitle: "End-to-End Process Automation with Decision Intelligence",
    definition: "AI Business Process Automation (BPA) automates entire business processes — not just tasks — using AI to manage decisions, exceptions, and outcomes across multiple stages.",
    problems: [
      "Process delays due to human dependency",
      "High error rates in critical operations",
      "Lack of real-time visibility into process health",
      "Inability to scale without adding staff"
    ],
    useCases: [
      "Claims processing automation",
      "Invoice-to-payment automation",
      "Employee onboarding & offboarding",
      "Vendor onboarding workflows",
      "Regulatory and compliance reporting"
    ],
    howWeAutomate: [
      "Intelligent decision checkpoints",
      "Adaptive logic instead of rigid rules",
      "Human-in-the-loop where required",
      "Continuous process optimization"
    ],
    timeline: "8–12 weeks",
    investment: "$30K – $60K+"
  },
  {
    id: "document",
    icon: FileText,
    title: "Document Intelligence",
    subtitle: "AI-Powered Document Processing & Automation",
    definition: "Document Intelligence uses AI (OCR + NLP + semantic models) to extract, classify, validate, and act on information from unstructured documents.",
    problems: [
      "Manual document review",
      "Data entry errors",
      "Processing delays",
      "Compliance risks"
    ],
    useCases: [
      "Invoice and receipt processing",
      "Contract analysis and extraction",
      "KYC / onboarding document handling",
      "Insurance claims documentation",
      "Report and form digitization"
    ],
    howWeAutomate: [
      "Multi-format OCR (PDFs, scans, images)",
      "Context-aware extraction",
      "Auto-validation against systems",
      "Workflow triggers based on content"
    ],
    timeline: "4–8 weeks",
    investment: "$15K – $35K+"
  },
  {
    id: "email",
    icon: Mail,
    title: "Email & Communication Automation",
    subtitle: "AI-Powered Email Understanding, Action & Response",
    definition: "Email & Communication Automation uses AI to read, understand, categorize, respond to, and trigger workflows from emails and messages — turning inboxes into structured systems.",
    problems: [
      "Inbox overload",
      "Missed follow-ups",
      "Manual ticket creation",
      "Delayed responses"
    ],
    useCases: [
      "Sales inquiry handling",
      "Support request routing",
      "Vendor communication automation",
      "Internal request processing",
      "Follow-up & reminder automation"
    ],
    howWeAutomate: [
      "Intent detection using NLP",
      "Context-aware responses",
      "Action-triggered automation",
      "CRM & system updates"
    ],
    timeline: "3–6 weeks",
    investment: "$12K – $25K+"
  },
  {
    id: "transformation",
    icon: RefreshCw,
    title: "AI-Led Digital Transformation",
    subtitle: "Re-Engineering Operations Around AI Automation",
    definition: "AI-Led Digital Transformation focuses on redesigning business operations with AI automation at the core — not layering AI on top of broken processes.",
    problems: [
      "Tool sprawl without efficiency",
      "Legacy systems slowing growth",
      "Poor ROI from digital investments",
      "Disconnected operations"
    ],
    useCases: [
      "Legacy workflow modernization",
      "Automation-first operating models",
      "AI-enabled shared services",
      "Enterprise process redesign"
    ],
    howWeAutomate: [
      "Process-first redesign",
      "Automation architecture planning",
      "AI governance & controls",
      "Scalable execution roadmap"
    ],
    timeline: "3–6 months",
    investment: "$50K – $150K+"
  }
];

export default function CapabilitiesSection() {
  const [expandedCapability, setExpandedCapability] = useState<string | null>("workflow");

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">
            <Layers className="w-3 h-3 mr-1" />
            Unified Service
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Core Automation Capabilities
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            AGIX delivers AI Automation Services through five tightly integrated capability layers.
            These are not separate offerings — they work together as one automation ecosystem.
          </p>
        </motion.div>

        <div className="space-y-4">
          {coreCapabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  expandedCapability === capability.id
                    ? 'border-primary/50 bg-primary/5'
                    : 'hover-elevate'
                }`}
                onClick={() => setExpandedCapability(
                  expandedCapability === capability.id ? null : capability.id
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        expandedCapability === capability.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10'
                      }`}>
                        <capability.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{capability.title}</h3>
                        <p className="text-sm text-muted-foreground">{capability.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      expandedCapability === capability.id ? 'rotate-90' : ''
                    }`} />
                  </div>

                  {expandedCapability === capability.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-border space-y-6"
                    >
                      <p className="text-muted-foreground">{capability.definition}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-destructive" />
                            Business Problems It Solves
                          </h4>
                          <ul className="space-y-2">
                            {capability.problems.map((problem, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                {problem}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            Common Use Cases
                          </h4>
                          <ul className="space-y-2">
                            {capability.useCases.map((useCase, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Cog className="w-4 h-4 text-primary" />
                          How AGIX Automates
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {capability.howWeAutomate.map((method, i) => (
                            <Badge key={i} variant="outline" className="border-primary/30">
                              {method}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Timeline</p>
                            <p className="font-semibold">{capability.timeline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Investment Range</p>
                            <p className="font-semibold">{capability.investment}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
