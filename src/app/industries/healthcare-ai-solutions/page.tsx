'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HeartPulse,
  Stethoscope,
  Brain,
  FileText,
  Shield,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowDown,
  Target,
  DollarSign,
  Building2,
  AlertCircle,
  Loader2,
  Activity,
  CalendarCheck,
  FileSearch,
  Eye,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  Layers,
  ShieldCheck,
  Sparkles,
  Calculator,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const heroValuePoints = [
  "Reduce patient intake & triage delays",
  "Support clinicians without replacing judgment",
  "Improve follow-ups, care continuity & engagement",
  "Minimize claim rejections & revenue leakage",
  "Maintain compliance, audit readiness & data governance",
];

const bottlenecks = [
  {
    id: "1",
    title: "Patient Intake & Triage Delays",
    icon: Clock,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    reality: [
      "Long waiting times at front desks",
      "Overcrowded OPDs",
      "Inconsistent triage decisions",
      "Manual symptom collection",
    ],
    impact: [
      "Poor patient experience",
      "Clinician frustration",
      "Delayed care escalation",
      "Increased operational chaos during peaks",
    ],
    whyHappens: "Patient intake is often manual, non-standardized, dependent on staff availability, and poorly integrated with clinical workflows.",
  },
  {
    id: "2",
    title: "Clinician Administrative Overload",
    icon: FileText,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    reality: [
      "Excessive documentation",
      "Multiple systems to update",
      "Constant context switching",
      "Less time with patients",
    ],
    impact: [
      "Burnout",
      "Reduced quality of care",
      "Lower clinician retention",
      "Slower patient throughput",
    ],
    whyHappens: "Clinical workflows are surrounded by manual data entry, repetitive non-clinical tasks, and poor information flow between systems.",
  },
  {
    id: "3",
    title: "Care Continuity & Follow-Up Gaps",
    icon: CalendarCheck,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    reality: [
      "Missed follow-ups",
      "Poor treatment adherence",
      "Fragmented patient journeys",
      "Lack of proactive outreach",
    ],
    impact: [
      "Readmissions",
      "Worse outcomes",
      "Lower patient trust",
      "Revenue leakage in value-based care models",
    ],
    whyHappens: "Follow-ups depend heavily on manual reminders, disconnected patient engagement systems, and overloaded care teams.",
  },
  {
    id: "4",
    title: "Diagnostic & Reporting Inefficiencies",
    icon: FileSearch,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    reality: [
      "Delayed test reports",
      "Manual result interpretation workflows",
      "Poor coordination between labs and clinicians",
    ],
    impact: [
      "Slower diagnosis",
      "Treatment delays",
      "Patient dissatisfaction",
      "Increased clinical risk",
    ],
    whyHappens: "Diagnostic workflows are often system-siloed, staff-intensive, and poorly automated in non-clinical areas.",
  },
  {
    id: "5",
    title: "Claims, Billing & Revenue Cycle Inefficiencies",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    reality: [
      "High claim rejection rates",
      "Slow reimbursements",
      "Manual audits",
      "Coding inconsistencies",
    ],
    impact: [
      "Revenue leakage",
      "Administrative overload",
      "Financial unpredictability",
    ],
    whyHappens: "Claims processes are rule-heavy, documentation-sensitive, prone to human error, and poorly supported by intelligence.",
  },
  {
    id: "6",
    title: "Compliance, Audit & Data Governance Risk",
    icon: Shield,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    reality: [
      "Regulatory audits",
      "Data misuse concerns",
      "Lack of traceability",
      "Fear of AI-related violations",
    ],
    impact: [
      "Slower innovation",
      "Over-cautious decision-making",
      "High legal exposure",
    ],
    whyHappens: "Most healthcare systems lack clear data access tracking, explainable decision logs, and AI governance frameworks.",
  },
  {
    id: "7",
    title: "Fragmented Healthcare Systems",
    icon: Layers,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    reality: [
      "HIS, EMR, lab systems not connected",
      "Information silos",
      "Manual coordination",
    ],
    impact: [
      "Errors",
      "Delays",
      "Poor decision-making",
      "Staff frustration",
    ],
    whyHappens: "Healthcare IT systems evolved over time — they were never designed as one intelligent ecosystem.",
  },
  {
    id: "8",
    title: "Lack of Real-Time Operational Visibility",
    icon: Eye,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    reality: [
      "Static dashboards",
      "Lagging reports",
      "Missing early warning signs",
      "Staff overload signals invisible",
    ],
    impact: [
      "Reactive management",
      "Firefighting culture",
      "Missed optimization opportunities",
    ],
    whyHappens: "Management sees what happened, not what's happening. Real-time visibility requires integrated intelligence.",
  },
];

const roleBasedBottlenecks = [
  { 
    id: "hospital",
    role: "Hospital Leadership",
    icon: Building2,
    description: "CMOs, CIOs, COOs managing large healthcare systems with complex operations",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    bottleneckIds: ["1", "2", "5", "6", "8"],
    recommendedSystemIds: ["1", "2", "5", "6"],
  },
  { 
    id: "clinic",
    role: "Clinics & Specialty Practices",
    icon: Stethoscope,
    description: "Multi-specialty and single-specialty clinics focused on patient experience",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    bottleneckIds: ["1", "2", "3"],
    recommendedSystemIds: ["1", "2", "3"],
  },
  { 
    id: "diagnostic",
    role: "Diagnostic Centers",
    icon: FileSearch,
    description: "Pathology labs and diagnostic centers handling high test volumes",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    bottleneckIds: ["4", "7"],
    recommendedSystemIds: ["4", "6"],
  },
  { 
    id: "digital",
    role: "Digital Health Platforms",
    icon: Activity,
    description: "Telemedicine and digital health providers scaling patient engagement",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    bottleneckIds: ["1", "3", "7"],
    recommendedSystemIds: ["1", "3", "6"],
  },
];

