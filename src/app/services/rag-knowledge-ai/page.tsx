'use client'
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { servicesData } from "@/lib/services-data";

export default function RAGKnowledgeAIPage() {
  return <ServicePageTemplate data={servicesData["rag-knowledge-ai"]} />;
}
