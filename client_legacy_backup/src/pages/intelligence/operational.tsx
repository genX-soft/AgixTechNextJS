import { useState, useEffect } from "react";
import { Metadata } from "next";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  XCircle,
  Activity,
  Workflow,
  Eye,
  Lightbulb,
  Zap,
  Settings,
  RefreshCcw,
  Shield,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Target,
  Layers,
  MessageSquare,
  BarChart3,
  ChevronRight,
  ChevronDown,
  Building2,
  Headphones,
  ArrowDown,
  Sparkles,
  Network,
  Cpu,
  CircleDot,
  CheckCheck,
  RotateCcw,
  HelpCircle,
  Minus,
  Plus,
  X,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Operational AI Solutions | AGIX Technologies",
  description: "Operational AI solutions that transform real-time operational data into intelligent, autonomous decisions for modern business operations.",
  alternates: {
    canonical: "https://agixtech.com/intelligence/operational-ai",
  },
  openGraph: {
    title: "Operational AI Solutions",
    description: "Transform real-time operational data into intelligent, autonomous decisions.",
    url: "https://agixtech.com/intelligence/operational-ai",
    siteName: "AGIX Technologies",
    images: [
      {
        url: "https://agixtech.com/wp-content/uploads/agix-logo.png", // Using the logo from your JSON, or replace with a specific OG image
        width: 1200,
        height: 630,
        alt: "AGIX Operational Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agixtech.com/#organization",
      "name": "AGIX Technologies",
      "url": "https://agixtech.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://agixtech.com/wp-content/uploads/agix-logo.png"
      },
      "description": "Agix Technologies is an AI Systems Engineering and Agentic Intelligence company helping enterprises architect, deploy, and scale autonomous AI systems for measurable business outcomes.",
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "name": "Santosh Singh"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 857-365-6167",
        "contactType": "customer support",
        "areaServed": "Worldwide",
        "availableLanguage": ["English"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "99 Derby Street",
        "addressLocality": "Hingham",
        "addressRegion": "MA",
        "postalCode": "02043",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/company/agixtech",
        "https://twitter.com/agixtech",
        "https://www.facebook.com/agixtech"
      ],
      "areaServed": "Worldwide",
      "foundingLocation": "Hingham, Massachusetts, United States",
      "knowsAbout": [
        "AI Systems Engineering",
        "Agentic Intelligence",
        "Autonomous AI Systems",
        "Enterprise AI Architecture",
        "AI Agents",
        "Multi-Agent Systems",
        "LLM Engineering",
        "AI Orchestration",
        "Responsible AI",
        "Scalable AI Infrastructure"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://agixtech.com/intelligence/operational-ai#webpage",
      "url": "https://agixtech.com/intelligence/operational-ai",
      "name": "Operational AI Solutions",
      "about": {
        "@type": "Service",
        "@id": "https://agixtech.com/intelligence/operational-ai#service"
      },
      "description": "Operational AI solutions that transform real-time operational data into intelligent, autonomous decisions for modern business operations."
    },
    {
      "@type": "Service",
      "@id": "https://agixtech.com/intelligence/operational-ai#service",
      "name": "Operational AI Solutions",
      "provider": {
        "@id": "https://agixtech.com/#organization"
      },
      "serviceType": "Operational AI Intelligence",
      "areaServed": "Worldwide",
      "description": "Operational AI solutions that combine real-time intelligence, AI-driven decision-making, and scalable systems to optimize business operations.",
      "audience": {
        "@type": "Audience",
        "audienceType": "Enterprises and Business Operations Teams"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://agixtech.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Operational Intelligence",
          "item": "https://www.agixtech.com//intelligence/operational-ai"
        }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://agixtech.com/intelligence/operational-ai#ai-platform",
      "name": "Operational AI Intelligence Platform",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web-based",
      "description": "An operational AI intelligence platform providing interactive tools to assess AI readiness and recommend AI solutions for business use cases.",
      "hasPart": [
        {
          "@type": "SoftwareApplication",
          "@id": "https://agixtech.com/intelligence/operational-ai#tool-finder",
          "name": "AI Tool Recommendation Engine",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web-based",
          "description": "Analyzes business challenges and recommends the most suitable AI solutions for operational use cases."
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://agixtech.com/intelligence/operational-ai#ai-maturity-tool",
          "name": "AI Maturity Assessment",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web-based",
          "description": "Evaluates an organization's readiness for AI adoption across data, processes, technology, and governance."
        }
      ],
      "creator": {
        "@type": "Organization",
        "@id": "https://agixtech.com/#organization"
      },
      "isPartOf": {
        "@type": "WebPage",
        "@id": "https://agixtech.com/intelligence/operational-ai#webpage"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://agixtech.com/intelligence/operational-ai#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between Operational Intelligence and Business Intelligence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Business Intelligence focuses on historical data analysis and reporting to understand what happened. Operational Intelligence focuses on real-time monitoring and decision-making to respond to what's happening now. While BI helps you learn from the past, OI helps you act in the present."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to implement Operational Intelligence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Implementation timelines vary based on complexity. Observational Intelligence systems can be deployed in 6-8 weeks. Assistive systems typically take 8-12 weeks. Full Decision Intelligence with controlled autonomy may require 12-16 weeks. We start with quick wins and expand gradually."
          }
        },
        {
          "@type": "Question",
          "name": "Do we need to replace our existing systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Operational Intelligence integrates with your existing tools, databases, and workflows. We connect to your current systems through APIs and data feeds, adding an intelligence layer without disrupting what already works."
          }
        },
        {
          "@type": "Question",
          "name": "How does AI handle sensitive business decisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our systems include human-in-the-loop controls for critical decisions. AI can recommend, draft, or prepare actions, but humans approve high-stakes decisions. Every AI decision is logged, traceable, and explainable."
          }
        },
        {
          "@type": "Question",
          "name": "What industries benefit most from Operational Intelligence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Any industry with complex operations benefits. Healthcare, finance, logistics, retail, manufacturing, and professional services see significant improvements. The key factor is having repeatable processes with decision points that can be optimized."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from simple automation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Automation executes predefined rules. Operational Intelligence observes, understands context, and decides. It can handle exceptions, prioritize dynamically, and improve over time. Automation is a subset of what OI can orchestrate."
          }
        },
        {
          "@type": "Question",
          "name": "What kind of ROI can we expect from Operational Intelligence?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most organizations see 30-50% reduction in operational delays, 40-60% faster decision cycles, and 20-35% cost savings within the first year. ROI depends on your current operational maturity and the complexity of processes being optimized."
          }
        },
        {
          "@type": "Question",
          "name": "How does Operational Intelligence handle data security and privacy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We implement enterprise-grade security including end-to-end encryption, role-based access controls, and compliance with GDPR, HIPAA, and SOC 2 standards. Data can be processed on-premise or in secure cloud environments based on your requirements."
          }
        },
        {
          "@type": "Question",
          "name": "Can Operational Intelligence work with legacy systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our integration approach supports legacy systems through APIs, database connections, file-based integrations, and screen scraping when necessary. We've successfully integrated with systems dating back decades."
          }
        },
        {
          "@type": "Question",
          "name": "What happens when the AI makes a wrong decision?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every AI decision includes confidence scores and reasoning. Low-confidence decisions are flagged for human review. All decisions are logged with full audit trails, allowing you to identify issues, retrain models, and continuously improve accuracy."
          }
        },
        {
          "@type": "Question",
          "name": "How do you measure the success of an OI implementation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We establish baseline metrics before implementation, then track KPIs including decision speed, error rates, escalation frequency, cost per transaction, and employee satisfaction. Monthly reviews ensure continuous alignment with business goals."
          }
        },
        {
          "@type": "Question",
          "name": "What level of technical expertise does our team need?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No coding or technical expertise required for day-to-day operations. We provide intuitive dashboards and interfaces. Your team will receive training on system oversight, while AGIX handles all technical maintenance and updates."
          }
        },
        {
          "@type": "Question",
          "name": "Can we start small and scale up later?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We recommend starting with a single department or process as a pilot. This approach validates the value quickly, builds internal confidence, and creates a foundation for broader deployment across the organization."
          }
        },
        {
          "@type": "Question",
          "name": "How does Operational Intelligence improve over time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The system continuously learns from outcomes, user feedback, and changing patterns. Machine learning models are retrained regularly. As your business evolves, the intelligence layer adapts to new processes, exceptions, and requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What support and maintenance is included?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All implementations include 24/7 monitoring, regular system health checks, proactive optimization recommendations, and dedicated support. We provide quarterly business reviews to ensure the system continues meeting your evolving needs."
          }
        }
      ]
    }
  ]
};
function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50"
        data-testid="sticky-cta-container"
      >
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="w-80 shadow-xl border-orange-500/20" data-testid="card-sticky-cta">
              <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">Ready to Get Started?</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Get your free operational assessment</p>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="shrink-0" 
                  onClick={() => setIsExpanded(false)}
                  data-testid="button-sticky-cta-close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                  onClick={() => scrollToSection("cta-form")}
                  data-testid="button-sticky-cta-contact"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => { scrollToSection("interactive-tools"); setIsExpanded(false); }}
                  data-testid="button-sticky-cta-tools"
                >
                  Try Our Assessment Tools
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
              onClick={() => setIsExpanded(true)}
              data-testid="button-sticky-cta-toggle"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function HeroSection() {
  return (
    <section className="pt-24 pb-20 min-h-[80vh] flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 px-4 py-1.5" data-testid="badge-intelligence-category">
            <Workflow className="w-4 h-4 mr-2" />
            Intelligence
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
            Operational Intelligence That Keeps Your Business{" "}
            <span className="text-orange-400">Running Smoothly</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-hero-subheadline">
            AI systems that understand daily operations, detect issues early, and guide smarter decisions — in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 focus:ring-2 focus:ring-orange-500/50" 
              onClick={() => scrollToSection("interactive-tools")}
              data-testid="button-hero-cta-primary"
            >
              Find the Right Solution
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection("what-is-operational-intelligence")}
              data-testid="button-hero-cta-secondary"
            >
              Explore How It Works
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection("what-is-operational-intelligence")}
            className="cursor-pointer hover:text-orange-400 transition-colors"
            aria-label="Scroll down"
            data-testid="button-scroll-down"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted-foreground hover:text-orange-400"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="py-6 border-y border-slate-800/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-sm text-muted-foreground" data-testid="text-trust-strip">
          Trusted by startups and enterprises building AI-driven operations across{" "}
          <span className="text-blue-400">healthcare</span>,{" "}
          <span className="text-purple-400">finance</span>,{" "}
          <span className="text-green-400">logistics</span>,{" "}
          <span className="text-orange-400">retail</span>, and{" "}
          <span className="text-teal-400">professional services</span>.
        </p>
      </div>
    </section>
  );
}

