'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";
import { trackEvent } from "@/lib/analytics";
import { IndustryCaseStudies, IndustryServices } from "@/components/industry-sections";
import FAQSection from "@/components/shared/FAQSection";
import FAQPageSchema from "@/components/shared/FAQPageSchema";
import { documentFAQs } from "@/lib/seo/faq-data";
import {
  Landmark,
  Users,
  CreditCard,
  Brain,
  MessageSquare,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  Zap,
  Bot,
  Search,
  Calculator,
  Building2,
  Shield,
  FileText,
  BarChart3,
  HelpCircle,
  Layers,
  Settings,
  Database,
  LineChart,
  Globe,
  AlertCircle,
  XCircle,
  RefreshCw,
  Star,
  Banknote,
  PiggyBank,
  Wallet,
  Receipt,
  Scale,
  UserCheck,
  Phone,
  HeadphonesIcon,
  Eye,
  Activity,
  ChevronRight,
  Loader2,
  Sparkles,
} from "lucide-react";

const industryStats = [
  { icon: Clock, value: "67%", label: "Expect instant loan decisions" },
  { icon: Shield, value: "$42B", label: "Annual fraud losses globally" },
  { icon: MessageSquare, value: "78%", label: "Want 24/7 digital support" },
  { icon: Users, value: "45%", label: "Abandon slow onboarding" },
];

const caseStudies = [
  { company: "Enova", description: "AI-powered credit decisioning platform enabling smarter, more inclusive lending across underserved borrower segments.", impact: ["80% faster credit decisioning", "Reduced default rates", "Expanded credit access"], href: "/case-studies/enova/" },
  { company: "Dave", description: "Generative AI financial assistant providing smart, human-like support for personal finance management.", impact: ["Personalized financial guidance at scale", "Higher user engagement", "Reduced support costs"], href: "/case-studies/dave/" },
  { company: "Ocrolus", description: "AI document intelligence engine automating financial document review and data extraction for fintech workflows.", impact: ["90%+ document processing accuracy", "Faster loan origination", "Reduced manual review hours"], href: "/case-studies/ocrolus/" },
];

const industryServices = [
  { title: "AI Automation", description: "End-to-end automation of financial workflows including document processing, compliance checks, and reporting.", useCases: ["Loan origination automation", "KYC/AML workflows", "Regulatory reporting"], href: "/services/ai-automation/", ctaText: "Explore AI Automation" },
  { title: "Predictive & Analytics AI", description: "AI models that assess credit risk, detect fraud, and forecast financial outcomes with high accuracy.", useCases: ["Credit risk scoring", "Fraud detection", "Revenue forecasting"], href: "/services/ai-predictive-analytics/", ctaText: "Explore Predictive AI" },
  { title: "Agentic AI Systems", description: "Autonomous AI agents that monitor markets, execute workflows, and escalate exceptions without human involvement.", useCases: ["Trade monitoring", "Compliance monitoring", "Customer lifecycle automation"], href: "/services/agentic-ai-systems/", ctaText: "Explore Agentic AI" },
  { title: "RAG & Knowledge AI", description: "AI retrieval systems that surface relevant financial regulations, policies, and client data on demand.", useCases: ["Regulatory guidance", "Policy retrieval", "Client document Q&A"], href: "/services/rag-knowledge-ai/", ctaText: "Explore Knowledge AI" },
];

const lenderTypes = [
  { id: "fintech-startup", label: "FinTech Startup", icon: Zap },
  { id: "digital-lender", label: "Digital Lender", icon: Landmark },
  { id: "nbfc", label: "NBFC / Micro-lender", icon: Building2 },
  { id: "bank", label: "Bank / Credit Union", icon: Banknote },
  { id: "bnpl", label: "BNPL / Embedded Finance", icon: CreditCard },
  { id: "enterprise", label: "Enterprise Finance", icon: Layers },
];

const challengesSelect = [
  { id: "underwriting", label: "Underwriting Speed" },
  { id: "risk", label: "Default Risk / NPAs" },
  { id: "fraud", label: "Fraud Detection" },
  { id: "compliance", label: "Compliance & Audit" },
  { id: "kyc", label: "KYC & Onboarding" },
  { id: "collections", label: "Collections" },
  { id: "support", label: "Customer Support" },
  { id: "intelligence", label: "Portfolio Intelligence" },
];

