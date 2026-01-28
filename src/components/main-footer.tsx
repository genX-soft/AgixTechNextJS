'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Phone,
  Mail,
  MapPin,
  Shield,
  CheckCircle,
  Globe,
  Lock,
  Award,
  Sparkles,
  Star
} from "lucide-react";
import { SiFacebook, SiX, SiLinkedin, SiYoutube, SiG2, SiTrustpilot } from "react-icons/si";

const awards = [
  { title: "Top AI Development Agency", source: "Clutch", year: "2025", logo: "clutch" },
  { title: "Top Artificial Intelligence Company", source: "TechBehemoths", year: "2025", logo: "techbehemoths" },
  { title: "Best Custom Software Development", source: "GoodFirms", year: "2025", logo: "goodfirms" },
  { title: "Cool Vendor in AI", source: "Gartner", year: "2024", logo: "gartner" },
  { title: "Best Conversational AI Platform", source: "Capterra", year: "2025", logo: "capterra" },
  { title: "Top AI Companies", source: "G2", year: "2025", logo: "g2" },
  { title: "Most Trusted AI Provider", source: "Trustpilot", year: "2025", logo: "trustpilot" },
  { title: "Best AI Companies", source: "Forbes", year: "2024", logo: "forbes" },
  { title: "Top Machine Learning Companies", source: "Clutch", year: "2024", logo: "clutch" },
  { title: "Best Enterprise AI Solutions", source: "GoodFirms", year: "2025", logo: "goodfirms" },
  { title: "Top Computer Vision Provider", source: "G2", year: "2024", logo: "g2" },
  { title: "Best RAG Implementation", source: "Gartner", year: "2025", logo: "gartner" },
  { title: "Leading Agentic AI Systems", source: "TechBehemoths", year: "2024", logo: "techbehemoths" },
  { title: "Top Voice AI Provider", source: "Capterra", year: "2024", logo: "capterra" },
  { title: "Best Healthcare AI Solution", source: "Clutch", year: "2025", logo: "clutch" },
  { title: "Top Fintech AI Partner", source: "G2", year: "2024", logo: "g2" },
  { title: "Best Retail AI Platform", source: "GoodFirms", year: "2025", logo: "goodfirms" },
  { title: "AI Innovation Excellence", source: "Forbes", year: "2025", logo: "forbes" },
  { title: "Top NLP Solutions Provider", source: "Gartner", year: "2024", logo: "gartner" },
  { title: "AI Company of the Year", source: "Trustpilot", year: "2025", logo: "trustpilot" },
];

const services = [
  { title: "AI Automation Services", href: "/services/ai-automation" },
  { title: "AI Voice Agents", href: "/services/ai-voice-agents" },
  { title: "Conversational AI Chatbots", href: "/services/conversational-ai-chatbots" },
  { title: "Agentic AI Systems", href: "/services/agentic-ai-systems" },
  { title: "RAG & Knowledge AI", href: "/services/rag-knowledge-ai" },
  { title: "Predictive Analytics AI", href: "/services/ai-predictive-analytics" },
  { title: "Computer Vision Solutions", href: "/services/ai-computer-vision" },
  { title: "Custom AI Development", href: "/services/custom-ai-product-development" },
];

const industries = [
  { title: "Healthcare", href: "/industries/healthcare-ai-solutions" },
  { title: "Real Estate", href: "/industries/real-estate-ai-solutions" },
  { title: "Fintech", href: "/industries/fintech-ai-solutions" },
  { title: "Retail & E-commerce", href: "/industries/retail-ai-solutions" },
  { title: "Insurance", href: "/industries/insurance-ai-solutions" },
  { title: "Logistics", href: "/industries/logistics-ai-solutions" },
  { title: "EdTech", href: "/industries/edtech-ai-solutions" },
  { title: "Hospitality", href: "/industries/hospitality-ai-solutions" },
];

const intelligence = [
  { title: "Operational Intelligence", href: "/intelligence/operational-ai" },
  { title: "Conversational Intelligence", href: "/intelligence/conversational-ai" },
  { title: "Decision Intelligence", href: "/intelligence/decision-ai" },
  { title: "Agentic Systems", href: "/intelligence/autonomous-agentic-ai" },
  { title: "Enterprise Knowledge", href: "/intelligence/enterprise-knowledge-ai" },
];

