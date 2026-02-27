import type { Metadata } from 'next'
  import { generateMetadataFromURL } from '@/lib/seo/metadata'
  import { caseStudyPageSchemas, generateCaseStudyPageSchema } from '@/lib/seo/page-schemas'

  export const metadata: Metadata = generateMetadataFromURL('/case-studies/dave/')

  const schemaData = caseStudyPageSchemas['dave']
  const pageSchema = generateCaseStudyPageSchema('/case-studies/dave/', schemaData)

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
  