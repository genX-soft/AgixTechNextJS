"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MainHeader } from "@/components/main-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
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
import { LazyMount } from "@/components/lazy-mount";
import styles from "./page.module.css";

const DynamicGuidedAssessment = dynamic(
  () => import("@/components/home/GuidedAssessment"),
  { ssr: false }
);

const DynamicContactSection = dynamic(
  () => import("@/components/home/contact-section").then((m) => ({ default: m.ContactSection }))
);

const DynamicTestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection")
);

const DynamicCaseStudiesSection = dynamic(
  () => import("@/components/home/CaseStudiesSection")
);

const DynamicIntelligenceSection = dynamic(
  () => import("@/components/home/IntelligenceSection")
);

const DynamicServicesSection = dynamic(
  () => import("@/components/home/ServicesSection")
);

const DynamicIndustriesSection = dynamic(
  () => import("@/components/home/IndustriesSection")
);

const DynamicMainFooter = dynamic(
  () => import("@/components/main-footer").then((m) => ({ default: m.MainFooter }))
);

const DynamicOrbitAnimation = dynamic(
  () => import("@/components/home/OrbitAnimation"),
  { ssr: false }
);

const aiFacts = [
  { fact: "AI can process documents 100x faster than humans while maintaining 99% accuracy", icon: Zap },
  { fact: "Companies using AI chatbots reduce customer service costs by up to 30%", icon: MessageSquare },
  { fact: "Predictive AI can forecast demand with 95% accuracy, reducing inventory waste", icon: TrendingUp },
  { fact: "Voice AI agents can handle 10,000+ calls simultaneously without fatigue", icon: Users },
  { fact: "AI-powered automation can save businesses 20+ hours per week on repetitive tasks", icon: Clock },
  { fact: "Machine learning models improve by 15-25% every year through continuous learning", icon: Brain },
  { fact: "Computer vision AI can detect manufacturing defects invisible to the human eye", icon: Eye },
  { fact: "RAG systems can search through millions of documents in under 3 seconds", icon: Database },
];

function DidYouKnowSection() {
  const [currentFact, setCurrentFact] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentFact((prev) => (prev + 1) % aiFacts.length);
        setVisible(true);
      }, 350);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = aiFacts[currentFact].icon;

  return (
    <div className={`mt-8 pt-6 border-t border-slate-800/50 ${styles.factReveal}`}>
      <div className="flex items-center gap-3 text-slate-300">
        <div className="flex items-center gap-2 text-primary text-sm font-medium whitespace-nowrap">
          <Lightbulb className="w-4 h-4" />
          <span>Did you know?</span>
        </div>
        <div
          className="flex items-center gap-2 text-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-12px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <CurrentIcon className="w-4 h-4 text-primary/70 flex-shrink-0 hidden sm:block" />
          <span className="text-slate-300">{aiFacts[currentFact].fact}</span>
        </div>
      </div>
    </div>
  );
}

function useScrollBackground() {
  const grad1Ref = useRef<HTMLDivElement>(null);
  const grad2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const offset = Math.min(sy * 0.1, 30);
      const op1 = Math.max(0.15 - sy * 0.0003, 0.05).toFixed(3);
      const op2 = Math.max(0.08 - sy * 0.0002, 0.02).toFixed(3);
      if (grad1Ref.current) {
        grad1Ref.current.style.backgroundImage = `radial-gradient(ellipse 80% 50% at 50% ${(-20 + offset).toFixed(1)}%, rgba(249,115,22,${op1}), transparent)`;
      }
      if (grad2Ref.current) {
        grad2Ref.current.style.backgroundImage = `radial-gradient(ellipse 50% 80% at ${(80 - offset * 0.5).toFixed(1)}% 50%, rgba(249,115,22,${op2}), transparent)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { grad1Ref, grad2Ref };
}

function HeroSection() {
  const { grad1Ref, grad2Ref } = useScrollBackground();

  return (
    <section
      data-home-hero
      className="min-h-[80vh] pt-24 lg:pt-28 flex flex-col justify-center bg-slate-950 relative overflow-hidden"
    >
      <div
        ref={grad1Ref}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249,115,22,0.15), transparent)",
        }}
      />
      <div
        ref={grad2Ref}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(249,115,22,0.08), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="border-primary/30 text-primary mb-4">
                  AI Systems Engineering &amp; Agentic Intelligence Company
                </Badge>
              </div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight"
                data-testid="heading-hero"
              >
                Not Sure Where to Start{" "}
                <span className="text-primary">With AI?</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl">
                You&apos;re not alone. Most businesses know AI matters but struggle with where to
                begin. We help you find the right starting point for your situation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-slate-900 font-semibold shadow-lg shadow-primary/25"
                asChild
                data-testid="button-hero-discover"
              >
                <a href="#discovery">
                  Find Your Starting Point
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                asChild
                data-testid="button-hero-contact"
              >
                <a href="#contact">Talk to Us</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {[
                { value: "100+", label: "Projects" },
                { value: "24/7", label: "Support" },
                { value: "40%", label: "Cost Savings" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50"
                >
                  <span className="text-primary font-bold">{stat.value}</span>
                  <span className="text-slate-300 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />
              <div className="absolute inset-8 rounded-full border border-slate-700/30" />
              <div className="absolute inset-16 rounded-full border border-slate-700/20" />
              <div className="absolute inset-24 rounded-full border border-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <DynamicOrbitAnimation />
              </div>
            </div>
          </div>
        </div>

        <DidYouKnowSection />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main>
        <HeroSection />
        <LazyMount fallbackHeight="700px">
          <DynamicGuidedAssessment />
        </LazyMount>
        <LazyMount fallbackHeight="600px">
          <DynamicIntelligenceSection />
        </LazyMount>
        <LazyMount fallbackHeight="800px">
          <DynamicServicesSection />
        </LazyMount>
        <LazyMount fallbackHeight="600px">
          <DynamicIndustriesSection />
        </LazyMount>
        <LazyMount fallbackHeight="500px">
          <DynamicTestimonialsSection />
        </LazyMount>
        <LazyMount fallbackHeight="800px">
          <DynamicCaseStudiesSection />
        </LazyMount>
        <LazyMount fallbackHeight="600px">
          <DynamicContactSection />
        </LazyMount>
      </main>
      <LazyMount fallbackHeight="400px">
        <DynamicMainFooter />
      </LazyMount>
    </div>
  );
}