const corporate: { title: string; href: string; external?: boolean }[] = [
  { title: "About Us", href: "/corporate/about" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Contact Us", href: "/corporate/contact" },
  { title: "Careers", href: "/corporate/careers" },
  { title: "News & Media", href: "/newsroom" },
  { title: "Content Engine", href: "/tools/content-engine" },
];

const certifications = [
  { name: "SOC 2", label: "SOC 2 Type II Certified", icon: Shield, description: "Enterprise Security" },
  { name: "GDPR", label: "GDPR Compliant", icon: Globe, description: "Data Privacy" },
  { name: "HIPAA", label: "HIPAA Ready", icon: CheckCircle, description: "Healthcare Compliance" },
  { name: "ISO 27001", label: "ISO 27001", icon: Lock, description: "Information Security" },
];

const offices = [
  { 
    city: "Boston, USA",
    address: "99 Derby Street, Hingham, MA 02043"
  },
  { 
    city: "London, UK",
    address: "61 Bridge Street, Kington, HR5 3DJ"
  },
  { 
    city: "Jaipur, India",
    address: "2nd Floor, R 10/63 Chitrakoot, Vaishali Nagar, 302021"
  },
];

const socialLinks = [
  { title: "Facebook", href: "https://facebook.com/agixtech", icon: SiFacebook },
  { title: "X", href: "https://x.com/agixtech", icon: SiX },
  { title: "LinkedIn", href: "https://linkedin.com/company/agixtech", icon: SiLinkedin },
  { title: "YouTube", href: "https://youtube.com/@agixtech", icon: SiYoutube },
];

function AwardBadge({ award }: { award: typeof awards[0] }) {
  const getBadgeConfig = () => {
    switch (award.logo) {
      case "clutch":
        return {
          bgGradient: "from-slate-700 via-slate-600 to-slate-700",
          borderColor: "border-teal-500",
          accentColor: "bg-red-500",
          ribbonColor: "from-teal-500 to-teal-600",
          textColor: "text-white",
          shape: "hexagon"
        };
      case "g2":
        return {
          bgGradient: "from-slate-100 via-white to-slate-100",
          borderColor: "border-orange-500",
          accentColor: "bg-orange-500",
          ribbonColor: "from-orange-500 to-red-500",
          textColor: "text-slate-800",
          shape: "shield"
        };
      case "trustpilot":
        return {
          bgGradient: "from-emerald-500 via-emerald-400 to-emerald-500",
          borderColor: "border-emerald-600",
          accentColor: "bg-slate-900",
          ribbonColor: "from-slate-800 to-slate-900",
          textColor: "text-white",
          shape: "hexagon"
        };
      case "gartner":
        return {
          bgGradient: "from-slate-100 via-white to-slate-100",
          borderColor: "border-blue-600",
          accentColor: "bg-blue-600",
          ribbonColor: "from-blue-600 to-blue-700",
          textColor: "text-blue-700",
          shape: "rectangle"
        };
      case "capterra":
        return {
          bgGradient: "from-blue-600 via-blue-500 to-blue-600",
          borderColor: "border-blue-400",
          accentColor: "bg-teal-400",
          ribbonColor: "from-teal-400 to-teal-500",
          textColor: "text-white",
          shape: "shield"
        };
      case "techbehemoths":
        return {
          bgGradient: "from-slate-900 via-indigo-950 to-slate-900",
          borderColor: "border-blue-500",
          accentColor: "bg-blue-500",
          ribbonColor: "from-blue-500 to-blue-600",
          textColor: "text-white",
          shape: "shield"
        };
      case "goodfirms":
        return {
          bgGradient: "from-teal-500 via-teal-400 to-teal-500",
          borderColor: "border-teal-300",
          accentColor: "bg-green-400",
          ribbonColor: "from-green-400 to-green-500",
          textColor: "text-white",
          shape: "circle"
        };
      case "forbes":
        return {
          bgGradient: "from-slate-900 via-slate-800 to-slate-900",
          borderColor: "border-amber-500",
          accentColor: "bg-amber-500",
          ribbonColor: "from-amber-500 to-amber-600",
          textColor: "text-white",
          shape: "rectangle"
        };
      default:
        return {
          bgGradient: "from-cyan-600 via-cyan-500 to-cyan-600",
          borderColor: "border-cyan-400",
          accentColor: "bg-cyan-400",
          ribbonColor: "from-cyan-400 to-cyan-500",
          textColor: "text-white",
          shape: "hexagon"
        };
    }
  };

  const config = getBadgeConfig();

  const renderBadgeShape = () => {
    switch (config.shape) {
      case "hexagon":
        return (
          <div className="relative">
            <svg width="100" height="90" viewBox="0 0 100 90" className="drop-shadow-lg">
              <defs>
                <linearGradient id={`hexGrad-${award.logo}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className="[stop-color:var(--tw-gradient-from)]" />
                  <stop offset="100%" className="[stop-color:var(--tw-gradient-to)]" />
                </linearGradient>
              </defs>
              <polygon 
                points="50,2 95,25 95,65 50,88 5,65 5,25" 
                className={`fill-current bg-gradient-to-br ${config.bgGradient}`}
                fill="url(#hexGrad)"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center`}>
              <div className={`w-[90px] h-[80px] bg-gradient-to-br ${config.bgGradient} flex items-center justify-center`} style={{clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"}}>
                <span className={`text-sm font-black ${config.textColor} tracking-tight text-center leading-tight`}>
                  {award.source.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        );
      case "shield":
        return (
          <div className="relative">
            <svg width="90" height="100" viewBox="0 0 90 100" className="drop-shadow-lg">
              <path 
                d="M45 2 L85 12 L85 55 Q85 80 45 98 Q5 80 5 55 L5 12 Z"
                className={`fill-current`}
                fill="currentColor"
              />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center`}>
              <div className={`w-[80px] h-[90px] bg-gradient-to-br ${config.bgGradient} flex items-center justify-center pt-2`} style={{clipPath: "polygon(50% 0%, 95% 10%, 95% 55%, 50% 100%, 5% 55%, 5% 10%)"}}>
                {award.logo === "g2" ? (
                  <SiG2 className="w-10 h-10 text-orange-500" />
                ) : award.logo === "capterra" ? (
                  <span className={`text-xs font-black ${config.textColor} tracking-tight`}>CAPTERRA</span>
                ) : (
                  <span className={`text-[10px] font-black ${config.textColor} tracking-tight text-center leading-tight`}>
                    {award.source.split(/(?=[A-Z])/).join("\n").toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      case "circle":
        return (
          <div className="relative">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${config.bgGradient} border-4 ${config.borderColor} flex items-center justify-center shadow-lg`}>
              <span className={`text-[10px] font-black ${config.textColor} tracking-tight text-center leading-tight`}>
                {award.source.split(/(?=[A-Z])/).join("\n").toUpperCase()}
              </span>
            </div>
            {/* Decorative laurel */}
            <svg width="110" height="90" viewBox="0 0 110 90" className="absolute -left-4 -top-2">
              <path d="M20 45C15 35 14 25 20 15" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
              <path d="M15 50C8 38 7 25 15 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
              <path d="M90 45C95 35 96 25 90 15" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
              <path d="M95 50C102 38 103 25 95 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
            </svg>
          </div>
        );
      case "rectangle":
        return (
          <div className={`relative px-6 py-4 bg-gradient-to-br ${config.bgGradient} border-2 ${config.borderColor} rounded-md shadow-lg`}>
            <span className={`text-sm font-black ${config.textColor} tracking-tight`}>
              {award.source}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-8 py-6 shrink-0 min-w-[240px] group">
      {/* Badge */}
      <div className="mb-4 h-24 flex items-center justify-center">
        {renderBadgeShape()}
      </div>
      
      {/* Ribbon with award title */}
      <div className={`relative px-4 py-2 bg-gradient-to-r ${config.ribbonColor} rounded-sm shadow-md mb-3 max-w-[200px]`}>
        <div className="absolute -left-2 top-0 w-0 h-0 border-t-[16px] border-t-transparent border-r-[8px] border-r-slate-900/30"></div>
        <div className="absolute -right-2 top-0 w-0 h-0 border-t-[16px] border-t-transparent border-l-[8px] border-l-slate-900/30"></div>
        <span className="text-xs font-bold uppercase tracking-wide text-white leading-snug text-center">
          {award.title}
        </span>
      </div>
      
      {/* Year */}
      <p className="text-sm text-slate-400 font-medium">
        {award.year}
      </p>
    </div>
  );
}

export function MainFooter() {
  const duplicatedAwards = [...awards, ...awards];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="py-16 md:py-20 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xl md:text-2xl font-semibold text-white mb-3" role="heading" aria-level={2}>Enterprise-Grade Security & Compliance</p>
            <p className="text-sm text-slate-400">Trusted by Fortune 500 companies worldwide</p>
            <span className="text-sm text-slate-400">Security and compliance are embedded at the system architecture level not added post-deployment.</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center p-6 md:p-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <cert.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-base md:text-lg font-bold text-white mb-2">{cert.name}</span>
                <span className="text-xs md:text-sm text-slate-400 text-center">{cert.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">AGIX<span className="text-primary">.</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
             Enterprise AI Systems Engineering. Designing, deploying, and stewarding agentic AI systems that transform business operations.
            </p>
            <div className="space-y-4">
              <a href="tel:+18573656167" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +1 857-365-6167
              </a>
              <a href="mailto:santosh@agixtech.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                santosh@agixtech.com
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                  aria-label={social.title}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white mb-4" role="heading" aria-level={3}>Services</p>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href + link.title}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white mb-4" role="heading" aria-level={3}>Industries</p>
            <ul className="space-y-2.5">
              {industries.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white mb-4" role="heading" aria-level={3}>Intelligence</p>
            <ul className="space-y-2.5">
              {intelligence.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white mb-4" role="heading" aria-level={3}>Company</p>
            <ul className="space-y-2.5">
              {corporate.map((link) => (
                <li key={link.href + link.title}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.title}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white mb-4" role="heading" aria-level={3}>Offices</p>
            <div className="space-y-4">
              {offices.map((office) => (
                <div key={office.city} className="text-sm">
                  <p className="text-white font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-primary" />
                    {office.city}
                  </p>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{office.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
             <div className="text-sm text-gray-500" suppressHydrationWarning>
                {`© ${new Date().getFullYear()} AGIX Technologies. All rights reserved.`}
             </div>
              <span className="hidden md:inline">|</span>
              <Link href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service/" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/tools/content-engine/" className="hover:text-white transition-colors" data-testid="link-footer-content-engine">Content Engine</Link>
              <Link href="/admin/leads/" className="hover:text-white transition-colors" data-testid="link-footer-admin">Admin</Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
