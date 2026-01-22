'use client'
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  LineChart,
  Brain,
  Zap,
  Clock,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  Building2,
  Wallet,
  Briefcase,
  ChevronRight,
  Sparkles,
  Eye,
  Calculator,
  AlertCircle,
  HelpCircle,
  Search,
  FileText,
  Lock,
  Server,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Layers,
  Settings,
  BarChart3,
  RefreshCw,
  Filter,
  Loader2,
  TrendingDown,
  Activity,
  PieChart,
  GitBranch,
  ShieldCheck,
  CircleDollarSign,
  Gauge,
  Database,
  Boxes,
  Network,
  ShoppingCart,
  UserCheck,
  Scale
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
  { value: "200-500", label: "200–500" },
  { value: "500-1000", label: "500–1,000" },
  { value: "1000-5000", label: "1,000–5,000" },
  { value: "5000+", label: "5,000+" }
];

const focusAreas = [
  { value: "forecasting", label: "Forecasting & demand planning" },
  { value: "customer-behavior", label: "Customer behavior & churn" },
  { value: "risk-fraud", label: "Risk, fraud & anomaly detection" },
  { value: "recommendations", label: "Recommendations & personalization" },
  { value: "analytics-modernization", label: "Enterprise analytics modernization" }
];

const timelines = [
  { value: "immediate", label: "Immediate" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" }
];

const enterpriseStruggles = [
  { icon: TrendingDown, text: "Miss demand forecasts" },
  { icon: Users, text: "React late to churn" },
  { icon: AlertCircle, text: "Detect fraud after losses" },
  { icon: Boxes, text: "Overstock or understock inventory" },
  { icon: Clock, text: "Decisions based on lagging indicators" }
];

const dashboardLimitations = [
  "Summarize the past",
  "Depend on manual interpretation",
  "Assume stable conditions",
  "Break under volatility"
];

const reactiveCosts = [
  { title: "Revenue Forecast Misses", impact: "Missed guidance, investor pressure" },
  { title: "Late Churn Detection", impact: "Lost lifetime value" },
  { title: "Fraud Discovered Post-Fact", impact: "Direct financial loss" },
  { title: "Inventory Misalignment", impact: "Cash flow pressure" },
  { title: "Operational Surprises", impact: "Firefighting culture" }
];

const analyticsEvolution = [
  { level: "Reporting", description: "Tells you what happened" },
  { level: "Analytics", description: "Explains why it happened" },
  { level: "Predictive AI", description: "Tells you what is likely to happen next", highlight: true },
  { level: "Prescriptive AI", description: "Suggests what to do about it", highlight: true }
];

const threeForces = [
  { title: "Volatility", description: "Markets, demand, and customer behavior are less predictable than before." },
  { title: "Data Explosion", description: "Enterprises generate more signals than humans can interpret in time." },
  { title: "Decision Compression", description: "Leadership windows to act are shrinking." }
];

const architectureLayers = [
  {
    number: 1,
    title: "Business Objective & Decision Mapping",
    subtitle: "Where Most Predictive Projects Fail",
    description: "Before touching data or models, AGIX defines what decision this prediction influences, who acts on it, what options exist, consequences of error, and acceptable confidence levels.",
    outputs: ["Decision map", "Prediction purpose definition", "Acceptable risk thresholds", "Human override rules"],
    color: "from-blue-500 to-blue-600"
  },
  {
    number: 2,
    title: "Data Architecture & Signal Engineering",
    subtitle: "Predictive Accuracy Starts Here",
    description: "Enterprise data is distributed, inconsistent, delayed, and owned by multiple teams. AGIX focuses on signal relevance (not volume), leading indicators, feature stability, and data freshness.",
    outputs: ["Behavioral patterns", "Temporal trends", "Cross-system correlations", "External drivers"],
    color: "from-cyan-500 to-cyan-600"
  },
  {
    number: 3,
    title: "Model Design, Validation & Explainability",
    subtitle: "Where Enterprise Trust Is Won or Lost",
    description: "We choose models based on interpretability needs, data characteristics, regulatory constraints, and stability. Sometimes simpler models outperform complex ones in real business environments.",
    outputs: ["Feature importance", "Driver explanations", "Scenario impact summaries", "Confidence intervals"],
    color: "from-teal-500 to-teal-600"
  },
  {
    number: 4,
    title: "Continuous Learning, Drift Detection & Monitoring",
    subtitle: "Predictions Decay — Systems Must Adapt",
    description: "Customer behavior changes, markets shift, processes evolve, data pipelines change. We track prediction accuracy, data drift, concept drift, confidence decay, and action effectiveness.",
    outputs: ["Accuracy tracking", "Drift alerts", "Retraining triggers", "Human review protocols"],
    color: "from-green-500 to-green-600"
  },
  {
    number: 5,
    title: "Governance, Risk Controls & Compliance",
    subtitle: "Critical for Enterprises",
    description: "Enterprises need accountability, auditability, control, and transparency. AGIX builds role-based access, audit logs, approval workflows, kill switches, and versioned models with rollback.",
    outputs: ["Role-based access", "Audit logs", "Approval workflows", "Version control"],
    color: "from-amber-500 to-amber-600"
  },
  {
    number: 6,
    title: "Decision Integration & Action Enablement",
    subtitle: "Where Value Is Realized",
    description: "Predictions sitting in dashboards create zero ROI. AGIX integrates predictive intelligence into planning systems, CRM workflows, risk engines, operations dashboards, and decision processes.",
    outputs: ["System integrations", "Workflow triggers", "Action recommendations", "Business outputs"],
    color: "from-orange-500 to-orange-600"
  }
];

const useCases = [
  {
    id: "forecasting",
    title: "AI Forecasting",
    subtitle: "Demand, Revenue, Capacity & Operational Forecasting",
    icon: TrendingUp,
    description: "AGIX forecasting systems learn from multi-year historical data, incorporate real-time signals, adjust continuously, provide confidence intervals, and explain why forecasts change.",
    problems: [
      "Historical averages fail when markets shift",
      "Excel-based forecasting breaks under volatility",
      "Static seasonality assumptions miss changes",
      "Human adjustments lack consistency"
    ],
    applications: [
      "Revenue & pipeline forecasting",
      "Demand planning & inventory forecasting",
      "Workforce & capacity planning",
      "Supply chain forecasting",
      "Financial scenario modeling"
    ],
    timeline: { assessment: "2–3 weeks", development: "4–6 weeks", integration: "2–3 weeks", total: "8–12 weeks" },
    pricing: { department: "$25K – $45K", enterprise: "$50K – $120K+" }
  },
  {
    id: "customer",
    title: "Customer Insights & Behavior Prediction",
    subtitle: "Churn, Lifetime Value & Engagement Intelligence",
    icon: Users,
    description: "AGIX systems predict churn probabilities, identify disengagement indicators, estimate customer lifetime value, surface high-risk segments, and trigger proactive interventions.",
    problems: [
      "Know churn after it happens",
      "Segment customers manually",
      "Run static cohorts",
      "React too late to behavior changes"
    ],
    applications: [
      "Subscription churn prediction",
      "Upsell & cross-sell identification",
      "Retention prioritization",
      "Customer health scoring",
      "Campaign effectiveness prediction"
    ],
    timeline: { assessment: "3–4 weeks", development: "4–6 weeks", integration: "2–3 weeks", total: "9–13 weeks" },
    pricing: { department: "$30K – $50K", enterprise: "$60K – $130K+" }
  },
  {
    id: "risk",
    title: "Risk & Fraud Detection AI",
    subtitle: "Detecting Anomalies Before Damage Occurs",
    icon: Shield,
    description: "AGIX risk systems learn normal vs abnormal behavior, detect anomalies in real time, assign risk probabilities, adapt as patterns change, and reduce false positives.",
    problems: [
      "Static rules can't adapt to evolving fraud",
      "High false positive rates",
      "Reactive detection after losses",
      "Novel patterns go undetected"
    ],
    applications: [
      "Transaction fraud detection",
      "Payment risk scoring",
      "Operational risk monitoring",
      "Compliance anomaly detection",
      "Insider threat signals"
    ],
    timeline: { assessment: "3–4 weeks", development: "4–6 weeks", integration: "2–3 weeks", total: "9–13 weeks" },
    pricing: { department: "$35K – $60K", enterprise: "$70K – $150K+" }
  },
  {
    id: "recommendations",
    title: "Recommendation Engines",
    subtitle: "Personalization That Drives Measurable Outcomes",
    icon: Sparkles,
    description: "AGIX builds recommendation systems that learn from real-time behavior, balance relevance with business rules, optimize for business objectives (not just clicks), and improve through feedback loops.",
    problems: [
      "Static recommendation rules",
      "Simple similarity matching fails",
      "No adaptation to real behavior",
      "Can't explain recommendation logic"
    ],
    applications: [
      "Product recommendations",
      "Content personalization",
      "Pricing & offer optimization",
      "Next-best-action systems",
      "Decision support recommendations"
    ],
    timeline: { assessment: "2–3 weeks", development: "4–6 weeks", integration: "2–3 weeks", total: "8–12 weeks" },
    pricing: { department: "$25K – $45K", enterprise: "$60K – $120K+" }
  }
];

const pricingTiers = [
  {
    tier: "Departmental Predictive Systems",
    subtitle: "Single Department Focus",
    range: "$25,000 – $45,000",
    bestFor: ["Single department", "One core decision area", "Controlled scope"],
    examples: ["Sales forecasting", "Churn prediction", "Inventory demand prediction"],
    includes: [
      "Decision mapping",
      "Data pipeline setup",
      "Predictive model(s)",
      "Explainability layer",
      "Dashboard + API integration"
    ],
    timeline: "8–10 weeks",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    tier: "Cross-Functional Predictive Platforms",
    subtitle: "Multiple Teams & Decisions",
    range: "$45,000 – $90,000",
    bestFor: ["Multiple teams", "Interdependent decisions", "Shared data sources"],
    examples: ["Revenue + demand forecasting", "Customer intelligence platforms", "Risk monitoring across operations"],
    includes: [
      "Multi-model system",
      "Shared feature store",
      "Governance & monitoring",
      "Drift detection",
      "Integration with business workflows"
    ],
    timeline: "10–14 weeks",
    color: "bg-primary/20 text-primary"
  },
  {
    tier: "Enterprise Decision Intelligence",
    subtitle: "High-Stakes & Board-Level",
    range: "$90,000 – $180,000+",
    bestFor: ["High-stakes decisions", "Board-level reporting", "Regulated environments"],
    examples: ["Enterprise risk & fraud platforms", "Large-scale forecasting systems", "Recommendation engines with financial impact"],
    includes: [
      "End-to-end predictive architecture",
      "Advanced governance",
      "Scenario simulation",
      "Role-based access",
      "Audit & compliance controls"
    ],
    timeline: "14–20 weeks",
    color: "bg-cyan-500/20 text-cyan-400"
  }
];

const costDrivers = [
  { title: "Decision criticality", description: "Impact of wrong predictions" },
  { title: "Data complexity", description: "Sources, latency, quality" },
  { title: "Explainability requirements", description: "Regulatory and leadership needs" },
  { title: "Automation vs advisory", description: "Level of autonomous action" },
  { title: "Compliance & audit needs", description: "Governance depth required" },
  { title: "Integration depth", description: "Systems and workflows connected" }
];

const roiSources = [
  "Improved forecast accuracy",
  "Reduced churn",
  "Lower fraud losses",
  "Optimized inventory & pricing",
  "Better capital allocation",
  "Faster decision cycles"
];

const weakVsAGIX = [
  { weak: "Models in notebooks", agix: "Governed systems" },
  { weak: "Accuracy-focused", agix: "Decision-focused" },
  { weak: "Static", agix: "Continuously monitored" },
  { weak: "Black-box", agix: "Explainable" },
  { weak: "Reactive", agix: "Proactive" }
];

const buyVsBuild = [
  { option: "DIY data science", reality: "Fragile, hard to scale" },
  { option: "BI extensions", reality: "Descriptive, not predictive" },
  { option: "Point AI tools", reality: "Narrow, siloed" },
  { option: "AGIX systems", reality: "Governed, scalable, trusted", highlight: true }
];

const faqItems = [
  {
    question: "What is Predictive Analytics AI in simple terms?",
    answer: "Predictive Analytics AI uses historical and real-time data to estimate what is likely to happen next and how confident that prediction is. Instead of explaining the past, it helps organizations anticipate outcomes and act early."
  },
  {
    question: "How is Predictive AI different from traditional analytics or BI?",
    answer: "Traditional analytics answers 'what happened'. Predictive AI answers 'what is likely to happen next — and why.' BI summarizes data; Predictive AI models future behavior, risk, and outcomes."
  },
  {
    question: "What business problems benefit most from Predictive AI?",
    answer: "Predictive AI works best when decisions repeat frequently, outcomes are measurable, delays are costly, and uncertainty impacts revenue or risk. Common areas include forecasting, churn, fraud, demand planning, and recommendations."
  },
  {
    question: "Is Predictive AI reliable for enterprise decisions?",
    answer: "Yes — when designed with governance, explainability, and monitoring. AGIX systems provide confidence intervals, driver explanations, drift detection, and human override controls. This makes predictions trustworthy and decision-safe."
  },
  {
    question: "How accurate are Predictive AI models in practice?",
    answer: "Accuracy depends on data quality, signal relevance, stability of patterns, and ongoing monitoring. In enterprise deployments, improvements of 10–25% over baseline forecasts are common when systems are well-designed."
  },
  {
    question: "What data is required to build Predictive AI systems?",
    answer: "Typically required: historical transaction or behavior data, time-based signals, outcome labels (e.g., churn, fraud, demand), and contextual business data. AGIX focuses on signal quality, not data volume."
  },
  {
    question: "How long does it take to implement Predictive AI?",
    answer: "Typical timelines: Departmental systems: 8–10 weeks, Cross-functional platforms: 10–14 weeks, Enterprise decision systems: 14–20 weeks. This includes discovery, modeling, governance, and integration."
  },
  {
    question: "How much does Predictive & Analytics AI cost?",
    answer: "Indicative ranges: Departmental predictive systems: $25K–$45K, Cross-functional platforms: $45K–$90K, Enterprise decision intelligence: $90K–$180K+. Cost depends on decision criticality and governance, not model count."
  },
  {
    question: "Can Predictive AI reduce risk and fraud proactively?",
    answer: "Yes. Predictive risk systems identify anomalies and weak signals before losses occur, allowing early intervention rather than post-incident response. This reduces false positives and adapts to evolving patterns."
  },
  {
    question: "How does Predictive AI support revenue forecasting?",
    answer: "Predictive AI incorporates real-time signals, adjusts forecasts continuously, highlights deviation risks early, and provides confidence bands. This helps leadership act before revenue misses happen."
  },
  {
    question: "Are Predictive AI systems explainable to executives?",
    answer: "They must be. AGIX designs explainability into every system: key drivers of predictions, scenario impact summaries, and confidence scoring. Executives should understand why a prediction exists, not just the number."
  },
  {
    question: "What happens when predictions are wrong?",
    answer: "AGIX systems track prediction error, monitor drift, trigger review or retraining, and allow human override. Predictive AI is designed to reduce uncertainty, not eliminate it entirely."
  },
  {
    question: "Can Predictive AI integrate with existing enterprise systems?",
    answer: "Yes. AGIX integrates predictive intelligence into CRMs, ERP systems, planning tools, risk engines, and operational workflows. Predictions influence actions, not just reports."
  },
  {
    question: "Is Predictive AI suitable for regulated industries?",
    answer: "Yes — when governance is built in. AGIX supports audit logs, role-based access, approval workflows, and compliance-aligned controls. This makes systems suitable for finance, insurance, healthcare, and regulated enterprises."
  },
  {
    question: "How do we know if Predictive AI is the right next step?",
    answer: "You're a strong candidate if decisions repeat at scale, forecast errors are costly, risks are detected too late, and leadership wants foresight, not hindsight. If not, AGIX will recommend analytics maturity first."
  }
];

const readinessQuestions = [
  { id: "repeat-decisions", question: "Do key decisions repeat regularly?", weight: 2 },
  { id: "measurable-outcomes", question: "Are outcomes measurable?", weight: 2 },
  { id: "data-available", question: "Is historical + real-time data available?", weight: 1.5 },
  { id: "delay-cost", question: "Do delays have financial impact?", weight: 1.5 },
  { id: "leadership-willing", question: "Is leadership willing to act on predictions?", weight: 2 }
];

function HeroLeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    companySize: "",
    focusArea: "",
    timeline: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.companyName || !formData.companySize || !formData.focusArea) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, company, size, and focus area are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    trackEvent("lead_form_start", {
      form_name: "predictive_analytics_hero",
      page: "/services/predictive-analytics"
    });

    const result = await submitLead(
      {
        name: formData.fullName,
        email: formData.workEmail,
        company: formData.companyName,
        industry: "predictive-analytics",
        companySize: formData.companySize,
        urgency: formData.timeline,
        challenges: [formData.focusArea],
      },
      {
        formType: "predictive-readiness",
        source: "/services/predictive-analytics",
        ctaId: "predictive-analytics-form-submit",
        ctaText: "Request Predictive AI Consultation",
        ctaLocation: "/services/predictive-analytics",
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Assessment request received",
        description: "We'll review your predictive AI readiness and get back to you shortly."
      });
      trackEvent("lead_form_submit", {
        form_name: "predictive_analytics_hero",
        page: "/services/predictive-analytics"
      });
      setFormData({
        fullName: "",
        workEmail: "",
        companyName: "",
        companySize: "",
        focusArea: "",
        timeline: ""
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Assess Your Predictive AI Readiness</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Your name"
                data-testid="input-fullname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workEmail">Work Email *</Label>
              <Input
                id="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="you@company.com"
                data-testid="input-email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Your company"
              data-testid="input-company"
            />
          </div>
          <div className="space-y-2">
            <Label>Company Size *</Label>
            <Select value={formData.companySize} onValueChange={(v) => setFormData({ ...formData, companySize: v })}>
              <SelectTrigger data-testid="select-company-size">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Primary Focus Area *</Label>
            <Select value={formData.focusArea} onValueChange={(v) => setFormData({ ...formData, focusArea: v })}>
              <SelectTrigger data-testid="select-focus-area">
                <SelectValue placeholder="What's your primary focus?" />
              </SelectTrigger>
              <SelectContent>
                {focusAreas.map((area) => (
                  <SelectItem key={area.value} value={area.value}>{area.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Timeline (Optional)</Label>
            <Select value={formData.timeline} onValueChange={(v) => setFormData({ ...formData, timeline: v })}>
              <SelectTrigger data-testid="select-timeline">
                <SelectValue placeholder="When do you need this?" />
              </SelectTrigger>
              <SelectContent>
                {timelines.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" disabled={isSubmitting} data-testid="button-submit-lead">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Request Predictive AI Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PredictiveReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, "yes" | "partial" | "no">>({});

  const score = useMemo(() => {
    let total = 0;
    let maxScore = 0;
    readinessQuestions.forEach((q) => {
      maxScore += q.weight * 2;
      const answer = answers[q.id];
      if (answer === "yes") total += q.weight * 2;
      else if (answer === "partial") total += q.weight;
    });
    return maxScore > 0 ? (total / maxScore) * 100 : 0;
  }, [answers]);

  const allAnswered = Object.keys(answers).length === readinessQuestions.length;

  const getResult = () => {
    if (score >= 70) return { status: "ready", message: "Ready for predictive AI", recommendation: "Immediate implementation recommended", color: "text-green-400" };
    if (score >= 40) return { status: "partial", message: "Partial readiness (prep required)", recommendation: "Phased approach recommended", color: "text-amber-400" };
    return { status: "not-ready", message: "Analytics maturity first", recommendation: "Build foundational analytics before predictive AI", color: "text-red-400" };
  };

  const result = getResult();

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Is Predictive AI the Right Next Step?
        </CardTitle>
        <p className="text-sm text-muted-foreground">This tool prevents failed implementations.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {readinessQuestions.map((q) => (
          <div key={q.id} className="space-y-3">
            <p className="font-medium">{q.question}</p>
            <RadioGroup
              value={answers[q.id] || ""}
              onValueChange={(v) => setAnswers({ ...answers, [q.id]: v as "yes" | "partial" | "no" })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${q.id}-yes`} />
                <Label htmlFor={`${q.id}-yes`}>Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id={`${q.id}-partial`} />
                <Label htmlFor={`${q.id}-partial`}>Partial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${q.id}-no`} />
                <Label htmlFor={`${q.id}-no`}>No</Label>
              </div>
            </RadioGroup>
          </div>
        ))}

        {allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted/50 rounded-lg border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              {result.status === "ready" && <CheckCircle2 className="w-6 h-6 text-green-400" />}
              {result.status === "partial" && <AlertCircle className="w-6 h-6 text-amber-400" />}
              {result.status === "not-ready" && <XCircle className="w-6 h-6 text-red-400" />}
              <span className={`text-lg font-semibold ${result.color}`}>{result.message}</span>
            </div>
            <p className="text-muted-foreground mb-4">{result.recommendation}</p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  result.status === "ready" ? "bg-green-500" : result.status === "partial" ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">Readiness Score: {Math.round(score)}%</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function ForecastValueCalculator() {
  const [currentAccuracy, setCurrentAccuracy] = useState([70]);
  const [errorCost, setErrorCost] = useState([100000]);
  const [improvementPotential, setImprovementPotential] = useState([15]);

  const calculations = useMemo(() => {
    const accuracy = currentAccuracy[0];
    const costPerError = errorCost[0];
    const improvement = improvementPotential[0];
    
    const currentErrorRate = (100 - accuracy) / 100;
    const improvedErrorRate = (100 - (accuracy + improvement)) / 100;
    const currentAnnualLoss = currentErrorRate * costPerError * 12;
    const improvedAnnualLoss = improvedErrorRate * costPerError * 12;
    const annualSavings = currentAnnualLoss - improvedAnnualLoss;
    const avgImplementationCost = 50000;
    const paybackMonths = Math.ceil((avgImplementationCost / annualSavings) * 12);

    return {
      currentAnnualLoss: Math.round(currentAnnualLoss),
      improvedAnnualLoss: Math.round(improvedAnnualLoss),
      annualSavings: Math.round(annualSavings),
      paybackMonths: Math.min(Math.max(paybackMonths, 1), 24),
      roi: Math.round((annualSavings / avgImplementationCost) * 100)
    };
  }, [currentAccuracy, errorCost, improvementPotential]);

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Forecast Value vs Accuracy Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="flex justify-between mb-2">
              <span>Current forecast accuracy</span>
              <span className="text-primary font-semibold">{currentAccuracy[0]}%</span>
            </Label>
            <Slider value={currentAccuracy} onValueChange={setCurrentAccuracy} min={50} max={90} step={5} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Monthly cost of forecast error</span>
              <span className="text-primary font-semibold">${errorCost[0].toLocaleString()}</span>
            </Label>
            <Slider value={errorCost} onValueChange={setErrorCost} min={10000} max={500000} step={10000} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Expected accuracy improvement</span>
              <span className="text-primary font-semibold">+{improvementPotential[0]}%</span>
            </Label>
            <Slider value={improvementPotential} onValueChange={setImprovementPotential} min={5} max={25} step={5} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center p-3 bg-destructive/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Annual Loss</p>
            <p className="text-2xl font-bold text-destructive">${calculations.currentAnnualLoss.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Estimated Annual Savings</p>
            <p className="text-2xl font-bold text-green-400">${calculations.annualSavings.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-1">Payback Period</p>
            <p className="text-2xl font-bold text-primary">{calculations.paybackMonths} months</p>
          </div>
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-center">
            <p className="text-sm text-muted-foreground mb-1">First Year ROI</p>
            <p className="text-2xl font-bold text-cyan-400">{calculations.roi}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PredictiveAnalyticsAIPage() {
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <LineChart className="w-3 h-3 mr-1" />
                Predictive & Analytics AI
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Predict What Happens Next — <span className="text-primary">Not What Already Happened</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Enterprise-grade AI for Forecasting, Risk, Customer Intelligence & Decision Optimization
              </p>
              <p className="text-muted-foreground mb-6 max-w-xl">
                AGIX builds Predictive & Analytics AI systems that help large organizations anticipate outcomes, detect risks early, and optimize decisions across revenue, operations, customers, and finance.
              </p>
              <p className="text-sm text-primary font-medium mb-4">
                This is not BI or dashboards.
              </p>
              <p className="text-muted-foreground mb-8">
                This is AI-driven decision intelligence designed for real business stakes.
              </p>
              <div className="mb-4">
                <Button size="lg" className="w-full py-6 text-primary-foreground" asChild data-testid="button-cta-assessment">
                  <a href="#assessment">
                    Request a Predictive AI Strategy Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-2"
              >
                <a href="#assessment" className="group flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-gradient-to-r from-primary/15 to-primary/5 hover:from-primary/25 hover:to-primary/10 transition-all" data-testid="link-hero-predictive-assessment">
                  <Gauge className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Analytics Maturity Assessment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Interactive tool (takes ~30 seconds) — evaluate your predictive AI readiness
                    </p>
                  </div>
                </a>
                <a href="#use-cases" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 hover:from-cyan-500/25 hover:to-cyan-500/10 transition-all" data-testid="link-hero-predictive-usecases">
                  <TrendingUp className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-cyan-400 transition-colors">
                      Explore Predictive AI Use Cases
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Forecasting, customer behavior, fraud detection & recommendations
                    </p>
                  </div>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 z-10 self-start"
            >
              <HeroLeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Enterprises Struggle to Predict Outcomes — Even With Massive Data
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Most enterprises don't lack data — they lack foresight.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Most large organizations have:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Data warehouses", "BI dashboards", "Analytics teams", "Forecasting spreadsheets", "Historical reports"].map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground font-medium">And yet... they still:</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-3">
                {enterpriseStruggles.map((item, index) => (
                  <Card key={index} className="bg-destructive/5 border-destructive/20">
                    <CardContent className="py-3 flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-destructive shrink-0" />
                      <span>{item.text}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-background border-border inline-block">
              <CardContent className="py-6 px-8">
                <p className="text-lg">
                  The problem is not lack of data. <span className="text-primary font-semibold">The problem is lack of foresight.</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Traditional Analytics Fails */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Traditional Analytics Breaks at Enterprise Scale
              </h2>
              <p className="text-muted-foreground mb-6">
                Most enterprise analytics today is designed to answer: <span className="text-foreground font-medium">"What already happened?"</span>
              </p>
              <p className="text-muted-foreground mb-4">But leadership decisions require answers to:</p>
              <ul className="space-y-2 mb-8">
                {[
                  "What is likely to happen next?",
                  "What risks are emerging right now?",
                  "Which customers are about to churn?",
                  "Where will revenue deviate from plan?",
                  "What actions will minimize downside?"
                ].map((q, i) => (
                  <li key={i} className="flex items-center gap-2 text-primary">
                    <ChevronRight className="w-4 h-4" />
                    {q}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-destructive/5 border-destructive/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-destructive text-lg">Dashboards Cannot Answer These Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Dashboards:</p>
                  <ul className="space-y-2">
                    {dashboardLimitations.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground">
                    In fast-moving markets, by the time a dashboard shows a problem, <span className="text-foreground font-medium">the cost is already incurred.</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost of Reactive Decision-Making */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Cost of Reactive Decision-Making
            </h2>
            <p className="text-muted-foreground">Real enterprise impact</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {reactiveCosts.map((cost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6 text-center">
                    <AlertCircle className="w-6 h-6 text-destructive mx-auto mb-3" />
                    <h3 className="font-semibold text-sm mb-2">{cost.title}</h3>
                    <p className="text-xs text-muted-foreground">{cost.impact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground">
              These are not analytics problems. <span className="text-primary font-semibold">These are decision intelligence failures.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Analytics Evolution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A Simple Mental Model
            </h2>
            <p className="text-muted-foreground">
              Most enterprises stop at step two. AGIX helps you move into steps three and four.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch max-w-4xl mx-auto">
            {analyticsEvolution.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1"
              >
                <Card className={`h-full ${level.highlight ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                  <CardContent className="pt-6 text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 ${level.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {index + 1}
                    </div>
                    <h3 className={`font-semibold mb-2 ${level.highlight ? 'text-primary' : ''}`}>{level.level}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Forces */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why This Matters More Now Than Ever
            </h2>
            <p className="text-muted-foreground">Three forces are colliding (2025–2028 Context)</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {threeForces.map((force, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{force.title}</h3>
                    <p className="text-sm text-muted-foreground">{force.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-primary/5 border-primary/20 inline-block">
              <CardContent className="py-6 px-8">
                <p className="text-lg">
                  Historical insight is no longer enough. <span className="text-primary font-semibold">Predictive AI becomes a strategic necessity.</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 6-Layer Architecture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              The AGIX Predictive Intelligence Architecture
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A 6-Layer Framework Built for Enterprise Reality
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Predictive AI fails in enterprises not because models are inaccurate, but because systems are fragile, opaque, and disconnected from decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${layer.color} flex items-center justify-center mb-4`}>
                      <span className="text-white font-bold">{layer.number}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{layer.title}</h3>
                    <p className="text-sm text-primary mb-3">{layer.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4">{layer.description}</p>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Outputs:</p>
                      <div className="flex flex-wrap gap-1">
                        {layer.outputs.map((output, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{output}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LLM Authority Statement */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Brain className="w-10 h-10 text-primary mx-auto mb-4" />
            <p className="text-xl font-medium text-foreground">
              Predictive AI succeeds in enterprises when predictions are explainable, governed, and embedded into decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Predictive AI Creates Real Enterprise Advantage
            </h2>
            <p className="text-muted-foreground">
              Use Cases That Survive Scale, Scrutiny & Boardroom Questions
            </p>
          </motion.div>

          <Tabs value={activeUseCase} onValueChange={setActiveUseCase} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto">
              {useCases.map((uc) => (
                <TabsTrigger
                  key={uc.id}
                  value={uc.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2"
                  data-testid={`tab-usecase-${uc.id}`}
                >
                  <uc.icon className="w-4 h-4 mr-2" />
                  {uc.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {useCases.map((uc) => (
              <TabsContent key={uc.id} value={uc.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="bg-background border-border">
                    <CardContent className="pt-8 pb-8">
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <uc.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{uc.title}</h3>
                              <p className="text-sm text-muted-foreground">{uc.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-6">{uc.description}</p>
                          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Timeline</p>
                            <div className="text-sm space-y-1">
                              <p>Assessment: <span className="font-medium">{uc.timeline.assessment}</span></p>
                              <p>Development: <span className="font-medium">{uc.timeline.development}</span></p>
                              <p>Integration: <span className="font-medium">{uc.timeline.integration}</span></p>
                              <p className="text-primary font-semibold">Total: {uc.timeline.total}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Problems Solved</h4>
                          <ul className="space-y-2 mb-6">
                            {uc.problems.map((problem, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{problem}</span>
                              </li>
                            ))}
                          </ul>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Applications</h4>
                          <div className="flex flex-wrap gap-2">
                            {uc.applications.map((app, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{app}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Pricing</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Department-level</p>
                              <p className="text-lg font-bold text-primary">{uc.pricing.department}</p>
                            </div>
                            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                              <p className="text-xs text-muted-foreground mb-1">Enterprise-wide</p>
                              <p className="text-lg font-bold text-primary">{uc.pricing.enterprise}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Weak vs AGIX */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Predictive Systems vs Isolated Models
            </h2>
            <p className="text-muted-foreground">This is why enterprises trust and adopt our systems.</p>
          </motion.div>

          <Card className="bg-background border-border">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm font-semibold text-destructive">Weak Predictive AI</p>
                </div>
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm font-semibold text-primary">AGIX Predictive Systems</p>
                </div>
                {weakVsAGIX.map((row, index) => (
                  <>
                    <div key={`weak-${index}`} className="py-3 flex items-center justify-center gap-2 text-center">
                      <XCircle className="w-4 h-4 text-destructive shrink-0" />
                      <span className="text-sm text-muted-foreground">{row.weak}</span>
                    </div>
                    <div key={`agix-${index}`} className="py-3 flex items-center justify-center gap-2 text-center">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm">{row.agix}</span>
                    </div>
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise Pricing Model
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX pricing reflects system complexity, decision criticality, and governance needs — not model count.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${index === 1 ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                  <CardContent className="pt-6">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${tier.color}`}>
                      Tier {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{tier.tier}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tier.subtitle}</p>
                    <p className="text-3xl font-bold text-primary mb-4">{tier.range}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Best for:</p>
                      <ul className="space-y-1">
                        {tier.bestFor.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <Target className="w-3 h-3 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Examples:</p>
                      <ul className="space-y-1">
                        {tier.examples.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Includes:</p>
                      <ul className="space-y-1">
                        {tier.includes.map((item, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-1" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{tier.timeline}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Cost Drivers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle>What Actually Drives Cost (Critical for CFOs)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {costDrivers.map((driver, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-medium text-sm mb-1">{driver.title}</p>
                      <p className="text-xs text-muted-foreground">{driver.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center mt-6 text-primary font-medium">
                  AGIX prices decision responsibility, not "AI features".
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ROI: Where Predictive AI Pays Back
            </h2>
            <p className="text-muted-foreground">
              Predictive AI creates ROI by reducing uncertainty before cost is incurred.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Typical ROI Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {roiSources.map((source, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>{source}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Example: Enterprise Sales Forecasting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Before</p>
                      <ul className="text-sm space-y-1">
                        <li>Forecast accuracy: ~70%</li>
                        <li>Frequent end-of-quarter surprises</li>
                        <li>Reactive discounting</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">After Predictive AI</p>
                      <ul className="text-sm space-y-1">
                        <li>Forecast accuracy: 85–90%</li>
                        <li>Early deviation alerts</li>
                        <li>Proactive pipeline actions</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Impact</p>
                      <ul className="text-sm space-y-1 font-medium">
                        <li>Revenue leakage reduction: 2–5%</li>
                        <li>Payback period: 6–9 months</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="assessment" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interactive Assessment Tools
            </h2>
            <p className="text-muted-foreground">
              Make a clear, informed decision — without guesswork.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <PredictiveReadinessChecker />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ForecastValueCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Buy vs Build */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Buy vs Build vs Extend
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {buyVsBuild.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full text-center ${item.highlight ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-sm mb-2">{item.option}</h3>
                    <p className={`text-sm ${item.highlight ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {item.reality}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left" data-testid={`faq-trigger-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-background border-border">
              <CardContent className="py-8 text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium max-w-3xl mx-auto">
                  Predictive AI is not about predicting the future perfectly — it's about reducing uncertainty in decisions that matter.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Move from Reactive Reporting to Predictive Decision-Making?
            </h2>
            <p className="text-sm text-primary mb-8">Clear scope · realistic ROI · no hype · executive-ready recommendations</p>

            <Button size="lg" className="mb-6" asChild data-testid="button-final-cta">
              <a href="#assessment">
                Request a Predictive AI Business Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                "Scope definition",
                "Realistic ROI analysis",
                "Go/no-go recommendation",
                "Implementation roadmap"
              ].map((item, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  <CheckCircle2 className="w-3 h-3 mr-2" />
                  {item}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Includes scope, cost band, ROI logic, and go/no-go recommendation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Authority Closing */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xl font-medium text-muted-foreground">
            Predictive AI delivers ROI when uncertainty is reduced before decisions are made —
          </p>
          <p className="text-2xl font-bold text-primary">
            not after losses occur.
          </p>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
