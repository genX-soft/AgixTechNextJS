import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About AGIX Technologies | AI Systems Engineering Company',
  description: 'Learn about AGIX Technologies, an AI-first systems engineering company building production-grade AI.',
  keywords: ['about agix technologies', 'ai systems company', 'ai systems engineering company', 'enterprise ai services provider'],
  alternates: {
    canonical: 'https://agixtech.com/corporate/about/',
  },
  openGraph: {
    title: 'About AGIX Technologies | AI Systems Engineering Company',
    description: 'Learn about AGIX Technologies, an AI-first systems engineering company building production-grade AI.',
    url: 'https://agixtech.com/corporate/about/',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
