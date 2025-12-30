"use client";

import { getJourney, clearJourney } from "@/hooks/use-journey-tracker";
import { getBehaviorData, clearBehaviorData } from "@/hooks/use-behavior-tracker";
import { calculateLeadScore } from "@/lib/lead-scoring";
import type { InsertLead } from "@shared/schema";

interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  message?: string;
  timeline?: string;
  industry?: string;
  companySize?: string;
  challenges?: string[];
  urgency?: string;
}

interface SubmitLeadOptions {
  formType: string;
  source?: string;
  ctaId?: string;
  ctaText?: string;
  ctaLocation?: string;
  additionalMetadata?: Record<string, unknown>;
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utmParams[key] = value;
  });
  return utmParams;
}

function getDeviceType(width: number): string {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getReferrerInfo(): { referrer: string; referrerDomain: string | null } {
  if (typeof document === "undefined") return { referrer: "direct", referrerDomain: null };
  const ref = document.referrer;
  if (!ref) return { referrer: "direct", referrerDomain: null };
  try {
    const url = new URL(ref);
    return { referrer: ref, referrerDomain: url.hostname };
  } catch {
    return { referrer: ref, referrerDomain: null };
  }
}

export async function submitLead(
  formData: LeadFormData,
  options: SubmitLeadOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    const journey = getJourney();
    const behavior = getBehaviorData();
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const utmParams = getUtmParams();
    const referrerInfo = getReferrerInfo();
    const landingPage = journey.length > 0 ? journey[0].path : currentPath;

    const scoreResult = calculateLeadScore({
      companySize: formData.companySize,
      urgency: formData.urgency,
      industry: formData.industry,
      challenges: formData.challenges,
      scrollDepth: behavior.maxScrollDepth,
      timeOnPage: behavior.timeOnPage,
      interactionCount: behavior.interactionCount,
      pagesVisited: journey.length,
      formType: options.formType,
      exitIntent: behavior.exitIntent,
    });

    const ctaData = options.ctaId ? {
      ctaId: options.ctaId,
      ctaText: options.ctaText || "",
      ctaLocation: options.ctaLocation || currentPath,
    } : behavior.ctaClicks.length > 0 ? behavior.ctaClicks[behavior.ctaClicks.length - 1] : undefined;

    const leadPayload: InsertLead = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      role: formData.role || undefined,
      message: formData.message || undefined,
      source: options.source || referrerInfo.referrerDomain || "direct",
      pagePath: currentPath,
      formType: options.formType,
      industry: formData.industry || undefined,
      companySize: formData.companySize || undefined,
      challenges: formData.challenges || undefined,
      urgency: formData.urgency || undefined,
      aiReadinessTag: scoreResult.aiReadinessTag,
      leadScore: scoreResult.score,
      behaviorData: {
        scrollDepth: behavior.maxScrollDepth,
        timeOnPage: behavior.timeOnPage,
        exitIntent: behavior.exitIntent,
        interactionCount: behavior.interactionCount,
        ctaClicks: behavior.ctaClicks,
      },
      journey: journey.length > 0 ? journey : undefined,
      metadata: {
        ...options.additionalMetadata,
        timeline: formData.timeline,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        screenWidth: screenWidth,
        deviceType: getDeviceType(screenWidth),
        submittedAt: new Date().toISOString(),
        referrer: referrerInfo.referrer,
        referrerDomain: referrerInfo.referrerDomain,
        landingPage: landingPage,
        language: typeof navigator !== "undefined" ? navigator.language : undefined,
        languages: typeof navigator !== "undefined" ? navigator.languages?.join(", ") : undefined,
        timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined,
        lastCTA: ctaData,
        scoreBreakdown: scoreResult.breakdown,
        ...utmParams,
      },
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: errorData.error || "Failed to submit form" 
      };
    }

    clearJourney();
    clearBehaviorData();

    return { success: true };
  } catch (error) {
    console.error("Lead submission error:", error);
    return { 
      success: false, 
      error: "Network error. Please try again." 
    };
  }
}
