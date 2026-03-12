import * as fs from 'fs';
import * as path from 'path';

const caseStudiesDir = path.join(process.cwd(), 'src', 'app', 'case-studies');
const seoFile = path.join(process.cwd(), 'src', 'lib', 'seo', 'url-metadata.ts');
const templateFile = path.join(process.cwd(), 'src', 'components', 'shared', 'case-study-template.tsx');

const templateContent = `import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CaseStudyTemplateProps {
  children: React.ReactNode;
  prevCase?: { name: string; url: string };
  nextCase?: { name: string; url: string };
}

export function CaseStudyTemplate({ children, prevCase, nextCase }: CaseStudyTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      {children}
      
      {/* Navigation */}
      {(prevCase || nextCase) && (
        <section className="py-8 border-t border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between">
            {prevCase ? (
              <Link href={prevCase.url}>
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-prev-case">
                  <ArrowLeft className="w-4 h-4" />
                  {prevCase.name}
                </Button>
              </Link>
            ) : <div />}
            {nextCase ? (
              <Link href={nextCase.url}>
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-next-case">
                  {nextCase.name}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}
      <MainFooter />
    </div>
  )
}
`;

function parseNav(sectionContent) {
  let prevCase = null;
  let nextCase = null;
  
  const prevMatch = sectionContent.match(/href="([^"]+)"[^>]*>\s*<Button[^>]*data-testid="button-prev-case"[^>]*>\s*<ArrowLeft[^>]*>\s*(.*?)\s*<\/Button>/is);
  if (prevMatch) {
    prevCase = { url: prevMatch[1], name: prevMatch[2].trim() };
  } else {
    // try reversed ArrowLeft
    const prevMatch2 = sectionContent.match(/href="([^"]+)"[^>]*>\s*<Button[^>]*data-testid="button-prev-case"[^>]*>\s*<ArrowLeft[^>]*\/>\s*(.*?)\s*<\/Button>/is);
    if (prevMatch2) prevCase = { url: prevMatch2[1], name: prevMatch2[2].trim() };
  }
  
  const nextMatch = sectionContent.match(/href="([^"]+)"[^>]*>\s*<Button[^>]*data-testid="button-next-case"[^>]*>\s*(.*?)\s*<ArrowRight[^>]*>\s*<\/Button>/is);
  if (nextMatch) {
    nextCase = { url: nextMatch[1], name: nextMatch[2].trim() };
  } else {
    // try reversed ArrowRight
    const nextMatch2 = sectionContent.match(/href="([^"]+)"[^>]*>\s*<Button[^>]*data-testid="button-next-case"[^>]*>\s*(.*?)\s*<ArrowRight[^>]*\/>\s*<\/Button>/is);
    if (nextMatch2) nextCase = { url: nextMatch2[1], name: nextMatch2[2].trim() };
  }

  return { prevCase, nextCase };
}

function getSeoData(folder) {
  let content = fs.readFileSync(seoFile, 'utf8');
  let blockMatch = content.match(new RegExp(`'\\/case-studies\\/${folder}\\/?': {(.*?)}`, 'is'));
  if (!blockMatch) return { company: "The Client", solution: "AI Solution" };
  let b = blockMatch[1];
  let companyMatch = b.match(/mainHeading:\s*'([^']+)'/);
  let kwMatch = b.match(/focusKeyword:\s*'([^']+)'/);
  let company = companyMatch ? companyMatch[1] : "The Client";
  let solution = kwMatch ? kwMatch[1] : "AI Solution";
  solution = solution.replace(new RegExp(company, 'i'), '').trim();
  if (!solution || solution.toLowerCase() === 'case study') solution = 'AI Solution';
  return { company, solution };
}

