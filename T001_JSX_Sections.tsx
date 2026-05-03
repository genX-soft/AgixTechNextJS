      {/* ==================== BOTTLENECK SECTION ==================== */}
      <section className="py-24 bg-background relative overflow-hidden" data-testid="section-bottlenecks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Brain className="w-3 h-3 mr-1" />
              Fintech AI
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Where Fintech Breaks —{" "}
              <span className="text-primary">and How AI Fixes It</span>
            </h2>
            <p className="text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              Most fintech operational failures share the same seven root causes — from fraud leakage and slow underwriting to compliance fatigue and inefficient recovery.
              Each bottleneck maps directly to a specific AI system:{" "}
              <Link href="/services/ai-predictive-analytics/" className="text-primary underline underline-offset-2 hover:no-underline">Predictive Analytics AI</Link>{" "}
              for risk and scoring,{" "}
              <Link href="/services/ai-automation/" className="text-primary underline underline-offset-2 hover:no-underline">AI Automation</Link>{" "}
              for compliance, and{" "}
              <Link href="/services/ai-voice-agents/" className="text-primary underline underline-offset-2 hover:no-underline">AI Voice Agents</Link>{" "}
              for collections. Every solution is modular, explainable, and human-controlled.
            </p>
          </motion.div>

          {/* ── Bottleneck selector cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {bottlenecks.map((bn) => (
              <button
                key={bn.id}
                onClick={() => setSelectedBottleneck(bn)}
                data-testid={`button-bottleneck-${bn.id}`}
                className={`group flex flex-col items-center text-center gap-2.5 p-4 rounded-xl border-2 transition-all ${
                  selectedBottleneck.id === bn.id
                    ? `${bn.bgColor} ${bn.color} border-current shadow-sm`
                    : 'border-border/40 bg-card text-muted-foreground hover:border-border hover:bg-muted/40'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedBottleneck.id === bn.id ? 'bg-white/20' : 'bg-muted/60'}`}>
                  <bn.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${selectedBottleneck.id === bn.id ? 'opacity-70' : 'text-muted-foreground/60'}`}>BN-{bn.id}</p>
                  <p className="text-xs font-semibold leading-tight">{bn.title}</p>
                </div>
              </button>
            ))}
          </div>

          {/* ── Unified Problem → Fix panel ── */}
          {(() => {
            const fix = aiSystems.find(s => s.id === selectedBottleneck.id) || aiSystems[0];
            return (
              <motion.div key={selectedBottleneck.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="mb-12">
                <div className="grid md:grid-cols-[1fr_56px_1fr] gap-0 items-stretch">

                  {/* LEFT — The Problem */}
                  <div className="rounded-xl md:rounded-r-none border-2 border-destructive/25 bg-destructive/5 p-6 flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 ${selectedBottleneck.bgColor} rounded-lg shrink-0`}>
                        <selectedBottleneck.icon className={`w-5 h-5 ${selectedBottleneck.color}`} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-0.5">The Problem · BN-{selectedBottleneck.id}</p>
                        <p className="font-bold text-base leading-tight">{selectedBottleneck.title}</p>
                      </div>
                    </div>

                    {/* Reality chips */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">What&apos;s Breaking</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedBottleneck.reality.map((item, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20 font-medium">{item}</span>
                        ))}
                      </div>
                    </div>

                    {/* Business impact */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Business Impact</p>
                      <ul className="space-y-2">
                        {selectedBottleneck.impact.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CENTER — connector */}
                  <div className="hidden md:flex flex-col items-center justify-center gap-2 bg-muted/30 border-y-2 border-border/20 py-4">
                    <div className="w-px flex-1 bg-border/40" />
                    <div className="w-9 h-9 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground rotate-90 whitespace-nowrap mt-2 mb-2">AI Fix</p>
                    <div className="w-px flex-1 bg-border/40" />
                  </div>

                  {/* RIGHT — The AI Fix */}
                  <div className="rounded-xl md:rounded-l-none border-2 border-green-500/25 bg-green-500/5 p-6 flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-green-500/10 rounded-lg shrink-0">
                        <fix.icon className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 mb-0.5">The AI Fix · {fix.timeline}</p>
                        <p className="font-bold text-base leading-tight">{fix.title}</p>
                      </div>
                    </div>

                    {/* What it does */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">What It Does</p>
                      <ul className="space-y-2">
                        {fix.whatItDoes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact chips */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Expected Outcomes</p>
                      <div className="flex flex-wrap gap-2">
                        {fix.impact.map((item, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 font-medium">{item}</span>
                        ))}
                      </div>
                    </div>

                    {/* Boundaries + outcome */}
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1.5">Boundaries (by design)</p>
                      <div className="flex flex-wrap gap-1.5">
                        {fix.whatItDoesNot.map((item, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">{item}</span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: service links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-border/40 mt-auto">
                      <div className="flex flex-wrap gap-1">
                        {fix.integration.split(',').slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{tag.trim()}</span>
                        ))}
                      </div>
                      <Link href={fix.learnMoreHref} className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 shrink-0">
                        Explore Service <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                </div>

                {/* Outcome callout — full width below */}
                <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-green-500/8 border border-green-500/20">
                  <Sparkles className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-sm font-semibold text-foreground">{selectedBottleneck.outcomeCallout}</p>
                  {selectedBottleneck.caseStudy && (
                    <Link href={selectedBottleneck.caseStudy.href} className="ml-auto text-xs text-primary hover:underline shrink-0 flex items-center gap-1">
                      Case Study <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })()}

          {/* ==================== ROLE SELECTOR (inside bottlenecks section) ==================== */}
          <div className="mt-16 border-t border-border/40 pt-16" data-testid="section-roles">

            {/* Section header */}
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <Target className="w-3 h-3 mr-1" />
                Personalized AI Plan
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Where Should You Start?</h3>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
                Your role determines your highest-leverage AI investment. Select below to see your priority challenges, recommended AI systems, and deployment roadmap.
              </p>
            </div>

            {/* Role card grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
              {roleBasedBottlenecks.map((roleItem) => (
                <button
                  key={roleItem.id}
                  onClick={() => setSelectedRole(roleItem.id)}
                  data-testid={`tab-role-${roleItem.id}`}
                  className={`flex flex-col items-center text-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedRole === roleItem.id
                      ? `${roleItem.bgColor} ${roleItem.color} border-current shadow-sm`
                      : 'border-border/40 text-muted-foreground hover:border-border hover:bg-muted/40 bg-card'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${selectedRole === roleItem.id ? 'bg-white/20' : 'bg-muted/60'} shrink-0`}>
                    <roleItem.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold leading-tight">{roleItem.role}</span>
                </button>
              ))}
            </div>

            {/* Content panel */}
            {(() => {
              const role = roleBasedBottlenecks.find(r => r.id === selectedRole)!;
              const roleBottlenecks = bottlenecks.filter(b => role.bottleneckIds.includes(b.id));
              const roleSystems = aiSystems.filter(s => role.recommendedSystemIds.includes(s.id));
              return (
                <motion.div key={selectedRole} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>

                  {/* Role identity bar */}
                  <div className={`flex items-center gap-4 p-5 rounded-xl ${role.bgColor} border ${role.borderColor} mb-6`} data-testid={`panel-role-${role.id}`}>
                    <div className="p-3 bg-white/20 rounded-lg shrink-0">
                      <role.icon className={`w-6 h-6 ${role.color}`} />
                    </div>
                    <div>
                      <p className={`font-bold text-base ${role.color}`}>{role.role}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{role.description}</p>
                    </div>
                  </div>

                  {/* Three-column plan: Challenges → AI Fix → Roadmap */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">

                    {/* Column 1: Your Challenges */}
                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-destructive/10 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider text-destructive">Your Challenges</p>
                      </div>
                      <div className="space-y-3">
                        {roleBottlenecks.map((b) => (
                          <div key={b.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-border/50">
                            <div className={`p-1.5 ${b.bgColor} rounded shrink-0 mt-0.5`}>
                              <b.icon className={`w-3.5 h-3.5 ${b.color}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">BN-{b.id}</p>
                              <p className="text-sm font-medium leading-snug mt-0.5">{b.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: The AI Fix */}
                    <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-green-500/10 rounded-lg">
                          <Sparkles className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider text-green-600">The AI Fix</p>
                      </div>
                      <div className="space-y-3">
                        {roleSystems.map((s) => (
                          <div key={s.id} className="p-3 rounded-lg bg-background/60 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                              <p className="text-sm font-semibold leading-tight">{s.title}</p>
                            </div>
                            <div className="flex flex-wrap gap-1 ml-5">
                              {s.impact.slice(0, 2).map((item, i) => (
                                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-400 font-medium">{item}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Your Roadmap */}
                    <div className={`rounded-xl border ${role.borderColor} ${role.bgColor} bg-opacity-30 p-5`}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-white/20 rounded-lg">
                          <TrendingUp className={`w-4 h-4 ${role.color}`} />
                        </div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${role.color}`}>Your 12-Week Roadmap</p>
                      </div>
                      <div className="space-y-0">
                        {role.roadmapItems.map((item, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-7 h-7 rounded-full ${role.bgColor} border-2 ${role.borderColor} flex items-center justify-center shrink-0`}>
                                <span className={`text-xs font-bold ${role.color}`}>{i + 1}</span>
                              </div>
                              {i < role.roadmapItems.length - 1 && (
                                <div className="w-px flex-1 bg-border/60 my-1" />
                              )}
                            </div>
                            <div className={`pb-4 ${i === role.roadmapItems.length - 1 ? '' : ''}`}>
                              <p className={`text-[10px] font-bold uppercase tracking-wider ${role.color} mb-0.5`}>{item.phase}</p>
                              <p className="text-sm text-foreground leading-snug">{item.action}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-muted/50 border border-border">
                    <div>
                      <p className="font-semibold text-sm">Ready to build this for your organization?</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Free 30-minute conversation. We&apos;ll map your exact starting point — no pitch deck.</p>
                    </div>
                    <Button asChild className="shrink-0">
                      <a href="#lead-form">
                        Get My Custom AI Roadmap
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>

                </motion.div>
              );
            })()}
          </div>
        </div>
      </section>
