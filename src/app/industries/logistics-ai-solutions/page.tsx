'use client'
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
  Truck,
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
  Package,
  Warehouse,
  Route,
  MapPin,
  Eye,
  Activity,
  ChevronDown,
  Loader2,
  Factory,
  ShoppingCart,
  Boxes,
  Timer,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { submitLead } from "@/lib/lead-submission";
import { useCelebration } from "@/components/success-celebration";

const businessTypes = [
  { id: "logistics", label: "Logistics Provider", icon: Truck },
  { id: "3pl", label: "3PL / 4PL Provider", icon: Warehouse },
  { id: "manufacturer", label: "Manufacturer", icon: Factory },
  { id: "distributor", label: "Distributor / Wholesaler", icon: Boxes },
  { id: "ecommerce", label: "E-commerce Fulfillment", icon: ShoppingCart },
  { id: "enterprise", label: "Enterprise Supply Chain", icon: Layers },
];

const challenges = [
  { id: "forecasting", label: "Demand Forecasting" },
  { id: "inventory", label: "Inventory Optimization" },
  { id: "routing", label: "Route Optimization" },
  { id: "visibility", label: "Supply Chain Visibility" },
  { id: "warehouse", label: "Warehouse Efficiency" },
  { id: "suppliers", label: "Supplier Management" },
  { id: "costs", label: "Cost Control" },
  { id: "planning", label: "Demand-Supply Planning" },
];

const realityProblems = [
  "Delays compound downstream costs",
  "Inventory is either stuck or missing",
  "Planning is reactive, not predictive",
  "Visibility is fragmented across systems",
  "Margins are thin and unforgiving",
];

