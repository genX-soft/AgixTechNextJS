"use client";

/**
 * SEO CONTEXT — Page-level governance for the semantic autolinking system.
 *
 * Provides:
 *   <SEOProvider>   — wraps a page, tracks link state, sets current path
 *   <NoAutoLink>    — marks structural zones where autolinking is forbidden
 *   useSEOContext() — hook for AutoLinkText to read and update state
 *
 * Protected zones (always wrap with <NoAutoLink>):
 *   - Hero sections
 *   - Navigation & breadcrumbs
 *   - Buttons and CTAs
 *   - Headings
 *   - Quote callouts
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   CONTEXT SHAPE
   ───────────────────────────────────────────────────────────────────────────── */

interface SEOContextValue {
  /** Normalised path of the current page (e.g. "/intelligence/autonomous-agentic-ai/") */
  currentPath: string;
  /** Whether we are inside a <NoAutoLink> zone */
  isProtectedZone: boolean;
  /** Returns true if this entity can be linked (not yet linked, under cap) */
  canLink: (entityId: string, maxLinksPerPage: number) => boolean;
  /** Called by AutoLinkText once it has rendered a link */
  registerLink: (entityId: string) => void;
}

const SEOContext = createContext<SEOContextValue | null>(null);

/* ─────────────────────────────────────────────────────────────────────────────
   PROVIDER
   ───────────────────────────────────────────────────────────────────────────── */

interface SEOProviderProps {
  currentPath: string;
  children: ReactNode;
}

export function SEOProvider({ currentPath, children }: SEOProviderProps) {
  // Use a ref for the linked-entity set so updates don't cause re-renders.
  // AutoLinkText reads this synchronously during render — a ref is safe here
  // because all AutoLinkText instances render top-to-bottom in a single pass.
  const linkedRef = useRef<Set<string>>(new Set());

  const canLink = useCallback(
    (entityId: string, maxLinksPerPage: number): boolean => {
      return (
        !linkedRef.current.has(entityId) &&
        linkedRef.current.size < maxLinksPerPage * 10 // safety global cap
      );
    },
    [],
  );

  const registerLink = useCallback((entityId: string) => {
    linkedRef.current.add(entityId);
  }, []);

  const value = useMemo<SEOContextValue>(
    () => ({
      currentPath,
      isProtectedZone: false,
      canLink,
      registerLink,
    }),
    [currentPath, canLink, registerLink],
  );

  return <SEOContext.Provider value={value}>{children}</SEOContext.Provider>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   NO-AUTO-LINK ZONE
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Wrap any structural section where autolinking must never occur:
 * hero, nav, headings, buttons, CTAs, pull-quotes.
 *
 * AutoLinkText checks isProtectedZone and renders plain text inside these.
 */
export function NoAutoLink({ children }: { children: ReactNode }) {
  const parent = useContext(SEOContext);

  // If there is no SEOProvider above us, just pass children through unchanged.
  if (!parent) return <>{children}</>;

  const protectedValue: SEOContextValue = {
    ...parent,
    isProtectedZone: true,
  };

  return (
    <SEOContext.Provider value={protectedValue}>{children}</SEOContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HOOK
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Access the SEO context from within AutoLinkText or any other seo component.
 * Returns null-safe defaults when called outside a SEOProvider.
 */
export function useSEOContext(): SEOContextValue {
  const ctx = useContext(SEOContext);
  if (!ctx) {
    // Safe fallback — outside a provider, never autolink anything.
    return {
      currentPath: "/",
      isProtectedZone: true,
      canLink: () => false,
      registerLink: () => {},
    };
  }
  return ctx;
}
