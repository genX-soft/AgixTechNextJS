import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { 
  ShoppingCart,
  Users,
  Clock,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calculator,
  Target,
  Zap,
  Search,
  AlertCircle,
  AlertTriangle,
  Star,
  UserCheck,
  Headphones,
  RefreshCw,
  Database,
  Bot,
  Shield,
  Layers,
  ShoppingBag,
  Building2,
  Store,
  Brain,
  RotateCcw,
  HelpCircle,
  Lightbulb
} from "lucide-react";

const institutionTypes = [
  { id: "d2c", label: "D2C Brand", icon: ShoppingBag },
  { id: "marketplace", label: "Marketplace Operator", icon: Store },
  { id: "retail", label: "Retail Chain", icon: Building2 },
  { id: "startup", label: "E-commerce Startup", icon: Layers }
];

const challenges = [
  { id: "support", label: "Customer Support Overload" },
  { id: "cart", label: "Cart Abandonment" },
  { id: "discovery", label: "Product Discovery" },
  { id: "returns", label: "Returns & Refunds" },
  { id: "inventory", label: "Inventory Management" },
  { id: "fraud", label: "Fraud & Payments" },
  { id: "retention", label: "Retention & LTV" },
  { id: "ops", label: "Internal Operations" }
];

const bottlenecks = [
  {
    id: "A",
    title: "Customer Support Overload & Rising Costs",
    icon: Headphones,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    symptoms: [
      "Too many 'Where is my order?' tickets",
      "Agents answer the same questions repeatedly",
      "Response times stretch during sales",
      "Support cost grows faster than revenue"
    ],
    whoFaces: "D2C brands, Marketplaces, Multi-location retail chains",
    solution: {
      name: "AI E-Commerce Support Agent",
      description: "24/7 automated support",
      whatItDoes: [
        "Handles queries like order status, delivery, returns",
        "Syncs with Shopify/WooCommerce for real-time order data",
        "Escalates only complex or emotional cases",
        "Operates on website, WhatsApp, Instagram, email"
      ],
      aiType: "Conversational AI + RAG + Workflow automation",
      timeline: "3-5 weeks",
      costSmall: "$3K - $6K",
      costLarge: "$10K - $18K",
      impact: "60-80% reduction in repetitive tickets"
    }
  },
  {
    id: "B",
    title: "Cart Abandonment & Lost Checkout Revenue",
    icon: ShoppingCart,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    symptoms: [
      "Users drop at checkout",
      "Price hesitation goes unanswered",
      "Shipping confusion",
      "No real-time assistance"
    ],
    whoFaces: "All ecommerce stores, D2C & mobile-heavy brands",
    solution: {
      name: "AI Cart Recovery & Checkout Assistance",
      description: "Proactive checkout support",
      whatItDoes: [
        "AI detects hesitation and offers help",
        "Answers pricing, shipping, returns instantly",
        "Triggers smart follow-ups via email/WhatsApp",
        "Personalizes messaging based on cart value"
      ],
      aiType: "Real-time intent detection + Personalized messaging",
      timeline: "3-5 weeks",
      costSmall: "$4K - $8K",
      costLarge: "$14K - $22K",
      impact: "+10% to +25% cart recovery"
    }
  },
  {
    id: "C",
    title: "Product Discovery & Poor Personalization",
    icon: Search,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    symptoms: [
      "Users can't find the right product",
      "Too many SKUs, no guidance",
      "Generic 'recommended products'",
      "Search results don't match intent"
    ],
    whoFaces: "Brands with large catalogs, Marketplaces, Fashion/electronics/grocery",
    solution: {
      name: "AI Product Discovery & Recommendation Engine",
      description: "Semantic search + intelligent recommendations",
      whatItDoes: [
        "AI-powered search understands natural language",
        "Personalized recommendations based on behavior",
        "Visual similarity matching for fashion/decor",
        "Contextual suggestions based on intent"
      ],
      aiType: "Semantic search + Recommendation AI + Embeddings",
      timeline: "5-8 weeks",
      costSmall: "$8K - $14K",
      costLarge: "$25K - $45K",
      impact: "+5% to +15% conversion rate"
    }
  },
  {
    id: "D",
    title: "Returns, Refunds & Reverse Logistics",
    icon: RotateCcw,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    symptoms: [
      "High return rate",
      "Manual return approvals",
      "Delayed refunds",
      "Return fraud slipping through"
    ],
    whoFaces: "Fashion & apparel, High-volume D2C brands, Marketplaces",
    solution: {
      name: "AI Returns & Refund Automation",
      description: "Automated eligibility and processing",
      whatItDoes: [
        "AI handles return requests and eligibility checks",
        "Automates refund approvals based on policy",
        "Provides real-time status updates",
        "Flags potential fraud patterns"
      ],
      aiType: "Rule-based automation + Fraud detection",
      timeline: "4-6 weeks",
      costSmall: "$5K - $10K",
      costLarge: "$18K - $30K",
      impact: "70-90% returns automated"
    }
  },
  {
    id: "E",
    title: "Inventory Mismatch & Discount Pressure",
    icon: TrendingUp,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    symptoms: [
      "Overstocking slow SKUs",
      "Stockouts on fast movers",
      "Poor forecasting",
      "Last-minute discounting pressure"
    ],
    whoFaces: "Growing D2C brands, Retail chains, Seasonal products",
    solution: {
      name: "AI Demand Forecasting & Inventory Intelligence",
      description: "Predictive inventory optimization",
      whatItDoes: [
        "Analyzes sales patterns, seasonality, trends",
        "Predicts demand by SKU and category",
        "Generates reorder alerts",
        "Identifies slow-moving inventory for promotion"
      ],
      aiType: "Time-series forecasting + Demand prediction",
      timeline: "6-10 weeks",
      costSmall: "$12K - $20K",
      costLarge: "$35K - $60K",
      impact: "Reduced stockouts & overstock"
    }
  },
  {
    id: "F",
    title: "Fraud, Fake Orders & Payment Risk",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    symptoms: [
      "Fake COD orders",
      "High chargebacks",
      "Payment gateway disputes",
      "Manual fraud checks"
    ],
    whoFaces: "COD-heavy markets, Marketplaces, High-ticket ecommerce",
    solution: {
      name: "AI Fraud Detection & Risk Intelligence",
      description: "Real-time fraud prevention",
      whatItDoes: [
        "Scores orders in real-time for fraud risk",
        "Detects patterns: repeat addresses, velocity checks",
        "Blocks or flags high-risk transactions",
        "Learns and adapts to new fraud patterns"
      ],
      aiType: "Anomaly detection + Behavioral analysis",
      timeline: "5-8 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$30K - $50K",
      impact: "Reduced fraud losses"
    }
  },
  {
    id: "G",
    title: "Retention, Repeat Purchases & Low LTV",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    symptoms: [
      "One-time buyers don't return",
      "Generic email/SMS campaigns",
      "No post-purchase personalization",
      "Campaign fatigue"
    ],
    whoFaces: "D2C brands, Subscription products, High-CAC businesses",
    solution: {
      name: "AI Retention & LTV Optimization Engine",
      description: "Personalized engagement",
      whatItDoes: [
        "Segments customers by behavior and value",
        "Triggers personalized campaigns at optimal times",
        "Predicts churn risk and intervenes",
        "Recommends cross-sell/upsell opportunities"
      ],
      aiType: "Customer segmentation + Churn prediction",
      timeline: "5-8 weeks",
      costSmall: "$8K - $15K",
      costLarge: "$25K - $40K",
      impact: "+15% to +30% repeat purchases"
    }
  },
  {
    id: "H",
    title: "Internal Ops, Vendor & Logistics Coordination",
    icon: Layers,
    color: "text-primary",
    bgColor: "bg-primary/10",
    symptoms: [
      "Manual order processing",
      "Vendor follow-ups via WhatsApp",
      "Logistics exceptions handled manually",
      "Poor visibility into order status"
    ],
    whoFaces: "Marketplaces, Multi-vendor platforms, Retail chains",
    solution: {
      name: "AI Operations & Vendor Coordination",
      description: "Automated order processing",
      whatItDoes: [
        "Automates order routing and vendor communication",
        "Handles logistics exceptions automatically",
        "Provides real-time visibility dashboards",
        "Escalates only true exceptions"
      ],
      aiType: "Workflow automation + Exception handling",
      timeline: "6-10 weeks",
      costSmall: "$12K - $22K",
      costLarge: "$40K - $70K",
      impact: "-25% to -40% ops workload"
    }
  }
];

