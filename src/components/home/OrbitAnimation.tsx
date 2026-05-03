"use client";

import { motion } from "@/lib/motion";
import { Workflow, Brain, MessageSquare, LineChart, Bot, Sparkles } from "lucide-react";
import styles from "@/app/page.module.css";

const S  = 480;        // strictly square canvas
const CX = S / 2;      // 240
const CY = S / 2;      // 240
const R  = 185;        // orbit radius

// Precompute percentage positions once — safe because container IS square (S×S)
// so pct X and pct Y map identically, guaranteeing a true circle
const floatingCards = [
  { icon: Workflow,      label: "Automation",   pctX: 50 + (R / S) * 100 * Math.cos(-90 * Math.PI / 180), pctY: 50 + (R / S) * 100 * Math.sin(-90 * Math.PI / 180) },
  { icon: Brain,         label: "Intelligence",  pctX: 50 + (R / S) * 100 * Math.cos((-90 + 72) * Math.PI / 180), pctY: 50 + (R / S) * 100 * Math.sin((-90 + 72) * Math.PI / 180) },
  { icon: MessageSquare, label: "Chatbots",      pctX: 50 + (R / S) * 100 * Math.cos((-90 + 144) * Math.PI / 180), pctY: 50 + (R / S) * 100 * Math.sin((-90 + 144) * Math.PI / 180) },
  { icon: LineChart,     label: "Analytics",    pctX: 50 + (R / S) * 100 * Math.cos((-90 + 216) * Math.PI / 180), pctY: 50 + (R / S) * 100 * Math.sin((-90 + 216) * Math.PI / 180) },
  { icon: Bot,           label: "AI Agents",    pctX: 50 + (R / S) * 100 * Math.cos((-90 + 288) * Math.PI / 180), pctY: 50 + (R / S) * 100 * Math.sin((-90 + 288) * Math.PI / 180) },
];

const ORBIT_DURATION = 22; // seconds for one full revolution

export default function OrbitAnimation() {
  return (
    <div style={{ width: S, height: S, position: "relative", flexShrink: 0 }}>

      {/* Static SVG orbit rings — true circles guaranteed */}
      <svg width={S} height={S} className="absolute inset-0 pointer-events-none">
        <circle cx={CX} cy={CY} r={R + 28} stroke="rgba(148,163,184,0.15)" strokeWidth="1" fill="none" />
        <circle cx={CX} cy={CY} r={R}      stroke="rgba(148,163,184,0.12)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
        <circle cx={CX} cy={CY} r={R - 55} stroke="rgba(249,115,22,0.18)"  strokeWidth="1" fill="none" />
      </svg>

      {/* Rotating ring — owns only `rotate` transform, no translate conflict */}
      <motion.div
        style={{ position: "absolute", width: S, height: S, top: 0, left: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
      >
        {floatingCards.map((card) => (
          /* Plain div: handles positioning (framer-motion never touches this) */
          <div
            key={card.label}
            style={{
              position: "absolute",
              left: `${card.pctX}%`,
              top: `${card.pctY}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Inner motion.div: owns only counter-rotate — no translate conflict */}
            <motion.div
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 backdrop-blur-sm shadow-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
            >
              <card.icon className="h-5 w-5 text-primary" />
              <span className="text-xs text-slate-300 whitespace-nowrap">{card.label}</span>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Center hub — outer plain div positions, inner motion.div only scales */}
      <div
        style={{ position: "absolute", left: CX, top: CY, transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl ${styles.logoPulse}`}
        >
          <Sparkles className="h-10 w-10 text-white" />
        </motion.div>
      </div>

    </div>
  );
}
