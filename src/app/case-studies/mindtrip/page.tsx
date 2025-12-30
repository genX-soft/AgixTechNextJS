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
  Plane,
  Target,
  Clock,
  MessageSquare,
  Quote,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Search,
  ListX,
  Timer,
} from "lucide-react";
import Link from "next/link";

export default function MindtripCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-sky-500/10 via-background to-blue-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-sky-500/30 text-sky-400">
                    <Plane className="w-3 h-3 mr-1" />
                    Travel AI
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    Conversational Planning
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Mindtrip
                </h1>

                <p className="text-xl text-muted-foreground">
                  Conversational AI for personalized travel planning. Making trip planning 
                  99% faster with AI that understands preferences and creates perfect itineraries.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-sky-400">99%</p>
                    <p className="text-sm text-muted-foreground">Faster Planning</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">+168%</p>
                    <p className="text-sm text-muted-foreground">Personalization</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">+272%</p>
                    <p className="text-sm text-muted-foreground">Repeat Usage</p>
                  </div>
                </div>
              </div>

              {/* Conversation Preview Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Bot className="w-6 h-6 text-sky-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">AI Conversation</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-3 max-w-[85%]">
                        <p className="text-sm text-white">7-day romantic Italy trip, food & wine focus</p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-slate-700 rounded-lg p-3 max-w-[85%]">
                        <p className="text-sm text-slate-200">Crafting a Tuscany itinerary with vineyard tours and hidden trattorias...</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    </div>
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

            <h2 className="text-3xl font-bold">Generic Travel Recommendations That Miss the Mark</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Travelers were drowning in overwhelming options—sifting through hundreds of generic 
              recommendations that didn't match their preferences. Traditional travel sites showed 
              the same "Top 10" lists to everyone, ignoring personal tastes, travel styles, and 
              nuanced requirements. The result? Hours wasted on research and trips that felt 
              impersonal and disappointing.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Timer className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">12+ hours</p>
                  <p className="text-sm text-muted-foreground">Average trip planning time</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Search className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">34/100</p>
                  <p className="text-sm text-muted-foreground">Personalization score (generic sites)</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <ListX className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">67%</p>
                  <p className="text-sm text-muted-foreground">Travelers dissatisfied with recommendations</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Conversational Planning Experience</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageSquare className="w-5 h-5 text-sky-400" />
                  Live Conversation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-white">I want a romantic 7-day trip to Italy in September, focused on food and wine, budget around $5k for two</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-slate-700 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-slate-200">Perfect! I'm crafting a Tuscany-focused itinerary with cooking classes, private vineyard tours, and hidden trattorias locals love.</p>
                    <p className="text-sm text-slate-200 mt-2">Quick question: do you prefer boutique hotels with character or luxury resorts with amenities?</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-white">Boutique with character, definitely!</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-slate-700 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-slate-200">Love it! Your itinerary is ready. I've included a converted 16th-century monastery in Siena and a family-run agriturismo in Chianti...</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <Badge className="w-fit bg-sky-500/20 text-sky-400 border-sky-500/30">
                    Generated Itinerary
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { day: "Day 1-2", location: "Florence", activity: "Arrival, Uffizi, cooking class" },
                    { day: "Day 3-4", location: "Siena", activity: "Medieval town, Chianti wine tour" },
                    { day: "Day 5-6", location: "Chianti", activity: "Agriturismo, vineyard experiences" },
                    { day: "Day 7", location: "Florence", activity: "Market visit, departure" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Calendar className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{item.day}</span>
                          <Badge variant="outline" className="text-xs">{item.location}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-sky-500/10 to-blue-500/10">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Personalization Score</p>
                  <p className="text-3xl font-bold text-sky-400">91/100</p>
                  <p className="text-xs text-muted-foreground mt-1">vs 34/100 generic booking sites</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-sky-500/5 via-background to-blue-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl font-bold mb-6 text-center">Traveler Persona Understanding</h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { persona: "Adventure Seekers", traits: "Active, outdoors, unique experiences", match: "94%" },
              { persona: "Culture Enthusiasts", traits: "History, art, local traditions", match: "92%" },
              { persona: "Relaxation Focused", traits: "Spa, beach, minimal planning", match: "89%" },
              { persona: "Family Travelers", traits: "Kid-friendly, safe, educational", match: "91%" },
            ].map((type, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Users className="w-5 h-5 text-sky-400 mb-2" />
                  <p className="font-semibold text-sm mb-1">{type.persona}</p>
                  <p className="text-xs text-muted-foreground mb-2">{type.traits}</p>
                  <Badge className="bg-sky-500/20 text-sky-400 border-sky-500/30">
                    {type.match} accuracy
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-sky-500/20">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-sky-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Traditional travel planning is broken—hours of research across dozens 
                of tabs, only to end up with generic recommendations. Our AI has a 
                real conversation, understands nuance, and creates trips that feel 
                like they were planned by a friend who knows you deeply."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  AM
                </div>
                <div>
                  <p className="font-semibold">Alexandra Morgan</p>
                  <p className="text-sm text-muted-foreground">Director of Product, Mindtrip</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Conversational Travel AI?</h2>
          <p className="text-slate-400 mb-8">Let's create planning experiences that delight travelers.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/alphasense">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              AlphaSense
            </Button>
          </Link>
          <Link href="/case-studies/brainfish">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Brainfish
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
