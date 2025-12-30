"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AI_GLOSSARY, GlossaryTerm } from "@/lib/glossary/terms";

interface GlossaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_COLORS = {
  fundamentals: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  techniques: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  applications: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  business: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const CATEGORY_LABELS = {
  fundamentals: "Fundamentals",
  techniques: "Techniques",
  applications: "Applications",
  business: "Business",
};

const CATEGORIES = ["fundamentals", "techniques", "applications", "business"] as const;

export default function GlossaryPanel({ isOpen, onClose }: GlossaryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = AI_GLOSSARY;

    if (selectedCategory) {
      terms = terms.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(query) ||
          t.definition.toLowerCase().includes(query) ||
          t.aliases?.some((a) => a.toLowerCase().includes(query))
      );
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Panel - slides up on mobile, slides from right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 0, y: "100%" }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-auto h-[85vh] sm:inset-x-auto sm:right-0 sm:top-0 sm:bottom-0 sm:h-auto w-full sm:max-w-md bg-card border-t sm:border-t-0 sm:border-l border-border shadow-2xl z-50 flex flex-col rounded-t-2xl sm:rounded-none pb-safe"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-lg">AI Glossary</h2>
                <Badge variant="secondary" className="text-xs">
                  {AI_GLOSSARY.length} terms
                </Badge>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                data-testid="button-close-glossary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-glossary-search"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent border-border hover:bg-accent"
                  }`}
                  data-testid="button-filter-all"
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                      selectedCategory === cat
                        ? CATEGORY_COLORS[cat]
                        : "bg-transparent border-border hover:bg-accent"
                    }`}
                    data-testid={`button-filter-${cat}`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms list */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredTerms.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No terms found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(groupedTerms).map(([letter, terms]) => (
                    <div key={letter}>
                      <div className="sticky top-0 bg-card/95 backdrop-blur-sm py-1 mb-2">
                        <span className="text-xs font-bold text-primary">{letter}</span>
                      </div>
                      <div className="space-y-3">
                        {terms.map((term) => (
                          <div
                            key={term.term}
                            className="p-3 rounded-lg border border-border bg-card/50"
                            data-testid={`glossary-entry-${term.term.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-medium text-sm">{term.term}</h3>
                              <span className={`text-xs px-1.5 py-0.5 rounded border flex-shrink-0 ${CATEGORY_COLORS[term.category]}`}>
                                {CATEGORY_LABELS[term.category]}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {term.definition}
                            </p>
                            {term.aliases && term.aliases.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {term.aliases.map((alias) => (
                                  <span
                                    key={alias}
                                    className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground"
                                  >
                                    {alias}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
