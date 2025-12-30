'use client'
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
  MessageSquare,
  Bot,
  Brain,
  Zap,
  Clock,
  Users,
  Globe,
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
  Building2,
  Stethoscope,
  Home,
  Wallet,
  ShoppingCart,
  Truck,
  Briefcase,
  Factory,
  ChevronRight,
  Sparkles,
  Database,
  Server,
  Network,
  Eye,
  Calculator,
  AlertCircle,
  HelpCircle,
  FileText,
  Image,
  Search,
  Workflow,
  UserCheck,
  BookOpen,
  MessagesSquare,
  Send,
  LayoutGrid,
  Cpu,
  RefreshCw
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const useCases = [
  { value: "customer-support", label: "Customer support" },
  { value: "sales-qualification", label: "Sales & lead qualification" },
  { value: "internal-assistant", label: "Internal AI assistant" },
  { value: "knowledge-chatbot", label: "Knowledge base chatbot" },
  { value: "multimodal", label: "Multimodal chat" },
];

const operationalProblems = [
  {
    icon: MessagesSquare,
    title: "Support Backlogs",
    description: "Conversation volume grows faster than headcount"
  },
  {
    icon: Clock,
    title: "Slow Response Times",
    description: "Users wait while agents handle repetitive queries"
  },
  {
    icon: Users,
    title: "Skilled Teams on Repetitive Tasks",
    description: "Expert time wasted on FAQ-level questions"
  },
  {
    icon: XCircle,
    title: "Inconsistent Answers",
    description: "Different agents give different responses"
  },
  {
    icon: Database,
    title: "Knowledge Trapped in People",
    description: "Information not accessible through systems"
  }
];

const comparisonData = [
  { traditional: "Scripted flows", ai: "Intent-driven conversations" },
  { traditional: "FAQ-only", ai: "Knowledge + action" },
  { traditional: "Break on variation", ai: "Handles ambiguity" },
  { traditional: "Isolated tool", ai: "Integrated across systems" },
  { traditional: "Static responses", ai: "Continuously improving" },
  { traditional: "Single channel", ai: "Multi-channel deployment" }
];

const businessAreas = [
  {
    id: "support",
    title: "Customer Support Chatbots",
    subtitle: "Resolve Tickets Instantly. Escalate Only What Matters.",
    icon: Headphones,
    description: "Customer Support Chatbots are AI-powered conversational systems that handle customer inquiries, resolve repetitive issues, retrieve knowledge, and escalate complex cases — across web, app, and internal channels.",
    keywords: ["customer support chatbot", "AI chatbot for customer service", "support automation chatbot"],
    problems: [
      "High support ticket volume",
      "Repetitive Tier-1 questions",
      "Slow response times",
      "Inconsistent answers across agents",
      "Rising support costs"
    ],
    useCases: [
      "Order status & tracking",
      "Account & billing queries",
      "Product usage questions",
      "Policy & FAQ resolution",
      "Ticket creation & escalation"
    ],
    howItWorks: [
      "Intent detection using LLMs",
      "Retrieval from verified knowledge sources (RAG)",
      "Context memory across sessions",
      "Seamless handoff to human agents",
      "CRM & ticketing system updates"
    ],
    timeline: "4–7 weeks",
    pricing: { min: 8000, max: 15000, enterprise: "$15,000 – $30,000+" }
  },
  {
    id: "sales",
    title: "Sales & Lead Qualification Chatbots",
    subtitle: "Engage Visitors. Qualify Intent. Drive Conversions.",
    icon: TrendingUp,
    description: "Sales Chatbots are conversational AI systems that engage inbound users, qualify prospects, answer objections, and route high-intent leads to sales teams.",
    keywords: ["AI sales chatbot", "lead qualification chatbot", "chatbot for lead generation"],
    problems: [
      "Website visitors leaving unengaged",
      "Slow sales response times",
      "Poor lead qualification",
      "Missed after-hours opportunities"
    ],
    useCases: [
      "Website visitor engagement",
      "Lead qualification conversations",
      "Product & pricing questions",
      "Demo scheduling",
      "CRM lead enrichment"
    ],
    howItWorks: [
      "Dynamic conversation paths",
      "Intent scoring & qualification logic",
      "Objection handling via LLMs",
      "Real-time CRM updates",
      "Sales handoff at the right moment"
    ],
    timeline: "4–6 weeks",
    pricing: { min: 7000, max: 12000, enterprise: "$12,000 – $25,000+" }
  },
  {
    id: "internal",
    title: "Internal AI Assistants",
    subtitle: "One Conversational Interface for Internal Knowledge & Systems",
    icon: Building2,
    description: "Internal AI Assistants are conversational systems designed for employees — enabling them to access internal knowledge, tools, and workflows using natural language.",
    keywords: ["internal AI assistant", "enterprise AI assistant", "employee chatbot"],
    problems: [
      "Knowledge silos",
      "Slow onboarding",
      "Repetitive internal questions",
      "Tool overload",
      "Productivity loss"
    ],
    useCases: [
      "HR & policy questions",
      "IT & internal support",
      "SOP & process guidance",
      "Data lookup & summaries",
      "Workflow initiation"
    ],
    howItWorks: [
      "Secure access controls",
      "Role-based responses",
      "Knowledge grounding (RAG)",
      "Workflow triggers",
      "Audit & usage logging"
    ],
    timeline: "5–8 weeks",
    pricing: { min: 10000, max: 20000, enterprise: "$20,000 – $40,000+" }
  },
  {
    id: "multimodal",
    title: "Multimodal Conversational AI",
    subtitle: "Chat That Understands Text, Documents, Files & Images",
    icon: LayoutGrid,
    description: "Multimodal Conversational AI allows users to interact with systems using multiple input types — text, documents, images, or files — within a single conversational context.",
    keywords: ["multimodal chatbot", "AI chatbot with document upload", "vision-enabled conversational AI"],
    problems: [
      "Manual document review",
      "Complex support queries involving files",
      "Poor user experience when sharing information",
      "Disconnected analysis workflows"
    ],
    useCases: [
      "Uploading documents for analysis",
      "Image-based issue reporting",
      "Form & report interpretation",
      "Knowledge extraction from files"
    ],
    howItWorks: [
      "File & image ingestion",
      "Context preservation across inputs",
      "Secure document handling",
      "AI-powered extraction & reasoning"
    ],
    timeline: "5–8 weeks",
    pricing: { min: 12000, max: 20000, enterprise: "$20,000 – $45,000+" }
  }
];

