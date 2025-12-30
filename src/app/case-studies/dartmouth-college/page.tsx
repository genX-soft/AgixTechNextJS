'use client'
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Target,
  Clock,
  TrendingUp,
  Quote,
  Ticket,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  FileText,
  MessageSquare,
  Headphones,
  Timer,
} from "lucide-react";
import Link from "next/link";

export default function DartmouthCollegeCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-green-500/10 via-background to-emerald-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Higher Education
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    IT Helpdesk
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Dartmouth College
                </h1>

                <p className="text-xl text-muted-foreground">
                  24/7 AI helpdesk for campus IT support. Achieving 74% ticket 
                  deflection with 2-minute average resolution time.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">74%</p>
                    <p className="text-sm text-muted-foreground">Ticket Deflection</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">24/7</p>
                    <p className="text-sm text-muted-foreground">Availability</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">4.7/5</p>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Ticket Triage Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Ticket className="w-6 h-6 text-green-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Ticket Status</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { lane: "Incoming", count: 127, color: "bg-slate-500" },
                      { lane: "AI Resolving", count: 89, color: "bg-green-500" },
                      { lane: "Human Review", count: 23, color: "bg-amber-500" },
                      { lane: "Resolved Today", count: 312, color: "bg-emerald-500" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <p className="text-sm font-medium text-white">{item.lane}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {item.count}
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
      <section className="py-16">
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

            <h2 className="text-3xl font-bold">Overwhelmed Help Desk Couldn't Keep Up With Student Demand</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Campus IT support was drowning in routine tickets—password resets, WiFi troubleshooting, 
              and software questions piled up faster than staff could respond. Students faced long wait 
              times, especially during peak hours and exam periods. After-hours support was non-existent, 
              leaving students stranded when they needed help most.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Headphones className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">0%</p>
                  <p className="text-sm text-muted-foreground">After-hours coverage</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Timer className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">47 min</p>
                  <p className="text-sm text-muted-foreground">Avg ticket resolution</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Ticket className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">1,200+</p>
                  <p className="text-sm text-muted-foreground">Weekly ticket backlog</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">IT Support Nerve Center</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-green-400" />
                  Ticket Triage Swim Lanes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { lane: "Incoming", count: 127, tickets: [
                      { title: "WiFi not connecting", priority: "high" },
                      { title: "Canvas login issue", priority: "medium" },
                      { title: "Printer not found", priority: "low" },
                    ]},
                    { lane: "AI Resolving", count: 89, tickets: [
                      { title: "Password reset", priority: "high" },
                      { title: "VPN setup help", priority: "medium" },
                      { title: "Email config", priority: "low" },
                    ]},
                    { lane: "Human Review", count: 23, tickets: [
                      { title: "Account locked", priority: "high" },
                      { title: "Hardware failure", priority: "high" },
                    ]},
                    { lane: "Resolved", count: 412, tickets: [
                      { title: "Software install", priority: "low" },
                      { title: "2FA setup", priority: "medium" },
                    ]},
                  ].map((lane, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium">{lane.lane}</span>
                        <Badge variant="outline" className="text-xs">{lane.count}</Badge>
                      </div>
                      <div className="space-y-2 min-h-[120px] p-2 rounded-lg bg-muted/50">
                        {lane.tickets.map((ticket, j) => (
                          <div key={j} className={`p-2 rounded text-xs ${
                            ticket.priority === 'high' ? 'bg-red-500/20 border-l-2 border-red-500' :
                            ticket.priority === 'medium' ? 'bg-amber-500/20 border-l-2 border-amber-500' :
                            'bg-slate-500/20 border-l-2 border-slate-500'
                          }`}>
                            {ticket.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  Live Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Resolution Rate</span>
                    <span className="text-green-400 font-medium">74%</span>
                  </div>
                  <Progress value={74} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Response Time</span>
                    <span className="text-green-400 font-medium">12 sec</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Knowledge Base Match</span>
                    <span className="text-green-400 font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Current Queue Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm">All systems operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-500/5 via-background to-emerald-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
                <FileText className="w-3 h-3 mr-1" />
                Knowledge Freshness
              </Badge>
              <h3 className="text-2xl font-bold mb-4">Knowledge Base Audit</h3>
              <p className="text-muted-foreground mb-6">
                AI continuously monitors knowledge articles for accuracy and 
                automatically flags outdated content based on resolution success rates.
              </p>

              <div className="space-y-3">
                {[
                  { article: "WiFi Setup Guide", status: "current", lastUpdated: "2 days ago", accuracy: 98 },
                  { article: "VPN Configuration", status: "current", lastUpdated: "1 week ago", accuracy: 95 },
                  { article: "Canvas Integration", status: "review", lastUpdated: "3 weeks ago", accuracy: 78 },
                  { article: "Printing Services", status: "outdated", lastUpdated: "2 months ago", accuracy: 62 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {item.status === 'current' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                      {item.status === 'review' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      {item.status === 'outdated' && <XCircle className="w-4 h-4 text-red-400" />}
                      <div>
                        <p className="text-sm font-medium">{item.article}</p>
                        <p className="text-xs text-muted-foreground">{item.lastUpdated}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      item.accuracy >= 90 ? 'text-green-400 border-green-400/30' :
                      item.accuracy >= 75 ? 'text-amber-400 border-amber-400/30' :
                      'text-red-400 border-red-400/30'
                    }`}>
                      {item.accuracy}% accurate
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Users className="w-3 h-3 mr-1" />
                Student Satisfaction
              </Badge>
              <h3 className="text-xl font-bold mb-4">Real-Time Feedback Pulse</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { metric: "Helpful Responses", value: "94%", trend: "+3%" },
                  { metric: "Issue Resolved", value: "87%", trend: "+5%" },
                  { metric: "Quick Response", value: "96%", trend: "+1%" },
                  { metric: "Would Use Again", value: "91%", trend: "+4%" },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-muted-foreground">{item.metric}</p>
                      <p className="text-xl font-bold text-green-400">{item.value}</p>
                      <p className="text-xs text-green-400">{item.trend}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-slate-900">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-400 mb-2">Recent Student Feedback</p>
                  <div className="space-y-2">
                    <p className="text-sm text-white italic">"Fixed my WiFi in literally 30 seconds. Way better than waiting in line at the IT desk."</p>
                    <p className="text-xs text-slate-500">- Class of 2026</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-green-500/20">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-green-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Students expect instant answers at 2 AM before a deadline. Our AI 
                helpdesk handles 74% of tickets without human intervention—password 
                resets, WiFi troubleshooting, software installs. Our IT staff now 
                focuses on complex issues that actually need expertise."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  JP
                </div>
                <div>
                  <p className="font-semibold">James Patterson</p>
                  <p className="text-sm text-muted-foreground">Director of Campus IT Services, Dartmouth College</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building AI for Campus IT?</h2>
          <p className="text-slate-400 mb-8">Let's create helpdesk systems that serve students around the clock.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/properti-ai">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Properti AI
            </Button>
          </Link>
          <Link href="/case-studies/innit">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Innit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
