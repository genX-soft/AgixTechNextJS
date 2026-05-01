import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { intelligencePageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/intelligence/decision-ai')

const schemaData = intelligencePageSchemas['decision-ai']
const pageSchema = generatePageSchema('/intelligence/decision-ai/', schemaData)

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://agixtech.com/intelligence/decision-ai/#article",
  "headline": "Decision Intelligence: When AI Doesn't Just Inform — It Decides",
  "description": "Decision Intelligence is the discipline of using AI to support, guide, and automate business decisions. AGIX defines the Decision Intelligence Pyramid — from informed decisions to autonomous execution. Gartner-validated category.",
  "url": "https://agixtech.com/intelligence/decision-ai/",
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
  "image": "https://cms.agixtech.com/wp-content/uploads/2026/01/Decision-Intelligence-Service-page-banner.png",
  "about": {
    "@type": "Thing",
    "name": "Decision Intelligence",
    "description": "A practical discipline that uses AI to support, guide, and automate business decisions by explicitly engineering how decisions are made"
  },
  "mentions": [
    { "@type": "Thing", "name": "Decision Intelligence Pyramid" },
    { "@type": "Thing", "name": "Decision Complexity Matrix" },
    { "@type": "Thing", "name": "Prescriptive Analytics" },
    { "@type": "Thing", "name": "Autonomous Decision Making" }
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
