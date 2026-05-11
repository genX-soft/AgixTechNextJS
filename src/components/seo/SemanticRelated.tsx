/**
 * SEMANTIC RELATED — Related content block for internal linking.
 *
 * Renders 3–5 contextually relevant links from the same semantic cluster:
 *   - Related intelligence pillar pages
 *   - Related service pages
 *   - Related case studies
 *
 * Server-component compatible (no "use client" — reads from static registry only).
 *
 * Usage:
 *   <SemanticRelated
 *     currentUrl="/intelligence/autonomous-agentic-ai/"
 *     clusterId="agentic-ai"
 *     heading="Explore the Agentic AI Ecosystem"   // optional
 *   />
 */

import Link from "next/link";
import {
  getRegistry,
  type ClusterId,
  type RelationshipType,
  type SEOEntity,
} from "@/lib/seo-registry";
import { ArrowRight, BookOpen, Briefcase, FileText } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */

interface SemanticRelatedProps {
  currentUrl: string;
  clusterId: ClusterId;
  /** Override the default section heading */
  heading?: string;
  /** Max total items shown across all groups (default 5) */
  limit?: number;
}

interface GroupedItems {
  pillars: SEOEntity[];
  services: SEOEntity[];
  caseStudies: SEOEntity[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   SELECTION LOGIC
   ───────────────────────────────────────────────────────────────────────────── */

const TYPE_ORDER: RelationshipType[] = ["pillar", "service", "case-study"];

function selectRelated(
  currentUrl: string,
  clusterId: ClusterId,
  limit: number,
): GroupedItems {
  const all = getRegistry()
    .filter(
      (e) =>
        e.clusterId === clusterId &&
        e.url !== currentUrl &&
        TYPE_ORDER.includes(e.relationshipType),
    )
    .sort(
      (a, b) =>
        a.priority - b.priority ||
        TYPE_ORDER.indexOf(a.relationshipType) -
          TYPE_ORDER.indexOf(b.relationshipType),
    );

  // Allocate slots: at most 1 pillar, up to 2 services, up to 2 case-studies
  const pillars = all
    .filter((e) => e.relationshipType === "pillar")
    .slice(0, 1);
  const services = all
    .filter((e) => e.relationshipType === "service")
    .slice(0, 2);
  const caseStudies = all
    .filter((e) => e.relationshipType === "case-study")
    .slice(0, 2);

  // Enforce global limit by trimming case-studies first, then services
  let total = pillars.length + services.length + caseStudies.length;
  const trimmedCaseStudies = [...caseStudies];
  const trimmedServices = [...services];
  while (total > limit && trimmedCaseStudies.length > 0) {
    trimmedCaseStudies.pop();
    total--;
  }
  while (total > limit && trimmedServices.length > 0) {
    trimmedServices.pop();
    total--;
  }

  return {
    pillars,
    services: trimmedServices,
    caseStudies: trimmedCaseStudies,
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────────────────────────────────────── */

const GROUP_META: Record<
  "pillars" | "services" | "caseStudies",
  { label: string; Icon: typeof BookOpen }
> = {
  pillars: { label: "Related Intelligence", Icon: BookOpen },
  services: { label: "AGIX Services", Icon: Briefcase },
  caseStudies: { label: "Case Studies", Icon: FileText },
};

function RelatedGroup({
  groupKey,
  items,
}: {
  groupKey: keyof typeof GROUP_META;
  items: SEOEntity[];
}) {
  if (items.length === 0) return null;
  const { label, Icon } = GROUP_META[groupKey];
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-3 h-3 text-muted-foreground/60" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          {label}
        </span>
      </div>
      <ul className="space-y-1">
        {items.map((entity) => (
          <li key={entity.id}>
            <Link
              href={entity.url}
              className="group flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-card/60 px-3 py-2 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200"
              title={entity.entityName}
            >
              <span className="truncate">{entity.canonicalAnchor}</span>
              <ArrowRight className="w-3 h-3 shrink-0 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

export function SemanticRelated({
  currentUrl,
  clusterId,
  heading = "Continue Exploring",
  limit = 5,
}: SemanticRelatedProps) {
  const { pillars, services, caseStudies } = selectRelated(
    currentUrl,
    clusterId,
    limit,
  );

  const hasContent =
    pillars.length + services.length + caseStudies.length > 0;
  if (!hasContent) return null;

  return (
    <aside
      aria-label="Related content"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-border/50"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
        {heading}
      </p>
      <div className="grid sm:grid-cols-3 gap-5">
        <RelatedGroup groupKey="pillars" items={pillars} />
        <RelatedGroup groupKey="services" items={services} />
        <RelatedGroup groupKey="caseStudies" items={caseStudies} />
      </div>
    </aside>
  );
}
