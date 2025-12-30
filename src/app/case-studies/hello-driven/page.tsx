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
  Phone,
  Brain,
  Clock,
  AlertTriangle,
  TrendingUp,
  Quote,
  ArrowRight,
  Calendar,
  Users,
  Shield,
  CheckCircle2,
  Mic,
} from "lucide-react";
import Link from "next/link";

export default function HelloDrivenCaseStudyPage() {
  const callMetrics = [
    { metric: "Answer Rate", before: "33%", after: "78%", note: "Patients actually engage" },
    { metric: "Scheduling Conflicts", before: "23%", after: "3%", note: "Real-time availability" },
    { metric: "Call Duration", before: "4.2 min", after: "1.8 min", note: "Efficient conversations" },
    { metric: "No-Show Rate", before: "18%", after: "7%", note: "Better confirmations" },
  ];

  const voiceCapabilities = [
    { capability: "Natural Interruption Handling", description: "Patients can interrupt anytime without breaking flow" },
    { capability: "Medical Terminology", description: "Understands procedure names, medications, symptoms" },
    { capability: "Dialect Adaptation", description: "Adjusts to regional accents and speech patterns" },
    { capability: "HIPAA Compliance", description: "Encrypted calls, consent handling, audit trails" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-cyan-500/5 to-blue-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                    <Phone className="w-3 h-3 mr-1" />
                    Healthcare Voice AI
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    Patient Engagement
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Hello Driven
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  AI voice agents that patients actually answer—handling appointment 
                  scheduling, reminders, and outreach for thousands of healthcare practices.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">78%</p>
                    <p className="text-sm text-muted-foreground">Answer Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">-61%</p>
                    <p className="text-sm text-muted-foreground">No-Shows</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">50+</p>
                    <p className="text-sm text-muted-foreground">EHR Integrations</p>
                  </div>
                </div>
              </div>

              {/* Call Simulation */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-cyan-600/80 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Incoming Call</p>
                        <p className="text-xs text-white/70">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="p-6 space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-cyan-500/30 text-cyan-300 shrink-0">AI</Badge>
                      <p className="text-slate-300">Hi, this is Sarah from Dr. Johnson's office. I'm calling about your upcoming appointment...</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="bg-slate-700 text-slate-300 shrink-0">Patient</Badge>
                      <p className="text-slate-300">Oh yes, I actually need to reschedule. Do you have anything next Tuesday?</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="bg-cyan-500/30 text-cyan-300 shrink-0">AI</Badge>
                      <p className="text-slate-300">Let me check Dr. Johnson's availability... I have 2:30 PM and 4:15 PM open on Tuesday. Which works better for you?</p>
                    </div>
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

            <h2 className="text-3xl font-bold">Calls Patients Actually Answer</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Healthcare practices lose millions to no-shows and scheduling inefficiency. 
              But patients have learned to ignore automated calls—67% hung up within 10 
              seconds of realizing it was a robot. Hello Driven needed voice AI that 
              sounded human enough to earn patient trust.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-red-400">Why Patients Hang Up</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- Robotic, scripted opening lines</li>
                    <li>- Can't handle interruptions or questions</li>
                    <li>- Doesn't understand medical terms</li>
                    <li>- Long pauses feel unnatural</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-green-400">What Keeps Them Talking</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- Natural, conversational opening</li>
                    <li>- Handles interruptions seamlessly</li>
                    <li>- Understands context and intent</li>
                    <li>- Sub-300ms response latency</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Voice Capabilities */}
      <section className="py-24 bg-gradient-to-br from-cyan-500/5 via-background to-blue-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                <Brain className="w-3 h-3 mr-1" />
                Voice Intelligence
              </Badge>
              <h2 className="text-3xl font-bold">Healthcare-Specific Voice AI</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {voiceCapabilities.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">{item.capability}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
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
                Performance Metrics
              </Badge>
              <h2 className="text-3xl font-bold text-white">Transformation Results</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {callMetrics.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <p className="text-sm text-slate-400 mb-3">{item.metric}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg text-slate-500 line-through">{item.before}</span>
                        <ArrowRight className="w-5 h-5 text-slate-600" />
                        <span className="text-2xl font-bold text-white">{item.after}</span>
                      </div>
                      <p className="text-xs text-cyan-400">{item.note}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
            <Card className="border-cyan-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-cyan-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "Our practices were drowning in scheduling calls. Now patients actually 
                  engage with our AI—they tell us they didn't realize it wasn't a real person 
                  until we told them. No-shows are down 61%, and our staff can focus on 
                  patients in the office instead of being on the phone all day."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    KP
                  </div>
                  <div>
                    <p className="font-semibold">Karen Patterson</p>
                    <p className="text-sm text-muted-foreground">VP of Practice Operations, Hello Driven</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-cyan-500/10 via-background to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Building Healthcare Voice AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help healthcare companies build voice systems that patients trust and 
              engage with—improving outcomes while reducing operational burden.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/kite-therapy">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Kite Therapy
              </Button>
            </Link>
            <Link href="/case-studies/albertsons">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Albertsons
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
