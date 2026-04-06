import dynamic from "next/dynamic";
import { MainHeader } from "@/components/main-header";
import { LazyMount } from "@/components/lazy-mount";
import { HeroSection } from "@/components/home/hero-section";
import ValuePropositionSection from "@/components/home/ValuePropositionSection";
import OurServicesSection from "@/components/home/OurServicesSection";

const DynamicGuidedAssessment = dynamic(
  () => import("@/components/home/GuidedAssessment")
);

const DynamicContactSection = dynamic(
  () => import("@/components/home/contact-section").then((m) => ({ default: m.ContactSection }))
);

const DynamicTestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection")
);

const DynamicCaseStudiesSection = dynamic(
  () => import("@/components/home/CaseStudiesSection")
);

const DynamicIntelligenceSection = dynamic(
  () => import("@/components/home/IntelligenceSection")
);

const DynamicServicesSection = dynamic(
  () => import("@/components/home/SolutionsSection")
);

const DynamicIndustriesSection = dynamic(
  () => import("@/components/home/IndustriesSection")
);

const DynamicMainFooter = dynamic(
  () => import("@/components/main-footer").then((m) => ({ default: m.MainFooter }))
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main>
        <HeroSection />
        <ValuePropositionSection />
        {/* <OurServicesSection /> */}
        <LazyMount fallbackHeight="700px">
          <DynamicGuidedAssessment />
        </LazyMount>
        <LazyMount fallbackHeight="600px">
          <DynamicIntelligenceSection />
        </LazyMount>
        <LazyMount fallbackHeight="800px">
          <DynamicServicesSection />
        </LazyMount>
        <LazyMount fallbackHeight="600px">
          <DynamicIndustriesSection />
        </LazyMount>
        <LazyMount fallbackHeight="500px">
          <DynamicTestimonialsSection />
        </LazyMount>
        <LazyMount fallbackHeight="800px">
          <DynamicCaseStudiesSection />
        </LazyMount>
        <LazyMount fallbackHeight="600px">
          <DynamicContactSection />
        </LazyMount>
      </main>
      <LazyMount fallbackHeight="400px">
        <DynamicMainFooter />
      </LazyMount>
    </div>
  );
}
