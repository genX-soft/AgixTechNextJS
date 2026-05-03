'use client'
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { servicesData } from "@/lib/services-data";

export default function CustomAIProductPage() {
  return <ServicePageTemplate data={servicesData["custom-ai-product-development"]} />;
}
