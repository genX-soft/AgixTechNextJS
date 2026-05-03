'use client'
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { servicesData } from "@/lib/services-data";

export default function AgenticAIPage() {
  return <ServicePageTemplate data={servicesData["agentic-ai-systems"]} />;
}
