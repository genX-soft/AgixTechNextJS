// ─── Service Page Data ────────────────────────────────────────────────────────
// One typed record per service. The ServicePageTemplate renders all sections
// from this data so each page.tsx stays minimal.

export interface ServiceStat {
  value: string;
  label: string;
  source?: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface AgixValuePoint {
  title: string;
  description: string;
}

export interface MaturityRow {
  level: string;
  what: string;
  does: string;
  limitation: string;
  highlight?: boolean;
}

export interface PipelineStep {
  num: string;
  title: string;
  description: string;
  tools?: string[];
}

export interface ServiceComponent {
  num: string;
  title: string;
  description: string;
  tools?: string[];
}

export interface ServiceExample {
  title: string;
  problem: string;
  bullets: string[];
  tools: string[];
  result: string;
}

export interface ComparisonRow {
  dimension: string;
  traditional: string;
  agix: string;
}

export interface PricingTier {
  tier: string;
  range: string;
  description: string;
  highlight?: boolean;
}

export interface ServiceData {
  slug: string;
  color: string;            // tailwind color name: violet, orange, cyan, …
  colorHex: string;         // for inline gradient styles
  icon: string;             // lucide icon name (rendered by name map in template)
  heroTag: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  directAnswer: string;
  originalQuote: string;
  author: string;
  lastUpdated: string;
  heroStats: HeroStat[];
  stats: ServiceStat[];
  agixValue: { headline: string; body: string; points: AgixValuePoint[] };
  maturity: { title: string; description: string; rows: MaturityRow[] };
  pipeline: { title: string; description: string; steps: PipelineStep[] };
  components: { title: string; description: string; items: ServiceComponent[] };
  examples: ServiceExample[];
  comparison: { title: string; vsLabel: string; rows: ComparisonRow[] };
  techStack: string[];
  pricing: PricingTier[];
  faqSection: string;       // key into documentFAQs
  keywords: string[];
  relatedBlogs?: { title: string; href: string; description: string; tag: string }[];
}

// ─── 1. Agentic AI Systems ────────────────────────────────────────────────────
const agenticAI: ServiceData = {
  slug: "agentic-ai-systems",
  color: "violet",
  colorHex: "#7c3aed",
  icon: "Network",
  heroTag: "Multi-Agent Architecture & Autonomous AI",
  h1: "Agentic AI Systems: Multi-Agent Architecture That Plans, Decides & Operates Autonomously",
  metaTitle: "Agentic AI Systems | Multi-Agent Architecture, Autonomous Agents & AI Orchestration | AGIX Technologies",
  metaDescription: "AGIX designs agentic AI systems — multi-agent architectures where AI agents plan, reason, use tools, and execute long-running objectives autonomously. Market: 42% CAGR to $57B by 2031. Average ROI: 171%. From $20K.",
  directAnswer: "Agentic AI systems are autonomous AI architectures where intelligent agents understand goals, plan multi-step actions, execute tasks across tools and APIs, coordinate with other agents, and continuously adapt until the objective is achieved — replacing manual coordination with AI-driven operations that run end-to-end.",
  originalQuote: "You don't get automation. You get an AI operating system for your business.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "50+", label: "Multi-Agent Projects Live" },
    { value: "171%", label: "Average ROI Delivered" },
    { value: "10 wks", label: "Typical Time to Production" },
    { value: "100%", label: "IP Ownership — Yours" },
  ],
  stats: [
    { value: "$57B", label: "Market by 2031", source: "Mordor Intelligence" },
    { value: "42%", label: "CAGR Growth", source: "Mordor Intelligence" },
    { value: "171%", label: "Average ROI", source: "Industry avg" },
    { value: "79%", label: "Orgs already adopting", source: "Multimodal 2025" },
  ],
  agixValue: {
    headline: "AGIX Designs, Builds & Deploys Your Agentic AI System",
    body: "We don't sell AI tools or resell off-the-shelf platforms. AGIX engineers production-grade agentic AI systems from the ground up — designing the agent architecture, selecting the right orchestration stack, building all tool integrations, and deploying to your infrastructure. You get a working autonomous system, not a demo.",
    points: [
      { title: "Custom Agent Architecture", description: "We design each agent's role, reasoning loop, and tool set from scratch based on your specific business operations — not template agents." },
      { title: "Full-Stack Integration", description: "Your agents connect to the real tools your business runs on — CRMs, databases, communication tools, APIs — built by us, tested by us." },
      { title: "Production Reliability", description: "Every AGIX agent system includes monitoring, error handling, human escalation triggers, and audit logging for production confidence." },
      { title: "You Own Everything", description: "Full source code, architecture documentation, deployment scripts — yours on day one. No vendor lock-in, no ongoing platform fees to us." },
    ],
  },
  maturity: {
    title: "From Tools → Workflows → Agentic Systems",
    description: "Understanding where your business sits determines what you actually need — and whether agentic AI is the right solution or a premature investment.",
    rows: [
      { level: "Level 1: Tools", what: "CRMs, APIs, dashboards", does: "Store data, display information", limitation: "Humans still operate everything" },
      { level: "Level 2: Workflows", what: "Automations, integrations", does: "Move data, trigger actions on rules", limitation: "Follow logic. Break on exceptions. Don't decide." },
      { level: "Level 3: Agentic Systems", what: "Multi-agent AI architectures", does: "Plan, reason, decide, execute, adapt, coordinate", limitation: "Pursue outcomes — not just follow instructions", highlight: true },
    ],
  },
  pipeline: {
    title: "How Agentic AI Systems Work: The Agent Loop",
    description: "Every agentic AI system operates on a continuous, closed-loop execution cycle. This is not a one-time workflow — it repeats until the objective is achieved.",
    steps: [
      { num: "01", title: "Goal Understanding", description: "The agent interprets the business objective — not a task instruction, but an outcome to achieve." },
      { num: "02", title: "Planning", description: "The agent decomposes the goal into ordered steps, identifies required tools and data, and creates an execution plan." },
      { num: "03", title: "Tool Execution", description: "The agent calls APIs, queries databases, sends communications, updates CRMs — using real tools, not simulations.", tools: ["HubSpot", "Salesforce", "Twilio", "Slack"] },
      { num: "04", title: "Observation", description: "The agent analyzes the results — did the step succeed? What changed? What data came back?" },
      { num: "05", title: "Refinement", description: "Based on observation, the agent adjusts — retrying failed steps, choosing alternative approaches, escalating to humans if confidence drops.", tools: ["LangGraph", "CrewAI", "AutoGen"] },
    ],
  },
  components: {
    title: "Agentic AI Architecture: The 5 Core Components",
    description: "A production-grade agentic AI system is a coordinated architecture of five core components — each essential for production reliability.",
    items: [
      { num: "01", title: "Reasoning Engine (LLM)", description: "The brain. Interprets goals, makes decisions, generates responses, evaluates outcomes.", tools: ["GPT-4o", "Claude", "Gemini", "o1/o3"] },
      { num: "02", title: "Planning Module", description: "Breaks complex objectives into ordered steps. Determines which agent handles which step. Manages dependencies." },
      { num: "03", title: "Tool Layer", description: "The hands. Connects agents to real business systems — CRMs, databases, communication tools, APIs.", tools: ["HubSpot", "GoHighLevel", "Twilio", "Vapi"] },
      { num: "04", title: "Memory Layer", description: "Stores context, tracks history, maintains state across sessions. Agents remember what happened and continue where they left off.", tools: ["Pinecone", "Supabase", "PostgreSQL"] },
      { num: "05", title: "Orchestration Layer", description: "Manages multiple agents. Coordinates handoffs, prevents conflicts, routes tasks to the right specialist.", tools: ["LangGraph", "CrewAI", "LangChain", "n8n"] },
    ],
  },
  examples: [
    {
      title: "Multi-Agent Revenue Operations System",
      problem: "Sales team manually qualifies leads, updates CRM, writes follow-ups, and schedules calls — losing 40% of leads to slow response times.",
      bullets: [
        "Lead Intake Agent: captures inbound leads, enriches with company data",
        "Qualification Agent: scores on budget, authority, need, and timeline",
        "Scheduling Agent: books discovery calls, manages conflicts",
        "Onboarding Agent: initiates post-sale onboarding, tracks completion over 30 days",
        "Monitor Agent: watches for stalled deals, missed follow-ups, churn signals",
      ],
      tools: ["LangGraph", "GPT-4o", "HubSpot", "n8n", "Supabase"],
      result: "Near-instant response. Onboarding completion: 62% → 94%. Zero leads lost between stages.",
    },
    {
      title: "AI Research & Report Generation Agent",
      problem: "Strategy and research teams spend 15+ hours manually compiling market analysis, competitive intel, and client reports — often delivered too late to act on.",
      bullets: [
        "Research Agent: searches web, databases, and internal docs for relevant data",
        "Analysis Agent: synthesizes findings, identifies patterns and contradictions",
        "Writer Agent: produces structured, narrative reports with section headings",
        "Validator Agent: fact-checks all claims against source material before delivery",
      ],
      tools: ["OpenAI o1/o3", "Claude", "LangChain", "Pinecone", "n8n"],
      result: "Report generation: 15 hours → 2 hours (87% reduction). Source-cited, fact-checked output.",
    },
    {
      title: "AI Customer Lifecycle Manager",
      problem: "Customer success, support, billing, and retention run as separate silos — no system tracks the full customer journey or acts on signals early enough.",
      bullets: [
        "Intake Agent: classifies requests, determines routing and urgency",
        "Support Agent: resolves Tier-1 queries via RAG knowledge retrieval",
        "Success Agent: monitors usage, triggers retention playbooks from predictive analytics",
        "Billing Agent: handles subscription changes and invoicing",
        "Orchestrator Agent: coordinates all agents, maintains unified customer state",
      ],
      tools: ["CrewAI", "GPT-4o", "Salesforce", "Pinecone", "n8n"],
      result: "Ticket resolution +60%. Churn prediction 85% accurate. Retention interventions: 3 weeks earlier.",
    },
    {
      title: "Autonomous Compliance & Audit Agent",
      problem: "Legal and compliance teams spend 100+ hours/month on manual contract review, regulatory monitoring, and audit preparation.",
      bullets: [
        "Document Review Agent: scans contracts for compliance violations and risk clauses",
        "Regulatory Monitor Agent: tracks regulatory updates, maps to affected processes",
        "Audit Preparation Agent: compiles evidence, generates audit-ready reports",
        "Alert Agent: flags high-risk findings immediately via Slack and email",
      ],
      tools: ["Claude", "LangGraph", "Weaviate", "n8n", "Supabase"],
      result: "Review time: -70%. Regulatory change detection: real-time. Zero audit findings post-deployment.",
    },
    {
      title: "Healthcare Patient Flow System",
      problem: "Patient intake, scheduling, follow-up, and documentation handled by separate staff — 65% of admin time spent on coordination, not care.",
      bullets: [
        "Intake Agent: registration and insurance verification",
        "Scheduling Agent: appointment booking, reminders, conflict management",
        "Follow-Up Agent: post-visit instructions, recovery monitoring",
        "Documentation Agent: visit summaries, medical record updates — HIPAA-compliant",
      ],
      tools: ["GPT-4o mini", "LangGraph", "n8n", "HIPAA infrastructure"],
      result: "Admin overhead: -65%. Intake to appointment: 72 hours → 8 hours.",
    },
  ],
  comparison: {
    title: "Single-Agent vs Multi-Agent Systems",
    vsLabel: "Multi-Agent (AGIX)",
    rows: [
      { dimension: "Architecture", traditional: "One agent handles entire workflow", agix: "Multiple specialized agents, each with a distinct role" },
      { dimension: "Complexity handled", traditional: "Simple to moderate tasks", agix: "High — multi-step, cross-system, exception-heavy" },
      { dimension: "Agent roles", traditional: "Generalist — does everything", agix: "Specialists: Planner, Executor, Validator, Monitor, Escalation" },
      { dimension: "Coordination", traditional: "None needed", agix: "Agent-to-agent communication + shared state" },
      { dimension: "Failure handling", traditional: "Single point of failure", agix: "Validator/Monitor agents catch and correct failures" },
      { dimension: "Scalability", traditional: "Limited by single context window", agix: "Scales by adding specialist agents" },
      { dimension: "Best for", traditional: "Bounded tasks with 1–3 tools", agix: "End-to-end business operations, revenue ops, compliance" },
      { dimension: "AGIX pricing", traditional: "$20K–$35K", agix: "$40K–$150K+" },
    ],
  },
  techStack: ["LangGraph", "CrewAI", "LangChain", "AutoGen", "n8n", "GPT-4o", "Claude", "Pinecone", "Supabase", "HubSpot", "Salesforce", "Twilio", "Vapi", "GoHighLevel"],
  pricing: [
    { tier: "Single Agent Build", range: "$7,500–$9,000", description: "One autonomous agent for a focused, high-impact workflow. Timeline: 4–6 weeks." },
    { tier: "Multi-Agent System", range: "$13,000–$15,000", description: "2–3 coordinated specialist agents for complex, cross-system operations.", highlight: true },
    { tier: "Agentic AI Platform", range: "$22,000–$25,000", description: "Full multi-agent architecture with memory, monitoring, analytics, and team orchestration." },
  ],
  faqSection: "agentic-ai",
  keywords: [
    "autonomous AI agents", "multi-agent systems", "AI orchestration", "agentic AI architecture",
    "LangGraph", "CrewAI", "AutoGen", "agent loops", "AI planning", "tool-using agents",
    "AI operations", "autonomous workflows", "LLM agents", "multi-step AI", "AI decision-making",
    "agent-to-agent communication", "AI goal pursuit", "closed-loop AI execution",
  ],
  relatedBlogs: [
    { title: "Multi-Agent AI: Architecture Patterns for Production", href: "/insights/multi-agent-ai-architecture-patterns", description: "Comparing orchestration frameworks: LangGraph vs CrewAI vs AutoGen in production workloads.", tag: "Architecture" },
    { title: "AI Agent Loops: Plan → Execute → Observe → Refine", href: "/insights/ai-agent-loop-explained", description: "Deep-dive into the closed-loop execution cycle powering autonomous AI systems.", tag: "Technical" },
    { title: "When Agentic AI Fails: 7 Common Architecture Mistakes", href: "/insights/agentic-ai-common-mistakes", description: "The architectural choices that cause production agentic systems to break — and how to avoid them.", tag: "Best Practices" },
  ],
};