const intelligenceEngineLayers = [
  {
    number: 1,
    title: "Use-Case & Conversation Discovery",
    subtitle: "Where Most Chatbot Projects Fail — We Start Here",
    icon: Target,
    color: "from-orange-500 to-red-500",
    whatWeAnalyze: [
      "Who will talk to the chatbot",
      "Why they initiate conversations",
      "What outcomes matter",
      "What should be automated vs escalated",
      "Risk & compliance boundaries"
    ],
    whatWeDesign: [
      "Conversation goals per use case",
      "Success metrics",
      "Escalation logic",
      "Automation boundaries"
    ],
    outputs: ["Conversational Use-Case Map", "Intent Taxonomy", "Conversation Success Criteria"]
  },
  {
    number: 2,
    title: "Conversational Reasoning Architecture",
    subtitle: "The 'Brain' of the Chatbot",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    whatWeAnalyze: [
      "Intent classification & disambiguation",
      "Context preservation across turns",
      "Follow-up reasoning",
      "Clarification logic",
      "Response grounding rules"
    ],
    whatWeDesign: [
      "Multi-step reasoning flows",
      "Dynamic response generation",
      "Context-aware interactions"
    ],
    outputs: ["AGIX designs multi-step reasoning flows, not single-prompt bots."]
  },
  {
    number: 3,
    title: "Knowledge Grounding & RAG",
    subtitle: "Accuracy Is Non-Negotiable",
    icon: Database,
    color: "from-cyan-500 to-blue-500",
    whatWeAnalyze: [
      "Verified knowledge ingestion",
      "Retrieval-augmented generation (RAG)",
      "Source-aware responses",
      "Versioned knowledge updates"
    ],
    whatWeDesign: [
      "Accurate answers",
      "Policy compliance",
      "Trustworthy responses"
    ],
    outputs: ["LLMs are powerful — but ungrounded models hallucinate. AGIX prevents this."]
  },
  {
    number: 4,
    title: "Action & Workflow Orchestration",
    subtitle: "Chat That Actually Does Things",
    icon: Workflow,
    color: "from-green-500 to-emerald-500",
    whatWeAnalyze: [
      "CRM updates",
      "Ticket creation",
      "Workflow triggers",
      "Data retrieval",
      "Approvals & notifications"
    ],
    whatWeDesign: [
      "End-to-end action flows",
      "System integration pipelines",
      "Real-time data sync"
    ],
    outputs: ["A chatbot that only answers is not enough. AGIX builds action-capable systems."]
  },
  {
    number: 5,
    title: "Context, Memory & Personalization",
    subtitle: "Conversations That Feel Continuous",
    icon: RefreshCw,
    color: "from-yellow-500 to-orange-500",
    whatWeAnalyze: [
      "Session memory",
      "User-level memory",
      "Role-based context",
      "Interaction history"
    ],
    whatWeDesign: [
      "Improved experience",
      "Data leakage prevention",
      "Compliance maintenance"
    ],
    outputs: ["Memory designed carefully for experience, security, and compliance."]
  },
  {
    number: 6,
    title: "Monitoring, QA & Continuous Optimization",
    subtitle: "Why AGIX Systems Improve Over Time",
    icon: BarChart3,
    color: "from-pink-500 to-rose-500",
    whatWeAnalyze: [
      "Intent accuracy",
      "Resolution rate",
      "Escalation frequency",
      "User satisfaction",
      "Conversation drop-offs"
    ],
    whatWeDesign: [
      "Prompt tuning",
      "Intent refinement",
      "Knowledge updates",
      "Response quality audits"
    ],
    outputs: ["Before/After Metrics", "Improvement Tracking", "Quality Dashboards"]
  },
  {
    number: 7,
    title: "Security, Governance & Enterprise Controls",
    subtitle: "Critical for Trust & Scale",
    icon: Lock,
    color: "from-indigo-500 to-purple-500",
    whatWeAnalyze: [
      "Role-based access",
      "Data masking",
      "Audit logs",
      "Secure integrations",
      "Compliance boundaries"
    ],
    whatWeDesign: [
      "Healthcare compliance",
      "Finance & insurance governance",
      "Enterprise IT environments"
    ],
    outputs: ["AGIX conversational AI is governed by design, not patched later."]
  }
];

