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
import { Checkbox } from "@/components/ui/checkbox";
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
  Bot,
  Brain,
  Zap,
  Clock,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Settings,
  Shield,
  Building2,
  Stethoscope,
  Wallet,
  Truck,
  Briefcase,
  ChevronRight,
  Sparkles,
  Network,
  Eye,
  Calculator,
  AlertCircle,
  HelpCircle,
  Cog,
  GitBranch,
  Database,
  RefreshCw,
  Search,
  Workflow,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Server,
  ClipboardList,
  Loader2
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const primaryChallenges = [
  { id: "manual-coordination", label: "Too much manual coordination" },
  { id: "breaking-processes", label: "Processes break when conditions change" },
  { id: "workflow-ownership", label: "Long-running workflows lack ownership" },
  { id: "no-intelligence", label: "Too many tools, no intelligence layer" },
  { id: "exploring-agentic", label: "Exploring agentic AI for core operations" }
];

const companyStages = [
  { value: "early-stage", label: "Early-stage startup (0–20)" },
  { value: "scaling", label: "Scaling startup (20–100)" },
  { value: "mid-market", label: "Mid-market (100–500)" },
  { value: "enterprise", label: "Enterprise (500+)" }
];

const businessStruggles = [
  { icon: Network, text: "Too many systems that don't reason together" },
  { icon: GitBranch, text: "Too many workflows that break when conditions change" },
  { icon: Users, text: "Too many manual decisions inside 'automated' processes" },
  { icon: AlertCircle, text: "Too many exceptions handled by humans" },
  { icon: Cog, text: "Too many moving parts for static automation to manage" }
];

const traditionalVsAgentic = [
  { traditional: "Executes predefined tasks", agentic: "Pursues defined goals" },
  { traditional: "Single flow", agentic: "Multi-step planning" },
  { traditional: "Human-triggered", agentic: "Autonomous initiation" },
  { traditional: "Short-lived execution", agentic: "Long-running processes" },
  { traditional: "Limited adaptability", agentic: "Self-adjusting behavior" },
  { traditional: "Centralized logic", agentic: "Distributed agent collaboration" }
];

const fourForces = [
  {
    number: "1",
    title: "Business Complexity Has Outpaced Human Coordination",
    description: "More tools ≠ better outcomes. Someone still has to think across them.",
    solution: "Agentic systems take over this cognitive load."
  },
  {
    number: "2",
    title: "Static Automation Breaks Under Real-World Conditions",
    description: "Exceptions are the norm, not the edge case.",
    solution: "Agentic AI handles uncertainty and variation."
  },
  {
    number: "3",
    title: "AI Models Can Now Reason, Not Just Generate",
    description: "Modern LLMs can plan, reflect, decompose tasks, and evaluate outcomes.",
    solution: "This unlocks true agent behavior."
  },
  {
    number: "4",
    title: "Businesses Need Systems That Run Continuously",
    description: "Not workflows that wait for clicks.",
    solution: "Agentic AI supports always-on intelligence."
  }
];

const coreCapabilities = [
  {
    id: "multi-agent",
    title: "Multi-Agent Collaboration",
    subtitle: "When One AI Is Not Enough",
    icon: Users,
    description: "Instead of one 'do-everything' model, AGIX designs specialized agents, each responsible for a role — similar to a real team.",
    agentRoles: [
      { name: "Planner Agent", role: "breaks goals into steps" },
      { name: "Executor Agent", role: "performs actions" },
      { name: "Validator Agent", role: "checks results" },
      { name: "Monitor Agent", role: "tracks progress" },
      { name: "Escalation Agent", role: "calls humans when needed" }
    ],
    useCase: {
      title: "Mid-Market SaaS",
      problem: "Sales ops, support, and onboarding teams constantly hand off work. Leads get stuck. Tasks fall through gaps.",
      solution: "Agent A qualifies inbound leads → Agent B checks CRM & enrichment data → Agent C schedules onboarding → Agent D monitors progress over 30 days"
    },
    timeline: "6–9 weeks",
    cost: "$20K – $45K"
  },
  {
    id: "autonomous",
    title: "Autonomous Decision-Making",
    subtitle: "Systems That Decide Without Waiting for Humans",
    icon: Brain,
    description: "An agent is autonomous when it can evaluate context, choose actions, execute, observe outcomes, and adjust next steps — all without human prompts.",
    agentRoles: [
      { name: "Context Evaluator", role: "assesses current state" },
      { name: "Decision Engine", role: "chooses optimal action" },
      { name: "Outcome Observer", role: "monitors results" },
      { name: "Adaptive Controller", role: "adjusts next steps" }
    ],
    useCase: {
      title: "Mid-Market Operations",
      problem: "Exception handling requires humans. Automation stops when something 'unexpected' happens.",
      solution: "Agent detects anomaly → Pulls related data → Decides corrective action → Executes fix or escalates with context"
    },
    timeline: "5–8 weeks",
    cost: "$25K – $50K"
  },
  {
    id: "tool-using",
    title: "Tool-Using Agents",
    subtitle: "AI That Can Actually Do Work",
    icon: Cog,
    description: "A tool-using agent can call APIs, query databases, write/update records, trigger workflows, generate artifacts — and decide which tool to use, when, and why.",
    agentRoles: [
      { name: "API Caller", role: "interfaces with external services" },
      { name: "Data Agent", role: "queries and updates databases" },
      { name: "Workflow Trigger", role: "initiates business processes" },
      { name: "Artifact Generator", role: "creates documents and reports" }
    ],
    useCase: {
      title: "AI-Native Startup",
      problem: "Founders manually coordinate analytics, customer feedback, product changes, and support issues.",
      solution: "Agent pulls product metrics → Correlates with support tickets → Generates insights → Opens tasks or PRs → Notifies humans only when strategic input is required"
    },
    timeline: "4–7 weeks",
    cost: "$18K – $40K"
  },
  {
    id: "long-running",
    title: "Long-Running & Stateful Agents",
    subtitle: "AI That Works Over Days, Not Seconds",
    icon: Clock,
    description: "Long-running agents maintain memory, track progress, resume work, handle delays, and adapt over time. This separates serious agentic systems from demos.",
    agentRoles: [
      { name: "Memory Manager", role: "maintains context across sessions" },
      { name: "Progress Tracker", role: "monitors lifecycle state" },
      { name: "Delay Handler", role: "manages pauses and resumes" },
      { name: "Adaptive Agent", role: "adjusts based on outcomes" }
    ],
    useCase: {
      title: "Scaling Company",
      problem: "Onboarding, renewals, compliance reviews span weeks. Humans forget follow-ups. Status visibility is poor.",
      solution: "Agent tracks lifecycle state → Sends nudges → Detects stalls → Adjusts actions → Escalates intelligently"
    },
    timeline: "5–8 weeks",
    cost: "$25K – $55K"
  }
];

