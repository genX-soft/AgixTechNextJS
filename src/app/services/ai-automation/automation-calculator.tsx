'use client'
import { useState, useMemo } from "react";
import { motion } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  Search,
  DollarSign,
  TrendingUp,
  HelpCircle,
  RotateCcw,
} from "lucide-react";

const scannerIndustries = [
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance / FinTech" },
  { value: "insurance", label: "Insurance" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "logistics", label: "Logistics / Supply Chain" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "real-estate", label: "Real Estate" },
  { value: "other", label: "Other" }
];

const scannerDepartments = [
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Customer Support" },
  { value: "hr", label: "HR" },
  { value: "compliance", label: "Compliance" }
];

const scannerBottlenecks = [
  { value: "approvals", label: "Manual approvals" },
  { value: "documents", label: "Document processing" },
  { value: "email", label: "Email overload" },
  { value: "data-movement", label: "Data movement between systems" },
  { value: "delays", label: "Process delays" },
  { value: "errors", label: "Error & rework issues" }
];

const readinessQuestions = [
  { id: "process-clarity", question: "How well documented are your current processes?", weight: 15 },
  { id: "data-availability", question: "Is the data needed for automation accessible and organized?", weight: 20 },
  { id: "tool-standardization", question: "Are your tools standardized across teams?", weight: 15 },
  { id: "change-readiness", question: "Is your team open to adopting new automation tools?", weight: 20 },
  { id: "compliance", question: "Do you have compliance requirements that automation must satisfy?", weight: 15 },
  { id: "executive-support", question: "Do you have executive sponsorship for automation initiatives?", weight: 15 }
];

