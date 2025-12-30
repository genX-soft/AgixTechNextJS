import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowDown, CheckCircle2 } from "lucide-react";

interface FlowchartStep {
  title: string;
  description: string;
  highlight?: boolean;
}

export function ProcessFlowchart({ steps, title }: { steps: FlowchartStep[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-lg border-2 ${
                step.highlight 
                  ? "bg-primary/10 border-primary/50" 
                  : "bg-card border-border/50"
              } min-w-[180px] text-center`}
            >
              <p className="font-semibold text-sm">{step.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
            </motion.div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  milestone?: boolean;
}

export function VerticalTimeline({ events, title }: { events: TimelineEvent[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
            >
              <div className="hidden md:block w-1/2" />
              <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${
                event.milestone ? 'bg-primary' : 'bg-muted-foreground'
              }`} />
              <div className="ml-10 md:ml-0 md:w-1/2">
                <Card className={event.milestone ? "border-primary/30" : ""}>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">{event.date}</Badge>
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface WaterfallItem {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}

export function WaterfallChart({ items, title }: { items: WaterfallItem[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4"
          >
            <div className="w-1/3 text-sm text-right text-muted-foreground">
              {item.label}
            </div>
            <div className="flex-1 relative">
              <div className="h-8 bg-muted rounded-md overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, parseInt(item.value) || 50)}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`h-full ${item.positive !== false ? 'bg-green-500/70' : 'bg-red-500/70'}`}
                />
              </div>
            </div>
            <div className="w-20 text-right">
              <span className="font-semibold">{item.value}</span>
              <Badge className={`ml-2 text-xs ${item.positive !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {item.delta}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface ArchitectureDiagramNode {
  name: string;
  type: "input" | "process" | "output" | "storage";
  description?: string;
}

interface ArchitectureDiagramRow {
  nodes: ArchitectureDiagramNode[];
}

export function ArchitectureDiagram({ rows, title }: { rows: ArchitectureDiagramRow[]; title: string }) {
  const getNodeStyle = (type: string) => {
    switch (type) {
      case "input": return "bg-blue-500/20 border-blue-500/50 text-blue-400";
      case "process": return "bg-purple-500/20 border-purple-500/50 text-purple-400";
      case "output": return "bg-green-500/20 border-green-500/50 text-green-400";
      case "storage": return "bg-amber-500/20 border-amber-500/50 text-amber-400";
      default: return "bg-muted border-border";
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="space-y-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center gap-4 flex-wrap">
            {row.nodes.map((node, nodeIndex) => (
              <div key={nodeIndex} className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (rowIndex * 0.1) + (nodeIndex * 0.05) }}
                  className={`p-3 rounded-lg border-2 ${getNodeStyle(node.type)} min-w-[120px] text-center`}
                >
                  <p className="font-semibold text-sm">{node.name}</p>
                  {node.description && (
                    <p className="text-xs opacity-80 mt-1">{node.description}</p>
                  )}
                </motion.div>
                {nodeIndex < row.nodes.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        ))}
        {rows.length > 1 && (
          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}

interface ComparisonItem {
  aspect: string;
  before: string;
  after: string;
}

export function BeforeAfterComparison({ items, title }: { items: ComparisonItem[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-3 bg-muted/50 p-3 font-semibold text-sm">
          <div>Aspect</div>
          <div className="text-center text-red-400">Before</div>
          <div className="text-center text-green-400">After</div>
        </div>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-3 p-3 border-t border-border text-sm"
          >
            <div className="font-medium">{item.aspect}</div>
            <div className="text-center text-muted-foreground">{item.before}</div>
            <div className="text-center font-semibold text-green-400">{item.after}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface JourneyStage {
  stage: string;
  userAction: string;
  systemResponse: string;
  outcome: string;
}

export function UserJourneyMap({ stages, title }: { stages: JourneyStage[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-4 gap-2 mb-2">
            <div className="p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stage</div>
            <div className="p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">User Action</div>
            <div className="p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">AI Response</div>
            <div className="p-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Outcome</div>
          </div>
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-4 gap-2 mb-2"
            >
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-3">
                  <p className="font-semibold text-sm">{stage.stage}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground">{stage.userAction}</p>
                </CardContent>
              </Card>
              <Card className="bg-cyan-500/10 border-cyan-500/30">
                <CardContent className="p-3">
                  <p className="text-sm">{stage.systemResponse}</p>
                </CardContent>
              </Card>
              <Card className="bg-green-500/10 border-green-500/30">
                <CardContent className="p-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-sm">{stage.outcome}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface MetricCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export function MetricsDashboard({ metrics, title }: { metrics: MetricCard[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  {metric.icon}
                </div>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  {metric.change}
                </Badge>
                <p className="text-xs text-slate-400 mt-2">{metric.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface DecisionNode {
  question: string;
  yesPath: string;
  noPath: string;
}

export function DecisionTree({ nodes, title }: { nodes: DecisionNode[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="space-y-6">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/30 text-center max-w-md">
              <p className="font-semibold">{node.question}</p>
            </div>
            <div className="flex gap-12 mt-4">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-green-500" />
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">Yes</Badge>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center text-sm max-w-[150px]">
                  {node.yesPath}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-red-500" />
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-2">No</Badge>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-center text-sm max-w-[150px]">
                  {node.noPath}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface StackLayer {
  name: string;
  components: string[];
  color: string;
}

export function TechStack({ layers, title }: { layers: StackLayer[]; title: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="max-w-2xl mx-auto space-y-2">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg border-2 ${layer.color}`}
          >
            <p className="font-semibold text-sm mb-2">{layer.name}</p>
            <div className="flex flex-wrap gap-2">
              {layer.components.map((comp, j) => (
                <Badge key={j} variant="outline" className="text-xs">
                  {comp}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
