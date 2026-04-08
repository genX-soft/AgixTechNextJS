export interface AITool {
  name: string;
  description: string;
  href: string;
  category: "assessments" | "intelligence" | "services" | "industries";
  icon?: string;
}

export const AI_TOOLS: AITool[] = [
  // Assessment Tools - these are full-page assessments, no anchor needed
  {
    name: "AI Starting Point",
    description: "Discover where to begin your AI journey based on your current situation",
    href: "/tools/ai-starting-point",
    category: "assessments",
  },
  {
    name: "Enterprise Strategy Assessment",
    description: "Evaluate your organization's AI readiness and get strategic recommendations",
    href: "/tools/enterprise-strategy",
    category: "assessments",
  },
  {
    name: "Operational Efficiency Calculator",
    description: "Calculate potential time and cost savings from AI automation",
    href: "/tools/operational-efficiency",
    category: "assessments",
  },
  {
    name: "Startup Accelerator",
    description: "Fast-track your startup's AI adoption with tailored guidance",
    href: "/tools/startup-accelerator",
    category: "assessments",
  },

  // Intelligence Types - link to interactive tools section
  {
    name: "Conversational Intelligence",
    description: "AI-powered chatbots and virtual assistants for customer engagement",
    href: "/intelligence/conversational#interactive-tools",
    category: "intelligence",
  },
  {
    name: "Agentic AI",
    description: "Autonomous AI agents that perform complex tasks independently",
    href: "/intelligence/agentic#interactive-tools",
    category: "intelligence",
  },
  {
    name: "Decision Intelligence",
    description: "Data-driven insights and predictive analytics for better decisions",
    href: "/intelligence/decision#interactive-tools",
    category: "intelligence",
  },
  {
    name: "Operational Intelligence",
    description: "AI automation for streamlined business operations",
    href: "/intelligence/operational#interactive-tools",
    category: "intelligence",
  },
  {
    name: "Enterprise Knowledge",
    description: "Intelligent knowledge management and document processing",
    href: "/intelligence/enterprise-knowledge#interactive-tools",
    category: "intelligence",
  },

  // Services - link to calculator sections
  {
    name: "AI Automation Services",
    description: "End-to-end workflow, process, and document automation with ROI calculator",
    href: "/services/ai-automation#interactive-tools",
    category: "services",
  },
  {
    name: "Agentic AI Systems",
    description: "Build autonomous AI agents for your business workflows",
    href: "/services/agentic-ai-systems#calculator",
    category: "services",
  },
  {
    name: "AI Chatbots",
    description: "Custom conversational AI for customer support and engagement",
    href: "/services/chatbots#calculator",
    category: "services",
  },
  {
    name: "Voice AI Agents",
    description: "Intelligent voice assistants and phone automation",
    href: "/services/voice-agents#calculator",
    category: "services",
  },
  {
    name: "RAG & Knowledge Systems",
    description: "Retrieval-augmented generation for enterprise knowledge",
    href: "/services/rag-knowledge#calculator",
    category: "services",
  },
  {
    name: "Predictive Analytics",
    description: "Machine learning models for forecasting and insights",
    href: "/services/predictive-analytics#calculator",
    category: "services",
  },
  {
    name: "Computer Vision",
    description: "Image and video analysis powered by AI",
    href: "/services/computer-vision#calculator",
    category: "services",
  },
  {
    name: "Custom AI Products",
    description: "Bespoke AI solutions tailored to your unique needs",
    href: "/services/custom-ai-product#calculator",
    category: "services",
  },

  // Industries - link to solution finder sections
  {
    name: "Healthcare AI",
    description: "AI solutions for healthcare providers and medical organizations",
    href: "/industries/healthcare#solution-finder",
    category: "industries",
  },
  {
    name: "Fintech AI",
    description: "AI for financial services, banking, and insurance",
    href: "/industries/fintech#solution-finder",
    category: "industries",
  },
  {
    name: "Retail AI",
    description: "AI-powered retail and e-commerce solutions",
    href: "/industries/retail#solution-finder",
    category: "industries",
  },
  {
    name: "Logistics AI",
    description: "Supply chain and logistics optimization with AI",
    href: "/industries/logistics#solution-finder",
    category: "industries",
  },
  {
    name: "Real Estate AI",
    description: "AI tools for property management and real estate",
    href: "/industries/real-estate#solution-finder",
    category: "industries",
  },
  {
    name: "Insurance AI",
    description: "AI solutions for insurance claims and underwriting",
    href: "/industries/insurance#solution-finder",
    category: "industries",
  },
  {
    name: "Hospitality AI",
    description: "AI for hotels, restaurants, and travel",
    href: "/industries/hospitality#solution-finder",
    category: "industries",
  },
  {
    name: "EdTech AI",
    description: "AI-powered educational technology solutions",
    href: "/industries/edtech#solution-finder",
    category: "industries",
  },
];

export const CATEGORY_INFO = {
  assessments: {
    label: "Assessment Tools",
    description: "Interactive tools to evaluate your AI readiness",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  intelligence: {
    label: "Intelligence Types",
    description: "Explore different types of AI intelligence",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  services: {
    label: "AI Services",
    description: "Our full range of AI development services",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  industries: {
    label: "Industry Solutions",
    description: "AI solutions tailored for your industry",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
};
