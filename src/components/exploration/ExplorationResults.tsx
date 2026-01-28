"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Compass, 
  BookOpen, 
  FileText, 
  MessageCircle, 
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Send,
  CheckCircle,
  Loader2,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Lightbulb,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useExploration } from "./ExplorationContext";
import { getAnswerLabel } from "@/lib/exploration/questionBank";

import { INTELLIGENCE_LABELS, SERVICE_LABELS } from "@/lib/exploration/mappings";
import { getMaturityLabel, getConfidenceMessage } from "@/lib/exploration/recommender";

const COUNTRY_CODES = [
  { code: "+1", label: "US/CA" },
  { code: "+44", label: "UK" },
  { code: "+91", label: "IN" },
  { code: "+971", label: "UAE" },
  { code: "+65", label: "SG" },
  { code: "+61", label: "AU" },
  { code: "+49", label: "DE" },
  { code: "+33", label: "FR" },
  { code: "+81", label: "JP" },
  { code: "+86", label: "CN" },
];

interface ExplorationResultsProps {
  onReset: () => void;
  onClose: () => void;
}

// Get personalized AI opportunity description based on goal
function getAIOpportunityDescription(goal: string | undefined, industry: string | undefined): string {
  const industryName = industry ? getAnswerLabel("industry", industry) : "your industry";
  
  switch (goal) {
    case "TIME":
      return `Based on your responses, there are significant opportunities to automate repetitive tasks in ${industryName}. AI can help your team focus on high-value work while handling routine operations automatically.`;
    case "CX":
      return `Your focus on customer experience aligns perfectly with AI capabilities. Intelligent chatbots, personalized recommendations, and predictive support can dramatically improve how you serve customers.`;
    case "DECISIONS":
      return `AI-powered analytics and insights can transform your decision-making process. Machine learning models can analyze patterns, predict outcomes, and provide data-driven recommendations.`;
    case "WORKFLOWS":
      return `Process automation is one of the most impactful AI applications. We can identify bottlenecks in your workflows and implement intelligent automation to streamline operations.`;
    case "KNOWLEDGE":
      return `AI excels at organizing and retrieving information. Smart document processing, knowledge bases, and intelligent search can make your team's expertise accessible instantly.`;
    default:
      return `Based on your profile, there are several promising AI opportunities to explore. Our team will help identify the highest-impact areas for your specific situation.`;
  }
}

// Get next steps based on current state
function getNextSteps(currentState: string | undefined, maturityScore: number): string[] {
  if (maturityScore < 30 || currentState === "EXPLORING") {
    return [
      "Identify 2-3 repetitive tasks that consume the most time",
      "Document current pain points and desired outcomes",
      "Schedule a discovery call to explore quick-win opportunities"
    ];
  } else if (maturityScore < 60 || currentState === "TESTED") {
    return [
      "Evaluate existing AI experiments for production readiness",
      "Define success metrics and ROI expectations",
      "Plan integration with existing systems and workflows"
    ];
  } else {
    return [
      "Audit current AI implementations for optimization opportunities",
      "Explore advanced capabilities and scaling options",
      "Consider enterprise-wide AI strategy development"
    ];
  }
}

// Get ROI potential description
function getROIPotential(goal: string | undefined): string {
  switch (goal) {
    case "TIME": return "High potential for cost savings through automation";
    case "CX": return "Improved customer satisfaction and retention";
    case "DECISIONS": return "Better outcomes through data-driven insights";
    case "WORKFLOWS": return "Faster processes with fewer errors";
    case "KNOWLEDGE": return "Reduced time finding and using information";
    default: return "Multiple efficiency and growth opportunities";
  }
}

