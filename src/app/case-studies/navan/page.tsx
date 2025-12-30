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
  Plane,
  Target,
  Clock,
  TrendingUp,
  Quote,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Receipt,
  Globe,
  Building,
  XCircle,
  FileX,
} from "lucide-react";
import Link from "next/link";

export default function NavanCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-indigo-500/10 via-background to-violet-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">
                    <Plane className="w-3 h-3 mr-1" />
                    Business Travel
                  </Badge>
                  <Badge variant="outline" className="border-violet-500/30 text-violet-400">
                    Expense Management
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Navan
                </h1>

                <p className="text-xl text-muted-foreground">
                  AI assistant for business travel and expense management. Reducing travel 
                  costs by 23% while achieving 94% policy compliance automatically.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-400">-23%</p>
                    <p className="text-sm text-muted-foreground">Travel Costs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-violet-400">94%</p>
                    <p className="text-sm text-muted-foreground">Policy Compliance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-67%</p>
                    <p className="text-sm text-muted-foreground">Booking Time</p>
                  </div>
                </div>
              </div>

              {/* Spend Dashboard Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="w-6 h-6 text-indigo-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Spend Overview</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "This Month", amount: "$234,567", change: "-8%", status: "good" },
                      { label: "Forecast", amount: "$289,000", change: "On track", status: "good" },
                      { label: "Savings", amount: "$52,340", change: "+12%", status: "great" },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{stat.label}</p>
                          <p className="text-xs text-slate-400">{stat.change}</p>
                        </div>
                        <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 font-bold">
                          {stat.amount}
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

            <h2 className="text-3xl font-bold">Expense Management Chaos and Rampant Policy Violations</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Business travel was a nightmare for finance teams—employees booking off-policy flights, 
              submitting expenses weeks late, and generating mountains of receipts that required manual 
              review. Policy violations went undetected until audits, expense reports took 45 minutes 
              each, and finance had zero real-time visibility into travel spend. The result? Budget 
              overruns and frustrated employees.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <XCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">62%</p>
                  <p className="text-sm text-muted-foreground">Bookings with policy violations</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Receipt className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">45 min</p>
                  <p className="text-sm text-muted-foreground">Per expense report (manual)</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <FileX className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">$0</p>
                  <p className="text-sm text-muted-foreground">Real-time spend visibility</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Travel CFO Cockpit</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-indigo-400" />
                  Spend Governance Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "This Month", amount: "$234,567", change: "-8%" },
                      { label: "Forecast", amount: "$289,000", change: "On track" },
                      { label: "Savings", amount: "$52,340", change: "+12%" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.amount}</p>
                        <Badge variant="outline" className={`text-xs ${
                          stat.change.includes('-') || stat.change === 'On track' 
                            ? 'text-green-400 border-green-400/30' 
                            : 'text-green-400 border-green-400/30'
                        }`}>
                          {stat.change}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-3">Spend by Category</p>
                    <div className="space-y-3">
                      {[
                        { category: "Flights", amount: "$124,300", pct: 53 },
                        { category: "Hotels", amount: "$78,200", pct: 33 },
                        { category: "Ground Transport", amount: "$21,400", pct: 9 },
                        { category: "Meals & Incidentals", amount: "$10,667", pct: 5 },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.category}</span>
                            <span className="font-medium">{item.amount}</span>
                          </div>
                          <Progress value={item.pct} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-400" />
                  Policy Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-indigo-500/10">
                  <p className="text-4xl font-bold text-indigo-400">94%</p>
                  <p className="text-sm text-muted-foreground">Overall Compliance</p>
                </div>

                <div className="space-y-2">
                  {[
                    { rule: "Advance booking (14+ days)", status: "89%", color: "green" },
                    { rule: "Preferred airlines", status: "96%", color: "green" },
                    { rule: "Hotel rate caps", status: "91%", color: "green" },
                    { rule: "Receipt submission", status: "98%", color: "green" },
                  ].map((policy, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-xs">{policy.rule}</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {policy.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-indigo-500/5 via-background to-violet-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                <Globe className="w-3 h-3 mr-1" />
                Risk Intelligence
              </Badge>
              <h3 className="text-2xl font-bold mb-4">Real-Time Travel Risk Map</h3>
              
              <Card className="bg-slate-900">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {[
                      { region: "Europe (Western)", travelers: 24, risk: "Low", alerts: 0 },
                      { region: "Asia Pacific", travelers: 18, risk: "Moderate", alerts: 2 },
                      { region: "Latin America", travelers: 8, risk: "Low", alerts: 0 },
                      { region: "Middle East", travelers: 3, risk: "Elevated", alerts: 1 },
                    ].map((region, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            region.risk === 'Low' ? 'bg-green-400' :
                            region.risk === 'Moderate' ? 'bg-amber-400' :
                            'bg-red-400'
                          }`} />
                          <div>
                            <p className="text-sm text-white">{region.region}</p>
                            <p className="text-xs text-slate-500">{region.travelers} active travelers</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {region.alerts > 0 && (
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                              {region.alerts} alerts
                            </Badge>
                          )}
                          <Badge variant="outline" className={`text-xs ${
                            region.risk === 'Low' ? 'text-green-400 border-green-400/30' :
                            region.risk === 'Moderate' ? 'text-amber-400 border-amber-400/30' :
                            'text-red-400 border-red-400/30'
                          }`}>
                            {region.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Badge className="mb-4 bg-violet-500/20 text-violet-400 border-violet-500/30">
                <Receipt className="w-3 h-3 mr-1" />
                Expense Automation
              </Badge>
              <h3 className="text-xl font-bold mb-4">AI-Powered Expense Processing</h3>

              <div className="space-y-4">
                {[
                  { step: "Receipt capture", time: "Instant", accuracy: "99.2%" },
                  { step: "Category detection", time: "< 1 sec", accuracy: "97.8%" },
                  { step: "Policy check", time: "< 1 sec", accuracy: "100%" },
                  { step: "Approval routing", time: "Automatic", accuracy: "100%" },
                ].map((process, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{process.step}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{process.time}</Badge>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {process.accuracy}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="mt-4 bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Avg Expense Report Time</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm line-through text-muted-foreground">45 min</span>
                    <span className="text-2xl font-bold text-indigo-400">3 min</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-indigo-500/20">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-indigo-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Business travel used to mean policy violations, expense report 
                nightmares, and zero visibility. Now our AI books compliant trips 
                in seconds, auto-categorizes expenses, and gives finance real-time 
                spend visibility. We cut travel costs 23% while employees actually 
                enjoy the process."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                  RJ
                </div>
                <div>
                  <p className="font-semibold">Rachel Jensen</p>
                  <p className="text-sm text-muted-foreground">Head of Travel Operations, Navan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building AI for Business Travel?</h2>
          <p className="text-slate-400 mb-8">Let's create systems that control costs while delighting travelers.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/hungryroot">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Hungryroot
            </Button>
          </Link>
          <Link href="/case-studies/geovea">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Geovea
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