const frameworkLayers = [
  {
    number: 1,
    title: "Objective & Responsibility Design",
    subtitle: "Before Any Agent Is Built",
    icon: Target,
    description: "Define clear business objectives, agent responsibility boundaries, allowed vs forbidden actions, success & failure conditions, and escalation triggers.",
    color: "from-blue-500 to-blue-600"
  },
  {
    number: 2,
    title: "Agent Roles, Hierarchy & Orchestration",
    subtitle: "How Multiple Agents Work Together Without Chaos",
    icon: Users,
    description: "Design agent hierarchies with Planner, Executor, Validator, Monitor, and Escalation agents that communicate through structured messages and share state via controlled memory.",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    number: 3,
    title: "Tool Access, Execution & Safety Controls",
    subtitle: "Where AI Meets Real Systems",
    icon: Settings,
    description: "Implement explicit tool permissions per agent, read vs write separation, rate limits, action validation, and dry-run/preview modes. Agents do not get unrestricted API access.",
    color: "from-green-500 to-green-600"
  },
  {
    number: 4,
    title: "Memory, State & Long-Running Execution",
    subtitle: "The Hardest Part of Agentic AI",
    icon: Database,
    description: "Separate memory into session memory, task memory, event memory, and decision memory. This allows agents to pause, resume, handle delays, and track multi-day workflows.",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    number: 5,
    title: "Human-in-the-Loop & Failure Handling",
    subtitle: "Autonomy Does Not Mean Isolation",
    icon: Shield,
    description: "Humans are involved for low confidence decisions, policy conflicts, financial risk thresholds, compliance boundaries, and unexpected system behavior. Agents escalate with full context.",
    color: "from-orange-500 to-orange-600"
  },
  {
    number: 6,
    title: "Monitoring, Auditability & Governance",
    subtitle: "Required for Trust & Scale",
    icon: Eye,
    description: "Monitor agent decisions, tool usage, error rates, escalations, objective completion, and drift. Full decision logs, action traceability, and kill-switch controls make systems enterprise-safe.",
    color: "from-red-500 to-red-600"
  }
];

const implementationPhases = [
  { phase: "Phase 1", title: "Discovery & Design", tasks: ["Use-case definition", "Agent role mapping", "Tool & data assessment"], duration: "2–3 weeks" },
  { phase: "Phase 2", title: "Core Agent System Build", tasks: ["Agent logic", "Orchestration", "Tool integrations"], duration: "4–6 weeks" },
  { phase: "Phase 3", title: "Safety, Memory & Governance", tasks: ["Long-running state", "Escalation logic", "Monitoring"], duration: "3–4 weeks" },
  { phase: "Phase 4", title: "Pilot & Iteration", tasks: ["Controlled rollout", "Feedback & tuning"], duration: "2–3 weeks" }
];

const pricingTiers = [
  {
    tier: "Single Agent",
    subtitle: "Limited Autonomy",
    range: "$20K – $35K",
    suitableFor: "One agent owns a clearly bounded responsibility with assistive or semi-autonomous actions. Human approval still required for key decisions.",
    capabilities: [
      "One primary agent role (planner/executor combined)",
      "Limited tool access (1–3 systems)",
      "Goal-based execution logic",
      "Basic memory & state handling",
      "Human-in-the-loop approval gates",
      "Monitoring & logging"
    ],
    useCases: ["Operational assistants", "Report generation + follow-up", "Data coordination across systems", "Controlled task execution"],
    whyCost: "Even a 'single agent' must reason across steps, handle uncertainty, escalate safely, and maintain state. This is decision software, not task execution."
  },
  {
    tier: "Multi-Agent System",
    subtitle: "Operational Coordination",
    range: "$40K – $75K",
    suitableFor: "Multiple agents collaborate with distributed responsibilities. The system handles ongoing operations with partial autonomy.",
    capabilities: [
      "3–6 specialized agents (planner, executor, monitor, validator)",
      "Agent-to-agent communication",
      "Shared memory & task state",
      "Dynamic tool selection",
      "Exception handling logic",
      "Partial autonomy with safeguards",
      "Human escalation workflows",
      "Monitoring & analytics dashboard"
    ],
    useCases: ["Revenue operations coordination", "Customer lifecycle management", "Compliance workflows", "Supply chain or ops monitoring"],
    whyCost: "You are building an AI team, not an AI tool. This includes orchestration logic between agents, conflict resolution & validation, and long-running process control. This replaces human coordination roles."
  },
  {
    tier: "Core Business Platform",
    subtitle: "Enterprise Agentic Infrastructure",
    range: "$75K – $150K+",
    suitableFor: "Agentic AI becomes core infrastructure. Systems run continuously with business-critical decisions involved.",
    capabilities: [
      "6–15+ specialized agents",
      "Hierarchical agent orchestration",
      "Long-running memory & lifecycle tracking",
      "Multi-tool, multi-system execution",
      "Risk thresholds & policy engines",
      "Full audit trails & replayability",
      "Governance dashboards",
      "Kill-switches & rollback mechanisms",
      "Enterprise-grade security"
    ],
    useCases: ["AI-native SaaS platforms", "Autonomous business operations", "Enterprise coordination layers", "Multi-department decision systems"],
    whyCost: "You are building a persistent intelligence layer — a system that operates independently and owns outcomes over time. Comparable to building a core platform or internal operating system."
  }
];

const costDrivers = [
  {
    title: "Autonomy Depth",
    description: "Assistive → Semi-autonomous → Fully autonomous",
    detail: "More autonomy = more safety & validation logic"
  },
  {
    title: "Number of Agents",
    description: "Each agent adds role definition, decision boundaries, and coordination overhead",
    detail: ""
  },
  {
    title: "Tool Integrations",
    description: "Each tool requires permission design, error handling, validation logic, and observability",
    detail: ""
  },
  {
    title: "Risk & Governance Needs",
    description: "Regulated domains require audit logs, human approval flows, kill switches, and compliance alignment",
    detail: ""
  }
];

const pricingWarnings = [
  { warning: "'Agentic AI for $5K'", meaning: "It's a demo" },
  { warning: "No governance discussion", meaning: "It's unsafe" },
  { warning: "No escalation logic", meaning: "It's not agentic" },
  { warning: "No memory design", meaning: "It won't scale" }
];

