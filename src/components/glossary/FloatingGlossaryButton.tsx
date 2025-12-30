"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import GlossaryPanel from "./GlossaryPanel";

export default function FloatingGlossaryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-0 z-40 hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-4 rounded-l-xl shadow-xl transition-all cursor-pointer border-2 border-blue-400/50 hover:scale-105"
        style={{ 
          writingMode: "vertical-rl", 
          textOrientation: "mixed",
          top: "50%",
          transform: "translateY(-50%)"
        }}
        data-testid="button-floating-glossary"
      >
        <BookOpen className="h-5 w-5 rotate-90" />
        <span className="text-sm font-bold tracking-wider uppercase whitespace-nowrap">AI Glossary</span>
      </motion.button>

      <GlossaryPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
