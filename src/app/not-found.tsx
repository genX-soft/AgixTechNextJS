'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "radial-gradient(ellipse at bottom, #1B2838 0%, #000000 100%)"
        }}
      />
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <span>4</span>
            <span className="relative">
              <span className="absolute inset-0 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-24 md:h-24">
                  <circle cx="40" cy="40" r="35" stroke="white" strokeWidth="6" fill="none" />
                  <path d="M25 55 L55 25" stroke="url(#gradient)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M25 25 L55 55" stroke="url(#gradient)" strokeWidth="6" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
            <span>4</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            <span className="text-rose-400">Oops,</span> something went wrong
          </h2>
          
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-rose-500 mx-auto mb-6" />
          
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            We can't find the page you were looking for. It looks like nothing was found at this location.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/" data-testid="link-go-home">
            <button 
              className="px-8 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-semibold rounded-full hover:from-rose-500 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-rose-500/25"
              data-testid="button-go-home"
            >
              GO TO HOME
            </button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
        }}
      />
    </div>
  );
}
