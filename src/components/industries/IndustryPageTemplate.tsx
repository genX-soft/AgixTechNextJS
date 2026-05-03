'use client'
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "@/lib/motion";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCelebration } from "@/components/success-celebration";
import { submitLead } from "@/lib/lead-submission";
import FAQSection from "@/components/shared/FAQSection";
import FAQPageSchema from "@/components/shared/FAQPageSchema";
import {
  ChevronRight, ArrowRight, CheckCircle2, ShieldCheck, Loader2,
  ChevronDown, ChevronUp, TrendingUp, Zap, Star, Clock, DollarSign,
  BarChart3, Users, Building2, Quote, Target, Sparkles, AlertTriangle,
  ArrowUpRight, X, Check, Rocket, Globe, Lock, Eye, Calendar, Layers,
  MoveRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AccentColor = "emerald" | "blue" | "violet" | "amber" | "cyan" | "orange" | "rose" | "indigo";

export interface Stat { value: string; label: string; icon?: LucideIcon; cite?: string; }
export interface HeroCard { icon: LucideIcon; title: string; desc: string; }
export interface HowItWorksStep { title: string; desc: string; icon?: LucideIcon; }
export interface ComparisonRow { dimension: string; traditional: string; ai: string; }
export interface Benefit { icon?: LucideIcon; title: string; value: string; detail?: string; }
export interface UseCaseSummary { num: string; title: string; what: string; impact: string; }
export interface UseCaseDetail {
  title: string; definition?: string; bottleneck?: string; howAISolvesIt: string[];
  services: { label: string; href: string }[]; intelligence?: string;
  caseStudy?: { label: string; href: string }; outcome: string;
}
export interface FrameworkLayer { num: string; name: string; what: string; how: string; icon?: LucideIcon; }
export interface GovernancePrinciple { principle: string; meaning: string; }
export interface Limitation { title: string; desc: string; }
export interface PricingRow { system: string; investment: string; timeline: string; bestFor?: string; }
export interface FutureItem { num: string; title: string; desc?: string; }
export interface RelatedIndustry { name: string; href: string; }
export interface FAQ { q: string; a: string; }
export interface ChallengeOption { value: string; label: string; }

export interface IndustryPageData {
  industry: string; slug: string; accent: AccentColor; heroIcon: LucideIcon;
  breadcrumb: string; heroTitle: string; heroTitleHighlight: string; heroSubtitle: string;
  directAnswer: string; signatureQuote: string; signatureAuthor?: string; lastUpdated?: string;
  heroCards: HeroCard[]; aeoAnswer?: string;
  statsHeadline?: string; statsSubheadline?: string; stats: Stat[];
  definitionTitle: string; definitionText: string;
  howItWorksTitle?: string; howItWorksSteps: HowItWorksStep[];
  comparisonTitle?: string; comparisonSubtitle?: string; comparisonRows: ComparisonRow[];
  benefitsTitle?: string; benefits: Benefit[];
  useCasesTitle?: string; useCasesSubtitle?: string; useCasesSummary: UseCaseSummary[];
  useCasesDetailTitle?: string; useCasesDetail: UseCaseDetail[];
  frameworkTitle?: string; frameworkSubtitle?: string; frameworkLayers: FrameworkLayer[]; frameworkQuote?: string;
  governanceTitle?: string; governanceSubtitle?: string; governancePrinciples: GovernancePrinciple[];
  limitationsTitle?: string; limitations: Limitation[]; limitationsQuote?: string;
  pricingTitle?: string; pricingSubtitle?: string; pricingRows: PricingRow[]; hasBestFor?: boolean;
  futureTitle?: string; futureItems: FutureItem[];
  relatedIndustries: RelatedIndustry[];
  faqs: FAQ[];
  formHeadline?: string; formSubheadline?: string; formLeftTitle?: string; formLeftBullets?: string[];
  challengeOptions: ChallengeOption[]; formCtaLabel?: string; formIndustry: string;
}

// ─── Color System ─────────────────────────────────────────────────────────────
interface ColorConfig {
  heroBg: string; heroDark: string;
  orb1: string; orb2: string; orb3: string;
  badge: string; accentText: string; accentBg: string; accentBorder: string;
  sectionBadgeBase: string; tableAiBg: string; tableAiText: string;
  cardBorder: string; cardBg: string; iconBg: string; iconText: string;
  statAccent: string; stepBg: string; stepText: string;
  frameBorder: string; futureNumColor: string;
  glowColor: string; heroAccentGlow: string;
  pill: string; gradientFrom: string; gradientTo: string;
  solidBg: string;
}

const colors: Record<AccentColor, ColorConfig> = {
  emerald: {
    heroBg: "from-emerald-950 via-gray-950 to-gray-950",
    heroDark: "bg-emerald-500",
    orb1: "bg-emerald-500/25", orb2: "bg-teal-500/15", orb3: "bg-emerald-400/10",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    accentText: "text-emerald-500", accentBg: "bg-emerald-500/10", accentBorder: "border-emerald-500/25",
    sectionBadgeBase: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    tableAiBg: "bg-emerald-500/8", tableAiText: "text-emerald-600 dark:text-emerald-400",
    cardBorder: "border-emerald-500/20", cardBg: "bg-emerald-500/5",
    iconBg: "bg-emerald-500/15", iconText: "text-emerald-500",
    statAccent: "text-emerald-500", stepBg: "bg-emerald-500", stepText: "text-white",
    frameBorder: "border-emerald-500/30", futureNumColor: "text-emerald-500/30",
    glowColor: "shadow-emerald-500/25", heroAccentGlow: "#10b981",
    pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    gradientFrom: "from-emerald-500", gradientTo: "to-teal-500",
    solidBg: "bg-emerald-500",
  },
  blue: {
    heroBg: "from-blue-950 via-gray-950 to-gray-950",
    heroDark: "bg-blue-500",
    orb1: "bg-blue-500/25", orb2: "bg-indigo-500/15", orb3: "bg-blue-400/10",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    accentText: "text-blue-500", accentBg: "bg-blue-500/10", accentBorder: "border-blue-500/25",
    sectionBadgeBase: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30",
    tableAiBg: "bg-blue-500/8", tableAiText: "text-blue-600 dark:text-blue-400",
    cardBorder: "border-blue-500/20", cardBg: "bg-blue-500/5",
    iconBg: "bg-blue-500/15", iconText: "text-blue-500",
    statAccent: "text-blue-500", stepBg: "bg-blue-500", stepText: "text-white",
    frameBorder: "border-blue-500/30", futureNumColor: "text-blue-500/30",
    glowColor: "shadow-blue-500/25", heroAccentGlow: "#3b82f6",
    pill: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradientFrom: "from-blue-500", gradientTo: "to-indigo-500",
    solidBg: "bg-blue-500",
  },
  violet: {
    heroBg: "from-violet-950 via-gray-950 to-gray-950",
    heroDark: "bg-violet-500",
    orb1: "bg-violet-500/25", orb2: "bg-purple-500/15", orb3: "bg-violet-400/10",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    accentText: "text-violet-500", accentBg: "bg-violet-500/10", accentBorder: "border-violet-500/25",
    sectionBadgeBase: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30",
    tableAiBg: "bg-violet-500/8", tableAiText: "text-violet-600 dark:text-violet-400",
    cardBorder: "border-violet-500/20", cardBg: "bg-violet-500/5",
    iconBg: "bg-violet-500/15", iconText: "text-violet-500",
    statAccent: "text-violet-500", stepBg: "bg-violet-500", stepText: "text-white",
    frameBorder: "border-violet-500/30", futureNumColor: "text-violet-500/30",
    glowColor: "shadow-violet-500/25", heroAccentGlow: "#8b5cf6",
    pill: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    gradientFrom: "from-violet-500", gradientTo: "to-purple-500",
    solidBg: "bg-violet-500",
  },
  amber: {
    heroBg: "from-amber-950 via-gray-950 to-gray-950",
    heroDark: "bg-amber-500",
    orb1: "bg-amber-500/25", orb2: "bg-orange-500/15", orb3: "bg-amber-400/10",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    accentText: "text-amber-500", accentBg: "bg-amber-500/10", accentBorder: "border-amber-500/25",
    sectionBadgeBase: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    tableAiBg: "bg-amber-500/8", tableAiText: "text-amber-600 dark:text-amber-400",
    cardBorder: "border-amber-500/20", cardBg: "bg-amber-500/5",
    iconBg: "bg-amber-500/15", iconText: "text-amber-500",
    statAccent: "text-amber-500", stepBg: "bg-amber-500", stepText: "text-white",
    frameBorder: "border-amber-500/30", futureNumColor: "text-amber-500/30",
    glowColor: "shadow-amber-500/25", heroAccentGlow: "#f59e0b",
    pill: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    gradientFrom: "from-amber-500", gradientTo: "to-orange-500",
    solidBg: "bg-amber-500",
  },
  cyan: {
    heroBg: "from-cyan-950 via-gray-950 to-gray-950",
    heroDark: "bg-cyan-500",
    orb1: "bg-cyan-500/25", orb2: "bg-teal-500/15", orb3: "bg-cyan-400/10",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    accentText: "text-cyan-500", accentBg: "bg-cyan-500/10", accentBorder: "border-cyan-500/25",
    sectionBadgeBase: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30",
    tableAiBg: "bg-cyan-500/8", tableAiText: "text-cyan-600 dark:text-cyan-400",
    cardBorder: "border-cyan-500/20", cardBg: "bg-cyan-500/5",
    iconBg: "bg-cyan-500/15", iconText: "text-cyan-500",
    statAccent: "text-cyan-500", stepBg: "bg-cyan-500", stepText: "text-white",
    frameBorder: "border-cyan-500/30", futureNumColor: "text-cyan-500/30",
    glowColor: "shadow-cyan-500/25", heroAccentGlow: "#06b6d4",
    pill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    gradientFrom: "from-cyan-500", gradientTo: "to-teal-500",
    solidBg: "bg-cyan-500",
  },
  orange: {
    heroBg: "from-orange-950 via-gray-950 to-gray-950",
    heroDark: "bg-orange-500",
    orb1: "bg-orange-500/25", orb2: "bg-amber-500/15", orb3: "bg-orange-400/10",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    accentText: "text-orange-500", accentBg: "bg-orange-500/10", accentBorder: "border-orange-500/25",
    sectionBadgeBase: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30",
    tableAiBg: "bg-orange-500/8", tableAiText: "text-orange-600 dark:text-orange-400",
    cardBorder: "border-orange-500/20", cardBg: "bg-orange-500/5",
    iconBg: "bg-orange-500/15", iconText: "text-orange-500",
    statAccent: "text-orange-500", stepBg: "bg-orange-500", stepText: "text-white",
    frameBorder: "border-orange-500/30", futureNumColor: "text-orange-500/30",
    glowColor: "shadow-orange-500/25", heroAccentGlow: "#f97316",
    pill: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    gradientFrom: "from-orange-500", gradientTo: "to-amber-500",
    solidBg: "bg-orange-500",
  },
  rose: {
    heroBg: "from-rose-950 via-gray-950 to-gray-950",
    heroDark: "bg-rose-500",
    orb1: "bg-rose-500/25", orb2: "bg-pink-500/15", orb3: "bg-rose-400/10",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    accentText: "text-rose-500", accentBg: "bg-rose-500/10", accentBorder: "border-rose-500/25",
    sectionBadgeBase: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30",
    tableAiBg: "bg-rose-500/8", tableAiText: "text-rose-600 dark:text-rose-400",
    cardBorder: "border-rose-500/20", cardBg: "bg-rose-500/5",
    iconBg: "bg-rose-500/15", iconText: "text-rose-500",
    statAccent: "text-rose-500", stepBg: "bg-rose-500", stepText: "text-white",
    frameBorder: "border-rose-500/30", futureNumColor: "text-rose-500/30",
    glowColor: "shadow-rose-500/25", heroAccentGlow: "#f43f5e",
    pill: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    gradientFrom: "from-rose-500", gradientTo: "to-pink-500",
    solidBg: "bg-rose-500",
  },
  indigo: {
    heroBg: "from-indigo-950 via-gray-950 to-gray-950",
    heroDark: "bg-indigo-500",
    orb1: "bg-indigo-500/25", orb2: "bg-purple-500/15", orb3: "bg-indigo-400/10",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    accentText: "text-indigo-500", accentBg: "bg-indigo-500/10", accentBorder: "border-indigo-500/25",
    sectionBadgeBase: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30",
    tableAiBg: "bg-indigo-500/8", tableAiText: "text-indigo-600 dark:text-indigo-400",
    cardBorder: "border-indigo-500/20", cardBg: "bg-indigo-500/5",
    iconBg: "bg-indigo-500/15", iconText: "text-indigo-500",
    statAccent: "text-indigo-500", stepBg: "bg-indigo-500", stepText: "text-white",
    frameBorder: "border-indigo-500/30", futureNumColor: "text-indigo-500/30",
    glowColor: "shadow-indigo-500/25", heroAccentGlow: "#6366f1",
    pill: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    gradientFrom: "from-indigo-500", gradientTo: "to-violet-500",
    solidBg: "bg-indigo-500",
  },
};

// ─── Multi-color palette ──────────────────────────────────────────────────────
const multiPalette = [
  { bg: "bg-emerald-500/10", text: "text-emerald-500 dark:text-emerald-400", border: "border-emerald-500/25", step: "bg-emerald-500", ring: "ring-emerald-500/20", solid: "#10b981" },
  { bg: "bg-blue-500/10",    text: "text-blue-500 dark:text-blue-400",       border: "border-blue-500/25",    step: "bg-blue-500",    ring: "ring-blue-500/20",    solid: "#3b82f6" },
  { bg: "bg-violet-500/10",  text: "text-violet-500 dark:text-violet-400",   border: "border-violet-500/25",  step: "bg-violet-500",  ring: "ring-violet-500/20",  solid: "#8b5cf6" },
  { bg: "bg-amber-500/10",   text: "text-amber-500 dark:text-amber-400",     border: "border-amber-500/25",   step: "bg-amber-500",   ring: "ring-amber-500/20",   solid: "#f59e0b" },
  { bg: "bg-cyan-500/10",    text: "text-cyan-500 dark:text-cyan-400",       border: "border-cyan-500/25",    step: "bg-cyan-500",    ring: "ring-cyan-500/20",    solid: "#06b6d4" },
  { bg: "bg-orange-500/10",  text: "text-orange-500 dark:text-orange-400",   border: "border-orange-500/25",  step: "bg-orange-500",  ring: "ring-orange-500/20",  solid: "#f97316" },
  { bg: "bg-indigo-500/10",  text: "text-indigo-500 dark:text-indigo-400",   border: "border-indigo-500/25",  step: "bg-indigo-500",  ring: "ring-indigo-500/20",  solid: "#6366f1" },
  { bg: "bg-rose-500/10",    text: "text-rose-500 dark:text-rose-400",       border: "border-rose-500/25",    step: "bg-rose-500",    ring: "ring-rose-500/20",    solid: "#f43f5e" },
] as const;
const mp = (i: number) => multiPalette[i % multiPalette.length];

const industryColorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Healthcare:                  { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/25", dot: "bg-emerald-500" },
  "Fintech & Lending":         { bg: "bg-blue-500/10",    text: "text-blue-600 dark:text-blue-400",       border: "border-blue-500/25",    dot: "bg-blue-500" },
  Fintech:                     { bg: "bg-blue-500/10",    text: "text-blue-600 dark:text-blue-400",       border: "border-blue-500/25",    dot: "bg-blue-500" },
  Insurance:                   { bg: "bg-violet-500/10",  text: "text-violet-600 dark:text-violet-400",   border: "border-violet-500/25",  dot: "bg-violet-500" },
  "Hospitality & Wellness":    { bg: "bg-amber-500/10",   text: "text-amber-600 dark:text-amber-400",     border: "border-amber-500/25",   dot: "bg-amber-500" },
  Hospitality:                 { bg: "bg-amber-500/10",   text: "text-amber-600 dark:text-amber-400",     border: "border-amber-500/25",   dot: "bg-amber-500" },
  "Logistics & Supply Chain":  { bg: "bg-cyan-500/10",    text: "text-cyan-600 dark:text-cyan-400",       border: "border-cyan-500/25",    dot: "bg-cyan-500" },
  Logistics:                   { bg: "bg-cyan-500/10",    text: "text-cyan-600 dark:text-cyan-400",       border: "border-cyan-500/25",    dot: "bg-cyan-500" },
  "Real Estate":               { bg: "bg-orange-500/10",  text: "text-orange-600 dark:text-orange-400",   border: "border-orange-500/25",  dot: "bg-orange-500" },
  "Retail & eCommerce":        { bg: "bg-rose-500/10",    text: "text-rose-600 dark:text-rose-400",       border: "border-rose-500/25",    dot: "bg-rose-500" },
  Retail:                      { bg: "bg-rose-500/10",    text: "text-rose-600 dark:text-rose-400",       border: "border-rose-500/25",    dot: "bg-rose-500" },
  "EdTech & E-Learning":       { bg: "bg-indigo-500/10",  text: "text-indigo-600 dark:text-indigo-400",   border: "border-indigo-500/25",  dot: "bg-indigo-500" },
  EdTech:                      { bg: "bg-indigo-500/10",  text: "text-indigo-600 dark:text-indigo-400",   border: "border-indigo-500/25",  dot: "bg-indigo-500" },
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplayed(value); return; }
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = value.match(/[^0-9.]+$/)?.[0] ?? "";
    const decimals = (value.split(".")[1]?.replace(/[^0-9]/g, "").length) ?? 0;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplayed(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref} className={className}>{displayed}</span>;
}

