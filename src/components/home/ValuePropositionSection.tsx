import { Badge } from "@/components/ui/badge";

const metrics = [
  { value: "100+", label: "AI systems deployed" },
  { value: "24/7", label: "Autonomous workflows" },
  { value: "40%", label: "Cost reduction" },
  { value: "8", label: "Industries served" },
  { value: "3 Continents", label: "1 engineering standard" },
];

export default function ValuePropositionSection() {
  return (
    <section
      aria-label="Value proposition"
      className="relative border-t border-slate-800"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge variant="outline" className="border-primary/30 text-primary">
            About AGIX Technologies
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            We don&apos;t build AI tools.{" "}
            <span className="text-primary">We engineer AI systems.</span>
          </h2>

          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              AGIX Technologies designs and deploys agentic AI, workflow
              automation, and enterprise intelligence systems that replace manual
              work with scalable, production-ready infrastructure.
            </p>
            <p className="text-slate-400">
              From AI voice agents to autonomous workflows and decision
              intelligence dashboards — everything integrates with your existing
              CRMs, databases, and internal tools. No rip-and-replace. Just AI
              that works.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/40">
          {metrics.map(({ value, label }) => (
            <div
              key={label}
              className="bg-slate-900/80 px-6 py-8 flex flex-col items-center text-center gap-2 hover:bg-slate-800/60 transition-colors duration-200"
            >
              <span className="text-2xl sm:text-3xl font-bold text-primary leading-none tracking-tight">
                {value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 leading-snug max-w-[120px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
