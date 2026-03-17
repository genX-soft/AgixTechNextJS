"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MainHeader } from "@/components/main-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCelebration } from "@/components/success-celebration";
import { LazyMount } from "@/components/lazy-mount";
import { 
  Sparkles, 
  Rocket, 
  Building2, 
  Building,
  ArrowRight,
  ArrowLeft,
  X,
  Workflow,
  CheckCircle2,
  Brain,
  Bot,
  MessageSquare,
  Database,
  LineChart,
  Eye,
  Lightbulb,
  Zap,
  TrendingUp,
  Clock,
  PartyPopper,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

const DynamicContactSection = dynamic(
  () => import("@/components/home/contact-section").then((m) => ({ default: m.ContactSection })),
  { ssr: false }
);

const DynamicTestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), {
  ssr: false,
});

const DynamicCaseStudiesSection = dynamic(() => import("@/components/home/CaseStudiesSection"), {
  ssr: false,
});

const DynamicIntelligenceSection = dynamic(() => import("@/components/home/IntelligenceSection"), {
  ssr: false,
});

const DynamicServicesSection = dynamic(() => import("@/components/home/ServicesSection"), {
  ssr: false,
});

const DynamicIndustriesSection = dynamic(() => import("@/components/home/IndustriesSection"), {
  ssr: false,
});

const DynamicMainFooter = dynamic(() => import("@/components/main-footer").then((m) => ({ default: m.MainFooter })));

function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
}

// ============================================
// AI FACTS FOR "DID YOU KNOW?" SECTION
// ============================================
const aiFacts = [
  { fact: "AI can process documents 100x faster than humans while maintaining 99% accuracy", icon: Zap },
  { fact: "Companies using AI chatbots reduce customer service costs by up to 30%", icon: MessageSquare },
  { fact: "Predictive AI can forecast demand with 95% accuracy, reducing inventory waste", icon: TrendingUp },
  { fact: "Voice AI agents can handle 10,000+ calls simultaneously without fatigue", icon: Users },
  { fact: "AI-powered automation can save businesses 20+ hours per week on repetitive tasks", icon: Clock },
  { fact: "Machine learning models improve by 15-25% every year through continuous learning", icon: Brain },
  { fact: "Computer vision AI can detect manufacturing defects invisible to the human eye", icon: Eye },
  { fact: "RAG systems can search through millions of documents in under 3 seconds", icon: Database },
];

