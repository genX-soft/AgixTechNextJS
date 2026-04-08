'use client'

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, Sparkles, Brain, Bot, MessageSquare, Workflow, Database, LineChart, Eye, Code, Building2, Briefcase, BookOpen, Users, Lightbulb, HeartPulse, Home, Landmark, ShoppingCart, Layers, Truck, GraduationCap, Info, Mail, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const intelligenceItems = [
  { title: "Operational Intelligence", href: "/intelligence/operational-ai/", icon: Workflow, description: "Streamline operations with AI-driven insights" },
  { title: "Conversational Intelligence", href: "/intelligence/conversational-ai/", icon: MessageSquare, description: "Natural language understanding and processing" },
  { title: "Decision Intelligence", href: "/intelligence/decision-ai/", icon: Brain, description: "Data-driven decision support systems" },
  { title: "Autonomous Agentic Systems", href: "/intelligence/autonomous-agentic-ai/", icon: Bot, description: "Self-learning autonomous AI agents" },
  { title: "Enterprise Knowledge Intelligence", href: "/intelligence/enterprise-knowledge-ai/", icon: Database, description: "Unified enterprise knowledge management" },
];

const servicesItems = [
  { title: "AI Automation Services", href: "/services/ai-automation/", icon: Workflow, description: "End-to-end workflow automation" },
  { title: "AI Voice Agents", href: "/services/ai-voice-agents/", icon: Phone, description: "Intelligent voice-based interactions" },
  { title: "Conversational AI (Chatbots)", href: "/services/conversational-ai-chatbots/", icon: MessageSquare, description: "Smart conversational interfaces" },
  { title: "Agentic AI Systems", href: "/services/agentic-ai-systems/", icon: Bot, description: "Autonomous AI solutions" },
  { title: "RAG & Knowledge AI", href: "/services/rag-knowledge-ai/", icon: Database, description: "Retrieval-augmented generation" },
  { title: "Predictive & Analytics AI", href: "/services/ai-predictive-analytics/", icon: LineChart, description: "Advanced predictive modeling" },
  { title: "Computer Vision Solutions", href: "/services/ai-computer-vision/", icon: Eye, description: "Visual AI and image processing" },
  { title: "Custom AI Product Development", href: "/services/custom-ai-product-development/", icon: Rocket, description: "Build, launch & scale AI products" },
];

const industriesItems = [
  { title: "Healthcare", href: "/industries/healthcare-ai-solutions/", icon: HeartPulse, description: "AI solutions for medical and health sectors" },
  { title: "Real Estate", href: "/industries/real-estate-ai-solutions/", icon: Home, description: "Smart property and real estate automation" },
  { title: "Fintech & Lending", href: "/industries/fintech-ai-solutions/", icon: Landmark, description: "AI solutions for fintech and lending companies" },
  { title: "Insurance", href: "/industries/insurance-ai-solutions/", icon: Building2, description: "AI for claims, fraud detection & underwriting" },
  { title: "Retail & eCommerce", href: "/industries/retail-ai-solutions/", icon: ShoppingCart, description: "Retail and online commerce optimization" },
  { title: "Logistics & Supply Chain", href: "/industries/logistics-ai-solutions/", icon: Truck, description: "Supply chain and logistics intelligence" },
  { title: "Hospitality & Wellness", href: "/industries/hospitality-ai-solutions/", icon: Sparkles, description: "AI for hotels, spas, restaurants & wellness" },
  { title: "EdTech & E-Learning", href: "/industries/edtech-ai-solutions/", icon: GraduationCap, description: "AI solutions for education and online learning" },
];

const corporateItems = [
  { title: "About Us", href: "/corporate/about/", icon: Info, description: "Learn about AGIX Technologies and our mission" },
  { title: "Customer Testimonials", href: "/customer-testimonials/", icon: Star, description: "Read verified client reviews and success stories" },
  { title: "Contact Us", href: "/corporate/contact/", icon: Mail, description: "Get in touch with our team" },
  { title: "Careers", href: "/corporate/careers/", icon: Briefcase, description: "Join our team and build intelligent systems" },
];

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