const costTable = [
  { type: "Small D2C Brand", scope: "Support + Cart Recovery", range: "$5K - $12K" },
  { type: "Growing D2C / Shopify", scope: "Support + Recovery + Personalization", range: "$12K - $25K" },
  { type: "Marketplace / Multi-vendor", scope: "Ops + Fraud + Inventory AI", range: "$25K - $50K" },
  { type: "Enterprise Retail", scope: "Full-stack AI automation", range: "$50K - $100K+" }
];

const roiMetrics = [
  { metric: "Support workload", improvement: "-60% to -80%" },
  { metric: "Cart recovery", improvement: "+10% to +25%" },
  { metric: "Conversion rate", improvement: "+5% to +15%" },
  { metric: "Repeat purchases", improvement: "+15% to +30%" },
  { metric: "Ops workload", improvement: "-25% to -40%" }
];

const faqs = [
  {
    question: "Is AI useful for small D2C brands or only large stores?",
    answer: "AI often delivers faster ROI for small and mid-sized brands because it reduces support load and recovers lost revenue immediately. You don't need enterprise scale to benefit."
  },
  {
    question: "Will AI integrate with Shopify or WooCommerce?",
    answer: "Yes. AGIX builds AI systems that integrate directly with Shopify, WooCommerce, Magento, and custom ecommerce platforms through their APIs."
  },
  {
    question: "Can AI really reduce customer support tickets?",
    answer: "Yes. Most ecommerce stores see 60-80% reduction in repetitive tickets like order status, returns, and policy questions within the first month."
  },
  {
    question: "Will AI affect my brand voice or customer experience?",
    answer: "No. AI responses are trained on your tone, policies, and guidelines, so the experience stays on-brand and consistent."
  },
  {
    question: "Can AI help reduce cart abandonment?",
    answer: "Yes. AI assists customers at checkout, answers questions, and triggers smart follow-ups — often recovering 10-25% of abandoned carts."
  },
  {
    question: "Is AI safe to use with payments and refunds?",
    answer: "Yes. AI follows strict rules and never approves outside defined policies. Humans always have override control."
  },
  {
    question: "How long does it take to go live?",
    answer: "Most ecommerce AI systems go live in 3-6 weeks, depending on scope and integrations."
  },
  {
    question: "What if AI gives a wrong answer to a customer?",
    answer: "All systems include confidence thresholds, human escalation, and full visibility. AI assists — humans remain in control."
  },
  {
    question: "Can I start with just one AI use case?",
    answer: "Absolutely. Most brands start with support automation or cart recovery, then expand gradually."
  },
  {
    question: "What are the ongoing costs after setup?",
    answer: "Ongoing costs include cloud & AI usage plus maintenance. Typically 15-25% of initial build cost annually."
  }
];

