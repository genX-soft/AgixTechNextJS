import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/newsroom', {
  title: 'Newsroom | AGIX Technologies',
  description: 'Latest news, press releases, and announcements from AGIX Technologies about AI innovation and enterprise solutions.'
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
