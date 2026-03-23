"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { ExplorationState, PageType } from "@/lib/exploration/types";
import { loadState, saveState, resetState } from "@/lib/exploration/storage";
import { detectPageType, getPageContextDefaults } from "@/lib/exploration/pageContext";
import { usePathname } from "next/navigation";

interface ExplorationContextType {
  state: ExplorationState | null;
  updateState: (patch: Partial<ExplorationState>) => void;
  resetExploration: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ExplorationContext = createContext<ExplorationContextType | null>(null);

export function ExplorationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<ExplorationState | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const stored = loadState();
    if (stored) {
      const updatedPagesVisited = stored.pagesVisited.includes(pathname)
        ? stored.pagesVisited
        : [...stored.pagesVisited, pathname];
      
      const updatedState = {
        ...stored,
        pagesVisited: updatedPagesVisited,
        lastUpdatedAt: Date.now(),
      };
      setState(updatedState);
      saveState(updatedState);
    } else {
      const pageCtx = detectPageType(pathname);
      const defaults = getPageContextDefaults(pageCtx.pageType, pageCtx.slug);
      
      const fresh: ExplorationState = {
        sessionId: crypto.randomUUID(),
        entryUrl: pathname,
        pageType: pageCtx.pageType,
        pageSlug: pageCtx.slug,
        answers: defaults,
        maturityScore: 0,
        confidence: "LOW",
        recommendedServices: [],
        recommendedTools: [],
        recommendedCaseStudies: [],
        toolsCompleted: [],
        pagesVisited: [pathname],
        lastUpdatedAt: Date.now(),
      };
      setState(fresh);
      saveState(fresh);
    }
  }, [pathname, isMounted]);

  const updateState = useCallback((patch: Partial<ExplorationState>) => {
    setState((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch, lastUpdatedAt: Date.now() };
      saveState(next);
      return next;
    });
  }, []);

  const resetExploration = useCallback(() => {
    resetState();
    const pageCtx = detectPageType(pathname);
    const defaults = getPageContextDefaults(pageCtx.pageType, pageCtx.slug);
    
    const fresh: ExplorationState = {
      sessionId: crypto.randomUUID(),
      entryUrl: pathname,
      pageType: pageCtx.pageType,
      pageSlug: pageCtx.slug,
      answers: defaults,
      maturityScore: 0,
      confidence: "LOW",
      recommendedServices: [],
      recommendedTools: [],
      recommendedCaseStudies: [],
      toolsCompleted: [],
      pagesVisited: [pathname],
      lastUpdatedAt: Date.now(),
    };
    setState(fresh);
    saveState(fresh);
  }, [pathname]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <ExplorationContext.Provider 
      value={{ 
        state, 
        updateState, 
        resetExploration, 
        isModalOpen, 
        openModal, 
        closeModal 
      }}
    >
      {children}
    </ExplorationContext.Provider>
  );
}

export function useExploration() {
  const context = useContext(ExplorationContext);
  if (!context) {
    return {
      state: null,
      updateState: () => {},
      resetExploration: () => {},
      isModalOpen: false,
      openModal: () => {},
      closeModal: () => {},
    };
  }
  return context;
}
