/**
 * SEO AUDIT REPORT — CLI script for registry validation.
 *
 * Run with:
 *   npx tsx src/scripts/seo-audit-report.ts
 *
 * Prints a structured report of all validation issues and the
 * semanticIntegrityScore. Exits with code 1 if any errors are found.
 */

import { validateRegistry } from "../lib/seo-validation";

const report = validateRegistry();

const SEVERITY_COLOR = {
  error: "\x1b[31m",   // red
  warning: "\x1b[33m", // yellow
  info: "\x1b[36m",    // cyan
} as const;
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const GREEN = "\x1b[32m";

console.log(`\n${BOLD}AGIX Technologies — SEO Registry Audit${RESET}`);
console.log(`${"─".repeat(50)}`);
console.log(`Timestamp  : ${report.timestamp}`);
console.log(`Entities   : ${report.totalEntities}`);
console.log(
  `Score      : ${report.semanticIntegrityScore >= 90 ? GREEN : SEVERITY_COLOR.warning}${report.semanticIntegrityScore}/100${RESET}`,
);
console.log(
  `Status     : ${report.passed ? `${GREEN}PASSED${RESET}` : `${SEVERITY_COLOR.error}FAILED${RESET}`}`,
);
console.log(`${"─".repeat(50)}`);

if (report.issues.length === 0) {
  console.log(`${GREEN}✓ No issues found.${RESET}\n`);
} else {
  console.log(`\nIssues (${report.issues.length}):\n`);
  for (const issue of report.issues) {
    const color = SEVERITY_COLOR[issue.severity];
    console.log(
      `  ${color}[${issue.severity.toUpperCase()}]${RESET} ${issue.entityId} — ${issue.code}`,
    );
    console.log(`           ${issue.message}`);
  }
  console.log();
}

// Exit with non-zero code if errors exist (useful in CI)
if (!report.passed) {
  process.exit(1);
}
