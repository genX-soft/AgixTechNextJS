'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HelpCircle, Minus, Plus } from "lucide-react";

const faqs = [
  { question: "What is the difference between Operational Intelligence and Business Intelligence?", answer: "Business Intelligence focuses on historical data analysis and reporting to understand what happened. Operational Intelligence focuses on real-time monitoring and decision-making to respond to what's happening now. While BI helps you learn from the past, OI helps you act in the present." },
  { question: "How long does it take to implement Operational Intelligence?", answer: "Implementation timelines vary based on complexity. Observational Intelligence systems can be deployed in 6-8 weeks. Assistive systems typically take 8-12 weeks. Full Decision Intelligence with controlled autonomy may require 12-16 weeks. We start with quick wins and expand gradually." },
  { question: "Do we need to replace our existing systems?", answer: "No. Operational Intelligence integrates with your existing tools, databases, and workflows. We connect to your current systems through APIs and data feeds, adding an intelligence layer without disrupting what already works." },
  { question: "How does AI handle sensitive business decisions?", answer: "Our systems include human-in-the-loop controls for critical decisions. AI can recommend, draft, or prepare actions, but humans approve high-stakes decisions. Every AI decision is logged, traceable, and explainable." },
  { question: "What industries benefit most from Operational Intelligence?", answer: "Any industry with complex operations benefits. Healthcare, finance, logistics, retail, manufacturing, and professional services see significant improvements. The key factor is having repeatable processes with decision points that can be optimized." },
  { question: "How is this different from simple automation?", answer: "Automation executes predefined rules. Operational Intelligence observes, understands context, and decides. It can handle exceptions, prioritize dynamically, and improve over time. Automation is a subset of what OI can orchestrate." },
  { question: "What kind of ROI can we expect from Operational Intelligence?", answer: "Most organizations see 30-50% reduction in operational delays, 40-60% faster decision cycles, and 20-35% cost savings within the first year. ROI depends on your current operational maturity and the complexity of processes being optimized." },
  { question: "How does Operational Intelligence handle data security and privacy?", answer: "We implement enterprise-grade security including end-to-end encryption, role-based access controls, and compliance with GDPR, HIPAA, and SOC 2 standards. Data can be processed on-premise or in secure cloud environments based on your requirements." },
  { question: "Can Operational Intelligence work with legacy systems?", answer: "Yes. Our integration approach supports legacy systems through APIs, database connections, file-based integrations, and screen scraping when necessary. We've successfully integrated with systems dating back decades." },
  { question: "What happens when the AI makes a wrong decision?", answer: "Every AI decision includes confidence scores and reasoning. Low-confidence decisions are flagged for human review. All decisions are logged with full audit trails, allowing you to identify issues, retrain models, and continuously improve accuracy." },
  { question: "How do you measure the success of an OI implementation?", answer: "We establish baseline metrics before implementation, then track KPIs including decision speed, error rates, escalation frequency, cost per transaction, and employee satisfaction. Monthly reviews ensure continuous alignment with business goals." },
  { question: "What level of technical expertise does our team need?", answer: "No coding or technical expertise required for day-to-day operations. We provide intuitive dashboards and interfaces. Your team will receive training on system oversight, while AGIX handles all technical maintenance and updates." },
  { question: "Can we start small and scale up later?", answer: "Absolutely. We recommend starting with a single department or process as a pilot. This approach validates the value quickly, builds internal confidence, and creates a foundation for broader deployment across the organization." },
  { question: "How does Operational Intelligence improve over time?", answer: "The system continuously learns from outcomes, user feedback, and changing patterns. Machine learning models are retrained regularly. As your business evolves, the intelligence layer adapts to new processes, exceptions, and requirements." },
  { question: "What support and maintenance is included?", answer: "All implementations include 24/7 monitoring, regular system health checks, proactive optimization recommendations, and dedicated support. We provide quarterly business reviews to ensure the system continues meeting your evolving needs." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 mb-4" data-testid="badge-faq">
            <HelpCircle className="w-3 h-3 mr-1" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-faq">
            Common Questions About Operational Intelligence
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-visible" data-testid={`card-faq-${i}`}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4"
                  aria-expanded={openIndex === i}
                  data-testid={`button-faq-toggle-${i}`}
                >
                  <span className="font-medium" data-testid={`text-faq-question-${i}`}>{faq.question}</span>
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-orange-500 text-white' : 'bg-slate-700'}`}>
                    {openIndex === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 text-muted-foreground text-sm" data-testid={`text-faq-answer-${i}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
