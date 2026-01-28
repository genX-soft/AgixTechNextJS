import type { Metadata } from 'next'

const SITE_URL = 'https://agixtech.com';

export const metadata: Metadata = {
  title: 'AI Insights & Articles | AGIX Technologies',
  description: 'Expert insights on AI automation, enterprise AI solutions, and digital transformation strategies from AGIX Technologies.',
  alternates: {
    canonical: `${SITE_URL}/insights/`,
  },
  openGraph: {
    title: 'AI Insights & Articles | AGIX Technologies',
    description: 'Expert insights on AI automation, enterprise AI solutions, and digital transformation strategies from AGIX Technologies.',
    url: `${SITE_URL}/insights/`,
    siteName: 'AGIX Technologies',
    type: 'website',
    images: [{ url: 'https://cms.agixtech.com/wp-content/uploads/2026/01/AI-Systems-Engineering-Company-page-banner.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Insights & Articles | AGIX Technologies',
    description: 'Expert insights on AI automation, enterprise AI solutions, and digital transformation strategies from AGIX Technologies.',
    images: ['https://cms.agixtech.com/wp-content/uploads/2026/01/AI-Systems-Engineering-Company-page-banner.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
