import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom AI Product Development | AI Software Engineering',
  description: 'Design and build custom AI products from concept to scale with production-ready engineering.',
  keywords: ['custom AI development', 'AI product development', 'custom ai software development', 'ai product engineering services', 'build ai-powered applications'],
  openGraph: {
    title: 'Custom AI Product Development | AI Software Engineering | AGIX Technologies',
    description: 'Design and build custom AI products from concept to scale with production-ready engineering.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
