import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospitality AI Solutions | Guest Experience Automation',
  description: 'Enhance guest experience and operations with AI-powered hospitality automation.',
  keywords: ['hospitality AI solutions', 'AI in hospitality', 'guest experience ai systems', 'hotel automation ai', 'hospitality operations intelligence'],
  openGraph: {
    title: 'Hospitality AI Solutions | Guest Experience Automation | AGIX Technologies',
    description: 'Enhance guest experience and operations with AI-powered hospitality automation.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
