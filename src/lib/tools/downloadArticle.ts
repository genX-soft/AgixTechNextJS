import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } from 'docx';
import { saveAs } from 'file-saver';
import type { BlogArticle, BlogSection } from './blogContent';

function convertSectionToDocx(section: BlogSection): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  switch (section.type) {
    case 'heading':
      paragraphs.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text: section.content || '', bold: true, size: 28 })],
      }));
      break;

    case 'paragraph':
      paragraphs.push(new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: section.content || '', size: 22 })],
      }));
      break;

    case 'list':
      if (section.items) {
        section.items.forEach(item => {
          paragraphs.push(new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [new TextRun({ text: item, size: 22 })],
          }));
        });
      }
      break;

    case 'quote':
      paragraphs.push(new Paragraph({
        indent: { left: 720 },
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: section.content || '', italics: true, size: 22, color: '555555' })],
      }));
      break;

    case 'callout':
      paragraphs.push(new Paragraph({
        spacing: { before: 200, after: 200 },
        shading: { type: ShadingType.SOLID, color: 'F0F9FF' },
        children: [new TextRun({ text: `💡 ${section.content || ''}`, size: 22, bold: true })],
      }));
      break;

    case 'stats':
      if (section.statsData?.stats) {
        paragraphs.push(new Paragraph({
          spacing: { before: 300, after: 100 },
          children: [new TextRun({ text: 'Key Statistics', bold: true, size: 24 })],
        }));
        section.statsData.stats.forEach(stat => {
          paragraphs.push(new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: `${stat.value}`, bold: true, size: 22 }),
              new TextRun({ text: ` — ${stat.label}`, size: 22 }),
              ...(stat.trend ? [new TextRun({ text: ` (${stat.trend})`, size: 20, color: '22C55E' })] : []),
            ],
          }));
        });
      }
      break;

    case 'code':
      if (section.codeData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.codeData.title, bold: true, size: 22 })],
        }));
        paragraphs.push(new Paragraph({
          spacing: { after: 100 },
          shading: { type: ShadingType.SOLID, color: 'F5F5F5' },
          children: [new TextRun({ text: section.codeData.code, font: 'Courier New', size: 18 })],
        }));
        if (section.codeData.explanation) {
          paragraphs.push(new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: section.codeData.explanation, italics: true, size: 20, color: '666666' })],
          }));
        }
      }
      break;

    case 'table':
      if (section.tableData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.content || 'Table', bold: true, size: 24 })],
        }));
        const headerRow = section.tableData.headers.join(' | ');
        paragraphs.push(new Paragraph({
          spacing: { after: 50 },
          shading: { type: ShadingType.SOLID, color: 'E5E7EB' },
          children: [new TextRun({ text: headerRow, bold: true, size: 20 })],
        }));
        section.tableData.rows.forEach(row => {
          paragraphs.push(new Paragraph({
            spacing: { after: 50 },
            children: [new TextRun({ text: row.join(' | '), size: 20 })],
          }));
        });
      }
      break;

    case 'infographic':
      if (section.infographicData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.infographicData.title, bold: true, size: 24 })],
        }));
        section.infographicData.items.forEach(item => {
          paragraphs.push(new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: `${item.label}: `, bold: true, size: 22 }),
              new TextRun({ text: item.value, size: 22 }),
            ],
          }));
        });
      }
      break;

    case 'flowchart':
      if (section.flowchartData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.flowchartData.title, bold: true, size: 24 })],
        }));
        section.flowchartData.steps.forEach(step => {
          paragraphs.push(new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: `Step ${step.step}: ${step.title}`, bold: true, size: 22 }),
              new TextRun({ text: ` — ${step.description}`, size: 22 }),
            ],
          }));
        });
      }
      break;

    case 'architecture':
      if (section.architectureData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.architectureData.title, bold: true, size: 24 })],
        }));
        section.architectureData.layers.forEach(layer => {
          paragraphs.push(new Paragraph({
            spacing: { before: 100, after: 50 },
            children: [new TextRun({ text: `${layer.name}: `, bold: true, size: 22 }), new TextRun({ text: layer.description, size: 22 })],
          }));
          paragraphs.push(new Paragraph({
            indent: { left: 360 },
            spacing: { after: 80 },
            children: [new TextRun({ text: `Components: ${layer.components.join(', ')}`, size: 20, color: '666666' })],
          }));
        });
      }
      break;

    case 'faq':
      if (section.faqData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 300, after: 200 },
          children: [new TextRun({ text: section.faqData.title || 'Frequently Asked Questions', bold: true, size: 28 })],
        }));
        section.faqData.items.forEach((faq, i) => {
          paragraphs.push(new Paragraph({
            spacing: { before: 200, after: 80 },
            children: [new TextRun({ text: `Q${i + 1}: ${faq.question}`, bold: true, size: 22 })],
          }));
          paragraphs.push(new Paragraph({
            spacing: { after: 150 },
            children: [new TextRun({ text: faq.answer, size: 22 })],
          }));
        });
      }
      break;

    case 'benchmark':
      if (section.benchmarkData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.benchmarkData.title, bold: true, size: 24 })],
        }));
        section.benchmarkData.benchmarks.forEach(bm => {
          paragraphs.push(new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: `${bm.metric}: `, bold: true, size: 22 }),
              new TextRun({ text: `Industry Avg: ${bm.industryAvg} | Top Performers: ${bm.topPerformers} | AGIX Clients: ${bm.agixClients}`, size: 20 }),
            ],
          }));
        });
      }
      break;

    case 'comparison':
      if (section.comparisonData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.comparisonData.title, bold: true, size: 24 })],
        }));
        section.comparisonData.options.forEach(opt => {
          paragraphs.push(new Paragraph({
            spacing: { before: 100, after: 50 },
            children: [new TextRun({ text: opt.name, bold: true, size: 22 })],
          }));
          opt.scores.forEach((score, i) => {
            const criterion = section.comparisonData!.criteria[i] || `Criterion ${i + 1}`;
            paragraphs.push(new Paragraph({
              indent: { left: 360 },
              spacing: { after: 40 },
              children: [new TextRun({ text: `${criterion}: ${score}`, size: 20 })],
            }));
          });
          if (opt.recommendation) {
            paragraphs.push(new Paragraph({
              indent: { left: 360 },
              spacing: { after: 80 },
              children: [new TextRun({ text: `Recommendation: ${opt.recommendation}`, italics: true, size: 20, color: '22C55E' })],
            }));
          }
        });
      }
      break;

    case 'checklist':
      if (section.checklistData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.checklistData.title, bold: true, size: 24 })],
        }));
        section.checklistData.items.forEach(item => {
          paragraphs.push(new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: item.critical ? '🔴 ' : '🟢 ', size: 22 }),
              new TextRun({ text: item.item, bold: true, size: 22 }),
              new TextRun({ text: ` — ${item.description}`, size: 20 }),
            ],
          }));
        });
      }
      break;

    case 'formula':
      if (section.formulaData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.formulaData.title, bold: true, size: 24 })],
        }));
        paragraphs.push(new Paragraph({
          spacing: { after: 100 },
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.SOLID, color: 'F5F5F5' },
          children: [new TextRun({ text: section.formulaData.formula, bold: true, font: 'Courier New', size: 24 })],
        }));
        section.formulaData.variables.forEach(v => {
          paragraphs.push(new Paragraph({
            indent: { left: 360 },
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `${v.symbol}`, bold: true, font: 'Courier New', size: 20 }),
              new TextRun({ text: ` = ${v.meaning}`, size: 20 }),
            ],
          }));
        });
        if (section.formulaData.example) {
          paragraphs.push(new Paragraph({
            spacing: { before: 100, after: 200 },
            children: [new TextRun({ text: `Example: ${section.formulaData.example}`, italics: true, size: 20, color: '666666' })],
          }));
        }
      }
      break;

    case 'decision-tree':
      if (section.decisionTreeData) {
        paragraphs.push(new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: section.decisionTreeData.title, bold: true, size: 24 })],
        }));
        if (section.decisionTreeData.description) {
          paragraphs.push(new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({ text: section.decisionTreeData.description, size: 22 })],
          }));
        }
        section.decisionTreeData.nodes.forEach(node => {
          const prefix = node.type === 'question' ? 'Q: ' : 'A: ';
          paragraphs.push(new Paragraph({
            indent: { left: node.type === 'answer' ? 720 : 360 },
            spacing: { after: 60 },
            children: [
              new TextRun({ text: prefix, bold: true, size: 22 }),
              new TextRun({ text: node.text, size: 22, color: node.type === 'answer' ? '22C55E' : '000000' }),
            ],
          }));
        });
      }
      break;

    default:
      if (section.content) {
        paragraphs.push(new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: section.content, size: 22 })],
        }));
      }
  }

  return paragraphs;
}

