import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Hotel,
  Brain,
  Clock,
  TrendingUp,
  Quote,
  ArrowRight,
  DollarSign,
  Globe,
  Calendar,
  Star,
  MapPin,
  BarChart3,
  Users,
  Coffee,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Settings,
  TrendingDown,
} from "lucide-react";
import { Link } from "wouter";

export default function HiltonHotelsCaseStudyPage() {
  const [expandedRoom, setExpandedRoom] = useState<number | null>(0);
  const [selectedAmenity, setSelectedAmenity] = useState("spa");

  const guestProfiles = [
    {
      name: "Diamond Business Traveler",
      avatar: "JM",
      preferences: ["High floor", "King bed", "Early check-in", "Quiet room"],
      stayHistory: "47 nights this year",
      predictedNeeds: ["Express checkout", "Late dinner reservation", "Car service"],
      satisfaction: 96,
    },
    {
      name: "Anniversary Couple",
      avatar: "S+M",
      preferences: ["Ocean view", "Suite upgrade", "Champagne on arrival", "Late checkout"],
      stayHistory: "3rd anniversary trip",
      predictedNeeds: ["Spa booking", "Restaurant recommendations", "Photo spots"],
      satisfaction: 98,
    },
    {
      name: "Family Vacation",
      avatar: "FAM",
      preferences: ["Connecting rooms", "Pool access", "Kids menu", "Extra towels"],
      stayHistory: "First stay at property",
      predictedNeeds: ["Childcare info", "Family activities", "Flexible dining times"],
      satisfaction: 92,
    },
  ];

  const amenityImpact = [
    { id: "spa", name: "Spa Services", icon: Sparkles, upsell: "+$127", conversion: "34%", aiAction: "Personalized treatment recommendations based on stay patterns" },
    { id: "dining", name: "Restaurant", icon: Utensils, upsell: "+$89", conversion: "52%", aiAction: "Dietary preference memory and table preference optimization" },
    { id: "fitness", name: "Fitness Center", icon: Dumbbell, upsell: "+$45", conversion: "28%", aiAction: "Class scheduling aligned with guest workout history" },
    { id: "transport", name: "Car Service", icon: Car, upsell: "+$156", conversion: "21%", aiAction: "Proactive airport transfer offers based on flight data" },
  ];

  const revenueMetrics = [
    { metric: "RevPAR Increase", value: "+$12.40", change: "+4.7%", period: "YoY" },
    { metric: "Upsell Revenue", value: "+$8.2M", change: "+23%", period: "Annual" },
    { metric: "Guest Satisfaction", value: "92/100", change: "+18%", period: "vs baseline" },
    { metric: "Repeat Booking", value: "67%", change: "+63%", period: "Diamond members" },
  ];

  const currentAmenity = amenityImpact.find(a => a.id === selectedAmenity) || amenityImpact[0];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-blue-500/5 to-amber-500/10 min-h-[60vh] flex items-center">
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
                    <Hotel className="w-3 h-3 mr-1" />
                    Enterprise Hospitality
                  </Badge>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                    Personalization AI
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Hilton Hotels
                </h1>

                <p className="text-xl text-muted-foreground">
                  Transforming 7,000+ properties worldwide with AI that remembers every 
                  guest preference, predicts needs before they arise, and optimizes 
                  pricing in real-time.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">7,000+</p>
                    <p className="text-sm text-muted-foreground">Properties</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">173M</p>
                    <p className="text-sm text-muted-foreground">Guests/Year</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">+4.7%</p>
                    <p className="text-sm text-muted-foreground">RevPAR</p>
                  </div>
                </div>
              </div>

              {/* Revenue Dashboard Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="w-6 h-6 text-amber-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Revenue Impact</p>
                  </div>
                  <div className="space-y-4">
                    {revenueMetrics.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{item.metric}</p>
                          <p className="text-xs text-slate-400">{item.period}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">{item.value}</p>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            {item.change}
                          </Badge>
                        </div>
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

            <h2 className="text-3xl font-bold">Manual Pricing in a Dynamic Market</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              With 7,000+ properties worldwide, Hilton's revenue managers couldn't keep up with real-time demand fluctuations. 
              Rates were set days in advance using static rules, missing surge opportunities during events 
              and failing to capture price-sensitive travelers during slow periods. Every empty room represented 
              permanent revenue loss, and the competition was already using dynamic pricing.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">72 hrs</p>
                  <p className="text-sm text-muted-foreground">Avg rate adjustment lag</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <TrendingDown className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">$4.2M</p>
                  <p className="text-sm text-muted-foreground">Missed revenue monthly</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">18%</p>
                  <p className="text-sm text-muted-foreground">Rooms unsold at optimal price</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guest Profile Intelligence - Unique Structure */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Brain className="w-3 h-3 mr-1" />
              Guest Intelligence
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">AI Guest Profiles</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              See how AI remembers and anticipates every guest's unique preferences
            </p>
          </div>

          <div className="space-y-4">
            {guestProfiles.map((guest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card 
                  className={`border-slate-700 bg-slate-800/50 cursor-pointer transition-all ${expandedRoom === i ? 'border-blue-500' : 'hover:border-slate-600'}`}
                  onClick={() => setExpandedRoom(expandedRoom === i ? null : i)}
                  data-testid={`guest-profile-${i}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                        {guest.avatar}
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">{guest.name}</p>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                            {guest.stayHistory}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {guest.preferences.slice(0, 3).map((pref, j) => (
                            <Badge key={j} variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {pref}
                            </Badge>
                          ))}
                          {guest.preferences.length > 3 && (
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              +{guest.preferences.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4 text-green-400" />
                          <span className="text-lg font-bold text-white">{guest.satisfaction}%</span>
                        </div>
                        <p className="text-xs text-slate-400">Satisfaction</p>
                      </div>
                      {expandedRoom === i ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedRoom === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-slate-700"
                        >
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-slate-400 mb-3">Known Preferences</p>
                              <div className="space-y-2">
                                {guest.preferences.map((pref, j) => (
                                  <div key={j} className="flex items-center gap-2 text-sm">
                                    <Star className="w-3 h-3 text-amber-400" />
                                    <span className="text-slate-300">{pref}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-slate-400 mb-3">AI Predicted Needs</p>
                              <div className="space-y-2">
                                {guest.predictedNeeds.map((need, j) => (
                                  <div key={j} className="flex items-center gap-2 text-sm">
                                    <Brain className="w-3 h-3 text-purple-400" />
                                    <span className="text-slate-300">{need}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenity Upsell Intelligence */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
              <DollarSign className="w-3 h-3 mr-1" />
              Revenue Intelligence
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Amenity Upsell Engine</h2>
            <p className="text-muted-foreground mt-2">AI-driven personalized offers that guests actually want</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Amenity Selector */}
            <div className="space-y-3">
              {amenityImpact.map((amenity) => (
                <Button
                  key={amenity.id}
                  variant={selectedAmenity === amenity.id ? "default" : "outline"}
                  className={`w-full justify-start gap-3 ${selectedAmenity === amenity.id ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
                  onClick={() => setSelectedAmenity(amenity.id)}
                  data-testid={`amenity-${amenity.id}`}
                >
                  <amenity.icon className="w-5 h-5" />
                  {amenity.name}
                  <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {amenity.upsell}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Amenity Details */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <currentAmenity.icon className="w-6 h-6 text-amber-400" />
                    {currentAmenity.name} Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Avg. Upsell Value</p>
                      <p className="text-2xl font-bold text-green-400">{currentAmenity.upsell}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold text-blue-400">{currentAmenity.conversion}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-400 mb-1">AI Action</p>
                        <p className="text-sm text-muted-foreground">{currentAmenity.aiAction}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Example Personalized Offer</p>
                    <Card className="bg-gradient-to-r from-blue-500/10 to-amber-500/10 border-blue-500/20">
                      <CardContent className="p-4">
                        <p className="text-sm italic">
                          {currentAmenity.id === "spa" && "\"Welcome back, Mrs. Johnson! We noticed you enjoyed our couples massage last visit. For your anniversary stay, we've reserved your preferred therapist Sarah at 3pm. Would you like to confirm?\""}
                          {currentAmenity.id === "dining" && "\"Good evening, Mr. Chen! Your usual table by the window is available at 7:30pm. Chef has prepared a special tasting menu tonight featuring the duck you loved last time. Shall we reserve?\""}
                          {currentAmenity.id === "fitness" && "\"Good morning, Ms. Taylor! We noticed you typically work out at 6am. Today's sunrise yoga class has 2 spots remaining. Would you like me to reserve one?\""}
                          {currentAmenity.id === "transport" && "\"Mr. Williams, your flight departs at 4pm tomorrow. Based on current traffic patterns, I recommend scheduling your car service for 1:30pm. Shall I arrange this?\""}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Dashboard */}
      <section className="py-16 bg-gradient-to-b from-background to-blue-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              <BarChart3 className="w-3 h-3 mr-1" />
              Business Impact
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Revenue Transformation</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {revenueMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{metric.metric}</p>
                    <p className="text-3xl font-bold text-blue-400 mb-2">{metric.value}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {metric.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{metric.period}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-amber-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-blue-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "We're not just pricing rooms—we're pricing experiences. The AI understands that a Diamond member booking for their anniversary is a different value proposition than a corporate traveler on per diem. That nuance drives incremental revenue we never captured before."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-amber-500 flex items-center justify-center text-white font-bold">
                  MT
                </div>
                <div>
                  <p className="font-semibold">Michael Torres</p>
                  <p className="text-sm text-muted-foreground">Director of Revenue Management Strategy, Hilton</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Optimizing Hospitality Revenue?</h2>
          <p className="text-slate-400 mb-8">
            We help hotels build AI systems that maximize revenue while delighting guests.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/suno">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Suno
            </Button>
          </Link>
          <Link href="/case-studies/ulta-beauty">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Ulta Beauty
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
