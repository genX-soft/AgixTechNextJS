import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/case-studies')

export const metadata: Metadata = {
  ...base,
  title: {
    default: base.title as string,
    template: '%s | Agix Technologies',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
