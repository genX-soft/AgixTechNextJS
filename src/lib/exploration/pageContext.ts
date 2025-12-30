import { PageType } from "./types";

export function detectPageType(pathname: string): { pageType: PageType; slug?: string } {
  if (pathname === "/") return { pageType: "HOME" };
  if (pathname.startsWith("/services/")) return { pageType: "SERVICE", slug: pathname.split("/")[2] };
  if (pathname.startsWith("/industries/")) return { pageType: "INDUSTRY", slug: pathname.split("/")[2] };
  if (pathname.startsWith("/intelligence/")) return { pageType: "INTELLIGENCE", slug: pathname.split("/")[2] };
  if (pathname.startsWith("/case-studies/")) return { pageType: "CASE_STUDY", slug: pathname.split("/")[2] };
  if (pathname.startsWith("/tools/")) return { pageType: "TOOL", slug: pathname.split("/")[2] };
  if (pathname.startsWith("/corporate/")) return { pageType: "CORPORATE", slug: pathname.split("/")[2] };
  return { pageType: "OTHER" };
}

export function getPageContextDefaults(pageType: PageType, pageSlug?: string): Record<string, string> {
  const defaults: Record<string, string> = {};
  
  if (pageType === "SERVICE" && pageSlug) {
    switch (pageSlug) {
      case "voice-agents":
      case "chatbots":
        defaults.primaryGoal = "CX";
        break;
      case "predictive-analytics":
        defaults.primaryGoal = "DECISIONS";
        break;
      case "rag-knowledge":
        defaults.primaryGoal = "KNOWLEDGE";
        break;
      case "agentic-ai-systems":
      case "custom-ai-product":
        defaults.primaryGoal = "WORKFLOWS";
        break;
      case "computer-vision":
        defaults.primaryGoal = "TIME";
        break;
    }
  }
  
  if (pageType === "INDUSTRY" && pageSlug) {
    defaults.industry = pageSlug;
  }
  
  return defaults;
}
