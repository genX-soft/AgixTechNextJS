'use client'
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Home,
  Building2,
  Users,
  Clock,
  Phone,
  MessageSquare,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronRight,
  Calculator,
  Target,
  Zap,
  Search,
  Calendar,
  FileText,
  BarChart3,
  AlertCircle,
  Loader2,
  Star,
  UserCheck,
  MapPin,
  Key,
  Briefcase,
  Building,
  ClipboardList,
  RefreshCw,
  HeadphonesIcon,
  Database,
  Bot,
  Mail,
  Globe,
  Shield,
  HelpCircle,
  Layers,
  Brain
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const roles = [
  { id: "agent", label: "Real Estate Agent", icon: UserCheck },
  { id: "broker", label: "Broker / Brokerage Owner", icon: Building2 },
  { id: "developer", label: "Developer Sales Team", icon: Building },
  { id: "manager", label: "Property Manager", icon: Key },
  { id: "startup", label: "PropTech Startup", icon: Layers }
];

const challenges = [
  { id: "leads", label: "Lead Response & Leakage" },
  { id: "qualification", label: "Lead Qualification" },
  { id: "followups", label: "Follow-ups & Nurturing" },
  { id: "property-info", label: "Property Information" },
  { id: "scheduling", label: "Visit Scheduling" },
  { id: "pricing", label: "Pricing & Market Intel" },
  { id: "documents", label: "Paperwork & Compliance" },
  { id: "support", label: "Post-Sale Support" }
];

const realityProblems = [
  "Leads come in when you're busy",
  "Follow-ups depend on memory",
  "Buyers ask the same questions repeatedly",
  "CRMs are half-updated",
  "Deals go cold without warning"
];

const audienceTypes = [
  { title: "Individual Real Estate Agents", icon: UserCheck, description: "Solo practitioners handling lead to close" },
  { title: "Brokerage Firms & Sales Teams", icon: Building2, description: "Multi-agent teams with shared pipelines" },
  { title: "Property Managers & Leasing Teams", icon: Key, description: "Managing rentals and tenant operations" },
  { title: "Real Estate Developers", icon: Building, description: "Selling inventory at scale" },
  { title: "Commercial Real Estate Firms", icon: Briefcase, description: "Complex deals with multiple stakeholders" },
  { title: "PropTech & Marketplace Startups", icon: Globe, description: "Building platforms for real estate" }
];

