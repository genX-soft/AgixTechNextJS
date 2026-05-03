
function FintechSolutionFinder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    lenderType: "",
    challenge: "",
    monthlyVolume: 1000,
    hasDataPipeline: "",
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

    if (inputs.challenge === "underwriting") {
      system = "AI Credit Scoring & Underwriting Engine";
      why = "Slow approvals are killing conversion. AI automates 70-80% of decisions with consistent risk logic.";
      timeline = "6-8 weeks";
      cost = inputs.monthlyVolume <= 2000 ? "$10K - $15K" : "$15K - $25K";
      nextPhase = "Alternative Data Risk Intelligence";
    } else if (inputs.challenge === "risk") {
      system = "Alternative Data Risk Intelligence";
      why = "One-size-fits-all scoring is driving defaults. AI enables smarter segmentation and early warnings.";
      timeline = "6-10 weeks";
      cost = "$12K - $20K";
      nextPhase = "AI Underwriting Engine";
    } else if (inputs.challenge === "fraud") {
      system = "Real-Time Fraud Detection Engine";
      why = "Rules-based systems can't keep up with evolving fraud patterns. ML models adapt in real-time.";
      timeline = "5-8 weeks";
      cost = "$10K - $18K";
      nextPhase = "Identity Verification AI";
    } else if (inputs.challenge === "compliance") {
      system = "Regulatory & Compliance AI Agent";
      why = "Manual compliance is slow and error-prone. AI automates reviews and maintains audit trails.";
      timeline = "6-8 weeks";
      cost = "$12K - $22K";
      nextPhase = "Document Intelligence";
    } else if (inputs.challenge === "kyc") {
      system = "AI-Powered KYC & Onboarding";
      why = "High drop-offs during onboarding. AI streamlines verification and reduces friction.";
      timeline = "4-6 weeks";
      cost = "$8K - $14K";
      nextPhase = "Fraud Detection AI";
    } else if (inputs.challenge === "collections") {
      system = "Intelligent Collections AI";
      why = "Generic collection strategies don't work. AI predicts willingness-to-pay and optimizes outreach.";
      timeline = "5-7 weeks";
      cost = "$10K - $16K";
      nextPhase = "Customer Support AI";
    } else if (inputs.challenge === "support") {
      system = "AI Customer Support Agent";
      why = "Support teams are overwhelmed. AI handles 60-70% of routine queries instantly.";
      timeline = "4-6 weeks";
      cost = "$8K - $14K";
      nextPhase = "Collections AI Integration";
    } else if (inputs.challenge === "intelligence") {
      system = "Portfolio Analytics & Intelligence Engine";
      why = "Limited visibility into portfolio health. AI provides real-time cohort analysis and risk monitoring.";
      timeline = "6-8 weeks";
      cost = "$12K - $20K";
      nextPhase = "Predictive Default Engine";
    } else {
      system = "AI Underwriting + Fraud Detection";
      why = "Start with the highest-ROI combination: faster approvals and reduced fraud losses.";
      timeline = "8-10 weeks";
      cost = "$18K - $30K";
      nextPhase = "Alternative Data Integration";
    }

    setResult({ system, why, timeline, cost, nextPhase });
    setStep(5);
  };

  return (
    <Card id="solution-finder" className="scroll-mt-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Find My FinTech AI Solution
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Takes ~30 seconds. Get a personalized recommendation for your lending platform.
        </p>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Label className="text-base font-medium">What type of lender are you?</Label>
              <div className="grid grid-cols-2 gap-2">
                {lenderTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={inputs.lenderType === type.id ? "default" : "outline"}
                    onClick={() => {
                      setInputs({ ...inputs, lenderType: type.id });
                      setStep(2);
                    }}
                    className="justify-start h-auto py-3"
                    data-testid={`button-finder-lender-${type.id}`}
                  >
                    <type.icon className="w-4 h-4 mr-2" />
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
              <Label className="text-base font-medium">Monthly Loan Volume</Label>
              <div className="space-y-6 pt-2">
                <Slider
                  value={[inputs.monthlyVolume]}
                  onValueChange={([val]) => setInputs({ ...inputs, monthlyVolume: val })}
                  max={10000}
                  step={500}
                  className="py-4"
                />
                <div className="flex justify-between text-sm font-medium">
                  <span>{inputs.monthlyVolume.toLocaleString()} loans / mo</span>
                  <span>10,000+</span>
                </div>
                <Button className="w-full" onClick={() => setStep(4)} data-testid="button-finder-next-3">
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Label className="text-base font-medium">Do you have a central data warehouse?</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={inputs.hasDataPipeline === "yes" ? "default" : "outline"}
                  onClick={() => {
                    setInputs({ ...inputs, hasDataPipeline: "yes" });
                    generateRecommendation();
                  }}
                  className="py-6"
                  data-testid="button-finder-data-yes"
                >
                  Yes, SQL/NoSQL
                </Button>
                <Button
                  variant={inputs.hasDataPipeline === "no" ? "default" : "outline"}
                  onClick={() => {
                    setInputs({ ...inputs, hasDataPipeline: "no" });
                    generateRecommendation();
                  }}
                  className="py-6"
                  data-testid="button-finder-data-no"
                >
                  No / Fragmented
                </Button>
              </div>
            </motion.div>
          )}

          {step === 5 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Bot className="w-5 h-5" />
                  <span className="font-bold">Recommended Starting Point</span>
                </div>
                <h4 className="text-xl font-bold">{result.system}</h4>
                <p className="text-sm leading-relaxed">{result.why}</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Est. Timeline</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {result.timeline}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Phase 2 Recommendation</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      {result.nextPhase}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  data-testid="button-finder-reset"
                >
                  Start Over
                </Button>
                <Button asChild className="flex-1">
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

function FintechLeadForm() {
  const { toast } = useToast();
  const { triggerCelebration } = useCelebration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    role: "",
    orgType: "",
    challenge: "",
    lendingType: "",
    portfolioSize: "",
    country: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.workEmail || !formData.orgType || !formData.challenge) {
      toast({
        title: "Please fill in required fields",
        description: "Email, organization type, and challenge are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const result = await submitLead(
      {
        name: formData.fullName,
        email: formData.workEmail,
        company: formData.company,
        role: formData.role,
        industry: "fintech",
        companySize: formData.portfolioSize,
        challenges: [formData.challenge],
        message: `Organization Type: ${formData.orgType}, Lending Type: ${formData.lendingType}, Region: ${formData.country}`,
      },
      {
        formType: "fintech-roadmap",
        source: "/industries/fintech",
        ctaId: "fintech-form-submit",
        ctaText: "Get My FinTech AI Roadmap",
        ctaLocation: "/industries/fintech",
        additionalMetadata: {
          orgType: formData.orgType,
          lendingType: formData.lendingType,
          country: formData.country,
        },
      }
    );

    setIsSubmitting(false);

    if (result.success) {
      triggerCelebration();
      toast({
        title: "Request received",
        description: "We'll review your needs and get back to you shortly."
      });
      trackEvent("lead_form_submit", {
        event_category: "fintech_industry",
        event_label: "hero_form"
      });
      setFormData({ fullName: "", workEmail: "", company: "", role: "", orgType: "", challenge: "", lendingType: "", portfolioSize: "", country: "" });
    } else {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="lead-form" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-cyan-500/5">
              <CardTitle className="text-2xl">Get Your FinTech AI Roadmap</CardTitle>
              <p className="text-muted-foreground">
                Built for Risk, Compliance & Scale — No sales pressure. We recommend what is compliant, explainable, and realistic.
              </p>
            </CardHeader>
            <CardContent className="max-w-xl mx-auto space-y-4 pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fintech-name" className="text-sm">Full Name</Label>
                    <Input
                      id="fintech-name"
                      name="name"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your name"
                      data-testid="input-fintech-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fintech-email" className="text-sm">Work Email *</Label>
                    <Input
                      id="fintech-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="you@company.com"
                      required
                      data-testid="input-fintech-email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fintech-company" className="text-sm">Company</Label>
                    <Input
                      id="fintech-company"
                      name="organization"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your company"
                      data-testid="input-fintech-company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fintech-role" className="text-sm">Your Role</Label>
                    <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                      <SelectTrigger id="fintech-role" data-testid="select-fintech-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="founder">Founder / CEO</SelectItem>
                        <SelectItem value="cto">CTO / Tech Lead</SelectItem>
                        <SelectItem value="cro">CRO / Risk Officer</SelectItem>
                        <SelectItem value="product">Product Manager</SelectItem>
                        <SelectItem value="operations">Operations Head</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fintech-org-type" className="text-sm">Organization Type *</Label>
                    <Select value={formData.orgType} onValueChange={(v) => setFormData({ ...formData, orgType: v })}>
                      <SelectTrigger id="fintech-org-type" data-testid="select-fintech-org-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fintech-startup">FinTech Startup</SelectItem>
                        <SelectItem value="digital-lender">Digital Lender</SelectItem>
                        <SelectItem value="nbfc">NBFC / Micro-lender</SelectItem>
                        <SelectItem value="bank">Bank / Credit Union</SelectItem>
                        <SelectItem value="bnpl">BNPL / Embedded Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fintech-challenge" className="text-sm">Primary Challenge *</Label>
                    <Select value={formData.challenge} onValueChange={(v) => setFormData({ ...formData, challenge: v })}>
                      <SelectTrigger id="fintech-challenge" data-testid="select-fintech-challenge">
                        <SelectValue placeholder="Select challenge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="underwriting">Underwriting Speed</SelectItem>
                        <SelectItem value="risk">Default Risk / NPAs</SelectItem>
                        <SelectItem value="fraud">Fraud Detection</SelectItem>
                        <SelectItem value="compliance">Compliance & Audit</SelectItem>
                        <SelectItem value="kyc">KYC & Onboarding</SelectItem>
                        <SelectItem value="collections">Collections</SelectItem>
                        <SelectItem value="not-sure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fintech-lending-type" className="text-sm">Lending Type</Label>
                    <Select value={formData.lendingType} onValueChange={(v) => setFormData({ ...formData, lendingType: v })}>
                      <SelectTrigger id="fintech-lending-type" data-testid="select-fintech-lending-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loans</SelectItem>
                        <SelectItem value="sme">SME Lending</SelectItem>
                        <SelectItem value="bnpl">BNPL</SelectItem>
                        <SelectItem value="mortgage">Mortgage</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fintech-portfolio" className="text-sm">Portfolio Size</Label>
                    <Select value={formData.portfolioSize} onValueChange={(v) => setFormData({ ...formData, portfolioSize: v })}>
                      <SelectTrigger id="fintech-portfolio" data-testid="select-fintech-portfolio">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1000">Under 1,000 loans</SelectItem>
                        <SelectItem value="1000-10000">1,000 - 10,000 loans</SelectItem>
                        <SelectItem value="10000-100000">10,000 - 100,000 loans</SelectItem>
                        <SelectItem value="over-100000">Over 100,000 loans</SelectItem>
                        <SelectItem value="pre-launch">Pre-launch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Country / Region</Label>
                  <Input
                    type="text"
                    placeholder="India, USA, UK, etc."
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    data-testid="input-fintech-country"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting} data-testid="button-fintech-submit">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My FinTech AI Roadmap
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-center text-muted-foreground">
                No sales pressure. We recommend what is compliant, explainable, and realistic.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export { FintechSolutionFinder, FintechLeadForm };
