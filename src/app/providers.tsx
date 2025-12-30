'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ExplorationProvider } from '@/components/exploration'
import { CelebrationProvider } from '@/components/success-celebration'
import { useJourneyTracker } from '@/hooks/use-journey-tracker'
import { useBehaviorTracker } from '@/hooks/use-behavior-tracker'

const Toaster = dynamic(
  () => import('@/components/ui/toaster').then(mod => ({ default: mod.Toaster })),
  { ssr: false }
)

const ExplorationLauncher = dynamic(
  () => import('@/components/exploration/ExplorationLauncher'),
  { ssr: false, loading: () => null }
)

const FloatingChatCta = dynamic(
  () => import('@/components/shared/floating-chat-cta').then(mod => ({ default: mod.FloatingChatCta })),
  { ssr: false, loading: () => null }
)

const FloatingButtonStack = dynamic(
  () => import('@/components/shared/FloatingButtonStack'),
  { ssr: false, loading: () => null }
)

const ScrollToHash = dynamic(
  () => import('@/components/shared/ScrollToHash'),
  { ssr: false }
)

function JourneyTrackerInit() {
  useJourneyTracker()
  useBehaviorTracker()
  return null
}

function DeferredComponents() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setMounted(true), { timeout: 2000 })
      return () => cancelIdleCallback(id)
    } else {
      const id = setTimeout(() => setMounted(true), 100)
      return () => clearTimeout(id)
    }
  }, [])
  
  if (!mounted) return null
  
  return (
    <>
      <JourneyTrackerInit />
      <Toaster />
      <FloatingChatCta />
      <FloatingButtonStack />
      <ExplorationLauncher />
    </>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CelebrationProvider>
          <ExplorationProvider>
            {children}
            <ScrollToHash />
            <DeferredComponents />
          </ExplorationProvider>
        </CelebrationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
