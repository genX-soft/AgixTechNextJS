import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Voice Agents & Voice Automation Solutions',
  description: 'Deploy real-time AI voice agents for calls, support, and operations with low latency and high accuracy.',
  keywords: ['AI voice agents', 'voice AI', 'real-time ai voice agents', 'voice ai for call centers', 'conversational voice automation'],
  openGraph: {
    title: 'AI Voice Agents & Voice Automation Solutions | AGIX Technologies',
    description: 'Deploy real-time AI voice agents for calls, support, and operations with low latency and high accuracy.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
