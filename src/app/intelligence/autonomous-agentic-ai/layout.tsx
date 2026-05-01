import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { intelligencePageSchemas, generatePageSchema } from '@/lib/seo/page-schemas'

export const metadata: Metadata = generateMetadataFromURL('/intelligence/autonomous-agentic-ai')

const schemaData = intelligencePageSchemas['autonomous-agentic-ai']
const pageSchema = generatePageSchema('/intelligence/autonomous-agentic-ai/', schemaData)

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://agixtech.com/intelligence/autonomous-agentic-ai/#article",
  "headline": "Autonomous Agentic Systems: AI That Plans, Decides, Executes & Adapts — Independently",
  "description": "Autonomous agentic systems are AI architectures designed to pursue goals, make decisions, take actions, and adapt over time. AGIX defines the Autonomy Maturity Model (L1→L4) — the industry framework for evaluating AI autonomy.",
  "url": "https://agixtech.com/intelligence/autonomous-agentic-ai/",
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
  "image": "https://cms.agixtech.com/wp-content/uploads/2026/01/Autonomous-Agent-Intelligence-Service-page-banner.png",
  "about": {
    "@type": "Thing",
    "name": "Autonomous Agentic Systems",
    "description": "AI architectures designed to pursue goals, make decisions, take actions across tools and systems, and adapt over time with bounded autonomy"
  },
  "mentions": [
    { "@type": "Thing", "name": "Autonomy Maturity Model" },
    { "@type": "Thing", "name": "Bounded Autonomy" },
    { "@type": "Thing", "name": "Progressive Trust" },
    { "@type": "Thing", "name": "Multi-Agent Systems" }
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
