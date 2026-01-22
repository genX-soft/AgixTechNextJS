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
  GraduationCap,
  Users,
  BookOpen,
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
  PlayCircle,
  UserCheck,
  FileText,
  BarChart3,
  Lightbulb,
  Award,
  HelpCircle,
  HeadphonesIcon,
  Layers,
  Settings,
  Database,
  LineChart,
  Shield,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";
import { trackEvent } from "@/lib/analytics";

const institutionTypes = [
  { id: "edtech", label: "EdTech Startup", icon: Lightbulb },
  { id: "coaching", label: "Coaching Institute", icon: Users },
  { id: "university", label: "University / College", icon: GraduationCap },
  { id: "corporate", label: "Corporate L&D", icon: Building2 },
];

const challenges = [
  { id: "doubts", label: "Student Doubts & Support" },
  { id: "engagement", label: "Low Engagement" },
  { id: "dropouts", label: "Dropouts & Churn" },
  { id: "personalization", label: "No Personalization" },
  { id: "assessment", label: "Assessment Overload" },
  { id: "discovery", label: "Content Discovery" },
];

const learningFormats = [
  { id: "live", label: "Live Classes" },
  { id: "recorded", label: "Recorded Courses" },
  { id: "hybrid", label: "Hybrid Model" },
];

