"use client";

import { useCallback, useState, useEffect } from "react";
import { useExploration } from "./ExplorationContext";
import { useExitIntent, useScrollTrigger } from "@/lib/exploration/hooks";
import ExplorationModal from "./ExplorationModal";

export default function ExplorationLauncher() {
  const { openModal, isModalOpen, state } = useExploration();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasCompletedCTA = state?.ctaCompleted === true;
  const shouldTrigger = !isModalOpen && !hasCompletedCTA;

  const handleTrigger = useCallback(() => {
    if (shouldTrigger) {
      openModal();
    }
  }, [shouldTrigger, openModal]);

  useExitIntent(handleTrigger, shouldTrigger && isMounted);
  useScrollTrigger(handleTrigger, 0.4, shouldTrigger && isMounted);

  if (!isMounted) return null;

  return <ExplorationModal />;
}
