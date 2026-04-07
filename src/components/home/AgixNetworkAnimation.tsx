"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [
  {
    id: "auto",
    label: "Automation",
    angle: 0,
    r: 140,
    description: "AI-powered workflow automation that eliminates repetitive manual tasks — from data entry and approvals to multi-system orchestration.",
  },
  {
    id: "voice",
    label: "Voice AI",
    angle: 60,
    r: 140,
    description: "Human-like voice agents that handle inbound calls, customer support, and lead qualification 24/7 without human intervention.",
  },
  {
    id: "chat",
    label: "Conversational",
    angle: 120,
    r: 140,
    description: "Intelligent AI chatbots that engage customers across web, mobile, and messaging platforms with context-aware responses.",
  },
  {
    id: "agents",
    label: "Agents",
    angle: 180,
    r: 140,
    description: "Autonomous multi-step AI agents that plan, reason, and execute complex business tasks end-to-end with minimal oversight.",
  },
  {
    id: "rag",
    label: "RAG",
    angle: 240,
    r: 140,
    description: "Retrieval-Augmented Generation that grounds AI responses in your private knowledge base for accurate, up-to-date answers.",
  },
  {
    id: "vision",
    label: "Analytics",
    angle: 300,
    r: 140,
    description: "Predictive AI analytics and decision intelligence dashboards that surface real-time insights from your business data.",
  },
];

type NodeType = typeof NODES[number];

function toXY(angleDeg: number, r: number, cx = 210, cy = 210) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function AgixNetworkAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ node: NodeType; x: number; y: number } | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dots = svg.querySelectorAll<SVGCircleElement>(".flow-dot");
    let frame: number;
    let start: number | null = null;
    const PERIOD = 2200;

    function tick(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;

      dots.forEach((dot, i) => {
        const path = svg!.querySelector<SVGPathElement>(`#path-${i}`);
        if (!path) return;
        const len = path.getTotalLength();
        const offset = ((elapsed + i * (PERIOD / dots.length)) % PERIOD) / PERIOD;
        const pt = path.getPointAtLength(offset * len);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
      });

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleNodeEnter = (node: NodeType, e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ node, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleNodeMove = (node: NodeType, e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ node, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleNodeLeave = () => setTooltip(null);

  const cx = 210;
  const cy = 210;

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-cyan-400/10 blur-[90px]" />
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 420 420"
        className="w-full max-w-[560px] h-auto"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotglow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nodeglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Decorative rings */}
        <circle cx={cx} cy={cy} r="185" fill="none" stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="4 8"
          className="animate-[spin_60s_linear_infinite]" style={{ transformOrigin: `${cx}px ${cy}px` }} />
        <circle cx={cx} cy={cy} r="160" fill="none" stroke="#22d3ee" strokeWidth="0.4" strokeOpacity="0.15" />

        {/* Connection paths + flowing dots */}
        {NODES.map((node, i) => {
          const { x, y } = toXY(node.angle, node.r, cx, cy);
          const d = `M ${cx} ${cy} Q ${(cx + x) / 2 + 10} ${(cy + y) / 2 - 10} ${x} ${y}`;
          return (
            <g key={node.id}>
              <path id={`path-${i}`} d={d} fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              <circle className="flow-dot" r="3.5" fill="#22d3ee" filter="url(#dotglow)" opacity="0.9" />
            </g>
          );
        })}

        {/* Satellite nodes */}
        {NODES.map((node, i) => {
          const { x, y } = toXY(node.angle, node.r, cx, cy);
          return (
            <g
              key={node.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => handleNodeEnter(node, e)}
              onMouseMove={(e) => handleNodeMove(node, e)}
              onMouseLeave={handleNodeLeave}
            >
              {/* Hover hit area */}
              <circle cx={x} cy={y} r="28" fill="transparent" />
              {/* Pulse ring */}
              <circle
                cx={x} cy={y} r="22"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1"
                strokeOpacity="0.2"
                style={{
                  animation: `ping 2.4s cubic-bezier(0,0,0.2,1) ${i * 0.4}s infinite`,
                  transformOrigin: `${x}px ${y}px`,
                }}
              />
              {/* Node circle */}
              <circle
                cx={x} cy={y} r="16"
                fill="#0d1a2e"
                stroke="#22d3ee"
                strokeWidth="1.4"
                strokeOpacity="0.6"
                filter="url(#nodeglow)"
              />
              {/* Label */}
              <text
                x={x}
                y={y + (node.angle > 90 && node.angle < 270 ? 34 : -26)}
                textAnchor="middle"
                fontSize="10.5"
                fill="#cbd5e1"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
              >
                {node.label}
              </text>
              {/* Center dot */}
              <circle cx={x} cy={y} r="4" fill="#22d3ee" opacity="0.9" />
            </g>
          );
        })}

        {/* Center node */}
        <circle cx={cx} cy={cy} r="44" fill="#0b1625" stroke="#22d3ee" strokeWidth="1.8" filter="url(#glow)" />
        <circle cx={cx} cy={cy} r="44" fill="none" stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.4"
          style={{ animation: "ping 3s cubic-bezier(0,0,0.2,1) infinite", transformOrigin: `${cx}px ${cy}px` }}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#22d3ee" fontFamily="Inter, sans-serif" letterSpacing="1">AGIX</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8.5" fill="#64748b" fontFamily="Inter, sans-serif" letterSpacing="0.8">AI ENGINE</text>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-50 w-56 rounded-xl border border-cyan-400/25 bg-slate-900/95 backdrop-blur-sm px-4 py-3 shadow-xl shadow-cyan-400/10"
          style={{
            left: tooltip.x + 16,
            top: tooltip.y - 20,
            transform: tooltip.x > (containerRef.current?.offsetWidth ?? 400) / 2
              ? "translateX(-110%)"
              : "translateX(0)",
          }}
        >
          <p className="text-xs font-semibold text-cyan-400 mb-1">{tooltip.node.label}</p>
          <p className="text-xs text-slate-300 leading-relaxed">{tooltip.node.description}</p>
        </div>
      )}

      <style>{`
        @keyframes ping {
          0%   { transform: scale(1);   opacity: 0.6; }
          80%  { transform: scale(1.9); opacity: 0;   }
          100% { transform: scale(1.9); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
