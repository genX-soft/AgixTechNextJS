"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Send, Home, X } from "lucide-react";
import Link from "next/link";

export interface QuestionOption {
  value: string;
  label: string;
  score: number;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface ResultLevel {
  minScore: number;
  maxScore: number;
  level: string;
  color: string;
  description: string;
  whatAiCanDo: string[];
  recommendedPath: {
    title: string;
    link: string;
  };
  journey: {
    now: string;
    next: string;
    later: string;
  };
  nextActions: {
    label: string;
    link: string;
  }[];
}

export interface AssessmentConfig {
  title: string;
  subtitle: string;
  intro: string;
  questions: Question[];
  resultLevels: ResultLevel[];
}

interface AssessmentWizardProps {
  config: AssessmentConfig;
}

export function AssessmentWizard({ config }: AssessmentWizardProps) {
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = config.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    const newScores = { ...scores, [questionId]: score };
    setAnswers(newAnswers);
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStep("result");
      }
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setStep("intro");
    }
  };

  const restart = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setScores({});
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: `assessment_${config.title.toLowerCase().replace(/\s+/g, '_')}`,
          metadata: {
            answers,
            totalScore: Object.values(scores).reduce((sum, s) => sum + s, 0),
            resultLevel: resultLevel?.level,
          }
        })
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const resultLevel = config.resultLevels.find(
    (level) => totalScore >= level.minScore && totalScore <= level.maxScore
  ) || config.resultLevels[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors" data-testid="link-exit-to-home">
            <Home className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <Link href="/" data-testid="button-close-assessment">
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-16">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                  <Badge variant="outline" className="mb-2">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Guided Assessment
                  </Badge>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {config.title}
                  </h1>
                  
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    {config.subtitle}
                  </p>
                  
                  <div className="bg-muted/30 rounded-lg p-6 text-left max-w-lg mx-auto">
                    <p className="text-sm text-muted-foreground">
                      {config.intro}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>{totalQuestions} questions</span>
                    <span className="text-border">|</span>
                    <span>~2 minutes</span>
                  </div>
                  
                  <Button
                    size="lg"
                    onClick={() => setStep("questions")}
                    data-testid="button-start-assessment"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "questions" && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border/50 overflow-hidden">
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {totalQuestions}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goBack}
                      disabled={currentQuestion === 0}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <CardContent className="p-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
                    {config.questions[currentQuestion].question}
                  </h2>
                  
                  <div className="space-y-3">
                    {config.questions[currentQuestion].options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(
                          config.questions[currentQuestion].id,
                          option.value,
                          option.score
                        )}
                        className={`w-full p-4 text-left rounded-lg border transition-all ${
                          answers[config.questions[currentQuestion].id] === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
                        }`}
                        data-testid={`option-${option.value}`}
                      >
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-8 md:p-12 space-y-8">
                  <div className="text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${resultLevel.color}`}>
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                    
                    <div>
                      <Badge variant="outline" className="mb-2">Your AI Readiness Level</Badge>
                      <h2 className="text-2xl md:text-3xl font-bold">{resultLevel.level}</h2>
                    </div>
                    
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      {resultLevel.description}
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      What AI Can Realistically Do for You
                    </h3>
                    <ul className="space-y-2">
                      {resultLevel.whatAiCanDo.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Recommended Path Forward</h3>
                    <Link href={resultLevel.recommendedPath.link}>
                      <Card className="hover-elevate border-primary/50 bg-primary/5">
                        <CardContent className="p-4 flex items-center justify-between">
                          <span className="font-medium">{resultLevel.recommendedPath.title}</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </CardContent>
                      </Card>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Your AI Journey</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <Badge variant="secondary" className="mb-2">Now</Badge>
                        <p className="text-sm text-muted-foreground">{resultLevel.journey.now}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <Badge variant="secondary" className="mb-2">Next</Badge>
                        <p className="text-sm text-muted-foreground">{resultLevel.journey.next}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <Badge variant="secondary" className="mb-2">Later</Badge>
                        <p className="text-sm text-muted-foreground">{resultLevel.journey.later}</p>
                      </div>
                    </div>
                  </div>

                  {!isSubmitted ? (
                    <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-6 space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">Get Your Personalized AI Roadmap</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          We'll send detailed recommendations based on your assessment results.
                        </p>
                      </div>
                      <form onSubmit={handleEmailSubmit} className="flex gap-2 max-w-md mx-auto">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                          required
                          data-testid="input-assessment-email"
                        />
                        <Button type="submit" disabled={isSubmitting} data-testid="button-submit-assessment">
                          {isSubmitting ? "..." : <><Send className="h-4 w-4 mr-2" /> Send</>}
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">Your roadmap is on its way!</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Check your email for personalized recommendations.
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="font-semibold">Your Next Steps</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {resultLevel.nextActions.map((action, i) => (
                        <Button key={i} variant={i === 0 ? "default" : "outline"} asChild>
                          <Link href={action.link}>
                            {action.label}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Ready to discuss your AI strategy with an expert?
                    </p>
                    <Button asChild>
                      <Link href="/corporate/contact" data-testid="link-talk-to-expert">
                        Talk to an AI Expert
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep("questions")} data-testid="button-go-back">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Questions
                    </Button>
                    <Button variant="ghost" onClick={restart} data-testid="button-restart-assessment">
                      Start Over
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
