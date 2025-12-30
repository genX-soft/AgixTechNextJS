import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EdTech AI Solutions | AI for Education Platforms',
  description: 'AI-powered automation and intelligence for education and edtech platforms.',
  keywords: ['edtech AI solutions', 'AI in education', 'learning analytics ai', 'education automation ai', 'ai for digital learning'],
  openGraph: {
    title: 'EdTech AI Solutions | AI for Education Platforms | AGIX Technologies',
    description: 'AI-powered automation and intelligence for education and edtech platforms.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
