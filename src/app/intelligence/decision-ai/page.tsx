'use client'
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Brain, CheckCircle2, Shield, TrendingUp, AlertTriangle,
  ChevronDown, ChevronRight, ArrowDown, Sparkles, CheckCheck, Bot,
  Globe, Quote, User, RefreshCcw, Target, Layers, BarChart3,
  LineChart, Lightbulb, Landmark, HeartPulse, ShoppingBag, Truck,
  Factory, Umbrella, Activity, XCircle,
} from "lucide-react";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function HeroSection() {
  return (
    <section className="pt-24 lg:pt-28 pb-20 min-h-[85vh] flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto text-center space-y-6">
          <nav aria-label="Breadcrumb" className="flex justify-center">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li><span className="text-muted-foreground">Intelligence</span></li>
              <ChevronRight className="w-3 h-3" />
              <li><span className="text-purple-400">Decision Intelligence</span></li>
            </ol>
          </nav>
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 px-4 py-1.5" data-testid="badge-hero-category">
            <Brain className="w-4 h-4 mr-2" />Intelligence Framework
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
            Decision Intelligence:{" "}
            <span className="text-purple-400">When AI Doesn&apos;t Just Inform — It Decides</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subheadline">
            <span className="text-slate-300">Analytics</span> tells you what happened.{" "}
            <span className="text-blue-400">Prediction</span> tells you what will happen.{" "}
            <span className="text-purple-400">Decision Intelligence</span> tells you what to do about it — and can execute the answer.
          </p>
          <p className="text-sm text-muted-foreground/70 italic">
            By <Link href="/author/santosh/" className="text-purple-400/80 hover:text-purple-400 transition-colors">Santosh Singh</Link>, Founder &amp; CEO, AGIX Technologies · April 2026
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25" onClick={() => scrollToSection("di-pyramid")} data-testid="button-hero-primary">
              Explore the Decision Pyramid <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("complexity-matrix")} data-testid="button-hero-secondary">
              Decision Complexity Matrix <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button onClick={() => scrollToSection("definition")} aria-label="Scroll down" data-testid="button-scroll-down">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-muted-foreground hover:text-purple-400 transition-colors">
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
          Gartner published its inaugural Magic Quadrant for Decision Intelligence Platforms in <span className="text-purple-400">January 2026</span> · Market: <span className="text-blue-400">$17.41B in 2025</span> → <span className="text-green-400">$42.51B by 2030</span> at 19.7% CAGR · 33% of organizations already deployed, 17% committed within 6 months
        </p>
      </div>
    </section>
  );
}

