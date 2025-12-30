"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, BookOpen, Wrench, X, ChevronUp } from "lucide-react";
import { useExploration } from "@/components/exploration/ExplorationContext";
import GlossaryPanel from "@/components/glossary/GlossaryPanel";
import ToolsPanel from "@/components/tools-nav/ToolsPanel";

export default function FloatingButtonStack() {
  const { openModal, isModalOpen } = useExploration();
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1" aria-hidden="true">
        <div className="w-32 h-8 bg-emerald-500/20 rounded-l-lg animate-pulse" />
        <div className="w-32 h-8 bg-blue-600/20 rounded-l-lg animate-pulse" />
        <div className="w-32 h-8 bg-purple-600/20 rounded-l-lg animate-pulse" />
      </div>
    );
  }

  const handleGuideClick = () => {
    setMobileMenuOpen(false);
    openModal();
  };

  const handleGlossaryClick = () => {
    setMobileMenuOpen(false);
    setGlossaryOpen(true);
  };

  const handleToolsClick = () => {
    setMobileMenuOpen(false);
    setToolsOpen(true);
  };

  return (
    <>
      {/* Desktop: Side rail buttons - centered vertically */}
      <div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1"
      >
        {!isModalOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            onClick={openModal}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-2 rounded-l-lg shadow-lg transition-all cursor-pointer border-l-2 border-t-2 border-b-2 border-emerald-400/50 hover:pr-4"
            data-testid="button-floating-guide"
          >
            <Compass className="h-4 w-4" />
            <span className="text-xs font-bold tracking-wide uppercase whitespace-nowrap">Guide Me</span>
          </motion.button>
        )}

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={() => setGlossaryOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-l-lg shadow-lg transition-all cursor-pointer border-l-2 border-t-2 border-b-2 border-blue-400/50 hover:pr-4"
          data-testid="button-floating-glossary"
        >
          <BookOpen className="h-4 w-4" />
          <span className="text-xs font-bold tracking-wide uppercase whitespace-nowrap">AI Glossary</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          onClick={() => setToolsOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-l-lg shadow-lg transition-all cursor-pointer border-l-2 border-t-2 border-b-2 border-purple-400/50 hover:pr-4"
          data-testid="button-floating-tools"
        >
          <Wrench className="h-4 w-4" />
          <span className="text-xs font-bold tracking-wide uppercase whitespace-nowrap">AI Tools</span>
        </motion.button>
      </div>

      {/* Mobile: Bottom dock with expandable menu */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/95 backdrop-blur-lg border-t border-slate-700 px-4 py-3"
            >
              <div className="flex justify-around gap-2 max-w-sm mx-auto">
                {!isModalOpen && (
                  <button
                    onClick={handleGuideClick}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex-1 min-w-0 active:scale-95 transition-transform"
                    data-testid="button-mobile-guide"
                  >
                    <Compass className="h-5 w-5 text-emerald-400" />
                    <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wide">Guide</span>
                  </button>
                )}
                
                <button
                  onClick={handleGlossaryClick}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 flex-1 min-w-0 active:scale-95 transition-transform"
                  data-testid="button-mobile-glossary"
                >
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span className="text-[10px] font-semibold text-blue-300 uppercase tracking-wide">Glossary</span>
                </button>
                
                <button
                  onClick={handleToolsClick}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 flex-1 min-w-0 active:scale-95 transition-transform"
                  data-testid="button-mobile-tools"
                >
                  <Wrench className="h-5 w-5 text-purple-400" />
                  <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wide">Tools</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile toggle button - thumb-friendly size */}
        <div className="bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-4 py-2">
          <div className="flex items-center justify-center">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/90 to-orange-500/90 text-white font-semibold shadow-lg shadow-primary/30 active:scale-95 transition-transform min-h-[48px]"
              whileTap={{ scale: 0.95 }}
              data-testid="button-mobile-dock-toggle"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="h-5 w-5" />
                  <span className="text-sm">Close</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm">AI Tools & Guide</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <GlossaryPanel isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <ToolsPanel isOpen={toolsOpen} onClose={() => setToolsOpen(false)} />
    </>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
