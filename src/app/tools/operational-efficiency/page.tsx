"use client";

import { AssessmentWizard, AssessmentConfig } from "@/components/assessment-wizard";

const config: AssessmentConfig = {
  title: "Operational Efficiency Analyzer",
  subtitle: "Identify where AI can reduce costs and improve margins in your growing business.",
  intro: "This assessment helps SMBs identify cost and time leakage in operations, and shows exactly where AI delivers the highest ROI. Answer based on your current operations.",
  questions: [
    {
      id: "size",
      question: "What's your business size?",
      options: [
        { value: "small", label: "10-25 employees", score: 1 },
        { value: "medium", label: "25-100 employees", score: 2 },
        { value: "large", label: "100-300 employees", score: 3 },
      ],
    },
    {
      id: "operations",
      question: "How are tasks handled today?",
      options: [
        { value: "manual", label: "Mostly manual", score: 1 },
        { value: "partial", label: "Partially automated", score: 2 },
        { value: "tool-heavy", label: "Tool-heavy but disconnected", score: 2 },
      ],
    },
    {
      id: "pain-areas",
      question: "Where do you feel the most pain?",
      options: [
        { value: "support", label: "Customer support", score: 3 },
        { value: "reporting", label: "Reporting & analytics", score: 2 },
        { value: "sales", label: "Sales operations", score: 3 },
        { value: "hr", label: "HR / internal ops", score: 2 },
        { value: "finance", label: "Finance / compliance", score: 2 },
      ],
    },
    {
      id: "volume",
      question: "Daily transactions / requests volume?",
      options: [
        { value: "low", label: "Low (under 100)", score: 1 },
        { value: "medium", label: "Medium (100-500)", score: 2 },
        { value: "high", label: "High (500+)", score: 3 },
      ],
    },
    {
      id: "goal",
      question: "What's your primary growth goal?",
      options: [
        { value: "scale", label: "Scale without hiring", score: 3 },
        { value: "margins", label: "Improve margins", score: 2 },
        { value: "quality", label: "Improve service quality", score: 2 },
      ],
    },
  ],
  resultLevels: [
    {
      minScore: 0,
      maxScore: 7,
      level: "Low to Moderate Leakage",
      color: "bg-green-500/20",
      description: "Your operations are relatively efficient. Focus on targeted automation in specific pain points rather than broad transformation.",
      whatAiCanDo: [
        "Automate specific repetitive workflows",
        "Basic reporting automation",
        "Simple customer query handling",
        "Document processing for key areas",
      ],
      recommendedPath: {
        title: "Operational Intelligence",
        link: "/intelligence/operational-ai/",
      },
      journey: {
        now: "Targeted workflow automation",
        next: "Process optimization",
        later: "Predictive operations",
      },
      nextActions: [
        { label: "Operational Intelligence", link: "/intelligence/operational-ai/" },
        { label: "View SMB Cases", link: "/case-studies/" },
      ],
    },
    {
      minScore: 8,
      maxScore: 11,
      level: "Moderate to High Leakage",
      color: "bg-amber-500/20",
      description: "Significant efficiency gains are possible. AI can address multiple pain points and create compound improvements across your operations.",
      whatAiCanDo: [
        "End-to-end workflow automation",
        "Intelligent customer support systems",
        "Predictive insights and reporting",
        "Cross-departmental process optimization",
      ],
      recommendedPath: {
        title: "Operational + Decision Intelligence",
        link: "/intelligence/decision-ai/",
      },
      journey: {
        now: "Workflow automation",
        next: "Predictive insights",
        later: "Agent-assisted operations",
      },
      nextActions: [
        { label: "Decision Intelligence", link: "/intelligence/decision-ai/" },
        { label: "Calculate Savings", link: "/corporate/contact/" },
      ],
    },
    {
      minScore: 12,
      maxScore: 16,
      level: "High Operational Leakage",
      color: "bg-red-500/20",
      description: "There's substantial opportunity to reduce costs and improve efficiency. A comprehensive AI strategy can transform your operations.",
      whatAiCanDo: [
        "Comprehensive automation across operations",
        "AI-powered decision support systems",
        "Autonomous workflow management",
        "Real-time operational intelligence",
      ],
      recommendedPath: {
        title: "Enterprise-Grade AI Transformation",
        link: "/intelligence/enterprise-knowledge-ai/",
      },
      journey: {
        now: "Immediate automation wins",
        next: "Decision intelligence systems",
        later: "Autonomous operations",
      },
      nextActions: [
        { label: "Enterprise Solutions", link: "/intelligence/enterprise-knowledge-ai/" },
        { label: "Request Assessment", link: "/corporate/contact/" },
      ],
    },
  ],
};

export default function OperationalEfficiencyPage() {
  return <AssessmentWizard config={config} />;
}
