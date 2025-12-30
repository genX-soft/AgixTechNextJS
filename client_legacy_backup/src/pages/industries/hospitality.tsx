import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
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
  Sparkles,
  Users,
  FileText,
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
  Heart,
  CalendarDays,
  Phone,
  Eye,
  Activity,
  ChevronDown,
  Loader2,
  Utensils,
  Bed,
  Dumbbell,
  Leaf,
  Smile,
  UserCheck,
  PhoneOff,
  ThumbsUp,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const businessTypes = [
  { id: "hotel", label: "Hotel / Resort", icon: Bed },
  { id: "restaurant", label: "Restaurant / Hospitality Group", icon: Utensils },
  { id: "spa", label: "Spa / Salon / Wellness Center", icon: Sparkles },
  { id: "retreat", label: "Retreat / Lifestyle Brand", icon: Leaf },
  { id: "fitness", label: "Fitness / Mental Wellness", icon: Dumbbell },
  { id: "boutique", label: "Boutique Experience Business", icon: Heart },
];

const challenges = [
  { id: "bookings", label: "Missed Bookings & No-Shows" },
  { id: "guest-experience", label: "Guest Experience & Personalization" },
  { id: "staff-overload", label: "Staff Overload & Burnout" },
  { id: "reviews", label: "Reviews & Reputation" },
  { id: "revenue", label: "Revenue & Upsell Opportunities" },
  { id: "operations", label: "Fragmented Operations" },
  { id: "wellness", label: "Wellness Journey Continuity" },
  { id: "visibility", label: "Experience-Level Visibility" },
];

const realityProblems = [
  "Guests expect personalization, not repetition",
  "Staff are stretched, especially during peaks",
  "Missed calls mean missed experiences",
  "Reviews influence revenue instantly",
  "Operations leak money quietly",
];

