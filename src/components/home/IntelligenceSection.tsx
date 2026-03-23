"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "@/lib/motion";
import { ArrowRight, Bot, Brain, Database, MessageSquare, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

const intelligenceTypes = [
  {
    icon: Workflow,
    title: "Operational Intelligence",
    description:
      "Streamline operations with AI-driven insights that optimize workflows, reduce bottlenecks, and improve efficiency across your organization.",
    link: "/intelligence/operational-ai/",
    metrics: [
      { value: "72%", label: "Cycle Time Reduction" },
      { value: "98%", label: "SLA Adherence" },
      { value: "$1.4M", label: "Annual Savings" },
    ],
  },
  {
    icon: MessageSquare,
    title: "Conversational Intelligence",
    description:
      "Natural language understanding and processing that powers intelligent chatbots, voice assistants, and customer interactions.",
    link: "/intelligence/conversational-ai/",
    metrics: [
      { value: "63%", label: "First-Contact Resolution" },
      { value: "50+", label: "Languages Supported" },
      { value: "94%", label: "CSAT Score" },
    ],
  },
  {
    icon: Brain,
    title: "Decision Intelligence",
    description:
      "Data-driven decision support systems that analyze complex scenarios and provide actionable recommendations.",
    link: "/intelligence/decision-ai/",
    metrics: [
      { value: "89%", label: "Forecast Accuracy" },
      { value: "6x", label: "Faster Scenario Planning" },
      { value: "3.2x", label: "Decision ROI" },
    ],
  },
  {
    icon: Bot,
    title: "Autonomous Agentic Systems",
    description:
      "Self-learning autonomous AI agents that execute complex tasks, adapt to changing conditions, and operate independently.",
    link: "/intelligence/autonomous-agentic-ai/",
    metrics: [
      { value: "87%", label: "Hands-Free Execution" },
      { value: "35%", label: "Surge Capacity" },
      { value: "12min", label: "Self-Heal Time" },
    ],
  },
  {
    icon: Database,
    title: "Enterprise Knowledge Intelligence",
    description:
      "Unified enterprise knowledge management that captures, organizes, and surfaces institutional knowledge when needed.",
    link: "/intelligence/enterprise-knowledge-ai/",
    metrics: [
      { value: "92%", label: "Retrieval Precision" },
      { value: "68%", label: "Faster Onboarding" },
      { value: "78%", label: "Less Duplicate Docs" },
    ],
  },
];

export default function IntelligenceSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIntel = intelligenceTypes[activeIndex];

  return (
    <section className="py-24 bg-slate-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-6">
            Our Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white" data-testid="heading-intelligence">
            Five Dimensions of AI Intelligence
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            We specialize in five core areas of AI intelligence, each designed to solve specific business challenges and
            drive measurable outcomes.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 space-y-2">
            {intelligenceTypes.map((intel, index) => (
              <motion.button
                key={intel.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-4 group ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30"
                    : "bg-slate-800/40 border border-slate-700/30 hover:bg-slate-800/60 hover:border-slate-600/50"
                }`}
                data-testid={`tab-intelligence-${index}`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeIndex === index ? "bg-amber-500/20" : "bg-slate-700/50 group-hover:bg-slate-700"
                  }`}
                >
                  <intel.icon
                    className={`h-5 w-5 transition-colors ${
                      activeIndex === index ? "text-amber-500" : "text-slate-300 group-hover:text-slate-200"
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={`font-medium transition-colors ${
                    activeIndex === index ? "text-white" : "text-slate-300 group-hover:text-slate-200"
                  }`}
                >
                  {intel.title}
                </span>
                {activeIndex === index ? <ArrowRight className="ml-auto h-4 w-4 text-amber-500" aria-hidden="true" /> : null}
              </motion.button>
            ))}
          </div>

          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div
                  className="h-full p-8 md:p-10 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 relative overflow-hidden"
                  data-testid={`panel-intelligence-${activeIndex}`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <activeIntel.icon className="h-8 w-8 text-amber-500" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeIntel.title}</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">{activeIntel.description}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {activeIntel.metrics.map((metric, idx) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-4 rounded-lg bg-slate-800/50"
                          >
                            <div className="text-2xl font-bold text-amber-500">{metric.value}</div>
                            <div className="text-xs text-slate-300 mt-1">{metric.label}</div>
                          </motion.div>
                        ))}
                      </div>
                      <Link href={activeIntel.link}>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                          Explore {activeIntel.title}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
