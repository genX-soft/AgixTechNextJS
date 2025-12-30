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
  Truck,
  CloudSun,
  Package,
  Leaf,
  BarChart3,
} from "lucide-react";
import { Link } from "wouter";

export default function AlbertsonsCaseStudyPage() {
  const demandFactors = [
    { factor: "Weather Forecast", example: "Heat wave doubles watermelon sales", impact: "High" },
    { factor: "Local Events", example: "Super Bowl parties spike chip demand 340%", impact: "High" },
    { factor: "School Schedules", example: "Back-to-school week shifts lunch item demand", impact: "Medium" },
    { factor: "Store Demographics", example: "Urban vs. suburban preference patterns", impact: "Medium" },
    { factor: "Supply Availability", example: "Strawberry shortage requires reforecast", impact: "High" },
  ];

  const wasteReduction = [
    { category: "Produce", before: "$82M", after: "$41M", reduction: "-50%" },
    { category: "Dairy", before: "$34M", after: "$19M", reduction: "-44%" },
    { category: "Bakery", before: "$28M", after: "$15M", reduction: "-46%" },
    { category: "Meat/Seafood", before: "$36M", after: "$22M", reduction: "-39%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-green-500/5 to-emerald-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Grocery Retail
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    Demand Forecasting
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Albertsons
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Predicting demand for products that expire in days—reducing $180M in 
                  annual food waste while keeping shelves stocked with the freshest products.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-45%</p>
                    <p className="text-sm text-muted-foreground">Perishable Waste</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-400">97.2%</p>
                    <p className="text-sm text-muted-foreground">In-Stock Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">$83M</p>
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                  </div>
                </div>
              </div>

              {/* Forecast Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Fresh Demand Forecast</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Live</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CloudSun className="w-5 h-5 text-amber-400" />
                        <span className="text-sm text-slate-300">Heat wave forecast (3 days)</span>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">+127% watermelon</Badge>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-slate-300">Strawberry supply constraint</span>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">-40% availability</Badge>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Leaf className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-slate-300">Adjusted order recommendation</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Optimized</Badge>
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

            <h2 className="text-3xl font-bold">Products That Expire in Days</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fresh produce and perishables represent 30% of grocery revenue but 60% of 
              waste costs. Traditional forecasting models built for shelf-stable goods fail 
              when applied to items with 3-7 day shelf lives. Albertsons was losing $180M 
              annually to spoilage—while simultaneously running out of popular items.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold">3-7 days</p>
                  <p className="text-sm text-muted-foreground">Shelf life window</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Package className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold">$180M</p>
                  <p className="text-sm text-muted-foreground">Annual shrink</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Truck className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold">67%</p>
                  <p className="text-sm text-muted-foreground">Manager overrides</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demand Factors */}
      <section className="py-24 bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                <Brain className="w-3 h-3 mr-1" />
                Demand Intelligence
              </Badge>
              <h2 className="text-3xl font-bold">Multi-Signal Forecasting</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fresh demand isn't just about last year's numbers. Weather, events, and 
                supply constraints all drive daily demand.
              </p>
            </div>

            <div className="space-y-4">
              {demandFactors.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="font-medium w-32 shrink-0">{item.factor}</div>
                        <div className="flex-1 text-sm text-muted-foreground">{item.example}</div>
                        <Badge className={
                          item.impact === "High" 
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        }>
                          {item.impact} Impact
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

      {/* Waste Reduction Results */}
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
                <BarChart3 className="w-3 h-3 mr-1" />
                Waste Reduction
              </Badge>
              <h2 className="text-3xl font-bold text-white">Shrink Reduction by Category</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {wasteReduction.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <p className="font-semibold text-white mb-4">{item.category}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 line-through">{item.before}</span>
                        <ArrowRight className="w-5 h-5 text-slate-600" />
                        <span className="text-xl font-bold text-white">{item.after}</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {item.reduction}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-2">$83M</p>
              <p className="text-slate-400">Total Annual Savings</p>
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
            <Card className="border-green-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-green-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "Store managers used to override our forecasts 67% of the time because 
                  they didn't trust the numbers. Now? Override rate is under 15%. The AI 
                  factors in things they couldn't—like a concert three miles away or a 
                  cold snap coming next Tuesday. They've learned to trust it."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                    RG
                  </div>
                  <div>
                    <p className="font-semibold">Robert Garcia</p>
                    <p className="text-sm text-muted-foreground">VP of Supply Chain Analytics, Albertsons</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-green-500/10 via-background to-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Optimizing Perishable Supply Chains?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help retailers build demand forecasting systems that reduce waste 
              while keeping shelves stocked with fresh products.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/hello-driven">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Hello Driven
              </Button>
            </Link>
            <Link href="/case-studies/kroger">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Kroger
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
