import type { Metadata } from 'next'
  import { generateMetadataFromURL } from '@/lib/seo/metadata'
  import { caseStudyPageSchemas, generateCaseStudyPageSchema } from '@/lib/seo/page-schemas'

  export const metadata: Metadata = generateMetadataFromURL('/case-studies/brainfish/')

  const schemaData = caseStudyPageSchemas['brainfish']
  const pageSchema = generateCaseStudyPageSchema('/case-studies/brainfish/', schemaData)

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
  