import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logistics AI Solutions | Supply Chain Automation',
  description: 'Optimize logistics and supply chain operations using AI-driven automation and intelligence.',
  keywords: ['logistics AI solutions', 'AI in supply chain', 'ai automation for logistics', 'supply chain intelligence ai', 'route optimization ai'],
  openGraph: {
    title: 'Logistics AI Solutions | Supply Chain Automation | AGIX Technologies',
    description: 'Optimize logistics and supply chain operations using AI-driven automation and intelligence.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
