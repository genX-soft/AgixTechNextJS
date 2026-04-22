import { MainHeader } from "@/components/main-header";
import { HeroSection } from "@/components/home/hero-section";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import DidYouKnowBanner from "@/components/home/DidYouKnowBanner";
import ServicesSection from "@/components/home/SolutionsSection";
import IntelligenceSection from "@/components/home/IntelligenceSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import { ContactSection } from "@/components/home/contact-section";
import { MainFooter } from "@/components/main-footer";
import FAQSection from "@/components/shared/FAQSection";
import { documentFAQs } from "@/lib/seo/faq-data";
import Schema from "@/components/Schema";

export default function Home() {
  return (
    <>
      <Schema type="home" />
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
      <DidYouKnowBanner />
    </>
  );
}
