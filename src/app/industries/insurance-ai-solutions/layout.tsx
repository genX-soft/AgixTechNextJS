import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insurance AI Solutions | Intelligent Claims & Risk AI',
  description: 'Automate claims, underwriting, and risk assessment with AI-powered systems.',
  keywords: ['insurance AI solutions', 'AI in insurance', 'ai automation for insurance', 'claims processing ai', 'underwriting decision ai'],
  openGraph: {
    title: 'Insurance AI Solutions | Intelligent Claims & Risk AI | AGIX Technologies',
    description: 'Automate claims, underwriting, and risk assessment with AI-powered systems.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
