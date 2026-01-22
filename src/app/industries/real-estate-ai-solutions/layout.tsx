import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Real Estate AI Solutions | AI for Property & Valuation',
  description: 'AI systems for property discovery, valuation, and real estate operations.',
  keywords: ['real estate AI solutions', 'AI in real estate', 'property valuation ai systems', 'real estate automation ai', 'housing market intelligence ai'],
  openGraph: {
    title: 'Real Estate AI Solutions | AI for Property & Valuation | AGIX Technologies',
    description: 'AI systems for property discovery, valuation, and real estate operations.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
