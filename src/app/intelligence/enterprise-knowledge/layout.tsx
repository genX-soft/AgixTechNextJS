import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Knowledge Intelligence | AI Knowledge Systems',
  description: 'AI systems that unlock enterprise knowledge securely using RAG and semantic search.',
  keywords: ['enterprise knowledge AI', 'knowledge intelligence', 'enterprise knowledge retrieval ai', 'internal knowledge ai systems'],
  openGraph: {
    title: 'Enterprise Knowledge Intelligence | AI Knowledge Systems | AGIX Technologies',
    description: 'AI systems that unlock enterprise knowledge securely using RAG and semantic search.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
