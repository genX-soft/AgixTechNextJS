'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  UtensilsCrossed,
  Target,
  Clock,
  TrendingUp,
  Quote,
  Flame,
  Timer,
  CheckCircle2,
  Thermometer,
  ChefHat,
  Apple,
  Play,
  Volume2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function InnitCaseStudyPage() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [cookingProgress, setCookingProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const cookingSteps = [
    { step: "Prep", instruction: "Dice onions and mince garlic", duration: "5 min", temp: null, aiTip: "Rock the knife using your knuckles as a guide" },
    { step: "Sear", instruction: "Heat oil and sear chicken pieces", duration: "4 min", temp: "400°F", aiTip: "Don't move the chicken until it releases naturally" },
    { step: "Sauté", instruction: "Add aromatics and cook until fragrant", duration: "2 min", temp: "350°F", aiTip: "Stirring continuously prevents burning" },
    { step: "Simmer", instruction: "Add sauce and reduce heat", duration: "15 min", temp: "275°F", aiTip: "Cover partially for best reduction" },
    { step: "Rest", instruction: "Remove from heat and let rest", duration: "3 min", temp: null, aiTip: "This redistributes juices for tender meat" },
  ];

  const applianceStatus = [
    { device: "Smart Oven", status: "Preheating to 400°F", progress: 78, connected: true },
    { device: "Induction Cooktop", status: "Zone 1: Medium-High", progress: 100, connected: true },
    { device: "Meat Thermometer", status: "165°F target - currently 142°F", progress: 86, connected: true },
    { device: "Range Hood", status: "Auto-adjusted to level 3", progress: 60, connected: true },
  ];

  const simulateCooking = () => {
    setIsSimulating(true);
    setCookingProgress(0);
    const interval = setInterval(() => {
      setCookingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        if (prev >= 80) setSelectedStep(4);
        else if (prev >= 60) setSelectedStep(3);
        else if (prev >= 40) setSelectedStep(2);
        else if (prev >= 20) setSelectedStep(1);
        return prev + 5;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-red-500/5 to-orange-500/10 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Link href="/case-studies">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-cases">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-red-500/30 text-red-400">
                    <ChefHat className="w-3 h-3 mr-1" />
                    Smart Kitchen
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                    Cooking AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Innit
                </h1>

                <p className="text-xl text-muted-foreground">
                  AI sous chef for connected kitchen guidance. Real-time cooking assistance 
                  with smart appliance integration and step-by-step guidance.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-400">+89%</p>
                    <p className="text-sm text-muted-foreground">Cooking Success</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-400">-45%</p>
                    <p className="text-sm text-muted-foreground">Cooking Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">98%</p>
                    <p className="text-sm text-muted-foreground">Device Sync</p>
                  </div>
                </div>
              </div>

              {/* Cooking Progress Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Flame className="w-6 h-6 text-red-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Active Cooking</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { step: "Prep", status: "Dice onions and mince garlic", time: "5 min" },
                      { step: "Sear", status: "Heat oil and sear chicken", time: "4 min" },
                      { step: "Simmer", status: "Add sauce and reduce heat", time: "15 min" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{item.step}</p>
                          <p className="text-xs text-slate-400">{item.status}</p>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          {item.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Challenge
            </Badge>

            <h2 className="text-3xl font-bold">Home Cooks Failing at Recipes They Should Master</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Smart kitchen appliances promised to revolutionize home cooking—but without intelligent guidance, 
              users faced the same frustrations. Recipes were confusing, timing was off, temperatures were wrong, 
              and meals ended up ruined. The disconnect between smart devices and actual cooking success 
              meant expensive kitchen tech sat unused while food waste piled up.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <XCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">43%</p>
                  <p className="text-sm text-muted-foreground">Recipe failure rate</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">78%</p>
                  <p className="text-sm text-muted-foreground">Users confused by recipes</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Trash2 className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">$127</p>
                  <p className="text-sm text-muted-foreground">Monthly food waste/household</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30">
              <Flame className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Connected Kitchen Simulator</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              Watch AI orchestrate smart appliances and guide you through each cooking step
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Recipe Steps</p>
                <Button
                  size="sm"
                  onClick={simulateCooking}
                  disabled={isSimulating}
                  className="gap-2 bg-red-500 hover:bg-red-600"
                  data-testid="button-simulate-cooking"
                >
                  <Play className="w-4 h-4" />
                  {isSimulating ? "Cooking..." : "Start Cooking"}
                </Button>
              </div>
              {cookingSteps.map((step, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }}>
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedStep === i ? 'border-red-500 bg-red-500/10' :
                      i < selectedStep ? 'border-green-500/30 bg-green-500/5' :
                      'border-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => setSelectedStep(i)}
                    data-testid={`step-${i}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          i < selectedStep ? 'bg-green-500' :
                          selectedStep === i ? 'bg-red-500 animate-pulse' :
                          'bg-slate-700'
                        }`}>
                          {i < selectedStep ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white font-bold">{i + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{step.step}</p>
                          <p className="text-xs text-slate-400">{step.duration}</p>
                        </div>
                        {step.temp && (
                          <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs">
                            <Thermometer className="w-3 h-3 mr-1" />
                            {step.temp}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {isSimulating && (
                <div className="pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Overall Progress</span>
                    <span className="text-red-400 font-medium">{cookingProgress}%</span>
                  </div>
                  <Progress value={cookingProgress} className="h-2" />
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader className="border-b border-slate-700">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-red-400" />
                    AI Cooking Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
                        <p className="text-sm text-slate-400 mb-2">Current Instruction</p>
                        <p className="text-lg text-white font-medium">{cookingSteps[selectedStep].instruction}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                        <div className="flex items-start gap-3">
                          <ChefHat className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-red-400 font-medium mb-1">AI Pro Tip</p>
                            <p className="text-sm text-slate-300">{cookingSteps[selectedStep].aiTip}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader className="border-b border-slate-700">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Timer className="w-5 h-5 text-orange-400" />
                    Connected Appliances
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {applianceStatus.map((appliance, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-3 h-3 rounded-full ${appliance.connected ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-white">{appliance.device}</span>
                          <span className="text-xs text-slate-400">{appliance.progress}%</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-1">{appliance.status}</p>
                        <Progress value={appliance.progress} className="h-1" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-red-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-orange-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-red-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Home cooks often fail not because recipes are hard, but because timing and technique are unforgiving. Our AI watches temperature, adjusts cooking times, and gives real-time guidance that turns intimidating dishes into achievable victories. That's why our users cook 83% more diverse meals."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                  JL
                </div>
                <div>
                  <p className="font-semibold">Jennifer Lee</p>
                  <p className="text-sm text-muted-foreground">Director of Culinary AI, Innit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Smart Kitchen AI?</h2>
          <p className="text-slate-400 mb-8">
            Let's create cooking experiences that delight home chefs.
          </p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/dartmouth-college">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Dartmouth College
            </Button>
          </Link>
          <Link href="/case-studies/hungryroot">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Hungryroot
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
