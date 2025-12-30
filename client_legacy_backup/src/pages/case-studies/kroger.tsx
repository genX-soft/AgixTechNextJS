import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ShoppingCart,
  Brain,
  Clock,
  AlertTriangle,
  TrendingUp,
  Quote,
  ArrowRight,
  Package,
  MapPin,
  Truck,
  Users,
  Target,
} from "lucide-react";
import { Link } from "wouter";

export default function KrogerCaseStudyPage() {
  const pickOptimization = [
    { metric: "Average Pick Path", before: "4.2 miles/shift", after: "2.1 miles/shift", improvement: "-50%" },
    { metric: "Pick Time (30 items)", before: "45 minutes", after: "24 minutes", improvement: "-47%" },
    { metric: "Items per Hour", before: "40 items", after: "75 items", improvement: "+87%" },
    { metric: "Wrong Item Rate", before: "3.2%", after: "0.8%", improvement: "-75%" },
  ];

  const substitutionExamples = [
    { 
      original: "Organic whole milk, 1 gal",
      oldSub: "2% milk, 1 gal (cheaper)",
      aiSub: "Organic 2% milk, 1 gal (same brand, organic)",
      reason: "Customer's purchase history shows organic preference is more important than fat content"
    },
    {
      original: "Honeycrisp apples, 3 lb bag",
      oldSub: "Red Delicious apples, 3 lb bag",
      aiSub: "Honeycrisp apples, loose (same variety, different packaging)",
      reason: "Customer consistently buys Honeycrisp, previously rejected Red Delicious sub"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero - Fulfillment Focus */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-blue-500/5 to-green-500/10 min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Link href="/case-studies">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-cases">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Grocery Retail
                  </Badge>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    Fulfillment AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Kroger
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Transforming 2,700+ stores built for shoppers into efficient e-commerce 
                  fulfillment centers—without building new warehouses.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">-47%</p>
                    <p className="text-sm text-muted-foreground">Pick Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">89%</p>
                    <p className="text-sm text-muted-foreground">Sub Acceptance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">94%</p>
                    <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                  </div>
                </div>
              </div>

              {/* Pick Path Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">Pick Path Optimization</p>
                  <div className="relative h-48 mb-6">
                    <svg className="w-full h-full" viewBox="0 0 300 150">
                      <motion.path
                        d="M20,75 L50,30 L100,120 L150,45 L200,90 L250,60 L280,100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-red-400/50"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                      <motion.path
                        d="M20,75 L80,70 L140,75 L200,72 L260,78 L280,75"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-green-400"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400">
                      <span>Produce</span>
                      <span>Dairy</span>
                      <span>Frozen</span>
                      <span>Checkout</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-red-400/50" />
                      <span className="text-slate-400">Before: 4.2 mi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-green-400" />
                      <span className="text-green-400">After: 2.1 mi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-3 h-3 mr-1" />
              The Challenge
            </Badge>

            <h2 className="text-3xl font-bold">Stores Designed for Shopping, Not Picking</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              When e-commerce surged from 2% to 15% of Kroger's sales, they faced a crisis. 
              Pickers were walking 4+ miles per shift, criss-crossing stores inefficiently. 
              Pick lists were sorted alphabetically—not by aisle. And when items were out of 
              stock, substitution logic often suggested items customers didn't want.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold">4.2 mi</p>
                  <p className="text-sm text-muted-foreground">Walking per shift</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Package className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold">34%</p>
                  <p className="text-sm text-muted-foreground">Sub rejection rate</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Truck className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold">23%</p>
                  <p className="text-sm text-muted-foreground">Late deliveries</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pick Optimization Results */}
      <section className="py-24 bg-gradient-to-br from-blue-500/5 via-background to-green-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                <MapPin className="w-3 h-3 mr-1" />
                Pick Path Intelligence
              </Badge>
              <h2 className="text-3xl font-bold">From Chaos to Optimized Routes</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pickOptimization.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <p className="font-semibold mb-4">{item.metric}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">Before</p>
                          <p className="text-lg text-muted-foreground line-through">{item.before}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        <div className="text-center">
                          <p className="text-xs text-green-400 mb-1">After</p>
                          <p className="text-lg font-bold">{item.after}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {item.improvement}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Substitutions */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                <Package className="w-3 h-3 mr-1" />
                Smart Substitutions
              </Badge>
              <h2 className="text-3xl font-bold">Substitutions Customers Actually Accept</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Rules-based substitution picked the cheapest alternative. AI substitution 
                understands individual customer preferences.
              </p>
            </div>

            <div className="space-y-8">
              {substitutionExamples.map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 bg-muted/50 border-b border-border">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Requested: </span>
                          <span className="font-medium">{example.original}</span>
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2">
                        <div className="p-6 border-r border-border">
                          <Badge className="mb-3 bg-red-500/20 text-red-400 border-red-500/30">
                            Old Rules-Based
                          </Badge>
                          <p className="text-sm text-muted-foreground">{example.oldSub}</p>
                        </div>
                        <div className="p-6">
                          <Badge className="mb-3 bg-green-500/20 text-green-400 border-green-500/30">
                            AI Substitution
                          </Badge>
                          <p className="text-sm font-medium">{example.aiSub}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-500/10 border-t border-blue-500/20">
                        <p className="text-sm text-blue-400">
                          <Brain className="w-4 h-4 inline mr-2" />
                          {example.reason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-lg px-6 py-2">
                Substitution acceptance: 66% to 89%
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                Business Impact
              </Badge>
              <h2 className="text-3xl font-bold text-white">500 Stores Optimized</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">24 min</p>
                  <p className="text-sm text-slate-400 mt-2">Pick Time (30 items)</p>
                  <p className="text-xs text-slate-500">down from 45 min</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Truck className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">94%</p>
                  <p className="text-sm text-slate-400 mt-2">On-Time Delivery</p>
                  <p className="text-xs text-slate-500">up from 77%</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">+81%</p>
                  <p className="text-sm text-slate-400 mt-2">Orders/Picker/Hour</p>
                  <p className="text-xs text-slate-500">3.2 to 5.8</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">-42%</p>
                  <p className="text-sm text-slate-400 mt-2">Fulfillment Cost</p>
                  <p className="text-xs text-slate-500">$8.40 to $4.90</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-blue-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-blue-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "We didn't build new fulfillment centers—we made our existing stores 
                  smart. Pickers are happier walking half the distance. Customers get 
                  substitutions they actually want. And we cut fulfillment costs by 42% 
                  while improving customer satisfaction."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">
                    TH
                  </div>
                  <div>
                    <p className="font-semibold">Tom Harrison</p>
                    <p className="text-sm text-muted-foreground">VP of E-Commerce Operations, Kroger</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-500/10 via-background to-green-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Optimizing Retail Operations?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help retailers build AI that makes existing infrastructure smarter—
              without massive capital investment.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/albertsons">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Albertsons
              </Button>
            </Link>
            <Link href="/case-studies/stitch-fix">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Stitch Fix
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
