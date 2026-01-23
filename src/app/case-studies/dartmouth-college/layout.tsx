import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/case-studies/dartmouth-college')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
