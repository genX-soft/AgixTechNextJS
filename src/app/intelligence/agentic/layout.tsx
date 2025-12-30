import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agentic Intelligence | Autonomous AI Decision Systems',
  description: 'Agentic intelligence systems where AI agents reason, plan, and act autonomously.',
  keywords: ['agentic intelligence', 'autonomous AI', 'agent-based ai decision systems', 'agentic ai orchestration'],
  openGraph: {
    title: 'Agentic Intelligence | Autonomous AI Decision Systems | AGIX Technologies',
    description: 'Agentic intelligence systems where AI agents reason, plan, and act autonomously.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
