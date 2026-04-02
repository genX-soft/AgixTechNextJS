import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

export const metadata: Metadata = generateMetadataFromURL('/corporate/contact/')

const schema = {
  "@context": "https://schema.org/",
  "@type": "ContactPage",
  "@id": "https://agixtech.com/corporate/contact/#webpage",
  "url": "https://agixtech.com/corporate/contact/",
  "name": "Contact AGIX Technologies",
  "description": "Get in touch with AGIX Technologies for AI automation, agentic AI solutions, and intelligent business systems.",
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
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+18574141353",
      "contactType": "customer support",
      "areaServed": "Worldwide",
      "availableLanguage": ["English"],
      "url": "https://agixtech.com/corporate/contact/"
    }
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
