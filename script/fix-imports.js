import * as fs from 'fs';
import * as path from 'path';

const dir = path.join(process.cwd(), 'src', 'app', 'case-studies');
fs.readdirSync(dir).forEach(f => {
  const p = path.join(dir, f, 'page.tsx');
  if(!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  if(c.includes('<CaseStudyTemplate') && !c.includes('import { CaseStudyTemplate }')) {
    c = 'import { CaseStudyTemplate } from "@/components/shared/case-study-template";\n' + c;
    fs.writeFileSync(p, c);
    console.log('Fixed ' + f);
  }
});
