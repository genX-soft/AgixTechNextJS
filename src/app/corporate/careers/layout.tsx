import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { documentFAQs, generateFAQPageSchema } from '@/lib/seo/faq-data'

export const metadata: Metadata = generateMetadataFromURL('/corporate/careers/')

const schema = {
  "@context": "https://schema.org/",
  "@type": "CollectionPage",
  "@id": "https://agixtech.com/corporate/careers/#webpage",
  "url": "https://agixtech.com/corporate/careers/",
  "name": "Careers at AGIX Technologies",
  "description": "Explore career opportunities at AGIX Technologies. Join our team to work on AI automation, agentic AI, and innovative technology solutions.",
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

const faqSchema = generateFAQPageSchema(documentFAQs['careers'])

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
