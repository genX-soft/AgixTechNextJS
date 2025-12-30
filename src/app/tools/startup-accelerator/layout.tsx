import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup AI Accelerator Tool | Build AI the Right Way',
  description: 'A guided AI tool helping startups choose the right AI path without overengineering.',
  keywords: ['startup AI tool', 'AI for startups', 'ai roadmap for startups', 'startup ai adoption strategy'],
  openGraph: {
    title: 'Startup AI Accelerator Tool | Build AI the Right Way | AGIX Technologies',
    description: 'A guided AI tool helping startups choose the right AI path without overengineering.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
