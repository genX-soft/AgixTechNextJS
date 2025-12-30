import { MainFooter } from "@/components/main-footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainHeader } from "@/components/main-header";
import { CtaForm } from "@/components/forms/cta-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Music,
  Brain,
  Zap,
  Quote,
  ArrowRight,
  Wand2,
  Timer,
  Volume2,
  Play,
  Pause,
  SkipForward,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Layers,
  Gauge,
  Activity,
  AlertTriangle,
  DollarSign,
  Lock,
  Frown,
} from "lucide-react";
import { Link } from "wouter";

export default function SunoCaseStudyPage() {
  const [selectedGenre, setSelectedGenre] = useState("pop");
  const [isPlaying, setIsPlaying] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showGeneration, setShowGeneration] = useState(false);

  const genres = [
    { id: "pop", name: "Pop", color: "from-pink-500 to-rose-500", tempo: "120 BPM", mood: "Uplifting" },
    { id: "hiphop", name: "Hip Hop", color: "from-amber-500 to-orange-500", tempo: "90 BPM", mood: "Confident" },
    { id: "electronic", name: "Electronic", color: "from-cyan-500 to-blue-500", tempo: "128 BPM", mood: "Energetic" },
    { id: "acoustic", name: "Acoustic", color: "from-green-500 to-emerald-500", tempo: "85 BPM", mood: "Intimate" },
  ];

  const pipelineStages = [
    { name: "Prompt Analysis", duration: "0.3s", progress: 100 },
    { name: "Style Encoding", duration: "0.8s", progress: 100 },
    { name: "Structure Generation", duration: "4.2s", progress: 85 },
    { name: "Audio Synthesis", duration: "12.1s", progress: 60 },
    { name: "Mastering", duration: "2.6s", progress: 0 },
  ];

  const startGeneration = () => {
    setShowGeneration(true);
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const currentGenre = genres.find(g => g.id === selectedGenre) || genres[0];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      {/* Hero Section - Uniform Layout */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-purple-500/5 to-pink-500/10 min-h-[60vh] flex items-center">
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
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    <Music className="w-3 h-3 mr-1" />
                    Creative AI
                  </Badge>
                  <Badge variant="outline" className="border-pink-500/30 text-pink-400">
                    Audio Generation
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Suno
                </h1>

                <p className="text-xl text-muted-foreground">
                  Making music creation feel like magic. We helped Suno reduce generation 
                  time from 90 seconds to 20 seconds—transforming user behavior from 
                  "submit and forget" to "create and iterate."
                </p>

                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">-78%</p>
                    <p className="text-sm text-muted-foreground">Generation Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-pink-400">4.2M</p>
                    <p className="text-sm text-muted-foreground">Daily Songs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">+34%</p>
                    <p className="text-sm text-muted-foreground">User Retention</p>
                  </div>
                </div>
              </div>

              {/* Audio Generation Visual */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Wand2 className="w-6 h-6 text-purple-400" />
                    <p className="text-xs uppercase tracking-widest text-slate-400">Generation Pipeline</p>
                  </div>
                  <div className="space-y-3">
                    {pipelineStages.map((stage, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{stage.name}</p>
                          <Progress value={stage.progress} className="h-1 mt-1" />
                        </div>
                        <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs">
                          {stage.duration}
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

            <h2 className="text-3xl font-bold">Music Creation Was Stuck in the Stone Age</h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Content creators and businesses faced a brutal reality: original music was either prohibitively 
              expensive through licensing, required years of musical training to produce, or meant settling 
              for generic royalty-free tracks that sounded like everyone else. Creative vision was constantly 
              compromised by budget and skill constraints—until AI changed the game.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-500/20">
                <CardContent className="p-6 text-center">
                  <Frown className="w-8 h-8 text-red-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-red-400">68%</p>
                  <p className="text-sm text-muted-foreground">Creators hit creative blocks</p>
                </CardContent>
              </Card>
              <Card className="border-amber-500/20">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-amber-400">$500+</p>
                  <p className="text-sm text-muted-foreground">Per licensed track cost</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Lock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-400">0</p>
                  <p className="text-sm text-muted-foreground">Customization options</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Audio Lab Workbench - Unique Structure */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Wand2 className="w-3 h-3 mr-1" />
              Interactive Demo
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Audio Lab Workbench</h2>
            <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
              Experience how Suno generates music in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Creation Studio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Genre Selector */}
                <div>
                  <p className="text-sm text-slate-400 mb-3">Select Genre</p>
                  <div className="grid grid-cols-2 gap-2">
                    {genres.map((genre) => (
                      <Button
                        key={genre.id}
                        variant={selectedGenre === genre.id ? "default" : "outline"}
                        className={`w-full justify-start gap-2 ${selectedGenre === genre.id ? `bg-gradient-to-r ${genre.color} border-0` : 'border-slate-600'}`}
                        onClick={() => setSelectedGenre(genre.id)}
                        data-testid={`genre-${genre.id}`}
                      >
                        <Volume2 className="w-4 h-4" />
                        {genre.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Genre Details */}
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Tempo</p>
                      <p className="font-medium text-white">{currentGenre.tempo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Mood</p>
                      <p className="font-medium text-white">{currentGenre.mood}</p>
                    </div>
                  </div>
                </div>

                {/* Prompt Input */}
                <div>
                  <p className="text-sm text-slate-400 mb-2">Prompt</p>
                  <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                    <p className="text-sm text-slate-300 italic">
                      "An uplifting {currentGenre.name.toLowerCase()} song about new beginnings, with warm vocals and catchy melody"
                    </p>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  className={`w-full gap-2 bg-gradient-to-r ${currentGenre.color}`}
                  onClick={startGeneration}
                  disabled={showGeneration && generationProgress < 100}
                  data-testid="button-generate"
                >
                  {showGeneration && generationProgress < 100 ? (
                    <>
                      <Activity className="w-4 h-4 animate-pulse" />
                      Generating... {generationProgress}%
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Generate Track
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Visualization Panel */}
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-pink-400" />
                  Generation Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelineStages.map((stage, i) => {
                  const stageProgress = showGeneration 
                    ? Math.min(100, Math.max(0, (generationProgress - i * 20) * 5))
                    : 0;
                  return (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">{stage.name}</span>
                        <span className="text-slate-500">{stage.duration}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stageProgress}%` }}
                          className={`h-full rounded-full bg-gradient-to-r ${currentGenre.color}`}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Waveform Visualization */}
                <div className="mt-6 p-4 rounded-lg bg-slate-900 border border-slate-700">
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white"
                      onClick={() => setIsPlaying(!isPlaying)}
                      disabled={!showGeneration || generationProgress < 100}
                      data-testid="button-play"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <div className="flex-1">
                      <div className="h-12 flex items-center gap-0.5">
                        {[...Array(50)].map((_, i) => {
                          const height = showGeneration && generationProgress > 90
                            ? 20 + Math.sin(i * 0.3) * 15 + Math.random() * 10
                            : 5;
                          return (
                            <motion.div
                              key={i}
                              initial={{ height: 5 }}
                              animate={{ height: `${height}px` }}
                              className={`flex-1 rounded-full bg-gradient-to-t ${currentGenre.color}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <span className="text-sm text-slate-400">
                      {showGeneration && generationProgress >= 100 ? "0:00 / 2:34" : "--:-- / --:--"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before/After Performance Comparison */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              <Gauge className="w-3 h-3 mr-1" />
              Performance
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Infrastructure Transformation</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-lg text-red-400">Before Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Generation Time", value: "90+ seconds", detail: "Sequential processing" },
                  { label: "GPU Utilization", value: "Single GPU", detail: "Bottleneck on synthesis" },
                  { label: "Model Loading", value: "Per request", detail: "Cold start penalty" },
                  { label: "User Behavior", value: "Submit & forget", detail: "Tab switching during wait" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                      <span className="text-sm text-red-400">{item.value}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">After Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Generation Time", value: "~20 seconds", detail: "Parallel pipeline" },
                  { label: "GPU Utilization", value: "Multi-GPU sharding", detail: "Distributed synthesis" },
                  { label: "Model Loading", value: "Warm pools", detail: "Per-region hot models" },
                  { label: "User Behavior", value: "Watch & iterate", detail: "3x more songs per session" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                      <span className="text-sm text-green-400">{item.value}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Engagement Metrics */}
      <section className="py-16 bg-gradient-to-b from-background to-purple-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-pink-500/20 text-pink-400 border-pink-500/30">
              <Users className="w-3 h-3 mr-1" />
              User Impact
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">Behavioral Transformation</h2>
            <p className="text-muted-foreground mt-2">How speed changed user engagement</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                metric: "Session Duration", 
                before: "4.2 min", 
                after: "12.8 min", 
                change: "+205%",
                insight: "Users stay to watch generation complete" 
              },
              { 
                metric: "Songs per Session", 
                before: "1.3", 
                after: "4.1", 
                change: "+215%",
                insight: "Rapid iteration encourages experimentation" 
              },
              { 
                metric: "Share Rate", 
                before: "8%", 
                after: "23%", 
                change: "+188%",
                insight: "Shorter wait means more sharing moments" 
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-4">{item.metric}</p>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div>
                        <p className="text-2xl font-bold text-muted-foreground line-through">{item.before}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-2xl font-bold text-purple-400">{item.after}</p>
                      </div>
                    </div>
                    <Badge className="mb-3 bg-green-500/20 text-green-400 border-green-500/30">
                      {item.change}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{item.insight}</p>
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
          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-10 h-10 text-purple-500/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                "The speed improvement changed how people use Suno. Before, they'd submit a prompt and walk away. Now they watch it happen, iterate immediately, and create 3x more songs per session. That's the power of making AI feel instant."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="font-semibold">Marcus Chen</p>
                  <p className="text-sm text-muted-foreground">VP of Engineering, Suno</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Building Generative AI?</h2>
          <p className="text-slate-400 mb-8">
            We help companies optimize AI pipelines for real-time user experiences.
          </p>
          <CtaForm />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
          <Link href="/case-studies/dave">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
              <ArrowLeft className="w-4 h-4" />
              Dave
            </Button>
          </Link>
          <Link href="/case-studies/hilton-hotels">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
              Hilton Hotels
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
