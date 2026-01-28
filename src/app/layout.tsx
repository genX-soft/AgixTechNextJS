import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { homepageOrganizationSchema } from "@/lib/seo/page-schemas";

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
    default: 'AI Systems Engineering & Agentic Intelligence Company | Agix Technologies',
    template: '%s | AGIX Technologies',
  },
  description: 'AI Systems Engineering & Agentic Intelligence company helping enterprises design, deploy, and scale autonomous AI systems that deliver measurable ROI.',
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agixtech.com/',
    siteName: 'AGIX Technologies',
    title: 'Enterprise AI Systems Engineering & Agentic Intelligence | Agix Technologies',
    description: 'Enterprise-grade AI Systems Engineering and Agentic Intelligence solutions spanning strategy, architecture, and deployment that drive real business outcomes.',
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
    title: 'AI Systems Engineering & Agentic Intelligence Company | Agix Technologies',
    description: 'We build enterprise AI systems and agentic intelligence solutions that move from strategy and system design to scalable, production-grade, ROI-driven deployment.',
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
          "name": "AI Systems Engineering & Agentic Intelligence Company | Agix Technologies",
          "isPartOf": {
            "@id": "https://agixtech.com/#website"
          },
          "about": {
            "@id": "https://agixtech.com/#organization"
          },
          "description": "Enterprise AI Systems Engineering and Agentic Intelligence solutions for measurable business outcomes.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EX4YPE6XR5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EX4YPE6XR5');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5V96B388');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5V96B388"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
