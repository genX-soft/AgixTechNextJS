const SITE_URL = 'https://agixtech.com';

export const homepageOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "AGIX",
  "url": `${SITE_URL}/`,
  "logo": `${SITE_URL}/logo.png`,
  "description": "AGIX builds governed, enterprise-grade AI systems including operational AI, conversational AI, decision intelligence, autonomous agentic systems, and industry-specific AI solutions.",
  "sameAs": [
    "https://www.linkedin.com/company/agixtech",
    "https://twitter.com/agixtech"
  ],
  "knowsAbout": [
    "Operational AI",
    "Conversational AI",
    "Decision Intelligence",
    "Autonomous Agentic Systems",
    "Enterprise Knowledge Intelligence",
    "AI Automation",
    "AI Voice Agents",
    "Conversational AI Chatbots",
    "Agentic AI Systems",
    "Retrieval Augmented Generation",
    "Predictive Analytics AI",
    "Computer Vision",
    "Custom AI Product Development",
    "AI Governance",
    "Responsible AI",
    "Human-in-the-loop AI",
    "Industry-Specific AI Solutions"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AGIX AI Services & Solutions",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "AI Intelligence Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Operational AI", "url": `${SITE_URL}/intelligence/operational-ai/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conversational AI", "url": `${SITE_URL}/intelligence/conversational-ai/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Decision Intelligence", "url": `${SITE_URL}/intelligence/decision-ai/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Autonomous Agentic AI", "url": `${SITE_URL}/intelligence/autonomous-agentic-ai/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise Knowledge AI", "url": `${SITE_URL}/intelligence/enterprise-knowledge-ai/` }}
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Core AI Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Automation Services", "url": `${SITE_URL}/services/ai-automation/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Voice Agents", "url": `${SITE_URL}/services/ai-voice-agents/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conversational AI Chatbots", "url": `${SITE_URL}/services/conversational-ai-chatbots/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Agentic AI Systems", "url": `${SITE_URL}/services/agentic-ai-systems/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "RAG & Knowledge AI", "url": `${SITE_URL}/services/rag-knowledge-ai/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Predictive Analytics AI", "url": `${SITE_URL}/services/ai-predictive-analytics/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Computer Vision Services", "url": `${SITE_URL}/services/ai-computer-vision/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom AI Product Development", "url": `${SITE_URL}/services/custom-ai-product-development/` }}
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Industry AI Solutions",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Healthcare AI Solutions", "url": `${SITE_URL}/industries/healthcare-ai-solutions/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real Estate AI Solutions", "url": `${SITE_URL}/industries/real-estate-ai-solutions/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fintech AI Solutions", "url": `${SITE_URL}/industries/fintech-ai-solutions/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Insurance AI Solutions", "url": `${SITE_URL}/industries/insurance-ai-solutions/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Retail AI Solutions", "url": `${SITE_URL}/industries/retail-ai-solutions/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Logistics AI Solutions", "url": `${SITE_URL}/industries/logistics-ai-solutions/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hospitality AI Solutions", "url": `${SITE_URL}/industries/hospitality-ai-solutions/` }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EdTech AI Solutions", "url": `${SITE_URL}/industries/edtech-ai-solutions/` }}
        ]
      }
    ]
  }
};

export interface PageSchemaData {
  webPage: {
    name: string;
    description: string;
  };
  breadcrumbs: { name: string; url: string }[];
  service: {
    name: string;
    description: string;
    serviceType: string;
    audienceType?: string;
  };
  faqs: { question: string; answer: string }[];
}

