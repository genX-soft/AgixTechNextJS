
export default function FintechIndustryPage() {
  const [selectedBottleneck, setSelectedBottleneck] = useState(bottlenecks[0]);
  const [selectedRole, setSelectedRole] = useState(roleBasedBottlenecks[0].id);

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
              <FintechSolutionFinder />

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#lead-form"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500/20 to-destructive/20 rounded-lg border border-orange-500/30 hover-elevate group"
                >
                  <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    <Calculator className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Fintech AI Roadmap</p>
                    <p className="text-xs text-muted-foreground">Get started now</p>
                  </div>
                </a>

                <a
                  href="#section-bottlenecks"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg border border-purple-500/30 hover-elevate group"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Bottleneck Analysis</p>
                    <p className="text-xs text-muted-foreground">Find leakage points</p>
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

