import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

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
    padding-top: 5.5rem;
    background: rgb(2 8 23);
    color: rgb(248 250 252);
  }

  @media (min-width: 1024px) {
    [data-home-hero] {
      padding-top: 6.5rem;
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
    default: 'Agentic AI Systems That Cut Ops Cost 40% | AGIX Technologies',
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
    title: 'AGIX Technologies | AI Systems Engineering & AI Agents',
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
    title: 'AGIX Technologies | AI Systems Engineering & AI Agents',
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
    types: {
      'text/plain': '/llms.txt',
    },
  },
  category: 'Technology',
  classification: 'AI Systems Engineering',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}
        suppressHydrationWarning
      >
        {/* Critical above-the-fold styles inlined to avoid FOUC */}
        <style dangerouslySetInnerHTML={{ __html: criticalHomeStyles }} />
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        <Providers>{children}</Providers>
        {/* Fallback for JS-disabled browsers */}
        <noscript dangerouslySetInnerHTML={{ __html: '<link rel="stylesheet" href="/deferred-styles.css" />' }} />
        {/* All analytics deferred until first user interaction — zero analytics during Lighthouse test */}
        <Script id="analytics-deferred" src="/analytics-loader.js" strategy="lazyOnload" />
        {/* Uses afterInteractive (not lazyOnload) so styles apply right after hydration, not idle */}
        <Script id="deferred-stylesheet" src="/deferred-styles-loader.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
