'use client'

import { useState } from "react";
import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";
import { useToast } from "@/hooks/use-toast";
import type { ServiceData } from "@/lib/services-data";
import Link from "next/link";
import {
  Network, Workflow, Eye, TrendingUp, Phone, MessageSquare,
  Sparkles, Database, ArrowRight, CheckCircle2, Check,
  Loader2, Quote, Shield, Zap, ChevronRight, Star, Home,
  BookOpen, ExternalLink, ShieldCheck, AlertTriangle, ListChecks,
} from "lucide-react";

// ─── Icon Map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Network, Workflow, Eye, TrendingUp, Phone, MessageSquare,
  Sparkles, Database,
};

// ─── Color Utilities ──────────────────────────────────────────────────────────
function hex(h: string, alpha = 1): string {
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── 2-Column Lead Form Section ───────────────────────────────────────────────
function LeadFormSection({ data }: { data: ServiceData }) {
  const { toast } = useToast();
  const { celebrate } = useCelebration();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    role: "", message: "", companySize: "", timeline: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Name and email are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const res = await submitLead(
      { ...form },
      { formType: `service-${data.slug}`, source: `service-page-${data.slug}`, ctaLocation: "service-page-lead-form" }
    );
    setLoading(false);
    if (res.success) {
      setSubmitted(true);
      celebrate();
    } else {
      toast({ title: "Submission failed.", description: res.error, variant: "destructive" });
    }
  }

  const serviceName = data.h1.split(':')[0].trim();

  const bullets = [
    `Free ${serviceName} scoping session — no generic pitches`,
    "Tailored approach mapped to your exact use case",
    "Clear implementation roadmap & realistic timeline",
    `Transparent pricing from $5,000 — no hidden fees`,
    "Response within 1 business day",
  ];

  return (
    <section id="lead-form" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(135deg, #020817 0%, ${hex(data.colorHex, 0.18)} 50%, #020817 100%)` }} />
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl -z-10 opacity-30"
        style={{ background: data.colorHex }} />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-3xl -z-10 opacity-20"
        style={{ background: data.colorHex }} />
      <div className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 text-white/70 mb-5">
            <Sparkles className="w-3 h-3" style={{ color: data.colorHex }} /> Free Consultation
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Ready to Build {serviceName}?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Tell us your biggest challenge and we'll map out exactly how {serviceName} can solve it — with real timelines, real costs, and a clear starting point.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_480px] gap-10 items-start">
          {/* Left: content / SEO */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-6">
            <div className="space-y-3">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: hex(data.colorHex, 0.3) }}>
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/80 text-sm leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 relative">
              <Quote className="w-8 h-8 opacity-40 mb-3" style={{ color: data.colorHex }} />
              <p className="text-white/80 text-sm leading-relaxed italic mb-4">"{data.originalQuote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: hex(data.colorHex, 0.3) }}>
                  <span className="text-white text-xs font-black">SS</span>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Santosh Singh</p>
                  <p className="text-white/50 text-xs">Founder & CEO, AGIX Technologies</p>
                </div>
              </div>
            </div>

            {/* AGIX delivery stats inline */}
            {data.heroStats && (
              <div className="flex flex-wrap gap-6 pt-2">
                {data.heroStats.slice(0, 3).map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-black" style={{ color: data.colorHex }}>{s.value}</div>
                    <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <ShieldCheck className="w-4 h-4 text-white/30 flex-shrink-0" />
              <p className="text-xs text-white/30">Confidential. We never sell data or send spam.</p>
            </div>
          </motion.div>

          {/* Right: glass form card */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="h-1.5 w-full" style={{ background: data.colorHex }} />
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 border-2"
                      style={{ background: hex(data.colorHex, 0.15), borderColor: hex(data.colorHex, 0.4) }}>
                      <CheckCircle2 className="w-10 h-10" style={{ color: data.colorHex }} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">Request Received!</h3>
                    <p className="text-white/60">Our team will reach out within one business day with a tailored {serviceName} strategy.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <h3 className="text-xl font-black text-white mb-1">Get Your Free Scoping Call</h3>
                      <p className="text-sm text-white/50">Takes 60 seconds. No commitment required.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Name *</Label>
                          <Input className="h-11 bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40"
                            placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)}
                            data-testid="input-name" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Work Email *</Label>
                          <Input type="email" className="h-11 bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40"
                            placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)}
                            data-testid="input-email" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Company</Label>
                          <Input className="h-11 bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40"
                            placeholder="Company name" value={form.company} onChange={e => set("company", e.target.value)}
                            data-testid="input-company" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Phone</Label>
                          <Input className="h-11 bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40"
                            placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => set("phone", e.target.value)}
                            data-testid="input-phone" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Company Size</Label>
                          <Select value={form.companySize} onValueChange={v => set("companySize", v)}>
                            <SelectTrigger className="h-11 bg-white/10 border-white/15 text-white [&_[data-placeholder]]:text-white/30"
                              data-testid="select-company-size">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-10">1–10 employees</SelectItem>
                              <SelectItem value="11-50">11–50 employees</SelectItem>
                              <SelectItem value="51-200">51–200 employees</SelectItem>
                              <SelectItem value="201-500">201–500 employees</SelectItem>
                              <SelectItem value="500+">500+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-white/70 mb-1.5 block">Timeline</Label>
                          <Select value={form.timeline} onValueChange={v => set("timeline", v)}>
                            <SelectTrigger className="h-11 bg-white/10 border-white/15 text-white [&_[data-placeholder]]:text-white/30"
                              data-testid="select-timeline">
                              <SelectValue placeholder="When to start?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-month">Within 1 month</SelectItem>
                              <SelectItem value="1-3-months">1–3 months</SelectItem>
                              <SelectItem value="3-6-months">3–6 months</SelectItem>
                              <SelectItem value="exploring">Just exploring</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-white/70 mb-1.5 block">What are you trying to solve?</Label>
                        <Textarea
                          className="min-h-[90px] resize-none bg-white/10 border-white/15 text-white placeholder:text-white/30 focus:border-white/40"
                          placeholder="Briefly describe your challenge or goal…"
                          rows={3} value={form.message} onChange={e => set("message", e.target.value)}
                          data-testid="input-message" />
                      </div>
                      <Button type="submit" size="lg" disabled={loading}
                        className="w-full h-13 text-base font-bold text-white border-0 hover:opacity-90"
                        style={{ background: data.colorHex }} data-testid="button-submit-lead">
                        {loading
                          ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending…</>
                          : <>Get a Free Scoping Call <ArrowRight className="w-5 h-5 ml-2" /></>}
                      </Button>
                      <p className="text-xs text-center text-white/30">No commitment · Response within 24 hours</p>
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

// ─── Main Template ─────────────────────────────────────────────────────────────
export default function ServicePageTemplate({ data }: { data: ServiceData }) {
  const Icon = ICON_MAP[data.icon] ?? Sparkles;
  const faqs = documentFAQs[data.slug] ?? [];
  const serviceName = data.h1.split(':')[0].trim();

  const accentFaint = hex(data.colorHex, 0.08);
  const accentLight = hex(data.colorHex, 0.12);
  const accentMid = hex(data.colorHex, 0.2);
  const accentBorder = hex(data.colorHex, 0.3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainHeader />

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-width. AGIX delivery stats at bottom.
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#020817] pb-0 pt-24 md:pt-32">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${hex(data.colorHex, 0.22)} 0%, transparent 70%)` }} />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: data.colorHex }} />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: data.colorHex }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.15) 39px,rgba(255,255,255,.15) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.15) 39px,rgba(255,255,255,.15) 40px)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-10">
            <ol className="flex items-center gap-1.5 text-xs text-white/40 flex-wrap">
              <li>
                <Link href="/" className="flex items-center gap-1 hover:text-white/70 transition-colors">
                  <Home className="w-3 h-3" /><span>Home</span>
                </Link>
              </li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/services" className="hover:text-white/70 transition-colors">Services</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-white/70 font-medium">{serviceName}</li>
            </ol>
          </nav>

          {/* Hero centre content */}
          <div className="max-w-4xl mx-auto text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: hex(data.colorHex, 0.18), border: `1px solid ${hex(data.colorHex, 0.4)}` }}>
                <Icon className="w-5 h-5" style={{ color: data.colorHex }} />
              </div>
              <Badge className="text-xs px-3 py-1.5 border-0 text-white font-medium tracking-wide"
                style={{ background: hex(data.colorHex, 0.25) }}>
                {data.heroTag}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-[2.25rem] md:text-[2.75rem] font-extrabold leading-[1.18] tracking-tight mb-5">
              {data.h1.includes(':') ? (
                <>
                  <span style={{ color: data.colorHex }}>{data.h1.split(':')[0]}:</span>
                  <span className="text-white">{data.h1.split(':').slice(1).join(':')}</span>
                </>
              ) : (
                <span className="text-white">{data.h1}</span>
              )}
            </h1>

            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto line-clamp-3">
              {data.directAnswer}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <a href="#lead-form">
                <Button className="text-white font-semibold px-7 py-2.5 rounded-xl text-sm shadow-lg hover:opacity-90 transition-opacity"
                  style={{ background: data.colorHex }} data-testid="button-hero-cta">
                  Get Free Scoping Call <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline"
                  className="font-semibold px-7 py-2.5 rounded-xl text-sm border-white/20 text-white/80 hover:bg-white/5 transition-colors">
                  See How It Works <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>

            <p className="text-[11px] text-white/25 tracking-wide">
              Last updated: {data.lastUpdated} · AGIX Technologies
            </p>
          </div>

          {/* ── AGIX Delivery Stats — integrated into hero ── */}
          {data.heroStats && (
            <div className="max-w-5xl mx-auto pb-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${hex(data.colorHex, 0.3)})` }} />
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest px-2">AGIX Delivery</span>
                <div className="flex-1 h-px"
                  style={{ background: `linear-gradient(90deg, ${hex(data.colorHex, 0.3)}, transparent)` }} />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {data.heroStats.map((s, i) => (
                  <motion.div key={i}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    initial={{ opacity: 0, y: 32, scale: 0.92 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    className="relative group">
                    <div className="relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300 hover:scale-105 cursor-default"
                      style={{
                        background: `linear-gradient(135deg, ${hex(data.colorHex, 0.12)} 0%, ${hex(data.colorHex, 0.04)} 100%)`,
                        borderColor: hex(data.colorHex, 0.3),
                      }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                        style={{ background: `radial-gradient(ellipse at 50% 50%, ${hex(data.colorHex, 0.15)} 0%, transparent 70%)` }} />
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                        style={{ background: `linear-gradient(90deg, transparent, ${data.colorHex}, transparent)` }} />
                      <div className="relative">
                        <div className="text-3xl md:text-4xl font-extrabold mb-2 tabular-nums"
                          style={{ color: data.colorHex }}>
                          {s.value}
                        </div>
                        <div className="text-sm font-medium text-white/80">{s.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom fade */}
        <div className="h-16 mt-8"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIRECT ANSWER — What is [Service]?
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: data.colorHex }} />
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: data.colorHex }}>
                Direct Answer
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              What is {serviceName}?
            </h2>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl p-7 border"
                  style={{ background: accentFaint, borderColor: accentBorder }}>
                  <div className="absolute top-0 left-8 right-8 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${data.colorHex}, transparent)` }} />
                  <p className="text-foreground leading-relaxed text-base md:text-lg font-medium">
                    {data.directAnswer}
                  </p>
                </div>

                <div className="mt-5 rounded-xl p-4 flex gap-3 items-start"
                  style={{ background: hex(data.colorHex, 0.06), borderLeft: `3px solid ${data.colorHex}` }}>
                  <Quote className="w-5 h-5 shrink-0 mt-0.5" style={{ color: data.colorHex }} />
                  <div>
                    <p className="text-foreground/90 italic text-sm leading-relaxed">"{data.originalQuote}"</p>
                    <p className="text-muted-foreground text-xs mt-1.5">— {data.author}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Core capabilities
                </p>
                {data.components.items.slice(0, 4).map((item, i) => (
                  <motion.div key={i}
                    whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 16 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-border/50 bg-background hover:border-current transition-colors group"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = accentBorder)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "")}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5"
                      style={{ background: accentLight, color: data.colorHex }}>
                      {item.num}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MARKET DATA & IMPACT — Market-sourced stats
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${hex(data.colorHex, 0.06)} 0%, transparent 50%, ${hex(data.colorHex, 0.04)} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${hex(data.colorHex, 0.08)} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${hex(data.colorHex, 0.06)} 0%, transparent 50%)` }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-10">
            <Badge className="mb-3 border-0 text-white text-xs px-3 py-1" style={{ background: accentMid }}>
              Market Data &amp; Impact
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              The Numbers Behind {serviceName}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {data.stats.map((s, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                className="relative group cursor-default">
                <div className="relative overflow-hidden rounded-2xl p-6 text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background: hex(data.colorHex, 0.07),
                    borderColor: hex(data.colorHex, 0.25),
                  }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${hex(data.colorHex, 0.2)} 0%, transparent 60%)` }} />
                  <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent 10%, ${data.colorHex} 50%, transparent 90%)` }} />
                  <div className="relative">
                    <div className="text-3xl md:text-4xl font-extrabold mb-2 tabular-nums"
                      style={{ color: data.colorHex }}>
                      {s.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-1">{s.label}</div>
                    {s.source && (
                      <div className="text-[10px] text-muted-foreground font-mono">{s.source}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          AGIX AS YOUR PROVIDER — Why AGIX for this service
      ═══════════════════════════════════════════════════════════ */}
      {data.agixValue && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(135deg, ${hex(data.colorHex, 0.05)} 0%, transparent 60%)` }} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ background: data.colorHex }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: data.colorHex }}>
                  AGIX as Your Provider
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {data.agixValue.headline}
              </h2>
              <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
                {data.agixValue.body}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {data.agixValue.points.map((point, i) => (
                <motion.div key={i}
                  whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}>
                  <div className="h-full rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: accentFaint, borderColor: accentBorder }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: hex(data.colorHex, 0.2) }}>
                        <CheckCircle2 className="w-5 h-5" style={{ color: data.colorHex }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1.5">{point.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          AI MATURITY — Level table
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: data.colorHex }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: data.colorHex }}>
                Where Your Business Sits
              </span>
              <div className="w-1 h-5 rounded-full" style={{ background: data.colorHex }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{data.maturity.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.maturity.description}</p>
          </motion.div>

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Level</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">What it is</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What it does</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Key point</th>
                </tr>
              </thead>
              <tbody>
                {data.maturity.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 transition-colors"
                    style={row.highlight ? { background: accentFaint } : { background: "transparent" }}>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-foreground text-xs"
                        style={row.highlight ? { color: data.colorHex } : {}}>{row.level}</span>
                      {row.highlight && (
                        <Badge className="ml-2 text-[10px] px-1.5 py-0 text-white border-0"
                          style={{ background: data.colorHex }}>AGIX</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground hidden sm:table-cell">{row.what}</td>
                    <td className="px-4 py-4 text-foreground">{row.does}</td>
                    <td className="px-4 py-4 text-muted-foreground text-xs hidden md:table-cell">{row.limitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — Pipeline / Process steps
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20" id="how-it-works">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14">
            <Badge className="mb-4 border-0 text-white text-xs" style={{ background: accentMid }}>
              How It Works
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{data.pipeline.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.pipeline.description}</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-px hidden sm:block"
              style={{ background: `linear-gradient(to bottom, ${data.colorHex}, ${hex(data.colorHex, 0.1)})` }} />
            <div className="space-y-4">
              {data.pipeline.steps.map((step, i) => (
                <motion.div key={i}
                  whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -24 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.09 }}>
                  <div className="flex gap-5 items-start p-5 rounded-2xl border border-border/60 bg-background hover:shadow-md transition-all"
                    onMouseEnter={e => {
                      (e.currentTarget.style.borderColor = accentBorder);
                      (e.currentTarget.style.background = accentFaint);
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget.style.borderColor = "");
                      (e.currentTarget.style.background = "");
                    }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-sm relative z-10"
                      style={{ background: accentLight, color: data.colorHex, border: `2px solid ${hex(data.colorHex, 0.35)}` }}>
                      {step.num}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="font-bold text-foreground mb-1.5">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      {step.tools && step.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {step.tools.map(t => (
                            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                              style={{ background: accentFaint, color: data.colorHex, border: `1px solid ${hex(data.colorHex, 0.25)}` }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CAPABILITIES / COMPONENTS — Core architecture
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20"
        style={{ background: `linear-gradient(135deg, ${hex(data.colorHex, 0.05)} 0%, transparent 60%)` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14">
            <Badge className="mb-4 border-0 text-white text-xs" style={{ background: accentMid }}>
              Core Architecture
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{data.components.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.components.description}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.components.items.map((item, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 28 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                <Card className="h-full border-border/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${hex(data.colorHex, 0.06)} 0%, transparent 60%)` }}>
                  <div className="h-0.5 rounded-t-lg"
                    style={{ background: `linear-gradient(90deg, ${data.colorHex}, transparent)` }} />
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-xs"
                        style={{ background: accentMid, color: data.colorHex }}>
                        {item.num}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1.5 text-sm">{item.title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                        {item.tools && item.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {item.tools.map(t => (
                              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                                style={{ color: data.colorHex, borderColor: hex(data.colorHex, 0.3), background: accentFaint }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          REAL-WORLD USE CASES — Problem → Solution → Result
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14">
            <Badge className="mb-4 border-0 text-white" style={{ background: accentMid }}>
              Real-World Use Cases
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What This Looks Like in Practice</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Concrete examples of how AGIX deploys {serviceName} across industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.examples.map((ex, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 28 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="h-full rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-background flex flex-col">
                  {/* Card top stripe */}
                  <div className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, ${data.colorHex}, ${hex(data.colorHex, 0.35)})` }} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="font-bold text-foreground mb-4 text-base">{ex.title}</h3>

                    {/* Problem callout */}
                    <div className="flex items-start gap-2.5 mb-4 p-3.5 rounded-xl"
                      style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-0.5">The Problem</span>
                        <p className="text-sm text-foreground/80 leading-snug">{ex.problem}</p>
                      </div>
                    </div>

                    {/* Numbered solution steps */}
                    <div className="flex items-center gap-2 mb-3">
                      <ListChecks className="w-3.5 h-3.5" style={{ color: data.colorHex }} />
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: data.colorHex }}>
                        AGIX Solution
                      </span>
                    </div>
                    <ol className="space-y-2 mb-4 flex-1">
                      {ex.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                            style={{ background: hex(data.colorHex, 0.7) }}>
                            {j + 1}
                          </span>
                          <span className="text-sm text-foreground/90 leading-snug">{b}</span>
                        </li>
                      ))}
                    </ol>

                    {/* Tech tags */}
                    {ex.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {ex.tools.map(t => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                            style={{ color: data.colorHex, borderColor: hex(data.colorHex, 0.25), background: accentFaint }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Result metric — accent bg strip */}
                    <div className="rounded-xl px-4 py-3 flex items-center gap-3 mt-auto"
                      style={{ background: hex(data.colorHex, 0.12), border: `1px solid ${hex(data.colorHex, 0.3)}` }}>
                      <Zap className="w-4 h-4 shrink-0" style={{ color: data.colorHex }} />
                      <p className="text-sm font-bold text-foreground">{ex.result}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          COMPARISON TABLE
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{data.comparison.title}</h2>
            <p className="text-muted-foreground">See how AGIX's approach compares to the alternatives.</p>
          </motion.div>

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-4 font-semibold text-muted-foreground">Dimension</th>
                  <th className="text-left px-5 py-4 font-semibold text-muted-foreground">Traditional / Others</th>
                  <th className="text-left px-5 py-4 font-semibold" style={{ color: data.colorHex }}>{data.comparison.vsLabel}</th>
                </tr>
              </thead>
              <tbody>
                {data.comparison.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">{row.dimension}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.traditional}</td>
                    <td className="px-5 py-3.5 font-medium" style={{ color: data.colorHex }}>{row.agix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TECH STACK
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: accentFaint }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-8">
            <h2 className="text-xl font-bold text-foreground">Technology Stack</h2>
            <p className="text-muted-foreground text-sm mt-1">Best-in-class tools selected for your specific use case</p>
          </motion.div>
          <motion.div whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2.5 justify-center">
            {data.techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium border bg-background"
                style={{ borderColor: hex(data.colorHex, 0.3), color: data.colorHex }}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Transparent Pricing</h2>
            <p className="text-muted-foreground">Scope-based pricing. No retainers. No hidden fees. You own everything we build.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {data.pricing.map((tier, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 28 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <Card className={`h-full relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${tier.highlight ? "border-2 shadow-lg" : "border-border"}`}
                  style={tier.highlight ? { borderColor: data.colorHex } : {}}>
                  {tier.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: data.colorHex }} />
                  )}
                  {tier.highlight && (
                    <div className="absolute top-3 right-3">
                      <Badge className="text-[10px] text-white border-0" style={{ background: data.colorHex }}>
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-foreground mb-1">{tier.tier}</h3>
                    <div className="text-2xl font-extrabold mb-3" style={{ color: data.colorHex }}>{tier.range}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{tier.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border">
            <Shield className="w-5 h-5 shrink-0 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              All pricing is project-based. You own the IP, source code, and all systems we build.
              Pricing depends on complexity, integrations required, and deployment infrastructure.
              Contact us for a scoped estimate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FROM THE AGIX INSIGHTS — Related blog posts
      ═══════════════════════════════════════════════════════════ */}
      {data.relatedBlogs && data.relatedBlogs.length > 0 && (
        <section className="py-16"
          style={{ background: `linear-gradient(135deg, ${hex(data.colorHex, 0.04)} 0%, transparent 60%)` }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4" style={{ color: data.colorHex }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: data.colorHex }}>
                    From the AGIX Insights
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground">Deep Dives on {serviceName}</h2>
              </div>
              <Link href="/insights/" className="text-sm font-medium hover:underline hidden sm:flex items-center gap-1"
                style={{ color: data.colorHex }}>
                All articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.relatedBlogs.map((post, i) => (
                <motion.div key={i}
                  whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
                  <Link href={post.href} className="group block h-full">
                    <div className="h-full rounded-2xl border border-border/60 p-5 bg-background hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      onMouseEnter={e => (e.currentTarget.style.borderColor = accentBorder)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "")}>
                      <div className="h-0.5 rounded-full mb-4"
                        style={{ background: `linear-gradient(90deg, ${data.colorHex}, ${hex(data.colorHex, 0.3)})` }} />
                      <Badge className="text-[10px] mb-3 border-0 text-white"
                        style={{ background: hex(data.colorHex, 0.25) }}>
                        {post.tag}
                      </Badge>
                      <h3 className="font-bold text-foreground text-sm leading-snug mb-2">{post.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                        style={{ color: data.colorHex }}>
                        Read article <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          2-COLUMN LEAD FORM
      ═══════════════════════════════════════════════════════════ */}
      <LeadFormSection data={data} />

      {/* Trust bar */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> No retainers</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> You own the IP</span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Response within 24h</span>
            <span className="flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5" /> No commitment required</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} title={`${serviceName} — Questions Answered`} />
      )}

      <MainFooter />
    </div>
  );
}
