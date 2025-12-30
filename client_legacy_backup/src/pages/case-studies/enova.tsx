import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  DollarSign,
  Brain,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Shield,
  TrendingUp,
  Quote,
  ArrowRight,
  Scale,
  FileSearch,
  BarChart3,
  User,
  Gauge,
  Eye,
  FileText,
  AlertCircle,
  ChevronRight,
  XCircle,
  Activity,
} from "lucide-react";
import { Link } from "wouter";

export default function EnovaCaseStudyPage() {
  const [selectedApplicant, setSelectedApplicant] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const applicantProfiles = [
    {
      name: "Maria S.",
      score: 720,
      income: "$62,000",
      dti: "28%",
      history: "4 years",
      decision: "Approved",
      amount: "$8,500",
      rate: "14.9%",
      factors: [
        { name: "Payment History", impact: "+45", color: "text-green-400" },
        { name: "Credit Utilization", impact: "+32", color: "text-green-400" },
        { name: "Account Age", impact: "+18", color: "text-green-400" },
        { name: "Recent Inquiries", impact: "-8", color: "text-red-400" },
      ],
      reasonCode: "Strong payment history and low utilization offset recent credit inquiries",
    },
    {
      name: "James T.",
      score: 640,
      income: "$48,000",
      dti: "42%",
      history: "2 years",
      decision: "Approved",
      amount: "$3,500",
      rate: "24.9%",
      factors: [
        { name: "Debt-to-Income", impact: "-22", color: "text-red-400" },
        { name: "Payment History", impact: "+28", color: "text-green-400" },
        { name: "Employment Stability", impact: "+15", color: "text-green-400" },
        { name: "Credit Mix", impact: "+8", color: "text-green-400" },
      ],
      reasonCode: "Elevated DTI mitigated by stable employment and positive payment trends",
    },
    {
      name: "Robert K.",
      score: 580,
      income: "$38,000",
      dti: "55%",
      history: "8 months",
      decision: "Declined",
      amount: "-",
      rate: "-",
      factors: [
        { name: "Debt-to-Income", impact: "-38", color: "text-red-400" },
        { name: "Credit History Length", impact: "-25", color: "text-red-400" },
        { name: "Recent Delinquency", impact: "-18", color: "text-red-400" },
        { name: "Income Verification", impact: "+12", color: "text-green-400" },
      ],
      reasonCode: "Primary factors: High DTI ratio (55%) and insufficient credit history length",
    },
  ];

  const complianceMetrics = [
    { category: "Model Documentation", before: 34, after: 98, requirement: "SR 11-7" },
    { category: "Adverse Action Codes", before: 0, after: 100, requirement: "ECOA" },
    { category: "Fair Lending Testing", before: 25, after: 100, requirement: "CFPB" },
    { category: "Bias Monitoring", before: 12, after: 95, requirement: "FTC" },
    { category: "Audit Trail Coverage", before: 45, after: 100, requirement: "SOX" },
  ];

  const riskDashboard = [
    { metric: "Model Stability Index", value: 98.2, target: 95, status: "healthy" },
    { metric: "Feature Drift Score", value: 0.8, target: 2.0, status: "healthy" },
    { metric: "Prediction Accuracy", value: 94.7, target: 90, status: "healthy" },
    { metric: "Bias Detection Rate", value: 0.2, target: 1.0, status: "healthy" },
  ];

  const current = applicantProfiles[selectedApplicant];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-emerald-500/5 to-blue-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    <Scale className="w-3 h-3 mr-1" />
                    Fintech AI
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    Credit Decisioning
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Enova International
                </h1>

                <p className="text-xl text-muted-foreground">
                  Explainable credit decisioning that passes regulatory scrutiny—processing millions 
                  of applications with 94.7% accuracy while maintaining full audit compliance.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">94.7%</p>
                    <p className="text-sm text-muted-foreground">Model Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">100%</p>
                    <p className="text-sm text-muted-foreground">Audit Compliance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-67%</p>
                    <p className="text-sm text-muted-foreground">Review Time</p>
                  </div>
                </div>
              </div>

              {/* Compliance Dashboard Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-green-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Risk Dashboard</p>
                  </div>
                  <div className="space-y-3">
                    {riskDashboard.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{item.metric}</p>
                          <p className="text-xs text-slate-400">Target: {item.target}</p>
                        </div>
                        <Badge className={`${item.status === 'healthy' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'} font-bold`}>
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

            <h2 className="text-3xl font-bold">Black-Box Models Don't Pass Regulatory Scrutiny</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Enova's credit models were highly accurate, but regulators demanded more. How do you explain 
              to a consumer why they were declined? How do you prove to examiners that your AI isn't 
              discriminating? Their existing ML models were essentially black boxes—great at predictions, 
              impossible to explain. Each audit took months and cost millions in compliance overhead.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <FileSearch className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">4 months</p>
                  <p className="text-sm text-muted-foreground">Per regulatory audit</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">0%</p>
                  <p className="text-sm text-muted-foreground">Adverse action explainability</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">$2.1M</p>
                  <p className="text-sm text-muted-foreground">Annual compliance cost</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Decision Explainer - Unique Structure */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Eye className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">AI Decision Explainer</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              See how every credit decision is now fully explainable—click any applicant to explore the AI reasoning
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Applicant Selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Select Applicant</p>
              {applicantProfiles.map((profile, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all ${selectedApplicant === i ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                    onClick={() => { setSelectedApplicant(i); setShowExplanation(false); }}
                    data-testid={`applicant-${i}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <User className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{profile.name}</p>
                            <p className="text-sm text-slate-400">Score: {profile.score}</p>
                          </div>
                        </div>
                        <Badge className={profile.decision === "Approved" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                          {profile.decision}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Decision Details */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <FileSearch className="w-5 h-5 text-emerald-400" />
                    Applicant Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-slate-700/50">
                      <p className="text-xs text-slate-400">Credit Score</p>
                      <p className="text-xl font-bold text-white">{current.score}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-700/50">
                      <p className="text-xs text-slate-400">Annual Income</p>
                      <p className="text-xl font-bold text-white">{current.income}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-700/50">
                      <p className="text-xs text-slate-400">Debt-to-Income</p>
                      <p className="text-xl font-bold text-white">{current.dti}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-700/50">
                      <p className="text-xs text-slate-400">Credit History</p>
                      <p className="text-xl font-bold text-white">{current.history}</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg border border-slate-600 bg-slate-700/30">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <p className="font-medium text-white">AI Decision</p>
                      </div>
                      <Badge className={current.decision === "Approved" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                        {current.decision}
                      </Badge>
                    </div>
                    {current.decision === "Approved" && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-400">Approved Amount</p>
                          <p className="text-lg font-semibold text-emerald-400">{current.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Interest Rate</p>
                          <p className="text-lg font-semibold text-blue-400">{current.rate}</p>
                        </div>
                      </div>
                    )}
                    <Button 
                      onClick={() => setShowExplanation(!showExplanation)} 
                      className="w-full gap-2"
                      variant="outline"
                      data-testid="button-show-explanation"
                    >
                      <Eye className="w-4 h-4" />
                      {showExplanation ? "Hide" : "Show"} AI Reasoning
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <p className="text-sm font-medium text-slate-300">Contributing Factors (SHAP Analysis)</p>
                        <div className="space-y-3">
                          {current.factors.map((factor, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-32 text-sm text-slate-400">{factor.name}</div>
                              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.abs(parseInt(factor.impact)) * 2}%` }}
                                  transition={{ delay: i * 0.1, duration: 0.5 }}
                                  className={`h-full rounded-full ${factor.impact.startsWith('+') ? 'bg-green-500' : 'bg-red-500'}`}
                                />
                              </div>
                              <Badge className={factor.color.includes('green') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                                {factor.impact}
                              </Badge>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                          <div className="flex items-start gap-2">
                            <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-emerald-400">ECOA-Compliant Reason Code</p>
                              <p className="text-sm text-slate-300 mt-1">{current.reasonCode}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Scorecard - Unique Visual */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Scale className="w-3 h-3 mr-1" />
              Regulatory Compliance
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Compliance Transformation</h2>
            <p className="text-muted-foreground mt-2">From 12 open findings to examination success</p>
          </div>

          <div className="space-y-4">
            {complianceMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="w-40">
                        <p className="font-medium">{metric.category}</p>
                        <Badge variant="outline" className="mt-1 text-xs">{metric.requirement}</Badge>
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-2 w-24">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-muted-foreground">Before: {metric.before}%</span>
                          </div>
                          <div className="flex-1 relative h-3 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${metric.before}%` }}
                              viewport={{ once: true }}
                              className="absolute h-full bg-red-500/50 rounded-full"
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${metric.after}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                              className="absolute h-full bg-emerald-500 rounded-full"
                            />
                          </div>
                          <div className="flex items-center gap-2 w-24">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-400">After: {metric.after}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Risk Dashboard */}
      <section className="py-16 bg-gradient-to-b from-background to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Activity className="w-3 h-3 mr-1" />
              Real-Time Monitoring
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Model Risk Command Center</h2>
            <p className="text-muted-foreground mt-2">Continuous monitoring ensures ongoing compliance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskDashboard.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-slate-700 bg-slate-800/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Gauge className="w-5 h-5 text-purple-400" />
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{item.metric}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{item.value}</span>
                      <span className="text-sm text-slate-500">/ {item.target} target</span>
                    </div>
                    <Progress value={(item.value / item.target) * 50 + 50} className="mt-3 h-1" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-emerald-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "The CFPB examiner said our model governance was 'best-in-class.' That's not something you hear often in consumer finance. We went from remediation mode to being cited as an example of how to do AI right."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  JP
                </div>
                <div>
                  <p className="font-semibold">Jennifer Park</p>
                  <p className="text-sm text-muted-foreground">Director of Model Risk, Enova International</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Facing Regulatory Scrutiny?</h2>
          <p className="text-slate-400 mb-8">
            We help financial institutions build AI systems that regulators trust.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              All Cases
            </Button>
          </Link>
          <Link href="/case-studies/dave">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Dave
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