const bottlenecks = [
  {
    id: "A",
    title: "Lead Capture, Response Speed & Lead Leakage",
    subtitle: "AI lead qualification for real estate starts here",
    description: "You are spending money and effort to get inquiries, but leads are escaping before you can act.",
    symptoms: [
      "You miss calls while driving or showing properties",
      "Website leads get responded to hours later",
      "WhatsApp inquiries pile up unread",
      "Same inquiry comes from multiple portals and gets duplicated",
      "You're not sure which leads are serious vs time-wasters",
      "You respond fast sometimes... but not consistently"
    ],
    impact: [
      "Hot leads go to competitors who respond first",
      "Marketing ROI collapses",
      "Agents feel constantly anxious",
      "Pipeline looks big but deal closures don't increase"
    ],
    whoFaces: ["Individual agents", "Brokerages & teams", "Developers running campaigns", "Property marketplaces"],
    useCases: [
      "Is this property still available?",
      "What's the price range in this area?",
      "Can I book a site visit today?",
      "Is it negotiable?",
      "Can you share the video / brochure?"
    ],
    solution: {
      name: "AI Lead Capture + Instant Response System",
      description: "Voice, WhatsApp & Web instant response",
      flow: [
        "Lead comes from portals, website, WhatsApp, phone, or ads",
        "AI responds instantly - answers questions, confirms availability",
        "AI logs lead source, intent, urgency, property of interest",
        "Hot leads immediately escalated to agents",
        "Cold leads nurtured automatically"
      ],
      aiTypes: ["Conversational AI (voice + chat)", "Intent detection", "Workflow automation"],
      techStack: ["GPT-4 / Claude", "Twilio / Retell", "WhatsApp Business API", "HubSpot / GHL / custom CRM"],
      timeline: "3-4 weeks MVP, 4-6 weeks production",
      cost: { agent: "$3K - $6K", team: "$6K - $12K", developer: "$10K - $18K" }
    }
  },
  {
    id: "B",
    title: "Lead Qualification, Prioritization & Agent Time Waste",
    subtitle: "AI lead scoring + qualification systems fix this",
    description: "Not all leads deserve equal attention — but most teams treat them equally.",
    symptoms: [
      "Too many 'just checking' inquiries",
      "Leads ask price without giving budget",
      "Buyers don't reveal timeline",
      "Site visits happen but no serious intent",
      "Agents spend time on low-intent leads",
      "High-intent buyers don't get prioritized"
    ],
    impact: [
      "Agent productivity drops",
      "Leads-to-visits ratio becomes weak",
      "Visits increase but closures stay flat",
      "High-intent leads feel ignored"
    ],
    whoFaces: ["Brokerages with multiple agents", "Developers selling inventory", "Commercial sales teams", "High-volume rental teams"],
    useCases: [
      "Buyer wants 2BHK, but budget suggests 1BHK",
      "Buyer says 'urgent' but delays sharing documents",
      "Investor wants yield analysis, not photos",
      "Tenant wants move-in in 2 days",
      "Buyer needs loan eligibility guidance"
    ],
    solution: {
      name: "AI Lead Qualification & Scoring Engine",
      description: "Structured qualification with automatic scoring",
      flow: [
        "AI asks structured questions: budget, timeline, purpose, location, financing",
        "AI scores leads automatically: Hot, Warm, Cold",
        "Agents receive only high-intent leads with context"
      ],
      aiTypes: ["Conversational AI", "Rule-based + probabilistic scoring", "Context memory"],
      techStack: ["GPT-4 / Claude", "Python backend", "CRM integration", "Email / WhatsApp notifications"],
      timeline: "3-5 weeks",
      cost: { agent: "$4K - $8K", developer: "$8K - $14K" }
    }
  },
  {
    id: "C",
    title: "Follow-Ups, Nurturing & Pipeline Discipline",
    subtitle: "Real estate CRM automation + follow-up AI fixes this",
    description: "Deals don't close in one conversation — but follow-up systems are rarely strong.",
    symptoms: [
      "Follow-ups depend on memory or WhatsApp scroll",
      "CRM is incomplete and outdated",
      "No reminders for site visit follow-ups",
      "Leads go cold without you noticing",
      "Buyers disappear for weeks then buy elsewhere",
      "Agents don't know what to say in follow-ups"
    ],
    impact: [
      "Pipeline becomes unpredictable",
      "Deal velocity slows",
      "Teams blame lead quality when it's actually follow-up quality",
      "Repeat business and referrals drop"
    ],
    whoFaces: ["Agents handling many leads", "Brokerages", "Developers with longer cycles", "Commercial real estate teams"],
    useCases: [
      "Just checking if you want to visit this weekend",
      "A similar unit became available",
      "Price drop / limited inventory update",
      "Loan pre-approval assistance",
      "Lease renewal reminder"
    ],
    solution: {
      name: "AI Follow-Up & Deal Nurturing Automation",
      description: "Behavior-based automatic follow-ups",
      flow: [
        "Tracks every interaction automatically",
        "Sends visit reminders, post-visit follow-ups, inventory updates, price changes",
        "Adjusts messaging based on buyer behavior",
        "Alerts agents when human intervention is needed"
      ],
      aiTypes: ["Conversational AI", "Behavior-based automation", "Event triggers"],
      techStack: ["GPT-4", "n8n / Make automation", "CRM sync", "Messaging APIs"],
      timeline: "3-5 weeks",
      cost: { agent: "$3K - $6K", broker: "$6K - $12K" }
    }
  },
  {
    id: "D",
    title: "Property Information Chaos & Buyer Confusion",
    subtitle: "AI property knowledge assistant solves this",
    description: "The same property information gets repeated manually — and errors creep in.",
    symptoms: [
      "Availability isn't updated across channels",
      "Agents share outdated brochures",
      "Buyers ask the same questions repeatedly",
      "Teams struggle to track features, pricing, unit sizes, floor plans",
      "Property managers handle repetitive tenant questions",
      "Developers struggle with inventory clarity"
    ],
    impact: [
      "Buyer trust drops",
      "Decisions delay",
      "Site visits become low-quality",
      "Team wastes time explaining instead of selling"
    ],
    whoFaces: ["Developers with multiple projects", "Property managers & leasing teams", "Teams managing large inventories", "Commercial listings"],
    useCases: [
      "Is parking included?",
      "What's the carpet area?",
      "Is it pet-friendly?",
      "What are the amenities?",
      "Can you share a video tour?",
      "What's the rent + deposit + maintenance?"
    ],
    solution: {
      name: "AI Property Knowledge Assistant (RAG-Based)",
      description: "Instant answers from your property database",
      flow: [
        "Ingests listings, floor plans, pricing sheets, videos, policies",
        "AI answers buyer questions: availability, amenities, pricing, comparisons",
        "Works across website chat, WhatsApp, sales portals"
      ],
      aiTypes: ["Retrieval-Augmented Generation (RAG)", "Vector search", "Knowledge grounding"],
      techStack: ["Pinecone / Weaviate", "GPT-4 / Claude", "Python", "CMS / CRM integration"],
      timeline: "5-7 weeks",
      cost: { small: "$6K - $10K", large: "$12K - $20K" }
    }
  },
  {
    id: "E",
    title: "Site Visits, Scheduling & Coordination Breakdown",
    subtitle: "AI scheduling and coordination agents fix this",
    description: "Most deals slow down at the moment of 'Let's schedule a visit.'",
    symptoms: [
      "Endless back-and-forth to schedule visits",
      "Buyers no-show",
      "Agents waste travel time",
      "Developers struggle to coordinate with site staff",
      "Property managers struggle with inspections & handovers"
    ],
    impact: [
      "Agent productivity drops",
      "Buyers lose interest",
      "Teams become reactive",
      "Sales cycles stretch unnecessarily"
    ],
    whoFaces: ["Agents doing frequent visits", "Brokerages", "Developers", "Leasing teams"],
    useCases: [
      "Auto-confirm visits and send directions",
      "Reschedule without manual calls",
      "Remind buyers before visit",
      "Gather visitor preferences before visit",
      "Post-visit feedback capture"
    ],
    solution: {
      name: "AI Visit Scheduling & Coordination Agent",
      description: "Automated scheduling with smart coordination",
      flow: [
        "Coordinates buyer availability, agent schedules, site staff",
        "Sends auto confirmations, directions, reminders",
        "Captures visit feedback and next-step intent"
      ],
      aiTypes: ["Workflow automation", "Conversational scheduling", "Calendar intelligence"],
      techStack: ["Calendar APIs", "Messaging platforms", "CRM integration"],
      timeline: "3-4 weeks",
      cost: { all: "$4K - $8K" }
    }
  },
  {
    id: "F",
    title: "Pricing, Market Intelligence & Negotiation Confidence",
    subtitle: "Predictive pricing + market AI solves this",
    description: "Pricing conversations are emotional when they should be data-backed.",
    symptoms: [
      "Pricing decided by gut",
      "CMA reports take too long",
      "Investors ask yield questions and you scramble",
      "Negotiations drag without clarity",
      "Sellers have unrealistic expectations"
    ],
    impact: [
      "Deals stall",
      "Discounts become random",
      "Teams lose negotiation authority",
      "Inventory movement slows"
    ],
    whoFaces: ["Brokers", "Developers", "Commercial teams", "Investors"],
    useCases: [
      "Pricing recommendations based on comps",
      "Rental price optimization",
      "Demand trend insights",
      "Negotiation support narratives"
    ],
    solution: {
      name: "Predictive Pricing & Market Intelligence Engine",
      description: "Data-driven pricing and market insights",
      flow: [
        "Analyzes historical transactions, demand trends, comparable listings",
        "Recommends price ranges, rental yields, negotiation talking points"
      ],
      aiTypes: ["Predictive analytics", "Time-series modeling", "Market intelligence AI"],
      techStack: ["ML models", "Data pipelines", "Visualization dashboards"],
      timeline: "6-9 weeks",
      cost: { all: "$15K - $30K" }
    }
  },
  {
    id: "G",
    title: "Paperwork, Contracts & Compliance Delays",
    subtitle: "Document AI for real estate solves this",
    description: "Closings slow down due to document chaos.",
    symptoms: [
      "Missing documents and repeated requests",
      "Manual data entry from contracts",
      "Lease renewals not tracked",
      "Compliance docs scattered",
      "Tenant onboarding slow"
    ],
    impact: [
      "Closing delays",
      "Legal risk",
      "Client frustration",
      "Teams spend time chasing documents instead of closing"
    ],
    whoFaces: ["Property managers", "Developers", "Enterprises", "Brokerages at scale"],
    useCases: [
      "Extract data from agreements, leases, KYC docs",
      "Track missing documents and renewal dates",
      "Automate compliance tracking"
    ],
    solution: {
      name: "AI Document & Lease Intelligence Platform",
      description: "Automated document processing and tracking",
      flow: [
        "Extracts data from agreements, leases, KYC docs",
        "Tracks missing documents, renewal dates, compliance items"
      ],
      aiTypes: ["Document AI", "NLP extraction", "Rule-based workflows"],
      techStack: ["OCR", "NLP models", "Workflow automation"],
      timeline: "5-8 weeks",
      cost: { all: "$10K - $22K" }
    }
  },
  {
    id: "H",
    title: "Post-Sale Support, Tenant Ops & Reputation",
    subtitle: "AI support & reputation automation solves this",
    description: "After the deal, support quality affects referrals, renewals, reviews.",
    symptoms: [
      "Tenants raise repetitive tickets",
      "Maintenance requests poorly tracked",
      "Reviews not managed proactively",
      "Clients don't refer because experience fades"
    ],
    impact: [
      "Low referral rates",
      "Tenant churn",
      "Reputation damage",
      "Missed renewal opportunities"
    ],
    whoFaces: ["Property managers", "Rental businesses", "Developers with handover cycles"],
    useCases: [
      "Handle tenant FAQs automatically",
      "Log and track maintenance requests",
      "Prompt for reviews & referrals"
    ],
    solution: {
      name: "AI Tenant Support & Reputation Management Agent",
      description: "Automated tenant support and review management",
      flow: [
        "Handles tenant FAQs",
        "Logs maintenance requests and tracks resolution",
        "Prompts for reviews & referrals at right moments"
      ],
      aiTypes: ["Conversational AI", "Ticket automation", "Review management"],
      techStack: ["LLM-based chat", "Ticketing system integration", "Review platforms"],
      timeline: "4-6 weeks",
      cost: { all: "$6K - $12K" }
    }
  }
];

