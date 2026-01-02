'use client'
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Bot,
  Brain,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  Building2,
  Stethoscope,
  Wallet,
  Truck,
  ChevronRight,
  Sparkles,
  Network,
  Eye,
  Calculator,
  Cog,
  Database,
  RefreshCw,
  Workflow,
  MessageSquare,
  FileText,
  Mail,
  Layers,
  Search,
  Target,
  TrendingUp,
  Settings,
  Lock,
  Activity,
  BarChart3,
  Users,
  DollarSign,
  Loader2,
  Factory,
  ShoppingCart,
  GraduationCap,
  Briefcase,
  Heart,
  HelpCircle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" }
];

const existingTools = [
  "CRMs",
  "ERPs", 
  "Ticketing & support systems",
  "Email & communication platforms",
  "Cloud tools & internal software"
];

const toolLimitations = [
  "Don't understand intent",
  "Don't make decisions",
  "Don't handle exceptions",
  "Don't coordinate across departments"
];

const businessReality = [
  "Delayed workflows",
  "Process breakdowns",
  "Human-dependent approvals",
  "Operational bottlenecks",
  "Rising cost per transaction"
];

const shiftReasons = [
  "Businesses are operating with higher volume, lower margins",
  "Manual coordination no longer scales",
  "Customers expect faster, consistent responses",
  "Compliance and accuracy requirements are increasing",
  "AI capabilities are now production-ready (not experimental)"
];

const traditionalVsAI = [
  { traditional: "Rule-based workflows", ai: "Context-aware intelligence" },
  { traditional: "Breaks on edge cases", ai: "Handles ambiguity" },
  { traditional: "Requires constant manual fixes", ai: "Learns and adapts" },
  { traditional: "Task-level execution", ai: "End-to-end process ownership" },
  { traditional: "Limited scalability", ai: "Built for enterprise scale" }
];

const coreCapabilities = [
  {
    id: "workflow",
    icon: Workflow,
    title: "AI Workflow Automation",
    subtitle: "Intelligent, Cross-System Workflow Automation Using AI",
    definition: "AI Workflow Automation uses artificial intelligence to design, orchestrate, and optimize workflows across multiple business systems — enabling actions, decisions, and routing without manual intervention.",
    problems: [
      "Manual data movement between tools",
      "Delayed approvals and follow-ups",
      "Broken workflows when conditions change",
      "Overdependence on human coordination"
    ],
    useCases: [
      "Lead routing across CRM, email, and sales tools",
      "Customer onboarding automation",
      "Order-to-delivery workflow automation",
      "Internal approval and escalation flows",
      "Cross-department task orchestration"
    ],
    howWeAutomate: [
      "AI-based decision routing (not static rules)",
      "Context-aware triggers",
      "Exception handling using LLMs",
      "Real-time system synchronization"
    ],
    timeline: "4–8 weeks",
    pricing: {
      mid: "$8K – $15K",
      enterprise: "$15K – $30K+"
    }
  },
  {
    id: "bpa",
    icon: Layers,
    title: "AI Business Process Automation (BPA)",
    subtitle: "End-to-End Process Automation with Decision Intelligence",
    definition: "AI Business Process Automation (BPA) automates entire business processes — not just tasks — using AI to manage decisions, exceptions, and outcomes across multiple stages.",
    problems: [
      "Process delays due to human dependency",
      "High error rates in critical operations",
      "Lack of real-time visibility into process health",
      "Inability to scale without adding staff"
    ],
    useCases: [
      "Claims processing automation",
      "Invoice-to-payment automation",
      "Employee onboarding & offboarding",
      "Vendor onboarding workflows",
      "Regulatory and compliance reporting"
    ],
    howWeAutomate: [
      "Intelligent decision checkpoints",
      "Adaptive logic instead of rigid rules",
      "Human-in-the-loop where required",
      "Continuous process optimization"
    ],
    timeline: "8–12 weeks",
    pricing: {
      mid: "$15K – $30K",
      enterprise: "$30K – $60K+"
    }
  },
  {
    id: "document",
    icon: FileText,
    title: "Document Intelligence",
    subtitle: "AI-Powered Document Processing & Automation",
    definition: "Document Intelligence uses AI (OCR + NLP + semantic models) to extract, classify, validate, and act on information from unstructured documents.",
    problems: [
      "Manual document review",
      "Data entry errors",
      "Processing delays",
      "Compliance risks"
    ],
    useCases: [
      "Invoice and receipt processing",
      "Contract analysis and extraction",
      "KYC / onboarding document handling",
      "Insurance claims documentation",
      "Report and form digitization"
    ],
    howWeAutomate: [
      "Multi-format OCR (PDFs, scans, images)",
      "Context-aware extraction",
      "Auto-validation against systems",
      "Workflow triggers based on content"
    ],
    timeline: "4–8 weeks",
    pricing: {
      mid: "$8K – $15K",
      enterprise: "$15K – $35K+"
    }
  },
  {
    id: "email",
    icon: Mail,
    title: "Email & Communication Automation",
    subtitle: "AI-Powered Email Understanding, Action & Response",
    definition: "Email & Communication Automation uses AI to read, understand, categorize, respond to, and trigger workflows from emails and messages — turning inboxes into structured systems.",
    problems: [
      "Inbox overload",
      "Missed follow-ups",
      "Manual ticket creation",
      "Delayed responses"
    ],
    useCases: [
      "Sales inquiry handling",
      "Support request routing",
      "Vendor communication automation",
      "Internal request processing",
      "Follow-up & reminder automation"
    ],
    howWeAutomate: [
      "Intent detection using NLP",
      "Context-aware responses",
      "Action-triggered automation",
      "CRM & system updates"
    ],
    timeline: "3–6 weeks",
    pricing: {
      mid: "$6K – $12K",
      enterprise: "$12K – $25K+"
    }
  },
  {
    id: "transformation",
    icon: RefreshCw,
    title: "AI-Led Digital Transformation",
    subtitle: "Re-Engineering Operations Around AI Automation",
    definition: "AI-Led Digital Transformation focuses on redesigning business operations with AI automation at the core — not layering AI on top of broken processes.",
    problems: [
      "Tool sprawl without efficiency",
      "Legacy systems slowing growth",
      "Poor ROI from digital investments",
      "Disconnected operations"
    ],
    useCases: [
      "Legacy workflow modernization",
      "Automation-first operating models",
      "AI-enabled shared services",
      "Enterprise process redesign"
    ],
    howWeAutomate: [
      "Process-first redesign",
      "Automation architecture planning",
      "AI governance & controls",
      "Scalable execution roadmap"
    ],
    timeline: "3–6 months",
    pricing: {
      mid: "$25K – $50K",
      enterprise: "$50K – $150K+"
    }
  }
];

