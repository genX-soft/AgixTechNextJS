export type PageType = "HOME" | "SERVICE" | "INDUSTRY" | "INTELLIGENCE" | "CASE_STUDY" | "TOOL" | "CORPORATE" | "OTHER";

export type UserType = "NEW_TO_AI" | "STARTUP" | "SMB" | "ENTERPRISE";

export type Intent = "LEARNING" | "EVALUATING" | "BUYING" | "FIXING" | "COMPARING";

export type Intelligence =
  | "OPERATIONAL"
  | "CONVERSATIONAL"
  | "DECISION"
  | "AGENTIC"
  | "ENTERPRISE_KNOWLEDGE";

export type ServiceSlug =
  | "agentic-ai-systems"
  | "chatbots"
  | "computer-vision"
  | "custom-ai-product"
  | "predictive-analytics"
  | "rag-knowledge"
  | "voice-agents";

export type IndustrySlug =
  | "healthcare"
  | "fintech"
  | "retail"
  | "logistics"
  | "real-estate"
  | "insurance"
  | "hospitality"
  | "edtech";

export type ToolSlug =
  | "ai-starting-point"
  | "startup-accelerator"
  | "operational-efficiency"
  | "enterprise-strategy";

export type Confidence = "LOW" | "MEDIUM" | "HIGH";

export type AnswerValue = string | number | boolean | string[];

export interface ExplorationState {
  sessionId: string;
  entryUrl: string;
  pageType: PageType;
  pageSlug?: string;
  userType?: UserType;
  intent?: Intent;
  industry?: IndustrySlug;
  teamSize?: "1-5" | "6-20" | "21-100" | "100+";
  dataState?: "NONE" | "SCATTERED" | "CENTRALIZED";
  compliance?: "LOW" | "MEDIUM" | "HIGH";
  urgency?: "LOW" | "MEDIUM" | "HIGH";
  answers: Record<string, AnswerValue>;
  maturityScore: number;
  confidence: Confidence;
  recommendedIntelligence?: Intelligence;
  recommendedServices: ServiceSlug[];
  recommendedTools: ToolSlug[];
  recommendedCaseStudies: string[];
  toolsCompleted: ToolSlug[];
  pagesVisited: string[];
  lastUpdatedAt: number;
  returnTo?: string;
  ctaCompleted?: boolean;
}

export type Question = {
  id: string;
  title: string;
  helper?: string;
  type: "single" | "multi" | "number";
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  when?: (ctx: { pageType: PageType; userType?: UserType; pageSlug?: string; answers: Record<string, AnswerValue> }) => boolean;
};

export type CaseStudyTag = {
  slug: string;
  industries: IndustrySlug[];
  services: ServiceSlug[];
  intelligence: Intelligence[];
  outcomes: ("ROI" | "COST_REDUCTION" | "SPEED" | "SUPPORT_SCALE" | "RISK_CONTROL")[];
};