// ─── Section Badge ────────────────────────────────────────────────────────────
function SectionBadge({ label, colorClass, icon: Icon }: { label: string; colorClass: string; icon?: LucideIcon }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 ${colorClass}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
}

// ─── Lead Form ────────────────────────────────────────────────────────────────
function LeadFormSection({ data, c }: { data: IndustryPageData; c: ColorConfig }) {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", challenge: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitLead(
      { name: form.name, email: form.email, company: form.org, industry: data.formIndustry, challenges: form.challenge ? [form.challenge] : [], message: form.message },
      { formType: "industry_lead", source: `${data.slug}_page`, ctaId: `${data.slug}_bottom_form`, ctaText: data.formCtaLabel ?? "Get My Free AI Strategy", ctaLocation: "bottom_form" }
    );
    setSubmitting(false);
    if (result.success) {
      triggerCelebration();
      setSubmitted(true);
      toast({ title: "You're in!", description: "Our team will reach out within one business day." });
    } else {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    }
  };

  const bullets = data.formLeftBullets ?? [
    `Free ${data.industry} AI strategy session`,
    "No generic pitches — tailored to your use case",
    "Clear implementation roadmap & timeline",
    "Honest cost estimates from $6K",
    "Response within 1 business day",
  ];

  return (
    <section id="lead-form" className="py-28 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${c.heroBg} -z-10`} />
      <motion.div className={`absolute -top-40 right-0 w-[700px] h-[700px] ${c.orb1} rounded-full blur-[100px] -z-10`}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className={`absolute bottom-0 -left-20 w-[500px] h-[500px] ${c.orb2} rounded-full blur-3xl -z-10`}
        animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${c.badge} mb-5`}>
            <Sparkles className="w-3 h-3" /> Free Consultation
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            {data.formLeftTitle ?? `Ready to Deploy AI in ${data.industry}?`}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {data.formSubheadline ?? `Tell us your biggest challenge and we'll show you exactly how AI can solve it — with real timelines, real costs, and a clear starting point.`}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="space-y-4">
              {bullets.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3.5">
                  <div className={`w-6 h-6 rounded-full ${c.stepBg} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg`}>
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/80 text-sm leading-relaxed">{b}</span>
                </motion.div>
              ))}
            </div>
            <div className={`rounded-2xl border ${c.accentBorder} bg-white/5 backdrop-blur-sm p-6 relative`}>
              <Quote className={`w-9 h-9 ${c.accentText} opacity-30 mb-3`} />
              <p className="text-white/80 text-sm leading-relaxed italic mb-5">"{data.signatureQuote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${c.stepBg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white text-xs font-black">SS</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Santosh Singh</p>
                  <p className="text-white/50 text-xs">Founder & CEO, AGIX Technologies</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {data.stats.slice(0, 3).map((stat, i) => (
                <div key={i} className={`rounded-xl border ${c.accentBorder} bg-white/5 p-3 text-center`}>
                  <div className={`text-lg font-black ${c.accentText} mb-0.5`}>{stat.value}</div>
                  <div className="text-white/40 text-[10px] leading-snug">{stat.label.split("—")[0].split(",")[0].trim()}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <ShieldCheck className="w-4 h-4 text-white/30 flex-shrink-0" />
              <p className="text-xs text-white/30">Confidential · We never sell your data or send spam.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl overflow-hidden shadow-2xl">
              <div className={`h-1.5 w-full bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo}`} />
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-14">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}
                      className={`w-20 h-20 ${c.accentBg} border-2 ${c.accentBorder} rounded-full flex items-center justify-center mx-auto mb-5`}>
                      <CheckCircle2 className={`w-10 h-10 ${c.accentText}`} />
                    </motion.div>
                    <h3 className="text-2xl font-black text-white mb-3">Request Received!</h3>
                    <p className="text-white/60 text-sm leading-relaxed">Our team will reach out within one business day with a tailored {data.industry} AI strategy.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <h3 className="text-xl font-black text-white mb-1.5">{data.formHeadline ?? `Get Your Free ${data.industry} AI Strategy`}</h3>
                      <p className="text-sm text-white/50">Takes 60 seconds. No commitment required.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Your Name</Label>
                          <Input className="h-11 bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40 rounded-xl"
                            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full Name" data-testid="input-form-name" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Work Email <span className="text-rose-400">*</span></Label>
                          <Input className="h-11 bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40 rounded-xl"
                            type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" data-testid="input-form-email" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Organisation</Label>
                        <Input className="h-11 bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40 rounded-xl"
                          value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} placeholder="Company name" data-testid="input-form-org" />
                      </div>
                      {data.challengeOptions.length > 0 && (
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Primary Challenge</Label>
                          <Select value={form.challenge} onValueChange={v => setForm({ ...form, challenge: v })}>
                            <SelectTrigger className="h-11 bg-white/10 border-white/15 text-white [&_[data-placeholder]]:text-white/30 rounded-xl" data-testid="select-challenge">
                              <SelectValue placeholder="Select your top challenge…" />
                            </SelectTrigger>
                            <SelectContent>
                              {data.challengeOptions.map(o => (
                                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div>
                        <Label className="text-sm font-semibold text-white/70 mb-1.5 block">What are you trying to solve?</Label>
                        <Textarea className="min-h-[80px] resize-none bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40 rounded-xl"
                          placeholder="Briefly describe your challenge or goal…" rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} data-testid="input-form-message" />
                      </div>
                      <Button type="submit" size="lg" disabled={submitting}
                        className={`w-full h-12 text-base font-bold text-white border-0 bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} hover:opacity-90 shadow-lg rounded-xl`}
                        data-testid="button-submit-lead">
                        {submitting
                          ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending…</>
                          : <>{data.formCtaLabel ?? `Get My Free ${data.industry} AI Strategy`} <ArrowRight className="w-5 h-5 ml-2" /></>}
                      </Button>
                      <p className="text-xs text-center text-white/30">No commitment · Response within 1 business day</p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Template ────────────────────────────────────────────────────────────
export function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  const c = colors[data.accent];
  const [openUseCase, setOpenUseCase] = useState<number | null>(null);
  const [currentMonthYear, setCurrentMonthYear] = useState("2026");
  const HeroIcon = data.heroIcon;

  useEffect(() => {
    setCurrentMonthYear(new Date().toLocaleString("en-US", { month: "long", year: "numeric" }));
  }, []);

  return (
    <>
      <FAQPageSchema faqs={data.faqs} />
      <MainHeader />
      <main className="min-h-screen bg-background">

        {/* ══════════════════════════════════════════════════════════════════════
            § 1 · HERO — Full-bleed cinematic with animated backdrop
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-24 pb-0 overflow-hidden bg-[#020817]">
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 90% 60% at 50% -5%, ${c.heroAccentGlow}30 0%, transparent 65%)` }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.15) 39px,rgba(255,255,255,.15) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.15) 39px,rgba(255,255,255,.15) 40px)" }} />
          {/* Orbs */}
          <motion.div className={`absolute -top-24 left-1/4 w-[600px] h-[400px] ${c.orb1} rounded-full blur-[100px]`}
            animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className={`absolute top-1/3 -right-32 w-[400px] h-[400px] ${c.orb2} rounded-full blur-3xl`}
            animate={{ scale: [1.1, 1.25, 1.1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className={`absolute bottom-0 left-0 w-[300px] h-[300px] ${c.orb3} rounded-full blur-3xl`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />

          {/* Animated dot grid accents */}
          <div className="absolute top-32 right-16 opacity-20 pointer-events-none hidden lg:block">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div key={i} className={`inline-block w-1 h-1 rounded-full m-2 ${c.heroDark}`}
                animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.12 }} />
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Breadcrumb */}
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
              <ol className="flex items-center gap-2 text-xs text-white/40 font-medium">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li><Link href="/industries/" className="hover:text-white/70 transition-colors">Industries</Link></li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-white/70 font-semibold">{data.breadcrumb}</li>
              </ol>
            </motion.nav>

            {/* Centre block */}
            <div className="text-center max-w-4xl mx-auto mb-12">
              {/* Icon + badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-8">
                <motion.div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl border relative overflow-hidden"
                  style={{ background: `${c.heroAccentGlow}20`, borderColor: `${c.heroAccentGlow}50`, boxShadow: `0 0 50px ${c.heroAccentGlow}35` }}
                  animate={{ boxShadow: [`0 0 30px ${c.heroAccentGlow}25`, `0 0 60px ${c.heroAccentGlow}50`, `0 0 30px ${c.heroAccentGlow}25`] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HeroIcon className="w-8 h-8 text-white" />
                </motion.div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${c.badge} backdrop-blur-sm`}>
                  <motion.div className="w-2 h-2 rounded-full bg-current"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  <span className="text-sm font-bold">{data.industry} · AI Solutions</span>
                </div>
              </motion.div>

              {/* H1 */}
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-6 text-white">
                {data.heroTitle}{" "}
                <span className="relative inline-block" style={{ color: c.heroAccentGlow }}>
                  {data.heroTitleHighlight}
                  <motion.span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ backgroundColor: c.heroAccentGlow, opacity: 0.7 }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }} />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-xl text-white/60 leading-relaxed mb-10 max-w-3xl mx-auto">
                {data.heroSubtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button size="lg" className={`h-13 px-9 text-base font-bold text-white border-0 bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} hover:opacity-90 shadow-xl rounded-xl`} asChild>
                  <a href="#lead-form" data-testid="button-hero-cta">
                    Get My Free AI Strategy <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-13 px-8 text-base border-white/20 text-white/80 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-sm rounded-xl" asChild>
                  <a href="#use-cases">Explore Use Cases <ChevronRight className="w-4 h-4 ml-1" /></a>
                </Button>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[11px] text-white/25 tracking-wide">
                Updated {currentMonthYear} · Santosh Singh, Founder & CEO, AGIX Technologies
              </motion.p>
            </div>

            {/* Hero Cards */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.heroAccentGlow}35)` }} />
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-[0.2em]">Key Capabilities</span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${c.heroAccentGlow}35, transparent)` }} />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {data.heroCards.map((card, i) => {
                  const CardIcon = card.icon;
                  const m = mp(i);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.07 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 hover:bg-white/[0.09] hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden cursor-default"
                      data-testid={`card-hero-${i}`}>
                      <div className={`absolute top-0 left-0 right-0 h-[2px] ${m.step}`} />
                      <div className={`w-10 h-10 ${m.bg} border ${m.border} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        <CardIcon className={`w-5 h-5 ${m.text}`} />
                      </div>
                      <div className="font-bold text-sm text-white mb-1 leading-snug">{card.title}</div>
                      <div className={`text-xs font-semibold ${m.text} leading-snug`}>{card.desc}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="h-20 mt-10" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 2 · AEO DIRECT ANSWER
        ══════════════════════════════════════════════════════════════════════ */}
        {data.aeoAnswer && (
          <section className={`py-5 border-b border-border ${c.cardBg}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${c.gradientFrom} ${c.gradientTo} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-xs font-black uppercase tracking-widest ${c.accentText}`}>Direct Answer</span>
                    <span className="text-xs text-muted-foreground/50">— AEO Optimised</span>
                  </div>
                  <p className="text-base text-foreground leading-relaxed">{data.aeoAnswer}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            § 3 · STATS — Dark band, animated counters, multi-color accent bars
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#020817]" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${c.heroAccentGlow}14 0%, transparent 70%)` }} />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${c.badge} mb-4`}>
                <BarChart3 className="w-3.5 h-3.5" /> Market Data
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {data.statsHeadline ?? `Why ${data.industry} Needs AI Now`}
              </h2>
              {data.statsSubheadline && (
                <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed mt-3">{data.statsSubheadline}</p>
              )}
            </motion.div>

            <div className={`grid grid-cols-2 md:grid-cols-3 ${data.stats.length > 4 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4`}>
              {data.stats.map((stat, i) => {
                const StatIcon = stat.icon ?? TrendingUp;
                const m = mp(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}>
                    <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-5 text-center hover:-translate-y-2 hover:bg-white/[0.09] transition-all duration-300 group overflow-hidden h-full flex flex-col items-center justify-center">
                      {/* Gradient top bar */}
                      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${m.step.replace('bg-', 'from-')} to-transparent`} style={{ background: `linear-gradient(90deg, ${m.solid}, transparent)` }} />
                      {/* Ghost digit */}
                      <div className={`absolute -bottom-3 -right-1 text-[60px] font-black opacity-[0.05] select-none leading-none pointer-events-none text-white`}>
                        {stat.value.replace(/[^0-9]/g, '')}
                      </div>
                      <div className={`w-10 h-10 ${m.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border ${m.border}`}>
                        <StatIcon className={`w-5 h-5 ${m.text}`} />
                      </div>
                      <AnimatedCounter value={stat.value} className={`text-2xl md:text-3xl font-black mb-1 ${m.text}`} />
                      <div className="text-xs text-white/45 leading-snug">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 4 · DEFINITION — Editorial split with large accent quote
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-[5fr_7fr] gap-16 items-start">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <SectionBadge label="Definition" colorClass={c.sectionBadgeBase} />
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-5">{data.definitionTitle}</h2>
                <div className={`w-16 h-1.5 rounded-full bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} mb-8`} />
                {/* Feature metric card */}
                <div className={`rounded-2xl border-2 ${c.accentBorder} p-6 relative overflow-hidden`}
                  style={{ background: `linear-gradient(135deg, ${c.heroAccentGlow}10, ${c.heroAccentGlow}05)` }}>
                  <div className={`absolute -top-3 -right-3 text-[80px] font-black text-white opacity-[0.04] select-none leading-none`}>
                    {data.stats[0]?.value.replace(/[^0-9%$KMB+.]/g, '') ?? "AI"}
                  </div>
                  <AnimatedCounter value={data.stats[0]?.value ?? "50%+"} className={`text-4xl font-black ${c.accentText} mb-1 block`} />
                  <div className="text-sm text-muted-foreground leading-relaxed">{data.stats[0]?.label ?? `Efficiency gain from AI in ${data.industry}`}</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{data.definitionText}</p>
                <div className={`border-l-4 bg-gradient-to-r ${c.gradientFrom.replace('from-', 'from-').replace('500', '500/5')} to-transparent border-${data.accent}-500/40 pl-6 py-4 rounded-r-2xl relative`}
                  style={{ borderLeftColor: `${c.heroAccentGlow}60`, background: `linear-gradient(90deg, ${c.heroAccentGlow}08, transparent)` }}>
                  <Quote className={`w-6 h-6 ${c.accentText} opacity-40 mb-2`} />
                  <p className={`text-sm font-semibold italic ${c.accentText} leading-relaxed mb-3`}>"{data.signatureQuote}"</p>
                  <p className="text-xs text-muted-foreground">{data.signatureAuthor ?? "Santosh Singh, Founder & CEO, AGIX Technologies"}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 5 · HOW IT WORKS — Horizontal connected stepper
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-muted/40 border-b border-border overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <SectionBadge label="How It Works" colorClass={c.sectionBadgeBase} icon={Zap} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.howItWorksTitle ?? `How AI Works in ${data.industry} — Simplified`}
              </h2>
            </motion.div>

            {/* Desktop: horizontal flow */}
            <div className="hidden lg:flex items-start gap-0 relative mb-8">
              {/* Connecting line */}
              <div className="absolute top-[22px] left-[calc(100%/12)] right-[calc(100%/12)] h-[2px] z-0"
                style={{ background: `linear-gradient(90deg, ${c.heroAccentGlow}30, ${c.heroAccentGlow}60, ${c.heroAccentGlow}30)` }} />

              {data.howItWorksSteps.map((step, i) => {
                const StepIcon = step.icon;
                const m = mp(i);
                return (
                  <motion.div key={i} className="flex-1 flex flex-col items-center text-center px-3 relative z-10"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    {/* Step circle */}
                    <div className={`w-11 h-11 rounded-full ${m.step} flex items-center justify-center text-white font-black text-sm mb-3 shadow-lg ring-4 bg-background`}
                      style={{ boxShadow: `0 0 0 4px hsl(var(--background)), 0 0 20px ${m.solid}50` }}>
                      {i + 1}
                    </div>
                    {/* Icon */}
                    {StepIcon && (
                      <div className={`w-9 h-9 ${m.bg} border ${m.border} rounded-xl flex items-center justify-center mb-3`}>
                        <StepIcon className={`w-4 h-4 ${m.text}`} />
                      </div>
                    )}
                    <h3 className={`font-black text-xs mb-1.5 ${m.text} uppercase tracking-wide`}>{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
              {data.howItWorksSteps.map((step, i) => {
                const StepIcon = step.icon;
                const m = mp(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <div className={`h-full rounded-2xl border-2 ${m.border} bg-background p-5 relative overflow-hidden`}>
                      <div className={`absolute top-0 left-0 right-0 h-1 ${m.step} opacity-70`} />
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${m.step} rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>{i + 1}</div>
                        {StepIcon && <div className={`w-9 h-9 ${m.bg} border ${m.border} rounded-xl flex items-center justify-center`}><StepIcon className={`w-4 h-4 ${m.text}`} /></div>}
                      </div>
                      <h3 className={`font-black text-sm mb-1.5 ${m.text}`}>{step.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 6 · AI VS TRADITIONAL — Visual comparison table
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <SectionBadge label="AI vs Traditional" colorClass={c.sectionBadgeBase} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.comparisonTitle ?? `AI vs Traditional ${data.industry} Operations`}
              </h2>
              {data.comparisonSubtitle && (
                <p className="text-muted-foreground text-lg max-w-3xl">{data.comparisonSubtitle}</p>
              )}
            </motion.div>

            <div className="overflow-x-auto rounded-3xl border border-border shadow-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 font-bold bg-muted/60 w-[22%] text-xs uppercase tracking-wider text-muted-foreground">Dimension</th>
                    <th className="text-left px-6 py-4 font-bold bg-red-500/5 text-xs uppercase tracking-wider text-red-500/70">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center"><X className="w-3 h-3 text-red-500" /></div>
                        Traditional
                      </div>
                    </th>
                    <th className={`text-left px-6 py-4 font-bold ${c.cardBg} text-xs uppercase tracking-wider`}>
                      <div className={`flex items-center gap-2 ${c.accentText}`}>
                        <div className={`w-5 h-5 rounded-full ${c.iconBg} flex items-center justify-center`}><Check className={`w-3 h-3 ${c.iconText}`} /></div>
                        AI-Powered (AGIX)
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparisonRows.map((row, i) => (
                    <motion.tr key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-xs uppercase tracking-wide bg-muted/20">{row.dimension}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm bg-red-500/[0.02]">
                        <div className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 text-red-400/50 flex-shrink-0 mt-0.5" />{row.traditional}
                        </div>
                      </td>
                      <td className={`px-6 py-4 font-semibold text-sm ${c.tableAiText} ${c.cardBg}`}>
                        <div className="flex items-start gap-2">
                          <Check className={`w-3.5 h-3.5 ${c.iconText} flex-shrink-0 mt-0.5`} />{row.ai}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 7 · KEY BENEFITS — Bento grid with large metric callouts
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-muted/40 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionBadge label="Key Benefits" colorClass={c.sectionBadgeBase} icon={TrendingUp} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.benefitsTitle ?? `Key Benefits of AI in ${data.industry}`}
              </h2>
            </motion.div>

            {/* Bento layout: first card large, rest normal */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {data.benefits.map((b, i) => {
                const BIcon = b.icon ?? CheckCircle2;
                const m = mp(i);
                const isFirst = i === 0;
                return (
                  <motion.div key={i} className={isFirst ? "col-span-2 lg:col-span-1 row-span-1" : ""}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <div className={`h-full rounded-2xl border-2 ${m.border} bg-background hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative ${isFirst ? 'min-h-[200px]' : ''}`}
                      style={{ background: isFirst ? `linear-gradient(135deg, ${m.solid}08, transparent)` : undefined }}>
                      {/* Gradient top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${m.solid}, transparent)` }} />
                      {/* Left accent bar */}
                      <div className={`absolute top-0 left-0 bottom-0 w-1 ${m.step} rounded-l-none opacity-60`} />

                      <div className="p-6 pl-7">
                        <div className={`w-12 h-12 ${m.bg} border-2 ${m.border} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                          <BIcon className={`w-6 h-6 ${m.text}`} />
                        </div>
                        <AnimatedCounter value={b.value} className={`text-4xl md:text-5xl font-black ${m.text} mb-2 leading-none block`} />
                        <div className="font-bold text-sm mb-2 text-foreground">{b.title}</div>
                        {b.detail && <p className="text-xs text-muted-foreground leading-relaxed">{b.detail}</p>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 8 · USE CASES SUMMARY — Rich impact cards with accent colors
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="use-cases" className="py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <SectionBadge label="Use Cases" colorClass={c.sectionBadgeBase} icon={Target} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.useCasesTitle ?? `Best Use Cases of AI in ${data.industry}`}
              </h2>
              {data.useCasesSubtitle && <p className="text-muted-foreground text-lg max-w-3xl">{data.useCasesSubtitle}</p>}
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {data.useCasesSummary.map((uc, i) => {
                const m = mp(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <div className={`rounded-2xl border-2 ${m.border} bg-background p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group relative overflow-hidden h-full`}>
                      <div className={`absolute top-0 left-0 right-0 h-[2px]`} style={{ background: `linear-gradient(90deg, ${m.solid}, transparent)` }} />
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${m.step} rounded-2xl flex items-center justify-center text-white font-black text-base flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
                          style={{ boxShadow: `0 4px 14px ${m.solid}40` }}>
                          {uc.num}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-black text-sm mb-1.5 text-foreground">{uc.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{uc.what}</p>
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${m.text} ${m.bg} border ${m.border} px-3 py-1.5 rounded-full`}>
                            <TrendingUp className="w-3 h-3" />
                            {uc.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 9 · USE CASES DETAIL — Polished expandable accordion
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-muted/40 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <SectionBadge label="Deep Dive" colorClass={c.sectionBadgeBase} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.useCasesDetailTitle ?? `How AI Solves ${data.industry} Bottlenecks`}
              </h2>
            </motion.div>

            <div className="space-y-3">
              {data.useCasesDetail.map((uc, i) => {
                const m = mp(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${openUseCase === i ? `${m.border} shadow-lg bg-background` : 'border-border bg-background hover:border-muted-foreground/20'}`}>
                      <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                        onClick={() => setOpenUseCase(openUseCase === i ? null : i)} data-testid={`button-usecase-${i}`}>
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-200 flex-shrink-0 shadow-sm ${openUseCase === i ? `${m.step} text-white` : 'bg-muted text-muted-foreground'}`}>
                            {i + 1}
                          </div>
                          <span className="font-black text-base">{uc.title}</span>
                        </div>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${openUseCase === i ? m.bg : 'bg-muted'}`}>
                          {openUseCase === i
                            ? <ChevronUp className={`w-4 h-4 ${m.text}`} />
                            : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {openUseCase === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                            <div className="px-6 pb-7 space-y-5 border-t border-border pt-5">
                              {uc.definition && (
                                <div className={`${m.bg} border ${m.border} rounded-2xl p-4`}>
                                  <p className="text-sm text-muted-foreground italic leading-relaxed">{uc.definition}</p>
                                </div>
                              )}
                              {uc.bottleneck && (
                                <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">The Challenge</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.bottleneck}</p>
                                  </div>
                                </div>
                              )}
                              <div>
                                <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">How AI Solves It</p>
                                <ul className="space-y-2.5">
                                  {uc.howAISolvesIt.map((point, pi) => (
                                    <li key={pi} className="flex items-start gap-3 text-sm">
                                      <div className={`w-5 h-5 rounded-lg ${m.bg} flex items-center justify-center flex-shrink-0 mt-0.5 border ${m.border}`}>
                                        <CheckCircle2 className={`w-3.5 h-3.5 ${m.text}`} />
                                      </div>
                                      <span className="text-foreground leading-relaxed">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {uc.services.map((svc, si) => (
                                  <Link key={si} href={svc.href}
                                    className={`text-xs px-3 py-1.5 rounded-full border ${m.border} ${m.bg} ${m.text} font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1.5`}>
                                    {svc.label} <ArrowUpRight className="w-3 h-3" />
                                  </Link>
                                ))}
                              </div>
                              {(uc.intelligence || uc.caseStudy) && (
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                  {uc.intelligence && <span className="italic">🧠 {uc.intelligence}</span>}
                                  {uc.caseStudy && (
                                    <Link href={uc.caseStudy.href} className={`${m.text} font-semibold hover:underline`}>📋 {uc.caseStudy.label}</Link>
                                  )}
                                </div>
                              )}
                              <div className={`${m.bg} border-2 ${m.border} rounded-2xl p-4 flex items-start gap-3`}>
                                <Target className={`w-5 h-5 ${m.text} flex-shrink-0 mt-0.5`} />
                                <div>
                                  <p className={`text-xs font-black uppercase tracking-wider ${m.text} mb-1`}>Outcome</p>
                                  <p className="text-sm font-semibold leading-relaxed">{uc.outcome}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 10 · AGIX FRAMEWORK — Connected flow with gradient borders
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionBadge label="AGIX Framework" colorClass={c.sectionBadgeBase} icon={Layers} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.frameworkTitle ?? `The AGIX ${data.industry} Intelligence Framework`}
              </h2>
              {data.frameworkSubtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">{data.frameworkSubtitle}</p>}
            </motion.div>

            <div className="relative">
              {/* Connecting arrows between cards on desktop */}
              <div className="hidden lg:flex absolute top-[44px] left-0 right-0 items-center justify-center pointer-events-none z-10 px-[12.5%]">
                {Array.from({ length: data.frameworkLayers.length - 1 }).map((_, i) => (
                  <div key={i} className="flex-1 flex items-center justify-center">
                    <MoveRight className={`w-5 h-5 ${c.accentText} opacity-40`} />
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {data.frameworkLayers.map((layer, i) => {
                  const LayerIcon = layer.icon ?? Star;
                  const m = mp(i);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <div className={`h-full rounded-2xl border-2 ${m.border} bg-background hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative p-6`}
                        style={{ background: `linear-gradient(135deg, ${m.solid}06, transparent)` }}>
                        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${m.solid}, transparent)` }} />
                        <div className={`absolute -top-3 -right-3 text-[64px] font-black opacity-[0.06] select-none leading-none`} style={{ color: m.solid }}>{layer.num}</div>
                        <div className={`w-12 h-12 ${m.bg} border-2 ${m.border} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md`}>
                          <LayerIcon className={`w-6 h-6 ${m.text}`} />
                        </div>
                        <div className={`text-[10px] font-black ${m.text} uppercase tracking-widest mb-1`}>Layer {layer.num}</div>
                        <h3 className="font-black text-sm mb-2 text-foreground">{layer.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{layer.what}</p>
                        <p className={`text-xs font-semibold ${m.text} italic`}>{layer.how}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {data.frameworkQuote && (
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8">
                <div className={`rounded-3xl border-2 ${c.accentBorder} p-7 flex items-start gap-5 relative overflow-hidden`}
                  style={{ background: `linear-gradient(135deg, ${c.heroAccentGlow}08, transparent)` }}>
                  <Quote className={`w-10 h-10 ${c.accentText} opacity-35 flex-shrink-0 mt-1`} />
                  <p className={`text-base leading-relaxed font-medium italic ${c.accentText}`}>{data.frameworkQuote}</p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 11 · GOVERNANCE — Colorful trust & compliance cards
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-muted/40 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <SectionBadge label="Governance & Safety" colorClass={c.sectionBadgeBase} icon={ShieldCheck} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.governanceTitle ?? `Is AI in ${data.industry} Safe?`}
              </h2>
              {data.governanceSubtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">{data.governanceSubtitle}</p>}
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.governancePrinciples.map((p, i) => {
                const m = mp(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <div className={`h-full rounded-2xl border-2 ${m.border} bg-background p-5 flex gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group relative overflow-hidden`}
                      style={{ background: `linear-gradient(135deg, ${m.solid}05, transparent)` }}>
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${m.solid}80, transparent)` }} />
                      <div className={`w-12 h-12 ${m.bg} border-2 ${m.border} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md`}>
                        <ShieldCheck className={`w-5 h-5 ${m.text}`} />
                      </div>
                      <div>
                        <h3 className="font-black text-sm mb-1.5 text-foreground">{p.principle}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{p.meaning}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 12 · LIMITATIONS — Amber honesty cards
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <SectionBadge label="Honest Assessment" colorClass="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30" icon={AlertTriangle} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.limitationsTitle ?? `Limitations of AI in ${data.industry}`}
              </h2>
              <p className="text-muted-foreground max-w-2xl">We believe in radical transparency. Here's what AI can't fully solve — yet.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {data.limitations.map((lim, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="h-full rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 p-6 flex gap-4 hover:border-amber-500/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm mb-2 text-amber-700 dark:text-amber-400">{lim.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{lim.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {data.limitationsQuote && (
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="rounded-3xl bg-primary/5 border-2 border-primary/15 p-7 flex items-start gap-5">
                  <Quote className="w-9 h-9 text-primary/30 flex-shrink-0 mt-1" />
                  <p className="text-sm text-foreground leading-relaxed font-medium italic">{data.limitationsQuote}</p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 13 · PRICING — Investment ranges with green accents
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-muted/40 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <SectionBadge label="Transparent Pricing" colorClass="bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30" icon={DollarSign} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.pricingTitle ?? `How Much Does ${data.industry} AI Cost?`}
              </h2>
              {data.pricingSubtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{data.pricingSubtitle}</p>}
            </motion.div>

            <div className="overflow-x-auto rounded-3xl border border-border shadow-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 font-bold bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                      <div className="flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> System</div>
                    </th>
                    <th className="text-left px-6 py-4 font-bold bg-green-500/5 text-xs uppercase tracking-wider text-green-600 dark:text-green-400">
                      <div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Investment</div>
                    </th>
                    <th className="text-left px-6 py-4 font-bold bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
                      <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Timeline</div>
                    </th>
                    {data.hasBestFor && (
                      <th className="text-left px-6 py-4 font-bold bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                        <div className="flex items-center gap-2"><Target className="w-3.5 h-3.5" /> Best For</div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.pricingRows.map((row, i) => (
                    <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                      className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors group">
                      <td className="px-6 py-4 font-semibold group-hover:text-foreground transition-colors">{row.system}</td>
                      <td className="px-6 py-4 font-black text-green-600 dark:text-green-400 bg-green-500/[0.02]">{row.investment}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.timeline}</td>
                      {data.hasBestFor && <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{row.bestFor ?? "—"}</td>}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Not sure which tier fits your org? We'll tell you — for free.</p>
              <Button asChild variant="outline" className={`border-2 ${c.frameBorder} ${c.accentText} hover:${c.accentBg} rounded-xl`}>
                <a href="#lead-form">Get a Free Scoping Call <ArrowRight className="w-4 h-4 ml-1.5" /></a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 14 · FUTURE OUTLOOK — Timeline roadmap with numbered milestones
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 border-b border-border relative overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${c.heroAccentGlow}08, transparent)` }} />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionBadge label="2028 Outlook" colorClass="bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30" icon={Rocket} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.futureTitle ?? `The Future of AI in ${data.industry}`}
              </h2>
            </motion.div>

            {/* Timeline layout */}
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-[27px] top-4 bottom-4 w-[2px]"
                style={{ background: `linear-gradient(180deg, ${c.heroAccentGlow}60, ${c.heroAccentGlow}20, transparent)` }} />

              <div className="space-y-4">
                {data.futureItems.map((item, i) => {
                  const m = mp(i);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <div className="flex items-start gap-5">
                        {/* Timeline dot */}
                        <div className={`w-[56px] h-[56px] rounded-2xl ${m.step} flex items-center justify-center text-white font-black text-base flex-shrink-0 shadow-lg z-10`}
                          style={{ boxShadow: `0 4px 20px ${m.solid}40` }}>
                          {item.num}
                        </div>
                        <div className={`flex-1 rounded-2xl border-2 ${m.border} bg-background p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group`}
                          style={{ background: `linear-gradient(135deg, ${m.solid}05, transparent)` }}>
                          <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0" />
                          <h3 className={`font-black text-sm ${m.text} leading-relaxed`}>{item.title}</h3>
                          {item.desc && <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">{item.desc}</p>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 15 · LEAD FORM — Uniform dark CTA
        ══════════════════════════════════════════════════════════════════════ */}
        <LeadFormSection data={data} c={c} />

        {/* ══════════════════════════════════════════════════════════════════════
            § 16 · RELATED INDUSTRIES — Colorful cross-links
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-16 border-b border-border bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-2xl font-black mb-1">Related Industries</h2>
              <p className="text-sm text-muted-foreground">See how AGIX deploys AI across related verticals</p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {data.relatedIndustries.map((ind, i) => {
                const indC = industryColorMap[ind.name] ?? { bg: "bg-muted", text: "text-foreground", border: "border-border", dot: "bg-muted-foreground" };
                return (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <Link href={ind.href}
                      className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 ${indC.border} ${indC.bg} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}>
                      <div className={`w-2 h-2 rounded-full ${indC.dot} group-hover:scale-125 transition-transform`} />
                      <span className={`text-sm font-bold ${indC.text}`}>{ind.name}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${indC.text} opacity-60 group-hover:translate-x-0.5 transition-transform`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 17 · FAQ
        ══════════════════════════════════════════════════════════════════════ */}
        <FAQSection faqs={data.faqs.map(f => ({ question: f.q, answer: f.a }))} />

      </main>
      <MainFooter />
    </>
  );
}