const aiSystems = [
  {
    id: "1",
    name: "Patient Intake & Triage Intelligence",
    shortName: "Intake & Triage AI",
    bottleneckSolved: "Patient intake delays, overcrowded OPDs, inconsistent triage",
    resolvesBottleneckIds: ["1"],
    relevantRoleIds: ["hospital", "clinic", "digital"],
    whatItDoes: [
      "Collects structured patient information before arrival",
      "Assists triage teams in prioritizing cases based on rules and symptoms",
      "Routes patients to the right care path faster",
    ],
    whatItDoesNot: [
      "No diagnosis",
      "No treatment decisions",
      "No autonomous escalation",
    ],
    whyItWorks: "Triage logic is configurable and transparent. Clinicians remain decision owners. Reduces front-desk pressure without risk.",
    integration: "HIS / EMR, Appointment & registration systems",
    timeline: "5-7 weeks",
    costRange: "$12K - $20K",
    impact: ["Reduced waiting time", "Improved patient flow", "Less staff stress during peak hours"],
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "2",
    name: "Clinical Workflow & Documentation Support",
    shortName: "Documentation AI",
    bottleneckSolved: "Clinician administrative overload and burnout",
    resolvesBottleneckIds: ["2"],
    relevantRoleIds: ["hospital", "clinic"],
    whatItDoes: [
      "Assists with clinical documentation and summaries",
      "Helps organize patient context across visits",
      "Reduces repetitive non-clinical cognitive load",
    ],
    whatItDoesNot: [
      "No diagnosis generation",
      "No clinical recommendations without review",
    ],
    whyItWorks: "Outputs are always reviewable. Clinicians approve final records. Improves time spent with patients.",
    integration: "EMR, Clinical note systems",
    timeline: "6-8 weeks",
    costRange: "$15K - $25K",
    impact: ["Reduced documentation time", "Improved clinician satisfaction", "Higher patient interaction quality"],
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "3",
    name: "Patient Engagement & Follow-Up Intelligence",
    shortName: "Follow-Up AI",
    bottleneckSolved: "Missed follow-ups, poor adherence, fragmented patient journeys",
    resolvesBottleneckIds: ["3"],
    relevantRoleIds: ["clinic", "digital"],
    whatItDoes: [
      "Supports appointment reminders and follow-ups",
      "Tracks adherence signals",
      "Escalates exceptions to care teams",
    ],
    whatItDoesNot: [
      "No medical advice",
      "No intrusive communication",
    ],
    whyItWorks: "Consent-based engagement. Clear escalation to humans. Improves continuity without overreach.",
    integration: "CRM / Patient engagement tools, Appointment systems",
    timeline: "4-6 weeks",
    costRange: "$8K - $15K",
    impact: ["Improved follow-up adherence", "Reduced readmissions", "Better patient experience"],
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "4",
    name: "Diagnostic & Reporting Workflow Intelligence",
    shortName: "Diagnostic AI",
    bottleneckSolved: "Diagnostic delays and reporting inefficiencies",
    resolvesBottleneckIds: ["4", "7"],
    relevantRoleIds: ["diagnostic"],
    whatItDoes: [
      "Assists in organizing diagnostic workflows",
      "Flags delays and inconsistencies",
      "Improves coordination between labs and clinicians",
    ],
    whatItDoesNot: [
      "No automated diagnosis",
      "No interpretation without clinician oversight",
    ],
    whyItWorks: "Focuses on workflow efficiency, not diagnosis. Reduces turnaround time safely.",
    integration: "LIS, EMR",
    timeline: "5-7 weeks",
    costRange: "$10K - $18K",
    impact: ["Faster report availability", "Reduced diagnostic delays", "Better clinical coordination"],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "5",
    name: "Claims & Revenue Cycle Intelligence",
    shortName: "Claims AI",
    bottleneckSolved: "Claim rejections, slow reimbursements, manual audits",
    resolvesBottleneckIds: ["5"],
    relevantRoleIds: ["hospital"],
    whatItDoes: [
      "Flags claim risk early",
      "Identifies documentation gaps",
      "Supports faster, cleaner submissions",
    ],
    whatItDoesNot: [
      "No auto-denials",
      "No black-box claim decisions",
    ],
    whyItWorks: "Explainable logic. Audit-ready records. Reduces revenue leakage without compliance risk.",
    integration: "Billing & claims systems, Revenue cycle platforms",
    timeline: "6-9 weeks",
    costRange: "$18K - $35K",
    impact: ["Reduced claim rejections", "Faster reimbursements", "More predictable revenue"],
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "6",
    name: "Compliance, Audit & Governance Intelligence Layer",
    shortName: "Governance AI",
    bottleneckSolved: "Compliance anxiety, audit risk, data governance issues",
    resolvesBottleneckIds: ["6", "8"],
    relevantRoleIds: ["hospital", "diagnostic", "digital"],
    whatItDoes: [
      "Tracks AI usage and data access",
      "Maintains decision logs",
      "Supports regulatory audits",
    ],
    whatItDoesNot: [],
    whyItWorks: "Full traceability. No hidden logic. Designed for regulators as well as clinicians.",
    integration: "All AI systems, Data access controls",
    timeline: "5-7 weeks",
    costRange: "$12K - $22K",
    impact: ["Reduced compliance risk", "Faster audits", "Increased leadership confidence"],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const roleBasedStartingPoints = [
  { role: "Hospitals & Large Systems", systems: "Patient Intake → Clinical Workflow → Claims Intelligence" },
  { role: "Clinics & Specialty Practices", systems: "Intake → Follow-Ups → Documentation Support" },
  { role: "Diagnostic Centers", systems: "Reporting Workflow → Integration → Compliance Layer" },
  { role: "Digital Health Platforms", systems: "Engagement → Intake → Governance Layer" },
];

const faqs = [
  {
    q: "Is AI safe to use in healthcare environments?",
    a: "Yes — when designed correctly. AGIX builds assistive AI systems with human-in-the-loop controls, explainability, and audit trails, ensuring AI supports care delivery without introducing clinical risk.",
  },
  {
    q: "Will AI replace doctors, nurses, or clinicians?",
    a: "No. AGIX does not build autonomous clinical decision systems. Our AI supports clinicians by reducing administrative burden and improving workflow efficiency, while final medical decisions always remain with humans.",
  },
  {
    q: "How does AGIX ensure patient data privacy?",
    a: "Patient data is handled with strict access controls, purpose limitation, and traceability. Data is never used to train public AI models and remains governed under healthcare data protection standards.",
  },
  {
    q: "Can AI integrate with our existing HIS or EMR systems?",
    a: "Yes. AGIX designs AI systems to integrate with existing HIS, EMR, LIS, and billing systems, avoiding costly replacements or workflow disruption.",
  },
  {
    q: "What healthcare processes benefit most from AI?",
    a: "Common high-impact areas include: Patient intake and triage, Clinical documentation support, Follow-ups and care continuity, Claims and revenue cycle workflows, and Compliance and audit readiness.",
  },
  {
    q: "How long does it take to implement healthcare AI?",
    a: "Most healthcare AI systems take 4–8 weeks to deploy, depending on integration depth, data readiness, and governance requirements.",
  },
  {
    q: "Is healthcare AI compliant with regulations?",
    a: "AGIX systems are designed with compliance, explainability, and traceability as first-class requirements, making them suitable for regulated healthcare environments.",
  },
  {
    q: "What happens if AI provides an incorrect recommendation?",
    a: "AI outputs are non-binding and reviewable. Clinicians and administrators always validate decisions before action is taken.",
  },
  {
    q: "Can small clinics and diagnostic centers use AI, or is it only for large hospitals?",
    a: "AGIX healthcare AI solutions are scalable — suitable for small clinics, diagnostic centers, specialty practices, and large hospital networks alike.",
  },
  {
    q: "How does AI help reduce clinician burnout?",
    a: "By assisting with documentation, triage support, and non-clinical tasks, AI reduces cognitive overload and allows clinicians to focus more on patient care.",
  },
  {
    q: "What kind of ROI should healthcare organizations expect?",
    a: "ROI is typically seen through: Reduced waiting times, Lower administrative load, Fewer claim rejections, Improved patient follow-up rates, and Better staff satisfaction.",
  },
  {
    q: "Can we start with a pilot or small deployment?",
    a: "Yes. Most organizations begin with one focused AI system and expand gradually once trust and value are established.",
  },
  {
    q: "Does AI make clinical workflows more complex?",
    a: "No. AGIX AI is designed to simplify workflows, not add extra steps. The goal is fewer screens, fewer manual tasks, and clearer information flow.",
  },
  {
    q: "How does AGIX handle AI governance and audits?",
    a: "Every AI action is logged, traceable, and reviewable. Governance layers ensure leadership can confidently answer 'who decided what, and why' during audits.",
  },
  {
    q: "Is healthcare AI suitable for telemedicine and digital health platforms?",
    a: "Yes. AGIX healthcare AI works well across in-person, telehealth, and hybrid care models, supporting scalable and compliant digital health operations.",
  },
];

const principles = [
  { num: 1, title: "Human-in-the-Loop by Design", desc: "AI assists decisions — it never replaces clinical judgment" },
  { num: 2, title: "Explainability at Every Step", desc: "Every recommendation has a clear, reviewable rationale" },
  { num: 3, title: "No Autonomous Clinical Actions", desc: "No diagnosis, treatment, or escalation happens without human approval" },
  { num: 4, title: "Audit-Ready Architecture", desc: "Every AI action is logged, traceable, and reviewable" },
  { num: 5, title: "Privacy & Consent First", desc: "Patient data is protected, access-controlled, and purpose-limited" },
];

function HealthcareSolutionFinder() {
  const [step, setStep] = useState(1);
  const [orgType, setOrgType] = useState<string | null>(null);
  const [primaryChallenge, setPrimaryChallenge] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [careModel, setCareModel] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const orgTypes = [
    { id: "hospital", label: "Hospital / Hospital Group", icon: Building2 },
    { id: "clinic", label: "Multi-specialty / Single-specialty Clinic", icon: Stethoscope },
    { id: "diagnostic", label: "Diagnostic / Pathology Center", icon: FileSearch },
    { id: "digital", label: "Digital Health / Telemedicine Platform", icon: Activity },
  ];

  const challenges = [
    { id: "intake", label: "Patient Intake & Triage Delays" },
    { id: "documentation", label: "Clinician Documentation Overload" },
    { id: "followups", label: "Follow-Up & Care Continuity Gaps" },
    { id: "diagnostics", label: "Diagnostic & Reporting Delays" },
    { id: "claims", label: "Claims & Revenue Cycle Issues" },
    { id: "compliance", label: "Compliance & Audit Readiness" },
  ];

  const careModels = [
    { id: "inpatient", label: "Inpatient-focused" },
    { id: "outpatient", label: "Outpatient-focused" },
    { id: "hybrid", label: "Hybrid care model" },
    { id: "virtual", label: "Virtual-first / Telemedicine" },
  ];

  const getRecommendation = () => {
    const recommendations: Record<string, { system: string; desc: string; timeline: string; cost: string; phase2: string }> = {
      intake: { system: "Patient Intake & Triage Intelligence", desc: "High patient volume and intake challenges indicate this as the safest starting point.", timeline: "5-7 weeks", cost: "$14K - $18K", phase2: "Clinical Documentation Support" },
      documentation: { system: "Clinical Workflow & Documentation Support", desc: "Reducing clinician admin burden improves satisfaction and care quality.", timeline: "6-8 weeks", cost: "$18K - $25K", phase2: "Diagnostic Workflow Intelligence" },
      followups: { system: "Patient Engagement & Follow-Up Intelligence", desc: "Improving adherence and reducing readmissions directly impacts outcomes.", timeline: "4-6 weeks", cost: "$10K - $15K", phase2: "Care Continuity Dashboard" },
      diagnostics: { system: "Diagnostic & Reporting Workflow Intelligence", desc: "Faster reports and better coordination reduce diagnostic delays.", timeline: "5-7 weeks", cost: "$12K - $18K", phase2: "Claims Processing Support" },
      claims: { system: "Claims & Revenue Cycle Intelligence", desc: "Reducing rejections and faster reimbursements improve financial health.", timeline: "6-9 weeks", cost: "$20K - $35K", phase2: "Prior Authorization Automation" },
      compliance: { system: "Compliance & Governance Intelligence Layer", desc: "Audit-ready systems with full traceability protect the organization.", timeline: "5-7 weeks", cost: "$15K - $22K", phase2: "Clinical Audit Dashboard" },
    };
    return primaryChallenge ? recommendations[primaryChallenge] : recommendations.intake;
  };

  const recommendation = getRecommendation();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setShowResult(true);
  };

  const handleBack = () => {
    if (showResult) setShowResult(false);
    else if (step > 1) setStep(step - 1);
  };

  const resetWizard = () => {
    setStep(1);
    setOrgType(null);
    setPrimaryChallenge(null);
    setVolume(null);
    setCareModel(null);
    setShowResult(false);
  };

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-blue-950/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Tool 1</Badge>
          <Badge variant="outline" className="border-blue-500/30 text-blue-400">Primary Decision Engine</Badge>
        </div>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-blue-500" />
          Healthcare AI Solution Finder
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Identify the single safest and highest-impact AI system to start with — based on your measurable bottlenecks.
        </p>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                      s === step ? "bg-blue-500 text-white" : s < step ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {s < step ? <CheckCircle2 className="w-3 h-3" /> : s}
                    </div>
                    {s < 4 && <div className={`w-6 sm:w-10 h-0.5 ${s < step ? "bg-green-500" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Organization Type</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {orgTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setOrgType(type.id)}
                        className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
                          orgType === type.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-hero-org-${type.id}`}
                      >
                        <type.icon className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Patient Volume (per day)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "small", label: "< 100" },
                      { id: "medium", label: "100-500" },
                      { id: "large", label: "500-2000" },
                      { id: "enterprise", label: "2000+" },
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVolume(v.id)}
                        className={`p-3 rounded-lg border text-center text-sm font-medium transition-all ${
                          volume === v.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-hero-volume-${v.id}`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Primary Operational Challenge</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {challenges.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setPrimaryChallenge(c.id)}
                        className={`p-3 rounded-lg border text-left text-sm font-medium transition-all ${
                          primaryChallenge === c.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-hero-challenge-${c.id}`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Care Model</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {careModels.map((cm) => (
                      <button
                        key={cm.id}
                        onClick={() => setCareModel(cm.id)}
                        className={`p-3 rounded-lg border text-center text-sm font-medium transition-all ${
                          careModel === cm.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-hero-care-${cm.id}`}
                      >
                        {cm.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {step > 1 && (
                  <Button variant="outline" size="sm" onClick={handleBack} data-testid="button-hero-wizard-back">
                    Back
                  </Button>
                )}
                <Button
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !orgType) ||
                    (step === 2 && !volume) ||
                    (step === 3 && !primaryChallenge) ||
                    (step === 4 && !careModel)
                  }
                  data-testid="button-hero-wizard-next"
                >
                  {step === 4 ? "See Recommendation" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Result Card */}
              <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">Recommended Starting AI System</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{recommendation.system}</h4>
                <p className="text-xs text-muted-foreground mb-1">Why This Fits Your Organization</p>
                <p className="text-sm text-muted-foreground mb-4">{recommendation.desc}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 bg-background/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Expected Timeline</p>
                    <p className="font-bold text-base">{recommendation.timeline}</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Cost Range</p>
                    <p className="font-bold text-base">{recommendation.cost}</p>
                  </div>
                </div>

                <div className="p-3 bg-background/30 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Phase-2 Roadmap</p>
                  <p className="text-sm font-medium">Next: {recommendation.phase2}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={resetWizard} data-testid="button-hero-wizard-reset">
                  Start Over
                </Button>
                <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600" asChild>
                  <a href="#lead-form" data-testid="button-hero-wizard-cta">
                    Discuss This Recommendation
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function LeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    orgType: "",
    challenge: "",
    patientVolume: "",
    country: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitLead(
      {
        name: formData.email,
        email: formData.email,
        industry: "healthcare",
        companySize: formData.patientVolume,
        challenges: [formData.challenge],
      },
      {
        formType: "healthcare-roadmap",
        source: "/industries/healthcare",
        ctaId: "healthcare-form-submit",
        ctaText: "Get My Healthcare AI Roadmap",
        ctaLocation: "/industries/healthcare",
        additionalMetadata: {
          orgType: formData.orgType,
          country: formData.country,
        },
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Request received",
        description: "We'll send your Healthcare AI Roadmap within 24 hours.",
      });

      setFormData({
        orgType: "",
        challenge: "",
        patientVolume: "",
        country: "",
        email: "",
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card id="lead-form" className="border-primary/20">
      <CardHeader className="text-center">
        <Badge className="mx-auto mb-2">
          <HeartPulse className="w-3 h-3 mr-1" />
          Healthcare AI Roadmap
        </Badge>
        <CardTitle className="text-2xl">Get a Healthcare AI Roadmap Built for Clinical Reality</CardTitle>
        <p className="text-muted-foreground">
          Start with clarity, not commitment.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orgType">Organization Type</Label>
              <Select
                value={formData.orgType}
                onValueChange={(v) => setFormData({ ...formData, orgType: v })}
              >
                <SelectTrigger id="orgType" data-testid="select-org-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital / Hospital Group</SelectItem>
                  <SelectItem value="clinic">Multi-specialty Clinic</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic Center</SelectItem>
                  <SelectItem value="digital">Digital Health Platform</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="challenge">Primary Challenge</Label>
              <Select
                value={formData.challenge}
                onValueChange={(v) => setFormData({ ...formData, challenge: v })}
              >
                <SelectTrigger id="challenge" data-testid="select-challenge">
                  <SelectValue placeholder="Select challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intake">Patient Intake & Triage</SelectItem>
                  <SelectItem value="documentation">Clinician Documentation</SelectItem>
                  <SelectItem value="followups">Follow-Up & Engagement</SelectItem>
                  <SelectItem value="claims">Claims & Revenue Cycle</SelectItem>
                  <SelectItem value="compliance">Compliance & Governance</SelectItem>
                  <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="patientVolume">Patient Volume</Label>
              <Select
                value={formData.patientVolume}
                onValueChange={(v) => setFormData({ ...formData, patientVolume: v })}
              >
                <SelectTrigger id="patientVolume" data-testid="select-volume">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100">Under 100/day</SelectItem>
                  <SelectItem value="100-500">100 - 500/day</SelectItem>
                  <SelectItem value="500-2000">500 - 2000/day</SelectItem>
                  <SelectItem value="2000-plus">2000+/day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="country">Country / Region</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g., United States"
                data-testid="input-country"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@organization.com"
                required
                data-testid="input-email"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit-lead">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Get My Healthcare AI Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This roadmap will help you identify your highest-impact bottlenecks, choose the safest AI starting point, and plan a phased, compliant rollout.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function DecisionToolsSection() {
  // Tool 2: Leakage Calculator State
  const [dailyPatients, setDailyPatients] = useState([150]);
  const [avgWaitTime, setAvgWaitTime] = useState([45]);
  const [noShowRate, setNoShowRate] = useState([15]);
  const [docTimePerPatient, setDocTimePerPatient] = useState([20]);
  const [claimRejectionRate, setClaimRejectionRate] = useState([8]);
  const [showLeakageResult, setShowLeakageResult] = useState(false);

  // Tool 3: Readiness Assessment State
  const [dataQuality, setDataQuality] = useState([3]);
  const [workflowMaturity, setWorkflowMaturity] = useState([3]);
  const [complianceSensitivity, setComplianceSensitivity] = useState([3]);
  const [changeReadiness, setChangeReadiness] = useState([3]);
  const [showReadinessResult, setShowReadinessResult] = useState(false);

  // Tool 2: Leakage Calculator Logic
  const calculateLeakage = () => {
    const workingDays = 250;
    const avgStaffCost = 35;
    const avgRevenuePerVisit = 150;
    const clinicianHourlyCost = 80;
    const avgClaimValue = 200;
    const monthlyClaimsBase = dailyPatients[0] * 22;

    const waitingCost = (avgWaitTime[0] / 60) * avgStaffCost * dailyPatients[0] * workingDays;
    const noShowCost = (noShowRate[0] / 100) * dailyPatients[0] * avgRevenuePerVisit * workingDays;
    const documentationCost = (docTimePerPatient[0] / 60) * clinicianHourlyCost * dailyPatients[0] * workingDays;
    const claimsLeakage = (claimRejectionRate[0] / 100) * avgClaimValue * monthlyClaimsBase * 12;

    const totalLeakage = waitingCost + noShowCost + documentationCost + claimsLeakage;

    const leakageBreakdown = [
      { name: "Waiting Time Costs", value: waitingCost, system: "Patient Intake & Triage Intelligence" },
      { name: "No-Show / Missed Appointments", value: noShowCost, system: "Patient Engagement & Follow-Up Intelligence" },
      { name: "Documentation Overhead", value: documentationCost, system: "Clinical Workflow & Documentation Support" },
      { name: "Claim Rejections", value: claimsLeakage, system: "Claims & Revenue Cycle Intelligence" },
    ].sort((a, b) => b.value - a.value);

    return { totalLeakage, leakageBreakdown };
  };

  // Tool 3: Readiness Assessment Logic
  const calculateReadiness = () => {
    const readinessScore = (dataQuality[0] + workflowMaturity[0] + changeReadiness[0]) / 3;
    const riskFlags: string[] = [];
    const allowedCategories: string[] = [];
    let deploymentStyle = "";

    if (complianceSensitivity[0] >= 4) {
      riskFlags.push("High Compliance Sensitivity — Governance Layer required");
    }
    if (workflowMaturity[0] < 3) {
      riskFlags.push("Low Workflow Maturity — Avoid automation-heavy AI");
    }
    if (dataQuality[0] < 3) {
      riskFlags.push("Data Quality concerns — Start with assistive tools only");
    }

    if (readinessScore < 2.5) {
      deploymentStyle = "Assistive AI Only";
      allowedCategories.push("Patient Intake & Triage Intelligence", "Follow-Up Intelligence");
    } else if (readinessScore < 3.5) {
      deploymentStyle = "Phased Deployment";
      allowedCategories.push("Intake AI", "Documentation Support", "Follow-Up Intelligence");
    } else {
      deploymentStyle = "Full Deployment Ready";
      allowedCategories.push("All AI Systems", "Including Claims & Diagnostic Intelligence");
    }

    if (complianceSensitivity[0] >= 4) {
      allowedCategories.push("Governance Layer (Required)");
    }

    return { readinessScore, riskFlags, allowedCategories, deploymentStyle };
  };

  const leakageResult = calculateLeakage();
  const readinessResult = calculateReadiness();

  return (
    <section id="decision-tools" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">
            <Calculator className="w-3 h-3 mr-1" />
            Decision Tools
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quantify Your Opportunity &{" "}
            <span className="text-primary">Assess AI Readiness</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Use these tools to understand the financial impact of inefficiencies and evaluate your organization's readiness for AI adoption.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tool 2: Operational Leakage Calculator */}
          <Card className="border-orange-500/20 bg-gradient-to-br from-slate-900/50 to-orange-950/30">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  Tool 2
                </Badge>
                <span className="text-xs text-muted-foreground">Cost Justification Engine</span>
              </div>
              <CardTitle className="text-xl">Operational Leakage Calculator</CardTitle>
              <p className="text-sm text-muted-foreground">
                Quantify hidden financial losses caused by inefficiencies — before AI investment.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Average Daily Patient Count</Label>
                    <span className="font-medium">{dailyPatients[0]}</span>
                  </div>
                  <Slider
                    value={dailyPatients}
                    onValueChange={setDailyPatients}
                    min={50}
                    max={500}
                    step={10}
                    data-testid="slider-daily-patients"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Average Waiting Time (minutes)</Label>
                    <span className="font-medium">{avgWaitTime[0]} min</span>
                  </div>
                  <Slider
                    value={avgWaitTime}
                    onValueChange={setAvgWaitTime}
                    min={10}
                    max={120}
                    step={5}
                    data-testid="slider-wait-time"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Missed Appointments / No-Shows (%)</Label>
                    <span className="font-medium">{noShowRate[0]}%</span>
                  </div>
                  <Slider
                    value={noShowRate}
                    onValueChange={setNoShowRate}
                    min={5}
                    max={40}
                    step={1}
                    data-testid="slider-no-show"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Avg Documentation Time per Patient (min)</Label>
                    <span className="font-medium">{docTimePerPatient[0]} min</span>
                  </div>
                  <Slider
                    value={docTimePerPatient}
                    onValueChange={setDocTimePerPatient}
                    min={5}
                    max={60}
                    step={5}
                    data-testid="slider-doc-time"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Claim Rejection Rate (%)</Label>
                    <span className="font-medium">{claimRejectionRate[0]}%</span>
                  </div>
                  <Slider
                    value={claimRejectionRate}
                    onValueChange={setClaimRejectionRate}
                    min={2}
                    max={25}
                    step={1}
                    data-testid="slider-claim-rejection"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowLeakageResult(!showLeakageResult)}
                data-testid="button-calculate-leakage"
              >
                {showLeakageResult ? "Hide Results" : "Calculate Annual Leakage"}
                <Calculator className="w-4 h-4 ml-2" />
              </Button>

              <AnimatePresence>
                {showLeakageResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Annual Leakage</p>
                      <p className="text-3xl font-bold text-orange-400">
                        ${Math.round(leakageResult.totalLeakage).toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Top Leakage Contributors:</p>
                      {leakageResult.leakageBreakdown.slice(0, 3).map((item, i) => (
                        <div key={i} className="p-3 bg-background/50 rounded-lg border border-border">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{item.name}</span>
                            <Badge variant="outline" className={i === 0 ? "border-red-500/50 text-red-400" : ""}>
                              ${Math.round(item.value).toLocaleString()}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Addressed by: <span className="text-primary">{item.system}</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <p className="text-sm font-medium text-green-400">Recommended Priority:</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Start with {leakageResult.leakageBreakdown[0]?.system} for highest ROI
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Tool 3: AI Readiness & Risk Assessment */}
          <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900/50 to-purple-950/30">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Tool 3
                </Badge>
                <span className="text-xs text-muted-foreground">Safety & Governance Gate</span>
              </div>
              <CardTitle className="text-xl">AI Readiness & Risk Assessment</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ensure AI adoption does not increase clinical or compliance risk.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Data Quality (1-5)</Label>
                    <span className="font-medium">{dataQuality[0]}/5</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Structured records, consistency across systems</p>
                  <Slider
                    value={dataQuality}
                    onValueChange={setDataQuality}
                    min={1}
                    max={5}
                    step={1}
                    data-testid="slider-data-quality"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Workflow Maturity (1-5)</Label>
                    <span className="font-medium">{workflowMaturity[0]}/5</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Standardized processes, clear handoffs</p>
                  <Slider
                    value={workflowMaturity}
                    onValueChange={setWorkflowMaturity}
                    min={1}
                    max={5}
                    step={1}
                    data-testid="slider-workflow-maturity"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Compliance Sensitivity (1-5)</Label>
                    <span className="font-medium">{complianceSensitivity[0]}/5</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Audit frequency, regulatory exposure</p>
                  <Slider
                    value={complianceSensitivity}
                    onValueChange={setComplianceSensitivity}
                    min={1}
                    max={5}
                    step={1}
                    data-testid="slider-compliance"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Change Readiness (1-5)</Label>
                    <span className="font-medium">{changeReadiness[0]}/5</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Staff openness, leadership alignment</p>
                  <Slider
                    value={changeReadiness}
                    onValueChange={setChangeReadiness}
                    min={1}
                    max={5}
                    step={1}
                    data-testid="slider-change-readiness"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-purple-500 hover:bg-purple-600"
                onClick={() => setShowReadinessResult(!showReadinessResult)}
                data-testid="button-assess-readiness"
              >
                {showReadinessResult ? "Hide Results" : "Assess AI Readiness"}
                <ShieldCheck className="w-4 h-4 ml-2" />
              </Button>

              <AnimatePresence>
                {showReadinessResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Readiness Score</p>
                      <p className="text-3xl font-bold text-purple-400">
                        {readinessResult.readinessScore.toFixed(1)} / 5
                      </p>
                      <Badge className={`mt-2 ${
                        readinessResult.readinessScore >= 3.5 ? "bg-green-500/20 text-green-400" :
                        readinessResult.readinessScore >= 2.5 ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {readinessResult.deploymentStyle}
                      </Badge>
                    </div>

                    {readinessResult.riskFlags.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          Risk Flags:
                        </p>
                        {readinessResult.riskFlags.map((flag, i) => (
                          <div key={i} className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <p className="text-xs text-yellow-400">{flag}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Allowed AI Categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {readinessResult.allowedCategories.map((cat, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium text-primary">Recommendation:</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {readinessResult.readinessScore < 2.5
                          ? "Start with Intake + Follow-Up AI only. Build trust before expanding."
                          : readinessResult.readinessScore < 3.5
                          ? "Phased deployment recommended. Add Governance Layer early."
                          : "Organization is ready for comprehensive AI adoption with proper governance."
                        }
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Execution Path Summary */}
        <Card className="mt-8 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">How to Start Safely — Execution Path</CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Based on risk level and readiness, follow this phased approach
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Phase 1</Badge>
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Assistive Intelligence</h4>
                <p className="text-xs text-muted-foreground mb-3">Low risk | High trust | Immediate value</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Patient Intake & Triage</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Documentation Support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" />Follow-Up Intelligence</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/20">Phase 2</Badge>
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Operational Optimization</h4>
                <p className="text-xs text-muted-foreground mb-3">Moderate complexity | Strong ROI</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500" />Claims Intelligence</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-yellow-500" />Diagnostic Workflow Support</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/20">Phase 3</Badge>
                  </div>
                </div>
                <h4 className="font-semibold mb-2">Governance & Scale</h4>
                <p className="text-xs text-muted-foreground mb-3">Long-term resilience</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-blue-500" />Compliance & Audit Intelligence</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-blue-500" />Cross-system visibility</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-blue-500" />AI usage monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA to next section */}
        <div className="text-center mt-8">
          <Button size="lg" variant="outline" asChild>
            <a href="#trust-compliance" data-testid="button-decision-tools-next">
              Understand Trust, Compliance & Responsible Healthcare AI
              <ArrowDown className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HealthcareIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);
  const [selectedSystem, setSelectedSystem] = useState(aiSystems[0]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* ==================== HERO SECTION ==================== */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-cyan-500/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="border-primary/30 text-primary">
                <HeartPulse className="w-3 h-3 mr-1" />
                Healthcare Industry
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                AI Solutions for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-primary">
                  Healthcare
                </span>
              </h1>

              <p className="text-xl font-medium text-foreground">
                Built for Clinical Trust, Operational Efficiency, and Regulatory Accountability
              </p>

              <p className="text-base text-muted-foreground">
                Design, deploy, and scale healthcare-grade AI systems that support clinicians, reduce operational load, improve patient experience, and remain explainable, auditable, and compliant.
              </p>

              {/* Hero Value Points */}
              <div className="space-y-2 py-4 border-y border-border">
                {heroValuePoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Right: Solution Finder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:mt-16"
            >
              <HealthcareSolutionFinder />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== PART 1: HEALTHCARE CONTEXT ==================== */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Healthcare Context
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Healthcare Is a High-Stakes Environment —{" "}
              <span className="text-primary">AI Must Respect That</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Healthcare is not an industry where speed alone defines success. Every operational delay, administrative inefficiency, or poor decision impacts patient outcomes, clinician well-being, institutional credibility, and regulatory exposure.
            </p>
          </motion.div>

          {/* Healthcare Pressures */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-foreground font-bold">Healthcare organizations operate under constant pressure:</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  "Rising patient volumes",
                  "Overburdened clinicians",
                  "Fragmented HIS / EMR systems",
                  "Increasing compliance requirements",
                  "Thin operational margins",
                ].map((item, i) => (
                  <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-6 text-cyan-400 font-semibold text-base">
                In this environment, AI cannot behave like a black box. It must be accurate, explainable, auditable, and human-controlled.
              </p>
            </CardContent>
          </Card>

          {/* Why Most Fail */}
          <Card className="mb-8 border-destructive/20 bg-gradient-to-br from-destructive/5 to-orange-500/5">
            <CardHeader>
              <CardTitle className="text-lg">Why Most Healthcare AI Initiatives Fail</CardTitle>
              <p className="text-sm text-muted-foreground">
                Most healthcare AI initiatives fail not because AI lacks capability, but because it is:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">The Problems:</h4>
                  <ul className="space-y-2">
                    {[
                      "Introduced without clinical context",
                      "Positioned as automation instead of support",
                      "Detached from real workflows",
                      "Hard to explain during audits",
                      "Difficult for clinicians to trust",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">As a result:</h4>
                  <ul className="space-y-2">
                    {[
                      "Clinicians resist adoption",
                      "Administrators limit scope",
                      "Innovation slows",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-center mt-6 text-foreground font-medium border-t border-border pt-4">
                AI succeeds in healthcare only when it strengthens trust — not when it replaces judgment.
              </p>
            </CardContent>
          </Card>

          {/* AGIX Approach */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-cyan-500/5">
            <CardHeader>
              <CardTitle className="text-xl text-center">How AGIX Approaches Healthcare AI Differently</CardTitle>
              <p className="text-center text-muted-foreground">
                AGIX builds healthcare-aligned AI systems, not generic tools. Our approach is grounded in five principles:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { num: 1, title: "Clinician-first design", desc: "AI assists, never decides" },
                  { num: 2, title: "Explainability by default", desc: "Every recommendation has a reason" },
                  { num: 3, title: "Human-in-the-loop control", desc: "No autonomous clinical actions" },
                  { num: 4, title: "Workflow integration", desc: "Works with existing HIS / EMR" },
                  { num: 5, title: "Audit & compliance ready", desc: "Traceable, reviewable, governed" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 bg-background rounded-lg border border-primary/10">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-primary">{item.num}</span>
                    </div>
                    <p className="font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-6 text-muted-foreground">
                We do not build "AI doctors." We build{" "}
                <span className="text-foreground font-medium">decision-support intelligence</span>{" "}
                that healthcare professionals can rely on.
              </p>
            </CardContent>
          </Card>

          {/* Who This Is For */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-foreground font-bold text-center">Who This Healthcare AI Is Designed For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Building2, label: "Hospitals & Hospital Groups" },
                  { icon: Stethoscope, label: "Multi-specialty & Single-specialty Clinics" },
                  { icon: FileSearch, label: "Diagnostic & Pathology Centers" },
                  { icon: Activity, label: "Digital Health & Telemedicine Platforms" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 bg-muted/50 rounded-lg">
                    <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground/70">
                Also designed for: <span className="text-foreground font-medium">CMOs, CIOs, COOs, and healthcare CXOs</span>
              </p>
              <p className="text-center mt-4 text-cyan-400 font-semibold">
                If you are exploring AI with patient safety, clinician trust, and compliance in mind — you're in the right place.
              </p>
            </CardContent>
          </Card>

          {/* Role of AI */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-foreground font-bold text-center">The Role of AI in Modern Healthcare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">In healthcare, AI should:</h4>
                  <ul className="space-y-2">
                    {[
                      "Assist, not replace",
                      "Clarify, not obscure",
                      "Accelerate, not compromise",
                      "Support humans, not override them",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">AGIX builds AI systems that:</h4>
                  <ul className="space-y-2">
                    {[
                      "Reduce cognitive and administrative load",
                      "Improve decision quality",
                      "Enhance patient experience",
                      "Preserve accountability at every step",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Context CTA */}
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <a href="#bottleneck-map" data-testid="button-context-cta">
                See the Real Bottlenecks AI Can Solve in Healthcare
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== PART 2: BOTTLENECK MAP ==================== */}
      <section id="bottleneck-map" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Bottleneck Map
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Healthcare Systems{" "}
              <span className="text-destructive">Break Under Daily Pressure</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Healthcare challenges don't come from one failure point. They emerge from many small breakdowns across clinical, administrative, financial, and compliance workflows. These bottlenecks exist across hospitals, clinics, diagnostic centers, and digital health platforms. The scale may differ — but the patterns are the same.
            </p>
          </motion.div>

          {/* Bottleneck Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {bottlenecks.map((bottleneck) => (
              <motion.div
                key={bottleneck.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedBottleneck(bottleneck)}
                className={`cursor-pointer p-4 rounded-lg border transition-all ${
                  selectedBottleneck.id === bottleneck.id
                    ? `border-2 ${bottleneck.color.replace("text-", "border-")} ${bottleneck.bgColor}`
                    : "border-border hover-elevate bg-card"
                }`}
                data-testid={`button-bottleneck-${bottleneck.id}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={`text-xs ${bottleneck.color}`}>
                    {bottleneck.id}
                  </Badge>
                  <bottleneck.icon className={`w-4 h-4 ${bottleneck.color}`} />
                </div>
                <p className="text-sm font-medium line-clamp-2">{bottleneck.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Selected Bottleneck Detail */}
          <motion.div
            key={selectedBottleneck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-destructive/20 mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${selectedBottleneck.bgColor} rounded-lg`}>
                    <selectedBottleneck.icon className={`w-6 h-6 ${selectedBottleneck.color}`} />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">Bottleneck {selectedBottleneck.id}</Badge>
                    <CardTitle>{selectedBottleneck.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-orange-500" />
                      What This Looks Like in Reality
                    </h4>
                    <ul className="space-y-2">
                      {selectedBottleneck.reality.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <XCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      Impact
                    </h4>
                    <ul className="space-y-2">
                      {selectedBottleneck.impact.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Why This Happens:</span>{" "}
                    <span className="text-muted-foreground">{selectedBottleneck.whyHappens}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Role-Based Reality Check - Synchronized View */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Role-Based Reality Check</h3>
              <p className="text-muted-foreground">
                Select your organization type to see relevant bottlenecks and recommended AI solutions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {roleBasedBottlenecks.map((roleItem) => {
                const roleBottlenecks = bottlenecks.filter(b => roleItem.bottleneckIds.includes(b.id));
                const roleSystems = aiSystems.filter(s => roleItem.recommendedSystemIds.includes(s.id));
                
                return (
                  <Card key={roleItem.id} className={`${roleItem.borderColor} border-2`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2.5 ${roleItem.bgColor} rounded-lg`}>
                          <roleItem.icon className={`w-5 h-5 ${roleItem.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{roleItem.role}</CardTitle>
                          <p className="text-xs text-muted-foreground">{roleItem.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Bottlenecks for this role */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          Key Bottlenecks:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {roleBottlenecks.map((b) => (
                            <Badge key={b.id} variant="outline" className={`text-xs ${b.color}`}>
                              {b.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Recommended AI Systems for this role */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          Recommended AI Solutions:
                        </p>
                        <div className="space-y-2">
                          {roleSystems.map((sys) => (
                            <div key={sys.id} className={`p-2.5 ${sys.bgColor} rounded-lg border ${roleItem.borderColor}`}>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className={`w-4 h-4 ${sys.color} shrink-0`} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{sys.shortName}</p>
                                  <p className="text-xs text-muted-foreground">{sys.timeline} | {sys.costRange}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href="#ai-systems" data-testid={`button-role-solutions-${roleItem.id}`}>
                            View Detailed Solutions
                            <ArrowRight className="w-3 h-3 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Key Insight */}
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 text-center mb-8">
            <p className="text-lg font-medium text-foreground">
              Healthcare systems don't fail because teams don't care.
            </p>
            <p className="text-muted-foreground mt-2">
              They fail because systems don't scale with human effort. AI's role is not to replace care —
              it is to remove friction where humans struggle most.
            </p>
          </div>

          {/* Transition CTA */}
          <div className="text-center">
            <Button size="lg" asChild>
              <a href="#ai-systems" data-testid="button-bottleneck-cta">
                See How These Bottlenecks Are Solved with Safe, Explainable Healthcare AI Systems
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== PART 3: AI SYSTEMS ==================== */}
      <section id="ai-systems" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-green-500/10 text-green-500 border-green-500/20">
              <Brain className="w-3 h-3 mr-1" />
              Healthcare AI Systems
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AGIX Solves Healthcare Bottlenecks with{" "}
              <span className="text-green-500">Safe, Explainable AI</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              AGIX does not deploy one large, opaque AI platform. We design modular healthcare AI systems, each built to solve a specific bottleneck, with human-in-the-loop control, explainable outputs, audit-ready traceability, and integration with existing HIS / EMR systems. Every system is assistive by design, never autonomous in clinical decision-making.
            </p>
          </motion.div>

          {/* AI Systems Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {aiSystems.map((system) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedSystem(system)}
                className={`cursor-pointer p-4 rounded-lg border transition-all ${
                  selectedSystem.id === system.id
                    ? "border-2 border-green-500 bg-green-500/10"
                    : "border-border hover-elevate bg-card"
                }`}
                data-testid={`button-system-${system.id}`}
              >
                <Badge variant="outline" className="text-xs mb-2 text-green-500">
                  System {system.id}
                </Badge>
                <p className="text-sm font-medium">{system.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Selected System Detail */}
          <motion.div
            key={selectedSystem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-green-500/20 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <Badge className={`${selectedSystem.bgColor} ${selectedSystem.color} border-current mb-2`}>
                      AI System {selectedSystem.id}
                    </Badge>
                    <CardTitle>{selectedSystem.name}</CardTitle>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Timeline</p>
                      <p className="font-semibold">{selectedSystem.timeline}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Cost Range</p>
                      <p className="font-semibold">{selectedSystem.costRange}</p>
                    </div>
                  </div>
                </div>
                
                {/* Synchronized: Bottlenecks this system resolves */}
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Resolves:</span>
                    {bottlenecks
                      .filter(b => selectedSystem.resolvesBottleneckIds.includes(b.id))
                      .map(b => (
                        <Badge key={b.id} variant="outline" className={`text-xs ${b.color}`}>
                          {b.title}
                        </Badge>
                      ))}
                  </div>
                </div>
                
                {/* Synchronized: Roles this system is for */}
                <div className="mt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Best for:</span>
                    {roleBasedBottlenecks
                      .filter(r => selectedSystem.relevantRoleIds.includes(r.id))
                      .map(r => (
                        <Badge key={r.id} variant="outline" className={`text-xs ${r.color}`}>
                          {r.role}
                        </Badge>
                      ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      What This System Does
                    </h4>
                    <ul className="space-y-2">
                      {selectedSystem.whatItDoes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selectedSystem.whatItDoesNot.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                        What It Does Not Do
                      </h4>
                      <ul className="space-y-2">
                        {selectedSystem.whatItDoesNot.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <XCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-2 text-green-600">Why It Works in Healthcare</h4>
                  <p className="text-sm text-muted-foreground">{selectedSystem.whyItWorks}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Integration</p>
                    <p className="text-sm text-muted-foreground">{selectedSystem.integration}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Expected Impact</p>
                    <ul className="text-sm text-muted-foreground">
                      {selectedSystem.impact.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Role-Based Starting Points */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">Role-Based Starting Points</CardTitle>
              <p className="text-center text-sm text-muted-foreground">
                Recommended AI system sequence based on your organization type
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {roleBasedStartingPoints.map((item, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm mb-2">{item.role}</p>
                    <p className="text-xs text-muted-foreground">Start with:</p>
                    <p className="text-sm text-primary font-medium">{item.systems}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Principle */}
          <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/20 text-center mb-8">
            <p className="text-lg font-medium text-foreground">
              In healthcare, AI should never replace care.
            </p>
            <p className="text-muted-foreground mt-2">
              It should remove friction so care can happen better.
            </p>
          </div>

          {/* Transition CTA */}
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <a href="#decision-tools" data-testid="button-systems-cta">
                Understand Cost, ROI & the Safest Way to Start with Healthcare AI
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ==================== PART 4: COST, ROI & DECISION TOOLS ==================== */}
      <DecisionToolsSection />

      {/* ==================== PART 5: TRUST & COMPLIANCE ==================== */}
      <section id="trust-compliance" className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Trust & Compliance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Healthcare AI That Clinicians, Leaders, and{" "}
              <span className="text-primary">Regulators Can Trust</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
              Healthcare AI adoption succeeds only when trust is stronger than fear.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>Trust from:</span>
              <Badge variant="outline">Clinicians who rely on judgment</Badge>
              <Badge variant="outline">Administrators who manage risk</Badge>
              <Badge variant="outline">Compliance teams who answer audits</Badge>
              <Badge variant="outline">Patients who expect safety and privacy</Badge>
            </div>
            <p className="text-foreground font-medium mt-4">
              AGIX builds healthcare AI systems that are designed for trust first — performance second.
            </p>
          </motion.div>

          {/* Principles */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Our Healthcare AI Principles (Non-Negotiable)</CardTitle>
              <p className="text-center text-sm text-muted-foreground">
                Every healthcare AI system built by AGIX follows these principles:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {principles.map((principle, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-primary">{principle.num}</span>
                    </div>
                    <p className="font-medium text-sm mb-1">{principle.title}</p>
                    <p className="text-xs text-muted-foreground">{principle.desc}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-center mt-6 text-sm text-muted-foreground italic">
                These principles are enforced at the system level, not added later.
              </p>
            </CardContent>
          </Card>

          {/* Compliance Alignment */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">Compliance & Governance Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-medium mb-3">AGIX healthcare AI systems are built to align with:</p>
                  <ul className="space-y-2">
                    {[
                      "Healthcare data privacy requirements",
                      "Clinical accountability standards",
                      "Internal governance frameworks",
                      "Regulatory audit expectations",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-3">This means:</p>
                  <ul className="space-y-2">
                    {[
                      "No black-box models",
                      "No untraceable decisions",
                      "No undocumented data access",
                      "No surprise behavior during audits",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-center mt-6 p-4 bg-muted/50 rounded-lg">
                Healthcare leaders can confidently answer:{" "}
                <span className="text-foreground font-medium">"Who made this decision — and why?"</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <HelpCircle className="w-3 h-3 mr-1" />
              FAQs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Healthcare Leaders Ask These First
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-lg px-4">
                <AccordionTrigger className="text-left" data-testid={`accordion-faq-${i}`}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* When Healthcare AI Is Right */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">When Healthcare AI Is the Right Choice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Healthcare AI is a strong fit when your organization wants to:
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  "Reduce clinician burnout",
                  "Improve patient experience",
                  "Increase operational efficiency",
                  "Strengthen compliance posture",
                  "Scale responsibly without increasing risk",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-sm text-foreground font-medium mt-4">
                If your priority is safe, explainable, and controlled AI adoption, this approach is built for you.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section className="py-20 bg-gradient-to-br from-cyan-500/10 via-primary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">
              <HeartPulse className="w-3 h-3 mr-1" />
              Ready to Start?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore Healthcare AI —{" "}
              <span className="text-primary">Safely?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Start with clarity, not commitment.
            </p>

            {/* Roadmap Benefits */}
            <div className="bg-card border rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <p className="font-medium mb-4 text-center">This roadmap will help you:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Identify your highest-impact bottlenecks",
                  "Choose the safest AI starting point",
                  "Understand cost, timeline, and risk",
                  "Plan a phased, compliant rollout",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#lead-form" data-testid="button-final-cta">
                  Get a Healthcare AI Roadmap Built for Clinical Reality
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-rerun-finder">
                <RefreshCw className="w-4 h-4 mr-2" />
                Find My Starting Point
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== LEAD FORM SECTION ==================== */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <LeadForm />
        </div>
      </section>

      {/* ==================== CLOSING AUTHORITY STATEMENT ==================== */}
      <section className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">AGIX Technologies</strong> builds healthcare-aligned AI systems that improve outcomes, efficiency, and governance — without compromising trust.
          </p>
          <p className="text-sm text-muted-foreground mt-2 italic">
            We engineer AI that healthcare professionals can use, explain, and rely on.
          </p>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