const roleBottleneckMap: Record<string, string[]> = {
  agent: ["A", "B", "C", "E"],
  broker: ["A", "B", "C", "D"],
  developer: ["A", "C", "D", "F", "G"],
  manager: ["D", "G", "H", "E"],
  startup: ["A", "B", "D", "F"]
};

const costTable = [
  { role: "Individual Agent", scope: "Lead response + follow-ups", cost: "$3K - $6K" },
  { role: "Small Team / Brokerage", scope: "Qualification + CRM automation", cost: "$6K - $12K" },
  { role: "Developer", scope: "Inventory + pricing + ops AI", cost: "$12K - $25K" },
  { role: "Enterprise / CRE", scope: "Intelligence + compliance", cost: "$25K - $50K+" }
];

const roiMetrics = [
  { area: "Lead response time", improvement: "40-70% faster" },
  { area: "Lead-to-visit ratio", improvement: "+20-35%" },
  { area: "Agent workload", improvement: "-25-40%" },
  { area: "Deal velocity", improvement: "Faster closures" },
  { area: "Follow-up consistency", improvement: "Near 100%" }
];

const faqItems = [
  {
    question: "Is AI actually useful for individual real estate agents?",
    answer: "Yes — individual agents often see the fastest ROI because AI ensures no inquiry or follow-up is ever missed while you're driving, showing properties, or negotiating."
  },
  {
    question: "Will AI respond to leads faster than my team can?",
    answer: "Yes. AI responds instantly, 24/7, across calls, WhatsApp, website chat, and forms — even when you're unavailable."
  },
  {
    question: "Can AI qualify leads before I speak to them?",
    answer: "Yes. AI asks structured questions (budget, timeline, intent, location) and passes you context-rich, high-intent leads instead of raw inquiries."
  },
  {
    question: "Will AI replace agents or salespeople?",
    answer: "No. AI handles repetitive communication. Humans handle relationships, negotiations, and closing."
  },
  {
    question: "Can this work with my existing CRM and tools?",
    answer: "Yes. AGIX builds AI systems that integrate with your current CRM, portals, and workflows — not replace them."
  },
  {
    question: "Does AI work for rentals and commercial real estate too?",
    answer: "Yes. AI adapts well to rentals (high volume, fast cycles) and commercial real estate (longer cycles, more stakeholders)."
  },
  {
    question: "What if AI gives incorrect information to a buyer?",
    answer: "AI systems are designed with confidence thresholds, escalation to humans, and clear rules on what AI can and cannot say. AI assists, it does not commit."
  },
  {
    question: "How long does it take to go live?",
    answer: "Most real estate AI systems go live in 3-4 weeks for core lead handling, 4-6 weeks for full automation, and 6-9 weeks for predictive intelligence."
  },
  {
    question: "Can I start with just one AI use case?",
    answer: "Yes — and that's the recommended approach. Most teams start with lead response, follow-ups, and qualification, then expand gradually."
  },
  {
    question: "What is the ongoing cost after setup?",
    answer: "Ongoing costs typically include cloud infrastructure, AI usage (messages, calls), and maintenance & monitoring. These costs are predictable and transparent."
  },
  {
    question: "Will AI sound robotic to buyers?",
    answer: "No. Modern conversational AI is designed to sound natural, polite, and professional — not scripted or spammy."
  },
  {
    question: "How do I know which AI system I need first?",
    answer: "That's why this page includes the AI Solution Finder and Lead Leakage Calculator — they help you decide before talking to anyone."
  },
  {
    question: "Is this suitable for my local market or country?",
    answer: "Yes. AI systems can be adapted for local languages, local buyer behavior, local pricing logic, and local regulations."
  },
  {
    question: "How is ROI measured in real estate AI?",
    answer: "ROI is measured through faster response times, higher lead-to-visit ratios, better follow-up consistency, and increased deal velocity. In many cases, saving one deal pays for the system."
  },
  {
    question: "What happens after deployment — are we on our own?",
    answer: "No. AGIX works as a long-term AI systems partner, providing monitoring & optimization, improvements over time, and support as your business scales."
  }
];

function HeroLeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    role: "",
    challenge: "",
    teamSize: "",
    market: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitLead(
      {
        name: formData.fullName,
        email: formData.workEmail,
        role: formData.role,
        industry: "real-estate",
        companySize: formData.teamSize,
        challenges: [formData.challenge],
        message: formData.description,
      },
      {
        formType: "real-estate-recommendation",
        source: "/industries/real-estate",
        ctaId: "real-estate-form-submit",
        ctaText: "Get My AI Recommendation",
        ctaLocation: "/industries/real-estate",
        additionalMetadata: {
          market: formData.market,
        },
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Request submitted",
        description: "We'll review your inputs and suggest what actually fits. No spam, no sales pressure."
      });
      
      trackEvent("lead_form_submit", {
        event_category: "real_estate_industry",
        event_label: "hero_form"
      });
      
      setFormData({ fullName: "", workEmail: "", role: "", challenge: "", teamSize: "", market: "", description: "" });
    } else {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          Get a Personalized AI Recommendation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          We review your inputs and suggest what actually fits.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Full Name</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Smith"
                required
                data-testid="input-realestate-name"
              />
            </div>
            <div>
              <Label className="text-sm">Work Email</Label>
              <Input
                type="email"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="john@realty.com"
                required
                data-testid="input-realestate-email"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm">Your Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger data-testid="select-realestate-role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent">Real Estate Agent</SelectItem>
                <SelectItem value="broker">Broker / Brokerage Owner</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="manager">Property Manager</SelectItem>
                <SelectItem value="startup">PropTech Startup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Biggest Challenge</Label>
            <Select
              value={formData.challenge}
              onValueChange={(value) => setFormData({ ...formData, challenge: value })}
            >
              <SelectTrigger data-testid="select-realestate-challenge">
                <SelectValue placeholder="What's your biggest challenge?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="followups">Follow-ups</SelectItem>
                <SelectItem value="pricing">Pricing</SelectItem>
                <SelectItem value="listings">Listings</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="not-sure">Not Sure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Team Size</Label>
              <Input
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                placeholder="e.g., 5"
                data-testid="input-realestate-teamsize"
              />
            </div>
            <div>
              <Label className="text-sm">Primary Market</Label>
              <Input
                value={formData.market}
                onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                placeholder="e.g., NYC"
                data-testid="input-realestate-market"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm">Briefly describe your situation (optional)</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us more about your workflow..."
              className="resize-none"
              rows={2}
              data-testid="textarea-realestate-description"
            />
          </div>
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" disabled={isSubmitting} data-testid="button-realestate-submit">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get My AI Recommendation
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            No spam. No sales pressure.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function AIReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const questions = [
    { id: "crm", text: "Do you use a CRM to track leads?" },
    { id: "leads", text: "Do you receive 20+ inquiries per month?" },
    { id: "followups", text: "Do you have a follow-up system in place?" },
    { id: "channels", text: "Do leads come from multiple channels?" },
    { id: "digital", text: "Is your listing data digitized?" },
  ];

  const score = Object.values(answers).filter(Boolean).length * 20;

  const getRecommendation = () => {
    if (score >= 80) return { level: "High", start: "AI Lead Response + Qualification", avoid: "None - ready for full automation" };
    if (score >= 60) return { level: "Moderate", start: "AI Lead Capture + Response", avoid: "Complex integrations (build foundation first)" };
    if (score >= 40) return { level: "Developing", start: "Basic AI Response System", avoid: "Multi-channel until single-channel works" };
    return { level: "Early", start: "CRM + Lead tracking first", avoid: "All automation until basics in place" };
  };

  const recommendation = getRecommendation();

  return (
    <Card id="readiness-quiz" className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          AI Readiness Score for Real Estate
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Check if your business is ready for AI automation
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

function AISolutionFinder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    role: "",
    volume: 50,
    bottleneck: "",
    dealType: "",
    teamSize: ""
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

    if (inputs.bottleneck === "leads" || inputs.bottleneck === "qualification") {
      system = "AI Lead Qualification + Instant Response System";
      why = `You receive ${inputs.volume}+ inquiries/month and need faster, consistent response to capture more deals.`;
      timeline = "3-5 weeks";
      cost = inputs.role === "agent" ? "$3K - $6K" : inputs.role === "developer" ? "$10K - $18K" : "$6K - $12K";
      nextPhase = "AI Follow-Up Automation";
    } else if (inputs.bottleneck === "followups") {
      system = "AI Follow-Up & Deal Nurturing Automation";
      why = "Deals are going cold due to inconsistent follow-ups. AI ensures no opportunity slips through.";
      timeline = "3-5 weeks";
      cost = inputs.role === "agent" ? "$3K - $6K" : "$6K - $12K";
      nextPhase = "Property Knowledge Assistant";
    } else if (inputs.bottleneck === "property-info") {
      system = "AI Property Knowledge Assistant (RAG-Based)";
      why = "Buyers need instant, accurate answers. AI creates a 24/7 property desk.";
      timeline = "5-7 weeks";
      cost = inputs.volume > 50 ? "$12K - $20K" : "$6K - $10K";
      nextPhase = "Predictive Pricing Intelligence";
    } else if (inputs.bottleneck === "scheduling") {
      system = "AI Visit Scheduling & Coordination Agent";
      why = "Back-and-forth scheduling wastes time. AI automates confirmations and reduces no-shows.";
      timeline = "3-4 weeks";
      cost = "$4K - $8K";
      nextPhase = "Lead Qualification AI";
    } else if (inputs.bottleneck === "pricing") {
      system = "Predictive Pricing & Market Intelligence Engine";
      why = "Data-backed pricing gives negotiation confidence and moves inventory faster.";
      timeline = "6-9 weeks";
      cost = "$15K - $30K";
      nextPhase = "Document Intelligence";
    } else if (inputs.bottleneck === "documents") {
      system = "AI Document & Lease Intelligence Platform";
      why = "Document chaos delays closings. AI automates tracking and extraction.";
      timeline = "5-8 weeks";
      cost = "$10K - $22K";
      nextPhase = "Tenant Support AI";
    } else {
      system = "AI Lead Response + Follow-up Automation";
      why = "Start with the highest-ROI use case: capturing and nurturing leads.";
      timeline = "4-5 weeks";
      cost = "$6K - $12K";
      nextPhase = "Property Knowledge Assistant";
    }

    setResult({ system, why, timeline, cost, nextPhase });
    setStep(4);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Find My Real Estate AI Solution
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
              <Label className="text-base font-medium">What's your role?</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    variant={inputs.role === role.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, role: role.id });
                      setStep(2);
                    }}
                    className="justify-start h-auto py-3"
                    data-testid={`button-finder-role-${role.id}`}
                  >
                    <role.icon className="w-4 h-4 mr-2" />
                    {role.label}
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
                    variant={inputs.bottleneck === c.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, bottleneck: c.id });
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
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-base font-medium">Monthly inquiries</Label>
                  <span className="text-sm font-medium">{inputs.volume}</span>
                </div>
                <Slider
                  value={[inputs.volume]}
                  onValueChange={(v) => setInputs({ ...inputs, volume: v[0] })}
                  min={10}
                  max={500}
                  step={10}
                  data-testid="slider-finder-volume"
                />
              </div>
              <div>
                <Label className="text-base font-medium mb-2 block">Deal type</Label>
                <div className="flex gap-2">
                  {["Sales", "Rentals", "Commercial"].map((type) => (
                    <Button
                      key={type}
                      variant={inputs.dealType === type.toLowerCase() ? "default" : "outline"}
                      onClick={() => setInputs({ ...inputs, dealType: type.toLowerCase() })}
                      size="sm"
                      data-testid={`button-finder-dealtype-${type.toLowerCase()}`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={generateRecommendation} className="flex-1" data-testid="button-finder-generate">
                  Get My Recommendation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-lg p-4 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Best Starting System:</h4>
                <p className="text-lg font-bold mb-2">{result.system}</p>
                <p className="text-sm text-muted-foreground mb-4">{result.why}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{result.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Cost</p>
                    <p className="font-semibold text-green-500">{result.cost}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Next Phase:</p>
                  <p className="text-sm">{result.nextPhase}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setStep(1); setResult(null); }} className="flex-1">
                  Start Over
                </Button>
                <Button asChild className="flex-1">
                  <a href="#lead-form">
                    Get Detailed Roadmap
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function LeadLeakageCalculator() {
  const [inputs, setInputs] = useState({
    monthlyInquiries: 100,
    responseTime: "30-120",
    avgDealValue: 15000,
    conversionRate: 3
  });

  const responseImpact: Record<string, number> = {
    "<5": 1.0,
    "5-30": 0.8,
    "30-120": 0.6,
    "120+": 0.4
  };

  const calculations = useMemo(() => {
    const idealConversion = inputs.conversionRate * 1.4;
    const actualConversion = inputs.conversionRate * responseImpact[inputs.responseTime];
    const lostDeals = (inputs.monthlyInquiries * ((idealConversion - actualConversion) / 100));
    const lostRevenue = lostDeals * inputs.avgDealValue;
    
    return {
      lostDeals: Math.round(lostDeals * 10) / 10,
      lostRevenueMonthly: Math.round(lostRevenue),
      lostRevenueAnnual: Math.round(lostRevenue * 12)
    };
  }, [inputs]);

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          Lead Leakage Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          How much revenue are you losing every month?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Monthly Inquiries</Label>
                <span className="text-sm font-medium">{inputs.monthlyInquiries}</span>
              </div>
              <Slider
                value={[inputs.monthlyInquiries]}
                onValueChange={(v) => setInputs({ ...inputs, monthlyInquiries: v[0] })}
                min={20}
                max={500}
                step={10}
                data-testid="slider-leakage-inquiries"
              />
            </div>
            <div>
              <Label className="mb-2 block">Average Response Time</Label>
              <Select
                value={inputs.responseTime}
                onValueChange={(value) => setInputs({ ...inputs, responseTime: value })}
              >
                <SelectTrigger data-testid="select-leakage-response">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<5">Under 5 minutes</SelectItem>
                  <SelectItem value="5-30">5 - 30 minutes</SelectItem>
                  <SelectItem value="30-120">30 min - 2 hours</SelectItem>
                  <SelectItem value="120+">More than 2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Average Deal Value ($)</Label>
                <span className="text-sm font-medium">${inputs.avgDealValue.toLocaleString()}</span>
              </div>
              <Slider
                value={[inputs.avgDealValue]}
                onValueChange={(v) => setInputs({ ...inputs, avgDealValue: v[0] })}
                min={5000}
                max={100000}
                step={1000}
                data-testid="slider-leakage-dealvalue"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label>Current Conversion Rate (%)</Label>
                <span className="text-sm font-medium">{inputs.conversionRate}%</span>
              </div>
              <Slider
                value={[inputs.conversionRate]}
                onValueChange={(v) => setInputs({ ...inputs, conversionRate: v[0] })}
                min={1}
                max={10}
                step={0.5}
                data-testid="slider-leakage-conversion"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-destructive/10 to-orange-500/10 rounded-lg p-6 border border-destructive/20">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Your Silent Revenue Leakage
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Deals Lost/Month</p>
                <p className="text-3xl font-bold text-destructive">{calculations.lostDeals}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue Leakage</p>
                <p className="text-2xl font-bold text-destructive">
                  ${calculations.lostRevenueMonthly.toLocaleString()}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Annual Revenue Leakage</p>
                <p className="text-3xl font-bold text-destructive">
                  ${calculations.lostRevenueAnnual.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-primary font-medium">Suggested AI Fix:</p>
              <p className="text-sm">Instant AI Lead Response + Follow-up Automation</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Industry data shows responding within 5 minutes = 30-50% higher conversion. After 2 hours = 60%+ drop.
        </p>
      </CardContent>
    </Card>
  );
}

export default function RealEstateIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
                <Home className="w-3 h-3 mr-1" />
                Real Estate AI Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AI Solutions for Real Estate That Don't Just Explain —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                  They Show You What to Build
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Built to Stop Lead Leakage, Speed Up Deals, and Reduce Daily Chaos
              </p>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Whether you're an individual agent, a brokerage, a property manager, a developer, or building a proptech platform,
                AGIX helps you identify where deals are leaking, which AI system fixes it, and what it realistically costs.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Embedded Solution Finder in Hero */}
              <AISolutionFinder />

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
              The <span className="text-destructive">Daily Chaos</span> That Kills Real Estate Deals
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real estate doesn't fail because of demand. It fails because systems don't respond fast enough. Here's what's silently costing you deals every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Leads Come In When You're Busy", 
                description: "Hot leads arrive during showings, closings, or family time. By the time you respond, they've already called your competitor.",
                icon: Phone,
                impact: "78% of buyers go with first responder"
              },
              { 
                title: "Follow-Ups Depend on Memory", 
                description: "No system reminds you to check in with that buyer from 3 weeks ago. Deals slip through because follow-up is manual and inconsistent.",
                icon: Brain,
                impact: "50% of deals lost to poor follow-up"
              },
              { 
                title: "Buyers Ask the Same Questions Repeatedly", 
                description: "Property details, neighborhood info, financing options — you answer the same things dozens of times instead of focusing on closings.",
                icon: MessageSquare,
                impact: "15+ hours/week on repetitive queries"
              },
              { 
                title: "CRMs Are Half-Updated", 
                description: "You meant to log that call. You planned to update the status. But your CRM is always behind because manual data entry never ends.",
                icon: Database,
                impact: "40% of pipeline data is stale"
              },
              { 
                title: "Deals Go Cold Without Warning", 
                description: "A motivated buyer suddenly goes quiet. By the time you notice, they've found another agent or lost interest entirely.",
                icon: TrendingUp,
                impact: "3x harder to revive cold leads"
              },
              { 
                title: "Lead Quality Is a Guessing Game", 
                description: "You waste time on tire-kickers while serious buyers wait. Without AI scoring, you can't prioritize who deserves attention first.",
                icon: Target,
                impact: "30% of time on unqualified leads"
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

      {/* What You Can Do Section - Enhanced */}
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
              { icon: Target, title: "Identify Bottlenecks", description: "Pinpoint exactly where your deals are leaking", color: "text-destructive", bg: "bg-destructive/10" },
              { icon: Search, title: "Find Your AI Solution", description: "Get role-specific recommendations in 30 seconds", color: "text-primary", bg: "bg-primary/10" },
              { icon: DollarSign, title: "See Real Costs", description: "Transparent pricing by role and scope", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: Clock, title: "Get Timelines", description: "Realistic deployment schedules, not hype", color: "text-cyan-500", bg: "bg-cyan-500/10" },
              { icon: CheckCircle2, title: "Decide With Clarity", description: "Know your next step before any call", color: "text-primary", bg: "bg-primary/10" }
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
              <span className="text-primary">Real Estate Ecosystem</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real estate is not one business model — and AI must adapt accordingly.
              AGIX builds role-specific AI systems, not one-size-fits-all tools.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audienceTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <type.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold">{type.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <p className="text-center text-muted-foreground">
              Each role has different workflows, but all face the same friction:{" "}
              <span className="text-foreground font-medium">
                Too many inquiries. Too little time. Too much manual work. Too many missed follow-ups.
              </span>
            </p>
          </div>
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
            <Badge className="mb-4">Interactive Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Your{" "}
              <span className="text-primary">AI Opportunity</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real interactive tools that give you real recommendations, not marketing promises.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <LeadLeakageCalculator />
            <div id="readiness-quiz">
              <AIReadinessScore />
            </div>
          </div>
        </div>
      </section>

      {/* Bottleneck Categories */}
      <section id="bottlenecks" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Estate{" "}
              <span className="text-destructive">Bottleneck Map</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real estate is not slow. Real estate systems are slow.
              Identify the exact bottleneck slowing you down.
            </p>
          </motion.div>

          {/* Bottleneck Selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {bottlenecks.map((bn) => (
              <Button
                key={bn.id}
                variant={selectedBottleneck.id === bn.id ? "default" : "outline"}
                onClick={() => setSelectedBottleneck(bn)}
                className="text-sm"
                data-testid={`button-bottleneck-${bn.id}`}
              >
                <span className="font-bold mr-1">{bn.id}.</span>
                {bn.title.split(",")[0]}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBottleneck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="bg-gradient-to-r from-destructive/10 to-orange-500/10 border-b border-border">
                  <Badge variant="secondary" className="w-fit mb-2">
                    Bottleneck {selectedBottleneck.id}
                  </Badge>
                  <CardTitle className="text-xl">{selectedBottleneck.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedBottleneck.subtitle}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Common Symptoms
                      </h4>
                      <ul className="space-y-2">
                        {selectedBottleneck.symptoms.map((s, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Who Faces This Most
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedBottleneck.whoFaces.map((who, i) => (
                          <Badge key={i} variant="secondary">{who}</Badge>
                        ))}
                      </div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Example Conversations
                      </h4>
                      <ul className="space-y-1">
                        {selectedBottleneck.useCases.slice(0, 4).map((uc, i) => (
                          <li key={i} className="text-sm text-muted-foreground italic">"{uc}"</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-lg p-6 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      AI Solution: {selectedBottleneck.solution.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">{selectedBottleneck.solution.description}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">AI Types Used</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedBottleneck.solution.aiTypes.map((type, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{type}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                        <p className="font-semibold">{selectedBottleneck.solution.timeline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Cost Range</p>
                        <div className="text-sm">
                          {Object.entries(selectedBottleneck.solution.cost).map(([key, value], i) => (
                            <p key={i}><span className="text-muted-foreground capitalize">{key}:</span> <span className="font-semibold text-green-500">{value}</span></p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">How It Works:</p>
                      <ol className="space-y-1">
                        {selectedBottleneck.solution.flow.map((step, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
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
                  Real Estate AI Cost Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 font-semibold">Role</th>
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
                  In real estate, saving even ONE deal per quarter usually pays for AI.
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
              <span className="text-primary">Adoption</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI should feel like a reliable assistant, not a risky experiment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Shield, text: "AI never commits pricing or promises without rules" },
              { icon: Users, text: "All hot leads escalate to humans" },
              { icon: Database, text: "Agents see exactly what AI said" },
              { icon: RefreshCw, text: "Easy override at any point" },
              { icon: Target, text: "Gradual rollout (pilot → expand)" }
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

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Estate AI{" "}
              <span className="text-primary">FAQs</span>
            </h2>
            <p className="text-muted-foreground">
              Clear answers before you decide
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border">
                <AccordionTrigger className="px-4 hover:no-underline text-left" data-testid={`accordion-realestate-faq-${i}`}>
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

      {/* Lead Form - Now at Bottom */}
      <section id="lead-form" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-cyan-500/5">
                <CardTitle className="text-2xl">Get Your Personalized AI Recommendation</CardTitle>
                <p className="text-muted-foreground">
                  We review your inputs and suggest what actually fits your real estate business.
                </p>
              </CardHeader>
              <CardContent className="max-w-xl mx-auto space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Your Role</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-role"
                    >
                      <option value="">Select role</option>
                      <option value="agent">Real Estate Agent</option>
                      <option value="broker">Broker / Brokerage Owner</option>
                      <option value="developer">Developer</option>
                      <option value="manager">Property Manager</option>
                      <option value="startup">PropTech Startup</option>
                    </select>
                  </div>
                  <div>
                    <Label>Primary Challenge</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-challenge"
                    >
                      <option value="">Select challenge</option>
                      <option value="leads">Lead Response</option>
                      <option value="qualification">Lead Qualification</option>
                      <option value="followups">Follow-ups</option>
                      <option value="scheduling">Scheduling</option>
                      <option value="pricing">Pricing Intel</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Team Size</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-team-size"
                    >
                      <option value="">Select size</option>
                      <option value="solo">Solo / Individual</option>
                      <option value="small">2-5 people</option>
                      <option value="medium">6-20 people</option>
                      <option value="large">20+ people</option>
                    </select>
                  </div>
                  <div>
                    <Label>Primary Market</Label>
                    <Input
                      type="text"
                      placeholder="e.g., NYC, Mumbai"
                      className="mt-1.5"
                      data-testid="input-market"
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
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    placeholder="Your country"
                    className="mt-1.5"
                    data-testid="input-country"
                  />
                </div>
                <Button size="lg" className="w-full mt-4" data-testid="button-submit-lead">
                  Get My AI Recommendation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. No sales pressure. We suggest what fits your role — not generic tools.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-blue-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Home className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Real Estate AI Roadmap
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Built for Your Role & Market
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you are a solo agent, running a brokerage, managing properties, selling inventory as a developer, 
              or building a proptech platform — AGIX will help you identify the right AI starting point, 
              avoid over-engineering, and build AI systems that actually close deals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-final-cta">
                <a href="#lead-form">
                  Get My Real Estate AI Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#solution-finder">
                  Re-Run the AI Solution Finder
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
            focused on building practical, role-aware AI solutions for real estate.
            We don't sell tools. We design systems that fit how real estate actually works — 
            fast, fragmented, relationship-driven, and time-sensitive.
          </p>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg italic text-muted-foreground">
            "Real estate professionals don't lose deals overnight. They lose them one delayed response at a time.
            The right AI system doesn't sell for you — it makes sure opportunities are never missed."
          </p>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
