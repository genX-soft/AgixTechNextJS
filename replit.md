# AGIX Technologies — Enterprise AI Systems Website

## Overview

Production website for AGIX Technologies (agixtech.com), an enterprise AI systems engineering company. The site serves as a lead generation and authority-building platform with service pages, industry verticals, case studies, blog integration, and an interactive AI readiness assessment wizard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend & Rendering
- **Framework**: Next.js 16.1.0 (App Router) with TypeScript
- **Styling**: Tailwind CSS with dark-mode-first enterprise aesthetic
- **UI Components**: shadcn/ui on Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query v5 (object-form only)
- **Icons**: lucide-react (UI), react-icons/si (brand logos)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON API with `/api` prefix

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Validation**: Zod schemas via drizzle-zod
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts`

### Key Project Structure
```
src/app/               # Next.js App Router pages & layouts
  services/            # 8 service landing pages
  industries/          # 8 industry landing pages
  intelligence/        # 5 intelligence category pages
  case-studies/        # 28+ case study pages
  (blog)/[slug]/       # WordPress-integrated blog posts
  admin/               # Passcode-protected lead dashboard
  corporate/           # About, Contact, Careers pages
  author/santosh/      # Author E-E-A-T page
src/components/        # React components
  main-header.tsx      # Single shared header
  main-footer.tsx      # Single shared footer
  home/                # Homepage section components
src/lib/               # Core utilities
  seo/                 # SEO: metadata, structured-data, url-metadata
  schema.ts            # Centralized schema re-exports
src/config/            # App-wide config
  contact.ts           # Centralized phone/email constants