function WhatIsOperationalIntelligence() {
  return (
    <section id="what-is-operational-intelligence" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-understanding">
            <Eye className="w-3 h-3 mr-1" />
            Understanding
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-what-is">
            What Is Operational Intelligence?
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Operational Intelligence is the ability of an organization to monitor operations in real time, 
            understand what is happening, and take the right action before problems escalate.
          </p>

          <Card className="bg-slate-900/50 border-slate-700 mb-8">
            <CardContent className="p-6">
              <p className="text-lg text-center">
                In simple words: Operational Intelligence turns everyday business operations into an{" "}
                <span className="text-blue-400">intelligent system</span> that can{" "}
                <span className="text-purple-400">observe</span>,{" "}
                <span className="text-green-400">think</span>, and{" "}
                <span className="text-orange-400">respond</span> continuously.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-red-400">
                  <XCircle className="w-4 h-4" />
                  Traditional Operations Rely On
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {["Static dashboards", "Manual follow-ups", "Delayed reports", "Human memory"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-traditional-${i}`}>
                    <XCircle className="w-3 h-3 text-red-400/50" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  AI-Powered Intelligence Uses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {["Real-time monitoring", "Automated insights", "Predictive alerts", "Continuous learning"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-ai-powered-${i}`}>
                    <CheckCircle2 className="w-3 h-3 text-green-400/50" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OperationsCategories() {
  const categories = [
    {
      title: "Core Business",
      icon: Building2,
      color: "text-blue-400",
      items: ["Order processing", "Supply chain coordination", "Service delivery", "Field operations"],
    },
    {
      title: "Internal & Management",
      icon: Settings,
      color: "text-purple-400",
      items: ["Task execution", "Approvals & escalations", "Compliance workflows", "Documentation"],
    },
    {
      title: "Customer & Support",
      icon: Headphones,
      color: "text-green-400",
      items: ["Customer service", "Appointment scheduling", "Ticket handling", "Onboarding"],
    },
    {
      title: "Revenue & Growth",
      icon: TrendingUp,
      color: "text-orange-400",
      items: ["Lead qualification", "Sales follow-ups", "Pricing approvals", "Churn prevention"],
    },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-scope">
            <Layers className="w-3 h-3 mr-1" />
            Scope
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-operations">
            Where Operations Live in Real Businesses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Operations include every recurring activity that keeps your business running.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`card-category-${i}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                    <span className={cat.color}>{cat.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-muted-foreground">
                        <CircleDot className={`w-2 h-2 ${cat.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { aspect: "Primary Function", automation: "Executes predefined steps", analytics: "Explains what happened", intelligence: "Understands what's happening now" },
    { aspect: "Adaptability", automation: "Works in predictable scenarios", analytics: "Requires human interpretation", intelligence: "Interprets context and risk" },
    { aspect: "Decision Making", automation: "Follows fixed rules", analytics: "Provides historical insights", intelligence: "Recommends or triggers actions" },
    { aspect: "Learning", automation: "Static unless reprogrammed", analytics: "Limited pattern recognition", intelligence: "Improves continuously" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-comparison">
            <BarChart3 className="w-3 h-3 mr-1" />
            Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-comparison">
            Intelligence vs Automation vs Analytics
          </h2>
        </motion.div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="text-left p-4 text-muted-foreground font-medium">Aspect</th>
                  <th className="text-center p-4 text-slate-400">Automation</th>
                  <th className="text-center p-4 text-purple-400">Analytics</th>
                  <th className="text-center p-4 text-orange-400 font-semibold">Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800" data-testid={`row-comparison-${i}`}>
                    <td className="p-4 font-medium">{row.aspect}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.automation}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.analytics}</td>
                    <td className="p-4 text-center text-orange-400">{row.intelligence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="text-center text-muted-foreground mt-6" data-testid="text-comparison-conclusion">
          Operational Intelligence <span className="text-orange-400 font-medium">decides first</span> — then automates where appropriate.
        </p>
      </div>
    </section>
  );
}

function WhyBusinessesNeedIt() {
  const hiddenCosts = [
    { icon: Clock, label: "Missed SLAs", color: "text-red-400" },
    { icon: RotateCcw, label: "Rework Loops", color: "text-amber-400" },
    { icon: Users, label: "Burned-out Teams", color: "text-orange-400" },
    { icon: TrendingUp, label: "Revenue Leakage", color: "text-red-400" },
    { icon: Shield, label: "Compliance Risks", color: "text-amber-400" },
    { icon: MessageSquare, label: "Customer Friction", color: "text-orange-400" },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-why">
            <Target className="w-3 h-3 mr-1" />
            Part 2
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why">
            Why Businesses Need Operational Intelligence
          </h2>
          <p className="text-xl text-muted-foreground">
            The Real Problem Is Not Speed — It's Decision Blindness
          </p>
        </motion.div>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold" data-testid="heading-drift">Operations Don't Usually Fail. They Drift.</h3>
            <p className="text-muted-foreground">
              Most businesses don't experience sudden operational collapse. Instead, they experience:
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {[
                "Slight delays becoming routine",
                "Teams constantly firefighting",
                "Decisions taken late",
                "Escalations after customer impact",
                "Growth creating confusion",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2" data-testid={`text-drift-${i}`}>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-xl font-semibold mb-6" data-testid="heading-hidden-costs">The Hidden Costs</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hiddenCosts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="text-center hover-elevate" data-testid={`card-cost-${i}`}>
                  <CardContent className="p-4">
                    <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-3 text-amber-400" data-testid="heading-automation-not-enough">
              Why Automation Alone Is Not Enough
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
              {["Automating inefficient processes", "Scaling the wrong decisions", "Increasing exception handling", "Losing human control"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-automation-issue-${i}`}>
                  <XCircle className="w-3 h-3 text-red-400" />
                  {item}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-700 text-center">
              <p className="text-sm" data-testid="text-automation-conclusion">
                <span className="text-red-400">Automation executes.</span>{" "}
                <span className="text-green-400">Operational Intelligence decides.</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    { title: "Signal & Data Layer", subtitle: "Seeing What's Happening", icon: Eye, color: "from-blue-500 to-blue-600", description: "Continuously observes operations by collecting signals from business systems, workflow events, communications, documents, and human actions.", capabilities: ["Business systems and tools", "Workflow events and logs", "Communications", "Documents and records"] },
    { title: "Context & Understanding", subtitle: "Knowing What It Means", icon: Brain, color: "from-purple-500 to-purple-600", description: "Uses AI to interpret unstructured information, understand intent and urgency, detect anomalies, and identify patterns.", capabilities: ["Interpret unstructured data", "Understand intent and priority", "Detect anomalies", "Identify patterns"] },
    { title: "Decision & Reasoning", subtitle: "Deciding What to Do", icon: Lightbulb, color: "from-amber-500 to-amber-600", description: "Combines AI reasoning, business rules, and compliance logic to determine the best action.", capabilities: ["AI reasoning models", "Business rules integration", "Risk and compliance logic", "Human approval workflows"] },
    { title: "Execution & Orchestration", subtitle: "Acting Across Systems", icon: Zap, color: "from-green-500 to-green-600", description: "Triggers workflows, routes tasks, sends alerts, and updates systems. Every action is traceable.", capabilities: ["Trigger workflows", "Route tasks", "Send alerts", "Update systems"] },
    { title: "Learning & Feedback", subtitle: "Getting Smarter", icon: RefreshCcw, color: "from-teal-500 to-teal-600", description: "Tracks outcomes, learns from overrides, refines prioritization, and improves accuracy continuously.", capabilities: ["Track outcomes", "Learn from overrides", "Refine recommendations", "Adapt continuously"] },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-architecture">
            <Network className="w-3 h-3 mr-1" />
            Part 3: Architecture
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-architecture">
            How AI Delivers Operational Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Five-Layer Architecture — designed for reliability, safety, and scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-2">
            {layers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => setActiveLayer(i)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      activeLayer === i 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-slate-700 hover:border-slate-600 bg-slate-900/30'
                    }`}
                    data-testid={`button-layer-${i}`}
                    aria-pressed={activeLayer === i}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">Layer {i + 1}</div>
                        <div className="font-medium truncate">{layer.title}</div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${activeLayer === i ? 'rotate-90 text-orange-400' : 'text-muted-foreground'}`} />
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-slate-700" data-testid="card-layer-details">
                  <CardContent className="p-6">
                    {(() => {
                      const layer = layers[activeLayer];
                      const Icon = layer.icon;
                      return (
                        <>
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-4`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold mb-1" data-testid="text-layer-title">{layer.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{layer.subtitle}</p>
                          <p className="text-muted-foreground mb-6" data-testid="text-layer-description">{layer.description}</p>
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Key Capabilities</p>
                            {layer.capabilities.map((cap, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm" data-testid={`text-capability-${j}`}>
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span>{cap}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgixMethodology() {
  const steps = [
    { step: "1", title: "Operational Mapping", desc: "Understand how work actually flows" },
    { step: "2", title: "Decision Points", desc: "Find where delays and risks exist" },
    { step: "3", title: "Intelligence Design", desc: "Define observe, decide, execute" },
    { step: "4", title: "Controlled Deployment", desc: "Start assistive before autonomy" },
    { step: "5", title: "Continuous Optimization", desc: "Improve using real feedback" },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-4" data-testid="badge-methodology">
            <Sparkles className="w-3 h-3 mr-1" />
            The AGIX Way
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-methodology">
            How AGIX Approaches Operational Intelligence
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full text-center hover-elevate" data-testid={`card-step-${i}`}>
                <CardContent className="p-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-3 text-white font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-400 shrink-0" />
                <div>
                  <h3 className="font-bold mb-2" data-testid="heading-governance">Governance Built In</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    {["Human-in-the-loop controls", "Decision traceability", "Audit logs & explainability", "Fail-safe mechanisms"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted-foreground" data-testid={`text-governance-${i}`}>
                        <CheckCheck className="w-3 h-3 text-green-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function InteractiveToolsSection() {
  const [activeTool, setActiveTool] = useState<"finder" | "maturity">("finder");
  const [finderStep, setFinderStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedBusinessModel, setSelectedBusinessModel] = useState("");
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [selectedMaturityAnswers, setSelectedMaturityAnswers] = useState<Record<string, string>>({});
  const [showFinderResults, setShowFinderResults] = useState(false);
  const [showMaturityResults, setShowMaturityResults] = useState(false);

  const industries = ["Healthcare", "Finance", "Retail", "Manufacturing", "Logistics", "Services", "Insurance", "Real Estate"];
  const businessModels = ["B2B", "B2C", "Hybrid"];
  const painPoints = [
    { id: "delays", label: "Frequent delays or missed deadlines", severity: "high" },
    { id: "overload", label: "Teams constantly overloaded", severity: "high" },
    { id: "escalations", label: "Too many escalations", severity: "medium" },
    { id: "visibility", label: "Lack of real-time visibility", severity: "high" },
    { id: "rework", label: "Repeated rework cycles", severity: "medium" },
    { id: "decisions", label: "Delayed or poor decisions", severity: "high" },
  ];

  const maturityQuestions = [
    { id: "data", question: "How is your operational data organized?", options: [{ value: "scattered", label: "Scattered across many systems" }, { value: "partial", label: "Partially centralized" }, { value: "organized", label: "Well-organized and accessible" }] },
    { id: "workflows", question: "How are workflows managed?", options: [{ value: "manual", label: "Mostly manual" }, { value: "tools", label: "Various disconnected tools" }, { value: "integrated", label: "Integrated platforms" }] },
    { id: "decisions", question: "How are operational decisions made?", options: [{ value: "reactive", label: "Reactive, after issues occur" }, { value: "periodic", label: "Based on periodic reports" }, { value: "realtime", label: "With real-time insights" }] },
  ];

  const getFinderRecommendation = () => {
    const highCount = selectedPainPoints.filter(p => painPoints.find(pp => pp.id === p)?.severity === "high").length;
    if (highCount >= 3) return { type: "Decision Intelligence + Controlled Autonomy", priority: "High", timeline: "12-16 weeks", depth: "Semi-Autonomous" };
    if (highCount >= 1) return { type: "Assistive Intelligence + Decision Support", priority: "Medium-High", timeline: "8-12 weeks", depth: "Assisted" };
    return { type: "Observational Intelligence", priority: "Medium", timeline: "6-8 weeks", depth: "Observe" };
  };

  const getMaturityScore = () => {
    let score = 0;
    Object.values(selectedMaturityAnswers).forEach(a => { if (a === "organized" || a === "integrated" || a === "realtime") score += 3; else if (a === "partial" || a === "tools" || a === "periodic") score += 2; else score += 1; });
    return Math.round((score / 9) * 100);
  };

  const togglePainPoint = (id: string) => setSelectedPainPoints(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  const resetFinder = () => { setShowFinderResults(false); setFinderStep(0); setSelectedIndustry(""); setSelectedBusinessModel(""); setSelectedPainPoints([]); };
  const resetMaturity = () => { setShowMaturityResults(false); setSelectedMaturityAnswers({}); };

  const canProceedStep1 = selectedIndustry !== "" && selectedBusinessModel !== "";
  const canProceedStep2 = selectedPainPoints.length > 0;
  const canShowMaturityResults = Object.keys(selectedMaturityAnswers).length === maturityQuestions.length;

  return (
    <section id="interactive-tools" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 mb-4" data-testid="badge-tools">
            <Cpu className="w-3 h-3 mr-1" />
            Part 4: Interactive Tools
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-tools">
            Find the Right AI Solution
          </h2>
          <p className="text-muted-foreground">
            Use these tools to discover your path — safely and confidently.
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-8">
          <Button 
            variant={activeTool === "finder" ? "default" : "outline"} 
            onClick={() => { setActiveTool("finder"); resetMaturity(); }} 
            className={activeTool === "finder" ? "bg-orange-500 hover:bg-orange-600" : ""} 
            data-testid="button-tool-finder"
          >
            <Target className="w-4 h-4 mr-2" />
            Solution Finder
          </Button>
          <Button 
            variant={activeTool === "maturity" ? "default" : "outline"} 
            onClick={() => { setActiveTool("maturity"); resetFinder(); }} 
            className={activeTool === "maturity" ? "bg-orange-500 hover:bg-orange-600" : ""} 
            data-testid="button-tool-maturity"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Maturity Assessment
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {activeTool === "finder" && (
            <motion.div key="finder" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card data-testid="card-finder">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-400" />
                    Solution Finder
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Answer a few questions to discover your starting point.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!showFinderResults ? (
                    <>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        {["Context", "Pain Points", "Results"].map((step, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${finderStep >= i ? 'bg-orange-500 text-white' : 'bg-slate-700'}`}>{i + 1}</div>
                            <span className={finderStep >= i ? 'text-white' : ''}>{step}</span>
                            {i < 2 && <div className={`w-8 h-0.5 ${finderStep > i ? 'bg-orange-500' : 'bg-slate-700'}`} />}
                          </div>
                        ))}
                      </div>

                      {finderStep === 0 && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Your Industry</label>
                            <div className="grid grid-cols-4 gap-2">
                              {industries.map((ind) => (
                                <Button key={ind} variant={selectedIndustry === ind ? "default" : "outline"} size="sm" onClick={() => setSelectedIndustry(ind)} className={selectedIndustry === ind ? "bg-orange-500 hover:bg-orange-600" : ""} data-testid={`button-industry-${ind.toLowerCase()}`}>{ind}</Button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Business Model</label>
                            <div className="flex gap-2">
                              {businessModels.map((model) => (
                                <Button key={model} variant={selectedBusinessModel === model ? "default" : "outline"} size="sm" onClick={() => setSelectedBusinessModel(model)} className={selectedBusinessModel === model ? "bg-orange-500 hover:bg-orange-600" : ""} data-testid={`button-model-${model.toLowerCase()}`}>{model}</Button>
                              ))}
                            </div>
                          </div>
                          <Button className="w-full bg-orange-500 hover:bg-orange-600" disabled={!canProceedStep1} onClick={() => setFinderStep(1)} data-testid="button-finder-next">
                            Continue <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}

                      {finderStep === 1 && (
                        <div className="space-y-4">
                          <label className="block text-sm font-medium">Select your operational pain points:</label>
                          <div className="grid gap-2">
                            {painPoints.map((point) => (
                              <button key={point.id} onClick={() => togglePainPoint(point.id)} className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${selectedPainPoints.includes(point.id) ? 'border-orange-500 bg-orange-500/10' : 'border-slate-700 hover:border-slate-600'}`} data-testid={`button-pain-${point.id}`}>
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedPainPoints.includes(point.id) ? 'border-orange-500 bg-orange-500' : 'border-slate-600'}`}>
                                  {selectedPainPoints.includes(point.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                                </div>
                                <span className="flex-1 text-sm">{point.label}</span>
                                <Badge variant="outline" className={`text-xs ${point.severity === 'high' ? 'border-red-500/30 text-red-400' : 'border-amber-500/30 text-amber-400'}`}>{point.severity}</Badge>
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setFinderStep(0)} data-testid="button-finder-back">Back</Button>
                            <Button className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={!canProceedStep2} onClick={() => setShowFinderResults(true)} data-testid="button-finder-results">
                              See Recommendations <Sparkles className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6" data-testid="finder-results">
                      {(() => {
                        const rec = getFinderRecommendation();
                        return (
                          <>
                            <div className="text-center pb-4 border-b border-slate-700">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-3"><CheckCircle2 className="w-3 h-3 mr-1" />Recommendation</Badge>
                              <h3 className="text-xl font-bold" data-testid="text-finder-type">{rec.type}</h3>
                              <p className="text-sm text-muted-foreground mt-1">Based on {selectedIndustry}, {selectedBusinessModel}, {selectedPainPoints.length} pain points</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <Card className="border-blue-500/20"><CardContent className="p-3"><p className="text-xs text-muted-foreground">Priority</p><p className="font-bold text-blue-400" data-testid="text-finder-priority">{rec.priority}</p></CardContent></Card>
                              <Card className="border-purple-500/20"><CardContent className="p-3"><p className="text-xs text-muted-foreground">Timeline</p><p className="font-bold text-purple-400" data-testid="text-finder-timeline">{rec.timeline}</p></CardContent></Card>
                              <Card className="border-green-500/20"><CardContent className="p-3"><p className="text-xs text-muted-foreground">Depth</p><p className="font-bold text-green-400" data-testid="text-finder-depth">{rec.depth}</p></CardContent></Card>
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={resetFinder} data-testid="button-finder-reset">Start Over</Button>
                              <Button className="flex-1 bg-orange-500 hover:bg-orange-600" data-testid="button-finder-discuss">Discuss With Us <ArrowRight className="w-4 h-4 ml-2" /></Button>
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTool === "maturity" && (
            <motion.div key="maturity" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card data-testid="card-maturity">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    AI Maturity Assessment
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Understand if your operations are ready for AI.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!showMaturityResults ? (
                    <>
                      <Progress value={(Object.keys(selectedMaturityAnswers).length / maturityQuestions.length) * 100} className="h-2" data-testid="progress-maturity" />
                      {maturityQuestions.map((q, i) => (
                        <div key={q.id} className="space-y-3">
                          <p className="font-medium text-sm">{i + 1}. {q.question}</p>
                          <div className="grid gap-2">
                            {q.options.map((opt) => (
                              <button key={opt.value} onClick={() => setSelectedMaturityAnswers({...selectedMaturityAnswers, [q.id]: opt.value})} className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${selectedMaturityAnswers[q.id] === opt.value ? 'border-purple-500 bg-purple-500/10' : 'border-slate-700 hover:border-slate-600'}`} data-testid={`button-maturity-${q.id}-${opt.value}`}>
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedMaturityAnswers[q.id] === opt.value ? 'border-purple-500 bg-purple-500' : 'border-slate-600'}`}>
                                  {selectedMaturityAnswers[q.id] === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <span className="text-sm">{opt.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" disabled={!canShowMaturityResults} onClick={() => setShowMaturityResults(true)} data-testid="button-maturity-results">
                        See Maturity Score <BarChart3 className="w-4 h-4 ml-2" />
                      </Button>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6" data-testid="maturity-results">
                      {(() => {
                        const score = getMaturityScore();
                        const level = score >= 70 ? "Ready" : score >= 40 ? "Emerging" : "Foundational";
                        const color = score >= 70 ? "text-green-400" : score >= 40 ? "text-amber-400" : "text-orange-400";
                        return (
                          <>
                            <div className="text-center pb-4">
                              <div className="relative w-32 h-32 mx-auto mb-4">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-700" />
                                  <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${score * 3.52} 352`} className={color} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                  <span className={`text-3xl font-bold ${color}`} data-testid="text-maturity-score">{score}%</span>
                                  <span className="text-xs text-muted-foreground">{level}</span>
                                </div>
                              </div>
                              <h3 className="text-xl font-bold" data-testid="text-maturity-level">Your AI Maturity: {level}</h3>
                            </div>
                            <Card className="border-slate-700">
                              <CardContent className="p-4 space-y-2 text-sm">
                                <h4 className="font-semibold">Next Steps:</h4>
                                {score >= 70 ? (
                                  <><div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" />Ready for advanced AI implementation</div><div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" />Consider Decision Intelligence systems</div></>
                                ) : score >= 40 ? (
                                  <><div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" />Start with Assistive Intelligence</div><div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" />Focus on data organization first</div></>
                                ) : (
                                  <><div className="flex items-center gap-2"><Activity className="w-4 h-4 text-orange-400" />Begin with Operational Mapping</div><div className="flex items-center gap-2"><Activity className="w-4 h-4 text-orange-400" />Consolidate data sources</div></>
                                )}
                              </CardContent>
                            </Card>
                            <div className="flex gap-3">
                              <Button variant="outline" onClick={resetMaturity} data-testid="button-maturity-reset">Retake</Button>
                              <Button className="flex-1 bg-orange-500 hover:bg-orange-600" data-testid="button-maturity-guidance">Get Personalized Guidance <ArrowRight className="w-4 h-4 ml-2" /></Button>
                            </div>
                          </>
                        );
                      })()}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ResultsMetrics() {
  const metrics = [
    { value: "40%", label: "Reduction in Operational Delays", color: "text-green-400" },
    { value: "60%", label: "Faster Decision Making", color: "text-blue-400" },
    { value: "35%", label: "Decrease in Manual Escalations", color: "text-purple-400" },
    { value: "25%", label: "Cost Savings on Operations", color: "text-orange-400" },
  ];

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-green-500/30 text-green-400 mb-4" data-testid="badge-results">
            <TrendingUp className="w-3 h-3 mr-1" />
            Proven Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-results">
            What Our Clients Achieve
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-results-description">
            Real outcomes from businesses that implemented Operational Intelligence with AGIX.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center hover-elevate" data-testid={`card-metric-${i}`}>
                <CardContent className="p-6">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color}`} data-testid={`text-metric-value-${i}`}>
                    {metric.value}
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid={`text-metric-label-${i}`}>{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the difference between Operational Intelligence and Business Intelligence?",
      answer: "Business Intelligence focuses on historical data analysis and reporting to understand what happened. Operational Intelligence focuses on real-time monitoring and decision-making to respond to what's happening now. While BI helps you learn from the past, OI helps you act in the present.",
    },
    {
      question: "How long does it take to implement Operational Intelligence?",
      answer: "Implementation timelines vary based on complexity. Observational Intelligence systems can be deployed in 6-8 weeks. Assistive systems typically take 8-12 weeks. Full Decision Intelligence with controlled autonomy may require 12-16 weeks. We start with quick wins and expand gradually.",
    },
    {
      question: "Do we need to replace our existing systems?",
      answer: "No. Operational Intelligence integrates with your existing tools, databases, and workflows. We connect to your current systems through APIs and data feeds, adding an intelligence layer without disrupting what already works.",
    },
    {
      question: "How does AI handle sensitive business decisions?",
      answer: "Our systems include human-in-the-loop controls for critical decisions. AI can recommend, draft, or prepare actions, but humans approve high-stakes decisions. Every AI decision is logged, traceable, and explainable.",
    },
    {
      question: "What industries benefit most from Operational Intelligence?",
      answer: "Any industry with complex operations benefits. Healthcare, finance, logistics, retail, manufacturing, and professional services see significant improvements. The key factor is having repeatable processes with decision points that can be optimized.",
    },
    {
      question: "How is this different from simple automation?",
      answer: "Automation executes predefined rules. Operational Intelligence observes, understands context, and decides. It can handle exceptions, prioritize dynamically, and improve over time. Automation is a subset of what OI can orchestrate.",
    },
    {
      question: "What kind of ROI can we expect from Operational Intelligence?",
      answer: "Most organizations see 30-50% reduction in operational delays, 40-60% faster decision cycles, and 20-35% cost savings within the first year. ROI depends on your current operational maturity and the complexity of processes being optimized.",
    },
    {
      question: "How does Operational Intelligence handle data security and privacy?",
      answer: "We implement enterprise-grade security including end-to-end encryption, role-based access controls, and compliance with GDPR, HIPAA, and SOC 2 standards. Data can be processed on-premise or in secure cloud environments based on your requirements.",
    },
    {
      question: "Can Operational Intelligence work with legacy systems?",
      answer: "Yes. Our integration approach supports legacy systems through APIs, database connections, file-based integrations, and screen scraping when necessary. We've successfully integrated with systems dating back decades.",
    },
    {
      question: "What happens when the AI makes a wrong decision?",
      answer: "Every AI decision includes confidence scores and reasoning. Low-confidence decisions are flagged for human review. All decisions are logged with full audit trails, allowing you to identify issues, retrain models, and continuously improve accuracy.",
    },
    {
      question: "How do you measure the success of an OI implementation?",
      answer: "We establish baseline metrics before implementation, then track KPIs including decision speed, error rates, escalation frequency, cost per transaction, and employee satisfaction. Monthly reviews ensure continuous alignment with business goals.",
    },
    {
      question: "What level of technical expertise does our team need?",
      answer: "No coding or technical expertise required for day-to-day operations. We provide intuitive dashboards and interfaces. Your team will receive training on system oversight, while AGIX handles all technical maintenance and updates.",
    },
    {
      question: "Can we start small and scale up later?",
      answer: "Absolutely. We recommend starting with a single department or process as a pilot. This approach validates the value quickly, builds internal confidence, and creates a foundation for broader deployment across the organization.",
    },
    {
      question: "How does Operational Intelligence improve over time?",
      answer: "The system continuously learns from outcomes, user feedback, and changing patterns. Machine learning models are retrained regularly. As your business evolves, the intelligence layer adapts to new processes, exceptions, and requirements.",
    },
    {
      question: "What support and maintenance is included?",
      answer: "All implementations include 24/7 monitoring, regular system health checks, proactive optimization recommendations, and dedicated support. We provide quarterly business reviews to ensure the system continues meeting your evolving needs.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-faq">
            <HelpCircle className="w-3 h-3 mr-1" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-faq">
            Common Questions About Operational Intelligence
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-visible" data-testid={`card-faq-${i}`}>
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4"
                  aria-expanded={openIndex === i}
                  data-testid={`button-faq-toggle-${i}`}
                >
                  <span className="font-medium" data-testid={`text-faq-question-${i}`}>{faq.question}</span>
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-orange-500 text-white' : 'bg-slate-700'}`}>
                    {openIndex === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 text-muted-foreground text-sm" data-testid={`text-faq-answer-${i}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function OperationalIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainHeader />
      <HeroSection />
      <TrustStrip />
      <WhatIsOperationalIntelligence />
      <OperationsCategories />
      <ComparisonTable />
      <WhyBusinessesNeedIt />
      <ArchitectureSection />
      <AgixMethodology />
      <InteractiveToolsSection />
      <ResultsMetrics />
      <FAQSection />
      <section id="cta-form" className="py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <CtaForm 
            headline="Ready to Transform Your Operations?"
            subheadline="Let's discuss how Operational Intelligence can bring clarity, control, and confidence to your business."
          />
        </div>
      </section>
      <StickyCTA />
    </div>
  );
}

