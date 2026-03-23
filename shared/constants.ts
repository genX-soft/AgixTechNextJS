export const AI_READINESS_TAGS = [
  "Early Explorer",
  "Budget-Aware Evaluator",
  "Ready for Pilot",
  "Enterprise / Multi-System",
] as const;

export type AIReadinessTag = typeof AI_READINESS_TAGS[number];

export const INDUSTRIES = [
  "Healthcare",
  "Finance & Banking",
  "Manufacturing",
  "Retail & E-commerce",
  "Technology",
  "Professional Services",
  "Education",
  "Government",
  "Real Estate",
  "Other",
] as const;

export const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-1000 employees",
  "1000+ employees",
] as const;

export const CHALLENGES = [
  "Manual processes slowing operations",
  "Data silos across departments",
  "Customer response delays",
  "Decision-making bottlenecks",
  "Document processing overhead",
  "Knowledge management gaps",
  "Compliance and risk concerns",
  "Scaling operations efficiently",
  "Cost reduction pressure",
  "Other",
] as const;

export const URGENCY_LEVELS = [
  "Immediate (within 30 days)",
  "Near-term (1-3 months)",
  "Planning phase (3-6 months)",
  "Exploring options",
] as const;
