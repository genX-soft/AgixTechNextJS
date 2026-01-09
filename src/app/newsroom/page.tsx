'use client'

import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

export default function NewsroomPage() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              News & Media
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, press releases, and media coverage about AGIX Technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground" data-testid="text-newsroom-coming-soon">
              Newsroom content coming soon.
            </p>
          </motion.div>
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
