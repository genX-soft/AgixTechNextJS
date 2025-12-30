"use client";

import { AssessmentWizard, AssessmentConfig } from "@/components/assessment-wizard";

const config: AssessmentConfig = {
  title: "AI Starting Point Finder",
  subtitle: "Not sure where to begin with AI? Let us help you find the right starting point for your situation.",
  intro: "This quick assessment will help you understand if AI can help your business and where to begin. No technical knowledge required - just answer honestly about your current situation.",
  questions: [
    {
      id: "business-type",
      question: "What best describes you?",
      options: [
        { value: "solo", label: "Solo founder / Small business owner", score: 1 },
        { value: "non-tech", label: "Non-technical team", score: 2 },
        { value: "professional", label: "Professional / Consultant", score: 2 },
        { value: "other", label: "Other", score: 1 },
      ],
    },
    {
      id: "challenge",
      question: "What's your biggest daily challenge?",
      options: [
        { value: "manual", label: "Too much manual work", score: 2 },
        { value: "visibility", label: "Lack of visibility / insights", score: 3 },
        { value: "support", label: "Customer support overload", score: 3 },
        { value: "scattered", label: "Data scattered everywhere", score: 2 },
        { value: "unsure", label: "Not sure yet", score: 1 },
      ],
    },
    {
      id: "tools",
      question: "Do you currently use digital tools?",
      options: [
        { value: "spreadsheets", label: "Mostly spreadsheets", score: 1 },
        { value: "crm", label: "CRM / ERP / SaaS tools", score: 3 },
        { value: "mix", label: "A mix of tools", score: 2 },
        { value: "minimal", label: "Very minimal", score: 1 },
      ],
    },
    {
      id: "comfort",
      question: "How comfortable are you with technology?",
      options: [
        { value: "basic", label: "Very basic", score: 1 },
        { value: "somewhat", label: "Somewhat comfortable", score: 2 },
        { value: "comfortable", label: "Very comfortable", score: 3 },
      ],
    },
    {
      id: "goals",
      question: "What would success look like?",
      options: [
        { value: "time", label: "Save time", score: 2 },
        { value: "cost", label: "Reduce cost", score: 2 },
        { value: "decisions", label: "Improve decision-making", score: 3 },
        { value: "experience", label: "Improve customer experience", score: 3 },
      ],
    },
  ],
  resultLevels: [
    {
      minScore: 0,
      maxScore: 8,
      level: "Foundational Stage",
      color: "bg-blue-500/20",
      description: "You're at the beginning of your AI journey. This is a great place to start - we'll help you build a strong foundation without overwhelming complexity.",
      whatAiCanDo: [
        "Automate repetitive tasks like data entry and scheduling",
        "Organize information across your tools",
        "Assist with customer queries via simple chatbots",
        "Reduce manual effort without adding complexity",
      ],
      recommendedPath: {
        title: "Start with Operational Intelligence",
        link: "/intelligence/operational",
      },
      journey: {
        now: "Simple AI-powered automation",
        next: "Conversational AI (chat/voice)",
        later: "Decision & analytics systems",
      },
      nextActions: [
        { label: "Explore Simple Automation", link: "/intelligence/operational" },
        { label: "Talk to an Expert", link: "/corporate/contact" },
      ],
    },
    {
      minScore: 9,
      maxScore: 12,
      level: "Early Adoption Stage",
      color: "bg-green-500/20",
      description: "You have some digital foundations in place. You're ready to implement focused AI solutions that can deliver quick wins.",
      whatAiCanDo: [
        "Intelligent workflow automation across tools",
        "Customer-facing chatbots and assistants",
        "Basic data insights and reporting",
        "Process optimization recommendations",
      ],
      recommendedPath: {
        title: "Conversational Intelligence",
        link: "/intelligence/conversational",
      },
      journey: {
        now: "Chatbots and workflow automation",
        next: "Predictive analytics",
        later: "Advanced decision systems",
      },
      nextActions: [
        { label: "Explore Conversational AI", link: "/intelligence/conversational" },
        { label: "View Case Studies", link: "/case-studies" },
      ],
    },
    {
      minScore: 13,
      maxScore: 16,
      level: "Ready for Growth",
      color: "bg-primary/20",
      description: "You're well-positioned to leverage AI for significant business impact. Let's explore advanced solutions tailored to your needs.",
      whatAiCanDo: [
        "Advanced decision support systems",
        "Predictive analytics and forecasting",
        "Multi-channel AI assistants",
        "Custom AI solutions for your workflows",
      ],
      recommendedPath: {
        title: "Decision Intelligence",
        link: "/intelligence/decision",
      },
      journey: {
        now: "Decision support and analytics",
        next: "Autonomous AI agents",
        later: "Enterprise-wide AI transformation",
      },
      nextActions: [
        { label: "Explore Decision Intelligence", link: "/intelligence/decision" },
        { label: "Schedule Consultation", link: "/corporate/contact" },
      ],
    },
  ],
};

export default function AIStartingPointPage() {
  return <AssessmentWizard config={config} />;
}
