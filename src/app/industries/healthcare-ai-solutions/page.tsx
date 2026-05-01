'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Link from "next/link";
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
  TrendingUp,
  BarChart3,
  Cpu,
  Zap,
  BookOpen,
  ChevronRight,
  Microscope,
  MessageSquare,
  FlaskConical,
  Network,
  UserCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";
import { IndustryCaseStudies, IndustryServices } from "@/components/industry-sections";
import { IndustryLeadForm } from "@/components/industries/IndustryLeadForm";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

const caseStudies = [
  { company: "Babylon Health", description: "AI-powered digital triage and telehealth platform improving patient accessibility and care delivery at scale.", impact: ["Faster patient symptom assessment", "Scalable telemedicine consultations", "Reduced triage workload"], href: "/case-studies/babylon-health/" },
  { company: "Kite Therapy", description: "AI-assisted therapy management platform improving care coordination between clinicians and pediatric patients.", impact: ["Better treatment planning", "Improved patient engagement", "Enhanced clinician insights"], href: "/case-studies/kite-therapy/" },
  { company: "Hello Driven", description: "AI-driven healthcare engagement platform automating patient follow-ups and continuity of care.", impact: ["Automated patient communication", "Reduced missed follow-ups", "Improved care continuity"], href: "/case-studies/hello-driven/" },
];

const industryServices = [
  { title: "AI Voice Agents", description: "Automate patient calls, appointment reminders, and triage interactions with conversational voice AI.", useCases: ["Appointment scheduling", "Patient reminders", "Triage assistance"], href: "/services/ai-voice-agents/", ctaText: "Explore Voice AI" },
  { title: "Conversational AI", description: "Healthcare chatbots that assist patients with symptom intake, appointment booking, and information requests.", useCases: ["Digital triage", "Patient FAQs", "Intake forms"], href: "/services/conversational-ai-chatbots/", ctaText: "Explore Conversational AI" },
  { title: "RAG & Knowledge AI", description: "AI systems that retrieve accurate information from medical knowledge bases, protocols, and documentation.", useCases: ["Clinical knowledge retrieval", "Protocol guidance", "Medical documentation assistance"], href: "/services/rag-knowledge-ai/", ctaText: "Explore Knowledge AI" },
  { title: "Predictive & Analytics AI", description: "AI models that identify patterns in patient and operational data to support clinical decision making.", useCases: ["Patient risk prediction", "Operational forecasting", "Resource planning"], href: "/services/ai-predictive-analytics/", ctaText: "Explore Predictive AI" },
];



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
    howAISolvesIt: [
      "Pre-arrival AI collects structured patient information via web or SMS before appointment",
      "Symptom-based routing assigns patients to appropriate care pathways automatically",
      "Smart scheduling prioritizes high-acuity patients and fills cancellation slots",
      "Real-time triage dashboard gives clinical staff live patient flow visibility",
    ],
    outcome: "40–60% faster patient intake. Reduced OPD overcrowding. Fewer front-desk errors.",
    agixSystem: "Patient Intake & Triage Intelligence",
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
    howAISolvesIt: [
      "Voice capture converts clinical conversations into structured draft notes",
      "Ambient AI listens, generates summaries, and syncs approved notes to EMR",
      "AI pre-fills encounter templates using patient history and presenting symptoms",
      "Post-encounter actions (follow-up orders, referrals) are auto-suggested for clinician review",
    ],
    outcome: "1–2 hours reclaimed per clinician per day. 35% of healthcare professionals report spending less time with patients than on admin — AI fixes this.",
    agixSystem: "Clinical Workflow & Documentation Support",
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
    howAISolvesIt: [
      "Automated personalized follow-up messages via SMS, WhatsApp, or email",
      "AI monitors post-discharge indicators and flags high-risk patients for clinical review",
      "Care coordination agents track transitions between departments and providers",
      "Consent-based patient engagement — all outreach is transparent and opt-in",
    ],
    outcome: "25–40% reduction in no-shows. 20–35% reduction in 30-day readmissions. Measurable care continuity improvements.",
    agixSystem: "Patient Engagement & Follow-Up Intelligence",
  },
  {
    id: "4",
    title: "Clinical Decision Support — Knowledge at the Point of Care",
    icon: FileSearch,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    reality: [
      "Clinicians query 5+ disconnected systems per decision",
      "Clinical guidelines buried in 200+ page PDFs",
      "Time-critical decisions made without latest evidence",
      "Drug interactions and contraindications missed under pressure",
    ],
    impact: [
      "Diagnostic errors and near-misses",
      "Treatment delays while evidence is located",
      "Higher clinical risk and liability",
      "Clinician decision fatigue",
    ],
    whyHappens: "Clinical knowledge is vast, distributed, and grows exponentially. No human can recall every guideline, interaction, or protocol in real-time under clinical pressure.",
    howAISolvesIt: [
      "RAG-powered knowledge retrieval delivers evidence-based answers in 90 seconds — vs. 12 minutes of manual search",
      "Differential diagnosis AI surfaces the most probable diagnoses ranked by likelihood with supporting evidence",
      "Drug interaction checking integrated into prescribing workflow flags contraindications before they cause harm",
      "Clinical guidelines retrieved with source citations and confidence scores — clinician always reviews and decides",
    ],
    outcome: "Clinical queries reduced from 12 minutes to 90 seconds. Fewer near-misses. More confident clinical decisions — all with full audit trail.",
    agixSystem: "Clinical Decision Support Intelligence",
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
    howAISolvesIt: [
      "Pre-submission validation catches coding errors and missing documentation before submission",
      "Denial pattern analysis identifies payer-specific rejection triggers",
      "AI drafts appeal letters with supporting evidence for denied claims",
      "Revenue forecasting models predict reimbursement timelines by payer",
    ],
    outcome: "35–50% reduction in claim rejections. Faster reimbursements. More predictable revenue. Reduced appeals workload.",
    agixSystem: "Claims & Revenue Cycle Intelligence",
  },
  {
    id: "6",
    title: "Patient Engagement & Medication Adherence",
    icon: MessageSquare,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    reality: [
      "Generic, non-personalized outreach",
      "25–35% no-show rates across specialties",
      "Poor medication adherence in chronic disease",
      "Patients disengaging after first visit",
    ],
    impact: [
      "Chronic disease complications",
      "Preventable hospital readmissions",
      "Underperformance in value-based care models",
      "Lower patient lifetime value",
    ],
    whyHappens: "Most patient engagement is reactive and generic. Bulk SMS campaigns and manual call lists fail to create the personalized, timely connection patients need to stay engaged with their care.",
    howAISolvesIt: [
      "Conversational AI conducts personalized post-visit follow-ups via SMS, WhatsApp, or voice",
      "Medication adherence monitoring flags missed doses and prompts gentle, timely reminders",
      "Care gap alerts identify patients overdue for screenings, labs, or specialist visits",
      "Sentiment analysis detects patient frustration early — escalating to human care teams when needed",
    ],
    outcome: "25–40% improvement in medication adherence. 3× patient re-engagement rates. Measurable improvement in chronic disease management outcomes.",
    agixSystem: "Patient Engagement & Follow-Up Intelligence",
  },
  {
    id: "7",
    title: "Medical Imaging Backlog & Diagnostic Delays",
    icon: Microscope,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    reality: [
      "Radiologist shortage — demand outpacing supply",
      "Growing scan backlogs with delayed reporting",
      "Missed incidental findings under volume pressure",
      "Manual annotation and report drafting consuming hours",
    ],
    impact: [
      "Delayed cancer diagnosis and staging",
      "Patient anxiety from waiting",
      "Radiologist burnout and error risk",
      "Increased clinical liability",
    ],
    whyHappens: "Diagnostic imaging volumes grow 3–5% annually while radiologist numbers stagnate. Manual image review at scale is unsustainable.",
    howAISolvesIt: [
      "AI pre-screens radiology scans (CT, MRI, X-ray, ultrasound) and flags anomalies for priority review",
      "Structured report drafts reduce radiologist annotation time — they review and approve, not start from scratch",
      "Priority queue management routes critical findings to the front of the worklist automatically",
      "DICOM-compatible integration works with existing PACS/RIS infrastructure",
    ],
    outcome: "30% reduction in radiologist workload. Faster time-to-diagnosis. Earlier detection of critical findings. AI assists — radiologists always diagnose.",
    agixSystem: "Clinical Decision Support Intelligence",
  },
  {
    id: "8",
    title: "Mental Health Access Gaps & Clinician Overload",
    icon: Brain,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    reality: [
      "1 psychiatrist per 10,000+ patients in underserved regions",
      "Average 11-week wait for mental health appointments",
      "Stigma barriers preventing help-seeking",
      "Crisis events going unreported until escalation",
    ],
    impact: [
      "Untreated conditions worsening over time",
      "Costly emergency psychiatric interventions",
      "High provider burnout from caseload pressure",
      "Mental health treatment gaps widening globally",
    ],
    whyHappens: "Mental health services were not built to scale. Clinician-to-patient ratios make widespread access impossible without intelligent support systems.",
    howAISolvesIt: [
      "Empathetic AI companions provide between-session support — journaling, CBT exercises, mood tracking",
      "Risk screening conversations identify elevated PHQ-9/GAD-7 scores and flag for clinician review",
      "Crisis detection algorithms identify language patterns indicating acute risk — with immediate human escalation",
      "Therapist handoff protocols ensure AI never exceeds its boundary — humans manage all clinical decisions",
    ],
    outcome: "10× patient access expansion. Earlier crisis identification. Reduced clinician caseload burden. Safer, more scalable mental health support.",
    agixSystem: "Patient Engagement & Follow-Up Intelligence",
  },
];