export const intelligencePageSchemas: Record<string, PageSchemaData> = {
  'operational-ai': {
    webPage: {
      name: "Operational AI Intelligence for Enterprise Operations",
      description: "Operational AI intelligence enables enterprises to automate, optimize, and govern real-time operational workflows using intelligent, decision-driven AI systems."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Operational AI", url: `${SITE_URL}/intelligence/operational-ai/` }
    ],
    service: {
      name: "Operational AI Intelligence",
      description: "Operational AI intelligence services that enable enterprises to automate workflows, monitor real-time operations, and execute intelligent decisions across complex operational environments.",
      serviceType: "Operational AI",
      audienceType: "Enterprise Operations Teams"
    },
    faqs: [
      { question: "What is the difference between Operational Intelligence and Business Intelligence?", answer: "Business Intelligence focuses on historical data analysis and reporting to understand what happened. Operational Intelligence focuses on real-time monitoring and decision-making to respond to what is happening now. While BI helps you learn from the past, OI helps you act in the present." },
      { question: "How long does it take to implement Operational Intelligence?", answer: "Implementation timelines vary based on complexity. Observational Intelligence systems can be deployed in 6–8 weeks. Assistive systems typically take 8–12 weeks. Full Decision Intelligence with controlled autonomy may require 12–16 weeks. We start with quick wins and expand gradually." },
      { question: "Do we need to replace our existing systems?", answer: "No. Operational Intelligence integrates with your existing tools, databases, and workflows. We connect to your current systems through APIs and data feeds, adding an intelligence layer without disrupting what already works." },
      { question: "How does AI handle sensitive business decisions?", answer: "Our systems include human-in-the-loop controls for critical decisions. AI can recommend, draft, or prepare actions, but humans approve high-stakes decisions. Every AI decision is logged, traceable, and explainable." },
      { question: "What industries benefit most from Operational Intelligence?", answer: "Any industry with complex operations benefits. Healthcare, finance, logistics, retail, manufacturing, and professional services see significant improvements. The key factor is having repeatable processes with decision points that can be optimized." },
      { question: "How is this different from simple automation?", answer: "Automation executes predefined rules. Operational Intelligence observes, understands context, and decides. It can handle exceptions, prioritize dynamically, and improve over time. Automation is a subset of what Operational Intelligence can orchestrate." },
      { question: "What kind of ROI can we expect from Operational Intelligence?", answer: "Most organizations see a 30–50% reduction in operational delays, 40–60% faster decision cycles, and 20–35% cost savings within the first year. ROI depends on current operational maturity and process complexity." },
      { question: "How does Operational Intelligence handle data security and privacy?", answer: "We implement enterprise-grade security including end-to-end encryption, role-based access controls, and compliance with GDPR, HIPAA, and SOC 2 standards. Data can be processed on-premise or in secure cloud environments based on requirements." },
      { question: "Can Operational Intelligence work with legacy systems?", answer: "Yes. Our integration approach supports legacy systems through APIs, database connections, file-based integrations, and screen scraping when necessary. We have successfully integrated with systems dating back decades." },
      { question: "What happens when the AI makes a wrong decision?", answer: "Every AI decision includes confidence scores and reasoning. Low-confidence decisions are flagged for human review. All decisions are logged with full audit trails, enabling issue identification, retraining, and continuous improvement." },
      { question: "How do you measure the success of an Operational Intelligence implementation?", answer: "We establish baseline metrics before implementation and track KPIs such as decision speed, error rates, escalation frequency, cost per transaction, and employee satisfaction. Monthly reviews ensure alignment with business goals." },
      { question: "What level of technical expertise does our team need?", answer: "No coding or technical expertise is required for day-to-day operations. We provide intuitive dashboards and interfaces, along with training for system oversight, while AGIX handles maintenance and updates." },
      { question: "Can we start small and scale up later?", answer: "Yes. We recommend starting with a single department or process as a pilot. This validates value quickly, builds internal confidence, and creates a foundation for organization-wide deployment." },
      { question: "How does Operational Intelligence improve over time?", answer: "The system continuously learns from outcomes, user feedback, and changing patterns. Machine learning models are retrained regularly, allowing the intelligence layer to adapt as business processes evolve." },
      { question: "What support and maintenance is included?", answer: "All implementations include 24/7 monitoring, regular system health checks, proactive optimization recommendations, and dedicated support. Quarterly business reviews ensure ongoing alignment with evolving needs." }
    ]
  },
  'conversational-ai': {
    webPage: {
      name: "Conversational AI Intelligence for Enterprise Engagement",
      description: "Conversational AI intelligence builds robust, context-aware chatbots and voice assistants that help enterprises automate customer engagement, support, and task execution with natural language interfaces."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Conversational AI", url: `${SITE_URL}/intelligence/conversational-ai/` }
    ],
    service: {
      name: "Conversational AI Intelligence",
      description: "Conversational AI intelligence services that enable the design and deployment of advanced chatbots, voice assistants, and dialog systems for enterprise engagement, support automation, and natural language interactions.",
      serviceType: "Conversational AI",
      audienceType: "Enterprise Engagement Teams"
    },
    faqs: [
      { question: "What is Conversational Intelligence in simple terms?", answer: "Conversational Intelligence allows AI to understand intent and context in conversations and take the right action, not just reply with text or voice." },
      { question: "Is Conversational Intelligence the same as chatbots?", answer: "No. Chatbots respond to questions. Conversational Intelligence understands conversations, reasons safely, and connects to real business actions." },
      { question: "How is Conversational Intelligence different from Conversational AI?", answer: "Conversational AI often focuses on language generation. Conversational Intelligence focuses on understanding, decision-making, and outcomes, with governance and control." },
      { question: "Are AI chatbots and voice agents safe for real customers?", answer: "They are safe only when designed with controls. Agix systems include human-in-the-loop, confidence thresholds, and auditability." },
      { question: "How do you prevent AI hallucinations in conversations?", answer: "By combining restricted knowledge sources, confidence scoring, decision rules, and human fallback mechanisms." },
      { question: "Can Conversational Intelligence work across chat, voice, and WhatsApp?", answer: "Yes. Conversational Intelligence is channel-agnostic and can operate across chat, voice, and messaging platforms." },
      { question: "Do I need a large dataset to start?", answer: "No. Conversational Intelligence systems can start with existing conversations and improve over time." },
      { question: "Will Conversational Intelligence replace human agents?", answer: "No. It reduces repetitive work and supports humans, allowing agents to focus on complex cases." },
      { question: "How long does it take to implement Conversational Intelligence?", answer: "Early value can be seen in 4-6 weeks, with more advanced capabilities rolling out gradually." },
      { question: "Is Conversational Intelligence expensive?", answer: "Cost depends on complexity, but starting with assistive intelligence is affordable compared to large automation projects." },
      { question: "Can Conversational Intelligence integrate with CRM and internal systems?", answer: "Yes. Agix builds systems that integrate with CRM, ticketing, scheduling, and backend platforms." },
      { question: "How does Conversational Intelligence handle sensitive data?", answer: "Through access controls, data masking, role-based permissions, and compliance-aware design." },
      { question: "What is the biggest mistake companies make with conversational AI?", answer: "Deploying LLMs without governance, intent control, or escalation logic." },
      { question: "Can Conversational Intelligence handle multilingual users?", answer: "Yes. It can understand and respond in multiple languages while maintaining context." },
      { question: "How does Conversational Intelligence improve over time?", answer: "It learns from successful resolutions, human corrections, feedback loops, and new conversation patterns." },
      { question: "Is Conversational Intelligence suitable for internal operations?", answer: "Absolutely. Many companies use it for IT, HR, and internal support to reduce ticket volume." },
      { question: "What types of conversations should not be automated?", answer: "High-risk, highly subjective, or legally sensitive conversations should always involve human oversight." },
      { question: "How do we decide where to start with Conversational Intelligence?", answer: "Agix provides Solution Finder and Risk Assessment tools to guide safe starting points." },
      { question: "Can Conversational Intelligence help increase sales?", answer: "Yes, by qualifying leads, answering product questions, reducing response time, and guiding users to the right next step." },
      { question: "Is Conversational Intelligence a one-time setup?", answer: "No. It's a living system that evolves as conversations, products, and customers change." }
    ]
  },
  'decision-ai': {
    webPage: {
      name: "Decision Intelligence for Enterprise Strategy",
      description: "Decision Intelligence enables enterprises to make faster, smarter, and more consistent decisions using AI-powered analysis, recommendations, and governed automation."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Decision AI", url: `${SITE_URL}/intelligence/decision-ai/` }
    ],
    service: {
      name: "Decision AI Intelligence",
      description: "Decision Intelligence services that help enterprises analyze complex scenarios, generate recommendations, and automate routine decisions with governance and human oversight.",
      serviceType: "Decision Intelligence",
      audienceType: "Enterprise Strategy Teams"
    },
    faqs: [
      { question: "What is Decision Intelligence?", answer: "Decision Intelligence uses AI to analyze data, generate insights, and recommend or automate decisions across business operations with appropriate governance and human oversight." },
      { question: "How is Decision Intelligence different from Business Intelligence?", answer: "Business Intelligence tells you what happened. Decision Intelligence helps you decide what to do next, with AI-powered recommendations and automation capabilities." },
      { question: "Can AI make decisions without human approval?", answer: "It depends on the risk level. Low-risk, routine decisions can be automated. High-stakes decisions include human-in-the-loop controls for review and approval." },
      { question: "What types of decisions can be automated?", answer: "Routine operational decisions like routing, prioritization, scheduling, and standard approvals are good candidates for automation." },
      { question: "How do you ensure AI decisions are explainable?", answer: "Every AI decision includes reasoning, confidence scores, and audit trails so stakeholders can understand and verify the logic." },
      { question: "Is Decision Intelligence suitable for regulated industries?", answer: "Yes. Systems are designed with compliance, auditability, and explainability as core requirements." },
      { question: "How long does implementation take?", answer: "Initial decision support systems can be deployed in 6-8 weeks, with more advanced automation following in phases." },
      { question: "What ROI can we expect?", answer: "Organizations typically see faster decision cycles, reduced errors, and improved consistency, with measurable ROI within the first year." },
      { question: "Can Decision Intelligence integrate with our existing tools?", answer: "Yes. Decision Intelligence layers work with existing business systems, databases, and workflows." },
      { question: "How does the system improve over time?", answer: "Through continuous learning from outcomes, feedback, and changing business conditions." }
    ]
  },
  'autonomous-agentic-ai': {
    webPage: {
      name: "Autonomous Agentic AI for Enterprise Operations",
      description: "Autonomous Agentic AI enables enterprises to deploy AI agents that can reason, plan, and execute complex multi-step tasks with appropriate governance and human oversight."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Autonomous Agentic AI", url: `${SITE_URL}/intelligence/autonomous-agentic-ai/` }
    ],
    service: {
      name: "Autonomous Agentic AI",
      description: "Agentic AI services that enable enterprises to deploy intelligent agents capable of autonomous reasoning, planning, and task execution with governance and human-in-the-loop controls.",
      serviceType: "Agentic AI",
      audienceType: "Enterprise Technology Teams"
    },
    faqs: [
      { question: "What is Agentic AI?", answer: "Agentic AI refers to AI systems that can autonomously reason, plan, and execute multi-step tasks rather than just responding to single prompts." },
      { question: "How is Agentic AI different from chatbots?", answer: "Chatbots respond to individual queries. Agentic AI can plan and execute complex workflows, make decisions, and take actions across multiple systems." },
      { question: "Is autonomous AI safe for enterprise use?", answer: "Yes, when designed with appropriate governance. AGIX builds agentic systems with human oversight, guardrails, and audit trails." },
      { question: "What tasks can Agentic AI handle?", answer: "Complex operational workflows, research tasks, document processing, customer service escalations, and multi-step business processes." },
      { question: "How do you prevent AI agents from making mistakes?", answer: "Through confidence thresholds, human-in-the-loop checkpoints, sandbox testing, and comprehensive monitoring." },
      { question: "Can Agentic AI work with our existing systems?", answer: "Yes. Agents are designed to integrate with existing tools, APIs, and databases." },
      { question: "How long does it take to deploy an AI agent?", answer: "Simple agents can be deployed in 4-6 weeks. Complex multi-agent systems may require 8-12 weeks." },
      { question: "What happens when an agent encounters something unexpected?", answer: "Agents are designed to recognize uncertainty, pause execution, and escalate to humans when appropriate." },
      { question: "Is Agentic AI expensive to run?", answer: "Costs depend on complexity and usage volume, but are typically offset by efficiency gains and reduced manual effort." },
      { question: "How do you ensure Agentic AI is compliant?", answer: "Through governance frameworks, audit logging, explainability features, and compliance-aware design patterns." }
    ]
  },
  'enterprise-knowledge-ai': {
    webPage: {
      name: "Enterprise Knowledge AI Intelligence",
      description: "Enterprise Knowledge AI enables organizations to unify, govern, and activate internal knowledge across documents, systems, and data sources, allowing AI systems to retrieve accurate, trusted, and contextual answers."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Enterprise Knowledge AI", url: `${SITE_URL}/intelligence/enterprise-knowledge-ai/` }
    ],
    service: {
      name: "Enterprise Knowledge AI",
      description: "Enterprise Knowledge AI services that help organizations structure, govern, and retrieve institutional knowledge across documents, databases, and tools, enabling reliable AI-assisted decision-making and operations.",
      serviceType: "Enterprise Knowledge AI",
      audienceType: "Enterprise Knowledge, IT, and Operations Teams"
    },
    faqs: [
      { question: "What is Enterprise Knowledge Intelligence in simple terms?", answer: "It ensures AI answers are accurate, explainable, and based only on trusted enterprise knowledge, not guesses." },
      { question: "Is Enterprise Knowledge Intelligence just RAG?", answer: "No. RAG is a retrieval method. Knowledge Intelligence adds governance, validation, access control, and trust." },
      { question: "Why do AI systems hallucinate even with RAG?", answer: "Because the underlying knowledge is unverified, outdated, or conflicting. Hallucinations are often knowledge problems, not model problems." },
      { question: "How does Knowledge Intelligence prevent hallucinations?", answer: "By enforcing source validation, version control, role-based access, multi-source verification, and explainable answers." },
      { question: "Can Knowledge Intelligence work with our existing documents?", answer: "Yes. AGIX builds intelligence layers on top of your existing knowledge sources, not replacements." },
      { question: "Do we need to clean all our data before using Knowledge Intelligence?", answer: "No. The system helps identify what is trustworthy and what needs cleanup, instead of blocking adoption." },
      { question: "How does it handle sensitive or confidential data?", answer: "Through role-based access, data segmentation, audit logging, and compliance-aware retrieval. AI only sees what it is allowed to see." },
      { question: "Is it safe for regulated industries?", answer: "Yes — when designed with governance, auditability, and explainability, which AGIX prioritizes." },
      { question: "How is this different from enterprise search?", answer: "Search finds documents. Knowledge Intelligence answers questions with verified, governed knowledge." },
      { question: "Can it support conversational AI and agents?", answer: "Yes. It is the foundation layer that makes conversational AI and agentic systems safe and reliable." },
      { question: "How long does it take to implement?", answer: "Initial value can be achieved in 4–6 weeks, with expansion over time." },
      { question: "Is Knowledge Intelligence expensive?", answer: "It is often less costly than the risk of wrong AI answers, compliance errors, or stalled AI adoption." },
      { question: "Who owns and approves knowledge in these systems?", answer: "Ownership, approval, and validity are explicitly defined as part of the system design." },
      { question: "Can we see where an AI answer came from?", answer: "Yes. Answers include citations, sources, and reasoning context." },
      { question: "What happens when knowledge is outdated or conflicting?", answer: "The system flags uncertainty, escalates for review, or provides qualified responses — instead of guessing." },
      { question: "Does Knowledge Intelligence replace human expertise?", answer: "No. It preserves and scales institutional knowledge, reducing dependency on individuals." },
      { question: "Is this suitable for internal AI assistants?", answer: "Absolutely. Internal AI is often where Knowledge Intelligence delivers the fastest ROI." },
      { question: "What is the biggest mistake companies make with RAG?", answer: "Deploying RAG without governance, ownership, or validation." },
      { question: "Can small or mid-sized enterprises use this?", answer: "Yes. Growing organizations benefit greatly from structured, trusted knowledge early." },
      { question: "How do we start safely?", answer: "Start with a knowledge audit, trust and access mapping, and controlled scope. Then expand gradually." }
    ]
  }
};

