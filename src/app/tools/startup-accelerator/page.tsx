"use client";

import { AssessmentWizard, AssessmentConfig } from "@/components/assessment-wizard";

const config: AssessmentConfig = {
  title: "Startup AI Accelerator",
  subtitle: "Moving fast but need AI? Let's find the right approach for your stage and resources.",
  intro: "This assessment helps startups decide what to build vs automate, and how to move fast without overengineering. We'll match AI solutions to your stage and constraints.",
  questions: [
    {
      id: "stage",
      question: "What's your startup stage?",
      options: [
        { value: "idea", label: "Idea / MVP", score: 1 },
        { value: "traction", label: "Early traction", score: 2 },
        { value: "scaling", label: "Scaling product", score: 3 },
        { value: "funded", label: "Post-funding", score: 4 },
      ],
    },
    {
      id: "focus",
      question: "What's your core focus right now?",
      options: [
        { value: "product", label: "Product development", score: 2 },
        { value: "sales", label: "Sales & lead generation", score: 3 },
        { value: "support", label: "Customer support", score: 3 },
        { value: "operations", label: "Operations", score: 2 },
      ],
    },
    {
      id: "team-size",
      question: "What's your team size?",
      options: [
        { value: "tiny", label: "1-5 people", score: 1 },
        { value: "small", label: "6-20 people", score: 2 },
        { value: "medium", label: "20+ people", score: 3 },
      ],
    },
    {
      id: "tech-capability",
      question: "What's your team's technical capability?",
      options: [
        { value: "non-tech", label: "Non-technical", score: 1 },
        { value: "mixed", label: "Mixed", score: 2 },
        { value: "strong", label: "Strong engineering", score: 3 },
      ],
    },
    {
      id: "bottleneck",
      question: "What's slowing you down most?",
      options: [
        { value: "speed", label: "Speed to market", score: 2 },
        { value: "manual", label: "Manual workflows", score: 3 },
        { value: "customers", label: "Customer handling", score: 3 },
        { value: "insights", label: "Data insights", score: 2 },
      ],
    },
    {
      id: "preference",
      question: "Build vs buy preference?",
      options: [
        { value: "ready-made", label: "Prefer ready-made tools", score: 1 },
        { value: "custom", label: "Prefer custom solutions", score: 3 },
        { value: "unsure", label: "Not sure", score: 2 },
      ],
    },
  ],
  resultLevels: [
    {
      minScore: 0,
      maxScore: 10,
      level: "Speed-Focused, Resource-Constrained",
      color: "bg-amber-500/20",
      description: "You need quick wins with minimal overhead. Focus on ready-made AI tools and simple automations that don't require engineering resources.",
      whatAiCanDo: [
        "AI-powered workflow automation (no-code)",
        "Off-the-shelf chatbots for customer support",
        "Internal productivity tools and copilots",
        "Quick integrations with existing stack",
      ],
      recommendedPath: {
        title: "AI Automation + Lightweight Conversational AI",
        link: "/services/chatbots",
      },
      journey: {
        now: "Automation + AI copilots",
        next: "Custom AI features",
        later: "Agentic workflows",
      },
      nextActions: [
        { label: "Explore AI Workflows", link: "/intelligence/operational" },
        { label: "View Startup Cases", link: "/case-studies" },
      ],
    },
    {
      minScore: 11,
      maxScore: 15,
      level: "Growth-Ready, Building Momentum",
      color: "bg-green-500/20",
      description: "You have resources to invest in custom solutions. Focus on AI that differentiates your product and scales with growth.",
      whatAiCanDo: [
        "Custom AI features for your product",
        "Intelligent customer interaction systems",
        "Automated sales and support workflows",
        "Data-driven decision making",
      ],
      recommendedPath: {
        title: "Custom AI Product Development",
        link: "/services/custom-ai-product",
      },
      journey: {
        now: "Custom AI features",
        next: "Advanced automation",
        later: "AI-first product strategy",
      },
      nextActions: [
        { label: "Custom AI Solutions", link: "/services/custom-ai-product" },
        { label: "Talk to Us", link: "/corporate/contact" },
      ],
    },
    {
      minScore: 16,
      maxScore: 22,
      level: "Scale-Ready, AI-First Potential",
      color: "bg-primary/20",
      description: "You're positioned to build AI into your core product. Consider advanced solutions that create lasting competitive advantages.",
      whatAiCanDo: [
        "Agentic AI systems for complex workflows",
        "AI-powered product differentiation",
        "Enterprise-grade automation",
        "Predictive analytics and intelligence",
      ],
      recommendedPath: {
        title: "Agentic AI Systems",
        link: "/services/agentic-ai-systems",
      },
      journey: {
        now: "Agentic workflows",
        next: "AI platform capabilities",
        later: "AI-native architecture",
      },
      nextActions: [
        { label: "Explore Agentic AI", link: "/services/agentic-ai-systems" },
        { label: "Schedule Strategy Call", link: "/corporate/contact" },
      ],
    },
  ],
};

export default function StartupAcceleratorPage() {
  return <AssessmentWizard config={config} />;
}
