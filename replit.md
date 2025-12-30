# AGIX AI Automation Services

## Overview

This is a lead generation landing page for AGIX, an AI automation services company. The application is a single-page marketing website built to capture leads from businesses interested in AI workflow automation, document processing, and business process automation services.

The site features a conversion-focused design with a hero section, lead capture form, service comparisons, and trust indicators. It follows enterprise SaaS design patterns inspired by Linear, Stripe, and Webflow.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll-triggered animations and micro-interactions
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state and API calls

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Pattern**: RESTful JSON API with `/api` prefix

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` allows swapping between in-memory and database implementations

### Key Design Patterns
- **Shared Types**: The `shared/` directory contains schemas and types used by both frontend and backend
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared code
- **Dark Mode First**: UI defaults to dark theme matching the brand's navy color palette
- **Mobile Responsive**: Uses Tailwind breakpoints with mobile-first approach
- **Device-Specific UX**: Bottom dock on mobile, slide-up panels, 48px touch targets, safe-area support
- **Performance Optimized**: Font preloading, dynamic imports, deferred component loading via requestIdleCallback

### Project Structure
```
client/src/          # React frontend application
  components/ui/     # shadcn/ui components
  pages/             # Route page components
  hooks/             # Custom React hooks
  lib/               # Utilities and API client
server/              # Express backend
  routes.ts          # API route definitions
  storage.ts         # Data access layer
shared/              # Shared types and schemas
  schema.ts          # Drizzle database schema
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database configured via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `migrations/` directory

### UI Framework
- **Radix UI**: Accessible primitive components (dialogs, dropdowns, forms, etc.)
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Lucide React**: Icon library

### Analytics
- **Google Analytics 4**: Configured in `client/index.html` with placeholder measurement ID
- **Custom Analytics Module**: `client/src/lib/analytics.ts` provides typed event tracking

### Build & Development
- **Vite**: Frontend dev server with HMR and production builds
- **Replit Plugins**: Development banner and cartographer for Replit environment
- **TSX**: TypeScript execution for server during development

## Content Engine (Internal Tool)

### Overview
The Content Engine is a passcode-protected internal tool (9636962228) for displaying pre-generated authority-building blog content. Located at `/tools/content-engine`.

### Architecture
- **Content Source**: Pre-generated articles stored in `src/lib/tools/blogContent.ts`
- **Listing Page**: `src/app/tools/content-engine/page.tsx` - displays all articles with rich metadata
- **Detail Page**: `src/app/tools/content-engine/blog/[slug]/page.tsx` - renders full article with all section types
- **No Database Required**: Content is static/pre-generated, no API calls needed

### Blog Content Types
The blog system supports rich content sections defined in `src/lib/tools/blogContent.ts`:
- **Standard**: heading, paragraph, list, quote, callout
- **Data Visualization**: table, stats, infographic
- **Technical**: code, architecture, flowchart
- **Advanced**:
  - `faq`: SEO-optimized Q&A sections
  - `benchmark`: Industry vs Top Performers vs AGIX Clients comparisons
  - `decision-tree`: Interactive diagnostic frameworks
  - `checklist`: Readiness assessments with critical/non-critical items
  - `formula`: ROI calculators with variable explanations
  - `comparison`: Multi-option comparison matrices

### Current Blog Articles (5 topics, 3000+ words each)
1. **Agentic AI for Enterprise Decision Automation** - How to reduce decision latency by 80%
2. **RAG Production Implementation Guide** - Architecture patterns scaling to 10M documents
3. **CFO's Guide to AI ROI** - Calculating true cost of ownership for enterprise AI
4. **Voice AI for Contact Centers** - 90% call handling without human escalation
5. **Enterprise Data Architecture for AI** - From data chaos to AI-ready infrastructure

### Article Metadata Displayed
Each article card shows:
- Category, target audience, read time, word count
- Pain areas addressed (rose-colored tags)
- AGIX solution positioning (emerald-colored)
- Keywords with search volume, difficulty, and type
- Tags for SEO
- Search volume and SEO difficulty metrics

### AGIX Positioning
AGIX is positioned as the leading AI solution/development/service company in the USA, specializing in custom AI solutions (not ready-made products). Key solution areas:
- Agentic AI Platform with multi-agent orchestration
- Enterprise RAG Platform with hybrid retrieval
- AI Value Realization Framework with ROI modeling
- Voice AI Platform with NLU and CRM integration
- Data Readiness Assessment and AI-Ready Data Platform