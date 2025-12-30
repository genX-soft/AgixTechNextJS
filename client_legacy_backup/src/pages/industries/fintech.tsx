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
  Landmark,
  Users,
  CreditCard,
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
  Shield,
  FileText,
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
  Banknote,
  PiggyBank,
  Wallet,
  Receipt,
  Scale,
  UserCheck,
  Phone,
  HeadphonesIcon,
  Eye,
  Activity,
  ChevronDown,
} from "lucide-react";

const lenderTypes = [
  { id: "fintech-startup", label: "FinTech Startup", icon: Zap },
  { id: "digital-lender", label: "Digital Lender", icon: Landmark },
  { id: "nbfc", label: "NBFC / Micro-lender", icon: Building2 },
  { id: "bank", label: "Bank / Credit Union", icon: Banknote },
  { id: "bnpl", label: "BNPL / Embedded Finance", icon: CreditCard },
  { id: "enterprise", label: "Enterprise Finance", icon: Layers },
];

const challenges = [
  { id: "underwriting", label: "Underwriting Speed" },
  { id: "risk", label: "Default Risk / NPAs" },
  { id: "fraud", label: "Fraud Detection" },
  { id: "compliance", label: "Compliance & Audit" },
  { id: "kyc", label: "KYC & Onboarding" },
  { id: "collections", label: "Collections" },
  { id: "support", label: "Customer Support" },
  { id: "intelligence", label: "Portfolio Intelligence" },
];

const realityProblems = [
  "Manual underwriting slows growth",
  "Fraud adapts faster than rules",
  "Compliance teams are overloaded",
  "Approval delays kill conversion",
  "Risk decisions must be fast and defensible",
  "Thin-file customers are misjudged",
];

