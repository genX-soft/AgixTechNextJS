import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at AGIX Technologies | Build Intelligent AI Systems',
  description: 'Join AGIX Technologies to build intelligent, production-grade AI systems.',
  keywords: ['AI careers', 'AI jobs', 'ai engineering jobs', 'careers in ai systems'],
  openGraph: {
    title: 'Careers at AGIX Technologies | Build Intelligent AI Systems',
    description: 'Join AGIX Technologies to build intelligent, production-grade AI systems.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
