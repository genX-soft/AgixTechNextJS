'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Brain,
  Bot,
  MessageSquare,
  Phone,
  Code,
  Database,
  Workflow,
  Users,
  Lightbulb,
  Target,
  CheckCircle2,
  Sparkles,
  Mail,
  GraduationCap,
  Building2,
  Globe,
  Layers,
  Cpu,
  Server,
} from "lucide-react";

const whyWorkHere = [
  { text: "Work on real production AI systems, not experiments", icon: Target },
  { text: "Exposure to global clients across healthcare, fintech, real estate, SaaS", icon: Globe },
  { text: "Strong focus on architecture, reasoning, and system design", icon: Layers },
  { text: "Opportunity to work across AI, automation, data, and engineering", icon: Cpu },
  { text: "A culture that values thinking, ownership, and responsibility", icon: Lightbulb },
];

const whoWeLookFor = [
  "Think in systems, not just tools",
  "Care about why before how",
  "Can balance innovation with reliability",
  "Want to grow in a fast-evolving AI ecosystem",
];

const jobPositions = [
  {
    id: "ai-engineer",
    title: "AI Engineer – LLMs & Generative AI",
    category: "AI",
    icon: Brain,
    overview: "As an AI Engineer at AGIX, you will design and build LLM-powered systems such as RAG pipelines, AI assistants, and reasoning workflows that operate reliably in production environments.",
    responsibilities: [
      "Build and deploy LLM-based applications using structured and unstructured data",
      "Design and optimize RAG pipelines for accuracy and relevance",
      "Implement prompt strategies, memory handling, and context control",
      "Integrate LLMs with backend services, APIs, and databases",
      "Monitor and improve AI performance, latency, and reliability",
    ],
    required: [
      "Strong experience with Python or Node.js",
      "Hands-on experience with LLMs (OpenAI, Claude, Gemini, etc.)",
      "Understanding of embeddings, vector databases, and retrieval logic",
      "Experience building APIs and backend services",
    ],
    niceToHave: [
      "Experience with LangChain or LlamaIndex",
      "Exposure to production AI monitoring and evaluation",
    ],
    emailSubject: "Application – AI Engineer (LLMs)",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Systems Engineer",
    category: "AI",
    icon: Bot,
    overview: "You will work on goal-driven AI systems where agents plan, reason, act, and collaborate across tools and services.",
    responsibilities: [
      "Design and build autonomous or semi-autonomous AI agents",
      "Implement planning, tool usage, memory, and decision logic",
      "Orchestrate multi-agent workflows across systems",
      "Ensure reliability, traceability, and safe execution",
    ],
    required: [
      "Strong backend engineering skills",
      "Experience working with LLM-based agents or AI workflows",
      "Understanding of system orchestration and state management",
    ],
    niceToHave: [
      "Experience with multi-agent frameworks",
      "Knowledge of AI governance or safety practices",
    ],
    emailSubject: "Application – Agentic AI Systems Engineer",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation Engineer (AI + n8n / Make / Zapier)",
    category: "Automation",
    icon: Workflow,
    overview: "This role focuses on automating real business workflows using AI and modern automation platforms.",
    responsibilities: [
      "Design and implement automation workflows using n8n, Make, or Zapier",
      "Integrate AI services with CRMs, ERPs, and SaaS tools",
      "Optimize workflows for reliability and scalability",
      "Troubleshoot automation failures and edge cases",
    ],
    required: [
      "Experience with workflow automation platforms",
      "Strong understanding of APIs, webhooks, and integrations",
      "Basic understanding of AI/LLM usage",
    ],
    niceToHave: [
      "Experience automating enterprise systems",
      "Familiarity with data transformation and logic handling",
    ],
    emailSubject: "Application – Workflow Automation Engineer",
  },
  {
    id: "conversational-ai",
    title: "Conversational AI Engineer (Chat & Assistants)",
    category: "AI",
    icon: MessageSquare,
    overview: "You will design conversational systems that understand context, maintain memory, and interact naturally with users.",
    responsibilities: [
      "Build chat-based AI assistants for support, sales, and internal tools",
      "Design conversation flows and intent handling",
      "Integrate conversational AI with backend systems",
      "Improve response quality and reduce hallucinations",
    ],
    required: [
      "Experience with NLP or LLM-based chat systems",
      "Backend integration skills",
      "Understanding of conversational UX",
    ],
    niceToHave: [
      "Experience with multi-turn conversation design",
      "Exposure to analytics or conversation evaluation",
    ],
    emailSubject: "Application – Conversational AI Engineer",
  },
  {
    id: "voice-ai",
    title: "Voice AI Engineer",
    category: "AI",
    icon: Phone,
    overview: "This role focuses on real-time voice agents used in customer support, operations, and sales environments.",
    responsibilities: [
      "Build real-time voice AI systems",
      "Integrate speech-to-text and text-to-speech pipelines",
      "Handle latency, call flow logic, and interruptions",
      "Ensure voice systems work reliably at scale",
    ],
    required: [
      "Experience with voice or speech systems",
      "Backend development experience",
      "Understanding of real-time systems",
    ],
    niceToHave: [
      "Experience with telephony or call-based systems",
      "Audio processing knowledge",
    ],
    emailSubject: "Application – Voice AI Engineer",
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer (AI Systems)",
    category: "Engineering",
    icon: Server,
    overview: "You will build the backbone that powers AGIX's AI systems — APIs, services, and integrations.",
    responsibilities: [
      "Design and develop scalable backend services",
      "Integrate AI models and workflows into applications",
      "Ensure system performance, security, and reliability",
      "Collaborate closely with AI and product teams",
    ],
    required: [
      "Strong experience with Python or Node.js",
      "API and database design experience",
      "Understanding of scalable system design",
    ],
    niceToHave: [
      "Experience supporting AI-heavy applications",
    ],
    emailSubject: "Application – Backend Engineer",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    category: "Data",
    icon: Database,
    overview: "You will build the data foundations that power AI and decision systems.",
    responsibilities: [
      "Design and maintain data pipelines (ETL/ELT)",
      "Ensure data quality, consistency, and availability",
      "Support analytics and AI model needs",
    ],
    required: [
      "Strong SQL and data modeling skills",
      "Experience with data pipelines and storage systems",
    ],
    niceToHave: [
      "Experience supporting AI or ML workflows",
    ],
    emailSubject: "Application – Data Engineer",
  },
  {
    id: "rag-engineer",
    title: "RAG & Knowledge Systems Engineer",
    category: "AI",
    icon: Layers,
    overview: "This role focuses on building enterprise knowledge systems using retrieval and semantic search.",
    responsibilities: [
      "Implement RAG pipelines and vector search systems",
      "Optimize retrieval accuracy and relevance",
      "Work with structured and unstructured knowledge sources",
    ],
    required: [
      "Experience with vector databases (Pinecone, Weaviate, Qdrant, etc.)",
      "Strong understanding of embeddings and retrieval logic",
    ],
    niceToHave: [
      "Knowledge graph or semantic search experience",
    ],
    emailSubject: "Application – RAG Engineer",
  },
  {
    id: "technical-pm",
    title: "Technical Product Manager (AI Systems)",
    category: "Product",
    icon: Building2,
    overview: "You will bridge business needs with AI system design and delivery.",
    responsibilities: [
      "Translate client problems into clear system requirements",
      "Define AI product roadmaps and priorities",
      "Coordinate between engineering, AI, and stakeholders",
    ],
    required: [
      "Experience managing technical or AI products",
      "Strong communication and documentation skills",
    ],
    niceToHave: [
      "Background in engineering or data",
    ],
    emailSubject: "Application – Technical Product Manager",
  },
  {
    id: "ai-intern",
    title: "AI Intern / Trainee Engineer",
    category: "Entry Level",
    icon: GraduationCap,
    overview: "An entry-level role for candidates looking to build a strong foundation in AI systems.",
    responsibilities: [
      "Assist senior engineers in AI development",
      "Learn AI workflows, tools, and system design",
      "Participate in real projects",
    ],
    required: [
      "Basic programming knowledge",
      "Strong learning mindset and curiosity",
    ],
    niceToHave: [
      "Exposure to AI or ML concepts",
    ],
    emailSubject: "Application – AI Intern",
  },
];

