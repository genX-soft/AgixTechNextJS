
      <IndustryCaseStudies caseStudies={caseStudies} industryName="Fintech & Lending" />
      
      <IndustryServices services={industryServices} industryName="Fintech & Lending" />

      {/* Trust & Governance Section */}
      <section id="trust-compliance" className="py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <Badge className="mb-4"><Shield className="w-3 h-3 mr-1" />Trust & Governance</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fintech AI That Risk Officers and{" "}
              <span className="text-primary">Regulators Can Trust</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every AGIX fintech AI system is governed by six non-negotiable principles — compliant, explainable, and audit-ready from day one.
            </p>
          </motion.div>

          <Card className="mb-12">
            <CardHeader className="pb-6 pt-8 px-8 text-center">
              <CardTitle className="text-xl">Our 6 Non-Negotiable Principles</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {principles.map((principle, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">{principle.number}</span>
                      </div>
                      <p className="text-sm font-semibold">{principle.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{principle.desc}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 border-primary/20">
            <CardHeader className="pb-6 pt-8 px-8 text-center">
              <CardTitle className="text-xl">Compliance & Regulatory Alignment</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <p className="text-sm font-medium mb-4">AGIX fintech AI systems are built to align with:</p>
                  <ul className="space-y-3">
                    {["GDPR, PCI-DSS, and SOC 2 Type II Standards", "Equal Credit Opportunity Act (ECOA) & Fair Lending", "Bank Secrecy Act (BSA) & Anti-Money Laundering (AML)", "Explainable AI (XAI) Regulatory Frameworks"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-4">This means:</p>
                  <ul className="space-y-3">
                    {["No black-box credit decisions — reasoning is always cited", "Continuous bias monitoring for protected demographic attributes", "Encryption of all PII and sensitive financial data", "Human-in-the-loop for all SAR filings and investigations"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FintechLeadForm />

      <FAQPageSchema faqs={documentFAQs['fintech-ai-solutions']} />
      <FAQSection
        faqs={documentFAQs['fintech-ai-solutions']}
        title="Fintech AI Questions Answered"
      />
      <MainFooter />
    </div>
  );
}