export const servicesPageSchemas: Record<string, PageSchemaData> = {
  'ai-automation': {
    webPage: {
      name: "AI Automation Services",
      description: "Build intelligent workflows with AI automation services that integrate with CRMs, ERPs & enterprise tools. Automate decisions, routing, and operations at scale."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "AI Automation Services", url: `${SITE_URL}/services/ai-automation/` }
    ],
    service: {
      name: "AI Automation Services",
      description: "AI Automation services that streamline workflows, reduce manual effort, and enable intelligent, governed automation across business operations.",
      serviceType: "AI Automation Services"
    },
    faqs: [
      { question: "What are AI automation services?", answer: "AI automation services use artificial intelligence to automate business workflows, processes, documents, and communications that normally require human decision-making. Unlike basic automation, AI automation understands context, handles exceptions, makes decisions, and works across multiple systems." },
      { question: "What is the difference between AI automation and traditional automation?", answer: "Traditional automation relies on fixed rules and scripts, while AI automation uses intelligence to interpret inputs and make decisions. Traditional automation is rule-based and breaks on change, whereas AI automation is context-aware, adapts to new inputs, handles unstructured data, and operates at the process level." },
      { question: "How is AI automation different from RPA?", answer: "RPA mimics human clicks and works only on predictable inputs, often breaking when interfaces or formats change. AI automation understands emails, documents, and intent, handles variability and exceptions, and owns end-to-end processes. Many organizations use AI automation to replace or enhance RPA systems." },
      { question: "What business processes are best suited for AI automation?", answer: "Processes suited for AI automation typically involve repetitive steps, high volume, decision-making, documents or emails, and multiple systems. Examples include invoicing and billing, claims processing, customer onboarding, internal approvals, and support request handling." },
      { question: "How much do AI automation services cost?", answer: "AI automation pricing depends on process complexity, systems involved, decision logic, and transaction volume. Typical ranges include simple workflow automation ($6,000–$10,000), department-level automation ($10,000–$25,000), end-to-end process automation ($25,000–$60,000), and enterprise AI transformation programs ($60,000–$150,000+)." },
      { question: "Is AI automation suitable for small or mid-sized businesses?", answer: "Yes. Many small and mid-sized businesses use AI automation to reduce hiring needs, eliminate manual errors, and scale operations efficiently. AI automation is often more cost-effective than adding headcount as volumes grow." },
      { question: "How long does it take to implement AI automation?", answer: "Implementation timelines vary by scope. Email or document automation typically takes 3–6 weeks, workflow automation across tools 4–8 weeks, business process automation 8–12 weeks, and enterprise transformation programs are delivered in phased rollouts over 3–6 months." },
      { question: "Can AI automation integrate with existing software?", answer: "Yes. AI automation integrates with existing CRMs, ERPs, email platforms, databases, cloud applications, and internal tools. Organizations do not need to replace current systems, as AI automation connects and enhances them." },
      { question: "Is AI automation secure for enterprise use?", answer: "Yes, when designed correctly. Enterprise AI automation systems include role-based access control, audit logs, secure data pipelines, and compliance-ready architecture, making them suitable for regulated industries." },
      { question: "Does AI automation require clean or perfect data?", answer: "No. AI automation is designed to work with real-world operational data, which is often incomplete or inconsistent. Systems handle unstructured inputs, missing fields, and flag exceptions for review." },
      { question: "Will AI automation replace human jobs?", answer: "AI automation replaces manual effort, not human judgment. It removes repetitive work, supports better decision-making, and allows teams to focus on higher-value tasks." },
      { question: "What is AI business process automation (BPA)?", answer: "AI Business Process Automation automates entire business processes rather than individual tasks. It manages decisions, exceptions, workflow progression, and outcomes across end-to-end processes." },
      { question: "How do we know what to automate first?", answer: "Organizations should begin with an automation opportunity assessment to identify high-ROI processes, low-risk automation candidates, and quick wins versus long-term opportunities." },
      { question: "What industries use AI automation the most?", answer: "AI automation is widely used in healthcare operations, finance and fintech, insurance, e-commerce, logistics and supply chain, manufacturing, and SaaS companies." },
      { question: "What results can businesses expect from AI automation?", answer: "Businesses typically achieve faster process execution, lower operational costs, reduced error rates, improved scalability, and higher team productivity through AI automation." }
    ]
  },
  'ai-voice-agents': {
    webPage: {
      name: "AI Voice Agents",
      description: "Deploy AI voice agents that handle calls, automate conversations, and scale customer support. AI-powered phone agents built for modern businesses."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "AI Voice Agents", url: `${SITE_URL}/services/ai-voice-agents/` }
    ],
    service: {
      name: "AI Voice Agents",
      description: "Automate calls and conversations with AI-powered voice agents built for businesses. Scalable, intelligent, and enterprise-ready voice AI solutions.",
      serviceType: "AI Voice Agent Services"
    },
    faqs: [
      { question: "What is an AI voice agent?", answer: "An AI voice agent is an artificial intelligence system that can answer and place phone calls, understand spoken language, respond naturally, and perform actions such as booking appointments or updating systems." },
      { question: "Are AI voice agents the same as IVR systems?", answer: "No. IVR systems rely on menus and fixed rules, while AI voice agents use conversational AI to hold natural, free-flowing conversations." },
      { question: "How accurate are AI voice agents in real calls?", answer: "Well-designed AI voice agents typically achieve 90–95% intent accuracy for defined use cases and improve over time through continuous learning." },
      { question: "Can AI voice agents handle complex conversations?", answer: "Yes, within defined boundaries. Human fallback logic is used for edge cases and compliance-sensitive situations." },
      { question: "Can AI voice agents work 24/7?", answer: "Yes. AI voice agents operate continuously without fatigue, delays, or shift limitations." },
      { question: "Do customers know they are talking to AI?", answer: "This depends on compliance requirements and business preference. Systems can support transparent disclosure or hybrid approaches where required." },
      { question: "Can AI voice agents book appointments automatically?", answer: "Yes. AI voice agents can check availability, book, reschedule, confirm appointments, and send reminders." },
      { question: "Are AI voice agents secure?", answer: "Security is built into the system through access controls, call recording governance, data masking, and audit trails." },
      { question: "Can AI voice agents integrate with CRM and internal tools?", answer: "Yes. AI voice agents can read and write to CRMs, update records, trigger workflows, and connect with internal systems." },
      { question: "How long does it take to deploy an AI voice agent?", answer: "Most AI voice agents are deployed within 3–6 weeks, depending on complexity and integration requirements." }
    ]
  },
  'conversational-ai-chatbots': {
    webPage: {
      name: "Conversational AI Chatbots",
      description: "Build intelligent chatbots that understand context, handle complex queries, and integrate with your business systems for seamless customer engagement."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Conversational AI Chatbots", url: `${SITE_URL}/services/conversational-ai-chatbots/` }
    ],
    service: {
      name: "Conversational AI Chatbots",
      description: "Deploy context-aware chatbots that go beyond simple Q&A to handle complex conversations, integrate with business systems, and provide meaningful assistance.",
      serviceType: "Conversational AI Chatbot Services"
    },
    faqs: [
      { question: "What makes a chatbot conversational AI?", answer: "Conversational AI chatbots understand context, handle multi-turn conversations, and can take actions beyond just answering questions." },
      { question: "How is this different from rule-based chatbots?", answer: "Rule-based chatbots follow scripted flows. Conversational AI understands intent, handles variations, and adapts to user needs dynamically." },
      { question: "Can chatbots integrate with our systems?", answer: "Yes. AGIX builds chatbots that integrate with CRMs, databases, ticketing systems, and internal tools." },
      { question: "How do you prevent chatbots from giving wrong answers?", answer: "Through confidence thresholds, knowledge governance, human escalation paths, and continuous monitoring." },
      { question: "What channels can chatbots work on?", answer: "Chatbots can operate on websites, mobile apps, WhatsApp, Slack, Microsoft Teams, and other messaging platforms." },
      { question: "How long does implementation take?", answer: "Basic chatbots can be deployed in 3–4 weeks. Complex integrations may take 6–8 weeks." },
      { question: "Can chatbots handle multiple languages?", answer: "Yes. Conversational AI can understand and respond in multiple languages while maintaining context." },
      { question: "What happens when the chatbot can't answer?", answer: "Conversations are escalated to human agents with full context preserved." },
      { question: "How do chatbots improve over time?", answer: "Through analysis of conversations, user feedback, and continuous training on new patterns." },
      { question: "Is this suitable for customer support?", answer: "Yes. Many organizations use conversational AI to handle tier-1 support, reducing wait times and agent workload." }
    ]
  },
  'agentic-ai-systems': {
    webPage: {
      name: "Agentic AI Systems",
      description: "Deploy autonomous AI agents that can reason, plan, and execute complex multi-step tasks with governance and human oversight."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Agentic AI Systems", url: `${SITE_URL}/services/agentic-ai-systems/` }
    ],
    service: {
      name: "Agentic AI Systems",
      description: "Build and deploy AI agents capable of autonomous reasoning, planning, and task execution with enterprise-grade governance and controls.",
      serviceType: "Agentic AI Development Services"
    },
    faqs: [
      { question: "What are agentic AI systems?", answer: "Agentic AI systems are AI agents that can autonomously plan, reason, and execute multi-step tasks rather than just responding to individual prompts." },
      { question: "How do agents differ from chatbots?", answer: "Chatbots respond to queries. Agents can plan and execute complex workflows, make decisions, and take actions across multiple systems." },
      { question: "Are agentic systems safe?", answer: "Yes, when designed with governance. AGIX builds agents with human oversight, guardrails, confidence thresholds, and comprehensive audit trails." },
      { question: "What tasks can agents handle?", answer: "Research workflows, document processing, customer service escalations, multi-step operations, and complex business processes." },
      { question: "How do you control agent behavior?", answer: "Through defined boundaries, human-in-the-loop checkpoints, sandbox testing, and continuous monitoring." },
      { question: "Can agents work with existing tools?", answer: "Yes. Agents integrate with APIs, databases, and existing business systems." },
      { question: "How long does deployment take?", answer: "Simple agents in 4–6 weeks. Complex multi-agent systems may require 8–12 weeks." },
      { question: "What happens with unexpected situations?", answer: "Agents recognize uncertainty and escalate to humans when appropriate." },
      { question: "How do you ensure compliance?", answer: "Through governance frameworks, audit logging, explainability features, and compliance-aware design." },
      { question: "What industries benefit most?", answer: "Operations-heavy industries like finance, healthcare, logistics, and professional services see significant value." }
    ]
  },
  'rag-knowledge-ai': {
    webPage: {
      name: "RAG & Knowledge AI Services",
      description: "Build retrieval-augmented generation systems that provide accurate, grounded answers from your enterprise knowledge base."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "RAG & Knowledge AI", url: `${SITE_URL}/services/rag-knowledge-ai/` }
    ],
    service: {
      name: "RAG & Knowledge AI Services",
      description: "Deploy retrieval-augmented generation systems that ground AI responses in verified enterprise knowledge, reducing hallucinations and increasing trust.",
      serviceType: "RAG Development Services"
    },
    faqs: [
      { question: "What is RAG?", answer: "Retrieval-Augmented Generation (RAG) is an AI architecture that retrieves relevant information from a knowledge base before generating responses, grounding answers in verified content." },
      { question: "How does RAG prevent hallucinations?", answer: "By grounding responses in retrieved documents rather than relying solely on model knowledge, RAG significantly reduces fabricated answers." },
      { question: "What knowledge sources can be used?", answer: "Documents, databases, wikis, PDFs, internal knowledge bases, and structured data can all serve as knowledge sources." },
      { question: "How is this different from basic search?", answer: "RAG combines retrieval with generation, providing synthesized answers rather than just links to documents." },
      { question: "Can RAG work with our existing content?", answer: "Yes. AGIX builds RAG systems that integrate with existing knowledge repositories without requiring content migration." },
      { question: "How do you ensure answer accuracy?", answer: "Through source validation, confidence scoring, citations, and human-in-the-loop verification for high-stakes queries." },
      { question: "What about data security?", answer: "RAG systems include role-based access control, ensuring users only retrieve information they're authorized to see." },
      { question: "How long does implementation take?", answer: "Basic RAG systems can be deployed in 4–6 weeks. Enterprise implementations may take 8–12 weeks." },
      { question: "Can RAG scale to large knowledge bases?", answer: "Yes. Properly architected RAG systems handle millions of documents with appropriate indexing and retrieval strategies." },
      { question: "What maintenance is required?", answer: "Regular index updates, content refresh processes, and monitoring for retrieval quality." }
    ]
  },
  'ai-predictive-analytics': {
    webPage: {
      name: "AI Predictive Analytics",
      description: "Deploy predictive analytics powered by AI to forecast trends, identify risks, and make data-driven decisions with confidence."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "AI Predictive Analytics", url: `${SITE_URL}/services/ai-predictive-analytics/` }
    ],
    service: {
      name: "AI Predictive Analytics",
      description: "Build predictive models that forecast outcomes, identify patterns, and enable proactive decision-making across business operations.",
      serviceType: "Predictive Analytics Services"
    },
    faqs: [
      { question: "What is AI predictive analytics?", answer: "AI predictive analytics uses machine learning to analyze historical data and predict future outcomes, enabling proactive decision-making." },
      { question: "What can be predicted?", answer: "Customer churn, demand forecasting, risk assessment, equipment failures, sales outcomes, and many other business metrics." },
      { question: "How accurate are predictions?", answer: "Accuracy depends on data quality and the problem domain. Well-designed systems typically achieve 80–95% accuracy for suitable use cases." },
      { question: "What data is required?", answer: "Historical data relevant to the prediction target. AGIX helps identify required data and works with imperfect datasets." },
      { question: "How long until we see value?", answer: "Initial models can be deployed in 4–8 weeks, with accuracy improving as more data is collected." },
      { question: "Can predictions integrate with our workflows?", answer: "Yes. Predictive insights can trigger alerts, automate actions, and feed into decision support systems." },
      { question: "How do you ensure model fairness?", answer: "Through bias detection, fairness metrics, and regular model audits." },
      { question: "What happens when conditions change?", answer: "Models are designed for continuous learning and retraining as patterns evolve." },
      { question: "Is this suitable for regulated industries?", answer: "Yes. AGIX builds explainable models with audit trails suitable for regulatory requirements." },
      { question: "What expertise is needed on our side?", answer: "No data science expertise required. AGIX handles model development while you provide domain knowledge." }
    ]
  },
  'ai-computer-vision': {
    webPage: {
      name: "AI Computer Vision Services",
      description: "Deploy computer vision AI to analyze images and video, automate visual inspection, and extract insights from visual data."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "AI Computer Vision", url: `${SITE_URL}/services/ai-computer-vision/` }
    ],
    service: {
      name: "AI Computer Vision Services",
      description: "Build computer vision systems for image analysis, object detection, quality inspection, and visual data processing.",
      serviceType: "Computer Vision Development Services"
    },
    faqs: [
      { question: "What is computer vision?", answer: "Computer vision enables AI to understand and analyze images and video, detecting objects, patterns, and extracting meaningful information." },
      { question: "What applications does computer vision support?", answer: "Quality inspection, document processing, inventory monitoring, security surveillance, and visual search are common applications." },
      { question: "How accurate is computer vision?", answer: "Well-trained models achieve 95%+ accuracy for defined detection tasks, improving with more training data." },
      { question: "What data is needed to get started?", answer: "Labeled images of what you want to detect. AGIX can help with data collection and labeling strategies." },
      { question: "Can this work with our existing cameras?", answer: "Yes. Computer vision can integrate with existing camera infrastructure and video systems." },
      { question: "How long does implementation take?", answer: "Basic detection systems in 4–6 weeks. Complex multi-model systems may take 8–12 weeks." },
      { question: "What about processing at scale?", answer: "Systems are designed for high-throughput processing with appropriate infrastructure." },
      { question: "Is real-time processing possible?", answer: "Yes. Edge deployment and optimized models enable real-time visual analysis." },
      { question: "How do you handle edge cases?", answer: "Through confidence thresholds, human review queues, and continuous model improvement." },
      { question: "What industries benefit most?", answer: "Manufacturing, retail, healthcare, logistics, and security see significant value from computer vision." }
    ]
  },
  'custom-ai-product-development': {
    webPage: {
      name: "Custom AI Product Development Services",
      description: "Turn your idea into a market-ready AI product. We provide end-to-end AI MVP development, LLM engineering, deployment, and scaling with measurable ROI."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Custom AI Product Development", url: `${SITE_URL}/services/custom-ai-product-development/` }
    ],
    service: {
      name: "Custom AI Product Development Services",
      description: "End-to-end AI product development services from concept to deployment, including MVP development, LLM engineering, and scaling strategies.",
      serviceType: "Custom AI Product Development"
    },
    faqs: [
      { question: "Do I really need AI for my product, or am I forcing it?", answer: "Not every product needs AI. AGIX helps founders identify where AI adds real value, where rules or automation are sufficient, and what should be built later. If AI is not justified, this is communicated upfront to avoid wasted investment." },
      { question: "What's the difference between an AI MVP and a normal MVP?", answer: "A normal MVP tests product features. An AI MVP tests intelligence, usability, cost, latency, and user trust together. AI MVPs must account for data readiness, model behavior, cloud costs, and reliability, which requires a different design approach." },
      { question: "Can you build an AI product if I don't have data yet?", answer: "Yes. Options include using public or synthetic data, designing workflows that generate data, starting with rule-based or hybrid systems, and phasing AI gradually. Products are designed to progress even when data is limited initially." },
      { question: "How much does it actually cost to build an AI product?", answer: "Typical ranges include $12,000–$20,000 for an AI MVP or proof of concept, $20,000–$35,000 for a market-ready AI MVP, and $35,000–$60,000 or more for scalable AI products or platforms. Cost depends on scope and intelligence depth, not buzzwords." },
      { question: "How long does it take to launch an AI MVP?", answer: "Most AI MVPs launch in 4–6 weeks for validation-focused MVPs and 6–8 weeks for market-ready MVPs. Speed is prioritized without introducing long-term technical debt." },
      { question: "Will my AI product scale if users increase suddenly?", answer: "Yes, when designed correctly. AGIX builds scalable backend architecture, cost controls, rate limits, and modular AI components so growth is planned from the start rather than patched later." },
      { question: "What AI technologies do you use?", answer: "Technologies are selected based on product needs, cost efficiency, and long-term maintainability. This may include commercial or open-source models, vector databases, cloud infrastructure, and custom APIs. There is no fixed or one-size-fits-all stack." },
      { question: "Will my AI product be secure and compliant?", answer: "Yes. Systems are built with secure APIs, data access controls, privacy-aware architecture, and compliance best practices. For regulated industries, compliance-ready design is incorporated from the beginning." },
      { question: "Can you build AI SaaS products with subscriptions and billing?", answer: "Yes. AGIX builds multi-tenant AI SaaS products with usage tracking, subscription logic, billing integration, and role-based access control." },
      { question: "What happens after the MVP is launched?", answer: "After launch, support includes model tuning, feature iteration, cost optimization, scaling strategy, and investor or pilot demo preparation. AI products are treated as evolving systems, not one-time builds." },
      { question: "Is it better to hire an in-house AI team or outsource?", answer: "For early-stage startups, outsourcing often reduces cost, risk, and time-to-market compared to hiring. Many teams validate with AGIX first and hire internally after product traction is proven." },
      { question: "Can you work with non-technical founders?", answer: "Yes. Many clients are non-technical founders. AGIX explains trade-offs clearly, avoids unnecessary jargon, supports decision-making, and acts as a technical partner throughout the product journey." },
      { question: "Will my AI product be investor-ready?", answer: "Yes. Products are built with clean architecture, scalable systems, and demo-ready workflows. Many clients use AGIX-built products for accelerator programs, investor pitches, and early enterprise pilots." },
      { question: "What if my idea changes during development?", answer: "Idea changes are expected. Systems are designed with modular components and flexible architecture to support iteration and pivots without major rework." },
      { question: "How do I know if AGIX is the right partner for my AI product?", answer: "AGIX is a strong fit for founders who value clarity before building, want to avoid wasted spend, care about real users, and plan to scale responsibly. The focus is on building real products, not quick demos." }
    ]
  }
};

