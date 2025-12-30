"use client";

import type { AIReadinessTag } from "@shared/schema";

interface ScoringFactors {
  companySize?: string;
  urgency?: string;
  industry?: string;
  challenges?: string[];
  scrollDepth?: number;
  timeOnPage?: number;
  interactionCount?: number;
  pagesVisited?: number;
  formType?: string;
  exitIntent?: boolean;
}

interface LeadScore {
  score: number;
  aiReadinessTag: AIReadinessTag;
  breakdown: {
    companySize: number;
    urgency: number;
    engagement: number;
    intent: number;
  };
}

const COMPANY_SIZE_SCORES: Record<string, number> = {
  "1-10 employees": 5,
  "11-50 employees": 10,
  "51-200 employees": 20,
  "201-1000 employees": 30,
  "1000+ employees": 40,
};

const URGENCY_SCORES: Record<string, number> = {
  "Immediate (within 30 days)": 30,
  "Near-term (1-3 months)": 20,
  "Planning phase (3-6 months)": 10,
  "Exploring options": 5,
};

const HIGH_VALUE_INDUSTRIES = [
  "Healthcare",
  "Finance & Banking",
  "Manufacturing",
  "Technology",
];

export function calculateLeadScore(factors: ScoringFactors): LeadScore {
  let companySizeScore = 0;
  let urgencyScore = 0;
  let engagementScore = 0;
  let intentScore = 0;

  if (factors.companySize) {
    companySizeScore = COMPANY_SIZE_SCORES[factors.companySize] || 5;
  }

  if (factors.urgency) {
    urgencyScore = URGENCY_SCORES[factors.urgency] || 5;
  }

  if (factors.scrollDepth) {
    if (factors.scrollDepth >= 75) engagementScore += 10;
    else if (factors.scrollDepth >= 50) engagementScore += 7;
    else if (factors.scrollDepth >= 25) engagementScore += 3;
  }

  if (factors.timeOnPage) {
    if (factors.timeOnPage >= 180) engagementScore += 10;
    else if (factors.timeOnPage >= 60) engagementScore += 7;
    else if (factors.timeOnPage >= 30) engagementScore += 3;
  }

  if (factors.pagesVisited) {
    if (factors.pagesVisited >= 5) engagementScore += 10;
    else if (factors.pagesVisited >= 3) engagementScore += 6;
    else engagementScore += 2;
  }

  if (factors.challenges && factors.challenges.length >= 3) {
    intentScore += 10;
  } else if (factors.challenges && factors.challenges.length >= 1) {
    intentScore += 5;
  }

  if (factors.industry && HIGH_VALUE_INDUSTRIES.includes(factors.industry)) {
    intentScore += 5;
  }

  if (factors.formType === "cta_consultation" || factors.formType === "demo" || factors.formType === "consultation") {
    intentScore += 10;
  } else if (factors.formType === "contact_form" || factors.formType === "contact") {
    intentScore += 5;
  }

  if (factors.exitIntent) {
    engagementScore -= 3;
  }

  const totalScore = companySizeScore + urgencyScore + engagementScore + intentScore;
  const normalizedScore = Math.min(100, Math.max(0, totalScore));

  let aiReadinessTag: AIReadinessTag;
  if (normalizedScore >= 70 && companySizeScore >= 30) {
    aiReadinessTag = "Enterprise / Multi-System";
  } else if (normalizedScore >= 50 && urgencyScore >= 20) {
    aiReadinessTag = "Ready for Pilot";
  } else if (normalizedScore >= 30) {
    aiReadinessTag = "Budget-Aware Evaluator";
  } else {
    aiReadinessTag = "Early Explorer";
  }

  return {
    score: normalizedScore,
    aiReadinessTag,
    breakdown: {
      companySize: companySizeScore,
      urgency: urgencyScore,
      engagement: Math.max(0, engagementScore),
      intent: intentScore,
    },
  };
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 70) return { label: "Hot Lead", color: "text-red-500" };
  if (score >= 50) return { label: "Warm Lead", color: "text-orange-500" };
  if (score >= 30) return { label: "Qualified", color: "text-yellow-500" };
  return { label: "Nurture", color: "text-blue-500" };
}
