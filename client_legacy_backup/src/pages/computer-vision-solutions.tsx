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
  Eye,
  Scan,
  Video,
  FileText,
  Camera,
  Cpu,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  Building2,
  Clock,
  ChevronRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Calculator,
  Loader2,
  Activity,
  Layers,
  Target,
  Zap,
  Factory,
  Microscope,
  Box,
  Settings,
  RefreshCw,
  Lock,
  BarChart3,
  Brain,
  Server,
  MonitorCheck,
  CircuitBoard,
  Network,
  Workflow,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Users,
  Boxes,
  Search,
  FileSearch,
  ScanLine,
  Cog
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const industries = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "logistics", label: "Logistics" },
  { value: "smart-cities", label: "Smart Cities" },
  { value: "research-rd", label: "Research / R&D" }
];

const useCaseOptions = [
  { value: "image-recognition", label: "Image recognition" },
  { value: "video-intelligence", label: "Video intelligence" },
  { value: "inspection-defect", label: "Inspection / defect detection" },
  { value: "ocr-document", label: "OCR / document vision" },
  { value: "custom-research", label: "Custom research-grade vision system" }
];

const timelines = [
  { value: "immediate", label: "Immediate" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" }
];

const realWorldChallenges = [
  { icon: Zap, text: "Variable lighting" },
  { icon: Camera, text: "Camera drift and occlusion" },
  { icon: Settings, text: "Hardware inconsistencies" },
  { icon: AlertCircle, text: "Data bias and edge cases" },
  { icon: RefreshCw, text: "Domain shifts over time" }
];

const enterprisePains = [
  "Models fail when conditions change",
  "OCR breaks on real documents",
  "Inspection AI misses subtle defects",
  "Video models can't scale in real time",
  "Accuracy drops post-deployment",
  "No visibility into why failures occur"
];

const vendorFocus = [
  { item: "Model architecture", wrong: true },
  { item: "Pretrained APIs", wrong: true },
  { item: "Accuracy metrics in isolation", wrong: true }
];

const productionRequires = [
  "Dataset strategy",
  "Bias and imbalance handling",
  "Robust evaluation protocols",
  "Domain adaptation",
  "Hardware-aware optimization",
  "Continuous retraining pipelines"
];

const agixMindset = [
  { number: 1, text: "Observe reliably under variability" },
  { number: 2, text: "Interpret meaning, not just detect objects" },
  { number: 3, text: "Support decisions with confidence and context" },
  { number: 4, text: "Fail safely when uncertainty is high" },
  { number: 5, text: "Improve continuously as environments evolve" }
];

const threeLayerModel = [
  { layer: "Perception", question: "What is being seen?", icon: Eye },
  { layer: "Understanding", question: "What does it mean in context?", icon: Brain },
  { layer: "Action", question: "What decision or workflow should follow?", icon: Target }
];

const trends2025 = [
  { title: "Physical-world automation", description: "Manufacturing, logistics, healthcare, retail, infrastructure." },
  { title: "Human scalability limits", description: "Manual inspection, review, and monitoring do not scale." },
  { title: "Edge + real-time constraints", description: "Vision must run closer to cameras, faster, and cheaper." }
];

const serviceIncludes = [
  { icon: ScanLine, text: "Image recognition systems" },
  { icon: Video, text: "Video intelligence pipelines" },
  { icon: Search, text: "Inspection & defect detection" },
  { icon: FileSearch, text: "OCR & document understanding" },
  { icon: Network, text: "Vision-language and multimodal systems" },
  { icon: Server, text: "Edge and cloud deployment" }
];

const architectureLayers = [
  {
    number: 1,
    title: "Problem Framing & Visual Semantics",
    subtitle: "Where Most Vision Projects Go Wrong",
    description: "Before touching data or models, AGIX clarifies what exactly needs to be seen, what constitutes success vs failure, what visual ambiguity is acceptable, and what happens when the system is uncertain.",
    outputs: ["Clear perception objectives", "Decision boundaries", "Risk tolerance definitions", "Human-override criteria"],
    color: "from-violet-500 to-violet-600"
  },
  {
    number: 2,
    title: "Data Strategy, Collection & Bias Control",
    subtitle: "The Most Important Layer in Vision AI",
    description: "Real-world vision data is imbalanced, noisy, biased by environment, and expensive to label. We treat datasets as living assets with domain-specific audits, edge case coverage, and active learning.",
    outputs: ["Domain audits", "Bias analysis", "Active learning", "Synthetic data strategy"],
    color: "from-blue-500 to-blue-600"
  },
  {
    number: 3,
    title: "Model Architecture & Training Strategy",
    subtitle: "Accuracy Alone Is Not the Goal",
    description: "We evaluate robustness under variability, interpretability needs, latency constraints, and maintenance cost. Often simpler, well-tuned models outperform complex ones in production.",
    outputs: ["Domain augmentations", "Hard-example mining", "Cross-env validation", "Multi-metric evaluation"],
    color: "from-cyan-500 to-cyan-600"
  },
  {
    number: 4,
    title: "Evaluation Beyond Accuracy",
    subtitle: "What Research-Grade Vision Requires",
    description: "A model can be 95% accurate and still unusable in production. We evaluate precision vs recall trade-offs, false positive costs, performance under degraded conditions, and confidence calibration.",
    outputs: ["Error distribution analysis", "Edge-case reports", "Confidence thresholds", "Silent failure prevention"],
    color: "from-teal-500 to-teal-600"
  },
  {
    number: 5,
    title: "Deployment, Optimization & Continuous Learning",
    subtitle: "Where Most Vision Systems Break",
    description: "AGIX designs for edge vs cloud inference, hardware acceleration, latency constraints, and fail-safe behavior with performance monitoring, drift detection, and scheduled retraining.",
    outputs: ["Edge/cloud optimization", "Drift detection", "Feedback loops", "Environment tuning"],
    color: "from-emerald-500 to-emerald-600"
  },
  {
    number: 6,
    title: "Governance, Explainability & Operational Trust",
    subtitle: "Critical for Enterprise Adoption",
    description: "Enterprises need visibility into system behavior, explainable outcomes, auditability, and clear failure handling with decision logs, versioned models, and human-in-the-loop workflows.",
    outputs: ["Decision logs", "Confidence escalation", "Rollback mechanisms", "HITL workflows"],
    color: "from-amber-500 to-amber-600"
  }
];

const capabilities = [
  {
    id: "image",
    title: "Image Recognition & Visual Understanding",
    subtitle: "Reliable Perception From Still Images",
    icon: ScanLine,
    description: "Image recognition in real environments is not just about identifying objects. It involves robust visual understanding under variability — viewpoint variation, lighting inconsistency, occlusion, clutter, and domain-specific visual patterns.",
    useCases: {
      "Manufacturing & Quality": ["Product classification", "Visual verification", "Packaging validation", "Label correctness checks"],
      "Healthcare": ["Medical image analysis", "Diagnostic image support", "Image-based triage systems"],
      "Retail & Logistics": ["Shelf monitoring", "Product recognition", "Damage detection"],
      "Research & R&D": ["Image-based pattern discovery", "Dataset-driven visual studies"]
    },
    designApproach: ["Domain-specific dataset curation", "Balanced class distributions", "Augmentation tuned to real conditions", "Model selection based on interpretability vs performance", "Confidence scoring per prediction"],
    timeline: { data: "2–3 weeks", development: "4–6 weeks", deployment: "2–3 weeks", total: "8–12 weeks" }
  },
  {
    id: "video",
    title: "Video Intelligence & Temporal Vision",
    subtitle: "Understanding Motion, Behavior & Events Over Time",
    icon: Video,
    description: "Video intelligence introduces temporal dependencies, camera movement, frame-to-frame noise, real-time constraints, and massive data volumes. Many systems fail because they treat video as independent frames.",
    useCases: {
      "Manufacturing & Industrial": ["Process monitoring", "Safety compliance detection", "Anomaly detection in operations"],
      "Smart Infrastructure": ["Traffic flow analysis", "Crowd behavior monitoring", "Incident detection"],
      "Retail & Facilities": ["Footfall analysis", "Queue detection", "Suspicious behavior alerts"]
    },
    designApproach: ["Frame sampling strategy", "Temporal window design", "Object tracking robustness", "Real-time vs batch processing", "Hardware acceleration (GPU / edge)"],
    timeline: { data: "2–3 weeks", development: "5–7 weeks", deployment: "2–3 weeks", total: "9–13 weeks" }
  },
  {
    id: "inspection",
    title: "Inspection AI & Defect Detection",
    subtitle: "Vision Systems for Precision, Consistency & Scale",
    icon: Microscope,
    description: "Inspection tasks fail when defects are rare, variations are subtle, 'normal' has wide variance, and false positives are costly. This requires precision-focused vision, not generic object detection.",
    useCases: {
      "Manufacturing": ["Surface defect detection", "Assembly verification", "Tolerance checking"],
      "Electronics": ["PCB inspection", "Component alignment verification"],
      "Infrastructure": ["Structural damage assessment", "Asset wear detection"]
    },
    designApproach: ["Defect detection with limited samples", "Anomaly detection approaches", "Fine-grained visual difference modeling", "Confidence-based decision thresholds", "Human-in-the-loop validation"],
    timeline: { data: "3–4 weeks", development: "5–7 weeks", deployment: "2–3 weeks", total: "10–14 weeks" }
  },
  {
    id: "ocr",
    title: "OCR & Document Vision",
    subtitle: "From Raw Documents to Structured, Usable Data",
    icon: FileText,
    description: "Real-world documents include scans, photos, noise, skew, blur, multiple layouts, handwritten content, and domain-specific terminology. Generic OCR breaks quickly in enterprise environments.",
    useCases: {
      "Finance & Insurance": ["Invoice processing", "Claims document extraction", "Compliance document review"],
      "Healthcare": ["Medical record digitization", "Lab report extraction"],
      "Legal & Enterprise Ops": ["Contract data extraction", "Policy document analysis"]
    },
    designApproach: ["Text extraction + layout understanding", "Structured data extraction", "Table and form parsing", "Field-level confidence scoring", "Domain-adapted OCR models"],
    timeline: { data: "2–3 weeks", development: "4–6 weeks", deployment: "2–3 weeks", total: "8–12 weeks" }
  }
];

const pricingTiers = [
  {
    tier: "Focused Vision Systems",
    subtitle: "Single Use Case",
    range: "$30,000 – $55,000",
    bestFor: ["Single use case", "Controlled environments", "Clear visual objectives"],
    examples: ["Image recognition for classification", "OCR for structured documents", "Basic inspection tasks"],
    includes: ["Data audit & strategy", "Model training & evaluation", "Deployment (edge or cloud)", "Confidence thresholds", "Monitoring setup"],
    timeline: "8–12 weeks",
    color: "bg-violet-500/20 text-violet-400"
  },
  {
    tier: "Production Vision Systems",
    subtitle: "Variable Environments",
    range: "$55,000 – $110,000",
    bestFor: ["Variable environments", "Real-time or near-real-time vision", "Operational impact"],
    examples: ["Video intelligence pipelines", "Industrial inspection AI", "Multi-camera systems"],
    includes: ["Advanced dataset strategy", "Bias & edge-case handling", "Performance optimization", "Drift monitoring", "Human-in-the-loop workflows"],
    timeline: "10–16 weeks",
    color: "bg-primary/20 text-primary"
  },
  {
    tier: "Enterprise / Research-Grade Platforms",
    subtitle: "High-Risk & Safety-Critical",
    range: "$110,000 – $220,000+",
    bestFor: ["High-risk decisions", "Safety-critical systems", "Large-scale deployment", "R&D-heavy initiatives"],
    examples: ["Medical imaging systems", "Autonomous inspection platforms", "City-scale video analytics", "Custom research vision systems"],
    includes: ["End-to-end vision architecture", "Extensive evaluation protocols", "Governance & auditability", "Continuous learning pipelines", "Edge + cloud optimization"],
    timeline: "14–24 weeks",
    color: "bg-cyan-500/20 text-cyan-400"
  }
];

const costDrivers = [
  { title: "Dataset size & diversity", description: "Volume and variation of training data" },
  { title: "Labeling complexity", description: "Expertise required for annotation" },
  { title: "Environmental variability", description: "Conditions the system must handle" },
  { title: "Accuracy vs recall trade-offs", description: "Precision requirements" },
  { title: "Edge deployment constraints", description: "Hardware limitations" },
  { title: "Regulatory / safety requirements", description: "Compliance needs" },
  { title: "Continuous retraining needs", description: "Ongoing adaptation" }
];

const roiExamples = [
  {
    title: "Inspection AI (Manufacturing)",
    before: ["Manual inspection", "Inconsistent quality", "High labor cost", "Missed micro-defects"],
    after: ["Continuous inspection", "Consistent standards", "Reduced rework", "Early defect detection"],
    impact: "Quality loss reduction: 20–40%",
    payback: "6–12 months"
  },
  {
    title: "OCR & Document Vision (Enterprise Ops)",
    before: ["Manual data entry", "Processing delays", "Human error"],
    after: ["Automated extraction", "Faster turnaround", "Higher accuracy"],
    impact: "Processing cost reduction: 50–70%",
    payback: "3–6 months"
  },
  {
    title: "Video Intelligence (Safety / Operations)",
    before: ["Manual monitoring", "Delayed incident response"],
    after: ["Real-time alerts", "Proactive intervention"],
    impact: "Risk exposure reduction (non-linear)",
    payback: "High strategic value"
  }
];

const typicalVsAGIX = [
  { typical: "Model-centric", agix: "System-centric" },
  { typical: "Static dataset", agix: "Evolving data strategy" },
  { typical: "Accuracy-only metrics", agix: "Risk-aware evaluation" },
  { typical: "One-time deployment", agix: "Continuous learning" },
  { typical: "Demo-driven", agix: "Production-driven" }
];

const buildVsBuy = [
  { option: "Off-the-shelf APIs", reality: "Break in real environments" },
  { option: "DIY research", reality: "High risk, slow" },
  { option: "Generic vendors", reality: "Demo-centric" },
  { option: "AGIX systems", reality: "Research-backed, production-safe", highlight: true }
];

const faqItems = [
  {
    question: "What is Computer Vision in enterprise and industrial use cases?",
    answer: "Computer Vision is the use of AI systems to interpret visual data (images or video) and convert it into structured, actionable information that can drive decisions, automation, or safety controls. In enterprise settings, it must operate reliably under uncontrolled, real-world conditions, not just lab environments."
  },
  {
    question: "Why do many Computer Vision projects fail after deployment?",
    answer: "Most failures occur because training data does not represent real environments, accuracy is measured only in controlled tests, edge cases are ignored, and systems are not monitored after deployment. Vision AI fails when treated as a one-time model, not a living system."
  },
  {
    question: "How is production-grade Computer Vision different from demos or APIs?",
    answer: "Production systems require robust data strategy, evaluation beyond accuracy, drift monitoring, fail-safe behavior, and continuous improvement pipelines. APIs and demos rarely account for these factors."
  },
  {
    question: "What industries benefit most from Computer Vision AI?",
    answer: "High-impact adoption occurs in manufacturing & industrial automation, healthcare & medical imaging, retail & logistics, smart infrastructure & cities, energy, utilities & inspection, and R&D-driven organizations. Any industry interacting with the physical world can benefit."
  },
  {
    question: "How accurate can Computer Vision systems realistically be?",
    answer: "Accuracy depends on data quality and diversity, environmental variability, and definition of failure vs success. In real deployments, consistent and explainable performance matters more than peak accuracy numbers. AGIX focuses on reliable accuracy under changing conditions."
  },
  {
    question: "What data is required to build a Computer Vision system?",
    answer: "Typically required: real-world images or video, representative edge cases, domain-specific labels, and metadata (lighting, camera type, environment). AGIX often begins with data feasibility audits before committing to models."
  },
  {
    question: "How long does it take to build a Computer Vision system?",
    answer: "Typical timelines: Focused vision systems: 8–12 weeks, Production systems: 10–16 weeks, Research-grade platforms: 14–24 weeks. Time is driven more by data and evaluation rigor than model training."
  },
  {
    question: "How much does a Computer Vision solution cost?",
    answer: "Indicative ranges: Focused systems: $30K–$55K, Production systems: $55K–$110K, Enterprise / research platforms: $110K–$220K+. Cost reflects risk, reliability, and system scope, not number of models."
  },
  {
    question: "Can Computer Vision run on edge devices?",
    answer: "Yes. AGIX designs systems for edge inference, hybrid edge + cloud, and latency-sensitive environments. Model selection and optimization are tailored to hardware constraints."
  },
  {
    question: "How do you handle bias and edge cases in vision systems?",
    answer: "AGIX addresses this through data diversity analysis, targeted data collection, hard-example mining, synthetic data (where appropriate), and continuous feedback loops. Bias control is treated as an engineering requirement, not a research afterthought."
  },
  {
    question: "How do Computer Vision systems handle uncertainty or low confidence?",
    answer: "Production systems must assign confidence scores, escalate uncertain cases, and avoid forced predictions. AGIX systems are designed to fail safely, not silently."
  },
  {
    question: "Is Computer Vision suitable for safety-critical or regulated environments?",
    answer: "Yes — when designed correctly. AGIX supports audit trails, explainable outcomes, human-in-the-loop workflows, versioned models, and compliance-aligned deployment. This is critical for healthcare, infrastructure, and industrial safety."
  },
  {
    question: "How do Computer Vision systems improve over time?",
    answer: "Through performance monitoring, drift detection, dataset expansion, scheduled retraining, and environment-aware tuning. Vision systems must evolve with the environment to remain reliable."
  },
  {
    question: "Can Computer Vision integrate with existing enterprise systems?",
    answer: "Yes. AGIX integrates vision outputs into ERP systems, manufacturing execution systems, safety platforms, analytics dashboards, and decision workflows. Vision is most valuable when it drives action, not just insight."
  },
  {
    question: "How do we know if our use case is feasible for Computer Vision?",
    answer: "A use case is viable if visual signals are meaningful, errors can be tolerated or managed, data can be collected reliably, and ROI outweighs complexity. AGIX conducts vision feasibility assessments before full builds."
  }
];

const readinessQuestions = [
  { id: "env-stability", question: "Environment stability", options: ["Controlled", "Semi-controlled", "Dynamic"], weight: 2 },
  { id: "data-available", question: "Data availability", options: ["High", "Medium", "Low"], weight: 2 },
  { id: "accuracy-req", question: "Accuracy requirement", options: ["Moderate", "High", "Critical"], weight: 1.5 },
  { id: "latency", question: "Latency constraints", options: ["Flexible", "Near real-time", "Real-time"], weight: 1 },
  { id: "error-consequence", question: "Consequence of errors", options: ["Low", "Moderate", "High"], weight: 2 }
];

function HeroLeadForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    organization: "",
    industry: "",
    useCase: "",
    timeline: ""
  });

  const leadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        source: "computer-vision-solutions",
        formType: "vision-readiness"
      });
    },
    onSuccess: () => {
      toast({
        title: "Feasibility review requested",
        description: "We'll evaluate your vision AI readiness and get back to you shortly."
      });
      trackEvent("lead_form_submit", {
        form_name: "computer_vision_hero",
        page: "/services/computer-vision"
      });
      setFormData({
        fullName: "",
        workEmail: "",
        organization: "",
        industry: "",
        useCase: "",
        timeline: ""
      });
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
    if (!formData.fullName || !formData.workEmail || !formData.organization || !formData.industry || !formData.useCase) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, organization, industry, and use case are required.",
        variant: "destructive"
      });
      return;
    }
    trackEvent("lead_form_start", {
      form_name: "computer_vision_hero",
      page: "/services/computer-vision"
    });
    leadMutation.mutate(formData);
  };

  return (
    <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Assess Your Computer Vision Readiness</CardTitle>
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
            <Label htmlFor="organization">Organization / Company *</Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="Your organization"
              data-testid="input-organization"
            />
          </div>
          <div className="space-y-2">
            <Label>Industry *</Label>
            <Select value={formData.industry} onValueChange={(v) => setFormData({ ...formData, industry: v })}>
              <SelectTrigger data-testid="select-industry">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((ind) => (
                  <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Primary Vision Use Case *</Label>
            <Select value={formData.useCase} onValueChange={(v) => setFormData({ ...formData, useCase: v })}>
              <SelectTrigger data-testid="select-usecase">
                <SelectValue placeholder="What do you need vision AI for?" />
              </SelectTrigger>
              <SelectContent>
                {useCaseOptions.map((uc) => (
                  <SelectItem key={uc.value} value={uc.value}>{uc.label}</SelectItem>
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
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" disabled={leadMutation.isPending} data-testid="button-submit-lead">
            {leadMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Request Vision AI Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We evaluate data quality, environmental variability, and deployment risk — before proposing models.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function VisionReadinessAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const score = useMemo(() => {
    let total = 0;
    let maxScore = 0;
    readinessQuestions.forEach((q) => {
      maxScore += q.weight * 2;
      const answer = answers[q.id];
      if (answer !== undefined) {
        total += q.weight * (2 - answer);
      }
    });
    return maxScore > 0 ? (total / maxScore) * 100 : 0;
  }, [answers]);

  const allAnswered = Object.keys(answers).length === readinessQuestions.length;

  const getResult = () => {
    if (score >= 70) return { status: "ready", message: "Vision-ready", recommendation: "Your use case is well-suited for Computer Vision implementation.", color: "text-green-400" };
    if (score >= 50) return { status: "pilot", message: "Pilot recommended", recommendation: "Start with a controlled pilot to validate feasibility.", color: "text-cyan-400" };
    if (score >= 30) return { status: "prep", message: "Data prep required", recommendation: "Focus on data collection and environment standardization first.", color: "text-amber-400" };
    return { status: "research", message: "High-risk (research-heavy)", recommendation: "This use case requires significant R&D investment.", color: "text-red-400" };
  };

  const result = getResult();

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Is Your Use Case Feasible With Vision AI?
        </CardTitle>
        <p className="text-sm text-muted-foreground">This tool prevents costly failures.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {readinessQuestions.map((q) => (
          <div key={q.id} className="space-y-3">
            <p className="font-medium">{q.question}</p>
            <div className="flex gap-2 flex-wrap">
              {q.options.map((option, optIndex) => (
                <Button
                  key={option}
                  variant={answers[q.id] === optIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAnswers({ ...answers, [q.id]: optIndex })}
                >
                  {option}
                </Button>
              ))}
            </div>
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
              {result.status === "pilot" && <Eye className="w-6 h-6 text-cyan-400" />}
              {result.status === "prep" && <AlertCircle className="w-6 h-6 text-amber-400" />}
              {result.status === "research" && <Microscope className="w-6 h-6 text-red-400" />}
              <span className={`text-lg font-semibold ${result.color}`}>{result.message}</span>
            </div>
            <p className="text-muted-foreground mb-4">{result.recommendation}</p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  result.status === "ready" ? "bg-green-500" : 
                  result.status === "pilot" ? "bg-cyan-500" : 
                  result.status === "prep" ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">Feasibility Score: {Math.round(score)}%</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function VisionROICalculator() {
  const [volume, setVolume] = useState([1000]);
  const [manualCost, setManualCost] = useState([50]);
  const [errorCost, setErrorCost] = useState([500]);
  const [accuracyGain, setAccuracyGain] = useState([30]);

  const calculations = useMemo(() => {
    const vol = volume[0];
    const manual = manualCost[0];
    const error = errorCost[0];
    const gain = accuracyGain[0] / 100;

    const annualManualCost = vol * manual * 12;
    const annualErrorReduction = vol * 0.05 * error * gain * 12;
    const totalAnnualSavings = annualManualCost * 0.6 + annualErrorReduction;
    const avgImplementationCost = 70000;
    const paybackMonths = Math.ceil((avgImplementationCost / totalAnnualSavings) * 12);

    return {
      annualManualCost: Math.round(annualManualCost),
      annualErrorReduction: Math.round(annualErrorReduction),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      paybackMonths: Math.min(Math.max(paybackMonths, 2), 36),
      roi: Math.round((totalAnnualSavings / avgImplementationCost) * 100)
    };
  }, [volume, manualCost, errorCost, accuracyGain]);

  return (
    <Card className="bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Vision Cost & ROI Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="flex justify-between mb-2">
              <span>Monthly processing volume</span>
              <span className="text-primary font-semibold">{volume[0].toLocaleString()} items</span>
            </Label>
            <Slider value={volume} onValueChange={setVolume} min={100} max={10000} step={100} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Current manual cost per item</span>
              <span className="text-primary font-semibold">${manualCost[0]}</span>
            </Label>
            <Slider value={manualCost} onValueChange={setManualCost} min={10} max={200} step={10} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Cost per error/defect missed</span>
              <span className="text-primary font-semibold">${errorCost[0]}</span>
            </Label>
            <Slider value={errorCost} onValueChange={setErrorCost} min={100} max={5000} step={100} />
          </div>
          <div>
            <Label className="flex justify-between mb-2">
              <span>Expected accuracy improvement</span>
              <span className="text-primary font-semibold">{accuracyGain[0]}%</span>
            </Label>
            <Slider value={accuracyGain} onValueChange={setAccuracyGain} min={10} max={50} step={5} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Current Manual Cost/Year</p>
            <p className="text-2xl font-bold text-muted-foreground">${calculations.annualManualCost.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Estimated Annual Savings</p>
            <p className="text-2xl font-bold text-green-400">${calculations.totalAnnualSavings.toLocaleString()}</p>
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

export default function ComputerVisionSolutionsPage() {
  const [activeCapability, setActiveCapability] = useState(capabilities[0].id);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        </div>

        {/* Animated grid pattern for futuristic feel */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
                <Eye className="w-3 h-3 mr-1" />
                Computer Vision Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                From Pixels to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Decisions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Production-Ready Computer Vision for High-Stakes, Real-World Environments
              </p>
              <p className="text-muted-foreground mb-6 max-w-xl">
                AGIX designs Computer Vision systems that go beyond demos — systems that operate reliably in uncontrolled environments, scale across edge and cloud, and improve over time through continuous learning.
              </p>
              <p className="text-primary font-medium mb-8">
                This is vision AI for industries where accuracy, reliability, and failure modes matter.
              </p>
              <div className="mb-4">
                <Button size="lg" className="w-full py-6 text-primary-foreground" asChild data-testid="button-cta-assessment">
                  <a href="#assessment">
                    Request a Vision AI Assessment
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
                <a href="#assessment" className="group flex items-start gap-3 p-3 rounded-lg border border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-violet-500/5 hover:from-violet-500/30 hover:to-violet-500/10 transition-all" data-testid="link-hero-vision-assessment">
                  <Gauge className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-violet-400 transition-colors">
                      Vision AI Readiness Assessment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Interactive tool (takes ~30 seconds) — evaluate your computer vision requirements
                    </p>
                  </div>
                </a>
                <a href="#capabilities" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 hover:from-cyan-500/30 hover:to-cyan-500/10 transition-all" data-testid="link-hero-vision-capabilities">
                  <Eye className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-cyan-400 transition-colors">
                      Explore Vision Capabilities
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Image recognition, video intelligence, inspection AI & OCR
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

      {/* Why CV Fails */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Computer Vision Fails Outside the Lab
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Most computer vision systems perform well in controlled demos and degrade rapidly in real-world conditions.
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
                  <CardTitle className="text-lg text-destructive">Real environments introduce:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {realWorldChallenges.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                        <item.icon className="w-5 h-5 text-destructive shrink-0" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background border-border">
                <CardHeader>
                  <CardTitle className="text-lg">The result:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">
                      Yet many vision systems are trained assuming <span className="text-foreground font-medium">static, clean inputs</span>.
                    </p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="font-medium text-destructive mb-2">The consequences:</p>
                    <ul className="space-y-1 text-sm">
                      <li>Accuracy decay</li>
                      <li>Silent failures</li>
                      <li>Loss of trust</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Pain */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Real Enterprise Pain With Vision AI
            </h2>
            <p className="text-muted-foreground">Across industries, AGIX consistently sees the same problems:</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {enterprisePains.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-border">
                  <CardContent className="py-4 flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                    <span className="text-sm">{pain}</span>
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
                  These are <span className="text-primary font-semibold">system design failures</span>, not model failures.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Better Models Don't Fix */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why "Better Models" Don't Fix Vision AI
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-destructive/5 border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">Most vendors focus on:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {vendorFocus.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span>{item.item}</span>
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
                  <CardTitle className="text-lg text-primary">Production vision requires:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {productionRequires.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-lg text-muted-foreground">
              Computer vision is a <span className="text-primary font-semibold">perception system problem</span>, not a model problem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AGIX Mindset */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Key Differentiator
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The AGIX Computer Vision Mindset
            </h2>
            <p className="text-muted-foreground">
              AGIX treats computer vision as a perception system that must:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {agixMindset.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border text-center">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">{item.number}</span>
                    </div>
                    <p className="text-sm">{item.text}</p>
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
              This mindset is what separates <span className="text-foreground font-medium">research prototypes</span> from <span className="text-primary font-semibold">industrial systems</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Layer Model */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
              We design vision systems across three layers:
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch mb-8">
            {threeLayerModel.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1"
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                      <layer.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{layer.layer}</h3>
                    <p className="text-sm text-muted-foreground">{layer.question}</p>
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
                  Most solutions stop at perception. <span className="text-primary font-semibold">AGIX designs all three layers end-to-end.</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 2025-2028 Trends */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Computer Vision Is a 2025–2028 Priority
            </h2>
            <p className="text-muted-foreground">Three irreversible trends are driving adoption:</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {trends2025.map((trend, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{trend.title}</h3>
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
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
            <p className="text-lg">
              By 2028: Computer Vision will be <span className="text-primary font-semibold">foundational infrastructure</span> — not experimental technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Includes */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What AGIX Means by "Computer Vision Solutions"
            </h2>
            <p className="text-muted-foreground">All delivered as research-backed, production-ready systems.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceIncludes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-border">
                  <CardContent className="py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LLM Authority Statement */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Eye className="w-10 h-10 text-violet-400 mx-auto mb-4" />
            <p className="text-xl font-medium text-foreground">
              Reliable computer vision systems are built on data strategy, evaluation rigor, and deployment discipline — not just models.
            </p>
          </motion.div>
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
            <Badge className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              The AGIX Vision Systems Framework
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A 6-Layer Approach to Reliable Computer Vision
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Computer Vision systems fail when data, evaluation, and deployment are treated as afterthoughts.
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

      {/* Capabilities Tabs */}
      <section id="capabilities" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Vision Capabilities & Real-World Use Cases
            </h2>
            <p className="text-muted-foreground">
              How Computer Vision Actually Works in Production Environments
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
                  {cap.title.split(" ")[0]}
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
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
                              <cap.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{cap.title}</h3>
                              <p className="text-sm text-muted-foreground">{cap.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-6 text-sm">{cap.description}</p>
                          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Timeline</p>
                            <div className="text-sm space-y-1">
                              <p>Data prep: <span className="font-medium">{cap.timeline.data}</span></p>
                              <p>Development: <span className="font-medium">{cap.timeline.development}</span></p>
                              <p>Deployment: <span className="font-medium">{cap.timeline.deployment}</span></p>
                              <p className="text-primary font-semibold">Total: {cap.timeline.total}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Use Cases by Industry</h4>
                          <div className="space-y-3">
                            {Object.entries(cap.useCases).map(([industry, cases], i) => (
                              <div key={i} className="p-3 bg-muted/30 rounded-lg">
                                <p className="text-sm font-medium mb-2 text-primary">{industry}</p>
                                <ul className="space-y-1">
                                  {(cases as string[]).map((c: string, j: number) => (
                                    <li key={j} className="text-xs text-muted-foreground flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">AGIX Design Approach</h4>
                          <ul className="space-y-2">
                            {cap.designApproach.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
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

      {/* Typical vs AGIX */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A Key Distinction
            </h2>
          </motion.div>

          <Card className="bg-background border-border">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm font-semibold text-destructive">Typical Vision Project</p>
                </div>
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm font-semibold text-primary">AGIX Vision System</p>
                </div>
                {typicalVsAGIX.map((row, index) => (
                  <>
                    <div key={`typical-${index}`} className="py-3 flex items-center justify-center gap-2 text-center">
                      <XCircle className="w-4 h-4 text-destructive shrink-0" />
                      <span className="text-sm text-muted-foreground">{row.typical}</span>
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
              Computer Vision Pricing Model
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX prices vision systems, not models or APIs. Pricing reflects risk, reliability, and long-term performance.
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
                <CardTitle>What Actually Drives Cost in Computer Vision (Critical)</CardTitle>
                <p className="text-sm text-muted-foreground">Vision AI cost is driven by data and reliability, not model type.</p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {costDrivers.map((driver, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-medium text-sm mb-1">{driver.title}</p>
                      <p className="text-xs text-muted-foreground">{driver.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center mt-6 text-primary font-medium">
                  AGIX prices failure risk, not features.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ROI Examples */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ROI: How Computer Vision Pays Back
            </h2>
            <p className="text-muted-foreground">
              Computer Vision ROI comes from scale, consistency, and speed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {roiExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">Before</p>
                      <ul className="text-sm space-y-1">
                        {example.before.map((item, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <XCircle className="w-3 h-3 text-destructive" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-2">After Vision AI</p>
                      <ul className="text-sm space-y-1">
                        {example.after.map((item, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm font-semibold text-primary mb-1">{example.impact}</p>
                      <p className="text-xs text-muted-foreground">Payback: {example.payback}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Vision AI Assessment Tools
            </h2>
            <p className="text-muted-foreground">
              Make an informed decision — before committing resources.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <VisionReadinessAssessment />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <VisionROICalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Build vs Buy */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build vs Buy vs Research
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {buildVsBuy.map((item, index) => (
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
                <Eye className="w-8 h-8 text-violet-400 mx-auto mb-4" />
                <p className="text-lg font-medium max-w-3xl mx-auto">
                  Computer Vision systems succeed in production when data strategy, evaluation rigor, and deployment discipline are prioritized over model complexity.
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
              Planning a High-Reliability Computer Vision System?
            </h2>
            <p className="text-sm text-primary mb-8">Research-led evaluation · realistic scope · clear risk & ROI</p>

            <Button size="lg" className="mb-6" asChild data-testid="button-final-cta">
              <a href="#assessment">
                Request a Computer Vision Feasibility Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                "Data quality review",
                "Risk analysis",
                "Cost estimation",
                "Go/no-go recommendation"
              ].map((item, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                  <CheckCircle2 className="w-3 h-3 mr-2" />
                  {item}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Authority Closing */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xl font-medium text-muted-foreground">
            Computer Vision delivers ROI only when reliability, evaluation rigor, and deployment discipline —
          </p>
          <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 text-transparent bg-clip-text">
            are treated as first-class requirements.
          </p>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
