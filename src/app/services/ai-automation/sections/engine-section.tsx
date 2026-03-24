'use client'
import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Brain,
  Database,
  Zap,
  Activity,
  Shield,
  Settings,
} from "lucide-react";

const engineLayers = [
  {
    number: 1,
    title: "Automation Opportunity Intelligence",
    subtitle: "Discovery That Actually Finds ROI",
    icon: Search,
    purpose: "Identify what should be automated first — not everything.",
    activities: [
      "Process mining & workflow mapping",
      "Bottleneck identification",
      "Cost-of-manual-work analysis",
      "Risk & compliance mapping"
    ],
    outputs: [
      "Automation Opportunity Map",
      "Priority heatmap (High ROI → Low ROI)",
      "Automation readiness score"
    ]
  },
  {
    number: 2,
    title: "Intelligence Architecture Design",
    subtitle: "Where AI Is Actually Engineered",
    icon: Brain,
    purpose: "Decide how intelligence flows, not just which tools to use.",
    activities: [
      "AI decision points",
      "Human-in-the-loop checkpoints",
      "Fail-safe logic",
      "Exception handling paths"
    ],
    outputs: [
      "Node-based system diagram",
      "AI decision vs human review mapping",
      "Before/After automation comparison"
    ]
  },
  {
    number: 3,
    title: "System & Data Integration",
    subtitle: "Automation Only Works If Systems Talk",
    icon: Database,
    purpose: "Connect tools, data, and workflows into one automation fabric.",
    activities: [
      "CRM / ERP systems integration",
      "Database connections",
      "Email platform integration",
      "Cloud apps & internal tools"
    ],
    outputs: [
      "API-first integration layer",
      "Data flow architecture",
      "System connectivity map"
    ]
  },
  {
    number: 4,
    title: "AI Execution & Orchestration",
    subtitle: "Where Automation Comes Alive",
    icon: Zap,
    purpose: "Execute workflows with intelligence, not scripts.",
    activities: [
      "AI interprets inputs",
      "Decisions made dynamically",
      "Actions executed across systems",
      "Exceptions handled gracefully"
    ],
    outputs: [
      "AI Workflow Automation",
      "AI BPA",
      "Document Intelligence",
      "Email & Communication Automation"
    ]
  },
  {
    number: 5,
    title: "Monitoring, Optimization & Learning",
    subtitle: "Automation That Improves Over Time",
    icon: Activity,
    purpose: "Ensure automation delivers measurable business outcomes.",
    activities: [
      "Processing time reduction tracking",
      "Error rate monitoring",
      "Cost savings measurement",
      "Throughput improvement analysis"
    ],
    outputs: [
      "Live metric dashboards",
      "Performance trend reports",
      "Week 1 vs Week 12 comparisons"
    ]
  },
  {
    number: 6,
    title: "Governance, Security & Scale",
    subtitle: "Enterprise Trust Layer",
    icon: Shield,
    purpose: "Make automation safe, auditable, and scalable.",
    activities: [
      "Role-based access control",
      "Audit logs",
      "Compliance checkpoints",
      "Data security policies"
    ],
    outputs: [
      "SOC2-aligned practices",
      "HIPAA-ready systems",
      "Enterprise risk management"
    ]
  }
];

export default function EngineSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">
            <Settings className="w-3 h-3 mr-1" />
            Delivery System
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The AGIX Automation Engine
          </h2>
          <p className="text-xl text-muted-foreground">
            A 6-Layer System for Building Scalable AI Automation
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Most vendors automate workflows. AGIX engineers an automation operating layer for your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineLayers.map((layer, index) => (
            <motion.div
              key={layer.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {layer.number}
                    </div>
                    <layer.icon className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-bold">{layer.title}</h3>
                    <p className="text-sm text-muted-foreground">{layer.subtitle}</p>
                  </div>

                  <p className="text-sm text-muted-foreground">{layer.purpose}</p>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Activities:</p>
                    <ul className="space-y-1">
                      {layer.activities.slice(0, 3).map((activity, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {activity}
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