const bottlenecks = [
  {
    id: "A",
    title: "Guest Experience & Personalization Gaps",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    symptoms: [
      "Guests say 'They don't remember me'",
      "Preferences not carried across visits",
      "Experience feels generic and impersonal",
      "Disconnected booking, POS, and CRM systems",
      "One-size-fits-all guest journeys",
    ],
    reality: [
      "Guest data exists but is fragmented",
      "Personalization depends on individual staff memory",
      "No unified guest profile across touchpoints",
      "Loyalty programs feel transactional",
    ],
    whoFaces: "Hotels & resorts, Spas & wellness centers, Boutique lifestyle brands",
    whyExists: "Guest data exists—but is fragmented and unused at the moment it matters. Personalization fails when memory lives in people's heads instead of systems.",
    solution: {
      name: "AI Guest Preference & Experience Memory System",
      description: "Guests Feel Recognized, Not Tracked",
      whatItDoes: [
        "Remembers guest preferences, past visits, special requests",
        "Surfaces insights at check-in, service delivery, follow-up",
        "Staff see simple cues, not dashboards",
        "Privacy-first with opt-in consent",
      ],
      aiType: "Profile intelligence + Contextual surfacing",
      techStack: "Python, CRM Integration, PMS/POS APIs",
      timeline: "4-6 weeks",
      costSmall: "$5K - $12K",
      costLarge: "$12K - $18K",
      impact: "Higher guest satisfaction, increased repeat visits, stronger emotional loyalty",
    },
  },
  {
    id: "B",
    title: "Booking, Scheduling & Appointment Friction",
    icon: CalendarDays,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    symptoms: [
      "Missed calls during busy periods",
      "Long response times frustrate guests",
      "Confusing confirmation processes",
      "No easy rescheduling options",
      "High no-show rates",
    ],
    reality: [
      "Front desk overwhelmed at peak times",
      "Manual booking follow-ups take hours",
      "Staff juggle calls while serving guests",
      "After-hours inquiries go unanswered",
    ],
    whoFaces: "Restaurants, Clinics & wellness centers, Retreats & appointment-based businesses",
    whyExists: "Peak demand overwhelms humans—not because they don't care, but because they're busy caring.",
    solution: {
      name: "AI Booking & Appointment Concierge",
      description: "24/7 Booking Support Without Robotic Interactions",
      whatItDoes: [
        "Handles booking inquiries and availability checks",
        "Sends confirmations and reminders automatically",
        "Enables easy rescheduling via text/chat",
        "Escalates only complex cases to staff",
      ],
      aiType: "Conversational AI + Calendar intelligence",
      techStack: "NLP, Booking System APIs, SMS/Email Integration",
      timeline: "3-4 weeks",
      costSmall: "$4K - $8K",
      costLarge: "$8K - $14K",
      impact: "Fewer no-shows, higher booking conversion, less staff stress",
    },
  },
  {
    id: "C",
    title: "Staff Overload & Service Inconsistency",
    icon: Users,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    symptoms: [
      "Variable service quality across shifts",
      "Rushed guest interactions during peaks",
      "Small mistakes adding up to complaints",
      "New staff ramp-up takes too long",
      "Experienced staff burned out",
    ],
    reality: [
      "Staff handle repetitive questions constantly",
      "Manual updates across systems",
      "Coordination tasks eat into guest time",
      "Burnout leads to turnover",
    ],
    whoFaces: "Hotels & resorts, Multi-location brands, High-season businesses",
    whyExists: "Staff handle repetitive questions, manual updates, and coordination tasks—instead of focusing on human moments.",
    solution: {
      name: "AI Staff Assist & Service Consistency Helper",
      description: "Reduce Mental Load, Maintain Quality",
      whatItDoes: [
        "Answers repetitive internal questions instantly",
        "Provides quick SOP reminders in context",
        "Helps new staff ramp faster with guidance",
        "Keeps service consistent during peak hours",
      ],
      aiType: "Internal knowledge assistant + Task automation",
      techStack: "RAG, Internal Knowledge Base, Staff Interface",
      timeline: "4-6 weeks",
      costSmall: "$5K - $10K",
      costLarge: "$10K - $16K",
      impact: "Calmer staff, more consistent guest experience, reduced burnout",
    },
  },
  {
    id: "D",
    title: "Review, Reputation & Feedback Blind Spots",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    symptoms: [
      "Negative reviews caught too late",
      "No pattern analysis across feedback",
      "Feedback scattered across platforms",
      "Response times too slow",
      "Missing early warning signs",
    ],
    reality: [
      "Ratings drop quietly over time",
      "Revenue impact follows reputation drop",
      "Loyal guests drift away without explanation",
      "Staff don't see feedback patterns",
    ],
    whoFaces: "Hotels, Restaurants, Wellness brands with online discovery",
    whyExists: "Feedback is reactive, not intelligent—insights arrive after damage is done.",
    solution: {
      name: "AI Review & Sentiment Intelligence Assistant",
      description: "Catch Issues Early, Protect Reputation",
      whatItDoes: [
        "Monitors reviews, feedback forms, surveys across platforms",
        "Detects emotional patterns and repeated complaints",
        "Provides early warning before ratings drop",
        "Suggests response tone (not scripts)",
      ],
      aiType: "Sentiment analysis + Pattern detection",
      techStack: "NLP, Review APIs, Dashboard Integration",
      timeline: "3-5 weeks",
      costSmall: "$4K - $9K",
      costLarge: "$9K - $15K",
      impact: "Better reviews, faster recovery from issues, stronger reputation control",
    },
  },
  {
    id: "E",
    title: "Revenue Leakage & Missed Upsell Moments",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    symptoms: [
      "Static pricing doesn't adapt to demand",
      "Generic offers that don't resonate",
      "Missed cross-sell opportunities",
      "Staff don't know what to suggest",
      "Revenue per guest plateaus",
    ],
    reality: [
      "Lower revenue per guest than potential",
      "Poor lifetime value optimization",
      "Underutilized services and amenities",
      "Premium experiences go unsold",
    ],
    whoFaces: "Resorts, Wellness retreats, Premium experience brands",
    whyExists: "Upsell decisions depend on human intuition alone, not timely insight.",
    solution: {
      name: "AI Experience-Led Revenue Optimization Assistant",
      description: "Relevant Offers, Not Pressure",
      whatItDoes: [
        "Suggests relevant upgrades and add-ons based on guest context",
        "Personalized right-time offers using behavior signals",
        "Staff choose whether to offer—no aggressive selling",
        "Focus on relevance and value perception",
      ],
      aiType: "Recommendation engine + Contextual triggers",
      techStack: "ML Models, PMS/POS Integration, Staff Interface",
      timeline: "5-7 weeks",
      costSmall: "$6K - $14K",
      costLarge: "$14K - $22K",
      impact: "Higher revenue per guest, better perceived value, no 'salesy' feel",
    },
  },
  {
    id: "F",
    title: "Fragmented Systems & Manual Operations",
    icon: Layers,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    symptoms: [
      "PMS, POS, booking tools not connected",
      "Spreadsheets for coordination and reporting",
      "Manual data entry across systems",
      "No single source of truth",
      "Decision fatigue from scattered data",
    ],
    reality: [
      "Systems added over time without integration",
      "Staff waste time on manual updates",
      "Errors from duplicate entry",
      "Delays in getting actionable information",
    ],
    whoFaces: "Growing hospitality groups, Multi-location wellness brands",
    whyExists: "Systems were added over time—not designed to work together.",
    solution: {
      name: "Experience Operations Intelligence Layer",
      description: "Connected Systems, Clear Priorities",
      whatItDoes: [
        "Connects PMS, POS, booking tools, CRM into unified view",
        "Surfaces insights instead of raw data",
        "Provides clear daily operational priorities",
        "Reduces manual spreadsheet work",
      ],
      aiType: "Data integration + Operational intelligence",
      techStack: "APIs, Data Pipeline, Dashboard, Alerting",
      timeline: "6-8 weeks",
      costSmall: "$8K - $18K",
      costLarge: "$18K - $28K",
      impact: "Smoother operations, fewer mistakes, better decision clarity",
    },
  },
  {
    id: "G",
    title: "Wellness-Specific Trust & Continuity Challenges",
    icon: HeartHandshake,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    symptoms: [
      "Clients expect privacy and sensitivity",
      "No follow-up after sessions",
      "Generic wellness recommendations",
      "Inconsistent practitioner handoffs",
      "Care journey feels disconnected",
    ],
    reality: [
      "Wellness journeys are deeply personal",
      "Systems treat them as transactions",
      "Client history lost between practitioners",
      "Trust erodes without continuity",
    ],
    whoFaces: "Spas, Wellness clinics, Mental health & fitness providers",
    whyExists: "Wellness journeys are deeply personal, but systems treat them as transactions.",
    solution: {
      name: "AI Wellness Journey Personalization Assistant",
      description: "Continuity of Care, Privacy Protected",
      whatItDoes: [
        "Supports continuity across sessions and practitioners",
        "Helps recall past sessions and track progress",
        "Suggests personalized follow-ups with consent",
        "Privacy-first: consent-based, no diagnostics",
      ],
      aiType: "Care journey intelligence + Privacy controls",
      techStack: "Secure storage, HIPAA-aware design, Practitioner UI",
      timeline: "6-8 weeks",
      costSmall: "$8K - $20K",
      costLarge: "$20K - $30K",
      impact: "Deeper trust, better outcomes, higher retention",
    },
  },
  {
    id: "H",
    title: "Lack of Experience-Level Visibility for Leadership",
    icon: Eye,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    symptoms: [
      "Leaders see revenue and occupancy numbers",
      "Miss experience drop-offs and trends",
      "Staff pressure points invisible",
      "Early warning signs not surfaced",
      "Reactive instead of proactive management",
    ],
    reality: [
      "Most dashboards track what happened, not how people felt",
      "Guest sentiment trends invisible",
      "Staff burnout detected too late",
      "Culture problems surface in reviews",
    ],
    whoFaces: "Owners, GMs, CX leaders across all hospitality types",
    whyExists: "Most dashboards track what happened, not how people felt.",
    solution: {
      name: "Experience Health & Operations Insight Dashboard",
      description: "See Why, Not Just What",
      whatItDoes: [
        "Shows guest sentiment trends over time",
        "Surfaces staff pressure signals early",
        "Highlights experience drop-offs before escalation",
        "Enables proactive staffing and service decisions",
      ],
      aiType: "Experience analytics + Early warning system",
      techStack: "Dashboard, Sentiment feeds, Staff signals integration",
      timeline: "5-7 weeks",
      costSmall: "$6K - $15K",
      costLarge: "$15K - $22K",
      impact: "Proactive management, fewer surprises, stronger culture",
    },
  },
];

