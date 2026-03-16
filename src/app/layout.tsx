import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

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
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <Script id="analytics-bootstrap" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
          `}
        </Script>
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5V96B388');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rmhnee1y8o");
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
