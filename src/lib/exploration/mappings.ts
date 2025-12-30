import { Intelligence, ServiceSlug, IndustrySlug, CaseStudyTag } from "./types";

export const SERVICE_TO_INTELLIGENCE: Record<ServiceSlug, Intelligence> = {
  "agentic-ai-systems": "AGENTIC",
  "chatbots": "CONVERSATIONAL",
  "voice-agents": "CONVERSATIONAL",
  "rag-knowledge": "ENTERPRISE_KNOWLEDGE",
  "predictive-analytics": "DECISION",
  "computer-vision": "OPERATIONAL",
  "custom-ai-product": "OPERATIONAL",
};

export const INTELLIGENCE_LABELS: Record<Intelligence, string> = {
  "OPERATIONAL": "Operational Intelligence",
  "CONVERSATIONAL": "Conversational Intelligence",
  "DECISION": "Decision Intelligence",
  "AGENTIC": "Agentic Intelligence",
  "ENTERPRISE_KNOWLEDGE": "Enterprise Knowledge Intelligence",
};

export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  "agentic-ai-systems": "Agentic AI Systems",
  "chatbots": "AI Chatbots",
  "voice-agents": "Voice Agents",
  "rag-knowledge": "RAG & Knowledge Systems",
  "predictive-analytics": "Predictive Analytics",
  "computer-vision": "Computer Vision",
  "custom-ai-product": "Custom AI Product",
};

export const INDUSTRY_TO_SERVICES: Record<IndustrySlug, ServiceSlug[]> = {
  healthcare: ["voice-agents", "rag-knowledge", "predictive-analytics", "chatbots"],
  fintech: ["predictive-analytics", "rag-knowledge", "agentic-ai-systems", "custom-ai-product"],
  retail: ["predictive-analytics", "chatbots", "computer-vision", "custom-ai-product"],
  logistics: ["predictive-analytics", "computer-vision", "agentic-ai-systems", "custom-ai-product"],
  "real-estate": ["rag-knowledge", "predictive-analytics", "chatbots", "voice-agents"],
  insurance: ["predictive-analytics", "rag-knowledge", "agentic-ai-systems", "chatbots"],
  hospitality: ["voice-agents", "chatbots", "predictive-analytics", "custom-ai-product"],
  edtech: ["chatbots", "rag-knowledge", "predictive-analytics", "custom-ai-product"],
};

