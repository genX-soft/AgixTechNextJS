import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Operational Efficiency AI Tool | Identify Automation Opportunities',
  description: 'Identify operational inefficiencies and AI automation opportunities.',
  keywords: ['operational efficiency AI tool', 'automation assessment', 'ai operational efficiency analysis', 'workflow automation assessment'],
  openGraph: {
    title: 'Operational Efficiency AI Tool | Identify Automation Opportunities | AGIX Technologies',
    description: 'Identify operational inefficiencies and AI automation opportunities.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