function ECommerceSolutionFinder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    role: "",
    challenge: "",
    volume: 1000
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

    if (inputs.challenge === "support") {
      system = "AI E-Commerce Support Agent";
      why = "High ticket volume is overwhelming your support capacity. AI handles 60-80% of repetitive queries instantly.";
      timeline = "3-5 weeks";
      cost = inputs.role === "d2c" ? "$3K - $6K" : inputs.role === "marketplace" ? "$8K - $15K" : "$6K - $10K";
      nextPhase = "Cart Recovery AI";
    } else if (inputs.challenge === "cart") {
      system = "AI Cart Recovery & Checkout Assistance";
      why = "Cart abandonment is bleeding revenue. AI can recover 10-25% of lost carts.";
      timeline = "3-5 weeks";
      cost = inputs.volume > 5000 ? "$14K - $22K" : "$4K - $10K";
      nextPhase = "Product Recommendation AI";
    } else if (inputs.challenge === "discovery") {
      system = "AI Product Discovery & Recommendation Engine";
      why = "Users can't find what they want. AI-powered search improves conversion.";
      timeline = "5-8 weeks";
      cost = inputs.volume > 5000 ? "$25K - $45K" : "$8K - $18K";
      nextPhase = "Retention & LTV AI";
    } else if (inputs.challenge === "returns") {
      system = "AI Returns & Refund Automation";
      why = "Returns are eating into margins. AI automates 70-90% of the process.";
      timeline = "4-6 weeks";
      cost = inputs.role === "marketplace" ? "$15K - $25K" : "$5K - $15K";
      nextPhase = "Support Automation";
    } else if (inputs.challenge === "inventory") {
      system = "AI Demand Forecasting & Inventory Intelligence";
      why = "Stockouts and overstocking are hurting margins. Predictive AI optimizes inventory.";
      timeline = "6-10 weeks";
      cost = "$12K - $35K";
      nextPhase = "Operations Automation";
    } else if (inputs.challenge === "fraud") {
      system = "AI Fraud Detection & Risk Intelligence";
      why = "Fake orders and chargebacks are causing revenue leakage.";
      timeline = "5-8 weeks";
      cost = "$10K - $30K";
      nextPhase = "Payment Optimization";
    } else if (inputs.challenge === "retention") {
      system = "AI Retention & LTV Optimization Engine";
      why = "One-time buyers aren't returning. Personalized engagement increases repeat purchases.";
      timeline = "5-8 weeks";
      cost = "$8K - $25K";
      nextPhase = "Support + Cart Recovery";
    } else {
      system = "AI E-Commerce Support + Cart Recovery";
      why = "Start with the highest-ROI combination: reducing support load and recovering lost revenue.";
      timeline = "4-6 weeks";
      cost = "$6K - $12K";
      nextPhase = "Product Recommendations";
    }

    setResult({ system, why, timeline, cost, nextPhase });
    setStep(4);
  };

  return (
    <Card id="solution-finder" className="border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-cyan-500/5">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Search className="w-6 h-6 text-primary" />
          Find My E-Commerce AI Solution
        </CardTitle>
        <p className="text-muted-foreground">
          Takes ~30 seconds. Get a personalized recommendation.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Label className="text-base font-medium">What type of business are you?</Label>
              <div className="grid grid-cols-2 gap-3">
                {institutionTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={inputs.role === type.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, role: type.id });
                      setStep(2);
                    }}
                    className="justify-start h-auto py-4"
                    data-testid={`button-finder-role-${type.id}`}
                  >
                    <type.icon className="w-5 h-5 mr-2" />
                    {type.label}
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
                    variant={inputs.challenge === c.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, challenge: c.id });
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
              <Label className="text-base font-medium">
                Monthly orders: {inputs.volume.toLocaleString()}
              </Label>
              <Slider
                value={[inputs.volume]}
                onValueChange={(val) => setInputs({ ...inputs, volume: val[0] })}
                min={100}
                max={50000}
                step={100}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100</span>
                <span>50,000+</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={generateRecommendation} data-testid="button-finder-generate">
                  Get Recommendation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-lg mb-2">Recommended AI System</h4>
                <p className="text-xl font-bold text-primary">{result.system}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Why This Fits</p>
                    <p className="text-sm text-muted-foreground">{result.why}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="text-sm font-medium">{result.timeline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="text-sm font-medium">{result.cost}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Phase 2 Recommendation</p>
                  <p className="text-sm font-medium">{result.nextPhase}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setResult(null);
                    setInputs({ role: "", challenge: "", volume: 1000 });
                  }}
                  data-testid="button-finder-restart"
                >
                  Start Over
                </Button>
                <Button asChild data-testid="button-finder-get-roadmap">
                  <a href="#lead-form">Get My Full Roadmap</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function RevenueLeakageCalculator() {
  const [inputs, setInputs] = useState({
    monthlyVisitors: 50000,
    avgOrderValue: 75,
    cartAbandonmentRate: 70,
    supportTicketsPerMonth: 500
  });
  const [showResult, setShowResult] = useState(false);

  const calculations = useMemo(() => {
    const potentialOrders = inputs.monthlyVisitors * 0.03;
    const abandonedCarts = potentialOrders * (inputs.cartAbandonmentRate / 100);
    const cartRevenueLost = abandonedCarts * inputs.avgOrderValue;
    const recoverableRevenue = cartRevenueLost * 0.15;
    const supportCost = inputs.supportTicketsPerMonth * 5;
    const supportSavings = supportCost * 0.7;
    
    return {
      cartRevenueLost: Math.round(cartRevenueLost),
      recoverableRevenue: Math.round(recoverableRevenue),
      supportCost: Math.round(supportCost),
      supportSavings: Math.round(supportSavings),
      totalRecoverable: Math.round(recoverableRevenue + supportSavings)
    };
  }, [inputs]);

  return (
    <Card id="leakage-calculator" className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="w-6 h-6 text-orange-500" />
          Revenue Leakage Calculator
        </CardTitle>
        <p className="text-muted-foreground">
          See how cart abandonment and support costs impact your revenue
        </p>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="text-base">Monthly Visitors: {inputs.monthlyVisitors.toLocaleString()}</Label>
              <Slider
                value={[inputs.monthlyVisitors]}
                onValueChange={(v) => setInputs({ ...inputs, monthlyVisitors: v[0] })}
                min={1000}
                max={500000}
                step={1000}
                className="mt-3"
              />
            </div>
            <div>
              <Label className="text-base">Average Order Value: ${inputs.avgOrderValue}</Label>
              <Slider
                value={[inputs.avgOrderValue]}
                onValueChange={(v) => setInputs({ ...inputs, avgOrderValue: v[0] })}
                min={20}
                max={500}
                step={5}
                className="mt-3"
              />
            </div>
            <div>
              <Label className="text-base">Cart Abandonment Rate: {inputs.cartAbandonmentRate}%</Label>
              <Slider
                value={[inputs.cartAbandonmentRate]}
                onValueChange={(v) => setInputs({ ...inputs, cartAbandonmentRate: v[0] })}
                min={40}
                max={90}
                step={1}
                className="mt-3"
              />
            </div>
            <div>
              <Label className="text-base">Support Tickets/Month: {inputs.supportTicketsPerMonth.toLocaleString()}</Label>
              <Slider
                value={[inputs.supportTicketsPerMonth]}
                onValueChange={(v) => setInputs({ ...inputs, supportTicketsPerMonth: v[0] })}
                min={50}
                max={5000}
                step={50}
                className="mt-3"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => setShowResult(true)}
              className="w-full"
              size="lg"
              data-testid="button-calculate-leakage"
            >
              Calculate Revenue Leakage
            </Button>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-destructive/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Cart Revenue Lost</p>
                      <p className="text-2xl font-bold text-destructive">${calculations.cartRevenueLost.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-destructive/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Support Costs</p>
                      <p className="text-2xl font-bold text-destructive">${calculations.supportCost.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Recoverable with AI (Monthly)</p>
                    <p className="text-3xl font-bold text-green-600">
                      +${calculations.totalRecoverable.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Annual impact: ${(calculations.totalRecoverable * 12).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Recommended AI Systems:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AI Support Agent</li>
                      <li>• Cart Recovery AI</li>
                      <li>• Checkout Assistance</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center pt-4 border-t">
          Based on 15% cart recovery rate and 70% support automation. One strong sales week often pays for the system.
        </p>
      </CardContent>
    </Card>
  );
}

function AIReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const questions = [
    { id: "tracking", text: "Do you track customer behavior data?" },
    { id: "support", text: "Is your support ticketing system centralized?" },
    { id: "catalog", text: "Is product catalog data structured?" },
    { id: "orders", text: "Are orders & returns digitized?" },
    { id: "analytics", text: "Do you have basic analytics in place?" },
  ];

  const score = Object.values(answers).filter(Boolean).length * 20;

  const getRecommendation = () => {
    if (score >= 80) return { level: "High", start: "Full AI Suite", avoid: "None - ready for advanced systems" };
    if (score >= 60) return { level: "Moderate", start: "AI Support + Cart Recovery", avoid: "Advanced Personalization (build data first)" };
    if (score >= 40) return { level: "Developing", start: "AI Support (basic)", avoid: "Predictive systems until data matures" };
    return { level: "Early", start: "Data infrastructure first", avoid: "All advanced AI systems" };
  };

  const recommendation = getRecommendation();

  return (
    <Card id="readiness-quiz" className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          AI Readiness Score for E-Commerce
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Check if your store is ready for AI implementation
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

export default function EcommerceIndustryPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-background to-cyan-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-orange-500/10 text-orange-500 border-orange-500/20">
                <ShoppingCart className="w-3 h-3 mr-1" />
                E-Commerce & Retail AI Solutions
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                AI Solutions for E-Commerce That Show You Where Revenue Is{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-cyan-400">
                  Leaking
                </span>{" "}
                — and How to Fix It
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                From D2C brands and Shopify stores to marketplaces and retail chains,
                AGIX builds AI systems that reduce support tickets, recover abandoned carts, and automate operations — with clear ROI.
              </p>

              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  The Reality of E-Commerce Today
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Traffic is expensive but carts get abandoned
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Support never sleeps, costs keep rising
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Returns drain profit margins
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    Teams are overloaded, operations don't scale
                  </li>
                </ul>
                <p className="text-sm font-medium mt-3 text-primary border-t border-border pt-3">
                  E-commerce doesn't fail because of demand. It fails because operations don't scale with demand.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Embedded Solution Finder in Hero */}
              <ECommerceSolutionFinder />

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

      {/* Build Your AI Roadmap Section */}
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
              { icon: HelpCircle, title: "Identify Revenue Leaks", description: "Find where you're losing money", color: "text-destructive", bg: "bg-destructive/10" },
              { icon: Search, title: "Find Your AI Solution", description: "Role-specific recommendations", color: "text-primary", bg: "bg-primary/10" },
              { icon: DollarSign, title: "See Real Costs", description: "Transparent pricing by scale", color: "text-green-500", bg: "bg-green-500/10" },
              { icon: Clock, title: "Get Timelines", description: "Realistic deployment schedules", color: "text-cyan-500", bg: "bg-cyan-500/10" },
              { icon: CheckCircle2, title: "Decide With Clarity", description: "Know your next step", color: "text-primary", bg: "bg-primary/10" },
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
              <span className="text-primary">E-Commerce Ecosystem</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you handle 100 orders or 100,000, the challenges are similar — only the scale changes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: ShoppingBag, title: "D2C Brands", desc: "Reduce support, recover carts" },
              { icon: Store, title: "Shopify/WooCommerce", desc: "Plug-and-play AI solutions" },
              { icon: Layers, title: "Marketplaces", desc: "Scale operations efficiently" },
              { icon: Building2, title: "Retail Chains", desc: "Omnichannel AI automation" },
              { icon: UserCheck, title: "Enterprise Retail", desc: "Full-stack AI transformation" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover-elevate">
                  <CardContent className="pt-6 text-center">
                    <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What E-Commerce Leaders Expect */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What E-Commerce Leaders Expect from AI</h2>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <h4 className="font-medium text-destructive mb-2">They DON'T want:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Generic chatbots</li>
                    <li>• Expensive consultants</li>
                    <li>• Complex integrations</li>
                    <li>• AI that doesn't understand ecommerce</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-green-600 mb-2">They EXPECT AI to:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reduce support tickets immediately</li>
                    <li>• Recover abandoned carts</li>
                    <li>• Integrate with existing platforms</li>
                    <li>• Show clear ROI quickly</li>
                    <li>• Scale with business growth</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-primary/5 to-cyan-500/5">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">AGIX E-Commerce Expertise</h3>
                  <p className="text-muted-foreground mb-4">
                    AGIX is an AI-first systems engineering company focused on practical AI for e-commerce:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "AI support agents & automation",
                      "Cart recovery & checkout assistance",
                      "Product discovery & recommendations",
                      "Returns & refund automation",
                      "Fraud detection & risk intelligence",
                      "Retention & LTV optimization",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-primary mt-4">
                    We don't start with tools. We start with revenue leakage and system bottlenecks.
                  </p>
                </CardContent>
              </Card>
            </div>
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
              No demos, no sales calls — just real recommendations based on your business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <RevenueLeakageCalculator />
            <div id="readiness-quiz">
              <AIReadinessScore />
            </div>
          </div>
        </div>
      </section>

      {/* Bottleneck Map */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">E-Commerce Bottleneck Map</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Revenue, Operations & Customer Experience{" "}
              <span className="text-destructive">Quietly Break</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              E-commerce doesn't fail loudly. It fails silently — when carts abandon, tickets pile up,
              and operations don't scale with demand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {bottlenecks.map((bottleneck, i) => (
              <motion.div
                key={bottleneck.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${bottleneck.bgColor} rounded-lg`}>
                        <bottleneck.icon className={`w-5 h-5 ${bottleneck.color}`} />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-1">
                          Category {bottleneck.id}
                        </Badge>
                        <CardTitle className="text-lg">{bottleneck.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Common Symptoms:</p>
                      <div className="flex flex-wrap gap-1">
                        {bottleneck.symptoms.slice(0, 3).map((s, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">Who faces this:</p>
                      <p>{bottleneck.whoFaces}</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">
                        AI Solution: {bottleneck.solution.name}
                      </p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{bottleneck.solution.timeline}</span>
                        <span>{bottleneck.solution.costSmall}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Role-Based Shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl border border-primary/20"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Role-Based Starting Points</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { role: "D2C Brand", path: "A → B → G", focus: "Support → Cart Recovery → Retention" },
                { role: "Shopify/WooCommerce", path: "A → B → C", focus: "Support → Cart → Discovery" },
                { role: "Marketplace", path: "A → D → H", focus: "Support → Returns → Ops" },
                { role: "Enterprise Retail", path: "A → E → F → H", focus: "Support → Inventory → Fraud → Ops" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-background/80 rounded-lg">
                  <p className="font-medium text-sm mb-1">{item.role}</p>
                  <p className="text-primary font-mono text-sm mb-2">{item.path}</p>
                  <p className="text-xs text-muted-foreground">{item.focus}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Systems Detailed */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">AI Systems & Execution</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Each Bottleneck Is Solved with{" "}
              <span className="text-primary">Real, Deployable AI</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              For every bottleneck, we define the AI system, how it works, timeline, and cost range.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {bottlenecks.map((b) => (
              <AccordionItem key={b.id} value={b.id} className="bg-background rounded-lg border">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${b.bgColor} rounded-lg`}>
                      <b.icon className={`w-4 h-4 ${b.color}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{b.solution.name}</p>
                      <p className="text-sm text-muted-foreground">{b.solution.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">What This System Does:</h4>
                        <ul className="space-y-1">
                          {b.solution.whatItDoes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">AI Type:</h4>
                        <p className="text-sm text-muted-foreground">{b.solution.aiType}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Timeline</p>
                          <p className="font-semibold">{b.solution.timeline}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Cost Range</p>
                          <p className="font-semibold text-green-500">{b.solution.costSmall}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Expected Impact</p>
                        <p className="text-sm font-medium text-primary">{b.solution.impact}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cost & ROI */}
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  E-Commerce AI Cost Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Business Type</th>
                        <th className="text-left py-3">Scope</th>
                        <th className="text-right py-3">Cost Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costTable.map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-3">{row.type}</td>
                          <td className="py-3 text-muted-foreground">{row.scope}</td>
                          <td className="py-3 text-right font-semibold text-green-500">{row.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  What AI Typically Improves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roiMetrics.map((m, i) => (
                    <div key={i} className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">{m.metric}</span>
                      <span className="font-semibold text-primary">{m.improvement}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <Star className="w-4 h-4 text-green-500 inline mr-2" />
                  One recovered week of revenue often pays for the system.
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
              AI should feel like a reliable upgrade, not a risky experiment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { icon: Shield, text: "AI never changes pricing without rules" },
              { icon: Users, text: "Complex issues escalate to humans" },
              { icon: Database, text: "Full visibility into AI actions" },
              { icon: RefreshCw, text: "Easy override at any point" },
              { icon: Target, text: "Gradual rollout (pilot → expand)" },
            ].map((item, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <p className="text-sm">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              E-Commerce AI{" "}
              <span className="text-primary">FAQs</span>
            </h2>
            <p className="text-muted-foreground">Clear answers before you decide</p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-lg border">
                <AccordionTrigger className="px-4 hover:no-underline text-left">
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
                  We review your inputs and suggest what actually fits your e-commerce business.
                </p>
              </CardHeader>
              <CardContent className="max-w-xl mx-auto space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Business Type</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-business-type"
                    >
                      <option value="">Select type</option>
                      <option value="d2c">D2C Brand</option>
                      <option value="shopify">Shopify/WooCommerce</option>
                      <option value="marketplace">Marketplace</option>
                      <option value="retail">Retail Chain</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <Label>Primary Challenge</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-challenge"
                    >
                      <option value="">Select challenge</option>
                      <option value="support">Customer Support</option>
                      <option value="cart">Cart Abandonment</option>
                      <option value="discovery">Product Discovery</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="inventory">Inventory</option>
                      <option value="retention">Retention</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Monthly Orders</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-orders"
                    >
                      <option value="">Select range</option>
                      <option value="small">Less than 500</option>
                      <option value="medium">500 - 5,000</option>
                      <option value="large">5,000 - 50,000</option>
                      <option value="enterprise">50,000+</option>
                    </select>
                  </div>
                  <div>
                    <Label>Platform</Label>
                    <select
                      className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 text-sm"
                      data-testid="select-platform"
                    >
                      <option value="">Select platform</option>
                      <option value="shopify">Shopify</option>
                      <option value="woocommerce">WooCommerce</option>
                      <option value="magento">Magento</option>
                      <option value="custom">Custom</option>
                    </select>
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
                  No pressure. We suggest what fits your business — not generic tools.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500/10 via-background to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Stop Revenue Leakage?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            AGIX Technologies is an AI-first systems engineering company focused on building practical,
            ROI-driven AI solutions for e-commerce. We don't chase trends. We design systems that recover revenue and scale with your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="button-final-roadmap">
              <a href="#lead-form">
                Get My E-Commerce AI Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-final-finder">
              <a href="#solution-finder">
                Re-Run the AI Solution Finder
              </a>
            </Button>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
