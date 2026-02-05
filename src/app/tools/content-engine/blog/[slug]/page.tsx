'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Lock,
  AlertCircle,
  Target,
  Zap,
  Users,
  FileText,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Quote,
  Info,
  Code2,
  List,
  Table2,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { blogArticles, blogTopics, type BlogSection, type BlogArticle } from '@/lib/tools/blogContent';

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

function SectionRenderer({ section, index }: { section: BlogSection; index: number }) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-slate-700/50">
          {section.content}
        </h2>
      );
    
    case 'paragraph':
      return (
        <p className="text-slate-300 leading-relaxed mb-4">
          {section.content}
        </p>
      );
    
    case 'list':
      return (
        <div className="mb-6">
          {section.content && (
            <p className="text-slate-300 font-medium mb-3">{section.content}</p>
          )}
          <ul className="space-y-2">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <ChevronRight className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    
    case 'callout':
      return (
        <div className="my-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-cyan-200 italic">{section.content}</p>
          </div>
        </div>
      );
    
    case 'quote':
      return (
        <blockquote className="my-6 pl-4 border-l-4 border-emerald-500 py-2">
          <div className="flex items-start gap-3">
            <Quote className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <p className="text-slate-300 italic">{section.content}</p>
          </div>
        </blockquote>
      );
    
    case 'stats':
      return (
        <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {section.statsData?.stats.map((stat, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
              {stat.trend && (
                <div className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-emerald-400' : stat.trend === 'down' ? 'text-rose-400' : 'text-slate-400'}`}>
                  {stat.trend === 'up' ? 'Increasing' : stat.trend === 'down' ? 'Decreasing' : 'Stable'}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    
    case 'table':
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                {section.tableData?.headers.map((header, i) => (
                  <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-slate-200 border border-slate-700/30">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.tableData?.rows.map((row, i) => (
                <tr key={i} className="bg-slate-900/30 hover:bg-slate-800/30">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-slate-300 border border-slate-700/30">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    
    case 'code':
      return (
        <div className="my-6">
          {section.codeData?.title && (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700/30 rounded-t-lg">
              <Code2 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-slate-200">{section.codeData.title}</span>
              <Badge variant="outline" className="ml-auto text-xs">{section.codeData.language}</Badge>
            </div>
          )}
          <pre className="p-4 bg-slate-950 border border-slate-700/30 rounded-b-lg overflow-x-auto">
            <code className="text-sm text-emerald-300 font-mono whitespace-pre">
              {section.codeData?.code}
            </code>
          </pre>
          {section.codeData?.explanation && (
            <p className="mt-2 text-sm text-slate-400 italic">{section.codeData.explanation}</p>
          )}
        </div>
      );
    
    case 'architecture':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            {section.architectureData?.title}
          </h3>
          <div className="space-y-3">
            {section.architectureData?.layers.map((layer, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                <div className="font-semibold text-emerald-400 mb-2">{layer.name}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {layer.components.map((comp, j) => (
                    <Badge key={j} variant="outline" className="bg-slate-700/30 text-slate-300 text-xs">
                      {comp}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-slate-400">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'flowchart':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            {section.flowchartData?.title}
          </h3>
          <div className="space-y-4">
            {section.flowchartData?.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                <div className="flex-1 bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                  <div className="font-semibold text-white mb-1">{step.title}</div>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'infographic':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-4">{section.infographicData?.title}</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {section.infographicData?.items.map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-lg font-semibold text-emerald-400 mb-2">{item.label}</div>
                <p className="text-sm text-slate-300">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'faq':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            {section.faqData?.title || 'Frequently Asked Questions'}
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {section.faqData?.items.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`}
                className="bg-slate-800/50 border border-slate-700/30 rounded-lg mb-3 px-4 data-[state=open]:bg-slate-800/70"
              >
                <AccordionTrigger 
                  className="text-left font-semibold text-cyan-400 hover:text-cyan-300 hover:no-underline py-4"
                  data-testid={`accordion-faq-${i}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      );
    
    case 'benchmark':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            {section.benchmarkData?.title || 'Industry Benchmarks'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200 border border-slate-700/30">Metric</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200 border border-slate-700/30">Industry Avg</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200 border border-slate-700/30">Top Performers</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-400 border border-slate-700/30">AGIX Clients</th>
                </tr>
              </thead>
              <tbody>
                {section.benchmarkData?.benchmarks.map((bench, i) => (
                  <tr key={i} className="bg-slate-900/30 hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-sm text-slate-300 border border-slate-700/30 font-medium">{bench.metric}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 border border-slate-700/30">{bench.industryAvg}</td>
                    <td className="px-4 py-3 text-sm text-cyan-400 border border-slate-700/30">{bench.topPerformers}</td>
                    <td className="px-4 py-3 text-sm text-emerald-400 border border-slate-700/30 font-semibold">{bench.agixClients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    
    case 'checklist':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-4">{section.checklistData?.title || 'Checklist'}</h3>
          <div className="space-y-3">
            {section.checklistData?.items.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${item.critical ? 'bg-rose-500/10 border-rose-500/30' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${item.critical ? 'bg-rose-500' : 'bg-slate-600'}`}>
                  {item.critical ? '!' : i + 1}
                </div>
                <div>
                  <div className={`font-medium ${item.critical ? 'text-rose-300' : 'text-slate-200'}`}>{item.item}</div>
                  <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'formula':
      return (
        <div className="my-8 bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">{section.formulaData?.title}</h3>
          <div className="bg-slate-900 rounded-lg p-4 mb-4 font-mono text-lg text-emerald-400 text-center">
            {section.formulaData?.formula}
          </div>
          <div className="space-y-2 mb-4">
            {section.formulaData?.variables.map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-mono text-cyan-400">{v.symbol}</span>
                <span className="text-slate-400">=</span>
                <span className="text-slate-300">{v.meaning}</span>
              </div>
            ))}
          </div>
          {section.formulaData?.example && (
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="text-xs text-slate-500 mb-1">Example:</div>
              <p className="text-sm text-slate-300">{section.formulaData.example}</p>
            </div>
          )}
        </div>
      );
    
    case 'decision-tree':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-400" />
            {section.decisionTreeData?.title || 'Decision Framework'}
          </h3>
          {section.decisionTreeData?.description && (
            <p className="text-sm text-slate-400 mb-4">{section.decisionTreeData.description}</p>
          )}
          <div className="space-y-3">
            {section.decisionTreeData?.nodes.map((node, i) => (
              <div 
                key={node.id} 
                className={`p-4 rounded-lg border ${
                  node.type === 'question' 
                    ? 'bg-cyan-500/10 border-cyan-500/30' 
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    node.type === 'question' ? 'bg-cyan-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {node.type === 'question' ? 'Q' : 'A'}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${node.type === 'question' ? 'text-cyan-300' : 'text-emerald-300'}`}>
                      {node.text}
                    </p>
                    {node.type === 'question' && (node.yes || node.no) && (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        {node.yes && (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
                            Yes: {node.yes}
                          </span>
                        )}
                        {node.no && (
                          <span className="px-2 py-1 bg-rose-500/20 text-rose-400 rounded">
                            No: {node.no}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'comparison':
      return (
        <div className="my-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            {section.comparisonData?.title || 'Comparison Matrix'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200 border border-slate-700/30">Criteria</th>
                  {section.comparisonData?.options.map((option, i) => (
                    <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-slate-200 border border-slate-700/30">
                      {option.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.comparisonData?.criteria.map((criterion, i) => (
                  <tr key={i} className="bg-slate-900/30 hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-sm text-slate-300 border border-slate-700/30 font-medium">
                      {criterion}
                    </td>
                    {section.comparisonData?.options.map((option, j) => (
                      <td key={j} className="px-4 py-3 text-sm text-slate-300 border border-slate-700/30">
                        {option.scores[i]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.comparisonData?.options.some(o => o.recommendation) && (
            <div className="mt-4 space-y-2">
              {section.comparisonData.options.filter(o => o.recommendation).map((option, i) => (
                <div key={i} className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <span className="text-emerald-400 font-medium">{option.name}:</span>
                  <span className="text-slate-300 ml-2">{option.recommendation}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    
    default:
      return null;
  }
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
        setPasscode('');
      }
      setIsChecking(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Blog Content</h1>
              <p className="text-sm text-slate-400">Enter your access code to view</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError(false);
                  }}
                  className={`bg-slate-900/50 border-slate-700 text-white text-center text-lg tracking-widest ${error ? 'border-red-500' : ''}`}
                  data-testid="input-blog-passcode"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400 flex items-center justify-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Invalid passcode
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                disabled={isChecking || !passcode}
                data-testid="button-blog-unlock"
              >
                {isChecking ? 'Verifying...' : 'Unlock Content'}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
              <Link 
                href="/tools/content-engine/" 
                className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                data-testid="link-back-to-engine"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Content Engine
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
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

  const article = blogArticles.find(a => a.slug === slug);
  const topic = blogTopics.find(t => t.slug === slug);

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

  if (!article || !topic) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="bg-slate-800/50 border-slate-700/50 max-w-md w-full">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Article Not Found</h1>
            <p className="text-slate-400 mb-4">The article you are looking for does not exist.</p>
            <Link href="/tools/content-engine/">
              <Button className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Content Engine
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link 
              href="/tools/content-engine/" 
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              data-testid="link-back"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Content Engine</span>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
                <FileText className="h-3 w-3 mr-1" />
                {article.wordCount.toLocaleString()} words
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
              {article.category}
            </Badge>
            <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
              <Users className="h-3 w-3 mr-1" />
              {article.targetAudience}
            </Badge>
            <Badge variant="outline" className={`${getDifficultyBg(topic.difficulty)}`}>
              Difficulty: {topic.difficulty}/100
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="article-title">
            {article.title}
          </h1>

          <p className="text-lg text-slate-400 mb-6">{article.metaDescription}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author.name}</span>
              <span className="text-slate-600">|</span>
              <span>{article.author.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.publishDate}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30 mb-6">
            <h3 className="text-xs font-medium text-rose-300 mb-3 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
              Pain Areas Addressed
            </h3>
            <div className="flex flex-wrap gap-2">
              {topic.painPoints.map((pain, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded">
                  {pain}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20 mb-6">
            <h3 className="text-xs font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              AGIX Solution
            </h3>
            <p className="text-emerald-300">{topic.agixSolution}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-medium text-slate-300 mb-3 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-cyan-400" />
              Keywords (Volume / Difficulty / Type)
            </h3>
            <div className="flex flex-wrap gap-2">
              {topic.keywords.map((kw, i) => (
                <span key={i} className={`px-2 py-1 text-xs rounded border ${getDifficultyBg(kw.difficulty)}`}>
                  <span className="text-white font-medium">{kw.keyword}</span>
                  <span className="ml-1 opacity-70">
                    {formatNumber(kw.volume)} / {kw.difficulty} / {kw.type}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-medium text-slate-300 mb-3 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-purple-400" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/30 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/20">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Search Volume</div>
              <div className="text-xl font-bold text-cyan-400 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {formatNumber(topic.searchVolume)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">SEO Difficulty</div>
              <div className={`text-xl font-bold flex items-center justify-center gap-1 ${getDifficultyColor(topic.difficulty)}`}>
                <BarChart3 className="h-4 w-4" />
                {topic.difficulty}/100
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-t border-slate-700/50 pt-8"
          data-testid="article-content"
        >
          {article.sections.map((section, index) => (
            <SectionRenderer key={index} section={section} index={index} />
          ))}
        </motion.div>

        {article.references && article.references.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-slate-700/50"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              References
            </h3>
            <div className="space-y-2">
              {article.references.map((ref, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-slate-500">[{i + 1}]</span>
                  <div>
                    <span className="text-slate-300">{ref.title}</span>
                    <span className="text-slate-500"> - {ref.source} ({ref.year})</span>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 ml-2">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {article.serviceCTAs && article.serviceCTAs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {article.serviceCTAs.map((cta, i) => (
                <Card key={i} className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{cta.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{cta.description}</p>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                      {cta.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-700/50"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-slate-500">
              Last updated: {article.lastUpdated}
            </div>
            <Link href="/tools/content-engine/">
              <Button variant="outline" className="text-slate-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </motion.footer>
      </article>
    </div>
  );
}
