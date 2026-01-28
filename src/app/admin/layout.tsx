import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/admin', {
  title: 'Admin Panel | AGIX Technologies',
  description: 'AGIX Technologies admin panel for lead management and analytics.',
  noIndex: true
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
