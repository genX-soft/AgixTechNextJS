import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/corporate/about/')

export const metadata: Metadata = {
  ...base,
  title: { absolute: 'About AGIX Technologies | US AI Systems Engineering Company' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
