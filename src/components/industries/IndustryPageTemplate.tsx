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

import {
  ChevronRight, ArrowRight, CheckCircle2, ShieldCheck, Loader2,
  ChevronDown, ChevronUp, TrendingUp, Zap, Star, Clock, DollarSign,
  BarChart3, Users, Building2, Quote, Target, Sparkles, AlertTriangle,
  ArrowUpRight, X, Check, Rocket, Globe, Lock, Eye, Calendar, Layers,
  MoveRight, ArrowDown, Play, Lightbulb, Trophy, Activity,
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
          {/* Animated orbs */}
          <motion.div className={`absolute -top-24 left-1/4 w-[600px] h-[400px] ${c.orb1} rounded-full blur-[100px]`}
            animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.7, 0.45] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className={`absolute top-1/3 -right-32 w-[400px] h-[400px] ${c.orb2} rounded-full blur-3xl`}
            animate={{ scale: [1.1, 1.25, 1.1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className={`absolute bottom-0 left-0 w-[300px] h-[300px] ${c.orb3} rounded-full blur-3xl`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />

          {/* Animated dot grid accent */}
          <div className="absolute top-32 right-16 opacity-20 pointer-events-none hidden lg:grid grid-cols-5 gap-4">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div key={i} className={`w-1 h-1 rounded-full ${c.heroDark}`}
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
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
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

            {/* Hero Cards — bento grid with colored top bars */}
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
                      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 hover:bg-white/[0.09] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden cursor-default"
                      data-testid={`card-hero-${i}`}>
                      <div className={`absolute top-0 left-0 right-0 h-[3px]`} style={{ background: `linear-gradient(90deg, ${m.solid}, ${m.solid}50)` }} />
                      <div className={`w-10 h-10 ${m.bg} border ${m.border} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                        style={{ boxShadow: `0 4px 12px ${m.solid}30` }}>
                        <CardIcon className={`w-5 h-5 ${m.text}`} />
                      </div>
                      <div className="font-bold text-sm text-white mb-1 leading-snug">{card.title}</div>
                      <div className={`text-xs font-semibold leading-snug`} style={{ color: m.solid }}>{card.desc}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="h-20 mt-10" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 2 · AEO DIRECT ANSWER — Spotlight callout
        ══════════════════════════════════════════════════════════════════════ */}
        {data.aeoAnswer && (
          <section className="py-8 border-b border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`rounded-2xl border-2 ${c.accentBorder} p-6 flex items-start gap-5 relative overflow-hidden`}
                style={{ background: `linear-gradient(135deg, ${c.heroAccentGlow}08, transparent)` }}>
                <div className="absolute inset-0 opacity-[0.02]"
                  style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.gradientFrom} ${c.gradientTo} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  style={{ boxShadow: `0 8px 24px ${c.heroAccentGlow}40` }}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-black uppercase tracking-widest ${c.accentText}`}>Direct Answer</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">AEO Optimised</span>
                  </div>
                  <p className="text-base text-foreground leading-relaxed font-medium">{data.aeoAnswer}</p>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            § 3 · STATS — Dark band, oversized animated counters
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#020817]" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${c.heroAccentGlow}18 0%, transparent 70%)` }} />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
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
                    <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-6 text-center hover:-translate-y-2 hover:bg-white/[0.09] transition-all duration-300 group overflow-hidden h-full flex flex-col items-center justify-center"
                      style={{ boxShadow: `inset 0 1px 0 ${m.solid}20` }}>
                      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${m.solid}, ${m.solid}40, transparent)` }} />
                      <div className={`absolute bottom-0 left-0 right-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        style={{ background: `radial-gradient(ellipse at 50% 100%, ${m.solid}15, transparent)` }} />
                      <div className={`w-11 h-11 ${m.bg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border ${m.border}`}
                        style={{ boxShadow: `0 4px 16px ${m.solid}30` }}>
                        <StatIcon className={`w-5 h-5 ${m.text}`} />
                      </div>
                      <AnimatedCounter value={stat.value} className={`text-3xl md:text-4xl font-black mb-1.5 block`} style={{ color: m.solid } as React.CSSProperties} />
                      <div className="text-xs text-white/45 leading-snug">{stat.label}</div>
                      {stat.cite && <div className="text-[9px] text-white/25 mt-2 uppercase tracking-wider">{stat.cite}</div>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 4 · DEFINITION — Full-width editorial with pull quote
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border overflow-hidden relative">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 100% 80% at 100% 50%, ${c.heroAccentGlow}06, transparent)` }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-[5fr_7fr] gap-16 items-start">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <SectionBadge label="Definition" colorClass={c.sectionBadgeBase} />
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-5">{data.definitionTitle}</h2>
                <div className={`w-16 h-1.5 rounded-full bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} mb-8`} />
                {/* Feature metric card */}
                <div className={`rounded-2xl border-2 ${c.accentBorder} p-7 relative overflow-hidden`}
                  style={{ background: `linear-gradient(135deg, ${c.heroAccentGlow}12, ${c.heroAccentGlow}05)`, boxShadow: `0 8px 32px ${c.heroAccentGlow}20` }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${c.heroAccentGlow}15, transparent)`, transform: "translate(30%, -30%)" }} />
                  <AnimatedCounter value={data.stats[0]?.value ?? "50%+"} className={`text-5xl md:text-6xl font-black ${c.accentText} mb-2 block leading-none`} />
                  <div className="text-sm text-muted-foreground leading-relaxed">{data.stats[0]?.label ?? `Efficiency gain from AI in ${data.industry}`}</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{data.definitionText}</p>
                <div className="rounded-2xl overflow-hidden border border-border">
                  <div className={`h-1 bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo}`} />
                  <div className="p-6 bg-muted/30">
                    <Quote className={`w-6 h-6 ${c.accentText} opacity-50 mb-3`} />
                    <p className={`text-base font-semibold italic ${c.accentText} leading-relaxed mb-4`}>"{data.signatureQuote}"</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${c.stepBg} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-[10px] font-black">SS</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{data.signatureAuthor ?? "Santosh Singh, Founder & CEO, AGIX Technologies"}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 5 · HOW IT WORKS — Large numbered pipeline
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border overflow-hidden relative">
          <div className="absolute inset-0 bg-muted/30" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <SectionBadge label="How It Works" colorClass={c.sectionBadgeBase} icon={Play} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.howItWorksTitle ?? `How AI Works in ${data.industry} — Simplified`}
              </h2>
            </motion.div>

            {/* Desktop: connected numbered flow */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Horizontal connector line */}
                <div className="absolute top-[36px] left-[8%] right-[8%] h-[2px] z-0"
                  style={{ background: `linear-gradient(90deg, ${c.heroAccentGlow}20, ${c.heroAccentGlow}50, ${c.heroAccentGlow}20)` }} />

                <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${Math.min(data.howItWorksSteps.length, 5)}, 1fr)` }}>
                  {data.howItWorksSteps.map((step, i) => {
                    const StepIcon = step.icon;
                    const m = mp(i);
                    return (
                      <motion.div key={i} className="flex flex-col items-center text-center relative z-10"
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                        {/* Step number circle */}
                        <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center font-black text-2xl text-white mb-4 flex-shrink-0 shadow-xl`}
                          style={{ background: `linear-gradient(135deg, ${m.solid}, ${m.solid}cc)`, boxShadow: `0 8px 24px ${m.solid}40, 0 0 0 6px hsl(var(--background)), 0 0 0 8px ${m.solid}30` }}>
                          {i + 1}
                        </div>
                        {StepIcon && (
                          <div className={`w-10 h-10 ${m.bg} border-2 ${m.border} rounded-xl flex items-center justify-center mb-3`}>
                            <StepIcon className={`w-5 h-5 ${m.text}`} />
                          </div>
                        )}
                        <h3 className={`font-black text-sm mb-2 uppercase tracking-wide`} style={{ color: m.solid }}>{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile: stacked cards */}
            <div className="space-y-4 lg:hidden">
              {data.howItWorksSteps.map((step, i) => {
                const StepIcon = step.icon;
                const m = mp(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <div className={`rounded-2xl border-2 ${m.border} bg-background p-5 relative overflow-hidden flex gap-4 items-start`}>
                      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${m.solid}, transparent)` }} />
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg`}
                        style={{ background: `linear-gradient(135deg, ${m.solid}, ${m.solid}cc)` }}>
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        {StepIcon && <StepIcon className={`w-4 h-4 ${m.text} mb-2`} />}
                        <h3 className={`font-black text-sm mb-1 ${m.text}`}>{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 6 · AI VS TRADITIONAL — Two-column visual comparison
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <SectionBadge label="AI vs Traditional" colorClass={c.sectionBadgeBase} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.comparisonTitle ?? `AI vs Traditional ${data.industry} Operations`}
              </h2>
              {data.comparisonSubtitle && (
                <p className="text-muted-foreground text-lg max-w-3xl">{data.comparisonSubtitle}</p>
              )}
            </motion.div>

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 mb-1 hidden-mobile">
              <div />
              <div className="px-4 py-2.5 bg-red-500/8 border border-red-500/20 rounded-t-2xl text-center">
                <span className="text-xs font-black uppercase tracking-wider text-red-500/70 flex items-center justify-center gap-2">
                  <X className="w-3.5 h-3.5" /> Traditional Approach
                </span>
              </div>
              <div className={`px-4 py-2.5 ${c.cardBg} border ${c.cardBorder} rounded-t-2xl text-center`}>
                <span className={`text-xs font-black uppercase tracking-wider ${c.accentText} flex items-center justify-center gap-2`}>
                  <Check className="w-3.5 h-3.5" /> AI-Powered (AGIX)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {data.comparisonRows.map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-0 rounded-xl overflow-hidden border border-border hover:border-border/80 transition-colors group">
                    <div className="px-5 py-4 bg-muted/40 flex items-center font-bold text-xs uppercase tracking-wide border-b md:border-b-0 md:border-r border-border">
                      {row.dimension}
                    </div>
                    <div className="px-5 py-4 bg-red-500/[0.03] border-b md:border-b-0 md:border-r border-border flex items-start gap-2.5">
                      <X className="w-3.5 h-3.5 text-red-400/60 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{row.traditional}</span>
                    </div>
                    <div className={`px-5 py-4 ${c.cardBg} flex items-start gap-2.5`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 ${c.iconText} flex-shrink-0 mt-0.5`} />
                      <span className={`text-sm font-semibold ${c.tableAiText} leading-relaxed`}>{row.ai}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 7 · KEY BENEFITS — Colorful metric cards
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-muted/20" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionBadge label="Key Benefits" colorClass={c.sectionBadgeBase} icon={Trophy} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.benefitsTitle ?? `Key Benefits of AI in ${data.industry}`}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {data.benefits.map((b, i) => {
                const BIcon = b.icon ?? CheckCircle2;
                const m = mp(i);
                const isFirst = i === 0;
                return (
                  <motion.div key={i} className={isFirst ? "col-span-2 lg:col-span-1" : ""}
                    initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <div className="h-full rounded-2xl overflow-hidden relative group cursor-default hover:-translate-y-2 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(145deg, ${m.solid}12, ${m.solid}06, transparent)`,
                        border: `2px solid ${m.solid}30`,
                        boxShadow: `0 4px 20px ${m.solid}15`,
                      }}>
                      {/* Top gradient bar */}
                      <div className="h-[4px]" style={{ background: `linear-gradient(90deg, ${m.solid}, ${m.solid}50)` }} />
                      {/* Glow spot */}
                      <div className="absolute top-8 right-4 w-24 h-24 rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"
                        style={{ background: `radial-gradient(circle, ${m.solid}30, transparent)` }} />
                      <div className="p-7 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                          style={{ background: `${m.solid}20`, border: `2px solid ${m.solid}40`, boxShadow: `0 8px 20px ${m.solid}30` }}>
                          <BIcon className="w-7 h-7" style={{ color: m.solid }} />
                        </div>
                        <AnimatedCounter value={b.value} className={`text-5xl font-black mb-2 leading-none block`} style={{ color: m.solid } as React.CSSProperties} />
                        <div className="font-bold text-base mb-2 text-foreground">{b.title}</div>
                        {b.detail && <p className="text-sm text-muted-foreground leading-relaxed">{b.detail}</p>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 8 · USE CASES SUMMARY — Impact cards with numbered badges
        ══════════════════════════════════════════════════════════════════════ */}
        <section id="use-cases" className="py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
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
                    <div className="h-full rounded-2xl border-2 bg-background p-5 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
                      style={{ borderColor: `${m.solid}30` }}>
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${m.solid}, ${m.solid}40, transparent)` }} />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-4 h-4" style={{ color: m.solid }} />
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${m.solid}, ${m.solid}cc)`, boxShadow: `0 8px 20px ${m.solid}40` }}>
                          {uc.num}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-black text-sm mb-2 text-foreground leading-snug">{uc.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{uc.what}</p>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border"
                            style={{ color: m.solid, backgroundColor: `${m.solid}12`, borderColor: `${m.solid}30` }}>
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
        <section className="py-24 border-b border-border relative">
          <div className="absolute inset-0 bg-muted/30" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <SectionBadge label="Deep Dive" colorClass={c.sectionBadgeBase} icon={Lightbulb} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.useCasesDetailTitle ?? `How AI Solves ${data.industry} Bottlenecks`}
              </h2>
            </motion.div>

            <div className="space-y-3">
              {data.useCasesDetail.map((uc, i) => {
                const m = mp(i);
                const isOpen = openUseCase === i;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-xl bg-background' : 'border-border bg-background hover:border-muted-foreground/25'}`}
                      style={isOpen ? { borderColor: `${m.solid}50` } : undefined}>
                      <button className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors"
                        onClick={() => setOpenUseCase(isOpen ? null : i)} data-testid={`button-usecase-${i}`}>
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all duration-200 flex-shrink-0 shadow-sm text-white"
                            style={{ background: isOpen ? `linear-gradient(135deg, ${m.solid}, ${m.solid}cc)` : undefined, backgroundColor: isOpen ? undefined : "hsl(var(--muted))", color: isOpen ? "white" : "hsl(var(--muted-foreground))" }}>
                            {i + 1}
                          </div>
                          <span className="font-black text-base">{uc.title}</span>
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                          style={{ backgroundColor: isOpen ? `${m.solid}15` : undefined }}>
                          {isOpen
                            ? <ChevronUp className="w-4 h-4" style={{ color: m.solid }} />
                            : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                            <div className="px-6 pb-7 space-y-5 border-t border-border pt-5">
                              {uc.definition && (
                                <div className="rounded-xl p-4 border" style={{ backgroundColor: `${m.solid}08`, borderColor: `${m.solid}25` }}>
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
                                      <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ backgroundColor: `${m.solid}15`, border: `1px solid ${m.solid}30` }}>
                                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: m.solid }} />
                                      </div>
                                      <span className="text-foreground leading-relaxed">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {uc.services.map((svc, si) => (
                                  <Link key={si} href={svc.href}
                                    className="text-xs px-3 py-1.5 rounded-full font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1.5"
                                    style={{ backgroundColor: `${m.solid}12`, border: `1px solid ${m.solid}30`, color: m.solid }}>
                                    {svc.label} <ArrowUpRight className="w-3 h-3" />
                                  </Link>
                                ))}
                              </div>
                              {(uc.intelligence || uc.caseStudy) && (
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                  {uc.intelligence && <span className="italic">🧠 {uc.intelligence}</span>}
                                  {uc.caseStudy && (
                                    <Link href={uc.caseStudy.href} className="font-semibold hover:underline" style={{ color: m.solid }}>📋 {uc.caseStudy.label}</Link>
                                  )}
                                </div>
                              )}
                              <div className="rounded-2xl p-5 flex items-start gap-3"
                                style={{ backgroundColor: `${m.solid}08`, border: `2px solid ${m.solid}25` }}>
                                <Target className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: m.solid }} />
                                <div>
                                  <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: m.solid }}>Outcome</p>
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
            § 10 · AGIX FRAMEWORK — Connected gradient pipeline
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <SectionBadge label="AGIX Framework" colorClass={c.sectionBadgeBase} icon={Layers} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.frameworkTitle ?? `The AGIX ${data.industry} Intelligence Framework`}
              </h2>
              {data.frameworkSubtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">{data.frameworkSubtitle}</p>}
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
              {/* Connector line desktop */}
              <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-px pointer-events-none z-0"
                style={{ background: `linear-gradient(90deg, ${c.heroAccentGlow}15, ${c.heroAccentGlow}40, ${c.heroAccentGlow}15)` }} />
              {data.frameworkLayers.map((layer, i) => {
                const LayerIcon = layer.icon ?? Star;
                const m = mp(i);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="h-full rounded-2xl bg-background hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative"
                      style={{ border: `2px solid ${m.solid}25`, background: `linear-gradient(145deg, ${m.solid}06, transparent)` }}>
                      <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: `linear-gradient(90deg, ${m.solid}, ${m.solid}50)` }} />
                      <div className="p-6 pt-8">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg relative z-10"
                          style={{ background: `linear-gradient(135deg, ${m.solid}20, ${m.solid}10)`, border: `2px solid ${m.solid}35`, boxShadow: `0 8px 20px ${m.solid}25` }}>
                          <LayerIcon className="w-7 h-7" style={{ color: m.solid }} />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: m.solid }}>Layer {layer.num}</div>
                        <h3 className="font-black text-sm mb-2 text-foreground">{layer.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{layer.what}</p>
                        <p className="text-xs font-semibold italic" style={{ color: m.solid }}>{layer.how}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
        <section className="py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-muted/30" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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
                    <div className="h-full rounded-2xl bg-background p-5 flex gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group relative overflow-hidden"
                      style={{ border: `2px solid ${m.solid}22`, background: `linear-gradient(135deg, ${m.solid}05, transparent)` }}>
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${m.solid}80, transparent)` }} />
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md"
                        style={{ background: `${m.solid}18`, border: `2px solid ${m.solid}30` }}>
                        <ShieldCheck className="w-5 h-5" style={{ color: m.solid }} />
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
            § 12 · LIMITATIONS — Amber honesty panel
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <SectionBadge label="Honest Assessment" colorClass="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30" icon={AlertTriangle} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.limitationsTitle ?? `Limitations of AI in ${data.industry}`}
              </h2>
              <p className="text-muted-foreground max-w-2xl">We believe in radical transparency. Here's what AI can't fully solve — yet.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {data.limitations.map((lim, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="h-full rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 p-6 flex gap-4 hover:border-amber-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/60 to-transparent" />
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
            § 13 · PRICING — Card-based investment tiers
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-muted/20" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionBadge label="Transparent Pricing" colorClass="bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30" icon={DollarSign} />
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                {data.pricingTitle ?? `How Much Does ${data.industry} AI Cost?`}
              </h2>
              {data.pricingSubtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{data.pricingSubtitle}</p>}
            </motion.div>

            <div className={`grid gap-4 ${data.pricingRows.length <= 3 ? 'md:grid-cols-3' : data.pricingRows.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
              {data.pricingRows.map((row, i) => {
                const isHighlight = i === Math.floor(data.pricingRows.length / 2);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <div className={`h-full rounded-2xl p-6 flex flex-col relative overflow-hidden hover:-translate-y-1.5 transition-transform duration-300 ${isHighlight ? 'shadow-2xl' : ''}`}
                      style={{
                        border: isHighlight ? `2px solid ${c.heroAccentGlow}60` : '2px solid hsl(var(--border))',
                        background: isHighlight ? `linear-gradient(145deg, ${c.heroAccentGlow}10, ${c.heroAccentGlow}05, transparent)` : undefined,
                        boxShadow: isHighlight ? `0 8px 32px ${c.heroAccentGlow}20` : undefined,
                      }}>
                      {isHighlight && (
                        <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: `linear-gradient(90deg, ${c.heroAccentGlow}, ${c.heroAccentGlow}60)` }} />
                      )}
                      {isHighlight && (
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 self-start ${c.accentBg} ${c.accentText} border ${c.accentBorder}`}>
                          <Star className="w-2.5 h-2.5" /> Most Popular
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-1">
                        <Layers className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-black text-sm text-foreground">{row.system}</h3>
                      </div>
                      <div className="mt-4 mb-2">
                        <span className="text-2xl font-black text-green-500 dark:text-green-400">{row.investment}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                        <Clock className="w-3 h-3" /> {row.timeline}
                      </div>
                      {data.hasBestFor && row.bestFor && (
                        <div className="mt-auto pt-4 border-t border-border">
                          <p className="text-[11px] text-muted-foreground"><span className="font-bold">Best for:</span> {row.bestFor}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">Not sure which tier fits? We'll tell you — for free.</p>
              <Button asChild variant="outline" className={`border-2 ${c.frameBorder} ${c.accentText} hover:${c.accentBg} rounded-xl`}>
                <a href="#lead-form">Get a Free Scoping Call <ArrowRight className="w-4 h-4 ml-1.5" /></a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            § 14 · FUTURE OUTLOOK — Timeline roadmap with milestone cards
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${c.heroAccentGlow}08, transparent)` }} />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <SectionBadge label="2028 Outlook" colorClass="bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30" icon={Rocket} />
              <h2 className="text-3xl md:text-4xl font-black">
                {data.futureTitle ?? `The Future of AI in ${data.industry}`}
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-[35px] top-4 bottom-4 w-[2px]"
                style={{ background: `linear-gradient(180deg, ${c.heroAccentGlow}60, ${c.heroAccentGlow}20, transparent)` }} />

              <div className="space-y-4">
                {data.futureItems.map((item, i) => {
                  const m = mp(i);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <div className="flex items-start gap-5">
                        {/* Timeline node */}
                        <div className="w-[70px] h-[70px] rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-xl z-10"
                          style={{ background: `linear-gradient(135deg, ${m.solid}, ${m.solid}cc)`, boxShadow: `0 8px 24px ${m.solid}40` }}>
                          {item.num}
                        </div>
                        <div className="flex-1 rounded-2xl bg-background p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                          style={{ border: `2px solid ${m.solid}22`, background: `linear-gradient(135deg, ${m.solid}05, transparent)` }}>
                          <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0" />
                          <h3 className="font-black text-sm leading-relaxed" style={{ color: m.solid }}>{item.title}</h3>
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
                      className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 ${indC.border} ${indC.bg} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${indC.dot} group-hover:scale-125 transition-transform`} />
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
