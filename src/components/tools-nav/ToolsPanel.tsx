"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, X, Search, ArrowRight, Sparkles, Brain, Building2, Briefcase, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AI_TOOLS, CATEGORY_INFO, AITool } from "@/lib/tools/toolsData";

interface ToolsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS = {
  assessments: Sparkles,
  intelligence: Brain,
  services: Briefcase,
  industries: Building2,
};

const CATEGORIES = ["assessments", "intelligence", "services", "industries"] as const;

export default function ToolsPanel({ isOpen, onClose }: ToolsPanelProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingHref, setLoadingHref] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    let tools = AI_TOOLS;

    if (selectedCategory) {
      tools = tools.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return tools;
  }, [searchQuery, selectedCategory]);

  const groupedTools = useMemo(() => {
    const groups: Record<string, AITool[]> = {};
    filteredTools.forEach((tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    return groups;
  }, [filteredTools]);

  // Fast navigation with immediate feedback
  const handleToolClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setLoadingHref(href);
    onClose();
    // Navigate immediately
    router.push(href);
  }, [router, onClose]);

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
                <Wrench className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-lg">AI Tools & Solutions</h2>
                <Badge variant="secondary" className="text-xs">
                  {AI_TOOLS.length} items
                </Badge>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                data-testid="button-close-tools"
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
                  placeholder="Search tools & solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-tools-search"
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
                  data-testid="button-filter-all-tools"
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                      selectedCategory === cat
                        ? CATEGORY_INFO[cat].color
                        : "bg-transparent border-border hover:bg-accent"
                    }`}
                    data-testid={`button-filter-${cat}`}
                  >
                    {CATEGORY_INFO[cat].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools list */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredTools.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No tools found</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {CATEGORIES.filter(cat => groupedTools[cat]?.length > 0).map((category) => {
                    const CategoryIcon = CATEGORY_ICONS[category];
                    return (
                      <div key={category}>
                        <div className="flex items-center gap-2 mb-3">
                          <CategoryIcon className="h-4 w-4 text-primary" />
                          <h3 className="text-sm font-semibold">{CATEGORY_INFO[category].label}</h3>
                          <Badge variant="outline" className="text-xs">
                            {groupedTools[category].length}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {groupedTools[category].map((tool) => (
                            <Link
                              key={tool.href}
                              href={tool.href}
                              prefetch={true}
                              onClick={(e) => handleToolClick(e, tool.href)}
                              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors group cursor-pointer"
                              data-testid={`tool-link-${tool.href.replace(/\//g, "-")}`}
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                  {tool.name}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {tool.description}
                                </p>
                              </div>
                              {loadingHref === tool.href ? (
                                <Loader2 className="h-4 w-4 text-primary animate-spin flex-shrink-0" />
                              ) : (
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
