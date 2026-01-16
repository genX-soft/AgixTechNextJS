/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      // Case study redirects - long-form URLs to canonical short URLs
      { source: '/case-study/enova-ai-powered-credit-decisioning-for-smarter-more-inclusive-lending', destination: '/case-studies/enova/', permanent: true },
      { source: '/case-study/dave-generative-ai-assistant-for-smart-human-like-financial-support', destination: '/case-studies/dave/', permanent: true },
      { source: '/case-study/ocrolus-ai-document-intelligence-engine-for-automated-fintech-workflows', destination: '/case-studies/ocrolus/', permanent: true },
      { source: '/case-study/babylon-health-ai-powered-patient-intake-routing-for-smarter-hospital', destination: '/case-studies/babylon-health/', permanent: true },
      { source: '/case-study/kite-therapy-ai-matchmaking-engine-for-pediatric-allied-health-services', destination: '/case-studies/kite-therapy/', permanent: true },
      { source: '/case-study/hello-driven-ai-powered-mental-resilience-coach-for-scalable-emotional-wellbeing', destination: '/case-studies/hello-driven/', permanent: true },
      { source: '/case-study/albertsons-ai-driven-consumer-behavior-analytics-predictive-restocking', destination: '/case-studies/albertsons/', permanent: true },
      { source: '/case-study/kroger-predictive-ai-engine-for-smart-reordering-cart-automation', destination: '/case-studies/kroger/', permanent: true },
      { source: '/case-study/stitch-fix-ai-stylist-engine-for-hyper-personalized-shopping', destination: '/case-studies/stitch-fix/', permanent: true },
      { source: '/case-study/ulta-beauty-predictive-ai-engine-for-personalized-marketing-loyalty-engagement', destination: '/case-studies/ulta-beauty/', permanent: true },
      { source: '/case-study/quizlet-ai-powered-study-engine-for-personalized-predictive-learning', destination: '/case-studies/quizlet/', permanent: true },
      { source: '/case-study/knewton-real-time-adaptive-learning-powered-by-ai-feedback-loops', destination: '/case-studies/knewton/', permanent: true },
      { source: '/case-study/riiid-labs-adaptive-ai-engine-for-personalized-learning-and-test-mastery', destination: '/case-studies/riiid-labs/', permanent: true },
      { source: '/case-study/hilton-hotels-enterprise-ai-for-end-to-end-guest-personalization', destination: '/case-studies/hilton-hotels/', permanent: true },
      { source: '/case-study/housecanary-ai-platform-for-real-time-real-estate-valuation-market', destination: '/case-studies/housecanary/', permanent: true },
      { source: '/case-study/mindtrip-ai-conversational-ai-for-effortless-travel-ideation-and-planning', destination: '/case-studies/mindtrip/', permanent: true },
      { source: '/case-study/polyai-multilingual-voice-ai-assistant-for-scalable-human-like-customer-service', destination: '/case-studies/polyai/', permanent: true },
      { source: '/case-study/brainfish-scalable-ai-chatbot-for-domain-specific-high-speed-customer-support', destination: '/case-studies/brainfish/', permanent: true },
      { source: '/case-study/properti-ai-chatbot-for-personalized-always-on-property-discovery', destination: '/case-studies/properti-ai/', permanent: true },
      { source: '/case-study/dartmouth-college-24-7-ai-helpdesk-assistant-for-campus-wide-it-support', destination: '/case-studies/dartmouth-college/', permanent: true },
      { source: '/case-study/suno-text-to-music-ai-engine-for-instant-audio-composition', destination: '/case-studies/suno/', permanent: true },
      { source: '/case-study/innit-ai-sous-chef-for-personalized-cooking-guidance-pantry-intelligence', destination: '/case-studies/innit/', permanent: true },
      { source: '/case-study/hungryroot-ai-driven-meal-planning-grocery-customization-platform', destination: '/case-studies/hungryroot/', permanent: true },
      { source: '/case-study/navan-ai-assistant-for-seamless-business-travel-smart-expense-management', destination: '/case-studies/navan/', permanent: true },
      { source: '/case-study/geovea-dynamic-ai-assistant-for-tailored-travel-itineraries', destination: '/case-studies/geovea/', permanent: true },
      { source: '/case-study/luxury-escapes-concierge-grade-ai-chatbot-for-premium-travel-experiences', destination: '/case-studies/luxury-escapes/', permanent: true },
      { source: '/case-study/naratix-intelligent-ai-agents-for-global-multilingual-e-commerce-content', destination: '/case-studies/naratix/', permanent: true },
      { source: '/case-study/alphasense-real-time-ai-engine-for-market-intelligence-research-automation', destination: '/case-studies/alphasense/', permanent: true },
      // Redirect /insights/{slug} to /{slug} for blog posts
      { source: '/insights/:slug', destination: '/:slug/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

export default nextConfig