function ListItem({ className, title, href, icon: Icon, description }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate focus:ring-2 focus:ring-primary focus:ring-offset-2",
            className
          )}
          data-testid={`link-nav-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />}
            <div>
              <div className="text-sm font-medium leading-none">{title}</div>
              {description && (
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

interface MobileMenuItemProps {
  title: string;
  items?: { title: string; href: string }[];
  href?: string;
  onItemClick: () => void;
}

function MobileMenuItem({ title, items, href, onItemClick }: MobileMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = `mobile-menu-${title.toLowerCase().replace(/\s+/g, "-")}`;

  if (items) {
    return (
      <div role="group">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={menuId}
          className="flex items-center justify-between w-full px-4 py-4 text-sm font-medium text-foreground hover-elevate rounded-md min-h-[48px]"
          data-testid={`button-mobile-${title.toLowerCase()}`}
        >
          {title}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
        </button>
        <div
          id={menuId}
          role="region"
          aria-label={`${title} submenu`}
          className={cn(
            "overflow-hidden transition-all duration-150 ease-in-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="pl-4 pb-2 space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className="block px-4 py-3 text-sm text-muted-foreground hover-elevate rounded-md min-h-[44px] flex items-center"
                data-testid={`link-mobile-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href || "/"}
      onClick={onItemClick}
      className="block px-4 py-3 text-sm font-medium text-foreground hover-elevate rounded-md"
      data-testid={`link-mobile-${title.toLowerCase()}`}
    >
      {title}
    </Link>
  );
}

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [corporateOpen, setCorporateOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.requestAnimationFrame(() => setIsScrolled(window.scrollY > 50));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleConsultationClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  }, []);

  return (
    <header
      data-home-header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <a href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo">
            <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-xl tracking-tight">Agix Technologies</span>
          </a>

          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent" data-testid="button-nav-intelligence">
                  Intelligence
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4">
                    {intelligenceItems.map((item) => (
                      <ListItem
                        key={item.href}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                        description={item.description}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent" data-testid="button-nav-services">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4">
                    {servicesItems.map((item) => (
                      <ListItem
                        key={item.href}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                        description={item.description}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent" data-testid="button-nav-industries">
                  Industries
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-4">
                    {industriesItems.map((item) => (
                      <ListItem
                        key={item.href}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                        description={item.description}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="/case-studies/"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    data-testid="link-nav-case-studies"
                  >
                    Case Studies
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem
                className="relative"
                onMouseEnter={() => setCorporateOpen(true)}
                onMouseLeave={() => setCorporateOpen(false)}
              >
                <DropdownMenu open={corporateOpen} onOpenChange={setCorporateOpen}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={corporateOpen}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:ring-2 focus:ring-primary focus:ring-offset-2 data-[state=open]:bg-accent/50"
                      data-testid="button-nav-corporate"
                    >
                      Corporate
                      <ChevronDown className={cn("relative top-[1px] ml-1 h-3 w-3 transition duration-200", corporateOpen && "rotate-180")} aria-hidden="true" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[320px] p-4">
                    <ul className="grid gap-1">
                      {corporateItems.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            {...(('external' in item && item.external) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            data-testid={`link-nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                              <div>
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">{item.description}</p>
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a
                  href="/insights/"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-foreground"
                  data-testid="link-nav-insights"
                >
                  Insights
                </a>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <a
              href="tel:+18574141353"
              className="hidden xl:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0"
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>+1 857 4141 353</span>
            </a>
            <Button asChild className="hidden md:inline-flex shrink-0">
              <a 
                href="/corporate/contact/" 
                onClick={handleConsultationClick}
                data-testid="button-schedule-consultation"
              >
                Schedule Free Consultation
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "xl:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden transition-all duration-150 ease-in-out",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <MobileMenuItem
                title="Intelligence"
                items={intelligenceItems.map((i) => ({ title: i.title, href: i.href }))}
                onItemClick={closeMobileMenu}
              />
              <MobileMenuItem
                title="Services"
                items={servicesItems.map((i) => ({ title: i.title, href: i.href }))}
                onItemClick={closeMobileMenu}
              />
              <MobileMenuItem
                title="Industries"
                items={industriesItems.map((i) => ({ title: i.title, href: i.href }))}
                onItemClick={closeMobileMenu}
              />
              <MobileMenuItem title="Case Studies" href="/case-studies/" onItemClick={closeMobileMenu} />
              <MobileMenuItem
                title="Corporate"
                items={corporateItems.map((i) => ({ title: i.title, href: i.href }))}
                onItemClick={closeMobileMenu}
              />
              <a
                href="/insights/"
                className="block px-4 py-3 text-sm font-medium transition-colors hover:text-foreground"
                onClick={closeMobileMenu}
                data-testid="link-mobile-insights"
              >
                Insights
              </a>

              <div className="pt-4 border-t border-border mt-4 space-y-3">
                <a
                  href="tel:+18574141353"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground"
                  data-testid="link-mobile-phone"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  +1 857 4141 353
                </a>
                <div className="px-4">
                  <Button asChild className="w-full h-14 text-base font-semibold">
                    <a 
                      href="/corporate/contact/" 
                      onClick={handleConsultationClick}
                      data-testid="button-mobile-schedule-consultation"
                    >
                      Schedule Free Consultation
                    </a>
                  </Button>
                </div>
              </div>
            </nav>
      </div>
    </header>
  );
}