function DefinitionBlock() {
  return (
    <section id="definition" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-definition">
            <Lightbulb className="w-3 h-3 mr-1" />Definition
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-definition">What Is Decision Intelligence?</h2>
          <div className="bg-slate-900/60 border border-purple-500/20 rounded-xl p-6 md:p-8 mb-6" itemScope itemType="https://schema.org/Question">
            <meta itemProp="name" content="What is decision intelligence?" />
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-lg md:text-xl leading-relaxed" itemProp="text" data-testid="text-definition-primary">
                <strong>Decision Intelligence</strong> is a practical discipline that uses AI to{" "}
                <span className="text-blue-400">support</span>,{" "}
                <span className="text-purple-400">guide</span>, and{" "}
                <span className="text-green-400">automate</span>{" "}
                business decisions — by explicitly understanding and engineering how decisions are made, executed, monitored, and improved. It goes beyond analytics (which explains what happened) and beyond prediction (which estimates what will happen) to answer the question that actually matters:{" "}
                <strong>what should we do — and how confident should we be?</strong>
              </p>
            </div>
          </div>
          <div className="bg-slate-900/40 border border-purple-500/10 rounded-xl p-5 mb-6">
            <p className="text-sm text-muted-foreground italic">
              Gartner defines Decision Intelligence as <span className="text-purple-300">"a practical discipline that advances decision making by explicitly understanding and engineering how decisions are made."</span> In January 2026, Gartner published its inaugural Magic Quadrant for Decision Intelligence Platforms — formally validating this as a recognized enterprise category.
            </p>
          </div>
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-purple-400 shrink-0 mt-1" />
                <p className="text-base italic" data-testid="text-original-quote">
                  Data doesn&apos;t make decisions. Systems do. Decision Intelligence is the discipline of engineering those systems — so the right decision happens at the right time, with the right level of confidence and governance.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function WhyNowSection() {
  const problems = [
    { n: "01", title: "The decision gap is where value is lost.", body: "Data explains the past. Predictions estimate the future. But between prediction and action, there's a gap — the moment where a human or system must choose. When that gap is slow, inconsistent, or biased, value is destroyed.", color: "text-red-400", border: "border-red-500/20" },
    { n: "02", title: "Decision complexity is outpacing human capacity.", body: "The number of variables, constraints, dependencies, and trade-offs in modern business decisions exceeds what any individual or team can consistently evaluate. Pricing decisions depend on demand, competition, inventory, margin, seasonality, and customer segment — simultaneously.", color: "text-amber-400", border: "border-amber-500/20" },
    { n: "03", title: "The cost of wrong decisions is measurable and growing.", body: "Late pricing adjustments. Missed fraud signals. Delayed resource allocation. Over-discounted deals. Every operational, financial, and strategic decision has a cost when it's wrong or slow.", color: "text-orange-400", border: "border-orange-500/20" },
  ];
  const stats = [
    { value: "$17.41B", label: "Decision Intelligence market 2025", sub: "→ $42.51B by 2030, 19.7% CAGR", source: "TBRC", color: "text-purple-400" },
    { value: "80%", label: "of executives believe all decisions can be automated", sub: "the question is which level of automation", source: "Gartner", color: "text-blue-400" },
    { value: "15%", label: "of work decisions will be autonomous by 2028", sub: "starting with high-frequency, low-risk choices", source: "Gartner", color: "text-green-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-why-now">
            <AlertTriangle className="w-3 h-3 mr-1" />Why It Matters Now
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-now">Three Reasons Decision Intelligence Is Now Necessary</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`h-full border ${p.border} bg-slate-900/40`} data-testid={`card-problem-${i}`}>
                <CardContent className="p-6 space-y-3">
                  <div className={`text-4xl font-black opacity-30 ${p.color}`}>{p.n}</div>
                  <h3 className={`font-bold text-sm ${p.color}`}>{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="text-center border-slate-700 bg-slate-900/50" data-testid={`card-stat-${i}`}>
                <CardContent className="p-6 space-y-1">
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <p className="font-semibold text-sm">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                  <p className="text-xs text-muted-foreground/50 italic mt-2">Source: {s.source}</p>
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
    { dim: "Core question", analytics: '"What happened?"', predictive: '"What will happen?"', di: '"What should we do?"' },
    { dim: "Output", analytics: "Reports, dashboards, trends", predictive: "Forecasts, risk scores, probabilities", di: "Recommendations, automated actions, governed decisions" },
    { dim: "Timeframe", analytics: "Past", predictive: "Future estimate", di: "Present — actionable now" },
    { dim: "Human role", analytics: "Interprets the data", predictive: "Interprets the prediction", di: "Reviews the recommendation (or system acts autonomously)" },
    { dim: "Learning", analytics: "None — snapshot in time", predictive: "Model retraining on new data", di: "Learns from decision outcomes — which choice worked?" },
    { dim: "Business value", analytics: "Understanding", predictive: "Foresight", di: "Action — the decision itself" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-comparison">
            <BarChart3 className="w-3 h-3 mr-1" />Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-comparison">Decision Intelligence vs Analytics vs Predictive AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Three distinct capabilities. Only one produces the decision itself.</p>
        </motion.div>
        <Card className="overflow-hidden border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/70">
                  <th className="text-left p-4 text-muted-foreground font-medium w-32">Dimension</th>
                  <th className="text-center p-4 text-slate-400 font-medium">Analytics / BI</th>
                  <th className="text-center p-4 text-blue-400 font-medium">Predictive AI</th>
                  <th className="text-center p-4 text-purple-400 font-semibold">Decision Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/70 hover:bg-slate-900/20 transition-colors" data-testid={`row-comparison-${i}`}>
                    <td className="p-4 font-medium text-slate-300 text-xs">{row.dim}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.analytics}</td>
                    <td className="p-4 text-center text-muted-foreground text-xs leading-relaxed">{row.predictive}</td>
                    <td className="p-4 text-center text-purple-300 text-xs font-medium leading-relaxed">{row.di}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
}

function DecisionIntelligencePyramid() {
  const [activeLevel, setActiveLevel] = useState(0);
  const levels = [
    {
      level: "Level 1", title: "Informed Decisions", subtitle: "AI provides data. Human decides.",
      icon: BarChart3, color: "from-blue-600 to-blue-700", textColor: "text-blue-400", borderColor: "border-blue-500", bgActive: "bg-blue-500/10 border-blue-500",
      desc: "The AI surfaces relevant information, organizes it, and presents it at the moment of decision. The human evaluates and chooses.",
      example: "A sales manager reviews an AI-generated pipeline risk report that highlights deals likely to slip. The manager decides which deals to intervene on and how.",
      when: "High-stakes, low-frequency decisions. Strategic choices. Decisions requiring judgment, relationships, or ethical consideration that AI cannot evaluate.",
    },
    {
      level: "Level 2", title: "Recommended Decisions", subtitle: "AI recommends. Human approves.",
      icon: Lightbulb, color: "from-purple-500 to-purple-600", textColor: "text-purple-400", borderColor: "border-purple-500", bgActive: "bg-purple-500/10 border-purple-500",
      desc: "The AI presents a recommendation with confidence scoring, trade-off analysis, and the reasoning behind the suggestion. The human retains final authority.",
      example: "An AI system recommends increasing inventory for Product X by 15% based on demand prediction, supplier lead time, and margin analysis. The procurement manager reviews and approves.",
      when: "Recurring decisions with moderate stakes. Where AI has enough data to recommend but the organization requires human oversight for accountability or compliance.",
      stat: "Aera Technology's Decision Intelligence platform improved inventory performance by up to 20% through automated recommendations that humans review and execute.",
    },
    {
      level: "Level 3", title: "Automated Decisions", subtitle: "AI decides within rules. Human monitors.",
      icon: Shield, color: "from-amber-500 to-amber-600", textColor: "text-amber-400", borderColor: "border-amber-500", bgActive: "bg-amber-500/10 border-amber-500",
      desc: "The AI evaluates the situation, selects the action, and executes — all within governance boundaries set by humans. Humans oversee the system and intervene on exceptions.",
      example: "A fraud detection system analyzes every transaction, blocks high-risk transactions automatically, and routes medium-risk ones to human review. The system handles 95% of decisions; humans handle 5%.",
      when: "High-frequency, moderate-stakes decisions. Decisions with clear rules, measurable outcomes, and reversible consequences. Fraud detection, dynamic pricing, content moderation, SLA routing.",
    },
    {
      level: "Level 4", title: "Autonomous Decisions", subtitle: "AI decides and adapts. Human sets objectives.",
      icon: Bot, color: "from-green-500 to-green-600", textColor: "text-green-400", borderColor: "border-green-500", bgActive: "bg-green-500/10 border-green-500",
      desc: "The AI doesn't just execute within rules — it sets sub-goals, adapts its approach based on outcomes, and continuously optimizes toward the objective.",
      example: "An autonomous supply chain system continuously adjusts procurement, inventory allocation, and distribution across regions based on real-time demand, cost, and risk signals — without human intervention on individual decisions.",
      when: "Decisions too frequent, complex, or time-sensitive for human involvement. Operations that run 24/7. Where the cost of delay exceeds the cost of occasional AI error.",
      stat: "15% of day-to-day work decisions will be made autonomously by AI agents by 2028 (Gartner). 80% of governments will deploy AI agents to automate routine decision-making by 2028 (Gartner).",
    },
  ];
  const active = levels[activeLevel];
  const ActiveIcon = active.icon;
  return (
    <section id="di-pyramid" className="py-20 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-pyramid">
            <Layers className="w-3 h-3 mr-1" />The AGIX Original Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-pyramid">The AGIX Decision Intelligence Pyramid</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Four levels of decision automation. The right level depends on the decision — its complexity, stakes, reversibility, and frequency. Not every decision belongs at Level 4.</p>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2 space-y-2">
            {levels.map((lv, i) => {
              const Icon = lv.icon;
              const isActive = activeLevel === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <button onClick={() => setActiveLevel(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${isActive ? `${lv.bgActive} shadow-lg` : "border-slate-700 hover:border-slate-600 bg-slate-900/30"}`} data-testid={`button-pyramid-${i}`} aria-pressed={isActive}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lv.color} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium mb-0.5 ${isActive ? lv.textColor : "text-muted-foreground"}`}>{lv.level}</p>
                        <p className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-300"}`}>{lv.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{lv.subtitle}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
            <Card className="border-purple-500/20 bg-purple-500/5 mt-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-xs italic text-muted-foreground leading-relaxed">The Pyramid is not a roadmap where every organization reaches Level 4. It is a framework for determining which decisions belong at which level. The art of Decision Intelligence is knowing the difference.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div key={activeLevel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <Card className="border-slate-700" data-testid="card-pyramid-details">
                  <CardContent className="p-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center shadow-lg`}>
                        <ActiveIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium ${active.textColor}`}>{active.level}</p>
                        <h3 className="text-xl font-bold" data-testid="text-pyramid-title">{active.title}</h3>
                        <p className="text-sm text-muted-foreground">{active.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{active.desc}</p>
                    <div className="bg-slate-900/50 rounded-lg p-4 space-y-3 border border-slate-700">
                      <div>
                        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Example</p>
                        <p className="text-sm text-muted-foreground italic">{active.example}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1">When this is right</p>
                        <p className="text-sm text-muted-foreground">{active.when}</p>
                      </div>
                      {active.stat && (
                        <div>
                          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Market evidence</p>
                          <p className="text-xs text-muted-foreground italic">{active.stat}</p>
                        </div>
                      )}
                    </div>
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

function DecisionComplexityMatrix() {
  const rows = [
    { char: "Frequency", l1: "Quarterly / annual", l2: "Weekly / monthly", l3: "Daily / hourly", l4: "Continuous" },
    { char: "Stakes", l1: "Strategic / high-impact", l2: "Moderate / operational", l3: "Moderate / reversible", l4: "Variable — system-managed" },
    { char: "Data availability", l1: "Incomplete, qualitative", l2: "Structured, quantitative", l3: "Rich, real-time", l4: "Multi-source, streaming" },
    { char: "Reversibility", l1: "Difficult to reverse", l2: "Somewhat reversible", l3: "Easily reversible", l4: "System self-corrects" },
    { char: "Regulatory", l1: "Human sign-off required", l2: "Human audit trail needed", l3: "Automated with audit logging", l4: "Governed autonomous action" },
    { char: "Examples", l1: "Market entry, M&A, hiring leaders", l2: "Inventory planning, pricing adjustments", l3: "Fraud detection, dynamic pricing, ticket routing", l4: "Supply chain optimization, real-time resource allocation" },
  ];
  return (
    <section id="complexity-matrix" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="outline" className="border-amber-500/30 text-amber-400 mb-4" data-testid="badge-matrix">
            <Target className="w-3 h-3 mr-1" />The AGIX Original Framework
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-matrix">The Decision Complexity Matrix: Which Decisions Belong Where?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A decision tool for leaders. Match your decisions to the right automation level.</p>
        </motion.div>
        <Card className="overflow-hidden border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/70">
                  <th className="text-left p-4 text-muted-foreground font-medium w-32">Characteristic</th>
                  <th className="text-center p-3 text-blue-400 font-medium text-xs">Level 1<br /><span className="font-normal text-muted-foreground">Informed</span></th>
                  <th className="text-center p-3 text-purple-400 font-medium text-xs">Level 2<br /><span className="font-normal text-muted-foreground">Recommended</span></th>
                  <th className="text-center p-3 text-amber-400 font-medium text-xs">Level 3<br /><span className="font-normal text-muted-foreground">Automated</span></th>
                  <th className="text-center p-3 text-green-400 font-semibold text-xs">Level 4<br /><span className="font-normal text-muted-foreground">Autonomous</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/70 hover:bg-slate-900/20 transition-colors" data-testid={`row-matrix-${i}`}>
                    <td className="p-4 font-medium text-slate-300 text-xs">{row.char}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs leading-relaxed">{row.l1}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs leading-relaxed">{row.l2}</td>
                    <td className="p-3 text-center text-muted-foreground text-xs leading-relaxed">{row.l3}</td>
                    <td className="p-3 text-center text-green-300 text-xs font-medium leading-relaxed">{row.l4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="border-purple-500/20 bg-purple-500/5 mt-6">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Quote className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
              <p className="text-sm italic" data-testid="text-matrix-quote">If a decision is high-frequency, data-rich, and easily reversible — it should be automated (Level 3+). If a decision is low-frequency, high-stakes, and qualitative — it should remain at Level 1 or 2. The Decision Complexity Matrix prevents the two most common mistakes: automating decisions that need human judgment, and keeping humans in loops they shouldn't be in.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function IndustryApplications() {
  const industries = [
    { icon: Landmark, name: "Financial Services", challenge: "Loan approvals, fraud detection, portfolio allocation", app: "Level 2 recommendations for lending; Level 3 automation for fraud", color: "text-blue-400", border: "border-blue-500/20" },
    { icon: Activity, name: "Healthcare", challenge: "Treatment selection, resource allocation, triage prioritization", app: "Level 1–2 clinical decision support; Level 3 operational routing", color: "text-red-400", border: "border-red-500/20" },
    { icon: ShoppingBag, name: "Retail", challenge: "Pricing, inventory, promotions, assortment", app: "Level 3 dynamic pricing; Level 2 assortment recommendations", color: "text-purple-400", border: "border-purple-500/20" },
    { icon: Umbrella, name: "Insurance", challenge: "Claims adjudication, underwriting, risk assessment", app: "Level 2–3 claims automation; Level 1 complex underwriting", color: "text-teal-400", border: "border-teal-500/20" },
    { icon: Brain, name: "SaaS", challenge: "Churn intervention, pricing, feature prioritization", app: "Level 2 retention recommendations; Level 3 usage-triggered actions", color: "text-amber-400", border: "border-amber-500/20" },
    { icon: Truck, name: "Supply Chain", challenge: "Procurement, distribution, demand allocation", app: "Level 3–4 autonomous optimization across nodes", color: "text-green-400", border: "border-green-500/20" },
    { icon: Globe, name: "Government", challenge: "Benefit eligibility, resource allocation, fraud prevention", app: "Level 2–3 eligibility processing; Level 1 policy decisions", color: "text-orange-400", border: "border-orange-500/20" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-teal-500/30 text-teal-400 mb-4" data-testid="badge-industries">
            <Globe className="w-3 h-3 mr-1" />Industry Applications
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">How Decision Intelligence Applies Across Industries</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">Decision Intelligence shifts governance from managing models and data to governing decisions themselves — how they are designed, executed, monitored, and audited (Gartner).</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {industries.slice(0, 6).map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className={`h-full border ${ind.border} hover-elevate`} data-testid={`card-industry-${i}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${ind.color}`} />
                      <h3 className={`font-bold text-sm ${ind.color}`}>{ind.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed"><span className="text-slate-300 font-medium">Challenge: </span>{ind.challenge}</p>
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-xs text-muted-foreground/70"><span className="text-purple-400 font-medium">DI Application: </span>{ind.app}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className={`border ${industries[6].border} hover-elevate`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Globe className={`w-5 h-5 ${industries[6].color} shrink-0 mt-0.5`} />
                <div>
                  <h3 className={`font-bold ${industries[6].color} mb-1`}>{industries[6].name}</h3>
                  <p className="text-sm text-muted-foreground"><span className="text-slate-300 font-medium">Challenge: </span>{industries[6].challenge}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1"><span className="text-purple-400 font-medium">DI Application: </span>{industries[6].app}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function ImplementationBridge() {
  const bridges = [
    { level: "Level 1: Informed", service: "AI Predictive Analytics", href: "/services/ai-predictive-analytics/", builds: "Dashboards, forecasts, risk signals to inform human decisions", color: "text-blue-400" },
    { level: "Level 2: Recommended", service: "AI Predictive Analytics + AI Automation", href: "/services/ai-automation/", builds: "Recommendation engines, trade-off analysis, approval workflows", color: "text-purple-400" },
    { level: "Level 3: Automated", service: "AI Automation + Agentic AI", href: "/services/agentic-ai-systems/", builds: "Rule-governed autonomous decisions with exception handling", color: "text-amber-400" },
    { level: "Level 4: Autonomous", service: "Agentic AI Systems", href: "/services/agentic-ai-systems/", builds: "Multi-agent decision systems that adapt and optimize continuously", color: "text-green-400" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-bridge">
            <ArrowRight className="w-3 h-3 mr-1" />Framework → Implementation
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-bridge">How Decision Intelligence Connects to Implementation</h2>
        </motion.div>
        <div className="space-y-3">
          {bridges.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-bridge-${i}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className={`text-sm font-semibold ${b.color} sm:w-44 shrink-0`}>{b.level}</div>
                    <div className="hidden sm:block text-muted-foreground/50">→</div>
                    <div className="flex-1 min-w-0">
                      <Link href={b.href} className="font-bold text-sm text-white hover:text-purple-400 transition-colors hover:underline underline-offset-2" data-testid={`link-service-${i}`}>{b.service}</Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.builds}</p>
                    </div>
                    <Link href={b.href} data-testid={`link-bridge-arrow-${i}`}><ChevronRight className="w-5 h-5 text-muted-foreground hover:text-purple-400 transition-colors" /></Link>
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

function FutureTrajectory() {
  const points = [
    { n: "01", title: "Decision Intelligence becomes a standard enterprise discipline.", body: "Gartner's inaugural Magic Quadrant for Decision Intelligence Platforms (Jan 2026) signals that DI is no longer experimental — it's a category with established vendors, evaluation criteria, and enterprise adoption. By 2028, every enterprise AI strategy will include a Decision Intelligence layer.", color: "text-purple-400" },
    { n: "02", title: "Autonomous decisions scale from edge cases to core operations.", body: "By 2028, 15% of work decisions will be made autonomously by AI agents (Gartner). This starts with high-frequency, low-risk decisions (ticket routing, dynamic pricing) and expands to more complex operational decisions as trust and governance mature.", color: "text-blue-400" },
    { n: "03", title: "Decision governance becomes the new compliance frontier.", body: "As AI makes more decisions, the question shifts from 'is our data governed?' to 'are our decisions governed?' Organizations will need audit trails, explainability, and accountability at the decision level — not just the model level.", color: "text-amber-400" },
    { n: "04", title: "Decision-as-a-Service emerges.", body: "AI agents will offer decision capabilities as APIs — other systems and agents query them for recommendations or actions. Decision logic becomes modular, composable, and reusable across the organization.", color: "text-orange-400" },
    { n: "05", title: "Human-AI decision collaboration becomes the norm.", body: "Level 2 (Recommended) becomes the standard operating model for most knowledge work. AI drafts the decision; human reviews and approves. This is not replacement — it is augmentation at the decision layer.", color: "text-green-400" },
  ];
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-future">
            <RefreshCcw className="w-3 h-3 mr-1" />2028 Trajectory
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-future">Where Decision Intelligence Is Heading</h2>
        </motion.div>
        <div className="space-y-4">
          {points.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-700 hover-elevate" data-testid={`card-future-${i}`}>
                <CardContent className="p-5 flex gap-5">
                  <div className={`text-2xl font-black opacity-40 ${p.color} shrink-0 w-8`}>{p.n}</div>
                  <div>
                    <h3 className={`font-bold ${p.color} mb-1`}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-purple-400 shrink-0 mt-1" />
              <p className="text-base italic" data-testid="text-future-quote">By 2028, the competitive question won't be "do you have AI?" — it will be "at what level of your Decision Intelligence Pyramid are your critical decisions operating?" The organizations at Level 3 and 4 will execute faster, fail less, and adapt more quickly than those still debating reports.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-700">
          <CardContent className="p-6 flex items-start gap-5">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-purple-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Santosh Singh</h3>
                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">Author</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Founder &amp; CEO, AGIX Technologies</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Santosh developed the Decision Intelligence Pyramid and Decision Complexity Matrix as frameworks for helping organizations determine which decisions to automate, to what degree, and with what governance. AGIX builds the AI infrastructure — predictive analytics, automation, and agentic systems — that powers decisions from Level 1 (informed) to Level 4 (autonomous).</p>
              <Link href="/author/santosh/" className="text-xs text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1 mt-1" data-testid="link-author-bio">
                Read full bio <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function DecisionIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <DefinitionBlock />
        <WhyNowSection />
        <ComparisonTable />
        <DecisionIntelligencePyramid />
        <DecisionComplexityMatrix />
        <IndustryApplications />
        <ImplementationBridge />
        <FutureTrajectory />
        <FAQSection faqs={documentFAQs['decision-ai']} title="Decision Intelligence: Questions Answered" />
        <section id="cta-form" className="py-10 lg:py-14 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CtaForm headline="Ready to Move from Insights to Decisions?" subheadline="Tell us which decisions are costing you the most time or risk. We'll show you which level of the Decision Intelligence Pyramid applies — and how to get there." />
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}