function DidYouKnowSection() {
  const [currentFact, setCurrentFact] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentFact((prev) => (prev + 1) % aiFacts.length);
        setVisible(true);
      }, 350);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = aiFacts[currentFact].icon;

  return (
    <div className={`mt-8 pt-6 border-t border-slate-800/50 ${styles.factReveal}`}>
      <div className="flex items-center gap-3 text-slate-300">
        <div className="flex items-center gap-2 text-primary text-sm font-medium whitespace-nowrap">
          <Lightbulb className="w-4 h-4" />
          <span>Did you know?</span>
        </div>
        <div
          className="flex items-center gap-2 text-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-12px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          <CurrentIcon className="w-4 h-4 text-primary/70 flex-shrink-0 hidden sm:block" />
          <span className="text-slate-300">{aiFacts[currentFact].fact}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DYNAMIC SCROLL BACKGROUND HOOK
// Uses refs + direct DOM mutations to avoid React re-renders on every scroll tick
// ============================================
function useScrollBackground() {
  const grad1Ref = useRef<HTMLDivElement>(null);
  const grad2Ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    const handleScroll = () => {
      const sy = window.scrollY;
      const offset = Math.min(sy * 0.1, 30);
      const op1 = Math.max(0.15 - sy * 0.0003, 0.05).toFixed(3);
      const op2 = Math.max(0.08 - sy * 0.0002, 0.02).toFixed(3);
      if (grad1Ref.current) {
        grad1Ref.current.style.backgroundImage = `radial-gradient(ellipse 80% 50% at 50% ${(-20 + offset).toFixed(1)}%, rgba(249,115,22,${op1}), transparent)`;
      }
      if (grad2Ref.current) {
        grad2Ref.current.style.backgroundImage = `radial-gradient(ellipse 50% 80% at ${(80 - offset * 0.5).toFixed(1)}% 50%, rgba(249,115,22,${op2}), transparent)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { grad1Ref, grad2Ref, isMounted, isDesktop };
}

// ============================================
// HERO SECTION
// ============================================
const floatingCards = [
  { icon: Workflow, label: "Automation", delay: 0 },
  { icon: Brain, label: "Intelligence", delay: 0.2 },
  { icon: MessageSquare, label: "Chatbots", delay: 0.4 },
  { icon: LineChart, label: "Analytics", delay: 0.6 },
  { icon: Bot, label: "AI Agents", delay: 0.8 },
];

function HeroSection() {
  const { grad1Ref, grad2Ref, isMounted, isDesktop } = useScrollBackground();

  return (
    <section data-home-hero className="min-h-[80vh] pt-24 lg:pt-28 flex flex-col justify-center bg-slate-950 relative overflow-hidden">
      {/* Gradient backgrounds updated directly via refs to avoid scroll-triggered React re-renders */}
      <div
        ref={grad1Ref}
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249,115,22,0.15), transparent)' }}
      />
      <div
        ref={grad2Ref}
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(ellipse 50% 80% at 80% 50%, rgba(249,115,22,0.08), transparent)' }}
      />
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero text — rendered immediately for fast LCP; no opacity:0 on critical content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="border-primary/30 text-primary mb-4">
                  AI Systems Engineering &amp; Agentic Intelligence Company
                </Badge>
              </div>
              
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight"
                data-testid="heading-hero"
              >
                Not Sure Where to Start{" "}
                <span className="text-primary">With AI?</span>
              </h1>
              
              <p className="text-lg text-slate-300 max-w-xl">
                You&apos;re not alone. Most businesses know AI matters but struggle with where to begin.
                We help you find the right starting point for your situation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25" asChild data-testid="button-hero-discover">
                <a href="#discovery">
                  Find Your Starting Point
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" asChild data-testid="button-hero-contact">
                <a href="#contact">
                  Talk to Us
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {[
                { value: "100+", label: "Projects" },
                { value: "24/7", label: "Support" },
                { value: "40%", label: "Cost Savings" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50"
                >
                  <span className="text-primary font-bold">{stat.value}</span>
                  <span className="text-slate-300 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block" suppressHydrationWarning>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />
              
              <div className="absolute inset-8 rounded-full border border-slate-700/30" />
              <div className="absolute inset-16 rounded-full border border-slate-700/20" />
              <div className="absolute inset-24 rounded-full border border-primary/20" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                {isDesktop && isMounted && (
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
                )}
                
                <motion.div 
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl shadow-primary/30"
                  animate={{ 
                    boxShadow: ["0 0 30px rgba(249,115,22,0.3)", "0 0 50px rgba(249,115,22,0.5)", "0 0 30px rgba(249,115,22,0.3)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-10 w-10 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <DidYouKnowSection />
      </div>
    </section>
  );
}

// ============================================
// GUIDED ASSESSMENT TOOLS SECTION
// ============================================
import { Progress } from "@/components/ui/progress";

interface QuestionOption {
  value: string;
  label: string;
  score: number;
}

interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

interface ResultLevel {
  minScore: number;
  maxScore: number;
  level: string;
  color: string;
  description: string;
  whatAiCanDo: string[];
  recommendedPath: {
    title: string;
    link: string;
  };
  journey: {
    now: string;
    next: string;
    later: string;
  };
  nextActions: {
    label: string;
    link: string;
  }[];
}

interface AssessmentConfig {
  title: string;
  subtitle: string;
  intro: string;
  questions: Question[];
  resultLevels: ResultLevel[];
}

const assessmentConfigs: Record<string, AssessmentConfig> = {
  "ai-starting-point": {
    title: "AI Starting Point Finder",
    subtitle: "Not sure where to begin with AI? Let us help you find the right starting point for your situation.",
    intro: "This quick assessment will help you understand if AI can help your business and where to begin. No technical knowledge required - just answer honestly about your current situation.",
    questions: [
      {
        id: "business-type",
        question: "What best describes you?",
        options: [
          { value: "solo", label: "Solo founder / Small business owner", score: 1 },
          { value: "non-tech", label: "Non-technical team", score: 2 },
          { value: "professional", label: "Professional / Consultant", score: 2 },
          { value: "other", label: "Other", score: 1 },
        ],
      },
      {
        id: "challenge",
        question: "What's your biggest daily challenge?",
        options: [
          { value: "manual", label: "Too much manual work", score: 2 },
          { value: "visibility", label: "Lack of visibility / insights", score: 3 },
          { value: "support", label: "Customer support overload", score: 3 },
          { value: "scattered", label: "Data scattered everywhere", score: 2 },
          { value: "unsure", label: "Not sure yet", score: 1 },
        ],
      },
      {
        id: "tools",
        question: "Do you currently use digital tools?",
        options: [
          { value: "spreadsheets", label: "Mostly spreadsheets", score: 1 },
          { value: "crm", label: "CRM / ERP / SaaS tools", score: 3 },
          { value: "mix", label: "A mix of tools", score: 2 },
          { value: "minimal", label: "Very minimal", score: 1 },
        ],
      },
      {
        id: "comfort",
        question: "How comfortable are you with technology?",
        options: [
          { value: "basic", label: "Very basic", score: 1 },
          { value: "somewhat", label: "Somewhat comfortable", score: 2 },
          { value: "comfortable", label: "Very comfortable", score: 3 },
        ],
      },
      {
        id: "goals",
        question: "What would success look like?",
        options: [
          { value: "time", label: "Save time", score: 2 },
          { value: "cost", label: "Reduce cost", score: 2 },
          { value: "decisions", label: "Improve decision-making", score: 3 },
          { value: "experience", label: "Improve customer experience", score: 3 },
        ],
      },
    ],
    resultLevels: [
      {
        minScore: 0,
        maxScore: 8,
        level: "Foundational Stage",
        color: "bg-blue-500/20",
        description: "You're at the beginning of your AI journey. This is a great place to start - we'll help you build a strong foundation without overwhelming complexity.",
        whatAiCanDo: [
          "Automate repetitive tasks like data entry and scheduling",
          "Organize information across your tools",
          "Assist with customer queries via simple chatbots",
          "Reduce manual effort without adding complexity",
        ],
        recommendedPath: {
          title: "Start with Operational Intelligence",
          link: "/intelligence/operational-ai/",
        },
        journey: {
          now: "Simple AI-powered automation",
          next: "Conversational AI (chat/voice)",
          later: "Decision & analytics systems",
        },
        nextActions: [
          { label: "Explore Simple Automation", link: "/intelligence/operational-ai/" },
          { label: "Talk to an Expert", link: "/corporate/contact/" },
        ],
      },
      {
        minScore: 9,
        maxScore: 12,
        level: "Early Adoption Stage",
        color: "bg-green-500/20",
        description: "You have some digital foundations in place. You're ready to implement focused AI solutions that can deliver quick wins.",
        whatAiCanDo: [
          "Intelligent workflow automation across tools",
          "Customer-facing chatbots and assistants",
          "Basic data insights and reporting",
          "Process optimization recommendations",
        ],
        recommendedPath: {
          title: "Conversational Intelligence",
          link: "/intelligence/conversational-ai/",
        },
        journey: {
          now: "Chatbots and workflow automation",
          next: "Predictive analytics",
          later: "Advanced decision systems",
        },
        nextActions: [
          { label: "Explore Conversational AI", link: "/intelligence/conversational-ai/" },
          { label: "View Case Studies", link: "/case-studies/" },
        ],
      },
      {
        minScore: 13,
        maxScore: 16,
        level: "Ready for Growth",
        color: "bg-primary/20",
        description: "You're well-positioned to leverage AI for significant business impact. Let's explore advanced solutions tailored to your needs.",
        whatAiCanDo: [
          "Advanced decision support systems",
          "Predictive analytics and forecasting",
          "Multi-channel AI assistants",
          "Custom AI solutions for your workflows",
        ],
        recommendedPath: {
          title: "Decision Intelligence",
          link: "/intelligence/decision-ai/",
        },
        journey: {
          now: "Decision support and analytics",
          next: "Autonomous AI agents",
          later: "Enterprise-wide AI transformation",
        },
        nextActions: [
          { label: "Explore Decision Intelligence", link: "/intelligence/decision-ai/" },
          { label: "Schedule Consultation", link: "/corporate/contact/" },
        ],
      },
    ],
  },
  "startup-accelerator": {
    title: "Startup AI Accelerator",
    subtitle: "Moving fast but need AI? Let's find the right approach for your stage and resources.",
    intro: "This assessment helps startups decide what to build vs automate, and how to move fast without overengineering. We'll match AI solutions to your stage and constraints.",
    questions: [
      {
        id: "stage",
        question: "What's your startup stage?",
        options: [
          { value: "idea", label: "Idea / MVP", score: 1 },
          { value: "traction", label: "Early traction", score: 2 },
          { value: "scaling", label: "Scaling product", score: 3 },
          { value: "funded", label: "Post-funding", score: 4 },
        ],
      },
      {
        id: "focus",
        question: "What's your core focus right now?",
        options: [
          { value: "product", label: "Product development", score: 2 },
          { value: "sales", label: "Sales & lead generation", score: 3 },
          { value: "support", label: "Customer support", score: 3 },
          { value: "operations", label: "Operations", score: 2 },
        ],
      },
      {
        id: "team-size",
        question: "What's your team size?",
        options: [
          { value: "tiny", label: "1-5 people", score: 1 },
          { value: "small", label: "6-20 people", score: 2 },
          { value: "medium", label: "20+ people", score: 3 },
        ],
      },
      {
        id: "tech-capability",
        question: "What's your team's technical capability?",
        options: [
          { value: "non-tech", label: "Non-technical", score: 1 },
          { value: "mixed", label: "Mixed", score: 2 },
          { value: "strong", label: "Strong engineering", score: 3 },
        ],
      },
      {
        id: "bottleneck",
        question: "What's slowing you down most?",
        options: [
          { value: "speed", label: "Speed to market", score: 2 },
          { value: "manual", label: "Manual workflows", score: 3 },
          { value: "customers", label: "Customer handling", score: 3 },
          { value: "insights", label: "Data insights", score: 2 },
        ],
      },
      {
        id: "preference",
        question: "Build vs buy preference?",
        options: [
          { value: "ready-made", label: "Prefer ready-made tools", score: 1 },
          { value: "custom", label: "Prefer custom solutions", score: 3 },
          { value: "unsure", label: "Not sure", score: 2 },
        ],
      },
    ],
    resultLevels: [
      {
        minScore: 0,
        maxScore: 10,
        level: "Speed-Focused, Resource-Constrained",
        color: "bg-amber-500/20",
        description: "You need quick wins with minimal overhead. Focus on ready-made AI tools and simple automations that don't require engineering resources.",
        whatAiCanDo: [
          "AI-powered workflow automation (no-code)",
          "Off-the-shelf chatbots for customer support",
          "Internal productivity tools and copilots",
          "Quick integrations with existing stack",
        ],
        recommendedPath: {
          title: "AI Automation + Lightweight Conversational AI",
          link: "/services/conversational-ai-chatbots/",
        },
        journey: {
          now: "Automation + AI copilots",
          next: "Custom AI features",
          later: "Agentic workflows",
        },
        nextActions: [
          { label: "Explore AI Workflows", link: "/intelligence/operational-ai/" },
          { label: "View Startup Cases", link: "/case-studies/" },
        ],
      },
      {
        minScore: 11,
        maxScore: 15,
        level: "Growth-Ready, Building Momentum",
        color: "bg-green-500/20",
        description: "You have resources to invest in custom solutions. Focus on AI that differentiates your product and scales with growth.",
        whatAiCanDo: [
          "Custom AI features for your product",
          "Intelligent customer interaction systems",
          "Automated sales and support workflows",
          "Data-driven decision making",
        ],
        recommendedPath: {
          title: "Custom AI Product Development",
          link: "/services/custom-ai-product-development/",
        },
        journey: {
          now: "Custom AI features",
          next: "Advanced automation",
          later: "AI-first product strategy",
        },
        nextActions: [
          { label: "Custom AI Solutions", link: "/services/custom-ai-product-development/" },
          { label: "Talk to Us", link: "/corporate/contact/" },
        ],
      },
      {
        minScore: 16,
        maxScore: 22,
        level: "Scale-Ready, AI-First Potential",
        color: "bg-primary/20",
        description: "You're positioned to build AI into your core product. Consider advanced solutions that create lasting competitive advantages.",
        whatAiCanDo: [
          "Agentic AI systems for complex workflows",
          "AI-powered product differentiation",
          "Enterprise-grade automation",
          "Predictive analytics and intelligence",
        ],
        recommendedPath: {
          title: "Agentic AI Systems",
          link: "/services/agentic-ai-systems/",
        },
        journey: {
          now: "Agentic workflows",
          next: "AI platform capabilities",
          later: "AI-native architecture",
        },
        nextActions: [
          { label: "Explore Agentic AI", link: "/services/agentic-ai-systems/" },
          { label: "Schedule Strategy Call", link: "/corporate/contact/" },
        ],
      },
    ],
  },
  "operational-efficiency": {
    title: "Operational Efficiency Analyzer",
    subtitle: "Identify where AI can reduce costs and improve margins in your growing business.",
    intro: "This assessment helps SMBs identify cost and time leakage in operations, and shows exactly where AI delivers the highest ROI. Answer based on your current operations.",
    questions: [
      {
        id: "size",
        question: "What's your business size?",
        options: [
          { value: "small", label: "10-25 employees", score: 1 },
          { value: "medium", label: "25-100 employees", score: 2 },
          { value: "large", label: "100-300 employees", score: 3 },
        ],
      },
      {
        id: "operations",
        question: "How are tasks handled today?",
        options: [
          { value: "manual", label: "Mostly manual", score: 1 },
          { value: "partial", label: "Partially automated", score: 2 },
          { value: "tool-heavy", label: "Tool-heavy but disconnected", score: 2 },
        ],
      },
      {
        id: "pain-areas",
        question: "Where do you feel the most pain?",
        options: [
          { value: "support", label: "Customer support", score: 3 },
          { value: "reporting", label: "Reporting & analytics", score: 2 },
          { value: "sales", label: "Sales operations", score: 3 },
          { value: "hr", label: "HR / internal ops", score: 2 },
          { value: "finance", label: "Finance / compliance", score: 2 },
        ],
      },
      {
        id: "volume",
        question: "Daily transactions / requests volume?",
        options: [
          { value: "low", label: "Low (under 100)", score: 1 },
          { value: "medium", label: "Medium (100-500)", score: 2 },
          { value: "high", label: "High (500+)", score: 3 },
        ],
      },
      {
        id: "goal",
        question: "What's your primary growth goal?",
        options: [
          { value: "scale", label: "Scale without hiring", score: 3 },
          { value: "margins", label: "Improve margins", score: 2 },
          { value: "quality", label: "Improve service quality", score: 2 },
        ],
      },
    ],
    resultLevels: [
      {
        minScore: 0,
        maxScore: 7,
        level: "Low to Moderate Leakage",
        color: "bg-green-500/20",
        description: "Your operations are relatively efficient. Focus on targeted automation in specific pain points rather than broad transformation.",
        whatAiCanDo: [
          "Automate specific repetitive workflows",
          "Basic reporting automation",
          "Simple customer query handling",
          "Document processing for key areas",
        ],
        recommendedPath: {
          title: "Operational Intelligence",
          link: "/intelligence/operational-ai/",
        },
        journey: {
          now: "Targeted workflow automation",
          next: "Process optimization",
          later: "Predictive operations",
        },
        nextActions: [
          { label: "Operational Intelligence", link: "/intelligence/operational-ai/" },
          { label: "View SMB Cases", link: "/case-studies/" },
        ],
      },
      {
        minScore: 8,
        maxScore: 11,
        level: "Moderate to High Leakage",
        color: "bg-amber-500/20",
        description: "Significant efficiency gains are possible. AI can address multiple pain points and create compound improvements across your operations.",
        whatAiCanDo: [
          "End-to-end workflow automation",
          "Intelligent customer support systems",
          "Predictive insights and reporting",
          "Cross-departmental process optimization",
        ],
        recommendedPath: {
          title: "Operational + Decision Intelligence",
          link: "/intelligence/decision-ai/",
        },
        journey: {
          now: "Workflow automation",
          next: "Predictive insights",
          later: "Agent-assisted operations",
        },
        nextActions: [
          { label: "Decision Intelligence", link: "/intelligence/decision-ai/" },
          { label: "Calculate Savings", link: "/corporate/contact/" },
        ],
      },
      {
        minScore: 12,
        maxScore: 16,
        level: "High Operational Leakage",
        color: "bg-red-500/20",
        description: "There's substantial opportunity to reduce costs and improve efficiency. A comprehensive AI strategy can transform your operations.",
        whatAiCanDo: [
          "Comprehensive automation across operations",
          "AI-powered decision support systems",
          "Autonomous workflow management",
          "Real-time operational intelligence",
        ],
        recommendedPath: {
          title: "Enterprise-Grade AI Transformation",
          link: "/intelligence/enterprise-knowledge-ai/",
        },
        journey: {
          now: "Immediate automation wins",
          next: "Decision intelligence systems",
          later: "Autonomous operations",
        },
        nextActions: [
          { label: "Enterprise Solutions", link: "/intelligence/enterprise-knowledge-ai/" },
          { label: "Request Assessment", link: "/corporate/contact/" },
        ],
      },
    ],
  },
  "enterprise-strategy": {
    title: "Enterprise AI Strategy Navigator",
    subtitle: "Assess readiness, identify risks, and plan your enterprise AI journey strategically.",
    intro: "This assessment helps enterprise teams evaluate AI readiness, identify governance gaps, and sequence adoption to avoid fragmented implementation. Answer based on your organization's current state.",
    questions: [
      {
        id: "org-type",
        question: "What type of organization are you?",
        options: [
          { value: "enterprise", label: "Enterprise", score: 2 },
          { value: "regulated", label: "Regulated industry", score: 3 },
          { value: "multi-region", label: "Multi-region operations", score: 3 },
        ],
      },
      {
        id: "ai-status",
        question: "What's your current AI status?",
        options: [
          { value: "none", label: "No AI yet", score: 1 },
          { value: "pilot", label: "Pilot projects", score: 2 },
          { value: "disconnected", label: "Disconnected AI tools", score: 2 },
          { value: "scaling", label: "Scaling AI", score: 3 },
        ],
      },
      {
        id: "concerns",
        question: "What's your primary concern with AI adoption?",
        options: [
          { value: "security", label: "Data security", score: 3 },
          { value: "compliance", label: "Compliance", score: 3 },
          { value: "integration", label: "Integration complexity", score: 2 },
          { value: "governance", label: "Governance", score: 3 },
          { value: "roi", label: "ROI visibility", score: 2 },
        ],
      },
      {
        id: "data",
        question: "How would you describe your data landscape?",
        options: [
          { value: "centralized", label: "Centralized", score: 3 },
          { value: "fragmented", label: "Fragmented", score: 1 },
          { value: "mixed", label: "Mixed legacy + modern", score: 2 },
        ],
      },
      {
        id: "ownership",
        question: "Who owns AI decisions in your organization?",
        options: [
          { value: "it", label: "IT-led", score: 2 },
          { value: "business", label: "Business-led", score: 2 },
          { value: "joint", label: "Joint governance", score: 3 },
        ],
      },
    ],
    resultLevels: [
      {
        minScore: 0,
        maxScore: 8,
        level: "Early / Fragmented",
        color: "bg-amber-500/20",
        description: "Your AI adoption is early-stage or fragmented. Focus on establishing foundations before scaling to avoid technical debt and governance gaps.",
        whatAiCanDo: [
          "Establish AI governance framework",
          "Controlled pilot deployments",
          "Data consolidation and preparation",
          "Risk assessment and mitigation planning",
        ],
        recommendedPath: {
          title: "Enterprise AI Readiness Framework",
          link: "/intelligence/enterprise-knowledge-ai/",
        },
        journey: {
          now: "Readiness & risk assessment",
          next: "Controlled AI deployment",
          later: "Agentic & decision systems",
        },
        nextActions: [
          { label: "Enterprise Readiness", link: "/intelligence/enterprise-knowledge-ai/" },
          { label: "Talk to AI Architect", link: "/corporate/contact/" },
        ],
      },
      {
        minScore: 9,
        maxScore: 11,
        level: "Intermediate / Building",
        color: "bg-blue-500/20",
        description: "You have foundations but need to address governance and integration challenges before scaling further.",
        whatAiCanDo: [
          "Unified AI orchestration layer",
          "Cross-system integration patterns",
          "Governance and compliance automation",
          "Measurable AI deployment framework",
        ],
        recommendedPath: {
          title: "Enterprise Knowledge Intelligence",
          link: "/intelligence/enterprise-knowledge-ai/",
        },
        journey: {
          now: "Governance & orchestration",
          next: "Scaled deployment",
          later: "Autonomous enterprise AI",
        },
        nextActions: [
          { label: "Knowledge Intelligence", link: "/intelligence/enterprise-knowledge-ai/" },
          { label: "Request Architecture Review", link: "/corporate/contact/" },
        ],
      },
      {
        minScore: 12,
        maxScore: 17,
        level: "Advanced / Ready to Scale",
        color: "bg-primary/20",
        description: "Strong foundations in place. You're ready for enterprise-wide AI transformation with proper governance and measurable outcomes.",
        whatAiCanDo: [
          "Enterprise-wide AI deployment",
          "Agentic systems for complex workflows",
          "Advanced decision intelligence",
          "AI-powered business transformation",
        ],
        recommendedPath: {
          title: "Agentic AI Systems",
          link: "/intelligence/autonomous-agentic-ai/",
        },
        journey: {
          now: "Scaled AI deployment",
          next: "Autonomous systems",
          later: "AI-native enterprise",
        },
        nextActions: [
          { label: "Agentic AI Systems", link: "/intelligence/autonomous-agentic-ai/" },
          { label: "Enterprise Consultation", link: "/corporate/contact/" },
        ],
      },
    ],
  },
};

const assessmentTools = [
  {
    key: "ai-starting-point",
    icon: Sparkles,
    title: "AI Starting Point Finder",
    forLabel: "New to AI",
    description: "Not sure where to begin? This quick assessment helps you understand if AI can help your business and where to start.",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    key: "startup-accelerator",
    icon: Rocket,
    title: "Startup AI Accelerator",
    forLabel: "Startups",
    description: "Moving fast with limited resources? Find the right AI approach for your stage without overengineering.",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    key: "operational-efficiency",
    icon: Building2,
    title: "Operational Efficiency Analyzer",
    forLabel: "Growing Business",
    description: "Identify cost and time leakage in your operations. See exactly where AI delivers the highest ROI.",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    key: "enterprise-strategy",
    icon: Building,
    title: "Enterprise AI Strategy Navigator",
    forLabel: "Enterprise",
    description: "Assess readiness, identify governance gaps, and plan your enterprise AI journey strategically.",
    color: "from-purple-500/20 to-purple-600/10",
  },
];

function InlineAssessment({ 
  config, 
  onClose 
}: { 
  config: AssessmentConfig; 
  onClose: () => void;
}) {
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const { triggerCelebration } = useCelebration();

  const totalQuestions = config.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    const newScores = { ...scores, [questionId]: score };
    setAnswers(newAnswers);
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStep("result");
        triggerCelebration();
      }
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setStep("intro");
    }
  };

  const restart = () => {
    setStep("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setScores({});
  };

  const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const resultLevel = config.resultLevels.find(
    (level) => totalScore >= level.minScore && totalScore <= level.maxScore
  ) || config.resultLevels[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="mt-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-testid="button-close-assessment"
          >
            <X className="h-4 w-4 mr-2" />
            Back to Assessments
          </Button>
          {step !== "intro" && (
            <Button variant="ghost" size="sm" onClick={restart}>
              Start Over
            </Button>
          )}
        </div>

        <AnimatePresence mode="sync">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                  <Badge variant="outline" className="mb-2">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Guided Assessment
                  </Badge>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {config.title}
                  </h3>
                  
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    {config.subtitle}
                  </p>
                  
                  <div className="bg-muted/30 rounded-lg p-6 text-left max-w-lg mx-auto">
                    <p className="text-sm text-muted-foreground">
                      {config.intro}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>{totalQuestions} questions</span>
                    <span className="text-border">|</span>
                    <span>~2 minutes</span>
                  </div>
                  
                  <Button
                    size="lg"
                    onClick={() => setStep("questions")}
                    data-testid="button-start-inline-assessment"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "questions" && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <Card className="border-border/50 overflow-hidden">
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {totalQuestions}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goBack}
                      disabled={currentQuestion === 0}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center">
                    {config.questions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {config.questions[currentQuestion].options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleAnswer(
                          config.questions[currentQuestion].id,
                          option.value,
                          option.score
                        )}
                        className={`w-full p-4 text-left rounded-lg border transition-all ${
                          answers[config.questions[currentQuestion].id] === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
                        }`}
                        data-testid={`option-inline-${option.value}`}
                      >
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-border/50 overflow-hidden">
                <CardContent className="p-8 md:p-12 space-y-8">
                  <div className="text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${resultLevel.color}`}>
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                    
                    <div>
                      <Badge variant="outline" className="mb-2">Your AI Readiness Level</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold">{resultLevel.level}</h3>
                    </div>
                    
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      {resultLevel.description}
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      What AI Can Realistically Do for You
                    </h4>
                    <ul className="space-y-2">
                      {resultLevel.whatAiCanDo.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Recommended Path Forward</h4>
                    <Link href={resultLevel.recommendedPath.link}>
                      <Card className="hover-elevate border-primary/50 bg-primary/5">
                        <CardContent className="p-4 flex items-center justify-between">
                          <span className="font-medium">{resultLevel.recommendedPath.title}</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </CardContent>
                      </Card>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Your AI Journey</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <Badge variant="secondary" className="mb-2">Now</Badge>
                        <p className="text-sm text-muted-foreground">{resultLevel.journey.now}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <Badge variant="secondary" className="mb-2">Next</Badge>
                        <p className="text-sm text-muted-foreground">{resultLevel.journey.next}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                        <Badge variant="secondary" className="mb-2">Later</Badge>
                        <p className="text-sm text-muted-foreground">{resultLevel.journey.later}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {resultLevel.nextActions.map((action, i) => (
                      <Button
                        key={i}
                        variant={i === 0 ? "default" : "outline"}
                        asChild
                        className="flex-1"
                      >
                        <Link href={action.link}>
                          {action.label}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ))}
                  </div>

                  <div className="text-center pt-4 border-t border-border/50">
                    <Button variant="ghost" onClick={onClose}>
                      Explore Other Assessments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function GuidedAssessmentSection() {
  const { ref, isInView } = useScrollAnimation();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  const activeConfig = activeAssessment ? assessmentConfigs[activeAssessment] : null;

  return (
    <section id="discovery" className="py-24 bg-background" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Guided Assessments</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-discovery">
            Find Your AI Starting Point
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not sure where to begin? Take a quick guided assessment tailored to your situation 
            and get personalized recommendations for your AI journey.
          </p>
        </motion.div>

        <AnimatePresence mode="sync">
          {!activeAssessment ? (
            <motion.div
              key="cards"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {assessmentTools.map((tool, index) => (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      type="button"
                      aria-label={`Open ${tool.title} assessment`}
                      onClick={() => setActiveAssessment(tool.key)}
                      className="w-full text-left"
                    >
                      <Card className="h-full min-h-[280px] hover-elevate border-border/50 group" data-testid={`card-tool-${tool.forLabel.toLowerCase().replace(/\s+/g, '-')}`}>
                        <CardContent className={`p-6 h-full bg-gradient-to-br ${tool.color} rounded-lg flex flex-col`}>
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                            <tool.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div className="mb-3">
                            <Badge variant="secondary" className="mb-2 text-xs">{tool.forLabel}</Badge>
                            <h3 className="font-semibold text-lg">{tool.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground flex-grow">
                            {tool.description}
                          </p>
                          <div className="flex items-center text-sm text-primary pt-4 font-medium mt-auto">
                            Find AI Solution
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                          </div>
                        </CardContent>
                      </Card>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            activeConfig && (
              <InlineAssessment
                key={activeAssessment}
                config={activeConfig}
                onClose={() => setActiveAssessment(null)}
              />
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function Home() {
  
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://agixtech.com/#organization",
    "name": "AGIX Technologies",
    "url": "https://agixtech.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cms.agixtech.com/wp-content/uploads/2026/01/AGIX-Technologies-logo-scaled.png",
      "@id": "https://agixtech.com/#logo"
    },
    "description": "AGIX Technologies is a leading AI Systems Engineering company helping enterprises design, deploy, and scale autonomous AI systems including agentic AI, voice AI, RAG systems, and predictive analytics.",
    "foundingDate": "2020",
    "sameAs": [
      "https://twitter.com/agixtech",
      "https://linkedin.com/company/agixtech",
      "https://facebook.com/agixtech"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-857-4141-353",
      "contactType": "sales",
      "email": "santosh@agixtech.com",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "99 Derby Street",
      "addressLocality": "Hingham",
      "addressRegion": "MA",
      "postalCode": "02043",
      "addressCountry": "US"
    }
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://agixtech.com/#website",
    "url": "https://agixtech.com",
    "name": "AGIX Technologies",
    "description": "Leading AI Systems Engineering and Agentic Intelligence company specializing in enterprise AI automation, voice agents, chatbots, RAG systems, and predictive analytics.",
    "publisher": { "@id": "https://agixtech.com/#organization" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://agixtech.com/insights/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://agixtech.com/#webpage",
    "url": "https://agixtech.com/",
    "name": "AGIX Technologies | Enterprise AI Systems Engineering & Agentic Intelligence",
    "description": "Transform your business with enterprise AI solutions. AGIX Technologies specializes in agentic AI systems, voice agents, chatbots, RAG systems, and predictive analytics for Fortune 500 companies.",
    "isPartOf": { "@id": "https://agixtech.com/#website" },
    "about": { "@id": "https://agixtech.com/#organization" },
    "inLanguage": "en-US"
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://agixtech.com/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://agixtech.com/"
      }
    ]
  };

  const jsonLdServices = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://agixtech.com/#services",
    "name": "AGIX Technologies AI Services",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "AI Automation Services",
        "description": "AI automation services that streamline enterprise workflows, reduce operational costs, and improve efficiency using intelligent decision-making systems.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "AI Automation Services"
      },
      {
        "@type": "Service",
        "name": "AI Voice Agents",
        "description": "AI-powered voice agents that enable natural, real-time voice interactions for customer support, sales, and enterprise operations.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Voice AI Agents"
      },
      {
        "@type": "Service",
        "name": "Conversational AI Chatbots",
        "description": "Conversational AI chatbots designed to deliver accurate, context-aware, and scalable customer and enterprise interactions across channels.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Conversational AI Chatbots"
      },
      {
        "@type": "Service",
        "name": "Agentic AI Systems",
        "description": "Agentic AI systems that autonomously reason, plan, and execute tasks across complex enterprise environments with governance and control.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Agentic AI System"
      },
      {
        "@type": "Service",
        "name": "RAG Services",
        "description": "Retrieval-Augmented Generation services that connect large language models with enterprise data to deliver accurate, grounded, and explainable AI outputs.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Retrieval-Augmented Generation"
      },
      {
        "@type": "Service",
        "name": "Predictive Analytics AI",
        "description": "Predictive analytics AI solutions that forecast trends, detect risks, and enable data-driven decision-making using advanced machine learning models.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Predictive Analytics Services"
      },
      {
        "@type": "Service",
        "name": "Computer Vision Solutions",
        "description": "Computer vision solutions that analyze images and video to automate inspection, recognition, monitoring, and visual intelligence tasks.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Computer Vision Solutions"
      },
      {
        "@type": "Service",
        "name": "Custom AI Product Development Services",
        "description": "Custom AI Product Development Services for enterprises building production-ready AI products, including model development, agentic workflows, system integration, deployment, and ongoing governance at scale.",
        "provider": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Custom AI Product Development Services"
      }
    ]
  };
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }}
      />
      <MainHeader />
      <main>
        <HeroSection />
        <LazyMount fallbackHeight="700px">
          <GuidedAssessmentSection />
        </LazyMount>
        <LazyMount fallbackHeight="800px">
          <DynamicIntelligenceSection />
        </LazyMount>
        <LazyMount fallbackHeight="900px">
          <DynamicServicesSection />
        </LazyMount>
        <LazyMount fallbackHeight="700px">
          <DynamicIndustriesSection />
        </LazyMount>
        <LazyMount fallbackHeight="400px">
          <DynamicTestimonialsSection />
        </LazyMount>
        <LazyMount fallbackHeight="400px">
          <DynamicCaseStudiesSection />
        </LazyMount>
        <LazyMount fallbackHeight="500px">
          <DynamicContactSection />
        </LazyMount>
      </main>
      <LazyMount fallbackHeight="360px">
        <DynamicMainFooter />
      </LazyMount>
    </div>
  );
}
