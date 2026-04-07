"use client";

import { useEffect, useRef } from "react";

const NODES = [
  { id: "auto",    label: "Automation",   angle: 0,   r: 130 },
  { id: "voice",   label: "Voice AI",     angle: 60,  r: 130 },
  { id: "chat",    label: "Conversational",angle: 120, r: 130 },
  { id: "agents",  label: "Agents",       angle: 180, r: 130 },
  { id: "rag",     label: "RAG",          angle: 240, r: 130 },
  { id: "vision",  label: "Analytics",    angle: 300, r: 130 },
];

function toXY(angleDeg: number, r: number, cx = 200, cy = 200) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function AgixNetworkAnimation() {
  const svgRef = useRef<SVGSVGElement>(null);

  /* Animate data-flow dots along each connection line */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dots = svg.querySelectorAll<SVGCircleElement>(".flow-dot");
    let frame: number;
    let start: number | null = null;
    const PERIOD = 2200; // ms for one full traversal

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

  const cx = 200;
  const cy = 200;

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Ambient glow behind the whole graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-primary/10 blur-[80px]" />
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full max-w-[440px] h-auto"
        aria-hidden="true"
      >
        <defs>
          {/* Orange gradient for connections */}
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
          {/* Glow filter for center node */}
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Dot glow */}
          <filter id="dotglow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer decorative rings */}
        <circle cx={cx} cy={cy} r="170" fill="none" stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="4 8" className="animate-[spin_60s_linear_infinite]" style={{ transformOrigin: "200px 200px" }} />
        <circle cx={cx} cy={cy} r="145" fill="none" stroke="#f97316" strokeWidth="0.3" strokeOpacity="0.15" />

        {/* Connection paths + flowing dots */}
        {NODES.map((node, i) => {
          const { x, y } = toXY(node.angle, node.r, cx, cy);
          const d = `M ${cx} ${cy} Q ${(cx + x) / 2 + 10} ${(cy + y) / 2 - 10} ${x} ${y}`;
          return (
            <g key={node.id}>
              <path
                id={`path-${i}`}
                d={d}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
              />
              <circle
                className="flow-dot"
                r="3"
                fill="#f97316"
                filter="url(#dotglow)"
                opacity="0.9"
              />
            </g>
          );
        })}

        {/* Satellite nodes */}
        {NODES.map((node, i) => {
          const { x, y } = toXY(node.angle, node.r, cx, cy);
          return (
            <g key={node.id}>
              {/* Pulse ring behind node */}
              <circle
                cx={x} cy={y} r="20"
                fill="none"
                stroke="#f97316"
                strokeWidth="1"
                strokeOpacity="0.2"
                style={{
                  animation: `ping 2.4s cubic-bezier(0,0,0.2,1) ${i * 0.4}s infinite`,
                  transformOrigin: `${x}px ${y}px`,
                }}
              />
              {/* Node circle */}
              <circle
                cx={x} cy={y} r="14"
                fill="#0d1a2e"
                stroke="#f97316"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
              {/* Node label */}
              <text
                x={x}
                y={y + (node.angle > 90 && node.angle < 270 ? 30 : -22)}
                textAnchor="middle"
                fontSize="9"
                fill="#94a3b8"
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
              {/* Node dot center */}
              <circle cx={x} cy={y} r="3" fill="#f97316" opacity="0.8" />
            </g>
          );
        })}

        {/* Center node */}
        <circle cx={cx} cy={cy} r="38" fill="#0b1625" stroke="#f97316" strokeWidth="1.5" filter="url(#glow)" />
        <circle cx={cx} cy={cy} r="38" fill="none" stroke="#f97316" strokeWidth="0.5" strokeOpacity="0.4"
          style={{ animation: "ping 3s cubic-bezier(0,0,0.2,1) infinite", transformOrigin: `${cx}px ${cy}px` }}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#f97316" fontFamily="Inter, sans-serif" letterSpacing="1">AGIX</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="Inter, sans-serif" letterSpacing="0.5">AI ENGINE</text>
      </svg>

      <style>{`
        @keyframes ping {
          0%   { transform: scale(1);   opacity: 0.6; }
          80%  { transform: scale(1.8); opacity: 0;   }
          100% { transform: scale(1.8); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
