"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useExploration } from "./ExplorationContext";
import { getVisibleQuestions } from "@/lib/exploration/questionBank";
import { buildRecommendations } from "@/lib/exploration/recommender";
import { UserType, AnswerValue } from "@/lib/exploration/types";
import ExplorationResults from "./ExplorationResults";

// Unified compelling title for all pages
const UNIFIED_TITLE = "Discover Your AI Journey";
const UNIFIED_SUBTITLE = "Find out exactly where AI fits in your business — in under 60 seconds";

export default function ExplorationModal() {
  const { state, updateState, resetExploration, isModalOpen, closeModal } = useExploration();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);

  const visibleQuestions = useMemo(() => {
    if (!state) return [];
    return getVisibleQuestions(
      state.pageType,
      state.answers.userType as UserType | undefined,
      state.pageSlug,
      state.answers
    );
  }, [state]);

  const currentQuestion = visibleQuestions[currentIndex];
  const progress = visibleQuestions.length > 0 
    ? ((currentIndex) / visibleQuestions.length) * 100 
    : 0;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (currentQuestion?.type === "multi") {
      const existing = state?.answers[currentQuestion.id];
      if (Array.isArray(existing)) {
        setSelectedMulti(existing as string[]);
      } else {
        setSelectedMulti([]);
      }
    }
  }, [currentQuestion, state?.answers]);

  if (!isModalOpen || !state) return null;

  const handleSingleAnswer = (value: string) => {
    const nextAnswers = { ...state.answers, [currentQuestion.id]: value };
    updateState({ answers: nextAnswers });

    if (currentIndex + 1 >= visibleQuestions.length) {
      const finalState = buildRecommendations({ ...state, answers: nextAnswers });
      updateState(finalState);
      setShowResults(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleMultiToggle = (value: string) => {
    setSelectedMulti(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      }
      if (prev.length >= 3) return prev;
      return [...prev, value];
    });
  };

  const handleMultiSubmit = () => {
    const nextAnswers = { ...state.answers, [currentQuestion.id]: selectedMulti };
    updateState({ answers: nextAnswers });

    if (currentIndex + 1 >= visibleQuestions.length) {
      const finalState = buildRecommendations({ ...state, answers: nextAnswers });
      updateState(finalState);
      setShowResults(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReset = () => {
    resetExploration();
    setCurrentIndex(0);
    setShowResults(false);
    setSelectedMulti([]);
  };

  const handleClose = () => {
    closeModal();
    setCurrentIndex(0);
    setShowResults(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
        onClick={handleClose}
        data-testid="modal-exploration-backdrop"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg max-h-[90vh] sm:max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="relative overflow-hidden bg-background border-border rounded-t-2xl sm:rounded-lg max-h-[90vh] sm:max-h-none overflow-y-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute right-3 top-3 z-10"
              data-testid="button-close-exploration"
            >
              <X className="h-4 w-4" />
            </Button>

            {!showResults ? (
              <div className="p-6">
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-primary">
                      {UNIFIED_TITLE}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {UNIFIED_SUBTITLE}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      Step {currentIndex + 1} of {visibleQuestions.length}
                    </span>
                    {currentIndex > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="text-xs"
                        data-testid="button-back-question"
                      >
                        <ChevronLeft className="h-3 w-3 mr-1" />
                        Back
                      </Button>
                    )}
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion?.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      {currentQuestion?.title}
                    </h2>
                    {currentQuestion?.helper && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {currentQuestion.helper}
                      </p>
                    )}

                    <div className="space-y-2 mt-4">
                      {currentQuestion?.type === "single" && currentQuestion.options?.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSingleAnswer(opt.value)}
                          className="w-full text-left px-4 py-4 sm:py-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent transition-colors active:scale-[0.98] touch-target"
                          data-testid={`option-${opt.value}`}
                        >
                          <span className="text-sm sm:text-sm">{opt.label}</span>
                        </button>
                      ))}

                      {currentQuestion?.type === "multi" && (
                        <>
                          {currentQuestion.options?.map((opt) => {
                            const isSelected = selectedMulti.includes(opt.value);
                            const isDisabled = !isSelected && selectedMulti.length >= 3;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => handleMultiToggle(opt.value)}
                                disabled={isDisabled}
                                className={`w-full text-left px-4 py-4 sm:py-3 rounded-lg border transition-colors flex items-center justify-between active:scale-[0.98] touch-target ${
                                  isSelected 
                                    ? "border-primary bg-primary/10" 
                                    : isDisabled 
                                      ? "border-border bg-muted opacity-50 cursor-not-allowed"
                                      : "border-border bg-card hover:bg-accent"
                                }`}
                                data-testid={`option-multi-${opt.value}`}
                              >
                                <span className="text-sm">{opt.label}</span>
                                {isSelected && <Check className="h-5 w-5 sm:h-4 sm:w-4 text-primary" />}
                              </button>
                            );
                          })}
                          <Button
                            onClick={handleMultiSubmit}
                            className="w-full mt-4"
                            disabled={selectedMulti.length === 0}
                            data-testid="button-continue-multi"
                          >
                            Continue
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <ExplorationResults onReset={handleReset} onClose={handleClose} />
            )}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
