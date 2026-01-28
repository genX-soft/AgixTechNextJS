import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/privacy-policy', {
  title: 'Privacy Policy | AGIX Technologies',
  description: 'AGIX Technologies privacy policy. Learn how we collect, use, and protect your personal information.'
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
