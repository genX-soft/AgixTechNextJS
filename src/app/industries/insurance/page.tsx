'use client'
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
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
  Shield,
  Users,
  FileText,
  Brain,
  MessageSquare,
  TrendingUp,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  Zap,
  Bot,
  Search,
  Calculator,
  Building2,
  BarChart3,
  HelpCircle,
  Layers,
  Settings,
  Database,
  LineChart,
  Globe,
  AlertCircle,
  XCircle,
  RefreshCw,
  Star,
  Scale,
  UserCheck,
  Phone,
  HeadphonesIcon,
  Eye,
  Activity,
  ChevronDown,
  Loader2,
  FileCheck,
  Handshake,
  ShieldCheck,
  ClipboardList,
  Smartphone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const insurerTypes = [
  { id: "carrier", label: "Insurance Carrier", icon: Building2 },
  { id: "insurtech", label: "InsurTech Startup", icon: Zap },
  { id: "mga", label: "MGA / TPA", icon: Handshake },
  { id: "broker", label: "Broker / Agent", icon: Users },
  { id: "health", label: "Health Insurer", icon: HeadphonesIcon },
  { id: "enterprise", label: "Enterprise / Reinsurer", icon: Layers },
];

const challenges = [
  { id: "claims", label: "Claims Processing" },
  { id: "fraud", label: "Fraud Detection" },
  { id: "underwriting", label: "Underwriting Speed" },
  { id: "compliance", label: "Compliance & Audit" },
  { id: "customer", label: "Customer Service" },
  { id: "documents", label: "Document Processing" },
  { id: "lossratio", label: "Loss Ratio" },
  { id: "coordination", label: "Broker/TPA Coordination" },
];

const realityProblems = [
  "Claims processing is slow and manual",
  "Fraud adapts faster than rules",
  "Underwriting decisions vary by reviewer",
  "Compliance audits drain time and focus",
  "Customers expect instant, transparent service",
  "Loss ratio visibility is always lagging",
];

