"use client";

import { motion } from "framer-motion";
import { Workflow, Brain, MessageSquare, LineChart, Bot, Sparkles } from "lucide-react";
import styles from "@/app/page.module.css";

const floatingCards = [
  { icon: Workflow, label: "Automation", delay: 0 },
  { icon: Brain, label: "Intelligence", delay: 0.2 },
  { icon: MessageSquare, label: "Chatbots", delay: 0.4 },
  { icon: LineChart, label: "Analytics", delay: 0.6 },
  { icon: Bot, label: "AI Agents", delay: 0.8 },
];

export default function OrbitAnimation() {
  return (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8"
      >
        {floatingCards.map((card, i) => {
          const angle = (i * 360) / floatingCards.length;
          const radius = 42;
          return (
            <motion.div
              key={card.label}
              className="absolute"
              style={{
                left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
                top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + card.delay }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 backdrop-blur-sm"
              >
                <card.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-slate-300 whitespace-nowrap">{card.label}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <div
        className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl ${styles.logoPulse}`}
      >
        <Sparkles className="h-10 w-10 text-white" />
      </div>
    </>
  );
}
