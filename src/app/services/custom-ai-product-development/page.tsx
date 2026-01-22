'use client'
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Rocket,
  Lightbulb,
  Target,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  Building2,
  Clock,
  ChevronRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Calculator,
  Loader2,
  Layers,
  Zap,
  Settings,
  TrendingUp,
  Users,
  Search,
  Code,
  Cpu,
  Database,
  Globe,
  Briefcase,
  DollarSign,
  Scale,
  Heart,
  GraduationCap,
  ShoppingCart,
  Home,
  Truck,
  Wrench,
  Palette,
  PlayCircle,
  BadgeCheck,
  LineChart,
  Compass,
  Box,
  Network,
  Cloud,
  Lock,
  Activity,
  BarChart3,
  Gauge,
  RefreshCw,
  Cog,
  Star,
  MessageSquare,
  Bot,
  FileText,
  Workflow,
  PieChart
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const productTypes = [
  { value: "ai-saas", label: "AI SaaS product" },
  { value: "ai-mvp", label: "AI MVP / prototype" },
  { value: "ai-marketplace", label: "AI-powered marketplace" },
  { value: "internal-tool", label: "Internal AI tool / platform" },
  { value: "ai-api", label: "AI API / backend system" },
  { value: "exploring", label: "Still exploring / not sure" }
];

