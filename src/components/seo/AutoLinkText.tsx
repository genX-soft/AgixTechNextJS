"use client";

/**
 * AUTO LINK TEXT — Safe, tokenized semantic autolinking for body copy.
 *
 * Converts the first occurrence of known semantic phrases in a plain-text
 * string into internal contextual links, governed by SEOContext.
 *
 * ── SAFETY GUARANTEES ──────────────────────────────────────────────────────
 *  ✓ No dangerouslySetInnerHTML — pure React element construction
 *  ✓ No nested links — renders as plain text inside <NoAutoLink> zones
 *  ✓ No self-linking — checks currentPath from SEOContext
 *  ✓ No duplicate links — one link per entity per page via SEOContext
 *  ✓ No over-linking — respects entity.maxLinksPerPage
 *  ✓ Hydration-safe — deterministic output (ref-based state, no random)
 *  ✓ Accessibility — links have descriptive text and natural reading flow
 *
 * ── USAGE ──────────────────────────────────────────────────────────────────
 *  Only use in educational body paragraphs. Never use in:
 *    - Headings (wrap with <NoAutoLink>)
 *    - Hero sections (wrap with <NoAutoLink>)
 *    - Navigation or CTAs (wrap with <NoAutoLink>)
 *    - Quote callouts
 *
 *  <AutoLinkText
 *    text="Organizations building agentic AI systems need strong governance..."
 *    clusterId="agentic-ai"
 *    className="text-muted-foreground leading-relaxed"
 *  />
 */

import Link from "next/link";
import { type ReactNode } from "react";
import {
  getLinkableEntities,
  type ClusterId,
  type SEOEntity,
} from "@/lib/seo-registry";
import { useSEOContext } from "@/context/SEOContext";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */

interface AutoLinkTextProps {
  /** Plain text content. Must not contain JSX — use children for rich markup. */
  text: string;
  /** Narrow candidates to this semantic cluster (optional). */
  clusterId?: ClusterId;
  /** Class applied to the wrapping <span>. */
  className?: string;
}

interface TextSegment {
  type: "text" | "link";
  content: string;
  entity?: SEOEntity;
}

/* ─────────────────────────────────────────────────────────────────────────────
   TOKENIZER
   ───────────────────────────────────────────────────────────────────────────── */

interface Match {
  start: number;
  end: number;
  variant: string;
  entity: SEOEntity;
}

/**
 * Find the earliest occurrence of any variant within `text`.
 * Returns null if no variant matches.
 */
function findFirstVariantMatch(
  text: string,
  entity: SEOEntity,
): { start: number; end: number; variant: string } | null {
  const lower = text.toLowerCase();
  let best: { start: number; end: number; variant: string } | null = null;

  for (const variant of entity.semanticVariants) {
    const idx = lower.indexOf(variant.toLowerCase());
    if (idx === -1) continue;

    // Require word-boundary on both sides to avoid partial-word matches.
    const before = idx > 0 ? text[idx - 1] : " ";
    const after =
      idx + variant.length < text.length ? text[idx + variant.length] : " ";
    const isWordBoundary = /[\s,.()'";:!?\-–—]/.test(before) && /[\s,.()'";:!?\-–—]/.test(after);
    // Also accept start/end of string
    const atStart = idx === 0;
    const atEnd = idx + variant.length === text.length;
    if (!isWordBoundary && !atStart && !atEnd) continue;

    if (!best || idx < best.start) {
      best = { start: idx, end: idx + variant.length, variant };
    }
  }
  return best;
}

/**
 * Build a non-overlapping, position-sorted list of matches from `text`.
 * One match per entity maximum. Overlapping matches are discarded
 * (earlier position wins).
 */
function buildMatches(
  text: string,
  candidates: SEOEntity[],
  canLink: (id: string, max: number) => boolean,
  registerLink: (id: string) => void,
): Match[] {
  const raw: Match[] = [];

  for (const entity of candidates) {
    if (!canLink(entity.id, entity.maxLinksPerPage)) continue;
    const found = findFirstVariantMatch(text, entity);
    if (!found) continue;
    raw.push({ ...found, entity });
  }

  // Sort by position ascending.
  raw.sort((a, b) => a.start - b.start);

  // Remove overlapping matches (greedy — first position wins).
  const accepted: Match[] = [];
  let cursor = 0;
  for (const m of raw) {
    if (m.start < cursor) continue; // overlaps a previously accepted match
    accepted.push(m);
    cursor = m.end;
    // Register immediately so the context knows this entity is consumed.
    registerLink(m.entity.id);
  }

  return accepted;
}

/**
 * Convert match list into a flat array of TextSegment objects.
 */
function buildSegments(text: string, matches: Match[]): TextSegment[] {
  const segments: TextSegment[] = [];
  let pos = 0;

  for (const m of matches) {
    if (m.start > pos) {
      segments.push({ type: "text", content: text.slice(pos, m.start) });
    }
    segments.push({
      type: "link",
      content: text.slice(m.start, m.end),
      entity: m.entity,
    });
    pos = m.end;
  }

  if (pos < text.length) {
    segments.push({ type: "text", content: text.slice(pos) });
  }

  return segments;
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

export function AutoLinkText({ text, clusterId, className }: AutoLinkTextProps) {
  const { currentPath, isProtectedZone, canLink, registerLink } = useSEOContext();

  // Inside a <NoAutoLink> zone — render plain text, zero links.
  if (isProtectedZone) {
    return <span className={className}>{text}</span>;
  }

  // Retrieve eligible candidates from the registry.
  const candidates = getLinkableEntities(currentPath, clusterId);

  // Build match list (mutates context ref via registerLink).
  const matches = buildMatches(text, candidates, canLink, registerLink);

  // No matches — fast path.
  if (matches.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const segments = buildSegments(text, matches);

  const nodes: ReactNode[] = segments.map((seg, i) => {
    if (seg.type === "link" && seg.entity) {
      return (
        <Link
          key={i}
          href={seg.entity.url}
          className="text-primary/80 hover:text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary/70 transition-colors font-medium"
          title={`Learn about ${seg.entity.entityName}`}
        >
          {seg.content}
        </Link>
      );
    }
    return <span key={i}>{seg.content}</span>;
  });

  return <span className={className}>{nodes}</span>;
}
