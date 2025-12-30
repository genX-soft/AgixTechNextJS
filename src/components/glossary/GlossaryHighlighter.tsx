"use client";

import { useMemo } from "react";
import GlossaryTooltip from "./GlossaryTooltip";
import { getAllTermPatterns, findTerm, GlossaryTerm } from "@/lib/glossary/terms";

interface GlossaryHighlighterProps {
  children: string;
  className?: string;
}

interface TextSegment {
  type: "text" | "term";
  content: string;
  term?: GlossaryTerm;
}

// Escape regex special characters but preserve the pattern for matching
function escapeForRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function GlossaryHighlighter({ children, className }: GlossaryHighlighterProps) {
  const segments = useMemo(() => {
    if (!children || typeof children !== "string") {
      return [{ type: "text" as const, content: children || "" }];
    }

    const patterns = getAllTermPatterns();
    const result: TextSegment[] = [];
    let lastIndex = 0;

    // Build individual patterns with appropriate boundaries
    // For terms with dots (like "A.I."), don't use word boundaries
    const patternParts = patterns.map(p => {
      const escaped = escapeForRegex(p);
      // If term contains periods or special chars, match it exactly
      if (/[.\-]/.test(p)) {
        return `(${escaped})`;
      }
      // Otherwise use word boundaries
      return `\\b(${escaped})\\b`;
    });

    if (patternParts.length === 0) {
      return [{ type: "text" as const, content: children }];
    }

    const regex = new RegExp(patternParts.join("|"), "gi");

    let match;
    const matches: { index: number; length: number; text: string }[] = [];
    
    while ((match = regex.exec(children)) !== null) {
      // Find which group matched (non-undefined)
      const matchedText = match[0];
      matches.push({
        index: match.index,
        length: matchedText.length,
        text: matchedText,
      });
    }

    // Remove overlapping matches (keep longer ones)
    const filteredMatches = matches.filter((m, i) => {
      for (let j = 0; j < matches.length; j++) {
        if (i !== j) {
          const other = matches[j];
          // If this match overlaps with a longer match, remove it
          if (
            ((m.index >= other.index && m.index < other.index + other.length) ||
             (m.index + m.length > other.index && m.index + m.length <= other.index + other.length)) &&
            m.length < other.length
          ) {
            return false;
          }
          // If this match is completely contained in another, remove it
          if (
            m.index >= other.index &&
            m.index + m.length <= other.index + other.length &&
            m.length < other.length
          ) {
            return false;
          }
        }
      }
      return true;
    });

    // Sort by index
    filteredMatches.sort((a, b) => a.index - b.index);

    // Build segments
    filteredMatches.forEach((m) => {
      // Add text before this match
      if (m.index > lastIndex) {
        result.push({
          type: "text",
          content: children.slice(lastIndex, m.index),
        });
      }

      // Add the term match
      const term = findTerm(m.text);
      if (term) {
        result.push({
          type: "term",
          content: m.text,
          term,
        });
      } else {
        result.push({
          type: "text",
          content: m.text,
        });
      }

      lastIndex = m.index + m.length;
    });

    // Add remaining text
    if (lastIndex < children.length) {
      result.push({
        type: "text",
        content: children.slice(lastIndex),
      });
    }

    return result.length > 0 ? result : [{ type: "text" as const, content: children }];
  }, [children]);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === "term" && segment.term) {
          return (
            <GlossaryTooltip key={index} term={segment.term}>
              {segment.content}
            </GlossaryTooltip>
          );
        }
        return <span key={index}>{segment.content}</span>;
      })}
    </span>
  );
}
