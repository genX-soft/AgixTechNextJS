"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2, GraduationCap, HeartPulse, Home, Landmark, Quote, ShoppingCart, Sparkles, Target, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    link: "/industries/healthcare-ai-solutions/",
    description: "Transform patient care with AI-powered diagnostics, automated clinical workflows, and intelligent health data management systems that improve outcomes while reducing costs.",
    useCases: [
      { name: "Patient Intake Automation", result: "75% faster registration" },
      { name: "Medical Document Processing", result: "95% accuracy rate" },
      { name: "Clinical Decision Support", result: "30% better diagnoses" },
      { name: "Insurance Verification", result: "Real-time eligibility" },
      { name: "Appointment Scheduling", result: "40% fewer no-shows" },
      { name: "Lab Result Analysis", result: "Instant interpretations" },
    ],
    stats: [{ value: "85%", label: "Faster Processing" }, { value: "$2.4M", label: "Annual Savings" }, { value: "95%", label: "Accuracy Rate" }],
    testimonial: "AGIX reduced our patient intake from 3 days to 3 hours. The accuracy improvements have been remarkable.",
    testimonialAuthor: "Chief Medical Officer, Regional Health Network",
  },
  {
    icon: Home,
    title: "Real Estate",
    link: "/industries/real-estate-ai-solutions/",
    description: "Accelerate property transactions with intelligent lead qualification, automated valuations, and seamless document management that closes deals faster.",
    useCases: [
      { name: "Lead Qualification & Scoring", result: "3x conversion rate" },
      { name: "Automated Property Valuation", result: "98% market accuracy" },
      { name: "Transaction Document Processing", result: "Same-day closings" },
      { name: "Market Trend Analysis", result: "Predictive insights" },
      { name: "Virtual Tour Scheduling", result: "24/7 availability" },
      { name: "Contract Review & Extraction", result: "90% faster review" },
    ],
    stats: [{ value: "3x", label: "Faster Closings" }, { value: "60%", label: "Less Manual Work" }, { value: "45%", label: "More Leads Converted" }],
    testimonial: "We went from losing deals due to slow processing to being the fastest agency in our market.",
    testimonialAuthor: "Broker, Premier Properties Group",
  },
  {
    icon: Landmark,
    title: "Fintech & Lending",
    link: "/industries/fintech-ai-solutions/",
    description: "Accelerate loan processing with AI-powered credit decisioning, fraud detection, and regulatory compliance automation that wins customers and protects margins.",
    useCases: [
      { name: "Instant Credit Scoring", result: "Real-time decisions" },
      { name: "Fraud Detection & Prevention", result: "99.2% detection rate" },
      { name: "Regulatory Compliance", result: "Automated reporting" },
      { name: "Document Verification", result: "Instant validation" },
      { name: "Risk Assessment Models", result: "Predictive accuracy" },
      { name: "Customer Onboarding", result: "5-minute KYC" },
    ],
    stats: [{ value: "60%", label: "Cost Reduction" }, { value: "4x", label: "Faster Approvals" }, { value: "35%", label: "More Applications" }],
    testimonial: "Speed became our competitive advantage. We now approve loans faster than our competitors can process applications.",
    testimonialAuthor: "VP of Lending, Mid-Size Credit Union",
  },
  {
    icon: Building2,
    title: "Insurance",
    link: "/industries/insurance-ai-solutions/",
    description: "Modernize claims processing with intelligent automation, predictive underwriting, and customer service AI that reduces costs while improving satisfaction.",
    useCases: [
      { name: "Claims Processing Automation", result: "70% faster resolution" },
      { name: "Underwriting Decision Support", result: "Better risk pricing" },
      { name: "Policy Document Analysis", result: "Instant extraction" },
      { name: "Fraud Pattern Detection", result: "$5M saved annually" },
      { name: "Customer Service Automation", result: "24/7 support" },
      { name: "Renewal Prediction", result: "Proactive retention" },
    ],
    stats: [{ value: "70%", label: "Faster Claims" }, { value: "40%", label: "Lower Costs" }, { value: "92%", label: "Customer Satisfaction" }],
    testimonial: "Claims that took weeks now take days. Our customers notice the difference, and so does our bottom line.",
    testimonialAuthor: "Chief Claims Officer, National Insurance Co.",
  },
  {
    icon: ShoppingCart,
    title: "Retail & eCommerce",
    link: "/industries/retail-ai-solutions/",
    description: "Drive conversions with personalized experiences, intelligent inventory management, and AI-powered customer service that scales with your business.",
    useCases: [
      { name: "Product Recommendations", result: "40% higher AOV" },
      { name: "Inventory Optimization", result: "25% less overstock" },
      { name: "Customer Support AI", result: "80% self-service rate" },
      { name: "Demand Forecasting", result: "95% accuracy" },
      { name: "Dynamic Pricing", result: "15% margin improvement" },
      { name: "Review Analysis", result: "Actionable insights" },
    ],
    stats: [{ value: "40%", label: "Higher Conversion" }, { value: "25%", label: "Less Stockouts" }, { value: "$1.8M", label: "Inventory Savings" }],
    testimonial: "Our AI-powered recommendations now drive 35% of our revenue. The personalization feels magic to customers.",
    testimonialAuthor: "Head of Digital, Fashion Retailer",
  },
  {
    icon: Truck,
    title: "Logistics & Supply Chain",
    link: "/industries/logistics-ai-solutions/",
    description: "Optimize operations with intelligent route planning, predictive demand forecasting, and warehouse automation that reduces costs and improves delivery times.",
    useCases: [
      { name: "Route Optimization", result: "20% fuel savings" },
      { name: "Demand Forecasting", result: "30% better accuracy" },
      { name: "Warehouse Automation", result: "50% faster picking" },
      { name: "Shipment Tracking AI", result: "Real-time visibility" },
      { name: "Supplier Risk Analysis", result: "Proactive mitigation" },
      { name: "Capacity Planning", result: "Optimal utilization" },
    ],
    stats: [{ value: "25%", label: "Cost Savings" }, { value: "30%", label: "Faster Delivery" }, { value: "99.5%", label: "On-Time Rate" }],
    testimonial: "We now predict demand before it happens. Our customers get faster deliveries and we spend less getting them there.",
    testimonialAuthor: "VP Operations, National Logistics Provider",
  },
  {
    icon: Sparkles,
    title: "Hospitality & Wellness",
    link: "/industries/hospitality-ai-solutions/",
    description: "Elevate guest experiences with personalized service, intelligent booking optimization, and operational automation that creates memorable stays.",
    useCases: [
      { name: "Guest Personalization", result: "50% higher satisfaction" },
      { name: "Smart Booking Optimization", result: "20% more revenue" },
      { name: "Concierge AI Assistants", result: "24/7 service" },
      { name: "Review Sentiment Analysis", result: "Proactive resolution" },
      { name: "Staff Scheduling", result: "Optimal coverage" },
      { name: "Upsell Recommendations", result: "35% attach rate" },
    ],
    stats: [{ value: "50%", label: "Better Reviews" }, { value: "20%", label: "Revenue Increase" }, { value: "4.8", label: "Star Average" }],
    testimonial: "Our AI concierge handles 60% of guest requests perfectly. Staff now focus on creating exceptional moments.",
    testimonialAuthor: "General Manager, Boutique Hotel Collection",
  },
  {
    icon: GraduationCap,
    title: "EdTech & E-Learning",
    link: "/industries/edtech-ai-solutions/",
    description: "Transform education with adaptive learning paths, automated content generation, and intelligent assessment systems that improve outcomes for every learner.",
    useCases: [
      { name: "Adaptive Learning Paths", result: "2x engagement" },
      { name: "Content Generation", result: "10x faster creation" },
      { name: "Automated Grading", result: "Instant feedback" },
      { name: "Student Support Chatbots", result: "24/7 tutoring" },
      { name: "Learning Analytics", result: "Intervention alerts" },
      { name: "Curriculum Optimization", result: "Data-driven updates" },
    ],
    stats: [{ value: "2x", label: "Engagement" }, { value: "45%", label: "Better Outcomes" }, { value: "80%", label: "Completion Rate" }],
    testimonial: "Students learn at their own pace with instant feedback. Completion rates have doubled since we implemented AGIX.",
    testimonialAuthor: "Chief Learning Officer, Online University",
  },
];

