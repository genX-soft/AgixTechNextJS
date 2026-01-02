import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://agix.ai'),
  title: {
    default: 'AGIX Technologies - AI & Intelligent Automation Solutions',
    template: '%s | AGIX Technologies',
  },
  description: 'Transform your business with enterprise AI automation. AGIX delivers intelligent automation, agentic AI systems, voice agents, and custom AI solutions.',
  keywords: ['AI automation', 'enterprise AI', 'intelligent automation', 'AI automation services for business', 'enterprise AI systems', 'AI workflow automation company'],
  authors: [{ name: 'AGIX Technologies' }],
  creator: 'AGIX Technologies',
  publisher: 'AGIX Technologies',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agix.ai',
    siteName: 'AGIX Technologies',
    title: 'AGIX Technologies - AI & Intelligent Automation Solutions',
    description: 'Transform your business with enterprise AI automation. AGIX delivers intelligent automation, agentic AI systems, voice agents, and custom AI solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AGIX Technologies - Leading Agentic AI Experts in USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGIX Technologies - AI & Intelligent Automation Solutions',
    description: 'Transform your business with enterprise AI automation. AGIX delivers intelligent automation, agentic AI systems, voice agents, and custom AI solutions.',
    images: ['/og-image.png'],
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
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
