import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { intelligencePageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/intelligence/operational-ai')

const schemaData = intelligencePageSchemas['operational-ai']
const pageSchema = generatePageSchema('/intelligence/operational-ai/', schemaData)

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://agixtech.com/intelligence/operational-ai/#article",
  "headline": "Operational Intelligence: When Your Business Operations Learn to Think",
  "description": "Operational Intelligence is the ability of an organization to continuously observe, understand, predict, and act on operational data in real time. AGIX defines the 4-layer Operational Intelligence Stack — from visibility to autonomy.",
  "url": "https://agixtech.com/intelligence/operational-ai/",
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-14",
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
  "image": "https://cms.agixtech.com/wp-content/uploads/2026/01/Operational-Intelligence-Service-page-banner.png",
  "about": {
    "@type": "Thing",
    "name": "Operational Intelligence",
    "description": "The ability of an organization to continuously observe, understand, predict, and act on operational data in real time"
  },
  "mentions": [
    { "@type": "Thing", "name": "AIOps" },
    { "@type": "Thing", "name": "Operational Intelligence Stack" },
    { "@type": "Thing", "name": "AI Operations Management" },
    { "@type": "Thing", "name": "Autonomous Operations" }
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