const industries = [
  { value: "saas-b2b", label: "SaaS / B2B" },
  { value: "fintech", label: "Fintech" },
  { value: "healthtech", label: "Healthtech" },
  { value: "edtech", label: "Edtech" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "real-estate", label: "Real Estate" },
  { value: "logistics", label: "Logistics" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" }
];

const stages = [
  { value: "idea", label: "Idea / concept" },
  { value: "mvp-planning", label: "MVP planning" },
  { value: "mvp-built", label: "MVP built but not scaling" },
  { value: "early-traction", label: "Early traction" },
  { value: "scaling", label: "Scaling / preparing for funding" }
];

const whyFoundersChoose = [
  { icon: Target, text: "Product-first, not model-first" },
  { icon: DollarSign, text: "Startup-friendly pricing & scope" },
  { icon: Compass, text: "Clear roadmap from MVP to traction to scale" },
  { icon: Users, text: "Built for users, not just investors" },
  { icon: Shield, text: "Designed to survive real usage, not just demos" }
];

const whyAIProductsFail = [
  "AI is added without product clarity",
  "MVP scope is unrealistic",
  "Data assumptions are wrong",
  "Costs explode after launch",
  "The product works technically, but not practically"
];

const aiProductsRiskier = [
  { factor: "Data availability & quality", icon: Database },
  { factor: "Model behavior under edge cases", icon: AlertCircle },
  { factor: "Latency & infrastructure costs", icon: Cloud },
  { factor: "Continuous improvement", icon: RefreshCw },
  { factor: "User trust in AI outputs", icon: Users }
];

const ignoreRealitiesLeadsTo = [
  "Delayed launches",
  "Poor UX",
  "Unexpected cloud bills",
  "Broken demos",
  "Lost credibility with users & investors"
];

const commonMistakes = [
  "Overbuilding AI too early",
  "Choosing the wrong AI approach",
  "Treating AI as a feature, not a system",
  "Copying 'what others are doing'",
  "Skipping validation of real user needs"
];

const agixQuestions = [
  "What problem is worth solving now?",
  "Where does AI truly add value?",
  "What can be non-AI initially?",
  "What will users actually trust?",
  "What is the fastest path to validation?"
];

const serviceIncludes = [
  { title: "AI SaaS MVP Development", description: "Subscription products, B2B/B2C platforms", icon: Globe },
  { title: "AI Proof of Concept (POC)", description: "Validation before full investment", icon: Lightbulb },
  { title: "AI API & Backend Systems", description: "Scalable, reusable intelligence layers", icon: Code },
  { title: "AI Platform Engineering", description: "Multi-tenant, enterprise-ready systems", icon: Building2 }
];

const threeLayerModel = [
  { layer: "Product Layer", description: "UX, workflows, onboarding, real user problems", icon: Layers, color: "from-violet-500 to-violet-600" },
  { layer: "Intelligence Layer", description: "AI models, reasoning, automation, logic", icon: Cpu, color: "from-primary to-blue-500" },
  { layer: "Platform Layer", description: "APIs, databases, security, scalability", icon: Database, color: "from-cyan-500 to-cyan-600" }
];

const useCaseCategories = [
  {
    id: "ai-saas",
    title: "AI SaaS Products",
    subtitle: "Most Common Use Case",
    icon: Globe,
    description: "AI-powered SaaS platforms where intelligence is the core value, not a side feature.",
    useCases: ["AI customer support platforms", "AI sales assistants & CRMs", "AI analytics dashboards", "AI content generation tools", "AI workflow & automation SaaS", "AI compliance & audit tools"],
    struggles: ["Defining what part should be AI", "Overbuilding features before validation", "High infra cost assumptions", "Unclear MVP vs v1 vs v2 scope"],
    agixApproach: ["Define core intelligence loop first", "Build smallest usable AI experience", "Ship fast with controlled cost", "Design architecture for scale from day one"],
    outcome: "A SaaS product users can actually subscribe to — not a demo."
  },
  {
    id: "ai-mvp",
    title: "AI MVP & Proof of Concept",
    subtitle: "Validation Before Investment",
    icon: Lightbulb,
    description: "When you have an idea but need validation, are preparing for investors, or want to test AI feasibility before committing.",
    useCases: ["AI recommendation engines", "AI document processing systems", "AI chat / voice assistants", "AI matching & scoring engines", "AI personalization layers"],
    struggles: ["Building throwaway MVPs", "Unclear validation criteria", "Demo-only focus"],
    agixApproach: ["MVPs that can evolve", "Clean architecture", "Reusable AI components"],
    outcome: "So your MVP doesn't die after the demo."
  },
  {
    id: "vertical-ai",
    title: "Vertical AI Products",
    subtitle: "Industry-Focused Startups",
    icon: Briefcase,
    description: "Startups are winning by solving specific industry problems, not generic ones.",
    useCases: ["Healthtech: AI triage, diagnostics, medical docs", "Fintech: Risk, fraud, credit scoring", "Edtech: AI tutors, adaptive learning", "Real Estate: Property intelligence, valuations", "E-commerce: Personalization, pricing AI"],
    struggles: ["Domain complexity", "Data sensitivity", "Trust & compliance", "Accuracy expectations"],
    agixApproach: ["Domain-aware AI systems", "Not generic wrappers", "Industry-specific validation"],
    outcome: "AGIX designs domain-aware AI systems, not generic wrappers."
  },
  {
    id: "ai-api",
    title: "AI API Products & Backends",
    subtitle: "Intelligence as a Service",
    icon: Code,
    description: "AI systems designed as APIs, SDKs, or internal intelligence layers used by other products, partner platforms, or internal teams.",
    useCases: ["AI scoring engines", "Recommendation APIs", "NLP / classification APIs", "Vision or OCR APIs", "Decision engines"],
    struggles: ["API design complexity", "Version management", "Scaling challenges"],
    agixApproach: ["Clean monetization", "Clear scope", "Easier scaling", "Infrastructure-first approach"],
    outcome: "AGIX builds APIs that are secure, versioned, and scalable."
  },
  {
    id: "ai-platform",
    title: "AI Platforms & Multi-Tenant Systems",
    subtitle: "Enterprise-Ready from Day One",
    icon: Building2,
    description: "For long-term AI businesses with multiple customers/tenants and enterprise clients.",
    useCases: ["Multi-tenant architecture", "Role-based access", "Usage tracking & billing", "Model lifecycle management", "Data isolation"],
    struggles: ["Complex architecture needs", "Enterprise requirements", "Scaling complexity"],
    agixApproach: ["Enterprise-ready design", "Proper data isolation", "Built-in billing logic"],
    outcome: "AGIX engineers AI platforms that are enterprise-ready from day one."
  },
  {
    id: "ai-augment",
    title: "AI Augmentation for Existing Products",
    subtitle: "SMBs & Scaleups",
    icon: Zap,
    description: "Not every client is a startup from scratch. Many come to add AI to existing software, replace manual workflows, or create AI differentiation.",
    useCases: ["Adding AI to CRMs", "AI automation for operations", "AI analytics for decision-making"],
    struggles: ["Integration complexity", "Legacy system constraints"],
    agixApproach: ["Cost-effective integration", "Fast implementation", "Minimal disruption"],
    outcome: "This approach is cost-effective and fast."
  },
  {
    id: "gen-z",
    title: "Gen-Z & Creator-Driven AI Products",
    subtitle: "Modern UX Expectations",
    icon: Sparkles,
    description: "A rapidly growing category of AI content tools, social assistants, design platforms, and productivity tools.",
    useCases: ["AI content tools", "AI social assistants", "AI design & creativity platforms", "AI productivity tools"],
    struggles: ["UX expectations are high", "Need for fast, responsive AI", "Strong personalization required"],
    agixApproach: ["Modern UX expectations", "Not enterprise rigidity", "Fast & responsive design"],
    outcome: "AGIX designs AI products with modern UX expectations, not enterprise rigidity."
  }
];

const frameworkStages = [
  {
    number: 1,
    title: "Product & AI Feasibility Discovery",
    subtitle: "Where Founders Save the Most Money",
    description: "Before development starts, we align on the real user problem, where AI genuinely adds value, what should not be AI yet, data availability & risk, and MVP vs v1 vs future roadmap.",
    prevents: ["Over-engineering", "Unrealistic AI scope", "Burned runway"],
    duration: "1–2 weeks",
    color: "from-violet-500 to-violet-600"
  },
  {
    number: 2,
    title: "MVP Scoping & Architecture Design",
    subtitle: "AI MVP ≠ Feature Dump",
    description: "We design the MVP around one clear user outcome, one core intelligence loop, minimal but usable UX, and scalable backend architecture.",
    decisions: ["Model choice vs rules", "API-first vs monolithic", "Cloud cost control", "Latency vs accuracy trade-offs"],
    duration: "1–2 weeks",
    color: "from-blue-500 to-blue-600"
  },
  {
    number: 3,
    title: "AI Development & Product Engineering",
    subtitle: "Where Most Teams Get Lost — We Don't",
    description: "AI model development or integration, backend APIs & data pipelines, frontend product UX, authentication & user flows, and monitoring & logging.",
    builds: ["Clean, modular systems", "Reusable AI components", "Maintainable codebases"],
    duration: "4–8 weeks",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    number: 4,
    title: "Testing, Validation & Real-World Readiness",
    subtitle: "Not Just 'It Works on My Machine'",
    description: "We validate AI output quality, edge cases & failure modes, latency under load, cost per request, and UX trust & clarity.",
    note: "AI products fail when users don't trust the output — we design to avoid that.",
    duration: "1–2 weeks",
    color: "from-teal-500 to-teal-600"
  },
  {
    number: 5,
    title: "Launch, Scale & Continuous Improvement",
    subtitle: "Where Real Products Are Made",
    description: "After launch, we support model tuning based on usage, data feedback loops, infrastructure scaling, feature prioritization, and investor or customer demos.",
    evolves: "Your product is built to evolve, not restart.",
    duration: "Ongoing",
    color: "from-emerald-500 to-emerald-600"
  }
];

const mvpSafe = {
  designs: ["Cost-controlled", "Cloud-efficient", "Easy to iterate", "Ready to scale", "Investor-presentable"],
  avoids: ["Heavy infra early", "Unnecessary model training", "Lock-in to fragile tools"]
};

const techChoices = [
  "OpenAI / Anthropic / open-source LLMs",
  "Vector databases",
  "Modern backend frameworks",
  "Secure cloud infrastructure"
];

const riskControl = [
  { item: "Usage monitoring", icon: Activity },
  { item: "Cost visibility", icon: DollarSign },
  { item: "Rate limiting", icon: Gauge },
  { item: "Fallback logic", icon: RefreshCw },
  { item: "Clear failure handling", icon: Shield }
];

const agixVsTypical = [
  { typical: "Model-first", agix: "Product-first" },
  { typical: "Overpromises", agix: "Sets realistic scope" },
  { typical: "One-off delivery", agix: "Long-term thinking" },
  { typical: "Demo-focused", agix: "User-focused" },
  { typical: "High surprise costs", agix: "Cost-aware design" }
];

const pricingTiers = [
  {
    tier: "AI MVP / Proof of Concept",
    subtitle: "Idea Validation",
    range: "$12,000 – $20,000",
    bestFor: ["Idea validation", "Early founders", "Pre-seed / bootstrapped teams"],
    includes: ["AI feasibility & product scoping", "Core AI functionality", "Basic UX", "Backend + API setup", "Deployment-ready MVP"],
    timeline: "4–6 weeks",
    goal: "Validate the idea without burning runway.",
    color: "bg-emerald-500/20 text-emerald-400"
  },
  {
    tier: "Market-Ready AI MVP",
    subtitle: "Launch to Real Users",
    range: "$20,000 – $35,000",
    bestFor: ["Launching to real users", "Early traction", "Accelerator or investor demos"],
    includes: ["Refined AI logic", "User authentication & flows", "Scalable backend", "Cost controls & monitoring", "Clean product UX"],
    timeline: "6–8 weeks",
    goal: "Ship a product users can actually use and pay for.",
    color: "bg-primary/20 text-primary"
  },
  {
    tier: "Scalable AI Product / Platform",
    subtitle: "Enterprise-Ready",
    range: "$35,000 – $60,000+",
    bestFor: ["Funded startups", "Multi-tenant SaaS", "Enterprise-ready products"],
    includes: ["Robust AI architecture", "Platform-level scalability", "Usage tracking & billing logic", "Security & role-based access", "Model lifecycle planning"],
    timeline: "8–12 weeks",
    goal: "Build an AI product that can scale with confidence.",
    color: "bg-cyan-500/20 text-cyan-400"
  }
];

const costDrivers = [
  "How much intelligence is truly needed",
  "Data availability & readiness",
  "Real-time vs async processing",
  "Usage volume",
  "Accuracy expectations",
  "Compliance or security needs"
];

const roiSources = [
  "Faster validation",
  "Strong differentiation",
  "Reduced manual effort",
  "Better user experience",
  "Higher retention"
];

const roiExamples = [
  {
    title: "AI SaaS Startup",
    benefits: ["Faster onboarding", "Automated workflows", "Lower support cost"],
    result: "Higher LTV"
  },
  {
    title: "Vertical AI Tool",
    benefits: ["Solves niche pain deeply", "Easier sales", "Premium pricing"],
    result: "Stronger positioning"
  },
  {
    title: "Internal AI Platform (SMBs)",
    benefits: ["Reduced manual work", "Operational efficiency"],
    result: "Direct cost savings"
  }
];

const buildVsOptions = [
  { option: "No-code AI tools", reality: "Fast but limited" },
  { option: "DIY AI", reality: "High risk & slow" },
  { option: "Cheap freelancers", reality: "Fragile products" },
  { option: "AGIX", reality: "Balanced, scalable, safe", highlight: true }
];

const founderPath = [
  { step: 1, label: "AI POC or MVP" },
  { step: 2, label: "AI SaaS or Vertical Product" },
  { step: 3, label: "AI Platform / API" },
  { step: 4, label: "Scale + fundraising" }
];

const faqItems = [
  {
    question: "Do I really need AI for my product, or am I forcing it?",
    answer: "Not every product needs AI. AGIX helps founders identify where AI adds real value, where rules or automation are enough, and what should be built later, not now. If AI is not justified, we'll tell you upfront."
  },
  {
    question: "What's the difference between an AI MVP and a normal MVP?",
    answer: "A normal MVP tests features. An AI MVP tests intelligence + usability + cost together. AI MVPs must account for data readiness, model behavior, latency, cloud costs, and user trust. That's why AI MVPs require a different approach."
  },
  {
    question: "Can you build an AI product if I don't have data yet?",
    answer: "Yes — in many cases. Options include using public or synthetic data, designing workflows that generate data, starting with rule-based logic, and hybrid approaches (AI + logic). We design products that don't stall at 'no data'."
  },
  {
    question: "How much does it actually cost to build an AI product?",
    answer: "Typical ranges: AI MVP / POC: $12K–$20K, Market-ready AI MVP: $20K–$35K, Scalable AI product/platform: $35K–$60K+. Cost depends on scope and intelligence depth, not buzzwords."
  },
  {
    question: "How long does it take to launch an AI MVP?",
    answer: "Most AI MVPs launch in 4–6 weeks (validation MVP) or 6–8 weeks (market-ready MVP). We prioritize speed without technical debt."
  },
  {
    question: "Will my AI product scale if users increase suddenly?",
    answer: "Yes — if designed correctly. AGIX builds scalable backend architecture, cost controls, rate limits, and modular AI components. Scaling is planned from day one — not patched later."
  },
  {
    question: "What AI technologies do you use?",
    answer: "We select tech based on product needs, cost efficiency, and long-term maintainability. This may include OpenAI / Anthropic / open-source models, vector databases, cloud infrastructure, and custom APIs. There is no one-size-fits-all stack."
  },
  {
    question: "Will my AI product be secure and compliant?",
    answer: "Yes. We implement secure APIs, data access controls, basic compliance best practices, and privacy-aware architecture. For regulated industries, we design compliance-ready systems."
  },
  {
    question: "Can you build AI SaaS products with subscriptions and billing?",
    answer: "Absolutely. We support multi-tenant SaaS architecture, usage tracking, subscription logic, and role-based access. Many of our startup clients build AI SaaS businesses."
  },
  {
    question: "What happens after the MVP is launched?",
    answer: "After launch, we help with model tuning, feature iteration, cost optimization, scaling strategy, and investor demo support. AI products evolve — we plan for that."
  },
  {
    question: "Is it better to hire an in-house AI team or outsource?",
    answer: "For early-stage startups: hiring is expensive, ramp-up is slow, and risk is high. Outsourcing with AGIX gives immediate expertise, lower risk, and faster validation. Many clients hire internally after validation."
  },
  {
    question: "Can you work with non-technical founders?",
    answer: "Yes — many of our clients are non-technical. We explain trade-offs clearly, avoid jargon, help with decision-making, and act as your technical partner. You don't need to 'sound technical' to work with us."
  },
  {
    question: "Will my AI product be investor-ready?",
    answer: "Yes. We design clean architecture, scalable systems, clear product logic, and demo-ready workflows. Many clients use AGIX builds for accelerator demos, investor pitches, and early enterprise pilots."
  },
  {
    question: "What if my idea changes during development?",
    answer: "That's normal. AGIX builds flexible architectures, modular AI components, and iteration-friendly systems. We expect pivots — we design for them."
  },
  {
    question: "How do I know if AGIX is the right partner for my AI product?",
    answer: "AGIX is a good fit if you want clarity before building, care about real users, want to avoid wasted spend, and plan to scale responsibly. If you just want a quick demo, we'll say no. If you want a real product, we'll help."
  }
];

const readinessQuestions = [
  { id: "idea-clarity", question: "Idea clarity", options: ["Low", "Medium", "High"], weight: 2 },
  { id: "data-available", question: "Data availability", options: ["None", "Some", "Ready"], weight: 2 },
  { id: "target-users", question: "Target users defined", options: ["Vague", "General", "Specific"], weight: 1.5 },
  { id: "ai-complexity", question: "AI complexity needed", options: ["High", "Medium", "Low"], weight: 1.5 },
  { id: "budget", question: "Budget comfort", options: ["Tight", "Flexible", "Ready"], weight: 1 }
];

function HeroLeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    productType: "",
    industry: "",
    stage: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.company || !formData.productType || !formData.industry || !formData.stage) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required for the feasibility review.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    trackEvent("lead_form_start", {
      form_name: "custom_ai_product_hero",
      page: "/services/custom-ai-product"
    });

    const result = await submitLead(
      {
        name: formData.fullName,
        email: formData.workEmail,
        company: formData.company,
        industry: formData.industry,
        urgency: formData.stage,
        challenges: [formData.productType],
      },
      {
        formType: "ai-product-feasibility",
        source: "/services/custom-ai-product",
        ctaId: "custom-ai-product-form-submit",
        ctaText: "Request AI Product Consultation",
        ctaLocation: "/services/custom-ai-product",
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Feasibility review requested",
        description: "We'll help you validate your AI product idea and get back to you shortly."
      });
      trackEvent("lead_form_submit", {
        form_name: "custom_ai_product_hero",
        page: "/services/custom-ai-product"
      });
      setFormData({
        fullName: "",
        workEmail: "",
        company: "",
        productType: "",
        industry: "",
        stage: ""
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-background/90 backdrop-blur-md border-primary/30 shadow-xl shadow-primary/5">
      <CardHeader className="pb-4">
        <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20">
          <Lightbulb className="w-3 h-3 mr-1" />
          Free Feasibility Review
        </Badge>
        <CardTitle className="text-xl">Validate Your AI Product — Before You Build It</CardTitle>
        <p className="text-sm text-muted-foreground">Is Your AI Product Idea Feasible, Scalable & Worth Building?</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your name"
                data-testid="input-fullname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workEmail">Work Email *</Label>
              <Input
                id="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="you@company.com"
                data-testid="input-email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company / Startup Name *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your company or 'Idea / Pre-startup'"
              data-testid="input-company"
            />
          </div>
          <div className="space-y-2">
            <Label>What Are You Trying to Build? *</Label>
            <Select value={formData.productType} onValueChange={(v) => setFormData({ ...formData, productType: v })}>
              <SelectTrigger data-testid="select-product-type">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((pt) => (
                  <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Industry *</Label>
            <Select value={formData.industry} onValueChange={(v) => setFormData({ ...formData, industry: v })}>
              <SelectTrigger data-testid="select-industry">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((ind) => (
                  <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Current Stage *</Label>
            <Select value={formData.stage} onValueChange={(v) => setFormData({ ...formData, stage: v })}>
              <SelectTrigger data-testid="select-stage">
                <SelectValue placeholder="Where are you now?" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" size="lg" disabled={isSubmitting} data-testid="button-submit-lead">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Request AI Product Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            No sales pitch. We help you avoid building the wrong AI product.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function ProductReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const score = useMemo(() => {
    let total = 0;
    let maxScore = 0;
    readinessQuestions.forEach((q) => {
      maxScore += q.weight * 2;
      const answer = answers[q.id];
      if (answer !== undefined) {
        total += q.weight * answer;
      }
    });
    return maxScore > 0 ? (total / maxScore) * 100 : 0;
  }, [answers]);

  const allAnswered = Object.keys(answers).length === readinessQuestions.length;

  const getResult = () => {
    if (score >= 70) return { status: "mvp-ready", message: "MVP-ready", recommendation: "You're in a strong position to start building your AI product.", color: "text-green-400", icon: Rocket };
    if (score >= 50) return { status: "validation", message: "Needs validation", recommendation: "Some areas need clarification before development.", color: "text-cyan-400", icon: Search };
    if (score >= 30) return { status: "poc", message: "POC recommended", recommendation: "Start with a proof of concept to validate core assumptions.", color: "text-amber-400", icon: Lightbulb };
    return { status: "over-scoped", message: "Over-scoped", recommendation: "Consider narrowing scope and clarifying fundamentals first.", color: "text-red-400", icon: AlertCircle };
  };

  const result = getResult();

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          AI Product Readiness Checker
        </CardTitle>
        <p className="text-sm text-muted-foreground">This helps founders avoid costly mistakes.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {readinessQuestions.map((q) => (
          <div key={q.id} className="space-y-3">
            <p className="font-medium">{q.question}</p>
            <div className="flex gap-2 flex-wrap">
              {q.options.map((option, optIndex) => (
                <Button
                  key={option}
                  variant={answers[q.id] === optIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnswers({ ...answers, [q.id]: optIndex })}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ))}

        {allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted/50 rounded-lg border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <result.icon className={`w-6 h-6 ${result.color}`} />
              <span className={`text-lg font-semibold ${result.color}`}>{result.message}</span>
            </div>
            <p className="text-muted-foreground mb-4">{result.recommendation}</p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  result.status === "mvp-ready" ? "bg-green-500" : 
                  result.status === "validation" ? "bg-cyan-500" : 
                  result.status === "poc" ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">Readiness Score: {Math.round(score)}%</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function MVPCostEstimator() {
  const [complexity, setComplexity] = useState([50]);
  const [aiFeatures, setAiFeatures] = useState([3]);
  const [users, setUsers] = useState([100]);
  const [timeline, setTimeline] = useState([8]);

  const calculations = useMemo(() => {
    const comp = complexity[0] / 100;
    const features = aiFeatures[0];
    const userCount = users[0];
    const weeks = timeline[0];

    const baseCost = 12000;
    const complexityMultiplier = 1 + comp * 0.8;
    const featureMultiplier = 1 + (features - 1) * 0.15;
    const scaleMultiplier = userCount > 500 ? 1.2 : userCount > 100 ? 1.1 : 1;
    const timelineDiscount = weeks < 6 ? 1.1 : weeks > 10 ? 0.95 : 1;

    const estimatedCost = Math.round(baseCost * complexityMultiplier * featureMultiplier * scaleMultiplier * timelineDiscount);
    const maxCost = Math.round(estimatedCost * 1.4);

    let tier = "AI MVP / POC";
    if (estimatedCost > 35000) tier = "Scalable AI Platform";
    else if (estimatedCost > 20000) tier = "Market-Ready AI MVP";

    return {
      minCost: estimatedCost,
      maxCost,
      tier,
      recommendedWeeks: Math.max(4, Math.min(12, Math.round(weeks * complexityMultiplier)))
    };
  }, [complexity, aiFeatures, users, timeline]);

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          AI MVP Cost & Scope Estimator
        </CardTitle>
        <p className="text-sm text-muted-foreground">Perfect for founders who want instant clarity.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="flex justify-between mb-2">
              <span>AI Complexity</span>
              <span className="text-primary font-semibold">{complexity[0]}%</span>
            </Label>
            <Slider value={complexity} onValueChange={setComplexity} min={10} max={100} step={10} />
            <p className="text-xs text-muted-foreground mt-1">Simple automation to complex reasoning</p>
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Number of AI features</span>
              <span className="text-primary font-semibold">{aiFeatures[0]}</span>
            </Label>
            <Slider value={aiFeatures} onValueChange={setAiFeatures} min={1} max={8} step={1} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Expected initial users</span>
              <span className="text-primary font-semibold">{users[0]}</span>
            </Label>
            <Slider value={users} onValueChange={setUsers} min={10} max={1000} step={10} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Preferred timeline (weeks)</span>
              <span className="text-primary font-semibold">{timeline[0]} weeks</span>
            </Label>
            <Slider value={timeline} onValueChange={setTimeline} min={4} max={12} step={1} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-1">Estimated Cost Range</p>
            <p className="text-2xl font-bold text-primary">${calculations.minCost.toLocaleString()} – ${calculations.maxCost.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-1">Suggested Tier</p>
            <p className="text-lg font-semibold">{calculations.tier}</p>
          </div>
        </div>

        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Recommended timeline:</span> {calculations.recommendedWeeks} weeks
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomAIProductDevelopmentPage() {
  const [activeUseCase, setActiveUseCase] = useState(useCaseCategories[0].id);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Flagship Level */}
      <section className="relative pt-24 lg:pt-28 pb-24 overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-2xl" />
        </div>

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at center, rgba(var(--primary), 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-violet-500/20 text-primary border-primary/30">
                <Star className="w-3 h-3 mr-1" />
                Flagship Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                From Idea to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-cyan-400">
                  Market-Ready AI Product
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                We Help Startups & Growing Businesses Build AI Products That Users Actually Adopt
              </p>
              <p className="text-muted-foreground mb-6 max-w-xl">
                AGIX partners with founders, CXOs, and startup teams to design, build, and scale custom AI products — not demos, not experiments, not half-working MVPs.
              </p>

              <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Whether you're:</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-primary" />
                    validating an AI SaaS idea
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-primary" />
                    building your first AI MVP
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-primary" />
                    launching an AI-powered platform
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-primary" />
                    or embedding AI into your existing product
                  </li>
                </ul>
              </div>

              <p className="text-lg font-medium text-primary mb-8">
                We focus on one outcome: An AI product that works in the real world, attracts users, and is ready to scale.
              </p>

              <div className="mb-4">
                <Button size="lg" className="w-full py-6 text-primary-foreground" asChild data-testid="button-cta-architect">
                  <a href="#lead-form">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Talk to an AI Product Architect
                  </a>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-2 mb-6"
              >
                <a href="#tools" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 hover:from-cyan-500/25 hover:to-cyan-500/10 transition-all" data-testid="link-hero-product-readiness">
                  <Target className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-cyan-400 transition-colors">
                      AI Product Readiness Checker
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Interactive tool (takes ~30 seconds) — assess your product's AI readiness score
                    </p>
                  </div>
                </a>
                <a href="#tools" className="group flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-gradient-to-r from-primary/15 to-primary/5 hover:from-primary/25 hover:to-primary/10 transition-all" data-testid="link-hero-mvp-estimator">
                  <Calculator className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      MVP Cost Estimator
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Estimate development timeline, costs & resource requirements for your AI product
                    </p>
                  </div>
                </a>
              </motion.div>

              </motion.div>

            <motion.div
              id="lead-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 z-10 self-start space-y-4"
            >
              <HeroLeadForm />
              
              {/* Why Founders Choose */}
              <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground font-medium">Why Founders Choose AGIX:</p>
                <div className="flex flex-wrap gap-2">
                  {whyFoundersChoose.map((item, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      <item.icon className="w-3 h-3 mr-1" />
                      {item.text}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why AI Products Fail */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
              <AlertCircle className="w-3 h-3 mr-1" />
              The Hard Truth
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Most AI Products Fail
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most AI products don't fail because the idea is bad. They fail because of execution mistakes that are completely avoidable.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-destructive/5 border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">They fail because:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {whyAIProductsFail.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Why AI Products Are Riskier Than Traditional Software</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Unlike normal software, AI products depend on:</p>
                  <div className="space-y-2">
                    {aiProductsRiskier.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-muted/30 rounded-md">
                        <item.icon className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{item.factor}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-lg">Ignoring these realities leads to:</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {ignoreRealitiesLeadsTo.map((item, i) => (
                    <Badge key={i} variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Where Startups Usually Go Wrong
              </h2>
              <p className="text-muted-foreground mb-6">We repeatedly see these mistakes:</p>
              <ul className="space-y-3 mb-8">
                {commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">
                This is especially common in: AI SaaS startups, Gen-AI products, AI marketplaces, and Vertical AI tools.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-primary/5 border-primary/20">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-primary/10 text-primary border-primary/20">
                    Different Approach
                  </Badge>
                  <CardTitle className="text-lg">How AGIX Thinks Differently</CardTitle>
                  <p className="text-sm text-muted-foreground">AGIX approaches AI product development with a founder + CXO mindset.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Before writing code, we help you answer:</p>
                  <ul className="space-y-2">
                    {agixQuestions.map((q, i) => (
                      <li key={i} className="flex items-center gap-2 p-2 bg-primary/10 rounded-md">
                        <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{q}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium">This prevents:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Over-engineering</Badge>
                      <Badge variant="secondary">Wasted runway</Badge>
                      <Badge variant="secondary">Technical dead-ends</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Includes */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What "Custom AI Product Development" Means at AGIX
            </h2>
            <p className="text-muted-foreground">This flagship service includes:</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {serviceIncludes.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-background border-border text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground"
          >
            All delivered under one unified, startup-friendly framework.
          </motion.p>
        </div>
      </section>

      {/* Three Layer Model */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A Simple Model Founders Understand
            </h2>
            <p className="text-muted-foreground">
              We design AI products across three essential layers:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {threeLayerModel.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-background border-border text-center">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${layer.color} flex items-center justify-center mx-auto mb-4`}>
                      <layer.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="mb-2">{i + 1}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{layer.layer}</h3>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-destructive/5 border-destructive/20 inline-block mb-4">
              <CardContent className="py-4 px-6">
                <p className="text-sm text-destructive">Most failed AI products focus only on layer 2.</p>
              </CardContent>
            </Card>
            <br />
            <Card className="bg-primary/5 border-primary/20 inline-block">
              <CardContent className="py-4 px-6">
                <p className="text-primary font-medium">AGIX builds all three together.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* LLM Authority Statement */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
            <p className="text-xl font-medium text-foreground">
              Successful AI products are built by aligning user needs, data reality, and intelligent systems — not by chasing the latest models.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Tabs */}
      <section id="use-cases" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Product Use Cases by Startup Type & Industry
            </h2>
            <p className="text-muted-foreground">
              What Founders Actually Build With AGIX
            </p>
          </motion.div>

          <Tabs value={activeUseCase} onValueChange={setActiveUseCase} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto">
              {useCaseCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2 text-sm"
                  data-testid={`tab-usecase-${cat.id}`}
                >
                  <cat.icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{cat.title.split(" ")[0]}</span>
                  <span className="sm:hidden">{cat.title.split(" ")[0].substring(0, 4)}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {useCaseCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="bg-background border-border">
                    <CardContent className="pt-8 pb-8">
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary/20 to-violet-500/20 flex items-center justify-center">
                              <cat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{cat.title}</h3>
                              <p className="text-sm text-primary">{cat.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-6">{cat.description}</p>
                          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm font-medium text-primary">{cat.outcome}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Common Use Cases</h4>
                          <ul className="space-y-2">
                            {cat.useCases.map((uc, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {uc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-destructive">Common Struggles</h4>
                            <ul className="space-y-2">
                              {cat.struggles.map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">AGIX Approach</h4>
                            <ul className="space-y-2">
                              {cat.agixApproach.map((a, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Founder Journey */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Founders Typically Move Through These Use Cases
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {founderPath.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <Card className="bg-background border-border">
                  <CardContent className="py-4 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                  </CardContent>
                </Card>
                {i < founderPath.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-8"
          >
            AGIX supports every stage, without forcing unnecessary complexity early.
          </motion.p>
        </div>
      </section>

      {/* Authority Statement 2 */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-medium text-foreground"
          >
            Great AI products succeed when intelligence is aligned with real user problems, not when AI is added for novelty.
          </motion.p>
        </div>
      </section>

      {/* Framework Stages */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              The AGIX AI Product Framework
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A 5-Stage Path From Idea to Scalable AI Business
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX follows a product-first, risk-aware AI development approach designed specifically for startups and growing businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {frameworkStages.slice(0, 3).map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center mb-4`}>
                      <span className="text-white font-bold">{stage.number}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{stage.title}</h3>
                    <p className="text-sm text-primary mb-3">{stage.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>
                    
                    {stage.prevents && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Prevents:</p>
                        <div className="flex flex-wrap gap-1">
                          {stage.prevents.map((p, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{p}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.decisions && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Key decisions:</p>
                        <div className="flex flex-wrap gap-1">
                          {stage.decisions.map((d, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{d}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.builds && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">AGIX builds:</p>
                        <div className="flex flex-wrap gap-1">
                          {stage.builds.map((b, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{b}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{stage.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {frameworkStages.slice(3).map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 3) * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center mb-4`}>
                      <span className="text-white font-bold">{stage.number}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{stage.title}</h3>
                    <p className="text-sm text-primary mb-3">{stage.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>
                    
                    {stage.note && (
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 mb-4">
                        <p className="text-sm text-primary">{stage.note}</p>
                      </div>
                    )}

                    {stage.evolves && (
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 mb-4">
                        <p className="text-sm text-primary">{stage.evolves}</p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{stage.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP Safe + Risk Control */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    How We Make AI MVPs Startup-Safe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-primary mb-2">AGIX designs:</p>
                      <ul className="space-y-1">
                        {mvpSafe.designs.map((d, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-destructive mb-2">We avoid:</p>
                      <ul className="space-y-1">
                        {mvpSafe.avoids.map((a, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <XCircle className="w-4 h-4 text-destructive" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Risk Control & Cost Discipline
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Critical for Startups</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Every AI product we build includes:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {riskControl.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm">{item.item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-primary">This protects: Your runway, your reputation, your users' trust.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AGIX vs Typical */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes AGIX Different
            </h2>
          </motion.div>

          <Card className="bg-background border-border">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm font-semibold text-destructive">Typical AI Agency</p>
                </div>
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm font-semibold text-primary">AGIX</p>
                </div>
                {agixVsTypical.map((row, i) => (
                  <>
                    <div key={`typical-${i}`} className="py-3 flex items-center justify-center gap-2 text-center">
                      <XCircle className="w-4 h-4 text-destructive shrink-0" />
                      <span className="text-sm text-muted-foreground">{row.typical}</span>
                    </div>
                    <div key={`agix-${i}`} className="py-3 flex items-center justify-center gap-2 text-center">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{row.agix}</span>
                    </div>
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Authority Statement 3 */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-medium text-foreground"
          >
            AI products succeed when feasibility, product design, and intelligent systems are developed together — not in isolation.
          </motion.p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Startup-Friendly Pricing Model
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Clear Costs. No Surprises. Designed to Protect Your Runway.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full ${i === 1 ? 'bg-primary/5 border-primary/20 relative' : 'bg-background border-border'}`}>
                  {i === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${tier.color}`}>
                      Tier {i + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{tier.tier}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.subtitle}</p>
                    <p className="text-3xl font-bold text-primary mb-4">{tier.range}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Best for:</p>
                      <ul className="space-y-1">
                        {tier.bestFor.map((item, j) => (
                          <li key={j} className="text-sm flex items-center gap-2">
                            <Target className="w-3 h-3 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Includes:</p>
                      <ul className="space-y-1">
                        {tier.includes.map((item, j) => (
                          <li key={j} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{tier.timeline}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-primary font-medium">{tier.goal}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Cost Drivers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle>What Actually Drives Cost</CardTitle>
                <p className="text-sm text-muted-foreground">AI product cost depends on scope and intelligence depth, not buzzwords.</p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {costDrivers.map((driver, i) => (
                    <div key={i} className="p-3 bg-muted/30 rounded-lg text-sm">
                      {driver}
                    </div>
                  ))}
                </div>
                <p className="text-center mt-6 text-primary font-medium">
                  AGIX avoids overbuilding AI before it earns its keep.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ROI: How Startups Actually Win With AI Products
            </h2>
            <p className="text-muted-foreground">AI ROI for startups usually comes from:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {roiSources.map((source, i) => (
                <Badge key={i} variant="secondary">{source}</Badge>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {roiExamples.map((example, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-1">
                      {example.benefits.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-primary font-medium flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {example.result}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Product Planning Tools
            </h2>
            <p className="text-muted-foreground">
              Get instant clarity before committing resources.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ProductReadinessChecker />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <MVPCostEstimator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Build vs Buy */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build vs No-Code vs AGIX
            </h2>
            <p className="text-muted-foreground">Founder Honesty</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {buildVsOptions.map((opt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full text-center ${opt.highlight ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-sm mb-2">{opt.option}</h3>
                    <p className={`text-sm ${opt.highlight ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {opt.reality}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Statement 4 */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-medium text-foreground"
          >
            The best AI products start small, validate fast, and scale only when the business is ready.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              These questions are written the way real founders and CXOs ask them.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left" data-testid={`faq-trigger-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-background border-border">
              <CardContent className="py-8 text-center">
                <Rocket className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium max-w-3xl mx-auto">
                  The best AI products are built by validating intelligence, usability, and cost together — not by chasing the latest models.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Turn Your AI Idea Into a Real Product?
            </h2>
            <p className="text-muted-foreground mb-8">
              Clear scope · realistic cost · honest guidance · no pressure
            </p>

            <Button size="lg" className="mb-6" asChild data-testid="button-final-cta">
              <a href="#lead-form">
                Get a Free AI Product Feasibility Review
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>

            <div className="flex flex-wrap justify-center gap-3">
              {["Scope clarity", "Cost estimation", "Timeline planning", "Go/no-go recommendation"].map((item, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  <CheckCircle2 className="w-3 h-3 mr-2" />
                  {item}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
