import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { intelligencePageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/intelligence/enterprise-knowledge-ai')

const schemaData = intelligencePageSchemas['enterprise-knowledge-ai']
const pageSchema = generatePageSchema('/intelligence/enterprise-knowledge-ai/', schemaData)

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
