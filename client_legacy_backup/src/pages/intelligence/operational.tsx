import Head from "next/head";
import { OperationalIntelligenceView } from "../../components/intelligence/operational";

export default function OperationalIntelligencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://agixtech.com/#organization",
        "name": "AGIX Technologies",
        "url": "https://agixtech.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://agixtech.com/wp-content/uploads/agix-logo.png"
        },
        "description": "Agix Technologies is an AI Systems Engineering and Agentic Intelligence company helping enterprises architect, deploy, and scale autonomous AI systems for measurable business outcomes.",
        "foundingDate": "2024",
        "founders": [
          {
            "@type": "Person",
            "name": "Santosh Singh"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1 857-365-6167",
          "contactType": "customer support",
          "areaServed": "Worldwide",
          "availableLanguage": ["English"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "99 Derby Street",
          "addressLocality": "Hingham",
          "addressRegion": "MA",
          "postalCode": "02043",
          "addressCountry": "US"
        },
        "sameAs": [
          "https://www.linkedin.com/company/agixtech",
          "https://twitter.com/agixtech",
          "https://www.facebook.com/agixtech"
        ],
        "areaServed": "Worldwide",
        "foundingLocation": "Hingham, Massachusetts, United States",
        "knowsAbout": [
          "AI Systems Engineering",
          "Agentic Intelligence",
          "Autonomous AI Systems",
          "Enterprise AI Architecture",
          "AI Agents",
          "Multi-Agent Systems",
          "LLM Engineering",
          "AI Orchestration",
          "Responsible AI",
          "Scalable AI Infrastructure"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://agixtech.com/intelligence/operational-ai#webpage",
        "url": "https://agixtech.com/intelligence/operational-ai",
        "name": "Operational AI Solutions",
        "about": {
          "@type": "Service",
          "@id": "https://agixtech.com/intelligence/operational-ai#service"
        },
        "description": "Operational AI solutions that transform real-time operational data into intelligent, autonomous decisions for modern business operations."
      },
      {
        "@type": "Service",
        "@id": "https://agixtech.com/intelligence/operational-ai#service",
        "name": "Operational AI Solutions",
        "provider": {
          "@id": "https://agixtech.com/#organization"
        },
        "serviceType": "Operational AI Intelligence",
        "areaServed": "Worldwide",
        "description": "Operational AI solutions that combine real-time intelligence, AI-driven decision-making, and scalable systems to optimize business operations.",
        "audience": {
          "@type": "Audience",
          "audienceType": "Enterprises and Business Operations Teams"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://agixtech.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Operational Intelligence",
            "item": "https://www.agixtech.com//intelligence/operational-ai"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://agixtech.com/intelligence/operational-ai#ai-platform",
        "name": "Operational AI Intelligence Platform",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web-based",
        "description": "An operational AI intelligence platform providing interactive tools to assess AI readiness and recommend AI solutions for business use cases.",
        "hasPart": [
          {
            "@type": "SoftwareApplication",
            "@id": "https://agixtech.com/intelligence/operational-ai#tool-finder",
            "name": "AI Tool Recommendation Engine",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web-based",
            "description": "Analyzes business challenges and recommends the most suitable AI solutions for operational use cases."
          },
          {
            "@type": "SoftwareApplication",
            "@id": "https://agixtech.com/intelligence/operational-ai#ai-maturity-tool",
            "name": "AI Maturity Assessment",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web-based",
            "description": "Evaluates an organization's readiness for AI adoption across data, processes, technology, and governance."
          }
        ],
        "creator": {
          "@type": "Organization",
          "@id": "https://agixtech.com/#organization"
        },
        "isPartOf": {
          "@type": "WebPage",
          "@id": "https://agixtech.com/intelligence/operational-ai#webpage"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://agixtech.com/intelligence/operational-ai#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between Operational Intelligence and Business Intelligence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Business Intelligence focuses on historical data analysis and reporting to understand what happened. Operational Intelligence focuses on real-time monitoring and decision-making to respond to what's happening now. While BI helps you learn from the past, OI helps you act in the present."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to implement Operational Intelligence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Implementation timelines vary based on complexity. Observational Intelligence systems can be deployed in 6-8 weeks. Assistive systems typically take 8-12 weeks. Full Decision Intelligence with controlled autonomy may require 12-16 weeks. We start with quick wins and expand gradually."
            }
          },
          {
            "@type": "Question",
            "name": "Do we need to replace our existing systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Operational Intelligence integrates with your existing tools, databases, and workflows. We connect to your current systems through APIs and data feeds, adding an intelligence layer without disrupting what already works."
            }
          },
          {
            "@type": "Question",
            "name": "How does AI handle sensitive business decisions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our systems include human-in-the-loop controls for critical decisions. AI can recommend, draft, or prepare actions, but humans approve high-stakes decisions. Every AI decision is logged, traceable, and explainable."
            }
          },
          {
            "@type": "Question",
            "name": "What industries benefit most from Operational Intelligence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Any industry with complex operations benefits. Healthcare, finance, logistics, retail, manufacturing, and professional services see significant improvements. The key factor is having repeatable processes with decision points that can be optimized."
            }
          },
          {
            "@type": "Question",
            "name": "How is this different from simple automation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Automation executes predefined rules. Operational Intelligence observes, understands context, and decides. It can handle exceptions, prioritize dynamically, and improve over time. Automation is a subset of what OI can orchestrate."
            }
          },
          {
            "@type": "Question",
            "name": "What kind of ROI can we expect from Operational Intelligence?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most organizations see 30-50% reduction in operational delays, 40-60% faster decision cycles, and 20-35% cost savings within the first year. ROI depends on your current operational maturity and the complexity of processes being optimized."
            }
          },
          {
            "@type": "Question",
            "name": "How does Operational Intelligence handle data security and privacy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We implement enterprise-grade security including end-to-end encryption, role-based access controls, and compliance with GDPR, HIPAA, and SOC 2 standards. Data can be processed on-premise or in secure cloud environments based on your requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Can Operational Intelligence work with legacy systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our integration approach supports legacy systems through APIs, database connections, file-based integrations, and screen scraping when necessary. We've successfully integrated with systems dating back decades."
            }
          },
          {
            "@type": "Question",
            "name": "What happens when the AI makes a wrong decision?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every AI decision includes confidence scores and reasoning. Low-confidence decisions are flagged for human review. All decisions are logged with full audit trails, allowing you to identify issues, retrain models, and continuously improve accuracy."
            }
          },
          {
            "@type": "Question",
            "name": "How do you measure the success of an OI implementation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We establish baseline metrics before implementation, then track KPIs including decision speed, error rates, escalation frequency, cost per transaction, and employee satisfaction. Monthly reviews ensure continuous alignment with business goals."
            }
          },
          {
            "@type": "Question",
            "name": "What level of technical expertise does our team need?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No coding or technical expertise required for day-to-day operations. We provide intuitive dashboards and interfaces. Your team will receive training on system oversight, while AGIX handles all technical maintenance and updates."
            }
          },
          {
            "@type": "Question",
            "name": "Can we start small and scale up later?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We recommend starting with a single department or process as a pilot. This approach validates the value quickly, builds internal confidence, and creates a foundation for broader deployment across the organization."
            }
          },
          {
            "@type": "Question",
            "name": "How does Operational Intelligence improve over time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The system continuously learns from outcomes, user feedback, and changing patterns. Machine learning models are retrained regularly. As your business evolves, the intelligence layer adapts to new processes, exceptions, and requirements."
            }
          },
          {
            "@type": "Question",
            "name": "What support and maintenance is included?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All implementations include 24/7 monitoring, regular system health checks, proactive optimization recommendations, and dedicated support. We provide quarterly business reviews to ensure the system continues meeting your evolving needs."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Operational AI Solutions | AGIX Technologies</title>
        <meta 
          name="description" 
          content="Operational AI solutions that transform real-time operational data into intelligent, autonomous decisions for modern business operations." 
        />
        <link rel="canonical" href="https://agixtech.com/intelligence/operational-ai" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Operational AI Solutions | AGIX Technologies" />
        <meta property="og:description" content="Transform real-time operational data into intelligent, autonomous decisions for modern business operations." />
        <meta property="og:url" content="https://agixtech.com/intelligence/operational-ai" />
        <meta property="og:site_name" content="AGIX Technologies" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://agixtech.com/wp-content/uploads/agix-logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AGIX Operational Intelligence" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Operational AI Solutions | AGIX Technologies" />
        <meta name="twitter:description" content="Transform real-time operational data into intelligent, autonomous decisions." />
        <meta name="twitter:image" content="https://agixtech.com/wp-content/uploads/agix-logo.png" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <OperationalIntelligenceView />
    </>
  );
}