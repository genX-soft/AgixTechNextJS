'use client'
import { useState, useRef } from "react";
import { motion, useInView } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HelpCircle, Minus, Plus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mb-4"
            data-testid="badge-faq"
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            Frequently Asked Questions
          </Badge>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="heading-faq"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Card className="overflow-hidden" data-testid={`card-faq-${i}`}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    data-testid={`button-faq-toggle-${i}`}
                  >
                    <span
                      className="font-medium"
                      data-testid={`text-faq-question-${i}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </div>
                  </button>

                  {/* Answer always in DOM — hidden via CSS only, not conditional rendering */}
                  <div
                    id={`faq-answer-${i}`}
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div
                      className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed"
                      data-testid={`text-faq-answer-${i}`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
