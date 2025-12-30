'use client'
import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  GraduationCap,
  Brain,
  Clock,
  AlertTriangle,
  TrendingUp,
  Quote,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Users,
  MessageSquare,
  Target,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function QuizletCaseStudyPage() {
  const socraticExamples = [
    {
      studentSays: "What's the capital of France?",
      badResponse: "The capital of France is Paris.",
      goodResponse: "Good question! France is in Western Europe. What major city do you know that's famous for the Eiffel Tower?",
      principle: "Guide discovery, don't give answers"
    },
    {
      studentSays: "I don't understand photosynthesis.",
      badResponse: "Photosynthesis is the process by which plants convert light energy into chemical energy.",
      goodResponse: "Let's break it down. Plants need energy to grow. Where do you think they get that energy from?",
      principle: "Scaffold from what they know"
    },
  ];

  const learningProgression = [
    { session: 1, concept: "Cell Structure", mastery: 23, misconceptions: 4 },
    { session: 2, concept: "Cell Structure", mastery: 47, misconceptions: 2 },
    { session: 3, concept: "Cell Structure", mastery: 78, misconceptions: 1 },
    { session: 4, concept: "Cell Structure", mastery: 92, misconceptions: 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero - Learning Focus */}
      <section className="pt-24 lg:pt-28 pb-16 bg-gradient-to-br from-background via-indigo-500/5 to-purple-500/10 min-h-[80vh] flex items-center">
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
                  <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    EdTech
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    Adaptive Learning
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Quizlet
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Building Q-Chat: an AI tutor that teaches through questions, not answers—
                  serving 60M+ students with personalized Socratic learning.
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-400">+67%</p>
                    <p className="text-sm text-muted-foreground">Learning Gains</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">60M+</p>
                    <p className="text-sm text-muted-foreground">Students Served</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">89%</p>
                    <p className="text-sm text-muted-foreground">Misconception Resolution</p>
                  </div>
                </div>
              </div>

              {/* Chat Interface Demo */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-indigo-600 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Q-Chat</p>
                      <p className="text-xs text-white/70">Socratic AI Tutor</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3 justify-end">
                      <div className="p-3 rounded-2xl rounded-tr-none bg-indigo-500/30 text-sm max-w-[80%]">
                        What causes seasons on Earth?
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="p-3 rounded-2xl rounded-tl-none bg-slate-700/50 text-sm max-w-[80%]">
                        Great question! Think about this: Earth orbits the Sun, but its axis is tilted. 
                        When one hemisphere is tilted toward the Sun, what do you think happens to the 
                        amount of sunlight it receives?
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

            <h2 className="text-3xl font-bold">AI That Teaches, Not Just Answers</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              When ChatGPT launched, students started using it for homework. But there was a problem: 
              they weren't learning. Getting answers immediately short-circuits the learning process. 
              Quizlet needed AI that would guide students to discover answers themselves.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-red-400">The Problem with Direct Answers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">-</span>
                      <span>Students don't build mental models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">-</span>
                      <span>Knowledge doesn't transfer to new problems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">-</span>
                      <span>Misconceptions go undetected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">-</span>
                      <span>Learning gains 40% lower than flashcards</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-500/20">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-green-400">The Socratic Method</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">+</span>
                      <span>Guide through questions, not statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">+</span>
                      <span>Build on what students already know</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">+</span>
                      <span>Surface and correct misconceptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">+</span>
                      <span>Create lasting understanding</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Socratic Method in Action */}
      <section className="py-24 bg-gradient-to-br from-indigo-500/5 via-background to-purple-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">
                <MessageSquare className="w-3 h-3 mr-1" />
                Socratic Design
              </Badge>
              <h2 className="text-3xl font-bold">The Difference in Practice</h2>
            </div>

            <div className="space-y-8">
              {socraticExamples.map((example, i) => (
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
                        <p className="text-sm font-medium">Student asks: "{example.studentSays}"</p>
                      </div>
                      <div className="grid md:grid-cols-2">
                        <div className="p-6 border-r border-border">
                          <Badge className="mb-3 bg-red-500/20 text-red-400 border-red-500/30">
                            Traditional AI
                          </Badge>
                          <p className="text-sm text-muted-foreground">{example.badResponse}</p>
                        </div>
                        <div className="p-6">
                          <Badge className="mb-3 bg-green-500/20 text-green-400 border-green-500/30">
                            Q-Chat Socratic Response
                          </Badge>
                          <p className="text-sm">{example.goodResponse}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-indigo-500/10 border-t border-indigo-500/20">
                        <p className="text-sm text-indigo-400">
                          <span className="font-semibold">Principle: </span>
                          {example.principle}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Progression Visual */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                <BarChart3 className="w-3 h-3 mr-1" />
                Knowledge Tracking
              </Badge>
              <h2 className="text-3xl font-bold">Mastery Progression Over Sessions</h2>
              <p className="text-muted-foreground">
                Real example: Student learning cell structure concepts
              </p>
            </div>

            <div className="space-y-4">
              {learningProgression.map((session, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-20 text-sm text-muted-foreground">
                    Session {session.session}
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-10 bg-muted rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${session.mastery}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-end px-3"
                      >
                        <span className="text-sm font-semibold text-white">{session.mastery}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-32 text-right">
                    <Badge variant={session.misconceptions === 0 ? "default" : "outline"} 
                           className={session.misconceptions === 0 ? "bg-green-500" : ""}>
                      {session.misconceptions} misconceptions
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-green-400 font-medium">
                4 sessions to mastery—with all misconceptions identified and resolved
              </p>
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
                Learning Outcomes
              </Badge>
              <h2 className="text-3xl font-bold text-white">Measured Impact</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Brain className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">+67%</p>
                  <p className="text-sm text-slate-400 mt-2">Learning Gains</p>
                  <p className="text-xs text-slate-500">vs. flashcards</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">+183%</p>
                  <p className="text-sm text-slate-400 mt-2">Test Improvement</p>
                  <p className="text-xs text-slate-500">12% to 34%</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">11.8min</p>
                  <p className="text-sm text-slate-400 mt-2">Avg Session</p>
                  <p className="text-xs text-slate-500">up from 4.2min</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">78%</p>
                  <p className="text-sm text-slate-400 mt-2">Teacher Adoption</p>
                  <p className="text-xs text-slate-500">in pilot schools</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial - VP Level */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-indigo-500/20">
              <CardContent className="p-8 md:p-12">
                <Quote className="w-12 h-12 text-indigo-500/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                  "Q-Chat represents what AI in education should be. It's not about giving 
                  students answers faster—it's about helping them think better. The misconception 
                  detection alone is worth it. Teachers can now see exactly where students 
                  struggle and intervene at the right moment."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    SL
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Liu</p>
                    <p className="text-sm text-muted-foreground">VP of Learning Sciences, Quizlet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-500/10 via-background to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Building AI for Education?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We help EdTech companies build AI that actually improves learning outcomes—
              not just engagement metrics.
            </p>
            <CtaForm />
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/case-studies/stitch-fix">
              <Button variant="ghost" className="gap-2" data-testid="button-prev-case">
                <ArrowLeft className="w-4 h-4" />
                Previous: Stitch Fix
              </Button>
            </Link>
            <Link href="/case-studies/hilton-hotels">
              <Button variant="outline" className="gap-2 border-primary/50 text-primary" data-testid="button-next-case">
                Next: Hilton Hotels
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
