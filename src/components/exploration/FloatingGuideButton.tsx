"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { useExploration } from "./ExplorationContext";

export default function FloatingGuideButton() {
  const { openModal, isModalOpen } = useExploration();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  
  // Button is always visible except when modal is open
  if (isModalOpen) return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      onClick={openModal}
      className="fixed right-0 z-40 hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-4 rounded-l-xl shadow-xl transition-all cursor-pointer border-2 border-emerald-400/50 hover:scale-105"
      style={{ 
        writingMode: "vertical-rl", 
        textOrientation: "mixed",
        top: "calc(50% - 120px)",
        transform: "translateY(-50%)"
      }}
      data-testid="button-floating-guide"
    >
      <Compass className="h-5 w-5 rotate-90" />
      <span className="text-sm font-bold tracking-wider uppercase whitespace-nowrap">Guide Me</span>
    </motion.button>
  );
}
