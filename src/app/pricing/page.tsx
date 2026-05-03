'use client'

import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Mic, 
  Brain, 
  Database,
  LineChart,
  Code2,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import Schema from "@/components/Schema";

const pricingTiers = [
  {
    title: "AI Automation",
    icon: Zap,
    description: "Workflow, document, and process orchestration",
    items: [
      { name: "Focused Workflows", price: "$8,000 – $25,000" },
      { name: "Enterprise Systems", price: "$30,000 – $100,000+" }
    ],
    features: ["n8n/Make orchestration", "CRM/ERP integration", "Decision logic layer"]
  },
  {
    title: "AI Voice Agents",
    icon: Mic,
    description: "Autonomous voice AI for call handling",
    items: [
      { name: "Single Use Case", price: "$12,000 – $35,000" },
      { name: "Enterprise Multi-Use", price: "$40,000 – $120,000+" }
    ],
    features: ["24/7 call handling", "Lead qualification", "Calendar integration"]
  },
  {
    title: "Agentic AI Systems",
    icon: Brain,
    description: "Multi-step reasoning and execution agents",
    items: [
      { name: "Single Agent", price: "$20,000 – $60,000" },
      { name: "Multi-Agent Systems", price: "$60,000 – $200,000+" }
    ],
    features: ["LangGraph/CrewAI", "Tool-use capabilities", "Self-correction loops"]
  },
  {
    title: "RAG & Knowledge AI",
    icon: Database,
    description: "Hallucination-free internal data layers",
    items: [
      { name: "Standard Deployment", price: "$15,000 – $50,000" },
      { name: "Enterprise Scale", price: "$50,000 – $150,000+" }
    ],
    features: ["Vector DB setup", "Source citation", "On-premise options"]
  }
];

const secondaryServices = [
  { name: "Conversational AI Chatbots", price: "$10,000 – $90,000", icon: Sparkles },
  { name: "Predictive Analytics AI", price: "$15,000 – $150,000", icon: LineChart },
  { name: "Computer Vision Solutions", price: "$20,000 – $200,000", icon: ShieldCheck },
  { name: "Custom AI Development", price: "$30,000 – $500,000+", icon: Code2 }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Schema type="pricing" />
      <MainHeader />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 py-1 px-3">
              <Calculator className="w-4 h-4 mr-2" />
              Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Investment for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                Enterprise Intelligence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              AGIX Technologies engineers bespoke AI systems. Pricing is based on business impact, system complexity, and automation depth.
            </p>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
            {pricingTiers.map((tier, idx) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <tier.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{tier.title}</h3>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {tier.items.map((item) => (
                        <div key={item.name} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-primary font-bold">{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Capabilities Included:</p>
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Secondary Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Specialized Solutions</h2>
              <p className="text-muted-foreground">Tailored AI development for specific operational needs.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {secondaryServices.map((service) => (
                <Card key={service.name} className="border-primary/5 bg-muted/20">
                  <CardContent className="p-6">
                    <service.icon className="w-8 h-8 text-primary/60 mb-4" />
                    <h4 className="font-semibold mb-1">{service.name}</h4>
                    <p className="text-primary font-bold">{service.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* ROI Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 rounded-3xl p-8 md:p-12 border border-primary/20 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">The AGIX ROI Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Most clients achieve a <span className="text-primary font-bold">40% operational cost reduction</span> within 12 months. Typical payback period is 3–8 months.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
              <div className="space-y-2">
                <h4 className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  IP Ownership
                </h4>
                <p className="text-sm text-muted-foreground">Clients own all models and code. No vendor lock-in.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Production Ready
                </h4>
                <p className="text-sm text-muted-foreground">Built for enterprise scale and governance from day one.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Rapid Payback
                </h4>
                <p className="text-sm text-muted-foreground">Measurable business outcomes within the first 90 days.</p>
              </div>
            </div>
            <div className="mt-10">
              <Button size="lg" className="px-8" asChild>
                <a href="/corporate/contact/">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