const engineLayers = [
  {
    number: 1,
    title: "Automation Opportunity Intelligence",
    subtitle: "Discovery That Actually Finds ROI",
    icon: Search,
    purpose: "Identify what should be automated first — not everything.",
    activities: [
      "Process mining & workflow mapping",
      "Bottleneck identification",
      "Cost-of-manual-work analysis",
      "Risk & compliance mapping"
    ],
    outputs: [
      "Automation Opportunity Map",
      "Priority heatmap (High ROI → Low ROI)",
      "Automation readiness score"
    ]
  },
  {
    number: 2,
    title: "Intelligence Architecture Design",
    subtitle: "Where AI Is Actually Engineered",
    icon: Brain,
    purpose: "Decide how intelligence flows, not just which tools to use.",
    activities: [
      "AI decision points",
      "Human-in-the-loop checkpoints",
      "Fail-safe logic",
      "Exception handling paths"
    ],
    outputs: [
      "Node-based system diagram",
      "AI decision vs human review mapping",
      "Before/After automation comparison"
    ]
  },
  {
    number: 3,
    title: "System & Data Integration",
    subtitle: "Automation Only Works If Systems Talk",
    icon: Database,
    purpose: "Connect tools, data, and workflows into one automation fabric.",
    activities: [
      "CRM / ERP systems integration",
      "Database connections",
      "Email platform integration",
      "Cloud apps & internal tools"
    ],
    outputs: [
      "API-first integration layer",
      "Data flow architecture",
      "System connectivity map"
    ]
  },
  {
    number: 4,
    title: "AI Execution & Orchestration",
    subtitle: "Where Automation Comes Alive",
    icon: Zap,
    purpose: "Execute workflows with intelligence, not scripts.",
    activities: [
      "AI interprets inputs",
      "Decisions made dynamically",
      "Actions executed across systems",
      "Exceptions handled gracefully"
    ],
    outputs: [
      "AI Workflow Automation",
      "AI BPA",
      "Document Intelligence",
      "Email & Communication Automation"
    ]
  },
  {
    number: 5,
    title: "Monitoring, Optimization & Learning",
    subtitle: "Automation That Improves Over Time",
    icon: Activity,
    purpose: "Ensure automation delivers measurable business outcomes.",
    activities: [
      "Processing time reduction tracking",
      "Error rate monitoring",
      "Cost savings measurement",
      "Throughput improvement analysis"
    ],
    outputs: [
      "Live metric dashboards",
      "Performance trend reports",
      "Week 1 vs Week 12 comparisons"
    ]
  },
  {
    number: 6,
    title: "Governance, Security & Scale",
    subtitle: "Enterprise Trust Layer",
    icon: Shield,
    purpose: "Make automation safe, auditable, and scalable.",
    activities: [
      "Role-based access control",
      "Audit logs",
      "Compliance checkpoints",
      "Data security policies"
    ],
    outputs: [
      "SOC2-aligned practices",
      "HIPAA-ready systems",
      "Enterprise risk management"
    ]
  }
];

const industries = [
  { icon: Heart, name: "Healthcare", label: "Healthcare automation systems" },
  { icon: Wallet, name: "Finance", label: "Finance & FinTech process automation" },
  { icon: Shield, name: "Insurance", label: "Insurance claims automation" },
  { icon: Building2, name: "Real Estate", label: "Real estate workflow automation" },
  { icon: ShoppingCart, name: "E-commerce", label: "E-commerce operations automation" },
  { icon: Truck, name: "Logistics", label: "Logistics & supply chain automation" },
  { icon: Factory, name: "Manufacturing", label: "Manufacturing process automation" },
  { icon: Briefcase, name: "SaaS", label: "SaaS internal automation" }
];