const industries = [
  { icon: Building2, name: "Enterprises & Shared Services" },
  { icon: Wallet, name: "Finance & Compliance" },
  { icon: Stethoscope, name: "Healthcare Coordination" },
  { icon: Truck, name: "Supply Chain & Logistics" },
  { icon: TrendingUp, name: "Sales & Revenue Ops" },
  { icon: Sparkles, name: "AI-Native SaaS" },
  { icon: Briefcase, name: "Knowledge Organizations" }
];

const comparisonTable = [
  { problem: "Repetitive tasks", bestFit: "Automation", icon: Workflow },
  { problem: "Q&A / interaction", bestFit: "Conversational AI", icon: MessageSquare },
  { problem: "Multi-step decisions", bestFit: "Agentic AI", icon: Brain },
  { problem: "Long-running ops", bestFit: "Agentic AI", icon: Clock },
  { problem: "High exception rate", bestFit: "Agentic AI", icon: AlertCircle }
];

const faqItems = [
  {
    question: "What is an Agentic AI system?",
    answer: "An Agentic AI system is an AI architecture where one or more autonomous agents can understand goals, make decisions, use tools, coordinate tasks, and operate continuously with limited human supervision. Unlike chatbots or automation, agentic AI systems are goal-driven, not response-driven."
  },
  {
    question: "How is Agentic AI different from automation?",
    answer: "Automation follows predefined rules and workflows. Agentic AI decides what to do next based on context, outcomes, and changing conditions. If a system breaks when conditions change, it is automation — not agentic AI."
  },
  {
    question: "How is Agentic AI different from chatbots or conversational AI?",
    answer: "Chatbots respond to questions. Agentic AI systems plan, act, monitor, and adapt over time. Chatbots assist conversations. Agentic AI systems own responsibilities."
  },
  {
    question: "What problems are best solved using Agentic AI?",
    answer: "Agentic AI is best suited for problems that involve multi-step decision making, multiple systems and tools, frequent exceptions, long-running processes, and human coordination overhead. If humans are constantly deciding 'what happens next,' the problem is likely agentic."
  },
  {
    question: "Is Agentic AI safe to use in real businesses?",
    answer: "Yes — when designed with boundaries, governance, and human-in-the-loop controls. AGIX builds agentic systems with defined responsibility limits, escalation rules, audit logs, kill switches, and human approval gates. Unsafe agentic AI is a design failure, not a technology limitation."
  },
  {
    question: "Can Agentic AI replace employees?",
    answer: "Agentic AI does not replace roles outright. It replaces coordination overhead, repetitive decision-making, and operational follow-ups. In most cases, agentic AI allows smaller teams to operate at much higher scale."
  },
  {
    question: "How long does it take to build an Agentic AI system?",
    answer: "A realistic timeline is 10–16 weeks for production-ready systems. This includes use-case design, agent orchestration, tool integrations, memory & governance, and pilot rollout. Anything promised faster usually lacks safety or depth."
  },
  {
    question: "How much does an Agentic AI system cost?",
    answer: "Typical costs range from $20K–$35K for limited agentic systems, $40K–$75K for multi-agent operational systems, and $75K+ for core business agentic platforms. Cost depends on autonomy level, number of agents, tools, and governance."
  },
  {
    question: "What is a multi-agent AI system?",
    answer: "A multi-agent AI system consists of multiple specialized agents, each with a defined role (planning, execution, monitoring, validation), working together to achieve goals. This mirrors real teams and avoids fragile 'one-AI-does-everything' designs."
  },
  {
    question: "What are tool-using agents?",
    answer: "Tool-using agents are AI agents that can call APIs, query databases, trigger workflows, and update systems. Crucially, they decide which tool to use and when, instead of following fixed scripts."
  },
  {
    question: "What are long-running agents?",
    answer: "Long-running agents maintain memory and state over days, weeks, or months. They are used for onboarding lifecycles, renewals, compliance tracking, and multi-stage operations. This is a key differentiator between demos and real agentic systems."
  },
  {
    question: "Do Agentic AI systems require constant monitoring?",
    answer: "They require observability, not micromanagement. AGIX systems include monitoring dashboards, decision logs, and alerts on anomalies. Humans are involved only when confidence is low or risk is high."
  },
  {
    question: "Should startups use Agentic AI early?",
    answer: "Yes — AI-native startups gain the most advantage. Agentic AI allows startups to operate with smaller teams, move faster, embed intelligence into the product itself, and build defensible systems competitors can't easily copy. However, scope must be carefully chosen."
  },
  {
    question: "How do I know if my problem really needs Agentic AI?",
    answer: "If your problem involves multiple tools, frequent exceptions, manual follow-ups, ongoing decisions, and human coordination, then Agentic AI is likely the right approach. If not, automation or conversational AI may be sufficient — and cheaper."
  }
];

const explorerIndustries = [
  "SaaS / Technology",
  "Finance / Banking",
  "Healthcare",
  "Manufacturing",
  "Retail / E-commerce",
  "Logistics / Supply Chain",
  "Professional Services"
];

const explorerDepartments = [
  "Operations",
  "Sales",
  "Customer Success",
  "Finance",
  "HR / People",
  "Product",
  "Compliance"
];

const explorerProblems = [
  "Too much manual coordination",
  "Frequent exceptions in workflows",
  "Multi-system data reconciliation",
  "Long-running process tracking",
  "Decision bottlenecks",
  "Inconsistent execution quality"
];