// ─── 2. AI Automation ─────────────────────────────────────────────────────────
const aiAutomation: ServiceData = {
  slug: "ai-automation",
  color: "orange",
  colorHex: "#ea580c",
  icon: "Workflow",
  heroTag: "Intelligent Workflow & Process Automation",
  h1: "AI Automation Services: Intelligent Workflow, Process & Document Automation",
  metaTitle: "AI Automation Services | Intelligent Workflow, Process & Document Automation | AGIX Technologies",
  metaDescription: "AGIX delivers AI automation services — intelligent workflow, document, and process automation using GPT-4o, n8n, Make & custom AI. Reduce ops costs 40–70%. ROI in 3–6 months. From $6K.",
  directAnswer: "AI automation services use machine learning, NLP, and intelligent workflow orchestration to replace manual, repetitive business operations with self-operating systems — handling document processing, lead routing, email management, CRM orchestration, scheduling, and compliance reporting without human intervention.",
  originalQuote: "RPA automates what you click. AI automation automates how your business thinks.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "40–70%", label: "Ops Cost Reduction Achieved" },
    { value: "3–6 mo", label: "Average ROI Timeline" },
    { value: "80+", label: "Workflows Automated" },
    { value: "24h", label: "First Response Guaranteed" },
  ],
  stats: [
    { value: "$18B", label: "IPA Market 2025", source: "TBRC" },
    { value: "40–70%", label: "Ops Cost Reduction", source: "AGIX client avg" },
    { value: "3–6mo", label: "Avg ROI Timeline", source: "AGIX client avg" },
    { value: "40%", label: "Enterprise apps with AI agents by 2026", source: "Gartner" },
  ],
  agixValue: {
    headline: "AGIX Builds Your AI Automation from Discovery to Go-Live",
    body: "We map your most expensive manual processes, design the AI intelligence layer, connect your systems, and deploy workflows that run without human intervention. Every automation we build is tested against real edge cases before it touches your operations.",
    points: [
      { title: "Process Discovery", description: "We start by quantifying the cost of manual work — identifying the highest-ROI processes to automate first, not just the easiest ones." },
      { title: "Intelligence Layer Design", description: "AGIX builds the AI classification, routing, and decision layer that makes automation context-aware — handling edge cases that rules-based tools can't." },
      { title: "System Integration", description: "We connect your CRM, ERP, email, calendar, and communication tools — your automation operates where your data already lives." },
      { title: "Delivered, Not Managed", description: "You own the automation infrastructure. We train your team and hand over full documentation. No ongoing management fees from AGIX." },
    ],
  },
  maturity: {
    title: "From Manual → Rule-Based → AI Automation",
    description: "Most businesses are stuck at Level 2. AI automation takes you to Level 3 — where systems understand context and decide, not just execute.",
    rows: [
      { level: "Level 1: Manual", what: "Human-operated processes", does: "Staff perform repetitive tasks", limitation: "Doesn't scale. Error-prone. Expensive." },
      { level: "Level 2: Rule-Based (RPA)", what: "Screen mimicry, fixed logic", does: "Triggers actions on fixed conditions", limitation: "Breaks on UI changes. No edge-case handling." },
      { level: "Level 3: AI Automation", what: "Context-aware intelligent workflows", does: "Understands intent, handles exceptions, continuously improves", limitation: "The AGIX layer — genuine intelligence", highlight: true },
    ],
  },
  pipeline: {
    title: "How AI Automation Works: 5-Layer Architecture",
    description: "Every AGIX automation system follows a 5-layer architecture that creates a self-improving automation engine.",
    steps: [
      { num: "01", title: "Workflow Mapping & Discovery", description: "Map repetitive tasks, bottlenecks, and high-impact areas. Calculate cost-of-manual-work per process." },
      { num: "02", title: "Intelligence Layer", description: "AI models for classification, routing, and decision-making with confidence thresholds for human escalation.", tools: ["GPT-4o", "Claude", "Gemini"] },
      { num: "03", title: "Orchestration Layer", description: "Connect APIs across business systems — CRMs, calendars, communication tools, databases.", tools: ["n8n", "Make", "GoHighLevel", "HubSpot"] },
      { num: "04", title: "Execution Layer", description: "Actions fire automatically — CRM updates, emails sent, tickets created, appointments booked." },
      { num: "05", title: "Learning & Improvement", description: "Outcomes feed back to improve classification and decision accuracy over time.", tools: ["Supabase", "PostgreSQL"] },
    ],
  },
  components: {
    title: "What You Can Automate with AI",
    description: "The most common automation targets across AGIX engagements — if a skilled employee does the same process 20+ times per day, it's a candidate.",
    items: [
      { num: "01", title: "Lead & Sales Operations", description: "Lead capture → AI scoring → qualification → routing → follow-up → CRM updates.", tools: ["GoHighLevel", "HubSpot", "n8n"] },
      { num: "02", title: "Document Processing", description: "PDF/email intake → OCR extraction → validation → CRM/ERP entry → archival.", tools: ["GPT-4o Vision", "n8n"] },
      { num: "03", title: "Customer Support", description: "Ticket intake → intent classification → RAG knowledge retrieval → auto-response → escalation.", tools: ["Zendesk", "Intercom", "Pinecone"] },
      { num: "04", title: "Email & Communication", description: "Intent reading → categorization → draft response → workflow triggers → follow-ups.", tools: ["Gmail API", "GPT-4o", "Make"] },
      { num: "05", title: "Finance & Compliance", description: "Invoice processing → PO matching → approval routing → payment → reconciliation with audit trails.", tools: ["n8n", "Salesforce"] },
    ],
  },
  examples: [
    {
      title: "AI Lead Qualification & Routing",
      problem: "Sales team manually qualifies inbound leads — response times measured in hours, 60% of leads lost to slow follow-up.",
      bullets: [
        "Captures leads from web, email, phone, and ads",
        "AI scores on firmographic + behavioral signals",
        "Routes qualified leads to best-matched rep instantly",
        "Triggers personalized follow-up sequences",
        "Updates CRM in real time — zero manual entry",
      ],
      tools: ["GoHighLevel", "n8n", "GPT-4o", "Twilio"],
      result: "Response time: hours → <3 min. Lead conversion: 2–4x. CRM data quality: 95%+.",
    },
    {
      title: "AI Email Automation",
      problem: "Team members spend 2–4 hours per day on repetitive email management — reading, categorizing, responding, and following up manually.",
      bullets: [
        "Reads incoming emails using NLP intent classification",
        "Categorizes by type: inquiry, support, complaint, billing, spam",
        "Extracts key data: names, dates, amounts, action items",
        "Generates context-aware draft responses automatically",
        "Triggers workflows per category; escalates complex messages to humans",
      ],
      tools: ["Gmail API", "GPT-4o", "Make", "HubSpot"],
      result: "2–4 hours/day eliminated per team member. Response consistency: +80%.",
    },
    {
      title: "AI Document Processing Pipeline",
      problem: "Finance team manually enters data from invoices, contracts, and applications — 8% error rate, 3-day average processing time.",
      bullets: [
        "Ingests PDFs, scans, images, email attachments",
        "Classifies type: invoice, contract, application, ID",
        "Extracts structured data using OCR + AI Vision",
        "Validates against business rules automatically",
        "Updates CRM/ERP — no human touch required",
      ],
      tools: ["GPT-4o Vision", "n8n", "Salesforce", "Claude"],
      result: "Processing time: -70%. Error rate: 8% → <1%. Capacity: 3–5x.",
    },
    {
      title: "AI Customer Support Agent",
      problem: "Support team handles 800 repetitive queries per day — 70% are tier-1 questions resolvable with the right knowledge, but staff spend hours searching for answers.",
      bullets: [
        "Handles queries via chat, email, or voice channels",
        "Retrieves answers from RAG knowledge base with source citations",
        "Responds with context-aware, accurate information",
        "Escalates complex cases with full context summary pre-loaded",
        "Logs all interactions in CRM automatically",
      ],
      tools: ["GPT-4o", "Pinecone", "n8n", "HubSpot"],
      result: "70–80% resolution without human. Average response: 4 hours → 2 minutes.",
    },
  ],
  comparison: {
    title: "AI Automation vs RPA vs Traditional",
    vsLabel: "AI Automation (AGIX)",
    rows: [
      { dimension: "Logic type", traditional: "Fixed rules / screen mimicry", agix: "Context-aware decision intelligence" },
      { dimension: "Data handling", traditional: "Structured data only", agix: "Structured + unstructured (emails, PDFs, voice)" },
      { dimension: "Edge cases", traditional: "Breaks or escalates all", agix: "Handles intelligently, escalates only genuine judgment calls" },
      { dimension: "Learning", traditional: "None — static rules", agix: "Continuous learning from patterns" },
      { dimension: "Maintenance", traditional: "Very high — breaks on UI changes", agix: "Low — adapts to changes" },
      { dimension: "ROI timeline", traditional: "6–18 months", agix: "3–6 months (AGIX client average)" },
    ],
  },
  techStack: ["n8n", "Make", "GPT-4o", "Claude", "Gemini", "GoHighLevel", "HubSpot", "Salesforce", "Twilio", "Gmail API", "Pinecone", "Qdrant", "Supabase", "FastAPI", "Zapier"],
  pricing: [
    { tier: "Single Workflow", range: "$5,000–$7,000", description: "One intelligent automation — lead routing, document processing, or email management. Timeline: 2–4 weeks." },
    { tier: "Process Program", range: "$10,000–$13,000", description: "Multi-workflow automation covering an entire business function end-to-end.", highlight: true },
    { tier: "Operations Transformation", range: "$18,000–$22,000", description: "Company-wide AI automation across sales, ops, support, and finance with analytics dashboard." },
  ],
  faqSection: "ai-automation",
  keywords: [
    "AI workflow automation", "intelligent process automation", "IPA", "RPA alternative",
    "document automation", "n8n automation", "business process automation", "AI-powered workflows",
    "email automation AI", "AI document processing", "lead automation", "no-code AI automation",
    "CRM automation", "AI scheduling", "process re-engineering", "GPT-4o automation",
    "AI operations", "workflow orchestration",
  ],
  relatedBlogs: [
    { title: "AI Automation vs RPA: What's the Real Difference in 2026?", href: "/insights/ai-automation-vs-rpa-2026", description: "Why RPA fails at edge cases and how AI automation handles them differently — with real examples.", tag: "Comparison" },
    { title: "ROI of AI Automation: What 50 Projects Taught Us", href: "/insights/ai-automation-roi-analysis", description: "Real data from 50 AI automation projects: where value actually comes from and what to avoid.", tag: "ROI" },
    { title: "n8n vs Make vs Zapier: Which AI Automation Platform for Enterprise?", href: "/insights/n8n-vs-make-vs-zapier-enterprise", description: "Head-to-head comparison of the top workflow orchestration platforms for production AI use cases.", tag: "Guide" },
  ],
};

