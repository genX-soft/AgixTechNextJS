'use client'

import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Compass,
  Building2,
  Rocket,
  LineChart,
  CheckCircle2,
  Lightbulb,
  Target,
  Users,
  Clock,
  Zap,
  Brain,
  FileText,
  BarChart3,
  MessageSquare,
  Play
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const tools = [
  {
    id: "ai-starting-point",
    title: "AI Starting Point Finder",
    description: "Not sure where to begin with AI? This interactive tool helps you discover the best AI opportunities for your specific business situation.",
    href: "/tools/ai-starting-point",
    icon: Compass,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    bestFor: ["First-time AI adopters", "Small to medium businesses", "Quick assessment needs"],
    duration: "5-10 minutes",
    outcome: "Personalized AI roadmap with recommended starting points",
    steps: [
      "Answer questions about your industry and business size",
      "Identify your current challenges and pain points",
      "Select your priority areas for improvement",
      "Receive tailored AI recommendations"
    ]
  },
  {
    id: "enterprise-strategy",
    title: "Enterprise AI Strategy Tool",
    description: "Designed for larger organizations looking to implement AI at scale. Get a comprehensive strategy framework tailored to enterprise needs.",
    href: "/tools/enterprise-strategy",
    icon: Building2,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    bestFor: ["Large enterprises (500+ employees)", "Multi-department initiatives", "Strategic planning teams"],
    duration: "15-20 minutes",
    outcome: "Enterprise AI implementation roadmap with ROI projections",
    steps: [
      "Assess your current technology infrastructure",
      "Map departmental AI opportunities",
      "Prioritize initiatives by impact and feasibility",
      "Generate implementation timeline and budget estimates"
    ]
  },
  {
    id: "startup-accelerator",
    title: "Startup AI Accelerator",
    description: "Built specifically for startups and growing companies. Fast-track your AI adoption with lean, cost-effective strategies.",
    href: "/tools/startup-accelerator",
    icon: Rocket,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    bestFor: ["Startups and scale-ups", "Resource-conscious teams", "Rapid implementation needs"],
    duration: "8-12 minutes",
    outcome: "Lean AI implementation plan with quick wins",
    steps: [
      "Define your startup stage and growth goals",
      "Identify high-impact, low-effort AI opportunities",
      "Get budget-friendly tool recommendations",
      "Create a phased implementation plan"
    ]
  },
  {
    id: "operational-efficiency",
    title: "Operational Efficiency Analyzer",
    description: "Focus on streamlining operations with AI. Identify bottlenecks and automation opportunities across your workflows.",
    href: "/tools/operational-efficiency",
    icon: LineChart,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    bestFor: ["Operations managers", "Process improvement teams", "Efficiency-focused businesses"],
    duration: "10-15 minutes",
    outcome: "Process automation recommendations with efficiency gains",
    steps: [
      "Map your current operational workflows",
      "Identify repetitive and time-consuming tasks",
      "Prioritize automation opportunities",
      "Calculate potential time and cost savings"
    ]
  },
];

const tips = [
  {
    icon: Clock,
    title: "Set Aside Uninterrupted Time",
    description: "Each tool works best when you can focus without distractions. Block 15-20 minutes for the best experience."
  },
  {
    icon: Users,
    title: "Involve Key Stakeholders",
    description: "For enterprise tools, consider involving decision-makers from different departments for comprehensive insights."
  },
  {
    icon: FileText,
    title: "Have Your Data Ready",
    description: "Know your current metrics: team size, annual revenue range, main pain points, and technology stack."
  },
  {
    icon: Target,
    title: "Be Specific About Goals",
    description: "The more specific you are about what you want to achieve, the more relevant your recommendations will be."
  },
];

export default function HowToUsePage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950">
      <MainHeader />
      
      <main className="flex-1 pt-20">
        <section className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <Badge variant="outline" className="border-primary/30 text-primary mb-4">
                AI Tools Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                How to Use Our AI Tools
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our interactive tools help you discover the right AI solutions for your business. 
                Here's everything you need to know to get started.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                Tips for Best Results
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tips.map((tip, index) => (
                  <Card key={index} className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <tip.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
                      <p className="text-sm text-slate-400">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                Available AI Tools
              </h2>
              <div className="space-y-6">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid lg:grid-cols-3 gap-0">
                          <div className="p-6 lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-800">
                            <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4`}>
                              <tool.icon className={`w-6 h-6 ${tool.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                              <Clock className="w-4 h-4" />
                              <span>{tool.duration}</span>
                            </div>
                            <Link href={tool.href}>
                              <Button className="gap-2 w-full" data-testid={`button-start-${tool.id}`}>
                                <Play className="w-4 h-4" />
                                Start Tool
                              </Button>
                            </Link>
                          </div>
                          
                          <div className="p-6 lg:col-span-2">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                                  <Users className="w-4 h-4 text-primary" />
                                  Best For
                                </h4>
                                <ul className="space-y-2">
                                  {tool.bestFor.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                                  <BarChart3 className="w-4 h-4 text-primary" />
                                  How It Works
                                </h4>
                                <ol className="space-y-2">
                                  {tool.steps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {i + 1}
                                      </span>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                            
                            <div className="mt-6 pt-4 border-t border-slate-800">
                              <div className="flex items-start gap-2">
                                <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="text-sm font-medium text-white">What You'll Get: </span>
                                  <span className="text-sm text-slate-400">{tool.outcome}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16"
            >
              <Card className="bg-gradient-to-br from-primary/10 to-orange-600/10 border-primary/20">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Need Personalized Guidance?
                  </h3>
                  <p className="text-slate-400 max-w-xl mx-auto mb-6">
                    Our AI experts are ready to help you navigate your AI journey. 
                    Schedule a free consultation to discuss your specific needs.
                  </p>
                  <Link href="/#contact">
                    <Button size="lg" className="gap-2" data-testid="button-schedule-consultation">
                      Schedule Free Consultation
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      
      <MainFooter />
    </div>
  );
}
