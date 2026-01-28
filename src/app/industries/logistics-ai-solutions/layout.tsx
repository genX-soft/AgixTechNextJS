import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { industriesPageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/industries/logistics-ai-solutions')

const schemaData = industriesPageSchemas['logistics-ai-solutions']
const pageSchema = generatePageSchema('/industries/logistics-ai-solutions/', schemaData)

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
