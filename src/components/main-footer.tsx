'use client'

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  CheckCircle,
  Globe,
  Lock,
  Sparkles,
} from "lucide-react";
import { SiFacebook, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

const services = [
  { title: "AI Automation Services", href: "/services/ai-automation/" },
  { title: "AI Voice Agents", href: "/services/ai-voice-agents/" },
  { title: "Conversational AI Chatbots", href: "/services/conversational-ai-chatbots/" },
  { title: "Agentic AI Systems", href: "/services/agentic-ai-systems/" },
  { title: "RAG & Knowledge AI", href: "/services/rag-knowledge-ai/" },
  { title: "Predictive Analytics AI", href: "/services/ai-predictive-analytics/" },
  { title: "Computer Vision Solutions", href: "/services/ai-computer-vision/" },
  { title: "Custom AI Development", href: "/services/custom-ai-product-development/" },
];

const industries = [
  { title: "Healthcare", href: "/industries/healthcare-ai-solutions/" },
  { title: "Real Estate", href: "/industries/real-estate-ai-solutions/" },
  { title: "Fintech", href: "/industries/fintech-ai-solutions/" },
  { title: "Retail & E-commerce", href: "/industries/retail-ai-solutions/" },
  { title: "Insurance", href: "/industries/insurance-ai-solutions/" },
  { title: "Logistics", href: "/industries/logistics-ai-solutions/" },
  { title: "EdTech", href: "/industries/edtech-ai-solutions/" },
  { title: "Hospitality", href: "/industries/hospitality-ai-solutions/" },
];

const intelligence = [
  { title: "Operational Intelligence", href: "/intelligence/operational-ai/" },
  { title: "Conversational Intelligence", href: "/intelligence/conversational-ai/" },
  { title: "Decision Intelligence", href: "/intelligence/decision-ai/" },
  { title: "Agentic Systems", href: "/intelligence/autonomous-agentic-ai/" },
  { title: "Enterprise Knowledge", href: "/intelligence/enterprise-knowledge-ai/" },
];

const corporate = [
  { title: "About Us", href: "/corporate/about/" },
  { title: "Case Studies", href: "/case-studies/" },
  { title: "Contact Us", href: "/corporate/contact/" },
  { title: "Careers", href: "/corporate/careers/" },
];

const certifications = [
  { name: "SOC 2", icon: Shield, description: "Enterprise Security" },
  { name: "GDPR", icon: Globe, description: "Data Privacy" },
  { name: "HIPAA", icon: CheckCircle, description: "Healthcare Compliance" },
  { name: "ISO 27001", icon: Lock, description: "Information Security" },
];

const offices = [
  { city: "Boston, USA", address: "99 Derby Street, Hingham, MA 02043" },
  { city: "London, UK", address: "61 Bridge Street, Kington, HR5 3DJ" },
  { city: "Jaipur, India", address: "2nd Floor, R 10/63 Chitrakoot, Vaishali Nagar, 302021" },
];

const socialLinks = [
  { title: "Facebook", href: "https://facebook.com/agixtech", icon: SiFacebook },
  { title: "X", href: "https://x.com/agixtech", icon: SiX },
  { title: "LinkedIn", href: "https://linkedin.com/company/agixtech", icon: SiLinkedin },
  { title: "YouTube", href: "https://youtube.com/@agixtech", icon: SiYoutube },
];

const footerLinkClass = "text-sm text-slate-300 transition-colors hover:text-white";

export function MainFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="border-b border-slate-800 bg-slate-900/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xl font-semibold text-white md:text-2xl" role="heading" aria-level={2}>
              Enterprise-Grade Security & Compliance
            </p>
            <p className="text-sm text-slate-300">Trusted by Fortune 500 companies worldwide</p>
            <span className="text-sm text-slate-300">
              Security and compliance are embedded at the system architecture level, not added post-deployment.
            </span>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="group flex flex-col items-center rounded-lg border border-slate-800 bg-slate-900 p-6 transition-all hover:border-cyan-500/50 md:p-8"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 md:h-16 md:w-16">
                  <cert.icon className="h-7 w-7 text-white md:h-8 md:w-8" aria-hidden="true" />
                </div>
                <span className="mb-2 text-base font-bold text-white md:text-lg">{cert.name}</span>
                <span className="text-center text-xs text-slate-300 md:text-sm">{cert.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500">
                <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">
                AGIX Technologies
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-300">
              Enterprise AI Systems Engineering. Designing, deploying, and stewarding agentic AI systems that transform business operations.
            </p>
            <div className="space-y-4">
              <a href="tel:+18574141353" className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                +1 857 4141 353
              </a>
              <a href="mailto:santosh@agixtech.com" className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                santosh@agixtech.com
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-800 text-slate-300 transition-all hover:bg-primary hover:text-white"
                  aria-label={social.title}
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white" role="heading" aria-level={3}>Services</p>
            <ul className="m-0 list-none p-0 space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white" role="heading" aria-level={3}>Industries</p>
            <ul className="m-0 list-none p-0 space-y-2.5">
              {industries.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white" role="heading" aria-level={3}>Intelligence</p>
            <ul className="m-0 list-none p-0 space-y-2.5">
              {intelligence.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white" role="heading" aria-level={3}>Company</p>
            <ul className="m-0 list-none p-0 space-y-2.5">
              {corporate.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white" role="heading" aria-level={3}>Offices</p>
            <div className="space-y-4">
              {offices.map((office) => (
                <div key={office.city} className="text-sm">
                  <p className="flex items-center gap-1.5 font-medium text-white">
                    <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
                    {office.city}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">{office.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="text-sm text-slate-300" suppressHydrationWarning>
                {`\u00A9 ${new Date().getFullYear()} Agix Technologies. All rights reserved.`}
              </div>
              <span className="hidden md:inline">|</span>
              <Link href="/privacy-policy/" className="transition-colors hover:text-white">Privacy Policy</Link>
              <Link href="/terms-of-service/" className="transition-colors hover:text-white">Terms of Service</Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              All Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
