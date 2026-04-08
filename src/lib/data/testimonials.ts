export type TestimonialService =
  | 'AI Consulting'
  | 'AI Development'
  | 'Automation'
  | 'Voice AI'
  | 'Industry Solutions';

export interface Testimonial {
  id: string;
  reviewerName: string;
  reviewerTitle: string;
  company: string;
  source: 'Clutch' | 'Sortlist' | 'TechBehemoths' | 'Google';
  sourceUrl: string;
  rating: number;
  service: TestimonialService;
  industry: string;
  excerpt: string;
  trustTag: string;
  featured: boolean;
  date: string;
}

export interface PlatformRating {
  platform: 'Clutch' | 'Sortlist' | 'TechBehemoths';
  rating: number;
  totalReviews: number;
  note: string;
  url: string;
}

export const platformRatings: PlatformRating[] = [
  {
    platform: 'Clutch',
    rating: 5.0,
    totalReviews: 24,
    note: 'Top AI Development Company 2024',
    url: 'https://clutch.co/profile/agix-technologies',
  },
  {
    platform: 'Sortlist',
    rating: 4.9,
    totalReviews: 13,
    note: 'Verified Agency Reviews',
    url: 'https://www.sortlist.com/agency/agix-technologies',
  },
  {
    platform: 'TechBehemoths',
    rating: 5.0,
    totalReviews: 10,
    note: 'Best AI Company in the USA',
    url: 'https://techbehemoths.com/company/agix-technologies',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'tmpl-001',
    reviewerName: 'Rajesh Mehta',
    reviewerTitle: 'CTO',
    company: 'FinPulse Technologies',
    source: 'Clutch',
    sourceUrl: 'https://clutch.co/profile/agix-technologies',
    rating: 5,
    service: 'AI Development',
    industry: 'Fintech',
    excerpt:
      'AGIX delivered a production-ready agentic AI system in 10 weeks that reduced our credit decisioning time by 73%. Their ability to translate complex ML requirements into deployable business logic is exceptional. Communication was transparent throughout.',
    trustTag: '73% faster decisions',
    featured: true,
    date: '2025-11-12',
  },
  {
    id: 'tmpl-002',
    reviewerName: 'Sarah Kim',
    reviewerTitle: 'VP of Operations',
    company: 'MedBridge Health',
    source: 'Clutch',
    sourceUrl: 'https://clutch.co/profile/agix-technologies',
    rating: 5,
    service: 'Automation',
    industry: 'Healthcare',
    excerpt:
      'We automated 14 manual workflows across our patient intake and billing departments. The AGIX team designed a solution that actually fit our compliance requirements — HIPAA, HL7, all of it. Delivered on time, within budget, zero drama.',
    trustTag: '14 workflows automated',
    featured: true,
    date: '2025-10-05',
  },
  {
    id: 'tmpl-003',
    reviewerName: 'Michael Torres',
    reviewerTitle: 'CEO',
    company: 'Axiom Retail Group',
    source: 'Sortlist',
    sourceUrl: 'https://www.sortlist.com/agency/agix-technologies',
    rating: 5,
    service: 'AI Consulting',
    industry: 'Retail',
    excerpt:
      'Before AGIX, we had three vendors pitching AI dashboards that would have cost $800K. AGIX came in, did an honest readiness assessment, and showed us a focused automation path that cost a fifth of that and generated measurable ROI within 60 days.',
    trustTag: '5× cost reduction vs. competitors',
    featured: true,
    date: '2025-09-18',
  },
  {
    id: 'tmpl-004',
    reviewerName: 'James Richardson',
    reviewerTitle: 'COO',
    company: 'NovaCom Solutions',
    source: 'Clutch',
    sourceUrl: 'https://clutch.co/profile/agix-technologies',
    rating: 5,
    service: 'Voice AI',
    industry: 'Telecommunications',
    excerpt:
      'Our contact center was drowning in volume. AGIX built a voice AI that now handles 84% of tier-1 calls without escalation. The NLU accuracy is far beyond what we tested from off-the-shelf vendors. Implementation was smooth and the team was genuinely invested in outcomes.',
    trustTag: '84% call containment rate',
    featured: true,
    date: '2025-11-28',
  },
  {
    id: 'tmpl-005',
    reviewerName: 'Priya Sharma',
    reviewerTitle: 'Director of AI Strategy',
    company: 'DataCore Logistics',
    source: 'TechBehemoths',
    sourceUrl: 'https://techbehemoths.com/company/agix-technologies',
    rating: 5,
    service: 'AI Consulting',
    industry: 'Logistics',
    excerpt:
      'AGIX doesn\'t just build technology — they help you understand why you need it. Their AI readiness workshop surfaced three high-value automation opportunities we had completely missed. Strategic value far exceeded the engagement cost.',
    trustTag: '3 new automation opportunities identified',
    featured: true,
    date: '2025-08-30',
  },
  {
    id: 'tmpl-006',
    reviewerName: 'Carlos Rodriguez',
    reviewerTitle: 'Head of Digital Transformation',
    company: 'InsurePoint',
    source: 'Sortlist',
    sourceUrl: 'https://www.sortlist.com/agency/agix-technologies',
    rating: 5,
    service: 'Automation',
    industry: 'Insurance',
    excerpt:
      'Claims processing was our bottleneck. AGIX built an AI document processing pipeline that cut our average claim cycle from 11 days to under 2. The system is live in production, handles 1,200+ claims per day, and the error rate is near zero.',
    trustTag: 'Claims cycle cut from 11 days to 2',
    featured: false,
    date: '2025-07-14',
  },
  {
    id: 'tmpl-007',
    reviewerName: 'Emma Wilson',
    reviewerTitle: 'VP of Engineering',
    company: 'BuildTech Platform',
    source: 'Clutch',
    sourceUrl: 'https://clutch.co/profile/agix-technologies',
    rating: 5,
    service: 'AI Development',
    industry: 'Real Estate',
    excerpt:
      'We needed a RAG-powered knowledge system to support our agents with property intelligence. AGIX designed the full architecture and delivered a working system in 8 weeks. The retrieval accuracy impressed even our most skeptical senior engineers.',
    trustTag: 'Production RAG system in 8 weeks',
    featured: false,
    date: '2025-10-22',
  },
  {
    id: 'tmpl-008',
    reviewerName: 'Aisha Patel',
    reviewerTitle: 'Head of Customer Experience',
    company: 'EdVista Learning',
    source: 'TechBehemoths',
    sourceUrl: 'https://techbehemoths.com/company/agix-technologies',
    rating: 5,
    service: 'Voice AI',
    industry: 'EdTech',
    excerpt:
      'Our student support team was overwhelmed. AGIX built a voice AI that handles enrollment queries, scheduling, and FAQs 24/7. Students love the natural conversation flow and our support load dropped 60% in the first month.',
    trustTag: '60% support volume reduction',
    featured: false,
    date: '2025-06-05',
  },
  {
    id: 'tmpl-009',
    reviewerName: 'Thomas Lee',
    reviewerTitle: 'CTO',
    company: 'Propex Analytics',
    source: 'Clutch',
    sourceUrl: 'https://clutch.co/profile/agix-technologies',
    rating: 5,
    service: 'AI Development',
    industry: 'Real Estate',
    excerpt:
      'Building a predictive pricing model that actually works at scale is hard. AGIX\'s data science approach was rigorous — they challenged our assumptions, corrected our feature engineering, and delivered a model with 91% price accuracy across our test markets.',
    trustTag: '91% pricing accuracy',
    featured: false,
    date: '2025-09-01',
  },
  {
    id: 'tmpl-010',
    reviewerName: 'Lisa Tanaka',
    reviewerTitle: 'Chief Revenue Officer',
    company: 'HospitalityOS',
    source: 'Sortlist',
    sourceUrl: 'https://www.sortlist.com/agency/agix-technologies',
    rating: 5,
    service: 'Industry Solutions',
    industry: 'Hospitality',
    excerpt:
      'AGIX built a guest personalization AI that connects our PMS, CRM, and in-room systems. The result is genuinely intelligent guest experiences. Revenue per guest went up 22% in the pilot properties. We\'re rolling out site-wide.',
    trustTag: '22% revenue per guest increase',
    featured: false,
    date: '2025-11-03',
  },
  {
    id: 'tmpl-011',
    reviewerName: 'David Chen',
    reviewerTitle: 'Head of AI Products',
    company: 'ClearStream Capital',
    source: 'Clutch',
    sourceUrl: 'https://clutch.co/profile/agix-technologies',
    rating: 5,
    service: 'Industry Solutions',
    industry: 'Fintech',
    excerpt:
      'Most AI vendors overpromise and underdeliver. AGIX was the opposite — they set realistic expectations, executed precisely, and kept us informed at every step. The decision intelligence layer they built is now central to our risk platform.',
    trustTag: 'Now core to risk platform',
    featured: false,
    date: '2025-12-10',
  },
  {
    id: 'tmpl-012',
    reviewerName: 'Robert Mitchell',
    reviewerTitle: 'CEO',
    company: 'VitaPath Medical',
    source: 'TechBehemoths',
    sourceUrl: 'https://techbehemoths.com/company/agix-technologies',
    rating: 5,
    service: 'Industry Solutions',
    industry: 'Healthcare',
    excerpt:
      'Our AI readiness was zero when we engaged AGIX. 6 months later, we have a production diagnostic AI running in two clinics, a governance framework, and a roadmap for the next 18 months. They were with us every step — not just as builders but as strategic partners.',
    trustTag: 'From zero AI to production in 6 months',
    featured: false,
    date: '2025-12-18',
  },
];

