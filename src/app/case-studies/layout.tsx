import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/case-studies')

export const metadata: Metadata = {
  ...base,
  title: {
    absolute: 'Enterprise Agentic AI Case Studies | AGIX Technologies',
    template: '%s | AGIX Technologies',
  },
}

const schema = {
  "@context": "https://schema.org/",
  "@type": "CollectionPage",
  "@id": "https://agixtech.com/case-studies/#webpage",
  "url": "https://agixtech.com/case-studies/",
  "name": "Case Studies - AGIX Technologies",
  "description": "Explore real-world AI and automation case studies by AGIX Technologies showcasing agentic AI solutions, operational intelligence, and business transformation success stories.",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://agixtech.com/#website"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://cms.agixtech.com/wp-content/uploads/2026/01/Artificial-Intelligence-Case-Studies.png"
  },
  "about": {
    "@type": "Organization",
    "@id": "https://agixtech.com/#organization",
    "name": "AGIX Technologies",
    "url": "https://agixtech.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cms.agixtech.com/wp-content/uploads/2026/01/AGIX-Technologies-logo-scaled.png"
    },
    "sameAs": [
      "https://www.linkedin.com/company/agixtech",
      "https://twitter.com/agixtech",
      "https://www.facebook.com/agixtechnologies",
      "https://www.crunchbase.com/organization/agix-technologies"
    ]
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  )
}
