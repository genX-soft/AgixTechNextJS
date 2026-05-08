/**
 * SEO REGISTRY — Central semantic entity store for AGIX Technologies
 *
 * Lightweight, static, zero-runtime-overhead.
 * Each entity maps to a URL and belongs to a semantic cluster.
 * Used by AutoLinkText and SemanticRelated to drive internal linking.
 *
 * Clusters mirror the four intelligence pillars:
 *   agentic-ai · conversational-ai · enterprise-knowledge · operational-ai · decision-ai
 */

export type ClusterId =
  | "agentic-ai"
  | "conversational-ai"
  | "enterprise-knowledge"
  | "operational-ai"
  | "decision-ai";

export type RelationshipType = "pillar" | "service" | "industry" | "case-study";

export type ContentIntent =
  | "informational"
  | "commercial"
  | "transactional"
  | "navigational";

export type CommercialValue = "high" | "medium" | "low";

export interface SEOEntity {
  /** Unique stable identifier */
  id: string;
  /** Human-readable entity name */
  entityName: string;
  /** Canonical URL path (always trailing-slash) */
  url: string;
  /** Semantic cluster this entity belongs to */
  clusterId: ClusterId | null;
  /** Preferred anchor text for inbound links */
  canonicalAnchor: string;
  /**
   * Phrases in body copy that may be converted to a link.
   * Listed longest-first so the most specific match wins.
   */
  semanticVariants: string[];
  /** Position in the site hierarchy */
  relationshipType: RelationshipType;
  /** Primary search intent for this URL */
  contentIntent: ContentIntent;
  /** Linking priority — 1 is highest, always linked before lower-priority entities */
  priority: 1 | 2 | 3;
  /** Lead-generation value of driving traffic here */
  commercialValue: CommercialValue;
  /** IDs of strongly related entities (same journey or cluster) */
  relatedEntities: string[];
  /**
   * URL patterns where this entity should NEVER be autolinked.
   * Supports substring matching against the current page path.
   */
  excludedPages: string[];
  /** Max times this entity may be linked per page (usually 1) */
  maxLinksPerPage: number;
}

/* ─────────────────────────────────────────────────────────────────────────────
   REGISTRY DATA
   ───────────────────────────────────────────────────────────────────────────── */