const bottlenecks = [
  {
    id: "A",
    title: "Demand Forecasting Inaccuracy",
    icon: TrendingUp,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    symptoms: [
      "Forecasts miss seasonal spikes",
      "Promotions fail to convert as expected",
      "Planners rely on static historical averages",
      "Stockouts during peak demand",
      "Overstock in slow-moving SKUs",
    ],
    reality: [
      "Frequent replanning cycles",
      "Firefighting instead of planning",
      "Customer dissatisfaction",
      "Working capital inefficiency",
    ],
    whoFaces: "Manufacturers, Distributors, Retail & e-commerce supply chains",
    whyExists: "Traditional forecasting tools struggle with volatility, promotions, and multi-channel demand signals.",
    solution: {
      name: "AI Demand Forecasting & Planning Engine",
      description: "Accurate Predictions with Confidence Ranges",
      whatItDoes: [
        "Consumes historical sales, seasonality, promotions & external signals",
        "Generates SKU-level demand forecasts with confidence ranges",
        "Continuously re-forecasts as signals change",
        "Enables scenario simulation for planning",
      ],
      aiType: "Time-series ML + External signal enrichment",
      techStack: "Prophet, XGBoost, Python, ERP Integration",
      timeline: "5-7 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$18K - $25K",
      impact: "20-40% forecast accuracy improvement, fewer stockouts",
    },
  },
  {
    id: "B",
    title: "Inventory Imbalance & Working Capital Lock",
    icon: Package,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    symptoms: [
      "Excess inventory sitting in warehouses",
      "Capital tied up in slow-moving items",
      "Emergency replenishments increasing cost",
      "Poor inventory turnover",
      "High carrying costs & write-offs",
    ],
    reality: [
      "Static reorder points",
      "Gut feeling decisions",
      "Reactive inventory management",
      "Cash flow problems",
    ],
    whoFaces: "Wholesalers, Multi-warehouse operators, Global supply chains",
    whyExists: "Inventory decisions are often based on static reorder points and gut feeling, not predictive signals.",
    solution: {
      name: "AI Inventory Optimization & Replenishment Engine",
      description: "Dynamic Stock Levels, Lower Carrying Costs",
      whatItDoes: [
        "Calculates optimal stock levels per SKU & location",
        "Dynamic reorder points based on demand signals",
        "Balances service level targets vs. carrying cost",
        "Provides replenishment recommendations with rationale",
      ],
      aiType: "Optimization algorithms + Predictive ML models",
      techStack: "Python, OR-Tools, Inventory APIs, ERP Integration",
      timeline: "6-8 weeks",
      costSmall: "$12K - $20K",
      costLarge: "$20K - $30K",
      impact: "15-30% reduction in holding costs, improved turnover",
    },
  },
  {
    id: "C",
    title: "Route Planning & Transportation Inefficiency",
    icon: Route,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    symptoms: [
      "Suboptimal routing decisions",
      "Poor vehicle utilization",
      "Inaccurate ETA predictions",
      "High fuel costs",
      "SLA penalties from late deliveries",
    ],
    reality: [
      "Pre-planned static routes",
      "Unable to react to real-time changes",
      "Manual dispatcher overload",
      "Customer complaints about delivery windows",
    ],
    whoFaces: "Logistics providers, Last-mile operators, Fleet-based businesses",
    whyExists: "Routing is often pre-planned and static, unable to react to traffic, weather, or demand changes.",
    solution: {
      name: "AI Route Optimization & ETA Prediction System",
      description: "Real-time Routing, Accurate ETAs",
      whatItDoes: [
        "Optimizes routes based on traffic, delivery windows, capacity",
        "Continuously updates ETAs in real time",
        "Accounts for fuel cost and driver constraints",
        "Provides route change justification",
      ],
      aiType: "Optimization algorithms + Predictive ETA modeling",
      techStack: "Google OR-Tools, OSRM, TMS Integration, Real-time APIs",
      timeline: "4-6 weeks",
      costSmall: "$8K - $15K",
      costLarge: "$15K - $20K",
      impact: "10-25% fuel cost reduction, improved OTIF rates",
    },
  },
  {
    id: "D",
    title: "Lack of End-to-End Supply Chain Visibility",
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    symptoms: [
      "Fragmented systems with no single view",
      "No real-time tracking across vendors",
      "Blind spots in multi-tier supply chain",
      "Delayed issue detection",
      "Reactive problem-solving",
    ],
    reality: [
      "Data siloed across ERP, WMS, TMS, spreadsheets",
      "Poor coordination between teams",
      "Firefighting instead of prevention",
      "Escalations discovered too late",
    ],
    whoFaces: "Complex multi-tier supply chains, Global logistics networks",
    whyExists: "Data is siloed across ERP, WMS, TMS, spreadsheets, and emails with no unified view.",
    solution: {
      name: "Real-Time Supply Chain Visibility & Alerting Platform",
      description: "Unified View, Proactive Alerts",
      whatItDoes: [
        "Integrates data from ERP, WMS, TMS, supplier feeds",
        "Detects delays, exceptions, and bottlenecks before escalation",
        "Provides role-based dashboards",
        "Severity-based escalation with clear reason codes",
      ],
      aiType: "Event detection + Anomaly monitoring",
      techStack: "Apache Kafka, Python, Dashboard Tools, API Integrations",
      timeline: "6-8 weeks",
      costSmall: "$15K - $25K",
      costLarge: "$25K - $35K",
      impact: "Faster issue resolution, reduced firefighting",
    },
  },
  {
    id: "E",
    title: "Warehouse & Fulfillment Inefficiency",
    icon: Warehouse,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    symptoms: [
      "Manual picking & packing processes",
      "Poor slotting decisions",
      "High labor dependency",
      "Slow order fulfillment",
      "Picking errors and returns",
    ],
    reality: [
      "Warehouses lack intelligent slotting",
      "No real-time optimization",
      "Labor costs eating margins",
      "Customer complaints about delays",
    ],
    whoFaces: "Fulfillment centers, E-commerce operations",
    whyExists: "Warehouses lack intelligent slotting and real-time optimization based on demand patterns.",
    solution: {
      name: "AI Warehouse Intelligence & Slotting Engine",
      description: "Optimized Picking, Lower Labor Costs",
      whatItDoes: [
        "Optimizes slotting, pick paths, and labor allocation",
        "Adapts warehouse layouts as demand shifts",
        "Provides slotting logic visibility",
        "Enables gradual rollout by zone",
      ],
      aiType: "Optimization models + Pattern learning from pick data",
      techStack: "Python, WMS Integration, Simulation Tools",
      timeline: "6-8 weeks",
      costSmall: "$12K - $20K",
      costLarge: "$20K - $28K",
      impact: "20-35% picking speed improvement, fewer errors",
    },
  },
  {
    id: "F",
    title: "Supplier & Vendor Unreliability",
    icon: AlertTriangle,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    symptoms: [
      "Late deliveries from suppliers",
      "Quality issues discovered post-receipt",
      "No early warning signals",
      "Production delays downstream",
      "Emergency sourcing at premium costs",
    ],
    reality: [
      "Supplier performance tracked after the fact",
      "No predictive risk assessment",
      "Higher procurement costs",
      "Supply chain disruptions",
    ],
    whoFaces: "Manufacturers, Importers",
    whyExists: "Supplier performance is tracked after the fact, not predicted proactively.",
    solution: {
      name: "Supplier Risk & Performance Intelligence Engine",
      description: "Predict Issues Before They Impact Operations",
      whatItDoes: [
        "Tracks delivery reliability, quality, lead time volatility",
        "Predicts supplier risk and potential disruptions",
        "Provides supplier risk drivers visibility",
        "Decision support for sourcing teams",
      ],
      aiType: "Predictive analytics + Risk scoring models",
      techStack: "Python, Supplier APIs, ERP Integration",
      timeline: "5-7 weeks",
      costSmall: "$10K - $16K",
      costLarge: "$16K - $22K",
      impact: "Fewer disruptions, better sourcing decisions",
    },
  },
  {
    id: "G",
    title: "Demand-Supply Mismatch",
    icon: RefreshCw,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    symptoms: [
      "Supply doesn't align with actual demand",
      "Frequent stock transfers between locations",
      "Missed sales opportunities",
      "Customer dissatisfaction",
      "Operational chaos",
    ],
    reality: [
      "Demand and supply planning in disconnected silos",
      "No scenario simulation capability",
      "Reactive instead of proactive",
      "Lost revenue",
    ],
    whoFaces: "Omnichannel retailers, Distributors",
    whyExists: "Demand planning and supply planning operate in disconnected silos without integration.",
    solution: {
      name: "AI Integrated Demand-Supply Planning Engine",
      description: "Aligned Forecasts, Smoother Operations",
      whatItDoes: [
        "Aligns forecasts, inventory, production & replenishment",
        "Simulates demand spikes and supply delays",
        "Provides scenario comparison",
        "Enables proactive planning decisions",
      ],
      aiType: "Scenario simulation + Predictive planning models",
      techStack: "Python, Planning APIs, ERP/WMS Integration",
      timeline: "7-9 weeks",
      costSmall: "$18K - $28K",
      costLarge: "$28K - $40K",
      impact: "Better service levels, reduced emergency actions",
    },
  },
  {
    id: "H",
    title: "Cost Leakages & Margin Erosion",
    icon: DollarSign,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    symptoms: [
      "Hidden inefficiencies across operations",
      "Poor cost attribution",
      "Unclear profitability by route/customer",
      "Shrinking margins",
      "Budget overruns",
    ],
    reality: [
      "Costs tracked in aggregate, not at decision level",
      "Poor pricing and routing decisions",
      "Margin erosion discovered too late",
      "No actionable cost visibility",
    ],
    whoFaces: "Logistics-heavy businesses, Low-margin industries",
    whyExists: "Costs are tracked in aggregate, not at the decision level where optimization is possible.",
    solution: {
      name: "Supply Chain Cost & Margin Intelligence Dashboard",
      description: "Cost Visibility, Margin Protection",
      whatItDoes: [
        "Tracks cost per order, route, SKU, and customer",
        "Highlights margin erosion early",
        "Provides cost attribution clarity",
        "Enables data-driven pricing & routing decisions",
      ],
      aiType: "Cost attribution models + Predictive margin analytics",
      techStack: "Python, BI Tools, ERP/TMS Integration",
      timeline: "5-7 weeks",
      costSmall: "$10K - $18K",
      costLarge: "$18K - $25K",
      impact: "Margin protection, better decision-making",
    },
  },
];