const categories = ["All", "AI", "Engineering", "Automation", "Data", "Product", "Entry Level"];

export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredJobs = selectedCategory === "All" 
    ? jobPositions 
    : jobPositions.filter(job => job.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      <section className="relative min-h-[80vh] flex items-center pt-24 lg:pt-28 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4" data-testid="badge-careers">
                Join Our Team
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" data-testid="heading-careers-hero">
                Careers at AGIX Technologies
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl sm:text-2xl font-medium text-primary whitespace-nowrap"
            >
              Build Intelligent Systems. Solve Real Problems. Grow With Purpose.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              At AGIX, we don't just work with AI — we design intelligent systems that businesses rely on. If you care about clarity over hype, engineering over demos, and impact over buzzwords, you'll feel at home here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-view-positions"
              >
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-8 lg:gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-testid="heading-why-work">
                  Why Work at AGIX?
                </h2>
              </div>

              <div className="space-y-4">
                {whyWorkHere.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground pt-2">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-px bg-border" />

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-testid="heading-who-looking">
                  Who We're Looking For
                </h2>
                <p className="text-muted-foreground mb-6">We hire people who:</p>
              </div>

              <div className="space-y-4">
                {whoWeLookFor.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="open-positions" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" data-testid="heading-open-positions">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              Across AI, Engineering, Data, Automation & Product
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem value={job.id} className="border rounded-lg px-0 overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50" data-testid={`accordion-${job.id}`}>
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <job.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{job.title}</div>
                          <Badge variant="secondary" className="mt-1">{job.category}</Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6 pt-4">
                        <div>
                          <h4 className="font-semibold mb-2">Role Overview</h4>
                          <p className="text-muted-foreground">{job.overview}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Key Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Required Skills & Experience</h4>
                          <ul className="space-y-2">
                            {job.required.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {job.niceToHave.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">Nice to Have</h4>
                            <ul className="space-y-2">
                              {job.niceToHave.map((nice, i) => (
                                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                  <Sparkles className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                  {nice}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <Card className="border-primary/20 bg-primary/5">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                <span className="font-medium">Send Resume:</span>
                                <a 
                                  href="mailto:hello@agixtech.com" 
                                  className="text-primary hover:underline"
                                  data-testid={`link-email-${job.id}`}
                                >
                                  hello@agixtech.com
                                </a>
                              </div>
                              <Badge variant="outline">Subject: {job.emailSubject}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No positions available in this category at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Users className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" data-testid="heading-closing-cta">
              Ready to Build Something Meaningful?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join a team that values real engineering, clear thinking, and systems that actually work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25"
                onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-closing-view-positions"
              >
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
                data-testid="button-closing-contact"
              >
                <a href="/corporate/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
