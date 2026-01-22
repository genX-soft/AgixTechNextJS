import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Operational Intelligence AI | Intelligent Workflow Automation',
  description: 'AI systems that automate workflows, reduce friction, and improve execution at scale.',
  keywords: ['operational intelligence AI', 'workflow automation AI', 'ai for business operations', 'intelligent workflow execution', 'enterprise operational ai'],
  openGraph: {
    title: 'Operational Intelligence AI | Intelligent Workflow Automation | AGIX Technologies',
    description: 'AI systems that automate workflows, reduce friction, and improve execution at scale.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