export default function AutomationCalculator() {
  const [activeTab, setActiveTab] = useState("scanner");

  const [industry, setIndustry] = useState("");
  const [department, setDepartment] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [volume, setVolume] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [automationType, setAutomationType] = useState("workflow");
  const [systemCount, setSystemCount] = useState("1-2");
  const [complexity, setComplexity] = useState("simple");
  const [volumeLevel, setVolumeLevel] = useState("medium");

  const [teamSize, setTeamSize] = useState([5]);
  const [hourlyRate, setHourlyRate] = useState([50]);
  const [timePerTask, setTimePerTask] = useState([15]);
  const [monthlyVolume, setMonthlyVolume] = useState([1000]);
  const [errorRate, setErrorRate] = useState([5]);

  const [answers, setAnswers] = useState<Record<string, "strongly-agree" | "agree" | "neutral" | "disagree" | "strongly-disagree">>({});

  const scannerResults = useMemo(() => {
    if (!industry || !department || !bottleneck || !volume) return null;

    const candidates = [];
    if (bottleneck === "documents") {
      candidates.push({ name: "Invoice Processing", type: "Document Intelligence", roi: "High", complexity: "Low" });
      candidates.push({ name: "Contract Review", type: "Document Intelligence", roi: "Medium", complexity: "Medium" });
    }
    if (bottleneck === "approvals") {
      candidates.push({ name: "Approval Workflows", type: "AI BPA", roi: "High", complexity: "Low" });
      candidates.push({ name: "Exception Handling", type: "AI Workflow Automation", roi: "Medium", complexity: "Medium" });
    }
    if (bottleneck === "email") {
      candidates.push({ name: "Email Triage & Routing", type: "Email Automation", roi: "High", complexity: "Low" });
      candidates.push({ name: "Auto-Response Generation", type: "AI Email Automation", roi: "Medium", complexity: "Medium" });
    }
    if (bottleneck === "data-movement") {
      candidates.push({ name: "System Integration", type: "AI Workflow Automation", roi: "High", complexity: "Medium" });
      candidates.push({ name: "Data Sync & Validation", type: "AI Workflow Automation", roi: "Medium", complexity: "Low" });
    }
    if (bottleneck === "delays" || bottleneck === "errors") {
      candidates.push({ name: "Process Orchestration", type: "AI BPA", roi: "High", complexity: "Medium" });
      candidates.push({ name: "Quality Checks", type: "AI Workflow Automation", roi: "Medium", complexity: "Low" });
    }

    if (candidates.length < 3) {
      candidates.push({ name: "Reporting Automation", type: "AI Workflow Automation", roi: "Medium", complexity: "Low" });
    }

    const hoursSaved = volume === "high" ? "80-120" : volume === "medium" ? "40-80" : "15-40";

    return { candidates: candidates.slice(0, 3), hoursSaved, phase1Timeline: "3-6 weeks", phase1Cost: "$6K-$15K" };
  }, [industry, department, bottleneck, volume]);

  const estimate = useMemo(() => {
    let baseCost = 8000;
    let weeks = 4;

    if (automationType === "bpa") { baseCost = 25000; weeks = 8; }
    else if (automationType === "document") { baseCost = 12000; weeks = 5; }
    else if (automationType === "email") { baseCost = 8000; weeks = 4; }
    else if (automationType === "transformation") { baseCost = 60000; weeks = 16; }

    if (systemCount === "3-5") { baseCost *= 1.4; weeks += 2; }
    else if (systemCount === "6+") { baseCost *= 1.8; weeks += 4; }

    if (complexity === "moderate") { baseCost *= 1.3; weeks += 2; }
    else if (complexity === "advanced") { baseCost *= 1.6; weeks += 3; }

    if (volumeLevel === "high") { baseCost *= 1.2; }

    return {
      lowCost: Math.round(baseCost * 0.85),
      highCost: Math.round(baseCost * 1.15),
      weeks,
      deliveryStyle: automationType === "transformation" ? "Transformation" : automationType === "bpa" ? "Program" : "Project"
    };
  }, [automationType, systemCount, complexity, volumeLevel]);

  const roiCalculations = useMemo(() => {
    const hoursPerMonth = (monthlyVolume[0] * timePerTask[0]) / 60;
    const currentMonthlyCost = hoursPerMonth * hourlyRate[0];
    const currentAnnualCost = currentMonthlyCost * 12;
    const automatedSavings = currentAnnualCost * 0.7;
    const errorSavings = currentAnnualCost * (errorRate[0] / 100) * 0.8;
    const totalAnnualSavings = automatedSavings + errorSavings;
    const avgImplementationCost = 25000;
    const paybackMonths = Math.ceil((avgImplementationCost / (totalAnnualSavings / 12)));
    const roi = Math.round((totalAnnualSavings / avgImplementationCost) * 100);

    return {
      currentMonthlyCost: Math.round(currentMonthlyCost),
      currentAnnualCost: Math.round(currentAnnualCost),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      paybackMonths: Math.min(Math.max(paybackMonths, 1), 24),
      roi
    };
  }, [hourlyRate, timePerTask, monthlyVolume, errorRate]);

  const readinessScore = useMemo(() => {
    let total = 0;
    let maxScore = 0;
    readinessQuestions.forEach((q) => {
      maxScore += q.weight * 2;
      const answer = answers[q.id];
      if (answer === "strongly-agree") total += q.weight * 2;
      else if (answer === "agree") total += q.weight * 1.5;
      else if (answer === "neutral") total += q.weight;
      else if (answer === "disagree") total += q.weight * 0.5;
    });
    return maxScore > 0 ? Math.round((total / maxScore) * 100) : 0;
  }, [answers]);

  const allAnswered = Object.keys(answers).length === readinessQuestions.length;

  const getMaturityLevel = () => {
    if (readinessScore >= 75) return { level: "Intelligent", color: "text-green-400", recommendation: "Ready for enterprise automation program" };
    if (readinessScore >= 55) return { level: "Automated", color: "text-cyan-400", recommendation: "BPA or document automation recommended" };
    if (readinessScore >= 35) return { level: "Assisted", color: "text-amber-400", recommendation: "Start with one workflow pilot" };
    return { level: "Manual", color: "text-red-400", recommendation: "Focus on process documentation first" };
  };

  const maturityResult = getMaturityLevel();
  const allSelected = industry && department && bottleneck && volume;

  return (
    <Card id="interactive-tools" className="bg-muted/30 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          AI Automation Cost & ROI Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Identify opportunities, estimate costs, calculate ROI, and assess readiness
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap gap-1 h-auto mb-6">
            <TabsTrigger value="scanner" className="flex-1 min-w-[80px]" data-testid="tab-automation-scanner">
              <Search className="w-4 h-4 mr-1 hidden md:inline" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="cost" className="flex-1 min-w-[80px]" data-testid="tab-automation-cost">
              <DollarSign className="w-4 h-4 mr-1 hidden md:inline" />
              Cost
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex-1 min-w-[80px]" data-testid="tab-automation-roi">
              <TrendingUp className="w-4 h-4 mr-1 hidden md:inline" />
              ROI
            </TabsTrigger>
            <TabsTrigger value="readiness" className="flex-1 min-w-[80px]" data-testid="tab-automation-readiness">
              <HelpCircle className="w-4 h-4 mr-1 hidden md:inline" />
              Readiness
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scanner-industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="scanner-industry" data-testid="select-scanner-industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {scannerIndustries.map((ind) => (
                      <SelectItem key={ind.value} value={ind.value}>{ind.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scanner-dept">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="scanner-dept" data-testid="select-scanner-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {scannerDepartments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scanner-bottleneck">Biggest Bottleneck</Label>
                <Select value={bottleneck} onValueChange={setBottleneck}>
                  <SelectTrigger id="scanner-bottleneck" data-testid="select-scanner-bottleneck">
                    <SelectValue placeholder="Select bottleneck" />
                  </SelectTrigger>
                  <SelectContent>
                    {scannerBottlenecks.map((b) => (
                      <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scanner-volume">Monthly Volume</Label>
                <Select value={volume} onValueChange={setVolume}>
                  <SelectTrigger id="scanner-volume" data-testid="select-scanner-volume">
                    <SelectValue placeholder="Select volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (&lt;1,000 items)</SelectItem>
                    <SelectItem value="medium">Medium (1,000-10,000)</SelectItem>
                    <SelectItem value="high">High (&gt;10,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {allSelected && !showResults && (
              <Button onClick={() => setShowResults(true)} className="w-full" data-testid="button-scanner-analyze">
                <Search className="w-4 h-4 mr-2" />
                Analyze Automation Opportunities
              </Button>
            )}

            {showResults && scannerResults && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 border-t border-border">
                <div>
                  <h4 className="font-semibold mb-3">Top 3 Automation Candidates (Ranked by ROI)</h4>
                  <div className="space-y-3">
                    {scannerResults.candidates.map((candidate, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{i + 1}</div>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-xs text-muted-foreground">{candidate.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={candidate.roi === "High" ? "default" : "secondary"}>{candidate.roi} ROI</Badge>
                          <Badge variant="outline">{candidate.complexity}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Hours Saved / Month</p>
                    <p className="text-2xl font-bold text-primary">{scannerResults.hoursSaved}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Phase 1 (Quick Win)</p>
                    <p className="font-semibold">{scannerResults.phase1Timeline}</p>
                    <p className="text-sm text-muted-foreground">{scannerResults.phase1Cost}</p>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setShowResults(false)} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset & Try Again
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="cost" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost-type">Automation Type</Label>
                <Select value={automationType} onValueChange={setAutomationType}>
                  <SelectTrigger id="cost-type" data-testid="select-cost-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workflow">Workflow Automation</SelectItem>
                    <SelectItem value="bpa">Business Process Automation (BPA)</SelectItem>
                    <SelectItem value="document">Document Automation</SelectItem>
                    <SelectItem value="email">Email Automation</SelectItem>
                    <SelectItem value="transformation">End-to-End Transformation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost-systems">Number of Systems</Label>
                <Select value={systemCount} onValueChange={setSystemCount}>
                  <SelectTrigger id="cost-systems" data-testid="select-cost-systems">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 systems</SelectItem>
                    <SelectItem value="3-5">3-5 systems</SelectItem>
                    <SelectItem value="6+">6+ systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost-complexity">Decision Complexity</Label>
                <Select value={complexity} onValueChange={setComplexity}>
                  <SelectTrigger id="cost-complexity" data-testid="select-cost-complexity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple (rules + AI assist)</SelectItem>
                    <SelectItem value="moderate">Moderate (AI decisions + exceptions)</SelectItem>
                    <SelectItem value="advanced">Advanced (multi-decision, adaptive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost-volume">Volume Level</Label>
                <Select value={volumeLevel} onValueChange={setVolumeLevel}>
                  <SelectTrigger id="cost-volume" data-testid="select-cost-volume">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
                <p className="text-xl font-bold text-primary">
                  ${(estimate.lowCost / 1000).toFixed(0)}K - ${(estimate.highCost / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                <p className="text-xl font-bold">{estimate.weeks} weeks</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Delivery Style</p>
                <p className="text-xl font-bold">{estimate.deliveryStyle}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">Indicative range, refined post discovery call</p>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Team Size</span>
                  <span className="text-primary font-semibold">{teamSize[0]} people</span>
                </Label>
                <Slider value={teamSize} onValueChange={setTeamSize} min={1} max={50} step={1} aria-label="Team size" data-testid="slider-roi-team" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Average Cost per Hour</span>
                  <span className="text-primary font-semibold">${hourlyRate[0]}</span>
                </Label>
                <Slider value={hourlyRate} onValueChange={setHourlyRate} min={20} max={200} step={5} aria-label="Hourly rate" data-testid="slider-roi-rate" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Minutes per Task</span>
                  <span className="text-primary font-semibold">{timePerTask[0]} min</span>
                </Label>
                <Slider value={timePerTask} onValueChange={setTimePerTask} min={1} max={60} step={1} aria-label="Minutes per task" data-testid="slider-roi-time" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Monthly Task Volume</span>
                  <span className="text-primary font-semibold">{monthlyVolume[0].toLocaleString('en-US')}</span>
                </Label>
                <Slider value={monthlyVolume} onValueChange={setMonthlyVolume} min={100} max={50000} step={100} aria-label="Monthly task volume" data-testid="slider-roi-volume" />
              </div>
              <div>
                <Label className="flex justify-between mb-2">
                  <span>Current Error Rate</span>
                  <span className="text-primary font-semibold">{errorRate[0]}%</span>
                </Label>
                <Slider value={errorRate} onValueChange={setErrorRate} min={0} max={20} step={1} aria-label="Current error rate" data-testid="slider-roi-error" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Current Annual Cost</p>
                <p className="text-xl font-bold">${(roiCalculations.currentAnnualCost / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Annual Savings</p>
                <p className="text-xl font-bold text-primary">${(roiCalculations.totalAnnualSavings / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Payback Period</p>
                <p className="text-xl font-bold text-green-400">{roiCalculations.paybackMonths} months</p>
              </div>
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">First Year ROI</p>
                <p className="text-xl font-bold text-cyan-400">{roiCalculations.roi}%</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="readiness" className="space-y-6">
            {readinessQuestions.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium">{q.question}</p>
                <RadioGroup
                  value={answers[q.id] || ""}
                  onValueChange={(v) => setAnswers({ ...answers, [q.id]: v as typeof answers[string] })}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    { value: "strongly-agree", label: "Strongly Agree" },
                    { value: "agree", label: "Agree" },
                    { value: "neutral", label: "Neutral" },
                    { value: "disagree", label: "Disagree" },
                    { value: "strongly-disagree", label: "Strongly Disagree" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} data-testid={`radio-readiness-${q.id}-${option.value}`} />
                      <Label htmlFor={`${q.id}-${option.value}`} className="text-sm cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            {allAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Readiness Score</p>
                    <p className={`text-3xl font-bold ${maturityResult.color}`}>{readinessScore}/100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Maturity Level</p>
                    <p className={`text-xl font-bold ${maturityResult.color}`}>{maturityResult.level}</p>
                  </div>
                </div>

                <Progress value={readinessScore} className="h-2" aria-label="Readiness score" />

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold mb-2">Recommended Next Step</p>
                  <p className="text-muted-foreground">{maturityResult.recommendation}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Pilot</p>
                    <p className="font-semibold">$6K-$15K</p>
                    <p className="text-xs text-muted-foreground">3-6 weeks</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-muted-foreground">Program</p>
                    <p className="font-semibold">$20K-$50K</p>
                    <p className="text-xs text-muted-foreground">6-12 weeks</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Transformation</p>
                    <p className="font-semibold">$60K+</p>
                    <p className="text-xs text-muted-foreground">3-6 months</p>
                  </div>
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
