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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Workflow,
    title: "AI Automation",
    href: "/services/ai-automation/",
    description:
      "Automate manual workflows end-to-end — from data entry to approvals and reporting.",
  },
  {
    icon: Phone,
    title: "AI Voice Agents",
    href: "/services/ai-voice-agents/",
    description:
      "24/7 voice systems that answer, qualify, route, and follow up on calls.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    href: "/services/conversational-ai-chatbots/",
    description:
      "Context-aware chatbots across web, WhatsApp, and Slack with CRM integration.",
  },
  {
    icon: Bot,
    title: "Agentic AI Systems",
    href: "/services/agentic-ai-systems/",
    description:
      "Autonomous agents that plan, execute, and handle complex multi-step workflows.",
  },
  {
    icon: Database,
    title: "RAG & Knowledge AI",
    href: "/services/rag-knowledge-ai/",
    description:
      "AI trained on your data for accurate, context-aware answers at scale.",
  },
  {
    icon: TrendingUp,
    title: "Predictive & Analytics AI",
    href: "/services/ai-predictive-analytics/",
    description:
      "Turn historical data into forecasts, insights, and actionable decisions.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    href: "/services/ai-computer-vision/",
    description:
      "Real-time image and video AI for detection, scanning, and automation.",
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    href: "/services/custom-ai-product-development/",
    description:
      "Custom AI tools, platforms, or SaaS products built around your business.",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, href, description }) => (
            <Link key={title} href={href} className="group block h-full">
              <Card className="hover-elevate border-border/50 h-full bg-slate-900/60">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors duration-200">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-5 text-center">
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
