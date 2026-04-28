import { generateFAQPageSchema } from '@/lib/seo/faq-data';
import type { FAQItem } from '@/components/shared/FAQSection';

interface FAQPageSchemaProps {
  faqs: FAQItem[];
  id?: string;
}

/**
 * Injects a standalone FAQPage JSON-LD <script> tag.
 * Use this on any page that renders a visible FAQSection to signal
 * FAQPage structured data to search engines without requiring the
 * page to use the home/blog/service Schema component.
 */
export default function FAQPageSchema({ faqs, id = 'schema-faq' }: FAQPageSchemaProps) {
  if (!faqs || faqs.length < 2) return null;
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema(faqs)) }}
    />
  );
}
