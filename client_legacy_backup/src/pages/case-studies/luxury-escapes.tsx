import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Crown,
  Target,
  Clock,
  TrendingUp,
  Quote,
  Star,
  Gem,
  Sparkles,
  Shield,
  MessageSquare,
  Plane,
  Hotel,
  AlertTriangle,
  Users,
  Copy,
  HeartCrack,
} from "lucide-react";
import { Link } from "wouter";

export default function LuxuryEscapesCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-amber-500/10 via-background to-yellow-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                    <Crown className="w-3 h-3 mr-1" />
                    Luxury Travel
                  </Badge>
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                    AI Concierge
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Luxury Escapes
                </h1>

                <p className="text-xl text-muted-foreground">
                  Concierge-grade AI for premium travel experiences. Scaling personalized 
                  service 36x while achieving 96/100 guest satisfaction.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">+3,650%</p>
                    <p className="text-sm text-muted-foreground">Concierge Scale</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-400">+71%</p>
                    <p className="text-sm text-muted-foreground">Booking Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">96/100</p>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Luxury Experience Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Gem className="w-6 h-6 text-amber-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">VIP Experiences</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Anniversary Getaway", location: "Maldives", value: "$12,400" },
                      { name: "Family Reunion", location: "Tuscany", value: "$28,900" },
                      { name: "Executive Retreat", location: "Swiss Alps", value: "$45,000" },
                    ].map((exp, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{exp.name}</p>
                          <p className="text-xs text-slate-400">{exp.location}</p>
                        </div>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-bold">
                          {exp.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16">
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

            <h2 className="text-3xl font-bold">Generic VIP Treatment That Fails to Impress</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Luxury travelers expect personalized attention, but scaling human concierge service 
              was impossible. High-net-worth guests received cookie-cutter recommendations that 
              ignored their unique preferences, past stays, and special occasions. Human concierges 
              could only serve 120 guests daily, leaving thousands without the white-glove treatment 
              they deserved—and paid for.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">120</p>
                  <p className="text-sm text-muted-foreground">Max guests per day (human concierge)</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Copy className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">78%</p>
                  <p className="text-sm text-muted-foreground">Generic template responses</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <HeartCrack className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">0%</p>
                  <p className="text-sm text-muted-foreground">Past preference recall</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Concierge Scenario Planner</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { 
                scenario: "Anniversary Getaway",
                icon: Gem,
                request: "25th anniversary, want something unforgettable",
                solution: [
                  "Overwater villa in Maldives",
                  "Private sunset dinner on sandbank",
                  "Couples spa with renewal ceremony",
                  "Seaplane champagne arrival",
                ],
                value: "$12,400",
                satisfaction: "10/10"
              },
              { 
                scenario: "Multi-Gen Family Reunion",
                icon: Hotel,
                request: "3 generations, ages 4-78, need everyone engaged",
                solution: [
                  "Private estate in Tuscany",
                  "Kids cooking class + adult wine tour",
                  "Accessible villa layout",
                  "Personal chef for dietary needs",
                ],
                value: "$28,500",
                satisfaction: "10/10"
              },
              { 
                scenario: "Adventure Honeymoon",
                icon: Plane,
                request: "Active couple, bucket list experiences",
                solution: [
                  "New Zealand North to South",
                  "Heli-skiing + bungee + glacier",
                  "Luxury lodges throughout",
                  "Private guide entire trip",
                ],
                value: "$34,200",
                satisfaction: "10/10"
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-amber-400" />
                    {item.scenario}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Guest Request</p>
                    <p className="text-sm italic">"{item.request}"</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">AI-Curated Experience</p>
                    <ul className="space-y-1">
                      {item.solution.map((point, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Booking Value</p>
                      <p className="font-bold text-amber-400">{item.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                      <p className="font-bold text-green-400">{item.satisfaction}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-amber-500/5 via-background to-yellow-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                <Crown className="w-3 h-3 mr-1" />
                Experience Gallery
              </Badge>
              <h3 className="text-2xl font-bold mb-4">Premium Curation Engine</h3>
              <p className="text-muted-foreground mb-6">
                AI matches guests with experiences based on 47 preference signals—
                from adventure tolerance to culinary preferences to accessibility 
                needs—ensuring every recommendation feels personally crafted.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { category: "Exclusive Access", examples: "Private museum tours, chef's tables" },
                  { category: "Adventure", examples: "Heli-experiences, expedition cruises" },
                  { category: "Wellness", examples: "Destination spas, retreat programs" },
                  { category: "Cultural", examples: "Local homes, artisan workshops" },
                ].map((item, i) => (
                  <Card key={i} className="bg-muted/50">
                    <CardContent className="p-3">
                      <p className="text-sm font-medium mb-1">{item.category}</p>
                      <p className="text-xs text-muted-foreground">{item.examples}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Service Level Assurance
              </Badge>
              <h3 className="text-xl font-bold mb-4">White-Glove Standards</h3>

              <div className="space-y-4">
                {[
                  { standard: "Response Time", target: "< 30 seconds", actual: "12 sec avg", status: "exceeding" },
                  { standard: "Request Fulfillment", target: "95%", actual: "98.7%", status: "exceeding" },
                  { standard: "Issue Resolution", target: "< 2 hours", actual: "34 min avg", status: "exceeding" },
                  { standard: "Personalization Accuracy", target: "90%", actual: "96%", status: "exceeding" },
                ].map((sla, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{sla.standard}</p>
                      <p className="text-xs text-muted-foreground">Target: {sla.target}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-amber-400">{sla.actual}</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {sla.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="mt-4 bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
                <CardContent className="p-4 text-center">
                  <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-amber-400">4,500</p>
                  <p className="text-sm text-muted-foreground">Guests served daily</p>
                  <p className="text-xs text-muted-foreground">(up from 120 with human-only)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-amber-500/20">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-amber-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Luxury isn't just about expensive things—it's about feeling 
                understood and cared for. Our AI remembers that you prefer 
                ocean-view rooms, that your partner is vegetarian, that you 
                celebrate your anniversary in September. That level of personal 
                attention used to require a dedicated human concierge. Now we 
                deliver it to 4,500 guests simultaneously."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                  SO
                </div>
                <div>
                  <p className="font-semibold">Sophie Olivier</p>
                  <p className="text-sm text-muted-foreground">VP of Premium Partnerships, Luxury Escapes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building AI for Luxury Travel?</h2>
          <p className="text-slate-400 mb-8">Let's create concierge experiences that scale without losing the personal touch.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/geovea">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Geovea
            </Button>
          </Link>
          <Link href="/case-studies/naratix">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Naratix
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
