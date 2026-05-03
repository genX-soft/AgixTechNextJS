'use client'
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { servicesData } from "@/lib/services-data";

export default function AIAutomationPage() {
  return <ServicePageTemplate data={servicesData["ai-automation"]} />;
}
