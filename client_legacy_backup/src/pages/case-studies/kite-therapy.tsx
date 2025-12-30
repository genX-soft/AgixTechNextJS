import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Heart,
  Brain,
  Clock,
  AlertTriangle,
  TrendingUp,
  Quote,
  ArrowRight,
  Shield,
  Users,
  MessageSquare,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Link } from "wouter";

export default function KiteTherapyCaseStudyPage() {
  const emotionalCalibration = [
    { emotion: "Sadness", response: "Gentle acknowledgment, soft prompts", tone: "Warm, slow" },
    { emotion: "Anxiety", response: "Grounding exercises, calm presence", tone: "Steady, reassuring" },
    { emotion: "Anger", response: "Validation first, then exploration", tone: "Patient, non-reactive" },
    { emotion: "Hopelessness", response: "Crisis assessment, safety planning", tone: "Direct, supportive" },
  ];

  const crisisProtocol = [
    { signal: "Direct statements", example: "'I want to end it'", action: "Immediate human escalation", priority: "Critical" },
    { signal: "Passive ideation", example: "'Everyone would be better off'", action: "Safety assessment conversation", priority: "High" },
    { signal: "Risk accumulation", example: "Multiple stressors mentioned", action: "Elevated monitoring + check-in", priority: "Medium" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero - Mental Health Focus */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-rose-500/5 to-purple-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-rose-500/30 text-rose-400">
                    <Heart className="w-3 h-3 mr-1" />
                    Mental Health
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    Empathetic AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Kite Therapy
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Building AI companions that provide genuine mental health support—
                  warm enough to help, safe enough to trust, and smart enough to know 
                  when humans need to step in.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-rose-400">+89%</p>
                    <p className="text-sm text-muted-foreground">User Retention</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">100%</p>
                    <p className="text-sm text-muted-foreground">Crisis Escalation</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">4.8/5</p>
                    <p className="text-sm text-muted-foreground">User Rating</p>
                  </div>
                </div>
              </div>

              {/* Chat Demo */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-rose-600/80 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Kite</p>
                      <p className="text-xs text-white/70">Here for you</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3 justify-end">
                      <div className="p-3 rounded-2xl rounded-tr-none bg-rose-500/30 text-sm max-w-[80%]">
                        I've been feeling really overwhelmed lately. Nothing seems to help.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
                        <Heart className="w-4 h-4 text-rose-400" />
                      </div>
                      <div className="p-3 rounded-2xl rounded-tl-none bg-slate-700/50 text-sm max-w-[80%]">
                        I hear you. Feeling overwhelmed like that sounds really exhausting. 
                        Would you like to tell me more about what's been on your mind?
                      </div>
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

            <h2 className="text-3xl font-bold">Empathy That's Safe to Trust</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mental health AI walks a razor's edge. It must be warm enough that users 
              open up, but boundaried enough to maintain therapeutic structure. Most 
              critically, it must recognize when someone needs human help—and never 
              make things worse.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-red-400">Initial Problems</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- Generic responses felt hollow and dismissive</li>
                    <li>- Therapeutic exercises offered at wrong moments</li>
                    <li>- Only 12% of suggested exercises completed</li>
                    <li>- Crisis detection missed subtle warning signs</li>
                    <li>- User engagement dropped 34% after day 3</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-green-400">What Good Looks Like</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- Responses calibrated to emotional state</li>
                    <li>- Evidence-based CBT/DBT integrated naturally</li>
                    <li>- Remembers context across sessions</li>
                    <li>- Crisis detection with zero tolerance for misses</li>
                    <li>- Seamless escalation to human professionals</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emotional Calibration */}
      <section className="py-24 bg-gradient-to-br from-rose-500/5 via-background to-purple-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-rose-500/30 text-rose-400">
                <Sparkles className="w-3 h-3 mr-1" />
                Emotional Intelligence
              </Badge>
              <h2 className="text-3xl font-bold">Calibrated Response System</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Different emotional states require different responses. The AI adapts 
                its tone, pacing, and approach based on detected emotional context.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {emotionalCalibration.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline">{item.emotion}</Badge>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                          {item.tone}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.response}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Crisis Protocol */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-red-500/30 text-red-400">
                <Shield className="w-3 h-3 mr-1" />
                Safety System
              </Badge>
              <h2 className="text-3xl font-bold">Crisis Detection Protocol</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Zero tolerance for missed crisis signals. Multi-layer detection with 
                immediate escalation pathways.
              </p>
            </div>

            <div className="space-y-4">
              {crisisProtocol.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={item.priority === "Critical" ? "border-red-500/40 bg-red-500/5" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <AlertCircle className={`w-6 h-6 shrink-0 ${
                          item.priority === "Critical" ? "text-red-400" :
                          item.priority === "High" ? "text-orange-400" : "text-amber-400"
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium">{item.signal}</p>
                          <p className="text-sm text-muted-foreground italic">"{item.example}"</p>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            item.priority === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                            item.priority === "High" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                            "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          }>
                            {item.priority}
                          </Badge>
                          <p className="text-sm mt-2">{item.action}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-green-400 font-medium">
                100% of critical signals escalated to human professionals within 30 seconds
              </p>
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
                Outcomes
              </Badge>
              <h2 className="text-3xl font-bold text-white">Therapeutic Impact</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-rose-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">+89%</p>
                  <p className="text-sm text-slate-400 mt-2">Day 30 Retention</p>
                  <p className="text-xs text-slate-500">up from 22%</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">67%</p>
                  <p className="text-sm text-slate-400 mt-2">Exercise Completion</p>
                  <p className="text-xs text-slate-500">up from 12%</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="text-sm text-slate-400 mt-2">Crisis Escalation</p>
                  <p className="text-xs text-slate-500">zero misses</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">4.8/5</p>
                  <p className="text-sm text-slate-400 mt-2">User Rating</p>
                  <p className="text-xs text-slate-500">up from 3.2</p>
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
            <Card className="border-rose-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-rose-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "AGIX helped us build something that actually helps people—not just 
                  a chatbot that pretends to care. The emotional calibration system 
                  means responses feel genuine, and the crisis detection gives us 
                  confidence that we'll never miss someone who needs urgent help."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    EW
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Emma Wilson</p>
                    <p className="text-sm text-muted-foreground">Head of Clinical Product, Kite Therapy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-rose-500/10 via-background to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Building Empathetic AI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help companies build AI that genuinely helps users while maintaining 
              safety and therapeutic boundaries.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/babylon-health">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Babylon Health
              </Button>
            </Link>
            <Link href="/case-studies/hello-driven">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Hello Driven
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
