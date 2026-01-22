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
  Database,
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
  Stethoscope,
  Wallet,
  Briefcase,
  ChevronRight,
  Sparkles,
  Network,
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
  BookOpen,
  Settings,
  BarChart3,
  RefreshCw,
  Filter,
  Loader2,
  MapPin,
  Boxes,
  GitBranch,
  ShieldCheck
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
  { value: "smb", label: "SMB (10–50)" },
  { value: "growing", label: "Growing (50–200)" },
  { value: "mid-market", label: "Mid-market (200–500)" },
  { value: "enterprise", label: "Enterprise (500+)" }
];

const primaryGoals = [
  { value: "enterprise-search", label: "Enterprise search" },
  { value: "internal-assistant", label: "Internal AI assistant" },
  { value: "private-llm", label: "Private LLM for teams" },
  { value: "customer-facing", label: "Customer-facing knowledge bot" }
];

const timelines = [
  { value: "immediate", label: "Immediate" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" }
];

const problemsWithAI = [
  { icon: AlertCircle, text: "AI gives confident but wrong answers" },
  { icon: RefreshCw, text: "Responses change unpredictably" },
  { icon: Lock, text: "Sensitive data cannot be shared with public LLMs" },
  { icon: Boxes, text: "Knowledge is scattered across tools and documents" },
  { icon: XCircle, text: "Employees don't trust AI outputs" }
];

const whyHallucinations = [
  { point: "Do not know your internal data", icon: Database },
  { point: "Do not understand your policies", icon: FileText },
  { point: "Do not have access to live systems", icon: Server }
];

const whatRAGSolves = [
  { step: "1", title: "Retrieve", description: "Retrieve the right internal information" },
  { step: "2", title: "Ground", description: "Ground responses in verified knowledge" },
  { step: "3", title: "Generate", description: "Generate answers based on facts, not guesses" },
  { step: "4", title: "Secure", description: "Keep data private and secure" }
];

const ragComponents = [
  { title: "Data ingestion pipelines", icon: Boxes },
  { title: "Knowledge structuring", icon: Layers },
  { title: "Vector indexing", icon: Database },
  { title: "Access control", icon: Lock },
  { title: "Retrieval logic", icon: Search },
  { title: "LLM reasoning", icon: Brain },
  { title: "Accuracy validation", icon: CheckCircle2 }
];

const knowledgeTypes = [
  "Internal documents (PDFs, Word, PPTs)",
  "SOPs & policies",
  "Databases & records",
  "Wikis & knowledge bases",
  "CRM & ERP data",
  "Customer documentation"
];

const architectureLayers = [
  {
    number: 1,
    title: "Knowledge Discovery & Source Mapping",
    subtitle: "The Foundation Most Teams Skip",
    description: "Before touching AI models, AGIX maps what knowledge exists, where it lives, which sources are authoritative, which are outdated, and who owns each knowledge domain.",
    outputs: ["Knowledge source map", "Ownership & freshness tagging", "Priority-based ingestion plan"],
    color: "from-blue-500 to-blue-600"
  },
  {
    number: 2,
    title: "Knowledge Structuring & Chunking",
    subtitle: "Where Accuracy Is Won or Lost",
    description: "We design chunking based on document type, semantic boundaries, question-answer patterns, and hierarchical structure. Each chunk includes source reference, section context, timestamp, and access permissions.",
    outputs: ["Semantic chunking strategy", "Metadata enrichment", "Context preservation"],
    color: "from-cyan-500 to-cyan-600"
  },
  {
    number: 3,
    title: "Vector Indexing & Retrieval Logic",
    subtitle: "Semantic Search Done Correctly",
    description: "AGIX optimizes for relevance, precision, recall, and freshness using semantic similarity, hybrid search, metadata constraints, top-k tuning, and confidence thresholds.",
    outputs: ["Vector database setup", "Hybrid search configuration", "Retrieval optimization"],
    color: "from-teal-500 to-teal-600"
  },
  {
    number: 4,
    title: "Grounded Generation & Answer Control",
    subtitle: "Stopping Hallucinations by Design",
    description: "AI can only answer using retrieved context. If context is insufficient, AI says 'I don't know'. Source citations included. Confidence scoring per answer.",
    outputs: ["Prompt constraints", "Response validation", "Fallback logic"],
    color: "from-green-500 to-green-600"
  },
  {
    number: 5,
    title: "Access Control, Privacy & Governance",
    subtitle: "Critical for SMBs & Enterprises",
    description: "AGIX enforces role-based access control, data isolation, knowledge-level permissions, audit logs for every query, and secure API boundaries.",
    outputs: ["Role-based access", "Audit trails", "Compliance readiness"],
    color: "from-amber-500 to-amber-600"
  },
  {
    number: 6,
    title: "Monitoring, Evaluation & Improvement",
    subtitle: "Why RAG Systems Improve Over Time",
    description: "We measure retrieval accuracy, answer relevance, user feedback, knowledge gaps, and drift over time. Re-chunking, index refresh, and prompt refinement prevent decay.",
    outputs: ["Performance dashboards", "Knowledge versioning", "Continuous tuning"],
    color: "from-orange-500 to-orange-600"
  }
];

const capabilities = [
  {
    id: "enterprise-search",
    title: "Enterprise Search",
    subtitle: "AI-Powered, Not Keyword-Based",
    icon: Search,
    description: "Employees search across documents, databases, and systems using natural language, receiving contextual, accurate answers — not just links.",
    problems: [
      "Employees waste hours searching across tools",
      "Knowledge is duplicated and outdated",
      "Keyword search fails on phrasing differences",
      "Critical information is buried in documents"
    ],
    useCases: ["SOPs and policies", "Cross-department access", "Compliance queries", "Answers across PDFs"],
    timeline: "4–7 weeks",
    pricing: { smb: "$8K – $15K", enterprise: "$15K – $35K+" }
  },
  {
    id: "private-llm",
    title: "Private LLMs",
    subtitle: "Secure AI That Never Trains on Your Data",
    icon: Lock,
    description: "Use powerful language models while ensuring data privacy, isolation, and governance. Ideal for regulated industries.",
    problems: [
      "Data privacy concerns with public LLMs",
      "Compliance restrictions (legal, healthcare, finance)",
      "Risk of sensitive data leakage",
      "Lack of auditability"
    ],
    useCases: ["Decision support", "Policy interpretation", "Financial analysis", "Secure AI copilots"],
    timeline: "5–8 weeks",
    pricing: { smb: "$12K – $25K", enterprise: "$25K – $60K+" }
  },
  {
    id: "knowledge-assistant",
    title: "Knowledge Assistants",
    subtitle: "Internal AI That Employees Trust",
    icon: MessageSquare,
    description: "Conversational AI grounded in company knowledge that answers employee questions accurately and securely.",
    problems: [
      "Repetitive internal questions",
      "Long onboarding times",
      "Knowledge trapped in documents",
      "Interrupt-driven work culture"
    ],
    useCases: ["HR & policy questions", "IT support", "Training & onboarding", "Management reporting"],
    timeline: "5–8 weeks",
    pricing: { smb: "$10K – $18K", enterprise: "$18K – $40K+" }
  },
  {
    id: "vector-database",
    title: "Vector Databases & Semantic Memory",
    subtitle: "The Backbone of Reliable AI Knowledge",
    icon: Database,
    description: "Store semantic representations of knowledge, enabling AI to retrieve the right information based on meaning, not keywords.",
    problems: [
      "Retrieval is inaccurate without vectors",
      "AI responses degrade over time",
      "Knowledge becomes noisy",
      "Keyword matching fails"
    ],
    useCases: ["Semantic search", "Hybrid retrieval", "Knowledge refresh", "Embedding versioning"],
    timeline: "2–4 weeks",
    pricing: { smb: "$5K – $8K", enterprise: "$8K – $20K+" }
  },
  {
    id: "customer-facing",
    title: "Customer-Facing Knowledge AI",
    subtitle: "Accurate Answers Without Hallucinations",
    icon: Users,
    description: "AI answers customer questions using approved documentation only, ensuring accuracy and consistency.",
    problems: [
      "Inconsistent support answers",
      "Hallucinated responses to customers",
      "Support overload",
      "Knowledge drift across teams"
    ],
    useCases: ["Product documentation bots", "Support portals", "Helpdesk deflection", "Self-service knowledge"],
    timeline: "5–8 weeks",
    pricing: { smb: "$12K – $20K", enterprise: "$20K – $45K+" }
  }
];

const pricingTiers = [
  {
    tier: "Starter RAG",
    subtitle: "SMBs / Teams",
    range: "$8K – $15K",
    bestFor: ["Small teams", "Internal knowledge assistants", "Limited document sets"],
    includes: [
      "Knowledge discovery & ingestion",
      "Clean chunking & vector indexing",
      "Secure RAG pipeline",
      "Internal chat UI",
      "Source-linked answers"
    ],
    timeline: "4–6 weeks",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    tier: "Business RAG System",
    subtitle: "Growing / Mid-Market",
    range: "$15K – $35K",
    bestFor: ["Multiple departments", "Enterprise search", "Internal AI assistants"],
    includes: [
      "Multi-source ingestion (docs + tools)",
      "Advanced chunking & metadata",
      "Role-based access control",
      "Monitoring & tuning",
      "API + UI integration"
    ],
    timeline: "6–8 weeks",
    color: "bg-primary/20 text-primary"
  },
  {
    tier: "Enterprise Knowledge AI",
    subtitle: "Large Organizations",
    range: "$35K – $75K+",
    bestFor: ["Large organizations", "Compliance-driven environments", "Customer-facing knowledge systems"],
    includes: [
      "Large-scale ingestion & indexing",
      "Strict governance & audit logs",
      "Private LLM grounding",
      "Multi-role access control",
      "High availability & observability"
    ],
    timeline: "8–12 weeks",
    color: "bg-cyan-500/20 text-cyan-400"
  }
];

const costDrivers = [
  { title: "Volume of knowledge", description: "Not just number of files, but depth and complexity" },
  { title: "Structure quality", description: "Clean vs messy data affects processing" },
  { title: "Access control complexity", description: "Role-based permissions add layers" },
  { title: "Accuracy requirements", description: "Higher accuracy needs more validation" },
  { title: "Compliance & audit needs", description: "Regulated industries require more governance" },
  { title: "Internal vs customer-facing", description: "External use requires stricter controls" }
];

const roiDrivers = [
  "Reduced time spent searching for information",
  "Faster onboarding",
  "Fewer internal interruptions",
  "Lower support ticket volume",
  "Higher trust in AI responses"
];

const buyVsBuild = [
  { option: "DIY RAG", reality: "High effort, poor accuracy" },
  { option: "Generic tools", reality: "Limited control & trust" },
  { option: "AGIX RAG", reality: "Reliable, secure, scalable" }
];

const faqItems = [
  {
    question: "What is RAG (Retrieval-Augmented Generation) in AI?",
    answer: "RAG is an AI architecture that allows language models to retrieve relevant information from external knowledge sources before generating a response. Instead of guessing, the AI answers using verified, up-to-date business data, making responses more accurate and trustworthy."
  },
  {
    question: "How is RAG different from training an AI model on company data?",
    answer: "RAG does not train the model on your data. It retrieves relevant information at query time and uses it as context. This means your data stays private, updates are immediate, no retraining is required, and compliance risks are reduced."
  },
  {
    question: "Why do AI systems hallucinate without RAG?",
    answer: "Hallucinations occur when an AI lacks access to correct information, is forced to guess based on patterns, or has incomplete or outdated context. RAG prevents hallucinations by restricting AI responses to retrieved factual knowledge."
  },
  {
    question: "Is RAG necessary for enterprise AI applications?",
    answer: "Yes. Any enterprise AI system that requires accuracy, privacy, or trust needs a RAG layer. Without RAG, answers are unreliable, compliance is risky, and business users lose confidence."
  },
  {
    question: "What types of data can RAG systems use?",
    answer: "RAG systems can retrieve from PDFs, Word, PowerPoint files, SOPs and policy documents, databases and records, wikis and internal portals, CRM and ERP systems, and approved customer documentation."
  },
  {
    question: "Is company data safe in a RAG system?",
    answer: "Yes — when designed correctly. AGIX RAG systems ensure data isolation, role-based access control, no training on public models, secure retrieval pipelines, and full audit logs. Your data remains private and controlled."
  },
  {
    question: "What is the difference between enterprise search and RAG?",
    answer: "Enterprise search returns documents or links. RAG retrieves information and generates direct answers with context and citations. RAG is semantic and conversational, not keyword-based."
  },
  {
    question: "Can RAG be used with private or on-premise LLMs?",
    answer: "Yes. RAG works with private cloud LLMs, VPC-hosted models, on-premise deployments, and hybrid enterprise setups. This is ideal for regulated industries."
  },
  {
    question: "How long does it take to build a RAG system?",
    answer: "Typical timelines: SMB systems: 4–6 weeks, Mid-market systems: 6–8 weeks, Enterprise platforms: 8–12 weeks. Time depends on data volume, structure, and governance needs."
  },
  {
    question: "How much does a RAG system cost?",
    answer: "Indicative costs: Starter RAG: $8,000 – $15,000, Business RAG: $15,000 – $35,000, Enterprise RAG: $35,000 – $75,000+. Cost depends on accuracy, security, and scale, not number of documents."
  },
  {
    question: "What is a vector database and why is it needed for RAG?",
    answer: "A vector database stores semantic representations of content, enabling AI to retrieve information based on meaning rather than keywords. Without vector databases, RAG systems lose relevance and accuracy."
  },
  {
    question: "Can RAG systems be used for customer-facing AI?",
    answer: "Yes — and they should be. RAG ensures customer-facing AI answers only from approved documentation, avoids hallucinations, maintains consistent messaging, and escalates when information is missing."
  },
  {
    question: "How do you keep RAG knowledge up to date?",
    answer: "AGIX implements scheduled re-indexing, version control, knowledge ownership tagging, and monitoring for outdated responses. This prevents knowledge decay over time."
  },
  {
    question: "Is RAG suitable for small and mid-sized businesses?",
    answer: "Absolutely. SMBs benefit from faster onboarding, reduced interruptions, centralized knowledge access, and secure AI without large teams. RAG is not enterprise-only anymore."
  },
  {
    question: "How do I know if my business is ready for RAG?",
    answer: "You are RAG-ready if knowledge exists but is hard to find, employees ask repetitive questions, accuracy matters, and AI answers must be trusted. If not, AGIX helps you prepare your knowledge first."
  }
];

const readinessQuestions = [
  { id: "structured-docs", question: "Do you have structured documents (SOPs, policies, guides)?", weight: 2 },
  { id: "ownership", question: "Is ownership of knowledge defined?", weight: 1.5 },
  { id: "updated", question: "Are documents updated regularly?", weight: 1.5 },
  { id: "access-control", question: "Is access control required?", weight: 1 },
  { id: "accuracy-critical", question: "Is accuracy critical (legal, financial, operational)?", weight: 2 }
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
    primaryGoal: "",
    timeline: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.companyName || !formData.companySize || !formData.primaryGoal) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, company, size, and primary goal are required.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    trackEvent("lead_form_start", {
      form_name: "rag_knowledge_hero",
      page: "/services/rag-knowledge"
    });

    const result = await submitLead(
      {
        name: formData.fullName,
        email: formData.workEmail,
        company: formData.companyName,
        industry: "rag-knowledge",
        companySize: formData.companySize,
        urgency: formData.timeline,
        challenges: [formData.primaryGoal],
      },
      {
        formType: "knowledge-readiness",
        source: "/services/rag-knowledge",
        ctaId: "rag-knowledge-form-submit",
        ctaText: "Request Knowledge AI Consultation",
        ctaLocation: "/services/rag-knowledge",
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Assessment request received",
        description: "We'll review your knowledge AI readiness and get back to you shortly."
      });
      trackEvent("lead_form_submit", {
        form_name: "rag_knowledge_hero",
        page: "/services/rag-knowledge"
      });
      setFormData({
        fullName: "",
        workEmail: "",
        companyName: "",
        companySize: "",
        primaryGoal: "",
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
        <CardTitle className="text-xl">Assess Your Knowledge AI Readiness</CardTitle>
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
            <Label>Primary Goal *</Label>
            <Select value={formData.primaryGoal} onValueChange={(v) => setFormData({ ...formData, primaryGoal: v })}>
              <SelectTrigger data-testid="select-primary-goal">
                <SelectValue placeholder="What do you want to build?" />
              </SelectTrigger>
              <SelectContent>
                {primaryGoals.map((goal) => (
                  <SelectItem key={goal.value} value={goal.value}>{goal.label}</SelectItem>
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
                Request Knowledge AI Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function KnowledgeReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, "yes" | "partial" | "no">>({});
  const [showResult, setShowResult] = useState(false);

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
    if (score >= 70) return { status: "ready", message: "Your data is RAG-ready", recommendation: "Immediate RAG implementation recommended", color: "text-green-400" };
    if (score >= 40) return { status: "partial", message: "Some cleanup required before implementation", recommendation: "Phased RAG approach recommended", color: "text-amber-400" };
    return { status: "not-ready", message: "Knowledge restructuring recommended first", recommendation: "Knowledge cleanup before RAG", color: "text-red-400" };
  };

  const result = getResult();

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Is Your Data Ready for RAG?
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

function ROICalculator() {
  const [employees, setEmployees] = useState([50]);
  const [searchTime, setSearchTime] = useState([30]);
  const [hourlyRate, setHourlyRate] = useState([50]);

  const calculations = useMemo(() => {
    const emp = employees[0];
    const mins = searchTime[0];
    const rate = hourlyRate[0];
    
    const dailyHoursLost = (emp * mins) / 60;
    const annualHoursLost = dailyHoursLost * 250;
    const annualCostLost = annualHoursLost * rate;
    const timeSavedPercent = 0.7;
    const hoursSaved = annualHoursLost * timeSavedPercent;
    const moneySaved = hoursSaved * rate;
    const avgImplementationCost = 25000;
    const paybackMonths = Math.ceil((avgImplementationCost / moneySaved) * 12);

    return {
      dailyHoursLost: dailyHoursLost.toFixed(1),
      annualHoursLost: Math.round(annualHoursLost),
      annualCostLost: Math.round(annualCostLost),
      hoursSaved: Math.round(hoursSaved),
      moneySaved: Math.round(moneySaved),
      paybackMonths: Math.min(paybackMonths, 12)
    };
  }, [employees, searchTime, hourlyRate]);

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          RAG Cost & ROI Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="flex justify-between mb-2">
              <span>Number of employees</span>
              <span className="text-primary font-semibold">{employees[0]}</span>
            </Label>
            <Slider value={employees} onValueChange={setEmployees} min={10} max={500} step={10} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Avg. time searching per day (minutes)</span>
              <span className="text-primary font-semibold">{searchTime[0]} min</span>
            </Label>
            <Slider value={searchTime} onValueChange={setSearchTime} min={10} max={120} step={5} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Average hourly rate ($)</span>
              <span className="text-primary font-semibold">${hourlyRate[0]}</span>
            </Label>
            <Slider value={hourlyRate} onValueChange={setHourlyRate} min={25} max={150} step={5} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center p-3 bg-destructive/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Annual Cost</p>
            <p className="text-2xl font-bold text-destructive">${calculations.annualCostLost.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{calculations.annualHoursLost.toLocaleString()} hours lost/year</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Estimated Annual Savings</p>
            <p className="text-2xl font-bold text-green-400">${calculations.moneySaved.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{calculations.hoursSaved.toLocaleString()} hours saved/year</p>
          </div>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
          <p className="text-sm text-muted-foreground mb-1">Estimated Payback Period</p>
          <p className="text-3xl font-bold text-primary">{calculations.paybackMonths} months</p>
          <p className="text-xs text-muted-foreground">Based on 70% reduction in search time</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RAGKnowledgeAIPage() {
  const [activeCapability, setActiveCapability] = useState(capabilities[0].id);

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
                <Database className="w-3 h-3 mr-1" />
                RAG & Knowledge AI
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Make AI Answer From <span className="text-primary">Your Knowledge</span> — Not the Internet
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Private. Accurate. Secure. Enterprise-Grade RAG Systems.
              </p>
              <p className="text-muted-foreground mb-8 max-w-xl">
                AGIX builds RAG & Knowledge AI systems that allow AI models to retrieve, reason over, and answer questions using your internal data — documents, systems, policies, and knowledge bases — without exposing it to public models.
              </p>
              <p className="text-sm text-primary font-medium mb-8">
                This is how businesses move from AI demos to AI systems they can trust.
              </p>
              <div className="mb-4">
                <Button size="lg" className="w-full py-6 text-primary-foreground" asChild data-testid="button-cta-assessment">
                  <a href="#assessment">
                    Request a Knowledge AI Assessment
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
                <a href="#assessment" className="group flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-gradient-to-r from-primary/15 to-primary/5 hover:from-primary/25 hover:to-primary/10 transition-all" data-testid="link-hero-rag-readiness">
                  <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Knowledge Base Readiness Assessment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Interactive tool (takes ~30 seconds) — evaluate your RAG readiness
                    </p>
                  </div>
                </a>
                <a href="#capabilities" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 hover:from-cyan-500/25 hover:to-cyan-500/10 transition-all" data-testid="link-hero-rag-capabilities">
                  <Database className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-cyan-400 transition-colors">
                      Explore RAG Capabilities
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Enterprise search, private LLMs, knowledge assistants & document AI
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
              The Real Problem With AI in Businesses Today
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most companies experimenting with AI face the same issues:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {problemsWithAI.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-destructive/5 border-destructive/20">
                  <CardContent className="pt-6 text-center">
                    <problem.icon className="w-8 h-8 text-destructive mx-auto mb-3" />
                    <p className="text-sm">{problem.text}</p>
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
            <Card className="bg-background border-border inline-block">
              <CardContent className="py-6 px-8">
                <p className="text-lg">
                  <span className="text-destructive font-semibold">The result?</span>{" "}
                  AI becomes a demo tool — not a business system.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Hallucinations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why This Happens
              </h2>
              <p className="text-muted-foreground mb-6">Large Language Models:</p>
              <div className="space-y-4 mb-6">
                {whyHallucinations.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
                    <item.icon className="w-5 h-5 text-destructive shrink-0" />
                    <span>{item.point}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                They generate responses based on training data, not your knowledge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-destructive/5 border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive">This leads to:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["Hallucinations", "Outdated answers", "Compliance risks", "Loss of trust"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-destructive" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What RAG Solves */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What RAG & Knowledge AI Actually Solves
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              RAG (Retrieval-Augmented Generation) is the architecture that allows AI to work with your data.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {whatRAGSolves.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border hover-elevate">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{item.step}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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
                <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-lg font-medium">
                  RAG turns AI from a storyteller into a reliable analyst.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What AGIX RAG Includes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What RAG & Knowledge AI Means at AGIX
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              At AGIX, RAG & Knowledge AI is not just vector databases, embeddings, or document upload + chat.
            </p>
            <p className="text-primary font-medium">
              It is a knowledge system designed as enterprise infrastructure, not experiments.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {ragComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="text-sm py-2 px-4 flex items-center gap-2">
                  <component.icon className="w-4 h-4" />
                  {component.title}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Layer Architecture */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              The AGIX Knowledge Intelligence Architecture
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A 6-Layer System Built for Accuracy & Trust
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              RAG systems fail not because AI is weak — they fail because knowledge is poorly structured, retrieved incorrectly, or not governed.
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

      {/* Capabilities */}
      <section id="capabilities" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Capabilities & High-Impact Use Cases
            </h2>
            <p className="text-muted-foreground">
              Each capability represents a deployable system, not a feature.
            </p>
          </motion.div>

          <Tabs value={activeCapability} onValueChange={setActiveCapability} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto">
              {capabilities.map((cap) => (
                <TabsTrigger
                  key={cap.id}
                  value={cap.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2"
                  data-testid={`tab-capability-${cap.id}`}
                >
                  <cap.icon className="w-4 h-4 mr-2" />
                  {cap.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {capabilities.map((cap) => (
              <TabsContent key={cap.id} value={cap.id}>
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
                              <cap.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{cap.title}</h3>
                              <p className="text-sm text-muted-foreground">{cap.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-6">{cap.description}</p>
                          <div className="flex gap-4">
                            <div className="text-center p-3 bg-muted/50 rounded-lg flex-1">
                              <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                              <p className="text-xs text-muted-foreground">Timeline</p>
                              <p className="font-semibold">{cap.timeline}</p>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg flex-1">
                              <DollarSign className="w-4 h-4 text-primary mx-auto mb-1" />
                              <p className="text-xs text-muted-foreground">SMB</p>
                              <p className="font-semibold text-primary">{cap.pricing.smb}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Problems Solved</h4>
                          <ul className="space-y-2">
                            {cap.problems.map((problem, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{problem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Typical Use Cases</h4>
                          <div className="flex flex-wrap gap-2">
                            {cap.useCases.map((uc, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{uc}</Badge>
                            ))}
                          </div>
                          <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-xs text-muted-foreground mb-1">Enterprise pricing</p>
                            <p className="text-lg font-bold text-primary">{cap.pricing.enterprise}</p>
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

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple & Clear Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX pricing for RAG systems is scope-based, not per-document or per-token hype.
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
                <CardTitle>What Actually Drives Cost</CardTitle>
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
                  AGIX prices reliability and trust, not "AI features."
                </p>
              </CardContent>
            </Card>
          </motion.div>
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
              <KnowledgeReadinessChecker />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ROICalculator />
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
              Buy vs Build vs DIY
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {buyVsBuild.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full text-center ${index === 2 ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">{item.option}</h3>
                    <p className={`text-sm ${index === 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
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
                  RAG is the foundation that transforms AI from a generative tool into a reliable business system.
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
              Ready to Turn Your Knowledge into a Reliable AI System?
            </h2>
            <p className="text-muted-foreground mb-2">Get a Custom RAG & Knowledge AI Plan</p>
            <p className="text-sm text-primary mb-8">Clear scope · realistic timeline · accurate cost · no hype</p>

            <Button size="lg" className="mb-6" asChild data-testid="button-final-cta">
              <a href="#assessment">
                Request Your Knowledge AI Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                "Confirmation if RAG is the right approach",
                "Knowledge readiness evaluation",
                "Architecture recommendation",
                "Clear build vs phase-wise roadmap"
              ].map((item, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  <CheckCircle2 className="w-3 h-3 mr-2" />
                  {item}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              We'll recommend automation, conversational AI, or RAG — based on what actually fits your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Authority Closing */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xl font-medium text-muted-foreground">
            Accurate AI starts with knowledge.
          </p>
          <p className="text-2xl font-bold text-primary">
            RAG is how businesses make AI trustworthy.
          </p>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