const industryStats = [
  { icon: Clock, value: "35%", label: "Orders delayed due to poor planning" },
  { icon: Package, value: "$163B", label: "Global excess inventory annually" },
  { icon: Truck, value: "25%", label: "Transport cost from route inefficiency" },
  { icon: Eye, value: "67%", label: "Lack real-time supply chain visibility" },
];

const costReference = [
  { type: "SMB / Regional Operator", scope: "Forecasting or Routing AI", range: "$6K - $15K" },
  { type: "Mid-Market Supply Chain", scope: "Inventory + Routing", range: "$15K - $35K" },
  { type: "Large Manufacturer / 3PL", scope: "Visibility + Optimization", range: "$35K - $60K" },
  { type: "Enterprise / Multi-Network", scope: "End-to-End Planning AI", range: "$60K+" },
];

function LogisticsSolutionFinder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    businessType: "",
    challenge: "",
    volume: "",
    warehouses: "",
    dataReadiness: "",
  });
  const [showResult, setShowResult] = useState(false);

  const volumeRanges = [
    { id: "small", label: "< 5,000 orders/month" },
    { id: "medium", label: "5,000 - 50,000 orders/month" },
    { id: "large", label: "50,000 - 500,000 orders/month" },
    { id: "enterprise", label: "500,000+ orders/month" },
  ];

  const warehouseOptions = [
    { id: "single", label: "1 warehouse/location" },
    { id: "few", label: "2-5 locations" },
    { id: "many", label: "6-20 locations" },
    { id: "network", label: "20+ locations / national network" },
  ];

  const dataOptions = [
    { id: "manual", label: "Mostly manual / spreadsheets" },
    { id: "basic", label: "Basic ERP, limited data" },
    { id: "integrated", label: "ERP + WMS/TMS integrated" },
    { id: "advanced", label: "Real-time data pipelines" },
  ];

  const recommendation = useMemo(() => {
    if (!inputs.businessType || !inputs.challenge) return null;

    const challengeToSystem: Record<string, typeof bottlenecks[0]> = {
      forecasting: bottlenecks[0],
      inventory: bottlenecks[1],
      routing: bottlenecks[2],
      visibility: bottlenecks[3],
      warehouse: bottlenecks[4],
      suppliers: bottlenecks[5],
      planning: bottlenecks[6],
      costs: bottlenecks[7],
    };

    const system = challengeToSystem[inputs.challenge] || bottlenecks[0];
    
    let timeline = system.solution.timeline;
    let cost = inputs.volume === "enterprise" || inputs.volume === "large" 
      ? system.solution.costLarge 
      : system.solution.costSmall;

    const nextPhase = {
      forecasting: "Inventory Optimization",
      inventory: "Demand-Supply Planning",
      routing: "Visibility Platform",
      visibility: "Cost Intelligence",
      warehouse: "Route Optimization",
      suppliers: "Demand Forecasting",
      planning: "Cost Intelligence",
      costs: "Visibility Platform",
    }[inputs.challenge] || "Visibility Platform";

    return {
      system: system.solution.name,
      description: system.solution.description,
      why: system.whyExists,
      whatItDoes: system.solution.whatItDoes,
      aiType: system.solution.aiType,
      timeline,
      cost,
      impact: system.solution.impact,
      nextPhase,
    };
  }, [inputs]);

  const canProceed = () => {
    switch (step) {
      case 1: return !!inputs.businessType;
      case 2: return !!inputs.challenge;
      case 3: return !!inputs.volume;
      case 4: return !!inputs.warehouses;
      case 5: return !!inputs.dataReadiness;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setInputs({ businessType: "", challenge: "", volume: "", warehouses: "", dataReadiness: "" });
    setShowResult(false);
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-cyan-500/5" id="solution-finder">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 w-fit">
            <Search className="w-3 h-3 mr-1" />
            Supply Chain AI Solution Finder
          </Badge>
          {!showResult && (
            <span className="text-xs text-muted-foreground">Step {step}/5</span>
          )}
        </div>
        <CardTitle className="text-lg">
          {showResult ? "Your Recommended AI System" : "Find Your Supply Chain AI Solution"}
        </CardTitle>
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
              {step === 1 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">What type of organization are you?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={inputs.businessType === type.id ? "default" : "outline"}
                        className="justify-start h-auto py-3 px-3"
                        onClick={() => setInputs({ ...inputs, businessType: type.id })}
                        data-testid={`button-business-${type.id}`}
                      >
                        <type.icon className="w-4 h-4 mr-2 shrink-0" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">What's your biggest operational challenge?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {challenges.map((challenge) => (
                      <Button
                        key={challenge.id}
                        variant={inputs.challenge === challenge.id ? "default" : "outline"}
                        className="justify-start h-auto py-2.5 px-3"
                        onClick={() => setInputs({ ...inputs, challenge: challenge.id })}
                        data-testid={`button-challenge-${challenge.id}`}
                      >
                        <span className="text-xs">{challenge.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">What's your monthly order/shipment volume?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {volumeRanges.map((range) => (
                      <Button
                        key={range.id}
                        variant={inputs.volume === range.id ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setInputs({ ...inputs, volume: range.id })}
                        data-testid={`button-volume-${range.id}`}
                      >
                        {range.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">How many warehouses/locations do you operate?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {warehouseOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={inputs.warehouses === option.id ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setInputs({ ...inputs, warehouses: option.id })}
                        data-testid={`button-warehouses-${option.id}`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">What's your current data & systems readiness?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {dataOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={inputs.dataReadiness === option.id ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setInputs({ ...inputs, dataReadiness: option.id })}
                        data-testid={`button-data-${option.id}`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1" data-testid="button-back">
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1"
                  data-testid="button-next"
                >
                  {step === 5 ? "Get Recommendation" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {recommendation && (
                <>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Recommended System</p>
                    <h4 className="font-bold text-lg text-primary">{recommendation.system}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="font-semibold text-sm">{recommendation.timeline}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="font-semibold text-sm">{recommendation.cost}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-xs text-muted-foreground mb-1">Expected Impact</p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">{recommendation.impact}</p>
                  </div>

                  <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <p className="text-xs text-muted-foreground mb-1">Next Phase</p>
                    <p className="text-sm font-medium">{recommendation.nextPhase}</p>
                  </div>

                  <Button onClick={handleReset} variant="outline" className="w-full" data-testid="button-reset">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function LeakageCalculator() {
  const [inputs, setInputs] = useState({
    monthlyOrders: 10000,
    avgOrderValue: 150,
    stockoutRate: 6,
    holdingCostPercent: 25,
    transportCostPerShipment: 15,
    delayRate: 8,
  });

  const results = useMemo(() => {
    const stockoutLoss = inputs.monthlyOrders * inputs.avgOrderValue * (inputs.stockoutRate / 100);
    const inventoryValue = inputs.monthlyOrders * inputs.avgOrderValue * 0.3;
    const overstockCost = inventoryValue * (inputs.holdingCostPercent / 100);
    const transportLeakage = inputs.monthlyOrders * inputs.transportCostPerShipment * (inputs.delayRate / 100);
    const totalLeakage = stockoutLoss + overstockCost + transportLeakage;

    return {
      stockoutLoss: Math.round(stockoutLoss),
      overstockCost: Math.round(overstockCost),
      transportLeakage: Math.round(transportLeakage),
      totalLeakage: Math.round(totalLeakage),
      annualLeakage: Math.round(totalLeakage * 12),
    };
  }, [inputs]);

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-amber-500/5" id="leakage-calculator">
      <CardHeader>
        <Badge className="w-fit bg-orange-500/10 text-orange-500 border-orange-500/20">
          <Calculator className="w-3 h-3 mr-1" />
          Supply Chain Leakage Calculator
        </Badge>
        <CardTitle className="text-lg">Calculate Your Delay, Inventory & Cost Leakage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">Monthly Orders</Label>
            <Input
              type="number"
              value={inputs.monthlyOrders}
              onChange={(e) => setInputs({ ...inputs, monthlyOrders: Number(e.target.value) })}
              data-testid="input-monthly-orders"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Avg Order Value ($)</Label>
            <Input
              type="number"
              value={inputs.avgOrderValue}
              onChange={(e) => setInputs({ ...inputs, avgOrderValue: Number(e.target.value) })}
              data-testid="input-avg-order-value"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Stockout Rate: {inputs.stockoutRate}%</Label>
          <Slider
            value={[inputs.stockoutRate]}
            onValueChange={([v]) => setInputs({ ...inputs, stockoutRate: v })}
            max={20}
            step={1}
            data-testid="slider-stockout-rate"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Holding Cost: {inputs.holdingCostPercent}%</Label>
          <Slider
            value={[inputs.holdingCostPercent]}
            onValueChange={([v]) => setInputs({ ...inputs, holdingCostPercent: v })}
            max={50}
            step={1}
            data-testid="slider-holding-cost"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">Transport Cost/Shipment ($)</Label>
            <Input
              type="number"
              value={inputs.transportCostPerShipment}
              onChange={(e) => setInputs({ ...inputs, transportCostPerShipment: Number(e.target.value) })}
              data-testid="input-transport-cost"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Delay Rate: {inputs.delayRate}%</Label>
            <Slider
              value={[inputs.delayRate]}
              onValueChange={([v]) => setInputs({ ...inputs, delayRate: v })}
              max={30}
              step={1}
              data-testid="slider-delay-rate"
            />
          </div>
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <p className="text-xs text-muted-foreground">Stockout Loss</p>
              <p className="font-bold text-red-500">${results.stockoutLoss.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <p className="text-xs text-muted-foreground">Overstock Cost</p>
              <p className="font-bold text-orange-500">${results.overstockCost.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <p className="text-xs text-muted-foreground">Transport Leakage</p>
              <p className="font-bold text-yellow-500">${results.transportLeakage.toLocaleString()}</p>
            </div>
          </div>
          <div className="p-3 bg-destructive/10 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Total Monthly Leakage</p>
            <p className="text-2xl font-bold text-destructive">${results.totalLeakage.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">
              ${results.annualLeakage.toLocaleString()} annually
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AIReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const questions = [
    { id: "erp", text: "Do you have an ERP or WMS system in place?" },
    { id: "data", text: "Is historical order/shipment data accessible digitally?" },
    { id: "tracking", text: "Do you track inventory levels in real-time?" },
    { id: "integration", text: "Can your systems share data via APIs?" },
    { id: "team", text: "Is there a team to champion AI initiatives?" },
  ];

  const score = Object.values(answers).filter(Boolean).length * 20;

  const recommendation = useMemo(() => {
    if (score >= 80) return { level: "High", color: "bg-green-500", start: "Full AI implementation ready", avoid: "None - proceed with confidence" };
    if (score >= 60) return { level: "Medium", color: "bg-yellow-500", start: "Start with forecasting or visibility", avoid: "Complex multi-system integrations" };
    if (score >= 40) return { level: "Developing", color: "bg-orange-500", start: "Focus on data infrastructure first", avoid: "Real-time optimization systems" };
    return { level: "Early", color: "bg-red-500", start: "Begin with basic data collection", avoid: "Complex AI systems for now" };
  }, [score]);

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5" id="readiness-quiz">
      <CardHeader>
        <Badge className="w-fit bg-purple-500/10 text-purple-400 border-purple-500/20">
          <Target className="w-3 h-3 mr-1" />
          AI Readiness Assessment
        </Badge>
        <CardTitle className="text-lg">Supply Chain AI Readiness Score</CardTitle>
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
                <Badge className={`mt-2 ${recommendation.color}`}>{recommendation.level} Readiness</Badge>
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

function LeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [formData, setFormData] = useState({
    organizationType: "",
    challenge: "",
    volume: "",
    warehouses: "",
    country: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitLead(
      {
        name: formData.email,
        email: formData.email,
        industry: "logistics",
        companySize: formData.volume,
        challenges: [formData.challenge],
        message: formData.message,
      },
      {
        formType: "logistics-roadmap",
        source: "/industries/logistics",
        ctaId: "logistics-form-submit",
        ctaText: "Get My Supply Chain AI Roadmap",
        ctaLocation: "/industries/logistics",
        additionalMetadata: {
          organizationType: formData.organizationType,
          warehouses: formData.warehouses,
          country: formData.country,
        },
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Request Submitted",
        description: "We'll send your personalized AI roadmap within 24 hours.",
      });
      
      setFormData({
        organizationType: "",
        challenge: "",
        volume: "",
        warehouses: "",
        country: "",
        email: "",
        message: "",
      });
    } else {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <Badge className="w-fit">Get Expert Validation</Badge>
        <CardTitle>Get a Personalized Supply Chain AI Recommendation</CardTitle>
        <p className="text-sm text-muted-foreground">
          For operations teams that want expert validation after exploring tools.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Organization Type</Label>
              <Select
                value={formData.organizationType}
                onValueChange={(v) => setFormData({ ...formData, organizationType: v })}
              >
                <SelectTrigger data-testid="select-org-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Primary Challenge</Label>
              <Select
                value={formData.challenge}
                onValueChange={(v) => setFormData({ ...formData, challenge: v })}
              >
                <SelectTrigger data-testid="select-challenge">
                  <SelectValue placeholder="Select challenge" />
                </SelectTrigger>
                <SelectContent>
                  {challenges.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Monthly Order Volume</Label>
              <Input
                placeholder="e.g., 50,000"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                data-testid="input-volume"
              />
            </div>
            <div className="space-y-2">
              <Label>Number of Warehouses/Routes</Label>
              <Input
                placeholder="e.g., 5 warehouses"
                value={formData.warehouses}
                onChange={(e) => setFormData({ ...formData, warehouses: e.target.value })}
                data-testid="input-warehouses"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country / Operating Region</Label>
              <Input
                placeholder="e.g., United States"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                data-testid="input-country"
              />
            </div>
            <div className="space-y-2">
              <Label>Work Email</Label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="input-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Context (Optional)</Label>
            <Textarea
              placeholder="Tell us more about your supply chain challenges..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              data-testid="textarea-message"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit-form">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Get My Supply Chain AI Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            No generic dashboards. Only realistic, operationally deployable AI recommendations.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LogisticsIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Truck className="w-3 h-3 mr-1" />
                Logistics & Supply Chain AI Solutions
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                AI Solutions for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-teal-400">
                  Logistics & Supply Chain
                </span>{" "}
                That Reveal Where Delays, Costs & Inefficiencies Hide
              </h1>

              <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From logistics providers and 3PLs to manufacturers, distributors, and e-commerce fulfillment networks—
                  AGIX builds AI systems that predict demand accurately, balance inventory, optimize routes, and deliver real-time visibility.
                </p>
              </div>

            </motion.div>

            {/* Right: Solution Finder + Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 lg:mt-8"
            >
              <LogisticsSolutionFinder />
              
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
                    <p className="text-xs text-muted-foreground">Cost Impact</p>
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
              <div className="p-4 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-lg border border-primary/20 text-center">
                <p className="text-lg font-medium text-primary">
                  Supply chains don't break at one point.
                  <br />
                  They erode quietly — through blind spots, delays, and misaligned decisions.
                </p>
              </div>
            </motion.div>
          </div>
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
                Why Supply Chain Leaders Are{" "}
                <span className="text-primary">Investing in AI</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Demand volatility, inventory complexity, and margin pressure are all rising. Here's what's driving the shift to AI.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industryStats.map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30">
                  <stat.icon className="w-7 h-7 mx-auto mb-3 text-cyan-500" />
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
              The <span className="text-destructive">Silent Failures</span> Eroding Your Supply Chain
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Supply chains rarely collapse overnight. They weaken quietly — through forecasting errors, inventory imbalance, route inefficiencies, and lack of visibility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Delays Compound Downstream Costs", 
                description: "A single delay ripples through your entire operation. Late shipments trigger expedited shipping, overtime labor, and customer penalties.",
                icon: Clock,
                impact: "35% of orders affected"
              },
              { 
                title: "Inventory Is Either Stuck or Missing", 
                description: "Excess stock ties up capital while stockouts lose sales. Without predictive signals, you're always reacting instead of planning.",
                icon: Package,
                impact: "$163B global excess inventory"
              },
              { 
                title: "Planning Is Reactive, Not Predictive", 
                description: "Your team firefights daily instead of forecasting ahead. By the time you see a problem, it's already impacting customers.",
                icon: TrendingUp,
                impact: "60% of planners in reactive mode"
              },
              { 
                title: "Visibility Is Fragmented Across Systems", 
                description: "Data lives in ERP, WMS, TMS, and spreadsheets. No single view means delayed decisions and missed opportunities.",
                icon: Eye,
                impact: "67% lack real-time visibility"
              },
              { 
                title: "Margins Are Thin and Unforgiving", 
                description: "Hidden inefficiencies erode profits before you notice. Cost leakages in routing, inventory, and operations go untracked.",
                icon: DollarSign,
                impact: "5-15% margin erosion"
              },
              { 
                title: "Suppliers Create Unexpected Disruptions", 
                description: "Vendor delays and quality issues cascade through your supply chain. Without early warning, you're always scrambling.",
                icon: AlertTriangle,
                impact: "40% of disruptions from suppliers"
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
              Instead of just reading, use interactive tools to understand your exact situation —
              and walk away with a complete AI roadmap, cost estimate, and implementation timeline.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              { icon: AlertCircle, title: "Identify Leakage Points", description: "Pinpoint where delays & costs originate", color: "text-destructive", bg: "bg-destructive/10" },
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
          >
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card border border-border rounded-xl">
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

      {/* Who This Is For Section */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-500">
              <Users className="w-3 h-3 mr-1" />
              Built For You
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              AI Solutions Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-400">
                Every Supply Chain Model
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you move hundreds or millions of units, the core bottlenecks remain similar — only the scale of impact changes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {businessTypes.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full text-center hover-elevate border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-teal-500/5">
                  <CardContent className="pt-6 pb-5">
                    <div className="p-3 bg-cyan-500/10 rounded-xl w-fit mx-auto mb-3">
                      <type.icon className="w-7 h-7 text-cyan-500" />
                    </div>
                    <p className="font-medium text-sm">{type.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottleneck Map */}
      <section id="bottlenecks" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Supply Chain Bottleneck Map</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Delays, Costs & Planning{" "}
              <span className="text-destructive">Fail Silently</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Supply chains rarely fail suddenly. They erode quietly — through forecasting errors, inventory imbalance, route inefficiencies, and lack of real-time visibility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottlenecks.map((bottleneck, i) => (
              <motion.div
                key={bottleneck.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all ${
                    selectedBottleneck.id === bottleneck.id
                      ? "ring-2 ring-primary"
                      : "hover-elevate"
                  }`}
                  onClick={() => setSelectedBottleneck(bottleneck)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 ${bottleneck.bgColor} rounded-md`}>
                        <bottleneck.icon className={`w-4 h-4 ${bottleneck.color}`} />
                      </div>
                      <Badge variant="outline" className="text-xs">{bottleneck.id}</Badge>
                    </div>
                    <CardTitle className="text-sm mt-2">{bottleneck.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {bottleneck.symptoms[0]}
                    </p>
                  </CardContent>
                </Card>
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
                    Recommended AI System: {selectedBottleneck.solution.name}
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
            <Badge className="mb-4">Interactive Decision Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Your{" "}
              <span className="text-primary">AI Opportunity</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These tools help you evaluate AI adoption before involving IT change boards or operations committees.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <LeakageCalculator />
            <AIReadinessScore />
          </div>
        </div>
      </section>

      {/* What Operations Leaders Expect Section */}
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
              What Operations Leaders{" "}
              <span className="text-primary">Actually Expect From AI</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Supply chain teams don't want static dashboards or one-time forecasts. They need decision intelligence that integrates with existing systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-orange-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <XCircle className="w-5 h-5 text-destructive" />
                  What Teams Don't Want
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Static dashboards that don't drive action", "One-time forecasts that miss volatility", "Black-box recommendations with no rationale", "Disruptive system replacements"].map((item, i) => (
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
                  {["Predict demand more accurately", "Balance inventory dynamically", "Optimize routes in real time", "Improve OTIF (On-Time-In-Full)", "Integrate with existing ERP/WMS/TMS"].map((item, i) => (
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
              AGIX builds decision intelligence systems, not surface-level analytics.
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
            <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-500">
              <Star className="w-3 h-3 mr-1" />
              Our Expertise
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              AGIX Logistics & Supply Chain{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-400">
                AI Capabilities
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX is an AI-first systems engineering company focused on operational intelligence for logistics and supply chains.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { title: "AI Demand Forecasting & Planning Engines", icon: TrendingUp },
              { title: "Inventory Optimization & Replenishment Intelligence", icon: Package },
              { title: "Route Optimization & ETA Prediction Systems", icon: Route },
              { title: "End-to-End Supply Chain Visibility Platforms", icon: Eye },
              { title: "Warehouse Intelligence & Slotting Optimization", icon: Warehouse },
              { title: "Supplier Performance & Risk Intelligence", icon: AlertTriangle },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full hover-elevate border-cyan-500/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg shrink-0">
                        <item.icon className="w-5 h-5 text-cyan-500" />
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
              We don't replace your ERP. We build AI layers that make existing systems smarter and more predictive.
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
              Realistic ROI
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Expected Business{" "}
              <span className="text-green-500">Impact</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One avoided stockout cycle or peak-season failure often pays for the entire system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { metric: "Forecast Accuracy", value: "+20-40%", color: "text-cyan-500" },
              { metric: "Inventory Holding Cost", value: "-15-30%", color: "text-green-500" },
              { metric: "OTIF Rate", value: "+10-25%", color: "text-primary" },
              { metric: "Transport Cost", value: "-10-25%", color: "text-orange-500" },
              { metric: "Planning Effort", value: "-30-50%", color: "text-purple-500" },
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
              <Settings className="w-3 h-3 mr-1" />
              Operations-Safe AI
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Governance, Safety &{" "}
              <span className="text-primary">Integration Approach</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI must reduce risk before it increases automation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "No ERP Replacement", description: "We build on top of existing systems" },
              { title: "Read-Only First", description: "Advisory modes before automation" },
              { title: "Human Approval", description: "Control remains with your team" },
              { title: "Explainable AI", description: "Every recommendation has rationale" },
              { title: "Phased Rollout", description: "By region, warehouse, or route" },
              { title: "Rollback-Ready", description: "Safe deployment architecture" },
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
            <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-500">
              <DollarSign className="w-3 h-3 mr-1" />
              Transparent Pricing
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Supply Chain AI Cost Reference
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are production-grade, ERP-integrated systems, not dashboards or pilots.
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
                <Card className="h-full text-center border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-teal-500/5">
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
              <span className="text-primary">Supply Chain AI</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Will AI replace our ERP, WMS, or TMS?",
                a: "No. AGIX builds AI layers that sit on top of existing systems. Your ERP/WMS/TMS remains the system of record. We enhance, not replace.",
              },
              {
                q: "Can we start with one warehouse, route, or SKU group?",
                a: "Yes. Most deployments begin with a pilot scope (single warehouse, region, or lane) and expand after validation. This reduces risk and builds confidence.",
              },
              {
                q: "How does AI handle seasonality and demand spikes?",
                a: "By using time-series models, external signals (holidays, promotions, trends), and continuous re-forecasting. This avoids static, one-time forecasts that miss volatility.",
              },
              {
                q: "Will planners lose control over decisions?",
                a: "No. AI provides recommendations with rationale. Human approval and overrides remain in place. Your team stays in control.",
              },
              {
                q: "What happens if AI makes a wrong recommendation?",
                a: "Safeguards include confidence bands, human-in-the-loop approvals, rollback-ready deployments, and continuous learning from outcomes. No black-box decisions.",
              },
              {
                q: "How long before we see measurable ROI?",
                a: "Typically 30-60 days for routing & visibility, 60-90 days for inventory optimization, and one planning cycle for forecasting accuracy improvements.",
              },
              {
                q: "Is AI suitable for low-margin operations?",
                a: "Yes — especially there. AI focuses on cost leakage, waste reduction, and working capital release, which matter most in thin-margin businesses.",
              },
              {
                q: "What data is required to get started?",
                a: "Usually historical orders/shipments, inventory & SKU masters, and route or warehouse data. We work with imperfect data and improve quality progressively.",
              },
              {
                q: "How complex is integration?",
                a: "Integrations are read-only first, API or file-based, phased and reversible. No 'big-bang' changes that disrupt your operations.",
              },
              {
                q: "Will this slow down operations during rollout?",
                a: "No. Deployments are staged outside peak cycles, with shadow-mode testing before any live recommendations go active.",
              },
              {
                q: "Can AI adapt as our network grows or changes?",
                a: "Yes. Models retrain as SKUs change, routes expand, and volumes grow. Scalability is built into the architecture.",
              },
              {
                q: "How do you ensure recommendations are explainable?",
                a: "Every recommendation includes key drivers, trade-offs considered, and expected impact. No black-box decisions — full transparency for your team.",
              },
              {
                q: "What about data security and access control?",
                a: "We implement role-based access, encryption at rest & transit, and region-specific data handling. Security is part of the architecture from day one.",
              },
              {
                q: "Does AI reduce headcount?",
                a: "AI reduces manual effort and firefighting, allowing teams to focus on exceptions, planning quality, and supplier coordination — not repetitive tasks.",
              },
              {
                q: "What is AGIX's role after go-live?",
                a: "AGIX acts as a long-term AI systems partner, providing monitoring & tuning, expansion planning, governance updates, and performance reviews.",
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

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Eliminate Supply Chain Blind Spots?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              In supply chains, every small delay compounds into cost. AI creates value by preventing problems — not reacting to them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-final-cta-finder">
                <a href="#solution-finder">
                  <Search className="w-5 h-5 mr-2" />
                  Find My AI Solution
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-final-cta-calculator">
                <a href="#leakage-calculator">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Cost Leakage
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