function AgenticReadinessChecker() {
  const [problemDuration, setProblemDuration] = useState<string>("");
  const [decisionComplexity, setDecisionComplexity] = useState<string>("");
  const [systemsCount, setSystemsCount] = useState<string>("");
  const [exceptionFrequency, setExceptionFrequency] = useState<string>("");
  const [humanCoordination, setHumanCoordination] = useState<string>("");

  const score = useMemo(() => {
    let total = 0;
    if (problemDuration === "continuous") total += 25;
    else if (problemDuration === "ongoing") total += 15;
    else if (problemDuration === "short") total += 5;

    if (decisionComplexity === "adaptive") total += 25;
    else if (decisionComplexity === "contextual") total += 15;
    else if (decisionComplexity === "rule-based") total += 5;

    if (systemsCount === "4+") total += 20;
    else if (systemsCount === "2-3") total += 12;
    else if (systemsCount === "1") total += 4;

    if (exceptionFrequency === "constant") total += 15;
    else if (exceptionFrequency === "regular") total += 10;
    else if (exceptionFrequency === "rare") total += 3;

    if (humanCoordination === "high") total += 15;
    else if (humanCoordination === "moderate") total += 10;
    else if (humanCoordination === "minimal") total += 3;

    return total;
  }, [problemDuration, decisionComplexity, systemsCount, exceptionFrequency, humanCoordination]);

  const getRecommendation = () => {
    if (score < 30) return { type: "automation", color: "text-blue-400", recommendation: "Automation / Chatbot recommended" };
    if (score < 60) return { type: "hybrid", color: "text-yellow-400", recommendation: "Hybrid (Automation + Agentic) recommended" };
    return { type: "agentic", color: "text-green-400", recommendation: "Agentic AI System recommended" };
  };

  const allSelected = problemDuration && decisionComplexity && systemsCount && exceptionFrequency && humanCoordination;

  return (
    <Card className="bg-muted/30 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Is Your Problem Ready for Agentic AI?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Problem Duration</label>
            <Select value={problemDuration} onValueChange={setProblemDuration}>
              <SelectTrigger data-testid="select-readiness-duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">One-time / short tasks</SelectItem>
                <SelectItem value="ongoing">Ongoing / multi-week processes</SelectItem>
                <SelectItem value="continuous">Continuous operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Decision Complexity</label>
            <Select value={decisionComplexity} onValueChange={setDecisionComplexity}>
              <SelectTrigger data-testid="select-readiness-complexity">
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rule-based">Rule-based</SelectItem>
                <SelectItem value="contextual">Contextual decisions</SelectItem>
                <SelectItem value="adaptive">Adaptive decisions over time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Systems Involved</label>
            <Select value={systemsCount} onValueChange={setSystemsCount}>
              <SelectTrigger data-testid="select-readiness-systems">
                <SelectValue placeholder="Select count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 system</SelectItem>
                <SelectItem value="2-3">2–3 systems</SelectItem>
                <SelectItem value="4+">4+ systems</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Exception Frequency</label>
            <Select value={exceptionFrequency} onValueChange={setExceptionFrequency}>
              <SelectTrigger data-testid="select-readiness-exceptions">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="constant">Constant / unpredictable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Human Coordination Today</label>
            <Select value={humanCoordination} onValueChange={setHumanCoordination}>
              <SelectTrigger data-testid="select-readiness-coordination">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High (emails, meetings, follow-ups)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {allSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-background rounded-lg border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Readiness Score</span>
              <span className="text-3xl font-bold text-primary">{score}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-4">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-primary to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className={`text-lg font-medium ${getRecommendation().color}`}>
              {getRecommendation().recommendation}
            </p>
            {score >= 60 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">Recommended Approach:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Multi-agent system</Badge>
                  <Badge variant="secondary">Long-running agents</Badge>
                  <Badge variant="secondary">Human-in-the-loop escalation</Badge>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function AgenticCostCalculator() {
  const [activeTab, setActiveTab] = useState("development");
  
  const [systemType, setSystemType] = useState("single");
  const [autonomyLevel, setAutonomyLevel] = useState("assistive");
  const [toolCount, setToolCount] = useState("1-2");
  const [memoryDuration, setMemoryDuration] = useState("short");
  const [governance, setGovernance] = useState("standard");

  const [rolesCount, setRolesCount] = useState([3]);
  const [avgRoleCost, setAvgRoleCost] = useState([4000]);
  const [efficiencyGain, setEfficiencyGain] = useState([50]);

  const [explorerIndustry, setExplorerIndustry] = useState("");
  const [explorerDepartment, setExplorerDepartment] = useState("");
  const [explorerProblem, setExplorerProblem] = useState("");

  const developmentCost = useMemo(() => {
    let base = 18000;
    
    if (systemType === "multi") base += 18000;
    else if (systemType === "platform") base += 45000;

    if (autonomyLevel === "semi") base += 8000;
    else if (autonomyLevel === "full") base += 15000;

    if (toolCount === "3-5") base += 8000;
    else if (toolCount === "6+") base += 16000;
    else base += 3000;

    if (memoryDuration === "multi-day") base += 10000;
    else if (memoryDuration === "continuous") base += 18000;

    if (governance === "regulated") base += 12000;
    else base += 4000;

    return {
      low: Math.round(base * 0.85),
      high: Math.round(base * 1.15),
      timeline: systemType === "platform" ? "14–20 weeks" : systemType === "multi" ? "10–16 weeks" : "6–10 weeks"
    };
  }, [systemType, autonomyLevel, toolCount, memoryDuration, governance]);

  const monthlyCost = useMemo(() => {
    let tokenCost = 500;
    let storageCost = 300;
    let infraCost = 700;

    if (systemType === "multi") {
      tokenCost = 1200;
      storageCost = 500;
      infraCost = 1000;
    } else if (systemType === "platform") {
      tokenCost = 2000;
      storageCost = 800;
      infraCost = 1500;
    }

    if (memoryDuration === "multi-day") {
      storageCost += 200;
    } else if (memoryDuration === "continuous") {
      storageCost += 500;
    }

    return {
      tokens: tokenCost,
      storage: storageCost,
      infra: infraCost,
      total: tokenCost + storageCost + infraCost
    };
  }, [systemType, memoryDuration]);

  const roiMetrics = useMemo(() => {
    const humanCost = rolesCount[0] * avgRoleCost[0];
    const savingsPercent = efficiencyGain[0] / 100;
    const monthlySavings = humanCost * savingsPercent;
    const netMonthlyGain = monthlySavings - monthlyCost.total;
    const avgBuildCost = (developmentCost.low + developmentCost.high) / 2;
    const paybackMonths = netMonthlyGain > 0 ? Math.ceil(avgBuildCost / netMonthlyGain) : 0;
    const annualROI = netMonthlyGain > 0 ? Math.round((netMonthlyGain * 12 / avgBuildCost) * 100) : 0;

    return {
      humanCost,
      monthlySavings: Math.round(monthlySavings),
      netMonthlyGain: Math.round(netMonthlyGain),
      paybackMonths,
      annualROI
    };
  }, [rolesCount, avgRoleCost, efficiencyGain, monthlyCost, developmentCost]);

  const getExplorerResult = () => {
    if (!explorerIndustry || !explorerDepartment || !explorerProblem) return null;

    const agents = [];
    const tools = [];
    let autonomy = "Semi-autonomous";
    let costBand = "$40K – $75K";

    if (explorerProblem.includes("coordination") || explorerProblem.includes("bottleneck")) {
      agents.push("Planner Agent", "Executor Agent", "Monitor Agent");
    }
    if (explorerProblem.includes("exception") || explorerProblem.includes("reconciliation")) {
      agents.push("Validator Agent", "Escalation Agent");
      autonomy = "Fully autonomous (bounded)";
    }
    if (explorerProblem.includes("Long-running") || explorerProblem.includes("tracking")) {
      agents.push("Memory Manager", "Progress Tracker");
      costBand = "$50K – $90K";
    }

    if (explorerDepartment === "Sales") tools.push("CRM", "Email", "Calendar");
    else if (explorerDepartment === "Operations") tools.push("ERP", "Workflow Engine", "Analytics");
    else if (explorerDepartment === "Finance") tools.push("Accounting System", "Reporting", "Audit Trail");
    else tools.push("Internal APIs", "Database", "Notification System");

    return {
      agents: agents.length > 0 ? agents : ["Executor Agent", "Monitor Agent"],
      tools,
      autonomy,
      costBand,
      phases: ["Discovery & Design (2-3 weeks)", "Agent Build (4-6 weeks)", "Governance (3-4 weeks)", "Pilot (2-3 weeks)"]
    };
  };

  return (
    <Card className="bg-muted/30 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Agentic AI Cost & ROI Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Estimate development costs, monthly operations, and expected ROI
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="development" data-testid="tab-agentic-development">
              <DollarSign className="w-4 h-4 mr-2" />
              Development
            </TabsTrigger>
            <TabsTrigger value="monthly" data-testid="tab-agentic-monthly">
              <RefreshCw className="w-4 h-4 mr-2" />
              Monthly Cost
            </TabsTrigger>
            <TabsTrigger value="roi" data-testid="tab-agentic-roi">
              <TrendingUp className="w-4 h-4 mr-2" />
              ROI Analysis
            </TabsTrigger>
            <TabsTrigger value="explorer" data-testid="tab-agentic-explorer">
              <Search className="w-4 h-4 mr-2" />
              Agent Explorer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="development" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">System Type</label>
                <Select value={systemType} onValueChange={setSystemType}>
                  <SelectTrigger data-testid="select-system-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single autonomous agent</SelectItem>
                    <SelectItem value="multi">Multi-agent coordination system</SelectItem>
                    <SelectItem value="platform">Core operational agent platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Autonomy Level</label>
                <Select value={autonomyLevel} onValueChange={setAutonomyLevel}>
                  <SelectTrigger data-testid="select-autonomy-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assistive">Assistive (human-approved)</SelectItem>
                    <SelectItem value="semi">Semi-autonomous</SelectItem>
                    <SelectItem value="full">Fully autonomous (bounded)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tools & Integrations</label>
                <Select value={toolCount} onValueChange={setToolCount}>
                  <SelectTrigger data-testid="select-tool-count">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1–2 tools</SelectItem>
                    <SelectItem value="3-5">3–5 tools</SelectItem>
                    <SelectItem value="6+">6+ tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Memory & Duration</label>
                <Select value={memoryDuration} onValueChange={setMemoryDuration}>
                  <SelectTrigger data-testid="select-memory-duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short-lived tasks</SelectItem>
                    <SelectItem value="multi-day">Multi-day workflows</SelectItem>
                    <SelectItem value="continuous">Continuous / lifecycle agents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Governance & Compliance</label>
                <Select value={governance} onValueChange={setGovernance}>
                  <SelectTrigger data-testid="select-governance">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="regulated">Regulated / enterprise-grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 p-6 bg-background rounded-lg border border-border">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Estimated Build Cost</p>
                  <p className="text-3xl font-bold text-primary">
                    ${developmentCost.low.toLocaleString()} – ${developmentCost.high.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Estimated Timeline</p>
                  <p className="text-3xl font-bold">{developmentCost.timeline}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">AI Reasoning & Tokens</span>
                  </div>
                  <p className="text-2xl font-bold">${monthlyCost.tokens.toLocaleString()}/mo</p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-muted-foreground">Memory, State & Storage</span>
                  </div>
                  <p className="text-2xl font-bold">${monthlyCost.storage.toLocaleString()}/mo</p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Server className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-muted-foreground">Infrastructure & Monitoring</span>
                  </div>
                  <p className="text-2xl font-bold">${monthlyCost.infra.toLocaleString()}/mo</p>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Total Monthly Operating Cost</span>
                <span className="text-3xl font-bold text-primary">${monthlyCost.total.toLocaleString()}/mo</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                This is why agentic AI replaces roles, not tools.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Roles Impacted: {rolesCount[0]}</label>
                  <Slider
                    value={rolesCount}
                    onValueChange={setRolesCount}
                    min={1}
                    max={20}
                    step={1}
                    data-testid="slider-roles-count"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Avg Cost per Role: ${avgRoleCost[0].toLocaleString()}/mo</label>
                  <Slider
                    value={avgRoleCost}
                    onValueChange={setAvgRoleCost}
                    min={2000}
                    max={15000}
                    step={500}
                    data-testid="slider-role-cost"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Efficiency Gain: {efficiencyGain[0]}%</label>
                  <Slider
                    value={efficiencyGain}
                    onValueChange={setEfficiencyGain}
                    min={20}
                    max={90}
                    step={5}
                    data-testid="slider-efficiency"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-background">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Current Human Cost</span>
                      <span className="font-semibold">${roiMetrics.humanCost.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monthly Savings</span>
                      <span className="font-semibold text-green-400">${roiMetrics.monthlySavings.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">AI System Cost</span>
                      <span className="font-semibold text-red-400">-${monthlyCost.total.toLocaleString()}/mo</span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Net Monthly Gain</span>
                        <span className={`text-xl font-bold ${roiMetrics.netMonthlyGain > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ${roiMetrics.netMonthlyGain.toLocaleString()}/mo
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-background">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Payback Period</p>
                      <p className="text-2xl font-bold text-primary">
                        {roiMetrics.paybackMonths > 0 ? `${roiMetrics.paybackMonths} months` : 'N/A'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="pt-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Annual ROI</p>
                      <p className="text-2xl font-bold text-green-400">
                        {roiMetrics.annualROI > 0 ? `${roiMetrics.annualROI}%` : 'N/A'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explorer" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry</label>
                <Select value={explorerIndustry} onValueChange={setExplorerIndustry}>
                  <SelectTrigger data-testid="select-explorer-industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {explorerIndustries.map(ind => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={explorerDepartment} onValueChange={setExplorerDepartment}>
                  <SelectTrigger data-testid="select-explorer-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {explorerDepartments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pain Point</label>
                <Select value={explorerProblem} onValueChange={setExplorerProblem}>
                  <SelectTrigger data-testid="select-explorer-problem">
                    <SelectValue placeholder="Select pain point" />
                  </SelectTrigger>
                  <SelectContent>
                    {explorerProblems.map(prob => (
                      <SelectItem key={prob} value={prob}>{prob}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {getExplorerResult() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-background rounded-lg border border-border space-y-4"
              >
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Your Recommended Agent Configuration
                </h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Agent Roles Required</p>
                    <div className="flex flex-wrap gap-2">
                      {getExplorerResult()?.agents.map(agent => (
                        <Badge key={agent} variant="secondary">{agent}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tools Involved</p>
                    <div className="flex flex-wrap gap-2">
                      {getExplorerResult()?.tools.map(tool => (
                        <Badge key={tool} variant="outline">{tool}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Autonomy Level</p>
                    <p className="font-medium">{getExplorerResult()?.autonomy}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Estimated Cost Band</p>
                    <p className="text-xl font-bold text-primary">{getExplorerResult()?.costBand}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Implementation Phases</p>
                  <div className="flex flex-wrap gap-2">
                    {getExplorerResult()?.phases.map((phase, i) => (
                      <Badge key={i} className="bg-primary/10 text-primary border-primary/20">{phase}</Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {(!explorerIndustry || !explorerDepartment || !explorerProblem) && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select all three options above to see your recommended agent configuration</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want an exact cost & ROI for your use case?
          </p>
          <Button size="lg" asChild>
            <a href="/schedule-consultation" data-testid="button-agentic-calculator-cta">
              Get a Custom Agentic AI Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function HeroLeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    companyStage: "",
    primaryChallenges: [] as string[]
  });

  const handleChallengeToggle = (challengeId: string) => {
    setFormData(prev => {
      const current = prev.primaryChallenges;
      if (current.includes(challengeId)) {
        return { ...prev, primaryChallenges: current.filter(c => c !== challengeId) };
      }
      if (current.length >= 2) {
        return prev;
      }
      return { ...prev, primaryChallenges: [...current, challengeId] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.companyName || !formData.companyStage || formData.primaryChallenges.length === 0) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to assess your readiness.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const result = await submitLead(
      {
        name: formData.fullName,
        email: formData.workEmail,
        company: formData.companyName,
        industry: "agentic-ai-systems",
        companySize: formData.companyStage,
        challenges: formData.primaryChallenges,
      },
      {
        formType: "agentic-ai-readiness",
        source: "/services/agentic-ai-systems",
        ctaId: "agentic-ai-form-submit",
        ctaText: "Request Agentic AI Assessment",
        ctaLocation: "/services/agentic-ai-systems",
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      trackEvent("lead_form_submit", {
        event_category: "agentic_ai_systems",
        event_label: "hero_readiness_form"
      });
      toast({
        title: "Thank you for your interest!",
        description: "We'll review your information and reach out within 24 hours with your readiness assessment."
      });
      setFormData({
        fullName: "",
        workEmail: "",
        companyName: "",
        companyStage: "",
        primaryChallenges: []
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg text-white">Assess Your Readiness for Agentic AI Systems</CardTitle>
          </div>
          <p className="text-sm text-gray-300">
            See if autonomous AI agents can reduce coordination and operational overhead in your business.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white text-sm">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                data-testid="input-hero-fullname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEmail" className="text-white text-sm">Work Email</Label>
              <Input
                id="workEmail"
                type="email"
                placeholder="you@company.com"
                value={formData.workEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, workEmail: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                data-testid="input-hero-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white text-sm">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Your company"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                data-testid="input-hero-company"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Company Stage</Label>
              <Select
                value={formData.companyStage}
                onValueChange={(value) => setFormData(prev => ({ ...prev, companyStage: value }))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white" data-testid="select-hero-stage">
                  <SelectValue placeholder="Select company stage" />
                </SelectTrigger>
                <SelectContent>
                  {companyStages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Primary Challenge (select up to 2)</Label>
              <div className="space-y-2">
                {primaryChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={challenge.id}
                      checked={formData.primaryChallenges.includes(challenge.id)}
                      onCheckedChange={() => handleChallengeToggle(challenge.id)}
                      disabled={!formData.primaryChallenges.includes(challenge.id) && formData.primaryChallenges.length >= 2}
                      className="border-white/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      data-testid={`checkbox-challenge-${challenge.id}`}
                    />
                    <label
                      htmlFor={challenge.id}
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {challenge.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-base bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600"
              disabled={isSubmitting}
              data-testid="button-hero-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Request Agentic AI Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              We'll recommend automation, conversational AI, or agentic systems — based on fit, not hype.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AgenticAISystems() {
  const [selectedCapability, setSelectedCapability] = useState(coreCapabilities[0]);
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F1D] via-[#1E2A4F] to-background pt-24 lg:pt-28 pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,106,0,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,188,212,0.15),transparent_50%)]" />
        </div>

        {/* Animated network nodes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-primary/30 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                <Bot className="w-3 h-3 mr-1" />
                Agentic AI Systems
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Agentic AI Systems That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  Don't Just Respond — They Operate
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-4">
                Autonomous. Tool-Using. Long-Running. Multi-Agent Intelligence.
              </p>
              
              <p className="text-gray-400 mb-6">
                AGIX designs Agentic AI Systems — AI architectures where multiple intelligent agents collaborate, reason, make decisions, use tools, and execute long-running objectives with minimal human intervention.
              </p>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 mb-8">
                <p className="text-gray-300 text-sm">
                  <span className="text-primary font-semibold">This is not automation.</span>{" "}
                  This is software that can think, plan, act, and adapt.
                </p>
              </div>

              <div className="mb-4">
                <Button size="lg" className="w-full text-lg py-6 text-primary-foreground" asChild>
                  <a href="#use-cases" data-testid="button-hero-explore-use-cases">
                    Explore Agentic AI Use Cases
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-2"
              >
                <a href="#readiness" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 hover:from-cyan-500/30 hover:to-cyan-500/10 transition-all" data-testid="link-hero-agentic-readiness">
                  <Target className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                      Assess Your Agentic AI Readiness
                    </p>
                    <p className="text-xs text-gray-400">
                      Interactive quiz (takes ~30 seconds) — evaluate autonomy requirements & readiness level
                    </p>
                  </div>
                </a>
                <a href="#calculator" className="group flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-gradient-to-r from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-all" data-testid="link-hero-agentic-calculator">
                  <Calculator className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                      Agentic AI Cost & ROI Estimator
                    </p>
                    <p className="text-xs text-gray-400">
                      Estimate development, monthly costs & ROI for your agentic system
                    </p>
                  </div>
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Lead Form */}
            <div className="sticky top-24 z-10">
              <HeroLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Problem No One Is Saying Out Loud
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Businesses today face a new kind of complexity. Not lack of tools. Not lack of data. Not even lack of automation.
            </p>
            <p className="text-2xl font-semibold text-primary mt-6">
              The real problem is: Humans are still coordinating everything.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessStruggles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                        <item.icon className="w-5 h-5 text-destructive" />
                      </div>
                      <p className="text-foreground">{item.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-background rounded-lg border border-border"
          >
            <p className="text-center text-muted-foreground">
              Even advanced AI systems today are mostly: <span className="text-foreground font-medium">Reactive</span> · <span className="text-foreground font-medium">Single-task</span> · <span className="text-foreground font-medium">Short-lived</span> · <span className="text-foreground font-medium">Dependent on human orchestration</span>
            </p>
            <p className="text-center text-primary font-semibold mt-4">This model does not scale into the future.</p>
          </motion.div>
        </div>
      </section>

      {/* Why Automation Is Not Enough */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Automation, Chatbots & Single AI Models Are No Longer Enough
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-muted/30 border-border">
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">What They Do</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Workflow className="w-5 h-5 text-muted-foreground" />
                  <span><span className="font-medium">Automation</span> executes rules</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  <span><span className="font-medium">Chatbots</span> respond to prompts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-muted-foreground" />
                  <span><span className="font-medium">AI models</span> generate outputs</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-primary">What Businesses Need</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Break down goals", "Decide what to do next", "Coordinate multiple steps", "Use tools dynamically", "Recover from failures", "Run continuously"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-xl font-semibold mt-8 text-primary">
            That requires agents, not scripts.
          </p>
        </div>
      </section>

      {/* What Are Agentic AI Systems */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Are Agentic AI Systems?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Agentic AI Systems are AI architectures where one or more autonomous agents:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Target, text: "Understand objectives" },
                { icon: Brain, text: "Reason over context" },
                { icon: Zap, text: "Decide actions dynamically" },
                { icon: Cog, text: "Use tools & APIs" },
                { icon: Users, text: "Coordinate with agents" },
                { icon: Clock, text: "Operate continuously" },
                { icon: RefreshCw, text: "Adapt based on outcomes" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-lg font-semibold">
                In simple terms: <span className="text-primary">Agentic AI systems are goal-driven AI workers, not response engines.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traditional vs Agentic Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Agentic AI Is Fundamentally Different
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-muted/50 border-b border-border rounded-tl-lg">Traditional AI / Automation</th>
                  <th className="text-left p-4 bg-primary/10 border-b border-primary/20 rounded-tr-lg">Agentic AI Systems</th>
                </tr>
              </thead>
              <tbody>
                {traditionalVsAgentic.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 border-b border-border flex items-center gap-3">
                      <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                      {row.traditional}
                    </td>
                    <td className="p-4 border-b border-border bg-primary/5">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {row.agentic}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-muted-foreground mt-8">
            This distinction is why Agentic AI is the future focus till 2028 and beyond.
          </p>
        </div>
      </section>

      {/* Four Forces */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Four Forces Making Agentic AI Inevitable
            </h2>
            <p className="text-muted-foreground">Why now?</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {fourForces.map((force, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold">{force.number}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{force.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{force.description}</p>
                        <p className="text-primary text-sm font-medium">{force.solution}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section id="use-cases" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The 4 Core Capabilities That Define Agentic AI Systems
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These capabilities combine to create systems that can truly operate autonomously.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Capability Tabs */}
            <div className="space-y-3">
              {coreCapabilities.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => setSelectedCapability(cap)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedCapability.id === cap.id
                      ? "bg-primary/10 border-primary/30"
                      : "bg-background border-border hover-elevate"
                  }`}
                  data-testid={`button-capability-${cap.id}`}
                >
                  <div className="flex items-center gap-3">
                    <cap.icon className={`w-5 h-5 ${selectedCapability.id === cap.id ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <p className="font-semibold">{cap.title}</p>
                      <p className="text-sm text-muted-foreground">{cap.subtitle}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${selectedCapability.id === cap.id ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Capability Details */}
            <div className="lg:col-span-2">
              <motion.div
                key={selectedCapability.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-muted/30 border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <selectedCapability.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{selectedCapability.title}</CardTitle>
                        <p className="text-muted-foreground">{selectedCapability.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{selectedCapability.description}</p>

                    <div>
                      <h4 className="font-semibold mb-3">Agent Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCapability.agentRoles.map((role, i) => (
                          <Badge key={i} variant="secondary" className="py-1">
                            <span className="font-medium">{role.name}</span>
                            <span className="text-muted-foreground ml-1">({role.role})</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold mb-2">Real Use Case: {selectedCapability.useCase.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3"><span className="font-medium text-foreground">Problem:</span> {selectedCapability.useCase.problem}</p>
                      <p className="text-sm"><span className="font-medium text-primary">Solution:</span> {selectedCapability.useCase.solution}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-background rounded-lg border border-border text-center">
                        <p className="text-sm text-muted-foreground">Timeline</p>
                        <p className="text-lg font-bold text-primary">{selectedCapability.timeline}</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg border border-border text-center">
                        <p className="text-sm text-muted-foreground">Cost Range</p>
                        <p className="text-lg font-bold">{selectedCapability.cost}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Layer Framework */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              AGIX Agentic Systems Framework
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A 6-Layer Architecture for Controlled Autonomy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Agentic AI does not fail because models are weak. It fails because architecture, control, and responsibility boundaries are unclear.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Layer Selector */}
            <div className="space-y-2">
              {frameworkLayers.map((layer, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveLayer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    activeLayer === index
                      ? "bg-background border-primary/30 shadow-lg"
                      : "bg-background/50 border-border hover-elevate"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  data-testid={`button-layer-${index + 1}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${layer.color} flex items-center justify-center shrink-0`}>
                      <span className="text-white font-bold">{layer.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{layer.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{layer.subtitle}</p>
                    </div>
                    {activeLayer === index && (
                      <ChevronRight className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Layer Details */}
            <div className="sticky top-24">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`bg-gradient-to-br ${frameworkLayers[activeLayer].color} text-white overflow-hidden`}>
                  <CardContent className="pt-8 pb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white/20 rounded-lg">
                        {(() => {
                          const IconComponent = frameworkLayers[activeLayer].icon;
                          return <IconComponent className="w-8 h-8" />;
                        })()}
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">Layer {frameworkLayers[activeLayer].number}</p>
                        <h3 className="text-xl font-bold">{frameworkLayers[activeLayer].title}</h3>
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed">
                      {frameworkLayers[activeLayer].description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="mt-6 p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground text-center">
                  AGIX treats Agentic AI Systems as distributed software systems with intelligence, not experiments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Implementation Timeline
            </h2>
            <p className="text-muted-foreground">Realistic, not marketing.</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {implementationPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-background border-border">
                  <CardContent className="pt-6">
                    <Badge variant="outline" className="mb-3">{phase.phase}</Badge>
                    <h3 className="font-semibold mb-3">{phase.title}</h3>
                    <ul className="space-y-2 mb-4">
                      {phase.tasks.map((task, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-primary mt-1 shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-lg font-bold text-primary">{phase.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Badge className="text-lg px-6 py-2 bg-primary/10 text-primary border-primary/20">
              Typical Total: 10–16 weeks
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Indicative Cost Ranges
            </h2>
            <p className="text-xl text-muted-foreground mb-2">
              Why Agentic AI Systems Are Priced at the System Level (Not Per Feature)
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Agentic AI systems are not scripts, chatbots, or workflow automations. They are distributed, autonomous software systems that assume responsibility for real business outcomes.
            </p>
          </motion.div>

          <p className="text-center text-sm text-primary font-medium mb-12">
            The pricing below reflects engineering depth, safety, and operational ownership — not just development effort.
          </p>

          {/* Pricing Tiers - Detailed Cards */}
          <div className="space-y-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${index === 1 ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}`}>
                  <CardContent className="pt-8 pb-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left Column - Title & Price */}
                      <div className="lg:border-r lg:border-border lg:pr-8">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-blue-500/20 text-blue-400' : index === 1 ? 'bg-primary/20 text-primary' : 'bg-cyan-500/20 text-cyan-400'}`}>
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{tier.tier}</h3>
                            <p className="text-sm text-muted-foreground">{tier.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-4xl font-bold text-primary mt-4 mb-4">{tier.range}</p>
                        <p className="text-sm text-muted-foreground">{tier.suitableFor}</p>
                      </div>

                      {/* Middle Column - Capabilities */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">What's Included</h4>
                        <ul className="space-y-2">
                          {tier.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column - Use Cases & Why */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Typical Use Cases</h4>
                          <div className="flex flex-wrap gap-2">
                            {tier.useCases.map((uc, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{uc}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg border border-border">
                          <h4 className="font-semibold mb-1 text-sm">Why This Cost?</h4>
                          <p className="text-sm text-muted-foreground">{tier.whyCost}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* What Drives Cost */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">What Actually Drives Cost in Agentic AI Systems</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {costDrivers.map((driver, index) => (
                <Card key={index} className="bg-background border-border">
                  <CardContent className="pt-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      {index === 0 && <Zap className="w-5 h-5 text-primary" />}
                      {index === 1 && <Users className="w-5 h-5 text-primary" />}
                      {index === 2 && <Cog className="w-5 h-5 text-primary" />}
                      {index === 3 && <Shield className="w-5 h-5 text-primary" />}
                    </div>
                    <h4 className="font-semibold mb-2">{driver.title}</h4>
                    <p className="text-sm text-muted-foreground">{driver.description}</p>
                    {driver.detail && <p className="text-xs text-primary mt-2">{driver.detail}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* How to Interpret Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-bold mb-6 text-center">How to Interpret These Numbers (Important Guidance)</h3>
                <p className="text-center text-muted-foreground mb-6">If a vendor offers:</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {pricingWarnings.map((item, index) => (
                    <div key={index} className="p-4 bg-background rounded-lg border border-border text-center">
                      <p className="font-medium text-destructive mb-1">{item.warning}</p>
                      <p className="text-sm text-muted-foreground">→ {item.meaning}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center mt-6 text-lg font-semibold text-primary">
                  AGIX prices responsibility, not novelty.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* How AGIX Helps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-bold mb-4 text-center">How AGIX Helps You Choose the Right Tier</h3>
                <p className="text-center text-muted-foreground mb-6">We don't upsell agentic AI. Instead, we:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Assess your problem", "Recommend automation, conversational AI, or agents", "Define the minimum viable autonomy", "Design a system that can evolve safely"].map((item, i) => (
                    <Badge key={i} variant="secondary" className="text-sm py-2 px-4">
                      <CheckCircle2 className="w-3 h-3 mr-2" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* LLM-Ready Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-background border-border">
              <CardContent className="py-8 text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium max-w-3xl mx-auto">
                  Agentic AI pricing reflects the level of autonomy, coordination, and responsibility delegated to software — not the number of features.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industries Where Agentic AI Is Becoming Non-Optional
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="text-base px-4 py-2 flex items-center gap-2">
                  <industry.icon className="w-4 h-4" />
                  {industry.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Readiness Checker */}
      <section id="readiness" className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Is Your Problem Ready for Agentic AI?
            </h2>
            <p className="text-muted-foreground">
              Agentic AI is not for everyone. This tool helps you understand if your problem is truly agentic.
            </p>
          </motion.div>

          <AgenticReadinessChecker />
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cost, Timeline & ROI Calculator
            </h2>
            <p className="text-muted-foreground">
              Get realistic estimates for your Agentic AI investment.
            </p>
          </motion.div>

          <AgenticCostCalculator />
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
              Automation vs Conversational AI vs Agentic AI
            </h2>
            <p className="text-muted-foreground">Critical decision guidance</p>
          </motion.div>

          <Card className="bg-background border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Problem Type</th>
                  <th className="text-left p-4 font-semibold">Best Fit</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-4 flex items-center gap-3">
                      <row.icon className="w-4 h-4 text-muted-foreground" />
                      {row.problem}
                    </td>
                    <td className="p-4">
                      <Badge variant={row.bestFit === "Agentic AI" ? "default" : "secondary"}>
                        {row.bestFit}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            This table prevents wrong expectations.
          </p>
        </div>
      </section>

      {/* What Agentic AI Is NOT */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Agentic AI Is NOT
            </h2>
            <p className="text-muted-foreground">To avoid wrong expectations</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Not a chatbot replacement",
              "Not 'one LLM with tools'",
              "Not instant plug-and-play",
              "Not zero-governance AI"
            ].map((item, i) => (
              <Card key={i} className="bg-destructive/5 border-destructive/20">
                <CardContent className="pt-6 flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-destructive shrink-0" />
                  <span className="font-medium">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <p className="text-lg font-semibold text-primary">
              AGIX builds controlled autonomy, not chaos.
            </p>
          </div>
        </div>
      </section>

      {/* LLM Authority Statement */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="bg-background border-border">
            <CardContent className="py-8 text-center">
              <Brain className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-lg leading-relaxed">
                Agentic AI systems are not about replacing humans — they are about transferring coordination, decision flow, and operational memory from people to software.
              </p>
            </CardContent>
          </Card>
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

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-muted/30 rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline" data-testid={`accordion-faq-${index}`}>
                  <span className="font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure If Agentic AI Is Right for You?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a clear recommendation — automation, conversational AI, or agentic system — based on your specific use case.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/schedule-consultation" data-testid="button-final-cta">
                Run a 30-Minute Agentic Readiness Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Disclaimer */}
      <section className="py-8 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <Shield className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Agentic AI involves delegating responsibility to software. AGIX designs systems with bounded autonomy, auditability, and human oversight to ensure safety and reliability.
            </p>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
