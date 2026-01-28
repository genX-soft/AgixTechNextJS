import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { industriesPageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/industries/fintech-ai-solutions')

const schemaData = industriesPageSchemas['fintech-ai-solutions']
const pageSchema = generatePageSchema('/industries/fintech-ai-solutions/', schemaData)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      {children}
    </>
  )
}
