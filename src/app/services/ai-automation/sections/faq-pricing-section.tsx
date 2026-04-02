'use client'
import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Calculator } from "lucide-react";

const faqs = [
  {
    question: "What are AI automation services?",
    answer: "AI automation services use artificial intelligence to automate business workflows, processes, documents, and communications that normally require human decision-making. Unlike basic automation, AI automation understands context, handles exceptions, makes decisions, and works across multiple systems. This is why businesses search for enterprise AI automation services rather than simple workflow tools."
  },
  {
    question: "What is the difference between AI automation and traditional automation?",
    answer: "Traditional automation relies on fixed rules and scripts, while AI automation uses intelligence to interpret inputs and make decisions. Traditional automation is rule-based, breaks on change, handles only structured data at task-level. AI automation is context-aware, adapts to new inputs, handles unstructured data, and operates at the process level. AI automation is designed for real-world operational complexity."
  },
  {
    question: "How is AI automation different from RPA?",
    answer: "RPA (Robotic Process Automation) mimics human clicks, works only on predictable inputs, and breaks when interfaces or formats change. AI automation understands emails, documents, and intent, handles variability and exceptions, and owns end-to-end processes. Many companies now use AI automation to replace or enhance RPA systems."
  },
  {
    question: "What business processes are best suited for AI automation?",
    answer: "Processes ideal for AI automation usually involve repetitive steps, high volume, decision-making, documents or emails, and multiple systems. Common examples include invoicing and billing, claims processing, customer onboarding, internal approvals, and support request handling."
  },
  {
    question: "How much do AI automation services cost?",
    answer: "AI automation pricing depends on process complexity, number of systems involved, decision logic required, and volume of transactions. Typical ranges: Simple workflow automation ($6,000–$10,000), Department-level automation ($10,000–$25,000), End-to-end process automation ($25,000–$60,000), Enterprise AI transformation ($60,000–$150,000+). Most businesses recover costs within 3–9 months through efficiency gains."
  },
  {
    question: "Is AI automation suitable for small or mid-sized businesses?",
    answer: "Yes. Many small and mid-sized businesses adopt AI automation to reduce hiring needs, eliminate manual errors, and scale operations efficiently. AI automation is often more affordable than adding headcount, especially as volumes grow."
  },
  {
    question: "How long does it take to implement AI automation?",
    answer: "Implementation timelines vary by scope: Email or document automation (3–6 weeks), Workflow automation across tools (4–8 weeks), Business process automation (8–12 weeks), Enterprise transformation programs (3–6 months phased). AGIX Technologies delivers automation in phases, so value is realized early."
  },
  {
    question: "Can AI automation integrate with existing software?",
    answer: "Yes. This is one of the most common buyer concerns. AI automation integrates with CRMs (Salesforce, HubSpot, custom systems), ERPs, email platforms, databases, cloud applications, and internal tools. You do not need to replace your existing systems — AI automation connects and enhances them."
  },
  {
    question: "Is AI automation secure for enterprise use?",
    answer: "Yes, when designed correctly. AGIX Technologies builds AI automation systems with role-based access control, audit logs, secure data pipelines, and compliance-ready architecture. This makes AI automation suitable for regulated industries such as healthcare, finance, and insurance."
  },
  {
    question: "Does AI automation require clean or perfect data?",
    answer: "No. AI automation is designed for real operational data, which is often incomplete or inconsistent. Systems are built to handle missing fields, interpret unstructured inputs, and flag exceptions for review. Data quality improves after automation, not before it."
  },
  {
    question: "Will AI automation replace human jobs?",
    answer: "AI automation replaces manual effort, not human judgment. AGIX Technologies designs systems that remove repetitive work, support better decision-making, and free teams for higher-value tasks. This is why businesses search for AI automation solutions, not job-replacement AI."
  },
  {
    question: "What is AI business process automation (BPA)?",
    answer: "AI Business Process Automation (BPA) automates entire business processes, not just individual tasks. It manages decisions, exceptions, workflow progression, and outcomes. Examples include order-to-cash, procure-to-pay, claims processing, and onboarding workflows."
  },
  {
    question: "How do we know what to automate first?",
    answer: "AGIX Technologies starts with an Automation Opportunity Assessment, which identifies high-ROI processes, low-risk automation candidates, and quick wins vs long-term opportunities. This prevents wasted investment — a key concern for buyers searching for AI automation services."
  },
  {
    question: "What industries use AI automation the most?",
    answer: "AI automation is actively used in healthcare operations, finance and FinTech, insurance, e-commerce, logistics and supply chain, manufacturing, and SaaS companies. Each industry has different automation triggers, which AGIX Technologies addresses through modular AI systems."
  },
  {
    question: "What results can businesses expect from AI automation?",
    answer: "Businesses typically see faster process execution, lower operational costs, reduced error rates, improved scalability, and higher team productivity. AI automation is no longer about incremental efficiency — it enables reliable operations at scale."
  }
];

const pricingTiers = [
  {
    title: "Project-Based Automation",
    description: "Workflow, document, or email automation",
    range: "$6,000 – $25,000",
    bestFor: ["Workflow automation", "Document automation", "Email automation"]
  },
  {
    title: "Process Automation Programs",
    description: "BPA and multi-department automation",
    range: "$25,000 – $60,000",
    bestFor: ["BPA", "Multi-department automation", "End-to-end processes"]
  },
  {
    title: "Enterprise Automation & Transformation",
    description: "AI-led digital transformation",
    range: "$60,000 – $150,000+",
    bestFor: ["AI-led digital transformation", "Legacy modernization", "Enterprise-wide systems"]
  }
];

export default function FaqPricingSection() {
  return (
    <>
      {/* FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Automation FAQs
            </h2>
            <p className="text-muted-foreground">
              Answers to the most common questions about AI automation services.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">
              <Calculator className="w-3 h-3 mr-1" />
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Automation Pricing Framework
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AGIX Technologies does not price AI automation per task or per hour. Pricing is based on
              business impact, process ownership, system complexity, and automation depth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${index === 1 ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{tier.title}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>

                    <p className="text-2xl font-bold text-primary">{tier.range}</p>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Best for:</p>
                      <ul className="space-y-1">
                        {tier.bestFor.map((item, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
