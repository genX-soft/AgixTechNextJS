"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import { GlossaryTerm } from "@/lib/glossary/terms";

interface GlossaryTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

const CATEGORY_COLORS = {
  fundamentals: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  techniques: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  applications: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  business: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const CATEGORY_LABELS = {
  fundamentals: "AI Fundamentals",
  techniques: "Techniques",
  applications: "Applications",
  business: "Business",
};

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Close on click outside (for mobile)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <span 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span 
        className="border-b border-dashed border-primary/50 cursor-help text-primary/90 hover:text-primary hover:border-primary transition-colors"
        onClick={handleClick}
        onTouchEnd={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
        data-testid={`glossary-term-${term.term.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {children}
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-72"
          >
            <div className="bg-card border border-border rounded-lg shadow-xl p-3">
              <div className="flex items-start gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{term.term}</p>
                  <span className={`inline-block text-xs px-1.5 py-0.5 rounded border mt-1 ${CATEGORY_COLORS[term.category]}`}>
                    {CATEGORY_LABELS[term.category]}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {term.definition}
              </p>
              {/* Arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
