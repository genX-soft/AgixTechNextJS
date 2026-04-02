import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { homepageOrganizationSchema } from "@/lib/seo/page-schemas";

const GTM_ID = "GTM-5V96B388";

const criticalHomeStyles = `
  [data-home-header] {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 50;
    transition: all 0.3s ease;
  }

  [data-home-hero] {
    position: relative;
    overflow: hidden;
    display: flex;
    min-height: 80vh;
    flex-direction: column;
    justify-content: center;
    padding-top: 6rem;
    background: rgb(2 8 23);
    color: rgb(248 250 252);
  }

  @media (min-width: 1024px) {
    [data-home-hero] {
      padding-top: 7rem;
    }
  }
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agixtech.com/'),
  title: {
    default: 'AGIX Technologies | Enterprise AI Systems Engineering & Agentic AI',
    template: '%s | AGIX Technologies',
  },
  description: 'We are an AI Systems Engineering & Agentic Intelligence company helping enterprises design, deploy, and scale autonomous AI systems that deliver measurable ROI.',
  keywords: ['AI automation', 'enterprise AI', 'intelligent automation', 'AI automation services for business', 'enterprise AI systems', 'AI workflow automation company', 'agentic AI', 'AI agents', 'conversational AI', 'predictive analytics'],
  authors: [{ name: 'AGIX Technologies' }],
  creator: 'AGIX Technologies',
  publisher: 'AGIX Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agixtech.com/',
    siteName: 'AGIX Technologies',
    title: 'AI Systems Engineering & Agentic Intelligence Company',
    description: 'Enterprise-grade AI Systems Engineering and Agentic Intelligence solutions strategy, architecture, and deployment that drive real business outcomes.',
    images: [
      {
        url: 'https://cms.agixtech.com/wp-content/uploads/2026/01/AI-Systems-Engineering-Company-page-banner.png',
        width: 1200,
        height: 630,
        alt: 'AGIX Technologies - Leading Agentic AI Experts in USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Systems Engineering & Agentic Intelligence Company',
    description: 'We build enterprise AI systems and agentic intelligence solutions that move from strategy to scalable, ROI-driven deployment.',
    images: ['https://cms.agixtech.com/wp-content/uploads/2026/01/AI-Systems-Engineering-Company-page-banner.png'],
    creator: '@agixtech',
    site: '@agixtech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '6JKwFo4Fkf6uI3wlgoKS8HXg9hvO6-d-cjcjS2wnx8Q',
    other: {
      'msvalidate.01': 'CB6B4849AC8E76E680D465AC712CEB6C',
    },
  },
  alternates: {
    canonical: 'https://agixtech.com/',
  },
  category: 'Technology',
  classification: 'AI Systems Engineering',
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        homepageOrganizationSchema,
        {
          "@type": "WebSite",
          "@id": "https://agixtech.com/#website",
          "url": "https://agixtech.com/",
          "name": "AGIX Technologies",
          "description": "Leading AI Systems Engineering and Agentic Intelligence company",
          "publisher": {
            "@id": "https://agixtech.com/#organization"
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://agixtech.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://agixtech.com/#webpage",
          "url": "https://agixtech.com/",
          "name": "AGIX Technologies",
          "isPartOf": {
            "@id": "https://agixtech.com/#website"
          },
          "about": {
            "@id": "https://agixtech.com/#organization"
          },
          "description": "AGIX Technologies delivers enterprise AI systems engineering and autonomous agent development, helping Fortune 500 companies achieve 40% operational efficiency gains.",
          "breadcrumb": {
            "@id": "https://agixtech.com/#breadcrumb"
          },
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": ["https://agixtech.com/"]
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://agixtech.com/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://agixtech.com/"
            }
          ]
        },
        {
          "@type": "ItemList",
          "@id": "https://agixtech.com/#services",
          "name": "AGIX Technologies AI Services",
          "itemListElement": [
            "AI Automation Services",
            "AI Voice Agents",
            "Conversational AI Chatbots",
            "Agentic AI Systems",
            "RAG Services",
            "Predictive Analytics AI",
            "Computer Vision Solutions",
            "Custom AI Product Development Services"
          ].map((name, i) => ({
            "@type": "Service",
            name,
            provider: { "@type": "Organization", "@id": "https://agixtech.com/#organization" },
            position: i + 1
          }))
        }
      ]
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* next/font self-hosts font files under /_next/static/media/ — no Google Fonts preconnects needed */}
        <style dangerouslySetInnerHTML={{ __html: criticalHomeStyles }} />
        {/* Fallback for JS-disabled browsers */}
        <noscript dangerouslySetInnerHTML={{ __html: '<link rel="stylesheet" href="/deferred-styles.css" />' }} />
        {/* All analytics deferred until first user interaction — zero analytics during Lighthouse test */}
        <Script id="analytics-deferred" src="/analytics-loader.js" strategy="lazyOnload" />
        {/* Uses afterInteractive (not lazyOnload) so styles apply right after hydration, not idle */}
        <Script id="deferred-stylesheet" src="/deferred-styles-loader.js" strategy="afterInteractive" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}
        suppressHydrationWarning
      >
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