export default function IndustriesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndustry, setActiveIndustry] = useState(0);
  const current = industries[activeIndustry];

  return (
    <section className="py-24 bg-slate-950/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Industries We Serve</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="heading-industries">AI Solutions Tailored to Your Industry</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We understand the unique challenges of your sector. Explore our proven solutions with real results from businesses like yours.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap justify-center gap-2 mb-8 px-2">
          {industries.map((industry, index) => (
            <button key={industry.title} type="button" aria-label={`Show ${industry.title} industry solutions`} onClick={() => setActiveIndustry(index)} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all touch-target-sm ${activeIndustry === index ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"}`} data-testid={`button-industry-${index}`}>
              <industry.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span className="hidden xs:inline">{industry.title}</span>
              <span className="xs:hidden">{industry.title.split(" ")[0]}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeIndustry} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
                    <div className="space-y-5 sm:space-y-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/20">
                          <current.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold">{current.title}</h3>
                          <Badge variant="secondary" className="mt-1">Industry Solutions</Badge>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{current.description}</p>

                      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4">
                        {current.stats.map((stat) => (
                          <div key={stat.label} className="text-center">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-start gap-3">
                          <Quote className="h-6 w-6 text-primary/40 shrink-0 mt-1" aria-hidden="true" />
                          <div>
                            <p className="text-sm italic text-muted-foreground mb-2">&quot;{current.testimonial}&quot;</p>
                            <p className="text-xs text-muted-foreground">{current.testimonialAuthor}</p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" size="lg" asChild data-testid="button-industry-explore">
                        <Link href={current.link}>
                          Explore {current.title} Solutions
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 bg-muted/20">
                    <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
                      Key Use Cases & Results
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {current.useCases.map((useCase, i) => (
                        <motion.div key={useCase.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-background/50 border border-border/30">
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <p className="font-medium text-xs sm:text-sm">{useCase.name}</p>
                            <p className="text-[10px] sm:text-xs text-primary mt-1">{useCase.result}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h5 className="font-semibold text-sm sm:text-base">Ready to transform your {current.title.toLowerCase()} operations?</h5>
                          <p className="text-xs sm:text-sm text-muted-foreground">Schedule a free consultation to see how AI can help.</p>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto" asChild>
                          <a href="#contact">
                            Talk to an Expert
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