const faqs = [
  {
    question: "What are AI automation services?",
    answer: "AI automation services use artificial intelligence to automate business workflows, processes, documents, and communications that normally require human decision-making. Unlike basic automation, AI automation understands context, handles exceptions, makes decisions, and works across multiple systems. This is why businesses search for enterprise AI automation services rather than simple workflow tools."
  },
  {
    question: "What is the difference between AI automation and traditional automation?",
    answer: "Traditional automation relies on fixed rules and scripts, while AI automation uses intelligence to interpret inputs and make decisions. Traditional automation is rule-based, breaks on change, handles only structured data at task-level. AI automation is context-aware, adapts to new inputs, handles unstructured data, and operates at the process level. AI automation is designed for real-world operational complexity."
  },
  {
    question: "How is AI automation different from RPA?",
    answer: "RPA (Robotic Process Automation) mimics human clicks, works only on predictable inputs, and breaks when interfaces or formats change. AI automation understands emails, documents, and intent, handles variability and exceptions, and owns end-to-end processes. Many companies now use AI automation to replace or enhance RPA systems."
  },
  {
    question: "What business processes are best suited for AI automation?",
    answer: "Processes ideal for AI automation usually involve repetitive steps, high volume, decision-making, documents or emails, and multiple systems. Common examples include invoicing and billing, claims processing, customer onboarding, internal approvals, and support request handling."
  },
  {
    question: "How much do AI automation services cost?",
    answer: "AI automation pricing depends on process complexity, number of systems involved, decision logic required, and volume of transactions. Typical ranges: Simple workflow automation ($6,000–$10,000), Department-level automation ($10,000–$25,000), End-to-end process automation ($25,000–$60,000), Enterprise AI transformation ($60,000–$150,000+). Most businesses recover costs within 3–9 months through efficiency gains."
  },
  {
    question: "Is AI automation suitable for small or mid-sized businesses?",
    answer: "Yes. Many small and mid-sized businesses adopt AI automation to reduce hiring needs, eliminate manual errors, and scale operations efficiently. AI automation is often more affordable than adding headcount, especially as volumes grow."
  },
  {
    question: "How long does it take to implement AI automation?",
    answer: "Implementation timelines vary by scope: Email or document automation (3–6 weeks), Workflow automation across tools (4–8 weeks), Business process automation (8–12 weeks), Enterprise transformation programs (3–6 months phased). AGIX delivers automation in phases, so value is realized early."
  },
  {
    question: "Can AI automation integrate with existing software?",
    answer: "Yes. This is one of the most common buyer concerns. AI automation integrates with CRMs (Salesforce, HubSpot, custom systems), ERPs, email platforms, databases, cloud applications, and internal tools. You do not need to replace your existing systems — AI automation connects and enhances them."
  },
  {
    question: "Is AI automation secure for enterprise use?",
    answer: "Yes, when designed correctly. AGIX builds AI automation systems with role-based access control, audit logs, secure data pipelines, and compliance-ready architecture. This makes AI automation suitable for regulated industries such as healthcare, finance, and insurance."
  },
  {
    question: "Does AI automation require clean or perfect data?",
    answer: "No. AI automation is designed for real operational data, which is often incomplete or inconsistent. Systems are built to handle missing fields, interpret unstructured inputs, and flag exceptions for review. Data quality improves after automation, not before it."
  },
  {
    question: "Will AI automation replace human jobs?",
    answer: "AI automation replaces manual effort, not human judgment. AGIX designs systems that remove repetitive work, support better decision-making, and free teams for higher-value tasks. This is why businesses search for AI automation solutions, not job-replacement AI."
  },
  {
    question: "What is AI business process automation (BPA)?",
    answer: "AI Business Process Automation (BPA) automates entire business processes, not just individual tasks. It manages decisions, exceptions, workflow progression, and outcomes. Examples include order-to-cash, procure-to-pay, claims processing, and onboarding workflows."
  },
  {
    question: "How do we know what to automate first?",
    answer: "AGIX starts with an Automation Opportunity Assessment, which identifies high-ROI processes, low-risk automation candidates, and quick wins vs long-term opportunities. This prevents wasted investment — a key concern for buyers searching for AI automation services."
  },
  {
    question: "What industries use AI automation the most?",
    answer: "AI automation is actively used in healthcare operations, finance and FinTech, insurance, e-commerce, logistics and supply chain, manufacturing, and SaaS companies. Each industry has different automation triggers, which AGIX addresses through modular AI systems."
  },
  {
    question: "What results can businesses expect from AI automation?",
    answer: "Businesses typically see faster process execution, lower operational costs, reduced error rates, improved scalability, and higher team productivity. AI automation is no longer about incremental efficiency — it enables reliable operations at scale."
  }
];

const pricingTiers = [
  {
    title: "Project-Based Automation",
    description: "Workflow, document, or email automation",
    range: "$6,000 – $25,000",
    bestFor: ["Workflow automation", "Document automation", "Email automation"]
  },
  {
    title: "Process Automation Programs",
    description: "BPA and multi-department automation",
    range: "$25,000 – $60,000",
    bestFor: ["BPA", "Multi-department automation", "End-to-end processes"]
  },
  {
    title: "Enterprise Automation & Transformation",
    description: "AI-led digital transformation",
    range: "$60,000 – $150,000+",
    bestFor: ["AI-led digital transformation", "Legacy modernization", "Enterprise-wide systems"]
  }
];

const scannerIndustries = [
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance / FinTech" },
  { value: "insurance", label: "Insurance" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "logistics", label: "Logistics / Supply Chain" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "real-estate", label: "Real Estate" },
  { value: "other", label: "Other" }
];

const scannerDepartments = [
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Customer Support" },
  { value: "hr", label: "HR" },
  { value: "compliance", label: "Compliance" }
];

const scannerBottlenecks = [
  { value: "approvals", label: "Manual approvals" },
  { value: "documents", label: "Document processing" },
  { value: "email", label: "Email overload" },
  { value: "data-movement", label: "Data movement between systems" },
  { value: "delays", label: "Process delays" },
  { value: "errors", label: "Error & rework issues" }
];

const readinessQuestions = [
  { id: "process-clarity", question: "How well documented are your current processes?", weight: 15 },
  { id: "data-availability", question: "Is the data needed for automation accessible and organized?", weight: 20 },
  { id: "tool-standardization", question: "Are your tools standardized across teams?", weight: 15 },
  { id: "change-readiness", question: "Is your team open to adopting new automation tools?", weight: 20 },
  { id: "compliance", question: "Do you have compliance requirements that automation must satisfy?", weight: 15 },
  { id: "executive-support", question: "Do you have executive sponsorship for automation initiatives?", weight: 15 }
];