const bottleneckMeta: Record<string, {
  services: {name: string, href: string}[];
  framework: {name: string, href: string, context: string};
  caseStudy?: {name: string, href: string, description: string};
  governanceNote?: string;
}> = {
  "1": {
    services: [
      { name: "Conversational AI Chatbots", href: "/services/conversational-ai-chatbots/" },
      { name: "AI Voice Agents", href: "/services/ai-voice-agents/" },
      { name: "AI Automation", href: "/services/ai-automation/" },
    ],
    framework: { name: "Conversational Intelligence", href: "/intelligence/conversational-ai/", context: "Level 3 (Context-Aware) for symptom collection; Level 4 (Reasoning) for triage logic" },
    caseStudy: { name: "Babylon Health", href: "/case-studies/babylon-health/", description: "Clinical AI triage serving 24M users. 99.2% serious case detection. Time to care reduced 34%." },
  },
  "2": {
    services: [
      { name: "RAG & Knowledge AI", href: "/services/rag-knowledge-ai/" },
      { name: "AI Automation", href: "/services/ai-automation/" },
      { name: "Custom AI Product Development", href: "/services/custom-ai-product-development/" },
    ],
    framework: { name: "Enterprise Knowledge Intelligence", href: "/intelligence/enterprise-knowledge-ai/", context: "Stage 4 (Intelligent) for clinical knowledge retrieval during documentation" },
    governanceNote: "AI-generated reports require clinician review before sign-off. AI achieves 87.3% accuracy vs 72.8% surgeon-written (DemandSage).",
  },
  "3": {
    services: [
      { name: "Agentic AI Systems", href: "/services/agentic-ai-systems/" },
      { name: "AI Voice Agents", href: "/services/ai-voice-agents/" },
      { name: "AI Automation", href: "/services/ai-automation/" },
    ],
    framework: { name: "Autonomous Agentic Systems", href: "/intelligence/autonomous-agentic-ai/", context: "L2 (Semi-Autonomous) recommended for healthcare care coordination" },
  },
  "4": {
    services: [
      { name: "RAG & Knowledge AI", href: "/services/rag-knowledge-ai/" },
      { name: "AI Predictive Analytics", href: "/services/ai-predictive-analytics/" },
      { name: "Custom AI Product Development", href: "/services/custom-ai-product-development/" },
    ],
    framework: { name: "Decision Intelligence", href: "/intelligence/decision-ai/", context: "Level 1 (Informed) — AI delivers evidence-based suggestions for clinician review. Human always decides." },
    governanceNote: "All clinical recommendations include source citations and confidence scores. No autonomous diagnosis. No prescribing. Clinicians own every patient decision.",
  },
  "5": {
    services: [
      { name: "AI Predictive Analytics", href: "/services/ai-predictive-analytics/" },
      { name: "AI Automation", href: "/services/ai-automation/" },
      { name: "RAG & Knowledge AI", href: "/services/rag-knowledge-ai/" },
    ],
    framework: { name: "Decision Intelligence", href: "/intelligence/decision-ai/", context: "Level 2 (Recommended) for claims review; Level 3 (Automated) for routine coding validation" },
  },
  "6": {
    services: [
      { name: "AI Voice Agents", href: "/services/ai-voice-agents/" },
      { name: "Conversational AI Chatbots", href: "/services/conversational-ai-chatbots/" },
      { name: "AI Automation", href: "/services/ai-automation/" },
    ],
    framework: { name: "Conversational Intelligence", href: "/intelligence/conversational-ai/", context: "Levels 3–4: context-aware follow-up conversations, sentiment tracking, care gap alerts" },
  },
  "7": {
    services: [
      { name: "AI Computer Vision", href: "/services/ai-computer-vision/" },
      { name: "AI Predictive Analytics", href: "/services/ai-predictive-analytics/" },
    ],
    framework: { name: "Decision Intelligence", href: "/intelligence/decision-ai/", context: "Level 1 (Informed) — AI flags imaging findings for clinician review. Human always diagnoses." },
    governanceNote: "AI flags findings — clinicians diagnose. AI never replaces radiologist judgment. 340+ FDA-approved AI imaging tools in clinical use.",
  },
  "8": {
    services: [
      { name: "Custom AI Product Development", href: "/services/custom-ai-product-development/" },
      { name: "Conversational AI Chatbots", href: "/services/conversational-ai-chatbots/" },
    ],
    framework: { name: "Conversational Intelligence", href: "/intelligence/conversational-ai/", context: "Level 4 (Reasoning) for empathetic conversation; strict escalation protocols at all risk levels" },
    caseStudy: { name: "Kite Therapy", href: "/case-studies/kite-therapy/", description: "AI-assisted therapy management platform improving care coordination for pediatric patients. Better treatment planning, enhanced clinician insights." },
    governanceNote: "AI provides between-session support only. Crisis detection always triggers immediate human clinician escalation. No autonomous mental health interventions.",
  },
};

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
    impact: ["Reduced documentation time", "Improved clinician satisfaction", "Higher patient interaction quality"],
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "3",
    name: "Patient Engagement & Follow-Up Intelligence",
    shortName: "Follow-Up AI",
    bottleneckSolved: "Missed follow-ups, poor adherence, fragmented patient journeys",
    resolvesBottleneckIds: ["3", "6", "8"],
    relevantRoleIds: ["clinic", "digital", "hospital"],
    whatItDoes: [
      "Supports appointment reminders and follow-ups",
      "Tracks adherence signals",
      "Escalates exceptions to care teams",
      "Provides empathetic between-session mental health support",
    ],
    whatItDoesNot: [
      "No medical advice",
      "No intrusive communication",
      "No autonomous mental health interventions",
    ],
    whyItWorks: "Consent-based engagement. Clear escalation to humans. Improves continuity without overreach.",
    integration: "CRM / Patient engagement tools, Appointment systems",
    timeline: "4-6 weeks",
    impact: ["Improved follow-up adherence", "Reduced readmissions", "Better patient experience"],
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "4",
    name: "Clinical Decision Support Intelligence",
    shortName: "Decision Support AI",
    bottleneckSolved: "Clinical decision delays, knowledge retrieval bottlenecks, diagnostic near-misses",
    resolvesBottleneckIds: ["4", "7"],
    relevantRoleIds: ["hospital", "clinic", "diagnostic"],
    whatItDoes: [
      "Delivers evidence-based clinical answers via RAG in seconds",
      "Surfaces ranked differential diagnoses with supporting citations",
      "Flags drug interactions and contraindications before prescribing",
      "Assists radiologists with imaging pre-screening (bottleneck 7)",
    ],
    whatItDoesNot: [
      "No automated diagnosis or prescribing",
      "No autonomous clinical recommendations without review",
    ],
    whyItWorks: "Human-in-the-loop at every step. Clinician always reviews, approves, or overrides. Full audit trail on every query.",
    integration: "EMR, LIS, Clinical knowledge bases, PACS/RIS",
    timeline: "5-8 weeks",
    impact: ["Faster clinical queries", "Fewer near-misses", "More confident clinical decisions"],
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
    impact: ["Reduced claim rejections", "Faster reimbursements", "More predictable revenue"],
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "6",
    name: "Compliance, Audit & Governance Intelligence Layer",
    shortName: "Governance AI",
    bottleneckSolved: "Compliance anxiety, audit risk, data governance issues",
    resolvesBottleneckIds: [],
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
    impact: ["Reduced compliance risk", "Faster audits", "Increased leadership confidence"],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const roleBasedStartingPoints = [
  { role: "Hospitals & Large Systems", systems: "Patient Intake → Clinical Workflow → Claims Intelligence" },
  { role: "Clinics & Specialty Practices", systems: "Intake → Follow-Ups → Documentation Support" },
  { role: "Diagnostic Centers", systems: "Clinical Decision Support → Medical Imaging AI → Compliance Layer" },
  { role: "Digital Health Platforms", systems: "Engagement → Intake → Governance Layer" },
];


