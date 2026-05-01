import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { intelligencePageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/intelligence/conversational-ai')

const schemaData = intelligencePageSchemas['conversational-ai']
const pageSchema = generatePageSchema('/intelligence/conversational-ai/', schemaData)

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://agixtech.com/intelligence/conversational-ai/#article",
  "headline": "Conversational Intelligence: When AI Understands, Not Just Responds",
  "description": "Conversational Intelligence is the ability of AI to understand intent, maintain context, reason through complexity, and trigger actions through natural conversation. AGIX defines the 5-level Conversational Intelligence Spectrum.",
  "url": "https://agixtech.com/intelligence/conversational-ai/",
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
  "image": "https://cms.agixtech.com/wp-content/uploads/2026/01/Conversations-Intelligence-Service-page-banner.png",
  "about": {
    "@type": "Thing",
    "name": "Conversational Intelligence",
    "description": "The ability of AI systems to understand intent, maintain context, reason through complexity, and trigger actions through natural conversation"
  },
  "mentions": [
    { "@type": "Thing", "name": "Conversational Intelligence Spectrum" },
    { "@type": "Thing", "name": "Large Language Models" },
    { "@type": "Thing", "name": "Natural Language Understanding" },
    { "@type": "Thing", "name": "Retrieval-Augmented Generation" }
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
