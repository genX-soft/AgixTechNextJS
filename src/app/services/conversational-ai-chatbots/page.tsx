'use client'
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { servicesData } from "@/lib/services-data";

export default function ConversationalAIPage() {
  return <ServicePageTemplate data={servicesData["conversational-ai-chatbots"]} />;
}