const bottlenecks = [
  {
    id: "A",
    title: "Student Doubts, Questions & Support Overload",
    icon: HelpCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    symptoms: [
      "Slow doubt resolution time",
      "Learners stuck on basic concepts",
      "Drop in class participation",
      "Negative feedback about 'support'",
      "High mentor-to-student ratios",
    ],
    reality: [
      "Learners post doubts late at night",
      "Mentors respond hours or days later",
      "Same questions asked repeatedly",
      "Doubt queues keep growing",
      "Faculty burnout increases",
    ],
    whoFaces: "Online coaching, test-prep platforms, skill-based EdTech, universities with large cohorts",
    whyExists: "Human mentors cannot scale linearly with learner growth. Support demand grows faster than teaching capacity.",
    solution: {
      name: "AI Tutor & Doubt-Solving Agent",
      description: "24/7 Learning Support",
      whatItDoes: [
        "Answers learner doubts instantly",
        "Concept explanations & step-by-step problem solving",
        "Uses course content, lecture notes, faculty-approved material",
        "Escalates only edge cases and academic integrity concerns",
      ],
      aiType: "Conversational AI + RAG + Context-aware reasoning",
      techStack: "GPT-4/Claude, Pinecone/Weaviate, LMS APIs, Python/Node.js",
      timeline: "3-5 weeks",
      costSmall: "$3K - $6K",
      costLarge: "$6K - $10K",
      impact: "70-80% reduction in repetitive doubt load",
    },
  },
  {
    id: "B",
    title: "Low Engagement & Passive Learning",
    icon: PlayCircle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    symptoms: [
      "Low completion rates",
      "High video drop-off",
      "Poor quiz participation",
      "Minimal discussion activity",
    ],
    reality: [
      "Videos watched but not understood",
      "Learners skip sessions silently",
      "No interaction during lessons",
      "Learners 'log in' but don't learn",
    ],
    whoFaces: "Recorded course platforms, hybrid learning models, corporate L&D programs",
    whyExists: "Content delivery ≠ learning engagement. Learning requires interaction, feedback, and reinforcement — not just videos.",
    solution: {
      name: "AI Learning Engagement Assistant",
      description: "Active Learning Companion",
      whatItDoes: [
        "Monitors learner behavior and drop-off points",
        "Intervenes with clarifying prompts and practice suggestions",
        "Short quizzes at strategic moments",
        "Encourages participation during live and recorded sessions",
      ],
      aiType: "Behavioral analytics + Conversational nudges + ML hybrid logic",
      techStack: "GPT-4, Event tracking, n8n/Make automation",
      timeline: "4-6 weeks",
      costSmall: "$5K - $9K",
      costLarge: "$5K - $9K",
      impact: "Higher completion rates, improved attention span",
    },
  },
  {
    id: "C",
    title: "Dropouts, Churn & Silent Disengagement",
    icon: TrendingUp,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    symptoms: [
      "High churn after first month",
      "Low course completion",
      "Poor renewal rates",
      "Lost lifetime value",
    ],
    reality: [
      "Learners stop logging in",
      "Refund requests increase",
      "Subscriptions cancel quietly",
      "No early warning signs",
    ],
    whoFaces: "Subscription-based EdTech, long-term coaching programs, corporate training platforms",
    whyExists: "Most platforms react after dropout, instead of predicting disengagement early.",
    solution: {
      name: "Dropout Prediction & Intervention Engine",
      description: "Proactive Retention System",
      whatItDoes: [
        "Analyzes attendance, engagement trends, assessment scores",
        "Predicts dropout risk early",
        "Triggers personalized support messages",
        "Alerts mentors for intervention",
      ],
      aiType: "Predictive analytics + Machine learning risk models",
      techStack: "Python, scikit-learn/TensorFlow, PostgreSQL, Event streaming",
      timeline: "5-7 weeks",
      costSmall: "$7K - $12K",
      costLarge: "$7K - $12K",
      impact: "Reduced churn, improved learner retention, better LTV",
    },
  },
  {
    id: "D",
    title: "No Personalization at Scale",
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    symptoms: [
      "Wide performance gaps",
      "Learner frustration",
      "Inconsistent outcomes",
      "High support dependency",
    ],
    reality: [
      "Same content for all learners",
      "Fast learners feel bored",
      "Slow learners feel lost",
      "No adaptive pathways",
    ],
    whoFaces: "Large EdTech platforms, universities, multi-course academies",
    whyExists: "Manual personalization doesn't scale beyond small batches.",
    solution: {
      name: "Personalized Learning Path Engine",
      description: "Adaptive Learning System",
      whatItDoes: [
        "Builds adaptive learning paths based on performance and pace",
        "Recommends lessons, practice material, revision schedules",
        "Adjusts difficulty in real-time",
        "Creates learner profiles for targeted support",
      ],
      aiType: "Recommendation systems + Learner profiling ML",
      techStack: "Python, collaborative filtering, content embeddings",
      timeline: "6-8 weeks",
      costSmall: "$8K - $15K",
      costLarge: "$8K - $15K",
      impact: "Reduced frustration, better mastery, consistent outcomes",
    },
  },
  {
    id: "E",
    title: "Assessment, Evaluation & Feedback Load",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    symptoms: [
      "Slow result turnaround",
      "Learners unsure how to improve",
      "Faculty time consumed by evaluation",
      "Reduced teaching quality",
    ],
    reality: [
      "Manual grading",
      "Delayed feedback",
      "Generic comments",
      "Overloaded faculty",
    ],
    whoFaces: "Universities & colleges, certification programs, corporate assessments",
    whyExists: "Evaluation is repetitive but still handled manually.",
    solution: {
      name: "AI Assessment & Feedback Engine",
      description: "Automated Evaluation System",
      whatItDoes: [
        "Automates objective assessments and first-level grading",
        "Generates personalized feedback and improvement suggestions",
        "Flags plagiarism and anomalies",
        "Maintains consistent rubric application",
      ],
      aiType: "NLP + Rubric-based evaluation + ML classification",
      techStack: "GPT-4, spaCy, custom rubric models",
      timeline: "4-6 weeks",
      costSmall: "$6K - $10K",
      costLarge: "$6K - $10K",
      impact: "Faster feedback, reduced faculty workload, clear guidance",
    },
  },
  {
    id: "F",
    title: "Content Discovery & Navigation Confusion",
    icon: Search,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    symptoms: [
      "'Where do I start?' questions",
      "Repeated navigation queries",
      "Low usage of existing content",
    ],
    reality: [
      "Learners can't find the right lesson",
      "Poor search inside LMS",
      "Large course libraries feel overwhelming",
    ],
    whoFaces: "Multi-course platforms, universities, corporate learning portals",
    whyExists: "Traditional LMS search is keyword-based, not intent-based.",
    solution: {
      name: "AI Course & Content Discovery Assistant",
      description: "Intent-Based Learning Navigator",
      whatItDoes: [
        "Helps learners find the right lesson instantly",
        "Navigates large content libraries intelligently",
        "Answers 'What should I study next?'",
        "Understands prerequisites and learning goals",
      ],
      aiType: "RAG + Intent understanding + Content embeddings",
      techStack: "LLMs, vector search, LMS integration",
      timeline: "3-4 weeks",
      costSmall: "$4K - $7K",
      costLarge: "$4K - $7K",
      impact: "Higher content utilization, reduced confusion, faster progress",
    },
  },
  {
    id: "G",
    title: "Academic Operations & Admin Overhead",
    icon: Settings,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    symptoms: [
      "Admin teams overwhelmed",
      "Errors in records",
      "Learner complaints",
      "Delayed certifications",
    ],
    reality: [
      "Manual enrollments",
      "Certificate delays",
      "Attendance tracking chaos",
      "Progress reporting overhead",
    ],
    whoFaces: "Universities, coaching institutes, certification bodies",
    whyExists: "Ops workflows scale with learners unless automated.",
    solution: {
      name: "AI Academic Operations Assistant",
      description: "Automated Admin Workflow",
      whatItDoes: [
        "Automates enrollment workflows",
        "Attendance tracking and verification",
        "Certificate issuance and validation",
        "Progress reporting and analytics",
      ],
      aiType: "Workflow automation + Document generation + Analytics",
      techStack: "n8n, document APIs, PostgreSQL, dashboards",
      timeline: "5-7 weeks",
      costSmall: "$6K - $12K",
      costLarge: "$6K - $12K",
      impact: "Reduced admin errors, faster certifications, efficiency gains",
    },
  },
  {
    id: "H",
    title: "Corporate Learning ROI & Outcome Visibility",
    icon: BarChart3,
    color: "text-primary",
    bgColor: "bg-primary/10",
    symptoms: [
      "Low L&D buy-in",
      "Budget justification issues",
      "Poor adoption",
    ],
    reality: [
      "No clarity on skill improvement",
      "Training impact unclear",
      "Managers don't see results",
    ],
    whoFaces: "Corporate L&D teams, enterprise training platforms",
    whyExists: "Learning outcomes aren't translated into business metrics.",
    solution: {
      name: "Learning Analytics & Outcome Intelligence Dashboard",
      description: "Business Impact Measurement",
      whatItDoes: [
        "Tracks skill improvement and engagement trends",
        "Completion metrics and competency mapping",
        "Translates learning into business impact and ROI indicators",
        "Executive dashboards for stakeholder visibility",
      ],
      aiType: "Analytics + ML insights + Visualization",
      techStack: "Python, BI tools, data pipelines, custom dashboards",
      timeline: "6-8 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$10K - $18K",
      impact: "Justifiable L&D spend, better adoption, clear outcomes",
    },
  },
];