// ─── 3. AI Computer Vision ────────────────────────────────────────────────────
const aiComputerVision: ServiceData = {
  slug: "ai-computer-vision",
  color: "cyan",
  colorHex: "#0891b2",
  icon: "Eye",
  heroTag: "Object Detection, Visual Inspection & Image Intelligence",
  h1: "AI Computer Vision Solutions: From Pixels to Decisions",
  metaTitle: "AI Computer Vision Solutions | Object Detection, Inspection AI & Visual Intelligence | AGIX Technologies",
  metaDescription: "AGIX Technologies builds production-grade computer vision systems for defect detection, medical imaging, OCR, video analytics & visual automation. Market: $23B in 2025, 22% CAGR. 68% of manufacturers using AI inspection. From $30K.",
  directAnswer: "AI computer vision enables machines to interpret and analyze visual data from images, videos, cameras, and real-world environments to automate decisions and actions — detecting objects, recognizing patterns, tracking movement, reading text, identifying defects, and interpreting visual context to transform pixels into actionable intelligence.",
  originalQuote: "Computer vision is not about 'seeing.' It's about acting on what is seen. Most solutions stop at detection. AGIX designs all three layers: perception, understanding, and action.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "97.5%", label: "Detection Accuracy Achieved" },
    { value: "<2%", label: "False Positive Rate" },
    { value: "6–10 wks", label: "Time to Deployment" },
    { value: "24/7", label: "Continuous Vision Monitoring" },
  ],
  stats: [
    { value: "$63B", label: "Market by 2030", source: "MarketsandMarkets" },
    { value: "22%", label: "CAGR Growth", source: "MarketsandMarkets" },
    { value: "68%", label: "Manufacturers using AI inspection", source: "Global Growth Insights" },
    { value: "97.5%", label: "Defect detection accuracy", source: "AGIX avg" },
  ],
  agixValue: {
    headline: "AGIX Builds Vision Systems That See, Understand, and Act",
    body: "We don't stop at detection. Every AGIX computer vision system is built with a decision and action layer — defects trigger rejection workflows, anomalies fire alerts, documents route to CRMs. We design all three layers: perception, understanding, and action.",
    points: [
      { title: "Custom Model Training", description: "We train models on your specific products, defects, and environments — not generic pre-trained classifiers applied without adaptation." },
      { title: "Edge + Cloud Deployment", description: "AGIX deploys on-premise to NVIDIA Jetson hardware or cloud-hosted, based on your latency requirements and connectivity constraints." },
      { title: "Full Decision Pipeline", description: "Detection is just step one. We build the downstream automation that converts every visual insight into a business action — automatically." },
      { title: "Continuous Improvement", description: "Models improve over time as new data accumulates. AGIX designs the retraining pipeline so accuracy grows with your production volume." },
    ],
  },
  maturity: {
    title: "From Visual Data → Recognition → Interpretation → Action",
    description: "Most companies stop at Level 2. AGIX builds to Level 4 — where vision triggers decisions and operations.",
    rows: [
      { level: "Level 1: Visual Input", what: "Cameras, images, video streams", does: "Captures raw visual data", limitation: "Raw pixels with no meaning" },
      { level: "Level 2: Recognition", what: "AI identifies objects and patterns", does: '"There is a crack on this product"', limitation: "Detection without context" },
      { level: "Level 3: Interpretation", what: "AI understands context and meaning", does: '"This crack exceeds the 2mm tolerance"', limitation: "Insight without action" },
      { level: "Level 4: Action (AGIX)", what: "System triggers alerts and workflows", does: "Reject product, alert QA, log defect, update batch", limitation: "This is where value is created", highlight: true },
    ],
  },
  pipeline: {
    title: "How AI Computer Vision Works: The AGIX Vision Pipeline",
    description: "From raw pixels to automated decisions — the 5-stage pipeline every AGIX vision system follows.",
    steps: [
      { num: "01", title: "Image / Video Capture", description: "Industrial cameras, CCTV, smartphone cameras, medical imaging devices, drone feeds, uploaded images, scanned documents." },
      { num: "02", title: "Preprocessing", description: "Resizing, normalization, noise filtering, color correction, augmentation — consistent input quality regardless of environment." },
      { num: "03", title: "Feature Extraction", description: "Deep learning CNNs identify edges, shapes, textures, objects, and spatial relationships from raw pixel data." },
      { num: "04", title: "Model Inference", description: "Trained models classify, detect, segment, or track in real-time or batch.", tools: ["YOLOv8/v9", "TensorFlow", "PyTorch", "NVIDIA TensorRT"] },
      { num: "05", title: "Decision & Action Layer", description: "Outputs trigger alerts, actions, workflows. Defect → reject. Anomaly → alert. Document → extract to CRM.", tools: ["n8n", "FastAPI", "NVIDIA Jetson"] },
    ],
  },
  components: {
    title: "Core Computer Vision Capabilities",
    description: "Production capabilities deployed across manufacturing, healthcare, retail, logistics, and security.",
    items: [
      { num: "01", title: "Object Detection", description: "Locates and identifies objects in images/video in real time. Product defect detection, people counting, vehicle tracking.", tools: ["YOLOv8/v9", "Ultralytics"] },
      { num: "02", title: "OCR (Text Extraction)", description: "Reads text from images, documents, screens — converts invoices, contracts, and forms into structured data.", tools: ["PaddleOCR", "GPT-4o Vision", "Tesseract"] },
      { num: "03", title: "Image Classification", description: "Categorizes entire images into classes. Product sorting, document classification, medical scan categorization.", tools: ["TensorFlow", "PyTorch"] },
      { num: "04", title: "Semantic Segmentation", description: "Pixel-level image understanding. Medical imaging, autonomous navigation, land use mapping.", tools: ["U-Net", "SAM", "Roboflow"] },
      { num: "05", title: "Motion Tracking", description: "Analyzes movement patterns across video frames. Security surveillance, warehouse monitoring, sports analytics.", tools: ["OpenCV", "MediaPipe"] },
    ],
  },
  examples: [
    {
      title: "AI Visual Inspection for Manufacturing",
      problem: "Manufacturing line relies on human inspectors who miss micro-defects, fatigue during long shifts, and can't keep pace with production speed.",
      bullets: [
        "High-speed cameras capture every product on the line",
        "AI detects surface defects, dimensional errors, assembly mistakes in real time",
        "Defective units auto-rejected via automation workflow; production line continues without pause",
        "Defect data logged with images for root-cause analysis",
        "Dashboard shows defect trends, categories, and batch-level quality metrics",
      ],
      tools: ["YOLOv8", "NVIDIA Jetson", "TensorRT", "OpenCV", "FastAPI", "n8n"],
      result: "Detection: 97.5% (vs 82% human). Speed: 500/min. Downtime -40%. False positives <2%.",
    },
    {
      title: "Retail Shelf Monitoring & Inventory Intelligence",
      problem: "Store managers manually walk aisles to check stock — out-of-stocks discovered hours late, resulting in lost sales and planogram violations.",
      bullets: [
        "AI cameras detect out-of-stock products, misplaced items, planogram violations",
        "Triggers restocking alerts to warehouse staff automatically",
        "Tracks customer movement patterns and dwell time by section",
        "Revenue impact tied directly to shelf compliance metrics",
      ],
      tools: ["YOLOv9", "TensorFlow", "AWS Rekognition", "n8n"],
      result: "Out-of-stock detection: 15 min vs 4 hrs manual. Shelf compliance +35%. Revenue +5–8%.",
    },
    {
      title: "Medical Image Analysis",
      problem: "Radiology teams spend 8+ minutes reviewing each scan — high workload leads to reader fatigue and missed findings on routine screening.",
      bullets: [
        "AI pre-screens X-rays, CT, MRI, and pathology slides",
        "Flags anomalies and priority cases for clinician review",
        "Reduces time-to-read on normal scans significantly",
        "Clinicians diagnose — AI provides decision support, not replacement",
      ],
      tools: ["PyTorch", "Azure Computer Vision", "Roboflow"],
      result: "Sensitivity: 94%. Radiologist workload -30%. Scan review: 8 min → 3 min.",
    },
    {
      title: "Document OCR & Data Extraction Pipeline",
      problem: "Operations team manually keys data from scanned invoices, contracts, and handwritten forms — slow, error-prone, and unscalable.",
      bullets: [
        "Ingests scanned forms, invoices, handwritten notes, and photo documents",
        "Extracts structured data fields with 96% accuracy",
        "Routes extracted data directly to CRM, ERP, and RAG knowledge systems",
        "Eliminates manual data entry for 80% of document types",
      ],
      tools: ["PaddleOCR", "GPT-4o Vision", "n8n", "Salesforce", "HubSpot"],
      result: "Processing time -75%. Accuracy: 96%. Manual entry eliminated for 80% of doc types.",
    },
    {
      title: "Security & Surveillance Intelligence",
      problem: "Security teams monitor dozens of camera feeds manually — delayed detection, high false-alarm rates, and no documentation of incidents.",
      bullets: [
        "Real-time video analytics across multiple camera feeds simultaneously",
        "Detects unauthorized access, suspicious behavior, and perimeter breaches",
        "Annotated alerts sent immediately with timestamped image evidence",
        "False alarm filtering reduces security fatigue by 60%",
      ],
      tools: ["YOLOv8", "NVIDIA Jetson", "OpenCV", "FastAPI", "Slack"],
      result: "False alarms -60%. Average response time: 45 seconds. 24/7 without additional staff.",
    },
  ],
  comparison: {
    title: "AI Computer Vision vs Manual Inspection",
    vsLabel: "AI Computer Vision (AGIX)",
    rows: [
      { dimension: "Speed", traditional: "1–5 items/minute", agix: "100–1,000+ items/minute" },
      { dimension: "Consistency", traditional: "Varies by inspector, fatigue, shift", agix: "100% consistent, 24/7/365" },
      { dimension: "Accuracy", traditional: "80–90% trained humans", agix: "95–99%+ trained models" },
      { dimension: "Micro-defect detection", traditional: "Often invisible to human eye", agix: "Sub-millimeter level detection" },
      { dimension: "Scalability", traditional: "Linear — more inspectors = more cost", agix: "Non-linear — same system handles 10x volume" },
      { dimension: "Cost at scale", traditional: "Increases linearly with volume", agix: "Decreases per unit as volume grows" },
      { dimension: "Documentation", traditional: "Manual logs", agix: "Automated defect logs with image evidence" },
    ],
  },
  techStack: ["YOLOv8/v9", "OpenCV", "TensorFlow", "PyTorch", "NVIDIA Jetson", "TensorRT", "Roboflow", "PaddleOCR", "GPT-4o Vision", "FastAPI", "n8n", "AWS Rekognition", "Azure Computer Vision"],
  pricing: [
    { tier: "Single Vision System", range: "$6,500–$9,000", description: "One computer vision application — defect detection, OCR pipeline, or shelf monitoring." },
    { tier: "Multi-System Platform", range: "$13,000–$15,000", description: "Multi-camera or multi-use-case vision deployment with analytics dashboard.", highlight: true },
    { tier: "Enterprise Vision Suite", range: "$21,000–$25,000", description: "Full vision infrastructure across facilities with edge+cloud hybrid and continuous retraining." },
  ],
  faqSection: "computer-vision",
  keywords: [
    "AI computer vision", "object detection", "visual inspection AI", "image recognition",
    "YOLOv8", "YOLOv9", "defect detection AI", "OCR AI", "video analytics AI",
    "machine vision", "industrial AI inspection", "medical imaging AI", "semantic segmentation",
    "real-time video AI", "NVIDIA Jetson", "deep learning vision", "image classification",
    "computer vision pipeline", "visual quality control",
  ],
  relatedBlogs: [
    { title: "YOLOv8 vs YOLOv9 for Industrial Inspection: Benchmark Results", href: "/insights/yolov8-vs-yolov9-industrial-inspection", description: "Practical accuracy and speed benchmarks for manufacturing and quality control use cases.", tag: "Technical" },
    { title: "Building a Production Computer Vision Pipeline: End-to-End Guide", href: "/insights/computer-vision-pipeline-production-guide", description: "From camera selection to decision layer — how AGIX designs production-grade vision systems.", tag: "Guide" },
    { title: "AI Visual Inspection vs Human Inspection: Real Factory Data", href: "/insights/ai-visual-inspection-vs-human-factory-data", description: "97.5% vs 82%: real accuracy, speed, and cost comparisons from manufacturing deployments.", tag: "Case Study" },
  ],
};

