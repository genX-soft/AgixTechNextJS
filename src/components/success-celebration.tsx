'use client'

import { useState, createContext, useContext, useCallback } from "react";
import dynamic from "next/dynamic";

const SuccessCelebrationAnimation = dynamic(
  () => import("./success-celebration-animation"),
  { ssr: false, loading: () => null }
);

interface CelebrationContextType {
  triggerCelebration: () => void;
}

const CelebrationContext = createContext<CelebrationContextType>({
  triggerCelebration: () => {},
});

export const useCelebration = () => useContext(CelebrationContext);

export function CelebrationProvider({ children }: { children: React.ReactNode }) {
  const [showCelebration, setShowCelebration] = useState(false);

  const triggerCelebration = useCallback(() => {
    setShowCelebration(true);
  }, []);

  const handleComplete = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return (
    <CelebrationContext.Provider value={{ triggerCelebration }}>
      {children}
      {showCelebration && (
        <SuccessCelebrationAnimation isVisible={showCelebration} onComplete={handleComplete} />
      )}
    </CelebrationContext.Provider>
  );
}