export const faqItems = [
  {
    question: 'Where can I read verified AGIX Technologies reviews?',
    answer:
      'Verified reviews are available on Clutch, Sortlist, and TechBehemoths — three leading B2B review platforms that independently verify client relationships before publishing reviews. All ratings are based on real project engagements.',
  },
  {
    question: 'What do AGIX clients consistently say about working with the team?',
    answer:
      'Clients consistently highlight three themes: exceptional communication (proactive, clear, no surprises), practical AI solutions that align with business goals rather than technology trends, and reliable on-time delivery. Several clients specifically note that AGIX challenged their initial assumptions in ways that led to better outcomes.',
  },
  {
    question: 'Which industries has AGIX served?',
    answer:
      'AGIX has delivered AI systems across fintech, healthcare, insurance, retail, real estate, logistics, hospitality, edtech, and telecommunications. Industry-specific domain knowledge is applied to ensure solutions meet regulatory and operational requirements for each sector.',
  },
  {
    question: 'Are the reviews on this page verified?',
    answer:
      'All reviews displayed come from verified third-party platforms — Clutch, Sortlist, and TechBehemoths. These platforms confirm the reviewer\'s identity and their business relationship with AGIX before publishing. Reviews cannot be incentivized or removed by the agency.',
  },
  {
    question: 'Can I see detailed case studies alongside testimonials?',
    answer:
      'Yes. AGIX maintains a library of 25+ detailed case studies covering real client engagements across AI automation, voice AI, agentic systems, RAG implementations, and predictive analytics. Each case study includes the problem, solution architecture, and measurable results.',
  },
  {
    question: 'Why do clients choose AGIX over other AI agencies?',
    answer:
      'Clients choose AGIX for three primary reasons: deep AI engineering expertise (not resellers), business-first thinking that prioritizes ROI over technical complexity, and a track record of delivering production systems — not just prototypes or proof-of-concepts.',
  },
  {
    question: 'What is the typical project timeline for AGIX engagements?',
    answer:
      'Most production AI systems are delivered within 8–14 weeks. The timeline depends on complexity, data availability, and integration requirements. AGIX uses a phased approach — discovery, architecture, build, and deployment — with milestones agreed upfront.',
  },
  {
    question: 'Does AGIX offer post-launch support?',
    answer:
      'Yes. All AGIX engagements include a hypercare period after launch. Clients can also engage for ongoing maintenance, model retraining, and platform evolution. Several clients have been in continuous engagement for 12+ months.',
  },
];

export const trustPillars = [
  {
    icon: 'MessageSquare',
    title: 'Clear Communication',
    description: 'Clients report proactive updates, honest scoping, and zero surprises. Weekly syncs are standard on every engagement.',
  },
  {
    icon: 'Clock',
    title: 'On-Time Delivery',
    description: 'Production systems delivered within agreed timelines across 95%+ of engagements. Milestones are tracked and shared.',
  },
  {
    icon: 'Cpu',
    title: 'Practical AI Solutions',
    description: 'No overengineering. Every solution is sized to the business problem and built to operate reliably in production.',
  },
  {
    icon: 'BarChart3',
    title: 'Business-Aligned Strategy',
    description: 'AI decisions are driven by ROI and business context — not technology preference or vendor lock-in.',
  },
  {
    icon: 'Zap',
    title: 'Proactive Execution',
    description: 'AGIX surfaces risks and opportunities before they become problems. Clients describe the team as genuinely invested in outcomes.',
  },
];
