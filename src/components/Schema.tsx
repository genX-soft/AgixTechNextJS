import { homepageOrganizationSchema } from '@/lib/seo/page-schemas';
import { generateWebSiteSchema } from '@/lib/seo/structured-data';
import { documentFAQs, generateFAQPageSchema } from '@/lib/seo/faq-data';
import { extractFAQsFromContent } from '@/lib/insights/faq-utils';

const SITE_URL = 'https://agixtech.com';
const MAX_FAQS = 8;
const MIN_FAQS = 2;
const MIN_STEPS = 2;

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface BlogSchemaData {
  title: string;
  excerpt: string;
  featured_image?: string;
  date: string;
  modified?: string;
  slug: string;
  content?: string;
}

interface ServiceSchemaData {
  name: string;
  description: string;
  url: string;
}

interface BreadcrumbSchemaData {
  items: Array<{ name: string; url: string }>;
}

type SchemaProps =
  | { type: 'home'; data?: never }
  | { type: 'blog'; data: BlogSchemaData }
  | { type: 'service'; data: ServiceSchemaData }
  | { type: 'breadcrumb'; data: BreadcrumbSchemaData };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

interface Step {
  name: string;
  text: string;
}

/**
 * Detect ordered steps from HTML content.
 * Strategy 1: headings that match "Step N" or "N. Title"
 * Strategy 2: <ol><li> list items when no heading-based steps found
 */
function extractSteps(html: string): Step[] {
  const steps: Step[] = [];

  // Strategy 1 — "Step N:" / "Step N —" headings followed by a paragraph
  const stepHeadingPattern =
    /<h[2-4][^>]*>[\s\S]*?(?:Step\s+\d+|^\d+\.)\b([\s\S]*?)<\/h[2-4]>\s*(?:<p[^>]*>([\s\S]*?)<\/p>)?/gi;

  let m: RegExpExecArray | null;
  while ((m = stepHeadingPattern.exec(html)) !== null) {
    const name = stripTags(m[1]).replace(/^[:\-–—]\s*/, '').trim();
    const text = m[2] ? stripTags(m[2]).trim() : '';
    if (name.length > 3) {
      steps.push({ name, text });
    }
  }

  if (steps.length >= MIN_STEPS) {
    return steps.slice(0, 10);
  }

  // Strategy 2 — first <ol> block with multiple <li> items
  const olMatch = html.match(/<ol[^>]*>([\s\S]*?)<\/ol>/i);
  if (olMatch) {
    const liPattern = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    const olContent = olMatch[1];
    let li: RegExpExecArray | null;
    while ((li = liPattern.exec(olContent)) !== null) {
      const text = stripTags(li[1]).trim();
      if (text.length > 5) {
        // Use first sentence as name, rest as description
        const dot = text.indexOf('. ');
        const name = dot > 0 && dot < 80 ? text.slice(0, dot) : text.slice(0, 60);
        const desc = dot > 0 && dot < 80 ? text.slice(dot + 2) : '';
        steps.push({ name: name.trim(), text: desc.trim() });
      }
    }
  }

  return steps.length >= MIN_STEPS ? steps.slice(0, 10) : [];
}

// ─── Schema builders ──────────────────────────────────────────────────────────

function buildHomeSchema() {
  const { '@context': _orgCtx, ...organization } = homepageOrganizationSchema;
  const { '@context': _faqCtx, ...faqPage } = generateFAQPageSchema(documentFAQs['home']);
  return {
    '@context': 'https://schema.org',
    '@graph': [organization, generateWebSiteSchema(), faqPage],
  };
}

function buildBlogPostingSchema(data: BlogSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.excerpt,
    ...(data.featured_image && { image: data.featured_image }),
    datePublished: data.date,
    dateModified: data.modified || data.date,
    author: {
      '@type': 'Person',
      name: 'Santosh S.',
      url: `${SITE_URL}/author/santosh/`,
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

function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripTags(answer).trim(),
      },
    })),
  };
}

function buildHowToSchema(title: string, steps: Step[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      ...(s.text && { text: s.text }),
    })),
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

function buildBreadcrumbSchema(data: BreadcrumbSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Schema(props: SchemaProps) {
  if (props.type === 'home') {
    return (
      <script
        id="schema-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeSchema()) }}
      />
    );
  }

  if (props.type === 'blog') {
    const { data } = props;
    const blogPosting = buildBlogPostingSchema(data);

    // Auto-detect FAQ from content
    const faqItems = data.content
      ? extractFAQsFromContent(data.content).faqs.slice(0, MAX_FAQS)
      : [];
    const faqSchema = faqItems.length >= MIN_FAQS ? buildFAQSchema(faqItems) : null;

    // Auto-detect HowTo steps from content
    const steps = data.content ? extractSteps(data.content) : [];
    const howToSchema = steps.length >= MIN_STEPS ? buildHowToSchema(data.title, steps) : null;

    return (
      <>
        <script
          id="schema-blog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
        />
        {faqSchema && (
          <script
            id="schema-blog-faq"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        {howToSchema && (
          <script
            id="schema-blog-howto"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
          />
        )}
      </>
    );
  }

  if (props.type === 'service') {
    return (
      <script
        id="schema-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(props.data)) }}
      />
    );
  }

  if (props.type === 'breadcrumb') {
    return (
      <script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(props.data)) }}
      />
    );
  }

  return null;
}
