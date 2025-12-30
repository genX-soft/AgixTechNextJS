import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shirt,
  Brain,
  Clock,
  AlertTriangle,
  TrendingUp,
  Quote,
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  Package,
  Target,
} from "lucide-react";
import { Link } from "wouter";

export default function StitchFixCaseStudyPage() {
  const stylistWorkflow = [
    { step: "AI Pre-Selection", description: "Algorithm curates 50 items from 10,000+ inventory", time: "Instant", icon: Brain },
    { step: "Style Match Score", description: "Each item scored for client preference alignment", time: "Real-time", icon: Target },
    { step: "Fit Prediction", description: "Size recommendations based on body + brand data", time: "Real-time", icon: Shirt },
    { step: "Stylist Review", description: "Human stylist makes final selection from AI picks", time: "3 min", icon: Users },
    { step: "Explanation Gen", description: "AI drafts personalized styling notes", time: "Instant", icon: Sparkles },
  ];

  const coldStartSolution = [
    { question: "What's your typical weekend outfit?", insight: "Casual vs. formal preference" },
    { question: "Pick 3 colors you never wear", insight: "Color palette boundaries" },
    { question: "Rate these 10 outfit photos", insight: "Style embedding in 30 seconds" },
    { question: "How adventurous with new styles?", insight: "Exploration vs. exploitation balance" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero - Fashion Focus */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-pink-500/5 to-purple-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                    <Shirt className="w-3 h-3 mr-1" />
                    Fashion Tech
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    AI Personalization
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Stitch Fix
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Where algorithms meet artistry: building AI that amplifies human stylists, 
                  not replaces them—serving millions of unique style preferences at scale.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-pink-400">61%</p>
                    <p className="text-sm text-muted-foreground">First Box Keep Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">-58%</p>
                    <p className="text-sm text-muted-foreground">Stylist Time/Box</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">+42%</p>
                    <p className="text-sm text-muted-foreground">Client Lifetime Value</p>
                  </div>
                </div>
              </div>

              {/* Style Card Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">Client Style Profile</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Style Preference</span>
                      <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">Modern Minimalist</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Color Palette</span>
                      <div className="flex gap-1">
                        {["bg-slate-800", "bg-white", "bg-blue-900", "bg-amber-700"].map((c, i) => (
                          <div key={i} className={`w-5 h-5 rounded-full ${c} border border-slate-600`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Fit Preference</span>
                      <Badge variant="outline" className="text-slate-300">Relaxed, not tight</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Price Sensitivity</span>
                      <Badge variant="outline" className="text-slate-300">Mid-range ($40-80)</Badge>
                    </div>
                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-xs text-green-400 mb-2">AI Confidence</p>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "89%" }}
                          transition={{ delay: 0.5, duration: 1 }}
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                      </div>
                      <p className="text-right text-xs text-slate-400 mt-1">89% match confidence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24">
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

            <h2 className="text-3xl font-bold">Capturing Taste You Can't Describe</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fashion is deeply personal—and often unconscious. Clients can't articulate why 
              they love one dress and hate another that looks similar. The AI needed to learn 
              preferences that clients themselves couldn't explain.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-red-400">The Cold Start Problem</h4>
                  <p className="text-sm text-muted-foreground">
                    New clients have no purchase history. First box recommendations were 
                    essentially random—with only 42% keep rate and massive return costs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-amber-400">The Fit Nightmare</h4>
                  <p className="text-sm text-muted-foreground">
                    Same size fits differently across brands. "Medium" from one brand is 
                    another's "Large." 34% of returns were fit-related—pure waste.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="p-6 rounded-lg bg-muted/50 border border-border">
              <p className="text-muted-foreground italic">
                "Our stylists are artists, but they were spending 80% of their time on data 
                entry—looking up inventory, checking sizes, reading past notes. We needed 
                AI to handle the data work so they could focus on creative styling."
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                — Michelle Wong, Director of Styling Operations
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cold Start Solution */}
      <section className="py-24 bg-gradient-to-br from-pink-500/5 via-background to-purple-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                <Sparkles className="w-3 h-3 mr-1" />
                Cold Start Solution
              </Badge>
              <h2 className="text-3xl font-bold">Learning Style in 2 Minutes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our optimized onboarding quiz captures more style signal in 4 questions 
                than competitors get from 20.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {coldStartSolution.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-medium mb-2">{item.question}</p>
                          <Badge variant="outline" className="text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            {item.insight}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Result: First box keep rate improved from 42% to 61%
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stylist Workflow */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                <Users className="w-3 h-3 mr-1" />
                Human + AI Collaboration
              </Badge>
              <h2 className="text-3xl font-bold">The Stylist Copilot Workflow</h2>
            </div>

            <div className="space-y-4">
              {stylistWorkflow.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={i === 3 ? "border-purple-500/30 bg-purple-500/5" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          i === 3 ? "bg-purple-500/20" : "bg-muted"
                        }`}>
                          <step.icon className={`w-6 h-6 ${i === 3 ? "text-purple-400" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{step.step}</h4>
                            {i === 3 && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                Human Touch
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.time}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
              <p className="text-purple-400 font-medium">
                Total time from assignment to ship: 5 minutes (down from 12)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                Business Impact
              </Badge>
              <h2 className="text-3xl font-bold text-white">Measured Results</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Package className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">61%</p>
                  <p className="text-sm text-slate-400 mt-2">First Box Keep Rate</p>
                  <p className="text-xs text-slate-500">up from 42%</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Shirt className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">-32%</p>
                  <p className="text-sm text-slate-400 mt-2">Fit-Related Returns</p>
                  <p className="text-xs text-slate-500">better size prediction</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">$587</p>
                  <p className="text-sm text-slate-400 mt-2">Client Lifetime Value</p>
                  <p className="text-xs text-slate-500">up from $412</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">5 min</p>
                  <p className="text-sm text-slate-400 mt-2">Stylist Time/Box</p>
                  <p className="text-xs text-slate-500">down from 12 min</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial - Director Level */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-pink-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-pink-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "What we built isn't AI replacing stylists—it's AI giving stylists superpowers. 
                  They now understand each client's preferences instantly, see size predictions 
                  they can trust, and spend their time on what humans do best: creative styling 
                  that makes clients feel amazing."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    MW
                  </div>
                  <div>
                    <p className="font-semibold">Michelle Wong</p>
                    <p className="text-sm text-muted-foreground">Director of Styling Operations, Stitch Fix</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-pink-500/10 via-background to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Building AI for Personalization?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help companies build recommendation systems that learn what users 
              want—even when they can't articulate it.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/kroger">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Kroger
              </Button>
            </Link>
            <Link href="/case-studies/quizlet">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Quizlet
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
