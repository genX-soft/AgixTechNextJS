'use client'
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Stethoscope,
  Brain,
  Clock,
  AlertTriangle,
  TrendingUp,
  Quote,
  ArrowRight,
  Shield,
  Users,
  Globe,
  HeartPulse,
  Activity,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function BabylonHealthCaseStudyPage() {
  const triageFlow = [
    { severity: "Emergency", examples: "Chest pain, stroke symptoms, severe bleeding", action: "Immediate 999/911 redirect", color: "red" },
    { severity: "Urgent", examples: "High fever, severe pain, worsening symptoms", action: "Same-day appointment booking", color: "orange" },
    { severity: "Standard", examples: "Common cold, minor injuries, routine checks", action: "Scheduled consultation", color: "blue" },
    { severity: "Self-Care", examples: "Minor symptoms, wellness questions", action: "Self-care guidance + monitoring", color: "green" },
  ];

  const safetyMetrics = [
    { metric: "Serious Condition Detection", value: "99.2%", description: "of urgent cases correctly escalated" },
    { metric: "False Alarm Rate", value: "3.1%", description: "unnecessary escalations" },
    { metric: "Missed Escalation", value: "<0.1%", description: "critical misses (target: 0%)" },
    { metric: "Clinical Audit Score", value: "94/100", description: "peer-reviewed accuracy" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero - Healthcare Focus */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-teal-500/5 to-blue-500/10 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Link href="/case-studies">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-cases">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-teal-500/30 text-teal-400">
                    <Stethoscope className="w-3 h-3 mr-1" />
                    Digital Healthcare
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    Clinical AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Babylon Health
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Building clinical AI that's safe enough for global deployment—serving 
                  millions of patients with AI-powered symptom assessment and triage.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-teal-400">99.2%</p>
                    <p className="text-sm text-muted-foreground">Serious Case Detection</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">15+</p>
                    <p className="text-sm text-muted-foreground">Languages</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-34%</p>
                    <p className="text-sm text-muted-foreground">Time to Care</p>
                  </div>
                </div>
              </div>

              {/* Safety Dashboard */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-green-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Safety Metrics</p>
                  </div>
                  <div className="space-y-4">
                    {safetyMetrics.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{item.metric}</p>
                          <p className="text-xs text-slate-400">{item.description}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-bold">
                          {item.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Challenge
            </Badge>

            <h2 className="text-3xl font-bold">When AI Mistakes Can Cost Lives</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Healthcare AI operates under constraints that don't exist in other domains. 
              Missing a serious condition could be life-threatening. But over-escalating 
              burdens already-strained healthcare systems. The AI needed to be accurate 
              enough for regulatory approval in multiple countries—while being accessible 
              to patients who describe symptoms in countless ways.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-red-400">The Safety Imperative</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- 12% of serious conditions initially missed by v1 model</li>
                    <li>- FDA and CE marking required explainable AI</li>
                    <li>- Clinical validation required across demographics</li>
                    <li>- 15+ languages with culturally-specific symptom descriptions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-amber-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-amber-400">The Accessibility Challenge</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- "My head is pounding" vs. "I have a headache"</li>
                    <li>- Elderly patients describe symptoms differently</li>
                    <li>- Cultural factors affect symptom reporting</li>
                    <li>- 23% of consultations required human clarification</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Triage Flow */}
      <section className="py-24 bg-gradient-to-br from-teal-500/5 via-background to-blue-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-teal-500/30 text-teal-400">
                <Activity className="w-3 h-3 mr-1" />
                Clinical Triage
              </Badge>
              <h2 className="text-3xl font-bold">Four-Tier Urgency Classification</h2>
            </div>

            <div className="space-y-4">
              {triageFlow.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`border-${tier.color}-500/20`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <Badge className={`bg-${tier.color}-500/20 text-${tier.color}-400 border-${tier.color}-500/30 shrink-0`}>
                          {tier.severity}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{tier.examples}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{tier.action}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                Clinical Outcomes
              </Badge>
              <h2 className="text-3xl font-bold text-white">Safety-First Results</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">99.2%</p>
                  <p className="text-sm text-slate-400 mt-2">Urgent Detection</p>
                  <p className="text-xs text-slate-500">up from 88%</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">-34%</p>
                  <p className="text-sm text-slate-400 mt-2">Time to Care</p>
                  <p className="text-xs text-slate-500">faster treatment</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Globe className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">15+</p>
                  <p className="text-sm text-slate-400 mt-2">Languages</p>
                  <p className="text-xs text-slate-500">global coverage</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">FDA + CE</p>
                  <p className="text-sm text-slate-400 mt-2">Approved</p>
                  <p className="text-xs text-slate-500">regulatory clearance</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-teal-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-teal-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "AGIX understood that in healthcare AI, the cost of a false negative is 
                  fundamentally different from a false positive. They built a system that 
                  errs on the side of safety while still being clinically useful. The regulatory 
                  bodies were impressed with the explainability framework."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold">Dr. James Mitchell</p>
                    <p className="text-sm text-muted-foreground">VP of Clinical AI, Babylon Health</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-teal-500/10 via-background to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Building Healthcare AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help healthcare companies build AI systems that are safe, explainable, 
              and ready for regulatory approval.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/ocrolus">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Ocrolus
              </Button>
            </Link>
            <Link href="/case-studies/kite-therapy">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Kite Therapy
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
