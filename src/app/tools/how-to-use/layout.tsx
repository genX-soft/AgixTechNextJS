import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/tools/how-to-use', {
  title: 'How to Use | AGIX Technologies',
  description: 'Learn how to use AGIX AI tools and maximize your productivity.',
  noIndex: true
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
