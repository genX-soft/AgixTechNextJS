import Link from "next/link";
import {
  Workflow,
  Phone,
  MessageSquare,
  Bot,
  Database,
  TrendingUp,
  Eye,
  Code2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Service = {
  icon: React.ElementType;
  title: string;
  href: string;
  description: string;
  includes: [string, string];
  featured?: boolean;
};

const services: Service[] = [
  {
    icon: Workflow,
    title: "AI Automation",
    href: "/services/ai-automation/",
    description:
      "Automate manual workflows end-to-end — from data entry to approvals and reporting.",
    includes: ["End-to-end process automation", "ERP, CRM & tool integration"],
  },
  {
    icon: Phone,
    title: "AI Voice Agents",
    href: "/services/ai-voice-agents/",
    description:
      "24/7 voice systems that answer, qualify, route, and follow up on calls.",
    includes: ["Inbound & outbound call handling", "Lead qualification & routing"],
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    href: "/services/conversational-ai-chatbots/",
    description:
      "Context-aware chatbots across web, WhatsApp, and Slack with CRM integration.",
    includes: ["Web, WhatsApp & Slack bots", "Live CRM sync"],
  },
  {
    icon: Bot,
    title: "Agentic AI Systems",
    href: "/services/agentic-ai-systems/",
    description:
      "Autonomous agents that plan, execute, and handle complex multi-step workflows without human hand-holding.",
    includes: ["Multi-agent orchestration", "Complex task planning & execution"],
    featured: true,
  },
  {
    icon: Database,
    title: "RAG & Knowledge AI",
    href: "/services/rag-knowledge-ai/",
    description:
      "AI trained on your data for accurate, context-aware answers at scale.",
    includes: ["Private data indexing", "Context-aware retrieval"],
  },
  {
    icon: TrendingUp,
    title: "Predictive & Analytics AI",
    href: "/services/ai-predictive-analytics/",
    description:
      "Turn historical data into forecasts, insights, and actionable decisions.",
    includes: ["Demand & revenue forecasting", "Real-time dashboards"],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    href: "/services/ai-computer-vision/",
    description:
      "Real-time image and video AI for detection, scanning, and automation.",
    includes: ["Object detection & classification", "Automated quality inspection"],
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    href: "/services/custom-ai-product-development/",
    description:
      "Custom AI tools, platforms, or SaaS products built around your business.",
    includes: ["Full-stack AI product build", "API-first architecture"],
  },
];

export default function OurServicesSection() {
  return (
    <section aria-label="Our services" className="relative border-t border-slate-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Our Services
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            What We Build For You
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Every service is a production-ready AI system — built to integrate
            with your existing stack and deliver results from week one.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, href, description, includes, featured }) => (
            <Link
              key={title}
              href={href}
              className={`group relative block${featured ? " sm:col-span-2 lg:col-span-2" : ""}`}
            >
              {/* Card */}
              <div
                className={`relative h-full overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300
                  hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]
                  ${featured
                    ? "border-primary/30 bg-white/[0.035] hover:border-primary/50"
                    : "border-white/10 bg-white/[0.02] hover:border-primary/40"
                  }`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

                {/* Icon glow */}
                <div className="absolute top-5 right-5 w-20 h-20 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

                <div className={`relative p-6 flex flex-col gap-5 h-full${featured ? " lg:flex-row lg:gap-8 lg:items-start" : ""}`}>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/35 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors duration-200 leading-snug">
                        {title}
                      </h3>
                      {featured && (
                        <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider text-primary border border-primary/30 bg-primary/10 rounded-full px-2.5 py-0.5">
                          Most Impactful
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {description}
                    </p>

                    {/* Includes list */}
                    <ul className="mt-1 space-y-1.5">
                      {includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-200">
                          <ArrowRight className="w-3 h-3 text-primary/60 flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="text-slate-300 text-base sm:text-lg font-medium">
            Not sure where to start?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-primary hover:bg-primary/90 text-slate-900 font-semibold shadow-lg shadow-primary/25"
              asChild
              data-testid="button-services-assessment"
            >
              <a href="#discovery">Take 2-min AI Assessment</a>
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              asChild
              data-testid="button-services-consultation"
            >
              <a href="#contact">Schedule Free Consultation</a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