const principles = [
  { num: 1, title: "Human-in-the-Loop by Design", desc: "AI assists decisions — it never replaces clinical judgment. Every output is a recommendation, not an order." },
  { num: 2, title: "Explainability at Every Step", desc: "Every recommendation includes source citations and confidence scores. No black-box outputs." },
  { num: 3, title: "No Autonomous Clinical Actions", desc: "No diagnosis, treatment, prescription, or escalation happens without human review and approval." },
  { num: 4, title: "Audit-Ready Architecture", desc: "Every AI action is logged, timestamped, traceable, and reviewable. Full accountability chain." },
  { num: 5, title: "Privacy & Consent First", desc: "Patient data is protected, access-controlled, and purpose-limited. Never used for external model training." },
  { num: 6, title: "Fail-safe Design", desc: "When AI is uncertain, it says so — and escalates to a human. AI fails safely, never silently." },
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
    const recommendations: Record<string, { system: string; desc: string; timeline: string; phase2: string }> = {
      intake: { system: "Patient Intake & Triage Intelligence", desc: "High patient volume and intake challenges indicate this as the safest starting point.", timeline: "5-7 weeks", phase2: "Clinical Documentation Support" },
      documentation: { system: "Clinical Workflow & Documentation Support", desc: "Reducing clinician admin burden improves satisfaction and care quality.", timeline: "6-8 weeks", phase2: "Clinical Decision Support Intelligence" },
      followups: { system: "Patient Engagement & Follow-Up Intelligence", desc: "Improving adherence and reducing readmissions directly impacts outcomes.", timeline: "4-6 weeks", phase2: "Care Continuity Dashboard" },
      diagnostics: { system: "Clinical Decision Support Intelligence", desc: "Evidence-based clinical answers in 90 seconds, plus imaging AI to reduce radiologist workload.", timeline: "5-8 weeks", phase2: "Claims Processing Support" },
      claims: { system: "Claims & Revenue Cycle Intelligence", desc: "Reducing rejections and faster reimbursements improve financial health.", timeline: "6-9 weeks", phase2: "Prior Authorization Automation" },
      compliance: { system: "Compliance & Governance Intelligence Layer", desc: "Audit-ready systems with full traceability protect the organization.", timeline: "5-7 weeks", phase2: "Clinical Audit Dashboard" },
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
    name: "",
    organization: "",
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
        name: formData.name || formData.email,
        email: formData.email,
        company: formData.organization,
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
        name: "",
        organization: "",
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
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. / Mr. / Ms. Your Name"
                data-testid="input-name"
              />
            </div>
            <div>
              <Label htmlFor="organization">Organization Name</Label>
              <Input
                id="organization"
                name="organization"
                autoComplete="organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Hospital / Clinic / Platform Name"
                data-testid="input-organization"
              />
            </div>
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
                name="country"
                autoComplete="country-name"
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
                name="email"
                type="email"
                autoComplete="email"
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

const healthcareChallengeOptions = [
  { value: "intake", label: "Patient Intake & Triage Automation" },
  { value: "documentation", label: "Clinical Documentation AI" },
  { value: "care-coordination", label: "Patient Flow & Care Coordination" },
  { value: "clinical-decision", label: "Clinical Decision Support" },
  { value: "revenue-cycle", label: "Revenue Cycle & Claims Intelligence" },
  { value: "engagement", label: "Patient Engagement & Follow-Up" },
  { value: "imaging", label: "Medical Imaging AI" },
  { value: "mental-health", label: "Mental Health & Patient Support AI" },
];

const statsData = [
  { value: "$36.7B", label: "Healthcare AI market in 2025", sub: "→ $505.59B by 2033 · 38.9% CAGR (Grand View Research)", icon: TrendingUp, color: "text-primary" },
  { value: "73%", label: "Of patients face care delays globally", sub: "Average 70-day wait for an appointment (Vention)", icon: Clock, color: "text-orange-500" },
  { value: "54%", label: "Physician burnout rate in 2025", sub: "35% spend more time on admin than patients (Vention)", icon: AlertTriangle, color: "text-red-500" },
  { value: "85%", label: "Of healthcare orgs adopted generative AI", sub: "Or actively exploring it (Vention)", icon: BarChart3, color: "text-green-500" },
  { value: "66%", label: "Of physicians used AI in 2025", sub: "Up 78% from 38% in 2023 (AMA/DemandSage)", icon: UserCheck, color: "text-blue-500" },
  { value: "70%", label: "Of healthcare orgs use AI agents", sub: "To support clinical workflows (Azumo)", icon: Cpu, color: "text-cyan-500" },
];

const howItWorksSteps = [
  { step: 1, title: "Input", desc: "Patient provides symptoms, questions, or documents — via chat, voice, or form. Clinician receives a request or trigger from an EHR event or workflow rule.", duration: "Real-time" },
  { step: 2, title: "Structure", desc: "AI converts unstructured clinical input into organized, searchable, actionable data — extracting intent, entities, urgency signals, and clinical context.", duration: "< 1 second" },
  { step: 3, title: "Retrieve", desc: "AI searches clinical guidelines, the patient's history, treatment protocols, formulary, and institutional policies — using RAG retrieval with source citations.", duration: "< 2 seconds" },
  { step: 4, title: "Recommend", desc: "AI generates a recommendation — triage routing, clinical note, care plan, coding suggestion, or knowledge answer — with a confidence score and reasoning chain.", duration: "< 3 seconds" },
  { step: 5, title: "Validate", desc: "The human clinician reviews, approves, modifies, or overrides the AI suggestion. No autonomous clinical action. Human always owns the outcome.", duration: "Clinician-controlled" },
  { step: 6, title: "Learn", desc: "Every interaction feeds back into the system — improving model accuracy, updating knowledge bases, and refining clinical pathways over time.", duration: "Continuous" },
];

const comparisonRows = [
  { area: "Patient intake", traditional: "15–25 min manual form filling, front desk bottleneck", withAI: "3–5 min pre-visit AI collection via chat/voice, zero wait" },
  { area: "Triage decisions", traditional: "Varies by staff experience, inconsistent across shifts", withAI: "Consistent, evidence-based, 24/7, 99%+ detection rate" },
  { area: "Clinical documentation", traditional: "2–3 hours/day per clinician, post-visit charting", withAI: "Ambient AI generates notes during encounter, clinician reviews" },
  { area: "Follow-up coordination", traditional: "Staff-dependent, phone calls during business hours", withAI: "Automated multi-channel (voice, WhatsApp, SMS), 24/7" },
  { area: "Claims processing", traditional: "8–15% rejection rate, manual correction cycles", withAI: "AI pre-screens, flags errors before submission, 35–50% rejection reduction" },
  { area: "Knowledge retrieval", traditional: "Search through docs, ask colleagues, 15+ minutes", withAI: "RAG-powered instant answer with source citation, 30 seconds" },
  { area: "Patient monitoring", traditional: "Periodic check-ins during visits only", withAI: "Continuous AI-powered monitoring between visits" },
  { area: "Scaling capacity", traditional: "Hire more staff (linear cost increase)", withAI: "Same AI system handles 10x volume (non-linear scaling)" },
];

const useCasesRows = [
  { num: 1, useCase: "Patient Intake & Triage", problem: "Overcrowded OPDs, inconsistent triage", aiSolution: "Collects symptoms via chat/voice, prioritizes urgency", outcome: "40–60% faster intake", bottleneckId: "1", icon: HeartPulse },
  { num: 2, useCase: "Clinical Documentation", problem: "Clinicians spending 2–3 hrs/day on notes", aiSolution: "Ambient notes, auto-generated reports", outcome: "1–2 hours/day reclaimed per clinician", bottleneckId: "2", icon: FileText },
  { num: 3, useCase: "Patient Flow & Coordination", problem: "Fragmented handoffs, missed follow-ups", aiSolution: "Multi-agent scheduling, routing, follow-ups", outcome: "65% admin overhead reduction", bottleneckId: "3", icon: Network },
  { num: 4, useCase: "Clinical Decision Support", problem: "Clinicians querying 5+ disconnected systems", aiSolution: "RAG-powered guideline retrieval, evidence-based suggestions", outcome: "Clinical queries: 12 min → 90 sec", bottleneckId: "4", icon: Brain },
  { num: 5, useCase: "Revenue Cycle & Claims", problem: "8–15% claim rejection rate, slow reimbursement", aiSolution: "Pre-submission claim review, coding error detection", outcome: "35–50% rejection reduction", bottleneckId: "5", icon: BarChart3 },
  { num: 6, useCase: "Patient Engagement", problem: "25–35% no-show rates, poor medication adherence", aiSolution: "Voice/chat follow-ups, reminders, adherence monitoring", outcome: "25–40% no-show reduction", bottleneckId: "6", icon: MessageSquare },
  { num: 7, useCase: "Medical Imaging", problem: "Radiologist backlog, delayed diagnoses", aiSolution: "AI pre-screens scans, flags anomalies for review", outcome: "30% radiologist workload reduction", bottleneckId: "7", icon: Microscope },
  { num: 8, useCase: "Mental Health Support", problem: "Long wait times, limited access, stigma barriers", aiSolution: "Empathetic AI companions, crisis detection, therapist handoff", outcome: "10x patient access expansion", bottleneckId: "8", icon: Brain },
];

const predictiveRows = [
  { prediction: "Readmission risk", dataSources: "Patient history, vitals, medications, social determinants", outcome: "25% reduction in readmission rates", link: "/services/ai-predictive-analytics/" },
  { prediction: "Disease progression", dataSources: "Lab results, longitudinal records, genomic data", outcome: "Earlier interventions, improved outcomes", link: "/services/ai-predictive-analytics/" },
  { prediction: "Resource demand", dataSources: "Historical patient volumes, seasonality, community health data", outcome: "Staffing optimization, reduced overtime", link: "/services/ai-predictive-analytics/" },
  { prediction: "Equipment failure", dataSources: "IoT sensor data, maintenance logs", outcome: "50% downtime reduction through predictive maintenance", link: "/services/ai-predictive-analytics/" },
];

const frameworkRows = [
  { framework: "Operational Intelligence", healthcareApplication: "Hospital operations monitoring → patient flow prediction → autonomous scheduling (Layers 1–4)", link: "/intelligence/operational-ai/" },
  { framework: "Conversational Intelligence", healthcareApplication: "Patient intake → clinical Q&A → follow-up management (Levels 2–4 on the Spectrum)", link: "/intelligence/conversational-ai/" },
  { framework: "Decision Intelligence", healthcareApplication: "Clinical decision support (Level 1) → claims automation (Level 3) → resource allocation (Level 2)", link: "/intelligence/decision-ai/" },
  { framework: "Autonomous Agentic Systems", healthcareApplication: "Care coordination agents → L2 (Semi-Autonomous) with strict governance", link: "/intelligence/autonomous-agentic-ai/" },
  { framework: "Enterprise Knowledge Intelligence", healthcareApplication: "Clinical knowledge retrieval → Stage 4 (Intelligent) with HIPAA-compliant access control", link: "/intelligence/enterprise-knowledge-ai/" },
];

const governanceRows = [
  { principle: "Human-in-the-loop", requirement: "AI assists clinical decisions — never makes them. Clinicians own every patient outcome.", hipaaRelevance: "Supports §164.308 workforce training and policy requirements" },
  { principle: "Explainability", requirement: "Every AI recommendation includes reasoning, source citation, and confidence score. No black boxes.", hipaaRelevance: "Aligns with audit control requirements §164.312" },
  { principle: "No autonomous clinical actions", requirement: "No diagnosis. No treatment. No prescribing. No escalation without human approval.", hipaaRelevance: "Clinical liability requires human responsibility for every care decision" },
  { principle: "HIPAA compliance", requirement: "Patient data stays in controlled environments. Never used for external model training. Role-based access control.", hipaaRelevance: "Technical and administrative safeguards §164.312 & §164.308" },
  { principle: "Audit-ready architecture", requirement: "Every AI action logged, traceable, and reviewable. Ready for regulatory audit at any time.", hipaaRelevance: "Audit controls §164.312(b) — complete action trails" },
  { principle: "Fail-safe design", requirement: "When AI is uncertain, it says so. When confidence is low, it escalates. When systems fail, they fail safely.", hipaaRelevance: "Supports patient safety and clinical integrity — no silent failures" },
];

export default function HealthcareIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);
  const [selectedSystem, setSelectedSystem] = useState(aiSystems[0]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* ==================== BREADCRUMB + AEO DIRECT ANSWER ==================== */}
      <div className="pt-24 lg:pt-28 pb-0 bg-gradient-to-br from-background via-cyan-500/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-4" data-testid="breadcrumb-nav">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <li><Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">Home</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/industries/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-industries">Industries</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-foreground font-medium" data-testid="breadcrumb-current">Healthcare AI Solutions</li>
            </ol>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 bg-primary/5 border border-primary/20 rounded-xl"
            data-testid="aeo-direct-answer"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              Direct Answer: How is AI Used in Healthcare?
            </p>
            <p className="text-sm text-foreground leading-relaxed" data-testid="text-aeo-direct-answer">
              AI in healthcare is used to automate patient intake, assist clinical decisions, reduce administrative burden, accelerate diagnostics, manage revenue cycles, and improve patient outcomes — while maintaining human oversight and HIPAA compliance at every step. It enables healthcare organizations to do more with less, without replacing clinical judgment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="pt-4 pb-16 bg-gradient-to-br from-background via-cyan-500/5 to-primary/10">
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

      {/* ==================== STATS: WHY HEALTHCARE NEEDS AI NOW ==================== */}
      <section className="py-16 border-b border-border bg-background" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3"><TrendingUp className="w-3 h-3 mr-1" />Healthcare AI Market 2025</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Healthcare Needs AI — Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The healthcare AI market is exploding. Organizations that move now gain compounding advantages in efficiency, patient outcomes, and competitive positioning.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4" data-testid="stats-grid">
            {statsData.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="h-full hover-elevate" data-testid={`stat-card-${i}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-lg bg-primary/10 shrink-0`}><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
                      <div>
                        <p className={`text-2xl font-bold ${stat.color}`} data-testid={`stat-value-${i}`}>{stat.value}</p>
                        <p className="text-sm font-medium text-foreground">{stat.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW HEALTHCARE AI WORKS ==================== */}
      <section className="py-16 bg-muted/20" data-testid="section-how-ai-works">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3"><Cpu className="w-3 h-3 mr-1" />How It Works</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How Healthcare AI Works — Simplified</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The six-step AI loop that underpins every clinical and operational AI system AGIX builds — designed for AEO extraction and voice assistant retrieval.</p>
          </motion.div>
          <div className="space-y-4">
            {howItWorksSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="flex gap-4 items-start p-5 rounded-xl border border-border bg-card hover-elevate" data-testid={`how-it-works-step-${step.step}`}>
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary text-sm">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <Badge variant="outline" className="text-xs text-muted-foreground">{step.duration}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <blockquote className="mt-8 p-5 bg-primary/5 border-l-4 border-primary rounded-r-xl" data-testid="how-it-works-quote">
            <p className="text-sm font-medium text-foreground italic">
              &ldquo;This loop — input → structure → retrieve → recommend → validate → learn — is the foundation of every healthcare AI system AGIX builds. <strong>The human always validates. The AI always explains.</strong>&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ==================== AI VS TRADITIONAL COMPARISON ==================== */}
      <section className="py-16 bg-background" data-testid="section-comparison-table">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3"><Zap className="w-3 h-3 mr-1" />The Difference AI Makes</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">AI vs. Traditional Healthcare Operations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Across every major operational domain, AI-powered workflows consistently outperform manual processes — with measurable, auditable outcomes.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-xl border border-border" data-testid="comparison-table">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground w-1/4">Dimension</th>
                  <th className="text-left py-3 px-4 font-semibold text-orange-500">Traditional (Manual)</th>
                  <th className="text-left py-3 px-4 font-semibold text-green-500">AI-Powered (AGIX)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}`} data-testid={`comparison-row-${i}`}>
                    <td className="py-3 px-4 font-medium text-foreground">{row.area}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      <span className="flex items-start gap-1.5"><XCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />{row.traditional}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      <span className="flex items-start gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />{row.withAI}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <blockquote className="mt-6 p-5 bg-muted/30 border-l-4 border-orange-500 rounded-r-xl" data-testid="comparison-quote">
            <p className="text-sm font-medium text-foreground italic">
              &ldquo;The choice isn&apos;t AI vs clinicians. It&apos;s: clinicians drowning in admin vs clinicians supported by AI. Healthcare AI doesn&apos;t replace care — it removes the friction that prevents care from happening.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ==================== USE CASES QUICK SUMMARY ==================== */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3"><BookOpen className="w-3 h-3 mr-1" />Use Cases</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Best Use Cases for AI in Healthcare — Quick Summary</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Eight proven AI applications, each addressing a specific operational bottleneck. AGIX builds enterprise-grade systems for all eight.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-xl border border-border" data-testid="use-cases-table">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold w-8">#</th>
                  <th className="text-left py-3 px-4 font-semibold">Use Case</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">What AI Does</th>
                  <th className="text-left py-3 px-4 font-semibold text-green-500">Impact</th>
                </tr>
              </thead>
              <tbody>
                {useCasesRows.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}`} data-testid={`use-case-row-${i}`}>
                    <td className="py-3 px-4 text-muted-foreground font-medium">{row.num}</td>
                    <td className="py-3 px-4">
                      <Link href={`#bottleneck-${row.bottleneckId}`} className="flex items-center gap-2 hover:text-primary transition-colors group">
                        <row.icon className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-medium text-foreground group-hover:text-primary">{row.useCase}</span>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{row.aiSolution}</td>
                    <td className="py-3 px-4 font-medium text-green-500">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">Click any use case to jump to its detailed bottleneck analysis below.</p>
        </div>
      </section>

      {/* ==================== MID-PAGE LEAD FORM ==================== */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-cyan-500/5 to-primary/10 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <Badge className="mb-3"><HeartPulse className="w-3 h-3 mr-1" />Get a Custom Strategy</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Not Sure Where to Start with Healthcare AI?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Tell us your biggest challenge. Our healthcare AI team will map the right solution — with a clear timeline and zero fluff.</p>
          </motion.div>
          <IndustryLeadForm
            challengeOptions={healthcareChallengeOptions}
            ctaLabel="Get a Custom AI Strategy"
            namePlaceholder="Dr. / Mr. / Ms. Your Name"
            orgPlaceholder="Hospital / Clinic / Platform"
            disclaimer="No commitment. Our healthcare AI team will respond within one business day."
            successMessage="Our healthcare AI team will reach out within one business day with a tailored strategy."
            industry="healthcare"
            formType="healthcare-midpage-cta"
            source="/industries/healthcare-ai-solutions"
            ctaId="healthcare-contextual-form"
            ctaLocation="mid-page-use-cases"
            testIdPrefix="ctx"
          />
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

          {/* AGIX Technologies Approach */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-cyan-500/5">
            <CardHeader>
              <CardTitle className="text-xl text-center">How AGIX Technologies Approaches Healthcare AI Differently</CardTitle>
              <p className="text-center text-muted-foreground">
                AGIX Technologies builds healthcare-aligned AI systems, not generic tools. Our approach is grounded in five principles:
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
                  <h4 className="font-semibold text-foreground mb-3">AGIX Technologies builds AI systems that:</h4>
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
                id={`bottleneck-${bottleneck.id}`}
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

                {/* How AI Solves This - Enrichment */}
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      How AI Solves This
                    </h4>
                    <ul className="space-y-2">
                      {(selectedBottleneck.howAISolvesIt ?? []).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Outcome with AGIX AI
                    </h4>
                    <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                      <p className="text-sm font-medium text-green-500">{selectedBottleneck.outcome}</p>
                    </div>
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">AGIX AI System for this:</p>
                      <p className="text-sm font-semibold text-primary">{selectedBottleneck.agixSystem}</p>
                    </div>
                  </div>
                </div>

                {/* Services, Framework, Case Study, Governance — per bottleneck */}
                {bottleneckMeta[selectedBottleneck.id] && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                    {/* AGIX Services */}
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">AGIX Services Used</h5>
                      <div className="flex flex-wrap gap-2">
                        {bottleneckMeta[selectedBottleneck.id].services.map((svc, i) => (
                          <Link key={i} href={svc.href} className="text-xs px-2.5 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors" data-testid={`service-link-${i}`}>
                            {svc.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Intelligence Framework */}
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Intelligence Framework</h5>
                      <Link href={bottleneckMeta[selectedBottleneck.id].framework.href} className="text-xs font-medium text-primary hover:underline" data-testid="framework-link">
                        {bottleneckMeta[selectedBottleneck.id].framework.name} →
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">{bottleneckMeta[selectedBottleneck.id].framework.context}</p>
                    </div>
                    {/* Case Study */}
                    {bottleneckMeta[selectedBottleneck.id].caseStudy && (
                      <div className="sm:col-span-2">
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Case Study</h5>
                        <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg border border-border">
                          <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <Link href={bottleneckMeta[selectedBottleneck.id].caseStudy!.href} className="text-sm font-medium text-primary hover:underline" data-testid="case-study-link">
                              {bottleneckMeta[selectedBottleneck.id].caseStudy!.name}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-0.5">{bottleneckMeta[selectedBottleneck.id].caseStudy!.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Governance Note */}
                    {bottleneckMeta[selectedBottleneck.id].governanceNote && (
                      <div className="sm:col-span-2">
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Governance Note</h5>
                        <div className="flex items-start gap-2 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
                          <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground">{bottleneckMeta[selectedBottleneck.id].governanceNote}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                                  <p className="text-xs text-muted-foreground">{sys.timeline}</p>
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
              How AGIX Technologies Solves Healthcare Bottlenecks with{" "}
              <span className="text-green-500">Safe, Explainable AI</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              AGIX Technologies does not deploy one large, opaque AI platform. We design modular healthcare AI systems, each built to solve a specific bottleneck, with human-in-the-loop control, explainable outputs, audit-ready traceability, and integration with existing HIS / EMR systems. Every system is assistive by design, never autonomous in clinical decision-making.
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


      {/* ==================== PREDICTIVE ANALYTICS ==================== */}
      <section className="py-16 bg-muted/20" data-testid="section-predictive-analytics">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3"><BarChart3 className="w-3 h-3 mr-1" />Predictive AI</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How Predictive Analytics Improves Healthcare Outcomes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Beyond reactive AI, AGIX builds predictive systems that forecast patient risk, demand, and financial outcomes — enabling proactive clinical and operational decisions.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-xl border border-border" data-testid="predictive-analytics-table">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold w-1/4">Prediction</th>
                  <th className="text-left py-3 px-4 font-semibold">Data Sources</th>
                  <th className="text-left py-3 px-4 font-semibold text-green-500 w-1/4">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {predictiveRows.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}`} data-testid={`predictive-row-${i}`}>
                    <td className="py-3 px-4 font-medium text-foreground">{row.prediction}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.dataSources}</td>
                    <td className="py-3 px-4 font-medium text-green-500">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            <Link href="/services/ai-predictive-analytics/" className="text-primary hover:underline">Explore AGIX AI Predictive Analytics →</Link>
          </p>
        </div>
      </section>

      {/* ==================== INTELLIGENCE FRAMEWORKS ==================== */}
      <section className="py-16 bg-background" data-testid="section-intelligence-frameworks">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3"><Layers className="w-3 h-3 mr-1" />AGIX Intelligence Frameworks</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">AGIX Healthcare Intelligence Frameworks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Five modular intelligence frameworks — each purpose-built for a specific healthcare operational domain, each deployable independently or as part of an integrated platform.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-xl border border-border" data-testid="intelligence-frameworks-table">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold w-1/3">AGIX Intelligence Framework</th>
                  <th className="text-left py-3 px-4 font-semibold">Healthcare Application</th>
                </tr>
              </thead>
              <tbody>
                {frameworkRows.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}`} data-testid={`framework-row-${i}`}>
                    <td className="py-3 px-4 font-medium text-primary">
                      <Link href={row.link} className="hover:underline">{row.framework}</Link>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{row.healthcareApplication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Industry Case Studies Section */}
      <IndustryCaseStudies caseStudies={caseStudies} industryName="Healthcare" />

      {/* Industry Services Section */}
      <IndustryServices services={industryServices} industryName="Healthcare" />

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
              AGIX Technologies builds healthcare AI systems that are designed for trust first — performance second.
            </p>
          </motion.div>

          {/* Principles */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Our Healthcare AI Principles (Non-Negotiable)</CardTitle>
              <p className="text-center text-sm text-muted-foreground">
                Every healthcare AI system built by AGIX Technologies follows these principles:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                  <p className="text-sm font-medium mb-3">AGIX Technologies healthcare AI systems are built to align with:</p>
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

          {/* HIPAA Governance Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Governance & HIPAA Compliance: How Each Principle Maps</CardTitle>
              <p className="text-center text-sm text-muted-foreground">Every AGIX healthcare AI system is governed by six principles, each mapped to HIPAA requirements.</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Governance Principle</th>
                      <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Requirement</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary">HIPAA Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {governanceRows.map((row, i) => (
                      <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}`}>
                        <td className="py-3 px-4 font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary shrink-0">{i + 1}</span>
                            {row.principle}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{row.requirement}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{row.hipaaRelevance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              Ready to Build Healthcare AI That{" "}
              <span className="text-primary">Clinicians Trust?</span>
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
                  "Understand implementation timeline and clinical risk",
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
      {/* ==================== FUTURE OF AI: 2028 ==================== */}
      <section className="py-16 bg-muted/20" data-testid="section-future-2028">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-3"><Sparkles className="w-3 h-3 mr-1" />Future Outlook</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">The Future of AI in Healthcare: What to Expect by 2028</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The next three years will see healthcare AI shift from departmental tools to enterprise-wide intelligence platforms. Here's what's coming — and how to prepare.</p>
          </motion.div>
          <div className="space-y-4">
            {[
              { num: 1, title: "Ambient clinical intelligence will become standard", desc: "AI will passively listen, document, and flag throughout every patient encounter — reducing clinician note-taking to near zero. Early adopters building documentation AI now will have 2–3 year head starts." },
              { num: 2, title: "Predictive AI will move from department to enterprise", desc: "Readmission, sepsis, staffing, and revenue predictions will converge into unified operational intelligence platforms. Organizations with clean data pipelines and AI infrastructure will scale fastest." },
              { num: 3, title: "AI will coordinate full care journeys — not just individual touchpoints", desc: "End-to-end care orchestration AI will manage patient journeys from first contact through discharge and follow-up. Care coordination agents will handle the complexity of multi-provider care." },
              { num: 4, title: "Regulatory AI will become a clinical requirement, not an option", desc: "Governments will mandate AI audit trails and explainability documentation for clinical AI systems. Organizations building governance-first AI now will be ready. Others will scramble." },
              { num: 5, title: "Mental health AI will become a primary care tool", desc: "AI companions and mental health support systems will be embedded in primary care pathways — expanding access by 10x in underserved regions while reducing stigma barriers to care." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="flex gap-4 p-5 rounded-xl border border-border bg-card hover-elevate">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-primary">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="text-foreground font-medium">Organizations that start with focused, governance-first AI today will have the infrastructure, trust, and data advantage to scale into these capabilities as they emerge.</p>
            <p className="text-muted-foreground text-sm mt-2">AGIX Technologies designs healthcare AI systems for today's efficiency needs and tomorrow's enterprise intelligence requirements.</p>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT THE AUTHOR ==================== */}
      <section className="py-12 bg-background border-t border-border" data-testid="about-author-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-xl border border-border bg-card">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-2xl font-bold text-primary select-none" aria-label="Santosh Singh">
              SS
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">About the Author</p>
              <h3 className="font-bold text-foreground text-lg mb-1" data-testid="author-name">
                <Link href="/author/santosh/" className="hover:text-primary transition-colors">Santosh Singh</Link>
              </h3>
              <p className="text-sm text-primary mb-2">Founder &amp; CEO, AGIX Technologies · April 2026</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Santosh leads healthcare AI systems engineering at AGIX Technologies. His healthcare AI projects include clinical triage (Babylon Health — 24M users), mental health support (Kite Therapy — 89% retention), patient flow automation, clinical knowledge RAG systems, and revenue cycle intelligence. 90+ AI projects deployed across healthcare, fintech, real estate, SaaS, and enterprise operations.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">Clinical AI Systems</Badge>
                <Badge variant="outline" className="text-xs">HIPAA-Compliant Architecture</Badge>
                <Badge variant="outline" className="text-xs">RAG Knowledge Systems</Badge>
                <Badge variant="outline" className="text-xs">Revenue Cycle Intelligence</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={documentFAQs['healthcare-ai-solutions']}
        title="Healthcare AI: 10 Questions Answered"
      />

      {/* ==================== BOTTOM FINAL CTA LEAD FORM ==================== */}
      <section className="py-16 bg-gradient-to-r from-primary/15 via-cyan-500/10 to-primary/15 border-t border-border" data-testid="section-bottom-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <Badge className="mb-4" data-testid="badge-bottom-cta"><HeartPulse className="w-3 h-3 mr-1" />Start Your Healthcare AI Journey</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Build Healthcare AI That{" "}
              <span className="text-primary">Clinicians Actually Trust?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Book a free 30-minute strategy session. Tell us your biggest challenge — we&apos;ll map the right AI starting point, with a clear timeline and zero fluff.
            </p>
          </motion.div>
          <IndustryLeadForm
            challengeOptions={healthcareChallengeOptions}
            ctaLabel="Book Free Strategy Session"
            challengeLabel="Primary Use Case"
            challengePlaceholder="What do you want to solve?"
            namePlaceholder="Dr. / Mr. / Ms. Your Name"
            orgPlaceholder="Hospital / Clinic / Platform"
            disclaimer="No commitment. HIPAA-compliant. Our healthcare AI team responds within one business day."
            successMessage="Our healthcare AI team will reach out within one business day with a tailored strategy roadmap."
            industry="healthcare"
            formType="healthcare-bottom-cta"
            source="/industries/healthcare-ai-solutions"
            ctaId="healthcare-bottom-form"
            ctaLocation="bottom-page-post-faq"
            testIdPrefix="bottom"
          />
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-primary" />HIPAA-compliant</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-primary" />Human-in-the-loop governance</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-primary" />No autonomous clinical actions</span>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