const architectureComponents = [
  { icon: Layers, title: "Conversation Orchestration Layer", description: "Manages conversation flow and state" },
  { icon: Brain, title: "LLM Reasoning Engine", description: "Intelligent response generation" },
  { icon: Database, title: "Knowledge Retrieval (RAG)", description: "Accurate, grounded answers" },
  { icon: RefreshCw, title: "Context & Memory Management", description: "Continuous conversation awareness" },
  { icon: Network, title: "System Integration Layer", description: "Connected to your tools" },
  { icon: BarChart3, title: "Monitoring & Analytics", description: "Performance insights" }
];

const pricingTiers = [
  {
    name: "Starter Chatbot",
    subtitle: "Single Use Case",
    price: "$7,000 – $15,000",
    bestFor: ["FAQ resolution", "Basic support", "Lead capture"],
    color: "border-border"
  },
  {
    name: "Business Chatbot",
    subtitle: "Multiple Use Cases",
    price: "$15,000 – $30,000",
    bestFor: ["Support + sales", "CRM integration", "Knowledge-driven responses"],
    color: "border-primary",
    popular: true
  },
  {
    name: "Enterprise AI Assistant",
    subtitle: "Full-Scale Deployment",
    price: "$30,000 – $50,000+",
    bestFor: ["Multi-department", "Internal + external", "Multimodal capability", "Advanced governance"],
    color: "border-border"
  }
];

const faqItems = [
  {
    question: "What is conversational AI in simple terms?",
    answer: "Conversational AI allows users to interact with systems using natural language to ask questions, retrieve information, and perform actions through chat interfaces."
  },
  {
    question: "How is conversational AI different from chatbots?",
    answer: "Traditional chatbots are rule-based. Conversational AI uses AI reasoning, context, and knowledge grounding to handle complex conversations."
  },
  {
    question: "Can conversational AI replace customer support agents?",
    answer: "Conversational AI handles repetitive queries and escalates complex cases, reducing workload without removing human oversight."
  },
  {
    question: "How accurate are conversational AI systems?",
    answer: "Well-designed systems typically achieve 85–95% resolution accuracy for defined use cases and improve continuously."
  },
  {
    question: "Is conversational AI secure?",
    answer: "Yes — when designed with access control, data governance, and audit logging, as AGIX does."
  },
  {
    question: "Can conversational AI integrate with internal systems?",
    answer: "Yes. Integration with CRM, ticketing, ERP, and internal tools is a core capability."
  },
  {
    question: "How long does it take to deploy conversational AI?",
    answer: "Most deployments take 4–8 weeks, depending on complexity and integrations."
  },
  {
    question: "How much does conversational AI cost?",
    answer: "Typical projects range from $7,000 to $45,000+, depending on scope, knowledge depth, and scale."
  },
  {
    question: "Can conversational AI work internally and externally?",
    answer: "Yes. AGIX designs conversational AI for customers, sales teams, and internal employees using the same core engine."
  }
];

