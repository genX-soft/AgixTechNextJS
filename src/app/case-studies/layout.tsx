import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Case Studies | Real-World AI Systems by AGIX',
  description: 'Explore real-world AI case studies showcasing production-grade AI systems built by AGIX.',
  keywords: ['AI case studies', 'AI success stories', 'enterprise ai case studies', 'real world ai implementations'],
  openGraph: {
    title: 'AI Case Studies | Real-World AI Systems by AGIX',
    description: 'Explore real-world AI case studies showcasing production-grade AI systems built by AGIX.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
