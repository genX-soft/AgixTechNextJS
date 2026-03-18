export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  faqs: FAQItem[];
  cleanedContent: string;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '"').trim();
}

/**
 * Safe literal string removal — avoids regex special-character issues
 * when the block contains parentheses, dollar signs, etc.
 */
function removeLiteral(source: string, needle: string): string {
  return source.split(needle).join('');
}

export function extractFAQsFromContent(htmlContent: string): FAQData {
  const faqs: FAQItem[] = [];
  let cleanedContent = htmlContent;

  // ── Pattern 1: Yoast FAQ Block (schema-faq-section) ──────────────────────
  if (htmlContent.includes('schema-faq-section')) {
    const sectionPattern =
      /<div[^>]*class="[^"]*schema-faq-section[^"]*"[^>]*>[\s\S]*?<strong[^>]*class="[^"]*schema-faq-question[^"]*"[^>]*>([\s\S]*?)<\/strong>\s*<p[^>]*class="[^"]*schema-faq-answer[^"]*"[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi;
    let m;
    while ((m = sectionPattern.exec(htmlContent)) !== null) {
      const question = stripTags(m[1]);
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
      return cleanup(faqs, cleanedContent);
    }
  }

  // ── Pattern 2: Numbered Q&A paragraphs (most common WP blog format) ───────
  //
  // Heading variants:
  //   <h3>FAQs</h3>
  //   <h3>FAQ:</h3>
  //   <h3>FAQ: Agentic Reasoning Loops</h3>
  //   <h2>Frequently Asked Questions (FAQ)</h2>
  //
  // Q&A structure (question and answer in the same <p>):
  //   <p><strong>1. Question text?</strong><br />
  //   <strong>Ans:</strong> Answer text.</p>
  //
  //   <p><strong>1. Question text?</strong><br />
  //   <strong>Ans: </strong>Answer text.</p>   ← trailing space inside <strong>
  //
  if (faqs.length === 0) {
    const faqHeadingMatch = htmlContent.match(
      /<h[2-4][^>]*>[^<]*(?:FAQ|Frequently Asked)[^<]*<\/h[2-4]>/i
    );

    if (faqHeadingMatch) {
      const headingIndex = htmlContent.indexOf(faqHeadingMatch[0]);
      const afterHeading = htmlContent.slice(headingIndex + faqHeadingMatch[0].length);

      // Limit scope: stop at the next <h2> (a new top-level section)
      const nextH2 = afterHeading.match(/<h2[^>]*>/i);
      const faqBody = nextH2
        ? afterHeading.slice(0, afterHeading.indexOf(nextH2[0]))
        : afterHeading;

      // Each Q&A is one <p>:
      //   Format A: <p><strong>N. Q</strong><br />\n<strong>Ans[.:][ ]</strong> Answer</p>
      //   Format B: <p><strong>N. Q</strong><br />\nAnswer (no Ans: label)</p>
      // The "Ans[.:]" label is optional — some posts omit it entirely
      const pQAPattern =
        /<p[^>]*>\s*<strong>\d+\.\s*([\s\S]*?)<\/strong>\s*<br\s*\/?>\s*[\r\n]*\s*(?:<strong>Ans[.:][^<]*<\/strong>\s*)?([\s\S]*?)<\/p>/gi;

      const matched: string[] = [];
      let m;
      while ((m = pQAPattern.exec(faqBody)) !== null) {
        const question = stripTags(m[1]);
        const answer = m[2].trim();
        if (question && answer && question.length > 5) {
          faqs.push({ question, answer });
          matched.push(m[0]);
        }
      }

      if (faqs.length > 0) {
        cleanedContent = removeLiteral(cleanedContent, faqHeadingMatch[0]);
        for (const block of matched) {
          cleanedContent = removeLiteral(cleanedContent, block);
        }
        return cleanup(faqs, cleanedContent);
      }
    }
  }

  // ── Pattern 3: H3/H4 question headings with <strong>Ans.</strong> ─────────
  //
  // <h2>Frequently Asked Questions</h2>
  //   <h4 class="wp-block-heading">Question?</h4>
  //   <p><strong>Ans.</strong> Answer text</p>
  //
  if (faqs.length === 0) {
    const faqHeadingMatch = htmlContent.match(
      /<h2[^>]*>[^<]*Frequently Asked Questions[^<]*<\/h2>/i
    );

    if (faqHeadingMatch) {
      const headingIndex = htmlContent.indexOf(faqHeadingMatch[0]);
      const afterHeading = htmlContent.slice(headingIndex + faqHeadingMatch[0].length);
      const nextH2 = afterHeading.match(/<h2[^>]*>/i);
      const faqBody = nextH2
        ? afterHeading.slice(0, afterHeading.indexOf(nextH2[0]))
        : afterHeading;

      const ansPattern =
        /<h[34][^>]*>([\s\S]*?)<\/h[34]>[\s\S]*?<p[^>]*><strong>Ans\.?<\/strong>\s*([\s\S]*?)<\/p>/gi;
      const matched: string[] = [];
      let m;
      while ((m = ansPattern.exec(faqBody)) !== null) {
        const question = stripTags(m[1]);
        const answer = m[2].trim();
        if (question && answer && question.length > 5 && answer.length > 10) {
          faqs.push({ question, answer });
          matched.push(m[0]);
        }
      }

      if (faqs.length > 0) {
        cleanedContent = removeLiteral(cleanedContent, faqHeadingMatch[0]);
        for (const block of matched) {
          cleanedContent = removeLiteral(cleanedContent, block);
        }
        return cleanup(faqs, cleanedContent);
      }
    }
  }

  // No FAQs found — return original content unchanged
  return { faqs: [], cleanedContent: htmlContent };
}

function cleanup(faqs: FAQItem[], content: string): FAQData {
  // Remove empty paragraphs left behind after extraction
  const cleanedContent = content.replace(/<p[^>]*>\s*<\/p>/g, '');
  return { faqs, cleanedContent };
}
