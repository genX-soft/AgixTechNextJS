"use client";

import { Badge } from "@/components/ui/badge";
import AgixNetworkAnimation from "./AgixNetworkAnimation";
import { motion } from "framer-motion";

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="relative h-[380px] sm:h-[420px] lg:h-[500px] flex items-center justify-center order-2 lg:order-1">
            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-cyan-500/20 rounded-br-xl pointer-events-none" />
            <AgixNetworkAnimation />
          </div>

          <div className="flex flex-col gap-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/5 px-3 py-1">
                About AGIX Technologies
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center lg:text-left space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.1]">
                We don&apos;t just build AI tools.{" "}
                <span className="block text-cyan-400">We engineer AI systems.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 text-center lg:text-left"
            >
              <p className="text-slate-300 text-lg leading-relaxed">
                AGIX Technologies designs and deploys agentic AI, workflow
                automation, and enterprise intelligence systems that replace
                manual work with scalable, production-ready infrastructure.
              </p>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl">
                From autonomous voice agents to complex decision-intelligence dashboards — our systems integrate seamlessly with your existing tech stack.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="group rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-6 flex flex-col gap-2 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <span className="text-2xl sm:text-3xl font-bold text-cyan-400 leading-none tracking-tight group-hover:scale-105 transition-transform origin-left">
                    {value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
