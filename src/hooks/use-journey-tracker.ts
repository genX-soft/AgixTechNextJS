"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import type { JourneyEntry } from "@shared/schema";

const JOURNEY_STORAGE_KEY = "agix_user_journey";
const MAX_JOURNEY_ENTRIES = 20;

export function getJourney(): JourneyEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(JOURNEY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearJourney(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(JOURNEY_STORAGE_KEY);
  } catch {}
}

function addJourneyEntry(path: string, title?: string): void {
  if (typeof window === "undefined") return;
  try {
    const journey = getJourney();
    const lastEntry = journey[journey.length - 1];
    if (lastEntry?.path === path) return;
    
    const newEntry: JourneyEntry = {
      path,
      title: title || document.title,
      timestamp: Date.now(),
    };
    
    journey.push(newEntry);
    
    if (journey.length > MAX_JOURNEY_ENTRIES) {
      journey.shift();
    }
    
    sessionStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(journey));
  } catch {}
}

export function useJourneyTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const timer = setTimeout(() => {
        addJourneyEntry(pathname);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const getCurrentJourney = useCallback(() => getJourney(), []);
  const getCurrentPath = useCallback(() => pathname, [pathname]);

  return {
    journey: getCurrentJourney,
    currentPath: getCurrentPath,
  };
}
