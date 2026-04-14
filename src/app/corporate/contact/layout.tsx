import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'
import { documentFAQs, generateFAQPageSchema } from '@/lib/seo/faq-data'

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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://agixtech.com/#local-business",
  "name": "AGIX Technologies",
  "url": "https://agixtech.com/",
  "telephone": "+18574141353",
  "email": "hello@agixtech.com",
  "description": "AGIX Technologies is an AI Systems Engineering & Agentic Intelligence company helping enterprises design, deploy, and scale autonomous AI systems.",
  "image": "https://cms.agixtech.com/wp-content/uploads/2026/01/AGIX-Technologies-logo-scaled.png",
  "logo": {
    "@type": "ImageObject",
    "url": "https://cms.agixtech.com/wp-content/uploads/2026/01/AGIX-Technologies-logo-scaled.png"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Boston",
    "addressRegion": "MA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "42.3601",
    "longitude": "-71.0589"
  },
  "areaServed": "Worldwide",
  "priceRange": "$$$$",
  "currenciesAccepted": "USD",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.linkedin.com/company/agixtech",
    "https://twitter.com/agixtech",
    "https://www.facebook.com/agixtechnologies",
    "https://www.crunchbase.com/organization/agix-technologies"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+18574141353",
    "email": "hello@agixtech.com",
    "contactType": "customer support",
    "areaServed": "Worldwide",
    "availableLanguage": ["English"]
  },
  "department": [
    {
      "@type": "LocalBusiness",
      "@id": "https://agixtech.com/#office-london",
      "name": "AGIX Technologies — London",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.5074",
        "longitude": "-0.1278"
      },
      "telephone": "+18574141353",
      "email": "hello@agixtech.com",
      "url": "https://agixtech.com/corporate/contact/"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://agixtech.com/#office-jaipur",
      "name": "AGIX Technologies — Jaipur",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.9124",
        "longitude": "75.7873"
      },
      "telephone": "+18574141353",
      "email": "hello@agixtech.com",
      "url": "https://agixtech.com/corporate/contact/"
    }
  ]
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://agixtech.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Contact",
      "item": "https://agixtech.com/corporate/contact/"
    }
  ]
}

const faqSchema = generateFAQPageSchema(documentFAQs['contact'])

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