const faqs = [
  {
    question: "Will AI replace teachers or mentors?",
    answer: "No. AGIX designs AI to support educators, not replace them. AI handles repetitive doubts, basic explanations, and admin load — educators focus on teaching, mentoring, and higher-order thinking.",
  },
  {
    question: "Is AI accurate for academic doubt-solving?",
    answer: "Yes — because answers are generated only from your approved course content, notes, and faculty-validated material using RAG. No open-ended hallucinations.",
  },
  {
    question: "Can this work with our existing LMS?",
    answer: "Yes. We integrate with Moodle, Canvas, Blackboard, custom LMS platforms, and internal learning portals.",
  },
  {
    question: "How do you ensure academic integrity?",
    answer: "We implement content-restricted answers, plagiarism & anomaly checks, confidence thresholds, and faculty override & audit logs. AI assistance is transparent and controlled.",
  },
  {
    question: "Is this suitable for live classes, recorded courses, or hybrid models?",
    answer: "Yes. AI systems adapt to live, recorded, and hybrid learning environments seamlessly.",
  },
  {
    question: "What about student data privacy and compliance?",
    answer: "Data access is role-based, purpose-limited, and logged for auditability. We follow institution-defined privacy and compliance policies.",
  },
  {
    question: "How long before we see results?",
    answer: "Most institutions see measurable impact within 4-8 weeks, including faster doubt resolution, improved engagement, and early dropout reduction signals.",
  },
  {
    question: "Can we start small with one course or cohort?",
    answer: "Absolutely. Many institutions start with one course, one cohort, or one AI system — then expand gradually based on results.",
  },
  {
    question: "What if faculty resist AI adoption?",
    answer: "We design AI as an assistant, not an authority. Faculty remain in control, and AI adoption is gradual and opt-in.",
  },
  {
    question: "Does AI work across different subjects and disciplines?",
    answer: "Yes — STEM, humanities, test-prep, skills training, and corporate learning — as long as structured content is available.",
  },
  {
    question: "How do you measure learning improvement?",
    answer: "Through engagement trends, completion rates, assessment performance, dropout reduction, and skill outcome metrics (for L&D).",
  },
  {
    question: "What are the ongoing costs after implementation?",
    answer: "Ongoing costs include AI usage, cloud infrastructure, and monitoring & optimization. These are predictable, transparent, and scalable.",
  },
  {
    question: "Will students know they are interacting with AI?",
    answer: "Yes. Transparency is important. AI is clearly positioned as a learning assistant, not a human replacement.",
  },
  {
    question: "Is this suitable for multilingual or international learners?",
    answer: "Yes. AI systems can support multiple languages, regional content, and localized explanations.",
  },
  {
    question: "What role does AGIX play after launch?",
    answer: "AGIX works as a long-term AI systems partner, providing monitoring & improvement, model tuning, expansion planning, and ongoing support.",
  },
];

