'use client'
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { servicesData } from "@/lib/services-data";

export default function AIPredictiveAnalyticsPage() {
  return <ServicePageTemplate data={servicesData["ai-predictive-analytics"]} />;
}