const industries = [
  { icon: Stethoscope, name: "Healthcare" },
  { icon: Wallet, name: "Finance & FinTech" },
  { icon: ShoppingCart, name: "Retail & E-commerce" },
  { icon: Building2, name: "Enterprise" },
  { icon: Briefcase, name: "Professional Services" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Truck, name: "Logistics" },
  { icon: Home, name: "Real Estate" }
];

function ROICalculator() {
  const [activeTab, setActiveTab] = useState("development");
  
  // Development cost inputs
  const [useCase, setUseCase] = useState("support");
  const [knowledgeDepth, setKnowledgeDepth] = useState("basic");
  const [integrations, setIntegrations] = useState("none");
  const [userScale, setUserScale] = useState("small");
  const [compliance, setCompliance] = useState("standard");
  
  // Monthly cost inputs
  const [monthlyConversations, setMonthlyConversations] = useState([10000]);
  const [messagesPerConversation, setMessagesPerConversation] = useState("10");
  const [aiCapability, setAiCapability] = useState("faq-retrieval");
  const [deploymentType, setDeploymentType] = useState("multi-tenant");
  
  // ROI inputs
  const [agentCost, setAgentCost] = useState("3000");
  const [agentsSupported, setAgentsSupported] = useState([5]);
  const [automationPercent, setAutomationPercent] = useState([60]);

  // Use-Case Explorer inputs
  const [explorerIndustry, setExplorerIndustry] = useState("");
  const [explorerDepartment, setExplorerDepartment] = useState("");
  const [explorerProblem, setExplorerProblem] = useState("");

  const developmentCost = useMemo(() => {
    let base = 6000;
    
    // Knowledge depth
    if (knowledgeDepth === "product-docs") base += 3000;
    else if (knowledgeDepth === "multi-source") base += 7000;
    
    // Integrations
    if (integrations === "1-2") base += 4500;
    else if (integrations === "3-5") base += 9000;
    else if (integrations === "5+") base += 15000;
    
    // Compliance
    if (compliance === "regulated") base += 6000;
    
    // User scale
    if (userScale === "medium") base += 2000;
    else if (userScale === "large") base += 5000;
    
    // Multimodal
    if (useCase === "multimodal") base += 7000;
    
    const minCost = Math.round(base * 0.9);
    const maxCost = Math.round(base * 1.25);
    const weeks = Math.ceil(base / 4000);
    
    return { min: minCost, max: maxCost, weeks: Math.max(4, Math.min(weeks, 10)) };
  }, [useCase, knowledgeDepth, integrations, userScale, compliance]);

  const monthlyCost = useMemo(() => {
    const conversations = monthlyConversations[0];
    const messages = messagesPerConversation === "5" ? 5 : messagesPerConversation === "10" ? 10 : 20;
    const totalMessages = conversations * messages;
    
    // AI processing cost per message
    const costPerMessage = aiCapability === "faq-retrieval" ? 0.002 : aiCapability === "reasoning-actions" ? 0.005 : 0.01;
    const aiProcessing = totalMessages * costPerMessage;
    
    // Infrastructure
    const infrastructure = deploymentType === "single" ? 400 : deploymentType === "multi-tenant" ? 600 : 1200;
    const storage = conversations > 50000 ? 500 : conversations > 10000 ? 300 : 100;
    
    return {
      aiProcessing: Math.round(aiProcessing),
      storage,
      infrastructure,
      total: Math.round(aiProcessing + storage + infrastructure)
    };
  }, [monthlyConversations, messagesPerConversation, aiCapability, deploymentType]);

  const roiCalculation = useMemo(() => {
    const humanCost = parseInt(agentCost) * agentsSupported[0];
    const aiCost = monthlyCost.total;
    const effectiveSavings = humanCost * (automationPercent[0] / 100);
    const savings = effectiveSavings - aiCost;
    const paybackMonths = developmentCost.min / Math.max(savings, 1);
    const annualROI = ((savings * 12) / developmentCost.min) * 100;
    
    return {
      humanCost,
      aiCost,
      savings: Math.max(0, Math.round(savings)),
      paybackMonths: isFinite(paybackMonths) && paybackMonths > 0 ? Math.min(paybackMonths, 24) : 0,
      annualROI: isFinite(annualROI) && annualROI > 0 ? annualROI : 0
    };
  }, [agentCost, agentsSupported, automationPercent, monthlyCost, developmentCost]);

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Calculator className="w-7 h-7 text-primary" />
          Conversational AI Cost & ROI Calculator
        </CardTitle>
        <p className="text-muted-foreground">
          Estimate development cost, monthly running cost & business impact
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="development" data-testid="tab-chatbot-development" className="text-xs sm:text-sm">
              Development
            </TabsTrigger>
            <TabsTrigger value="monthly" data-testid="tab-chatbot-monthly" className="text-xs sm:text-sm">
              Monthly Cost
            </TabsTrigger>
            <TabsTrigger value="roi" data-testid="tab-chatbot-roi" className="text-xs sm:text-sm">
              ROI Analysis
            </TabsTrigger>
            <TabsTrigger value="explorer" data-testid="tab-chatbot-explorer" className="text-xs sm:text-sm">
              Use-Case Explorer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="development" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Primary Use Case</Label>
                  <Select value={useCase} onValueChange={setUseCase}>
                    <SelectTrigger data-testid="select-chatbot-use-case">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Customer Support Chatbot</SelectItem>
                      <SelectItem value="sales">Sales / Lead Qualification</SelectItem>
                      <SelectItem value="internal">Internal AI Assistant</SelectItem>
                      <SelectItem value="multimodal">Multimodal Conversational AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Knowledge Depth</Label>
                  <Select value={knowledgeDepth} onValueChange={setKnowledgeDepth}>
                    <SelectTrigger data-testid="select-knowledge-depth">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic FAQs</SelectItem>
                      <SelectItem value="product-docs">Product / Service Docs</SelectItem>
                      <SelectItem value="multi-source">Multi-source Knowledge (SOPs, policies, databases)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Integrations Required</Label>
                  <Select value={integrations} onValueChange={setIntegrations}>
                    <SelectTrigger data-testid="select-chatbot-integrations">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="1-2">1–2 Systems</SelectItem>
                      <SelectItem value="3-5">3–5 Systems</SelectItem>
                      <SelectItem value="5+">5+ Systems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>User Scale</Label>
                  <Select value={userScale} onValueChange={setUserScale}>
                    <SelectTrigger data-testid="select-user-scale">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">&lt; 500 users</SelectItem>
                      <SelectItem value="medium">500 – 5,000 users</SelectItem>
                      <SelectItem value="large">5,000+ users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Security / Compliance</Label>
                  <Select value={compliance} onValueChange={setCompliance}>
                    <SelectTrigger data-testid="select-chatbot-compliance">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="regulated">Regulated (Healthcare / Finance / Enterprise)</SelectItem>
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
                  <Label>Monthly Conversations: {monthlyConversations[0].toLocaleString()}</Label>
                  <Slider
                    value={monthlyConversations}
                    onValueChange={setMonthlyConversations}
                    min={1000}
                    max={500000}
                    step={1000}
                    className="mt-2"
                    data-testid="slider-monthly-conversations"
                  />
                </div>

                <div>
                  <Label>Avg Messages per Conversation</Label>
                  <Select value={messagesPerConversation} onValueChange={setMessagesPerConversation}>
                    <SelectTrigger data-testid="select-messages-per-conv">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 messages</SelectItem>
                      <SelectItem value="10">10 messages</SelectItem>
                      <SelectItem value="20">20 messages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>AI Capability Level</Label>
                  <Select value={aiCapability} onValueChange={setAiCapability}>
                    <SelectTrigger data-testid="select-ai-capability">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faq-retrieval">FAQ + Retrieval</SelectItem>
                      <SelectItem value="reasoning-actions">Reasoning + Actions</SelectItem>
                      <SelectItem value="multimodal-reasoning">Multimodal Reasoning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Deployment Type</Label>
                  <Select value={deploymentType} onValueChange={setDeploymentType}>
                    <SelectTrigger data-testid="select-deployment-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Tenant</SelectItem>
                      <SelectItem value="multi-tenant">Multi-Tenant</SelectItem>
                      <SelectItem value="enterprise">Enterprise Isolated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-lg">Estimated Monthly Cost</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">AI Processing (LLMs + Retrieval)</span>
                    <span className="font-medium">${monthlyCost.aiProcessing.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Knowledge & Vector Storage</span>
                    <span className="font-medium">${monthlyCost.storage.toLocaleString()}</span>
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
                    <span>Costs optimized for quality vs efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Avg Human Agent Cost per Month ($)</Label>
                  <Input
                    type="number"
                    value={agentCost}
                    onChange={(e) => setAgentCost(e.target.value)}
                    placeholder="3000"
                    data-testid="input-chatbot-agent-cost"
                  />
                </div>

                <div>
                  <Label>Agents Supported or Replaced: {agentsSupported[0]}</Label>
                  <Slider
                    value={agentsSupported}
                    onValueChange={setAgentsSupported}
                    min={1}
                    max={100}
                    step={1}
                    className="mt-2"
                    data-testid="slider-agents-supported"
                  />
                </div>

                <div>
                  <Label>Conversations Automated: {automationPercent[0]}%</Label>
                  <Slider
                    value={automationPercent}
                    onValueChange={setAutomationPercent}
                    min={20}
                    max={90}
                    step={5}
                    className="mt-2"
                    data-testid="slider-chatbot-automation"
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
                    Most conversational AI systems recover development cost within 1–3 months.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explorer" className="space-y-6">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold mb-2">What Can Conversational AI Handle in My Business?</h4>
              <p className="text-muted-foreground text-sm">Select your context to see recommended solutions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label>Industry</Label>
                <Select value={explorerIndustry} onValueChange={setExplorerIndustry}>
                  <SelectTrigger data-testid="select-explorer-industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance & Banking</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="professional">Professional Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Department</Label>
                <Select value={explorerDepartment} onValueChange={setExplorerDepartment}>
                  <SelectTrigger data-testid="select-explorer-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="sales">Sales & Marketing</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="it">IT & Operations</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                    <SelectItem value="operations">General Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Primary Problem</Label>
                <Select value={explorerProblem} onValueChange={setExplorerProblem}>
                  <SelectTrigger data-testid="select-explorer-problem">
                    <SelectValue placeholder="Select problem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ticket-volume">High ticket volume</SelectItem>
                    <SelectItem value="slow-response">Slow response times</SelectItem>
                    <SelectItem value="lead-engagement">Poor lead engagement</SelectItem>
                    <SelectItem value="knowledge-access">Difficult knowledge access</SelectItem>
                    <SelectItem value="onboarding">Slow employee onboarding</SelectItem>
                    <SelectItem value="repetitive-queries">Repetitive queries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {explorerIndustry && explorerDepartment && explorerProblem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-lg p-6 border border-primary/20"
              >
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Recommended Solution
                </h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Suggested Chatbot Type</div>
                      <div className="font-semibold text-primary">
                        {explorerDepartment === "support" ? "Customer Support Chatbot" :
                         explorerDepartment === "sales" ? "Sales & Lead Qualification Chatbot" :
                         explorerDepartment === "hr" || explorerDepartment === "it" ? "Internal AI Assistant" :
                         "Enterprise Conversational AI"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Estimated Automation</div>
                      <div className="font-semibold">
                        {explorerProblem === "repetitive-queries" || explorerProblem === "ticket-volume" ? "70-85%" :
                         explorerProblem === "knowledge-access" ? "60-75%" :
                         explorerProblem === "lead-engagement" ? "50-70%" :
                         "55-70%"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Expected ROI Band</div>
                      <div className="font-semibold text-green-400">
                        {explorerProblem === "ticket-volume" || explorerProblem === "repetitive-queries" ? "300-600% annually" :
                         explorerProblem === "lead-engagement" ? "200-400% annually" :
                         "150-350% annually"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Relevant AGIX Services</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Conversational AI</Badge>
                        {explorerDepartment === "support" && <Badge variant="secondary">RAG & Knowledge AI</Badge>}
                        {explorerDepartment === "sales" && <Badge variant="secondary">Predictive Analytics</Badge>}
                        {(explorerDepartment === "hr" || explorerDepartment === "it") && <Badge variant="secondary">AI Automation</Badge>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    This is a preliminary recommendation based on your selections. 
                    <a href="/schedule-consultation" className="text-primary hover:underline ml-1">Schedule a consultation</a> for a detailed analysis.
                  </p>
                </div>
              </motion.div>
            )}

            {(!explorerIndustry || !explorerDepartment || !explorerProblem) && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select all three options above to see your recommended solution</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want an exact cost & ROI for your use case?
          </p>
          <Button size="lg" asChild>
            <a href="/schedule-consultation" data-testid="button-chatbot-calculator-cta">
              Get a Custom Conversational AI Cost Breakdown
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConversationalAIChatbots() {
  const [selectedArea, setSelectedArea] = useState(businessAreas[0]);
  const [activeLayer, setActiveLayer] = useState(0);
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: ""
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("cta_click", { event_category: "chatbot_demo_request", event_label: demoFormData.useCase });
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F1D] via-[#1E2A4F] to-background pt-24 lg:pt-28 pb-16">
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
                <MessageSquare className="w-3 h-3 mr-1" />
                Enterprise Conversational AI
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Conversational AI That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  Works Across Support, Sales & Operations
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-4">
                One Intelligent Chat Layer. Multiple Business Outcomes.
              </p>
              
              <p className="text-gray-400 mb-6 max-w-xl">
                AGIX builds enterprise-grade Conversational AI systems that handle customer conversations, assist sales, support internal teams, and interact with knowledge and systems — through a single, intelligent chat interface.
              </p>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-8">
                <p className="text-gray-300 text-sm">
                  <span className="text-primary font-semibold">This is not a rule-based chatbot.</span>{" "}
                  This is production-ready conversational intelligence, built to operate at real business scale.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-2 mt-4"
              >
                <a href="#calculator" className="group flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-gradient-to-r from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-all" data-testid="link-hero-chatbot-calculator">
                  <Calculator className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                      Chatbot ROI Calculator
                    </p>
                    <p className="text-xs text-gray-400">
                      Interactive tool (takes ~30 seconds) — estimate costs, monthly usage & ROI
                    </p>
                  </div>
                </a>
                <a href="#business-areas" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 hover:from-cyan-500/30 hover:to-cyan-500/10 transition-all" data-testid="link-hero-chatbot-usecases">
                  <Target className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                      Find Your Chatbot Use Case
                    </p>
                    <p className="text-xs text-gray-400">
                      Support, sales, internal assistants, knowledge bots & multimodal AI
                    </p>
                  </div>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              id="demo-form"
              className="sticky top-24 z-10 self-start"
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    Request a Conversational AI Demo
                  </CardTitle>
                  <p className="text-gray-400 text-sm">
                    See how AI handles real conversations in your industry.
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
                        data-testid="input-chatbot-demo-name"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Business Email</Label>
                      <Input
                        type="email"
                        value={demoFormData.email}
                        onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="you@company.com"
                        data-testid="input-chatbot-demo-email"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Company / Industry</Label>
                      <Input
                        value={demoFormData.company}
                        onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        placeholder="Your company"
                        data-testid="input-chatbot-demo-company"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Primary Use Case</Label>
                      <Select
                        value={demoFormData.useCase}
                        onValueChange={(value) => setDemoFormData({ ...demoFormData, useCase: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white" data-testid="select-chatbot-demo-use-case">
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
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" size="lg" data-testid="button-chatbot-schedule-demo">
                      Schedule Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                  <p className="text-gray-400 text-xs mt-4 text-center">
                    Designed for customer support, sales engagement, internal assistance & multimodal interaction.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Conversational AI Is a Business Priority */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Conversational AI Is a{" "}
              <span className="text-primary">Business Priority</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Human teams are still acting as the interface between users and systems. That human mediation does not scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {operationalProblems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-red-500/5 border-red-500/20">
                  <CardContent className="pt-6">
                    <item.icon className="w-8 h-8 text-red-400 mb-3" />
                    <h4 className="font-semibold mb-2">{item.title}</h4>
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
            <Card className="bg-green-500/10 border-green-500/20 inline-block">
              <CardContent className="py-4 px-6">
                <p className="text-lg font-medium text-green-400">
                  Adding more agents only increases cost — it does not fix the underlying problem.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  This is why businesses search for advanced conversational AI solutions, not basic chat widgets.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What Conversational AI Means at AGIX */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Conversational AI Means at{" "}
                <span className="text-primary">AGIX</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Conversational AI is designed as an interaction layer between:
              </p>
              
              <div className="space-y-4 mb-8">
                <Card className="bg-muted/30">
                  <CardContent className="py-4 flex items-center gap-4">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">Users</div>
                      <div className="text-sm text-muted-foreground">Customers, prospects, employees</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="py-4 flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">Knowledge</div>
                      <div className="text-sm text-muted-foreground">Documents, SOPs, FAQs, policies</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-muted/30">
                  <CardContent className="py-4 flex items-center gap-4">
                    <Settings className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">Systems</div>
                      <div className="text-sm text-muted-foreground">CRM, ticketing, internal tools, workflows</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-lg mb-4">It allows users to:</h4>
                  <ul className="space-y-3">
                    {[
                      "Ask questions in natural language",
                      "Receive accurate, contextual answers",
                      "Retrieve knowledge instantly",
                      "Trigger actions without navigating systems"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-primary font-semibold">
                      Conversation becomes the primary interface — not a support channel.
                    </p>
                  </div>
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
              Traditional Chatbots vs{" "}
              <span className="text-primary">AGIX Conversational AI</span>
            </h2>
          </motion.div>

          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 border-b border-border">
                <div className="p-4 bg-red-500/10 font-semibold text-center">
                  Traditional Chatbots
                </div>
                <div className="p-4 bg-green-500/10 font-semibold text-center">
                  AGIX Conversational AI
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
            This distinction is critical for buyers evaluating{" "}
            <span className="text-primary font-medium">enterprise conversational AI platforms</span>.
          </p>
        </div>
      </section>

      {/* Core Business Areas */}
      <section id="business-areas" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Business Areas Conversational AI{" "}
              <span className="text-primary">Transforms</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each capability is a deployable system with clear use cases, timelines, and pricing.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {businessAreas.map((area) => (
              <Button
                key={area.id}
                variant={selectedArea.id === area.id ? "default" : "outline"}
                onClick={() => setSelectedArea(area)}
                data-testid={`button-area-${area.id}`}
              >
                <area.icon className="w-4 h-4 mr-2" />
                {area.title.split(" ").slice(0, 2).join(" ")}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-cyan-500/20 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <selectedArea.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedArea.title}</h3>
                      <p className="text-muted-foreground">{selectedArea.subtitle}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">{selectedArea.description}</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        Problems Solved
                      </h4>
                      <ul className="space-y-2">
                        {selectedArea.problems.map((p, i) => (
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
                        {selectedArea.useCases.map((uc, i) => (
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
                        {selectedArea.howItWorks.map((h, i) => (
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
                        <div className="font-semibold">{selectedArea.timeline}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Pricing</div>
                        <div className="font-semibold">
                          ${selectedArea.pricing.min.toLocaleString()} – ${selectedArea.pricing.max.toLocaleString()}
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

      {/* Industries */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold">Industries Using Conversational AI</h3>
          </motion.div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="text-center"
              >
                <div className="p-3 rounded-lg bg-background hover-elevate mx-auto w-fit mb-2">
                  <industry.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AGIX Conversational Intelligence Engine */}
      <section className="py-20">
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
              The AGIX Conversational Intelligence Engine
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A 7-Layer Framework for Reliable, Scalable Conversational AI
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {intelligenceEngineLayers.map((layer, i) => (
                <Button
                  key={i}
                  variant={activeLayer === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveLayer(i)}
                  data-testid={`button-chatbot-layer-${i + 1}`}
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
                  <div className={`bg-gradient-to-r ${intelligenceEngineLayers[activeLayer].color} p-6`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-white/20">
                        {(() => {
                          const Icon = intelligenceEngineLayers[activeLayer].icon;
                          return <Icon className="w-8 h-8 text-white" />;
                        })()}
                      </div>
                      <div className="text-white">
                        <Badge className="bg-white/20 text-white border-white/30 mb-2">
                          Layer {intelligenceEngineLayers[activeLayer].number}
                        </Badge>
                        <h3 className="text-2xl font-bold">{intelligenceEngineLayers[activeLayer].title}</h3>
                        <p className="opacity-90">{intelligenceEngineLayers[activeLayer].subtitle}</p>
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
                          {intelligenceEngineLayers[activeLayer].whatWeAnalyze.map((item, i) => (
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
                          {intelligenceEngineLayers[activeLayer].whatWeDesign.map((item, i) => (
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
                          {intelligenceEngineLayers[activeLayer].outputs.map((item, i) => (
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

      {/* Architecture */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conversational AI{" "}
              <span className="text-primary">Architecture</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX conversational systems include these core components for accuracy, scalability, and control.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureComponents.map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <comp.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold">{comp.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{comp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conversational AI{" "}
              <span className="text-primary">Pricing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pricing based on knowledge depth, integration complexity, security requirements, and business impact.
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
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                AGIX does not price chatbots per flow or per hour. Pricing ensures reliable systems, predictable costs, and long-term ROI.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ROICalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
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
              <AccordionItem key={i} value={`faq-${i}`} className="bg-muted/50 rounded-lg border">
                <AccordionTrigger className="px-4 hover:no-underline" data-testid={`accordion-chatbot-faq-${i}`}>
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
              Ready to Deploy Conversational AI That{" "}
              <span className="text-primary">Actually Works?</span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              If your business handles high conversation volume, repetitive support questions, sales inquiries, or internal knowledge requests — AGIX can help you deploy conversational AI without guesswork.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {[
                "High conversation volume",
                "Repetitive support questions",
                "Sales inquiries",
                "Internal knowledge requests"
              ].map((item, i) => (
                <Badge key={i} variant="outline" className="bg-white/10 text-white border-white/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {item}
                </Badge>
              ))}
            </div>

            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/schedule-consultation" data-testid="button-chatbot-final-cta">
                Request a Conversational AI Demo
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