export async function downloadArticleAsWord(article: BlogArticle): Promise<void> {
  const allParagraphs: Paragraph[] = [];

  allParagraphs.push(new Paragraph({
    heading: HeadingLevel.TITLE,
    spacing: { after: 200 },
    children: [new TextRun({ text: article.title, bold: true, size: 36 })],
  }));

  allParagraphs.push(new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: `By ${article.author.name}`, size: 20, color: '666666' }),
      new TextRun({ text: ` | ${article.author.role}`, size: 20, color: '888888' }),
    ],
  }));

  allParagraphs.push(new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: `Category: ${article.category}`, size: 20, color: '666666' }),
      new TextRun({ text: ` | ${article.readTime}`, size: 20, color: '666666' }),
      new TextRun({ text: ` | ${article.wordCount.toLocaleString()} words`, size: 20, color: '666666' }),
    ],
  }));

  allParagraphs.push(new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: `Published: ${article.publishDate}`, size: 20, color: '888888' }),
      new TextRun({ text: ` | Last Updated: ${article.lastUpdated}`, size: 20, color: '888888' }),
    ],
  }));

  allParagraphs.push(new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: `Tags: ${article.tags.join(', ')}`, size: 20, color: '888888' })],
  }));

  allParagraphs.push(new Paragraph({ spacing: { after: 300 }, children: [] }));

  allParagraphs.push(new Paragraph({
    spacing: { after: 200 },
    shading: { type: ShadingType.SOLID, color: 'F0F9FF' },
    children: [new TextRun({ text: article.metaDescription, italics: true, size: 22 })],
  }));

  allParagraphs.push(new Paragraph({ spacing: { after: 200 }, children: [] }));

  for (const section of article.sections) {
    const sectionParagraphs = convertSectionToDocx(section);
    allParagraphs.push(...sectionParagraphs);
  }

  if (article.serviceCTAs.length > 0) {
    allParagraphs.push(new Paragraph({ spacing: { before: 400 }, children: [] }));
    allParagraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 200 },
      children: [new TextRun({ text: 'AGIX Services', bold: true, size: 28 })],
    }));
    article.serviceCTAs.forEach(cta => {
      allParagraphs.push(new Paragraph({
        spacing: { after: 50 },
        children: [new TextRun({ text: cta.title, bold: true, size: 22 })],
      }));
      allParagraphs.push(new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: cta.description, size: 20 })],
      }));
    });
  }

  if (article.references.length > 0) {
    allParagraphs.push(new Paragraph({ spacing: { before: 400 }, children: [] }));
    allParagraphs.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 200 },
      children: [new TextRun({ text: 'References', bold: true, size: 28 })],
    }));
    article.references.forEach((ref, i) => {
      allParagraphs.push(new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: `[${i + 1}] `, bold: true, size: 20 }),
          new TextRun({ text: `${ref.title} — ${ref.source} (${ref.year})`, size: 20 }),
        ],
      }));
    });
  }

  const doc = new Document({
    creator: 'AGIX Technologies',
    title: article.title,
    description: article.metaDescription,
    sections: [{
      properties: {},
      children: allParagraphs,
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${article.slug}.docx`);
}