export const CASE_STUDIES: CaseStudyTag[] = [
  { slug: "enova", industries: ["fintech"], services: ["predictive-analytics", "agentic-ai-systems"], intelligence: ["DECISION", "OPERATIONAL"], outcomes: ["ROI", "RISK_CONTROL", "SPEED"] },
  { slug: "dave", industries: ["fintech"], services: ["chatbots", "predictive-analytics"], intelligence: ["CONVERSATIONAL", "DECISION"], outcomes: ["SUPPORT_SCALE", "SPEED"] },
  { slug: "ocrolus", industries: ["fintech"], services: ["computer-vision", "rag-knowledge"], intelligence: ["OPERATIONAL", "ENTERPRISE_KNOWLEDGE"], outcomes: ["SPEED", "ROI"] },
  { slug: "alphasense", industries: ["fintech"], services: ["rag-knowledge", "predictive-analytics"], intelligence: ["ENTERPRISE_KNOWLEDGE", "DECISION"], outcomes: ["SPEED", "ROI"] },
  { slug: "polyai", industries: ["hospitality", "retail"], services: ["voice-agents"], intelligence: ["CONVERSATIONAL"], outcomes: ["SUPPORT_SCALE", "SPEED"] },
  { slug: "brainfish", industries: ["retail"], services: ["chatbots", "rag-knowledge"], intelligence: ["CONVERSATIONAL", "ENTERPRISE_KNOWLEDGE"], outcomes: ["SUPPORT_SCALE"] },
  { slug: "babylon-health", industries: ["healthcare"], services: ["chatbots", "predictive-analytics"], intelligence: ["CONVERSATIONAL", "DECISION"], outcomes: ["SUPPORT_SCALE", "SPEED"] },
  { slug: "housecanary", industries: ["real-estate"], services: ["predictive-analytics"], intelligence: ["DECISION"], outcomes: ["SPEED", "ROI"] },
  { slug: "properti-ai", industries: ["real-estate"], services: ["chatbots", "rag-knowledge"], intelligence: ["CONVERSATIONAL", "ENTERPRISE_KNOWLEDGE"], outcomes: ["SPEED", "SUPPORT_SCALE"] },
  { slug: "hilton-hotels", industries: ["hospitality"], services: ["voice-agents", "chatbots"], intelligence: ["CONVERSATIONAL"], outcomes: ["SUPPORT_SCALE", "SPEED"] },
  { slug: "luxury-escapes", industries: ["hospitality"], services: ["chatbots", "predictive-analytics"], intelligence: ["CONVERSATIONAL", "DECISION"], outcomes: ["ROI", "SUPPORT_SCALE"] },
  { slug: "navan", industries: ["hospitality"], services: ["agentic-ai-systems", "chatbots"], intelligence: ["AGENTIC", "CONVERSATIONAL"], outcomes: ["SPEED", "COST_REDUCTION"] },
  { slug: "kroger", industries: ["retail"], services: ["predictive-analytics", "computer-vision"], intelligence: ["DECISION", "OPERATIONAL"], outcomes: ["ROI", "COST_REDUCTION"] },
  { slug: "albertsons", industries: ["retail"], services: ["predictive-analytics", "agentic-ai-systems"], intelligence: ["DECISION", "OPERATIONAL"], outcomes: ["ROI", "SPEED"] },
  { slug: "stitch-fix", industries: ["retail"], services: ["predictive-analytics", "custom-ai-product"], intelligence: ["DECISION"], outcomes: ["ROI", "SPEED"] },
  { slug: "hungryroot", industries: ["retail"], services: ["predictive-analytics", "custom-ai-product"], intelligence: ["DECISION"], outcomes: ["ROI"] },
  { slug: "ulta-beauty", industries: ["retail"], services: ["chatbots", "predictive-analytics"], intelligence: ["CONVERSATIONAL", "DECISION"], outcomes: ["SUPPORT_SCALE", "ROI"] },
  { slug: "innit", industries: ["retail"], services: ["predictive-analytics", "custom-ai-product"], intelligence: ["DECISION"], outcomes: ["ROI"] },
  { slug: "quizlet", industries: ["edtech"], services: ["chatbots", "rag-knowledge"], intelligence: ["CONVERSATIONAL", "ENTERPRISE_KNOWLEDGE"], outcomes: ["SUPPORT_SCALE"] },
  { slug: "knewton", industries: ["edtech"], services: ["predictive-analytics", "custom-ai-product"], intelligence: ["DECISION"], outcomes: ["ROI"] },
  { slug: "riiid-labs", industries: ["edtech"], services: ["predictive-analytics", "custom-ai-product"], intelligence: ["DECISION"], outcomes: ["ROI", "SPEED"] },
  { slug: "dartmouth-college", industries: ["edtech"], services: ["rag-knowledge", "chatbots"], intelligence: ["ENTERPRISE_KNOWLEDGE", "CONVERSATIONAL"], outcomes: ["SUPPORT_SCALE"] },
  { slug: "kite-therapy", industries: ["healthcare"], services: ["voice-agents", "predictive-analytics"], intelligence: ["CONVERSATIONAL", "DECISION"], outcomes: ["SUPPORT_SCALE", "SPEED"] },
  { slug: "hello-driven", industries: ["logistics"], services: ["computer-vision", "predictive-analytics"], intelligence: ["OPERATIONAL", "DECISION"], outcomes: ["SPEED", "COST_REDUCTION"] },
  { slug: "geovea", industries: ["logistics", "hospitality"], services: ["agentic-ai-systems", "predictive-analytics"], intelligence: ["AGENTIC", "DECISION"], outcomes: ["SPEED"] },
  { slug: "mindtrip", industries: ["hospitality"], services: ["chatbots", "rag-knowledge"], intelligence: ["CONVERSATIONAL", "ENTERPRISE_KNOWLEDGE"], outcomes: ["SUPPORT_SCALE"] },
  { slug: "naratix", industries: ["retail"], services: ["custom-ai-product", "computer-vision"], intelligence: ["OPERATIONAL"], outcomes: ["ROI"] },
  { slug: "suno", industries: ["edtech"], services: ["custom-ai-product"], intelligence: ["OPERATIONAL"], outcomes: ["ROI"] },
];
