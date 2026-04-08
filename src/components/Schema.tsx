import { homepageOrganizationSchema } from '@/lib/seo/page-schemas';
import { generateWebSiteSchema } from '@/lib/seo/structured-data';
import { documentFAQs, generateFAQPageSchema } from '@/lib/seo/faq-data';

const SITE_URL = 'https://agixtech.com';

interface BlogSchemaData {
  title: string;
  excerpt: string;
  featured_image?: string;
  date: string;
  modified?: string;
  slug: string;
}

interface ServiceSchemaData {
  name: string;
  description: string;
  url: string;
}

type SchemaProps =
  | { type: 'home'; data?: never }
  | { type: 'blog'; data: BlogSchemaData }
  | { type: 'service'; data: ServiceSchemaData };

function buildHomeSchema() {
  const { '@context': _orgCtx, ...organization } = homepageOrganizationSchema;
  const { '@context': _faqCtx, ...faqPage } = generateFAQPageSchema(documentFAQs['home']);
  return {
    '@context': 'https://schema.org',
    '@graph': [organization, generateWebSiteSchema(), faqPage],
  };
}

function buildBlogSchema(data: BlogSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.excerpt,
    image: data.featured_image,
    datePublished: data.date,
    dateModified: data.modified || data.date,
    author: {
      '@type': 'Person',
      name: 'Santosh S.',
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${data.slug}/`,
    },
  };
}

function buildServiceSchema(data: ServiceSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    url: data.url,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: ['US', 'GB', 'AU'],
  };
}

export default function Schema(props: SchemaProps) {
  if (props.type === 'home') {
    const schema = buildHomeSchema();
    return (
      <script
        id="schema-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  if (props.type === 'blog') {
    const schema = buildBlogSchema(props.data);
    return (
      <script
        id="schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  if (props.type === 'service') {
    const schema = buildServiceSchema(props.data);
    return (
      <script
        id="schema-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  }

  return null;
}
