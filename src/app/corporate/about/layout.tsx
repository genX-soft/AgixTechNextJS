import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/corporate/about/')

export const metadata: Metadata = {
  ...base,
  title: { absolute: 'About AGIX Technologies | US AI Systems Engineering Company' },
}

const schema = {
  "@context": "https://schema.org/",
  "@type": "AboutPage",
  "@id": "https://agixtech.com/corporate/about/#webpage",
  "url": "https://agixtech.com/corporate/about/",
  "name": "About AGIX Technologies",
  "description": "Learn about AGIX Technologies, a leading provider of AI automation, agentic AI, and intelligent solutions that help businesses streamline workflows and enable real-time decision-making.",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://agixtech.com/#website"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://cms.agixtech.com/wp-content/uploads/2026/01/AGIX-Technologies-logo-scaled.png"
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
      "https://www.facebook.com/agixtechnologies"
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
