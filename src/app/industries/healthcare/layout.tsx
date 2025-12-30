import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Healthcare AI Solutions | Intelligent Automation for Healthcare',
  description: 'Transform healthcare operations with AI automation, decision intelligence, and secure AI systems.',
  keywords: ['healthcare AI solutions', 'AI in healthcare', 'ai automation for healthcare operations', 'healthcare decision intelligence ai', 'compliant ai for healthcare'],
  openGraph: {
    title: 'Healthcare AI Solutions | Intelligent Automation for Healthcare | AGIX Technologies',
    description: 'Transform healthcare operations with AI automation, decision intelligence, and secure AI systems.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
