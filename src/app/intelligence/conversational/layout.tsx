import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversational Intelligence AI | Chat & Voice AI Systems',
  description: 'Conversational intelligence systems that interact naturally via chat and voice.',
  keywords: ['conversational intelligence AI', 'chat and voice AI', 'enterprise conversational ai systems', 'conversational automation ai'],
  openGraph: {
    title: 'Conversational Intelligence AI | Chat & Voice AI Systems | AGIX Technologies',
    description: 'Conversational intelligence systems that interact naturally via chat and voice.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
