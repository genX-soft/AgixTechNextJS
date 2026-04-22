"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const DynamicOrbitAnimation = dynamic(
  () => import("@/components/home/OrbitAnimation"),
  { ssr: false, loading: () => null }
);

function useScrollBackground() {
  const grad1Ref = useRef<HTMLDivElement>(null);
  const grad2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { grad1Ref, grad2Ref };
}

export function HeroSection() {
  const { grad1Ref, grad2Ref } = useScrollBackground();
  const [orbitMounted, setOrbitMounted] = useState(false);
  useEffect(() => { setOrbitMounted(true); }, []);

  return (
    <section
      data-home-hero
      className="bg-slate-950 relative pt-20 lg:pt-20"
    >
      {/* Inner wrapper: overflow-hidden clips the gradient blobs only */}
      <div className="relative overflow-hidden">
        <div
          ref={grad1Ref}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249,115,22,0.15), transparent)",
          }}
        />
        <div
          ref={grad2Ref}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(249,115,22,0.08), transparent)",
          }}
        />

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-20 lg:pb-28 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

            {/* Left: text content */}
            <div className="flex flex-col justify-between h-full py-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-3 py-1 mb-6">
                  AI Systems Engineering &amp; Agentic Intelligence Company
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <h1
                  className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.1]"
                  data-testid="heading-hero"
                >
                  <span className="block mb-2">Enterprise AI Systems</span>
                  <span className="text-primary lg:whitespace-nowrap">Engineering &amp; Automation</span>
                </h1>

                <h2 className="text-lg sm:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed">
                  We design, build, and deploy production-grade AI systems that automate operations and scale business workflows.
                </h2>

                <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
                  From intelligent agents to deep enterprise knowledge systems — we help businesses move from experimentation to real, measurable outcomes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-primary hover:bg-primary/90 text-slate-900 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105"
                    asChild
                    data-testid="button-hero-discover"
                  >
                    <a href="#discovery">
                      Find Your Starting Point
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                    asChild
                    data-testid="button-hero-contact"
                  >
                    <a href="#contact">Talk to Us</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                {[
                  { value: "100+", label: "Success Projects" },
                  { value: "24/7", label: "Autonomous Support" },
                  { value: "40%", label: "Avg. Cost Savings" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1 px-5 py-3 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
                  >
                    <span className="text-xl font-bold text-primary">{stat.value}</span>
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: orbit animation */}
            <div className="relative hidden lg:flex items-center justify-center h-[380px] sm:h-[420px] lg:h-[500px]">
              <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />
                <div className="absolute inset-8 rounded-full border border-slate-700/30" />
                <div className="absolute inset-16 rounded-full border border-slate-700/20" />
                <div className="absolute inset-24 rounded-full border border-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {orbitMounted && <DynamicOrbitAnimation />}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
