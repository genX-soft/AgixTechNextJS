'use client'
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
  MapPin,
  Target,
  Clock,
  TrendingUp,
  Quote,
  Route,
  Calendar,
  Star,
  Leaf,
  Camera,
  Coffee,
  AlertTriangle,
  FileEdit,
  MapPinOff,
  Timer,
} from "lucide-react";
import Link from "next/link";

export default function GeoveaCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-rose-500/10 via-background to-pink-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-rose-500/30 text-rose-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    Travel AI
                  </Badge>
                  <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                    Dynamic Itineraries
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Geovea
                </h1>

                <p className="text-xl text-muted-foreground">
                  Dynamic AI for personalized travel itineraries. Creating perfect trip 
                  plans with 92% accuracy and +214% engagement improvement.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-rose-400">+214%</p>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-pink-400">92%</p>
                    <p className="text-sm text-muted-foreground">Plan Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">4.9/5</p>
                    <p className="text-sm text-muted-foreground">User Rating</p>
                  </div>
                </div>
              </div>

              {/* Itinerary Preview Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Route className="w-6 h-6 text-rose-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Sample Itinerary</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { time: "9:00", place: "La Boqueria Market", type: "food" },
                      { time: "11:00", place: "Barcelona Cathedral", type: "culture" },
                      { time: "14:00", place: "El Born District", type: "explore" },
                      { time: "18:00", place: "Barceloneta Beach", type: "relax" },
                    ].map((stop, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50">
                        <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">
                          {stop.time}
                        </Badge>
                        <p className="text-sm font-medium text-white">{stop.place}</p>
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

            <h2 className="text-3xl font-bold">Manual Itinerary Creation That Misses Hidden Gems</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Road trip planning was painfully manual—travelers spent hours stitching together 
              routes from multiple apps, often missing the best attractions along the way. Static 
              itineraries couldn't adapt to real-world conditions like weather changes, closures, 
              or unexpected detours. The result? Missed opportunities and frustrating experiences 
              when plans fell apart mid-trip.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <FileEdit className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">8+ hours</p>
                  <p className="text-sm text-muted-foreground">Manual planning per road trip</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <MapPinOff className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">73%</p>
                  <p className="text-sm text-muted-foreground">Attractions missed along route</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Timer className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">0%</p>
                  <p className="text-sm text-muted-foreground">Real-time adaptation capability</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Dynamic Itinerary Lattice</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-rose-400" />
                  Barcelona - 4 Day Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      day: "Day 1", 
                      theme: "Gothic Quarter Discovery",
                      stops: [
                        { time: "9:00", place: "La Boqueria Market", type: "food", duration: "1.5h" },
                        { time: "11:00", place: "Barcelona Cathedral", type: "culture", duration: "1h" },
                        { time: "14:00", place: "El Born District", type: "explore", duration: "2h" },
                        { time: "18:00", place: "Barceloneta Beach", type: "relax", duration: "2h" },
                      ]
                    },
                    { 
                      day: "Day 2", 
                      theme: "Gaudi Masterpieces",
                      stops: [
                        { time: "9:00", place: "Park Guell", type: "culture", duration: "2h" },
                        { time: "12:00", place: "Sagrada Familia", type: "culture", duration: "2h" },
                        { time: "15:00", place: "Casa Batllo", type: "culture", duration: "1h" },
                        { time: "18:00", place: "Passeig de Gracia", type: "explore", duration: "2h" },
                      ]
                    },
                  ].map((day, i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">{day.day}</p>
                          <p className="text-sm text-muted-foreground">{day.theme}</p>
                        </div>
                        <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">
                          4 stops
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {day.stops.map((stop, j) => (
                          <div key={j} className={`p-2 rounded text-center ${
                            stop.type === 'food' ? 'bg-orange-500/20' :
                            stop.type === 'culture' ? 'bg-purple-500/20' :
                            stop.type === 'explore' ? 'bg-blue-500/20' :
                            'bg-green-500/20'
                          }`}>
                            <p className="text-xs text-muted-foreground">{stop.time}</p>
                            <p className="text-xs font-medium truncate">{stop.place}</p>
                            <p className="text-xs text-muted-foreground">{stop.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    Recommendation Rationale
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { reason: "Crowd avoidance", detail: "Sagrada at 12pm: 40% less crowded" },
                    { reason: "Walking optimization", detail: "Route minimizes backtracking" },
                    { reason: "Energy pacing", detail: "High activity AM, relaxed PM" },
                    { reason: "Local insight", detail: "Hidden gems from locals" },
                  ].map((item, i) => (
                    <div key={i} className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs font-medium">{item.reason}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-rose-500/10 to-pink-500/10">
                <CardContent className="p-4 text-center">
                  <Leaf className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm font-medium">Sustainability Score</p>
                  <p className="text-2xl font-bold text-green-400">87/100</p>
                  <p className="text-xs text-muted-foreground">Walking-focused, low carbon</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-rose-500/5 via-background to-pink-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-rose-500/20 text-rose-400 border-rose-500/30">
                <MapPin className="w-3 h-3 mr-1" />
                Map Synchronization
              </Badge>
              <h3 className="text-2xl font-bold mb-4">Real-Time Route Intelligence</h3>
              <p className="text-muted-foreground mb-6">
                AI continuously monitors real-world conditions—weather, crowds, 
                closures—and dynamically adjusts your itinerary to ensure the 
                best possible experience.
              </p>

              <div className="space-y-3">
                {[
                  { trigger: "Rain forecast 3PM", action: "Moved beach to Day 3", status: "adjusted" },
                  { trigger: "Sagrada sold out", action: "Pre-booked tickets secured", status: "protected" },
                  { trigger: "Local festival", action: "Added evening event", status: "enhanced" },
                  { trigger: "Restaurant closure", action: "Alternative recommendation", status: "adjusted" },
                ].map((update, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{update.trigger}</p>
                      <p className="text-xs text-muted-foreground">{update.action}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      update.status === 'adjusted' ? 'text-amber-400 border-amber-400/30' :
                      update.status === 'protected' ? 'text-green-400 border-green-400/30' :
                      'text-blue-400 border-blue-400/30'
                    }`}>
                      {update.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-pink-500/20 text-pink-400 border-pink-500/30">
                <Camera className="w-3 h-3 mr-1" />
                Experience Types
              </Badge>
              <h3 className="text-xl font-bold mb-4">Personalization Matrix</h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: "Culture & History", pct: 35, icon: Camera },
                  { type: "Food & Drink", pct: 25, icon: Coffee },
                  { type: "Outdoor & Nature", pct: 20, icon: Leaf },
                  { type: "Local Discovery", pct: 20, icon: MapPin },
                ].map((category, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 text-center">
                      <category.icon className="w-5 h-5 text-rose-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{category.pct}%</p>
                      <p className="text-xs text-muted-foreground">{category.type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-4 bg-slate-900">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-400 mb-2">Based on your preferences</p>
                  <div className="flex flex-wrap gap-2">
                    {["History buff", "Foodie", "Early riser", "Photography", "Walking tours"].map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-rose-500/20">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-rose-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Static travel guides are obsolete. Our AI understands that great 
                travel is about flow—the right place at the right time with the 
                right energy. We factor in everything from crowd patterns to your 
                personal rhythm, then adapt in real-time when conditions change."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  MB
                </div>
                <div>
                  <p className="font-semibold">Maria Benedetti</p>
                  <p className="text-sm text-muted-foreground">Director of Experience Design, Geovea</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building AI for Travel Planning?</h2>
          <p className="text-slate-400 mb-8">Let's create itineraries that adapt to real-world conditions.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/navan">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Navan
            </Button>
          </Link>
          <Link href="/case-studies/luxury-escapes">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Luxury Escapes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
