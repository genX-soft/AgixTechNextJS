import { ExplorationState } from "./types";
import { 
  computeMaturityScore, 
  computeConfidence, 
  recommendIntelligence, 
  recommendServices, 
  recommendTool, 
  recommendCaseStudies 
} from "./scoring";

export function buildRecommendations(state: ExplorationState): ExplorationState {
  const answers = state.answers;

  const maturityScore = computeMaturityScore(answers);
  const confidence = computeConfidence(maturityScore);
  const intelligence = recommendIntelligence(answers);
  const services = recommendServices(answers);
  const tool = recommendTool(answers);
  const caseStudies = recommendCaseStudies(answers, services, intelligence);

  return {
    ...state,
    maturityScore,
    confidence,
    recommendedIntelligence: intelligence,
    recommendedServices: services,
    recommendedTools: [tool],
    recommendedCaseStudies: caseStudies,
    lastUpdatedAt: Date.now(),
  };
}

export function getMaturityLabel(score: number): string {
  if (score >= 80) return "Strategic";
  if (score >= 60) return "Scaling";
  if (score >= 40) return "Functional";
  if (score >= 20) return "Early";
  return "Exploring";
}

export function getConfidenceMessage(confidence: "LOW" | "MEDIUM" | "HIGH"): string {
  switch (confidence) {
    case "HIGH":
      return "You're ready to take concrete next steps.";
    case "MEDIUM":
      return "You have a good foundation to build on.";
    case "LOW":
      return "Let's explore what AI can do for you.";
  }
}