const industryStats = [
  { icon: PhoneOff, value: "23%", label: "of calls missed at peak times" },
  { icon: CalendarDays, value: "15-20%", label: "average no-show rate" },
  { icon: Star, value: "0.5 stars", label: "rating drop = 9% revenue loss" },
  { icon: Users, value: "73%", label: "of staff report burnout" },
];

const costReference = [
  { type: "Boutique / Single Location", scope: "Booking or Review AI", range: "$3K – $8K" },
  { type: "Growing Brand", scope: "Guest Experience + Staff Assist", range: "$8K – $18K" },
  { type: "Multi-Location Group", scope: "Ops + Experience Intelligence", range: "$18K – $35K" },
  { type: "Premium / Wellness Network", scope: "Personalized Journeys", range: "$35K+" },
];

function HospitalitySolutionFinder() {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [staffComfort, setStaffComfort] = useState<string | null>(null);
  const [automationLevel, setAutomationLevel] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const getRecommendation = () => {
    const recommendations: Record<string, { title: string; description: string; timeline: string; cost: string; bottleneck: string }> = {
      bookings: { title: "AI Booking & Appointment Concierge", description: "Reduce missed calls, enable 24/7 booking support, lower no-show rates", timeline: "3-4 weeks", cost: "$4K - $14K", bottleneck: "B" },
      "guest-experience": { title: "AI Guest Preference & Experience Memory", description: "Remember guest preferences, personalize every touchpoint", timeline: "4-6 weeks", cost: "$5K - $18K", bottleneck: "A" },
      "staff-overload": { title: "AI Staff Assist & Consistency Helper", description: "Reduce repetitive tasks, support staff during peaks", timeline: "4-6 weeks", cost: "$5K - $16K", bottleneck: "C" },
      reviews: { title: "AI Review & Sentiment Intelligence", description: "Monitor feedback, detect patterns, protect reputation", timeline: "3-5 weeks", cost: "$4K - $15K", bottleneck: "D" },
      revenue: { title: "AI Experience-Led Revenue Optimization", description: "Personalized offers, better upsell timing, higher revenue per guest", timeline: "5-7 weeks", cost: "$6K - $22K", bottleneck: "E" },
      operations: { title: "Experience Operations Intelligence Layer", description: "Connect systems, reduce manual work, clear priorities", timeline: "6-8 weeks", cost: "$8K - $28K", bottleneck: "F" },
      wellness: { title: "AI Wellness Journey Personalization", description: "Care continuity, privacy-safe progress tracking", timeline: "6-8 weeks", cost: "$8K - $30K", bottleneck: "G" },
      visibility: { title: "Experience Health & Insights Dashboard", description: "Guest sentiment, staff signals, proactive management", timeline: "5-7 weeks", cost: "$6K - $22K", bottleneck: "H" },
    };
    return challenge ? recommendations[challenge] : recommendations.bookings;
  };

  const recommendation = getRecommendation();

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else setShowResult(true);
  };

  const handleBack = () => {
    if (showResult) setShowResult(false);
    else if (step > 1) setStep(step - 1);
  };

  const resetWizard = () => {
    setStep(1);
    setBusinessType(null);
    setChallenge(null);
    setVolume(null);
    setStaffComfort(null);
    setAutomationLevel(null);
    setShowResult(false);
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-pink-500/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Opportunity Finder
          </Badge>
          <span className="text-xs text-muted-foreground">~30 seconds</span>
        </div>
        <CardTitle className="text-lg">Find Your Hospitality & Wellness AI Opportunity</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">What type of business do you operate?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setBusinessType(type.id)}
                        className={`p-3 rounded-lg border text-left flex items-center gap-2 transition-all ${
                          businessType === type.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-business-${type.id}`}
                      >
                        <type.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">What's your primary challenge?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {challenges.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setChallenge(c.id)}
                        className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                          challenge === c.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-challenge-${c.id}`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Average daily guests or appointments?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "small", label: "Under 50" },
                      { id: "medium", label: "50 - 200" },
                      { id: "large", label: "200 - 500" },
                      { id: "enterprise", label: "500+" },
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setVolume(v.id)}
                        className={`p-3 rounded-lg border text-center text-xs font-medium transition-all ${
                          volume === v.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-volume-${v.id}`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Staff comfort with technology?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: "low", label: "Minimal - Keep it very simple" },
                      { id: "medium", label: "Moderate - Open to learning" },
                      { id: "high", label: "High - Tech-savvy team" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStaffComfort(s.id)}
                        className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                          staffComfort === s.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-comfort-${s.id}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Desired automation level?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: "assistive", label: "Assistive Only - AI supports, humans decide" },
                      { id: "moderate", label: "Moderate - Some automation with oversight" },
                      { id: "full", label: "Full - Maximize automation where safe" },
                    ].map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setAutomationLevel(a.id)}
                        className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                          automationLevel === a.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover-elevate"
                        }`}
                        data-testid={`button-automation-${a.id}`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {step > 1 && (
                  <Button variant="outline" size="sm" onClick={handleBack} data-testid="button-wizard-back">
                    Back
                  </Button>
                )}
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !businessType) ||
                    (step === 2 && !challenge) ||
                    (step === 3 && !volume) ||
                    (step === 4 && !staffComfort) ||
                    (step === 5 && !automationLevel)
                  }
                  data-testid="button-wizard-next"
                >
                  {step === 5 ? "See Recommendation" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">Bottleneck {recommendation.bottleneck}</Badge>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <h4 className="font-semibold text-base mb-1">{recommendation.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{recommendation.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 bg-background rounded">
                    <p className="text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{recommendation.timeline}</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <p className="text-muted-foreground">Investment</p>
                    <p className="font-semibold">{recommendation.cost}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetWizard} data-testid="button-wizard-reset">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Start Over
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <a href="#lead-form" data-testid="button-wizard-cta">
                    Get Experience Roadmap
                    <ArrowRight className="w-4 h-4 ml-1" />
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

