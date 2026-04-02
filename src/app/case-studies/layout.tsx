import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/case-studies')

export const metadata: Metadata = {
  ...base,
  title: {
    absolute: 'Enterprise AI Case Studies: Agentic, Automation & RAG Systems | AGIX',
    template: '%s | AGIX Technologies',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