const bottlenecks = [
  {
    id: "A",
    title: "Slow, Manual & Inconsistent Credit Underwriting",
    icon: Clock,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    symptoms: [
      "Loan approvals take days instead of minutes",
      "Underwriters manually review similar cases repeatedly",
      "Decisions vary by reviewer",
      "Applicants drop off mid-process",
      "Long turnaround time (TAT)",
    ],
    reality: [
      "High application abandonment",
      "Inconsistent approval rates",
      "Underwriting team overload",
      "Speed and consistency break first—then conversion",
    ],
    whoFaces: "Digital lenders, NBFCs, SME & consumer lending platforms",
    whyExists: "Traditional underwriting relies on manual judgment layered over static rules, which doesn't scale with volume.",
    solution: {
      name: "AI Credit Scoring & Underwriting Engine",
      description: "Faster Approvals with Consistent Risk Logic",
      whatItDoes: [
        "Ingests application data, bureau scores, transaction & behavioral signals",
        "Scores applicants in seconds, not days",
        "Produces approval/rejection/review decisions with risk bands",
        "Routes edge cases to human underwriters",
      ],
      aiType: "Supervised ML + Feature-based risk scoring + Decision rules",
      techStack: "XGBoost/LightGBM, Python, SHAP explainability, Core lending system integration",
      timeline: "6-8 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$18K - $25K",
      impact: "60-80% faster approvals, consistent risk logic across all applications",
    },
  },
  {
    id: "B",
    title: "Poor Risk Segmentation & Rising Default Rates",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    symptoms: [
      "One-size-fits-all credit scoring",
      "Thin-file or new-to-credit customers misjudged",
      "Early warning signs missed",
      "Defaults detected too late",
      "Rising NPAs / delinquencies",
    ],
    reality: [
      "Poor cohort performance",
      "High write-offs",
      "Reactive risk management",
      "Legacy risk models don't adapt to behavioral signals",
    ],
    whoFaces: "BNPL platforms, micro-lenders, emerging-market FinTechs",
    whyExists: "Legacy risk models don't adapt well to behavioral signals, alternative data, or dynamic risk patterns.",
    solution: {
      name: "Alternative Data Risk Intelligence",
      description: "Smarter Segmentation, Lower Defaults",
      whatItDoes: [
        "Ingest alternative data (bank statements, GST, behavioral)",
        "Segment borrowers beyond bureau scores",
        "Flag early default risk signals",
        "Enable risk-based pricing",
      ],
      aiType: "ML risk models + Alternative data fusion + Early warning systems",
      techStack: "LightGBM, Bank Statement Parsers, Bureau APIs, Feature Store",
      timeline: "6-10 weeks",
      costSmall: "$12K - $20K",
      costLarge: "$20K - $35K",
      impact: "15-25% improvement in default prediction, better thin-file inclusion",
    },
  },
  {
    id: "C",
    title: "Fraud, Identity Theft & Synthetic Identity Risk",
    icon: Shield,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    symptoms: [
      "Fake or manipulated documents",
      "Identity mismatches",
      "Account takeovers",
      "Coordinated fraud rings",
      "Rising fraud losses",
    ],
    reality: [
      "False positives blocking real customers",
      "Manual fraud reviews creating bottlenecks",
      "Post-disbursement fraud discovery",
      "Fraud evolves faster than rule-based systems",
    ],
    whoFaces: "High-volume lenders, BNPL & instant credit platforms, cross-border lenders",
    whyExists: "Fraud evolves faster than rule-based detection systems. Static rules fight yesterday's fraud.",
    solution: {
      name: "AI Fraud Detection & Identity Verification",
      description: "Real-time Fraud Prevention, Fewer False Positives",
      whatItDoes: [
        "Real-time transaction & application risk scoring",
        "Document authenticity verification",
        "Behavioral anomaly detection",
        "Identity consistency checks",
      ],
      aiType: "Anomaly Detection + Graph ML + Document AI",
      techStack: "Isolation Forest, GNN, OCR, Liveness Detection, Device Fingerprinting",
      timeline: "8-12 weeks",
      costSmall: "$15K - $25K",
      costLarge: "$30K - $50K",
      impact: "40-60% fraud reduction, 30% fewer false positives",
    },
  },
  {
    id: "D",
    title: "Compliance, Audit & Regulatory Fatigue",
    icon: Scale,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    symptoms: [
      "Manual compliance checks",
      "Disconnected audit trails",
      "Reporting delays",
      "Stress during regulatory reviews",
      "High compliance workload",
    ],
    reality: [
      "Delayed audits",
      "Inconsistent documentation",
      "Regulator scrutiny",
      "Compliance processes are manual and reactive",
    ],
    whoFaces: "NBFCs, Banks, Regulated FinTechs",
    whyExists: "Compliance processes are often manual, fragmented, and reactive, even as regulations tighten.",
    solution: {
      name: "AI KYC & Compliance Automation",
      description: "Proactive, Audit-Ready Compliance",
      whatItDoes: [
        "Automated regulatory change tracking",
        "Transaction monitoring & SAR generation",
        "Audit trail automation",
        "Policy gap analysis & alerts",
      ],
      aiType: "NLP + Rule Engine + Compliance Monitoring",
      techStack: "GPT-4, Regulatory Feeds, Alert Engine, Reporting Dashboard",
      timeline: "6-10 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$20K - $35K",
      impact: "50% less manual compliance work, proactive risk detection",
    },
  },
  {
    id: "E",
    title: "Customer Onboarding, KYC & Conversion Friction",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    symptoms: [
      "Long onboarding flows",
      "Multiple document uploads",
      "Drop-offs before approval",
      "Manual KYC reviews",
      "Low onboarding completion",
    ],
    reality: [
      "Poor user experience",
      "Delayed first disbursement",
      "High acquisition cost wastage",
      "Compliance treated as blocker, not workflow",
    ],
    whoFaces: "Digital-first lenders, consumer finance platforms, embedded finance providers",
    whyExists: "Compliance is treated as a blocker, not an intelligent workflow.",
    solution: {
      name: "AI Loan Approval & Onboarding Agent",
      description: "Frictionless, Compliant Onboarding",
      whatItDoes: [
        "OCR-based document extraction",
        "Liveness & face match verification",
        "Automated background checks",
        "Risk-based onboarding flows",
      ],
      aiType: "Document AI + Computer Vision + Workflow Automation",
      techStack: "OCR, Face Recognition, ID Verification APIs, Workflow Engine",
      timeline: "4-8 weeks",
      costSmall: "$6K - $12K",
      costLarge: "$15K - $25K",
      impact: "70% faster onboarding, 50% less manual review, higher conversion",
    },
  },
  {
    id: "F",
    title: "Collections & Recovery Inefficiency",
    icon: Receipt,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    symptoms: [
      "Blanket reminder campaigns",
      "Manual follow-ups",
      "No prioritization by risk or intent",
      "Low recovery rates",
      "High collection cost",
    ],
    reality: [
      "Poor borrower experience",
      "Escalations & disputes",
      "Collections lack behavioral intelligence",
      "Agents waste time on unlikely recoveries",
    ],
    whoFaces: "Consumer lenders, SME lenders, BNPL platforms",
    whyExists: "Collections often lack behavioral intelligence and prioritization logic.",
    solution: {
      name: "AI Collections Prioritization Engine",
      description: "Smart Recovery, Better Borrower Experience",
      whatItDoes: [
        "Predict optimal contact time & channel",
        "Segment by payment likelihood",
        "AI voice agents for first contact",
        "Automated payment plan negotiation",
      ],
      aiType: "Propensity Models + Conversational AI + Optimization",
      techStack: "LightGBM, Twilio, GPT-4, Scheduler, CRM Integration",
      timeline: "5-8 weeks",
      costSmall: "$6K - $12K",
      costLarge: "$15K - $28K",
      impact: "20-35% improvement in recovery rates, lower collection costs",
    },
  },
  {
    id: "G",
    title: "Customer Support Load & Trust Erosion",
    icon: HeadphonesIcon,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    symptoms: [
      "EMI queries overwhelming support",
      "Loan status confusion",
      "Disbursement delay inquiries",
      "Escalations to human agents",
      "High support volume",
    ],
    reality: [
      "Slow response times",
      "Trust issues & negative reviews",
      "Predictable queries handled manually",
      "Support costs scale linearly with growth",
    ],
    whoFaces: "High-volume lenders, consumer finance apps",
    whyExists: "Support teams handle predictable, repetitive finance queries manually.",
    solution: {
      name: "AI FinTech Support Assistant",
      description: "24/7 Intelligent Customer Service",
      whatItDoes: [
        "Handle 70-80% of queries autonomously",
        "Account lookups & transaction inquiries",
        "EMI schedules & payment status",
        "Seamless human escalation",
      ],
      aiType: "Conversational AI + RAG + API Integration",
      techStack: "GPT-4/Claude, Vector DB, Core Banking APIs",
      timeline: "4-6 weeks",
      costSmall: "$4K - $8K",
      costLarge: "$10K - $18K",
      impact: "60-80% query deflection, 40% cost reduction, improved CSAT",
    },
  },
  {
    id: "H",
    title: "Lack of Real-Time Portfolio & Decision Intelligence",
    icon: BarChart3,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    symptoms: [
      "Static dashboards",
      "Lagging risk indicators",
      "No early warning signals",
      "Reactive decision-making",
      "Poor portfolio visibility",
    ],
    reality: [
      "Delayed corrective actions",
      "Most systems report what happened, not what is about to happen",
      "Risk committees lack real-time data",
      "Missed intervention opportunities",
    ],
    whoFaces: "Mid to large lenders, Banks & NBFCs",
    whyExists: "Most systems report what happened, not what is about to happen.",
    solution: {
      name: "Real-Time Portfolio Intelligence Dashboard",
      description: "Predictive Portfolio Insights",
      whatItDoes: [
        "Real-time portfolio health monitoring",
        "Early warning indicators for at-risk segments",
        "Cohort performance tracking",
        "Automated alerts & recommendations",
      ],
      aiType: "Analytics + ML Forecasting + Alert Systems",
      techStack: "Time-series models, BI Tools, Alert Engine, Data Warehouse",
      timeline: "6-10 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$20K - $35K",
      impact: "Proactive risk management, faster corrective actions",
    },
  },
];

