"use client";

import { useEffect, useRef, useCallback } from "react";

const BEHAVIOR_STORAGE_KEY = "agix_behavior_data";

export interface BehaviorData {
  pageEntryTime: number;
  maxScrollDepth: number;
  timeOnPage: number;
  ctaClicks: CTAClick[];
  exitIntent: boolean;
  interactionCount: number;
}

export interface CTAClick {
  ctaId: string;
  ctaText: string;
  ctaLocation: string;
  timestamp: number;
}

function getDefaultBehaviorData(): BehaviorData {
  return {
    pageEntryTime: Date.now(),
    maxScrollDepth: 0,
    timeOnPage: 0,
    ctaClicks: [],
    exitIntent: false,
    interactionCount: 0,
  };
}

export function getBehaviorData(): BehaviorData {
  if (typeof window === "undefined") return getDefaultBehaviorData();
  try {
    const stored = sessionStorage.getItem(BEHAVIOR_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      data.timeOnPage = Math.round((Date.now() - data.pageEntryTime) / 1000);
      return data;
    }
    return getDefaultBehaviorData();
  } catch {
    return getDefaultBehaviorData();
  }
}

export function clearBehaviorData(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(BEHAVIOR_STORAGE_KEY);
  } catch {}
}

function saveBehaviorData(data: BehaviorData): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(BEHAVIOR_STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function trackCTAClick(ctaId: string, ctaText: string, ctaLocation: string): void {
  if (typeof window === "undefined") return;
  const data = getBehaviorData();
  data.ctaClicks.push({
    ctaId,
    ctaText: ctaText.slice(0, 100),
    ctaLocation,
    timestamp: Date.now(),
  });
  data.interactionCount++;
  saveBehaviorData(data);
}

export function useBehaviorTracker() {
  const dataRef = useRef<BehaviorData | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const existingData = getBehaviorData();
    dataRef.current = {
      ...existingData,
      pageEntryTime: existingData.pageEntryTime || Date.now(),
    };

    const calculateScrollDepth = (): number => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return 100;
      return Math.min(100, Math.round((scrollTop / docHeight) * 100));
    };

    const handleScroll = () => {
      if (rafRef.current || !dataRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (!dataRef.current) return;
        const depth = calculateScrollDepth();
        if (depth > dataRef.current.maxScrollDepth) {
          dataRef.current.maxScrollDepth = depth;
          saveBehaviorData(dataRef.current);
        }
        rafRef.current = null;
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!dataRef.current) return;
      if (e.clientY <= 0 && !dataRef.current.exitIntent) {
        dataRef.current.exitIntent = true;
        saveBehaviorData(dataRef.current);
      }
    };

    const handleInteraction = () => {
      if (!dataRef.current) return;
      dataRef.current.interactionCount++;
      saveBehaviorData(dataRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("click", handleInteraction);

    const initialDepth = calculateScrollDepth();
    if (dataRef.current && initialDepth > dataRef.current.maxScrollDepth) {
      dataRef.current.maxScrollDepth = initialDepth;
      saveBehaviorData(dataRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("click", handleInteraction);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const getCurrentBehavior = useCallback(() => getBehaviorData(), []);

  return {
    getBehavior: getCurrentBehavior,
    trackCTA: trackCTAClick,
  };
}
