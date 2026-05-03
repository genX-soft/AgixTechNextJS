  );
}

export default function FintechIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <Landmark className="w-3 h-3 mr-1" />
                Fintech & Lending AI Solutions
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AI Solutions for FinTech & Lending That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-400">
                  Show You Where Risk Leaks
                </span>{" "}
                — and How to Fix It
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Built to Improve Credit Decisions, Reduce Fraud, and Scale Compliance
              </p>
              <p className="text-muted-foreground mb-6 max-w-xl">
                From FinTech startups and digital lenders to NBFCs, banks, and embedded finance platforms,
                AGIX Technologies builds AI systems that accelerate underwriting, reduce default risk, automate compliance,
                and strengthen customer trust — with explainable decisions.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Embedded Solution Finder in Hero */}
              <FintechSolutionFinder />

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
                    <p className="text-xs text-muted-foreground">Risk & approval loss</p>
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

      {/* Industry Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                <TrendingUp className="w-3 h-3 mr-1" />
                Market Reality
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Why FinTech Leaders Are{" "}
                <span className="text-primary">Investing in AI</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Customer expectations, fraud complexity, and regulatory pressure are all rising. Here's what's driving the shift to AI.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industryStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30"
                >
                  <stat.icon className="w-7 h-7 mx-auto mb-3 text-cyan-500" />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
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
              The <span className="text-destructive">Silent Failures</span> That Kill FinTech Growth
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              FinTech doesn't fail because of lack of capital. It fails when risk, compliance, and decision-making don't scale together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Manual Underwriting Slows Growth", 
                description: "Loan decisions take days instead of minutes. Underwriters manually review similar cases repeatedly while applicants drop off mid-process.",
                icon: Clock,
                impact: "45% application abandonment"
              },
              { 
                title: "Fraud Adapts Faster Than Rules", 
                description: "Static rule engines can't keep pace with evolving fraud tactics. By the time you update rules, fraudsters have already moved on.",
                icon: Shield,
                impact: "$42B annual global losses"
              },
              { 
                title: "Compliance Teams Are Overloaded", 
                description: "Manual compliance checks and disconnected audit trails create bottlenecks. Regulatory reviews drain time and focus from core operations.",
                icon: Scale,
                impact: "30% of staff time on audits"
              },
              { 
                title: "Approval Delays Kill Conversion", 
                description: "Modern customers expect instant decisions. Every hour of delay increases the chance they'll complete their loan with a competitor.",
                icon: TrendingUp,
                impact: "67% expect instant decisions"
              },
              { 
                title: "Risk Decisions Must Be Fast & Defensible", 
                description: "Regulators demand explainable AI. Black-box models create audit nightmares and compliance risks that slow adoption.",
                icon: FileText,
                impact: "Explainability required by law"
              },
              { 
                title: "Thin-File Customers Are Misjudged", 
                description: "Traditional credit scoring excludes millions of creditworthy customers. Alternative data could unlock new revenue streams.",
                icon: Users,
                impact: "1.4B adults underbanked globally"
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
              Instead of just reading, you can use interactive tools to understand your exact situation —
              and walk away with a complete AI roadmap, cost estimate, and implementation timeline.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              { icon: AlertCircle, title: "Identify Revenue Leakage", description: "Pinpoint default & fraud triggers", color: "text-destructive", bg: "bg-destructive/10" },
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


      {/* Industry Case Studies Section */}
      <IndustryCaseStudies caseStudies={caseStudies} industryName="Fintech" />

      {/* Industry Services Section */}
      <IndustryServices services={industryServices} industryName="Fintech" />

      {/* Interactive Tools Section */}
      <section id="leakage-calculator" className="py-20 bg-muted/30">
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
              These tools help you evaluate AI adoption before involving compliance teams.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <LeakageCalculator />
            <div id="readiness-quiz">
              <AIReadinessScore />
            </div>
          </div>
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
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-500">
              <Users className="w-3 h-3 mr-1" />
              Built For You
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              AI Solutions Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-400">
                Every Lending Model
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you process hundreds or millions of loans, the bottlenecks are similar — only the exposure changes.
              Find your organization type below.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {lenderTypes.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full text-center hover-elevate border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
                  <CardContent className="pt-6 pb-5">
                    <div className="p-3 bg-emerald-500/10 rounded-xl w-fit mx-auto mb-3">
                      <type.icon className="w-7 h-7 text-emerald-500" />
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
            <Badge className="mb-4">FinTech & Lending Bottleneck Map</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where Risk, Revenue, and Trust{" "}
              <span className="text-destructive">Quietly Break</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              FinTech and lending platforms rarely fail suddenly. They fail silently — through slow approvals,
              mispriced risk, rising fraud, compliance fatigue, and loss of customer trust.
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
                  <CardContent className="pt-0">
                    <ul className="space-y-1">
                      {bottleneck.symptoms.slice(0, 2).map((symptom, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-destructive shrink-0 mt-0.5" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Bottleneck Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBottleneck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <Card className="overflow-hidden">
                <CardHeader className={`${selectedBottleneck.bgColor} border-b border-border`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-background/50 rounded-lg`}>
                      <selectedBottleneck.icon className={`w-8 h-8 ${selectedBottleneck.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{selectedBottleneck.id}</Badge>
                        <CardTitle>{selectedBottleneck.title}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{selectedBottleneck.whoFaces}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        The Reality
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {selectedBottleneck.reality.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
                        {selectedBottleneck.whyExists}
                      </p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                      <h4 className="font-semibold mb-1 text-primary">{selectedBottleneck.solution.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{selectedBottleneck.solution.description}</p>
                      <ul className="space-y-2 mb-4">
                        {selectedBottleneck.solution.whatItDoes.map((item, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Timeline</p>
                          <p className="font-semibold text-primary">{selectedBottleneck.solution.timeline}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Investment Range</p>
                          <p className="font-semibold text-sm">{selectedBottleneck.solution.costSmall} - {selectedBottleneck.solution.costLarge}</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                        <p className="text-xs text-muted-foreground">Expected Impact</p>
                        <p className="text-sm font-medium text-green-500">{selectedBottleneck.solution.impact}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Role-Based Starting Points */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Role-Based{" "}
              <span className="text-primary">Starting Points</span>
            </h2>
            <p className="text-muted-foreground">
              You don't need to automate everything. Start with the highest-risk decision points.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleBasedPaths.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover-elevate">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-2">{item.role}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="font-mono">{item.path}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Safety */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Governance, Safety &{" "}
              <span className="text-primary">Regulatory Alignment</span>
            </h2>
            <p className="text-muted-foreground">
              AI must withstand audits — not just demos.
            </p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Eye, text: "No black-box decisions" },
                  { icon: FileText, text: "Explainability at every decision point" },
                  { icon: Users, text: "Human-in-the-loop controls" },
                  { icon: Scale, text: "Bias & fairness monitoring" },
                  { icon: Database, text: "Full audit logs & versioning" },
                  { icon: Globe, text: "Region-specific compliance mapping" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6 p-4 bg-primary/5 rounded-lg">
                AGIX Technologies builds governed, auditable AI systems for regulated finance.
                We design decision systems that regulators, auditors, and customers can trust.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lead Form - At Bottom */}
      <FintechLeadForm />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-emerald-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Landmark className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your FinTech AI Roadmap
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Built for Risk, Compliance & Scale
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a FinTech startup, digital lender, NBFC, or bank,
              AGIX Technologies helps you choose safe, high-impact AI entry points,
              avoid black-box risk, and scale decisions responsibly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-final-cta">
                <a href="#lead-form">
                  Get My FinTech AI Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#solution-finder">
                  Re-Run the FinTech AI Solution Finder
                  <RefreshCw className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Authority Statement */}
      <section className="py-12 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">AGIX Technologies</span> is an AI-first systems engineering company
            focused on building governed, explainable, and audit-ready AI systems for FinTech and lending.
            We don't chase shortcuts. We design AI systems that survive audits, scale responsibly, and earn long-term trust.
          </p>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-lg italic text-muted-foreground">
            "In FinTech, trust is the real currency. AI succeeds only when it strengthens trust —
            with customers, regulators, and internal teams alike."
          </p>
        </div>
      </section>
      <FAQPageSchema faqs={documentFAQs['fintech-ai-solutions']} />
      <FAQSection
        faqs={documentFAQs['fintech-ai-solutions']}
        title="Fintech AI Questions Answered"
      />
      <MainFooter />
    </div>
  );
}
