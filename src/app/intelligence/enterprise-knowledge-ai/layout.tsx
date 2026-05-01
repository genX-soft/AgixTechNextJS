import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { intelligencePageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/intelligence/enterprise-knowledge-ai')

const schemaData = intelligencePageSchemas['enterprise-knowledge-ai']
const pageSchema = generatePageSchema('/intelligence/enterprise-knowledge-ai/', schemaData)

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://agixtech.com/intelligence/enterprise-knowledge-ai/#article",
  "headline": "Enterprise Knowledge Intelligence: When Your Organization's Knowledge Becomes an Active Asset",
  "description": "Enterprise Knowledge Intelligence is the ability to store, govern, retrieve, and reason over organizational knowledge using AI. AGIX defines the 5-stage Knowledge Intelligence Maturity Model — from scattered to active.",
  "url": "https://agixtech.com/intelligence/enterprise-knowledge-ai/",
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-30",
  "author": {
    "@type": "Person",
    "@id": "https://agixtech.com/author/santosh/#person",
    "name": "Santosh Singh",
    "jobTitle": "Founder & CEO",
    "url": "https://agixtech.com/author/santosh/",
    "sameAs": ["https://www.linkedin.com/in/santosh-agixtech/"]
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://agixtech.com/#organization",
    "name": "AGIX Technologies",
    "url": "https://agixtech.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cms.agixtech.com/wp-content/uploads/2026/01/AGIX-Technologies-logo-scaled.png"
    }
  },
  "image": "https://cms.agixtech.com/wp-content/uploads/2026/01/Knowledge-Intelligence-Service-page-banner.png",
  "about": {
    "@type": "Thing",
    "name": "Enterprise Knowledge Intelligence",
    "description": "The ability of an organization to store, govern, retrieve, and reason over its collective knowledge using AI with accuracy, traceability, and control"
  },
  "mentions": [
    { "@type": "Thing", "name": "Knowledge Intelligence Maturity Model" },
    { "@type": "Thing", "name": "Retrieval-Augmented Generation" },
    { "@type": "Thing", "name": "Knowledge Governance" },
    { "@type": "Thing", "name": "Active Knowledge" }
  ],
  "isPartOf": {
    "@id": "https://agixtech.com/#website"
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {children}
    </>
  )
}
