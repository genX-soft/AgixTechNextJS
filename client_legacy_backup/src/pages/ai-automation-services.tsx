import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { 
  ArrowRight, 
  Check,
  CheckCircle,
  X, 
  XCircle,
  Workflow, 
  FileText, 
  Mail, 
  Cog, 
  Sparkles,
  Building2,
  Briefcase,
  Heart,
  ShoppingCart,
  Truck,
  Factory,
  Code2,
  Home,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  Zap,
  Shield,
  BarChart3,
  Network,
  Database,
  Bot,
  LineChart,
  Lock,
  Calculator,
  TrendingUp,
  Users,
  Quote,
  Star,
  ExternalLink,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent, useABTest, getABTestVariant, trackABConversion } from "@/lib/analytics";

function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
}

function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums" data-testid="text-animated-counter">
      {count}{suffix}
    </span>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-background/50 z-[100]">
      <motion.div
        className="h-full bg-primary"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function HeroSection() {
  const headlineWords = ["Engineering", "AI", "Automation", "That", "Eliminates", "Manual", "Operations"];
  const subHeadlineItems = ["Workflows", "Processes", "Documents", "Communication"];
  const { variant: heroCtaVariant, value: heroCtaText } = useABTest<string>('hero_cta');

  const handleHeroCtaClick = () => {
    trackEvent('cta_click', { event_category: 'hero', event_label: 'primary_cta' });
    trackABConversion('hero_cta', heroCtaVariant);
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-16 pb-12 lg:pt-20 lg:pb-16 overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-3 space-y-5 lg:space-y-6">
            <div className="space-y-3">
              <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1" data-testid="badge-hero">
                AI Automation Services
              </Badge>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight" data-testid="heading-hero">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`inline-block mr-2 sm:mr-3 ${word === "AI" || word === "Automation" ? "text-primary" : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm sm:text-base lg:text-lg text-muted-foreground"
              >
                <span>Across</span>
                {subHeadlineItems.map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-primary font-medium">{item}</span>
                    {i < subHeadlineItems.length - 1 && <span className="text-muted-foreground/50">&</span>}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed"
              data-testid="text-hero-description"
            >
              AGIX delivers AI Automation Services that replace repetitive human work with intelligent, 
              self-operating systems — helping businesses reduce cost, improve speed, and scale without 
              increasing headcount.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="p-3 sm:p-4 rounded-lg bg-card/50 border border-border max-w-xl"
            >
              <p className="text-xs sm:text-sm text-muted-foreground italic">
                This is not basic automation or RPA.
              </p>
              <p className="text-xs sm:text-sm font-medium mt-1">
                This is <span className="text-primary">AI-driven business automation</span> designed for real-world complexity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col gap-2 max-w-xl"
            >
              <a href="#roi-calculator" className="group flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-gradient-to-r from-primary/15 to-primary/5 hover:from-primary/25 hover:to-primary/10 transition-all" data-testid="link-hero-roi-calculator">
                <Calculator className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Calculate Your Automation ROI
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Interactive tool (takes ~30 seconds) — input your costs, see projected savings
                  </p>
                </div>
              </a>
              <a href="#capabilities" className="group flex items-start gap-3 p-3 rounded-lg border border-cyan-400/40 bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 hover:from-cyan-500/25 hover:to-cyan-500/10 transition-all" data-testid="link-hero-readiness">
                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-cyan-400 transition-colors">
                    Explore Automation Capabilities
                  </p>
                  <p className="text-xs text-muted-foreground">
                    See which workflows can be automated for your industry
                  </p>
                </div>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-xs sm:text-sm text-muted-foreground"
              data-testid="text-hero-trust"
            >
              Trusted by businesses automating operations across 
              <span className="text-foreground font-medium"> finance, healthcare, SaaS, logistics </span> 
              & enterprise systems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 z-10">
              <LeadCaptureForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeadCaptureForm() {
  const { toast } = useToast();
  const { variant: formHeadingVariant, value: formHeadingText } = useABTest<string>('form_heading');
  const [hasStarted, setHasStarted] = useState(false);

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      companySize: "",
      automationGoal: "",
    },
  });

  const handleFormStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('lead_form_start', { event_category: 'form', event_label: 'lead_capture' });
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response;
    },
    onSuccess: () => {
      trackEvent('lead_form_submit', { event_category: 'conversion', event_label: 'lead_capture' });
      trackABConversion('form_heading', formHeadingVariant);
      toast({
        title: "Request Submitted!",
        description: "We'll send your automation roadmap shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutation.mutate(data);
  };

  return (
    <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-xl" id="contact">
      <CardHeader className="space-y-1 p-4 sm:p-6 pb-2 sm:pb-4">
        <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold" data-testid="text-form-title">
          {formHeadingText}
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Tell us about your automation needs
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      {...field} 
                      onFocus={handleFormStart}
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="you@company.com" 
                      {...field}
                      data-testid="input-email" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-company-size">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="automationGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want to automate?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the processes or workflows you'd like to automate..."
                      className="resize-none"
                      rows={3}
                      {...field}
                      data-testid="textarea-automation-goal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600" 
              disabled={mutation.isPending}
              data-testid="button-submit-form"
            >
              {mutation.isPending ? "Submitting..." : "Get Automation Roadmap"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function WhyAIAutomationSection() {
  const { ref, isInView } = useScrollAnimation();
  
  const tools = ["CRMs", "ERPs", "Ticketing & support systems", "Email & communication platforms", "Cloud tools & internal software"];

  const systemProblems = [
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

  const aiCapabilities = [
    "Interpret data and intent",
    "Route work dynamically",
    "Trigger actions automatically",
    "Handle exceptions intelligently",
    "Adapt as conditions change"
  ];

  const whyNow = [
    "Businesses are operating with higher volume, lower margins",
    "Manual coordination no longer scales",
    "Customers expect faster, consistent responses",
    "Compliance and accuracy requirements are increasing",
    "AI capabilities are now production-ready (not experimental)"
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-card/30" id="why" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6"
        >
          <Badge variant="secondary" className="text-xs sm:text-sm">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 inline" />
            Strategic Priority
          </Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold" data-testid="heading-why-automation">
            Why AI Automation Is a <span className="text-primary">Business Priority</span> — Not a Technology Trend
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
            Search demand for AI automation services, AI workflow automation, and AI business process automation has accelerated because modern businesses are no longer struggling with tools — they are struggling with <span className="font-medium text-foreground">execution at scale</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm sm:text-base">
            <span className="text-muted-foreground">The challenge is not digital adoption.</span>
            <span className="font-semibold text-foreground">The challenge is operational complexity.</span>
          </div>
        </motion.div>

        <div className="mt-10 sm:mt-12 lg:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Most organizations already operate with:</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {tools.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3" data-testid={`badge-tool-${i}`}>
                      {tool}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="p-4 sm:p-5 rounded-lg bg-background border border-border"
            >
              <p className="text-base sm:text-lg font-medium mb-3">
                Yet despite this stack, <span className="text-primary">work still moves manually</span>.
              </p>
              <p className="text-sm text-muted-foreground mb-3">Why? Because these systems:</p>
              <ul className="space-y-2">
                {systemProblems.map((problem, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <XCircle className="w-4 h-4 text-destructive shrink-0" />
                    {problem}
                  </motion.li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                They store data — but they <span className="font-medium text-foreground">don't run operations</span>.
              </p>
            </motion.div>

            <div className="space-y-3">
              <h4 className="text-sm sm:text-base font-semibold">The Resulting Business Reality:</h4>
              <div className="flex flex-wrap gap-2">
                {businessReality.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0 + i * 0.1 }}
                  >
                    <Badge variant="outline" className="text-xs border-destructive/30 text-destructive">
                      {item}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                As volume increases, complexity compounds — and scaling requires more people, not better systems.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent overflow-visible">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold">
                    AI Automation Fixes the Execution Gap
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  By introducing <span className="text-primary font-semibold">intelligence</span> into how work moves — not just connecting APIs.
                </p>
                <p className="text-sm text-muted-foreground">
                  AI automation adds a decision layer on top of your existing systems, enabling them to:
                </p>
                <ul className="space-y-2">
                  {aiCapabilities.map((cap, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {cap}
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-primary/20">
                  <p className="text-xs sm:text-sm font-medium">
                    This is why AI automation is now viewed as an <span className="text-primary">operational necessity</span>, not an experimental initiative.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/30 bg-gradient-to-br from-accent/10 to-transparent">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h4 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Why This Shift Is Happening Now
                </h4>
                <ul className="space-y-2">
                  {whyNow.map((reason, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.3 + i * 0.15 }}
                      className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {reason}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8 }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-base sm:text-lg lg:text-xl font-semibold">
            AI Automation is no longer about efficiency gains.
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mt-2">
            It is about whether your business can operate reliably at scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function WhatAIAutomationMeansSection() {
  const { ref, isInView } = useScrollAnimation();
  
  const capabilities = [
    "Understands data (structured + unstructured)",
    "Interprets intent",
    "Makes decisions",
    "Executes workflows",
    "Learns from outcomes"
  ];

  const conditions = [
    "Inputs change",
    "Exceptions occur",
    "Data is incomplete",
    "Human judgment is required"
  ];

  return (
    <section className="py-20 lg:py-28" id="definition" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-what-ai-means">
                What AI Automation Means at <span className="text-primary">AGIX</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                AI Automation Services at AGIX focus on designing systems where artificial intelligence:
              </p>
            </div>
            
            <ul className="space-y-3">
              {capabilities.map((cap, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span data-testid={`text-capability-${i}`}>{cap}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <Card className="bg-card/50 border-border">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold">
                  This enables intelligent process automation that works even when:
                </h3>
                <ul className="space-y-3">
                  {conditions.map((cond, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      <span data-testid={`text-condition-${i}`}>{cond}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="p-5 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-sm text-muted-foreground italic">
                If a process needs people only because "systems can't think,"
              </p>
              <p className="text-base font-medium mt-2">
                it is a strong candidate for <span className="text-primary">AI automation</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const { ref, isInView } = useScrollAnimation();
  
  const comparisons = [
    { traditional: "Rule-based workflows", ai: "Context-aware intelligence" },
    { traditional: "Breaks on edge cases", ai: "Handles ambiguity" },
    { traditional: "Requires constant manual fixes", ai: "Learns and adapts" },
    { traditional: "Task-level execution", ai: "End-to-end process ownership" },
    { traditional: "Limited scalability", ai: "Built for enterprise scale" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-card/30" id="comparison" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-comparison">
            Traditional Automation vs <span className="text-primary">AI Automation</span>
          </h2>
          <p className="text-muted-foreground">
            This distinction is critical — and why AI automation services are now replacing older RPA-heavy approaches.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <span className="text-sm font-medium text-muted-foreground">Traditional Automation</span>
            </div>
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">AI Automation Services</span>
            </div>
          </div>

          <div className="space-y-3">
            {comparisons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <Card className="bg-muted/30 border-border/50">
                  <CardContent className="p-4 flex items-center gap-3">
                    <X className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-sm text-muted-foreground" data-testid={`text-traditional-${i}`}>
                      {item.traditional}
                    </span>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium" data-testid={`text-ai-${i}`}>
                      {item.ai}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemsSection() {
  const { ref, isInView } = useScrollAnimation();

  const problems = [
    {
      icon: Workflow,
      title: "Manual Workflow Dependency",
      points: ["Transfer data between systems", "Track approvals", "Trigger follow-ups", "Monitor task status"],
      solution: "AI Workflow Automation removes manual handoffs by orchestrating actions across tools intelligently.",
    },
    {
      icon: Cog,
      title: "Inefficient Business Processes",
      points: ["Human checks", "Static rules", "Disconnected systems"],
      solution: "AI Business Process Automation (BPA) manages entire processes end-to-end using decision intelligence.",
    },
    {
      icon: FileText,
      title: "Document Processing Bottlenecks",
      points: ["Invoices", "Contracts", "Forms", "PDFs", "Scanned files"],
      solution: "AI Document Intelligence extracts, validates, and triggers workflows automatically.",
    },
    {
      icon: Mail,
      title: "Communication Overload",
      points: ["Emails as hidden task queues", "Unmanaged messages", "Unstructured requests"],
      solution: "Email & Communication Automation uses AI to read intent, take action, and respond intelligently.",
    },
    {
      icon: Sparkles,
      title: "Tool Adoption Without Transformation",
      points: ["Digital tools alone don't change operations"],
      solution: "AI-Led Digital Transformation redesigns how work flows using automation-first architecture.",
    },
  ];

  return (
    <section className="py-20 lg:py-28" id="problems" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-problems">
            Core Business Problems Driving <span className="text-primary">AI Automation</span> Adoption
          </h2>
        </motion.div>

        <div className="space-y-8">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15 }}
            >
              <Card className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="p-6 lg:p-8 bg-destructive/5 border-r border-border">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <X className="w-6 h-6 text-destructive" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold" data-testid={`text-problem-title-${i}`}>
                            {problem.title}
                          </h3>
                          <ul className="space-y-2">
                            {problem.points.map((point, j) => (
                              <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 lg:p-8 bg-primary/5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <problem.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            Solution
                          </span>
                          <p className="text-sm" data-testid={`text-solution-${i}`}>
                            {problem.solution}
                          </p>
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
  );
}

function WhatCanBeAutomatedSection() {
  const { ref, isInView } = useScrollAnimation();

  const items = [
    "Business workflows",
    "Operational processes",
    "Document processing",
    "Email handling",
    "Internal approvals",
    "Customer communications",
    "Compliance reporting",
    "Data routing between systems",
  ];

  return (
    <section className="py-20 lg:py-28 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-what-can-be-automated">
              What Can Be <span className="text-primary">Automated</span> Using AI?
            </h2>
            <p className="text-muted-foreground text-lg">
              Businesses typically automate:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm" data-testid={`text-automatable-${i}`}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Network className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  One Unified Framework
                </h3>
                <p className="text-muted-foreground">
                  AGIX combines all of these into one unified AI automation framework, 
                  rather than fragmented solutions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const { ref, isInView } = useScrollAnimation();

  const industries = [
    { icon: Heart, name: "Healthcare", label: "Healthcare automation systems" },
    { icon: Building2, name: "Finance & FinTech", label: "Finance process automation" },
    { icon: Shield, name: "Insurance", label: "Insurance claims automation" },
    { icon: Home, name: "Real Estate", label: "Real estate workflow automation" },
    { icon: ShoppingCart, name: "E-commerce", label: "E-commerce operations automation" },
    { icon: Truck, name: "Logistics", label: "Supply chain automation" },
    { icon: Factory, name: "Manufacturing", label: "Manufacturing process automation" },
    { icon: Code2, name: "SaaS", label: "SaaS internal automation" },
  ];

  return (
    <section className="py-16 lg:py-24" id="industries" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-8 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" data-testid="heading-industries">
            Industries Actively Using <span className="text-primary">AI Automation</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Each industry has different automation triggers, which we address through modular AI systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card 
                className="group cursor-pointer hover-elevate transition-all duration-300 hover:border-primary/30"
                data-testid={`card-industry-${industry.name.toLowerCase().replace(/\s|&/g, "-")}`}
              >
                <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <industry.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm">{industry.name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{industry.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, isInView } = useScrollAnimation();

  const stats = [
    { value: 80, suffix: "%", label: "Reduction in Manual Work" },
    { value: 60, suffix: "%", label: "Faster Processing Time" },
    { value: 3, suffix: "-6 mo", label: "Typical ROI Timeline" },
    { value: 99, suffix: "%", label: "Accuracy Rate" },
  ];

  return (
    <section className="py-12 lg:py-16 bg-primary/5 border-y border-primary/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-1 sm:space-y-2"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary" data-testid={`stat-value-${i}`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground" data-testid={`stat-label-${i}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const { ref, isInView } = useScrollAnimation();

  const capabilities = [
    {
      id: "workflow",
      icon: Workflow,
      title: "AI Workflow Automation",
      subtitle: "Intelligent, Cross-System Workflow Automation Using AI",
      description: "AI Workflow Automation uses artificial intelligence to design, orchestrate, and optimize workflows across multiple business systems — enabling actions, decisions, and routing without manual intervention.",
      problems: ["Manual data movement between tools", "Delayed approvals and follow-ups", "Broken workflows when conditions change", "Overdependence on human coordination"],
      useCases: ["Lead routing across CRM, email, and sales tools", "Customer onboarding automation", "Order-to-delivery workflow automation", "Internal approval and escalation flows", "Cross-department task orchestration"],
      features: ["AI-based decision routing (not static rules)", "Context-aware triggers", "Exception handling using LLMs", "Real-time system synchronization"],
      timeline: "4–8 weeks",
      pricing: "$8K – $30K+",
    },
    {
      id: "bpa",
      icon: Cog,
      title: "AI Business Process Automation (BPA)",
      subtitle: "End-to-End Process Automation with Decision Intelligence",
      description: "AI Business Process Automation (BPA) automates entire business processes — not just tasks — using AI to manage decisions, exceptions, and outcomes across multiple stages.",
      problems: ["Process delays due to human dependency", "High error rates in critical operations", "Lack of real-time visibility into process health", "Inability to scale without adding staff"],
      useCases: ["Claims processing automation", "Invoice-to-payment automation", "Employee onboarding & offboarding", "Vendor onboarding workflows", "Regulatory and compliance reporting"],
      features: ["Intelligent decision checkpoints", "Adaptive logic instead of rigid rules", "Human-in-the-loop where required", "Continuous process optimization"],
      timeline: "8–12 weeks",
      pricing: "$15K – $60K+",
    },
    {
      id: "document",
      icon: FileText,
      title: "Document Intelligence",
      subtitle: "AI-Powered Document Processing & Automation",
      description: "Document Intelligence uses AI (OCR + NLP + semantic models) to extract, classify, validate, and act on information from unstructured documents.",
      problems: ["Manual document review", "Data entry errors", "Processing delays", "Compliance risks"],
      useCases: ["Invoice and receipt processing", "Contract analysis and extraction", "KYC / onboarding document handling", "Insurance claims documentation", "Report and form digitization"],
      features: ["Multi-format OCR (PDFs, scans, images)", "Context-aware extraction", "Auto-validation against systems", "Workflow triggers based on content"],
      timeline: "4–8 weeks",
      pricing: "$8K – $35K+",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email & Communication Automation",
      subtitle: "AI-Powered Email Understanding, Action & Response",
      description: "Email & Communication Automation uses AI to read, understand, categorize, respond to, and trigger workflows from emails and messages — turning inboxes into structured systems.",
      problems: ["Inbox overload", "Missed follow-ups", "Manual ticket creation", "Delayed responses"],
      useCases: ["Sales inquiry handling", "Support request routing", "Vendor communication automation", "Internal request processing", "Follow-up & reminder automation"],
      features: ["Intent detection using NLP", "Context-aware responses", "Action-triggered automation", "CRM & system updates"],
      timeline: "3–6 weeks",
      pricing: "$6K – $25K+",
    },
    {
      id: "transformation",
      icon: Sparkles,
      title: "AI-Led Digital Transformation",
      subtitle: "Re-Engineering Operations Around AI Automation",
      description: "AI-Led Digital Transformation focuses on redesigning business operations with AI automation at the core — not layering AI on top of broken processes.",
      problems: ["Tool sprawl without efficiency", "Legacy systems slowing growth", "Poor ROI from digital investments", "Disconnected operations"],
      useCases: ["Legacy workflow modernization", "Automation-first operating models", "AI-enabled shared services", "Enterprise process redesign"],
      features: ["Process-first redesign", "Automation architecture planning", "AI governance & controls", "Scalable execution roadmap"],
      timeline: "3–6 months",
      pricing: "$25K – $150K+",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-card/30" id="capabilities" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-8 lg:mb-12"
        >
          <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1">
            Core Capabilities
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" data-testid="heading-capabilities">
            Five Tightly Integrated <span className="text-primary">Automation Layers</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            These are not separate offerings — they work together as one automation ecosystem.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <AccordionItem value={cap.id} className="border rounded-lg bg-card overflow-hidden">
                <AccordionTrigger className="px-6 py-5 hover:no-underline" data-testid={`accordion-trigger-${cap.id}`}>
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <cap.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{cap.title}</h3>
                      <p className="text-sm text-muted-foreground">{cap.subtitle}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-2">
                    <p className="text-muted-foreground" data-testid={`text-cap-desc-${cap.id}`}>
                      {cap.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <X className="w-4 h-4 text-destructive" />
                          Problems It Solves
                        </h4>
                        <ul className="space-y-2">
                          {cap.problems.map((p, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-2 flex-shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary" />
                          Use Cases
                        </h4>
                        <ul className="space-y-2">
                          {cap.useCases.map((uc, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              {uc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cap.features.map((f, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          <span className="text-muted-foreground">Timeline:</span>{" "}
                          <span className="font-medium">{cap.timeline}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          <span className="text-muted-foreground">Investment:</span>{" "}
                          <span className="font-medium">{cap.pricing}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function EngineSection() {
  const { ref, isInView } = useScrollAnimation();

  const layers = [
    {
      icon: BarChart3,
      title: "Automation Opportunity Intelligence",
      subtitle: "Discovery That Actually Finds ROI",
      description: "Identify what should be automated first — not everything.",
      outputs: ["Automation Opportunity Map", "Priority heatmap (High ROI → Low ROI)", "Automation readiness score"],
    },
    {
      icon: Network,
      title: "Intelligence Architecture Design",
      subtitle: "Where AI Is Actually Engineered",
      description: "Decide how intelligence flows, not just which tools to use.",
      outputs: ["AI decision points", "Human-in-the-loop checkpoints", "Fail-safe logic", "Exception handling paths"],
    },
    {
      icon: Database,
      title: "System & Data Integration",
      subtitle: "Automation Only Works If Systems Talk",
      description: "Connect tools, data, and workflows into one automation fabric.",
      outputs: ["CRM / ERP systems", "Databases", "Email platforms", "Cloud apps", "Internal tools"],
    },
    {
      icon: Bot,
      title: "AI Execution & Orchestration",
      subtitle: "Where Automation Comes Alive",
      description: "Execute workflows with intelligence, not scripts.",
      outputs: ["AI interprets inputs", "Decisions made dynamically", "Actions executed across systems", "Exceptions handled gracefully"],
    },
    {
      icon: LineChart,
      title: "Monitoring, Optimization & Learning",
      subtitle: "Automation That Improves Over Time",
      description: "Ensure automation delivers measurable business outcomes.",
      outputs: ["Processing time reduction", "Error rate reduction", "Cost savings", "Throughput improvement"],
    },
    {
      icon: Lock,
      title: "Governance, Security & Scale",
      subtitle: "Enterprise Trust Layer",
      description: "Make automation safe, auditable, and scalable.",
      outputs: ["Role-based access control", "Audit logs", "Compliance checkpoints", "SOC2-aligned practices"],
    },
  ];

  return (
    <section className="py-20 lg:py-28" id="engine" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-4 mb-16"
        >
          <Badge variant="secondary" className="text-sm px-4 py-1.5">
            The AGIX Automation Engine
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold" data-testid="heading-engine">
            A 6-Layer System for Building <span className="text-primary">Scalable AI Automation</span>
          </h2>
          <p className="text-muted-foreground">
            Most vendors automate workflows. AGIX engineers an automation operating layer for your business.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />
          
          <div className="space-y-8">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15 }}
                className={`lg:w-[45%] ${i % 2 === 0 ? "" : "lg:ml-auto"}`}
              >
                <Card 
                  className="relative overflow-hidden group hover-elevate transition-all duration-300 hover:border-primary/30"
                  data-testid={`card-engine-layer-${i}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary" />
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <layer.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary">LAYER {i + 1}</span>
                        </div>
                        <h3 className="font-semibold text-lg" data-testid={`text-layer-title-${i}`}>
                          {layer.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{layer.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.outputs.map((output, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {output}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { ref, isInView } = useScrollAnimation();

  const faqs = [
    {
      q: "What are AI automation services?",
      a: "AI automation services use artificial intelligence to automate business workflows, processes, documents, and communications that normally require human decision-making. Unlike basic automation, AI automation understands context, handles exceptions, learns from outcomes, and scales across departments. This is why businesses search for enterprise AI automation services instead of simple workflow tools.",
    },
    {
      q: "What is the difference between AI automation and RPA?",
      a: "RPA (Robotic Process Automation) uses rule-based scripts that break on change and work only on structured data at the task level. AI automation is intelligence-driven, adapts to new inputs, handles unstructured data, and works at the process level. AI automation services replace or enhance RPA by adding intelligence, making them suitable for real business environments.",
    },
    {
      q: "How much does AI automation cost?",
      a: "AI automation pricing depends on the number of systems involved, process complexity, decision logic required, and volume of data. Typical ranges: Simple workflow automation ($6K – $10K), Department-level automation ($10K – $25K), End-to-end business process automation ($25K – $60K), Enterprise AI-led automation programs ($60K – $150K+). AGIX focuses on ROI-based pricing, not per-task pricing.",
    },
    {
      q: "Is AI automation expensive for small or mid-sized businesses?",
      a: "No — this is a common misconception. Many mid-sized businesses adopt AI automation because hiring additional staff costs more long-term, manual errors create hidden losses, and scaling operations without automation becomes impossible. AGIX often delivers cost recovery within 3–6 months through automation.",
    },
    {
      q: "How long does AI automation take to implement?",
      a: "Implementation timelines depend on scope: Email or document automation (3–6 weeks), Workflow automation across tools (4–8 weeks), Business process automation (8–12 weeks), Enterprise AI transformation (3–6 months phased). AGIX follows phased delivery, so value is realized early.",
    },
    {
      q: "Can AI automation integrate with existing software?",
      a: "Yes. AGIX builds API-first, automation-ready integration layers that connect with CRM/ERP systems, databases, email platforms, cloud apps, and internal tools. We integrate with your existing software stack rather than requiring you to switch platforms.",
    },
    {
      q: "What types of documents can AI automation process?",
      a: "Our Document Intelligence can process invoices, contracts, purchase orders, medical records, legal documents, insurance claims, receipts, ID documents, emails with attachments, handwritten forms, and more. The AI extracts data, validates it against business rules, and routes it to the right systems automatically.",
    },
    {
      q: "Do I need technical expertise to use AI automation?",
      a: "No. AGIX handles the technical implementation end-to-end. We work with your business team to understand processes, build the automation, integrate with your systems, and provide training. Your team interacts with simple dashboards and reports — not code.",
    },
    {
      q: "What happens when the AI encounters something it cannot handle?",
      a: "Our systems include intelligent exception handling. When the AI encounters edge cases or low-confidence decisions, it automatically flags them for human review through a simple queue interface. Over time, these exceptions become learning opportunities that improve accuracy.",
    },
    {
      q: "Is my data secure with AI automation?",
      a: "Absolutely. AGIX implements enterprise-grade security including end-to-end encryption, role-based access control, audit logging, and compliance with GDPR, HIPAA, SOC 2, and other standards. Your data never leaves your approved environments without explicit permission.",
    },
    {
      q: "Can AI automation work 24/7?",
      a: "Yes. Unlike human workers, AI automation operates continuously without breaks, holidays, or shift changes. This means faster turnaround times, consistent processing regardless of volume spikes, and the ability to serve global customers across time zones.",
    },
    {
      q: "What ROI can I expect from AI automation?",
      a: "Typical clients see 60-90% reduction in processing time, 40-70% cost savings on manual tasks, near-zero error rates compared to 2-5% human error, and payback periods of 3-6 months. Use our ROI calculator above to estimate your specific savings based on your team size and processes.",
    },
    {
      q: "How do you ensure AI automation quality?",
      a: "We implement multi-layer quality assurance: automated validation rules, confidence scoring, random sampling audits, continuous monitoring dashboards, and feedback loops that improve accuracy over time. Most clients see 99%+ accuracy within the first 90 days.",
    },
    {
      q: "Can I start small and scale up?",
      a: "Absolutely. We recommend starting with a high-impact, well-defined process to prove value quickly. Once you see results, you can expand to additional workflows, departments, or business units. Our modular architecture makes scaling seamless.",
    },
  ];

  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleFaqOpen = (value: string) => {
    if (!openItems.includes(value)) {
      setOpenItems([...openItems, value]);
      trackEvent('faq_expand', { event_category: 'engagement', event_label: value });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-card/30" id="faq" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-8 lg:mb-12"
        >
          <Badge variant="secondary" className="text-xs px-3 py-1">
            {faqs.length} Common Questions
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" data-testid="heading-faq">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Based on real search queries and client conversations. Can not find your answer? Contact us directly.
          </p>
        </motion.div>

        <Accordion 
          type="single" 
          collapsible 
          className="space-y-2 sm:space-y-3"
          onValueChange={(value) => value && handleFaqOpen(value)}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.03 }}
            >
              <AccordionItem value={`faq-${i}`} className="border rounded-lg bg-card overflow-hidden">
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-left hover:no-underline gap-2" data-testid={`faq-trigger-${i}`}>
                  <span className="font-medium text-sm sm:text-base pr-2">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed" data-testid={`faq-answer-${i}`}>
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <a href="#contact">
            <Button variant="outline" size="default" data-testid="button-faq-contact">
              Still have questions? Contact us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isInView } = useScrollAnimation();
  const { variant: finalCtaVariant, value: finalCtaText } = useABTest<string>('final_cta');

  const handleFinalCtaClick = () => {
    trackEvent('cta_click', { event_category: 'final_cta', event_label: 'bottom_cta' });
    trackABConversion('final_cta', finalCtaVariant);
  };

  return (
    <section className="py-16 lg:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <CardContent className="relative p-6 sm:p-8 lg:p-12">
              <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" data-testid="heading-cta">
                  Ready to Eliminate <span className="text-primary">Manual Operations</span>?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                  If your business has workflows, documents, processes, or communication 
                  that still rely on manual work — then AI Automation can unlock immediate value.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <a href="#contact" onClick={handleFinalCtaClick}>
                    <Button size="default" className="text-sm sm:text-base px-6 sm:px-8 animate-pulse-glow" data-testid="button-final-cta">
                      {finalCtaText}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  const { ref, isInView } = useScrollAnimation();

  const handleCaseStudyView = (studyId: string) => {
    trackEvent('case_study_view', { event_category: 'engagement', event_label: studyId });
  };

  const caseStudies = [
    {
      id: "fintech",
      company: "Global FinTech Corp",
      industry: "Finance",
      logo: Building2,
      challenge: "Manual processing of 5,000+ daily transactions requiring 40+ hours of staff time weekly.",
      solution: "Implemented AI-driven transaction processing with intelligent exception handling.",
      results: [
        { metric: "Processing Time", before: "40+ hours/week", after: "4 hours/week", improvement: "90%" },
        { metric: "Error Rate", before: "3.2%", after: "0.1%", improvement: "97%" },
        { metric: "Cost Savings", before: "-", after: "$280K/year", improvement: "" },
      ],
      testimonial: "AGIX transformed our operations. What used to take our team days now happens automatically with near-perfect accuracy.",
      author: "Sarah Chen",
      role: "VP of Operations",
      rating: 5,
    },
    {
      id: "healthcare",
      company: "MedCare Solutions",
      industry: "Healthcare",
      logo: Heart,
      challenge: "Patient intake documents required manual review, causing 3-day average processing delays.",
      solution: "Deployed Document Intelligence with automated validation and EHR integration.",
      results: [
        { metric: "Processing Time", before: "3 days", after: "15 minutes", improvement: "99%" },
        { metric: "Staff Hours", before: "120 hrs/week", after: "12 hrs/week", improvement: "90%" },
        { metric: "Patient Satisfaction", before: "72%", after: "94%", improvement: "31%" },
      ],
      testimonial: "The speed and accuracy of automated document processing has revolutionized our patient experience.",
      author: "Dr. Michael Torres",
      role: "Chief Medical Officer",
      rating: 5,
    },
    {
      id: "ecommerce",
      company: "RetailFlow Inc",
      industry: "E-commerce",
      logo: ShoppingCart,
      challenge: "Customer service team overwhelmed with 2,000+ daily emails, response times averaging 48 hours.",
      solution: "Email & Communication Automation with intent detection and smart routing.",
      results: [
        { metric: "Response Time", before: "48 hours", after: "2 hours", improvement: "96%" },
        { metric: "Tickets Resolved", before: "60%", after: "85%", improvement: "42%" },
        { metric: "Customer Satisfaction", before: "68%", after: "92%", improvement: "35%" },
      ],
      testimonial: "Our customers are happier, our team is more productive, and we've reduced support costs significantly.",
      author: "Jennifer Walsh",
      role: "Director of Customer Success",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 lg:py-24" id="case-studies" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-8 lg:mb-12"
        >
          <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1">
            Success Stories
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" data-testid="heading-case-studies">
            Real Results from <span className="text-primary">AI Automation</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            See how businesses across industries have transformed their operations with AGIX.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <Dialog onOpenChange={(open) => open && handleCaseStudyView(study.id)}>
                <DialogTrigger asChild>
                  <Card 
                    className="cursor-pointer hover-elevate transition-all duration-300 hover:border-primary/30 h-full"
                    data-testid={`card-case-study-${study.id}`}
                  >
                    <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <study.logo className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="text-[10px] sm:text-xs">{study.industry}</Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base lg:text-lg">{study.company}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{study.challenge}</p>
                      </div>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {[...Array(study.rating)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full text-xs sm:text-sm" data-testid={`button-view-case-study-${study.id}`}>
                        View Case Study
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <study.logo className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <DialogTitle className="text-xl">{study.company}</DialogTitle>
                        <DialogDescription className="text-sm">{study.industry} Automation</DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <X className="w-4 h-4 text-destructive" />
                        The Challenge
                      </h4>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        The Solution
                      </h4>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Results
                      </h4>
                      <div className="grid gap-3">
                        {study.results.map((result, j) => (
                          <div key={j} className="p-4 rounded-lg bg-card border border-border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{result.metric}</span>
                              {result.improvement && (
                                <Badge variant="secondary" className="text-xs text-primary">
                                  {result.improvement} improvement
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-xs text-muted-foreground">Before</span>
                                <p className="text-sm font-medium text-destructive">{result.before}</p>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">After</span>
                                <p className="text-sm font-medium text-primary">{result.after}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <Quote className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm italic text-muted-foreground mb-3">"{study.testimonial}"</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{study.author}</p>
                          <p className="text-xs text-muted-foreground">{study.role}</p>
                        </div>
                      </div>
                    </div>
                    <a href="#contact">
                      <Button className="w-full" data-testid={`button-cta-case-study-${study.id}`}>
                        Get Similar Results
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ROICalculatorSection() {
  const { ref, isInView } = useScrollAnimation();
  const [employees, setEmployees] = useState([25]);
  const [hoursPerWeek, setHoursPerWeek] = useState([20]);
  const [hourlyRate, setHourlyRate] = useState([50]);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const weeklyHoursSaved = Math.round(hoursPerWeek[0] * 0.8);
  const annualSavings = weeklyHoursSaved * hourlyRate[0] * 52;
  const monthlyROI = Math.round(annualSavings / 12);
  const paybackMonths = annualSavings > 15000 ? Math.ceil(15000 / monthlyROI) : 12;

  const handleSliderChange = (setter: (val: number[]) => void) => (value: number[]) => {
    if (!hasInteracted) {
      setHasInteracted(true);
      trackEvent('roi_calculator_use', { event_category: 'engagement', event_label: 'calculator_interaction' });
    }
    setter(value);
  };

  const handleRoiCtaClick = () => {
    trackEvent('cta_click', { 
      event_category: 'roi_calculator', 
      event_label: 'get_custom_analysis',
      value: annualSavings 
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-card/30" id="roi-calculator" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-8 lg:mb-12"
        >
          <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1">
            <Calculator className="w-3 h-3 sm:w-4 sm:h-4 mr-1 inline" />
            ROI Calculator
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" data-testid="heading-roi-calculator">
            Calculate Your <span className="text-primary">Automation Savings</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            See how much you could save by automating repetitive manual tasks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-primary/20">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-medium">Team Size</label>
                      <span className="text-xs sm:text-sm text-primary font-semibold" data-testid="value-employees">{employees[0]} employees</span>
                    </div>
                    <Slider
                      value={employees}
                      onValueChange={handleSliderChange(setEmployees)}
                      min={5}
                      max={500}
                      step={5}
                      className="w-full"
                      data-testid="slider-employees"
                    />
                    <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                      <span>5</span>
                      <span>500</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-medium">Manual Hours per Week</label>
                      <span className="text-xs sm:text-sm text-primary font-semibold" data-testid="value-hours">{hoursPerWeek[0]} hours</span>
                    </div>
                    <Slider
                      value={hoursPerWeek}
                      onValueChange={handleSliderChange(setHoursPerWeek)}
                      min={5}
                      max={100}
                      step={5}
                      className="w-full"
                      data-testid="slider-hours"
                    />
                    <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                      <span>5 hrs</span>
                      <span>100 hrs</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-medium">Average Hourly Rate</label>
                      <span className="text-xs sm:text-sm text-primary font-semibold" data-testid="value-rate">${hourlyRate[0]}/hr</span>
                    </div>
                    <Slider
                      value={hourlyRate}
                      onValueChange={handleSliderChange(setHourlyRate)}
                      min={20}
                      max={150}
                      step={5}
                      className="w-full"
                      data-testid="slider-rate"
                    />
                    <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                      <span>$20</span>
                      <span>$150</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="p-4 sm:p-6 rounded-lg bg-primary/5 border border-primary/20 space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Estimated Savings
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Weekly Hours Saved</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary" data-testid="result-hours-saved">
                          {weeklyHoursSaved}
                        </p>
                      </div>
                      <div className="space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Monthly Savings</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary" data-testid="result-monthly-savings">
                          ${monthlyROI.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t border-primary/20">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Annual Savings</p>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary" data-testid="result-annual-savings">
                        ${annualSavings.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="pt-3 sm:pt-4 border-t border-primary/20">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Estimated Payback Period</p>
                      <p className="text-sm sm:text-base lg:text-lg font-semibold" data-testid="result-payback">
                        {paybackMonths} months
                      </p>
                    </div>
                  </div>

                  <a href="#contact" onClick={handleRoiCtaClick}>
                    <Button className="w-full text-sm sm:text-base" size="default" data-testid="button-roi-cta">
                      Get Your Custom ROI Analysis
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </a>
                  
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                    Based on 80% automation efficiency. Actual results may vary based on process complexity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 sm:py-12 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm sm:text-lg">AGIX</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center" data-testid="text-footer-copyright">
            Engineering AI Automation for Modern Business Operations
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="text-xs sm:text-sm text-muted-foreground hover-elevate px-2 py-1 rounded-md" data-testid="link-privacy">
              Privacy
            </a>
            <a href="#" className="text-xs sm:text-sm text-muted-foreground hover-elevate px-2 py-1 rounded-md" data-testid="link-terms">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function AIAutomationServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <MainHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <WhyAIAutomationSection />
        <WhatAIAutomationMeansSection />
        <ComparisonSection />
        <ProblemsSection />
        <WhatCanBeAutomatedSection />
        <IndustriesSection />
        <CapabilitiesSection />
        <EngineSection />
        <CaseStudiesSection />
        <ROICalculatorSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <MainFooter />
    </div>
  );
}
