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
- Contact page (`/corporate/contact/`) has full LocalBusiness schema with address, geo, phone, email, hours
- Case studies index layout includes Crunchbase in Organization sameAs
- Enterprise Knowledge AI meta title: "Enterprise Knowledge AI | RAG & Knowledge Management Systems"
