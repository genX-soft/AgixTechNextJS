import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fintech AI Solutions | Intelligent Automation for Finance',
  description: 'AI-powered automation and decision intelligence for fintech and financial services.',
  keywords: ['fintech AI solutions', 'AI in finance', 'ai automation for fintech', 'credit decisioning ai systems', 'financial risk ai'],
  openGraph: {
    title: 'Fintech AI Solutions | Intelligent Automation for Finance | AGIX Technologies',
    description: 'AI-powered automation and decision intelligence for fintech and financial services.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
