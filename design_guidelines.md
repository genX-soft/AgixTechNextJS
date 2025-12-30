# AGIX AI Automation Services - Design Guidelines

## Design Approach
**Reference-Based Hybrid**: Drawing inspiration from enterprise SaaS leaders (Linear, Stripe, Webflow) combined with modern tech platforms that balance sophistication with accessibility. The design prioritizes conversion-focused layouts with dynamic, engaging interactions while maintaining professional credibility.

## Brand Color System
- **Primary Dark Navy**: Deep navy blue backgrounds and primary sections
- **Accent Orange**: CTAs, highlights, interactive elements, hover states
- **Neutral Palette**: White text on dark backgrounds, light grey for secondary text, black for depth/shadows
- **Gradient Applications**: Navy-to-black gradients for depth, orange glows for emphasis

## Typography Hierarchy
**Font Selection**: Google Fonts - Inter (primary) + Space Grotesk (headings)
- **Hero Headline**: Space Grotesk Bold, 3.5rem (desktop) / 2rem (mobile)
- **Section Headers**: Space Grotesk SemiBold, 2.5rem (desktop) / 1.75rem (mobile)
- **Capability Titles**: Inter SemiBold, 1.5rem
- **Body Text**: Inter Regular, 1.125rem, light grey (#d1d5db)
- **Micro-text**: Inter Medium, 0.875rem, orange for emphasis

## Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- **Section Padding**: py-24 (desktop) / py-16 (mobile)
- **Content Max-Width**: max-w-7xl for full sections, max-w-4xl for text-heavy content
- **Grid Systems**: 12-column base, 3-column capability cards, 2-column comparison tables

## Hero Section Design
**Layout**: Full-width dark navy background with subtle gradient overlay
- Animated headline with line-by-line text reveal (stagger effect)
- Subheadline with orange accent underlines on key phrases
- Dual-CTA setup: Primary orange button ("Request Assessment") + secondary ghost button
- Trust indicator micro-text below CTAs with animated client logos
- **Hero Image**: Abstract AI/automation visualization (neural networks, connected nodes, data flows) as semi-transparent overlay on right side, 40% opacity

## Sticky Lead Capture Form
**Positioning**: Fixed right sidebar (desktop) / slide-in drawer (mobile)
- Floating card with dark navy background, orange border glow
- Compact 4-field form with inline validation
- Dropdowns with custom styling (orange focus states)
- Micro-progress indicator showing form completion
- Glassmorphism effect: backdrop-blur with semi-transparent background

## Core Interaction Patterns

### Scroll-Triggered Animations
- **Problem → Solution Transitions**: Fade-in + slide-up on scroll (intersection observer)
- **Statistics Counters**: Animate from 0 to value when visible (odometer effect)
- **Section Reveals**: Staggered element entrance with 100ms delays

### Comparison Cards (Traditional vs AI)
- Side-by-side table layout with alternating row highlights
- Expandable details on click (accordion-style)
- Hover states with orange left border accent
- Icons for checkmarks (AI side) vs X marks (Traditional side) from Heroicons

### Capability Sections (5 Cards)
**Card Design**: Dark navy cards with orange border on hover
- Icon at top (120px size, orange fill)
- Title + SEO-optimized definition
- Expandable "Use Cases" accordion
- Timeline/pricing indicators with pill badges (orange background)
- "Learn More" links with arrow animations
- Grid: 3-column (desktop) / 1-column (mobile)

### Industry Hover Cards
- Grid of 8 industry cards with icon + label
- Subtle scale transform on hover (scale: 1.05)
- Orange glow effect on active state
- Clicking filters related content below

## Component Library

### Navigation
- Fixed header with dark navy background, subtle shadow on scroll
- Orange logo accent, white navigation links
- Mobile: Hamburger menu with slide-in drawer

### Buttons
**Primary CTA**: Orange background, white text, rounded-lg, px-8 py-4
**Secondary**: Orange border, orange text, transparent background
**Ghost**: White/grey text with orange underline on hover
**Blur Treatment**: When on images, add backdrop-blur-sm with semi-transparent background

### Form Inputs
- Dark background with light grey borders
- Orange focus ring (ring-2 ring-orange-500)
- Inline error states with red text
- Success states with green checkmarks

### FAQ Accordion
- Question rows with orange chevron icons
- Smooth height transitions (300ms ease)
- Search functionality with highlighted matches
- Dark cards with hover lift effect

## Animation Strategy
**Purposeful Micro-Interactions Only**:
- Button hover: Subtle scale (1.02) + orange glow
- Card hover: Lift effect (translateY -4px) + shadow increase
- Text reveals: Fade-in + slide-up (20px distance)
- Counter animations: Number increment on scroll into view
- Icon animations: Rotate/pulse on section entrance (one-time only)
- Scroll progress bar: Orange line at top showing page position

**Avoid**: Continuous animations, parallax scrolling, excessive movement

## Responsive Behavior
- **Desktop (1280px+)**: 3-column grids, sticky sidebar form, horizontal comparison tables
- **Tablet (768-1279px)**: 2-column grids, floating form button that expands, simplified tables
- **Mobile (<768px)**: Single column, drawer-based form, stacked comparisons, touch-optimized interactions

## SEO & Semantic Structure
- H1 for main headline, H2 for section headers, H3 for capability titles
- Schema markup sections for Service, Organization, FAQPage
- Meta descriptions with target keywords (AI automation services, workflow automation, BPA)
- Internal linking with orange underlined anchor text

## Images
**Hero**: Abstract AI visualization (1920x1080) - neural network patterns, data nodes, automation flows in navy/orange gradient
**Capability Icons**: Heroicons library for workflow, document, email, process automation symbols
**Industry Icons**: Custom icon set or Heroicons for healthcare, finance, logistics, etc.
**No other photography** - maintain technical, data-driven aesthetic with illustrations/icons only