// ─── 4. AI Predictive Analytics ───────────────────────────────────────────────
const aiPredictiveAnalytics: ServiceData = {
  slug: "ai-predictive-analytics",
  color: "blue",
  colorHex: "#2563eb",
  icon: "TrendingUp",
  heroTag: "Forecasting, Churn Prediction & Decision Intelligence",
  h1: "AI Predictive Analytics: Predict What Happens Next — Not What Already Happened",
  metaTitle: "AI Predictive Analytics | Forecasting, Churn Prediction & Decision Intelligence | AGIX Technologies",
  metaDescription: "AGIX Technologies builds AI predictive analytics systems that forecast outcomes, detect risks, and trigger automated decisions — not just dashboards. Market: $22B in 2025, 28% CAGR. Average 38% efficiency improvement. From $25K.",
  directAnswer: "AI predictive analytics uses machine learning and statistical models to analyze historical data and forecast future outcomes — enabling businesses to anticipate events, customer behaviors, risks, and demand before they happen. Unlike traditional analytics that explains what already happened, predictive analytics answers: what is likely to happen next — and what should we do about it?",
  originalQuote: "This is not BI. This is not dashboards. This is AI-driven decision intelligence designed for real business stakes.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "85%+", label: "Model Accuracy Delivered" },
    { value: "38%", label: "Avg Efficiency Improvement" },
    { value: "3 wks", label: "Earlier Detection Window" },
    { value: "100%", label: "Model Ownership — Yours" },
  ],
  stats: [
    { value: "$82B", label: "Market by 2030", source: "Grand View Research" },
    { value: "28%", label: "CAGR Growth", source: "Grand View Research" },
    { value: "38%", label: "Avg efficiency improvement", source: "Reanin 2025" },
    { value: "95%", label: "Companies using predictive AI in marketing", source: "DemandSage" },
  ],
  agixValue: {
    headline: "AGIX Builds Models That Predict — and Then Act",
    body: "We don't deliver dashboards. AGIX builds predictive systems where probability scores trigger actual business decisions. Churn risk automatically fires retention workflows. Demand spikes automatically generate inventory orders. The intelligence does something.",
    points: [
      { title: "Feature Engineering That Works", description: "We identify the data signals that actually predict your outcome — not just the obvious ones. Signal selection is what drives real accuracy." },
      { title: "Model Selection by Use Case", description: "Different prediction tasks need different model architectures. AGIX selects and validates the right approach for your specific data and business goal." },
      { title: "Decision Layer Integration", description: "Prediction outputs connect directly to your CRM, ops system, or communication tool — predictions that trigger actions, not just display them." },
      { title: "Model You Own Forever", description: "Full model code, training pipeline, and documentation delivered to you. Run it yourself or engage AGIX for ongoing retraining — your choice." },
    ],
  },
  maturity: {
    title: "From Data → Insights → Predictions → Decisions",
    description: "Most companies stop at Level 2. AGIX Technologies helps you reach Level 4 — where predictions trigger automated action.",
    rows: [
      { level: "Level 1: Data", what: "Raw operational data (CRM, ERP, logs)", does: "Stores information", limitation: "No interpretation" },
      { level: "Level 2: Insights", what: "Dashboards, reports, BI tools", does: "Explains what happened", limitation: "Backward-looking only" },
      { level: "Level 3: Predictions", what: "AI forecasts, probability scores", does: "Anticipates what will happen", limitation: "Insights without action" },
      { level: "Level 4: Decisions (AGIX)", what: "AI systems that trigger actions", does: "Acts on predictions in real time", limitation: "The AGIX layer", highlight: true },
    ],
  },
  pipeline: {
    title: "How AI Predictive Analytics Works: The Intelligence Pipeline",
    description: "The AGIX Predictive Intelligence Pipeline — from raw data to automated action.",
    steps: [
      { num: "01", title: "Data Collection & Preparation", description: "Historical data + real-time signals from CRM, ERP, logs, transactions, external sources. Cleaning, normalization, feature engineering." },
      { num: "02", title: "Pattern Detection", description: "AI identifies trends, correlations, anomalies, and hidden signals across variables — cross-system analysis spanning marketing, sales, ops, and finance." },
      { num: "03", title: "Model Training", description: "ML models learn from historical patterns, estimate probabilities, validate against held-out test data.", tools: ["scikit-learn", "XGBoost", "Prophet", "TensorFlow"] },
      { num: "04", title: "Prediction Generation", description: "Forecasts, risk scores, probability estimates, confidence intervals, scenario projections — updated continuously.", tools: ["Python", "BigQuery", "Snowflake", "AWS SageMaker"] },
      { num: "05", title: "Decision Layer (Most Important)", description: "Predictions trigger alerts, workflows, and automated actions. Churn risk → retention campaigns. Demand spikes → inventory orders.", tools: ["n8n", "HubSpot", "Salesforce"] },
    ],
  },
  components: {
    title: "Types of Predictive Models We Build",
    description: "Each model type serves a distinct prediction need. AGIX selects and combines based on your specific use case and data characteristics.",
    items: [
      { num: "01", title: "Classification Models", description: "Predicts categories: churn/no-churn, fraud/legit, lead/not-lead. Powers customer churn prediction, lead scoring, fraud detection.", tools: ["XGBoost", "scikit-learn"] },
      { num: "02", title: "Regression Models", description: "Predicts numerical outcomes: revenue, price, demand quantity. Powers revenue forecasting, pricing optimization.", tools: ["Python", "TensorFlow"] },
      { num: "03", title: "Time-Series Models", description: "Predicts trends over time — next week, month, quarter. Powers demand planning, inventory forecasting, financial projections.", tools: ["Prophet", "LSTM"] },
      { num: "04", title: "Anomaly Detection", description: "Identifies unusual patterns, outliers, deviations, spikes. Powers fraud detection, equipment failure prediction, security threats.", tools: ["Isolation Forest", "PyTorch"] },
      { num: "05", title: "Recommendation Engines", description: "Personalizes what customers see, buy, or receive. Powers product recommendations, content personalization, next-best-action.", tools: ["TensorFlow", "Databricks"] },
    ],
  },
  examples: [
    {
      title: "SaaS Customer Churn Prediction System",
      problem: "A SaaS company is losing customers but can't identify who will churn until after they cancel. Retention efforts are reactive — too late.",
      bullets: [
        "Analyzes usage, support, billing, and engagement signals",
        "Predicts churn probability with confidence scoring for every account",
        "Triggers automated retention workflows via n8n for at-risk accounts",
        "Alerts success team with recommended interventions",
        "Continuously retrains on actual churn outcomes — accuracy improves over time",
      ],
      tools: ["Python (scikit-learn, XGBoost)", "Snowflake", "HubSpot", "n8n", "Tableau"],
      result: "Accuracy: 85%. Interventions 3 weeks earlier. CLV +22%. Annual churn -30%.",
    },
    {
      title: "Demand & Inventory Forecasting",
      problem: "Retail company consistently overstocks some products and understocks others — manual forecasting fails when seasonality, promotions, or market conditions shift.",
      bullets: [
        "Analyzes sales, seasonality, promotions, weather, and market trends",
        "Generates SKU-level demand forecasts with confidence intervals",
        "Triggers automated reorder workflows when predicted demand exceeds thresholds",
        "Adjusts continuously as new data arrives",
      ],
      tools: ["Python (Prophet, XGBoost)", "BigQuery", "Looker", "n8n"],
      result: "Accuracy: 68% → 89%. Stockouts -45%. Overstock -35%.",
    },
    {
      title: "Healthcare Patient Risk Prediction",
      problem: "Clinical teams have no early-warning system for patient readmission or deterioration — interventions happen reactively after adverse events.",
      bullets: [
        "Predicts readmission risk, disease progression, and complications",
        "Risk scores updated in real time as new vitals and lab data arrive",
        "Flags high-risk patients for proactive clinical intervention",
        "HIPAA-compliant end-to-end — AI informs, clinicians decide",
      ],
      tools: ["Python (scikit-learn, TensorFlow)", "AWS SageMaker", "Supabase"],
      result: "Readmission prediction: 82%. Early interventions: 70% of high-risk patients. Readmission -25%.",
    },
    {
      title: "Financial Fraud Detection",
      problem: "Fraud team reviews transactions manually after payment — most fraud is discovered 48+ hours later, after losses are already incurred.",
      bullets: [
        "Real-time transaction scoring using behavioral analytics and anomaly detection",
        "Flags suspicious transactions in milliseconds, not hours",
        "Adaptive learning — model updates as fraud patterns evolve",
        "Automated holds triggered for high-confidence fraud signals",
      ],
      tools: ["Python (XGBoost, anomaly detection)", "Snowflake", "n8n", "Slack"],
      result: "Detection +65%. False positives -40%. Detection-to-action: 48 hours → <5 minutes.",
    },
    {
      title: "Revenue & Pipeline Forecasting",
      problem: "Sales leadership relies on rep-reported pipeline data for forecasting — end-of-quarter surprises are common, causing missed targets and investor credibility issues.",
      bullets: [
        "Probability-weighted revenue forecasts from CRM data + behavioral signals",
        "Weekly deviation alerts when forecast drifts from target",
        "Deal-level risk scoring surfaces which opportunities need attention",
        "Leadership acts on data, not gut feel",
      ],
      tools: ["Python (scikit-learn)", "Salesforce", "Power BI", "n8n"],
      result: "Accuracy: 70% → 88%. Quarter surprises eliminated. Revenue leakage -3–5%.",
    },
  ],
  comparison: {
    title: "Descriptive vs Predictive vs Prescriptive Analytics",
    vsLabel: "Predictive + Prescriptive (AGIX)",
    rows: [
      { dimension: "Question answered", traditional: "What happened?", agix: "What will happen — and what should we do?" },
      { dimension: "Time orientation", traditional: "Backward-looking", agix: "Forward-looking + action-triggering" },
      { dimension: "Output", traditional: "Charts and dashboards", agix: "Probability scores + automated workflows" },
      { dimension: "Action", traditional: "Human decides and acts", agix: "System triggers actions automatically" },
      { dimension: "Value", traditional: "Insight after the fact", agix: "Prevention and optimization in advance" },
      { dimension: "Starting price", traditional: "BI tools: $500/mo", agix: "From $25K (owned asset)" },
    ],
  },
  techStack: ["Python", "scikit-learn", "XGBoost", "Prophet", "TensorFlow", "PyTorch", "BigQuery", "Snowflake", "AWS SageMaker", "Azure ML", "Databricks", "Tableau", "Power BI", "n8n", "HubSpot"],
  pricing: [
    { tier: "Single Predictive Model", range: "$5,500–$8,000", description: "One ML model (churn, demand, fraud, or lead scoring) with decision triggers and dashboard." },
    { tier: "Intelligence Platform", range: "$11,000–$14,000", description: "2–4 interconnected models with unified analytics and automated workflow layer.", highlight: true },
    { tier: "Enterprise Analytics Suite", range: "$19,000–$23,000", description: "Company-wide predictive intelligence with real-time pipelines, retraining, and MLOps." },
  ],
  faqSection: "predictive-analytics",
  keywords: [
    "AI predictive analytics", "predictive modeling", "machine learning forecasting",
    "churn prediction AI", "demand forecasting AI", "customer churn model",
    "revenue forecasting AI", "fraud detection ML", "anomaly detection AI",
    "XGBoost predictive model", "time-series forecasting", "AI decision intelligence",
    "predictive maintenance", "recommendation engine", "lead scoring AI",
    "inventory forecasting AI", "risk scoring model", "AI BI beyond dashboards",
  ],
  relatedBlogs: [
    { title: "Churn Prediction Models: A Practical Guide for B2B SaaS", href: "/insights/churn-prediction-model-b2b-saas-guide", description: "How to build, train, and deploy a churn prediction model that actually improves retention.", tag: "Guide" },
    { title: "Predictive Analytics vs BI: Why Dashboards Are Not Enough", href: "/insights/predictive-analytics-vs-bi-dashboards", description: "The business case for moving from backward-looking reporting to forward-looking prediction.", tag: "Strategy" },
    { title: "Revenue Forecasting with AI: Real vs Rep-Reported Pipeline", href: "/insights/ai-revenue-forecasting-vs-rep-reported", description: "How AI-powered revenue intelligence eliminates end-of-quarter surprises using CRM + behavioral signals.", tag: "Case Study" },
  ],
};