const bottlenecks = [
  {
    id: "A",
    title: "Slow, Manual Claims Processing",
    icon: Clock,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    symptoms: [
      "Long claim cycles frustrate customers",
      "Human review overload on adjusters",
      "Poor customer experience and complaints",
      "Inconsistent settlement decisions",
      "High operational cost per claim",
    ],
    reality: [
      "High claim abandonment",
      "Customer churn to competitors",
      "Adjuster burnout and turnover",
      "Speed and consistency break first—then trust",
    ],
    whoFaces: "P&C insurers, health insurers, claims departments",
    whyExists: "Traditional claims workflows rely on manual review, siloed systems, and paper-based processes.",
    solution: {
      name: "AI Claims Intake & Triage Engine",
      description: "Faster Claims with Consistent Decision Logic",
      whatItDoes: [
        "Ingests claims from multiple channels automatically",
        "Triages claims by complexity and urgency",
        "Routes simple claims for auto-adjudication",
        "Escalates complex claims to human adjusters with context",
      ],
      aiType: "NLP + Document AI + Rule Engine + ML Classification",
      techStack: "GPT-4, OCR, Claims Management API, Workflow Engine",
      timeline: "6-10 weeks",
      costSmall: "$12K - $20K",
      costLarge: "$25K - $45K",
      impact: "40-60% faster claims processing, 30% cost reduction",
    },
  },
  {
    id: "B",
    title: "Claims Fraud & Leakage",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    symptoms: [
      "Inflated claims slipping through",
      "Fake accidents and staged events",
      "Provider fraud and overbilling",
      "Collusion patterns undetected",
      "Rising fraud losses quarter over quarter",
    ],
    reality: [
      "False positives blocking legitimate claims",
      "Manual fraud reviews creating bottlenecks",
      "Post-payment fraud discovery",
      "Fraud evolves faster than rule-based systems",
    ],
    whoFaces: "All insurers, especially auto, health, and property",
    whyExists: "Fraud patterns evolve faster than static rule-based detection systems can adapt.",
    solution: {
      name: "AI Claims Fraud Detection & Scoring",
      description: "Real-time Fraud Prevention, Fewer False Positives",
      whatItDoes: [
        "Real-time claim risk scoring at intake",
        "Pattern detection across claims history",
        "Network analysis for collusion detection",
        "Explainable fraud flags for investigators",
      ],
      aiType: "Anomaly Detection + Graph ML + Supervised Classification",
      techStack: "Isolation Forest, GNN, Feature Store, Investigation Dashboard",
      timeline: "8-12 weeks",
      costSmall: "$18K - $30K",
      costLarge: "$35K - $60K",
      impact: "30-50% fraud reduction, 40% fewer false positives",
    },
  },
  {
    id: "C",
    title: "Underwriting Inefficiency & Risk Mispricing",
    icon: Scale,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    symptoms: [
      "Static risk models with outdated factors",
      "Inconsistent underwriting decisions",
      "Missed risk signals in applications",
      "Slow quote turnaround times",
      "Adverse selection in portfolio",
    ],
    reality: [
      "Poor loss ratios on certain segments",
      "Underwriters overloaded with manual reviews",
      "Competitors winning with faster quotes",
      "Legacy models don't adapt to new risk patterns",
    ],
    whoFaces: "Carriers, MGAs, InsurTech platforms",
    whyExists: "Traditional underwriting relies on static rules and manual judgment that can't scale with modern risk complexity.",
    solution: {
      name: "AI Underwriting & Risk Pricing Engine",
      description: "Smarter Risk Selection, Faster Quotes",
      whatItDoes: [
        "Automated risk scoring from application data",
        "Dynamic pricing based on risk signals",
        "Straight-through processing for standard risks",
        "Refer complex cases with risk summaries",
      ],
      aiType: "ML Risk Models + Feature Engineering + Decision Rules",
      techStack: "XGBoost/LightGBM, SHAP, Underwriting APIs, Quote Engine",
      timeline: "8-12 weeks",
      costSmall: "$15K - $25K",
      costLarge: "$30K - $50K",
      impact: "50-70% faster quotes, 15-25% loss ratio improvement",
    },
  },
  {
    id: "D",
    title: "Policy Servicing & Customer Support Load",
    icon: HeadphonesIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    symptoms: [
      "Policy queries overwhelming support teams",
      "Endorsement requests delayed",
      "Renewal processes manual and slow",
      "Customer confusion about coverage",
      "High support volume and cost",
    ],
    reality: [
      "Slow response times hurt retention",
      "Agents waste time on routine queries",
      "Customer self-service is limited",
      "Support costs scale linearly with policies",
    ],
    whoFaces: "All insurers, especially personal lines and health",
    whyExists: "Support teams handle predictable, repetitive insurance queries manually.",
    solution: {
      name: "AI Policy Servicing Assistant",
      description: "24/7 Intelligent Customer Service",
      whatItDoes: [
        "Handle 60-80% of queries autonomously",
        "Policy lookups and coverage explanations",
        "Endorsement and renewal processing",
        "Seamless escalation to human agents",
      ],
      aiType: "Conversational AI + RAG + Policy System Integration",
      techStack: "GPT-4/Claude, Vector DB, Policy Admin APIs",
      timeline: "4-8 weeks",
      costSmall: "$8K - $15K",
      costLarge: "$18K - $30K",
      impact: "60-80% query deflection, 40% cost reduction, improved CSAT",
    },
  },
  {
    id: "E",
    title: "Compliance, Audit & Regulatory Burden",
    icon: ClipboardList,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    symptoms: [
      "Manual regulatory reporting",
      "Audit fatigue and stress",
      "Documentation gaps discovered late",
      "Inconsistent compliance checks",
      "State/regional regulation complexity",
    ],
    reality: [
      "Delayed audits and findings",
      "Regulatory penalties and warnings",
      "Compliance team overload",
      "Reactive instead of proactive compliance",
    ],
    whoFaces: "All regulated insurers, especially multi-state operations",
    whyExists: "Compliance processes are often manual, fragmented, and reactive, even as regulations tighten.",
    solution: {
      name: "AI Compliance & Audit Automation",
      description: "Proactive, Audit-Ready Compliance",
      whatItDoes: [
        "Automated regulatory change tracking",
        "Policy and procedure gap analysis",
        "Audit trail automation and reporting",
        "Compliance alerts and dashboards",
      ],
      aiType: "NLP + Rule Engine + Document Analysis",
      techStack: "GPT-4, Regulatory Feeds, Compliance Dashboard",
      timeline: "6-10 weeks",
      costSmall: "$12K - $20K",
      costLarge: "$25K - $40K",
      impact: "50% less manual compliance work, proactive risk detection",
    },
  },
  {
    id: "F",
    title: "Data Fragmentation & Document Chaos",
    icon: FileText,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    symptoms: [
      "PDFs, images, emails scattered everywhere",
      "Unstructured claim data requires manual entry",
      "Policy documents hard to search",
      "Extraction errors in data entry",
      "No single source of truth",
    ],
    reality: [
      "Slow processing due to manual extraction",
      "Errors propagating through systems",
      "Difficulty in analytics and reporting",
      "Documents exist but insights don't",
    ],
    whoFaces: "Claims departments, underwriting, operations",
    whyExists: "Insurance runs on documents, but most remain unstructured and siloed.",
    solution: {
      name: "AI Document Intelligence",
      description: "Extract, Classify, and Activate Document Data",
      whatItDoes: [
        "OCR and intelligent document classification",
        "Automated data extraction from forms",
        "Policy and claims document parsing",
        "Searchable document repository",
      ],
      aiType: "Document AI + OCR + NLP + Classification",
      techStack: "Document AI, Vector DB, Search Engine, API Integration",
      timeline: "4-8 weeks",
      costSmall: "$8K - $15K",
      costLarge: "$18K - $35K",
      impact: "70% faster document processing, 90% extraction accuracy",
    },
  },
  {
    id: "G",
    title: "Loss Ratio & Portfolio Visibility Gaps",
    icon: BarChart3,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    symptoms: [
      "Delayed risk signals from portfolio",
      "Lagging KPIs and reports",
      "Reactive loss management",
      "No early warning indicators",
      "Segment performance blind spots",
    ],
    reality: [
      "Problems discovered too late to prevent",
      "Board reports based on stale data",
      "Risk committees lack real-time visibility",
      "Most systems report history, not trends",
    ],
    whoFaces: "Actuarial, risk management, executive leadership",
    whyExists: "Traditional reporting is backward-looking and batch-processed, not real-time.",
    solution: {
      name: "Loss Ratio & Portfolio Risk Intelligence",
      description: "Predictive Portfolio Insights",
      whatItDoes: [
        "Real-time loss ratio monitoring",
        "Early warning indicators for segments",
        "Cohort performance tracking",
        "Automated alerts and recommendations",
      ],
      aiType: "Analytics + ML Forecasting + Alert Systems",
      techStack: "Time-series models, BI Tools, Alert Engine, Data Warehouse",
      timeline: "6-10 weeks",
      costSmall: "$12K - $20K",
      costLarge: "$25K - $45K",
      impact: "Proactive risk management, 20% faster corrective actions",
    },
  },
  {
    id: "H",
    title: "Broker, Agent & TPA Coordination Issues",
    icon: Handshake,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    symptoms: [
      "Manual handoffs between parties",
      "Status confusion and delays",
      "SLA breaches with partners",
      "Communication gaps and errors",
      "Inconsistent information across channels",
    ],
    reality: [
      "Partner frustration and churn",
      "Escalations consuming leadership time",
      "Competitive disadvantage vs. integrated platforms",
      "Coordination overhead scales with partners",
    ],
    whoFaces: "Carriers working with brokers, MGAs, TPAs",
    whyExists: "Partner coordination often relies on email, spreadsheets, and manual processes.",
    solution: {
      name: "AI Broker & TPA Coordination Agent",
      description: "Streamlined Partner Operations",
      whatItDoes: [
        "Automated status updates and notifications",
        "Intelligent query handling for partners",
        "SLA monitoring and alerts",
        "Self-service portal with AI assistance",
      ],
      aiType: "Conversational AI + Workflow Automation + Integration",
      techStack: "GPT-4, Partner Portal, API Hub, Alert Engine",
      timeline: "6-10 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$22K - $40K",
      impact: "50% reduction in coordination overhead, improved partner satisfaction",
    },
  },
];