const industryStats = [
  { icon: Clock, value: "67%", label: "Expect instant loan decisions" },
  { icon: Shield, value: "$42B", label: "Annual fraud losses globally" },
  { icon: MessageSquare, value: "78%", label: "Want 24/7 digital support" },
  { icon: Users, value: "45%", label: "Abandon slow onboarding" },
];

const roleBasedPaths = [
  { role: "FinTech Startup / Digital Lender", path: "A → E → C", description: "Speed first, then conversion, then fraud" },
  { role: "BNPL / Consumer Credit Platform", path: "B → C → F", description: "Risk segmentation, fraud, then collections" },
  { role: "NBFC / Regulated Lender", path: "A → D → H", description: "Underwriting, compliance, then intelligence" },
  { role: "Bank / Enterprise Lender", path: "D → B → H", description: "Compliance first, then risk, then visibility" },
];

const faqItems = [
  {
    question: "Is AI allowed in regulated lending and credit decisioning?",
    answer: "Yes — when designed correctly. AI is widely used in underwriting, fraud detection, and compliance as decision support or governed automation, with clear auditability.",
  },
  {
    question: "How do regulators audit AI-based decisions?",
    answer: "Through explainable model outputs, feature contribution logs, decision thresholds, human override records, and versioned model history. AGIX designs systems to be audit-ready by default.",
  },
  {
    question: "Are these AI models black boxes?",
    answer: "No. We use explainable ML and hybrid rule-based systems — not opaque models that can't justify decisions.",
  },
  {
    question: "How do you handle bias and fairness in credit decisions?",
    answer: "We implement bias monitoring across protected attributes, fairness thresholds, regular model recalibration, and manual review triggers for edge cases. Fair lending is treated as a system requirement, not an afterthought.",
  },
  {
    question: "Can AI make fully automated loan approvals?",
    answer: "Yes — but only where regulations allow and readiness is high. Most lenders start with AI-assisted decisions, then gradually automate specific segments.",
  },
  {
    question: "How does AI improve underwriting speed without increasing risk?",
    answer: "By scoring consistently, using more signals than humans can process, and flagging only risky edge cases for review. Speed improves because decision quality improves, not despite it.",
  },
  {
    question: "What data sources does AI use for lending decisions?",
    answer: "Depending on your setup: credit bureau data, transaction & bank data, application data, behavioral & repayment signals, and approved alternative data. All data usage is policy-controlled and logged.",
  },
  {
    question: "Can this work for thin-file or new-to-credit customers?",
    answer: "Yes. AI risk models can incorporate behavioral and alternative signals to improve inclusion without increasing default exposure.",
  },
  {
    question: "How does AI reduce fraud without blocking genuine customers?",
    answer: "By combining anomaly detection, identity consistency checks, and behavioral analysis. This reduces false positives, not just fraud loss.",
  },
  {
    question: "What happens if AI makes a wrong recommendation?",
    answer: "Every system includes confidence thresholds, human-in-the-loop review, escalation rules, and full traceability. AI assists decisions — humans remain accountable.",
  },
  {
    question: "How long does implementation usually take?",
    answer: "Most FinTech AI systems go live in 4-8 weeks, depending on data readiness, regulatory scope, and number of integrations.",
  },
  {
    question: "What are the ongoing costs after implementation?",
    answer: "Ongoing costs include AI usage, cloud infrastructure, and monitoring & governance. These costs are predictable, transparent, and scalable.",
  },
  {
    question: "Can we start with just one use case?",
    answer: "Absolutely. Most lenders start with underwriting assistance, fraud detection, or KYC automation — then expand safely.",
  },
  {
    question: "Is this suitable across different countries and regulations?",
    answer: "Yes. AI systems are configured to align with region-specific regulatory frameworks, not hard-coded assumptions.",
  },
  {
    question: "What role does AGIX play after deployment?",
    answer: "AGIX works as a long-term AI systems partner, providing monitoring & optimization, governance updates, model tuning, and expansion planning.",
  },
];