// ─── 5. AI Voice Agents ───────────────────────────────────────────────────────
const aiVoiceAgents: ServiceData = {
  slug: "ai-voice-agents",
  color: "emerald",
  colorHex: "#059669",
  icon: "Phone",
  heroTag: "Phone Automation for Sales, Support & Scheduling",
  h1: "AI Voice Agents: Intelligent Phone Automation for Sales, Support & Scheduling",
  metaTitle: "AI Voice Agents | Phone Automation for Sales, Support & Scheduling | AGIX Technologies",
  metaDescription: "AGIX Technologies builds AI voice agents that answer calls, qualify leads, book appointments & resolve support queries 24/7. Powered by Vapi + Deepgram + GPT-4o. Voice AI costs $0.40/call vs $7–12 for humans. Free demo available.",
  directAnswer: "AI voice agents are AI-powered phone systems that conduct real-time, human-like conversations over the telephone — answering inbound calls, placing outbound calls, qualifying leads, booking appointments, resolving support queries, and executing business workflows automatically. Unlike IVR menus, AI voice agents use speech-to-text, large language models, and neural text-to-speech to hold multi-turn conversations and make decisions.",
  originalQuote: "Voice AI is not a feature — it's a channel. The most natural, most trusted way customers interact with businesses. AGIX builds voice agents that sound human, think intelligently, and act on every call.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "$0.40", label: "Per Call vs $7–12 Human Cost" },
    { value: "300ms", label: "Voice Response Latency" },
    { value: "85%", label: "Calls Resolved Without Human" },
    { value: "24/7", label: "Full Call Coverage" },
  ],
  stats: [
    { value: "$89B", label: "Voice AI market by 2028", source: "AI Voice Research" },
    { value: "67%", label: "Fortune 500 running production voice AI", source: "AI Voice Research" },
    { value: "$0.40", label: "Cost per call (vs $7–12 human)", source: "Teneo.ai" },
    { value: "331–391%", label: "3-year ROI", source: "Forrester/PolyAI" },
  ],
  agixValue: {
    headline: "AGIX Builds Voice Agents That Actually Work in Production",
    body: "We've deployed AI voice agents for healthcare, real estate, med spas, retail, and financial services. We know what breaks in production — and we engineer against it. Every AGIX voice agent is stress-tested on hundreds of real call scenarios before it answers a single customer call.",
    points: [
      { title: "Scenario-Based Prompt Engineering", description: "We map every caller type and situation, then engineer conversation flows that handle objections, silence, interruptions, and edge cases — before launch." },
      { title: "CRM & Calendar Integration", description: "Your voice agent updates HubSpot, Salesforce, or GoHighLevel in real time and books appointments into live calendars — not manual exports or CSVs." },
      { title: "Custom Voice & Brand Persona", description: "AGIX configures voice selection, tone, pacing, and brand personality to match your company — not a generic off-the-shelf bot voice." },
      { title: "Intelligent Human Escalation", description: "We design precise escalation logic: when confidence drops, when callers express frustration, or when legal or clinical content is detected — transfer to human." },
    ],
  },
  maturity: {
    title: "From IVR → Scripted Bots → AI Voice Agents",
    description: "The evolution of phone automation — understanding where traditional systems fail and where AI voice agents deliver.",
    rows: [
      { level: "Level 1: IVR Menus", what: "Press 1 for sales, press 2 for support", does: "Routes calls via keypress", limitation: "Rigid. Frustrating. High abandon rate." },
      { level: "Level 2: Scripted Bots", what: "Pre-programmed conversation flows", does: "Follows fixed decision trees", limitation: "Breaks on unexpected inputs. Feels robotic." },
      { level: "Level 3: AI Voice Agents", what: "LLM-powered natural conversation", does: "Understands intent, makes decisions, executes workflows", limitation: "Human-quality at 95% lower cost", highlight: true },
    ],
  },
  pipeline: {
    title: "How AI Voice Agents Work: Real-Time Pipeline",
    description: "The four-layer technology stack that powers every AGIX voice agent — all processing in under 300ms for natural conversation flow.",
    steps: [
      { num: "01", title: "Speech-to-Text (STT)", description: "Converts caller's spoken words into text in milliseconds — with accent handling and noise robustness.", tools: ["Deepgram"] },
      { num: "02", title: "Intent Understanding (LLM)", description: "Interprets caller intent, maintains conversation context, generates contextual responses, makes decisions.", tools: ["GPT-4o", "Claude", "Gemini"] },
      { num: "03", title: "Text-to-Speech (TTS)", description: "Converts AI response back into natural, human-sounding speech — sub-100ms latency for conversational rhythm.", tools: ["Cartesia Sonic 3", "ElevenLabs"] },
      { num: "04", title: "Orchestration & Integration", description: "Manages call routing, recording, CRM integration, calendar booking, and workflow triggers during the call.", tools: ["Vapi", "Twilio", "n8n", "GoHighLevel"] },
      { num: "05", title: "CRM Update & Follow-up", description: "After each call: logs summary, updates CRM, triggers workflows, sends SMS confirmations — fully automated.", tools: ["HubSpot", "Salesforce", "Calendly"] },
    ],
  },
  components: {
    title: "What AI Voice Agents Can Handle",
    description: "Inbound. Outbound. Multilingual. 24/7. The complete voice operation for any business.",
    items: [
      { num: "01", title: "Inbound Call Answering", description: "Answers instantly, qualifies intent, routes or resolves — zero hold time, infinite concurrency." },
      { num: "02", title: "Outbound Sales & Follow-up", description: "Calls prospects, delivers pitch, qualifies interest, books meetings — at scale without a dialing team." },
      { num: "03", title: "Appointment Scheduling", description: "Books, reschedules, confirms, sends reminders — syncs directly with calendar systems.", tools: ["Google Calendar", "Calendly", "Cal.com"] },
      { num: "04", title: "Lead Qualification", description: "Captures info, scores leads, routes to right rep, updates CRM — before a human ever gets involved." },
      { num: "05", title: "After-Hours Coverage", description: "Full service capability 24/7 without night shifts, overtime pay, or staffing constraints." },
    ],
  },
  examples: [
    {
      title: "AI Inbound Receptionist for Healthcare",
      problem: "Medical practice missing 40% of after-hours calls. Front-desk staff overwhelmed during peak hours. Patients wait 8+ minutes on hold.",
      bullets: [
        "Answers all inbound calls instantly — zero hold time, 24/7",
        "Books appointments directly into practice management system",
        "Verifies insurance eligibility through real-time lookups",
        "Sends SMS confirmations and automated reminders",
        "Escalates emergencies and complex clinical questions to staff — HIPAA-compliant",
      ],
      tools: ["Vapi", "Deepgram", "GPT-4o mini", "Twilio", "Google Calendar", "n8n"],
      result: "85% of calls resolved without human. Front-desk time freed 60%. No-shows -35%.",
    },
    {
      title: "Med Spa Appointment Booking Agent",
      problem: "Med spa misses 35% of after-hours booking calls and staff spend 70% of their day managing scheduling calls during business hours.",
      bullets: [
        "Answers after-hours calls with full booking capability",
        "Recommends services based on caller's stated concerns",
        "Books treatments directly into scheduling system",
        "Sends confirmation texts with pre-appointment instructions",
      ],
      tools: ["Vapi", "Cartesia Sonic 3", "GPT-4o mini", "n8n", "Calendly"],
      result: "Booking rate +40%. After-hours leads: 0% → 100% captured. Staff scheduling time -70%.",
    },
    {
      title: "AI Outbound Sales Agent for Real Estate",
      problem: "Real estate team has 500+ cold leads sitting in CRM with no capacity to call — each rep can make 40 calls/day manually.",
      bullets: [
        "Calls all leads within 5 minutes of inquiry submission",
        "Qualifies budget, timeline, and property preferences via natural conversation",
        "Books property viewings directly into agents' calendars",
        "Sends CRM update with qualification summary and recording",
      ],
      tools: ["Vapi", "Cartesia Sonic 3", "GPT-4o", "GoHighLevel", "Twilio"],
      result: "Response: 4 hours → 60 seconds. Conversion: 3.4x. Only pre-qualified leads reach agents.",
    },
    {
      title: "Customer Support with RAG Knowledge",
      problem: "Support center handles 800 calls/day — 70% are repetitive product questions that agents look up in the same documentation every time.",
      bullets: [
        "Retrieves answers from RAG knowledge base in real time during the call",
        "Provides source-verified responses — no hallucinated policy information",
        "Handles product questions, order status, account changes",
        "Escalates to human with full context when genuine complexity arises",
      ],
      tools: ["Vapi", "Deepgram", "GPT-4o", "Pinecone", "n8n"],
      result: "70–80% resolved without human. Average handle time: 8 min → 2 min. CSAT maintained.",
    },
    {
      title: "Collections & Payment Reminder Agent",
      problem: "Collections team manually dials 200+ accounts daily — low contact rates, inconsistent messaging, and compliance risk from human variation.",
      bullets: [
        "Outbound calls ranked by recovery probability from predictive model",
        "Negotiates payment arrangements within pre-approved parameters",
        "Records promise-to-pay commitments and triggers follow-up workflows",
        "Maintains compliance guardrails on every call automatically",
      ],
      tools: ["Vapi", "GPT-4o", "Twilio", "n8n", "Salesforce"],
      result: "Promise-to-pay +45%. Contact volume 3x. Compliance violations: near-zero.",
    },
  ],
  comparison: {
    title: "AI Voice Agents vs IVR vs Human Call Centers",
    vsLabel: "AI Voice Agents (AGIX)",
    rows: [
      { dimension: "Interaction style", traditional: 'Rigid menu trees / scripted flows', agix: "Natural AI conversation with full reasoning" },
      { dimension: "Wait time", traditional: "Queue-dependent (minutes to hours)", agix: "Instant — zero hold time, unlimited concurrency" },
      { dimension: "Cost per call", traditional: "$7–12 (human agents)", agix: "~$0.40 per call — 90–95% reduction" },
      { dimension: "Availability", traditional: "Business hours + overtime", agix: "24/7 with full capability" },
      { dimension: "CRM integration", traditional: "Manual post-call entry", agix: "Real-time automated updates during call" },
      { dimension: "Scalability", traditional: "Linear — more agents = more cost", agix: "Infinite concurrency — same cost" },
      { dimension: "Language", traditional: "Staff-dependent", agix: "8+ languages, auto-detected" },
    ],
  },
  techStack: ["Vapi", "Cartesia Sonic 3", "Deepgram", "Twilio", "GPT-4o", "GPT-4o mini", "Claude", "ElevenLabs", "n8n", "GoHighLevel", "HubSpot", "Google Calendar", "Calendly"],
  pricing: [
    { tier: "Single Voice Agent", range: "$5,000–$7,000", description: "One use case — inbound receptionist, outbound qualifier, or appointment scheduler. Timeline: 3–5 weeks." },
    { tier: "Full Voice Operation", range: "$9,500–$12,000", description: "Inbound + outbound agents with full CRM integration, custom voice persona, and analytics.", highlight: true },
    { tier: "Enterprise Voice Platform", range: "$16,000–$20,000", description: "Multi-language, multi-department voice AI with compliance infrastructure and reporting suite." },
  ],
  faqSection: "voice-agents",
  keywords: [
    "AI voice agents", "AI phone agent", "conversational voice AI", "Vapi",
    "AI receptionist", "outbound AI calling", "appointment booking AI",
    "speech-to-text AI", "neural text-to-speech", "IVR replacement",
    "AI call center", "voice AI ROI", "Deepgram", "ElevenLabs voice",
    "Cartesia Sonic", "AI phone automation", "natural language phone",
    "24/7 AI calling", "voice AI cost per call", "conversational IVR",
  ],
  relatedBlogs: [
    { title: "Vapi vs Bland AI vs Retell: Which Voice AI Platform Wins in 2026?", href: "/insights/vapi-vs-bland-ai-vs-retell-2026", description: "Head-to-head comparison of the leading voice AI infrastructure platforms across cost, quality, and features.", tag: "Comparison" },
    { title: "AI Voice Agent ROI: The Real Numbers Behind Phone Automation", href: "/insights/ai-voice-agent-roi-real-numbers", description: "Cost per call, containment rates, and actual ROI data from production voice AI deployments.", tag: "ROI" },
    { title: "Building an AI Outbound Sales Agent: Architecture & Prompting", href: "/insights/ai-outbound-sales-agent-architecture", description: "How to design a voice AI agent that qualifies leads, handles objections, and books appointments.", tag: "Technical" },
  ],
};