export const industriesPageSchemas: Record<string, PageSchemaData> = {
  'healthcare-ai-solutions': {
    webPage: {
      name: "Healthcare AI Solutions",
      description: "Explore AI-powered healthcare solutions that streamline workflows, empower clinicians, and boost patient outcomes at scale."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Healthcare AI Solutions", url: `${SITE_URL}/industries/healthcare-ai-solutions/` }
    ],
    service: {
      name: "Healthcare AI Solutions",
      description: "AI solutions for healthcare organizations designed to improve operational efficiency, decision-making, and patient experience with governance and compliance.",
      serviceType: "Healthcare AI Solutions"
    },
    faqs: [
      { question: "Is AI safe to use in healthcare environments?", answer: "Yes, when designed correctly. AGIX builds assistive AI systems with human-in-the-loop controls, explainability, and audit trails so AI supports care delivery without introducing clinical risk." },
      { question: "Will AI replace doctors, nurses, or clinicians?", answer: "No. AGIX does not build autonomous clinical decision systems. AI supports clinicians by reducing administrative burden and improving workflows, while final medical decisions always remain with humans." },
      { question: "How does AGIX ensure patient data privacy?", answer: "Patient data is handled with strict access controls, purpose limitation, and full traceability. Data is not used to train public AI models and remains governed under healthcare data protection standards." },
      { question: "Can AI integrate with our existing HIS or EMR systems?", answer: "Yes. AGIX designs AI systems to integrate with existing HIS, EMR, LIS, and billing platforms, avoiding system replacement or workflow disruption." },
      { question: "What healthcare processes benefit most from AI?", answer: "High-impact areas include patient intake and triage, clinical documentation support, follow-ups and care continuity, claims and revenue cycle workflows, and compliance and audit readiness." },
      { question: "How long does it take to implement healthcare AI?", answer: "Most healthcare AI systems are deployed within 4–8 weeks, depending on integration depth, data readiness, and governance requirements." },
      { question: "Is healthcare AI compliant with regulations?", answer: "AGIX systems are designed with compliance, explainability, and traceability as first-class requirements, making them suitable for regulated healthcare environments." },
      { question: "What happens if AI provides an incorrect recommendation?", answer: "AI outputs are non-binding and reviewable. Clinicians and administrators always validate recommendations before any action is taken." },
      { question: "Can small clinics and diagnostic centers use AI?", answer: "Yes. AGIX healthcare AI solutions are scalable and suitable for small clinics, diagnostic centers, specialty practices, and large hospital networks." },
      { question: "How does AI help reduce clinician burnout?", answer: "By assisting with documentation, triage support, and non-clinical tasks, AI reduces cognitive load and allows clinicians to focus more on patient care." }
    ]
  },
  'real-estate-ai-solutions': {
    webPage: {
      name: "Real Estate AI Solutions",
      description: "AI solutions for real estate teams to manage leads, automate follow-ups, and reduce deal leakage across high-volume sales pipelines."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Real Estate AI Solutions", url: `${SITE_URL}/industries/real-estate-ai-solutions/` }
    ],
    service: {
      name: "Real Estate AI Solutions",
      description: "Deploy AI solutions that respond to inquiries faster, prioritize leads, and keep real estate deals moving without manual dependency.",
      serviceType: "Industry AI Solutions"
    },
    faqs: [
      { question: "Is AI actually useful for individual real estate agents?", answer: "Yes. Individual agents often see fast ROI because AI ensures no inquiry or follow-up is missed while agents are driving, showing properties, or negotiating." },
      { question: "Will AI respond to leads faster than my team can?", answer: "Yes. AI responds instantly, 24/7, across calls, WhatsApp, website chat, and forms, even when agents are unavailable." },
      { question: "Can AI qualify leads before I speak to them?", answer: "Yes. AI asks structured qualification questions such as budget, timeline, intent, and location, then passes context-rich, high-intent leads to agents." },
      { question: "Will AI replace agents or salespeople?", answer: "No. AI handles repetitive communication and follow-ups, while humans focus on relationships, negotiations, and closing deals." },
      { question: "Can this work with my existing CRM and tools?", answer: "Yes. AGIX builds AI systems that integrate with existing CRMs, property portals, and workflows rather than replacing them." },
      { question: "How long does it take to go live?", answer: "Most real estate AI systems go live in 3–4 weeks for core lead handling, 4–6 weeks for full automation, and 6–9 weeks for predictive intelligence capabilities." }
    ]
  },
  'fintech-ai-solutions': {
    webPage: {
      name: "Fintech AI Solutions",
      description: "AI solutions for fintech companies to automate underwriting, detect fraud, and enhance customer experience with intelligent automation."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Fintech AI Solutions", url: `${SITE_URL}/industries/fintech-ai-solutions/` }
    ],
    service: {
      name: "Fintech AI Solutions",
      description: "Deploy AI in fintech to streamline lending decisions, improve fraud detection, and deliver personalized financial experiences at scale.",
      serviceType: "Industry AI Solutions"
    },
    faqs: [
      { question: "Is AI safe for financial decision-making?", answer: "Yes, when designed with appropriate governance, explainability, and human oversight for high-stakes decisions." },
      { question: "Can AI help with regulatory compliance?", answer: "Yes. AI systems can be designed with audit trails, explainable decisions, and compliance-aware logic." },
      { question: "How does AI improve fraud detection?", answer: "AI analyzes patterns across transactions, identifies anomalies, and flags suspicious activity faster than rule-based systems." },
      { question: "Can AI automate loan underwriting?", answer: "Yes. AI can accelerate underwriting by analyzing applications, verifying data, and providing risk assessments." },
      { question: "How long does implementation take?", answer: "Most fintech AI systems are deployed within 6–10 weeks, depending on integration complexity." }
    ]
  },
  'insurance-ai-solutions': {
    webPage: {
      name: "Insurance AI Solutions",
      description: "AI solutions for insurance companies to automate claims processing, improve underwriting accuracy, and enhance customer service."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Insurance AI Solutions", url: `${SITE_URL}/industries/insurance-ai-solutions/` }
    ],
    service: {
      name: "Insurance AI Solutions",
      description: "Deploy AI in insurance to streamline claims, improve risk assessment, and deliver better policyholder experiences.",
      serviceType: "Industry AI Solutions"
    },
    faqs: [
      { question: "Can AI automate claims processing?", answer: "Yes. AI can handle document extraction, validation, and routing, significantly reducing claims processing time." },
      { question: "How does AI improve underwriting?", answer: "AI analyzes more data points, identifies patterns, and provides more accurate risk assessments." },
      { question: "Is AI suitable for regulated insurance environments?", answer: "Yes. AGIX builds systems with compliance, auditability, and explainability as core requirements." },
      { question: "Can AI detect fraudulent claims?", answer: "Yes. AI identifies patterns and anomalies that may indicate fraud, flagging suspicious claims for review." },
      { question: "How long until we see ROI?", answer: "Most insurers see measurable improvements in processing speed and accuracy within 2–3 months." }
    ]
  },
  'retail-ai-solutions': {
    webPage: {
      name: "Retail AI Solutions",
      description: "AI solutions for retail and ecommerce to personalize shopping experiences, optimize inventory, and automate customer support."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Retail AI Solutions", url: `${SITE_URL}/industries/retail-ai-solutions/` }
    ],
    service: {
      name: "Retail AI Solutions",
      description: "Deploy AI in retail to personalize customer experiences, optimize operations, and scale customer support efficiently.",
      serviceType: "Industry AI Solutions"
    },
    faqs: [
      { question: "How does AI personalize shopping experiences?", answer: "AI analyzes customer behavior, preferences, and purchase history to deliver personalized recommendations and content." },
      { question: "Can AI help reduce cart abandonment?", answer: "Yes. AI assists customers during checkout, answers last-minute questions, and triggers intelligent follow-ups." },
      { question: "How does AI improve inventory management?", answer: "AI predicts demand, optimizes stock levels, and reduces both stockouts and overstock situations." },
      { question: "Can AI handle customer support at scale?", answer: "Yes. AI chatbots handle common queries, freeing human agents for complex issues." },
      { question: "How long does implementation take?", answer: "Most retail AI systems go live in 3–6 weeks, depending on scope and integrations." }
    ]
  },
  'logistics-ai-solutions': {
    webPage: {
      name: "Logistics AI Solutions",
      description: "Optimize your network with AI-powered logistics solutions. Predict demand, balance inventory, and eliminate delays with real-time supply chain visibility."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Logistics AI Solutions", url: `${SITE_URL}/industries/logistics-ai-solutions/` }
    ],
    service: {
      name: "Logistics AI Solutions",
      description: "Reduce costs and improve OTIF rates with AI-driven logistics solutions. Deploy intelligent routing and forecasting systems designed for global scale.",
      serviceType: "Industry AI Solutions"
    },
    faqs: [
      { question: "Will AI replace our ERP, WMS, or TMS?", answer: "No. AGIX builds AI layers that sit on top of existing systems. Your ERP, WMS, or TMS remains the system of record." },
      { question: "Can we start with one warehouse or route?", answer: "Yes. Most deployments begin with a pilot scope and expand after validation." },
      { question: "How does AI handle demand spikes?", answer: "AI uses time-series models and external signals to adapt to volatility rather than relying on static forecasts." },
      { question: "How long before we see measurable ROI?", answer: "Typical timelines are 30–60 days for routing improvements and 60–90 days for inventory optimization." },
      { question: "What data is required to get started?", answer: "Historical orders, inventory data, and route information. AGIX works with imperfect data and improves quality over time." }
    ]
  },
  'hospitality-ai-solutions': {
    webPage: {
      name: "Hospitality AI Solutions",
      description: "Enhance guest experiences with AI in hospitality. Reduce missed bookings, automate scheduling, and optimize staff operations at scale."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Hospitality AI Solutions", url: `${SITE_URL}/industries/hospitality-ai-solutions/` }
    ],
    service: {
      name: "Hospitality AI Solutions",
      description: "Deploy AI in hospitality to improve bookings, reduce no-shows, optimize staff workflows, and elevate guest satisfaction across properties.",
      serviceType: "Industry AI Solutions"
    },
    faqs: [
      { question: "Will AI make our guest experience feel robotic?", answer: "No. AGIX designs AI to work behind the scenes, supporting staff with context rather than replacing conversations or care." },
      { question: "Does AI ever talk to guests directly?", answer: "Only where appropriate, such as booking assistance, and always in a brand-aligned, warm tone." },
      { question: "Is AI suitable for boutique hotels?", answer: "Yes. Smaller properties often see the fastest value by reducing missed bookings and staff overload." },
      { question: "How do you protect guest privacy?", answer: "Through explicit consent, role-based access control, data minimization, and privacy-first design." },
      { question: "How long before we see impact?", answer: "Booking improvements typically appear within 2–4 weeks." }
    ]
  },
  'edtech-ai-solutions': {
    webPage: {
      name: "EdTech AI Solutions",
      description: "Enhance learning outcomes with AI in EdTech. Personalize paths, predict dropouts, and scale 24/7 support for students efficiently."
    },
    breadcrumbs: [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "EdTech AI Solutions", url: `${SITE_URL}/industries/edtech-ai-solutions/` }
    ],
    service: {
      name: "EdTech AI Solutions",
      description: "Deploy AI in EdTech to boost course completion, reduce faculty workload, provide intelligent tutoring, and improve student engagement.",
      serviceType: "Industry AI Solutions"
    },
    faqs: [
      { question: "Will AI replace teachers or mentors?", answer: "No. AGIX designs AI to support educators, not replace them. AI handles repetitive doubts and administrative load." },
      { question: "Is AI accurate for academic doubt-solving?", answer: "Yes. Answers are generated only from approved course content using Retrieval-Augmented Generation (RAG)." },
      { question: "Can this work with our existing LMS?", answer: "Yes. AGIX integrates with Moodle, Canvas, Blackboard, and custom LMS platforms." },
      { question: "How do you ensure academic integrity?", answer: "Through content-restricted answers, plagiarism checks, confidence thresholds, and faculty override controls." },
      { question: "How long before we see results?", answer: "Most institutions see measurable impact within 4–8 weeks." }
    ]
  }
};

export function generatePageSchema(path: string, data: PageSchemaData) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": data.webPage.name,
        "description": data.webPage.description,
        "isPartOf": { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
        "about": { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
        "inLanguage": "en",
        "publisher": { "@type": "Organization", "@id": `${SITE_URL}/#organization` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": data.breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        "name": data.service.name,
        "description": data.service.description,
        "serviceType": data.service.serviceType,
        "provider": { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
        "areaServed": { "@type": "AdministrativeArea", "name": "United States" },
        ...(data.service.audienceType && {
          "audience": { "@type": "Audience", "audienceType": data.service.audienceType }
        }),
        "availableChannel": { "@type": "ServiceChannel", "serviceUrl": url }
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": data.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };
}
