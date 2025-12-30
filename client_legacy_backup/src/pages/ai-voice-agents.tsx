import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { 
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Mic,
  Volume2,
  MessageSquare,
  Brain,
  Zap,
  Clock,
  Users,
  Globe,
  Calendar,
  Headphones,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Play,
  Target,
  BarChart3,
  Layers,
  Settings,
  Lock,
  Activity,
  Building2,
  Stethoscope,
  Home,
  Wallet,
  ShoppingCart,
  Truck,
  Hotel,
  Briefcase,
  Factory,
  ChevronRight,
  Sparkles,
  Database,
  Server,
  Network,
  Eye,
  RotateCcw,
  Download,
  Calculator,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const useCases = [
  { value: "inbound", label: "Inbound calls" },
  { value: "outbound", label: "Outbound calls" },
  { value: "appointment", label: "Appointment booking" },
  { value: "call-center", label: "Call center automation" },
  { value: "multilingual", label: "Multilingual support" },
];

const businessProblems = [
  {
    icon: PhoneIncoming,
    problem: "Missed Calls = Lost Revenue",
    description: "Every unanswered call is a lost opportunity.",
    solution: "Inbound AI Voice Agents answer instantly, qualify intent, and route or resolve calls automatically."
  },
  {
    icon: Calendar,
    problem: "Appointment No-Shows & Scheduling Chaos",
    description: "Manual booking leads to errors, delays, and drop-offs.",
    solution: "AI Appointment Booking Agents schedule, reschedule, confirm, and remind — without human involvement."
  },
  {
    icon: DollarSign,
    problem: "Expensive Call Centers",
    description: "Human agents are costly and inconsistent.",
    solution: "AI Call Center Agents handle high-volume, repetitive calls while escalating only complex cases."
  },
  {
    icon: Globe,
    problem: "Limited Language Coverage",
    description: "Global customers expect native-language support.",
    solution: "Multilingual AI Voice Agents support multiple languages without hiring multilingual staff."
  },
  {
    icon: Users,
    problem: "Inconsistent Customer Experience",
    description: "Agent quality varies by shift and individual.",
    solution: "AI agents deliver consistent, policy-compliant conversations every time."
  }
];

const capabilities = [
  "Inbound customer calls",
  "Outbound sales & follow-ups",
  "Appointment booking & reminders",
  "Customer support & FAQs",
  "Lead qualification",
  "Payment reminders",
  "Surveys & feedback collection"
];

const industries = [
  { icon: Stethoscope, name: "Healthcare & Clinics" },
  { icon: Home, name: "Real Estate" },
  { icon: Shield, name: "Insurance" },
  { icon: Wallet, name: "Banking & FinTech" },
  { icon: ShoppingCart, name: "E-commerce & Retail" },
  { icon: Truck, name: "Logistics" },
  { icon: Hotel, name: "Hospitality" },
  { icon: Briefcase, name: "Local Service Businesses" },
  { icon: Factory, name: "Enterprises & Shared Services" }
];

const comparisonData = [
  { traditional: "IVR menus", ai: "Natural conversation" },
  { traditional: "Fixed scripts", ai: "Dynamic responses" },
  { traditional: "Long wait times", ai: "Instant answer" },
  { traditional: "High staffing cost", ai: "24/7 availability" },
  { traditional: "Limited scalability", ai: "Infinite concurrency" },
  { traditional: "Manual data entry", ai: "Automated system updates" }
];

const voiceCapabilities = [
  {
    id: "inbound",
    title: "Inbound AI Voice Agents",
    subtitle: "Never Miss a Call — Even at Peak Volume",
    icon: PhoneIncoming,
    description: "AI-powered phone agents that answer incoming calls instantly, understand caller intent, handle conversations naturally, and either resolve requests or route calls intelligently.",
    keywords: ["AI inbound calling", "AI phone answering service", "AI voice receptionist"],
    problems: [
      "Missed calls during peak hours",
      "Long IVR menus causing drop-offs",
      "High cost of front-desk or call center staff",
      "Limited after-hours availability"
    ],
    useCases: [
      "Customer support call answering",
      "Sales inquiry handling",
      "Service request intake",
      "Call routing based on intent",
      "Emergency or priority call detection"
    ],
    howItWorks: [
      "Speech-to-text in real time",
      "Intent detection via LLMs",
      "Contextual conversation memory",
      "Policy-driven responses",
      "Seamless handoff to humans when needed"
    ],
    timeline: "4–6 weeks",
    pricing: { min: 8000, max: 15000, enterprise: "15,000 – $30,000+" }
  },
  {
    id: "outbound",
    title: "Outbound AI Calling Agents",
    subtitle: "Automated Calls That Actually Convert",
    icon: PhoneOutgoing,
    description: "Outbound AI Voice Agents autonomously place calls, hold conversations, qualify prospects, follow scripts dynamically, and log outcomes — without human agents.",
    keywords: ["AI outbound calling", "AI cold calling software", "AI follow-up calls"],
    problems: [
      "Low call throughput",
      "Human fatigue & inconsistency",
      "Expensive sales teams",
      "Poor follow-up discipline",
      "Missed re-engagement opportunities"
    ],
    useCases: [
      "Lead qualification calls",
      "Follow-up calls after form submissions",
      "Payment reminders",
      "Renewal & retention outreach",
      "Survey and feedback calls"
    ],
    howItWorks: [
      "Dynamic conversation paths",
      "Objection handling",
      "Real-time qualification scoring",
      "CRM updates after each call",
      "Compliance-aware call logic"
    ],
    timeline: "5–7 weeks",
    pricing: { min: 10000, max: 18000, enterprise: "18,000 – $35,000+" }
  },
  {
    id: "appointment",
    title: "AI Appointment Booking Agents",
    subtitle: "Book, Reschedule & Confirm — Automatically",
    icon: Calendar,
    description: "AI Appointment Booking Voice Agents handle end-to-end scheduling conversations, sync with calendars, send confirmations, and reduce no-shows.",
    keywords: ["AI appointment booking", "AI scheduling voice agent", "Automated appointment calls"],
    problems: [
      "Manual scheduling errors",
      "High no-show rates",
      "Staff time wasted on calls",
      "Inconsistent booking experience"
    ],
    useCases: [
      "Clinics & healthcare appointments",
      "Real estate viewings",
      "Service bookings",
      "Consultations & demos",
      "Rescheduling & reminders"
    ],
    howItWorks: [
      "Calendar API integrations",
      "Availability logic",
      "Time-zone handling",
      "Confirmation & reminder automation",
      "Fallback to human scheduling"
    ],
    timeline: "4–6 weeks",
    pricing: { min: 7000, max: 12000, enterprise: "12,000 – $25,000+" }
  },
  {
    id: "call-center",
    title: "AI Call Center Agents",
    subtitle: "Scale Call Centers Without Scaling Headcount",
    icon: Headphones,
    description: "AI Call Center Voice Agents handle high-volume, repetitive calls, resolve common issues, and escalate only complex cases to human agents.",
    keywords: ["AI call center software", "Voice AI for customer support", "Automated call center AI"],
    problems: [
      "High agent attrition",
      "Rising call center costs",
      "Inconsistent support quality",
      "Long wait times"
    ],
    useCases: [
      "Tier-1 customer support",
      "Order status inquiries",
      "Policy explanations",
      "Account verification",
      "Service troubleshooting"
    ],
    howItWorks: [
      "Multi-agent voice orchestration",
      "Knowledge base integration",
      "Call recording & analytics",
      "Quality monitoring",
      "Escalation logic"
    ],
    timeline: "7–10 weeks",
    pricing: { min: 20000, max: 40000, enterprise: "40,000 – $80,000+" }
  },
  {
    id: "multilingual",
    title: "Multilingual AI Voice Agents",
    subtitle: "Native Conversations, Global Scale",
    icon: Globe,
    description: "Multilingual AI Voice Agents support conversations across languages, accents, and regions — without hiring multilingual teams.",
    keywords: ["Multilingual AI voice agent", "AI voice bot multiple languages", "Global call center AI"],
    problems: [
      "High cost of multilingual agents",
      "Inconsistent translation quality",
      "Limited global coverage"
    ],
    useCases: [
      "International customer support",
      "Global sales outreach",
      "Regional service centers",
      "Cross-border operations"
    ],
    howItWorks: [
      "Language detection",
      "Native speech synthesis",
      "Accent handling",
      "Cultural response tuning",
      "Language-specific compliance"
    ],
    timeline: "3–5 weeks per language",
    pricing: { min: 3000, max: 7000, enterprise: "per additional language" }
  }
];

const voiceEngineLayers = [
  {
    number: 1,
    title: "Voice Use-Case Discovery & Call Flow Intelligence",
    subtitle: "Where Most Voice AI Projects Go Wrong — We Start Here",
    icon: Target,
    color: "from-orange-500 to-red-500",
    whatWeAnalyze: [
      "Inbound vs outbound call mix",
      "Call volume patterns (peak / off-peak)",
      "Call intent distribution",
      "Escalation frequency",
      "Compliance constraints"
    ],
    whatWeDesign: [
      "Conversation objectives",
      "Success criteria per call type",
      "Human fallback logic",
      "Automation boundaries"
    ],
    outputs: ["Voice Use-Case Map", "Call Flow Blueprints", "Automation vs Human Split"]
  },
  {
    number: 2,
    title: "Conversational Intelligence Architecture",
    subtitle: "This Is the Brain of the Voice Agent",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    whatWeAnalyze: [
      "Intent classification logic",
      "Context memory design",
      "Conversation state management",
      "Objection handling trees",
      "Policy & compliance rules"
    ],
    whatWeDesign: [
      "Adaptive conversation systems",
      "Dynamic response generation",
      "Context-aware interactions"
    ],
    outputs: ["AGIX does not rely on static scripts.", "We design adaptive conversation systems."]
  },
  {
    number: 3,
    title: "Speech & Language Intelligence",
    subtitle: "Voice That Sounds Human, Not Robotic",
    icon: Volume2,
    color: "from-cyan-500 to-blue-500",
    whatWeAnalyze: [
      "Real-time speech-to-text",
      "Natural language understanding",
      "Emotion & intent cues",
      "Human-like voice synthesis",
      "Accent & pacing control"
    ],
    whatWeDesign: [
      "Trust & call duration optimization",
      "Conversion improvement",
      "User comfort enhancement"
    ],
    outputs: ["Calm", "Confident", "Context-aware", "Industry-appropriate"]
  },
  {
    number: 4,
    title: "Action & System Orchestration",
    subtitle: "Voice That Actually Does Things",
    icon: Settings,
    color: "from-green-500 to-emerald-500",
    whatWeAnalyze: [
      "CRM updates",
      "Appointment booking",
      "Ticket creation",
      "Payment triggers",
      "Workflow automation",
      "Follow-up scheduling"
    ],
    whatWeDesign: [
      "End-to-end action flows",
      "System integration pipelines",
      "Real-time data sync"
    ],
    outputs: ["Voice → System → Action"]
  },
  {
    number: 5,
    title: "Call Analytics, Learning & Optimization",
    subtitle: "Voice AI That Improves Over Time",
    icon: BarChart3,
    color: "from-yellow-500 to-orange-500",
    whatWeAnalyze: [
      "Call success rate",
      "Drop-off points",
      "Average call duration",
      "Escalation frequency",
      "Conversion & booking rates"
    ],
    whatWeDesign: [
      "Prompt tuning",
      "Intent refinement",
      "Objection handling updates",
      "Voice pacing adjustments"
    ],
    outputs: ["Before vs After Metrics", "Weekly Improvement Counters"]
  },
  {
    number: 6,
    title: "Security, Compliance & Governance",
    subtitle: "Non-Negotiable for Enterprise Voice AI",
    icon: Lock,
    color: "from-red-500 to-pink-500",
    whatWeAnalyze: [
      "Call recording policies",
      "Data masking",
      "Role-based access",
      "Audit logs",
      "Consent handling"
    ],
    whatWeDesign: [
      "Healthcare (HIPAA-aligned)",
      "Finance & insurance",
      "Enterprise IT environments"
    ],
    outputs: ["Voice AI without governance is a liability.", "AGIX builds trust-first voice systems."]
  },
  {
    number: 7,
    title: "Scale, Load & Enterprise Readiness",
    subtitle: "Voice AI That Handles 1 Call or 1 Million Calls",
    icon: Server,
    color: "from-indigo-500 to-purple-500",
    whatWeAnalyze: [
      "Concurrent call handling",
      "Failover strategies",
      "Load balancing",
      "Multi-region deployment",
      "Redundancy planning"
    ],
    whatWeDesign: [
      "Call centers",
      "High-volume sales",
      "Customer support environments"
    ],
    outputs: ["Enterprise-grade scalability"]
  }
];

const technologyStack = [
  {
    icon: Mic,
    title: "Speech Recognition (Speech-to-Text)",
    description: "Converting live phone audio into structured text in real time.",
    capabilities: ["Low-latency transcription", "Accent handling", "Noise robustness", "Multi-language support"]
  },
  {
    icon: Volume2,
    title: "Voice Synthesis (Text-to-Speech)",
    description: "Generating natural, human-like voice responses.",
    capabilities: ["Natural prosody", "Emotional neutrality or warmth", "Industry-appropriate tone", "Multi-voice & multi-accent support"]
  },
  {
    icon: Brain,
    title: "Conversational Intelligence (LLMs)",
    description: "Powering intent understanding, dynamic responses, and policy-aware conversations.",
    capabilities: ["Prompt orchestration", "Context windows with memory control", "Guardrails for compliance", "Deterministic behavior where required"]
  },
  {
    icon: Database,
    title: "Knowledge & Context Layer",
    description: "Ensuring accurate answers using retrieval-augmented generation.",
    capabilities: ["Internal FAQs", "SOPs & Policies", "Product data", "CRM context"]
  },
  {
    icon: Phone,
    title: "Telephony & Call Infrastructure",
    description: "Managing inbound/outbound calls with enterprise-grade reliability.",
    capabilities: ["High concurrency", "Multi-region support", "Call logging", "SLA-grade uptime"]
  },
  {
    icon: Network,
    title: "Workflow & System Integration",
    description: "Turning voice into action across your business systems.",
    capabilities: ["CRM updates", "Appointment bookings", "Ticket creation", "Follow-up workflows"]
  }
];

const pricingTiers = [
  {
    name: "Starter Voice Agent",
    subtitle: "Single Use Case",
    price: "$8,000 – $15,000",
    bestFor: ["Inbound answering", "Appointment booking", "Basic qualification"],
    color: "border-border"
  },
  {
    name: "Business Voice Agent",
    subtitle: "Multiple Use Cases",
    price: "$15,000 – $35,000",
    bestFor: ["Inbound + outbound", "CRM integration", "Multi-flow conversations"],
    color: "border-primary",
    popular: true
  },
  {
    name: "Call Center / Enterprise",
    subtitle: "High Volume",
    price: "$35,000 – $80,000+",
    bestFor: ["High-volume environments", "Multiple departments", "Knowledge-driven support", "Analytics & QA layers"],
    color: "border-border"
  }
];

const faqItems = [
  {
    question: "What is an AI voice agent?",
    answer: "An AI voice agent is an artificial intelligence system that can answer and place phone calls, understand spoken language, respond naturally, and perform actions such as booking appointments or updating systems."
  },
  {
    question: "Are AI voice agents the same as IVR systems?",
    answer: "No. IVR systems rely on menus and fixed rules. AI voice agents use conversational AI to hold natural, free-flowing conversations."
  },
  {
    question: "How accurate are AI voice agents in real calls?",
    answer: "Well-designed AI voice agents typically achieve 90–95% intent accuracy for defined use cases and improve with continuous learning."
  },
  {
    question: "Can AI voice agents handle complex conversations?",
    answer: "Yes, within defined boundaries. AGIX designs human-fallback logic for edge cases and compliance-sensitive situations."
  },
  {
    question: "Can AI voice agents work 24/7?",
    answer: "Yes. AI voice agents operate continuously without fatigue, delays, or shift limitations."
  },
  {
    question: "Do customers know they are talking to AI?",
    answer: "This depends on compliance and business preference. AGIX supports transparent disclosure or hybrid approaches where required."
  },
  {
    question: "Can AI voice agents book appointments automatically?",
    answer: "Yes. AI voice agents can check availability, book, reschedule, confirm, and send reminders."
  },
  {
    question: "Are AI voice agents secure?",
    answer: "AGIX implements access controls, call recording governance, data masking, and audit trails. Security is built into the system, not added later."
  },
  {
    question: "Can AI voice agents integrate with CRM and internal tools?",
    answer: "Yes. Integration is a core capability, not an add-on."
  },
  {
    question: "Can AI voice agents support multiple languages?",
    answer: "Yes. Multilingual voice agents can support multiple languages with native-quality speech."
  },
  {
    question: "How long does it take to deploy an AI voice agent?",
    answer: "Most deployments take 4–10 weeks, depending on complexity and integrations."
  },
  {
    question: "Are AI voice agents legal and compliant?",
    answer: "Yes, when designed correctly. AGIX builds voice agents aligned with regulatory and industry requirements."
  },
  {
    question: "What businesses benefit most from AI voice agents?",
    answer: "Businesses with high call volumes, appointment-based operations, sales or support teams, and multilingual customers."
  },
  {
    question: "Will AI voice agents replace human agents?",
    answer: "AI voice agents reduce repetitive workload and allow human agents to focus on complex or sensitive interactions."
  }
];

function VoiceWaveAnimation() {
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary to-cyan-400 rounded-full"
          animate={{
            height: [16, 32 + Math.random() * 32, 16],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useState(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  });
  
  return (
    <span className="tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

function ROICalculator() {
  const [activeTab, setActiveTab] = useState("development");
  
  // Development cost inputs
  const [useCase, setUseCase] = useState("inbound");
  const [callFlows, setCallFlows] = useState([5]);
  const [integrations, setIntegrations] = useState("1");
  const [compliance, setCompliance] = useState("standard");
  const [languages, setLanguages] = useState("1");
  
  // Monthly cost inputs
  const [monthlyCallVolume, setMonthlyCallVolume] = useState([5000]);
  const [avgCallDuration, setAvgCallDuration] = useState("3-5");
  const [callType, setCallType] = useState("inbound");
  const [activeLanguages, setActiveLanguages] = useState("1");
  
  // ROI inputs
  const [agentCost, setAgentCost] = useState("3000");
  const [agentsReplaced, setAgentsReplaced] = useState([3]);
  const [automationPercent, setAutomationPercent] = useState([60]);
  const [missedCallLoss, setMissedCallLoss] = useState("2000");

  const developmentCost = useMemo(() => {
    let base = 8000;
    base += (callFlows[0] - 1) * 1200;
    base += integrations === "1" ? 2000 : integrations === "2-3" ? 5000 : integrations === "4+" ? 8000 : 0;
    base += compliance === "regulated" ? 5000 : 0;
    base += languages === "2-3" ? 8000 : languages === "4+" ? 16000 : 0;
    
    const minCost = Math.round(base * 0.9);
    const maxCost = Math.round(base * 1.3);
    const weeks = Math.ceil(base / 3500);
    
    return { min: minCost, max: maxCost, weeks: Math.max(4, Math.min(weeks, 12)) };
  }, [callFlows, integrations, compliance, languages]);

  const monthlyCost = useMemo(() => {
    const volume = monthlyCallVolume[0];
    const duration = avgCallDuration === "1-2" ? 1.5 : avgCallDuration === "3-5" ? 4 : 8;
    const totalMinutes = volume * duration;
    
    const telephony = totalMinutes * 0.025;
    const aiProcessing = totalMinutes * 0.05;
    const infrastructure = volume > 10000 ? 1200 : volume > 5000 ? 800 : 500;
    
    return {
      telephony: Math.round(telephony),
      aiProcessing: Math.round(aiProcessing),
      infrastructure,
      total: Math.round(telephony + aiProcessing + infrastructure)
    };
  }, [monthlyCallVolume, avgCallDuration]);

  const roiCalculation = useMemo(() => {
    const humanCost = parseInt(agentCost) * agentsReplaced[0];
    const aiCost = monthlyCost.total;
    const savings = humanCost - aiCost;
    const paybackMonths = developmentCost.min / savings;
    const annualROI = ((savings * 12) / developmentCost.min) * 100;
    
    return {
      humanCost,
      aiCost,
      savings: Math.max(0, savings),
      paybackMonths: isFinite(paybackMonths) && paybackMonths > 0 ? paybackMonths : 0,
      annualROI: isFinite(annualROI) && annualROI > 0 ? annualROI : 0
    };
  }, [agentCost, agentsReplaced, monthlyCost, developmentCost]);

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Calculator className="w-7 h-7 text-primary" />
          AI Voice Agent Cost & ROI Calculator
        </CardTitle>
        <p className="text-muted-foreground">
          Understand development cost, monthly running cost & business ROI
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="development" data-testid="tab-development-cost">
              Development Cost
            </TabsTrigger>
            <TabsTrigger value="monthly" data-testid="tab-monthly-cost">
              Monthly Cost
            </TabsTrigger>
            <TabsTrigger value="roi" data-testid="tab-roi">
              ROI Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="development" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Primary Use Case</Label>
                  <Select value={useCase} onValueChange={setUseCase}>
                    <SelectTrigger data-testid="select-use-case">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound Call Handling</SelectItem>
                      <SelectItem value="outbound">Outbound Calling</SelectItem>
                      <SelectItem value="appointment">Appointment Booking</SelectItem>
                      <SelectItem value="call-center">Call Center Automation</SelectItem>
                      <SelectItem value="multilingual">Multilingual Voice Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Number of Call Flows: {callFlows[0]}</Label>
                  <Slider
                    value={callFlows}
                    onValueChange={setCallFlows}
                    min={1}
                    max={15}
                    step={1}
                    className="mt-2"
                    data-testid="slider-call-flows"
                  />
                </div>

                <div>
                  <Label>CRM / System Integrations</Label>
                  <Select value={integrations} onValueChange={setIntegrations}>
                    <SelectTrigger data-testid="select-integrations">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="1">1 Integration</SelectItem>
                      <SelectItem value="2-3">2–3 Integrations</SelectItem>
                      <SelectItem value="4+">4+ Integrations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Compliance Requirement</Label>
                  <Select value={compliance} onValueChange={setCompliance}>
                    <SelectTrigger data-testid="select-compliance">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="regulated">Regulated (Healthcare / Finance)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Languages Required</Label>
                  <Select value={languages} onValueChange={setLanguages}>
                    <SelectTrigger data-testid="select-languages">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Default)</SelectItem>
                      <SelectItem value="2-3">2–3 Languages</SelectItem>
                      <SelectItem value="4+">4+ Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-lg">Estimated Development Cost</h4>
                <motion.div
                  key={developmentCost.min}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-primary"
                >
                  ${developmentCost.min.toLocaleString()} – ${developmentCost.max.toLocaleString()}
                </motion.div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-2">Estimated Timeline</h4>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xl font-medium">{developmentCost.weeks} – {developmentCost.weeks + 2} weeks</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="w-4 h-4" />
                    <span>Estimates vary based on specific requirements</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Monthly Call Volume: {monthlyCallVolume[0].toLocaleString()} calls</Label>
                  <Slider
                    value={monthlyCallVolume}
                    onValueChange={setMonthlyCallVolume}
                    min={100}
                    max={100000}
                    step={100}
                    className="mt-2"
                    data-testid="slider-call-volume"
                  />
                </div>

                <div>
                  <Label>Average Call Duration</Label>
                  <Select value={avgCallDuration} onValueChange={setAvgCallDuration}>
                    <SelectTrigger data-testid="select-call-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1–2 minutes</SelectItem>
                      <SelectItem value="3-5">3–5 minutes</SelectItem>
                      <SelectItem value="6-10">6–10 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Call Type</Label>
                  <Select value={callType} onValueChange={setCallType}>
                    <SelectTrigger data-testid="select-call-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Languages Active</Label>
                  <Select value={activeLanguages} onValueChange={setActiveLanguages}>
                    <SelectTrigger data-testid="select-active-languages">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Language</SelectItem>
                      <SelectItem value="2-3">2–3 Languages</SelectItem>
                      <SelectItem value="4+">4+ Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-lg">Estimated Monthly Cost</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Telephony</span>
                    <span className="font-medium">${monthlyCost.telephony.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">AI Processing (STT + LLM + TTS)</span>
                    <span className="font-medium">${monthlyCost.aiProcessing.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Infrastructure & Monitoring</span>
                    <span className="font-medium">${monthlyCost.infrastructure.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <motion.span
                      key={monthlyCost.total}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-primary"
                    >
                      ${monthlyCost.total.toLocaleString()}/mo
                    </motion.span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <HelpCircle className="w-4 h-4" />
                    <span>Costs vary based on call complexity and usage</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Human Agent Cost per Month ($)</Label>
                  <Input
                    type="number"
                    value={agentCost}
                    onChange={(e) => setAgentCost(e.target.value)}
                    placeholder="3000"
                    data-testid="input-agent-cost"
                  />
                </div>

                <div>
                  <Label>Number of Agents Replaced or Assisted: {agentsReplaced[0]}</Label>
                  <Slider
                    value={agentsReplaced}
                    onValueChange={setAgentsReplaced}
                    min={1}
                    max={50}
                    step={1}
                    className="mt-2"
                    data-testid="slider-agents-replaced"
                  />
                </div>

                <div>
                  <Label>Calls Automated: {automationPercent[0]}%</Label>
                  <Slider
                    value={automationPercent}
                    onValueChange={setAutomationPercent}
                    min={10}
                    max={90}
                    step={5}
                    className="mt-2"
                    data-testid="slider-automation-percent"
                  />
                </div>

                <div>
                  <Label>Missed Call Revenue Loss ($/month) - Optional</Label>
                  <Input
                    type="number"
                    value={missedCallLoss}
                    onChange={(e) => setMissedCallLoss(e.target.value)}
                    placeholder="2000"
                    data-testid="input-missed-call-loss"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-lg p-6 space-y-4 border border-primary/20">
                <h4 className="font-semibold text-lg">ROI Analysis</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Before AI (Human Cost)</span>
                    <span className="font-medium text-red-400">${roiCalculation.humanCost.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">After AI (System Cost)</span>
                    <span className="font-medium text-green-400">${roiCalculation.aiCost.toLocaleString()}/mo</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Monthly Savings</span>
                      <motion.span
                        key={roiCalculation.savings}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-green-400"
                      >
                        ${roiCalculation.savings.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Payback Period</div>
                    <div className="text-xl font-bold text-primary">
                      {roiCalculation.paybackMonths.toFixed(1)} months
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Annual ROI</div>
                    <div className="text-xl font-bold text-primary">
                      {roiCalculation.annualROI.toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground italic">
                    AI Voice Agents typically recover their development cost within 1–3 months for high-call-volume businesses.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want a precise cost & ROI breakdown for your business?
          </p>
          <Button size="lg" asChild>
            <a href="/schedule-consultation" data-testid="button-calculator-consultation">
              Get a Custom Voice Agent Cost Breakdown
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AIVoiceAgents() {
  const [selectedCapability, setSelectedCapability] = useState(voiceCapabilities[0]);
  const [activeLayer, setActiveLayer] = useState(0);
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: ""
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("cta_click", { event_category: "voice_demo_request", event_label: demoFormData.useCase });
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F1D] via-[#1E2A4F] to-background pt-24 pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,106,0,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,188,212,0.15),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                <Phone className="w-3 h-3 mr-1" />
                AI Voice Technology
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                AI Voice Agents That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  Talk, Think & Take Action
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-4">
                Inbound. Outbound. Multilingual. Enterprise-Ready.
              </p>
              
              <p className="text-gray-400 mb-8 max-w-xl">
                AGIX builds AI Voice Agents that handle real phone conversations — answering calls, booking appointments, qualifying leads, resolving support queries, and executing workflows automatically.
              </p>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-8">
                <p className="text-gray-300 text-sm">
                  <span className="text-primary font-semibold">These are not IVRs or basic voice bots.</span>{" "}
                  They are intelligent, conversational voice systems designed to operate like trained human agents.
                </p>
              </div>

              <VoiceWaveAnimation />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-2 mt-6"
              >
                <a href="#calculator" className="group flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-gradient-to-r from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-all" data-testid="link-hero-voice-calculator">
                  <Calculator className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                      Voice AI Cost & ROI Calculator
                    </p>
                    <p className="text-xs text-gray-400">
                      Interactive tool (takes ~30 seconds) — estimate development, monthly costs & savings
                    </p>
                  </div>
                </a>
                <a href="#capabilities" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 hover:from-cyan-500/30 hover:to-cyan-500/10 transition-all" data-testid="link-hero-voice-capabilities">
                  <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                      Explore Voice Agent Capabilities
                    </p>
                    <p className="text-xs text-gray-400">
                      Inbound, outbound, appointment, call center & multilingual solutions
                    </p>
                  </div>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24 z-10 self-start"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    Request a Live Voice Agent Demo
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    See how AI voice agents handle real customer calls in your industry.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Name</Label>
                      <Input
                        value={demoFormData.name}
                        onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="Your name"
                        data-testid="input-demo-name"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Work Email</Label>
                      <Input
                        type="email"
                        value={demoFormData.email}
                        onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="you@company.com"
                        data-testid="input-demo-email"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Company / Industry</Label>
                      <Input
                        value={demoFormData.company}
                        onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="Your company"
                        data-testid="input-demo-company"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Primary Use Case</Label>
                      <Select
                        value={demoFormData.useCase}
                        onValueChange={(value) => setDemoFormData({ ...demoFormData, useCase: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white" data-testid="select-demo-use-case">
                          <SelectValue placeholder="Select use case" />
                        </SelectTrigger>
                        <SelectContent>
                          {useCases.map((uc) => (
                            <SelectItem key={uc.value} value={uc.value}>
                              {uc.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" size="lg" data-testid="button-schedule-demo">
                      Schedule Voice Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why AI Voice Agents Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why AI Voice Agents Are a{" "}
              <span className="text-primary">Business Priority</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Search demand for AI voice agents, AI calling solutions, AI call center software, and AI appointment booking systems has exploded — not because voice is new, but because human-based calling no longer scales.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="pt-6">
                <XCircle className="w-8 h-8 text-red-400 mb-3" />
                <h4 className="font-semibold mb-2">Missed inbound calls</h4>
                <p className="text-sm text-muted-foreground">Every unanswered call is lost revenue</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="pt-6">
                <Clock className="w-8 h-8 text-red-400 mb-3" />
                <h4 className="font-semibold mb-2">Long wait times</h4>
                <p className="text-sm text-muted-foreground">Customers hang up before connecting</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="pt-6">
                <DollarSign className="w-8 h-8 text-red-400 mb-3" />
                <h4 className="font-semibold mb-2">High call center costs</h4>
                <p className="text-sm text-muted-foreground">Rising labor costs hurt margins</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-red-400 mb-3" />
                <h4 className="font-semibold mb-2">Inconsistent agent quality</h4>
                <p className="text-sm text-muted-foreground">Service varies by shift and person</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="pt-6">
                <Clock className="w-8 h-8 text-red-400 mb-3" />
                <h4 className="font-semibold mb-2">Limited after-hours availability</h4>
                <p className="text-sm text-muted-foreground">Customers expect 24/7 support</p>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="pt-6">
                <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="font-semibold mb-2">Customers still prefer calling</h4>
                <p className="text-sm text-muted-foreground">For urgent, complex, or high-value interactions</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg font-medium text-primary">
              This creates a critical execution gap that AI Voice Agents solve.
            </p>
          </div>
        </div>
      </section>

      {/* What AI Voice Agents Mean */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What AI Voice Agents Mean at{" "}
                <span className="text-primary">AGIX</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                AI Voice Agents are AI-powered systems that can:
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Answer and place phone calls",
                  "Understand spoken language in real time",
                  "Respond naturally with human-like speech",
                  "Ask follow-up questions",
                  "Make decisions during conversations",
                  "Trigger actions across business systems"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-lg mb-4">AGIX voice agents combine:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Mic, label: "Speech-to-text" },
                      { icon: Brain, label: "Large Language Models" },
                      { icon: Database, label: "Conversation Memory" },
                      { icon: Settings, label: "Business Logic" },
                      { icon: Network, label: "System Integrations" },
                      { icon: Zap, label: "End-to-end Automation" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground italic">
                    ...to deliver end-to-end voice automation, not just scripted conversations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Traditional Call Handling vs{" "}
              <span className="text-primary">AI Voice Agents</span>
            </h2>
          </motion.div>

          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 border-b border-border">
                <div className="p-4 bg-red-500/10 font-semibold text-center">
                  Traditional Call Systems
                </div>
                <div className="p-4 bg-green-500/10 font-semibold text-center">
                  AI Voice Agents
                </div>
              </div>
              {comparisonData.map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-b border-border last:border-0">
                  <div className="p-4 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-muted-foreground">{row.traditional}</span>
                  </div>
                  <div className="p-4 flex items-center gap-2 bg-green-500/5">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{row.ai}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <p className="text-center text-muted-foreground mt-6">
            This is why enterprises are actively searching for{" "}
            <span className="text-primary font-medium">AI voice agent services</span>{" "}
            instead of IVR upgrades.
          </p>
        </div>
      </section>

      {/* Core Problems Solved */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Problems AI Voice Agents{" "}
              <span className="text-primary">Solve</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {businessProblems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      <div className="p-6 bg-red-500/5 border-r border-border">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-red-500/20">
                            <item.icon className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-400 mb-1">{item.problem}</h4>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-green-500/5">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-green-500/20">
                            <Zap className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-400 mb-1">Solution</h4>
                            <p className="text-sm">{item.solution}</p>
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

      {/* Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Can AI Voice Agents{" "}
              <span className="text-primary">Handle?</span>
            </h2>
            <p className="text-muted-foreground">
              AI voice agents built by AGIX can manage:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="hover-elevate">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{cap}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold mb-4">
              Industries Actively Using AI Voice Agents
            </h3>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="text-center"
              >
                <div className="p-3 rounded-lg bg-muted hover-elevate mx-auto w-fit mb-2">
                  <industry.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Capabilities Deep Dive */}
      <section id="capabilities" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Voice{" "}
              <span className="text-primary">Capabilities</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each capability is a business use case with demo flow, timelines, and pricing.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {voiceCapabilities.map((cap) => (
              <Button
                key={cap.id}
                variant={selectedCapability.id === cap.id ? "default" : "outline"}
                onClick={() => setSelectedCapability(cap)}
                data-testid={`button-capability-${cap.id}`}
              >
                <cap.icon className="w-4 h-4 mr-2" />
                {cap.title.split(" ").slice(0, 2).join(" ")}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCapability.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-cyan-500/20 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <selectedCapability.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedCapability.title}</h3>
                      <p className="text-muted-foreground">{selectedCapability.subtitle}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">{selectedCapability.description}</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        Problems Solved
                      </h4>
                      <ul className="space-y-2">
                        {selectedCapability.problems.map((p, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-red-400 mt-1">-</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        Use Cases
                      </h4>
                      <ul className="space-y-2">
                        {selectedCapability.useCases.map((uc, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-cyan-400" />
                        How It Works
                      </h4>
                      <ul className="space-y-2">
                        {selectedCapability.howItWorks.map((h, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Timeline</div>
                        <div className="font-semibold">{selectedCapability.timeline}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Pricing</div>
                        <div className="font-semibold">
                          ${selectedCapability.pricing.min.toLocaleString()} – ${selectedCapability.pricing.max.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* AGIX Voice Intelligence Engine */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Layers className="w-3 h-3 mr-1" />
              Our Approach
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The AGIX Voice Intelligence Engine
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A 7-Layer System Built for Production-Grade Voice AI
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {voiceEngineLayers.map((layer, i) => (
                <Button
                  key={i}
                  variant={activeLayer === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveLayer(i)}
                  data-testid={`button-layer-${i + 1}`}
                >
                  Layer {layer.number}
                </Button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <div className={`bg-gradient-to-r ${voiceEngineLayers[activeLayer].color} p-6`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-white/20">
                        {(() => {
                          const Icon = voiceEngineLayers[activeLayer].icon;
                          return <Icon className="w-8 h-8 text-white" />;
                        })()}
                      </div>
                      <div className="text-white">
                        <Badge className="bg-white/20 text-white border-white/30 mb-2">
                          Layer {voiceEngineLayers[activeLayer].number}
                        </Badge>
                        <h3 className="text-2xl font-bold">{voiceEngineLayers[activeLayer].title}</h3>
                        <p className="opacity-90">{voiceEngineLayers[activeLayer].subtitle}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Eye className="w-4 h-4 text-primary" />
                          What We Analyze
                        </h4>
                        <ul className="space-y-2">
                          {voiceEngineLayers[activeLayer].whatWeAnalyze.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Settings className="w-4 h-4 text-cyan-400" />
                          What We Design
                        </h4>
                        <ul className="space-y-2">
                          {voiceEngineLayers[activeLayer].whatWeDesign.map((item, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          Outputs
                        </h4>
                        <ul className="space-y-2">
                          {voiceEngineLayers[activeLayer].outputs.map((item, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technology{" "}
              <span className="text-primary">Stack</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade voice AI infrastructure used by AGIX. Modular, vendor-agnostic stack selected based on use case, scale, latency, compliance, and cost efficiency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologyStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover-elevate">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <tech.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{tech.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{tech.description}</p>
                    <ul className="space-y-2">
                      {tech.capabilities.map((cap, j) => (
                        <li key={j} className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            Tooling is selected per client — vendor lock-in avoided.
          </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Voice Agent{" "}
              <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI Voice Agent pricing is influenced by system complexity, not minutes alone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full ${tier.color} ${tier.popular ? 'border-2' : ''} relative`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{tier.subtitle}</p>
                    <div className="text-3xl font-bold text-primary mt-2">{tier.price}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Best for:</p>
                    <ul className="space-y-2">
                      {tier.bestFor.map((item, j) => (
                        <li key={j} className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4">Ongoing Costs (Transparency)</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Phone className="w-6 h-6 mx-auto text-primary mb-2" />
                  <div className="text-sm font-medium">Telephony</div>
                  <div className="text-xs text-muted-foreground">Usage costs</div>
                </div>
                <div className="text-center">
                  <Brain className="w-6 h-6 mx-auto text-primary mb-2" />
                  <div className="text-sm font-medium">Model Usage</div>
                  <div className="text-xs text-muted-foreground">AI processing</div>
                </div>
                <div className="text-center">
                  <Server className="w-6 h-6 mx-auto text-primary mb-2" />
                  <div className="text-sm font-medium">Infrastructure</div>
                  <div className="text-xs text-muted-foreground">Hosting costs</div>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-6 h-6 mx-auto text-primary mb-2" />
                  <div className="text-sm font-medium">Monitoring</div>
                  <div className="text-xs text-muted-foreground">Optimization</div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                AGIX designs systems to minimize token waste, optimize call duration, and balance quality vs cost.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ROICalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="text-primary">Questions</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border">
                <AccordionTrigger className="px-4 hover:no-underline" data-testid={`accordion-faq-${i}`}>
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-[#0A0F1D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Deploy AI Voice Agents That{" "}
              <span className="text-primary">Actually Work?</span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              If your business handles high call volumes, appointment scheduling, sales or support calls, or multilingual customers — AGIX can help you automate voice without breaking trust.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {[
                "High call volumes",
                "Appointment scheduling",
                "Sales or support calls",
                "Multilingual customers"
              ].map((item, i) => (
                <Badge key={i} variant="outline" className="bg-white/10 text-white border-white/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {item}
                </Badge>
              ))}
            </div>

            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/schedule-consultation" data-testid="button-final-cta">
                Schedule Your AI Voice Agent Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-20 bg-[#0A0F1D]" />

      <MainFooter />
    </div>
  );
}