middleware.ts          # Next.js middleware (admin route protection)
```

## Contact Constants

All contact info is centralized in `src/config/contact.ts`:
```typescript
export const CONTACT = {
  phone: "+1 857 414 1353",
  phoneHref: "tel:+18574141353",
  email: "hello@agixtech.com",
  emailHref: "mailto:hello@agixtech.com",
};
```

## SEO Architecture

### URL-Specific Metadata System
- **Config**: `src/lib/seo/url-metadata.ts` — per-URL focus keywords, headings, meta title/description, OG tags
- **Generator**: `src/lib/seo/metadata.ts` → `generateMetadataFromURL(path)`
- **Usage in layouts**: `export const metadata = generateMetadataFromURL('/path/')`

### Structured Data (JSON-LD)
- **Utilities**: `src/lib/seo/structured-data.ts` — Organization, WebPage, BreadcrumbList, BlogPosting, Service, FAQPage, CaseStudy schemas
- **Page schemas**: `src/lib/seo/page-schemas.ts` — static schema objects for each page type
- **Centralized export**: `src/lib/schema.ts` — re-exports all schema utilities
- Organization `sameAs`: LinkedIn, Twitter, Facebook, Crunchbase

### Admin Route Protection
- `middleware.ts` sets `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store` on all `/admin/*` routes
- Admin layout also sets `noIndex: true` via metadata
- Admin routes excluded from sitemap and robots.txt disallows `/admin/leads/`

### Sitemap & Robots
- `src/app/sitemap.ts` — dynamic sitemap including all services, industries, case studies, blog posts
- `src/app/robots.ts` — allows crawlers, disallows `/admin/leads/`, `/wp-admin/`, etc.

### llms.txt
- Route: `src/app/llms.txt/route.ts` — dynamically generates LLM-friendly content
- Template: `src/data/llmsTemplate.ts` — structured Q&A format for LLM citation

## Content Engine (Internal Tool)

Passcode-protected internal tool for pre-generated authority blog content. Located at `/tools/content-engine`.

## External Dependencies

- **PostgreSQL**: `DATABASE_URL` environment variable
- **WordPress CMS**: `https://cms.agixtech.com/wp-json/wp/v2` for blog posts
- **Google Tag Manager / GA4 / Microsoft Clarity**: Analytics

## Company Config (Entity Consistency)

All entity URLs are centralized in `src/config/company.ts`:
- `COMPANY.name` = "AGIX Technologies"
- `COMPANY.sameAs` = [LinkedIn, Twitter, Facebook, Crunchbase] (canonical array)
- `COMPANY.linkedin/twitter/facebook/crunchbase` = individual URL strings
- All layout files (about, careers, contact, case-studies) reference consistent Crunchbase URL

## Service Outcome Metrics (LLMO Boost)

Hardcoded outcome metrics for all 8 service pages live in `src/config/service-metrics.ts`:
- Keyed by service slug (e.g., `"ai-automation"`, `"ai-voice-agents"`)
- Each entry has a headline + 3 metrics in format: `{value, label, timeframe}`
- `getServiceOutcome(pathname)` helper extracts correct metrics from current URL path
- Rendered in `src/components/service-insights-teaser.tsx` via `usePathname()` — appears automatically on all 8 service pages with no per-page changes needed

## Blog AEO Enhancements

Blog posts receive two automatic enhancements injected server-side in `page.tsx`:

### Quick Answer Block
- Component: `src/components/blog-quick-answer.tsx`
- `extractQuickAnswer(title, excerpt, content)` generates 80–280 char answer from WP excerpt / first paragraph
- Renders as a styled callout with `schema.org/Question` + `schema.org/Answer` microdata
- Appears above the main article content (before the WP HTML)

### Blog Internal Linking

Blog posts automatically receive 1–2 contextual service links injected after the first paragraph:
- **Injector**: `src/lib/insights/inject-links.ts` → `injectInlineServiceLinks(content, services)`
- Computed server-side in `src/app/(blog)/[slug]/page.tsx` using `getRelatedServices()` from service-mapping
- Passed as `enhancedContent` prop to `BlogDetailClient`
- Rendered as a styled `blog-inline-note` callout with primary-colored underline links

## Key Notes

- All service pages and industry pages use `'use client'` for interactive forms — SSR still works in Next.js App Router
- Blog posts are fetched from WordPress with ISR (`revalidate: 3600`)
- Author page (`/author/santosh/`) has full E-E-A-T schema: Person, jobTitle, LinkedIn sameAs, bio description
- `client_legacy_backup/` directory contains a prior Vite/Wouter SPA (do not modify)
- Duplicate blog post `/best-top-ai-agent-development-companies-usa/` 301 redirects to `/top-ai-agent-development-companies-in-the-usa/`
- Contact page (`/corporate/contact/`) has full LocalBusiness schema with all 3 offices — Boston (HQ), London, Jaipur — declared via `department[]` sub-entities
- Case studies index layout includes Crunchbase in Organization sameAs
- Enterprise Knowledge AI meta title: "Enterprise Knowledge AI | RAG & Knowledge Systems"
- Footer copyright and header brand text both read "AGIX Technologies" (not "Agix Technologies")
- All FAQ answer text (153 entries in `src/lib/seo/faq-data.ts`) uses "AGIX Technologies" canonical brand casing
- robots.txt disallows `/admin/` broadly (not just `/admin/leads/`) to prevent crawler exposure

## Industry Pages — Standard Component Patterns

### Role Selector Section ("Where Should You Start?")

Every industry page that has a role/persona selector **must** use the following standardized design. It lives inside the bottlenecks section, separated by `mt-16 border-t border-border/40 pt-16`.

**Header block:**
```tsx
<div className="text-center mb-10">
  <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
    <Target className="w-3 h-3 mr-1" />Personalized AI Plan
  </Badge>
  <h3 className="text-2xl md:text-3xl font-bold mb-3">Where Should You Start?</h3>
  <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">…</p>
</div>
```

**Role card grid** (icon card, NOT text pills):
- 5 roles → `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`
- 4 roles → `grid-cols-2 sm:grid-cols-4`
- Each card: `flex-col items-center text-center gap-3 p-4 rounded-xl border-2 transition-all`
- Selected state: `{roleItem.bgColor} {roleItem.color} border-current shadow-sm`
- Unselected: `border-border/40 text-muted-foreground hover:border-border hover:bg-muted/40 bg-card`
- Icon container: `bg-white/20` when selected, `bg-muted/60` when not

**Content panel** (role identity bar + 3-column grid + CTA):
1. **Role identity bar** — full-width colored bar: role icon + name + description
2. **3-column grid** (`md:grid-cols-3 gap-4 mb-6`):
   - Col 1 "Your Challenges" — `border-destructive/20 bg-destructive/5` — each bottleneck as a card
   - Col 2 "The AI Fix" — `border-green-500/20 bg-green-500/5` — each AI system with `CheckCircle2` + impact chips
   - Col 3 (role-color-tinted) — "Your 12-Week Roadmap" (real estate) or "Deployment Sequence" (healthcare) — numbered timeline with connecting `w-px flex-1 bg-border/60`
3. **CTA footer bar** — `flex-col sm:flex-row justify-between gap-4 p-5 rounded-xl bg-muted/50 border` — message left, `<Button>` right linking to `#lead-form`

**Data adaptation per industry:**
- Real estate: uses `role.roadmapItems[{phase, action}]` for column 3
- Healthcare: uses `aiSystems.shortName` + `timeline` + `whatItDoes[0]` for column 3

All future industry pages should follow this exact structural pattern.

---

## Intelligence Pages — Content Upgrade

### Operational Intelligence (`/intelligence/operational-ai/`)
Fully rebuilt with new content merged from April 2026 content strategy doc. Page structure:
1. **HeroSection** — AEO-first headline + author attribution (April 2026)
2. **DefinitionBlock** — schema.org/Question microdata, ORIGINAL callout quote
3. **WhyNowSection** — 3 convergent forces + 3 market stats (360iResearch, IDC, Mordor Intelligence)
4. **ComparisonTable** — 7-row: Intelligence vs Automation vs Analytics (upgraded from 4 rows)
5. **AGIXIntelligenceStack** — proprietary 4-layer interactive framework (Visibility→Understanding→Prediction→Autonomy), replaces generic 5-layer architecture
6. **MaturityAssessment** — 5-level accordion self-diagnosis (Level 0 Blind → Level 4 Autonomous)
7. **IndustryApplications** — 7-industry grid cards with application + impact
8. **ImplementationBridge** — layer-to-service crosslinks (AI Automation, RAG, Predictive Analytics, Agentic AI)
9. **AgixMethodology** — 5-step AGIX process (updated framing referencing 4-layer stack)
10. **ResultsMetrics** — 4 research-backed outcome stats with citations
11. **FutureTrajectory** — 2028 trajectory (5 points) + author bio (Santosh Singh)
12. **FAQSection** — 10 new AEO-optimized questions
Meta title updated to: "Operational Intelligence | How AI Transforms Business Operations"
Layout now includes Article schema with author attribution.
FAQ data updated with 10 new informational-intent questions.
Keywords pivoted from "operational ai" to "operational intelligence" (higher volume primary keyword).
