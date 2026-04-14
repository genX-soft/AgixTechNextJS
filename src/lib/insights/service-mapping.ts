export interface ServiceLink {
  title: string;
  href: string;
  description: string;
}

const SERVICE_LINKS: ServiceLink[] = [
  {
    title: "AI Automation Services",
    href: "/services/ai-automation/",
    description: "Automate complex workflows with production-grade AI systems.",
  },
  {
    title: "AI Voice Agents",
    href: "/services/ai-voice-agents/",
    description: "Deploy intelligent voice agents that handle inbound calls autonomously.",
  },
  {
    title: "Conversational AI Chatbots",
    href: "/services/conversational-ai-chatbots/",
    description: "Build enterprise chatbots that understand context and intent.",
  },
  {
    title: "Agentic AI Systems",
    href: "/services/agentic-ai-systems/",
    description: "Design autonomous agents that plan, execute, and self-correct.",
  },
  {
    title: "RAG & Knowledge AI",
    href: "/services/rag-knowledge-ai/",
    description: "Ground your AI in verified enterprise knowledge with RAG architectures.",
  },
  {
    title: "Predictive Analytics AI",
    href: "/services/ai-predictive-analytics/",
    description: "Forecast demand, risk, and outcomes with ML-powered analytics.",
  },
  {
    title: "Computer Vision Solutions",
    href: "/services/ai-computer-vision/",
    description: "Extract meaning from images, video, and visual data streams.",
  },
  {
    title: "Custom AI Product Development",
    href: "/services/custom-ai-product-development/",
    description: "Build bespoke AI products from architecture to production deployment.",
  },
];

const KEYWORD_MAP: Record<string, string[]> = {
  "/services/ai-automation/": [
    "automation", "workflow", "process", "rpa", "task automation",
    "operational", "efficiency", "productivity",
  ],
  "/services/ai-voice-agents/": [
    "voice", "call center", "phone", "ivr", "inbound", "outbound",
    "telephony", "speech", "audio",
  ],
  "/services/conversational-ai-chatbots/": [
    "chatbot", "conversational", "chat", "messaging", "customer support",
    "virtual assistant", "dialogue", "nlp",
  ],
  "/services/agentic-ai-systems/": [
    "agent", "agentic", "autonomous", "multi-agent", "planning",
    "reasoning", "orchestration", "decision",
  ],
  "/services/rag-knowledge-ai/": [
    "rag", "retrieval", "knowledge base", "embedding", "vector",
    "document", "search", "knowledge graph",
  ],
  "/services/ai-predictive-analytics/": [
    "predictive", "forecasting", "forecast", "prediction", "analytics",
    "machine learning", "ml model", "churn", "demand",
  ],
  "/services/ai-computer-vision/": [
    "computer vision", "image", "visual", "detection", "recognition",
    "ocr", "object detection", "video analysis",
  ],
  "/services/custom-ai-product-development/": [
    "custom ai", "ai development", "build", "product", "platform",
    "architecture", "engineering", "integration",
  ],
};

export function getRelatedServices(
  title: string,
  content: string,
  categories: string[]
): ServiceLink[] {
  const text = [title, content, ...categories]
    .join(" ")
    .toLowerCase()
    .replace(/<[^>]*>/g, "");

  const scores: Map<string, number> = new Map();

  for (const [href, keywords] of Object.entries(KEYWORD_MAP)) {
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "gi");
      const matches = text.match(regex);
      if (matches) score += matches.length;
    }
    if (score > 0) scores.set(href, score);
  }

  const sorted = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const topHrefs = sorted.slice(0, 3).map(([href]) => href);

  const result = topHrefs
    .map((href) => SERVICE_LINKS.find((s) => s.href === href))
    .filter((s): s is ServiceLink => !!s);

  if (result.length < 2) {
    const fallback = SERVICE_LINKS.filter(
      (s) => !result.find((r) => r.href === s.href)
    ).slice(0, 3 - result.length);
    return [...result, ...fallback];
  }

  return result;
}
