export interface ServiceMetric {
  value: string;
  label: string;
  timeframe: string;
}

export interface ServiceOutcome {
  headline: string;
  metrics: ServiceMetric[];
}

export const SERVICE_OUTCOMES: Record<string, ServiceOutcome> = {
  "ai-automation": {
    headline: "Proven Automation Outcomes",
    metrics: [
      { value: "80%", label: "reduction in manual processing time", timeframe: "within 90 days" },
      { value: "3×", label: "increase in throughput per workflow", timeframe: "at full deployment" },
      { value: "6 months", label: "median time to full ROI", timeframe: "for enterprise clients" },
    ],
  },
  "ai-voice-agents": {
    headline: "Voice AI Performance Results",
    metrics: [
      { value: "70%", label: "reduction in inbound call handling costs", timeframe: "within 60 days" },
      { value: "90%", label: "call deflection rate for tier-1 queries", timeframe: "after fine-tuning" },
      { value: "24/7", label: "autonomous availability with no staffing overhead", timeframe: "from day one" },
    ],
  },
  "conversational-ai-chatbots": {
    headline: "Chatbot Impact Metrics",
    metrics: [
      { value: "65%", label: "reduction in support ticket volume", timeframe: "within 45 days" },
      { value: "40%", label: "faster average resolution time", timeframe: "across all channels" },
      { value: "4.6/5", label: "average CSAT score post-deployment", timeframe: "measured at 90 days" },
    ],
  },
  "agentic-ai-systems": {
    headline: "Agentic AI Deployment Results",
    metrics: [
      { value: "5×", label: "increase in agent-driven task throughput", timeframe: "vs. manual workflows" },
      { value: "60%", label: "reduction in decision latency", timeframe: "for autonomous pipelines" },
      { value: "99.2%", label: "task completion accuracy on structured flows", timeframe: "at scale" },
    ],
  },
  "rag-knowledge-ai": {
    headline: "Knowledge AI Performance Results",
    metrics: [
      { value: "85%", label: "improvement in answer accuracy vs. base LLM", timeframe: "on enterprise datasets" },
      { value: "70%", label: "faster knowledge retrieval for staff queries", timeframe: "within 30 days" },
      { value: "100%", label: "audit traceability on AI-generated answers", timeframe: "from day one" },
    ],
  },
  "ai-predictive-analytics": {
    headline: "Predictive Analytics Results",
    metrics: [
      { value: "40%", label: "reduction in forecasting error rates", timeframe: "within 2 model iterations" },
      { value: "3×", label: "faster time-to-insight vs. traditional BI", timeframe: "on live data pipelines" },
      { value: "25%", label: "increase in revenue from demand-driven decisions", timeframe: "over 12 months" },
    ],
  },
  "ai-computer-vision": {
    headline: "Computer Vision Outcome Metrics",
    metrics: [
      { value: "95%", label: "defect detection accuracy in quality control", timeframe: "on trained models" },
      { value: "60%", label: "reduction in manual visual inspection effort", timeframe: "within 60 days" },
      { value: "10×", label: "increase in inspection throughput per shift", timeframe: "at full deployment" },
    ],
  },
  "custom-ai-product-development": {
    headline: "AI Product Development Results",
    metrics: [
      { value: "40%", label: "faster time-to-market vs. in-house builds", timeframe: "on average" },
      { value: "3×", label: "return on AI product investment", timeframe: "within the first year" },
      { value: "92%", label: "of projects delivered on scope and on time", timeframe: "across all engagements" },
    ],
  },
};

export function getServiceOutcome(servicePath: string): ServiceOutcome | null {
  const slug = servicePath.replace(/^\/services\//, "").replace(/\/$/, "");
  return SERVICE_OUTCOMES[slug] || null;
}