export default function ExplorationResults({ onReset, onClose }: ExplorationResultsProps) {
  const { state, updateState } = useExploration();
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  if (!state) return null;

  const service = state.recommendedServices[0];
  const caseStudy = state.recommendedCaseStudies[0];
  const intelligence = state.recommendedIntelligence;
  const maturityLabel = getMaturityLabel(state.maturityScore);
  const confidenceMessage = getConfidenceMessage(state.confidence);

  // Get user selections for personalization
  const userRole = state.answers.role as string | undefined;
  const userIndustry = state.answers.industry as string | undefined;
  const userGoal = state.answers.primaryGoal as string | undefined;
  const userCurrentState = state.answers.currentState as string | undefined;
  const userTeamSize = state.answers.teamSize as string | undefined;

  // Get personalized content
  const aiOpportunity = getAIOpportunityDescription(userGoal, userIndustry);
  const nextSteps = getNextSteps(userCurrentState, state.maturityScore);
  const roiPotential = getROIPotential(userGoal);

  // Get human-readable selections for email
  const getFormattedSelections = () => {
    const selections: Record<string, string> = {};
    Object.entries(state.answers).forEach(([key, value]) => {
      if (typeof value === "string") {
        selections[key] = getAnswerLabel(key, value);
      } else if (Array.isArray(value)) {
        selections[key] = value.map(v => getAnswerLabel(key, v)).join(", ");
      }
    });
    return selections;
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!name.trim()) {
      setFormError("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }
    if (!whatsapp.trim() || whatsapp.length < 6) {
      setFormError("Please enter a valid WhatsApp number");
      return;
    }
    
    setIsSubmitting(true);
    
    const formattedSelections = getFormattedSelections();
    const fullPhone = `${countryCode}${whatsapp}`;
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: fullPhone,
          message: message || undefined,
          source: "exploration_engine",
          formType: "ai_discovery",
          pagePath: state.entryUrl,
          role: formattedSelections.role || formattedSelections.userType,
          industry: formattedSelections.industry,
          companySize: formattedSelections.teamSize,
          urgency: formattedSelections.urgency,
          challenges: state.answers.challenges ? 
            (Array.isArray(state.answers.challenges) ? state.answers.challenges : [state.answers.challenges]) : 
            undefined,
          aiReadinessTag: maturityLabel,
          leadScore: state.maturityScore,
          metadata: {
            confidence: state.confidence,
            recommendedService: service,
            recommendedIntelligence: intelligence,
            entryUrl: state.entryUrl,
            selections: formattedSelections,
            rawAnswers: state.answers,
            primaryGoal: formattedSelections.primaryGoal,
            currentState: formattedSelections.currentState,
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      await fetch("/api/send-lead-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: fullPhone,
          message,
          selections: formattedSelections,
          maturityScore: state.maturityScore,
          recommendedService: service ? SERVICE_LABELS[service] : undefined,
          recommendedIntelligence: intelligence ? INTELLIGENCE_LABELS[intelligence] : undefined,
          entryUrl: state.entryUrl,
        })
      });

      updateState({ ctaCompleted: true });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit:", err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // BEFORE SUBMISSION: Simple form without showing metrics
  if (!isSubmitted) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Your Results Are Ready</h2>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            We&apos;ve analyzed your responses and prepared personalized AI recommendations for your business.
          </p>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mb-4">
            <p className="text-sm font-medium mb-2">
              Get Your Personalized AI Roadmap
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Enter your details to unlock your custom report with actionable next steps.
            </p>
            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-testid="input-quick-name"
              />
              <Input
                type="email"
                placeholder="Your email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-quick-email"
              />
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-24" data-testid="select-country-code">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.code} {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="WhatsApp number *"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                  className="flex-1"
                  required
                  data-testid="input-quick-whatsapp"
                />
              </div>
              <Textarea
                placeholder="Tell us more about your project (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="resize-none"
                data-testid="input-quick-message"
              />
              {formError && (
                <p className="text-xs text-destructive">{formError}</p>
              )}
              <Button type="submit" disabled={isSubmitting} className="w-full" data-testid="button-quick-submit">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Get My Recommendations
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-reset-exploration"
            >
              <RotateCcw className="h-3 w-3" />
              Start over
            </button>
            <button
              onClick={onClose}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-close-results"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // AFTER SUBMISSION: Full comprehensive report with detailed guidance
  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Success Header */}
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Your AI Journey Blueprint</h2>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 mb-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            <p className="text-sm font-medium">Thanks, {name.split(" ")[0]}! Our AI experts will reach out within 24 hours.</p>
          </div>
        </div>

        {/* AI Readiness Overview */}
        <div className="rounded-lg border border-border bg-card/50 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">AI Readiness Score</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{state.maturityScore}</span>
              <Badge variant="secondary" className="text-xs">{maturityLabel}</Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{confidenceMessage}</p>
        </div>

        {/* Personalized AI Opportunity */}
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">Your AI Opportunity</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{aiOpportunity}</p>
          
          {intelligence && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Recommended Focus Area</p>
              <p className="text-sm font-semibold text-primary">{INTELLIGENCE_LABELS[intelligence]}</p>
            </div>
          )}
        </div>

        {/* Key Insights Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg border border-border bg-card/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <p className="text-xs text-muted-foreground">ROI Potential</p>
            </div>
            <p className="text-sm font-medium">{roiPotential}</p>
          </div>
          
          <div className="rounded-lg border border-border bg-card/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-yellow-400" />
              <p className="text-xs text-muted-foreground">Quick Wins</p>
            </div>
            <p className="text-sm font-medium">
              {state.maturityScore < 40 ? "Multiple available" : state.maturityScore < 70 ? "Ready to scale" : "Optimization focus"}
            </p>
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div className="rounded-lg border border-border bg-card/30 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">Recommended Next Steps</p>
          </div>
          <ul className="space-y-2">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Your Profile Summary */}
        <div className="rounded-lg border border-border bg-card/30 p-3 mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Your Profile Summary</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {userRole && (
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span>{getAnswerLabel("role", userRole)}</span>
              </div>
            )}
            {userIndustry && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3 text-muted-foreground" />
                <span>{getAnswerLabel("industry", userIndustry)}</span>
              </div>
            )}
            {userTeamSize && (
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span>{getAnswerLabel("teamSize", userTeamSize)} team</span>
              </div>
            )}
            {userGoal && (
              <div className="flex items-center gap-2">
                <Target className="h-3 w-3 text-muted-foreground" />
                <span>{getAnswerLabel("primaryGoal", userGoal)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Explore Resources */}
        <div className="space-y-2 mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Explore While You Wait
          </p>

          {service && (
            <Link
              href={`/services/${service}/`}
              onClick={() => {
                updateState({ returnTo: pathname });
                onClose();
              }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
              data-testid="link-recommended-service"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Learn About Our Solutions</p>
                <p className="text-xs text-muted-foreground truncate">
                  {SERVICE_LABELS[service]}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          )}

          {caseStudy && (
            <Link
              href={`/case-studies/${caseStudy}/`}
              onClick={() => {
                updateState({ returnTo: pathname });
                onClose();
              }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
              data-testid="link-recommended-casestudy"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <FileText className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">See Real Results</p>
                <p className="text-xs text-muted-foreground truncate">
                  View a relevant success story
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          )}
        </div>

        {/* Talk to Expert CTA */}
        <Link
          href={`/corporate/contact/?service=${service}&intel=${intelligence}`}
          onClick={onClose}
          className="block mb-4"
          data-testid="link-contact-expert"
        >
          <Button variant="outline" className="w-full">
            <MessageCircle className="h-4 w-4 mr-2" />
            Schedule a Free Consultation
          </Button>
        </Link>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          {state.returnTo && state.returnTo !== pathname ? (
            <Link
              href={state.returnTo}
              onClick={onClose}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-return-to"
            >
              <ArrowLeft className="h-3 w-3" />
              Return to previous page
            </Link>
          ) : (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-reset-exploration"
            >
              <RotateCcw className="h-3 w-3" />
              Start over
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-close-results"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
