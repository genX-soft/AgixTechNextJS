'use client'

import { useJourneyTracker } from '@/hooks/use-journey-tracker'
import { useBehaviorTracker } from '@/hooks/use-behavior-tracker'

export default function JourneyTrackerInit() {
  useJourneyTracker()
  useBehaviorTracker()
  return null
}
