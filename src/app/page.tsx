"use client";

import { useState, useEffect } from "react";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCelebration } from "@/components/success-celebration";
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
  Phone,
  Mail,
  Brain,
  Bot,
  MessageSquare,
  Database,
  LineChart,
  Eye,
  Target,
  Lightbulb,
  Zap,
  HeartPulse,
  Home as HomeIcon,
  Landmark,
  ShoppingCart,
  Truck,
  GraduationCap,
  Quote,
  TrendingUp,
  Clock,
  PartyPopper,
  Star,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % aiFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = aiFacts[currentFact].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-8 pt-6 border-t border-slate-800/50"
    >
      <div className="flex items-center gap-3 text-slate-400">
        <div className="flex items-center gap-2 text-primary text-sm font-medium whitespace-nowrap">
          <Lightbulb className="w-4 h-4" />
          <span>Did you know?</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFact}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm"
          >
            <CurrentIcon className="w-4 h-4 text-primary/70 flex-shrink-0 hidden sm:block" />
            <span className="text-slate-300">{aiFacts[currentFact].fact}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ============================================
// DYNAMIC SCROLL BACKGROUND HOOK
// ============================================
function useScrollBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, isMounted };
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
  const { scrollY, isMounted } = useScrollBackground();
  const gradientOffset = isMounted ? Math.min(scrollY * 0.1, 30) : 0;
  const gradientOpacity = isMounted ? Math.max(0.15 - scrollY * 0.0003, 0.05) : 0.15;
  const secondGradientOpacity = isMounted ? Math.max(0.08 - scrollY * 0.0002, 0.02) : 0.08;

  return (
    <section className="min-h-[80vh] pt-24 lg:pt-28 flex flex-col justify-center bg-slate-950 relative overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% ${-20 + gradientOffset}%, rgba(249,115,22,${gradientOpacity}), transparent)`
        }}
      />
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse 50% 80% at ${80 - gradientOffset * 0.5}% 50%, rgba(249,115,22,${secondGradientOpacity}), transparent)`
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="outline" className="border-primary/30 text-primary mb-4">
                  AI Automation Partner
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight"
                data-testid="heading-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Not Sure Where to Start{" "}
                <span className="text-primary">With AI?</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-slate-400 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                You're not alone. Most businesses know AI matters—but struggle with where to begin. 
                We help you find the right starting point for your situation.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25" asChild data-testid="button-hero-discover">
                <a href="#discovery">
                  Find Your Starting Point
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" asChild data-testid="button-hero-contact">
                <a href="#contact">
                  Talk to Us
                </a>
              </Button>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "100+", label: "Projects" },
                { value: "24/7", label: "Support" },
                { value: "40%", label: "Cost Savings" },
              ].map((stat, i) => (
                <div 
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50"
                >
                  <span className="text-primary font-bold">{stat.value}</span>
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative hidden lg:block" suppressHydrationWarning>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />
              
              <div className="absolute inset-8 rounded-full border border-slate-700/30" />
              <div className="absolute inset-16 rounded-full border border-slate-700/20" />
              <div className="absolute inset-24 rounded-full border border-primary/20" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                {isMounted && (
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
          link: "/intelligence/operational",
        },
        journey: {
          now: "Simple AI-powered automation",
          next: "Conversational AI (chat/voice)",
          later: "Decision & analytics systems",
        },
        nextActions: [
          { label: "Explore Simple Automation", link: "/intelligence/operational" },
          { label: "Talk to an Expert", link: "/corporate/contact" },
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
          link: "/intelligence/conversational",
        },
        journey: {
          now: "Chatbots and workflow automation",
          next: "Predictive analytics",
          later: "Advanced decision systems",
        },
        nextActions: [
          { label: "Explore Conversational AI", link: "/intelligence/conversational" },
          { label: "View Case Studies", link: "/case-studies" },
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
          link: "/intelligence/decision",
        },
        journey: {
          now: "Decision support and analytics",
          next: "Autonomous AI agents",
          later: "Enterprise-wide AI transformation",
        },
        nextActions: [
          { label: "Explore Decision Intelligence", link: "/intelligence/decision" },
          { label: "Schedule Consultation", link: "/corporate/contact" },
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
          link: "/services/chatbots",
        },
        journey: {
          now: "Automation + AI copilots",
          next: "Custom AI features",
          later: "Agentic workflows",
        },
        nextActions: [
          { label: "Explore AI Workflows", link: "/intelligence/operational" },
          { label: "View Startup Cases", link: "/case-studies" },
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
          link: "/services/custom-ai-product",
        },
        journey: {
          now: "Custom AI features",
          next: "Advanced automation",
          later: "AI-first product strategy",
        },
        nextActions: [
          { label: "Custom AI Solutions", link: "/services/custom-ai-product" },
          { label: "Talk to Us", link: "/corporate/contact" },
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
          link: "/services/agentic-ai-systems",
        },
        journey: {
          now: "Agentic workflows",
          next: "AI platform capabilities",
          later: "AI-native architecture",
        },
        nextActions: [
          { label: "Explore Agentic AI", link: "/services/agentic-ai-systems" },
          { label: "Schedule Strategy Call", link: "/corporate/contact" },
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
          link: "/intelligence/operational",
        },
        journey: {
          now: "Targeted workflow automation",
          next: "Process optimization",
          later: "Predictive operations",
        },
        nextActions: [
          { label: "Operational Intelligence", link: "/intelligence/operational" },
          { label: "View SMB Cases", link: "/case-studies" },
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
          link: "/intelligence/decision",
        },
        journey: {
          now: "Workflow automation",
          next: "Predictive insights",
          later: "Agent-assisted operations",
        },
        nextActions: [
          { label: "Decision Intelligence", link: "/intelligence/decision" },
          { label: "Calculate Savings", link: "/corporate/contact" },
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
          link: "/intelligence/enterprise-knowledge",
        },
        journey: {
          now: "Immediate automation wins",
          next: "Decision intelligence systems",
          later: "Autonomous operations",
        },
        nextActions: [
          { label: "Enterprise Solutions", link: "/intelligence/enterprise-knowledge" },
          { label: "Request Assessment", link: "/corporate/contact" },
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
          link: "/intelligence/enterprise-knowledge",
        },
        journey: {
          now: "Readiness & risk assessment",
          next: "Controlled AI deployment",
          later: "Agentic & decision systems",
        },
        nextActions: [
          { label: "Enterprise Readiness", link: "/intelligence/enterprise-knowledge" },
          { label: "Talk to AI Architect", link: "/corporate/contact" },
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
          link: "/intelligence/enterprise-knowledge",
        },
        journey: {
          now: "Governance & orchestration",
          next: "Scaled deployment",
          later: "Autonomous enterprise AI",
        },
        nextActions: [
          { label: "Knowledge Intelligence", link: "/intelligence/enterprise-knowledge" },
          { label: "Request Architecture Review", link: "/corporate/contact" },
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
          link: "/intelligence/agentic",
        },
        journey: {
          now: "Scaled AI deployment",
          next: "Autonomous systems",
          later: "AI-native enterprise",
        },
        nextActions: [
          { label: "Agentic AI Systems", link: "/intelligence/agentic" },
          { label: "Enterprise Consultation", link: "/corporate/contact" },
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
                      onClick={() => setActiveAssessment(tool.key)}
                      className="w-full text-left"
                    >
                      <Card className="h-full min-h-[280px] hover-elevate border-border/50 group" data-testid={`card-tool-${tool.forLabel.toLowerCase().replace(/\s+/g, '-')}`}>
                        <CardContent className={`p-6 h-full bg-gradient-to-br ${tool.color} rounded-lg flex flex-col`}>
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                            <tool.icon className="h-6 w-6 text-primary" />
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
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
// INTELLIGENCE SECTION - AGIX's 5 Intelligence Types
// ============================================
const intelligenceTypes = [
  {
    icon: Workflow,
    title: "Operational Intelligence",
    description: "Streamline operations with AI-driven insights that optimize workflows, reduce bottlenecks, and improve efficiency across your organization.",
    link: "/intelligence/operational",
    color: "from-blue-500/10 to-blue-600/10",
    metrics: [
      { value: "72%", label: "Cycle Time Reduction" },
      { value: "98%", label: "SLA Adherence" },
      { value: "$1.4M", label: "Annual Savings" },
    ],
  },
  {
    icon: MessageSquare,
    title: "Conversational Intelligence",
    description: "Natural language understanding and processing that powers intelligent chatbots, voice assistants, and customer interactions.",
    link: "/intelligence/conversational",
    color: "from-green-500/10 to-green-600/10",
    metrics: [
      { value: "63%", label: "First-Contact Resolution" },
      { value: "50+", label: "Languages Supported" },
      { value: "94%", label: "CSAT Score" },
    ],
  },
  {
    icon: Brain,
    title: "Decision Intelligence",
    description: "Data-driven decision support systems that analyze complex scenarios and provide actionable recommendations.",
    link: "/intelligence/decision",
    color: "from-purple-500/10 to-purple-600/10",
    metrics: [
      { value: "89%", label: "Forecast Accuracy" },
      { value: "6x", label: "Faster Scenario Planning" },
      { value: "3.2x", label: "Decision ROI" },
    ],
  },
  {
    icon: Bot,
    title: "Autonomous Agentic Systems",
    description: "Self-learning autonomous AI agents that execute complex tasks, adapt to changing conditions, and operate independently.",
    link: "/intelligence/agentic",
    color: "from-amber-500/10 to-amber-600/10",
    metrics: [
      { value: "87%", label: "Hands-Free Execution" },
      { value: "35%", label: "Surge Capacity" },
      { value: "12min", label: "Self-Heal Time" },
    ],
  },
  {
    icon: Database,
    title: "Enterprise Knowledge Intelligence",
    description: "Unified enterprise knowledge management that captures, organizes, and surfaces institutional knowledge when needed.",
    link: "/intelligence/enterprise-knowledge",
    color: "from-rose-500/10 to-rose-600/10",
    metrics: [
      { value: "92%", label: "Retrieval Precision" },
      { value: "68%", label: "Faster Onboarding" },
      { value: "78%", label: "Less Duplicate Docs" },
    ],
  },
];

function IntelligenceSection() {
  const { ref, isInView } = useScrollAnimation();
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
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We specialize in five core areas of AI intelligence, each designed to solve 
            specific business challenges and drive measurable outcomes.
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
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  activeIndex === index ? "bg-amber-500/20" : "bg-slate-700/50 group-hover:bg-slate-700"
                }`}>
                  <intel.icon className={`h-5 w-5 transition-colors ${
                    activeIndex === index ? "text-amber-500" : "text-slate-400 group-hover:text-slate-300"
                  }`} />
                </div>
                <span className={`font-medium transition-colors ${
                  activeIndex === index ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                }`}>
                  {intel.title}
                </span>
                {activeIndex === index && (
                  <ArrowRight className="ml-auto h-4 w-4 text-amber-500" />
                )}
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
                        <activeIntel.icon className="h-8 w-8 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {activeIntel.title}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                          {activeIntel.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {activeIntel.metrics.map((metric, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-4 rounded-lg bg-slate-800/50"
                          >
                            <div className="text-2xl font-bold text-amber-500">{metric.value}</div>
                            <div className="text-xs text-slate-500 mt-1">{metric.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      <Link href={activeIntel.link}>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                          Explore {activeIntel.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
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

// ============================================
// SERVICES SECTION - Interactive Service Journeys
// ============================================
const serviceCategories = [
  { id: "all", label: "All Services" },
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
    link: "/services/ai-automation",
    heroStat: { value: "80%", label: "Less Manual Work" },
    before: "Staff spending 6+ hours daily on data entry, copy-paste tasks, and spreadsheet updates",
    after: ["Automated end-to-end workflows", "Staff focus on strategic work", "Zero data entry errors"],
    differentiators: ["Process mining discovers hidden inefficiencies", "Self-optimizing workflows improve over time", "No-code interface for business users"],
    idealFor: "Operations teams drowning in repetitive tasks",
    timeline: "4-8 weeks",
    category: "operations",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Phone,
    title: "AI Voice Agents",
    tagline: "24/7 Human-Like Conversations",
    description: "Intelligent voice-based interactions that handle customer calls, appointments, and support with natural, human-like understanding.",
    link: "/services/voice-agents",
    heroStat: { value: "70%", label: "Call Deflection" },
    before: "Long hold times, missed calls after hours, agents overwhelmed by routine inquiries",
    after: ["Instant pickup, zero wait time", "24/7 coverage without overtime", "Agents handle only complex cases"],
    differentiators: ["Natural speech patterns and emotions", "Multi-language support (50+ languages)", "Seamless human handoff when needed"],
    idealFor: "Customer service and sales teams with high call volumes",
    timeline: "3-6 weeks",
    category: "customer",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI (Chatbots)",
    tagline: "Instant, Intelligent Support",
    description: "Smart conversational interfaces that engage customers, answer questions, and resolve issues instantly across all your channels.",
    link: "/services/chatbots",
    heroStat: { value: "3s", label: "Response Time" },
    before: "Customers waiting hours for email replies, support tickets piling up overnight",
    after: ["Instant answers to 80% of questions", "Consistent experience across channels", "Support team handles escalations only"],
    differentiators: ["Context-aware multi-turn conversations", "Omnichannel deployment (web, mobile, social)", "Real-time learning from interactions"],
    idealFor: "Support teams handling repetitive inquiries",
    timeline: "2-4 weeks",
    category: "customer",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: Bot,
    title: "Agentic AI Systems",
    tagline: "Autonomous AI That Gets Things Done",
    description: "Self-governing AI solutions that plan, execute, and adapt to complete complex multi-step tasks independently, learning and improving over time.",
    link: "/services/agentic-ai-systems",
    heroStat: { value: "87%", label: "Hands-Free Tasks" },
    before: "Multi-step processes requiring constant human oversight and manual handoffs between systems",
    after: ["End-to-end autonomous execution", "Self-correcting when issues arise", "Humans only approve final outputs"],
    differentiators: ["Goal-oriented reasoning and planning", "Multi-agent orchestration", "Human-in-the-loop when needed"],
    idealFor: "Enterprises with complex, multi-step workflows",
    timeline: "8-12 weeks",
    category: "enterprise",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    icon: Database,
    title: "RAG & Knowledge AI",
    tagline: "Your Knowledge, Instantly Accessible",
    description: "Retrieval-augmented generation that combines your enterprise knowledge with AI for accurate, contextual responses grounded in your data.",
    link: "/services/rag-knowledge",
    heroStat: { value: "95%", label: "Answer Accuracy" },
    before: "Employees searching 5+ systems to find answers, tribal knowledge leaving with departing staff",
    after: ["One search finds everything", "Institutional knowledge preserved", "New hires productive in days"],
    differentiators: ["Connects to all your data sources", "Semantic search understands intent", "Audit trails for compliance"],
    idealFor: "Knowledge-intensive organizations with scattered information",
    timeline: "4-6 weeks",
    category: "enterprise",
    color: "from-rose-500/20 to-rose-600/10",
  },
  {
    icon: LineChart,
    title: "Predictive & Analytics AI",
    tagline: "See the Future, Act Today",
    description: "Advanced predictive modeling that forecasts trends, identifies patterns, and drives data-informed decisions before problems happen.",
    link: "/services/predictive-analytics",
    heroStat: { value: "30%", label: "Better Forecasts" },
    before: "Decisions based on gut feel and outdated reports, surprises hitting after it's too late to act",
    after: ["Predict issues 2-4 weeks ahead", "Clear recommendations with confidence scores", "Real-time anomaly alerts"],
    differentiators: ["Custom models for your industry", "Explainable AI for trust", "Real-time dashboards"],
    idealFor: "Data teams wanting to move from reactive to proactive",
    timeline: "6-10 weeks",
    category: "data",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    tagline: "AI That Sees and Understands",
    description: "Visual AI and image processing that automates inspection, recognition, and analysis of visual data with superhuman accuracy.",
    link: "/services/computer-vision",
    heroStat: { value: "99.9%", label: "Detection Accuracy" },
    before: "Manual visual inspections causing fatigue, missed defects, and production delays",
    after: ["Every item inspected in milliseconds", "Defects caught before shipping", "Inspectors focus on edge cases"],
    differentiators: ["Works with existing cameras", "Edge deployment for speed", "Custom trained for your use case"],
    idealFor: "Manufacturing, logistics, and quality control teams",
    timeline: "6-8 weeks",
    category: "operations",
    color: "from-indigo-500/20 to-indigo-600/10",
  },
  {
    icon: Rocket,
    title: "Custom AI Product Development",
    tagline: "Your Vision, Built Right",
    description: "Build, launch, and scale custom AI products tailored to your unique business requirements and market needs, from idea to production.",
    link: "/services/custom-ai-product",
    heroStat: { value: "MVP", label: "to Production" },
    before: "Great AI idea but no team to build it, failed prototypes from inexperienced vendors",
    after: ["Production-ready AI product", "Full IP ownership from day one", "Technical partner for ongoing evolution"],
    differentiators: ["Full lifecycle from MVP to scale", "Your IP, your product", "Ongoing support and evolution"],
    idealFor: "Startups and enterprises building AI-first products",
    timeline: "12-24 weeks",
    category: "enterprise",
    color: "from-pink-500/20 to-pink-600/10",
  },
];

function ServicesSection() {
  const { ref, isInView } = useScrollAnimation();
  const [activeService, setActiveService] = useState(0);
  const service = allServices[activeService];

  const goNext = () => setActiveService((prev) => (prev + 1) % allServices.length);
  const goPrev = () => setActiveService((prev) => (prev - 1 + allServices.length) % allServices.length);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">Our Services</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white" data-testid="heading-services">
            AI Solutions Built for Results
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From repetitive tasks to complex workflows, see how each solution transforms your operations.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">{String(activeService + 1).padStart(2, '0')}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-500 font-mono text-sm">{String(allServices.length).padStart(2, '0')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="outline" 
                onClick={goPrev}
                className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                data-testid="button-service-prev"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                onClick={goNext}
                className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                data-testid="button-service-next"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      {serviceCategories.find(c => c.id === service.category)?.label}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-emerald-400 text-base sm:text-lg mb-3 sm:mb-4">{service.tagline}</p>
                  <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6">{service.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {service.differentiators.slice(0, 2).map((diff, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-700/50 text-[10px] sm:text-xs text-slate-300 border border-slate-600/30">
                        {diff}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 w-full sm:w-auto" asChild>
                      <Link href={service.link}>
                        Explore Service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <span className="text-sm text-slate-500 flex items-center justify-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {service.timeline}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-slate-700/50 flex flex-col items-center justify-center">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-400 mb-1 sm:mb-2">{service.heroStat.value}</div>
                    <div className="text-slate-400 text-sm sm:text-base">{service.heroStat.label}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <X className="h-3 w-3 text-red-400" />
                        <span className="text-xs font-medium text-red-400">Before</span>
                      </div>
                      <p className="text-xs text-slate-500">{service.before}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">After</span>
                      </div>
                      <div className="space-y-1.5">
                        {service.after.map((item, i) => (
                          <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
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
                <button
                  key={s.title}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                    activeService === index
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                  data-testid={`service-dot-${index}`}
                >
                  <s.icon className="h-4 w-4" />
                  <span className={`text-xs font-medium hidden sm:inline ${
                    activeService === index ? "" : "sr-only sm:not-sr-only"
                  }`}>
                    {activeService === index ? s.title.split(' ')[0] : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-900/20 to-emerald-800/10 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Not sure which service fits?</h3>
              <p className="text-slate-400">
                Take our quick assessment or talk to an AI expert.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" asChild>
                <a href="#discovery">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Take Assessment
                </a>
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900" asChild>
                <a href="#contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// INDUSTRIES SECTION - Full-Width Showcase with Rich Content
// ============================================
const industries = [
  { 
    icon: HeartPulse, 
    title: "Healthcare", 
    link: "/industries/healthcare",
    description: "Transform patient care with AI-powered diagnostics, automated clinical workflows, and intelligent health data management systems that improve outcomes while reducing costs.",
    useCases: [
      { name: "Patient Intake Automation", result: "75% faster registration" },
      { name: "Medical Document Processing", result: "95% accuracy rate" },
      { name: "Clinical Decision Support", result: "30% better diagnoses" },
      { name: "Insurance Verification", result: "Real-time eligibility" },
      { name: "Appointment Scheduling", result: "40% fewer no-shows" },
      { name: "Lab Result Analysis", result: "Instant interpretations" },
    ],
    stats: [
      { value: "85%", label: "Faster Processing" },
      { value: "$2.4M", label: "Annual Savings" },
      { value: "95%", label: "Accuracy Rate" },
    ],
    testimonial: "AGIX reduced our patient intake from 3 days to 3 hours. The accuracy improvements have been remarkable.",
    testimonialAuthor: "Chief Medical Officer, Regional Health Network",
  },
  { 
    icon: HomeIcon, 
    title: "Real Estate", 
    link: "/industries/real-estate",
    description: "Accelerate property transactions with intelligent lead qualification, automated valuations, and seamless document management that closes deals faster.",
    useCases: [
      { name: "Lead Qualification & Scoring", result: "3x conversion rate" },
      { name: "Automated Property Valuation", result: "98% market accuracy" },
      { name: "Transaction Document Processing", result: "Same-day closings" },
      { name: "Market Trend Analysis", result: "Predictive insights" },
      { name: "Virtual Tour Scheduling", result: "24/7 availability" },
      { name: "Contract Review & Extraction", result: "90% faster review" },
    ],
    stats: [
      { value: "3x", label: "Faster Closings" },
      { value: "60%", label: "Less Manual Work" },
      { value: "45%", label: "More Leads Converted" },
    ],
    testimonial: "We went from losing deals due to slow processing to being the fastest agency in our market.",
    testimonialAuthor: "Broker, Premier Properties Group",
  },
  { 
    icon: Landmark, 
    title: "Fintech & Lending", 
    link: "/industries/fintech",
    description: "Accelerate loan processing with AI-powered credit decisioning, fraud detection, and regulatory compliance automation that wins customers and protects margins.",
    useCases: [
      { name: "Instant Credit Scoring", result: "Real-time decisions" },
      { name: "Fraud Detection & Prevention", result: "99.2% detection rate" },
      { name: "Regulatory Compliance", result: "Automated reporting" },
      { name: "Document Verification", result: "Instant validation" },
      { name: "Risk Assessment Models", result: "Predictive accuracy" },
      { name: "Customer Onboarding", result: "5-minute KYC" },
    ],
    stats: [
      { value: "60%", label: "Cost Reduction" },
      { value: "4x", label: "Faster Approvals" },
      { value: "35%", label: "More Applications" },
    ],
    testimonial: "Speed became our competitive advantage. We now approve loans faster than our competitors can process applications.",
    testimonialAuthor: "VP of Lending, Mid-Size Credit Union",
  },
  { 
    icon: Building2, 
    title: "Insurance", 
    link: "/industries/insurance",
    description: "Modernize claims processing with intelligent automation, predictive underwriting, and customer service AI that reduces costs while improving satisfaction.",
    useCases: [
      { name: "Claims Processing Automation", result: "70% faster resolution" },
      { name: "Underwriting Decision Support", result: "Better risk pricing" },
      { name: "Policy Document Analysis", result: "Instant extraction" },
      { name: "Fraud Pattern Detection", result: "$5M saved annually" },
      { name: "Customer Service Automation", result: "24/7 support" },
      { name: "Renewal Prediction", result: "Proactive retention" },
    ],
    stats: [
      { value: "70%", label: "Faster Claims" },
      { value: "40%", label: "Lower Costs" },
      { value: "92%", label: "Customer Satisfaction" },
    ],
    testimonial: "Claims that took weeks now take days. Our customers notice the difference, and so does our bottom line.",
    testimonialAuthor: "Chief Claims Officer, National Insurance Co.",
  },
  { 
    icon: ShoppingCart, 
    title: "Retail & eCommerce", 
    link: "/industries/retail",
    description: "Drive conversions with personalized experiences, intelligent inventory management, and AI-powered customer service that scales with your business.",
    useCases: [
      { name: "Product Recommendations", result: "40% higher AOV" },
      { name: "Inventory Optimization", result: "25% less overstock" },
      { name: "Customer Support AI", result: "80% self-service rate" },
      { name: "Demand Forecasting", result: "95% accuracy" },
      { name: "Dynamic Pricing", result: "15% margin improvement" },
      { name: "Review Analysis", result: "Actionable insights" },
    ],
    stats: [
      { value: "40%", label: "Higher Conversion" },
      { value: "25%", label: "Less Stockouts" },
      { value: "$1.8M", label: "Inventory Savings" },
    ],
    testimonial: "Our AI-powered recommendations now drive 35% of our revenue. The personalization feels magic to customers.",
    testimonialAuthor: "Head of Digital, Fashion Retailer",
  },
  { 
    icon: Truck, 
    title: "Logistics & Supply Chain", 
    link: "/industries/logistics",
    description: "Optimize operations with intelligent route planning, predictive demand forecasting, and warehouse automation that reduces costs and improves delivery times.",
    useCases: [
      { name: "Route Optimization", result: "20% fuel savings" },
      { name: "Demand Forecasting", result: "30% better accuracy" },
      { name: "Warehouse Automation", result: "50% faster picking" },
      { name: "Shipment Tracking AI", result: "Real-time visibility" },
      { name: "Supplier Risk Analysis", result: "Proactive mitigation" },
      { name: "Capacity Planning", result: "Optimal utilization" },
    ],
    stats: [
      { value: "25%", label: "Cost Savings" },
      { value: "30%", label: "Faster Delivery" },
      { value: "99.5%", label: "On-Time Rate" },
    ],
    testimonial: "We now predict demand before it happens. Our customers get faster deliveries and we spend less getting them there.",
    testimonialAuthor: "VP Operations, National Logistics Provider",
  },
  { 
    icon: Sparkles, 
    title: "Hospitality & Wellness", 
    link: "/industries/hospitality",
    description: "Elevate guest experiences with personalized service, intelligent booking optimization, and operational automation that creates memorable stays.",
    useCases: [
      { name: "Guest Personalization", result: "50% higher satisfaction" },
      { name: "Smart Booking Optimization", result: "20% more revenue" },
      { name: "Concierge AI Assistants", result: "24/7 service" },
      { name: "Review Sentiment Analysis", result: "Proactive resolution" },
      { name: "Staff Scheduling", result: "Optimal coverage" },
      { name: "Upsell Recommendations", result: "35% attach rate" },
    ],
    stats: [
      { value: "50%", label: "Better Reviews" },
      { value: "20%", label: "Revenue Increase" },
      { value: "4.8", label: "Star Average" },
    ],
    testimonial: "Our AI concierge handles 60% of guest requests perfectly. Staff now focus on creating exceptional moments.",
    testimonialAuthor: "General Manager, Boutique Hotel Collection",
  },
  { 
    icon: GraduationCap, 
    title: "EdTech & E-Learning", 
    link: "/industries/edtech",
    description: "Transform education with adaptive learning paths, automated content generation, and intelligent assessment systems that improve outcomes for every learner.",
    useCases: [
      { name: "Adaptive Learning Paths", result: "2x engagement" },
      { name: "Content Generation", result: "10x faster creation" },
      { name: "Automated Grading", result: "Instant feedback" },
      { name: "Student Support Chatbots", result: "24/7 tutoring" },
      { name: "Learning Analytics", result: "Intervention alerts" },
      { name: "Curriculum Optimization", result: "Data-driven updates" },
    ],
    stats: [
      { value: "2x", label: "Engagement" },
      { value: "45%", label: "Better Outcomes" },
      { value: "80%", label: "Completion Rate" },
    ],
    testimonial: "Students learn at their own pace with instant feedback. Completion rates have doubled since we implemented AGIX.",
    testimonialAuthor: "Chief Learning Officer, Online University",
  },
];

function IndustriesSection() {
  const { ref, isInView } = useScrollAnimation();
  const [activeIndustry, setActiveIndustry] = useState(0);
  const current = industries[activeIndustry];

  return (
    <section className="py-24 bg-slate-950/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Industries We Serve</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">
            AI Solutions Tailored to Your Industry
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We understand the unique challenges of your sector. Explore our proven solutions 
            with real results from businesses like yours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8 px-2"
        >
          {industries.map((industry, index) => (
            <button
              key={industry.title}
              onClick={() => setActiveIndustry(index)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all touch-target-sm ${
                activeIndustry === index 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              data-testid={`button-industry-${index}`}
            >
              <industry.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">{industry.title}</span>
              <span className="xs:hidden">{industry.title.split(' ')[0]}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/20">
                          <current.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold">{current.title}</h3>
                          <Badge variant="secondary" className="mt-1">Industry Solutions</Badge>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {current.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4">
                        {current.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-start gap-3">
                          <Quote className="h-6 w-6 text-primary/40 shrink-0 mt-1" />
                          <div>
                            <p className="text-sm italic text-muted-foreground mb-2">
                              "{current.testimonial}"
                            </p>
                            <p className="text-xs text-muted-foreground">
                              — {current.testimonialAuthor}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" size="lg" asChild data-testid="button-industry-explore">
                        <Link href={current.link}>
                          Explore {current.title} Solutions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 bg-muted/20">
                    <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      Key Use Cases & Results
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {current.useCases.map((useCase, i) => (
                        <motion.div
                          key={useCase.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-background/50 border border-border/30"
                        >
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-xs sm:text-sm">{useCase.name}</p>
                            <p className="text-[10px] sm:text-xs text-primary mt-1">{useCase.result}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h5 className="font-semibold text-sm sm:text-base">Ready to transform your {current.title.toLowerCase()} operations?</h5>
                          <p className="text-xs sm:text-sm text-muted-foreground">Schedule a free consultation to see how AI can help.</p>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto" asChild>
                          <a href="#contact">
                            Talk to an Expert
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
const testimonials = [
  {
    quote: "AGIX transformed our document processing from a 3-day ordeal to a 3-hour task. The ROI was visible within the first month.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "TechFlow Inc.",
  },
  {
    quote: "They didn't just build us an AI solution—they helped us understand exactly what we needed. The discovery process alone was invaluable.",
    author: "Michael Roberts",
    role: "CTO",
    company: "Meridian Health",
  },
  {
    quote: "As a startup, we needed speed and flexibility. AGIX delivered a working prototype in 6 weeks that we're still scaling today.",
    author: "Lisa Park",
    role: "Founder & CEO",
    company: "DataSync",
  },
  {
    quote: "Our customer service response time dropped by 70% after implementing their AI chatbot. It handles 80% of queries without human intervention.",
    author: "James Anderson",
    role: "Director of Customer Experience",
    company: "RetailMax",
  },
  {
    quote: "The predictive analytics solution helped us reduce inventory costs by 40%. We now know what customers want before they do.",
    author: "Priya Sharma",
    role: "Chief Supply Chain Officer",
    company: "GlobalMart",
  },
  {
    quote: "AGIX's voice AI agents are handling 5,000 calls daily for us. The quality is indistinguishable from human agents.",
    author: "David Mueller",
    role: "Head of Operations",
    company: "InsureFirst",
  },
  {
    quote: "We automated our entire compliance workflow. What used to take a team of 12 now runs automatically with 99.8% accuracy.",
    author: "Amanda Foster",
    role: "Chief Compliance Officer",
    company: "Apex Financial",
  },
  {
    quote: "Their computer vision system catches defects our human inspectors miss. Quality issues dropped by 90% in three months.",
    author: "Robert Kim",
    role: "Manufacturing Director",
    company: "PrecisionTech",
  },
];

function TestimonialsSection() {
  const { ref, isInView } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Client Stories</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-testimonials">
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card 
            className="border-border/50"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <CardContent className="p-8 md:p-12 text-center relative">
              <Quote className="h-12 w-12 text-primary/20 absolute top-6 left-6" />
              
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                data-testid="button-testimonial-next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 px-8"
                >
                  <p className="text-lg md:text-xl text-foreground italic leading-relaxed">
                    "{testimonials[activeIndex].quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonials[activeIndex].author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                    data-testid={`button-testimonial-${index}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// CASE STUDIES SECTION - Enhanced Presentation
// ============================================
const caseStudies = [
  {
    title: "Healthcare Document Automation",
    client: "Regional Hospital Network",
    industry: "Healthcare",
    challenge: "Manual patient intake and insurance verification taking 3+ days",
    solution: "AI-powered document processing with automated data extraction",
    results: [
      { metric: "85%", label: "Faster Processing" },
      { metric: "95%", label: "Accuracy Rate" },
      { metric: "$2.4M", label: "Annual Savings" },
    ],
    quote: "The transformation was remarkable. What took days now takes hours.",
    quoteAuthor: "Chief Operations Officer",
    link: "/case-studies/healthcare-document-processing",
    icon: HeartPulse,
    color: "from-rose-500/10 to-rose-600/10",
  },
  {
    title: "Loan Processing Automation",
    client: "Mid-Size Credit Union",
    industry: "Finance",
    challenge: "Slow loan approval process losing customers to faster competitors",
    solution: "End-to-end loan processing with AI-powered credit analysis",
    results: [
      { metric: "60%", label: "Cost Reduction" },
      { metric: "4x", label: "Faster Approval" },
      { metric: "35%", label: "More Applications" },
    ],
    quote: "We went from losing deals to winning them because of speed.",
    quoteAuthor: "VP of Lending",
    link: "/case-studies/financial-services-automation",
    icon: Landmark,
    color: "from-blue-500/10 to-blue-600/10",
  },
  {
    title: "Retail Inventory Intelligence",
    client: "E-commerce Platform",
    industry: "Retail",
    challenge: "Stockouts and overstock costing millions in lost revenue",
    solution: "AI demand forecasting with automated inventory optimization",
    results: [
      { metric: "3x", label: "Faster Decisions" },
      { metric: "40%", label: "Less Stockouts" },
      { metric: "$1.8M", label: "Inventory Savings" },
    ],
    quote: "Finally, we can predict demand instead of reacting to it.",
    quoteAuthor: "Director of Operations",
    link: "/case-studies/retail-inventory-intelligence",
    icon: ShoppingCart,
    color: "from-amber-500/10 to-amber-600/10",
  },
];

function CaseStudiesSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-24 bg-slate-950/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Case Studies</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-case-studies">
            Real Results, Real Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how businesses across industries have transformed their operations with AGIX.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={study.link}>
                <Card className="hover-elevate border-border/50 group overflow-hidden" data-testid={`card-case-study-${index}`}>
                  <CardContent className={`p-0`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      <div className={`p-6 sm:p-8 bg-gradient-to-br ${study.color}`}>
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-3 sm:block">
                            <study.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary sm:mb-3" />
                            <Badge variant="secondary">{study.industry}</Badge>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold">{study.title}</h3>
                          <p className="text-sm text-muted-foreground">{study.client}</p>
                        </div>
                      </div>
                      
                      <div className="p-6 sm:p-8 space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Challenge</h4>
                          <p className="text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Solution</h4>
                          <p className="text-sm">{study.solution}</p>
                        </div>
                        <div className="pt-2 hidden sm:block">
                          <p className="text-sm italic text-muted-foreground">"{study.quote}"</p>
                          <p className="text-xs text-muted-foreground mt-1">— {study.quoteAuthor}</p>
                        </div>
                      </div>
                      
                      <div className="p-6 sm:p-8 bg-muted/30 flex flex-col justify-center">
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3 sm:mb-4">Results</h4>
                        <div className="flex flex-wrap gap-4 sm:gap-0 sm:flex-col sm:space-y-4">
                          {study.results.map((result) => (
                            <div key={result.label} className="flex items-center gap-2 sm:gap-3">
                              <div className="text-xl sm:text-2xl font-bold text-primary">{result.metric}</div>
                              <div className="text-xs sm:text-sm text-muted-foreground">{result.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-primary mt-4 sm:mt-6 group-hover:gap-2 transition-all">
                          Read Full Case Study
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button variant="outline" asChild data-testid="button-case-studies-all">
            <Link href="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// CONTACT SECTION
// ============================================
function ContactSection() {
  const { ref, isInView } = useScrollAnimation();
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertLead) => {
    setIsSubmitting(true);
    try {
      const { submitLead } = await import("@/lib/lead-submission");
      const result = await submitLead(
        {
          name: data.name,
          email: data.email,
          company: data.company || undefined,
          role: data.role || undefined,
          message: data.message || undefined,
        },
        {
          formType: "contact_form",
          source: "homepage_contact",
        }
      );

      if (result.success) {
        triggerCelebration();
        toast({
          title: "Message sent",
          description: "We'll be in touch within 24 hours.",
        });
        form.reset();
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Please try again or email us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Get Started</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-contact">
            Ready to Transform Your Business?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Let's discuss how AI can help you achieve your goals. No pressure, just clarity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Why Talk to Us?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Free consultation</span> — Understand your options before committing
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Honest assessment</span> — We'll tell you if AI is right for your situation
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Clear next steps</span> — Walk away with actionable recommendations
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Us Directly</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a 
                    href="tel:+18573656167" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-phone"
                  >
                    +1 857-365-6167
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a 
                    href="mailto:hello@agixtech.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-email"
                  >
                    hello@agixtech.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Send Us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@company.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company" {...field} data-testid="input-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input placeholder="Your role" {...field} data-testid="input-role" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How can we help?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your situation or goals..."
                              className="min-h-[100px]"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                      data-testid="button-submit"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main>
        <HeroSection />
        <GuidedAssessmentSection />
        <IntelligenceSection />
        <ServicesSection />
        <IndustriesSection />
        <TestimonialsSection />
        <CaseStudiesSection />
        <ContactSection />
      </main>
      <MainFooter />
    </div>
  );
}
