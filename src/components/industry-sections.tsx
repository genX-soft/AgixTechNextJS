'use client'
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export interface CaseStudyCard {
  company: string;
  description: string;
  impact: string[];
  href: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  useCases: string[];
  href: string;
  ctaText: string;
}

interface IndustryCaseStudiesProps {
  caseStudies: CaseStudyCard[];
}

interface IndustryServicesProps {
  services: ServiceCard[];
}

export function IndustryCaseStudies({ caseStudies }: IndustryCaseStudiesProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">Real Results</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI in Action:{" "}
            <span className="text-primary">Real Industry Case Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how organizations are deploying AI to solve real operational challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col border-border/60 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                    Case Study
                  </p>
                  <h3 className="text-xl font-bold mb-3">{cs.company}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                    {cs.description}
                  </p>
                  <div className="mb-6 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Key Impact
                    </p>
                    <ul className="space-y-2">
                      {cs.impact.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild variant="outline" className="w-full group" size="sm">
                    <Link href={cs.href} data-testid={`button-case-study-${cs.company.toLowerCase().replace(/\s+/g, '-')}`}>
                      View Case Study
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustryServices({ services }: IndustryServicesProps) {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            AI Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Solutions Built{" "}
            <span className="text-primary">For This Industry</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            AGIX builds custom AI systems tailored to your industry&apos;s specific challenges and workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col border-border/60 hover:border-primary/40 transition-colors">
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {svc.description}
                  </p>
                  <div className="mb-6 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Use Cases
                    </p>
                    <ul className="space-y-1.5">
                      {svc.useCases.map((uc) => (
                        <li key={uc} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="w-full group" size="sm">
                    <Link href={svc.href} data-testid={`button-service-${svc.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {svc.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