const costTable = [
  { type: "Coaching / Small EdTech", scope: "≤2k learners", typical: "AI Tutor + Engagement", range: "$3K - $7K" },
  { type: "Growing EdTech", scope: "2k-10k learners", typical: "Tutor + Dropout AI", range: "$7K - $15K" },
  { type: "University / Large Platform", scope: "10k+ learners", typical: "Personalization + Ops", range: "$15K - $35K" },
  { type: "Corporate L&D (Enterprise)", scope: "Enterprise", typical: "Analytics + ROI AI", range: "$20K - $45K" },
];

const roiMetrics = [
  { metric: "Doubt resolution time", improvement: "-70%" },
  { metric: "Learner engagement", improvement: "+20-40%" },
  { metric: "Completion rate", improvement: "+10-25%" },
  { metric: "Dropout reduction", improvement: "-15-30%" },
  { metric: "Faculty workload", improvement: "-30-50%" },
];

function EdTechSolutionFinder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    institution: "",
    challenge: "",
    learners: 1000,
    format: "",
    hasLMS: "",
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

    if (inputs.challenge === "doubts") {
      system = "AI Tutor & Doubt-Solving Agent";
      why = "High doubt volume is overwhelming your support capacity. AI handles 70-80% of repetitive questions instantly.";
      timeline = "3-5 weeks";
      cost = inputs.learners <= 2000 ? "$3K - $6K" : "$6K - $10K";
      nextPhase = "AI Engagement Assistant";
    } else if (inputs.challenge === "engagement") {
      system = "AI Learning Engagement Assistant";
      why = "Passive learning is hurting completion. AI intervenes at drop-off points with prompts and practice.";
      timeline = "4-6 weeks";
      cost = "$5K - $9K";
      nextPhase = "Dropout Prediction Engine";
    } else if (inputs.challenge === "dropouts") {
      system = "Dropout Prediction & Intervention Engine";
      why = "Silent disengagement is costing revenue. AI predicts risk early and triggers intervention.";
      timeline = "5-7 weeks";
      cost = "$7K - $12K";
      nextPhase = "Personalized Learning Paths";
    } else if (inputs.challenge === "personalization") {
      system = "Personalized Learning Path Engine";
      why = "One-size-fits-all isn't working. AI creates adaptive paths based on performance and pace.";
      timeline = "6-8 weeks";
      cost = "$8K - $15K";
      nextPhase = "Learning Analytics Dashboard";
    } else if (inputs.challenge === "assessment") {
      system = "AI Assessment & Feedback Engine";
      why = "Manual grading is consuming faculty time. AI automates evaluation with personalized feedback.";
      timeline = "4-6 weeks";
      cost = "$6K - $10K";
      nextPhase = "AI Tutor Integration";
    } else if (inputs.challenge === "discovery") {
      system = "AI Course & Content Discovery Assistant";
      why = "Learners can't find what they need. AI provides intent-based navigation and recommendations.";
      timeline = "3-4 weeks";
      cost = "$4K - $7K";
      nextPhase = "Personalized Learning Paths";
    } else {
      system = "AI Tutor & Engagement Assistant";
      why = "Start with the highest-ROI combination: doubt support and engagement improvement.";
      timeline = "5-7 weeks";
      cost = "$7K - $12K";
      nextPhase = "Dropout Prediction";
    }

    setResult({ system, why, timeline, cost, nextPhase });
    setStep(5);
  };

  return (
    <Card id="solution-finder">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Find My EdTech AI Solution
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Takes ~30 seconds. Get a personalized recommendation.
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
              <Label className="text-base font-medium">What type of institution are you?</Label>
              <div className="grid grid-cols-2 gap-2">
                {institutionTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={inputs.institution === type.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, institution: type.id });
                      setStep(2);
                    }}
                    className="justify-start h-auto py-3"
                    data-testid={`button-finder-institution-${type.id}`}
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
                How many learners do you have? ({inputs.learners.toLocaleString()})
              </Label>
              <Slider
                value={[inputs.learners]}
                onValueChange={(val) => setInputs({ ...inputs, learners: val[0] })}
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
                <Button onClick={() => setStep(4)} data-testid="button-finder-next-learners">
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
              <Label className="text-base font-medium">What's your learning format?</Label>
              <div className="grid grid-cols-3 gap-2">
                {learningFormats.map((f) => (
                  <Button
                    key={f.id}
                    variant={inputs.format === f.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, format: f.id });
                      generateRecommendation();
                    }}
                    className="h-auto py-3"
                    data-testid={`button-finder-format-${f.id}`}
                  >
                    {f.label}
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
                  <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
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
                    setInputs({ institution: "", challenge: "", learners: 1000, format: "", hasLMS: "" });
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

function EdTechLeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    institutionType: "",
    challenge: "",
    learners: "",
    deliveryMode: "",
    email: "",
    country: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.institutionType || !formData.challenge) {
      toast({
        title: "Please fill in required fields",
        description: "Email, institution type, and challenge are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const result = await submitLead(
      {
        name: "",
        email: formData.email,
        industry: "edtech",
        companySize: formData.learners,
        challenges: [formData.challenge],
        message: `Institution Type: ${formData.institutionType}, Delivery Mode: ${formData.deliveryMode}, Country: ${formData.country}`,
      },
      {
        formType: "edtech-roadmap",
        source: "/industries/edtech",
        ctaId: "edtech-form-submit",
        ctaText: "Get My AI Recommendation",
        ctaLocation: "/industries/edtech",
        additionalMetadata: {
          institutionType: formData.institutionType,
          deliveryMode: formData.deliveryMode,
          country: formData.country,
        },
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Request received",
        description: "We'll review your needs and get back to you shortly."
      });
      trackEvent("lead_form_submit", {
        event_category: "edtech_industry",
        event_label: "lead_form"
      });
      setFormData({ institutionType: "", challenge: "", learners: "", deliveryMode: "", email: "", country: "" });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="lead-form" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-primary/5 to-cyan-500/5 border-primary/20">
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-4 bg-primary/10 text-primary border-primary/20">
                <Award className="w-3 h-3 mr-1" />
                Get Your Personalized Roadmap
              </Badge>
              <CardTitle className="text-2xl md:text-3xl">
                Get Your EdTech AI Roadmap
              </CardTitle>
              <p className="text-muted-foreground">
                Designed for Your Learners, Faculty & Outcomes
              </p>
            </CardHeader>
            <CardContent className="max-w-xl mx-auto space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Institution Type *</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      value={formData.institutionType}
                      onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                      data-testid="select-institution-type"
                    >
                      <option value="">Select type</option>
                      <option value="edtech">EdTech Startup</option>
                      <option value="coaching">Coaching Institute</option>
                      <option value="university">University / College</option>
                      <option value="corporate">Corporate L&D</option>
                      <option value="course-creator">Course Creator</option>
                    </select>
                  </div>
                  <div>
                    <Label>Primary Challenge *</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      data-testid="select-challenge"
                    >
                      <option value="">Select challenge</option>
                      <option value="doubts">Student Doubts</option>
                      <option value="engagement">Low Engagement</option>
                      <option value="dropouts">Dropouts & Churn</option>
                      <option value="personalization">Personalization</option>
                      <option value="assessment">Assessment Load</option>
                      <option value="ops">Operations</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Learners</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      value={formData.learners}
                      onChange={(e) => setFormData({ ...formData, learners: e.target.value })}
                      data-testid="select-learners"
                    >
                      <option value="">Select range</option>
                      <option value="small">Less than 1,000</option>
                      <option value="medium">1,000 - 5,000</option>
                      <option value="large">5,000 - 20,000</option>
                      <option value="enterprise">20,000+</option>
                    </select>
                  </div>
                  <div>
                    <Label>Delivery Mode</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      value={formData.deliveryMode}
                      onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}
                      data-testid="select-delivery"
                    >
                      <option value="">Select mode</option>
                      <option value="live">Live Classes</option>
                      <option value="recorded">Recorded Courses</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Work Email *</Label>
                  <Input
                    type="email"
                    placeholder="you@institution.com"
                    className="mt-1.5"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    placeholder="Your country"
                    className="mt-1.5"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    data-testid="input-country"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting} data-testid="button-submit-lead">
                  {isSubmitting ? "Submitting..." : "Get My AI Recommendation"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
              <p className="text-xs text-center text-muted-foreground">
                No pressure. We suggest what fits your learning model — not generic tools.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function DropoutCalculator() {
  const [learners, setLearners] = useState(1000);
  const [courseFee, setCourseFee] = useState(300);
  const [dropoutRate, setDropoutRate] = useState(18);
  const [showResult, setShowResult] = useState(false);

  const lostLearners = Math.round(learners * (dropoutRate / 100));
  const lostRevenue = lostLearners * courseFee;
  const recoverableMin = Math.round(lostRevenue * 0.25);
  const recoverableMax = Math.round(lostRevenue * 0.40);

  return (
    <Card id="leakage-calculator" className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-500" />
          Dropout Revenue Leakage Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how much revenue you're losing to learner disengagement
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Number of Enrolled Learners: {learners.toLocaleString()}</Label>
            <Slider
              value={[learners]}
              onValueChange={(val) => setLearners(val[0])}
              min={100}
              max={20000}
              step={100}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Average Course/Program Fee: ${courseFee}</Label>
            <Slider
              value={[courseFee]}
              onValueChange={(val) => setCourseFee(val[0])}
              min={50}
              max={5000}
              step={50}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Monthly Dropout Rate: {dropoutRate}%</Label>
            <Slider
              value={[dropoutRate]}
              onValueChange={(val) => setDropoutRate(val[0])}
              min={5}
              max={40}
              step={1}
              className="mt-2"
            />
          </div>
        </div>

        <Button
          onClick={() => setShowResult(true)}
          className="w-full"
          data-testid="button-calculate-dropout"
        >
          Calculate Revenue Leakage
        </Button>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-destructive/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Learners Lost</p>
                  <p className="text-2xl font-bold text-destructive">{lostLearners.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Revenue Leakage</p>
                  <p className="text-2xl font-bold text-destructive">${lostRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Recoverable with AI Intervention</p>
                <p className="text-xl font-bold text-green-600">
                  ${recoverableMin.toLocaleString()} - ${recoverableMax.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on 15-30% early intervention effectiveness
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">Recommended AI Systems:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI Tutor & Doubt Solver</li>
                  <li>• Dropout Prediction Engine</li>
                  <li>• Engagement Assistant</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function AIReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const questions = [
    { id: "engagement", text: "Do you track learner engagement data?" },
    { id: "content", text: "Is course content structured and tagged?" },
    { id: "assessments", text: "Are assessments digitized?" },
    { id: "dropouts", text: "Do you monitor dropouts actively?" },
    { id: "data", text: "Is learner data centralized?" },
  ];

  const score = Object.values(answers).filter(Boolean).length * 20;

  const getRecommendation = () => {
    if (score >= 80) return { level: "High", start: "Full AI Suite", avoid: "None - ready for advanced systems" };
    if (score >= 60) return { level: "Moderate", start: "AI Tutor + Engagement Assistant", avoid: "Advanced Personalization (build data first)" };
    if (score >= 40) return { level: "Developing", start: "AI Tutor (basic)", avoid: "Predictive systems until data matures" };
    return { level: "Early", start: "Data infrastructure first", avoid: "All advanced AI systems" };
  };

  const recommendation = getRecommendation();

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          AI Readiness Score for Education
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Check if your institution is ready for AI implementation
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
                <Badge className="mt-2">{recommendation.level} Readiness</Badge>
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

export default function EdTechIndustryPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-cyan-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <GraduationCap className="w-3 h-3 mr-1" />
                EdTech & E-Learning AI Solutions
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                AI Solutions for EdTech That Show You Where Learners{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  Disengage
                </span>{" "}
                — and How to Fix It
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                From EdTech startups and coaching institutes to universities and corporate L&D teams,
                AGIX builds AI systems that scale doubt-solving, personalize learning, and reduce learner dropouts — with measurable outcomes.
              </p>

              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  The Reality of Education Today
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Learners stop engaging quietly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Doubts pile up faster than teachers can respond
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Same content doesn't work for everyone
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Dropouts hurt revenue and outcomes
                  </li>
                </ul>
                <p className="text-sm font-medium mt-3 text-primary border-t border-border pt-3">
                  Education doesn't fail because of content. It fails because attention, support, and personalization don't scale.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Embedded Solution Finder in Hero */}
              <EdTechSolutionFinder />

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
                    <p className="font-medium text-sm">Dropout Calculator</p>
                    <p className="text-xs text-muted-foreground">Revenue loss</p>
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
              { icon: HelpCircle, title: "Identify Why Learners Disengage", description: "Pinpoint exact dropout triggers", color: "text-destructive", bg: "bg-destructive/10" },
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

      {/* Who This Is For */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI for the Entire{" "}
              <span className="text-primary">Education Ecosystem</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you teach 100 learners or 100,000, the challenges are similar — only the scale changes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Lightbulb, title: "EdTech Startups", desc: "Scale support without scaling headcount" },
              { icon: Users, title: "Coaching Institutes", desc: "24/7 doubt resolution for students" },
              { icon: BookOpen, title: "Course Creators", desc: "Improve completion and engagement" },
              { icon: GraduationCap, title: "Universities & Colleges", desc: "Support large cohorts efficiently" },
              { icon: Building2, title: "Corporate L&D", desc: "Measure learning ROI clearly" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover-elevate">
                  <CardContent className="pt-6 text-center">
                    <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Education Leaders Expect */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What Education Leaders Expect from AI</h2>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <h4 className="font-medium text-destructive mb-2">They DON'T want:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI replacing teachers</li>
                    <li>• Black-box answers</li>
                    <li>• Generic chatbots</li>
                    <li>• Over-engineered LMS features</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-green-600 mb-2">They EXPECT AI to:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Support learners instantly</li>
                    <li>• Reduce mentor workload</li>
                    <li>• Personalize learning paths</li>
                    <li>• Improve completion & outcomes</li>
                    <li>• Integrate with existing LMS</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-primary/5 to-cyan-500/5">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">AGIX EdTech Expertise</h3>
                  <p className="text-muted-foreground mb-4">
                    AGIX is an AI-first systems engineering company focused on practical AI for education:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "AI tutors & doubt-solving agents",
                      "Personalized learning path engines",
                      "Dropout prediction & intervention AI",
                      "AI assessment & feedback systems",
                      "Course discovery & learning assistants",
                      "Learning analytics & outcome intelligence",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-primary mt-4">
                    We don't start with tools. We start with learner behavior and system bottlenecks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bottleneck Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">EdTech Bottleneck Map</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Learner Engagement, Outcomes & Revenue{" "}
              <span className="text-destructive">Quietly Break</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Education doesn't fail loudly. It fails silently — when learners disengage, doubts remain unanswered,
              progress stalls, and dropouts happen without warning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {bottlenecks.map((bottleneck, i) => (
              <motion.div
                key={bottleneck.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${bottleneck.bgColor} rounded-lg`}>
                        <bottleneck.icon className={`w-5 h-5 ${bottleneck.color}`} />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-1">
                          Category {bottleneck.id}
                        </Badge>
                        <CardTitle className="text-lg">{bottleneck.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Common Symptoms:</p>
                      <div className="flex flex-wrap gap-1">
                        {bottleneck.symptoms.slice(0, 3).map((s, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">Who faces this:</p>
                      <p>{bottleneck.whoFaces}</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">
                        AI Solution: {bottleneck.solution.name}
                      </p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{bottleneck.solution.timeline}</span>
                        <span>{bottleneck.solution.costSmall}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Role-Based Shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl border border-primary/20"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Role-Based Starting Points</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { role: "EdTech Startup", path: "A → B → C → D", focus: "Doubts → Engagement → Retention → Personalization" },
                { role: "Coaching Institute", path: "A → B → E", focus: "Doubts → Engagement → Assessment" },
                { role: "University / College", path: "A → D → E → G", focus: "Doubts → Personalization → Assessment → Ops" },
                { role: "Corporate L&D", path: "B → C → H", focus: "Engagement → Retention → ROI Analytics" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-background/80 rounded-lg">
                  <p className="font-medium text-sm mb-1">{item.role}</p>
                  <p className="text-primary font-mono text-sm mb-2">{item.path}</p>
                  <p className="text-xs text-muted-foreground">{item.focus}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Systems Detailed */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">AI Systems & Execution</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Each Learning Bottleneck Is Solved with{" "}
              <span className="text-primary">Real, Deployable AI</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              For every bottleneck, we define the AI system, how it works day-to-day, timeline, and cost range.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {bottlenecks.map((b) => (
              <AccordionItem key={b.id} value={b.id} className="bg-background rounded-lg border">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${b.bgColor} rounded-lg`}>
                      <b.icon className={`w-4 h-4 ${b.color}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{b.solution.name}</p>
                      <p className="text-sm text-muted-foreground">{b.solution.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">What This System Does:</h4>
                        <ul className="space-y-1">
                          {b.solution.whatItDoes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Type of AI:</h4>
                        <p className="text-sm text-muted-foreground">{b.solution.aiType}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Tech Stack:</h4>
                        <p className="text-sm text-muted-foreground">{b.solution.techStack}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="pt-4 text-center">
                            <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">Timeline</p>
                            <p className="font-semibold">{b.solution.timeline}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-4 text-center">
                            <DollarSign className="w-5 h-5 text-green-500 mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground">Cost Range</p>
                            <p className="font-semibold">{b.solution.costSmall}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-medium mb-1">Educational Impact:</h4>
                        <p className="text-sm text-muted-foreground">{b.solution.impact}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section id="leakage-calculator" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Decision Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Your{" "}
              <span className="text-primary">AI Opportunity</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use these tools to self-diagnose first — and talk to AGIX only when things make sense.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <DropoutCalculator />
            <div id="readiness-quiz">
              <AIReadinessScore />
            </div>
          </div>
        </div>
      </section>

      {/* Cost Transparency */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4">Transparent EdTech AI Pricing</h2>
            <p className="text-muted-foreground">
              EdTech AI cost is driven by learning scale, interaction depth, and intelligence complexity — not buzzwords.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-medium">Institution Type</th>
                  <th className="text-left py-4 px-4 font-medium">Scale</th>
                  <th className="text-left py-4 px-4 font-medium">Typical Scope</th>
                  <th className="text-left py-4 px-4 font-medium">Cost Range</th>
                </tr>
              </thead>
              <tbody>
                {costTable.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">{row.type}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.scope}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.typical}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-primary border-primary">
                        {row.range}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            These are engineering-backed ranges, not sales placeholders.
          </p>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Trust, Safety & Academic Integrity</h2>
              <p className="text-muted-foreground mb-6">
                How AGIX builds responsible EdTech AI:
              </p>
              <div className="space-y-3">
                {[
                  { icon: Shield, text: "AI responses limited to approved content" },
                  { icon: CheckCircle2, text: "No hallucinated answers" },
                  { icon: Users, text: "Faculty override always available" },
                  { icon: FileText, text: "Academic integrity safeguards" },
                  { icon: Layers, text: "Gradual rollout (pilot → scale)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-primary font-medium mt-6">
                AI should strengthen trust in education — not weaken it.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-xl">
              <div className="text-center mb-6">
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold">The Future of Education</h3>
              </div>
              <p className="text-muted-foreground text-center">
                The future of education isn't automated teaching. It's <span className="text-foreground font-medium">supported learning</span> —
                where every learner gets timely help, and every educator gets breathing space to teach well.
              </p>
            </div>
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
            <Badge className="mb-4">FAQs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              EdTech AI Questions,{" "}
              <span className="text-primary">Answered</span>
            </h2>
            <p className="text-muted-foreground">
              Clear answers before you commit.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background rounded-lg border px-6"
              >
                <AccordionTrigger className="hover:no-underline text-left">
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

      {/* Lead Form */}
      <EdTechLeadForm />

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Learning Outcomes?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            AGIX Technologies is an AI-first systems engineering company focused on building responsible,
            outcome-driven AI solutions for education. We don't chase trends. We design systems that respect learning, educators, and long-term impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="button-final-roadmap">
              <a href="#lead-form">
                Get My EdTech AI Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-final-finder">
              <a href="#solution-finder">
                Re-Run the AI Solution Finder
              </a>
            </Button>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
