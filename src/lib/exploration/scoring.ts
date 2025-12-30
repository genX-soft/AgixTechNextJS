import { Intelligence, ServiceSlug, ToolSlug, AnswerValue } from "./types";
import { SERVICE_TO_INTELLIGENCE, CASE_STUDIES } from "./mappings";

export function computeMaturityScore(answers: Record<string, AnswerValue>): number {
  let score = 0;

  const team = answers.teamSize as string;
  score += team === "1-5" ? 10 : team === "6-20" ? 20 : team === "21-100" ? 35 : team === "100+" ? 45 : 0;

  const data = answers.dataState as string;
  score += data === "NONE" ? 5 : data === "SCATTERED" ? 20 : data === "CENTRALIZED" ? 35 : 0;

  const urg = answers.urgency as string;
  score += urg === "LOW" ? 5 : urg === "MEDIUM" ? 10 : urg === "HIGH" ? 15 : 0;

  if (answers.compliance) {
    const comp = answers.compliance as string;
    score += comp === "LOW" ? 5 : comp === "MEDIUM" ? 10 : comp === "HIGH" ? 15 : 0;
  }

  return Math.min(100, score);
}

export function computeConfidence(score: number): "LOW" | "MEDIUM" | "HIGH" {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

export function recommendIntelligence(answers: Record<string, AnswerValue>): Intelligence {
  switch (answers.primaryGoal) {
    case "CX": return "CONVERSATIONAL";
    case "DECISIONS": return "DECISION";
    case "KNOWLEDGE": return "ENTERPRISE_KNOWLEDGE";
    case "WORKFLOWS": return "AGENTIC";
    case "TIME": return "OPERATIONAL";
    default: return "OPERATIONAL";
  }
}

export function recommendServices(answers: Record<string, AnswerValue>): ServiceSlug[] {
  const intel = recommendIntelligence(answers);

  const byIntel = (Object.keys(SERVICE_TO_INTELLIGENCE) as ServiceSlug[])
    .filter(s => SERVICE_TO_INTELLIGENCE[s] === intel);

  const pain: string[] = (answers.painAreas as string[]) || [];
  let ranked = [...byIntel];

  if (pain.includes("DOCS")) ranked = ["rag-knowledge", ...ranked.filter(x => x !== "rag-knowledge")];
  if (pain.includes("SUPPORT")) ranked = ["chatbots", "voice-agents", ...ranked.filter(x => x !== "chatbots" && x !== "voice-agents")];
  if (pain.includes("REPORTING")) ranked = ["predictive-analytics", ...ranked.filter(x => x !== "predictive-analytics")];
  if (pain.includes("OPS")) ranked = ["agentic-ai-systems", ...ranked.filter(x => x !== "agentic-ai-systems")];

  return Array.from(new Set(ranked)).slice(0, 2) as ServiceSlug[];
}

export function recommendTool(answers: Record<string, AnswerValue>): ToolSlug {
  const userType = answers.userType as string;
  if (userType === "NEW_TO_AI") return "ai-starting-point";
  if (userType === "STARTUP") return "startup-accelerator";
  if (userType === "SMB") return "operational-efficiency";
  return "enterprise-strategy";
}

export function recommendCaseStudies(
  answers: Record<string, AnswerValue>,
  services: ServiceSlug[],
  intelligence: Intelligence
): string[] {
  const industry = answers.industry as string | undefined;

  const candidates = CASE_STUDIES.filter(cs => {
    const serviceMatch = services.some(s => cs.services.includes(s));
    const intelMatch = cs.intelligence.includes(intelligence);
    const industryMatch = industry ? cs.industries.includes(industry as any) : true;
    return (serviceMatch || intelMatch) && industryMatch;
  });

  const sorted = candidates.sort((a, b) => {
    const aScore = 
      (services.some(s => a.services.includes(s)) ? 2 : 0) +
      (a.intelligence.includes(intelligence) ? 2 : 0) +
      (industry && a.industries.includes(industry as any) ? 3 : 0);
    const bScore = 
      (services.some(s => b.services.includes(s)) ? 2 : 0) +
      (b.intelligence.includes(intelligence) ? 2 : 0) +
      (industry && b.industries.includes(industry as any) ? 3 : 0);
    return bScore - aScore;
  });

  return sorted.slice(0, 3).map(x => x.slug);
}
