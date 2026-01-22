import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retail AI Solutions | AI Automation for Retail',
  description: 'Improve retail operations, personalization, and decision-making using AI systems.',
  keywords: ['retail AI solutions', 'AI in retail', 'ai automation for retail operations', 'retail demand forecasting ai', 'customer analytics ai'],
  openGraph: {
    title: 'Retail AI Solutions | AI Automation for Retail | AGIX Technologies',
    description: 'Improve retail operations, personalization, and decision-making using AI systems.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
