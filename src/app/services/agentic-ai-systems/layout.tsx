import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentic AI Systems Development | Autonomous AI Agents',
  description: 'Design and deploy autonomous agentic AI systems that reason, plan, and act across workflows. Secure and scalable AI agents built for business.',
  keywords: ['agentic AI systems', 'autonomous AI agents', 'agentic ai systems for enterprises', 'multi-agent ai orchestration', 'autonomous ai agents for business workflows'],
  openGraph: {
    title: 'Agentic AI Systems Development | Autonomous AI Agents | AGIX Technologies',
    description: 'Design and deploy autonomous agentic AI systems that reason, plan, and act across workflows. Secure and scalable AI agents built for business.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
