const SITE_URL = 'https://agixtech.com';
const SITE_NAME = 'AGIX Technologies';
const LOGO_URL = `${SITE_URL}/og-image.png`;

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": LOGO_URL,
      "@id": `${SITE_URL}/#logo`
    },
    "description": "AI Systems Engineering and Agentic Intelligence company helping enterprises design, deploy, and scale autonomous AI systems.",
    "foundingDate": "2020",
    "sameAs": [
      "https://twitter.com/agixtech",
      "https://linkedin.com/company/agixtech"
    ]
  };
}

export function generateWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": SITE_NAME,
    "description": "Leading AI Systems Engineering and Agentic Intelligence company",
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "potentialAction": [{
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string"
    }]
  };
}

export function generateWebPageSchema(url: string, title: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": title,
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "about": { "@id": `${SITE_URL}/#organization` },
    "description": description,
    "inLanguage": "en-US"
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url || SITE_URL}#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateBlogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@type": "BlogPosting",
    "@id": `${post.url}#article`,
    "headline": post.title,
    "description": post.description,
    "url": post.url,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.author || "AGIX Team"
    },
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "mainEntityOfPage": { "@id": `${post.url}#webpage` },
    "image": post.image || LOGO_URL,
    "inLanguage": "en-US"
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@type": "Service",
    "@id": `${service.url}#service`,
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": { "@id": `${SITE_URL}/#organization` },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": "AI Consulting & Development"
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateFullSchema(components: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": components
  };
}

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const withTrailingSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${SITE_URL}${withTrailingSlash}`;
}
