export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  faqs: FAQItem[];
  cleanedContent: string;
}

export function extractFAQsFromContent(htmlContent: string): FAQData {
  const faqs: FAQItem[] = [];
  let cleanedContent = htmlContent;

  if (htmlContent.includes('schema-faq-section')) {
    const sectionPattern =
      /<div[^>]*class="[^"]*schema-faq-section[^"]*"[^>]*>[\s\S]*?<strong[^>]*class="[^"]*schema-faq-question[^"]*"[^>]*>([\s\S]*?)<\/strong>\s*<p[^>]*class="[^"]*schema-faq-answer[^"]*"[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi;
    let m;
    while ((m = sectionPattern.exec(htmlContent)) !== null) {
      const question = m[1].replace(/<[^>]*>/g, '').trim();
      const answer = m[2].trim();
      if (question && answer) faqs.push({ question, answer });
    }

    if (faqs.length > 0) {
      cleanedContent = cleanedContent.replace(
        /<div[^>]*class="[^"]*schema-faq[^"]*wp-block-yoast-faq-block[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi,
        ''
      );
      cleanedContent = cleanedContent.replace(
        /<div[^>]*class="[^"]*schema-faq[^"]*wp-block-yoast-faq-block[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
        ''
      );
      cleanedContent = cleanedContent.replace(
        /<h[23][^>]*>[^<]*Frequently Asked Questions[^<]*<\/h[23]>/gi,
        ''
      );
    }
  }

  if (faqs.length === 0) {
    const faqHeadingMatch = htmlContent.match(
      /<h2[^>]*>[^<]*Frequently Asked Questions[^<]*<\/h2>/i
    );

    if (faqHeadingMatch) {
      const faqHeadingIndex = htmlContent.indexOf(faqHeadingMatch[0]);
      const contentAfterHeading = htmlContent.slice(
        faqHeadingIndex + faqHeadingMatch[0].length
      );

      const nextH2Match = contentAfterHeading.match(/<h2[^>]*>/i);
      const faqSectionBody = nextH2Match
        ? contentAfterHeading.slice(0, contentAfterHeading.indexOf(nextH2Match[0]))
        : contentAfterHeading;

      const ansPattern =
        /<h[34][^>]*>([\s\S]*?)<\/h[34]>[\s\S]*?<p[^>]*><strong>Ans\.?<\/strong>\s*([\s\S]*?)<\/p>/gi;
      let am;
      const matchedBlocks: string[] = [];

      while ((am = ansPattern.exec(faqSectionBody)) !== null) {
        const question = am[1]
          .replace(/<[^>]*>/g, '')
          .replace(/&[^;]+;/g, "'")
          .trim();
        const answer = am[2].trim();
        if (question && answer && question.length > 5 && answer.length > 10) {
          faqs.push({ question, answer });
          matchedBlocks.push(am[0]);
        }
      }

      if (faqs.length > 0) {
        cleanedContent = cleanedContent.replace(faqHeadingMatch[0], '');
        for (const block of matchedBlocks) {
          cleanedContent = cleanedContent.replace(block, '');
        }
      }
    }
  }

  if (faqs.length > 0) {
    cleanedContent = cleanedContent.replace(/<p[^>]*>\s*<\/p>/g, '');
  }

  return { faqs, cleanedContent };
}
