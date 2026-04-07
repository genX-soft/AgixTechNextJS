'use client'
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { 
  Bot,
  Brain,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  Building2,
  Stethoscope,
  Wallet,
  Truck,
  ChevronRight,
  Sparkles,
  Network,
  Eye,
  Calculator,
  Cog,
  Database,
  RefreshCw,
  Workflow,
  MessageSquare,
  FileText,
  Mail,
  Layers,
  Search,
  Target,
  TrendingUp,
  Settings,
  Lock,
  Activity,
  BarChart3,
  Users,
  DollarSign,
  Loader2,
  Factory,
  ShoppingCart,
  GraduationCap,
  Briefcase,
  Heart,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

const AutomationCalculator = dynamic(() => import("./automation-calculator"));
const CapabilitiesSection = dynamic(() => import("./sections/capabilities-section"));
const EngineSection = dynamic(() => import("./sections/engine-section"));
const PricingSection = dynamic(() => import("./sections/faq-pricing-section"));

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};


const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" }
];

const existingTools = [
  "CRMs",
  "ERPs", 
  "Ticketing & support systems",
  "Email & communication platforms",
  "Cloud tools & internal software"
];

const toolLimitations = [
  "Don't understand intent",
  "Don't make decisions",
  "Don't handle exceptions",
  "Don't coordinate across departments"
];

const businessReality = [
  "Delayed workflows",
  "Process breakdowns",
  "Human-dependent approvals",
  "Operational bottlenecks",
  "Rising cost per transaction"
];

const shiftReasons = [
  "Businesses are operating with higher volume, lower margins",
  "Manual coordination no longer scales",
  "Customers expect faster, consistent responses",
  "Compliance and accuracy requirements are increasing",
  "AI capabilities are now production-ready (not experimental)"
];

const traditionalVsAI = [
  { traditional: "Rule-based workflows", ai: "Context-aware intelligence" },
  { traditional: "Breaks on edge cases", ai: "Handles ambiguity" },
  { traditional: "Requires constant manual fixes", ai: "Learns and adapts" },
  { traditional: "Task-level execution", ai: "End-to-end process ownership" },
  { traditional: "Limited scalability", ai: "Built for enterprise scale" }
];

const industries = [
  { icon: Heart, name: "Healthcare", label: "Healthcare automation systems" },
  { icon: Wallet, name: "Finance", label: "Finance & FinTech process automation" },
  { icon: Shield, name: "Insurance", label: "Insurance claims automation" },
  { icon: Building2, name: "Real Estate", label: "Real estate workflow automation" },
  { icon: ShoppingCart, name: "E-commerce", label: "E-commerce operations automation" },
  { icon: Truck, name: "Logistics", label: "Logistics & supply chain automation" },
  { icon: Factory, name: "Manufacturing", label: "Manufacturing process automation" },
  { icon: Briefcase, name: "SaaS", label: "SaaS internal automation" }
];

