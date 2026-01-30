import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact AGIX Technologies | Talk to AI Experts',
  description: 'Contact AGIX Technologies to discuss AI automation, agents, and intelligent systems.',
  keywords: ['contact agix technologies', 'ai consulting', 'talk to ai experts', 'enterprise ai consultation'],
  alternates: {
    canonical: 'https://agixtech.com/corporate/contact/',
  },
  openGraph: {
    title: 'Contact AGIX Technologies | Talk to AI Experts',
    description: 'Contact AGIX Technologies to discuss AI automation, agents, and intelligent systems.',
    url: 'https://agixtech.com/corporate/contact/',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