const industryStats = [
  { icon: Clock, value: "72%", label: "Want faster claims decisions" },
  { icon: Shield, value: "$80B", label: "Annual fraud losses globally" },
  { icon: MessageSquare, value: "65%", label: "Expect 24/7 digital service" },
  { icon: Users, value: "40%", label: "Switch after poor claims experience" },
];

const roleBasedPaths = [
  { role: "Insurance Carrier", path: "A → B → G", description: "Claims first, then fraud, then portfolio intelligence" },
  { role: "InsurTech Startup", path: "C → D → B", description: "Underwriting speed, then service, then fraud" },
  { role: "MGA / TPA", path: "A → H → F", description: "Claims processing, partner coordination, documents" },
  { role: "Health Insurer", path: "B → A → E", description: "Fraud detection, claims, then compliance" },
];

const faqItems = [
  {
    question: "Can AI approve claims automatically?",
    answer: "Yes — for straightforward claims that meet defined criteria. AI handles triage and auto-adjudication for simple claims while routing complex cases to human adjusters with full context and recommendations.",
  },
  {
    question: "How is fraud explained to auditors and regulators?",
    answer: "Through explainable model outputs, feature contribution scores, decision thresholds, and complete audit trails. AGIX designs systems to be audit-ready and regulator-friendly by default.",
  },
  {
    question: "Is AI compliant with insurance regulations?",
    answer: "Yes — when designed correctly. We build governance, explainability, and human oversight into every system. AI decisions include confidence scores, reasoning, and escalation paths.",
  },
  {
    question: "Can we start with just one line of business?",
    answer: "Absolutely. Most insurers start with one product line (e.g., auto claims or property underwriting) to prove value, then expand systematically.",
  },
  {
    question: "How do we avoid false claim denials?",
    answer: "By using AI as decision support, not autonomous rejection. All denial recommendations include confidence scores and require human review for anything below threshold.",
  },
  {
    question: "What data does AI need for claims and underwriting?",
    answer: "Depends on use case: claims history, policy data, application information, external data sources. All data usage is policy-controlled, logged, and auditable.",
  },
  {
    question: "How long does implementation take?",
    answer: "Most insurance AI systems go live in 6-12 weeks, depending on data readiness, regulatory scope, and integration complexity.",
  },
  {
    question: "What happens if AI makes a wrong recommendation?",
    answer: "Every system includes confidence thresholds, human-in-the-loop review, escalation rules, and full traceability. AI assists decisions — humans remain accountable.",
  },
  {
    question: "Can AI handle different insurance products?",
    answer: "Yes. Systems are configured per product line with appropriate rules, thresholds, and workflows. A single platform can serve multiple products with product-specific logic.",
  },
  {
    question: "How does AI improve underwriting without increasing risk?",
    answer: "By processing more signals than humans can review, maintaining consistency, and flagging only edge cases for human review. Speed improves because decision quality improves.",
  },
  {
    question: "What are the ongoing costs after implementation?",
    answer: "Ongoing costs include AI usage, cloud infrastructure, and monitoring/governance. These costs are predictable, transparent, and typically 10-15% of initial build cost per year.",
  },
  {
    question: "Is this suitable across different countries and regulations?",
    answer: "Yes. AI systems are configured to align with region-specific regulatory frameworks, not hard-coded assumptions. Multi-jurisdiction deployment is common.",
  },
  {
    question: "How does AGIX handle data security?",
    answer: "Enterprise-grade security including encryption, access controls, audit logging, and compliance with SOC 2, HIPAA (for health), and other relevant standards.",
  },
  {
    question: "Can AI reduce our loss ratio?",
    answer: "Yes — through better risk selection in underwriting, earlier fraud detection, and more consistent claims handling. Most clients see 10-20% loss ratio improvement within 12 months.",
  },
  {
    question: "What role does AGIX play after deployment?",
    answer: "AGIX works as a long-term AI systems partner, providing monitoring, optimization, governance updates, model tuning, and expansion planning.",
  },
];

const costTable = [
  { role: "Small Insurer / MGA", scope: "Single use case, 1 product", cost: "$8K - $20K" },
  { role: "Mid-Market Insurer", scope: "Multiple use cases, 2-3 products", cost: "$25K - $50K" },
  { role: "Large Carrier / Enterprise", scope: "Enterprise-wide, multi-line", cost: "$60K - $150K+" },
];

const roiMetrics = [
  { area: "Claims Cycle Time", improvement: "40-60% faster" },
  { area: "Fraud Loss Reduction", improvement: "30-50% decrease" },
  { area: "Underwriting Speed", improvement: "50-70% faster" },
  { area: "Support Query Deflection", improvement: "60-80% automated" },
  { area: "Loss Ratio", improvement: "10-20% improvement" },
];