export default function AIAutomationPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companySize: "",
    automationGoal: ""
  });
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();

  useEffect(() => {
    setMounted(true);
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Use requestAnimationFrame to ensure scroll happens after render and Next.js routing
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, []);

  const handleFormSubmit = async () => {
    const result = await submitLead(
      {
        name: formData.name,
        email: formData.email,
        companySize: formData.companySize,
        challenges: ["AI Automation"],
        industry: "ai-automation",
      },
      {
        formType: "ai-automation-roadmap",
        source: "/services/ai-automation",
        ctaId: "ai-automation-form-submit",
        ctaText: "Get Automation Roadmap",
        ctaLocation: "/services/ai-automation",
        additionalMetadata: {
          automationGoal: formData.automationGoal
        }
      }
    );
    return result;
  };

  const leadMutation = useMutation({
    mutationFn: handleFormSubmit,
    onSuccess: (result) => {
      if (result.success) {
        triggerCelebration();
        trackEvent("lead_form_submit", {
          event_category: "ai_automation_services",
          event_label: "hero_roadmap_form"
        });
        toast({
          title: "Request received!",
          description: "We'll send your automation roadmap within 24 hours.",
        });
        setFormData({ name: "", email: "", companySize: "", automationGoal: "" });
      }
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
    if (!formData.name || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please provide your name and email.",
        variant: "destructive"
      });
      return;
    }
    leadMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main id="main-content">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 lg:pt-28 pb-16 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-cyan-500/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Zap className="w-3 h-3 mr-1" />
                AI Automation Services
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Engineering AI Automation That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                  Eliminates Manual Operations
                </span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Across Workflows, Processes, Documents & Communication
              </p>

              <p className="text-lg text-muted-foreground">
                AGIX Technologies delivers AI Automation Services that replace repetitive human work with intelligent, 
                self-operating systems — helping businesses reduce cost, improve speed, and scale without increasing headcount.
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                This is not basic automation or RPA. This is AI-driven business automation designed for real-world complexity.
              </div>

              <p className="text-xs text-muted-foreground pt-4">
                Trusted by businesses automating operations across finance, healthcare, SaaS, logistics & enterprise systems.
              </p>
            </motion.div>

            {/* Right: Lead Capture Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Get Your Automation Roadmap</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tell us what you want to automate and we'll show you how.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        data-testid="input-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
                      >
                        <SelectTrigger id="companySize" data-testid="select-company-size">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="automationGoal">What do you want to automate?</Label>
                      <Textarea
                        id="automationGoal"
                        name="message"
                        autoComplete="off"
                        placeholder="Describe your automation goals..."
                        value={formData.automationGoal}
                        onChange={(e) => setFormData(prev => ({ ...prev, automationGoal: e.target.value }))}
                        className="resize-none"
                        rows={3}
                        data-testid="textarea-automation-goal"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={leadMutation.isPending}
                      data-testid="button-submit-automation"
                    >
                      {leadMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Automation Roadmap
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why AI Automation Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">
              <TrendingUp className="w-3 h-3 mr-1" />
              Strategic Priority
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why AI Automation Is a Business Priority —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                Not a Technology Trend
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Search demand for AI automation services, AI workflow automation, and AI business process automation 
              has accelerated because modern businesses are no longer struggling with tools — they are struggling 
              with execution at scale.
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>The challenge is not digital adoption. The challenge is operational complexity.</strong>
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Most organizations already operate with:</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {existingTools.map((tool, i) => (
                    <Badge key={i} variant="secondary" className="text-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
                <p className="text-lg font-medium text-primary">Yet despite this stack, work still moves manually.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Why? Because these systems:</h4>
                <ul className="space-y-2">
                  {toolLimitations.map((limitation, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                      {limitation}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-muted-foreground">
                  They store data — but they don't run operations.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">The Resulting Business Reality:</h4>
                <ul className="space-y-2">
                  {businessReality.map((reality, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                      {reality}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  As volume increases, complexity compounds — and scaling requires more people, not better systems.
                  This is the exact inflection point where businesses start searching for AI automation solutions.
                </p>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-cyan-500/5">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">AI Automation Fixes the Execution Gap</h3>
                  </div>

                  <p className="text-muted-foreground">
                    By introducing intelligence into how work moves — not just connecting APIs.
                  </p>

                  <p className="text-muted-foreground">
                    AI automation adds a <span className="text-primary font-medium">decision layer</span> on top of your 
                    existing systems, enabling them to:
                  </p>

                  <ul className="space-y-2">
                    {[
                      "Interpret data and intent",
                      "Route work dynamically",
                      "Trigger actions automatically",
                      "Handle exceptions intelligently",
                      "Adapt as conditions change"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm font-medium text-primary border-t border-primary/20 pt-4">
                    This is why AI automation is now viewed as an operational necessity, not an experimental initiative.
                  </p>
                </CardContent>
              </Card>

              {/* Why This Shift Is Happening Now */}
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Why This Shift Is Happening Now</h4>
                <div className="space-y-3">
                  {shiftReasons.map((reason, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {reason}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10 border border-primary/20"
          >
            <p className="text-xl font-semibold">
              AI Automation is no longer about efficiency gains.
            </p>
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500 mt-2">
              It is about whether your business can operate reliably at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Traditional vs AI Automation */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Traditional Automation vs AI Automation
            </h2>
            <p className="text-muted-foreground">
              This distinction is critical — and why AI automation services are now replacing older RPA-heavy approaches.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-1 max-w-4xl mx-auto">
            <div className="bg-muted/50 p-4 rounded-tl-lg font-semibold text-center">
              Traditional Automation
            </div>
            <div className="bg-primary/10 p-4 rounded-tr-lg font-semibold text-center text-primary">
              AI Automation Services
            </div>
            {traditionalVsAI.map((row, i) => (
              <div key={`row-${i}`} className="contents">
                <div className={`bg-muted/30 p-4 flex items-center gap-2 ${i === traditionalVsAI.length - 1 ? 'rounded-bl-lg' : ''}`}>
                  <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{row.traditional}</span>
                </div>
                <div className={`bg-primary/5 p-4 flex items-center gap-2 ${i === traditionalVsAI.length - 1 ? 'rounded-br-lg' : ''}`}>
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{row.ai}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CapabilitiesSection />
      <EngineSection />

      {/* Industries */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industries Actively Using AI Automation
            </h2>
            <p className="text-muted-foreground">
              Each industry has different automation triggers, which we address through modular AI systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover-elevate text-center p-6">
                  <industry.icon className="w-8 h-8 mx-auto text-primary mb-3" />
                  <p className="font-semibold">{industry.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{industry.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <Calculator className="w-3 h-3 mr-1" />
              Interactive Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Automation Planning Tools
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Use these tools to identify automation opportunities, estimate costs, calculate ROI, and assess your organization's readiness.
            </p>
          </motion.div>

          <AutomationCalculator />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/10 rounded-xl border border-primary/20"
          >
            <p className="text-lg text-muted-foreground mb-4">
              Want a personalized automation roadmap based on your specific needs?
            </p>
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-automation-tools-cta">
              Get Your Custom Automation Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <PricingSection />
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Ready to Automate?
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to See AI Automation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                in Action?
              </span>
            </h2>

            <p className="text-lg text-muted-foreground">
              If your business relies on manual workflows, document-heavy processes, 
              email-driven operations, or disconnected systems — AI Automation can unlock immediate value.
            </p>

            <div className="pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} data-testid="button-cta-automation">
                  Request Your AI Automation Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      </main>
      <FAQSection
        faqs={documentFAQs['ai-automation']}
        title="AI Automation Questions Answered"
      />
      <MainFooter />
    </div>
  );
}