const REGISTRY: SEOEntity[] = [
  // ── INTELLIGENCE PILLARS ────────────────────────────────────────────────────

  {
    id: "intel-agentic",
    entityName: "Autonomous Agentic Systems",
    url: "/intelligence/autonomous-agentic-ai/",
    clusterId: "agentic-ai",
    canonicalAnchor: "autonomous agentic systems",
    semanticVariants: [
      "autonomous agentic systems",
      "agentic AI architecture",
      "agentic AI systems",
      "multi-agent systems",
      "autonomous AI agents",
      "agentic architecture",
      "AI agents",
      "agentic AI",
    ],
    relationshipType: "pillar",
    contentIntent: "informational",
    priority: 1,
    commercialValue: "high",
    relatedEntities: ["svc-agentic", "cs-navan", "cs-mindtrip", "cs-naratix"],
    excludedPages: ["/intelligence/autonomous-agentic-ai/"],
    maxLinksPerPage: 1,
  },

  {
    id: "intel-conversational",
    entityName: "Conversational AI",
    url: "/intelligence/conversational-ai/",
    clusterId: "conversational-ai",
    canonicalAnchor: "conversational AI",
    semanticVariants: [
      "conversational AI platform",
      "conversational AI systems",
      "conversational AI",
      "dialogue systems",
      "natural language AI",
    ],
    relationshipType: "pillar",
    contentIntent: "informational",
    priority: 1,
    commercialValue: "high",
    relatedEntities: ["svc-chatbots", "svc-voice", "cs-polyai", "cs-brainfish"],
    excludedPages: ["/intelligence/conversational-ai/"],
    maxLinksPerPage: 1,
  },

  {
    id: "intel-knowledge",
    entityName: "Enterprise Knowledge AI",
    url: "/intelligence/enterprise-knowledge-ai/",
    clusterId: "enterprise-knowledge",
    canonicalAnchor: "enterprise knowledge AI",
    semanticVariants: [
      "enterprise knowledge AI",
      "knowledge management AI",
      "enterprise knowledge systems",
      "knowledge AI",
    ],
    relationshipType: "pillar",
    contentIntent: "informational",
    priority: 1,
    commercialValue: "high",
    relatedEntities: ["svc-rag", "cs-alphasense", "cs-naratix"],
    excludedPages: ["/intelligence/enterprise-knowledge-ai/"],
    maxLinksPerPage: 1,
  },

  {
    id: "intel-operational",
    entityName: "Operational Intelligence",
    url: "/intelligence/operational-ai/",
    clusterId: "operational-ai",
    canonicalAnchor: "operational intelligence",
    semanticVariants: [
      "operational intelligence",
      "operational AI",
      "AI-driven operations",
      "intelligent operations",
    ],
    relationshipType: "pillar",
    contentIntent: "informational",
    priority: 1,
    commercialValue: "medium",
    relatedEntities: ["svc-automation", "svc-analytics", "cs-albertsons", "cs-kroger"],
    excludedPages: ["/intelligence/operational-ai/"],
    maxLinksPerPage: 1,
  },

  {
    id: "intel-decision",
    entityName: "Decision AI",
    url: "/intelligence/decision-ai/",
    clusterId: "decision-ai",
    canonicalAnchor: "decision AI",
    semanticVariants: [
      "decision intelligence",
      "AI decision-making",
      "decision AI",
      "AI-powered decisions",
    ],
    relationshipType: "pillar",
    contentIntent: "informational",
    priority: 1,
    commercialValue: "medium",
    relatedEntities: ["svc-analytics", "cs-dave", "cs-enova", "cs-ocrolus"],
    excludedPages: ["/intelligence/decision-ai/"],
    maxLinksPerPage: 1,
  },

  // ── SERVICES ───────────────────────────────────────────────────────────────

  {
    id: "svc-agentic",
    entityName: "Agentic AI Systems",
    url: "/services/agentic-ai-systems/",
    clusterId: "agentic-ai",
    canonicalAnchor: "agentic AI systems engineering",
    semanticVariants: [
      "agentic AI systems engineering",
      "agentic AI development",
      "build agentic AI",
      "agentic systems engineering",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 1,
    commercialValue: "high",
    relatedEntities: ["intel-agentic", "cs-navan", "cs-mindtrip"],
    excludedPages: ["/services/agentic-ai-systems/"],
    maxLinksPerPage: 1,
  },

  {
    id: "svc-automation",
    entityName: "AI Automation",
    url: "/services/ai-automation/",
    clusterId: "operational-ai",
    canonicalAnchor: "AI automation",
    semanticVariants: [
      "AI-powered automation",
      "intelligent workflow automation",
      "AI automation",
      "workflow automation",
      "process automation",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 2,
    commercialValue: "high",
    relatedEntities: ["intel-operational", "cs-albertsons", "cs-kroger"],
    excludedPages: ["/services/ai-automation/"],
    maxLinksPerPage: 1,
  },

  {
    id: "svc-chatbots",
    entityName: "Conversational AI Chatbots",
    url: "/services/conversational-ai-chatbots/",
    clusterId: "conversational-ai",
    canonicalAnchor: "conversational AI chatbots",
    semanticVariants: [
      "conversational AI chatbots",
      "AI chatbot development",
      "enterprise chatbots",
      "intelligent chatbots",
      "AI chatbots",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 2,
    commercialValue: "high",
    relatedEntities: ["intel-conversational", "svc-voice", "cs-polyai", "cs-brainfish"],
    excludedPages: ["/services/conversational-ai-chatbots/"],
    maxLinksPerPage: 1,
  },

  {
    id: "svc-rag",
    entityName: "RAG & Knowledge AI",
    url: "/services/rag-knowledge-ai/",
    clusterId: "enterprise-knowledge",
    canonicalAnchor: "RAG knowledge AI",
    semanticVariants: [
      "retrieval-augmented generation",
      "RAG systems",
      "RAG knowledge AI",
      "RAG pipelines",
      "RAG",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 2,
    commercialValue: "high",
    relatedEntities: ["intel-knowledge", "cs-alphasense", "cs-naratix"],
    excludedPages: ["/services/rag-knowledge-ai/"],
    maxLinksPerPage: 1,
  },

  {
    id: "svc-analytics",
    entityName: "AI Predictive Analytics",
    url: "/services/ai-predictive-analytics/",
    clusterId: "decision-ai",
    canonicalAnchor: "AI predictive analytics",
    semanticVariants: [
      "predictive analytics",
      "AI-driven forecasting",
      "AI analytics",
      "predictive AI",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 2,
    commercialValue: "high",
    relatedEntities: ["intel-decision", "intel-operational", "cs-enova", "cs-stitch-fix"],
    excludedPages: ["/services/ai-predictive-analytics/"],
    maxLinksPerPage: 1,
  },

  {
    id: "svc-voice",
    entityName: "AI Voice Agents",
    url: "/services/ai-voice-agents/",
    clusterId: "conversational-ai",
    canonicalAnchor: "AI voice agents",
    semanticVariants: [
      "AI voice agents",
      "voice AI",
      "conversational voice AI",
      "voice automation",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 2,
    commercialValue: "high",
    relatedEntities: ["intel-conversational", "svc-chatbots", "cs-polyai"],
    excludedPages: ["/services/ai-voice-agents/"],
    maxLinksPerPage: 1,
  },

  {
    id: "svc-custom",
    entityName: "Custom AI Product Development",
    url: "/services/custom-ai-product-development/",
    clusterId: null,
    canonicalAnchor: "custom AI product development",
    semanticVariants: [
      "custom AI product development",
      "bespoke AI systems",
      "AI product engineering",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 3,
    commercialValue: "high",
    relatedEntities: ["svc-agentic"],
    excludedPages: ["/services/custom-ai-product-development/"],
    maxLinksPerPage: 1,
  },

  {
    id: "svc-vision",
    entityName: "AI Computer Vision",
    url: "/services/ai-computer-vision/",
    clusterId: null,
    canonicalAnchor: "AI computer vision",
    semanticVariants: [
      "computer vision AI",
      "AI computer vision",
      "visual AI",
      "image recognition AI",
    ],
    relationshipType: "service",
    contentIntent: "commercial",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: [],
    excludedPages: ["/services/ai-computer-vision/"],
    maxLinksPerPage: 1,
  },

  // ── CASE STUDIES ────────────────────────────────────────────────────────────

  {
    id: "cs-navan",
    entityName: "Navan AI Travel",
    url: "/case-studies/navan/",
    clusterId: "agentic-ai",
    canonicalAnchor: "Navan AI travel automation",
    semanticVariants: ["Navan", "travel AI automation"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 2,
    commercialValue: "medium",
    relatedEntities: ["intel-agentic", "svc-agentic"],
    excludedPages: ["/case-studies/navan/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-mindtrip",
    entityName: "Mindtrip AI Itinerary Agent",
    url: "/case-studies/mindtrip/",
    clusterId: "agentic-ai",
    canonicalAnchor: "Mindtrip agentic AI",
    semanticVariants: ["Mindtrip"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-agentic", "svc-agentic"],
    excludedPages: ["/case-studies/mindtrip/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-naratix",
    entityName: "Naratix Document Intelligence",
    url: "/case-studies/naratix/",
    clusterId: "enterprise-knowledge",
    canonicalAnchor: "Naratix document AI",
    semanticVariants: ["Naratix"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-knowledge", "svc-rag"],
    excludedPages: ["/case-studies/naratix/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-polyai",
    entityName: "PolyAI Voice AI",
    url: "/case-studies/polyai/",
    clusterId: "conversational-ai",
    canonicalAnchor: "PolyAI voice AI",
    semanticVariants: ["PolyAI"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 2,
    commercialValue: "medium",
    relatedEntities: ["intel-conversational", "svc-voice"],
    excludedPages: ["/case-studies/polyai/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-brainfish",
    entityName: "Brainfish AI Support",
    url: "/case-studies/brainfish/",
    clusterId: "conversational-ai",
    canonicalAnchor: "Brainfish AI support",
    semanticVariants: ["Brainfish"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-conversational", "svc-chatbots"],
    excludedPages: ["/case-studies/brainfish/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-alphasense",
    entityName: "AlphaSense Knowledge AI",
    url: "/case-studies/alphasense/",
    clusterId: "enterprise-knowledge",
    canonicalAnchor: "AlphaSense knowledge AI",
    semanticVariants: ["AlphaSense"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 2,
    commercialValue: "medium",
    relatedEntities: ["intel-knowledge", "svc-rag"],
    excludedPages: ["/case-studies/alphasense/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-ocrolus",
    entityName: "Ocrolus Document AI",
    url: "/case-studies/ocrolus/",
    clusterId: "decision-ai",
    canonicalAnchor: "Ocrolus document AI",
    semanticVariants: ["Ocrolus"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-decision", "svc-analytics"],
    excludedPages: ["/case-studies/ocrolus/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-albertsons",
    entityName: "Albertsons AI Operations",
    url: "/case-studies/albertsons/",
    clusterId: "operational-ai",
    canonicalAnchor: "Albertsons AI",
    semanticVariants: ["Albertsons"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-operational", "svc-automation"],
    excludedPages: ["/case-studies/albertsons/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-kroger",
    entityName: "Kroger AI Retail",
    url: "/case-studies/kroger/",
    clusterId: "operational-ai",
    canonicalAnchor: "Kroger AI",
    semanticVariants: ["Kroger"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-operational", "svc-automation"],
    excludedPages: ["/case-studies/kroger/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-dave",
    entityName: "Dave AI Fintech",
    url: "/case-studies/dave/",
    clusterId: "decision-ai",
    canonicalAnchor: "Dave AI",
    semanticVariants: ["Dave"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-decision", "svc-analytics"],
    excludedPages: ["/case-studies/dave/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-enova",
    entityName: "Enova AI Lending",
    url: "/case-studies/enova/",
    clusterId: "decision-ai",
    canonicalAnchor: "Enova AI",
    semanticVariants: ["Enova"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-decision"],
    excludedPages: ["/case-studies/enova/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-stitch-fix",
    entityName: "Stitch Fix AI Styling",
    url: "/case-studies/stitch-fix/",
    clusterId: "decision-ai",
    canonicalAnchor: "Stitch Fix AI",
    semanticVariants: ["Stitch Fix"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-decision", "svc-analytics"],
    excludedPages: ["/case-studies/stitch-fix/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-kite-therapy",
    entityName: "Kite Therapy AI",
    url: "/case-studies/kite-therapy/",
    clusterId: "conversational-ai",
    canonicalAnchor: "Kite Therapy AI",
    semanticVariants: ["Kite Therapy"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-conversational", "svc-chatbots"],
    excludedPages: ["/case-studies/kite-therapy/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-quizlet",
    entityName: "Quizlet AI Learning",
    url: "/case-studies/quizlet/",
    clusterId: "enterprise-knowledge",
    canonicalAnchor: "Quizlet AI",
    semanticVariants: ["Quizlet"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-knowledge"],
    excludedPages: ["/case-studies/quizlet/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-knewton",
    entityName: "Knewton Adaptive Learning",
    url: "/case-studies/knewton/",
    clusterId: "enterprise-knowledge",
    canonicalAnchor: "Knewton AI",
    semanticVariants: ["Knewton"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-knowledge"],
    excludedPages: ["/case-studies/knewton/"],
    maxLinksPerPage: 1,
  },

  {
    id: "cs-housecanary",
    entityName: "HouseCanary AI Real Estate",
    url: "/case-studies/housecanary/",
    clusterId: "decision-ai",
    canonicalAnchor: "HouseCanary AI",
    semanticVariants: ["HouseCanary"],
    relationshipType: "case-study",
    contentIntent: "navigational",
    priority: 3,
    commercialValue: "medium",
    relatedEntities: ["intel-decision", "svc-analytics"],
    excludedPages: ["/case-studies/housecanary/"],
    maxLinksPerPage: 1,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   ACCESSOR FUNCTIONS
   ───────────────────────────────────────────────────────────────────────────── */

/** Return the full registry (read-only). */
export function getRegistry(): readonly SEOEntity[] {
  return REGISTRY;
}

/** Find a single entity by id. */
export function getEntityById(id: string): SEOEntity | undefined {
  return REGISTRY.find((e) => e.id === id);
}

/** All entities for a given cluster, sorted by priority then commercialValue. */
export function getClusterEntities(clusterId: ClusterId): SEOEntity[] {
  const valueOrder: Record<CommercialValue, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };
  return REGISTRY.filter((e) => e.clusterId === clusterId).sort(
    (a, b) =>
      a.priority - b.priority ||
      valueOrder[a.commercialValue] - valueOrder[b.commercialValue],
  );
}

/** Entities eligible for autolinking on a given page (not self, not excluded). */
export function getLinkableEntities(
  currentPath: string,
  clusterId?: ClusterId,
): SEOEntity[] {
  return REGISTRY.filter((e) => {
    if (e.url === currentPath) return false;
    if (e.excludedPages.some((p) => currentPath.includes(p))) return false;
    if (clusterId && e.clusterId !== clusterId) return false;
    return true;
  }).sort((a, b) => a.priority - b.priority);
}

/** Related entities for a SemanticRelated block — same cluster, not self, capped. */
export function getRelatedEntities(
  currentUrl: string,
  clusterId: ClusterId,
  limit = 5,
): SEOEntity[] {
  return REGISTRY.filter(
    (e) => e.clusterId === clusterId && e.url !== currentUrl,
  )
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}