function LeakageCalculator() {
  const [missedCalls, setMissedCalls] = useState(25);
  const [noShowRate, setNoShowRate] = useState(15);
  const [avgBookingValue, setAvgBookingValue] = useState(150);
  const [weeklyAppointments, setWeeklyAppointments] = useState(100);
  const [ratingDrop, setRatingDrop] = useState(0.3);

  const calculations = useMemo(() => {
    const missedBookingLoss = missedCalls * avgBookingValue * 4;
    const noShowLoss = weeklyAppointments * (noShowRate / 100) * avgBookingValue * 4;
    const reputationImpact = ratingDrop * 0.09 * (weeklyAppointments * avgBookingValue * 4);
    const totalMonthly = missedBookingLoss + noShowLoss + reputationImpact;
    const totalAnnual = totalMonthly * 12;

    return {
      missedBookingLoss: Math.round(missedBookingLoss),
      noShowLoss: Math.round(noShowLoss),
      reputationImpact: Math.round(reputationImpact),
      totalMonthly: Math.round(totalMonthly),
      totalAnnual: Math.round(totalAnnual),
    };
  }, [missedCalls, noShowRate, avgBookingValue, weeklyAppointments, ratingDrop]);

  return (
    <Card id="leakage-calculator" className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Calculator className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <CardTitle className="text-lg">Experience & Revenue Leakage Calculator</CardTitle>
            <p className="text-xs text-muted-foreground">Understand where bookings and revenue quietly slip away</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm">Missed calls per week</Label>
              <span className="text-sm font-medium">{missedCalls}</span>
            </div>
            <Slider
              value={[missedCalls]}
              onValueChange={([v]) => setMissedCalls(v)}
              max={100}
              step={5}
              className="w-full"
              data-testid="slider-missed-calls"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm">No-show rate (%)</Label>
              <span className="text-sm font-medium">{noShowRate}%</span>
            </div>
            <Slider
              value={[noShowRate]}
              onValueChange={([v]) => setNoShowRate(v)}
              max={40}
              step={1}
              className="w-full"
              data-testid="slider-noshow-rate"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm">Average booking value ($)</Label>
              <span className="text-sm font-medium">${avgBookingValue}</span>
            </div>
            <Slider
              value={[avgBookingValue]}
              onValueChange={([v]) => setAvgBookingValue(v)}
              min={50}
              max={500}
              step={10}
              className="w-full"
              data-testid="slider-booking-value"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm">Weekly appointments</Label>
              <span className="text-sm font-medium">{weeklyAppointments}</span>
            </div>
            <Slider
              value={[weeklyAppointments]}
              onValueChange={([v]) => setWeeklyAppointments(v)}
              min={20}
              max={500}
              step={10}
              className="w-full"
              data-testid="slider-weekly-appointments"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm">Rating drop (stars)</Label>
              <span className="text-sm font-medium">{ratingDrop.toFixed(1)}</span>
            </div>
            <Slider
              value={[ratingDrop * 10]}
              onValueChange={([v]) => setRatingDrop(v / 10)}
              max={10}
              step={1}
              className="w-full"
              data-testid="slider-rating-drop"
            />
          </div>
        </div>

        <div className="p-4 bg-background rounded-lg border space-y-3">
          <h4 className="font-semibold text-sm">Monthly Experience Leakage</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Missed bookings</span>
              <span className="font-medium text-destructive">${calculations.missedBookingLoss.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">No-show losses</span>
              <span className="font-medium text-destructive">${calculations.noShowLoss.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reputation impact</span>
              <span className="font-medium text-destructive">${calculations.reputationImpact.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total Monthly Leakage</span>
              <span className="text-destructive">${calculations.totalMonthly.toLocaleString()}</span>
            </div>
          </div>
          <div className="p-3 bg-destructive/10 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Annual Experience Leakage</p>
            <p className="text-2xl font-bold text-destructive">${calculations.totalAnnual.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AIReadinessScore() {
  const [guestDataSensitivity, setGuestDataSensitivity] = useState(3);
  const [staffOpenness, setStaffOpenness] = useState(3);
  const [processClarity, setProcessClarity] = useState(3);
  const [systemsMaturity, setSystemsMaturity] = useState(3);
  const [brandToneClarity, setBrandToneClarity] = useState(3);

  const score = useMemo(() => {
    const total = (guestDataSensitivity + staffOpenness + processClarity + systemsMaturity + brandToneClarity) * 4;
    return Math.min(100, total);
  }, [guestDataSensitivity, staffOpenness, processClarity, systemsMaturity, brandToneClarity]);

  const getScoreColor = () => {
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-orange-500";
  };

  const getRecommendation = () => {
    if (score >= 70) return { text: "Ready for AI", suggestion: "Guest Memory + Review Intelligence" };
    if (score >= 50) return { text: "Good Foundation", suggestion: "Booking Concierge + Staff Assist" };
    return { text: "Start Simple", suggestion: "Booking Concierge only" };
  };

  return (
    <Card id="readiness-quiz" className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Readiness for Guest-Facing Businesses</CardTitle>
            <p className="text-xs text-muted-foreground">Assess comfort, consent, and control readiness</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {[
            { label: "Guest data handling clarity", value: guestDataSensitivity, setter: setGuestDataSensitivity },
            { label: "Staff openness to support tools", value: staffOpenness, setter: setStaffOpenness },
            { label: "Process clarity (bookings, service)", value: processClarity, setter: setProcessClarity },
            { label: "Existing systems maturity", value: systemsMaturity, setter: setSystemsMaturity },
            { label: "Brand tone & voice clarity", value: brandToneClarity, setter: setBrandToneClarity },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">{item.label}</Label>
                <span className="text-sm font-medium">{item.value}/5</span>
              </div>
              <Slider
                value={[item.value]}
                onValueChange={([v]) => item.setter(v)}
                min={1}
                max={5}
                step={1}
                className="w-full"
                data-testid={`slider-readiness-${i}`}
              />
            </div>
          ))}
        </div>

        <div className="p-4 bg-background rounded-lg border text-center">
          <p className="text-xs text-muted-foreground mb-1">AI Readiness Score</p>
          <p className={`text-4xl font-bold ${getScoreColor()}`}>{score}<span className="text-lg">/100</span></p>
          <p className="text-sm font-medium mt-2">{getRecommendation().text}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Safe Starting Point: <span className="text-primary">{getRecommendation().suggestion}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function LeadForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessType: "",
    challenge: "",
    dailyGuests: "",
    locations: "",
    country: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/leads", {
        ...formData,
        industry: "hospitality-wellness",
        source: "hospitality-page",
      });

      toast({
        title: "Request received",
        description: "We'll send your Experience Optimization Roadmap within 24 hours.",
      });

      setFormData({
        businessType: "",
        challenge: "",
        dailyGuests: "",
        locations: "",
        country: "",
        email: "",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card id="lead-form" className="border-primary/20">
      <CardHeader className="text-center">
        <Badge className="mx-auto mb-2">
          <Sparkles className="w-3 h-3 mr-1" />
          Experience Optimization
        </Badge>
        <CardTitle className="text-2xl">Get Your Personalized Experience Optimization Roadmap</CardTitle>
        <p className="text-muted-foreground">
          For owners and leaders who want clarity before committing to change.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(v) => setFormData({ ...formData, businessType: v })}
              >
                <SelectTrigger id="businessType" data-testid="select-business-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel / Resort</SelectItem>
                  <SelectItem value="restaurant">Restaurant / Hospitality Group</SelectItem>
                  <SelectItem value="spa">Spa / Salon / Wellness Center</SelectItem>
                  <SelectItem value="retreat">Retreat / Lifestyle Brand</SelectItem>
                  <SelectItem value="fitness">Fitness / Mental Wellness</SelectItem>
                  <SelectItem value="boutique">Boutique Experience Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="challenge">Primary Challenge</Label>
              <Select
                value={formData.challenge}
                onValueChange={(v) => setFormData({ ...formData, challenge: v })}
              >
                <SelectTrigger id="challenge" data-testid="select-challenge">
                  <SelectValue placeholder="Select challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bookings">Bookings & No-Shows</SelectItem>
                  <SelectItem value="guest-experience">Guest Experience</SelectItem>
                  <SelectItem value="staff-load">Staff Overload</SelectItem>
                  <SelectItem value="reviews">Reviews & Reputation</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="not-sure">Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dailyGuests">Average Daily Guests/Appointments</Label>
              <Select
                value={formData.dailyGuests}
                onValueChange={(v) => setFormData({ ...formData, dailyGuests: v })}
              >
                <SelectTrigger id="dailyGuests" data-testid="select-daily-guests">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50">Under 50</SelectItem>
                  <SelectItem value="50-200">50 - 200</SelectItem>
                  <SelectItem value="200-500">200 - 500</SelectItem>
                  <SelectItem value="500-plus">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="locations">Locations</Label>
              <Select
                value={formData.locations}
                onValueChange={(v) => setFormData({ ...formData, locations: v })}
              >
                <SelectTrigger id="locations" data-testid="select-locations">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Location</SelectItem>
                  <SelectItem value="2-5">2-5 Locations</SelectItem>
                  <SelectItem value="6-plus">6+ Locations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="country">Country / Region</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g., United States"
                data-testid="input-country"
              />
            </div>

            <div>
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                required
                data-testid="input-email"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit-lead">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Get My Experience Optimization Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Designed to support your team and guests—without disrupting what already works.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default function HospitalityIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-pink-500/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                Hospitality & Wellness AI Solutions
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Intelligent AI Solutions That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-primary">
                  Strengthen Human Connection
                </span>
                {" "}and Elevate Guest Experiences
              </h1>

              <p className="text-base text-foreground max-w-xl">
                Great hospitality isn't about technology—it's about how guests feel. But behind every seamless experience is a team stretched thin, systems that don't talk, and details that slip through the cracks.
              </p>

              <p className="text-lg text-muted-foreground max-w-xl">
                Whether you operate a boutique hotel, luxury resort, fine dining restaurant, wellness spa, holistic clinic, meditation retreat, or lifestyle experience brand—AGIX designs and builds custom AI systems that quietly work behind the scenes.
              </p>
            </motion.div>

            {/* Right: Solution Finder + Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 lg:mt-8"
            >
              <HospitalitySolutionFinder />

              {/* Quick Tool Links */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#leakage-calculator"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg border border-orange-500/30 hover-elevate group"
                  data-testid="button-hero-calculator"
                >
                  <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    <Calculator className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Leakage Calculator</p>
                    <p className="text-xs text-muted-foreground">Revenue Impact</p>
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
                    <p className="text-sm font-medium">AI Readiness</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </a>
              </div>

              {/* Industry Reality Statement */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-pink-500/10 rounded-lg border border-primary/20 text-center">
                <p className="text-lg font-medium text-primary">
                  The best experiences feel effortless—
                  <br />
                  because someone cared enough to remove friction behind the scenes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Reality Check - Detailed Section */}
      <section className="py-20 bg-gradient-to-b from-background to-destructive/5">
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
              The <span className="text-destructive">Uncomfortable Truths</span> Most Operators Know But Rarely Address
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hospitality and wellness don't compete on features. They compete on how people <span className="text-foreground font-medium">feel</span>—and that breaks when systems fail silently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                problem: "Guests expect personalization, not repetition",
                icon: Heart,
                details: "Returning guests expect to be remembered—their room preferences, dietary needs, favorite therapist. When they have to repeat themselves, loyalty erodes quietly.",
                consequence: "Guests leave without explaining why. They simply book elsewhere.",
                stat: "68% of guests expect personalized experiences",
              },
              {
                problem: "Staff are stretched, especially during peaks",
                icon: Users,
                details: "Front desk handles check-ins while phones ring. Servers manage tables while answering the same questions. Therapists rush between sessions. Everyone is doing too much.",
                consequence: "Service quality becomes inconsistent. Small mistakes accumulate. Burnout leads to turnover.",
                stat: "73% of hospitality staff report burnout symptoms",
              },
              {
                problem: "Missed calls mean missed experiences",
                icon: Phone,
                details: "Peak hours flood the phone lines. After-hours inquiries go unanswered until tomorrow—when the guest has already booked elsewhere. Every missed call is lost revenue.",
                consequence: "Potential guests choose competitors who answered. You'll never know what you lost.",
                stat: "23% of calls go unanswered during peak times",
              },
              {
                problem: "Reviews influence revenue instantly",
                icon: Star,
                details: "One frustrated guest posts a 3-star review. Algorithms push you down. Potential guests see it first. By the time you respond, they've already decided.",
                consequence: "A 0.5 star drop on average rating can mean 9% revenue loss.",
                stat: "94% of guests read reviews before booking",
              },
              {
                problem: "Operations leak money quietly",
                icon: DollarSign,
                details: "No-shows, underutilized time slots, missed upsell moments, manual data entry errors. The losses are small per incident—but they compound daily.",
                consequence: "10-15% of potential revenue leaks away unnoticed each month.",
                stat: "15-20% average no-show rate in hospitality",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-destructive/20 bg-gradient-to-br from-destructive/5 to-orange-500/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                        <item.icon className="w-5 h-5 text-destructive" />
                      </div>
                      <CardTitle className="text-base leading-tight">{item.problem}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                    <div className="p-3 bg-background/50 rounded-lg border border-destructive/10">
                      <p className="text-xs font-medium text-destructive mb-1">The Consequence:</p>
                      <p className="text-xs text-muted-foreground">{item.consequence}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-destructive/30 text-destructive">
                      {item.stat}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-pink-500/5">
              <CardContent className="py-8 text-center">
                <p className="text-xl md:text-2xl font-medium text-foreground max-w-3xl mx-auto">
                  These aren't technology problems.{" "}
                  <span className="text-primary">They're experience problems</span>
                  {" "}that technology—used thoughtfully—can help solve.
                </p>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  AGIX doesn't automate hospitality. We build AI systems that quietly support the humans who create great experiences.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Button asChild data-testid="link-reality-solution-finder">
                    <a href="#lead-form">
                      Get Your Experience Roadmap
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild data-testid="link-reality-bottleneck-map">
                    <a href="#bottleneck-map">
                      Explore Bottleneck Solutions
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Industry Stats Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                <TrendingUp className="w-3 h-3 mr-1" />
                Industry Reality
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Why Hospitality & Wellness Leaders Are{" "}
                <span className="text-primary">Exploring AI</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Guest expectations are rising while staff are stretched thin. Here's what's driving the shift to supportive AI.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industryStats.map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-gradient-to-br from-pink-500/10 to-primary/10 border border-pink-500/30">
                  <stat.icon className="w-7 h-7 mx-auto mb-3 text-pink-500" />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20">
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
              The <span className="text-destructive">Silent Failures</span> Eroding Guest Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hospitality and wellness businesses rarely fail loudly. They lose ground silently—through missed calls, rushed staff, inconsistent service, reactive reviews, and systems that don't remember people.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Missed Calls, Missed Experiences",
                description: "Peak hours overwhelm front desk staff. After-hours inquiries go unanswered. Each missed call is a missed booking and a frustrated potential guest.",
                icon: Phone,
                impact: "23% of calls missed at peaks",
              },
              {
                title: "No-Shows Drain Revenue",
                description: "High no-show rates leave empty tables, unused slots, and wasted preparation time. Without smart reminders, this leakage is normalized.",
                icon: CalendarDays,
                impact: "15-20% average no-show rate",
              },
              {
                title: "Staff Burnout Is Invisible",
                description: "Overworked staff deliver inconsistent service. Small mistakes add up. Turnover increases. The guest experience quietly degrades.",
                icon: Users,
                impact: "73% of staff report burnout",
              },
              {
                title: "Reviews Arrive Too Late",
                description: "By the time a negative review appears, the damage is done. Without proactive monitoring, you're always reacting instead of preventing.",
                icon: Star,
                impact: "0.5 star drop = 9% revenue loss",
              },
              {
                title: "Personalization Is Manual",
                description: "Guest preferences live in staff memory, not systems. When that staff member leaves or is busy, the personalized touch disappears.",
                icon: Heart,
                impact: "Repeat guests expect recognition",
              },
              {
                title: "Systems Don't Talk",
                description: "PMS, POS, booking tools, and CRM are disconnected. Staff waste time on manual data entry and coordination instead of caring for guests.",
                icon: Layers,
                impact: "Hours lost to manual work daily",
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
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-destructive/10 rounded-lg">
                        <challenge.icon className="w-5 h-5 text-destructive" />
                      </div>
                      <CardTitle className="text-base">{challenge.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                    <Badge variant="outline" className="text-xs border-destructive/30 text-destructive">
                      {challenge.impact}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Users className="w-3 h-3 mr-1" />
              Who This Is For
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Built for Experience-Driven{" "}
              <span className="text-primary">Decision-Makers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you serve 20 guests a day or 2,000, the challenges are similar—the scale of impact changes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {businessTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full text-center hover-elevate">
                  <CardContent className="pt-6">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                      <type.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{type.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottleneck Map Section */}
      <section id="bottleneck-map" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <Layers className="w-3 h-3 mr-1" />
              Bottleneck Map
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience & Operations{" "}
              <span className="text-primary">Bottleneck Categories</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select a bottleneck to see the AI support system designed to assist—without making your business feel robotic.
            </p>
          </motion.div>

          {/* Bottleneck Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {bottlenecks.map((bottleneck) => (
              <motion.div
                key={bottleneck.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedBottleneck(bottleneck)}
                className={`cursor-pointer p-4 rounded-lg border transition-all ${
                  selectedBottleneck.id === bottleneck.id
                    ? `border-2 ${bottleneck.color.replace("text-", "border-")} ${bottleneck.bgColor}`
                    : "border-border hover-elevate"
                }`}
                data-testid={`button-bottleneck-${bottleneck.id}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={`text-xs ${bottleneck.color}`}>
                    {bottleneck.id}
                  </Badge>
                  <bottleneck.icon className={`w-4 h-4 ${bottleneck.color}`} />
                </div>
                <p className="text-sm font-medium line-clamp-2">{bottleneck.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Selected Bottleneck Detail */}
          <motion.div
            key={selectedBottleneck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${selectedBottleneck.bgColor} rounded-lg`}>
                    <selectedBottleneck.icon className={`w-6 h-6 ${selectedBottleneck.color}`} />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">{selectedBottleneck.id}</Badge>
                    <CardTitle>{selectedBottleneck.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      Common Symptoms
                    </h4>
                    <ul className="space-y-2">
                      {selectedBottleneck.symptoms.map((symptom, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-orange-500" />
                      Operational Reality
                    </h4>
                    <ul className="space-y-2">
                      {selectedBottleneck.reality.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Who Faces This:</span>{" "}
                    <span className="text-muted-foreground">{selectedBottleneck.whoFaces}</span>
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-semibold">Why It Exists:</span>{" "}
                    <span className="text-muted-foreground">{selectedBottleneck.whyExists}</span>
                  </p>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-2 text-primary">
                    Recommended AI Support: {selectedBottleneck.solution.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedBottleneck.solution.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="font-semibold text-sm">{selectedBottleneck.solution.timeline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="font-semibold text-sm">{selectedBottleneck.solution.costSmall}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Impact</p>
                      <p className="font-semibold text-sm text-green-500">{selectedBottleneck.solution.impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Interactive Experience Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Your{" "}
              <span className="text-primary">AI Opportunity</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These tools help you explore AI support safely—before changing operations or guest touchpoints.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <LeakageCalculator />
            <AIReadinessScore />
          </div>
        </div>
      </section>

      {/* What Leaders Expect Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Brain className="w-3 h-3 mr-1" />
              Realistic Expectations
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              What Hospitality & Wellness Leaders{" "}
              <span className="text-primary">Expect From AI</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              They don't want cold automation or robotic guest interactions. They expect AI that enhances human care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-orange-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <XCircle className="w-5 h-5 text-destructive" />
                  What They Don't Want
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Cold automation that feels impersonal", "Robotic guest interactions", "Complex tech rollouts that disrupt operations", "Loss of personal touch and warmth"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  What AI Must Deliver
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Remember guest preferences across visits", "Reduce missed bookings and no-shows", "Support staff during peak hours", "Improve reviews and loyalty naturally", "Stay invisible when not needed"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-medium text-primary">
              AGIX builds experience-support AI, not attention-stealing automation.
            </p>
          </div>
        </div>
      </section>

      {/* AGIX Expertise Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 border-pink-500/30 text-pink-500">
              <Star className="w-3 h-3 mr-1" />
              Our Expertise
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              AGIX Experience-First{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-primary">
                AI Capabilities
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX is an AI-first systems engineering company focused on guest-centric and care-centric businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { title: "AI Guest Preference & Journey Intelligence", icon: Heart },
              { title: "AI Booking & Appointment Concierge", icon: CalendarDays },
              { title: "AI Staff Assist & Service Consistency Tools", icon: Users },
              { title: "AI Review, Sentiment & Reputation Intelligence", icon: Star },
              { title: "AI Revenue & Experience Optimization", icon: DollarSign },
              { title: "AI Wellness Journey Personalization (Privacy-Safe)", icon: HeartHandshake },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full hover-elevate border-pink-500/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-pink-500/10 rounded-lg shrink-0">
                        <item.icon className="w-5 h-5 text-pink-500" />
                      </div>
                      <p className="font-medium text-sm">{item.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20 max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">
              We don't replace people. We build AI layers that quietly support humans behind the scenes.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Expectations Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 border-green-500/30 text-green-500">
              <BarChart3 className="w-3 h-3 mr-1" />
              Realistic Value
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Expected Business{" "}
              <span className="text-green-500">Impact</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In hospitality & wellness, one saved guest often pays for the entire system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { metric: "Booking Conversion", value: "+10-25%", color: "text-pink-500" },
              { metric: "No-Show Reduction", value: "-20-40%", color: "text-green-500" },
              { metric: "Review Ratings", value: "+0.3-0.7", color: "text-yellow-500" },
              { metric: "Staff Efficiency", value: "+20-35%", color: "text-primary" },
              { metric: "Revenue Per Guest", value: "+8-20%", color: "text-orange-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-6">
                    <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.metric}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Safety Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Human-First AI
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Safety, Ethics &{" "}
              <span className="text-primary">Human-First Guarantees</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI must feel invisible when it works. We protect what matters most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "AI Never Replaces Staff Judgment", description: "Humans always make final decisions" },
              { title: "Guest Consent Is Mandatory", description: "Privacy-first, opt-in approach" },
              { title: "No Aggressive Upselling", description: "Relevant, optional suggestions only" },
              { title: "Brand Tone Is Configurable", description: "Matches your voice and values" },
              { title: "Phased Rollout Only", description: "Start small, expand when comfortable" },
              { title: "Easy Rollback", description: "Reduce or remove features anytime" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full hover-elevate">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Reference Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 border-pink-500/30 text-pink-500">
              <DollarSign className="w-3 h-3 mr-1" />
              Transparent Pricing
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Hospitality & Wellness AI Cost Reference
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are support systems, not disruptive automation projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {costReference.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full text-center border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-primary/5">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-1">{item.type}</p>
                    <p className="text-xs text-muted-foreground mb-3">{item.scope}</p>
                    <p className="text-xl font-bold text-primary">{item.range}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <LeadForm />
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
            <Badge className="mb-4">
              <HelpCircle className="w-3 h-3 mr-1" />
              FAQs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common Questions About{" "}
              <span className="text-primary">Hospitality & Wellness AI</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Will AI make our guest experience feel robotic?",
                a: "No. AGIX designs AI to work behind the scenes, supporting staff with context—not replacing conversations or care.",
              },
              {
                q: "Does AI ever talk to guests directly?",
                a: "Only where appropriate—such as booking assistance or reminders—and always in a brand-aligned, warm tone. Human interaction remains central.",
              },
              {
                q: "Can we control how 'visible' AI is to guests?",
                a: "Yes. AI visibility is configurable—from fully invisible support to light concierge assistance.",
              },
              {
                q: "Will staff feel monitored or replaced?",
                a: "No. AGIX does not build surveillance or productivity-tracking systems. AI reduces mental load—it doesn't judge performance.",
              },
              {
                q: "How do you protect guest privacy, especially in wellness?",
                a: "Through explicit consent, role-based access, data minimization, and no diagnostics or profiling without approval. Privacy is built into system design.",
              },
              {
                q: "Is AI suitable for boutique hotels or small wellness centers?",
                a: "Absolutely. Most value comes from missed bookings, no-shows, and staff overload, not size.",
              },
              {
                q: "Can we start very small?",
                a: "Yes. Many businesses begin with booking concierge, review intelligence, or staff assist tools—then expand only if it feels right.",
              },
              {
                q: "What if our staff isn't tech-savvy?",
                a: "AI interfaces are designed for natural language, minimal training, and gentle onboarding. If staff resist, we pause—not push.",
              },
              {
                q: "Does AI affect our brand voice or tone?",
                a: "No. Tone is configured to your brand, whether you're luxury, wellness-centric, casual, or premium.",
              },
              {
                q: "Can AI help improve reviews without forcing guests?",
                a: "Yes. By catching experience issues early, helping staff respond empathetically, and identifying patterns—not prompting fake reviews.",
              },
              {
                q: "Is this compliant with data protection regulations?",
                a: "Yes. Systems follow privacy-first practices and can be aligned with local and international data regulations.",
              },
              {
                q: "How long before we see impact?",
                a: "Typically: Booking improvements in 2-4 weeks, staff relief immediate, review improvements in 1-2 months.",
              },
              {
                q: "What happens if AI doesn't feel right after launch?",
                a: "We adjust scope, reduce visibility, or roll back features. AI adoption is reversible and controlled.",
              },
              {
                q: "Does AI push aggressive upselling?",
                a: "Never. Upsell suggestions are context-based, optional, and human-approved.",
              },
              {
                q: "What role does AGIX play long-term?",
                a: "AGIX acts as a quiet systems partner, offering monitoring, refinement, expansion planning, and ethical oversight.",
              },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-lg px-4">
                <AccordionTrigger className="text-left" data-testid={`accordion-faq-${i}`}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-500/10 via-primary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Built Around Human Care
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hospitality and wellness succeed when people feel{" "}
              <span className="text-primary">seen, heard, and cared for</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI succeeds only when it protects that feeling—quietly. AGIX helps you reduce missed bookings, support overworked staff, improve reviews naturally, and increase revenue without losing warmth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#lead-form" data-testid="button-final-cta">
                  Get My Experience Optimization Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-rerun-finder">
                <RefreshCw className="w-4 h-4 mr-2" />
                Re-Run AI Opportunity Finder
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Authority Statement */}
      <section className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">AGIX Technologies</strong> is an AI-first systems engineering company focused on experience-driven industries.
          </p>
          <p className="text-sm text-muted-foreground mt-2 italic">
            We don't automate care. We protect it—by removing friction where humans shouldn't have to struggle.
          </p>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