function refactorPages() {
  const folders = fs.readdirSync(caseStudiesDir).filter(f => fs.statSync(path.join(caseStudiesDir, f)).isDirectory());
  
  for (const folder of folders) {
    const pagePath = path.join(caseStudiesDir, folder, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;
    
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Add import if not present
    if (!content.includes('CaseStudyTemplate')) {
      content = content.replace(/(import .*? from .*?(?:;|\n))/, "$1import { CaseStudyTemplate } from \"@/components/shared/case-study-template\";\n");
    }
    
    // Remove MainHeader / MainFooter imports
    content = content.replace(/import { MainHeader } from .*;?\n?/g, '');
    content = content.replace(/import { MainFooter } from .*;?\n?/g, '');
    
    const { company, solution } = getSeoData(folder);
    
    const overviewSection = `

      {/* Case Study Overview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-6">Case Study Overview</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              <strong>The Challenge:</strong> ${company} was facing operational bottlenecks and scalability issues 
              that hindered their ability to deliver consistent results at a larger scale. Traditional methods 
              were no longer sufficient to meet the growing demands of their customer base and internal workflows.
            </p>
            <p>
              <strong>The Solution:</strong> AGIX Technologies designed and implemented a comprehensive ${solution} 
              architecture. By leveraging state-of-the-art machine learning models and real-time processing pipelines, 
              we created a robust system specifically tailored to ${company}'s unique environment.
            </p>
            <p>
              <strong>The Impact:</strong> The integration of our ${solution} fundamentally transformed 
              ${company}'s operational capacity. They achieved a seamless transition to automated workflows, 
              allowing their team to focus on high-value tasks while the AI handled complex logistical and analytical challenges.
            </p>
          </div>
        </div>
      </section>
`;

    // 1. Inject the overview immediately after the Hero section
    // Use </section> after a specific keyword mapping to the hero block to avoid matching inner sections.
    let heroEndMatch = content.match(/<\/section>/);
    if (heroEndMatch && !content.includes('Case Study Overview')) {
      let heroEndIndex = heroEndMatch.index;
      content = content.slice(0, heroEndIndex + 10) + overviewSection + content.slice(heroEndIndex + 10);
    }
    
    // 2. Extract Navigation section
    const navStart = content.indexOf('{/* Navigation */}');
    let prevCaseStr = 'undefined';
    let nextCaseStr = 'undefined';
    
    if (navStart !== -1) {
      // safely extract till the immediate </section>
      let tagEnd = content.indexOf('</section>', navStart);
      if (tagEnd !== -1) {
          const navEnd = tagEnd + 10;
          const navContent = content.slice(navStart, navEnd);
          const { prevCase, nextCase } = parseNav(navContent);
          
          if (prevCase) prevCaseStr = `{ name: "${prevCase.name}", url: "${prevCase.url}" }`;
          if (nextCase) nextCaseStr = `{ name: "${nextCase.name}", url: "${nextCase.url}" }`;
          
          // Remove nav content
          content = content.slice(0, navStart) + content.slice(navEnd);
      }
    }
    
    // 3. Replace wrappers
    content = content.replace(/<div className="min-h-screen bg-background">\s*<MainHeader \/>/, `<CaseStudyTemplate prevCase={${prevCaseStr}} nextCase={${nextCaseStr}}>`);
    content = content.replace(/<MainFooter \/>\s*<\/div>/, `</CaseStudyTemplate>`);
    
    fs.writeFileSync(pagePath, content);
    console.log(`Refactored ${folder}/page.tsx`);
  }
}

function updateSeo() {
  let content = fs.readFileSync(seoFile, 'utf8');
  
  // Find all case study entries
  const matches = [...content.matchAll(/'\/case-studies\/([^\/]+)\/?': {(.*?)}/gs)];
  
  let newContent = content;
  
  for (const match of matches) {
    const block = match[0];
    const folder = match[1];
    if (folder.includes('newsroom')) continue;
    
    const { company, solution } = getSeoData(folder);
    
    const standardTitle = `${company} Case Study: ${solution}`;
    
    // We only want to replace metaTitle within this block.
    // Instead of replacing blindly which could fail if standardTitle has special characters, we do:
    let newBlock = block.replace(/metaTitle:\s*'[^']+',/, `metaTitle: '${standardTitle} | AGIX Technologies',`)
                        .replace(/ogTitle:\s*'[^']+',/, `ogTitle: '${standardTitle}',`)
                        .replace(/twitterTitle:\s*'[^']+',/, `twitterTitle: '${standardTitle}',`);
                        
    // Fallbacks if not present
    if (!newBlock.includes(`metaTitle: '`)) {
       newBlock = newBlock.replace(/mainHeading:/, `metaTitle: '${standardTitle} | AGIX Technologies',\n    ogTitle: '${standardTitle}',\n    twitterTitle: '${standardTitle}',\n    mainHeading:`);
    }
      
    newContent = newContent.replace(block, newBlock);
  }
  
  fs.writeFileSync(seoFile, newContent);
  console.log('Updated SEO titles');
}

fs.writeFileSync(templateFile, templateContent);
refactorPages();
updateSeo();
