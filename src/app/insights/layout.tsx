import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/insights')

export const metadata: Metadata = {
  ...base,
  title: { absolute: 'Agentic AI & Automation Insights | AGIX Technologies' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
