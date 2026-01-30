"use client";

import { AssessmentWizard, AssessmentConfig } from "@/components/assessment-wizard";

const config: AssessmentConfig = {
  title: "Enterprise AI Strategy Navigator",
  subtitle: "Assess readiness, identify risks, and plan your enterprise AI journey strategically.",
  intro: "This assessment helps enterprise teams evaluate AI readiness, identify governance gaps, and sequence adoption to avoid fragmented implementation. Answer based on your organization's current state.",
  questions: [
    {
      id: "org-type",
      question: "What type of organization are you?",
      options: [
        { value: "enterprise", label: "Enterprise", score: 2 },
        { value: "regulated", label: "Regulated industry", score: 3 },
        { value: "multi-region", label: "Multi-region operations", score: 3 },
      ],
    },
    {
      id: "ai-status",
      question: "What's your current AI status?",
      options: [
        { value: "none", label: "No AI yet", score: 1 },
        { value: "pilot", label: "Pilot projects", score: 2 },
        { value: "disconnected", label: "Disconnected AI tools", score: 2 },
        { value: "scaling", label: "Scaling AI", score: 3 },
      ],
    },
    {
      id: "concerns",
      question: "What's your primary concern with AI adoption?",
      options: [
        { value: "security", label: "Data security", score: 3 },
        { value: "compliance", label: "Compliance", score: 3 },
        { value: "integration", label: "Integration complexity", score: 2 },
        { value: "governance", label: "Governance", score: 3 },
        { value: "roi", label: "ROI visibility", score: 2 },
      ],
    },
    {
      id: "data",
      question: "How would you describe your data landscape?",
      options: [
        { value: "centralized", label: "Centralized", score: 3 },
        { value: "fragmented", label: "Fragmented", score: 1 },
        { value: "mixed", label: "Mixed legacy + modern", score: 2 },
      ],
    },
    {
      id: "ownership",
      question: "Who owns AI decisions in your organization?",
      options: [
        { value: "it", label: "IT-led", score: 2 },
        { value: "business", label: "Business-led", score: 2 },
        { value: "joint", label: "Joint governance", score: 3 },
      ],
    },
  ],
  resultLevels: [
    {
      minScore: 0,
      maxScore: 8,
      level: "Early / Fragmented",
      color: "bg-amber-500/20",
      description: "Your AI adoption is early-stage or fragmented. Focus on establishing foundations before scaling to avoid technical debt and governance gaps.",
      whatAiCanDo: [
        "Establish AI governance framework",
        "Controlled pilot deployments",
        "Data consolidation and preparation",
        "Risk assessment and mitigation planning",
      ],
      recommendedPath: {
        title: "Enterprise AI Readiness Framework",
        link: "/intelligence/enterprise-knowledge-ai/",
      },
      journey: {
        now: "Readiness & risk assessment",
        next: "Controlled AI deployment",
        later: "Agentic & decision systems",
      },
      nextActions: [
        { label: "Enterprise Readiness", link: "/intelligence/enterprise-knowledge-ai/" },
        { label: "Talk to AI Architect", link: "/corporate/contact/" },
      ],
    },
    {
      minScore: 9,
      maxScore: 11,
      level: "Intermediate / Building",
      color: "bg-blue-500/20",
      description: "You have foundations but need to address governance and integration challenges before scaling further.",
      whatAiCanDo: [
        "Unified AI orchestration layer",
        "Cross-system integration patterns",
        "Governance and compliance automation",
        "Measurable AI deployment framework",
      ],
      recommendedPath: {
        title: "Enterprise Knowledge Intelligence",
        link: "/intelligence/enterprise-knowledge-ai/",
      },
      journey: {
        now: "Governance & orchestration",
        next: "Scaled deployment",
        later: "Autonomous enterprise AI",
      },
      nextActions: [
        { label: "Knowledge Intelligence", link: "/intelligence/enterprise-knowledge-ai/" },
        { label: "Request Architecture Review", link: "/corporate/contact/" },
      ],
    },
    {
      minScore: 12,
      maxScore: 17,
      level: "Advanced / Ready to Scale",
      color: "bg-primary/20",
      description: "Strong foundations in place. You're ready for enterprise-wide AI transformation with proper governance and measurable outcomes.",
      whatAiCanDo: [
        "Enterprise-wide AI deployment",
        "Agentic systems for complex workflows",
        "Advanced decision intelligence",
        "AI-powered business transformation",
      ],
      recommendedPath: {
        title: "Agentic AI Systems",
        link: "/intelligence/autonomous-agentic-ai/",
      },
      journey: {
        now: "Scaled AI deployment",
        next: "Autonomous systems",
        later: "AI-native enterprise",
      },
      nextActions: [
        { label: "Agentic AI Systems", link: "/intelligence/autonomous-agentic-ai/" },
        { label: "Enterprise Consultation", link: "/corporate/contact/" },
      ],
    },
  ],
};

export default function EnterpriseStrategyPage() {
  return <AssessmentWizard config={config} />;
}
