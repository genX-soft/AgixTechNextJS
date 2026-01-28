'use client'
import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Target,
  Clock,
  TrendingUp,
  Quote,
  MapPin,
  Search,
  Users,
  DollarSign,
  CheckCircle2,
  Building,
  Bed,
  Bath,
  AlertTriangle,
  FileSearch,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function PropertiAICaseStudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-teal-500/10 via-background to-cyan-500/10 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Link href="/case-studies/">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-to-cases">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-teal-500/30 text-teal-400">
                    <Home className="w-3 h-3 mr-1" />
                    Real Estate
                  </Badge>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                    Property AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Properti AI
                </h1>

                <p className="text-xl text-muted-foreground">
                  AI chatbot for intelligent property discovery. Achieving +156% lead 
                  conversion with 89% match accuracy for buyers.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-teal-400">+156%</p>
                    <p className="text-sm text-muted-foreground">Lead Conversion</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">+89%</p>
                    <p className="text-sm text-muted-foreground">Match Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-68%</p>
                    <p className="text-sm text-muted-foreground">Agent Time</p>
                  </div>
                </div>
              </div>

              {/* Property Matching Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="w-6 h-6 text-teal-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Property Match</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Modern Downtown Condo", price: "$485,000", match: "96%" },
                      { name: "Austin Heights Home", price: "$520,000", match: "91%" },
                      { name: "East Side Townhouse", price: "$495,000", match: "88%" },
                    ].map((property, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{property.name}</p>
                          <p className="text-xs text-slate-400">{property.price}</p>
                        </div>
                        <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                          {property.match} match
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

            <h2 className="text-3xl font-bold">Property Searches That Wasted Everyone's Time</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Buyers were wading through hundreds of mismatched listings, while agents spent hours 
              qualifying leads who weren't ready to buy. Traditional search filters couldn't understand 
              lifestyle needs—like "good for remote work" or "family-friendly neighborhood"—leading to 
              endless property tours that went nowhere. Both sides were frustrated, and deals were falling through.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <FileSearch className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">73%</p>
                  <p className="text-sm text-muted-foreground">Mismatched listings shown</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">12+ hrs</p>
                  <p className="text-sm text-muted-foreground">Agent time per buyer</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">34%</p>
                  <p className="text-sm text-muted-foreground">Lead conversion rate</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Property Discovery Journey</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-400" />
                  Buyer Persona
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-teal-500/10">
                  <p className="text-sm font-medium mb-2">First-Time Buyer</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium text-foreground">$450K - $550K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="font-medium text-foreground">Austin, TX</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium text-foreground">Single Family</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Must-Have:</span>
                      <span className="font-medium text-foreground">Home office</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">AI-Detected Priorities</p>
                  <div className="flex flex-wrap gap-1">
                    {["School district", "Quiet street", "Modern kitchen", "Garage"].map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-teal-400" />
                  AI-Matched Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { address: "2847 Oak Haven Dr", match: "96%", price: "$525,000", beds: 4, baths: 3, sqft: "2,450" },
                  { address: "1923 Maple Ridge Ln", match: "94%", price: "$498,000", beds: 3, baths: 2.5, sqft: "2,180" },
                  { address: "5612 Cedar Park Blvd", match: "91%", price: "$542,000", beds: 4, baths: 2, sqft: "2,620" },
                ].map((property, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-20 h-20 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <Building className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{property.address}</p>
                        <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 flex-shrink-0">
                          {property.match} match
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-teal-400">{property.price}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3" /> {property.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3" /> {property.baths}
                        </span>
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-teal-500/5 via-background to-cyan-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-teal-500/20 text-teal-400 border-teal-500/30">
                <MapPin className="w-3 h-3 mr-1" />
                Neighborhood Intelligence
              </Badge>
              <h3 className="text-2xl font-bold mb-4">Contextual Location Insights</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { category: "Schools", score: "9.2/10", detail: "Top-rated district" },
                  { category: "Safety", score: "A+", detail: "Low crime area" },
                  { category: "Commute", score: "22 min", detail: "To downtown" },
                  { category: "Walkability", score: "74", detail: "Very walkable" },
                  { category: "Growth", score: "+12%", detail: "5-yr appreciation" },
                  { category: "Amenities", score: "Excellent", detail: "Parks, shops nearby" },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-3">
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <p className="text-lg font-bold text-teal-400">{item.score}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Buyer Readiness
              </Badge>
              <h3 className="text-xl font-bold mb-4">Negotiation Readiness Checklist</h3>

              <Card className="bg-slate-900">
                <CardContent className="p-4 space-y-3">
                  {[
                    { item: "Pre-approval letter obtained", status: true },
                    { item: "Down payment verified (15%)", status: true },
                    { item: "Inspection contingency discussed", status: true },
                    { item: "Closing timeline aligned", status: true },
                    { item: "Counter-offer strategy defined", status: false },
                  ].map((check, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className={`text-sm ${check.status ? 'text-slate-200' : 'text-slate-500'}`}>
                        {check.item}
                      </span>
                      <CheckCircle2 className={`w-4 h-4 ${check.status ? 'text-green-400' : 'text-slate-600'}`} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-4 bg-gradient-to-br from-teal-500/10 to-cyan-500/10">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Buyer Readiness Score</p>
                  <p className="text-3xl font-bold text-teal-400">85%</p>
                  <p className="text-xs text-muted-foreground mt-1">Ready to make competitive offers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-teal-500/20">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-teal-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Buyers used to waste weeks looking at properties that didn't fit. 
                Our AI asks the right questions, understands lifestyle needs—not just 
                square footage—and surfaces matches that feel like magic. Agents now 
                spend time closing deals, not qualifying tire-kickers."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  KR
                </div>
                <div>
                  <p className="font-semibold">Kevin Rodriguez</p>
                  <p className="text-sm text-muted-foreground">VP of Growth, Properti AI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Real Estate Discovery AI?</h2>
          <p className="text-slate-400 mb-8">Let's create property matching that delights buyers and agents.</p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/brainfish/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Brainfish
            </Button>
          </Link>
          <Link href="/case-studies/dartmouth-college/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Dartmouth College
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
