import { MainHeader } from "@/components/main-header";
import { HeroSection } from "@/components/home/hero-section";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import ServicesSection from "@/components/home/SolutionsSection";
import IntelligenceSection from "@/components/home/IntelligenceSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import { ContactSection } from "@/components/home/contact-section";
import { MainFooter } from "@/components/main-footer";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs, generateFAQPageSchema } from "@/lib/seo/faq-data";
import { homepageOrganizationSchema } from "@/lib/seo/page-schemas";
import { generateWebSiteSchema } from "@/lib/seo/structured-data";

const { "@context": _orgCtx, ...organizationSchema } = homepageOrganizationSchema;

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    generateWebSiteSchema(),
    (() => {
      const { "@context": _faqCtx, ...faqSchema } = generateFAQPageSchema(documentFAQs['home']);
      return faqSchema;
    })(),
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <MainHeader />
      <HeroSection />
      <ValuePropositionSection />
      <ServicesSection />
      <IntelligenceSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <ContactSection />
      <FAQSection
        faqs={documentFAQs['home']}
        title="AGIX Technologies — AI Questions Answered"
        subtitle="Everything you need to know about our AI systems, services, and approach."
      />
      <MainFooter />
    </>
  );
}
