"use client";

import { useState, useEffect, useRef } from "react";
import {
  Brain,
  MessageSquare,
  Lightbulb,
  Zap,
  TrendingUp,
  Clock,
  Eye,
  Database,
  Users,
} from "lucide-react";

const aiFacts = [
  { fact: "AI can process documents 100x faster than humans while maintaining 99% accuracy", icon: Zap },
  { fact: "Companies using AI chatbots reduce customer service costs by up to 30%", icon: MessageSquare },
  { fact: "Predictive AI can forecast demand with 95% accuracy, reducing inventory waste", icon: TrendingUp },
  { fact: "Voice AI agents can handle 10,000+ calls simultaneously without fatigue", icon: Users },
  { fact: "AI-powered automation can save businesses 20+ hours per week on repetitive tasks", icon: Clock },
  { fact: "Machine learning models improve by 15–25% every year through continuous learning", icon: Brain },
  { fact: "Computer vision AI can detect manufacturing defects invisible to the human eye", icon: Eye },
  { fact: "RAG systems can search through millions of documents in under 3 seconds", icon: Database },
];

interface Props {
  /** When true the banner is absolutely positioned inside its parent (the hero
   *  section). When false (default) it is a fixed full-width overlay. */
  embedded?: boolean;
}

export default function DidYouKnowBanner({ embedded = false }: Props) {
  const [currentFact, setCurrentFact] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Rotate facts every 5 s */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % aiFacts.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const CurrentIcon = aiFacts[currentFact].icon;

  /* Positioning: embedded → absolute inside hero; standalone → fixed global */
  const positionClass = embedded
    ? "absolute bottom-0 left-0 right-0 z-20"
    : "fixed  bottom-0 left-0 right-0 z-40";

  return (
    <div aria-live="polite" aria-label="AI fact" className={positionClass}>
      {/* Animated top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />

      {/* Body */}
      <div className="relative bg-slate-900/95 backdrop-blur-xl">
        {/* Subtle inner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/[0.03] via-transparent to-cyan-500/[0.03]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 relative">
          {/* Progress bar */}
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-orange-500/40 transition-all duration-[5000ms] ease-linear"
            style={{ width: "100%" }}
            key={currentFact}
          />

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Pulsing live dot */}
            <span className="relative shrink-0 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-50" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>

            {/* Label */}
            <div className="flex items-center gap-1.5 text-orange-400 text-sm font-semibold whitespace-nowrap shrink-0">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Did you know?</span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-4 w-px bg-slate-700 shrink-0" />

            {/* Rotating fact */}
            <div
              key={currentFact}
              className="flex items-center gap-2 min-w-0 animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <CurrentIcon className="hidden sm:block w-3.5 h-3.5 text-orange-400/60 shrink-0" />
              <span className="text-slate-300 text-sm leading-snug truncate">
                {aiFacts[currentFact].fact}
              </span>
            </div>

            {/* Progress dots */}
            <div className="hidden lg:flex items-center gap-1.5 ml-auto shrink-0">
              {aiFacts.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Fact ${i + 1}`}
                  onClick={() => setCurrentFact(i)}
                  className={[
                    "rounded-full transition-all duration-300",
                    i === currentFact
                      ? "w-5 h-1.5 bg-orange-500"
                      : "w-1.5 h-1.5 bg-slate-600 hover:bg-slate-500",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
