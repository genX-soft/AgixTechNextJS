'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  CheckCircle2,
  Activity,
  AlertTriangle,
  Target,
  BarChart3,
  ChevronRight,
  Sparkles,
  Cpu,
} from "lucide-react";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function InteractiveToolsSection() {
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
                            <p className="block text-sm font-medium mb-2">Your Industry</p>
                            <div className="grid grid-cols-4 gap-2">
                              {industries.map((ind) => (
                                <Button key={ind} variant={selectedIndustry === ind ? "default" : "outline"} size="sm" onClick={() => setSelectedIndustry(ind)} className={selectedIndustry === ind ? "bg-orange-500 hover:bg-orange-600" : ""} data-testid={`button-industry-${ind.toLowerCase()}`}>{ind}</Button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="block text-sm font-medium mb-2">Business Model</p>
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
                          <p className="block text-sm font-medium">Select your operational pain points:</p>
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
                              <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={() => scrollToSection("cta-form")} data-testid="button-finder-discuss">Discuss With Us <ArrowRight className="w-4 h-4 ml-2" /></Button>
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
                              <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={() => scrollToSection("cta-form")} data-testid="button-maturity-guidance">Get Personalized Guidance <ArrowRight className="w-4 h-4 ml-2" /></Button>
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
