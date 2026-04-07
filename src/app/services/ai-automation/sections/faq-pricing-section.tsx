'use client'
import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calculator } from "lucide-react";

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

export default function PricingSection() {
  return (
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
  );
}
