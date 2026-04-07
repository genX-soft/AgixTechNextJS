"use client";

import { Badge } from "@/components/ui/badge";
import AgixNetworkAnimation from "./AgixNetworkAnimation";

const metrics = [
  { value: "100+",       label: "AI systems deployed" },
  { value: "24/7",       label: "Autonomous workflows" },
  { value: "Up to 40%", label: "Cost reduction" },
  { value: "8",          label: "Industries served" },
];

export default function ValuePropositionSection() {
  return (
    <section
      aria-label="Value proposition"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1f2e 0%, #1e2435 50%, #1a1f2e 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] flex items-center justify-center order-2 lg:order-1">
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-cyan-500/20 rounded-br-xl pointer-events-none" />
            <AgixNetworkAnimation />
          </div>

          <div className="flex flex-col gap-7 order-1 lg:order-2">

            <div className="flex justify-center lg:justify-start">
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                About AGIX Technologies
              </Badge>
            </div>

            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                We don&apos;t build AI tools.{" "}
                <span className="text-cyan-400">We engineer AI systems.</span>
              </h2>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                AGIX Technologies designs and deploys agentic AI, workflow
                automation, and enterprise intelligence systems that replace
                manual work with scalable, production-ready infrastructure.
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                From AI voice agents to autonomous workflows and decision
                intelligence dashboards — everything integrates with your
                existing CRMs, databases, and internal tools. No
                rip-and-replace. Just AI that works.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-700/50 bg-slate-900/50 px-5 py-5 flex flex-col gap-1 hover:border-cyan-500/30 hover:bg-slate-800/40 transition-colors duration-200"
                >
                  <span className="text-xl sm:text-2xl font-bold text-cyan-400 leading-none tracking-tight">
                    {value}
                  </span>
                  <span className="text-xs text-slate-400 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
