import type { Metadata } from 'next'
import { generateMetadataFromURL } from '@/lib/seo/metadata'

const base = generateMetadataFromURL('/insights')

export const metadata: Metadata = {
  ...base,
  title: { absolute: 'Agentic AI & Automation Insights | AGIX Technologies' },
}

const schema = {
  "@context": "https://schema.org/",
  "@type": "Blog",
  "@id": "https://agixtech.com/insights/#blog",
  "url": "https://agixtech.com/insights/",
  "name": "Insights - AGIX Technologies",
  "description": "Explore the latest insights, blogs, and articles on AI automation, agentic AI, and business intelligence by AGIX Technologies.",
  "inLanguage": "en",
  "isPartOf": {
    "@id": "https://agixtech.com/#website"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://cms.agixtech.com/wp-content/uploads/2026/01/AGIX-Technologies-logo-scaled.png"
  },
  "publisher": {
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
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "AGIX Technologies Insights",
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "numberOfItems": 3,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "BlogPosting",
          "name": "AGIX Technologies Home",
          "url": "https://agixtech.com/",
          "description": "AGIX Technologies homepage overview, showcasing AI automation and intelligent solutions."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "BlogPosting",
          "name": "AGIX Technologies Services",
          "url": "https://agixtech.com/services/",
          "description": "Learn about AI automation, agentic AI solutions, and workflow intelligence offered by AGIX Technologies."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "BlogPosting",
          "name": "Conversational AI Insights",
          "url": "https://agixtech.com/intelligence/conversational-ai/",
          "description": "Deep dive into Conversational Intelligence solutions and their impact on business decision-making by AGIX Technologies."
        }
      }
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
