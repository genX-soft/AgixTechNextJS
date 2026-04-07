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

export default function Home() {
  const faqSchema = generateFAQPageSchema(documentFAQs['home']);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
