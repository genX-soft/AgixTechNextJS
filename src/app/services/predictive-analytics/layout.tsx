import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Predictive Analytics & Decision Intelligence AI',
  description: 'Use AI-driven predictive analytics to improve forecasting, planning, and business decisions.',
  keywords: ['predictive analytics AI', 'decision intelligence', 'ai decision intelligence systems', 'ai-powered business forecasting', 'operational decision ai'],
  openGraph: {
    title: 'Predictive Analytics & Decision Intelligence AI | AGIX Technologies',
    description: 'Use AI-driven predictive analytics to improve forecasting, planning, and business decisions.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
