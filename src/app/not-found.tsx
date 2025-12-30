'use client'

import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Search, 
  ArrowRight,
  Brain,
  Bot,
  MessageSquare,
  Eye,
  LineChart,
  Database,
  Mic,
  Lightbulb,
  Rocket,
  Building2,
  Briefcase,
  Compass
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const popularPages = [
  {
    title: "AI Services",
    description: "Explore our full range of AI automation solutions",
    href: "/services/agentic-ai-systems",
    icon: Brain,
  },
  {
    title: "AI Chatbots",
    description: "Intelligent conversational AI for your business",
    href: "/services/chatbots",
    icon: MessageSquare,
  },
  {
    title: "Voice AI Agents",
    description: "Natural voice interactions for customer service",
    href: "/services/voice-agents",
    icon: Mic,
  },
  {
    title: "RAG Knowledge Systems",
    description: "AI-powered document intelligence",
    href: "/services/rag-knowledge",
    icon: Database,
  },
];

const quickLinks = [
  { title: "Home", href: "/", icon: Home },
  { title: "Find Your AI Starting Point", href: "/tools/ai-starting-point", icon: Compass },
  { title: "Enterprise Strategy", href: "/tools/enterprise-strategy", icon: Building2 },
  { title: "Startup Accelerator", href: "/tools/startup-accelerator", icon: Rocket },
  { title: "How to Use AI Tools", href: "/tools/how-to-use", icon: Lightbulb },
];

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950">
      <MainHeader />
      
      <main className="flex-1 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let us help you find what you need.
            </p>
            <Link href="/">
              <Button size="lg" className="gap-2" data-testid="button-go-home">
                <Home className="w-4 h-4" />
                Return to Homepage
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Quick Links
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-slate-700 hover:border-primary/50"
                    data-testid={`link-quick-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.title}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Popular AI Services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularPages.map((page, index) => (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <Link href={page.href} data-testid={`link-service-${page.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-5">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <page.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {page.description}
                        </p>
                        <div className="mt-4 flex items-center text-primary text-sm font-medium">
                          Learn more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Card className="bg-slate-900/30 border-slate-800 inline-block">
              <CardContent className="p-6">
                <p className="text-slate-400 mb-4">
                  Still can't find what you're looking for?
                </p>
                <Link href="/#contact">
                  <Button variant="outline" className="gap-2" data-testid="button-contact-us">
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <MainFooter />
    </div>
  );
}
