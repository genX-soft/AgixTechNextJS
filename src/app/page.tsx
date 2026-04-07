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

export default function Home() {
  return (
    <>
      <MainHeader />
      <HeroSection />
      <ValuePropositionSection />
      <ServicesSection />
      <IntelligenceSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <ContactSection />
      <MainFooter />
    </>
  );
}
