import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Decision Intelligence AI | AI-Powered Business Decisions',
  description: 'Decision intelligence systems that help leaders make faster, data-driven decisions.',
  keywords: ['decision intelligence AI', 'AI decision systems', 'ai-driven decision making', 'business decision intelligence ai'],
  openGraph: {
    title: 'Decision Intelligence AI | AI-Powered Business Decisions | AGIX Technologies',
    description: 'Decision intelligence systems that help leaders make faster, data-driven decisions.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