function AutomationCalculator() {
  const [activeTab, setActiveTab] = useState("scanner");
  
  const [industry, setIndustry] = useState("");
  const [department, setDepartment] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [volume, setVolume] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [automationType, setAutomationType] = useState("workflow");
  const [systemCount, setSystemCount] = useState("1-2");
  const [complexity, setComplexity] = useState("simple");
  const [volumeLevel, setVolumeLevel] = useState("medium");

  const [processType, setProcessType] = useState("invoicing");
  const [currentState, setCurrentState] = useState("manual");
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  const [teamSize, setTeamSize] = useState([5]);
  const [hourlyRate, setHourlyRate] = useState([50]);
  const [timePerTask, setTimePerTask] = useState([15]);
  const [monthlyVolume, setMonthlyVolume] = useState([1000]);
  const [errorRate, setErrorRate] = useState([5]);

  const [answers, setAnswers] = useState<Record<string, "strongly-agree" | "agree" | "neutral" | "disagree" | "strongly-disagree">>({});

  const scannerResults = useMemo(() => {
    if (!industry || !department || !bottleneck || !volume) return null;

    const candidates = [];
    if (bottleneck === "documents") {
      candidates.push({ name: "Invoice Processing", type: "Document Intelligence", roi: "High", complexity: "Low" });
      candidates.push({ name: "Contract Review", type: "Document Intelligence", roi: "Medium", complexity: "Medium" });
    }
    if (bottleneck === "approvals") {
      candidates.push({ name: "Approval Workflows", type: "AI BPA", roi: "High", complexity: "Low" });
      candidates.push({ name: "Exception Handling", type: "AI Workflow Automation", roi: "Medium", complexity: "Medium" });
    }
    if (bottleneck === "email") {
      candidates.push({ name: "Email Triage & Routing", type: "Email Automation", roi: "High", complexity: "Low" });
      candidates.push({ name: "Auto-Response Generation", type: "AI Email Automation", roi: "Medium", complexity: "Medium" });
    }
    if (bottleneck === "data-movement") {
      candidates.push({ name: "System Integration", type: "AI Workflow Automation", roi: "High", complexity: "Medium" });
      candidates.push({ name: "Data Sync & Validation", type: "AI Workflow Automation", roi: "Medium", complexity: "Low" });
    }
    if (bottleneck === "delays" || bottleneck === "errors") {
      candidates.push({ name: "Process Orchestration", type: "AI BPA", roi: "High", complexity: "Medium" });
      candidates.push({ name: "Quality Checks", type: "AI Workflow Automation", roi: "Medium", complexity: "Low" });
    }

    if (candidates.length < 3) {
      candidates.push({ name: "Reporting Automation", type: "AI Workflow Automation", roi: "Medium", complexity: "Low" });
    }

    const hoursSaved = volume === "high" ? "80-120" : volume === "medium" ? "40-80" : "15-40";

    return { candidates: candidates.slice(0, 3), hoursSaved, phase1Timeline: "3-6 weeks", phase1Cost: "$6K-$15K" };
  }, [industry, department, bottleneck, volume]);

  const estimate = useMemo(() => {
    let baseCost = 8000;
    let weeks = 4;

    if (automationType === "bpa") { baseCost = 25000; weeks = 8; }
    else if (automationType === "document") { baseCost = 12000; weeks = 5; }
    else if (automationType === "email") { baseCost = 8000; weeks = 4; }
    else if (automationType === "transformation") { baseCost = 60000; weeks = 16; }

    if (systemCount === "3-5") { baseCost *= 1.4; weeks += 2; }
    else if (systemCount === "6+") { baseCost *= 1.8; weeks += 4; }

    if (complexity === "moderate") { baseCost *= 1.3; weeks += 2; }
    else if (complexity === "advanced") { baseCost *= 1.6; weeks += 3; }

    if (volumeLevel === "high") { baseCost *= 1.2; }

    return {
      lowCost: Math.round(baseCost * 0.85),
      highCost: Math.round(baseCost * 1.15),
      weeks,
      deliveryStyle: automationType === "transformation" ? "Transformation" : automationType === "bpa" ? "Program" : "Project"
    };
  }, [automationType, systemCount, complexity, volumeLevel]);

  const processSteps = useMemo(() => {
    const beforeSteps = [
      { label: "Human receives input", icon: Users },
      { label: "Manual data entry", icon: FileText },
      { label: "Email handoffs", icon: Mail },
      { label: "Manual checks", icon: Eye },
      { label: "Delays & waiting", icon: Clock }
    ];
    const afterSteps = [
      { label: "AI reads inputs", icon: Brain },
      { label: "AI makes decisions", icon: Zap },
      { label: "Systems execute actions", icon: Cog },
      { label: "Human only for exceptions", icon: Users }
    ];
    return { before: beforeSteps, after: afterSteps };
  }, []);

  const simulatorMetrics = useMemo(() => {
    const stateMultiplier = currentState === "manual" ? 1 : currentState === "semi" ? 0.7 : 0.5;
    return {
      stepsReduced: Math.round(60 * stateMultiplier),
      cycleTimeReduced: Math.round(75 * stateMultiplier),
      errorReduction: Math.round(85 * stateMultiplier)
    };
  }, [currentState]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setStep((prev) => (prev + 1) % (processSteps.before.length + processSteps.after.length + 2));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, processSteps]);

  const roiCalculations = useMemo(() => {
    const hoursPerMonth = (monthlyVolume[0] * timePerTask[0]) / 60;
    const currentMonthlyCost = hoursPerMonth * hourlyRate[0];
    const currentAnnualCost = currentMonthlyCost * 12;
    const automatedSavings = currentAnnualCost * 0.7;
    const errorSavings = currentAnnualCost * (errorRate[0] / 100) * 0.8;
    const totalAnnualSavings = automatedSavings + errorSavings;
    const avgImplementationCost = 25000;
    const paybackMonths = Math.ceil((avgImplementationCost / (totalAnnualSavings / 12)));
    const roi = Math.round((totalAnnualSavings / avgImplementationCost) * 100);

    return {
      currentMonthlyCost: Math.round(currentMonthlyCost),
      currentAnnualCost: Math.round(currentAnnualCost),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      paybackMonths: Math.min(Math.max(paybackMonths, 1), 24),
      roi
    };
  }, [hourlyRate, timePerTask, monthlyVolume, errorRate]);

  const readinessScore = useMemo(() => {
    let total = 0;
    let maxScore = 0;
    readinessQuestions.forEach((q) => {
      maxScore += q.weight * 2;
      const answer = answers[q.id];
      if (answer === "strongly-agree") total += q.weight * 2;
      else if (answer === "agree") total += q.weight * 1.5;
      else if (answer === "neutral") total += q.weight;
      else if (answer === "disagree") total += q.weight * 0.5;
    });
    return maxScore > 0 ? Math.round((total / maxScore) * 100) : 0;
  }, [answers]);

  const allAnswered = Object.keys(answers).length === readinessQuestions.length;

  const getMaturityLevel = () => {
    if (readinessScore >= 75) return { level: "Intelligent", color: "text-green-400", recommendation: "Ready for enterprise automation program" };
    if (readinessScore >= 55) return { level: "Automated", color: "text-cyan-400", recommendation: "BPA or document automation recommended" };
    if (readinessScore >= 35) return { level: "Assisted", color: "text-amber-400", recommendation: "Start with one workflow pilot" };
    return { level: "Manual", color: "text-red-400", recommendation: "Focus on process documentation first" };
  };

  const maturityResult = getMaturityLevel();
  const allSelected = industry && department && bottleneck && volume;

  return (
    <Card id="interactive-tools" className="bg-muted/30 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          AI Automation Cost & ROI Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Identify opportunities, estimate costs, visualize transformation, and calculate ROI
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap gap-1 h-auto mb-6">
            <TabsTrigger value="scanner" className="flex-1 min-w-[80px]" data-testid="tab-automation-scanner">
              <Search className="w-4 h-4 mr-1 hidden md:inline" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="cost" className="flex-1 min-w-[80px]" data-testid="tab-automation-cost">
              <DollarSign className="w-4 h-4 mr-1 hidden md:inline" />
              Cost
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex-1 min-w-[80px]" data-testid="tab-automation-simulator">
              <RefreshCw className="w-4 h-4 mr-1 hidden md:inline" />
              Before/After
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex-1 min-w-[80px]" data-testid="tab-automation-roi">
              <TrendingUp className="w-4 h-4 mr-1 hidden md:inline" />
              ROI
            </TabsTrigger>
            <TabsTrigger value="readiness" className="flex-1 min-w-[80px]" data-testid="tab-automation-readiness">
              <HelpCircle className="w-4 h-4 mr-1 hidden md:inline" />
              Readiness
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger data-testid="select-scanner-industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {scannerIndustries.map((ind) => (
                      <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger data-testid="select-scanner-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {scannerDepartments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Biggest Bottleneck</Label>
                <Select value={bottleneck} onValueChange={setBottleneck}>
                  <SelectTrigger data-testid="select-scanner-bottleneck">
                    <SelectValue placeholder="Select bottleneck" />
                  </SelectTrigger>
                  <SelectContent>
                    {scannerBottlenecks.map((b) => (
                      <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Monthly Volume</Label>
                <Select value={volume} onValueChange={setVolume}>
                  <SelectTrigger data-testid="select-scanner-volume">
                    <SelectValue placeholder="Select volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (&lt;1,000 items)</SelectItem>
                    <SelectItem value="medium">Medium (1,000-10,000)</SelectItem>
                    <SelectItem value="high">High (&gt;10,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {allSelected && !showResults && (
              <Button onClick={() => setShowResults(true)} className="w-full" data-testid="button-scanner-analyze">
                <Search className="w-4 h-4 mr-2" />
                Analyze Automation Opportunities
              </Button>
            )}

            {showResults && scannerResults && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 border-t border-border">
                <div>
                  <h4 className="font-semibold mb-3">Top 3 Automation Candidates (Ranked by ROI)</h4>
                  <div className="space-y-3">
                    {scannerResults.candidates.map((candidate, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{i + 1}</div>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-xs text-muted-foreground">{candidate.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={candidate.roi === "High" ? "default" : "secondary"}>{candidate.roi} ROI</Badge>
                          <Badge variant="outline">{candidate.complexity}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Hours Saved / Month</p>
                    <p className="text-2xl font-bold text-primary">{scannerResults.hoursSaved}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Phase 1 (Quick Win)</p>
                    <p className="font-semibold">{scannerResults.phase1Timeline}</p>
                    <p className="text-sm text-muted-foreground">{scannerResults.phase1Cost}</p>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setShowResults(false)} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset & Try Again
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="cost" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Automation Type</Label>
                <Select value={automationType} onValueChange={setAutomationType}>
                  <SelectTrigger data-testid="select-cost-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workflow">Workflow Automation</SelectItem>
                    <SelectItem value="bpa">Business Process Automation (BPA)</SelectItem>
                    <SelectItem value="document">Document Automation</SelectItem>
                    <SelectItem value="email">Email Automation</SelectItem>
                    <SelectItem value="transformation">End-to-End Transformation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Systems</Label>
                <Select value={systemCount} onValueChange={setSystemCount}>
                  <SelectTrigger data-testid="select-cost-systems">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 systems</SelectItem>
                    <SelectItem value="3-5">3-5 systems</SelectItem>
                    <SelectItem value="6+">6+ systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Decision Complexity</Label>
                <Select value={complexity} onValueChange={setComplexity}>
                  <SelectTrigger data-testid="select-cost-complexity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple (rules + AI assist)</SelectItem>
                    <SelectItem value="moderate">Moderate (AI decisions + exceptions)</SelectItem>
                    <SelectItem value="advanced">Advanced (multi-decision, adaptive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Volume Level</Label>
                <Select value={volumeLevel} onValueChange={setVolumeLevel}>
                  <SelectTrigger data-testid="select-cost-volume">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
                <p className="text-xl font-bold text-primary">
                  ${(estimate.lowCost / 1000).toFixed(0)}K - ${(estimate.highCost / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                <p className="text-xl font-bold">{estimate.weeks} weeks</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Delivery Style</p>
                <p className="text-xl font-bold">{estimate.deliveryStyle}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Indicative range, refined post discovery call</p>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Process Type</Label>
                <Select value={processType} onValueChange={setProcessType}>
                  <SelectTrigger data-testid="select-simulator-process">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invoicing">Invoicing</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="claims">Claims</SelectItem>
                    <SelectItem value="reporting">Reporting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Current State</Label>
                <Select value={currentState} onValueChange={setCurrentState}>
                  <SelectTrigger data-testid="select-simulator-state">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Fully Manual</SelectItem>
                    <SelectItem value="semi">Semi-Automated</SelectItem>
                    <SelectItem value="disconnected">Tool-Heavy but Disconnected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-red-400">Before</h4>
                  <Badge variant="outline" className="border-red-400/50 text-red-400">Manual</Badge>
                </div>
                <div className="space-y-2">
                  {processSteps.before.map((s, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isPlaying && step === i ? "bg-red-500/20 border border-red-500/50" : "bg-muted/30"}`}>
                      <s.icon className="w-4 h-4 text-red-400" />
                      <span className="text-sm">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-400">After</h4>
                  <Badge variant="outline" className="border-green-400/50 text-green-400">AI-Powered</Badge>
                </div>
                <div className="space-y-2">
                  {processSteps.after.map((s, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isPlaying && step === processSteps.before.length + 1 + i ? "bg-green-500/20 border border-green-500/50" : "bg-muted/30"}`}>
                      <s.icon className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={() => { setIsPlaying(!isPlaying); if (!isPlaying) setStep(0); }} data-testid="button-simulator-play">
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pause" : "Play Animation"}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{simulatorMetrics.stepsReduced}%</p>
                <p className="text-xs text-muted-foreground">Steps Reduced</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{simulatorMetrics.cycleTimeReduced}%</p>
                <p className="text-xs text-muted-foreground">Cycle Time Reduced</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{simulatorMetrics.errorReduction}%</p>
                <p className="text-xs text-muted-foreground">Error Reduction</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Team Size</span>
                  <span className="text-primary font-semibold">{teamSize[0]} people</span>
                </Label>
                <Slider value={teamSize} onValueChange={setTeamSize} min={1} max={50} step={1} data-testid="slider-roi-team" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Average Cost per Hour</span>
                  <span className="text-primary font-semibold">${hourlyRate[0]}</span>
                </Label>
                <Slider value={hourlyRate} onValueChange={setHourlyRate} min={20} max={200} step={5} data-testid="slider-roi-rate" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Minutes per Task</span>
                  <span className="text-primary font-semibold">{timePerTask[0]} min</span>
                </Label>
                <Slider value={timePerTask} onValueChange={setTimePerTask} min={1} max={60} step={1} data-testid="slider-roi-time" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Monthly Task Volume</span>
                  <span className="text-primary font-semibold">{monthlyVolume[0].toLocaleString()}</span>
                </Label>
                <Slider value={monthlyVolume} onValueChange={setMonthlyVolume} min={100} max={50000} step={100} data-testid="slider-roi-volume" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Current Error Rate</span>
                  <span className="text-primary font-semibold">{errorRate[0]}%</span>
                </Label>
                <Slider value={errorRate} onValueChange={setErrorRate} min={0} max={20} step={1} data-testid="slider-roi-error" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Current Annual Cost</p>
                <p className="text-xl font-bold">${(roiCalculations.currentAnnualCost / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
                <p className="text-xl font-bold text-primary">${(roiCalculations.totalAnnualSavings / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Payback Period</p>
                <p className="text-xl font-bold text-green-400">{roiCalculations.paybackMonths} months</p>
              </div>
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">First Year ROI</p>
                <p className="text-xl font-bold text-cyan-400">{roiCalculations.roi}%</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="readiness" className="space-y-6">
            {readinessQuestions.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium">{q.question}</p>
                <RadioGroup
                  value={answers[q.id] || ""}
                  onValueChange={(v) => setAnswers({ ...answers, [q.id]: v as typeof answers[string] })}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    { value: "strongly-agree", label: "Strongly Agree" },
                    { value: "agree", label: "Agree" },
                    { value: "neutral", label: "Neutral" },
                    { value: "disagree", label: "Disagree" },
                    { value: "strongly-disagree", label: "Strongly Disagree" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} data-testid={`radio-readiness-${q.id}-${option.value}`} />
                      <Label htmlFor={`${q.id}-${option.value}`} className="text-sm cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            {allAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Readiness Score</p>
                    <p className={`text-3xl font-bold ${maturityResult.color}`}>{readinessScore}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Maturity Level</p>
                    <p className={`text-xl font-bold ${maturityResult.color}`}>{maturityResult.level}</p>
                  </div>
                </div>

                <Progress value={readinessScore} className="h-2" />

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold mb-2">Recommended Next Step</p>
                  <p className="text-muted-foreground">{maturityResult.recommendation}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Pilot</p>
                    <p className="font-semibold">$6K-$15K</p>
                    <p className="text-xs text-muted-foreground">3-6 weeks</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Program</p>
                    <p className="font-semibold">$25K-$60K</p>
                    <p className="text-xs text-muted-foreground">2-3 months</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Transformation</p>
                    <p className="font-semibold">$60K+</p>
                    <p className="text-xs text-muted-foreground">3-6 months</p>
                  </div>
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default function AIAutomationPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companySize: "",
    automationGoal: ""
  });
  const [expandedCapability, setExpandedCapability] = useState<string | null>("workflow");
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFormSubmit = async () => {
    const result = await submitLead(
      {
        name: formData.name,
        email: formData.email,
        companySize: formData.companySize,
        challenges: ["AI Automation"],
        industry: "ai-automation",
      },
      {
        formType: "ai-automation-roadmap",
        source: "/services/ai-automation",
        ctaId: "ai-automation-form-submit",
        ctaText: "Get Automation Roadmap",
        ctaLocation: "/services/ai-automation",
        additionalMetadata: {
          automationGoal: formData.automationGoal
        }
      }
    );
    return result;
  };

  const leadMutation = useMutation({
    mutationFn: handleFormSubmit,
    onSuccess: (result) => {
      if (result.success) {
        triggerCelebration();
        trackEvent("lead_form_submit", {
          event_category: "ai_automation_services",
          event_label: "hero_roadmap_form"
        });
        toast({
          title: "Request received!",
          description: "We'll send your automation roadmap within 24 hours.",
        });
        setFormData({ name: "", email: "", companySize: "", automationGoal: "" });
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please provide your name and email.",
        variant: "destructive"
      });
      return;
    }
    leadMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 lg:pt-28 pb-16 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-cyan-500/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Zap className="w-3 h-3 mr-1" />
                AI Automation Services
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Engineering AI Automation That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                  Eliminates Manual Operations
                </span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Across Workflows, Processes, Documents & Communication
              </p>

              <p className="text-lg text-muted-foreground">
                AGIX delivers AI Automation Services that replace repetitive human work with intelligent, 
                self-operating systems — helping businesses reduce cost, improve speed, and scale without increasing headcount.
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                This is not basic automation or RPA. This is AI-driven business automation designed for real-world complexity.
              </div>

              <p className="text-xs text-muted-foreground pt-4">
                Trusted by businesses automating operations across finance, healthcare, SaaS, logistics & enterprise systems.
              </p>
            </motion.div>

            {/* Right: Lead Capture Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Get Your Automation Roadmap</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tell us what you want to automate and we'll show you how.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
                      >
                        <SelectTrigger data-testid="select-company-size">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="automationGoal">What do you want to automate?</Label>
                      <Textarea
                        id="automationGoal"
                        placeholder="Describe your automation goals..."
                        value={formData.automationGoal}
                        onChange={(e) => setFormData(prev => ({ ...prev, automationGoal: e.target.value }))}
                        className="resize-none"
                        rows={3}
                        data-testid="textarea-automation-goal"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={leadMutation.isPending}
                      data-testid="button-submit-automation"
                    >
                      {leadMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Automation Roadmap
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why AI Automation Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              Strategic Priority
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why AI Automation Is a Business Priority —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                Not a Technology Trend
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Search demand for AI automation services, AI workflow automation, and AI business process automation 
              has accelerated because modern businesses are no longer struggling with tools — they are struggling 
              with execution at scale.
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>The challenge is not digital adoption. The challenge is operational complexity.</strong>
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Most organizations already operate with:</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {existingTools.map((tool, i) => (
                    <Badge key={i} variant="secondary" className="text-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
                <p className="text-lg font-medium text-primary">Yet despite this stack, work still moves manually.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Why? Because these systems:</h4>
                <ul className="space-y-2">
                  {toolLimitations.map((limitation, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                      {limitation}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-muted-foreground">
                  They store data — but they don't run operations.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">The Resulting Business Reality:</h4>
                <ul className="space-y-2">
                  {businessReality.map((reality, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                      {reality}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  As volume increases, complexity compounds — and scaling requires more people, not better systems.
                  This is the exact inflection point where businesses start searching for AI automation solutions.
                </p>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-cyan-500/5">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">AI Automation Fixes the Execution Gap</h3>
                  </div>

                  <p className="text-muted-foreground">
                    By introducing intelligence into how work moves — not just connecting APIs.
                  </p>

                  <p className="text-muted-foreground">
                    AI automation adds a <span className="text-primary font-medium">decision layer</span> on top of your 
                    existing systems, enabling them to:
                  </p>

                  <ul className="space-y-2">
                    {[
                      "Interpret data and intent",
                      "Route work dynamically",
                      "Trigger actions automatically",
                      "Handle exceptions intelligently",
                      "Adapt as conditions change"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm font-medium text-primary border-t border-primary/20 pt-4">
                    This is why AI automation is now viewed as an operational necessity, not an experimental initiative.
                  </p>
                </CardContent>
              </Card>

              {/* Why This Shift Is Happening Now */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Why This Shift Is Happening Now</h4>
                <div className="space-y-3">
                  {shiftReasons.map((reason, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {reason}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10 border border-primary/20"
          >
            <p className="text-xl font-semibold">
              AI Automation is no longer about efficiency gains.
            </p>
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500 mt-2">
              It is about whether your business can operate reliably at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Traditional vs AI Automation */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Traditional Automation vs AI Automation
            </h2>
            <p className="text-muted-foreground">
              This distinction is critical — and why AI automation services are now replacing older RPA-heavy approaches.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-1 max-w-4xl mx-auto">
            <div className="bg-muted/50 p-4 rounded-tl-lg font-semibold text-center">
              Traditional Automation
            </div>
            <div className="bg-primary/10 p-4 rounded-tr-lg font-semibold text-center text-primary">
              AI Automation Services
            </div>
            {traditionalVsAI.map((row, i) => (
              <div key={`row-${i}`} className="contents">
                <div className={`bg-muted/30 p-4 flex items-center gap-2 ${i === traditionalVsAI.length - 1 ? 'rounded-bl-lg' : ''}`}>
                  <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{row.traditional}</span>
                </div>
                <div className={`bg-primary/5 p-4 flex items-center gap-2 ${i === traditionalVsAI.length - 1 ? 'rounded-br-lg' : ''}`}>
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{row.ai}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Automation Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <Layers className="w-3 h-3 mr-1" />
              Unified Service
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Automation Capabilities
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              AGIX delivers AI Automation Services through five tightly integrated capability layers.
              These are not separate offerings — they work together as one automation ecosystem.
            </p>
          </motion.div>

          <div className="space-y-4">
            {mounted && coreCapabilities.map((capability, index) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    expandedCapability === capability.id 
                      ? 'border-primary/50 bg-primary/5' 
                      : 'hover-elevate'
                  }`}
                  onClick={() => setExpandedCapability(
                    expandedCapability === capability.id ? null : capability.id
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          expandedCapability === capability.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-primary/10'
                        }`}>
                          <capability.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{capability.title}</h3>
                          <p className="text-sm text-muted-foreground">{capability.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        expandedCapability === capability.id ? 'rotate-90' : ''
                      }`} />
                    </div>

                    {expandedCapability === capability.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-6 border-t border-border space-y-6"
                      >
                        <p className="text-muted-foreground">{capability.definition}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-destructive" />
                              Business Problems It Solves
                            </h4>
                            <ul className="space-y-2">
                              {capability.problems.map((problem, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                  {problem}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4 text-primary" />
                              Common Use Cases
                            </h4>
                            <ul className="space-y-2">
                              {capability.useCases.map((useCase, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Cog className="w-4 h-4 text-primary" />
                            How AGIX Automates
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {capability.howWeAutomate.map((method, i) => (
                              <Badge key={i} variant="outline" className="border-primary/30">
                                {method}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Timeline</p>
                              <p className="font-semibold">{capability.timeline}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Investment Range</p>
                              <p className="font-semibold">{capability.pricing.mid} – {capability.pricing.enterprise}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The AGIX Automation Engine */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <Settings className="w-3 h-3 mr-1" />
              Delivery System
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The AGIX Automation Engine
            </h2>
            <p className="text-xl text-muted-foreground">
              A 6-Layer System for Building Scalable AI Automation
            </p>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Most vendors automate workflows. AGIX engineers an automation operating layer for your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mounted && engineLayers.map((layer, index) => (
              <motion.div
                key={layer.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {layer.number}
                      </div>
                      <layer.icon className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-bold">{layer.title}</h3>
                      <p className="text-sm text-muted-foreground">{layer.subtitle}</p>
                    </div>

                    <p className="text-sm text-muted-foreground">{layer.purpose}</p>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Activities:</p>
                      <ul className="space-y-1">
                        {layer.activities.slice(0, 3).map((activity, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industries Actively Using AI Automation
            </h2>
            <p className="text-muted-foreground">
              Each industry has different automation triggers, which we address through modular AI systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover-elevate text-center p-6">
                  <industry.icon className="w-8 h-8 mx-auto text-primary mb-3" />
                  <p className="font-semibold">{industry.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{industry.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <Calculator className="w-3 h-3 mr-1" />
              Interactive Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Automation Planning Tools
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Use these tools to identify automation opportunities, estimate costs, calculate ROI, and assess your organization's readiness.
            </p>
          </motion.div>

          <AutomationCalculator />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10 rounded-xl border border-primary/20"
          >
            <p className="text-lg text-muted-foreground mb-4">
              Want a personalized automation roadmap based on your specific needs?
            </p>
            <Button size="lg" asChild>
              <a href="/schedule-consultation" data-testid="button-automation-tools-cta">
                Get Your Custom Automation Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
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
              AI Automation FAQs
            </h2>
            <p className="text-muted-foreground">
              Answers to the most common questions about AI automation services.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <Calculator className="w-3 h-3 mr-1" />
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Automation Pricing Framework
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX does not price AI automation per task or per hour. Pricing is based on 
              business impact, process ownership, system complexity, and automation depth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${index === 1 ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{tier.title}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>

                    <p className="text-2xl font-bold text-primary">{tier.range}</p>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Best for:</p>
                      <ul className="space-y-1">
                        {tier.bestFor.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Ready to Automate?
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to See AI Automation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                in Action?
              </span>
            </h2>

            <p className="text-lg text-muted-foreground">
              If your business relies on manual workflows, document-heavy processes, 
              email-driven operations, or disconnected systems — AI Automation can unlock immediate value.
            </p>

            <div className="pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} data-testid="button-cta-automation">
                  Request Your AI Automation Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
