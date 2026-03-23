"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "@/lib/motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "As a startup, we needed speed and flexibility. AGIX delivered a working prototype in 6 weeks that we're still scaling today.",
    author: "Lisa Park",
    role: "Founder & CEO",
    company: "DataSync",
  },
  {
    quote: "Our customer service response time dropped by 70% after implementing their AI chatbot. It handles 80% of queries without human intervention.",
    author: "James Anderson",
    role: "Director of Customer Experience",
    company: "RetailMax",
  },
  {
    quote: "The predictive analytics solution helped us reduce inventory costs by 40%. We now know what customers want before they do.",
    author: "Priya Sharma",
    role: "Chief Supply Chain Officer",
    company: "GlobalMart",
  },
  {
    quote: "AGIX's voice AI agents are handling 5,000 calls daily for us. The quality is indistinguishable from human agents.",
    author: "David Mueller",
    role: "Head of Operations",
    company: "InsureFirst",
  },
  {
    quote: "We automated our entire compliance workflow. What used to take a team of 12 now runs automatically with 99.8% accuracy.",
    author: "Amanda Foster",
    role: "Chief Compliance Officer",
    company: "Apex Financial",
  },
  {
    quote: "Their computer vision system catches defects our human inspectors miss. Quality issues dropped by 90% in three months.",
    author: "Robert Kim",
    role: "Manufacturing Director",
    company: "PrecisionTech",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Client Stories
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-testimonials">
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            className="border-border/50"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <CardContent className="p-8 md:p-12 text-center relative">
              <Quote className="h-12 w-12 text-primary/20 absolute top-6 left-6" aria-hidden="true" />

              <button
                onClick={goToPrev}
                aria-label="Previous testimonial"
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                onClick={goToNext}
                aria-label="Next testimonial"
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                data-testid="button-testimonial-next"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 px-8"
                >
                  <p className="text-lg md:text-xl text-foreground italic leading-relaxed">
                    &quot;{testimonials[activeIndex].quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonials[activeIndex].author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex ? "bg-primary" : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                    data-testid={`button-testimonial-${index}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