// ─── 6. Conversational AI Chatbots ────────────────────────────────────────────
const conversationalAI: ServiceData = {
  slug: "conversational-ai-chatbots",
  color: "sky",
  colorHex: "#0284c7",
  icon: "MessageSquare",
  heroTag: "Enterprise Support, Sales & Knowledge Bots",
  h1: "Conversational AI Chatbots: Enterprise-Grade Bots for Support, Sales & Knowledge",
  metaTitle: "Conversational AI Chatbots | Enterprise Support, Sales & Knowledge Bots | AGIX Technologies",
  metaDescription: "AGIX Technologies builds conversational AI chatbots that resolve 70–90% of support queries, qualify leads, and retrieve enterprise knowledge — across web, WhatsApp, Slack & more. Powered by GPT-4o + RAG. From $7K.",
  directAnswer: "Conversational AI chatbots are intelligent, LLM-powered systems that engage users in natural-language conversations across web, mobile, WhatsApp, Slack, and other channels — resolving support queries, qualifying leads, retrieving enterprise knowledge, and executing actions across business systems without human intervention.",
  originalQuote: "Rule-based chatbots answer what you've pre-programmed. Conversational AI understands what users actually need.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "70–90%", label: "Query Containment Rate" },
    { value: "45 days", label: "To First Measurable Results" },
    { value: "8+", label: "Channels Deployed Simultaneously" },
    { value: "275%", label: "3-Year ROI Benchmark" },
  ],
  stats: [
    { value: "$82B", label: "Conversational AI market by 2034", source: "Fortune Business Insights" },
    { value: "70–90%", label: "Support query containment rate", source: "Alhena AI" },
    { value: "82%", label: "Customers prefer AI over waiting", source: "Tidio" },
    { value: "275–380%", label: "3-year ROI", source: "Forrester" },
  ],
  agixValue: {
    headline: "AGIX Builds Chatbots That Resolve, Not Just Respond",
    body: "We design chatbots around outcomes — not conversation flows. A support bot should resolve the issue. A sales bot should qualify the lead. A knowledge bot should surface the right answer. AGIX builds toward the business result, not the conversation pattern.",
    points: [
      { title: "Intent-First Architecture", description: "We map every intent category in your use case before writing a single prompt — ensuring full coverage of real user needs before deployment." },
      { title: "RAG Knowledge Integration", description: "We connect your chatbot to your actual documentation, FAQs, policies, and product data for accurate, source-cited answers — not hallucinated ones." },
      { title: "Multi-Channel Deployment", description: "AGIX deploys the same AI brain across your website, WhatsApp, Slack, Teams, or SMS — consistent and reliable experience across every touchpoint." },
      { title: "Containment Optimization", description: "Post-launch, we analyze unresolved queries and retrain — pushing containment rates higher month over month as your bot learns your users." },
    ],
  },
  maturity: {
    title: "From FAQ Pages → Rule-Based Bots → Conversational AI",
    description: "The evolution of customer interaction — where most chatbots fail and where AGIX conversational AI delivers.",
    rows: [
      { level: "Level 1: FAQ Pages", what: "Static knowledge bases", does: "Answers pre-written questions if user finds them", limitation: "Passive. Users give up. Support ticket created." },
      { level: "Level 2: Rule-Based Bots", what: "Decision-tree chatbots", does: "Follows scripted flows, button menus", limitation: "Breaks on unexpected inputs. Frustrating UX." },
      { level: "Level 3: Conversational AI", what: "LLM + RAG + integrations", does: "Understands freeform language, retrieves live data, executes actions", limitation: "The AGIX standard", highlight: true },
    ],
  },
  pipeline: {
    title: "How Conversational AI Works: The AGIX Architecture",
    description: "Every AGIX chatbot combines five layers that create an AI system that understands, retrieves, acts, and learns.",
    steps: [
      { num: "01", title: "Natural Language Understanding", description: "LLM interprets user intent from freeform text — handling ambiguity, typos, slang, and complex multi-part questions.", tools: ["GPT-4o", "Claude", "Gemini"] },
      { num: "02", title: "Knowledge Retrieval (RAG)", description: "Retrieves real-time information from connected knowledge bases, CRM records, and documentation for accurate answers.", tools: ["Pinecone", "Qdrant", "LangChain"] },
      { num: "03", title: "Context Management", description: "Maintains full conversation history — remembers what was said earlier, avoids repetition, enables natural multi-turn dialogue." },
      { num: "04", title: "Action Execution", description: "Creates tickets, updates CRM, books appointments, triggers workflows — all within the conversation.", tools: ["n8n", "HubSpot", "Zendesk", "Calendly"] },
      { num: "05", title: "Escalation & Handoff", description: "Routes complex cases to human agents with full conversation context — warm handoff, not cold transfer." },
    ],
  },
  components: {
    title: "What Conversational AI Chatbots Can Do",
    description: "Deployed across every channel your customers use — from web chat to WhatsApp to Slack.",
    items: [
      { num: "01", title: "Customer Support", description: "FAQ resolution, order tracking, billing inquiries, account management, ticket creation, escalation — 24/7." },
      { num: "02", title: "Sales & Lead Generation", description: "Visitor engagement, lead qualification, product recommendations, meeting booking, CRM updates in real time." },
      { num: "03", title: "Internal Knowledge Assistant", description: "Employee Q&A on policies, SOPs, HR, IT helpdesk, onboarding guidance — powered by your internal knowledge base.", tools: ["RAG", "Confluence", "Notion"] },
      { num: "04", title: "E-Commerce Assistant", description: "Product search, order status, returns processing, cart recovery, personalized recommendations.", tools: ["Shopify", "WooCommerce"] },
      { num: "05", title: "Multi-Channel Deployment", description: "Same AI logic deployed across Web, WhatsApp, Facebook Messenger, Instagram, Slack, Teams, SMS simultaneously.", tools: ["WhatsApp API", "Slack", "Teams", "Meta"] },
    ],
  },
  examples: [
    {
      title: "AI Customer Support Chatbot",
      problem: "Support team handles 800 tickets/day — 70% are repetitive tier-1 questions that don't require human expertise.",
      bullets: [
        "Resolves tier-1 queries: order status, billing, account changes, FAQs, policies",
        "Retrieves real-time data from CRM and ticketing systems during conversation",
        "Creates tickets for unresolved issues with full conversation context",
        "Warm handoff to human agents with complete history",
        "Operates 24/7 across web chat and WhatsApp simultaneously",
      ],
      tools: ["GPT-4o", "Pinecone", "Zendesk", "n8n", "WhatsApp Business API"],
      result: "Support ticket volume -65% in 45 days. Resolution time -40%. CSAT maintained 4.6/5.",
    },
    {
      title: "AI Sales & Lead Qualification Chatbot",
      problem: "Website converting at 0.8% — 99.2% of visitors leave without engaging. After-hours leads (40% of traffic) receive no response until next day.",
      bullets: [
        "Engages visitors proactively based on behavior (time on page, pages viewed)",
        "Qualifies leads through conversational Q&A (budget, timeline, needs)",
        "Routes qualified prospects to sales reps via CRM assignment",
        "Books discovery calls directly into sales calendar",
        "Captures after-hours leads that would otherwise bounce",
      ],
      tools: ["GPT-4o mini", "HubSpot", "Calendly", "n8n", "Slack"],
      result: "Qualified leads 3.2x. After-hours lead capture: 0% → 100%. Sales team pre-qualified leads only.",
    },
  ],
  comparison: {
    title: "Conversational AI vs Rule-Based Chatbots",
    vsLabel: "Conversational AI (AGIX)",
    rows: [
      { dimension: "Interaction model", traditional: "Scripted decision trees, button menus", agix: "Natural language understanding + freeform input" },
      { dimension: "Handling variation", traditional: "Breaks on unexpected inputs", agix: "Handles ambiguity, typos, slang, complex phrasing" },
      { dimension: "Knowledge access", traditional: "Hardcoded FAQ list only", agix: "RAG-powered access to live knowledge bases" },
      { dimension: "Context memory", traditional: "None — each message is independent", agix: "Multi-turn context across entire conversation" },
      { dimension: "Actions & integrations", traditional: "Limited or none", agix: "CRM updates, ticket creation, booking, workflows" },
      { dimension: "Starting price", traditional: "$50–$500/mo SaaS tool", agix: "From $7K (owned system)" },
    ],
  },
  techStack: ["GPT-4o", "GPT-4o mini", "Claude", "Gemini", "Pinecone", "Qdrant", "LangChain", "n8n", "HubSpot", "Zendesk", "WhatsApp API", "Slack", "Teams", "Voiceflow", "Botpress"],
  pricing: [
    { tier: "Starter Chatbot", range: "$5,000–$6,500", description: "Single-channel AI chatbot (website or WhatsApp) for support containment or lead capture." },
    { tier: "Multi-Channel Assistant", range: "$8,500–$11,000", description: "Omnichannel conversational AI across 3+ channels with CRM integration and analytics.", highlight: true },
    { tier: "Enterprise Conversational AI", range: "$14,000–$18,000", description: "Full platform with custom intents, multi-language, escalation logic, and compliance controls." },
  ],
  faqSection: "chatbots",
  keywords: [
    "AI chatbot", "LLM chatbot", "RAG chatbot", "GPT-4o chatbot",
    "conversational AI platform", "enterprise chatbot", "customer support AI bot",
    "WhatsApp AI bot", "Slack bot AI", "lead generation chatbot",
    "AI knowledge base chatbot", "multi-channel AI bot", "chatbot ROI",
    "NLP chatbot", "AI customer service", "contextual chatbot",
    "intent recognition AI", "conversational commerce", "chatbot vs live chat",
  ],
  relatedBlogs: [
    { title: "RAG Chatbots vs Rule-Based Chatbots: What Your Business Actually Needs", href: "/insights/rag-chatbots-vs-rule-based-comparison", description: "The complete guide to choosing the right chatbot architecture for your support, sales, or knowledge use case.", tag: "Comparison" },
    { title: "Building an Enterprise Knowledge Bot: Key Architecture Decisions", href: "/insights/enterprise-knowledge-bot-architecture-decisions", description: "Vector databases, re-ranking, access control, and escalation — the 5 decisions that define quality.", tag: "Architecture" },
    { title: "Chatbot Containment Rates: What 70–90% Actually Means for Your Business", href: "/insights/chatbot-containment-rate-what-it-means", description: "How to set realistic expectations, measure real ROI, and avoid the metrics that mislead.", tag: "Strategy" },
  ],
};

