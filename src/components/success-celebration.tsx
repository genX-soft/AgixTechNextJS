'use client'

import { useState, useEffect, createContext, useContext, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, Star, Sparkles } from "lucide-react";

const celebrationMessages = [
  { title: "Awesome!", subtitle: "Your journey to AI transformation begins now" },
  { title: "Fantastic!", subtitle: "We're excited to help you succeed" },
  { title: "Great Choice!", subtitle: "You're one step closer to AI-powered growth" },
  { title: "Brilliant!", subtitle: "Let's build something amazing together" },
  { title: "Perfect!", subtitle: "Your AI adventure starts here" },
];

const particleColors = ['#f97316', '#fbbf24', '#22c55e', '#3b82f6', '#a855f7'];

interface CelebrationContextType {
  triggerCelebration: () => void;
}

const CelebrationContext = createContext<CelebrationContextType>({
  triggerCelebration: () => {},
});

export const useCelebration = () => useContext(CelebrationContext);

function SuccessCelebration({ isVisible, onComplete }: { isVisible: boolean; onComplete: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    colorIndex: number;
    animX: number;
    animY: number;
    rotate: number;
  }>>([]);
  
  useEffect(() => {
    if (isVisible) {
      setMessageIndex(Math.floor(Math.random() * celebrationMessages.length));
      setParticles(Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 8,
        colorIndex: Math.floor(Math.random() * 5),
        animX: (Math.random() - 0.5) * 200,
        animY: -20 + Math.random() * 40,
        rotate: Math.random() * 360,
      })));
      
      const timer = setTimeout(onComplete, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  const message = celebrationMessages[messageIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particleColors[particle.colorIndex],
              }}
              initial={{ top: '50%', opacity: 1, scale: 0 }}
              animate={{
                top: `${particle.animY}%`,
                x: particle.animX,
                opacity: [1, 1, 0],
                scale: [0, 1, 0.5],
                rotate: particle.rotate,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="relative z-10 text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-amber-500 shadow-2xl shadow-primary/50">
                <PartyPopper className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              {message.title}
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-200 max-w-md mx-auto"
            >
              {message.subtitle}
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="mt-6 flex justify-center gap-2"
            >
              {[Star, Sparkles, Star].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Icon className="w-6 h-6 text-amber-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CelebrationProvider({ children }: { children: React.ReactNode }) {
  const [showCelebration, setShowCelebration] = useState(false);

  const triggerCelebration = useCallback(() => {
    setShowCelebration(true);
  }, []);

  const handleComplete = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return (
    <CelebrationContext.Provider value={{ triggerCelebration }}>
      {children}
      <SuccessCelebration isVisible={showCelebration} onComplete={handleComplete} />
    </CelebrationContext.Provider>
  );
}
