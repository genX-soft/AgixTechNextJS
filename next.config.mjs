/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "r7t.66a.myftpupload.com",
      },
      {
        protocol: 'https',
        hostname: 'agixtech.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.agixtech.com',
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
    const redirectList = [
      // ===== INTELLIGENCE PAGE REDIRECTS =====
      { source: '/intelligence/operational', destination: '/intelligence/operational-ai/', permanent: true },
      { source: '/intelligence/conversational', destination: '/intelligence/conversational-ai/', permanent: true },
      { source: '/intelligence/decision', destination: '/intelligence/decision-ai/', permanent: true },
      { source: '/intelligence/agentic', destination: '/intelligence/autonomous-agentic-ai/', permanent: true },
      { source: '/intelligence/enterprise-knowledge', destination: '/intelligence/enterprise-knowledge-ai/', permanent: true },
      
      // ===== SERVICE PAGE REDIRECTS =====
      { source: '/services/voice-agents', destination: '/services/ai-voice-agents/', permanent: true },
      { source: '/services/chatbots', destination: '/services/conversational-ai-chatbots/', permanent: true },
      { source: '/services/rag-knowledge', destination: '/services/rag-knowledge-ai/', permanent: true },
      { source: '/services/predictive-analytics', destination: '/services/ai-predictive-analytics/', permanent: true },
      { source: '/services/computer-vision', destination: '/services/ai-computer-vision/', permanent: true },
      { source: '/services/custom-ai-product', destination: '/services/custom-ai-product-development/', permanent: true },
      
      // ===== INDUSTRY PAGE REDIRECTS =====
      { source: '/industries/healthcare', destination: '/industries/healthcare-ai-solutions/', permanent: true },
      { source: '/industries/real-estate', destination: '/industries/real-estate-ai-solutions/', permanent: true },
      { source: '/industries/fintech', destination: '/industries/fintech-ai-solutions/', permanent: true },
      { source: '/industries/insurance', destination: '/industries/insurance-ai-solutions/', permanent: true },
      { source: '/industries/retail', destination: '/industries/retail-ai-solutions/', permanent: true },
      { source: '/industries/logistics', destination: '/industries/logistics-ai-solutions/', permanent: true },
      { source: '/industries/hospitality', destination: '/industries/hospitality-ai-solutions/', permanent: true },
      { source: '/industries/edtech', destination: '/industries/edtech-ai-solutions/', permanent: true },
      
      // ===== OLD /industry/ PATH REDIRECTS =====
      { source: '/industry/ai-in-healthcare', destination: '/industries/healthcare-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-hospitals', destination: '/industries/healthcare-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-pharmaceuticals', destination: '/industries/healthcare-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-fintech', destination: '/industries/fintech-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-insurance-tech', destination: '/industries/insurance-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-retail-e-commerce', destination: '/industries/retail-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-supply-chain', destination: '/industries/logistics-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-hospitality-travel', destination: '/industries/hospitality-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-edtech', destination: '/industries/edtech-ai-solutions/', permanent: true },
      { source: '/industry/ai-in-education-institutions', destination: '/industries/edtech-ai-solutions/', permanent: true },
      
      // ===== OLD /service/ PATH REDIRECTS =====
      { source: '/service/workflow-optimization-services', destination: '/services/ai-automation/', permanent: true },
      { source: '/service/ai-automation-services', destination: '/services/ai-automation/', permanent: true },
      { source: '/service/custom-ai-agent-development', destination: '/services/agentic-ai-systems/', permanent: true },
      { source: '/service/retrieval-augmented-generation', destination: '/services/rag-knowledge-ai/', permanent: true },
      { source: '/service/predictive-analytics-development', destination: '/services/ai-predictive-analytics/', permanent: true },
      { source: '/service/computer-vision-solutions', destination: '/services/ai-computer-vision/', permanent: true },
      { source: '/service/saas-product-development', destination: '/services/custom-ai-product-development/', permanent: true },
      { source: '/service/mvp-prototyping', destination: '/services/custom-ai-product-development/', permanent: true },
      { source: '/service/api-development-integration-services', destination: '/services/custom-ai-product-development/', permanent: true },
      { source: '/service/ai-consulting-services', destination: '/intelligence/operational-ai/', permanent: true },
      
      // ===== CORPORATE PAGE REDIRECTS =====
      { source: '/portfolio', destination: '/case-studies/', permanent: true },
      { source: '/terms-and-condition', destination: '/terms-of-service/', permanent: true },
      { source: '/career', destination: '/corporate/careers/', permanent: true },
      { source: '/about-us', destination: '/corporate/about/', permanent: true },
      { source: '/contact-us', destination: '/corporate/contact/', permanent: true },
      
      // ===== CASE STUDY REDIRECTS (long-form to short URLs) =====
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
    ];
    
    // Generate both trailing slash and non-trailing slash versions for each redirect
    // to handle trailingSlash: true configuration properly
    const expandedRedirects = [];
    for (const redirect of redirectList) {
      // Add original redirect (without trailing slash on source)
      expandedRedirects.push(redirect);
      
      // Add trailing slash version of source (if not already present)
      if (!redirect.source.endsWith('/')) {
        expandedRedirects.push({
          source: redirect.source + '/',
          destination: redirect.destination,
          permanent: redirect.permanent,
        });
      }
    }
    
    return expandedRedirects;
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
