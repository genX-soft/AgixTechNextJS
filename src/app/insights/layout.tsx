import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/insights', {
  title: 'AI Insights & Articles | AGIX Technologies',
  description: 'Expert insights on AI automation, enterprise AI solutions, and digital transformation strategies from AGIX Technologies.'
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
