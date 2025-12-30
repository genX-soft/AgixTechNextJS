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
  ArrowRight,
  UtensilsCrossed,
  Target,
  Clock,
  TrendingUp,
  Quote,
  Calendar,
  Leaf,
  ShoppingCart,
  Trash2,
  CheckCircle2,
  Package,
  Heart,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  Users,
  RotateCcw,
} from "lucide-react";
import { Link } from "wouter";

export default function HungryrootCaseStudyPage() {
  const [selectedDay, setSelectedDay] = useState(2);
  const [dietaryProfile, setDietaryProfile] = useState({
    vegetarian: false,
    glutenFree: true,
    lowCarb: false,
    dairyFree: false,
  });

  const weeklyMeals = [
    { day: "Mon", meals: ["Avocado Toast Bowl", "Thai Chicken Salad", "Salmon with Veggies"], calories: 1850 },
    { day: "Tue", meals: ["Greek Yogurt Parfait", "Mediterranean Bowl", "Steak Stir-Fry"], calories: 1920 },
    { day: "Wed", meals: ["Smoothie Bowl", "Quinoa Power Bowl", "Lemon Herb Chicken"], calories: 1780 },
    { day: "Thu", meals: ["Overnight Oats", "Asian Noodle Bowl", "Shrimp Tacos"], calories: 1890 },
    { day: "Fri", meals: ["Egg White Wrap", "Buddha Bowl", "Teriyaki Salmon"], calories: 1820 },
    { day: "Sat", meals: ["Pancake Stack", "Harvest Salad", "Pizza Night"], calories: 2100 },
    { day: "Sun", meals: ["Brunch Burrito", "Soup & Sandwich", "Pasta Primavera"], calories: 1950 },
  ];

  const preferences = [
    { id: "vegetarian", label: "Vegetarian", icon: Leaf },
    { id: "glutenFree", label: "Gluten-Free", icon: CheckCircle2 },
    { id: "lowCarb", label: "Low-Carb", icon: Target },
    { id: "dairyFree", label: "Dairy-Free", icon: Heart },
  ];

  const groceryOptimization = [
    { category: "Proteins", items: 8, aiSuggested: 3, savings: "$12" },
    { category: "Produce", items: 15, aiSuggested: 5, savings: "$8" },
    { category: "Grains", items: 4, aiSuggested: 1, savings: "$4" },
    { category: "Dairy", items: 6, aiSuggested: 2, savings: "$6" },
  ];

  const togglePreference = (pref: keyof typeof dietaryProfile) => {
    setDietaryProfile(prev => ({ ...prev, [pref]: !prev[pref] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-lime-500/5 to-green-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-lime-500/30 text-lime-400">
                    <Leaf className="w-3 h-3 mr-1" />
                    Meal Planning AI
                  </Badge>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    Personalization
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-company-name">
                  Hungryroot
                </h1>

                <p className="text-xl text-muted-foreground">
                  AI-powered personalized meal planning and grocery optimization. Reducing 
                  food waste by 73% while improving customer satisfaction.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-lime-400">+156%</p>
                    <p className="text-sm text-muted-foreground">Customer Retention</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-73%</p>
                    <p className="text-sm text-muted-foreground">Food Waste</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">94%</p>
                    <p className="text-sm text-muted-foreground">Meal Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Meal Plan Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <UtensilsCrossed className="w-6 h-6 text-lime-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Weekly Plan</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { day: "Mon", meal: "Thai Chicken Salad", calories: 620 },
                      { day: "Tue", meal: "Mediterranean Bowl", calories: 580 },
                      { day: "Wed", meal: "Lemon Herb Chicken", calories: 540 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-white">{item.meal}</p>
                          <p className="text-xs text-slate-400">{item.day}</p>
                        </div>
                        <Badge className="bg-lime-500/20 text-lime-400 border-lime-500/30">
                          {item.calories} cal
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

            <h2 className="text-3xl font-bold">Generic Meal Kits That Nobody Wanted</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Traditional meal delivery services sent the same generic boxes to everyone—regardless of dietary needs, 
              taste preferences, or lifestyle. The result? Customers received ingredients they didn't want, 
              wasted food they couldn't use, and eventually churned to competitors. Without personalization, 
              Hungryroot was losing customers as fast as they acquired them.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Trash2 className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">38%</p>
                  <p className="text-sm text-muted-foreground">Food waste per box</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <RotateCcw className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">67%</p>
                  <p className="text-sm text-muted-foreground">6-month churn rate</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">12%</p>
                  <p className="text-sm text-muted-foreground">Meal satisfaction score</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-lime-500/20 text-lime-400 border-lime-500/30">
              <Calendar className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Personalized Meal Planner</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              Toggle dietary preferences to see AI-generated meal plans adapt in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-lime-400" />
                    Dietary Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {preferences.map((pref) => (
                    <motion.div
                      key={pref.id}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        dietaryProfile[pref.id as keyof typeof dietaryProfile]
                          ? 'bg-lime-500/20 border border-lime-500/50'
                          : 'bg-slate-700/50 border border-slate-700'
                      }`}
                      onClick={() => togglePreference(pref.id as keyof typeof dietaryProfile)}
                      data-testid={`pref-${pref.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          dietaryProfile[pref.id as keyof typeof dietaryProfile]
                            ? 'bg-lime-500'
                            : 'bg-slate-600'
                        }`}>
                          <pref.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-white">{pref.label}</span>
                        {dietaryProfile[pref.id as keyof typeof dietaryProfile] && (
                          <CheckCircle2 className="w-4 h-4 text-lime-400 ml-auto" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-400" />
                    Grocery Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {groceryOptimization.map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-700/50">
                      <div>
                        <p className="text-sm font-medium text-white">{cat.category}</p>
                        <p className="text-xs text-slate-400">{cat.items} items, {cat.aiSuggested} AI picks</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {cat.savings} saved
                      </Badge>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-slate-700 text-center">
                    <p className="text-sm text-slate-400">Total Weekly Savings</p>
                    <p className="text-2xl font-bold text-green-400">$30</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-slate-700 bg-slate-800/50 h-full">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-lime-400" />
                      Weekly Meal Calendar
                    </CardTitle>
                    <Button size="sm" variant="ghost" className="gap-2 text-lime-400">
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {weeklyMeals.map((day, i) => (
                      <Button
                        key={i}
                        variant={selectedDay === i ? "default" : "ghost"}
                        className={`shrink-0 ${selectedDay === i ? 'bg-lime-500 hover:bg-lime-600' : ''}`}
                        onClick={() => setSelectedDay(i)}
                        data-testid={`day-${day.day}`}
                      >
                        {day.day}
                      </Button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedDay}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {["Breakfast", "Lunch", "Dinner"].map((mealType, i) => (
                        <div key={mealType} className="p-4 rounded-lg bg-slate-700/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400 uppercase tracking-wide">{mealType}</span>
                            <Badge variant="outline" className="text-xs border-slate-600">
                              {mealType === "Breakfast" ? "~450 cal" : mealType === "Lunch" ? "~600 cal" : "~750 cal"}
                            </Badge>
                          </div>
                          <p className="font-medium text-white">{weeklyMeals[selectedDay].meals[i]}</p>
                          <div className="flex gap-2 mt-2">
                            {dietaryProfile.glutenFree && (
                              <Badge className="bg-lime-500/20 text-lime-400 border-lime-500/30 text-xs">GF</Badge>
                            )}
                            {dietaryProfile.vegetarian && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">V</Badge>
                            )}
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              15 min
                            </Badge>
                          </div>
                        </div>
                      ))}

                      <div className="p-4 rounded-lg bg-lime-500/10 border border-lime-500/30 text-center">
                        <p className="text-sm text-slate-400">Daily Total</p>
                        <p className="text-2xl font-bold text-lime-400">{weeklyMeals[selectedDay].calories} cal</p>
                        <p className="text-xs text-slate-400 mt-1">Balanced macros: 35% carbs, 30% protein, 35% fat</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-lime-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="border-lime-500/20 bg-gradient-to-br from-lime-500/5 to-green-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-lime-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "Most meal kit services give everyone the same box. Our AI learns that you love Thai food but hate cilantro, that you're training for a marathon, and that you always skip cooking on Thursdays. Every week's box is uniquely yours—that's why our retention is 34% higher than industry average."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-green-500 flex items-center justify-center text-white font-bold">
                  ER
                </div>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Director of Personalization Science, Hungryroot</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Personalized Food AI?</h2>
          <p className="text-slate-400 mb-8">
            Let's create meal planning that adapts to every customer.
          </p>
          <CtaForm />
        </div>
      </section>

      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/innit">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Innit
            </Button>
          </Link>
          <Link href="/case-studies/alphasense">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              AlphaSense
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
