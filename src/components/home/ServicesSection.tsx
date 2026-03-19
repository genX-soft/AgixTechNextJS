"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Database,
  Eye,
  LineChart,
  MessageSquare,
  Phone,
  Rocket,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const serviceCategories = [
  { id: "customer", label: "Customer Experience" },
  { id: "operations", label: "Operations" },
  { id: "data", label: "Data & Analytics" },
  { id: "enterprise", label: "Enterprise" },
];

const allServices = [
  {
    icon: Workflow,
    title: "AI Automation Services",
    tagline: "From Manual to Intelligent",
    description: "End-to-end workflow automation that transforms manual processes into intelligent, self-improving systems that scale with your business.",
    link: "/services/ai-automation/",
    heroStat: { value: "80%", label: "Less Manual Work" },
    before: "Staff spending 6+ hours daily on data entry, copy-paste tasks, and spreadsheet updates",
    after: ["Automated end-to-end workflows", "Staff focus on strategic work", "Zero data entry errors"],
    differentiators: ["Process mining discovers hidden inefficiencies", "Self-optimizing workflows improve over time"],
    timeline: "4-8 weeks",
    category: "operations",
  },
  {
    icon: Phone,
    title: "AI Voice Agents",
    tagline: "24/7 Human-Like Conversations",
    description: "Intelligent voice-based interactions that handle customer calls, appointments, and support with natural, human-like understanding.",
    link: "/services/ai-voice-agents/",
    heroStat: { value: "70%", label: "Call Deflection" },
    before: "Long hold times, missed calls after hours, agents overwhelmed by routine inquiries",
    after: ["Instant pickup, zero wait time", "24/7 coverage without overtime", "Agents handle only complex cases"],
    differentiators: ["Natural speech patterns and emotions", "Multi-language support (50+ languages)"],
    timeline: "3-6 weeks",
    category: "customer",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI (Chatbots)",
    tagline: "Instant, Intelligent Support",
    description: "Smart conversational interfaces that engage customers, answer questions, and resolve issues instantly across all your channels.",
    link: "/services/conversational-ai-chatbots/",
    heroStat: { value: "3s", label: "Response Time" },
    before: "Customers waiting hours for email replies, support tickets piling up overnight",
    after: ["Instant answers to 80% of questions", "Consistent experience across channels", "Support team handles escalations only"],
    differentiators: ["Context-aware multi-turn conversations", "Omnichannel deployment (web, mobile, social)"],
    timeline: "2-4 weeks",
    category: "customer",
  },
  {
    icon: Bot,
    title: "Agentic AI Systems",
    tagline: "Autonomous AI That Gets Things Done",
    description: "Self-governing AI solutions that plan, execute, and adapt to complete complex multi-step tasks independently, learning and improving over time.",
    link: "/services/agentic-ai-systems/",
    heroStat: { value: "87%", label: "Hands-Free Tasks" },
    before: "Multi-step processes requiring constant human oversight and manual handoffs between systems",
    after: ["End-to-end autonomous execution", "Self-correcting when issues arise", "Humans only approve final outputs"],
    differentiators: ["Goal-oriented reasoning and planning", "Multi-agent orchestration"],
    timeline: "8-12 weeks",
    category: "enterprise",
  },
  {
    icon: Database,
    title: "RAG & Knowledge AI",
    tagline: "Your Knowledge, Instantly Accessible",
    description: "Retrieval-augmented generation that combines your enterprise knowledge with AI for accurate, contextual responses grounded in your data.",
    link: "/services/rag-knowledge-ai/",
    heroStat: { value: "95%", label: "Answer Accuracy" },
    before: "Employees searching 5+ systems to find answers, tribal knowledge leaving with departing staff",
    after: ["One search finds everything", "Institutional knowledge preserved", "New hires productive in days"],
    differentiators: ["Connects to all your data sources", "Semantic search understands intent"],
    timeline: "4-6 weeks",
    category: "enterprise",
  },
  {
    icon: LineChart,
    title: "Predictive & Analytics AI",
    tagline: "See the Future, Act Today",
    description: "Advanced predictive modeling that forecasts trends, identifies patterns, and drives data-informed decisions before problems happen.",
    link: "/services/ai-predictive-analytics/",
    heroStat: { value: "30%", label: "Better Forecasts" },
    before: "Decisions based on gut feel and outdated reports, surprises hitting after it's too late to act",
    after: ["Predict issues 2-4 weeks ahead", "Clear recommendations with confidence scores", "Real-time anomaly alerts"],
    differentiators: ["Custom models for your industry", "Explainable AI for trust"],
    timeline: "6-10 weeks",
    category: "data",
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    tagline: "AI That Sees and Understands",
    description: "Visual AI and image processing that automates inspection, recognition, and analysis of visual data with superhuman accuracy.",
    link: "/services/ai-computer-vision/",
    heroStat: { value: "99.9%", label: "Detection Accuracy" },
    before: "Manual visual inspections causing fatigue, missed defects, and production delays",
    after: ["Every item inspected in milliseconds", "Defects caught before shipping", "Inspectors focus on edge cases"],
    differentiators: ["Works with existing cameras", "Edge deployment for speed"],
    timeline: "6-8 weeks",
    category: "operations",
  },
  {
    icon: Rocket,
    title: "Custom AI Product Development",
    tagline: "Your Vision, Built Right",
    description: "Build, launch, and scale custom AI products tailored to your unique business requirements and market needs, from idea to production.",
    link: "/services/custom-ai-product-development/",
    heroStat: { value: "MVP", label: "to Production" },
    before: "Great AI idea but no team to build it, failed prototypes from inexperienced vendors",
    after: ["Production-ready AI product", "Full IP ownership from day one", "Technical partner for ongoing evolution"],
    differentiators: ["Full lifecycle from MVP to scale", "Your IP, your product"],
    timeline: "12-24 weeks",
    category: "enterprise",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState(0);
  const service = allServices[activeService];

  const goNext = () => setActiveService((prev) => (prev + 1) % allServices.length);
  const goPrev = () => setActiveService((prev) => (prev - 1 + allServices.length) % allServices.length);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">Our Services</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="heading-services">AI Solutions Built for Results</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Each service is a modular capability within a governed AI system, deployable independently or as part of an enterprise-wide intelligence architecture.</p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">{String(activeService + 1).padStart(2, "0")}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300 font-mono text-sm">{String(allServices.length).padStart(2, "0")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={goPrev} aria-label="Previous service" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" data-testid="button-service-prev">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="icon" variant="outline" onClick={goNext} aria-label="Next service" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" data-testid="button-service-next">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeService} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" aria-hidden="true" />
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                      {serviceCategories.find((c) => c.id === service.category)?.label}
                    </Badge>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-emerald-400 text-base sm:text-lg mb-3 sm:mb-4">{service.tagline}</p>
                  <p className="text-slate-300 text-sm sm:text-base mb-4 sm:mb-6">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {service.differentiators.map((diff) => (
                      <span key={diff} className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-700/50 text-[10px] sm:text-xs text-slate-300 border border-slate-600/30">
                        {diff}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 w-full sm:w-auto" asChild>
                      <Link href={service.link}>
                        Explore Service
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <span className="text-sm text-slate-300 flex items-center justify-center gap-1.5">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {service.timeline}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-slate-700/50 flex flex-col items-center justify-center">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-400 mb-1 sm:mb-2">{service.heroStat.value}</div>
                    <div className="text-slate-300 text-sm sm:text-base">{service.heroStat.label}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <X className="h-3 w-3 text-red-400" aria-hidden="true" />
                        <span className="text-xs font-medium text-red-400">Before</span>
                      </div>
                      <p className="text-xs text-slate-300">{service.before}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                        <span className="text-xs font-medium text-emerald-400">After</span>
                      </div>
                      <div className="space-y-1.5">
                        {service.after.map((item) => (
                          <p key={item} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-800/50 border border-slate-700/50">
              {allServices.map((s, index) => (
                <button key={s.title} type="button" onClick={() => setActiveService(index)} aria-label={`View ${s.title}`} aria-pressed={activeService === index} className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${activeService === index ? "bg-emerald-500/20 text-emerald-400" : "text-slate-300 hover:text-slate-200"}`} data-testid={`service-dot-${index}`}>
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                  <span className={`text-xs font-medium hidden sm:inline ${activeService === index ? "" : "sr-only sm:not-sr-only"}`}>
                    {activeService === index ? s.title.split(" ")[0] : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="mt-16">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-900/20 to-emerald-800/10 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Not sure which service fits?</h3>
              <p className="text-slate-300">Take our quick assessment or talk to an AI expert.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" asChild>
                <a href="#discovery">
                  <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                  Take Assessment
                </a>
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900" asChild>
                <a href="#contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
