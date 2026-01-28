import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/terms-of-service', {
  title: 'Terms of Service | AGIX Technologies',
  description: 'AGIX Technologies terms of service. Read our terms and conditions for using our AI services and platform.'
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