// ─── 7. Custom AI Product Development ─────────────────────────────────────────
const customAIProduct: ServiceData = {
  slug: "custom-ai-product-development",
  color: "rose",
  colorHex: "#e11d48",
  icon: "Sparkles",
  heroTag: "AI SaaS MVP, AI Platforms & Product Engineering",
  h1: "Custom AI Product Development: From AI Idea to Market-Ready Product",
  metaTitle: "Custom AI Product Development | AI SaaS MVP, AI Platforms & Product Engineering | AGIX Technologies",
  metaDescription: "AGIX Technologies builds custom AI products — from AI SaaS MVPs ($12K) to scalable platforms ($60K+). Product-first, not model-first. 90+ AI projects shipped. Only 25% of AI initiatives deliver expected ROI — architecture is why.",
  directAnswer: "Custom AI product development is the process of designing and building AI-powered software products tailored to a company's specific workflows, data, and business objectives. Unlike off-the-shelf AI tools that solve generic problems, custom AI products are built around your use case, use your proprietary data, integrate deeply into your systems, and evolve as your business grows — creating a long-term strategic asset, not a temporary tool.",
  originalQuote: "Off-the-shelf AI is borrowed intelligence. Custom AI is owned intelligence. Tools give you short-term efficiency. Products give you long-term advantage.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "90+", label: "AI Products Shipped" },
    { value: "7 wks", label: "Average MVP Timeline" },
    { value: "$0.03", label: "Per Session at Scale" },
    { value: "100%", label: "IP Ownership — Yours" },
  ],
  stats: [
    { value: "$390B", label: "Global AI market 2025", source: "Grand View Research" },
    { value: "90+", label: "AI products shipped by AGIX", source: "AGIX" },
    { value: "25%", label: "AI initiatives that deliver expected ROI", source: "Industry data" },
    { value: "7 weeks", label: "Avg time to MVP for startups", source: "AGIX avg" },
  ],
  agixValue: {
    headline: "AGIX Is Your AI Product Engineering Team",
    body: "We've shipped 90+ AI products — SaaS platforms, internal tools, AI coaches, compliance systems, decision engines. We know which architectures scale, which LLM choices reduce cost at volume, and which UX patterns build user trust. You get that experience in your product.",
    points: [
      { title: "Product Strategy First", description: "We start with the business objective and user outcome — not the model. Architecture follows strategy, not the other way around." },
      { title: "AI + Full-Stack Engineering", description: "AGIX builds the complete product: AI intelligence layer, backend API, frontend UX, authentication, billing, and deployment infrastructure — all integrated." },
      { title: "Cost Engineering", description: "We design AI systems to be economical at scale — selecting the right model for each task, implementing caching, batching, and intelligent fallback layers." },
      { title: "Launch-Ready Delivery", description: "We don't hand you code. We hand you a deployed, tested, documented product — ready for your first paying users from day one." },
    ],
  },
  maturity: {
    title: "From AI Feature → AI Tool → AI Product",
    description: "Most businesses start with features. Winners build products. Understanding the difference determines whether your AI investment creates lasting advantage.",
    rows: [
      { level: "Level 1: AI Feature", what: "Chatbot added to existing software", does: "Solves one narrow task", limitation: "Bolt-on addition. Easy to copy." },
      { level: "Level 2: AI Tool", what: "Off-the-shelf AI SaaS", does: "Solves generic problems", limitation: "Same tool your competitors use. Vendor-dependent." },
      { level: "Level 3: AI Product (AGIX)", what: "Purpose-built, multi-layer architecture", does: "Solves a business system with AI at the core", limitation: "Long-term strategic asset. Proprietary advantage.", highlight: true },
    ],
  },
  pipeline: {
    title: "The AI Product Lifecycle: 7 Stages",
    description: "How AGIX builds AI products — from problem definition to continuous learning. Start small. Validate fast. Scale only when the business is ready.",
    steps: [
      { num: "01", title: "Problem Definition & Feasibility", description: "Define business objective, user need, success metrics. Determine where AI genuinely adds value. Validate data availability. Duration: 1–2 weeks." },
      { num: "02", title: "Data Strategy", description: "Identify data sources, assess quality and gaps, determine whether existing data supports the intended AI functionality. Duration: 1–2 weeks." },
      { num: "03", title: "MVP Scoping & Architecture", description: "Design around one clear user outcome and one core intelligence loop. Scalable backend. Key trade-offs defined. Duration: 1–2 weeks." },
      { num: "04", title: "AI + Product Development", description: "AI model/API integration + backend + frontend UX + authentication + monitoring. Duration: 4–8 weeks.", tools: ["Next.js", "React", "FastAPI", "GPT-4o", "LangChain"] },
      { num: "05", title: "Testing, Launch & Scale", description: "Validate AI output quality, edge cases, latency, cost per request, and user trust. Deploy. Scale infrastructure as adoption grows." },
    ],
  },
  components: {
    title: "Core Components of AI Products",
    description: "A production AI product is not a model with a UI. It is a multi-layer system combining five components — all built together.",
    items: [
      { num: "01", title: "Product Layer", description: "UX, workflows, onboarding, user-facing interfaces — the part users see and interact with.", tools: ["Next.js", "React", "Vercel"] },
      { num: "02", title: "AI / Intelligence Layer", description: "LLMs, ML models, classification, generation, reasoning — the brain of the product.", tools: ["GPT-4o", "Claude", "Gemini"] },
      { num: "03", title: "Knowledge Layer", description: "RAG systems, vector databases, domain-specific data retrieval — what the AI knows.", tools: ["Pinecone", "Qdrant", "LangChain", "LangGraph"] },
      { num: "04", title: "Data & Platform Layer", description: "APIs, databases, authentication, security, scalability — the infrastructure.", tools: ["Supabase", "PostgreSQL", "Node.js", "FastAPI", "AWS"] },
      { num: "05", title: "Execution & Automation Layer", description: "Workflow triggers, integrations, notifications, billing, feedback loops — what happens after AI thinks.", tools: ["n8n", "Make", "Stripe", "Slack"] },
    ],
  },
  examples: [
    {
      title: "AI SaaS Platform — Customer Intelligence",
      problem: "B2B startup needs a product that surfaces churn risk, upsell opportunities, and product feedback themes from customer conversations.",
      bullets: [
        "RAG knowledge layer connecting to CRM + support ticketing",
        "AI analysis: sentiment scoring, topic extraction, churn probability",
        "Dashboard UX: per-account risk scores and recommended actions",
        "Automated alerts for high-risk accounts",
        "Multi-tenant architecture with role-based access",
      ],
      tools: ["Next.js", "GPT-4o", "Pinecone", "Supabase", "n8n", "Stripe", "Vercel"],
      result: "MVP live in 7 weeks. First paying customers within 30 days of launch. Churn prediction accuracy: 83%.",
    },
    {
      title: "AI Coaching App — Book-Based Framework",
      problem: "Published author wants to turn their coaching methodology into a scalable AI product that coaches clients at any scale, any time.",
      bullets: [
        "Book content ingested as RAG knowledge source",
        "AI coach powered by GPT-4o with author's framework as system prompt",
        "4-stage assessment and coaching workflow UX",
        "Progress tracking and journal functionality",
        "Subscription billing with usage-based AI cost management",
      ],
      tools: ["Next.js", "GPT-4o", "Pinecone", "Supabase", "Stripe", "n8n"],
      result: "Launched in 6 weeks. 200+ subscribers in month 1. Author's IP protected. Cost: $0.03/session.",
    },
  ],
  comparison: {
    title: "Custom AI Product vs Off-the-Shelf AI",
    vsLabel: "Custom AI Product (AGIX)",
    rows: [
      { dimension: "Fit", traditional: "Generic — solves common problems", agix: "Tailored — solves YOUR specific problems" },
      { dimension: "Data ownership", traditional: "Vendor controls your data", agix: "You own everything" },
      { dimension: "Competitive advantage", traditional: "Same tool your competitors use", agix: "Unique capability nobody else has" },
      { dimension: "Customization", traditional: "Constrained by vendor roadmap", agix: "Fully customizable to your workflows" },
      { dimension: "Long-term value", traditional: "Monthly subscription forever", agix: "Strategic business asset you own" },
      { dimension: "Starting investment", traditional: "$0 (free trial), then $500+/mo", agix: "From $12K (one-time, owned)" },
    ],
  },
  techStack: ["Next.js", "React", "Node.js", "Python", "FastAPI", "GPT-4o", "Claude", "Pinecone", "Qdrant", "LangChain", "LangGraph", "Supabase", "PostgreSQL", "n8n", "Stripe", "Vercel", "AWS"],
  pricing: [
    { tier: "AI MVP", range: "$8,000–$9,500", description: "Validated AI product with core functionality — ready to test with real users in 4–7 weeks." },
    { tier: "Full AI Product", range: "$14,000–$15,000", description: "Complete product with multi-layer AI, UX, integrations, billing, and analytics.", highlight: true },
    { tier: "Enterprise AI Platform", range: "$22,000–$25,000", description: "Multi-tenant, enterprise-grade AI platform with MLOps, compliance, and white-label capability." },
  ],
  faqSection: "custom-ai",
  keywords: [
    "custom AI product development", "AI SaaS development", "custom AI software",
    "AI MVP development", "LLM application development", "AI startup engineering",
    "AI platform engineering", "GPT-4o application", "AI product architecture",
    "custom AI solution", "AI product roadmap", "proprietary AI system",
    "AI feature vs AI product", "multi-tenant AI platform", "AI API integration",
    "Next.js AI app", "LangChain product", "AI product strategy", "AI SaaS MVP",
  ],
  relatedBlogs: [
    { title: "AI Product Architecture: Why 75% of AI Products Fail", href: "/insights/ai-product-architecture-why-products-fail", description: "The 5 architectural mistakes that derail custom AI product development before they ever ship.", tag: "Strategy" },
    { title: "AI MVP in 7 Weeks: The AGIX Product Development Framework", href: "/insights/ai-mvp-7-week-framework", description: "How we scope, build, and launch AI products in 7 weeks without cutting corners or accumulating technical debt.", tag: "Process" },
    { title: "Custom AI vs Off-the-Shelf AI: The Real Long-Term Cost Analysis", href: "/insights/custom-ai-vs-off-the-shelf-cost-analysis", description: "A 3-year TCO breakdown of building custom vs subscribing to AI tools — when each makes sense.", tag: "Analysis" },
  ],
};

