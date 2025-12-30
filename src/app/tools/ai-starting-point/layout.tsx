import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Starting Point Finder | Discover Your AI Readiness',
  description: 'Find where to start with AI using AGIX\'s guided AI readiness tool.',
  keywords: ['AI readiness tool', 'AI starting point', 'ai readiness assessment tool', 'how to start ai adoption'],
  openGraph: {
    title: 'AI Starting Point Finder | Discover Your AI Readiness | AGIX Technologies',
    description: 'Find where to start with AI using AGIX\'s guided AI readiness tool.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
