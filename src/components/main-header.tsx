'use client'

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Sparkles, Brain, Bot, MessageSquare, Workflow, Database, LineChart, Eye, Code, Building2, Briefcase, BookOpen, Users, Lightbulb, HeartPulse, Home, Landmark, ShoppingCart, Layers, Truck, GraduationCap, Info, Newspaper, Mail, Rocket } from "lucide-react";
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
  { title: "Operational Intelligence", href: "/intelligence/operational", icon: Workflow, description: "Streamline operations with AI-driven insights" },
  { title: "Conversational Intelligence", href: "/intelligence/conversational", icon: MessageSquare, description: "Natural language understanding and processing" },
  { title: "Decision Intelligence", href: "/intelligence/decision", icon: Brain, description: "Data-driven decision support systems" },
  { title: "Autonomous Agentic Systems", href: "/intelligence/agentic", icon: Bot, description: "Self-learning autonomous AI agents" },
  { title: "Enterprise Knowledge Intelligence", href: "/intelligence/enterprise-knowledge", icon: Database, description: "Unified enterprise knowledge management" },
];

const servicesItems = [
  { title: "AI Automation Services", href: "/services/ai-automation", icon: Workflow, description: "End-to-end workflow automation" },
  { title: "AI Voice Agents", href: "/services/voice-agents", icon: Phone, description: "Intelligent voice-based interactions" },
  { title: "Conversational AI (Chatbots)", href: "/services/chatbots", icon: MessageSquare, description: "Smart conversational interfaces" },
  { title: "Agentic AI Systems", href: "/services/agentic-ai-systems", icon: Bot, description: "Autonomous AI solutions" },
  { title: "RAG & Knowledge AI", href: "/services/rag-knowledge", icon: Database, description: "Retrieval-augmented generation" },
  { title: "Predictive & Analytics AI", href: "/services/predictive-analytics", icon: LineChart, description: "Advanced predictive modeling" },
  { title: "Computer Vision Solutions", href: "/services/computer-vision", icon: Eye, description: "Visual AI and image processing" },
  { title: "Custom AI Product Development", href: "/services/custom-ai-product", icon: Rocket, description: "Build, launch & scale AI products" },
];

const industriesItems = [
  { title: "Healthcare", href: "/industries/healthcare", icon: HeartPulse, description: "AI solutions for medical and health sectors" },
  { title: "Real Estate", href: "/industries/real-estate", icon: Home, description: "Smart property and real estate automation" },
  { title: "Fintech & Lending", href: "/industries/fintech", icon: Landmark, description: "AI solutions for fintech and lending companies" },
  { title: "Insurance", href: "/industries/insurance", icon: Building2, description: "AI for claims, fraud detection & underwriting" },
  { title: "Retail & eCommerce", href: "/industries/retail", icon: ShoppingCart, description: "Retail and online commerce optimization" },
  { title: "Logistics & Supply Chain", href: "/industries/logistics", icon: Truck, description: "Supply chain and logistics intelligence" },
  { title: "Hospitality & Wellness", href: "/industries/hospitality", icon: Sparkles, description: "AI for hotels, spas, restaurants & wellness" },
  { title: "EdTech & E-Learning", href: "/industries/edtech", icon: GraduationCap, description: "AI solutions for education and online learning" },
];

const corporateItems = [
  { title: "About Us", href: "/corporate/about", icon: Info, description: "Learn about AGIX and our mission" },
  { title: "Contact Us", href: "/corporate/contact", icon: Mail, description: "Get in touch with our team" },
  { title: "Careers", href: "/corporate/careers", icon: Briefcase, description: "Join our team and build intelligent systems" },
  { title: "News & Media", href: "https://agixtech.com/newsroom/", icon: Newspaper, description: "Latest news and press releases", external: true },
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={menuId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
              role="region"
              aria-label={`${title} submenu`}
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
            </motion.div>
          )}
        </AnimatePresence>
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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleConsultationClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        e.preventDefault();
        contactSection.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
      }
    }
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <a href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="font-bold text-xl tracking-tight">AGIX</span>
          </a>

          {mounted ? (
          <NavigationMenu className="hidden lg:flex">
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
                    href="/case-studies"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    data-testid="link-nav-case-studies"
                  >
                    Case Studies
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <div 
                className="relative"
                onMouseEnter={() => setCorporateOpen(true)}
                onMouseLeave={() => setCorporateOpen(false)}
              >
                <DropdownMenu open={corporateOpen} onOpenChange={setCorporateOpen}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:ring-2 focus:ring-primary focus:ring-offset-2 data-[state=open]:bg-accent/50"
                      data-testid="button-nav-corporate"
                    >
                      Corporate
                      <ChevronDown className={cn("relative top-[1px] ml-1 h-3 w-3 transition duration-200", corporateOpen && "rotate-180")} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[320px] p-4">
                    <ul className="grid gap-1">
                      {corporateItems.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
              </div>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="https://agixtech.com/blog/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    data-testid="link-nav-insights"
                  >
                    Insights
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
          ) : (
            <div className="hidden lg:flex" />
          )}

          <div className="flex items-center gap-4">
            <a
              href="tel:+18573656167"
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>+1 857-365-6167</span>
            </a>
            <Button asChild className="hidden md:inline-flex">
              <a 
                href={pathname === '/' ? '#contact' : '/corporate/contact'} 
                onClick={handleConsultationClick}
                data-testid="button-schedule-consultation"
              >
                Schedule Free Consultation
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
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
              <MobileMenuItem title="Case Studies" href="/case-studies" onItemClick={closeMobileMenu} />
              <MobileMenuItem
                title="Corporate"
                items={corporateItems.map((i) => ({ title: i.title, href: i.href }))}
                onItemClick={closeMobileMenu}
              />
              <MobileMenuItem 
                title="Insights" 
                href="https://agixtech.com/blog/" 
                onItemClick={closeMobileMenu} 
              />

              <div className="pt-4 border-t border-border mt-4 space-y-3">
                <a
                  href="tel:+18573656167"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground"
                  data-testid="link-mobile-phone"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  +1 857-365-6167
                </a>
                <div className="px-4">
                  <Button asChild className="w-full h-14 text-base font-semibold">
                    <a 
                      href={pathname === '/' ? '#contact' : '/corporate/contact'} 
                      onClick={handleConsultationClick}
                      data-testid="button-mobile-schedule-consultation"
                    >
                      Schedule Free Consultation
                    </a>
                  </Button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
