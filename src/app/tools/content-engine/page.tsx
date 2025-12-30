'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Target,
  FileText,
  RefreshCw,
  Lock,
  AlertCircle,
  Users,
  Tag,
  Sparkles,
  Zap,
  Clock,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { blogArticles, blogTopics } from '@/lib/tools/blogContent';

const PASSCODE = '9636962228';
const STORAGE_KEY = 'content-engine-auth';

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function getDifficultyColor(difficulty: number): string {
  if (difficulty < 40) return 'text-emerald-400';
  if (difficulty < 60) return 'text-amber-400';
  return 'text-rose-400';
}

function getDifficultyBg(difficulty: number): string {
  if (difficulty < 40) return 'bg-emerald-500/10 border-emerald-500/30';
  if (difficulty < 60) return 'bg-amber-500/10 border-amber-500/30';
  return 'bg-rose-500/10 border-rose-500/30';
}

function ArticleCard({ 
  article, 
  topic,
  index 
}: { 
  article: typeof blogArticles[0];
  topic: typeof blogTopics[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <Card className="border-slate-700/50 bg-slate-800/50 hover:border-slate-600/50 transition-all">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-[10px] sm:text-xs">
                {article.category}
              </Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] sm:text-xs">
                <Users className="h-3 w-3 mr-1" />
                {article.targetAudience}
              </Badge>
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-[10px] sm:text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime}
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-[10px] sm:text-xs">
                <FileText className="h-3 w-3 mr-1" />
                {article.wordCount.toLocaleString()} words
              </Badge>
            </div>
          </div>

          <Link 
            href={`/tools/content-engine/blog/${article.slug}`}
            className="block"
            data-testid={`link-article-${article.slug}`}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 hover:text-emerald-400 transition-colors cursor-pointer">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-sm text-slate-400 mb-4">{article.metaDescription}</p>

          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-700/30 mb-5">
            <h4 className="text-xs font-medium text-rose-300 mb-3 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
              Pain Areas Addressed
            </h4>
            <div className="flex flex-wrap gap-2">
              {topic.painPoints.map((pain, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded">
                  {pain}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20 mb-5">
            <h4 className="text-xs font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              AGIX Solution
            </h4>
            <p className="text-sm text-emerald-300">{topic.agixSolution}</p>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-medium text-slate-300 mb-3 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-cyan-400" />
              Keywords (Volume / Difficulty / Type)
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {topic.keywords.map((kw, i) => (
                <span 
                  key={i} 
                  className={`px-2 py-1 rounded text-xs border ${getDifficultyBg(kw.difficulty)}`}
                >
                  <span className="text-white font-medium">{kw.keyword}</span>
                  <span className="ml-1.5 text-[10px] opacity-80">
                    {formatNumber(kw.volume)} / {kw.difficulty} / {kw.type}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-medium text-slate-300 mb-2 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-purple-400" />
              Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/30 text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/40 rounded-lg border border-slate-700/20 mb-4">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Search Volume</div>
              <div className="text-lg font-bold text-cyan-400 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {formatNumber(topic.searchVolume)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Difficulty</div>
              <div className={`text-lg font-bold flex items-center justify-center gap-1 ${getDifficultyColor(topic.difficulty)}`}>
                <BarChart3 className="h-4 w-4" />
                {topic.difficulty}/100
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-700/50">
            <Link href={`/tools/content-engine/blog/${article.slug}`}>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white" data-testid={`button-view-article-${article.slug}`}>
                <FileText className="h-4 w-4 mr-2" />
                View Full Article ({article.wordCount.toLocaleString()} words)
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PasscodeGate({ onSuccess }: { onSuccess: () => void }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setError(false);
    
    setTimeout(() => {
      if (passcode === PASSCODE) {
        sessionStorage.setItem(STORAGE_KEY, 'authenticated');
        onSuccess();
      } else {
        setError(true);
      }
      setIsChecking(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-700/50 bg-slate-900/90 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                <Lock className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Content Engine</h1>
              <p className="text-sm text-slate-400">Enter passcode to access SEO content tools</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white text-center text-lg tracking-widest"
                  data-testid="input-passcode"
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center justify-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Incorrect passcode
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                disabled={isChecking || !passcode}
                data-testid="button-submit-passcode"
              >
                {isChecking ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  'Access Content Engine'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <Link href="/" className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors" data-testid="link-back-home">
                <ArrowLeft className="h-4 w-4" />
                Back to AGIX Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function ContentEnginePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = sessionStorage.getItem(STORAGE_KEY);
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasscodeGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  const totalWords = blogArticles.reduce((acc, article) => acc + article.wordCount, 0);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors" data-testid="link-home">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to AGIX</span>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                {blogArticles.length} Articles
              </Badge>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                {totalWords.toLocaleString()} Total Words
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full border border-emerald-500/20 mb-4">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">AGIX Content Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Authority-Building Blog Articles
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-4">
            Pre-generated blog content with 3,000+ words per article. Each article includes 
            rich SEO metadata, pain point analysis, keyword analytics, and AGIX solutions positioning.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-1 bg-slate-800/50 rounded">Keyword Analytics</span>
            <span className="px-2 py-1 bg-slate-800/50 rounded">Pain Point Coverage</span>
            <span className="px-2 py-1 bg-slate-800/50 rounded">AGIX Solutions</span>
            <span className="px-2 py-1 bg-slate-800/50 rounded">Volume/Difficulty Metrics</span>
          </div>
        </motion.div>

        <div className="space-y-6">
          {blogArticles.map((article, index) => {
            const topic = blogTopics.find(t => t.slug === article.slug);
            if (!topic) return null;
            return (
              <ArticleCard 
                key={article.slug} 
                article={article} 
                topic={topic}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
