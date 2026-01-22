import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Chatbot Development Services | Conversational AI',
  description: 'Build intelligent AI chatbots with memory, context, and business logic for support, sales, and internal operations.',
  keywords: ['AI chatbots', 'conversational AI', 'enterprise ai chatbot development', 'conversational ai with memory', 'llm powered chatbots for business'],
  openGraph: {
    title: 'AI Chatbot Development Services | Conversational AI | AGIX Technologies',
    description: 'Build intelligent AI chatbots with memory, context, and business logic for support, sales, and internal operations.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