// ─── 8. RAG & Knowledge AI ────────────────────────────────────────────────────
const ragKnowledgeAI: ServiceData = {
  slug: "rag-knowledge-ai",
  color: "amber",
  colorHex: "#d97706",
  icon: "Database",
  heroTag: "Retrieval-Augmented Generation & Enterprise Knowledge Systems",
  h1: "RAG & Knowledge AI: Make AI Answer From Your Data — Not the Internet",
  metaTitle: "RAG & Knowledge AI | Retrieval Augmented Generation Services | AGIX Technologies",
  metaDescription: "AGIX Technologies builds enterprise RAG systems that ground AI in your private data — documents, policies, CRM records — eliminating hallucinations. Powered by Pinecone + GPT-4o. Hallucination reduced 70–90%. From $8K.",
  directAnswer: "Retrieval-Augmented Generation (RAG) is a system design approach where AI retrieves relevant information from your private data sources — documents, databases, policies, CRM records — before generating a response, ensuring every answer is grounded in verified business data rather than the model's general training knowledge. Instead of relying on static pre-trained knowledge, RAG systems search internal documents, retrieve relevant context, and generate source-cited responses.",
  originalQuote: "Without retrieval, AI guesses. With retrieval, AI answers based on actual knowledge. This is the fundamental shift that makes AI trustworthy for business.",
  author: "Santosh Singh, Founder & CEO, AGIX Technologies",
  lastUpdated: "April 2026",
  heroStats: [
    { value: "70–90%", label: "Hallucination Reduction" },
    { value: "$3.70", label: "ROI per $1 Invested in RAG" },
    { value: "96%", label: "Answer Accuracy Achieved" },
    { value: "8 wks", label: "Full Deployment Timeline" },
  ],
  stats: [
    { value: "$9.86B", label: "RAG market by 2030", source: "MarketsandMarkets" },
    { value: "38.4%", label: "CAGR Growth", source: "MarketsandMarkets" },
    { value: "70–90%", label: "Hallucination reduction", source: "Makebot AI Research" },
    { value: "$3.70", label: "ROI per $1 invested in RAG", source: "Microsoft 2025" },
  ],
  agixValue: {
    headline: "AGIX Builds Knowledge Systems Your Business Can Trust",
    body: "We've implemented RAG systems for law firms, hospitals, enterprise software companies, and financial institutions. We know what makes an answer trustworthy — and we build the full pipeline from ingestion to audit trail. You get a knowledge infrastructure, not a chatbot wrapper.",
    points: [
      { title: "Source-Cited Every Time", description: "Every AGIX RAG response includes exact document references — your users know precisely where the answer came from, every single time." },
      { title: "Multi-Source Ingestion", description: "We connect all your knowledge: Confluence, Notion, SharePoint, Google Drive, CRM, databases — unified into one trusted, searchable knowledge system." },
      { title: "Access Control Architecture", description: "AGIX builds role-based access into the retrieval layer — users only receive answers sourced from documents they're permitted to access." },
      { title: "Hallucination-Resistant Design", description: "Re-ranking, retrieval scoring, and generation guardrails are engineered in from day one — not added as patches after hallucinations cause problems." },
    ],
  },
  maturity: {
    title: "From Generic AI → Prompted AI → Grounded RAG AI",
    description: "Why most enterprise AI deployments fail — and how RAG fixes the fundamental reliability problem.",
    rows: [
      { level: "Level 1: Generic LLM", what: "Public model with no context", does: "Answers from training data (2023 cutoff)", limitation: "Hallucinations. Wrong answers. Outdated info." },
      { level: "Level 2: Prompted LLM", what: "System prompt with instructions", does: "Follows instructions but still guesses facts", limitation: "Better behavior, still unreliable on specifics." },
      { level: "Level 3: RAG System (AGIX)", what: "Retrieval + generation grounded in your data", does: "Finds the right document first, then answers from it", limitation: "Source-cited. Accurate. Auditable. Trustworthy.", highlight: true },
    ],
  },
  pipeline: {
    title: "How RAG Works: The 7-Stage AGIX Pipeline",
    description: "The AGIX RAG Pipeline — from raw knowledge to trusted, source-cited answers. This is knowledge infrastructure, not a chatbot.",
    steps: [
      { num: "01", title: "Data Ingestion", description: "PDFs, Word docs, Excel, Confluence, Notion, SharePoint, Google Drive, CRM records, databases — any format, any source.", tools: ["Confluence", "Notion", "SharePoint", "Google Drive"] },
      { num: "02", title: "Processing & Chunking", description: "Documents cleaned, structured, and split into semantically meaningful segments. Each chunk retains source reference, section context, and permissions." },
      { num: "03", title: "Embedding", description: "Chunks converted into vector embeddings — mathematical representations that capture semantic meaning for search-by-meaning." },
      { num: "04", title: "Vector Indexing", description: "Embeddings stored in a vector database optimized for fast retrieval with metadata filtering.", tools: ["Pinecone", "Qdrant", "Weaviate", "Chroma"] },
      { num: "05", title: "Retrieval + Re-Ranking + Generation", description: "Query → vector search → re-ranking for accuracy → LLM generates grounded response with source citations.", tools: ["Cohere Rerank", "GPT-4o", "Claude", "LangChain"] },
    ],
  },
  components: {
    title: "RAG System Architecture: 6 Core Components",
    description: "A production RAG system is not a chatbot with documents attached. It is a multi-layer knowledge infrastructure.",
    items: [
      { num: "01", title: "Data Ingestion Layer", description: "Handles any format from any source with incremental updates and versioning. Keeps your knowledge base current automatically." },
      { num: "02", title: "Embedding Layer", description: "Converts text into vector representations capturing semantic meaning — enables search by concept, not keyword." },
      { num: "03", title: "Vector Database", description: "Stores embeddings, enables semantic search at millisecond speed with metadata filtering.", tools: ["Pinecone", "Qdrant", "Weaviate", "Chroma"] },
      { num: "04", title: "Retrieval Engine", description: "Fetches the most relevant context for any query using semantic similarity, hybrid search, and metadata filtering." },
      { num: "05", title: "Re-Ranking + LLM Generation", description: "Re-ranks retrieved results by relevance, freshness, authority — then feeds to LLM for grounded, source-cited generation.", tools: ["Cohere Rerank", "GPT-4o", "Claude"] },
    ],
  },
  examples: [
    {
      title: "Enterprise Knowledge Assistant",
      problem: "500-person company has critical knowledge locked in 12,000 documents, 4 wikis, and the heads of 50 senior employees. New hires take 3 months to become productive.",
      bullets: [
        "Ingests all internal documentation: SOPs, policies, handbooks, wikis, past proposals",
        "Natural language Q&A: employees ask questions, get source-cited answers",
        "Role-based access: each person sees only documents they're permitted to access",
        "Slack + Teams integration — answers appear in workflow without switching tools",
        "New document detection: knowledge base updates automatically",
      ],
      tools: ["Pinecone", "GPT-4o", "LangChain", "Confluence", "Notion", "Slack"],
      result: "New hire ramp time -60%. Support ticket volume -40%. Knowledge findability score: 9.2/10.",
    },
    {
      title: "RAG-Powered Customer Support System",
      problem: "Support team manually searches 3,000-page product documentation to answer customer questions — average response time 4 hours.",
      bullets: [
        "All product docs, FAQs, and release notes ingested into vector database",
        "Support chatbot retrieves exact relevant sections before answering",
        "Every response includes source citation for transparency",
        "Automatically detects when documentation doesn't cover the question",
        "Escalates to human with retrieved context pre-loaded",
      ],
      tools: ["Qdrant", "GPT-4o", "LlamaIndex", "n8n", "Zendesk"],
      result: "Response time: 4h → 2 min. First-contact resolution +45%. Hallucination rate: <2%.",
    },
  ],
  comparison: {
    title: "RAG vs Fine-Tuning vs Prompting",
    vsLabel: "RAG (AGIX)",
    rows: [
      { dimension: "Data freshness", traditional: "Static — frozen at fine-tune time", agix: "Real-time — retrieves current data every query" },
      { dimension: "Update cost", traditional: "Expensive — requires retraining ($10K+)", agix: "Low — just update the knowledge base" },
      { dimension: "Accuracy on specifics", traditional: "Moderate — model generalizes", agix: "High — retrieves exact source text" },
      { dimension: "Source attribution", traditional: "None — black box output", agix: "Every answer includes source citations" },
      { dimension: "Hallucination risk", traditional: "High without grounding", agix: "70–90% reduction vs ungrounded LLMs" },
      { dimension: "Starting price", traditional: "Fine-tuning: $10K–$50K", agix: "RAG from $8K" },
    ],
  },
  techStack: ["Pinecone", "Qdrant", "Weaviate", "Chroma", "GPT-4o", "Claude", "Gemini", "LangChain", "LlamaIndex", "Cohere Rerank", "n8n", "Confluence", "Notion", "SharePoint", "Supabase"],
  pricing: [
    { tier: "Knowledge Bot", range: "$6,000–$8,500", description: "Single knowledge base with chat interface — support bot or internal assistant." },
    { tier: "Enterprise RAG System", range: "$11,000–$14,000", description: "Multi-source ingestion, re-ranking, access control, Slack/Teams integration.", highlight: true },
    { tier: "Agentic RAG Platform", range: "$18,500–$22,000", description: "Multi-step retrieval, agent orchestration, real-time sync, and enterprise security." },
  ],
  faqSection: "rag-knowledge",
  keywords: [
    "retrieval augmented generation", "RAG system", "RAG AI", "enterprise knowledge base AI",
    "document QA AI", "AI search enterprise", "Pinecone RAG", "vector database AI",
    "LangChain RAG", "LlamaIndex RAG", "AI knowledge management", "grounded AI responses",
    "hallucination reduction AI", "source-cited AI", "semantic search AI",
    "private data AI", "AI document retrieval", "enterprise LLM", "knowledge graph AI",
  ],
  relatedBlogs: [
    { title: "RAG vs Fine-Tuning: When to Use Each (And When to Use Both)", href: "/insights/rag-vs-fine-tuning-when-to-use", description: "The definitive technical and business guide to choosing your AI knowledge strategy for enterprise applications.", tag: "Technical" },
    { title: "Reducing AI Hallucinations in Enterprise Applications", href: "/insights/reducing-ai-hallucinations-enterprise-rag", description: "How RAG, guardrails, and source-citing eliminate unreliable AI responses in production systems.", tag: "Best Practices" },
    { title: "Pinecone vs Qdrant vs Weaviate: Choosing a Vector Database for Enterprise", href: "/insights/pinecone-vs-qdrant-vs-weaviate-enterprise", description: "Performance, cost, and feature comparison for production-scale RAG workloads.", tag: "Comparison" },
  ],
};

// ─── Export map ───────────────────────────────────────────────────────────────
export const servicesData: Record<string, ServiceData> = {
  "agentic-ai-systems": agenticAI,
  "ai-automation": aiAutomation,
  "ai-computer-vision": aiComputerVision,
  "ai-predictive-analytics": aiPredictiveAnalytics,
  "ai-voice-agents": aiVoiceAgents,
  "conversational-ai-chatbots": conversationalAI,
  "custom-ai-product-development": customAIProduct,
  "rag-knowledge-ai": ragKnowledgeAI,
};
