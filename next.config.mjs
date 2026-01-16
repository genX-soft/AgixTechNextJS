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
      // Case study redirects - old short URLs to new long-form URLs
      { source: '/case-studies/enova', destination: '/case-study/enova-ai-powered-credit-decisioning-for-smarter-more-inclusive-lending/', permanent: true },
      { source: '/case-studies/dave', destination: '/case-study/dave-generative-ai-assistant-for-smart-human-like-financial-support/', permanent: true },
      { source: '/case-studies/ocrolus', destination: '/case-study/ocrolus-ai-document-intelligence-engine-for-automated-fintech-workflows/', permanent: true },
      { source: '/case-studies/babylon-health', destination: '/case-study/babylon-health-ai-powered-patient-intake-routing-for-smarter-hospital/', permanent: true },
      { source: '/case-studies/kite-therapy', destination: '/case-study/kite-therapy-ai-matchmaking-engine-for-pediatric-allied-health-services/', permanent: true },
      { source: '/case-studies/hello-driven', destination: '/case-study/hello-driven-ai-powered-mental-resilience-coach-for-scalable-emotional-wellbeing/', permanent: true },
      { source: '/case-studies/albertsons', destination: '/case-study/albertsons-ai-driven-consumer-behavior-analytics-predictive-restocking/', permanent: true },
      { source: '/case-studies/kroger', destination: '/case-study/kroger-predictive-ai-engine-for-smart-reordering-cart-automation/', permanent: true },
      { source: '/case-studies/stitch-fix', destination: '/case-study/stitch-fix-ai-stylist-engine-for-hyper-personalized-shopping/', permanent: true },
      { source: '/case-studies/ulta-beauty', destination: '/case-study/ulta-beauty-predictive-ai-engine-for-personalized-marketing-loyalty-engagement/', permanent: true },
      { source: '/case-studies/quizlet', destination: '/case-study/quizlet-ai-powered-study-engine-for-personalized-predictive-learning/', permanent: true },
      { source: '/case-studies/knewton', destination: '/case-study/knewton-real-time-adaptive-learning-powered-by-ai-feedback-loops/', permanent: true },
      { source: '/case-studies/riiid-labs', destination: '/case-study/riiid-labs-adaptive-ai-engine-for-personalized-learning-and-test-mastery/', permanent: true },
      { source: '/case-studies/hilton-hotels', destination: '/case-study/hilton-hotels-enterprise-ai-for-end-to-end-guest-personalization/', permanent: true },
      { source: '/case-studies/housecanary', destination: '/case-study/housecanary-ai-platform-for-real-time-real-estate-valuation-market/', permanent: true },
      { source: '/case-studies/mindtrip', destination: '/case-study/mindtrip-ai-conversational-ai-for-effortless-travel-ideation-and-planning/', permanent: true },
      { source: '/case-studies/polyai', destination: '/case-study/polyai-multilingual-voice-ai-assistant-for-scalable-human-like-customer-service/', permanent: true },
      { source: '/case-studies/brainfish', destination: '/case-study/brainfish-scalable-ai-chatbot-for-domain-specific-high-speed-customer-support/', permanent: true },
      { source: '/case-studies/properti-ai', destination: '/case-study/properti-ai-chatbot-for-personalized-always-on-property-discovery/', permanent: true },
      { source: '/case-studies/dartmouth-college', destination: '/case-study/dartmouth-college-24-7-ai-helpdesk-assistant-for-campus-wide-it-support/', permanent: true },
      { source: '/case-studies/suno', destination: '/case-study/suno-text-to-music-ai-engine-for-instant-audio-composition/', permanent: true },
      { source: '/case-studies/innit', destination: '/case-study/innit-ai-sous-chef-for-personalized-cooking-guidance-pantry-intelligence/', permanent: true },
      { source: '/case-studies/hungryroot', destination: '/case-study/hungryroot-ai-driven-meal-planning-grocery-customization-platform/', permanent: true },
      { source: '/case-studies/navan', destination: '/case-study/navan-ai-assistant-for-seamless-business-travel-smart-expense-management/', permanent: true },
      { source: '/case-studies/geovea', destination: '/case-study/geovea-dynamic-ai-assistant-for-tailored-travel-itineraries/', permanent: true },
      { source: '/case-studies/luxury-escapes', destination: '/case-study/luxury-escapes-concierge-grade-ai-chatbot-for-premium-travel-experiences/', permanent: true },
      { source: '/case-studies/naratix', destination: '/case-study/naratix-intelligent-ai-agents-for-global-multilingual-e-commerce-content/', permanent: true },
      { source: '/case-studies/alphasense', destination: '/case-study/alphasense-real-time-ai-engine-for-market-intelligence-research-automation/', permanent: true },
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