function FintechSolutionFinder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    lenderType: "",
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

    if (inputs.challenge === "underwriting") {
      system = "AI Credit Scoring & Underwriting Engine";
      why = "Slow approvals are killing conversion. AI automates 70-80% of decisions with consistent risk logic.";
      timeline = "6-8 weeks";
      cost = inputs.monthlyVolume <= 2000 ? "$10K - $15K" : "$15K - $25K";
      nextPhase = "Alternative Data Risk Intelligence";
    } else if (inputs.challenge === "risk") {
      system = "Alternative Data Risk Intelligence";
      why = "One-size-fits-all scoring is driving defaults. AI enables smarter segmentation and early warnings.";
      timeline = "6-10 weeks";
      cost = "$12K - $20K";
      nextPhase = "AI Underwriting Engine";
    } else if (inputs.challenge === "fraud") {
      system = "Real-Time Fraud Detection Engine";
      why = "Rules-based systems can't keep up with evolving fraud patterns. ML models adapt in real-time.";
      timeline = "5-8 weeks";
      cost = "$10K - $18K";
      nextPhase = "Identity Verification AI";
    } else if (inputs.challenge === "compliance") {
      system = "Regulatory & Compliance AI Agent";
      why = "Manual compliance is slow and error-prone. AI automates reviews and maintains audit trails.";
      timeline = "6-8 weeks";
      cost = "$12K - $22K";
      nextPhase = "Document Intelligence";
    } else if (inputs.challenge === "kyc") {
      system = "AI-Powered KYC & Onboarding";
      why = "High drop-offs during onboarding. AI streamlines verification and reduces friction.";
      timeline = "4-6 weeks";
      cost = "$8K - $14K";
      nextPhase = "Fraud Detection AI";
    } else if (inputs.challenge === "collections") {
      system = "Intelligent Collections AI";
      why = "Generic collection strategies don't work. AI predicts willingness-to-pay and optimizes outreach.";
      timeline = "5-7 weeks";
      cost = "$10K - $16K";
      nextPhase = "Customer Support AI";
    } else if (inputs.challenge === "support") {
      system = "AI Customer Support Agent";
      why = "Support teams are overwhelmed. AI handles 60-70% of routine queries instantly.";
      timeline = "4-6 weeks";
      cost = "$8K - $14K";
      nextPhase = "Collections AI Integration";
    } else if (inputs.challenge === "intelligence") {
      system = "Portfolio Analytics & Intelligence Engine";
      why = "Limited visibility into portfolio health. AI provides real-time cohort analysis and risk monitoring.";
      timeline = "6-8 weeks";
      cost = "$12K - $20K";
      nextPhase = "Predictive Default Engine";
    } else {
      system = "AI Underwriting + Fraud Detection";
      why = "Start with the highest-ROI combination: faster approvals and reduced fraud losses.";
      timeline = "8-10 weeks";
      cost = "$18K - $30K";
      nextPhase = "Alternative Data Integration";
    }

    setResult({ system, why, timeline, cost, nextPhase });
    setStep(5);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Find My FinTech AI Solution
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Takes ~30 seconds. Get a personalized recommendation for your lending platform.
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
              <Label className="text-base font-medium">What type of lender are you?</Label>
              <div className="grid grid-cols-2 gap-2">
                {lenderTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={inputs.lenderType === type.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, lenderType: type.id });
                      setStep(2);
                    }}
                    className="justify-start h-auto py-3"
                    data-testid={`button-finder-lender-${type.id}`}
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
              <Label className="text-base font-medium">What's your biggest challenge?</Label>
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
                Monthly loan applications? ({inputs.monthlyVolume.toLocaleString()})
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
              <Label className="text-base font-medium">Do you have structured data pipelines?</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "yes", label: "Yes, data is accessible" },
                  { id: "partial", label: "Partial / In progress" },
                  { id: "no", label: "No, mostly manual" },
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
                    setInputs({ lenderType: "", challenge: "", monthlyVolume: 1000, hasDataPipeline: "" });
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

