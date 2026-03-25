import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/case-studies')

export const metadata: Metadata = {
  ...base,
  title: {
    default: 'AI Case Studies',
    template: '%s | Agix',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