function InsuranceSolutionFinder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    insurerType: "",
    challenge: "",
    monthlyVolume: 1000,
    hasDataPipeline: "",
  });
  const [result, setResult] = useState<{
    system: string;
    why: string;
    timeline: string;
    cost: string;
    nextPhase: string;
  } | null>(null);

  const generateRecommendation = () => {
    let system = "";
    let why = "";
    let timeline = "";
    let cost = "";
    let nextPhase = "";

    if (inputs.challenge === "claims") {
      system = "AI Claims Intake & Triage Engine";
      why = "Slow claims processing is hurting customer satisfaction and increasing costs. AI automates triage and accelerates simple claims.";
      timeline = "6-10 weeks";
      cost = inputs.monthlyVolume <= 2000 ? "$12K - $20K" : "$25K - $45K";
      nextPhase = "Claims Fraud Detection";
    } else if (inputs.challenge === "fraud") {
      system = "AI Claims Fraud Detection & Scoring";
      why = "Rules-based fraud detection can't keep up with evolving patterns. ML models adapt in real-time and reduce false positives.";
      timeline = "8-12 weeks";
      cost = "$18K - $35K";
      nextPhase = "Claims Automation";
    } else if (inputs.challenge === "underwriting") {
      system = "AI Underwriting & Risk Pricing Engine";
      why = "Manual underwriting is slow and inconsistent. AI enables faster quotes with better risk selection.";
      timeline = "8-12 weeks";
      cost = "$15K - $30K";
      nextPhase = "Portfolio Intelligence";
    } else if (inputs.challenge === "compliance") {
      system = "AI Compliance & Audit Automation";
      why = "Manual compliance is slow, error-prone, and reactive. AI automates monitoring and maintains audit trails.";
      timeline = "6-10 weeks";
      cost = "$12K - $25K";
      nextPhase = "Document Intelligence";
    } else if (inputs.challenge === "customer") {
      system = "AI Policy Servicing Assistant";
      why = "Support teams are overwhelmed with routine queries. AI handles 60-80% of inquiries instantly.";
      timeline = "4-8 weeks";
      cost = "$8K - $18K";
      nextPhase = "Claims Automation";
    } else if (inputs.challenge === "documents") {
      system = "AI Document Intelligence";
      why = "Manual document processing is slow and error-prone. AI extracts, classifies, and activates document data.";
      timeline = "4-8 weeks";
      cost = "$8K - $18K";
      nextPhase = "Claims Automation";
    } else if (inputs.challenge === "lossratio") {
      system = "Loss Ratio & Portfolio Risk Intelligence";
      why = "Lagging KPIs mean problems are discovered too late. AI provides real-time portfolio visibility and early warnings.";
      timeline = "6-10 weeks";
      cost = "$12K - $25K";
      nextPhase = "Underwriting AI";
    } else if (inputs.challenge === "coordination") {
      system = "AI Broker & TPA Coordination Agent";
      why = "Partner coordination overhead is eating into margins. AI streamlines communication and automates status updates.";
      timeline = "6-10 weeks";
      cost = "$10K - $22K";
      nextPhase = "Document Intelligence";
    } else {
      system = "AI Claims + Fraud Detection";
      why = "Start with the highest-ROI combination: faster claims and reduced fraud losses.";
      timeline = "10-14 weeks";
      cost = "$25K - $50K";
      nextPhase = "Underwriting AI";
    }

    setResult({ system, why, timeline, cost, nextPhase });
    setStep(5);
  };

  return (
    <Card id="solution-finder" className="scroll-mt-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Find My Insurance AI Solution
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Takes ~30 seconds. Get a personalized recommendation for your insurance operations.
        </p>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Label className="text-base font-medium">What type of insurance organization are you?</Label>
              <div className="grid grid-cols-2 gap-2">
                {insurerTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={inputs.insurerType === type.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, insurerType: type.id });
                      setStep(2);
                    }}
                    className="justify-start h-auto py-3"
                    data-testid={`button-finder-insurer-${type.id}`}
                  >
                    <type.icon className="w-4 h-4 mr-2" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Label className="text-base font-medium">What's your biggest operational challenge?</Label>
              <div className="grid grid-cols-2 gap-2">
                {challenges.map((c) => (
                  <Button
                    key={c.id}
                    variant={inputs.challenge === c.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, challenge: c.id });
                      setStep(3);
                    }}
                    className="justify-start h-auto py-3 text-sm"
                    data-testid={`button-finder-challenge-${c.id}`}
                  >
                    {c.label}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setStep(1)} className="mt-2">
                Back
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Label className="text-base font-medium">
                Monthly claims or policy volume? ({inputs.monthlyVolume.toLocaleString()})
              </Label>
              <Slider
                value={[inputs.monthlyVolume]}
                onValueChange={(val) => setInputs({ ...inputs, monthlyVolume: val[0] })}
                min={100}
                max={50000}
                step={100}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100</span>
                <span>50,000+</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={() => setStep(4)} data-testid="button-finder-next-volume">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Label className="text-base font-medium">How mature is your data infrastructure?</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "yes", label: "Modern, API-accessible" },
                  { id: "partial", label: "Partial / Mixed systems" },
                  { id: "no", label: "Legacy / Manual processes" },
                  { id: "unsure", label: "Not sure" },
                ].map((opt) => (
                  <Button
                    key={opt.id}
                    variant={inputs.hasDataPipeline === opt.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, hasDataPipeline: opt.id });
                      generateRecommendation();
                    }}
                    className="h-auto py-3"
                    data-testid={`button-finder-data-${opt.id}`}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" onClick={() => setStep(3)} className="mt-2">
                Back
              </Button>
            </motion.div>
          )}

          {step === 5 && result && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-lg mb-2">Recommended AI System</h4>
                <p className="text-xl font-bold text-primary">{result.system}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Why This Fits</p>
                    <p className="text-sm text-muted-foreground">{result.why}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="text-sm font-medium">{result.timeline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="text-sm font-medium">{result.cost}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Phase 2 Recommendation</p>
                  <p className="text-sm font-medium">{result.nextPhase}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setResult(null);
                    setInputs({ insurerType: "", challenge: "", monthlyVolume: 1000, hasDataPipeline: "" });
                  }}
                  data-testid="button-finder-restart"
                >
                  Start Over
                </Button>
                <Button asChild data-testid="button-finder-get-roadmap">
                  <a href="#lead-form">Get My Full Roadmap</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function ClaimsLeakageCalculator() {
  const [inputs, setInputs] = useState({
    monthlyClaimsVolume: 1000,
    avgClaimValue: 5000,
    currentProcessingDays: "7-14",
    fraudRate: 5,
    denialAppealRate: 15,
  });

  const processingImpact: Record<string, number> = {
    "1-3": 0.95,
    "3-7": 0.85,
    "7-14": 0.75,
    "14-30": 0.60,
    "30+": 0.45,
  };

  const calculations = useMemo(() => {
    const fraudLoss = inputs.monthlyClaimsVolume * inputs.avgClaimValue * (inputs.fraudRate / 100);
    const appealCost = inputs.monthlyClaimsVolume * (inputs.denialAppealRate / 100) * 250;
    const efficiencyLoss = inputs.monthlyClaimsVolume * inputs.avgClaimValue * (1 - processingImpact[inputs.currentProcessingDays]) * 0.02;
    const totalLeakage = fraudLoss + appealCost + efficiencyLoss;

    return {
      fraudLoss: Math.round(fraudLoss),
      appealCost: Math.round(appealCost),
      efficiencyLoss: Math.round(efficiencyLoss),
      totalLeakage: Math.round(totalLeakage),
      annualLeakage: Math.round(totalLeakage * 12),
      potentialSavings: Math.round(totalLeakage * 12 * 0.4),
    };
  }, [inputs]);

  return (
    <Card id="leakage-calculator" className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-500" />
          Claims Leakage & Fraud Cost Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Understand how slow claims, fraud, and operational inefficiency impact your bottom line
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Monthly Claims Volume</Label>
                <span className="text-sm font-medium">{inputs.monthlyClaimsVolume.toLocaleString()}</span>
              </div>
              <Slider
                value={[inputs.monthlyClaimsVolume]}
                onValueChange={(v) => setInputs({ ...inputs, monthlyClaimsVolume: v[0] })}
                min={100}
                max={20000}
                step={100}
                data-testid="slider-claims-volume"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Average Claim Value ($)</Label>
                <span className="text-sm font-medium">${inputs.avgClaimValue.toLocaleString()}</span>
              </div>
              <Slider
                value={[inputs.avgClaimValue]}
                onValueChange={(v) => setInputs({ ...inputs, avgClaimValue: v[0] })}
                min={500}
                max={50000}
                step={500}
                data-testid="slider-claim-value"
              />
            </div>
            <div>
              <Label className="mb-2 block">Average Processing Time (Days)</Label>
              <Select
                value={inputs.currentProcessingDays}
                onValueChange={(value) => setInputs({ ...inputs, currentProcessingDays: value })}
              >
                <SelectTrigger data-testid="select-processing-time">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 days</SelectItem>
                  <SelectItem value="3-7">3-7 days</SelectItem>
                  <SelectItem value="7-14">7-14 days</SelectItem>
                  <SelectItem value="14-30">14-30 days</SelectItem>
                  <SelectItem value="30+">30+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Estimated Fraud Rate (%)</Label>
                <span className="text-sm font-medium">{inputs.fraudRate}%</span>
              </div>
              <Slider
                value={[inputs.fraudRate]}
                onValueChange={(v) => setInputs({ ...inputs, fraudRate: v[0] })}
                min={1}
                max={15}
                step={0.5}
                data-testid="slider-fraud-rate"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Denial Appeal Rate (%)</Label>
                <span className="text-sm font-medium">{inputs.denialAppealRate}%</span>
              </div>
              <Slider
                value={[inputs.denialAppealRate]}
                onValueChange={(v) => setInputs({ ...inputs, denialAppealRate: v[0] })}
                min={5}
                max={40}
                step={1}
                data-testid="slider-appeal-rate"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-destructive/10 to-orange-500/10 rounded-lg p-6 border border-destructive/20">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Your Monthly Claims Leakage
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Fraud Losses</p>
                <p className="text-2xl font-bold text-destructive">${calculations.fraudLoss.toLocaleString()}/mo</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Appeal Processing Cost</p>
                <p className="text-xl font-bold text-orange-500">
                  ${calculations.appealCost.toLocaleString()}/mo
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processing Inefficiency Cost</p>
                <p className="text-xl font-bold text-yellow-500">
                  ${calculations.efficiencyLoss.toLocaleString()}/mo
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Total Annual Leakage</p>
                <p className="text-3xl font-bold text-destructive">
                  ${calculations.annualLeakage.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-green-500 font-medium">Potential Annual Savings with AI:</p>
              <p className="text-2xl font-bold text-green-500">${calculations.potentialSavings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Based on 40% improvement with AI systems</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AIReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const questions = [
    { id: "data", text: "Do you have 12+ months of claims/policy data accessible?" },
    { id: "digital", text: "Are your core systems API-accessible?" },
    { id: "documents", text: "Is most claim documentation digitized?" },
    { id: "volume", text: "Do you process 500+ claims/policies monthly?" },
    { id: "governance", text: "Do you have a data governance/compliance team?" },
  ];

  const score = Object.values(answers).filter(Boolean).length * 20;

  const getRecommendation = () => {
    if (score >= 80) return { level: "High", start: "Claims AI + Fraud Detection", avoid: "None — ready for comprehensive AI", color: "text-green-500" };
    if (score >= 60) return { level: "Moderate", start: "Document AI + Customer Support", avoid: "Complex underwriting until data matures", color: "text-blue-500" };
    if (score >= 40) return { level: "Developing", start: "Document Intelligence first", avoid: "Real-time fraud detection until volume grows", color: "text-yellow-500" };
    return { level: "Early", start: "Data infrastructure & digitization", avoid: "AI implementations until basics in place", color: "text-orange-500" };
  };

  const recommendation = getRecommendation();

  return (
    <Card id="readiness-quiz" className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          AI Readiness Score for Insurance
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Evaluate your organization's readiness for AI adoption
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
          >
            <span className="text-sm">{q.text}</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={answers[q.id] === true ? "default" : "outline"}
                onClick={() => setAnswers({ ...answers, [q.id]: true })}
                data-testid={`button-readiness-${q.id}-yes`}
              >
                Yes
              </Button>
              <Button
                size="sm"
                variant={answers[q.id] === false ? "default" : "outline"}
                onClick={() => setAnswers({ ...answers, [q.id]: false })}
                data-testid={`button-readiness-${q.id}-no`}
              >
                No
              </Button>
            </div>
          </div>
        ))}

        <Button
          onClick={() => setShowScore(true)}
          className="w-full"
          disabled={Object.keys(answers).length < 5}
          data-testid="button-calculate-readiness"
        >
          Calculate Readiness Score
        </Button>

        <AnimatePresence>
          {showScore && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">AI Readiness Score</p>
                <p className="text-4xl font-bold text-primary">{score}/100</p>
                <Badge className={`mt-2 ${recommendation.color}`}>{recommendation.level} Readiness</Badge>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Start With</p>
                  <p className="text-sm font-medium">{recommendation.start}</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Avoid For Now</p>
                  <p className="text-sm font-medium">{recommendation.avoid}</p>
                </div>
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData(e.currentTarget);
    const data = {
      name: formDataObj.get("name") as string,
      email: formDataObj.get("email") as string,
      company: formDataObj.get("company") as string,
      insurerType: formDataObj.get("insurerType") as string,
      insuranceLine: formDataObj.get("insuranceLine") as string,
      challenge: formDataObj.get("challenge") as string,
      volume: formDataObj.get("volume") as string,
      region: formDataObj.get("region") as string,
      message: formDataObj.get("message") as string,
    };

    const result = await submitLead(
      {
        name: data.name,
        email: data.email,
        company: data.company,
        industry: "insurance",
        companySize: data.volume,
        challenges: [data.challenge],
        message: data.message,
      },
      {
        formType: "insurance-roadmap",
        source: "/industries/insurance",
        ctaId: "insurance-form-submit",
        ctaText: "Request My Insurance AI Roadmap",
        ctaLocation: "/industries/insurance",
        additionalMetadata: {
          insurerType: data.insurerType,
          insuranceLine: data.insuranceLine,
          region: data.region,
        },
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Request Submitted",
        description: "We'll send your personalized Insurance AI roadmap within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    } else {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card id="lead-form" className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" />
          Get Your Insurance AI Roadmap
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          For insurance leaders who want expert validation after exploring our tools.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required data-testid="input-insurance-name" />
            </div>
            <div>
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" name="email" type="email" required data-testid="input-insurance-email" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" name="company" required data-testid="input-insurance-company" />
            </div>
            <div>
              <Label htmlFor="insurerType">Organization Type</Label>
              <Select name="insurerType" required>
                <SelectTrigger data-testid="select-insurance-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carrier">Insurance Carrier</SelectItem>
                  <SelectItem value="insurtech">InsurTech Startup</SelectItem>
                  <SelectItem value="mga">MGA / TPA</SelectItem>
                  <SelectItem value="broker">Broker / Agent</SelectItem>
                  <SelectItem value="health">Health Insurer</SelectItem>
                  <SelectItem value="reinsurer">Reinsurer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="insuranceLine">Line of Insurance</Label>
              <Select name="insuranceLine" required>
                <SelectTrigger data-testid="select-insurance-line">
                  <SelectValue placeholder="Select line" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Insurance</SelectItem>
                  <SelectItem value="property">Property & Casualty</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="life">Life Insurance</SelectItem>
                  <SelectItem value="commercial">Commercial Lines</SelectItem>
                  <SelectItem value="specialty">Specialty / Niche</SelectItem>
                  <SelectItem value="mixed">Multiple Lines</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="challenge">Primary Challenge</Label>
              <Select name="challenge" required>
                <SelectTrigger data-testid="select-insurance-challenge">
                  <SelectValue placeholder="Select challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="claims">Claims Processing</SelectItem>
                  <SelectItem value="fraud">Fraud Detection</SelectItem>
                  <SelectItem value="underwriting">Underwriting</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="customer">Customer Service</SelectItem>
                  <SelectItem value="documents">Document Processing</SelectItem>
                  <SelectItem value="portfolio">Portfolio Intelligence</SelectItem>
                  <SelectItem value="other">Other / Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="volume">Monthly Claims/Policy Volume</Label>
              <Select name="volume" required>
                <SelectTrigger data-testid="select-insurance-volume">
                  <SelectValue placeholder="Select volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<500">Under 500</SelectItem>
                  <SelectItem value="500-2000">500 - 2,000</SelectItem>
                  <SelectItem value="2000-10000">2,000 - 10,000</SelectItem>
                  <SelectItem value="10000+">10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="region">Country / Region</Label>
              <Select name="region" required>
                <SelectTrigger data-testid="select-insurance-region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="apac">Asia Pacific</SelectItem>
                  <SelectItem value="mea">Middle East & Africa</SelectItem>
                  <SelectItem value="latam">Latin America</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="message">Anything else we should know? (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Current systems, specific pain points, timeline..."
              data-testid="textarea-insurance-message"
            />
          </div>
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" disabled={isSubmitting} data-testid="button-insurance-submit">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get My Insurance AI Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            No spam. No sales pressure. Just actionable AI guidance.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default function InsuranceIndustryPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section with Solution Finder */}
      <section className="relative pt-24 lg:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-cyan-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Shield className="w-3 h-3 mr-1" />
                Insurance AI Solutions
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                AI Solutions for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-teal-400">
                  Insurance
                </span>{" "}
                That Accelerate Claims, Reduce Fraud & Improve Risk Decisions
              </h1>

              <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From insurance carriers and insurtech startups to MGAs, TPAs, and brokers—
                  AGIX builds AI systems that shorten claim cycles, detect fraud early, improve underwriting accuracy, and keep operations audit-ready.
                </p>
              </div>

            </motion.div>

            {/* Right: Solution Finder + Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 lg:mt-8"
            >
              <InsuranceSolutionFinder />
              
              {/* Quick Tool Links */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#leakage-calculator"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg border border-orange-500/30 hover-elevate group"
                  data-testid="button-hero-calculator"
                >
                  <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    <Calculator className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Claims Leakage</p>
                    <p className="text-xs text-muted-foreground">Calculator</p>
                  </div>
                </a>

                <a
                  href="#readiness-quiz"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg border border-purple-500/30 hover-elevate group"
                  data-testid="button-hero-readiness"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Readiness</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </a>
              </div>
              
              {/* Industry Reality Statement */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-lg border border-primary/20 text-center">
                <p className="text-lg font-medium text-primary">
                  Insurance doesn't fail because of premiums.
                  <br />
                  It fails when claims, risk, and trust don't scale together.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Stats Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                <TrendingUp className="w-3 h-3 mr-1" />
                Industry Reality
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Why Insurance Leaders Are{" "}
                <span className="text-primary">Investing in AI</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Customer expectations are rising, fraud is evolving, and manual processes can't keep up. Here's what's driving the shift.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industryStats.map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30">
                  <stat.icon className="w-7 h-7 mx-auto mb-3 text-cyan-500" />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
              <AlertCircle className="w-3 h-3 mr-1" />
              Industry Reality Check
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-destructive">Hidden Friction</span> Slowing Your Insurance Operations
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These six operational challenges silently erode efficiency, customer trust, and profitability across the insurance value chain.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Claims Processing is Slow and Manual", 
                description: "Adjusters spend hours on routine claims that could be auto-approved. Manual document review creates bottlenecks and delays payouts.",
                icon: Clock,
                impact: "45% longer cycle times"
              },
              { 
                title: "Fraud Adapts Faster Than Rules", 
                description: "Static rule engines can't keep pace with evolving fraud patterns. Bad actors exploit gaps before rules get updated.",
                icon: Shield,
                impact: "$80B annual losses"
              },
              { 
                title: "Underwriting Decisions Vary by Reviewer", 
                description: "Inconsistent risk assessment leads to mispriced policies. What one underwriter approves, another might decline.",
                icon: Users,
                impact: "23% decision variance"
              },
              { 
                title: "Compliance Audits Drain Time and Focus", 
                description: "Regulatory documentation scattered across systems. Preparing for audits pulls staff away from core operations.",
                icon: FileText,
                impact: "200+ hours per audit"
              },
              { 
                title: "Customers Expect Instant, Transparent Service", 
                description: "Digital-native customers demand real-time updates and self-service. Legacy systems can't deliver modern experiences.",
                icon: Smartphone,
                impact: "40% switch providers"
              },
              { 
                title: "Loss Ratio Visibility is Always Lagging", 
                description: "By the time reports surface problems, damage is done. Real-time portfolio insights remain out of reach.",
                icon: BarChart3,
                impact: "3-6 month delay"
              },
            ].map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-destructive/20 bg-gradient-to-br from-destructive/5 to-orange-500/5">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-destructive/10 rounded-xl shrink-0">
                        <challenge.icon className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-lg">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        <Badge variant="outline" className="text-xs border-destructive/30 bg-destructive/5">
                          {challenge.impact}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your AI Roadmap Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 via-muted/30 to-background border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              Interactive Experience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Build Your AI Roadmap{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                In Minutes
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Instead of just reading, you can use interactive tools to understand your exact situation —
              and walk away with a complete AI roadmap, cost estimate, and implementation timeline.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              { icon: AlertCircle, title: "Identify Claims Leakage", description: "Pinpoint fraud & risk triggers", color: "text-destructive", bg: "bg-destructive/10" },
              { icon: Search, title: "Find Your AI Solution", description: "Role-specific recommendations", color: "text-primary", bg: "bg-primary/10" },
              { icon: DollarSign, title: "See Real Costs", description: "Transparent pricing by scale", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: Clock, title: "Get Timelines", description: "Realistic deployment schedules", color: "text-cyan-500", bg: "bg-cyan-500/10" },
              { icon: CheckCircle2, title: "Decide With Clarity", description: "Know your next step", color: "text-primary", bg: "bg-primary/10" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full text-center hover-elevate border-border/50">
                  <CardContent className="pt-6 pb-4">
                    <div className={`p-3 ${item.bg} rounded-xl w-fit mx-auto mb-3`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 rounded-xl p-6 border border-primary/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/20 rounded-xl">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">No Demo Required. No Sales Call Needed.</h3>
                  <p className="text-muted-foreground">
                    Use the tools below to get a complete AI recommendation — system, cost, timeline, and next steps — before ever talking to anyone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button asChild data-testid="button-section-finder">
                  <a href="#solution-finder">
                    <Search className="w-4 h-4 mr-2" />
                    Find My Solution
                  </a>
                </Button>
                <Button variant="outline" asChild data-testid="button-section-calculator">
                  <a href="#leakage-calculator">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Leakage
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottleneck Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Insurance Bottleneck Map</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Claims, Risk, Fraud & Trust{" "}
              <span className="text-primary">Quietly Break</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Insurance doesn't usually fail in one big event. It erodes silently—through slow claims, rising fraud, inconsistent underwriting, and compliance fatigue.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {bottlenecks.map((bottleneck, index) => (
              <motion.div
                key={bottleneck.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={bottleneck.id} className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-6 hover:no-underline" data-testid={`accordion-bottleneck-${bottleneck.id}`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${bottleneck.bgColor}`}>
                        <bottleneck.icon className={`w-5 h-5 ${bottleneck.color}`} />
                      </div>
                      <div className="text-left">
                        <span className="font-semibold">{bottleneck.id}. {bottleneck.title}</span>
                        <p className="text-sm text-muted-foreground font-normal">{bottleneck.whoFaces}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-muted-foreground" />
                            Symptoms
                          </h4>
                          <ul className="space-y-1">
                            {bottleneck.symptoms.map((symptom, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <XCircle className="w-3 h-3 mt-1 text-destructive shrink-0" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Why This Exists</h4>
                          <p className="text-sm text-muted-foreground">{bottleneck.whyExists}</p>
                        </div>
                      </div>
                      <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            {bottleneck.solution.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{bottleneck.solution.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Timeline:</span>
                              <span className="ml-2 font-medium">{bottleneck.solution.timeline}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Cost:</span>
                              <span className="ml-2 font-medium text-green-500">{bottleneck.solution.costSmall}</span>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Impact:</span>
                            <span className="ml-2 font-medium text-primary">{bottleneck.solution.impact}</span>
                          </div>
                          <div className="pt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground">{bottleneck.solution.aiType}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Role-Based Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-teal-500/5">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Target className="w-6 h-6 text-cyan-500" />
                  Recommended AI Paths by Role
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Start with your highest-impact bottleneck, then expand systematically.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {roleBasedPaths.map((item, i) => (
                    <div key={i} className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium">{item.role}</p>
                      <p className="text-lg font-mono text-primary">{item.path}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Decision Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Evaluate AI Fit{" "}
              <span className="text-primary">Before You Commit</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real calculations, not marketing promises. See your actual leakage and readiness.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ClaimsLeakageCalculator />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <AIReadinessScore />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost & ROI Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Cost, Real{" "}
              <span className="text-primary">ROI</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Clarity before you commit. These are engineering-backed ranges, not sales numbers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cost Table */}
            <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-500" />
                  Insurance AI Cost Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-semibold">Organization</th>
                        <th className="text-left py-3 font-semibold">Typical Scope</th>
                        <th className="text-right py-3 font-semibold">Cost Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costTable.map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-3">{row.role}</td>
                          <td className="py-3 text-muted-foreground">{row.scope}</td>
                          <td className="py-3 text-right font-semibold text-green-500">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* ROI Metrics */}
            <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  What AI Typically Improves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roiMetrics.map((metric, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">{metric.area}</span>
                      <span className="font-semibold text-primary">{metric.improvement}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Star className="w-4 h-4 text-green-500 inline mr-2" />
                  In insurance, catching even a few fraudulent claims per quarter often pays for AI.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Control */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Safety, Control &{" "}
              <span className="text-primary">Governance</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI should feel like a reliable assistant, not a regulatory risk.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Shield, text: "AI never approves claims without defined rules" },
              { icon: Users, text: "Complex cases always escalate to humans" },
              { icon: Database, text: "Full audit trail on every decision" },
              { icon: RefreshCw, text: "Easy override at any point" },
              { icon: Target, text: "Gradual rollout (pilot then expand)" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6 text-center">
                    <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-sm">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Insurance AI{" "}
              <span className="text-primary">FAQs</span>
            </h2>
            <p className="text-muted-foreground">
              Answers to common questions from claims, underwriting, and compliance leaders.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline" data-testid={`accordion-faq-${i}`}>
                  <div className="flex items-center gap-3 text-left">
                    <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Lead Form & CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your{" "}
              <span className="text-primary">Insurance AI Roadmap?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a personalized recommendation based on your insurance line, challenges, and scale.
            </p>
          </motion.div>

          <LeadForm />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground mb-4">Or explore our tools again:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" asChild>
                <a href="#leakage-calculator">
                  <Calculator className="w-4 h-4 mr-2" />
                  Claims Leakage Calculator
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#readiness-quiz">
                  <Target className="w-4 h-4 mr-2" />
                  AI Readiness Score
                </a>
              </Button>
              <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Search className="w-4 h-4 mr-2" />
                Solution Finder
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-muted-foreground">
            AGIX builds governed, explainable AI systems for insurance operations.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            We don't deploy "AI tools." We design insurance decision systems that auditors, regulators, and customers can trust.
          </p>
        </div>
      </footer>
    </div>
  );
}
