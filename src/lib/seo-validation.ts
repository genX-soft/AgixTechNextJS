/**
 * SEO VALIDATION — Integrity checks for the semantic registry.
 *
 * Run via `npx tsx src/scripts/seo-audit-report.ts` or import into tests.
 * Zero runtime cost in production — all checks operate on static data.
 */

import { getRegistry, SEOEntity } from "./seo-registry";

export interface ValidationIssue {
  severity: "error" | "warning" | "info";
  entityId: string;
  code: string;
  message: string;
}

export interface ValidationReport {
  timestamp: string;
  totalEntities: number;
  issues: ValidationIssue[];
  semanticIntegrityScore: number; // 0–100
  passed: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────────
   INDIVIDUAL CHECKS
   ───────────────────────────────────────────────────────────────────────────── */

/** Every relatedEntity id must resolve to a real registry entry. */
function checkBrokenReferences(entities: readonly SEOEntity[]): ValidationIssue[] {
  const ids = new Set(entities.map((e) => e.id));
  const issues: ValidationIssue[] = [];
  for (const entity of entities) {
    for (const ref of entity.relatedEntities) {
      if (!ids.has(ref)) {
        issues.push({
          severity: "error",
          entityId: entity.id,
          code: "BROKEN_REFERENCE",
          message: `relatedEntity "${ref}" does not exist in registry`,
        });
      }
    }
  }
  return issues;
}

/**
 * An entity is an orphan if:
 * - No other entity references it in relatedEntities, AND
 * - It is not a pillar (pillars are self-anchoring)
 */
function checkOrphanEntities(entities: readonly SEOEntity[]): ValidationIssue[] {
  const referenced = new Set(entities.flatMap((e) => e.relatedEntities));
  const issues: ValidationIssue[] = [];
  for (const entity of entities) {
    if (entity.relationshipType !== "pillar" && !referenced.has(entity.id)) {
      issues.push({
        severity: "warning",
        entityId: entity.id,
        code: "ORPHAN_ENTITY",
        message: `"${entity.entityName}" is not referenced by any other entity`,
      });
    }
  }
  return issues;
}

/** Two different entities sharing an identical canonicalAnchor causes confusion. */
function checkDuplicateAnchors(entities: readonly SEOEntity[]): ValidationIssue[] {
  const seen = new Map<string, string>();
  const issues: ValidationIssue[] = [];
  for (const entity of entities) {
    const key = entity.canonicalAnchor.toLowerCase();
    if (seen.has(key)) {
      issues.push({
        severity: "warning",
        entityId: entity.id,
        code: "DUPLICATE_ANCHOR",
        message: `canonicalAnchor "${entity.canonicalAnchor}" is already used by entity "${seen.get(key)}"`,
      });
    } else {
      seen.set(key, entity.id);
    }
  }
  return issues;
}

/** Entities with more than 3 semanticVariants per priority-1 entity may cause over-linking. */
function checkExcessiveVariants(entities: readonly SEOEntity[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const entity of entities) {
    if (entity.priority === 1 && entity.semanticVariants.length > 8) {
      issues.push({
        severity: "info",
        entityId: entity.id,
        code: "EXCESSIVE_VARIANTS",
        message: `Priority-1 entity has ${entity.semanticVariants.length} variants — consider pruning to the most specific`,
      });
    }
  }
  return issues;
}

/** Every URL should start and end with "/" and not be empty. */
function checkInvalidUrls(entities: readonly SEOEntity[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const entity of entities) {
    if (!entity.url.startsWith("/") || !entity.url.endsWith("/")) {
      issues.push({
        severity: "error",
        entityId: entity.id,
        code: "INVALID_URL",
        message: `URL "${entity.url}" must start and end with "/"`,
      });
    }
    if (entity.url.length < 3) {
      issues.push({
        severity: "error",
        entityId: entity.id,
        code: "EMPTY_URL",
        message: `URL "${entity.url}" is too short to be valid`,
      });
    }
  }
  return issues;
}

/** Entities should have at least one semanticVariant. */
function checkEmptyVariants(entities: readonly SEOEntity[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const entity of entities) {
    if (entity.semanticVariants.length === 0) {
      issues.push({
        severity: "error",
        entityId: entity.id,
        code: "NO_VARIANTS",
        message: `"${entity.entityName}" has no semanticVariants — it will never be autolinked`,
      });
    }
  }
  return issues;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCORE CALCULATION
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * semanticIntegrityScore: 0–100
 * Starts at 100, deducts per issue severity.
 */
function computeScore(
  totalEntities: number,
  issues: ValidationIssue[],
): number {
  const deductions = issues.reduce((acc, issue) => {
    if (issue.severity === "error") return acc + 5;
    if (issue.severity === "warning") return acc + 2;
    return acc + 0.5;
  }, 0);
  return Math.max(0, Math.round(100 - deductions));
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUBLIC API
   ───────────────────────────────────────────────────────────────────────────── */

/** Run all validation checks and return a structured report. */
export function validateRegistry(): ValidationReport {
  const entities = getRegistry();
  const issues: ValidationIssue[] = [
    ...checkBrokenReferences(entities),
    ...checkOrphanEntities(entities),
    ...checkDuplicateAnchors(entities),
    ...checkExcessiveVariants(entities),
    ...checkInvalidUrls(entities),
    ...checkEmptyVariants(entities),
  ];

  const score = computeScore(entities.length, issues);

  return {
    timestamp: new Date().toISOString(),
    totalEntities: entities.length,
    issues,
    semanticIntegrityScore: score,
    passed: !issues.some((i) => i.severity === "error"),
  };
}

/** Quick boolean check — useful in CI or test pipelines. */
export function isRegistryValid(): boolean {
  return validateRegistry().passed;
}
