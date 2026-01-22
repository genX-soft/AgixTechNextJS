import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAG & Knowledge AI Systems | Enterprise Knowledge Retrieval',
  description: 'Build RAG systems that make enterprise knowledge searchable, reliable, and secure using AI.',
  keywords: ['RAG systems', 'knowledge AI', 'enterprise rag implementation', 'ai knowledge retrieval systems', 'vector database ai solutions'],
  openGraph: {
    title: 'RAG & Knowledge AI Systems | Enterprise Knowledge Retrieval | AGIX Technologies',
    description: 'Build RAG systems that make enterprise knowledge searchable, reliable, and secure using AI.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