function LeakageCalculator() {
  const [inputs, setInputs] = useState({
    monthlyApplications: 1000,
    avgLoanSize: 50000,
    currentApprovalTime: "24-48",
    dropOffRate: 25,
    fraudLossRate: 2,
    defaultRate: 5,
  });

  const calculations = {
    lostApplications: Math.round(inputs.monthlyApplications * (inputs.dropOffRate / 100)),
    lostRevenueMonthly: Math.round(inputs.monthlyApplications * (inputs.dropOffRate / 100) * inputs.avgLoanSize * 0.03),
    fraudLossMonthly: Math.round(inputs.monthlyApplications * (100 - inputs.dropOffRate) / 100 * inputs.avgLoanSize * (inputs.fraudLossRate / 100)),
    defaultLossMonthly: Math.round(inputs.monthlyApplications * (100 - inputs.dropOffRate) / 100 * inputs.avgLoanSize * (inputs.defaultRate / 100) * 0.5),
    potentialSavings: Math.round((inputs.monthlyApplications * (inputs.dropOffRate / 100) * inputs.avgLoanSize * 0.03 * 0.5) + (inputs.monthlyApplications * (100 - inputs.dropOffRate) / 100 * inputs.avgLoanSize * (inputs.fraudLossRate / 100) * 0.5)),
  };

  const totalLeakage = calculations.lostRevenueMonthly + calculations.fraudLossMonthly + calculations.defaultLossMonthly;

  return (
    <Card id="leakage-calculator" className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-500" />
          Risk & Default Leakage Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Understand how slow approvals, fraud, and weak risk models impact revenue and portfolio health
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Monthly Loan Applications</Label>
                <span className="text-sm font-medium">{inputs.monthlyApplications.toLocaleString()}</span>
              </div>
              <Slider
                value={[inputs.monthlyApplications]}
                onValueChange={(v) => setInputs({ ...inputs, monthlyApplications: v[0] })}
                min={100}
                max={10000}
                step={100}
                data-testid="slider-applications"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Average Loan Size ($)</Label>
                <span className="text-sm font-medium">${inputs.avgLoanSize.toLocaleString()}</span>
              </div>
              <Slider
                value={[inputs.avgLoanSize]}
                onValueChange={(v) => setInputs({ ...inputs, avgLoanSize: v[0] })}
                min={1000}
                max={500000}
                step={1000}
                data-testid="slider-loan-size"
              />
            </div>
            <div>
              <Label className="mb-2 block">Current Decision Time</Label>
              <Select
                value={inputs.currentApprovalTime}
                onValueChange={(value) => setInputs({ ...inputs, currentApprovalTime: value })}
              >
                <SelectTrigger data-testid="select-decision-time">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1">Under 1 hour</SelectItem>
                  <SelectItem value="1-4">1-4 hours</SelectItem>
                  <SelectItem value="4-24">4-24 hours</SelectItem>
                  <SelectItem value="24-48">24-48 hours</SelectItem>
                  <SelectItem value="48+">48+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Application Drop-off Rate (%)</Label>
                <span className="text-sm font-medium">{inputs.dropOffRate}%</span>
              </div>
              <Slider
                value={[inputs.dropOffRate]}
                onValueChange={(v) => setInputs({ ...inputs, dropOffRate: v[0] })}
                min={5}
                max={60}
                step={1}
                data-testid="slider-dropoff"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Fraud Loss Rate (%)</Label>
                <span className="text-sm font-medium">{inputs.fraudLossRate}%</span>
              </div>
              <Slider
                value={[inputs.fraudLossRate]}
                onValueChange={(v) => setInputs({ ...inputs, fraudLossRate: v[0] })}
                min={0.5}
                max={10}
                step={0.5}
                data-testid="slider-fraud"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Default / NPA Rate (%)</Label>
                <span className="text-sm font-medium">{inputs.defaultRate}%</span>
              </div>
              <Slider
                value={[inputs.defaultRate]}
                onValueChange={(v) => setInputs({ ...inputs, defaultRate: v[0] })}
                min={1}
                max={20}
                step={0.5}
                data-testid="slider-default"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-destructive/10 to-orange-500/10 rounded-lg p-6 border border-destructive/20">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Your Monthly Revenue Leakage
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Lost Applications (Slow Approvals)</p>
                <p className="text-2xl font-bold text-destructive">{calculations.lostApplications.toLocaleString()} apps</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lost Revenue (Drop-offs)</p>
                <p className="text-xl font-bold text-destructive">
                  ${calculations.lostRevenueMonthly.toLocaleString()}/mo
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fraud Losses</p>
                <p className="text-xl font-bold text-orange-500">
                  ${calculations.fraudLossMonthly.toLocaleString()}/mo
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Default / NPA Losses</p>
                <p className="text-xl font-bold text-yellow-500">
                  ${calculations.defaultLossMonthly.toLocaleString()}/mo
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Total Annual Leakage</p>
                <p className="text-3xl font-bold text-destructive">
                  ${(totalLeakage * 12).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-green-500 font-medium">Potential Annual Savings with AI:</p>
              <p className="text-2xl font-bold text-green-500">${(totalLeakage * 12 * 0.4).toLocaleString()}</p>
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
    { id: "data", text: "Do you have 6+ months of loan/transaction data?" },
    { id: "digital", text: "Is your application process fully digital?" },
    { id: "apis", text: "Can your systems integrate via APIs?" },
    { id: "volume", text: "Do you process 500+ applications/month?" },
    { id: "compliance", text: "Do you have a compliance/governance team?" },
  ];

  const score = Object.values(answers).filter(Boolean).length * 20;

  const getRecommendation = () => {
    if (score >= 80) return { level: "High", start: "AI Underwriting + Fraud Detection", avoid: "None — ready for comprehensive AI", color: "text-green-500" };
    if (score >= 60) return { level: "Moderate", start: "KYC Automation + Support AI", avoid: "Complex credit models until data matures", color: "text-blue-500" };
    if (score >= 40) return { level: "Developing", start: "Document AI + Basic Automation", avoid: "Real-time fraud detection until volume grows", color: "text-yellow-500" };
    return { level: "Early", start: "Process digitization first", avoid: "AI implementations until basics in place", color: "text-orange-500" };
  };

  const recommendation = getRecommendation();

  return (
    <Card id="readiness-quiz" className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          AI Readiness Score for Regulated Finance
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Evaluate AI adoption readiness before involving compliance teams
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

export default function FintechIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <Landmark className="w-3 h-3 mr-1" />
                Fintech & Lending AI Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AI Solutions for FinTech & Lending That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-400">
                  Show You Where Risk Leaks
                </span>{" "}
                — and How to Fix It
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Built to Improve Credit Decisions, Reduce Fraud, and Scale Compliance
              </p>
              <p className="text-muted-foreground mb-6 max-w-xl">
                From FinTech startups and digital lenders to NBFCs, banks, and embedded finance platforms,
                AGIX builds AI systems that accelerate underwriting, reduce default risk, automate compliance,
                and strengthen customer trust — with explainable decisions.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Embedded Solution Finder in Hero */}
              <FintechSolutionFinder />

              {/* Quick Links to Other Tools */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#leakage-calculator"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500/20 to-destructive/20 rounded-lg border border-orange-500/30 hover-elevate group"
                  data-testid="button-hero-calculator"
                >
                  <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    <Calculator className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Leakage Calculator</p>
                    <p className="text-xs text-muted-foreground">Risk & approval loss</p>
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
                    <p className="font-medium text-sm">AI Readiness Score</p>
                    <p className="text-xs text-muted-foreground">Evaluate your setup</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                <TrendingUp className="w-3 h-3 mr-1" />
                Market Reality
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Why FinTech Leaders Are{" "}
                <span className="text-primary">Investing in AI</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Customer expectations, fraud complexity, and regulatory pressure are all rising. Here's what's driving the shift to AI.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industryStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30"
                >
                  <stat.icon className="w-7 h-7 mx-auto mb-3 text-cyan-500" />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
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
              The <span className="text-destructive">Silent Failures</span> That Kill FinTech Growth
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              FinTech doesn't fail because of lack of capital. It fails when risk, compliance, and decision-making don't scale together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Manual Underwriting Slows Growth", 
                description: "Loan decisions take days instead of minutes. Underwriters manually review similar cases repeatedly while applicants drop off mid-process.",
                icon: Clock,
                impact: "45% application abandonment"
              },
              { 
                title: "Fraud Adapts Faster Than Rules", 
                description: "Static rule engines can't keep pace with evolving fraud tactics. By the time you update rules, fraudsters have already moved on.",
                icon: Shield,
                impact: "$42B annual global losses"
              },
              { 
                title: "Compliance Teams Are Overloaded", 
                description: "Manual compliance checks and disconnected audit trails create bottlenecks. Regulatory reviews drain time and focus from core operations.",
                icon: Scale,
                impact: "30% of staff time on audits"
              },
              { 
                title: "Approval Delays Kill Conversion", 
                description: "Modern customers expect instant decisions. Every hour of delay increases the chance they'll complete their loan with a competitor.",
                icon: TrendingUp,
                impact: "67% expect instant decisions"
              },
              { 
                title: "Risk Decisions Must Be Fast & Defensible", 
                description: "Regulators demand explainable AI. Black-box models create audit nightmares and compliance risks that slow adoption.",
                icon: FileText,
                impact: "Explainability required by law"
              },
              { 
                title: "Thin-File Customers Are Misjudged", 
                description: "Traditional credit scoring excludes millions of creditworthy customers. Alternative data could unlock new revenue streams.",
                icon: Users,
                impact: "1.4B adults underbanked globally"
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
              { icon: AlertCircle, title: "Identify Revenue Leakage", description: "Pinpoint default & fraud triggers", color: "text-destructive", bg: "bg-destructive/10" },
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

      {/* Interactive Tools Section */}
      <section id="leakage-calculator" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Interactive Decision Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Your{" "}
              <span className="text-primary">AI Opportunity</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These tools help you evaluate AI adoption before involving compliance teams.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <LeakageCalculator />
            <div id="readiness-quiz">
              <AIReadinessScore />
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-500">
              <Users className="w-3 h-3 mr-1" />
              Built For You
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              AI Solutions Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-400">
                Every Lending Model
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you process hundreds or millions of loans, the bottlenecks are similar — only the exposure changes.
              Find your organization type below.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {lenderTypes.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full text-center hover-elevate border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
                  <CardContent className="pt-6 pb-5">
                    <div className="p-3 bg-emerald-500/10 rounded-xl w-fit mx-auto mb-3">
                      <type.icon className="w-7 h-7 text-emerald-500" />
                    </div>
                    <p className="font-medium text-sm">{type.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottleneck Map */}
      <section id="bottlenecks" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">FinTech & Lending Bottleneck Map</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Risk, Revenue, and Trust{" "}
              <span className="text-destructive">Quietly Break</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              FinTech and lending platforms rarely fail suddenly. They fail silently — through slow approvals,
              mispriced risk, rising fraud, compliance fatigue, and loss of customer trust.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottlenecks.map((bottleneck, i) => (
              <motion.div
                key={bottleneck.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all ${
                    selectedBottleneck.id === bottleneck.id
                      ? "ring-2 ring-primary"
                      : "hover-elevate"
                  }`}
                  onClick={() => setSelectedBottleneck(bottleneck)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 ${bottleneck.bgColor} rounded-md`}>
                        <bottleneck.icon className={`w-4 h-4 ${bottleneck.color}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">{bottleneck.id}</Badge>
                    </div>
                    <CardTitle className="text-sm mt-2">{bottleneck.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {bottleneck.symptoms.slice(0, 2).map((symptom, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-destructive shrink-0 mt-0.5" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Bottleneck Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBottleneck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <Card className="overflow-hidden">
                <CardHeader className={`${selectedBottleneck.bgColor} border-b border-border`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-background/50 rounded-lg`}>
                      <selectedBottleneck.icon className={`w-8 h-8 ${selectedBottleneck.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{selectedBottleneck.id}</Badge>
                        <CardTitle>{selectedBottleneck.title}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{selectedBottleneck.whoFaces}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        The Reality
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {selectedBottleneck.reality.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
                        {selectedBottleneck.whyExists}
                      </p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                      <h4 className="font-semibold mb-1 text-primary">{selectedBottleneck.solution.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{selectedBottleneck.solution.description}</p>
                      <ul className="space-y-2 mb-4">
                        {selectedBottleneck.solution.whatItDoes.map((item, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Timeline</p>
                          <p className="font-semibold text-primary">{selectedBottleneck.solution.timeline}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Investment Range</p>
                          <p className="font-semibold text-sm">{selectedBottleneck.solution.costSmall} - {selectedBottleneck.solution.costLarge}</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                        <p className="text-xs text-muted-foreground">Expected Impact</p>
                        <p className="text-sm font-medium text-green-500">{selectedBottleneck.solution.impact}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Role-Based Starting Points */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Role-Based{" "}
              <span className="text-primary">Starting Points</span>
            </h2>
            <p className="text-muted-foreground">
              You don't need to automate everything. Start with the highest-risk decision points.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleBasedPaths.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover-elevate">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-2">{item.role}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-mono">{item.path}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Safety */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Governance, Safety &{" "}
              <span className="text-primary">Regulatory Alignment</span>
            </h2>
            <p className="text-muted-foreground">
              AI must withstand audits — not just demos.
            </p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Eye, text: "No black-box decisions" },
                  { icon: FileText, text: "Explainability at every decision point" },
                  { icon: Users, text: "Human-in-the-loop controls" },
                  { icon: Scale, text: "Bias & fairness monitoring" },
                  { icon: Database, text: "Full audit logs & versioning" },
                  { icon: Globe, text: "Region-specific compliance mapping" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6 p-4 bg-primary/5 rounded-lg">
                AGIX builds governed, auditable AI systems for regulated finance.
                We design decision systems that regulators, auditors, and customers can trust.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">15 High-Intent FAQs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FinTech AI{" "}
              <span className="text-primary">FAQs</span>
            </h2>
            <p className="text-muted-foreground">
              Clear Answers Before You Commit Capital, Risk & Compliance
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border">
                <AccordionTrigger className="px-4 hover:no-underline text-left" data-testid={`accordion-fintech-faq-${i}`}>
                  <span className="text-left pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Lead Form - At Bottom */}
      <section id="lead-form" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-cyan-500/5">
                <CardTitle className="text-2xl">Get Your FinTech AI Roadmap</CardTitle>
                <p className="text-muted-foreground">
                  Built for Risk, Compliance & Scale — No sales pressure. We recommend what is compliant, explainable, and realistic.
                </p>
              </CardHeader>
              <CardContent className="max-w-xl mx-auto space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Organization Type</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-org-type"
                    >
                      <option value="">Select type</option>
                      <option value="fintech-startup">FinTech Startup</option>
                      <option value="digital-lender">Digital Lender</option>
                      <option value="nbfc">NBFC / Micro-lender</option>
                      <option value="bank">Bank / Credit Union</option>
                      <option value="bnpl">BNPL / Embedded Finance</option>
                    </select>
                  </div>
                  <div>
                    <Label>Primary Challenge</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-challenge"
                    >
                      <option value="">Select challenge</option>
                      <option value="underwriting">Underwriting Speed</option>
                      <option value="risk">Default Risk / NPAs</option>
                      <option value="fraud">Fraud Detection</option>
                      <option value="compliance">Compliance & Audit</option>
                      <option value="kyc">KYC & Onboarding</option>
                      <option value="collections">Collections</option>
                      <option value="not-sure">Not Sure</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Lending Type</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-lending-type"
                    >
                      <option value="">Select type</option>
                      <option value="personal">Personal Loans</option>
                      <option value="sme">SME Lending</option>
                      <option value="bnpl">BNPL</option>
                      <option value="mortgage">Mortgage</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                  <div>
                    <Label>Country / Region</Label>
                    <Input
                      type="text"
                      placeholder="India, USA, UK, etc."
                      className="mt-1.5"
                      data-testid="input-country"
                    />
                  </div>
                </div>
                <div>
                  <Label>Work Email</Label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    className="mt-1.5"
                    data-testid="input-email"
                  />
                </div>
                <Button size="lg" className="w-full mt-4" data-testid="button-submit-lead">
                  Get My FinTech AI Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No sales pressure. We recommend what is compliant, explainable, and realistic.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-emerald-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Landmark className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your FinTech AI Roadmap
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Built for Risk, Compliance & Scale
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a FinTech startup, digital lender, NBFC, or bank,
              AGIX helps you choose safe, high-impact AI entry points,
              avoid black-box risk, and scale decisions responsibly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-final-cta">
                <a href="#lead-form">
                  Get My FinTech AI Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#solution-finder">
                  Re-Run the FinTech AI Solution Finder
                  <RefreshCw className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Authority Statement */}
      <section className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">AGIX Technologies</span> is an AI-first systems engineering company
            focused on building governed, explainable, and audit-ready AI systems for FinTech and lending.
            We don't chase shortcuts. We design AI systems that survive audits, scale responsibly, and earn long-term trust.
          </p>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg italic text-muted-foreground">
            "In FinTech, trust is the real currency. AI succeeds only when it strengthens trust —
            with customers, regulators, and internal teams alike."
          </p>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
