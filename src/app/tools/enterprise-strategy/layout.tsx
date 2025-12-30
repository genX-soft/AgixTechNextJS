import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise AI Strategy Tool | AI Readiness & Governance',
  description: 'Assess enterprise AI readiness, risk, and governance with a structured AI strategy tool.',
  keywords: ['enterprise AI strategy', 'AI governance tool', 'enterprise ai readiness assessment', 'ai governance and risk framework'],
  openGraph: {
    title: 'Enterprise AI Strategy Tool | AI Readiness & Governance | AGIX Technologies',
    description: 'Assess enterprise AI readiness, risk, and governance with a structured AI strategy tool.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
